
GameCnDescDefault = {
    maxPlayer: function(v, areaSelectMode) {
        if (areaSelectMode.convertible)
            return "自由人数";
        else
            return v ? v + "人场" : "";
    },
    jieSuanDiFen: function(v) {return v > 0 ? "积分底分" + v : "";},
    difen: function(v) {return v > 0 ? "积分底分" + v : "";},
    baseScore: function(v) {return v + "分";},
    deckNum: function(v) {return v + "副牌";},
    scoreLine: function(v) {return v + "分结算";},
    isShowLeft: function(v) {return v ? "显示手牌张数" : "";},
    isDivideTeam: function(v, areaSelectMode) {   
        if(areaSelectMode.isRandomTeam){
            return "随机分组";
        }else if(areaSelectMode.isDivideTeam){
            return "分组";
        }
        return "";
    },
    hasJoker: function(v) {return v ? "带双王" : "";},
    addJoker: function(v) {return v ? "加双王" : "";},
    noJoker: function(v) {return v ? "不要王" : "";},
    hasWings: function(v) {return v ? "可带牌" : "";},
    lastRoundScore: function(v) {return v > 0 ? "终局奖励" + v + "分" : "无终局奖励";},
    isReCall: function(v) {return v ? "显示记牌器" : "";},
    isRandom: function(v) {return v ? "随机出头" : "";},
    haveKingTz: function(v) {return v ? "有王筒子" : "";},
    isBiChu: function(v) {return v ? "有牌必打" : "";},
    isHongheidian: function(v) {return v ? "红黑点" : "";},
    isTianDiHu: function(v) {return v ? "天地胡" : "";},
    flowerCount: function(v) {return v + "花";},
    isLianZhuang: function(v) {return v ? "可连庄" : "";},
    isTrust : function(v) {return v ? "自动托管" : "";},
    isSpringDouble: function(v) {return v ? "春天翻倍" : "";},
    isDismissDouble: function(v) {return v ? "春天解散翻倍" : "";},
    tianDiHuType: function(v) {return v == 0 ? "天地胡加十胡" : v == 1 ? "天地胡翻倍" :"无天地胡";},
    isJiaChui: function(v) {return v ? "加锤" : "";},
    huxiType:function (v) {
        return v == 0 ? "21胡息" : "卡20张";
    },
    isDaiFeng: function(v) {return v ? "带风" : "";},
    zhiTouZi: function(v) {return v ? "开杠听掷骰子" : "";},
    isCanChi: function(v) {return v ? "可吃牌" : "";},
    isQingYiSeChi: function(v) {return v ? "清一色可吃牌" : "";},
    fangGangType: function(v) {return v == 0 ? "每家都出" : "放杠者出";},
    // duoHu: function(v) {return v ? "一炮多响" : "截胡"}, // 如果需要 在自己游戏添加
    dianpao: function(v) {return v ? "点炮胡" : "";},
    tingType: function(v) {return v ? "可听牌" : "不可听牌";},
    lazi: function(v) {return v ? "封顶" : "不封顶";},
    zhafengding: function(v) {return v ? v + "炸封顶" : "不封顶";},
    beishufengding: function(v) {return v ? v +"倍封顶" : "";},
    bijiaoSigeer: function(v) {return v ? "4个2必叫" : "";},
    bijiaoWangshuanger: function(v) {return v ? "王+双2必叫" : "";},
    bijiaoZhadan: function(v) {return v ? "炸弹必叫" : "";},
    daiti: function(v) {return v ? "带踢翻倍" : "";},
    sidaier: function(v) {return v ? "四带二" : "";},
    can4dai2: function(v) {return v ? "四带二" : "";},
    can4dai3: function(v) {return v ? "四带三" : "";},
    zhaDanBuChai: function(v) {return v ? "炸弹不可拆" : "";},
    isAutoTip: function(v) {return v ? "自动提示" : "";},
    hongTao10Niao: function(v) {return v ? "红桃10扎鸟" : "";},
    upLimmit: function(v) {return v > 0 ? "上限" + v : "无上限";},
    multi: function(v) {return v ? v +"倍" : "";},
    maizhuang: function(v) {return v ? "买庄" : "不买庄";},
    zhuangxianfen: function(v) {return v ? "庄闲分" : "";},
    mustTing: function(v) {return v ? "必须叫听" : "";},
    qianggang: function(v) {return v ? "抢杠胡" : "";},
    qianggangquanbao: function(v) {return v ? "抢杠全包" : "";},
    canChi: function(v) {return v ? "可吃" : "不可吃";},
    qidui: function(v) {return v ? "七对可胡" : "";},
    zhongfabai: function(v) {return v ? "带中发白" : "";},
    hongzhong8: function(v, areaSelectMode) {
        if(areaSelectMode.appType && areaSelectMode.appType == 11){
            if(v == 'true' || v == 'false'){
                v = v ? 8 : 4;
            }else{
                v = Number(v);
            }
            var str = "";
            var cfg = {"4": "4红中","8": "8红中","1": "翻癞子","2": "双癞子",};
            return cfg[v];
        }else{
            return v ? "8红中" : "";
        }  
    },
    daihongzhong: function(v) {return v ? "带红中" : "不带红中";},
    qiangganghu: function(v) {return v ? "抢杠胡" : "";},    
    guipaiType: function(v) {return v == 0? "翻鬼" : v == 1 ? "红中鬼" : "上下鬼";},    
    isQishouhu: function(v) {return v ? "四鬼起手胡" : "";},
    youhongzhongbujiepao: function(v, areaSelectMode) {
        if(areaSelectMode.appType && areaSelectMode.appType == 11){
            return v ? "有癞子不接炮" : "";
        }else{
            return v ? "有红中不接炮" : "";
        }
    },
    faPai:function(v){
        return ["普通", "畅爽", "极速"][v] || "";
    },
    isQiangganghu: function(v, areaSelectMode) {
        if (areaSelectMode.isQiangganghu){
            return areaSelectMode.isQianggangquanbao ? "抢杠全包," : "抢杠胡,";
        }
        return "";
    },  
    niaofen: function(v, areaSelectMode) {return areaSelectMode.zhuaniao != 0 && areaSelectMode.zhuaniao != 1? "中鸟"+ v +"分" : "";},
    wuhongzhongjiabei: function(v, areaSelectMode) {
        if(areaSelectMode.appType && areaSelectMode.appType == 11){
            return v ? "无癞子加倍" : "";
        }else{
            return v ? "无红中加倍" : "";
        }
    },
    qianggangsuanzimo: function(v) {return v ? "抢杠胡算自摸" : "";},
    qianggangsuandianpao: function(v) {return v ? "抢杠胡算点炮" : "";},
    canHuCount: function(v) {return v ? "胡可胡" : "";},
    zFlower4: function(v) {return v ? v : "";},
    dnxbzFlower20: function(v) {return v ? v : "";},
    dnxbzfbFlower28: function(v) {return v ? v : "";},
    baozi: function(v) {return v ? "带豹子" : "不带豹子";},
    liuduo: function(v) {return v ? "留垛" : "不留垛";},
    gangBao: function(v) {return v ? "杠爆" : "不杠爆";},
    zuizi: function(v) {return v ? "带嘴" : "不带嘴";},
    isJiaZhu: function(v) {return v ? "下嘴" : "不下嘴";},
    yingjiaxianchu: function(v) {return v ? "赢家先出" : "";},
    showHandCount: function(v) {return v ? "显示牌数" : "";},
    canGangScore: function(v,areaSelectMode) {return typeof areaSelectMode.getGangScore !== undefined && areaSelectMode.getGangScore ? "一炮多响" : "截胡";},
    mustzimo: function(v) {return v ? "只能自摸" : "";},
    IsThreeKouDouble: function(v) {return v ? "三口翻2倍" : "三口不翻倍";},
    zimohu: function(v) {return v ? "自摸胡" : "";},
    zengfen: function(v) {return v ? "增分" : "无增分";},
    canGangPeng: function(v) {return v ? "可明杠可碰" : "不可明杠不可碰";},
    zhuangDouble: function(v) {return v ? "庄翻倍" : "庄不翻倍";},
    lazhuangFen: function(v) {return v ? "拉庄" + v + "封顶" : "不拉庄";},
    lazhuang: function(v) {return v ? "拉庄" : "不拉庄";},
    mustPut: function(v) {return v ? "能管必管" : "";},
    baoDanMustPut : function(v) {return v ? "报单必顶" : "";},
    dapie: function(v) {return v ? "大撇" : "不带撇";},
    menzigun: function(v) {return v ? "闷飘" : "";},
    haidilaoyue: function(v) {return v ? "海底捞月" : "";},
    shuanglonghui: function(v) {return v ? "双龙会" : "";},
    daixi: function(v) {return v ? "带喜" : "";},
    huimianchuhan: function(v) {return v ? "会面出汗" : "";},
    shengyihu: function(v) {return v ? "剩一胡" : "";},
    pigu: function(v) {return v ? "屁股" : "";},
    jizi: function(v) {return v ? "基子" : "";},
    piaohu: function(v) {return v ? "飘胡" : "";},
    dahu: function(v) {return v ? "有大胡" : "";},
    fangZuoBi: function(v) {return v ? "防作弊" : "";},
    can3aZhaDan: function(v) {return v ? "3个A算炸弹" : "";},
    isZhaDanFanBei: function(v) {return v ? "炸弹翻倍" : "";},
    zhuaMaNum: function(v) {return v > 0 ? "抓"+ v + "张"  : "不抓码";},
    canPutAnyFeiji: function(v) {return v ? "飞机可少带接完" : "";},
    canPutAnySanZhang: function(v) {return v ? "三张可少带接完" : "";},
    can3ge3ZhaDan : function(v) {return v ? "3个3算炸弹" : "";},
    tianHu: function(v) {return v ? "天胡" : "";},
    diHu: function(v) {return v ? "地胡" : "";},
    payWay: ["房主付", "AA付", "大赢家付"],
    WithFlowerType: ["无花", "有花", "中发白作花", "4花", "20花", "28花", "4花", "8花"],
    tingHuType: {0:"不听可胡", 1:"不听不可胡"},
    zhuaniao: {0:"不抓鸟", 1:"一鸟全中", 2:"2鸟", 3:"3鸟",4:"4鸟", 6:"6鸟", 8:"8鸟"},
    zhuaniaoNum: {0:"抓飞鸟",1:"一鸟全中",2:"2鸟",4:"4鸟",6:"6鸟", 8:"8鸟"},
    liu8zhang: {0:"摸1/2张",1:"摸2/4张",2:"摸4/6张"},
    songma: {0:"不送码",2:"2码",4:"4码",6:"6码"},
    isFanXing: {1:"单醒",2:"双醒"},
    hongzhong: {0:"无癞子", 4:"4红中", 8:"8红中"},
    type: {jingdian:"经典斗地主", huanle:"欢乐斗地主"},
    xijiang: {xijiang147:"喜将147", "xijiangQuan":"喜将全"},
    fengding: {0:"不封顶", 600:"600胡封顶", 800:"800胡封顶"},
    baodi: {100:"醒家保底100分",200:"醒家保底200分"},
    payType: {onePay:"一包一", allPay:"一包三"},
    piaofen: {0:"不飘分",1:"飘2分",2:"飘5分"},
    shaguiType: {0:"不杀鬼",1:"杀鬼翻番",2:"杀鬼加5分"},
    wuguiType: {0:"",1:"无鬼翻2倍",2:"无鬼翻3倍"},
    xiNum: {6:"6息",9:"9息",15:"15息"},
    xingType: {0:"不带醒",1:"随醒",2:"翻醒"},
    suanfenType: {0:"",1:"积分底分2分",2:"1息1囤"},
    bihuType: {0:"有胡必胡",1:"点炮必胡"},
    fangpaoType: {0:"3倍",1:"2倍",2:"1倍"},
    cardNumIndex: {0:"16张",1:"15张"},
    redguaiwanOne: {1:"红拐弯(234)" ,2:"红拐弯(468)"},
    shunType: {0:"顺子到2" ,1:"顺子到小王"},
    minHu: function(v){return v && v == 21 ? "21胡起胡" : "";},
    lunzhuang:function(v) {return v ? "轮庄" : "";},
    minRedNum: function(v){return v + "红起胡";},
    kingNum: function(v){return v ? ["无","一", "二", "三", "四"][v] + "王" : "无王";},
    isShuangHe: function(v){return v ? "双合翻倍" : "";},
    isDaHu: function(v){return v ? "大胡10分" : "";},
    isPengPengHu: function(v){return v ? "碰碰胡" : "";},
    pengpenghu : function(v) {return v ? "碰碰胡" : "";},
    isNo34 : function(v) {return v ? "去掉3、4" : "";},
    isYiGuaBian: function(v){return v ? "一挂匾" : "";},
    isHuDieFei: function(v){return v ? "蝴蝶飞" : "";},
    isSiPeng: function(v){return v ? "四碰单吊" : "";},
    isManTangHong: function(v){return v ? "满堂红" : "";},
    isBanBanHu: function(v){return v ? "板板胡" : "";},
    isJuJuHong: function(v){return v ? "句句红" : "";},
    isShiErHong: function(v){return v ? "十二红" : "";},

    isShiYiHong: function(v){return v ? "十一红" : "";},
    isFengDing: function(v){return v ? "80分封顶" : "";},
    playSpeed : function(v) {return v == 0 ? "快" : "慢";},
    isPlayerShuffle:function(v){return v == 1 ? "手动切牌" : "系统切牌";},
    // banBanHuType: function(v,areaSelectMode){
    //     if(areaSelectMode["isBanBanHu"]){
    //         return v ? ["闲家胡桌面第一张牌","闲家胡自己摸的第一张牌"][v];
    //     }
    //     return "";
    // },
    isAnCards: function(v, areaSelectMode) {
            var cfg = {
                "3": {
                    "2": [33, 66],
                    "3": [41, 9],
                    "4": [33, 0]
                },
                "4": {
                    "2": [44, 96],
                    "3": [44, 52],
                    "4": [46, 0]
                }
            };
            if (areaSelectMode.isAnCards) { // 4人暗8张牌
                cfg["3"]["4"] = [31, 8];
                cfg["4"]["4"] = [44, 8];
            }
            if (areaSelectMode.haveKingTz) { // 2 3人 3副牌
                cfg["3"]["2"] = [33, 72];
                cfg["3"]["3"] = [41, 15];
            }
            if (areaSelectMode.isSiXi) {
                cfg["4"]["2"] = [44, 88];
                cfg["4"]["3"] = [44, 44];
                cfg["4"]["4"] = [44, 0];
            }
        return  "暗" + cfg[areaSelectMode.deckNum][areaSelectMode.maxPlayer][1] + "张";
    },
    isPapo : function(v) {return v ? "爬坡" : "";},
    syDuoHu: function(v) {return v ? "一炮多响" : "一炮一响";},
    isTikan : function(v) {return v ? "三提、五坎" : "";},
    isZiMoFanBei : function(v) {return v ? "自摸翻倍" : "";},
    isZiMoJiaYiTun : function(v) {return v ? "自摸加一囤" : "";},

    isMaiPai : function(v) {return v ? "埋20张" : "";},
    maipai : function(v) {return v ? "埋牌" : "";},
    fullperson : function(v) {return v ? "满人开始" : "";},
    trustTime: { 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管"},
    ht10zhaniaohanzhadan: function(v) {return v ? "扎鸟含炸弹" : "";},
    zhaniao : {0:"", 1:"红桃9翻倍", 2:"红桃10翻倍", 3:"红桃10飘5分", 4:"红桃10飘10分"},
    isYiHongSanBei : function(v) {return v ? "一点红3倍" : "";},
    isHuLiangZhang : function(v) {return v ? "可胡示众牌" : "";},
    isManualCutCard : function(v) {return v ? "手动切牌" : "系统切牌";},
    jushou: function(v) {return v ? "举手做声" : "";},
    budaihu: function(v) {return v ? "不带无胡" : "带无胡";},
    budaiyihong: function(v) {return v ? "不带一点红" : "带一点红";},
    isPutLimit: function(v) {return v ? "吃边打边" : "";},
    jieFengType: function(v, areaSelectMode)
    {   
        if(areaSelectMode.isDivideTeam){
            if(v == 0){
                return "队友接风";
            }else if(v == 1){
                return "下家接风";
            }
        }
        return "";
    },
    youtao: function(v) {return v ? "有套" : "";},
    daxiaodao: function(v) {return v ? "大小道" : "";},
    caneat: function(v) {return v ? "可以吃" : "";},
    gangsuihu: function(v) {return v ? "杠随胡" : "";},
    mustPutHongTaoSan: function(v) {return v ? "先出红桃三" : "";},
    firstHeiTao3: function(v) {return v ? "首局先出黑桃3" : "";},
    mustPut: function(v) {return v ? "能管必管" : "";},
    showCardNumber: function(v) {return v ? "显示牌数" : "";},
    gangkai4bei: function(v) {return v ? "杠开翻倍" : "杠开不翻倍";},
    isLianChui: function(v) {return v ? "连锤" : "";},
    isAlldemit: function(v) {return v ? "解散需全部人同意" : "";},
    isZiMoRate: function(v) {return v == 0 ? "自摸翻倍" : "";},
    isfending: function(v) {return v == 0 ? "四百封顶" : "两百封顶";},
    openType: function(v) {return v == 1? "全开放" : v == 2?"半开放" :"不开放";},
    huType: function(v) {return v ? "自摸胡" : "点炮胡";},
    isPiaoHu: function(v) {return v ? "飘胡" : "";},
    is21Zhang: function(v) {return v ? "21张" : "";},
    maPai: function(v) {return v > 0 ? v + "码" : "数字码";},
    isLiangPian: function(v) {return v ? "两片" : "";},
    wangzhua: function(v) {return v ? "明抓" : "暗抓";},
    zuopiao: function(v) {return v == 0? "不飘" : "飘" + v;},
    hunyise: function(v) {return v ? "混一色" : "";},
    kepiao: function(v) {return v ? "下飘" : "";},
    isTianhu: function(v) {return v ? "天胡" : "";},
    isDihu: function(v) {return v ? "地胡" : "";},
    isHaidihu: function(v) {return v ? "海底胡" : "";},
    isErfen: function(v) {return v ? "积分底分2分" : "";},
    isMingwei: function(v) {return v ? "明偎" : "";},
    isYiwushi: function(v) {return v ? "一五十" : "";},
    hongziType: function(v, areaSelectMode ) {return areaSelectMode.isHongheidian ? (v == 0? "10红3倍13红5倍": "10红3倍多一红+3胡"): "";},
    hongZhuan: function(v) {return v ? "红转朱黑" : "";},
    isGenXing: function(v) {return v ? "跟醒" : "翻醒";},    
    isKing: function(v) {return v == 0 ? "按王限胡" : v == 1 ? "按番限胡" : "不限胡";},   
    fanBei: function(v, areaSelectMode) {
        if (v == 1 && areaSelectMode.fanBeiScore) {
            return "小于" + areaSelectMode.fanBeiScore + "分翻倍";
        }
        return "不翻倍";
    },
    fengDing: {0:"不封顶", 1:"30/32分", 2:"60/64分", 3:"120/128分"},
    zhuangJia:{0:"首局房主庄", 1:"首局随机庄"},
    qihuTun:function(v){
        return "起胡" + v + "囤";
    },
    isTrustWhole: function(v, areaSelectMode){
        if(areaSelectMode.trustTime > 0 && v && areaSelectMode.trustWay == undefined){
            return "整场托管";
        }
        return "";
    },
    trustWay: function(v, areaSelectMode){
        if (areaSelectMode.trustTime <= 0){
            return "";
        }else{
            return ["托管当局", "托管当局+下一局", "整场托管"][v];
        }

    },
    matchLimitScore:function(v,areaSelectMode){
        if(areaSelectMode.isMatchLimit){
            return "低于"+v+"分禁止进房";
        }
        return "";
    },
    matchDissolveLimitScore:function(v,areaSelectMode){
        if(areaSelectMode.isMatchDissolveLimit){
            return "低于"+v+"分自动解散";
        }
        return "";
    },
    scoreNeedEnough:function(v,areaSelectMode){
        if(v){
            return "积分不为负";
        }
        return "";
    },
}
// 不同名但是描述一样、设计问题尽量避免，目前这么处理
GameCnDescDefault.flowerType = GameCnDescDefault.WithFlowerType;
GameCnDescDefault.qiangganghu = GameCnDescDefault.qianggang;
GameCnDescDefault.showCardNumber = GameCnDescDefault.showHandCount;
GameCnDescDefault.nohongzhongdouble = GameCnDescDefault.wuhongzhongjiabei;

GameCnDesc = {};
GameCnDesc[MjClient.GAME_TYPE.PAO_HU_ZI] ={
    minHu: {15: "15胡起胡", 18: "18胡起胡", 21: "21胡起胡"},
    fengDing: {"-1": "单局不封顶", 300: "单局300分封顶", 600: "单局600分封顶", 800: "单局00分封顶", 1000: "单局1000分封顶"},
    quanjufengdingScore: function(v) {
        if (v && v > 0) {
            return "整场" + v + "分封顶";
        }
        return "整场不封顶";
    },
};

GameCnDesc[MjClient.GAME_TYPE.PAO_HU_ZI_King] ={
    minHu: {15: "15胡起胡", 18: "18胡起胡", 21: "21胡起胡"},
    fengDing: {"-1": "单局不封顶", 300: "单局300分封顶", 600: "单局600分封顶", 800: "单局800分封顶", 1000: "单局1000分封顶"},
    quanjufengdingScore: function(v) {
        if (v && v > 0) {
            return "整场" + v + "分封顶";
        }
        return "整场不封顶";
    },
};

GameCnDesc[MjClient.GAME_TYPE.PAO_HU_ZI_LR_King] ={
    minHu: {15: "15胡起胡", 18: "18胡起胡", 21: "21胡起胡"},
    fengDing: {"-1": "单局不封顶", 300: "单局300分封顶", 600: "单局600分封顶", 800: "单局800分封顶", 1000: "单局1000分封顶"},
    quanjufengdingScore: function(v) {
        if (v && v > 0) {
            return "整场" + v + "分封顶";
        }
        return "整场不封顶";
    },
};

GameCnDesc[MjClient.GAME_TYPE.PAO_HU_ZI_ER] ={
    minHu: {15: "15胡起胡", 18: "18胡起胡", 21: "21胡起胡"},
    fengDing: {"-1": "单局不封顶", 300: "单局300分封顶", 600: "单局600分封顶", 800: "单局800分封顶", 1000: "单局1000分封顶"},
    quanjufengdingScore: function(v) {
        if (v && v > 0) {
            return "整场" + v + "分封顶";
        }
        return "整场不封顶";
    },
};

GameCnDesc[MjClient.GAME_TYPE.PAO_HU_ZI_SR_King] ={
    minHu: {15: "15胡起胡", 18: "18胡起胡", 21: "21胡起胡"},
    fengDing: {"-1": "单局不封顶", 300: "单局300分封顶", 600: "单局600分封顶", 800: "单局800分封顶", 1000: "单局1000分封顶"},
    quanjufengdingScore: function(v) {
        if (v && v > 0) {
            return "整场" + v + "分封顶";
        }
        return "整场不封顶";
    },
};

GameCnDesc[MjClient.GAME_TYPE.PAO_HU_ZI_SR] ={
    minHu: {15: "15胡起胡", 18: "18胡起胡", 21: "21胡起胡"},
    fengDing: {"-1": "单局不封顶", 300: "单局300分封顶", 600: "单局600分封顶", 800: "单局800分封顶", 1000: "单局1000分封顶"},
    quanjufengdingScore: function(v) {
        if (v && v > 0) {
            return "整场" + v + "分封顶";
        }
        return "整场不封顶";
    },
};

GameCnDesc[MjClient.GAME_TYPE.LUO_DI_SAO] ={
    fengDing: {"-1": "单局无上限", 300: "单局300分封顶", 600: "单局600分封顶"},
    quanjufengdingScore: function(v) {
        if (v && v > 0) {
            return "整场" + v + "分封顶";
        }
        return "整场不封顶";
    },
};

GameCnDesc[MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG] ={
    piaoFen:function(v){return v ? "飘分" : ""},
    quanKaiFang: function(v){ return v ? "全开放" : ""},
    wuTong: function(v) { return v ? "无筒" : "";},
    isQiangGangHu: function(v){ return v ? "抢杠胡" : ""},
    fengDing:{"0": "单局不封顶", "30": "单局30分封顶", "60": "单局60分封顶", "100": "单局100分封顶"},
    quanjufengdingScore: function(v) {
        if (v && v > 0) {
            return "整场" + v + "分封顶";
        }
        return "整场不封顶";
    },
};

GameCnDesc[MjClient.GAME_TYPE.YONG_ZHOU_MJ] ={
    huType: {0: "自摸胡", 1: "点炮胡"}
};

GameCnDesc[MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG] ={
    huType: function(v) { return v == 0 ? "一炮多响" : v == 1 ?"一炮一响": "不支持抢杠胡";},
    zhuaniao: function(v) { return v == 0 ? "不抓鸟" : v == 1 ?"窝窝鸟": v + "鸟";},
    jieSuanDiFen: function(v) {
        return v == 1 ? "" : "积分底分x" + v;
    },
};
GameCnDesc[MjClient.GAME_TYPE.XIN_NING_MA_JIANG] ={
    huType: function(v) { return v == 0 ? "一炮多响" : v == 1 ?"一炮一响": "不支持抢杠胡";},
    zhuaniao: function(v) { return v == 0 ? "不抓鸟" : v == 1 ?"窝窝鸟": v + "";},
    isLianChui: function(v) {return v ? "连庄不可拆锤" : "";},
    isZhuangShangChui: function(v) {return v ? "庄上锤" : "";},
    zhuaniao: {0:"不抓鸟",1:"一鸟全中",2:"2鸟",4:"4鸟",6:"6鸟",},
    jieSuanDiFen: function(v) {
        return v == 1 ? "" : "积分底分x" + v;
    },
};
GameCnDesc[MjClient.GAME_TYPE.CHANG_SHA] ={
    changsha_difen: GameCnDescDefault.difen,
    zhuaNiaoType:{0:"中鸟加分",1:"中鸟加倍",2:"不抓鸟",3:"中鸟翻倍"},
    zhuaNiaoNum: function(v, areaSelectMode) { return areaSelectMode.zhuaNiaoType != 2 && v >= 0 && v <= 4 ? ["1鸟", "2鸟", "4鸟", "6鸟", "8鸟"][v] : ""},
    zhuaNiaoBuLunKong:function(v, areaSelectMode) { return areaSelectMode.zhuaNiaoType != 2 && v ?"抓鸟不轮空":""},
    buBuGao : function(v) {return v ? "步步高" : ""},
    jinTongYuNv : function(v) {return v ? "金童玉女" : ""},
    sanTong : function(v) {return v ? "三同" : ""},
    yiZhiHua : function(v) {return v ? "一枝花" : ""},
    queYiSe : function(v) {return v ? "缺一色" : ""},
    banBanHu : function(v) {return v ? "板板胡" : ""},
    liuLiuShun : function(v) {return v ? "六六顺" : ""},
    daSiXi : function(v) {return v ? "大四喜" : ""},
    huPaiNiao : function(v) {return v ? "一只鸟" : ""},
    zhongTuCanAgain : function(v) {return v ? "起手胡可胡多次（含中途）" : ""},
    buKeChongFu: function(v) {return v ? "不可重复" : ""},
    zhongTuLiuLiuShun : function(v) {return v ? "中途六六顺" : ""},
    zhongTuSiXi : function(v) {return v ? "中途四喜" : ""},
    jiaJiangHu : function(v) {return v ? "假将胡" : ""},
    piaoFen:function(v, areaSelectMode){
        if (areaSelectMode.xianPiao) {
            return "自由下飘";
        }
        if (v == 4 ) {
            return "自由下飘";
        }
        return v ? "飘" + v +"分" : "";
    },
    menQingZiMo : function(v) {return v ? "门清自摸" : ""},
    menQing : function(v) {return v ? "门清" : ""},
    menQing_no258:function(v) {return v ? "门清不要258将": ""},
    xiaohubudianpao : function(v) {return v ? "小胡不接炮" : ""},
    queYiMen : function(v) {return v ? "缺一门" : ""},
    kai4Gang : function(v) {return v ? "开4杠" : ""},
    fengDing:{0:"21分封顶", 1:"42分封顶",2:"15分封顶"},
    chaHu : function(v) {return v ? "可查看起手胡" : ""},
    anzhuang:function(v){return v ? "按庄抓鸟" : ""},
    keqiangzhigang:function(v){return v ? "可抢直杠" : ""},
    genzhangbudianpao:function(v){return v ? "跟张不点炮" : ""},
    zhuangXianFeng:{false:"", true:"庄闲分", 0:"", 1:"庄闲分",2:"每番都加庄闲分"},
    fanBei: function(v, areaSelectMode) {
        if (v == 1 && areaSelectMode.fanBeiScore) {
            return "小于" + areaSelectMode.fanBeiScore + "分翻倍";
        }
        return "不翻倍";
    },
    youhongzhong: function(v) {return v ? "红中癞子" : ""},
    maiPai40zhang:function(v) {return v ? "埋牌40张" : ""},
    zhongNiao159:function(v) {return v ? "159中鸟" : ""},
    duiWeiZhongNiao:function(v) {return v ? "对位中鸟" : ""},
    wuhongzhongJiaFen: function(v, areaSelectMode) {
        if (areaSelectMode.youhongzhong) {
            if (v == 2)
                return "无癞子加2分";
            else if (v == 4)
                return "无癞子加4分";
        }
        return "";
    },
}
GameCnDesc[MjClient.GAME_TYPE.CHANG_SHA_ER_REN] = GameCnDesc[MjClient.GAME_TYPE.CHANG_SHA];
GameCnDesc[MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI] ={
    mingwei: function(v) {return v ? "明偎" : "暗偎"},
    minHuType:{0:"15息起胡", 1:"10息起胡"},
    countTunWay:{0:"1息1囤(逢3加3)", 1:"1息1囤",2:"3息1囤"},
    diFen:function(v, areaSelectMode){
        return areaSelectMode.countTunWay == 2 ? "积分底分" + v +"分" : "";
    },
    isShowChouWei : function(v) {return v ? "臭偎明示" : ""},
    zimoaddhuxi : function(v) {return v ? "自摸加3胡" : ""},
    isYiwushi : GameCnDescDefault.isYiwushi,
    sanshirate : function(v) {return v ? "30胡翻倍" : ""},
    nohuaddhuxi : function(v) {return v ? "荒庄5胡息" : ""},
    yidianhong : function(v) {return v ? "一点红" : ""},
    tiandihu : function(v) {return v ? "天地胡" : ""},
    daxiaozi : function(v) {return v ? "大小字" : ""},
    pengpenghu : function(v) {return v ? "碰碰胡" : ""},
    hongheihu : function(v, areaSelectMode) {return v ? (areaSelectMode["honghutype"] == true) ? "红黑胡10红" : "红黑胡13红" : "" },
    isShowMTDieJia : function (v) { return v? "名堂叠加" : ""},
    firstRandomZhuang : function (v) { return v? "首局随机坐庄" : ""},
    faPai:function(v){
        return ["普通", "畅爽", "极速"][v] || "";
    },
    maipai:function(key,areaMode){
        if(areaMode.appType == 18){//邵阳湘乡告胡子
            if(!areaMode.maipai) return "";
            if(areaMode.maxPlayer > 2){
                return "";
            }else{
                var maiPaiCount = parseInt(areaMode.maiPaiType) * 10;
                if(maiPaiCount > 0) return "2人埋"+maiPaiCount+"张";
            }
        }else{
            return key ? "埋20张" : "";
        }
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管"}
}

GameCnDesc[MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI] ={
    tuototuo: function(v) {
        var str = "15胡起胡,有炮必接,满百结算,";

        switch(v){
            case 0:
                str += "不打坨";
                break ;
            case 1:
                str += "坨对坨四番";
                break ;
            case 2:
                str += "坨对坨三番";
                break ;
            case 3:
                str += "坨对坨两番";
                break ;
        }
        return str;
    },
    maipai:function(key,areaMode){
        if(areaMode.appType == 18){//邵阳湘乡告胡子
            if(!areaMode.maipai) return "";
            if(areaMode.maxPlayer > 2){
                return "";
            }else{
                var maiPaiCount = parseInt(areaMode.maiPaiType) * 10;
                if(maiPaiCount > 0) return "2人埋"+maiPaiCount+"张";
            }
        }else{
            return key ? "埋20张" : "";
        }
    },
    faPai:function(v){
        return ["普通", "畅爽", "极速"][v] || "";
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管"}
};
GameCnDesc[MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI] ={
    limitWinHuxi:{1:"10胡起胡",2:"15胡起胡"},
    jifenType: {1:"囤数计分", 2:"胡息计分"},
    littleRed : function(v) {return v ? "一点红" : ""},
    tianDiHu : function(v) {return v ? "天地胡" : ""},
    RedBlackHu : function(v) {return v ? "红黑胡" : ""},
    faPai:function(v){
        return ["普通", "畅爽", "极速"][v] || "";
    },
    maipai:function(key,areaMode){
        if(areaMode.appType == 18){//邵阳湘乡告胡子
            if(!areaMode.maipai) return "";
            if(areaMode.maxPlayer > 2){
                return "";
            }else{
                var maiPaiCount = parseInt(areaMode.maiPaiType) * 10;
                if(maiPaiCount > 0) return "2人埋"+maiPaiCount+"张";
            }
        }else{
            return key ? "埋20张" : "";
        }
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管"}
};
GameCnDesc[MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI] = {
    maxPlayer: function(v) {return v ? v + "人场" : ""},
    minRedNum: function(v){return v ? v + "起胡" : ""},
    kingNum: function(v){return v ? ["无","一", "二", "三", "四"][v] + "王" : "无王"},
    isPengPengHu: function(v){return v ? "碰碰胡" : ""},
    isSiPeng: function(v){return v ? "四碰单吊" : ""},
    isJuJuHong: function(v){return v ? "花胡" : ""},
    isQiDui: function(v) {return v ? "七对" : ""},
    isShangShou: function(v) {return v ? "蝴蝶可上手" : ""},
    isRandomZhuang : function(v){return v ? "随机坐庄" : "";},
    isMaiPai : function(v, areaSelectMode) {
        if (v) {
            return "2人埋牌" + areaSelectMode.maiPaiNum + "张";
        } else {
            return "";
        }
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管"}
}

GameCnDesc[MjClient.GAME_TYPE.ML_HONG_ZI] = {
    isRandomZhuang : function(v){return v ? "随机坐庄" : "";},
    isHuaHu  : function(v){return v ? "花胡" : "";},
    isMaiPai : function(v, areaSelectMode) {
        if (v) {
            return "2人埋牌" + areaSelectMode.maiPaiNum + "张";
        } else {
            return "";
        }
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.DIAN_TUO] = {
    maxPlayer: function(v) {
        if(v == 3){
            return "3人场,去掉3、4,去两张牌,不分组";
        }else{
           return v ? v + "人场" : ""; 
        }
    },
    nScoreLine: function(v) {
        v = Number(v);
        if(v == 1 || v == 2 || v == 4) {
            return v + "局";
        }
        return v + "分";
    }, 
    isSanFuPai: function(v) {return v ? "三副牌" : ""},
    isRdTeam: function(v) {return v ? "随机分组" : ""},
    isBuDaGang: function(v) {return v ? "不打港" : ""},
    isShowRemainCards: function(v) {return v  ?  "看手牌数" : ""},
    isNoShunZi: function(v) {return v  ?  "不打顺子" : ""},

    isZhaNoKing: function(v) {return v  ?  "炸弹不带王" : ""},
    isHuaSeValid: function(v) {return v  ?  "正五十K分花色" : ""},
    isZuiHouShaoDai: function(v) {return v  ?  "仅最后飞机三条可少带" : ""},

    isFullCard: function(v,areaSelectMode) {
        if(areaSelectMode.maxPlayer == 3) 
            return ""; 
        else
            return !v ?  "去掉3、4" : ""
    },
    isSeeTeamCard: function(v) {return v ? "看队友牌" : ""}, 
    isRedBlackScore: function(v,areaSelectMode) {
        if(areaSelectMode.nScoreLine != 100 &&  areaSelectMode.nScoreLine != 60){
            return "";
        }
        return v ? "四红四黑" : "";
    },
    nTianZhaScore: function(v,areaSelectMode) {
        if(areaSelectMode.nScoreLine != 100 &&  areaSelectMode.nScoreLine != 60){
            return "";
        }
        return v > 0 ? (v + "分") : "";
    },
}


GameCnDesc[MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU] = {
    difen: GameCnDescDefault.difen,
    laiType:{0:"无癞到底", 1:"一癞到底", 2:"两癞可胡"},
    xiFen:{0:"4癞无喜", 5:"喜5分", 10:"喜10分"},
    piaoFen:{1:"飘分1", 2:"飘分2", 3:"飘分3" , 4:"飘分1", 0:"不飘", 6:"自由下飘"},
    fangGang:{1:"积分底分X人数", 2:"积分底分X2", 3:"积分底分X3"},
    diaoYu: function(v){return v ? "钓鱼" : ""},
    lianGunDaiPa : function(v){return v ? "连滚带爬" : ""},
    qiangGangHu : function(v){return v ? "抢杠胡" : ""},
    qiangGangQuanBao : function(v) {return v ? "抢杠全包" : ""},
    hasLaiCanQiang : function(v) {return v ? "有癞子可抢杠" : ""},
    queYiMen : function(v) {return v ? "缺一门" : ""}
}

GameCnDesc[MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ] = {
    difen:{1:"积分底分1分",2:"积分底分2分",3:"积分底分3分",5:"积分底分5分",10:"积分底分10分",20:"积分底分20分"},
    playType:{0:"半干瞪眼",1:"平胡多癞",2:"全干瞪眼"},
    piaoFen:{2:"漂2分",4:"漂4分",6:"漂6分",10:"自由漂分",0:"不漂分"},
    quFeng:{0:"不去风",1:"去风"}

}
GameCnDesc[MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING] = {
    chuZi:{0:"不出字",1:"出单算",2:"出+出"},
    piaoFen:{0:"不漂分",1:"漂1分",2:"漂2分",3:"选漂一次",4:"每局选漂"},
    fengDing:{0:"不封",8:"8番封顶",16:"16番封顶"},
    maiMa:{0:"不买马",1:"自摸买马",2:"亮牌自摸买马"},
    quBaJiu:{0:"",1:"去八九"},
    buDaiFen:{0:"",1:"不带风"},
    baSiZhang:{0:"",1:"84张"},
    KaWuX4:{0:"",1:"卡五X4"},
    pengPengX4:{0:"",1:"碰碰胡X4"},
    gangShangHuaX4:{0:"",1:"杠上花X4"},
    liangDuiLiang:{0:"",1:"亮对亮"},
    quanLiang:{0:"",1:"全亮"},
    jianSiX2:{0:"",1:"见四乘二"},
    shuKan:{0:"",1:"数坎"}

}
GameCnDesc[MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING] = {
    chuZi:{0:"",1:"出单算",2:"出+出"},
    piaoFen:{0:"不漂分",1:"漂1分",2:"漂2分",3:"选漂一次",4:"每局选漂"},
    fengDing:{0:"不封",8:"8番封顶",16:"16番封顶"},
    maiMa:{0:"不买马",1:"自摸买马",2:"亮牌自摸买马"},
    maiMaType:{1:"买一马",2:"147中马",3:"买一送一"},
    quBaJiu:{0:"",1:"去八九"},
    buDaiFen:{0:"",1:"不带风"},
    baSiZhang:{0:"",1:"84张"},
    KaWuX4:{0:"",1:"卡五X4"},
    pengPengX4:{0:"",1:"碰碰胡X4"},
    gangShangHuaX4:{0:"",1:"杠上花X4"},
    liangDuiLiang:{0:"",1:"亮对亮"},
    quanLiang:{0:"部分亮",1:""},
    jianSiGui:{0:"",1:"见四归"},
    shuKan:{0:"",1:"数坎"},
    buKeLiang12:{0:"",1:"剩12张不可亮"}

}
GameCnDesc[MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN] = {
    difen:{1:"积分底分1分",2:"积分底分2分",5:"积分底分5分",10:"积分底分10分"},
    zhuangJiaFan:{0:"",1:"庄家加番"}
}
GameCnDesc[MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG] = {
    difen:{1:"积分底分1分",2:"积分底分2分",5:"积分底分5分",10:"积分底分10分"},
    qiHuFan:{0:"不限番数",3:"3番起胡",4:"4番起胡",5:"5番起胡"},
    buKaiKou:{0:"开口才能胡",1:"不开口可胡"},
    playType:{0:"不带发财白板",1:"带发财白板"},
}
GameCnDesc[MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI] = {
    SAN_DA_HA_difen: GameCnDescDefault.difen,
    maxPlayer: function(v) {return v ? v + "人场" : ""},
    SAN_DA_HA_doubleInSingleOut : function(v) {return v ? "双进单出" : ""},
    SAN_DA_HA_allowCheckCard : function(v) {return v ? "允许查牌" : ""},
    SAN_DA_HA_touXiangXuXunWen : function(v) {return v ? "投降需询问" : ""},
    daDaoBuFengDing : function(v) {return v ? "大倒不封顶":""},
    allowHanLai : function(v) {return v ? "允许喊来":""},
    jiaChui : function(v) {return v ? "加锤":""}
}

GameCnDesc[MjClient.GAME_TYPE.SAN_DA_HA] = {
    SAN_DA_HA_difen: GameCnDescDefault.difen,
    maxPlayer: function(v) {return v ? v + "人场" : ""},
    SAN_DA_HA_doubleInSingleOut : function(v) {return v ? "双进单出" : ""},
    SAN_DA_HA_allowCheckCard : function(v) {return v ? "允许查牌" : ""},
    SAN_DA_HA_touXiangXuXunWen : function(v) {return v ? "投降需询问" : ""},
    // SAN_DA_HA_daDaoTiQianOver : function(v) {return v ? "大倒提前结束" : ""},
    louFengDing:{0:"", 1:"大倒提前结束", 2:"6楼封顶",3:"上楼不封顶"},
    chou6 : function(v) {return v ? "抽6":""},
    baoFuLiuShou : function(v) {return v ? "报副留守" : ""},
    zhuangFuXianShou : function(v) {return v ? "庄副闲守" : ""},
    quWang : function(v) {return v ? "去掉大小王" : ""},
    daGuangAddOne : function(v) {return v ? "大光大倒加1分" : ""},
    jiaoFenJiaPai : function(v) {return v ? "叫分加拍" : ""},
    qiJiao70 : function(v) {return v ? "70分起叫" : ""},
    allowTuoLaJiXiaoDui : function(v) {return v ? "允许拖拉机消对" : ""},
    daWuZhu27NotTuoLaJi : function(v) {return v ? "打无主27不算拖拉机" : ""}
}
GameCnDesc[MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA] = {
    difen : GameCnDescDefault.difen,
    SAN_DA_HA_shuaiPaiLimitTwoCard : function(v) {return v ? "庄家甩牌最多两张" : ""},
    SAN_DA_HA_allowTuoLaJiXiaoDui : function(v) {return v ? "允许拖拉机消对" : ""},
    SAN_DA_HA_touXiangXuXunWen : function(v) {return v ? "投降需询问" : ""},
    SAN_DA_HA_daDaoTiQianOver : function(v) {return v ? "大倒提前结束" : ""},
    SAN_DA_HA_allowCheckCard : function(v) {return v ? "允许查牌" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG] = {
    zhuaniao: {1:"一码全中", 2:"159码,2鸟", 3:"159码,3鸟",4:"159码,4鸟", 6:"159码,6鸟"},
    niaofen: function(v, areaSelectMode) { return areaSelectMode.zhuaniao != 0 ? (v == 1 || v == 2?"中鸟"+v+"分":""):"";},
    qdpphthqysjf: function (v) {return v ? "胡七对、碰碰胡、天胡、清一色加1分" : ""},
    piaoFen:function(v, areaSelectMode){
        if (v == 4 ) {
            return "自由下飘";
        }
        return v ? "飘" + v +"分" : "";
    },
}

GameCnDesc[MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER] = {
    twoIsChangZhu : function(v) {return v ? "2为常主" : ""},
    zhuFuTongDa : function(v) {return v ? "主副同打" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.LV_LIANG_DA_QI] = {
    jifengding:{ 3:"3级封顶",5:"5级封顶",0:"不封顶"},
    koudi : function(v) {return v ? "抠底加级" : ""},
    fanpai: function(v) {return v ? "翻牌" : ""},
    zhuangdanjiabei : function(v) {return v ? "庄家单打赢双倍" : ""},
    fanZhuBuKouDi : function(v) {return v ? "反主不抠底" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.GAN_YU] = {
    tingType :function(v) {return v ? "明砸" : "推倒胡"},
    duoHu: function(v) {return v ? "一炮多响" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.SI_YANG] = {
    zuizi: { 2:"带嘴二花",4:"带嘴四花",0:"不带嘴","true":"带嘴二花","false":"不带嘴"},
    difen:{0.5:"0.5分", 1:"1分"},
    qiaogang: function(v) {return v ? "巧杠" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.XIN_SI_YANG] = {
    zuizi: { 2:"带嘴二花",4:"带嘴四花",0:"","true":"带嘴二花","false":""},
    difen:{0.5:"积分底分0.5",1:"积分底分1"}
}
GameCnDesc[MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN] = {
    baotingbaohu: function(v) {return v ? "报听包胡" : ""},
    lunzhuang: function (v) { return v ? "轮庄" : ""},
}
GameCnDesc[MjClient.GAME_TYPE.DA_NING_SHUAI_JIN] = {
    gangsuihu: function(v) {return v ? "一炮多响" : ""},
    queMen: function(v) {return v ? "缺门" : ""},
    oupai: function(v) {return v ? "怄牌" : ""},
}
GameCnDesc[MjClient.GAME_TYPE.XIANG_SHUI_MJ] = {
    duohu: function(v) {return v ? "杠随胡走" : ""},
    dadiaoche: function(v) {return v ? "大吊车" : ""},

}
GameCnDesc[MjClient.GAME_TYPE.XIANG_SHUI_MJ] = {
    duohu: function(v) {return v ? "一炮多响" : ""},
    dadiaoche: function(v) {return v ? "大吊车" : ""},
    zhuangfen : function(v) {return v ? "大牌加庄分" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.GUAN_NAN] = {
    zhuang2:{0:"庄闲同分",1:"庄2闲1翻倍",2:"庄2闲1不翻倍"},
    duoHu: function(v) {return v ? "一炮多响" : "截胡"},
    daJue7DuiXianHu: function (v) {return v ? "大绝七对先胡" : ""},
}
GameCnDesc[MjClient.GAME_TYPE.GUAN_YUN] = {
    duoHu: function(v) {return v ? "一炮多响" : "截胡"},
    qiduiketianhu: function(v) {return v ? "七对可天胡" : ""},
}
GameCnDesc[MjClient.GAME_TYPE.HA_HONGZHONG] = {
    zaimo:{ 0:"摸1/2张",1:"摸2/4张",2:"摸4/6张"},
    canRob : function(v) {return v ? "可抢杠" : "不可抢杠"},
    mbzdqz : function(v) {return v ? "码不中当全中" : "5分"},

}
GameCnDesc[MjClient.GAME_TYPE.JIANG_HUA_MJ] ={
    fengding: function(v) {return v ? v + "分封顶" : "不封顶";},
};
GameCnDesc[MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA] = {
    SAN_DA_HA_difen: GameCnDescDefault.difen,
    SAN_DA_HA_doubleInSingleOut : function(v) {return v ? "双进单出" : ""},
    SAN_DA_HA_allowCheckCard : function(v) {return v ? "允许查牌" : ""},
    SAN_DA_HA_touXiangXuXunWen : function(v) {return v ? "投降需询问" : ""},
    SAN_DA_HA_daDaoTiQianOver : function(v) {return v ? "大倒提前结束" : ""},
    chou6 : function(v) {return v ? "抽6" : ""},
    teshutuolaji : function(v) {return v ? "特殊拖拉机" : ""},
    changZhuDuoBiJiao : function(v) {return v ? "常主最多必须叫分" : ""},
    chuPaiTouXiangZuiDaFen : function(v) {return v ? "出牌后投降按大倒算分" : ""},
    isTouXiangDouble : function(v) {return v ? "叫分小于70分投降翻倍,叫分等于70分投降翻倍" : ""},
    lessThan70TouXiangDouble : function(v) {return v ? "叫分小于70分投降翻倍" : ""},
    equal70TouXiangDouble : function(v) {return v ? "叫分等于70分投降翻倍" : ""},
    shouJuZhuangJia : {0: "首局房主坐庄",1: "首局随机坐庄"},
    fanBei: function(v, areaSelectMode) {
        if (v == 1 && areaSelectMode.fanBeiScore) {
            return areaSelectMode.fanBeiScore <= 100 ? "小于" + areaSelectMode.fanBeiScore + "分翻倍" : "不限分翻倍";
        }
        return "不翻倍";
    }
};
GameCnDesc[MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA] = {
    SAN_DA_HA_difen: GameCnDescDefault.difen,
    SAN_DA_HA_doubleInSingleOut : function(v) {return v ? "双进单出" : ""},
    SAN_DA_HA_allowCheckCard : function(v) {return v ? "允许查牌" : ""},
    SAN_DA_HA_touXiangXuXunWen : function(v) {return v ? "投降需询问" : ""},
    SAN_DA_HA_daDaoTiQianOver : function(v) {return v ? "大倒提前结束" : ""},
    chou6 : function(v) {return v ? "抽6" : ""},
    teshutuolaji : function(v) {return v ? "特殊拖拉机" : ""},
    changZhuDuoBiJiao : function(v) {return v ? "常主最多必须叫分" : ""},
    chuPaiTouXiangZuiDaFen : function(v) {return v ? "出牌后投降按大倒算分" : ""},
    isTouXiangDouble : function(v) {return v ? "叫分小于等于70分投降翻倍" : ""},
};

GameCnDesc[MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA] = GameCnDesc[MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA];

GameCnDesc[MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA] = {
    difen : GameCnDescDefault.difen,
    SAN_DA_HA_allowCheckCard : function(v) {return v ? "允许查牌" : ""},
    touXiangJia10Fen : function(v) {return v ? "投降加10分" : ""},
    SAN_DA_HA_touXiangXuXunWen : function(v) {return v ? "投降需询问" : ""},
    SAN_DA_HA_daDaoTiQianOver : function(v) {return v ? "大倒提前结束" : ""},
    countScore : {1:"级数算分",2:"分数算分"},
    xiaoGuangFen : {25:"小光25分",30:"小光30分"},
    // biChangZhu : function(v) {return v ? "比常主" : ""},
    SAN_DA_HA_doubleInSingleOut : function(v) {return v ? "双进单出" : ""},
    baoFuLiuShou : function(v) {return v ? "报副留守" : ""},
    qiJiaoFen60 : function(v) {return v ? "60分起叫" : ""},
    quDiao6 : function(v) {return v ? "去掉6" : ""},
};
GameCnDesc[MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA] = {
    difen : GameCnDescDefault.difen,
    SAN_DA_HA_allowCheckCard : function(v) {return v ? "允许查牌" : ""},
    SAN_DA_HA_touXiangXuXunWen : function(v) {return v ? "投降需询问" : ""},
    buKeZaiJiao : function(v) {return v ? "60分不可再叫" : ""},
    xiaoGuangFen : {25:"小光25分",30:"小光30分"},
    biChangZhu : function(v) {return v ? "比常主" : ""},
    SAN_DA_HA_doubleInSingleOut : function(v) {return v ? "双进单出" : ""},
    baoFuLiuShou : function(v) {return v ? "报副留守" : ""},
    qiJiao60 : function(v) {return v ? "60分起叫" : ""},
    chou6 : function(v) {return v ? "去掉6" : ""},
};
GameCnDesc[MjClient.GAME_TYPE.SAN_DA_HA_NEW] = {
    SAN_DA_HA_difen: GameCnDescDefault.difen,
    SAN_DA_HA_allowCheckCard : function(v) {return v ? "允许查牌" : ""},
    SAN_DA_HA_touXiangXuXunWen : function(v) {return v ? "投降需询问" : ""},
    buKeZaiJiao : function(v) {return v ? "60分不可再叫" : ""},
    xiaoGuangFen : {25:"小光25分",30:"小光30分"},
    biChangZhu : function(v) {return v ? "比常主" : ""},
    SAN_DA_HA_doubleInSingleOut : function(v) {return v ? "双进单出" : ""},
    baoFuLiuShou : function(v) {return v ? "报副留守" : ""},
    qiJiao60 : function(v) {return v ? "60分起叫" : ""},
    chou6 : function(v) {return v ? "去掉6" : ""},
    yiDangRenShu6 : function(v) {return v ? "一档认输6分" : ""},
    daWuZhu : function(v) {return v ? "打无主" : ""},
    jiaoFenJiaPai : function(v) {return v ? "叫分加拍" : ""}
};
GameCnDesc[MjClient.GAME_TYPE.DAO_ZHOU_MJ] ={
    dianpaohu: function(v) {return v ? "自摸胡" : "";},
    mingzhua: function(v) {return v ? "明抓" : "暗抓";},
    fengding: function(v) {
        if (v && v > 0) {
            return v + "分封顶";
        }
        return "不封顶";
    },
    kepiao: function(v) {return v ? "外飘" : "";},
    songma: function(){return ""},
    zhuaMa: function(v) {return v + "码"}
};
GameCnDesc[MjClient.GAME_TYPE.HUAI_AN_CC]={
    zhongfabai:{ 1:"红中当小花",2:"中发白当小花",3:"中发白不当花",4:"中发当小花"},
    canGangScore: function(v, areaSelectMode) {
        if (v) {
            if (areaSelectMode["getGangScore"])
                return "杠牌直接得分";
            else
                return "杠牌有分";
        }
    },
    keZiSuan1Hua: function(v) {return v ? "刻子算1花" : ""},
    liu8zhang : function(v) {return v ? "留8张牌" : ""},
};
GameCnDesc[MjClient.GAME_TYPE.HUAI_AN_ERZ] = {
    qiduiKeBuTing: function(v) {return v ? "七对可不架听" : ""},
    huaianERZ_flowerNum: GameCnDescDefault.flowerCount,
};
GameCnDesc[MjClient.GAME_TYPE.LIAN_YUN_GANG] = {
    AutoZhuang: function(v) {return v ? "随机坐庄" : ""},
    IsThreeKouDouble : function(v) {return v ? "三口翻2倍" : "三口不翻倍"},
    gangkai4bei : function(v) {return v ? "杠开翻倍" : "杠开不翻倍"},
    duoHu: function(v) {return v ? "一炮多响" : "截胡"},
    wuWanFeng: function (v) {return v ? "无万无风牌":""}
};
/*  南京   */
GameCnDesc[MjClient.GAME_TYPE.NAN_JING] = {
    playType:{0:"进园子",1:"敞开头"},
    isHuaZa: function(v, areaSelectMode) {
        if (v && areaSelectMode["playType"] == 0) {
            return "花砸2";
        }
    },
    isJieZhuangBi: function(v, areaSelectMode) {
        if (v && areaSelectMode["playType"] == 0) {
            return "接庄比";
        }
    },
    islimit300: function(v, areaSelectMode) {
        if (areaSelectMode["playType"] == 1) {
            return v ?"单把300上限":"单把无限制";
        }
    },
}

GameCnDesc[MjClient.GAME_TYPE.NTHZ] ={
    zhuaniao:{0: "抓飞鸟",1:"抓四鸟",2:"抓六鸟"},
    piaofen:{0: "不飘分",1:"飘2分",2:"飘5分"},
}
GameCnDesc[MjClient.GAME_TYPE.PAO_DE_KUAI] = {
    mustPutHongTaoSan : function(v) {return v ? "先出红桃三" : ""},
    isPlayerShuffle:function(v){return v == 1 ? "手动切牌" : "系统切牌"},
}
GameCnDesc[MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE] = {
    niushibie_difen: GameCnDescDefault.difen,
    sandaidui: function(v) {return v ? "三带对" : ""},
    feijidailiandui: function(v) {return v ? "飞机带连对" : ""},
    zhuaweifen: function(v) {return v ? "抓尾分" : ""},
    teammode:{1:"摸队",2:"铁队"},
}
GameCnDesc[MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI] = {
    damazi_difen: GameCnDescDefault.difen,
    baoxi: function(v) {return v ? "报喜算分" : ""},
    teammode:{1:"摸队",2:"铁队"},
}

GameCnDesc[MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO] = {
    SAN_DA_HA_difen: GameCnDescDefault.difen,
    fengDing: function(v) {
        if (v > 0){
            return  v + "倍封顶";
        }

        return "";
    }
};

GameCnDesc[MjClient.GAME_TYPE.DA_YE_DA_GONG] = {
        catPartnerCards: function(v) {
            return v ? "可看队友手牌" : "";
        },
        showHandCount: function(v) {
            return v ? "显示手牌数" : "";
        },
        laiziPoint: function(v) {
            return v == 2 ? "癞子为2" : "癞子为3"
        },
        jieSuanDiFen: function(v) {
            return v == 1 ? "" : "积分底分x" + v;
        }
};
    

GameCnDesc[MjClient.GAME_TYPE.TONG_SHAN_DA_GONG] = {
    catPartnerCards: function(v) {
        return v ? "可看队友手牌" : "";
    },
    showHandCount: function(v) {
        return v ? "显示手牌数" : "";
    },
    jokerNum: function(v) {
        return v == 4 ? "4王" : "8王";
    },
    laiziPoint: function(v) {
        return v == 2 ? "癞子为2" : "癞子为3"
    },
    danZhaFengDing: function(v) {
        return "单炸封顶" + v + "笼";
    },
    postCardsWay: function(v) {
        return ["起牌拱","发牌拱","疯狂拱","变态拱"][v]
    },
    diFen: function(v) {
        return "积分底分x" + v;
    }
};

GameCnDesc[MjClient.GAME_TYPE.CHONG_YANG_DA_GUN] = {
    catPartnerCards: function(v) {
        return ["可看队友手牌",""][v];
    },
    showHandCount: function(v) {return v ? "显示手牌数" : ""},
    huaCardNum: function(v) {
        if (v == 0)
            return "";

        return v + "张花牌";
    },
    fourPure510K: function(v) {return v ? "4副纯510K" : ""},
    fourJokerCombination: function(v) {return v ? "4王" : ""},
    fourJokerHuaCard: function(v) {return v ? "4王+花" : ""},
    sevenXi: function(v) {return v ? "七喜" : ""},
    eightXi: function(v) {return v ? "八喜" : ""},
    trustWay: function(v, areaSelectMode){
        if (areaSelectMode.isTrustWhole)
            return ["托管当局", "托管当局+下一局", "整场托管"][v] || "";
        else
            return "";
    },
    diFen: function(v) {
        return "积分底分x" + v;
    }
};
    

GameCnDesc[MjClient.GAME_TYPE.DA_YE_510K] = {
    catPartnerCards: function(v) {
        return ["可看队友手牌",""][v];
    },
    showHandCount: function(v) {return v ? "显示手牌数" : ""},
    laiziOption: function(v) {
        if (v == 0){
            return "无癞子 ";
        }
        else if(v == 1){
            return " 有癞子（不讲硬炸）";
        }
        else if(v == 2){
            return "有癞子（讲硬炸）";
        }
    },
    useJiPaiQi: function(v) {return v ? "使用记牌器" : ""},
    fangHeShou: function(v) {return v ? "防合手" : ""},
    trustWay: function(v, areaSelectMode){
        if (areaSelectMode.isTrustWhole)
            return ["托管当局"] || "";
        else
            return "";
    },
    diFen: function(v) {
        return "积分底分x" + v;
    }
};
GameCnDesc[MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN] = {
    biDa:{0:"",1:"必打"},
    f510kYa4:{0:"",1:"纯五十K压4炸"},
    shuangWangKeZha:{0:"",1:"双王可炸"},
    baoShuangDingDa:{0:"",1:"下家报双出对子必须顶最大"},
    xiFen:{0:"",1:"带喜分"},
    zongZha:{0:"",1:"总炸"},
    showHandCount: function(v) {return v ? "显示手牌数" : ""},
    diFen: function(v) {
        return "积分底分x" + v;
    }
};

GameCnDesc[MjClient.GAME_TYPE.QI_CHUN_DA_GONG] = {
    catPartnerCards: function(v) {
        return ["可看队友手牌",""][v];
    },
    showHandCount: function(v) {return v ? "显示余牌" : ""},
    jieSuanDiFen: function(v) {
        return v > 0 ? "积分底分" + v : "";
    }
};

GameCnDesc[MjClient.GAME_TYPE.PAO_DE_KUAI_TY] = {
    paodekuaiTY_difen: GameCnDescDefault.difen,
    cardNumIndex:{0:"16张",1:"15张"},
    mustPut : function(v) {return v ? "" : "非必管"},
    // firstHeiTao3 : function(v) {return v ? "首局先出对比改变黑桃3" : ""},
    // 1:3人玩法有黑桃3首出,必须出3
    // 2：3人玩法有黑桃3首出,可以不出3
    // 3：2人玩法有黑桃3首出,必须出3
    // 4: 2人玩法，随机先手，可以不出3
    firstPutRule:function (v,a) {
        switch (v){
            case 1:{
                return (a && a.isPreRoundFirstRule==true)? "每局先出黑桃3":"首局先出黑桃3"
            }
            case 2:{
                return ""
            }
            case 3:{
                return (a && a.isPreRoundFirstRule==true)? "每局先出黑桃3":"首局先出黑桃3"
            }
            case 4:{
                return (a && a.isPreRoundFirstRule==true)? "每局随机先手":"首局随机先手"
            }
            default:{
                return ""
            }
        }
    },
    zhaDanBuChai : function(v) {return v ? "炸弹不可拆" : ""},
    can4dai2 : function(v) {return v ? "四带二" : ""},
    can4dai3 : function(v) {return v ? "四带三" : ""},
    hongTao10Niao : function(v) {return v ? "红桃10扎鸟" : ""},
    can3aZhaDan : function(v) {return v ? "3个A算炸弹" : ""},
    isPlayerShuffle:function(v){return v == 1 ? "手动切牌" : "系统切牌"},
    fangQiangGuan : function(v) {return v ? "防强关" : ""},
    isAutoTip : function (v) {return v ? "自动提示" : ""},
    hongTao10JiaFen : function (v) {return v ? "红桃10加5分" : ""},
    piaofen : {0:"", 1:"飘123", 2:"飘235", 3:"飘258", 4:"每局飘1", 5:"每局飘2"},
    playSpeed: {0:"快", 1:"中", 2:"慢"},
    isTrustWhole: function(v, areaSelectMode){
        return "";
    },
    trustWay: function(v, areaSelectMode){
        if (areaSelectMode.isTrustWhole)
            return ["托管当局", "托管当局+下一局", "整场托管"][v] || "";
        else
            return "";
    }
}

GameCnDesc[MjClient.GAME_TYPE.PAO_DE_KUAI_BHTY] = {
    paodekuaiTY_difen: GameCnDescDefault.difen,
    cardNumIndex:{0:"16张",1:"15张"},
    mustPut : function(v) {return v ? "" : "非必管"},
    // 首出规则
    //1、幸运翻牌（选项）：第一局出牌前，系统随机翻一张牌，归属为谁谁先出牌. 之后是赢家先出牌. 
    //2、红桃3（选项）：第一局发到红桃3玩家为庄家，庄家先出手出牌，后面每局都为上一局赢家.
    //3、红桃3首出（勾选了红桃3后才有）：首轮出牌，必须包含红桃3的牌型.
    firstPutRule:function (v,a) {
        switch (v){
            case 1:{
                return "幸运翻牌"
            }
            case 2:{
                return "红桃3"
            }
            case 3:{
                return"红桃3首出"
            }
            default:{
                return ""
            }
        }
    },
    zhaDanBuChai : function(v) {return v ? "炸弹不可拆" : ""},
    can4dai2 : function(v) {return v ? "四带二" : ""},
    can4dai3 : function(v) {return v ? "四带三" : ""},
    hongTao10Niao : function(v) {return v ? "红桃10扎鸟" : ""},
    can3aZhaDan : function(v) {return v ? "3个A算炸弹" : ""},
    isPlayerShuffle:function(v){return v == 1 ? "手动切牌" : "系统切牌"},
    fangQiangGuan : function(v) {return v ? "防强关" : ""},
    isAutoTip : function (v) {return v ? "自动提示" : ""},
    hongTao10JiaFen : function (v) {return v ? "红桃10加5分" : ""},
    piaofen : {0:"", 1:"飘123", 2:"飘235", 3:"飘258", 4:"每局飘1", 5:"每局飘2"},
    dingPF:function (v) {return  "飘"+v},
    playSpeed: {0:"快", 1:"中", 2:"慢"},
    isVieGuan:function(v){return v  ? "抢关" : ""},
    isTrustWhole: function(v, areaSelectMode){
        return "";
    },
    trustWay: function(v, areaSelectMode){
        if (areaSelectMode.isTrustWhole)
            return ["托管当局", "托管当局+下一局", "整场托管"][v] || "";
        else
            return "";
    }
}

GameCnDesc[MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN] = {
    paodekuaiEleven_difen: GameCnDescDefault.difen,
    mustPut : function(v) {return v ? "" : "非必管"},
    // firstHeiTao3 : function(v) {return v ? "首局先出对比改变黑桃3" : ""},
    // 1:3人玩法有黑桃3首出,必须出3
    // 2：3人玩法有黑桃3首出,可以不出3
    // 3：2人玩法有黑桃3首出,必须出3
    // 4: 2人玩法，随机先手，可以不出3
    firstPutRule:function (v,a) {
        switch (v){
            case 1:{
                return (a && a.isPreRoundFirstRule==true)? "每局先出黑桃6":"首局先出黑桃6"
            }
            case 2:{
                return ""
            }
            case 3:{
                return (a && a.isPreRoundFirstRule==true)? "每局先出黑桃6":"首局先出黑桃6"
            }
            case 4:{
                return (a && a.isPreRoundFirstRule==true)? "每局随机先手":"首局随机先手"
            }
            default:{
                return ""
            }
        }
    },
    zhaDanBuChai : function(v) {return v ? "炸弹不可拆" : ""},
    can4dai2 : function(v) {return v ? "四带二" : ""},
    can4dai3 : function(v) {return v ? "四带三" : ""},
    hongTao10Niao : function(v) {return v ? "红桃10扎鸟" : ""},
    isPlayerShuffle:function(v){return v == 1 ? "手动切牌" : "系统切牌"},
    fangQiangGuan : function(v) {return v ? "防强关" : ""},
    isAutoTip : function (v) {return v ? "自动提示" : ""},
    hongTao10JiaFen : function (v) {return v ? "红桃10加5分" : ""},
    piaofen : {0:"", 1:"飘123", 2:"飘235", 3:"飘258", 4:"每局飘1", 5:"每局飘2"},
    playSpeed: {0:"快", 1:"中", 2:"慢"}
}

GameCnDesc[MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO] = {
    paodekuaiTY_difen: GameCnDescDefault.difen,
    cardNumIndex:{0:"16张",1:"15张"},
    mustPut : function(v) {return v ? "" : "非必管"},
    // firstHeiTao3 : function(v) {return v ? "首局先出对比改变黑桃3" : ""},
    // 1:3人玩法有黑桃3首出,必须出3
    // 2：3人玩法有黑桃3首出,可以不出3
    // 3：2人玩法有黑桃3首出,必须出3
    // 4: 2人玩法，随机先手，可以不出3
    firstPutRule:function (v) {
        switch (v){
            case 1:{
                return "首局先出黑桃3"
            }
            case 2:{
                return ""
            }
            case 3:{
                return "首局先出黑桃3"
            }
            case 4:{
                return "首局随机先手"
            }
            default:{
                return ""
            }
        }
    },
    zhaDanBuChai : function(v) {return v ? "炸弹不可拆" : ""},
    can4dai2 : function(v) {return v ? "四带二" : ""},
    can4dai3 : function(v) {return v ? "四带三" : ""},
    hongTao10Niao : function(v) {return v ? "红桃10扎鸟" : ""},
    can3aZhaDan : function(v) {return v ? "3个A算炸弹" : ""},
    isPlayerShuffle:function(v){return v == 1 ? "手动切牌" : "系统切牌"},
    fangQiangGuan : function(v) {return v ? "防强关" : ""},
    isAutoTip : function (v) {return v ? "自动提示" : ""},
    hongTao10JiaFen : function (v) {return v ? "红桃10加5分" : ""},
    piaofen : {0:"", 1:"飘123", 2:"飘235", 3:"飘258"},
    playSpeed: {0:"快", 1:"中", 2:"慢"}
}
GameCnDesc[MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU] = {
    cardNumIndex:{0:"16张",1:"15张"},
    firstHeiTao3 : function(v) {return v ? "黑桃3先出" : "赢家先出"},
    isXiaoGuan : function(v) {return v ? "小关X2" : ""},
    isDaGuan : function(v) {return v ? "大关X3" : ""},
    isDaGuanX2 : function(v) {return v ? "大关X2" : ""},
    can3daiNum : {1: "3带1", 2: "3带2"},
    can4dai2 : function(v) {return v ? "4带2" : ""},
    can3aZhaDan : function(v) {return v ? "3个A算炸弹" : ""},
    isPlayerShuffle:function(v){return v == 1 ? "手动切牌" : "系统切牌"},
    isZhaDanJiaFen : function(v) {return v ? "炸弹加分" : ""},
    mustPut: function(v) {return v ? "必管" : "非必管"},
    difen : function(v) {return v ? "" : ""},
    canPutAnyFeiji : function(v) {return v ? "" : ""},

}
GameCnDesc[MjClient.GAME_TYPE.LEI_YANG_GMJ] ={
    diFen: function(v) {
        return v > 0 ? "低于" + v + "分翻倍" : "";
    },
    jieSuanDiFen: function(v) {
        return v == 1 ? "" : "积分底分x" + v;
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" },
}
GameCnDesc[MjClient.GAME_TYPE.PAO_DE_KUAI_JZ] = {
    payWay: ["房主付", "玩家平摊", "大赢家付"],
    cardNumIndex:{0:"经典玩法",1:"15张牌"},
    firstHeiTao3 : function(v) {return v ? "黑桃3先出" : ""},
    firstOutOption: {0:"赢家先出", 1:"", 2:"轮庄"},
    hongTao10Niao : function(v) {return v ? "红桃10扎鸟" : ""},
    isPlayerShuffle:function(v){return v == 1 ? "手动切牌" : "系统切牌"},
    playSpeed: {0:"快", 1:"中", 2:"慢"},
    baoDanPutMax : function(v) {return v ? "下家报单出大牌" : ""},
    playerPutZhaDan : function(v) {return v ? "打出玩家" : ""},
    zhaDanBuFanBei : function(v) {return v ? "炸弹不翻倍" : ""}
}

GameCnDesc[MjClient.GAME_TYPE.PAO_DE_KUAI_HA] = {
    mustPut: function(v) {return v ? "必管" : "非必管"},
    isXiaoGuan : function(v) {return v ? "小关X2" : ""},
    isDaGuan : function(v) {return v ? "大关X3" : ""},
    isDaGuanX2 : function(v) {return v ? "大关X2" : ""},
    mustPutHongTaoSan : function(v) {return v ? "红桃3先手" : "赢家先手(首局红桃3)"},
    can4dai2 : function(v) {return v ? "四带二" : ""},
    // can3dai2 : function(v) {return v ? "三带二" : ""},
    isZhaDanJiaFen : function(v) {return v ? "炸弹加分" : ""},
    tongHuaShun : function(v) {return v ? "同花顺" : ""},
    isPlayerShuffle:function(v){return v == 1 ? "手动切牌" : "系统切牌"},
    showCardNumber : function(v) {return v ? "" : ""},
    bombScore:function(v, areaSelectMode){return v == 0 ? ("炸弹加"+(areaSelectMode.bombScoreCnt==0? 5:10)+"分") : "炸弹翻倍"},
}
GameCnDesc[MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW] = {
    mustPut: function(v) {return v ? "必管" : "非必管"},
    mustPutHongTaoSan : function(v) {return v ? "红桃3先手" : "赢家先手(首局红桃3)"},
    can4dai2 : function(v) {return v ? "四带二" : ""},
    canZhaDanDai1 : function(v) {return v ? "炸弹可带一张" : ""},
    mustPut2 : function(v) {return v ? "2必管第一张A" : ""},
    bombScore:function(v, areaSelectMode){return v == 0 ? ("炸弹加"+(areaSelectMode.bombScoreCnt==0? 5:10)+"分") : "炸弹翻倍"},
    isXiaoGuan: function(v) {return ""},
    isDaGuan: function(v) {return ""},
    tongHuaShun : function(v) {return ""},
    can3dai2: function(v) {return ""},
    can3aZhaDan: function(v) {return ""},
    can3ge3ZhaDan: function(v) {return ""},
    isXunHangDaoDanPlay: function(v) {return v ? "巡航导弹玩法" : ""},
    isPlayerShuffle:function(v){return v == 1 ? "手动切牌" : "系统切牌"},
}

GameCnDesc[MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI] = {
    difen : function(v){return v == 1 ? "积分底分1分" : "积分底分2分"},
    mustPut: function(v) {return v ? "必管" : "非必管"},
    // //mustPutHongTaoSan : function(v) {return v ? "红桃3先手" : "赢家先手(首局红桃3)"},
    // firstOutOption : function(v){return v == 1 ? "每局红桃3先出" : "首局红桃3，续局赢家出"},
    // can4dai2 : function(v) {return v ? "四带二" : ""},
    // can4dai1 : function(v) {return v ? "炸弹带一张" : ""},
    // zhaDanFen : function(v) {return v ? "炸弹10分" : ""},
    showCardNumber : function(v) {return v ? "显示牌数" : ""},
    daGuan : function(v) {return v ? "大关" : ""},
    xiaoGuan : function(v) {return v ? "小关" : ""},
    firstOutOption : function(v, areaSelectMode) {
        if (areaSelectMode.maxPlayer == 2)
            return "赢家先手(首局随机)";
        else if (v == 0)
            return "赢家先手(首局红桃3)";
        else
            return "红桃3先手";
    },
    can4dai2 : function(v) {return v ? "四带二" : ""},
    can4dai1 : function(v) {return v ? "四帶一算炸弹" : ""},
    zhaDanFen: function(v, areaSelectMode) {
        if (v > 0)
            return "炸弹" + v * areaSelectMode.difen + "分";
        else
            return "";
    }
}

GameCnDesc[MjClient.GAME_TYPE.PAO_DE_KUAI_LYG] = GameCnDesc[MjClient.GAME_TYPE.PAO_DE_KUAI_HA];
GameCnDesc[MjClient.GAME_TYPE.SHU_YANG] ={
    flowerCount:{2:"胡牌底花2点",5:"胡牌底花5点"},
    duoHu: function(v) {return v ? "一炮多响" : "截胡"},
}
GameCnDesc[MjClient.GAME_TYPE.TONG_HUA] = {
    quetuigang : function(v) {return v ? "瘸腿蛋" : ""},
    qionghu : function(v) {return v ? "穷胡翻番" : ""},
    bimenhu : function(v) {return v ? "闭门胡翻番" : ""},
    zangang : function(v) {return v ? "攒蛋" : ""},
    sanmingsian : function(v) {return v ? "三明四暗" : ""},
    jieguanggang : function(v) {return v ? "借光蛋" : ""},
    duanmenhu : function(v) {return v ? "断门胡" : ""},
    wubuzhun : function(v) {return v ? "五不准" : ""},

    tonghua_difen: GameCnDescDefault.difen,
}
GameCnDesc[MjClient.GAME_TYPE.BAI_PU_LIN_ZI] ={
    maizhuang:{0:"不买庄",123:"一二三",234:"二三四",345:"三四五",5710:"五七十"},
    tiehu: function(v) {return v ? "贴胡" : ""},
    qitie: function(v, areaSelectMode) {
        if (areaSelectMode.tiehu) {
            if (v == 100) return "100胡起贴";
            if (v == 0) return "起贴不限制";
        }
        return "";
    },
    tiehuCount: function(v, areaSelectMode) {
        if (areaSelectMode.tiehu) {
            if (v == 20) return "贴20胡";
            if (v == 50) return "贴50胡";
        }
        return "";
    },
}
GameCnDesc[MjClient.GAME_TYPE.RU_GAO] ={
    maizhuang:{0:"不买庄",123:"一二三",234:"二三四",345:"三四五",5710:"五七十"},
    tiehu: function(v) {return v ? "贴胡" : ""},
    qitie: function(v, areaSelectMode) {
        if (areaSelectMode.tiehu) {
            if (v == 100) return "100胡起贴";
            if (v == 0) return "起贴不限制";
        }
        return "";
    },
    tiehuCount: function(v, areaSelectMode) {
        if (areaSelectMode.tiehu) {
            if (v == 20) return "贴20胡";
            if (v == 50) return "贴50胡";
        }
        return "";
    },
}
GameCnDesc[MjClient.GAME_TYPE.RU_GAO_MJH] ={
    canHuCount:{80:"80胡可胡",100:"100胡可胡"},
    tiehu: function(v) {return v ? "贴胡" : ""},
    qitie: function(v, areaSelectMode) {
        if (areaSelectMode.tiehu) {
            if (v == 100) return "100胡起贴";
            if (v == 0) return "起贴不限制";
        }
        return "";
    },
    tiehuCount: function(v, areaSelectMode) {
        if (areaSelectMode.tiehu) {
            if (v == 20) return "贴20胡";
            if (v == 50) return "贴50胡";
        }
        return "";
    },
}
GameCnDesc[MjClient.GAME_TYPE.HZ_TUI_DAO_HU] ={
    zhongfabai:{ 1:"红中当小花",2:"中发白当小花",3:"中发白不当花"},
    canGangScore: function(v, areaSelectMode) {
        if (v) {
            if (areaSelectMode["getGangScore"])
                return "杠牌直接得分,";
            else
                return "杠牌有分,";
        }
    },
    liu8zhang : function(v) {return v ? "留8张牌" : ""},
}
GameCnDesc[MjClient.GAME_TYPE.LIAN_SHUI] = {
    baoZhuangType:{0:"小包庄",1:"大包庄"},
    zhuangTing: function(v, areaSelectMode) {
        if (areaSelectMode.baoZhuangType == 1 && v) {
            return "必须听牌";
        }
    },
}
GameCnDesc[MjClient.GAME_TYPE.DOU_DI_ZHU_NT] = {
    bijiaoShuangwang : function(v) {return v ? "双王必叫" : ""},
    bijiaoSigeer : function(v) {return v ? "4个2必叫" : ""},
    bijiaoWangshuanger : function(v) {return v ? "王+双2必叫" : ""},
    bijiaoZhadan : function(v) {return v ? "炸弹必叫" : ""},
    daiti : function(v) {return v ? "带踢翻倍" : ""},
    sidaier : function(v) {return v ? "四带二" : ""},
    farmerCanTi : function(v) {return v ? "农民可踢" : ""},
}
GameCnDesc[MjClient.GAME_TYPE.HUAI_AN_DOU_DI_ZHU] = {
    bijiaoShuangwang : function(v) {return v ? "双王必叫" : ""},
    bijiaoShuangZhadan : function(v) {return v ? "双炸弹必叫" : ""},
    daiti : function(v) {return v ? "带踢翻倍" : ""},
    farmerCanTi : function(v) {return v ? "农民可踢" : ""},
    zhafengding : { 12:"12分封顶",24:"24分封顶"},
    difen:{ 1:"积分底分1分",2:"积分底分2分",3:"积分底分3分",5:"积分底分5分"},

}
GameCnDesc[MjClient.GAME_TYPE.DOU_DI_ZHU_HA] = {
    bijiaoShuangwang : function(v) {return v ? "双王必叫" : ""},
    bijiaoSigeer : function(v) {return v ? "4个2必叫" : ""},
    bijiaoWangshuanger : function(v) {return v ? "王+双2必叫" : ""},
    bijiaoZhadan : function(v) {return v ? "炸弹必叫" : ""},
    daiti : function(v) {return v ? "带踢翻倍" : ""},
    sidaier : function(v) {return v ? "四带二" : ""},
    jiaofen : function (v) {return v ? "叫分" : ""},

}
GameCnDesc[MjClient.GAME_TYPE.PAO_DE_KUAI_NT] = {
    isBiMenFanBei : function(v) {return v ? "16张牌32分" : ""},
    handCardType:{ 0:"AAAA",1:"AAA+2"},
    winCountType:{ 0:"一个赢家",1:"两两结算"},
    isPlayerShuffle:function(v){return v == 1 ? "手动切牌" : "系统切牌"},
    isZhaDanJiaFen : function(v) {return v ? "炸弹加分" : ""},
    is15Thirty : function(v) {return v ? "15张牌30分" : ""},
    canZhaDanDai1 : function(v) {return v ? "炸弹可带一张" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN] = GameCnDesc[MjClient.GAME_TYPE.PAO_DE_KUAI_NT];

GameCnDesc[MjClient.GAME_TYPE.ML_HONGZHONG] = {
    maxPlayer: function(v, areaSelectMode) {
        if (areaSelectMode.convertible)
            return areaSelectMode.maxPlayer == 4 ? "自由人数" : "自由人2/3人";
        else
            return v ? v + "人场" : "";
    },
    zhuaniao: {0:"不抓鸟",1:"一鸟全中",2:"2鸟",4:"4鸟",6:"6鸟",9: "摸几奖几"},
    niaofen: function(v, areaSelectMode) {
        if (areaSelectMode.zhuaniao != 0) {
            if (v == 1) return "中鸟1分";
            if (v == 2) return "中鸟2分";
        }
        return "";
    },
    dianpaofen:function(v, areaSelectMode){
        if (areaSelectMode.dianpao && v >= 1) {
            return "点炮" + v + "分";
        }
        return "";
    },
    zimo:{2:"自摸积分底分X2",4:"自摸积分底分X4"},
    buzhongsuanquanzhong: function(v) {return v ? "不中算全中" : ""},
    quanzhongfanbei: function(v) {return v ? "全中翻倍" : ""},
    youhongzhongbujiepao:function(v, areaSelectMode){
        if (!areaSelectMode.dianpao) {
            return "";
        }
        return v ? "有红中不接炮":"";
    },
    youhongzhongkeqiangganghu: function(v, areaSelectMode) {
        if (!areaSelectMode.qianggang) {
            return "";
        }
        return v ? "有红中可抢杠胡" : "";
    },
    qiangGangQuanBao:function(v, areaSelectMode){
        if (!areaSelectMode.qianggang) {
            return "";
        }
        return v ? "抢杠全包" : "";
    },
    zhua1Zhong10:function(v){
        return v ? "抓1算10" : "";
    },
    
    wuhongzhongjia2niao: function(v) {return v ? "无红中加2鸟" : ""},
    hongzhongkehu: function(v) {return v ? "起手四红中可胡" : ""},
    duoHu: function(v) {return v ? "一炮多响" : ""},
    queYiMen: function(v) {return v ? "缺一门" : ""}, 

    piaofen:function(v, areaSelectMode){
        if (areaSelectMode.jiapiao) {
            return "自由下飘";
        }
        if (v == 4 ) {
            return "自由下飘";
        }
        if (v == 5 ) {
            return "首局定飘";
        }
        return v ? "飘" + v +"分" : "";
    },
    bihuType: function(v) {return v ? "有胡必胡" : ""},
    hongzhong8: function(v) {return v ? "8红中" : ""},
    zhuangxianfen : function (v) {return v ? "庄闲分" : ""},
    qdpphthqysjf: function (v) {return v ? "胡七对、碰碰胡、天胡、清一色加1分" : ""},
    piaoniao:function(v){return v ? "围一飘鸟" : ""},
    zuoZhuang:{0:"随机坐庄",1:"先进房坐庄"},
    fanBei: function(v, areaSelectMode) {
        if (v == 1 && areaSelectMode.fanBeiScore) {
            return "小于" + areaSelectMode.fanBeiScore + "分翻倍";
        }
        return "不翻倍";
    },
    huQingYiSeQiDuiJia2Niao:function(v){return v ? "胡清一色和七对加2鸟" : ""},
    huangZhuangGang:function(v){return v ? "荒庄荒杠" : ""},
    buKePeng:function(v){return v ? "不可碰" : ""},
    zhongHongZhongSuan12:function(v){return v ? "中红中算12" : ""},
    whzjiabeiType: {"-1": "", 0: "无红中底分加倍", 1: "无红中总分加倍"}
}
GameCnDesc[MjClient.GAME_TYPE.ML_HONGZHONG_ZERO] = {
    zhuaniao: {0:"不抓鸟",1:"一鸟全中",2:"2鸟",4:"4鸟",6:"6鸟",9: "摸几奖几"},
    niaofen: function(v, areaSelectMode) {
        if (areaSelectMode.zhuaniao != 0) {
            if (v == 1) return "中鸟1分";
            if (v == 2) return "中鸟2分";
        }
        return "";
    },
    dianpaofen:function(v, areaSelectMode){
        if (areaSelectMode.dianpao && v >= 1) {
            return "点炮" + v + "分";
        }
        return "";
    },
    zimo:{2:"自摸底分X2",4:"自摸底分X4"},
    buzhongsuanquanzhong: function(v) {return v ? "不中算全中" : ""},
    quanzhongfanbei: function(v) {return v ? "全中翻倍" : ""},
    youhongzhongbujiepao:function(v, areaSelectMode){
        if (!areaSelectMode.dianpao) {
            return "";
        }
        return v ? "有红中不接炮":"";
    },
    youhongzhongkeqiangganghu: function(v, areaSelectMode) {
        if (!areaSelectMode.qianggang) {
            return "";
        }
        return v ? "有红中可抢杠胡" : "";
    },
    qiangGangQuanBao:function(v, areaSelectMode){
        if (!areaSelectMode.qianggang) {
            return "";
        }
        return v ? "抢杠全包" : "";
    },
    zhua1Zhong10:function(v){
        return v ? "抓1算10" : "";
    },
    
    wuhongzhongjia2niao: function(v) {return v ? "无红中加2鸟" : ""},
    hongzhongkehu: function(v) {return v ? "起手四红中可胡" : ""},
    duoHu: function(v) {return v ? "一炮多响" : ""},
    queYiMen: function(v) {return v ? "缺一门" : ""}, 

    piaofen:function(v, areaSelectMode){
        if (areaSelectMode.jiapiao) {
            return "自由下飘";
        }
        if (v == 4 ) {
            return "自由下飘";
        }
        if (v == 5 ) {
            return "首局定飘";
        }
        return v ? "飘" + v +"分" : "";
    },
    bihuType: function(v) {return v ? "有胡必胡" : ""},
    hongzhong8: function(v) {return v ? "8红中" : ""},
    zhuangxianfen : function (v) {return v ? "庄闲分" : ""},
    qdpphthqysjf: function (v) {return v ? "胡七对、碰碰胡、天胡、清一色加1分" : ""},
    piaoniao:function(v){return v ? "围一飘鸟" : ""},
    zuoZhuang:{0:"随机坐庄",1:"先进房坐庄"},
    fanBei: function(v, areaSelectMode) {
        if (v == 1 && areaSelectMode.fanBeiScore) {
            return "小于" + areaSelectMode.fanBeiScore + "分翻倍";
        }
        return "不翻倍";
    },
    huQingYiSeQiDuiJia2Niao:function(v){return v ? "胡清一色和七对加2鸟" : ""},
    huangZhuangGang:function(v){return v ? "荒庄荒杠" : ""},
    buKePeng:function(v){return v ? "不可碰" : ""},
    zhongHongZhongSuan12:function(v){return v ? "中红中算12" : ""},
}
GameCnDesc[MjClient.GAME_TYPE.CHEN_ZHOU] = {
    buzhongsuanquanzhong: function(v) {return v ? "金鸟" : ""},
    duoHu: function(v) {return v ? "一炮多响" : ""},
    dianpao:function(v){return v ? "点炮胡" : "自摸胡"},
    dahu: function(v) {return v ? "大胡玩法" : ""},
    qidui: function(v) {return v ? "七对" : ""},
    zhuaniao:{ 0:"不抓鸟",2:"抓2鸟",4:"抓4鸟",6:"抓6鸟",8:"抓8鸟",10:"飞鸟"},
    hongzhong:{ 0:"无红中",4:"4红中",6:"6红中",8:"8红中"},
    zhuang:{ 0:"庄家坐庄",1:"随机坐庄"},
    piaofen:{ 0:"不飘",1:"飘1/2/3",2:"飘2/3/5"},
}

GameCnDesc[MjClient.GAME_TYPE.NING_XIANG_MJ] = {
    piaoniao: function(v) {return v ? "飘鸟" : ""},
    quankai: function(v) {return v ? "全开放" : ""},
    kechi: function(v) {return v ? "可吃牌" : ""},
    menQing:function(v){return v ? "门清" : ""},
    pinghuzimo: function(v) {return v ? "平胡不可接炮" : ""},
    zhuaniao:{ 0:"不抓鸟",1:"抓1鸟",2:"抓2鸟",4:"抓4鸟",6:"抓6鸟"},
    zhongniao:{ 0:"中鸟翻倍",1:"中鸟加分"},
    maipai:{40:"埋牌40张"},
}

GameCnDesc[MjClient.GAME_TYPE.YUAN_JIANG_MJ] = {
    kaqiao:function(v){return v ? "卡撬" : ""},
    jiangjianghu: function(v) {return v ? "门清将将胡可接胡" : ""},
    menqing: function(v) {return v ? "门清" : ""},
    guohuzimo: function(v) {return v ? "过胡不能接炮" : ""},
    yiziqiao:{ 0:"一字撬没喜",1:"一字撬有喜"},
    fanshu:{ 0:"无上限番数",24:"24番封顶"},
    mamahu:function(v) {return v ? "码码胡" : ""},
    qiduimenqing:function(v) {return v ? "七对有门清" : ""},
    zhuaniao:{ 1:"抓1鸟",2:"抓2鸟"},
    haidikeqianggang: function(v) {return v ? "海底牌可抢杠胡" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.NAN_XIAN_MJ] = {
    zhuaniao:{ 1:"抓1鸟",2:"抓2鸟"},
    zhongniao:{ 0:"飞鸟",1:"平鸟"},
    choupai:function(v, areaSelectMode){
        if(areaSelectMode.maxPlayer == 2){
            return v == 1 ? "抽一门" : "不抽牌";
        }
        return "";
    },
    xiaohukeqianggang:function (v) {return v ? "小胡可抢杠胡" : ""},
    haidijiafen:function (v) {return v ? "海底捞加2分" : ""},
    gangshanghuajiafen:function (v) {return v ? "杠上开花加2分" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI] = {
    zhuangxian : function (v) {return v ? "庄闲分" : ""},
    mantianfei : function (v) {return v ? "满天飞" : ""},
    piaofen : function (v) {return v ? "自由飘分" : ""},
}
GameCnDesc[MjClient.GAME_TYPE.CHAO_GU_MJ] = {
    zhuangxian:function (v) {return v ? "庄闲分" : ""},
    lianguan:function (v) {return v ? "4连冠" : ""},
    piaofen:{ "-1":"自由飘分",0:"不飘",1:"1分",2:"2分",3:"3分",4:"4分"},
    suanfen:{ 1:"112算分",2:"123算分"},
}
GameCnDesc[MjClient.GAME_TYPE.HAI_AN_MJ] = {
    lazi:{ 20:"20封顶",40:"40封顶",60:"60封顶",100:"100封顶"},
    biHu: function(v) {return v ? "有胡必胡" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.XUE_ZHAN] = {
    fengding:{ 0:"不封顶",3:"3番",4:"4番",5:"5番"},
    jingoudiao : function (v) {return v ? "金钩钓" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU] = {
    bankType:function(v) { return v == 1 ? "轮庄" : "胡牌庄" },
    piaoType:function(v) { return {1:"热飘",2:"冷飘",3:"不飘",4:"固定飘分"}[v]},
    qingZuiType:function(v) { return v == 1 ? "亲嘴0胡 " : "亲嘴2胡" },
    isPenPenHuTwo:function(v) { return v? "碰碰胡每个字不少于2个字," : "" },
    isZhaoGang6Xi:function(v) { return v ? "杠招6息," : "杠招4息," },
    isSuanFenDieJia:function(v) {return v ? "叠加算分" : "不叠加算分" },
    fanBei: function(v, areaSelectMode) {
        if (v == 1 && areaSelectMode.fanBeiScore) {
            return "小于" + areaSelectMode.fanBeiScore + "分翻倍";
        }
        return "不翻倍";
    },
    jieSuanDiFen: function(v) {
        return v == 1 ? "" : "积分底分x" + v;
    },
}

GameCnDesc[MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG] = {
    bankType:function(v) { return v == 1 ? "轮庄" : "胡牌庄" },
    diFen:function(v) { 
        if (v == 1) {
            return "1积分底分";
        } else if (v == 2) {
            return "2积分底分";
        } 

        return "4积分底分";
    },
    isQueYiSe:function(v) { return v ? "缺一色" : ""},
    isBanBanHu:function(v) { return v ? "板板胡" : ""},
    isLiuLiuShun:function(v) { return v ? "六六顺" : ""},
    isDaSiXi:function(v) { return v ? "大四喜" : ""},
    piaoFlag:function(v) { return v >= 2 ? "飘分" : "不飘"},
    isTongPao:function(v) { return v ? "通炮" : ""},
    isBiHu:function(v) { return v ? "强制胡牌" : ""},
    fanBei: function(v, areaSelectMode) {
        if (v == 1 && areaSelectMode.fanBeiScore) {
            return "小于" + areaSelectMode.fanBeiScore + "分翻倍";
        }
        return "不翻倍";
    },
    jieSuanDiFen: function(v) {
        return v == 1 ? "" : "积分底分x" + v;
    },
}

GameCnDesc[MjClient.GAME_TYPE.XUE_LIU] = {
    fengding:{ 0:"不封顶",3:"3番",4:"4番",5:"5番"},
    jingoudiao : function (v) {return v ? "金钩钓" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.HAI_AN_BAI_DA] = {
    lazi:{ 20:"20封顶",40:"40封顶",60:"60封顶",100:"100封顶"},
    gangchong: function(v) {return v ? "杠冲翻倍" : ""},
    qianggang: function(v) {return v ? "抢杠翻倍" : ""},
    menqing: function(v) {return v ? "门清" : ""},
    qidui: function(v) {return v ? "七对" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG] = {
    maizhuang:{0:"不买庄",123:"一二三",234:"二三四",345:"三四五",5710:"五七十"},
    sanlaohuimian: function(v) {return v ? "三老会面" : ""},
    qinghudaixifan: function(v) {return v ? "清胡带喜翻" : ""},
    piaohudaixibufan: function(v) {return v ? "飘胡带喜不翻" : ""},
    maxPlayer: function(v) {return ""},
    tiehu: function(v) {return v ? "贴胡" : ""},
    qitie: function(v, areaSelectMode) {
        if (areaSelectMode.tiehu) {
            if (v == 100) return "100胡起贴";
            if (v == 0) return "起贴不限制";
        }
        return "";
    },
    tiehuCount: function(v, areaSelectMode) {
        if (areaSelectMode.tiehu) {
            if (v == 20) return "贴20胡";
            if (v == 50) return "贴50胡";
        }
        return "";
    },
}

GameCnDesc[MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG] = {
    maizhuang:{0:"不买庄",123:"一二三",234:"二三四",345:"三四五",5710:"五七十"},
    sanlaohuimian: function(v) {return v ? "三老会面" : ""},
    maxPlayer: function(v) {return ""},
    tiehu: function(v) {return v ? "贴胡" : ""},
    qitie: function(v, areaSelectMode) {
        if (areaSelectMode.tiehu) {
            if (v == 100) return "100胡起贴";
            if (v == 0) return "起贴不限制";
        }
        return "";
    },
    tiehuCount: function(v, areaSelectMode) {
        if (areaSelectMode.tiehu) {
            if (v == 20) return "贴20胡";
            if (v == 50) return "贴50胡";
        }
        return "";
    },

}

GameCnDesc[MjClient.GAME_TYPE.DONG_HAI] = {
    isJiaZhu: function(v) {return v ? "可加注" : "不可加注"},
    duoHu: function(v) {return v ? "一炮多响" : "截胡"},
}


GameCnDesc[MjClient.GAME_TYPE.JIN_ZHONG_MJ] = {
    liuduo: function(v) {return v ? "留牌" : "不留牌"},
    shisanyao: function(v) {return v ? "可胡十三幺" : ""},
    baogang: function(v) {return v ? "点炮包杠" : ""},
    guohuzhinenglongpai: function(v) {return v ? "过胡只能胡龙牌" : ""},
    passhudapai: function(v) {return v ? "过胡胡大牌" : ""},
    calltingautohu: function(v) {return v ? "叫听自动胡" : ""},
    is68:function(v){return v ? "68张(2人)" : ""}
}

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ] = {
    benji: function(v) {return v ? "本鸡" : ""},
    wuguji: function(v) {return v ? "乌骨鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    gangkaiadd: function(v) {return v ? "杠开加10分" : ""},
    paiXinScoreOnly: function (v) {return v ? "" : ""},
    paiXinScoreBeiShu:function(v) {return "牌型分"+v+"倍"},
    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管" }
}


GameCnDesc[MjClient.GAME_TYPE.FEN_YANG_QUE_MEN] = {
    shisanyao: function(v) {return v ? "十三幺" : ""},
    baoTing: function(v) {return v ? "报听" : "不报听"},
    sanhuafeigang: function(v) {return v ? "三花不算杠" : ""},
    lunzhuang: function(v) {return v ? "轮庄" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN] = {
    liuduo: function(v) {return v ? "留牌" : "不留牌"},
    shisanyao: function(v) {return v ? "可胡十三幺" : ""},
    baogang: function(v) {return v ? "点炮包杠" : ""},
    guohuzhinenglongpai: function(v) {return v ? "过胡只能胡龙牌" : ""},
    passhudapai: function(v) {return v ? "过胡胡大牌" : ""},
    calltingautohu: function(v) {return v ? "叫听自动胡" : ""},
    is68:function(v){return v ? "68张(2人)" : ""}
}

GameCnDesc[MjClient.GAME_TYPE.LING_SHI_BIAN_LONG] = {
    liuduo: function(v) {return v ? "留牌" : "不留牌"},
    shisanyao: function(v) {return v ? "可胡十三幺" : ""},
    baogang: function(v) {return v ? "点炮包杠" : ""},
    guohuzhinenglongpai: function(v) {return v ? "过胡只能胡龙牌" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.LING_SHI_BAN_MO] = {
    liuduo: function(v) {return v ? "留牌" : "不留牌"},
    //shisanyao: function(v) {return v ? "可胡十三幺" : ""},
    //baogang: function(v) {return v ? "点炮包杠" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.PING_YAO_MA_JIANG] = {
    liuduo: function(v) {return v ? "留牌" : "不留牌"},
    shisanyao: function(v) {return v ? "可胡十三幺" : ""},
    baogang: function(v) {return v ? "点炮包杠" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.JIN_ZHONG_KD] = {
    playType:{ 0:"经典玩法",1:"不带风",2:"风耗子",3:"随机耗子",4:"双耗子"},
    biHu: function(v) {return v ? "有胡必胡" : ""},
    guoHuZiMo: function(v) {return v ? "过胡只能自摸" : ""},
    dahu: function(v) {return v ? "清一色一条龙加番" : ""},
    shisanyao: function(v) {return v ? "十三幺" : ""},
    zhuangfen: function(v) {return v ? "带庄" : ""},
    zhuangfenzimofanfan: function(v) {return v ? "庄分自摸翻倍" : ""},
    baogang: function(v) {return v ? "点炮包杠" : ""},
    xuanzuo: function(v) {return v ? "选座" : ""},
    haohuaqidui: function(v) {return v ? "豪华七对" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN] = {
    jinshu:{ 4:"4金",8:"8金"},
    zhuangxian: function(v) {return v ? "庄闲分" : ""},
    suojin: function(v) {return v ? "锁金" : ""},
    sanjinfengding: function(v) {return v ? "三金封顶" : ""},
    shisanyao: function(v) {return v ? "十三幺" : ""},
    shoujinbishang: function(v) {return v ? "首金必上" : ""},
    dianpaotongpei: function(v) {return v ? "点炮通赔" : ""},
    gangsuihuzou: function(v) {return v ? "杠随胡走" : ""},
    qidui: function(v) {return v ? "七对" : ""},
    qingyise: function(v) {return v ? "清一色" : ""},
    yitiaolong: function(v) {return v ? "一条龙" : ""},
    heisanfeng: function(v) {return v ? "黑三风" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.HE_JIN_KUN_JIN] = {
    jinshu:{ 4:"单金",8:"双金"},
    kunjinnum:{ 0:"",1:"捆1金",2:"捆2金"},
    jinfengding:{ 0:"2金封顶",1:"3金封顶",2:"4金封顶"},
    qidui: function(v) {return v ? "" : ""},
}
GameCnDesc[MjClient.GAME_TYPE.JING_LE_KOU_DIAN] = {
    dahu: function(v) {return v ? "大胡加10点" : ""},
    diejia: function(v) {return v ? "牌型叠加" : ""},
    daifeng: function(v) {return v ? "带风" : ""},
    bihu: function(v) {return v ? "有胡必胡" : ""},
    haohuaqidui: function(v) {return v ? "豪华七对" : ""},
    ziyise: function(v) {return v ? "字一色" : ""},
}
GameCnDesc[MjClient.GAME_TYPE.LV_LIANG_MA_JIANG] = {
    playType:{ 0:"经典玩法",1:"捉耗子",2:"双耗子"},
    guozi:{ 0:"",100:"100锅子"},
    biHu: function(v) {return v ? "有胡必胡" : ""},
    qidui: function(v) {return v ? "七对" : ""},
    guoHuZiMo: function(v) {return v ? "过胡只能自摸" : ""},
    qingLongDouble:function(v) {return v ? "清一色一条龙加番" : ""},
    mingGangZiMo:function(v) {return v ? "明杠杠开算自摸" : ""},
    mingGangZiMoShuang:function(v) {return v ? "明杠杠开算自摸" : ""},
    jiaZhuangFen: function(v) {return v ? "庄分" : ""},
    zimo12: function(v) {return v ? "1、2点可自摸" : ""}
}
GameCnDesc[MjClient.GAME_TYPE.ZHUO_HAO_ZI] = {
    playType:{ 0:"经典玩法",1:"单耗子",2:"双耗子"},
    guozi:{ 0:"",100:"100锅子"},
    qidui: function(v) {return v ? "七对" : ""},
    guoHuZiMo: function(v) {return v ? "过胡只能自摸" : ""},
    qingLongDouble:function(v) {return v ? "清一色一条龙加番" : ""},
    mingGangZiMo:function(v) {return v ? "明杠杠开算自摸" : ""},
    mingGangZiMoShuang:function(v) {return v ? "" : ""},
    jiaZhuangFen: function(v) {return v ? "带庄" : ""},
    zimo12: function(v) {return v ? "1、2点可自摸" : ""},
    fenghaozi:{0:"随机耗子",1:"风耗子"},
    haoZiAnGangScore:{100:"耗子暗杠100分",50:"耗子暗杠50分"},
    haoZiDiaoJiangZiMo:{1:"耗子吊将自摸所有",2:"耗子吊将几扣几"},
}

GameCnDesc[MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN] = {
    playType:{ 0:"经典玩法",1:"不带风",2:"带耗子",4:"双耗子"},
}

GameCnDesc[MjClient.GAME_TYPE.RU_GAO_ER] = {
    maizhuang:{0:"不买庄",123:"一二三",234:"二三四",345:"三四五",5710:"五七十"},
    qinghu: function(v) {return v ? "清胡" : ""},
    piaohu: function(v) {return v ? "飘胡" : ""},
    shengyihu:function(v){return v ? "剩一胡" : ""},
    tahu: function(v) {return v ? "塔胡100分起胡" : ""},
    tahu80: function(v) {return v ? "塔胡80分起胡" : ""},
    tahuUnlimited: function(v) {return v ? "塔胡不限分数" : ""},
    fanBei: function(v, areaSelectMode) {
        if (v === 0) {
            return "不翻倍";
        }
        else if(v === 1 && areaSelectMode.fanBeiScore) {
            return "低于" + areaSelectMode.fanBeiScore + "分翻2倍";
        }
        else if(v === 2 && areaSelectMode.fanBeiScore) {
            return "低于" + areaSelectMode.fanBeiScore + "分翻3倍";
        }
    },
};

GameCnDesc[MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU] ={
    dahu: function(v) {return v ? "大胡" : "小胡"},
    baoting: function(v) {return v ? "报听" : ""},
    daifeng: function(v) {return v ? "带风" : ""},
    mustzimo: function(v) {return v ? "自摸胡" : ""},
    duoHu: function(v) {return v ? "一炮多响" : ""},
    gangsuihuzou: function(v) {return v ? "杠随胡走" : ""},
    queyimen: function(v) {return v ? "缺一门" : ""},
    youhubihu: function(v) {return v ? "有胡必胡" : ""},
    yizhangying: function(v) {return v ? "一张赢加番" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.PING_YAO_KOU_DIAN] = {
    guozi:{ 0:"",100:"100锅子"},
    haozi:function(v) {return v ? "带耗子" : ""},
    liuduo: function(v) {return v ? "留牌" : "不留牌"},
}

GameCnDesc[MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO] = {
    gangsuihu: function(v) {return v ? "杠随胡走" : ""},
    duoHu: function(v) {return v ? "一炮多响" : ""},
    shisanyao: function(v) {return v ? "十三幺" : ""},
    lunzhuang:function(v) {return v ? "轮庄" : ""},
    liuduo: function(v) {return v ? "留牌" : "不留牌"},
}

GameCnDesc[MjClient.GAME_TYPE.DA_TONG_GUAI_SAN_JIAO] = {
    qiDui: function(v) {return v ? "七对" : ""},
    fangZuoBi: function(v) {return v ? "防作弊" : ""},
    guoHuZhiNengZiMo: function(v) {return v ? "过胡只能自摸" : ""},
    lunzhuang:function(v) {return v ? "轮庄" : ""},
}
GameCnDesc[MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI] = {
    showHandNum:function(v) {return v ? "显示手牌数" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.LUAN_GUA_FENG] = {
    qidui: function(v) {return v ? "七对" : ""},
    fangzuobi: function(v) {return v ? "防作弊" : ""},
    guoHuZiMo: function(v) {return v ? "过胡自摸" : ""},
    gangpaisuanfen:function(v) {return v ? "杠牌算分" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3] = {
    baoting:function(v) {return v ? "报听" : ""},
    daizhuang:function(v) {return v ? "带庄" : ""},
    daifeng:function(v) {return v ? "带风" : ""},
    gangsuihuzou:function(v) {return v ? "杠随胡走" : ""},
    dianpaoshaogang:function(v) {return v ? "点炮烧杠" : ""},
    lunzhuang:function(v) {return v ? "轮庄" : ""},
    liuduo: function(v) {return v ? "留牌" : "不留牌"},
}

GameCnDesc[MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN] = {
    guozi:{ 0:"",100:"100锅子"},
    lunzhuang:function(v) {return v ? "轮庄" : ""},

}

GameCnDesc[MjClient.GAME_TYPE.SHOU_YANG_QUE_KA] = {
    lunzhuang:function(v) {return v ? "轮庄" : ""},
    liuduo: function(v) {return v ? "留牌" : "不留牌"},
    baogang: function(v) {return v ? "点炮包杠" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.JIN_ZHONG_LI_SI] = {
    liuduo:function(v) {return v ? "留牌" : "不留牌"},
    guaisanjiao:function(v) {return v ? "拐三角" : ""},
    gangsuihuzou:function(v) {return v ? "杠随胡走" : ""},
    baogang:function(v) {return v ? "点炮包杠" : ""},
    guohuzhinenglongpai: function(v) {return v ? "非龙牌过胡只能胡龙牌" : ""},
    passhudapai: function(v) {return v ? "过胡胡大牌" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.FEN_XI_YING_KOU] = {
    angangbukejian:function (v) {return v ? "暗杠不可见" : ""},
    zhuangfen2:function (v) {return v ? "庄分2分" : ""},
    isDaiFeng:function (v) {return v ? "带风胡" : ""},
    lunzhuang:function (v) {return v ? "轮庄" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI] = {
    playType:{ 0:"常规玩法",2:"风耗子",3:"随机耗子"},
    lunzhuang:function (v) {return v ? "" : ""},
    dianpao:function (v) {return v ? "点炮包杠" : ""},
    gangsui:function (v) {return v ? "杠随胡走" : ""},
    bihu:function (v) {return v ? "有胡必胡" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI] = {
    angangkejian:function (v) {return v ? "暗杠可见" : "暗杠不可见"},
    zhuangfen2:function (v) {return v ? "庄分2分" : "庄分1分"},
    lunzhuang:function(v) {return v ? "轮庄" : ""},
    gangsui:function (v) {return v ? "杠随胡走" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI] = {
    shuye:function (v) {return v ? "数页" : ""},
    zhuangfen1:function (v) {return v ? "庄分1分" : ""},
    lunzhuang:function(v) {return v ? "轮庄" : ""},
    gangsui:function (v) {return v ? "杠随胡走" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN] = {
    zhafengding:{3:"3炸封顶", 4:"4炸封顶",5:"5炸封顶",6:"6炸封顶",0:"不封顶"},
    scoreType:function(v) {return v ? "加分" : "翻番"},
    daiti:function(v) {return v ? "带踢" : ""},
    sidaisi:function(v) {return v ? "四带两对" : ""},
    zhaDanSanGeSan:function(v) {return v ? "3个3算两炸" : ""},
    shuangliandui:function (v) {return v ? "双连对":""},
    ti_byOrder:function(v) {return v ? "按顺序踢" : ""},
    ti_countScore:function(v) {return v ? "踢计入封顶" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.DOU_DI_ZHU_JZ] = {
    type:{jingdian:"经典斗地主", huanle:"欢乐斗地主"},
    zhafengding:{ 3:"3炸封顶",4:"4炸封顶",5:"5炸封顶"},
    sandai:{ 0:"三带一",1:"三带一对",2:"三带一+三带一对"},
    jiabei : function(v) {return v ? "加倍" : ""},
    bijiaoShuangwang : function(v) {return v ? "双王必叫" : ""},
    bijiaoSigeer : function(v) {return v ? "4个2必叫" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.DOU_DI_ZHU_GZ] = {
    type:{jingdian:"经典斗地主", huanle:"欢乐斗地主"},
    zhafengding:{ 3:"3炸封顶",4:"4炸封顶",5:"5炸封顶"},
    jiabei : function(v) {return v ? "加倍" : ""},
    bijiaoShuangwang : function(v) {return v ? "双王必叫" : ""},
    bijiaoSigeer : function(v) {return v ? "4个2必叫" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO] = {
    type:{jingdian:"经典斗地主", huanle:"欢乐斗地主"},
    zhafengding:{ 3:"3炸封顶",4:"4炸封顶",5:"5炸封顶"},
    jiabei : function(v) {return v ? "加倍" : ""},
    bijiaoShuangwang : function(v) {return v ? "双王必叫" : ""},
    bijiaoSigeer : function(v) {return v ? "4个2必叫" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU] = {
    type:{jingdian:"经典斗地主", huanle:"欢乐斗地主"},
    zhafengding:{ 3:"3炸封顶",4:"4炸封顶",5:"5炸封顶"},
    bijiaoShuangwang : function(v) {return v ? "双王必叫" : ""},
    bijiaoSigeer : function(v) {return v ? "4个2必叫" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.DOU_DI_ZHU_DA_TONG] = {
    type:{jingdian:"经典斗地主", huanle:"欢乐斗地主"},
    zhafengding:{ 3:"3炸封顶",4:"4炸封顶",5:"5炸封顶"},
    jiabei:{1:"不加倍",2:"加倍",4:"超级加倍"},
    bijiaoShuangwang : function(v) {return v ? "双王必叫" : ""},
    bijiaoSigeer : function(v) {return v ? "4个2必叫" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG] = {
    type:{jingdian:"经典斗地主"},
    zhafengding:{"-1":"不封顶", 3:"3炸封顶",4:"4炸封顶",5:"5炸封顶"},
    jiabei : function(v) {return v ? "加倍" : ""},
    bijiaoShuangwang : function(v) {return v ? "双王必叫" : ""},
    bijiaoSigeer : function(v) {return v ? "4个2必叫" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG] = {
    special:function(v) {return v ? "119/228/199/288夹" : ""},
    lunzhuang:function(v) {return v ? "" : ""},
    jiazhang:function (v) {return v ? "1928夹张" : ""},
    sanmen:function (v) {return v ? "三门要公" : ""},
    gangsui:function (v) {return v ? "杠随胡走" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.HONG_TONG_WANG_PAI] = {
    wanfa:{"sepai":"色牌","pinghu":"平胡","dajiangwangheifengbao":"大将王黑风报","duiwangdajiangbao":"对王大将报"},
    mianpeng:function(v) {return v ? "免碰" : ""},
    gangsuihu:function (v) {return v ? "杠随胡走" : ""},
    daiwangqingyise:function(v) {return v ? "带王清一色" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN] = {
    anting:function(v) {return v ? "暗听" : ""},
    gangsuihu:function (v) {return v ? "杠随胡走" : ""},
    baogang: function(v) {return v ? "点炮包杠" : ""},
    yidiansi: function(v) {return v ? "一点四" : ""},
    zimogang: function(v) {return v ? "自摸杠" : ""},
    liuduo: function(v) {return v ? "留垛" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN] = {
    isQingYiSe: function(v) {return v ? "混一色&清一色" : ""},
    duoHu:function (v) {return v ? "一炮多响" : ""},
    isQiDui: function(v) {return v ? "七对" : ""},
    maizhuang: function(v) {return v ? "下码" : ""},
    canChi: function(v) {return v ? "可吃牌" : ""},
    isFenCard: function(v) {return v ? "有风牌" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU] ={
    zhuaniao:{0:"不抓鸟",1:"单鸟(加倍)"},
    fengding:{30:"封顶30分",60:"封顶60分",120:"封顶120分"},
    jiangjianghu : function(v) {return v ? "将将胡" : ""},
    eatqinyise : function(v) {return v ? "清一色可吃" : ""},
    jiapiao : function(v) {return v ? "加飘" : ""},
    genzhangbudianpao: function(v) {return v ? "跟张不点炮" : ""},
    minggangguogangbunengbu : function(v){return v ? "明杠过杠不能再补" : ""},
    pphjpbsjjh : function(v){return v ? "碰碰胡接炮不算将将胡" : ""},
}

GameCnDesc[MjClient.GAME_TYPE.FAN_SHI_XIA_YU] ={
    type:{0:"大胡",1:"小胡"},
    lunzhuang : function(v) {return v ? "轮庄" : ""},
    dianpao : function(v) {return v ? "点炮包胡" : ""},
    huangzhuang : function(v) {return v ? "荒庄不荒杠" : ""},
    zhuangjiajia1 : function(v) {return v ? "庄家加1分" : ""},
    isTiandihu: function (v) {return v ? "天地胡" : ""},
    isDasixi: function (v) {return v ? "大四喜" : ""},
};

GameCnDesc[MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG] ={
    wanfa:{0:"34自摸",1:"345自摸"},
    lunzhuang : function(v) {return v ? "轮庄" : ""},
    biHu : function(v) {return v ? "有胡必胡" : ""},
    jiacheng:{0:"大胡翻番",1:"大胡加10点",2:"大胡加20点"},
    dianpaobaogang : function(v){return v ? "点炮包杠" : ""},
    pinghu : function(v){return v ? "平胡加1" : ""},
    dankou : function(v){return v ? "单口加1" : ""},
};

GameCnDesc[MjClient.GAME_TYPE.TY_ZHUANZHUAN] ={
    maxPlayer: function(v, areaSelectMode) {
        if (areaSelectMode.convertible)
            return areaSelectMode.maxPlayer == 4 ? "自由人数" : "自由人2/3人";
        else
            return v ? v + "人场" : "";
    },
    zhuaniao:{0:"不抓鸟",1:"上中下鸟",2:"2鸟",4:"4鸟",6:"6鸟",10:"一鸟全中",9:"摸几奖几",20:"1鸟(X2倍)",21:"2鸟(X3倍)"},
    niaoType:{1:"中鸟加分",2:"中鸟加倍"},
    zuoZhuang:{0:"随机坐庄",1:"先进房坐庄"},
    niaofen: function(v, areaSelectMode) {
        return areaSelectMode.niaoType == 1 && areaSelectMode.zhuaniao != 0 && areaSelectMode.zhuaniao != 1 && areaSelectMode.zhuaniao != 10 ? "中鸟" + v + "分":"";
    },
    liuniaowanfa: function(v, areaSelectMode){return areaSelectMode.zhuaniao == 6 && areaSelectMode.liuniaowanfa ? "不中算全中, 全中算翻倍" : "";},
    bihuType: function(v) {return v ? "有胡必胡" : "";},
    buzhongsuanquanzhong: function(v, areaSelectMode){
        if(areaSelectMode.zhuaniao == 2 || areaSelectMode.zhuaniao == 4 || areaSelectMode.zhuaniao == 6 || areaSelectMode.zhuaniao == 8){
            return v ? "不中算全中" : "";
        }
        return "";
    },
    jiapiao : function(v,areaSelectMode) {
        if(areaSelectMode.piaoType == 4)
            return "自由下飘";
        if(areaSelectMode.piaoType == 5)
            return "首局定飘";
        if(!v && areaSelectMode.piaoType < 3)
            return "飘"+ (areaSelectMode.piaoType + 1) + "分";

        return v ? "飘分" : ""
    },

    ziMoScore : function(v) {
        if(v === 0)
            return "自摸底分2";
        else if(v === 1)
            return "自摸底分4";
        return "";
    },

    dianPaoScore : function(v) {
        if(v === 0)
            return "点炮底分1";
        else if(v === 1)
            return "点炮底分2";
        return "";
    },

    queYiMen:function(v){return v ? "缺一门" : ""},
    zuoJiang258:function(v){return v ? "258做将" : ""},
    huangZhuangGang:function(v){return v ? "荒庄荒杠" : ""},
    canChi: function(v) {return v ? "可吃" : ""},
    qianggangsuanzimo: function(v) {return v ? "抢杠算自摸" : ""},
    qianggangsuandianpao: function(v) {return v ? "抢杠算点炮" : ""},
    quanzhongfanbei: function(v) {return v ? "全中翻倍" : ""},
    wuhongzhong: function(v, areaSelectMode){
        return ((areaSelectMode.qianggangsuanzimo || areaSelectMode.qianggangsuandianpao) &&
            areaSelectMode.wuhongzhong) ? "有红中可抢杠胡" : "";
    },
    piaoniao:function(v){return v ? "围一飘鸟" : ""},
    anzhuang:function(v){return v ? "按庄家抓鸟" : ""},
    buLunKong:function(v){return v ? "抓鸟不轮空" : ""},
    genzhangbudianpao: function(v) {return v ? "跟张不点炮" : "";},
    fanBei: function(v, areaSelectMode){
        return v == 0 ? "不翻倍" : "低于" + areaSelectMode.fanBeiScore + "分翻倍";
    },
    jieSuanDiFen: function(v) {
        return v == 1 ? "" : "积分底分x" + v;
    },
};

GameCnDesc[MjClient.GAME_TYPE.TY_HONGZHONG] ={
    zhuaniao: {0:"不抓鸟",1:"一鸟全中",2:"2鸟",4:"4鸟",6:"6鸟",9: "摸几奖几"},
    niaofen: function(v, areaSelectMode) {return areaSelectMode.zhuaniao != 0 && areaSelectMode.zhuaniao != 8? "中鸟" + v + "分":"";},
    bihuType: function(v) {return v ? "有胡必胡" : "";},
    jiapiao : function(v,areaSelectMode) {
        if(areaSelectMode.piaoType == 4)
            return "自由下飘";
        if(areaSelectMode.piaoType == 5)
            return "首局定飘";
        if(!v && areaSelectMode.piaoType < 3)
            return "飘"+ (areaSelectMode.piaoType + 1) + "分";

        return v ? "飘分" : ""
    },
    qianggang: {0:"",1:"抢杠算自摸",2:"抢杠算点炮",false:"",true:"抢杠算自摸"},
    qianggangquanbao: function(v, areaSelectMode) {return areaSelectMode.qianggang == 1 && v ? "抢杠全包" : "";},
    wuhongzhong: function(v, areaSelectMode){
        return (areaSelectMode.qianggang != 0 &&
            areaSelectMode.wuhongzhong) ? "有红中可抢杠胡" : "";
    },
    zuoZhuang:{0:"随机坐庄",1:"先进房坐庄"},
    zhua1Zhong10:function(v){
        return v ? "抓1算10" : "";
    },

    suiShiKeGang:function(v){return v ? "随时可杠" : ""},
    piaoType:function(v){return "";},
    buzhongsuanquanzhong: function(v) {return v ? "不中算全中" : "";}, 
    quanzhongfanbei: function(v) {return v ? "全中翻倍" : "";}, 
    wuhongzhongjia2niao: function(v) {return v ? "无赖子加2鸟" : "";},   
    diFen: function(v) {
        return v > 0 ? "低于" + v + "分翻倍" : "";
    },
    queYiMen : function(v) {return v ? "缺一门" : ""},
    hongZhongKeHu: function(v) {return v ? "起手4红中可胡" : "";},  
    siHongZhongKeHu: function(v) {return v ? "4红中可胡" : "";},  
    duoHu: function(v) {return v ? "一炮多响" : "";}, 
    huTypeJia1Fen: function(v) {return v ? "胡7对、碰碰胡、天胡、清一色+1分" : "";}, 
    jieSuanDiFen: function(v) {
        return v == 1 ? "" : "积分底分x" + v;
    },
    huQingYiSeQiDuiJia2Niao:function(v){return v ? "胡清一色和七对加2鸟" : ""},
    huangZhuangGang:function(v){return v ? "荒庄荒杠" : ""},
    buKePeng:function(v){return v ? "不可碰" : ""},
    zhongHongZhongSuan12:function(v){return v ? "中红中算12" : ""},
   
};

GameCnDesc[MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO] ={
    isMingWei: function(v) { return v ? "明偎" : "暗偎";},
    isJiaChui: function(v) { return v ? "加锤" : "不加锤" },
    isManualCutCard: function(v) { return v ? "手动切牌" : "系统切牌"},
    faPai:function(v){
        return ["普通", "畅爽", "极速"][v] || "";
    },
    maiPaiNum : function(v) {
        if (v>0) {
            return "2人埋牌" + v + "张";
        } else {
            return "";
        }
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" },
};

GameCnDesc[MjClient.GAME_TYPE.XU_ZHOU] ={
    duoHu: function(v) {return v ? "一炮多响" : "截胡"},
    isJiaZhu: function(v, areaSelectMode) {
        if (areaSelectMode.isJiaZhuyizui && v)
        {
            return "最多下一嘴";
        }
        else if(v)
        {
            return "下嘴"
        }
        else{
            return "不下嘴"
        }
    },
};

GameCnDesc[MjClient.GAME_TYPE.WU_TAI_KOU_DIAN] = {
    playType:{ 0:"经典玩法",1:"不带风",2:"风耗子",3:"随机耗子",4:"双耗子"},
    biHu: function(v) {return v ? "有胡必胡" : ""},
    guoHuZiMo: function(v) {return v ? "过胡只能自摸" : ""},
    dahu: function(v) {return v ? "清一色,一条龙加番" : ""},
    shisanyao: function(v) {return v ? "十三幺×3" : ""},
    zhuangfen: function(v) {return v ? "带庄" : ""},
    zhuangfenzimofanfan: function(v) {return v ? "庄分自摸翻倍" : ""},
    lunzhuang: function(v) {return v ? "轮庄" : ""},
    liuduo: function(v) {return v ? "留垛" : ""},
    dianpaobaogang: function(v) {return v ? "点炮包杠" : ""},
    dianpaoshaogang: function(v) {return v ? "点炮烧杠" : ""},
    haohuaqidui: function(v) {return v ? "豪华七对" : ""},
};

GameCnDesc[MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI] = {
    maxPlayer: function(v) {return v ? v + "人场" : ""},
    // isMaiPai: function(v) {return v ? "埋牌20张" : ""},
    isMaiPai : function(v, areaSelectMode) {
        if (v) {
            return "2人埋牌" + areaSelectMode.maiPaiNum + "张";
        } else {
            return "";
        }
    },
    isRandomZhuang: function(v) {return v ? "首轮随机庄" : ""},
    isKaWai: function(v) {return v ? "卡歪" : "不卡歪"},
    isDiHu: function(v) {return v ? "闲家地胡" : ""},
    isZhuangJiaDiHu: function(v) {return v ? "庄家地胡" : ""},
    isHuFirst: function(v) {return v ? "胡>歪" : ""},
    haoFen: function(v) {return v == 0 ? "豪:10/20/30" : "豪:20/30/40"},
    mingTang: function(v) {return v == 0 ? "名堂:60/80/100" : "名堂:80/100/120"},
    piaoFen: {0: "不飘", 1: "飘1/2/3", 2: "飘2/3/5"},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" },
};

GameCnDesc[MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI] = {
    isMaiPai: function(v, areaSelectMode) {
        return v ? ("2人埋牌" + areaSelectMode.maiPaiNum + "张") : "";
    },
    isBuKeChi: function(v) {return v ? "不可吃" : ""},
    isBuKeChiDuiJia: function(v) {return v ? "不可吃上家" : ""},
    isDaXiaoZiHu: function(v) {return v ? "大小字胡" : ""},
    isTianHuBaoTing: function(v) {return v ? "天胡报听" : ""},
    isMingTang: function(v) {return v ? "名堂" : ""},
    isHuaHu: function(v) {return v ? "花胡子" : ""},
    isRandomZhuang: function(v) {return v ? "首轮随机庄" : ""},
    isHuJiaYiXi: function(v) {return v ? "胡牌加一息" : ""},
    isMenZiFanFan: function(v) {return v ? "门子翻番" : ""},
    isNeiYuanBuKeJian: function(v) {return v ? "内元不可见" : ""},
    isSiShou: function(v) {return v ? "吃臭打臭死手" : ""},
    fengDing: {0:"100封顶", 1:"200封顶", 2:"300封顶", 3:"400封顶"},
    minHuXi: {0:"6息起胡", 1:"7息起胡"},
    fanShen: {0:"每局翻神", 1:"首局翻神"},
    fanBei:function(v) {return v == 0 ? "不翻倍" : "低于" + v + "分翻倍"},
    haiDiLaoScore:{0:"海底捞2倍", 1:"海底捞4倍"},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" },
};
GameCnDesc[MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI] = {
    mingTang: {0:"小卓版", 1:"大卓版"},
    maxPlayer: function(v, areaSelectMode) {
        if (areaSelectMode.convertible)
            return "自由人数";
        else
            return v ? v + "人场" : "";
    },
    maiPai20 : function (key,areaMode) {
        if(areaMode.convertible){
            var maiPaiCount = parseInt(areaMode.maiPaiType) * 10;
            if(maiPaiCount > 0) return "2人埋"+maiPaiCount+"张";
        }
        if(areaMode.maiPai20){
            var maiPaiCount = parseInt(areaMode.maiPaiType) * 10;
            if(maiPaiCount > 0) return "2人埋"+maiPaiCount+"张";
        }
        return "";
    },
    shouQianShou: function(v) {return v ? "手牵手" : ""},
    beiKaoBei: function(v) {return v ? "背靠背" : ""},
    chiBuChao2: function(v) {return v ? "吃牌不超过两张" : ""},
    fanBei: function(v, areaSelectMode) {
        if (v == 1 && areaSelectMode.fanBeiScore) {
            return "小于" + areaSelectMode.fanBeiScore + "分翻倍";
        }
        return "不翻倍";
    },
    isTianHuBaoTing: function(v) {return v ? "天胡报听" : ""},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" }
};

GameCnDesc[MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI] = {
    fengDing: {100:"封顶100息", 200:"封顶200息"},
    playType: {0:"五硬息"},
    maxPlayer: function(v, areaSelectMode) {
        if (areaSelectMode.convertible)
            return "自由人数";
        else
            return v ? v + "人场" : ""},
    diaoDiaoShou: function(v) {return v ? "吊吊手" : ""},
    anWaiLiu: function(v) {return v ? "暗歪/暗溜" : ""},
    wuXiPing: function(v) {return v ? "无息平" : ""},
    jiuDuiBan: function(v) {return v ? "九对半" : ""},
    huaHuZi: function(v) {return v ? "花胡子" : ""},
    canPiao: function(v) {return v ? "可飘" : ""},
    canDiHu: function(v) {return v ? "地胡" : ""},
    canZha: function(v) {return v ? "炸" : ""},
    chiPai: {0:"吃牌无限制", 1:"自揭自吃"},
    jieSuanDiFen: function(v) {
        return v == 1 ? "" : "积分底分x" + v;
    },
    maiPaiNum: function(v, areaSelectMode) {
        if (areaSelectMode.maiPai19) {
            return "埋牌19张";
        } else {
            return v == 1 ? "埋牌10张," : v == 2 ? "埋牌19张," : "不埋牌";
        }
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" }
};

GameCnDesc[MjClient.GAME_TYPE.AN_HUA_MA_JIANG] ={
    kingNum         : {7:"七王", 4:"四王"},
    zhuaniaoNum     : {0:"不抓鸟", 1:"抓1鸟", 2:"抓2鸟", 3:"抓3鸟", 4:"抓4鸟"},
    zhongNiaoType   : {0:"", 1:"159中鸟"},
    beiShu          : function(v) {return v + "倍积分底分"},
    wangdaiying     : function(v) {return v ? "王代硬"   : "" },
    isDuoHu         : function(v) {return v ? "一炮多响" : ""},
};

GameCnDesc[MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO] ={
    zhaniaoRule  : {2:"鸟必中", 3:"3人中鸟", 4:"4人中鸟"},
    zhuaniao     : {1:"抓1鸟", 2:"抓2鸟", 3:"抓3鸟", 4:"抓4鸟"},
    fengding     : {0:"不封顶", 2:"双番封顶", 100:"100封顶", 200:"200封顶"},
    zhuang:{ 0:"房主坐庄",1:"随机坐庄"},
    guding2zhang: function(v) {return v ? "固定两张" : ""},
};

GameCnDesc[MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI] ={
    huXiType: function(v) {return v == 3 ? "三息一囤" : "一息一囤";},
    isMingWei: function(v) { return v ? "明偎" : "暗偎";},
    isShiWuXiErFen: function(v) { return v ? "15息2底分" : "";},
    //isMaiPai: function(v) {return v ? "埋牌20张" : ""},
    isMaiPai : function(v, areaSelectMode) {
        if (v) {
            return "2人埋牌" + areaSelectMode.maiPaiNum + "张";
        } else {
            return "";
        }
    },
    zuoZhuang:{0: "首局随机坐庄", 1: "首局房主坐庄"},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" },
    qiHu:function(v){
        return [15, 18, 21][v] + "胡息起胡";
    },
    shiBaDa:function (v) {
        return v ? "十八大" : "";
    },
};

GameCnDesc[MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW] ={
    zhuaniaoNum     : {0:"不抓鸟", 1:"抓1鸟", 2:"抓2鸟", 4:"抓4鸟"},
    wangdaiying     : function(v) {return v ? "王代硬"   : "" },
    gangKaiNum      : function(v) {return v ? "杠开三张" : ""},  
    fenZhuangXian   : function(v) {return v ? "分庄闲" : ""},  
};

GameCnDesc[MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI] = {
    minHuXi: {0: "9息起胡", 1: "6息起胡", 2: "3息起胡"},
    xiToTun: {0: "3息1囤", 1: "1息1囤"},
    minXiToTun: function (v, areaSelectMode) {
        var minHuXi = areaSelectMode.minHuXi;
        var xiToTun = areaSelectMode.xiToTun;
        if (v == 0) {
            return ["9", "6", "3"][minHuXi] + "息1囤";
        } else {
            return ["9", "6", "3"][minHuXi] + "息" + [["3", "2", "1"], ["9", "6", "3"]][xiToTun][minHuXi] + "囤";
        }
    },
    biHu: {0: "", 1: "点炮必胡", 2: "有胡必胡"},
    wanFa: {0: "", 1: "红黑点", 2: "红黑点2倍"},
    isZiMoFanBei: function (v) {
        return v ? "自摸翻倍" : "";
    },
    isMaoHu: function (v) {
        return v ? "毛胡" : "";
    },
    isShiWuZhang: function (v) {
        return v ? "15张玩法" : "";
    },
    piaoFen: {0: "不飘", 1: "飘1/2/3", 2: "飘2/3/5"},
    zuoZhuang:function (v) {return "";},
    fanBei:{0: "不翻倍", 1: "≤10分翻倍", 2: "≤20分翻倍", 3: "≤30分翻倍", 4: "不限分翻倍"},
    mingLong:function (v) {return "";},
    isManualCutCard :function (v) {return "";},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" },
    payWay:function (v) {return "";},
    maiPaiNum: function(v) {return v > 0 ? ("2人埋牌" + v + "张") : ""}
};

GameCnDesc[MjClient.GAME_TYPE.GUI_YANG_ZI_PAI] = {
    minHuXi: {0: "9息起胡", 1: "6息起胡", 2: "3息起胡"},
    xiToTun: {0: "3息1囤", 1: "1息1囤"},
    biHu: {0: "", 1: "点炮必胡", 2: "有胡必胡"},
    wanFa: {0: "", 1: "红黑点", 2: "红黑点2倍"},
    isZiMoFanBei: function (v) {
        return v ? "自摸翻倍" : "";
    },
    isMaoHu: function (v) {
        return v ? "毛胡" : "";
    },
    isShiWuZhang: function (v) {
        return v ? "15张玩法" : "";
    },
    zuoZhuang:function (v) {return "";},
    fanBei:{0: "不翻倍", 1: "≤10分翻倍", 2: "≤20分翻倍", 3: "≤30分翻倍", 4: "不限分翻倍"},
    mingLong:function (v) {return "";},
    isManualCutCard :function (v) {return "";},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" },
    payWay:function (v) {return "";},
    maiPaiNum:function(v) {return v > 0 ? ("2人埋牌" + v + "张") : ""}
};

GameCnDesc[MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI] = {
    minHuXi: {0: "15息起胡", 1: "9息起胡"},
    isMaiPai: function (v, mode) {
        return v ? ("2人埋牌" + mode.maiPaiNum + "张") : "";
    },
    zhaNiaoNum: {0: "", 1: "扎2分", 2: "扎5分"},
    ziMoNum: {0: "", 1: "加1分", 2: "加2分", 3:"加2番", 4:"翻倍"},
    mingTangNum: {0: "十六小", 1: "十八小"},
    isHaiDi: function (v) {
        return v ? "海底胡" : "";
    },
    isHaiDiSiFan: function (v) {
        return v ? "海底胡4番" : "";
    },
    isJiaHongJiaXiao: function (v) {
        return v ? "加红加小加大" : "";
    },
    isJiaYiFen: function (v) {
        return v ? "27胡加1分" : "";
    },
    isShuaHouSiFan: function (v) {
        return v ? "耍候4番" : "";
    },
    isMingWei: function (v) {
        return v ? "明偎" : "";
    },
    zuoYa: {0: "坐压0分", 1: "坐压1分", 2: "坐压2分", 3: "坐压4分"},
    shouJu: {0: "首局房主庄", 1:"首局随机庄"},
    faPai:function(v){
        return ["普通", "畅爽", "极速"][v];
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" },
};

GameCnDesc[MjClient.GAME_TYPE.NING_XIANG_KAI_WANG] = {
    fengding      : {0:"大胡3番封顶", 1:"大胡不封顶"},
    mustzimo      : {0:"", 1:"只能自摸胡"},
    wangCount     : {1:"开单王",  2:"开双王"},
    huCount       : {1:"",  2:"开杠可胡2张"},
    zhuaniaoNum   : {0:"不抓鸟", 1:"抓1鸟", 2:"抓2鸟", 4:"抓4鸟", 6:"抓6鸟"},
    zuoYa         : {0:"坐压0分", 1:"坐压1分", 2:"坐压2分", 4:"坐压4分"},
    niaoScoreType: function(v, areaSelectMode) {
        if (areaSelectMode.zhuaniaoNum != 0) {
            if (v == 1) return "中鸟加倍";
            if (v == 2) return "中鸟加分";
        }
        return "";
    },
    canChi        : function(v) {return v ? "可以吃"   : "" },
    chouPai       : function(v) {return v ? "抽牌40张" : ""},  
    piaoniao      : function(v) {return v ? "飘鸟" : ""},  
};

GameCnDesc[MjClient.GAME_TYPE.YUE_YANG_PENG_HU] = {
    biHu      : {0:"不强制胡牌", 1:"强制胡牌"},
    zhongZhuang : {0:"连中", 1: "4首乘法", 2: "中庄x2"},
    zuoZhuang : {0:"先进房坐庄", 1: "随机坐庄"},
    isZhuangPao : function(v){
        return v ? "庄炮" : "";
    },
};

GameCnDesc[MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG] ={
    zhuaniao:{1:"抓1鸟",2:"抓2鸟"},
    zhongNiaoType:{1:"中鸟翻番",2:"中鸟加倍"},
    huType: function(v, areaSelectMode) {
        if (areaSelectMode.maxPlayer == 2) {
            return v == 1 ? "炮胡3自摸2" : "炮胡2自摸3";
        }
        return "";
    },
    niaoType: function(v, areaSelectMode) {
        if (areaSelectMode.maxPlayer == 2 || areaSelectMode.convertible) {
            return v == 0 ? "159中鸟" : v == 1 ? "单数中鸟" : "鸟必中";
        }
        return "";
    },
    baoTing : function(v) {return v ? "报听" : ""},
    canChi : function(v) {return v ? "可吃牌" : ""},
    haohuaqidui : function(v) {return v ? "豪华七对" : ""},
    liuduo : function(v){return v ? "留牌" : ""},
    zimohu : function(v){return v ? "自摸胡" : ""},
    gangKaiNum : function(v){return v ? "杠后3张牌" : ""},
    qiangGangTianHu : function(v){return v ? "天胡可抢杠" : ""},
    daJinDaChu : function(v){return v ? "大进大出" : ""},
    gangHouPaoFen : function(v){return v ? "杠后炮加杠上花" : ""},
    fengding : function(v){return v ? v + "分封顶" : "不封顶"},
    guoHuQiangGang: function(v){return v ? "过胡可抢杠" : ""},
    qingYiSeQiDui: function(v){return v ? "清一色七对" : ""},
    jiangJiangHuQiDui: function(v){return v ? "将将胡七对" : ""},
};

GameCnDesc[MjClient.GAME_TYPE.HY_LIU_HU_QIANG] ={
    xiNum : {6: "6息", 9: "9息", 10: "10息", 15: "15息"},
    suanfenType : {0: "3息1囤(1底分)", 1: "3息1囤(2底分)", 2: "1息1囤"},
    xingType : {0: "不带醒", 1: "随醒", 2: "翻醒"},
    isYiwushi : function(v) {return v ? "一五十" : ""},
    isHongheidian : function(v) {return v ? "红黑点" : ""},
    isTianhu : function(v) {return v ? "天胡" : ""},
    is21Zhang : function(v) {return v ? "21张" : ""},
    isTiandihu : function(v) {return v ? "天地胡" : ""},
    isDihu : function(v) {return v ? "地胡" : ""},
    isMaiPai : function(v, areaSelectMode) {
        if (v) {
            return "2人埋牌" + areaSelectMode.maiPaiNum + "张";
        } else {
            return "";
        }
    },
    bihuType : {0: "有胡必胡", 1: "点炮必胡", 2: ""},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" },
    payWay: function(){return ""},
    diFen: function(v){
        var msg = "";
        switch(v){
            case -1:
                msg = "不翻倍";
                break;
            case 10000:
                msg = "不限分翻倍";
                break;
            default:
                msg = "少于" + v + "分翻倍";
                break;
        }
        return msg;
    },
    faPai:function(v){
        return ["普通", "畅爽", "极速"][v] || "";
    }
};

GameCnDesc[MjClient.GAME_TYPE.YI_YANG_MA_JIANG] = {
    zhuaniao:{1:"抓1鸟", 2:"抓2鸟", 3:"抓3鸟"},
    baoting : function(v) {return v ? "报听" : ""},
    menqing : function(v){return v ? "门清" : ""},
    zhongNiaoType : {1:"159中鸟", 2:"单数中鸟", 3:"全中鸟"},
    yiziqiaoYouXi : function(v){return v ? "一字撬有喜" : ""},
    fengding : {0:"不封顶", 1:"32分", 2:"64分", 3:"128分", 4:"24分"},
    baotingAG:function(v){return v ? "报听只能暗杠": ""},
    pphOrjjh: function(v){return v ? "碰碰胡将将胡不叠加" : ""},
    zhongNiaoJiaBei: function(v){return v ? "中鸟加倍" : ""},
    danDiaoXifen: function(v){return v ? "单调算喜分" : ""},
    haiDiNiaoSanGe: function(v){return v ? "海底鸟三个" : ""},
    maiPaiCount: function(v){return v != 0 ? "埋牌" + v + "张" : ""},
    fangPaoFanBei: function(v){return v  ? "放炮翻倍" : ""},
    yiTiaoLong:function(v){return v  ? "一条龙" : ""},
    menQingJiangHuBuJiePao: function(v){return v ? "门清将将胡不可接炮" : ""},
    genZhang: function(v){return v ? "跟张" : ""}
}
GameCnDesc[MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN] ={
    maxPlayer: function(v) {return v ? v + "人场" : ""},
    quDiao67: function(v) {return v == 1 ? "" :"去除6、7"},
    xiFen: function(v) {return v ? "乘法" : "加法" },
    paiMing:{0:"60/-60",1:"100/-40/-60",2:"100/-30/-70",3:"40/0/-40",4:"100/-20/-30/-50"},
    jiangFen:{0:"奖分100",1:"奖分200",2:"奖分300"},
    jieSuanDiFen:function(v) {return "积分底分X"+v},
};

GameCnDesc[MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI] = {
    minHuXi: {0: "9息起胡", 1: "6息起胡", 2: "3息起胡"},
    xiToTun: {0: "3息1囤", 1: "1息1囤"},
    maoHuType:{0: "", 1: "毛胡(10胡)", 2:"毛胡(15胡)"},
    // minXiToTun: function (v, areaSelectMode) {
    //     var minHuXi = areaSelectMode.minHuXi;
    //     var xiToTun = areaSelectMode.xiToTun;
    //     if (v == 0) {
    //         return ["9", "6", "3"][minHuXi] + "息1囤";
    //     } else {
    //         return ["9", "6", "3"][minHuXi] + "息" + [["3", "2", "1"], ["9", "6", "3"]][xiToTun][minHuXi] + "囤";
    //     }
    // },
    biHu: {0: "", 1: "点炮必胡", 2: "有胡必胡"},
    // wanFa: {0: "", 1: "红黑点", 2: "红黑点2倍"},
    // isZiMoFanBei: function (v) {
    //     return v ? "自摸翻倍" : "";
    // },
    // isMaoHu: function (v) {
    //     return v ? "毛胡" : "";
    // },
    // isShiWuZhang: function (v) {
    //     return v ? "15张玩法" : "";
    // },
    piaoFen: {0: "不飘", 1: "飘1/2/3", 2: "飘2/3/5"},
    mingLong: {0: "发牌后明龙", 1: "出牌后明龙"},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" },
    maiPaiNum: function(v) {
        return v > 0 ? ("2人埋牌" + v + "张") : "";
    }
};

GameCnDesc[MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI] = {
    minHuXi: {0: "9息起胡", 1: "6息起胡", 2: "3息起胡"},
    tunNum: {0: "无囤", 1: "1囤", 2: "2囤", 3: "3囤", 4: "4囤", 5: "5囤"},
    fengDing:{0: "", 100: "100封顶", 200: "200封顶", 300: "300封顶"},
    playType:{1: "全名堂", 2: "红黑点", 3:"多红对"},
    fanBei: function(v, areaSelectMode) {
        if (v == 1 && areaSelectMode.fanBeiScore) {
            return "小于" + areaSelectMode.fanBeiScore + "分翻倍";
        }
        return "不翻倍";
    },
    playList: function (arr) {
        var str = "";
        for(var i = 0; i< arr.length; i++)
        {
            switch (arr[i])
            {
                case 2 :
                    str += "天胡,";
                    break;
                case 3 :
                    str += "地胡,";
                    break;
                case 4 :
                    str += "海底胡,";
                    break;
                case 5 :
                    str += "红胡,";
                    break;
                case 6 :
                    str += "黑胡,";
                    break;
                case 7 :
                    str += "点胡,";
                    break;
                case 8 :
                    str += "大胡,";
                    break;
                case 9 :
                    str += "小胡,";
                    break;
                case 10 :
                    str += "对子胡,";
                    break;
                case 11 :
                    str += "大团圆,";
                    break;
                case 12 :
                    str += "行行息,";
                    break;
                case 13 :
                    str += "耍候,";
                    break;
                case 14 :
                    str += "听胡,";
                    break;
                case 15 :
                    str += "黄番2倍,";
                    break;
                case 16 :
                    str += "假行行,";
                    break;
                case 17 :
                    str += "四七红,";
                    break;
                case 18 :
                    str += "背靠背,";
                    break;
                case 19 :
                    str += "假背靠背,";
                    break;
                case 20 :
                    str += "盖盖胡,";
                    break;
                case 21 :
                    str += "三提五坎,";
                    break;
            }
        }
        return str;
    },
    hongHeiDianList: function (arr) {
        var str = "";
        for(var i = 0; i< arr.length; i++)
        {
            switch (arr[i])
            {
                case 21 :
                    str += "红胡,";
                    break;
                case 22 :
                    str += "点胡,";
                    break;
                case 23 :
                    str += "黑胡,";
                    break;
                case 24 :
                    str += "红乌,";
                    break;
                case 25 :
                    str += "对子胡,";
                    break;
            }
        }
        return str;
    },
    duoHongDuiList: function (arr) {
        var str = "";
        for(var i = 0; i< arr.length; i++)
        {
            switch (arr[i])
            {
                case 31 :
                    str += "红胡,";
                    break;
                case 32 :
                    str += "点胡,";
                    break;
                case 33 :
                    str += "黑胡,";
                    break;
                case 34 :
                    str += "对子胡,";
                    break;
                case 35 :
                    str += "天胡,";
                    break;
                case 36 :
                    str += "地胡,";
                    break;
                case 37 :
                    str += "海胡,";
                    break;
                case 38 :
                    str += "听胡,";
                    break;
                case 39 :
                    str += "黄番,";
                    break;
            }
        }
        return str;
    },
    maiPai20:function(key, areaMode){
        if(areaMode.maiPai20 && areaMode.hasOwnProperty("maiPaiType")){
            var maiPaiCount = parseInt(areaMode.maiPaiType) * 10;
            if(maiPaiCount > 0) return "2人埋牌"+maiPaiCount + "张";
        }
        return "";
    },
    jieSuanDiFen: function(v) {
        return v == 1 ? "" : "积分底分x" + v;
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" },
};
GameCnDesc[MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI] = {
    minHuXi: {0: "9息起胡", 1: "6息起胡", 2: "3息起胡"},
    tunNum: {0: "无囤", 1: "1囤", 2: "2囤", 3: "3囤", 4: "4囤", 5: "5囤"},
    fengDing:{0: "", 100: "100封顶", 200: "200封顶", 300: "300封顶"},
    playType:{1: "全名堂", 2: "红黑点", 3:"多红对"},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管"},
    fanBei: function(v, areaSelectMode) {
        if (v == 1 && areaSelectMode.fanBeiScore) {
            return "小于" + areaSelectMode.fanBeiScore + "分翻倍";
        }
        return "不翻倍";
    },
    playList: function (arr) {
        var str = [];
        for(var i = 0; i< arr.length; i++)
        {
            switch (arr[i])
            {
                case 2 :
                    str.push("天胡");
                    break;
                case 3 :
                    str.push("地胡");
                    break;
                case 4 :
                    str.push("海底胡");
                    break;
                case 5 :
                    str.push("红胡");
                    break;
                case 6 :
                    str.push("黑胡");
                    break;
                case 7 :
                    str.push("点胡");
                    break;
                case 8 :
                    str.push("大胡");
                    break;
                case 9 :
                    str.push("小胡");
                    break;
                case 10 :
                    str.push("对子胡");
                    break;
                case 11 :
                    str.push("大团圆");
                    break;
                case 12 :
                    str.push("行行息");
                    break;
                case 13 :
                    str.push("耍候");
                    break;
                case 14 :
                    str.push("听胡");
                    break;
                case 15 :
                    str.push("黄番2倍");
                    break;
                case 16 :
                    str.push("假行行");
                    break;
                case 17 :
                    str.push("四七红");
                    break;
                case 18 :
                    str.push("背靠背");
                    break;
            }
        }
        return str;
    },
    hongHeiDianList: function (arr) {
        var str = [];
        for(var i = 0; i< arr.length; i++)
        {
            switch (arr[i])
            {
                case 21 :
                    str.push("红胡");
                    break;
                case 22 :
                    str.push("点胡");
                    break;
                case 23 :
                    str.push("黑胡");
                    break;
                case 24 :
                    str.push("红乌");
                    break;
                case 25 :
                    str.push("对子胡");
                    break;
            }
        }
        return str;
    },
    duoHongDuiList: function (arr) {
        var str = [];
        for(var i = 0; i< arr.length; i++)
        {
            switch (arr[i])
            {
                case 31 :
                    str.push("红胡");
                    break;
                case 32 :
                    str.push("点胡");
                    break;
                case 33 :
                    str.push("黑胡");
                    break;
                case 34 :
                    str.push("对子胡");
                    break;
                case 35 :
                    str.push("天胡");
                    break;
                case 36 :
                    str.push("地胡");
                    break;
                case 37 :
                    str.push("海胡");
                    break;
                case 38 :
                    str.push("听胡");
                    break;
                case 39 :
                    str.push("黄番");
                    break;
            }
        }
        return str;
    },
    jieSuanDiFen: function(v) {
        return v == 1 ? "" : "积分底分x" + v;
    },
    maiPai20:function(key,areaMode){
        if(areaMode.appType == 18){//邵阳湘乡告胡子
            if(!areaMode.maiPai20) return "";
            if(areaMode.maxPlayer > 2){
                return "";
            }else{
                var maiPaiCount = parseInt(areaMode.maiPaiType) * 10;
                if(maiPaiCount > 0) return "2人埋"+maiPaiCount+"张";
            }
        }else{
            return key ? "埋20张" : "";
        }
    }
};

GameCnDesc[MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI] = {
    diFen: { 0: "1分", 1: "2分",2: "3分", 3: "4分", 4: "5分"},
    fengDing:{0: "", 100: "100封顶", 200: "200封顶", 300: "300封顶"},
    playType:{0: "全名堂", 1: "土炮胡"},
    daLiuBaFantype:{ 0:"大六八番" ,1: "小六八番"},
    fanBei: function(v, areaSelectMode) {
        if (v == 1 && areaSelectMode.fanBeiScore) {
            return "小于" + areaSelectMode.fanBeiScore + "分翻倍";
        }
        return "不翻倍";
    },
    allPlayList: function (arr) {
        var str = "";
        for(var i = 0; i< arr.length; i++)
        {
            switch (arr[i])
            {
                case 0 :
                    str += "天胡,";
                    break;
                case 1:
                    str += "地胡,";
                    break;
                case 2 :
                    str += "海胡,";
                    break;
                case 3 :
                    str += "听胡,";
                    break;
                case 4:
                    str += "红胡，";
                    break;
                case 5 :
                    str += "黑胡,";
                    break;
                case 6:
                    str += "点胡,";
                    break;
                case 7 :
                    str += "大胡,";
                    break;
                case 8 :
                    str += "小胡,";
                    break;
                case 9:
                    str += "对子胡,";
                    break;
                case 10 :
                    str += "耍候,";
                    break;
                case 11:
                    str += "黄番,";
                    break;
                case 12:
                    str += "团胡,";
                    break;
                case 13:
                    str += "行行息,";
                    break;
                case 14:
                    str += "假行行,";
                    break;
                case 15:
                    str += "三提五坎,";
                    break;

            }
        }
        return str;
    },
    tuPlayList: function (arr) {
        var str = "";
        for(var i = 0; i< arr.length; i++)
        {
            switch (arr[i])
            {
                case 0 :
                    str += "红胡,";
                    break;
                case 1:
                    str += "黑胡,";
                    break;
                case 2 :
                    str += "点胡,";
                    break;
                case 3 :
                    str += "红乌,";
                    break;
                case 4:
                    str += "对子胡，";
                    break;


            }
        }
        return str;
    },
    maiPai20:function(key, areaMode){
        if(areaMode.maiPai20 && areaMode.hasOwnProperty("maiPaiType")){
            var maiPaiCount = parseInt(areaMode.maiPaiType) * 10;
            if(maiPaiCount > 0) return "2人埋牌"+maiPaiCount + "张";
        }
        return "";
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" },
};

GameCnDesc[MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN] = {
    shunType:{0:"", 1:"2可做连子"},
    hasBaoPai : function(v) {return v ? "可包牌" : ""},
    isAllXiFen : function(v) {return v ? "喜压死有分" : ""},
    hasFiveXi : function(v) {return v ? "5张算喜" : ""},
    isShowLeft : function(v) {return v ? "显示剩余牌" : ""},
    hasSanWangZha : function(v) {return v ? "三王算炸" : ""},
    hasSanWangXi : function(v) {return v ? "三王算喜" : ""},
    hasWings : function(v) {return v ? "允许三带二" : ""},
    hasShun : function(v) {return v ? "可以单顺子" : ""},
    isNo34 : function(v) {return v ? "不要3和4" : ""},
    isRandomTeam : function(v) {return v ? "随机找队友" : ""},
};

GameCnDesc[MjClient.GAME_TYPE.XIANG_XI_2710] = {
    zhuangFen :{0:"无庄分", 1:"2分", 2:"5分" ,3:"10分"},
    chongFen : function (v) { return v? "充分" : ""},
    zimoAddFen : function (v) { return v? "自摸加1" : ""},
    fanBei: function(v, areaSelectMode) {
        if (v == 1 && areaSelectMode.fanBeiScore) {
            return "小于" + areaSelectMode.fanBeiScore + "分翻倍";
        }
        return "不翻倍";
    },
    maiPaiType:function(key, areaMode){
        if(areaMode.hasOwnProperty("maiPaiType") && areaMode.maxPlayer == 2){
            var maiPaiType = areaMode.maiPaiType;
            if(maiPaiType > 0) return "2人埋牌" + (maiPaiType * 10) + "张";
        }else if(areaMode.maxPlayer == 2){
            return "2人埋牌20张";
        }
        return "";
    },
    jieSuanDiFen: function(v) {
        return v == 1 ? "" : "积分底分x" + v;
    },
}

GameCnDesc[MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI] = {
    isMaiPai : function (key,areaMode) { 
        if(areaMode.isMaiPai){
            var maiPaiCount = parseInt(areaMode.maiPaiType) * 10;
            if(maiPaiCount > 0) return "2人埋"+maiPaiCount+"张";
        }
        return "";
    },
    wanFa :{0:"倒一", 1:"倒二", 2:"倒三" ,3:"倒五",4:"倒八",5:"倒十"},
    fengDing :{0:"不封顶", 1:"单局20分", 2:"单局40分" ,3:"单局60分",4:"单局80分"},
    sanTiWuKan :{0:"不叠加名堂",1:"叠加名堂"},
    fanBei :{0:"不翻倍", 1:"≤10分翻倍", 2:"≤15分翻倍" ,3:"≤20分翻倍",4:"≤30分翻倍"},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" },
    faPai:function(v){
        return ["普通", "畅爽", "极速"][v] || "";
    },
}

// 运城风耗子
GameCnDesc[MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI] = {
    baogang : function (v) { return v? "点炮包杠" : ""},
    guoHuZiMo : function (v) { return v? "过胡只能自摸" : ""},
}


// 稷山扭叶子
GameCnDesc[MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI] = {
    lunzhuang : function (v) { return v? "轮庄" : ""},
    zhiKeZiMoHu : function (v) { return v? "只可自摸胡" : ""},
    daiFeng : function (v) { return v? "带风" : ""},
    tingPaiBuKou : function (v) { return v? "听牌不扣" : ""},
    liuPaiType :{0:"不留牌", 1:"杠留一张", 2:"杠留两张"},
};
GameCnDesc[MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG] ={
    zhuaniao: {0:"不抓鸟",1:"一鸟全中",2:"2鸟",4:"4鸟",6:"6鸟",8:"8鸟"},
    niaofen: function(v, areaSelectMode) {return areaSelectMode.zhuaniao != 0 && areaSelectMode.zhuaniao != 1 ? "中鸟" + v + "分":"";},
    liuniaowanfa: function(v, areaSelectMode){return areaSelectMode.zhuaniao == 6 && areaSelectMode.liuniaowanfa ? "不中算全中, 全中算翻倍" : "";},
    bihuType: function(v) {return v ? "有胡必胡" : "";},
    genzhangbudianpao: function(v) {return v ? "跟张不点炮" : "";},
    qianggang: {0:"",1:"抢杠算自摸",2:"抢杠算点炮",false:"",true:"抢杠算自摸"},
    qianggangquanbao: function(v, areaSelectMode) {return areaSelectMode.qianggang && v ? "抢杠全包" : "";},
    wuhongzhong: function(v, areaSelectMode){
        return (areaSelectMode.qianggang != 0 && areaSelectMode.wuhongzhong) ? "有红中可抢杠胡" : "";
    },
};

GameCnDesc[MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI] ={
    payWay: function(){return ""},
    bihuType: {0:"有胡必胡",1:"点炮必胡",2:"无点炮胡",},
    isHongheidian: function(v) {return v ? "红黑胡" : "";},
    diFen: function(v){
        var msg = "";
        switch(v){
            case -1:
                msg = "不翻倍";
                break;
            case 10000:
                msg = "不限分翻倍";
                break;
            default:
                msg = "少于" + v + "分翻倍";
                break;
        }
        return msg;
    },
    faPai:function(v){
        return ["普通", "畅爽", "极速"][v] || "";
    },
    isZiMoRate: function(v) {return v ? "自摸翻倍" : "";},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" },
};

GameCnDesc[MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA] ={
    tuototuo: function(v) {
        var str = "15胡起胡,有炮必接,满百结算,";
        
        switch(v){
            case 0:
                str += "不打坨";
                break ;
            case 1:
                str += "坨对坨四番";
                break ;
            case 2:
                str += "坨对坨三番";
                break ;
            case 3:
                str += "坨对坨两番";
                break ;
        }
        return str;
    },
    isjiepao : function(v) {return v ? "接炮一百封顶" : "接炮不封顶";},
    piaohu: function (v) {
        return v ? "飘胡" : "";
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA] ={
    maxPlayer: function(v, areaSelectMode) {
        if (areaSelectMode.convertible)
            return "自由人数";
        else
            return areaSelectMode.zuoXing ? "四人坐醒" : v ? v + "人场" : "";
    },
    isMaiPai:function(key,areaMode){
        if(areaMode.isMaiPai){
            var maiPaiCount = parseInt(areaMode.maiPaiType) * 10;
            if(maiPaiCount > 0) return "2人埋"+maiPaiCount+"张";
        }
        return "";
    },
    faPai: function(v) {return ["普通", "畅爽", "极速"][v]},
    fullperson : function(v) {return v ? "满人开始" : ""},
    tuototuo: function(v, areaSelectMode) {
        var niao_score = areaSelectMode.fenshutuo;
        var minHuXiType = areaSelectMode.minHuType;
        var str = minHuXiType == 1 ? "10胡起胡," : "15胡起胡,";
        str += "有炮必接,满百结算,";
        str += v == 0 ? "不打鸟" : v == 2 ? "胡息打鸟" : "打鸟" + niao_score + "分";
        return str;
    },
    keSiShou : function(v) {return v ? "可死守" : ""},
    piaohu : function(v) {return v ? "飘胡" : ""},
    zuoZhuang:function(v){
        return "首局" + (v == 0 ? "随机庄" : "房主庄");
    },
    isfending : function(v) {return v ? "两百封顶" : "四百封顶"},
    isjiepao : function(v) {return v ? "接炮一百封顶" : "接炮不封顶"},
    fanBei: function(v){
        var msg = ""; 

        if(v > 6){ // 新版翻倍
            return "小于" + v + "分翻倍";
        }

        switch(v){
            case 0:
                msg = "不翻倍";
                break;
            case 1:
                msg = "小于等于50分翻倍";
                break;
            case 2:
                msg = "小于等于100分翻倍";
                break;
            case 3:
                msg = "小于等于150分翻倍";
                break;
            case 4:
                msg = "小于等于200分翻倍";
                break;
            case 5:
                msg = "不限分翻倍";
                break;
        }
        return msg;
    },
    jieSuanDiFen: function(v) {
        return v == 1 ? "" : "积分底分x" + v;
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA] ={
    maxPlayer: function(v, areaSelectMode) {
        if (areaSelectMode.convertible)
            return "自由人数";
        else
            return v ? v + "人场" : "";
    },
    tuototuo: function(v, areaSelectMode) {
        var niao_score = areaSelectMode.fenshutuo;
        var str = "15胡起胡,有炮必接,满百结算,";
        str += v == 0 ? "不打鸟" : v == 2 ? "胡息打鸟" : "打鸟" + niao_score + "分";
        return str;
    },
    isfending : function(v) {return v ? "两百封顶" : "四百封顶"},
    isjiepao : function(v) {return v ? "接炮一百封顶" : "接炮不封顶"},
    maiPaiNum : function(v) {
        if (v>0) {
            return "2人埋牌" + v + "张";
        } else {
            return "";
        }
    },
    diFen: function(v){
        var msg = "";
        switch(v){
            case -1:
                msg = "不翻倍";
                break;
            case 10000:
                msg = "不限分翻倍";
                break;
            default:
                msg = "少于" + v + "分翻倍";
                break;
        }
        return msg;
    },
};

GameCnDesc[MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA] ={
    changsha_difen: GameCnDescDefault.difen,
    zhuaNiaoType:{0:"中鸟加分",1:"中鸟加倍",2:"不抓鸟"},
    zhuaNiaoNum: function(v, areaSelectMode) { return areaSelectMode.zhuaNiaoType != 2 && v >= 0 && v <= 4 ? ["1鸟", "2鸟", "4鸟", "6鸟", "3鸟(自摸)"][v] : ""},
    // buBuGao : function(v) {return v ? "步步高" : ""},
    // jinTongYuNv : function(v) {return v ? "金童玉女" : ""},
    // sanTong : function(v) {return v ? "三同" : ""},
    // yiZhiHua : function(v) {return v ? "一枝花" : ""},
    queYiSe : function(v) {return v ? "缺一色" : ""},
    banBanHu : function(v) {return v ? "板板胡" : ""},
    liuLiuShun : function(v) {return v ? "六六顺" : ""},
    daSiXi : function(v) {return v ? "大四喜" : ""},
    zhongTuCanAgain : function(v) {return v ? "起手胡可胡多次" : ""},
    // zhongTuLiuLiuShun : function(v) {return v ? "中途六六顺" : ""},
    // zhongTuSiXi : function(v) {return v ? "中途四喜" : ""},
    // jiaJiangHu : function(v) {return v ? "假将胡" : ""},
    // xianPiao : function(v) {return v ? "飘分" : ""},
    menQingZiMo : function(v) {return v ? "门清" : ""},
    quanQiuRenSifangBaoPei: function(v) {return v ? "全求人四放包赔" : ""},
    zuoZhuang:{0: "首局随机坐庄", 1: "首局房主坐庄"},
    fanBei: function(v, areaSelectMode) {
        if (v == 1 && areaSelectMode.fanBeiScore) {
            return "小于" + areaSelectMode.fanBeiScore + "分翻倍";
        }
        return "不翻倍";
    },
    // fengDing:{0:"21分封顶", 1:"42分封顶"},
}

GameCnDesc[MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI] ={
    huXiType: function(v) {return v == 3 ? "三息一囤" : "一息一囤";},
    isMingWei: function(v) { return v ? "明偎" : "暗偎";},
    isMaiPai : function(v, areaSelectMode) {
        if (v) {
            return "2人埋牌" + areaSelectMode.maiPaiNum + "张";
        } else {
            return "";
        }
    },
    zuoZhuang:{0: "首局随机坐庄", 1: "首局房主坐庄"},
    faPai:function(v){
        return ["普通", "畅爽", "极速"][v] || "";
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300 : "5分钟后托管"},
    qiHu:function(v){
        return [15, 18, 21][v] + "胡息起胡";
    }
}

GameCnDesc[MjClient.GAME_TYPE.SHAO_YANG_BO_PI] ={
    fengDing: function(v, areaSelectMode) {
        if(areaSelectMode.isLianZhuang)  {
            return v== -1 ? "不封顶" : v + "胡封顶";
        }else{
            return "";
        }
    },
    maxPlayer : function(v, areaSelectMode){
        if(areaSelectMode.zuoXing){
            return "四人坐醒"; 
        }else if(areaSelectMode.convertible){
            return "自由人数";
        }else{
            return areaSelectMode.maxPlayer + "人";
        }
    },
    isHongheidian : function(v, areaSelectMode){
        return "";
    },
    hongHeiType : function(v, areaSelectMode){
        if(v == 0){
            //兼容之前的版本
            if(areaSelectMode.isHongheidian){
                if(!areaSelectMode.zuoXing){
                    v = 1;
                }else{
                    v = 2;
                }
            }else{
                return "";
            }
        }
        if(v == 1){
            return "红黑胡";
        }else if(v == 2){
            return "红黑点";
        }
    },
    isRandomZhuang : function(v){return v ? "随机坐庄" : "";},
    diFen: function(v) {
        return v > 0 ? "低于" + v + "分翻倍" : "";
    },
    faPai:function(v){
        return ["普通", "畅爽", "极速"][v];
    },
    isMaiPai : function(v, areaSelectMode) {
        if (v) {
            return "2人埋牌" + areaSelectMode.maiPaiNum + "张";
        } else {
            return "";
        }
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管" , 300: "5分钟后托管"}
}

GameCnDesc[MjClient.GAME_TYPE.DA_ZI_BO_PI] ={
    fengDing: function(v, areaSelectMode) {
        if(areaSelectMode.isLianZhuang)  {
            return v== -1 ? "不封顶" : v + "胡封顶";
        }else{
            return "";
        }
    },
    hongHeiType : function(v, areaSelectMode){
        if(v == 1){
            return "红黑胡";
        }else if(v == 2){
            return "红黑点";
        }
    },
    isRandomZhuang : function(v){return v ? "随机坐庄" : "";},
    diFen: function(v) {
        return v > 0 ? "低于" + v + "分翻倍" : "";
    },
    faPai:function(v){
        return ["普通", "畅爽", "极速"][v];
    },
    qiHu:function (v) {
        return [6, 10][v] + "息起胡";
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管" , 300: "5分钟后托管"}
}

GameCnDesc[MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA] ={
    isJiaChui:function (v) {
        return v ? "锤" : "";
    },
    isZhuDou:function (v) {
        return v ? "助陡" : "";
    },
    isWuShiKHuaSe:function (v) {
        return v ? "正510K分花色" : "";
    },
    isPaiShu:function (v) {
        return v ? "显示剩余牌数" : "";
    },
    isSiDaiSan:function (v) {
        return v ? "4带3" : "";
    },
    isFanBaoSuanKaiQiang:function (v) {
        return v ? "反包算开枪" : "";
    },
    isFanBaoShuangJin:function (v) {
        return v ? "反包双进单出" : "";
    }
}

GameCnDesc[MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN] ={
    payWay:["","",""],
    shiwuzimo:function (v) {
        return v ? "15胡可自摸" : "";
    },
    redguaiwanOne: GameCnDescDefault.redguaiwanOne,
    redguaiwanwanfa:function (v, areaSelectMode) {
        var str = "";
        var mingTangSelected = areaSelectMode.redguaiwanOne == 1 ? true : false;
        str += (v & 1)   == 1   ?  mingTangSelected ? "天胡×4,"    : "天胡×8,"    : "";
        str += (v & 2)   == 2   ?  mingTangSelected ? "地胡×3,"    : "地胡×6,"    : "";
        str += (v & 4)   == 4   ?  mingTangSelected ? "点胡×3,"    : "点胡×6,"    : "";
        str += (v & 8)   == 8   ?  mingTangSelected ? "红胡2+n,"   : "红胡4+n,"   : "";
        str += (v & 16)  == 16  ?  mingTangSelected ? "乌胡×5,"    : "乌胡×8,"    : "";
        str += (v & 32)  == 32  ?  mingTangSelected ? "碰碰胡×4,"  : "碰碰胡×8,"  : "";
        str += (v & 64)  == 64  ?  mingTangSelected ? "十八大4+n," : "十八大8+n," : "";
        str += (v & 128) == 128 ?  mingTangSelected ? "十六小4+n," : "十六小8+n," : "";
        str += (v & 256) == 256 ?  mingTangSelected ? "海底胡×2,"  : "海底胡×6,"  : "";
        if(str)
            str = str.substring(0,str.length - 1);
        return str;
    },
    iszimo:function (v) {
        return v ? "自摸+1囤" : "";
    },
    huangzhuang:function (v) {
        return v ? "黄庄" : "";
    },
    datuanyuan:function (v) {
        return v ? "大团圆" : "";
    },
    faPai:function(v){
        return ["普通", "畅爽", "极速"][v] || "";
    },
    shuahou:function (v) {
        return v ? "耍猴" : "";
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管"}
}

GameCnDesc[MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG] ={
    huType          : {1:"自摸胡", 2:"接炮胡"},
    xiaohubudianpao : function(v) {return v ? "小胡不可接炮" : ""},
    sihongzhong     : function(v) {return v ? "四红中" : ""},
    tianhu          : function(v) {return v ? "天胡"   : ""},
    dihu            : function(v) {return v ? "地胡"   : ""},
    banbanhu        : function(v) {return v ? "板板胡" : ""},
    yitiaolong      : function(v) {return v ? "一条龙" : ""}, 
    longqidui       : function(v) {return v ? "龙七对" : ""}, 
    siguiyi         : function(v) {return v ? "四归一" : ""}, 
    jiangjianghu    : function(v) {return v ? "将将胡" : ""}, 
    queyise         : function(v) {return v ? "缺一色" : ""},
    zhuaniaotype    : {0:"不抓鸟", 1:"抓1鸟", 2:"抓2鸟", 3:"抓3鸟"},
    zhuaniaovalue   : function(v) {return v ? "159抓鸟"  : "" },
    keganghu        : function(v, areaSelectMode) {
        if (areaSelectMode.keganghu){
            return areaSelectMode.qiangGangQuanBao ? "抢杠全包" : "可抢杠胡";
        }
        return "";
    },  
    baogang         : function(v) {return v ? "包杠"     : ""},  
    touhougang      : function(v) {return v ? "骰后杠"     : ""},  
    qiShou14        : function(v) {return v ? "起手胡14张" : ""},  
    huanggangzhuang : function(v) {return v ? "荒庄荒杠" : ""},  
    jieSuanDiFen: function(v) {
        return v == 1 ? "" : "积分底分x" + v;
    },
}

GameCnDesc[MjClient.GAME_TYPE.HY_SHI_HU_KA] ={
    payWay: function(){return ""},
    diFen: function(v){
        var msg = "";
        switch(v){
            case -1:
                msg = "不翻倍";
                break;
            case 10000:
                msg = "不限分翻倍";
                break;
            default:
                msg = "少于" + v + "分翻倍";
                break;
        }
        return msg;
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" },

    faPai:function(v){
        return ["普通", "畅爽", "极速"][v] || "";
    },
    isMaiPai : function(v, areaSelectMode) {
        if (v) {
            return "2人埋牌" + areaSelectMode.maiPaiNum + "张";
        } else {
            return "";
        }
    },

}

GameCnDesc[MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI] ={
    payWay: function(){return ""},
    diFen: function(v){
        var msg = "";
        switch(v){
            case -1:
                msg = "不翻倍";
                break;
            case 10000:
                msg = "不限分翻倍";
                break;
            default:
                msg = "少于" + v + "分翻倍";
                break;
        }
        return msg;
    },
    faPai:function(v){
        return ["普通", "畅爽", "极速"][v] || "";
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管" },
}

GameCnDesc[MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY] = {
    // 1:3人玩法有黑桃3首出,必须出3
    // 2：3人玩法有黑桃3首出,可以不出3
    // 3：2人玩法有黑桃3首出,必须出3
    // 4: 2人玩法，随机先手，可以不出3
    firstPutRule:function (v,a) {
        switch (v){
            case 1:{
                return (a && a.isPreRoundFirstRule==true)? "每局先出黑桃3":"首局先出黑桃3"
            }
            case 2:{
                return ""
            }
            case 3:{
                return (a && a.isPreRoundFirstRule==true)? "每局先出黑桃3":"首局先出黑桃3"
            }
            case 4:{
                return (a && a.isPreRoundFirstRule==true)? "每局随机先手":"首局随机先手"
            }
            default:{
                return ""
            }
        }
    },
    jiaFen:function (v,a) {
        if (v > 0) return "加" + v + "分";
    },
    isTrustWhole: function(v, areaSelectMode){
        return "";
    },
    trustWay: function(v, areaSelectMode){
        if (areaSelectMode.isTrustWhole)
            return ["托管当局", "托管当局+下一局", "整场托管"][v] || "";
        else
            return "";
    }
}

GameCnDesc[MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG] ={
    deckNum: function(v, areaSelectMode) {
        if(areaSelectMode.isSiXi){
            return "天天四喜";
        }
        return v + "副牌";
    },
}


GameCnDesc[MjClient.GAME_TYPE.QU_TANG_23_ZHANG] = {
    canJiaBei : function(v) {return v ? "可以加倍" : "不能加倍"},
    double3 : function(v) {return v ? "双加倍x3" : ""},
    shoupaibubaofen : function(v) {return v ? "熟牌不包分" : ""},
};

GameCnDesc[MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI] = {
    huXiType:function(v) {return v + "息一囤"},
    hongHeiType:function(v) {return v==1 ? "红黑胡10囤" : "红黑胡翻倍"},
    isZiMo:function(v) {return v ? "自摸+1囤" : ""},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300 : "5分钟后托管"},
    faPai:function(v){
        return ["普通", "畅爽", "极速"][v] || "";
    },
    maiPaiNum : function(v) {
        if (v>0) {
            return "2人埋牌" + v + "张";
        } else {
            return "";
        }
    }
}

GameCnDesc[MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE] = {
    isCanChiDuiJiaChuPai:function(v, mode) {
        if(mode.maxPlayer == 2) {
            return v ? "能吃对家牌" : "不能吃对家牌";
        }
        return "";
    },
    isMaiPai:function(v, mode) {
        if(mode.maxPlayer == 2) {
            return v ? "底牌22张" : "底牌41张";
        }
        return "";
    },
    minHuXi:function(v, mode) {
        if(mode.maxPlayer == 2) {
            return v == 0 ? "十胡起胡" : "十五胡起胡";
        }
        return "十胡起胡";
    },
    isRandomZhuang:function(v) {
        return v ? "第一局随机庄" : "";
    },
    mingTangType:function(v, mode) {
        var wanFa = ['老名堂', '小卓版', '大卓版', '全名堂', '钻石版'];
        if((v != 0) && mode.mingTangSelectList && (mode.mingTangSelectList.length > 0)) {
            return wanFa[v] + ' ( ';
        }
        return wanFa[v];
    },
    mingTangSelectList:function(v, mode) {
        var mingTangIdx = {
            //小卓版
            "全球人":30, "上下五千年":35, "大龙摆尾":26, 

            //大卓版，钻石版, 全名堂
            "2息满园花":8, 

            //全名堂
            "自摸":62, "心连心":49, "对倒胡":38,
            "活捉小三":53, "两红两黑":54, "一条龙":51,
            "隔山打牛":52
        };
        var str = "";
        for(var i = 0; i < v.length; i++) {
            var id = v[i];
            for (var k in mingTangIdx) {
                if(id == mingTangIdx[k])
                    str += k + ',';
            }
        }
        if(str != "") {
            return str.substring(0, str.length - 1) + ' ) ';
        }
        return str;
    },
    douLiuZiScore:function(v, mode) {
        var zhuangXian_2 = ["20/10", "30/20", "40/30", "50/50"];
        var zhuangXian_3 = ["20/10/10", "30/20/20", "40/30/30", "50/50/50"];
        if(mode.isDouLiuZi) {
            if(mode.maxPlayer == 2) {
                return zhuangXian_2[v];
            }else {
                return zhuangXian_3[v];
            }
        }
        return "";
    },
    yiDengScore:function(v) {
        var deng = ['一登=80', '一登=100', '一登=200'];
        return deng[v];
    },
    fanBei:function(v, mode) {
        var desc = '少于' + mode.fanBeiScore + '分翻倍';
        return v == 1 ? desc : '不翻倍';
    },
}


GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_AN_SHUN_MJ] = {
    yaobaiji: function(v) {return v ? "摇摆鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    benji: function(v) {return v ? "本鸡" : ""},
    wuguji: function(v) {return v ? "乌骨鸡" : ""},
    qianggangshaoji: function(v) {return v ? "抢杠烧鸡" : ""},
    qianggangshaodou: function(v) {return v ? "抢杠烧豆" : ""},
    lianzhuang: function(v) {return v ? "连庄" : ""},
    xingqiji: function(v) {return v ? "星期鸡" : ""},
    hongzhongji: function(v) {return v ? "红中鸡" : ""},
    paiXinScoreOnly: function (v) {return v ? "" : ""},
    paiXinScoreBeiShu:function(v) {return "牌型分"+v+"倍"},
    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管" }
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_LIANG_FANG] = {
    yaobaiji: function(v) {return v ? "上下鸡" : ""},
    benji: function(v) {return v ? "本鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    wuguji: function(v) {return v ? "乌骨鸡" : ""},
    xingqiji: function(v) {return v ? "星期鸡" : ""},
    baoji: function(v) {return v ? "包鸡" : ""},
    qianggangshaoji: function(v) {return v ? "抢杠烧鸡" : ""},
    qianggangshaodou: function(v) {return v ? "抢杠烧豆" : ""},
    repaopeifen: function(v) {return v ? "热炮赔分" : ""},
    lianzhuang: function(v) {return v ? "连庄" : ""},
    paiXinScoreOnly: function (v) {return v ? "" : ""},
    paiXinScoreBeiShu:function(v) {return "牌型分"+v+"倍"},
    zimosuanfen:{ 0:"自摸翻倍", 1:"自摸加一分"},
    qianggangsuanfen:{ 0:"抢杠赔分", 1:"抢杠包两家"},
    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管" }
};


GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_LIANG_DING_LIANG_FANG] = {
    yaobaiji: function(v) {return v ? "上下鸡" : ""},
    benji: function(v) {return v ? "本鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    wuguji: function(v) {return v ? "乌骨鸡" : ""},
    xingqiji: function(v) {return v ? "星期鸡" : ""},
    baoji: function(v) {return v ? "包鸡" : ""},
    qianggangshaoji: function(v) {return v ? "抢杠烧鸡" : ""},
    qianggangshaodou: function(v) {return v ? "抢杠烧豆" : ""},
    repaopeifen: function(v) {return v ? "热炮赔分" : ""},
    lianzhuang: function(v) {return v ? "连庄" : ""},
    paiXinScoreOnly: function (v) {return v ? "" : ""},
    paiXinScoreBeiShu:function(v) {return "牌型分"+v+"倍"},
    zimosuanfen:{ 0:"自摸翻倍", 1:"自摸加一分"},
    qianggangsuanfen:{ 0:"抢杠赔分", 1:"抢杠算自摸"},
    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管" }
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_LIANG_DING_YI_FANG] = {
    yaobaiji: function(v) {return v ? "上下鸡" : ""},
    benji: function(v) {return v ? "本鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    xingqiji: function(v) {return v ? "星期鸡" : ""},
    baoji: function(v) {return v ? "包鸡" : ""},
    qianggangshaoji: function(v) {return v ? "抢杠烧鸡" : ""},
    qianggangshaodou: function(v) {return v ? "抢杠烧豆" : ""},
    repaopeifen: function(v) {return v ? "热炮赔分" : ""},
    zimosuanfen:{ 0:"自摸翻倍", 1:"自摸加一分"},
    qianggangsuanfen:{ 0:"抢杠赔分", 1:"抢杠算自摸"},
    zuoZhuang:{ 0:"连庄", 1:"轮庄"},
    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管" }
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_GUAI] = {
    yaobaiji: function(v) {return v ? "上下鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    wuguji: function(v) {return v ? "乌骨鸡" : ""},
    yuanque: function(v) {return v ? "原缺" : ""},
    qianggangshaoji: function(v) {return v ? "抢杠烧鸡" : ""},
    qianggangshaodou: function(v) {return v ? "抢杠烧豆" : ""},
    lianzhuang: function(v) {return v ? "连庄" : ""},
    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管" },
};
GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_ER_DING_GUAI] = GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_GUAI];


GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_XMY_GUI_YANG_ZHUO_JI] = {
    yaobaiji: function(v) {return v ? "摇摆鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    qianggangshaoji: function(v) {return v ? "抢杠烧鸡" : ""},
    qianggangshaodou: function(v) {return v ? "抢杠烧豆" : ""},
    wuguji: function(v) {return v ? "乌骨鸡" : ""},
    huanleji: function(v) {return v ? "欢乐鸡" : ""},
    benji: function(v) {return v ? "本鸡" : ""},
    zhuangType: {0:"一扣二", 1:"连庄"},
    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管" },
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI] = {
    maxPlayer: function(v, areaSelectMode) {
        if (areaSelectMode.dingque)
            return v == 2 ? "二丁拐" : "三丁拐";
        else
            return v ? v + "人场" : "";
    },
    fanpaiji: function(v) {return v ? "翻牌鸡" : ""},
    yaobaiji: function(v) {return v ? "摇摆鸡" : ""},
    benji: function(v) {return v ? "本鸡" : ""},
    wuguji: function(v) {return v ? "乌骨鸡" : ""},
    xingqiji: function(v) {return v ? "星期鸡" : ""},
    fengchuiji: function(v) {return v ? "风吹鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    dilong: function(v) {return v ? "地龙" : ""},
    gumai: function(v) {return v ? "估卖" : ""},
    liangfang: function(v) {return v ? "两房" : ""},
    lianzhuangtype: {0:"一扣二", 1:"连庄", 2:"通三"},
    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_DU_YUN_MJ] = {
    maxPlayer: function(v) { return v ? v + "人场" : ""; },
    fanpaiji: function(v) {return v ? "翻牌鸡" : ""},
    yaobaiji: function(v) {return v ? "上下鸡" : ""},
    wuguji: function(v) {return v ? "乌骨鸡" : ""},              
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    benji: function(v) {return v ? "本鸡" : ""},
    qianggangshaoji: function(v) {return v ? "抢杠烧鸡" : ""},
    qianggangshaodou: function(v) {return v ? "抢杠烧豆" : ""},
    beishu:function(v){return "积分底分"+v}
};


GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_MEN_HU_XUE_LIU] = {
    fanpaiji: function(v) {return v ? "翻牌鸡" : ""},
    yaobaiji: function(v) {return v ? "摇摆鸡" : ""},
    benji: function(v) {return v ? "本鸡" : ""},
    wuguji: function(v) {return v ? "乌骨鸡" : ""},
    xingqiji: function(v) {return v ? "星期鸡" : ""},
    fengchuiji: function(v) {return v ? "风吹鸡" : ""},
    dayizhangkebaoting: function(v) {return v ? "打一张可报听" : ""},
    baotingkemen: function(v) {return v ? "报听可闷" : ""},
    dilong: function(v) {return v ? "地龙" : ""},
    lianzhuangtype: {0:"一扣二", 1:"连庄"},
    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};


GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_ZUN_YI_MJ] = {
    maxPlayer: function(v) {
        return ["", "二丁拐", "三丁拐", "四人局"][v - 1] || "";
    },
    fanpaiji: function(v) {return v ? "翻牌鸡" : ""},
    yaobaiji: function(v) {return v ? "摇摆鸡" : ""},
    benji: function(v) {return v ? "本鸡" : ""},
    wuguji: function(v) {return v ? "乌骨鸡" : ""},
    xingqiji: function(v) {return v ? "星期鸡" : ""},
    fengchuiji: function(v) {return v ? "风吹鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    laiziji: function(v) {return v ? "癞子鸡" : ""},
    huansanzhang: function(v) {return v ? "换三张" : ""},
    lianzhuangtype: {0:"一扣二", 1:"连庄"},
    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_AN_LONG_MJ] = {
    yaobaiji: function(v) {return v ? "上下鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    benji: function(v) {return v ? "本鸡" : ""},
    wuguji: function(v) {return v ? "乌骨鸡" : ""},
    lianzhuang: function(v) {return v ? "连庄" : ""},
    zimofanbei: function(v) {return v ? "自摸翻倍" : ""},
    huangzhuangbushaojidou: function(v) {return v ? "荒庄不烧鸡豆" : ""},
    menhuxueliu: function(v) {return v ? "闷胡血流" : ""},
    xiaohubimen: function(v) {return v ? "小胡必闷" : ""},
    baotingbimen: function(v) {return v ? "报听必闷" : ""},
    baotingkemen: function(v) {return v ? "报听可闷" : ""},
    gumaitype:{99:"自由卖分",98:"不估卖分", 1:"必估1分", 2:"必估2分", 3:"必估3分", 4:"必估4分", 5:"必估5分"},
    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_XING_YI_MJ] = {
    yaobaiji: function(v) {return v ? "上下鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    qianggangshaoji: function(v) {return v ? "抢杠烧鸡" : ""},
    qianggangshaodou: function(v) {return v ? "抢杠烧豆" : ""},
    lianzhuang: function(v) {return v ? "连庄" : ""},
    zimojiayifen: function(v) {return v ? "自摸加一分" : ""},
    baoting: function(v) {return v ? "报听" : ""},
    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_KAI_LI_MJ] = {
    yaobaiji: function(v) {return v ? "上下鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    qianggangshaodou: function(v) {return v ? "抢杠烧豆" : ""},
    qianggangshaoji: function(v) {return v ? "抢杠烧鸡" : ""},
    baoji: function(v) {return v ? "包鸡" : ""},
    baogang: function(v) {return v ? "包杠" : ""},
    fanbeiji: function(v) {return v ? "翻倍鸡" : ""},
    xingqiji: function(v) {return v ? "星期鸡" : ""},
    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_LI_PING_MJ] = {
    fapai: {0:"三房牌", 1:"两房牌", 2:"缺一门"},
    gumai: {0:"不卖分", 1:"固定卖分", 2:"自由卖分"},
    yaobaiji: function(v) {return v ? "上下鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    fanpaiji: function(v) {return v ? "翻牌鸡" : ""},
    xingqiji: function(v) {return v ? "星期鸡" : ""},
    wuguji: function(v) {return v ? "乌骨鸡" : ""},
    chajiaoquanbao: function(v) {return v ? "查叫全包" : ""},
    fajifagang: function(v) {return v ? "罚鸡罚杠" : ""},
    gangkaifanbei: function(v) {return v ? "杠开翻倍" : ""},
    paixingfenfanbei: function(v) {return v ? "牌型分翻倍" : ""},
    repaofanbei: function(v) {return v ? "热炮翻倍" : ""},
    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_LIU_PAN_SHUI_MJ] = {
    xinhaoji: function(v) {return v ? "信号鸡" : ""},
    qingjiasan: function(v) {return v ? "清加三" : ""},
    yaobaiji: function(v) {return v ? "摇摆鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    benji: function(v) {return v ? "本鸡" : ""},
    xingqiji: function(v) {return v ? "星期鸡" : ""},
    wuguji: function(v) {return v ? "乌骨鸡" : ""},
    lianzhuangtype: {0:"连庄", 1:"一扣二"},
    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};


GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_TIAN_ZHU_MJ] = {
    fapai: {0:"三房牌", 1:"两房牌", 2:"缺一门"},
    yaobaiji: function(v) {return v ? "上下鸡" : ""},  
    fanpaiji: function(v) {return v ? "翻牌鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    wuguji: function(v) {return v ? "乌骨鸡" : ""},
    xingqiji: function(v) {return v ? "星期鸡" : ""},
    fapenggangji: function(v) {return v ? "罚碰杠鸡" : ""},
    repaofanbei: function(v) {return v ? "热炮翻倍" : ""},
    gangkaifanbei: function(v) {return v ? "杠开翻倍" : ""},
    qianggangfanbei: function(v) {return v ? "抢杠翻倍" : ""},
    mengangfanbei: function(v) {return v ? "闷杠翻倍" : ""},
    paixingfenliangbei: function(v) {return v ? "牌型分2倍" : ""},
    lianzhuang: function(v) {return v ? "连庄" : ""},
    baotingbucha: function(v) {return v ? "报听补差" : ""},
    chajiaoquanbao: function(v) {return v ? "查叫全包" : ""},

    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_TONG_REN_MJ] = {
    fapai: {0:"三房牌", 1:"两房牌", 2:"缺一门"},
    yaobaiji: function(v) {return v ? "上下鸡" : ""},  
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    qianggangshaodou: function(v) {return v ? "抢杠烧豆" : ""},
    qianggangshaoji: function(v) {return v ? "抢杠烧鸡" : ""},
    lianzhuang: function(v) {return v ? "连庄" : ""},

    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};
GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_RONG_JIANG_MJ] = {
    fapai: {0:"三房牌", 1:"两房牌", 2:"缺一门"},
    yaoji: function(v) {return v ? "幺鸡（金鸡）" : ""},
    yiwanji: function(v) {return v ? "1万（金万）" : ""},  
    yitongji: function(v) {return v ? "1筒（金筒）" : ""},  
    yaobaiji: function(v) {return v ? "上下鸡" : ""},  
    fanpaiji: function(v) {return v ? "翻牌鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    fajifagang: function(v) {return v ? "罚鸡罚杠" : ""},
    fapenggangji: function(v) {return v ? "罚碰杠鸡" : ""},
    repaofanbei: function(v) {return v ? "热炮翻倍" : ""},
    gangkaifanbei: function(v) {return v ? "杠开翻倍" : ""},
    mengangfanbei: function(v) {return v ? "闷杠翻倍" : ""},
    hunwuqingshi: function(v) {return v ? "混五清十" : ""},
    paixingfenliangbei: function(v) {return v ? "牌型分2倍" : ""},
    chajiaoquanbao: function(v) {return v ? "查叫全包" : ""},
    zimofanbei: function(v) {return v ? "自摸翻倍" : ""},

    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_WENG_AN_MJ] = {
    yaobaiji: function(v) {return v ? "上下鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    wuguji: function(v) {return v ? "乌骨鸡" : ""},
    xingqiji: function(v) {return v ? "星期鸡" : ""},
    benji: function(v) {return v ? "本鸡" : ""},
    quanqingyao: function(v) {return v ? "全清幺" : ""},
    baogang: function(v) {return v ? "包杠" : ""},
    qianhoufanji: function(v) {return v ? "前后翻鸡" : ""},
    // lianzhuangtype: function(v) {return v ? "连庄" : "一口二"},
    chongFengJi:{ 0:"冲锋鸡4321", 1:"冲锋鸡3211", 2:"冲锋鸡"},
    lianzhuangtype:{ 0:"连庄", 1:"一口二"},
    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_BI_JIE_MJ] = {
    yaobaiji: function(v) {return v ? "上下鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    qianggangshaodou: function(v) {return v ? "抢杠烧豆" : ""},
    qianggangshaoji: function(v) {return v ? "抢杠烧鸡" : ""},
    jiquanbao: function(v) {return v ? "鸡全包" : ""},
    douquanbao: function(v) {return v ? "豆全包" : ""},
    jinyinji: function(v) {return v ? "金银鸡" : ""},
    lianzhuang: function(v) {return v ? "连庄" : ""},

    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_REN_HUAI_MJ] = {
    extraplay: {0:"见七挖", 1:"高挖弹"},
    yaobaiji: function(v) {return v ? "摇摆鸡" : ""},
    benji: function(v) {return v ? "本鸡" : ""},  
    jinyinwu: function(v) {return v ? "金银乌" : ""},  

    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_SUI_YANG_MJ] = {
    wuguji: function(v) {return v ? "乌骨鸡" : ""},  
    sanwanji: function(v) {return v ? "三万鸡" : ""},  
    baoji: function(v) {return v ? "包鸡" : ""},  
    mantangji: function(v) {return v ? "满堂鸡" : ""},  
    wujiwudou: function(v) {return v ? "无鸡无豆胡牌多加5分" : ""},  

    jiafen: {0:"接炮1自摸2", 1:"接炮2自摸3"},
    tuozhan: {0:"定缺 ", 1:"缺门加1",2:"缺一门加3,缺两门加6"},

    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_JIN_SHA_MJ] = {
    zuanshiji: function(v) {return v ? "钻石鸡" : ""},
    yinji: function(v) {return v ? "银鸡" : ""},
    mantangji: function(v) {return v ? "满堂鸡" : ""},
    qianggangshaodou: function(v) {return v ? "抢杠烧豆" : ""},
    qianggangshaoji: function(v) {return v ? "抢杠烧鸡" : ""},
    wuguji: function(v) {return v ? "乌骨鸡" : ""},
    zimofanbei: function(v) {return v ? "自摸翻倍" : ""},
    manjiqiyise: function(v) {return v ? "满鸡清一色" : ""},

    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.GUI_ZHOU_XUE_ZHAN_DAO_DI_MJ] = {
    huansanzhang: function(v) {return v ? "换三张" : ""},
    huansizhang: function(v) {return v ? "换四张" : ""},
    yaojiujiangdui: function(v) {return v ? "幺九将对" : ""},
    menqingzhongzhang: function(v) {return v ? "门清中张" : ""},
    tiandihu: function(v) {return v ? "天地胡" : ""},
    zimotype: {0:"自摸加底", 1:"自摸加番"},
    fengding: {0:"两番封顶", 1:"三番封顶", 2:"四番封顶"},
    dianganghuatype: {0:"点杠花（点炮）", 1:"点杠花（自摸）"},

    beishu:function(v){return "积分底分"+v},
    trustTime: {"-1": "", 0: "", 10: "10秒后托管", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.XIANG_XI_96POKER] = {
    area: function(v) { return ['永顺'][v]},
    scoreType: function(v, mode) {
        if(v == 0) {
            return '16逢升';
        }else if(v == 1) {
            return '11逢升';
        }else if(v == 2) {
            return '大小胡';
        }
        return '';
    },
    isShuangLongBaoZhu: function(v) { return v ? '双龙特殊牌型' : ''},
    isPutCardInvalid: function(v, mode) {
        if(mode && mode.maxPlayer == 2) {
            return v ? '打出去的牌作废' : ''; 
        }

        return '';
    },
    isNoZhuaZhu: function(v) {
        return v ? '无牌打不抓猪' : '';
    },
    piaoFen: function(v) { 
        return ['不飘', '飘1/2分', '飘1/2/3分'][v];
    }
};

GameCnDesc[MjClient.GAME_TYPE.ZP_LY_CHZ] = {
    maiPaiNum: function(v) {
        return v > 0 ? ("2人埋牌" + v + "张") : "";
    },
    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN] = {
    isAnCards: function(v) {return v ? "暗八张底牌" : ""},
};


GameCnDesc[MjClient.GAME_TYPE.XU_PU_LAO_PAI] = {
    hua: function(v) {return v ? "带花" : "不带花"},
    sjsjz: function(v) {return v ? "首局随机坐庄" : ""},
    znzmh: function(v) {return v ? "只可自摸胡" : ""},
    cpqr: function(v) {return v ? "吃碰确认" : ""},
    zhuangXian: function(v) {return v ? "庄闲分" : ""},
    phbctz: function(v) {return v ? "碰后不出同张" : ""},
    chbctz: function(v) {return v ? "吃后不出同张" : ""},
    tingPai: function(v) {return v ? "听牌" : ""},
    qxgc: function(v) {return v ? "取消箍臭" : ""},
    diFenScore: function(v) {return v > 0 ? "积分底分" + v + "分" : "";},
    chongFenScore: function(v) {return v > 0 ? "冲分分数" + v + "分" : "";},
    difen: function(v) {return v > 0 ? "结算倍数" + v + "倍" : "";},
    chongFenId:{ 0: "可冲", 1: "不可冲", 2: "必冲", 3: "必冲后可冲", 4: "冲上不冲下"},
};


GameCnDesc[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ] = {
    siDui: function(v) {return v ? "四对*5分" : ""},
    xiaoHu: function(v) {return v ? "小胡可接炮胡" : ""},
    gangShangHua: function(v) {return v ? "杠上花加1分" : ""},
    danDiao: function(v) {return v ? "单吊*10分" : ""},
    daDuiZi: function(v) {return v ? "碰碰胡*5分" : ""},
    tianTing: function(v) {return v ? "天听" : ""},
    tianDiHu: function(v) {return v ? "天地胡*10分" : ""},
    suiJiZhuang: function(v) {return v ? "随机庄" : ""},
    lianZhuang: function(v) {return v ? "连庄" : ""},
    lunZhuang: function(v) {return v ? "轮庄" : ""},
    diFen: function(v) {return v > 0 ? "结算倍数" + v + "倍" : "";},
    zimoType:{ 0: "自摸翻倍", 1: "自摸加一分"},
    qgType:{ 0: "抢杠赔分", 1: "抢杠翻倍"},
    niaoType:{ 0: "不抓鸟", 1: "一鸟全中", 2: "159中鸟"},
    niaoNumType:{ "-1": "", 0: "抓2鸟", 1: "抓4鸟", 2: "抓6鸟"},
    niaoFenType:{ "-1": "", 0: "中鸟加1分", 1: "中鸟加2分", 2: "中鸟翻倍"},
};

GameCnDesc[MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI] = {
    faPai:function(v){
        return ["普通", "畅爽", "极速"][v] || "";
    },
    maiPaiNum:function(v) {
        return v ? ("2人埋牌" + v + "张") : "";
    },
    isJiaChui:function(v) {
        return v ? "可冲" : "";
    },
    isZiMoBiHu:function(v) {
        return v ? "自摸必胡" : "";
    },
    isDuiJiaBuKeChi:function(v) {
        return v ? "对家不可吃" : "";
    },
    isRandomZhuang:function(v) {
        return v ? "首局随机庄" : "";
    },
    diFen:function(v) {
        return v + "积分底分";
    },
    jieSuanDiFen: function(v) {
        return v > 0 ? "积分底分" + v : "";
    },
};

GameCnDesc[MjClient.GAME_TYPE.HONG_ZE_MA_JIANG] = {
    isQiDui: function(v) {return v ? "七对" : ""},
    canRob : function(v) {return v ? "可抢杠" : ""},
    buDaiHongZhong: function(v){return v ? "不带红中（可点炮）" : ""},
    mbzdqz: function(v){return v ? "码不中当全中" : ""},
    zhuaMaNum: function(v) {return v > 0 ? "抓"+ v + "张"  : "不抓码";},
    jieSuanDiFen: function(v) {
        return v > 0 ? "积分底分" + v : "";
    },
};

GameCnDesc[MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN] = {
    fengDing: function(v) {
        return 8 * Math.pow(2,v) + "倍封顶";
    },
    addCard: function(v) {
        return ["赢家补牌","全体补牌"][v];
    },
    zhaDanFanBei : function(v) {return v ? "炸弹翻倍" : ""},
    guanMenFanBei: function(v) {return v ? "关门翻倍" : ""},
    sanZha : function(v) {return v ? "三炸" : ""}
};

GameCnDesc[MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ] = {
    huan3zhang: function(v) {return v ? "换三张" : ""},
    pu3zhang: function(v) {return v ? "扑三张" : ""},
    diFen: function(v) {return v > 0 ? "积分底分" + v + "分" : "";},
    dingPiao:{ 0: "不带飘", 1: "带1飘", 2: "带2飘", 3: "带3飘", 5: "带5飘"}, 
};

GameCnDesc[MjClient.GAME_TYPE.EN_SHI_MA_JIANG] = {
    fenShu: function(v) {return v+"分";},
    playStyle: function(v) {return v == 0 ? "多癞" : "一癞到底";},
    taiZhuang: function(v) {return v ? "抬庄" : "";},
    gangShangPao: function(v) {return v ? "杠上炮" : "";},
    daPiJinHu: function(v) {return v ? "打痞禁胡" : "";},
    daLaiJinHu: function(v) {return v ? "打癞禁胡" : "";},
    jinZhiYangPi: function(v) {return v ? "禁止养痞" : "";},
    meiJuHuanZuo: function(v) {return v ? "每局换座" : "";},
};

GameCnDesc[MjClient.GAME_TYPE.WU_XUE_GE_BAN] = {
    fan: function(v) {
        return ["可反","不可反"][v];
    },
    showHandCount: function(v) {return v ? "显示手牌数" : ""},
    selectCardByPlayer: function(v) {return v ? "手动选择底牌" : ""},
    singleJokerIsBomb: function(v) {return v ? "比牌时单王算炸弹" : ""},
    hunShuiRule: function(v) {
        return ["门清玩法一","门清玩法二"][v];
    },
    diFen: function(v) {
        return "积分底分x" + v;
    }
};

GameCnDesc[MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO] = {
    chuoType: function(v) {
        return ["曲戳","定戳"][v];
    },
    chuoNum : function(v) {
        return ["14戳","15戳"][v];
    },
    isJianHongJiaFen: function(v) {return v ? "见红加分" : ""},
    isQiHuErFen: function(v) {return v ? "起胡2分" : ""},
    isHongChuoSiFan: function(v) {return v ? "红戳4番" : ""},
    isFanChuo: function(v) {return v ? "番戳" : ""},

    diFen: function(v) {
        return "结算底分x" + v;
    },

    trustTime: {"-1": "", 0: "", 60: "1分钟后托管", 120: "2分钟后托管", 180: "3分钟后托管", 300: "5分钟后托管"}
};

GameCnDesc[MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU] = {
    difen: GameCnDescDefault.difen,
    laiType:{0:"无癞到底", 1:"一癞到底", 2:"两癞可胡", 3:"半癞"},
    yijiaolaiyou: function(v){return v ? "一脚赖油" : ""},
    diaoYu: function(v){return v ? "见字胡" : ""},
    gemogehu: function(v){return v ? "各摸各胡" : ""},
    maima: function(v){return v ? "买马" : ""},
    youzhongyou: function(v){return v ? "油中油" : ""},
    // xiFen:{0:"4癞无喜", 5:"喜5分", 10:"喜10分"},
    // piaoFen:{1:"飘分1", 2:"飘分2", 3:"飘分3" , 4:"飘分1", 0:"不飘", 6:"自由下飘"},
    // fangGang:{1:"积分底分X人数", 2:"积分底分X2", 3:"积分底分X3"},
    // lianGunDaiPa : function(v){return v ? "连滚带爬" : ""},
    // qiangGangHu : function(v){return v ? "抢杠胡" : ""},
    // qiangGangQuanBao : function(v) {return v ? "抢杠全包" : ""},
    // hasLaiCanQiang : function(v) {return v ? "有癞子可抢杠" : ""},
    // queYiMen : function(v) {return v ? "缺一门" : ""}
};

GameCnDesc[MjClient.GAME_TYPE.CHUO_XIA_ZI] = {
    difen: GameCnDescDefault.difen,
    laiType:{0:"无癞", 1:"有癞", 2:"两癞可胡", 3:"半癞"},
    youzhongyou: function(v){return v ? "油中油" : ""},
    mosanzhangbupenggang: function(v){return v ? "末3张禁碰杠" : ""},
};

GameCnDesc[MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG] = {
    chouPai: function(v){
        return v == 0 ? "" : "抽"+v+"张";
    },
    wuJiangHu:function(v){ return v ? "无将胡" : ""},
    queYiSe: function(v){return v ? "缺一色" : ""},
    pengPengHu: function(v){return v ? "碰碰胡" : ""},
    qingYiSe: function(v){return v ? "清一色" : ""},
    jiangJiangHu: function(v) {return v ? "将将胡" : ""},
    xiaoQiDui: function(v){return v ? "小七对" : ""},
    daDiaoChe: function(v){return v ? "大吊车" : ""},
    shouJuZhuangJia: function(v){return v ? "首局随机庄" : ""},
    youHuBiHu: function(v){return v ? "有胡必胡" : ""},
    daXiaoHuBuDieJia: function(v){return v ? "大小胡不叠加" : ""},
    dengHu: function(v){return v ? "等胡" : ""},
    fanBei: function(v){
        var str = "";
        switch(v){
            case 0:
                str = "不封顶";
                break;
            case 3:
            case 4:
            case 5:
                str = v + "番封顶";
                break;
        }
        return str;
    },
    zhuaNiao: function(v, areaSelectMode){return v == 0 ? "不抓鸟" : (v == 1 ? "庄家中鸟159" : "159中鸟")},
    zhongNiao: function(v, areaSelectMode) {
        if(areaSelectMode.zhuaNiao == 0)
            return "";
        else{
            return v == 0 ? "中鸟加分" : "中鸟加倍";
        }
    },
    niaoNum: function(v, areaSelectMode){
        if(areaSelectMode.zhuaNiao == 0)
            return "";
        else{
            return "抓"+v+"鸟";
        }
    }
};

GameCnDesc[MjClient.GAME_TYPE.DA_YE_ZI_PAI] = {
    yiDuiHong: function(v){return v ? "一对红" : ""},
    shuangBaBei: function(v){return v ? "双八倍" : ""},
    fangPaoBaoPei: function(v, areaSelectMode){
        return v && areaSelectMode.maxPlayer != 2 ? "放炮包赔" : ""
    },
    jieSuanDiFen: function(v) {return v > 0 ? "倍数：" + v : "";},
};

GameCnDesc[MjClient.GAME_TYPE.DANG_YANG_FAN_JING] = {
    diFen: function(v){return v + '积分底分'},
    jiFen: function(v){return ['按胡计分'][v]},
    isBiHu: function(v) {return v ? '有胡必胡' : ""},
    isZiMoHu: function(v) {return v ? '自摸胡' : ""},
    isMaoKan: function(v) {return v ? '' : "不带毛坎"},
    isHaiDiLao: function(v) {return v ? '海底胡加分' : ""},
    isShangBaHu: function(v) {return v ? '上8胡' : ""},
};

GameCnDesc[MjClient.GAME_TYPE.CHONG_YANG_MJ] = {
    difen: GameCnDescDefault.difen,
    guozhuang: function(v){return v ? "过庄" : ""},
};

GameCnDesc[MjClient.GAME_TYPE.HUANG_SHI_HH_MJ] = {
    gudinggangType: {0:"红中晃晃", 1:"发财晃晃"},
    gangkai: function(v){return v ? "杠上开花" : ""},
    fanpaobaofen: function(v){return v ? "谁放炮谁承担" : ""},
    liangpaikedahu: function(v){return v ? "亮中发白可胡大胡" : ""},
    jinding: {25: "金顶25", 50: "金顶50", 100: "金顶100", 150: "金顶150", 200: "金顶200"},
};

GameCnDesc[MjClient.GAME_TYPE.QIAN_JIANG_HH_MJ] = {
    shuangdahu: function(v){return v ? "双大胡" : ""},
    zimohu: function(v){return v ? "只能自摸胡" : ""},
    rechong: function(v){return v ? "热铳" : ""},
    gameTypes: {0: "土豪必杠", 1: "潜江癞晃", 2: "铁三角", 3: "三三晃晃", 4: "硬铁三角"},
    angangfan: {4: "暗杠4倍", 2: "暗杠2倍"},
    xifan: {10: "喜：底分10倍", 20: "喜：底分20倍", 30: "喜：底分30倍"},
};

GameCnDesc[MjClient.GAME_TYPE.QI_CHUN_HH_MJ] = {
    zhongFaBaiKeDaHu: function(v){return v ? "中发白可胡大胡" : ""},
    daHuHaiDiLao: function(v){return v ? "海底捞算大胡" : ""},
};

GameCnDesc[MjClient.GAME_TYPE.TONG_CHENG_MJ] = {
    jiangId: {0: "258将", 1: "乱将"},
    piaoId: {0: "带漂", 1: "定漂", 2: "抬漂", 3: "追漂", 4: "不漂"},
    piaoFen: {0: "", 1: "漂一分", 2: "漂二分", 3: "漂三分"},
    laizi: function(v) {return v ? "带癞子" : ""},
    zimofanbei: function(v) {return v ? "自摸翻倍" : ""},
    queyise: function(v) {return v ? "缺一色" : ""},
};

GameCnDesc[MjClient.GAME_TYPE.TONG_SHAN_HH_MJ] = {
    jiangId: {0: "258将", 1: "乱将"},
    fengDingId: {0: "48分封顶", 1: "不封顶"},
    jianZiHuQG: function(v) {return v ? "见字胡抢杠" : ""},
    gangKaiJiaYiFan: function(v) {return v ? "杠开加一番" : ""},
};

GameCnDesc[MjClient.GAME_TYPE.WU_XUE_MJ] = {
    piaoId: {0: "不漂", 1: "漂1", 2: "漂5", 3: "漂10", 4: "自定义漂"},
    jindingId: {"-1": "", 0: "金鼎", 1: "小金鼎"},
    piaoFen: function(v) {return v ? "漂" + v + "分" : ""},
    menqing: function(v) {return v ? "门清" : ""},
    genpi: function(v) {return v ? "跟皮" : ""},
    buyaowan: function(v) {return v ? "不要万" : ""},
};


GameCnDesc[MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN] = {
    diFen: function(v){return v + '积分底分'},
    jiFen: function(v){return ['按胡计分'][v]},
    isBiHu: function(v) {return v ? '有胡必胡' : ""},
    isZiMoHu: function(v) {return v ? '自摸胡' : ""},
    isMaoKan: function(v) {return v ? '' : "不带毛坎"},
    isZiMoYouXi: function(v) {return v ? '自摸有喜' : ""},
    isCheAnMao: function(v) {return v ? '扯暗毛' : ""},
    baoChong: function(v, areaSelectMode) {
        if(areaSelectMode.maxPlayer == 2){
            return ""
        }
        return ['不包铳', '包铳(双倍计分)', '包铳(不包毛坎)'][v];
    },
};

GameCnDesc[MjClient.GAME_TYPE.YANG_XIN_MA_JIANG] = {
    huType: function(v) {return v == 0 ?  "258做将" : "乱将";},
    sanShouFan: function(v) {return v ? "三手翻" : "";},
    pengPengHu: function(v) {return v ? "碰碰胡" : "";},
    gangShangKaiHua: function(v) {return v ? "杠上开花" : "";},
    canDaHu: function(v) {return v ? "亮中发白可大胡" : "";},
    fengDing: function(v){return v == 0 ? "不封顶" : v+"倍封顶"}
};

GameCnDesc[MjClient.GAME_TYPE.HU_BEI_HUA_PAI] = {
    jingNum: function(v) {return v == 3 ? '三精玩法' : '五精玩法'},
    jiHuType: function(v) {
        var str = ['一胡一分', '逢1就包', '二舍三入'];
        return v == 4 ? '按坡计分' : ('按胡计分,' + str[v-1]);
    },
    bieGangNum: function(v) {
        return ['不带别杠', '单别杠', '双别杠'][v];
    },
    beginJingNum: function(v) {
        var str = {0:'不加精', 3:'自带一坎精', 2:'自带两花精'};
        return str[v];
    },
    isBaoChong: function(v) {return v ? '包铳' : ''},
    isBiHu: function(v) {return v ? '有胡必胡' : ''},
    isZiMo: function(v) {return v ? '自摸胡' : ''},
    isGanTaBuHu: function(v) {return v ? '赶踏不胡' : ''},
    isNotDeskJing: function(v) {return v ? '桌面精不算主精' : ''},
};

GameCnDesc[MjClient.GAME_TYPE.JIANG_LING_HONGZHONG] = {
    zhaMa: function(v) {return v == 0 ?  "" : v+"码";},
    yingHuJiaMa: function(v){ return v ? "硬胡时加2码" : "";}
};

GameCnDesc[MjClient.GAME_TYPE.SHI_SHOU_AI_HUANG] = {
    xiaoHuScore: function(v) {return v + "分";},
    isFanMa: function(v) {return v == 0 ? "不翻码" : "翻码";},
    daHuJiaMa: function(v) {return v ? "大胡点炮奖码" : "";},
    daDaHuManGuan: function(v) {return v ? "大大胡满贯" : "";},
    autoHu: function(v) {return v ? "热杠自动胡" : "";},
    liuMa: function(v) {return v == 0 ? "不留底码" : "留底码牌";},
    diMa: function(v) {
        var maTable = {11: "J", 12: "Q", 13: "K", 14: "A"};
        var baseMa = Number(v);
        var str = "底码";
        for (var index = 0; index < 3; index++) {
            str += maTable[baseMa + index] || baseMa + index;
        }
        return str;
    }
};

GameCnDesc[MjClient.GAME_TYPE.GONG_AN_HUA_PAI] = {
    jingNum: function(v) {return v == 3 ? '三精玩法' : '五精玩法'},
    jiHuType: function(v) {
        var str = ['一胡一分', '逢1就包', '二舍三入'];
        return '按胡计分,' + str[v-1];
    },
    bieGangNum: function(v) {
        return ['不带别杠', '单别杠', '双别杠'][v];
    },
    beginJingNum: function(v) {
        var str = {0:'不加精', 3:'自带一坎精', 2:'自带两花精'};
        return str[v];
    },
    baoPai: function(v, mode) {
        if (mode.maxPlayer == 2) {
            return '';
        }
        return ['包一家', '包两家'][v];
    },
    isNiePai: function(v) {return v ? '捏牌' : ''},
};

GameCnDesc[MjClient.GAME_TYPE.QI_CHUN_GD_MJ] = {
    hunType: function(v){
        if(v == 0)
            return "无鬼";
        
        if(v == 1){
            return "翻鬼";
        }
        
        if(v == 2){
            return "翻双鬼";
        }

        if(v == 3){
            return "红中鬼";
        }
        return "";
    },
    windCard: function(v){return v ? "带风" : "不带风"},
    canRob: function(v) {return v ? "抢杠胡" : ""},
    qiangGangQuanBao: function(v){return v ? "抢杠全包" : ""},
    gangBaoQuanBao: function(v){return v ? "杠爆全包" : ""},
    onlyZiMoHu: function(v){return v ? "只能自摸" : ""},
    isQiDui: function(v){return v ? "可胡七对" : ""},
    qiDuiJiaBei: function(v){return v ? "七对加倍" : ""},
    genZhuang: function(v){return v ? "跟庄" : ""},
    daHu: function(v){return v ? "大胡玩法" : ""},
    maCount: function(v){
        if(v == 0){
            return "不买马";
        }
        if(v == 1){
            return "一马全中";
        }
        return v + "马";
    }
};

GameCnDesc[MjClient.GAME_TYPE.QI_CHUN_HONG_ZHONG_GANG] = {
    fenShu:function(v){return v + "分";},
    playStyle: function(v){
        return v == 0 ? "258将" : "乱将";
    }
};

GameCnDesc[MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI] = {
    qiHu: function(v) {return v == 0 ? '7息起胡' : '9息起胡'},
    diFen: function(v) {
        return '积分底分' + v;
    },
    huaType: function(v) {
        return ['十个花', '溜花'][v];
    },
    piaoType: function(v) {
        return ['带跑', '定跑'][v];
    },
    piaoFen: function(v, mode) {
        if (mode.piaoType == 0) {
            return '跑' + v + '分';
        }
        return "";
    },
    isYiPaoDuoXiang: function(v) {return v ? '一炮多响' : ''},
    isKeGuanHu: function(v) {return v ? '可换观胡' : ''}
};

GameCnDesc[MjClient.GAME_TYPE.DOU_DI_ZHU_QC] = {
    useLaizi: function(v) {return v ? '癞子玩法' : ''},
    yingZhaBigger: function(v) {return v ? '硬炸管软炸' : ''}
};

GameCnDesc[MjClient.GAME_TYPE.WU_XUE_510K] = {
    baoJing: function(v) {return v ? '剩一张牌报警' : ''},
    keFan: function(v) {return v ? '可反' : ''},
    showHandCount: {0: "不显示余牌数量", 1: "显示余牌数量"},
    catPartnerCards: {0: "结束可看队友手牌", 1: "结束不能看队友手牌"},
    trustWay: function(v, areaSelectMode){
        if (areaSelectMode.isTrustWhole)
            return ["托管当局"] || "";
        else
            return "";
    },
    diFen: function(v) {
        return "积分底分x" + v;
    }
};

GameCnDesc[MjClient.GAME_TYPE.EN_SHI_SHAO_HU] = {
    hongQiangType: {0: "上七八可", 1: "见红枪", 2: "夹夹枪"},
};

GameCnDesc[MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG] = {
    scoreLine: function(v) {
        v = Number(v);
        if(v == 1) {
            return v + "局结算";
        }
        return v + "分结算";
    }
};