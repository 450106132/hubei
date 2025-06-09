//App类型
MjClient.APP_TYPE = {
    QXJSMJ: 0, //牌友联盟江苏麻将
    JSMJ: 1, //牌友联盟南京麻将
    QXHAMJ: 2, //牌友联盟淮安麻将
    QXXZMJ: 3, //牌友联盟徐州麻将
    QXYZQP: 4, //牌友联盟永州棋牌
    QXNTQP: 5, //牌友联盟南通棋牌
    QXYCQP: 6, //牌友联盟盐城棋牌
    QXTHMJ: 7, //牌友联盟通化麻将
    QXYYQP: 8, //牌友联盟岳阳棋牌
    QXHAIANMJ: 9, //牌友联盟海安麻将
    TXJINZHONGMJ: 10, //天星晋中麻将
    //QXPEIXIANMJ:11,//牌友联盟沛县麻将
    TXLVLIANGMJ: 12, //天星吕梁麻将
    TXLINFENMJ: 13, //天星临汾麻将
    YLHUNANMJ: 14, //永利湖南竞技麻将
    QXLYQP:15,//牌友联盟耒阳棋牌
    BDHYZP:16,//北斗衡阳字牌
    BDYZPHZ:17,//北斗永州跑胡子
    QXSYDTZ:18,//牌友联盟邵阳打筒子
    QXXXGHZ:19,//牌友联盟湘乡告胡子
    AYGUIZHOUMJ:20,//爱游贵州麻将
    LYSICHUANMJ:21,//乐易四川麻将
    HUNANWANGWANG:22,//湖南旺旺竞技
    DQSHANXIMJ:23,//兜趣山西麻将
    HUBEIMJ:24 //湖北麻将
};

var PackageName2AppType = {};
PackageName2AppType["com.leyihuyu.qxjsmj"] = MjClient.APP_TYPE.QXJSMJ;
PackageName2AppType["com.tencent.tmgp.qxjsmj2"] = MjClient.APP_TYPE.QXJSMJ;
PackageName2AppType["com.tencent.tmgp.qxjsmj3"] = MjClient.APP_TYPE.QXJSMJ;
PackageName2AppType["com.tencent.tmgp.qxjsmj4"] = MjClient.APP_TYPE.QXJSMJ;//企业签
PackageName2AppType["com.tencent.tmgp.qxjsmj*"] = MjClient.APP_TYPE.QXJSMJ;
PackageName2AppType["com.leyihuyu.jsmj"] = MjClient.APP_TYPE.JSMJ;
PackageName2AppType["com.leyihuyu.qxhamj"] = MjClient.APP_TYPE.QXHAMJ;
PackageName2AppType["com.qixing.mjqxha"] = MjClient.APP_TYPE.QXHAMJ;
PackageName2AppType["com.qixing.mjqxha2"] = MjClient.APP_TYPE.QXHAMJ;//企业签
PackageName2AppType["com.qixing.mjqxha*"] = MjClient.APP_TYPE.QXHAMJ;
PackageName2AppType["com.jtcf.qxyzqp2"] = MjClient.APP_TYPE.QXYZQP;//企业签
PackageName2AppType["com.tencent.tmgp.qxyzphz2"] = MjClient.APP_TYPE.QXYZQP;
PackageName2AppType["com.tencent.tmgp.qxyzphz3"] = MjClient.APP_TYPE.QXYZQP;
PackageName2AppType["com.jtcf.qxyzqp"] = MjClient.APP_TYPE.QXYZQP;
PackageName2AppType["com.jtcf.qxyzqp*"] = MjClient.APP_TYPE.QXYZQP;
PackageName2AppType["com.jtcf.qxxzqp"] = MjClient.APP_TYPE.QXXZMJ;
PackageName2AppType["com.xzqx.mjqxxz"] = MjClient.APP_TYPE.QXXZMJ;
PackageName2AppType["com.jtcf.qxxzqp2"] = MjClient.APP_TYPE.QXXZMJ;//企业签
PackageName2AppType["com.jtcf.qxxzqp*"] = MjClient.APP_TYPE.QXXZMJ;
PackageName2AppType["com.jtcf.qxntqp"] = MjClient.APP_TYPE.QXNTQP;
PackageName2AppType["com.tencent.tmgp.qxntqp"] = MjClient.APP_TYPE.QXNTQP;
PackageName2AppType["com.tencent.tmgp.qxntqp2"] = MjClient.APP_TYPE.QXNTQP;//企业签
PackageName2AppType["com.tencent.tmgp.qxntqp*"] = MjClient.APP_TYPE.QXNTQP;
PackageName2AppType["com.jtcf.qxycqp"] = MjClient.APP_TYPE.QXYCQP;
PackageName2AppType["com.tencent.tmgp.qxthmj"] = MjClient.APP_TYPE.QXTHMJ;
PackageName2AppType["com.tencent.tmgp.qxyyqp"] = MjClient.APP_TYPE.QXYYQP;
PackageName2AppType["com.taobei.lzqzdemo"] = MjClient.APP_TYPE.QXYYQP;
PackageName2AppType["com.taobei.paiyounew"] = MjClient.APP_TYPE.QXYYQP;
PackageName2AppType["com.tencent.tmgp.qxyyqp1"] = MjClient.APP_TYPE.QXYYQP;
PackageName2AppType["com.tencent.tmgp.qxyyqp3"] = MjClient.APP_TYPE.QXYYQP;//企业签
PackageName2AppType["com.xmsz.xiaomieshuzi"] = MjClient.APP_TYPE.QXYYQP;
PackageName2AppType["com.tencent.tmgp.qxyyqp*"] = MjClient.APP_TYPE.QXYYQP;
PackageName2AppType["com.tencent.tmgp.qxhaianqp1"] = MjClient.APP_TYPE.QXHAIANMJ;
PackageName2AppType["com.tencent.tmgp.qxhaianqp2"] = MjClient.APP_TYPE.QXHAIANMJ;
PackageName2AppType["com.tencent.tmgp.qxhaianqp*"] = MjClient.APP_TYPE.QXHAIANMJ;
PackageName2AppType["com.tencent.tmgp.txjinzhongmj"] = MjClient.APP_TYPE.TXJINZHONGMJ;
PackageName2AppType["com.tencent.tmgp.txjinzhongmj3"] = MjClient.APP_TYPE.TXJINZHONGMJ;
PackageName2AppType["com.txjz.jztxmj"] = MjClient.APP_TYPE.TXJINZHONGMJ;
PackageName2AppType["com.txshx.txshanximj"] = MjClient.APP_TYPE.TXJINZHONGMJ;
PackageName2AppType["com.txshx.txshanximj2"] = MjClient.APP_TYPE.TXJINZHONGMJ;//企业签
PackageName2AppType["com.txshx.txshanximj*"] = MjClient.APP_TYPE.TXJINZHONGMJ;
PackageName2AppType["com.txjj.shanxitianxing"] = MjClient.APP_TYPE.TXJINZHONGMJ;
PackageName2AppType["com.tencent.tmgp.txlvliangmj"] = MjClient.APP_TYPE.TXLVLIANGMJ;
PackageName2AppType["com.tencent.tmgp.txlvliangmj1"] = MjClient.APP_TYPE.TXLVLIANGMJ;
PackageName2AppType["com.txll.lvliangtxmj"] = MjClient.APP_TYPE.TXLVLIANGMJ;
PackageName2AppType["com.tencent.tmgp.txlinfenmj"] = MjClient.APP_TYPE.TXLINFENMJ;
PackageName2AppType["com.tencent.tmgp.txlinfenmj1"] = MjClient.APP_TYPE.TXLINFENMJ;
PackageName2AppType["com.jtcf.ylhunan"] = MjClient.APP_TYPE.YLHUNANMJ;
PackageName2AppType["com.jtcf.ylhunan2"] = MjClient.APP_TYPE.YLHUNANMJ;//企业签
PackageName2AppType["com.jtcf.ylhunan*"] = MjClient.APP_TYPE.YLHUNANMJ;
PackageName2AppType["com.tencent.tmgp.qxxxghz"] = MjClient.APP_TYPE.QXXXGHZ;
PackageName2AppType["com.tencent.tmgp.qxxxghz1"] = MjClient.APP_TYPE.QXXXGHZ;
PackageName2AppType["com.tencent.tmgp.qxxxghz2"] = MjClient.APP_TYPE.QXXXGHZ;//企业签
PackageName2AppType["com.tencent.tmgp.qxxxghz*"] = MjClient.APP_TYPE.QXXXGHZ;
PackageName2AppType["com.tencent.tmgp.qxlyqp"] = MjClient.APP_TYPE.QXLYQP;
PackageName2AppType["com.tencent.tmgp.qxlyzp"] = MjClient.APP_TYPE.QXLYQP;
PackageName2AppType["com.tencent.tmgp.qxlyqp2"] = MjClient.APP_TYPE.QXLYQP;//企业签
PackageName2AppType["com.tencent.tmgp.qxlyqp*"] = MjClient.APP_TYPE.QXLYQP;
PackageName2AppType["com.tencent.tmgp.bdhyzp"] = MjClient.APP_TYPE.BDHYZP;
PackageName2AppType["com.tencent.tmgp.bdhyzp1"] = MjClient.APP_TYPE.BDHYZP;
PackageName2AppType["com.tencent.tmgp.bdhyzp2"] = MjClient.APP_TYPE.BDHYZP;//企业签
PackageName2AppType["com.beidou.hengyangzipai"] = MjClient.APP_TYPE.BDHYZP;
PackageName2AppType["com.tencent.tmgp.bdhyzp*"] = MjClient.APP_TYPE.BDHYZP;
PackageName2AppType["com.tencent.tmgp.bdyzphz"] = MjClient.APP_TYPE.BDYZPHZ;
PackageName2AppType["com.tencent.tmgp.tt2tz"] = MjClient.APP_TYPE.QXSYDTZ;
PackageName2AppType["com.shaoyang.tt2tz"] = MjClient.APP_TYPE.QXSYDTZ;
PackageName2AppType["com.shaoyang.tt2tz2"] = MjClient.APP_TYPE.QXSYDTZ;//企业签
PackageName2AppType["com.tencent.tmgp.qxsydtz"] = MjClient.APP_TYPE.QXSYDTZ;
PackageName2AppType["com.shaoyang.tt2tz*"] = MjClient.APP_TYPE.QXSYDTZ;
PackageName2AppType["com.tt2jj.shaoyangdiqu"] = MjClient.APP_TYPE.QXSYDTZ;
PackageName2AppType["com.jtcf.ayguizhou"] = MjClient.APP_TYPE.AYGUIZHOUMJ;
PackageName2AppType["com.jtcf.ayguizhou*"] = MjClient.APP_TYPE.AYGUIZHOUMJ;
PackageName2AppType["com.jtcf.lysichuan"] = MjClient.APP_TYPE.LYSICHUANMJ;
PackageName2AppType["com.jtcf.lysichuan*"] = MjClient.APP_TYPE.LYSICHUANMJ;
PackageName2AppType["com.jtcf.hunanwangwang"] = MjClient.APP_TYPE.HUNANWANGWANG;
PackageName2AppType["com.jtcf.douqushanxi"] = MjClient.APP_TYPE.DQSHANXIMJ;
// PackageName2AppType["com.taobei.hubeimj"] = MjClient.APP_TYPE.HUBEIMJ;
PackageName2AppType["com.qiaoyou.hubeiqp"] = MjClient.APP_TYPE.HUBEIMJ;
var AppCnName = {};
AppCnName[MjClient.APP_TYPE.QXJSMJ] = "牌友联盟江苏麻将";
AppCnName[MjClient.APP_TYPE.JSMJ] = "牌友联盟南京麻将";
AppCnName[MjClient.APP_TYPE.QXHAMJ] = "牌友联盟淮安麻将";
AppCnName[MjClient.APP_TYPE.QXXZMJ] = "牌友联盟徐州麻将";
AppCnName[MjClient.APP_TYPE.QXYZQP] = "牌友联盟永州跑胡子";
AppCnName[MjClient.APP_TYPE.QXNTQP] = "牌友联盟南通棋牌";
AppCnName[MjClient.APP_TYPE.QXYCQP] = "牌友联盟盐城棋牌";
AppCnName[MjClient.APP_TYPE.QXTHMJ] = "牌友联盟通化棋牌";
AppCnName[MjClient.APP_TYPE.QXYYQP] = "牌友联盟湖南棋牌";
AppCnName[MjClient.APP_TYPE.QXHAIANMJ] = "牌友联盟海安麻将";
AppCnName[MjClient.APP_TYPE.TXJINZHONGMJ] = "天星山西麻将";
AppCnName[MjClient.APP_TYPE.TXLVLIANGMJ] = "天星吕梁麻将";
AppCnName[MjClient.APP_TYPE.TXLINFENMJ] = "天星临汾麻将";
AppCnName[MjClient.APP_TYPE.YLHUNANMJ] = "永利湖南竞技麻将";
AppCnName[MjClient.APP_TYPE.QXLYQP] = "牌友联盟耒阳字牌";
AppCnName[MjClient.APP_TYPE.BDHYZP] = "北斗衡阳字牌";
AppCnName[MjClient.APP_TYPE.BDYZPHZ] = "北斗永州跑胡子";
AppCnName[MjClient.APP_TYPE.QXSYDTZ] = "天天2棋牌";
AppCnName[MjClient.APP_TYPE.QXXXGHZ] = "北斗棋牌";
AppCnName[MjClient.APP_TYPE.AYGUIZHOUMJ] = "爱游贵州麻将";
AppCnName[MjClient.APP_TYPE.LYSICHUANMJ] = "乐易四川竞技麻将";
AppCnName[MjClient.APP_TYPE.HUNANWANGWANG] = "湖南旺旺竞技";
AppCnName[MjClient.APP_TYPE.DQSHANXIMJ] = "兜趣山西麻将";
AppCnName[MjClient.APP_TYPE.HUBEIMJ] = "湖北麻将";

var AppEnv = {};
AppEnv[MjClient.APP_TYPE.QXJSMJ] = "js3mj";
AppEnv[MjClient.APP_TYPE.JSMJ] = "nanjing";
AppEnv[MjClient.APP_TYPE.QXHAMJ] = "huaian";
AppEnv[MjClient.APP_TYPE.QXXZMJ] = "xuzhou";
AppEnv[MjClient.APP_TYPE.QXYZQP] = "yongzhou";
AppEnv[MjClient.APP_TYPE.QXNTQP] = "nantong";
AppEnv[MjClient.APP_TYPE.QXYCQP] = "yancheng";
AppEnv[MjClient.APP_TYPE.QXTHMJ] = "tonghua";
AppEnv[MjClient.APP_TYPE.QXYYQP] = "yueyang";
AppEnv[MjClient.APP_TYPE.QXHAIANMJ] = "haian";
AppEnv[MjClient.APP_TYPE.TXJINZHONGMJ] = "jinzhong";
AppEnv[MjClient.APP_TYPE.TXLVLIANGMJ] = "lvliang";
AppEnv[MjClient.APP_TYPE.TXLINFENMJ] = "linfen";
AppEnv[MjClient.APP_TYPE.YLHUNANMJ] = "ylhunan";
AppEnv[MjClient.APP_TYPE.QXLYQP] = "leiyang";
AppEnv[MjClient.APP_TYPE.BDHYZP] = "hengyang";
AppEnv[MjClient.APP_TYPE.BDYZPHZ] = "beidouyongzhou";
AppEnv[MjClient.APP_TYPE.QXSYDTZ] = "shaoyang";
AppEnv[MjClient.APP_TYPE.QXXXGHZ] = "xiangxiang";
AppEnv[MjClient.APP_TYPE.AYGUIZHOUMJ] = "guizhou";
AppEnv[MjClient.APP_TYPE.LYSICHUANMJ] = "sichuan";
AppEnv[MjClient.APP_TYPE.HUNANWANGWANG] = "wangwang";
AppEnv[MjClient.APP_TYPE.DQSHANXIMJ] = "shanxi";
AppEnv[MjClient.APP_TYPE.HUBEIMJ] = "hubei";

//活动类型
//0文字，1图片，2认证有礼，3投诉建议，4开房奖元宝，5对战奖元宝,6月充值回馈,7元宝兑换钻石额度,8双11狂欢活动
MjClient.ACTIVITY_TYPE = {
    WEN_ZI: 0,
    TU_PIAN: 1,
    REN_ZHENG: 2,
    JIAN_YI: 3,
    KAI_FANG: 4,
    DUI_ZHAN: 5,
    MONTH_RECHARGE:6,
    YUANBAO_DUIHUAN_ZUANSHI:7,
    DOUBLE_11:8,
    SCREEN_TIME:9,//防沉迷公告
};

//活动里的跳转类型
//0无，1跳转商城，2跳转网页外部浏览器，3分享, 4内部浏览器, 5比赛场，6请求后台后再打开网页
MjClient.ACTIVITY_ACTION_TYPE = {
    NONE: 0,
    SHANG_CHENG: 1,
    WEB_VIEW: 2,
    FEN_XIANG: 3,
    WEB_VIEW_INSIDE: 4,
    BI_SAI: 5,
    OPEN_BROWSER: 6,
    OPEN_ZHIFUBAO_HONGBAO:7
};



//运营功能活动
MjClient.FUNCTION_CONFIG_TYPE = {
    JIA_YOU_HONG_BAO: "JIA_YOU_HONG_BAO", //加油红包
    JI_FEN_SHANG_CHENG: "JI_FEN_SHANG_CHENG", //积分商城
    ZHUA_ZHUA_LE: "ZHUA_ZHUA_LE", //全民抓抓乐
    QIAN_DAO_YOU_LI: "QIAN_DAO_YOU_LI", //签到有礼
    DA_ZHUAN_PAN: "DA_ZHUAN_PAN", //幸运大转盘
    ZA_JIN_DAN: "ZA_JIN_DAN", //欢乐砸金蛋
    ZHONG_JIN_ZHAO_MU: "ZHONG_JIN_ZHAO_MU", //重金招募
    CAI_SHEN: "CAI_SHEN", //财神活动
    CHONG_ZHI_YOU_LI: "CHONG_ZHI_YOU_LI", //充值有礼
    JU_LE_BU_FU_LI: "JU_LE_BU_FU_LI", //亲友圈福利
    XIN_REN_FU_LI: "XIN_REN_FU_LI", //新人福利
    XIN_SHOU_LI_BAO: "XIN_SHOU_LI_BAO", //新手礼包
    SAI_LONG_ZHOU: "SAI_LONG_ZHOU", //赛龙舟
    BANG_DING_SHOU_JI: "BANG_DING_SHOU_JI", //绑定手机
    YAO_QING_HONG_BAO: "YAO_QING_HONG_BAO", //邀请红包
    DA_TING_FEN_XIANG: "DA_TING_FEN_XIANG", //大厅分享
    FRIENDS_PK: "FRIENDS_PK", //朋友圈对战
    SHI_MING_REN_ZHENG: "SHI_MING_REN_ZHENG", //实名认证
    ACTIVE_RANK: "ACTIVE_RANK", //排行榜活动
    MIAN_FEI_LI_QUAN: "MIAN_FEI_LI_QUAN", //免费礼券
    QIAN_DAO_CHOU_JIANG: "QIAN_DAO_CHOU_JIANG", //签到抽奖
    ZHONG_QIU_JIE_YONGZHOU :"ZHONG_QIU_JIE_YONGZHOU",//永州中秋节策划方案
    ZHONG_QIU_JIE_88_YUAN:"ZHONG_QIU_JIE_88_YUAN", //中秋节88元红包
    ZHONG_QIU_JIE_RANK:"ZHONG_QIU_JIE_RANK",// 中秋排行榜
    JIN_BI_CHANG_HUO_DONG:"JIN_BI_CHANG_HUO_DONG",//金币场活动
    JIN_BI_CHANG_HUO_DONG_2:"JIN_BI_CHANG_HUO_DONG_2", //金币场活动2 连胜7局
    MEI_RI_REN_WU:"MEI_RI_REN_WU",//每日任务（红包）
    GOLD_YAO_QING_HONG_BAO:"GOLD_YAO_QING_HONG_BAO",//金币场邀请红包
    LI_CAI_BAO_XIANG:"LI_CAI_BAO_XIANG", //理财宝箱
    CHUAN_QI_LAI_LE:"CHUAN_QI_LAI_LE", //传奇来了弹窗
    JIN_BI_CHANG_HONG_BAO_2019:"JIN_BI_CHANG_HONG_BAO_2019",//2019新年金币场红包
    CHUN_JIE_CHOU_QIAN:"CHUN_JIE_CHOU_QIAN",//春节抽签活动
    FRIENDS_PK_NEW: "FRIENDS_PK_NEW", //新朋友圈对战
    FLY_A_KITE:"FLY_A_KITE", //清明放风筝
    COLLECT_SPRING_BEAN:"COLLECT_SPRING_BEAN",//五一集春豆
    ACTIVITY_CLUB_MONTH:"ACTIVITY_CLUB_MONTH",//场次增长
    ER_REN_RANK:"ER_REN_RANK",//二人排行榜
    CLUB_COST_ACTIVITY:"CLUB_COST_ACTIVITY",//亲友圈元宝消耗活动(新版)
    ACTIVITY_DOUBLE_11:"ACTIVITY_DOUBLE_11",//双11活动
    LI_CAI_BAO_XIANG_ZS:"LI_CAI_BAO_XIANG_ZS", //钻石宝箱
};

MjClient.isOpentFunctionType = function(funcType) {
    var openFuncs = MjClient.systemConfig.functionConfig;
    if (!openFuncs || typeof(openFuncs) == 'undefined' || openFuncs.length == 0) {
        cc.log('warn 没有配置 MjClient.systemConfig.functionConfig');
        return false;
    }

    var allFuncs = MjClient.FUNCTION_CONFIG_TYPE;
    for (var i in allFuncs) {
        if (allFuncs[i] == funcType && openFuncs && openFuncs.indexOf(funcType) >= 0) {
            return true;
        }
    }

    return false;
}


//游戏大类型
MjClient.GAME_CLASS = {
    MA_JIANG: 0, //麻将
    NIU_NIU: 1, //牛牛
    GUAN_DAN: 2, //掼蛋
    PAO_HU_ZI: 3, //跑胡子
    CHANG_PAI: 4, //长牌
    PAO_DE_KUAI: 5, //跑得快
    DOU_DI_ZHU: 6, //斗地主
    SAN_DA_HA: 7, // 三打哈
    DA_QI: 8, //打七
    BAN_BIAN_TIAN_ZHA:9,   //半边天炸
    NIU_SHI_BIE: 11,  // 牛十别
    DA_ZHA_DAN : 12,    //打炸弹
    QIAN_FEN:13,  //沅江千分
    DA_MA_ZI:14,  //打码子
    DA_TONG_ZI:15,   //打筒子
    BA_ZHA_DAN:16,   //霸炸弹
    GAN_DENG_YAN:17   //干瞪眼
};

//资源分类类型（需要添加类型请找毛羽）
MjClient.RESOURCE_CLASS = {
    MA_JIANG: 1, //麻将
    ZI_PAI: 2, //字牌
    POKER: 3,//扑克
    PAO_DE_KUAI:4, //跑得快和斗地主
    CHANG_PAI: 5, //长牌

    GOLD_FIELD: 1001 //金币场
};

MjClient.windowUpdate = false;
MjClient.RESOURCE_DIR = [];
if (cc.sys.OS_WINDOWS != cc.sys.os || MjClient.windowUpdate) {
    MjClient.RESOURCE_DIR[0] = "update/res";
    MjClient.RESOURCE_DIR[MjClient.RESOURCE_CLASS.MA_JIANG] = "update/res_majiang"; //麻将
    MjClient.RESOURCE_DIR[MjClient.RESOURCE_CLASS.ZI_PAI] = "update/res_zipai"; //字牌
    MjClient.RESOURCE_DIR[MjClient.RESOURCE_CLASS.POKER] = "update/res_poker"; //扑克
    MjClient.RESOURCE_DIR[MjClient.RESOURCE_CLASS.PAO_DE_KUAI] = "update/res_paodekuai"; //跑得快
    MjClient.RESOURCE_DIR[MjClient.RESOURCE_CLASS.GOLD_FIELD] = "update/res_goldField"; //金币场
} else {
    MjClient.RESOURCE_DIR[0] = "res";
    MjClient.RESOURCE_DIR[MjClient.RESOURCE_CLASS.MA_JIANG] = "res_majiang"; //麻将
    MjClient.RESOURCE_DIR[MjClient.RESOURCE_CLASS.ZI_PAI] = "res_zipai"; //字牌
    MjClient.RESOURCE_DIR[MjClient.RESOURCE_CLASS.POKER] = "res_poker"; //扑克
    MjClient.RESOURCE_DIR[MjClient.RESOURCE_CLASS.PAO_DE_KUAI] = "res_paodekuai"; //跑得快
    MjClient.RESOURCE_DIR[MjClient.RESOURCE_CLASS.GOLD_FIELD] = "res_goldField"; //金币场
}


//地区
MjClient.GAME_TYPE = {
    LIAN_YUN_GANG: 0, //连云港 新浦麻将
    SHU_YANG: 2017001, //沭阳
    GUAN_YUN: 2017002, //灌云
    DONG_HAI: 2017003, //东海
    NIU_NIU: 2017004, //牛牛
    NAN_JING: 2017005, //南京
    SU_QIAN: 2017006, //宿迁
    HUAI_AN: 2017007, //淮安    楚州麻将
    HA_14DUN: 2017008, //淮安十四墩
    HA_HONGZHONG: 2017009, //淮安红中 自由麻将 改名红中麻将
    XU_ZHOU: 2017010, //徐州
    TUAN_TUAN_ZHUAN: 2017011, //掼蛋
    PAO_HU_ZI: 2017012, //跑胡子三人场 扯胡子三人场
    SI_YANG: 2017013, //泗阳
    XIN_SI_YANG: 2019222, //新泗阳
    SI_YANG_HH: 2017014, //泗阳晃晃
    YAN_CHENG_HH: 2017015, //盐城晃晃
    RU_GAO: 2017016, //如皋 如皋长牌
    GAN_YU: 2017017, //赣榆
    HUAI_AN_TTZ: 2017018, //淮安团团转     团团转麻将
    HUAI_AN_CC: 2017019, //淮安出铳
    RU_GAO_MJH: 2017020, //如皋麻将胡
    GUAN_NAN: 2017021, //灌南
    PAO_DE_KUAI: 2017022, //跑得快
    XIN_PU_HZ: 2017023, //红中麻将
    LUO_DI_SAO: 2017024, //落地扫
    PAO_HU_ZI_SR: 2017025, //跑胡子四人场    坐醒四人场
    DOU_DI_ZHU_NT: 2017026, //南通斗地主
    NTHZ: 2017027, //南通红中/十三张麻将
    ZP_LY_CHZ: 2017028, //字牌耒阳扯胡子 耒阳字牌
    TONG_HUA: 2017029, //通化麻将
    PAO_HU_ZI_King: 2017030, //跑胡子四王三人场  四王扯胡子
    PAO_HU_ZI_SR_King: 2017031, //跑胡子四王坐醒
    CHANG_SHA: 2017032, //长沙麻将
    LIAN_SHUI: 2017033, //淮安涟水麻将
    DOU_DI_ZHU_TY: 2017034, //通用斗地主
    LEI_YANG_GMJ: 2017035, //耒阳鬼麻将
    PAO_DE_KUAI_TY: 2017036, //通用跑得快
    TY_HONGZHONG: 2017037, //湖南通用红中麻将
    YZ_PAO_DE_KUAI_TY: 2017038, //永州通用跑得快
    TY_ZHUANZHUAN: 2017039, //通用转转
    HUAI_AN_ERZ: 2017040, //淮安二人转
    PAO_HU_ZI_ER: 2017041, //跑胡子二人玩法
    SAN_DA_HA: 2017042, //三打哈
    HY_LIU_HU_QIANG: 2017043, //衡阳六胡抢
    HY_SHI_HU_KA: 2017044, //衡阳十胡卡
    BAI_PU_LIN_ZI: 2017045, //白蒲林梓胡
    RU_GAO_SHUANG_JIANG: 2017046, //如皋长牌双将
    PAO_HU_ZI_LR_King: 2017047, //四王单挑玩法
    HAI_AN_MJ: 2017048, //海安麻将
    HAI_AN_BAI_DA: 2017049, //海安白搭麻将
    JIN_ZHONG_MJ: 2017050, //晋中麻将
    PAO_DE_KUAI_NT: 2017051, //南通跑得快
    YONG_ZHOU_MJ: 2017052, //永州麻将
    ML_HONGZHONG: 2017053, //汨罗红中  现在命名为 红中麻将
    HZ_TUI_DAO_HU: 2017054, //洪泽推到胡
    DOU_DI_ZHU_JZ: 2017055, //晋中斗地主
    DOU_DI_ZHU_ZERO:2019174,             //斗地主单机版
    DOU_DI_ZHU_HA: 2017056, //海安斗地主   《南通斗地主》移植过来
    PAO_DE_KUAI_HA: 2017057, //淮安跑得快   《通用跑得快》移植过来
    PAO_DE_KUAI_JZ: 2017058, //晋中跑得快   《通用跑得快》移植过来
    JIANG_HUA_MJ: 2017059, //江华麻将
    JIANG_YONG_15Z: 2017060, //江永15张
    DAO_ZHOU_MJ: 2017061, //道州麻将
    RU_DONG_SHUANG_JIANG: 2017062, //如东双将
    PAO_DE_KUAI_LYG: 2017063, //连云港跑得快
    PAO_DE_KUAI_XU_ZHOU: 2017064, //徐州港跑得快(连云港跑得快)
    JIN_ZHONG_KD: 2017065, //晋中点扣
    PAO_DE_KUAI_HAIAN: 2018066, //海安跑得快
    DA_TONG_ZI_SHAO_YANG: 2018067, //邵阳打筒子
    RU_GAO_ER: 2018068, //如皋长牌，二人玩法
    JIN_ZHONG_TUI_DAO_HU: 2018069, //晋中推倒胡
    LING_SHI_BIAN_LONG: 2018070, //灵石编龙
    LING_SHI_BAN_MO: 2018071, //灵石半摸
    PING_YAO_MA_JIANG: 2018072, //平遥麻将
    PING_YAO_KOU_DIAN: 2018073, //平遥扣点
    SHAO_YANG_BO_PI: 2018074,       //邵阳剥皮
    JIE_XIU_1_DIAN_3: 2018075, //介休1点3
    JIE_XIU_KOU_DIAN: 2018076, //介休扣点
    JIN_ZHONG_GUAI_SAN_JIAO: 2018077, //晋中拐三角
    SHAO_YANG_ZI_PAI: 2018078,      //邵阳字牌
    XIANG_XIANG_GAO_HU_ZI: 2018079, //湘乡告胡子
    LOU_DI_FANG_PAO_FA: 2018080, //娄底放炮罚
    WANG_DIAO_MA_JIANG: 2018081, //王钓麻将
    SHOU_YANG_QUE_KA: 2018082, //寿阳缺卡
    LV_LIANG_KOU_DIAN: 2018083, //吕梁扣点
    JIN_ZHONG_LI_SI: 2018084, //晋中立四麻将
    HONG_TONG_WANG_PAI: 2018085, //洪洞王牌
    DOU_DI_ZHU_LIN_FEN: 2018086, //临汾斗地主
    LIN_FEN_YING_SAN_ZUI: 2018087, //临汾硬三嘴
    LIN_FEN_YI_MEN_ZI: 2018088, //临汾一门子
    SHAO_YANG_MA_JIANG: 2018089, // 邵阳麻将
    FEN_XI_YING_KOU: 2018090, //汾西硬扣
    JI_XIAN_1928_JIA_ZHANG: 2018091, //吉县1928夹张 (临汾)
    ML_HONG_ZI: 2018092, //汨罗红字
    LIN_FEN_XIANG_NING_SHUAI_JIN: 2018093, //临汾乡宁摔金
    XIAO_YI_KOU_DIAN: 2018094, //吕梁孝义扣点
    LIN_FEN_KOU_DIAN_FENG_ZUI_ZI: 2018095, //临汾扣点风嘴子, 当前存在晋中app中
    JIN_ZHONG_CAI_SHEN: 2018096, //晋中财神
    HENG_YANG_SHIWUHUXI: 2018097, //衡阳字牌15胡息
    HUAI_HUA_HONG_GUAI_WAN: 2018098, //怀化红拐弯
    XU_ZHOU_PEI_XIAN: 2018099, //徐州沛县麻将
    LV_LIANG_MA_JIANG: 2018100, //吕梁麻将
    XIANG_YIN_TUI_DAO_HU: 2018101, //湘阴推倒胡
    LV_LIANG_DA_QI: 2018102, //吕梁打七
    DOU_DI_ZHU_LV_LIANG: 2018103, //吕梁斗地主
    XIN_NING_MA_JIANG: 2018104, //新宁麻将
    FAN_SHI_XIA_YU: 2018105, //山西忻州：繁峙下雨麻将
    DAI_XIAN_MA_JIANG: 2018106, // 代县麻将
    YUE_YANG_SAN_DA_HA: 2018107, // 岳阳三打哈
    YUE_YANG_HONG_ZHONG: 2018108, // 岳阳红中
    PAO_DE_KUAI_HUAIAN_NEW: 2018109, // 跑得快(淮安) 《淮安跑得快》移植过来 两者并存
    LONG_HUI_BA_ZHA_DAN: 2018110, //隆回霸炸弹
    XIANG_XIANG_HONG_ZHONG: 2018111, // 红中麻将(湘乡红中) 《邵阳通用红中》移植过来
    XIANG_YIN_ZHUO_HONG_ZI: 2018112, //湘阴捉红字
    DOU_DI_ZHU_XIN_ZHOU: 2018113, // 忻州斗地主
    HY_ER_PAO_HU_ZI: 2018114, // 衡阳二人跑胡子
    XIANG_XIANG_PAO_HU_ZI: 2018115, //湘乡跑胡子
    SHAO_YANG_FANG_PAO_FA: 2018116, //邵陽娄底放炮罚
    WU_TAI_KOU_DIAN: 2018117, //五台扣点
    AN_HUA_PAO_HU_ZI: 2018118, //安化跑胡子
    MJ_ZHUO_XIA_ZI: 2018119, //捉虾子
    BAN_BIAN_TIAN_ZHA: 2018120,     //半边天炸
    LENG_SHUI_JIANG_SHI_HU_DAO: 2018121,//冷水江十胡倒
    XIANG_TAN_PAO_HU_ZI: 2018122,   //湘潭跑胡子
    XIN_ZHOU_SAN_DA_ER: 2018123, // 忻州三打二
    HENG_YANG_SAN_DA_HA: 2018124, // 衡阳三打哈
    DA_NING_SHUAI_JIN: 2018125, // 大宁摔金
    YUE_YANG_WAI_HU_ZI: 2018126, // 岳阳歪胡子
    HENG_YANG_CHANG_SHA: 2018127,   // 衡阳长沙麻将
    YUE_YANG_FU_LU_SHOU: 2018128, //岳阳福禄寿
    XIANG_XIANG_SAN_DA_HA: 2018129, // 湘乡三打哈
    HUAI_HUA_MA_JIANG:  2018130,    //怀化麻将
    FEN_YANG_QUE_MEN: 2018131,       //汾阳缺门
    XUE_LIU: 2018132,                //血流
    XUE_ZHAN: 2018133,               //血战
    AN_HUA_MA_JIANG:    2018134,  //安化七王麻将
    AN_HUA_MA_JIANG_SW: 2018144,  //安化四王麻将
    JING_LE_KOU_DIAN: 2018135,               //静乐扣点
    HENG_YANG_FANG_PAO_FA: 2018136, //衡阳放炮罚
    DA_TONG_GUAI_SAN_JIAO: 2018137,  //大同拐三角(山西)
    LUAN_GUA_FENG: 2018138,          //乱刮风
    YY_AN_HUA_PAO_HU_ZI: 2018139, //岳阳 安化跑胡子
    DOU_DI_ZHU_DA_TONG: 2018140, //大同斗地主
	DA_TONG_ZHA_GU_ZI: 2018141,           //大同扎股子
    CHEN_ZHOU_ZI_PAI:2018142,               //郴州字牌
    GUI_YANG_ZI_PAI:2018143,                //桂阳字牌
    YUE_YANG_NIU_SHI_BIE:2018145,       // 株洲牛十别
    NING_XIANG_PAO_HU_ZI:2018146,      //宁乡跑胡子
    NING_XIANG_KAI_WANG: 2018147,      //宁乡开王麻将
    YUE_YANG_PENG_HU: 2018148,      //岳阳碰胡
    YI_YANG_WAI_HU_ZI: 2018149,           //益阳歪胡子
    TAO_JIANG_MA_JIANG: 2018150,      //桃江麻将
    YUE_YANG_YI_JIAO_LAI_YOU:2018151,        //一脚赖油
    DIAN_TUO: 2018152,     //掂坨
    YUE_YANG_DA_ZHA_DAN: 2018153,     //岳阳打炸弹
    YI_YANG_MA_JIANG:2018154,           //益阳麻将
	YUE_YANG_YUAN_JIANG_QIAN_FEN:2018155,  // 岳阳沅江千分
    CHEN_ZHOU:2018156,                  //郴州麻将
    YUAN_JIANG_MJ: 2018157,              //沅江麻将
    CHEN_ZHOU_MAO_HU_ZI:2018158,            // 郴州毛胡子
    ZHU_ZHOU_DA_MA_ZI:2018159,       // 株洲打码子
    NING_XIANG_MJ: 2018160,         //宁乡麻将
    XIANG_XI_2710: 2018161,                  // 湘西2710
    PING_JIANG_ZHA_NIAO:2018162,            // 平江扎鸟
    FU_LU_SHOU_ER_SHI_ZHANG:2018163,    //福禄寿20张
    CHANG_DE_PAO_HU_ZI:2018164,            // 常德跑胡子
    HAN_SHOU_PAO_HU_ZI:2018165,            //汉寿跑胡子
    CHAO_GU_MJ:2018166,                    //炒股麻将
    NAN_XIAN_GUI_HU_ZI:2018167,         //南县鬼胡子
    NAN_XIAN_MJ:2018168,                //南县麻将
    YUN_CHENG_FENG_HAO_ZI:2018169,       //运城风耗子
    YUN_CHENG_TIE_JIN:2018170,            //运城贴金
    JI_SHAN_NIU_YE_ZI:2019171,            //稷山扭叶子麻将
    HE_JIN_KUN_JIN:2019173,            //河津捆金
    YUAN_JIANG_GUI_HU_ZI:2018172,         //沅江鬼胡子
    XIANG_SHUI_MJ:2019175,                 //响水麻将
    SHAO_YANG_SAN_DA_HA: 2019176, // 邵阳三打哈
    SHI_MEN_PAO_HU_ZI:2019177,         //石门跑胡子
    QU_TANG_23_ZHANG:2019178,          // 曲塘23张（南通app）
    XIANG_TAN_SAN_DA_HA:2019179,       // 湘潭三打哈
    AN_XIANG_WEI_MA_QUE:2019180,        //安乡偎麻雀
    GUI_ZHOU_PU_DING_MJ:2019181,        //贵州普定麻将
    GUI_ZHOU_AN_SHUN_MJ:2019182,        //贵州安顺麻将
    GUI_ZHOU_SAN_DING_LIANG_FANG:2019183,        //贵州三丁两房麻将
    GUI_ZHOU_LIANG_DING_LIANG_FANG:2019185,       //贵州两丁两房麻将
    PAO_DE_KUAI_ZERO:2019184,                //AI跑的快测试版
    HUAI_AN_DOU_DI_ZHU:2019186,         //淮安斗地主
    SAN_DA_HA_NEW: 2019187,                //新三打哈
    GUI_ZHOU_SAN_DING_GUAI:2019188,         //贵州三丁拐麻将
    GUI_ZHOU_ER_DING_GUAI:2019189,          //贵州二丁拐麻将
    YUAN_LING_PAO_HU_ZI: 2019190,           //沅陵跑胡子
    DOU_DI_ZHU_GZ: 2019191,                 //贵州斗地主
    GUI_ZHOU_XMY_GUI_YANG_ZHUO_JI: 2019192,      //贵州新麻友贵阳捉鸡麻将
    GUI_ZHOU_MEN_HU_XUE_LIU: 2019193,           //贵州闷胡血流
    YONG_LI_SAN_DA_HA: 2019194,                 // 永利三打哈
    GUI_ZHOU_GUI_YANG_ZHUO_JI: 2019195,      //贵州贵阳捉鸡麻将
    XIANG_XI_96POKER: 2019196,                 //湘西96扑克
    GUI_ZHOU_DU_YUN_MJ: 2019197,        //贵州都匀麻将
    ML_HONGZHONG_ZERO: 2019198,         //麻将AI测试端
    GUI_ZHOU_ZUN_YI_MJ: 2019199,         //贵州遵义麻将
    GUI_ZHOU_LIANG_DING_YI_FANG:2019200, //贵州两丁一房
    GUI_ZHOU_AN_LONG_MJ:2019201,         //贵州安龙麻将
    GUI_ZHOU_XING_YI_MJ:2019202,         //贵州兴义麻将
    GUI_ZHOU_WENG_AN_MJ:2019203,         //翁安麻将
    GUI_ZHOU_KAI_LI_MJ: 2019204,         // 贵州凯里麻将
    PAO_DE_KUAI_ELEVEN: 2019205,         // 跑得快11张
    GUI_ZHOU_LI_PING_MJ: 2019206,        // 贵州黎平麻将
    GUI_ZHOU_LIU_PAN_SHUI_MJ: 2019207,        // 贵州六盘水麻将
    GUI_ZHOU_TIAN_ZHU_MJ: 2019208,        // 贵州天柱麻将
    CHANG_SHA_ER_REN: 2019209,           //二人长沙麻将  二人缺门长麻
    GUI_ZHOU_RONG_JIANG_MJ:2019210,   // 贵州榕江麻将
    XU_PU_LAO_PAI: 2019211,           //淑浦老牌  邵阳(天天)
    GUI_ZHOU_TONG_REN_MJ:2019212,   // 贵州铜仁麻将
    GUI_ZHOU_BI_JIE_MJ:2019213,   // 贵州毕节麻将
    GUI_ZHOU_REN_HUAI_MJ:2019214,   // 贵州仁怀麻将
    XU_PU_PAO_HU_ZI:2019215,   // 溆浦跑胡子 邵阳(天天)
    ER_REN_YI_FANG_MJ:2019216,   //二人一房麻将  岳阳,邵阳,永州（急速8张麻将）
    GUI_ZHOU_SUI_YANG_MJ:2019217,      // 贵州绥阳麻将
    YONG_ZHOU_BAO_PAI:2019218,      // 永州包牌
    GUI_ZHOU_JIN_SHA_MJ:2019219,      // 贵州金沙麻将
    GUI_ZHOU_XUE_ZHAN_DAO_DI_MJ: 2019220,  //贵州血战到底麻将
    DA_ZI_BO_PI: 2019221,  //大字剥皮,
    ZHUO_HAO_ZI:2019223,       ///捉耗子
    PAO_DE_KUAI_XIANG_SHUI:2019224,  ///响水跑得快
    HONG_ZE_MA_JIANG: 2019225,//洪泽麻将
    SHAN_XI_GAN_DENG_YAN: 2019226,   //干瞪眼
    YI_CHANG_XUE_LIU_MJ: 2019227 ,     //湖北:  宜昌血流成河麻将
    PAO_DE_KUAI_HBTY: 2019228,      //湖北通用跑得快
    EN_SHI_MA_JIANG: 2019232,   //恩施麻将(一痞二癞)
    WU_XUE_GE_BAN: 2019233,        //武穴隔板
    DANG_YANG_FAN_JING: 2019234,        //当阳翻精
    DA_YE_ZI_PAI: 2019235,  //大冶字牌
    HU_BEI_YI_JIAO_LAI_YOU: 2019236, // 湖北：一脚癞油
    CHONG_YANG_DA_GUN: 2019237, //崇阳打滚
    JING_ZHOU_MA_JIANG: 2019238,  //靖州麻将
	HU_BEI_JING_SHAN_MJ: 2019239,  //京山麻将
    CHONG_YANG_MJ: 2019240,  //湖北：崇阳麻将
    TONG_CHENG_MJ: 2019241,  //湖北：通城麻将
    YI_CHANG_SHANG_DA_REN: 2019242,  //湖北: 宜昌上大人
    HU_BEI_HUA_PAI:2019243,//湖北：湖北花牌
    DA_YE_KAI_KOU_FAN: 2019244,//湖北：大冶开口番
    CHUO_XIA_ZI: 2019245, // 湖北：戳虾子（湖北一脚癞油改的）
    YANG_XIN_MA_JIANG: 2019246, // 湖北：阳新麻将
    HONG_ZHONG_LAI_ZI_GANG: 2019247,//湖北：红中癞子杠
    HUANG_SHI_HH_MJ: 2019248, // 湖北：黄石晃晃麻将
    TONG_SHAN_HH_MJ: 2019249, // 湖北：通山晃晃麻将
    DA_YE_510K: 2019250, // 湖北：大冶510K
    JIANG_LING_HONGZHONG: 2019251,//湖北：江陵红中
    QI_CHUN_HH_MJ: 2019252, // 湖北：蕲春晃晃
    QI_CHUN_GD_MJ: 2019253, //湖北，蕲春广东麻将
    CHONG_YANG_HUA_QUAN_JIAO: 2019254, //湖北：崇阳画圈脚
    GONG_AN_HUA_PAI: 2019255, //湖北.公安花牌
    DOU_DI_ZHU_HBTY: 2019256,      //湖北通用斗地主
    DOU_DI_ZHU_QC: 2019257,      //蕲春斗地主
    SHI_SHOU_AI_HUANG: 2019258,  //湖北：石首捱晃麻将
    QIAN_JIANG_HH_MJ: 2019259,  //湖北：潜江晃晃麻将
    WU_XUE_MJ: 2019260,         //湖北：武穴麻将
    XIAO_GAN_KA_WU_XING:  2019261,    //湖北：孝感卡五星麻将
    QI_CHUN_HONG_ZHONG_GANG:2019262, //蕲春红中杠
    TONG_CHENG_GE_ZI_PAI: 2019263,  //湖北: 通城个子牌
    TONG_SHAN_DA_GONG: 2019264, // 湖北：通山打拱
    QI_CHUN_DA_GONG: 2019265, // 湖北：蕲春打拱
    DA_YE_DA_GONG: 2019266, // 湖北：大冶打拱
    EN_SHI_SHAO_HU: 2019267, // 湖北：恩施绍胡
    WU_XUE_510K: 2019268,    //湖北：武穴510K
    SUI_ZHOU_KA_WU_XING: 2019269,    //湖北：随州卡五星
    QIAN_JIANG_QIAN_FEN: 2019270, // 湖北：潜江千分
    YONG_ZHOU_LAO_CHUO:  2019271, //永州老戳

};

//玩法
MjClient.PLAY_TYPE = {
    PIAO_HU: 1, //飘胡
    DIAN_PAO_HU: 2, //点炮胡
    ZI_MO_HU: 3, //自摸胡
    QI_XIAO_DUI: 4, //七小对
    SHI_SAN_YAO: 5, //十三幺
    // SHUAI_QIANG:6,			//摔枪
    // DA_GE_DA:7,				//大哥大
    // DIAN_PAO_SAN_JIA:8,		//点炮包三家
    // XUAN_FENG_GANG:9,		//旋风杠
    // DA_HU:10,				//大胡
    // HAS_HUN:11,				//会牌
    // YI_TIAO_LONG:12,		//一条龙
    // JIANG_28:13,			//28是否能做将
    QING_YI_SE: 14, //清一色
    // JUE_TOU_HUI:15,			//绝
    // GANG:16,				//杠
    // JIA_GANG:17,			//加钢
    // QIONG_HU:18,			//穷胡
    // TUI_DAO_HU:19,			//推倒胡
    // SAN_QING:20,			//三清
    // SI_QING:21,				//四清
    // TIAN_HU:22,				//天胡
    // DI_HU:23,				//地胡
};


//带花类型
var WithFlowerType = {
    noFlower: 0, //无花
    commonFlower: 1, //普通花，春夏秋冬，梅兰竹菊
    zfbFlower: 2, //中发白作花

    // 灌云玩法
    zFlower4: 3, //中作花 4张
    dnxbzFlower20: 4, //东南西北中作花 20张
    dnxbzfbFlower28: 5, //东南西北中发白作花 28张

    // 淮安团团转麻将玩法
    flower4: 6, // 春夏秋冬
    flower8: 7, // 春夏秋冬,梅兰竹菊
};

// 听牌类型
var TingCardType = {
    noTing: 0, //不可以听牌
    commonTing: 1, //普通听牌
    tingZiMo: 2, //听牌后其他三家都自摸
};

// 麻将游戏状态
var TableState = {
    waitJoin: 1,
    waitReady: 2,
    waitPut: 3,
    waitEat: 4,
    waitCard: 5,
    roundFinish: 6,
    isReady: 7,
    waitJiazhu: 8, //每局发牌前等待加注
    waitDingZhuang: 9,
    waitLong: 10, //每局发牌前龙操作
    waitJiaoFen: 11, // 三打哈叫分
    waitJiaoZhu: 12, // 三打哈叫主
    waitMaiPai: 13, // 三打哈埋牌
    waitKouDi: 14, // 三打哈扣底
    waitWang: 15, // 选择王牌
    afterReady: 16, // 准备后状态 (用于处理准备后发片前的逻辑)
    waitShuffle: 17,       // 洗牌
    waitChooseCard: 18, //忻州三打二选择朋友
    waitSelect: 19, // 等待玩家操作
    waitBao: 20, // 等待选择包牌 (打炸弹)
    waitTouXiang: 21, // 等待投降确认（打码子）
    waitBaoXi: 22,       //打码子报喜阶段
    isBaoXi: 23,         //打码子已报喜
    waitBaoTing: 24,    // 等待报听(贵州闷胡血流)
	waitHuanPai: 25,    // 换牌状态(湖北宜昌血流成河)
    waitPuPai: 26,      // 扑牌状态(湖北宜昌血流成河)
    waitVieGuan: 27,      // 等待抢关
    waitLiangCard: 28,  // 等待亮牌：湖北黄石晃晃麻将
};

MjClient.getAppType = function() {
    var appType = cc.game.config["appType"];
    if (cc.isUndefined(appType)) {
        for (var key in PackageName2AppType) {
            var preKey = key.replace(/\*/g, "");
            var substrPackageName = MjClient.native.GetPackageName().substring(0, preKey.length);
            if (preKey == substrPackageName) {
                appType = PackageName2AppType[key];
                return appType;
            }
        }
        appType = PackageName2AppType[MjClient.native.GetPackageName()];
    }
    return appType;
};

MjClient.fzcyfont = (
    MjClient.getAppType() !== MjClient.APP_TYPE.QXYYQP &&
    MjClient.getAppType() !== MjClient.APP_TYPE.HUBEIMJ &&
    MjClient.getAppType() !== MjClient.APP_TYPE.YLHUNANMJ &&
    MjClient.getAppType() !== MjClient.APP_TYPE.AYGUIZHOUMJ)
    ?  "fonts/fzcy.ttf" : "fonts/lanting.TTF";
/*
    扑克牌 定义
 */
MjClient.CARD_JOKER_TYPE = {
    SMALL: 0,
    BIG: 1,
}

MjClient.CARD_FLOWER_TYPE = {
    HEI_TAO: 0,
    FANG_KUAI: 1,
    MEI_HUA: 2,
    HONG_TAO: 3,
}

var GamePlaybackUrlPrefix = {};
GamePlaybackUrlPrefix[MjClient.APP_TYPE.QXJSMJ] = "http://js3mj.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.JSMJ] = "http://nanjing.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.QXHAMJ] = "http://huaian.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.QXXZMJ] = "http://xuzhou.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.QXYZQP] = "http://yongzhou.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.QXNTQP] = "http://nantong.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.QXYCQP] = "http://yancheng.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.QXTHMJ] = "http://tonghua.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.QXYYQP] = "http://yueyang.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.QXHAIANMJ] = "http://haian.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.TXJINZHONGMJ] = "http://jinzhong.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.TXLVLIANGMJ] = "http://lvliang.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.TXLINFENMJ] = "http://linfen.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.YLHUNANMJ] = "http://ylhunan.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.QXLYQP] = "http://leiyang.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.BDHYZP] = "http://hengyang.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.BDYZPHZ] = "http://beidouyongzhou.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.QXSYDTZ] = "http://shaoyang.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.QXXXGHZ] = "http://xiangxiang.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.QXHHZP] = "http://huaihua.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.AYGUIZHOUMJ] = "http://guizhou.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.LYSICHUANMJ] = "http://sichuan.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.HUNANWANGWANG] = "http://wangwang.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.DQSHANXIMJ] = "http://shanxi.jtcfgame.com/playback/js3mj/";
// GamePlaybackUrlPrefix[MjClient.APP_TYPE.HUBEIMJ] = "http://hubei.jtcfgame.com/playback/js3mj/";
GamePlaybackUrlPrefix[MjClient.APP_TYPE.HUBEIMJ] = "http://146.56.224.12/playback/js3mj/";

var GameDownloadCfgUrl = {};
GameDownloadCfgUrl[MjClient.APP_TYPE.QXJSMJ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/js3mj/";
GameDownloadCfgUrl[MjClient.APP_TYPE.JSMJ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/nanjing/";
GameDownloadCfgUrl[MjClient.APP_TYPE.QXHAMJ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/huaian/";
GameDownloadCfgUrl[MjClient.APP_TYPE.QXXZMJ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/xuzhou/";
GameDownloadCfgUrl[MjClient.APP_TYPE.QXYZQP] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/yongzhou/";
GameDownloadCfgUrl[MjClient.APP_TYPE.QXNTQP] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/nantong/";
GameDownloadCfgUrl[MjClient.APP_TYPE.QXYCQP] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/yancheng/";
GameDownloadCfgUrl[MjClient.APP_TYPE.QXTHMJ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/tonghua/";
GameDownloadCfgUrl[MjClient.APP_TYPE.QXYYQP] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/hubei/";
GameDownloadCfgUrl[MjClient.APP_TYPE.QXHAIANMJ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/haian/";
GameDownloadCfgUrl[MjClient.APP_TYPE.TXJINZHONGMJ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/jinzhong/";
GameDownloadCfgUrl[MjClient.APP_TYPE.TXLVLIANGMJ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/lvliang/";
GameDownloadCfgUrl[MjClient.APP_TYPE.TXLINFENMJ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/linfen/";
GameDownloadCfgUrl[MjClient.APP_TYPE.YLHUNANMJ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/ylhunan/";
GameDownloadCfgUrl[MjClient.APP_TYPE.QXLYQP] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/leiyang/";
GameDownloadCfgUrl[MjClient.APP_TYPE.BDHYZP] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/hengyang/";
GameDownloadCfgUrl[MjClient.APP_TYPE.BDYZPHZ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/beidouyongzhou/";
GameDownloadCfgUrl[MjClient.APP_TYPE.QXSYDTZ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/shaoyang/";
GameDownloadCfgUrl[MjClient.APP_TYPE.QXXXGHZ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/xiangxiang/";
GameDownloadCfgUrl[MjClient.APP_TYPE.QXHHZP] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/huaihua/";
GameDownloadCfgUrl[MjClient.APP_TYPE.AYGUIZHOUMJ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/guizhou/";
GameDownloadCfgUrl[MjClient.APP_TYPE.LYSICHUANMJ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/sichuan/";
GameDownloadCfgUrl[MjClient.APP_TYPE.HUNANWANGWANG] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/wangwang/";
GameDownloadCfgUrl[MjClient.APP_TYPE.DQSHANXIMJ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/shanxi/";
// GameDownloadCfgUrl[MjClient.APP_TYPE.HUBEIMJ] = "http://yueyangclient.oss-cn-shenzhen.aliyuncs.com/update/hubei/";
GameDownloadCfgUrl[MjClient.APP_TYPE.HUBEIMJ] = "http://146.56.224.12/update/guizhou/";



if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb()) h5.nativeHelper.changeGameDownloadCfgUrl(GameDownloadCfgUrl);


var GameClassEnterBtn = {};
GameClassEnterBtn[MjClient.GAME_CLASS.MA_JIANG] = "hall/MJ.png";
GameClassEnterBtn[MjClient.GAME_CLASS.NIU_NIU] = "hall/niuniu.png";
GameClassEnterBtn[MjClient.GAME_CLASS.GUAN_DAN] = "hall/guandan.png";
GameClassEnterBtn[MjClient.GAME_CLASS.PAO_HU_ZI] = "hall/paohuzi.png";
GameClassEnterBtn[MjClient.GAME_CLASS.CHANG_PAI] = "hall/changpai.png";
GameClassEnterBtn[MjClient.GAME_CLASS.PAO_DE_KUAI] = "hall/paodekuai.png";
GameClassEnterBtn[MjClient.GAME_CLASS.DOU_DI_ZHU] = "hall/doudizhu.png";
GameClassEnterBtn[MjClient.GAME_CLASS.NIU_SHI_BIE] = "hall/niushibie.png";
GameClassEnterBtn[MjClient.GAME_CLASS.DA_MA_ZI] = "hall/niushibie.png";

var JoinRoomBtn = {};
JoinRoomBtn[MjClient.GAME_CLASS.MA_JIANG] = "joinGame/haoyouchang.png";
JoinRoomBtn[MjClient.GAME_CLASS.NIU_NIU] = "joinGame/haoyouchang.png";
JoinRoomBtn[MjClient.GAME_CLASS.GUAN_DAN] = "joinGame/haoyouchang.png";
JoinRoomBtn[MjClient.GAME_CLASS.PAO_HU_ZI] = "joinGame/haoyouchang.png";
JoinRoomBtn[MjClient.GAME_CLASS.CHANG_PAI] = "joinGame/haoyouchang.png";
JoinRoomBtn[MjClient.GAME_CLASS.PAO_DE_KUAI] = "joinGame/haoyouchang.png";
JoinRoomBtn[MjClient.GAME_CLASS.DOU_DI_ZHU] = "joinGame/haoyouchang.png";
JoinRoomBtn[MjClient.GAME_CLASS.NIU_SHI_BIE] = "joinGame/haoyouchang.png";
JoinRoomBtn[MjClient.GAME_CLASS.DA_MA_ZI] = "joinGame/haoyouchang.png";

var CreateRoomBtn = {};
CreateRoomBtn[MjClient.GAME_CLASS.MA_JIANG] = "joinGame/bisaichang.png";
CreateRoomBtn[MjClient.GAME_CLASS.NIU_NIU] = "joinGame/bisaichang.png";
CreateRoomBtn[MjClient.GAME_CLASS.GUAN_DAN] = "joinGame/bisaichang.png";
CreateRoomBtn[MjClient.GAME_CLASS.PAO_HU_ZI] = "joinGame/bisaichang.png";
CreateRoomBtn[MjClient.GAME_CLASS.CHANG_PAI] = "joinGame/bisaichang.png";
CreateRoomBtn[MjClient.GAME_CLASS.PAO_DE_KUAI] = "joinGame/bisaichang.png";
CreateRoomBtn[MjClient.GAME_CLASS.DOU_DI_ZHU] = "joinGame/bisaichang.png";
CreateRoomBtn[MjClient.GAME_CLASS.NIU_SHI_BIE] = "joinGame/bisaichang.png";
CreateRoomBtn[MjClient.GAME_CLASS.DA_MA_ZI] = "joinGame/bisaichang.png";


var GameClassTitleIcon = {};
GameClassTitleIcon[MjClient.GAME_CLASS.MA_JIANG] = "hall/MJ-biao.png";
GameClassTitleIcon[MjClient.GAME_CLASS.NIU_NIU] = "hall/NN-biao.png";
GameClassTitleIcon[MjClient.GAME_CLASS.GUAN_DAN] = "hall/guandan-biao.png";
GameClassTitleIcon[MjClient.GAME_CLASS.PAO_HU_ZI] = "hall/paohuzi-biao.png";
GameClassTitleIcon[MjClient.GAME_CLASS.CHANG_PAI] = "hall/changpai-biao.png";
GameClassTitleIcon[MjClient.GAME_CLASS.PAO_DE_KUAI] = "hall/paodekuai-biao.png";
GameClassTitleIcon[MjClient.GAME_CLASS.DOU_DI_ZHU] = "hall/doudizhu-biao.png";
GameClassTitleIcon[MjClient.GAME_CLASS.NIU_SHI_BIE] = "hall/niushibie-biao.png";
GameClassTitleIcon[MjClient.GAME_CLASS.DA_MA_ZI] = "hall/niushibie-biao.png";

var GameClassSettingJson = {};
GameClassSettingJson[MjClient.GAME_CLASS.PAO_DE_KUAI] = "setting_poker.json";
GameClassSettingJson[MjClient.GAME_CLASS.DOU_DI_ZHU] = "setting_poker.json";
GameClassSettingJson[MjClient.GAME_CLASS.SAN_DA_HA] = "setting_poker.json";
GameClassSettingJson[MjClient.GAME_CLASS.PAO_HU_ZI] = "setting_HongZi.json";
GameClassSettingJson[MjClient.GAME_CLASS.DA_QI] = "setting_poker.json";
GameClassSettingJson[MjClient.GAME_CLASS.MA_JIANG] = "setting_MJPlaying.json";
GameClassSettingJson[MjClient.GAME_CLASS.DA_TONG_ZI] = "setting_poker.json";
GameClassSettingJson[MjClient.GAME_CLASS.BA_ZHA_DAN] = "setting_poker.json";
GameClassSettingJson[MjClient.GAME_CLASS.BAN_BIAN_TIAN_ZHA] = "setting_poker.json";


var GameTypeList = {};
GameTypeList[MjClient.GAME_CLASS.MA_JIANG] = function() { return MjClient.gameListConfig.majiangList; };
GameTypeList[MjClient.GAME_CLASS.NIU_NIU] = function() { return MjClient.gameListConfig.niuniuList; };
GameTypeList[MjClient.GAME_CLASS.GUAN_DAN] = function() { return MjClient.gameListConfig.guandanList; };
GameTypeList[MjClient.GAME_CLASS.PAO_HU_ZI] = function() { return MjClient.gameListConfig.paohuziList; };
GameTypeList[MjClient.GAME_CLASS.CHANG_PAI] = function() { return MjClient.gameListConfig.changpaiList; };
GameTypeList[MjClient.GAME_CLASS.PAO_DE_KUAI] = function() { return MjClient.gameListConfig.paodekuaiList; };
GameTypeList[MjClient.GAME_CLASS.DOU_DI_ZHU] = function() { return MjClient.gameListConfig.doudizhulist; };
GameTypeList[MjClient.GAME_CLASS.NIU_SHI_BIE] = function() { return MjClient.gameListConfig.niushibieList; };
GameTypeList[MjClient.GAME_CLASS.DA_MA_ZI] = function() { return MjClient.gameListConfig.damaziList; };


var GameCnName = {};
GameCnName[MjClient.GAME_TYPE.LIAN_YUN_GANG] = "新浦麻将";
GameCnName[MjClient.GAME_TYPE.SHU_YANG] = "沭阳麻将";
GameCnName[MjClient.GAME_TYPE.GUAN_YUN] = "灌云麻将";
GameCnName[MjClient.GAME_TYPE.DONG_HAI] = "东海麻将";
GameCnName[MjClient.GAME_TYPE.NAN_JING] = "南京麻将";
GameCnName[MjClient.GAME_TYPE.SU_QIAN] = "宿迁麻将";
GameCnName[MjClient.GAME_TYPE.HUAI_AN] = "楚州麻将";
GameCnName[MjClient.GAME_TYPE.HA_HONGZHONG] = "红中麻将";
GameCnName[MjClient.GAME_TYPE.HA_14DUN] = "淮安14墩";
GameCnName[MjClient.GAME_TYPE.XU_ZHOU] = "徐州麻将";
GameCnName[MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN] = "团团转掼蛋";
GameCnName[MjClient.GAME_TYPE.NIU_NIU] = "牛牛";
GameCnName[MjClient.GAME_TYPE.PAO_HU_ZI] = "跑胡子";
GameCnName[MjClient.GAME_TYPE.SI_YANG] = "泗阳麻将";
GameCnName[MjClient.GAME_TYPE.XIN_SI_YANG] = "新泗阳麻将";
GameCnName[MjClient.GAME_TYPE.SI_YANG_HH] = "晃晃麻将";
GameCnName[MjClient.GAME_TYPE.YAN_CHENG_HH] = "盐城晃晃";
GameCnName[MjClient.GAME_TYPE.RU_GAO] = "如皋长牌";
GameCnName[MjClient.GAME_TYPE.GAN_YU] = "赣榆麻将";
GameCnName[MjClient.GAME_TYPE.HUAI_AN_TTZ] = "团团转麻将";
GameCnName[MjClient.GAME_TYPE.RU_GAO_MJH] = "如皋麻将胡";
GameCnName[MjClient.GAME_TYPE.QU_TANG_23_ZHANG] = "曲塘二十三张";
GameCnName[MjClient.GAME_TYPE.HUAI_AN_CC] = "淮安出铳";
GameCnName[MjClient.GAME_TYPE.HZ_TUI_DAO_HU] = "洪泽推倒胡";
GameCnName[MjClient.GAME_TYPE.HUAI_AN_ERZ] = "淮安二人转";
GameCnName[MjClient.GAME_TYPE.GUAN_NAN] = "灌南麻将";
GameCnName[MjClient.GAME_TYPE.PAO_DE_KUAI] = "跑得快";
GameCnName[MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO] = "AI跑得快";
GameCnName[MjClient.GAME_TYPE.PAO_DE_KUAI_NT] = "南通跑得快";
GameCnName[MjClient.GAME_TYPE.PAO_DE_KUAI_TY] = "跑得快";
GameCnName[MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN] = "11张跑得快";
GameCnName[MjClient.GAME_TYPE.PAO_DE_KUAI_JZ] = "晋中跑得快";
GameCnName[MjClient.GAME_TYPE.PAO_DE_KUAI_HA] = "淮安跑得快";
GameCnName[MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW] = "跑得快";
GameCnName[MjClient.GAME_TYPE.PAO_DE_KUAI_LYG] = "连云港跑得快";
GameCnName[MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI] = "响水跑得快";
GameCnName[MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN] = "海安跑得快";
GameCnName[MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU] = "徐州跑得快";
GameCnName[MjClient.GAME_TYPE.XIN_PU_HZ] = "红中麻将";
GameCnName[MjClient.GAME_TYPE.YZ_CHZTEST] = "永州扯胡子";
GameCnName[MjClient.GAME_TYPE.LUO_DI_SAO] = "落地扫";
GameCnName[MjClient.GAME_TYPE.PAO_HU_ZI_SR] = "坐醒四人场";
GameCnName[MjClient.GAME_TYPE.DOU_DI_ZHU_NT] = "斗地主";
GameCnName[MjClient.GAME_TYPE.DOU_DI_ZHU_TY] = "欢乐斗地主";
GameCnName[MjClient.GAME_TYPE.WU_XUE_GE_BAN] = "武穴隔板";
GameCnName[MjClient.GAME_TYPE.DIAN_TUO] = "掂坨";
GameCnName[MjClient.GAME_TYPE.NTHZ] = "广东红中麻将";
GameCnName[MjClient.GAME_TYPE.TONG_HUA] = "通化麻将";
GameCnName[MjClient.GAME_TYPE.CHANG_SHA] = "长沙麻将";
GameCnName[MjClient.GAME_TYPE.CHANG_SHA_ER_REN] = "二人缺门长麻";
GameCnName[MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU] = "湘阴推倒胡";
GameCnName[MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO] = "平江扎鸟";
GameCnName[MjClient.GAME_TYPE.LIAN_SHUI] = "涟水麻将";
GameCnName[MjClient.GAME_TYPE.TY_HONGZHONG] = "红中麻将";
GameCnName[MjClient.GAME_TYPE.ML_HONGZHONG] = "红中麻将";
GameCnName[MjClient.GAME_TYPE.ML_HONGZHONG_ZERO] = "红中麻将";
GameCnName[MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG] = "红中麻将";
GameCnName[MjClient.GAME_TYPE.CHEN_ZHOU] = "郴州麻将";
GameCnName[MjClient.GAME_TYPE.YUAN_JIANG_MJ] = "沅江麻将";
GameCnName[MjClient.GAME_TYPE.NAN_XIAN_MJ] = "南县麻将";
GameCnName[MjClient.GAME_TYPE.NING_XIANG_MJ] = "宁乡麻将";
GameCnName[MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI] = "捉虾子";
GameCnName[MjClient.GAME_TYPE.CHAO_GU_MJ] = "炒股麻将";
GameCnName[MjClient.GAME_TYPE.TY_ZHUANZHUAN] = "转转麻将";
GameCnName[MjClient.GAME_TYPE.SAN_DA_HA] = "三打哈";
GameCnName[MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO] = "崇阳画圈脚";
GameCnName[MjClient.GAME_TYPE.LV_LIANG_DA_QI] = "吕梁打七";
GameCnName[MjClient.GAME_TYPE.BAI_PU_LIN_ZI] = "白蒲林梓长牌";
GameCnName[MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG] = "双将长牌";
GameCnName[MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG] = "如东双将";
GameCnName[MjClient.GAME_TYPE.HAI_AN_MJ] = "海安麻将";
GameCnName[MjClient.GAME_TYPE.XUE_ZHAN] = "血战麻将";
GameCnName[MjClient.GAME_TYPE.XUE_LIU] = "血流麻将";
GameCnName[MjClient.GAME_TYPE.HAI_AN_BAI_DA] = "海安百搭麻将";
GameCnName[MjClient.GAME_TYPE.JIN_ZHONG_MJ] = "晋中麻将";
GameCnName[MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN] = "晋中财神麻将";
GameCnName[MjClient.GAME_TYPE.DOU_DI_ZHU_JZ] = "晋中斗地主";
GameCnName[MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO] = "晋中斗地主";
GameCnName[MjClient.GAME_TYPE.DOU_DI_ZHU_DA_TONG] = "大同斗地主";
GameCnName[MjClient.GAME_TYPE.DOU_DI_ZHU_HA] = "海安斗地主";
GameCnName[MjClient.GAME_TYPE.JIN_ZHONG_KD] = "扣点麻将";
GameCnName[MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN] = "运城贴金";
GameCnName[MjClient.GAME_TYPE.HE_JIN_KUN_JIN] = "河津捆金";
GameCnName[MjClient.GAME_TYPE.LV_LIANG_MA_JIANG] = "吕梁麻将";
GameCnName[MjClient.GAME_TYPE.ZHUO_HAO_ZI] = "捉耗子";
GameCnName[MjClient.GAME_TYPE.RU_GAO_ER] = "二人长牌";
GameCnName[MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU] = "推倒胡";
GameCnName[MjClient.GAME_TYPE.LING_SHI_BIAN_LONG] = "灵石编龙";
GameCnName[MjClient.GAME_TYPE.LING_SHI_BAN_MO] = "灵石半摸";
GameCnName[MjClient.GAME_TYPE.PING_YAO_KOU_DIAN] = "平遥扣点";
GameCnName[MjClient.GAME_TYPE.PING_YAO_MA_JIANG] = "平遥麻将";
GameCnName[MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3] = "介休一点三";
GameCnName[MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN] = "介休扣点";
GameCnName[MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO] = "晋中拐三角";
GameCnName[MjClient.GAME_TYPE.SHOU_YANG_QUE_KA] = "寿阳缺卡"; //SHOU_YANG_QUE_KA
GameCnName[MjClient.GAME_TYPE.JIN_ZHONG_LI_SI] = "晋中立四";
GameCnName[MjClient.GAME_TYPE.HONG_TONG_WANG_PAI] = "洪洞王牌";
GameCnName[MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN] = "吕梁麻将";
GameCnName[MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI] = "临汾硬三嘴";
GameCnName[MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN] = "临汾斗地主";
GameCnName[MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI] = "临汾一门牌";
GameCnName[MjClient.GAME_TYPE.FEN_XI_YING_KOU] = "汾西硬扣";
GameCnName[MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG] = "临汾吉县夹张";
GameCnName[MjClient.GAME_TYPE.ML_HONG_ZI] = "捉红字";
GameCnName[MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI] = "湘阴捉红字";
GameCnName[MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI] = "岳阳歪胡子";
GameCnName[MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI] = "益阳歪胡子";
GameCnName[MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI] = "南县鬼胡子";
GameCnName[MjClient.GAME_TYPE.FEN_YANG_QUE_MEN] = "汾阳缺门";
GameCnName[MjClient.GAME_TYPE.JING_LE_KOU_DIAN] = "静乐扣点";
GameCnName[MjClient.GAME_TYPE.DA_TONG_GUAI_SAN_JIAO] = "大同拐三角";
GameCnName[MjClient.GAME_TYPE.LUAN_GUA_FENG] = "乱刮风";
GameCnName[MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI] = "沅江鬼胡子";
GameCnName[MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI] = "石门跑胡子";
GameCnName[MjClient.GAME_TYPE.XIANG_SHUI_MJ] = "响水麻将";
GameCnName[MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN] = "乡宁摔金";
GameCnName[MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI] = "扣点风嘴子";
GameCnName[MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN] = "沛县麻将";
GameCnName[MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN] = "孝义扣点";
GameCnName[MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG] = "吕梁斗地主";
GameCnName[MjClient.GAME_TYPE.FAN_SHI_XIA_YU] = "繁峙下雨";
GameCnName[MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG] = "代县麻将";
GameCnName[MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG] = "岳阳红中";
GameCnName[MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA] = "岳阳三打哈";
GameCnName[MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU] = "忻州斗地主";
GameCnName[MjClient.GAME_TYPE.WU_TAI_KOU_DIAN] = "五台扣点";
GameCnName[MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER] = "忻州三打二";
GameCnName[MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU] = "福禄寿";
GameCnName[MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG] = "福禄寿20张";
GameCnName[MjClient.GAME_TYPE.DA_NING_SHUAI_JIN] = "大宁摔金";
GameCnName[MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI] = "安化跑胡子";
GameCnName[MjClient.GAME_TYPE.AN_HUA_MA_JIANG]    = "安化七王麻将";
GameCnName[MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW] = "安化四王麻将";
GameCnName[MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG] = "桃江麻将";
GameCnName[MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI] = "郴州字牌";
GameCnName[MjClient.GAME_TYPE.GUI_YANG_ZI_PAI] = "桂阳字牌";
GameCnName[MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI] = "大同扎股子";
GameCnName[MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE] = "株洲牛十别";
GameCnName[MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI] = "宁乡跑胡子";
GameCnName[MjClient.GAME_TYPE.NING_XIANG_KAI_WANG] = "宁乡开王麻将";
if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP){
    GameCnName[MjClient.GAME_TYPE.YUE_YANG_PENG_HU] = "株洲碰胡";
}else{
    GameCnName[MjClient.GAME_TYPE.YUE_YANG_PENG_HU] = "碰胡";
}
GameCnName[MjClient.GAME_TYPE.HY_LIU_HU_QIANG] = "六胡抢";
GameCnName[MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU] = "一脚赖油";
GameCnName[MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU] = "一脚癞油";
GameCnName[MjClient.GAME_TYPE.CHUO_XIA_ZI] = "戳虾子";
GameCnName[MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ] = "京山麻将";
GameCnName[MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING] = "孝感卡五星";
GameCnName[MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING] = "随州卡五星";
GameCnName[MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN] = "大冶开口番";
GameCnName[MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG] = "红中癞子杠";
GameCnName[MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN] = "打炸弹";
GameCnName[MjClient.GAME_TYPE.YI_YANG_MA_JIANG] = "益阳麻将";
GameCnName[MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN] = "沅江千分";
GameCnName[MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI] = "郴州毛胡子";
GameCnName[MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI] = "株洲打码子";
GameCnName[MjClient.GAME_TYPE.CHONG_YANG_DA_GUN] = "崇阳打滚";
GameCnName[MjClient.GAME_TYPE.TONG_SHAN_DA_GONG] = "通山打拱";
GameCnName[MjClient.GAME_TYPE.DA_YE_DA_GONG] = "大冶打拱";
GameCnName[MjClient.GAME_TYPE.DA_YE_510K] = "大冶510K";
GameCnName[MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN] = "潜江千分";
GameCnName[MjClient.GAME_TYPE.QI_CHUN_DA_GONG] = "蕲春打拱";
GameCnName[MjClient.GAME_TYPE.XIANG_XI_2710] = "湘西2710";
GameCnName[MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI] = "常德跑胡子";
GameCnName[MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI] = "沅陵跑胡子";
GameCnName[MjClient.GAME_TYPE.ZP_LY_CHZ] = "耒阳字牌";
GameCnName[MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI] = "汉寿跑胡子";
GameCnName[MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI] = "运城风耗子";
GameCnName[MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI] = "稷山扭叶子";
GameCnName[MjClient.GAME_TYPE.PAO_HU_ZI_SR_King] = "四王坐醒";
GameCnName[MjClient.GAME_TYPE.PAO_HU_ZI_King] = "四王扯胡子";
GameCnName[MjClient.GAME_TYPE.PAO_HU_ZI_ER] = "扯胡子单挑场";
GameCnName[MjClient.GAME_TYPE.PAO_HU_ZI_LR_King] = "四王单挑场";
GameCnName[MjClient.GAME_TYPE.HY_SHI_HU_KA] = "十胡卡";
GameCnName[MjClient.GAME_TYPE.JIANG_YONG_15Z] = "江永十五张";
GameCnName[MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY] = "跑得快";
GameCnName[MjClient.GAME_TYPE.HZMJ] = "红中麻将";
GameCnName[MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG] = "王钓麻将";
GameCnName[MjClient.GAME_TYPE.YONG_ZHOU_MJ] = "永州麻将";
GameCnName[MjClient.GAME_TYPE.JIANG_HUA_MJ] = "江华麻将";
GameCnName[MjClient.GAME_TYPE.DAO_ZHOU_MJ] = "道州麻将";
GameCnName[MjClient.GAME_TYPE.HUAI_AN_DOU_DI_ZHU] = "淮安斗地主";

GameCnName[MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI] = "湘乡跑胡子";
GameCnName[MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA] = "湘乡三打哈";
GameCnName[MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA] = "三打哈";
GameCnName[MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA] = "衡阳三打哈";
GameCnName[MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA] = "衡阳三打哈";
GameCnName[MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA] = "湘潭三打哈";
if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP){
    GameCnName[MjClient.GAME_TYPE.LEI_YANG_GMJ] = "耒阳鬼麻将";
}else{
    GameCnName[MjClient.GAME_TYPE.LEI_YANG_GMJ] = "鬼麻将";
}
GameCnName[MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG] = "红中麻将";
GameCnName[MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG] = "怀化麻将";
GameCnName[MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG] = "打筒子";
GameCnName[MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG] = "邵阳麻将";
GameCnName[MjClient.GAME_TYPE.SHAO_YANG_BO_PI] = "邵阳剥皮";
GameCnName[MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI] = "邵阳字牌";
GameCnName[MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI] = "湘乡告胡子";
GameCnName[MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA] = "娄底放炮罚";
GameCnName[MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI] = "十五胡";
GameCnName[MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN] = "怀化红拐弯";
GameCnName[MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA] = "258麻将";
GameCnName[MjClient.GAME_TYPE.XIN_NING_MA_JIANG] = "新宁麻将";
GameCnName[MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN] = "霸炸弹";
GameCnName[MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO] = "永州老戳";
GameCnName[MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI] = "二人跑胡子";
GameCnName[MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA] = "娄底放炮罚";
GameCnName[MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI] = "湘潭跑胡子";
GameCnName[MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI] = "安化跑胡子";
GameCnName[MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA] = "半边天炸";
GameCnName[MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO] = "冷水江十胡倒";
GameCnName[MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA] = "衡阳放炮罚";
GameCnName[MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE] = "安乡偎麻雀";
GameCnName[MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ] = "普定麻将";
GameCnName[MjClient.GAME_TYPE.GUI_ZHOU_AN_SHUN_MJ] = "安顺麻将";
GameCnName[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_LIANG_FANG] = "三丁两房麻将";
GameCnName[MjClient.GAME_TYPE.GUI_ZHOU_LIANG_DING_LIANG_FANG] = "两丁两房麻将";
GameCnName[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_GUAI] = "三丁拐麻将";
GameCnName[MjClient.GAME_TYPE.GUI_ZHOU_ER_DING_GUAI] = "二丁拐麻将";
GameCnName[MjClient.GAME_TYPE.SAN_DA_HA_NEW] = "新三打哈";
GameCnName[MjClient.GAME_TYPE.DOU_DI_ZHU_GZ] = "斗地主";
GameCnName[MjClient.GAME_TYPE.GUI_ZHOU_XMY_GUI_YANG_ZHUO_JI] = "新麻友贵阳捉鸡";
GameCnName[MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI] = "贵阳捉鸡";
GameCnName[MjClient.GAME_TYPE.GUI_ZHOU_MEN_HU_XUE_LIU] = "闷胡血流";
GameCnName[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ] = "急速8张麻将";//（二人一房）
GameCnName[MjClient.GAME_TYPE.CHONG_YANG_MJ] = "崇阳麻将";
GameCnName[MjClient.GAME_TYPE.HUANG_SHI_HH_MJ] = "黄石晃晃";
GameCnName[MjClient.GAME_TYPE.QI_CHUN_HH_MJ] = "蕲春晃晃";
GameCnName[MjClient.GAME_TYPE.TONG_CHENG_MJ] = "通城麻将";
GameCnName[MjClient.GAME_TYPE.QIAN_JIANG_HH_MJ] = "潜江晃晃";
GameCnName[MjClient.GAME_TYPE.WU_XUE_MJ] = "武穴麻将";

if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
    GameCnName[MjClient.GAME_TYPE.SAN_DA_HA] = "经典三打哈";
    GameCnName[MjClient.GAME_TYPE.SAN_DA_HA_NEW] = "湘潭三打哈";
}

GameCnName[MjClient.GAME_TYPE.XIANG_XI_96POKER] = "96扑克";
GameCnName[MjClient.GAME_TYPE.XU_PU_LAO_PAI] = "溆浦老牌";
GameCnName[MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI] = "溆浦跑胡子";
GameCnName[MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI] = "永州包牌";
GameCnName[MjClient.GAME_TYPE.DA_ZI_BO_PI] = "大字剥皮";
GameCnName[MjClient.GAME_TYPE.HONG_ZE_MA_JIANG] = "洪泽麻将";
GameCnName[MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN] = "山西干瞪眼";
GameCnName[MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ] = "血流成河";
GameCnName[MjClient.GAME_TYPE.EN_SHI_MA_JIANG] = "一痞二癞";
GameCnName[MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY] = "湖北跑得快";
GameCnName[MjClient.GAME_TYPE.DANG_YANG_FAN_JING] = "当阳翻精";
GameCnName[MjClient.GAME_TYPE.DA_YE_ZI_PAI] = "大冶字牌";
GameCnName[MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG] = "靖州麻将";
GameCnName[MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN] = "宜昌上大人";
GameCnName[MjClient.GAME_TYPE.HU_BEI_HUA_PAI] = "湖北花牌";
GameCnName[MjClient.GAME_TYPE.YANG_XIN_MA_JIANG] = "阳新麻将";
GameCnName[MjClient.GAME_TYPE.TONG_SHAN_HH_MJ] = "通山晃晃";
GameCnName[MjClient.GAME_TYPE.JIANG_LING_HONGZHONG] = "江陵红中";
GameCnName[MjClient.GAME_TYPE.QI_CHUN_GD_MJ] = "蕲春广东麻将";
GameCnName[MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY] = "欢乐斗地主";
GameCnName[MjClient.GAME_TYPE.DOU_DI_ZHU_QC] = "蕲春地主";
GameCnName[MjClient.GAME_TYPE.SHI_SHOU_AI_HUANG] = "石首捱晃";
GameCnName[MjClient.GAME_TYPE.GONG_AN_HUA_PAI] = "公安花牌";
GameCnName[MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI] = "通城个子牌";
GameCnName[MjClient.GAME_TYPE.QI_CHUN_HONG_ZHONG_GANG] = "蕲春红中杠";
GameCnName[MjClient.GAME_TYPE.EN_SHI_SHAO_HU] = "恩施绍胡";
GameCnName[MjClient.GAME_TYPE.WU_XUE_510K] = "武穴510K";

var GameClass = {};
GameClass[MjClient.GAME_TYPE.LIAN_YUN_GANG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.SHU_YANG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.GUAN_YUN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.DONG_HAI] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.NAN_JING] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.SU_QIAN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.HUAI_AN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.HA_HONGZHONG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.HA_14DUN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.XU_ZHOU] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN] = MjClient.GAME_CLASS.GUAN_DAN;
GameClass[MjClient.GAME_TYPE.NIU_NIU] = MjClient.GAME_CLASS.NIU_NIU;
GameClass[MjClient.GAME_TYPE.PAO_HU_ZI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.SI_YANG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.XIN_SI_YANG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.SI_YANG_HH] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.YAN_CHENG_HH] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.RU_GAO] = MjClient.GAME_CLASS.CHANG_PAI;
GameClass[MjClient.GAME_TYPE.GAN_YU] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.HUAI_AN_TTZ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.RU_GAO_MJH] = MjClient.GAME_CLASS.CHANG_PAI;
GameClass[MjClient.GAME_TYPE.QU_TANG_23_ZHANG] = MjClient.GAME_CLASS.CHANG_PAI;
GameClass[MjClient.GAME_TYPE.HUAI_AN_CC] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.HZ_TUI_DAO_HU] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.HUAI_AN_ERZ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.GUAN_NAN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.PAO_DE_KUAI] = MjClient.GAME_CLASS.PAO_DE_KUAI;
GameClass[MjClient.GAME_TYPE.PAO_DE_KUAI_TY] = MjClient.GAME_CLASS.PAO_DE_KUAI;
GameClass[MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN] = MjClient.GAME_CLASS.PAO_DE_KUAI;  
GameClass[MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO] = MjClient.GAME_CLASS.PAO_DE_KUAI;
GameClass[MjClient.GAME_TYPE.PAO_DE_KUAI_JZ] = MjClient.GAME_CLASS.PAO_DE_KUAI;
GameClass[MjClient.GAME_TYPE.PAO_DE_KUAI_HA] = MjClient.GAME_CLASS.PAO_DE_KUAI;
GameClass[MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW] = MjClient.GAME_CLASS.PAO_DE_KUAI;
GameClass[MjClient.GAME_TYPE.PAO_DE_KUAI_LYG] = MjClient.GAME_CLASS.PAO_DE_KUAI;
GameClass[MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI] = MjClient.GAME_CLASS.PAO_DE_KUAI;
GameClass[MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN] = MjClient.GAME_CLASS.PAO_DE_KUAI;
GameClass[MjClient.GAME_TYPE.PAO_DE_KUAI_NT] = MjClient.GAME_CLASS.PAO_DE_KUAI;
GameClass[MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU] = MjClient.GAME_CLASS.PAO_DE_KUAI;
GameClass[MjClient.GAME_TYPE.XIN_PU_HZ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.YZ_CHZTEST] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.LUO_DI_SAO] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.PAO_HU_ZI_SR] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.DOU_DI_ZHU_NT] = MjClient.GAME_CLASS.DOU_DI_ZHU;
GameClass[MjClient.GAME_TYPE.DOU_DI_ZHU_TY] = MjClient.GAME_CLASS.DOU_DI_ZHU;
GameClass[MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY] = MjClient.GAME_CLASS.DOU_DI_ZHU;
GameClass[MjClient.GAME_TYPE.DOU_DI_ZHU_QC] = MjClient.GAME_CLASS.DOU_DI_ZHU;
GameClass[MjClient.GAME_TYPE.WU_XUE_GE_BAN] = MjClient.GAME_CLASS.DOU_DI_ZHU;
GameClass[MjClient.GAME_TYPE.DIAN_TUO] = MjClient.GAME_CLASS.DA_ZHA_DAN;
GameClass[MjClient.GAME_TYPE.NTHZ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.TONG_HUA] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.CHANG_SHA] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.CHANG_SHA_ER_REN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.LIAN_SHUI] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.TY_HONGZHONG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.ML_HONGZHONG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.ML_HONGZHONG_ZERO] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.CHEN_ZHOU] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.YUAN_JIANG_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.NAN_XIAN_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.NING_XIANG_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.CHAO_GU_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.TY_ZHUANZHUAN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI] = MjClient.GAME_CLASS.SAN_DA_HA;
GameClass[MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO] = MjClient.GAME_CLASS.SAN_DA_HA;  
GameClass[MjClient.GAME_TYPE.SAN_DA_HA] = MjClient.GAME_CLASS.SAN_DA_HA;
GameClass[MjClient.GAME_TYPE.LV_LIANG_DA_QI] = MjClient.GAME_CLASS.DA_QI;
GameClass[MjClient.GAME_TYPE.BAI_PU_LIN_ZI] = MjClient.GAME_CLASS.CHANG_PAI;
GameClass[MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG] = MjClient.GAME_CLASS.CHANG_PAI;
GameClass[MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG] = MjClient.GAME_CLASS.CHANG_PAI;
GameClass[MjClient.GAME_TYPE.HAI_AN_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.XUE_ZHAN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.XUE_LIU] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.HAI_AN_BAI_DA] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.JIN_ZHONG_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.DOU_DI_ZHU_JZ] = MjClient.GAME_CLASS.DOU_DI_ZHU;
GameClass[MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO] = MjClient.GAME_CLASS.DOU_DI_ZHU;
GameClass[MjClient.GAME_TYPE.DOU_DI_ZHU_DA_TONG] = MjClient.GAME_CLASS.DOU_DI_ZHU;
GameClass[MjClient.GAME_TYPE.DOU_DI_ZHU_HA] = MjClient.GAME_CLASS.DOU_DI_ZHU;
GameClass[MjClient.GAME_TYPE.JIN_ZHONG_KD] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.HE_JIN_KUN_JIN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.LV_LIANG_MA_JIANG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.ZHUO_HAO_ZI] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.RU_GAO_ER] = MjClient.GAME_CLASS.CHANG_PAI;
GameClass[MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.LING_SHI_BIAN_LONG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.LING_SHI_BAN_MO] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.PING_YAO_KOU_DIAN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.PING_YAO_MA_JIANG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.SHOU_YANG_QUE_KA] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.JIN_ZHONG_LI_SI] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.HONG_TONG_WANG_PAI] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN] = MjClient.GAME_CLASS.DOU_DI_ZHU;
GameClass[MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.FEN_XI_YING_KOU] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.ML_HONG_ZI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG] = MjClient.GAME_CLASS.DOU_DI_ZHU;
GameClass[MjClient.GAME_TYPE.FAN_SHI_XIA_YU] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA] = MjClient.GAME_CLASS.SAN_DA_HA;
GameClass[MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU] = MjClient.GAME_CLASS.DOU_DI_ZHU;
GameClass[MjClient.GAME_TYPE.WU_TAI_KOU_DIAN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER] = MjClient.GAME_CLASS.SAN_DA_HA;
GameClass[MjClient.GAME_TYPE.DA_NING_SHUAI_JIN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.FEN_YANG_QUE_MEN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.JING_LE_KOU_DIAN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.DA_TONG_GUAI_SAN_JIAO] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI]      = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.LUAN_GUA_FENG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.AN_HUA_MA_JIANG]    = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI]      = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.GUI_YANG_ZI_PAI]      = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI] = MjClient.GAME_CLASS.DOU_DI_ZHU;
GameClass[MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE] = MjClient.GAME_CLASS.NIU_SHI_BIE;
GameClass[MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI]      = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.NING_XIANG_KAI_WANG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.YUE_YANG_PENG_HU]      = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.HY_LIU_HU_QIANG]      = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.CHUO_XIA_ZI] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN] = MjClient.GAME_CLASS.DA_ZHA_DAN;
GameClass[MjClient.GAME_TYPE.YI_YANG_MA_JIANG]    = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN]    = MjClient.GAME_CLASS.QIAN_FEN;
GameClass[MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI]    = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI] = MjClient.GAME_CLASS.DA_MA_ZI;
GameClass[MjClient.GAME_TYPE.CHONG_YANG_DA_GUN] = MjClient.GAME_CLASS.DA_MA_ZI;
GameClass[MjClient.GAME_TYPE.DA_YE_DA_GONG] = MjClient.GAME_CLASS.DA_MA_ZI;
GameClass[MjClient.GAME_TYPE.TONG_SHAN_DA_GONG] = MjClient.GAME_CLASS.DA_MA_ZI;
GameClass[MjClient.GAME_TYPE.DA_YE_510K] = MjClient.GAME_CLASS.DA_MA_ZI;
GameClass[MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN] = MjClient.GAME_CLASS.DA_MA_ZI;
GameClass[MjClient.GAME_TYPE.QI_CHUN_DA_GONG] = MjClient.GAME_CLASS.DA_MA_ZI;
GameClass[MjClient.GAME_TYPE.XIANG_XI_2710] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI]    = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI]    = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.ZP_LY_CHZ]             = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI]      = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.PAO_HU_ZI_SR_King]     = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.PAO_HU_ZI_King]        = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.PAO_HU_ZI_ER]          = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.PAO_HU_ZI_LR_King]     = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.HY_SHI_HU_KA]          = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.JIANG_YONG_15Z]        = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY]     = MjClient.GAME_CLASS.PAO_DE_KUAI;
GameClass[MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG]    = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.YONG_ZHOU_MJ]          = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.JIANG_HUA_MJ]          = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.DAO_ZHOU_MJ]           = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA]         = MjClient.GAME_CLASS.SAN_DA_HA;
GameClass[MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA]         = MjClient.GAME_CLASS.SAN_DA_HA;
GameClass[MjClient.GAME_TYPE.HZMJ]                  = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.LEI_YANG_GMJ]          = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG]= MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG]  = MjClient.GAME_CLASS.DA_TONG_ZI;
GameClass[MjClient.GAME_TYPE.SHAO_YANG_BO_PI]       = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI]      = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG]    = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA]    = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI]    = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA]    = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.XIN_NING_MA_JIANG]      = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN]      = MjClient.GAME_CLASS.BA_ZHA_DAN;
GameClass[MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO]      = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI]        = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA]    = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI]      = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA]      = MjClient.GAME_CLASS.BAN_BIAN_TIAN_ZHA;
GameClass[MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA]         = MjClient.GAME_CLASS.SAN_DA_HA;
GameClass[MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA]         = MjClient.GAME_CLASS.SAN_DA_HA;
GameClass[MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA]         = MjClient.GAME_CLASS.SAN_DA_HA;
GameClass[MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA]    = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG]      = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.XIANG_SHUI_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ]  = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.GUI_ZHOU_AN_SHUN_MJ]  = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_LIANG_FANG]  = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.GUI_ZHOU_LIANG_DING_LIANG_FANG]  = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_GUAI]  = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.GUI_ZHOU_ER_DING_GUAI]  = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.HUAI_AN_DOU_DI_ZHU] = MjClient.GAME_CLASS.DOU_DI_ZHU;
GameClass[MjClient.GAME_TYPE.SAN_DA_HA_NEW] = MjClient.GAME_CLASS.SAN_DA_HA;
GameClass[MjClient.GAME_TYPE.DOU_DI_ZHU_GZ] = MjClient.GAME_CLASS.DOU_DI_ZHU;
GameClass[MjClient.GAME_TYPE.GUI_ZHOU_XMY_GUI_YANG_ZHUO_JI] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.GUI_ZHOU_MEN_HU_XUE_LIU] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.XIANG_XI_96POKER] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.XU_PU_LAO_PAI] = MjClient.GAME_CLASS.CHANG_PAI;
GameClass[MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.DA_ZI_BO_PI]       = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.HONG_ZE_MA_JIANG]       = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN]       = MjClient.GAME_CLASS.GAN_DENG_YAN;
GameClass[MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ]       = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY]       = MjClient.GAME_CLASS.PAO_DE_KUAI;
GameClass[MjClient.GAME_TYPE.EN_SHI_MA_JIANG]       = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.DANG_YANG_FAN_JING] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.DA_YE_ZI_PAI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.CHONG_YANG_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.QIAN_JIANG_HH_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.WU_XUE_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.HUANG_SHI_HH_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.QI_CHUN_HH_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.TONG_CHENG_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.HU_BEI_HUA_PAI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.YANG_XIN_MA_JIANG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.TONG_SHAN_HH_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.JIANG_LING_HONGZHONG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.QI_CHUN_GD_MJ] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.SHI_SHOU_AI_HUANG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.GONG_AN_HUA_PAI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.QI_CHUN_HONG_ZHONG_GANG] = MjClient.GAME_CLASS.MA_JIANG;
GameClass[MjClient.GAME_TYPE.EN_SHI_SHAO_HU] = MjClient.GAME_CLASS.PAO_HU_ZI;
GameClass[MjClient.GAME_TYPE.WU_XUE_510K] = MjClient.GAME_CLASS.DA_MA_ZI;

//游戏大类型到资源分类的映射
var ResourceClass = {};
ResourceClass[MjClient.GAME_CLASS.MA_JIANG] = MjClient.RESOURCE_CLASS.MA_JIANG;
ResourceClass[MjClient.GAME_CLASS.NIU_NIU] = MjClient.RESOURCE_CLASS.MA_JIANG;
ResourceClass[MjClient.GAME_CLASS.GUAN_DAN] = MjClient.RESOURCE_CLASS.POKER;
ResourceClass[MjClient.GAME_CLASS.PAO_HU_ZI] = MjClient.RESOURCE_CLASS.ZI_PAI;
ResourceClass[MjClient.GAME_CLASS.CHANG_PAI] = MjClient.RESOURCE_CLASS.CHANG_PAI;
ResourceClass[MjClient.GAME_CLASS.PAO_DE_KUAI] = MjClient.RESOURCE_CLASS.PAO_DE_KUAI;
ResourceClass[MjClient.GAME_CLASS.DOU_DI_ZHU] = MjClient.RESOURCE_CLASS.PAO_DE_KUAI;
ResourceClass[MjClient.GAME_CLASS.SAN_DA_HA] = MjClient.RESOURCE_CLASS.POKER;
ResourceClass[MjClient.GAME_CLASS.DA_QI] = MjClient.RESOURCE_CLASS.POKER;
ResourceClass[MjClient.GAME_CLASS.NIU_SHI_BIE] = MjClient.RESOURCE_CLASS.POKER;
ResourceClass[MjClient.GAME_CLASS.DA_ZHA_DAN] = MjClient.RESOURCE_CLASS.POKER;
ResourceClass[MjClient.GAME_CLASS.DA_MA_ZI] = MjClient.RESOURCE_CLASS.POKER;
ResourceClass[MjClient.GAME_CLASS.QIAN_FEN] = MjClient.RESOURCE_CLASS.POKER;
ResourceClass[MjClient.RESOURCE_CLASS.GOLD_FIELD] = MjClient.RESOURCE_CLASS.GOLD_FIELD;


var GameBg = {};
GameBg[MjClient.GAME_TYPE.LIAN_YUN_GANG] = "playing/gameTable/game_lyg.png";
GameBg[MjClient.GAME_TYPE.SHU_YANG] = "playing/gameTable/game_shuyang.png";
GameBg[MjClient.GAME_TYPE.GUAN_YUN] = "playing/gameTable/game_guanyun.png";
GameBg[MjClient.GAME_TYPE.DONG_HAI] = "playing/gameTable/game_donghai.png";
GameBg[MjClient.GAME_TYPE.NAN_JING] = "playing/gameTable/game_nanjing.png";
GameBg[MjClient.GAME_TYPE.SU_QIAN] = "playing/gameTable/game_suqian.png";
GameBg[MjClient.GAME_TYPE.NIU_NIU] = "playing/gameTable/game_niuniu.png";
GameBg[MjClient.GAME_TYPE.HUAI_AN] = "playing/gameTable/game_huaian.png";
GameBg[MjClient.GAME_TYPE.HA_HONGZHONG] = "playing/gameTable/game_HAHZ.png";
GameBg[MjClient.GAME_TYPE.HA_14DUN] = "playing/gameTable/game_huaian14dun.png";
GameBg[MjClient.GAME_TYPE.XU_ZHOU] = "playing/gameTable/game_xuzhou.png";
GameBg[MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN] = "playing/gameTable/game_tuantuanzhuan.png";
GameBg[MjClient.GAME_TYPE.PAO_HU_ZI] = "playing/gameTable/game_chehuzi.png";
GameBg[MjClient.GAME_TYPE.SI_YANG] = "playing/gameTable/game_siyang.png";
GameBg[MjClient.GAME_TYPE.XIN_SI_YANG] = "playing/gameTable/game_siyang_new.png";
GameBg[MjClient.GAME_TYPE.SI_YANG_HH] = "playing/gameTable/game_siyanghh.png";
GameBg[MjClient.GAME_TYPE.YAN_CHENG_HH] = "playing/gameTable/game_yanchenghh.png";
GameBg[MjClient.GAME_TYPE.RU_GAO] = "playing/gameTable/game_rugao.png";
GameBg[MjClient.GAME_TYPE.GAN_YU] = "playing/gameTable/game_ganyu.png";
GameBg[MjClient.GAME_TYPE.HUAI_AN_TTZ] = "playing/gameTable/game_ttz_m.png";
GameBg[MjClient.GAME_TYPE.RU_GAO_MJH] = "playing/gameTable/game_rugaohu.png";
GameBg[MjClient.GAME_TYPE.QU_TANG_23_ZHANG] = "playing/gameTable/game_qutang23zhang.png";
GameBg[MjClient.GAME_TYPE.HUAI_AN_CC] = "playing/gameTable/game_huaianchuchong.png";
GameBg[MjClient.GAME_TYPE.HZ_TUI_DAO_HU] = "playing/gameTable/game_hongzetuidaohu.png";
GameBg[MjClient.GAME_TYPE.HUAI_AN_ERZ] = "playing/gameTable/game_huaianERZ.png";
GameBg[MjClient.GAME_TYPE.GUAN_NAN] = "playing/gameTable/game_guannan.png";
GameBg[MjClient.GAME_TYPE.PAO_DE_KUAI] = "playing/gameTable/game_paodekuai.png";
GameBg[MjClient.GAME_TYPE.PAO_DE_KUAI_TY] = "playing/gameTable/game_paodekuai_ty.png";
GameBg[MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN] = "playing/gameTable/game_paodekuai_11.png";
GameBg[MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO] = "playing/gameTable/game_paodekuai_ty.png";
GameBg[MjClient.GAME_TYPE.PAO_DE_KUAI_JZ] = "playing/gameTable/game_paodekuai_JZ.png";
GameBg[MjClient.GAME_TYPE.PAO_DE_KUAI_HA] = "playing/gameTable/game_paodekuai_huaian.png";
GameBg[MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW] = "playing/gameTable/game_paodekuai_huaianNew.png";
GameBg[MjClient.GAME_TYPE.PAO_DE_KUAI_LYG] = "playing/gameTable/game_paodekuai_lyg.png";
GameBg[MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI] = "playing/gameTable/game_paodekuai_xs.png";
GameBg[MjClient.GAME_TYPE.PAO_DE_KUAI_NT] = "playing/gameTable/game_paodekuai_nt.png";
GameBg[MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN] = "playing/gameTable/game_paodekuai_haian.png";
GameBg[MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU] = "playing/gameTable/game_paodekuai_xuzhou.png";
GameBg[MjClient.GAME_TYPE.XIN_PU_HZ] = "playing/gameTable/game_HZMJ.png";
GameBg[MjClient.GAME_TYPE.YZ_CHZTEST] = "playing/gameTable/game_chz_test.png";
GameBg[MjClient.GAME_TYPE.LUO_DI_SAO] = "playing/gameTable/game_luodisao.png";
GameBg[MjClient.GAME_TYPE.PAO_HU_ZI_SR] = "playing/gameTable/game_zuoxing.png";
GameBg[MjClient.GAME_TYPE.DOU_DI_ZHU_NT] = "playing/gameTable/game_doudizhu.png";
GameBg[MjClient.GAME_TYPE.NTHZ] = "playing/gameTable/game_shisanzhang.png";
GameBg[MjClient.GAME_TYPE.TONG_HUA] = "playing/gameTable/game_tonghua.png";
GameBg[MjClient.GAME_TYPE.CHANG_SHA] = "playing/gameTable/game_changsha.png";
GameBg[MjClient.GAME_TYPE.CHANG_SHA_ER_REN] = "playing/gameTable/game_changsha_er.png";
GameBg[MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU] = "playing/gameTable/game_xiangyintuidaohu.png";
GameBg[MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO] = "playing/gameTable/game_pingjiangzhaniao.png";
GameBg[MjClient.GAME_TYPE.LIAN_SHUI] = "playing/gameTable/game_lianshui.png";
GameBg[MjClient.GAME_TYPE.TY_HONGZHONG] = "playing/gameTable/game_tongyonghongzhong.png";
GameBg[MjClient.GAME_TYPE.ML_HONGZHONG] = "playing/gameTable/game_miluohongzhong.png";
GameBg[MjClient.GAME_TYPE.ML_HONGZHONG_ZERO] = "playing/gameTable/game_miluohongzhong.png";
GameBg[MjClient.GAME_TYPE.CHEN_ZHOU] = "playing/gameTable/game_chenzhou.png";
GameBg[MjClient.GAME_TYPE.NING_XIANG_MJ] = "playing/gameTable/game_ningxiang.png";
GameBg[MjClient.GAME_TYPE.YUAN_JIANG_MJ] = "playing/gameTable/game_yuanjiang.png";
GameBg[MjClient.GAME_TYPE.NAN_XIAN_MJ] = "playing/gameTable/game_nanxian.png";
GameBg[MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI] = "playing/gameTable/game_zhuoxiazi.png";
GameBg[MjClient.GAME_TYPE.CHAO_GU_MJ] = "playing/gameTable/game_chaogu.png";
GameBg[MjClient.GAME_TYPE.DOU_DI_ZHU_TY] = "playing/gameTable/game_doudizhuTY.png";
GameBg[MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY] = "playing/gameTable/game_doudizhuTY.png";
GameBg[MjClient.GAME_TYPE.DOU_DI_ZHU_QC] = "playing/gameTable/game_doudizhuQC.png";
GameBg[MjClient.GAME_TYPE.WU_XUE_GE_BAN] = "playing/gameTable/game_wuxuegeban.png";
GameBg[MjClient.GAME_TYPE.DIAN_TUO] = "playing/gameTable/game_diantuo.png";
GameBg[MjClient.GAME_TYPE.DOU_DI_ZHU_JZ] = "playing/gameTable/game_doudizhuJZ.png";
GameBg[MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO] = "playing/gameTable/game_doudizhuJZ.png";
GameBg[MjClient.GAME_TYPE.DOU_DI_ZHU_DA_TONG] = "playing/gameTable/game_doudizhuDaTong.png";
GameBg[MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG] = "playing/gameTable/game_doudizhuLvLiang.png";
GameBg[MjClient.GAME_TYPE.TY_ZHUANZHUAN] = "playing/gameTable/game_zhuanzhuan.png";
GameBg[MjClient.GAME_TYPE.SAN_DA_HA] = "playing/gameTable/game_sanDaHa.png";
GameBg[MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO] = "playing/gameTable/game_chongYangHuaQuanJiao.png";
GameBg[MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI] = "playing/gameTable/game_baoPaiYZ.png";
GameBg[MjClient.GAME_TYPE.LV_LIANG_DA_QI] = "playing/gameTable/game_lvliangdaqi.png";
GameBg[MjClient.GAME_TYPE.BAI_PU_LIN_ZI] = "playing/gameTable/game_baiPuLinZi.png"
GameBg[MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG] = "playing/gameTable/game_shuangjiang.png";
GameBg[MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG] = "playing/gameTable/game_rudongshuangjiang.png";
GameBg[MjClient.GAME_TYPE.HAI_AN_MJ] = "playing/gameTable/game_haian.png";
GameBg[MjClient.GAME_TYPE.XUE_ZHAN] = "playing/gameTable/game_xuezhan.png";
GameBg[MjClient.GAME_TYPE.XUE_LIU] = "playing/gameTable/game_xueliu.png";
GameBg[MjClient.GAME_TYPE.HAI_AN_BAI_DA] = "playing/gameTable/game_haianbaida.png";
GameBg[MjClient.GAME_TYPE.JIN_ZHONG_MJ] = "playing/gameTable/game_jinzhongmj.png";
GameBg[MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN] = "playing/gameTable/game_jinzhongmj.png";
GameBg[MjClient.GAME_TYPE.DOU_DI_ZHU_HA] = "playing/gameTable/game_doudizhuHA.png";
GameBg[MjClient.GAME_TYPE.JIN_ZHONG_KD] = "playing/gameTable/game_koudian.png";
GameBg[MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN] = "playing/gameTable/game_yunchengtiejin.png";
GameBg[MjClient.GAME_TYPE.HE_JIN_KUN_JIN] = "playing/gameTable/game_hejinkunjin.png";
GameBg[MjClient.GAME_TYPE.LV_LIANG_MA_JIANG] = "playing/gameTable/game_lvliangmajiang.png";
GameBg[MjClient.GAME_TYPE.ZHUO_HAO_ZI] = "playing/gameTable/game_zhuohaozi.png";
GameBg[MjClient.GAME_TYPE.RU_GAO_ER] = "playing/gameTable/game_errenchangpai.png";
GameBg[MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU] = "playing/gameTable/game_tuidaohu.png";
GameBg[MjClient.GAME_TYPE.LING_SHI_BIAN_LONG] = "playing/gameTable/game_lingshibianlong.png";
GameBg[MjClient.GAME_TYPE.LING_SHI_BAN_MO] = "playing/gameTable/game_lingshibanmo.png";
GameBg[MjClient.GAME_TYPE.PING_YAO_KOU_DIAN] = "playing/gameTable/game_pingyaokoudian.png";
GameBg[MjClient.GAME_TYPE.PING_YAO_MA_JIANG] = "playing/gameTable/game_pingyaomajiang.png";
GameBg[MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3] = "playing/gameTable/game_jiexiuyidiansan.png";
GameBg[MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN] = "playing/gameTable/game_jiexiukoudian.png";
GameBg[MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO] = "playing/gameTable/game_guaisanjiao.png";
GameBg[MjClient.GAME_TYPE.SHOU_YANG_QUE_KA] = "playing/gameTable/game_shouyangqueka.png";
GameBg[MjClient.GAME_TYPE.JIN_ZHONG_LI_SI] = "playing/gameTable/game_lisi.png";
GameBg[MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN] = "playing/gameTable/game_lvliangkoudian.png";
GameBg[MjClient.GAME_TYPE.HONG_TONG_WANG_PAI] = "playing/gameTable/game_hongtongwangpai.png";
GameBg[MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI] = "playing/gameTable/game_linfenyingsanzui.png";
GameBg[MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN] = "playing/gameTable/game_doudizhuLF.png";
GameBg[MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI] = "playing/gameTable/game_linfenyimenzi.png";
GameBg[MjClient.GAME_TYPE.FEN_XI_YING_KOU] = "playing/gameTable/game_fenxiyingkou.png";
GameBg[MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG] = "playing/gameTable/game_linfenjixian.png";
GameBg[MjClient.GAME_TYPE.ML_HONG_ZI] = "playing/gameTable/game_zhuohongzi.png";
GameBg[MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI] = "playing/gameTable/game_xyzhuohongzi.png";
GameBg[MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI] = "playing/gameTable/game_yueyangwaihuzi.png";
GameBg[MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI] = "playing/gameTable/game_yiyangwaihuzi.png";
GameBg[MjClient.GAME_TYPE.FEN_YANG_QUE_MEN] = "playing/gameTable/game_fenyangquemen.png";
GameBg[MjClient.GAME_TYPE.JING_LE_KOU_DIAN] = "playing/gameTable/game_jingle.png";
GameBg[MjClient.GAME_TYPE.DA_TONG_GUAI_SAN_JIAO] = "playing/gameTable/game_datongguaisanjiao.png";
GameBg[MjClient.GAME_TYPE.LUAN_GUA_FENG] = "playing/gameTable/game_luanguafeng.png";
GameBg[MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI] = "playing/gameTable/game_nanXianGuiHuZi.png";
GameBg[MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI] = "playing/gameTable/game_yuanJiangGuiHuZi.png";
GameBg[MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI] = "playing/gameTable/game_shiMenPaoHuZi.png";
GameBg[MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN] = "playing/gameTable/game_xiangningshuaijin.png";
GameBg[MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI] = "playing/gameTable/game_linfenkoudianfengzuizi.png";
GameBg[MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN] = "playing/gameTable/game_xuzhoupeixian.png";
GameBg[MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN] = "playing/gameTable/game_xiaoyikoudian.png";
GameBg[MjClient.GAME_TYPE.FAN_SHI_XIA_YU] = "playing/gameTable/game_fanshixiayu.png";
GameBg[MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG] = "playing/gameTable/game_daixianMJ.png";
GameBg[MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG] = "playing/gameTable/game_yueyanghz.png";
GameBg[MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA] = "playing/gameTable/game_sanDaHaYueYang.png";
GameBg[MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU] = "playing/gameTable/game_doudizhuXZ.png";
GameBg[MjClient.GAME_TYPE.WU_TAI_KOU_DIAN] = "playing/gameTable/game_wutaikoudian.png";
GameBg[MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER] = "playing/gameTable/game_xinzhousandaer.png";
GameBg[MjClient.GAME_TYPE.DA_NING_SHUAI_JIN] = "playing/gameTable/game_daningshuaijin.png";
GameBg[MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU] = "playing/fulushou/game_fulushou.png";
GameBg[MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG] = "playing/fulushou/game_fulushou20.png";
GameBg[MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI] = "playing/gameTable/game_ahPaoHuZi.png";
GameBg[MjClient.GAME_TYPE.AN_HUA_MA_JIANG]    = "playing/gameTable/game_anhuamajiang.png";
GameBg[MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW] = "playing/gameTable/game_anhuamajiangsw.png";
GameBg[MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG] = "playing/gameTable/game_taojiangmajang.png";
GameBg[MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI] = "playing/gameTable/game_chenZhouZiPai.png";
GameBg[MjClient.GAME_TYPE.GUI_YANG_ZI_PAI] = "playing/gameTable/game_guiYangZiPai.png";
GameBg[MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI] = "playing/gameTable/game_zhaguzi.png";
GameBg[MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE] = "playing/gameTable/game_niushibieYueYang.png";
GameBg[MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI] = "playing/gameTable/game_damaziZhuZhou.png";
GameBg[MjClient.GAME_TYPE.WU_XUE_510K] = "playing/gameTable/game_wuXue510K.png";
GameBg[MjClient.GAME_TYPE.CHONG_YANG_DA_GUN] = "playing/gameTable/game_chongYangDaGun.png";
GameBg[MjClient.GAME_TYPE.DA_YE_DA_GONG] = "playing/gameTable/game_daYeDaGong.png";
GameBg[MjClient.GAME_TYPE.TONG_SHAN_DA_GONG] = "playing/gameTable/game_tongShanDaGong.png";
GameBg[MjClient.GAME_TYPE.DA_YE_510K] =     "playing/gameTable/game_daYe510K.png";
GameBg[MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN] =     "playing/gameTable/game_qianJiangQianFen.png";
GameBg[MjClient.GAME_TYPE.QI_CHUN_DA_GONG] =     "playing/gameTable/game_qiChunDaGong.png";
GameBg[MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI] = "playing/gameTable/game_ningXiangPaoHuZi.png";
GameBg[MjClient.GAME_TYPE.NING_XIANG_KAI_WANG] = "playing/gameTable/game_ningxiangkaiwang.png";
GameBg[MjClient.GAME_TYPE.YUE_YANG_PENG_HU] = "playing/gameTable/game_pengHu.png";
GameBg[MjClient.GAME_TYPE.HUAI_AN_DOU_DI_ZHU] = "res/playing/gameTable/game_doudizhuHuaiAn.png";
if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||

    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
{
    GameBg[MjClient.GAME_TYPE.HY_LIU_HU_QIANG] = "playing/gameTable/game_hyliuhuqiang.png"; 
}else{

   GameBg[MjClient.GAME_TYPE.HY_LIU_HU_QIANG] = "playing/gameTable/game_liuhuqiang.png"; 
}
GameBg[MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU] = "playing/gameTable/game_yijiaolaiyou.png";
GameBg[MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU] = "playing/gameTable/game_yijiaolaiyou.png";
GameBg[MjClient.GAME_TYPE.CHUO_XIA_ZI] = "playing/gameTable/game_chuoxiazi.png";
GameBg[MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ] = "playing/gameTable/game_jingshan.png";
GameBg[MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING] = "playing/gameTable/game_xiaogankawuxing.png";
GameBg[MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING] = "playing/gameTable/game_suizhoukawuxing.png";
GameBg[MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN] = "playing/gameTable/game_daYeKaiKouFan.png";
GameBg[MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG] = "playing/gameTable/game_hongZhongLaiZiGang.png";
GameBg[MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN] = "playing/gameTable/game_daZhaDan.png";
GameBg[MjClient.GAME_TYPE.YI_YANG_MA_JIANG]    = "playing/gameTable/game_yiyangMJ.png";
GameBg[MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN]    = "playing/gameTable/game_rjqf.png";
GameBg[MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI] = "playing/gameTable/game_chenZhouMaoHuZi.png";
GameBg[MjClient.GAME_TYPE.XIANG_XI_2710] = "playing/gameTable/game_xaingXiEQS.png";
GameBg[MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI] = "playing/gameTable/game_changDePaoHuZi.png";
GameBg[MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI] = "playing/gameTable/game_yuanLingPHZ.png";
GameBg[MjClient.GAME_TYPE.ZP_LY_CHZ]  = "playing/gameTable/game_leiyang.png";
GameBg[MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI] = "playing/gameTable/game_hanShouPaoHuZi.png";
GameBg[MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI] = "playing/gameTable/game_yunchengfenghaozi.png";
GameBg[MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI] = "playing/gameTable/game_jishanniuyezi.png";
GameBg[MjClient.GAME_TYPE.PAO_HU_ZI_SR_King] = "playing/gameTable/game_siwzuoxing.png";
GameBg[MjClient.GAME_TYPE.PAO_HU_ZI_King] = "playing/gameTable/game_siwangchehz.png";
GameBg[MjClient.GAME_TYPE.PAO_HU_ZI_ER]  = "playing/gameTable/game_dantiap.png";
GameBg[MjClient.GAME_TYPE.PAO_HU_ZI_LR_King]  = "playing/gameTable/game_siwangdantiap.png";
GameBg[MjClient.GAME_TYPE.HY_SHI_HU_KA]  = "playing/gameTable/game_hyshihuka.png";
GameBg[MjClient.GAME_TYPE.JIANG_YONG_15Z] = "playing/gameTable/game_jyshiwu.png";
GameBg[MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY] = "playing/gameTable/game_paodekuai_ty.png";
GameBg[MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA] = "playing/gameTable/game_loudifpf.png";
GameBg[MjClient.GAME_TYPE.YONG_ZHOU_MJ]  = "playing/gameTable/game_yongzhou.png";
GameBg[MjClient.GAME_TYPE.JIANG_HUA_MJ]  = "playing/gameTable/game_jianghua.png";
GameBg[MjClient.GAME_TYPE.DAO_ZHOU_MJ] = "playing/gameTable/game_daozhou.png";
GameBg[MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI] = "playing/gameTable/game_xiangxiangphz.png";
GameBg[MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA] = "playing/gameTable/game_sandaha.png";
GameBg[MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA] = "playing/gameTable/game_xiangtansdha.png";
GameBg[MjClient.GAME_TYPE.HZMJ]  = "playing/gameTable/game_HZMJ.png";
GameBg[MjClient.GAME_TYPE.LEI_YANG_GMJ] = "playing/gameTable/game_leiyangGMJ.png";
GameBg[MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG] = "playing/gameTable/game_tongyonghongzhong.png";
GameBg[MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG] = "playing/gameTable/game_shaoyangMJ.png";
GameBg[MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG] = "playing/gameTable/game_datongzi.png";
GameBg[MjClient.GAME_TYPE.SHAO_YANG_BO_PI] = "playing/gameTable/game_syBoPi.png";
GameBg[MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI] = "playing/gameTable/game_syZiPai.png";
GameBg[MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI] = "playing/gameTable/game_xiangxiangghz.png";
GameBg[MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI] = "playing/gameTable/game_hyshiwuhu.png";
GameBg[MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN] = "playing/gameTable/game_huaihuahongguaiwan.png";

if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
    GameBg[MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA] = "playing/gameTable/game_258majiang.png";
else
    GameBg[MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA] = "playing/gameTable/game_changsha.png";

GameBg[MjClient.GAME_TYPE.XIN_NING_MA_JIANG] = "playing/gameTable/game_xinNingMJ.png";
GameBg[MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN] = "playing/gameTable/game_longhuizhadan.png";
GameBg[MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO] = "playing/gameTable/game_yongzhoulaochuo.png"; 
GameBg[MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI] = "playing/gameTable/game_hyerenpaohuzi.png";
GameBg[MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA] = "playing/gameTable/game_loudifpf.png";
GameBg[MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI] = "playing/gameTable/game_xiangxiangphz.png";
GameBg[MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI] = "playing/gameTable/game_xiangtanphz.png";
GameBg[MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI] = "playing/gameTable/game_ahPaoHuZi.png";
GameBg[MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA] = "playing/gameTable/game_banbiantianzha.png";
GameBg[MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO] = "playing/gameTable/game_lengshuijiang.png";
GameBg[MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA] = "playing/gameTable/game_sandaha.png";
GameBg[MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA] = "playing/gameTable/game_hysandaha.png";
GameBg[MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA] = "playing/gameTable/game_hysandaha.png";
GameBg[MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG] = "playing/gameTable/game_huaihuamajiang.png";
GameBg[MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA] = "playing/gameTable/game_hyfangpaofa.png";
GameBg[MjClient.GAME_TYPE.XIANG_SHUI_MJ] = "playing/gameTable/xiangshuiMJ_tab.png";
GameBg[MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG] = "playing/gameTable/game_wangdiao.png";
GameBg[MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE] = "playing/gameTable/game_anxweimaque.png"; 
GameBg[MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ] = "playing/gameTable/game_pudingmajiang.png";
GameBg[MjClient.GAME_TYPE.GUI_ZHOU_AN_SHUN_MJ] = "playing/gameTable/game_anshunmajiang.png";
GameBg[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_LIANG_FANG] = "playing/gameTable/game_sanDingLiangFangmajiang.png";
GameBg[MjClient.GAME_TYPE.GUI_ZHOU_LIANG_DING_LIANG_FANG] = "playing/gameTable/game_liangDingLiangFangmajiang.png";
GameBg[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_GUAI] = "playing/gameTable/game_sanDingGuaimajiang.png";
GameBg[MjClient.GAME_TYPE.GUI_ZHOU_ER_DING_GUAI] = "playing/gameTable/game_erDingGuaimajiang.png";
GameBg[MjClient.GAME_TYPE.SAN_DA_HA_NEW] = "playing/gameTable/game_sanDaHaNew.png";
GameBg[MjClient.GAME_TYPE.DOU_DI_ZHU_GZ] = "playing/gameTable/game_doudizhuGZ.png";
GameBg[MjClient.GAME_TYPE.GUI_ZHOU_XMY_GUI_YANG_ZHUO_JI] = "playing/gameTable/game_xmyguiyangmajiang.png";
GameBg[MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI] = "playing/gameTable/game_guiyangmajiang.png";
GameBg[MjClient.GAME_TYPE.GUI_ZHOU_MEN_HU_XUE_LIU] = "playing/gameTable/game_menhuxueliu.png";
GameBg[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ] = "playing/gameTable/game_erRenYiFang.png";
GameBg[MjClient.GAME_TYPE.XIANG_XI_96POKER] = "playing/gameTable/game_96puke.png";
GameBg[MjClient.GAME_TYPE.XU_PU_LAO_PAI] = "playing/gameTable/game_xuPuLaoPai.png";
GameBg[MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI] = "playing/gameTable/game_xupuphz.png";
GameBg[MjClient.GAME_TYPE.DA_ZI_BO_PI] = "playing/gameTable/game_DaZiBoPi.png";
GameBg[MjClient.GAME_TYPE.HONG_ZE_MA_JIANG] = "playing/gameTable/game_hongzemajiang.png";
GameBg[MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN] = "playing/gameTable/game_gandengyan.png";
GameBg[MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ] = "playing/gameTable/game_yiChangXueLiu.png";
GameBg[MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY] = "playing/gameTable/game_paodekuai_ty.png";
GameBg[MjClient.GAME_TYPE.EN_SHI_MA_JIANG] = "playing/gameTable/game_yipierlai.png";
GameBg[MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG] = 'playing/gameTable/game_jingZhou.png';
//湖北字牌标题路径
GameBg[MjClient.GAME_TYPE.DANG_YANG_FAN_JING] = 'playing/gameTitle/dangYangFanJing.png';
GameBg[MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN] = 'playing/gameTitle/yiChangShangDaRen.png';
GameBg[MjClient.GAME_TYPE.DA_YE_ZI_PAI] = 'playing/gameTitle/daYeZiPai.png';
GameBg[MjClient.GAME_TYPE.HU_BEI_HUA_PAI] = 'playing/gameTitle/huBeiHuaPai.png';
GameBg[MjClient.GAME_TYPE.GONG_AN_HUA_PAI] = 'playing/gameTitle/gongAnHuaPai.png';
GameBg[MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI] = 'playing/gameTitle/tongChengGeZiPai';
GameBg[MjClient.GAME_TYPE.EN_SHI_SHAO_HU] = 'playing/gameTitle/enShiShaoHu.png';

GameBg[MjClient.GAME_TYPE.CHONG_YANG_MJ] = "playing/gameTable/game_chongYangMJ.png";
GameBg[MjClient.GAME_TYPE.QIAN_JIANG_HH_MJ] = "playing/gameTable/game_qianJiangHHMJ.png";
GameBg[MjClient.GAME_TYPE.HUANG_SHI_HH_MJ] = "playing/gameTable/game_huangShiHHMJ.png";
GameBg[MjClient.GAME_TYPE.QI_CHUN_HH_MJ] = "playing/gameTable/game_qiChunHH.png";
GameBg[MjClient.GAME_TYPE.TONG_CHENG_MJ] = "playing/gameTable/game_tongcheng.png";
GameBg[MjClient.GAME_TYPE.YANG_XIN_MA_JIANG] = "playing/gameTable/game_yangXinMaJiang.png";
GameBg[MjClient.GAME_TYPE.TONG_SHAN_HH_MJ] = "playing/gameTable/game_tongShanHuangHuang.png";
GameBg[MjClient.GAME_TYPE.JIANG_LING_HONGZHONG] = "playing/gameTable/game_jiangLingHongZhong.png";
GameBg[MjClient.GAME_TYPE.QI_CHUN_GD_MJ] = "playing/gameTable/game_qiChunGuangDong.png";
GameBg[MjClient.GAME_TYPE.SHI_SHOU_AI_HUANG] = "playing/gameTable/game_shishouaihuang.png";
GameBg[MjClient.GAME_TYPE.WU_XUE_MJ] = "playing/gameTable/game_wuXueMJ.png";
GameBg[MjClient.GAME_TYPE.QI_CHUN_HONG_ZHONG_GANG] = "playing/gameTable/game_qiChunHongZhongGang.png";

var GameHelpUrl = {};
GameHelpUrl[MjClient.GAME_TYPE.LIAN_YUN_GANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXinPu/helpXinPu.html";
GameHelpUrl[MjClient.GAME_TYPE.SHU_YANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpShuYang/helpShuYang.html";
GameHelpUrl[MjClient.GAME_TYPE.GUAN_YUN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpGuanYun/helpGuanYun.html";
GameHelpUrl[MjClient.GAME_TYPE.DONG_HAI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDongHai/helpDongHai.html";
GameHelpUrl[MjClient.GAME_TYPE.NAN_JING] = "helpNanJingUrl";
GameHelpUrl[MjClient.GAME_TYPE.SU_QIAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpSuQian/helpSuQian.html";
GameHelpUrl[MjClient.GAME_TYPE.NIU_NIU] = "helpNiuNiuUrl";
GameHelpUrl[MjClient.GAME_TYPE.HUAI_AN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHuaiAn/helpHuaiAn.html";
GameHelpUrl[MjClient.GAME_TYPE.HA_HONGZHONG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHuaiAnHongZhong/helpHuaiAnHongZhong.html";
GameHelpUrl[MjClient.GAME_TYPE.HA_14DUN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHuaiAn14Dun/helpHuaiAn14Dun.html";
GameHelpUrl[MjClient.GAME_TYPE.XU_ZHOU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXuZhou/helpXuZhou.html";
GameHelpUrl[MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpTuanTuanZhuan/helpTuanTuanZhuan.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoHuZi/helpPaoHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.SI_YANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpSiYang/helpSiYang.html";
GameHelpUrl[MjClient.GAME_TYPE.XIN_SI_YANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXinSiYang/helpXinSiYang.html";
GameHelpUrl[MjClient.GAME_TYPE.SI_YANG_HH] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpSiYangHH/helpSiYangHH.html";
GameHelpUrl[MjClient.GAME_TYPE.YAN_CHENG_HH] = "helpYanChengHHUrl";
GameHelpUrl[MjClient.GAME_TYPE.HUAI_AN_DOU_DI_ZHU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHuaiAnDouDiZhu/helpHuaiAnDouDiZhuUrl.html";
GameHelpUrl[MjClient.GAME_TYPE.RU_GAO] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpRuGao/helpRuGao.html";
GameHelpUrl[MjClient.GAME_TYPE.GAN_YU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpGanYu/helpGanYu.html";
GameHelpUrl[MjClient.GAME_TYPE.HUAI_AN_TTZ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHuaiAnTuanTuanZhuan/helpHuaiAnTuanTuanZhuan.html";
GameHelpUrl[MjClient.GAME_TYPE.RU_GAO_MJH] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpRuGaoMJH/helpRuGaoMJH.html";
GameHelpUrl[MjClient.GAME_TYPE.QU_TANG_23_ZHANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpQuTang23Zhang/helpQuTang23Zhang.html";
GameHelpUrl[MjClient.GAME_TYPE.HUAI_AN_CC] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHuaiAnChuChong/helpHuaiAnChuChong.html";
GameHelpUrl[MjClient.GAME_TYPE.HZ_TUI_DAO_HU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHongZeTuiDaoHu/helpHongZeTuiDaoHu.html";
GameHelpUrl[MjClient.GAME_TYPE.HUAI_AN_ERZ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHuaiAnErRenZhuan/helpHuaiAnErRenZhuan.html";
GameHelpUrl[MjClient.GAME_TYPE.GUAN_NAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpGuanNan/helpGuanNan.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_DE_KUAI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoDeKuai/helpPaoDeKuai.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_DE_KUAI_TY] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoDeKuaiTY/helpPaoDeKuaiTY.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoDeKuaiEleven/helpPaoDeKuaiEleven.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoDeKuaiTY/helpPaoDeKuaiTY.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_DE_KUAI_JZ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoDeKuaiJZ/helpPaoDeKuaiJZ.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_DE_KUAI_HA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoDeKuaiHuaian/helpPaoDeKuaiHuaian.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoDeKuaiHuaianNew/helpPaoDeKuaiHuaianNew.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_DE_KUAI_LYG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoDeKuaiLYG/helpPaoDeKuaiLYG.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoDeKuaiXiangShui/helpPaoDeKuaiXiangShui.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_DE_KUAI_NT] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoDeKuaiNT/helpPaoDeKuaiNT.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoDeKuaiHaiAn/helpPaoDeKuaiHaiAn.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoDeKuaiXuzhou/helpPaoDeKuaiXuzhou.html";
GameHelpUrl[MjClient.GAME_TYPE.XIN_PU_HZ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHZMJ/helpHZMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.LUO_DI_SAO] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLuoDiSao/helpLuoDiSao.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_HU_ZI_SR] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoHuZiSR/helpPaoHuZiSR.html";
GameHelpUrl[MjClient.GAME_TYPE.DOU_DI_ZHU_NT] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpNTDouDiZhu/helpNTDouDiZhu.html";
GameHelpUrl[MjClient.GAME_TYPE.NTHZ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpNTHongZhong/helpNTHongZhong.html";
GameHelpUrl[MjClient.GAME_TYPE.TONG_HUA] = "helpTongHuaUrl";
GameHelpUrl[MjClient.GAME_TYPE.CHANG_SHA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpChangSha/helpChangSha.html";
GameHelpUrl[MjClient.GAME_TYPE.NING_XIANG_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpNingXiang/helpNingXiang.html";
GameHelpUrl[MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXiangYinTuiDaoHu/helpXiangYinTuiDaoHu.html";
GameHelpUrl[MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPingJiangZhaNiao/helpPingJiangZhaNiao.html";
GameHelpUrl[MjClient.GAME_TYPE.LIAN_SHUI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHuanAnLianShui/helpHuanAnLianShui.html";
GameHelpUrl[MjClient.GAME_TYPE.TY_HONGZHONG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpTYHongZhong/helpTYHongZhong.html";
GameHelpUrl[MjClient.GAME_TYPE.ML_HONGZHONG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpMiLuoHongZhong/helpMiLuoHongZhong.html";
GameHelpUrl[MjClient.GAME_TYPE.ML_HONGZHONG_ZERO] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpMiLuoHongZhong/helpMiLuoHongZhong.html";
GameHelpUrl[MjClient.GAME_TYPE.CHEN_ZHOU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpChenZhou/helpChenZhou.html";
GameHelpUrl[MjClient.GAME_TYPE.YUAN_JIANG_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYuanJiangUrl/helpYuanJiangMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.NAN_XIAN_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpNanXianUrl/helpNanXianUrl.html";
GameHelpUrl[MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpZhuoXiaZi/helpZhuoXiaZi.html";
GameHelpUrl[MjClient.GAME_TYPE.CHAO_GU_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpyueyangchaogu/helpyueyangchaogu.html";
GameHelpUrl[MjClient.GAME_TYPE.DOU_DI_ZHU_TY] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpTYDouDiZhu/helpTYDouDiZhu.html";
GameHelpUrl[MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpTYDouDiZhu/helpTYDouDiZhu.html";
GameHelpUrl[MjClient.GAME_TYPE.DOU_DI_ZHU_QC] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDouDiZhuQC/helpDouDiZhuQC.html";
GameHelpUrl[MjClient.GAME_TYPE.WU_XUE_GE_BAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpWuxuegeban/helpWuxuegeban.html";
GameHelpUrl[MjClient.GAME_TYPE.DIAN_TUO] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDianTuo/helpDianTuo.html";
GameHelpUrl[MjClient.GAME_TYPE.DOU_DI_ZHU_JZ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJZDouDiZhu/helpJZDouDiZhu.html";
GameHelpUrl[MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJZDouDiZhu/helpJZDouDiZhu.html";
GameHelpUrl[MjClient.GAME_TYPE.DOU_DI_ZHU_DA_TONG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJZDouDiZhu/helpJZDouDiZhu.html";
GameHelpUrl[MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLvLiangDouDiZhu/helpLvLiangDouDiZhu.html";
GameHelpUrl[MjClient.GAME_TYPE.TY_ZHUANZHUAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpTYZhuanZhuan/helpTYZhuanZhuan.html";
GameHelpUrl[MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYongZhouBaoPai/helpYongZhouBaoPai.html"; 
GameHelpUrl[MjClient.GAME_TYPE.SAN_DA_HA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpSanDaHa/helpSanDaHa.html";
GameHelpUrl[MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpChongYangHuaQuanJiao/helpChongYangHuaQuanJiao.html";
GameHelpUrl[MjClient.GAME_TYPE.LV_LIANG_DA_QI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLvLiangDaQi/helpLvLiangDaQi.html";
GameHelpUrl[MjClient.GAME_TYPE.BAI_PU_LIN_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpBaiPuLinZi/helpBaiPuLinZi.html";
GameHelpUrl[MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpShuangJiangChangPai/helpShuangJiangChangPai.html";
GameHelpUrl[MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpRuDongShuangJiang/helpRuDongShuangJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.HAI_AN_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHaiAn/helpHaiAn.html";
GameHelpUrl[MjClient.GAME_TYPE.XUE_ZHAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXueZhan/helpXueZhan.html";
GameHelpUrl[MjClient.GAME_TYPE.XUE_LIU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXueLiu/helpXueLiu.html";
GameHelpUrl[MjClient.GAME_TYPE.HAI_AN_BAI_DA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHaiAnBaiDa/helpHaiAnBaiDa.html";
GameHelpUrl[MjClient.GAME_TYPE.JIN_ZHONG_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJinZhong/helpJinZhong.html";
GameHelpUrl[MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJinZhong/helpJinZhong.html";
GameHelpUrl[MjClient.GAME_TYPE.DOU_DI_ZHU_HA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHADouDiZhu/helpHADouDiZhu.html";
GameHelpUrl[MjClient.GAME_TYPE.JIN_ZHONG_KD] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJinZhongKouDian/helpJinZhongKouDian.html";
GameHelpUrl[MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYunChengTieJin/helpYunChengTieJin.html";
GameHelpUrl[MjClient.GAME_TYPE.HE_JIN_KUN_JIN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHeJinKunJin/helpHeJinKunJin.html";
GameHelpUrl[MjClient.GAME_TYPE.LV_LIANG_MA_JIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLvLiangMaJiang/helpLvLiangMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.ZHUO_HAO_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLvLiangMaJiang/helpLvLiangMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.RU_GAO_ER] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpRuGaoER/helpRuGaoER.html";
GameHelpUrl[MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJinZhongTuiDaoHu/helpJinZhongTuiDaoHu.html";
GameHelpUrl[MjClient.GAME_TYPE.LING_SHI_BIAN_LONG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLingShiMaJiang/helpLingShiMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.LING_SHI_BAN_MO] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLingShiMaJiang/helpLingShiMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.PING_YAO_KOU_DIAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPingYaoMaJiang/helpPingYaoMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.PING_YAO_MA_JIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPingYaoMaJiang/helpPingYaoMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJieXiuMaJiang/helpJieXiuMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJieXiuMaJiang/helpJieXiuMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpGuaiSanJiao/helpGuaiSanJiao.html";
GameHelpUrl[MjClient.GAME_TYPE.SHOU_YANG_QUE_KA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpShouYangQueKa/helpShouYangQueKa.html";
GameHelpUrl[MjClient.GAME_TYPE.JIN_ZHONG_LI_SI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLiSiMaJiang/helpLiSiMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN] = "helplvliangMaJiangUrl";
GameHelpUrl[MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpxiaoyiMaJiang/helpxiaoyiMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.HONG_TONG_WANG_PAI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHongTongMaJiang/helpHongTongMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helplinfenyingsanzuiMaJiang/helplinfenyingsanzuiMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLinFenDouDiZhu/helpLinFenDouDiZhu.html";
GameHelpUrl[MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLinFenYiMenZi/helpLinFenYiMenZi.html";
GameHelpUrl[MjClient.GAME_TYPE.FEN_XI_YING_KOU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLinXiYingKou/helpLinXiYingKou.html";
GameHelpUrl[MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJiXianJiaZhang/helpJiXianJiaZhang.html";
GameHelpUrl[MjClient.GAME_TYPE.ML_HONG_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpMiLuoHongZi/helpMiLuoHongZi.html";
GameHelpUrl[MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXiangYinHongZi/helpXiangYinHongZi.html";
GameHelpUrl[MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYueYangWaiHuZi/helpYueYangWaiHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYiYangWaiHuZi/helpYiYangWaiHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpNanXianGuiHuZi/helpNanXianGuiHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYuanJiangGuiHuZi/helpYuanJiangGuiHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpShiMenPaoHuZi/helpShiMenPaoHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.FEN_YANG_QUE_MEN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpFenYangQueMen/helpFenYangQueMen.html";
GameHelpUrl[MjClient.GAME_TYPE.JING_LE_KOU_DIAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJingLeKouDian/helpJingLeKouDian.html";
GameHelpUrl[MjClient.GAME_TYPE.DA_TONG_GUAI_SAN_JIAO] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDaTongGuaiSanJiao/helpDaTongGuaiSanJiao.html";
GameHelpUrl[MjClient.GAME_TYPE.LUAN_GUA_FENG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDaTongLuanGuaFeng/helpDaTongLuanGuaFeng.html";
GameHelpUrl[MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpxiangningshuaijin/helpxiangningshuaijin.html";
GameHelpUrl[MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXuZhouPeiXianMJ/helpXuZhouPeiXianMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLinFenKouDianFengZuiZi/helpLinFenKouDianFengZuiZi.html";
GameHelpUrl[MjClient.GAME_TYPE.FAN_SHI_XIA_YU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpFanShiXiaYuMJ/helpFanShiXiaYuMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDaiXianMaJiang/helpDaiXianMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYueYangHongZhong/helpYueYangHongZhong.html";
GameHelpUrl[MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYueYangSanDaHa/helpYueYangSanDaHa.html";
GameHelpUrl[MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXinZhouDouDiZhu/helpXinZhouDouDiZhu.html";
GameHelpUrl[MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXinZhouSanDaEr/helpXinZhouSanDaEr.html";
GameHelpUrl[MjClient.GAME_TYPE.AN_HUA_MA_JIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpAnHuaMaJiangUrl/helpAnHuaMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpAnHuaMaJiangSW/helpAnHuaMaJiangSW.html";
GameHelpUrl[MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpTaoJiangMaJiang/taojiangmajiang.html";
GameHelpUrl[MjClient.GAME_TYPE.WU_TAI_KOU_DIAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpWuTaiKouDian/helpWuTaiKouDian.html";
GameHelpUrl[MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpFuLuShou/helpFuLuShou.html";
GameHelpUrl[MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpFuLuShouErShiZhang/helpFuLuShouErShiZhang.html";
GameHelpUrl[MjClient.GAME_TYPE.DA_NING_SHUAI_JIN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDaNingShuaiJin/helpDaNingShuaiJin.html";
GameHelpUrl[MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYYAnHuaPaoHuZi/helpYYAnHuaPaoHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpChenZhouZiPai/helpChenZhouZiPai.html";
GameHelpUrl[MjClient.GAME_TYPE.GUI_YANG_ZI_PAI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpGuiYangZiPai/helpGuiYangZiPai.html";
GameHelpUrl[MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpNiuShiBie/helpNiuShiBie.html";
GameHelpUrl[MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDaMaZi/helpDaMaZi.html";
GameHelpUrl[MjClient.GAME_TYPE.CHONG_YANG_DA_GUN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpChongYangDaGun/helpChongYangDaGun.html";
GameHelpUrl[MjClient.GAME_TYPE.DA_YE_DA_GONG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDaYeDaGong/helpDaYeDaGong.html";
GameHelpUrl[MjClient.GAME_TYPE.TONG_SHAN_DA_GONG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpTongShanDaGong/helpTongShanDaGong.html";
GameHelpUrl[MjClient.GAME_TYPE.DA_YE_510K] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDaYe510K/helpDaYe510K.html";
GameHelpUrl[MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDaYe510K/helpDaYe510K.html";
GameHelpUrl[MjClient.GAME_TYPE.QI_CHUN_DA_GONG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpQiChunDaGong/helpQiChunDaGong.html";
GameHelpUrl[MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDaTongZhaGuZi/helpDaTongZhaGuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpNingXiangPaoHuZi/helpNingXiangPaoHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.NING_XIANG_KAI_WANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpNingXiangKaiWang/helpNingXiangKaiWang.html";
GameHelpUrl[MjClient.GAME_TYPE.YUE_YANG_PENG_HU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYueYangPengHu/helpYueYangPengHu.html";
GameHelpUrl[MjClient.GAME_TYPE.HY_LIU_HU_QIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHYLiuHuQiang/helpHYLiuHuQiang.html";
GameHelpUrl[MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYueYangYiJiaoLaiYouUrl/helpYueYangYiJiaoLaiYouUrl.html";
GameHelpUrl[MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJingShanMJ/helpJingShanMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXiaoGanKaWuXing/helpXiaoGanKaWuXing.html";
GameHelpUrl[MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpSuiZhouKaWuXing/helpSuiZhouKaWuXing.html";
GameHelpUrl[MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDaYeKaiKouFan/helpDaYeKaiKouFan.html";
GameHelpUrl[MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHongZhongLaiZiGang/helpHongZhongLaiZiGang.html";
GameHelpUrl[MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHuBeiYiJiaoLaiYouUrl/helpHuBeiYiJiaoLaiYouUrl.html";
GameHelpUrl[MjClient.GAME_TYPE.CHUO_XIA_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpChuoXiaZi/helpChuoXiaZi.html";
GameHelpUrl[MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYueYangDaZhaDan/helpYueYangDaZhaDan.html";
GameHelpUrl[MjClient.GAME_TYPE.YI_YANG_MA_JIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYiYangMaJiang/helpYiYangMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpchenZhouMaoHuZi/chenzhoumaohuzi.html";
GameHelpUrl[MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYueYangYuanJiangQianFen/helpYueYangYuanJiangQianFenUrl.html";
GameHelpUrl[MjClient.GAME_TYPE.XIANG_XI_2710] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXiangXiErQiShi/xiangxierqishi.html";
GameHelpUrl[MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpChangDePaoHuZi/helpChangDePaoHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYuanLingPaoHuZi/helpYuanLingPaoHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.ZP_LY_CHZ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLYPaoHuZi/helpLYPaoHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHanShouPaoHuZi/helpHanShouPaoHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.NAN_JING] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpNanJing/helpNanJing.html";
GameHelpUrl[MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYunChengFengHaoZi/helpYunChengFengHaoZi.html";
GameHelpUrl[MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJiShanNiuYeZi/helpJiShanNiuYeZi.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_HU_ZI_SR_King] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoHuZiSRKing/helpPaoHuZiSRKing.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_HU_ZI_King] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoHuZiKing/helpPaoHuZiKing.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_HU_ZI_ER] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoHuZi/helpPaoHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_HU_ZI_LR_King] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoHuZiKing/helpPaoHuZiKing.html";
GameHelpUrl[MjClient.GAME_TYPE.HY_SHI_HU_KA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHYShiHuKa/helpHYShiHuKa.html";
GameHelpUrl[MjClient.GAME_TYPE.JIANG_YONG_15Z] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJiangYong15Z/helpJiangYong15Z.html";
GameHelpUrl[MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoDeKuaiTY/helpPaoDeKuaiTY.html";
GameHelpUrl[MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpWangDiao/helpWangDiao.html";
GameHelpUrl[MjClient.GAME_TYPE.YONG_ZHOU_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYongZhouMJ/helpYongZhouMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.JIANG_HUA_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJiangHuaMJ/helpJiangHuaMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.DAO_ZHOU_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDaoZhouMJ/helpDaoZhouMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXXPaoHuZiUrl/helpXXPaoHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXiangXiangSanDaHa/helpXiangXiangSanDaHaUrl.html";
GameHelpUrl[MjClient.GAME_TYPE.LEI_YANG_GMJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLeiYangGMJ/helpLeiYangGMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXiangXiangHongZhongUrl/helpXiangXiangHongZhongUrl.html";
GameHelpUrl[MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpShaoYangMJ/helpShaoYangMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDaTongZiShaoYang/helpDaTongZiShaoYang.html";
GameHelpUrl[MjClient.GAME_TYPE.SHAO_YANG_BO_PI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpShaoYangBoPi/helpShaoYangBoPi.html";
GameHelpUrl[MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpShaoYangZiPai/helpShaoYangZiPai.html";
GameHelpUrl[MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXXGaoHuZi/helpXXGaoHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLDFangPaoFa/helpLDFangPaoFa.html";
GameHelpUrl[MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHYShiWuHu/helpHYShiWuHu.html";
GameHelpUrl[MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHuaiHuaHGW/helpHuaiHuaHGW.html";
GameHelpUrl[MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHengYangChangSha/helpHengYangChangSha.html";
GameHelpUrl[MjClient.GAME_TYPE.XIN_NING_MA_JIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXinNingMJ/helpXinNingMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpBaZhaDan/helpBaZhaDan.html";
GameHelpUrl[MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYongZhouLaoChuo/helpYongZhouLaoChuo.html";
GameHelpUrl[MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHYErRenPaoHuZi/helpHYErRenPaoHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLDFangPaoFa/helpLDFangPaoFa.html";
GameHelpUrl[MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXTPaoHuZi/xiangtanpaohuzi.html";
GameHelpUrl[MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpAnHuaPaoHuZi/helpAnHuaPaoHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpBanBianTianZha/helpBanBianTianZha.html";
GameHelpUrl[MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLengShuiJiangShiHuDao/helpLengShuiJiangShiHuDao.html";
GameHelpUrl[MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHengYangSanDaHa/helpHengYangSanDaHa.html";
GameHelpUrl[MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpShaoYangSanDaHa/helpShaoYangSanDaHa.html";
GameHelpUrl[MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpShaoYangSanDaHa/helpShaoYangSanDaHa.html";
GameHelpUrl[MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHuaiHuaMaJiang/helpHuaiHuaMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpLDFangPaoFa/helpLDFangPaoFa.html";
GameHelpUrl[MjClient.GAME_TYPE.XIANG_SHUI_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXiangShui/helpXiangShuiMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpSanDaHa/helpSanDaHa.html";
GameHelpUrl[MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpAnXiangWeiMaQue/helpAnXiangWeiMaQue.html";
GameHelpUrl[MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpGuiZhouPuDingMaJiang/helpGuiZhouPuDingMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.GUI_ZHOU_AN_SHUN_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpGuiZhouAnShunMaJiang/helpGuiZhouAnShunMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_LIANG_FANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpGuiZhouSanDingLiangFangMaJiang/helpGuiZhouSanDingLiangFangMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.GUI_ZHOU_LIANG_DING_LIANG_FANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpGuiZhouLiangDingLiangFangMaJiang/helpGuiZhouLiangDingLiangFangMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_GUAI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpGuiZhouSanDingGuaiMaJiang/helpGuiZhouSanDingGuaiMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.GUI_ZHOU_ER_DING_GUAI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpGuiZhouErDingGuaiMaJiang/helpGuiZhouErDingGuaiMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.SAN_DA_HA_NEW] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpSanDaHa/helpSanDaHa.html";
GameHelpUrl[MjClient.GAME_TYPE.DOU_DI_ZHU_GZ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJZDouDiZhu/helpJZDouDiZhu.html";
GameHelpUrl[MjClient.GAME_TYPE.GUI_ZHOU_XMY_GUI_YANG_ZHUO_JI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpGuiZhouXMYGuiYangZhuoJi/helpGuiZhouXMYGuiYangZhuoJi.html";
GameHelpUrl[MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpGuiZhouGuiYangZhuoJi/helpGuiZhouGuiYangZhuoJi.html";
GameHelpUrl[MjClient.GAME_TYPE.GUI_ZHOU_MEN_HU_XUE_LIU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpMenHuXueLiu/helpMenHuXueLiu.html";
GameHelpUrl[MjClient.GAME_TYPE.XIANG_XI_96POKER] = "http://http://146.56.224.12:9993/protocol/protocol/tips/help96Poker/help96Poker.html";
GameHelpUrl[MjClient.GAME_TYPE.XU_PU_LAO_PAI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXuPuLaoPai/helpXuPuLaoPai.html";
GameHelpUrl[MjClient.GAME_TYPE.CHANG_SHA_ER_REN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpChangShaErRen/helpChangShaErRen.html";
GameHelpUrl[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpErRenYiFang/helpErRenYiFang.html";
GameHelpUrl[MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpXuPuPaoHuZi/helpXuPuPaoHuZi.html";
GameHelpUrl[MjClient.GAME_TYPE.DA_ZI_BO_PI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDaZiBoPi/helpDaZiBoPi.html";
GameHelpUrl[MjClient.GAME_TYPE.HONG_ZE_MA_JIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHongZeMaJiang/helpHongZeMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpGanDengYan/helpGanDengYan.html";
GameHelpUrl[MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYiChangXueLiu/helpYiChangXueLiu.html";
GameHelpUrl[MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpPaoDeKuaiHBTY/helpPaoDeKuaiHBTY.html";
GameHelpUrl[MjClient.GAME_TYPE.EN_SHI_MA_JIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYiPiErLai/helpYiPiErLai.html";
GameHelpUrl[MjClient.GAME_TYPE.DANG_YANG_FAN_JING] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDangYangFanJing/helpDangYangFanJing.html";
GameHelpUrl[MjClient.GAME_TYPE.DA_YE_ZI_PAI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpDaYeZiPai/helpDaYeZiPai.html";
GameHelpUrl[MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJingZhouMaJiang/helpJingZhouMaJiang.html";
GameHelpUrl[MjClient.GAME_TYPE.CHONG_YANG_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpChongYangMJ/helpChongYangMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.QIAN_JIANG_HH_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpQianJiangHHMJ/helpQianJiangHHMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.HUANG_SHI_HH_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHuangShiHHMJ/helpHuangShiHHMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.QI_CHUN_HH_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpQiChunHHMJ/helpQiChunHHMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.TONG_CHENG_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpTongChengMJ/helpTongChengMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYiChangShangDaRen/helpYiChangShangDaRen.html";
GameHelpUrl[MjClient.GAME_TYPE.HU_BEI_HUA_PAI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpHuBeiHuaPai/helpHuBeiHuaPai.html";
GameHelpUrl[MjClient.GAME_TYPE.YANG_XIN_MA_JIANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpYangXin/helpYangXin.html";
GameHelpUrl[MjClient.GAME_TYPE.TONG_SHAN_HH_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpTongShanHuangHuang/helpTongShanHuangHuang.html";
GameHelpUrl[MjClient.GAME_TYPE.JIANG_LING_HONGZHONG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpJiangLingHongZhong/helpJiangLingHongZhong.html";
GameHelpUrl[MjClient.GAME_TYPE.QI_CHUN_GD_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpQIChunGuangDongMJ/helpQIChunGuangDongMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.SHI_SHOU_AI_HUANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpShiShouAiHuang/helpShiShouAiHuang.html";
GameHelpUrl[MjClient.GAME_TYPE.GONG_AN_HUA_PAI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpGongAnHuaPai/helpGongAnHuaPai.html";
GameHelpUrl[MjClient.GAME_TYPE.WU_XUE_MJ] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpWuXueMJ/helpWuXueMJ.html";
GameHelpUrl[MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpTongChengGeZiPai/helpTongChengGeZiPai.html";
GameHelpUrl[MjClient.GAME_TYPE.QI_CHUN_HONG_ZHONG_GANG] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpQiChunHongZhongGang/helpQiChunHongZhongGang.html";
GameHelpUrl[MjClient.GAME_TYPE.EN_SHI_SHAO_HU] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpEnShiShaoHu/helpEnShiShaoHu.html";
GameHelpUrl[MjClient.GAME_TYPE.WU_XUE_510K] = "http://http://146.56.224.12:9993/protocol/protocol/tips/helpWuXue510k/helpWuXue510k.html";

var GameButton = {};
GameButton[MjClient.GAME_TYPE.LIAN_YUN_GANG] = "createNewPng/jinzhou";
GameButton[MjClient.GAME_TYPE.SHU_YANG] = "createNewPng/shuyang";
GameButton[MjClient.GAME_TYPE.GUAN_YUN] = "createNewPng/guanyun";
GameButton[MjClient.GAME_TYPE.DONG_HAI] = "createNewPng/donghai";
GameButton[MjClient.GAME_TYPE.NAN_JING] = "createNewPng/nanjing";
GameButton[MjClient.GAME_TYPE.SU_QIAN] = "createNewPng/suqian";
GameButton[MjClient.GAME_TYPE.NIU_NIU] = "createNewPng/niuniu";
GameButton[MjClient.GAME_TYPE.HUAI_AN] = "createNewPng/huaian";
GameButton[MjClient.GAME_TYPE.HA_HONGZHONG] = "createNewPng/huaianhongzhong";
GameButton[MjClient.GAME_TYPE.HA_14DUN] = "createNewPng/huaian14dun";
GameButton[MjClient.GAME_TYPE.XU_ZHOU] = "createNewPng/xuzhou";
GameButton[MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN] = "createNewPng/tuantuanzhuan";
GameButton[MjClient.GAME_TYPE.PAO_HU_ZI] = "createNewPng/paohuzi";
GameButton[MjClient.GAME_TYPE.SI_YANG] = "createNewPng/siyang";
GameButton[MjClient.GAME_TYPE.XIN_SI_YANG] = "createNewPng/siyang_new";
GameButton[MjClient.GAME_TYPE.SI_YANG_HH] = "createNewPng/siyanghh";
GameButton[MjClient.GAME_TYPE.YAN_CHENG_HH] = "createNewPng/yanchenghh";
GameButton[MjClient.GAME_TYPE.RU_GAO] = "createNewPng/rugao";
GameButton[MjClient.GAME_TYPE.GAN_YU] = "createNewPng/ganyu";
GameButton[MjClient.GAME_TYPE.HUAI_AN_TTZ] = "createNewPng/ttz_m";
GameButton[MjClient.GAME_TYPE.RU_GAO_MJH] = "createNewPng/rugaohu";
GameButton[MjClient.GAME_TYPE.QU_TANG_23_ZHANG] = "createNewPng/qutang23zhang";
GameButton[MjClient.GAME_TYPE.HUAI_AN_CC] = "createNewPng/huaianchuchong";
GameButton[MjClient.GAME_TYPE.HZ_TUI_DAO_HU] = "createNewPng/hongzetuidaohu";
GameButton[MjClient.GAME_TYPE.HUAI_AN_ERZ] = "createNewPng/huaianERZ";
GameButton[MjClient.GAME_TYPE.GUAN_NAN] = "createNewPng/guannan";
GameButton[MjClient.GAME_TYPE.PAO_DE_KUAI] = "createNewPng/paodekuai";
GameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_TY] = "createNewPng/paodekuai_ty";
GameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN] = "createNewPng/paodekuai_11"; 
GameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO] = "createNewPng/paodekuai_ty";
GameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_JZ] = "createNewPng/paodekuai_jz";
GameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_HA] = "createNewPng/paodekuai_huaian";
GameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW] = "createNewPng/paodekuai_huaianNew";
GameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_LYG] = "createNewPng/paodekuai_lyg";
GameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI] = "createNewPng/paodekuai_xs";
GameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_NT] = "createNewPng/paodekuai_nt";
GameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN] = "createNewPng/paodekuai_haian";
GameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU] = "createNewPng/paodekuai_xuzhou";
GameButton[MjClient.GAME_TYPE.XIN_PU_HZ] = "createNewPng/HZMJ";
GameButton[MjClient.GAME_TYPE.YZ_CHZTEST] = "createNewPng/yzchz";
GameButton[MjClient.GAME_TYPE.LUO_DI_SAO] = "createNewPng/luodisao";
GameButton[MjClient.GAME_TYPE.PAO_HU_ZI_SR] = "createNewPng/zuoxing";
GameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_NT] = "createNewPng/doudizhu";
GameButton[MjClient.GAME_TYPE.NTHZ] = "createNewPng/shisanzhang";
GameButton[MjClient.GAME_TYPE.TONG_HUA] = "createNewPng/tonghua";
GameButton[MjClient.GAME_TYPE.CHANG_SHA] = "createNewPng/changsha";
GameButton[MjClient.GAME_TYPE.CHANG_SHA_ER_REN] = "createNewPng/changsha_er";
GameButton[MjClient.GAME_TYPE.NING_XIANG_MJ] = "createNewPng/ningxiang";
GameButton[MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU] = "createNewPng/xiangyintuidaohu";
GameButton[MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO] = "createNewPng/pingjiangzhaniao";
GameButton[MjClient.GAME_TYPE.LIAN_SHUI] = "createNewPng/lianshui";
GameButton[MjClient.GAME_TYPE.TY_HONGZHONG] = "createNewPng/tongyonghongzhong";
GameButton[MjClient.GAME_TYPE.ML_HONGZHONG] = "createNewPng/miluohongzhong";
GameButton[MjClient.GAME_TYPE.ML_HONGZHONG_ZERO] = "createNewPng/miluohongzhong";
GameButton[MjClient.GAME_TYPE.CHEN_ZHOU] = "createNewPng/chenzhou";
GameButton[MjClient.GAME_TYPE.YUAN_JIANG_MJ] = "createNewPng/yuanjiang";
GameButton[MjClient.GAME_TYPE.NAN_XIAN_MJ] = "createNewPng/nanxian";
GameButton[MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI] = "createNewPng/zhuoxiazi";
GameButton[MjClient.GAME_TYPE.CHAO_GU_MJ] = "createNewPng/chaogu";
GameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_TY] = "createNewPng/doudizhuTY";
GameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY] = "createNewPng/doudizhuTY";
GameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_QC] = "createNewPng/doudizhuqcTY";
GameButton[MjClient.GAME_TYPE.WU_XUE_GE_BAN] = "createNewPng/wuxuegeban";
GameButton[MjClient.GAME_TYPE.DIAN_TUO] = "createNewPng/diantuo";
GameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_JZ] = "createNewPng/doudizhuJZ";
GameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO] = "createNewPng/doudizhuJZ";
GameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG] = "createNewPng/doudizhuLL";
GameButton[MjClient.GAME_TYPE.TY_ZHUANZHUAN] = "createNewPng/zhuanzhuan";
GameButton[MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI] = "createNewPng/baoPaiYZ";  
GameButton[MjClient.GAME_TYPE.SAN_DA_HA] = "createNewPng/sanDaHa";
GameButton[MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO] = "createNewPng/chongYangHuaQuanJiao";
GameButton[MjClient.GAME_TYPE.LV_LIANG_DA_QI] = "createNewPng/lvliangdaqi";
GameButton[MjClient.GAME_TYPE.BAI_PU_LIN_ZI] = "createNewPng/baiPuLinZi";
GameButton[MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG] = "createNewPng/shuangjiang";
GameButton[MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG] = "createNewPng/rudongshuangjiang";
GameButton[MjClient.GAME_TYPE.HAI_AN_MJ] = "createNewPng/haian";
GameButton[MjClient.GAME_TYPE.XUE_ZHAN] = "createNewPng/xuezhan";
GameButton[MjClient.GAME_TYPE.XUE_LIU] = "createNewPng/xueliu";
GameButton[MjClient.GAME_TYPE.HAI_AN_BAI_DA] = "createNewPng/haianbaida";
GameButton[MjClient.GAME_TYPE.JIN_ZHONG_MJ] = "createNewPng/jinzhongmj";
GameButton[MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN] = "createNewPng/jinzhongmj";
GameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_HA] = "createNewPng/doudizhuHA";
GameButton[MjClient.GAME_TYPE.JIN_ZHONG_KD] = "createNewPng/koudian";
GameButton[MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN] = "createNewPng/yunchengtiejin";
GameButton[MjClient.GAME_TYPE.HE_JIN_KUN_JIN] = "createNewPng/hejinkunjin";
GameButton[MjClient.GAME_TYPE.LV_LIANG_MA_JIANG] = "createNewPng/lvliangmajiang";
GameButton[MjClient.GAME_TYPE.ZHUO_HAO_ZI] = "createNewPng/zhuohaozi";
GameButton[MjClient.GAME_TYPE.RU_GAO_ER] = "createNewPng/errenchangpai";
GameButton[MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU] = "createNewPng/tuidaohu";
GameButton[MjClient.GAME_TYPE.LING_SHI_BIAN_LONG] = "createNewPng/lingshimajiang";
GameButton[MjClient.GAME_TYPE.LING_SHI_BAN_MO] = "createNewPng/lingshimajiang";
GameButton[MjClient.GAME_TYPE.PING_YAO_KOU_DIAN] = "createNewPng/pingyaomajiang";
GameButton[MjClient.GAME_TYPE.PING_YAO_MA_JIANG] = "createNewPng/pingyaomajiang";
GameButton[MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3] = "createNewPng/jiexiumajiang";
GameButton[MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN] = "createNewPng/jiexiumajiang";
GameButton[MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO] = "createNewPng/guaisanjiao";
GameButton[MjClient.GAME_TYPE.SHOU_YANG_QUE_KA] = "createNewPng/shouyangmajiang";
GameButton[MjClient.GAME_TYPE.JIN_ZHONG_LI_SI] = "createNewPng/lisi";
GameButton[MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN] = "createNewPng/lvliangmajiang";
GameButton[MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN] = "createNewPng/xiaoyikoudian";
GameButton[MjClient.GAME_TYPE.HONG_TONG_WANG_PAI] = "createNewPng/hongtongwangpai";
GameButton[MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI] = "createNewPng/yingsanzuimajiang";
GameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN] = "createNewPng/doudizhuLF";
GameButton[MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI] = "createNewPng/yimenzimajiang";
GameButton[MjClient.GAME_TYPE.FEN_XI_YING_KOU] = "createNewPng/fenxiyingkou";
GameButton[MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG] = "createNewPng/linfenjixian";
GameButton[MjClient.GAME_TYPE.ML_HONG_ZI] = "createNewPng/zhuohongzi";
GameButton[MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI] = "createNewPng/xyzhuohongzi";
GameButton[MjClient.GAME_TYPE.DA_NING_SHUAI_JIN] = "createNewPng/daningshuaijin";
GameButton[MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI] = "createNewPng/yueyangwaihuzi";
GameButton[MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI] = "createNewPng/yiyangwaihuzi";
GameButton[MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI] = "createNewPng/nanxianguihuzi";
GameButton[MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI] = "createNewPng/yuanjiangguihuzi";
GameButton[MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI] = "createNewPng/shiMenPaoHuZi";
GameButton[MjClient.GAME_TYPE.FEN_YANG_QUE_MEN] = "createNewPng/fenyangquemen";
GameButton[MjClient.GAME_TYPE.JING_LE_KOU_DIAN] = "createNewPng/jingle";
GameButton[MjClient.GAME_TYPE.DA_TONG_GUAI_SAN_JIAO] = "createNewPng/datongguaisanjiao";
GameButton[MjClient.GAME_TYPE.LUAN_GUA_FENG] = "createNewPng/luanguafeng";
GameButton[MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN] = "createNewPng/xiangningshuaijin";
GameButton[MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN] = "createNewPng/xuzhoupeixian";
GameButton[MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI] = "createNewPng/linfenkoudianfengzuizi";
GameButton[MjClient.GAME_TYPE.FAN_SHI_XIA_YU] = "createNewPng/fanshixiayu";
GameButton[MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG] = "createNewPng/daixianMJ";
GameButton[MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG] = "createNewPng/yueyanghz";
GameButton[MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA] = "createNewPng/yueyangsandaha";
GameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU] = "createNewPng/doudizhuXZ";
GameButton[MjClient.GAME_TYPE.WU_TAI_KOU_DIAN] = "createNewPng/wutaikoudian";
GameButton[MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER] = "createNewPng/sandaer";
GameButton[MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU] = "createNewPng/fulushou";
GameButton[MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG] = "createNewPng/fulushou20";
GameButton[MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI] = "createNewPng/ahPaoHuZi";
GameButton[MjClient.GAME_TYPE.AN_HUA_MA_JIANG]    = "createNewPng/anhuamajiang";
GameButton[MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW] = "createNewPng/anhuamajiangsw";
GameButton[MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG] = "createNewPng/taojiangmajiang";
GameButton[MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI] = "createNewPng/zhaguzi";
GameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_DA_TONG] = "createNewPng/doudizhuDaTong";
GameButton[MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI] = "createNewPng/chenZhouZiPai";
GameButton[MjClient.GAME_TYPE.GUI_YANG_ZI_PAI] = "createNewPng/guiYangZiPai";
GameButton[MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE] = "createNewPng/niushibie_yueyang";
GameButton[MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI] = "createNewPng/damazi_zhuzhou";
GameButton[MjClient.GAME_TYPE.WU_XUE_510K] = "createNewPng/wuXue510k";
GameButton[MjClient.GAME_TYPE.CHONG_YANG_DA_GUN] = "createNewPng/chongYangDaGun";
GameButton[MjClient.GAME_TYPE.DA_YE_DA_GONG] = "createNewPng/daYeDaGong";
GameButton[MjClient.GAME_TYPE.TONG_SHAN_DA_GONG] = "createNewPng/tongShanDaGong";
GameButton[MjClient.GAME_TYPE.DA_YE_510K]    = "createNewPng/daYe510K";
GameButton[MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN]    = "createNewPng/daYeqj510K";
GameButton[MjClient.GAME_TYPE.QI_CHUN_DA_GONG]    = "createNewPng/qiChunDaGong";
GameButton[MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI] = "createNewPng/ningXiangPaoHuZi";
GameButton[MjClient.GAME_TYPE.NING_XIANG_KAI_WANG] = "createNewPng/ningxiangkaiwang";
GameButton[MjClient.GAME_TYPE.YUE_YANG_PENG_HU] = "createNewPng/pengHu";
if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP || 
    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP)
{
    GameButton[MjClient.GAME_TYPE.HY_LIU_HU_QIANG] = "createNewPng/hyliuhuqiang"; 
}else{
    GameButton[MjClient.GAME_TYPE.HY_LIU_HU_QIANG] = "createNewPng/liuhuqiang"; 
}

GameButton[MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU] = "createNewPng/yijiaolaiyou";
GameButton[MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU] = "createNewPng/yijiaolaiyou";
GameButton[MjClient.GAME_TYPE.CHUO_XIA_ZI] = "createNewPng/chuoxiazimj";
GameButton[MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ] = "createNewPng/hbjsmj";
GameButton[MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING] = "createNewPng/xgkwxmj";
GameButton[MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING] = "createNewPng/szkwxmj";
GameButton[MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN] = "createNewPng/dykkfmj";
GameButton[MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG] = "createNewPng/hzlzgmj";
GameButton[MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN] = "createNewPng/daZhaDan";
GameButton[MjClient.GAME_TYPE.YI_YANG_MA_JIANG]    = "createNewPng/yiyang";
GameButton[MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN]    = "createNewPng/ruanjiangqianfen";
GameButton[MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI] = "createNewPng/chenZhouMaoHuZi";
GameButton[MjClient.GAME_TYPE.XIANG_XI_2710] = "createNewPng/xiangxiRQS";
GameButton[MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI] = "createNewPng/changDePaoHuZi";
GameButton[MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI] = "createNewPng/yuanLingPHZ";
GameButton[MjClient.GAME_TYPE.ZP_LY_CHZ]  = "createNewPng/leiyang";
GameButton[MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI] = "createNewPng/hanShouPaoHuZi";
GameButton[MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI] = "createNewPng/yunchengfenghaozi";
GameButton[MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI] = "createNewPng/jishanniuyezi";
GameButton[MjClient.GAME_TYPE.PAO_HU_ZI_SR_King]  = "createNewPng/siwzuoxing";
GameButton[MjClient.GAME_TYPE.PAO_HU_ZI_King] = "createNewPng/siwang";
GameButton[MjClient.GAME_TYPE.PAO_HU_ZI_ER]  = "createNewPng/dantiao";
GameButton[MjClient.GAME_TYPE.PAO_HU_ZI_LR_King]  = "createNewPng/siwdantiao";
GameButton[MjClient.GAME_TYPE.HY_SHI_HU_KA]  = "createNewPng/hyshihuka";
GameButton[MjClient.GAME_TYPE.JIANG_YONG_15Z] = "createNewPng/jyshiwu";
GameButton[MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY] = "createNewPng/paodekuai_ty";
GameButton[MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG] = "createNewPng/wangdiao";
GameButton[MjClient.GAME_TYPE.YONG_ZHOU_MJ]  = "createNewPng/yongzhou";
GameButton[MjClient.GAME_TYPE.JIANG_HUA_MJ]  = "createNewPng/jianghua";
GameButton[MjClient.GAME_TYPE.DAO_ZHOU_MJ] = "createNewPng/daozhou";
GameButton[MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI]  = "createNewPng/xiangxiangphz";
GameButton[MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA]  = "createNewPng/loudifpf";
GameButton[MjClient.GAME_TYPE.HZMJ]  = "createNewPng/HZMJ";
GameButton[MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA] = "createNewPng/sandaha";
GameButton[MjClient.GAME_TYPE.LEI_YANG_GMJ] = "createNewPng/leiyangGMJ";
GameButton[MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG] = "createNewPng/tongyonghongzhong";
GameButton[MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG] = "createNewPng/shaoyangMJ";
GameButton[MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG] = "createNewPng/datongzi";
GameButton[MjClient.GAME_TYPE.SHAO_YANG_BO_PI] = "createNewPng/shaoyangBoPi";
GameButton[MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI] = "createNewPng/shaoyangZiPai";
GameButton[MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI]  = "createNewPng/xiangxiangghz";
GameButton[MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI]  = "createNewPng/hyshiwuhu";
GameButton[MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN]  = "createNewPng/huaihuahongguaiwan";
GameButton[MjClient.GAME_TYPE.HUAI_AN_DOU_DI_ZHU] = "res/createNewPng/doudizhuHuaiAn";


if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
    GameButton[MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA]  = "createNewPng/258mj";
else
    GameButton[MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA]  = "createNewPng/changsha";

GameButton[MjClient.GAME_TYPE.XIN_NING_MA_JIANG]  = "createNewPng/xinNingMJ";
GameButton[MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN]  = "createNewPng/longhuizhadan";
GameButton[MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO]  = "createNewPng/yongzhoulaochuo";
GameButton[MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI]  = "createNewPng/errenpaohuzi";
GameButton[MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA]  = "createNewPng/loudifpf";
GameButton[MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI]  = "createNewPng/xiangtanphz";
GameButton[MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI] = "createNewPng/ahPaoHuZi";
GameButton[MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA]  = "createNewPng/banbiantianzha";
GameButton[MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO] = "createNewPng/lengshuijiang";
GameButton[MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA] = "createNewPng/sandaha";
GameButton[MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA] = "createNewPng/hysandaha";
GameButton[MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA] = "createNewPng/hysandaha";
GameButton[MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA] = "createNewPng/xiangtansdha";
GameButton[MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG] = "createNewPng/huaihuamajiang";
GameButton[MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA]  = "createNewPng/hyfangpaofa";
GameButton[MjClient.GAME_TYPE.XIANG_SHUI_MJ] = "createNewPng/xiangshuiMJ";
GameButton[MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE] = "createNewPng/anxweimaque";
GameButton[MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ] = "createNewPng/guizhoupudingMJ";
GameButton[MjClient.GAME_TYPE.GUI_ZHOU_AN_SHUN_MJ] = "createNewPng/guizhouanshunMJ";
GameButton[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_LIANG_FANG] = "createNewPng/guizhousandingliangfangMJ";
GameButton[MjClient.GAME_TYPE.GUI_ZHOU_LIANG_DING_LIANG_FANG] = "createNewPng/guizhouliangdingliangfangMJ";
GameButton[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_GUAI] = "createNewPng/guizhousandingguaiMJ";
GameButton[MjClient.GAME_TYPE.GUI_ZHOU_ER_DING_GUAI] = "createNewPng/guizhouerdingguaiMJ";
GameButton[MjClient.GAME_TYPE.SAN_DA_HA_NEW] = "createNewPng/sanDaHaNew";
GameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_GZ] = "createNewPng/doudizhuGZ";
GameButton[MjClient.GAME_TYPE.GUI_ZHOU_XMY_GUI_YANG_ZHUO_JI] = "createNewPng/guizhouXMYGuiYangMJ";
GameButton[MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI] = "createNewPng/guizhouGuiYangMJ";
GameButton[MjClient.GAME_TYPE.GUI_ZHOU_MEN_HU_XUE_LIU] = "createNewPng/guizhouMenHuXueLiu";
GameButton[MjClient.GAME_TYPE.XIANG_XI_96POKER] = "createNewPng/96puke";
GameButton[MjClient.GAME_TYPE.XU_PU_LAO_PAI] = "createNewPng/xupulaopai";
GameButton[MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI] = "createNewPng/xupuphz";
GameButton[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ] = "createNewPng/erRenYiFang";
GameButton[MjClient.GAME_TYPE.DA_ZI_BO_PI] = "createNewPng/DaZiBoPi";
GameButton[MjClient.GAME_TYPE.HONG_ZE_MA_JIANG] = "createNewPng/hongzemajiang";
GameButton[MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN] = "createNewPng/ganDengYan";
GameButton[MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ] = "createNewPng/yiChangXueLiu";
GameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY] = "createNewPng/paodekuai_ty";

GameButton[MjClient.GAME_TYPE.EN_SHI_MA_JIANG] = "createNewPng/xiangyintuidaohu";
GameButton[MjClient.GAME_TYPE.DANG_YANG_FAN_JING] = "createNewPng/dangYangFanJing";
GameButton[MjClient.GAME_TYPE.DA_YE_ZI_PAI] = "createNewPng/dayeFanJing";
GameButton[MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG] = "createNewPng/jingZhouMaJiang";
GameButton[MjClient.GAME_TYPE.CHONG_YANG_MJ] = "createNewPng/chongYangMJ";
GameButton[MjClient.GAME_TYPE.QIAN_JIANG_HH_MJ] = "createNewPng/qianJiangMJ";
GameButton[MjClient.GAME_TYPE.HUANG_SHI_HH_MJ] = "createNewPng/huangShiHHMJ";
GameButton[MjClient.GAME_TYPE.QI_CHUN_HH_MJ] = "createNewPng/qiChunHHMJ";
GameButton[MjClient.GAME_TYPE.TONG_CHENG_MJ] = "createNewPng/tongChengMJ";
GameButton[MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN] = "createNewPng/yiChangShangDaRen";
GameButton[MjClient.GAME_TYPE.HU_BEI_HUA_PAI] = "createNewPng/huBeiHuaPai";
GameButton[MjClient.GAME_TYPE.YANG_XIN_MA_JIANG] = "createNewPng/yangxinmj";
GameButton[MjClient.GAME_TYPE.TONG_SHAN_HH_MJ] = "createNewPng/tongShanHuangHuang";
GameButton[MjClient.GAME_TYPE.JIANG_LING_HONGZHONG] = "createNewPng/jiangLingHongZhong";
GameButton[MjClient.GAME_TYPE.QI_CHUN_GD_MJ] = "createNewPng/qiChunGuangDong";
GameButton[MjClient.GAME_TYPE.SHI_SHOU_AI_HUANG] = "createNewPng/shiShouAiHuang";
GameButton[MjClient.GAME_TYPE.GONG_AN_HUA_PAI] = "createNewPng/gongAnHuaPai";
GameButton[MjClient.GAME_TYPE.WU_XUE_MJ] = "createNewPng/wuXueMJ";
GameButton[MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI] = "createNewPng/tongChengGeZiPai";
GameButton[MjClient.GAME_TYPE.QI_CHUN_HONG_ZHONG_GANG] = "createNewPng/qiChunGuangDongMJ";
GameButton[MjClient.GAME_TYPE.EN_SHI_SHAO_HU] = "createNewPng/enShiShaoHu";

var pkGameButton = {};
pkGameButton[MjClient.GAME_TYPE.LIAN_YUN_GANG] = "playground/xinpu";
pkGameButton[MjClient.GAME_TYPE.SHU_YANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.GUAN_YUN] = "playground/guanyun";
pkGameButton[MjClient.GAME_TYPE.DONG_HAI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.NAN_JING] = "playground/nanjing";
pkGameButton[MjClient.GAME_TYPE.SU_QIAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.NIU_NIU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HUAI_AN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HA_HONGZHONG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HA_14DUN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XU_ZHOU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_HU_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.SI_YANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIN_SI_YANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.SI_YANG_HH] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YAN_CHENG_HH] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.RU_GAO] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.GAN_YU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HUAI_AN_TTZ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.RU_GAO_MJH] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.QU_TANG_23_ZHANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HUAI_AN_CC] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HZ_TUI_DAO_HU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HUAI_AN_ERZ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.GUAN_NAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_DE_KUAI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_TY] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN] = "playground/shuyang"; 
pkGameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_JZ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_HA] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_LYG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_NT] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIN_PU_HZ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YZ_CHZTEST] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.LUO_DI_SAO] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_HU_ZI_SR] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_NT] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.NTHZ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.TONG_HUA] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.CHANG_SHA] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.CHANG_SHA_ER_REN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.LIAN_SHUI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.NING_XIANG_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.TY_HONGZHONG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.ML_HONGZHONG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.ML_HONGZHONG_ZERO] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.CHEN_ZHOU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YUAN_JIANG_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.NAN_XIAN_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.CHAO_GU_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HUAI_AN_DOU_DI_ZHU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_TY] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_QC] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.WU_XUE_GE_BAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DIAN_TUO] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_JZ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_DA_TONG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.TY_ZHUANZHUAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.SAN_DA_HA] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.LV_LIANG_DA_QI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.BAI_PU_LIN_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HAI_AN_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XUE_ZHAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XUE_LIU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HAI_AN_BAI_DA] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.JIN_ZHONG_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_HA] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.JIN_ZHONG_KD] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HE_JIN_KUN_JIN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.LV_LIANG_MA_JIANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.ZHUO_HAO_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.RU_GAO_ER] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.LING_SHI_BIAN_LONG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.LING_SHI_BAN_MO] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PING_YAO_KOU_DIAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PING_YAO_MA_JIANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.SHOU_YANG_QUE_KA] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.JIN_ZHONG_LI_SI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HONG_TONG_WANG_PAI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.FEN_XI_YING_KOU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.ML_HONG_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.FEN_YANG_QUE_MEN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.JING_LE_KOU_DIAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DA_TONG_GUAI_SAN_JIAO] = "playground/datongguaisanjiao";
pkGameButton[MjClient.GAME_TYPE.LUAN_GUA_FENG] = "playground/luanguafeng";
pkGameButton[MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.FAN_SHI_XIA_YU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.WU_TAI_KOU_DIAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.AN_HUA_MA_JIANG]    = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.GUI_YANG_ZI_PAI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.NING_XIANG_KAI_WANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YUE_YANG_PENG_HU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HY_LIU_HU_QIANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.CHUO_XIA_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YI_YANG_MA_JIANG]    = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.WU_XUE_510K] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.CHONG_YANG_DA_GUN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DA_YE_DA_GONG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.TONG_SHAN_DA_GONG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DA_YE_510K] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.QI_CHUN_DA_GONG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIANG_XI_2710] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.ZP_LY_CHZ]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_HU_ZI_SR_King]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_HU_ZI_King]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_HU_ZI_ER]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HY_SHI_HU_KA]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.JIANG_YONG_15Z] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YONG_ZHOU_MJ]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.JIANG_HUA_MJ]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DAO_ZHOU_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HZMJ]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.LEI_YANG_GMJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.SHAO_YANG_BO_PI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIN_NING_MA_JIANG]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO]  = "createNewPng/shuyang";
pkGameButton[MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA]  = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIANG_SHUI_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.GUI_ZHOU_AN_SHUN_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_LIANG_FANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.GUI_ZHOU_LIANG_DING_LIANG_FANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_GUAI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.GUI_ZHOU_ER_DING_GUAI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.SAN_DA_HA_NEW] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DOU_DI_ZHU_GZ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.GUI_ZHOU_XMY_GUI_YANG_ZHUO_JI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.GUI_ZHOU_MEN_HU_XUE_LIU] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XIANG_XI_96POKER] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XU_PU_LAO_PAI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DA_ZI_BO_PI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HONG_ZE_MA_JIANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY] = "playground/shuyang";

pkGameButton[MjClient.GAME_TYPE.EN_SHI_MA_JIANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DANG_YANG_FAN_JING] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.DA_YE_ZI_PAI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.CHONG_YANG_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.QIAN_JIANG_HH_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HUANG_SHI_HH_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.QI_CHUN_HH_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.TONG_CHENG_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.HU_BEI_HUA_PAI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.YANG_XIN_MA_JIANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.TONG_SHAN_HH_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.JIANG_LING_HONGZHONG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.QI_CHUN_GD_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.SHI_SHOU_AI_HUANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.GONG_AN_HUA_PAI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.WU_XUE_MJ] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.QI_CHUN_HONG_ZHONG_GANG] = "playground/shuyang";
pkGameButton[MjClient.GAME_TYPE.EN_SHI_SHAO_HU] = "playground/shuyang";

var GameSound4Chat = {};
GameSound4Chat[MjClient.GAME_TYPE.LIAN_YUN_GANG] = ["lyg/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.GUAN_YUN] = ["lyg/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.GUAN_NAN] = ["guannan/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DONG_HAI] = ["lyg/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.SHU_YANG] = ["shuyang/boy_0/fix_msg_", "shuyang/boy_1/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.NAN_JING] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.SU_QIAN] = ["suqian/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.NIU_NIU] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat["normal"] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HA_14DUN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HA_HONGZHONG] = ["huaian/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HUAI_AN] = ["huaian/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XU_ZHOU] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.SI_YANG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XIN_SI_YANG] = ["xinsiyang/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.SI_YANG_HH] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YAN_CHENG_HH] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.RU_GAO] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.GAN_YU] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.CHAO_GU_MJ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HUAI_AN_TTZ] = ["huaian/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.RU_GAO_MJH] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.QU_TANG_23_ZHANG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HUAI_AN_CC] = ["huaian/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HZ_TUI_DAO_HU] = ["huaian/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HUAI_AN_ERZ] = ["huaian/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.PAO_DE_KUAI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.RU_GAO_ER] = ["normal/fix_msg/nv/fix_msg_"];
if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
    MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
    MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
    GameSound4Chat[MjClient.GAME_TYPE.PAO_DE_KUAI_TY] = ["local/fix_msg/nv/fix_msg_"];
    GameSound4Chat[MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN] = ["local/fix_msg/nv/fix_msg_"];
} 
else{
    GameSound4Chat[MjClient.GAME_TYPE.PAO_DE_KUAI_TY] = ["normal/fix_msg/nv/fix_msg_"];
    GameSound4Chat[MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN] = ["normal/fix_msg/nv/fix_msg_"];
}
GameSound4Chat[MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.PAO_DE_KUAI_HA] = ["huaian/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW] = ["huaian/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.PAO_DE_KUAI_LYG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.PAO_DE_KUAI_NT] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.PAO_DE_KUAI_JZ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XIN_PU_HZ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YZ_CHZTEST] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DOU_DI_ZHU_NT] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.NTHZ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.TONG_HUA] = ["normal/fix_msg/nv/fix_msg_"];
if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP){
    GameSound4Chat[MjClient.GAME_TYPE.CHANG_SHA] = ["local/fix_msg/nv/fix_msg_"];
}else{
    GameSound4Chat[MjClient.GAME_TYPE.CHANG_SHA]  = ["changsha/fix_msg/nv/fix_msg_"];
}
GameSound4Chat[MjClient.GAME_TYPE.WU_XUE_GE_BAN] = ["local/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.NING_XIANG_MJ] = ["local/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU] = ["local/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO] = ["local/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.LIAN_SHUI] = ["huaian/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.TY_HONGZHONG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.ML_HONGZHONG] = ["local/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.ML_HONGZHONG_ZERO] = ["local/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.CHEN_ZHOU] = ["local/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YUAN_JIANG_MJ] = ["local/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.NAN_XIAN_MJ] = ["local/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI] = ["local/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DOU_DI_ZHU_HA] = ["normal/fix_msg/nv/fix_msg_"];
if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
    MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  ||
    MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
    {
        GameSound4Chat[MjClient.GAME_TYPE.DOU_DI_ZHU_TY] = ["local/fix_msg/nv/fix_msg_"];
        GameSound4Chat[MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY] = ["local/fix_msg/nv/fix_msg_"];
        GameSound4Chat[MjClient.GAME_TYPE.DOU_DI_ZHU_QC] = ["local/fix_msg/nv/fix_msg_"];
    }
else
    GameSound4Chat[MjClient.GAME_TYPE.DOU_DI_ZHU_TY] = ["fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DIAN_TUO] = ["diantuo/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DOU_DI_ZHU_JZ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DOU_DI_ZHU_DA_TONG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.TY_ZHUANZHUAN] = ["normal/fix_msg/nv/fix_msg_"];
if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
    GameSound4Chat[MjClient.GAME_TYPE.TY_ZHUANZHUAN] = ["new_fix_msg/nv/fix_msg_"];
}

GameSound4Chat[MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI] = ["normal/fix_msg/nv/fix_msg_"]; 
GameSound4Chat[MjClient.GAME_TYPE.SAN_DA_HA] = ["local/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO] = ["local/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.LV_LIANG_DA_QI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.BAI_PU_LIN_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HAI_AN_MJ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XUE_ZHAN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XUE_LIU] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HAI_AN_BAI_DA] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.JIN_ZHONG_MJ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.JIN_ZHONG_KD] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HE_JIN_KUN_JIN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.LV_LIANG_MA_JIANG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.ZHUO_HAO_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.LING_SHI_BIAN_LONG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.LING_SHI_BAN_MO] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.PING_YAO_KOU_DIAN] = ["pingyao/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.PING_YAO_MA_JIANG] = ["pingyao/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3] = ["normal/fix_msg/nv/fix_msg_"]; //TODO
GameSound4Chat[MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN] = ["normal/fix_msg/nv/fix_msg_"]; //TODO
GameSound4Chat[MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.SHOU_YANG_QUE_KA] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.JIN_ZHONG_LI_SI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HONG_TONG_WANG_PAI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.FEN_XI_YING_KOU] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.ML_HONG_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.FEN_YANG_QUE_MEN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.JING_LE_KOU_DIAN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DA_TONG_GUAI_SAN_JIAO] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.LUAN_GUA_FENG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.FAN_SHI_XIA_YU] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG] = ["local/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA] = ["local/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.WU_TAI_KOU_DIAN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DA_NING_SHUAI_JIN]  = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI] = ["anhua/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.AN_HUA_MA_JIANG]    = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG] = ["local_taojiang/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.GUI_YANG_ZI_PAI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE] = ["niushibie/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI] = ["damazi/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.WU_XUE_510K] = ["damazi/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.CHONG_YANG_DA_GUN] = ["damazi/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DA_YE_DA_GONG] = ["damazi/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.TONG_SHAN_DA_GONG] = ["damazi/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DA_YE_510K]   = ["damazi/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN] = ["damazi/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.QI_CHUN_DA_GONG]   = ["damazi/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.NING_XIANG_KAI_WANG] = ["normal/fix_msg/nv/fix_msg_"];
if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
    GameSound4Chat[MjClient.GAME_TYPE.YUE_YANG_PENG_HU] = ["fix_msg/nv/fix_msg_"];
}else{
    GameSound4Chat[MjClient.GAME_TYPE.YUE_YANG_PENG_HU] = ["normal/fix_msg/nv/fix_msg_"];
}
GameSound4Chat[MjClient.GAME_TYPE.HY_LIU_HU_QIANG]  = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING]  = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING]  = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.CHUO_XIA_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YI_YANG_MA_JIANG] = ["local_yiyang/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XIANG_XI_2710] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.ZP_LY_CHZ]  = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HY_SHI_HU_KA]  = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DAO_ZHOU_MJ]  = ["daozhou/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA]  = ["xxGaoHuZi/nv/normal/fix_msg/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA]  = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HZMJ]  = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA]  = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA]  = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA]  = ["local/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.LEI_YANG_GMJ]  = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG] = ["datongzi/chat/nv/chatMsg"];
GameSound4Chat[MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA] = ["fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI] = ["anhua/fix_msg/nv/fix_msg_"];
if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
    GameSound4Chat[MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI] = ["fix_msg/nv/fix_msg_"];
else
    GameSound4Chat[MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN] = ["fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO] = ["fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XIN_NING_MA_JIANG] = ["fix_msg/nv/fix_msg_"];
if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
    GameSound4Chat[MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA]  = ["normal/fix_msg/nv/fix_msg_"];
else
    GameSound4Chat[MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA]  = ["changsha/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XIANG_SHUI_MJ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI]  = ["fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.LUO_DI_SAO]  = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI_SR]  = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI_SR_King]  = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI_King]  = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI_ER]  = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI_LR_King]  = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];

if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
    GameSound4Chat[MjClient.GAME_TYPE.JIANG_YONG_15Z] = GameSound4Chat[MjClient.GAME_TYPE.XIANG_XI_2710];
    GameSound4Chat[MjClient.GAME_TYPE.LUO_DI_SAO]  = GameSound4Chat[MjClient.GAME_TYPE.XIANG_XI_2710];

}
else{
    GameSound4Chat[MjClient.GAME_TYPE.JIANG_YONG_15Z] = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
    GameSound4Chat[MjClient.GAME_TYPE.LUO_DI_SAO]  = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
}

GameSound4Chat[MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY]  = ["normal/fix_msg/nv/fix_msg_"];
if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
    GameSound4Chat[MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY] = ["fix_msg/nv/fix_msg_"];
}
GameSound4Chat[MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG]   = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.YONG_ZHOU_MJ]  = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.JIANG_HUA_MJ]  = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG]  = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG]  = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG]   = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.SHAO_YANG_BO_PI] = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI] = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA] = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN]  = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO] = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI]  = ["xxGaoHuZi/nv/normal/fix_msg/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI]  = GameSound4Chat[MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI]  = GameSound4Chat[MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI]  = ["15hu/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA] = GameSound4Chat[MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI];
GameSound4Chat[MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA]  = ["xxGaoHuZi/nv/normal/fix_msg/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE]  = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.GUI_ZHOU_AN_SHUN_MJ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_LIANG_FANG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.GUI_ZHOU_LIANG_DING_LIANG_FANG] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_GUAI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.GUI_ZHOU_ER_DING_GUAI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HUAI_AN_DOU_DI_ZHU] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.SAN_DA_HA_NEW] = ["local/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DOU_DI_ZHU_GZ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.GUI_ZHOU_XMY_GUI_YANG_ZHUO_JI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.GUI_ZHOU_MEN_HU_XUE_LIU] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XIANG_XI_96POKER] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XU_PU_LAO_PAI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DA_ZI_BO_PI] = GameSound4Chat[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Chat[MjClient.GAME_TYPE.HONG_ZE_MA_JIANG] = GameSound4Chat[MjClient.GAME_TYPE.HA_HONGZHONG];
GameSound4Chat[MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY] = ["normal/fix_msg/nv/fix_msg_"];

GameSound4Chat[MjClient.GAME_TYPE.EN_SHI_MA_JIANG] = GameSound4Chat[MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU];
GameSound4Chat[MjClient.GAME_TYPE.DANG_YANG_FAN_JING] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.DA_YE_ZI_PAI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG] = GameSound4Chat[MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG];
GameSound4Chat[MjClient.GAME_TYPE.CHONG_YANG_MJ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.QIAN_JIANG_HH_MJ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.WU_XUE_MJ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HUANG_SHI_HH_MJ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.QI_CHUN_HH_MJ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.TONG_CHENG_MJ] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.HU_BEI_HUA_PAI] = ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.YANG_XIN_MA_JIANG] = GameSound4Chat[MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU];
GameSound4Chat[MjClient.GAME_TYPE.TONG_SHAN_HH_MJ] =  ["normal/fix_msg/nv/fix_msg_"];
GameSound4Chat[MjClient.GAME_TYPE.JIANG_LING_HONGZHONG] = GameSound4Chat[MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU];
GameSound4Chat[MjClient.GAME_TYPE.QI_CHUN_GD_MJ] = GameSound4Chat[MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU];
GameSound4Chat[MjClient.GAME_TYPE.SHI_SHOU_AI_HUANG] = GameSound4Chat[MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU];
GameSound4Chat[MjClient.GAME_TYPE.GONG_AN_HUA_PAI] = GameSound4Chat[MjClient.GAME_TYPE.HU_BEI_HUA_PAI];
GameSound4Chat[MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI] = GameSound4Chat[MjClient.GAME_TYPE.HU_BEI_HUA_PAI];
GameSound4Chat[MjClient.GAME_TYPE.QI_CHUN_HONG_ZHONG_GANG] = GameSound4Chat[MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU];
GameSound4Chat[MjClient.GAME_TYPE.EN_SHI_SHAO_HU] = GameSound4Chat[MjClient.GAME_TYPE.HU_BEI_HUA_PAI];

var GameSound4Play = {};
GameSound4Play[MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA]  = {
    1:["xxGaoHuZi/nv/normal/1"],
    2:["xxGaoHuZi/nv/normal/2"],
    3:["xxGaoHuZi/nv/normal/3"],
    4:["xxGaoHuZi/nv/normal/4"],
    5:["xxGaoHuZi/nv/normal/5"],
    6:["xxGaoHuZi/nv/normal/6"],
    7:["xxGaoHuZi/nv/normal/7"],
    8:["xxGaoHuZi/nv/normal/8"],
    9:["xxGaoHuZi/nv/normal/9"],
    10:["xxGaoHuZi/nv/normal/10"],
    21:["xxGaoHuZi/nv/normal/21"],
    22:["xxGaoHuZi/nv/normal/22"],
    23:["xxGaoHuZi/nv/normal/23"],
    24:["xxGaoHuZi/nv/normal/24"],
    25:["xxGaoHuZi/nv/normal/25"],
    26:["xxGaoHuZi/nv/normal/26"],
    27:["xxGaoHuZi/nv/normal/27"],
    28:["xxGaoHuZi/nv/normal/28"],
    29:["xxGaoHuZi/nv/normal/29"],
    30:["xxGaoHuZi/nv/normal/30"],
    91:["xxGaoHuZi/nv/normal/91"],
    bi:["xxGaoHuZi/nv/normal/bi"],
    chi:["xxGaoHuZi/nv/normal/chi"],
    wei:["xxGaoHuZi/nv/normal/wei"],
    chouwei:["xxGaoHuZi/nv/normal/chouwei"],
    zimo:["xxGaoHuZi/nv/normal/zimo"],
    fangpao:["xxGaoHuZi/nv/normal/fangpao"],
    pao:["xxGaoHuZi/nv/normal/pao"],
    peng:["xxGaoHuZi/nv/normal/peng"],
    ti:["xxGaoHuZi/nv/normal/ti"],
};
GameSound4Play[MjClient.GAME_TYPE.ZP_LY_CHZ]  = {
    1:["leiyang/nv/1"],
    2:["leiyang/nv/2"],
    3:["leiyang/nv/3"],
    4:["leiyang/nv/4"],
    5:["leiyang/nv/5"],
    6:["leiyang/nv/6"],
    7:["leiyang/nv/7"],
    8:["leiyang/nv/8"],
    9:["leiyang/nv/9"],
    10:["leiyang/nv/10"],
    21:["leiyang/nv/21"],
    22:["leiyang/nv/22"],
    23:["leiyang/nv/23"],
    24:["leiyang/nv/24"],
    25:["leiyang/nv/25"],
    26:["leiyang/nv/26"],
    27:["leiyang/nv/27"],
    28:["leiyang/nv/28"],
    29:["leiyang/nv/29"],
    30:["leiyang/nv/30"],
    91:["leiyang/nv/91"],
    bi:["leiyang/nv/bi"],
    chi:["leiyang/nv/chi"],
    wei:["leiyang/nv/wei"],
    chouwei:["leiyang/nv/chouwei"],
    zimo:["leiyang/nv/zimo"],
    fangpao:["leiyang/nv/fangpao"],
    pao:["leiyang/nv/pao"],
    peng:["leiyang/nv/peng"],
    ti:["leiyang/nv/ti"],
    wangchuang:["leiyang/nv/wangchuang"],
    wangdiao:["leiyang/nv/wangdiao"],
    wangzha:["leiyang/nv/ww_v_wz"],
};

GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_TTZ] = {
    1: ["huaian/nv/1"],
    2: ["huaian/nv/2"],
    3: ["huaian/nv/3"],
    4: ["huaian/nv/4"],
    5: ["huaian/nv/5"],
    6: ["huaian/nv/6"],
    7: ["huaian/nv/7"],
    8: ["huaian/nv/8"],
    9: ["huaian/nv/9"],
    11: ["huaian/nv/11"],
    12: ["huaian/nv/12"],
    13: ["huaian/nv/13"],
    14: ["huaian/nv/14"],
    15: ["huaian/nv/15"],
    16: ["huaian/nv/16"],
    17: ["huaian/nv/17"],
    18: ["huaian/nv/18"],
    19: ["huaian/nv/19"],
    21: ["huaian/nv/21"],
    22: ["huaian/nv/22"],
    23: ["huaian/nv/23"],
    24: ["huaian/nv/24"],
    25: ["huaian/nv/25"],
    26: ["huaian/nv/26"],
    27: ["huaian/nv/27"],
    28: ["huaian/nv/28"],
    29: ["huaian/nv/29"],
    31: ["huaian/nv/31"],
    41: ["huaian/nv/41"],
    51: ["huaian/nv/51"],
    61: ["huaian/nv/61"],
    71: ["huaian/nv/71"],
    81: ["huaian/nv/81"],
    91: ["huaian/nv/91"],
    chi: ["huaian/nv/chi"],
    fangpao: ["huaian/nv/fangpao"],
    flower: ["huaian/nv/flower"],
    gang: ["huaian/nv/gang"],
    hu: ["huaian/nv/hu"],
    peng: ["huaian/nv/peng"],
    ting: ["huaian/nv/ting"],
    zimo: ["huaian/nv/zimo"]
};

GameSound4Play[MjClient.GAME_TYPE.CHAO_GU_MJ] = {
    1: ["chaogu/nv/1"],
    2: ["chaogu/nv/2"],
    3: ["chaogu/nv/3"],
    4: ["chaogu/nv/4"],
    5: ["chaogu/nv/5"],
    6: ["chaogu/nv/6"],
    7: ["chaogu/nv/7"],
    8: ["chaogu/nv/8"],
    9: ["chaogu/nv/9"],
    11: ["chaogu/nv/11"],
    12: ["chaogu/nv/12"],
    13: ["chaogu/nv/13"],
    14: ["chaogu/nv/14"],
    15: ["chaogu/nv/15"],
    16: ["chaogu/nv/16"],
    17: ["chaogu/nv/17"],
    18: ["chaogu/nv/18"],
    19: ["chaogu/nv/19"],
    21: ["chaogu/nv/21"],
    22: ["chaogu/nv/22"],
    23: ["chaogu/nv/23"],
    24: ["chaogu/nv/24"],
    25: ["chaogu/nv/25"],
    26: ["chaogu/nv/26"],
    27: ["chaogu/nv/27"],
    28: ["chaogu/nv/28"],
    29: ["chaogu/nv/29"],
    gang: ["chaogu/nv/gang"],
    hu: ["chaogu/nv/hu"],
    peng: ["chaogu/nv/peng"],
    zimo: ["chaogu/nv/zimo"],
    qiangganghu: ["chaogu/nv/type_2"],
    gangshanghua: ["chaogu/nv/type_1"],
    gangshangpao: ["chaogu/nv/type_3"],
};

GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_CC] = GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_TTZ];
GameSound4Play[MjClient.GAME_TYPE.HZ_TUI_DAO_HU] = GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_TTZ];
GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_ERZ] = GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_TTZ];
GameSound4Play[MjClient.GAME_TYPE.HUAI_AN] = GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_TTZ];
GameSound4Play[MjClient.GAME_TYPE.HA_HONGZHONG] = GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_TTZ];
GameSound4Play[MjClient.GAME_TYPE.LIAN_SHUI] = GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_TTZ];
GameSound4Play[MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG]  = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.LIAN_YUN_GANG] = {
    1: ["lyg/nv/1"],
    2: ["lyg/nv/2"],
    3: ["lyg/nv/3"],
    4: ["lyg/nv/4"],
    5: ["lyg/nv/5"],
    6: ["lyg/nv/6"],
    7: ["lyg/nv/7"],
    8: ["lyg/nv/8"],
    9: ["lyg/nv/9"],
    11: ["lyg/nv/11"],
    12: ["lyg/nv/12"],
    13: ["lyg/nv/13"],
    14: ["lyg/nv/14"],
    15: ["lyg/nv/15"],
    16: ["lyg/nv/16"],
    17: ["lyg/nv/17"],
    18: ["lyg/nv/18"],
    19: ["lyg/nv/19"],
    21: ["lyg/nv/21"],
    22: ["lyg/nv/22"],
    23: ["lyg/nv/23"],
    24: ["lyg/nv/24"],
    25: ["lyg/nv/25"],
    26: ["lyg/nv/26"],
    27: ["lyg/nv/27"],
    28: ["lyg/nv/28"],
    29: ["lyg/nv/29"],
    31: ["lyg/nv/31_0", "lyg/nv/31_1"],
    41: ["lyg/nv/41"],
    51: ["lyg/nv/51_0", "lyg/nv/51_1"],
    61: ["lyg/nv/61"],
    71: ["lyg/nv/71"],
    81: ["lyg/nv/81_0", "lyg/nv/81_1"],
    91: ["lyg/nv/91_0", "lyg/nv/91_1"],
    anGang: ["lyg/nv/anGang"],
    chi: ["lyg/nv/chi_0", "lyg/nv/chi_1"],
    fangpao: ["lyg/nv/fangpao_0", "lyg/nv/fangpao_1"],
    flower: ["lyg/nv/flower"],
    gang: ["lyg/nv/gang"],
    hu: ["lyg/nv/hu"],
    peng: ["lyg/nv/peng_0", "lyg/nv/peng_1"],
    ting: ["lyg/nv/ting_0", "lyg/nv/ting_1", "lyg/nv/ting_2"],
    zimo: ["lyg/nv/zimo_0", "lyg/nv/zimo_1"]
};
GameSound4Play[MjClient.GAME_TYPE.GUAN_YUN] = GameSound4Play[MjClient.GAME_TYPE.LIAN_YUN_GANG];
GameSound4Play[MjClient.GAME_TYPE.GUAN_NAN] = GameSound4Play[MjClient.GAME_TYPE.LIAN_YUN_GANG];
GameSound4Play[MjClient.GAME_TYPE.DONG_HAI] = GameSound4Play[MjClient.GAME_TYPE.LIAN_YUN_GANG];
GameSound4Play[MjClient.GAME_TYPE.SHU_YANG] = {
    1: ["shuyang/boy_0/nv/1", "shuyang/boy_1/nv/1"],
    2: ["shuyang/boy_0/nv/2", "shuyang/boy_1/nv/2"],
    3: ["shuyang/boy_0/nv/3", "shuyang/boy_1/nv/3"],
    4: ["shuyang/boy_0/nv/4", "shuyang/boy_1/nv/4"],
    5: ["shuyang/boy_0/nv/5", "shuyang/boy_1/nv/5"],
    6: ["shuyang/boy_0/nv/6", "shuyang/boy_1/nv/6"],
    7: ["shuyang/boy_0/nv/7", "shuyang/boy_1/nv/7"],
    8: ["shuyang/boy_0/nv/8", "shuyang/boy_1/nv/8"],
    9: ["shuyang/boy_0/nv/9", "shuyang/boy_1/nv/9"],
    11: ["shuyang/boy_0/nv/11", "shuyang/boy_1/nv/11"],
    12: ["shuyang/boy_0/nv/12", "shuyang/boy_1/nv/12"],
    13: ["shuyang/boy_0/nv/13", "shuyang/boy_1/nv/13"],
    14: ["shuyang/boy_0/nv/14", "shuyang/boy_1/nv/14"],
    15: ["shuyang/boy_0/nv/15", "shuyang/boy_1/nv/15"],
    16: ["shuyang/boy_0/nv/16", "shuyang/boy_1/nv/16"],
    17: ["shuyang/boy_0/nv/17", "shuyang/boy_1/nv/17"],
    18: ["shuyang/boy_0/nv/18", "shuyang/boy_1/nv/18"],
    19: ["shuyang/boy_0/nv/19", "shuyang/boy_1/nv/19"],
    21: ["shuyang/boy_0/nv/21", "shuyang/boy_1/nv/21"],
    22: ["shuyang/boy_0/nv/22", "shuyang/boy_1/nv/22"],
    23: ["shuyang/boy_0/nv/23", "shuyang/boy_1/nv/23"],
    24: ["shuyang/boy_0/nv/24", "shuyang/boy_1/nv/24"],
    25: ["shuyang/boy_0/nv/25", "shuyang/boy_1/nv/25"],
    26: ["shuyang/boy_0/nv/26", "shuyang/boy_1/nv/26"],
    27: ["shuyang/boy_0/nv/27", "shuyang/boy_1/nv/27"],
    28: ["shuyang/boy_0/nv/28", "shuyang/boy_1/nv/28"],
    29: ["shuyang/boy_0/nv/29", "shuyang/boy_1/nv/29"],
    31: ["shuyang/boy_0/nv/31", "shuyang/boy_1/nv/31"],
    41: ["shuyang/boy_0/nv/41", "shuyang/boy_1/nv/41"],
    51: ["shuyang/boy_0/nv/51", "shuyang/boy_1/nv/51"],
    61: ["shuyang/boy_0/nv/61", "shuyang/boy_1/nv/61"],
    71: ["shuyang/boy_0/nv/71", "shuyang/boy_1/nv/71"],
    81: ["shuyang/boy_0/nv/81", "shuyang/boy_1/nv/81"],
    91: ["shuyang/boy_0/nv/91", "shuyang/boy_1/nv/91"],
    anGang: ["shuyang/boy_0/nv/gang", "shuyang/boy_1/nv/gang"],
    chi: ["shuyang/boy_0/nv/chi", "shuyang/boy_1/nv/chi"],
    fangpao: ["shuyang/boy_0/nv/fangpao", "shuyang/boy_1/nv/fangpao"],
    flower: ["shuyang/boy_0/nv/flower", "shuyang/boy_1/nv/flower"],
    gang: ["shuyang/boy_0/nv/gang", "shuyang/boy_1/nv/gang"],
    hu: ["shuyang/boy_0/nv/hu", "shuyang/boy_1/nv/hu"],
    peng: ["shuyang/boy_0/nv/peng", "shuyang/boy_1/nv/peng"],
    ting: ["shuyang/boy_0/nv/ting", "shuyang/boy_1/nv/ting"],
    zimo: ["shuyang/boy_0/nv/zimo", "shuyang/boy_1/nv/zimo"]
};
GameSound4Play[MjClient.GAME_TYPE.NIU_NIU] = {
    0: ["niuniu/nv/bull0"],
    1: ["niuniu/nv/bull1"],
    2: ["niuniu/nv/bull2"],
    3: ["niuniu/nv/bull3"],
    4: ["niuniu/nv/bull4"],
    5: ["niuniu/nv/bull5"],
    6: ["niuniu/nv/bull6"],
    7: ["niuniu/nv/bull7"],
    8: ["niuniu/nv/bull8"],
    9: ["niuniu/nv/bull9"],
    10: ["niuniu/nv/bull10"],
    11: ["niuniu/nv/bull11"],
    12: ["niuniu/nv/bull12"],
    betChip: ["niuniu/nv/betChip"],
    clickCard: ["niuniu/nv/clickCard"],
    complete: ["niuniu/nv/complete"],
    flyMoney: ["niuniu/nv/flyMoney"],
    gameStart: ["niuniu/nv/gameStart"]
};
GameSound4Play[MjClient.GAME_TYPE.XIANG_SHUI_MJ] = 
{
    1: ["xiangshui/nv/1"],
    2: ["xiangshui/nv/2"],
    3: ["xiangshui/nv/3"],
    4: ["xiangshui/nv/4"],
    5: ["xiangshui/nv/5"],
    6: ["xiangshui/nv/6"],
    7: ["xiangshui/nv/7"],
    8: ["xiangshui/nv/8"],
    9: ["xiangshui/nv/9"],
    11: ["xiangshui/nv/11"],
    12: ["xiangshui/nv/12"],
    13: ["xiangshui/nv/13"],
    14: ["xiangshui/nv/14"],
    15: ["xiangshui/nv/15"],
    16: ["xiangshui/nv/16"],
    17: ["xiangshui/nv/17"],
    18: ["xiangshui/nv/18"],
    19: ["xiangshui/nv/19"],
    21: ["xiangshui/nv/21"],
    22: ["xiangshui/nv/22"],
    23: ["xiangshui/nv/23"],
    24: ["xiangshui/nv/24"],
    25: ["xiangshui/nv/25"],
    26: ["xiangshui/nv/26"],
    27: ["xiangshui/nv/27"],
    28: ["xiangshui/nv/28"],
    29: ["xiangshui/nv/29"],
    fangpao: ["xiangshui/nv/hu"],
    flower: ["xiangshui/nv/flower"],
    gang: ["xiangshui/nv/gang"],
    hu: ["xiangshui/nv/hu"],
    peng: ["xiangshui/nv/peng"],
    ting: ["xiangshui/nv/ting"],
    zimo: ["xiangshui/nv/zimo"]
}
GameSound4Play["normal"] = {
    1: ["normal/nv/1"],
    2: ["normal/nv/2"],
    3: ["normal/nv/3"],
    4: ["normal/nv/4"],
    5: ["normal/nv/5"],
    6: ["normal/nv/6"],
    7: ["normal/nv/7"],
    8: ["normal/nv/8"],
    9: ["normal/nv/9"],
    11: ["normal/nv/11"],
    12: ["normal/nv/12"],
    13: ["normal/nv/13"],
    14: ["normal/nv/14"],
    15: ["normal/nv/15"],
    16: ["normal/nv/16"],
    17: ["normal/nv/17"],
    18: ["normal/nv/18"],
    19: ["normal/nv/19"],
    21: ["normal/nv/21"],
    22: ["normal/nv/22"],
    23: ["normal/nv/23"],
    24: ["normal/nv/24"],
    25: ["normal/nv/25"],
    26: ["normal/nv/26"],
    27: ["normal/nv/27"],
    28: ["normal/nv/28"],
    29: ["normal/nv/29"],
    31: ["normal/nv/31"],
    41: ["normal/nv/41"],
    51: ["normal/nv/51"],
    61: ["normal/nv/61"],
    71: ["normal/nv/71"],
    81: ["normal/nv/81"],
    91: ["normal/nv/91"],
    anGang: ["normal/nv/gang"],
    kaiGang: ["normal/nv/gang"],
    chi: ["normal/nv/chi"],
    fangpao: ["normal/nv/fangpao"],
    flower: ["normal/nv/flower"],
    gang: ["normal/nv/gang"],
    gangshangkaihua: ["normal/nv/gangshangkaihua"],
    hu: ["normal/nv/hu"],
    peng: ["normal/nv/peng"],
    ting: ["normal/nv/ting"],
    zimo: ["normal/nv/zimo"],
    long: ["normal/nv/long"],
    shangjin: ["normal/nv/shangjin"],
    qinghu: ["normal/nv/qinghu"],
    quanhun: ["normal/nv/quanhun"],
    jiabei:["normal/nv/jiabei"],
    bujiabei:["normal/nv/bujiabei"]
};
GameSound4Play[MjClient.GAME_TYPE.XIN_NING_MA_JIANG] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.YONG_ZHOU_MJ]  = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.JIANG_HUA_MJ]  = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.HA_14DUN] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.HZMJ]  = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.XIN_PU_HZ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.NTHZ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.LEI_YANG_GMJ]  = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.TY_ZHUANZHUAN] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.TY_HONGZHONG] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.NING_XIANG_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.AN_HUA_MA_JIANG]    = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.NING_XIANG_KAI_WANG] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG]  = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG]  = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.YUAN_JIANG_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.SI_YANG] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.TONG_CHENG_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.XIN_SI_YANG] = {
    1: ["xinsiyang/nv/1"],
    2: ["xinsiyang/nv/2"],
    3: ["xinsiyang/nv/3"],
    4: ["xinsiyang/nv/4"],
    5: ["xinsiyang/nv/5"],
    6: ["xinsiyang/nv/6"],
    7: ["xinsiyang/nv/7"],
    8: ["xinsiyang/nv/8"],
    9: ["xinsiyang/nv/9"],
    11: ["xinsiyang/nv/11"],
    12: ["xinsiyang/nv/12"],
    13: ["xinsiyang/nv/13"],
    14: ["xinsiyang/nv/14"],
    15: ["xinsiyang/nv/15"],
    16: ["xinsiyang/nv/16"],
    17: ["xinsiyang/nv/17"],
    18: ["xinsiyang/nv/18"],
    19: ["xinsiyang/nv/19"],
    21: ["xinsiyang/nv/21"],
    22: ["xinsiyang/nv/22"],
    23: ["xinsiyang/nv/23"],
    24: ["xinsiyang/nv/24"],
    25: ["xinsiyang/nv/25"],
    26: ["xinsiyang/nv/26"],
    27: ["xinsiyang/nv/27"],
    28: ["xinsiyang/nv/28"],
    29: ["xinsiyang/nv/29"],
    31: ["xinsiyang/nv/31"],
    41: ["xinsiyang/nv/41"],
    51: ["xinsiyang/nv/51"],
    61: ["xinsiyang/nv/61"],
    71: ["xinsiyang/nv/71"],
    81: ["xinsiyang/nv/81"],
    91: ["xinsiyang/nv/91"],
    anGang: ["xinsiyang/nv/gang"],
    kaiGang: ["xinsiyang/nv/gang"],
    chi: ["xinsiyang/nv/chi"],
    fangpao: ["xinsiyang/nv/fangpao"],
    flower: ["xinsiyang/nv/flower"],
    gang: ["xinsiyang/nv/gang"],
    gangshangkaihua: ["xinsiyang/nv/gangshangkaihua"],
    hu: ["xinsiyang/nv/hu"],
    peng: ["xinsiyang/nv/peng"],
    ting: ["xinsiyang/nv/ting"],
    zimo: ["xinsiyang/nv/zimo"],
    long: ["xinsiyang/nv/long"],
    shangjin: ["xinsiyang/nv/shangjin"],
    qinghu: ["xinsiyang/nv/qinghu"],
    quanhun: ["xinsiyang/nv/quanhun"],
    jiabei: ["xinsiyang/nv/jiabei"],
    bujiabei: ["xinsiyang/nv/bujiabei"]
};
GameSound4Play[MjClient.GAME_TYPE.SI_YANG_HH] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.YAN_CHENG_HH] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.GAN_YU] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.HUAIAN_TTZ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.HUAIAN_CC] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.HAI_AN_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.XUE_ZHAN] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.XUE_LIU] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.HAI_AN_BAI_DA] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.JIN_ZHONG_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.GUI_ZHOU_AN_SHUN_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_LIANG_FANG] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.GUI_ZHOU_LIANG_DING_LIANG_FANG] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_GUAI] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.GUI_ZHOU_ER_DING_GUAI] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.GUI_ZHOU_XMY_GUI_YANG_ZHUO_JI] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.GUI_ZHOU_MEN_HU_XUE_LIU] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.JIN_ZHONG_KD] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.HE_JIN_KUN_JIN] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.LV_LIANG_MA_JIANG] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.ZHUO_HAO_ZI] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.LING_SHI_BIAN_LONG] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.LING_SHI_BAN_MO] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.WU_TAI_KOU_DIAN] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.FEN_YANG_QUE_MEN] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.JING_LE_KOU_DIAN] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.DA_TONG_GUAI_SAN_JIAO] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.LUAN_GUA_FENG] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.SHOU_YANG_QUE_KA] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.JIN_ZHONG_LI_SI] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.FAN_SHI_XIA_YU] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.CHUO_XIA_ZI] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.CHONG_YANG_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.QIAN_JIANG_HH_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.HUANG_SHI_HH_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.QI_CHUN_HH_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.TONG_CHENG_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.TONG_SHAN_HH_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.WU_XUE_MJ] = GameSound4Play["normal"];

GameSound4Play[MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE] = {
    1:["anXiangWeiMaQue/nv/1","anXiangWeiMaQue/nv_local/1"],
    2:["anXiangWeiMaQue/nv/2","anXiangWeiMaQue/nv_local/2"],
    3:["anXiangWeiMaQue/nv/3","anXiangWeiMaQue/nv_local/3"],
    4:["anXiangWeiMaQue/nv/4","anXiangWeiMaQue/nv_local/4"],
    5:["anXiangWeiMaQue/nv/5","anXiangWeiMaQue/nv_local/5"],
    6:["anXiangWeiMaQue/nv/6","anXiangWeiMaQue/nv_local/6"],
    7:["anXiangWeiMaQue/nv/7","anXiangWeiMaQue/nv_local/7"],
    8:["anXiangWeiMaQue/nv/8","anXiangWeiMaQue/nv_local/8"],
    9:["anXiangWeiMaQue/nv/9","anXiangWeiMaQue/nv_local/9"],
    10:["anXiangWeiMaQue/nv/10","anXiangWeiMaQue/nv_local/10"],
    21:["anXiangWeiMaQue/nv/21","anXiangWeiMaQue/nv_local/21"],
    22:["anXiangWeiMaQue/nv/22","anXiangWeiMaQue/nv_local/22"],
    23:["anXiangWeiMaQue/nv/23","anXiangWeiMaQue/nv_local/23"],
    24:["anXiangWeiMaQue/nv/24","anXiangWeiMaQue/nv_local/24"],
    25:["anXiangWeiMaQue/nv/25","anXiangWeiMaQue/nv_local/25"],
    26:["anXiangWeiMaQue/nv/26","anXiangWeiMaQue/nv_local/26"],
    27:["anXiangWeiMaQue/nv/27","anXiangWeiMaQue/nv_local/27"],
    28:["anXiangWeiMaQue/nv/28","anXiangWeiMaQue/nv_local/28"],
    29:["anXiangWeiMaQue/nv/29","anXiangWeiMaQue/nv_local/29"],
    30:["anXiangWeiMaQue/nv/30","anXiangWeiMaQue/nv_local/30"],
    chi:["anXiangWeiMaQue/nv/chi","anXiangWeiMaQue/nv_local/chi"],
    wei:["anXiangWeiMaQue/nv/wei","anXiangWeiMaQue/nv_local/wei"],
    hu:["anXiangWeiMaQue/nv/hu","anXiangWeiMaQue/nv_local/hu"],
    zimo:["anXiangWeiMaQue/nv/zimo","anXiangWeiMaQue/nv_local/zimo"],
    peng:["anXiangWeiMaQue/nv/peng","anXiangWeiMaQue/nv_local/peng"],
};
GameSound4Play[MjClient.GAME_TYPE.ZP_LY_CHZ]  = {
    1:["leiyang/nv/1"],
    2:["leiyang/nv/2"],
    3:["leiyang/nv/3"],
    4:["leiyang/nv/4"],
    5:["leiyang/nv/5"],
    6:["leiyang/nv/6"],
    7:["leiyang/nv/7"],
    8:["leiyang/nv/8"],
    9:["leiyang/nv/9"],
    10:["leiyang/nv/10"],
    21:["leiyang/nv/21"],
    22:["leiyang/nv/22"],
    23:["leiyang/nv/23"],
    24:["leiyang/nv/24"],
    25:["leiyang/nv/25"],
    26:["leiyang/nv/26"],
    27:["leiyang/nv/27"],
    28:["leiyang/nv/28"],
    29:["leiyang/nv/29"],
    30:["leiyang/nv/30"],
    91:["leiyang/nv/91"],
    bi:["leiyang/nv/bi"],
    chi:["leiyang/nv/chi"],
    wei:["leiyang/nv/wei"],
    chouwei:["leiyang/nv/chouwei"],
    zimo:["leiyang/nv/zimo"],
    fangpao:["leiyang/nv/fangpao"],
    pao:["leiyang/nv/pao"],
    peng:["leiyang/nv/peng"],
    ti:["leiyang/nv/ti"],
    wangchuang:["leiyang/nv/wangchuang"],
    wangdiao:["leiyang/nv/wangdiao"],
    wangzha:["leiyang/nv/ww_v_wz"],
};

GameSound4Play[MjClient.GAME_TYPE.HY_LIU_HU_QIANG]  = {
    1:["yongzhou/nv/1", "yongzhou/bdh/1"],
    2:["yongzhou/nv/2", "yongzhou/bdh/2"],
    3:["yongzhou/nv/3", "yongzhou/bdh/3"],
    4:["yongzhou/nv/4", "yongzhou/bdh/4"],
    5:["yongzhou/nv/5", "yongzhou/bdh/5"],
    6:["yongzhou/nv/6", "yongzhou/bdh/6"],
    7:["yongzhou/nv/7", "yongzhou/bdh/7"],
    8:["yongzhou/nv/8", "yongzhou/bdh/8"],
    9:["yongzhou/nv/9", "yongzhou/bdh/9"],
    10:["yongzhou/nv/10", "yongzhou/bdh/10"],
    21:["yongzhou/nv/21", "yongzhou/bdh/21"],
    22:["yongzhou/nv/22", "yongzhou/bdh/22"],
    23:["yongzhou/nv/23", "yongzhou/bdh/23"],
    24:["yongzhou/nv/24", "yongzhou/bdh/24"],
    25:["yongzhou/nv/25", "yongzhou/bdh/25"],
    26:["yongzhou/nv/26", "yongzhou/bdh/26"],
    27:["yongzhou/nv/27", "yongzhou/bdh/27"],
    28:["yongzhou/nv/28", "yongzhou/bdh/28"],
    29:["yongzhou/nv/29", "yongzhou/bdh/29"],
    30:["yongzhou/nv/30", "yongzhou/bdh/30"],
    91:["yongzhou/nv/91", "yongzhou/bdh/91"],
    bi:["yongzhou/nv/bi", "yongzhou/bdh/bi"],
    chi:["yongzhou/nv/chi", "yongzhou/bdh/chi"],
    wei:["yongzhou/nv/wei", "yongzhou/bdh/wei"],
    chouwei:["yongzhou/nv/chouwei", "yongzhou/bdh/chouwei"],
    zimo:["yongzhou/nv/zimo", "yongzhou/bdh/zimo"],
    fangpao:["yongzhou/nv/fangpao", "yongzhou/bdh/fangpao"],
    pao:["yongzhou/nv/pao", "yongzhou/bdh/pao"],
    peng:["yongzhou/nv/peng", "yongzhou/bdh/peng"],
    ti:["yongzhou/nv/ti", "yongzhou/nv/ti"],
    wangchuang:["yongzhou/nv/wangchuang", "yongzhou/bdh/wangchuang"],
    wangdiao:["yongzhou/nv/wangdiao", "yongzhou/bdh/wangdiao"],
    wangzha:["yongzhou/nv/ww_v_wz", "yongzhou/bdh/ww_v_wz"],
};
GameSound4Play[MjClient.GAME_TYPE.HY_SHI_HU_KA] = GameSound4Play[MjClient.GAME_TYPE.HY_LIU_HU_QIANG];
GameSound4Play[MjClient.GAME_TYPE.SHAO_YANG_BO_PI] = GameSound4Play[MjClient.GAME_TYPE.HY_LIU_HU_QIANG];
GameSound4Play[MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI] = GameSound4Play[MjClient.GAME_TYPE.HY_LIU_HU_QIANG];
GameSound4Play[MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI] = GameSound4Play[MjClient.GAME_TYPE.HY_LIU_HU_QIANG];
GameSound4Play[MjClient.GAME_TYPE.HY_SHI_HU_KA] = GameSound4Play[MjClient.GAME_TYPE.HY_LIU_HU_QIANG];
GameSound4Play[MjClient.GAME_TYPE.DA_ZI_BO_PI] = GameSound4Play[MjClient.GAME_TYPE.HY_LIU_HU_QIANG];

GameSound4Play[MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI]  = {
    1:["anhua/nv/1"],
    2:["anhua/nv/2"],
    3:["anhua/nv/3"],
    4:["anhua/nv/4"],
    5:["anhua/nv/5"],
    6:["anhua/nv/6"],
    7:["anhua/nv/7"],
    8:["anhua/nv/8"],
    9:["anhua/nv/9"],
    10:["anhua/nv/10"],
    21:["anhua/nv/21"],
    22:["anhua/nv/22"],
    23:["anhua/nv/23"],
    24:["anhua/nv/24"],
    25:["anhua/nv/25"],
    26:["anhua/nv/26"],
    27:["anhua/nv/27"],
    28:["anhua/nv/28"],
    29:["anhua/nv/29"],
    30:["anhua/nv/30"],
    bi:["anhua/nv/bi"],
    chi:["anhua/nv/chi"],
    wei:["anhua/nv/wei"],
    chouwei:["anhua/nv/chouwei"],
    zimo:["anhua/nv/zimo"],
    pao:["anhua/nv/pao"],
    peng:["anhua/nv/peng"],
    ti:["anhua/nv/ti"],
    fangpao:["anhua/nv/fangpao"],
};

GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_TTZ] = {
    1: ["huaian/nv/1"],
    2: ["huaian/nv/2"],
    3: ["huaian/nv/3"],
    4: ["huaian/nv/4"],
    5: ["huaian/nv/5"],
    6: ["huaian/nv/6"],
    7: ["huaian/nv/7"],
    8: ["huaian/nv/8"],
    9: ["huaian/nv/9"],
    11: ["huaian/nv/11"],
    12: ["huaian/nv/12"],
    13: ["huaian/nv/13"],
    14: ["huaian/nv/14"],
    15: ["huaian/nv/15"],
    16: ["huaian/nv/16"],
    17: ["huaian/nv/17"],
    18: ["huaian/nv/18"],
    19: ["huaian/nv/19"],
    21: ["huaian/nv/21"],
    22: ["huaian/nv/22"],
    23: ["huaian/nv/23"],
    24: ["huaian/nv/24"],
    25: ["huaian/nv/25"],
    26: ["huaian/nv/26"],
    27: ["huaian/nv/27"],
    28: ["huaian/nv/28"],
    29: ["huaian/nv/29"],
    31: ["huaian/nv/31"],
    41: ["huaian/nv/41"],
    51: ["huaian/nv/51"],
    61: ["huaian/nv/61"],
    71: ["huaian/nv/71"],
    81: ["huaian/nv/81"],
    91: ["huaian/nv/91"],
    chi: ["huaian/nv/chi"],
    fangpao: ["huaian/nv/fangpao"],
    flower: ["huaian/nv/flower"],
    gang: ["huaian/nv/gang"],
    anGang: ["huaian/nv/gang"],
    hu: ["huaian/nv/hu"],
    peng: ["huaian/nv/peng"],
    ting: ["huaian/nv/ting"],
    zimo: ["huaian/nv/zimo"]
};
GameSound4Play[MjClient.GAME_TYPE.HZ_TUI_DAO_HU] = GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_TTZ];
GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_CC] = GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_TTZ];
GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_ERZ] = GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_TTZ];
GameSound4Play[MjClient.GAME_TYPE.HUAI_AN] = GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_TTZ];
GameSound4Play[MjClient.GAME_TYPE.HA_HONGZHONG] = GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_TTZ];
GameSound4Play[MjClient.GAME_TYPE.LIAN_SHUI] = GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_TTZ];
GameSound4Play[MjClient.GAME_TYPE.HONG_ZE_MA_JIANG] = GameSound4Play[MjClient.GAME_TYPE.HA_HONGZHONG];

GameSound4Play[MjClient.GAME_TYPE.CHAO_GU_MJ] = {
    1: ["chaogu/nv/1"],
    2: ["chaogu/nv/2"],
    3: ["chaogu/nv/3"],
    4: ["chaogu/nv/4"],
    5: ["chaogu/nv/5"],
    6: ["chaogu/nv/6"],
    7: ["chaogu/nv/7"],
    8: ["chaogu/nv/8"],
    9: ["chaogu/nv/9"],
    11: ["chaogu/nv/11"],
    12: ["chaogu/nv/12"],
    13: ["chaogu/nv/13"],
    14: ["chaogu/nv/14"],
    15: ["chaogu/nv/15"],
    16: ["chaogu/nv/16"],
    17: ["chaogu/nv/17"],
    18: ["chaogu/nv/18"],
    19: ["chaogu/nv/19"],
    21: ["chaogu/nv/21"],
    22: ["chaogu/nv/22"],
    23: ["chaogu/nv/23"],
    24: ["chaogu/nv/24"],
    25: ["chaogu/nv/25"],
    26: ["chaogu/nv/26"],
    27: ["chaogu/nv/27"],
    28: ["chaogu/nv/28"],
    29: ["chaogu/nv/29"],
    gang: ["chaogu/nv/gang"],
    hu: ["chaogu/nv/hu"],
    peng: ["chaogu/nv/peng"],
    zimo: ["chaogu/nv/zimo"],
    qiangganghu: ["chaogu/nv/type_2"],
    gangshanghua: ["chaogu/nv/type_1"],
    gangshangpao: ["chaogu/nv/type_3"],
};

GameSound4Play[MjClient.GAME_TYPE.LIAN_YUN_GANG] = {
    1: ["lyg/nv/1"],
    2: ["lyg/nv/2"],
    3: ["lyg/nv/3"],
    4: ["lyg/nv/4"],
    5: ["lyg/nv/5"],
    6: ["lyg/nv/6"],
    7: ["lyg/nv/7"],
    8: ["lyg/nv/8"],
    9: ["lyg/nv/9"],
    11: ["lyg/nv/11"],
    12: ["lyg/nv/12"],
    13: ["lyg/nv/13"],
    14: ["lyg/nv/14"],
    15: ["lyg/nv/15"],
    16: ["lyg/nv/16"],
    17: ["lyg/nv/17"],
    18: ["lyg/nv/18"],
    19: ["lyg/nv/19"],
    21: ["lyg/nv/21"],
    22: ["lyg/nv/22"],
    23: ["lyg/nv/23"],
    24: ["lyg/nv/24"],
    25: ["lyg/nv/25"],
    26: ["lyg/nv/26"],
    27: ["lyg/nv/27"],
    28: ["lyg/nv/28"],
    29: ["lyg/nv/29"],
    31: ["lyg/nv/31_0", "lyg/nv/31_1"],
    41: ["lyg/nv/41"],
    51: ["lyg/nv/51_0", "lyg/nv/51_1"],
    61: ["lyg/nv/61"],
    71: ["lyg/nv/71"],
    81: ["lyg/nv/81_0", "lyg/nv/81_1"],
    91: ["lyg/nv/91_0", "lyg/nv/91_1"],
    anGang: ["lyg/nv/anGang"],
    chi: ["lyg/nv/chi_0", "lyg/nv/chi_1"],
    fangpao: ["lyg/nv/fangpao_0", "lyg/nv/fangpao_1"],
    flower: ["lyg/nv/flower"],
    gang: ["lyg/nv/gang"],
    hu: ["lyg/nv/hu"],
    peng: ["lyg/nv/peng_0", "lyg/nv/peng_1"],
    ting: ["lyg/nv/ting_0", "lyg/nv/ting_1", "lyg/nv/ting_2"],
    zimo: ["lyg/nv/zimo_0", "lyg/nv/zimo_1"]
};
GameSound4Play[MjClient.GAME_TYPE.GUAN_YUN] = GameSound4Play[MjClient.GAME_TYPE.LIAN_YUN_GANG];
GameSound4Play[MjClient.GAME_TYPE.DONG_HAI] = GameSound4Play[MjClient.GAME_TYPE.LIAN_YUN_GANG];

GameSound4Play[MjClient.GAME_TYPE.SHU_YANG] = {
    1: ["shuyang/boy_0/nv/1", "shuyang/boy_1/nv/1"],
    2: ["shuyang/boy_0/nv/2", "shuyang/boy_1/nv/2"],
    3: ["shuyang/boy_0/nv/3", "shuyang/boy_1/nv/3"],
    4: ["shuyang/boy_0/nv/4", "shuyang/boy_1/nv/4"],
    5: ["shuyang/boy_0/nv/5", "shuyang/boy_1/nv/5"],
    6: ["shuyang/boy_0/nv/6", "shuyang/boy_1/nv/6"],
    7: ["shuyang/boy_0/nv/7", "shuyang/boy_1/nv/7"],
    8: ["shuyang/boy_0/nv/8", "shuyang/boy_1/nv/8"],
    9: ["shuyang/boy_0/nv/9", "shuyang/boy_1/nv/9"],
    11: ["shuyang/boy_0/nv/11", "shuyang/boy_1/nv/11"],
    12: ["shuyang/boy_0/nv/12", "shuyang/boy_1/nv/12"],
    13: ["shuyang/boy_0/nv/13", "shuyang/boy_1/nv/13"],
    14: ["shuyang/boy_0/nv/14", "shuyang/boy_1/nv/14"],
    15: ["shuyang/boy_0/nv/15", "shuyang/boy_1/nv/15"],
    16: ["shuyang/boy_0/nv/16", "shuyang/boy_1/nv/16"],
    17: ["shuyang/boy_0/nv/17", "shuyang/boy_1/nv/17"],
    18: ["shuyang/boy_0/nv/18", "shuyang/boy_1/nv/18"],
    19: ["shuyang/boy_0/nv/19", "shuyang/boy_1/nv/19"],
    21: ["shuyang/boy_0/nv/21", "shuyang/boy_1/nv/21"],
    22: ["shuyang/boy_0/nv/22", "shuyang/boy_1/nv/22"],
    23: ["shuyang/boy_0/nv/23", "shuyang/boy_1/nv/23"],
    24: ["shuyang/boy_0/nv/24", "shuyang/boy_1/nv/24"],
    25: ["shuyang/boy_0/nv/25", "shuyang/boy_1/nv/25"],
    26: ["shuyang/boy_0/nv/26", "shuyang/boy_1/nv/26"],
    27: ["shuyang/boy_0/nv/27", "shuyang/boy_1/nv/27"],
    28: ["shuyang/boy_0/nv/28", "shuyang/boy_1/nv/28"],
    29: ["shuyang/boy_0/nv/29", "shuyang/boy_1/nv/29"],
    31: ["shuyang/boy_0/nv/31", "shuyang/boy_1/nv/31"],
    41: ["shuyang/boy_0/nv/41", "shuyang/boy_1/nv/41"],
    51: ["shuyang/boy_0/nv/51", "shuyang/boy_1/nv/51"],
    61: ["shuyang/boy_0/nv/61", "shuyang/boy_1/nv/61"],
    71: ["shuyang/boy_0/nv/71", "shuyang/boy_1/nv/71"],
    81: ["shuyang/boy_0/nv/81", "shuyang/boy_1/nv/81"],
    91: ["shuyang/boy_0/nv/91", "shuyang/boy_1/nv/91"],
    anGang: ["shuyang/boy_0/nv/gang", "shuyang/boy_1/nv/gang"],
    chi: ["shuyang/boy_0/nv/chi", "shuyang/boy_1/nv/chi"],
    fangpao: ["shuyang/boy_0/nv/fangpao", "shuyang/boy_1/nv/fangpao"],
    flower: ["shuyang/boy_0/nv/flower", "shuyang/boy_1/nv/flower"],
    gang: ["shuyang/boy_0/nv/gang", "shuyang/boy_1/nv/gang"],
    hu: ["shuyang/boy_0/nv/hu", "shuyang/boy_1/nv/hu"],
    peng: ["shuyang/boy_0/nv/peng", "shuyang/boy_1/nv/peng"],
    ting: ["shuyang/boy_0/nv/ting", "shuyang/boy_1/nv/ting"],
    zimo: ["shuyang/boy_0/nv/zimo", "shuyang/boy_1/nv/zimo"]
};

GameSound4Play[MjClient.GAME_TYPE.NIU_NIU] = {
    0: ["niuniu/nv/bull0"],
    1: ["niuniu/nv/bull1"],
    2: ["niuniu/nv/bull2"],
    3: ["niuniu/nv/bull3"],
    4: ["niuniu/nv/bull4"],
    5: ["niuniu/nv/bull5"],
    6: ["niuniu/nv/bull6"],
    7: ["niuniu/nv/bull7"],
    8: ["niuniu/nv/bull8"],
    9: ["niuniu/nv/bull9"],
    10: ["niuniu/nv/bull10"],
    11: ["niuniu/nv/bull11"],
    12: ["niuniu/nv/bull12"],
    betChip: ["niuniu/nv/betChip"],
    clickCard: ["niuniu/nv/clickCard"],
    complete: ["niuniu/nv/complete"],
    flyMoney: ["niuniu/nv/flyMoney"],
    gameStart: ["niuniu/nv/gameStart"]
};

GameSound4Play[MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA] = {
    jiao0: ["sanDaHa/nv/callpoint/cp_0"],
    jiao5: ["sanDaHa/nv/callpoint/cp_5"],
    jiao10: ["sanDaHa/nv/callpoint/cp_10"],
    jiao15: ["sanDaHa/nv/callpoint/cp_15"],
    jiao20: ["sanDaHa/nv/callpoint/cp_20"],
    jiao25: ["sanDaHa/nv/callpoint/cp_25"],
    jiao30: ["sanDaHa/nv/callpoint/cp_30"],
    jiao35: ["sanDaHa/nv/callpoint/cp_35"],
    jiao40: ["sanDaHa/nv/callpoint/cp_40"],
    jiao45: ["sanDaHa/nv/callpoint/cp_45"],
    jiao50: ["sanDaHa/nv/callpoint/cp_50"],
    jiao55: ["sanDaHa/nv/callpoint/cp_55"],
    jiao60: ["sanDaHa/nv/callpoint/cp_60"],
    jiao65: ["sanDaHa/nv/callpoint/cp_65"],
    jiao70: ["sanDaHa/nv/callpoint/cp_70"],
    jiao75: ["sanDaHa/nv/callpoint/cp_75"],
    jiao80: ["sanDaHa/nv/callpoint/cp_80"],
    jiao85: ["sanDaHa/nv/callpoint/cp_85"],
    jiao90: ["sanDaHa/nv/callpoint/cp_90"],
    jiao95: ["sanDaHa/nv/callpoint/cp_95"],
    jiao100: ["sanDaHa/nv/callpoint/cp_100"],

    oneCard: ["sanDaHa/nv/cardtype/oneCard"],
    oneMainCard: ["sanDaHa/nv/cardtype/oneMainCard"],
    pair: ["sanDaHa/nv/cardtype/pair"],
    pairsMain: ["sanDaHa/nv/cardtype/pairsMain"],
    swingcard: ["sanDaHa/nv/cardtype/swingcard"],
    tractor: ["sanDaHa/nv/cardtype/tractor"],
    tractormain: ["sanDaHa/nv/cardtype/tractormain"],

    fangkuai: ["sanDaHa/nv/choosecolor/fangkuai"],
    heitao: ["sanDaHa/nv/choosecolor/heitao"],
    hongtao: ["sanDaHa/nv/choosecolor/hongtao"],
    meihua: ["sanDaHa/nv/choosecolor/meihua"],
    wu: ["sanDaHa/nv/choosecolor/wuzhu"],

    danpai_1: ["sanDaHa/nv/cardtype/danpai_1"],
    danpai_2: ["sanDaHa/nv/cardtype/danpai_2"],
    danpai_3: ["sanDaHa/nv/cardtype/danpai_3"],
    danpai_4: ["sanDaHa/nv/cardtype/danpai_4"],
    danpai_5: ["sanDaHa/nv/cardtype/danpai_5"],
    danpai_6: ["sanDaHa/nv/cardtype/danpai_6"],
    danpai_7: ["sanDaHa/nv/cardtype/danpai_7"],
    danpai_8: ["sanDaHa/nv/cardtype/danpai_8"],
    danpai_9: ["sanDaHa/nv/cardtype/danpai_9"],
    danpai_10: ["sanDaHa/nv/cardtype/danpai_10"],
    danpai_11: ["sanDaHa/nv/cardtype/danpai_11"],
    danpai_12: ["sanDaHa/nv/cardtype/danpai_12"],
    danpai_13: ["sanDaHa/nv/cardtype/danpai_13"],
    danpai_14: ["sanDaHa/nv/cardtype/danpai_14"],
    danpai_15: ["sanDaHa/nv/cardtype/danpai_15"],

    duiPai_1: ["sanDaHa/nv/cardtype/duiPai_1"],
    duiPai_2: ["sanDaHa/nv/cardtype/duiPai_2"],
    duiPai_3: ["sanDaHa/nv/cardtype/duiPai_3"],
    duiPai_4: ["sanDaHa/nv/cardtype/duiPai_4"],
    duiPai_5: ["sanDaHa/nv/cardtype/duiPai_5"],
    duiPai_6: ["sanDaHa/nv/cardtype/duiPai_6"],
    duiPai_7: ["sanDaHa/nv/cardtype/duiPai_7"],
    duiPai_8: ["sanDaHa/nv/cardtype/duiPai_8"],
    duiPai_9: ["sanDaHa/nv/cardtype/duiPai_9"],
    duiPai_10: ["sanDaHa/nv/cardtype/duiPai_10"],
    duiPai_11: ["sanDaHa/nv/cardtype/duiPai_11"],
    duiPai_12: ["sanDaHa/nv/cardtype/duiPai_12"],
    duiPai_13: ["sanDaHa/nv/cardtype/duiPai_13"],
    duiPai_14: ["sanDaHa/nv/cardtype/duiPai_14"],
    duiPai_15: ["sanDaHa/nv/cardtype/duiPai_15"],

    bigger_1: ["sanDaHa/nv/cardtype/bigger_1"],
    bigger_2: ["sanDaHa/nv/cardtype/bigger_2"],
    bile: ["sanDaHa/nv/cardtype/bile"],
    dianpai: ["sanDaHa/nv/cardtype/dianpai"],
    diaozhu: ["sanDaHa/nv/cardtype/diaozhu"],
    gaibi: ["sanDaHa/nv/cardtype/gaibi"],
    swingcard: ["sanDaHa/nv/cardtype/swingcard"],


    liuju: ["sanDaHa/effect/audio_liuju"],
    getScore: ["sanDaHa/effect/getScore"],
    lose: ["sanDaHa/effect/lose"],
    win: ["sanDaHa/effect/win"],
    win_1: ["sanDaHa/nv/win_1"],
};

GameSound4Play[MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA] = GameSound4Play[MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA];
GameSound4Play[MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA] = GameSound4Play[MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA];

GameSound4Play["normal_linfen"] = {
    1: ["normal_linfen/nv/1"],
    2: ["normal_linfen/nv/2"],
    3: ["normal_linfen/nv/3"],
    4: ["normal_linfen/nv/4"],
    5: ["normal_linfen/nv/5"],
    6: ["normal_linfen/nv/6"],
    7: ["normal_linfen/nv/7"],
    8: ["normal_linfen/nv/8"],
    9: ["normal_linfen/nv/9"],
    11: ["normal_linfen/nv/11"],
    12: ["normal_linfen/nv/12"],
    13: ["normal_linfen/nv/13"],
    14: ["normal_linfen/nv/14"],
    15: ["normal_linfen/nv/15"],
    16: ["normal_linfen/nv/16"],
    17: ["normal_linfen/nv/17"],
    18: ["normal_linfen/nv/18"],
    19: ["normal_linfen/nv/19"],
    21: ["normal_linfen/nv/21"],
    22: ["normal_linfen/nv/22"],
    23: ["normal_linfen/nv/23"],
    24: ["normal_linfen/nv/24"],
    25: ["normal_linfen/nv/25"],
    26: ["normal_linfen/nv/26"],
    27: ["normal_linfen/nv/27"],
    28: ["normal_linfen/nv/28"],
    29: ["normal_linfen/nv/29"],
    31: ["normal_linfen/nv/31"],
    41: ["normal_linfen/nv/41"],
    51: ["normal_linfen/nv/51"],
    61: ["normal_linfen/nv/61"],
    71: ["normal_linfen/nv/71"],
    81: ["normal_linfen/nv/81"],
    91: ["normal_linfen/nv/91"],
    anGang: ["normal_linfen/nv/gang"],
    kaiGang: ["normal_linfen/nv/gang"],
    chi: ["normal_linfen/nv/chi"],
    fangpao: ["normal_linfen/nv/fangpao"],
    flower: ["normal_linfen/nv/flower"],
    gang: ["normal_linfen/nv/gang"],
    gangshangkaihua: ["normal_linfen/nv/gangshangkaihua"],
    hu: ["normal_linfen/nv/hu"],
    peng: ["normal_linfen/nv/peng"],
    ting: ["normal_linfen/nv/ting"],
    zimo: ["normal_linfen/nv/zimo"]
};
GameSound4Play[MjClient.GAME_TYPE.HONG_TONG_WANG_PAI] = GameSound4Play["normal_linfen"];
GameSound4Play[MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI] = GameSound4Play["normal_linfen"];
GameSound4Play[MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI] = GameSound4Play["normal_linfen"];
GameSound4Play[MjClient.GAME_TYPE.FEN_XI_YING_KOU] = GameSound4Play["normal_linfen"];
GameSound4Play[MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN] = GameSound4Play["normal_linfen"];
GameSound4Play[MjClient.GAME_TYPE.DA_NING_SHUAI_JIN] = GameSound4Play["normal_linfen"];
GameSound4Play[MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG] = GameSound4Play["normal_linfen"];

GameSound4Play[MjClient.GAME_TYPE.SU_QIAN] = {
    1: ["suqian/nan/1_0", "suqian/nan/1_1", "suqian/nan/1_2"],
    2: ["suqian/nan/2_0", "suqian/nan/2_1"],
    3: ["suqian/nan/3_0", "suqian/nan/3_1"],
    4: ["suqian/nan/4_0", "suqian/nan/4_1"],
    5: ["suqian/nan/5"],
    6: ["suqian/nan/6"],
    7: ["suqian/nan/7"],
    8: ["suqian/nan/8_0", "suqian/nan/8_1"],
    9: ["suqian/nan/9"],
    11: ["suqian/nan/11_0", "suqian/nan/11_1"],
    12: ["suqian/nan/12_0", "suqian/nan/12_1"],
    13: ["suqian/nan/13"],
    14: ["suqian/nan/14"],
    15: ["suqian/nan/15_0", "suqian/nan/15_1"],
    16: ["suqian/nan/16"],
    17: ["suqian/nan/17"],
    18: ["suqian/nan/18_0", "suqian/nan/18_1"],
    19: ["suqian/nan/19_0", "suqian/nan/19_1"],
    21: ["suqian/nan/21_0", "suqian/nan/21_1"],
    22: ["suqian/nan/22_0", "suqian/nan/22_1"],
    23: ["suqian/nan/23_0", "suqian/nan/23_1"],
    24: ["suqian/nan/24"],
    25: ["suqian/nan/25_0", "suqian/nan/25_1"],
    26: ["suqian/nan/26_0", "suqian/nan/26_1"],
    27: ["suqian/nan/27"],
    28: ["suqian/nan/28_0", "suqian/nan/28_1"],
    29: ["suqian/nan/29_0", "suqian/nan/29_1"],
    31: ["suqian/nan/31_0", "suqian/nan/31_1"],
    41: ["suqian/nan/41_0", "suqian/nan/41_1"],
    51: ["suqian/nan/51_0", "suqian/nan/51_1"],
    61: ["suqian/nan/61_0", "suqian/nan/61_1"],
    71: ["suqian/nan/71_0", "suqian/nan/71_1"],
    81: ["suqian/nan/81"],
    91: ["suqian/nan/91_0", "suqian/nan/91_1", "suqian/nan/91_2"],
    anGang: ["suqian/nan/gang_0", "suqian/nan/gang_1"],
    chi: ["suqian/nan/chi"],
    fangpao: ["suqian/nan/fangpao"],
    flower: ["suqian/nan/flower"],
    gang: ["suqian/nan/gang_0", "suqian/nan/gang_1"],
    hu: ["suqian/nan/hu_0", "suqian/nan/hu_1"],
    peng: ["suqian/nan/peng_0", "suqian/nan/peng_1"],
    ting: ["suqian/nan/ting_0", "suqian/nan/ting_1"],
    zimo: ["suqian/nan/zimo_0", "suqian/nan/zimo_1"]
};

GameSound4Play[MjClient.GAME_TYPE.NAN_JING] = {
    1: ["nanjing/nv/1"],
    2: ["nanjing/nv/2"],
    3: ["nanjing/nv/3"],
    4: ["nanjing/nv/4"],
    5: ["nanjing/nv/5"],
    6: ["nanjing/nv/6"],
    7: ["nanjing/nv/7"],
    8: ["nanjing/nv/8"],
    9: ["nanjing/nv/9"],
    11: ["nanjing/nv/11"],
    12: ["nanjing/nv/12"],
    13: ["nanjing/nv/13"],
    14: ["nanjing/nv/14"],
    15: ["nanjing/nv/15"],
    16: ["nanjing/nv/16"],
    17: ["nanjing/nv/17"],
    18: ["nanjing/nv/18"],
    19: ["nanjing/nv/19"],
    21: ["nanjing/nv/21"],
    22: ["nanjing/nv/22"],
    23: ["nanjing/nv/23"],
    24: ["nanjing/nv/24"],
    25: ["nanjing/nv/25"],
    26: ["nanjing/nv/26"],
    27: ["nanjing/nv/27"],
    28: ["nanjing/nv/28"],
    29: ["nanjing/nv/29"],
    31: ["nanjing/nv/31"],
    41: ["nanjing/nv/41"],
    51: ["nanjing/nv/51"],
    61: ["nanjing/nv/61"],
    71: ["nanjing/nv/71"],
    81: ["nanjing/nv/81"],
    91: ["nanjing/nv/91"],
    anGang: ["nanjing/nv/gang"],
    huaGang: ["nanjing/nv/gang"],
    chi: ["nanjing/nv/chi"],
    fangpao: ["nanjing/nv/fangpao"],
    flower: ["nanjing/nv/flower"],
    gang: ["nanjing/nv/gang"],
    hu: ["nanjing/nv/hu"],
    peng: ["nanjing/nv/peng"],
    ting: ["nanjing/nv/ting"],
    zimo: ["nanjing/nv/zimo"],
    flyMoney: ["nanjing/nv/flyMoney"]
};

GameSound4Play[MjClient.GAME_TYPE.GUAN_NAN] = {
    1: ["guannan/nv/1"],
    2: ["guannan/nv/2"],
    3: ["guannan/nv/3"],
    4: ["guannan/nv/4"],
    5: ["guannan/nv/5"],
    6: ["guannan/nv/6"],
    7: ["guannan/nv/7"],
    8: ["guannan/nv/8"],
    9: ["guannan/nv/9"],
    11: ["guannan/nv/11"],
    12: ["guannan/nv/12"],
    13: ["guannan/nv/13"],
    14: ["guannan/nv/14"],
    15: ["guannan/nv/15"],
    16: ["guannan/nv/16"],
    17: ["guannan/nv/17"],
    18: ["guannan/nv/18"],
    19: ["guannan/nv/19"],
    21: ["guannan/nv/21"],
    22: ["guannan/nv/22"],
    23: ["guannan/nv/23"],
    24: ["guannan/nv/24"],
    25: ["guannan/nv/25"],
    26: ["guannan/nv/26"],
    27: ["guannan/nv/27"],
    28: ["guannan/nv/28"],
    29: ["guannan/nv/29"],
    31: ["guannan/nv/31"],
    41: ["guannan/nv/41"],
    51: ["guannan/nv/51"],
    61: ["guannan/nv/61"],
    71: ["normal/nv/71"],
    81: ["normal/nv/81"],
    91: ["normal/nv/91"],
    anGang: ["guannan/nv/angang"],
    chi: ["normal/nv/chi"],
    fangpao: ["guannan/nv/hu"],
    flower: ["normal/nv/flower"],
    gang: ["guannan/nv/gang"],
    hu: ["guannan/nv/hu"],
    peng: ["guannan/nv/peng"],
    ting: ["guannan/nv/ting"],
    zimo: ["guannan/nv/zimo"]
};

GameSound4Play[MjClient.GAME_TYPE.CHANG_SHA] = {
    1: ["changsha/nv/1"],
    2: ["changsha/nv/2"],
    3: ["changsha/nv/3"],
    4: ["changsha/nv/4"],
    5: ["changsha/nv/5"],
    6: ["changsha/nv/6"],
    7: ["changsha/nv/7"],
    8: ["changsha/nv/8"],
    9: ["changsha/nv/9"],
    11: ["changsha/nv/11"],
    12: ["changsha/nv/12"],
    13: ["changsha/nv/13"],
    14: ["changsha/nv/14"],
    15: ["changsha/nv/15"],
    16: ["changsha/nv/16"],
    17: ["changsha/nv/17"],
    18: ["changsha/nv/18"],
    19: ["changsha/nv/19"],
    21: ["changsha/nv/21"],
    22: ["changsha/nv/22"],
    23: ["changsha/nv/23"],
    24: ["changsha/nv/24"],
    25: ["changsha/nv/25"],
    26: ["changsha/nv/26"],
    27: ["changsha/nv/27"],
    28: ["changsha/nv/28"],
    29: ["changsha/nv/29"],
    31: ["changsha/nv/31"],
    41: ["changsha/nv/41"],
    51: ["changsha/nv/51"],
    61: ["changsha/nv/61"],
    71: ["changsha/nv/71"],
    81: ["changsha/nv/81"],
    91: ["changsha/nv/91"],
    anGang: ["changsha/nv/bu"],
    chi: ["changsha/nv/chi"],
    fangpao: ["changsha/nv/fangpao"],
    flower: ["changsha/nv/flower"],
    gang: ["changsha/nv/bu"],
    kaiGang: ["changsha/nv/gang"],
    hu: ["changsha/nv/hu"],
    peng: ["changsha/nv/peng"],
    ting: ["changsha/nv/ting"],
    zimo: ["changsha/nv/zimo"],
    banbanhu: ["changsha/nv/banbanhu"],
    dasixi: ["changsha/nv/dasixi"],
    gangshanghua: ["changsha/nv/gangshanghua"],
    gangshangpao: ["changsha/nv/gangshangpao"],
    haidilao: ["changsha/nv/haidilao"],
    haohuaqidui: ["changsha/nv/haohuaqidui"],
    jiangjianghu: ["changsha/nv/jiangjianghu"],
    liuliushun: ["changsha/nv/liuliushun"],
    pengpenghu: ["changsha/nv/pengpenghu"],
    qiangganghu: ["changsha/nv/qiangganghu"],
    qidui: ["changsha/nv/qidui"],
    qingyise: ["changsha/nv/qingyise"],
    quanqiuren: ["changsha/nv/quanqiuren"],
    queyise: ["changsha/nv/queyise"]
};
GameSound4Play[MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA] = GameSound4Play[MjClient.GAME_TYPE.CHANG_SHA];

GameSound4Play[MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU] = {
    1: ["tuidaohu/nv/1"],
    2: ["tuidaohu/nv/2"],
    3: ["tuidaohu/nv/3"],
    4: ["tuidaohu/nv/4"],
    5: ["tuidaohu/nv/5"],
    6: ["tuidaohu/nv/6"],
    7: ["tuidaohu/nv/7"],
    8: ["tuidaohu/nv/8"],
    9: ["tuidaohu/nv/9"],
    11: ["tuidaohu/nv/11"],
    12: ["tuidaohu/nv/12"],
    13: ["tuidaohu/nv/13"],
    14: ["tuidaohu/nv/14"],
    15: ["tuidaohu/nv/15"],
    16: ["tuidaohu/nv/16"],
    17: ["tuidaohu/nv/17"],
    18: ["tuidaohu/nv/18"],
    19: ["tuidaohu/nv/19"],
    21: ["tuidaohu/nv/21"],
    22: ["tuidaohu/nv/22"],
    23: ["tuidaohu/nv/23"],
    24: ["tuidaohu/nv/24"],
    25: ["tuidaohu/nv/25"],
    26: ["tuidaohu/nv/26"],
    27: ["tuidaohu/nv/27"],
    28: ["tuidaohu/nv/28"],
    29: ["tuidaohu/nv/29"],
    31: ["normal/nv/31"],
    41: ["normal/nv/41"],
    51: ["normal/nv/51"],
    61: ["normal/nv/61"],
    71: ["tuidaohu/nv/71"],
    81: ["normal/nv/81"],
    91: ["normal/nv/91"],
    anGang: ["tuidaohu/nv/bu"],
    chi: ["tuidaohu/nv/chi"],
    fangpao: ["tuidaohu/nv/fangpao"],
    flower: ["normal/nv/flower"],
    gang: ["tuidaohu/nv/bu"],
    kaiGang: ["tuidaohu/nv/gang"],
    hu: ["tuidaohu/nv/hu"],
    peng: ["tuidaohu/nv/peng"],
    ting: ["normal/nv/ting"],
    zimo: ["tuidaohu/nv/zimo"],
    pengpenghu: ["tuidaohu/nv/pengpenghu"],
    qiangganghu: ["tuidaohu/nv/qiangganghu"],
    qingyise: ["tuidaohu/nv/qingyise"],
    jiangjianghu: ["tuidaohu/nv/jiangjianghu"],
    haidilao: ["tuidaohu/nv/haidilao"],
    quanqiuren: ["tuidaohu/nv/quanqiuren"],
    gangshanghua: ["tuidaohu/nv/gangshanghua"],
    gangshangpao: ["tuidaohu/nv/gangshangpao"],
    qidui: ["tuidaohu/nv/qidui"],
    haohuaqidui: ["tuidaohu/nv/haohuaqidui"],
    bu: ["tuidaohu/nv/bu"]

};

GameSound4Play[MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG]  = {
    "10":["datongzi/nv/10"],
    "10bomb":["datongzi/nv/10bomb"],
    "10d":["datongzi/nv/10d"],
    "10t":["datongzi/nv/10t"],
    "10tongzi":["datongzi/nv/10tongzi"],
    "10Xi":["datongzi/nv/10Xi"],
    "11":["datongzi/nv/11"],
    "11d":["datongzi/nv/11d"],
    "11t":["datongzi/nv/11t"],
    "11tongzi":["datongzi/nv/11tongzi"],
    "11Xi":["datongzi/nv/11Xi"],
    "12":["datongzi/nv/12"],
    "12d":["datongzi/nv/12d"],
    "12t":["datongzi/nv/12t"],
    "12tongzi":["datongzi/nv/12tongzi"],
    "12Xi":["datongzi/nv/12Xi"],
    "13":["datongzi/nv/13"],
    "13d":["datongzi/nv/13d"],
    "13t":["datongzi/nv/13t"],
    "13tongzi":["datongzi/nv/13tongzi"],
    "13Xi":["datongzi/nv/13Xi"],
    "14":["datongzi/nv/14"],
    "14d":["datongzi/nv/14d"],
    "14t":["datongzi/nv/14t"],
    "14tongzi":["datongzi/nv/14tongzi"],
    "14Xi":["datongzi/nv/14Xi"],
    "15":["datongzi/nv/15"],
    "15d":["datongzi/nv/15d"],
    "15t":["datongzi/nv/15t"],
    "15tongzi":["datongzi/nv/15tongzi"],
    "15Xi":["datongzi/nv/15Xi"],
    "4bomb":["datongzi/nv/4bomb"],
    "5":["datongzi/nv/5"],
    "520":["datongzi/nv/520"],
    "520d":["datongzi/nv/520d"],
    "520tongzi":["datongzi/nv/520tongzi"],
    "520Xi":["datongzi/nv/520Xi"],
    "530":["datongzi/nv/530"],
    "530d":["datongzi/nv/530d"],
    "530tongzi":["datongzi/nv/530tongzi"],
    "530Xi":["datongzi/nv/530Xi"],
    "5bomb":["datongzi/nv/5bomb"],
    "5d":["datongzi/nv/5d"],
    "5t":["datongzi/nv/5t"],
    "5tongzi":["datongzi/nv/5tongzi"],
    "5Xi":["datongzi/nv/5Xi"],
    "6":["datongzi/nv/6"],
    "6bomb":["datongzi/nv/6bomb"],
    "6d":["datongzi/nv/6d"],
    "6t":["datongzi/nv/6t"],
    "6tongzi":["datongzi/nv/6tongzi"],
    "6Xi":["datongzi/nv/6Xi"],
    "7":["datongzi/nv/7"],
    "7bomb":["datongzi/nv/7bomb"],
    "7d":["datongzi/nv/7d"],
    "7t":["datongzi/nv/7t"],
    "7tongzi":["datongzi/nv/7tongzi"],
    "7Xi":["datongzi/nv/7Xi"],
    "8":["datongzi/nv/8"],
    "8bomb":["datongzi/nv/8bomb"],
    "8d":["datongzi/nv/8d"],
    "8t":["datongzi/nv/8t"],
    "8tongzi":["datongzi/nv/8tongzi"],
    "8Xi":["datongzi/nv/8Xi"],
    "9":["datongzi/nv/9"],
    "9bomb":["datongzi/nv/9bomb"],
    "9d":["datongzi/nv/9d"],
    "9t":["datongzi/nv/9t"],
    "9tongzi":["datongzi/nv/9tongzi"],
    "9Xi":["datongzi/nv/9Xi"],
    "baodan":["datongzi/nv/baodan"],
    "baoshuang":["datongzi/nv/baoshuang"],
    "double_line":["datongzi/nv/double_line"],
    "pass":["datongzi/nv/pass"],
    "wing":["datongzi/nv/wing"],

    //霸炸弹新增
    "3" : ["datongzi/nv/3.mp3"],
    "3d" : ["datongzi/nv/3d.mp3"],
    "3t" : ["datongzi/nv/3t.mp3"],
    "4" : ["datongzi/nv/4.mp3"],
    "4d" : ["datongzi/nv/4d.mp3"],
    "4t" : ["datongzi/nv/4t.mp3"],
    "buchui" : ["datongzi/nv/buchui.mp3"],
    "bufanqiang" : ["datongzi/nv/bufanqiang.mp3"],
    "chui" : ["datongzi/nv/chui.mp3"],
    "dou" : ["datongzi/nv/dou.mp3"],
    "f510k" : ["datongzi/nv/f510k.mp3"],
    "fandou" : ["datongzi/nv/fandou.mp3"],
    "fanqiang" : ["datongzi/nv/fanqiang.mp3"],
    "kaiqiang" : ["datongzi/nv/kaiqiang.mp3"],
    "tou_xiang" : ["datongzi/nv/tou_xiang.mp3"],
    "z510k" : ["datongzi/nv/z510k.mp3"],
    "shunzi" : ["datongzi/nv/shunzi.mp3"],
};
GameSound4Play[MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN] = GameSound4Play[MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG];
GameSound4Play[MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA] = GameSound4Play[MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG];

GameSound4Play[MjClient.GAME_TYPE.TONG_HUA] = {
    1: ["normal/nv/1"],
    2: ["normal/nv/2"],
    3: ["normal/nv/3"],
    4: ["normal/nv/4"],
    5: ["normal/nv/5"],
    6: ["normal/nv/6"],
    7: ["normal/nv/7"],
    8: ["normal/nv/8"],
    9: ["normal/nv/9"],
    11: ["normal/nv/11"],
    12: ["normal/nv/12"],
    13: ["normal/nv/13"],
    14: ["normal/nv/14"],
    15: ["normal/nv/15"],
    16: ["normal/nv/16"],
    17: ["normal/nv/17"],
    18: ["normal/nv/18"],
    19: ["normal/nv/19"],
    21: ["normal/nv/21"],
    22: ["normal/nv/22"],
    23: ["normal/nv/23"],
    24: ["normal/nv/24"],
    25: ["normal/nv/25"],
    26: ["normal/nv/26"],
    27: ["normal/nv/27"],
    28: ["normal/nv/28"],
    29: ["normal/nv/29"],
    31: ["normal/nv/31"],
    41: ["normal/nv/41"],
    51: ["normal/nv/51"],
    61: ["normal/nv/61"],
    71: ["normal/nv/71"],
    81: ["normal/nv/81"],
    91: ["normal/nv/91"],
    anDan: ["normal/nv/anDan"],
    chi: ["normal/nv/chi"],
    fangpao: ["normal/nv/fangpao", "normal/nv/fangpao_1"],
    guoDan: ["normal/nv/guoDan"],
    guoBaiBan: ["normal/nv/guoBaiBan"],
    guoLvFa: ["normal/nv/guoLvFa"],
    guoHongZhong: ["normal/nv/guoHongZhong"],
    hu: ["normal/nv/hu"],
    huangjinDan: ["normal/nv/huangjinDan"],
    mingDan: ["normal/nv/mingDan"],
    peng: ["normal/nv/peng"],
    zimo: ["normal/nv/zimo", "normal/nv/zimo_1", "normal/nv/zimo_2"],
};

GameSound4Play[MjClient.GAME_TYPE.YI_YANG_MA_JIANG] = {
    1: ["normal/nv/1"],
    2: ["normal/nv/2"],
    3: ["normal/nv/3"],
    4: ["normal/nv/4"],
    5: ["normal/nv/5"],
    6: ["normal/nv/6"],
    7: ["normal/nv/7"],
    8: ["normal/nv/8"],
    9: ["normal/nv/9"],
    11: ["normal/nv/11"],
    12: ["normal/nv/12"],
    13: ["normal/nv/13"],
    14: ["normal/nv/14"],
    15: ["normal/nv/15"],
    16: ["normal/nv/16"],
    17: ["normal/nv/17"],
    18: ["normal/nv/18"],
    19: ["normal/nv/19"],
    21: ["normal/nv/21"],
    22: ["normal/nv/22"],
    23: ["normal/nv/23"],
    24: ["normal/nv/24"],
    25: ["normal/nv/25"],
    26: ["normal/nv/26"],
    27: ["normal/nv/27"],
    28: ["normal/nv/28"],
    29: ["normal/nv/29"],
    31: ["normal/nv/31"],
    41: ["normal/nv/41"],
    51: ["normal/nv/51"],
    61: ["normal/nv/61"],
    71: ["normal/nv/71"],
    81: ["normal/nv/81"],
    91: ["normal/nv/91"],
    anGang: ["normal/nv/gang"],
    kaiGang: ["normal/nv/gang"],
    chi: ["normal/nv/chi"],
    fangpao: ["normal/nv/fangpao"],
    flower: ["normal/nv/flower"],
    gang: ["normal/nv/gang"],
    gangShangHua: ["normal/nv/gangShangHua"],
    hu: ["normal/nv/hu"],
    peng: ["normal/nv/peng"],
    ting: ["normal/nv/ting"],
    zimo: ["normal/nv/zimo"],
    long: ["normal/nv/long"],
    haiDiHu:["normal/nv/haiDiHu"],
    haoHuaQiXiaoDui:["normal/nv/haoHuaQiXiaoDui"],
    jjHu:["normal/nv/jjHu"],
    ppHu:["normal/nv/ppHu"],
    qiangGangHu:["normal/nv/qiangGangHu"],
    qiXiaoDui:["normal/nv/qiXiaoDui"],
    sameColor:["normal/nv/sameColor"],
};

GameSound4Play[MjClient.GAME_TYPE.CHEN_ZHOU] = {
    1: ["local/nv/1"],
    2: ["local/nv/2"],
    3: ["local/nv/3"],
    4: ["local/nv/4"],
    5: ["local/nv/5"],
    6: ["local/nv/6"],
    7: ["local/nv/7"],
    8: ["local/nv/8"],
    9: ["local/nv/9"],
    11: ["local/nv/11"],
    12: ["local/nv/12"],
    13: ["local/nv/13"],
    14: ["local/nv/14"],
    15: ["local/nv/15"],
    16: ["local/nv/16"],
    17: ["local/nv/17"],
    18: ["local/nv/18"],
    19: ["local/nv/19"],
    21: ["local/nv/21"],
    22: ["local/nv/22"],
    23: ["local/nv/23"],
    24: ["local/nv/24"],
    25: ["local/nv/25"],
    26: ["local/nv/26"],
    27: ["local/nv/27"],
    28: ["local/nv/28"],
    29: ["local/nv/29"],
    71: ["local/nv/71"],
    anGang: ["local/nv/gang"],
    gang: ["local/nv/gang"],
    kaiGang: ["local/nv/gang"],
    chi: ["local/nv/chi"],
    fangpao: ["local/nv/fangpao"],
    flower: ["normal/nv/flower"],
    hu: ["local/nv/hu"],
    peng: ["local/nv/peng"],
    ting: ["normal/nv/ting"],
    zimo: ["local/nv/zimo"],
};

GameSound4Play[MjClient.GAME_TYPE.NAN_XIAN_MJ] = {
    1: ["nanxian/nv/1"],
    2: ["nanxian/nv/2"],
    3: ["nanxian/nv/3"],
    4: ["nanxian/nv/4"],
    5: ["nanxian/nv/5"],
    6: ["nanxian/nv/6"],
    7: ["nanxian/nv/7"],
    8: ["nanxian/nv/8"],
    9: ["nanxian/nv/9"],
    11: ["nanxian/nv/11"],
    12: ["nanxian/nv/12"],
    13: ["nanxian/nv/13"],
    14: ["nanxian/nv/14"],
    15: ["nanxian/nv/15"],
    16: ["nanxian/nv/16"],
    17: ["nanxian/nv/17"],
    18: ["nanxian/nv/18"],
    19: ["nanxian/nv/19"],
    21: ["nanxian/nv/21"],
    22: ["nanxian/nv/22"],
    23: ["nanxian/nv/23"],
    24: ["nanxian/nv/24"],
    25: ["nanxian/nv/25"],
    26: ["nanxian/nv/26"],
    27: ["nanxian/nv/27"],
    28: ["nanxian/nv/28"],
    29: ["nanxian/nv/29"],
    71: ["nanxian/nv/71"],
    anGang: ["nanxian/nv/bu"],
    gang: ["nanxian/nv/gang"],
    kaiGang: ["nanxian/nv/gang"],
    chi: ["nanxian/nv/chi"],
    fangpao: ["nanxian/nv/fangpao"],
    flower: ["nanxian/nv/flower"],
    hu: ["nanxian/nv/hu"],
    peng: ["nanxian/nv/peng"],
    ting: ["nanxian/nv/ting"],
    zimo: ["nanxian/nv/zimo"],
};

GameSound4Play[MjClient.GAME_TYPE.ML_HONGZHONG] = {
    1: ["local/nv/1"],
    2: ["local/nv/2"],
    3: ["local/nv/3"],
    4: ["local/nv/4"],
    5: ["local/nv/5"],
    6: ["local/nv/6"],
    7: ["local/nv/7"],
    8: ["local/nv/8"],
    9: ["local/nv/9"],
    11: ["local/nv/11"],
    12: ["local/nv/12"],
    13: ["local/nv/13"],
    14: ["local/nv/14"],
    15: ["local/nv/15"],
    16: ["local/nv/16"],
    17: ["local/nv/17"],
    18: ["local/nv/18"],
    19: ["local/nv/19"],
    21: ["local/nv/21"],
    22: ["local/nv/22"],
    23: ["local/nv/23"],
    24: ["local/nv/24"],
    25: ["local/nv/25"],
    26: ["local/nv/26"],
    27: ["local/nv/27"],
    28: ["local/nv/28"],
    29: ["local/nv/29"],
    71: ["local/nv/71"],
    anGang: ["local/nv/gang"],
    gang: ["local/nv/gang"],
    kaiGang: ["local/nv/gang"],
    chi: ["local/nv/chi"],
    fangpao: ["local/nv/fangpao"],
    flower: ["normal/nv/flower"],
    hu: ["local/nv/hu"],
    peng: ["local/nv/peng"],
    ting: ["normal/nv/ting"],
    zimo: ["local/nv/zimo"],
};
GameSound4Play[MjClient.GAME_TYPE.ML_HONGZHONG_ZERO] = {
    1: ["local/nv/1"],
    2: ["local/nv/2"],
    3: ["local/nv/3"],
    4: ["local/nv/4"],
    5: ["local/nv/5"],
    6: ["local/nv/6"],
    7: ["local/nv/7"],
    8: ["local/nv/8"],
    9: ["local/nv/9"],
    11: ["local/nv/11"],
    12: ["local/nv/12"],
    13: ["local/nv/13"],
    14: ["local/nv/14"],
    15: ["local/nv/15"],
    16: ["local/nv/16"],
    17: ["local/nv/17"],
    18: ["local/nv/18"],
    19: ["local/nv/19"],
    21: ["local/nv/21"],
    22: ["local/nv/22"],
    23: ["local/nv/23"],
    24: ["local/nv/24"],
    25: ["local/nv/25"],
    26: ["local/nv/26"],
    27: ["local/nv/27"],
    28: ["local/nv/28"],
    29: ["local/nv/29"],
    71: ["local/nv/71"],
    anGang: ["local/nv/gang"],
    gang: ["local/nv/gang"],
    kaiGang: ["local/nv/gang"],
    chi: ["local/nv/chi"],
    fangpao: ["local/nv/fangpao"],
    flower: ["normal/nv/flower"],
    hu: ["local/nv/hu"],
    peng: ["local/nv/peng"],
    ting: ["normal/nv/ting"],
    zimo: ["local/nv/zimo"],
};
GameSound4Play[MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI] = {
    1: ["local/nv/1"],
    2: ["local/nv/2"],
    3: ["local/nv/3"],
    4: ["local/nv/4"],
    5: ["local/nv/5"],
    6: ["local/nv/6"],
    7: ["local/nv/7"],
    8: ["local/nv/8"],
    9: ["local/nv/9"],
    11: ["local/nv/11"],
    12: ["local/nv/12"],
    13: ["local/nv/13"],
    14: ["local/nv/14"],
    15: ["local/nv/15"],
    16: ["local/nv/16"],
    17: ["local/nv/17"],
    18: ["local/nv/18"],
    19: ["local/nv/19"],
    21: ["local/nv/21"],
    22: ["local/nv/22"],
    23: ["local/nv/23"],
    24: ["local/nv/24"],
    25: ["local/nv/25"],
    26: ["local/nv/26"],
    27: ["local/nv/27"],
    28: ["local/nv/28"],
    29: ["local/nv/29"],
    71: ["local/nv/71"],
    anGang: ["local/nv/gang"],
    gang: ["local/nv/gang"],
    kaiGang: ["local/nv/gang"],
    chi: ["local/nv/chi"],
    fangpao: ["local/nv/fangpao"],
    flower: ["normal/nv/bu"],
    hu: ["local/nv/hu"],
    peng: ["local/nv/peng"],
    ting: ["normal/nv/ting"],
    zimo: ["local/nv/zimo"],
};

GameSound4Play[MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG] = {
    1: ["local/nv/1"],
    2: ["local/nv/2"],
    3: ["local/nv/3"],
    4: ["local/nv/4"],
    5: ["local/nv/5"],
    6: ["local/nv/6"],
    7: ["local/nv/7"],
    8: ["local/nv/8"],
    9: ["local/nv/9"],
    11: ["local/nv/11"],
    12: ["local/nv/12"],
    13: ["local/nv/13"],
    14: ["local/nv/14"],
    15: ["local/nv/15"],
    16: ["local/nv/16"],
    17: ["local/nv/17"],
    18: ["local/nv/18"],
    19: ["local/nv/19"],
    21: ["local/nv/21"],
    22: ["local/nv/22"],
    23: ["local/nv/23"],
    24: ["local/nv/24"],
    25: ["local/nv/25"],
    26: ["local/nv/26"],
    27: ["local/nv/27"],
    28: ["local/nv/28"],
    29: ["local/nv/29"],
    71: ["local/nv/71"],
    anGang: ["local/nv/gang"],
    gang: ["local/nv/gang"],
    kaiGang: ["local/nv/gang"],
    chi: ["local/nv/chi"],
    fangpao: ["local/nv/fangpao"],
    flower: ["normal/nv/flower"],
    hu: ["local/nv/hu"],
    peng: ["local/nv/peng"],
    ting: ["normal/nv/ting"],
    zimo: ["local/nv/zimo"]
};

GameSound4Play[MjClient.GAME_TYPE.XU_ZHOU] = {
    1: ["xuzhou/nv/1_0", "xuzhou/nv/1_1", "xuzhou/nv/1_2"],
    2: ["xuzhou/nv/2"],
    3: ["xuzhou/nv/3"],
    4: ["xuzhou/nv/4"],
    5: ["xuzhou/nv/5"],
    6: ["xuzhou/nv/6"],
    7: ["xuzhou/nv/7"],
    8: ["xuzhou/nv/8"],
    9: ["xuzhou/nv/9"],
    11: ["xuzhou/nv/11"],
    12: ["xuzhou/nv/12"],
    13: ["xuzhou/nv/13"],
    14: ["xuzhou/nv/14"],
    15: ["xuzhou/nv/15"],
    16: ["xuzhou/nv/16"],
    17: ["xuzhou/nv/17"],
    18: ["xuzhou/nv/18"],
    19: ["xuzhou/nv/19"],
    21: ["xuzhou/nv/21_0", "xuzhou/nv/21_1"],
    22: ["xuzhou/nv/22"],
    23: ["xuzhou/nv/23"],
    24: ["xuzhou/nv/24"],
    25: ["xuzhou/nv/25"],
    26: ["xuzhou/nv/26"],
    27: ["xuzhou/nv/27"],
    28: ["xuzhou/nv/28"],
    29: ["xuzhou/nv/29"],
    31: ["xuzhou/nv/31"],
    41: ["xuzhou/nv/41"],
    51: ["xuzhou/nv/51"],
    61: ["xuzhou/nv/61"],
    71: ["xuzhou/nv/71_0", "xuzhou/nv/71_1"],
    81: ["xuzhou/nv/81"],
    91: ["xuzhou/nv/91"],
    anGang: ["xuzhou/nv/gang"],
    chi: ["xuzhou/nv/chi_0", "xuzhou/nv/chi_1"],
    fangpao: ["xuzhou/nv/fangpao"],
    flower: ["xuzhou/nv/flower"],
    gang: ["xuzhou/nv/gang"],
    hu: ["xuzhou/nv/hu_0", "xuzhou/nv/hu_1"],
    peng: ["xuzhou/nv/peng_0", "xuzhou/nv/peng_1"],
    ting: ["xuzhou/nv/ting"],
    zimo: ["xuzhou/nv/zimo"]
};

GameSound4Play[MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN] = {
    1: ["xuzhoupeixian/nv/1"],
    2: ["xuzhoupeixian/nv/2"],
    3: ["xuzhoupeixian/nv/3"],
    4: ["xuzhoupeixian/nv/4"],
    5: ["xuzhoupeixian/nv/5"],
    6: ["xuzhoupeixian/nv/6"],
    7: ["xuzhoupeixian/nv/7"],
    8: ["xuzhoupeixian/nv/8"],
    9: ["xuzhoupeixian/nv/9"],
    11: ["xuzhoupeixian/nv/11"],
    12: ["xuzhoupeixian/nv/12"],
    13: ["xuzhoupeixian/nv/13"],
    14: ["xuzhoupeixian/nv/14"],
    15: ["xuzhoupeixian/nv/15"],
    16: ["xuzhoupeixian/nv/16"],
    17: ["xuzhoupeixian/nv/17"],
    18: ["xuzhoupeixian/nv/18"],
    19: ["xuzhoupeixian/nv/19"],
    21: ["xuzhoupeixian/nv/21"],
    22: ["xuzhoupeixian/nv/22"],
    23: ["xuzhoupeixian/nv/23"],
    24: ["xuzhoupeixian/nv/24"],
    25: ["xuzhoupeixian/nv/25"],
    26: ["xuzhoupeixian/nv/26"],
    27: ["xuzhoupeixian/nv/27"],
    28: ["xuzhoupeixian/nv/28"],
    29: ["xuzhoupeixian/nv/29"],
    31: ["xuzhoupeixian/nv/31"],
    41: ["xuzhoupeixian/nv/41"],
    51: ["xuzhoupeixian/nv/51"],
    61: ["xuzhoupeixian/nv/61"],
    71: ["xuzhoupeixian/nv/71"],
    81: ["xuzhoupeixian/nv/81"],
    91: ["xuzhoupeixian/nv/91"],
    anGang: ["xuzhoupeixian/nv/gang"],
    chi: ["xuzhoupeixian/nv/chi"],
    fangpao: ["xuzhoupeixian/nv/fangpao"],
    gang: ["xuzhoupeixian/nv/gang"],
    hu: ["xuzhoupeixian/nv/hu"],
    peng: ["xuzhoupeixian/nv/peng"],
    zimo: ["xuzhoupeixian/nv/zimo", "xuzhoupeixian/nv/zimo1"]
};

GameSound4Play[MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN] = {
    1: ["guandan/nv/1"],
    2: ["guandan/nv/2"],
    3: ["guandan/nv/3"],
    4: ["guandan/nv/4"],
    5: ["guandan/nv/5"],
    6: ["guandan/nv/6"],
    7: ["guandan/nv/7"],
    8: ["guandan/nv/8"],
    9: ["guandan/nv/9"],
    10: ["guandan/nv/10"],
    11: ["guandan/nv/11"],
    12: ["guandan/nv/12"],
    13: ["guandan/nv/13"],

    53: ["guandan/nv/53"],
    54: ["guandan/nv/54"],

    d1: ["guandan/nv/d1"],
    d2: ["guandan/nv/d2"],
    d3: ["guandan/nv/d3"],
    d4: ["guandan/nv/d4"],
    d5: ["guandan/nv/d5"],
    d6: ["guandan/nv/d6"],
    d7: ["guandan/nv/d7"],
    d8: ["guandan/nv/d8"],
    d9: ["guandan/nv/d9"],
    d10: ["guandan/nv/d10"],
    d11: ["guandan/nv/d11"],
    d12: ["guandan/nv/d12"],
    d13: ["guandan/nv/d13"],


    bomb1: ["guandan/nv/bomb_0"],
    bomb2: ["guandan/nv/bomb_1"],
    liandui: ["guandan/nv/liandui"],
    gangban: ["guandan/nv/gangban"],
    sanzhang: ["guandan/nv/sanzhang"],
    shunzi: ["guandan/nv/shunzi"],
    threetwo: ["guandan/nv/threetwo"],
    tonghuashun: ["guandan/nv/tonghuashun"],
    touyou: ["guandan/nv/touyou"],
    pass: ["guandan/nv/pass_0", "guandan/nv/pass_1"]
};

GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI] = {
    1: ["paodekuai/nv/1_1"],
    2: ["paodekuai/nv/1_2"],
    3: ["paodekuai/nv/1_3"],
    4: ["paodekuai/nv/1_4"],
    5: ["paodekuai/nv/1_5"],
    6: ["paodekuai/nv/1_6"],
    7: ["paodekuai/nv/1_7"],
    8: ["paodekuai/nv/1_8"],
    9: ["paodekuai/nv/1_9"],
    10: ["paodekuai/nv/1_10"],
    11: ["paodekuai/nv/1_11"],
    12: ["paodekuai/nv/1_12"],
    13: ["paodekuai/nv/1_13"],

    d1: ["paodekuai/nv/2_1"],
    d2: ["paodekuai/nv/2_2"],
    d3: ["paodekuai/nv/2_3"],
    d4: ["paodekuai/nv/2_4"],
    d5: ["paodekuai/nv/2_5"],
    d6: ["paodekuai/nv/2_6"],
    d7: ["paodekuai/nv/2_7"],
    d8: ["paodekuai/nv/2_8"],
    d9: ["paodekuai/nv/2_9"],
    d10: ["paodekuai/nv/2_10"],
    d11: ["paodekuai/nv/2_11"],
    d12: ["paodekuai/nv/2_12"],
    d13: ["paodekuai/nv/2_13"],

    s1: ["paodekuai/nv/3_1"],
    s2: ["paodekuai/nv/3_2"],
    s3: ["paodekuai/nv/3_3"],
    s4: ["paodekuai/nv/3_4"],
    s5: ["paodekuai/nv/3_5"],
    s6: ["paodekuai/nv/3_6"],
    s7: ["paodekuai/nv/3_7"],
    s8: ["paodekuai/nv/3_8"],
    s9: ["paodekuai/nv/3_9"],
    s10: ["paodekuai/nv/3_10"],
    s11: ["paodekuai/nv/3_11"],
    s12: ["paodekuai/nv/3_12"],
    s13: ["paodekuai/nv/3_13"],

    feiji: ["paodekuai/nv/feiji"],
    bomb1: ["paodekuai/nv/bomb_0"],
    liandui: ["paodekuai/nv/liandui"],
    sandaiyi: ["paodekuai/nv/sandaiyi"],
    sandaier: ["paodekuai/nv/sandaier"],
    sidaiyi: ["paodekuai/nv/sidaiyi"],
    sidaier: ["paodekuai/nv/sidaier"],
    sidaisan: ["paodekuai/nv/sidaisan"],
    shunzi: ["paodekuai/nv/shunzi"],
    ani_zhadan:["paodekuai/nv/ani_bomb"],
    ani_shunzi: ["paodekuai/nv/ani_shunzi"],
    ani_liandui:["paodekuai/nv/ani_liandui"],
    ani_huojian:["paodekuai/nv/ani_rocket"],
    ani_feiji: ["paodekuai/nv/ani_feiji"],
    singer: ["doudizhu/nv/female_singer"],
    pass: ["paodekuai/nv/pass_1", "paodekuai/nv/pass_2"],
    single: ["paodekuai/nv/single_1", "paodekuai/nv/single_2"],
    tonghuashun: ["paodekuai/nv/tonghuashun"],
    tonghuashunDaipai: ["paodekuai/nv/tonghuashunDaipai"],
    clickCards: ["paodekuai/nv/click_cards"],
    playingCards:["paodekuai/nv/Playing_cards"],
};
GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI_TY] = GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI];
GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN] = GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI]; 
GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO] = GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI];
GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI_JZ] = GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI];
GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI_HA] = GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI];
GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW] = GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI];
GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI_LYG] = GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI];
GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI] = GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI];
GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI_NT] = GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI];
GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN] = GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI];
GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU] = GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI];
GameSound4Play[MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY] = GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI];
GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY] = GameSound4Play[MjClient.GAME_TYPE.PAO_DE_KUAI];

GameSound4Play["guizhou"]  = {
    1: ["guizhou/nv/1"],
    2: ["guizhou/nv/2"],
    3: ["guizhou/nv/3"],
    4: ["guizhou/nv/4"],
    5: ["guizhou/nv/5"],
    6: ["guizhou/nv/6"],
    7: ["guizhou/nv/7"],
    8: ["guizhou/nv/8"],
    9: ["guizhou/nv/9"],
    11: ["guizhou/nv/11"],
    12: ["guizhou/nv/12"],
    13: ["guizhou/nv/13"],
    14: ["guizhou/nv/14"],
    15: ["guizhou/nv/15"],
    16: ["guizhou/nv/16"],
    17: ["guizhou/nv/17"],
    18: ["guizhou/nv/18"],
    19: ["guizhou/nv/19"],
    21: ["guizhou/nv/21"],
    22: ["guizhou/nv/22"],
    23: ["guizhou/nv/23"],
    24: ["guizhou/nv/24"],
    25: ["guizhou/nv/25"],
    26: ["guizhou/nv/26"],
    27: ["guizhou/nv/27"],
    28: ["guizhou/nv/28"],
    29: ["guizhou/nv/29"],
    31: ["guizhou/nv/31"],
    41: ["guizhou/nv/41"],
    51: ["guizhou/nv/51"],
    61: ["guizhou/nv/61"],
    71: ["guizhou/nv/71"],
    81: ["guizhou/nv/81"],
    91: ["guizhou/nv/91"],
    anGang: ["guizhou/nv/gang"],
    kaiGang: ["guizhou/nv/gang"],
    chi: ["guizhou/nv/chi"],
    fangpao: ["guizhou/nv/fangpao","guizhou/nv/fangpao_1"],
    flower: ["guizhou/nv/flower"],
    gang: ["guizhou/nv/gang","guizhou/nv/gang_1"],
    gangshangkaihua: ["guizhou/nv/gangshangkaihua"],
    hu: ["guizhou/nv/hu"],
    peng: ["guizhou/nv/peng","guizhou/nv/peng_1"],
    ting: ["guizhou/nv/ting"],
    zimo: ["guizhou/nv/zimo","guizhou/nv/zimo_1"],
    long: ["normal/nv/long"],
    qinghu: ["normal/nv/qinghu"],
    quanhun: ["normal/nv/quanhun"],
    jiabei:["normal/nv/jiabei"],
    bujiabei:["normal/nv/bujiabei"]
};
GameSound4Play[MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ]  = GameSound4Play["guizhou"];
GameSound4Play[MjClient.GAME_TYPE.GUI_ZHOU_AN_SHUN_MJ]  = GameSound4Play["guizhou"];
GameSound4Play[MjClient.GAME_TYPE.GUI_ZHOU_LIANG_DING_LIANG_FANG]  = GameSound4Play["guizhou"];
GameSound4Play[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_LIANG_FANG]  = GameSound4Play["guizhou"];



GameSound4Play[MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI]  = {
    //安化新增普通话 用郴州字牌的
    1:["chenzhouzipai/nv/1", "anhua/nv/1"],
    2:["chenzhouzipai/nv/2", "anhua/nv/2"],
    3:["chenzhouzipai/nv/3", "anhua/nv/3"],
    4:["chenzhouzipai/nv/4", "anhua/nv/4"],
    5:["chenzhouzipai/nv/5", "anhua/nv/5"],
    6:["chenzhouzipai/nv/6", "anhua/nv/6"],
    7:["chenzhouzipai/nv/7", "anhua/nv/7"],
    8:["chenzhouzipai/nv/8", "anhua/nv/8"],
    9:["chenzhouzipai/nv/9", "anhua/nv/9"],
    10:["chenzhouzipai/nv/10", "anhua/nv/10"],
    21:["chenzhouzipai/nv/21", "anhua/nv/21"],
    22:["chenzhouzipai/nv/22", "anhua/nv/22"],
    23:["chenzhouzipai/nv/23", "anhua/nv/23"],
    24:["chenzhouzipai/nv/24", "anhua/nv/24"],
    25:["chenzhouzipai/nv/25", "anhua/nv/25"],
    26:["chenzhouzipai/nv/26", "anhua/nv/26"],
    27:["chenzhouzipai/nv/27", "anhua/nv/27"],
    28:["chenzhouzipai/nv/28", "anhua/nv/28"],
    29:["chenzhouzipai/nv/29", "anhua/nv/29"],
    30:["chenzhouzipai/nv/30", "anhua/nv/30"],
    bi:["chenzhouzipai/nv/bi", "anhua/nv/bi"],
    chi:["chenzhouzipai/nv/chi", "anhua/nv/chi"],
    wei:["chenzhouzipai/nv/wei", "anhua/nv/wei"],
    chouwei:["chenzhouzipai/nv/chouwei", "anhua/nv/chouwei"],
    zimo:["chenzhouzipai/nv/zimo", "anhua/nv/zimo"],
    pao:["chenzhouzipai/nv/pao", "anhua/nv/pao"],
    hu:["chenzhouzipai/nv/hu", "anhua/nv/hu"],
    peng:["chenzhouzipai/nv/peng", "anhua/nv/peng"],
    ti:["chenzhouzipai/nv/ti", "anhua/nv/ti"],
    fangpao:["chenzhouzipai/nv/fangpao", "anhua/nv/fangpao"],
};

GameSound4Play[MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI]   = {
    1:["chenzhouzipai/nv/1","chenzhouzipai/nv_local/1"],
    2:["chenzhouzipai/nv/2","chenzhouzipai/nv_local/2"],
    3:["chenzhouzipai/nv/3","chenzhouzipai/nv_local/3"],
    4:["chenzhouzipai/nv/4","chenzhouzipai/nv_local/4"],
    5:["chenzhouzipai/nv/5","chenzhouzipai/nv_local/5"],
    6:["chenzhouzipai/nv/6","chenzhouzipai/nv_local/6"],
    7:["chenzhouzipai/nv/7","chenzhouzipai/nv_local/7"],
    8:["chenzhouzipai/nv/8","chenzhouzipai/nv_local/8"],
    9:["chenzhouzipai/nv/9","chenzhouzipai/nv_local/9"],
    10:["chenzhouzipai/nv/10","chenzhouzipai/nv_local/10"],
    21:["chenzhouzipai/nv/21","chenzhouzipai/nv_local/21"],
    22:["chenzhouzipai/nv/22","chenzhouzipai/nv_local/22"],
    23:["chenzhouzipai/nv/23","chenzhouzipai/nv_local/23"],
    24:["chenzhouzipai/nv/24","chenzhouzipai/nv_local/24"],
    25:["chenzhouzipai/nv/25","chenzhouzipai/nv_local/25"],
    26:["chenzhouzipai/nv/26","chenzhouzipai/nv_local/26"],
    27:["chenzhouzipai/nv/27","chenzhouzipai/nv_local/27"],
    28:["chenzhouzipai/nv/28","chenzhouzipai/nv_local/28"],
    29:["chenzhouzipai/nv/29","chenzhouzipai/nv_local/29"],
    30:["chenzhouzipai/nv/30","chenzhouzipai/nv_local/30"],
    bi:["chenzhouzipai/nv/bi","chenzhouzipai/nv_local/bi"],
    chi:["chenzhouzipai/nv/chi","chenzhouzipai/nv_local/chi"],
    wei:["chenzhouzipai/nv/wei","chenzhouzipai/nv_local/wei"],
    chouwei:["chenzhouzipai/nv/chouwei","chenzhouzipai/nv_local/chouwei"],
    hu:["chenzhouzipai/nv/hu","chenzhouzipai/nv_local/hu"],
    zimo:["chenzhouzipai/nv/zimo","chenzhouzipai/nv_local/zimo"],
    pao:["chenzhouzipai/nv/pao","chenzhouzipai/nv_local/pao"],
    peng:["chenzhouzipai/nv/peng","chenzhouzipai/nv_local/peng"],
    ti:["chenzhouzipai/nv/ti","chenzhouzipai/nv_local/ti"],
    fangpao:["chenzhouzipai/nv/fangpao","chenzhouzipai/nv_local/fangpao"],
};
GameSound4Play[MjClient.GAME_TYPE.XIANG_XI_2710] = GameSound4Play[MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI];
GameSound4Play[MjClient.GAME_TYPE.GUI_YANG_ZI_PAI] = GameSound4Play[MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI];
GameSound4Play[MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI] = GameSound4Play[MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI];

GameSound4Play[MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI] = {
    1:["chenzhouzipai/nv/1","changdepaohuzi/nv_local/1"],
    2:["chenzhouzipai/nv/2","changdepaohuzi/nv_local/2"],
    3:["chenzhouzipai/nv/3","changdepaohuzi/nv_local/3"],
    4:["chenzhouzipai/nv/4","changdepaohuzi/nv_local/4"],
    5:["chenzhouzipai/nv/5","changdepaohuzi/nv_local/5"],
    6:["chenzhouzipai/nv/6","changdepaohuzi/nv_local/6"],
    7:["chenzhouzipai/nv/7","changdepaohuzi/nv_local/7"],
    8:["chenzhouzipai/nv/8","changdepaohuzi/nv_local/8"],
    9:["chenzhouzipai/nv/9","changdepaohuzi/nv_local/9"],
    10:["chenzhouzipai/nv/10","changdepaohuzi/nv_local/10"],
    21:["chenzhouzipai/nv/21","changdepaohuzi/nv_local/21"],
    22:["chenzhouzipai/nv/22","changdepaohuzi/nv_local/22"],
    23:["chenzhouzipai/nv/23","changdepaohuzi/nv_local/23"],
    24:["chenzhouzipai/nv/24","changdepaohuzi/nv_local/24"],
    25:["chenzhouzipai/nv/25","changdepaohuzi/nv_local/25"],
    26:["chenzhouzipai/nv/26","changdepaohuzi/nv_local/26"],
    27:["chenzhouzipai/nv/27","changdepaohuzi/nv_local/27"],
    28:["chenzhouzipai/nv/28","changdepaohuzi/nv_local/28"],
    29:["chenzhouzipai/nv/29","changdepaohuzi/nv_local/29"],
    30:["chenzhouzipai/nv/30","changdepaohuzi/nv_local/30"],
    bi:["chenzhouzipai/nv/bi","changdepaohuzi/nv_local/bi"],
    chi:["chenzhouzipai/nv/chi","changdepaohuzi/nv_local/chi"],
    wei:["chenzhouzipai/nv/wei","changdepaohuzi/nv_local/wei"],
    chouwei:["chenzhouzipai/nv/chouwei","changdepaohuzi/nv_local/chouwei"],
    hu:["chenzhouzipai/nv/hu","changdepaohuzi/nv_local/hu"],
    zimo:["chenzhouzipai/nv/zimo","changdepaohuzi/nv_local/zimo"],
    pao:["chenzhouzipai/nv/pao","changdepaohuzi/nv_local/pao"],
    peng:["chenzhouzipai/nv/peng","changdepaohuzi/nv_local/peng"],
    ti:["chenzhouzipai/nv/ti","changdepaohuzi/nv_local/ti"],
    fangpao:["chenzhouzipai/nv/fangpao","changdepaohuzi/nv_local/fangpao"],
};
GameSound4Play[MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI] = GameSound4Play[MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI];
GameSound4Play[MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI] = GameSound4Play[MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI];

GameSound4Play[MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI] = {
    1:["chenzhouzipai/nv/1","changdepaohuzi/nv_local/1"],
    2:["chenzhouzipai/nv/2","changdepaohuzi/nv_local/2"],
    3:["chenzhouzipai/nv/3","changdepaohuzi/nv_local/3"],
    4:["chenzhouzipai/nv/4","changdepaohuzi/nv_local/4"],
    5:["chenzhouzipai/nv/5","changdepaohuzi/nv_local/5"],
    6:["chenzhouzipai/nv/6","changdepaohuzi/nv_local/6"],
    7:["chenzhouzipai/nv/7","changdepaohuzi/nv_local/7"],
    8:["chenzhouzipai/nv/8","changdepaohuzi/nv_local/8"],
    9:["chenzhouzipai/nv/9","changdepaohuzi/nv_local/9"],
    10:["chenzhouzipai/nv/10","changdepaohuzi/nv_local/10"],
    21:["chenzhouzipai/nv/21","changdepaohuzi/nv_local/21"],
    22:["chenzhouzipai/nv/22","changdepaohuzi/nv_local/22"],
    23:["chenzhouzipai/nv/23","changdepaohuzi/nv_local/23"],
    24:["chenzhouzipai/nv/24","changdepaohuzi/nv_local/24"],
    25:["chenzhouzipai/nv/25","changdepaohuzi/nv_local/25"],
    26:["chenzhouzipai/nv/26","changdepaohuzi/nv_local/26"],
    27:["chenzhouzipai/nv/27","changdepaohuzi/nv_local/27"],
    28:["chenzhouzipai/nv/28","changdepaohuzi/nv_local/28"],
    29:["chenzhouzipai/nv/29","changdepaohuzi/nv_local/29"],
    30:["chenzhouzipai/nv/30","changdepaohuzi/nv_local/30"],
    bi:["chenzhouzipai/nv/bi","changdepaohuzi/nv_local/bi"],
    chi:["chenzhouzipai/nv/chi","changdepaohuzi/nv_local/chi"],
    wei:["chenzhouzipai/nv/wei","changdepaohuzi/nv_local/wei"],
    chouwei:["chenzhouzipai/nv/chouwei","changdepaohuzi/nv_local/chouwei"],
    hu:["chenzhouzipai/nv/hu","changdepaohuzi/nv_local/hu"],
    zimo:["chenzhouzipai/nv/zimo","changdepaohuzi/nv_local/zimo"],
    pao:["chenzhouzipai/nv/pao","changdepaohuzi/nv_local/pao"],
    peng:["chenzhouzipai/nv/peng","changdepaohuzi/nv_local/peng"],
    ti:["chenzhouzipai/nv/ti","changdepaohuzi/nv_local/ti"],
    fangpao:["chenzhouzipai/nv/fangpao","changdepaohuzi/nv_local/fangpao"],
};

GameSound4Play[MjClient.GAME_TYPE.YUE_YANG_PENG_HU] = {
    1: ["penghu/nv/1", "penghu/nv_local/1"],
    2: ["penghu/nv/2", "penghu/nv_local/2"],
    3: ["penghu/nv/3", "penghu/nv_local/3"],
    4: ["penghu/nv/4", "penghu/nv_local/4"],
    5: ["penghu/nv/5", "penghu/nv_local/5"],
    6: ["penghu/nv/6", "penghu/nv_local/6"],
    7: ["penghu/nv/7", "penghu/nv_local/7"],
    8: ["penghu/nv/8", "penghu/nv_local/8"],
    9: ["penghu/nv/9", "penghu/nv_local/9"],
    10: ["penghu/nv/10", "penghu/nv_local/10"],
    21: ["penghu/nv/21", "penghu/nv_local/21"],
    22: ["penghu/nv/22", "penghu/nv_local/22"],
    23: ["penghu/nv/23", "penghu/nv_local/23"],
    24: ["penghu/nv/24", "penghu/nv_local/24"],
    25: ["penghu/nv/25", "penghu/nv_local/25"],
    26: ["penghu/nv/26", "penghu/nv_local/26"],
    27: ["penghu/nv/27", "penghu/nv_local/27"],
    28: ["penghu/nv/28", "penghu/nv_local/28"],
    29: ["penghu/nv/29", "penghu/nv_local/29"],
    30: ["penghu/nv/30", "penghu/nv_local/30"],
    baojing: ["penghu/nv/baojing", "penghu/nv_local/baojing"],
    bi: ["penghu/nv/bi", "penghu/nv_local/bi"],
    chi: ["penghu/nv/chi", "penghu/nv_local/chi"],
    hu: ["penghu/nv/hu", "penghu/nv_local/hu"],
    hu_dihu: ["penghu/nv/hu_dihu", "penghu/nv_local/hu_dihu"],
    hu_paohu: ["penghu/nv/hu_paohu", "penghu/nv_local/hu_paohu"],
    hu_penghu: ["penghu/nv/hu_penghu", "penghu/nv_local/hu_penghu"],
    hu_saohu: ["penghu/nv/hu_saohu", "penghu/nv_local/hu_saohu"],
    pao: ["penghu/nv/pao", "penghu/nv_local/pao"],
    peng: ["penghu/nv/peng", "penghu/nv_local/peng"],
    peng3: ["penghu/nv/peng3", "penghu/nv_local/peng3"],
    peng4: ["penghu/nv/peng4", "penghu/nv_local/peng4"],
    wei: ["penghu/nv/wei", "penghu/nv_local/wei"],
    wei3: ["penghu/nv/wei3", "penghu/nv_local/wei3"],
    wei4: ["penghu/nv/wei4", "penghu/nv_local/wei4"],
    shuanglong: ["penghu/nv/shuanglong", "penghu/nv_local/shuanglong"],
    ti: ["penghu/nv/ti", "penghu/nv_local/ti"],
    tianhu: ["penghu/nv/tianhu", "penghu/nv_local/tianhu"],
};

//宁乡跑胡子 普通话用郴州字牌的
GameSound4Play[MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI]  = {
    1:["chenzhouzipai/nv/1","ningxiangpaohuzi/nv_local/1"],
    2:["chenzhouzipai/nv/2","ningxiangpaohuzi/nv_local/2"],
    3:["chenzhouzipai/nv/3","ningxiangpaohuzi/nv_local/3"],
    4:["chenzhouzipai/nv/4","ningxiangpaohuzi/nv_local/4"],
    5:["chenzhouzipai/nv/5","ningxiangpaohuzi/nv_local/5"],
    6:["chenzhouzipai/nv/6","ningxiangpaohuzi/nv_local/6"],
    7:["chenzhouzipai/nv/7","ningxiangpaohuzi/nv_local/7"],
    8:["chenzhouzipai/nv/8","ningxiangpaohuzi/nv_local/8"],
    9:["chenzhouzipai/nv/9","ningxiangpaohuzi/nv_local/9"],
    10:["chenzhouzipai/nv/10","ningxiangpaohuzi/nv_local/10"],
    21:["chenzhouzipai/nv/21","ningxiangpaohuzi/nv_local/21"],
    22:["chenzhouzipai/nv/22","ningxiangpaohuzi/nv_local/22"],
    23:["chenzhouzipai/nv/23","ningxiangpaohuzi/nv_local/23"],
    24:["chenzhouzipai/nv/24","ningxiangpaohuzi/nv_local/24"],
    25:["chenzhouzipai/nv/25","ningxiangpaohuzi/nv_local/25"],
    26:["chenzhouzipai/nv/26","ningxiangpaohuzi/nv_local/26"],
    27:["chenzhouzipai/nv/27","ningxiangpaohuzi/nv_local/27"],
    28:["chenzhouzipai/nv/28","ningxiangpaohuzi/nv_local/28"],
    29:["chenzhouzipai/nv/29","ningxiangpaohuzi/nv_local/29"],
    30:["chenzhouzipai/nv/30","ningxiangpaohuzi/nv_local/30"],
    bi:["chenzhouzipai/nv/bi","ningxiangpaohuzi/nv_local/bi"],
    chi:["chenzhouzipai/nv/chi","ningxiangpaohuzi/nv_local/chi"],
    wei:["chenzhouzipai/nv/wei","ningxiangpaohuzi/nv_local/wei"],
    chouwei:["chenzhouzipai/nv/chouwei","ningxiangpaohuzi/nv_local/chouwei"],
    hu:["chenzhouzipai/nv/hu","ningxiangpaohuzi/nv_local/hu"],
    zimo:["chenzhouzipai/nv/zimo","ningxiangpaohuzi/nv_local/zimo"],
    pao:["chenzhouzipai/nv/pao","ningxiangpaohuzi/nv_local/pao"],
    peng:["chenzhouzipai/nv/peng","ningxiangpaohuzi/nv_local/peng"],
    ti:["chenzhouzipai/nv/ti","ningxiangpaohuzi/nv_local/ti"],
    fangpao:["chenzhouzipai/nv/fangpao","ningxiangpaohuzi/nv_local/fangpao"],
};

GameSound4Play[MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI] = {
    jiao0: ["sanDaHa/nv/callpoint/cp_0"],
    jiao5: ["sanDaHa/nv/callpoint/cp_5"],
    jiao10: ["sanDaHa/nv/callpoint/cp_10"],
    jiao15: ["sanDaHa/nv/callpoint/cp_15"],
    jiao20: ["sanDaHa/nv/callpoint/cp_20"],
    jiao25: ["sanDaHa/nv/callpoint/cp_25"],
    jiao30: ["sanDaHa/nv/callpoint/cp_30"],
    jiao35: ["sanDaHa/nv/callpoint/cp_35"],
    jiao40: ["sanDaHa/nv/callpoint/cp_40"],
    jiao45: ["sanDaHa/nv/callpoint/cp_45"],
    jiao50: ["sanDaHa/nv/callpoint/cp_50"],
    jiao55: ["sanDaHa/nv/callpoint/cp_55"],
    jiao60: ["sanDaHa/nv/callpoint/cp_60"],
    jiao65: ["sanDaHa/nv/callpoint/cp_65"],
    jiao70: ["sanDaHa/nv/callpoint/cp_70"],
    jiao75: ["sanDaHa/nv/callpoint/cp_75"],
    jiao80: ["sanDaHa/nv/callpoint/cp_80"],
    jiao85: ["sanDaHa/nv/callpoint/cp_85"],
    jiao90: ["sanDaHa/nv/callpoint/cp_90"],
    jiao95: ["sanDaHa/nv/callpoint/cp_95"],
    jiao100: ["sanDaHa/nv/callpoint/cp_100"],

    jiao105: ["sanDaHa/nv/callpoint/cp_105"],
    jiao110: ["sanDaHa/nv/callpoint/cp_110"],
    jiao115: ["sanDaHa/nv/callpoint/cp_115"],
    jiao120: ["sanDaHa/nv/callpoint/cp_120"],
    jiao125: ["sanDaHa/nv/callpoint/cp_125"],
    jiao130: ["sanDaHa/nv/callpoint/cp_130"],
    jiao135: ["sanDaHa/nv/callpoint/cp_135"],
    jiao140: ["sanDaHa/nv/callpoint/cp_140"],
    jiao145: ["sanDaHa/nv/callpoint/cp_145"],
    jiao150: ["sanDaHa/nv/callpoint/cp_150"],
    jiao155: ["sanDaHa/nv/callpoint/cp_155"],
    jiao160: ["sanDaHa/nv/callpoint/cp_160"],
    jiao165: ["sanDaHa/nv/callpoint/cp_165"],
    jiao170: ["sanDaHa/nv/callpoint/cp_170"],
    jiao175: ["sanDaHa/nv/callpoint/cp_175"],
    jiao180: ["sanDaHa/nv/callpoint/cp_180"],
    jiao185: ["sanDaHa/nv/callpoint/cp_185"],
    jiao190: ["sanDaHa/nv/callpoint/cp_190"],
    jiao195: ["sanDaHa/nv/callpoint/cp_195"],
    jiao200: ["sanDaHa/nv/callpoint/cp_200"],

    oneCard: ["sanDaHa/nv/cardtype/oneCard"],
    oneMainCard: ["sanDaHa/nv/cardtype/oneMainCard"],
    pair: ["sanDaHa/nv/cardtype/pair"],
    pairsMain: ["sanDaHa/nv/cardtype/pairsMain"],
    swingcard: ["sanDaHa/nv/cardtype/swingcard"],
    tractor: ["sanDaHa/nv/cardtype/tractor"],
    tractormain: ["sanDaHa/nv/cardtype/tractormain"],

    fangkuai: ["sanDaHa/nv/choosecolor/fangkuai"],
    heitao: ["sanDaHa/nv/choosecolor/heitao"],
    hongtao: ["sanDaHa/nv/choosecolor/hongtao"],
    meihua: ["sanDaHa/nv/choosecolor/meihua"],
    wu: ["sanDaHa/nv/choosecolor/wuzhu"],

    danpai_1: ["sanDaHa/nv/cardtype/danpai_1"],
    danpai_2: ["sanDaHa/nv/cardtype/danpai_2"],
    danpai_3: ["sanDaHa/nv/cardtype/danpai_3"],
    danpai_4: ["sanDaHa/nv/cardtype/danpai_4"],
    danpai_5: ["sanDaHa/nv/cardtype/danpai_5"],
    danpai_6: ["sanDaHa/nv/cardtype/danpai_6"],
    danpai_7: ["sanDaHa/nv/cardtype/danpai_7"],
    danpai_8: ["sanDaHa/nv/cardtype/danpai_8"],
    danpai_9: ["sanDaHa/nv/cardtype/danpai_9"],
    danpai_10: ["sanDaHa/nv/cardtype/danpai_10"],
    danpai_11: ["sanDaHa/nv/cardtype/danpai_11"],
    danpai_12: ["sanDaHa/nv/cardtype/danpai_12"],
    danpai_13: ["sanDaHa/nv/cardtype/danpai_13"],
    danpai_14: ["sanDaHa/nv/cardtype/danpai_14"],
    danpai_15: ["sanDaHa/nv/cardtype/danpai_15"],

    duiPai_1: ["sanDaHa/nv/cardtype/duiPai_1"],
    duiPai_2: ["sanDaHa/nv/cardtype/duiPai_2"],
    duiPai_3: ["sanDaHa/nv/cardtype/duiPai_3"],
    duiPai_4: ["sanDaHa/nv/cardtype/duiPai_4"],
    duiPai_5: ["sanDaHa/nv/cardtype/duiPai_5"],
    duiPai_6: ["sanDaHa/nv/cardtype/duiPai_6"],
    duiPai_7: ["sanDaHa/nv/cardtype/duiPai_7"],
    duiPai_8: ["sanDaHa/nv/cardtype/duiPai_8"],
    duiPai_9: ["sanDaHa/nv/cardtype/duiPai_9"],
    duiPai_10: ["sanDaHa/nv/cardtype/duiPai_10"],
    duiPai_11: ["sanDaHa/nv/cardtype/duiPai_11"],
    duiPai_12: ["sanDaHa/nv/cardtype/duiPai_12"],
    duiPai_13: ["sanDaHa/nv/cardtype/duiPai_13"],
    duiPai_14: ["sanDaHa/nv/cardtype/duiPai_14"],
    duiPai_15: ["sanDaHa/nv/cardtype/duiPai_15"],

    bigger_1: ["sanDaHa/nv/cardtype/bigger_1"],
    bigger_2: ["sanDaHa/nv/cardtype/bigger_2"],
    bile: ["sanDaHa/nv/cardtype/bile"],
    dianpai: ["sanDaHa/nv/cardtype/dianpai"],
    diaozhu: ["sanDaHa/nv/cardtype/diaozhu"],
    gaibi: ["sanDaHa/nv/cardtype/gaibi"],
    swingcard: ["sanDaHa/nv/cardtype/swingcard"],


    liuju: ["sanDaHa/effect/audio_liuju"],
    getScore: ["sanDaHa/effect/getScore"],
    lose: ["sanDaHa/effect/lose"],
    win: ["sanDaHa/effect/win"],
    win_1: ["sanDaHa/nv/win_1"],
};

GameSound4Play[MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO] = {
    jiao0: ["sanDaHa/nv/callpoint/cp_0"],
    jiao5: ["sanDaHa/nv/callpoint/cp_5"],
    jiao10: ["sanDaHa/nv/callpoint/cp_10"],
    jiao15: ["sanDaHa/nv/callpoint/cp_15"],
    jiao20: ["sanDaHa/nv/callpoint/cp_20"],
    jiao25: ["sanDaHa/nv/callpoint/cp_25"],
    jiao30: ["sanDaHa/nv/callpoint/cp_30"],
    jiao35: ["sanDaHa/nv/callpoint/cp_35"],
    jiao40: ["sanDaHa/nv/callpoint/cp_40"],
    jiao45: ["sanDaHa/nv/callpoint/cp_45"],
    jiao50: ["sanDaHa/nv/callpoint/cp_50"],
    jiao55: ["sanDaHa/nv/callpoint/cp_55"],
    jiao60: ["sanDaHa/nv/callpoint/cp_60"],
    jiao65: ["sanDaHa/nv/callpoint/cp_65"],
    jiao70: ["sanDaHa/nv/callpoint/cp_70"],
    jiao75: ["sanDaHa/nv/callpoint/cp_75"],
    jiao80: ["sanDaHa/nv/callpoint/cp_80"],
    jiao85: ["sanDaHa/nv/callpoint/cp_85"],
    jiao90: ["sanDaHa/nv/callpoint/cp_90"],
    jiao95: ["sanDaHa/nv/callpoint/cp_95"],
    jiao100: ["sanDaHa/nv/callpoint/cp_100"],

    oneCard: ["sanDaHa/nv/cardtype/oneCard"],
    oneMainCard: ["sanDaHa/nv/cardtype/oneMainCard"],
    pair: ["sanDaHa/nv/cardtype/pair"],
    pairsMain: ["sanDaHa/nv/cardtype/pairsMain"],
    swingcard: ["sanDaHa/nv/cardtype/swingcard"],
    tractor: ["sanDaHa/nv/cardtype/tractor"],
    tractormain: ["sanDaHa/nv/cardtype/tractormain"],

    fangkuai: ["sanDaHa/nv/choosecolor/fangkuai"],
    heitao: ["sanDaHa/nv/choosecolor/heitao"],
    hongtao: ["sanDaHa/nv/choosecolor/hongtao"],
    meihua: ["sanDaHa/nv/choosecolor/meihua"],
    wu: ["sanDaHa/nv/choosecolor/wuzhu"],

    danpai_1: ["sanDaHa/nv/cardtype/danpai_1"],
    danpai_2: ["sanDaHa/nv/cardtype/danpai_2"],
    danpai_3: ["sanDaHa/nv/cardtype/danpai_3"],
    danpai_4: ["sanDaHa/nv/cardtype/danpai_4"],
    danpai_5: ["sanDaHa/nv/cardtype/danpai_5"],
    danpai_6: ["sanDaHa/nv/cardtype/danpai_6"],
    danpai_7: ["sanDaHa/nv/cardtype/danpai_7"],
    danpai_8: ["sanDaHa/nv/cardtype/danpai_8"],
    danpai_9: ["sanDaHa/nv/cardtype/danpai_9"],
    danpai_10: ["sanDaHa/nv/cardtype/danpai_10"],
    danpai_11: ["sanDaHa/nv/cardtype/danpai_11"],
    danpai_12: ["sanDaHa/nv/cardtype/danpai_12"],
    danpai_13: ["sanDaHa/nv/cardtype/danpai_13"],
    danpai_14: ["sanDaHa/nv/cardtype/danpai_14"],
    danpai_15: ["sanDaHa/nv/cardtype/danpai_15"],

    duiPai_1: ["sanDaHa/nv/cardtype/duiPai_1"],
    duiPai_2: ["sanDaHa/nv/cardtype/duiPai_2"],
    duiPai_3: ["sanDaHa/nv/cardtype/duiPai_3"],
    duiPai_4: ["sanDaHa/nv/cardtype/duiPai_4"],
    duiPai_5: ["sanDaHa/nv/cardtype/duiPai_5"],
    duiPai_6: ["sanDaHa/nv/cardtype/duiPai_6"],
    duiPai_7: ["sanDaHa/nv/cardtype/duiPai_7"],
    duiPai_8: ["sanDaHa/nv/cardtype/duiPai_8"],
    duiPai_9: ["sanDaHa/nv/cardtype/duiPai_9"],
    duiPai_10: ["sanDaHa/nv/cardtype/duiPai_10"],
    duiPai_11: ["sanDaHa/nv/cardtype/duiPai_11"],
    duiPai_12: ["sanDaHa/nv/cardtype/duiPai_12"],
    duiPai_13: ["sanDaHa/nv/cardtype/duiPai_13"],
    duiPai_14: ["sanDaHa/nv/cardtype/duiPai_14"],
    duiPai_15: ["sanDaHa/nv/cardtype/duiPai_15"],

    bigger_1: ["sanDaHa/nv/cardtype/bigger_1"],
    bigger_2: ["sanDaHa/nv/cardtype/bigger_2"],
    bile: ["sanDaHa/nv/cardtype/bile"],
    dianpai: ["sanDaHa/nv/cardtype/dianpai"],
    diaozhu: ["sanDaHa/nv/cardtype/diaozhu"],
    gaibi: ["sanDaHa/nv/cardtype/gaibi"],
    swingcard: ["sanDaHa/nv/cardtype/swingcard"],


    liuju: ["sanDaHa/effect/audio_liuju"],
    getScore: ["sanDaHa/effect/getScore"],
    lose: ["sanDaHa/effect/lose"],
    win: ["sanDaHa/effect/win"],
    win_1: ["sanDaHa/nv/win_1"],
};

GameSound4Play[MjClient.GAME_TYPE.SAN_DA_HA] = {
    jiao0: ["sanDaHa/nv/callpoint/cp_0"],
    jiao5: ["sanDaHa/nv/callpoint/cp_5"],
    jiao10: ["sanDaHa/nv/callpoint/cp_10"],
    jiao15: ["sanDaHa/nv/callpoint/cp_15"],
    jiao20: ["sanDaHa/nv/callpoint/cp_20"],
    jiao25: ["sanDaHa/nv/callpoint/cp_25"],
    jiao30: ["sanDaHa/nv/callpoint/cp_30"],
    jiao35: ["sanDaHa/nv/callpoint/cp_35"],
    jiao40: ["sanDaHa/nv/callpoint/cp_40"],
    jiao45: ["sanDaHa/nv/callpoint/cp_45"],
    jiao50: ["sanDaHa/nv/callpoint/cp_50"],
    jiao55: ["sanDaHa/nv/callpoint/cp_55"],
    jiao60: ["sanDaHa/nv/callpoint/cp_60"],
    jiao65: ["sanDaHa/nv/callpoint/cp_65"],
    jiao70: ["sanDaHa/nv/callpoint/cp_70"],
    jiao75: ["sanDaHa/nv/callpoint/cp_75"],
    jiao80: ["sanDaHa/nv/callpoint/cp_80"],
    jiao85: ["sanDaHa/nv/callpoint/cp_85"],
    jiao90: ["sanDaHa/nv/callpoint/cp_90"],
    jiao95: ["sanDaHa/nv/callpoint/cp_95"],
    jiao100: ["sanDaHa/nv/callpoint/cp_100"],

    oneCard: ["sanDaHa/nv/cardtype/oneCard"],
    oneMainCard: ["sanDaHa/nv/cardtype/oneMainCard"],
    pair: ["sanDaHa/nv/cardtype/pair"],
    pairsMain: ["sanDaHa/nv/cardtype/pairsMain"],
    swingcard: ["sanDaHa/nv/cardtype/swingcard"],
    tractor: ["sanDaHa/nv/cardtype/tractor"],
    tractormain: ["sanDaHa/nv/cardtype/tractormain"],

    fangkuai: ["sanDaHa/nv/choosecolor/fangkuai"],
    heitao: ["sanDaHa/nv/choosecolor/heitao"],
    hongtao: ["sanDaHa/nv/choosecolor/hongtao"],
    meihua: ["sanDaHa/nv/choosecolor/meihua"],
    wu: ["sanDaHa/nv/choosecolor/wuzhu"],

    danpai_1: ["sanDaHa/nv/cardtype/danpai_1"],
    danpai_2: ["sanDaHa/nv/cardtype/danpai_2"],
    danpai_3: ["sanDaHa/nv/cardtype/danpai_3"],
    danpai_4: ["sanDaHa/nv/cardtype/danpai_4"],
    danpai_5: ["sanDaHa/nv/cardtype/danpai_5"],
    danpai_6: ["sanDaHa/nv/cardtype/danpai_6"],
    danpai_7: ["sanDaHa/nv/cardtype/danpai_7"],
    danpai_8: ["sanDaHa/nv/cardtype/danpai_8"],
    danpai_9: ["sanDaHa/nv/cardtype/danpai_9"],
    danpai_10: ["sanDaHa/nv/cardtype/danpai_10"],
    danpai_11: ["sanDaHa/nv/cardtype/danpai_11"],
    danpai_12: ["sanDaHa/nv/cardtype/danpai_12"],
    danpai_13: ["sanDaHa/nv/cardtype/danpai_13"],
    danpai_14: ["sanDaHa/nv/cardtype/danpai_14"],
    danpai_15: ["sanDaHa/nv/cardtype/danpai_15"],

    duiPai_1: ["sanDaHa/nv/cardtype/duiPai_1"],
    duiPai_2: ["sanDaHa/nv/cardtype/duiPai_2"],
    duiPai_3: ["sanDaHa/nv/cardtype/duiPai_3"],
    duiPai_4: ["sanDaHa/nv/cardtype/duiPai_4"],
    duiPai_5: ["sanDaHa/nv/cardtype/duiPai_5"],
    duiPai_6: ["sanDaHa/nv/cardtype/duiPai_6"],
    duiPai_7: ["sanDaHa/nv/cardtype/duiPai_7"],
    duiPai_8: ["sanDaHa/nv/cardtype/duiPai_8"],
    duiPai_9: ["sanDaHa/nv/cardtype/duiPai_9"],
    duiPai_10: ["sanDaHa/nv/cardtype/duiPai_10"],
    duiPai_11: ["sanDaHa/nv/cardtype/duiPai_11"],
    duiPai_12: ["sanDaHa/nv/cardtype/duiPai_12"],
    duiPai_13: ["sanDaHa/nv/cardtype/duiPai_13"],
    duiPai_14: ["sanDaHa/nv/cardtype/duiPai_14"],
    duiPai_15: ["sanDaHa/nv/cardtype/duiPai_15"],

    bigger_1: ["sanDaHa/nv/cardtype/bigger_1"],
    bigger_2: ["sanDaHa/nv/cardtype/bigger_2"],
    bile: ["sanDaHa/nv/cardtype/bile"],
    dianpai: ["sanDaHa/nv/cardtype/dianpai"],
    diaozhu: ["sanDaHa/nv/cardtype/diaozhu"],
    gaibi: ["sanDaHa/nv/cardtype/gaibi"],
    swingcard: ["sanDaHa/nv/cardtype/swingcard"],


    liuju: ["sanDaHa/effect/audio_liuju"],
    getScore: ["sanDaHa/effect/getScore"],
    lose: ["sanDaHa/effect/lose"],
    win: ["sanDaHa/effect/win"],
    win_1: ["sanDaHa/nv/win_1"],
};
GameSound4Play[MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA] = GameSound4Play[MjClient.GAME_TYPE.SAN_DA_HA];
GameSound4Play[MjClient.GAME_TYPE.SAN_DA_HA_NEW] = GameSound4Play[MjClient.GAME_TYPE.SAN_DA_HA];

GameSound4Play[MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA] = {
    jiao0: ["sanDaHa/nv/callpoint/cp_0"],
    jiao5: ["sanDaHa/nv/callpoint/cp_5"],
    jiao10: ["sanDaHa/nv/callpoint/cp_10"],
    jiao15: ["sanDaHa/nv/callpoint/cp_15"],
    jiao20: ["sanDaHa/nv/callpoint/cp_20"],
    jiao25: ["sanDaHa/nv/callpoint/cp_25"],
    jiao30: ["sanDaHa/nv/callpoint/cp_30"],
    jiao35: ["sanDaHa/nv/callpoint/cp_35"],
    jiao40: ["sanDaHa/nv/callpoint/cp_40"],
    jiao45: ["sanDaHa/nv/callpoint/cp_45"],
    jiao50: ["sanDaHa/nv/callpoint/cp_50"],
    jiao55: ["sanDaHa/nv/callpoint/cp_55"],
    jiao60: ["sanDaHa/nv/callpoint/cp_60"],
    jiao65: ["sanDaHa/nv/callpoint/cp_65"],
    jiao70: ["sanDaHa/nv/callpoint/cp_70"],
    jiao75: ["sanDaHa/nv/callpoint/cp_75"],
    jiao80: ["sanDaHa/nv/callpoint/cp_80"],
    jiao85: ["sanDaHa/nv/callpoint/cp_85"],
    jiao90: ["sanDaHa/nv/callpoint/cp_90"],
    jiao95: ["sanDaHa/nv/callpoint/cp_95"],
    jiao100: ["sanDaHa/nv/callpoint/cp_100"],

    oneCard: ["sanDaHa/nv/cardtype/oneCard"],
    oneMainCard: ["sanDaHa/nv/cardtype/oneMainCard"],
    pair: ["sanDaHa/nv/cardtype/pair"],
    pairsMain: ["sanDaHa/nv/cardtype/pairsMain"],
    swingcard: ["sanDaHa/nv/cardtype/swingcard"],
    tractor: ["sanDaHa/nv/cardtype/tractor"],
    tractormain: ["sanDaHa/nv/cardtype/tractormain"],

    fangkuai: ["sanDaHa/nv/choosecolor/fangkuai"],
    heitao: ["sanDaHa/nv/choosecolor/heitao"],
    hongtao: ["sanDaHa/nv/choosecolor/hongtao"],
    meihua: ["sanDaHa/nv/choosecolor/meihua"],
    wu: ["sanDaHa/nv/choosecolor/wuzhu"],

    danpai_1: ["sanDaHa/nv/cardtype/danpai_1"],
    danpai_2: ["sanDaHa/nv/cardtype/danpai_2"],
    danpai_3: ["sanDaHa/nv/cardtype/danpai_3"],
    danpai_4: ["sanDaHa/nv/cardtype/danpai_4"],
    danpai_5: ["sanDaHa/nv/cardtype/danpai_5"],
    danpai_6: ["sanDaHa/nv/cardtype/danpai_6"],
    danpai_7: ["sanDaHa/nv/cardtype/danpai_7"],
    danpai_8: ["sanDaHa/nv/cardtype/danpai_8"],
    danpai_9: ["sanDaHa/nv/cardtype/danpai_9"],
    danpai_10: ["sanDaHa/nv/cardtype/danpai_10"],
    danpai_11: ["sanDaHa/nv/cardtype/danpai_11"],
    danpai_12: ["sanDaHa/nv/cardtype/danpai_12"],
    danpai_13: ["sanDaHa/nv/cardtype/danpai_13"],
    danpai_14: ["sanDaHa/nv/cardtype/danpai_14"],
    danpai_15: ["sanDaHa/nv/cardtype/danpai_15"],

    duiPai_1: ["sanDaHa/nv/cardtype/duiPai_1"],
    duiPai_2: ["sanDaHa/nv/cardtype/duiPai_2"],
    duiPai_3: ["sanDaHa/nv/cardtype/duiPai_3"],
    duiPai_4: ["sanDaHa/nv/cardtype/duiPai_4"],
    duiPai_5: ["sanDaHa/nv/cardtype/duiPai_5"],
    duiPai_6: ["sanDaHa/nv/cardtype/duiPai_6"],
    duiPai_7: ["sanDaHa/nv/cardtype/duiPai_7"],
    duiPai_8: ["sanDaHa/nv/cardtype/duiPai_8"],
    duiPai_9: ["sanDaHa/nv/cardtype/duiPai_9"],
    duiPai_10: ["sanDaHa/nv/cardtype/duiPai_10"],
    duiPai_11: ["sanDaHa/nv/cardtype/duiPai_11"],
    duiPai_12: ["sanDaHa/nv/cardtype/duiPai_12"],
    duiPai_13: ["sanDaHa/nv/cardtype/duiPai_13"],
    duiPai_14: ["sanDaHa/nv/cardtype/duiPai_14"],
    duiPai_15: ["sanDaHa/nv/cardtype/duiPai_15"],

    bigger_1: ["sanDaHa/nv/cardtype/bigger_1"],
    bigger_2: ["sanDaHa/nv/cardtype/bigger_2"],
    bile: ["sanDaHa/nv/cardtype/bile"],
    dianpai: ["sanDaHa/nv/cardtype/dianpai"],
    diaozhu: ["sanDaHa/nv/cardtype/diaozhu"],
    gaibi: ["sanDaHa/nv/cardtype/gaibi"],
    swingcard: ["sanDaHa/nv/cardtype/swingcard"],


    liuju: ["sanDaHa/effect/audio_liuju"],
    getScore: ["sanDaHa/effect/getScore"],
    lose: ["sanDaHa/effect/lose"],
    win: ["sanDaHa/effect/win"],
    win_1: ["sanDaHa/nv/win_1"],
};

GameSound4Play[MjClient.GAME_TYPE.LV_LIANG_DA_QI] = {
    oneCard: ["daqi/nv/cardtype/oneCard"],
    oneMainCard: ["daqi/nv/cardtype/oneMainCard"],
    pair: ["daqi/nv/cardtype/pair"],
    pairsMain: ["daqi/nv/cardtype/pairsMain"],
    swingcard: ["daqi/nv/cardtype/swingcard"],
    swingcardfail: ["daqi/nv/cardtype/swingcardfail"],
    tractor: ["daqi/nv/cardtype/tractor"],
    tractormain: ["daqi/nv/cardtype/tractormain"],
    diaozhu: ["daqi/nv/cardtype/diaozhu"],

    dazhu: ["daqi/nv/cardtype/dazhu"],
    dianpai: ["daqi/nv/cardtype/dianpai"],
    fanzhu: ["daqi/nv/cardtype/fanzhu"],
    liangzhu: ["daqi/nv/cardtype/liangzhu"],
    shapai: ["daqi/nv/cardtype/shapai"],
    clickCards: ["daqi/nv/click_cards"],

    lose: ["daqi/effect/lose"],
    win: ["daqi/effect/win"],
    win_1: ["daqi/nv/win_1"],
};

GameSound4Play[MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER] = {
    oneCard: ["sanDaEr/nv/cardtype/oneCard"],
    oneMainCard: ["sanDaEr/nv/cardtype/oneMainCard"],
    pair: ["sanDaEr/nv/cardtype/pair"],
    pairsMain: ["sanDaEr/nv/cardtype/pairsMain"],
    swingcard: ["sanDaEr/nv/cardtype/swingcard"],
    swingcardfail: ["sanDaEr/nv/cardtype/swingcardfail"],
    tractor: ["sanDaEr/nv/cardtype/tractor"],
    tractormain: ["sanDaEr/nv/cardtype/tractormain"],
    diaozhu: ["sanDaEr/nv/cardtype/diaozhu"],

    dazhu: ["sanDaEr/nv/cardtype/dazhu"],
    dianpai: ["sanDaEr/nv/cardtype/dianpai"],
    liangzhu: ["sanDaEr/nv/cardtype/liangzhu"],
    shapai: ["sanDaEr/nv/cardtype/shapai"],
    clickCards: ["sanDaEr/nv/click_cards"],

    jiao0: ["sanDaEr/nv/callpoint/cp_0"],
    jiao80: ["sanDaEr/nv/callpoint/cp_80"],
    jiao85: ["sanDaEr/nv/callpoint/cp_85"],
    jiao90: ["sanDaEr/nv/callpoint/cp_90"],
    jiao95: ["sanDaEr/nv/callpoint/cp_95"],
    jiao100: ["sanDaEr/nv/callpoint/cp_100"],


    fangkuai: ["sanDaEr/nv/choosecolor/fangkuai"],
    heitao: ["sanDaEr/nv/choosecolor/heitao"],
    hongtao: ["sanDaEr/nv/choosecolor/hongtao"],
    meihua: ["sanDaEr/nv/choosecolor/meihua"],

    danpai_1: ["sanDaEr/nv/cardtype/danpai_1"],
    danpai_2: ["sanDaEr/nv/cardtype/danpai_2"],
    danpai_3: ["sanDaEr/nv/cardtype/danpai_3"],
    danpai_4: ["sanDaEr/nv/cardtype/danpai_4"],
    danpai_5: ["sanDaEr/nv/cardtype/danpai_5"],
    danpai_6: ["sanDaEr/nv/cardtype/danpai_6"],
    danpai_7: ["sanDaEr/nv/cardtype/danpai_7"],
    danpai_8: ["sanDaEr/nv/cardtype/danpai_8"],
    danpai_9: ["sanDaEr/nv/cardtype/danpai_9"],
    danpai_10: ["sanDaEr/nv/cardtype/danpai_10"],
    danpai_11: ["sanDaEr/nv/cardtype/danpai_11"],
    danpai_12: ["sanDaEr/nv/cardtype/danpai_12"],
    danpai_13: ["sanDaEr/nv/cardtype/danpai_13"],
    danpai_14: ["sanDaEr/nv/cardtype/danpai_14"],
    danpai_15: ["sanDaEr/nv/cardtype/danpai_15"],

    bigger_1: ["sanDaEr/nv/cardtype/bigger_1"],
    bigger_2: ["sanDaEr/nv/cardtype/bigger_2"],
    bile: ["sanDaEr/nv/cardtype/bile"],
    gaibi: ["sanDaEr/nv/cardtype/gaibi"],

    fapai: ["sanDaEr/effect/fapai"],
    liuju: ["sanDaEr/effect/audio_liuju"],
    getScore: ["sanDaEr/effect/getScore"],
    lose: ["sanDaEr/effect/lose"],
    win: ["sanDaEr/effect/win"],
    win_1: ["sanDaEr/nv/win_1"],
};

GameSound4Play[MjClient.GAME_TYPE.RU_GAO] = {
    1: ["rugao/nv/1"],
    2: ["rugao/nv/2"],
    3: ["rugao/nv/3"],
    4: ["rugao/nv/4"],
    5: ["rugao/nv/5"],
    6: ["rugao/nv/6"],
    7: ["rugao/nv/7"],
    8: ["rugao/nv/8"],
    9: ["rugao/nv/9"],
    11: ["rugao/nv/11"],
    12: ["rugao/nv/12"],
    13: ["rugao/nv/13"],
    14: ["rugao/nv/14"],
    15: ["rugao/nv/15"],
    16: ["rugao/nv/16"],
    17: ["rugao/nv/17"],
    18: ["rugao/nv/18"],
    19: ["rugao/nv/19"],
    21: ["rugao/nv/21"],
    22: ["rugao/nv/22"],
    23: ["rugao/nv/23"],
    24: ["rugao/nv/24"],
    25: ["rugao/nv/25"],
    26: ["rugao/nv/26"],
    27: ["rugao/nv/27"],
    28: ["rugao/nv/28"],
    29: ["rugao/nv/29"],
    71: ["rugao/nv/71"],
    81: ["rugao/nv/81"],
    91: ["rugao/nv/91"],
    gang: ["rugao/nv/gang"],
    anGang: ["rugao/nv/gang"],
    fangpao: ["rugao/nv/fangpao"],
    flower: ["rugao/nv/flower"],
    hu: ["rugao/nv/hu"],
    ting: ["rugao/nv/ting"],
    peng: ["rugao/nv/peng"],
    zimo: ["rugao/nv/zimo"],
    long: ["rugao/nv/long"],
};

GameSound4Play[MjClient.GAME_TYPE.RU_GAO_ER] = {
    1: ["rugao/nv/1"],
    2: ["rugao/nv/2"],
    3: ["rugao/nv/3"],
    4: ["rugao/nv/4"],
    5: ["rugao/nv/5"],
    6: ["rugao/nv/6"],
    7: ["rugao/nv/7"],
    8: ["rugao/nv/8"],
    9: ["rugao/nv/9"],
    11: ["rugao/nv/11"],
    12: ["rugao/nv/12"],
    13: ["rugao/nv/13"],
    14: ["rugao/nv/14"],
    15: ["rugao/nv/15"],
    16: ["rugao/nv/16"],
    17: ["rugao/nv/17"],
    18: ["rugao/nv/18"],
    19: ["rugao/nv/19"],
    21: ["rugao/nv/21"],
    22: ["rugao/nv/22"],
    23: ["rugao/nv/23"],
    24: ["rugao/nv/24"],
    25: ["rugao/nv/25"],
    26: ["rugao/nv/26"],
    27: ["rugao/nv/27"],
    28: ["rugao/nv/28"],
    29: ["rugao/nv/29"],
    71: ["rugao/nv/71"],
    81: ["rugao/nv/81"],
    91: ["rugao/nv/91"],
    gang: ["rugao/nv/gang"],
    anGang: ["rugao/nv/gang"],
    fangpao: ["rugao/nv/fangpao"],
    flower: ["rugao/nv/flower"],
    hu: ["rugao/nv/hu"],
    ting: ["rugao/nv/ting"],
    peng: ["rugao/nv/peng"],
    zimo: ["rugao/nv/zimo"],
    long: ["rugao/nv/long"],
};

GameSound4Play[MjClient.GAME_TYPE.RU_GAO_MJH] = {
    1: ["rugao/nv/1"],
    2: ["rugao/nv/2"],
    3: ["rugao/nv/3"],
    4: ["rugao/nv/4"],
    5: ["rugao/nv/5"],
    6: ["rugao/nv/6"],
    7: ["rugao/nv/7"],
    8: ["rugao/nv/8"],
    9: ["rugao/nv/9"],
    11: ["rugao/nv/11"],
    12: ["rugao/nv/12"],
    13: ["rugao/nv/13"],
    14: ["rugao/nv/14"],
    15: ["rugao/nv/15"],
    16: ["rugao/nv/16"],
    17: ["rugao/nv/17"],
    18: ["rugao/nv/18"],
    19: ["rugao/nv/19"],
    21: ["rugao/nv/21"],
    22: ["rugao/nv/22"],
    23: ["rugao/nv/23"],
    24: ["rugao/nv/24"],
    25: ["rugao/nv/25"],
    26: ["rugao/nv/26"],
    27: ["rugao/nv/27"],
    28: ["rugao/nv/28"],
    29: ["rugao/nv/29"],
    71: ["rugao/nv/71"],
    81: ["rugao/nv/81"],
    91: ["rugao/nv/91"],
    gang: ["rugao/nv/gang"],
    anGang: ["rugao/nv/gang"],
    fangpao: ["rugao/nv/fangpao"],
    flower: ["rugao/nv/flower"],
    hu: ["rugao/nv/hu"],
    ting: ["rugao/nv/ting"],
    peng: ["rugao/nv/peng"],
    zimo: ["rugao/nv/zimo"],
    long: ["rugao/nv/long"],
};

GameSound4Play[MjClient.GAME_TYPE.PAO_HU_ZI] = {
    1: ["yongzhou/nv/1"],
    2: ["yongzhou/nv/2"],
    3: ["yongzhou/nv/3"],
    4: ["yongzhou/nv/4"],
    5: ["yongzhou/nv/5"],
    6: ["yongzhou/nv/6"],
    7: ["yongzhou/nv/7"],
    8: ["yongzhou/nv/8"],
    9: ["yongzhou/nv/9"],
    10: ["yongzhou/nv/10"],
    21: ["yongzhou/nv/21"],
    22: ["yongzhou/nv/22"],
    23: ["yongzhou/nv/23"],
    24: ["yongzhou/nv/24"],
    25: ["yongzhou/nv/25"],
    26: ["yongzhou/nv/26"],
    27: ["yongzhou/nv/27"],
    28: ["yongzhou/nv/28"],
    29: ["yongzhou/nv/29"],
    30: ["yongzhou/nv/30"],
    91: ["yongzhou/nv/91"],
    bi: ["yongzhou/nv/bi"],
    chi: ["yongzhou/nv/chi"],
    wei: ["yongzhou/nv/wei"],
    chouwei: ["yongzhou/nv/chouwei"],
    zimo: ["yongzhou/nv/zimo"],
    fangpao: ["yongzhou/nv/fangpao"],
    pao: ["yongzhou/nv/pao"],
    peng: ["yongzhou/nv/peng"],
    ti: ["yongzhou/nv/ti"],
    wangchuang: ["yongzhou/nv/wangchuang"],
    wangdiao: ["yongzhou/nv/wangdiao"],
    wangzha: ["yongzhou/nv/ww_v_wz"]
};
GameSound4Play[MjClient.GAME_TYPE.QU_TANG_23_ZHANG] = GameSound4Play[MjClient.GAME_TYPE.RU_GAO_MJH];
GameSound4Play[MjClient.GAME_TYPE.YZ_CHZTEST] = GameSound4Play[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Play[MjClient.GAME_TYPE.LUO_DI_SAO] = GameSound4Play[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Play[MjClient.GAME_TYPE.PAO_HU_ZI_SR] = GameSound4Play[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Play[MjClient.GAME_TYPE.PAO_HU_ZI_SR_King]  = GameSound4Play[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Play[MjClient.GAME_TYPE.PAO_HU_ZI_King]  = GameSound4Play[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Play[MjClient.GAME_TYPE.PAO_HU_ZI_ER]  = GameSound4Play[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Play[MjClient.GAME_TYPE.PAO_HU_ZI_LR_King]  = GameSound4Play[MjClient.GAME_TYPE.PAO_HU_ZI];
GameSound4Play[MjClient.GAME_TYPE.JIANG_YONG_15Z] = GameSound4Play[MjClient.GAME_TYPE.PAO_HU_ZI];

GameSound4Play[MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI] = {
    1:["15hu/nv/1"],
    2:["15hu/nv/2"],
    3:["15hu/nv/3"],
    4:["15hu/nv/4"],
    5:["15hu/nv/5"],
    6:["15hu/nv/6"],
    7:["15hu/nv/7"],
    8:["15hu/nv/8"],
    9:["15hu/nv/9"],
    10:["15hu/nv/10"],
    21:["15hu/nv/21"],
    22:["15hu/nv/22"],
    23:["15hu/nv/23"],
    24:["15hu/nv/24"],
    25:["15hu/nv/25"],
    26:["15hu/nv/26"],
    27:["15hu/nv/27"],
    28:["15hu/nv/28"],
    29:["15hu/nv/29"],
    30:["15hu/nv/30"],
    91:["15hu/nv/91"],
    bi:["15hu/nv/bi"],
    chi:["15hu/nv/chi"],
    wei:["15hu/nv/wei"],
    hu:["15hu/nv/hu"],
    chouwei:["15hu/nv/chouwei"],
    zimo:["15hu/nv/zimo"],
    fangpao:["15hu/nv/fangpao"],
    pao:["15hu/nv/pao"],
    peng:["15hu/nv/peng"],
    ti:["15hu/nv/ti"],
    wangchuang:["15hu/nv/wangchuang"],
    wangdiao:["15hu/nv/wangdiao"],
    wangzha:["15hu/nv/ww_v_wz"],
};
GameSound4Play[MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA] = GameSound4Play[MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI];

GameSound4Play[MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI]  = {
    1:["xxGaoHuZi/nv/normal/1"],
    2:["xxGaoHuZi/nv/normal/2"],
    3:["xxGaoHuZi/nv/normal/3"],
    4:["xxGaoHuZi/nv/normal/4"],
    5:["xxGaoHuZi/nv/normal/5"],
    6:["xxGaoHuZi/nv/normal/6"],
    7:["xxGaoHuZi/nv/normal/7"],
    8:["xxGaoHuZi/nv/normal/8"],
    9:["xxGaoHuZi/nv/normal/9"],
    10:["xxGaoHuZi/nv/normal/10"],
    21:["xxGaoHuZi/nv/normal/21"],
    22:["xxGaoHuZi/nv/normal/22"],
    23:["xxGaoHuZi/nv/normal/23"],
    24:["xxGaoHuZi/nv/normal/24"],
    25:["xxGaoHuZi/nv/normal/25"],
    26:["xxGaoHuZi/nv/normal/26"],
    27:["xxGaoHuZi/nv/normal/27"],
    28:["xxGaoHuZi/nv/normal/28"],
    29:["xxGaoHuZi/nv/normal/29"],
    30:["xxGaoHuZi/nv/normal/30"],
    91:["xxGaoHuZi/nv/normal/91"],
    bi:["xxGaoHuZi/nv/normal/bi"],
    chi:["xxGaoHuZi/nv/normal/chi"],
    wei:["xxGaoHuZi/nv/normal/wei"],
    chouwei:["xxGaoHuZi/nv/normal/chouwei"],
    zimo:["xxGaoHuZi/nv/normal/zimo"],
    fangpao:["xxGaoHuZi/nv/normal/fangpao"],
    pao:["xxGaoHuZi/nv/normal/pao"],
    peng:["xxGaoHuZi/nv/normal/peng"],
    ti:["xxGaoHuZi/nv/normal/ti"],
};
GameSound4Play[MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI] = GameSound4Play[MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI];
GameSound4Play[MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI] = GameSound4Play[MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI];

GameSound4Play[MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA]  = {
    1:["xxGaoHuZi/nv/normal/1"],
    2:["xxGaoHuZi/nv/normal/2"],
    3:["xxGaoHuZi/nv/normal/3"],
    4:["xxGaoHuZi/nv/normal/4"],
    5:["xxGaoHuZi/nv/normal/5"],
    6:["xxGaoHuZi/nv/normal/6"],
    7:["xxGaoHuZi/nv/normal/7"],
    8:["xxGaoHuZi/nv/normal/8"],
    9:["xxGaoHuZi/nv/normal/9"],
    10:["xxGaoHuZi/nv/normal/10"],
    21:["xxGaoHuZi/nv/normal/21"],
    22:["xxGaoHuZi/nv/normal/22"],
    23:["xxGaoHuZi/nv/normal/23"],
    24:["xxGaoHuZi/nv/normal/24"],
    25:["xxGaoHuZi/nv/normal/25"],
    26:["xxGaoHuZi/nv/normal/26"],
    27:["xxGaoHuZi/nv/normal/27"],
    28:["xxGaoHuZi/nv/normal/28"],
    29:["xxGaoHuZi/nv/normal/29"],
    30:["xxGaoHuZi/nv/normal/30"],
    91:["xxGaoHuZi/nv/normal/91"],
    bi:["xxGaoHuZi/nv/normal/bi"],
    chi:["xxGaoHuZi/nv/normal/chi"],
    wei:["xxGaoHuZi/nv/normal/wei"],
    chouwei:["xxGaoHuZi/nv/normal/chouwei"],
    zimo:["xxGaoHuZi/nv/normal/zimo"],
    fangpao:["xxGaoHuZi/nv/normal/fangpao"],
    pao:["xxGaoHuZi/nv/normal/pao"],
    peng:["xxGaoHuZi/nv/normal/peng"],
    ti:["xxGaoHuZi/nv/normal/ti"],
};
GameSound4Play[MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA] = GameSound4Play[MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA];
GameSound4Play[MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO] = GameSound4Play[MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA];

GameSound4Play[MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN]  = {
    1:["hongGuaiWan/nv/normal/1"],
    2:["hongGuaiWan/nv/normal/2"],
    3:["hongGuaiWan/nv/normal/3"],
    4:["hongGuaiWan/nv/normal/4"],
    5:["hongGuaiWan/nv/normal/5"],
    6:["hongGuaiWan/nv/normal/6"],
    7:["hongGuaiWan/nv/normal/7"],
    8:["hongGuaiWan/nv/normal/8"],
    9:["hongGuaiWan/nv/normal/9"],
    10:["hongGuaiWan/nv/normal/10"],
    21:["hongGuaiWan/nv/normal/21"],
    22:["hongGuaiWan/nv/normal/22"],
    23:["hongGuaiWan/nv/normal/23"],
    24:["hongGuaiWan/nv/normal/24"],
    25:["hongGuaiWan/nv/normal/25"],
    26:["hongGuaiWan/nv/normal/26"],
    27:["hongGuaiWan/nv/normal/27"],
    28:["hongGuaiWan/nv/normal/28"],
    29:["hongGuaiWan/nv/normal/29"],
    30:["hongGuaiWan/nv/normal/30"],
    91:["hongGuaiWan/nv/normal/91"],
    bi:["hongGuaiWan/nv/normal/bi"],
    chi:["hongGuaiWan/nv/normal/chi"],
    wei:["hongGuaiWan/nv/normal/wei"],
    chouwei:["hongGuaiWan/nv/normal/chouwei"],
    zimo:["hongGuaiWan/nv/normal/zimo"],
    fangpao:["hongGuaiWan/nv/normal/fangpao"],
    pao:["hongGuaiWan/nv/normal/pao"],
    peng:["hongGuaiWan/nv/normal/peng"],
    ti:["hongGuaiWan/nv/normal/ti"],
};

GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_NT] = {
    1: ["doudizhu/nv/1_1"],
    2: ["doudizhu/nv/1_2"],
    3: ["doudizhu/nv/1_3"],
    4: ["doudizhu/nv/1_4"],
    5: ["doudizhu/nv/1_5"],
    6: ["doudizhu/nv/1_6"],
    7: ["doudizhu/nv/1_7"],
    8: ["doudizhu/nv/1_8"],
    9: ["doudizhu/nv/1_9"],
    10: ["doudizhu/nv/1_10"],
    11: ["doudizhu/nv/1_11"],
    12: ["doudizhu/nv/1_12"],
    13: ["doudizhu/nv/1_13"],

    53: ["doudizhu/nv/53"],
    54: ["doudizhu/nv/54"],

    d1: ["doudizhu/nv/2_1"],
    d2: ["doudizhu/nv/2_2"],
    d3: ["doudizhu/nv/2_3"],
    d4: ["doudizhu/nv/2_4"],
    d5: ["doudizhu/nv/2_5"],
    d6: ["doudizhu/nv/2_6"],
    d7: ["doudizhu/nv/2_7"],
    d8: ["doudizhu/nv/2_8"],
    d9: ["doudizhu/nv/2_9"],
    d10: ["doudizhu/nv/2_10"],
    d11: ["doudizhu/nv/2_11"],
    d12: ["doudizhu/nv/2_12"],
    d13: ["doudizhu/nv/2_13"],

    s1: ["doudizhu/nv/3_1"],
    s2: ["doudizhu/nv/3_2"],
    s3: ["doudizhu/nv/3_3"],
    s4: ["doudizhu/nv/3_4"],
    s5: ["doudizhu/nv/3_5"],
    s6: ["doudizhu/nv/3_6"],
    s7: ["doudizhu/nv/3_7"],
    s8: ["doudizhu/nv/3_8"],
    s9: ["doudizhu/nv/3_9"],
    s10: ["doudizhu/nv/3_10"],
    s11: ["doudizhu/nv/3_11"],
    s12: ["doudizhu/nv/3_12"],
    s13: ["doudizhu/nv/3_13"],
    clickCards: ["doudizhu/nv/click_cards"],
    playingCards: ["doudizhu/nv/Playing_cards"],
    singer: ["doudizhu/nv/female_singer"],
    jiaodizhu: ["doudizhu/nv/female_call_dizhu"],
    bujiao: ["doudizhu/nv/female_not_call"],
    ani_zhadan: ["doudizhu/nv/ani_bomb"],
    ani_shunzi: ["doudizhu/nv/ani_shunzi"],
    ani_liandui: ["doudizhu/nv/ani_liandui"],
    ani_huojian: ["doudizhu/nv/ani_rocket"],
    ani_feiji: ["doudizhu/nv/ani_feiji"],
    huojian: ["doudizhu/nv/huojian"],
    feiji: ["doudizhu/nv/feiji"],
    bomb1: ["doudizhu/nv/bomb_0"],
    liandui: ["doudizhu/nv/liandui"],
    sandaiyi: ["doudizhu/nv/sandaiyi"],
    sidaiyi: ["doudizhu/nv/sidaiyi"],
    sidaier: ["doudizhu/nv/sidaier"],
    shunzi: ["doudizhu/nv/shunzi"],
    ti: ["doudizhu/nv/ti"],
    buti: ["doudizhu/nv/buti"],
    fanti: ["doudizhu/nv/fanti"],
    pass: ["doudizhu/nv/pass_1", "doudizhu/nv/pass_2"],
    single: ["doudizhu/nv/single_1", "doudizhu/nv/single_2"],
};

GameSound4Play[MjClient.GAME_TYPE.HUAI_AN_DOU_DI_ZHU] ={
    1: ["doudizhu/nv/1_1"],
    2: ["doudizhu/nv/1_2"],
    3: ["doudizhu/nv/1_3"],
    4: ["doudizhu/nv/1_4"],
    5: ["doudizhu/nv/1_5"],
    6: ["doudizhu/nv/1_6"],
    7: ["doudizhu/nv/1_7"],
    8: ["doudizhu/nv/1_8"],
    9: ["doudizhu/nv/1_9"],
    10: ["doudizhu/nv/1_10"],
    11: ["doudizhu/nv/1_11"],
    12: ["doudizhu/nv/1_12"],
    13: ["doudizhu/nv/1_13"],

    53: ["doudizhu/nv/53"],
    54: ["doudizhu/nv/54"],

    d1: ["doudizhu/nv/2_1"],
    d2: ["doudizhu/nv/2_2"],
    d3: ["doudizhu/nv/2_3"],
    d4: ["doudizhu/nv/2_4"],
    d5: ["doudizhu/nv/2_5"],
    d6: ["doudizhu/nv/2_6"],
    d7: ["doudizhu/nv/2_7"],
    d8: ["doudizhu/nv/2_8"],
    d9: ["doudizhu/nv/2_9"],
    d10: ["doudizhu/nv/2_10"],
    d11: ["doudizhu/nv/2_11"],
    d12: ["doudizhu/nv/2_12"],
    d13: ["doudizhu/nv/2_13"],

    s1: ["doudizhu/nv/3_1"],
    s2: ["doudizhu/nv/3_2"],
    s3: ["doudizhu/nv/3_3"],
    s4: ["doudizhu/nv/3_4"],
    s5: ["doudizhu/nv/3_5"],
    s6: ["doudizhu/nv/3_6"],
    s7: ["doudizhu/nv/3_7"],
    s8: ["doudizhu/nv/3_8"],
    s9: ["doudizhu/nv/3_9"],
    s10: ["doudizhu/nv/3_10"],
    s11: ["doudizhu/nv/3_11"],
    s12: ["doudizhu/nv/3_12"],
    s13: ["doudizhu/nv/3_13"],
    clickCards: ["doudizhu/nv/click_cards"],
    playingCards: ["doudizhu/nv/Playing_cards"],
    singer: ["doudizhu/nv/female_singer"],
    jiaodizhu: ["doudizhu/nv/female_call_dizhu"],
    bujiao: ["doudizhu/nv/female_not_call"],
    ani_zhadan: ["doudizhu/nv/ani_bomb"],
    ani_shunzi: ["doudizhu/nv/ani_shunzi"],
    ani_liandui: ["doudizhu/nv/ani_liandui"],
    ani_huojian: ["doudizhu/nv/ani_rocket"],
    ani_feiji: ["doudizhu/nv/ani_feiji"],
    huojian: ["doudizhu/nv/huojian"],
    feiji: ["doudizhu/nv/feiji"],
    bomb1: ["doudizhu/nv/bomb_0"],
    liandui: ["doudizhu/nv/liandui"],
    sandaiyi: ["doudizhu/nv/sandaiyi"],
    sidaiyi: ["doudizhu/nv/sidaiyi"],
    sandaier: ["doudizhu/nv/sandaier"],
    sidaier: ["doudizhu/nv/sidaier"],
    shunzi: ["doudizhu/nv/shunzi"],
    robDZScore1: ["doudizhu/nv/fen1"],
    robDZScore2: ["doudizhu/nv/fen2"],
    robDZScore3: ["doudizhu/nv/fen3"],
    ti: ["doudizhu/nv/ti"],
    buti: ["doudizhu/nv/buti"],
    fanti: ["doudizhu/nv/fanti"],
    pass: ["doudizhu/nv/pass_1", "doudizhu/nv/pass_2"],
    single: ["doudizhu/nv/single_1", "doudizhu/nv/single_2"],
};
GameSound4Play[MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG] = {
    1:["shaoyang/nv/1"],
    2:["shaoyang/nv/2"],
    3:["shaoyang/nv/3"],
    4:["shaoyang/nv/4"],
    5:["shaoyang/nv/5"],
    6:["shaoyang/nv/6"],
    7:["shaoyang/nv/7"],
    8:["shaoyang/nv/8"],
    9:["shaoyang/nv/9"],
    11:["shaoyang/nv/11"],
    12:["shaoyang/nv/12"],
    13:["shaoyang/nv/13"],
    14:["shaoyang/nv/14"],
    15:["shaoyang/nv/15"],
    16:["shaoyang/nv/16"],
    17:["shaoyang/nv/17"],
    18:["shaoyang/nv/18"],
    19:["shaoyang/nv/19"],
    21:["shaoyang/nv/21"],
    22:["shaoyang/nv/22"],
    23:["shaoyang/nv/23"],
    24:["shaoyang/nv/24"],
    25:["shaoyang/nv/25"],
    26:["shaoyang/nv/26"],
    27:["shaoyang/nv/27"],
    28:["shaoyang/nv/28"],
    29:["shaoyang/nv/29"],
    31:["shaoyang/nv/31"],
    41:["shaoyang/nv/41"],
    51:["shaoyang/nv/51"],
    61:["shaoyang/nv/61"],
    71:["shaoyang/nv/71"],
    81:["shaoyang/nv/81"],
    91:["shaoyang/nv/91"],
    anGang:["shaoyang/nv/gang"],
    chi:["shaoyang/nv/chi"],
    gang:["shaoyang/nv/gang"],
    fangpao:["shaoyang/nv/fangpao"],
    peng:["shaoyang/nv/peng"],
    ting:["shaoyang/nv/ting"],
    zimo:["shaoyang/nv/zimo"]
};

GameSound4Play[MjClient.GAME_TYPE.WU_XUE_GE_BAN] = {
    1: ["doudizhu/nv/1_1"],
    2: ["doudizhu/nv/1_2"],
    3: ["doudizhu/nv/1_3"],
    4: ["doudizhu/nv/1_4"],
    5: ["doudizhu/nv/1_5"],
    6: ["doudizhu/nv/1_6"],
    7: ["doudizhu/nv/1_7"],
    8: ["doudizhu/nv/1_8"],
    9: ["doudizhu/nv/1_9"],
    10: ["doudizhu/nv/1_10"],
    11: ["doudizhu/nv/1_11"],
    12: ["doudizhu/nv/1_12"],
    13: ["doudizhu/nv/1_13"],

    53: ["doudizhu/nv/53"],
    54: ["doudizhu/nv/54"],

    d1: ["doudizhu/nv/2_1"],
    d2: ["doudizhu/nv/2_2"],
    d3: ["doudizhu/nv/2_3"],
    d4: ["doudizhu/nv/2_4"],
    d5: ["doudizhu/nv/2_5"],
    d6: ["doudizhu/nv/2_6"],
    d7: ["doudizhu/nv/2_7"],
    d8: ["doudizhu/nv/2_8"],
    d9: ["doudizhu/nv/2_9"],
    d10: ["doudizhu/nv/2_10"],
    d11: ["doudizhu/nv/2_11"],
    d12: ["doudizhu/nv/2_12"],
    d13: ["doudizhu/nv/2_13"],

    s1: ["doudizhu/nv/3_1"],
    s2: ["doudizhu/nv/3_2"],
    s3: ["doudizhu/nv/3_3"],
    s4: ["doudizhu/nv/3_4"],
    s5: ["doudizhu/nv/3_5"],
    s6: ["doudizhu/nv/3_6"],
    s7: ["doudizhu/nv/3_7"],
    s8: ["doudizhu/nv/3_8"],
    s9: ["doudizhu/nv/3_9"],
    s10: ["doudizhu/nv/3_10"],
    s11: ["doudizhu/nv/3_11"],
    s12: ["doudizhu/nv/3_12"],
    s13: ["doudizhu/nv/3_13"],
    clickCards: ["doudizhu/nv/click_cards"],
    playingCards: ["doudizhu/nv/Playing_cards"],
    singer: ["doudizhu/nv/female_singer"],
    notRobDZ: ["doudizhu/nv/female_not_rob"],
    robDZ: ["doudizhu/nv/female_rob_dizhu"],
    sandaier: ["doudizhu/nv/female_three_with_one_pair"],
    jiaodizhu: ["doudizhu/nv/female_call_dizhu"],
    bujiao: ["doudizhu/nv/female_not_call"],
    ani_zhadan: ["doudizhu/nv/ani_bomb"],
    ani_shunzi: ["doudizhu/nv/ani_shunzi"],
    ani_liandui: ["doudizhu/nv/ani_liandui"],
    ani_huojian: ["doudizhu/nv/ani_rocket"],
    ani_feiji: ["doudizhu/nv/ani_feiji"],
    huojian: ["doudizhu/nv/huojian"],
    feiji: ["doudizhu/nv/feiji"],
    bomb1: ["doudizhu/nv/bomb_0"],
    liandui: ["doudizhu/nv/liandui"],
    sandaiyi: ["doudizhu/nv/sandaiyi"],
    sidaiyi: ["doudizhu/nv/sidaiyi"],
    sidaier: ["doudizhu/nv/sidaier"],
    shunzi: ["doudizhu/nv/shunzi"],
    ti: ["doudizhu/nv/ti"],
    buti: ["doudizhu/nv/buti"],
    fanti: ["doudizhu/nv/fanti"],
    pass: ["doudizhu/nv/pass_1", "doudizhu/nv/pass_2"],
    single: ["doudizhu/nv/single_1", "doudizhu/nv/single_2"],
};

GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_HA] = {
    1: ["doudizhu/nv/1_1"],
    2: ["doudizhu/nv/1_2"],
    3: ["doudizhu/nv/1_3"],
    4: ["doudizhu/nv/1_4"],
    5: ["doudizhu/nv/1_5"],
    6: ["doudizhu/nv/1_6"],
    7: ["doudizhu/nv/1_7"],
    8: ["doudizhu/nv/1_8"],
    9: ["doudizhu/nv/1_9"],
    10: ["doudizhu/nv/1_10"],
    11: ["doudizhu/nv/1_11"],
    12: ["doudizhu/nv/1_12"],
    13: ["doudizhu/nv/1_13"],

    53: ["doudizhu/nv/53"],
    54: ["doudizhu/nv/54"],

    d1: ["doudizhu/nv/2_1"],
    d2: ["doudizhu/nv/2_2"],
    d3: ["doudizhu/nv/2_3"],
    d4: ["doudizhu/nv/2_4"],
    d5: ["doudizhu/nv/2_5"],
    d6: ["doudizhu/nv/2_6"],
    d7: ["doudizhu/nv/2_7"],
    d8: ["doudizhu/nv/2_8"],
    d9: ["doudizhu/nv/2_9"],
    d10: ["doudizhu/nv/2_10"],
    d11: ["doudizhu/nv/2_11"],
    d12: ["doudizhu/nv/2_12"],
    d13: ["doudizhu/nv/2_13"],

    s1: ["doudizhu/nv/3_1"],
    s2: ["doudizhu/nv/3_2"],
    s3: ["doudizhu/nv/3_3"],
    s4: ["doudizhu/nv/3_4"],
    s5: ["doudizhu/nv/3_5"],
    s6: ["doudizhu/nv/3_6"],
    s7: ["doudizhu/nv/3_7"],
    s8: ["doudizhu/nv/3_8"],
    s9: ["doudizhu/nv/3_9"],
    s10: ["doudizhu/nv/3_10"],
    s11: ["doudizhu/nv/3_11"],
    s12: ["doudizhu/nv/3_12"],
    s13: ["doudizhu/nv/3_13"],
    robDZ: ["doudizhu/nv/female_rob_dizhu"],
    clickCards: ["doudizhu/nv/click_cards"],
    playingCards: ["doudizhu/nv/Playing_cards"],
    singer: ["doudizhu/nv/female_singer"],
    jiaodizhu: ["doudizhu/nv/female_call_dizhu"],
    notRobDZ: ["doudizhu/nv/female_not_rob"],
    bujiao: ["doudizhu/nv/female_not_call"],
    ani_zhadan: ["doudizhu/nv/ani_bomb"],
    ani_shunzi: ["doudizhu/nv/ani_shunzi"],
    ani_liandui: ["doudizhu/nv/ani_liandui"],
    ani_huojian: ["doudizhu/nv/ani_rocket"],
    ani_feiji: ["doudizhu/nv/ani_feiji"],
    huojian: ["doudizhu/nv/huojian"],
    feiji: ["doudizhu/nv/feiji"],
    bomb1: ["doudizhu/nv/bomb_0"],
    liandui: ["doudizhu/nv/liandui"],
    sandaiyi: ["doudizhu/nv/sandaiyi"],
    sandaier: ["doudizhu/nv/female_three_with_one_pair"],
    sidaiyi: ["doudizhu/nv/sidaiyi"],
    sidaier: ["doudizhu/nv/sidaier"],
    shunzi: ["doudizhu/nv/shunzi"],
    ti: ["doudizhu/nv/ti"],
    buti: ["doudizhu/nv/buti"],
    fanti: ["doudizhu/nv/fanti"],
    robDZScore1: ["doudizhu/nv/fen1"],
    robDZScore2: ["doudizhu/nv/fen2"],
    robDZScore3: ["doudizhu/nv/fen3"],
    pass: ["doudizhu/nv/pass_1", "doudizhu/nv/pass_2"],
    single: ["doudizhu/nv/single_1", "doudizhu/nv/single_2"],
};

GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_TY] = {
    1: ["doudizhu/nv/1_1"],
    2: ["doudizhu/nv/1_2"],
    3: ["doudizhu/nv/1_3"],
    4: ["doudizhu/nv/1_4"],
    5: ["doudizhu/nv/1_5"],
    6: ["doudizhu/nv/1_6"],
    7: ["doudizhu/nv/1_7"],
    8: ["doudizhu/nv/1_8"],
    9: ["doudizhu/nv/1_9"],
    10: ["doudizhu/nv/1_10"],
    11: ["doudizhu/nv/1_11"],
    12: ["doudizhu/nv/1_12"],
    13: ["doudizhu/nv/1_13"],

    53: ["doudizhu/nv/53"],
    54: ["doudizhu/nv/54"],

    d1: ["doudizhu/nv/2_1"],
    d2: ["doudizhu/nv/2_2"],
    d3: ["doudizhu/nv/2_3"],
    d4: ["doudizhu/nv/2_4"],
    d5: ["doudizhu/nv/2_5"],
    d6: ["doudizhu/nv/2_6"],
    d7: ["doudizhu/nv/2_7"],
    d8: ["doudizhu/nv/2_8"],
    d9: ["doudizhu/nv/2_9"],
    d10: ["doudizhu/nv/2_10"],
    d11: ["doudizhu/nv/2_11"],
    d12: ["doudizhu/nv/2_12"],
    d13: ["doudizhu/nv/2_13"],

    s1: ["doudizhu/nv/3_1"],
    s2: ["doudizhu/nv/3_2"],
    s3: ["doudizhu/nv/3_3"],
    s4: ["doudizhu/nv/3_4"],
    s5: ["doudizhu/nv/3_5"],
    s6: ["doudizhu/nv/3_6"],
    s7: ["doudizhu/nv/3_7"],
    s8: ["doudizhu/nv/3_8"],
    s9: ["doudizhu/nv/3_9"],
    s10: ["doudizhu/nv/3_10"],
    s11: ["doudizhu/nv/3_11"],
    s12: ["doudizhu/nv/3_12"],
    s13: ["doudizhu/nv/3_13"],
    clickCards: ["doudizhu/nv/click_cards"],
    playingCards: ["doudizhu/nv/Playing_cards"],
    singer: ["doudizhu/nv/female_singer"],
    notRobDZ: ["doudizhu/nv/female_not_rob"],
    robDZ: ["doudizhu/nv/female_rob_dizhu"],
    sandaier: ["doudizhu/nv/female_three_with_one_pair"],
    jiaodizhu: ["doudizhu/nv/female_call_dizhu"],
    bujiao: ["doudizhu/nv/female_not_call"],
    ani_zhadan: ["doudizhu/nv/ani_bomb"],
    ani_shunzi: ["doudizhu/nv/ani_shunzi"],
    ani_liandui: ["doudizhu/nv/ani_liandui"],
    ani_huojian: ["doudizhu/nv/ani_rocket"],
    ani_feiji: ["doudizhu/nv/ani_feiji"],
    huojian: ["doudizhu/nv/huojian"],
    feiji: ["doudizhu/nv/feiji"],
    bomb1: ["doudizhu/nv/bomb_0"],
    liandui: ["doudizhu/nv/liandui"],
    sandaiyi: ["doudizhu/nv/sandaiyi"],
    sidaiyi: ["doudizhu/nv/sidaiyi"],
    sidaier: ["doudizhu/nv/sidaier"],
    shunzi: ["doudizhu/nv/shunzi"],
    ti: ["doudizhu/nv/ti"],
    buti: ["doudizhu/nv/buti"],
    fanti: ["doudizhu/nv/fanti"],
    pass: ["doudizhu/nv/pass_1", "doudizhu/nv/pass_2"],
    single: ["doudizhu/nv/single_1", "doudizhu/nv/single_2"],
};

GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY] = GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_TY]
GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_QC] = GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_TY]

GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_JZ] = {
    1: ["doudizhu/nv/1_1"],
    2: ["doudizhu/nv/1_2"],
    3: ["doudizhu/nv/1_3"],
    4: ["doudizhu/nv/1_4"],
    5: ["doudizhu/nv/1_5"],
    6: ["doudizhu/nv/1_6"],
    7: ["doudizhu/nv/1_7"],
    8: ["doudizhu/nv/1_8"],
    9: ["doudizhu/nv/1_9"],
    10: ["doudizhu/nv/1_10"],
    11: ["doudizhu/nv/1_11"],
    12: ["doudizhu/nv/1_12"],
    13: ["doudizhu/nv/1_13"],

    53: ["doudizhu/nv/53"],
    54: ["doudizhu/nv/54"],

    d1: ["doudizhu/nv/2_1"],
    d2: ["doudizhu/nv/2_2"],
    d3: ["doudizhu/nv/2_3"],
    d4: ["doudizhu/nv/2_4"],
    d5: ["doudizhu/nv/2_5"],
    d6: ["doudizhu/nv/2_6"],
    d7: ["doudizhu/nv/2_7"],
    d8: ["doudizhu/nv/2_8"],
    d9: ["doudizhu/nv/2_9"],
    d10: ["doudizhu/nv/2_10"],
    d11: ["doudizhu/nv/2_11"],
    d12: ["doudizhu/nv/2_12"],
    d13: ["doudizhu/nv/2_13"],

    s1: ["doudizhu/nv/3_1"],
    s2: ["doudizhu/nv/3_2"],
    s3: ["doudizhu/nv/3_3"],
    s4: ["doudizhu/nv/3_4"],
    s5: ["doudizhu/nv/3_5"],
    s6: ["doudizhu/nv/3_6"],
    s7: ["doudizhu/nv/3_7"],
    s8: ["doudizhu/nv/3_8"],
    s9: ["doudizhu/nv/3_9"],
    s10: ["doudizhu/nv/3_10"],
    s11: ["doudizhu/nv/3_11"],
    s12: ["doudizhu/nv/3_12"],
    s13: ["doudizhu/nv/3_13"],
    clickCards: ["doudizhu/nv/click_cards"],
    playingCards: ["doudizhu/nv/Playing_cards"],
    singer: ["doudizhu/nv/female_singer"],
    notRobDZ: ["doudizhu/nv/female_not_rob"],
    robDZ: ["doudizhu/nv/female_rob_dizhu"],
    sandaier: ["doudizhu/nv/female_three_with_one_pair"],
    jiaodizhu: ["doudizhu/nv/female_call_dizhu"],
    bujiao: ["doudizhu/nv/female_not_call"],
    ani_zhadan: ["doudizhu/nv/ani_bomb"],
    ani_shunzi: ["doudizhu/nv/ani_shunzi"],
    ani_liandui: ["doudizhu/nv/ani_liandui"],
    ani_huojian: ["doudizhu/nv/ani_rocket"],
    ani_feiji: ["doudizhu/nv/ani_feiji"],
    huojian: ["doudizhu/nv/huojian"],
    feiji: ["doudizhu/nv/feiji"],
    bomb1: ["doudizhu/nv/bomb_0"],
    liandui: ["doudizhu/nv/liandui"],
    sandaiyi: ["doudizhu/nv/sandaiyi"],
    sidaiyi: ["doudizhu/nv/sidaiyi"],
    sidaier: ["doudizhu/nv/sidaier"],
    sidaier2: ["doudizhu/nv/sidaier2"],
    sidaisan: ["doudizhu/nv/sidaisan"],
    shunzi: ["doudizhu/nv/shunzi"],
    ti: ["doudizhu/nv/ti"],
    buti: ["doudizhu/nv/buti"],
    fanti: ["doudizhu/nv/fanti"],
    pass: ["doudizhu/nv/pass_1", "doudizhu/nv/pass_2"],
    single: ["doudizhu/nv/single_1", "doudizhu/nv/single_2"],
    robDZScore1: ["doudizhu/nv/fen1"],
    robDZScore2: ["doudizhu/nv/fen2"],
    robDZScore3: ["doudizhu/nv/fen3"],
    jiabei: ["doudizhu/nv/jiabei"],
    bujiabei: ["doudizhu/nv/bujiabei"],
    sendcard: ["doudizhu/nv/sendcard"],
    jiaodizhu: ["doudizhu/nv/female_call_dizhu"],
    bujiao: ["doudizhu/nv/female_not_call"],
    ani_zhadan: ["doudizhu/nv/ani_bomb"],
    ani_shunzi: ["doudizhu/nv/ani_shunzi"],
    ani_liandui: ["doudizhu/nv/ani_liandui"],
    ani_huojian: ["doudizhu/nv/ani_rocket"],
    ani_feiji: ["doudizhu/nv/ani_feiji"],
    huojian: ["doudizhu/nv/huojian"],
    feiji: ["doudizhu/nv/feiji"],
    bomb1: ["doudizhu/nv/bomb_0"],
    liandui: ["doudizhu/nv/liandui"],
    sandaiyi: ["doudizhu/nv/sandaiyi"],
    sidaiyi: ["doudizhu/nv/sidaiyi"],
    sidaier: ["doudizhu/nv/sidaier"],
    sidaier2: ["doudizhu/nv/sidaier2"],
    sidaisan: ["doudizhu/nv/sidaisan"],
    shunzi: ["doudizhu/nv/shunzi"],
    ti: ["doudizhu/nv/ti"],
    buti: ["doudizhu/nv/buti"],
    fanti: ["doudizhu/nv/fanti"],
    pass: ["doudizhu/nv/pass_1", "doudizhu/nv/pass_2"],
    single: ["doudizhu/nv/single_1", "doudizhu/nv/single_2"],
    robDZScore1: ["doudizhu/nv/fen1"],
    robDZScore2: ["doudizhu/nv/fen2"],
    robDZScore3: ["doudizhu/nv/fen3"],
    jiabei: ["doudizhu/nv/jiabei"],
    bujiabei: ["doudizhu/nv/bujiabei"],
    superjiabei: ["doudizhu/nv/superjiabei"],
    sendcard: ["doudizhu/nv/sendcard"],
};

GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_GZ] = GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_JZ];

GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO] = {
    1: ["doudizhu/nv/1_1"],
    2: ["doudizhu/nv/1_2"],
    3: ["doudizhu/nv/1_3"],
    4: ["doudizhu/nv/1_4"],
    5: ["doudizhu/nv/1_5"],
    6: ["doudizhu/nv/1_6"],
    7: ["doudizhu/nv/1_7"],
    8: ["doudizhu/nv/1_8"],
    9: ["doudizhu/nv/1_9"],
    10: ["doudizhu/nv/1_10"],
    11: ["doudizhu/nv/1_11"],
    12: ["doudizhu/nv/1_12"],
    13: ["doudizhu/nv/1_13"],

    53: ["doudizhu/nv/53"],
    54: ["doudizhu/nv/54"],

    d1: ["doudizhu/nv/2_1"],
    d2: ["doudizhu/nv/2_2"],
    d3: ["doudizhu/nv/2_3"],
    d4: ["doudizhu/nv/2_4"],
    d5: ["doudizhu/nv/2_5"],
    d6: ["doudizhu/nv/2_6"],
    d7: ["doudizhu/nv/2_7"],
    d8: ["doudizhu/nv/2_8"],
    d9: ["doudizhu/nv/2_9"],
    d10: ["doudizhu/nv/2_10"],
    d11: ["doudizhu/nv/2_11"],
    d12: ["doudizhu/nv/2_12"],
    d13: ["doudizhu/nv/2_13"],

    s1: ["doudizhu/nv/3_1"],
    s2: ["doudizhu/nv/3_2"],
    s3: ["doudizhu/nv/3_3"],
    s4: ["doudizhu/nv/3_4"],
    s5: ["doudizhu/nv/3_5"],
    s6: ["doudizhu/nv/3_6"],
    s7: ["doudizhu/nv/3_7"],
    s8: ["doudizhu/nv/3_8"],
    s9: ["doudizhu/nv/3_9"],
    s10: ["doudizhu/nv/3_10"],
    s11: ["doudizhu/nv/3_11"],
    s12: ["doudizhu/nv/3_12"],
    s13: ["doudizhu/nv/3_13"],
    clickCards: ["doudizhu/nv/click_cards"],
    playingCards: ["doudizhu/nv/Playing_cards"],
    singer: ["doudizhu/nv/female_singer"],
    notRobDZ: ["doudizhu/nv/female_not_rob"],
    robDZ: ["doudizhu/nv/female_rob_dizhu"],
    sandaier: ["doudizhu/nv/female_three_with_one_pair"],
    jiaodizhu: ["doudizhu/nv/female_call_dizhu"],
    bujiao: ["doudizhu/nv/female_not_call"],
    ani_zhadan: ["doudizhu/nv/ani_bomb"],
    ani_shunzi: ["doudizhu/nv/ani_shunzi"],
    ani_liandui: ["doudizhu/nv/ani_liandui"],
    ani_huojian: ["doudizhu/nv/ani_rocket"],
    ani_feiji: ["doudizhu/nv/ani_feiji"],
    huojian: ["doudizhu/nv/huojian"],
    feiji: ["doudizhu/nv/feiji"],
    bomb1: ["doudizhu/nv/bomb_0"],
    liandui: ["doudizhu/nv/liandui"],
    sandaiyi: ["doudizhu/nv/sandaiyi"],
    sidaiyi: ["doudizhu/nv/sidaiyi"],
    sidaier: ["doudizhu/nv/sidaier"],
    sidaier2: ["doudizhu/nv/sidaier2"],
    sidaisan: ["doudizhu/nv/sidaisan"],
    shunzi: ["doudizhu/nv/shunzi"],
    ti: ["doudizhu/nv/ti"],
    buti: ["doudizhu/nv/buti"],
    fanti: ["doudizhu/nv/fanti"],
    pass: ["doudizhu/nv/pass_1", "doudizhu/nv/pass_2"],
    single: ["doudizhu/nv/single_1", "doudizhu/nv/single_2"],
    robDZScore1: ["doudizhu/nv/fen1"],
    robDZScore2: ["doudizhu/nv/fen2"],
    robDZScore3: ["doudizhu/nv/fen3"],
    jiabei: ["doudizhu/nv/jiabei"],
    bujiabei: ["doudizhu/nv/bujiabei"],
    sendcard: ["doudizhu/nv/sendcard"],
};
GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG] = GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_JZ];
GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU] = GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_JZ];
GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_DA_TONG] = GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_JZ];
GameSound4Play[MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI] = GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_JZ];

GameSound4Play[MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN] = {
    1: ["doudizhu/nv/1_1"],
    2: ["doudizhu/nv/1_2"],
    3: ["doudizhu/nv/1_3"],
    4: ["doudizhu/nv/1_4"],
    5: ["doudizhu/nv/1_5"],
    6: ["doudizhu/nv/1_6"],
    7: ["doudizhu/nv/1_7"],
    8: ["doudizhu/nv/1_8"],
    9: ["doudizhu/nv/1_9"],
    10: ["doudizhu/nv/1_10"],
    11: ["doudizhu/nv/1_11"],
    12: ["doudizhu/nv/1_12"],
    13: ["doudizhu/nv/1_13"],

    53: ["doudizhu/nv/53"],
    54: ["doudizhu/nv/54"],

    d1: ["doudizhu/nv/2_1"],
    d2: ["doudizhu/nv/2_2"],
    d3: ["doudizhu/nv/2_3"],
    d4: ["doudizhu/nv/2_4"],
    d5: ["doudizhu/nv/2_5"],
    d6: ["doudizhu/nv/2_6"],
    d7: ["doudizhu/nv/2_7"],
    d8: ["doudizhu/nv/2_8"],
    d9: ["doudizhu/nv/2_9"],
    d10: ["doudizhu/nv/2_10"],
    d11: ["doudizhu/nv/2_11"],
    d12: ["doudizhu/nv/2_12"],
    d13: ["doudizhu/nv/2_13"],

    s1: ["doudizhu/nv/3_1"],
    s2: ["doudizhu/nv/3_2"],
    s3: ["doudizhu/nv/3_3"],
    s4: ["doudizhu/nv/3_4"],
    s5: ["doudizhu/nv/3_5"],
    s6: ["doudizhu/nv/3_6"],
    s7: ["doudizhu/nv/3_7"],
    s8: ["doudizhu/nv/3_8"],
    s9: ["doudizhu/nv/3_9"],
    s10: ["doudizhu/nv/3_10"],
    s11: ["doudizhu/nv/3_11"],
    s12: ["doudizhu/nv/3_12"],
    s13: ["doudizhu/nv/3_13"],
    clickCards: ["doudizhu/nv/click_cards"],
    playingCards: ["doudizhu/nv/Playing_cards"],
    singer: ["doudizhu/nv/female_singer"],
    double: ["doudizhu/nv/female_double"],
    notRobDZ: ["doudizhu/nv/female_not_rob"],
    robDZ: ["doudizhu/nv/female_rob_dizhu"],
    sandaier: ["doudizhu/nv/female_three_with_one_pair"],
    jiaodizhu: ["doudizhu/nv/female_call_dizhu"],
    bujiao: ["doudizhu/nv/female_not_call"],
    ani_zhadan: ["doudizhu/nv/ani_bomb"],
    ani_shunzi: ["doudizhu/nv/ani_shunzi"],
    ani_liandui: ["doudizhu/nv/ani_liandui"],
    ani_huojian: ["doudizhu/nv/ani_rocket"],
    ani_feiji: ["doudizhu/nv/ani_feiji"],
    huojian: ["doudizhu/nv/huojian"],
    feiji: ["doudizhu/nv/feiji"],
    bomb1: ["doudizhu/nv/bomb_0"],
    liandui: ["doudizhu/nv/liandui"],
    sandaiyi: ["doudizhu/nv/sandaiyi"],
    sidaiyi: ["doudizhu/nv/sidaiyi"],
    sidaier2: ["doudizhu/nv/sidaier2"],
    sidaier: ["doudizhu/nv/sidaier"],
    shunzi: ["doudizhu/nv/shunzi"],
    ti: ["doudizhu/nv/ti"],
    buti: ["doudizhu/nv/buti"],
    fanti: ["doudizhu/nv/fanti"],
    pass: ["doudizhu/nv/pass_1", "doudizhu/nv/pass_2"],
    single: ["doudizhu/nv/single_1", "doudizhu/nv/single_2"],
};

GameSound4Play[MjClient.GAME_TYPE.BAI_PU_LIN_ZI] = {
    1: ["rugao/nv/1"],
    2: ["rugao/nv/2"],
    3: ["rugao/nv/3"],
    4: ["rugao/nv/4"],
    5: ["rugao/nv/5"],
    6: ["rugao/nv/6"],
    7: ["rugao/nv/7"],
    8: ["rugao/nv/8"],
    9: ["rugao/nv/9"],
    11: ["rugao/nv/11"],
    12: ["rugao/nv/12"],
    13: ["rugao/nv/13"],
    14: ["rugao/nv/14"],
    15: ["rugao/nv/15"],
    16: ["rugao/nv/16"],
    17: ["rugao/nv/17"],
    18: ["rugao/nv/18"],
    19: ["rugao/nv/19"],
    21: ["rugao/nv/21"],
    22: ["rugao/nv/22"],
    23: ["rugao/nv/23"],
    24: ["rugao/nv/24"],
    25: ["rugao/nv/25"],
    26: ["rugao/nv/26"],
    27: ["rugao/nv/27"],
    28: ["rugao/nv/28"],
    29: ["rugao/nv/29"],
    71: ["rugao/nv/71"],
    81: ["rugao/nv/81"],
    91: ["rugao/nv/91"],
    gang: ["rugao/nv/gang"],
    anGang: ["rugao/nv/gang"],
    fangpao: ["rugao/nv/fangpao"],
    flower: ["rugao/nv/flower"],
    hu: ["rugao/nv/hu"],
    ting: ["rugao/nv/ting"],
    peng: ["rugao/nv/peng"],
    zimo: ["rugao/nv/zimo"],
    long: ["rugao/nv/long"],
};

GameSound4Play[MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG] = {
    1: ["rugao/nv/1"],
    2: ["rugao/nv/2"],
    3: ["rugao/nv/3"],
    4: ["rugao/nv/4"],
    5: ["rugao/nv/5"],
    6: ["rugao/nv/6"],
    7: ["rugao/nv/7"],
    8: ["rugao/nv/8"],
    9: ["rugao/nv/9"],
    11: ["rugao/nv/11"],
    12: ["rugao/nv/12"],
    13: ["rugao/nv/13"],
    14: ["rugao/nv/14"],
    15: ["rugao/nv/15"],
    16: ["rugao/nv/16"],
    17: ["rugao/nv/17"],
    18: ["rugao/nv/18"],
    19: ["rugao/nv/19"],
    21: ["rugao/nv/21"],
    22: ["rugao/nv/22"],
    23: ["rugao/nv/23"],
    24: ["rugao/nv/24"],
    25: ["rugao/nv/25"],
    26: ["rugao/nv/26"],
    27: ["rugao/nv/27"],
    28: ["rugao/nv/28"],
    29: ["rugao/nv/29"],
    71: ["rugao/nv/71"],
    81: ["rugao/nv/81"],
    91: ["rugao/nv/91"],
    gang: ["rugao/nv/gang"],
    anGang: ["rugao/nv/gang"],
    fangpao: ["rugao/nv/fangpao"],
    flower: ["rugao/nv/flower"],
    hu: ["rugao/nv/hu"],
    ting: ["rugao/nv/ting"],
    peng: ["rugao/nv/peng"],
    zimo: ["rugao/nv/zimo"],
    long: ["rugao/nv/long"],
};

GameSound4Play[MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG] = {
    1: ["rugao/nv/1"],
    2: ["rugao/nv/2"],
    3: ["rugao/nv/3"],
    4: ["rugao/nv/4"],
    5: ["rugao/nv/5"],
    6: ["rugao/nv/6"],
    7: ["rugao/nv/7"],
    8: ["rugao/nv/8"],
    9: ["rugao/nv/9"],
    11: ["rugao/nv/11"],
    12: ["rugao/nv/12"],
    13: ["rugao/nv/13"],
    14: ["rugao/nv/14"],
    15: ["rugao/nv/15"],
    16: ["rugao/nv/16"],
    17: ["rugao/nv/17"],
    18: ["rugao/nv/18"],
    19: ["rugao/nv/19"],
    21: ["rugao/nv/21"],
    22: ["rugao/nv/22"],
    23: ["rugao/nv/23"],
    24: ["rugao/nv/24"],
    25: ["rugao/nv/25"],
    26: ["rugao/nv/26"],
    27: ["rugao/nv/27"],
    28: ["rugao/nv/28"],
    29: ["rugao/nv/29"],
    71: ["rugao/nv/71"],
    81: ["rugao/nv/81"],
    91: ["rugao/nv/91"],
    gang: ["rugao/nv/gang"],
    anGang: ["rugao/nv/gang"],
    fangpao: ["rugao/nv/fangpao"],
    flower: ["rugao/nv/flower"],
    hu: ["rugao/nv/hu"],
    ting: ["rugao/nv/ting"],
    peng: ["rugao/nv/peng"],
    zimo: ["rugao/nv/zimo"],
    long: ["rugao/nv/long"],
};

GameSound4Play[MjClient.GAME_TYPE.PING_YAO_KOU_DIAN] = {
    1: ["pingyao/nv/1"],
    2: ["pingyao/nv/2"],
    3: ["pingyao/nv/3"],
    4: ["pingyao/nv/4"],
    5: ["pingyao/nv/5"],
    6: ["pingyao/nv/6"],
    7: ["pingyao/nv/7"],
    8: ["pingyao/nv/8"],
    9: ["pingyao/nv/9"],
    11: ["pingyao/nv/11"],
    12: ["pingyao/nv/12"],
    13: ["pingyao/nv/13"],
    14: ["pingyao/nv/14"],
    15: ["pingyao/nv/15"],
    16: ["pingyao/nv/16"],
    17: ["pingyao/nv/17"],
    18: ["pingyao/nv/18"],
    19: ["pingyao/nv/19"],
    21: ["pingyao/nv/21"],
    22: ["pingyao/nv/22"],
    23: ["pingyao/nv/23"],
    24: ["pingyao/nv/24"],
    25: ["pingyao/nv/25"],
    26: ["pingyao/nv/26"],
    27: ["pingyao/nv/27"],
    28: ["pingyao/nv/28"],
    29: ["pingyao/nv/29"],
    31: ["pingyao/nv/31"],
    41: ["pingyao/nv/41"],
    51: ["pingyao/nv/51"],
    61: ["pingyao/nv/61"],
    71: ["pingyao/nv/71"],
    81: ["pingyao/nv/81"],
    91: ["pingyao/nv/91"],
    anGang: ["pingyao/nv/gang"],
    kaiGang: ["pingyao/nv/gang"],
    chi: ["pingyao/nv/chi"],
    fangpao: ["pingyao/nv/fangpao"],
    flower: ["pingyao/nv/flower"],
    gang: ["pingyao/nv/gang"],
    hu: ["pingyao/nv/hu"],
    peng: ["pingyao/nv/peng"],
    ting: ["pingyao/nv/ting"],
    zimo: ["pingyao/nv/zimo"]
};
GameSound4Play[MjClient.GAME_TYPE.PING_YAO_MA_JIANG] = GameSound4Play[MjClient.GAME_TYPE.PING_YAO_KOU_DIAN];

GameSound4Play[MjClient.GAME_TYPE.ML_HONG_ZI] = {
    1: ["hongzi/pth/nv/1", "hongzi/bdh/nv/1"],
    2: ["hongzi/pth/nv/2", "hongzi/bdh/nv/2"],
    3: ["hongzi/pth/nv/3", "hongzi/bdh/nv/3"],
    4: ["hongzi/pth/nv/4", "hongzi/bdh/nv/4"],
    5: ["hongzi/pth/nv/5", "hongzi/bdh/nv/5"],
    6: ["hongzi/pth/nv/6", "hongzi/bdh/nv/6"],
    7: ["hongzi/pth/nv/7", "hongzi/bdh/nv/7"],
    8: ["hongzi/pth/nv/8", "hongzi/bdh/nv/8"],
    9: ["hongzi/pth/nv/9", "hongzi/bdh/nv/9"],
    10: ["hongzi/pth/nv/10", "hongzi/bdh/nv/10"],
    21: ["hongzi/pth/nv/21", "hongzi/bdh/nv/21"],
    22: ["hongzi/pth/nv/22", "hongzi/bdh/nv/22"],
    23: ["hongzi/pth/nv/23", "hongzi/bdh/nv/23"],
    24: ["hongzi/pth/nv/24", "hongzi/bdh/nv/24"],
    25: ["hongzi/pth/nv/25", "hongzi/bdh/nv/25"],
    26: ["hongzi/pth/nv/26", "hongzi/bdh/nv/26"],
    27: ["hongzi/pth/nv/27", "hongzi/bdh/nv/27"],
    28: ["hongzi/pth/nv/28", "hongzi/bdh/nv/28"],
    29: ["hongzi/pth/nv/29", "hongzi/bdh/nv/29"],
    30: ["hongzi/pth/nv/30", "hongzi/bdh/nv/30"],
    chi: ["hongzi/pth/nv/chi", "hongzi/bdh/nv/chi"],
    fangpao: ["hongzi/pth/nv/fangpao", "hongzi/bdh/nv/fangpao"],
    peng: ["hongzi/pth/nv/peng", "hongzi/bdh/nv/peng"],
    zimoDaHu: ["hongzi/pth/nv/zimo-dahu", "hongzi/bdh/nv/zimo-dahu"],
    zimoXiaoHu: ["hongzi/pth/nv/zimo-xiaohu", "hongzi/bdh/nv/zimo-xiaohu"]
};
GameSound4Play[MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI] = GameSound4Play[MjClient.GAME_TYPE.ML_HONG_ZI];

GameSound4Play[MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI] = {
    1: ["waihuzi/nan/1", "waihuzi/nv_local/1"],
    2: ["waihuzi/nan/2", "waihuzi/nv_local/2"],
    3: ["waihuzi/nan/3", "waihuzi/nv_local/3"],
    4: ["waihuzi/nan/4", "waihuzi/nv_local/4"],
    5: ["waihuzi/nan/5", "waihuzi/nv_local/5"],
    6: ["waihuzi/nan/6", "waihuzi/nv_local/6"],
    7: ["waihuzi/nan/7", "waihuzi/nv_local/7"],
    8: ["waihuzi/nan/8", "waihuzi/nv_local/8"],
    9: ["waihuzi/nan/9", "waihuzi/nv_local/9"],
    10: ["waihuzi/nan/10","waihuzi/nv_local/10"],
    21: ["waihuzi/nan/21","waihuzi/nv_local/21"],
    22: ["waihuzi/nan/22","waihuzi/nv_local/22"],
    23: ["waihuzi/nan/23","waihuzi/nv_local/23"],
    24: ["waihuzi/nan/24","waihuzi/nv_local/24"],
    25: ["waihuzi/nan/25","waihuzi/nv_local/25"],
    26: ["waihuzi/nan/26","waihuzi/nv_local/26"],
    27: ["waihuzi/nan/27","waihuzi/nv_local/27"],
    28: ["waihuzi/nan/28","waihuzi/nv_local/28"],
    29: ["waihuzi/nan/29","waihuzi/nv_local/29"],
    30: ["waihuzi/nan/30","waihuzi/nv_local/30"],
    chi: ["waihuzi/nan/chi", "waihuzi/nv_local/chi"],
    peng: ["waihuzi/nan/peng", "waihuzi/nv_local/peng"],
    wei: ["waihuzi/nan/wei", "waihuzi/nv_local/wei"],
    liu: ["waihuzi/nan/liu", "waihuzi/nv_local/liu"],
    hu: ["waihuzi/nan/hu", "waihuzi/nv_local/hu"],
};

GameSound4Play[MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI] = {
    1: ["YiYangWaiHuZi/nv/1", "YiYangWaiHuZi/nv_local/1"],
    2: ["YiYangWaiHuZi/nv/2", "YiYangWaiHuZi/nv_local/2"],
    3: ["YiYangWaiHuZi/nv/3", "YiYangWaiHuZi/nv_local/3"],
    4: ["YiYangWaiHuZi/nv/4", "YiYangWaiHuZi/nv_local/4"],
    5: ["YiYangWaiHuZi/nv/5", "YiYangWaiHuZi/nv_local/5"],
    6: ["YiYangWaiHuZi/nv/6", "YiYangWaiHuZi/nv_local/6"],
    7: ["YiYangWaiHuZi/nv/7", "YiYangWaiHuZi/nv_local/7"],
    8: ["YiYangWaiHuZi/nv/8", "YiYangWaiHuZi/nv_local/8"],
    9: ["YiYangWaiHuZi/nv/9", "YiYangWaiHuZi/nv_local/9"],
    10: ["YiYangWaiHuZi/nv/10","YiYangWaiHuZi/nv_local/10"],
    21: ["YiYangWaiHuZi/nv/21","YiYangWaiHuZi/nv_local/21"],
    22: ["YiYangWaiHuZi/nv/22","YiYangWaiHuZi/nv_local/22"],
    23: ["YiYangWaiHuZi/nv/23","YiYangWaiHuZi/nv_local/23"],
    24: ["YiYangWaiHuZi/nv/24","YiYangWaiHuZi/nv_local/24"],
    25: ["YiYangWaiHuZi/nv/25","YiYangWaiHuZi/nv_local/25"],
    26: ["YiYangWaiHuZi/nv/26","YiYangWaiHuZi/nv_local/26"],
    27: ["YiYangWaiHuZi/nv/27","YiYangWaiHuZi/nv_local/27"],
    28: ["YiYangWaiHuZi/nv/28","YiYangWaiHuZi/nv_local/28"],
    29: ["YiYangWaiHuZi/nv/29","YiYangWaiHuZi/nv_local/29"],
    30: ["YiYangWaiHuZi/nv/30","YiYangWaiHuZi/nv_local/30"],
    chi: ["YiYangWaiHuZi/nv/chi", "YiYangWaiHuZi/nv_local/chi"],
    peng: ["YiYangWaiHuZi/nv/peng", "YiYangWaiHuZi/nv_local/peng"],
    wei: ["YiYangWaiHuZi/nv/wei", "YiYangWaiHuZi/nv_local/wei"],
    liu: ["YiYangWaiHuZi/nv/liu", "YiYangWaiHuZi/nv_local/liu"],
    hu: ["YiYangWaiHuZi/nv/hu", "YiYangWaiHuZi/nv_local/hu"],
    piao: ["YiYangWaiHuZi/nv/piao", "YiYangWaiHuZi/nv_local/piao"],
    danshen: ["YiYangWaiHuZi/nv/danshen", "YiYangWaiHuZi/nv_local/danshen"],
    shuangshen: ["YiYangWaiHuZi/nv/shuangshen", "YiYangWaiHuZi/nv_local/shuangshen"],
    meishen: ["YiYangWaiHuZi/nv/meishen", "YiYangWaiHuZi/nv_local/meishen"],
    youshen: ["YiYangWaiHuZi/nv/youshen", "YiYangWaiHuZi/nv_local/youshen"],
    sishou: ["YiYangWaiHuZi/nv/sishou", "YiYangWaiHuZi/nv_local/sishou"],
};
GameSound4Play[MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI] = GameSound4Play[MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI];
GameSound4Play[MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI] = GameSound4Play[MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI];
GameSound4Play[MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI][30] = ["YiYangWaiHuZi/nv/30","YuanJiangGuiHuZi/nv_local/30"];
GameSound4Play[MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU] = {
    1: ["fulushou/nv/11"],
    2: ["fulushou/nv/12"],
    3: ["fulushou/nv/13"],
    11: ["fulushou/nv/21"],
    12: ["fulushou/nv/22"],
    13: ["fulushou/nv/23"],
    21: ["fulushou/nv/31"],
    22: ["fulushou/nv/32"],
    23: ["fulushou/nv/33"],
    31: ["fulushou/nv/41"],
    32: ["fulushou/nv/42"],
    33: ["fulushou/nv/43"],
    41: ["fulushou/nv/51"],
    42: ["fulushou/nv/52"],
    43: ["fulushou/nv/53"],
    51: ["fulushou/nv/61"],
    52: ["fulushou/nv/62"],
    53: ["fulushou/nv/63"],
    61: ["fulushou/nv/71"],
    62: ["fulushou/nv/72"],
    63: ["fulushou/nv/73"],
    71: ["fulushou/nv/81"],
    72: ["fulushou/nv/82"],
    73: ["fulushou/nv/83"],
    chi: ["fulushou/nv/chi"],
    peng: ["fulushou/nv/peng"],
    gang: ["fulushou/nv/gang"],
    zhao: ["fulushou/nv/zhao"],
    hu: ["fulushou/nv/hu"],
}
GameSound4Play[MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG] = GameSound4Play[MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU];

GameSound4Play[MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE] = {
    1: ["niushibie/nv/dp1"],
    2: ["niushibie/nv/dp2"],
    3: ["niushibie/nv/dp3"],
    4: ["niushibie/nv/dp4"],
    5: ["niushibie/nv/dp5"],
    6: ["niushibie/nv/dp6"],
    7: ["niushibie/nv/dp7"],
    8: ["niushibie/nv/dp8"],
    9: ["niushibie/nv/dp9"],
    10: ["niushibie/nv/dp10"],
    11: ["niushibie/nv/dp11"],
    12: ["niushibie/nv/dp12"],
    13: ["niushibie/nv/dp13"],

    53: ["niushibie/nv/dpxiaogui"],
    54: ["niushibie/nv/dpdagui"],

    d1: ["niushibie/nv/dz1"],
    d2: ["niushibie/nv/dz2"],
    d3: ["niushibie/nv/dz3"],
    d4: ["niushibie/nv/dz4"],
    d5: ["niushibie/nv/dz5"],
    d6: ["niushibie/nv/dz6"],
    d7: ["niushibie/nv/dz7"],
    d8: ["niushibie/nv/dz8"],
    d9: ["niushibie/nv/dz9"],
    d10: ["niushibie/nv/dz10"],
    d11: ["niushibie/nv/dz11"],
    d12: ["niushibie/nv/dz12"],
    d13: ["niushibie/nv/dz13"],

    d53: ["niushibie/nv/dzxiaogui"],
    d54: ["niushibie/nv/dzdagui"],

    s1: ["niushibie/nv/sz1"],
    s2: ["niushibie/nv/sz2"],
    s3: ["niushibie/nv/sz3"],
    s4: ["niushibie/nv/sz4"],
    s5: ["niushibie/nv/sz5"],
    s6: ["niushibie/nv/sz6"],
    s7: ["niushibie/nv/sz7"],
    s8: ["niushibie/nv/sz8"],
    s9: ["niushibie/nv/sz9"],
    s10: ["niushibie/nv/sz10"],
    s11: ["niushibie/nv/sz11"],
    s12: ["niushibie/nv/sz12"],
    s13: ["niushibie/nv/sz13"],

    f_510k: ["niushibie/nv/Z510k"],
    z_510k: ["niushibie/nv/F510k"],
    feiji: ["niushibie/nv/feiji"],
    shunzi: ["niushibie/nv/Fshunzi"],
    liandui: ["niushibie/nv/liandui2"],
    lian3dui: ["niushibie/nv/liandui3"],
    sandaier: ["niushibie/nv/sd2"],
    wangzha: ["niushibie/nv/sibangui"],
    tonghuashun: ["niushibie/nv/Zshunzi"],
    bomb1: ["niushibie/nv/zhandan1","niushibie/nv/zhandan2","niushibie/nv/zhandan3"],

    mingpai: ["niushibie/nv/mingpai"],
    pass: ["niushibie/nv/buyao1", "niushibie/nv/buyao2"],
    touyou: ["niushibie/nv/shangyou"],
    
    ani_liandui: ["niushibie/ani_liandui"],
    ani_feiji: ["niushibie/ani_feiji"],
    ani_K105: ["niushibie/ani_K105"],
    ani_wangzha: ["niushibie/ani_wangzha"],
    ani_zhadan: ["niushibie/ani_zhadan"],
    ani_shunzi: ["paodekuai/nv/ani_shunzi"],
    
    clickCards: ["paodekuai/nv/click_cards"],
}

GameSound4Play[MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI] = {
    // 单牌
    1: ["damazi/nv/dp1"],
    2: ["damazi/nv/dp2"],
    3: ["damazi/nv/dp3"],
    4: ["damazi/nv/dp4"],
    5: ["damazi/nv/dp5"],
    6: ["damazi/nv/dp6"],
    7: ["damazi/nv/dp7"],
    8: ["damazi/nv/dp8"],
    9: ["damazi/nv/dp9"],
    10: ["damazi/nv/dp10"],
    11: ["damazi/nv/dp11"],
    12: ["damazi/nv/dp12"],
    13: ["damazi/nv/dp13"],

    53: ["damazi/nv/dpxiaogui"],
    54: ["damazi/nv/dpdagui"],

    // 对子
    d1: ["damazi/nv/dz1"],
    d2: ["damazi/nv/dz2"],
    d3: ["damazi/nv/dz3"],
    d4: ["damazi/nv/dz4"],
    d5: ["damazi/nv/dz5"],
    d6: ["damazi/nv/dz6"],
    d7: ["damazi/nv/dz7"],
    d8: ["damazi/nv/dz8"],
    d9: ["damazi/nv/dz9"],
    d10: ["damazi/nv/dz10"],
    d11: ["damazi/nv/dz11"],
    d12: ["damazi/nv/dz12"],
    d13: ["damazi/nv/dz13"],

    d53: ["damazi/nv/dzxiaogui"],
    d5354: ["damazi/nv/dzgui"],
    d54: ["damazi/nv/dzdagui"],

    // 连对
    lian2dui: ["damazi/nv/liandui2"],
    lian3dui: ["damazi/nv/liandui3"],
    lian4dui: ["damazi/nv/liandui4"],
    lian5dui: ["damazi/nv/liandui5"],
    lian6dui: ["damazi/nv/liandui6"],
    lian7dui: ["damazi/nv/liandui7"],
    lian8dui: ["damazi/nv/liandui8"],
    lian9dui: ["damazi/nv/liandui2"],
    lian10dui: ["damazi/nv/liandui10"],
    lian11dui: ["damazi/nv/liandui11"],
    lian12dui: ["damazi/nv/liandui"],
    lian13dui: ["damazi/nv/liandui"],

    // 三张
    s1: ["damazi/nv/sz1"],
    s2: ["damazi/nv/sz2"],
    s3: ["damazi/nv/sz3"],
    s4: ["damazi/nv/sz4"],
    s5: ["damazi/nv/sz5"],
    s6: ["damazi/nv/sz6"],
    s7: ["damazi/nv/sz7"],
    s8: ["damazi/nv/sz8"],
    s9: ["damazi/nv/sz9"],
    s10: ["damazi/nv/sz10"],
    s11: ["damazi/nv/sz11"],
    s12: ["damazi/nv/sz12"],
    s13: ["damazi/nv/sz13"],

    sgui: ["damazi/nv/szgui"],

    // 四张
    sizhang1: ["damazi/nv/siban1"],
    sizhang2: ["damazi/nv/siban2"],
    sizhang3: ["damazi/nv/siban3"],
    sizhang4: ["damazi/nv/siban4"],
    sizhang5: ["damazi/nv/siban5"],
    sizhang6: ["damazi/nv/siban6"],
    sizhang7: ["damazi/nv/siban7"],
    sizhang8: ["damazi/nv/siban8"],
    sizhang9: ["damazi/nv/siban9"],
    sizhang10: ["damazi/nv/siban10"],
    sizhang11: ["damazi/nv/siban11"],
    sizhang12: ["damazi/nv/siban12"],
    sizhang13: ["damazi/nv/siban13"],

    wangzha: ["damazi/nv/sibangui"],

    // 五张
    wuzhang1: ["damazi/nv/wuban1"],
    wuzhang2: ["damazi/nv/wuban2"],
    wuzhang3: ["damazi/nv/wuban3"],
    wuzhang4: ["damazi/nv/wuban4"],
    wuzhang5: ["damazi/nv/wuban5"],
    wuzhang6: ["damazi/nv/wuban6"],
    wuzhang7: ["damazi/nv/wuban7"],
    wuzhang8: ["damazi/nv/wuban8"],
    wuzhang9: ["damazi/nv/wuban9"],
    wuzhang10: ["damazi/nv/wuban10"],
    wuzhang11: ["damazi/nv/wuban11"],
    wuzhang12: ["damazi/nv/wuban12"],
    wuzhang13: ["damazi/nv/wuban13"],

    // 六张
    zhadan6: ["damazi/nv/banzi6"],

    // 七张
    zhadan7: ["damazi/nv/banzi7"],

    // 八张
    zhadan8: ["damazi/nv/banzi8"],

    // 明牌
    mingpai: ["damazi/nv/buyao2"],
    // 过牌
    pass: ["damazi/nv/buyao1"],
    // 同花510K
    f_510k: ["damazi/nv/Z510k"],
    // 杂花510K
    z_510k: ["damazi/nv/F510k"],
    feiji: ["niushibie/nv/feiji"],

    touyou: ["niushibie/nv/shangyou"],
    
    ani_liandui: ["niushibie/ani_liandui"],
    ani_feiji: ["niushibie/ani_feiji"],
    ani_K105: ["niushibie/ani_K105"],
    ani_wangzha: ["niushibie/ani_wangzha"],
    ani_zhadan: ["niushibie/ani_zhadan"],
    
    clickCards: ["paodekuai/nv/click_cards"],
}

GameSound4Play[MjClient.GAME_TYPE.CHONG_YANG_DA_GUN] = {
    // 单牌
    1: ["damazi/nv/dp1"],
    2: ["damazi/nv/dp2"],
    3: ["damazi/nv/dp3"],
    4: ["damazi/nv/dp4"],
    5: ["damazi/nv/dp5"],
    6: ["damazi/nv/dp6"],
    7: ["damazi/nv/dp7"],
    8: ["damazi/nv/dp8"],
    9: ["damazi/nv/dp9"],
    10: ["damazi/nv/dp10"],
    11: ["damazi/nv/dp11"],
    12: ["damazi/nv/dp12"],
    13: ["damazi/nv/dp13"],

    53: ["damazi/nv/dpxiaogui"],
    54: ["damazi/nv/dpdagui"],

    // 对子
    d1: ["damazi/nv/dz1"],
    d2: ["damazi/nv/dz2"],
    d3: ["damazi/nv/dz3"],
    d4: ["damazi/nv/dz4"],
    d5: ["damazi/nv/dz5"],
    d6: ["damazi/nv/dz6"],
    d7: ["damazi/nv/dz7"],
    d8: ["damazi/nv/dz8"],
    d9: ["damazi/nv/dz9"],
    d10: ["damazi/nv/dz10"],
    d11: ["damazi/nv/dz11"],
    d12: ["damazi/nv/dz12"],
    d13: ["damazi/nv/dz13"],

    d53: ["damazi/nv/dzxiaogui"],
    d5354: ["damazi/nv/dzgui"],
    d54: ["damazi/nv/dzdagui"],

    // 连对
    lian2dui: ["damazi/nv/liandui2"],
    lian3dui: ["damazi/nv/liandui3"],
    lian4dui: ["damazi/nv/liandui4"],
    lian5dui: ["damazi/nv/liandui5"],
    lian6dui: ["damazi/nv/liandui6"],
    lian7dui: ["damazi/nv/liandui7"],
    lian8dui: ["damazi/nv/liandui8"],
    lian9dui: ["damazi/nv/liandui2"],
    lian10dui: ["damazi/nv/liandui10"],
    lian11dui: ["damazi/nv/liandui11"],
    lian12dui: ["damazi/nv/liandui"],
    lian13dui: ["damazi/nv/liandui"],

    // 三张
    s1: ["damazi/nv/sz1"],
    s2: ["damazi/nv/sz2"],
    s3: ["damazi/nv/sz3"],
    s4: ["damazi/nv/sz4"],
    s5: ["damazi/nv/sz5"],
    s6: ["damazi/nv/sz6"],
    s7: ["damazi/nv/sz7"],
    s8: ["damazi/nv/sz8"],
    s9: ["damazi/nv/sz9"],
    s10: ["damazi/nv/sz10"],
    s11: ["damazi/nv/sz11"],
    s12: ["damazi/nv/sz12"],
    s13: ["damazi/nv/sz13"],

    sgui: ["damazi/nv/szgui"],

    // 四张
    sizhang1: ["damazi/nv/siban1"],
    sizhang2: ["damazi/nv/siban2"],
    sizhang3: ["damazi/nv/siban3"],
    sizhang4: ["damazi/nv/siban4"],
    sizhang5: ["damazi/nv/siban5"],
    sizhang6: ["damazi/nv/siban6"],
    sizhang7: ["damazi/nv/siban7"],
    sizhang8: ["damazi/nv/siban8"],
    sizhang9: ["damazi/nv/siban9"],
    sizhang10: ["damazi/nv/siban10"],
    sizhang11: ["damazi/nv/siban11"],
    sizhang12: ["damazi/nv/siban12"],
    sizhang13: ["damazi/nv/siban13"],

    wangzha: ["damazi/nv/sibangui"],

    // 五张
    wuzhang1: ["damazi/nv/wuban1"],
    wuzhang2: ["damazi/nv/wuban2"],
    wuzhang3: ["damazi/nv/wuban3"],
    wuzhang4: ["damazi/nv/wuban4"],
    wuzhang5: ["damazi/nv/wuban5"],
    wuzhang6: ["damazi/nv/wuban6"],
    wuzhang7: ["damazi/nv/wuban7"],
    wuzhang8: ["damazi/nv/wuban8"],
    wuzhang9: ["damazi/nv/wuban9"],
    wuzhang10: ["damazi/nv/wuban10"],
    wuzhang11: ["damazi/nv/wuban11"],
    wuzhang12: ["damazi/nv/wuban12"],
    wuzhang13: ["damazi/nv/wuban13"],

    // 六张
    zhadan6: ["damazi/nv/banzi6"],

    // 七张
    zhadan7: ["damazi/nv/banzi7"],

    // 八张
    zhadan8: ["damazi/nv/banzi8"],

    // 明牌
    mingpai: ["damazi/nv/buyao2"],
    // 过牌
    pass: ["damazi/nv/buyao1"],
    // 同花510K
    f_510k: ["damazi/nv/Z510k"],
    // 杂花510K
    z_510k: ["damazi/nv/F510k"],
    feiji: ["niushibie/nv/feiji"],

    touyou: ["niushibie/nv/shangyou"],
    
    ani_liandui: ["niushibie/ani_liandui"],
    ani_feiji: ["niushibie/ani_feiji"],
    ani_K105: ["niushibie/ani_K105"],
    ani_wangzha: ["niushibie/ani_wangzha"],
    ani_zhadan: ["niushibie/ani_zhadan"],
    zhandan:["damazi/nv/zhandan3"],

    
    clickCards: ["paodekuai/nv/click_cards"],
}

GameSound4Play[MjClient.GAME_TYPE.DA_YE_DA_GONG] = {
    // 单牌
    1: ["damazi/nv/dp1"],
    2: ["damazi/nv/dp2"],
    3: ["damazi/nv/dp3"],
    4: ["damazi/nv/dp4"],
    5: ["damazi/nv/dp5"],
    6: ["damazi/nv/dp6"],
    7: ["damazi/nv/dp7"],
    8: ["damazi/nv/dp8"],
    9: ["damazi/nv/dp9"],
    10: ["damazi/nv/dp10"],
    11: ["damazi/nv/dp11"],
    12: ["damazi/nv/dp12"],
    13: ["damazi/nv/dp13"],

    53: ["damazi/nv/dpxiaogui"],
    54: ["damazi/nv/dpdagui"],

    // 对子
    d1: ["damazi/nv/dz1"],
    d2: ["damazi/nv/dz2"],
    d3: ["damazi/nv/dz3"],
    d4: ["damazi/nv/dz4"],
    d5: ["damazi/nv/dz5"],
    d6: ["damazi/nv/dz6"],
    d7: ["damazi/nv/dz7"],
    d8: ["damazi/nv/dz8"],
    d9: ["damazi/nv/dz9"],
    d10: ["damazi/nv/dz10"],
    d11: ["damazi/nv/dz11"],
    d12: ["damazi/nv/dz12"],
    d13: ["damazi/nv/dz13"],

    d53: ["damazi/nv/dzxiaogui"],
    d5354: ["damazi/nv/dzgui"],
    d54: ["damazi/nv/dzdagui"],

    // 连对
    lian2dui: ["damazi/nv/liandui2"],
    lian3dui: ["damazi/nv/liandui3"],
    lian4dui: ["damazi/nv/liandui4"],
    lian5dui: ["damazi/nv/liandui5"],
    lian6dui: ["damazi/nv/liandui6"],
    lian7dui: ["damazi/nv/liandui7"],
    lian8dui: ["damazi/nv/liandui8"],
    lian9dui: ["damazi/nv/liandui2"],
    lian10dui: ["damazi/nv/liandui10"],
    lian11dui: ["damazi/nv/liandui11"],
    lian12dui: ["damazi/nv/liandui"],
    lian13dui: ["damazi/nv/liandui"],

    // 三张
    s1: ["damazi/nv/sz1"],
    s2: ["damazi/nv/sz2"],
    s3: ["damazi/nv/sz3"],
    s4: ["damazi/nv/sz4"],
    s5: ["damazi/nv/sz5"],
    s6: ["damazi/nv/sz6"],
    s7: ["damazi/nv/sz7"],
    s8: ["damazi/nv/sz8"],
    s9: ["damazi/nv/sz9"],
    s10: ["damazi/nv/sz10"],
    s11: ["damazi/nv/sz11"],
    s12: ["damazi/nv/sz12"],
    s13: ["damazi/nv/sz13"],

    sgui: ["damazi/nv/szgui"],

    // 四张
    sizhang1: ["damazi/nv/siban1"],
    sizhang2: ["damazi/nv/siban2"],
    sizhang3: ["damazi/nv/siban3"],
    sizhang4: ["damazi/nv/siban4"],
    sizhang5: ["damazi/nv/siban5"],
    sizhang6: ["damazi/nv/siban6"],
    sizhang7: ["damazi/nv/siban7"],
    sizhang8: ["damazi/nv/siban8"],
    sizhang9: ["damazi/nv/siban9"],
    sizhang10: ["damazi/nv/siban10"],
    sizhang11: ["damazi/nv/siban11"],
    sizhang12: ["damazi/nv/siban12"],
    sizhang13: ["damazi/nv/siban13"],

    wangzha: ["damazi/nv/sibangui"],

    // 五张
    wuzhang1: ["damazi/nv/wuban1"],
    wuzhang2: ["damazi/nv/wuban2"],
    wuzhang3: ["damazi/nv/wuban3"],
    wuzhang4: ["damazi/nv/wuban4"],
    wuzhang5: ["damazi/nv/wuban5"],
    wuzhang6: ["damazi/nv/wuban6"],
    wuzhang7: ["damazi/nv/wuban7"],
    wuzhang8: ["damazi/nv/wuban8"],
    wuzhang9: ["damazi/nv/wuban9"],
    wuzhang10: ["damazi/nv/wuban10"],
    wuzhang11: ["damazi/nv/wuban11"],
    wuzhang12: ["damazi/nv/wuban12"],
    wuzhang13: ["damazi/nv/wuban13"],

    // 六张
    zhadan6: ["damazi/nv/banzi6"],

    // 七张
    zhadan7: ["damazi/nv/banzi7"],

    // 八张
    zhadan8: ["damazi/nv/banzi8"],

    // 明牌
    mingpai: ["damazi/nv/buyao2"],
    // 过牌
    pass: ["damazi/nv/buyao1"],
    // 同花510K
    f_510k: ["damazi/nv/Z510k"],
    // 杂花510K
    z_510k: ["damazi/nv/F510k"],
    feiji: ["niushibie/nv/feiji"],

    touyou: ["niushibie/nv/shangyou"],
    
    ani_liandui: ["niushibie/ani_liandui"],
    ani_feiji: ["niushibie/ani_feiji"],
    ani_K105: ["niushibie/ani_K105"],
    ani_wangzha: ["niushibie/ani_wangzha"],
    ani_zhadan: ["niushibie/ani_zhadan"],
    zhandan:["damazi/nv/zhandan3"],

    
    clickCards: ["paodekuai/nv/click_cards"],
}

GameSound4Play[MjClient.GAME_TYPE.TONG_SHAN_DA_GONG] = {
    // 单牌
    1: ["damazi/nv/dp1"],
    2: ["damazi/nv/dp2"],
    3: ["damazi/nv/dp3"],
    4: ["damazi/nv/dp4"],
    5: ["damazi/nv/dp5"],
    6: ["damazi/nv/dp6"],
    7: ["damazi/nv/dp7"],
    8: ["damazi/nv/dp8"],
    9: ["damazi/nv/dp9"],
    10: ["damazi/nv/dp10"],
    11: ["damazi/nv/dp11"],
    12: ["damazi/nv/dp12"],
    13: ["damazi/nv/dp13"],

    53: ["damazi/nv/dpxiaogui"],
    54: ["damazi/nv/dpdagui"],

    // 对子
    d1: ["damazi/nv/dz1"],
    d2: ["damazi/nv/dz2"],
    d3: ["damazi/nv/dz3"],
    d4: ["damazi/nv/dz4"],
    d5: ["damazi/nv/dz5"],
    d6: ["damazi/nv/dz6"],
    d7: ["damazi/nv/dz7"],
    d8: ["damazi/nv/dz8"],
    d9: ["damazi/nv/dz9"],
    d10: ["damazi/nv/dz10"],
    d11: ["damazi/nv/dz11"],
    d12: ["damazi/nv/dz12"],
    d13: ["damazi/nv/dz13"],

    d53: ["damazi/nv/dzxiaogui"],
    d5354: ["damazi/nv/dzgui"],
    d54: ["damazi/nv/dzdagui"],

    // 连对
    lian2dui: ["damazi/nv/liandui2"],
    lian3dui: ["damazi/nv/liandui3"],
    lian4dui: ["damazi/nv/liandui4"],
    lian5dui: ["damazi/nv/liandui5"],
    lian6dui: ["damazi/nv/liandui6"],
    lian7dui: ["damazi/nv/liandui7"],
    lian8dui: ["damazi/nv/liandui8"],
    lian9dui: ["damazi/nv/liandui2"],
    lian10dui: ["damazi/nv/liandui10"],
    lian11dui: ["damazi/nv/liandui11"],
    lian12dui: ["damazi/nv/liandui"],
    lian13dui: ["damazi/nv/liandui"],

    // 三张
    s1: ["damazi/nv/sz1"],
    s2: ["damazi/nv/sz2"],
    s3: ["damazi/nv/sz3"],
    s4: ["damazi/nv/sz4"],
    s5: ["damazi/nv/sz5"],
    s6: ["damazi/nv/sz6"],
    s7: ["damazi/nv/sz7"],
    s8: ["damazi/nv/sz8"],
    s9: ["damazi/nv/sz9"],
    s10: ["damazi/nv/sz10"],
    s11: ["damazi/nv/sz11"],
    s12: ["damazi/nv/sz12"],
    s13: ["damazi/nv/sz13"],

    sgui: ["damazi/nv/szgui"],

    // 四张
    sizhang1: ["damazi/nv/siban1"],
    sizhang2: ["damazi/nv/siban2"],
    sizhang3: ["damazi/nv/siban3"],
    sizhang4: ["damazi/nv/siban4"],
    sizhang5: ["damazi/nv/siban5"],
    sizhang6: ["damazi/nv/siban6"],
    sizhang7: ["damazi/nv/siban7"],
    sizhang8: ["damazi/nv/siban8"],
    sizhang9: ["damazi/nv/siban9"],
    sizhang10: ["damazi/nv/siban10"],
    sizhang11: ["damazi/nv/siban11"],
    sizhang12: ["damazi/nv/siban12"],
    sizhang13: ["damazi/nv/siban13"],

    wangzha: ["damazi/nv/sibangui"],

    // 五张
    wuzhang1: ["damazi/nv/wuban1"],
    wuzhang2: ["damazi/nv/wuban2"],
    wuzhang3: ["damazi/nv/wuban3"],
    wuzhang4: ["damazi/nv/wuban4"],
    wuzhang5: ["damazi/nv/wuban5"],
    wuzhang6: ["damazi/nv/wuban6"],
    wuzhang7: ["damazi/nv/wuban7"],
    wuzhang8: ["damazi/nv/wuban8"],
    wuzhang9: ["damazi/nv/wuban9"],
    wuzhang10: ["damazi/nv/wuban10"],
    wuzhang11: ["damazi/nv/wuban11"],
    wuzhang12: ["damazi/nv/wuban12"],
    wuzhang13: ["damazi/nv/wuban13"],

    // 六张
    zhadan6: ["damazi/nv/banzi6"],

    // 七张
    zhadan7: ["damazi/nv/banzi7"],

    // 八张
    zhadan8: ["damazi/nv/banzi8"],

    // 明牌
    mingpai: ["damazi/nv/buyao2"],
    // 过牌
    pass: ["damazi/nv/buyao1"],
    // 同花510K
    f_510k: ["damazi/nv/Z510k"],
    // 杂花510K
    z_510k: ["damazi/nv/F510k"],
    feiji: ["niushibie/nv/feiji"],

    touyou: ["niushibie/nv/shangyou"],
    
    ani_liandui: ["niushibie/ani_liandui"],
    ani_feiji: ["niushibie/ani_feiji"],
    ani_K105: ["niushibie/ani_K105"],
    ani_wangzha: ["niushibie/ani_wangzha"],
    ani_zhadan: ["niushibie/ani_zhadan"],
    zhandan:["damazi/nv/zhandan3"],
    wangzhan_new:["damazi/nv/ww_v_wz"],

    
    clickCards: ["paodekuai/nv/click_cards"],
}

GameSound4Play[MjClient.GAME_TYPE.DA_YE_510K] = {
    // 单牌
    1: ["damazi/nv/dp1"],
    2: ["damazi/nv/dp2"],
    3: ["damazi/nv/dp3"],
    4: ["damazi/nv/dp4"],
    5: ["damazi/nv/dp5"],
    6: ["damazi/nv/dp6"],
    7: ["damazi/nv/dp7"],
    8: ["damazi/nv/dp8"],
    9: ["damazi/nv/dp9"],
    10: ["damazi/nv/dp10"],
    11: ["damazi/nv/dp11"],
    12: ["damazi/nv/dp12"],
    13: ["damazi/nv/dp13"],

    53: ["damazi/nv/dpxiaogui"],
    54: ["damazi/nv/dpdagui"],

    // 对子
    d1: ["damazi/nv/dz1"],
    d2: ["damazi/nv/dz2"],
    d3: ["damazi/nv/dz3"],
    d4: ["damazi/nv/dz4"],
    d5: ["damazi/nv/dz5"],
    d6: ["damazi/nv/dz6"],
    d7: ["damazi/nv/dz7"],
    d8: ["damazi/nv/dz8"],
    d9: ["damazi/nv/dz9"],
    d10: ["damazi/nv/dz10"],
    d11: ["damazi/nv/dz11"],
    d12: ["damazi/nv/dz12"],
    d13: ["damazi/nv/dz13"],

    d53: ["damazi/nv/dzxiaogui"],
    d5354: ["damazi/nv/dzgui"],
    d54: ["damazi/nv/dzdagui"],

    // 连对
    lian2dui: ["damazi/nv/liandui2"],
    lian3dui: ["damazi/nv/liandui3"],
    lian4dui: ["damazi/nv/liandui4"],
    lian5dui: ["damazi/nv/liandui5"],
    lian6dui: ["damazi/nv/liandui6"],
    lian7dui: ["damazi/nv/liandui7"],
    lian8dui: ["damazi/nv/liandui8"],
    lian9dui: ["damazi/nv/liandui2"],
    lian10dui: ["damazi/nv/liandui10"],
    lian11dui: ["damazi/nv/liandui11"],
    lian12dui: ["damazi/nv/liandui"],
    lian13dui: ["damazi/nv/liandui"],

    // 三张
    s1: ["damazi/nv/sz1"],
    s2: ["damazi/nv/sz2"],
    s3: ["damazi/nv/sz3"],
    s4: ["damazi/nv/sz4"],
    s5: ["damazi/nv/sz5"],
    s6: ["damazi/nv/sz6"],
    s7: ["damazi/nv/sz7"],
    s8: ["damazi/nv/sz8"],
    s9: ["damazi/nv/sz9"],
    s10: ["damazi/nv/sz10"],
    s11: ["damazi/nv/sz11"],
    s12: ["damazi/nv/sz12"],
    s13: ["damazi/nv/sz13"],

    sgui: ["damazi/nv/szgui"],

    // 四张
    sizhang1: ["damazi/nv/siban1"],
    sizhang2: ["damazi/nv/siban2"],
    sizhang3: ["damazi/nv/siban3"],
    sizhang4: ["damazi/nv/siban4"],
    sizhang5: ["damazi/nv/siban5"],
    sizhang6: ["damazi/nv/siban6"],
    sizhang7: ["damazi/nv/siban7"],
    sizhang8: ["damazi/nv/siban8"],
    sizhang9: ["damazi/nv/siban9"],
    sizhang10: ["damazi/nv/siban10"],
    sizhang11: ["damazi/nv/siban11"],
    sizhang12: ["damazi/nv/siban12"],
    sizhang13: ["damazi/nv/siban13"],

    wangzha: ["damazi/nv/sibangui"],

    // 五张
    wuzhang1: ["damazi/nv/wuban1"],
    wuzhang2: ["damazi/nv/wuban2"],
    wuzhang3: ["damazi/nv/wuban3"],
    wuzhang4: ["damazi/nv/wuban4"],
    wuzhang5: ["damazi/nv/wuban5"],
    wuzhang6: ["damazi/nv/wuban6"],
    wuzhang7: ["damazi/nv/wuban7"],
    wuzhang8: ["damazi/nv/wuban8"],
    wuzhang9: ["damazi/nv/wuban9"],
    wuzhang10: ["damazi/nv/wuban10"],
    wuzhang11: ["damazi/nv/wuban11"],
    wuzhang12: ["damazi/nv/wuban12"],
    wuzhang13: ["damazi/nv/wuban13"],

    // 六张
    zhadan6: ["damazi/nv/banzi6"],

    // 七张
    zhadan7: ["damazi/nv/banzi7"],

    // 八张
    zhadan8: ["damazi/nv/banzi8"],

    // 明牌
    mingpai: ["damazi/nv/buyao2"],
    // 过牌
    pass: ["damazi/nv/buyao1"],
    // 同花510K
    f_510k: ["damazi/nv/Z510k"],
    // 杂花510K
    z_510k: ["damazi/nv/F510k"],
    feiji: ["niushibie/nv/feiji"],

    touyou: ["niushibie/nv/shangyou"],
    
    ani_liandui: ["niushibie/ani_liandui"],
    ani_feiji: ["niushibie/ani_feiji"],
    ani_K105: ["niushibie/ani_K105"],
    ani_wangzha: ["niushibie/ani_wangzha"],
    ani_zhadan: ["niushibie/ani_zhadan"],
    zhandan: ["damazi/nv/zhandan3"],

    ani_shunzi: ["damazi/nv/ani_shunzi"],
    shunzi: ["damazi/nv/shunzi"],
    
    clickCards: ["paodekuai/nv/click_cards"],
}
GameSound4Play[MjClient.GAME_TYPE.QI_CHUN_DA_GONG] = GameSound4Play[MjClient.GAME_TYPE.DA_YE_510K];
GameSound4Play[MjClient.GAME_TYPE.WU_XUE_510K] = GameSound4Play[MjClient.GAME_TYPE.DA_YE_510K];
GameSound4Play[MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN] = GameSound4Play[MjClient.GAME_TYPE.DA_YE_510K];

GameSound4Play[MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU] = {
    1: ["yijiaolaiyou/nv/1", "yijiaolaiyou/nv_local/1"],
    2: ["yijiaolaiyou/nv/2", "yijiaolaiyou/nv_local/2"],
    3: ["yijiaolaiyou/nv/3", "yijiaolaiyou/nv_local/3"],
    4: ["yijiaolaiyou/nv/4", "yijiaolaiyou/nv_local/4"],
    5: ["yijiaolaiyou/nv/5", "yijiaolaiyou/nv_local/5"],
    6: ["yijiaolaiyou/nv/6", "yijiaolaiyou/nv_local/6"],
    7: ["yijiaolaiyou/nv/7", "yijiaolaiyou/nv_local/7"],
    8: ["yijiaolaiyou/nv/8", "yijiaolaiyou/nv_local/8"],
    9: ["yijiaolaiyou/nv/9", "yijiaolaiyou/nv_local/9"],
    11: ["yijiaolaiyou/nv/11", "yijiaolaiyou/nv_local/11"],
    12: ["yijiaolaiyou/nv/12", "yijiaolaiyou/nv_local/12"],
    13: ["yijiaolaiyou/nv/13", "yijiaolaiyou/nv_local/13"],
    14: ["yijiaolaiyou/nv/14", "yijiaolaiyou/nv_local/14"],
    15: ["yijiaolaiyou/nv/15", "yijiaolaiyou/nv_local/15"],
    16: ["yijiaolaiyou/nv/16", "yijiaolaiyou/nv_local/16"],
    17: ["yijiaolaiyou/nv/17", "yijiaolaiyou/nv_local/17"],
    18: ["yijiaolaiyou/nv/18", "yijiaolaiyou/nv_local/18"],
    19: ["yijiaolaiyou/nv/19", "yijiaolaiyou/nv_local/19"],
    21: ["yijiaolaiyou/nv/21","yijiaolaiyou/nv_local/21"],
    22: ["yijiaolaiyou/nv/22","yijiaolaiyou/nv_local/22"],
    23: ["yijiaolaiyou/nv/23","yijiaolaiyou/nv_local/23"],
    24: ["yijiaolaiyou/nv/24","yijiaolaiyou/nv_local/24"],
    25: ["yijiaolaiyou/nv/25","yijiaolaiyou/nv_local/25"],
    26: ["yijiaolaiyou/nv/26","yijiaolaiyou/nv_local/26"],
    27: ["yijiaolaiyou/nv/27","yijiaolaiyou/nv_local/27"],
    28: ["yijiaolaiyou/nv/28","yijiaolaiyou/nv_local/28"],
    29: ["yijiaolaiyou/nv/29","yijiaolaiyou/nv_local/29"],
    peng: ["yijiaolaiyou/nv/peng", "yijiaolaiyou/nv_local/peng"],
    hu: ["yijiaolaiyou/nv/hu", "yijiaolaiyou/nv_local/hu"],
    bu: ["yijiaolaiyou/nv/bu", "yijiaolaiyou/nv_local/bu"],
    fangpao: ["yijiaolaiyou/nv/fangpao", "yijiaolaiyou/nv_local/fangpao"],
    gang: ["yijiaolaiyou/nv/gang", "yijiaolaiyou/nv_local/gang"],
    anGang: ["yijiaolaiyou/nv/gang", "yijiaolaiyou/nv_local/gang"],
    zimo: ["yijiaolaiyou/nv/zimo", "yijiaolaiyou/nv_local/zimo"],
};

GameSound4Play[MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN]  = {
    "10":["daZhaDan/nv/10"],
    "10bomb":["daZhaDan/nv/10bomb"],
    "10d":["daZhaDan/nv/10d"],
    "10t":["daZhaDan/nv/10t"],
    "10tongzi":["daZhaDan/nv/10tongzi"],
    "10Xi":["daZhaDan/nv/10Xi"],
    "11":["daZhaDan/nv/11"],
    "11d":["daZhaDan/nv/11d"],
    "11t":["daZhaDan/nv/11t"],
    "11tongzi":["daZhaDan/nv/11tongzi"],
    "11Xi":["daZhaDan/nv/11Xi"],
    "12":["daZhaDan/nv/12"],
    "12d":["daZhaDan/nv/12d"],
    "12t":["daZhaDan/nv/12t"],
    "12tongzi":["daZhaDan/nv/12tongzi"],
    "12Xi":["daZhaDan/nv/12Xi"],
    "13":["daZhaDan/nv/13"],
    "13d":["daZhaDan/nv/13d"],
    "13t":["daZhaDan/nv/13t"],
    "13tongzi":["daZhaDan/nv/13tongzi"],
    "13Xi":["daZhaDan/nv/13Xi"],
    "14":["daZhaDan/nv/14"],
    "14d":["daZhaDan/nv/14d"],
    "14t":["daZhaDan/nv/14t"],
    "14tongzi":["daZhaDan/nv/14tongzi"],
    "14Xi":["daZhaDan/nv/14Xi"],
    "15":["daZhaDan/nv/15"],
    "15d":["daZhaDan/nv/15d"],
    "15t":["daZhaDan/nv/15t"],
    "15tongzi":["daZhaDan/nv/15tongzi"],
    "15Xi":["daZhaDan/nv/15Xi"],
    "4bomb":["daZhaDan/nv/4bomb"],
    "5":["daZhaDan/nv/5"],
    "520":["daZhaDan/nv/520"],
    "520d":["daZhaDan/nv/520d"],
    "520tongzi":["daZhaDan/nv/520tongzi"],
    "520Xi":["daZhaDan/nv/520Xi"],
    "530":["daZhaDan/nv/530"],
    "530d":["daZhaDan/nv/530d"],
    "530tongzi":["daZhaDan/nv/530tongzi"],
    "530Xi":["daZhaDan/nv/530Xi"],
    "5bomb":["daZhaDan/nv/5bomb"],
    "5d":["daZhaDan/nv/5d"],
    "5t":["daZhaDan/nv/5t"],
    "5tongzi":["daZhaDan/nv/5tongzi"],
    "5Xi":["daZhaDan/nv/5Xi"],
    "6":["daZhaDan/nv/6"],
    "6bomb":["daZhaDan/nv/6bomb"],
    "6d":["daZhaDan/nv/6d"],
    "6t":["daZhaDan/nv/6t"],
    "6tongzi":["daZhaDan/nv/6tongzi"],
    "6Xi":["daZhaDan/nv/6Xi"],
    "7":["daZhaDan/nv/7"],
    "7bomb":["daZhaDan/nv/7bomb"],
    "7d":["daZhaDan/nv/7d"],
    "7t":["daZhaDan/nv/7t"],
    "7tongzi":["daZhaDan/nv/7tongzi"],
    "7Xi":["daZhaDan/nv/7Xi"],
    "8":["daZhaDan/nv/8"],
    "8bomb":["daZhaDan/nv/8bomb"],
    "8d":["daZhaDan/nv/8d"],
    "8t":["daZhaDan/nv/8t"],
    "8tongzi":["daZhaDan/nv/8tongzi"],
    "8Xi":["daZhaDan/nv/8Xi"],
    "9":["daZhaDan/nv/9"],
    "9bomb":["daZhaDan/nv/9bomb"],
    "9d":["daZhaDan/nv/9d"],
    "9t":["daZhaDan/nv/9t"],
    "9tongzi":["daZhaDan/nv/9tongzi"],
    "9Xi":["daZhaDan/nv/9Xi"],
    "baodan":["daZhaDan/nv/baodan"],
    "baoshuang":["daZhaDan/nv/baoshuang"],
    "double_line":["daZhaDan/nv/double_line"],
    "pass":["daZhaDan/nv/pass"],
    "wing":["daZhaDan/nv/wing"],

    //炸弹新增
    "3" : ["daZhaDan/nv/3.mp3"],
    "3d" : ["daZhaDan/nv/3d.mp3"],
    "3t" : ["daZhaDan/nv/3t.mp3"],
    "4" : ["daZhaDan/nv/4.mp3"],
    "4d" : ["daZhaDan/nv/4d.mp3"],
    "4t" : ["daZhaDan/nv/4t.mp3"],
    "buchui" : ["daZhaDan/nv/buchui.mp3"],
    "bufanqiang" : ["daZhaDan/nv/bufanqiang.mp3"],
    "chui" : ["daZhaDan/nv/chui.mp3"],
    "dou" : ["daZhaDan/nv/dou.mp3"],
    "f510k" : ["daZhaDan/nv/f510k.mp3"],
    "fandou" : ["daZhaDan/nv/fandou.mp3"],
    "fanqiang" : ["daZhaDan/nv/fanqiang.mp3"],
    "kaiqiang" : ["daZhaDan/nv/kaiqiang.mp3"],
    "tou_xiang" : ["daZhaDan/nv/tou_xiang.mp3"],
    "z510k" : ["daZhaDan/nv/z510k.mp3"],
    "shunzi" : ["daZhaDan/nv/shunzi.mp3"],
};
GameSound4Play[MjClient.GAME_TYPE.DIAN_TUO] = GameSound4Play[MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN];

GameSound4Play[MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN] = {
    1: ["qianfen/nv/1_1"],
    2: ["qianfen/nv/1_2"],
    3: ["qianfen/nv/1_3"],
    4: ["qianfen/nv/1_4"],
    5: ["qianfen/nv/1_5"],
    6: ["qianfen/nv/1_6"],
    7: ["qianfen/nv/1_7"],
    8: ["qianfen/nv/1_8"],
    9: ["qianfen/nv/1_9"],
    10: ["qianfen/nv/1_10"],
    11: ["qianfen/nv/1_11"],
    12: ["qianfen/nv/1_12"],
    13: ["qianfen/nv/1_13"],

    53: ["qianfen/nv/53"],
    54: ["qianfen/nv/54"],

    d1: ["qianfen/nv/2_1"],
    d2: ["qianfen/nv/2_2"],
    d3: ["qianfen/nv/2_3"],
    d4: ["qianfen/nv/2_4"],
    d5: ["qianfen/nv/2_5"],
    d6: ["qianfen/nv/2_6"],
    d7: ["qianfen/nv/2_7"],
    d8: ["qianfen/nv/2_8"],
    d9: ["qianfen/nv/2_9"],
    d10: ["qianfen/nv/2_10"],
    d11: ["qianfen/nv/2_11"],
    d12: ["qianfen/nv/2_12"],
    d13: ["qianfen/nv/2_13"],

    s1: ["qianfen/nv/3_1"],
    s2: ["qianfen/nv/3_2"],
    s3: ["qianfen/nv/3_3"],
    s4: ["qianfen/nv/3_4"],
    s5: ["qianfen/nv/3_5"],
    s6: ["qianfen/nv/3_6"],
    s7: ["qianfen/nv/3_7"],
    s8: ["qianfen/nv/3_8"],
    s9: ["qianfen/nv/3_9"],
    s10: ["qianfen/nv/3_10"],
    s11: ["qianfen/nv/3_11"],
    s12: ["qianfen/nv/3_12"],
    s13: ["qianfen/nv/3_13"],
    clickCards: ["qianfen/nv/click_cards"],
    playingCards: ["qianfen/nv/Playing_cards"],
    ani_zhadan: ["qianfen/nv/ani_bomb"],
    ani_shunzi: ["qianfen/nv/ani_shunzi"],
    ani_liandui: ["qianfen/nv/ani_liandui"],
    ani_feiji: ["qianfen/nv/ani_feiji"],
    feiji: ["qianfen/nv/feiji"],
    bomb1: ["qianfen/nv/bomb_0"],
    liandui: ["qianfen/nv/liandui"],
    sandaiyi: ["qianfen/nv/sandaiyi"],
    sandaier : ["qianfen/nv/sandaier"],
    sidaiyi: ["qianfen/nv/sidaiyi"],
    sidaier: ["qianfen/nv/sidaier"],
    shunzi: ["qianfen/nv/shunzi"],
    pass: ["qianfen/nv/pass_1", "qianfen/nv/pass_2"],
    dani1: ["qianfen/nv/dani1"],
    dani2: ["qianfen/nv/dani2"],
    dani3: ["qianfen/nv/dani3"],
};

GameSound4Play[MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG] = {
    1:["wangdiao/nv/1"],
    2:["wangdiao/nv/2"],
    3:["wangdiao/nv/3"],
    4:["wangdiao/nv/4"],
    5:["wangdiao/nv/5"],
    6:["wangdiao/nv/6"],
    7:["wangdiao/nv/7"],
    8:["wangdiao/nv/8"],
    9:["wangdiao/nv/9"],
    11:["wangdiao/nv/11"],
    12:["wangdiao/nv/12"],
    13:["wangdiao/nv/13"],
    14:["wangdiao/nv/14"],
    15:["wangdiao/nv/15"],
    16:["wangdiao/nv/16"],
    17:["wangdiao/nv/17"],
    18:["wangdiao/nv/18"],
    19:["wangdiao/nv/19"],
    21:["wangdiao/nv/21"],
    22:["wangdiao/nv/22"],
    23:["wangdiao/nv/23"],
    24:["wangdiao/nv/24"],
    25:["wangdiao/nv/25"],
    26:["wangdiao/nv/26"],
    27:["wangdiao/nv/27"],
    28:["wangdiao/nv/28"],
    29:["wangdiao/nv/29"],
    31:["wangdiao/nv/31"],
    41:["wangdiao/nv/41"],
    51:["wangdiao/nv/51"],
    61:["wangdiao/nv/61"],
    71:["wangdiao/nv/71"],
    81:["wangdiao/nv/81"],
    91:["wangdiao/nv/91"],
    anGang:["wangdiao/nv/gang"],
    chi:["wangdiao/nv/chi"],
    gang:["wangdiao/nv/gang"],
    fangpao:["wangdiao/nv/fangpao"],
    peng:["wangdiao/nv/peng"],
    ting:["wangdiao/nv/ting"],
    zimo:["wangdiao/nv/zimo"],
    wangdiao:["wangdiao/nv/wangdiao"],
    wangchuang:["wangdiao/nv/wangchuang"],
};

GameSound4Play[MjClient.GAME_TYPE.DAO_ZHOU_MJ] = {
    1:["daozhou/nv/1"],
    2:["daozhou/nv/2"],
    3:["daozhou/nv/3"],
    4:["daozhou/nv/4"],
    5:["daozhou/nv/5"],
    6:["daozhou/nv/6"],
    7:["daozhou/nv/7"],
    8:["daozhou/nv/8"],
    9:["daozhou/nv/9"],
    11:["daozhou/nv/11"],
    12:["daozhou/nv/12"],
    13:["daozhou/nv/13"],
    14:["daozhou/nv/14"],
    15:["daozhou/nv/15"],
    16:["daozhou/nv/16"],
    17:["daozhou/nv/17"],
    18:["daozhou/nv/18"],
    19:["daozhou/nv/19"],
    21:["daozhou/nv/21"],
    22:["daozhou/nv/22"],
    23:["daozhou/nv/23"],
    24:["daozhou/nv/24"],
    25:["daozhou/nv/25"],
    26:["daozhou/nv/26"],
    27:["daozhou/nv/27"],
    28:["daozhou/nv/28"],
    29:["daozhou/nv/29"],
    31:["daozhou/nv/31"],
    41:["daozhou/nv/41"],
    51:["daozhou/nv/51"],
    61:["daozhou/nv/61"],
    71:["daozhou/nv/71"],
    81:["daozhou/nv/81"],
    91:["daozhou/nv/91"],
    chi:["daozhou/nv/chi"],
    fangpao:["daozhou/nv/zimo"],
    gang:["daozhou/nv/gang"],
    anGang:["daozhou/nv/gang"],
    hu:["daozhou/nv/hu"],
    peng:["daozhou/nv/peng"],
    zimo:["daozhou/nv/zimo"]
};

GameSound4Play[MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA] = {
    jiao0: ["sanDaHa/nv/callpoint/cp_0"],
    jiao5: ["sanDaHa/nv/callpoint/cp_5"],
    jiao10: ["sanDaHa/nv/callpoint/cp_10"],
    jiao15: ["sanDaHa/nv/callpoint/cp_15"],
    jiao20: ["sanDaHa/nv/callpoint/cp_20"],
    jiao25: ["sanDaHa/nv/callpoint/cp_25"],
    jiao30: ["sanDaHa/nv/callpoint/cp_30"],
    jiao35: ["sanDaHa/nv/callpoint/cp_35"],
    jiao40: ["sanDaHa/nv/callpoint/cp_40"],
    jiao45: ["sanDaHa/nv/callpoint/cp_45"],
    jiao50: ["sanDaHa/nv/callpoint/cp_50"],
    jiao55: ["sanDaHa/nv/callpoint/cp_55"],
    jiao60: ["sanDaHa/nv/callpoint/cp_60"],
    jiao65: ["sanDaHa/nv/callpoint/cp_65"],
    jiao70: ["sanDaHa/nv/callpoint/cp_70"],
    jiao75: ["sanDaHa/nv/callpoint/cp_75"],
    jiao80: ["sanDaHa/nv/callpoint/cp_80"],
    jiao85: ["sanDaHa/nv/callpoint/cp_85"],
    jiao90: ["sanDaHa/nv/callpoint/cp_90"],
    jiao95: ["sanDaHa/nv/callpoint/cp_95"],
    jiao100: ["sanDaHa/nv/callpoint/cp_100"],

    oneCard: ["sanDaHa/nv/cardtype/oneCard"],
    oneMainCard: ["sanDaHa/nv/cardtype/oneMainCard"],
    pair: ["sanDaHa/nv/cardtype/pair"],
    pairsMain: ["sanDaHa/nv/cardtype/pairsMain"],
    swingcard: ["sanDaHa/nv/cardtype/swingcard"],
    tractor: ["sanDaHa/nv/cardtype/tractor"],
    tractormain: ["sanDaHa/nv/cardtype/tractormain"],

    fangkuai: ["sanDaHa/nv/choosecolor/fangkuai"],
    heitao: ["sanDaHa/nv/choosecolor/heitao"],
    hongtao: ["sanDaHa/nv/choosecolor/hongtao"],
    meihua: ["sanDaHa/nv/choosecolor/meihua"],
    wu: ["sanDaHa/nv/choosecolor/wuzhu"],

    danpai_1: ["sanDaHa/nv/cardtype/danpai_1"],
    danpai_2: ["sanDaHa/nv/cardtype/danpai_2"],
    danpai_3: ["sanDaHa/nv/cardtype/danpai_3"],
    danpai_4: ["sanDaHa/nv/cardtype/danpai_4"],
    danpai_5: ["sanDaHa/nv/cardtype/danpai_5"],
    danpai_6: ["sanDaHa/nv/cardtype/danpai_6"],
    danpai_7: ["sanDaHa/nv/cardtype/danpai_7"],
    danpai_8: ["sanDaHa/nv/cardtype/danpai_8"],
    danpai_9: ["sanDaHa/nv/cardtype/danpai_9"],
    danpai_10: ["sanDaHa/nv/cardtype/danpai_10"],
    danpai_11: ["sanDaHa/nv/cardtype/danpai_11"],
    danpai_12: ["sanDaHa/nv/cardtype/danpai_12"],
    danpai_13: ["sanDaHa/nv/cardtype/danpai_13"],
    danpai_14: ["sanDaHa/nv/cardtype/danpai_14"],
    danpai_15: ["sanDaHa/nv/cardtype/danpai_15"],

    duiPai_1: ["sanDaHa/nv/cardtype/duiPai_1"],
    duiPai_2: ["sanDaHa/nv/cardtype/duiPai_2"],
    duiPai_3: ["sanDaHa/nv/cardtype/duiPai_3"],
    duiPai_4: ["sanDaHa/nv/cardtype/duiPai_4"],
    duiPai_5: ["sanDaHa/nv/cardtype/duiPai_5"],
    duiPai_6: ["sanDaHa/nv/cardtype/duiPai_6"],
    duiPai_7: ["sanDaHa/nv/cardtype/duiPai_7"],
    duiPai_8: ["sanDaHa/nv/cardtype/duiPai_8"],
    duiPai_9: ["sanDaHa/nv/cardtype/duiPai_9"],
    duiPai_10: ["sanDaHa/nv/cardtype/duiPai_10"],
    duiPai_11: ["sanDaHa/nv/cardtype/duiPai_11"],
    duiPai_12: ["sanDaHa/nv/cardtype/duiPai_12"],
    duiPai_13: ["sanDaHa/nv/cardtype/duiPai_13"],
    duiPai_14: ["sanDaHa/nv/cardtype/duiPai_14"],
    duiPai_15: ["sanDaHa/nv/cardtype/duiPai_15"],

    bigger_1: ["sanDaHa/nv/cardtype/bigger_1"],
    bigger_2: ["sanDaHa/nv/cardtype/bigger_2"],
    bile: ["sanDaHa/nv/cardtype/bile"],
    dianpai: ["sanDaHa/nv/cardtype/dianpai"],
    diaozhu: ["sanDaHa/nv/cardtype/diaozhu"],
    gaibi: ["sanDaHa/nv/cardtype/gaibi"],
    swingcard: ["sanDaHa/nv/cardtype/swingcard"],


    liuju: ["sanDaHa/effect/audio_liuju"],
    getScore: ["sanDaHa/effect/getScore"],
    lose: ["sanDaHa/effect/lose"],
    win: ["sanDaHa/effect/win"],
    win_1: ["sanDaHa/nv/win_1"],
};

//湘西96扑克配音
GameSound4Play[MjClient.GAME_TYPE.XIANG_XI_96POKER] = {
    101:["96poker/nv/red_1"],
    201:["96poker/nv/black_1"],
    301:["96poker/nv/red_1"],
    401:["96poker/nv/black_1"],
    102:["96poker/nv/red_2"],
    202:["96poker/nv/black_2"],
    302:["96poker/nv/red_2"],
    402:["96poker/nv/black_2"],
    103:["96poker/nv/red_3"],
    203:["96poker/nv/black_3"],
    303:["96poker/nv/red_3"],
    403:["96poker/nv/black_3"],
    104:["96poker/nv/red_4"],
    204:["96poker/nv/black_4"],
    304:["96poker/nv/red_4"],
    404:["96poker/nv/black_4"],
    105:["96poker/nv/red_5"],
    205:["96poker/nv/black_5"],
    305:["96poker/nv/red_5"],
    405:["96poker/nv/black_5"],
    106:["96poker/nv/red_6"],
    206:["96poker/nv/black_6"],
    306:["96poker/nv/red_6"],
    406:["96poker/nv/black_6"],
    107:["96poker/nv/red_7"],
    207:["96poker/nv/black_7"],
    307:["96poker/nv/red_7"],
    407:["96poker/nv/black_7"],
    108:["96poker/nv/red_8"],
    208:["96poker/nv/black_8"],
    308:["96poker/nv/red_8"],
    408:["96poker/nv/black_8"],
    109:["96poker/nv/red_9"],
    209:["96poker/nv/black_9"],
    309:["96poker/nv/red_9"],
    409:["96poker/nv/black_9"],
    110:["96poker/nv/red_10"],
    210:["96poker/nv/black_10"],
    310:["96poker/nv/red_10"],
    410:["96poker/nv/black_10"],
    111:["96poker/nv/red_11"],
    211:["96poker/nv/black_11"],
    311:["96poker/nv/red_11"],
    411:["96poker/nv/black_11"],
    112:["96poker/nv/red_12"],
    212:["96poker/nv/black_12"],
    312:["96poker/nv/red_12"],
    412:["96poker/nv/black_12"],

    tie:["96poker/nv/tie"],
    chi:["96poker/nv/chi"],
    peng:["96poker/nv/peng"],
    shao:["96poker/nv/shao"],
    long:["96poker/nv/long"],
    zou:["96poker/nv/zou"],
    banzhao:["96poker/nv/banzhao"],
    manzhao:["96poker/nv/manzhao"],
    shuanglong:["96poker/nv/shuanglong"],
    shuanglongxizhu:["96poker/nv/shuanglongxizhu"],
    hu:["96poker/nv/hu"],
};

//淑浦老牌语音
GameSound4Play[MjClient.GAME_TYPE.XU_PU_LAO_PAI] = {
    mandarin:{
        1:["xuPuLaoPai/mandarin/nv/1"],
        2:["xuPuLaoPai/mandarin/nv/2"],
        3:["xuPuLaoPai/mandarin/nv/3"],
        4:["xuPuLaoPai/mandarin/nv/4"],
        5:["xuPuLaoPai/mandarin/nv/5"],
        6:["xuPuLaoPai/mandarin/nv/6"],
        7:["xuPuLaoPai/mandarin/nv/7"],
        8:["xuPuLaoPai/mandarin/nv/8"],
        9:["xuPuLaoPai/mandarin/nv/9"],
        11:["xuPuLaoPai/mandarin/nv/11"],
        12:["xuPuLaoPai/mandarin/nv/12"],
        13:["xuPuLaoPai/mandarin/nv/13"],
        14:["xuPuLaoPai/mandarin/nv/14"],
        15:["xuPuLaoPai/mandarin/nv/15"],
        16:["xuPuLaoPai/mandarin/nv/16"],
        17:["xuPuLaoPai/mandarin/nv/17"],
        18:["xuPuLaoPai/mandarin/nv/18"],
        19:["xuPuLaoPai/mandarin/nv/19"],
        21:["xuPuLaoPai/mandarin/nv/21"],
        22:["xuPuLaoPai/mandarin/nv/22"],
        23:["xuPuLaoPai/mandarin/nv/23"],
        24:["xuPuLaoPai/mandarin/nv/24"],
        25:["xuPuLaoPai/mandarin/nv/25"],
        26:["xuPuLaoPai/mandarin/nv/26"],
        27:["xuPuLaoPai/mandarin/nv/27"],
        28:["xuPuLaoPai/mandarin/nv/28"],
        29:["xuPuLaoPai/mandarin/nv/29"],
        31:["xuPuLaoPai/mandarin/nv/31"],
        32:["xuPuLaoPai/mandarin/nv/32"],
        33:["xuPuLaoPai/mandarin/nv/33"],

        chi:["xuPuLaoPai/mandarin/nv/chi"],
        jiepao:["xuPuLaoPai/mandarin/nv/jiepao"],
        peng:["xuPuLaoPai/mandarin/nv/peng"],
        zimo:["xuPuLaoPai/mandarin/nv/zimo"],
    },
    dialect:{
        1:["xuPuLaoPai/dialect/nv/1"],
        2:["xuPuLaoPai/dialect/nv/2"],
        3:["xuPuLaoPai/dialect/nv/3"],
        4:["xuPuLaoPai/dialect/nv/4"],
        5:["xuPuLaoPai/dialect/nv/5"],
        6:["xuPuLaoPai/dialect/nv/6"],
        7:["xuPuLaoPai/dialect/nv/7"],
        8:["xuPuLaoPai/dialect/nv/8"],
        9:["xuPuLaoPai/dialect/nv/9"],
        11:["xuPuLaoPai/dialect/nv/11"],
        12:["xuPuLaoPai/dialect/nv/12"],
        13:["xuPuLaoPai/dialect/nv/13"],
        14:["xuPuLaoPai/dialect/nv/14"],
        15:["xuPuLaoPai/dialect/nv/15"],
        16:["xuPuLaoPai/dialect/nv/16"],
        17:["xuPuLaoPai/dialect/nv/17"],
        18:["xuPuLaoPai/dialect/nv/18"],
        19:["xuPuLaoPai/dialect/nv/19"],
        21:["xuPuLaoPai/dialect/nv/21"],
        22:["xuPuLaoPai/dialect/nv/22"],
        23:["xuPuLaoPai/dialect/nv/23"],
        24:["xuPuLaoPai/dialect/nv/24"],
        25:["xuPuLaoPai/dialect/nv/25"],
        26:["xuPuLaoPai/dialect/nv/26"],
        27:["xuPuLaoPai/dialect/nv/27"],
        28:["xuPuLaoPai/dialect/nv/28"],
        29:["xuPuLaoPai/dialect/nv/29"],
        31:["xuPuLaoPai/dialect/nv/31"],
        32:["xuPuLaoPai/dialect/nv/32"],
        33:["xuPuLaoPai/dialect/nv/33"],

        chi:["xuPuLaoPai/dialect/nv/chi"],
        jiepao:["xuPuLaoPai/dialect/nv/jiepao"],
        peng:["xuPuLaoPai/dialect/nv/peng"],
        zimo:["xuPuLaoPai/dialect/nv/zimo"],
    },
};

//溆浦跑胡子配音
GameSound4Play[MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI] = {
    101:["xuPuPaoHuZi/nv/301"],
    201:["xuPuPaoHuZi/nv/401"],
    301:["xuPuPaoHuZi/nv/301"],
    401:["xuPuPaoHuZi/nv/401"],
    102:["xuPuPaoHuZi/nv/302"],
    202:["xuPuPaoHuZi/nv/402"],
    302:["xuPuPaoHuZi/nv/302"],
    402:["xuPuPaoHuZi/nv/402"],
    103:["xuPuPaoHuZi/nv/303"],
    203:["xuPuPaoHuZi/nv/403"],
    303:["xuPuPaoHuZi/nv/303"],
    403:["xuPuPaoHuZi/nv/403"],
    104:["xuPuPaoHuZi/nv/304"],
    204:["xuPuPaoHuZi/nv/404"],
    304:["xuPuPaoHuZi/nv/304"],
    404:["xuPuPaoHuZi/nv/404"],
    105:["xuPuPaoHuZi/nv/305"],
    205:["xuPuPaoHuZi/nv/405"],
    305:["xuPuPaoHuZi/nv/305"],
    405:["xuPuPaoHuZi/nv/405"],
    106:["xuPuPaoHuZi/nv/306"],
    206:["xuPuPaoHuZi/nv/406"],
    306:["xuPuPaoHuZi/nv/306"],
    406:["xuPuPaoHuZi/nv/406"],
    107:["xuPuPaoHuZi/nv/307"],
    207:["xuPuPaoHuZi/nv/407"],
    307:["xuPuPaoHuZi/nv/307"],
    407:["xuPuPaoHuZi/nv/407"],
    108:["xuPuPaoHuZi/nv/308"],
    208:["xuPuPaoHuZi/nv/408"],
    308:["xuPuPaoHuZi/nv/308"],
    408:["xuPuPaoHuZi/nv/408"],
    109:["xuPuPaoHuZi/nv/309"],
    209:["xuPuPaoHuZi/nv/409"],
    309:["xuPuPaoHuZi/nv/309"],
    409:["xuPuPaoHuZi/nv/409"],
    110:["xuPuPaoHuZi/nv/310"],
    210:["xuPuPaoHuZi/nv/410"],
    310:["xuPuPaoHuZi/nv/310"],
    410:["xuPuPaoHuZi/nv/410"],

    bi:["xuPuPaoHuZi/nv/bi"],
    chi:["xuPuPaoHuZi/nv/chi"],
    peng:["xuPuPaoHuZi/nv/peng"],
    hu:["xuPuPaoHuZi/nv/hu"],
    wei:["xuPuPaoHuZi/nv/wei"],
    zimo:["xuPuPaoHuZi/nv/zimo"],
    pao:["xuPuPaoHuZi/nv/pao"],
    chongpao:["xuPuPaoHuZi/nv/chongpao"],
    ti:["xuPuPaoHuZi/nv/ti"],
    fangpao:["xuPuPaoHuZi/nv/fangpao"]  
};

GameSound4Play[MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN] = {
    1: ["paodekuai/nv/1_1"],
    2: ["paodekuai/nv/1_2"],
    3: ["paodekuai/nv/1_3"],
    4: ["paodekuai/nv/1_4"],
    5: ["paodekuai/nv/1_5"],
    6: ["paodekuai/nv/1_6"],
    7: ["paodekuai/nv/1_7"],
    8: ["paodekuai/nv/1_8"],
    9: ["paodekuai/nv/1_9"],
    10: ["paodekuai/nv/1_10"],
    11: ["paodekuai/nv/1_11"],
    12: ["paodekuai/nv/1_12"],
    13: ["paodekuai/nv/1_13"],

    d1: ["paodekuai/nv/2_1"],
    d2: ["paodekuai/nv/2_2"],
    d3: ["paodekuai/nv/2_3"],
    d4: ["paodekuai/nv/2_4"],
    d5: ["paodekuai/nv/2_5"],
    d6: ["paodekuai/nv/2_6"],
    d7: ["paodekuai/nv/2_7"],
    d8: ["paodekuai/nv/2_8"],
    d9: ["paodekuai/nv/2_9"],
    d10: ["paodekuai/nv/2_10"],
    d11: ["paodekuai/nv/2_11"],
    d12: ["paodekuai/nv/2_12"],
    d13: ["paodekuai/nv/2_13"],

    s1: ["paodekuai/nv/3_1"],
    s2: ["paodekuai/nv/3_2"],
    s3: ["paodekuai/nv/3_3"],
    s4: ["paodekuai/nv/3_4"],
    s5: ["paodekuai/nv/3_5"],
    s6: ["paodekuai/nv/3_6"],
    s7: ["paodekuai/nv/3_7"],
    s8: ["paodekuai/nv/3_8"],
    s9: ["paodekuai/nv/3_9"],
    s10: ["paodekuai/nv/3_10"],
    s11: ["paodekuai/nv/3_11"],
    s12: ["paodekuai/nv/3_12"],
    s13: ["paodekuai/nv/3_13"],

    bomb1: ["paodekuai/nv/bomb_0"],
    liandui: ["paodekuai/nv/liandui"],
    shunzi: ["paodekuai/nv/shunzi"],
    ani_zhadan:["paodekuai/nv/ani_bomb"],
    ani_shunzi: ["paodekuai/nv/ani_shunzi"],
    ani_liandui:["paodekuai/nv/ani_liandui"],
    singer: ["doudizhu/nv/female_singer"],
    pass: ["paodekuai/nv/pass_1", "paodekuai/nv/pass_2"],
    single: ["paodekuai/nv/single_1", "paodekuai/nv/single_2"],
    clickCards: ["paodekuai/nv/click_cards"],
    playingCards:["paodekuai/nv/Playing_cards"],
    wangzha: ["yongzhou/nv/ww_v_wz"]
};

GameSound4Play[MjClient.GAME_TYPE.EN_SHI_MA_JIANG] = GameSound4Play["normal"];

GameSound4Play[MjClient.GAME_TYPE.YANG_XIN_MA_JIANG] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG] = GameSound4Play[MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG];
GameSound4Play[MjClient.GAME_TYPE.JIANG_LING_HONGZHONG] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.QI_CHUN_GD_MJ] = GameSound4Play["normal"];
GameSound4Play[MjClient.GAME_TYPE.SHI_SHOU_AI_HUANG] = GameSound4Play[MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU];
GameSound4Play[MjClient.GAME_TYPE.QI_CHUN_HONG_ZHONG_GANG] = GameSound4Play["normal"];

GameSound4Play[MjClient.GAME_TYPE.DANG_YANG_FAN_JING] = {
    1: ["dangYangFanJing/nv/1"],
    2: ["dangYangFanJing/nv/22"],
    3: ["dangYangFanJing/nv/3"],
    11: ["dangYangFanJing/nv/11"],
    12: ["dangYangFanJing/nv/12"],
    13: ["dangYangFanJing/nv/13"],
    21: ["dangYangFanJing/nv/21"],
    22: ["dangYangFanJing/nv/22"],
    23: ["dangYangFanJing/nv/23"],
    31: ["dangYangFanJing/nv/31"],
    32: ["dangYangFanJing/nv/32"],
    33: ["dangYangFanJing/nv/33"],
    41: ["dangYangFanJing/nv/41"],
    42: ["dangYangFanJing/nv/42"],
    43: ["dangYangFanJing/nv/43"],
    51: ["dangYangFanJing/nv/51"],
    52: ["dangYangFanJing/nv/52"],
    53: ["dangYangFanJing/nv/53"],
    61: ["dangYangFanJing/nv/61"],
    62: ["dangYangFanJing/nv/62"],
    63: ["dangYangFanJing/nv/63"],
    71: ["dangYangFanJing/nv/71"],
    72: ["dangYangFanJing/nv/72"],
    73: ["dangYangFanJing/nv/73"],
    chi: ["dangYangFanJing/nv/chi"],
    peng: ["dangYangFanJing/nv/dui"],
    mao: ["dangYangFanJing/nv/mao"],
    kaimao: ["dangYangFanJing/nv/kaimao"],
    hu: ["dangYangFanJing/nv/hu"],
}
GameSound4Play[MjClient.GAME_TYPE.DA_YE_ZI_PAI] = {
    1:["yongzhou/nv/1", "yongzhou/nv/1"],
    2:["yongzhou/nv/2", "yongzhou/nv/2"],
    3:["yongzhou/nv/3", "yongzhou/nv/3"],
    4:["yongzhou/nv/4", "yongzhou/nv/4"],
    5:["yongzhou/nv/5", "yongzhou/nv/5"],
    6:["yongzhou/nv/6", "yongzhou/nv/6"],
    7:["yongzhou/nv/7", "yongzhou/nv/7"],
    8:["yongzhou/nv/8", "yongzhou/nv/8"],
    9:["yongzhou/nv/9", "yongzhou/nv/9"],
    10:["yongzhou/nv/10", "yongzhou/nv/10"],
    21:["yongzhou/nv/21", "yongzhou/nv/21"],
    22:["yongzhou/nv/22", "yongzhou/nv/22"],
    23:["yongzhou/nv/23", "yongzhou/nv/23"],
    24:["yongzhou/nv/24", "yongzhou/nv/24"],
    25:["yongzhou/nv/25", "yongzhou/nv/25"],
    26:["yongzhou/nv/26", "yongzhou/nv/26"],
    27:["yongzhou/nv/27", "yongzhou/nv/27"],
    28:["yongzhou/nv/28", "yongzhou/nv/28"],
    29:["yongzhou/nv/29", "yongzhou/nv/29"],
    30:["yongzhou/nv/30", "yongzhou/nv/30"],
    91:["yongzhou/nv/91", "yongzhou/nv/91"],
    bi:["yongzhou/nv/bi", "yongzhou/nv/bi"],
    chi:["yongzhou/nv/chi", "yongzhou/nv/chi"],
    wei:["yongzhou/nv/wei", "yongzhou/nv/wei"],
    chouwei:["yongzhou/nv/chouwei", "yongzhou/nv/chouwei"],
    zimo:["yongzhou/nv/zimo", "yongzhou/nv/zimo"],
    fangpao:["yongzhou/nv/fangpao", "yongzhou/nv/fangpao"],
    pao:["yongzhou/nv/pao", "yongzhou/nv/pao"],
    peng:["yongzhou/nv/peng", "yongzhou/nv/peng"],
    ti:["yongzhou/nv/ti", "yongzhou/nv/ti"],
    wangchuang:["yongzhou/nv/wangchuang", "yongzhou/nv/wangchuang"],
    wangdiao:["yongzhou/nv/wangdiao", "yongzhou/nv/wangdiao"],
    wangzha:["yongzhou/nv/ww_v_wz", "yongzhou/nv/ww_v_wz"],
};
GameSound4Play[MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN] = GameSound4Play[MjClient.GAME_TYPE.DANG_YANG_FAN_JING];

//湖北花牌.部分音效缺失.TODO
GameSound4Play[MjClient.GAME_TYPE.HU_BEI_HUA_PAI] = {
    21:["huBeiHuaPai/nv/21"],
    22:["huBeiHuaPai/nv/22"],
    23:["huBeiHuaPai/nv/23"],
    //可
    //知
    //礼
    //孔
    42:["huBeiHuaPai/nv/42"],
    43:["huBeiHuaPai/nv/43"],
    51:["huBeiHuaPai/nv/51"],
    3:["huBeiHuaPai/nv/3"],
    52:["huBeiHuaPai/nv/52"],
    7:["huBeiHuaPai/nv/7"],
    10:["huBeiHuaPai/nv/10"],
    61:["huBeiHuaPai/nv/61"],
    8:["huBeiHuaPai/nv/8"],
    9:["huBeiHuaPai/nv/9"],
    71:["huBeiHuaPai/nv/71"],
    //二
    //四
    //五
    //六
    //357
    142:["huBeiHuaPai/nv/42"],
    103:["huBeiHuaPai/nv/3"],
    //花五 105:[],
    107:["huBeiHuaPai/nv/7"],
    109:["huBeiHuaPai/nv/9"],
    hu:["huBeiHuaPai/nv/hu"],
    zhao:["huBeiHuaPai/nv/zhao"],
    //对
    //扎
};
GameSound4Play[MjClient.GAME_TYPE.GONG_AN_HUA_PAI] = GameSound4Play[MjClient.GAME_TYPE.HU_BEI_HUA_PAI];
//通城个子牌.TODO
GameSound4Play[MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI] = {
    21:["tongChengGeZiPai/nv/21"],
    22:["tongChengGeZiPai/nv/22"],
    23:["tongChengGeZiPai/nv/23"],
    31:["tongChengGeZiPai/nv/31"],
    32:["tongChengGeZiPai/nv/32"],
    33:["tongChengGeZiPai/nv/33"],
    41:["tongChengGeZiPai/nv/41"],
    42:["tongChengGeZiPai/nv/42"],
    43:["tongChengGeZiPai/nv/43"],
    51:["tongChengGeZiPai/nv/51"],
    3:["tongChengGeZiPai/nv/3"],
    52:["tongChengGeZiPai/nv/52"],
    7:["tongChengGeZiPai/nv/7"],
    10:["tongChengGeZiPai/nv/10"],
    61:["tongChengGeZiPai/nv/61"],
    8:["tongChengGeZiPai/nv/8"],
    9:["tongChengGeZiPai/nv/9"],
    71:["tongChengGeZiPai/nv/71"],
    2:["tongChengGeZiPai/nv/2"],
    4:["tongChengGeZiPai/nv/4"],
    5:["tongChengGeZiPai/nv/5"],
    6:["tongChengGeZiPai/nv/6"],

    142:["tongChengGeZiPai/nv/42"],
    103:["tongChengGeZiPai/nv/3"],
    105:["tongChengGeZiPai/nv/5"],
    107:["tongChengGeZiPai/nv/7"],
    109:["tongChengGeZiPai/nv/9"],

    hu:["tongChengGeZiPai/nv/hu"],
    zhao:["tongChengGeZiPai/nv/zhao"],
    peng:["tongChengGeZiPai/nv/peng"],
    jian:["tongChengGeZiPai/nv/jian"],
    hua:["tongChengGeZiPai/nv/hua"],
    guan:["tongChengGeZiPai/nv/guansheng"],
    zimo:["tongChengGeZiPai/nv/zimo"],
};

GameSound4Play[MjClient.GAME_TYPE.EN_SHI_SHAO_HU] = {

};

var PayPlatformType = {
    WEIXIN: 1,
    ALIPAY: 2,
    WEIXIN_WEB: 3,
    ALIPAY_WEB: 4,
    WEIXIN_GZH_XY: 5, // 鑫燕泰杨公众号
    ALIPAY_WEB_XY: 6, // 鑫燕泰阳支付宝
    WEIXIN_GZH: 8, // 连连微信公众号支付
    IAPPPAY: 33,    // 原来是 3 （现在不用了，代码保留，要使用时需和后端确认值）
    PINGPLUSPLUS: 44, // 原来是 4 （现在不用了，代码保留，要使用时需和后端确认值）
    APPLE: 55, // 原来是 5 （现在不用了，代码保留，要使用时需和后端确认值）
};


var SharePlatformType = {
    WEIXIN: 1,
    WEIXIN_PYQ: 2,
    XIANLIAO: 3,
    ALIPAY: 4,
    DINGTALK: 5,
    QQ:6,
    CHUINIU:7,
    XIANGLIAO:8,
    MOWANG:9,
    DUOLIAO:10
};


var ChangeLocationAppList = [
    {package:"com.wechatanywhere", name:"位置伪装"},
    {package:"com.godinsec.godinsec_private_space", name:"X分身"},
    {package:"com.wifi99.android.locationcheater", name:"位置修改器"},
    {package:"io.xudwoftencentmm", name:"虚拟定位精灵"},
    {package:"com.yy.monidingwei", name:"定位修改器"},
    {package:"com.changelocation", name:"定位修改"},
    {package:"com.rong.xposed.fakelocation", name:"模拟定位"},
    {package:"com.kollway.android.mocklocation", name:"虚拟定位穿越版"},
    {package:"com.virtualdroid.loc", name:"定位模拟器"},
    {package:"com.felix.mocklocation", name:"定位精灵"},
    {package:"io.xndwofmmtt", name:"社交虚拟定位"},
    {package:"com.wechathelper", name:"定位助手"},
    {package:"com.hawkmobile.locationmonitor", name:"微定位"},
    {package:"net.anylocation.ultra", name:"快定-虚拟定位"},
    {package:"com.map.pamap", name:"专业手机定位"},
    {package:"net.superal", name:"超级神行者"},
    {package:"com.finger.location", name:"定位精灵"},
    {package:"com.dracrays.fakelocc", name:"微商定营销定位加人"},
    {package:"com.xiaoya.xndw", name:"虚拟定位打卡"},
    {package:"com.sadjoke.fake", name:"虚拟定位打卡"},
    {package:"com.xunidingwei.newlocation", name:"手机虚拟定位"},
    {package:"net.anylocation", name:"神行者"},
    {package:"com.through.throughlocation", name:"定位穿越"},
    {package:"com.yunyou", name:"虚拟定位"},
    {package:"bulb.virtual", name:"模拟定位"},
    {package:"com.jtjsb.virtualdwsq", name:"模拟定位神器"},
    {package:"com.jtjsb.xndwsq", name:"虚拟定位助手"},
    {package:"com.txy.anywhere.clone", name:"伪装地理位置"},
    {package:"com.bly.dkplat", name:"多开分身"},
    {package:"com.pho.course", name:"手机定位器"},
    {package:"com.wearable.dingweiqi", name:"北斗定位器"},
    {package:"hk.rhmhpgjh.hmjvks.ptvr", name:"GPS定位手机助手"},
    {package:"com.shidawei.neverdie", name:"专业手机定位"},
    {package:"com.zczm.daka", name:"打卡签到神器"},
    {package:"com.tongfu.gps_normal", name:"定位神器"},
    {package:"com.svm.proteinbox_location", name:"虚拟定位"},
    {package:"bxwhandroid.gps", name:"远程定位"},
    {package:"com.zsapp.gpsposition", name:"GPS定位"},
    {package:"com.huirw.vlmaster", name:"定位大师"},
    {package:"com.kuci.gpspicker", name:"极光GPS定位"},
    {package:"com.yeung.fakegps", name:"伪装位置"},
    {package:"com.huichongzi.locationmocker", name:"位置伪装大师"},
    {package:"com.dehui.qsjpq", name:"轻松记牌器"}
];

// 大厅页面 类型 约牌场   或者是 金币场（娱乐场）
var HallPageTypeList = {
    ALL_TYPE: 0, // 普通 场 大厅界面 和 金币场 都有
    COMMON_TYPE: 1, // 普通 场 大厅界面
    GOLD_TYPE: 2, // 金币场
    
}



var WXMultiAppID = {};
WXMultiAppID[MjClient.APP_TYPE.QXYYQP] = [
    "wxcd7a6d1f406a4125"
];

WXMultiAppID[MjClient.APP_TYPE.TXJINZHONGMJ] = [
    "wxff268ece19598f90",
    "wxac8408123535d024",
    "wxf93db7a732f0828d",
    "wxcdfd9415b413040b",
    "wxd72c14a49bc65dd6",
    "wxb2b1cef2679b0f98"
];

WXMultiAppID[MjClient.APP_TYPE.QXSYDTZ] = [
    "wx598392922637c367",
    "wxc91ae5ffce600bd4",
    "wxfdf71c06f856427d",
    "wxbf46b423086f309a",
    "wx82136be44bed9820",
    "wx0a89e0605cb03b33"
];

//贵族表情配置 key = 10000 + aliasId数字
MjClient.GuizuEmojiConfig = {
    "10001":{
        sound:"",
        name:"daxiao",
    },
    "10002":{
        sound:"",
        name:"yihuo",
    },
    "10003":{
        sound:"",
        name:"huaixiao",
    },
    "10004":{
        sound:"",
        name:"yunle",
    },
    "10005":{
        sound:"",
        name:"keshui",
    },
    "10006":{
        sound:"",
        name:"weiqu",
    },
    "10007":{
        sound:"",
        name:"aini",
    },
    "10008":{
        sound:"",
        name:"jingle",
    },
    "10009":{
        sound:"",
        name:"shiluo",
    },
    "10010":{
        sound:"",
        name:"dengchang",
    },
    "10011":{
        sound:"",
        name:"kuaidian",
    },
    "10012":{
        sound:"",
        name:"zhenbang",
    },
    "10013":{
        sound:"",
        name:"dacuopaile",
    },
    "10014":{
        sound:"",
        name:"dalaozaici",
    },
    "10015":{
        sound:"",
        name:"yiqifacai",
    },
    "10016":{
        sound:"",
        name:"haixiu",
    },
    "10017":{
        sound:"",
        name:"shanyaodengchang",
    },
    "10018":{
        sound:"",
        name:"wolaile",
    },
    "10019":{
        sound:"",
        name:"kuaidianba",
    },
    "10020":{
        sound:"",
        name:"anzhongguancha",
    },
    "10021":{
        sound:"",
        name:"ainio",
    },
    "10022":{
        sound:"",
        name:"biepao",
    },
    "10023":{
        sound:"",
        name:"yishoulanpai",
    },
    "10024":{
        sound:"",
        name:"886",
    },
    "10025":{
        sound:"",
        name:"shiliqiangmeibanfa",
    },
    "10026":{
        sound:"",
        name:"daikouzhao",
    },
    "10027":{
        sound:"",
        name:"qinxishou",
    },
}

//贵族互动配置 key = 10000 + aliasId数字
MjClient.GuizuHDDJConfig = {
    "10001":{
        sound:"",
        name:"xueqiu",
    },
    "10002":{
        sound:"",
        name:"pingdiguo",
    },
    "10003":{
        sound:"",
        name:"rengpingzi",
    },
    "10004":{
        sound:"",
        name:"tuoxie",
    },
    "10005":{
        sound:"",
        name:"hongbao",
    },
    "10006":{
        sound:"",
        name:"fanqie10",
    },
    "10007":{
        sound:"",
        name:"huanggua",
    },
    "10008":{
        sound:"",
        name:"zuanjie10",
    },
    "10009":{
        sound:"",
        name:"chuizi",
    },
    "10010":{
        sound:"",
        name:"jiubei",
    },
    "10011":{
        sound:"",
        name:"dangao",
    },
    "10012":{
        sound:"",
        name:"jidan10",
    },
    "10013":{
        sound:"",
        name:"jiguanqiang",
    },
    "10014":{
        sound:"",
        name:"qinwen",
    },
    "10015":{
        sound:"",
        name:"banzhuan",
    },
    "10016":{
        sound:"",
        name:"banzhuan10",
    },
    "10017":{
        sound:"",
        name:"zhuaji",
    },
    "10018":{
        sound:"",
        name:"zhuaji10",
    },
    "10019":{
        sound:"",
        name:"kouzhao",
    },
    "10020":{
        sound:"",
        name:"zhusheqi",
    },
}


MjClient.gameClass = MjClient.GAME_CLASS.MA_JIANG;
MjClient.gameType = MjClient.GAME_TYPE.LIAN_YUN_GANG;
MjClient.rePlayVideo = -1;
MjClient.NetMsgQueue = [];
MjClient.clickTing = false; //客户端缓存的点击了“听”，但是还没请求后端。（沭阳）
MjClient.reconnectFailedCount = util.localStorageEncrypt.getNumberItem("reconnectFailedCount", 0);
MjClient.isShenhe = false; //软著审核

if (!cc.sys.isNative) {

    if (typeof(jsb) == 'undefined') {
        jsb = {}
        jsb.fileUtils = {}
        jsb.fileUtils.getWritablePath = function() {
            return GameDownloadCfgUrl[MjClient.getAppType()]
        }

        jsb.fileUtils.isFileExist = function() {
            return true;
        }

    }
}


MjClient.block = function() {
    if (!cc.sys.isObjectValid(MjClient.blockui)) {
        MjClient.Scene.addChild(new BlockView());
    }
    MjClient.blockui.zIndex = 1000;

    //岳阳3.0皮肤
    var bUserUIv3 = MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3();
    bUserUIv3 = MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ? true : bUserUIv3;
    if (bUserUIv3) {
        if (cc.sys.isObjectValid(MjClient.blockui.jsBind.loading._node)){
            MjClient.blockui.jsBind.loading._node.visible = false;
        }
        
        var spine = MjClient.blockui.getChildByName("loadingSpine");
        if (!spine) {
            var spine = createSpine("loading_3.0/zhuan.json", "loading_3.0/zhuan.atlas");
            spine.setName("loadingSpine");
            MjClient.blockui.addChild(spine);
            spine.setPosition(cc.p(MjClient.blockui.width/2, MjClient.blockui.height/2));
            spine.setScale(cc.winSize.width/1280*0.5);
        }
        spine.visible = false;
        spine.runAction( cc.sequence(cc.delayTime(2), cc.callFunc(function (){
            spine.visible = true;
            if (cc.sys.isObjectValid(MjClient.blockui.jsBind.block._node)){
                MjClient.blockui.jsBind.block._node.setBackGroundColor(cc.color(0,0,0));
                MjClient.blockui.jsBind.block._node.setOpacity(100);
            }
        } )));
        spine.setAnimation(0, "animation", true); 
        return;
    }


    if (cc.sys.isObjectValid(MjClient.blockui.jsBind.loading._node)) {
        MjClient.blockui.jsBind.loading._node.stopActionByTag(20180516);
        MjClient.blockui.jsBind.loading._node.visible = false;
        var action = cc.sequence(cc.delayTime(2), cc.show());
        action.setTag(20180516);
        MjClient.blockui.jsBind.loading._node.runAction(action);
    }
};


MjClient.unblock = function() {
    if (cc.sys.isObjectValid(MjClient.blockui)) {
        if (cc.sys.isObjectValid(MjClient.blockui.jsBind.loading._node)) {
            MjClient.blockui.jsBind.loading._node.stopActionByTag(20180516);
        }
        MjClient.blockui.zIndex = -1000;
        MjClient.blockui.removeFromParent();
        MjClient.blockui = null;
    }
};


MjClient.getCurrentTime = function(date) {
    var now = date ? date : new Date();
    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日

    var hh = now.getHours(); //时
    var mm = now.getMinutes(); //分
    var ss = now.getSeconds(); //秒

    return [year, month, day, hh, mm, ss];
};

MjClient.dateFormat = function(date, format) {
    var millisecond = date.getMilliseconds();
    if (millisecond < 100) {
        millisecond = '0' + millisecond;
    } else if (millisecond < 10) {
        millisecond = '00' + millisecond;
    }
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S+': millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
};


MjClient.dateInRectDate = function(myTime, startTime, endTime) {
    if (!myTime || !startTime || !endTime) return;
    var makeNum = function(array) {
        var num = 0;
        for (var i = 0; i < array.length; i++) {
            num += array[i] * Math.pow(10, (10 - i * 2));
        }
        return num;
    };

    var myTime_Num = makeNum(myTime);
    var startTime_Num = makeNum(startTime);
    var endTime_Num = makeNum(endTime);
    return (myTime_Num >= startTime_Num && myTime_Num <= endTime_Num);
};



MjClient.loadWxHead = function(uid, url) {
    if (!url) url = "png/default_headpic.png";
    var bShowHead = false;

    if (uid && url)
    {
        //url = "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5LEicR0lzaCicY2DDtHmy3N1fCMB6nOoaOs6bYlPtADbRtMicj4rlDgCqVibtReJJrw03JytM4Rtwq1A/132";
        cc.loader.loadImg(url, { isCrossOrigin: true }, function(err, texture) {

            cc.log(uid + " = uid==============error = texture = " + texture);
            if (!err && texture) {
                //使用新的事件循环机制
                bShowHead = true;
                MjClient.Scene.pushQueueNetMsg(["loadWxHead", { uid: uid, img: texture }]);
            }
            else
            {
                url = "png/default_headpic.png";
                cc.loader.loadImg(url, { isCrossOrigin: true }, function(err, texture) {
                    if (!err && texture) {
                        MjClient.Scene.pushQueueNetMsg(["loadWxHead", { uid: uid, img: texture }]);
                    }
                });
            }
        });
    }
};


MjClient.isGameClassAvailable = function(gameClass) {
    var result = false;
    if (MjClient.systemConfig.gameClass) {
        var _gameClassList = JSON.parse(MjClient.systemConfig.gameClass);
        for (var i = 0; i < _gameClassList.length; i++) {
            if (_gameClassList[i] == gameClass) {
                result = true;
                break;
            }
        }
    } else {
        result = true;
    }
    return result;
};


MjClient.getPlayerByIndex = function(idx) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    if (idx < uids.length) return sData.players[uids[idx]];
    return null;
};



MjClient.AllPlayerRun = function(func) {
    var sData = this.data.sData;
    for (var playerId in sData.players) {
        var pl = sData.players[playerId];
        // console.log("playerId :" + playerId);
        func(pl);
    }
};



MjClient.CheckPlayerCount = function(func) {
    var count = 0;
    var sData = this.data.sData;
    for (var playerId in sData.players) {
        var pl = sData.players[playerId];
        // console.log("playerId :" + playerId);
        if (func(pl)) {
            count++;
        }
    }
    return count;
};

MjClient.showPlayerInfo = function(info, canEditSignature, showMoney) {
    MjClient.uiPara = info;
    if (MjClient.isInGoldField() && typeof(GoldUserInfoLayer) != "undefined") {
        MjClient.Scene.addChild(new GoldUserInfoLayer(info, null));
    } else {
        MjClient.Scene.addChild(new PlayerInfoView(info, canEditSignature, showMoney));
    }
};

MjClient.showPlayerInfoBind = function(info, canEditSignature, showMoney) {
    MjClient.uiPara = info;
    MjClient.Scene.addChild(new PlayerInfoBindView(info, canEditSignature, showMoney));
};

/*
    游戏内的弹窗个人信息
 */
MjClient.showPlayerInfoPlaying = function(info) {
    MjClient.uiPara = info;
    var callback = function(idx) {
        MjClient.gamenet.request("pkroom.handler.tableMsg", { cmd: "MJFight", uid: SelfUid(), targetUid: info.uid, kind: idx });
        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Gerenzhuye_Fasongdaoju", {uid: SelfUid()});
    }
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP){
        callback = function(idx) {
            MjClient.gamenet.request("pkplayer.handler.useInteractiveProp", { cmd: "MJFight", uid: SelfUid(), targetUid: info.uid, kind: idx },function (rtn) {
                if(rtn.code == -1){
                    MjClient.showToast(rtn.message);
                }
            });
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Gerenzhuye_Fasongdaoju", {uid: SelfUid()});
        }
    }
    var infoLayer;
    if (MjClient.isInGoldField() && typeof(GoldUserInfoLayer) != "undefined") {
        infoLayer = new GoldUserInfoLayer(info, callback);
    } else {
        if((MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) 
        && info.uid != MjClient.data.pinfo.uid ){
            infoLayer = new PlayerInfoViewPlayingOther(info, callback);
        }else{
            infoLayer = new PlayerInfoViewPlaying(info, callback);
        }
    }

    MjClient.Scene.addChild(infoLayer);
};

MjClient.restartGame = function() {
    stopEffect(playTimeUpEff);
    playTimeUpEff = null;
    if (MjClient.gamenet) MjClient.gamenet.disconnect();
    //postEvent("restartGame");
    cc.game.restart(); //等永州工程确认没问题了再修改
};

MjClient.exportDataLayer = function() {
    if (!ExportDataView) { return; }
    if (!MjClient.exportdataui) {
        MjClient.Scene.addChild(new ExportDataView());
    }
};


// typeof(null) 是"object" 的类型 ，marked by sking
MjClient.deepClone = function(sObj) {
    if (typeof(sObj) !== "object") {
        return sObj;
    }

    if(!sObj) return sObj;

    var s = {};
    if (sObj.constructor == Array) {
        s = [];
    }


    for (var i in sObj) {
        s[i] = MjClient.deepClone(sObj[i]); //Object.clone(sObj[i]);
    }
    return s;
};



MjClient.leaveGame = function(callback) {
    MjClient._lastTableId = "";
    util.localStorageEncrypt.setStringItem("_lastTableId",(MjClient._lastTableId+""));
    var clubInfoTable = getClubInfoInTable();
    if (cc.sys.isObjectValid(MjClient.gemewaitingui)) {
        MjClient.gemewaitingui.removeFromParent();
        delete MjClient.gemewaitingui;
    }

    if (cc.sys.isObjectValid(MjClient.goldMatchingui)) {
        MjClient.goldMatchingui.removeFromParent();
        delete MjClient.goldMatchingui;
    }

    if (cc.sys.isObjectValid(MjClient.playui)) {
        var freeNumberVoteDialog = MjClient.playui.getChildByName("freeNumberVoteDialog");
        if (freeNumberVoteDialog)
            freeNumberVoteDialog.leaveGame();
    }

    MjClient.block();
    MjClient.native.doCopyToPasteBoard(""); //清空剪切板
    MjClient.gamenet.request("pkplayer.handler.LeaveGame", {}, function(rtn) {
        if (rtn.result == 0 || rtn.code == 0) {
            if (clubInfoTable) {
                if (!MjClient.FriendCard_main_ui)
                    MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
            } else if (!MjClient.enterui && !MjClient.FriendCard_main_ui) {
                // if (MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP &&
                //     MjClient.getAppType() != MjClient.APP_TYPE.BDYZPHZ &&
                //     MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ &&
                //     MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG &&
                //     MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ) {
                //     MjClient.Scene.addChild(new EnterRoomLayer());
                // }
            }

            delete MjClient.data.sData;
            delete MjClient.gameType;
            postEvent("LeaveGame");
            if (callback)
                callback();
        } else if (rtn.message) {
            MjClient.showMsg(rtn.message);
        }
        MjClient.unblock();
    });

    //else if (!MjClient.enterui
    //    && !MjClient.FriendCard_main_ui
    //    && MjClient.data.sData
    //    && !MjClient.data.sData.tData.matchId){
    //    MjClient.Scene.addChild(new EnterRoomLayer());
    //}

};

MjClient.getPlayLog = function() {
    MjClient.block();
    MjClient.gamenet.request("pkcon.handler.getGameRecord", { uid: SelfUid() }, function(rtn) {
        MjClient.unblock();
        if (rtn.result == 0) {
            MjClient.data.playLog = rtn.playLog;
            MjClient.data.playLog.todayScore = rtn.todayScore;
            postEvent("playLog");
        }
    });
};

MjClient.getPlayLogOne = function(item, failCallback) {
    if (item.ip) {
        var playUrl = item.playbackUrl;
        if(!playUrl){
            MjClient.showToast("文件已过期，不能回放");
            if (failCallback) failCallback();
            return;
        }

        var dialog = new UnclosedTipLayer("正在获取回放数据，请不要离开游戏");
        MjClient.Scene.addChild(dialog);

        var xhr = cc.loader.getXMLHttpRequest();
        //var playUrl = GamePlaybackUrlPrefix[MjClient.getAppType()] + item.now.substr(0, 10) + "/" + item.owner + "_" + item.tableid + ".json";


        xhr.open("GET", playUrl);
        xhr.onreadystatechange = function() {
            if (cc.sys.isObjectValid(dialog)) dialog.removeFromParent();
            if (xhr.readyState == 4 && xhr.status == 200) {
                var msg = null;
                try {
                    msg = JSON.parse(xhr.responseText);
                } catch (e) {
                    msg = null;
                    if (failCallback) failCallback();
                    MjClient.showToast("文件已过期，不能回放");
                }
                if (msg)
                    MjClient.playLogOne(msg);
            }
        };
        xhr.onerror = function(event) {
            if (cc.sys.isObjectValid(dialog)) dialog.removeFromParent();
            if (failCallback) failCallback();
            MjClient.showToast("网络不好，请稍后再试");
        };
        xhr.ontimeout = function(event) {
            if (cc.sys.isObjectValid(dialog)) dialog.removeFromParent();
            if (failCallback) failCallback();
            MjClient.showToast("网络超时，请稍后再试");
        };
        xhr.onabort = function(event) {
            if (cc.sys.isObjectValid(dialog)) dialog.removeFromParent();
            if (failCallback) failCallback();
            MjClient.showToast("网络请求中断，请稍后再试");
        };
        xhr.timeout = 5000; //5s超时
        xhr.send();
    } else {
        if (failCallback) failCallback();
        MjClient.showMsg("获取回放数据失败(ip缺失)，请联系群主或客服处理");
    }

    //cc.log("=====doomsky say:JSON.stringify(item)======", JSON.stringify(item));
};

MjClient.getOtherPlayLog = function(replayCode) {
    MjClient.block();
    MjClient.gamenet.request("pkcon.handler.getGameRecord", { code: replayCode }, function(ret) {
        MjClient.unblock();
        if (ret.code) {
            MjClient.showToast(ret.message);
        } else if (ret.data) {
            MjClient.rePlayVideo = ret.data.gametype;
            MjClient.otherReplayRound = ret.data.round;
            MjClient.otherReplayUid = ret.data.uid;
            MjClient.getPlayLogOne(ret.data, function() {
                MjClient.rePlayVideo = -1;
                MjClient.otherReplayRound = null;
                MjClient.otherReplayUid = null;
            });
        }
    });
};



MjClient.logout = function() {
    if(cc.sys.os != cc.sys.OS_WINDOWS){
        if(!MjClient.data.pinfo.mobileNum){
            MjClient.showToast("切换账号前请先绑定手机号！")
            return;
        }
    }
    
    MjClient.block();
    MjClient.gamenet.request("pkcon.handler.logout", {}, function() {
        MjClient.unblock();
        MjClient.logoutCallbackFunc();
    });
};

MjClient.logoutCallbackFunc = function () {
    util.localStorageEncrypt.removeItem("WX_USER_LOGIN");
    util.localStorageEncrypt.removeItem("XL_USER_LOGIN");
    util.localStorageEncrypt.removeItem("DL_USER_LOGIN");
    util.localStorageEncrypt.removeItem("MW_USER_LOGIN");
    util.localStorageEncrypt.removeItem("loginData");
    if (MjClient.gamenet) MjClient.gamenet.disconnect(); //新加，为了支持登录时重新连接服务器

    postEvent("logout");

}




MjClient.joinGame = function(tableid, callback, isByInvite, gameType,notCheckResource,params) {
    // cc.log("---1---");//wj
    if(!params){
        params = {};
    }
    if(MjClient.playui && cc.sys.isObjectValid(MjClient.playui) && !MjClient.playui.visible){
        //游戏已经开启了
        var backToGameLayer = new BackToGameLayer();
        MjClient.Scene.addChild(backToGameLayer);
        return;
    }
    if (!isStrNotEmpty(gameType) && !notCheckResource) {
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.roomInfo", {
            roomNum: tableid
        }, function(rtn) {
            MjClient.unblock();
            cc.log("pkplayer.handler.roomInfo: ", JSON.stringify(rtn));
            if (rtn.code == 0 && rtn.data) {
                if(rtn.data.info && rtn.data.info.leagueId){
                    params.leagueId = rtn.data.info.leagueId
                }
                if(rtn.data.info && rtn.data.info.clubId){
                    params.clubId = rtn.data.info.clubId
                }
                checkResourceAndJoinGame(rtn.data.info.gameType);
            } else {
                var msg = rtn.message;
                if (!msg) {
                    msg = "获取房间号信息失败，请确认房间号是否正确";
                }
                MjClient.showMsg(msg);
            }
        });
    }
    else {
        checkResourceAndJoinGame(gameType);
    }


    function checkResourceAndJoinGame(gameType)
    {
        if (cc.isUndefined(gameType) && !notCheckResource) {
            MjClient.showMsg("获取房间玩法失败");
            return;
        }

        var checkRescourCallBackFunc = function () {
            MjClient.block();
            MjClient.native.doCopyToPasteBoard(""); //清除剪切板
            var joinPara = { roomid: "common" };
            if (tableid){
                joinPara.tableid = tableid;
            } else {
                joinPara.roomid = "symj2";
            }
            if(params.leagueId){
                joinPara.leagueId = params.leagueId
            }else if(params.clubId){
                joinPara.clubId = params.clubId
            }
            if (isByInvite)
                joinPara.isByInvite = true;

            joinPara.area = { longitude: MjClient.native.GetLongitudePos(), latitude: MjClient.native.GetLatitudePos(),address:MjClient.native.GetAddress()};
            cc.log("joinGame ----------- " + JSON.stringify(joinPara));//wj

            MjClient.gamenet.request("pkplayer.handler.JoinGame", joinPara,
                function(rtn) {
                    if (rtn && rtn.result == 0 && 
                        (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ )) {
                        //遮罩处理
                        if(cc.sys.isObjectValid(MjClient.playui)){
                            cc.log("已经在房间内,取消遮罩");
                            MjClient.unblock();
                        }else{
                            MjClient.block();
                            cc.log("不在房间内,取消遮罩等待initSceneData取消遮罩")
                            MjClient._initSceneDataHideBlock = true;
                            //在initSceneData里处理MjClient.unblock();
                        }
                    }else{
                        MjClient.unblock();
                    }
                    if (rtn.code == -2) {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsgOpenPos(rtn.message);
                    } else if (rtn.code == -9) { // 服务器检测到异常，返回重启信号
                        MjClient.showMsg(rtn.message, function() {
                            MjClient.restartGame();
                        });
                    } else if(rtn.code == -5){ //房卡不足
                        MjClient.Scene.addChild(new Friendcard_popUpMeg(rtn))
                    } else if (rtn.result != 0) {
                        if (!params.notShowErrorMsg && !cc.isUndefined(rtn.message)) {
                            if ((isJinZhongAPPType()||
                                MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.LYSICHUANMJ)&& MjClient.FriendCard_main_ui && cc.sys.isObjectValid(MjClient.FriendCard_main_ui)) {
                                var uiPara = {}
                                uiPara.msg = rtn.message + "";
                                MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
                            } else {
                                MjClient.showMsg(rtn.message);
                            }
                        }

                    }
                    if (callback)
                        callback(rtn);
                });

            //后台会发送一个initSceneData 事件，初始化游戏场景
            //mylog("logic joinGame ----------- sking  ");
        }
        if(notCheckResource){
            checkRescourCallBackFunc();
        }else{
            CheckUpdateResourceClass(GameClass[gameType],checkRescourCallBackFunc);
        }
    }

};

MjClient.joinMatchGame = function(tableid, callback, roomid, gameType) {
    if(MjClient.playui && cc.sys.isObjectValid(MjClient.playui) && !MjClient.playui.visible){
        //游戏已经开启了
        var backToGameLayer = new BackToGameLayer();
        MjClient.Scene.addChild(backToGameLayer);
        return;
    }

    if (!isStrNotEmpty(gameType)) {
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.roomInfo", {
            roomNum: tableid
        }, function(rtn) {
            MjClient.unblock();
            cc.log("pkplayer.handler.roomInfo: ", JSON.stringify(rtn));
            if (rtn.code == 0 && rtn.data) {
                checkResourceAndJoinGame(rtn.data.info.gameType);
            } else {
                checkResourceAndJoinGame(MjClient.gameType);
            }
        });
    }
    else {
        checkResourceAndJoinGame(gameType);
    }

    function checkResourceAndJoinGame(gameType)
    {
        CheckUpdateResourceClass(GameClass[gameType], function () {
            MjClient.block();
            MjClient.native.doCopyToPasteBoard(""); //清除剪切板
            var joinPara = { roomid: "common" };
            if (roomid) {
                joinPara.roomid = "match";
            }
            joinPara.tableid = tableid;

            joinPara.area = { longitude: MjClient.native.GetLongitudePos(), latitude: MjClient.native.GetLatitudePos() };
            cc.log("joinGame ----------- " + JSON.stringify(joinPara));

            MjClient.gamenet.request("pkplayer.handler.JoinGame", joinPara,
                function(rtn) {
                    MjClient.unblock();
                    if (rtn.code == -9) { // 服务器检测到异常，返回重启信号
                        MjClient.showMsg(rtn.message, function() {
                            MjClient.restartGame();
                        });
                    } else if (rtn.result != 0) {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }
                    if (callback)
                        callback(rtn);
                });

            //后台会发送一个initSceneData 事件，初始化游戏场景
            //mylog("logic joinGame ----------- sking  ");
        });
    }
};

MjClient.joinMatchTable = function(tableid, callback) {
    if(MjClient.playui && cc.sys.isObjectValid(MjClient.playui) && !MjClient.playui.visible){
        //游戏已经开启了
        var backToGameLayer = new BackToGameLayer();
        MjClient.Scene.addChild(backToGameLayer);
        return;
    }
    MjClient.block();
    MjClient.native.doCopyToPasteBoard(""); //清除剪切板

    MjClient.gamenet.request("pkplayer.handler.reconnectMatchTable", { matchTable: tableid },
        function(rtn) {
            cc.log("joinMatchTable ----------- " + JSON.stringify(rtn));
            MjClient.unblock();
            if (rtn.code) {
                if (!cc.isUndefined(rtn.message))
                    MjClient.showMsg(rtn.message);
            }
            if (callback)
                callback(rtn);
        });

    //后台会发送一个initSceneData 事件，初始化游戏场景
    //mylog("logic joinMatchTable ----------- sking  ");
};

/*
 gType: 游戏类型
 subGameType: 子游戏类型,对于一个地区有多种玩法
 play: 玩法
 fanNum: 番数上限
 roundNum: 局数
 */
MjClient.createRoom = function(para, roundNum, payWay, callback) {
    if(MjClient.playui && cc.sys.isObjectValid(MjClient.playui) && !MjClient.playui.visible){
        //游戏已经开启了
        var backToGameLayer = new BackToGameLayer();
        MjClient.Scene.addChild(backToGameLayer);
        return;
    }
    MjClient.gameType = para.gameType;
    para.round = roundNum;
    para.payWay = payWay;
    para.area = { longitude: MjClient.native.GetLongitudePos(), latitude: MjClient.native.GetLatitudePos() };

    MjClient.block();
    cc.log("     para    " + JSON.stringify(para));
    MjClient.gamenet.request("pkplayer.handler.CreateVipTable", para, function(rtn) {
        cc.log("     rtn      " + JSON.stringify(rtn));
        MjClient.unblock();
        if (rtn.result == 0) {
            MjClient.data.vipTable = rtn.vipTable;
            MjClient.joinGame(rtn.vipTable, callback, false, MjClient.gameType);
        } else {
            if (!cc.isUndefined(rtn.message)) {
                if (rtn.code == -2) //创建房间失败 开启定位弹窗
                    MjClient.showMsgOpenPos(rtn.message);
                else if(rtn.code == -3) //创建房间失败有元宝正在代开房
                {
                    if(isJinZhongAPPType()|| MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                       MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ)
                        MjClient.Scene.addChild(new PopUpMsg_addYB(rtn));
                    else
                        MjClient.showMsg(rtn.message);
                }
                else if(rtn.code == -4)//创建房间失败元宝不足
                {
                    if(MjClient.getAppType() ==  MjClient.APP_TYPE.TXJINZHONGMJ ||  MjClient.getAppType() ==  MjClient.APP_TYPE.DQSHANXIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                       MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ)
                        MjClient.Scene.addChild(new PopUpMsg_addYB(rtn));
                    else
                        MjClient.showMsg(rtn.message);
                }
                else
                {
                    MjClient.showMsg(rtn.message);
                }
            }

            if (callback)
                callback(rtn);
        }
    });
};

//房主创建房间再战一局
MjClient.reCreateRoom = function() {
    //cc.log("==================MjClient.deepClone1============="+JSON.stringify(MjClient.data.sData.tData));
    var tData = /*MjClient.deepClone*/ (MjClient.data.sData.tData);


    MjClient.leaveGame(function() {
        var para = tData.areaSelectMode;
        para.maxPlayer = tData.maxPlayer;
        para.gameType = tData.gameType;
        var roundNum = tData.roundAll;
        if (para.isQuan) roundNum = "2quan";
        MjClient.createRoom(para, roundNum, tData.areaSelectMode.payWay, function(rtn) {
            if (rtn.result == 0) {
                MjClient.rematchInfo(MjClient.data.vipTable, tData.uids);
            }
        });
    });

};



//通知其他玩家新的房间
MjClient.rematchInfo = function(vipTable, uids) {
    MjClient.gamenet.request("pkplayer.handler.rematchInfo", { code: parseInt(vipTable), uids: uids }, function(rtn) {
        if (rtn.code == 0) {
            MjClient.showToast("已邀请其他玩家加入，请稍候");
        } else {
            if (!cc.isUndefined(rtn.message))
                MjClient.showMsg(rtn.message);
        }
    });
};

// 新版 俱乐部 和联盟   通知其他玩家新的房间
MjClient.rematchInfo2 = function (clubId, uids, ruleId, gameType,callback) {
    var jiekouName, sendInfo;
    var params = {};
    if (clubId <= 9999) {
        jiekouName = "pkplayer.handler.leagueAgainGame";
        sendInfo = {
            leagueId: clubId,
            uids: uids,
            ruleId: ruleId,
        }
        params.leagueId = clubId;
    } else {
        jiekouName = "pkplayer.handler.clubAgainGame";
        sendInfo = {
            clubId: clubId,
            uids: uids,
            ruleId: ruleId,
        }
        params.clubId = clubId;
    }
    MjClient.gamenet.request(jiekouName, sendInfo, function (rtn) {
        if (rtn.code == 0) {
            MjClient.joinGame(rtn.data, function(rtn){
                if(callback){
                    callback(rtn);
                }
            }, false, gameType,false,params);
        } else {
            FriendCard_Common.serverFailToast(rtn);
            if(callback){
                callback(rtn);
            }
        }
        MjClient.unblock();
    });
};


MjClient.tickGame = function(tickType) {
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    MjClient.gamenet.request("pkroom.handler.tableMsg", { cmd: "MJTick", tickType: tickType });
};



MjClient.openWeb = function(para) {
    postEvent("openWeb", para);
};

MjClient.openNotice = function(para) {
    postEvent("openNotice", para);
};

MjClient.showMsg = function(msg, yesfunc, nofunc, style, param) {
    postEvent("popUpMsg", { msg: msg, yes: yesfunc, no: nofunc, style: (style || ""), param: (param || "") });
};

MjClient.showMsgTop = function(msg, yesfunc, nofunc, style, param) {
    postEvent("popUpMsgTop", { msg: msg, yes: yesfunc, no: nofunc, style: (style || ""), param: (param || "") });
};

MjClient.showMsgOpenPos = function(msg, yesfunc, nofunc, style, param) {
    postEvent("popUpMsgOpenPos", { msg: msg });
};

MjClient.showUnclosedMsg = function(msg, yesfunc, nofunc, style) {
    postEvent("popUpUnclosedMsg", { msg: msg, yes: yesfunc, no: nofunc, style: (style || "") });
};

MjClient.showToastDelay = function(msg){
    MjClient.Scene.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
        MjClient.showToast(msg);
    })));
};

MjClient.showToast = function(msg) {
    //wj
    cc.log("---showToast---"+msg);

    if (haveThirdPartyWebView()) {
        return;
    }
    var yPercent = 0.35;
    var jsFile = "ToastNode.json";
    var bUserUIv3 = MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3();
    bUserUIv3 = MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ? true : bUserUIv3;
    if (bUserUIv3) {
        jsFile = "ToastNode_3.0.json";
        yPercent = 0.5;
    }
    var toastUI = ccs.load(jsFile).node;
    var text = toastUI.getChildByName("back").getChildByName("text");
    var bg_text = toastUI.getChildByName("back").getChildByName("bg_text");
    MjClient.Scene.addChild(toastUI, 99999);
    // 记录每一个生成显示的吐丝提示在 MjClient.Scene.ToastNodeArray 数组中
    if (MjClient.Scene.ToastNodeArray) {
        MjClient.Scene.ToastNodeArray.push(toastUI);
    }
    else {
        MjClient.Scene.ToastNodeArray = [toastUI];
    }

    text.setString(msg);
    text.ignoreContentAdaptWithSize(true);
    
    if (bUserUIv3) {
        setWgtLayout(toastUI.getChildByName("back"), [1, 1], [0.5, -0.1], [0, 0], true);
        var width = text.getVirtualRendererSize().width + 140;
        if(width <  bg_text.getContentSize().width){
            width = bg_text.getContentSize().width;
        }
        bg_text.setContentSize(width, bg_text.getContentSize().height);
    }else{
        bg_text.setContentSize(text.getVirtualRendererSize().width + 140, bg_text.getContentSize().height);
        setWgtLayout(toastUI.getChildByName("back"), [0.35, 0.5], [0.5, -0.1], [0, 0]);
    }

    toastUI.runAction(cc.sequence(
            cc.moveBy(0.5, 0, cc.director.getVisibleSize().height * yPercent),
            cc.delayTime(2.5),
            cc.fadeOut(0.5),
            cc.callFunc(function(){
                // 删除对应的吐丝提示，并且在 MjClient.Scene.ToastNodeArray 数组中移除
                var i = 0;
                while (i < MjClient.Scene.ToastNodeArray.length) {
                    if (MjClient.Scene.ToastNodeArray[i] == toastUI) {
                        MjClient.Scene.ToastNodeArray.splice(i,1);
                    }
                    else {
                        i++;
                    }
                }
            }),
            cc.removeSelf(true)
        )
    );
};

MjClient.showToastEXP = function(data) {
    if (haveThirdPartyWebView()) {
        return;
    }
    var yPercent = 0.35;
    var jsFile = "ToastNode2.json";

    var toastUI = ccs.load(jsFile).node;
    var _back = toastUI.getChildByName("back")
    setWgtLayout(_back, [1, 1], [0.5, -0.1], [0, 0], true);
    var bg_text = _back.getChildByName("bg_text");
    MjClient.Scene.addChild(toastUI, 99999);

    setWgtLayout(toastUI.getChildByName("back"), [1, 1], [0.5, -0.1], [0, 0]);
    // 记录每一个生成显示的吐丝提示在 MjClient.Scene.ToastNodeArray 数组中
    
    var textMatch = _back.getChildByName("textMatch");
    textMatch.setString("加时赛+" + data.overtimePer);
    textMatch.ignoreContentAdaptWithSize(true)
    
    var textExp = _back.getChildByName("textExp");
    var textExpNum = textExp.getChildByName("textExpNum");
    textExpNum.setString("+" + data.incrEmp);
    textExpNum.ignoreContentAdaptWithSize(true);

    if(!data.overtimePer){
        textMatch.visible = false;
        textExp.y += 15;  
        
    }

    toastUI.runAction(cc.sequence(
            cc.moveBy(0.5, 0, cc.director.getVisibleSize().height * yPercent),
            cc.delayTime(2.5),
            cc.fadeOut(0.5),
            cc.removeSelf(true)
        )
    );
};

/*
    factor 是屏幕的高度比例 by sking
 */
MjClient.showToastbyPos = function(msg, factor) {
    if (!factor || factor == 0) {
        factor = 0.35;
    }
    var toastUI = ccs.load("ToastNode.json").node;
    var text = toastUI.getChildByName("back").getChildByName("text");
    var bg_text = toastUI.getChildByName("back").getChildByName("bg_text");
    MjClient.Scene.addChild(toastUI);
    text.setString(msg);
    text.ignoreContentAdaptWithSize(true);
    bg_text.setContentSize(text.getVirtualRendererSize().width + 140, bg_text.getContentSize().height);
    setWgtLayout(toastUI.getChildByName("back"), [0.35, 0.5], [0.5, -0.1], [0, 0]);
    toastUI.runAction(
        cc.sequence(
            cc.moveBy(0.5, 0, cc.director.getVisibleSize().height * factor),
            cc.delayTime(2.5),
            cc.fadeOut(0.5),
            cc.removeSelf(true),
            cc.callFunc(function() {
                MjClient.GameTipMessageNode = null;
            })
        )
    );
    MjClient.GameTipMessageNode = toastUI;
};

/*
    #富文本toast提示
    @para msg1 名字，需要转码处理
    @para msg2 字符串，不做处理
    @para factor 是屏幕的高度比例
 */
MjClient.showToastWithInfobyPos = function(msg1, msg2, factor) {
    if (!factor || factor == 0) {
        factor = 0.35;
    }
    var toastUI = ccs.load("ToastNode.json").node;
    var text = toastUI.getChildByName("back").getChildByName("text");
    var bg_text = toastUI.getChildByName("back").getChildByName("bg_text");
    MjClient.Scene.addChild(toastUI);

    var richText2 = new ccui.RichText();
    richText2.ignoreContentAdaptWithSize(false);
    richText2.setAnchorPoint(-0.2, 0);
    richText2.width = 300;
    richText2.height = 30;
    //不同颜色文本
    var _nameStr = unescape(msg1);
    var newname = getNewName(_nameStr, 6);
    var re2 = new ccui.RichElementText(1, cc.color("#F3DA75"), 255, newname, "fonts/lanting.TTF", 24);
    var re3 = new ccui.RichElementText(2, cc.color("#F1FFFF"), 255, msg2, "fonts/lanting.TTF", 24);
    richText2.pushBackElement(re2);
    richText2.pushBackElement(re3);
    toastUI.getChildByName("back").addChild(richText2);

    //text.setString(msg);
    text.ignoreContentAdaptWithSize(true);
    text.visible = false;
    bg_text.setContentSize(richText2.getVirtualRendererSize().width + 140, bg_text.getContentSize().height);
    setWgtLayout(toastUI.getChildByName("back"), [0.3, 0.3], [0.5, -0.1], [0, 0]);
    toastUI.runAction(
        cc.sequence(
            cc.moveBy(0.5, 0, cc.director.getVisibleSize().height * factor),
            cc.delayTime(2.5),
            cc.fadeOut(0.5),
            cc.removeSelf(true),
            cc.callFunc(function() {
                MjClient.GameTipMessageNode = null;
            })
        )
    );
    MjClient.GameTipMessageNode = toastUI;
};
//是否是金币场
MjClient.isInGoldField = function()
{
    if(!MjClient.data.sData || !MjClient.data.sData.tData){
        return false
    }
    return MjClient.data.sData.tData.fieldId;
}
//是否是金币场普通场
MjClient.isInGoldFieldNormal = function()
{
    if(!MjClient.data.sData || !MjClient.data.sData.tData){
        return false
    }
    return MjClient.data.sData.tData.fieldId && MjClient.data.sData.tData.fieldType != 1;
}
//金币场快速场
MjClient.isInGoldFieldQuick = function()
{
    if(!MjClient.data.sData || !MjClient.data.sData.tData){
        return false
    }
    return MjClient.data.sData.tData.fieldId && MjClient.data.sData.tData.fieldType == 1;
}

MjClient.getSystemConfig = function(successCallback, failCallback) {
    var _sys = "android";
    if (cc.sys.os == cc.sys.OS_IOS) {
        _sys = "ios";
    }

    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.getSystemConfig", {
            os: _sys,
            version: MjClient.resVersion || "1.1.1",
            appVersion: MjClient.native.GetVersionName(),
            appid: MjClient.native.GetPackageName()
        },
        function(rtn) {
            MjClient.unblock();
            if (rtn.code == 0) {
                MjClient.systemConfig = rtn.data;
                MjClient.activityConfig = rtn.data.award;
                for (var i = 0; i < MjClient.systemConfig.recharge.length; i++) {
                    MjClient.native.initPay(MjClient.systemConfig.recharge[i].platform);
                }
                MjClient.native.initPay(PayPlatformType.WEIXIN);

                var shareImages = MjClient.systemConfig.shareImageConfig;
                cc.log("wxd============================shareImageConfig:"+JSON.stringify(MjClient.systemConfig.shareImageConfig));
                for (var area in shareImages) {
                    var shareImageUrl = shareImages[area].url;
                    var nameArr = shareImageUrl.split("/");
                    var nameStr = nameArr[nameArr.length - 1];
                    var filePath = jsb.fileUtils.getWritablePath() + nameStr;
                    if (!jsb.fileUtils.isFileExist(filePath)) {
                        MjClient.urlImageDown(shareImageUrl, nameStr);
                    }
                }

                var shareImagesMall = MjClient.systemConfig.shareImageMallConfig;
                cc.log("wxd============================shareImageMallConfig:"+JSON.stringify(MjClient.systemConfig.shareImageMallConfig));
                for (var area in shareImagesMall) {
                    var shareImageUrl = shareImagesMall[area].url;
                    var nameArr = shareImageUrl.split("/");
                    var nameStr = nameArr[nameArr.length - 1];
                    var filePath = jsb.fileUtils.getWritablePath() + nameStr;
                    if (!jsb.fileUtils.isFileExist(filePath)) {
                        MjClient.urlImageDown(shareImageUrl, nameStr);
                    }
                }

                if (setLocalConfig) {
                    setLocalConfig();
                } else {
                    MjClient.gameListConfig = {};
                    for (var key in MjClient.systemConfig) {
                        if (key.indexOf("List") == -1)
                            continue;

                        try {
                            MjClient.gameListConfig[key] = JSON.parse(MjClient.systemConfig[key]) || [];
                        } catch (e) {
                            MjClient.gameListConfig[key] = [];
                        }
                    }
                }
                if (successCallback) successCallback();
            }
            else {
                MjClient.showMsg("获取系统配置失败(getSystemConfig)");
                if (failCallback) failCallback();
            }
        }
    );
};


MjClient.getRechargeLadder = function(callback,param) {
    var _sys = "android";
    if (cc.sys.os == cc.sys.OS_IOS) {
        _sys = "ios";
    }
    param = param || {}
    param.os = _sys
    param.version = MjClient.resVersion || "1.1.1"
    param.uid  =  SelfUid()
    cc.log("getRechargeLadder = request ");
    MjClient.gamenet.request("pkplayer.handler.getRechargeLadder", param,
        function(rtn) {
            cc.log("============getRechargeLadder========  ")
            if (rtn.code == 0) {
                MjClient.rechargeLadder = rtn.data.list;
                MjClient.systemConfig.recharge = rtn.data.method;
                if (callback) {
                    callback(rtn.data.list);
                }
            }
        }
    );
};

MjClient.getGoldfieldNewUserInfo= function(callback) {
    var _sys = "android";
    if (cc.sys.os == cc.sys.OS_IOS) {
        _sys = "ios";
    }

    cc.log("getRechargeLadder = request ");
    MjClient.gamenet.request("pkplayer.handler.goldfieldNewUserInfo", { os: _sys, version: MjClient.resVersion || "1.1.1", uid: SelfUid() },
        function(rtn) {
            cc.log("============goldfieldNewUserInfo========  ")
            if (rtn.code == 0) {
                MjClient.goldfieldNewUserInfo = rtn.data;
                if (callback) {
                    callback(rtn.data);
                }
            }
        }
    );
};

MjClient.getFangkaRechargeLadder = function(callback) {
    var _sys = "android";
    if (cc.sys.os == cc.sys.OS_IOS) {
        _sys = "ios";
    }

    cc.log("getRechargeLadder = request ");
    MjClient.gamenet.request("pkplayer.handler.getRechargeLadder", { os: _sys, version: MjClient.resVersion || "1.1.1", uid: SelfUid(), type: "fangka" },
        function(rtn) {
            cc.log("============  房卡充值 ========  ")
            if (rtn.code == 0) {
                MjClient.rechargeLadderFangka = rtn.data.list;
                MjClient.systemConfig.recharge = rtn.data.method;
                if (callback) {
                    callback(rtn.data.list);
                }
            }
        }
    );
}
MjClient.getGoldFiledType = function () {
    return 0;
}
MjClient.getJinbiRechargeLadder = function(callback) {
    cc.log("getRechargeLadder = request ");
    if(MjClient.getGoldFiledType() == 1){
        MjClient.gamenet.request("pkplayer.handler.getGoodsList", {type: "gold" },
            function(rtn) {
                if (rtn.code == 0) {
                    if(MjClient.getGoldFiledType() == 1){
                        if(rtn.data){
                            for(var i = 0 ;i < rtn.data.length; i++){
                                var tempAmount = rtn.data[i].amount;
                                rtn.data[i].amount = rtn.data[i].price;
                                rtn.data[i].money = tempAmount;
                            }
                        }
                    }
                    MjClient.rechargeLadderJinbi = rtn.data;
                    if (callback) {
                        callback(rtn.data);
                    }
                }
            }
        );
    }else{
        var _sys = "android";
        if (cc.sys.os == cc.sys.OS_IOS) {
            _sys = "ios";
        }
        MjClient.gamenet.request("pkplayer.handler.getRechargeLadder", { os: _sys, version: MjClient.resVersion || "1.1.1", uid: SelfUid(), type: 2 },
            function(rtn) {
                cc.log("============getRechargeLadder========  ")
                if (rtn.code == 0) {
                    MjClient.rechargeLadderJinbi = rtn.data;
                    if (callback) {
                        callback(rtn.data);
                    }
                }
            }
        );
    }
}
//增加一个表 param  存放参数  以后不要随便加字段了
MjClient.recharge = function(itemId, platform, limitMoney, voucher,param) {
    var _sys = "android";
    if (cc.sys.os == cc.sys.OS_IOS) {
        _sys = "ios";
    }
    
    var _data = {};
    if (!limitMoney) {
        _data = { ladderId: itemId, os: _sys, platform: platform, appid: MjClient.native.GetPackageName(), wx_appid: MjClient.native.getNativeConfig().wx_appId||"" };
    } else {
        _data = { limitMoney: limitMoney, os: _sys, platform: platform, appid: MjClient.native.GetPackageName(), wx_appid: MjClient.native.getNativeConfig().wx_appId||"" };
    }
    if (voucher) {
        _data.voucher = voucher;
    }
    if(param &&  param.receiverId){
        _data.receiverId = param.receiverId;
    }
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.recharge", _data,
        function(rtn) {
            cc.log(" ====== pkplayer.handler.recharge : ", JSON.stringify(rtn));
            if (rtn.code == 0) {
                MjClient.onRecharge(rtn.data);
            } else {
                if (rtn.message) {
                    MjClient.showToast(rtn.message);
                }
            }
            MjClient.unblock();
        }
    );
}

MjClient.onRecharge = function(paras) {
    if(paras){
        if (paras.indexOf("title") != -1 && paras.indexOf("content") != -1 && paras.indexOf("url") != -1) {
            var obj = JSON.parse(paras);
            MjClient.native.wxShareUrl(obj.url, unescape(obj.title), unescape(obj.content));
    
            if (cc.sys.OS_WINDOWS == cc.sys.os)
                MjClient.showToast("模拟公众号支付成功");
        } else if (paras.indexOf("http") == 0) {
            MjClient.native.weixinWebPay(paras);
    
            if (cc.sys.OS_WINDOWS == cc.sys.os)
                MjClient.showToast("模拟网页支付成功");
        } else if (paras.indexOf("prepayId") >= 0) {
            MjClient.native.pay(PayPlatformType.WEIXIN, JSON.parse(paras));
        }
    }

    // 【商城支付】支付返回流程优化——增加异常情况联系客服
    MjClient.Scene.runAction(cc.sequence(cc.delayTime(3.5), cc.callFunc(function () {
        MjClient.showMsg("支付到账可能存在延迟1-15分钟，请耐心等待，如资产长时间仍然未到账，请联系客服。", function() {
            if (!isCurrentNativeVersionBiggerThan("14.0.0")) {
                MjClient.gamenet.request("pkplayer.handler.openBrowser", {
                    type: 9
                }, function(rtn) {
                    if (rtn.code == 0) {
                        MjClient.Scene.addChild(new NormalWebviewLayer(rtn.data));
                    } else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        } else {
                            MjClient.showToast("获取数据失败");
                        }
                    }
                });
            } else {
                MjClient.native.showQiYuChatDialog();
            }
        }, function() {}, "1", 
            {titleText: "订单确认", 
             yesNormal: "store/payProblemBtn.png", 
             noNormal: "store/payFinishBtn.png", 
             yesScale: 1.0,
             noScale: 1.0,
             titleImage: "store_3.0/orderConfirm.png"});
    })));
}

//已废弃的接口
MjClient.getActivityConfig = function() {
    MjClient.gamenet.request("pkcon.handler.getActivityConfig", {},
        function(rtn) {
            if (rtn.code == 0) {
                MjClient.activityConfig = rtn.data;
            } else {
                MjClient.activityConfig = null;
            }
        }
    );
};




MjClient.delRoom = function(yes) {
    MjClient.native.doCopyToPasteBoard(""); //清空剪切板
    var sData = MjClient.data.sData;
    if (typeof(sData) != "undefined" &&
        (sData.tData.tState == TableState.waitJoin || sData.tData.tState == TableState.waitReady) &&
        sData.tData.owner != SelfUid()
    ) {
        if (MjClient.delroomui && MjClient.delroomui.visible == true) {
            MjClient.gamenet.request("pkroom.handler.tableMsg", { cmd: "DelRoom", yes: yes },function(data) {
            if (data != null && data.code == -1 && data.message){
                MjClient.showToast(data.message);
            }
        });
        } else {
            MjClient.leaveGame();
        }
    } else {
        cc.log("------delRoom------ sking -----");
        MjClient.gamenet.request("pkroom.handler.tableMsg", { cmd: "DelRoom", yes: yes },function(data) {
            if (data != null && data.code == -1 && data.message){
                MjClient.showToast(data.message);
            }
        });
    }
};







MjClient.getServerPort = function(parts) {
    if (parts.length > 3) {
        return parseInt(parts[1 + Math.floor(Math.random() * (parts.length - 1))]);
    } else {
        var min = parseInt(parts[1]);
        var max = parseInt(parts[2]);
        var offset = max - min + 1;
        var part = Math.floor(Math.random() * offset) + min;
        return parseInt(part);
    }
};



//进入游戏
MjClient.LoginGame = function(host, port, successCallback, failedCallback) {
    if (MjClient.gamenet.isConnected && MjClient.gamenet.isConnected()) {
        mylog("MjClient.gamenet.isConnected!!!!");
        cc.log("MjClient.gamenet.isConnected!!!!");
        if (successCallback) successCallback();
        return;
    }
    if(cc.sys.OS_WINDOWS == cc.sys.os){
        // host = '192.168.1.31';
        // //host = '127.0.0.1';
        // port = 16011;
    }
    

    MjClient.gamenet.disconnect();
    MjClient.gamenet.connect(host, port,
        function() {
            // mylog("MjClient.LoginGame success!!!!host:" + host + "   port:" + port);
            cc.log("MjClient.LoginGame success!!!!host:" + host + "   port:" + port);
            //当前连接ip和端口
            MjClient.curServerPort = {host:host, port:port};
            if (successCallback) successCallback();
        },
        function() {
            mylog("MjClient.LoginGame failed!!!!!host:" + host + "   port:" + port);
            cc.log("MjClient.LoginGame failed!!!!!host:" + host + "   port:" + port);
            if (failedCallback) failedCallback();
            //postEvent("disconnect", 1);
        }
    );
};


MjClient.ConnectServer = function(openID, callback) {
    function func_oldConnectServer() {
        var servers = JSON.parse(MjClient.updateCfg.servers);
        var ports = JSON.parse(MjClient.updateCfg.ports);
        MjClient.updateCfg.serversGF = MjClient.updateCfg.serversGF || "[]";
        MjClient.updateCfg.portsGF = MjClient.updateCfg.portsGF || "[]";
        var serversGF = JSON.parse(MjClient.updateCfg.serversGF);
        var portsGF = JSON.parse(MjClient.updateCfg.portsGF);
        MjClient.updateCfg.serversAbroad = MjClient.updateCfg.serversAbroad || "[]";
        MjClient.updateCfg.portsAbroad = MjClient.updateCfg.portsAbroad || "[]";
        var serversAbroad = JSON.parse(MjClient.updateCfg.serversAbroad);
        var portsAbroad = JSON.parse(MjClient.updateCfg.portsAbroad);
        var tryCount = 0;
        if (MjClient.remoteCfg.guestLogin) {
            //苹果审核服
            servers = ["146.56.224.12"];
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
            {
                servers = ["146.56.224.12"];
            }
            ports = [16010, 16011];
        }
        if (MjClient.isAbroad() && serversAbroad.length > 0 && portsAbroad.length > 0) {
            serversGF = serversAbroad;
            portsGF = portsAbroad;
        }

        function doConnectServer() {
            if (servers.length == 0 || (tryCount >= 2 && serversGF.length > 0)) {
                doConnectServerGF();
            } else {
                var host = servers[getRandomRange(0, servers.length - 1)];
                var port = ports[getRandomRange(0, ports.length - 1)];
                if (!!MjClient.curServerPort && MjClient.curServerPort.host == host && MjClient.curServerPort.port == port) {
                		if (servers.length > ports.length && servers.length > 1) {
                				servers.splice(servers.indexOf(host), 1);
                				host = servers[getRandomRange(0, servers.length - 1)];
                		}
                		else if (servers.length < ports.length && ports.length > 1) {
                				var portsNew = ports.slice();
                				portsNew.splice(portsNew.indexOf(port), 1);
                				port = portsNew[getRandomRange(0, portsNew.length - 1)];
                		}
                }
                cc.log("----------OldConnectServer---------" + host + ":" + port);
                servers.splice(servers.indexOf(host), 1);
                tryCount++;
                MjClient.LoginGame(host, port, callback, function() {
                    MjClient.Scene.runAction(cc.callFunc(doConnectServer)); //doConnectServer();
                });
            }
        }

        function doConnectServerGF() {
            if (serversGF.length == 0) {
                postEvent("disconnect", 1);
            } else {
                var hostGF = serversGF[getRandomRange(0, serversGF.length - 1)];
                var portGF = portsGF[getRandomRange(0, portsGF.length - 1)];
                if (!!MjClient.curServerPort && MjClient.curServerPort.host == hostGF && MjClient.curServerPort.port == portGF) {
                		if (serversGF.length > portsGF.length && serversGF.length > 1) {
                				serversGF.splice(serversGF.indexOf(hostGF), 1);
                				hostGF = serversGF[getRandomRange(0, serversGF.length - 1)];
                		}
                		else if (serversGF.length < portsGF.length && portsGF.length > 1) {
                				var portsGFNew = portsGF.slice();
                				portsGFNew.splice(portsGFNew.indexOf(portGF), 1);
                				portGF = portsGFNew[getRandomRange(0, portsGFNew.length - 1)];
                		}
                }
                cc.log("----------OldConnectServerGF---------" + hostGF + ":" + portGF);
                serversGF.splice(serversGF.indexOf(hostGF), 1);
                MjClient.LoginGame(hostGF, portGF, callback, function() {
                    MjClient.Scene.runAction(cc.callFunc(doConnectServerGF)); //doConnectServerGF();
                });
            }
        }

        doConnectServer();
    }


    //用户分组模式下的服务器连接
    function func_newConnectServer() {
        var servers = [];
        var ports = [];
        try {
            var groupServerString = util.localStorageEncrypt.getStringItem("groupServer");
            if (groupServerString == "") {
                func_oldConnectServer();
                return;
            }
            var groupServer = JSON.parse(groupServerString);
            if (!groupServer || !groupServer.ips || !groupServer.ports) {
                func_oldConnectServer();
                return;
            }
            servers = groupServer.ips;
            ports = groupServer.ports;
            if (!cc.isArray(servers) || servers.length == 0 || !cc.isArray(ports) || ports.length == 0) {
                func_oldConnectServer();
                return;
            }
        }catch (e) {
            func_oldConnectServer();
            return;
        }
        var tryCount = 0;

        function doConnectServer() {
            if (servers.length == 0 || tryCount >= servers.length) {
                func_oldConnectServer();
                return;
            }

            var host = servers[getRandomRange(0, servers.length - 1)];
            var port = ports[getRandomRange(0, ports.length - 1)];
            if (!!MjClient.curServerPort && MjClient.curServerPort.host == host && MjClient.curServerPort.port == port) {
                if (servers.length > ports.length && servers.length > 1) {
                    servers.splice(servers.indexOf(host), 1);
                    host = servers[getRandomRange(0, servers.length - 1)];
                }
                else if (servers.length < ports.length && ports.length > 1) {
                    var portsNew = ports.slice();
                    portsNew.splice(portsNew.indexOf(port), 1);
                    port = portsNew[getRandomRange(0, portsNew.length - 1)];
                }
            }
            cc.log("----------NewConnectServer---------" + host + ":" + port);
            servers.splice(servers.indexOf(host), 1);
            tryCount++;
            MjClient.LoginGame(host, port, callback, function() {
                MjClient.Scene.runAction(cc.callFunc(doConnectServer)); //doConnectServer();
            });
        }
        doConnectServer();
    }

    func_oldConnectServer();
};


//是否在国外
MjClient.isAbroad = function() {
    var addressVec = JSON.parse(MjClient.native.GetAddress());
    if (addressVec[0].length == 0 && addressVec[1].length == 0) {
        //没有取到地址，则认为不在海外
        return false;
    }

    if (addressVec[0].indexOf("中国") < 0 &&
        addressVec[0].indexOf("中华人民共和国") < 0 &&
        addressVec[0].toLowerCase().indexOf("china") < 0 &&
        addressVec[0].toLowerCase().indexOf("chinese") < 0) {
        return true;
    }

    if (addressVec[0].indexOf("台湾") >= 0 ||
        addressVec[0].toLowerCase().indexOf("taiwan") >= 0 ||
        addressVec[0].toLowerCase().indexOf("tw") >= 0 ||
        addressVec[0].indexOf("香港") >= 0 ||
        addressVec[0].toLowerCase().indexOf("hong kong") >= 0 ||
        addressVec[0].toLowerCase().indexOf("hk") >= 0 ||
        addressVec[0].indexOf("澳门") >= 0 ||
        addressVec[0].toLowerCase().indexOf("macao") >= 0 ||
        addressVec[0].toLowerCase().indexOf("mo") >= 0 ||
        addressVec[1].indexOf("台湾") >= 0 ||
        addressVec[1].toLowerCase().indexOf("taiwan") >= 0 ||
        addressVec[1].toLowerCase().indexOf("tw") >= 0 ||
        addressVec[1].indexOf("香港") >= 0 ||
        addressVec[1].toLowerCase().indexOf("hong kong") >= 0 ||
        addressVec[1].toLowerCase().indexOf("hk") >= 0 ||
        addressVec[1].indexOf("澳门") >= 0 ||
        addressVec[1].toLowerCase().indexOf("macao") >= 0 ||
        addressVec[1].toLowerCase().indexOf("mo") >= 0
    ) {
        return true;
    }

    return false;
};


//是否在北京周围:版号审核用
MjClient.isAroundBeijing = function() {
    //if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ)
    //{
    //    return false;
    //}
    //
    //var latitude = 39.92;
    //var longitude = 116.46;
    //var selfLatitude = MjClient.native.GetLatitudePos();
    //if (selfLatitude == null || selfLatitude == 0 || selfLatitude == "")
    //{
    //    return false;
    //}
    //var selfLongitude = MjClient.native.GetLongitudePos();
    //if (selfLongitude == null || selfLongitude == 0 || selfLongitude == "")
    //{
    //    return false;
    //}
    //var distance = MjClient.native.CalculateLineDistance(latitude, longitude, selfLatitude, selfLongitude);
    //if (distance <= 150*1000 && distance>=0)
    //{
    //    return true;
    //}
    return false;
};

//播放回放
MjClient.playLogOne = function(msg) {
    var tempPlayLogIfoArry = [];
    var arry = [];
    arry[0] = [];
    var j = 0;
    for (var i = 0; i < msg.length; i++) {
        arry[j].push(msg[i]);
        if (msg[i].cmd == "roundEnd") {
            tempPlayLogIfoArry.push(arry[j]);
            arry[++j] = [msg[0]];
            if (msg[1].cmd == "TZTeam") { //打筒子4人回放分组数据
                arry[j].push(msg[1]);
            }
        }
    }
    if(MjClient.otherReplayRound){
        var scene = cc.director.getRunningScene();
        if (!scene.replayControllerNode) {
            var node = new cc.Node();
            scene.addChild(node);
            scene.replayControllerNode = node;
        }
        playLogIfoArry = tempPlayLogIfoArry; //add by sking
        RePlaySelectRole(scene.replayControllerNode, MjClient.otherReplayRound, tempPlayLogIfoArry);
    }else if ( msg) {
        playLogIfoArry = tempPlayLogIfoArry;
        MjClient.Scene.addChild(new playLogInfoLayer());
    }
};



/**
 * 下载网络文件
 * @param  {String} url 文件url地址
 * @param  {String} fullFileName 下载成功后保存在本地的文件名全路径
 * @param  {function} successCallBack 下载成功回调
 * @param  {function} failedCallBack 下载失败回调
 */
MjClient.downloadFile = function(url, fullFileName, successCallBack, failedCallBack) {
    if (fullFileName.length==0 || url.length==0) {
        if (failedCallBack) failedCallBack(fullFileName, "MjClient.downloadFile error params.");
        return;
    }
    if (jsb.fileUtils.isFileExist(fullFileName)) {
        if (successCallBack) successCallBack(fullFileName);
        return;
    }
    var downloader = new jsb.Downloader();
    downloader.setOnTaskError(function(downloadTask, errorCode, errorCodeInternal, errorStr){
        cc.log("downloader OnTaskError: ", JSON.stringify(downloadTask), errorCode, errorCodeInternal, errorStr);
        if (failedCallBack) failedCallBack(downloadTask.storagePath, errorStr);
    });
    downloader.setOnFileTaskSuccess(function(downloadTask){
        cc.log("downloader OnFileTaskSuccess: ", JSON.stringify(downloadTask));
        if (successCallBack) successCallBack(downloadTask.storagePath);
    });
    downloader.createDownloadFileTask(url, fullFileName, fullFileName);
};

//20201019-闪退处理  xdx
MjClient.loadImgQX = function(urlImage, params, successCallBack) {
    urlImage = urlImage.replace(/https/, "http");
    var write_path = jsb.fileUtils.getWritablePath();
    // var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    var savepath = write_path + util.md5.hex_md5(urlImage);
    //cc.log("MjClient.urlImageDown url:", urlImage);
    //cc.log("MjClient.urlImageDown savepath:", savepath);

    //为了兼容原有的，失败时还是走成功回调，不过texture返回空
    var failedCallBack = function(path, errorStr){
        if (successCallBack) successCallBack(errorStr, null);
    }

    //为空则直接失败
    if(!urlImage){
        failedCallBack("", "path is null");
    }

    //如果不是网络则直接返回
    if(urlImage && urlImage.indexOf("http") == -1){
        if (successCallBack) {
            cc.log("urlImage",urlImage);
            var sprite  = new cc.Sprite(urlImage);
            var tex = sprite.getTexture();
            successCallBack(null, tex);
        }
        return;
    }

    //开始下载网络图片
    MjClient.downloadFile(urlImage, savepath, function (filePath) {
        if (successCallBack) {
            var sprite  = new cc.Sprite(filePath);
            var tex = sprite.getTexture();
            successCallBack(null, tex);
        }
    }, failedCallBack);
};


/**
 * 下载网络图片 png / jpg
 * @param  {String} urlImage 图片url地址
 * @param  {String} fileName 下载成功后保存在本地的文件名
 * @param  {function} successCallBack 下载成功毁掉
 * @param  {function} failedCallBack 下载失败毁掉
 */
MjClient.urlImageDown = function(urlImage, fileName, successCallBack, failedCallBack) {
    var write_path = jsb.fileUtils.getWritablePath();
    var savepath = write_path + fileName;
    cc.log("MjClient.urlImageDown url:", urlImage);
    cc.log("MjClient.urlImageDown savepath:", savepath);

    // var imgcb = function(texture) {
    //     if (texture instanceof cc.Texture2D) {
    //         cc.log("Success urlImageDown to path:", savepath);
    //         var IMAGE_FORMAT_TYPE = cc.IMAGE_FORMAT_PNG;
    //         if (fileName.endsWith(".jpg")) {
    //             IMAGE_FORMAT_TYPE = cc.IMAGE_FORMAT_JPEG;
    //         }
    //
    //         var sprite = new cc.Sprite(texture);
    //         sprite.setAnchorPoint(0, 0);
    //         sprite.x = 0;
    //         sprite.y = 0;
    //
    //         var rt = new cc.RenderTexture(sprite.width, sprite.height);
    //         rt.begin();
    //         sprite.visit();
    //         rt.end();
    //         rt.saveToFile(fileName, IMAGE_FORMAT_TYPE, true);
    //
    //         if (successCallBack) successCallBack(sprite, savepath);
    //     } else {
    //         cc.log("Fail to load remote texture by urlImageDown");
    //         if (failedCallBack) failedCallBack();
    //     }
    // };
    // cc.textureCache.addImageAsync(urlImage, imgcb);
    MjClient.downloadFile(urlImage, savepath, function (filePath) {
        if (successCallBack) successCallBack(new cc.Sprite(filePath), filePath);
    }, failedCallBack);
};


/**
 * 下载头像
 * @param  {String} url 图片url地址
 * @param  {function} successCallBack(error, fullFileName) 下载成功回调，形参:文件完整路径
 */
MjClient.downloadHeadImage = function(url, successCallBack) {
    if (!url || url.length == 0) {
        return;
    }

    var fileName = util.md5.hex_md5(url);
    var fullFileName = jsb.fileUtils.getWritablePath() + fileName;
    MjClient.downloadFile(url, fullFileName, function (fullPath) {
        var ccImage = new cc.Image();
        ccImage.initWithImageFile(fullPath);
        cc.textureCache.addImage(ccImage, url);
        if (successCallBack) successCallBack(null, fullPath);
    }, function (file, error) {
        cc.log(error);
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.responseType = 'arraybuffer';
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if( jsb.fileUtils.writeDataToFile(new Uint8Array(xhr.response), fullFileName) ){
                    var ccImage = new cc.Image();
                    ccImage.initWithImageFile(fullFileName);
                    cc.textureCache.addImage(ccImage, url);
                    if (successCallBack) successCallBack(null, fullFileName);
                }
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    });
};



MjClient.saveNodeToImage = function(node, imageName, savecallback, isFullScene) {
    var write_path = jsb.fileUtils.getWritablePath();
    var savepath = write_path + imageName;
    cc.log("MjClient.saveNodeToImage savepath:", savepath);

    var IMAGE_FORMAT_TYPE = cc.IMAGE_FORMAT_PNG;
    if (imageName.endsWith(".jpg")) {
        IMAGE_FORMAT_TYPE = cc.IMAGE_FORMAT_JPEG;
    }

    var saveimg = function() {
        var scale = node.getScale();
        var rt = null;
        if (isFullScene) {
            var ws = cc.director.getWinSize();
            rt = new cc.RenderTexture(ws.width, ws.height);
        } else {
            rt = new cc.RenderTexture(node.width * scale, node.height * scale);
        }
        rt.begin();
        node.visit();
        rt.end();
        rt.saveToFile(imageName, IMAGE_FORMAT_TYPE, true, function() {
            if (typeof(savecallback) == 'function') savecallback(node, savepath);
        });
    }
    node.runAction(cc.sequence(cc.callFunc(saveimg)));
}


//分享有礼时获取分享图片路径
MjClient.getShareImageFileToPYQ = function(specifiedArea) {
    function checkAreaFromAddress(area) {
        var result = false;
        var vecAddress = JSON.parse(MjClient.native.GetAddress());
        for (var i = 0; i < vecAddress.length; i++) {
            var address = vecAddress[i];
            if (address.indexOf(area) >= 0) {
                result = true;
                break;
            }
        }
        return result;
    }

    function getFileContentByArea(area) {
        var file = "";
        var shareImageUrl = MjClient.systemConfig.shareImageConfig[area].url;
        if (shareImageUrl) {
            var nameArr = shareImageUrl.split("/");
            var nameStr = nameArr[nameArr.length - 1];
            file = jsb.fileUtils.getWritablePath() + nameStr;
        }
        return { file: file, content: "" + MjClient.systemConfig.shareImageConfig[area].content };
    }

    var str = "";
    if(Object.keys(MjClient.systemConfig.shareImageConfig).length>0){
        str = Object.keys(MjClient.systemConfig.shareImageConfig)[0];
    }else {
        MjClient.showToast("没有配置分享图");
        return;
    }
    var fileContent = getFileContentByArea(str);
    if (specifiedArea) {
        fileContent = getFileContentByArea(specifiedArea);
    } else {
        for (var area in MjClient.systemConfig.shareImageConfig) {
            if (checkAreaFromAddress(area)) {
                fileContent = getFileContentByArea(area);
                break;
            }
        }
    }

    return fileContent;
};



//积分商城获取分享图片路径
MjClient.getShareImageMallFileToPYQ = function(specifiedArea) {
    function checkAreaFromAddress(area) {
        var result = false;
        var vecAddress = JSON.parse(MjClient.native.GetAddress());
        for (var i = 0; i < vecAddress.length; i++) {
            var address = vecAddress[i];
            if (address.indexOf(area) >= 0) {
                result = true;
                break;
            }
        }
        return result;
    }

    function getFileContentByArea(area) {
        var file = "";
        var shareImageUrl = MjClient.systemConfig.shareImageMallConfig[area].url;
        if (shareImageUrl) {
            var nameArr = shareImageUrl.split("/");
            var nameStr = nameArr[nameArr.length - 1];
            file = jsb.fileUtils.getWritablePath() + nameStr;
        }
        return { file: file, content: "" + MjClient.systemConfig.shareImageMallConfig[area].content };
    }

    var str = "";
    if(Object.keys(MjClient.systemConfig.shareImageMallConfig).length>0){
        str = Object.keys(MjClient.systemConfig.shareImageMallConfig)[0];
    }else {
        MjClient.showToast("没有配置分享图");
        return;
    }
    var fileContent = getFileContentByArea(str);
    if (specifiedArea) {
        fileContent = getFileContentByArea(specifiedArea);
    } else {
        for (var area in MjClient.systemConfig.shareImageMallConfig) {
            if (checkAreaFromAddress(area)) {
                fileContent = getFileContentByArea(area);
                break;
            }
        }
    }

    return fileContent;
};


MjClient.addHomeView = function(type) {
    if (MjClient.homeui && cc.sys.isObjectValid(MjClient.homeui))
        return;

    var homeView = null;
    switch (MjClient.getAppType()) {
        case MjClient.APP_TYPE.QXJSMJ: //牌友联盟江苏麻将
            homeView = new HomeView_qxjsmj();
            break;
        case MjClient.APP_TYPE.JSMJ: //牌友联盟南京麻将
            homeView = new HomeView_jsmj();
            break;
        case MjClient.APP_TYPE.QXHAMJ: //牌友联盟淮安麻将
            homeView = new HomeView_qxhamj();
            break;
        case MjClient.APP_TYPE.QXXZMJ: //牌友联盟徐州麻将
            homeView = new HomeView_qxxzmj();
            break;
        case MjClient.APP_TYPE.QXNTQP: //牌友联盟南通棋牌
            homeView = new HomeView_qxntqp();
            break;
        case MjClient.APP_TYPE.QXYCQP: //牌友联盟盐城棋牌
            homeView = new HomeView_qxycqp();
            break;
        case MjClient.APP_TYPE.QXTHMJ: //牌友联盟通化麻将
            homeView = new HomeView_qxthmj();
            break;
        case MjClient.APP_TYPE.QXYYQP: //牌友联盟岳阳棋牌
            //不用选新旧UI版本了
            // var selectUiIndex = util.localStorageEncrypt.getNumberItem(MjClient.KEY_uiSelect, 1);
            // if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
                homeView = new HomeView_qxyyqp_v3();
            // else if (selectUiIndex == 1)
            //     homeView = new HomeView_qxyyqp();
            // else
            //     homeView = new HomeView_qxyyqp_old();
            break;
        case MjClient.APP_TYPE.YLHUNANMJ: //永利
            homeView = new HomeView_ylhunanmj();
            // var selectUiIndex = util.localStorageEncrypt.getNumberItem(MjClient.KEY_uiSelect, 1);
            // if (selectUiIndex == 1)
            //     homeView = new HomeView_ylhunanmj();
            // else
            //     homeView = new HomeView_ylhunanmj_old();
            break;
        case MjClient.APP_TYPE.QXHAIANMJ: //牌友联盟海安麻将
            homeView = new HomeView_qxhaianmj();
            break;
        case MjClient.APP_TYPE.TXJINZHONGMJ: //天星晋中麻将
            homeView = new HomeView_txjinzhongmj();
            break;
        case MjClient.APP_TYPE.TXLVLIANGMJ: //天星吕梁麻将
            homeView = new HomeView_txlvliangmj();
            break;
        case MjClient.APP_TYPE.TXLINFENMJ: //天星临汾麻将
            homeView = new HomeView_txlinfenmj();
            break;
        case MjClient.APP_TYPE.QXYZQP://牌友联盟永州棋牌
            homeView = new HomeView_qxyzqp();
            break;
        case MjClient.APP_TYPE.QXLYQP://牌友联盟耒阳麻将
            homeView = new HomeView_qxlyqp();
            break;
        case MjClient.APP_TYPE.BDHYZP://北斗衡阳字牌
            homeView = new HomeView_bdhyzp();
            break;
        case MjClient.APP_TYPE.BDYZPHZ://北斗永州字牌
            homeView = new HomeView_bdyzphz();
            break;
        case MjClient.APP_TYPE.QXSYDTZ://牌友联盟邵阳打筒子
            // if(type === undefined){
            //     type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_QXSYDTZ_HOME_UI_TYPE, 1);
            // }
            // if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
                homeView = new HomeView_qxsydtz_v3();
            // else if(type == 0){
            //     homeView = new HomeView_qxsydtzOld();
            // }else{
            //     homeView = new HomeView_qxsydtz();
            // }
            break;
        case MjClient.APP_TYPE.HUNANWANGWANG://湖南旺旺
            homeView = new HomeView_hnwangwang();
            break;
        case MjClient.APP_TYPE.QXXXGHZ://牌友联盟湘乡
            homeView = new HomeView_qxxxghz();
            break;
        case MjClient.APP_TYPE.AYGUIZHOUMJ: //爱游贵州麻将
            homeView = new HomeView_ayguizhoumj();
            break;
        case MjClient.APP_TYPE.LYSICHUANMJ: //乐易四川麻将
            homeView = new HomeView_lysichuanmj();
            break;
        case MjClient.APP_TYPE.DQSHANXIMJ: //逗趣山西麻将
            homeView = new HomeView_douqushanxi();
            break;
        case MjClient.APP_TYPE.HUBEIMJ: //牌友联盟岳阳棋牌
            // var selectUiIndex = util.localStorageEncrypt.getNumberItem(MjClient.KEY_uiSelect, 1);
            // if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
                homeView = new HomeView_hbqp_v3();
            // else if (selectUiIndex == 1)
            //     homeView = new HomeView_hbqp();
            // else
            //     homeView = new HomeView_hbqp_old();
            // break;
    }
    MjClient.Scene.addChild(homeView, -1);
    if (MjClient.emailData) {
        homeView.runAction(cc.callFunc(function() {
            postEvent("refresh_mail_list", MjClient.emailData);
        }))
    }
};


MjClient.checkChangeLocationApp = function()
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    var checkedAppList = [];
    for (var index in ChangeLocationAppList)
    {
        var appInfo = ChangeLocationAppList[index];
        if (MjClient.native.isAppInstalled(appInfo.package))
        {
            checkedAppList.push(appInfo);
        }
    }
    var cmd = "MJChangeLocationApp";
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
        (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI))
    {
        cmd = "sendLocationApps";
    }
    MjClient.gamenet.request("pkroom.handler.tableMsg", { cmd: cmd, uid: SelfUid(), appList: checkedAppList });
};

MjClient.getWxHeadLocalUrlByHttp = function(uid, url) {
    // var dayStr = MjClient.dateFormat(new Date(), 'yyyy-MM-dd');
    var tempurl = url;
    var headFileName = uid+"_url_head"+".jpg";
    var saveHeadUrl = jsb.fileUtils.getWritablePath() + headFileName;
    var urllocal = util.localStorageEncrypt.getStringItem(headFileName,"");
    if (urllocal!=""&&(urllocal==url)&&jsb.fileUtils.isFileExist(saveHeadUrl))
    {
        return saveHeadUrl;
    }else
    {
        var randomInt = Math.floor(Math.random() * 100);
        tempurl +="?"+randomInt+"="+ randomInt+".jpg";

        if(url&&(uid)){
            MjClient.urlImageDown(tempurl,headFileName,function(sprite, savepath) {
                util.localStorageEncrypt.setStringItem(headFileName,url);
            });
        }
        return tempurl;
    }

    return saveHeadUrl;
}
var loadArr=[];
MjClient.getWxHeadLocalUrl = function(uid, url) {
    // var dayStr = MjClient.dateFormat(new Date(), 'yyyy-MM-dd');
    var tempurl = url;
    var base64Name = util.base64.base64encode(url);
    var headFileName = base64Name+"_url_head"+".jpg";
    var saveHeadUrl = jsb.fileUtils.getWritablePath() + headFileName;
    var urllocal = util.localStorageEncrypt.getStringItem(headFileName,"");
    if (urllocal!=""&&(urllocal==url)&&jsb.fileUtils.isFileExist(saveHeadUrl))
    {
        return saveHeadUrl;
    }else
    {
        var randomInt = Math.floor(Math.random() * 100);
        tempurl +="?"+randomInt+"="+ randomInt+".png";

        if(url&&loadArr.length<5){
            loadArr.push(saveHeadUrl);
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onreadystatechange = function () {
                cc.log("xhr.readyState " +xhr.readyState);
                cc.log("xhr.status " +xhr.status);
                if (xhr.readyState === 4) {
                    if(xhr.status === 200) {
                        if( jsb.fileUtils.writeDataToFile(  new Uint8Array(xhr.response) , saveHeadUrl) ){
                            cc.log("writeDataToFile-------->5:"+saveHeadUrl);
                            util.localStorageEncrypt.setStringItem(headFileName,url);
                            loadArr.length = loadArr.length-1;
                        }else{
                            loadArr.length = loadArr.length-1;
                        }

                    } else {
                        loadArr.length = loadArr.length-1;
                    }
                }
            };
            xhr.send();
        }
    }

    return tempurl;
}


//更新微信个人信息
MjClient.updateWXLoginData = function () {
    var wxLoginDataStr = util.localStorageEncrypt.getStringItem("WX_USER_LOGIN");
    if(wxLoginDataStr.length == 0) {
        return;
    }
    var wxLoginData = JSON.parse(wxLoginDataStr);
    if (!wxLoginData.refresh_token || !wxLoginData.appid) {
        return;
    }

    function refreshToken(callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        var url = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid="+wxLoginData.appid+"&grant_type=refresh_token&refresh_token="+wxLoginData.refresh_token;
        xhr.open("GET", url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var msg = null;
                try {
                    msg = JSON.parse(xhr.responseText);
                    if (msg.refresh_token) {
                        wxLoginData.refresh_token = msg.refresh_token;
                    }
                    if (msg.access_token) {
                        if (callback) callback(msg.access_token);
                    }
                } catch (e) {
                    cc.log("refreshToken throw: "+JSON.stringify(e));
                }
            }
        };
        xhr.timeout = 3000;
        xhr.send();
    }
    
    function getUserinfo(access_token) {
        var xhr = cc.loader.getXMLHttpRequest();
        var url = "https://api.weixin.qq.com/sns/userinfo?access_token="+access_token+"&openid="+wxLoginData.openid;
        xhr.open("GET", url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var msg = null;
                try {
                    msg = JSON.parse(xhr.responseText);
                    if (msg.nickname) {
                        wxLoginData.nickname = escape(msg.nickname);
                    }
                    if (msg.sex) {
                        wxLoginData.sex = msg.sex;
                    }
                    if (msg.province) {
                        wxLoginData.province = msg.province;
                    }
                    if (msg.city) {
                        wxLoginData.city = msg.city;
                    }
                    if (msg.country) {
                        wxLoginData.country = msg.country;
                    }
                    if (msg.headimgurl) {
                        wxLoginData.headimgurl = msg.headimgurl;
                    }
                    util.localStorageEncrypt.setStringItem("WX_USER_LOGIN", JSON.stringify(wxLoginData));
                } catch (e) {
                    cc.log("getUserinfo throw: "+JSON.stringify(e));
                }
            }
        };
        xhr.timeout = 3000;
        xhr.send();
    }

    refreshToken(getUserinfo);
};

//是否开启贵族头像框（牌桌）
MjClient.isOpenHeadFrame = function(){
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
        return true;
    }
    return false;
};
//是否开启入场动画(牌桌）
MjClient.isOpenJoinGameAni = function(){
    return util.localStorageEncrypt.getBoolItem("_RuChangAni", true);
};

var JSScene = cc.Scene.extend({
    jsBind: {
        _event: {
            changeUIEvent : function(type){
                if (MjClient.homeui && cc.sys.isObjectValid(MjClient.homeui)){
                    MjClient.homeui.removeFromParent(true);
                    MjClient.homeui = null;
                }
                MjClient.addHomeView(type);
            },
            openWeb: function(para) {
                if (haveThirdPartyWebView()) {
                    return;
                }
                MjClient.uiPara = para;
                let layer = new WebViewLayer();
                if(para.isGold){
                    COMMON_UI.layerShowEffect(layer);
                }
                this.addChild(layer);
            },
            openNotice: function() {
                if (haveThirdPartyWebView()) {
                    return;
                }
                this.addChild(new InfoLayer());
            },
            popUpUnclosedMsg: function(pmsg) {
                if (haveThirdPartyWebView()) {
                    return;
                }
                if (MjClient.webViewLayer != null) {
                    MjClient.webViewLayer.close();
                }
                this.addChild(UnclosedPopMsgView(pmsg));
            },
            popUpMsg: function(pmsg) {
                if (haveThirdPartyWebView()) {
                    return;
                }
                if (MjClient.webViewLayer != null) {
                    MjClient.webViewLayer.close();
                }
                if (pmsg.param && pmsg.param == "nantongReplay")
                    this.addChild(NewPopMsgView(pmsg), 1);
                else
                    this.addChild(NewPopMsgView(pmsg));
            },
            popUpMsgTop: function(pmsg) {
                if (haveThirdPartyWebView()) {
                    return;
                }
                if (MjClient.webViewLayer != null) {
                    MjClient.webViewLayer.close();
                }
                this.addChild(NewPopMsgView(pmsg), 9999);
            },
            popUpMsgOpenPos: function(pmsg) {
                if (haveThirdPartyWebView()) {
                    return;
                }
                if (MjClient.webViewLayer != null) {
                    MjClient.webViewLayer.close();
                }
                this.addChild(PopMsgView_openPos(pmsg));
            },
            cfgUpdate: function(changeValue) {
                if (MjClient.restartTip || !changeValue.severRestart) return;
                MjClient.Scene.addChild(new RestartGameTip(), 99999);
            },
            updateFinish: function() {
                //if(!MjClient.gamenet)
                MjClient.gamenet = new MJNet();
                /*
                为了适配用户分组连接，将连接服务器的操作后置到微信授权成功后
                 */
                //MjClient.LoginGame();
                cc.log("updateFinish event");
                if (cc.sys.isObjectValid(MjClient.updateui)) {
                    MjClient.updateui.removeFromParent();
                    MjClient.updateui = null;
                }
                postEvent("connect");
            },
            connect: function() {
                cc.log("connect event");
                MjClient.game_on_show = true;
                if (!MjClient.homeui && !MjClient.playui) {
                    // mylog("loginui");
                    this.addChild(createLoginView());
                } else {
                    mylog("auto login");
                    MjClient.autoLogin();
                }
            },
            game_on_hide: function() {
                MjClient.game_on_show = false;
                MjClient.isJustComeBack = false;
            },
            game_on_show: function() {
                MjClient.game_on_show = true;
                MjClient.isJustComeBack = true; //从后台切回来
                setTimeout(function() {
                    MjClient.isJustComeBack = false;
                }, 10000);
                //理财宝箱时间 起后台 开启
                if (cc.sys.isObjectValid(MjClient.LiCaiBaoXiang_ui)) {
                    var _self = MjClient.LiCaiBaoXiang_ui;
                    _self.unscheduleAllCallbacks();
                    _self._schedule = false;
                    _self.reqBuyBoxInfo();
                }

                if (MjClient.playui || (MjClient.data && MjClient.data.sData)) MjClient.tickGame(0);
            },
            disconnect: function(code) {
                if (!MjClient.remoteCfg || code != 6 /*||MjClient.game_on_show*/ ) {
                    MjClient.unblock();
                    if (MjClient.reconnectFailedCount >= 3) {
                        MjClient.showMsgTop("网络连接断开(" + g_ErrorCode[code] + ")，请检查网络设置，重新连接", function() { MjClient.restartGame(); })
                    } else {
                        MjClient.reconnectFailedCount++;
                        util.localStorageEncrypt.setNumberItem("reconnectFailedCount", MjClient.reconnectFailedCount);
                        MjClient.restartGame();
                    }
                } else {
                    MjClient.block();
                    MjClient.Scene.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function() {
                        MjClient.game_on_show = true;
                        MjClient.reconnect = true;
                        cc.log("reconnect");

                        if (!MjClient.gamenet)
                            MjClient.gamenet = new MJNet();
                        MjClient.autoLogin();
                    })));
                }
            },
            loginOK: function(rtn) {
                if (MjClient.reconnect) {
                    MjClient.reconnect = false;
                    CheckUpdateResource();
                    mylog("CheckUpdateResource");
                }
                MjClient.lastMJTick = new Date().getTime();
                MjClient.reconnectFailedCount = 0;
                util.localStorageEncrypt.setNumberItem("reconnectFailedCount", 0);
                cc.log("loginOk creat home page --- by sking");
                //MjClient.data=rtn;
                MjClient.data = MjClient.data || {};
                for (var key in rtn) {
                    MjClient.data[key] = rtn[key];
                }
                MjClient._localTime = Date.now();
                util.localStorageEncrypt.setBoolItem("isAgent", isAgent());

                //本地缓存用户分组IP
                try {
                    if ("groupServer" in MjClient.data.pinfo) {
                        util.localStorageEncrypt.setStringItem("groupServer", JSON.stringify(MjClient.data.pinfo.groupServer));
                    }
                }
                catch (e) { }


                if ("uiType" in MjClient.data.pinfo && MjClient.setSkinToLocal) {
                    MjClient.setSkinToLocal(MjClient.data.pinfo.uiType);
                }

                for (var netEvt in MjClient.netCallBack) {
                    MjClient.gamenet.QueueNetMsgCallback(netEvt);
                }
                MjClient.gamenet.SetCallBack("disconnect", function() { postEvent("disconnect", 6); });

                var uiIndex = 1;
                if (MjClient.isUseUIv3 && MjClient.isUseUIv3()){
                    uiIndex = 2;
                }
                uploadCurrentUIFunc(uiIndex);

                if (!MjClient.homeui && !MjClient.playui && !haveThirdPartyWebView()) {
                    MjClient.native.setAliasAndTags4Jpush(MjClient.data.pinfo.uid, [MjClient.native.GetVersionName(), "" + MjClient.resVersion]);
                    MjClient.native.setInfo4Bugly(MjClient.data.pinfo.uid, MjClient.resVersion);


                    //登录成功加载主界面
                    MjClient.addHomeView();
                    MjClient.updateWXLoginData();
                    //MjClient.getRechargeLadder();
                    //MjClient.getActivityConfig();


                    //剪贴板没有复制房号
                    var clipboardStr = MjClient.native.doGetPasteBoard();
                    if ((cc.isUndefined(clipboardStr) ||
                            clipboardStr.length == 0 ||
                            clipboardStr.substring(clipboardStr.indexOf('[') + 1, clipboardStr.indexOf(']')).length != 6) &&
                        !MjClient.remoteCfg.guestLogin &&
                        !rtn.vipTable &&
                        !rtn.matchTable &&
                        !rtn.matchOngoing &&
                        !rtn.matchs
                    ) {
                        var allActivity = MjClient.FUNCTION_CONFIG_TYPE;
                        var isPopView = function(activityType) {
                            if (MjClient.systemConfig.functionConfigXY && MjClient.systemConfig.functionConfigXY[activityType]) {
                                cc.log(" ======= 有 字段 functionConfigXY ", MjClient.systemConfig.functionConfigXY[activityType].popup);
                                return MjClient.systemConfig.functionConfigXY[activityType].popup;
                            }
                            return false;
                        };
                        var isLastAtToday = function() {
                            if (!MjClient.data.pinfo.lastLoginTime || cc.isUndefined(MjClient.data.pinfo.lastLoginTime))
                                return false;

                            var nowDate = MjClient.dateFormat(new Date(MjClient.data.serverTime), "yyyy/MM/dd");
                            var lastDate = MjClient.dateFormat(new Date(MjClient.data.pinfo.lastLoginTime), "yyyy/MM/dd");
                            return lastDate == nowDate;
                        };

                        var isOldPlayer = function(){
                            var nowDate = MjClient.dateFormat(new Date(MjClient.data.serverTime), "yyyyMMdd");
                            var lastDate = MjClient.dateFormat(new Date(MjClient.data.pinfo.createTime), "yyyyMMdd");
                            return (nowDate - lastDate) >= 1;
                        }
                        // 每周一 弹一次
                        var isLastAtWeekend = function() {
                            if (!MjClient.data.pinfo.lastLoginTime || cc.isUndefined(MjClient.data.pinfo.lastLoginTime))
                                return false;

                            var lastDate = MjClient.dateFormat(new Date(MjClient.data.serverTime), "yyyy/MM/dd");
                            var nowDate = MjClient.dateFormat(new Date(MjClient.data.pinfo.lastLoginTime), "yyyy/MM/dd");
                            var str = "日一二三四五六".charAt(new Date().getDay());
                            var isShow = (lastDate !== nowDate) && (str == "一");
                            return isShow;
                        };


                        //活动
                        var popActivityLayer = function(callback) {
                            if (MjClient.systemConfig && MjClient.systemConfig.activity && MjClient.systemConfig.activity.popup) {
                                var layer = new activityLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //招募
                        var popAdvLayer = function(callback) {
                            if (MjClient.systemConfig.advConfig) {
                                var layer = new showAdvLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };
                        //大转盘
                        var popLuckyLayer = function(callback) {
                            var popup = isPopView(allActivity.DA_ZHUAN_PAN);

                            if (MjClient.remoteCfg.guestLogin != true && MjClient.isOpentFunctionType(allActivity.DA_ZHUAN_PAN) && popup) {
                                var layer = new luckyTableLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //理财宝箱
                        var popLCBXLayer = function(callback) {
                            var popup = isPopView(allActivity.LI_CAI_BAO_XIANG);
                            if (MjClient.isOpentFunctionType(allActivity.LI_CAI_BAO_XIANG) && popup) {
                                var layer = new LiCaiBaoXiang_Layer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //钻石宝箱
                        var popLCBXZSLayer = function(callback) {
                            var popup = isPopView(allActivity.LI_CAI_BAO_XIANG_ZS);
                            if (MjClient.isOpentFunctionType(allActivity.LI_CAI_BAO_XIANG_ZS) && popup) {
                                var layer = new ZuanShiBaoXiang();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //广告
                        var popAdvShowLayer = function(callback) {
                            var lastAtToday = isLastAtToday();
                            if (!lastAtToday) {
                                util.localStorageEncrypt.setNumberItem("advShowNum", 1);
                            }

                            if (cc.sys.os != cc.sys.OS_IOS && lastAtToday && util.localStorageEncrypt.getNumberItem("advShowNum", 1)<=2 && MjClient.systemConfig.popAdvShow == "true") {
                                var layer = new advPopLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.setCloseCallback(callback);

                                UIEventBind(null, layer, MjClient.native.mobgiAdsCallbackEvent.NATIVE_ADS_INVALID, function(data) {
                                    if (data.type != MjClient.native.mobgiAdsType.YUANSHENG_CHONGQI) {
                                        return;
                                    }
                                    layer.removeFromParent();
                                    if (callback) callback();
                                });
                                UIEventBind(null, layer, MjClient.native.mobgiAdsCallbackEvent.NATIVE_ADS_INFO, function(str) {
                                    try {
                                        var data = str;
                                        if (cc.isString(str)) {
                                            data = JSON.parse(str);
                                        }

                                        if (data.type != MjClient.native.mobgiAdsType.YUANSHENG_CHONGQI) {
                                            return;
                                        }
                                        var url = data.imageUrl[0];
                                        if (url.length > 0) {
                                            layer.loadImage(data);
                                            var advShowNum = util.localStorageEncrypt.getNumberItem("advShowNum", 1)+1;
                                            util.localStorageEncrypt.setNumberItem("advShowNum", advShowNum);
                                            layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                        } else {
                                            layer.removeFromParent();
                                            if (callback) callback();
                                        }
                                    } catch (e) {
                                        layer.removeFromParent();
                                        if (callback) callback();
                                    }
                                });
                                MjClient.native.mobgiAds.getNativeAdsInfo(MjClient.native.mobgiAdsType.YUANSHENG_CHONGQI);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //朋友圈对战
                        var popFriendsPKLayer = function(callback) {
                            var popup = isPopView(allActivity.FRIENDS_PK);

                            if (MjClient.isOpentFunctionType(allActivity.FRIENDS_PK) && popup) {
                                var layer;
                                layer = new FriendsPK_Layer();

                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };
                        //娃娃机
                        var popZhuaWaWaLayer = function(callback) {
                            var popup = isPopView(allActivity.ZHUA_ZHUA_LE);

                            if (MjClient.remoteCfg.guestLogin != true && MjClient.isOpentFunctionType(allActivity.ZHUA_ZHUA_LE) && popup) {
                                var layer = new ZhuaWaWa_mainLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //加油红包
                        var popJiaYouRedPacketLayer = function(callback) {
                            var popup = isPopView(allActivity.JIA_YOU_HONG_BAO);
                            if (MjClient.remoteCfg.guestLogin != true && MjClient.isOpentFunctionType(allActivity.JIA_YOU_HONG_BAO) && popup) {
                                var layer = new jiaYouRedPacketLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        // 充值
                        var popChongZhiLayer = function(callback) {
                            var popup = isPopView(allActivity.CHONG_ZHI_YOU_LI);
                            var time = "2018-04-16";
                            var day = MjClient.dateFormat(new Date(MjClient.data.serverTime), "yyyy-MM-dd");
                            if (MjClient.isOpentFunctionType(allActivity.CHONG_ZHI_YOU_LI) && popup) {
                                var layer = new ChargePrize_Layer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        // 签到
                        var popQiandaoLayer = function(callback) {
                            var popup = isPopView(allActivity.QIAN_DAO_YOU_LI);
                            // var time = "2018-04-17";
                            // var day = MjClient.dateFormat(new Date(MjClient.data.serverTime), "yyyy-MM-dd");
                            if (MjClient.isOpentFunctionType(allActivity.QIAN_DAO_YOU_LI) && popup) {
                                var layer = new QiandaoLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        // 签到抽奖
                        var popQiandaoChoujiangLayer = function(callback) {
                            var popup = isPopView(allActivity.QIAN_DAO_CHOU_JIANG);
                            if (MjClient.isOpentFunctionType(allActivity.QIAN_DAO_CHOU_JIANG) && popup) {
                                var layer = new luckyTableNew_layer();
                                var selectUiIndex = MjClient.isUseUIv3 && MjClient.isUseUIv3();
                                if(selectUiIndex){
                                    layer = new luckyTableNew_layer_30();
                                }
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };
                        // 中秋节88元红包
                        var popZhongQiuJie88YuanLayer = function(callback) {
                            var popup = isPopView(allActivity.ZHONG_QIU_JIE_88_YUAN);
                            if (MjClient.isOpentFunctionType(allActivity.ZHONG_QIU_JIE_88_YUAN) && popup) {
                                var layer = new ActiveZhongQiuJie_enter();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //排行榜活动
                        var popRankLayer = function(callback) {
                            
                            var popup = isPopView(allActivity.ACTIVE_RANK);
                            if (MjClient.remoteCfg.guestLogin != true &&
                                MjClient.isOpentFunctionType(allActivity.ACTIVE_RANK) &&
                                popup && MjClient.getAppType() != MjClient.APP_TYPE.QXNTQP &&
                                MjClient.getAppType() != MjClient.APP_TYPE.QXHAMJ) {
                                cc.log(" ======fffffff ");
                                var layer = new Active_rankLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //中秋排行榜
                        var popZhongQiuJieRankLayer = function(callback)
                        {
                            var popup = isPopView(allActivity.ZHONG_QIU_JIE_RANK);
                            if (MjClient.remoteCfg.guestLogin != true && MjClient.isOpentFunctionType(allActivity.ZHONG_QIU_JIE_RANK ) && popup)
                            {
                                var layer = new Active_zhongQiuRank();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            }
                            else
                            {
                                if (callback)
                                {
                                    callback();
                                }
                            }
                        };

                        //主页分享弹窗
                        var popShareLayer = function(callback) {
                            var popup = isPopView(allActivity.DA_TING_FEN_XIANG);
                            if (MjClient.isOpentFunctionType(allActivity.DA_TING_FEN_XIANG) && popup) {
                                var layer = new shareTodayLayer(true);
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //永州中秋节策划方案
                        var popZhongQiuJieYZLayer = function(callback)
                        {
                            var popup = isPopView(allActivity.ZHONG_QIU_JIE_YONGZHOU);
                            if (MjClient.isOpentFunctionType(allActivity.ZHONG_QIU_JIE_YONGZHOU) && popup )
                            {
                                var layer = new ZhongQiuJie_layer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            }
                            else
                            {
                                if (callback)
                                {
                                    callback();
                                }
                            }
                        };

                        // 新手礼包
                        var popXinShouLiBaoLayer = function(callback) {
                            var popup = isPopView(allActivity.XIN_SHOU_LI_BAO);
                            var isOpen = false;
                            var _timeStr = MjClient.dateFormat(new Date(parseInt(MjClient.data.pinfo.createTime)), 'yyyy-MM-dd');
                            cc.log(" ======222  出生日期 ", _timeStr);
                            var time_1 = Date.parse(_timeStr);
                            // cc.log(" ====== time_1 ",time_1);
                            var _timeStr = MjClient.dateFormat(new Date(parseInt(MjClient.data.serverTime)), 'yyyy-MM-dd');
                            cc.log(" ======2222  服务器时间 ", _timeStr);
                            var _timeStr = MjClient.dateFormat(new Date(parseInt(time_1 + 6 * 86400000)), 'yyyy-MM-dd');
                            cc.log(" ======222 活动寄截止时间 ", _timeStr);


                            if (time_1 + 6 * 86400000 > MjClient.data.serverTime && MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.XIN_SHOU_LI_BAO)) {
                                isOpen = true;
                            } else {
                                isOpen = false;
                            }
                            cc.log(" ====== popup", popup, "  --- isOpen", isOpen);
                            if (MjClient.isOpentFunctionType(allActivity.XIN_SHOU_LI_BAO) && popup && isOpen) {
                                var layer = new NewPlayerPrizeLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };



                        // 圣诞节活动 元旦活动
                        var popChristmasLayer = function(callback) {
                            var popup = isPopView(allActivity.ZA_JIN_DAN);
                            if (MjClient.isOpentFunctionType(allActivity.ZA_JIN_DAN) && !MjClient.isShenhe && popup) {
                                var layer = new NewYearLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        // 淮安新手活动
                        var popNewPlayerLayer = function(callback) {
                            var lastAtToday = isLastAtToday();
                            if ((!MjClient.data.pinfo.lastLoginTime || cc.isUndefined(MjClient.data.pinfo.lastLoginTime)) && !lastAtToday && MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ) {
                                var layer = new newPlayerLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //新玩家第一次弹绑定电话
                        var popBindPhoneLayer = function(callback) {
                            var pinfo = MjClient.data.pinfo;

                            if (isOldPlayer() && !pinfo.mobileNum) {
                                var layer = new bindPhoneNumNewLayer("autoPop");
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //新玩家第一次弹实名认证
                        var popSMRZLayer = function(callback) {
                            //每周 弹出一次
                            var lastAtWeekend = isLastAtWeekend();
                            if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP 
                            ||MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP){
                                if(MjClient.systemConfig.verifiedOpen) lastAtWeekend = true;
                            }
                            // 已经注册是不弹这个 特别重要 可能导致 上面四个地区 炸锅
                            if(MjClient.data.pinfo.identityNum){
                                lastAtWeekend = false;
                            }

                            if ((!MjClient.data.pinfo.lastLoginTime || cc.isUndefined(MjClient.data.pinfo.lastLoginTime)) || lastAtWeekend) {
                                var layer = new shiMingRenZhengLayer("autoPop");
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };


                        //邀请红包
                        var yaoQingHBLayer = function(callback) {
                            var popup = isPopView(allActivity.YAO_QING_HONG_BAO);

                            if (MjClient.isOpentFunctionType(allActivity.YAO_QING_HONG_BAO) && popup) {
                                var layer;
                                if (MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP)                                    
                                    layer = new YaoQingHaoBao_layer();
                                else
                                    layer = new YaoQingHaoBaoNT_layer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //新手引导
                        var popGuidLayer = function(callback) {
                            //if (MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ
                            //    &&(!MjClient.data.pinfo.lastLoginTime || cc.isUndefined(MjClient.data.pinfo.lastLoginTime) ||
                            //    !util.localStorageEncrypt.getBoolItem("SHOW_GUIDLAYER", false)) )
                            //{
                            //    var layer = new guidLayer();
                            //    MjClient.Scene.addChild(layer);
                            //    util.localStorageEncrypt.setBoolItem("SHOW_GUIDLAYER", true);
                            //
                            //    var oldScale = layer.getScale();
                            //    layer.setScale(0);
                            //    layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                            //    layer.setCloseCallback(callback);
                            //}
                            //else
                            {
                                if (callback) {
                                    callback();
                                }
                            }
                        };


                        //绑定邀请码
                        var popBindingCodeLayer = function(callback) {
                            var lastAtToday = isLastAtToday();
                            if (MjClient.data.pinfo.downloadFrom && parseInt(MjClient.data.pinfo.downloadFrom) > 0 && !MjClient.data.pinfo.memberId && !lastAtToday) {
                                var layer = new autoBindingCodeLayer_tips(parseInt(MjClient.data.pinfo.downloadFrom));
                                MjClient.Scene.addChild(layer);

                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };


                        //每日任务
                        var meiRiRenWuLayer = function(callback) {
                            var popup = isPopView(allActivity.MEI_RI_REN_WU);

                            if (MjClient.isOpentFunctionType(allActivity.MEI_RI_REN_WU) && popup) {
                                var layer = new activeDailyTaskLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //新亲友圈对战
                        var friendsPKNEWLayer = function(callback) {
                            var popup = isPopView(allActivity.FRIENDS_PK_NEW);

                            if (MjClient.isOpentFunctionType(allActivity.FRIENDS_PK_NEW) && popup) {
                                var layer = new friendsPKNewLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //春节抽签
                        var chunJieChouQianLayer = function(callback) {
                            var popup = isPopView(allActivity.CHUN_JIE_CHOU_QIAN);

                            if (MjClient.isOpentFunctionType(allActivity.CHUN_JIE_CHOU_QIAN) && popup) {
                                var layer = new chunjiechouqianLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };


                        //传奇来了
                        var ChuanQiLaiLeLayer = function(callback) {
                            var popup = isPopView(allActivity.CHUAN_QI_LAI_LE);
                            cc.log("wxd===========ChuanQiLaiLeLayer")
                            if (MjClient.isOpentFunctionType(allActivity.CHUAN_QI_LAI_LE) && popup) {
                                var layer = new ChuanQiLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };


                        //清明节放风筝活动
                        var FlyAKiteLayer = function(callback) {
                            var popup = isPopView(allActivity.FLY_A_KITE);
                            cc.log("wxd===========FlyAKiteLayer");
                            if (MjClient.isOpentFunctionType(allActivity.FLY_A_KITE) && popup) {
                                var layer = new flyAKiteLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //五一集春豆活动
                        var CollectSpringBeanLayer = function(callback) {
                            var popup = isPopView(allActivity.COLLECT_SPRING_BEAN);
                            cc.log("wxd===========CollectSpringBeanLayer");
                            if (MjClient.isOpentFunctionType(allActivity.COLLECT_SPRING_BEAN) && popup) {
                                var layer = new collectSpringBeanLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };


                        //场次增长活动
                        var MonthGrowthLayer = function(callback) {
                            var popup = isPopView(allActivity.ACTIVITY_CLUB_MONTH);
                            cc.log("wxd===========CollectSpringBeanLayer");
                            if (MjClient.isOpentFunctionType(allActivity.ACTIVITY_CLUB_MONTH) && popup) {
                                var layer = new Active_growthLayer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //亲友圈元宝消耗活动(新版)
                        var popClubCostLayer = function(callback) {
                            var popup = isPopView(allActivity.CLUB_COST_ACTIVITY);

                            if (MjClient.isOpentFunctionType(allActivity.CLUB_COST_ACTIVITY) && popup) {
                                var layer;
                                layer = new ClubCost_Layer();

                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //双11活动
                        var popDouble11Layer = function(callback) {
                            var popup = isPopView(allActivity.ACTIVITY_DOUBLE_11);

                            if (MjClient.isOpentFunctionType(allActivity.ACTIVITY_DOUBLE_11) && popup) {
                                var layer = new Active_double11_Layer();
                                MjClient.Scene.addChild(layer);
                                var oldScale = layer.getScale();
                                layer.setScale(0);
                                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                                layer.setCloseCallback(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };

                        //if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP)
                        //{
                        //   //依次弹出
                        //   popBindingCodeLayer.bind(this, popGuidLayer.bind(this, popAdvLayer.bind(this, popActivityLayer)))();
                        //}
                        //else
                        //{
                        //   var lastDate = util.localStorageEncrypt.getNumberItem("lastDate", 0);
                        //   var nowDate = new Date();
                        //   var iNowDate = (((nowDate.getYear() + 1900)*10000) + ((nowDate.getMonth() + 1)*100) + nowDate.getDate());
                        //   cc.log("最后一次登录日期：" + iNowDate);
                        //   if (iNowDate != lastDate)
                        //   {
                        //       util.localStorageEncrypt.setNumberItem("lastDate", iNowDate);
                        //
                        //       popBindingCodeLayer.bind(this, popGuidLayer.bind(this, popAdvLayer.bind(this, popActivityLayer.bind(this, popChristmasLayer))))();
                        //   }
                        //   else
                        //   {
                        //       popBindingCodeLayer();
                        //   }
                        //}

                        ChuanQiLaiLeLayer.bind(this, popBindingCodeLayer.bind(this, popGuidLayer.bind(this, popAdvLayer.bind(this,
                            chunJieChouQianLayer.bind(this,popDouble11Layer.bind(this, popClubCostLayer.bind(this, MonthGrowthLayer.bind(this,
                                popLCBXZSLayer.bind(this,FlyAKiteLayer.bind(this,
                                    popActivityLayer.bind(this, popShareLayer.bind(this, popNewPlayerLayer.bind(this, popZhuaWaWaLayer.bind(this,
                                        popJiaYouRedPacketLayer.bind(this, popChongZhiLayer.bind(this, popLuckyLayer.bind(this, popQiandaoLayer.bind(this,
                                            popChristmasLayer.bind(this, yaoQingHBLayer.bind(this, popXinShouLiBaoLayer.bind(this, popFriendsPKLayer.bind(this,
                                                popQiandaoChoujiangLayer.bind(this, popBindPhoneLayer.bind(this, popSMRZLayer.bind(this, popRankLayer.bind(this,
                                                    popLCBXLayer.bind(this, popZhongQiuJie88YuanLayer.bind(this, popZhongQiuJieRankLayer.bind(this, meiRiRenWuLayer.bind(this,
                                                        popAdvShowLayer.bind(this, CollectSpringBeanLayer))))))
                                                )))
                                            )))
                                        )))
                                    )))
                            )))))))))
                        ))))();


                    }
                } else {
                    postEvent("updateInfo");
                }


                if (MjClient.FriendCard_main_ui && cc.sys.isObjectValid(MjClient.FriendCard_main_ui)) {
                    MjClient.FriendCard_main_ui.requestClubList();
                }

                if (rtn.matchTable > 0) {
                    MjClient.joinMatchTable(rtn.matchTable);
                } else if (rtn.vipTable > 0) {
                    delete MjClient._LAST_FIELD;
                    MjClient.UpdateResourceClassViewCallback = true;
                    MjClient.joinGame(rtn.vipTable);
                } else if (rtn.matchOngoing) {
                    MjClient.joinMatchTable(0, function(ret) {
                        if (ret.code) {
                            MjClient.showToast(ret.message);
                        } else {
                            MjClient.Scene.addChild(new roundEndLayer(1));
                        }
                    });
                } else if (rtn.matchs && Object.keys(rtn.matchs).length > 0) {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.matchSignUp", { matchId: rtn.matchs[(Object.keys(rtn.matchs))[0]].id }, function(rtn) {
                        MjClient.unblock();
                        if (rtn.code) {
                            MjClient.showToast(rtn.message);
                        } else {
                            //报名成功
                            cc.log("wxd..........重连报名成功" + JSON.stringify(rtn));
                            MjClient.Scene.addChild(new gameWaitingLayer(rtn.match));
                        }
                    });
                    //MjClient.Scene.addChild(new gameWaitingLayer(rtn.matchs[(Object.keys(rtn.matchs))[0]]));
                } else {
                    if (MjClient.rePlayVideo == -1) {
                        //MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});//这里发这个请求有什么鸟用？
                        delete MjClient.data.sData;
                        delete MjClient.gameType;
                        postEvent("LeaveGame");
                    }
                }
                if(MjClient.loginToGoldField && !MjClient.atGoldField){
                    MjClient.loginToGoldField = false;
                    goldField_start();
                }
            },
            logout: function() {
                this.addChild(createLoginView());
            },
            createRoom: function(data) {
                cc.log("creat room layer --- by sking YYYYYYYYY ");

                var callbackFunc = function(){
                    //为了体验流畅，下次打开新配置才生效
                    if (isJinZhongAPPType() ||
                        MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.LYSICHUANMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                        MjClient.Scene.addChild(new CreateView2(data));
                    } else if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
                    {
                        MjClient.Scene.addChild(new CreateViewNew(data));
                    } else {
                        MjClient.Scene.addChild(new CreateView(data));
                    }

                    if (!data.IsFriendCard) {
                        MjClient.gamenet.request("pkplayer.handler.getRoomConfig", {
                                appid: "js3mj"
                            },
                            function(rtn) {
                                if (rtn.code == 0) {
                                    //MjClient.data.gameInfo.js3mj = rtn.data.gameInfo.js3mj;
                                    MjClient.data.gamePrice = rtn.data.gamePrice;
                                }
                            });
                    }
                }
                if(data && data.clubType == 1){
                    FriendCard_Common.getRoomCardFreeConfig(callbackFunc);
                }else{
                    callbackFunc();
                }
                
            },
            field_reconnection:function (data) {
                if (typeof(goldField_start) != "undefined") {
                    goldField_start();
                    return;
                }

                MjClient.block();
                MjClient.GoldFieldInto(function (code) {
                    MjClient.unblock();
                    if(code == 0){
                        if(!cc.sys.isObjectValid(MjClient.goldHallLayer)){
                            if(cc.sys.isObjectValid(MjClient.homeui) && MjClient.homeui.doHideAction){
                                MjClient.homeui.doHideAction();
                            }else{
                                var goldHallLayer = new GoldHallLayer(1);
                                MjClient.goldHallLayer = goldHallLayer;
                                MjClient.Scene.addChild(goldHallLayer,-1);
                            }
                        }
                    }
                });

            },
            initSceneData: function(data) {
                MjClient.unblock();
            },
            WX_SHARE_SUCCESS: function(data) //分享成功的回调
            {
                cc.log("WX_SHARE_SUCCESS:" + JSON.stringify(data));
                cc.log("WX_SHARE_SUCCESS:" + data.errCode);
                cc.log("WX_SHARE_SUCCESS:" + parseInt(data.errCode));
                if (parseInt(data.errCode) == 0 && MjClient.wxShareImageToPYQ == true) {
                    var _shareType = MjClient.shareType;

                    MjClient.gamenet.request("pkplayer.handler.wxShare", {
                            uid: SelfUid(),
                            key: _shareType,
                        },
                        function(rtn) {
                        cc.log("pkplayer.handler.wxShare ----------- " + JSON.stringify(rtn));
                        if (rtn.code == 0 && rtn.data) {
                            var _type = null;
                            var _number = null;
                            let data = {}
                            data.award = rtn.data
                            if (rtn.data.redPacket > 0) {
                                //分享得红包
                                _type = 2;
                                _number = rtn.data.redPacket;
                            } else if (rtn.data.money > 0) {
                                //分享得元宝
                                _type = 1;
                                _number = rtn.data.money;
                            } else if (rtn.data.integral > 0) {
                                //分享得礼券
                                _type = 3;
                                _number = rtn.data.integral;
                            } else if (rtn.data.gold > 0) {
                                //分享得金币
                                _type = 4;
                                _number = rtn.data.gold;
                            }
                            data.award.redpacket = rtn.data.redPacket //命名大小写不一样，重新赋值一次
                            MjClient.Scene.addChild(new luckyBack_QiandaoLayer(data));


                            } else {
                                MjClient.showToast(rtn.message);
                            }
                        });

                }
                MjClient.wxShareImageToPYQ = false;
            },
            appPayFinished: function(jsonString) //前端支付完成的回调
                {
                    var json = jsonString;
                    if (cc.isString(jsonString)) {
                        json = JSON.parse(jsonString);
                    }
                    var result = parseInt(json.result);
                    var msg = "";
                    if (json.msg) {
                        msg = "" + json.msg;
                        msg = decodeURI(msg);
                    }
                    var str = "";
                    if (result == 0) {
                        str = "支付成功.";
                    } else if (result == 1) {
                        str = "取消支付." + msg;
                    } else {
                        str = "支付失败." + msg;
                    }
                    MjClient.showToastDelay(str);



                    if (json.platform == PayPlatformType.APPLE) {
                        var data = {
                            orderId: json.orderId,
                            result: result,
                            transactionReceipt: json.transactionReceipt
                        };
                        MjClient.gamenet.request("pkplayer.handler.applePayNotify", data,
                            function(rtn) {
                                cc.log("pkplayer.handler.applePayNotify ----------- " + JSON.stringify(rtn));
                            });
                    }
                },
            //QueueNetMsg: function(ed) {
            //    var oldLen = MjClient.NetMsgQueue.length;
            //    var eventName = ed[0];
            //    if (eventName == "mjhand" && ed.length == 2) {
            //        MjClient.NetMsgQueue.push(["moveHead", {}]);
            //    }
            //    // 汨罗红中 修改碰牌显示多牌的问题 现在汨罗红中测试 修复情况
            //    if (MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG ||
            //        MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_MJ ||
            //        MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_BAI_DA) {
            //        if (this.canPushQueueNet(eventName)) MjClient.NetMsgQueue.push(ed);
            //    } else {
            //        MjClient.NetMsgQueue.push(ed);
            //    }
            //    if (MjClient.getAppType() != MjClient.APP_TYPE.QXXZMJ
            //    && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP
            //    )//使用新的事件循环机制
            //    {
            //        if (oldLen == 0) this.startQueueNetMsg();
            //    }
            //}
        }
    },
    isQueueNetHadEvent: function(eventName) {
        for (var i in MjClient.NetMsgQueue) {
            var tempEd = MjClient.NetMsgQueue[i];
            if (tempEd[0] == eventName) {
                return true;
            }
        }
        return false;
    },
    canPushQueueNet: function(eventName) {
        var initSceneFilt = {
            'MJPeng': true,
            'MJChi': true,
            'MJGang': true
        }

        // 等待执行 initSceneData 的时候， 不需要执行 initSceneFilt 中的事件
        if (this.isQueueNetHadEvent('initSceneData') && initSceneFilt[eventName]) {
            return false;
        }

        return true;
    },
    //startQueueNetMsg: function() {
    //    var sce = this;
    //    // cc.log("startQueueNetMsg...", JSON.stringify(d));
    //    cc.log("create sence ----------by sking");
    //    if (MjClient.NetMsgQueue.length > 0) {
    //        var ed = MjClient.NetMsgQueue[0];
    //        var dh = MjClient.netCallBack[ed[0]];
    //        var dt = dh[0];
    //
    //        // 修正比赛场从后台切回来后报各种错的bug
    //        try {
    //            var tData = MjClient.data.sData.tData;
    //            var selfIndex = tData.uids.indexOf(SelfUid());
    //
    //            if (MjClient.isJustComeBack && tData.matchId) {
    //                var len = MjClient.NetMsgQueue.length;
    //                var hasRoundEnd = false;
    //                var count = len;
    //                for (var i = 0; i < len; i++) {
    //                    var str = MjClient.NetMsgQueue[i][0];
    //                    if (str == "MJTick") {
    //                        count -= 1;
    //                    } else if (str == "roundEnd") {
    //                        hasRoundEnd = true;
    //                    }
    //                }
    //
    //                if (count > 10 || hasRoundEnd) {
    //                    MjClient.isJustComeBack = false;
    //                    MjClient.NetMsgQueue = [];
    //                    pomelo.disconnect();
    //                    return;
    //                }
    //            }
    //        } catch (e) {}
    //
    //        // 汨罗红字 延迟处理（麻将 字牌公用MJPut）
    //        try {
    //            if ((MjClient.data.sData.tData.gameType == MjClient.XIANG_YIN_ZHUO_HONG_ZI ||
    //                    MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.ML_HONG_ZI ||
    //                    MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI ||
    //                    MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
    //                    MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
    //                    MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI ||
    //                    MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
    //                    MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
    //                    MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI) &&
    //                (ed[0] == "MJPut" || ed[0] == "HZNewCard")) {
    //
    //                var type = ziPai.getSuDuType();
    //                if(MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI ||
    //                    MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
    //                    MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
    //                    MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
    //                    MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI){
    //                    dt = [0.9, 0.7, 1.1][type];
    //                }else{
    //                    if (type == 0) {
    //                        dt = 0.7;
    //                    } else {
    //                        dt = 0.3;
    //                    }
    //                }
    //            }
    //            /*if(MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI && ed[0] == "HZLiuCard"){
    //                dt = 0.5;
    //            }*/
    //            //安化跑胡子有洗牌特效要展示
    //            if(MjClient.rePlayVideo == -1 &&
    //                MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI  ||
    //                MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
    //                MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
    //                MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI){
    //                if(ed[0] == "mjhand"){
    //                    dt = 4;
    //                    if(MjClient.data.sData.tData.areaSelectMode.isManualCutCard){
    //                        dt = 2;
    //                    }
    //                }
    //            }
    //
    //            if(MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU && (ed[0] == "HZNewCard" || ed[0] == "newCard") ){
    //                //海底延迟
    //
    //                var next = MjClient.majiang.getAllCardsTotal() - MjClient.data.sData.tData.cardNext;
    //                if((next - MjClient.data.sData.tData.maxPlayer) < 0 ){
    //                    dt = 1;
    //                }
    //            }
    //
    //        } catch (e) {
    //
    //        }
    //
    //        // 跑得快取消头像移动，因此延迟时间要短
    //        if (ed[0] == "moveHead" && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
    //            dt = 0.1;
    //
    //        var handleData = dh[1](ed[1]);
    //        sce.runAction(cc.sequence(
    //            cc.delayTime(0.0001),
    //            cc.callFunc(function() {
    //                if (handleData != -1) postEvent(ed[0], ed[1]);
    //            }),
    //            cc.delayTime(dt),
    //            cc.callFunc(function() {
    //                MjClient.NetMsgQueue.splice(0, 1);
    //                if (MjClient.NetMsgQueue.length > 0) sce.startQueueNetMsg();
    //            })
    //        ));
    //    }
    //},
    pushQueueNetMsg: function(ed) {//使用新的事件循环机制
        var eventName = ed[0];
        if (eventName == "mjhand" && ed.length == 2) {
            MjClient.NetMsgQueue.push(["moveHead", {}]);
        }
        // 汨罗红中 修改碰牌显示多牌的问题 现在汨罗红中测试 修复情况
        if (MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU ||
            MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_BAI_DA) {
            if (this.canPushQueueNet(eventName)) MjClient.NetMsgQueue.push(ed);
        } else {
            MjClient.NetMsgQueue.push(ed);
        }
    },
    update: function(dt) {
        this._downAndPlayVoiceMessageQueueRemainTime = this._downAndPlayVoiceMessageQueueRemainTime || 0;
        this._downAndPlayVoiceMessageQueueRemainTime -= dt;
        if (this._downAndPlayVoiceMessageQueueRemainTime <= 0) {
            this._downAndPlayVoiceMessageQueueRemainTime = 0;
            MjClient.downAndPlayVoiceMessageQueue = MjClient.downAndPlayVoiceMessageQueue || [];
            if (MjClient.downAndPlayVoiceMessageQueue.length > 0) {
                var msg = MjClient.downAndPlayVoiceMessageQueue[0];
                msg.num = msg.num || 1; //录音时长
                this._downAndPlayVoiceMessageQueueRemainTime = parseInt(msg.num) / 1000 + 1.5;
                postEvent("downAndPlayVoice", msg);
                MjClient.downAndPlayVoiceMessageQueue.splice(0, 1);
            }
        }


        //configuration.json中的通知循环弹出
        if (MjClient.updateCfg &&
            MjClient.dateInRectDate(MjClient.getCurrentTime(), formatData(MjClient.updateCfg.restartTipBegin), formatData(MjClient.updateCfg.restartTipEnd))) {
            this._restartTipTime = this._restartTipTime || 0;
            this._restartTipTime -= dt;

            if (this._restartTipTime < 0) {
                var changeValue = {};
                changeValue.severRestart = MjClient.updateCfg.severRestart;
                postEvent("cfgUpdate", changeValue);
                this._restartTipTime = Number(MjClient.updateCfg.restartTipInterval);
            }
        }


        //使用新的事件循环机制
        this._netMsgQueueRemainTime = this._netMsgQueueRemainTime || 0;
        this._netMsgQueueRemainTime -= dt;
        if (this._netMsgQueueRemainTime <= 0)
        {
            this._netMsgQueueRemainTime = 0;

            // 修正比赛场从后台切回来后报各种错的bug
            try
            {
                var isXing = false;
                if (MjClient.data && MjClient.data.sData && MjClient.data.sData.tData) {
                    var tData = MjClient.data.sData.tData;
                    var selfIndex = tData.uids.indexOf(SelfUid());
                    if(selfIndex == tData.xingPlayer){
                        isXing = true;
                    }
                }

                if (MjClient.isJustComeBack &&
                    MjClient.data &&
                    MjClient.data.sData &&
                    MjClient.data.sData.tData &&
                    (MjClient.data.sData.tData.matchId || isXing))
                {
                    var len = MjClient.NetMsgQueue.length;
                    var hasRoundEnd = false;
                    var count = len;
                    for (var i = 0; i < len; i++) {
                        var str = MjClient.NetMsgQueue[i][0];
                        if (str == "MJTick") {
                            count -= 1;
                        } else if (str == "roundEnd") {
                            hasRoundEnd = true;
                        }
                    }

                    if (count > 10 || hasRoundEnd) {
                        MjClient.isJustComeBack = false;
                        MjClient.NetMsgQueue = [];
                        pomelo.disconnect();
                    }
                }
            } catch (e) {}

            if (MjClient.NetMsgQueue.length > 0)
            {
                var ed = MjClient.NetMsgQueue[0];
                var dh = MjClient.netCallBack[ed[0]];
                var delay = dh[0];
                if (MjClient.rePlayVideo != -1) { //回放时不延时
                    delay = 0;
                }
                // 汨罗红字 延迟处理（麻将 字牌公用MJPut）
                try {

                    //原永州项目mjput命令默认的时间
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||  MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        (MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO || MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z ))
                    {
                        if (ed[0] == "MJPut"){
                            delay = 0.7;
                        }
                        if (ed[0] == "MJHu"){
                            delay = 1.5;
                        }
                        if (ed[0] == "HZWeiCard" || ed[0] == "HZChiCard" ||ed[0] == "MJPeng" || ed[0] == "HZWangChuang"){
                            delay = 0.8;
                        }
                    }

                    if ((MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.ML_HONG_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI  ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI || 
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU || 
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG  || 
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ  || 
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XIANG_XI_2710 ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING || 
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.DA_YE_ZI_PAI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.EN_SHI_SHAO_HU) &&
                        (ed[0] == "MJPut" || ed[0] == "HZNewCard")) 
                    {

                        var type = ziPai.getSuDuType();
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP &&
                            (   MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ ||
                                MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG ||
                                MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA)) 
                        {
                            delay = [0.9, 1, 0.7, 0.3][getSuDuType_leiYang()];
                        }
                        else if(MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI)
                        {
                            delay = 1;
                        }
                        else if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP && (
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI))
                        {
                            delay = 0.9;
                        }
                        else if(MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI  ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI || 
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU || 
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || 
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ  || 
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XIANG_XI_2710 ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE || 
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.DA_YE_ZI_PAI){
                            delay = [0.9, 0.7, 1.1, 0.3][type];
                        }
                        else if((MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.SHI_MEN_HU_ZI ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI ||
                            MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI) && MjClient.rePlayVideo == -1){
                            delay = [0.9, 0.7, 1.1, 0.3][type];
                        }
                        else{
                            if (type == 0) {
                                delay = 0.7;
                            } else {
                                delay = 0.3;
                            }
                            if (MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
                                MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
                                if (type == 0) {
                                    delay = 0.3;
                                } else {
                                    delay = 0.7;
                                }
                            }
                            if(MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING ||
                                MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN ||
                                MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI ||
                                MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI ||
                                MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI){
                                delay = 0.7;
                            }
                        }
                        cc.log("delay = " + delay);
                    }

                    if ((MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.LEI_YANG_GMJ ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.JIANG_HUA_MJ ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.TY_HONGZHONG ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XIN_NING_MA_JIANG) && ed[0] == "MJPut") 
                    {
                        delay = 0;
                    }

                    // 打筒子PKPass
                    if (MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG && (ed[0] == "waitPut")){
                        delay = 0.6;
                    }
                    if (MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA && (ed[0] == "PKPut") && MjClient.majiang.isTianZha(MjClient.data.sData.tData.lastPutCard)){
                        delay = 1.0;
                    }
                    if(ed[0] == "HZPickCard" && ( MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)){
                        delay = 0.8;
                    }

                    if(( MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP) &&
                        (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI) && (ed[0] == "MJPut" || ed[0] == "HZNewCard"))
                    {
                        delay = ziPai.getAutoPassTime();
                        if(MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP){
                            delay = getCurrentCardSpeed();
                        }
                    }

                    //湘乡告胡子/娄底放炮罚庄家亮张的牌需要完成动画
                    if((MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI  ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA     ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA  ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA  ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI  ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO) &&
                        ed[0] == "HZNewCard" && MjClient.data.sData.tData.isLastDraw)
                    {
                        delay = 1.2;
                    }else if((MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA    ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI) &&
                        ed[0] == "HZNewCard" && MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
                        delay = ziPai.getAutoPassTime();
                    }

                    //安化跑胡子有洗牌特效要展示
                    if(MjClient.rePlayVideo == -1 &&
                        (MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI  ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI || 
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU || 
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || 
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ  || 
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.ML_HONG_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XIANG_XI_2710 ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE || 
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.DA_YE_ZI_PAI))
                    {
                        if(ed[0] == "mjhand"){
                            delay = 4;
                            //剥皮小结算洗牌特殊情况
                            if(MjClient.playui && MjClient.playui.getMjhandDelay) {
                                delay = MjClient.playui.getMjhandDelay();
                            }
                            else if(MjClient.data.sData.tData.areaSelectMode.isManualCutCard){
                                delay = 2;
                            }else if(MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU){
                                delay = 0;
                            }
                        }
                    //永州扯胡子(邵阳)有洗牌特效要展示
                    }else if(MjClient.rePlayVideo == -1 && (MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.PAO_HU_ZI
                        || MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King
                        || MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER
                        || MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King
                        || MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR
                        || MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King
                        || MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.LUO_DI_SAO)){
                        if(MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType()){
                            if(ed[0] == "mjhand"){
                                delay = 4;
                                if(MjClient.playui && MjClient.playui.getMjhandDelay) {
                                    delay = MjClient.playui.getMjhandDelay();
                                } else if(MjClient.data.sData.tData.areaSelectMode.isManualCutCard){
                                    delay = 2;
                                }
                            }
                        }
                    }

                    //打炸弹
                    if((MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN || 
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG) && 
                        (ed[0] == "mjhand" || ed[0] == "roundEnd")) {
                         delay = 2.5;
                    }

                    if(MjClient.rePlayVideo == -1 && MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP &&
                        MjClient.data.sData.tData.areaSelectMode.isManualCutCard == 0 && ed[0] == "mjhand" &&
                        (MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA))
                    {
                        delay = 2;
                    }

                    //安化麻将掷骰子延迟
                    if(MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG ||
                        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG){
                        if(ed[0] == "MJZhiTouZi"){
                            delay = 3;
                        }
                    }

                    if(MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG){
                        if(ed[0] == "MJZhiTouZi"){
                            delay = 1;
                        }
                    }

                    if(MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU 
                        && (ed[0] == "HZNewCard" || ed[0] == "newCard") ){
                        //海底延迟

                        var next = MjClient.majiang.getAllCardsTotal() - MjClient.data.sData.tData.cardNext;
                        if((next - MjClient.data.sData.tData.maxPlayer) < 0 ){
                            delay = 1;
                        }

                    }
                    if(MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG 
                        && ed[0] == "PickHaiDiCard"){
                            delay = 0.5;
                    }

                    //湘西96扑克延迟
                    if(MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER) {
                        var type = ziPai.getSuDuType();
                        if(ed[0] == 'HZNewCard' || ed[0] == 'MJPut') {
                            delay = [1, 1.2, 1.6, 0.4][type];
                        }
                        else if(ed[0] == 'HZTieCard' || ed[0] == 'HZChiCard' || ed[0] == 'HZWeiCard' ||
                            ed[0] == 'MJPeng' || ed[0] == 'HZGangCard' || ed[0] == 'MJHu') {
                            delay = 0.5
                        }
                    }

                    if(ed[0] == "MJHu" && (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ
                        || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG)
                        && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI){
                        delay = 0.5;
                    }

                    if (ed[0] == "MJHu" && (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ
                        || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG)
                        && (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || 
                            MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)) {
                        delay = 0.5;
                    }
                } catch (e) {}

                //邵阳剥皮 发牌吃牌动画调整
                try{
                    if (MjClient.playui.getSendCardInterval && MjClient.data.sData.tData.areaSelectMode.faPai != undefined) {
                        //出牌没有落牌 扣除落牌时间
                        if ("MJPut" == ed[0]) { 
                            delay = MjClient.playui.getSendCardInterval() * 0.5;
                        }else if ("HZNewCard" == ed[0]) {
                            delay = MjClient.playui.getSendCardInterval();
                        }else if ("HZGangCard" == ed[0]) {
                            delay = 0.65;//最慢动画时间总长0.65
                        }
                    }
                }catch(e){}

                // 跑得快取消头像移动，因此延迟时间要短
                if (ed[0] == "moveHead" && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
                    delay = 0.1;

                //阳新麻将发倒数最后的牌时，如果玩家不能胡，直接给下家发牌，需要延时处理下个消息，玩家自己将牌加入到手牌中并显示出来
                if(MjClient.GAME_TYPE.YANG_XIN_MA_JIANG == MjClient.gameType && MjClient.APP_TYPE.HUBEIMJ == MjClient.getAppType() && ed[0] == "waitPut"){
                    var tData = MjClient.data.sData.tData;
                    var maxPlayer = tData.maxPlayer;
                    var currPlayer = MjClient.data.sData.players[tData.uids[ed[1].curPlayer]];
                    if(ed[0] == "waitPut" && (MjClient.majiang.getAllCardsTotal(tData) - 14 - maxPlayer) < (ed[1].cardNext) && (currPlayer.eatFlag & 8) == 0){
                        delay = 1;
                    }
                }

                //蕲春红中杠麻将发倒数最后的牌时，如果玩家不能胡，直接给下家发牌，需要延时处理下个消息，玩家自己将牌加入到手牌中并显示出来
                if(MjClient.GAME_TYPE.QI_CHUN_HONG_ZHONG_GANG == MjClient.gameType && MjClient.APP_TYPE.HUBEIMJ == MjClient.getAppType() && ed[0] == "waitPut"){
                    var tData = MjClient.data.sData.tData;
                    var maxPlayer = tData.maxPlayer;
                    var currPlayer = MjClient.data.sData.players[tData.uids[ed[1].curPlayer]];
                    if(ed[0] == "waitPut" && (MjClient.majiang.getAllCardsTotal(tData) - 10 - maxPlayer) < (ed[1].cardNext) && (currPlayer.eatFlag & 8) == 0){
                        delay = 1;
                    }
                }
                if(MjClient.gameType == MjClient.GAME_TYPE.EN_SHI_SHAO_HU) {
                    if(ed[0] == 'HZLiuCard') {
                        delay = 0.5;
                    }
                }

                if(MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO) {
                    if(ed[0] == 'PKPass') {
                        delay = 0.5;
                    }
                }
                
                if (ed[0] == "newCard" && MjClient.MJPutCache) {
                    MjClient.netCallBack.MJPut[1](MjClient.MJPutCache);
                    postEvent("MJPut", MjClient.MJPutCache);
                    delete MjClient.MJPutCache;
                }
                else if (ed[0] == "MJPut" && ed[1].nextUid == SelfUid()) {
                    MjClient.MJPutCache = ed[1];
                    MjClient.NetMsgQueue.splice(0, 1);
                }
                else {
                    var handleData = dh[1](ed[1]);
                    cc.log("============postEvent=====", ed[0]);
                    if (handleData != -1) postEvent(ed[0], ed[1]);
                    this._netMsgQueueRemainTime = delay;
                    MjClient.NetMsgQueue.splice(0, 1);
                }

               
            }
        }

    },
    ctor: function() {
        this._super();
        this.isNewCreate = true;
        cc.log("scene init");
    },
    onEnter: function() {
        //只创建了一次场景
        // cc.log("create sence -----22-----by sking");
        this._super();

        if (!this.isNewCreate) {
            if(MjClient.loginToGoldField){
                MjClient.Scene.stopActionByTag(20190319);
                MjClient.logoutCallbackFunc();
            }
            return;
        }
        this.isNewCreate = false;

        setMusicVolume(-1);
        BindUiAndLogic(this, this.jsBind);
        //this.addChild(new BlockView());
        this.addChild(new UpdateView());
        if (MjClient.isShenhe)
            this.addChild(new startLayer(), 9999999);

        /*
        var text = new ccui.Text();
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) { //岳阳同一使用方正兰亭
            text.setFontName("fonts/lanting.TTF");
        } else {
            text.setFontName("fonts/fzcy.ttf");
        }
        text.setFontSize(20);
        text.setAnchorPoint(1, 1);
        text.setPosition(cc.winSize.width - 60, cc.winSize.height);
        text.setString("v" + MjClient.native.GetVersionName() + "(" + MjClient.resVersion + ")");
        text.schedule(function() {
            text.setString("v" + MjClient.native.GetVersionName() + "(" + MjClient.resVersion + ")");
        }, 1);
        this.addChild(text, 9999999);
        if (MjClient.isShenhe == true) {
            text.setVisible(false);
        }
        */
        this.scheduleUpdate();
    }
});


