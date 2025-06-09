
MjClient.clubPlayerApplyList = [];
MjClient.FriendCard_img_info = null; //用来处理晋中俱乐部桌子信息图片

/*
 friend info
 */
MjClient.RuleParam = {};



var FriendCard_Common = FriendCard_Common || {};

FriendCard_Common.FRIEND_NOTICE_MAX_LENGTH = 150

//房间记录回放用到
FriendCard_Common.club_roleId = null;

//亲友圈审核弹窗个数
FriendCard_Common.PopUpMsgCount = 0;

//联盟每个玩法最大显示的开打桌子数 isTableHidden = 0  || 1
FriendCard_Common.maxPreStartRoomLM = 2;

//联盟最大显示的开打桌子数 isTableHidden = 2
FriendCard_Common.maxAllStartRoomLM = 20;



//重置玩法规则，修复进入玩法设置的bug
FriendCard_Common.reSetRuleParm = function(){
    var infoData = FriendCard_Common.getClubInfo();
    for (var i = 1; i <= FriendCard_Common.getRuleNumber(); i++) {
        if (infoData["rule" + i] && infoData["rule" + i].ruleName) {
            MjClient.RuleParam["rule" + i] = infoData["rule" + i];
        }else{
            MjClient.RuleParam["rule" + i] = null;
        }
    }
}

/*
*存在本地数据的key
*/
FriendCard_Common.LocalKey = {
    quickGameSwitch:"KEY_FRIEND_CARD_QUICK_GAME_SWITCH_",//快速游戏开关
    lastIntoClub:"LAST_INTO_CLUB_ID",//最近进入的一个亲友圈
    onlyOutLineDesk:"ONLY_ONT_LINE_DESK",//亲友圈大厅只看离线桌子
}

/*
*请求服务端失败通用toast
*/
FriendCard_Common.serverFailToast = function(rtn) {
    if (rtn.message) {
        MjClient.showToast(rtn.message);
    } else {
        MjClient.showToast("获取数据失败,请重新打开");
    }
}

//得到当前皮肤版本类型
//晋中皮肤 return 1  晋中、永州
//岳阳皮肤 return 2  岳阳、邵阳、耒阳、贵州、 旺旺、永利
//江苏皮肤 return 3  江苏、海安、淮安、南通、徐州、湘乡、衡阳
//湖北皮肤 return 4  湖北
//老皮肤   return 0

//同步UI时注意 岳阳皮肤 main.csd 贵州有区别
FriendCard_Common.getSkinType = function() {
    // if(FriendCard_Common.skinType)
    //     return FriendCard_Common.skinType;

    // if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
    //     isJinZhongAPPType())  {
    //     FriendCard_Common.skinType = 1;
    //     return 1;
    // } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
    //     MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
    //     MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
    //     MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP  ||
    //     MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ ||
    //     MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) {
    //     FriendCard_Common.skinType = 2;
    //     return 2;
    // } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
    //     MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
    //     MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
    //     MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
    //     MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
    //     MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
    //     MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
    //     FriendCard_Common.skinType = 3;
    //     return 3;
    // }else if (MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ){
    //     FriendCard_Common.skinType = 4;
    //     return 4;
    // }

    return 2
}

//是不是联盟俱乐部
FriendCard_Common.isLMClub = function(info) {
    if (!info && cc.sys.isObjectValid(MjClient.FriendCard_main_ui) && MjClient.FriendCard_main_ui.data) {
        info = MjClient.FriendCard_main_ui.data.info;
    }
    if(!info){
        return false;
    }
    return info.leagueId ? true : false;
}
//得到该玩家是否是组长
//是   return 几组组长
//不是 return false  uid如果不传就用自己ID
//ps: return false 的时候 当分组为0  0==false 为ture 要用"==="
FriendCard_Common.isGroupLeader = function(info,uid) {
    if (!info && cc.sys.isObjectValid(MjClient.FriendCard_main_ui) && MjClient.FriendCard_main_ui.data) {
        info = MjClient.FriendCard_main_ui.data.info;
    }
    if(!info){
        return false;
    }
    if(!uid){
        uid = MjClient.data.pinfo.uid
    }
    if(FriendCard_Common.isLMClub(info)){
        //联盟俱乐部用角色判断
        var group = info.roleMap.group[uid.toString()];
        if(group){
            return group;
        }else{
            return false;
        }
    }

    var isGroupLeader =  info && info.groupMap;
    if(isGroupLeader && info.groupMap[uid.toString()])
        return info.groupMap[uid.toString()];

    return false;
}


//是不是助理
FriendCard_Common.isAssistants = function(info,uid) {
    if (!info && cc.sys.isObjectValid(MjClient.FriendCard_main_ui) && MjClient.FriendCard_main_ui.data) {
        info = MjClient.FriendCard_main_ui.data.info;
    }
    if(!info){
        return false;
    }
    if(!uid){
        uid = MjClient.data.pinfo.uid
    }
    if(FriendCard_Common.isLMClub(info)){
        var assistant = info.roleMap.assistant[uid.toString()];
        if(assistant){
            return assistant;
        }else{
            return false;
        }
    }
    return (info && info.assistants && info.assistants.indexOf(uid.toString()) >= 0);

}

//是否是俱乐部会长，联盟盟主最高级别
FriendCard_Common.isLeader = function(info,uid){
    if (!info && cc.sys.isObjectValid(MjClient.FriendCard_main_ui) && MjClient.FriendCard_main_ui.data) {
        info = MjClient.FriendCard_main_ui.data.info;
    }
    if(!info){
        return false;
    }
    if(!uid){
        uid = MjClient.data.pinfo.uid;
    }
    if(FriendCard_Common.isLMClub(info)){
        //联盟俱乐部用角色判断
        return (info.roleMap.leader == uid);
    }
    return (info.creator == uid);
}

//是否是合伙人
FriendCard_Common.isPartner = function(info,uid){
    if (!info && cc.sys.isObjectValid(MjClient.FriendCard_main_ui) && MjClient.FriendCard_main_ui.data) {
        info = MjClient.FriendCard_main_ui.data.info;
    }
    if(!info){
        return false;
    }
    if(!uid){
        uid = MjClient.data.pinfo.uid
    }
    if(FriendCard_Common.isLMClub(info)){
        var assistant = info.roleMap.assistant[uid.toString()];
        if(assistant){
            return assistant;
        }else{
            return false;
        }
    }
    cc.log(info.partners, uid);
    cc.log("info.partners.indexOf(uid.toString()) >= 0)", uid.toString(), info.partners.indexOf(uid.toString()) >= 0);
    return (info && info.partners && info.partners.indexOf(uid.toString()) >= 0);
}

FriendCard_Common.isLMChair = function(info,uid){

    if (!info && cc.sys.isObjectValid(MjClient.FriendCard_main_ui) && MjClient.FriendCard_main_ui.data) {
        info = MjClient.FriendCard_main_ui.data.info;
    }
    if(!info){
        return false;
    }
    if(!uid){
        uid = MjClient.data.pinfo.uid;
    }
    if(FriendCard_Common.isLMClub(info)){
        if(FriendCard_Common.isLeader(info,uid)){
            return true;
        }
        return ((info.roleMap.admin.indexOf(uid) > -1));
    }
    return false;
}

FriendCard_Common.isSupperManger = function(info,uid) {
    if(FriendCard_Common.isLeader(info,uid)){
        return true;
    }
    if (!info && cc.sys.isObjectValid(MjClient.FriendCard_main_ui) && MjClient.FriendCard_main_ui.data) {
        info = MjClient.FriendCard_main_ui.data.info;
    }
    if(!info){
        return false;
    }
    if(!uid){
        uid = MjClient.data.pinfo.uid;
    }
    if(FriendCard_Common.isLMClub(info)){
        //联盟俱乐部用角色判断
        if(info.roleMap.topzone){
            return ((info.roleMap.topzone.indexOf(uid) > -1));
        }
    }
    return false;
}


FriendCard_Common.isManager = function(info,uid) {
    if (!info && cc.sys.isObjectValid(MjClient.FriendCard_main_ui) && MjClient.FriendCard_main_ui.data) {
        info = MjClient.FriendCard_main_ui.data.info;
    }
    if(!info){
        return false;
    }
    if(!uid){
        uid = MjClient.data.pinfo.uid;
    }
    if(FriendCard_Common.isSupperManger(info,uid)){
        return true;
    }
    if(FriendCard_Common.isLMClub(info)){
        //联盟俱乐部用角色判断
        return ((info.roleMap.admin.indexOf(uid) > -1) || (info.roleMap.subzone.indexOf(uid) > -1));
    }
    return (info.admins && info.admins.indexOf(uid) >= 0)
}

//联盟俱乐部管理员，权限比isManager低。
FriendCard_Common.isLMClubManager = function(info,uid) {
    if (!info && cc.sys.isObjectValid(MjClient.FriendCard_main_ui) && MjClient.FriendCard_main_ui.data) {
        info = MjClient.FriendCard_main_ui.data.info;
    }
    if(!info){
        return false;
    }
    if(!uid){
        uid = MjClient.data.pinfo.uid;
    }
    if(FriendCard_Common.isLMClub(info)){
        //联盟俱乐部用角色判断
        return ((info.roleMap.subzone.indexOf(uid) > -1));
    }
    return false;
}

//联盟俱乐部普通成员，是否是普通成员 什么权限都没有
FriendCard_Common.isOrdinaryMember = function(info,uid) {
    if (!info && cc.sys.isObjectValid(MjClient.FriendCard_main_ui) && MjClient.FriendCard_main_ui.data) {
        info = MjClient.FriendCard_main_ui.data.info;
    }
    if(!info){
        return true;
    }
    if(!uid){
        uid = MjClient.data.pinfo.uid;
    }
    if("roleId" in info){
        return info.roleId == 0;
    }
    if(FriendCard_Common.isManager(info,uid)){
        return false;
    }
    if(FriendCard_Common.isSupperManger(info,uid)){
        return false;
    }
    if(FriendCard_Common.isAssistants(info,uid)){
        return false;
    }
    if(FriendCard_Common.isGroupLeader(info,uid)){
        return false;
    }
    if(FriendCard_Common.isPartner(info,uid)){
        return false;
    }
    if(FriendCard_Common.isLMClubManager(info,uid)){
        return false
    }
    return true;
}

//比赛场低分解散开关
FriendCard_Common.isOpenMatchDissolveLimit = function(gameType){
    if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ) {
        return false;
    }
    // if(gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
    //     return false;
    // }
    // if(gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
    //     return false;
    // }

    if(gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG){
        return false;
    }
    if(gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN){
        return false;
    }
    if(gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI){
        return false;
    }
    cc.log("isOpenMatchDissolveLimit gameType",gameType," true");
    return true;
}

//比赛场积分不为负开关
FriendCard_Common.isOpenMatchScoreNeedEnough = function(gameType){
    cc.log("isOpenMatchScoreNeedEnough gameType",gameType);
    if(!FriendCard_Common.isOpenMatchDissolveLimit(gameType)){
        return false;
    }
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
        if(gameType == MjClient.GAME_TYPE.CHANG_SHA || gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN){
            return true;
        }
        if(gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_TY){
            return true;
        }
        if(gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN){
            return true;
        }
        if(gameType == MjClient.GAME_TYPE.ML_HONGZHONG){
            return true;
        }
        if(gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ONE){
            return true;
        }
        if(gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU){
            return true;
        }
        if(gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI){
            return true;
        }
        if(gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN){
            return true;
        }
        if(gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG){
            return true;
        }
        if(gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG){
            return true;
        }
        if(gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ){
            return true;
        }

    }
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
        if(gameType == MjClient.GAME_TYPE.LUO_DI_SAO){
            return true;
        }
        if(gameType == MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY){
            return true;
        }
        if(gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King
            || gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR
            || gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King
            || gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER
            || gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King
            || gameType == MjClient.GAME_TYPE.PAO_HU_ZI){
            return true;
        }
        if(gameType == MjClient.GAME_TYPE.TY_HONGZHONG){
            return true;
        }
        if(gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG){
            return true;
        }
        if(gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
            return true;
        }
        if(gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
            return true;
        }
    }

    return false;
}

//防沉迷积分不为负开关
FriendCard_Common.isOpenAntiAddictionScoreNeedEnough = function(gameType){
    cc.log("isOpenMatchScoreNeedEnough gameType",gameType);
    if(!FriendCard_Common.isOpenMatchDissolveLimit(gameType)){
        return false;
    }

    return true;
}

//防沉迷积分低分解散开关
FriendCard_Common.isOpenAntiAddictionDissolveLimit = function(gameType){
    // if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ) {
    //     return false;
    // }
    // // if(gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
    // //     return false;
    // // }
    // // if(gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
    // //     return false;
    // // }

    // if(gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG){
    //     return false;
    // }
    // if(gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN){
    //     return false;
    // }
    // if(gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI){
    //     return false;
    // }
    // cc.log("isOpenMatchDissolveLimit gameType",gameType," true");
    return true;
}


//是否开放修改业绩模式
FriendCard_Common.isOpenChangeYejiMode = function(){
    if (FriendCard_Common.IsOpenRoomCardPay()){
        return true;
    }
    if(FriendCard_Common.isOpenLM()){
        return true;
    }
    return false;
}

//是否开启亲友圈代理商城
FriendCard_Common.isOpenFriendShop = function(){
    var isOpe = false;
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
        isOpe = true;
    }
    return isOpe;
}

//获取分组个数
FriendCard_Common.getGroupNumber = function(){

    return 60;
}


//或者文字选中/不选择颜色
FriendCard_Common.getTextColor = function(){
    if(FriendCard_Common.getSkinType() == 2){
        return {black:cc.color("#443333"),red:cc.color("#C32929")};
    }else if(FriendCard_Common.getSkinType() == 1){
        return {black:cc.color("#2B344C"),red:cc.color("#AB3215")};
    }else if(FriendCard_Common.getSkinType() == 4){
        return {black:cc.color("#738875"),red:cc.color("#ff6f20")};
    }else{
        return {black:cc.color("#602E1A"),red:cc.color("#D33C00")};
    }
}

//业绩模式
FriendCard_Common.yejiModeConfig = [
    "扣费玩家所属",
    "参与玩家均分",
]

FriendCard_Common.getClubRoomModeNameByType = function(type){
    switch(type){
        case 1:
            return "钻石"
            break;
    }
    return "元宝"
}
//得到当前俱乐部是否开启准备选项  ps : 后期所有地区都有该选项后 此函数删除
//开启   return true
//非开启 return false
FriendCard_Common.IsOpeNeedReady = function() {
    var isOpe = false;
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
        isOpe = true;
    }

    return isOpe;
}

/*
获取当前俱乐部信息
*/
FriendCard_Common.getClubInfo = function() {
    if (cc.sys.isObjectValid(MjClient.FriendCard_main_ui) && MjClient.FriendCard_main_ui.data) {
        return MjClient.FriendCard_main_ui.data.info;
    }
    return {};
}

/*
获取当前俱乐部数据
*/
FriendCard_Common.getClub = function() {
    if (cc.sys.isObjectValid(MjClient.FriendCard_main_ui) && MjClient.FriendCard_main_ui.data) {
        return MjClient.FriendCard_main_ui.data;
    }
    return {};
}

/*
*是否开启了成员导入功能
*/
FriendCard_Common.isOpenMemberDaoru = function() {
    var isOpe = true;
    if (MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
        isOpe = false;
    }
    return isOpe;
}

/*
*是否开启了联盟
*/
FriendCard_Common.isOpenLM = function() {
    var isOpe = false;
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
        isOpe = true;
    }
    return isOpe;
}

/*
*判断是否联盟亲友圈
*/
FriendCard_Common.getClubisLM = function(info) {
    var isLM = false;
    if (!info) {
        info = FriendCard_Common.getClubInfo();
    }
    if(!info || !info.clubId){
        return false;
    }

    isLM = info.clubId <= 9999;

    return isLM;
}


//是否开启元宝免扣加时
//已开启地区 岳阳、邵阳、永利、旺旺 跑得快玩法 转转麻将 红中麻将 长沙麻将
FriendCard_Common.isOpenMiankoujiashi = function(gameType) {
    var isOpe = false;
    if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
        isOpe = false;
    }
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
        if (GameClass[gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI ||
            GameClass[gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU) {
            isOpe = true;
        } else if (gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN || gameType == MjClient.GAME_TYPE.TY_HONGZHONG ||
            gameType == MjClient.GAME_TYPE.CHANG_SHA || gameType == MjClient.GAME_TYPE.ML_HONGZHONG ||
            gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ONE ||
            gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
            gameType == MjClient.GAME_TYPE.ML_HONG_ZI || gameType == MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI ||
            gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
            gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU || gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG ||
            gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN || gameType == MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG ||
            gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
            gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI || gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
            gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI || gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
            gameType == MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG || gameType == MjClient.GAME_TYPE.SAN_DA_HA ||
            gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ || gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG ||
            gameType == MjClient.GAME_TYPE.CHEN_ZHOU || gameType == MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI ||
            gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA || gameType == MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
            gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI || gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG ||
            gameType == MjClient.GAME_TYPE.XIN_NING_MA_JIANG || gameType == MjClient.GAME_TYPE.LEI_YANG_GMJ ||
            gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI) {
            isOpe = true;
        }
    }

    return isOpe;
}


//得到当前玩法低分免扣最大值  低分免扣配置
//岳阳歪胡子 益阳歪胡子 南县鬼胡子  沅江鬼胡子 最大值为80 默认40
//difen 底分
//return object
FriendCard_Common.getFangkaFreeConfig = function(gameType,difen) {
    var fangkaFrer = {};
    cc.log("getFangkaFreeConfig gameType",gameType,"difen",difen)
    if((difen || difen == 0) && FriendCard_Common.roomCardFreeConfig){
        //寻找最近的下标
        maxCloseIndex = -1;
        minCloseIndex = -1;
        for(var i = 0 ; i < FriendCard_Common.roomCardFreeConfig.length; i++){
            if(FriendCard_Common.roomCardFreeConfig[i].gameType == gameType){
                if(FriendCard_Common.roomCardFreeConfig[i].difen > difen
                    && (maxCloseIndex < 0 || FriendCard_Common.roomCardFreeConfig[i].difen < FriendCard_Common.roomCardFreeConfig[maxCloseIndex].difen)){
                    maxCloseIndex = i;
                }else if(FriendCard_Common.roomCardFreeConfig[i].difen < difen
                    && (minCloseIndex < 0 || FriendCard_Common.roomCardFreeConfig[i].difen > FriendCard_Common.roomCardFreeConfig[minCloseIndex].difen)){
                    minCloseIndex = i;
                }else if(FriendCard_Common.roomCardFreeConfig[i].difen == difen){
                    minCloseIndex = i;
                    maxCloseIndex = -1;
                    break;
                }
            }
        }
        if(minCloseIndex > -1 || maxCloseIndex > -1){
            fangkaFrer.min = 1; //最小值
            fangkaFrer.default = 20; //默认值
            if(minCloseIndex > -1){//优先向下取
                fangkaFrer.max = FriendCard_Common.roomCardFreeConfig[minCloseIndex].miankouCap;
                fangkaFrer.anIncrease = FriendCard_Common.roomCardFreeConfig[minCloseIndex].difen; //每次加减递增多少
            }else{
                fangkaFrer.max = FriendCard_Common.roomCardFreeConfig[maxCloseIndex].miankouCap;
                fangkaFrer.anIncrease = FriendCard_Common.roomCardFreeConfig[maxCloseIndex].difen; //每次加减递增多少
            }
            fangkaFrer.mustMultiple = true//免扣值必须要是anIncrease的倍数
            return fangkaFrer;
        }
    }

    fangkaFrer.min = 1; //最小值
    fangkaFrer.max = 20; //最大值
    fangkaFrer.default = 10; //默认值
    fangkaFrer.anIncrease = 1; //每次加减递增多少
    /*当anIncrease不是一个唯一值使用valueList列举全部可能性DA_TONG_ZI_SHAO_YANG*/
    if (GameClass[gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI) { //跑得快大类型
        fangkaFrer.max = 40;
        fangkaFrer.default = 20;
        fangkaFrer.min = 1;
        fangkaFrer.anIncrease = 1;
    } else if (gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI ||
        gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
        gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI) {
        fangkaFrer.min = 1;
        fangkaFrer.max = 120;
        fangkaFrer.default = 40;
        fangkaFrer.anIncrease = 1;
    } else if (gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA ) {//娄底放炮罚
        fangkaFrer.min = 1;
        fangkaFrer.max = 100;
        fangkaFrer.default = 40;
        fangkaFrer.anIncrease = 1;
    } else if (gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ) {//湘乡告胡子
        fangkaFrer.min = 1;
        fangkaFrer.max = 100;
        fangkaFrer.default = 50;
        fangkaFrer.anIncrease = 1;
    } else if (gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG) {//邵阳打筒子
        fangkaFrer.min = 5;
        fangkaFrer.max = 1000;
        fangkaFrer.default = 600;
        fangkaFrer.valueList = [];
        for(var i = 5; i <= 40; i++){
            //5~40
            fangkaFrer.valueList.push(i);
        }
        for(var i = 0; i < 5; i++){
            //50、60、70、80、90
            fangkaFrer.valueList.push(10 * (5 + i));
        }
        for(var i = 1; i <= 10; i++){
            //100,200,300,400,500,600,700,800,900,1000
            fangkaFrer.valueList.push(i*100);
        }
    } else if (gameType == MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI) {//湘潭跑胡子
        fangkaFrer.min = 1;
        fangkaFrer.max = 40;
        fangkaFrer.default = 20;
        fangkaFrer.anIncrease = 1;
    } else if (gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN) { //邵阳霸炸弹
        fangkaFrer.min = 10;
        fangkaFrer.max = 100;
        fangkaFrer.default = 50;
        fangkaFrer.anIncrease = 10;
    } else if (gameType == MjClient.GAME_TYPE.CHANG_SHA) {//长沙麻将
        fangkaFrer.min = 1;
        fangkaFrer.max = 30;
        fangkaFrer.default = 10;
        fangkaFrer.anIncrease = 1;
    } else if (gameType == MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
               gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI) {//湘乡跑胡子  邵阳剥皮
        fangkaFrer.min = 1;
        fangkaFrer.max = 80;
        fangkaFrer.default = 50;
        fangkaFrer.anIncrease = 1;
    } else if (gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI) {//邵阳字牌
        fangkaFrer.min = 1;
        fangkaFrer.max = 60;
        fangkaFrer.default = 60;
        fangkaFrer.anIncrease = 1;
    } else if (gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI) {//沅江鬼胡子
        fangkaFrer.min = 10;
        fangkaFrer.max = 200;
        fangkaFrer.default = 100;
        fangkaFrer.anIncrease = 10;
    } else if (gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN) {//岳阳沅江千分
        fangkaFrer.min = 10;
        fangkaFrer.max = 800;
        fangkaFrer.default = 500;
        fangkaFrer.valueList = [];
        //10~800 10间隔  还有个15
        fangkaFrer.valueList.push(10);
        fangkaFrer.valueList.push(15);
        for(var i = 20; i <= 800; i = i + 10){
            fangkaFrer.valueList.push(i);
        }
    } else if (gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE) {//安乡偎麻雀
        fangkaFrer.min = 10;
        fangkaFrer.max = 150;
        fangkaFrer.default = 100;
        fangkaFrer.anIncrease = 10;
    }else if (gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI) {//大字剥皮
        fangkaFrer.min = 1;
        fangkaFrer.max = 80;
        fangkaFrer.default = 50;
        fangkaFrer.anIncrease = 1;
    }else if (gameType == MjClient.GAME_TYPE.XU_PU_LAO_PAI) {//溆浦老牌
        fangkaFrer.max = 40;
    }else if(gameType == MjClient.GAME_TYPE.ML_HONGZHONG || gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ONE){//岳阳红中麻将
        fangkaFrer.max = 25;
    }
    //岳阳安化七王麻将、安化四王麻将、宁乡开王麻将
    if ( MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
        if(gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW||
            gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG){
            fangkaFrer.max = 30;
        }
    }
    // 邵阳 岳阳 十胡卡 六胡抢
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
        if(gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA || gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG){
            fangkaFrer.max = 50;
        }
    }
    //永州 邵阳 跑胡子 落地扫
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
        if (gameType == MjClient.GAME_TYPE.PAO_HU_ZI || gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King ||
            gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King || gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER ||
            gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King || gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR ||
            gameType == MjClient.GAME_TYPE.LUO_DI_SAO) {
            fangkaFrer.max = 100;
        }
    }
    // 湘乡 衡阳 的低分免扣 优化~~~
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
        if (GameClass[gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI || GameClass[gameType] == MjClient.GAME_CLASS.MA_JIANG ||
            GameClass[gameType] == MjClient.GAME_CLASS.PAO_HU_ZI ) { //
            fangkaFrer.max = 50;
        }
        if(gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA || gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI){
            fangkaFrer.max = 100;
        }
        if(gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA || gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA){
            fangkaFrer.max = 50;
        }

    }

    if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
        if (gameType == MjClient.GAME_TYPE.TY_HONGZHONG ||
            gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN ||
            gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN ||
            gameType == MjClient.GAME_TYPE.CHANG_SHA){
            fangkaFrer.max = 50;
        }
    }
    return fangkaFrer;
}


FriendCard_Common.fangkaPayConfig = {
    levelStrs: ["普通", "高级", "皇冠","尊贵"],//这个昵称会影响互动道具
    zhuangYunPropMaxTimes: [0, 1, 3, 5],
    maxPayArr: [20, 30,  40, 50],
    AAPayArr: [10, 15, 20, 30],
    oneRoundMaxPayArr: [20],
    oneRoundAAPayArr: [10],
    infoStrs: [
        "普通：20钻石 ，无转运道具，推广比例65%",
        "高级：30钻石 ，转运道具1次/人，互动道具+1，推广费比例70%",
        "皇冠：40钻石 ，转运道具3次/人，互动道具+2，推广费比例75%",
        "尊贵：50钻石 ，转运道具5次/人，互动道具+3，推广费比例80%"]
}

//得到当前玩法的档位置,  付费元宝.  fangkaSource:1"赢家出"、2"输家出"、3"AA"
//return array
FriendCard_Common.getFangkaPayArr = function(fangkaSource, isOneRound) {
    cc.log("isOneRound", isOneRound)
    if (isOneRound) {
        if (fangkaSource == 3) {
            return FriendCard_Common.fangkaPayConfig.oneRoundAAPayArr;
        } else {
            return FriendCard_Common.fangkaPayConfig.oneRoundMaxPayArr;
        }
    } else {
        if (fangkaSource == 3) {
            return FriendCard_Common.fangkaPayConfig.AAPayArr;
        } else {
            return FriendCard_Common.fangkaPayConfig.maxPayArr;
        }
    }
}

// 元宝房间的房间等级名称
FriendCard_Common.getFangkaRoomLevelName = function() {
    if (!MjClient.data.sData)
        return "";

    var tData = MjClient.data.sData.tData;
    var areaSelectMode = tData.areaSelectMode;
    if (!areaSelectMode.fangkaCount)    // 不是元宝房间
        return "";

    var index = FriendCard_Common.getFangkaLevelByAreaSelectMode().index;
    return FriendCard_Common.fangkaPayConfig.levelStrs[index] || "";
}

FriendCard_Common.getFangkaLevelByAreaSelectMode = function() {
    if (!MjClient.data.sData)
        return {num: 0, index: 0};

    var tData = MjClient.data.sData.tData;
    var areaSelectMode = tData.areaSelectMode;
    if (!areaSelectMode.fangkaCount)    // 不是元宝房间
        return {num: 0, index: 0};

    return FriendCard_Common.getFangkaLevel(
        areaSelectMode.fangkaCount,
        areaSelectMode.fangkaSource,
        areaSelectMode.fangkaExtra,
        areaSelectMode.maxPlayer,
        tData.roundNum == 1);
}

//得到 向下取接近值. 用来适配付费元宝值 fangkaSource:1"赢家出"、2"输家出"、3"AA"
FriendCard_Common.getFangkaLevel = function(fangkaCount, fangkaSource, fangkaExtra, maxPlayer, isOneRound) {
    if (fangkaSource == 3) {
        fangkaCount *= maxPlayer;
        fangkaCount += fangkaExtra;
    }

    return FriendCard_Common.getArrLimit(FriendCard_Common.fangkaPayConfig.maxPayArr, fangkaCount);
}

FriendCard_Common.getArrLimit = function(arr, num) {
    var index = 0;
    for (var i = arr.length - 1; i > 0; i --) {
        if (arr[i] <= num) {
            index = i;
            break;
        }
    }
    return {
        num: arr[index],
        index: index
    };
}

//得到当前地区是否开启元宝模式
//已开启地区 邵阳,岳阳,耒阳,衡阳 永利 永州 湘乡 山西 贵州 旺旺
//开启   return true
//非开启 return false
FriendCard_Common.IsOpenRoomCardPay = function() {
    var isOpe = false;

    //永利不读取roomCardEnable 直接return true
    if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
        return true;
    //cms没配置
    if (MjClient.systemConfig && (MjClient.systemConfig.roomCardEnable == "false" || !MjClient.systemConfig.roomCardEnable))
        return false;

    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
        isOpe = true;
    }
    return isOpe;
}

//是否强制开启免扣加时，true,创建房间将不会显示加时Ui,默认勾选
FriendCard_Common.isOpenForceMiankoujiashi = function() {
    var isOpe = false;
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) {
        isOpe = true;
    }
    return isOpe;
}


/*
*右上角的玩法选择保存
isSameScreen是否可以多选
-1全部，index存的是rule1，rule2中的1,2
*/
FriendCard_Common.reSetClubRulesSelect = function(clubId,index,isSelect,isSameScreen) {
    if(!index || index < 0){
        var clubRulesSelect = [-1];
        util.localStorageEncrypt.setStringItem("clubRulesSelect_" + clubId,JSON.stringify(clubRulesSelect));
    }else{
        if(isSameScreen){
            var clubRulesSelect = FriendCard_Common.getClubRulesSelect(clubId);
            if(clubRulesSelect.indexOf(-1) > -1){
                clubRulesSelect.splice(clubRulesSelect.indexOf(-1),1);
            }
            if(isSelect){
                if(clubRulesSelect.indexOf(index) < 0){
                    clubRulesSelect.push(index);
                }
            }else{
                if(clubRulesSelect.indexOf(index) > -1){
                    clubRulesSelect.splice(clubRulesSelect.indexOf(index),1);
                }
                if(clubRulesSelect.length < 1){
                    clubRulesSelect.push(-1);
                }
            }
        }else{
            var clubRulesSelect = [index];
        }
        util.localStorageEncrypt.setStringItem("clubRulesSelect_" + clubId,JSON.stringify(clubRulesSelect));
    }
}

//是否只看离线桌子
FriendCard_Common.isOnlyShowOutLineDesk = function(){
    var result = util.localStorageEncrypt.getNumberItem(FriendCard_Common.LocalKey.onlyOutLineDesk,0) ? true : false;
    return result;
}
//设置是否只看离线桌子，按钮只有管理员能看 isManager
FriendCard_Common.setOnlyShowOutLineDesk = function(value){
    util.localStorageEncrypt.setNumberItem(FriendCard_Common.LocalKey.onlyOutLineDesk,value);
}
/*
*获取右上角选择的玩法
*/
FriendCard_Common.getClubRulesSelect = function(clubId){
    if(!FriendCard_Common.getOSDClub()){
        var defaultIndex = util.localStorageEncrypt.getNumberItem("clubLastIntoRule" + clubId,MjClient.FriendCard_main_ui.ruleIndex ? MjClient.FriendCard_main_ui.ruleIndex : 1);
        var clubRulesSelect = JSON.parse(util.localStorageEncrypt.getStringItem("clubRulesSelect_" + clubId,("["+defaultIndex+"]")));
        if(clubRulesSelect.indexOf(-1) > -1){
            clubRulesSelect = [MjClient.FriendCard_main_ui.ruleIndex];
        }
        return clubRulesSelect;
    }else{
        var clubRulesSelect = JSON.parse(util.localStorageEncrypt.getStringItem("clubRulesSelect_" + clubId,"[-1]"));
        return clubRulesSelect;
    }
}
/*
*获取右上角选择的玩法对应是否同屏玩法
*/
FriendCard_Common.getClubRulesSelectOSD = function(clubId){
    return util.localStorageEncrypt.getBoolItem("clubRulesSelectOSD_" + clubId,FriendCard_Common.getOSDClub());
}
FriendCard_Common.setClubRulesSelectOSD = function(clubId,isSameScreen){
    util.localStorageEncrypt.setBoolItem("clubRulesSelectOSD_" + clubId,isSameScreen);
}

/*
*修正右上角选中的规则
*/
FriendCard_Common.reSetCurSelectRule = function(){
    var that = MjClient.FriendCard_main_ui;
    var clubRulesSelect = FriendCard_Common.getClubRulesSelect(that.clubId);
    that.ruleBtnNum = FriendCard_Common.getRuleNumber();
    if(FriendCard_Common.getOSDClub(that)){
        for (var i = 1; i <= FriendCard_Common.getRuleNumber(); i++) {
            if (!that.data.info["rule" + i] || that.data.info["rule" + i] == "delete") {
                FriendCard_Common.reSetClubRulesSelect(that.clubId,i,false,true);
            }
        }
    }

    if (that.data.info["rule" + that.ruleIndex] && that.data.info["rule" + that.ruleIndex] != "delete"){

    }else{
        for (var i = 1; i <= FriendCard_Common.getRuleNumber(); i++) {
            if (that.data.info["rule" + i] && that.data.info["rule" + i] != "delete") {
                that.ruleIndex = i;
                break;
            }
        }
    }
    if(!FriendCard_Common.getOSDClub(that)){
        FriendCard_Common.reSetClubRulesSelect(that.clubId,that.ruleIndex,true,false)
    }

    //todo这里可以处理getClubRulesSelect有可能一个玩法选中都没有的问题

}
//得到当前俱乐部是否是同屏玩法
//同屏   return true
//非同屏 return false
FriendCard_Common.getOSDClub = function(that) {
    if (FriendCard_Common.getClubDisplay(that) == 2){
        return true;
    }
    else{
        return false;
    }
}

//得到俱乐部 桌子排序方式 display
//分开显示   return 1
//合并显示   return 2
//ps 判断是否全屏用FriendCard_Common.getOSDClub()
FriendCard_Common.getClubDisplay = function(that) {
    if(!that)
        that =  MjClient.FriendCard_main_ui;

    var display = that.data.info.display;
    if (!display) {
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
            return 2;
        } else {
            return 1;
        }
    }

    return display;
}

//得到俱乐部 sortord
//0.地区默认 1.开打在前 2.开打在后 4.开打在中
FriendCard_Common.getClubsortord = function(that) {
    if(!that)
        that =  MjClient.FriendCard_main_ui;

    var sortord =that.data.info.sortord;
    if (!sortord) {
        //衡阳默认开打在前
        if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
            MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ ||
             MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
            return 1
        } else {
            return 2
        }
    }

    return sortord;
}

//得到玩法的超大类型改变桌子图片
FriendCard_Common.getGameCalssType = function(gameType) {
    if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) //邵阳玩法list
    {
        var listArray = getAllGameListArray()._gameTypeList;
        if (listArray[0] && listArray[0].indexOf(gameType) >= 0)
            return "ZP";
        else if (listArray[1] && listArray[1].indexOf(gameType) >= 0)
            return "MJ";
        else if (listArray[2] && listArray[2].indexOf(gameType) >= 0)
            return "PK";
        else
            return "MJ";
    } else //岳阳玩法List
    {
        if (MjClient.gameListConfig.majiangList && MjClient.gameListConfig.majiangList.indexOf(gameType) >= 0) {
            return "MJ";
        } else if (MjClient.gameListConfig.pokerList && MjClient.gameListConfig.pokerList.indexOf(gameType) >= 0) {
            return "PK";
        } else if (MjClient.gameListConfig.zipaiList && MjClient.gameListConfig.zipaiList.indexOf(gameType) >= 0) {
            return "ZP";
        } else {
            return "MJ"; //防止上面未找到报错
        }
    }

};

//得到当前app俱乐部是几个玩法
FriendCard_Common.getRuleNumber = function() {
    return 100;
};

FriendCard_Common.getNewRuleList = function(that) {
    var rulelist = {};
    var gamelist = [];
    for (var i = 1; i <= FriendCard_Common.getRuleNumber(); i++) {
        var otherRule = that.data.info["rule" + i];
        if (otherRule && otherRule != "delete") {
            if (!rulelist[otherRule.gameType]){
                rulelist[otherRule.gameType] = [];
                gamelist.push(otherRule.gameType);
            }
            rulelist[otherRule.gameType].push(otherRule);
        }
    }
    return {gamelist:gamelist,rulelist:rulelist};
}

FriendCard_Common.isInSelect = function(that,gameType) {
    var index = -1;
    for (var i = 0; i < that.newRuleData.gamelist.length; i++) {
        if (that.newRuleData.gamelist[i] == gameType) {
            index = i;
            break;
        }
    }
    return index;
}

//俱乐部弹窗
FriendCard_Common.isPopView = function(node) {

    this.localStorageKey = {};
    this.localStorageKey.KEY_FIENDCARDS_TIME = "KEY_FIENDCARDS_TIME";
    this.localStorageKey.KEY_FIENDCARDS_UPDATATIME = "KEY_FIENDCARDS_UPDATETIME";
    var _data = MjClient.dateFormat(new Date(), "yyyy/MM/dd");

    var _lastData = util.localStorageEncrypt.getStringItem(this.localStorageKey.KEY_FIENDCARDS_TIME, "");
    var _updateTime = util.localStorageEncrypt.getStringItem(this.localStorageKey.KEY_FIENDCARDS_UPDATATIME, "");
    var _config = MjClient.systemConfig.advClubConfig;
    var layer;
    var oldScale;
    cc.log("======= _config ", JSON.stringify(_config));

    if (_config && _config.bullet) {
        if (_config.bullet.rate == 2) {
            layer = new showAdvLayer(2);
            node.addChild(layer,1000);
            oldScale = layer.getScale();
            layer.setScale(0);
            layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
        } else if(_config.bullet.rate == 1){
            if (_data != _lastData) {
                layer = new showAdvLayer(2);
                node.addChild(layer,1000);
                oldScale = layer.getScale();
                layer.setScale(0);
                layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
            }
        } else if (_config.bullet.rate == 3 && _updateTime != _config.updateTime) {
            layer = new showAdvLayer(2);
            node.addChild(layer, 1000);
            oldScale = layer.getScale();
            layer.setScale(0);
            layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
        }
        util.localStorageEncrypt.setStringItem(this.localStorageKey.KEY_FIENDCARDS_TIME, _data);
        util.localStorageEncrypt.setStringItem(this.localStorageKey.KEY_FIENDCARDS_UPDATATIME, _config.updateTime);

    }
};

/*
*红包局宣传图
*/
FriendCard_Common.showRedPackageAd = function() {
    if(!cc.sys.isObjectValid(MjClient.FriendCard_main_ui)){
        return;
    }
    var layer = new friendcard_redPackage_ad();
    MjClient.FriendCard_main_ui.addChild(layer);
};

//本地处理俱乐部桌子,亲友圈的排序去掉了,以联盟的为准
//1.桌子排序
//2.nofullDeskNum 未满人桌子数量
//3.fullDeskNum   满人桌子数量
//sortRuleIndex对应rule1中的1
//justRoom true 只是返回组合后的桌子列表
FriendCard_Common.deskSort = function(that,sortRuleIndex,justRoom) {

    var setRuleIndex = function(_ruleRoom, ruleIndex) {
        for (var i = 0; i < _ruleRoom.length; i++) {
            _ruleRoom[i].ruleIndex = ruleIndex;
        }
    }

    ruleRoom = [];

    var frontNoStartRoom = []; //未开始但在最前面的房间
    var noStartRoom = []; //未开始的房间
    var startRoom = []; //开始的房间
    var startIndex = sortRuleIndex ? (sortRuleIndex - 1) : (FriendCard_Common.getOSDClub(that) ? 0 : that.ruleIndex -1);
    var endIndex = sortRuleIndex ? sortRuleIndex : (FriendCard_Common.getOSDClub(that) ? FriendCard_Common.getRuleNumber() : that.ruleIndex);
    for (var i = startIndex; i < endIndex; i++) {
        var otherRuleIndex = i+1;
        var otherRule = that.data.info["rule" + otherRuleIndex];
        if (otherRule && otherRule != "delete" && (!otherRule.customInfo || sortRuleIndex) && (!that.data["rule" + otherRuleIndex+"Forbid"])) {
            if (!that.data.room["roomList" + otherRuleIndex])
                that.data.room["roomList" + otherRuleIndex] = [];
            var otherRuleRoom = that.data.room["roomList" + otherRuleIndex].slice();
            otherRule.ruleIndex = otherRuleIndex;

            FriendCard_Common.addNullRoom(that, otherRule, otherRuleRoom)
            setRuleIndex(otherRuleRoom, otherRuleIndex);
            ruleRoom = ruleRoom.concat(otherRuleRoom);
        }
    }
    if(justRoom){
        //只是返回组合后的桌子列表
        return ruleRoom;
    }
    var _roomNum = [];
    for (var i = startIndex; i < endIndex; i++) {
        _roomNum[i] =[];
        for(var j = 0;j < ruleRoom.length;j++){
            if (_roomNum[i] && ruleRoom[j] && ruleRoom[j].ruleIndex == (i+1))
                _roomNum[i].push(ruleRoom[j]);
        }
    }
    ruleRoom = [];

    var extraFullRoomNum = 0;
    var roomArrOpe = function(roomArr) {
        var _roomArr = FriendCard_Common.roomArrOpe(roomArr,{
            noSortByPlayerNum : true
        });
        frontNoStartRoom = frontNoStartRoom.concat(_roomArr.frontNoStartRoom);
        noStartRoom = noStartRoom.concat(_roomArr.noStartRoom);
        startRoom = startRoom.concat(_roomArr.startRoom);
    }
    var clubRulesSelect = FriendCard_Common.getClubRulesSelect(that.clubId);
    //为了得到所有玩法的满人桌子，和未满人桌子，要对所有roomList进行处理
    for (var i = startIndex; i < endIndex; i++) {
        //右上角玩法选中过滤
        if(clubRulesSelect.indexOf(-1) > -1 || clubRulesSelect.indexOf((i+1)) > -1){
            roomArrOpe(_roomNum[i]);
        }
    }

    // if(!FriendCard_Common.isLMClub()){
    //     //亲友圈等待中的桌子按人数排序，联盟等待中的桌子，根据创建时间排序，创建时间早的房间位置靠前（服务端排好了）
    //     noStartRoom.sort(function(a, b) {
    //         return b.players.length - a.players.length;
    //     });
    // }
    if(FriendCard_Common.isOnlyShowOutLineDesk() && FriendCard_Common.isManager()){
        //只显示离线桌子
        var arrs = [noStartRoom,frontNoStartRoom,startRoom];
        for(var k = 0 ; k < arrs.length; k++){
            for(var i = arrs[k].length -1; i >= 0; i--){
                var hasOffLine = false;
                if(arrs[k][i].players){
                    for(var j = 0; j < arrs[k][i].players.length; j++){
                        if(arrs[k][i].players[j].offline == true){
                            hasOffLine = true;
                            break;
                        }
                    }
                }
                if(!hasOffLine){
                    arrs[k].splice(i,1)
                }
            }
        }
    }else{
        //隐藏已开打桌子处理
        if(FriendCard_Common.isLMClub()){
            if(that.data.info.isTableHidden === 4){
                //隐藏全部
                startRoom = [];

            }else if (that.data.info.isTableHidden === 2){
                //隐藏1/2
                var beginIndex = startRoom.length - startRoom.length % 2;
                for(var i = beginIndex; i > 0; i--){
                    if(i % 2 == 0){
                        startRoom.splice(i-1,1);
                    }
                }
            }else if (that.data.info.isTableHidden === 3){
                //联盟最多展示20张开打桌子，与玩法无关
                for(var i = startRoom.length - 1; i >= 20 ; i--){
                    startRoom.splice(i,1);
                }
            }else{
                //联盟每个玩法最多留2张开打桌子
                var ruleIndex = -1;
                var ruleIndexNum = -1;
                for(var i = startRoom.length -1; i >= 0; i--){
                    if(ruleIndex != startRoom[i].ruleIndex){
                        ruleIndex = startRoom[i].ruleIndex;
                        ruleIndexNum = 0;
                    }
                    ruleIndexNum++;
                    if(ruleIndexNum > FriendCard_Common.maxPreStartRoomLM){
                        startRoom.splice(i,1)
                    }
                }
            }
        }else{
            //只对玩家进行隐藏，盟主、会长、管理员、组长、助理照常显示,隐藏已开打桌子
            if(FriendCard_Common.isOrdinaryMember()){
                if(that.data.info.isTableHidden === 2 || that.data.info.isTableHidden === 3){
                    //2:隐藏1/2已经开打的桌子  3:隐藏1/3已经开打的桌子
                    var beginIndex = startRoom.length - startRoom.length % that.data.info.isTableHidden;
                    for(var i = beginIndex; i > 0; i--){
                        if(i % that.data.info.isTableHidden == 0){
                            startRoom.splice(i-1,1);
                        }
                    }
                }else if (that.data.info.isTableHidden === 4){
                    startRoom = [];
                }
            }
        }
    }


    var allEmptyRoom = [];
    var allWaitStartRoom = [];
    //排序，按玩法分类顺序
    for (var i = startIndex; i < endIndex; i++) {
        var ruleWaitStartRoom = [];//有房号未开始的桌子
        var emptyRoom = [];//假桌子

        //拆分桌子
        for (var j = noStartRoom.length -1; j >= 0; j--) {
            if(noStartRoom[j].ruleIndex == (i+1)){
                var itemData = (noStartRoom.splice(j,1))[0];
                if(itemData.roomNum){
                    ruleWaitStartRoom.unshift(itemData);
                }else{
                    emptyRoom.unshift(itemData);
                }
            }
        }
        for (var j = frontNoStartRoom.length -1; j >= 0; j--) {
            if(frontNoStartRoom[j].ruleIndex == (i+1)){
                var itemData = (frontNoStartRoom.splice(j,1))[0];
                if(itemData.roomNum){
                    ruleWaitStartRoom.unshift(itemData);
                }else{
                    emptyRoom.unshift(itemData);
                }
            }
        }
        allWaitStartRoom = allWaitStartRoom.concat(ruleWaitStartRoom);
        allEmptyRoom = allEmptyRoom.concat(emptyRoom);

    }
    ruleRoom = FriendCard_Common.sortRoom(that,allWaitStartRoom,allEmptyRoom,startRoom);

    var msg = {};
    msg.ruleRoom = ruleRoom;
    msg.startRoom = startRoom;//联盟的开始桌子定义是roundNum > 0 ,亲友圈的开始桌子定义是满人
    msg.allEmptyRoom = allEmptyRoom;
    msg.allWaitStartRoom = allWaitStartRoom;

    msg.nofullDeskNum = 0;
    msg.fullDeskNum = 0;
    for(var i = 0; i < ruleRoom.length; i++){
        if(ruleRoom[i].players.length >= ruleRoom[i].maxPlayer || (ruleRoom[i].roundNum && ruleRoom[i].roundNum > 0)){
            msg.fullDeskNum++;
        }else{
            msg.nofullDeskNum++;
        }
    }
    return msg;
}

/*
*本地处理俱乐部桌子2，增量更新，目前的isTableHidden只处理了联盟
*/
FriendCard_Common.reHandleDeskSort = function(that,params){

    var optRoomData;

    var ruleIndexRooms = FriendCard_Common.deskSort(that,params.data.ruleId,true);
    for(var i = 0 ; i < ruleIndexRooms.length; i++){
        if(ruleIndexRooms[i].roomNum == params.data.roomNum){
            optRoomData = JSON.parse(JSON.stringify(ruleIndexRooms[i]));
            break;
        }
    }

    var isStartRoomServer = false;//服务端桌子信息是否已经开打
    var isStartRoomLocal = false;//本地桌子信息是否已经开打
    var indexLocal = -1;

    if(optRoomData && optRoomData.roundNum){
        isStartRoomServer = true;
    }

    for(var i = 0; i < that._deskRoomData.startRoom.length; i++){
        if(that._deskRoomData.startRoom[i].roomNum == params.data.roomNum){
            isStartRoomLocal = true;
            indexLocal = i;
            break;
        }
    }
    if(indexLocal < 0){
        for(var i = 0; i < that._deskRoomData.allWaitStartRoom.length; i++){
            if(that._deskRoomData.allWaitStartRoom[i].roomNum == params.data.roomNum){
                indexLocal = i;
                break;
            }
        }
    }
    //var beforeAllWaitStartRoom = JSON.parse(JSON.stringify(that._deskRoomData.allWaitStartRoom));
    var conditionType0 = optRoomData && (params.data.type == 0 && params.data.roomNum);
    var conditionType1 = !optRoomData && (params.data.type == 1 && params.data.roomNum) && (indexLocal > -1);
    var conditionType2 = optRoomData && (params.data.type == 2 && params.data.roomNum) && (indexLocal > -1);
    if(conditionType0 || conditionType1 || conditionType2){
        if (FriendCard_Common.getClubsortord(that) == 2) {
            //开打的在后
            if(params.data.type == 0){
                //新增桌子，需要避免后端重复消息bug导致重复添加
                if(indexLocal < 0){
                    that._deskRoomData.allWaitStartRoom.push(optRoomData);
                    if(that._deskRoomData.startRoom.length > 1){
                        FriendCard_Common.toTailArr(that._deskRoomData.startRoom,0);
                    }
                }else{
                    if(isStartRoomLocal){
                        that._deskRoomData.startRoom[indexLocal] = optRoomData;
                    }else{
                        that._deskRoomData.allWaitStartRoom[indexLocal] = optRoomData;
                    }
                }

            }else if(params.data.type == 1){
                //移除桌子
                if(isStartRoomLocal){
                    if(that._deskRoomData.startRoom.length > 1){
                        FriendCard_Common.swapArr(that._deskRoomData.startRoom,indexLocal,that._deskRoomData.startRoom.length-1);
                    }
                    that._deskRoomData.startRoom.splice(that._deskRoomData.startRoom.length-1,1);
                }else{
                    if(that._deskRoomData.allWaitStartRoom.length > 1){
                        FriendCard_Common.swapArr(that._deskRoomData.allWaitStartRoom,indexLocal,that._deskRoomData.allWaitStartRoom.length-1);
                    }
                    that._deskRoomData.allWaitStartRoom.splice(that._deskRoomData.allWaitStartRoom.length-1,1);
                    if(that._deskRoomData.startRoom.length > 1){
                        FriendCard_Common.toFirstArr(that._deskRoomData.startRoom,that._deskRoomData.startRoom.length-1);
                    }
                }
            }else{
                //修改桌子
                if(isStartRoomServer){
                    if(isStartRoomLocal){
                        that._deskRoomData.startRoom[indexLocal] = optRoomData;
                    }else{
                        //未开局变成开局
                        if(that._deskRoomData.allWaitStartRoom.length > 1){
                            FriendCard_Common.swapArr(that._deskRoomData.allWaitStartRoom,indexLocal,that._deskRoomData.allWaitStartRoom.length-1);
                        }

                        that._deskRoomData.allWaitStartRoom.splice(that._deskRoomData.allWaitStartRoom.length-1,1);

                        if(FriendCard_Common.isLMClub()){
                            if(that.data.info.isTableHidden == 3){
                                //开打桌子全部玩法最多20张
                                if(that._deskRoomData.startRoom.length < FriendCard_Common.maxAllStartRoomLM){
                                    that._deskRoomData.startRoom.unshift(optRoomData);
                                }else{
                                    FriendCard_Common.toFirstArr(that._deskRoomData.startRoom,that._deskRoomData.startRoom.length -1);
                                }
                            }else if(that.data.info.isTableHidden == 2){
                                //开打桌子隐藏1/2
                                var serverStartRoomNum = 0;
                                for(var i = 0 ; i < ruleIndexRooms.length; i++){
                                    if(ruleIndexRooms[i].roundNum){
                                        serverStartRoomNum++;
                                    }
                                }
                                if(that._deskRoomData.startRoom.length * 2 < serverStartRoomNum){
                                    that._deskRoomData.startRoom.unshift(optRoomData);
                                }else{
                                    FriendCard_Common.toFirstArr(that._deskRoomData.startRoom,that._deskRoomData.startRoom.length -1);
                                }
                            }else if(that.data.info.isTableHidden == 4){
                                //开打桌子全部隐藏
                            }else{
                                //开打桌子每个玩法最多2张
                                var ruleIndexNum = 0;
                                for(var i = 0; i < that._deskRoomData.startRoom.length; i++){
                                    if(that._deskRoomData.startRoom[i].ruleIndex == params.data.ruleId){
                                        ruleIndexNum++;
                                    }
                                }
                                if(ruleIndexNum < FriendCard_Common.maxPreStartRoomLM){
                                    that._deskRoomData.startRoom.unshift(optRoomData);
                                }else{
                                    FriendCard_Common.toFirstArr(that._deskRoomData.startRoom,that._deskRoomData.startRoom.length -1);
                                }
                            }
                        }else{
                            //亲友圈只对玩家进行隐藏，盟主、会长、管理员、组长、助理照常显示,隐藏已开打桌子
                            if(FriendCard_Common.isOrdinaryMember()){
                                if(that.data.info.isTableHidden === 2){
                                    //2:隐藏1/2已经开打的桌子
                                    var serverStartRoomNum = 0;
                                    for(var i = 0 ; i < ruleIndexRooms.length; i++){
                                        if(ruleIndexRooms[i].roundNum){
                                            serverStartRoomNum++;
                                        }
                                    }
                                    if(that._deskRoomData.startRoom.length * 2 < serverStartRoomNum){
                                        that._deskRoomData.startRoom.unshift(optRoomData);
                                    }else{
                                        FriendCard_Common.toFirstArr(that._deskRoomData.startRoom,that._deskRoomData.startRoom.length -1);
                                    }
                                }else if(that.data.info.isTableHidden === 3){
                                    //3:隐藏1/3已经开打的桌子
                                    var serverStartRoomNum = 0;
                                    for(var i = 0 ; i < ruleIndexRooms.length; i++){
                                        if(ruleIndexRooms[i].roundNum){
                                            serverStartRoomNum++;
                                        }
                                    }
                                    if(that._deskRoomData.startRoom.length * 3 / 2 < serverStartRoomNum){
                                        that._deskRoomData.startRoom.unshift(optRoomData);
                                    }else{
                                        FriendCard_Common.toFirstArr(that._deskRoomData.startRoom,that._deskRoomData.startRoom.length -1);
                                    }
                                }else if (that.data.info.isTableHidden === 4){
                                    //开打桌子全部隐藏
                                }else{
                                    //不隐藏
                                    that._deskRoomData.startRoom.unshift(optRoomData);
                                }
                            }else{
                                that._deskRoomData.startRoom.unshift(optRoomData);
                            }
                        }

                    }
                }else{
                    if(isStartRoomLocal){
                        if(that._deskRoomData.startRoom.length > 1){
                            FriendCard_Common.toFirstArr(that._deskRoomData.startRoom,indexLocal);
                        }
                        that._deskRoomData.startRoom.splice(0,1);
                        that._deskRoomData.allWaitStartRoom.push(optRoomData);
                    }else{
                        that._deskRoomData.allWaitStartRoom[indexLocal] = optRoomData;
                    }
                }
            }
        }else if (FriendCard_Common.getClubsortord(that) == 4) {
            //开打的在中
            if(params.data.type == 0){
                //新增桌子，需要避免后端重复消息bug导致重复添加
                if(indexLocal < 0){
                    that._deskRoomData.allWaitStartRoom.push(optRoomData);
                    if(that._deskRoomData.startRoom.length > 1){
                        FriendCard_Common.toTailArr(that._deskRoomData.startRoom,0);
                    }
                }else{
                    if(isStartRoomLocal){
                        that._deskRoomData.startRoom[indexLocal] = optRoomData;
                    }else{
                        that._deskRoomData.allWaitStartRoom[indexLocal] = optRoomData;
                    }
                }

            }else if(params.data.type == 1){
                //移除桌子
                if(isStartRoomLocal){
                    if(that._deskRoomData.startRoom.length > 1){
                        FriendCard_Common.swapArr(that._deskRoomData.startRoom,indexLocal,that._deskRoomData.startRoom.length-1);
                    }
                    that._deskRoomData.startRoom.splice(that._deskRoomData.startRoom.length-1,1);
                }else{
                    if(that._deskRoomData.allWaitStartRoom.length > 1){
                        FriendCard_Common.swapArr(that._deskRoomData.allWaitStartRoom,indexLocal,that._deskRoomData.allWaitStartRoom.length-1);
                    }
                    that._deskRoomData.allWaitStartRoom.splice(that._deskRoomData.allWaitStartRoom.length-1,1);
                    if(that._deskRoomData.startRoom.length > 1){
                        FriendCard_Common.toFirstArr(that._deskRoomData.startRoom,that._deskRoomData.startRoom.length-1);
                    }
                }
            }else{
                //修改桌子
                if(isStartRoomServer){
                    if(isStartRoomLocal){
                        that._deskRoomData.startRoom[indexLocal] = optRoomData;
                    }else{
                        //未开局变成开局
                        if(that._deskRoomData.allWaitStartRoom.length > 1){
                            FriendCard_Common.swapArr(that._deskRoomData.allWaitStartRoom,indexLocal,that._deskRoomData.allWaitStartRoom.length-1);
                        }

                        that._deskRoomData.allWaitStartRoom.splice(that._deskRoomData.allWaitStartRoom.length-1,1);
                        if(FriendCard_Common.isLMClub()){
                            if(that.data.info.isTableHidden == 3){
                                //开打桌子全部玩法最多20张
                                if(that._deskRoomData.startRoom.length < FriendCard_Common.maxAllStartRoomLM){
                                    that._deskRoomData.startRoom.unshift(optRoomData);
                                }else{
                                    FriendCard_Common.toFirstArr(that._deskRoomData.startRoom,that._deskRoomData.startRoom.length -1);
                                }
                            }else if(that.data.info.isTableHidden == 2){
                                //开打桌子隐藏1/2
                                var serverStartRoomNum = 0;
                                for(var i = 0 ; i < ruleIndexRooms.length; i++){
                                    if(ruleIndexRooms[i].roundNum){
                                        serverStartRoomNum++;
                                    }
                                }
                                if(that._deskRoomData.startRoom.length * 2 < serverStartRoomNum){
                                    that._deskRoomData.startRoom.unshift(optRoomData);
                                }else{
                                    FriendCard_Common.toFirstArr(that._deskRoomData.startRoom,that._deskRoomData.startRoom.length -1);
                                }
                            }else if(that.data.info.isTableHidden == 4){
                                //开打桌子全部隐藏
                            }else{
                                //开打桌子每个玩法最多2张
                                var ruleIndexNum = 0;
                                for(var i = 0; i < that._deskRoomData.startRoom.length; i++){
                                    if(that._deskRoomData.startRoom[i].ruleIndex == params.data.ruleId){
                                        ruleIndexNum++;
                                    }
                                }
                                if(ruleIndexNum < FriendCard_Common.maxPreStartRoomLM){
                                    that._deskRoomData.startRoom.unshift(optRoomData);
                                }else{
                                    FriendCard_Common.toFirstArr(that._deskRoomData.startRoom,that._deskRoomData.startRoom.length -1);
                                }
                            }
                        }else{
                            //亲友圈只对玩家进行隐藏，盟主、会长、管理员、组长、助理照常显示,隐藏已开打桌子
                            if(FriendCard_Common.isOrdinaryMember()){
                                if(that.data.info.isTableHidden === 2){
                                    //2:隐藏1/2已经开打的桌子
                                    var serverStartRoomNum = 0;
                                    for(var i = 0 ; i < ruleIndexRooms.length; i++){
                                        if(ruleIndexRooms[i].roundNum){
                                            serverStartRoomNum++;
                                        }
                                    }

                                    if(that._deskRoomData.startRoom.length * 2 < serverStartRoomNum){
                                        that._deskRoomData.startRoom.unshift(optRoomData);
                                    }else{
                                        FriendCard_Common.toFirstArr(that._deskRoomData.startRoom,that._deskRoomData.startRoom.length -1);
                                    }
                                }else if(that.data.info.isTableHidden === 3){
                                    //3:隐藏1/3已经开打的桌子
                                    var serverStartRoomNum = 0;
                                    for(var i = 0 ; i < ruleIndexRooms.length; i++){
                                        if(ruleIndexRooms[i].roundNum){
                                            serverStartRoomNum++;
                                        }
                                    }
                                    if(that._deskRoomData.startRoom.length * 3 / 2 < serverStartRoomNum){
                                        that._deskRoomData.startRoom.unshift(optRoomData);
                                    }else{
                                        FriendCard_Common.toFirstArr(that._deskRoomData.startRoom,that._deskRoomData.startRoom.length -1);
                                    }
                                }else if (that.data.info.isTableHidden === 4){
                                    //开打桌子全部隐藏
                                }else{
                                    //不隐藏
                                    that._deskRoomData.startRoom.unshift(optRoomData);
                                }
                            }else{
                                that._deskRoomData.startRoom.unshift(optRoomData);
                            }
                        }
                    }
                }else{
                    if(isStartRoomLocal){
                        if(that._deskRoomData.startRoom.length > 1){
                            FriendCard_Common.toFirstArr(that._deskRoomData.startRoom,indexLocal);
                        }
                        that._deskRoomData.startRoom.splice(0,1);
                        that._deskRoomData.allWaitStartRoom.push(optRoomData);
                    }else{
                        that._deskRoomData.allWaitStartRoom[indexLocal] = optRoomData;
                    }
                }
            }
        }else{
            //开打在前
            if(params.data.type == 0){
                //新增桌子，需要避免后端重复消息bug导致重复添加
                if(indexLocal < 0){
                    that._deskRoomData.allWaitStartRoom.push(optRoomData);
                }else{
                    if(isStartRoomLocal){
                        that._deskRoomData.startRoom[indexLocal] = optRoomData;
                    }else{
                        that._deskRoomData.allWaitStartRoom[indexLocal] = optRoomData;
                    }
                }
            }else if(params.data.type == 1){
                //移除桌子
                if(isStartRoomLocal){
                    if(that._deskRoomData.startRoom.length > 1){
                        FriendCard_Common.swapArr(that._deskRoomData.startRoom,indexLocal,that._deskRoomData.startRoom.length-1);
                    }
                    that._deskRoomData.startRoom.splice(that._deskRoomData.startRoom.length-1,1);
                    if(that._deskRoomData.allWaitStartRoom.length > 1){
                        FriendCard_Common.toFirstArr(that._deskRoomData.allWaitStartRoom,that._deskRoomData.allWaitStartRoom.length-1);
                    }
                }else{
                    if(that._deskRoomData.allWaitStartRoom.length > 1){
                        FriendCard_Common.swapArr(that._deskRoomData.allWaitStartRoom,indexLocal,that._deskRoomData.allWaitStartRoom.length-1);
                    }
                    that._deskRoomData.allWaitStartRoom.splice(that._deskRoomData.allWaitStartRoom.length-1,1);
                }
            }else{
                //修改桌子
                if(isStartRoomServer){
                    if(isStartRoomLocal){
                        that._deskRoomData.startRoom[indexLocal] = optRoomData;
                    }else{
                        //未开局变成开局
                        if(that._deskRoomData.allWaitStartRoom.length > 1){
                            FriendCard_Common.swapArr(that._deskRoomData.allWaitStartRoom,indexLocal,0);
                        }
                        that._deskRoomData.allWaitStartRoom.splice(0,1);

                        var ruleIndexNum = 0;
                        for(var i = 0; i < that._deskRoomData.startRoom.length; i++){
                            if(that._deskRoomData.startRoom[i].ruleIndex == params.data.ruleId){
                                ruleIndexNum++;
                            }
                        }

                        if (FriendCard_Common.isLMClub()) {
                            if(that.data.info.isTableHidden == 3){
                                //开打桌子全部玩法最多20张
                                if(that._deskRoomData.startRoom.length < FriendCard_Common.maxAllStartRoomLM){
                                    that._deskRoomData.startRoom.push(optRoomData);
                                }
                            }else if(that.data.info.isTableHidden == 2){
                                //开打桌子隐藏1/2
                                var serverStartRoomNum = 0;
                                for(var i = 0 ; i < ruleIndexRooms.length; i++){
                                    if(ruleIndexRooms[i].roundNum){
                                        serverStartRoomNum++;
                                    }
                                }
                                if(that._deskRoomData.startRoom.length * 2 < serverStartRoomNum){
                                    that._deskRoomData.startRoom.push(optRoomData);
                                }
                            }else if(that.data.info.isTableHidden == 4){
                                //开打桌子全部隐藏
                            }else{
                                //开打桌子每个玩法最多2张
                                var ruleIndexNum = 0;
                                for(var i = 0; i < that._deskRoomData.startRoom.length; i++){
                                    if(that._deskRoomData.startRoom[i].ruleIndex == params.data.ruleId){
                                        ruleIndexNum++;
                                    }
                                }
                                if(ruleIndexNum < FriendCard_Common.maxPreStartRoomLM){
                                    that._deskRoomData.startRoom.push(optRoomData);
                                }
                            }
                        }else{
                            //亲友圈只对玩家进行隐藏，盟主、会长、管理员、组长、助理照常显示,隐藏已开打桌子
                            if(FriendCard_Common.isOrdinaryMember()){
                                if(that.data.info.isTableHidden === 2){
                                    //2:隐藏1/2已经开打的桌子
                                    var serverStartRoomNum = 0;
                                    for(var i = 0 ; i < ruleIndexRooms.length; i++){
                                        if(ruleIndexRooms[i].roundNum){
                                            serverStartRoomNum++;
                                        }
                                    }

                                    if(that._deskRoomData.startRoom.length * 2 < serverStartRoomNum){
                                        that._deskRoomData.startRoom.push(optRoomData);
                                    }
                                }else if(that.data.info.isTableHidden === 3){
                                    //3:隐藏1/3已经开打的桌子
                                    var serverStartRoomNum = 0;
                                    for(var i = 0 ; i < ruleIndexRooms.length; i++){
                                        if(ruleIndexRooms[i].roundNum){
                                            serverStartRoomNum++;
                                        }
                                    }
                                    if(that._deskRoomData.startRoom.length * 3 / 2 < serverStartRoomNum){
                                        that._deskRoomData.startRoom.push(optRoomData);
                                    }
                                }else if (that.data.info.isTableHidden === 4){
                                    //开打桌子全部隐藏
                                }else{
                                    //不隐藏
                                    that._deskRoomData.startRoom.push(optRoomData);
                                }
                            }else{
                                that._deskRoomData.startRoom.push(optRoomData);
                            }
                        }

                    }
                }else{
                    if(isStartRoomLocal){
                        if(that._deskRoomData.startRoom.length > 1){
                            FriendCard_Common.swapArr(that._deskRoomData.startRoom,indexLocal,that._deskRoomData.startRoom.length-1);
                        }
                        that._deskRoomData.startRoom.splice(that._deskRoomData.startRoom.length-1,1);
                        that._deskRoomData.allWaitStartRoom.unshift(optRoomData);
                    }else{
                        that._deskRoomData.allWaitStartRoom[indexLocal] = optRoomData;
                    }
                }
            }
        }
        /*if(cc.sys.OS_WINDOWS == cc.sys.os){
            var hasDirtyData = false;
            for(var i = 0; i < that._deskRoomData.allWaitStartRoom.length; i++){
                if(!that._deskRoomData.allWaitStartRoom[i]){
                    hasDirtyData = true;
                }
            }
            if(hasDirtyData){
                cc.log("reHandleDeskSort param.data",JSON.stringify(params.data),"indexLocal",indexLocal);
                cc.log("reHandleDeskSort that._deskRoomData.allWaitStartRoom",JSON.stringify(that._deskRoomData.allWaitStartRoom))
                cc.log("reHandleDeskSort beforeAllWaitStartRoom",JSON.stringify(beforeAllWaitStartRoom))
                mylog("这很可能是一个bug，找开发确认")
            }
        }*/
        that._deskRoomData.ruleRoom = FriendCard_Common.sortRoom(that,that._deskRoomData.allWaitStartRoom,that._deskRoomData.allEmptyRoom,that._deskRoomData.startRoom);

        that._deskRoomData.nofullDeskNum = 0;
        that._deskRoomData.fullDeskNum = 0;
        for(var i = 0; i < that._deskRoomData.ruleRoom.length; i++){
            if(that._deskRoomData.ruleRoom[i].players.length >= that._deskRoomData.ruleRoom[i].maxPlayer || (that._deskRoomData.ruleRoom[i].roundNum && that._deskRoomData.ruleRoom[i].roundNum > 0)){
                that._deskRoomData.fullDeskNum++;
            }else{
                that._deskRoomData.nofullDeskNum++;
            }
        }
        return true;
    }else{
        return false;
        //that._deskRoomData = ruleRoomData;
    }
}
/*
*数组交换位置
*/
FriendCard_Common.swapArr = function(arr, index1, index2) {
    var a = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = a;
    return arr;
}

FriendCard_Common.toFirstArr = function(arr,index) {
    if(index != 0){
        arr.unshift(arr.splice(index , 1)[0]);
    }
}
FriendCard_Common.toTailArr = function(arr,index) {
    if(index != arr.length - 1){
        arr.push(arr.splice(index , 1)[0]);
    }
}
/*
*桌子排序开打排序
*/
FriendCard_Common.sortRoom = function(that,allWaitStartRoom,allEmptyRoom,startRoom){
    var ruleRoom = [];
    if (FriendCard_Common.getClubsortord(that) == 2) {
        //开打的在后
        ruleRoom = ruleRoom.concat(allWaitStartRoom)
        if(that.data.info.isEmptyDeskFirst){////空桌在前
            ruleRoom = allEmptyRoom.concat(ruleRoom);
        }else{
            ruleRoom = ruleRoom.concat(allEmptyRoom);
        }
        ruleRoom = ruleRoom.concat(startRoom);
    }else if (FriendCard_Common.getClubsortord(that) == 4) {
        //开打的在中
        ruleRoom = ruleRoom.concat(allWaitStartRoom);
        ruleRoom = ruleRoom.concat(startRoom);
        ruleRoom = ruleRoom.concat(allEmptyRoom);
    }else{
        //开打在前
        ruleRoom = ruleRoom.concat(startRoom);
        ruleRoom = ruleRoom.concat(allWaitStartRoom);
        ruleRoom = ruleRoom.concat(allEmptyRoom);
    }
    return ruleRoom;
}
/*
    亲友圈主界面：添加空桌子
*/
FriendCard_Common.addNullRoom = function(that, rule, ruleRoom) {
    if ((!that.data.info.useClose || (that.data.info.useClose == 1 && !FriendCard_Common.isInDaYangTime())) && that.data.info.createSwitch != 0) {
        var isStopRoom = ((!((rule.ruleIndex+"") in that.data.info.ruleSwitch)) || that.data.info.ruleSwitch[rule.ruleIndex+""]) ? false : true;
        if(isStopRoom){
            return;
        }
        var unRoomNumber = 0;
        for (var i = 0; i < ruleRoom.length; i++) {
            if (ruleRoom[i].players.length < ruleRoom[i].maxPlayer && (!ruleRoom[i].roundNum || ruleRoom[i].roundNum <= 0)) {
                unRoomNumber++;
            }
        }
        //rule.customInfo 是否自主创建房间，有这个选项，不增加假桌子
        var customInfo = false;
        if (rule && rule.customInfo){
            customInfo = rule.customInfo;
        }
        //联盟忽略不满人不开新桌选项
        var maxUnStartCount = FriendCard_Common.isLMClub() ? (that.data.info.unStartCount > 1 ? that.data.info.unStartCount : 4) : that.data.info.unStartCount;
        if (unRoomNumber < maxUnStartCount && rule && !customInfo) {
            var fakeRoom = {
                "roomNum":      null,
                "gameType":     rule.gameType,
                "maxPlayer":    rule.maxPlayer,
                "createTime":   -1,
                "ruleDesc":     "",
                "players":      [],
                "ruleIndex":    rule.ruleIndex
            };
            ruleRoom.push(fakeRoom);
        }
    }
}

/*
得到roomArr的 未开始但在最前面的房间 未开始的房间 开始的房间
*/
FriendCard_Common.roomArrOpe = function(roomArr,params) {
    //cc.log("FriendCard_Common.roomArrOpe")
    if(!params){
        params = {};
    }
    var that = MjClient.FriendCard_main_ui;
    var _roomArr = {};
    _roomArr.frontNoStartRoom = []; //未开始但在最前面的房间 人数最多的,亲友圈有维护
    _roomArr.noStartRoom = []; //未开始的房间
    _roomArr.startRoom = []; //开始的房间
    _roomArr.emptytRoom = []; //假桌子，联盟才维护
    if(!params.noSortByPlayerNum){
        var maxPlayerDesk = 0; //当前玩法未开始桌子的最大人数
        for (var i = 0; i < roomArr.length; i++) {
            if ((!roomArr[i].roundNum || roomArr[i].roundNum <= 0) && (roomArr[i].players.length > maxPlayerDesk)) {
                maxPlayerDesk = roomArr[i].players.length;
                var temp = roomArr[i];
                roomArr[i] = roomArr[0];
                roomArr[0] = temp;
            }
        }
    }

    var roomArrBool = false
    for (var i = 0; i < roomArr.length; i++) {
        if ((!roomArr[i].roundNum || roomArr[i].roundNum <= 0) && !roomArrBool) {
            var a = roomArr.splice(i, 1)
            _roomArr.frontNoStartRoom.push(a[0]);
            roomArrBool = true;
            break;
        }
    }
    if (!roomArrBool && roomArr[0]) {
        var b = roomArr.shift();
        var isStopRoom = ((!((b.ruleIndex+"") in that.data.info.ruleSwitch)) ||
            that.data.info.ruleSwitch[b.ruleIndex+""]) ? false : true;
        if(isStopRoom){
            //勾选暂停开房之后，解散该玩法所有未开打桌子，并且前端屏蔽该玩法的假桌子和已开打桌子，但是不影响已经开打的桌子继续游戏。
        }else{
            _roomArr.frontNoStartRoom.push(b);
        }

    }

    for (var i = 0; i < roomArr.length; i++) {
        if (roomArr[i].players.length < roomArr[i].maxPlayer && (!roomArr[i].roundNum || roomArr[i].roundNum <= 0)) {
            _roomArr.noStartRoom = _roomArr.noStartRoom.concat(roomArr[i])
        } else {
            var isStopRoom = ((!((roomArr[i].ruleIndex+"") in that.data.info.ruleSwitch)) ||
                that.data.info.ruleSwitch[roomArr[i].ruleIndex+""]) ? false : true;
            if(isStopRoom){
                //勾选暂停开房之后，解散该玩法所有未开打桌子，并且前端屏蔽该玩法的假桌子和已开打桌子，但是不影响已经开打的桌子继续游戏。
            }else{

                if(roomArr[i].roundNum){
                    _roomArr.startRoom = _roomArr.startRoom.concat(roomArr[i])
                }else{
                    _roomArr.noStartRoom = _roomArr.noStartRoom.concat(roomArr[i])
                }

                // if(FriendCard_Common.isLMClub()){
                //     if(roomArr[i].roundNum){
                //         _roomArr.startRoom = _roomArr.startRoom.concat(roomArr[i])
                //     }else{
                //         _roomArr.noStartRoom = _roomArr.noStartRoom.concat(roomArr[i])
                //     }
                // }else{
                //     _roomArr.startRoom = _roomArr.startRoom.concat(roomArr[i])
                // }
            }
        }
    }
    return _roomArr;
}



//俱乐部桌子上文本处理
FriendCard_Common.deskRoundNumText = function(that,roundNumText, room) {
    //var that = MjClient.FriendCard_main_ui;
    roundNumText.ignoreContentAdaptWithSize(true);
    roundNumText.visible = true;
    if (room.roomNum) {
        if (room.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI ||
            room.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
            room.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA ||
            room.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA) {
            roundNumText.setString((room.maxScore || 0) + "胡");
        } else if (room.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG ||
            room.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN ||
            room.gameType == MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO ||
            room.gameType == MjClient.GAME_TYPE.DIAN_TUO) {
            roundNumText.setString((room.maxScore || 0) + "分");
        } else {
            roundNumText.setString("(" + room.roundNum + "/" + that.data.info["rule" + room.ruleIndex].round + " 局)");
        }
    } else {
        if (isJinZhongAPPType() && that.customInfo) {
            roundNumText.setString("加入");
        } else {
            var splitRuleName = FriendCard_Common.splitClubRuleName(unescape(that.data.info["rule" + room.ruleIndex].ruleName));

            var ruleName = splitRuleName[1];
            if(!splitRuleName[0]){
                ruleName = GameCnName[that.data.info["rule" + room.ruleIndex].gameType]+"";
            }
            if (ruleName.length > 6) {
                roundNumText.setFontSize(20);
            }
            roundNumText.setString(ruleName);
        }
    }
}


//俱乐部事件绑定
FriendCard_Common.eventBind = function(that) {
    UIEventBind(null, that, "audit_diamond_order_seller", function(rtn) {
        that.setShopSheetTip();
    });

    // 刷新房间
    UIEventBind(null, that, "club_refresh_room", function(rtn) {
        if (that.data && rtn.clubId != that.clubId) {
            cc.log("warning:服务刷新亲友圈房间, clubId有误！！ rtn.clubId=" + rtn.clubId + " this.clubId=" + that.clubId);
            return;
        }
        if (that.data) {
            for (var key in rtn) {
                that.data.room[key] = rtn[key];
            }
            that.refreshDeskList();
        }
    });
    // 更新房间
    UIEventBind(null, that, "club_update_room", function(rtn) {
        if (that.data && rtn.clubId != that.clubId) {
            cc.log("warning:服务更新亲友圈房间, clubId有误！！ rtn.clubId=" + rtn.clubId + " this.clubId=" + that.clubId);
            return;
        }
        if (that.data) {
            var roomList = that.data.room["roomList" + rtn.ruleId];
            if (rtn.type == 0) {
                //兼容后端bug，连续推了相同的数据
                var hasEqual = false;
                for(var i = 0; i < roomList.length; i++){
                    if(roomList[i] && roomList[i].roomNum == rtn.data.roomNum){
                        roomList[i] = rtn.data;
                        hasEqual = true;
                        break;
                    }
                }
                if(!hasEqual){
                    roomList.push(rtn.data);
                }
            } else {
                var room;
                for (var i = 0; i < roomList.length; ++ i) {
                    if (rtn.roomNum == roomList[i].roomNum) {
                        room = roomList[i];
                        break;
                    }
                }
                if (!room) {
                    return;
                }

                if (rtn.type == 1) {
                    roomList.splice(roomList.indexOf(room), 1);
                } else {
                    if (rtn.uid) {
                        var pl;
                        for (var i = 0; i < room.players.length; ++ i) {
                            if (room.players[i].uid == rtn.uid) {
                                pl = room.players[i];
                                break;
                            }
                        }
                        if (pl) {
                            for (k in rtn.data) {
                                pl[k] = rtn.data[k];
                            }
                        }
                    } else {
                        for (k in rtn.data) {
                            room[k] = rtn.data[k];
                        }
                    }
                }
            }
            var clubRulesSelect = FriendCard_Common.getClubRulesSelect(that.clubId);
            //右上角玩法选中过滤
            if(clubRulesSelect.indexOf(-1) > -1 || clubRulesSelect.indexOf(rtn.ruleId) > -1){
                if(FriendCard_Common.isOnlyShowOutLineDesk() && FriendCard_Common.isManager()){
                    that.refreshDeskList();
                }else{
                    that.refreshDeskList({
                        isUpdate:true,
                        data:rtn,
                    });
                }
            }
        }
    });
    // 联盟 刷新房间
    UIEventBind(null, that, "league_refresh_room", function(rtn) {
        rtn.clubId = rtn.leagueId
        if (that.data && rtn.clubId != that.clubId) {
            cc.log("warning:服务刷新亲友圈房间, clubId有误！！ rtn.clubId=" + rtn.clubId + " this.clubId=" + that.clubId);
            return;
        }
        if (that.data) {
            for (var key in rtn) {
                that.data.room[key] = rtn[key];
            }
            that.refreshDeskList();
        }
    });

     // 联盟 更新房间
    UIEventBind(null, that, "league_update_room", function(rtn) {
        rtn.clubId = rtn.leagueId
        if (that.data && rtn.clubId != that.clubId) {
            cc.log("warning:服务刷新亲友圈房间, clubId有误！！ rtn.clubId=" + rtn.clubId + " this.clubId=" + that.clubId);
            return;
        }
        if (that.data) {
            var roomList = that.data.room["roomList" + rtn.ruleId];
            if (rtn.type == 0) {
                //兼容后端bug，连续推了相同的数据
                var hasEqual = false;
                for(var i = 0; i < roomList.length; i++){
                    if(roomList[i] && roomList[i].roomNum == rtn.data.roomNum){
                        roomList[i] = rtn.data;
                        hasEqual = true;
                        break;
                    }
                }
                if(!hasEqual){
                    roomList.push(rtn.data);
                }
            } else {
                var room;
                for (var i = 0; i < roomList.length; ++ i) {
                    if (rtn.roomNum == roomList[i].roomNum) {
                        room = roomList[i];
                        break;
                    }
                }
                if (!room) {
                    return;
                }

                if (rtn.type == 1) {
                    roomList.splice(roomList.indexOf(room), 1);
                } else {
                    if (rtn.uid) {
                        var pl;
                        for (var i = 0; i < room.players.length; ++ i) {
                            if (room.players[i].uid == rtn.uid) {
                                pl = room.players[i];
                                break;
                            }
                        }
                        if (pl) {
                            for (k in rtn.data) {
                                pl[k] = rtn.data[k];
                            }
                        }
                    } else {
                        for (k in rtn.data) {
                            room[k] = rtn.data[k];
                        }
                    }
                }
            }
            var clubRulesSelect = FriendCard_Common.getClubRulesSelect(that.clubId);
            //右上角玩法选中过滤
            if(clubRulesSelect.indexOf(-1) > -1 || clubRulesSelect.indexOf(rtn.ruleId) > -1){
                if(FriendCard_Common.isOnlyShowOutLineDesk() && FriendCard_Common.isManager()){
                    that.refreshDeskList();
                }else{
                    that.refreshDeskList({
                        isUpdate:true,
                        data:rtn,
                    });
                }

            }

        }
    });
    UIEventBind(null, that, "league_rule_forbid_user", function(rtn) {
        rtn.clubId = rtn.leagueId
        if (that.data && rtn.clubId != that.clubId) {
            cc.log("warning:服务刷新亲友圈房间, clubId有误！！ rtn.clubId=" + rtn.clubId + " this.clubId=" + that.clubId);
            return;
        }
        if (that.data) {
            for(var key in rtn){
                if(key.indexOf("rule") == 0){
                    that.data[key] = rtn[key].indexOf(MjClient.data.pinfo.uid) < 0 ? 0 : 1;
                }
            }
            that.refreshDeskList();
        }
    });

    UIEventBind(null, that, "club_rule_forbid_user", function(rtn) {
        if (that.data && rtn.clubId != that.clubId) {
            cc.log("warning:服务刷新亲友圈房间, clubId有误！！ rtn.clubId=" + rtn.clubId + " this.clubId=" + that.clubId);
            return;
        }
        if (that.data) {
            for(var key in rtn){
                if(key.indexOf("rule") == 0){
                    that.data[key] = rtn[key].indexOf(MjClient.data.pinfo.uid) < 0 ? 0 : 1;
                }
            }
            that.refreshDeskList();
        }
    });

    // 刷新当前亲友圈信息
    UIEventBind(null, that, "club_refresh_info", function(rtn) {
        that.refreshClubListPlayerCount(rtn);
        if (that.data && rtn.clubId != that.clubId) {
            cc.log("warning:服务刷新亲友圈信息, clubId有误！！ rtn.clubId=" + rtn.clubId + " this.clubId=" + that.clubId);
            return;
        }
        if (that.data) {
            that.ruleIndex = FriendCard_Common.getClubRulesSelect(that.clubId)[0];
            that.data.info = rtn;
            // that.data.info.notice = "请遵守法律法规，健康游戏，禁止赌博！";
            that.data.info.notice = unescape(that.data.info.notice);//20201023--公告文字显示

            MjClient.friendCard_replay = rtn.againGame;
            FriendCard_Common.doDaYangAction(that)
            FriendCard_Common.reSetCurSelectRule();
            that.refreshInfo();
            that.initBottom();
            that.refreshDeskList();
            if (that.syncClubList())
                that.refreshClubList();
            if (FriendCard_Common.getSkinType() != 1 && FriendCard_Common.getSkinType() != 0 && that.setMainBG){
                that.setMainBG();
            }
        }
    });

    // 更新当前亲友圈信息
    UIEventBind(null, that, "club_update_info", function(rtn) {
        that.refreshClubListPlayerCount();
        if (that.data && rtn.clubId != that.clubId) {
            cc.log("warning:服务更新亲友圈信息, clubId有误！！ rtn.clubId=" + rtn.clubId + " this.clubId=" + that.clubId);
            return;
        }
        if (that.data) {
            for (var k in rtn.data) {
                that.data.info[k] = rtn.data[k];
            }
            that.refreshPeopleCount();
        }
    });

    // 联盟 刷新当前亲友圈信息
    UIEventBind(null, that, "league_refresh_info", function(rtn) {
        rtn.clubId = rtn.leagueId;
        that.refreshClubListPlayerCount(rtn);
        if (that.data && rtn.clubId != that.clubId) {
            cc.log("warning:服务刷新亲友圈信息, clubId有误！！ rtn.clubId=" + rtn.clubId + " this.clubId=" + that.clubId);
            return;
        }
        if (that.data) {
            rtn.rankOpenType = rtn.clubRankOpenType[that.data.subClubId+""]
            that.ruleIndex = FriendCard_Common.getClubRulesSelect(that.clubId)[0];
            that.data.info = rtn;
            // that.data.info.notice = "请遵守法律法规，健康游戏，禁止赌博！";
            that.data.info.notice = unescape(that.data.info.notice);

            FriendCard_Common.doDaYangAction(that)
            FriendCard_Common.reSetCurSelectRule();
            that.refreshInfo();
            that.initBottom();
            that.refreshDeskList();
            if (FriendCard_Common.getSkinType() != 1 && FriendCard_Common.getSkinType() != 0 && that.setMainBG){
                that.setMainBG();
            }
        }
    });

    // 联盟 更新亲友圈信息
    UIEventBind(null, that, "league_update_info", function(rtn) {
        rtn.clubId = rtn.leagueId;
        that.refreshClubListPlayerCount(rtn);
        if (that.data && rtn.clubId != that.clubId) {
            cc.log("warning:服务更新亲友圈信息, clubId有误！！ rtn.clubId=" + rtn.clubId + " this.clubId=" + that.clubId);
            return;
        }
        if (that.data) {
            for (var k in rtn.data) {
                that.data.info[k] = rtn.data[k];
            }
            that.refreshPeopleCount();
        }
    });

    // 联盟 比赛信息推送,解决进入亲友圈接口没有返回比赛信息的bug
    UIEventBind(null, that, "league_match_user", function(rtn) {
        rtn.clubId = rtn.leagueId;
        if (that.data && rtn.clubId != that.clubId) {
            cc.log("warning:league_match_user, clubId有误！！ rtn.clubId=" + rtn.clubId + " this.clubId=" + that.clubId);
            return;
        }
        that._matchData = rtn.matchUser;
        if(that.data && that.data.info){
            that.data.info.matchConf = rtn.matchConf
        }
        that.refreshInfo();
    });

    // 被踢出亲友圈或亲友圈被解散（服务器推送)
    UIEventBind(null, that, "club_remove_player", function(rtn) {
        that.requestLeaveClub(false);
    });

    // 联盟 被踢出亲友圈或亲友圈被解散（服务器推送)
    UIEventBind(null, that, "league_remove_player", function(rtn) {
        that.requestLeaveClub(false);
    });

    // 申请列表有变动
    UIEventBind(null, that, "club_player_apply", function(rtn) {
        if(!that.data || !that.data.info){
            return;
        }
        if (MjClient.clubPlayerApplyList.indexOf(that.clubId) != -1){
            FriendCard_Common.reSetCurSelectRule();
        }
        that.refreshInfo();
    });

    // 联盟 申请列表有变动
    UIEventBind(null, that, "league_player_apply", function(rtn) {
        if(!that.data || !that.data.info){
            return;
        }
        if (MjClient.clubPlayerApplyList.indexOf(that.clubId) != -1){
            FriendCard_Common.reSetCurSelectRule();
        }
        that.refreshInfo();
    });

    // 审核列表有变动
    UIEventBind(null, that, "cancel_club_player_apply", function(rtn) {
        if(!that.data || !that.data.info){
            return;
        }
        FriendCard_Common.reSetCurSelectRule();
        that.refreshInfo();
    });

    // 自己新创建了亲友圈
    UIEventBind(null, that, "friendCard_clubListUpdate", function(rtn) {
        that.requestClubList(rtn.clubId);
    });

    // 自己申请恳请出亲友圈
    UIEventBind(null, that, "clubExit", function(clubId) {
        // if (that.data.info.clubId == clubId) {
        //  that.removeFromParent(true);
        // }
        that.removeClub(clubId);
    });

    // 亲友圈列表有更新
    UIEventBind(null, that, "club_refresh_list", function(eD) {
        if(eD && eD.leagueId){
            that.requestClubList(eD.leagueId);
        }else{
            that.requestClubList();
        }
    });

    // 联盟 亲友圈列表有更新
    UIEventBind(null, that, "league_refresh_list", function() {
        that.requestClubList();
    });

    // 更新体力值
    UIEventBind(null, that, "club_update_user_mp", function(eD) {
        if (eD.clubId == that.data.info.clubId && that.data) {
            that.data.mp = eD.mp;
            if (that.mpNode)
                that.mpNode.refreshMp();
        }
    });

    UIEventBind(null, that, "league_update_user_mp", function(eD) {
        if (eD.leagueId == that.data.info.clubId && that.data) {
            that.data.mp = eD.mp;
            if (that.mpNode)
                that.mpNode.refreshMp();
        }
    });

    UIEventBind(null, that, "redpoint_member_button", function(eD) {
        if (eD.leagueId == that.data.info.clubId || eD.clubId == that.data.info.clubId) {
            that.data.redpointMemberButton = 1;
            postEvent("update_member_record")
        }
    });

    UIEventBind(null, that, "update_member_record", function(eD) {
        that.updateMemberRedPoint();
    });

    UIEventBind(null, that, "club_join_match", function(d) {

    });

    UIEventBind(null, that, "club_quit_match", function(eD) {
    });

    UIEventBind(null, that, "club_audit_match", function(d) {
        that.refreshClubMatch(d)

    });

    UIEventBind(null, that, "league_audit_match", function(d) {
        that.refreshClubMatch(d)

    });

    UIEventBind(null, that, "redpoint_match_button", function(eD) {
        if (eD.leagueId == that.data.info.clubId || eD.clubId == that.data.info.clubId) {
            postEvent("update_match_check", eD)
        }
    });

    UIEventBind(null, that, "update_match_check", function(eD) {
        that.data.redpointMatchButton = eD.isShow;
        that.updateMatchRedPoint();
    });

    UIEventBind(null, that, "league_match_aduit", function(d) {
        if(that.data.info.leagueId == d.leagueId){
            that.data.matchQuotaAudit = d.matchQuotaAudit;
        }

    });

    UIEventBind(null, that, "club_match_aduit", function(d) {
        if(that.data.info.clubId == d.clubId){
            that.data.matchQuotaAudit = d.matchQuotaAudit;
        }

    });

    UIEventBind(null, that, "match_overdue_notice", function(d) {
        var msg = unescape(d.name) + "比赛于"+ d.date + "日到期，比赛进入决赛轮。";

        //跑马灯内容
        if (!MjClient.FriendCard_main_ui.matchNotice) {
            MjClient.FriendCard_main_ui.matchNotice = {};
            MjClient.FriendCard_main_ui.matchNotice.msgs = [];
            MjClient.FriendCard_main_ui.matchNotice.playIdx = 0;
        }
        MjClient.FriendCard_main_ui.matchNotice.msgs.push(msg);


        //联盟的盟主、亲友圈的会长第一次收到弹窗提示
        if (FriendCard_Common.isLeader() && !d.wasSend) {
            var param = {};
            param.title = "决赛通知";
            if (FriendCard_Common.getSkinType() == 1){
                param.title ="决   赛   通   知";
            }
            param.content = msg+"\n";
            param.bHideBtnCancel = true;
            param.yesCallback = function(){
                if (checkBox.isSelected()) {
                    var api = FriendCard_Common.isLMClub() ? "leagueMatchCloseOverdueNotice" : "clubMatchCloseOverdueNotice";
                    var sendInfo = {
                        matchId: d.id,
                    }
                    if(FriendCard_Common.isLMClub()){
                        sendInfo.leagueId = that.clubId;
                    }else{
                        sendInfo.clubId = that.clubId;
                    }
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler."+api, sendInfo,
                        function(rtn) {
                            MjClient.unblock();
                            if (rtn.code != 0)
                                FriendCard_Common.serverFailToast(rtn);
                        });
                    }
            }
            var confirmBox = new Friendcard_Match_confirmBox(param);
            MjClient.FriendCard_main_ui.addChild(confirmBox);

            //增加【今日不再提示】按钮
            var back = confirmBox.uiNode.getChildByName("back");
            var checkBox = new ccui.CheckBox("friendCards/common/btn_chebox_fang.png", "friendCards/common/img_gou.png");
            var btn_confirm = back.getChildByName("btn_confirm");
            checkBox.y = btn_confirm.y + btn_confirm.height/2 + checkBox.height/2 + 3;
            if (FriendCard_Common.getSkinType() == 4) {
                checkBox.y += 30;
            }
            back.addChild(checkBox);
            var text = new ccui.Text();
            text.setFontName("fonts/lanting.ttf");
            text.setString("今日不再提示");
            text.setAnchorPoint(cc.p(0, 0.5));
            text.setTextColor(cc.color("#000000"));
            text.setFontSize(24);
            text.y = checkBox.y;
            if (FriendCard_Common.getSkinType() == 4) {
                text.y -= 8;
            }
            checkBox.x = btn_confirm.x - checkBox.width/2 -text.width/2;
            text.x = checkBox.x + checkBox.width/2 + 5;
            back.addChild(text);
       }

    });

    UIEventBind(null, that, "league_transfer_creator_match", function(d) {
        if(that.data.info.leagueId == d.leagueId) {
            MjClient.showMsg(d.message);
        }
    });



    UIEventBind(null, that, "club_fangkaju_hongbao_draw", function(d) {
        if(that.data.info.clubId == d.clubId){
            if(!that.redPackageAwardToastList){
                that.redPackageAwardToastList = [];
            }
            if(d.level > 0 && d.level <= 10){
                that.redPackageAwardToastList.unshift(d);
            }else{
                that.redPackageAwardToastList.push(d);
            }
        }
    });

    UIEventBind(null, that, "league_fangkaju_hongbao_draw", function(d) {
        if(that.data.info.leagueId == d.leagueId){
            if(!that.redPackageAwardToastList){
                that.redPackageAwardToastList = [];
            }
            if(d.level > 0 && d.level <= 10){
                that.redPackageAwardToastList.unshift(d);
            }else{
                that.redPackageAwardToastList.push(d);
            }
        }

    });

}

FriendCard_Common.requestUpdateClub = function(that, msg) {
    if (that.data.info.clubId <= 9999) {
        FriendCard_Common.requestUpdateClub_LM(that, msg);
        return;
    }
    var that = that;
    msg.clubId = that.data.info.clubId
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.clubUpdate", msg,
        function(rtn) {
            MjClient.unblock();
            if (rtn.code != 0)
                FriendCard_Common.serverFailToast(rtn);
        });
}

FriendCard_Common.requestUpdateClub_LM = function(that, msg) {
    var that = that;
    msg.leagueId = that.data.info.clubId
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.leagueUpdate", msg,
        function(rtn) {
            MjClient.unblock();
            if (rtn.code != 0)
                FriendCard_Common.serverFailToast(rtn);
        });
}

FriendCard_Common.requestClubList = function(that, clubId) {
    var that = that;

    clubId = clubId || that.clubId;
    if (!clubId || clubId == -1){
        clubId = util.localStorageEncrypt.getNumberItem(FriendCard_Common.LocalKey.lastIntoClub, 0);
        if(MjClient._canNotBackToHallClubIds &&
            MjClient._canNotBackToHallClubIds.indexOf(clubId) > -1){
            var index = MjClient._canNotBackToHallClubIds.indexOf(clubId);
            clubId = MjClient._backToHallToLMClubIds[index];

        }
    }
    if(MjClient._canNotBackToHallClubIds){
        var index = MjClient._backToHallToLMClubIds.indexOf(clubId);
        if(index > -1){
            MjClient._canNotBackToHallClubIds.splice(index,1);
            MjClient._backToHallToLMClubIds.splice(index,1);
        }

    }
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.clubList", {
            clubId: clubId
        },
        function(rtn) {
            MjClient.unblock();
            if (!cc.sys.isObjectValid(that))
                return;

            if (rtn.code != 0) {
                FriendCard_Common.serverFailToast(rtn);
                return;
            }
            that.clubList = rtn.data.list;
            that.leagueList = rtn.data.leagueList;
            if(!that.leagueList){
                that.leagueList = [];
            }
            if(that.leagueList){
                for (var i = 0; i < that.leagueList.length; i++) {
                    that.leagueList[i].clubId = that.leagueList[i].leagueId
                }
            }
            that.clubList = FriendCard_Common.clubListSort(that.clubList,that.leagueList)
            if (rtn.data.lastEnter) {
                if(!rtn.data.lastEnter.info.clubId){
                    rtn.data.lastEnter.info.clubId = rtn.data.lastEnter.info.leagueId;
                    rtn.data.lastEnter.info.rankOpenType = rtn.data.lastEnter.info.clubRankOpenType[rtn.data.lastEnter.subClubId+""]
                }
                // rtn.data.lastEnter.info.notice = "请遵守法律法规，健康游戏，禁止赌博！";
                rtn.data.lastEnter.info.notice = unescape(rtn.data.lastEnter.info.notice);
                that.enterClubRet(rtn.data.lastEnter);

            } else {
                that.refreshClubList();
            }
            if(rtn.data.notifyData){
                if(rtn.data.notifyData.leagueAvatar)
                    MjClient.FriendCard_main_ui.addChild(new Friendcard_tipSetRatioDialog(rtn.data.notifyData));
                else{
                    var data = rtn.data.notifyData;
                    var title = data.leagueTitle ? "你的联盟：" + unescape(data.leagueTitle) : "你的俱乐部：" + unescape(data.clubTitle);
                    var _id = data.leagueId ? data.leagueId : data.clubId;
                    MjClient.showMsg(title + "(" + _id + ")" + "\n参赛名额被修改，请您对下级重新授权参赛名额！",
                        function () {
                        },
                        function () { });
                }
            }
        }
    );
}

/*
    亲友圈主界面：进入俱乐部
*/
FriendCard_Common.requestEnterClub = function(that, clubId) {
    if (clubId <= 9999) {
        FriendCard_Common.requestEnterClub_LM(that, clubId)
        return;
    }

    var that = that;
    var sendInfo = {
        clubId: clubId ? clubId : that.clubId
    }
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.clubEnter", sendInfo, function(rtn) {
        MjClient.unblock();

        if (!cc.sys.isObjectValid(that)) {
            cc.log(" ======= pkplayer.handler.clubEnter error node is remove");
            return;
        }

        if (rtn.code == 0 && rtn.data) {
            // rtn.data.info.notice = "请遵守法律法规，健康游戏，禁止赌博！";
            rtn.data.info.notice = unescape(rtn.data.info.notice);
            that.enterClubRet(rtn.data);
        } else {
            FriendCard_Common.serverFailToast(rtn);
        }
    });
}

/*
    联盟 - 亲友圈主界面：进入俱乐部
*/
FriendCard_Common.requestEnterClub_LM = function(that, clubId) {
    var that = that;
    var sendInfo = {
        leagueId: clubId ? clubId : that.clubId
    }
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.leagueEnter", sendInfo, function(rtn) {
        MjClient.unblock();

        if (!cc.sys.isObjectValid(that)) {
            cc.log(" ======= pkplayer.handler.leagueEnter error node is remove");
            return;
        }

        if (rtn.code == 0 && rtn.data) {
            if(rtn.data.info.leagueId){
                rtn.data.info.clubId = rtn.data.info.leagueId;
                rtn.data.info.rankOpenType = rtn.data.info.clubRankOpenType[rtn.data.subClubId+""]
            }
            // rtn.data.info.notice = "请遵守法律法规，健康游戏，禁止赌博！";
            rtn.data.info.notice = unescape(rtn.data.info.notice);
            that.enterClubRet(rtn.data);

            if(that._openTongjiAfterEnterData &&　that._openTongjiAfterEnterData.leagueId == rtn.data.info.clubId){
                var openPage = that._openTongjiAfterEnterData.targetRoleId == 2 ? "btn_groupTJ" : "btn_chairmanTJ";
                that.addChild(new FriendCard_LM_tongji(that.data,openPage));
                that._openTongjiAfterEnterData = null;
            }
        } else {
            FriendCard_Common.serverFailToast(rtn);
        }
    });
}

/*
    亲友圈主界面：获得房间信息
*/
FriendCard_Common.requestRoomInfo = function(that, room) {
    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Zhujiemian_Chakanfangjianxinxi", {
        uid: SelfUid()
    });
    var that = that;
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.roomInfo", {
        roomNum: room.roomNum
    }, function(rtn) {
        MjClient.unblock();

        if (!cc.sys.isObjectValid(that)) {
            return;
        }

        if (rtn.code == 0 && rtn.data) {
            rtn.data.info.clubId = rtn.data.info.leagueId ? rtn.data.info.leagueId : rtn.data.info.clubId;
            MjClient.FriendCard_main_ui.addChild(new Friendcard_roomInfoDialog(rtn.data, room));
        } else {
            FriendCard_Common.serverFailToast(rtn);
        }
    });
}

/*
    亲友圈主界面：底部button排序
*/
FriendCard_Common.bottomBtnSort = function(that, arr) {
    var posIndex = 0;
    var dx = 0;
    var preVisibleName = null;
    var preVisibleBtn = null;
    for (var i = 0; i < arr.length; i++) {
        if (that[arr[i]] && that[arr[i]].visible) {
            that[arr[i]].setPosition(that.bottomBtnsPos[posIndex]);
            that[arr[i]].x = that.bottomBtnsPos[posIndex].x + dx;
            if (FriendCard_Common.getSkinType() == 3) {
                if (arr[i] == "_btn_personal_shop" && preVisibleName == "_btn_webZhanji") {
                    that[arr[i]].x = preVisibleBtn.x + 10 + preVisibleBtn.width/2 + that[arr[i]].width/2;
                    dx += that[arr[i]].x -that.bottomBtnsPos[posIndex].x;
                }
            }
            preVisibleName = arr[i];
            preVisibleBtn = that[arr[i]];
            posIndex++;
        }
    }
}

/*
    亲友圈主界面：初始化底部按钮 只适用于新版皮肤
*/
FriendCard_Common.initBottom = function(allBtns,par) {
    var that = MjClient.FriendCard_main_ui;
    var _btnList = par ? par : that._image_bottom.getChildByName("btnList");
    var skinType = FriendCard_Common.getSkinType()
    var btnAddLight = function(btn) {
        if (skinType != 3) return;
        if (btn.getChildByName("light")) return;

        var light = new cc.Sprite("friendCards/main/btn_xuanzhong.png");
        light.setPosition(btn.getContentSize().width / 2, btn.getContentSize().height / 2);
        light.setName("light")
        btn.addChild(light, -1);
    }
    var btnDelLight = function(btn) {
        if (skinType != 3) return;

        if (btn.getChildByName("light")) {
            btn.getChildByName("light").removeFromParent(true);
        }
    }

    // 邀请加入按钮
    if (allBtns.indexOf("_btn_yaoqing") >= 0) {
        that._btn_yaoqing = _btnList.getChildByName("btn_yaoqing");
        that._btn_yaoqing.addTouchEventListener(function(sender, type) {
            if (type == 0) {
                btnAddLight(sender);
            } else if (type == 3) {
                btnDelLight(sender);
            } else if (type == 2) {
                that.closeClubList();

                that.addChild(new FriendCard_yaoqing(that.data, that.ruleIndex));
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Yaoqing", {
                    uid: SelfUid()
                });
            }
        }, that);
    }

    //商城授权
    if (allBtns.indexOf("_btn_shangChengShouQuan") >= 0) {
        that._btn_shangChengShouQuan = _btnList.getChildByName("btn_shangChengShouQuan");
        that._btn_shangChengShouQuan.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.Scene.addChild(new authorizationStoreLayer())
            }
        }, that);
    }

     // 战绩网页
    if (allBtns.indexOf("_btn_webZhanji") >= 0) {
        that._btn_webZhanji = _btnList.getChildByName("btn_webZhanji");
        that._btn_webZhanji.addTouchEventListener(function(sender, type) {
            if (type == 2) {

                var func = function() {
                    var sendInfo = {
                        type: 13,
                    }
                    var infoData = FriendCard_Common.getClubInfo();
                    if(FriendCard_Common.isLMClub()){
                        sendInfo.leagueId = infoData.clubId;
                    }else{
                        sendInfo.clubId = infoData.clubId;
                    }
                    MjClient.block();

                    MjClient.gamenet.request("pkplayer.handler.openBrowser", sendInfo, function (rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            //MjClient.Scene.addChild(new NormalWebviewLayer(rtn.data));
                            MjClient.native.wxShareUrl(rtn.data, unescape(MjClient.data.pinfo.nickname) + "的战绩", "个人记录请勿对外分享\n绿色健康游戏，享受美好生活");
                        }
                        else {
                            if (rtn.message) {
                                MjClient.showToast(rtn.message);
                            }
                            else {
                                MjClient.showToast("获取数据失败，请重试");
                            }
                        }
                    });
                }

                if (util.localStorageEncrypt.getBoolItem("btn_webZhanji_first", true)) {
                    util.localStorageEncrypt.setBoolItem("btn_webZhanji_first", false);
                    MjClient.showMsg("这是你的专属战绩链接，请不要分享给其他人", function() {
                        func();
                    }, function() {});
                }
                else {
                    func();
                }
            }
        }, that);
    }



    // 房间记录按钮
    if (allBtns.indexOf("_btn_record") >= 0) {
        that._btn_record = _btnList.getChildByName("btn_record");
        that._btn_record.addTouchEventListener(function(sender, type) {
            if (type == 0) {
                btnAddLight(sender);
            } else if (type == 3) {
                btnDelLight(sender);
            } else if (type == 2) {
                // 俱乐部返回大厅功能：by_jcw
                // 查看房间记录前先离开未离开的房间
                FriendCard_Common.leaveGame();
                that.closeClubList();

                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Jilu", {
                    uid: SelfUid()
                });
                if (MjClient.APP_TYPE.QXSYDTZ && MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                    MjClient.APP_TYPE.HUNANWANGWANG && MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) {
                    that.addChild(new FriendCard_roomRecord_daTongZi(that.data));
                } else {
                    that.addChild(new FriendCard_roomRecord(that.data));
                }
            }
        }, that);
    }

    // 查看战绩按钮
    if (allBtns.indexOf("_btn_record2") >= 0) {
        that._btn_record2 = _btnList.getChildByName("btn_record2");
        that._btn_record2.addTouchEventListener(function(sender, type) {
            if (type == 0) {
                btnAddLight(sender);
            } else if (type == 3) {
                btnDelLight(sender);
            } else if (type == 2) {
                // 俱乐部返回大厅功能：by_jcw
                // 查看战绩前先离开未离开的房间
                FriendCard_Common.leaveGame();
                that.closeClubList();

                if (MjClient.APP_TYPE.QXSYDTZ && MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                    MjClient.APP_TYPE.HUNANWANGWANG && MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) {
                    that.addChild(new FriendCard_roomRecord_daTongZi(that.data));
                } else {
                    that.addChild(new FriendCard_roomRecord(that.data));
                }
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Zhanji", {
                    uid: SelfUid()
                });
            }
        }, that);
    }

    // 成员列表
    if (allBtns.indexOf("_btn_member") >= 0) {
        that._btn_member = _btnList.getChildByName("btn_member");
        that._btn_member.addTouchEventListener(function(sender, type) {
            if (type == 0) {
                btnAddLight(sender);
            } else if (type == 3) {
                btnDelLight(sender);
            } else if (type == 2) {
                that.closeClubList();
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan", {
                    uid: SelfUid()
                });
                if(FriendCard_Common.isLMClub(that.data.info)){
                    that.addChild(new FriendCard_LM_member(that.data.info));
                }else{
                    that.addChild(new FriendCard_member(that.data.info));
                }
            }
        }, that);
    }

    // 亲友圈设置
    if (allBtns.indexOf("_btn_setting") >= 0) {
        that._btn_setting = _btnList.getChildByName("btn_setting");
        that._btn_setting.addTouchEventListener(function(sender, type) {
            if (type == 0) {
                btnAddLight(sender);
            } else if (type == 3) {
                btnDelLight(sender);
            } else if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Shezhi", {
                    uid: SelfUid()
                });
                that.closeClubList();
                if(FriendCard_Common.isLMClub()){
                    that.addChild(new FriendCard_LM_info(that.data, MjClient.FriendCard_main_ui));
                }else{
                    that.addChild(new FriendCard_info(that.data, MjClient.FriendCard_main_ui));
                }
            }
        }, that);
    }

    // 亲友圈统计
    if (allBtns.indexOf("_btn_tongji") >= 0) {
        that._btn_tongji = _btnList.getChildByName("btn_tongji");
        that._btn_tongji.addTouchEventListener(function(sender, type) {
            if (type == 0) {
                btnAddLight(sender);
            } else if (type == 3) {
                btnDelLight(sender);
            } else if (type == 2) {
                that.closeClubList();

                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji", {
                    uid: SelfUid()
                });
                var groupLeader = FriendCard_Common.isGroupLeader(that.data.info)
                that.data.groupLeader = groupLeader;
                if(FriendCard_Common.isLMClub()){
                    that.addChild(new FriendCard_LM_tongji(that.data));
                }else{
                    that.addChild(new FriendCard_tongji(that.data));
                }
            }
        }, that);
    }

    // 主界面规则
    if (allBtns.indexOf("_btn_rule") >= 0) {
        that._btn_rule = _btnList.getChildByName("btn_rule");
        that._btn_rule.addTouchEventListener(function(sender, type) {
            if (type == 0) {
                btnAddLight(sender);
            } else if (type == 3) {
                btnDelLight(sender);
            } else if (type == 2) {
                that.closeClubList();

                if(that.data.info.matchIsOpen & 2){
                    that.addChild(new FriendCard_Match_ruleLayer(that.data.info, that.clubId));
                }else{
                    that.addChild(new FriendCard_ruleLayer(that.data.info));
                }

            }
        }, that);
    }

    // 亲友圈公告
    if (allBtns.indexOf("btn_gonggao") >= 0) {
        that.btn_gonggao = _btnList.getChildByName("btn_gonggao");
        that.gonggao_image_point = that.btn_gonggao.getChildByName("Image_point");
        that.btn_gonggao.addTouchEventListener(function(sender, type) {
            if (type == 0) {
                btnAddLight(sender);
            } else if (type == 3) {
                btnDelLight(sender);
            }
            if (type == 2) {
                that.closeClubList();

                that.gonggao_image_point.visible = false;
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Gonggao", {
                    uid: SelfUid()
                });
                var data = {
                    event: "friendCard_main_gonggao",
                    isManager: that.isManager(),
                    gonggao: that.data.info.notice,
                    isCreator : that.isCreator()
                };
                MjClient.FriendCard_main_ui.addChild(new friendcard_gonggao(data));
            }
        }, that);
    }

    // 绑定
    if (allBtns.indexOf("_agentBtn") >= 0) {
        that._agentBtn = _btnList.getChildByName("btn_daili");
        that._agentBtn.addTouchEventListener(function(sender, type) {
            if (type == 0) {
                btnAddLight(sender);
            } else if (type == 3) {
                btnDelLight(sender);
            }

            if (type != 2)
                return;
            that.closeClubList();
            that.bindingAgent();
            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Bangding", {
                uid: SelfUid()
            });

        }, that);
    }

    // 亲友圈换皮
    if (allBtns.indexOf("_btn_setSkin") >= 0) {
        that._btn_setSkin = _btnList.getChildByName("btn_setSkin");
        that._btn_setSkin.addTouchEventListener(function(sender, type) {
            if (type == 0) {
                btnAddLight(sender);
            } else if (type == 3) {
                btnDelLight(sender);
            } else if (type == 2) {
                that.closeClubList();

                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_setSkin", {
                    uid: SelfUid()
                });
                if (FriendCard_Common.getClubisLM()) {
                    that.addChild(new Friendcard_LM_setMainSkin(that.data, that.clubId));
                } else {
                    that.addChild(new Friendcard_setMainSkin(that.data, that.clubId));
                }
            }
        }, that);
    }

    if (allBtns.indexOf("_btn_FCM") >= 0) {
        that._btn_FCM = _btnList.getChildByName("btn_FCM");
        if (that._btn_FCM) {
            that._btn_FCM.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    that.addChild(new FriendCard_FCM_tongji(that.data));
                }
            });
        }
    }



    if (allBtns.indexOf("_btn_match") >= 0) {
        that._btn_match = _btnList.getChildByName("btn_match");
        if (that._btn_match) {
            that._btn_match.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    that.addChild(new Friendcard_Match_Main(that.data));
                }
            });
        }
    }

    if (allBtns.indexOf("_btn_rankList") >= 0) {
        that._btn_rankList = _btnList.getChildByName("btn_rankList");
        if (that._btn_rankList) {
            that._btn_rankList.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    that.addChild(new FriendCard_Match_rankLayer(that.data.info, that.clubId, that._matchData.matchId, that.data.subClubId));
                }
            });
        }
    }

    if (allBtns.indexOf("_btn_personal_shop") >= 0) {
        //个人商城点击
        that._btn_personal_shop = _btnList.getChildByName("btn_personal_shop");
        if (that._btn_personal_shop) {
            that._btn_personal_shop.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    that.addChild(new authorizationStoreTipLayer());
                }
            });
        }
    }

    // if (allBtns.indexOf("_btn_safebox") >= 0) {
    //     //保险箱点击
    //     that._btn_safebox = _btnList.getChildByName("btn_safebox");
    //     if (that._btn_safebox) {
    //         that._btn_safebox.addTouchEventListener(function(sender, type) {
    //             if (type == 2) {
    //                 that.addChild(new FriendCard_SXF_safeBox(that.clubId));
    //             }
    //         });
    //     }
    // }

    if (allBtns.indexOf("_btn_ledou") >= 0) {
        //乐豆点击
        that._btn_ledou = _btnList.getChildByName("btn_ledou");
        if (that._btn_ledou) {
            that._btn_ledou.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    that.addChild(new FriendCard_SXF_ledou(that.data,that.data.roleId));
                }
            });
        }
    }

    //按钮位置
    if (!that.bottomBtnsPos) {
        that.bottomBtnsPos = [];
        for (var i = 0; i < allBtns.length; i++) {
            if(!that[allBtns[i]]) continue;
            if (allBtns[i] != "_btn_record2" && allBtns[i] != "_btn_FCM") {
                that.bottomBtnsPos.push(that[allBtns[i]].getPosition());
            }
        }
    }

}
/*
    亲友圈主界面：离开亲友圈
*/
FriendCard_Common.requestLeaveClub = function(that, isClose) {
    if (that.clubId <= 9999) {
        FriendCard_Common.requestLeaveClub_LM(that, isClose);
        return;
    }

    if (that.clubId <= 0) {
        if (isClose)
            that.removeFromParent(true);
        return;
    }

    var that = that;
    if (isClose) {
        that.removeFromParent(true);
    } else {
        MjClient.block();
    }

    var sendInfo = {
        clubId: that.clubId
    }
    MjClient.gamenet.request("pkplayer.handler.clubLeave", sendInfo, function(rtn) {
        if (!isClose)
            MjClient.unblock();
        if (rtn.code != 0)
            FriendCard_Common.serverFailToast(rtn);

        if (isClose || !cc.sys.isObjectValid(that))
            return;

        that.removeClub(that.clubId);
    });
}

/*
    联盟 - 亲友圈主界面：离开亲友圈
*/
FriendCard_Common.requestLeaveClub_LM = function(that, isClose) {
    if (that.clubId <= 0) {
        if (isClose)
            that.removeFromParent(true);
        return;
    }

    var that = that;
    if (isClose) {
        that.removeFromParent(true);
    } else {
        MjClient.block();
    }

    var sendInfo = {
        leagueId: that.clubId
    }
    MjClient.gamenet.request("pkplayer.handler.leagueLeave", sendInfo, function(rtn) {
        if (!isClose)
            MjClient.unblock();
        if (rtn.code != 0)
            FriendCard_Common.serverFailToast(rtn);

        if (isClose || !cc.sys.isObjectValid(that))
            return;

        that.removeClub(that.clubId);
    });
}

/*
    亲友圈主界面：删除规则
*/
FriendCard_Common.requestDeleteRule = function(that, index) {
    var that = that;
    var msg = {
        clubId: that.data.info.clubId
    };
    msg["rule" + index] = "delete";
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.clubUpdate", msg,
        function(rtn) {
            MjClient.unblock();
            if (rtn.code != 0)
                FriendCard_Common.serverFailToast(rtn);
        });
}

/*
    亲友圈主界面：
*/
FriendCard_Common.syncClubList = function(that) {
    var list = that.clubList;
    var haveChange = false;
    for (var i = 0; i < list.length; i++) {
        if (list[i].clubId != that.data.info.clubId)
            continue;

        if (list[i].playerCount != that.data.info.totalCount) {
            list[i].playerCount = that.data.info.totalCount;
            haveChange = true;
        }

        if (list[i].onlineCount != that.data.info.onlineCount) {
            list[i].onlineCount = that.data.info.onlineCount;
            haveChange = true;
        }

        if (list[i].title != that.data.info.title) {
            list[i].title = that.data.info.title;
            haveChange = true;
        }

        if (list[i].createSwitch != that.data.info.createSwitch) {
            list[i].createSwitch = that.data.info.createSwitch;
            haveChange = true;
        }

        break;
    }

    return haveChange;
}

/*
    亲友圈主界面：快速加入游戏
*/
FriendCard_Common.quicklyJoinGame = function(that, ruleIndex,failTime) {
    if (cc.sys.isObjectValid(MjClient.blockui)) // 规避因多点触屏，MjClient.block()后再次进入到这里 by cyc
        return;
    if(!failTime){
        failTime = 0
    }
    cc.log(" ======== 快速加入游戏 ===============");
    var playerNum = -1;
    var gameType = that.getCurSelGameType(ruleIndex);
    var roomId = 0;
    var maxRoomOutLineCount = 0;
    ruleIndex = ruleIndex || that.ruleIndex;
    var ruleRoom = that.data.room["roomList" + ruleIndex] ? that.data.room["roomList" + ruleIndex] : [];
    for (var key in ruleRoom) {
        var room = ruleRoom[key];
        if (room.players.length >= playerNum && room.players.length < room.maxPlayer && (!room.roundNum || room.roundNum <= 0)) {
            if(room.players.length == playerNum){
                var curOutLineCount = 0
                for(var i = 0; i < room.players.length;i++){
                    if(room.players[i].offline == true){
                        curOutLineCount++;
                    }
                }
                if(curOutLineCount < maxRoomOutLineCount){
                    roomId = room.roomNum;
                    playerNum = room.players.length;
                    maxRoomOutLineCount = curOutLineCount;
                }
            }else{
                roomId = room.roomNum;
                playerNum = room.players.length;
                maxRoomOutLineCount = 0;
                for(var i = 0; i < room.players.length;i++){
                    if(room.players[i].offline == true){
                        maxRoomOutLineCount++;
                    }
                }
            }

        }
    }

    // 俱乐部返回大厅功能：by_jcw
    // 有未离开房间时，先刷新俱乐部显示为未离开房间的俱乐部list，再获得未离开房间ID
    var clubId = null;
    if (MjClient.data.sData && MjClient.data.sData.tData && getClubInfoInTable() && MjClient.data.sData.tData.tableid) {
        roomId = MjClient.data.sData.tData.tableid;
        // 记录之后删除上一次房间信息
        delete MjClient.data.sData;
        delete MjClient.gameType;
        var _btn_join = null;
        if (MjClient.FriendCard_main_ui._image_bottom.getChildByName("btnList2")) {
            _btn_join = MjClient.FriendCard_main_ui._image_bottom.getChildByName("btnList2").getChildByName("btn_join");
        }
        if (!_btn_join && MjClient.FriendCard_main_ui._image_bottom.getChildByName("btnList")) {
            _btn_join = MjClient.FriendCard_main_ui._image_bottom.getChildByName("btnList").getChildByName("btn_join");
        }
        if (_btn_join) {
            if (FriendCard_Common.getSkinType() == 0) {
                _btn_join.loadTextures("friendCards/btn_join_n.png", "friendCards/btn_join_n.png", "");
                _btn_join.textureType = "快速加入";
            }else if (FriendCard_Common.getSkinType() == 4) {
                _btn_join.loadTextureNormal("friendCards/btn_join_n.png");
            } else {
                _btn_join.loadTextureNormal("friendCards/main/btn_join_n.png");
                _btn_join.loadTexturePressed("friendCards/main/btn_join_s.png");
            }
            _btn_join.textureType = "快速加入";

        }
    }

    if (roomId > 0 && failTime < 1) {
        MjClient.joinGame(roomId, function(rtn){
            if(rtn && rtn.code == -1){
                FriendCard_Common.quicklyJoinGame(that, ruleIndex,failTime+1)
            }else{
                FriendCard_Common.serverFailToast(rtn);
            }
        }, false, gameType,false,{notShowErrorMsg:true});
    } else if (that.customInfo) {
        var uiPara = {}
        uiPara.msg = "暂无可加入的房间。";
        MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
    } else {
        MjClient.block();
        var jiekouName, sendInfo;
        if (that.clubId <= 9999) {
            jiekouName = "pkleague.handler.createCommonRoom";
            sendInfo = {
                leagueId: that.clubId,
                ruleId: ruleIndex,
            }
        } else {
            jiekouName = "pkclub.handler.createCommonRoom";
            sendInfo = {
                clubId: that.clubId,
                ruleId: ruleIndex,
            }
        }

        MjClient.gamenet.request(jiekouName, sendInfo , function(rtn) {
            if (rtn.code == 0) {
                MjClient.joinGame(rtn.data, null, false, gameType);
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
            MjClient.unblock();
        });
    }
}

/*
    亲友圈主界面：重开上一局玩法
*/
FriendCard_Common.quicklyJoinGame1 = function(that, ruleIndex,failTime) {
    if (cc.sys.isObjectValid(MjClient.blockui)) // 规避因多点触屏，MjClient.block()后再次进入到这里 by cyc
        return;
    if(!failTime){
        failTime = 0
    }
    //cc.log(" ======== 重开上一局玩法 ===============");
    var playerNum = -1;
    var gameType = that.getCurSelGameType(ruleIndex);
    var roomId = 0;
    var maxRoomOutLineCount = 0;
    ruleIndex = ruleIndex || that.ruleIndex;
    var ruleRoom = that.data.room["roomList" + ruleIndex] ? that.data.room["roomList" + ruleIndex] : [];
    for (var key in ruleRoom) {
        var room = ruleRoom[key];
        if (room.players.length >= playerNum && room.players.length < room.maxPlayer && (!room.roundNum || room.roundNum <= 0)) {
            if(room.players.length == playerNum){
                var curOutLineCount = 0
                for(var i = 0; i < room.players.length;i++){
                    if(room.players[i].offline == true){
                        curOutLineCount++;
                    }
                }
                if(curOutLineCount < maxRoomOutLineCount){
                    roomId = room.roomNum;
                    playerNum = room.players.length;
                    maxRoomOutLineCount = curOutLineCount;
                }
            }else{
                roomId = room.roomNum;
                playerNum = room.players.length;
                maxRoomOutLineCount = 0;
                for(var i = 0; i < room.players.length;i++){
                    if(room.players[i].offline == true){
                        maxRoomOutLineCount++;
                    }
                }
            }

        }
    }

    // 俱乐部返回大厅功能：by_jcw
    // 有未离开房间时，先刷新俱乐部显示为未离开房间的俱乐部list，再获得未离开房间ID
    var clubId = null;
    if (MjClient.data.sData && MjClient.data.sData.tData && getClubInfoInTable() && MjClient.data.sData.tData.tableid) {
        roomId = MjClient.data.sData.tData.tableid;
        // 记录之后删除上一次房间信息
        delete MjClient.data.sData;
        delete MjClient.gameType;
        var _btn_join = null;
        if (MjClient.FriendCard_main_ui._image_bottom.getChildByName("btnList2")) {
            _btn_join = MjClient.FriendCard_main_ui._image_bottom.getChildByName("btnList2").getChildByName("btn_join");
        }
        if (!_btn_join && MjClient.FriendCard_main_ui._image_bottom.getChildByName("btnList")) {
            _btn_join = MjClient.FriendCard_main_ui._image_bottom.getChildByName("btnList").getChildByName("btn_join");
        }
        if (_btn_join) {
            if (FriendCard_Common.getSkinType() == 0) {
                _btn_join.loadTextures("friendCards/btn_join_n.png", "friendCards/btn_join_n.png", "");
                _btn_join.textureType = "快速加入";
            }else if (FriendCard_Common.getSkinType() == 4) {
                _btn_join.loadTextureNormal("friendCards/btn_join_n.png");
            } else {
                _btn_join.loadTextureNormal("friendCards/main/btn_join_n.png");
                _btn_join.loadTexturePressed("friendCards/main/btn_join_s.png");
            }
            _btn_join.textureType = "快速加入";

        }
    }

    if (roomId > 0 && failTime < 1) {
        MjClient.joinGame(roomId, function(rtn){
            if(rtn && rtn.code == -1){
                FriendCard_Common.quicklyJoinGame1(that, ruleIndex,failTime+1)
            }else{
                FriendCard_Common.serverFailToast(rtn);
            }
        }, false, gameType,false,{notShowErrorMsg:true});
    } else if (that.customInfo) {
        var uiPara = {}
        uiPara.msg = "暂无可加入的房间。";
        MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
    } else {
        MjClient.block();
        var jiekouName, sendInfo;
        if (that.clubId <= 9999) {
            jiekouName = "pkleague.handler.createCommonRoom";
            sendInfo = {
                leagueId: that.clubId,
                ruleId: ruleIndex,
            }
        } else {
            jiekouName = "pkclub.handler.createCommonRoom";
            sendInfo = {
                clubId: that.clubId,
                ruleId: ruleIndex,
            }
        }

        FriendCard_Common.saveLastIndex(that.clubId,ruleIndex)

        MjClient.gamenet.request(jiekouName, sendInfo , function(rtn) {
            if (rtn.code == 0) {
                MjClient.joinGame(rtn.data, null, false, gameType);
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
            MjClient.unblock();
        });
    }
}

/*
    亲友圈主界面：修改本地保存的皮肤数据
*/
FriendCard_Common.setNativeSkinCfg = function(that, info) {
    var skinCfg = info.skinCfg
    util.localStorageEncrypt.setNumberItem("Friendcard_SkinCfg_MJBG_" + that.clubId, skinCfg.MJBG);
    util.localStorageEncrypt.setNumberItem("Friendcard_SkinCfg_ZPBG_" + that.clubId, skinCfg.ZPBG);
    util.localStorageEncrypt.setNumberItem("Friendcard_SkinCfg_PKBG_" + that.clubId, skinCfg.PKBG);
    util.localStorageEncrypt.setNumberItem("Friendcard_SkinCfg_DBBG_" + that.clubId, skinCfg.DBBG);
    util.localStorageEncrypt.setNumberItem("Friendcard_SkinCfg_mainBG_" + that.clubId, skinCfg.mainBG);

    for (var i = 1; i <= FriendCard_Common.getRuleNumber(); i++) {
        if (info["rule" + i] && info["rule" + i].tableBoardCfg != null)
            util.localStorageEncrypt.setNumberItem("Friendcard_SkinCfg_rule" + i + "_" + that.clubId, info["rule" + i].tableBoardCfg);
    }

}

/*
    亲友圈主界面：获得本地保存的皮肤数据
*/
FriendCard_Common.getNativeSkinCfg = function(that) {
    var skinCfg = {};
    skinCfg.MJBG = util.localStorageEncrypt.getNumberItem("Friendcard_SkinCfg_MJBG_" + that.clubId, 0);
    skinCfg.ZPBG = util.localStorageEncrypt.getNumberItem("Friendcard_SkinCfg_ZPBG_" + that.clubId, 0);
    skinCfg.PKBG = util.localStorageEncrypt.getNumberItem("Friendcard_SkinCfg_PKBG_" + that.clubId, 0);
    skinCfg.DBBG = util.localStorageEncrypt.getNumberItem("Friendcard_SkinCfg_DBBG_" + that.clubId, 0);
    skinCfg.mainBG = util.localStorageEncrypt.getNumberItem("Friendcard_SkinCfg_mainBG_" + that.clubId, 0);

    for (var i = 1; i <= FriendCard_Common.getRuleNumber(); i++) {
        skinCfg["rule" + i] = util.localStorageEncrypt.getNumberItem("Friendcard_SkinCfg_rule" + i + "_" + that.clubId, -1);
    }

    return skinCfg;
}

/*
亲友圈主界面：是否显示亲友圈桌子
return  false 不显示桌子
return  true 显示桌子
*/
FriendCard_Common.isShowTable = function(that) {
    if ((that.data.info.useClose == 1 && FriendCard_Common.isInDaYangTime()) && that.data.info.isShowTable == 0 && that.data.info.createSwitch != 0 && !that.isManager()) {
        that._img_stop.setVisible(false);
        that.listView_table.removeAllItems();
        var textNode = that._node_desk.getChildByName("text_isShowZhuozi");
        if (textNode) {
            textNode.visible = true;
            textNode.ignoreContentAdaptWithSize(true);
        }
        return false;
    }

    return true;
}

/*
亲友圈主界面：是否展示提示界面
*/
FriendCard_Common.guideLayer = function(that) {
    var guideLayerStr = "_clubFirstInto"
    if (that.isManager())
        guideLayerStr = "_clubFirstInto_IsManager"

    if (util.localStorageEncrypt.getBoolItem(guideLayerStr, true)) {
        util.localStorageEncrypt.setBoolItem(guideLayerStr, false);
        that.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function() {
            that.closeClubList();
        })))
        that.data.btnsPos = [that._btn_member.getPosition(), that._btn_yaoqing.getPosition()]
        that.data.isManager = that.isManager();
        // MjClient.FriendCard_main_ui.addChild(new Friendcard_guideLayer(99, that.data, that.ruleIndex));
    }
}


/*
    亲友圈主界面：删除俱乐部
*/
FriendCard_Common.removeClub = function(that, clubId) {
    that.clubList = [];
    that.clubId = -1;
    that.data = {
        info: {
            title: ""
        },
        room: {}
    };

    that.setNullShow(true);
    that.requestClubList();
}

/*
    亲友圈主界面：箭头图片
*/
FriendCard_Common.tipCheck = function(that) {
    that._imgPoint.visible = false;
    that._imgtext.visible = false;

    if (that.data.info.createSwitch == 0)
        return;
    var that = that;
    var end = false;
    var x = that._imgPoint.x;
    that.unscheduleAllCallbacks();
    that.schedule(function() {
        if (end)
            return;

        var deskList = that.listView_table; //that._node_desk.getChildByName("ListView_table");
        if (!that._deskRoomData || !that._deskRoomData.ruleRoom || that._deskRoomData.ruleRoom.length <= 6) {
            that._imgPoint.stopAllActions();
            that._imgPoint.setVisible(false);
            return;
        }

        if (deskList.getInnerContainerPosition().x < 0) {
            end = true;
            that._imgPoint.stopAllActions();
            that._imgPoint.setVisible(false);
            return;
        }

        if (that._imgPoint.getActionByTag(100))
            return;

        that._imgPoint.visible = true;
        that._imgPoint.x = x;
        that._imgPoint.opacity = 255;
        var action = cc.repeatForever(cc.sequence(
            cc.moveBy(0.5, cc.p(-60, 0)),
            cc.delayTime(0.3),
            cc.fadeOut(0.2),
            cc.delayTime(3),
            cc.moveBy(0.01, cc.p(60, 0)),
            cc.fadeIn(0.1)));
        action.setTag(100);
        that._imgPoint.runAction(action);
    }, 1);
}

/**
 * 直接绑定
 */
FriendCard_Common.bindToAgent = function(that) {
    var that = that;
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.setUserMember", {
            memberId: that.data.info.memberId
        },
        function(rtn) {
            MjClient.unblock();
            cc.log("============pkplayer.handler.setUserMember================");
        }
    );
}


/*
    绑定代理
*/
FriendCard_Common.bindingAgent = function(that) {
    var that = that;
    var binding = function(ID) {
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.setUserMember", {
                memberId: that.data.info.memberId
            },
            function(rtn) {
                MjClient.unblock();
                if (rtn.code == 0 && cc.sys.isObjectValid(that._agentBtn)) {
                    that._agentBtn.visible = false;
                }
                if (rtn.message) {
                    MjClient.showToast(rtn.message);
                }
            }
        );
    }

    MjClient.block();
    MjClient.gamenet.request("pkcon.handler.getMemberInfo", {
        memberId: that.data.info.memberId
    }, function(rtn) {
        MjClient.unblock();
        if (rtn.code == 0) {
            var layer = new Friendcard_bindingCodeLayer(rtn.data, function() {
                binding();
            });
            if (cc.sys.isObjectValid(that))
                that.addChild(layer);
        } else {
            if (!cc.isUndefined(rtn.message)) {
                var uiPara = {}
                uiPara.msg = rtn.message;
                MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
            }
        }
    });
}

/*
    时间转换 将年月日转换成时间戳
*/
FriendCard_Common.transdate = function(year, month, day, hour ,minute) {
    var date = new Date(); //当前时区的时间
    date.setFullYear(year, month, day);
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);
    date.setMilliseconds(0);

    //保证时间戳与显示的日期一致，使用北京时间
    var time = Date.parse(date + ' GMT +0'); //0时区
    time -= 480 * 60 * 1000; //北京时间对应时间戳
    cc.log("transdate %s年-%s月-%s日-%s时北京时间戳 ", year, month, day, hour, time)
    return time;
}

/*
    输入名称操作
*/
FriendCard_Common.strReplace = function(str) {
    //str = str.replace(/\s+/g,"");   //去除所有空格
    str = str.replace(/^\s+|\s+$/g, ""); //去掉左右空格
    str = str.replace(/\n/g, "");
    str = str.replace(/\r/g, "");
    return str;
}

/*
*切割有编号的ruleName
*eg (0511)跑得快
* return [0] 编号 [1] 玩法默认名称
*/
FriendCard_Common.splitClubRuleName = function(str) {
    var result = [];
    if(!str){
        result.push("");
        result.push(str);
        return result;
    }
    var index1 = str.indexOf("(");
    var index2 = str.indexOf(")");
    if(index1 > -1 && index2 > -1 && index1 == 0){
        var no = str.substring(index1+1,index2);
        result.push(str.substring(index1+1,index2));
        result.push(str.substring(index2+1,str.length));
    }else{
        result.push("");
        result.push(str);
    }
    return result;
}


FriendCard_Common.isNumber = function(str) {
    var n = Number(str);
    if (!isNaN(n)){
        return true;
    }
    return false;
}



FriendCard_Common.doDaYangAction = function(that){
    var clubInfo = FriendCard_Common.getClubInfo();
    var actionTag = 20190819;
    that.stopActionByTag(actionTag);
    if(!clubInfo){
        return ;
    }
    if(!clubInfo.useClose){
        return ;
    }
    if(!clubInfo.dailyCloseTime || clubInfo.dailyCloseTime == ""){
        return ;
    }
    var startHour = parseInt(clubInfo.dailyCloseTime.substring(0,2));
    var startMinute = parseInt(clubInfo.dailyCloseTime.substring(3,5));
    var endHour = parseInt(clubInfo.dailyCloseTime.substring(6,8));
    var endMinute = parseInt(clubInfo.dailyCloseTime.substring(9,11));
    var serverDateTime = FriendCard_Common.getServerTime();
    var startDate = new Date(serverDateTime);
    startDate.setHours(startHour);
    startDate.setMinutes(startMinute);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    var endDate = new Date(serverDateTime);
    endDate.setHours(endHour);
    endDate.setMinutes(endMinute);
    endDate.setSeconds(0);
    endDate.setMilliseconds(0);
    var startDateTime = startDate.getTime();
    var endDateTime = endDate.getTime();
    var oneDayTime = 24 * 60 * 60 * 1000;

    var dyTime = 0;
    if(startDateTime > endDateTime){
        if((startDateTime - oneDayTime) <= serverDateTime && serverDateTime < endDateTime){
            dyTime = endDateTime - serverDateTime;
        }
        if(startDateTime <= serverDateTime && serverDateTime < (endDateTime + oneDayTime)){
           dyTime = endDateTime + oneDayTime - serverDateTime;
        }
    }else{
        if(startDateTime <= serverDateTime && serverDateTime < endDateTime){
            dyTime = endDateTime - serverDateTime;
        }
    }
    if(!dyTime){
        if(startDateTime > serverDateTime){
            dyTime = startDateTime - serverDateTime;
        }else{
            dyTime = startDateTime - serverDateTime + oneDayTime;
        }
    }
    var actionTime = dyTime/1000+2;
    cc.log("actionTime",actionTime)
    var action = cc.sequence(cc.delayTime(actionTime),cc.callFunc(function(){
        that.refreshDeskList();
        FriendCard_Common.doDaYangAction(that);
    }))
    action.setTag(actionTag);
    that.runAction(action);
}
FriendCard_Common.isInDaYangTime = function(){
    var clubInfo = FriendCard_Common.getClubInfo();
    if(!clubInfo){
        return false;
    }

    if(!clubInfo.dailyCloseTime || clubInfo.dailyCloseTime == ""){
        return false;
    }
    /*cc.log("isInDaYangTime dailyCloseTime ",clubInfo.dailyCloseTime)*/
    var startHour = parseInt(clubInfo.dailyCloseTime.substring(0,2));
    var startMinute = parseInt(clubInfo.dailyCloseTime.substring(3,5));
    var endHour = parseInt(clubInfo.dailyCloseTime.substring(6,8));
    var endMinute = parseInt(clubInfo.dailyCloseTime.substring(9,11));
    var serverDateTime = FriendCard_Common.getServerTime();
    var startDate = new Date(serverDateTime);
    startDate.setHours(startHour);
    startDate.setMinutes(startMinute);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    var endDate = new Date(serverDateTime);
    endDate.setHours(endHour);
    endDate.setMinutes(endMinute);
    endDate.setSeconds(0);
    endDate.setMilliseconds(0);
    var startDateTime = startDate.getTime();
    var endDateTime = endDate.getTime();
    var oneDayTime = 24 * 60 * 60 * 1000;

    /*cc.log("startDateTime",startDateTime)
    cc.log("endDateTime",endDateTime)
    cc.log("serverDateTime",serverDateTime)*/
    if(startDateTime > endDateTime){
        if((startDateTime - oneDayTime) <= serverDateTime && serverDateTime < endDateTime){
            return true;
        }
        if(startDateTime <= serverDateTime && serverDateTime < (endDateTime + oneDayTime)){
            return true;
        }
    }else{
        if(startDateTime <= serverDateTime && serverDateTime < endDateTime){
            return true;
        }
    }
    /*cc.log("isInDaYangTime false ")*/
    return false;


}
/*
    俱乐部公共方法 EditBox
*/
FriendCard_Common.setEditBoxConfig = function(_parent, _child, str, MaxLength) {
    _child.setFontColor(cc.color(0x77, 0x77, 0x77));
    if (MaxLength)
        _child.setMaxLength(MaxLength);
    _child.setFontSize(20);
    _child.setFontName(MjClient.fzcyfont);
    _child.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
    _child.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
    _child.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
    _child.setPlaceHolder(str);
    _child.setPlaceholderFontSize(20);
    _child.setPosition(_parent.getContentSize().width / 2, _parent.getContentSize().height / 2);
    _parent.addChild(_child);
}

/*
    俱乐部主界面返回大厅功能事件
*/
FriendCard_Common.toTheHallEvent = function(that, _btn_join) {
    // 俱乐部返回大厅功能：by_jcw
    UIEventBind(null, _btn_join, "addPlayer", function(eD) {
        var sData = MjClient.data.sData;
        if (sData && !MjClient.PopUpMsgBackHall) {
            var _playerCount = Object.keys(MjClient.data.sData.players).length;
            var _needCount = MjClient.data.sData.tData.maxPlayer - _playerCount;
            if (_needCount == 0) {
                MjClient.PopUpMsgBackHall = true;
                MjClient.showMsg("你加入的房间已准备就绪，请立即返回房间！",
                    function() {
                        var roomId = MjClient.data.sData && MjClient.data.sData.tData.tableid;
                        if (roomId > 0) {
                            MjClient.joinGame(roomId, null, false, MjClient.gameType);
                        }
                        MjClient.PopUpMsgBackHall = null;
                    });
            }
        }
    });

    // 亲友圈房间解散消息处理：by_jcw
    UIEventBind(null, _btn_join, "endRoom", function(eD) {
        //新老俱乐部图片位置不一样
        if (FriendCard_Common.getSkinType() == 0) {
            _btn_join.loadTextures("friendCards/btn_join_n.png", "friendCards/btn_join_n.png", "");
        }else if (FriendCard_Common.getSkinType() == 4) {
            _btn_join.loadTextureNormal("friendCards/btn_join_n.png");
        } else {
            _btn_join.loadTextureNormal("friendCards/main/btn_join_n.png");
            _btn_join.loadTexturePressed("friendCards/main/btn_join_s.png");
        }
        _btn_join.textureType = "快速加入";
        delete MjClient.data.sData;
    });

    // 俱乐部返回大厅功能：by_jcw
    UIEventBind(null, that, "FreeBegin", function(rtn) {
        var sData = MjClient.data.sData;
        if (sData && !MjClient.PopUpMsgBackHall) {
            MjClient.PopUpMsgBackHall = true;
            MjClient.showMsg("你加入的房间已准备就绪，请立即返回房间！",
                function() {
                    var roomId = MjClient.data.sData && MjClient.data.sData.tData.tableid;
                    if (roomId > 0) {
                        MjClient.joinGame(roomId, null, false, MjClient.gameType);
                    }
                    MjClient.PopUpMsgBackHall = null;
                });
        }
    });
}


FriendCard_Common.saveLastIndex = function(clubId, ruleIndex) {
    // var lastString = util.localStorageEncrypt.getStringItem("LAST_RULE_INDEX" + clubId);
    util.localStorageEncrypt.setStringItem("LAST_RULE_INDEX" + clubId, ruleIndex);
}


/*
    俱乐部主界面加入房间功能
*/
FriendCard_Common.joinGame = function(that, sender) {
    FriendCard_Common.saveLastIndex(that.clubId,sender.room.ruleIndex);
    var join_Game = function() {
        //岳阳 邵阳房间未开始也显示房间信息界面
        var isShowRoomInfo = false;
        sender.room.players = sender.room.players ? sender.room.players : [];
        if (sender.room.players.length >= 1)
            isShowRoomInfo = true;
        //管理员解散房间信息界面
        if (that.isManager() && (sender.room.roundNum || isShowRoomInfo || sender.room.players.length == sender.room.maxPlayer)) {
            that.requestRoomInfo(sender.room);
            return;
        }

        if (sender.room.roomNum) {
            if (sender.room.players && sender.room.players.length == sender.room.maxPlayer) {
                MjClient.showToast("房间已满员");
            } else {
                cc.log("进入游戏:roomNum=" + sender.room.roomNum);
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Zhujiemian_Jiarufangjian", {
                    uid: SelfUid()
                });
                var params = {};
                if(FriendCard_Common.isLMClub()){
                    params.leagueId = that.clubId;
                }else{
                    params.clubId = that.clubId;
                }
                MjClient.joinGame(sender.room.roomNum, null, false, sender.room.gameType,false,params);
            }
        } else {
            MjClient.block();
            var jiekouName, sendInfo;
            if (that.clubId <= 9999) {
                jiekouName = "pkleague.handler.createCommonRoom";
                sendInfo = {
                    leagueId: that.clubId,
                    ruleId: sender.room.ruleIndex || that.ruleIndex,
                }
            } else {
                jiekouName = "pkclub.handler.createCommonRoom";
                sendInfo = {
                    clubId: that.clubId,
                    ruleId: sender.room.ruleIndex || that.ruleIndex,
                }
            }
            MjClient.gamenet.request(jiekouName, sendInfo, function(rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            var params = {};
                            if(FriendCard_Common.isLMClub()){
                                params.leagueId = that.clubId;
                            }else{
                                params.clubId = that.clubId;
                            }
                            MjClient.joinGame(rtn.data, null, false, sender.room.gameType,false,params);
                        } else {
                            FriendCard_Common.serverFailToast(rtn);
                        }
            });
            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chuangjianfangjian", {
                uid: SelfUid()
            });
        }
    }

    // 俱乐部返回大厅功能：by_jcw
    // 加入其他房间前先离开未离开的房间
    var sData = MjClient.data.sData;
    if (sData) {
        if (sender.room.roomNum == sData.tData.tableid) {
            MjClient.joinGame(sData.tData.tableid, null, false, sender.room.gameType);
            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Zhujiemian_Jiarufangjian", {
                uid: SelfUid()
            });
            return;
        }

        FriendCard_Common.leaveGame(join_Game);
        return;
    }
    //上面的join_Game是在回调里面执行,确保离开房间之后再进入房间
    join_Game();
}


/*
    俱乐部主界面离开房间功能
    return true  离开房间
    return false 不在房间内不需离开
*/
FriendCard_Common.leaveGame = function(func) {
    MjClient._lastTableId = "";
    util.localStorageEncrypt.setStringItem("_lastTableId",(MjClient._lastTableId+""));
    // 俱乐部返回大厅功能：by_jcw
    // 加入其他房间前先离开未离开的房间
    var sData = MjClient.data.sData;
    if (sData) {
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.LeaveGame", {}, function(rtn) {
            MjClient.unblock();
            if (rtn.result == 0 || rtn.code == 0) {
                delete MjClient.data.sData;
                delete MjClient.gameType;
            } else if (rtn.message) {
                MjClient.showMsg(rtn.message);
            }

            if (func)
                func();

        });
        MjClient.native.umengEvent4CountWithProperty("LikaifangjianClick", {
            uid: SelfUid(),
            gameType: MjClient.gameType
        });
        return true;
    }
    return false;
}

//统计清除分数
FriendCard_Common.clubStatisClear = function (params,callback) {
    cc.log("clubStatisClear sendInfo",JSON.stringify(params));
    if(params.leagueId){
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.leagueStatisClear", params, function(rtn) {
            MjClient.unblock();
            if (rtn.result == 0 || rtn.code == 0) {
                if (callback)
                    callback(rtn);
            } else if (rtn.message) {
                MjClient.showMsg(rtn.message);
            }
        });
    }else{
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.clubStatisClear", params, function(rtn) {
            MjClient.unblock();
            if (rtn.result == 0 || rtn.code == 0) {
                if (callback)
                    callback(rtn);
            } else if (rtn.message) {
                MjClient.showMsg(rtn.message);
            }

        });
    }
}
FriendCard_Common.getRoomCardFreeConfig = function(callback) {
    if(FriendCard_Common.roomCardFreeConfig){
        callback();
        return;
    }

    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.gameDifenConf", {},function(rtn) {
            MjClient.unblock();
            if (rtn.code == 0) {
                /*//转化成键值对格式
                var roomCardFreeConfig = {};
                for(var i = 0; i < rtn.data.list.length; i++){
                    if(!roomCardFreeConfig[rtn.data.list[i].gameType]){
                        roomCardFreeConfig[rtn.data.list[i].gameType] = {};
                    }
                    roomCardFreeConfig[rtn.data.list[i].gameType][rtn.data.list[i].difen] = rtn.data.list[i].miankouCap
                }*/
                FriendCard_Common.roomCardFreeConfig = rtn.data ? rtn.data.list : [] ;
            }
            callback();
        }
    );
};

//将节点下面的所有子节点 按钮 文本 复选框 都不可点击
FriendCard_Common.setNodeChiTouch = function(node) {
    var childrens = node.getChildren();
    if (childrens) {
        for (var i in childrens) {
            if (childrens[i].getChildren() && childrens[i].getChildren().length > 0) {
                var fenShuNode = this.setNodeChiTouch(childrens[i]);
            } else {
                var type_name = childrens[i].getDescription();
                if (type_name == "Label") {
                    childrens[i].setTextColor(cc.color(127, 127, 127));
                    childrens[i].touchEnabled = false;
                } else if (type_name == "Button") {
                    childrens[i].setEnabled(false);
                } else if (type_name == "CheckBox") {
                    childrens[i].setEnabled(false);
                }
            }
        }
    }
    var type_name = node.getDescription();
    if (type_name == "Label") {
        node.setTextColor(cc.color(127, 127, 127));
        node.touchEnabled = false;
    } else if (type_name == "Button") {
        node.setEnabled(false);
    } else if (type_name == "CheckBox") {
        node.setEnabled(false);
    }
};


FriendCard_Common.getLastDay = function(year,month) {
    var year = Number(year);
    var month = Number(month);
    var new_year = year; //取当前的年份
    var new_month = month++; //取下一个月的第一天，方便计算（最后一天不固定）
    if (month > 12) //如果当前大于12月，则年份转到下一年
    {
        new_month -= 12; //月份减
        new_year++; //年份增
    }
    var new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天
    return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate(); //获取当月最后一天日期
}

FriendCard_Common.setDay = function(year,month,day) {
     /* 获取当前月份 */
    var maxDay = FriendCard_Common.getLastDay(year,month)
    if (maxDay < day)
        return "01"

    if (day <= 0)
        return maxDay

    if (day > maxDay)
        return "01"

    if (day <= 9)
        return "0" + day

    return day
}

//给数组添加字段
FriendCard_Common.runAll = function(arr,key,value){
    if(!arr || typeof(arr) != 'object'){
        return;
    }
    for(var i = 0 ; i < arr.length; i++){
        arr[i][key] = value;
    }
}

FriendCard_Common.getRoleTextByRoleId = function(roleId){
    if(FriendCard_Common.isLMClub()){
        switch(roleId)
        {
            case 1:
                return "会长"
            case 3:
                return "盟主"
            case 2:
                return "组长"
            case 4:
                return "助理"
            case 5:
                return "管理员"
            case 6:
                return "超级管理员"
            case 10:
                return "合伙人"
        }
        return "未知身份";
    }else{
        switch(roleId)
        {
            case 1:
                return "管理员"
            case 3:
                return "会长"
            case 2:
                return "组长"
            case 4:
                return "助理"
            case 10:
                return "合伙人"
        }
        return "未知身份";
    }
}

FriendCard_Common.createCommonBtn = function(params){
    if(!params){
        params = {};
    }
    if(!params.resArr){
        params.resArr = [];
    }
    if(!params.text){
        params.text = "";
    }
    if(!params.color){
        if(FriendCard_Common.getSkinType() == 4){
            params.color = "#A38238";
        }else{
            params.color = "#A38238";
        }

    }
    if(!params.fontSize){
        if(FriendCard_Common.getSkinType() == 4){
            params.fontSize = 24;
        }else{
            params.fontSize = 24;
        }

    }
    var button = new ccui.Button(
        params.resArr[0] ? params.resArr[0] : "friendCards/common/btn_common_n.png",
        params.resArr[1] ? params.resArr[1] : null,
        params.resArr[2] ? params.resArr[2] : null);
    button.setTitleText(params.text);
    button.setTitleColor(cc.color(params.color))
    button.setTitleFontSize(params.fontSize);
    return button;
}
//主界面跑马灯
FriendCard_Common.pageRunText = function(gonggaoParent,notice){
    var bg_text = gonggaoParent.getChildByName("scroll");
    var msg = bg_text.getChildByName("msg");
    msg.ignoreContentAdaptWithSize(true);
    msg.anchorX = 0;
    msg.disableEffect();
    if(!MjClient.FriendCard_main_ui.redPackageAwardToastList){
        MjClient.FriendCard_main_ui.redPackageAwardToastList = [];
    }
    var optNode = msg;
    var msgIntervalTime = 10;
    if(MjClient.FriendCard_main_ui.redPackageAwardToastList.length > 0){
        if(optNode.getActionByTag(20191010)){
            return;
        }
        var awardData = MjClient.FriendCard_main_ui.redPackageAwardToastList[0];
        MjClient.FriendCard_main_ui.redPackageAwardToastList.splice(0,1);
        var clubInfo = FriendCard_Common.getClubInfo();
        if(clubInfo.clubId != awardData.clubId && clubInfo.leagueId != awardData.leagueId){
            //不是同一个俱乐部或联盟
            FriendCard_Common.pageRunText(gonggaoParent,gonggaoParent._notice ? gonggaoParent._notice : notice);
            return;
        }
        optNode.setString(unescape(awardData.text));
    }else{
        if(gonggaoParent._notice != notice){
            optNode.stopAllActions();
            gonggaoParent._notice = notice;

        }else{
            gonggaoParent._notice = notice;
            //已经在运行
            if(optNode.getActionByTag(20191010)){
                return;
            }
        }
        //跑马灯走这里
        optNode.setString(unescape(gonggaoParent._notice));
        //比赛决赛轮提示跑马灯
        if (MjClient.FriendCard_main_ui.matchNotice) {
            if (MjClient.FriendCard_main_ui.matchNotice.playIdx < MjClient.FriendCard_main_ui.matchNotice.msgs.length) {
                optNode.setString(MjClient.FriendCard_main_ui.matchNotice.msgs[MjClient.FriendCard_main_ui.matchNotice.playIdx++]);
            }else{
                MjClient.FriendCard_main_ui.matchNotice.playIdx = 0;
            }
            msgIntervalTime = 10;
        }
    }
    optNode.visible = true;
    var dx = 30;
    var otherActionTime = 0;
    if(bg_text.getInnerContainerSize()){
        optNode.y = bg_text.getInnerContainerSize().height - optNode.height * optNode.anchorY - 2;
    }else{
        optNode.y = bg_text.height - optNode.height * optNode.anchorY;
    }
    optNode.x = bg_text.width + dx;



    var callBack2 = new cc.CallFunc(function() {
        gonggaoParent.runAction(cc.sequence(cc.delayTime(msgIntervalTime),cc.callFunc(function(){
            FriendCard_Common.pageRunText(gonggaoParent,gonggaoParent._notice ? gonggaoParent._notice : notice);
        })));
    })

    var time2 = (bg_text.width + optNode.width + 2 * dx) / 75;
    var action2 = cc.sequence(cc.delayTime(otherActionTime),cc.moveTo(time2, cc.p(-(dx + optNode.width), optNode.y)), callBack2);
    action2.setTag(20191010);
    optNode.runAction(action2);

}

FriendCard_Common.getHideIdStr = function(uid){
    var hideIdStr = uid +"";
    if(hideIdStr.length >= 4){
        if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
            hideIdStr = hideIdStr.slice(0,2) + "**" + hideIdStr.slice(4,hideIdStr.length);
        }else{
            hideIdStr = hideIdStr.slice(0,1) + "***" + hideIdStr.slice(4,hideIdStr.length);
        }
    }
    return hideIdStr;
}


//俱乐部列表拖动的延迟时间
FriendCard_Common.touchBeginTime = 1000;
//俱乐部列表拖动功能
FriendCard_Common.clublistDrag = function(that){
    var touchNodeCell = that._node_clubList.getChildByName("touchNode");
    if(!touchNodeCell){
        return;
    }
    touchNodeCell.visible = false;
    var listView = that._node_clubList.getChildByName("clubListView");
    touchNode = listView.getChildByName("touchNode")
    if(touchNode){
        touchNode.removeFromParent(true);
    }
    if(!touchNode){
        touchNode = touchNodeCell.clone();
        touchNode.setName("touchNode");
        touchNode.visible = true;
        listView.addChild(touchNode,1);
    }
    var clubItems = [];
    for(var i = 0 ; i < listView.getChildren().length; i++){
        if(listView.getChildren()[i].name && listView.getChildren()[i].name.indexOf("clubListViewItem_") > -1){
            clubItems.push(listView.getChildren()[i]);
            clubItems[i].tempP = clubItems[i].getPosition();
        }
    }
    var listViewPos = listView.getPosition();
    listViewPos.x = listViewPos.x - (listView.getAnchorPoint().x - 0.5) * listView.width;
    listViewPos.y = listViewPos.y - (listView.getAnchorPoint().y - 0.5) * listView.height;
    var listBottomP = listView.getParent().convertToWorldSpace(cc.p(listViewPos.x,listViewPos.y - listView.height/2));
    var listTopP = listView.getParent().convertToWorldSpace(cc.p(listViewPos.x,listViewPos.y + listView.height/2));

    function intoMoveClubListMode() {
            clubItems.sort(function(a, b) {
                if (a.y > b.y) {
                    return -1;
                } else if (a.y == b.y) {
                    return a.x < b.x ? -1 : 1;
                } else {
                    return 1;
                }
            })
            that.canMoveClubItem = true;
            that.touchListener = cc.EventListener.create(getTouchListener());
            cc.eventManager.addListener(that.touchListener, touchNode);

    }

    function getTouchListener() {
            var curIndex = -1;
            var curCloneItem = null;
            var ret = {
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: false,
                onTouchBegan: function(touch, event) {
                    //防止多点触摸异常
                    if(!cc.sys.isObjectValid(clubItems[0])){
                        return;
                    }
                    if (curIndex != -1 && curCloneItem) {
                        clubItems[curIndex].visible = true;
                        clubItems[curIndex].setPosition(clubItems[curIndex].tempP);
                        curCloneItem.removeFromParent(true);
                        delete curCloneItem;
                        curCloneItem = null;
                    }

                    if (!that.canMoveClubItem) {
                        return false;
                    }

                    curIndex = -1;
                    that.touchBeginTime = new Date().getTime();
                    var p = touchNode.getParent().convertToNodeSpace(touch.getLocation());

                    for (var i = 0; i < clubItems.length; i++) {
                        if (clubItems[i].visible && cc.rectContainsPoint(clubItems[i].getBoundingBox(), p)) {
                            curIndex = i;
                        }
                    }

                    return curIndex != -1;
                },
                onTouchMoved: function(touch, event) {
                    if (curIndex == -1) {
                        return;
                    }
                    if (!curCloneItem) {
                        var nowTime = new Date().getTime();
                        if (nowTime - that.touchBeginTime > FriendCard_Common.touchBeginTime && true) {
                            curCloneItem = clubItems[curIndex].clone();
                            var head = curCloneItem.getChildByName("head")
                            head.isMask = true;
                            that.refreshHead(clubItems[curIndex].itemData.avatar, head);
                            clubItems[curIndex].visible = false;
                            listView.addChild(curCloneItem);
                        } else {
                            return;
                        }
                    }
                    listView.setTouchEnabled(false);


                    var p = touchNode.getParent().convertToNodeSpace(touch.getLocation());
                    p.x = p.x + (curCloneItem.getAnchorPoint().x- 0.5) * curCloneItem.width;
                    p.y = p.y + (curCloneItem.getAnchorPoint().y- 0.5) * curCloneItem.height;
                    curCloneItem.setPosition(p);
                    //判断是否在俱乐部列表ui内
                    //找到最近的目标
                    var distance = -1;
                    var moveToIndex = -1;
                    for (var i = 0; i < clubItems.length; i++) {
                        if (i != curIndex && clubItems[i].visible) {
                            if(cc.rectOverlapsRect(curCloneItem,clubItems[i])){
                                var tempDistance = Math.sqrt(Math.pow(curCloneItem.x - clubItems[i].x, 2) + Math.pow(curCloneItem.y - clubItems[i].y, 2));
                                if (distance == -1 || tempDistance < distance) {
                                    distance = tempDistance;
                                    moveToIndex = i;
                                }
                            }

                        }
                    }
                    cc.log("rectIntersectsRect true","moveToIndex",moveToIndex,"distance",distance)
                    //最近的目标中心点偏移25内可移动
                    if (moveToIndex > -1 && distance < curCloneItem.width/2) {
                        //cc.log("onTouchMoved friend info can moveToIndex =  " + moveToIndex);
                        if (!that.canMoveClubItem) {
                            return;
                        }
                        that.canMoveClubItem = false;

                        //交换数据
                        var tempP = clubItems[curIndex].tempP;
                        var moveAction = cc.moveTo(0.3, clubItems[curIndex].tempP);
                        clubItems[curIndex].tempP = clubItems[moveToIndex].tempP;
                        clubItems[curIndex].setPosition(clubItems[curIndex].tempP);
                        clubItems[moveToIndex].tempP = tempP;

                        clubItems[moveToIndex].runAction(cc.sequence(moveAction, cc.callFunc(function() {
                            that.canMoveClubItem = true;
                        })));
                        //这里用用tempP，因为有0.3秒的动画
                        clubItems.sort(function(a, b) {
                            if (a.tempP.y > b.tempP.y) {
                                return -1;
                            } else if (a.tempP.y == b.tempP.y) {
                                return a.tempP.x < b.tempP.x ? -1 : 1;
                            } else {
                                return 1;
                            }
                        })
                        curIndex = moveToIndex;
                    }
                    if(moveToIndex > -1){
                        var oneItemtime = 0.3;//画过1个item要0.5秒
                        var nowP = touch.getLocation()
                        cc.log("nowP",JSON.stringify(nowP),"listBottomP",JSON.stringify(listBottomP),"listTopP",JSON.stringify(listTopP));
                        if(nowP.y - listBottomP.y < 20){//滑到列表低（不是指最后一个）
                            listView.scrollToBottom(oneItemtime * (clubItems.length - moveToIndex),false);
                        }else if(listTopP.y - nowP.y < 20){//滑到列表顶（不是指第一个）
                            listView.scrollToTop(oneItemtime * (moveToIndex + 1),false);
                        }else{
                            listView.stopAutoScroll();
                        }
                    }else{
                        listView.stopAutoScroll();
                    }


                },
                onTouchEnded: function(touch, event) {
                    if (curCloneItem && curIndex > -1) {
                        clubItems[curIndex].setPosition(curCloneItem.getPosition());
                        clubItems[curIndex].visible = true;
                        curCloneItem.visible = false;
                        curCloneItem.removeFromParent(true);
                        delete curCloneItem;
                        curCloneItem = null;
                        that.canMoveClubItem = false;
                        var moveAction = cc.moveTo(0.3, clubItems[curIndex].tempP);
                        clubItems[curIndex].runAction(cc.sequence(moveAction, cc.callFunc(function() {
                            that.canMoveClubItem = true;
                            //可以在这里遍历，赋值一些标记给
                            FriendCard_Common.setLocalClubListSort(clubItems,that.clubList)
                        })));
                    }
                    curIndex = -1;
                    listView.setTouchEnabled(true);
                    listView.stopAutoScroll();
                },
                onTouchCancelled: function(touch, event) {
                    ret.onTouchEnded(touch, event);
                    listView.setTouchEnabled(true);
                    listView.stopAutoScroll();
                }
            };
            return ret;
    }
    intoMoveClubListMode()
}

//修改俱乐部列表排序
FriendCard_Common.setLocalClubListSort = function(clubItems,clublist){
    var curClubListSort = ""
    for (var i = 0; i < clubItems.length; i++) {
        if (clubItems[i].name && clubItems[i].name.indexOf("clubListViewItem_") > -1) {
            if (i == clubItems.length - 1) {
                curClubListSort = curClubListSort + clubItems[i].itemData.clubId
            } else {
                curClubListSort = curClubListSort + clubItems[i].itemData.clubId + "-"
            }
        }
    }
    util.localStorageEncrypt.setStringItem("FriendCard_Common_LocalClubListSort" + SelfUid() + MjClient.getAppType() , curClubListSort);
    clublist = FriendCard_Common.getLocalClubListSort(clublist)
}

//获得俱乐部列表排序
FriendCard_Common.getLocalClubListSort = function(curList){
    var localClubSort = util.localStorageEncrypt.getStringItem("FriendCard_Common_LocalClubListSort" + SelfUid() + MjClient.getAppType() , "");
    if(localClubSort == ""){
        return curList;
    }
    var list = localClubSort.split('-');

    curList.sort(function(a,b){
        var indexA =  list.indexOf(a.clubId.toString())
        var indexB =  list.indexOf(b.clubId.toString())

        if ( indexA != -1) {
            if (indexB != -1) {
                return indexA - indexB
            }else{
                return -1
            }
        }else{
            if (indexA != -1) {
                return indexA - indexB
            }else{
                return 1
            }
        }

    })

    return curList;
}

//亲友圈列表默认排序  联盟 -> 自己的亲友圈 -> 其他人的亲友圈
FriendCard_Common.clubListSort = function(clubList,leagueList) {
    leagueList.sort(function(a,b){
        if ( a.creator != MjClient.data.pinfo.uid && b.creator != MjClient.data.pinfo.uid) {
            return false;
        }

        return a.creator != MjClient.data.pinfo.uid;
    })
    clubList.sort(function(a,b){
        if ( a.creator != MjClient.data.pinfo.uid && b.creator != MjClient.data.pinfo.uid) {
            return false;
        }

        return a.creator != MjClient.data.pinfo.uid;
    })
    var list =  leagueList.concat(clubList);

    return  FriendCard_Common.getLocalClubListSort(list);
}

FriendCard_Common.getServerTime = function(){
    if(!MjClient.data || !MjClient.data.serverTime){
        return Date.now();
    }
    return (Date.now() - MjClient._localTime + MjClient.data.serverTime);
}

FriendCard_Common.clubQuitMatch = function (matchId) {
    var that = MjClient.FriendCard_main_ui;
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.clubQuitMatch", { matchId: matchId },
        function (rtn) {
            MjClient.unblock();
            if (rtn.code == 0) {
                if (rtn.message) {
                    MjClient.showToast(rtn.message);
                }
                if(that && rtn.matchUser){
                    var rank = that._matchData.rank;
                    that._matchData = rtn.matchUser;
                    that._matchData.rank = rank;
                    that.refreshInfo();
                }

            } else {
                MjClient.showToast(rtn.message);
            }

        }
    );
}

FriendCard_Common.leagueQuitMatch = function (matchId) {
    var that = MjClient.FriendCard_main_ui;
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.leagueQuitMatch", { matchId: matchId },
        function (rtn) {
            MjClient.unblock();
            if (rtn.code == 0) {
                if (rtn.message) {
                    MjClient.showToast(rtn.message);
                }
                if(that && rtn.matchUser){
                    var rank = that._matchData.rank;
                    that._matchData = rtn.matchUser;
                    that._matchData.rank = rank;
                    that.refreshInfo();
                }

            } else {
                MjClient.showToast(rtn.message);
            }

        }
    );
}


var FriendCard_UI = FriendCard_UI || {};

//设置主界面的桌子触摸事件
FriendCard_UI.setClubDeskTouchEvent = function(parNode){
    parNode.scheduleUpdate();
    parNode.update = function(dt){
        MjClient.FriendCard_main_ui._deskScrollx = -parNode.getInnerContainerPosition().x;
        MjClient.FriendCard_main_ui.refreshDeskItem();
    }
    return;
}
//type == 1正在加载...，，type == 2上拉加载更多，type == 3没有更多了
FriendCard_UI.addListBottomTipUi = function(listView,type){
    var items = listView.getItems();
    for (var i = 0; i < items.length; i ++){
        if (items[i].getChildByName("moreTextTip"))
            items[i].removeChildByName("moreTextTip");
    }
    if (items.length > 0){
        var item = items[items.length - 1];
        var moreTextTip = new ccui.Text("没有更多了", "lanting.TTF", 26);
        if(type == 1){
            moreTextTip.setString("正在加载")
        }else if(type == 2){
            moreTextTip.setString("上拉加载更多")
        }
        moreTextTip.setColor(cc.color("#2B344C"));
        moreTextTip.setName("moreTextTip");
        moreTextTip.setPosition(item.width/2, -30);
        item.addChild(moreTextTip);
    }
}
FriendCard_UI.setListAutoLoadMore = function(listView,callBackFunc,checkFunc){
    listView.addCCSEventListener(function(sender,type){
        // **新老引擎bug**
        var EVENT_AUTOSCROLL_ENDED = ccui.ScrollView.EVENT_AUTOSCROLL_ENDED;
        if (cc.sys.OS_WINDOWS == cc.sys.os || cc.ENGINE_VERSION.indexOf("3.16") >= 0){
            EVENT_AUTOSCROLL_ENDED = 12;
        }
        switch (type) {
            case ccui.ScrollView.EVENT_SCROLLING:
            case EVENT_AUTOSCROLL_ENDED:
                var curItemBottom = sender.getBottommostItemInCurrentView();
                if(curItemBottom && curItemBottom.dataIndex >= sender.getItems().length -2){
                    var canCallBack = true;
                    if(checkFunc){
                        canCallBack = checkFunc(curItemBottom);
                    }
                    if(canCallBack){
                        if(callBackFunc){
                            callBackFunc();
                        }
                    }
                }
                break;
        }
    });
}







