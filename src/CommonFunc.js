/* ======================================
 *  放一些共用的方法
 *  ====================================== */
MjClient.guoHuHasBeenShown = "guoHuHasBeenShown";   // 过胡已经显示了
MjClient.MaxPlayerNum = 4;
MjClient.endoneui = null;
MjClient.lastCardposNode = null;
MjClient.createRoomLayer = null;
var ActionType =  //图片提示
{
    CHI:1,                      // 吃
    PENG:2,                     // 碰
    GANG:3,                     // 杠
    TING:4,                     // 听
    FLOWER:5,                   // 花
    HU:6,                       // 胡
    QINGYISE:7,                 // 清一色
    GANGKAI:8,                  // 杠开
    QIDUI:9,                    // 七对
    DIHU:10,                    // 地胡
    TIANHU:11,                  // 天胡
    ZIMO:12,                    // 自摸
    MINGDAN:13,                 //
    ANDAN:14,                   //
    QUETUIDAN:15,               // 瘸腿暗杠
    XUANFENGDAN:16,             //
    HUANGJINDAN:17,             //
    JIEGUANGDAN:18,             // 借光杠
    DIANPAO:19,                 // 点炮
    KAIGANG:20,                 // 开杠
    BUGANG:21,                  // 补杠
    LONG:22,                    // 龙
    JIAOTINGDIAOPAO:23,         // 叫听点炮
    SHUAIJIN:24,                // 摔金
    YITIAOLONG:25,              // 一条龙
    LIANG:26,                   //
    DUIDUIHU:27,                // 碰碰胡
    DAMI:28,                    //打米
    JIANGTING:29,               //将听
    SHANGJIN: 30,               //上金
    DADIAOCHE: 31,              //大吊车
    DAJUE: 32,                  //大绝
    YITIAOLONG_NEW: 33,         //新一条龙
    DUIDUIHU_NEW: 34,           //新对对胡
    QUANHUN: 35,                // 全荤（曲塘23）
    QINGHU: 36,                 // 清胡（曲塘23）
    BAOQUANHUN: 37,             // 报全荤（曲塘23）
};

function isCanChangePlayerNum()
{
    if (MjClient.gameType == MjClient.GAME_TYPE.HUAI_AN_CC ||
        MjClient.gameType == MjClient.GAME_TYPE.SI_YANG ||
        MjClient.gameType == MjClient.GAME_TYPE.XIN_SI_YANG ||
        MjClient.gameType == MjClient.GAME_TYPE.HZ_TUI_DAO_HU ||
        MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN ||
        MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
        MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
        MjClient.gameType == MjClient.GAME_TYPE.HUAI_AN_ERZ ||
        MjClient.gameType == MjClient.GAME_TYPE.LIAN_YUN_GANG ||
        MjClient.gameType == MjClient.GAME_TYPE.GAN_YU ||
        MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO ||
        MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU ||
        MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI||
        MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ||
        MjClient.gameType == MjClient.GAME_TYPE.GUAN_YUN ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.GUAN_NAN ||
        MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.JIANG_HUA_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.SHU_YANG ||
        MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_KD ||
        MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN ||
        MjClient.gameType == MjClient.GAME_TYPE.HE_JIN_KUN_JIN ||
        MjClient.gameType == MjClient.GAME_TYPE.WU_TAI_KOU_DIAN ||
        MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.ZHUO_HAO_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU ||
        MjClient.gameType == MjClient.GAME_TYPE.LING_SHI_BIAN_LONG ||
        MjClient.gameType == MjClient.GAME_TYPE.LING_SHI_BAN_MO ||
        MjClient.gameType == MjClient.GAME_TYPE.PING_YAO_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.PING_YAO_KOU_DIAN ||
        MjClient.gameType == MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3 ||
        MjClient.gameType == MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN ||
        MjClient.gameType == MjClient.GAME_TYPE.LIAN_SHUI ||
        MjClient.gameType == MjClient.GAME_TYPE.SU_QIAN ||
        MjClient.gameType == MjClient.GAME_TYPE.DONG_HAI ||
        MjClient.gameType == MjClient.GAME_TYPE.XU_ZHOU ||
        MjClient.gameType == MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN ||
        MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.HUAI_AN_TTZ ||
        MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO ||
        MjClient.gameType == MjClient.GAME_TYPE.SHOU_YANG_QUE_KA||
        MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN ||
        MjClient.gameType == MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN ||
        MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_LI_SI ||
        MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI||
        MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN||
        MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN||
        MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI||
        MjClient.gameType == MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG||
        MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI||
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN||
        MjClient.gameType == MjClient.GAME_TYPE.FAN_SHI_XIA_YU ||
        MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN ||
        MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI ||
        MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN ||
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.FEN_YANG_QUE_MEN ||
        MjClient.gameType == MjClient.GAME_TYPE.XUE_ZHAN ||
        MjClient.gameType == MjClient.GAME_TYPE.XUE_LIU ||
        MjClient.gameType == MjClient.GAME_TYPE.JING_LE_KOU_DIAN ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_GUAI_SAN_JIAO ||
        MjClient.gameType == MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG ||
        MjClient.gameType == MjClient.GAME_TYPE.LUAN_GUA_FENG ||
        MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
        MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU ||
        MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG ||
        MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG  ||
        MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN ||
        MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_BAI_DA ||
        MjClient.gameType == MjClient.GAME_TYPE.NAN_JING ||
        MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA ||
        MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA_NEW ||
        MjClient.gameType == MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.GUI_ZHOU_AN_SHUN_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.FEN_XI_YING_KOU ||
        MjClient.gameType == MjClient.GAME_TYPE.HUAI_AN ||
        MjClient.gameType == MjClient.GAME_TYPE.HA_HONGZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI 
    )
    {
        return true;
    } else {
        return false;
    }
}

/**
 * 根据人数对应偏移 ui传过来的off , 用于ui逻辑计算
 * @param  {number} off ui对应的位置 自己down:0 right:1 top:2 left:3
 * @return {number} 对应人数偏移后的off
 */
function getOffForPlayerNum(off)
{
    if (!isCanChangePlayerNum())
        return off;

    if(MjClient.MaxPlayerNum==2){
        if(1 == off) 
            off = 2;
    }
    else if(MjClient.MaxPlayerNum==3){
        if(2 == off) 
            off = MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN ? 4 : 3;
    }
    else if(MjClient.MaxPlayerNum == 4 && 
        (MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN))
    {
        if(3 == off) off =4;
    }
    return off;
}

/**
 * 根据相对index，计算出玩家off
 * @param {number} index 玩家相对index
 * @param {number} [selfIndex] 相对于index,可不传
 * @return {number} 返回玩家off
 */
function getOffByIndex(index, selfIndex)
{
    if (selfIndex == null)
        selfIndex = MjClient.data.sData.tData.uids.indexOf(SelfUid());

    var off = (index - selfIndex + MjClient.MaxPlayerNum) % MjClient.MaxPlayerNum;
    return getOffForPlayerNum(off);
}

function IsRoomCreator()
{
    var sData=MjClient.data.sData;
    if(sData)
    {
        return sData.tData.owner == SelfUid();
    }
    return false;
};


function GetNameByUid(uids)
{
    var sData=MjClient.data.sData;

    var rtn=[];
    for(var i=0;i<uids.length;i++)
    {
        var pl=sData.players[uids[i]];
        if(pl) rtn.push(unescape(pl.info.nickname));
    }
    return rtn+"";
}

function isValidMobileNum(obj) {
    return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(obj);
}

/*
 限制名字的长度， by sking
 @name 玩家本来的名字
 @length 需要限制的长度，默认为6个字符
 */
function getNewName (name,length) {
    var _newName = name;
    var strlen = name.length;

    if(cc.isUndefined(length) || length == null)
    {
        length = 7;//默认名字限制5个字符
    }

    if(strlen >= length)
    {
        _newName = name.substring(0, length - 1);
        _newName += "...";
    }
    return _newName;
};

/**
 * @Author:      Lms
 * @DateTime:     2018-04-25
 * @Description: 不同于上面限制7个字符以上 (一般用于0~6个字符) 只带两个省略号  用于 任何字符数量  通用
 */

function getNewName_new (name,length) {
    var _newName = name;
    var strlen = name.length;
    if(cc.isUndefined(length) || length == null)
    {
        length = 5;//默认名字限制4个字符
    }

    if(strlen >= length)
    {
        _newName = name.substring(0,length - 1);
        _newName += "...";
    }
    return _newName;
};



function getPlayerName(name, length) {
    var _newName = name;
    var len = name.length;
    if(cc.isUndefined(length) || length == null)
    {
        length = 5;
    }

    if(len >= length)
    {
        _newName = name.substring(0, length);
    }
    return _newName;
};


// 获取解散方式的图片
function getDismissTypeName(pl){
    if(!pl) return "";
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var index = 0;
    if (pl.info.uid == tData.firstDel) {
        index = 1;// "申请解散"
    }else if(pl.mjdesc.indexOf("同意解散") >= 0){
        index = 2;
    }else if(pl.mjdesc.indexOf("拒绝解散") >= 0){
        index = 3;
    }else{
        index = 4; // 默认同意
    }
    return ["","申请解散","同意解散","拒绝解散","自动同意"][index];
}

//向服务器 请求 起手胡
function MJQsHuToServer(pQsHuName)
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    var sendMsg = {
        cmd: "MJQsHu",
        qshuName: pQsHuName,
    }
    cc.log("====================MJQsHuToServer=================", JSON.stringify(pQsHuName));
    MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
}

function MJPassQsHuToServer()
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    var sendMsg = {
        cmd: "MJPassQsHu",
    }
    cc.log("====================MJPassQsHuToServer=================");
    MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
}

//向服务器发送杠牌
function MJGangToServer(cd)
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    cc.log("====================MJGangToServer================= SKING:", cd);
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJGang",
        card: cd,
        eatFlag: EatFlag()
    });
}

function FreeBeginToServer(yes)
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    cc.log("====================FreeBeginToServer================= yes:", yes);
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "FreeBegin",
        yes: yes,
    });
}

//头像下载遮罩方法
function loadzhezhao(headSprite,nobody) {

    //遮罩方法
    var tmpnode=new cc.Node();
    tmpnode.setContentSize(nobody.getContentSize());
    tmpnode.setName("WxHead");
    var clippingNode=new cc.ClippingNode();
    if(MjClient.getGoldFiledType && MjClient.getGoldFiledType() == 1){
        var mask=new cc.Sprite("play/zhezhao.png");
    }else{
        var mask=new cc.Sprite("home/zhezhao1.png");
    }
    clippingNode.setAlphaThreshold(0);

    clippingNode.setStencil(mask);

    clippingNode.addChild(headSprite);
    //   clippingNode.setScale(1.25);
    clippingNode.setAnchorPoint(0.5,0.5);
    clippingNode.setPosition(tmpnode.getContentSize().width/2,tmpnode.getContentSize().height/2);
    if(MjClient.getGoldFiledType && MjClient.getGoldFiledType() == 1){
        var hideblock=new cc.Sprite("play/head_frame.png");
    }else{
        var hideblock=new cc.Sprite("home/homeHeadCusPic_3.png");
    }

    hideblock.setAnchorPoint(0.5,0.5);
    hideblock.setPosition(tmpnode.getContentSize().width/2,tmpnode.getContentSize().height/2);
    //    hideblock.setScale(1.25);
    tmpnode.addChild(clippingNode);
    tmpnode.addChild(hideblock);
    tmpnode.setAnchorPoint(0.5,0.5);
    tmpnode.setPosition(nobody.getContentSize().width/2,nobody.getContentSize().height/2);
    tmpnode.setScale(1.4);
    nobody.addChild(tmpnode);

    /*   var head = node;
     var url = d.img;
     cc.log(url);
     if(!url) url = "png/default_headpic.png";

     var clippingNode = new cc.ClippingNode();
     var mask = new cc.Sprite("home/zhezhao1.png");
     clippingNode.setAlphaThreshold(0);
     clippingNode.setStencil(mask);
     var img = new cc.Sprite(d.img);
     img.setScale(mask.getContentSize().width/img.getContentSize().width);
     clippingNode.addChild(img);
     clippingNode.setScale(0.95);
     clippingNode.setPosition(head.getContentSize().width/2,head.getContentSize().height/2);

     if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
     clippingNode.setPosition(head.getContentSize().width/2,head.getContentSize().height/2);
     }

     //遮罩框
     var hideblock = new cc.Sprite("home/homeHeadCusPic_3.png");
     hideblock.setPosition(hideblock.getContentSize().width/2,hideblock.getContentSize().height/2);
     clippingNode.setScale(1.4);
     hideblock.setScale(1.4);
     head.addChild(clippingNode);
     head.addChild(hideblock);


     */
    /* var head = node;
     var url = d.img;
     if(!url) url = "png/default_headpic.png";
     cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
     {
     if(!err && texture && cc.sys.isObjectValid(head))
     {
     var clippingNode = new cc.ClippingNode();
     var mask = new cc.Sprite("gameOver/gameOver_headBg2.png");
     clippingNode.setAlphaThreshold(0);
     clippingNode.setStencil(mask);
     var img = new cc.Sprite(texture);
     img.setScale(mask.getContentSize().width / img.getContentSize().width);
     clippingNode.addChild(img);
     clippingNode.setPosition(head.getContentSize().width / 2, head.getContentSize().height / 2);
     //遮罩框
     var hideblock = new cc.Sprite("gameOver/gameOver_headBg3.png");
     hideblock.setPosition(head.getContentSize().width / 2, head.getContentSize().height / 2);
     head.addChild(clippingNode);
     head.addChild(hideblock);
     }
     });*/
}
/*
 设置过胡的标识  by sking
 */
function setSkipHuState()
{
    if (MjClient.gameType == MjClient.GAME_TYPE.SHU_YANG)
    {
        return;
    }

    var pl = getUIPlayer(0);
    if (pl && pl.skipHu)
    {
        if ((cc.isArray(pl.skipHu) && pl.skipHu.length > 0) || !cc.isArray(pl.skipHu))
        {
            var _skipHuIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipHuIconTag");
            // _skipHuIconNode.setString("过\n胡");
            _skipHuIconNode.visible = true;
        }
    }
}

/*
 设置过碰状态
 */
function setSkipPengState()
{
    var pl = getUIPlayer(0);
    cc.log("====================setSkipPengState=============== pl.skipPeng = " + pl.skipPeng);
    if (pl.skipPeng) {
        var _skipPengIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipPengIconTag");
        if (pl.skipPeng.length > 0) {
            //_skipHuIconNode.setString("过\n碰"); 需求已经改成图片了
            _skipPengIconNode.visible = true;
        }else{
            _skipPengIconNode.visible = false;
        }
    }
}


/*
 设置弃胡状态
 */
function setQiHuState()
{
    if (MjClient.gameType == MjClient.GAME_TYPE.XU_ZHOU)//只有徐州有弃胡
    {
        var pl = getUIPlayer(0);
        if (pl.isQiHu) {
            var _skipHuIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipHuIconTag");
            _skipHuIconNode.setString("弃\n胡");
            _skipHuIconNode.visible = true;

        }
    }
}




// 向服务器发送过牌
function MJPassConfirmToServer()
{

    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    var tData = MjClient.data.sData.tData;
    COMMON_UI.clearShowCurrentEatCards();
    cc.log("=1111111111111===================MJPassConfirmToServer 11111 =================" + EatFlag());
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJPass",
        eatFlag: EatFlag(),
        cardNext: tData.cardNext
    });

    var pl = getUIPlayer(0);
    if(tData.tState === TableState.waitPut && pl.mjState === TableState.waitPut)
    {
        if(MjClient.gameType != MjClient.GAME_TYPE.XU_ZHOU)//徐州没有出牌按钮
        {
            if(!MjClient.ruGao_Sort)
            {
                MjClient.playui.jsBind.BtnPutCard._node.visible = true;
            }

        }
    }

    // 如果是自摸胡, 向服务器发送过消息，记录一次，防止拖出去牌，再次提示过胡弹窗
    if(pl && (pl.eatFlag & 8)){
        if(pl.mjhand && (pl.mjhand.length % 3 === 2)){
            util.localStorageEncrypt.setBoolItem(MjClient.guoHuHasBeenShown, true);
        }
    }
}



// 向服务器发送吃牌
function MJChiToServer(pos)
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    cc.log("====================MJChiToServer=================pos=" + pos);
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJChi",
        pos: pos,
        eatFlag: EatFlag()
    });
}




function MJHuToServer()
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    cc.log("====================MJHuToServer=================");
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJHu",
        eatFlag: EatFlag()
    });
}



function MJPengToServer()
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求

    var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer(0);
    if(pl.mustHu){
        return MjClient.showToast("有胡必胡");
    }
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJPeng",
        eatFlag: EatFlag()
    });
}
function MJOuCardToServer()
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求

    var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer(0);


    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJOuCard",
        isOuCard:true
    });
}
//向服务器发送听牌操作
function MJTingToServer()
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    cc.log("====================MJTingToServer=================");
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJTing",
    });
}

function getPlayerIndex(off)
{
    if (isCanChangePlayerNum())
    {
        if(MjClient.MaxPlayerNum==2){
            if(1 == off) return null;
            if(3 == off) return null;
            if(2 == off) off = 1;
        }
        else if(MjClient.MaxPlayerNum==3){
            // cc.log("------MjClient.MaxPlayerNum ----------" + MjClient.MaxPlayerNum);// playerStatusChange 事件使这里频繁输出日志
            if(2 == off) return null;
            if(3 == off || (off == 4 && MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)) 
                off = 2;
        }
        else if((MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN) && MjClient.MaxPlayerNum == 4)
        {
            if(3 == off) return null;
            if(4 == off) off =3;
        }
    }

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    return (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum;
}

// 通过off偏移值来获取Pl对象
function getUIPlayer(off)
{
    var sData = MjClient.data.sData;

    if (!sData)
        return null;

    var tData = sData.tData;
    var uids = tData.uids;
    var index = getPlayerIndex(off);
    if(index < uids.length)
    {
        return sData.players[uids[index]];
    }

    return null;
}

/*
 @auther: by sking 2018.9.5
 @function：通过 uid 获取 pl 对象
 @uid :玩家的ID
 */
function getUIPlayerByUID(uid)
{

    var sData = MjClient.data.sData;

    var pl = sData.players[uid];
    if(pl){
        return pl;
    }
    else
    {
        MjClient.showToast("没取到值！")
    }
}



// 获取ui头像，通过偏移值
function getUIHeadByOff(off)
{
    var pl = getUIPlayer(off);
    if(!pl)
    {
        return {};
    }

    return {
        uid: pl.info.uid,
        url: pl.info.headimgurl
    };
}



// 通过uid来获取该uid在off的位置(0,1,2,3)
function getUiOffByUid(uid)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var targetIndex = uids.indexOf(uid);
    return getOffByIndex(targetIndex);
}



// 更新电池电量
function updateBattery(node)
{
    var callNative = MjClient.native.NativeBattery;
    node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callNative), cc.delayTime(30))));
}



// 更新wifi信号
function updateWifiState(node)
{
    var callback = function()
    {
        var _path = "playing/gameTable/";
        // 新版UIwifi图标
        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI)
        {
            _path = "playing/ziPaiBanner/";
            if (MjClient.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING ||
                MjClient.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN ||
                MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI ||
                MjClient.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI ||
                MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI ||
                MjClient.gameType == MjClient.GAME_TYPE.EN_SHI_SHAO_HU) {
                _path += 'huaPai/';
            }
        }

        if(COMMON_UI3D.is3DUI()) _path = "playing/gameTable/WIFI3D/";
        if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_DA_TONG||
            MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG||
            MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU||
            MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT||
            MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HA||
            MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO||
            MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_JZ || 
            MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ)
            _path ="playing/gameTable/DDZ/";

        var ms = MjClient.reqPingPong / 1000.0;
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
            // 江苏三格信号
            if(ms < 0.3)
            {
                node.loadTexture(_path + "WIFI_1.png");
            }
            else if(ms < 0.6)
            {
                node.loadTexture(_path + "WIFI_2.png");
            }
            else
            {
                node.loadTexture(_path + "WIFI_3.png");
            }
        }
        else {
            if(ms < 0.2)
            {
                node.loadTexture(_path + "WIFI_1.png");
            }
            else if(ms < 0.4)
            {
                node.loadTexture(_path + "WIFI_2.png");
            } else if(ms < 0.6)
            {
                node.loadTexture(_path + "WIFI_3.png");
            }
            else
            {
                node.loadTexture(_path + "WIFI_4.png");
            }
        }
    };

    node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callback), cc.delayTime(5))));
}

// 更新wifi信号 3张图片
function updateWifiState_new(node)
{
    var callback = function()
    {
        var ms = MjClient.reqPingPong / 1000.0;
        if(ms < 0.3)
        {
            node.loadTexture("playing/paodekuaiTable_new/WIFI_3.png");
        }
        else if(ms < 0.6)
        {
            node.loadTexture("playing/paodekuaiTable_new/WIFI_2.png");
        }
        else
        {
            node.loadTexture("playing/paodekuaiTable_new/WIFI_1.png");
        }
    };
    node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callback), cc.delayTime(5))));
}


function CheckRoomUiDelete()
{
    if(MjClient.rePlayVideo != -1) return; //回放的时候，不弹解散窗口

    var sData = MjClient.data.sData;

    if(sData.tData.delEnd != 0 && !MjClient.delroomui)
    {
        MjClient.Scene.addChild(new RemoveRoomView());
        if (MjClient.webViewLayer != null)
        {
            MjClient.webViewLayer.close();
        }
    }
    else if(sData.tData.delEnd == 0 && MjClient.delroomui)
    {
        MjClient.delroomui.removeFromParent(true);
        delete MjClient.delroomui;
    }
    if(MjClient.gemewaitingui){
        MjClient.gemewaitingui.removeFromParent(true);
        delete MjClient.gemewaitingui;
    }
    if(cc.sys.isObjectValid(MjClient.playerChatLayer)){
        MjClient.playerChatLayer.removeFromParent(true);
        delete MjClient.playerChatLayer;
    }
}




//弹出过胡
function PopupSkipHu()
{
    var jsonui = ccs.load("SkipHu.json");
    setWgtLayout(jsonui.node.getChildByName("Image_1"), [0.2, 0.2], [0.5, 0.3], [0, 0]);
    MjClient.Scene.addChild(jsonui.node);
    jsonui.node.runAction(cc.sequence(cc.delayTime(2), cc.removeSelf()));
}



//设置微信头像
function setWxHead(node, d, off)
{
    if(d.uid == getUIHeadByOff(off).uid)
    {
        var nobody = node.getChildByName("nobody");
        var WxHead = nobody.getChildByName("WxHead");
        if(WxHead)
        {
            WxHead.removeFromParent();
        }
        cc.log(off + "----------setWxHead---------------"+d.uid);
        var headSprite = new cc.Sprite(d.img);
        if((MjClient.getAppType()==MjClient.APP_TYPE.TXJINZHONGMJ || MjClient.getAppType()==MjClient.APP_TYPE.DQSHANXIMJ) &&
            MjClient.gameType != MjClient.GAME_TYPE.LV_LIANG_DA_QI &&
            MjClient.gameType != MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN &&
            MjClient.gameType != MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER)
        {
            loadzhezhao(headSprite,nobody);
        }
        else if(MjClient.getAppType() === MjClient.APP_TYPE.QXHAIANMJ || MjClient.getAppType() === MjClient.APP_TYPE.QXNTQP)
        {
            headSprite.setName("WxHead");
            nobody.addChild(headSprite);
            setWgtLayout(headSprite, [1, 1], [0.5, 0.5], [0, 0], false, true);
        }
        else{   
            headSprite.setName("WxHead");
            nobody.addChild(headSprite);
            setWgtLayout(headSprite, [0.91, 0.91], [0.5, 0.5], [0, 0], false, true);
        }
        COMMON_UI.addNobleHeadFrame(nobody,getUIPlayer(off))
    }
}



//设置玩家掉线头像
function setUserOffline(node, off)
{
    // 金币场不显示离线状态
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if (tData && tData.fieldId) {
        node.getChildByName("head").getChildByName("offline").visible = false;
        return;
    }

    var pl = getUIPlayer(off);
    if(!pl)
    {
        return;
    }

    // 离线自己不可见
    if (off == 0) {
        node.getChildByName("head").getChildByName("offline").visible = false;
        return;
    }

    node.getChildByName("head").getChildByName("offline").zIndex = 100;
    //头像层级结构
    if((MjClient.getAppType()==MjClient.APP_TYPE.TXJINZHONGMJ || MjClient.getAppType()==MjClient.APP_TYPE.DQSHANXIMJ) && 
        MjClient.gameType != MjClient.GAME_TYPE.LV_LIANG_DA_QI &&
        MjClient.gameType != MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN &&
        MjClient.gameType != MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER ||
        MjClient.getAppType() === MjClient.APP_TYPE.QXHAIANMJ)
    {
        var tmpfang=node.getChildByName("head").getChildByName("fangTag");
        if(tmpfang) tmpfang.zIndex=102;
        node.getChildByName("head").getChildByName("name_bg").zIndex=101;
        node.getChildByName("head").getChildByName("name").zIndex=103;
    }
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
        isJinZhongAPPType() ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
    {

        if (pl.onLine == false)
        {
            var _offLineNode = node.getChildByName("head").getChildByName("offline");
            _offLineNode.unscheduleAllCallbacks();
            _offLineNode.schedule(function(){
                var _timeNode = _offLineNode.getChildByName("offLineTime");
                if (!_timeNode) {

                    _timeNode = new ccui.Text();
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {//岳阳同一使用方正兰亭
                        _timeNode.setFontName("fonts/lanting.TTF");
                    }
                    _timeNode.setName("offLineTime");
                    _timeNode.setFontSize(26);
                    _offLineNode.addChild(_timeNode)
                }
                else
                {
                    _timeNode.visible = true;
                }

                _timeNode.setPosition(cc.p(_offLineNode.getContentSize().width/2,_offLineNode.getContentSize().height*0.8));
                if (pl.offLineTime)
                {

                    var _currentTime = new Date().getTime();
                    var _showTime = _currentTime - pl.offLineTime;
                    if(_showTime < 0) _showTime = 0;
                    _timeNode.setString(MjClient.dateFormat(new Date(_showTime),"mm:ss"));
                }
                else
                {
                    _timeNode.setString("");
                }
            });

        }
    }
    node.getChildByName("head").getChildByName("offline").visible = !pl.onLine;
}

//小结算离线状态
function setUserOfflineWinGamePanel(node,pl)
{
    if(!pl || pl.onLine == true)
    {
        return;
    }
    if(MjClient.rePlayVideo != -1) return; //回放的时候
    if(node.getChildByName("head") == null) return;

    var path = "playing/other/Z_offline.png";
    var posY = 0.8;
    // 岳阳小结算使用圆形底框
    if(MjClient.APP_TYPE.QXYYQP === MjClient.getAppType() ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
    {
        path = "gameOver/Z_offline.png";
        posY = 0.6;
    }

    if(!node.getChildByName("head").getChildByName("offline"))
    {
        var _offline = new ccui.ImageView(path);
        _offline.setName("offline");
        _offline.setPosition(cc.p(node.getChildByName("head").getContentSize().width/2,node.getChildByName("head").getContentSize().height/2));
        node.getChildByName("head").addChild(_offline);
    }

    node.getChildByName("head").getChildByName("offline").zIndex = 99;

    var _offLineNode = node.getChildByName("head").getChildByName("offline");

    var _timeNode = _offLineNode.getChildByName("offLineTime");
    if(!_timeNode)
    {
        _timeNode = new ccui.Text();
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {//岳阳同一使用方正兰亭
            _timeNode.setFontName("fonts/lanting.TTF");
        }
        _timeNode.setName("offLineTime");
        _timeNode.setFontSize(26);
        _offLineNode.addChild(_timeNode)
    }
    _timeNode.setPosition(cc.p(_offLineNode.getContentSize().width/2,_offLineNode.getContentSize().height*posY));

    //cc.log("-----------------pl.offLineTime-------------------" + pl.offLineTime);
    if (pl.lastOffLineTime)
    {

        //var _currentTime = MjClient.data.sData.serverTime - MjClient.data.sData.serverNow;

        var _showTime = (MjClient.data.sData.serverTime - pl.lastOffLineTime);
        if(_showTime < 0)
        {
            node.getChildByName("head").getChildByName("offline").visible = false;
            _showTime = 0;
        }
        //cc.log("-----------------pl.offLineTime111-------------------" + MjClient.dateFormat(new Date(parseInt(pl.lastOffLineTime)),"yyyy-MM-dd hh:mm:ss"));
        //cc.log("-----------------_currentTime-------------------" + MjClient.dateFormat(new Date(parseInt(_currentTime)),"yyyy-MM-dd hh:mm:ss"));
        cc.log("-----------------_showTime------------------- =  " + _showTime);
        _timeNode.setString(MjClient.dateFormat(new Date(_showTime),"mm:ss"));

    }
    else
    {
        _timeNode.setString("");
    }
}


/**
 * 播放投砸道具动画
 * @param  {number} StartOff 使用道具的位置
 * @param  {number} EndOff 被使用道具的位置
 * @param  {number} kind 道具类型
 * @return {null} null
 */
function playChatAni(StartOff,EndOff,kind)
{
    if (!MjClient.playui)
        return;

    StartOff = getOffForPlayerNum(StartOff);
    EndOff = getOffForPlayerNum(EndOff);
    var getNode = function(off)
    {
        var _node = null;
        switch (off)
        {
            case 0:
                _node = MjClient.playui._downNode;
                cc.log("1----playChatAni");
                break;
            case 1:
                cc.log("2----playChatAni");
                _node = MjClient.playui._rightNode;
                break;
            case 2:
                cc.log("3----playChatAni");
                _node = MjClient.playui._topNode;
                break;
            case 3:
                cc.log("4----playChatAni");
                _node = MjClient.playui._leftNode;
                break;
            case 4:
                cc.log("5----playChatAni");
                _node = MjClient.playui._fifthNode;
                break;
            default:
                break;
        }
        if((MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU ||
            MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
            MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG ||
            MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710 ||
            MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE || 
            (MjClient.playui && MjClient.playui.isLeftTop && MjClient.playui.isLeftTop()))
            && MjClient.data.sData.tData.maxPlayer == 2){
            switch (off)
            {
                case 0:
                    _node = MjClient.playui._downNode;
                    cc.log("0 = playChatAni");
                    break;
                case 1:
                    cc.log("1 = playChatAni");
                    _node = MjClient.playui._topNode;
                    break;
                default:
                    break;
            }
        }
        if((MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO || MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z ) && MjClient.MaxPlayerNum_paohuzi == 4){
            switch (off)
            {
                case 0:
                    _node = MjClient.playui._downNode;
                    cc.log("1----if");
                    break;
                case 1:
                    cc.log("2----if");
                    _node = MjClient.playui._xingNode;
                    break;
                case 2:
                    cc.log("3----if");
                    _node = MjClient.playui._rightNode;
                    break;
                case 3:
                    cc.log("4----if");
                    _node = MjClient.playui._topNode;
                    break;
                default:
                    break;
            }
        }

        if((MjClient.gameType == MjClient.GAME_TYPE.ML_HONG_ZI || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI)
            && MjClient.data.sData.tData.maxPlayer == 2){
            switch (off)
            {
                case 0:
                    _node = MjClient.playui._downNode;
                    cc.log("1----if");
                    break;
                case 1:
                    cc.log("2----if");
                    _node = MjClient.playui._topNode;
                    break;
                default:
                    break;
            }
        }


        if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR){
            var tData = MjClient.data.sData.tData;
            // var selfIndex = tData.uids.indexOf(SelfUid());
            off = getOffByXing_paohuzi(off);
            switch (off)
            {
                case 0:
                    _node = MjClient.playui._downNode;
                    // if(selfIndex == tData.xingPlayer){
                    //     _node = MjClient.playui._xingNode;
                    // }
                    cc.log("1----PAO_HU_ZI_SR");
                    break;
                case 2:
                    cc.log("2----PAO_HU_ZI_SR");
                    _node = MjClient.playui._xingNode;
                    // if(selfIndex == 0){
                    //     _node = MjClient.playui._rightNode;
                    // }
                    // if(selfIndex == 3){
                    //     _node = MjClient.playui._rightNode;
                    // }
                    // if(selfIndex == tData.xingPlayer){
                    //     _node = MjClient.playui._topNode;
                    // }
                    break;
                case 1:
                    cc.log("3----PAO_HU_ZI_SR");
                    _node = MjClient.playui._rightNode;
                    // if(selfIndex == 0){
                    //     _node = MjClient.playui._xingNode;
                    // }
                    // if(selfIndex == 3){
                    //     _node = MjClient.playui._topNode;
                    // }
                    // if(selfIndex == tData.xingPlayer){
                    //     _node = MjClient.playui._downNode;
                    // }
                    break;
                case 3:
                    cc.log("4----PAO_HU_ZI_SR");
                    _node = MjClient.playui._topNode;
                    // if(selfIndex == 3){
                    //     _node = MjClient.playui._xingNode;
                    // }
                    // if(selfIndex == tData.xingPlayer){
                    //     _node = MjClient.playui._rightNode;
                    // }
                    break;
                default:
                    break;
            }
        }
        if((MjClient.gameType == MjClient.GAME_TYPE.ML_HONG_ZI || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI  )
            && MjClient.data.sData.tData.maxPlayer == 4){
            switch (off)
            {
                case 0:
                    _node = MjClient.playui._downNode;
                    cc.log("1----if");
                    break;
                case 1:
                    cc.log("2----if");
                    _node = MjClient.playui._xingNode;
                    break;
                case 2:
                    cc.log("3----if");
                    _node = MjClient.playui._rightNode;
                    break;
                case 3:
                    cc.log("4----if");
                    _node = MjClient.playui._topNode;
                    break;
                default:
                    break;
            }
        }

        if((MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU ||
            MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG ||
             MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
            MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER ||
            MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) && MjClient.data.sData.tData.maxPlayer == 4){
            switch (off)
            {
                case 0:
                    _node = MjClient.playui._downNode;
                    cc.log("1----if");
                    break;
                case 1:
                    cc.log("2----if");
                    _node = MjClient.playui._xingNode;
                    break;
                case 2:
                    cc.log("3----if");
                    _node = MjClient.playui._rightNode;
                    break;
                case 3:
                    cc.log("4----if");
                    _node = MjClient.playui._topNode;
                    break;
                default:
                    break;
            }
        }

        return _node;
    }

    var endPl = getUIPlayer(EndOff);
    if(!endPl) return;

    var sNode = getNode(StartOff);
    var eNode = getNode(EndOff);
    var StarNode = sNode.getChildByName("head") || sNode.getChildByName("layout_head");
    var EndNode  = eNode.getChildByName("head") || eNode.getChildByName("layout_head");

    var _AniNode = MjClient.playui._AniNode;
    if(kind >= 10000){
        playChatAniGuizu(_AniNode,StarNode,EndNode,kind);
        return;
    }

    var distance = cc.pDistance(StarNode.getPosition(), EndNode.getPosition());
    var costTime = distance/600;
    if (costTime > 1)
    {
        costTime = 1;
    }
    else  if (costTime < 0.5)
    {
        costTime = 0.5;
    }

    if (isJinZhongAPPType() ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
        costTime = 0.4;
    }


    var midX = (EndNode.getPositionX()-StarNode.getPositionX())/2+StarNode.getPositionX();
    if (Math.abs(EndNode.getPositionX()-StarNode.getPositionX())<10)
    {
        midX += distance/5;
    }
    var midY = Math.max(StarNode.getPositionY(), EndNode.getPositionY());
    if (Math.abs(EndNode.getPositionY()-StarNode.getPositionY())<10)
    {
        midY += distance/5;
    }
    var move = cc.bezierTo(costTime, [StarNode.getPosition(), cc.p(midX, midY), EndNode.getPosition()]);
    switch (kind)
    {
        case 2:
            move = cc.spawn(move,cc.rotateBy(costTime,360*2));
            break;
        case 6:
            move = cc.spawn(move,cc.rotateBy(costTime,360));
            break;
    }


    cc.spriteFrameCache.addSpriteFrames("playing/other/emj.plist","playing/other/emj.png");
    var firstFrame = null;
    var sound = "";
    var playSoundFunc = cc.callFunc(function(){playEffect(sound);});
    var moveSoundFunc = cc.callFunc(function(){playEffect("chatFlyEffect");});
    if (isJinZhongAPPType()) 
    {
        switch (kind)
        {
            case 0:
                sound = "ruyi";
                firstFrame = new cc.Sprite("playing/other/info_n_send_0.png");
                var AnimationFunc = cc.callFunc(function()
                {

                    var projNode = createSpine("spine/ruyi/ruyi.json", "spine/ruyi/ruyi.atlas");
                    projNode.setAnimation(0, 'animation', false);
                    projNode.setTimeScale(0.7);
                    projNode.setScale(0.7);
                    firstFrame.addChild(projNode);
                    projNode.setPosition(205,-150);
                    firstFrame.setOpacity(0);
                })
     
                firstFrame.runAction(cc.sequence(moveSoundFunc,move, playSoundFunc,AnimationFunc, cc.delayTime(2.5), cc.removeSelf()));

                break;
            case 1:
                sound = "gongxigacai";
                firstFrame = new cc.Sprite("playing/other/info_n_send_1.png");

                var AnimationFunc = cc.callFunc(function()
                {

                    var projNode = createSpine("spine/gongxigacai/gongxigacai.json", "spine/gongxigacai/gongxigacai.atlas");
                    projNode.setAnimation(0, 'animation', false);
                    projNode.setTimeScale(0.7);
                    projNode.setScale(0.7);
                    firstFrame.addChild(projNode);
                    projNode.setPosition(200,-150);
                    firstFrame.setOpacity(0);
                })
     
                firstFrame.runAction(cc.sequence(moveSoundFunc,move, playSoundFunc,AnimationFunc, cc.delayTime(2.5), cc.removeSelf()));

                break;
            case 2:
                sound = "xin";
                firstFrame = new cc.Sprite("playing/other/info_n_send_2.png");

                var AnimationFunc = cc.callFunc(function()
                {

                    var projNode = createSpine("spine/xin/xin.json", "spine/xin/xin.atlas");
                    projNode.setAnimation(0, 'animation', false);
                    projNode.setTimeScale(0.7);
                    projNode.setScale(0.7);
                    firstFrame.addChild(projNode);
                    projNode.setPosition(235,-150);
                    firstFrame.setOpacity(0);
                })
     
                firstFrame.runAction(cc.sequence(moveSoundFunc,move, playSoundFunc,AnimationFunc, cc.delayTime(2.5), cc.removeSelf()));
                break;
            case 3:
                sound = "xiyan";
                firstFrame = new cc.Sprite("playing/other/info_n_send_3.png");

                var AnimationFunc = cc.callFunc(function()
                {

                    var projNode = createSpine("spine/xiyan/xiyan.json", "spine/xiyan/xiyan.atlas");
                    projNode.setAnimation(0, 'xiyan', false);
                    projNode.setTimeScale(0.7);
                    projNode.setScale(0.7);
                    firstFrame.addChild(projNode);
                    projNode.setPosition(20,-20);
                    firstFrame.setOpacity(0);
                })
     
                firstFrame.runAction(cc.sequence(moveSoundFunc,move, playSoundFunc,AnimationFunc, cc.delayTime(4), cc.removeSelf()));

                break;
            case 4:
                sound = "ie_kiss";
                firstFrame = new cc.Sprite("#info_n_send_4_0.png");
                var frames = [];
                var prefix = "info_n_send_" + kind + "_";
                var fc = cc.spriteFrameCache;
                for (var i = 1; i < 15; i++) {
                    var name = prefix + i + ".png";
                    var f = fc.getSpriteFrame(name);
                    if(f)
                    {
                        frames.push(f);
                    }
                }
                var animate = cc.animate(new cc.Animation(frames, 0.12, 1));
                //firstFrame.setScale(0.88);
                firstFrame.runAction(cc.sequence(moveSoundFunc,move, cc.delayTime(0.1),playSoundFunc, animate,cc.removeSelf()));
                break;
            case 5:
                sound = "ie_egg";
                firstFrame = new cc.Sprite("playing/other/info_n_send_5_0.png");

                var AnimationFunc = cc.callFunc(function()
                {

                    var projNode = createSpine("spine/jidan/jidan.json", "spine/jidan/jidan.atlas");
                    projNode.setAnimation(0, 'jidan', false);
                    projNode.setTimeScale(0.7);
                    projNode.setScale(0.7);
                    firstFrame.addChild(projNode);
                    projNode.setPosition(20,20);
                    firstFrame.setOpacity(0);
                })
     
                firstFrame.runAction(cc.sequence(moveSoundFunc,move, playSoundFunc,AnimationFunc, cc.delayTime(2), cc.removeSelf()));
                break;
            case 6:
                sound = "ie_boom";
                firstFrame = new cc.Sprite("playing/other/info_n_send_6_0.png");

                var AnimationFunc = cc.callFunc(function()
                {

                    var projNode = createSpine("spine/baozha/baozha.json", "spine/baozha/baozha.atlas");
                    projNode.setAnimation(0, 'baozha', false);
                    projNode.setTimeScale(0.7);
                    projNode.setScale(0.7);
                    firstFrame.addChild(projNode);
                    projNode.setPosition(45,45);
                    firstFrame.setOpacity(0);
                })
     
                firstFrame.runAction(cc.sequence(moveSoundFunc,move, playSoundFunc,AnimationFunc, cc.delayTime(2), cc.removeSelf()));
                break;
            default:
                break;

        } 
    }
    else
    {
        switch (kind)
        {
            case 0:
                sound = "ie_flower";
                firstFrame = new cc.Sprite("playing/other/info_n_send_0.png");
                var frames = [];
                var prefix = "info_n_send_0_";
                var fc = cc.spriteFrameCache;
                for (var i = 1; i < 15; i++) {
                    var name = prefix + i + ".png";
                    var f = fc.getSpriteFrame(name);
                    if(f)
                    {
                        frames.push(f);
                    }
                }
                var animate = cc.animate(new cc.Animation(frames, 0.08, 1));
                firstFrame.runAction(cc.sequence(moveSoundFunc,move, playSoundFunc, animate,cc.removeSelf()));

                break;
            case 1:
                sound = "ie_diamond";
                firstFrame = new cc.Sprite("#info_n_send_1_0.png");
                var frames = [];
                var prefix = "info_n_send_" + kind + "_";
                var fc = cc.spriteFrameCache;
                for (var i = 1; i < 15; i++) {
                    var name = prefix + i + ".png";
                    var f = fc.getSpriteFrame(name);
                    if(f)
                    {
                        frames.push(f);
                    }
                }
                var animate = cc.animate(new cc.Animation(frames, 0.1, 1));
                //firstFrame.setScale(0.88);
                firstFrame.runAction(cc.sequence(moveSoundFunc,move, cc.delayTime(0.1),playSoundFunc, animate,cc.removeSelf()));

                break;
            case 2:
                sound = "ie_egg";
                firstFrame = new cc.Sprite("#info_n_send_2_0.png");
                var frames = [];
                var prefix = "info_n_send_2_";
                var fc = cc.spriteFrameCache;
                for (var i = 1; i < 10; i++) {
                    var name = prefix + i + ".png";
                    var f = fc.getSpriteFrame(name);
                    if(f)
                    {
                        frames.push(f);
                    }
                }
                var animate = cc.animate(new cc.Animation(frames, 0.08, 1));
                firstFrame.runAction(cc.sequence(moveSoundFunc,move, playSoundFunc, animate,cc.removeSelf()));

                break;
            case 3:
                sound = "ie_boom";
                firstFrame = new cc.Sprite("#info_n_send_3_0.png");
                var frames = [];
                var prefix = "info_n_send_" + kind + "_";
                var fc = cc.spriteFrameCache;
                for (var i = 1; i < 15; i++) {
                    var name = prefix + i + ".png";
                    var f = fc.getSpriteFrame(name);
                    if(f)
                    {
                        frames.push(f);
                    }
                }
                var animate = cc.animate(new cc.Animation(frames, 0.08, 1));
                //firstFrame.setScale(0.88);
                firstFrame.runAction(cc.sequence(moveSoundFunc,move, cc.delayTime(0.1),playSoundFunc, animate,cc.removeSelf()));

                break;
            case 4:
                sound = "ie_kiss";
                firstFrame = new cc.Sprite("#info_n_send_4_0.png");
                var frames = [];
                var prefix = "info_n_send_" + kind + "_";
                var fc = cc.spriteFrameCache;
                for (var i = 1; i < 15; i++) {
                    var name = prefix + i + ".png";
                    var f = fc.getSpriteFrame(name);
                    if(f)
                    {
                        frames.push(f);
                    }
                }
                var animate = cc.animate(new cc.Animation(frames, 0.12, 1));
                //firstFrame.setScale(0.88);
                firstFrame.runAction(cc.sequence(moveSoundFunc,move, cc.delayTime(0.1),playSoundFunc, animate,cc.removeSelf()));
                break;
            case 5:
                sound = "ie_cheer";
                firstFrame = new cc.Sprite("#info_n_send_5_0.png");
                var frames = [];
                var prefix = "info_n_send_" + kind + "_";
                var fc = cc.spriteFrameCache;
                for (var i = 1; i < 15; i++) {
                    var name = prefix + i + ".png";
                    var f = fc.getSpriteFrame(name);
                    if(f)
                    {
                        frames.push(f);
                    }
                }
                var animate = cc.animate(new cc.Animation(frames, 0.12, 1));
                //firstFrame.setScale(0.88);
                firstFrame.runAction(cc.sequence(moveSoundFunc,move, cc.delayTime(0.1),playSoundFunc, animate,cc.removeSelf()));
                break;
            case 6:
                sound = "ie_tomato";
                firstFrame = new cc.Sprite("#info_n_send_6_0.png");
                var frames = [];
                var prefix = "info_n_send_" + kind + "_";
                var fc = cc.spriteFrameCache;
                for (var i = 1; i < 15; i++) {
                    var name = prefix + i + ".png";
                    var f = fc.getSpriteFrame(name);
                    if(f)
                    {
                        frames.push(f);
                    }
                }
                var animate = cc.animate(new cc.Animation(frames, 0.08, 1));
                //firstFrame.setScale(0.88);
                firstFrame.runAction(cc.sequence(moveSoundFunc,move, playSoundFunc, animate,cc.removeSelf()));
                break;
            default:
                break;

        }   
    }
    
    firstFrame.setPosition(StarNode.getPosition());
    if(kind >= 10000){
        //贵族互动道具
        firstFrame.setScale(MjClient.size.width/1280);

    }else{
        firstFrame.setScale(MjClient.size.height/800);
    }

    _AniNode.addChild(firstFrame,10000);




}

/**
 * 播放投砸道具动画_贵州
 * @param  {number} StartOff 使用道具的位置
 * @param  {number} EndOff 被使用道具的位置
 * @param  {number} kind 道具类型
 * @return {null} null
 */
function playChatAni_guizhou(startOff,endOff,kind) {
    var startPlayerNode = getOffForPlayerNum(startOff);
    var endPlayerNode = getOffForPlayerNum(endOff);

    startPlayerNode = getNode(startPlayerNode);
    endPlayerNode = getNode(endPlayerNode);

    if (!MjClient.playui || !startPlayerNode || !endPlayerNode) {
        return;
    }

    //道具的运动轨迹
    var startHeadNode = startPlayerNode.getChildByName("head") || startPlayerNode.getChildByName("layout_head");
    var endHeadNode  = endPlayerNode.getChildByName("head") || endPlayerNode.getChildByName("layout_head");
    var distance = cc.pDistance(startHeadNode.getPosition(), endHeadNode.getPosition());
    var costTime = 0.4;
    var midX = (endHeadNode.getPositionX() - startHeadNode.getPositionX()) / 2 + startHeadNode.getPositionX();
    if (Math.abs(endHeadNode.getPositionX() - startHeadNode.getPositionX()) < 10) {
        midX += distance / 5;
    }
    var midY = Math.max(startHeadNode.getPositionY(), endHeadNode.getPositionY());
    if (Math.abs(endHeadNode.getPositionY() - startHeadNode.getPositionY()) < 10) {
        midY += distance / 5;
    }
    var bezierRound = cc.bezierTo(costTime, [startHeadNode.getPosition(), cc.p(midX, midY), endHeadNode.getPosition()]);
    if (kind == 2) {
        bezierRound = cc.spawn(bezierRound, cc.rotateBy(costTime,360*2));
    } else if (kind == 6) {
        bezierRound = cc.spawn(bezierRound, cc.rotateBy(costTime,360));
    }


    //道具声音和动画
    var delayTime = [0.8, 0, 0.1, 0, 0.1, 0.1, 0.1, 0];
    var sound = ["ie_chicken", "ie_flower", "ie_diamond", "ie_egg", "ie_boom", "ie_kiss", "ie_cheer", "ie_tomato"];
    var aniImg = ["prop_chicken", "info_n_send_0", "info_n_send_1", "info_n_send_2", "info_n_send_3", "info_n_send_4_0", "info_n_send_5_0", "info_n_send_6_0"];
    var animate = null;// this.setChatAnimate(kind);
    if(kind === 0)
    {
        var ani = createSpine("spine/chat/tiegongji/tiegongji.json", "spine/chat/tiegongji/tiegongji.atlas");
        ani.setAnimation(0, 'animation', false);
        ani.setScale(0.7);
        animate = ani;
    }
    // 其他的是帧动画
    else
    {
        var tmpkind = kind - 1;
        cc.spriteFrameCache.addSpriteFrames("playing/other/emj.plist","playing/other/emj.png");
        var fc = cc.spriteFrameCache;
        var frames = [];
        var frameTime = [0.08, 0.1, 0.08, 0.08, 0.12, 0.12, 0.08];
        var frameNum = [15, 15, 10, 15, 15, 15, 15];
        var prefix = "info_n_send_" + tmpkind + "_";

        for (var i = 1; i < frameNum[tmpkind]; i++) {
            var name = prefix + i + ".png";
            var f = fc.getSpriteFrame(name);
            if (f) {
                frames.push(f);
            }
        }

        animate = cc.animate(new cc.Animation(frames, frameTime[tmpkind], 1));
    }


    var moveSoundFunc = cc.callFunc(function(){
        playEffect("chatFlyEffect");
    });
    var playSoundFunc = cc.callFunc(function(){
        playEffect(sound[kind]);
    });

    //添加道具精灵并播放动画
    var aniSprite = new cc.Sprite("playing/other/" + aniImg[kind] + ".png");
    if(kind === 0) aniSprite.addChild(animate);
    aniSprite.setPosition(startHeadNode.getPosition());
    aniSprite.setScale(MjClient.size.height / 800);
    aniSprite.runAction(cc.sequence(moveSoundFunc, bezierRound, playSoundFunc, cc.delayTime(delayTime[kind]), animate, cc.removeSelf()));
    // MjClient.playui.jsBind.node_eat._node.addChild(aniSprite, 10000);
    var _AniNode = MjClient.playui._AniNode;
    _AniNode.addChild(aniSprite,10000);
}

//贵族互动道具
function playChatAniGuizu(aniNode,startHeadNode,endHeadNode,kind){
    var oriStartPos = startHeadNode.getPosition();
    var oriEndPos = endHeadNode.getPosition();
    var distance = cc.pDistance(oriStartPos, oriEndPos);
    var costTime = distance / 600;
    if (costTime > 1) {
        costTime = 1;
    } else if (costTime < 0.5) {
        costTime = 0.5;
    }
    var midX = (oriEndPos.x - oriStartPos.x) / 2 + oriStartPos.x;
    if (Math.abs(oriEndPos.x - oriStartPos.x) < 10) {
        midX += distance / 5;
    }
    var midY = Math.max(oriStartPos.y, oriEndPos.y);
    if (Math.abs(oriEndPos.y - oriStartPos.y) < 10) {
        midY += distance / 5;
    }
    var moveAction = cc.bezierTo(costTime, [oriStartPos, cc.p(midX, midY), oriEndPos]);
    var firstFrame = null;
    
    var moveSoundFunc = cc.callFunc(function() {
        playEffect("fight/chatFlyEffect");
    });

    var scale =  MjClient.size.width/1280;
    
    var hddjData = MjClient.GuizuHDDJConfig[kind+""];
    if(hddjData){
        if(kind == 10013){
            
            var angle = Math.atan2((oriEndPos.y - oriStartPos.y),(oriEndPos.x - oriStartPos.x))*180/Math.PI;
            var oriAngle = 25;
           
            var filePath = "userInfo_3.0/zhuangBan/tools/"+hddjData.name+"/"
            var projNode1 = createSpine(filePath+"jiqiang.json", filePath+"jiqiang.atlas");
            projNode1.setAnchorPoint(cc.p(0.5,0.5))
            projNode1.setPosition(oriStartPos.x,oriStartPos.y);
            projNode1.setRotation(oriAngle - angle);
            projNode1.scale = scale;
            
            projNode1.setAnimation(0, "jiqiang", false);
            projNode1.setCompleteListener(function(trackEntry) {
                //var animationName = trackEntry.animation ? trackEntry.animation.name : "";
                //var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
                this.visible = false;
                this.runAction(cc.removeSelf());
            }.bind(projNode1));
            aniNode.addChild(projNode1, 1000);

            var projNode2 = createSpine(filePath+"dandao.json", filePath+"dandao.atlas");
            projNode2.setAnchorPoint(cc.p(0.5,0.5))
            projNode2.setPosition((oriEndPos.x + oriStartPos.x)/2,(oriEndPos.y+oriStartPos.y)/2);
            projNode2.setRotation(oriAngle - angle);
            projNode2.scale = scale;
            
            projNode2.setAnimation(0, "dandao", true);
            projNode2.setCompleteListener(function(trackEntry) {
                //var animationName = trackEntry.animation ? trackEntry.animation.name : "";
                var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
                if(loopCount == 2){
                    this.visible = false;
                    this.runAction(cc.removeSelf());
                    if(projNode3){
                        projNode3.removeFromParent();
                    }
                }
            }.bind(projNode2));
            aniNode.addChild(projNode2, 1000);

            ccs.armatureDataManager.addArmatureFileInfo("userInfo_3.0/zhuangBan/tools/jiguanqiang/zizhongAnimation/NewAnimation0.png","userInfo_3.0/zhuangBan/tools/jiguanqiang/zizhongAnimation/NewAnimation0.plist","userInfo_3.0/zhuangBan/tools/jiguanqiang/zizhongAnimation/NewAnimation.ExportJson");

            var _armature = new ccs.Armature("NewAnimation");
            _armature.animation.play("Animation1", -1, 1); 
            var projNode3 = new cc.Node();
            projNode3.addChild(_armature)
            projNode3.setPosition(oriEndPos.x,oriEndPos.y);
            projNode3.scale = scale;
            projNode3.setRotation(oriAngle - angle);
            aniNode.addChild(projNode3, 1000);
           
        }else{
            firstFrame = new cc.Sprite("userInfo_3.0/zhuangBan/tools/HDDJ"+(kind-10000)+".png");
            var filePath = "userInfo_3.0/zhuangBan/tools/"+hddjData.name+"/"+hddjData.name;
            if(!jsb.fileUtils.isFileExist(filePath+".json")){
                cc.log("playChatAni filePath not exist",(filePath+".json"))
                return;
            }
            if(kind == 10019){
                // 口罩 这是图片 单独处理 不需要播放动画 
                firstFrame.runAction(cc.sequence(moveSoundFunc, moveAction,cc.delayTime(0.7),cc.callFunc(function(){
                    this.removeFromParent();
                    
                }.bind(firstFrame))));
            }else{
                firstFrame.runAction(cc.sequence(moveSoundFunc, moveAction,cc.callFunc(function(){
                    this.removeFromParent();
                    
                    var projNode = createSpine(filePath+".json", filePath+".atlas");
                    projNode.setAnimation(0, "animation", false);
                    projNode.scale = scale;
                    aniNode.addChild(projNode, 1000);
    
                    var projNodePos = cc.p(oriEndPos.x,oriEndPos.y);
                    projNodePos.y -= 35;
                    projNode.setCompleteListener(function(trackEntry) {
                        //var animationName = trackEntry.animation ? trackEntry.animation.name : "";
                        //var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
                        this.visible = false;
                        this.runAction(cc.removeSelf());
                    }.bind(projNode));
                    
                    projNode.setPosition(projNodePos);
                    
                }.bind(firstFrame))));
            }

            
  
        }
    }
    if(firstFrame){
        firstFrame.setPosition(oriStartPos);
        firstFrame.setScale(scale);
        aniNode.addChild(firstFrame,10000);
    }
}
//显示玩家信息
function showPlayerInfo(off, node)
{
    //var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer(off);
    if(pl)
    {
        if(isJinZhongAPPType() ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ)
        {
            return MjClient.showPlayerInfoPlaying(pl.info);
        }

        if (pl.info.uid == SelfUid())
        {
            MjClient.showPlayerInfo(pl.info, false, true);
        }
        else
        {
            MjClient.showPlayerInfoPlaying(pl.info);
        }
    }
}



//显示玩家庄的ui
function showUserZhuangLogo(node, off)
{
    var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer(off);
    node.zIndex = 99;
    if(tData && pl)
    {
        if(tData.uids[tData.zhuang] == pl.info.uid)
        {
            node.visible = true;
            var linkZhuang = node.getChildByName("linkZhuang");
            var path = "playing/gameTable/shuzi/shuzi_" + pl.linkZhuang + ".png";
            linkZhuang.loadTexture(path);
            linkZhuang.setVisible(pl.linkZhuang > 0);

            showFieldIdZhuangAni(node);
        }
        else
        {
            node.visible = false;
        }
    }
}

// 播放金币麻将场庄家的动画
function showFieldIdZhuangAni(zhuangNode)
{
    var tData = MjClient.data.sData.tData;
    if (!tData || !tData.fieldId || !zhuangNode || !MjClient.majiang || MjClient.zhuangAni == tData.tableid) {
        return;
    }
    zhuangNode.visible = false;
    // 记录播放过动画的房号，保证初始化或者退出重进都只加载一次动画
    MjClient.zhuangAni = tData.tableid;

    // 延时一秒确保头像移动已经结束
    zhuangNode.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function(){
        var fieldId = tData.fieldId; // 金币场标识
        zhuangNode.visible = true;
        var worldCenterPos = cc.p(MjClient.size.width/2, MjClient.size.height/2); // 世界坐标中心

        // 原始模型坐标，缩放比例
        var zhuangNodePos = zhuangNode.getPosition();
        var zhuangScale = zhuangNode.getScale();
        // 将 worldCenterPos 世界坐标，转换为相对于 zhuangNode 的父节点的模型坐标
        var localPos = zhuangNode.getParent().convertToNodeSpace(worldCenterPos);

        // 重置 zhuangNode 的位置
        zhuangNode.setPosition(localPos);
        zhuangNode.setScale(zhuangScale * 2);
        // 动画
        // var action1 = cc.spawn(cc.delayTime(1), cc.Blink(1, 3));
        var action1 = cc.delayTime(1);
        var action2 = cc.spawn(cc.moveTo(0.5, zhuangNodePos), cc.scaleTo(0.5, zhuangScale));
        zhuangNode.runAction(cc.sequence(action1, action2));
    })));

}

//显示房主  add by sking
function showFangzhuTagIcon(node,off)
{
    var pl = getUIPlayer(off);
    if(!pl) //位置上没人则删掉房主标签
    {
        if(node.getChildByName("fangTag"))
        {
            node.removeChildByName("fangTag");
        }
        return;
    }

    var tData = MjClient.data.sData.tData;
    if (tData.owner == pl.info.uid)
    {
        if(!node.getChildByName("fangTag"))
        {
            var sp ;
            /*   if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
             {
             sp = new cc.Sprite("playing/gameTable/fangzhu2.png");
             }
             else*/

            if((MjClient.getAppType()==MjClient.APP_TYPE.TXJINZHONGMJ || MjClient.getAppType()==MjClient.APP_TYPE.DQSHANXIMJ) && 
                MjClient.gameType != MjClient.GAME_TYPE.LV_LIANG_DA_QI && 
                MjClient.gameType != MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)
            {
                sp = new cc.Sprite("playing/gameTable/fangzhu3.png");
                sp.setScale(1.2);
            }
            else if(MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)
            {
                sp = new cc.Sprite("playing/daqi/new/fangzhu.png");
            }
            else if(MjClient.getAppType() === MjClient.APP_TYPE.QXNTQP)
            {
                sp = new cc.Sprite("playing/gameTable/fangzhu3.png");
            }
            else if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
            {
                sp = new cc.Sprite("playing/gameTable/fangzhu3.png");
            }
            else
            {
                sp = new cc.Sprite("playing/gameTable/fangzhu.png");
            }

            if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
            {
                sp.setPosition(40, node.getContentSize().height - 17);
            }
            else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
            {
                sp.setPosition(40, node.getContentSize().height - 17);
            }
            else if(MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)
            {
                sp.setPosition(node.getContentSize().width, 30);
            }
            else if(MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER)
            {
                sp.setPosition(node.getContentSize().width, 26);
            }
            else if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ){
                sp.setPosition(40, 17);
            }
            else if(isJinZhongAPPType())
            {
                sp.setPosition(node.getContentSize().width, 5);
            }
            else if(MjClient.getAppType()==MjClient.APP_TYPE.QXHAIANMJ)
            {
                sp.setPosition(node.getContentSize().width, 5);
            }
            else if(MjClient.getAppType()==MjClient.APP_TYPE.QXNTQP)
            {
                sp.setPosition(node.getContentSize().width, 5);
            }
            else
            {
                sp.setPosition(node.getContentSize().width - 7,17);
            }

            if (MjClient.gameType == MjClient.GAME_TYPE.XIN_SI_YANG){
                sp.setPosition(40, node.getContentSize().height - 17);
            }

            sp.setAnchorPoint(1,0);
            sp.setName("fangTag");
            node.addChild(sp, 100);
        }
    }
    else
    {
        if(node.getChildByName("fangTag"))
        {
            node.removeChildByName("fangTag");
        }
    }
}



//设置牌的渲染
function setCardSprite(node, cd, off)
{
    if(MjClient.playui.setCardSprite) return MjClient.playui.setCardSprite(node, cd, off);
    //东南西北中发白
    var imgNames = ["Bamboo_", "Character_", "Dot_", "Wind_east", "Wind_south", "Wind_west", "Wind_north", "Red", "Green", "White"];
    var offSets = [];
    var MJBgType = getCurrentMJBgType();

    var offHunSet = [];
    if (MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU) {
        offHunSet = [[64, 107], [52, 70], [68, 106], [74, 68], [61, 78], [61, 78], [22, 30]];
    }
    else {
        offHunSet = [[50 + 10, 90 + 17], [52, 70], [50 - 10, 84], [60 + 14, 68], [48 + 13, 62 + 16], [48 + 13, 62 + 16], [22, 30]];
    }

    if(isJinZhongAPPType())
    {
        var x0 = node.getSize().width * 0.5;
        var y0 = node.getSize().height * 0.42;
        var y1 = node.getSize().height * 0.63;
        offSets = [[x0, y1], [x0, y1], [x0, y1], [x0, y1], [x0, y0], [x0, 65], [x0, 25]];
    }
    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
        offSets = [[51, 92], [60, 70], [51, 92], [60, 70], [52, 68], [53, 65], [19, 25]];
    }
    else if ((MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ)&& MJBgType == 0)
        offSets = [[50, 90], [60, 70], [50, 90], [60, 70], [50, 66], [53, 65], [19, 25]];
    else if (MJBgType == 0)
        offSets = [[50, 90], [60, 70], [50, 90], [60, 70], [48, 62], [53, 65], [19, 25]];
    else
        offSets = [[52, 100], [60, 70], [52, 100], [60, 70], [50, 66], [53, 65], [19, 25]];

    if (!COMMON_UI3D.is3DUI() && (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )) {
        if (MJBgType == 0)
            offSets = [[50, 95], [60, 66], [50, 95], [60, 66], [52, 68], [53, 64], [19, 25]];
        else if (MJBgType == 1)
            offSets = [[52, 100], [65, 68], [52, 100], [65, 68], [52, 66], [53, 64], [19, 25]];
        else if (MJBgType == 2 && MjClient.gameType != MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU)
            offSets = [[52, 105], [55, 70], [52, 105], [70, 70], [50, 76], [53, 64], [19, 25]];
        else if (MJBgType == 3)
            offSets = [[52, 104], [65, 68], [52, 104], [65, 68], [50, 66], [53, 64], [19, 25]];
    }


    //麻将的底牌公用图，4张
    node.loadTexture(getNewMJBgFile("playing/MJ/Mj_up_" + off + ".png"));

    //调牌背和牌面的大小
    setMJDif(node,off);

    var imgNode = new ccui.ImageView();
    if(off == 4 || off == 5 || off == 6)
    {
        // img.scaleX = 0.7;
        // img.scaleY = 0.7;
    }
    else if (off == 2 && (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ))
    {

    }
    else if (off == 2 && MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ)
    {
        imgNode.setRotation(imgNode.getRotation() * 180);
    }
    else
    {
        imgNode.setRotation(-90 * (off));
        // img.scaleX = 0.35;
        // img.scaleY = 0.35;
    }

    imgNode.setPosition(offSets[off][0], offSets[off][1]);
    imgNode.setName("imgNode");

    node.removeAllChildren();
    node.addChild(imgNode,10);

    //add by sking
    //如果是混牌，即白搭,癞子
    if(MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG || MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
        MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG || MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG){
        var _zorder  = 11;
        var imgBaiDaNode = new ccui.ImageView();
        imgBaiDaNode.setName("imgBaiDa");
        imgBaiDaNode.setPosition(offHunSet[off][0], offHunSet[off][1]);
        if (off != 5 && off != 6)
            imgBaiDaNode.setRotation(-90 * (off));

        if (off == 6)
            imgBaiDaNode.setScale(0.38);

        //宁乡开王麻将显示纯王和正王
        if(MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG){
            if(arguments[3] == true || MjClient.data.sData.tData.showCard && cd === MjClient.data.sData.tData.showCard) {
                imgBaiDaNode.loadTexture("playing/MJ/kingWang.png");
            }else if(MjClient.majiang.isHunCard && MjClient.majiang.isHunCard(cd, MjClient.data.sData.tData.hunCard)){
                imgBaiDaNode.loadTexture("playing/MJ/pureKing.png");
            }
        }else{
            //安化麻将(四王)上面展示的王牌如果是四王玩法则显示翻
            if(arguments[3] == true && (MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW || MjClient.data.sData.tData.areaSelectMode.kingNum == 4)){
                imgBaiDaNode.loadTexture("playing/MJ/fan.png");
            }
            else if(arguments[3] == true && MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG){
                imgBaiDaNode.loadTexture("playing/MJ/dingWang.png");
                imgBaiDaNode.setPosition(offHunSet[off][0] + 7, offHunSet[off][1]);
            }

            if(MjClient.majiang.isHunCard && MjClient.majiang.isHunCard(cd, MjClient.data.sData.tData.hunCard)){
                imgBaiDaNode.loadTexture("playing/MJ/wangzi.png");
            }

            if(arguments[3] == true && MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG && MjClient.majiang.isHunCard ){

                if(MjClient.majiang.isHunCard(cd, MjClient.data.sData.tData.showCard) &&
                    MjClient.data.sData.tData.areaSelectMode.kingNum == 4){
                    imgBaiDaNode.loadTexture("playing/MJ/fan.png");
                    
                } 
            }

        }

        node.addChild(imgBaiDaNode,_zorder);

    }
    else if(MjClient.data.sData.tData.hunCard && MjClient.data.sData.tData.hunCard == cd)
    {
        var _zorder  = 11;
        var imgBaiDaNode = new ccui.ImageView();
        imgBaiDaNode.setName("imgBaiDa");
        imgBaiDaNode.setPosition(offHunSet[off][0], offHunSet[off][1]);

        if (off != 5 && off != 6)
            imgBaiDaNode.setRotation(-90 * (off));

        if (off == 6)
            imgBaiDaNode.setScale(0.38);

        if(MjClient.gameType == MjClient.GAME_TYPE.HA_HONGZHONG ||
            MjClient.gameType == MjClient.GAME_TYPE.XIN_PU_HZ ||
            MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG ||
            MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG ||
            MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU ||
            MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN ||
            MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN ||
            MjClient.gameType == MjClient.GAME_TYPE.NTHZ ||
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
            MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU ||
            MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
            MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN)
        {
            imgBaiDaNode.loadTexture("playing/MJ/gong.png");
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.SU_QIAN)
        {
            imgBaiDaNode.loadTexture("playing/MJ/gong1.png");
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI)
        {
            if (MjClient.data.sData.tData.areaSelectMode.wanfa != "duiwangdajiangbao")
            {
                imgBaiDaNode.loadTexture("playing/MJ/wangzi.png");
            }
        }else if(MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.JIANG_HUA_MJ ||MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ){
            imgBaiDaNode.loadTexture("playing/MJ/wangzi.png");
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN)
        {
            imgBaiDaNode.loadTexture("playing/MJ/jinzi.png");
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN)
        {
            imgBaiDaNode.loadTexture("playing/MJ/jinzi.png");
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN)
        {
            imgBaiDaNode.loadTexture("playing/MJ/gong.png");
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
        {
            imgBaiDaNode.loadTexture("playing/MJ/peizi.png");
            if (off == 5)
            {
                imgBaiDaNode.scaleX = node.width/imgBaiDaNode.width * 0.8;
                imgBaiDaNode.scaleY = node.height / imgBaiDaNode.height * 0.9;
                imgBaiDaNode.x = node.width/2;
                imgBaiDaNode.y = node.height/2;
            }
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.XU_ZHOU)
        {
            _zorder = 1;
            imgBaiDaNode.loadTexture("playing/MJ/peizi.png");
            var _off = [[-10, -12], [10,-6], [10, 11], [-10, 0], [-11, -10], [0, 0]];
            if(off == 1 || off == 3)
            {
                imgBaiDaNode.setScaleX(0.9);
            }

            imgBaiDaNode.setPosition(offHunSet[off][0] + _off[off][0], offHunSet[off][1] + _off[off][1]);

            if (off == 5 || off == 6)
            {
                imgBaiDaNode.scaleX = node.width/imgBaiDaNode.width * 0.8;
                imgBaiDaNode.scaleY = node.height / imgBaiDaNode.height * 0.9;
                imgBaiDaNode.x = node.width/2;
                imgBaiDaNode.y = node.height/2;
            }
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.SI_YANG_HH || MjClient.gameType == MjClient.GAME_TYPE.YAN_CHENG_HH)
        {
            imgBaiDaNode.loadTexture("playing/MJ/peizi.png");
        }
        cc.log("--------------off = " + off);

        node.addChild(imgBaiDaNode,_zorder);
    }
    else if(MjClient.data.sData.tData.chaoTianCard && MjClient.data.sData.tData.chaoTianCard == cd)
    {
        var _zorder  = 11;
        var imgBaiDaNode = new ccui.ImageView();
        imgBaiDaNode.setName("imgBaiDa");
        // var offChaoTianSet = [[25, 45], [107, 45], [25, 45], [23, 84], [23, 25], [48 + 13, 62 + 16], [22, 30]];
        // imgBaiDaNode.setPosition(offChaoTianSet[off][0], offChaoTianSet[off][1]);

        imgBaiDaNode.setPosition(offHunSet[off][0], offHunSet[off][1]);

        if (off != 5 && off != 6 && off != 2)
            imgBaiDaNode.setRotation(-90 * (off));
        if (off == 6)
            imgBaiDaNode.setScale(0.38);

        imgBaiDaNode.loadTexture("playing/MJ/chao.png");
        node.addChild(imgBaiDaNode,_zorder);

    }
    else if(node.isShowTing){
        console.log('node.isShowTing', node.isShowTing, offHunSet[off][0], offHunSet[off][1]);
        var imgTingNode = new ccui.ImageView();
        var _zorder  = 11;
        imgTingNode.setName("imgBaiDa");
        imgTingNode.setPosition(offHunSet[off][0], offHunSet[off][1]);
        imgTingNode.loadTexture("playing/MJ/tingzi.png");

        if (off != 5 && off != 6)
            imgTingNode.setRotation(-90 * (off));

        node.addChild(imgTingNode, _zorder);
    }
    //血流麻将
    if(node.getName() == "hucard" && MjClient.gameType === MjClient.GAME_TYPE.XUE_LIU){
        node.loadTexture(getNewMJBgFile("playing/MJ/Mj_up_4.png"));
    }
    //海安白搭麻将
    if (MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_BAI_DA)
    {
        if(MjClient.data.sData.tData.hunCard && MjClient.data.sData.tData.hunCard.length > 0)
        {
            if(MjClient.data.sData.tData.hunCard.indexOf(cd) >= 0)
            {
                node.setColor(cc.color(240, 230, 140));
            }
        }
    }

    //晋中扣点麻将
    if (MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_KD
        || MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN
        || MjClient.gameType == MjClient.GAME_TYPE.HE_JIN_KUN_JIN
        || MjClient.gameType == MjClient.GAME_TYPE.PING_YAO_KOU_DIAN
        || MjClient.gameType == MjClient.GAME_TYPE.JING_LE_KOU_DIAN
        || MjClient.gameType == MjClient.GAME_TYPE.WU_TAI_KOU_DIAN
        || MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_MA_JIANG
        || MjClient.gameType == MjClient.GAME_TYPE.ZHUO_HAO_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN
        || MjClient.gameType == MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN
        || MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI
        || MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN
        || MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN
    )
    {

        if((MjClient.data.sData.tData.hunCard && MjClient.data.sData.tData.hunCard != -1) ||
            (MjClient.data.sData.tData.hunCard2 && MjClient.data.sData.tData.hunCard2 != -1))
        {
            if(MjClient.data.sData.tData.hunCard == cd || MjClient.data.sData.tData.hunCard2 == cd)
            {
                node.setColor(cc.color(240, 230, 140));
                if (MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_KD
                    || MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI
                    || MjClient.gameType == MjClient.GAME_TYPE.PING_YAO_KOU_DIAN
                    || MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN
                    || MjClient.gameType == MjClient.GAME_TYPE.HE_JIN_KUN_JIN
                    || MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI
                    || MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_MA_JIANG
                    || MjClient.gameType == MjClient.GAME_TYPE.ZHUO_HAO_ZI)
                {
                    // 添加耗子图标
                    if(!node.getChildByName("haozi"))
                    {
                        cc.log("==============22222222222222=添加图片例子 =setSprite=== " + off);
                        var _haozi = new ccui.ImageView();
                        _haozi.loadTexture("playing/MJ/haozi.png");
                        _haozi.setName("haozi");
                        if (MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN || MjClient.gameType == MjClient.GAME_TYPE.HE_JIN_KUN_JIN)
                        {
                            _haozi.loadTexture("playing/MJ/jinzi_1.png");
                            _haozi.setName("jinzi");
                        }
                        _haozi.setPosition(node.getContentSize().width/2,node.getContentSize().height/2);
                        node.addChild(_haozi,20);

                        _haozi.setRotation(-90 * (off));
                        if (off == 0)
                        {
                            _haozi.setPosition(node.getContentSize().width/2 + 6,node.getContentSize().height/2 + 30);
                        }
                        else if(off == 2)
                        {
                            _haozi.setRotation(0);
                            _haozi.setPosition(node.getContentSize().width/2 + 6,node.getContentSize().height/2 + 30);
                        }
                        else if (off == 1 )
                        {
                            _haozi.setPosition(node.getContentSize().width/2  - 6,node.getContentSize().height/2 + 10);
                        }
                        else if ( off == 3)
                        {
                            _haozi.setPosition(node.getContentSize().width/2 + 3,node.getContentSize().height/2 + 18);
                        }
                    }
                }
            }else{
                node.setColor(cc.color(255, 255, 255));
            }
        }
    }


    if (MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_LI_SI)
    {
        if(node.isFour)
        {
            if(!node.getChildByName("lizi"))
            {
                var _lizi = new ccui.ImageView();
                _lizi.loadTexture("playing/MJ/lizi.png");
                _lizi.setName("lizi");
                _lizi.setPosition(offHunSet[off][0], offHunSet[off][1]);
                if (off != 5 && off != 6)
                    _lizi.setRotation(-90 * (off));

                if (off == 6)
                    _lizi.setScale(0.38);

                node.addChild(_lizi,20);
            }
        }
    }

    if (MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI &&
        MjClient.data.sData.tData.areaSelectMode.wanfa == "duiwangdajiangbao"
    )
    {
        var pl = getUIPlayer(0);
        if (pl.hunCard && pl.hunCard != -1)
        {
            if (pl.hunCard == cd)
            {
                if(!node.getChildByName("wangzi"))
                {
                    cc.log("===========setCardSprite====添加图片王牌 ==== ");
                    var _wangzi = new ccui.ImageView();
                    _wangzi.loadTexture("playing/MJ/wangzi.png");
                    _wangzi.setName("wangzi");
                    _wangzi.setPosition(offHunSet[off][0], offHunSet[off][1]);
                    //_wangzi.setPosition(node.getContentSize().width/2+10,node.getContentSize().height/2+30);
                    var myoff = off;
                    if (myoff == 2) {myoff = 0;}
                    _wangzi.setRotation(-90 * (myoff));

                    if (myoff == 1)
                    {
                        _wangzi.setPosition(node.getContentSize().width/2-13,node.getContentSize().height/2+13);
                    }
                    else if (off == 2)
                    {
                        _wangzi.setPosition(node.getContentSize().width/2+10,node.getContentSize().height/2+30);
                    }
                    else if (myoff == 3)
                    {
                        _wangzi.setPosition(node.getContentSize().width/2 +10 ,node.getContentSize().height/2+15);
                    }

                    node.addChild(_wangzi,20);
                }
            }
        }
    }


    // 贴在麻将上面可变的图
    var path = "playing/MJ/"
    var imgName = "";
    if(cd < 30)
    {
        //条，筒，万
        imgName = imgNames[Math.floor(cd / 10)] + cd % 10;
    }
    else if (cd <= 91)
    {	//东南西北中发白
        imgName = imgNames[Math.floor(cd / 10)];//东南西北中发白
    }
    else if (cd <= 181){
        imgName = "flower_" + cd;
    }

    if (cc.sys.isObjectValid(node) && cd != null && typeof(cd) != "undefined") {
        node.tag = cd;
    }

    /*
     徐州麻将，白板是用来替换，配子（癞子）的那张牌的
     */
    if(MjClient.gameType == MjClient.GAME_TYPE.XU_ZHOU)
    {
        if(cd == 91)//白板
        {
            if(MjClient.data.sData.tData.hunCard && MjClient.data.sData.tData.hunCard != 91)
            {
                //node.tag = MjClient.data.sData.tData.hunCard;//白板id 变成配置的id
                node.setUserData(MjClient.data.sData.tData.hunCard);//本身是白板
            }
        }
    }


    //加载小图
    imgNode.loadTexture(getNewMJBgFile(path + imgName + ".png"));
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
        imgNode.setScale(1.2);

    if ((MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
        || MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG
        || MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG
        || MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO 
        || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ) && off == 5)
    {
        imgNode.setPosition(imgNode.getPositionX()*0.85,imgNode.getPositionY()*0.85);
        if (MjClient.rePlayVideo != -1)
        {
            imgNode.setScale(0.9);
            imgNode.setPosition(imgNode.getPositionX()*0.9,imgNode.getPositionY()*0.85);
        }
        else
        {
            imgNode.setScale(1);
        }
    }

    if(node.getName() == "hucard" && MjClient.gameType === MjClient.GAME_TYPE.XUE_LIU){
        imgNode.setPosition(imgNode.x,imgNode.getPositionY()*0.7);
    }
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ)
        imgNode.setScale(imgNode.getScale()*0.85);


    if (getCurrentMJBgType() != 0) {
        // 左右两侧的牌偏大，特殊处理，缩小
        if (off == 1 || off == 3) {
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
                imgNode.setScale(1.0);
            else
                imgNode.setScale(0.8);
        }

    }
    else {
        // 左右两侧的牌偏大，特殊处理，缩小
        if (off == 1 || off == 3) {
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
                imgNode.setScale(0.95);
        }
    }

    if (off == 6)
    {
        imgNode.setScale(0.45);
        if((MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) && COMMON_UI3D.is3DUI())
        {
            imgNode.setScale(0.35);
        }
    }



    schedulePlayMoveCardOtherSameCardGrey(node);

    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
        isJinZhongAPPType() || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
        node.off = off;
        setMJDif(node,off);
    }



    //山西百搭命名的种类，根据麻将种类调整位置
    if(isJinZhongAPPType())
    {
        var baidaNameArray = ["haozi","lizi","imgBaiDa","wangzi"];
        var childs = node.children;
        var pos = {};
        pos = [{x:0.6, y:0.68}, {x:0.45, y:0.60}, {x:0.6, y:0.68}, {x:0.55, y:0.60}, {x:0.56, y:0.49}]; // {x:0.5, y:0.43}
        for(var i = 0; i < childs.length; i++)
        {
            if(baidaNameArray.indexOf(childs[i].getName()) >= 0)
            {
                childs[i].ignoreContentAdaptWithSize(true);
                childs[i].setPositionPercent(pos[off]);
            }
        }
    }
}



function schedulePlayMoveCardOtherSameCardGrey(card)
{
    if (card.name == "chi" || card.name == "peng" || card.name == "out" || card.name == "outout")
    {
        card.schedulePlayMoveCardOtherSameCardGreyFunction = function () {
            if (
                (!MjClient.movingCard && card.moveTag) ||
                (MjClient.movingCard && cc.sys.isObjectValid(MjClient.movingCard) && cc.sys.isObjectValid(card) && MjClient.movingCard.tag != card.tag && card.moveTag && !cc.colorEqual(card.getColor(), cc.color(255, 255, 255)))
            ){
                card.setColor(cc.color(255, 255, 255));
                card.moveTag = false;
                if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU)
                {
                    var lightforcard = card.getChildByName("light_h");
                    if (cc.sys.isObjectValid(lightforcard))
                    {
                        lightforcard.removeFromParent();
                    }
                }
            }
            else if (MjClient.movingCard &&
                cc.sys.isObjectValid(MjClient.movingCard) &&
                cc.sys.isObjectValid(card) &&
                MjClient.movingCard.tag == card.tag &&
                !card.moveTag &&
                cc.colorEqual(card.getColor(), cc.color(255, 255, 255))
            ){
                card.moveTag = true;
                if(isJinZhongAPPType()) //晋中选中的牌变黄
                {
                    card.setColor(cc.color(240, 230, 140));
                }
                else if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU)
                {
                    card.setColor(cc.color(170, 170, 170));
                    var lightforcard = card.getChildByName("light_h");
                    if (!cc.sys.isObjectValid(lightforcard))
                    {
                        var card_light = ccui.ImageView();
                        card_light.loadTexture("playing/MJ/light_h.png");
                        var xscale = card_light.getContentSize().width/card.getContentSize().width;
                        var yscale = card_light.getContentSize().height/card.getContentSize().height;
                        if (card_light.getContentSize().width > card.getContentSize().width)
                        {
                            xscale = card.getContentSize().width/card_light.getContentSize().width;
                            yscale = card.getContentSize().height/card_light.getContentSize().height;
                        }

                        card_light.setScaleX(xscale);
                        card_light.setScaleY(yscale);
                        card_light.setName("light_h");
                        card_light.setPosition(card.getContentSize().width/2,card.getContentSize().height/2);
                        card.addChild(card_light);
                    }
                }
                else
                {
                    card.setColor(cc.color(170, 170, 170));
                }

            }


            if(isJinZhongAPPType())//晋中提起的牌也要提示
            {
                if (MjClient.selectedCard
                    && cc.sys.isObjectValid(MjClient.selectedCard)
                    && cc.sys.isObjectValid(card)
                    && MjClient.selectedCard.tag == card.tag
                    && !card.moveTag
                    && cc.colorEqual(card.getColor(), cc.color(255, 255, 255)))
                {
                    card.moveTag = true;
                    card.setColor(cc.color(240, 230, 140));
                }
            }

            // if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )//岳阳提起的牌也要提示
            // {
            //     if (MjClient.selectedCard
            //         && cc.sys.isObjectValid(MjClient.selectedCard)
            //         && cc.sys.isObjectValid(card)
            //         && MjClient.selectedCard.tag == card.tag
            //         && !card.moveTag
            //         && cc.colorEqual(card.getColor(), cc.color(255, 255, 255)))
            //     {
            //         card.moveTag = true;
            //         card.setColor(cc.color(170, 170, 170));
            //         if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU)
            //         {
            //             var lightforcard = card.getChildByName("light_h");
            //             if (!cc.sys.isObjectValid(lightforcard))
            //             {
            //                 var card_light = ccui.ImageView();
            //                 card_light.loadTexture("playing/MJ/light_h.png");
            //                 var xscale = card_light.getContentSize().width/card.getContentSize().width;
            //                 var yscale = card_light.getContentSize().height/card.getContentSize().height;
            //                 if (card_light.getContentSize().width > card.getContentSize().width)
            //                 {
            //                     xscale = card.getContentSize().width/card_light.getContentSize().width;
            //                     yscale = card.getContentSize().height/card_light.getContentSize().height;
            //                 }
            //
            //                 card_light.setScaleX(xscale);
            //                 card_light.setScaleY(yscale);
            //                 card_light.setName("light_h");
            //                 card_light.setPosition(card.getContentSize().width/2,card.getContentSize().height/2);
            //                 card.addChild(card_light);
            //             }
            //         }
            //     }
            // }

        };
        card.schedule(card.schedulePlayMoveCardOtherSameCardGreyFunction);
    }
};



function unschedulePlayMoveCardOtherSameCardGrey(card)
{
    if (card &&  card.schedulePlayMoveCardOtherSameCardGreyFunction)
    {
        card.unschedule(card.schedulePlayMoveCardOtherSameCardGreyFunction);
        delete card.schedulePlayMoveCardOtherSameCardGreyFunction;
    }
}


// 显示吃的牌
function ShowChiCards(node, off, card1, card2, card3)
{
    var tData = MjClient.data.sData.tData;

    if(MjClient.gameType == MjClient.GAME_TYPE.XU_ZHOU){
        var card = tData.lastPutCard;
        var path = "playing/MJ/White.png";
        var imgNames = ["Bamboo_", "Character_", "Dot_", "Wind_east", "Wind_south", "Wind_west", "Wind_north", "Red", "Green", "White"];
        if(off == 0){
            if(card == 91){
                card = tData.hunCard;
                card1.getChildByName("imgNode").loadTexture(path);
                card1.removeChildByName("imgBaiDa");
                var path2 = "playing/MJ/" + imgNames[Math.floor((card+1) / 10)] + (card+1) % 10 + ".png";
                card2.getChildByName("imgNode").loadTexture(path2);
                card2.removeChildByName("imgBaiDa");
                var path3 = "playing/MJ/" + imgNames[Math.floor((card+2) / 10)] + (card+2) % 10 + ".png";
                card3.getChildByName("imgNode").loadTexture(path3);
                card3.removeChildByName("imgBaiDa");
            }else{
                if((card + 1) == tData.hunCard){
                    card2.getChildByName("imgNode").loadTexture(path);
                    card2.removeChildByName("imgBaiDa");
                }
                if((card + 2) == tData.hunCard){
                    card3.getChildByName("imgNode").loadTexture(path);
                    card3.removeChildByName("imgBaiDa");
                }
            }
        }
        if(off == 1){
            if(card == 91){
                card = tData.hunCard;
                card2.getChildByName("imgNode").loadTexture(path);
                card2.removeChildByName("imgBaiDa");
                var path2 = "playing/MJ/" + imgNames[Math.floor((card - 1) / 10)] + (card - 1) % 10 + ".png";
                card1.getChildByName("imgNode").loadTexture(path2);
                card1.removeChildByName("imgBaiDa");
                var path3 = "playing/MJ/" + imgNames[Math.floor((card + 1) / 10)] + (card + 1) % 10 + ".png";
                card3.getChildByName("imgNode").loadTexture(path3);
                card3.removeChildByName("imgBaiDa");
            }else{
                if((card - 1) == tData.hunCard){
                    card1.getChildByName("imgNode").loadTexture(path);
                    card1.removeChildByName("imgBaiDa");
                }
                if((card + 1) == tData.hunCard){
                    card3.getChildByName("imgNode").loadTexture(path);
                    card3.removeChildByName("imgBaiDa");
                }
            }
        }
        if(off == 2){
            if(card == 91){
                card = tData.hunCard;
                card3.getChildByName("imgNode").loadTexture(path);
                card3.removeChildByName("imgBaiDa");
                var path2 = "playing/MJ/" + imgNames[Math.floor((card - 2) / 10)] + (card - 2) % 10 + ".png";
                card1.getChildByName("imgNode").loadTexture(path2);
                card1.removeChildByName("imgBaiDa");
                var path3 = "playing/MJ/" + imgNames[Math.floor((card - 1) / 10)] + (card - 1) % 10 + ".png";
                card2.getChildByName("imgNode").loadTexture(path3);
                card2.removeChildByName("imgBaiDa");
            }else{
                if((card - 2) == tData.hunCard){
                    card1.getChildByName("imgNode").loadTexture(path);
                    card1.removeChildByName("imgBaiDa");
                }
                if((card - 1) == tData.hunCard){
                    card2.getChildByName("imgNode").loadTexture(path);
                    card2.removeChildByName("imgBaiDa");
                }
            }
        }
    }
}



//自己的uid
function SelfUid()
{
    if (MjClient.devLogUid) {
        return Number(MjClient.devLogUid);
    }
    if (MjClient.otherReplayUid) {
        return MjClient.otherReplayUid;
    }
    return MjClient.data.pinfo.uid
}



//是否是自己打牌
function IsTurnToMe()
{
    var tData = MjClient.data.sData.tData;
    return SelfUid() == tData.uids[tData.curPlayer];
}



//打印log
function GLog(log)
{
    cc.log(log);
}




//设置风向
function setDirVisible(node, isVisible)
{
    var child = ["dir_down", "dir_right", "dir_up", "dir_left"];
    var path = "playing/gameTable/";
    for(var i = 0; i < child.length; i++)
    {
        var dir = node.getChildByName(child[i]);
        if(dir)
        {
            dir.setVisible(isVisible);
            dir.loadTexture(isVisible ? (path + "dir_press_" +i + ".png") : (path + "dir_normal_" + i + ".png"));
        }
    }
}



//吃碰杠胡状态
//TODO,sk
//该函数有问题，明显的使用渲染来控制的数据，不应该用节点的显示来操作数据状态
function EatFlag()
{
    var eat = MjClient.playui.jsBind.eat;
    var eatFlag = 0;

    if(eat.gang0._node.visible)
    {
        eatFlag = eatFlag + 4;
    }

    if(eat.long && eat.long._node.visible)
    {
        eatFlag = eatFlag + 4;
    }

    if(eat.hu._node.visible)
    {
        eatFlag = eatFlag + 8;
    }

    if(eat.chi0 &&　eat.chi0._node.visible)
    {
        eatFlag = eatFlag + 1;
    }

    if(eat.peng._node.visible)
    {
        eatFlag = eatFlag + 2;
    }

    mylog("eatFlag-------------" + eatFlag)
    return eatFlag;
}



//p0.isTing去掉 ,sk
//这里应该是在netcbalck里设置是否听的状态，不能用渲染来控制
function GetReadyVisible(node, off)
{
    if(MjClient.playui.GetReadyVisible) return MjClient.playui.GetReadyVisible(node, off);

    if(off < 0 || MjClient.isInGoldFieldQuick())//金币场快速场不需要显示准备
    {
        node.visible = false;
        return false;
    }

    var pl = getUIPlayer(off);
    var tData = MjClient.data.sData.tData;

    var isCanShow = true;
    if(tData.tState == TableState.waitReady) {
        var isFull =  Object.keys(MjClient.data.sData.players).length == tData.maxPlayer;
        if(!isFull) isCanShow = false;
    }

    if(pl && pl.mjState == TableState.isReady && tData.tState != TableState.waitJoin && isCanShow)
    {
        //已经准备好了，并且状态不是等待，ready 设置可见
        node.visible = true;
        //p0.isTing = false;
    }
    else
    {
        node.visible = false;
    }

    return node.visible;
}



//初始化玩家金币和名字
function InitUserCoinAndName(node, off)
{
    var pl = getUIPlayer(off);
    if(!pl)
    {
        return;
    }


    var tData = MjClient.data.sData.tData;


    //金币场添加金币，金币图标 start
    var showJinBi = MjClient.isInGoldField();
    var jinbiIcon = node.getChildByName("head").getChildByName("jinbiIcon");
    var jinbi = node.getChildByName("head").getChildByName("jinbi");
    if(showJinBi){
        if (!jinbiIcon){
            if(MjClient.getGoldFiledType() == 1){
                jinbiIcon = ccui.ImageView("goldCommon/icon_jinbi.png");
            }else{
                jinbiIcon = ccui.ImageView("playing/gameTable/jinbi.png");
            }
            jinbiIcon.setAnchorPoint(0.5,0.5);
            var coin = node.getChildByName("head").getChildByName("coin");
            jinbiIcon.setPosition(coin.getPositionX()-46, coin.getPositionY());
            jinbiIcon.setName("jinbiIcon");
            node.getChildByName("head").addChild(jinbiIcon);
        }
        if (!jinbi){
            jinbi = new ccui.Text();
            /*if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {//岳阳同一使用方正兰亭
             jinbi.setFontName("fonts/lanting.TTF");
             }*/
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || isJinZhongAPPType()){
                jinbi.setFontSize(28);
                jinbi.setTextColor(cc.color("#FFA500"));
            }else{
                jinbi.setFontSize(20);
            }

            jinbi.setAnchorPoint(0.5,0.5);
            var coin = node.getChildByName("head").getChildByName("coin");
            jinbi.setPosition(coin.getPositionX()+9, coin.getPositionY());
            jinbi.setName("jinbi");
            node.getChildByName("head").addChild(jinbi);
        }
        jinbi.ignoreContentAdaptWithSize(true);
        if (tData.fieldFee){
            if(tData.roundNum <= 0){//结算后台费已经扣了不用再减去台费
                jinbi.setString(MjClient.simplifyGoldNumStr(Number(pl.info.gold)));
            }else{
                jinbi.setString(MjClient.simplifyGoldNumStr(Number(pl.info.gold-tData.fieldFee)));
            }
        }else{
            jinbi.setString(MjClient.simplifyGoldNumStr(pl.info.gold));
        }
        jinbiIcon.setPositionX(jinbi.getPositionX()-jinbi.width/2-jinbiIcon.width/2-10);
    }else{
        if (jinbiIcon){
            node.getChildByName("head").removeChildByName("jinbiIcon")
        }
        if (jinbi){
            node.getChildByName("head").removeChildByName("jinbi")
        }
    }//金币场添加金币，金币图标 end


    var bind =
        {
            head:
                {
                    name:
                        {
                            _run: function() {
                                this.setFontName("Arial");
                                this.setFontSize(this.getFontSize());
                            },
                            _text: function()
                            {
                                var _nameStr = unescape(pl.info.nickname );
                                if(MjClient.getAppType() === MjClient.APP_TYPE.QXHAIANMJ)
                                {
                                    return getPlayerName(_nameStr);
                                }
                                if(MjClient.gameType === MjClient.GAME_TYPE.LV_LIANG_DA_QI || 
                                    MjClient.gameType === MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER || 
                                    MjClient.gameType === MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)
                                {
                                    return getPlayerName(_nameStr);
                                }
                                return getNewName(_nameStr,5);
                            }
                        },
                    coin:
                        {
                            _visible:function(){
                                if(showJinBi){
                                    return false
                                }
                                
                                if (node.getName() == "down" && MjClient.gameType === MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)
                                    return tData.tState == TableState.waitJoin || tData.tState == TableState.roundFinish || tData.tState == TableState.waitReady;

                                return true;
                            },
                            _run: function()
                            {
                                //sk,todo,这里有问题，服务器的pl.winall没有赋值，这里加了有个毛用？
                                var coin = tData.initCoin;
                                //this.setString("" + coin);

                                changeAtalsForLabel(this, coin + pl.winall);
                            }
                        }
                }
        }

    //add by sking
    var name = node.getChildByName("head").getChildByName("name");
    name.ignoreContentAdaptWithSize(true);
    BindUiAndLogic(node, bind);
}


//初始化花的信息
function initFlower(isNormalVisible, isZfbVisible)
{
    for(var i = 0; i < 4; i++)
    {
        var _node = getNode(i);
        if(_node)
        {
            var parent0 = _node.getChildByName("head").getChildByName("flower_layout");
            if(parent0)
            {
                parent0.setVisible(isNormalVisible);
            }
            var parent1 = _node.getChildByName("head").getChildByName("flower_zfb_layout");
            if(parent1)
            {
                parent1.setVisible(isZfbVisible);
            }
        }
    }
}

/*
 准备阶段的头像位置
 */
function InitHeadPostionReady(node) {

    var sc = 0.13;
    if(isIPad()) sc = 0.1;
    var tData = MjClient.data.sData.tData;
    var down = node.getChildByName("down").getChildByName("head");
    var top = node.getChildByName("top").getChildByName("head");
    var left = node.getChildByName("left").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");

    setWgtLayout(down, [sc, sc], [0.5, 0.5], [0, -2.2], false, false);
    setWgtLayout(top, [sc, sc], [0.5, 0.5], [0, 2.6], false, false);
    setWgtLayout(left, [sc, sc], [0.5, 0.5], [-3.5, 0.1], false, false);
    setWgtLayout(right, [sc, sc], [0.5, 0.5], [3.5, 0.1], false, false);

    if (MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
        setWgtLayout(down, [sc, sc], [0.5, 0.5], [2.5, -1.2], false, false);
        setWgtLayout(top, [sc, sc], [0.5, 0.5], [-2.5, 1.6], false, false);
        setWgtLayout(left, [sc, sc], [0.5, 0.5], [-2.5, -1.2], false, false);
        setWgtLayout(right, [sc, sc], [0.5, 0.5], [2.5, 1.6], false, false);
    }
    else if (MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ) {
        // 江苏麻将牌桌UI优化
        setWgtLayout(down, [sc, sc], [0.5, 0.5], [0, -1.3], false, false);
        setWgtLayout(top, [sc, sc], [0.5, 0.5], [0, 2.6], false, false);
        setWgtLayout(left, [sc, sc], [0.5, 0.5], [-3.5, 0.6], false, false);
        setWgtLayout(right, [sc, sc], [0.5, 0.5], [3.5, 0.6], false, false);
    }

    //奇葩的海安各种麻将，庄家一直对着东边，所以特殊处理咯~
    if(MjClient.getAppType() === MjClient.APP_TYPE.QXHAIANMJ && tData) {
        down.visible = true;
        right.visible = true;
        top.visible = true;
        left.visible = true;
        var num = tData.maxPlayer;
        var dir = tData.uids.indexOf(SelfUid());
        if(num === 3) {
            switch(dir) {
                case 0:
                    left.visible = false;
                    break;
                case 1:
                    top.visible = false;
                    break;
                case 2:
                    right.visible = false;
                    break;
                default:
                    break;
            }
        }
    }
}

//开始游戏后的头像位置
function InitHeadPostionPlaying(node) {
    if(COMMON_UI3D.is3DUI()) return COMMON_UI3D.InitHeadPostionPlaying();
    if(!node) node = getNode(0).getParent();
    var down = node.getChildByName("down").getChildByName("head");
    var top = node.getChildByName("top").getChildByName("head");
    var left = node.getChildByName("left").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");
    var topTingCard = top.getChildByName("tingCard");
    var topTingIcon = top.getChildByName("tingIcon");
    down.visible = true;


    var _sc = 0.13;
    if(isIPad()) _sc = 0.1;

    if (isCanChangePlayerNum() && MjClient.MaxPlayerNum === 2)
    {
        setWgtLayout(top, [_sc, _sc], [0, 1], [3.1, -0.65], false, false);
        if(isIPad())
        {
            setWgtLayout(top, [_sc, _sc], [0, 1], [2.05, -0.65], false, false);
        }
    }
    else
    {
        setWgtLayout(top, [_sc, _sc], [0.25, 1], [0, -0.65], false, false);
        if(isIPad())
        {
            setWgtLayout(top, [_sc, _sc], [0.205, 1], [0, -0.65], false, false);
        }
    }

    setWgtLayout(down, [_sc, _sc], [0, 0], [0.6, 2.8], false, false);
    setWgtLayout(right, [_sc, _sc], [1, 0.5], [-0.6, 1.7], false, false);
    setWgtLayout(left, [_sc, _sc], [0, 0.49], [0.6, 1.7], false, false);
    setWgtLayout(topTingCard, [0.6, 0.6], [1.30, 0.75], [0, 0], false, true);
    setWgtLayout(topTingIcon, [0.6, 0.6], [1.35, 0.25], [0, 0], false, true);

    if(isIPad()) setWgtLayout(top, [_sc, _sc], [0.03, 0.97], [2.2, -0.65], false, false);


    if(isIPhoneX())
    {
        node.getChildByName("left").x = cc.winSize.width*0.09;
        left.y =  cc.winSize.height*0.75;
        left.x = 0;
        left.setScale(down.getScale());

        setWgtLayout(down,[_sc, _sc], [0.05, 0], [0.6, 2.8], false, false);
        setWgtLayout(left, [_sc, _sc], [0, 0.49], [-0.1, 1.7], false, false);
    }

}



//播放头像移动
function tableStartHeadMoveAction(node)
{
    //回放的时候不用移动头像，直接固定头像
    if (MjClient.rePlayVideo != -1) {
        InitHeadPostionPlaying(node);
        return;
    }
    cc.log("-----------------set head position ------");
    var down = node.getChildByName("down").getChildByName("head");
    var top = node.getChildByName("top").getChildByName("head");
    var left = node.getChildByName("left").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");
    down.visible = true;
    top.visible = true;
    left.visible = true;
    right.visible = true;
    InitHeadPostionPlaying(node);

    var downPoint = cc.p(down.x, down.y);
    var topPoint = cc.p(top.x, top.y);
    var rightPoint = cc.p(right.x, right.y);
    var leftPoint = cc.p(left.x, left.y);
    InitHeadPostionReady(node);

    down.runAction(cc.moveTo(0.3, downPoint).easing(cc.easeCubicActionOut()));
    top.runAction(cc.moveTo(0.3, topPoint).easing(cc.easeCubicActionOut()));
    left.runAction(cc.moveTo(0.3, leftPoint).easing(cc.easeCubicActionOut()));
    right.runAction(cc.moveTo(0.3, rightPoint).easing(cc.easeCubicActionOut()));
    var voice_btn = node.getChildByName("voice_btn");
    var chat_btn = node.getChildByName("chat_btn");
    var roundInfo = node.getChildByName("roundInfo");
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ) {
        setWgtLayout(voice_btn, [0.09, 0.09],[0.95, 0.2],[0, 3.3], false, false);
        setWgtLayout(chat_btn, [0.09, 0.09],[0.95, 0.1],[0, 3.0], false, false);
        setWgtLayout(roundInfo, [0.47, 0],[0.5, 0.38],[0, 0.5], false, false);
    }
    sendGPS();
    MjClient.checkChangeLocationApp();
}

//向服务器发送GPS数据
function sendGPS(){
    //高德地图
    var uids = MjClient.data.sData.tData.uids;
    var selfIndex = parseInt(uids.indexOf(SelfUid())); //自己的位置

    var msg = "";
    var latitude = MjClient.native.GetLatitudePos(); //纬度
    var longitude = MjClient.native.GetLongitudePos(); //经度
    var address = MjClient.native.GetAddress(); //地址
    if (latitude == null || latitude == 0 || latitude == "") {
        latitude = 0;
    }
    if (longitude == null || longitude == 0 || longitude == "") {
        longitude = 0;
    }
    msg = latitude + ";" + longitude + ";" + selfIndex + ";" + SelfUid() + ";" + address;
    cc.log("sendGPS: msg = " + msg);
    SendChat(SelfUid(), 4, msg, 0);
}

function SendChat(uid,type,msg,num){ //广播消息
    // MjClient.showMsg("uid="+uid+"  type="+type+"   msg="+msg+"  num="+num);
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    MjClient.gamenet.request("pkroom.handler.tableMsg",{cmd:"MJChat",uid:uid ,type:type,msg:msg ,num:num  });
}

//重置4家头像位置
function reConectHeadLayout(node)
{
    cc.log('重置4家头像位置');
    var tData = MjClient.data.sData.tData;
    var voice_btn = node.getChildByName("voice_btn");
    var chat_btn = node.getChildByName("chat_btn");
    var roundInfo = node.getChildByName("roundInfo");
    resetEatActionAnim();

    if(tData.tState == TableState.waitJoin || tData.tState == TableState.waitReady || tData.tState == TableState.roundFinish)
    {
        InitHeadPostionReady(node);
        initFlower(false, false);
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ) {
            setWgtLayout(voice_btn, [0.09, 0.09],[0.95, 0.2],[0, 4.3], false, false);
            setWgtLayout(chat_btn, [0.09, 0.09],[0.95, 0.1],[0, 4.0], false, false);
            setWgtLayout(roundInfo, [0.47, 0.0],[0.5, 0.55],[0, 1.0], false, false);
        }

        if (MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
            if (isIPad()) {
                setWgtLayout(node.getChildByName("down").getChildByName('ready'), [0.08, 0.09],[0.5, 0.5],[1.4, -2], false, false);
                setWgtLayout(node.getChildByName("top").getChildByName('ready'), [0.08, 0.09],[0.5, 0.5],[-1.4, 2.4], false, false);
                setWgtLayout(node.getChildByName("left").getChildByName('ready'), [0.08, 0.09],[0.5, 0.5],[-1.4, -2], false, false);
                setWgtLayout(node.getChildByName("right").getChildByName('ready'), [0.08, 0.09],[0.5, 0.5],[1.4, 2.4], false, false);
            } else {
                setWgtLayout(node.getChildByName("down").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[3.2, -1.7], false, false);
                setWgtLayout(node.getChildByName("top").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[-3.2, 2.4], false, false);
                setWgtLayout(node.getChildByName("left").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[-3.2, -1.7], false, false);
                setWgtLayout(node.getChildByName("right").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[3.2, 2.4], false, false);
            }
        }
        else if (MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ) {
            // 江苏麻将牌桌UI优化
            setWgtLayout(node.getChildByName("down").getChildByName('ready'),  [0.08, 0.09],[0.5, 0.5],[0, -0.6], false, false);
            setWgtLayout(node.getChildByName("top").getChildByName('ready'),   [0.08, 0.09],[0.5, 0.5],[0, 2.8], false, false);
            setWgtLayout(node.getChildByName("left").getChildByName('ready'),  [0.08, 0.09],[0.5, 0.5],[-1.5, 1.2], false, false);
            setWgtLayout(node.getChildByName("right").getChildByName('ready'), [0.08, 0.09],[0.5, 0.5],[1.5, 1.2], false, false);
        }
    }
    else
    {
        InitHeadPostionPlaying(node);
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ) {
            setWgtLayout(voice_btn, [0.09, 0.09],[0.95, 0.2],[0, 3.3], false, false);
            setWgtLayout(chat_btn, [0.09, 0.09],[0.95, 0.1],[0, 3.0], false, false);
            setWgtLayout(roundInfo, [0.47, 0.0],[0.5, 0.38],[0, 0.5], false, false);
        }
        resetFlowerNum(node);
        resetJiaZhuNum(node);
        resetMaiZhuangNum_haian(node);
    }
}

function setMaizhuangTag_haian(msg,off)
{
    var _node = getNode(off);
    var _maizhuangNode = _node.getChildByName("head").getChildByName("maizhuang");
    if(getUIPlayer(off) && msg.uid === getUIPlayer(off).info.uid)
    {
        _maizhuangNode.visible = true;
        var path0 = "playing/other/";
        if(msg.jiazhuNum > 0)
        {
            // _maizhuangNode.setString("买庄");
            _maizhuangNode.loadTexture(path0 + "mai_icon.png");
        }
        else {
            // _maizhuangNode.setString("不买庄");
            _maizhuangNode.loadTexture(path0 + "bumai_icon.png");
        }
    }
}

/***
 * 徐州沛县麻将增加是否下码Tag
 * @param msg
 * @param off 位置 0, 1, 2, 3
 */
function setXiaMaTag_peixian(msg, off)
{
    var _node = getNode(off);
    var _xiamaNode = _node.getChildByName("head").getChildByName("xiama");
    if(getUIPlayer(off) && msg.uid === getUIPlayer(off).info.uid)
    {
        _xiamaNode.visible = true;
        if(msg.jiazhuNum > 0)
        {
            _xiamaNode.setString("下码")
        }
        else {
            _xiamaNode.setString("不下码")
        }
    }
}

function resetMaiZhuangNum_haian(node)
{
    if (!MjClient.majiang.setMaiZhuangIcon)
        return;

    var down = node.getChildByName("down");
    var top = node.getChildByName("top");
    var left = node.getChildByName("left");
    var right = node.getChildByName("right");

    MjClient.majiang.setMaiZhuangIcon(down, getUIPlayer(0));
    MjClient.majiang.setMaiZhuangIcon(right, getUIPlayer(1));
    MjClient.majiang.setMaiZhuangIcon(top, getUIPlayer(2));
    MjClient.majiang.setMaiZhuangIcon(left, getUIPlayer(3));
}

//重新设置花数
function resetFlowerNum(node) {
    var tData = MjClient.data.sData.tData;
    var down = node.getChildByName("down");
    var top = node.getChildByName("top");
    var left = node.getChildByName("left");
    var right = node.getChildByName("right");
    if(tData.areaSelectMode)
    {
        switch (tData.areaSelectMode.withFlowerType)
        {
            case WithFlowerType.commonFlower:
                initFlower(false, false);
                break;
            case WithFlowerType.noFlower:
                initFlower(false, false);
                break;
            case WithFlowerType.zfbFlower:
                initFlower(true, true);
                break;
        }
    }


    MjClient.majiang.setFlowerImg(down, getUIPlayer(0));
    MjClient.majiang.setFlowerImg(right, getUIPlayer(1));
    MjClient.majiang.setFlowerImg(top, getUIPlayer(2));
    MjClient.majiang.setFlowerImg(left, getUIPlayer(3));
}


//重新设置加注数
function resetJiaZhuNum(node) {
    var down = node.getChildByName("down");
    var top = node.getChildByName("top");
    var left = node.getChildByName("left");
    var right = node.getChildByName("right");

    MjClient.majiang.setJiaZhuNum(down, getUIPlayer(0));
    MjClient.majiang.setJiaZhuNum(right, getUIPlayer(1));
    MjClient.majiang.setJiaZhuNum(top, getUIPlayer(2));
    MjClient.majiang.setJiaZhuNum(left, getUIPlayer(3));
}


//设置中间轮盘转动
function SetArrowRotation(arrowbkNode, nextPlayer)
{
    var tData = MjClient.data.sData.tData;
    var off = getOffByIndex(tData.curPlayer);
    if(nextPlayer != null && !cc.isUndefined(nextPlayer) )
        off = getOffByIndex(nextPlayer);

    setArrowFengDir(arrowbkNode);


    // --------------------山西 海安 牛逼的动态牌桌指示器------------------------------
    if(!COMMON_UI3D.is3DUI())
    {
        if(isJinZhongAPPType()||
            MjClient.getAppType() === MjClient.APP_TYPE.QXHAIANMJ ||
            MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
        {
            return tableIndicator(arrowbkNode, off);
        }
    }

    // -------------------------------------------------------------------------------

    var arrow = arrowbkNode.getChildByName("arrow");
    var arrow_2 = arrowbkNode.getChildByName("arrow_2");
    var arrow_3 = arrowbkNode.getChildByName("arrow_3");
    var arrow_4 = arrowbkNode.getChildByName("arrow_4");
    arrow.setVisible(false);
    arrow_2.setVisible(false);
    arrow_3.setVisible(false);
    arrow_4.setVisible(false);


    arrow.runAction(cc.sequence(cc.fadeIn(0.75), cc.fadeOut(0.75)).repeatForever());
    arrow_2.runAction(cc.sequence(cc.fadeIn(0.75), cc.fadeOut(0.75)).repeatForever());
    arrow_3.runAction(cc.sequence(cc.fadeIn(0.75), cc.fadeOut(0.75)).repeatForever());
    arrow_4.runAction(cc.sequence(cc.fadeIn(0.75), cc.fadeOut(0.75)).repeatForever());

    switch(off){
        case 0:
            arrow.stopAllActions();
            arrow_2.setVisible(true);
            arrow_3.stopAllActions();
            arrow_4.stopAllActions();
            break;
        case 1:
            arrow.stopAllActions();
            arrow_2.stopAllActions();
            arrow_3.setVisible(true);
            arrow_4.stopAllActions();
            break;
        case 2:
            arrow.stopAllActions();
            arrow_2.stopAllActions();
            arrow_3.stopAllActions();
            arrow_4.setVisible(true);
            break;
        case 3:
            arrow.setVisible(true);
            arrow_2.stopAllActions();
            arrow_3.stopAllActions();
            arrow_4.stopAllActions();
            break;
    }

    var winRight = arrowbkNode.getChildByName("dir_right");
    var winDown = arrowbkNode.getChildByName("dir_down");
    var winLeft = arrowbkNode.getChildByName("dir_left");
    var winUp = arrowbkNode.getChildByName("dir_up");
    var textArr = [winDown, winRight, winUp, winLeft];



    //刷新东南西北的字，晋中选座
    if(isJinZhongAPPType() && MjClient.MaxPlayerNum != 2)
    {
        var path0 = "playing/gameTable/dir/dir_normal_";
        // var tData = MjClient.data.sData.tData;
        for(var key = 0; key < textArr.length; key++)
        {
            var pl = getUIPlayer(key);
            if(pl)
            {
                textArr[key].visible = true;
                var dir = tData.uids.indexOf(getUIPlayer(key).info.uid);
                if(pl.dir && pl.dir >= 0) dir = pl.dir;
                textArr[key].loadTexture(path0 + dir + ".png");
            }
        }
    }

    //刷新东南西北的方向 dir_curr: 为了标记3D的方位旋转角度和颜色指示
    if(COMMON_UI3D.is3DUI() && MjClient.getAppType() !== MjClient.APP_TYPE.QXHAIANMJ)
    {
        winDown.dir_curr = "0";
        winRight.dir_curr = "1";
        winUp.dir_curr = "2";
        winLeft.dir_curr = "3";

        for(var key = 0; key < textArr.length; key++)
        {
            var angle = Number(textArr[key].dir_curr) * (-90);
            textArr[key].setRotation(angle);

            var pl = getUIPlayer(key);
            if(pl && off === Number(textArr[key].dir_curr)) // 当前出牌的人，替换带颜色的图标字体
            {
                var dir = tData.uids.indexOf(getUIPlayer(off).info.uid);
                if((pl.dir || pl.dir == 0) && pl.dir != -1) dir = pl.dir;
                var path_curr = "playing/gameTable/dir/dir_" + textArr[key].dir_curr + "_" + dir + ".png";
                if (MjClient.MaxPlayerNum == 2 && dir == 1) {
                    dir = 2;
                    path_curr = "playing/gameTable/dir/dir_" + textArr[key].dir_curr + "_" + dir + ".png";
                }
                textArr[key].loadTexture(path_curr);
            }
        }
    }


    //晋中的3D 二人情况下隐藏方位, by sking 2019.2.21
    if(isJinZhongAPPType() && MjClient.MaxPlayerNum == 2 && !MjClient.isInGoldField())
    {
        for(var key = 0; key < textArr.length; key++)
        {
            textArr[key].visible = false;
        }
    }
}

/***
 * 牌桌动态指示器(海安，山西)    —— by Tom
 * 适用于2, 3, 4人玩法
 * @param arrowbkNode (tableArrowNode)
 * @param off (0:down, 1:right, 2:top, 3.left)
 */
function tableIndicator(arrowbkNode, off)
{
    var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer(off);
    if(!pl || !tData) return;

    var _dir = tData.uids.indexOf(getUIPlayer(off).info.uid);
    if(pl.dir && pl.dir >= 0) _dir = pl.dir;
    var dir = _dir;
    var uids = tData.uids;


    //海安麻将的东南西北与算分有关系的，东边始终是庄家 by sking 2018.9.14
    if(MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_MJ)
    {
        var _zhuangOff  = getOffByIndex(tData.zhuang);
        var uids_new = [];
        var uidoff = tData.zhuang;

        for(var i = _zhuangOff;i < _zhuangOff + tData.maxPlayer;i++)
        {
            if(uidoff > 3 && tData.maxPlayer == 4)
            {
                uidoff = 0;
            }
            else if(uidoff > 2 && tData.maxPlayer == 3)
            {
                uidoff = 0;
            }
            if(tData.uids[uidoff]) uids_new.push(tData.uids[uidoff]);
            uidoff++;
        }
        dir = uids_new.indexOf(pl.info.uid);
        uids = uids_new;
    }



    var arrow = arrowbkNode.getChildByName("arrow");
    arrowbkNode.getChildByName("arrow_2").visible = false;
    arrowbkNode.getChildByName("arrow_3").visible = false;
    arrowbkNode.getChildByName("arrow_4").visible = false;
    arrow.visible = true;
    arrow.runAction(cc.sequence(cc.fadeIn(0.75), cc.fadeOut(0.75)).repeatForever());

    var winRight = arrowbkNode.getChildByName("dir_right");
    var winDown = arrowbkNode.getChildByName("dir_down");
    var winLeft = arrowbkNode.getChildByName("dir_left");
    var winUp = arrowbkNode.getChildByName("dir_up");
    var path0 = "playing/gameTable/dir_press_";
    var path1 = "playing/gameTable/dir_normal_" + dir + ".png";
    var path2 = "playing/gameTable/arrow_" + dir + ".png";
    winRight.visible = false;
    winDown.visible = false;
    winLeft.visible = false;
    winUp.visible = false;

    // 对应位置，显示东南西北文字  ---------------------------------------
    var textArr = [winDown, winRight, winUp, winLeft];
    for(var key = 0; key < textArr.length; key++)
    {
        var pl = getUIPlayer(key);
        if(pl)
        {

            textArr[key].visible = true;
            var dir = uids.indexOf(getUIPlayer(key).info.uid);
            if(pl.dir && pl.dir >= 0) dir = pl.dir;
            textArr[key].loadTexture(path0 + dir + ".png");
        }
    }
    // ----------------------------------------------------------------------



    // 旋转当前指标，指向出牌玩家
    var arrowObj = {
        0 : {name: "dir_down",  angle: 0},
        1 : {name: "dir_right", angle: -90},
        2 : {name: "dir_up",    angle: 180},
        3 : {name: "dir_left",  angle: 90}
    };

    for(var key in arrowObj)
    {
        if(off === Number(key))
        {
            var dirNode = arrowbkNode.getChildByName(arrowObj[key].name);
            dirNode && dirNode.loadTexture(path1);
            arrow.setRotation(arrowObj[key].angle);
            break;
        }
    }
    arrow.loadTexture(path2);


    // 海安,晋中2人隐藏指示器
    if(MjClient.getAppType() === MjClient.APP_TYPE.QXHAIANMJ ||
        isJinZhongAPPType()
    ){
        if(MjClient.MaxPlayerNum === 2 && !MjClient.isInGoldField()){
            for(var i = 0, len = textArr.length; i < len; i++){
                textArr[i].visible = false;
            }
        }
    }
    // -------------------------------------------------------------------------
}

//设置东南西北
function setArrowFengDir(arrowbkNode) {
    var tData = MjClient.data.sData.tData;
    var uids = tData.uids;
    var selfIndex = uids.indexOf(SelfUid());


    // cc.log("这是我的selfIndex" + selfIndex);

    var path_normal = "playing/gameTable/dir_normal_";
    if (COMMON_UI3D.is3DUI()) {
        path_normal = "playing/gameTable/dir/dir_normal_";
    }

    var winRight = arrowbkNode.getChildByName("dir_right");
    var winDown = arrowbkNode.getChildByName("dir_down");
    var winLeft = arrowbkNode.getChildByName("dir_left");
    var winUp = arrowbkNode.getChildByName("dir_up");
    var win = arrowbkNode.getChildByName("dir");    // 汨罗

    var winobjArr = [winDown, winRight, winUp, winLeft];
    var temp = 0;

    if(MjClient.getAppType() === MjClient.APP_TYPE.QXHAIANMJ )
    {
        if(MjClient.MaxPlayerNum === 2){
            for(var i = 0, len = winobjArr.length; i < len; i++){
                winobjArr[i].visible = false;
            }
        }
    }


    // 2人 游戏时， 两家固定是东和西
    if(2 == MjClient.MaxPlayerNum && 1 == selfIndex)
    {
        selfIndex = 2;
    }

    if(3 == MjClient.MaxPlayerNum && isCanChangePlayerNum()){

        if(isJinZhongAPPType())
        {
            var pl = getUIPlayer(0);
            winobjArr[0].loadTexture(path_normal + pl.dir + ".png");
            winobjArr[0].visible = true;

            var pl1 = getUIPlayer(1);
            if(pl1)
            {
                winobjArr[1].loadTexture(path_normal + pl1.dir + ".png");
                winobjArr[1].visible = true;
            }

            var pl2 = getUIPlayer(2);
            if(pl2)
            {
                winobjArr[3].loadTexture(path_normal + pl2.dir + ".png");
                winobjArr[3].visible = true;
            }

            winobjArr[2].visible = false;
            return;
        }
        else
        {
            for(var i in winobjArr){
                if (winobjArr[i])
                    winobjArr[i].setVisible(false);
            }
            if (win)
                win.setVisible(false);
            return;
        }
    }



    if(MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_MJ)
    {
        //var direct = ["东","南","西","北"];
        var _zhuangOff  = getOffByIndex(tData.zhuang);
        var index = 0;
        var dirUiOff = _zhuangOff;
        for(var i = _zhuangOff;i < _zhuangOff + 4;i++)
        {
            if(dirUiOff > 3)
            {
                dirUiOff = 0;
            }
            if(winobjArr[dirUiOff])
            {
                winobjArr[dirUiOff].loadTexture(path_normal + index + ".png");
                dirUiOff++;
                index++;
            }
        }
        return;
    }


    for (var i = selfIndex; i < selfIndex + 4; i++)
    {
        var index = i % 4;
        if(winobjArr[temp])
        {
            cc.log("这是我的selfIndex----------------ss" + index);
            winobjArr[temp].loadTexture(path_normal + index + ".png");

            temp++;
        }
    }

    if (win)
    {
        win.setRotation(90 * (index + 1)); //by sking
    }
}


function GetUIBind(uidPos, offStore)
{
    var uiOff = getOffByIndex(uidPos);
    if (offStore)
        offStore.push(uiOff);
    // var jsBind = MjClient.playui.jsBind;
    // var ui = [jsBind.down, jsBind.right, jsBind.top, jsBind.left];
    // return ui[uiOff];

    var _node = {_node:getNode(uiOff)};

    return _node;
}



/*
 吃碰杠的麻将变灰
 */
function setCardLayoutTag(node)
{
    node.setColor(cc.color(170, 170, 170));
}

/*
 吃碰杠的麻将加箭头
 */
function setCardArrow(node, offIdx, off)
{
    if (MjClient.gameType != MjClient.GAME_TYPE.NAN_JING &&
        MjClient.gameType != MjClient.GAME_TYPE.SI_YANG &&
        MjClient.gameType != MjClient.GAME_TYPE.XIN_SI_YANG &&
        MjClient.gameType != MjClient.GAME_TYPE.HA_14DUN &&
        MjClient.gameType != MjClient.GAME_TYPE.HUAI_AN_CC &&
        MjClient.gameType != MjClient.GAME_TYPE.HZ_TUI_DAO_HU &&
        MjClient.gameType != MjClient.GAME_TYPE.LIAN_YUN_GANG &&
        MjClient.gameType != MjClient.GAME_TYPE.GAN_YU &&
        MjClient.gameType != MjClient.GAME_TYPE.GUAN_YUN &&
        MjClient.gameType != MjClient.GAME_TYPE.XIANG_SHUI_MJ &&
        MjClient.gameType != MjClient.GAME_TYPE.GUAN_NAN &&
        MjClient.gameType != MjClient.GAME_TYPE.SU_QIAN &&
        MjClient.gameType != MjClient.GAME_TYPE.HAI_AN_MJ &&
        MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_MJ &&
        MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN &&
        MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_LI_SI &&
        MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_KD &&
        MjClient.gameType != MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI &&
        MjClient.gameType != MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI &&
        MjClient.gameType != MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN &&
        MjClient.gameType != MjClient.GAME_TYPE.HE_JIN_KUN_JIN &&
        MjClient.gameType != MjClient.GAME_TYPE.WU_TAI_KOU_DIAN &&
        MjClient.gameType != MjClient.GAME_TYPE.LV_LIANG_MA_JIANG &&
        MjClient.gameType != MjClient.GAME_TYPE.ZHUO_HAO_ZI &&
        MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU &&
        MjClient.gameType != MjClient.GAME_TYPE.LING_SHI_BIAN_LONG &&
        MjClient.gameType != MjClient.GAME_TYPE.LING_SHI_BAN_MO &&
        MjClient.gameType != MjClient.GAME_TYPE.PING_YAO_MA_JIANG &&
        MjClient.gameType != MjClient.GAME_TYPE.PING_YAO_KOU_DIAN &&
        MjClient.gameType != MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3 &&
        MjClient.gameType != MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN &&
        MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO &&
        MjClient.gameType != MjClient.GAME_TYPE.SHOU_YANG_QUE_KA &&
        MjClient.gameType != MjClient.GAME_TYPE.HAI_AN_BAI_DA &&
        MjClient.gameType != MjClient.GAME_TYPE.XU_ZHOU &&
        MjClient.gameType != MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN &&
        MjClient.gameType != MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN &&
        MjClient.gameType != MjClient.GAME_TYPE.FEN_XI_YING_KOU &&
        MjClient.gameType != MjClient.GAME_TYPE.HONG_TONG_WANG_PAI &&
        MjClient.gameType != MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN &&
        MjClient.gameType != MjClient.GAME_TYPE.DA_NING_SHUAI_JIN &&
        MjClient.gameType != MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI &&
        MjClient.gameType != MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI &&
        MjClient.gameType != MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI &&
        MjClient.gameType != MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN &&
        MjClient.gameType != MjClient.GAME_TYPE.FEN_YANG_QUE_MEN &&
        MjClient.gameType != MjClient.GAME_TYPE.JING_LE_KOU_DIAN &&
        MjClient.gameType != MjClient.GAME_TYPE.SHU_YANG
    )
    {
        return;
    }


    var offSets = [[50, 90], [60, 70], [50, 90], [60, 70], [48, 62]];
    var arrow = new cc.Sprite("playing/other/arrow.png");
    if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ){
        arrow = new cc.Sprite("playing/other/arrow1.png");
    }
    arrow.setScale(1.2);
    arrow.setPosition(offSets[off][0], offSets[off][1]);
    arrow.setName("arrow");
    node.addChild(arrow,12);

    // 2人 3人 游戏
    if(MjClient.MaxPlayerNum==2){
        if(0 == off && offIdx != 3) offIdx = 1;
    }
    else if(MjClient.MaxPlayerNum==3){
        if(0 == off && 1 == offIdx) offIdx = 2;
        if(1 == off && 0 == offIdx) offIdx = 1;
    }


    var rotation = 0;
    if (off == 0)
    {
        switch (offIdx)
        {
            case 0:
                rotation = 0;
                break;
            case 1:
                rotation = -90;
                break;
            case 2:
                rotation = -180;
                break;
            case 3: //补杠，箭头指向自己，不管放杠的人方向
                rotation = 90;
                break;
        }
    }
    else if (off == 1)
    {
        switch (offIdx)
        {
            case 0:
                rotation = -90;
                break;
            case 1:
                rotation = -180;
                break;
            case 2:
                rotation = -270;
                break;
            case 3: //补杠，箭头指向自己
                rotation = 0;
                break;
        }
    }
    else if (off == 2)
    {
        switch (offIdx)
        {
            case 0:
                rotation = -180;
                break;
            case 1:
                rotation = -270;
                break;
            case 2:
                rotation = 0;
                break;
            case 3: //补杠，箭头指向自己
                rotation = 270;
                break;
        }
    }
    else if (off == 3)
    {
        switch (offIdx)
        {
            case 0:
                rotation = -270;
                break;
            case 1:
                rotation = 0;
                break;
            case 2:
                rotation = -90;
                break;
            case 3: //补杠，箭头指向自己
                rotation = 180;
                break;
        }
    }

    if(MjClient.MaxPlayerNum === 2)
    {
        if(off === 0)
        {
            rotation = -90;
        }
        else if(off === 2)
        {
            rotation = 90;
        }
    }
    arrow.setRotation(rotation);
}

/*
 吃碰杠的麻将加箭头
 */
function setCardArrow_chi(node, offIdx, off)
{
    if (
        MjClient.gameType != MjClient.GAME_TYPE.HAI_AN_MJ &&
        MjClient.gameType != MjClient.GAME_TYPE.XUE_ZHAN &&
        MjClient.gameType != MjClient.GAME_TYPE.XUE_LIU &&
        MjClient.gameType != MjClient.GAME_TYPE.HAI_AN_BAI_DA )
    {
        return;
    }

    var offSets = [[55, 100], [65, 60], [50, 90], [65, 80], [48, 62]];
    var arrow = new cc.Sprite("playing/MJ/chiTag.png");
    arrow.setScale(1.2);
    arrow.setPosition(offSets[off][0], offSets[off][1]);
    arrow.setName("chiTag");
    node.addChild(arrow,12);

    // 2人 3人 游戏
    // if(MjClient.MaxPlayerNum==2){
    //     if(0 == off) offIdx = 1;
    // }
    // else if(MjClient.MaxPlayerNum==3){
    //     if(0 == off && 1 == offIdx) offIdx = 2;
    //     if(1 == off && 0 == offIdx) offIdx = 1;
    // }

    offIdx = 0;
    var rotation = 0;
    if (off == 0)
    {
        switch (offIdx)
        {
            case 0:
                rotation = 0;
                break;
            case 1:
                rotation = -90;
                break;
            case 2:
                rotation = -180;
                break;
        }
    }
    else if (off == 1)
    {
        switch (offIdx)
        {
            case 0:
                rotation = -90;
                break;
            case 1:
                rotation = -180;
                break;
            case 2:
                rotation = -270;
                break;
        }
    }
    else if (off == 2)
    {
        switch (offIdx)
        {
            case 0:
                rotation = -180;
                break;
            case 1:
                rotation = -270;
                break;
            case 2:
                rotation = 0;
                break;
        }
    }
    else if (off == 3)
    {
        switch (offIdx)
        {
            case 0:
                rotation = -270;
                break;
            case 1:
                rotation = 0;
                break;
            case 2:
                rotation = -90;
                break;
        }
    }
    arrow.setRotation(rotation);
}

//适用麻将,重置手牌麻将的大小，为了解决手牌变小的bug, by sking
function resetCardSize()
{
    var _currentMJType = getCurrentMJBgType();
    var _downNode = getNode(0);
    var _cpnode = _downNode.getChildByName("stand");
    var pl = getUIPlayer(0);

    cc.log("===========  node.resetCardSize =================== _currentMJType = " + _currentMJType);
    var children = _downNode.children;
    for(var i = 0; i < children.length; i++)
    {
        if(children[i].name == "mjhand")
        {
            if(isJinZhongAPPType())
            {
                children[i].ignoreContentAdaptWithSize(true);
            }

            if (MjClient.GAME_TYPE.XUE_ZHAN == MjClient.gameType)
            {
                var pl = getUIPlayer(0);
                if (!pl.huCards)
                {
                    setCardSprite(children[i], children[i].tag, 4);//by sking 2018,,1,13
                }
            }
            else
            {
                //不用再做刷贴图的动作了
                //todo.... 准备删除刷牌动作，岳阳APP 先不做刷贴图的
                // if(MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ )
                // {
                //     setCardSprite(children[i], children[i].tag, 4);
                // }
            }
            var scale = _cpnode.getScale()*1.30;
            children[i].setScale(scale);
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ)
            {
                if(_currentMJType == 2 || _currentMJType == 3)
                {
                    children[i].getChildByName("imgNode").setScale(1.15);
                }
            }

            if (MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
                isJinZhongAPPType() ||
                MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ){
                setMJDif(children[i]);
            }
        }
        // 山西大宁摔金怄牌操作，需要对所选麻将适配大小
        if(children[i].name === "mjou")
        {
            var arr = [1.05, 1.36, 1.35, 2.25];
            var sca = COMMON_UI3D.is3DUI() ? 1.32 : arr[_currentMJType];
            children[i].ignoreContentAdaptWithSize(true);
            children[i].setScale(_cpnode.getScale() * sca);
        }
    }

    MjClient.movingCard = null;
}



function getNewCard(node, copy, name, tag, off, specialTAG)
{
    if(MjClient.playui.getNewCard) return MjClient.playui.getNewCard(node, copy, name, tag, off, specialTAG);
    var cpnode = node.getChildByName(copy);
    var cp = cpnode.clone(); //克隆一个白板，上面没有任何条纹的麻将 ，by sking
    if(copy == "stand")
    {
        if(!cpnode.standScale) cpnode.standScale = cpnode.getScale();
    }

    var scale = cp.getScale()*1.15;
    if (name == "mjhand")
    {
        scale = cp.getScale()*1.30;
    }
    cp.setScale(scale);
    cp.visible = true;
    if(tag == 999)
    {
        cp.visible = false;
    }
    cp.name = name;
    cp.currentScale = scale;

    if(specialTAG == "isgang4")
    {
        cp.isgang4 = true;
    }
    else if(specialTAG == "heng")
    {
        cp.heng = true;
    }
    node.addChild(cp);

    if(tag > 0)
    {
        //创建一个带有麻将信息的麻将 cp为创建后的麻将
        setCardSprite(cp, tag, name == "mjhand" ? 4 : off);
        if(name == "mjhand" || name == "mjting")
        {
            SetTouchCardHandler(cpnode, cp);
        }
    }
    else
    {
        if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb() ) {
            cp.loadTexture(cpnode._textureFile);
        } else {
            cp.loadTexture(cpnode.getRenderFile().file);
        }
    }
    return cp;
}

/*
 设置当前可听的牌数
 */
var setTingCardPosX = null;

function CurrentPutCardMsg()
{
    var msg = - 1;
    var downNode = MjClient.playui._downNode;
    var standUI = downNode.getChildByName("stand");
    var children = downNode.children;
    for(var i = 0; i < children.length; i++)
    {
        if(children[i].name == "mjhand")
        {
            if(children[i].y > standUI.y + 10)
            {
                msg = children[i].tag;
                break;
            }
        }
    }
    if(msg == -1)
    {
        cc.log(" 没有找到当前的牌")
    }
    return msg;
}

function hideCurrentTingNum()
{
    if(!cc.sys.isObjectValid(MjClient.playui)) return;

    var carNumNode = MjClient.playui._tingCardNumNode;
    if(cc.sys.isObjectValid(carNumNode) && carNumNode){
        carNumNode.visible = false;
        var BindingNode = carNumNode.getChildByName("Node_card");
        BindingNode.removeAllChildren(true);
    }

    var cardTextNode = carNumNode.getChildByName("showNode");
    if(!cc.sys.isObjectValid(cardTextNode) && cardTextNode) cardTextNode.visible = false;
}


//var cardObject = {};
function setCurrentTingNum(tingSet)
{
    var tData = MjClient.data.sData.tData;

    if ("isOpenTingTip" in tData.areaSelectMode && !tData.areaSelectMode.isOpenTingTip)
        return;

    if(MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG 
        || MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN
        || MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO ) {
        return MjClient.playui.setCurrentTingNum(tingSet);
    }

    var carNumNode = MjClient.playui._tingCardNumNode;

    //如果没有可听的牌
    var bHaveValue = false;

    carNumNode.zIndex = 550;
    carNumNode.setAnchorPoint(0,0);
    carNumNode.setContentSize(272, 80);
    //位置被改变了，需要还原位置
    if(setTingCardPosX == null)
    {
        setTingCardPosX = carNumNode.getPositionX();
    }else{
        carNumNode.setPositionX(setTingCardPosX);
    }
    carNumNode.visible = true;
    var cardTextNode = carNumNode.getChildByName("showNode");
    cardTextNode.visible = false;

    if(MjClient.playui._tingCardsNode) MjClient.playui._tingCardsNode.visible = !carNumNode.visible;

    var BindingNode = carNumNode.getChildByName("Node_card");

    //删除之前，先把放在池子里面
    var BindingNodeChilds = BindingNode.children;
    for(var i = 0;i < BindingNodeChilds.length ;i++)
    {
        var c = BindingNodeChilds[i];
        CommonPool.putInPool(c);
    }

    BindingNode.removeAllChildren(true);

    if(MjClient.APP_TYPE.QXYYQP === MjClient.getAppType() ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
        var h = isIPhoneX() ? -0.1 : -0.5;
        setWgtLayout(carNumNode, [0.17, 0.17], [0.2, 0.25], [0, h]);
    }

    var i=0;
    var j=0;//高的idx
    var width = 86;
    var hight = 80;

    for (var cd in tingSet)
    {
        if(i >= 7)
        {
            i = 0;
            j++;
        }




        var cardNode = CommonPool.getFromPool(cardTextNode.getName());
        if(!cardNode)
        {
            cardNode = cardTextNode.clone();
        }

        //晋中麻将的特殊需求
        if( MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_MJ ||  MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN)
        {
            if(MjClient.data.sData.tData.areaSelectMode["is68"] && MjClient.data.sData.tData.uids.length == 2)
            {
                cardNode = cardTextNode.clone();
                cardNode.getChildByName("cardCount").visible = false;
                cardNode.getChildByName("cardText").visible = false;
            }
        }

        var countNode = cardNode.getChildByName("cardCount");
        var icount = getHuCardNum(parseInt(cd));
        countNode.setString(icount + "");
        var off = 0;
        if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ && (MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG || 
            MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ|| MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.JIANG_HUA_MJ) )
            ; // 永利有多个玩法是别的平台的 
        else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
            off = 6;

        setCardSprite(cardNode.getChildByName("cardNode"), parseInt(cd), off);
        if (COMMON_UI3D.is3DUI()) {
            var imgNode = cardNode.getChildByName("cardNode").getChildByName("imgNode");
            imgNode.setScale(imgNode.getScale() * 1.2);
        }

        cardNode.setPositionX(cardTextNode.getPositionX() + width*i*1);
        cardNode.setPositionY(cardTextNode.getPositionY() + hight*j*1);
        cardNode.visible = true;
        bHaveValue = true;
        BindingNode.addChild(cardNode);
        i++;
    }
    //如果对象中没有值
    if(!bHaveValue)
    {
        carNumNode.visible = false;
    }

    //设置背景的长度
    if(j > 0) i = 7;
    var tingCardsWidth = (i + 1)*width + 20;
    var tingCardHigh = carNumNode.getContentSize().height + j*hight;
    carNumNode.setContentSize(tingCardsWidth, tingCardHigh);

    //carNumNode.setPositionX(carNumNode.getPositionX() - (i - 1)*width/2 - 50);

    if (bHaveValue && (MjClient.gameType == MjClient.GAME_TYPE.HUAI_AN_ERZ ||
        MjClient.gameType == MjClient.GAME_TYPE.HUAI_AN_CC ||
        MjClient.gameType == MjClient.GAME_TYPE.HZ_TUI_DAO_HU))
    {
        if (MjClient.clickTing)
            carNumNode.getChildByName("icon").loadTexture("playing/gameTable/icon_jiating.png");
        else
            carNumNode.getChildByName("icon").loadTexture("playing/gameTable/icon_ting.png");
    }



    COMMON_UI.clearShowCurrentEatCards();
}


MjClient.movingCard = null;
MjClient.selectedCard = null;
var cardBeginPos = null;
var cardBeginScale = null;
var cardBeginZIndex = null;
var bIsPut = false;
var bStartMoved = false;
//var cardPutted = false; //为了解决如果已经打出牌，不能在打其他的牌
var _touchTimeBetween = 0; //防止玩家一顿猛点，间隔时间太短 by sking 2018.9.12
//设置回调，并处理回调
function SetTouchCardHandler(standUI, cardui)
{
    if(MjClient.playui.setTouchCardHandler)
        return MjClient.playui.setTouchCardHandler(standUI, cardui);

    cardui.addTouchEventListener(function(btn, tp)
    {
        var tData = MjClient.data.sData.tData;
        var pl = getUIPlayer(0);
        //返回false 表示不能出牌,增强可读性  by sking 2018.12.6
        if(!COMMON_UI.isCanTouch(cardui,btn,tp)) return;

        if(tp == ccui.Widget.TOUCH_BEGAN)
        {
            playEffect("cardClick");
            MjClient.movingCard = btn;
            MjClient.selectedCard = btn;
            cardBeginPos = btn.getPosition();
            cardBeginScale = btn.getScale();
            cardBeginZIndex = btn.zIndex;
            bIsPut = true;
            bStartMoved = false;

            var children = btn.getParent().children;
            for(var i = 0; i < children.length; i++)
            {
                if(children[i].name == "mjhand" && children[i] !== btn)

                {
                    children[i].y = standUI.y;
                    var tingSign = children[i].getChildByName("tingsign");
                    if (tingSign && (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )) {
                        if (MjClient.canTingCards && children[i].tag in MjClient.canTingCards)
                            tingSign.setVisible(true);
                    }
                }
            }


            /*
             设置当前可听的牌数
             */
            if(isNeedShowTingCard())
            {
                //显示当前听得牌
                cc.log("----------showCurrentTingCards-------------");
                COMMON_UI.showCurrentTingCards(cardui);
            }


            if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
                MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
                MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
                MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN ||
                MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG ||
                MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG ||
                MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO ||
                MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU ||
                MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ ||
                MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ ||
                MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ ||
                MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ ||
                MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
                MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU ||
                MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI)
            {

                var tingSign = cardui.getChildByName("tingsign");
                if (tingSign) tingSign.setVisible(false);
            }

        }
        else if(tp == ccui.Widget.TOUCH_MOVED)
        {
            if (MjClient.movingCard == null)
            {
                return;
            }

            if(MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN)
            {
                var eat = MjClient.playui.jsBind.eat;
                eat.ou._node.setTouchEnabled(false);
            }

            var pl = getUIPlayer(0);
            if(MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI &&
                tData.areaSelectMode.wanfa == "duiwangdajiangbao")
            {
                if (pl.hunCard == null || pl.hunCard == -1)
                {

                    return;
                }
            }

            var pos = btn.getTouchMovePosition();

            var _standHeight = standUI.getContentSize().height;

            //if(cc.pDistance(cardBeginPos, pos) > _standHeight/2)
            if((isJinZhongAPPType() && pos.y - cardBeginPos.y > _standHeight/2)
                || (MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ && cc.pDistance(cardBeginPos, pos) > _standHeight/2))
            {
                if (pos.x < 0) pos.x = 0;
                if (pos.x > MjClient.size.width) pos.x = MjClient.size.width;
                if (pos.y < 0) pos.y = 0;
                if (pos.y > MjClient.size.height) pos.y = MjClient.size.height;
                btn.setPosition(pos);
                bIsPut = true;
                bStartMoved = true;
                btn.zIndex  = 500;
                btn.scale = cardBeginScale;
            }
            else
            {
                if(btn.zIndex != 500)
                {
                    btn.setPosition(cardBeginPos);
                    if(btn.y >= (standUI.y + 20) )
                    {
                        btn.y = standUI.y + 20;
                    }
                }
                else{
                    //撤回这张牌
                    var _pos = btn.getPosition();
                    var dy = Math.round(_pos.y - standUI.y);

                    if (pos.x < 0) pos.x = 0;
                    if (pos.x > MjClient.size.width) pos.x = MjClient.size.width;
                    if (pos.y < 0) pos.y = 0;
                    if (pos.y > MjClient.size.height) pos.y = MjClient.size.height;
                    btn.setPosition(pos);

                    if(dy < _standHeight/2)//移动多少距离撤销
                    {
                        if(bIsPut)  bIsPut = false;

                        btn.scale = cardBeginScale*0.85;
                    }
                }
            }
        }
        else if(tp === ccui.Widget.TOUCH_ENDED || tp === ccui.Widget.TOUCH_CANCELED)
        {

            if(MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN)
            {
                var eat = MjClient.playui.jsBind.eat;
                eat.ou._node.setTouchEnabled(true);
            }
            bStartMoved = false;
            if (MjClient.movingCard == null)
            {
                return;
            }
            btn.zIndex  = cardBeginZIndex;
            btn.scale = cardBeginScale;

            var pos = btn.getPosition();
            var dy = Math.round(pos.y - standUI.y);
            if (MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI &&
                MjClient.data.sData.tData.areaSelectMode.wanfa == "duiwangdajiangbao")
            {
                if (dy >= 20 )
                {
                    if (getUIPlayer(0).hunCard == -1 ||getUIPlayer(0).hunCard == null )
                    {
                        MjClient.movingCard = null;
                        return;
                    }
                }
            }


            if(!bIsPut) //撤销这张牌
            {
                MjClient.movingCard = null;
                btn.setPosition(cardBeginPos);
                btn.y = standUI.y + 20;
                return;
            }


            if(dy < 20)
            {
                MjClient.movingCard = null;

                btn.setPosition(cardBeginPos);
                btn.y = standUI.y + 20;
            }
            else
            {


                if (MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN) { //乡宁摔金不去除听牌提醒

                    if(tData.areaSelectMode.baotingbaohu && !MjClient.clickTing)
                    {

                        hideCurrentTingNum();
                    }
                } else {
                    hideCurrentTingNum();
                }
                var tData = MjClient.data.sData.tData;
                var pl = getUIPlayer(0);
                if (MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI) {
                    PutOutCardForHTWP(cardui);
                } else
                {
                    var eat = MjClient.playui.jsBind.eat;
                    if ((MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN)
                     && eat.hu._node.visible && !eat.guo._node.visible && getUIPlayer(0).isTing) {
                        // 此时为开杠后，可以自摸则不能把牌打出去
                        MjClient.playui.CardLayoutRestore(getNode(0), 0);
                    }else if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG && eat.hu._node.visible && !eat.guo._node.visible){
                        // 有胡必须，自摸不能把牌打出去
                        MjClient.playui.CardLayoutRestore(getNode(0), 0);
                    }
                    else if (MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ) 
                    {
                        if (eat.ting._node.visible) {
                            MjClient.showMsg("确认 不听 吗?",function()
                            {
                                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                                    cmd: "MJPassBaoTing",
                                });
                                PutOutCard(cardui, cardui.tag);
                            },function(){
                                MjClient.playui.CardLayoutRestore(getNode(0), 0);
                            },"1");
                        }else if (eat.gang0._node.visible) {
                            MJPassConfirmToServer();
                            PutOutCard(cardui, cardui.tag);
                        }
                        else{
                            PutOutCard(cardui, cardui.tag);
                        }
                    }
                    else if ( pl.eatFlag & 8) //有胡的情况下，要先提示
                    {
                        var roomMsgValue = tData.tableid +":"+tData.roundNum;
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
                            var saveRoomMsgValueH = util.localStorageEncrypt.getStringItem("IGNORE_H_TIP","");
                            if(saveRoomMsgValueH.length > 0 && saveRoomMsgValueH == roomMsgValue){
                                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP){
                                    MjClient.showToast("你选择了过，暂时放弃胡牌");
                                }
                                MJPassConfirmToServer();
                                PutOutCard(cardui, cardui.tag);
                                return;
                            }
                        }
                        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
                            MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU)
                        {
                            MJPassConfirmToServer();
                            PutOutCard(cardui, cardui.tag);
                            return;
                        }

						// 王钓麻将处理取消界面弹多次
                        if(!eat.hu._node.visible && (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ 
                            && MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG )){
                            MJPassConfirmToServer();
                            PutOutCard(cardui, cardui.tag); 
                            return;
                        }

                        // 如果是自摸胡, 取出记录，防止拖出去牌，再次提示过胡弹窗
                        var guoHuHasBeenShow = util.localStorageEncrypt.getBoolItem(MjClient.guoHuHasBeenShown, false);
                        if(guoHuHasBeenShow){
                            MJPassConfirmToServer();
                            PutOutCard(cardui, cardui.tag);
                            util.localStorageEncrypt.setBoolItem(MjClient.guoHuHasBeenShown, false);
                        }else{
                            MjClient.showMsg("确认不胡吗?", function(result) {
                                if(result && result.isSelect){
                                    //选择了不在提示,
                                    if(eat.gang0._node.visible){
                                        util.localStorageEncrypt.setStringItem("IGNORE_G_TIP",roomMsgValue);
                                    }
                                    if(eat.hu._node.visible){
                                        util.localStorageEncrypt.setStringItem("IGNORE_H_TIP",roomMsgValue);
                                    }
                                }
                                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP){
                                    MjClient.showToast("你选择了过，暂时放弃胡牌");
                                }
                                MJPassConfirmToServer();
                                PutOutCard(cardui, cardui.tag);
                                util.localStorageEncrypt.setBoolItem(MjClient.guoHuHasBeenShown, false);
                            }, function() {
                                MjClient.playui.CardLayoutRestore(getNode(0), 0);
                            }, (MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ ) ? "3":"1");
                        }
                    }
                    else if (cardui.tag == 71 &&(MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG ||
                        MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU ||
                        MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO ||
                        MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ ||
                        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
                        MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU ||
                        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG ||
                        MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ ||
                        MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI))
                    {
                        MjClient.showMsg("是否将红中打出?", function() {
                            PutOutCard(cardui, cardui.tag);
                        }, function() {
                            MjClient.playui.CardLayoutRestore(getNode(0), 0);
                        }, "1");
                    }
                    else if (MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG && MjClient.majiang.isHunCard(cardui.tag, MjClient.data.sData.tData.hunCard))
                    {
                        MjClient.showMsg("你确认要出王牌?", function() {
                            PutOutCard(cardui, cardui.tag);
                        }, function() {
                            MjClient.playui.CardLayoutRestore(getNode(0), 0);
                        }, "1");
                    }
                    else if (MjClient.gameType === MjClient.GAME_TYPE.YI_YANG_MA_JIANG && eat.ting._node.visible)
                    {
                        MjClient.showMsg("你确定要过吗?", function() {
                            PutOutCard(cardui, cardui.tag);
                            MjClient.majiang.MJTingToServer(SelfUid(), false);
                            hideTingBtn();
                        }, function() {
                            MjClient.playui.CardLayoutRestore(getNode(0), 0);
                        });
                    }
                    else {
                        if(MjClient.APP_TYPE.QXYYQP == MjClient.getAppType() && eat.hu._node.visible){//过胡提示
                            MjClient.showToast("你选择了过，暂时放弃胡牌");
                        }
                        PutOutCard(cardui, cardui.tag);
                    }
                }
                if (MjClient.clickTing && MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_LI_SI) {
                    if (cardui.isFour) cardui.isFour = false;
                }
            }
        }
    }, cardui);
}



var _bSelectOne = false;
var _currentTouchCard = null;
var movedCard = [];
function getTouchListener_MJ()
{
    return{
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: false,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
        onTouchBegan: function (touch, event) {
            var pl = getUIPlayer(0);
            if ( !pl ) return false;

            if(MjClient.isChaPaiPlaying) return; //正在播插牌动画时不让点击其他的牌 by sking 2018.9.12

            if(pl.mjState == TableState.roundFinish)//已经完成
            {
                return false;
            }

            movedCard = [];

            if (bStartMoved)
            {
                return false;
            }
            if(pl.isTing)
            {
                return false;
            }
            return true;
        },
        onTouchMoved: function (touch, event) {         // 触摸移动时触发

            if (bStartMoved)
            {
                return;
            }

            var target = event.getCurrentTarget();  // 获取事件所绑定的 target,这个target 就是down
            // 获取当前点击点所在相对按钮的位置坐标
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var _childrens = MjClient.playui._downNode.getChildren();
            var _standui = MjClient.playui._downNode.getChildByName("stand");
            var found = false;
            for(var i = 0; i < _childrens.length; i++)
            {
                if(_childrens[i].name == "mjhand")
                {
                    var _boundingBox = _childrens[i].getBoundingBox();
                    if (cc.rectContainsPoint(_boundingBox, locationInNode) && !found && _childrens[i].y < _standui.y + 20)
                    {
                        MjClient.unselecedWangCards = MjClient.unselecedWangCards || {};
                        if ((MjClient.clickTing && MjClient.canTingCards[_childrens[i].tag])
                            || (!MjClient.clickTing && !_childrens[i].isFour && !MjClient.unselecedWangCards[_childrens[i].tag]))
                        {
                            if (MjClient.GAME_TYPE.LUAN_GUA_FENG == MjClient.gameType)
                            {
                                var pl = getUIPlayer(0);
                                if (pl && MjClient.majiang.canchangecolor(_childrens[i].tag,pl.mjhand,pl))
                                {
                                    return;
                                }
                            }

                            _childrens[i].y = _standui.y + 20;
                            MjClient.selectedCard = _childrens[i];
                            found = true;
                            if (movedCard.indexOf(_childrens[i]) < 0)
                            {
                                movedCard.push(_childrens[i]);
                            }

                            if(MjClient.movingCard && MjClient.movingCard.tag == _childrens[i].tag)
                            {
                                //第一张牌不重复播音效

                                //修改同时弹出2张牌
                                //var _childrens = MjClient.playui._downNode.getChildren();
                                var _standui = MjClient.playui._downNode.getChildByName("stand");
                                for(var j = 0; j < _childrens.length; j++)
                                {
                                    if( _childrens[j].name == "mjhand")
                                    {
                                        _childrens[j].y = _standui.y;
                                    }
                                }
                            }
                            else
                            {
                                playEffect("cardClick");
                            }

                            if (isNeedShowTingCard())
                            {
                                if (MjClient.GAME_TYPE.XUE_ZHAN == MjClient.gameType ||
                                    MjClient.GAME_TYPE.XUE_LIU == MjClient.gameType)
                                {
                                    var pl = getUIPlayer(0)
                                    if (pl && Math.floor(cardui.tag / 10) != pl.que)
                                    {
                                        COMMON_UI.showCurrentTingCards(_childrens[i]);
                                    }
                                }else if (MjClient.GAME_TYPE.HE_JIN_KUN_JIN == MjClient.gameType) {
                                    if (IsTurnToMe()) {
                                        COMMON_UI.showCurrentTingCards(_childrens[i]);
                                    }
                                }
                                else
                                {
                                    COMMON_UI.showCurrentTingCards(_childrens[i]);
                                }
                            }

                        }
                    }
                    else if (MjClient.selectedCard != _childrens[i]){
                        _childrens[i].y = _standui.y;
                    }
                }
            }

            if (movedCard.length>1)
            {
                MjClient.movingCard = null;
            }
        },
        onTouchEnded: function (touch, event) {         // 点击事件结束处理
            var _childrens = MjClient.playui._downNode.getChildren();
            var _standui = MjClient.playui._downNode.getChildByName("stand");
            var tData = MjClient.data.sData.tData;
            if(!IsTurnToMe() || tData.tState != TableState.waitPut)
            {
                for(var i = 0; i < _childrens.length; i++)
                {
                    if(_childrens[i].name == "mjhand")
                    {
                        _childrens[i].y = _standui.y;
                        MjClient.selectedCard = null;
                    }
                }
            }

        }
    };
}

//是否需要显示听牌
function isNeedShowTing()
{
    if (MjClient.gameType === MjClient.GAME_TYPE.NAN_JING ||
        MjClient.gameType === MjClient.GAME_TYPE.XU_ZHOU ||
        MjClient.gameType === MjClient.GAME_TYPE.HA_14DUN ||
        MjClient.gameType === MjClient.GAME_TYPE.HA_HONGZHONG ||
        MjClient.gameType === MjClient.GAME_TYPE.HUAI_AN_TTZ ||
        MjClient.gameType === MjClient.GAME_TYPE.LIAN_SHUI ||
        MjClient.gameType === MjClient.GAME_TYPE.TONG_HUA ||
        MjClient.gameType === MjClient.GAME_TYPE.ML_HONGZHONG ||
        MjClient.gameType === MjClient.GAME_TYPE.ML_HONGZHONG_ZERO ||
        MjClient.gameType === MjClient.GAME_TYPE.CHEN_ZHOU ||
        MjClient.gameType === MjClient.GAME_TYPE.YUAN_JIANG_MJ ||
        MjClient.gameType === MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI||
        MjClient.gameType === MjClient.GAME_TYPE.CHAO_GU_MJ ||
        MjClient.gameType === MjClient.GAME_TYPE.TY_HONGZHONG ||
        MjClient.gameType === MjClient.GAME_TYPE.TY_ZHUANZHUAN ||
        MjClient.gameType === MjClient.GAME_TYPE.CHANG_SHA ||
        MjClient.gameType === MjClient.GAME_TYPE.CHANG_SHA_ER_REN ||
        MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_MJ ||
        MjClient.gameType === MjClient.GAME_TYPE.NAN_XIAN_MJ ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
        MjClient.gameType === MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
        MjClient.gameType === MjClient.GAME_TYPE.HUAI_AN_ERZ ||
        MjClient.gameType === MjClient.GAME_TYPE.HAI_AN_MJ ||
        MjClient.gameType === MjClient.GAME_TYPE.XUE_ZHAN ||
        MjClient.gameType === MjClient.GAME_TYPE.XUE_LIU ||
        MjClient.gameType === MjClient.GAME_TYPE.HAI_AN_BAI_DA ||
        MjClient.gameType === MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN ||
        MjClient.gameType === MjClient.GAME_TYPE.HUAI_AN_CC ||
        MjClient.gameType === MjClient.GAME_TYPE.HZ_TUI_DAO_HU||
        MjClient.gameType === MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN ||
        MjClient.gameType === MjClient.GAME_TYPE.DA_NING_SHUAI_JIN ||
        MjClient.gameType === MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG ||
        MjClient.gameType === MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU ||
        MjClient.gameType === MjClient.GAME_TYPE.FAN_SHI_XIA_YU ||
        MjClient.gameType === MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO ||
        MjClient.gameType === MjClient.GAME_TYPE.LEI_YANG_GMJ ||
        MjClient.gameType === MjClient.GAME_TYPE.FEN_YANG_QUE_MEN ||
        MjClient.gameType === MjClient.GAME_TYPE.DA_TONG_GUAI_SAN_JIAO||
        MjClient.gameType === MjClient.GAME_TYPE.LUAN_GUA_FENG ||
        MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
        MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
        MjClient.gameType === MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
        MjClient.gameType === MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU ||
        MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG ||
        MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG ||
        MjClient.gameType === MjClient.GAME_TYPE.HE_JIN_KUN_JIN ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_SHUI_MJ ||
        MjClient.gameType === MjClient.GAME_TYPE.YI_YANG_MA_JIANG ||
        MjClient.gameType === MjClient.GAME_TYPE.LIAN_YUN_GANG ||
        MjClient.gameType === MjClient.GAME_TYPE.GUAN_NAN ||
        MjClient.gameType === MjClient.GAME_TYPE.XIN_PU_HZ ||
        MjClient.gameType === MjClient.GAME_TYPE.SI_YANG ||
        MjClient.gameType === MjClient.GAME_TYPE.XIN_SI_YANG ||
        MjClient.gameType === MjClient.GAME_TYPE.SI_YANG_HH ||
        MjClient.gameType === MjClient.GAME_TYPE.GAN_YU ||
        MjClient.gameType === MjClient.GAME_TYPE.SU_QIAN ||
        MjClient.gameType === MjClient.GAME_TYPE.GUAN_YUN ||
        MjClient.gameType === MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG)
    {
        return true;
    }
    return false;

}

//点击当前这张牌是否需要提示，听那些牌
function isNeedShowTingCard()
{
    if(MjClient.clickTing || isNeedShowTing())
    {
        return true;
    }
    return false;
}


//检测有没有花 春夏秋冬梅兰竹菊
function RequestFlower8()
{
    var pl = getUIPlayer(0);
    if(pl)
    {

        function canFlower(hand)
        {
            for(var i=0;i<hand.length;i++)
            {
                if(MjClient.majiang.isFlower8(hand[i]))
                {
                    return hand[i];
                }
            }
            return -1;
        }
        return canFlower(pl.mjhand);
    }
    return -1;
}

//检测有没有花 春夏秋冬梅兰竹菊中发白
function RequestFlower20()
{
    var pl = getUIPlayer(0);
    if(pl)
    {

        function canFlower(hand)
        {
            for(var i=0;i<hand.length;i++)
            {
                if(MjClient.majiang.isFlower20(hand[i]))
                {
                    return hand[i];
                }
            }
            return -1;
        }
        return canFlower(pl.mjhand);
    }
    return -1;
}

//出牌
function PutOutCard(cdui, cd)
{
    if (MjClient.rePlayVideo != -1)
    {
        return;
    }

    if(cdui.isNew)
    {
        MjClient.newCard = null; //打出去的是新摸的这张牌
        cdui.isNew = false;

    }

    if(COMMON_UI3D.is3DUI())
    {
        return COMMON_UI3D.PutOutCard3D(cdui,cd);
    }
    MjClient.playui.jsBind.BtnPutCard._node.stopAllActions(); //修复抓花后自摸时自动打出bug

    /*
     临时提高层级是为了在DealMJPut中RemoveNodeBack删除打出去的这张牌时，能准确找到选中的这张牌。
     如果不提高层级，mjhand里面如果有相同的两张牌时，就会删掉另一张不是用户操作的牌
     */
    cdui.zIndex = 500;

    var children = cdui.parent.children;
    var mjhandNum = 0;
    for(var i = 0; i < children.length; i++)
    {
        if(children[i].name == "mjhand")
        {
            mjhandNum++;
        }
    }



    //cardPutted = true;
    var pl = getUIPlayer(0);
    var tData = MjClient.data.sData.tData;

    if (mjhandNum == pl.mjhand.length)
    {
        var mjputMsg = {
            cmd: "MJPut",
            card: cd,
            tingAfterPut: MjClient.clickTing
        };
        cc.log("yingkouCache",MjClient.yingkouCache);
        if ("yingkouCache" in MjClient) {
            mjputMsg.yingkou = MjClient.yingkouCache;
        }

        MjClient.gamenet.request("pkroom.handler.tableMsg", mjputMsg);

        var pl = getUIPlayer(0);
        //if(pl.isTing) return;
        var putnum = pl.mjput.length;
        var tingIndex = pl.tingIndex;//沭阳麻将需要
        if(cc.isUndefined(tingIndex) || !pl.isTing)
        {
            tingIndex = -1;//为了不报错;
        }

        var out0 = cdui.parent.getChildByName("out0");
        var out1 = cdui.parent.getChildByName("out1");
        var out2 = cdui.parent.getChildByName("out2");

        var out;
        var maxNum = 11;

        if (isCanChangePlayerNum() && MjClient.MaxPlayerNum == 2)
        {
            maxNum = 20;
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN)
        {
            maxNum = 10;
        }
        else if((MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN || MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG
            || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG) && MjClient.MaxPlayerNum == 2){
            maxNum = 25;
        }
        else if(isJinZhongAPPType())
        {
            maxNum = 10;
        }


        if(isJinZhongAPPType())
        {
            if (putnum >= maxNum*5)
            {
                out = out2;
            }
            else if (putnum >= maxNum*4)
            {
                out = out1;
            }
            else if (putnum >= maxNum*3)
            {
                out = out0;
            }
            else if (putnum >= maxNum*2 && out2 )
            {
                out = out2;
            }
            else if (putnum >= maxNum)
            {
                out = out1;
            }
            else
            {
                out = out0;
            }
        }
        else {
            if (putnum >= maxNum*2 && out2 )
            {
                out = out2.clone();
            }
            else if (putnum >= maxNum)
            {
                out = out1.clone();
            }
            else
            {
                out = out0.clone();
            }
        }

        setCardSprite(out, cd, 0); //加这句是为了根dealwithPut 的scale 大小保持一致
        var oSize = out.getSize();
        var oSc = out.getScale()*1.3;

        if(MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN)
        {
            var doubleCard;
            if (putnum >= maxNum*5)
            {
                putnum -= maxNum*5;
                tingIndex -= maxNum*5;
                doubleCard = true;
            }
            else if (putnum >= maxNum*4)
            {
                putnum -= maxNum*4;
                tingIndex -= maxNum*4;
                doubleCard = true;
            }
            else if (putnum >= maxNum*3)
            {
                putnum -= maxNum*3;
                tingIndex -= maxNum*3;
                doubleCard = true;
            }
            else if (putnum >= maxNum*2)
            {
                putnum -= maxNum*2;
                tingIndex -= maxNum*2;
                doubleCard = false;
            }
            else if(putnum >= maxNum)
            {
                putnum -= maxNum;
                tingIndex -= maxNum;
                doubleCard = false;
            }
        }
        else {
            if (putnum > maxNum*2 - 1 && out2) // 为了 保持跟dealmjput 一致
            {
                out.x = out2.x;
                out.y = out2.y;
                putnum -= maxNum*2;
                tingIndex -= maxNum*2;
            }
            else if (putnum > maxNum - 1)
            {
                out.x = out1.x;
                out.y = out1.y;
                putnum -= maxNum;
                tingIndex -= maxNum;
            }
        }



        var addWide =  0;
        if(tingIndex <= putnum && tingIndex >= 0)
        {
            if(MjClient.gameType == MjClient.GAME_TYPE.SHU_YANG) //沭阳麻将才需要听牌后隔开一个位置，by sking 2018.9.11
            {
                addWide =  oSize.width * oSc *0.91;
            }
        }
        var ws = cc.director.getWinSize();
        var endPoint = cc.p(0, 0);
        endPoint.y = out.y;
        if(MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN && doubleCard == true)
        {
            endPoint.y = out.y+10;
        }

        var _outBetween = 0.91
        if(isJinZhongAPPType())
        {
            _outBetween = 0.92
        }

        var arg = 1.0;
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
            arg *= 1.05;

        endPoint.x = out.x + oSize.width * oSc * arg * putnum*_outBetween + addWide;

        var Midpoint = cc.p(0, 0);
        Midpoint.x = ws.width / 2;
        Midpoint.y = ws.height * 0.3;
        cdui.zIndex = out.zIndex; //????????? why ???  remarked by sking
        //增加出牌过程状态, 麻将在空中, node.isOuting = true; node.name = mjhand;
        cdui.isOuting = true;
        cdui.name = "out"; //为什么要临时改下名字，因为在刷贴图的时候，根据name来刷的 by sking 2018.10.30
        setCardSprite(cdui,cd,0);
        cc.log("======PUTOUTCARD======= ");

        //宁乡开王麻将封东时打出的是牌背
        if(MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG && getUIPlayer(0).fengDong){
            cdui.loadTexture(getNewMJBgFile("playing/MJ/Mj_04.png"));
            cdui.removeAllChildren();
        }

        cdui.addTouchEventListener(function () {});  

        if (MjClient.gameType == MjClient.GAME_TYPE.XU_ZHOU)
        {
            cdui.runAction(cc.sequence(cc.spawn(cc.moveTo(0.1, endPoint), cc.scaleTo(0.1, oSc)), cc.callFunc(function () {
                clearCurrentPutTag();
                addCurrentPutTag(cdui, 0);
                cdui.isOuting = false;
            }))).setTag(20180131);
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ )
        {
            if(MjClient.rePlayVideo == -1)
            {
                cdui.setScale(cdui.getScale()*1.2);
                cdui.zIndex = 200;
                cdui.runAction(cc.sequence(cc.spawn(cc.moveTo(0.1, Midpoint), cc.scaleTo(0.1, 2*oSc)),cc.callFunc(function(){
                    cdui.isOuting = false;
                }))).setTag(20180131);
                clearCurrentPutTag();
            }
        }
        else if ((isJinZhongAPPType()) && COMMON_UI.isPutScale)
        {
            cdui.runAction(cc.sequence(cc.spawn(cc.moveTo(0.2, endPoint), cc.scaleTo(0.1, oSc)), cc.callFunc(function(){
                clearCurrentPutTag();
                addCurrentPutTag(cdui, 0);
                cdui.isOuting = false;
            })));
            //.setTag(20180131)
        }
        else
        {
            //if(MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ)
            {
                //为了保证，putOutCard 提前打出去的牌跟 dealMjput创建的牌一致，作此处理 by sking 2018.10.30
                var _copycdui = cdui.clone();
                cdui.getParent().addChild(_copycdui);
                setCardSprite(_copycdui,cd,0);
                _copycdui.zIndex = out.zIndex;
                _copycdui.setPosition(endPoint);
                _copycdui.visible = true;
                addCurrentPutTag(_copycdui, 0);
                _copycdui.setScale(oSc);
                cdui.visible = false;
                _copycdui.name = "copycdui";
            }


            cdui.zIndex = out.zIndex + 200;
            cdui.setPosition(endPoint);
            cdui.setScale(oSc);
            clearCurrentPutTag();
            cdui.isOuting = false;
            addCurrentPutTag(cdui, 0);


        }
        //自己出牌时前端先行
        COMMON_UI.BeforehandSelfPutOutCard(cd);

        showMJOutBig(cdui.parent, cd, 0);

        //标记着这张打出去的牌，在服务器回调 DealMjput (海安，通用，山西，徐州) 会删除这张标记的牌 by sking  2018.9.13
        cdui.name = "putOutCard";
    }

    //出牌的时候，听，按钮消失
    var eat = MjClient.playui.jsBind.eat;
    if(eat.guo._node)
    {
        eat.guo._node.visible = false;
    }
    if(eat.ting._node)
    {
        eat.ting._node.visible = false;
    }

    /*
     出牌，清除过胡标志
     */
    if (MjClient.gameType != MjClient.GAME_TYPE.SHU_YANG)
    {
        if (!pl.isQiHu ) {
            var _skipHuIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipHuIconTag");
            if(_skipHuIconNode)
                _skipHuIconNode.visible = false;
            var _skipPengIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipPengIconTag");
            if(_skipPengIconNode)
                _skipPengIconNode.visible = false;
        }
    }

    // if(MjClient.getAppType() != MjClient.APP_TYPE.QXJSMJ)
    // {
    //     cdui.name = "putOutCard";
    // }
    //if(MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ
    //    || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP)    //所有麻将打出牌后提前对手牌排序 前端先行 add by sking 2018.9.6
    {
        if(MjClient.rePlayVideo == -1)
        {
            if(!MjClient.clickTing && COMMON_UI.isChaPai && MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_LI_SI)
            {
                COMMON_UI.afterMjputAnimation();
            }
            else
            {
                MjClient.playui.CardLayoutRestore(getNode(0), 0);
            }
        }
    }
}


//处理出牌,放一张牌，打牌动作
function DealMJPut(node, msg, off, outNum)
{
    // cc.log("~DealMJPut() === off ===" + off);
    // cc.log("~DealMJPut() === msg:" + JSON.stringify(msg));
    
    //断线重连 起手胡 不消失
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var noNeedOutBig = false;
    if (msg && msg.isAfterGang || MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG && getUIPlayer(off) && getUIPlayer(off).fengDong){ 
        //开杠的和宁乡开王麻将封东的 不需要出牌放大
        noNeedOutBig = true;
    }

    try{
        if (typeof QiShouHuNode != "undefined") {
            for (var i = 0; i < 20; i++) {
                if (QiShouHuNode && QiShouHuNode["qshuNode_" + i]) {
                    if (cc.sys.isObjectValid(QiShouHuNode["qshuNode_" + i]))
                        QiShouHuNode["qshuNode_" + i].removeFromParent();
                    QiShouHuNode["qshuNode_" + i] = null;
                }

                if (QiShouHuNode && QiShouHuNode["nodeQSH_" + i]) {
                    QiShouHuNode["nodeQSH_" + i].showNum = 0;
                    QiShouHuNode["nodeQSH_" + i].uid = null;
                }

            }
        }
    }catch(e){
        cc.log(" warning : ",e);
    }
    
    

    RemoveNodeBack(node, "copycdui", 1, msg.card);//在putOutCard 函数里被创建

    if(COMMON_UI3D.is3DUI()) return COMMON_UI3D.DealMJPut_3D(node, msg, off, outNum);
    //cardPutted = false;
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    var uids = tData.uids;
    var selfIndex = getPlayerIndex(off);
    if(uids[selfIndex] == msg.uid)
    {
        var pl = sData.players[msg.uid];
        var putnum = outNum >= 0 ? outNum : (pl.mjput.length - 1);
        var tingIndex = pl.tingIndex;//沭阳麻将需要


        if(cc.isUndefined(tingIndex) || !pl.isTing)
        {
            tingIndex = -1;//为了不报错;
        }

        var out0 = node.getChildByName("out0");
        var out1 = node.getChildByName("out1");
        var out2 = node.getChildByName("out2");

        var out0_self = getNode(0).getChildByName("out0");
        var out1_self = getNode(0).getChildByName("out1");
        var out2_self = getNode(0).getChildByName("out2");

        var maxNum = 11;
        if (isCanChangePlayerNum())
        {
            if (MjClient.MaxPlayerNum == 2)
                maxNum = 20;
            else if (MjClient.MaxPlayerNum == 3 && off != 0)
                maxNum = 13;
        }
        // if(MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN || MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG
        //   || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG){
        //     maxNum = 11;
        // }
        var out;
        var out_self;
        if (putnum >= maxNum*2 && out2)
        {
            out = out2.clone();
            out_self = out2_self.clone();
        }
        else if(putnum >= maxNum)
        {
            out = out1.clone();
            out_self = out1_self.clone();
        }
        else
        {
            out = out0.clone();
            out_self = out0_self.clone();
        }

        //out = CommonPool.getFromPool("out");
        //if (!out) {
        //    out = out0.clone();
        //}else{
        //    COMMON_UI.CopyProperties(out, out0);
        //    cc.log("COMMON_UI.CopyProperties(out, out0);");
        //}

        out.name = "out";
        setCardSprite(out, msg.card, off);
        out.setScale(out.getScale()*1.3);
        out_self.setScale(out_self.getScale()*1.3);
        var oSize = out.getSize();
        var oSc = out.getScale();

        if (off == 0 && putnum >= maxNum * 2 && out2)
        {
            node.addChild(out);
        }
        else if (off == 0 && putnum >= maxNum)
        {
            node.addChild(out, 1);
        }
        else if(off == 1 || off == 0)
        {
            node.addChild(out, 200 - putnum);
        }
        else if(off == 2 || off == 3)
        {
            node.addChild(out, putnum);
        }
        else
        {
            node.addChild(out);
        }

        for(var i = 0; i < node.children.length; i++)
        {
            if(node.children[i].name == "newout")
            {
                node.children[i].name = "out";
            }
        }

        out.visible = true;
        if (MjClient.gameType == MjClient.GAME_TYPE.GUAN_NAN || MjClient.gameType == MjClient.GAME_TYPE.HUAI_AN_ERZ)
        {
            if (tingIndex >= 0 && tingIndex == putnum)
                out.isShowTing = true;
        }

        //2D 听啤后打出那张牌的处理 by sking
        if (MjClient.GAME_TYPE.SI_YANG == MjClient.gameType) {
            var idx = pl.putCardAfterTing;
            if (idx >= 0 && tingIndex == putnum) {
                out.setColor(cc.color(240, 230, 140));
            }
        }


        //宁乡开王麻将封东时摸的是牌背
        if(MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG && getUIPlayer(off) && getUIPlayer(off).fengDong && cc.isUndefined(outNum)){
            if(off == 0 || off == 2){
                out.loadTexture(getNewMJBgFile("playing/MJ/Mj_04.png"));
            }else{
                out.loadTexture(getNewMJBgFile("playing/MJ/Mj_06.png"));
            }
            out.removeAllChildren();
        }

        var endPoint = cc.p(0, 0);
        var Midpoint = cc.p(0, 0);
        var ws = cc.director.getWinSize();
        var lineNum = 1; // 记录当前出牌显示的行数，默认第一行
        if (putnum > maxNum*2 - 1 && out2)
        {
            out.x = out2.x;
            out.y = out2.y;
            putnum -= maxNum*2;
            tingIndex -= maxNum*2;
            lineNum = 3;
        }
        else if (putnum > maxNum - 1)
        {
            out.x = out1.x;
            out.y = out1.y;
            putnum -= maxNum;
            tingIndex -= maxNum;
            lineNum = 2;
        }


        //是否需要变宽
        var addWide =  0;
        if (tingIndex <= putnum && tingIndex >= 0 && MjClient.gameType != MjClient.GAME_TYPE.GUAN_NAN && MjClient.gameType != MjClient.GAME_TYPE.HUAI_AN_ERZ){
            if(off == 0 || off == 2)
            {
                addWide =  oSize.width * oSc *0.91;
            }
            else if (off  == 1 || off == 3)
            {
                addWide =  oSize.height * oSc *0.7;
            }
        }

        var arg = 1.0
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
            arg *= 1.05;


        if(off == 0)
        {
            endPoint.y = out.y;
            endPoint.x = out.x + oSize.width * oSc * arg * putnum*0.91 + addWide;

            if (isIPad()) {
                var ax = ws.height/1024;
                var ay = ws.height/768;
                endPoint.x = endPoint.x + 20 * ax;
                out.zIndex = 100 - putnum;
                endPoint.y = lineNum > 1 ? endPoint.y - 8 * ay : endPoint.y;
            }

            if(!(outNum >= 0))
            {
                if((MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG || MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
                    MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG || MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG)
                    && msg.isAfterGang)
                {

                }else{
                    if(RemoveNodeBack(node, "putOutCard", 1, msg.card) == 0)
                    {
                        RemoveNodeBack(node, "mjhand", 1, msg.card);
                    }
                }
            }

            Midpoint.x = ws.width / 2;
            Midpoint.y = ws.height * 0.3;
        }
        else if (off == 1)
        {
            if(!(outNum >= 0))
            {
                if((MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG || MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
                    MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG || MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG)
                    && msg.isAfterGang)
                {

                }else{
                    if (MjClient.rePlayVideo == -1)
                        RemoveFrontNode(node, "standPri", 1);
                    else//回放
                        RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
                }
            }
            cc.log("DealMJPut remove card  = " + msg.card);
            endPoint.y = out.y + oSize.height * oSc * arg * putnum * 0.7 + addWide;
            endPoint.x = out.x;

            if (isIPad()) {
                var ay = ws.height/768;
                endPoint.y = endPoint.y + 20 * ay;
            }

            Midpoint.x = ws.width*0.78;
            Midpoint.y = ws.height*0.57;
            out.zIndex = 100 - putnum;
        }
        else if(off == 2)
        {
            if(!(outNum >= 0))
            {
                if((MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG || MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
                    MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG || MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG)
                    && msg.isAfterGang)
                {

                }else{
                    if (MjClient.rePlayVideo == -1)
                        RemoveFrontNode(node, "standPri", 1);
                    else//回放
                        RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
                }
            }

            endPoint.y = out.y;
            endPoint.x = out.x - oSize.width * oSc * arg * putnum*0.91 - addWide;

            if (isIPad()) {
                var ax = ws.height/1024;
                var ay = ws.height/768;
                endPoint.x = endPoint.x - 20 * ax;
                out.zIndex = 100 - putnum - lineNum;
                endPoint.y = lineNum > 1 ? endPoint.y + 5 * ay : endPoint.y;
            }

            Midpoint.x = ws.width / 2;
            Midpoint.y = ws.height / 4 * 3;
        }
        else if (off == 3)
        {
            if(!(outNum >= 0))
            {
                if((MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG || MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
                    MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG || MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG)
                    && msg.isAfterGang)
                {

                }else{
                    if (MjClient.rePlayVideo == -1)
                        RemoveNodeBack(node, "standPri", 1);
                    else
                        RemoveNodeBack(node, "mjhand_replay", 1, msg.card);
                }
            }

            endPoint.y = out.y - oSize.height * oSc * arg * putnum * 0.7 - addWide;
            endPoint.x = out.x;

            if (isIPad()) {
                var ay = ws.height/768;
                endPoint.y = MjClient.MaxPlayerNum === 3 ? endPoint.y + 120 * ay : endPoint.y - 25 * ay;
            }

            Midpoint.x = ws.width*(1- 0.78);
            Midpoint.y = ws.height * 0.57;
            out.zIndex = putnum;
        }


        if(outNum >= 0) //重连
        {
            //cc.log("==================tData = "+ JSON.stringify(tData));
            //断线重连的时候
            if (tData.lastPutCard == msg.card && tData.lastPutPlayer == tData.uids.indexOf(msg.uid))
            {
                out.x = endPoint.x;
                out.y = endPoint.y;
                clearCurrentPutTag();
                addCurrentPutTag(out, off);
            }

            if((outNum == pl.mjput.length - 1) && tData.curPlayer == selfIndex && tData.tState == TableState.waitEat)
            {

            }
            else
            {
                out.x = endPoint.x;
                out.y = endPoint.y;
                return;
            }
        }
        else //打牌
        {
            clearCurrentPutTag();
            addCurrentPutTag(out, off);
        }

        var zoder = out.zIndex;
        out.visible = false;
        if(COMMON_UI.isPutScale && off != 0 && !noNeedOutBig)
        {
            out.zIndex = 200;
            out.x = Midpoint.x;
            out.y = Midpoint.y;
            out.scale = 2 * oSc;
        }
        else
        {
            out.x = endPoint.x;
            out.y = endPoint.y;
            out.scale = oSc;
        }

        out.name = "newout";


        //var outAction = CommonPool.getFromPool("outAction");
        //if (!outAction) {
        //    outAction = out.clone();
        //}else{
        //    COMMON_UI.CopyProperties(outAction, out);
        //    cc.log("COMMON_UI.CopyProperties(outAction, out);");
        //}

        var outAction = null;
        if (off != 0 && COMMON_UI.isPutScale && !noNeedOutBig){
            outAction = out_self.clone();
            setCardSprite(outAction, msg.card, 0);
        }
        else {
            outAction = out.clone();
        }

        outAction.name = "outAction";
        outAction.visible = true;
        node.addChild(outAction);

        if(COMMON_UI.isPutScale && off != 0 && !noNeedOutBig)
        {
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                outAction.zIndex = 200;
                outAction.scale = 0.2*oSc;
                outAction.setPosition(Midpoint);
                clearCurrentPutTag();
                outAction.runAction(cc.scaleTo(0.2, 2 * oSc));
            } else {
                outAction.zIndex = 200;
                outAction.scale = 2*oSc;
                outAction.setPosition(Midpoint);
                clearCurrentPutTag();
            }
        }
        else
        {
            outAction.scale = oSc;
            outAction.zIndex = zoder;
            outAction.setPosition(endPoint);
            setCardSprite(outAction, msg.card, off);
        }

        //宁乡开王麻将封东时摸的是牌背
        if(MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG && getUIPlayer(off) && getUIPlayer(off).fengDong && cc.isUndefined(outNum)){
            if(off == 0 || off == 2){
                outAction.loadTexture(getNewMJBgFile("playing/MJ/Mj_04.png"));
            }else{
                outAction.loadTexture(getNewMJBgFile("playing/MJ/Mj_06.png"));
            }
            outAction.removeAllChildren();
        }

        addCurrentPutTag(outAction, off);

        var putTime = Date.now();
        var RemovePutCardScale = function (onlySelf)
        {
            if (!cc.sys.isObjectValid(outAction))
            {
                return;
            }

            if (!onlySelf)
            {
                var _delayTime = 0.8;
                // if(off == 0) _delayTime = 0.4;

                var delayNum = _delayTime - (Date.now() - putTime) / 1000;
                if (delayNum < 0)
                {
                    delayNum = 0;
                }

                cc.log("---------delayNumdelayNumdelayNum------- " + delayNum);
                outAction.runAction(cc.sequence(
                    cc.delayTime(delayNum),
                    cc.callFunc(function()
                    {
                        if (cc.sys.isObjectValid(out))
                        {
                            out.visible = true;
                            out.runAction(cc.sequence(
                                cc.spawn(cc.moveTo(0.1, endPoint), cc.scaleTo(0.1, oSc)),
                                cc.callFunc(function(){
                                    addCurrentPutTag(out, off);
                                    out.setPosition(endPoint);
                                    out.setScale(oSc);
                                    out.zIndex = zoder;
                                })
                            ));
                        }
                        //CommonPool.putInPool(outAction);
                        //outAction.removeFromParent();
                    }),
                    cc.removeSelf()
                ));
            }
            else
            {
                clearCurrentPutTag();
                //CommonPool.putInPool(outAction);
                outAction.removeFromParent();
            }
        }

        function RemovePutCard(onlySelf)
        {   
            if(COMMON_UI.isPutScale && off != 0 && !noNeedOutBig)
            {
                return RemovePutCardScale(onlySelf);
            }
            if (cc.sys.isObjectValid(outAction))
            {
                //CommonPool.putInPool(outAction);
                outAction.removeFromParent();
            }
            if (!onlySelf)
            {
                out.visible = true;
                out.zIndex = zoder;
            }
            else
            {
                clearCurrentPutTag();
            }
        }

        var outActionBind =
            {
                _event:
                    {
                        waitPut: function()
                        {
                            RemovePutCard(false)
                        },
                        MJChi: function()
                        {
                            RemovePutCard(true)
                        },
                        MJPeng: function()
                        {
                            RemovePutCard(true)
                        },
                        MJGang: function()
                        {
                            RemovePutCard(true)

                        },
                        roundEnd: function()
                        {
                            var num = MjClient.CheckPlayerCount(function(p) {
                                if (p.winone == 0) {
                                    return true;
                                }
                                return false;
                            });
                            if (num != MjClient.MaxPlayerNum) // 荒庄不移除打出去的牌
                                RemovePutCard(true)
                        },
                        MJFlower: function () {
                            RemovePutCard(false);
                        }
                    }
            }

        BindUiAndLogic(outAction, outActionBind);

        var pl = getUIPlayer(0);
        if(off == 0 &&!pl.isTing &&  MjClient.rePlayVideo == -1 && COMMON_UI.isChaPai && !pl.trust)
        {
            //正常游戏时,在putOutCard函数里面，已经提前处理了，此处不用再处理，by sking 2018.9.25
        }
        else
        {
            if (!(outNum >= 0))
            {
                if( cc.sys.isObjectValid(MjClient.playui) )   MjClient.playui.CardLayoutRestore(node, off);
            }
        }

        if (off != 0)
        {
            showMJOutBig(node, msg.card, off);
        }
    }
}

//处理出牌,放一张牌，打牌动作,山西APP用的
function DealMJPut_shanXiApp(node, msg, off, outNum)
{
    cc.log("~DealMJPut_shanXiApp() === off ===" + off);
    cc.log("~DealMJPut_shanXiApp() === msg:" + JSON.stringify(msg));
    if(off == 0) RemoveNodeBack(node, "copycdui", 1, msg.card);//在putOutCard 函数里被创建
    if(COMMON_UI3D.is3DUI())
        return  COMMON_UI3D.DealMJPut_shanXiApp3D(node, msg, off, outNum);


    //cardPutted = false;
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    //cc.log("========================"+JSON.stringify(sData)+'!!'+JSON.stringify(tData));
    var uids = tData.uids;
    var selfIndex = getPlayerIndex(off);
    if(uids[selfIndex] == msg.uid)
    {
        var pl = sData.players[msg.uid];
        var putnum = outNum >= 0 ? outNum : (pl.mjput.length - 1);
        var tingPutNum = putnum;
        var tingIndex = pl.tingIndex;//沭阳麻将需要

        cc.log( off + "------------- putnum =" + putnum);
        cc.log("------------- tingPutNum =" + tingPutNum);

        if(cc.isUndefined(tingIndex) || !pl.isTing)
        {
            tingIndex = -1;//为了不报错;
        }


        var out0 = node.getChildByName("out0");
        var out1 = node.getChildByName("out1");
        var out2 = node.getChildByName("out2");

        var out0_self = getNode(0).getChildByName("out0");
        var out1_self = getNode(0).getChildByName("out1");
        var out2_self = getNode(0).getChildByName("out2");


        var maxNum = 10;
        if (MjClient.MaxPlayerNum == 2)
            maxNum = 20;
        else if (MjClient.MaxPlayerNum == 3 && off != 0)
            maxNum = 13;


        var out;
        var out_self;
        if (putnum >= maxNum*2 && out2)
        {
            out = out2.clone();
            out_self = out2_self.clone();
        }
        else if(putnum >= maxNum)
        {
            out = out1.clone();
            out_self = out1_self.clone();
        }
        else
        {
            out = out0.clone();
            out_self = out0_self.clone();
        }

        // 消除牌背资源尺寸不一致，导致出牌时牌会闪烁的问题
        if (isJinZhongAPPType() && off == 0) {
            var type = getCurrentMJBgType();
            if (type == 0) {
                out.loadTexture("playing/MJ/Mj_up_2.png");
                out_self.loadTexture("playing/MJ/Mj_up_2.png");
            }
            else if (type == 1) {
                out.loadTexture("playing/MJ/MJBg1/Mj_up_2.png");
                out_self.loadTexture("playing/MJ/MJBg1/Mj_up_2.png");
            }
            else if (type == 2) {
                out.loadTexture("playing/MJ/MJBg2/Mj_up_2.png");
                out_self.loadTexture("playing/MJ/MJBg2/Mj_up_2.png");
            }
            else if (type == 3) {
                out.loadTexture("playing/MJ/MJBg3/Mj_up_2.png");
                out_self.loadTexture("playing/MJ/MJBg3/Mj_up_2.png");
            }
            out.ignoreContentAdaptWithSize(true);
            out_self.ignoreContentAdaptWithSize(true);
        }

        //out = CommonPool.getFromPool("out");
        //if (!out) {
        //    out = out0.clone();
        //}else{
        //    COMMON_UI.CopyProperties(out, out0);
        //    cc.log("COMMON_UI.CopyProperties(out, out0);");
        //}


        out.setScale(out.getScale()*1.3);
        out_self.setScale(out_self.getScale()*1.3);
        var oSize = out.getSize();
        var oSc = out.scale;

        if (off == 0 && putnum >= maxNum * 2 && out2)
        {
            node.addChild(out,putnum + 30);
        }
        else if (off == 0 && putnum >= maxNum)
        {
            node.addChild(out,putnum + 20);
        }
        else if(off == 0)
        {
            node.addChild(out,putnum + 10);
        }
        else if(off == 1 )
        {
            node.addChild(out, putnum);
        }
        else if(off == 2 || off == 3)
        {

            if(MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN && putnum > maxNum*3 - 1)
            {
                node.addChild(out, 100 - putnum);
            }
            else {
                node.addChild(out, 20 - putnum);
            }
        }
        else
        {
            node.addChild(out);
        }

        for(var i = 0; i < node.children.length; i++)
        {
            if(node.children[i].name == "newout")
            {
                node.children[i].name = "out";
            }
        }

        out.visible = true;
        out.name = "out";
        out.istingcard = false; //扣点风嘴子需要这个变量
        var myOff = off;
        if(myOff == 2) myOff = 0;

        cc.log("===============000===========myOff = " + myOff);
        setCardSprite(out, msg.card, myOff);

        //if (MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_MJ)
        {
            var idx = pl.putCardAfterTing;
            if (idx >= 0 && idx == tingPutNum)
            {
                out.istingcard = true;
                if(MjClient.gameType != MjClient.GAME_TYPE.HONG_TONG_WANG_PAI) //洪洞王牌没有这个段代码
                {
                    if (MjClient.rePlayVideo == -1) {
                        if (off == 0) {
                            out.setColor(cc.color(240, 230, 140));
                            if(MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_LI_SI)
                            {
                                out.isFour = true; //立四麻将需要
                                setCardSprite(out, msg.card, myOff);
                            }
                        }
                        else {
                            if(MjClient.gameType == MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN)
                            {
                                if(MjClient.data.sData.tData.areaSelectMode["anting"]){
                                    var _UINode = getNode(off);
                                    var cpnode = _UINode.getChildByName("down");
                                    out.removeAllChildren();
                                    out.loadTexture(cpnode.getRenderFile().file);
                                    unschedulePlayMoveCardOtherSameCardGrey(out);
                                }else{
                                    out.setColor(cc.color(240, 230, 140));
                                }
                            }
                            else if(MjClient.gameType === MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI)
                            {
                                if(MjClient.data.sData.tData.areaSelectMode["tingPaiBuKou"]){
                                    out.setColor(cc.color(240, 230, 140));
                                }else{
                                    var _UINode = getNode(off);
                                    var cpnode = _UINode.getChildByName("down");
                                    out.removeAllChildren();
                                    out.loadTexture(cpnode.getRenderFile().file);
                                    unschedulePlayMoveCardOtherSameCardGrey(out);
                                }
                            }
                            else
                            {
                                var _UINode = getNode(off);
                                var cpnode = _UINode.getChildByName("down");
                                out.removeAllChildren();
                                out.loadTexture(cpnode.getRenderFile().file);
                                unschedulePlayMoveCardOtherSameCardGrey(out);
                            }
                        }
                    }
                    else//回放
                    {
                        out.setColor(cc.color(240, 230, 140));
                        if(MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_LI_SI)
                        {
                            out.isFour = true; //立四麻将需要
                            setCardSprite(out, msg.card, myOff);
                        }
                    }
                }
            }
        }

        var endPoint = cc.p(0, 0);
        var Midpoint = cc.p(0, 0);
        var ws = cc.director.getWinSize();

        if(MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN && putnum > maxNum*5 - 1)
        {
            out.x = out2.x;
            out.y = out2.y+10;
            putnum -= maxNum*5;
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN && putnum > maxNum*4 - 1)
        {
            out.x = out1.x;
            out.y = out1.y+10;
            putnum -= maxNum*4;
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN && putnum > maxNum*3 - 1)
        {
            out.x = out0.x;
            out.y = out0.y+10;
            putnum -= maxNum*3;
        }
        else if (putnum > maxNum*2 - 1 && out2)
        {
            out.x = out2.x;
            out.y = out2.y;
            putnum -= maxNum*2;
            tingIndex -= maxNum*2;
        }
        else if (putnum > maxNum - 1)
        {
            out.x = out1.x;
            out.y = out1.y;
            putnum -= maxNum;
            tingIndex -= maxNum;
        }


        //是否需要变宽
        var addWide =  0;
        // if (tingIndex <= putnum && tingIndex >= 0 ){
        //     if(off == 0 || off == 2)
        //     {
        //         addWide =  oSize.width * oSc *0.91;
        //     }
        //     else if (off  == 1 || off == 3)
        //     {
        //         // addWide =  oSize.height * oSc *0.73;
        //         addWide =  oSize.height * oSc *0.91;
        //     }
        // }


        var _outWidth = 0.92; //自己 和 对家 打出去的牌的间隙 by sking 2018.10.25

        if(off == 0)
        {
            endPoint.y = out.y;
            endPoint.x = out.x + oSize.width * oSc * putnum*_outWidth + addWide;
            Midpoint.x = ws.width / 2;
            Midpoint.y = ws.height * 0.3;
            if(!(outNum >= 0))
            {
                var pl = getUIPlayer(0);
                // //add by sking 2018.9.6  晋中的打出牌后提前对手牌排序
                if(RemoveNodeBack(node, "putOutCard", 1, msg.card) == 0)
                {
                    RemoveNodeBack(node, "mjhand", 1, msg.card);
                }
            }
        }
        else if (off == 1)
        {
            if(!(outNum >= 0))
            {
                if (MjClient.rePlayVideo == -1)
                {
                    if(MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI)
                    {
                        if (tData.lastPutCard == getUIPlayer(off).hunCard)
                            RemoveNodeBack(node, "standPri", 1);
                        else
                            RemoveFrontNode(node, "standPri", 1);
                    }
                    else
                        RemoveFrontNode(node, "standPri", 1);

                }
                else//回放
                {
                    RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
                }
            }
            cc.log("DealMJPut_haian remove card  = " + msg.card);



            // var bgType = getCurrentMJBgType();
            var cardBetween = 0.7;
            // if(bgType == 0)
            // {
            //     cardBetween = 0.75
            // }

            endPoint.y = out.y + oSize.height * oSc * putnum * cardBetween + addWide;
            endPoint.x = out.x;
            Midpoint.x = ws.width*0.78;
            Midpoint.y = ws.height*0.57;
            out.zIndex = 100 - putnum;
        }
        else if(off == 2)
        {
            if(!(outNum >= 0))
            {
                if (MjClient.rePlayVideo == -1)
                {
                    if(MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI)
                    {
                        if (tData.lastPutCard == getUIPlayer(off).hunCard)
                            RemoveNodeBack(node, "standPri", 1);
                        else
                            RemoveFrontNode(node, "standPri", 1);
                    }
                    else
                    {
                        RemoveFrontNode(node, "standPri", 1);
                    }
                }
                else//回放
                    RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
            }

            endPoint.x = out.x - oSize.width * oSc * putnum*_outWidth - addWide;
            endPoint.y = out.y;
            Midpoint.x = ws.width / 2;
            Midpoint.y = ws.height / 4 * 3;
        }
        else if (off == 3)
        {
            if(!(outNum >= 0))
            {
                if (MjClient.rePlayVideo == -1)
                {
                    if(MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI)
                    {
                        if (tData.lastPutCard == getUIPlayer(off).hunCard)
                            RemoveFrontNode(node, "standPri", 1);
                        else
                            RemoveNodeBack(node, "standPri", 1);
                    }
                    else
                        RemoveNodeBack(node, "standPri", 1);
                }
                else
                    RemoveNodeBack(node, "mjhand_replay", 1, msg.card);
            }

            endPoint.y = out.y - oSize.height * oSc * putnum * 0.7 - addWide;
            endPoint.x = out.x;
            Midpoint.x = ws.width*(1- 0.78);
            Midpoint.y = ws.height * 0.57;
            out.zIndex = putnum;
        }


        if(outNum >= 0) //重连
        {
            // cc.log("==================tData = "+ JSON.stringify(tData));
            //断线重连的时候
            if (tData.lastPutCard == msg.card && tData.lastPutPlayer == tData.uids.indexOf(msg.uid))
            {
                out.x = endPoint.x;
                out.y = endPoint.y;
                clearCurrentPutTag();
                addCurrentPutTag(out, off);
            }

            if((outNum == pl.mjput.length - 1) && tData.curPlayer == selfIndex && tData.tState == TableState.waitEat)
            {

            }
            else
            {
                out.x = endPoint.x;
                out.y = endPoint.y;
                return;
            }
        }
        else //打牌
        {
            clearCurrentPutTag();
            addCurrentPutTag(out, off);
        }


        var zoder = out.zIndex;
        //out.zIndex = 200;
        out.visible = false;
        if(COMMON_UI.isPutScale && off != 0)
        {
            out.zIndex = 200;
            out.x = Midpoint.x;
            out.y = Midpoint.y;
            out.scale = 2 * oSc;
        }
        else
        {
            out.x = endPoint.x;
            out.y = endPoint.y;
            out.scale = oSc;
        }

        out.name = "newout";



        //var outAction = CommonPool.getFromPool("outAction");
        //var muban;
        //if (off != 0 && COMMON_UI.isPutScale) {
        //    muban = out0_self;
        //}else{
        //    muban = out;
        //}
        //if (!outAction) {
        //    outAction = muban.clone();
        //}else{
        //    COMMON_UI.CopyProperties(outAction, muban);
        //    cc.log("COMMON_UI.CopyProperties(outAction, muban);");
        //}
        //if (off != 0 && COMMON_UI.isPutScale) {
        //    outAction.setScale(outAction.getScale()*1.3);
        //}

        var outAction = null;
        if (off != 0 && COMMON_UI.isPutScale){
            outAction = out_self.clone();
            setCardSprite(outAction, msg.card, 0);
        }
        else {
            outAction = out.clone();
            cc.log("==========================myOff = " + myOff);
            //setCardSprite(outAction, msg.card, myOff); //outAction 和 out 的贴图位置不一样
        }


        if (off != 0)
        {
            var idx = pl.putCardAfterTing;
            if (idx >= 0 && idx == tingPutNum) {
                //if(MjClient.gameType != MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN&&
                //    MjClient.gameType != MjClient.GAME_TYPE.DA_NING_SHUAI_JIN)
                outAction.istingcard = true;
                if (MjClient.rePlayVideo == -1)
                {
                    if(MjClient.gameType == MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN)
                    {
                        if(MjClient.data.sData.tData.areaSelectMode["anting"]){
                            var _UINode = getNode(off);
                            var cpnode = _UINode.getChildByName("down");
                            outAction.removeAllChildren();
                            outAction.loadTexture(cpnode.getRenderFile().file);
                            unschedulePlayMoveCardOtherSameCardGrey(outAction);
                        }else{
                            out.setColor(cc.color(240, 230, 140));
                        }
                    }
                    else if(MjClient.gameType === MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI)
                    {
                        if(MjClient.data.sData.tData.areaSelectMode["tingPaiBuKou"]){
                            out.setColor(cc.color(240, 230, 140));
                        }else{
                            var _UINode = getNode(off);
                            var cpnode = _UINode.getChildByName("down");
                            outAction.removeAllChildren();
                            outAction.loadTexture(cpnode.getRenderFile().file);
                            unschedulePlayMoveCardOtherSameCardGrey(outAction);
                        }
                    }
                    else if(MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI)
                    {
                        // var _UINode = getNode(off);
                        // var cpnode = _UINode.getChildByName("down");
                        // outAction.removeAllChildren();
                        // outAction.loadTexture(cpnode.getRenderFile().file);
                        unschedulePlayMoveCardOtherSameCardGrey(outAction);
                    }
                    else
                    {
                        var _UINode = getNode(off);
                        var cpnode = _UINode.getChildByName("down");
                        outAction.removeAllChildren();
                        outAction.loadTexture(cpnode.getRenderFile().file);
                        unschedulePlayMoveCardOtherSameCardGrey(outAction);
                    }
                }
            }
        }

        outAction.name = "outAction";
        outAction.visible = true;

        node.addChild(outAction);

        if(COMMON_UI.isPutScale && off != 0)
        {
            outAction.zIndex = 200;
            outAction.scale = 2*oSc;
            outAction.setPosition(Midpoint);
            clearCurrentPutTag();
        }
        else
        {
            outAction.scale = oSc;
            outAction.zIndex = zoder;
            outAction.setPosition(endPoint);
            addCurrentPutTag(outAction, off);
        }


        var putTime = Date.now();

        var RemovePutCardScale = function (onlySelf)
        {
            MjClient.lastCardposNode = null;//抢杠胡没有牌 可以劈
            if (!cc.sys.isObjectValid(outAction))
            {
                return;
            }

            if (!onlySelf)
            {
                var _delayTime = 0.8;
                // if(off == 0) _delayTime = 0.4;

                var delayNum = _delayTime - (Date.now() - putTime) / 1000;
                if (delayNum < 0)
                {
                    delayNum = 0;
                }

                cc.log("---------delayNumdelayNumdelayNum------- " + delayNum);
                outAction.runAction(cc.sequence(
                    cc.delayTime(delayNum),
                    cc.callFunc(function()
                    {
                        if (cc.sys.isObjectValid(out))
                        {
                            out.visible = true;
                            out.runAction(cc.sequence(
                                cc.spawn(cc.moveTo(0.1, endPoint), cc.scaleTo(0.1, oSc)),
                                cc.callFunc(function(){
                                    addCurrentPutTag(out, off);
                                    out.setPosition(endPoint);
                                    out.setScale(oSc);
                                    out.zIndex = zoder;
                                })
                            ));
                        }
                        //CommonPool.putInPool(outAction);
                        //outAction.removeFromParent();
                    }),
                    cc.removeSelf()
                ));
            }
            else
            {
                clearCurrentPutTag();
                //CommonPool.putInPool(outAction);
                outAction.removeFromParent();
            }
        }



        function RemovePutCard(onlySelf)
        {

            MjClient.lastCardposNode = null;//抢杠胡没有牌 可以劈
            if(COMMON_UI.isPutScale && off != 0)
            {
                return RemovePutCardScale(onlySelf);
            }
            if (cc.sys.isObjectValid(outAction))
            {
                //CommonPool.putInPool(outAction);
                outAction.removeFromParent();
            }
            if (!onlySelf)
            {
                out.visible = true;
                out.zIndex = zoder;
            }
            else
            {
                clearCurrentPutTag();
            }
        }


        var outActionBind =
            {
                _event:
                    {
                        waitPut: function()
                        {
                            RemovePutCard(false)
                        },
                        MJChi: function()
                        {
                            RemovePutCard(true);
                        },
                        MJPeng: function()
                        {
                            RemovePutCard(true);
                        },
                        MJGang: function(eD)
                        {
                            RemovePutCard(true);
                        },
                        roundEnd: function()
                        {
                            RemovePutCard(true);
                        },
                        //MJFlower: function () {
                        //    RemovePutCard(false);
                        //}
                    }
            }


        BindUiAndLogic(outAction, outActionBind);



        var pl = getUIPlayer(0);
        if(off == 0 &&!pl.isTing && !MjClient.clickTing && MjClient.rePlayVideo == -1 && COMMON_UI.isChaPai &&!pl.trust &&  MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_LI_SI)
        {
            //if(MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ)
            //{
            //    COMMON_UI.afterMjputAnimation();
            //}
        }
        else
        {
            if (!(outNum >= 0))
            {
                MjClient.playui.CardLayoutRestore(node, off);
            }

            //add by sking
            if(off == 0 && getUIPlayer(0).mjhand)
            {
                MjClient.playui.CardLayoutRestore(node, off);
            }
        }

        if (off != 0)
        {
            showMJOutBig(node, msg.card, off);
        }
    }
}

/*
 by sking
 */
function getNode(off)
{
    var _node = null;
//    cc.log("~getNode() === off === " + off);
    switch (off)
    {
        case 0:
            _node = MjClient.playui._downNode;
            break;
        case 1:
            _node = MjClient.playui._rightNode;
            break;
        case 2:
            _node = MjClient.playui._topNode;
            break;
        case 3:
            _node = MjClient.playui._leftNode;
            break;
        default:
            break;
    }
    return _node;
}
function clearCurrentPutTag()
{
    var _showSprite = MjClient.playui.jsBind.eat._node.getChildByName("cardShow");
    if (_showSprite)
    {
        _showSprite.setVisible(false);
    }
}

function addCurrentPutTag(cardNode, off)
{
    MjClient.lastCardposNode = cardNode;


    var _showSprite = MjClient.playui.jsBind.eat._node.getChildByName("cardShow");
    if (!_showSprite)
    {
        var _scale = getNode(0).getChildByName("out0").getScale();
        _showSprite = new cc.Sprite();
        var _image = new cc.Sprite("playing/other/sign.png");
        var h = Math.min(cardNode.getBoundingBox().width, cardNode.getBoundingBox().height);
        var a1 = cc.moveBy(0.5,0,h/2).easing(cc.easeCubicActionOut());
        var a2 = cc.moveBy(0.5,0,-h/2).easing(cc.easeCubicActionIn());
        var seq = cc.sequence(a1,a2);
        _image.runAction(seq.repeatForever());
        _image.setPosition(0,0);
        _showSprite.addChild(_image);
        _showSprite.setScale(_scale*1.5);
        _showSprite.setName("cardShow");
        MjClient.playui.jsBind.eat._node.addChild(_showSprite,20);
    }
    _showSprite.setVisible(true);
    _showSprite.setPosition(cardNode.getPositionX(), cardNode.getPositionY()+Math.max(cardNode.getBoundingBox().width, cardNode.getBoundingBox().height)/2);


    if(isIPhoneX() && !COMMON_UI3D.is3DUI()&& off == 3)
    {
        _showSprite.setPosition(cardNode.getPositionX()+ cc.winSize.width*0.09, cardNode.getPositionY()+Math.max(cardNode.getBoundingBox().width, cardNode.getBoundingBox().height)/2);
    }
}



function MJChiCardchange(tag)
{
    if (MjClient.eatpos.length == 0)
        return;


    var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer(0);
    if(pl.mustHu){
        return MjClient.showToast("有胡必胡");
    }


    var eat = MjClient.playui.jsBind.eat;
    var changeuibg = eat.changeui.changeuibg;
    var cardTemplet = changeuibg._node.getChildByName("card");
    var children = changeuibg._node.getChildren().slice();
    for (var i = 0, len = children.length; i < len; i ++)
    {
        if (children[i] != cardTemplet && children[i].getName().indexOf("card") != -1)
            children[i].removeFromParent();
    }

    cc.log("=================================================MjClient.eatpos=========================================" + MjClient.eatpos.length);

    if(MjClient.eatpos.length == 1)
    {
        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA 
            || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN
            || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
            || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO
            || MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG)
        {
            MjClient.majiang.MJChiToServer(MjClient.eatpos[0], tag);
        }else if(MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ){
            // 道州麻将单独处理
            MJChiToServer(0);
        }
        else
        {
            MJChiToServer(MjClient.eatpos[0]);
        }
    }
    else
    {
        eat.chi0._node.visible = false;
        eat.chi1._node.visible = false;
        eat.chi2._node.visible = false;
        eat.peng._node.visible = false;
        eat.gang0._node.visible = false;
        eat.gang1._node.visible = false;
        eat.gang2._node.visible = false;
        eat.hu._node.visible = false;
        eat.guo._node.visible = false;
        changeuibg._node.visible = true;

        var tData = MjClient.data.sData.tData;
        var lastPutCard = tData.lastPutCard;

        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA
            || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN
            || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
            || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO)
        {
            eat.eatSelectPanel._node.visible = false;
            if (tData.lastPutCard2)
                lastPutCard = tag;
        }

        var card = [];
        var width = (cardTemplet.width - 7)*cardTemplet.scaleX;
        var startX = changeuibg._node.width/2 - width;
        for (var i = 0; i < MjClient.eatpos.length; i++)
        {
            for (var j = 0; j < 3; j ++)
            {
                card[j] = cardTemplet.clone();
                var showcard = lastPutCard - MjClient.eatpos[i] + j;
                if(MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ){

                    if(tData.lastPutCard == 71 && tData.lastPutCard != showcard){
                        showcard = tData.hunCard - MjClient.eatpos[i] + j;
                    }else if(i > 0 && MjClient.eatpos[i - 1] == MjClient.eatpos[i] && showcard == tData.hunCard){
                        showcard = 71;
                    }else if(showcard == tData.hunCard){
                        var mjhand = MjClient.data.sData.players[SelfUid()].mjhand;
                        if(mjhand.indexOf(tData.hunCard) < 0 && mjhand.indexOf(71) >= 0){
                            showcard = 71;
                        }
                    }
                }

                setCardSprite(card[j], showcard, 0);
                if (MjClient.eatpos[i] == j)
                    card[j].color = cc.color(255, 255, 0);

                card[j].visible = true;
                card[j].setName("card" + (MjClient.eatpos[i]*3 + j));
                card[j].setPosition(startX + j*width, cardTemplet.y + i*cardTemplet.height*cardTemplet.scaleY);
                if(MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ){
                    card[j].tag = i;
                }
                var img = card[j];
                changeuibg._node.addChild(img);

                card[j].addTouchEventListener(changeuibg._node.chiTouch, card[j]);
            }

            ShowChiCards(changeuibg._node, MjClient.eatpos[i], card[0], card[1], card[2]);
        }

        if (card[0])
            changeuibg._node.height = card[0].y + card[0].height * card[0].scaleY * card[0].anchorY + 8.0;
    }
}

/***
 * 麻将，在可以胡的情况下，点击吃碰杠，二次弹窗提示 -- by Tom
 *
 */
function MJChiPengGangWhenHu() {
    var eat = MjClient.playui.jsBind.eat;
    if (!eat) return;
    if (eat.cancel) eat.cancel._node.visible = false;

    var showFun = function (node)
    {
        var eat = MjClient.playui.jsBind.eat;
        var func = function()
        {
            if (node === eat.peng._node)
            {
                if(MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG){
                    MjClient.majiang.MJPengToServer();
                }else{
                    MJPengToServer();
                }
            }
            if (node === eat.gang0._node || node === eat.gang1._node || node === eat.gang2._node)
            {
                MJGangCardchange();
            }
            if (node === eat.chi0._node || node === eat.chi1._node || node === eat.chi2._node)
            {
                MJChiCardchange();
            }
        };

        if (eat.hu._node.visible && node.visible)
        {
            MjClient.showMsg("确定 不胡 吗?", func, function(){}, "1");
        }
        else if(MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG && eat.hu_qishou._node.visible && node.visible)
        {
            MjClient.showMsg("确定 不胡 吗?", func, function(){}, "1");
        }
        else
            func();

    };


    var node = [eat.chi0._node, eat.chi1._node, eat.chi2._node, eat.gang0._node, eat.gang1._node, eat.gang2._node, eat.peng._node];
    for(var i = node.length - 1; cc.sys.isObjectValid(node[i]); i--)
    {
        node[i].addTouchEventListener(function (sel, tar)
        {
            if(tar === 2) showFun(sel);
        })
    }

}


function MJGangCardchange(tag)
{
    var tData = MjClient.data.sData.tData;

    if(MjClient.gameType == MjClient.GAME_TYPE.BAI_PU_LIN_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.RU_GAO ||
        MjClient.gameType == MjClient.GAME_TYPE.RU_GAO_ER) // 南通长牌走自己的判杠逻辑
    {
        return MJGangCardchange_changpai(tag);
    }
    else if(MjClient.gameType == MjClient.GAME_TYPE.RU_GAO_MJH ||
            MjClient.gameType == MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
    {
        return MJGangCardchange_MJH(tag);
    }


    var gangCards = MjClient.gangCards;
    if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
        MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN ||
        MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ) {
        if (MjClient.playui.isKaiGang && MjClient.kaiGangCards) {
            gangCards = MjClient.kaiGangCards;
        }
    }
    if (gangCards.length == 0)
        return;

    var pl = getUIPlayer(0);
    var tData = MjClient.data.sData.tData;

    if(pl.isZiMoHu && MjClient.gameType != MjClient.GAME_TYPE.AN_HUA_MA_JIANG &&
        MjClient.gameType != MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW &&
        MjClient.gameType != MjClient.GAME_TYPE.NING_XIANG_KAI_WANG &&
        MjClient.gameType != MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG  &&
        MjClient.gameType != MjClient.GAME_TYPE.YI_YANG_MA_JIANG)
    {
        if(MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN
            && MjClient.majiang.canHuAfterGang(pl.mjhand, MjClient.gangCards[0], tData.hunCard))
        {

        }else{
            if(!pl.isCanGang) return MjClient.showToast("必须胡牌");
        }
    }

    if(pl.mustHu && !pl.isCanGang)
    {
        return MjClient.showToast("有胡必胡");
    }
    var eat = MjClient.playui.jsBind.eat;
    var changeuibg = eat.changeui.changeuibg;
    var cardTemplet = changeuibg._node.getChildByName("card");
    var children = changeuibg._node.getChildren().slice();
    for (var i = 0, len = children.length; i < len; i ++)
    {
        if (children[i] != cardTemplet && children[i].getName().indexOf("card") != -1)
            children[i].removeFromParent();
    }
    //安化四王麻将庄家起手杠牌需等待其他玩家报听
    if((MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW || MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG ||
        MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG || MjClient.gameType === MjClient.GAME_TYPE.YI_YANG_MA_JIANG)
        && SelfUid() === tData.uids[tData.zhuang]){
        var sData = MjClient.data.sData;
        var canBaoTingPl = [];
        var isUnableGangWhenTing = false;

        if(MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW){
            for (var uid in sData.players) {
                var pl = sData.players[uid];
                if (tData.allPlayerTingFalg && tData.allPlayerTingFalg[uid]) {
                    canBaoTingPl.push(pl);
                }
            }
            isUnableGangWhenTing = canBaoTingPl.length > 0 && canBaoTingPl.length != tData.canBaotingNum;
        }else{
            isUnableGangWhenTing = tData.canBaotingNum != 0;
        }

        if(tData.tState == TableState.waitPut && isUnableGangWhenTing){
            eat.gang0._node.visible = false;
            eat.gang1._node.visible = false;
            eat.gang2._node.visible = false;
            eat.hu._node.visible = false;
            eat.guo._node.visible = false;
            if (changeuibg._node.visible) {
                changeuibg._node.visible = false;
            }
            if(eat.ting._node){
                hideTingBtn();
            }
            if((MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG
                || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO )&& gangCards.length == 1){
                eat.hu_qishou._node.visible = false;
            }
            //MjClient.showToast("请等待其他玩家是否选择报听！");
        }
    }

    if (gangCards.length == 1)
    {
        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA
            || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN
            || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
            || MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ
            || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO)
        {
            MjClient.majiang.MJGangToServer(gangCards[0], MjClient.playui.isKaiGang);
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG)
        {
            MjClient.majiang.MJGangToServer(gangCards[0]);
        }
        else
        {
            if (MjClient.gameType == MjClient.GAME_TYPE.JING_LE_KOU_DIAN)
            {
                if (MjClient.fgang && MjClient.fgang != -1)
                {
                    MjClient.playui.MJGangToServer(MjClient.fgang,true);
                }
                else
                {
                    MjClient.playui.MJGangToServer(gangCards[0]);
                }
            }
            else
            {
                MJGangToServer(gangCards[0]);
            }
        }
    }
    else
    {
        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA
            || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN
            || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
            || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO
            || MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ)
        {
            eat.eatSelectPanel._node.visible = false;
        }

        eat.chi0._node.visible = false;
        eat.chi1._node.visible = false;
        eat.chi2._node.visible = false;
        eat.peng._node.visible = false;
        eat.gang0._node.visible = false;
        eat.gang1._node.visible = false;
        eat.gang2._node.visible = false;
        eat.hu._node.visible = false;
        eat.guo._node.visible = false;
        eat.ting._node.visible = false;

        if (eat.cancel) {
            eat.cancel._node.visible = false;
        }

        changeuibg._node.visible = true;
        eat.changeui._node.zIndex = 100; //调高层级 by sking

        cc.log("杠牌多选一11111"+JSON.stringify(gangCards))
        var card = null;
        var width = (cardTemplet.width - 7)*cardTemplet.scaleX;
        var startX = changeuibg._node.width/2 - width * 1.5;
        for(var i = 0; i < gangCards.length; i++)
        {
            if (gangCards[i] instanceof Array)
            {
                var gCards = gangCards[i];
                var startX2 = changeuibg._node.width/2 - width * (gCards.length/2 - 0.5);
                for (var j = 0; j < gCards.length; j ++)
                {
                    card = cardTemplet.clone();
                    setCardSprite(card, gCards[j], 4);
                    card.visible = true;
                    card.setName("card" + (i*4 + j));
                    card.setPosition(startX2 + j*width, cardTemplet.y + i*cardTemplet.height*cardTemplet.scaleY);
                    changeuibg._node.addChild(card);

                    if (MjClient.gameType == MjClient.GAME_TYPE.JING_LE_KOU_DIAN)
                    {
                        card.fgang = MjClient.fgang;
                    }
                    card.teshuGangTag = gCards;

                    card.addTouchEventListener(changeuibg._node.gangTouch, card);
                }
            }
            else
            {
                var num = 4;
                if((MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU || MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU) 
                    && tData.chaoTianCard == gangCards[i])
                {
                    num = 3;
                }
                for (var j = 0; j < num; j ++)
                {
                    card = cardTemplet.clone();
                    setCardSprite(card, gangCards[i], 4);
                    card.visible = true;
                    card.setName("card" + (i*4 + j));
                    card.setPosition(startX + j*width, cardTemplet.y + i*cardTemplet.height*cardTemplet.scaleY);
                    changeuibg._node.addChild(card);

                    card.addTouchEventListener(changeuibg._node.gangTouch, card);
                }
            }
        }

        if (card)
            changeuibg._node.height = card.y + card.height * card.scaleY * card.anchorY + 8.0;
    }
}




function RemoveNewCardOut(node)
{
    var children = node.children;
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "newout")
        {
            ci.removeFromParent(true);
        }
    }
}
function  RemoveFrontNode(node, name, num, tag)
{
    var children = node.children;
    for(var i = 0; i < children.length && num > 0; i++)
    {
        var ci = children[i];
        if(ci.name == name && (!(tag > 0) || ci.tag == tag))
        {
            //删除手牌之前先把手牌存在Pool里 by sking 2018.10.17
            if(ci.name == "putOutCard")
            {
                ci.name = "mjhand";
            }

            //CommonPool.putInPool(ci);
            ci.removeFromParent(true);
            num--;
        }
    }

    if(num != 0)
    {
        //mylog(node.name + " RemoveFrontNode fail " + name + " " + tag);
    }
}



function RemoveNodeBack(node, name, num, tag)
{
    if (MjClient.playui && MjClient.playui.RemoveNodeBack)
        return MjClient.playui.RemoveNodeBack(node, name, num, tag);

    var _delCount = 0; //标记是否有删除的牌 add by sking 2018.9.17
    var children = node.children;
    for(var i = children.length - 1; i >= 0 && num > 0; i--)
    {
        var ci = children[i];
        if(ci.name == name && (!(tag > 0) || ci.tag == tag))
        {
            //删除手牌之前先把手牌存在Pool里 by sking 2018.10.17
            if(ci.name == "putOutCard")
            {
                ci.name = "mjhand";
            }

            _delCount++;
            //CommonPool.putInPool(ci);
            ci.removeFromParent(true);

            num--;
        }
    }

    if (num != 0)
    {
        cc.log(node.name + " RemoveNodeBack fail " + name + " " + tag);
    }
    return _delCount;
}

function findNodesBack(node, name, tags) {
    if (MjClient.playui && MjClient.playui.findNodesBack)
        return MjClient.playui.findNodesBack(node, name, tags);
    
    tags = tags.slice();
    var retNodes = [];
    var children = node.children;
    for(var i = children.length - 1; i >= 0; i--)
    {
        var ci = children[i];
        if(ci.name != name)
            continue;
        var index = tags.indexOf(ci.tag);
        if (index < 0)
            continue;

        tags[index] = -1;
        retNodes[index] = ci;
    }

    for (var i = 0; i < tags.length; i ++) {
        if (!retNodes[i])
            mylog(node.name + " findNodesBack fail " + name + " " + tags[i]);
    }
    return retNodes;
}


//人数是否达到最大人数
function IsInviteVisible()
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    if (isJinZhongAPPType()) //晋中app 选座位
    {
        if(TableState.waitJoin == tData.tState && tData.maxPlayer == 4 && Object.keys(sData.players).length == tData.maxPlayer)
        {
            return false;
        }
    }


    if( (TableState.waitJoin == tData.tState || TableState.waitReady == tData.tState )&& !tData.matchId)
    {
        return Object.keys(sData.players).length < tData.maxPlayer;
    }
    else
    {
        return false;
    }
}

// 是否所有人都准备好了
function IsAllPlayerReadyState()
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var isAllReady = true;



    for(var i in sData.players) {
        var pl = sData.players[i];
        if(pl.mjState != TableState.isReady) isAllReady = false;
    }


    //add by sking  2018.8.30人数没满的时候
    if(Object.keys(sData.players).length < MjClient.data.sData.tData.maxPlayer )
    {
        isAllReady = false
    }

    return isAllReady;
}


//转盘显示状态
function IsArrowVisible()
{
    var bRtn = false;

    var pl = getUIPlayer(0);
    if (!pl)
    {
        return bRtn;
    }
    if(
        TableState.waitPut == pl.mjState ||
        TableState.waitEat == pl.mjState ||
        TableState.waitCard == pl.mjState ||
        TableState.roundFinish == pl.mjState ||
        TableState.waitSelect == pl.mjState
    )
    {
        bRtn = true;
    }

    return bRtn;
}




// 清理ui
function clearCardUI(node)
{
    // mylog("clearCardUI");
    var children = node.children;
    for(var i = 0; i < children.length; i++)
    {
        var ni = children[i];
        if(ni.name != "head"
            && ni.name != "up"
            && ni.name != "down"
            && ni.name != "stand"
            && ni.name != "out0"
            && ni.name != "out1"
            && ni.name != "out2"
            && ni.name != "out3"
            && ni.name != "outBig"
            && ni.name != "jinout"
            && ni.name != "out_qshu_layout"
            && ni.getName() != "ready"
            && ni.getName() != "play_tips"
            && ni.getName() != "tai_layout"
            && ni.getName() != "tingCardsNode"
            && ni.getName() != "tingCardNumNode"
            && ni.getName() != "fangTag"
            && ni.name !="ouIcon"
        )
        {
            //CommonPool.putInPool(ni);
            ni.removeFromParent(true);
        }
        else if(ni.getName() == "play_tips")
        {
            InitShowEatActionNode(ni.getParent());
        }
    }


    //清理CommonPool
    //CommonPool.drainAllPools();

    // 清空听牌数据
    //MjClient.canTingCards = null;
    MjClient.isChaPaiPlaying = false;
    clearCurrentPutTag();
    COMMON_UI.clearShowCurrentEatCards();

}




function DealNewCard(node, msg, off,bFirstCard)
{
    /*
     下一次摸牌，过胡标志取消
     */
    if (off === 0
        && MjClient.gameType != MjClient.GAME_TYPE.SHU_YANG
        && MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_MJ
        && MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN
        && MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_LI_SI
        && MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_KD
        && MjClient.gameType != MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI
        && MjClient.gameType != MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN
        && MjClient.gameType != MjClient.GAME_TYPE.HE_JIN_KUN_JIN
        && MjClient.gameType != MjClient.GAME_TYPE.WU_TAI_KOU_DIAN
        && MjClient.gameType != MjClient.GAME_TYPE.LV_LIANG_MA_JIANG
        && MjClient.gameType != MjClient.GAME_TYPE.ZHUO_HAO_ZI
        && MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU
        && MjClient.gameType != MjClient.GAME_TYPE.LING_SHI_BIAN_LONG
        && MjClient.gameType != MjClient.GAME_TYPE.LING_SHI_BAN_MO
        && MjClient.gameType != MjClient.GAME_TYPE.PING_YAO_KOU_DIAN
        && MjClient.gameType != MjClient.GAME_TYPE.PING_YAO_MA_JIANG
        && MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO
        && MjClient.gameType != MjClient.GAME_TYPE.SHOU_YANG_QUE_KA
        && MjClient.gameType != MjClient.GAME_TYPE.PING_YAO_MA_JIANG
        && MjClient.gameType != MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3
        && MjClient.gameType != MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN
        && MjClient.gameType != MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN
        && MjClient.gameType != MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN
        && MjClient.gameType != MjClient.GAME_TYPE.HONG_TONG_WANG_PAI
        && MjClient.gameType != MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN
        && MjClient.gameType != MjClient.GAME_TYPE.DA_NING_SHUAI_JIN
        && MjClient.gameType != MjClient.GAME_TYPE.FEN_YANG_QUE_MEN
        && MjClient.gameType != MjClient.GAME_TYPE.JING_LE_KOU_DIAN

    )
    {
        var pl = getUIPlayer(0);
        if(!pl.isQiHu)
        {
            var _skipHuIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipHuIconTag");
            if(_skipHuIconNode)
            {
                _skipHuIconNode.visible = !!pl.skipHu;
            }
        }
    }
    if (off === 0){
        var _skipPengIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipPengIconTag");
        if(_skipPengIconNode)
            _skipPengIconNode.visible = false;
    }

    //创建一个麻将，msg为麻将的信息，数字表示。by sking
    var cardNode =  getNewCard(node, "stand", "mjhand", msg, off);



    var pl = getUIPlayer(off);//获取玩家信息.off 为0 ，就是自己得信息，能看到自己摸牌 by sking


    var children = node.children;
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "mjhand")ci.isNew = false;
    }



    //宁乡开王麻将封东时摸的是牌背
    if(MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG && getUIPlayer(0).fengDong){
        cardNode.loadTexture(getNewMJBgFile("playing/MJ/Mj_04.png"));
        cardNode.removeAllChildren();
    }

    if (MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ) // 4 列 4列的发牌效果
    {
        if(bFirstCard) cardNode.visible = false;
    }
    else
    {
        //摆放位置，排序，设置大小
        MjClient.playui.CardLayoutRestore(node, 0);
    }

    // // //重置下出牌时间不让一顿猛点出牌
    //  _touchTimeBetween =  new Date().getTime();
}




// 处理等待出牌
function DealWaitPut(node, msg, off)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    msg = tData; //msg 这个参数其实没什么卵用 by sking 2018.9.13
    var selfIndex = getPlayerIndex(off);
    cc.log("~DealWaitPut()------------ tData.curPlayer = " + tData.curPlayer);
    if(tData.curPlayer == selfIndex)
    {
        if (MjClient.rePlayVideo == -1)//正常打牌流程
        {
            getNewCard(node, "stand", "standPri");
        }
        else //播放录像
        {
            var pl = getUIPlayer(off);
            if(pl){
                getNewCard(node, "up", "mjhand_replay", pl.mjhand[pl.mjhand.length-1], off);
            }else{
                cc.log('error DealWaitPut pl is null off:', off);
            }
        }
        MjClient.playui.CardLayoutRestore(node, off,true);
    }
}



// 处理吃
function DealMJChi(node, msg, off)
{
    cc.log("~DealMJChi() === off ===" + off);
    cc.log("~DealMJChi() === msg:" + JSON.stringify(msg));
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = getPlayerIndex(off);
    if (tData.curPlayer == selfIndex)
    {
        var fromOff = [];
        var fromBind = GetUIBind(msg.from, fromOff);
        var fnode = fromBind._node;
        var lastPutCard = tData.lastPutCard;
        var pl = sData.players[tData.uids[selfIndex] + ""];

        // if(checkChiPengGangShowFull(node, pl, 'chi') && MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ) {
        //     return;
        // }


        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA
            || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN
            || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
            || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO
            || MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN
            || MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG
            || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG)
        {
            MjClient.playui.RemoveNewCardOut && MjClient.playui.RemoveNewCardOut(fnode, msg.mjchi);
            lastPutCard = msg.mjchiCard[msg.mjchiCard.length - 1];
        }
        else
        {
            RemoveNewCardOut(fnode);
        }

        var cds = msg.mjchi;

        cc.log("=============chi cards = " + JSON.stringify(cds));

        // //白板是癞子的点数，要重新排一下
        // if(MjClient.gameType == MjClient.GAME_TYPE.XU_ZHOU)
        // {
        //     //cds.sort(TagOrder_xz);
        // }

        // 把吃的牌放中间 begin
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
            MjClient.gameType  == MjClient.GAME_TYPE.DONG_HAI ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
            cds.sort(function(a, b) {
                return a - b;
            });
            var chiCardIndex = -1
            for (var i = 0;i < cds.length;i++){
                if (cds[i] == msg.mjchiCard[msg.mjchiCard.length - 1]){
                    chiCardIndex = i
                }
            }
            if (chiCardIndex >= 0){
                cds.splice(chiCardIndex,1)
                cds.splice(cds.length / 2,0,msg.mjchiCard[msg.mjchiCard.length - 1])
            }
        }
        // end

        var cdui = null;
        for(var i = 0; i < cds.length; i++)
        {
            if(cds[i] == lastPutCard)
            {
                cdui = getNewCard(node, "up", "chi", cds[i], off, "heng");

                setCardArrow(cdui, 2, off);

                if(MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_MJ ||
                    MjClient.gameType == MjClient.GAME_TYPE.XUE_ZHAN ||
                    MjClient.gameType == MjClient.GAME_TYPE.XUE_LIU  ||
                    MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_BAI_DA )
                {
                    setCardArrow_chi(cdui, 2, off);
                }
            }
            else
            {
                cdui = getNewCard(node, "up", "chi", cds[i], off);
            }

            if(off == 0 && cds[i] != lastPutCard)
            {
                RemoveNodeBack(node, "mjhand", 1, cds[i]);
            }

            if(i == 2)
            {
                cdui.ischi3 = true;
            }
        }

        //删掉俩张stand
        if (MjClient.rePlayVideo == -1)
        {
            if(off == 3)
            {
                RemoveNodeBack(node, "standPri", 2);
            }
            else if(off != 0)
            {
                RemoveFrontNode(node, "standPri", 2);
            }
        }
        else //回放
        {
            for(var i = 0; i < cds.length; i++)
            {
                if(cds[i] != lastPutCard)
                {
                    if(off == 3)
                    {
                        RemoveNodeBack(node, "mjhand_replay", 1, cds[i]);
                    }
                    else if(off != 0)
                    {
                        RemoveFrontNode(node, "mjhand_replay", 1, cds[i]);
                    }
                }
            }
        }

        MjClient.playui.CardLayoutRestore(node, off);
        MjClient.playui.CardLayoutRestore(fnode, fromOff[0]);
        ShowEatActionAnim(node, ActionType.CHI, off);
    }
}




// 处理碰
function DealMJPeng(node, msg, off)
{

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = getPlayerIndex(off);
    if(tData.curPlayer == selfIndex)
    {
        var fromOff = [];
        var fromBind = GetUIBind(msg.from, fromOff);
        var fnode = fromBind._node;

        var pl = sData.players[tData.uids[selfIndex] + ""];
        var i = pl.pengchigang.peng.length - 1;
        var idx = tData.uids.indexOf(pl.info.uid);
        var offIdx = 0;


        if(i >= 0)
        {
            offIdx = getOffByIndex(pl.pengchigang.peng[i].pos, idx) - 1;
        }


        var lastPutCard = tData.lastPutCard;
        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA
            || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN
            || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
            || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO)
        {
            MjClient.playui.RemoveNewCardOut(fnode, pl.pengchigang.peng[i].card);
            lastPutCard = pl.pengchigang.peng[i].card;
        }
        else
        {
            RemoveNewCardOut(fnode);
        }

        var idxPeng =  pl.mjpeng.length -1;
        var _pengCardNode = null;
        for(var j = 0; j < 3; j++)
        {
            if( (j % 3 == 2 - offIdx && off % 3 == 0) || (j % 3 == offIdx && off % 3 != 0) )
            {
                _pengCardNode = getNewCard(node, "up", "peng", pl.mjpeng[idxPeng], off, "heng", "heng");
                setCardArrow(_pengCardNode, offIdx, off);
            }
            else
            {
                _pengCardNode = getNewCard(node, "up", "peng", pl.mjpeng[idxPeng], off);
            }

            if(msg.cpginfo.pengFourCounts && j < msg.cpginfo.pengFourCounts[pl.mjpeng[idxPeng]])
            {
                _pengCardNode.isFour = true;

                //add by sking 立四的标签不显示，切2,3D时候
                pl.pengFourCounts = msg.cpginfo.pengFourCounts;
            }

            if(j == 2)
            {
                _pengCardNode.ispeng3 = true;
            }
        }

        //删掉俩张stand
        if(off == 0)
        {
            RemoveNodeBack(node, "mjhand", 2, lastPutCard);
        }
        else if(off == 3)
        {
            if (MjClient.rePlayVideo == -1)
                RemoveNodeBack(node, "standPri", 2);
            else
                RemoveNodeBack(node, "mjhand_replay", 2, lastPutCard);
        }
        else
        {
            if (MjClient.rePlayVideo == -1)
                RemoveFrontNode(node, "standPri", 2);
            else
                RemoveFrontNode(node, "mjhand_replay", 2, lastPutCard);
        }

        MjClient.playui.CardLayoutRestore(fnode, fromOff[0]);
        MjClient.playui.CardLayoutRestore(node, off);
        ShowEatActionAnim(node, ActionType.PENG, off);

        //检查碰碰了之后UI节点是否对应删除
        //checkDealMjputCards(off)
    }
}

/**
 * 检查碰之后，被碰的牌没有对应删除 by sking
 * @param off
 */
function checkDealMjputCards(off)
{
    var node         = getNode(off);
    var pl           = getUIPlayer(off);
    var sData        = MjClient.data.sData;
    var tData        = sData.tData;
    var lastPutCard  = tData.lastPutCard;
    var _outUICardList = [];
    for( var i in node.children ) {
        var pnode = node.children[i];
        if(pnode.name == "out" || pnode.name == "newout" ) {
            _outUICardList.push(pnode.tag);
            //cc.log("============pnode.name = " + pnode.name);
        }
    }

    if(_outUICardList.length > pl.mjput.length)
    {
        //MjClient.showToast("----------------数据不一致----------------");
        var _info = {uiPutCards:_outUICardList,PengUid:pl.info.uid,lastPutCard:lastPutCard};
        postBugDataToSever(_info);
    }
    else
    {
        //MjClient.showToast("----------------数据一样----------------");
        var data = {uiPutCards:_outUICardList,PengUid:pl.info.uid,lastPutCard:lastPutCard};
        cc.log("============data = " + JSON.stringify(data));
    }
}






// DealMJPeng 被多次调用时会重复显示已存在的碰牌， 吃杠也有此问题
// 检测吃碰杠是否已全部显示
function checkChiPengGangShowFull(node, pl, name, card)
{
    var _EatCardsList = [];
    for( var i in node.children ) {
        var pnode = node.children[i];
        if(pnode.name == name) {
            _EatCardsList.push(pnode.tag);
        }
    }

    if("peng" == name) {
        // if(pl.mjpeng.length*3 == _EatCardsList.length) {
        //     cc.log('error peng is show full');
        //     return true;
        // }
        if(_EatCardsList.indexOf(card) >=0 ){
            cc.log('error peng is show full');
            return true;
        }

    }else if("chi" == name) {

        if(pl.mjchi.length == _EatCardsList.length) {
            cc.log('error chi is show full');
            return true;
        }
    }

    return false;
}

// 自摸的闪电动画, 3D闪电动画在摊牌时处理
function ZiMoShandianAnimate(node, off) {

    var pl = getUIPlayer(off);
    if(!pl) return;
    // 自摸的那张牌（根据是否添加自摸倒下的牌来添加闪电动画）
    var zimoCardNode = node.getChildByName("zimoCardNode");
    if (cc.sys.isObjectValid(zimoCardNode)) {
        var projNode = createSpine("spine/dianpao/skeleton.json", "spine/dianpao/skeleton.atlas");
        projNode.setAnimation(0, 'idle', false);
        projNode.setPosition(50,100);
        projNode.setScale(1.5);
        projNode.setTimeScale(0.35);
        zimoCardNode.addChild(projNode,999999);
    } else {
        cc.log('zimoCardNode 非法对象');
    }
}

// 处理胡
function HandleMJHu(node, msg, off)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var selfIndex = getPlayerIndex(off);
    if(tData.uids[selfIndex] != msg.uid)
    {
        return;
    }

    var pl = getUIPlayer(off);
    if(pl)
    {
        MjClient.playui.EatVisibleCheck();
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ) {
            if (pl.huWord == "zimo") {
                ShowEatActionAnim(node,ActionType.ZIMO,off);
            }else if (pl.huWord == "dianpao") {
                ShowEatActionAnim(node,ActionType.DIANPAO,off);
            }else{
                ShowEatActionAnim(node,ActionType.HU,off);
            }
        }
        else if ( MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP )
        {
            if (pl.zimoNode && !COMMON_UI3D.is3DUI()) {
                // 自摸,天胡 闪电提示动画
                ZiMoShandianAnimate(node, off);
            }

            ShowHuTypeImage(pl,node,off);
            ShowEatActionAnim(node,ActionType.HU,off);
        }
        else{
            if (pl.zimoNode && !COMMON_UI3D.is3DUI()) {
                // 自摸,天胡 闪电提示动画
                ZiMoShandianAnimate(node, off);
            }
            if (pl.huWord == "qingyise") {
                ShowEatActionAnim(node,ActionType.QINGYISE,off);
            }else if (pl.huWord == "yitiaolong") {
                if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ) 
                {
                    ShowEatActionAnim(node,ActionType.YITIAOLONG_NEW,off);
                }
                else
                {
                    ShowEatActionAnim(node,ActionType.YITIAOLONG,off);
                }
            }else if (pl.huWord == "duiduihu") {
                if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ) 
                {
                    ShowEatActionAnim(node,ActionType.DUIDUIHU_NEW,off);
                }
                else
                {
                    ShowEatActionAnim(node,ActionType.DUIDUIHU,off);
                }
            }else if (pl.huWord == "tianhu") {
                ShowEatActionAnim(node,ActionType.TIANHU,off);
            }else if (pl.huWord == "dihu") {
                ShowEatActionAnim(node,ActionType.DIHU,off);
            }else if (pl.huWord == "qidui") {
                ShowEatActionAnim(node,ActionType.QIDUI,off);
            }else if (pl.huWord == "gangkai") {
                ShowEatActionAnim(node,ActionType.GANGKAI,off);
            }else if (pl.huWord == "zimo") {
                ShowEatActionAnim(node,ActionType.ZIMO,off);
            }else if (pl.huWord == "dadiaoche") {
                ShowEatActionAnim(node,ActionType.DADIAOCHE,off);
            }else if (pl.huWord == "quanhun") {
                ShowEatActionAnim(node,ActionType.QUANHUN,off);
            }else if (pl.huWord == "qinghu") {
                ShowEatActionAnim(node,ActionType.QINGHU,off);
            }else {
                ShowEatActionAnim(node,ActionType.HU,off);
            }

        }
    }
}

//处理花
function HandleMJFlower(node,msg,off)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var selfIndex=getPlayerIndex(off);
    if( tData.uids[selfIndex]!=msg.uid) return;
    var pl = getUIPlayer(off);
    if(pl)
    {
        cc.log("播放补花动画");
        if(off==0 /*&& MjClient.GAME_TYPE.LUAN_GUA_FENG != MjClient.gameType*/)
        {
            RemoveNodeBack(node, "copycdui", 1, msg.card);//在putOutCard 函数里被创建

            if(RemoveNodeBack(node, "putOutCard", 1, msg.card) == 0)
            {
                cc.log("msg.card    :",msg.card);
                RemoveNodeBack(node, "mjhand", 1, msg.card);
            }
            else
            {
                cc.log("播放补花动画 msg.card    :",msg.card);
            }

        }
        else if(off==1)
        {
            if (MjClient.rePlayVideo == -1)
                RemoveNodeBack(node, "standPri", 1);
            else
                RemoveNodeBack(node, "mjhand_replay", 1, msg.card);
        }
        else if(off == 2 || off == 3)
        {
            if (MjClient.rePlayVideo == -1)
                RemoveFrontNode(node, "standPri", 1);
            else
                RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
        }
        //不显示花牌
        // if(flowerShowTag != 2)
        // {
        // 	AddNewCard(node,"up","flower",msg.card,off);
        // }
        MjClient.playui.CardLayoutRestore(node,off);
        MjClient.majiang.setFlowerImg(node, pl);
        if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI)
        {
            ShowEatActionAnim(node,ActionType.BUGANG,off);
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.LUAN_GUA_FENG)
        {
            ShowEatActionAnim(node,ActionType.LIANG,off);
        }
        else{
            ShowEatActionAnim(node,ActionType.FLOWER,off);
        }
        clearCurrentPutTag();
    }

}


/*
 听牌之后，还可以显示张数
 */
function setTingCards_showCount(node, tingSet)
{
    node.zIndex = 500;
    node.visible = true;

    var cardNode0 = node.getChildByName("showNode");
    cardNode0.setVisible(false);
    var BindingNode = node.getChildByName("Node_card");
    BindingNode.removeAllChildren(true);

    var i=0;
    var j = 0;//高
    var bHaveValue = false;

    var lastCardNode = null;

    for (var cd in tingSet)
    {
        if(i == 17)
        {
            j++;
            i = 0;
        }

        var cardNode = cardNode0.clone();
        lastCardNode = cardNode;
        cardNode.visible = true;
        bHaveValue = true;
        cardNode.setPositionY(cardNode0.getPositionY() + j*cardNode0.getBoundingBox().height*0.85);
        cardNode.setPositionX(cardNode0.getPositionX() + i*cardNode0.getBoundingBox().width*1.8);
        setCardSprite(cardNode, parseInt(cd), 0);

        i++;

        var _countNode = new ccui.Text();
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {//岳阳同一使用方正兰亭
            _countNode.setFontName("fonts/lanting.TTF");
        }else{
            _countNode.setFontName(MjClient.fzcyfont);
        }
        _countNode.setPosition(cc.p(cardNode.getContentSize().width*1.3,cardNode.getContentSize().height/2 + 45));
        var icount = getHuCardNum(parseInt(cd));
        _countNode.setString(icount + "");
        _countNode.setFontSize(20);
        _countNode.setScale(3.5);
        _countNode.setColor(cc.color(19,238,96));
        cardNode.addChild(_countNode);

        var _zhangNode = new ccui.Text();
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {//岳阳同一使用方正兰亭
            _zhangNode.setFontName("fonts/lanting.TTF");
        }else{
            _zhangNode.setFontName(MjClient.fzcyfont);
        }
        _zhangNode.setPosition(cc.p(cardNode.getContentSize().width*1.3,cardNode.getContentSize().height/2 - 35));
        _zhangNode.setString("张");
        _zhangNode.setFontSize(18);
        _zhangNode.setScale(3.5);
        _zhangNode.setColor(cc.color(255,220,74));
        cardNode.addChild(_zhangNode);
        BindingNode.addChild(cardNode, 10-j);

    }

    var textContentW = 0;
    var pl = getUIPlayer(0);

    if(lastCardNode && pl.isTing)
    {
        var _gameName;
        if(MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA
        || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN
            || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
            || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO){
            _gameName = new cc.LabelTTF("开杠自动摸打...",MjClient.fzcyfont,25);
        }else{
            _gameName = new cc.LabelTTF("听牌自动摸打...",MjClient.fzcyfont,25);
        }
        _gameName.setFontSize(_gameName.getFontSize());
        if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP &&  MjClient.getAppType() !== MjClient.APP_TYPE.YLHUNANMJ &&  MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ )
            _gameName.setScale(3.5);
        _gameName.setColor(cc.color(255,220,74));
        _gameName.setAnchorPoint(0,0.5);
        _gameName.setPosition(lastCardNode.getContentSize().width*1.7 ,lastCardNode.getContentSize().height/2);
        lastCardNode.addChild(_gameName);
        textContentW = _gameName.getContentSize().width;
    }

    //如果没有值则隐藏
    if(!bHaveValue)
    {
        node.visible = false;
    }

    if(j >= 1) i = 17;

    var tingCardsHeight = cardNode0.getBoundingBox().height*1.1 + j*cardNode0.getBoundingBox().height*0.85;
    var tingCardsWidth = 50 + i*cardNode0.getBoundingBox().width*1.8;
    node.setContentSize(tingCardsWidth + textContentW, tingCardsHeight);

}

/*
 听牌之后，还可以显示张数（晋中麻将玩法,除乡宁摔金）
 */
function setTingCards_JINZHONGMJ(node, tingSet)
{
    if(MjClient.playui.setTingCards) return MjClient.playui.setTingCards(node, tingSet);

    if (!tingSet) {
        return;
    }

    node.zIndex = 500;
    node.visible = true;

    var cardNode0 = node.getChildByName("showNode");
    cardNode0.setVisible(false);
    var BindingNode = node.getChildByName("cardNodeList");
    BindingNode.removeAllChildren(true);

    var i = 0;
    var j = 0;//高
    var bHaveValue = false;

    var width = cardNode0.getContentSize().width * 0.28 * 2 - 5;
    var height = cardNode0.getContentSize().height * 0.28 + 5;

    for (var cd in tingSet)
    {
        var cardNode = cardNode0.clone();
        cardNode.visible = true;
        bHaveValue = true;
        if(i == 7)
        {
            j++;
            i = 0;
        }
        cardNode.setPositionX(cardNode0.getContentSize().width * 0.28 / 2 + i * width);
        cardNode.setPositionY(cardNode0.getContentSize().height * 0.28 / 2 + j * height);
        BindingNode.addChild(cardNode);
        setCardSprite(cardNode, parseInt(cd), 0);
        i++;

        var _countNode = new ccui.Text();
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {//岳阳同一使用方正兰亭
            _countNode.setFontName("fonts/lanting.TTF");
        }else{
            _countNode.setFontName(MjClient.fzcyfont);
        }
        _countNode.setPosition(cc.p(cardNode.getContentSize().width * 1.3, cardNode.getContentSize().height/2 + 45));
        var icount = getHuCardNum(parseInt(cd));
        _countNode.setString(icount + "");
        _countNode.setFontSize(20);
        _countNode.setScale(3.5);
        _countNode.setColor(cc.color(19,238,96));
        cardNode.addChild(_countNode);

        var _zhangNode = new ccui.Text();
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {//岳阳同一使用方正兰亭
            _zhangNode.setFontName("fonts/lanting.TTF");
        }else{
            _zhangNode.setFontName(MjClient.fzcyfont);
        }
        _zhangNode.setPosition(cc.p(cardNode.getContentSize().width * 1.3, cardNode.getContentSize().height/2 - 35));
        _zhangNode.setString("张");
        _zhangNode.setFontSize(18);
        _zhangNode.setScale(3.5);
        _zhangNode.setColor(cc.color(255,220,74));
        cardNode.addChild(_zhangNode);

        if(MjClient.data.sData.tData.areaSelectMode["is68"] && MjClient.data.sData.tData.uids.length == 2)
        {
            _countNode.visible = false;
            _zhangNode.visible = false;
        }

    }

    if (j >= 1) i = 7;
    // 容器大小设置
    var tingCardsWidth = i * width;
    var tingCardsHeight = (j + 1) * height;
    BindingNode.setContentSize(tingCardsWidth, height);

    var showBtn = node.getChildByName("showBtn");
    if (showBtn) {
        showBtn.removeFromParent();
        showBtn = null;
    }
    if (j >= 1) {
        var showAll = false;
        // 添加显示隐藏按钮
        showBtn = new ccui.Button();
        showBtn.loadTextureNormal("png/show_up.png");
        showBtn.setAnchorPoint(0.5, 0.5);
        showBtn.setName("showBtn");
        showBtn.setPosition(cc.p(45 + tingCardsWidth + showBtn.getContentSize().width/2, 25));
        node.addChild(showBtn);
        showBtn.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (showAll) {
                        showAll = false;
                        BindingNode.height = height;
                        node.height = height;
                        showBtn.loadTextureNormal("png/show_up.png");
                    }
                    else {
                        showAll = true;
                        BindingNode.height = tingCardsHeight;
                        node.height = tingCardsHeight;
                        showBtn.loadTextureNormal("png/show_down.png");
                    }
                    break;
                default:
                    break;
            }
        }, this);
    }

    // node 节点大小设置
    var nodeWidth = 45 + tingCardsWidth;
    if (showBtn) {
        nodeWidth = 45 + tingCardsWidth + showBtn.getContentSize().width + 10;
    }
    node.setContentSize(nodeWidth, height);

    var pl = getUIPlayer(0);
    var _gameName = node.getChildByName("gamePlayTip");
    if (_gameName) {
        _gameName.removeFromParent();
        _gameName = null;
    }
    if (pl.isTing) {
        _gameName = new cc.LabelTTF("听牌自动摸打...",MjClient.fzcyfont,25);
        _gameName.setFontSize(_gameName.getFontSize());
        _gameName.setName("gamePlayTip");
        _gameName.setColor(cc.color(255,220,74));
        _gameName.setAnchorPoint(0,0.5);
        _gameName.setPosition(nodeWidth, 25);
        node.addChild(_gameName);
    }

    //如果没有值则隐藏
    if (!bHaveValue) {
        node.visible = false;
    }
}

function setTingCards(node, tingSet)
{
    if(isNeedSetTingBtn()) {
        node.setVisible(false);
        return;
    }
    if(MjClient.playui.setTingCards) return MjClient.playui.setTingCards(node, tingSet);

    node.zIndex = 500;
    node.visible = true;

    var cardNode0 = node.getChildByName("showNode");
    cardNode0.setVisible(false);
    var BindingNode = node.getChildByName("Node_card");
    if(!BindingNode) return;
    BindingNode.removeAllChildren(true);
    node.setVisible(true);
    var ObjTingSet = {};
    if (Array.isArray(tingSet))
    {
        for (var i = 0; i < tingSet.length; i++) {
            ObjTingSet[tingSet[i]] = 1;
        }
        tingSet = ObjTingSet;
    }

    var i = 0;
    var j = 0;//高
    var bHaveValue = false;

    var lastCardNode = null;

    for (var cd in tingSet)
    {
        var cardNode = cardNode0.clone();
        lastCardNode = cardNode;
        cardNode.visible = true;
        bHaveValue = true;

        if(i == 17)
        {
            j++;
            i = 0;
        }
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
            cardNode.setPositionY(cardNode0.getPositionY() + j*cardNode0.getBoundingBox().height);
        else
            cardNode.setPositionY(cardNode0.getPositionY() + j*cardNode0.getBoundingBox().height*0.85);
        cardNode.setPositionX(cardNode0.getPositionX() + i*cardNode0.getBoundingBox().width*0.95);
        BindingNode.addChild(cardNode, 10-j);
        var off = 0;
        if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ && (MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ || MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.JIANG_HUA_MJ) )
            ;
        else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
            off = 6;
        setCardSprite(cardNode, parseInt(cd), off);
        i++;

    }

    var textContentW = 0;
    var pl = getUIPlayer(0);

    if(lastCardNode && pl.isTing)
    {
        var _gameName;
        if(MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
            MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN ||
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
            || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO){
            _gameName = new cc.LabelTTF("开杠自动摸打...",MjClient.fzcyfont,25);
        }
        else{
            _gameName = new cc.LabelTTF("听牌自动摸打...",MjClient.fzcyfont,25);
        }
        _gameName.setFontSize(_gameName.getFontSize());
        if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP &&  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() !== MjClient.APP_TYPE.YLHUNANMJ )
            _gameName.setScale(3.5);
        _gameName.setColor(cc.color(255,220,74));
        _gameName.setAnchorPoint(0,0.5);
        _gameName.setPosition(lastCardNode.getContentSize().width*1.3 ,lastCardNode.getContentSize().height/2);
        lastCardNode.addChild(_gameName);
        textContentW = _gameName.getContentSize().width;
    }

    //如果没有值则隐藏(宁乡开王麻将封东状态下也不需要显示)
    if(!bHaveValue || pl.fengDong)
    {
        node.visible = false;
    }

    if(j >= 1) i = 17;


    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ){
        var tingCardsHeight = cardNode0.getBoundingBox().height*1.1 + j*cardNode0.getBoundingBox().height;
    }
    else
        var tingCardsHeight = cardNode0.getBoundingBox().height*1.1 + j*cardNode0.getBoundingBox().height*0.85;

    var tingCardsWidth = cardNode0.getBoundingBox().width/0.207 + (i-1)*cardNode0.getBoundingBox().width*1.1;

    node.setContentSize(tingCardsWidth + textContentW, tingCardsHeight);

}


/**
 * 是否需要听按钮的功能,新的听牌规则，听牌出牌后不用显示听牌，点击听的按钮才显示
 * @returns {boolean}
 */
function isNeedSetTingBtn()
{
    if(MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN ||
    MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG ||
    MjClient.gameType === MjClient.GAME_TYPE.ML_HONGZHONG_ZERO ||
    MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
    MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN ||
    MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO)
    {
        if( MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP)
            return true;
    }
    return false;
}

//处理听
function HandleMJTing(node,msg,off)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var selfIndex=getPlayerIndex(off);
    if( tData.uids[selfIndex]!=msg.uid) return;
    var pl = getUIPlayer(off);
    if(pl)
    {
        cc.log("播放听动画");
        /*
         显示听的标志，add by sking
         */

        if (MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO)
        {
            cc.log("平江扎鸟将听")
            if (!pl.isKaigang)
            {
                ShowEatActionAnim(node,ActionType.JIANGTING,off);
            }
            if (msg.isTingJJHu) 
            {
                var _jiangIcon1 = node.getChildByName("head").getChildByName("tingIcon");
                _jiangIcon1.loadTexture("playing/gameTable/icon_jiang.png");
            }
        }
        else
        {
            ShowEatActionAnim(node,ActionType.TING,off);
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.LIAN_YUN_GANG) {
            var tingIcon = node.getChildByName("head").getChildByName("tingIcon");
            tingIcon.visible = true;
            MjClient.playui.CardLayoutRestore(node, off);

        }
        else
        {
            var tingIcon = node.getChildByName("head").getChildByName("tingIcon");
            var _cardIcon = node.getChildByName("head").getChildByName("tingCard");
            //cc.log("===================tingIcon.x = " + tingIcon.x);
            if(_cardIcon && msg.putCardAfterTing >= 0)
            {
                _cardIcon.visible = true;

                if(MjClient.gameType == MjClient.GAME_TYPE.LIAN_SHUI && pl.isTianting) //涟水麻将的天听不显示
                {
                    _cardIcon.visible = false;
                }

                if(MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_MJ
                    || MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN
                    || MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_KD
                    || MjClient.gameType == MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI
                    || MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI
                    || MjClient.gametype == MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN
                    || MjClient.gametype == MjClient.GAME_TYPE.HE_JIN_KUN_JIN
                    || MjClient.gameType == MjClient.GAME_TYPE.WU_TAI_KOU_DIAN
                    || MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_MA_JIANG
                    || MjClient.gameType == MjClient.GAME_TYPE.ZHUO_HAO_ZI
                    || MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU
                    || MjClient.gameType == MjClient.GAME_TYPE.LING_SHI_BIAN_LONG
                    || MjClient.gameType == MjClient.GAME_TYPE.LING_SHI_BAN_MO
                    || MjClient.gameType == MjClient.GAME_TYPE.PING_YAO_KOU_DIAN
                    || MjClient.gameType == MjClient.GAME_TYPE.PING_YAO_MA_JIANG
                    || MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO
                    || MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO
                    || MjClient.gameType == MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3
                    || MjClient.gameType == MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN
                    || MjClient.gameType == MjClient.GAME_TYPE.FEN_XI_YING_KOU
                    || MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN
                    || MjClient.gameType == MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN
                    || MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI
                    || MjClient.gameType == MjClient.GAME_TYPE.SHOU_YANG_QUE_KA
                    || MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_LI_SI
                    || MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI
                    || MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI
                    || MjClient.gameType == MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG
                    || MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN
                    || MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN
                    || MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI
                    || MjClient.gameType == MjClient.GAME_TYPE.FAN_SHI_XIA_YU
                    || MjClient.gameType == MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG
                    || MjClient.gameType == MjClient.GAME_TYPE.FEN_YANG_QUE_MEN
                    || MjClient.gameType == MjClient.GAME_TYPE.JING_LE_KOU_DIAN

                ) //听不显示
                {
                    _cardIcon.visible = false;
                }
            }

            if(_cardIcon && msg.putCardAfterTing < 0)
            {
                _cardIcon.visible = false;
            }

            if(tingIcon)
                tingIcon.visible = true;

        }
    }
}

function DealMJTeshuGang(node, msg, off)
{
    if (!(msg.card instanceof Array))
        return;

    cc.log("DealMJTeshuGang: begin");

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = getPlayerIndex(off);
    if(uids[selfIndex] != msg.uid)
    {
        return;
    }

    // 移除多个连续不同的tag的节点
    var RemoveFrontNodeByTags = function (node, name, tags)
    {
        var children = node.children;

        var nameNode = [];

        for(var i = 0; i < children.length; i ++) {
            var ci = children[i];
            if(ci.name == name) nameNode.push(ci);
        }

        for(var i = 0; i < nameNode.length; i ++)
        {
            var j = 0;
            for (; j < tags.length; j ++)
            {
                var ci = nameNode[i + j];
                if (j == 2 && !ci.isTeshuGang3_3)
                    break;

                if(ci.name != name || ci.tag != tags[j])
                    break;
            }

            if (j != tags.length)
                continue;

            for (j = 0; j < tags.length; j ++)
            {
                nameNode[i + j].removeFromParent(true);
            }
            return;
        }

        cc.log("RemoveFrontNodeByTags: 失败！name=" + name + " tags=" + tags);
    }


    if(msg.gang == 1)//明杠
    {
        var fromOff = [];
        var fromBind = GetUIBind(msg.from, fromOff);
        var fnode = fromBind._node;
        RemoveNewCardOut(fnode);
        if(off == 0)
        {
            for (var i = 1; i < msg.card.length; i ++)
            {
                RemoveNodeBack(node, "mjhand", 1, msg.card[i]);
            }
        }

        MjClient.playui.CardLayoutRestore(fnode, fromOff[0]);
    }
    else if (msg.gang == 2 && (msg.card[0] == 71 || msg.card[0] == 81 || msg.card[0] == 91)) //中发白+中/发/白 补杠
    {
        if(off == 0)
        {
            RemoveFrontNodeByTags(node, "gang1", [71, 81, 91]);
            RemoveNodeBack(node, "mjhand", 1, msg.card[0]);
        }
    }
    else if(msg.gang == 3)//暗杠
    {
        if(off == 0)
        {
            for (var i = 0; i < msg.card.length; i ++)
            {
                RemoveNodeBack(node, "mjhand", 1, msg.card[i]);
            }
        }
    }

    // 张三牌的杠，off != 0 时多删除一张手牌，因为接下来的DealWaitPut处理会再添加一张手牌
    if(off != 0)
    {
        if(off == 3)
        {
            if(msg.gang == 1)
            {
                var fromOff = [];
                var fromBind = GetUIBind(msg.from, fromOff);
                var fnode = fromBind._node;
                RemoveNewCardOut(fnode);
                if (MjClient.rePlayVideo == -1)
                {
                    RemoveNodeBack(node, "standPri", msg.card.length == 3 ? msg.card.length : msg.card.length - 1);
                }
                else
                {
                    for (var i = 1; i < msg.card.length; i ++)
                    {
                        RemoveNodeBack(node, "mjhand_replay", 1, msg.card[i]);
                    }
                }
            }
            else if (msg.gang == 2 && (msg.card[0] == 71 || msg.card[0] == 81 || msg.card[0] == 91))
            {
                RemoveFrontNodeByTags(node, "gang1", [71, 81, 91]);
                if (MjClient.rePlayVideo == -1)
                    RemoveNodeBack(node, "standPri", 1);
                else
                    RemoveNodeBack(node, "mjhand_replay", 1, msg.card[0]);
            }
            else if(msg.gang == 3)
            {
                if (MjClient.rePlayVideo == -1)
                {
                    RemoveNodeBack(node, "standPri", msg.card.length == 3 ? msg.card.length + 1 : msg.card.length);
                }
                else
                {
                    for (var i = 0; i < msg.card.length; i ++)
                    {
                        RemoveNodeBack(node, "mjhand_replay", 1, msg.card[i]);
                    }
                }
            }
        }
        else
        {
            if(msg.gang == 1)
            {
                var fromOff = [];
                var fromBind = GetUIBind(msg.from, fromOff);
                var fnode = fromBind._node;
                RemoveNewCardOut(fnode);
                if (MjClient.rePlayVideo == -1)
                {
                    RemoveFrontNode(node, "standPri", msg.card.length == 3 ? msg.card.length : msg.card.length - 1);
                }
                else
                {
                    for (var i = 1; i < msg.card.length; i ++)
                    {
                        RemoveFrontNode(node, "mjhand_replay", 1, msg.card[i]);
                    }
                }
            }
            else if (msg.gang == 2 && (msg.card[0] == 71 || msg.card[0] == 81 || msg.card[0] == 91))
            {
                RemoveFrontNodeByTags(node, "gang1", [71, 81, 91]);
                if (MjClient.rePlayVideo == -1)
                    RemoveFrontNode(node, "standPri", 1);
                else
                    RemoveFrontNode(node, "mjhand_replay", 1, msg.card[0]);
            }
            else if(msg.gang == 3)
            {
                if (MjClient.rePlayVideo == -1)
                    RemoveFrontNode(node, "standPri", msg.card.length == 3 ? msg.card.length + 1 : msg.card.length);
                else
                {
                    for (var i = 0; i < msg.card.length; i ++)
                    {
                        RemoveFrontNode(node, "mjhand_replay", 1, msg.card[i]);
                    }
                }
            }
        }
    }

    var offIdx = null;
    var pl = sData.players[tData.uids[selfIndex] + ""];
    var idx = tData.uids.indexOf(pl.info.uid);

    for (var i=0; i<pl.pengchigang.gang.length; i++)
    {
        if (pl.pengchigang.gang[i].card == msg.card[0])
        {
            offIdx = getOffByIndex(pl.pengchigang.gang[i].pos, idx) - 1;
            break;
        }
    }
    if (offIdx == null)
    {
        for (var i=0; i<pl.pengchigang.pgang.length; i++)
        {
            if (pl.pengchigang.pgang[i].card.toString() == msg.card[0])
            {
                offIdx = getOffByIndex(pl.pengchigang.pgang[i].pos, idx) - 1;
                break;
            }
        }
    }
    if (offIdx == null)
    {
        cc.log("DealMJGang:offIdx == null!!!!");
        offIdx = 0;
    }

    if(msg.gang == 3)//暗杠
    {
        var cards = msg.card;
        if (MjClient.majiang.sortXuanFengGang)
            cards = MjClient.majiang.sortXuanFengGang(cards);
        for(var i = 0; i < cards.length; i ++)
        {
            if(i == 3)
            {
                getNewCard(node, "up", "gang1", cards[i], off, "isgang4");//.tag = msg.card[i];
            }
            else
            {
                var newCard = getNewCard(node, "up", "gang1", cards[i], off);
                if (i == 2 && cards.length == 3)
                    newCard.isTeshuGang3_3 = true;
            }
        }
    }
    else//明杠 补杠
    {
        var cards = msg.card;
        if (msg.gang == 2 && (msg.card[0] == 71 || msg.card[0] == 81 || msg.card[0] == 91))
        {
            cards = [71, 81, 91];
            if (msg.card[0] == 71)
                cards.splice(0, 0, 71);
            else if (msg.card[0] == 81)
                cards.splice(1, 0, 81);
            else
                cards.splice(2, 0, 91);
        }

        var setCardArrowOnGang4 = false;
        if (MjClient.majiang.sortXuanFengGang)
            cards = MjClient.majiang.sortXuanFengGang(cards);
        for(var i = 0; i < cards.length; i ++)
        {
            if (i < 3)
            {
                var newCard = null;
                if( (i % 3 == 2 - offIdx && off % 3 == 0) || (i % 3 == offIdx && off % 3 != 0) )
                {
                    var cdui = getNewCard(node, "up", "gang0", cards[i], off, "heng", "heng");
                    newCard = setCardArrow(cdui, offIdx, off);
                    if (i==1)
                    {
                        setCardArrowOnGang4 = true;
                    }
                }
                else
                {
                    newCard = getNewCard(node, "up", "gang0", cards[i], off);
                }

                if (newCard && i == 2 && cards.length == 3)
                    newCard.isTeshuGang3_3 = true;
            }
            else
            {
                var cdui = getNewCard(node, "up", "gang0", cards[i], off, "isgang4");//最后一张牌放上面
                cdui.tag = cards[i];
                if (setCardArrowOnGang4)
                {
                    setCardArrow(cdui, offIdx, off);
                }
            }
        }
    }


    MjClient.playui.CardLayoutRestore(node, off);

    if(msg.gang == 3)//暗杠
    {
        if (msg.card[0] == msg.card[1] && msg.card[1] == msg.card[2])
        {
            if (msg.card[0] == MjClient.majiang.getShanGunCard(tData.hunCard))   // 瘸腿暗杠
                ShowEatActionAnim(node, ActionType.QUETUIDAN, off);
            else                                                // 借光杠
                ShowEatActionAnim(node, ActionType.JIEGUANGDAN, off);
        }
        else  // xuanfenggang
            ShowEatActionAnim(node, ActionType.XUANFENGDAN, off);
    }
    else if (msg.gang == 2)
    {
        ShowEatActionAnim(node, ActionType.XUANFENGDAN, off);
    }
    else//明杠
    {
        if (msg.card[0] == msg.card[1] && msg.card[1] == msg.card[2])
        {
            if (msg.card[0] == MjClient.majiang.getShanGunCard(tData.hunCard))   // 瘸腿暗杠
                ShowEatActionAnim(node, ActionType.QUETUIDAN, off);
            else                                                // 借光杠
                ShowEatActionAnim(node, ActionType.JIEGUANGDAN, off);
        }
    }

    // ShowEatActionAnim(node, ActionType.GANG, off);
}

// 处理杠
function DealMJGang(node, msg, off)
{
    cc.log("~DealMJGang() === off ===" + off);
    cc.log("~DealMJGang() === msg:" + JSON.stringify(msg));

    MjClient.clickTing = false; //清除当前点听得按钮状态 by sking 2018.9.21 ;
    if (msg.card instanceof Array)
    {
        DealMJTeshuGang(node, msg, off);
        return;
    }

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = getPlayerIndex(off);
    if(uids[selfIndex] != msg.uid)
    {
        return;
    }


    if(msg.gang == 1)//明杠
    {
        var fromOff = [];
        var fromBind = GetUIBind(msg.from, fromOff);
        var fnode = fromBind._node;

        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA
            || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN
            || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
            || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO)
            MjClient.playui.RemoveNewCardOut(fnode, msg.card);
        else if(MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG && msg.card === tData.showCard){  //宁乡开王麻将借子开杠
        }
        else{
            RemoveNewCardOut(fnode);
        }

        if(off == 0)
        {
            RemoveNodeBack(node, "mjhand", 3, msg.card);
        }

        MjClient.playui.CardLayoutRestore(fnode, fromOff[0]);
    }
    else if(msg.gang == 2)//碰杠
    {
        RemoveNodeBack(node, "peng", 3, msg.card);
        if(off == 0)
        {
            RemoveNodeBack(node, "mjhand", 1, msg.card);
        }
    }
    else if(msg.gang == 3)//暗杠
    {
        if(off == 0)
        {
            RemoveNodeBack(node, "mjhand", 4, msg.card);
        }
    }

    if(off != 0)
    {
        if(off == 3)
        {
            if(msg.gang == 1)
            {
                var fromOff = [];
                var fromBind = GetUIBind(msg.from, fromOff);
                var fnode = fromBind._node;

                if (MjClient.gameType != MjClient.GAME_TYPE.CHANG_SHA
                    || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN
                    || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
                    || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO)
                    RemoveNewCardOut(fnode);

                if (MjClient.rePlayVideo == -1)
                    RemoveNodeBack(node, "standPri", 3);
                else
                    RemoveNodeBack(node, "mjhand_replay", 3, msg.card);
            }
            else if(msg.gang == 2)
            {
                RemoveNodeBack(node, "peng", 3, msg.card);
                if (MjClient.rePlayVideo == -1) {
                    if (msg.isKaiGangAfterSelfAnGang)   // 长沙麻将开杠后再暗杠
                        ;
                    else if(MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG && msg.card === tData.showCard){  //宁乡开王麻将借子开杠
                    }
                    else{
                        RemoveNodeBack(node, "standPri", 1);
                    }
                }
                else
                    RemoveNodeBack(node, "mjhand_replay", 1, msg.card);
            }
            else if(msg.gang == 3)
            {
                if (MjClient.rePlayVideo == -1)
                {
                    if (MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI)
                    {
                        RemoveFrontNode(node, "standPri", 4);
                    }
                    else
                    {
                        if (msg.isKaiGangAfterSelfAnGang)   // 长沙麻将开杠后再暗杠
                            RemoveNodeBack(node, "standPri", 3);
                        else
                            RemoveNodeBack(node, "standPri", 4);
                    }
                }
                else
                    RemoveNodeBack(node, "mjhand_replay", 4, msg.card);
            }
        }
        else
        {
            if(msg.gang == 1)
            {
                var fromOff = [];
                var fromBind = GetUIBind(msg.from, fromOff);
                var fnode = fromBind._node;

                if (MjClient.gameType != MjClient.GAME_TYPE.CHANG_SHA
                    || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN
                    || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
                    || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO)
                    RemoveNewCardOut(fnode);

                if (MjClient.rePlayVideo == -1)
                    RemoveFrontNode(node, "standPri", 3);
                else
                    RemoveFrontNode(node, "mjhand_replay", 3, msg.card);
            }
            else if(msg.gang == 2)
            {
                RemoveFrontNode(node, "peng", 3, msg.card);
                if (MjClient.rePlayVideo == -1) {
                    if (msg.isKaiGangAfterSelfAnGang)   // 长沙麻将开杠后再暗杠
                        ;
                    else if(MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG && msg.card === tData.showCard){  //宁乡开王麻将借子开杠
                    }
                    else{
                        RemoveFrontNode(node, "standPri", 1);
                    }
                }
                else
                    RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
            }
            else if(msg.gang == 3)
            {
                if (MjClient.rePlayVideo == -1)
                {
                    if (MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI)
                    {
                        RemoveNodeBack(node, "standPri", 4);
                    }
                    else
                    {
                        if (msg.isKaiGangAfterSelfAnGang)   // 长沙麻将开杠后再暗杠
                            RemoveFrontNode(node, "standPri", 3);
                        else
                            RemoveFrontNode(node, "standPri", 4);
                    }
                }
                else
                    RemoveFrontNode(node, "mjhand_replay", 4, msg.card);
            }
        }
    }

    var offIdx = null;
    var pl = sData.players[tData.uids[selfIndex] + ""];
    //var i = pl.pengchigang.gang.length - 1;
    //var idx = tData.uids.indexOf(pl.info.uid);
    //if (i >= 0)
    //offIdx = (pl.pengchigang.gang[i].pos - idx + 4) % 4 - 1;
    //else
    //{
    //    i = pl.pengchigang.pgang.length-1;
    //    if (i >= 0)
    //        offIdx = (pl.pengchigang.pgang[i].pos - idx + 4) % 4 - 1;
    //}

    var idx = tData.uids.indexOf(pl.info.uid);
    for (var i=0; i<pl.pengchigang.gang.length; i++)
    {
        if (pl.pengchigang.gang[i].card == msg.card)
        {
            offIdx = getOffByIndex(pl.pengchigang.gang[i].pos, idx) - 1;
            break;
        }
    }
    if (offIdx == null)
    {
        for (var i=0; i<pl.pengchigang.pgang.length; i++)
        {
            if (pl.pengchigang.pgang[i].card == msg.card)
            {
                offIdx = getOffByIndex(pl.pengchigang.pgang[i].pos, idx) - 1;
                break;
            }
        }
    }
    if (offIdx == null)
    {
        cc.log("DealMJGang:offIdx == null!!!!");
        offIdx = 0;
    }

    var setCardArrowOnGang4 = false;
    for(var j = 0; j < 4; j++)
    {
        var _cardNode = null;
        if(msg.gang == 3)//暗杠
        {
            if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
            {
                if (msg.card == tData.hunCard)
                {
                    if(j == 3)
                    {
                        _cardNode = getNewCard(node, "up", "gang1", msg.card, off, "isgang4");//.tag = msg.card;
                    }
                    else
                    {
                        _cardNode = getNewCard(node, "up", "gang1", msg.card, off);
                    }
                }
                else
                {
                    if(j == 3)
                    {
                        _cardNode = getNewCard(node, "down", "gang1", 0, off, "isgang4");
                        _cardNode.tag = msg.card;

                    }
                    else
                    {
                        _cardNode = getNewCard(node, "down", "gang1", 0, off);
                        _cardNode.tag = msg.card;
                    }
                }
            }
            else if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ) 
            {
                if (off == 0) 
                {
                    if(j == 3)
                    {
                        _cardNode = getNewCard(node, "up", "gang1", msg.card, off, "isgang4");
                        _cardNode.tag = msg.card;
                    }
                    else
                    {
                        _cardNode = getNewCard(node, "down", "gang1", 0, off);
                    }
                }
                else
                {
                    if(j == 3)
                    {
                        _cardNode = getNewCard(node, "down", "gang1", 0, off, "isgang4");
                        _cardNode.tag = msg.card;
                    }
                    else
                    {
                        _cardNode = getNewCard(node, "down", "gang1", 0, off);
                    }
                }   
            }
            else if (MjClient.gameType == MjClient.GAME_TYPE.SU_QIAN ||
                MjClient.gameType == MjClient.GAME_TYPE.DONG_HAI ||
                MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ) 
            {
                if (off == 0)
                {
                    if(j == 3)
                    {
                        _cardNode = getNewCard(node, "down", "gang1", 0, off, "isgang4");
                        _cardNode.tag = msg.card;
                    }
                    else
                    {
                        _cardNode = getNewCard(node, "up", "gang1", msg.card, off);
                    }
                }
                else
                {
                    if(j == 3)
                    {
                        _cardNode = getNewCard(node, "down", "gang1", 0, off, "isgang4");
                        _cardNode.tag = msg.card;
                    }
                    else
                    {
                        _cardNode = getNewCard(node, "down", "gang1", msg.card, off);
                        var imgNode = _cardNode.getChildByName("imgNode");
                        if (imgNode)
                        {
                            imgNode.setVisible(false);
                        }
                    }
                }
            }
            else
            {
                if(j == 3)
                {
                    _cardNode = getNewCard(node, "down", "gang1", 0, off, "isgang4");
                    _cardNode.tag = msg.card;
                }
                else
                {
                    _cardNode = getNewCard(node, "up", "gang1", msg.card, off);
                }
            }
        }
        else if(msg.gang == 2 && isJinZhongAPPType()) //山西app，补杠箭头指向自己
        {
            if(j < 3)
            {
                if( (j % 3 == 2 - offIdx && off % 3 == 0) || (j % 3 == offIdx && off % 3 != 0) )
                {
                    _cardNode = getNewCard(node, "up", "gang0", msg.card, off, "heng", "heng");
                    setCardArrow(_cardNode, 3, off);
                    if (j==1)
                    {
                        setCardArrowOnGang4 = true;
                    }
                }
                else
                {
                    _cardNode = getNewCard(node, "up", "gang0", msg.card, off);
                }
            }
            else
            {
                _cardNode = getNewCard(node, "up", "gang0", msg.card, off, "isgang4");//最后一张牌放上面
                _cardNode.tag = msg.card;
                if (setCardArrowOnGang4)
                {
                    setCardArrow(_cardNode, 3, off);
                }
            }
        }
        else//明杠，补杠
        {
            if(j < 3)
            {
                if( (j % 3 == 2 - offIdx && off % 3 == 0) || (j % 3 == offIdx && off % 3 != 0) )
                {
                    _cardNode = getNewCard(node, "up", "gang0", msg.card, off, "heng", "heng");
                    setCardArrow(_cardNode, offIdx, off);
                    if (j==1)
                    {
                        setCardArrowOnGang4 = true;
                    }
                }
                else
                {
                    _cardNode = getNewCard(node, "up", "gang0", msg.card, off);
                }
            }
            else
            {

                _cardNode = getNewCard(node, "up", "gang0", msg.card, off, "isgang4");//最后一张牌放上面
                _cardNode.tag = msg.card;
                if (setCardArrowOnGang4)
                {
                    setCardArrow(_cardNode, offIdx, off);
                }
            }
        }

        if(msg.gangFourCounts && j < msg.gangFourCounts[msg.card])
        {
            _cardNode.isFour = true;
        }
    }

    MjClient.playui.CardLayoutRestore(node, off);
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ) {
        if (tData.hunCard == msg.card) {
            ShowEatActionAnim(node, ActionType.HUANGJINDAN, off);
        }else if (msg.gang == 3) {
            ShowEatActionAnim(node, ActionType.ANDAN, off);
        }else{
            ShowEatActionAnim(node, ActionType.MINGDAN, off);
        }

    } else if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA
        || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN
        || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
        || MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ){
        console.log("msg.isKaiGang", msg.isKaiGang)
        if(msg.isKaiGang){
            ShowEatActionAnim(node, ActionType.KAIGANG, off);
        } else {
            ShowEatActionAnim(node, ActionType.BUGANG, off);
        }

    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO)
    {
        if(msg.isKaiGang){
            ShowEatActionAnim(node, ActionType.DAMI, off);
        } else {
            ShowEatActionAnim(node, ActionType.BUGANG, off);
        }
    }
    else {
        ShowEatActionAnim(node, ActionType.GANG, off);
    }


}



function TagOrder(na, nb)
{
    return na.tag - nb.tag;
}



// 初始化吃碰杠胡动作
function InitShowEatActionNode(head)
{
    var play_tips = head.getChildByName("play_tips");
    if(cc.sys.isObjectValid(play_tips)) {
        for(var i = 0; i < play_tips.children.length; i++)
        {
            play_tips.children[i].visible = false;
            if (play_tips.children[i].name == "HuImg") 
            {
                play_tips.children[i].removeFromParent();
            }
        }
    }
}



// 重置吃碰杠胡动作
function resetEatActionAnim()
{
    //var jsBind = MjClient.playui.jsBind;
    //var ui = [jsBind.down,jsBind.right,jsBind.top,jsBind.left];
    for(var i = 0; i < 4; i++)
    {
        var ui = getNode(i);
        if(ui)
        {
            InitShowEatActionNode(ui);
        }
    }
}



// 显示吃碰杠胡动作 =====lms==========
function ShowEatActionAnim(node, actType, off)
{
    cc.log("ShowEatActionAnim---------actType=" + actType);
    var delayTime = 2;
    var eatActionNode = node.getChildByName("play_tips");
    if(!cc.sys.isObjectValid(eatActionNode))
    {
        return;
    }
    cc.log("eatActionChild---------2");
    var eatActionChild;
    var callback = function ()
    {
        eatActionChild.visible = false;
    };

    eatActionNode.visible = true;

    var aniName = "idle";
    var eTime = 1;
    var eTime_old = 0.5;
    if (isJinZhongAPPType() ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP)
    {
        aniName = "animation";
        eTime = 0.75;
        eTime_old = 1.5;
    }

    MjClient.Game3DTexiao = getCurrent3DMJTexiaoType();

    if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
    {
        delayTime = 1;
        switch(actType)
        {
            case ActionType.CHI:

                eatActionChild = eatActionNode.getChildByName("chi");
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                break;

            case ActionType.PENG:

                eatActionChild = eatActionNode.getChildByName("peng");
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                break;

            case ActionType.MINGDAN:

                eatActionChild = eatActionNode.getChildByName("gang");
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                break;

            case ActionType.ANDAN:

                eatActionChild = eatActionNode.getChildByName("gang2");
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                break;
            case ActionType.QUETUIDAN:

                eatActionChild = eatActionNode.getChildByName("gang3");
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                break;

            case ActionType.HUANGJINDAN:

                eatActionChild = eatActionNode.getChildByName("gang4");
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                break;
            case ActionType.XUANFENGDAN:

                eatActionChild = eatActionNode.getChildByName("gang5");
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                break;

            case ActionType.JIEGUANGDAN:

                eatActionChild = eatActionNode.getChildByName("gang6");
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                break;

            case ActionType.HU:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                break;
            case ActionType.ZIMO:

                eatActionChild = eatActionNode.getChildByName("zimo");
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                break;
            case ActionType.DIANPAO:

                eatActionChild = eatActionNode.getChildByName("diaopao");
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                break;
            case ActionType.LONG: //如皋长牌的龙
                //
                // eatActionChild = eatActionNode.getChildByName("diaopao");
                // eatActionChild.visible = true;
                // eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                break;

        }
    }
    else if (COMMON_UI3D.is3DUI() && MjClient.Game3DTexiao == 0 // 3D麻将，且选择了开启特效
        && (isJinZhongAPPType()
        || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP
        || MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ
        || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ
        || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ
        || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ
        || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ
        || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) && (
            actType == ActionType.CHI
            || actType == ActionType.PENG
            || actType == ActionType.GANG
            || actType == ActionType.HU
            || actType == ActionType.ZIMO
            || actType == ActionType.KAIGANG
            || actType == ActionType.BUGANG
            || actType == ActionType.TING
            || actType == ActionType.JIANGTING
            ||  actType == ActionType.DAMI
            || actType == ActionType.SHANGJIN
        ))
    {
        // 新版动画 (吃/碰/杠/胡/补/开杠)
        cc.spriteFrameCache.addSpriteFrames("spine/new_chipengganghu/chipenggang0.plist", "spine/new_chipengganghu/chipenggang0.png");
        cc.spriteFrameCache.addSpriteFrames("spine/new_chipengganghu/chipenggang1.plist", "spine/new_chipengganghu/chipenggang1.png");
        if (jsb.fileUtils.isFileExist("spine/new_chipengganghu/chipenggang2.plist"))
        {
            cc.spriteFrameCache.addSpriteFrames("spine/new_chipengganghu/chipenggang2.plist", "spine/new_chipengganghu/chipenggang2.png");
        }
        if (jsb.fileUtils.isFileExist("spine/shangjindonghua/NewAnimation/NewAnimation0.plist")) 
        {
            cc.spriteFrameCache.addSpriteFrames("spine/shangjindonghua/NewAnimation/NewAnimation0.plist", "spine/shangjindonghua/NewAnimation/NewAnimation0.png");
        }
        if (jsb.fileUtils.isFileExist("spine/shangjindonghua/NewAnimation/NewAnimation1.plist")) 
        {
            cc.spriteFrameCache.addSpriteFrames("spine/shangjindonghua/NewAnimation/NewAnimation1.plist", "spine/shangjindonghua/NewAnimation/NewAnimation1.png");
        }
        if (jsb.fileUtils.isFileExist("spine/shangjindonghua/NewAnimation/NewAnimation.ExportJson")) 
        {
            ccs.armatureDataManager.addArmatureFileInfo("spine/shangjindonghua/NewAnimation/NewAnimation.ExportJson");
        }
        ccs.armatureDataManager.addArmatureFileInfo("spine/new_chipengganghu/chipenggang.ExportJson");

        delayTime = 0.8;

        switch(actType)
        {   //下面胡牌类型加的runAction是在血流使用
            case ActionType.CHI:

                eatActionChild = eatActionNode.getChildByName("chi");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));

                var chi = new ccs.Armature("chipenggang");
                chi.animation.play("chi", -1, 0);
                chi.setPosition(cc.p(eatActionChild.width/2, eatActionChild.height/2));
                eatActionChild.addChild(chi, 999999);
                break;

            case ActionType.PENG:

                eatActionChild = eatActionNode.getChildByName("peng");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));

                var peng = new ccs.Armature("chipenggang");
                // peng.setScale(0.5);
                peng.animation.play("peng", -1, 0);
                peng.setPosition(cc.p(eatActionChild.width/2, eatActionChild.height/2));
                eatActionChild.addChild(peng, 999999);
                break;

            case ActionType.TING:

                eatActionChild = eatActionNode.getChildByName("ting");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));

                var peng = new ccs.Armature("chipenggang");
                // peng.setScale(0.5);
                peng.animation.play("ting", -1, 0);
                peng.setPosition(cc.p(eatActionChild.width/2, eatActionChild.height/2));
                eatActionChild.addChild(peng, 999999);
                break;

            case ActionType.JIANGTING:

                eatActionChild = eatActionNode.getChildByName("ting");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));

                cc.log("将听动画");
                var peng = new ccs.Armature("chipenggang");
                // peng.setScale(0.5);
                peng.animation.play("jiangting", -1, 0);
                peng.setPosition(cc.p(eatActionChild.width/2, eatActionChild.height/2));
                eatActionChild.addChild(peng, 999999);
                break;

            case ActionType.GANG:

                eatActionChild = eatActionNode.getChildByName("gang");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));

                var gang = new ccs.Armature("chipenggang");
                gang.animation.play("gang", -1, 0);
                gang.setPosition(cc.p(eatActionChild.width/2, eatActionChild.height/2));
                eatActionChild.addChild(gang, 999999);
                break;

            case ActionType.SHANGJIN:

                eatActionChild = eatActionNode.getChildByName("gang");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                
                var gang = new ccs.Armature("NewAnimation");
                gang.animation.play("Animation1", -1, 0);
                gang.setPosition(cc.p(eatActionChild.width/2, eatActionChild.height/2));
                eatActionChild.addChild(gang, 999999);
                break;

            case ActionType.HU:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));

                var hu = new ccs.Armature("chipenggang");
                if (off == 0) {
                    hu.animation.play("hu", -1, 0);
                    playEffect("shangdian_mic"); // 闪电音效
                }
                else {
                    hu.animation.play("huw", -1, 0);
                }
                hu.setPosition(cc.p(eatActionChild.width/2, eatActionChild.height/2));
                eatActionChild.addChild(hu, 999999);
                break;

            case ActionType.ZIMO:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));

                var zimo = new ccs.Armature("chipenggang");
                if (off == 0) {
                    zimo.animation.play("hu", -1, 0);
                    playEffect("shangdian_mic"); // 闪电音效
                }
                else {
                    zimo.animation.play("huw", -1, 0);
                }
                zimo.setPosition(cc.p(eatActionChild.width/2, eatActionChild.height/2));
                eatActionChild.addChild(zimo, 999999);
                break;

            case ActionType.KAIGANG:

                eatActionChild = eatActionNode.getChildByName("gang");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));

                var kaigang = new ccs.Armature("chipenggang");
                kaigang.animation.play("kaigang", -1, 0);
                kaigang.setPosition(cc.p(eatActionChild.width/2, eatActionChild.height/2));
                eatActionChild.addChild(kaigang, 999999);
                break;

            case ActionType.DAMI:

                eatActionChild = eatActionNode.getChildByName("gang");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));

                var kaigang = new ccs.Armature("chipenggang");
                kaigang.animation.play("dami", -1, 0);
                kaigang.setPosition(cc.p(eatActionChild.width/2, eatActionChild.height/2));
                eatActionChild.addChild(kaigang, 999999);
                break;

            case ActionType.BUGANG:
                if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
                    MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU)
                {
                    eatActionChild = eatActionNode.getChildByName("gang");
                    eatActionChild.removeAllChildren();
                    eatActionChild.visible = true;
                    eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                    var projNode = new cc.Sprite("spine/bu/chenglaizi.png");
                    projNode.setScale(0.0);
                    projNode.runAction(cc.sequence(cc.scaleTo(0.2, 1.2), cc.scaleTo(0.3, 1.0)) );
                    eatActionChild.addChild(projNode,999999);
                    break;
                }

                eatActionChild = eatActionNode.getChildByName("gang");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));

                var bugang = new ccs.Armature("chipenggang");
                bugang.animation.play("bu", -1, 0);
                bugang.setPosition(cc.p(eatActionChild.width/2, eatActionChild.height/2));
                eatActionChild.addChild(bugang, 999999);
                break;
        }
    }
    else
    {
        if (jsb.fileUtils.isFileExist("spine/shangjindonghua/NewAnimation/NewAnimation0.plist")) 
        {
            cc.spriteFrameCache.addSpriteFrames("spine/shangjindonghua/NewAnimation/NewAnimation0.plist", "spine/shangjindonghua/NewAnimation/NewAnimation0.png");
        }
        if (jsb.fileUtils.isFileExist("spine/shangjindonghua/NewAnimation/NewAnimation1.plist")) 
        {
            cc.spriteFrameCache.addSpriteFrames("spine/shangjindonghua/NewAnimation/NewAnimation1.plist", "spine/shangjindonghua/NewAnimation/NewAnimation1.png");
        }
        if (jsb.fileUtils.isFileExist("spine/shangjindonghua/NewAnimation/NewAnimation.ExportJson")) 
        {
            ccs.armatureDataManager.addArmatureFileInfo("spine/shangjindonghua/NewAnimation/NewAnimation.ExportJson");
        }

        delayTime = 0.8;
        
        switch(actType)
        {   //下面胡牌类型加的runAction是在血流使用
            case ActionType.CHI:

                eatActionChild = eatActionNode.getChildByName("chi");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                var projNode = createSpine("spine/chi/chi.json", "spine/chi/chi.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setTimeScale(eTime);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                eatActionChild.addChild(projNode,999999);
                break;

            case ActionType.PENG:

                eatActionChild = eatActionNode.getChildByName("peng");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                var projNode = createSpine("spine/peng/peng.json", "spine/peng/peng.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setTimeScale(eTime);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                eatActionChild.addChild(projNode,999999);
                break;

            case ActionType.GANG:

                eatActionChild = eatActionNode.getChildByName("gang");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                var projNode = createSpine("spine/gang/gang.json", "spine/gang/gang.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setTimeScale(eTime);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                eatActionChild.addChild(projNode,999999);
                break;

            case ActionType.SHANGJIN:

                eatActionChild = eatActionNode.getChildByName("gang");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                
                var gang = new ccs.Armature("NewAnimation");
                gang.animation.play("Animation1", -1, 0);
                gang.setPosition(cc.p(eatActionChild.width/2, eatActionChild.height/2));
                eatActionChild.addChild(gang, 999999);
                eatActionChild.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                    playEffectInPlay("shangjin",false);
                })))
                
                break;

            case ActionType.KAIGANG:
                eatActionChild = eatActionNode.getChildByName("gang");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(callback)));
                var projNode = new cc.Sprite("spine/kaigang/kaigang.png");
                projNode.setScale(0.0);
                projNode.runAction(cc.sequence(cc.scaleTo(0.2, 0.6), cc.scaleTo(0.3, 0.5)) );
                eatActionChild.addChild(projNode,999999);
                break;

            case ActionType.DAMI:
                eatActionChild = eatActionNode.getChildByName("gang");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(callback)));
                var projNode = new cc.Sprite("spine/kaigang/dami.png");
                projNode.setScale(0.0);
                projNode.runAction(cc.sequence(cc.scaleTo(0.2, 0.6), cc.scaleTo(0.3, 0.5)) );
                eatActionChild.addChild(projNode,999999);
                break;

            case ActionType.BUGANG:
                eatActionChild = eatActionNode.getChildByName("gang");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));

                var pngPath = "bu.png";
                var scaleTo = 0.6;
                var scaleTo2= 0.5;
                if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
                    MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU)
                {
                    pngPath = "chenglaizi.png";
                    scaleTo = 1.2;
                    scaleTo2 = 1.0;
                }

                var projNode = new cc.Sprite("spine/bu/" + pngPath);
                projNode.setScale(0.0);
                projNode.runAction(cc.sequence(cc.scaleTo(0.2, scaleTo), cc.scaleTo(0.3, scaleTo2)) );
                eatActionChild.addChild(projNode,999999);
                break;

            case ActionType.HU:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(callback)));
                var projNode = createSpine("spine/hu/skeleton.json", "spine/hu/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(eTime_old);
                eatActionChild.addChild(projNode,999999);
                // if (MjClient.gametype == MjClient.GAME_TYPE.XUE_LIU)
                // {
                //     cc.log("heq===========-------------");
                //     projNode.runAction(cc.sequence(cc.DelayTime(1.0),cc.removeSelf()));
                // }
                break;
            case ActionType.QINGYISE:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/qingyise/skeleton.json", "spine/qingyise/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                if (isJinZhongAPPType()) {
                    projNode.setTimeScale(eTime);
                } else {
                    projNode.setTimeScale(eTime_old);
                }
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.TIANHU:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/tianhu/skeleton.json", "spine/tianhu/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(eTime_old);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.DIHU:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/dihu/skeleton.json", "spine/dihu/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(eTime_old);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.QIDUI:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                if (MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ) {
                    eatActionChild.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(callback)));
                }
                var projNode = createSpine("spine/qidui/skeleton.json", "spine/qidui/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                if (isJinZhongAPPType()) {
                    projNode.setTimeScale(eTime);
                } else {
                    projNode.setTimeScale(eTime_old);
                }
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.GANGKAI:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(callback)));
                var projNode = createSpine("spine/dagangkaihua/dagangkaihua.json", "spine/dagangkaihua/dagangkaihua.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(eTime_old);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.ZIMO:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(callback)));
                var projNode = createSpine("spine/zimo/skeleton.json", "spine/zimo/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(eTime_old);
                eatActionChild.addChild(projNode,999999);
                break;

            case ActionType.FLOWER:
                eatActionChild = eatActionNode.getChildByName("hua");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));

                var projNode = createSpine("spine/buhua/skeleton.json", "spine/buhua/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ)
                    projNode.setScale(0.4);
                else
                    projNode.setScale(0.5);
                projNode.setTimeScale(eTime_old);
                eatActionChild.addChild(projNode,999999);

                break;
            case ActionType.LIANG:
                eatActionChild = eatActionNode.getChildByName("feng");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));

                var projNode = createSpine("spine/liangfeng/skeleton.json", "spine/liangfeng/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(eTime_old);
                eatActionChild.addChild(projNode,999999);

                break;
            case ActionType.TING:
                eatActionChild = eatActionNode.getChildByName("ting");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                var projNode = createSpine("spine/ting/ting.json", "spine/ting/ting.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setTimeScale(eTime);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                eatActionChild.addChild(projNode,999999);
                break;

            case ActionType.JIANGTING:
                cc.log("jiangting 将听   ");
                eatActionChild = eatActionNode.getChildByName("ting");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                var projNode = new cc.Sprite("spine/ting/jiangt.png");
                projNode.setScale(0.0);
                projNode.runAction(cc.sequence(cc.scaleTo(0.2, 0.6), cc.scaleTo(0.3, 0.5)) );
                eatActionChild.addChild(projNode,999999);
                break;

            case ActionType.LONG: //如皋长牌的龙
                eatActionChild = eatActionNode.getChildByName("gang");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                var projNode = createSpine("spine/long/long.json", "spine/long/long.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setTimeScale(eTime);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.SHUAIJIN: //乡宁摔金的摔金
                eatActionChild = eatActionNode.getChildByName("gang");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                var projNode = createSpine("spine/shuaijin/skeleton.json", "spine/shuaijin/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setTimeScale(eTime);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.YITIAOLONG: // 一条龙
                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/yitiaolong/skeleton.json", "spine/yitiaolong/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(eTime);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.YITIAOLONG_NEW: // 一条龙
                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/yitiaolong_new/skeleton.json", "spine/yitiaolong_new/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(eTime);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.DUIDUIHU: // 碰碰胡
                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/duiduihu/skeleton.json", "spine/duiduihu/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(eTime);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.DUIDUIHU_NEW: // 碰碰胡
                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/duiduih_new/skeleton.json", "spine/duiduih_new/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(eTime);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.DADIAOCHE: // 大吊车
                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/dadiaoche/skeleton.json", "spine/dadiaoche/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(eTime);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.DAJUE: // 大绝
                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/dajue/skeleton.json", "spine/dajue/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(eTime);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.QUANHUN:
                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(callback)));
                var projNode = createSpine("spine/quanhun/skeleton.json", "spine/quanhun/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(eTime_old);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.QINGHU:
                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(callback)));
                var projNode = createSpine("spine/qing/skeleton.json", "spine/qing/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(eTime_old);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.BAOQUANHUN:
                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(callback)));
                var projNode = createSpine("spine/baoquanhun/skeleton.json", "spine/baoquanhun/skeleton.atlas");
                projNode.setAnimation(0, aniName, false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(eTime_old);
                eatActionChild.addChild(projNode,999999);
                break;

        }
    }

}

function playZhuanYunPropAct(node, index)
{
    cc.log("----playZhuanYunPropAct----node=" + node + " index=" + index);
    var props = ["CaiShendao", "JinBIquan", "ZhuanYunfengche", "JuBaopen"];
    if (!cc.sys.isObjectValid(node) || index < 0 || index >= props.length)
        return;

    cc.spriteFrameCache.addSpriteFrames("fangKa/prop/" + props[index] + "/" + props[index] + "0.plist", "fangKa/prop/" + props[index] + "/" + props[index] + "0.png");
    ccs.armatureDataManager.addArmatureFileInfo("fangKa/prop/" + props[index] + "/" + props[index] + ".ExportJson");
    var armature = new ccs.Armature(props[index]);
    armature.animation.play(props[index], -1, 0);
    armature.setPosition(node.getPosition());
    armature.setScale(node.getScale());
    node.getParent().addChild(armature);
}


//播放表情
function PlayEmojiAct(node, num)
{
    if(num >= 10000){
        PlayEmojiActGuizu(node,num);
        return;
    }
    var framename;
    var arry = [];
    var delaytime = 0;
    var playCount = 1;
    var scale = -1;

    var infoList = [
        {framename : "happy", delaytime : 0.1, playCount : 8},
        {framename : "angry", delaytime : 0.15, playCount : 2},
        {framename : "smaile", delaytime : 0.2, playCount : 2},
        {framename : "han", delaytime : 0.2, playCount : 5},
        {framename : "zhiya", delaytime : 0.2, playCount : 5},
        {framename : "shihua", delaytime : 0.2, playCount : 2},
        {framename : "jiong", delaytime : 0.23, playCount : 2},
        {framename : "sleep", delaytime : 0.2, playCount : 2},
        {framename : "fennu", delaytime : 0.2, playCount : 3},
        {framename : "yun", delaytime : 0.2, playCount : 3},
        {framename : "lihai", delaytime : 0.2, playCount : 1},
        {framename : "touxiang", delaytime : 0.2, playCount : 3},
        {framename : "se", delaytime : 0.2, playCount : 3},
        {framename : "huaixiao", delaytime : 0.2, playCount : 2},
        {framename : "shaoxiang", delaytime : 0.2, playCount : 2}
    ];

    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
        isJinZhongAPPType() ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ){
        scale = 2;
        if(MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER)
        {
            scale = 1.5;
        }
        infoList = [
            {framename : "bb", delaytime : 0.1, playCount : 2},
            {framename : "daku", delaytime : 0.15, playCount : 2},
            {framename : "fennu_", delaytime : 0.2, playCount : 2},
            {framename : "guzhang", delaytime : 0.2, playCount : 8},
            {framename : "kaiqiang", delaytime : 0.2, playCount : 2},
            {framename : "kaixin", delaytime : 0.2, playCount : 2},
            {framename : "keshui", delaytime : 0.2, playCount : 2},
            {framename : "pp", delaytime : 0.2, playCount : 2},
            {framename : "tuxue", delaytime : 0.2, playCount : 2},
            {framename : "caishen", delaytime : 0.15, playCount : 1},
            {framename : "xishou", delaytime : 0.15, playCount : 1}
        ];
    }

    var obj = infoList[num];
    if(obj){
        framename = obj.framename;
        delaytime = obj.delaytime;
        playCount = obj.playCount;
    }

    for(var i = 0; i < 15; i++)
    {
        var frame = cc.spriteFrameCache.getSpriteFrame(framename + i + ".png");
        if(frame)
        {
            arry.push(frame);
        }
    }

    var firstFrame = new cc.Sprite();
    firstFrame.initWithSpriteFrame(arry[0]);
    firstFrame.setPosition(node.getPosition());
    firstFrame.setScale(node.getScale());
    if(scale > 0){
        firstFrame.setScale(scale);
    }
    node.getParent().addChild(firstFrame);
    var animate = cc.animate(new cc.Animation(arry, delaytime, playCount));
    firstFrame.runAction(cc.sequence(animate,cc.removeSelf()));

    //新版表情 炮兵音效
    if(isJinZhongAPPType()||
        MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ)
    {
        var url = "chat/" + framename;
        playEffect(url);
    }
    
}
//贵族互动表情
function PlayEmojiActGuizu(node, num){
    var obj = MjClient.GuizuEmojiConfig[num+""];
    if(!obj){
        return;
    }
    var filePath = "userInfo_3.0/zhuangBan/chat_emoji/"+obj.name+"/"+obj.name;
    if(!jsb.fileUtils.isFileExist(filePath+".json")){
        cc.log("PlayEmojiAct filePath not exist",(filePath+".json"))
        return;
    }
    node.getParent().removeChildByName("emojAnimationNode")
    var projNode = createSpine(filePath+".json", filePath+".atlas");
    projNode.setAnimation(0, "animation", false);
    projNode.setPosition(node.getPosition());
    projNode.y -= 140;
    projNode.setName("emojAnimationNode");
    projNode.scale = MjClient.size.width / 1280;
    projNode.setCompleteListener(function(trackEntry){
        var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
        if(loopCount >= 1){
            projNode.runAction(cc.sequence(cc.delayTime(0.2),cc.removeSelf()))
        }
    });
    node.getParent().addChild(projNode,9999);
    if(obj.sound){
        //var url = "chat/" + framename;
        //playEffect(url);
    }
}

createAnimation = function(path, count, rect, t)
{
    var frames = [];
    var prefix = path;
    for(var temp_x = 0; temp_x < count; temp_x++)
    {
        var fileName = prefix + temp_x + ".png";
        var frame = new cc.SpriteFrame(fileName, rect);
        frames.push(frame);
    }
    t = t === undefined ? 0.25 : t;
    var animation = new cc.Animation(frames, t);
    var action = new cc.Animate(animation);
    return action;
};







//显示玩家文字
function showUserChat(node, off, msg)
{
    var tData = MjClient.data.sData.tData;
    if(msg.type == 4 && off == 0 && tData.roundNum==tData.roundAll){ //位置截取

        var geogData = [];
        for (var i = 0; i < tData.uids.length; i++) {
            var pl = MjClient.data.sData.players[tData.uids[i]];
            if (pl && pl.locationMsg) {
                geogData.push(pl.locationMsg);
            }
        }

        if (geogData.length == tData.maxPlayer && tData.maxPlayer > 2 && MjClient.tableid != tData.tableid)
        {
            MjClient.tableid = tData.tableid;
            var displayCount = 0;
            for(var i=0; i<geogData.length; i++)
            {
                for(var j=i+1; j<geogData.length; j++)
                {
                    var plyoneV = new Array();
                    var plytwoV = new Array();
                    plyoneV = geogData[i].split(";");
                    plytwoV = geogData[j].split(";");


                    var plone = getUIPlayerByUID(plyoneV[3]);
                    var _oneLatitude = plone.info.location.latitude;
                    var _oneLongitude = plone.info.location.longitude;
                    if(!_oneLatitude)  _oneLatitude = plyoneV[0];
                    if(!_oneLongitude)  _oneLongitude =  plyoneV[1];

                    var pltwo = getUIPlayerByUID(plytwoV[3]);
                    var _twoLatitude = pltwo.info.location.latitude;
                    var _twoLongitude = pltwo.info.location.longitude;
                    if(!_twoLatitude) _twoLatitude = plytwoV[0];
                    if(!_twoLongitude) _twoLongitude =  plytwoV[1];

                    var distance = MjClient.native.CalculateLineDistance(_oneLatitude, _oneLongitude, _twoLatitude, _twoLongitude);

                    if( distance <= 50 && distance >=0 )
                    {
                        displayCount++;
                        break;
                    }
                }

                if (displayCount>0)
                {
                    break;
                }
            }

            //add by sking 当有人距离小于50米 时候提示
            if(displayCount >= 1 && !tData.matchId)
            {
                if (tData.maxPlayer == 4)
                    MjClient.Scene.addChild(new showDistanceLayer());
                else
                    MjClient.Scene.addChild(new showDistance3PlayerLayer(tData.maxPlayer));
            }
        }


        return;


    }

    var pl = getUIPlayer(off);
    //var uid = msg.uid;
    var type = msg.type;
    var message = msg.msg;
    var num = msg.num;

    if(pl && msg.uid == pl.info.uid)
    {
        node.ignoreContentAdaptWithSize(true);
        if(type == 0)
        {
            node.getParent().visible = true;
            node.setString(message);
            var callback = function()
            {
                node.getParent().visible = false;
            };

            node.getParent().width = node.getString().length * node.getFontSize() + 72;
            node.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(callback)));
        }
        else if(type == 1)
        {
            postEvent("SetChatTextVisible",true);

            node.getParent().visible = true;
            var text = message.text;
            node.setString(text);
            var callback = function()
            {
                node.getParent().visible = false;

                postEvent("SetChatTextVisible",false);
            };

            var musicnum = msg.num + 1;

            //var one = node.getCustomSize().width / 20.0;
            node.getParent().width = node.getString().length * node.getFontSize() + 72;
            if(MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER) {
                if (text.length > 13 && off == 2) {
                    text = text.substring(0, 12);
                    node.setString(text + "...");
                    node.getParent().width = node.getString().length * node.getFontSize();
                }
            }
            if(MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN) {
                if (text.length > 13 && off == 2) {
                    text = text.substring(0, 10);
                    node.setString(text + "...");
                    node.getParent().width = node.getString().length * node.getFontSize();
                }
            }
            //var voiceType = getCurrentVoiceType() == 0 ? "normal" : MjClient.gameType;
            var voiceType = message.voiceType == 0 ? "normal" : MjClient.gameType;
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE ||
                MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ) { //淮安不用普通话和牛十别、打码子

                voiceType = MjClient.gameType;
            }
            if(MjClient.gameType == MjClient.GAME_TYPE.XIN_SI_YANG){
                voiceType = MjClient.gameType;
            }

            if(cc.sys.isObjectValid(MjClient.playui) && MjClient.playui.__proto__.getCahtText) {
                voiceType = MjClient.gameType;
            }
            if(MjClient.isInGoldField() && MjClient.getGoldFiledType() == 1){
                voiceType = GoldPrefix + MjClient.gameType;
            }
            if(GameSound4Chat[voiceType])
            {
                if(MjClient.playui && !MjClient.playui.visible && 
                    (MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_JZ || 
                    MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO || 
                    MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ)) {

                }else {
                    playEffect(GameSound4Chat[voiceType][getRandomRange(0,GameSound4Chat[voiceType].length-1)] + musicnum, false, pl.info.sex);
                }
            }
            node.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(callback)));
        }
        else if(type == 2)
        {
            var em_node = node.getParent().getParent().getChildByName("emoji");
            PlayEmojiAct(em_node, msg.num);
        }
        else if(type == 3)//播放录音
        {
            playRecord(node, num, message);
        }
        else if (type == 5) // 转运道具
        {
            var em_node = node.getParent().getParent().getChildByName("emoji");
            playZhuanYunPropAct(em_node, msg.num);
        }
    }
}

function playRecord(node, num, message) {
    if (getSpeakVolume() != 0) {
        pauseMusicAndAllEffects();
        MjClient.isPlayRecord = true;
    }

    if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb()) {
        h5.weixinHelper.playRecord(message);
    } else {
        cc.audioEngine.unloadEffect(message);
    }

    node.getParent().setVisible(true);
    node.setString(" ");
    node.getParent().width = node.getString().length * node.getFontSize() + 72;

    var voicebg = node.getParent().getChildByName("voicebg") || node.getParent().getChildByName("sp_voice") || node.getParent().getChildByName("text_voice");
    voicebg.stopAllActions();
    voicebg.setVisible(true);

    reallyPlayEffect(message, false, true);

    var callback = function() {
        node.getParent().setVisible(false);
        voicebg.setVisible(false);
        voicebg.stopAllActions();
        MjClient.downAndPlayVoiceMessageQueue = MjClient.downAndPlayVoiceMessageQueue || [];
        if (MjClient.downAndPlayVoiceMessageQueue.length == 0) {
            MjClient.isPlayRecord = false;
            resumeMusicAndAllEffects();
        }
    };

    var _tempRecordVoiceAnimate = createAnimation("animate/voice/", 4, cc.rect(0, 0, 23, 30));
    voicebg.runAction(cc.repeatForever(_tempRecordVoiceAnimate));
    var time = Number(num / 1000);
    if (!time) time = 1;
    node.runAction(cc.sequence(cc.delayTime(time < 1 ? 1 : time), cc.callFunc(callback)));
}

//设置混子牌是否显示
function setHunNodeVisible(isVisible)
{
    MjClient.playui.jsBind.banner.hunPai._node.visible = isVisible;

}


function getFinalHunCardMsg()
{
    var sData = MjClient.data.sData;
    if(sData && sData.tData)
    {
        var tData = sData.tData;
        var hunCardMsg = tData.hunCard;
        if(MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
            MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
            MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG)
        {
            hunCardMsg = tData.showCard;
        }
        else if(MjClient.gameType === MjClient.GAME_TYPE.HAI_AN_BAI_DA)
        {
            hunCardMsg = tData.fanCard;
        }
        else if(MjClient.gameType === MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
                MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU)
        {
            hunCardMsg = tData.chaoTianCard;
        }
        else if(MjClient.gameType === MjClient.GAME_TYPE.XU_ZHOU)
        {
            hunCardMsg = getShowHunCard(Number(hunCardMsg));
        }
        else if(MjClient.gameType === MjClient.GAME_TYPE.LEI_YANG_GMJ)
        {
            hunCardMsg = MjClient.majiang.getShanGunCard(hunCardMsg);
        }else if(MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG){
            hunCardMsg = MjClient.data.sData.tData.hunCard;
            if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                if(MjClient.data.sData.tData.showCard){
                    hunCardMsg = MjClient.data.sData.tData.showCard;
                }
            }
        }else if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ 
            && MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG){
            //王钓麻将没有赖子
            return -1;
        }
        return hunCardMsg;
    }
    return;
};

//设置地区信息
function setAreaTypeInfo(isVisible)
{
    // var info = MjClient.playui.jsBind.gameName._node;
    var info = MjClient.playui.jsBind.banner._node.getChildByName("gameName");
    if(!info){
        info = MjClient.playui.jsBind.gameName._node
    }
    if(isVisible && info)
    {
        // cc.log("----- sking ---222222222222222222222 --" + MjClient.gameType);
        var text = GameBg[MjClient.gameType];


        var size = new cc.Sprite(text).getContentSize();
        info.setContentSize(cc.size(info.height/size.height*size.width, info.height))
        info.loadTexture(text);
    }
    if(cc.sys.isObjectValid(MjClient.roundnumImgNode) && MjClient.roundnumImgNode.getChildByName("roundnumText"))
    {
        var _text = MjClient.roundnumImgNode.getChildByName("roundnumText");
        var contentSizeWidth = _text.getUserData();
        if (!contentSizeWidth)
        {
            contentSizeWidth = _text.getContentSize().width;
            _text.setUserData(contentSizeWidth);
        }
        _text.setContentSize(contentSizeWidth + 2,_text.getContentSize().height);
    }
    if(cc.sys.isObjectValid(MjClient.cardNumImgNode) && MjClient.cardNumImgNode.getChildByName("cardNumText"))
    {
        var _text = MjClient.cardNumImgNode.getChildByName("cardNumText");
        var contentSizeWidth = _text.getUserData();
        if (!contentSizeWidth)
        {
            contentSizeWidth = _text.getContentSize().width;
            _text.setUserData(contentSizeWidth);
        }
        _text.setContentSize(contentSizeWidth + 2,_text.getContentSize().height);
    }
}


/**
 * 获取 录音动画
 * */
function getVoiceStatusLayer()
{
    if(!MjClient.data._tempRecordStatusLayer)
    {
        var size = cc.winSize;
        MjClient.data._tempRecordStatusLayer = new cc.Layer();
        cc.director.getRunningScene().addChild(MjClient.data._tempRecordStatusLayer);

        var voiceBackGround = new ccui.Scale9Sprite("animate/startRecord/voiceBackGround.png");
        var layerSize = voiceBackGround.getContentSize();

        voiceBackGround.setContentSize(cc.size(layerSize.width, layerSize.height * 1.25));
        voiceBackGround.setPosition(size.width * 0.5, size.height * 0.55);
        MjClient.data._tempRecordStatusLayer.addChild(voiceBackGround);
        var height = cc.winSize.height / 3 / voiceBackGround.getContentSize().height;
        voiceBackGround.setScale(height);

        layerSize = voiceBackGround.getContentSize();

        var voiceStatusIcon = new cc.Sprite("animate/startRecord/0.png");
        voiceStatusIcon.setPosition(layerSize.width * 0.675, layerSize.height * 0.55);
        voiceBackGround.addChild(voiceStatusIcon);

        var voiceIcon = new cc.Sprite("animate/startRecord/recordIcon.png");
        voiceIcon.setPosition(layerSize.width * 0.325, layerSize.height * 0.55);
        voiceBackGround.addChild(voiceIcon);

        var voiceCancel = new cc.Sprite("animate/startRecord/cancel.png");
        voiceCancel.setPosition(layerSize.width * 0.5, layerSize.height * 0.55);
        voiceBackGround.addChild(voiceCancel);

        var voiceShort = new cc.Sprite("animate/startRecord/timeShort.png");
        voiceShort.setPosition(layerSize.width * 0.5, layerSize.height * 0.55);
        voiceBackGround.addChild(voiceShort);

        var tipsLabel = new cc.LabelTTF("手指上滑 , 取消发送","", 20);
        tipsLabel.setPosition(layerSize.width * 0.5, layerSize.height * 0.15);
        voiceBackGround.addChild(tipsLabel);

        MjClient.data._tempVoiceStatusAnimate = createAnimation("animate/startRecord/", 7, cc.rect(0,0,44,82));
        voiceStatusIcon.runAction(cc.repeatForever(MjClient.data._tempVoiceStatusAnimate));

        var callback = function ()
        {
            MjClient.data._tempRecordStatusLayer.setVisible(false);
        };


        MjClient.data._tempRecordStatusLayer.runCancelRecord = function ()
        {
            voiceIcon.setVisible(false);
            voiceStatusIcon.setVisible(false);
            voiceShort.setVisible(false);
            voiceCancel.setVisible(true);
            tipsLabel.setString("取消发送");
            MjClient.data._tempRecordStatusLayer.scheduleOnce(callback, 0.5);
        };

        MjClient.data._tempRecordStatusLayer.runStartRecord = function ()
        {
            voiceIcon.setVisible(true);
            voiceStatusIcon.setVisible(true);
            voiceCancel.setVisible(false);
            voiceShort.setVisible(false);
            tipsLabel.setString("手指上滑 , 取消发送");

            MjClient.data._tempRecordStatusLayer.setVisible(true);
            MjClient.data._tempRecordStatusLayer.unschedule(callback);
        };

        MjClient.data._tempRecordStatusLayer.runToCancelRecord = function ()
        {
            voiceIcon.setVisible(false);
            voiceStatusIcon.setVisible(false);
            voiceCancel.setVisible(true);
            voiceShort.setVisible(false);
            tipsLabel.setString("松开手指 , 取消发送");

            MjClient.data._tempRecordStatusLayer.setVisible(true);
        };

        MjClient.data._tempRecordStatusLayer.runStopRecord = function ()
        {
            voiceIcon.setVisible(true);
            voiceStatusIcon.setVisible(true);
            voiceCancel.setVisible(false);
            voiceShort.setVisible(false);

            MjClient.data._tempRecordStatusLayer.unschedule(callback);
            callback();
        };

        MjClient.data._tempRecordStatusLayer.runShortRecord = function ()
        {
            voiceIcon.setVisible(false);
            voiceStatusIcon.setVisible(false);
            voiceCancel.setVisible(false);
            voiceShort.setVisible(true);
            tipsLabel.setString("录音时间太短");

            MjClient.data._tempRecordStatusLayer.scheduleOnce(callback, 0.5);
        };
    }

    return MjClient.data._tempRecordStatusLayer;
}



//初始化声音data
function initVoiceData()
{
    //console.log("MjClient.remoteCfg" + MjClient.remoteCfg.voiceUrl);
    MjClient.data._tempRecordStatusLayer = null;
    MjClient.data._tempMessage = {};
    MjClient.data._JiaheTempTime = null;
    MjClient.atRecord = false;
    MjClient.downAndPlayVoiceMessageQueue = [];
}



/**
 * 运行录音动画
 * */
function runVoiceAction()
{
    var animateLayer = getVoiceStatusLayer();
    animateLayer.runStartRecord();
}



/**
 * 停止录音动画
 * */
function stopVoiceAction()
{
    var animateLayer = getVoiceStatusLayer();
    animateLayer.runStopRecord();
}



/**
 * 取消录音动画
 * */
function cancelVoiceAction()
{
    var animateLayer = getVoiceStatusLayer();
    animateLayer.runCancelRecord();
}


function shortVoiceAction()
{
    var animateLayer = getVoiceStatusLayer();
    animateLayer.runShortRecord();
}



function getTouchListener()
{
    return {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: false,
        status: null,

        onTouchBegan: function(touch, event)
        {
            console.log("在触摸东西");
            var tData = MjClient.data.sData.tData;
            if(MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER || 
                MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || 
                MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)
            {
                if(tData.tState == TableState.waitReady || tData.tState == TableState.waitJoin)
                {
                    return false;
                }
            }
            var target = event.getCurrentTarget();
            if(!target.visible){
                //按钮不可见直接屏蔽触摸事件，避免触摸到隐藏的按钮还触发事件
                return false;
            }
            var pos = target.getParent().convertTouchToNodeSpace(touch); // 世界坐标转换 (子节点相对于父节点的位置)

            // 如果触碰起始地点在本区域中
            if(!cc.rectContainsPoint(target.getBoundingBox(), pos))
            {
                return false;
            }

            //console.log("好吧");
            return true;
        },
        onTouchMoved: function(touch, event)
        {
            console.log("在移动东西");
            var target = event.getCurrentTarget();
            var pos = target.getParent().convertTouchToNodeSpace(touch); // 世界坐标转换 (子节点相对于父节点的位置)
            // 如果触碰起始地点在本区域中
            var rect = target.getBoundingBox();
            rect.height *= 2;
            rect.width *= 2;
            if(!cc.rectContainsPoint(rect, pos))
            {
                if(this.status == 0)
                {
                    return false;
                }

                this.status = 0;
                console.log("松开手指取消发送");
                getVoiceStatusLayer().runToCancelRecord();
                return true;
            }

            if(this.status == 1)
            {
                return false;
            }

            console.log("上滑取消发送");
            this.status = 1;
            getVoiceStatusLayer().runStartRecord();
            return true;
        },
        onTouchEnded: function(touch, event)
        {
            return true;
        },
        onTouchCancelled: function(touch, event)
        {
            return true;
        }
    };
}



/**
 * 开始录音
 * */
function startRecord()
{
    var clubData = getClubInfoInTable();
    if(clubData && clubData.isForbVoice){
        return;
    }

    MjClient.data._JiaheTempTime = new Date();
    MjClient.atRecord = true;
    pauseMusicAndAllEffects();
    MjClient.native.StartRecord(jsb.fileUtils.getWritablePath(), "recordFile" + SelfUid());
    runVoiceAction();
}


/**
 * 结束录音
 * */
function endRecord()
{
    var clubData = getClubInfoInTable();
    if(clubData && clubData.isForbVoice){
        MjClient.showToast("盟主（会长）已禁用语音功能");
        return;
    }

    MjClient.data._JiaheTempTime = (new Date().getTime()) - MjClient.data._JiaheTempTime.getTime();
    MjClient.native.HelloOC(MjClient.data._JiaheTempTime);
    MjClient.atRecord = false;
    resumeMusicAndAllEffects();

    if(MjClient.data._JiaheTempTime > 1000)
    {
        MjClient.native.EndRecord("uploadRecord");
        stopVoiceAction();
        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fasongshishiyuyin", {uid: SelfUid()});
    }
    else
    {
        MjClient.data._JiaheTempTime = 0;
        MjClient.native.EndRecord("cancelRecord");
        shortVoiceAction();
    }
}



/**
 * 取消录音
 * */
function cancelRecord()
{
    var clubData = getClubInfoInTable();
    if(clubData && clubData.isForbVoice){
        return;
    }

    MjClient.data._JiaheTempTime = 0;
    MjClient.atRecord = false;
    resumeMusicAndAllEffects();
    MjClient.native.EndRecord("cancelRecord");
    cancelVoiceAction();
}



/**
 * 下载录音, 调用 播放函数
 * */
function downAndPlayVoice(uid, filePath)
{
    var index = getUiOffByUid(uid);
    //console.log("index is downAndPlayVoice" + index);
    MjClient.native.DownLoadFile(jsb.fileUtils.getWritablePath(), index + ".mp3", MjClient.remoteCfg.voiceUrl + filePath, "playVoice");
}




//倒计时音效的Handle
var playTimeUpEff = null;
//显示计时器(需要移植)
function arrowbkNumberUpdate(node, endFunc, tikNum)
{
    node.ignoreContentAdaptWithSize(true);
    if (MjClient.data.sData && MjClient.data.sData.tData.fieldCountdown){
        node.setString(""+MjClient.data.sData.tData.fieldCountdown);
    }
    else if (tikNum)
    {
        node.setString("" + tikNum);
    }
    else{
        node.setString("10");
    }
    var number = function()
    {
        if(node.getString() == 0)
        {
            GLog("==================================================arrowbkNumberUpdate 11111 ======================");
            if (endFunc) {
//				endFunc();    // 闹钟10秒倒计时出牌
            }
            node.stopAllActions();
        }
        else
        {
            var number = node.getString() - 1;
            if(number > 9)
            {
                node.setString(number);
            }
            else
            {
                if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI ||
                    MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE ||
                    MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
                    MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
                    MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                    MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                    MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
                    MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                    MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
                    MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI)
                    node.setString(number);
                else
                    node.setString("0" + number);
                var sData = MjClient.data.sData;
                var tData = sData.tData;
                var uids = tData.uids;

                if(uids[tData.curPlayer] == SelfUid())
                {
                    if(number == 0)
                    {
                        //记录音效的handle
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ){
                            playTimeUpEff = playEffect("loop_alarm", false);
                        }else{
                            playTimeUpEff = playEffect("loop_alarm", true);
                        }
                        MjClient.native.NativeVibrato();
                    }
                }else{
                    if(number == 0){
                        postEvent("startOperWait");
                    }
                }
            }
        }
    };

    node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1.0), cc.callFunc(number, node))));
}

//隐藏听牌操作按钮
function hideTingBtn() {
    MjClient.playui.jsBind.eat.ting._node.visible = false;
    MjClient.playui.jsBind.eat.noTing._node.visible = false;
}




function stopEffect(id)
{
    if(id == undefined || id == null) return;

    cc.audioEngine.stopEffect(id);
}

function playEffect(sd, isLoop, sex)
{
    // if (cc.sys.OS_WINDOWS == cc.sys.os) return -1;

    // mylog(sd);
    var str = "sound/"+sd+".mp3";
    //if (cc.sys.OS_ANDROID == cc.sys.os)
    //{
    //    str = "sound_ogg/"+sd+".ogg";
    //}

    if(MjClient.native.yayaVoice && MjClient.native.yayaVoice._isOpenVoice ){
        return; // 实时语音状态不播放音效    
    }

    //支持男女声
    if (str.indexOf("/nv/") >= 0 && sex == 1)
    {
        var fullFilePath = str.replace("/nv/", "/nan/");
        if (jsb.fileUtils.isFileExist(fullFilePath))
        {
            cc.log(" fullFilePath ---------- " + fullFilePath);
            str = fullFilePath;
        }
    }

    return reallyPlayEffect(str, isLoop);
}

function playEffectInPlay(card, isLoop)
{
    if(MjClient.playui && MjClient.playui.playEffectInPlay) return MjClient.playui.playEffectInPlay(card, isLoop);

    if(MjClient.playui && !MjClient.playui.visible && (MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_JZ ||
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ)){
        return;
    }
    var voiceType = getCurrentVoiceType() == 0 ? "normal" : MjClient.gameType;
    if (MjClient.gameType == MjClient.GAME_TYPE.NIU_NIU || //牛牛暂时不用normal中的音效
        MjClient.gameType == MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN ||
        MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR ||
        MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO ||
        MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA ||
        MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO ||
        MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA ||
        MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA_NEW ||
        MjClient.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA ||
        MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI ||
        MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN ||
        MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER ||
        MjClient.gameType == MjClient.GAME_TYPE.ML_HONG_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
        MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI ||
        GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI ||
        GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU ||
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN ||
        MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
        MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG ||
        MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE ||
        MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
        MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
        MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
        MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU ||
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
        MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU ||
        MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
        MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ ||
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN ||
        MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710 ||
        MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE ||
        MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER ||
        MjClient.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING || 
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_ZI_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN ||
        MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.EN_SHI_SHAO_HU
    )
    {
        voiceType = MjClient.gameType;
    }

    if(MjClient.gameType == MjClient.GAME_TYPE.XIN_SI_YANG){
        voiceType = MjClient.gameType;
    }

    // 临汾地区玩法，不用 normal ，用 normal_linfen
    if (voiceType == "normal" &&
        ( MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI
        || MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI
        || MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.FEN_XI_YING_KOU
        || MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN
        || MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN
        || MjClient.gameType == MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG)
    ) {
        voiceType = "normal_linfen";
    }

    cc.log("--------------voiceType = " + voiceType);
    var origSounds = GameSound4Play[voiceType][card.toString()];
    if (!origSounds)
    {
        cc.log("playEffectInPlay error: sound is null: "+card);
        return null;
    }
    var sounds = origSounds.concat();


    //支持男女声
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var pl = sData.players[uids[tData.curPlayer]];
    if (!pl)
        pl = sData.players[SelfUid()]

    //听牌语音的特殊处理(起手听牌时由于当前玩家可以是任何玩家的原因，导致玩家性别混乱)
    var tingGameType = [MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW, MjClient.GAME_TYPE.NING_XIANG_KAI_WANG, MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG,
        MjClient.GAME_TYPE.YI_YANG_MA_JIANG];

    if(tingGameType.indexOf(MjClient.gameType) != -1 && card.toString() === "ting"){
        pl = sData.players[arguments[2]];
    }

    if (pl && pl.info.sex == 1)
    {
        for (var i=0; i<sounds.length; i++)
        {
            var newPath = sounds[i].replace("/nv/", "/nan/").replace("/nv_local/", "/nan_local/");
            var fullFilePath = "sound/"+newPath+".mp3";
            if (jsb.fileUtils.isFileExist(fullFilePath))
            {
                sounds[i] = newPath;
            }
        }
    }

    // 使扑克类支持本地话
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
    {
        if((MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN) &&
            util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceCHANGSHA, 0) == 1){
            //长沙话处理
            for (var i = 0; i < sounds.length; i++) {
                var newPath = "";
                if (sounds[i].indexOf("/nv/") != -1)
                    newPath = sounds[i].replace("/nv/", "/nv_changsha/");
                else if (sounds[i].indexOf("/nan/") != -1)
                    newPath = sounds[i].replace("/nan/", "/nan_changsha/");
                if (newPath != "" && jsb.fileUtils.isFileExist("sound/" + newPath + ".mp3"))
                    sounds[i] = newPath;
            }
        }else if( getCurrentVoiceType() == 1){

            if(MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG)
            {
                for (var i = 0; i < sounds.length; i++) {
                    var newPath = "";
                    if (sounds[i].indexOf("normal") != -1)
                        newPath = sounds[i].replace("normal", "local_ningxiang");
                    if (newPath != "" && jsb.fileUtils.isFileExist("sound/" + newPath + ".mp3"))
                        sounds[i] = newPath;
                }
            }
            else if(MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG)
            {
                for (var i = 0; i < sounds.length; i++) {
                    var newPath = "";
                    if (sounds[i].indexOf("normal") != -1)
                        newPath = sounds[i].replace("normal", "local_taojiang");
                    if (newPath != "" && jsb.fileUtils.isFileExist("sound/" + newPath + ".mp3"))
                        sounds[i] = newPath;
                }
            }
            else if(MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG || MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW)
            {
                for (var i = 0; i < sounds.length; i++) {
                    var newPath = "";
                    if (sounds[i].indexOf("normal") != -1)
                        newPath = sounds[i].replace("normal", "local_anhua");
                    if (newPath != "" && jsb.fileUtils.isFileExist("sound/" + newPath + ".mp3")){
                        sounds[i] = newPath;
                    }
                }
            }
            else if(MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG)
            {
                cc.log("yiyangmj");
                for (var i = 0; i < sounds.length; i++) {
                    var newPath = "";
                    if (sounds[i].indexOf("normal") != -1)
                        newPath = sounds[i].replace("normal", "local_yiyang");
                    if (newPath != "" && jsb.fileUtils.isFileExist("sound/" + newPath + ".mp3"))
                        sounds[i] = newPath;
                    cc.log("local languge" + sounds[i]);
                }
            }
            else if(MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA &&
                MjClient.gameType != MjClient.GAME_TYPE.SAN_DA_HA && 
                MjClient.gameType != MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO && 
                MjClient.gameType != MjClient.GAME_TYPE.SAN_DA_HA_NEW && 
                MjClient.gameType != MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA)
            {
                for (var i = 0; i < sounds.length; i++) {
                    var newPath = "";
                    if (sounds[i].indexOf("/nv/") != -1)
                        newPath = sounds[i].replace("/nv/", "/nv_local/");
                    else if (sounds[i].indexOf("/nan/") != -1)
                        newPath = sounds[i].replace("/nan/", "/nan_local/");
                    if (newPath != "" && jsb.fileUtils.isFileExist("sound/" + newPath + ".mp3"))
                        sounds[i] = newPath;
                }
            }
        }

    }

    var soundFile = sounds[0];
    switch (voiceType)
    {

        case MjClient.GAME_TYPE.LIAN_YUN_GANG:
        case MjClient.GAME_TYPE.DONG_HAI:
        case MjClient.GAME_TYPE.GUAN_YUN:
            if (card == 31 || card == 51 || card == 81)
            {
                var sData = MjClient.data.sData;
                var tData = sData.tData;
                var uids = tData.uids;
                var pl = sData.players[uids[tData.curPlayer]];
                if (pl.mjput.length == 1 && tData.uids[tData.zhuang] == pl.info.uid)//庄家第一张打
                {
                    soundFile = sounds[1];
                }
            }
            else if (card == 91 || card == "chi" || card == "fangpao" || card == "peng" || card == "zimo")
            {
                soundFile = sounds[getRandomRange(0,100)<50 ? 0 : 1];
            }
            else if (card == "ting")
            {
                soundFile = sounds[getRandomRange(0,2)];
            }
            break;
        case MjClient.GAME_TYPE.SHU_YANG:
            soundFile = sounds[getRandomRange(0,100)<50 ? 0 : 1];
            break;
        case MjClient.GAME_TYPE.SU_QIAN:
            if (card == 1 || card == 91)
            {
                soundFile = sounds[getRandomRange(0,2)];
            }
            else if (card == 2 || card == 3 || card == 4 || card == 8 ||
                card == 11 || card == 12 || card == 15 || card == 18 || card == 19 ||
                card == 21 || card == 22 || card == 23 || card == 25 || card == 26 || card == 28 || card == 29 ||
                card == 31 || card == 41 || card == 51 || card == 61 || card == 71 ||
                card == "anGang" || card == "gang" || card == "hu" || card == "peng" || card == "ting" || card == "zimo")
            {
                soundFile = sounds[getRandomRange(0,100)<50 ? 0 : 1];
            }
            break;
        case MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN:
        case MjClient.GAME_TYPE.PAO_DE_KUAI:
        case MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO:
        case MjClient.GAME_TYPE.PAO_DE_KUAI_TY:
        case MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN:
        case MjClient.GAME_TYPE.PAO_DE_KUAI_JZ:
        case MjClient.GAME_TYPE.PAO_DE_KUAI_HA:
        case MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW:
        case MjClient.GAME_TYPE.PAO_DE_KUAI_LYG:
        case MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI:
        case MjClient.GAME_TYPE.PAO_DE_KUAI_NT:
        case MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN:
        case MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU:
        case MjClient.GAME_TYPE.DOU_DI_ZHU_NT:
        case MjClient.GAME_TYPE.DOU_DI_ZHU_HA:
            if (card == "pass" || card == "single")
            {
                if (card == "single")
                    cc.audioEngine.stopAllEffects();
                soundFile = sounds[getRandomRange(0,100)<50 ? 0 : 1];
            }
            break;
        case "normal":
            if (MjClient.gameType == MjClient.GAME_TYPE.RU_GAO ||
                MjClient.gameType == MjClient.GAME_TYPE.RU_GAO_ER ||
                MjClient.gameType == MjClient.GAME_TYPE.BAI_PU_LIN_ZI ||
                MjClient.gameType == MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG ||
                MjClient.gameType == MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG
            )
            {
                if (card == 1 || card == 71 || card == 81 || card == 91)
                {
                    soundFile = "normal_rugao/nv/"+card;
                }
            }

            if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN)
            {
                if (card == 'gang' || card == 'anGang' )
                {
                    soundFile = "normal/nv/bu";
                }
            }

            if (MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ)
            {
                if (card == 'gang' || card == 'anGang' )
                {
                    soundFile = "normal/nv/bu";
                }
            }

            if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI)
            {
                if (card == "flower")
                {
                    soundFile = "normal/nv/bu";
                }
            }


            // 山西，临汾app，新版听牌语音：统一去掉“小心别放炮“
            if (isJinZhongAPPType() ||
                MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ)
            {
                if(card == "ting")
                {
                    soundFile = "normal/nv/ting1"
                }
            }

            break;
        case MjClient.GAME_TYPE.XU_ZHOU:
            if (card == 1)
            {
                soundFile = sounds[getRandomRange(0,2)];
            }
            else if (card == 21 || card == 71 ||
                card == "chi" || card == "hu" || card == "peng")
            {
                soundFile = sounds[getRandomRange(0,100)<50 ? 0 : 1];
            }
            break;
        case MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU:
            if (card == "fangpao")
            {
                soundFile = "";
            }
            break;
        case MjClient.GAME_TYPE.TONG_HUA:
            if (card == "fangpao")
            {
                if (pl.info.sex != 1) // 男
                    soundFile = sounds[getRandomRange(0,100)<50 ? 0 : 1];
            }
            else if (card == "zimo")
            {
                if (pl.info.sex == 1) // 男
                    soundFile = sounds[getRandomRange(0,100)<50 ? 0 : 1];
                else
                {
                    var rand = getRandomRange(0,90);
                    if (rand < 30)
                        soundFile = sounds[0];
                    else if (rand < 60)
                        soundFile = sounds[1];
                    else
                        soundFile = sounds[2];
                }
            }
            break;
        case MjClient.GAME_TYPE.ML_HONG_ZI:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.GUI_YANG_ZI_PAI:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.XIANG_XI_2710:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.YUE_YANG_PENG_HU:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI:
            soundFile = sounds[ziPai.getVoiceType()];
            break;
        case MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU:
            if(isHunCard(card))
                soundFile = "";
            break;
        case MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU:
            if(isHunCard(card))
                soundFile = "";
            break;
        // case "normal_linfen":
        //     if(MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN)
        //     {
        //         if(pl.isTing)
        //         {
        //             if(!MjClient.majiang.isEqualHunCard(card))
        //             {
        //                 soundFile = "";
        //                 cc.log("commounfunc------无播放声音-----11111"+card);
        //             }
        //             cc.log("commounfunc------播放声音1-----11111"+card);
        //         }
        //         cc.log("commounfunc------无播放声音2-----11111"+card);
        //     }
        //     break;
    }

    if (!soundFile || soundFile == "")
    {
        return;
    }

    var str = "sound/"+soundFile+".mp3";
    cc.log("================playEffectInPlay=========>>>>>>>>",str);
    cc.log("================playEffectInPlay===card======>>>>>>>>",card);
    //if (cc.sys.OS_ANDROID == cc.sys.os)
    //{
    //    str = "sound_ogg/"+soundFile+".ogg";
    //}

    return reallyPlayEffect(str, isLoop);
}

var isInitVolume = false;
function reallyPlayEffect(str, isLoop, isRecord){
    if (!isInitVolume) {
        isInitVolume = true;
        cc.audioEngine.setEffectsVolume(1);
    }
    var vol = 0;
    if (isRecord === true) {
        vol = getSpeakVolume();
    }else{
        vol = getEffectsVolume();
    }

    if (MjClient.atRecord && isLoop !== true)
        return 0;

    if (MjClient.isPlayRecord && isLoop !== true && !isRecord)
        return 0;

    var ret = cc.audioEngine.playEffect(str, isLoop === true, 1, 0, vol + 0.0001);//ios系统不识别0的音效设置
    if (ret && (MjClient.atRecord || (MjClient.isPlayRecord && !isRecord)))
        cc.audioEngine.pauseEffect(ret);

    return ret;
}

function pauseMusicAndAllEffects() {
    cc.audioEngine.pauseMusic();
    cc.audioEngine.stopAllEffects();
}

function resumeMusicAndAllEffects() {
    if (MjClient.atRecord || MjClient.isPlayRecord)
        return;

    cc.audioEngine.resumeMusic();
    if (playTimeUpEff) {
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ){
            playTimeUpEff = playEffect("loop_alarm", false);
        }else{
            playTimeUpEff = playEffect("loop_alarm", true);
        }
    }
}

function playMusic(sd)
{
    cc.audioEngine.stopMusic();
    var str = "sound/"+sd+".mp3";
    //if (cc.sys.OS_ANDROID == cc.sys.os)
    //{
    //    str = "sound_ogg/"+sd+".ogg";
    //}
    if (sd == "bgMain" && MjClient.isUseUIv3 && MjClient.isUseUIv3()){
        var themeIdx = MjClient.getUIThemeIndex();
        var theme = MjClient.getThemeInfo(themeIdx);
        str = "sound/bgMain3.0/"+theme.bgMusic;
    }
    if(cc.sys.OS_WINDOWS != cc.sys.os)
        cc.audioEngine.playMusic(str,true);

}

function getRandomRange(Min,Max)
{
    var Range = Max - Min + 1;
    return Min + Math.floor(Math.random() * Range);
}


//获取UIoff的位置 0 ，1， 2，3
function mj_getUiOffByUid(uid,uids)
{
    return getOffByIndex(uids.indexOf(uid));
}


//换座位
function changePositionByUIoff_mj(fromOff,ToPos)
{
    var _fromNode = getNode(fromOff).getChildByName("head");
    var _fromZoder = _fromNode.zIndex;
    //_fromNode.zIndex = 500;

    var seq1 = cc.sequence(cc.moveTo(0.2,ToPos), cc.callFunc(function () {
        _fromNode.zIndex = _fromZoder;
    }));
    _fromNode.runAction(seq1);
}

//重置四个玩家的位置
function resetPlayerHead_mj()
{
    cc.log("重置头像信息位置");
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    cc.log("======================重置头像信息位置 =  " + uids);

    for(var off = 0;off < 4;off++)
    {
        var node = getNode(off);
        var pl = getUIPlayer(off);

        if(!pl)
        {
            continue;
        }
        //初始化玩家金币和名称
        if((MjClient.getAppType()==MjClient.APP_TYPE.TXJINZHONGMJ || MjClient.getAppType()==MjClient.APP_TYPE.DQSHANXIMJ) &&
            MjClient.gameType != MjClient.GAME_TYPE.LV_LIANG_DA_QI &&
            MjClient.gameType != MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN && 
            !tData.fieldId)
            InitUserCoinAndName_jinzhong(node, off);
        else
            InitUserCoinAndName(node, off);
        if(off != 0)
        {
            //InitUserCoinAndName(node, off);

            //SetUserVisible_LYG(node, off)
        }

        //重置房主
        showFangzhuTagIcon(node.getChildByName("head"),off)

        //回放的时候需要刷新头像
        //if(MjClient.rePlayVideo != -1)
        {
            MjClient.loadWxHead(pl.info.uid, pl.info.headimgurl);
        }
        //回放的时候需要刷新手牌
        if(MjClient.rePlayVideo != -1)
        {
            refreshHandCardForReplay_LYG(off);
        }
    }

    reConectHeadLayout(node.parent);

    //重新刷新中间的四个位置，东南西北
    if(COMMON_UI3D.is3DUI())
        setArrowFengDir(node.parent.getChildByName("arrowbk3D"));
    else
        setArrowFengDir(node.parent.getChildByName("arrowbk"));

}
//回放的时候换了位置重新刷新手牌
function refreshHandCardForReplay_LYG(UIOff)
{
    if(UIOff == 0)
    {
        return;
    }

    var pl = getUIPlayer(UIOff);
    if(!pl || cc.isUndefined(pl.mjhand))
    {
        return;
    }

    var _UINode = getNode(UIOff);
    var children = _UINode.getChildren();

    for(var i = 0; i < children.length; i++)
    {
        if(children[i].name == "mjhand_replay")
        {
            children[i].removeFromParent();
        }
    }

    cc.log("--------------刷手牌 ---- mjhand =" + JSON.stringify(pl.mjhand));

    for (var i = 0; i < pl.mjhand.length  && i < 13 ; i++) {
        getNewCard(_UINode, "up", "mjhand_replay", pl.mjhand[i], UIOff);
    }
    MjClient.playui.CardLayoutRestore(_UINode, UIOff);
}

// //求出所有听牌的合集，oSet已经听的牌
// function calTingSet(oCds, oSet) {
//     //先求出所有可能听的牌 set(手牌，顺一位的牌)
//     var allSet = {};
//     var tingSet = oSet || {};
//     var cds = oCds.slice();
//     if ((oCds.length + 1) % 3 == 0) { // 14、11、8、5、2张牌
//         cds = oCds.slice(0, -1);
//     }
//     for (var i = 0; i < cds.length; i++) {
//         var card = cds[i];
//         if (MjClient.majiang.isCardFlower(card)) {
//             return tingSet;
//         }
//         allSet[card] = 1;
//         if (card < 29) {
//             if ((card + 1) % 10 > 0)  {
//                 allSet[card + 1] = 1;
//             }
//             if ((card - 1) % 10 > 0)  {
//                 allSet[card - 1] = 1;
//             }
//         }
//     }
//     cc.log("canTing     cds = "+JSON.stringify(cds));
//     //求出能听多少牌
//     for(var tingCard in allSet) {
//         if (MjClient.majiang.canHu(cds, Number(tingCard))) {
//             cc.log("可听"+tingCard);
//             tingSet[tingCard] = 1;
//         }
//     }
//     return tingSet;
// }

var allCardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 41, 51, 61, 71, 81, 91];
//求出所有听牌的合集，oSet已经听的牌
function calTingSet(oCds, hun)
{
    if(cc.isUndefined(oCds))
    {
        return {};
    }

    var tingSet = {};
    var cds = oCds.slice();
    if ((oCds.length + 1) % 3 == 0) { // 14、11、8、5、2张牌
        cds = oCds.slice(0, -1);
    }

    for (var i = 0; i < allCardsArray.length; i++) {
        if (MjClient.majiang.canHu(cds, allCardsArray[i], hun)) {
            if(MjClient.majiang.isCardFlower && MjClient.majiang.isCardFlower(allCardsArray[i])) continue; //听牌花牌要排除，东南西北，中发白有可能是花
            var count = 0;
            for (var j = 0; j < cds.length; j++) {
                if (cds[j] == allCardsArray[i]) {
                    count++;
                }
            }
            if (hun || count < 4) {
                tingSet[allCardsArray[i]] = 1;
            }
        }
    }
    return tingSet;
}

//求出，听牌时，选择一张牌能胡的牌的张数 by sking
function getCheckTingHuCards(selectCard,mjhandCard) {
    var copyhand = mjhandCard.slice();
    if (selectCard && selectCard > 0) {
        var index = copyhand.indexOf(selectCard);//排除当前选择的一张牌
        copyhand.splice(index,1);
    }
    var tingSet = null;
    if (MjClient.gameType === MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI) {
        var pl = getUIPlayer(0);
        if(pl.mjpeng && pl.mjgang1 && pl.mjgang0) {
            tingSet = MjClient.majiang.calTingSet_curr(copyhand, null, copyhand.concat(pl.mjpeng).concat(pl.mjgang1).concat(pl.mjgang0), pl);
        }
        else {
            tingSet = calTingSet(copyhand, MjClient.data.sData.tData.hunCard);
        }
    }
    else if(MjClient.gameType === MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI){
        tingSet = MjClient.majiang.calTingSet(copyhand);
    }
    else {
        tingSet = calTingSet(copyhand, MjClient.data.sData.tData.hunCard);
    }

    for (var card in tingSet) {
        var count = 0;
        for (var i = 0; i < mjhandCard.length; i++) {
            if (mjhandCard[i] === Number(card)) {
                count ++;
            }
        }
        if (count === 4) {
            delete tingSet[card];
        }
    }

    return tingSet;
}

MjClient.allCanTingCards = {};
//求出，能听的所有牌及其能听的剩余张数
function calculateTotalCardsOfTingHu(cantingCards, mjHandCards) {
    var tingMostCard = {};
    var cantingCardsAry = [];
    var isShow = false;
    MjClient.allCanTingCards = {};
    if (typeof(cantingCards) == "object") {
        for (var card in cantingCards) {
            cantingCardsAry.push(Number(card));
        }
    } else {
        cc.log("\nerror: calculateTotalCardsOfTingHu : The first parameter type is incorrect!!!!!\n");
        return tingMostCard;
    }

    var curMostTingNum = -1;
    cantingCardsAry.sort(function(a, b){
        a - b;
    });

    for (var index = 0; index < cantingCardsAry.length; index++) {
        var tingTotalNum = 0;
        if (index > 0 && cantingCardsAry[index] == cantingCardsAry[index -1]) {
            continue;
        }

        //var tingCards = getCheckTingHuCards(cantingCardsAry[index], mjHandCards);
        var tingCards = {};
        if (MjClient.majiang.getCheckTingHuCards) {
            tingCards = MjClient.majiang.getCheckTingHuCards(cantingCardsAry[index],mjHandCards);
        } 
        else if (COMMON_UI.isNewGame()) 
        {
            
            var pl = getUIPlayer(0);
            if (pl.tingLists && pl.tingLists[cantingCardsAry[index]]) 
            {
                var curtingset = pl.tingLists[cantingCardsAry[index]];
                for (var i = 0; i < curtingset.length; i++) {
                    tingCards[curtingset[i]] = 1;
                }
            }
            cc.log("tingCards  ",JSON.stringify(tingCards));
        }
        else {
            tingCards = getCheckTingHuCards(cantingCardsAry[index],mjHandCards);
        }


        if (tingCards.length == 0) {
            continue;
        }

        MjClient.allCanTingCards[cantingCardsAry[index]] = tingCards;
        for (var card in tingCards) {
            var tingCardsNum = getHuCardNum(Number(card));
            tingTotalNum += tingCardsNum;
            MjClient.allCanTingCards[cantingCardsAry[index]][card] = tingCardsNum;
        }

        if(index > 0 && tingTotalNum != curMostTingNum) {
            isShow = true;
        }

        if (index == 0 || index > 0 && tingTotalNum == curMostTingNum) {
            tingMostCard[cantingCardsAry[index]] = tingTotalNum;
            curMostTingNum = tingTotalNum;
        } else if (index > 0 && tingTotalNum > curMostTingNum) {
            tingMostCard = {};
            tingMostCard[cantingCardsAry[index]] = tingTotalNum;
            curMostTingNum = tingTotalNum;
        }
    }

    //所有牌都为同一个值时不显示，如都只剩下1张或2张时
    if (!isShow) {
        tingMostCard = {};
    }

    return tingMostCard;
}

/***
 * 如果手牌已有4张，去除听牌数组中的改张（避免听0张的出现）
 */
function deleteTingSet(mjhand, tingSet)
{
    for(var cd in tingSet)
    {
        var count = 0;
        for(var i = 0; i < mjhand.length; i ++)
        {
            if(Number(cd) === mjhand[i]) count ++;
            if(count === 4) delete tingSet[cd];
        }
    }
    return tingSet || {};
}

//求出，此张牌，外面还剩余可胡的张数 by sking
function getHuCardNum(card)
{
    var icount = 4;//每一种牌总共4张
    var tData = MjClient.data.sData.tData;
    if(MjClient.GAME_TYPE.XU_ZHOU == MjClient.gameType)
    {
        var HuncardMsg = MjClient.data.sData.tData.hunCard;
        var showcard = getShowHunCard(HuncardMsg);
        if(card == showcard)//系统删了一张牌
        {
            icount = 3;
        }
    }
    else if (MjClient.GAME_TYPE.CHEN_ZHOU == MjClient.gameType)
    {
        if (card == 71)
        {
            icount = tData.areaSelectMode["hongzhong"];
        }
    }
    else if (MjClient.GAME_TYPE.TONG_HUA == MjClient.gameType)
    {
        var hunCard = MjClient.data.sData.tData.hunCard;
        var showcard = MjClient.majiang.getShanGunCard(hunCard);
        if (card == showcard)//系统删了一张牌
        {
            icount = 3;
        }
    }
    else if (MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU == MjClient.gameType ||
             MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU == MjClient.gameType)
    {
        var chaoTianCard = MjClient.data.sData.tData.chaoTianCard;
        if (card == chaoTianCard)//系统删了一张牌
        {
            icount = 3;
        }
    }
    else if (MjClient.GAME_TYPE.ML_HONGZHONG == MjClient.gameType ||
        MjClient.gameType === MjClient.GAME_TYPE.ML_HONGZHONG_ZERO )
    {
        var hunCard = MjClient.data.sData.tData.hunCard;
        if (card == hunCard && tData.areaSelectMode["hongzhong8"])
        {
            icount = 8;
        }
    }


    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    for(var off = 0;off < 4 ;off++)
    {
        var selfIndex = getPlayerIndex(off);
        if(selfIndex == null) continue;
        var pl = sData.players[tData.uids[selfIndex] + ""];

        if(!pl) continue;
        /*
         排除一下的牌，算出剩余张数
         */
        //碰
        if(pl.mjpeng.length > 0)
        {
            for (var i = 0; i < pl.mjpeng.length ; i++)
            {
                if(pl.mjpeng[i] == card)
                {
                    icount -= 3;
                    break;
                }
            }
        }

        //明杠
        if(pl.mjgang0)
        {
            for (var i = 0; i < pl.mjgang0.length ; i++)
            {
                if(pl.mjgang0[i] == card)
                {
                    icount -= 4;
                    break;
                }
            }
        }
        //暗杠
        if(pl.mjgang1)
        {
            for (var i = 0; i < pl.mjgang1.length ; i++)
            {

                if(pl.mjgang1[i] == card)
                {
                    if(MjClient.gameType==MjClient.GAME_TYPE.FEN_XI_YING_KOU &&
                        MjClient.data.sData.tData.areaSelectMode.angangbukejian)
                    {
                        icount=4;
                    }
                    else {
                        icount -= 4;
                    }
                    break;
                }
            }
        }

        // 通化麻将特殊杠
        if (MjClient.GAME_TYPE.TONG_HUA == MjClient.gameType)
        {
            for (var i = 0; i < pl.mjTeshuGang0.length; i ++)
            {
                for (var j = 0; j < pl.mjTeshuGang0[i][j]; j ++)
                {
                    if (pl.mjTeshuGang0[i][j] == card)
                        icount --;
                }
            }
            for (var i = 0; i < pl.mjTeshuGang1.length; i ++)
            {
                for (var j = 0; j < pl.mjTeshuGang1[i][j]; j ++)
                {
                    if (pl.mjTeshuGang1[i][j] == card)
                        icount --;
                }
            }
        }
        //吃
        if(pl.mjchi)
        {
            for (var i = 0; i < pl.mjchi.length ; i++)
            {
                if(pl.mjchi[i] == card)
                {
                    icount -= 1;
                }
            }
        }

        //打出去的牌
        if(pl.mjput)
        {
            for (var i = 0; i < pl.mjput.length ; i++)
            {
                if(pl.mjput[i] == card)
                {
                    icount -= 1;
                }
            }
        }

        if (MjClient.GAME_TYPE.JIN_ZHONG_MJ == MjClient.gameType
            || MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN == MjClient.gameType
            || MjClient.GAME_TYPE.JIN_ZHONG_LI_SI == MjClient.gameType
            || MjClient.GAME_TYPE.JIN_ZHONG_KD == MjClient.gameType
            || MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI == MjClient.gameType
            || MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN == MjClient.gameType
            || MjClient.GAME_TYPE.HE_JIN_KUN_JIN == MjClient.gameType
            || MjClient.GAME_TYPE.WU_TAI_KOU_DIAN == MjClient.gameType
            || MjClient.GAME_TYPE.LV_LIANG_MA_JIANG == MjClient.gameType
            || MjClient.GAME_TYPE.ZHUO_HAO_ZI == MjClient.gameType
            || MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU == MjClient.gameType
            || MjClient.GAME_TYPE.LING_SHI_BIAN_LONG == MjClient.gameType
            || MjClient.GAME_TYPE.LING_SHI_BAN_MO == MjClient.gameType
            || MjClient.GAME_TYPE.PING_YAO_KOU_DIAN == MjClient.gameType
            || MjClient.GAME_TYPE.PING_YAO_MA_JIANG == MjClient.gameType
            || MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO == MjClient.gameType
            || MjClient.GAME_TYPE.SHOU_YANG_QUE_KA == MjClient.gameType
            || MjClient.GAME_TYPE.PING_YAO_MA_JIANG == MjClient.gameType
            || MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3 == MjClient.gameType
            || MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN == MjClient.gameType
            || MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN == MjClient.gameType
            || MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN == MjClient.gameType
            || MjClient.GAME_TYPE.FEN_XI_YING_KOU == MjClient.gameType
            || MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI == MjClient.gameType
            || MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI == MjClient.gameType
            || MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG == MjClient.gameType
            || MjClient.GAME_TYPE.FEN_YANG_QUE_MEN == MjClient.gameType
            || MjClient.GAME_TYPE.JING_LE_KOU_DIAN == MjClient.gameType
            || MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI == MjClient.gameType)
        {
            //别家听牌时打出去的牌会盖住，要把减掉的一张加回来
            if(off != 0
                && pl.putCardAfterTing >= 0
                && pl.mjput[pl.putCardAfterTing] == card
            )
            {
                icount += 1;
            }
        }


        if(MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI === MjClient.gameType){
            if(!tData.areaSelectMode["tingPaiBuKou"]){
                //别家听牌时打出去的牌会盖住，要把减掉的一张加回来
                if(off !== 0 && pl.putCardAfterTing >= 0 && pl.mjput[pl.putCardAfterTing] === card) {
                    icount += 1;
                }
            }
        }


        if (MjClient.GAME_TYPE.HONG_TONG_WANG_PAI == MjClient.gameType)
        {
            if( off != 0
                && pl.putCardAfterTing >= 0
                && pl.putCardAfterTing == card
            )
            {
                icount += 1;
            }
        }

        //自己得手牌
        if(off == 0)
        {
            if (pl.mjhand.length > 0) {
                //碰
                for (var i = 0; i < pl.mjhand.length; i++) {
                    if (pl.mjhand[i] == card) {
                        icount -= 1;
                    }
                }

            }
        }
    }

    if(icount < 0) icount = 0;

    return icount;
}

function InitUserCoinAndName_jinzhong(node, off)
{
    if(MjClient.playui.InitUserCoinAndName) return MjClient.playui.InitUserCoinAndName(node, off);

    var pl = getUIPlayer(off);
    if(!pl)
    {
        return;
    }

    var tData = MjClient.data.sData.tData;
    var bind =
        {
            head:
                {
                    name:
                        {
                            _run: function() {
                                this.setFontName("Arial");
                                this.setFontSize(this.getFontSize());
                            },
                            _text: function()
                            {
                                var _nameStr = unescape(pl.info.nickname );
                                return getPlayerName(_nameStr);
                            }
                        },
                    coin:
                        {

                            _text:function ()
                            {
                                var coin=tData.initCoin;
                                var countCopy = Number(coin+ pl.winall);
                                // 精度修正
                                countCopy = revise(countCopy);
                                var tmpcount;
                                if (countCopy<0)
                                {
                                    countCopy = -countCopy;
                                    tmpcount = "-"+countCopy;
                                }
                                else {
                                    tmpcount = countCopy;
                                }

                                cc.log("=================================tmpcount = " + tmpcount);
                                //node.setString(count);
                                return tmpcount;
                            }
                        },
                    name_bg:
                        {
                            _run: function ()
                            {
                                this.setScaleY(1.1);
                            }
                        }
                }
        }

    //add by sking
    var name = node.getChildByName("head").getChildByName("name");
    name.ignoreContentAdaptWithSize(true);
    var coin=node.getChildByName("head").getChildByName("coin");

    //coin.ignoreContentAdaptWithSize(false);
    coin.setContentSize(100,21);
    BindUiAndLogic(node, bind);
}


//对对胡(飘胡)
function isDuiDuiHu(mjchi, mjhand)
{
    //有吃牌
    if(mjchi.length > 0)
    {
        return 0;
    }
    var laiziNums = 0;
    var cds = mjhand.slice();
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var count4 = 0;
    //计算各牌的数量
    var PAI = {};
    var tempCD = 0;
    for(var i = 0; i < cds.length; i++)
    {
        tempCD = cds[i];
        if(tempCD == 200)
        {
            laiziNums++;
            continue;
        }
        if(PAI[tempCD])
        {
            PAI[tempCD]++;
        }
        else
        {
            PAI[tempCD] = 1;
        }
    }
    var tempCount = 0;
    for(var i in PAI)
    {
        tempCount = PAI[i];
        if(tempCount == 1) count1++;
        else if(tempCount == 2) count2++;
        else if(tempCount == 3) count3++;
        else if(tempCount == 4) count4++;
    }
    var needNums = count1 * 2 + count2 + count4 * 2 - 1;
    if(needNums <= laiziNums)
    {
        return 1;
    }
    return 0;
}

// 是否7对
function is7Dui(cards, cd)
{
    var cds = cards.slice();
    if (cd) {
        cds.push(cd);
    }
    if (cds.length != 14) {
        return false;
    }
    cds.sort(function(a, b) {
        return a - b;
    });
    var hunNum = 0;
    var duiNum = 0;
    for (var i = 0; i < cds.length; i++) {
        if(cds[i] == 200) {
            hunNum++;
        }
        else if (i + 1 < cds.length && cds[i] == cds[i + 1]) {
            i++;
            duiNum++;
        }
    }
    return duiNum + hunNum >= 7;
}
function isPu(cards, laizi){
    //cc.log("    cards    ",cards,"  laizi  ",laizi);
    if (cards.length == 0) {
        return true;
    }
    // 若第一张是顺子中的一张
    for (var first = cards[0] - 2; first <= cards[0]; first++) {
        if(first % 10 > 7 || (laizi == 0 && first < cards[0])) {
            continue;
        }
        var shunCount = 0;
        for (var i = 0; i < 3; i++) {
            if (cards.indexOf(first + i) >= 0) {
                shunCount++;
            }
        }
        if (shunCount == 3 || shunCount + laizi >= 3) {
            var puCards = cards.slice();
            var puLaizi = laizi;
            for (var i = 0; i < 3; i++) {
                var deletePos = puCards.indexOf(first + i);
                if (deletePos >= 0) {
                    puCards.splice(deletePos, 1);
                }
                else {
                    puLaizi--;
                }
            }
            if (isPu(puCards, puLaizi)) {
                return true;
            }
        }
    }
    // 若第一张是刻子中的一张
    var keziCount = 1;
    var keziCard = cards[0];
    if (cards[1] == keziCard) {
        keziCount++;
    }
    if (cards[2] == keziCard) {
        keziCount++;
    }
    if (keziCount == 3 || keziCount + laizi >= 3) {
        var puCards = cards.slice();
        var puLaizi = laizi;
        for (var i = 0; i < 3; i++) {
            var deletePos = puCards.indexOf(keziCard);
            if (deletePos >= 0) {
                puCards.splice(deletePos, 1);
            }
            else {
                puLaizi--;
            }
        }
        if (isPu(puCards, puLaizi)) {
            return true;
        }
    }
    if(MjClient.gameType==MjClient.GAME_TYPE.FEN_XI_YING_KOU ||
        MjClient.gameType==MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI) //包含三元三风
    {
        // 若第一张是风牌的一张（东南西北中发白），则判断是否存在"三风"或者"三元"
        var sanTypeCount = 0;
        var sanTypeCard = cards[0];
        var sanTypeCardInt = Math.floor(sanTypeCard / 10);
        if (sanTypeCardInt > 2 && sanTypeCardInt < 7) {// 三风
            var fengArr = [];    // 风牌种类数组（东南西北）
            for (var i = 0; i < 4; i++) {
                if ((sanTypeCard+i*10) <= 61 && cards.indexOf(sanTypeCard+i*10) >= 0) {
                    if ((sanTypeCard+i*10) != sanTypeCard) fengArr.push((sanTypeCard+i*10));
                }
            }
            if ((fengArr != [] && fengArr.length > 1) || fengArr.length + laizi > 1) {
                var puLaizi = laizi;
                if (fengArr.length <= 1) {
                    fengArr.push(0);
                }
                for (var i = 0; i < fengArr.length - 1; i++) {
                    for (var j = i + 1; j < fengArr.length; j++) {
                        var _puCards = cards.slice();
                        var _puLaizi = puLaizi;
                        var deletePos1 = _puCards.indexOf(sanTypeCard);
                        if (deletePos1 >= 0) _puCards.splice(deletePos1, 1);
                        else _puLaizi--;
                        var deletePos2 = _puCards.indexOf(fengArr[i]);
                        if (deletePos2 >= 0) _puCards.splice(deletePos2, 1);
                        else _puLaizi--;
                        var deletePos3 = _puCards.indexOf(fengArr[j]);
                        if (deletePos3 >= 0) _puCards.splice(deletePos3, 1);
                        else _puLaizi--;
                        if (isPu(_puCards, _puLaizi)) return true;
                    }
                }
            }
        }
        else if (sanTypeCardInt > 6 && sanTypeCardInt < 10) {// 三元
            for (var i = 0; i < 3; i++) {
                if (cards.indexOf(sanTypeCard+i*10) >= 0) sanTypeCount++;
            }
            if (sanTypeCount == 3 || sanTypeCount + laizi >= 3) {
                var puCards = cards.slice();
                var puLaizi = laizi;
                for (var i = 0; i < 3; i++) {
                    var deletePos = puCards.indexOf(sanTypeCard + i * 10);
                    if (deletePos >= 0) puCards.splice(deletePos, 1);
                    else puLaizi--;
                }
                if (isPu(puCards, puLaizi)) return true;
            }
        }

    }

    return false;
}

function canHuLaizi(oCards, cd) {
    var cards = [];
    var laizi = 0;

    for (var i = 0; i < oCards.length; i++) {
        if (oCards[i] == 200) {
            laizi++;
        }
        else {
            cards.push(oCards[i]);
        }
    }
    if (cd == 200) {
        laizi++;
    }
    else if (cd) {
        cards.push(cd);
    }
    if ((cards.length + laizi + 1) % 3 != 0) {
        return false;
    }
    cards.sort(function(a, b) {
        return a - b;
    })

    // 依次删除一对牌做将，其余牌全部成扑则可胡
    for (var i = 0; i < cards.length; i++) {
        if (i > 0 && cards[i] == cards[i - 1]){
            continue; // 和上一次是同样的牌，略过不计算
        }
        if ((i + 1 < cards.length && cards[i] == cards[i + 1]) || laizi > 0) {
            var puCards = cards.slice();
            var puLaizi = laizi;
            puCards.splice(i, 1);
            if (puCards[i] == cards[i]) {
                puCards.splice(i, 1);
            }
            else {
                puLaizi--;
            }
            if (isPu(puCards, puLaizi)) {
                return true;
            }
        }
    }
    if (laizi >= 2 && isPu(cards, laizi - 2)) {
        return true;
    }
    return false;
}

//求缺一门
function calLack(cards, hun) {
    var cardSet = [0, 0, 0];
    var lack = 0;
    for (var i = 0; i < cards.length; i++) {
        if (cards[i] == hun) {
            continue;
        }
        var color = Math.floor(cards[i] / 10);
        if (cards[i] > 0 && color < 3) {
            cardSet[color] = 1;
        }
    }
    for (var i = 0; i < 3; i++) {
        if (cardSet[i] == 0) {
            lack++;
        }
    }
    return lack;
};

/*
 根据参数获取对应的玩法,文字
 返回：eg, “新浦麻将，可听牌，三口翻倍，AA付”
 */
function getPlaySelectPara(gameType,areaSelectMode)
{
    var _sumStr = "";
    if (cc.isUndefined(areaSelectMode)) {
        areaSelectMode = {};
    }

    for (var data in areaSelectMode) {
        if(MjClient.data.sData && MjClient.data.sData.tData.matchId && MjClient.data.sData.tData.matchInfo && (data == "payWay"||data == "maxPlayer")){
            continue;
        }
        var _dataValue = areaSelectMode[data];
        var descConf = getGameCnDesc(gameType, data, _dataValue, areaSelectMode)
        // cc.log("selectparainfo   -------",descConf);
        if (descConf) {
            _sumStr += descConf + ",";
        }
    }
    return _sumStr;
}


function getGameCnDesc(gameType, name, key, areaSelectMode) {
    var descs = GameCnDesc[gameType] && GameCnDesc[gameType][name] || GameCnDescDefault[name];
    if (descs) {
        if (typeof(descs) === "function")
            return descs(key, areaSelectMode);
        if (key in descs)
            return descs[key];
    }
    return "";
}

function getGameBgFile(type) {
    var path = "playing/gameTable/";
    if ((MjClient.playui || MjClient.goldMatchingui) && typeof(GameClass[MjClient.gameType]) != "undefined") {
        if (MjClient.gameType ==MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU)
            path = "playing/XYTDH/";
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
            path = "playing/paodekuaiTable/";
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU)
            path = "playing/doudizhu/";
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA )
            path = "playing/sanDaHa/";
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DA_QI || GameClass[MjClient.gameType] == MjClient.GAME_CLASS.GAN_DENG_YAN)
            path = "playing/daqi/";
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI){
            path = "hongZi/gameTable/";
            if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
                || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI){
                path = "playing/paohuziTable/";
            }else if(MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI){
                path = "playing/paohuziTable/bg_changDe/";
            } else if (MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI||
                MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI){
                path = "playing/anhuapaohuzi/bg/";
            }else if (MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
                MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU || MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI
                || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710 || MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ ||
                MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG||
                MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA){
                path = "playing/anhuapaohuzi/bg/";
            }else if (MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI){
                path = "playing/anhuapaohuzi/bg/";
            }else if (MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI){
                path = "playing/anhuapaohuzi/bg/";
            }else if (MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI){
                path = "playing/paohuziTable/bg_changDe/";
            }
        }
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.NIU_SHI_BIE )
            path = "playing/niushibie/";
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DA_MA_ZI)
            path = "playing/niushibie/";
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.QIAN_FEN)
            path = "playing/niushibie/";
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DA_ZHA_DAN)
            path = "playing/niushibie/";
    }

    var file = "";
    var format = [".jpg", ".png"];
    for (var i = 0; i < 2; i++) {
        file = path + "beijing_" + (type + 1) + format[i];

        if (jsb.fileUtils.isFileExist(file)) {
            return file;
        }
    }

    return "";
}

function getGameBgFile_3D(type) {
    var path = "playing/gameTable/";
    var file = "";
    var format = [".jpg", ".png"];
    for (var i = 0; i < 2; i++) {
        file = path + "beijing3D_" + (type + 1) + format[i];
        if (jsb.fileUtils.isFileExist(file)) {
            return file;
        }
    }
    return "";
}

/**
 *
 * @param {ImageView} backImageView
 */
function changeGameBg(backImageView)
{

    var type = getCurrentGameBgType();

    if(COMMON_UI3D.is3DUI())
    {
        var defaultFile = "playing/gameTable/beijing3D_1.jpg";
        var file = getGameBgFile_3D(type);
        file = jsb.fileUtils.isFileExist(file) ? file : defaultFile;
        backImageView.loadTexture(file);
        return;
    }

    if(MjClient.gameType == MjClient.GAME_TYPE.ML_HONG_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_SHOU
        || MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI
        || MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI
        || MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU
        || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG
        || MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA
        || MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710
        || MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ
        || MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI){
        type = ziPai.getGameBgType();
    }
    var file = getGameBgFile(type);
    if (type == 1 &&
        (  MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI
        || MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI
        || MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.FEN_XI_YING_KOU
        || MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN
        || MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN
        || MjClient.gameType == MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG)
    )
    {
        cc.log("更换背景------大气");
        file = getGameBgFile(4);
    }

    if (type == 3 && (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) &&
        GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG) {
        if (MjClient.gameType != MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU) {
            file = getGameBgFile(5);
            cc.log("替换背景----碧绿   tttt ",file);
        }
    }
    if(type==0 && (MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN))
    {
        file = "playing/daqi/beijing_5.jpg"
    }
    if(type==0 &&MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER)
    {
        file = "playing/sanDaEr/beijing_1.jpg"
    }
    if(type==0 &&MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI)
    {
        file = "playing/zhaGuZi/bg.png"
    }
    if (isIPhoneX() && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI &&
        (type <= 1 || (type == 2 && (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_TY ||
            MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN) )))
    {
        file = getGameBgFile(type+4);
    }
    if (isIPhoneX() && type <= 2 && (MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_TY  || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY ||  MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_QC)
    && (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ))
    {
        file = getGameBgFile(type+4);
    }

    if (isIPhoneX() && (type <= 1 || (type == 2 && (MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN) ) ))
    {
        file = getGameBgFile(type+4);
    }

    if (file != "")
        backImageView.loadTexture(file);

    return;
}

function getNewMJBgFile(oldFile, type)
{
    if(COMMON_UI3D.is3DUI()) return getNewMJBgFile3D(oldFile, type);

    if (oldFile.indexOf("playing/MJ/") === -1)
        return oldFile;

    if (type === undefined)
        type = getCurrentMJBgType();

    var replaceFunc = function(oldFile, bgDir, mjDir) {
        var newFile = "";
        newFile = oldFile.replace(/\/MJ\/.*Mj_/, "/MJ" + bgDir + "/Mj_");
        newFile = newFile.replace(/\/MJ\/.*(Bamboo_|Character_|Dot_|flower_|Green.png|Red.png|White.png|Wind_)/, "/MJ" + mjDir + "/$1")
        return newFile;
    }

    var newFile = "";
    if (type == 0) {

        if(isJinZhongAPPType())
        {
            newFile = replaceFunc(oldFile, "", "/MJCard1");
        }
        else
        {
            newFile = replaceFunc(oldFile, "", "");
        }
    }
    else if (type == 1) {
        newFile = replaceFunc(oldFile, "/MJBg1", "/MJCard1");
    }
    else if (type == 2) {
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ  )
            newFile = replaceFunc(oldFile, "/MJBg2", "/MJCard2");
        else if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ){
            if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU){
                newFile = replaceFunc(oldFile, "/MJBg2", "/MJCard2");
            }else {
                newFile = replaceFunc(oldFile, "/MJBg4", "/MJCard4");
            }
        }
        else
            newFile = replaceFunc(oldFile, "/MJBg2", "/MJCard1");
    }
    else if (type == 3) {
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ  ||
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
            newFile = replaceFunc(oldFile, "/MJBg3", "/MJCard3");
        else
            newFile = replaceFunc(oldFile, "/MJBg3", "/MJCard1");
    }

    //if (newFile != "" && newFile != oldFile)
    //    cc.log("newFile=" + newFile);

    if (newFile != "" && newFile != oldFile && !jsb.fileUtils.isFileExist(newFile)) {
        cc.log("getNewMJBgFile file not exsit : " + newFile);
        newFile = "";
    }

    return newFile != "" ? newFile : oldFile;
}

/* 3D 的牌面 by sking */
function getNewMJBgFile3D(oldFile, type)
{
    if (oldFile.indexOf("playing/MJ/") === -1)
        return oldFile;

    if (type === undefined)
        type = getCurrentMJBgType();

    var replaceFunc = function(oldFile, bgDir, mjDir) {
        var newFile = "";
        newFile = oldFile.replace(/\/MJ\/.*Mj_/, "/MJ" + bgDir + "/Mj_");
        newFile = newFile.replace(/\/MJ\/.*(Bamboo_|Character_|Dot_|flower_|Green.png|Red.png|White.png|Wind_)/, "/MJ" + mjDir + "/$1")
        return newFile;
    }

    var newFile = "";
    if (type === 0)
    {
        newFile = replaceFunc(oldFile, "/MJBg3D1", "/MJCard3D1");
    }
    else if(type === 1)
    {
        newFile = replaceFunc(oldFile, "/MJBg3D2", "/MJCard3D2");
    }


    if (newFile !== "" && newFile !== oldFile && !jsb.fileUtils.isFileExist(newFile)) {
        cc.log("getNew3DMJBgFile file not exsit : " + newFile);
        newFile = "";
    }

    return newFile !== "" ? newFile : oldFile;
}


/*

 为了调牌的大小，node 为麻将 节点 by sking 2018.4.19
 */
function setMJDif(node,MJpic)
{
    var _currentMJType = getCurrentMJBgType();
    var imgNode = node.getChildByName("imgNode");

    if (MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ) {
        if (!node.standScale) node.standScale = node.getScale();
        if (COMMON_UI3D.is3DUI()) {
            node.setScale(node.standScale);
        } else {
            if(node.off === 4) {     // 自己的手牌
                node.setScale(node.standScale);
            }

            if (imgNode) {
                var sca = [1.02, 0.98, 1.05, 1.06];
                if (!imgNode.standScale) imgNode.standScale = 1;
                if (!imgNode.standY) imgNode.standY = imgNode.y;

                imgNode.y = imgNode.standY;
                if(node.off === 0 || node.off === 2){
                    if(_currentMJType === 0) imgNode.y = imgNode.standY - 3;
                    if(_currentMJType === 1) imgNode.y = imgNode.standY + 5;
                    if(_currentMJType === 2) imgNode.y = imgNode.standY - 10;
                    if(_currentMJType === 3) imgNode.setScale(imgNode.standScale * 1.06);
                }

                if(node.off === 1 || node.off === 3){    // 1、3 位置亮出牌贴图调整
                    imgNode.setScale(imgNode.standScale * sca[_currentMJType]);
                }
            }
        }
    }
    // 岳阳, 根据麻将背景，调整贴图大小, 位置
    else if (MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
        // 0:绿色背景的'经典'牌
        // 1:黄色背景的'土豪'牌
        // 2:橙色背景的'自然'牌
        // 3:类似于3D的'精致'牌
        // 麻将尺寸调整
        if (node && !node.standScale) node.standScale = node.getScale();
        if (imgNode && !imgNode.standScale) imgNode.standScale = imgNode.getScale();
        if (!COMMON_UI3D.is3DUI()) {
            if (node.name === "mjhand") {
                var scArr = [1.02, 1.02, 1.04, 0.97];
                node.setScale(node.standScale * scArr[_currentMJType]);
            }
            //麻将贴图调整
            if (imgNode) {
                if (!imgNode.standY) imgNode.standY = imgNode.y;
                if (_currentMJType === 2)
                    imgNode.setScale(imgNode.standScale * 0.80);
                else
                    imgNode.setScale(imgNode.standScale);
                if (_currentMJType === 3 && (node.off === 0 || node.off === 2))
                    imgNode.y = imgNode.standY - 10;
                else
                    imgNode.y = imgNode.standY;


                if(node.name === "mjhand") {
                    // 数组下标0:绿色背景的'经典'牌   1:黄色背景的'土豪'牌  2:橙色背景的'自然'牌  3:类似于3D的'精致'牌
                    var pos = [{x: 0.5, y: 0.43}, {x: 0.5, y: 0.45}, {x: 0.5, y: 0.46}, {x: 0.5, y: 0.41}];
                    imgNode.setPositionPercent(pos[_currentMJType]);
                    //癞子麻将位置调整
                    var baidaNameArray = ["haozi","lizi","imgBaiDa","wangzi"];
                    var baidaPos = [{x: 0.59, y: 0.48}, {x: 0.59, y: 0.48}, {x: 0.60, y: 0.51}, {x: 0.61, y: 0.53}];
                    var len = baidaNameArray.length;
                    for(var i = 0; i < len; i++) {
                        if(node.getChildByName(baidaNameArray[i])) {
                            node.getChildByName(baidaNameArray[i]).setPositionPercent(baidaPos[_currentMJType]);
                        }
                    }
                }
            }
        }
        // 2、3D听牌数统一显示调整--
        if(node && imgNode && node.off === 6){
            if(node.name === "showNode") {
                imgNode.setScale(0.46);
                imgNode.setPositionPercent({x: 0.5, y: 0.48});
                if(_currentMJType === 2) imgNode.setScale(0.35);
            }else if(node.name === "cardNode"){
                imgNode.setScale(0.40);
            }
        }


        if(MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU === MjClient.gameType){
            if(node && imgNode && _currentMJType === 2){
                if(node.name === "mjhand"){
                    imgNode.setPositionPercent({x: 0.5, y: 0.41});
                }
            }
        }
    }
    // 山西, 根据麻将背景，调整贴图大小, 位置
    else if (isJinZhongAPPType()) {
        if(imgNode)
        {
            imgNode.standScale = 1;
            if(COMMON_UI3D.is3DUI()) // 3D 麻将贴图调整
            {
                imgNode.setScale(imgNode.standScale * 1.26);
            }
            else // 2D 麻将资源调整
            {
                if(node.name === "showNode" || node.name === "baidaImg" || node.name === "hunCard2")   // 已听小牌和百搭牌，纹理还原
                {
                    imgNode.setScale(1);
                }

                if(node.name === "mjhand")
                {
                    imgNode.setScale(imgNode.standScale * 0.98);
                }
                else if(node.name === "out" || node.name === "newout" )
                {
                    imgNode.setScale(imgNode.standScale * 0.9);
                }
                else if(node.name === "showNode")
                {
                    imgNode.setScale(imgNode.standScale * 1.2);
                }
            }

            if(node.name === "mjhand" || node.name === "baidaImg")
            {
                var pos = {x: 0.5, y: 0.44};
                imgNode.setPositionPercent(pos);
            }
            else if(node.name === "out" || node.name === "newout")
            {
                var py = 0.61;
                if(MJpic == 1 || MJpic == 3) //麻将贴图类型
                {
                    py = 0.68;
                }
                if(MJpic || MJpic == 0)
                {
                    var pos = {x: 0.48, y: py};
                    imgNode.setPositionPercent(pos);
                }
            }

            // 麻将在空中的状态特殊处理, mjhand在空中isOuting是true, 所以分开写   —— by Tom
            if(node.isOuting)
            {
                var pos = {x: 0.5, y: 0.63};
                imgNode.setPositionPercent(pos);
            }
        }
    }



}

/***
 * 麻将贴图调整配置表     - By Tom
 * @param app    例如：江苏 app = "jiangsu"
 * @param cardNode   当前麻将Node
 */
function majiangImageNodeConfig(app, cardNode) {
    if(!cardNode) return;
    var curMJbg = getCurrentMJBgType();
    var imgNode = cardNode.getChildByName("imgNode");
    // mJoff: todo 当前麻将位置类型   0：自己面朝上的牌  1：右边玩家面朝上的牌  2：对面玩家面朝上的牌  3：左边玩家面朝上的牌  4：自己手牌
    // config_jiangsu: todo 横向参数： mJoff    纵向参数：curMJbg
    var mJoff = cardNode.off;
    var config_jiangsu = [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
    ];

    var config = [];
    if(app === "jiangsu") config = config_jiangsu;
    var MJbgByMJoff = config[curMJbg];
    if(imgNode) imgNode.setScale(MJbgByMJoff[mJoff]);
};






/**
 *
 */
function changeMJBg(node, type)
{
    function changeMJBgLoop(node, type) {
        if (node.toString() == "[object ImageView]") {
            var oldFile = node.getRenderFile().file;
            var newFile = getNewMJBgFile(oldFile, type);

            if (newFile != oldFile) {
                node.loadTexture(newFile);
                setMJDif(node);
            }
        }

        var childArray = node.getChildren();
        for(var index in childArray)
        {
            var child = childArray[index];
            changeMJBgLoop(child, type);
        }
    }

    changeMJBgLoop(node, type);

        var pl = getUIPlayer(0);
    if (pl && pl.mjhand && pl.mjhand.length > 0 && !cc.sys.isObjectValid(MjClient.endoneui)){
            MjClient.playui.CardLayoutRestore(getNode(0), 0);
    }
}

function schedulLoadTexture(node) {
    var i = 2;
    node.schedule(function () {
        node.loadTexture("playground/count_down_" + i + ".png");
        i--;
    }, 1, 3, 1);
}

/**
 * @function 杠牌立即结算得分飞元宝动画效果
 * @param {node} thisNode "top"|"left"|"down"|"right" node
 * @param {object} eD 杠牌数据
 * @param {number} off 玩家偏移量
 */
function dealGangLiJiJieSuan(thisNode, eD, off)
{
    console.log("dealGangLiJiJieSuan from: "+eD.from);

    // 杠的时候改变数据
    var sData = MjClient.data.sData;
    for (var uid in eD.players) {
        var pl = eD.players[uid];
        if(typeof pl.winall == 'number')
            console.log("dealGangLiJiJieSuan data pl.uid: "+pl.uid);
        console.log("dealGangLiJiJieSuan data pl.winall: "+pl.winall);
        sData.players[uid].winall = pl.winall;
    }

    var uids = sData.tData.uids;
    var gangPlayUid = eD.uid;                               // 杠牌人的uid
    var gangPlayOff = getUiOffByUid(gangPlayUid);           // 杠牌人相对于"down头像"的位置, "down"永远是0
    var endNode = getNode(gangPlayOff);     // 杠牌人的节点
    var selfOff = getPlayerIndex(off);      // 此节点相对房主的位置

    if(null == selfOff) return;             // 此节点没有玩家

    var selfOffUid = uids[selfOff];             // 此节点的uid
    var fromUid = eD.from>=0 ? uids[eD.from] : 0;  // 被杠人的uid

    console.log("dealGangLiJiJieSuan fromUid: "+ fromUid);

    // 点杠
    // 杠牌的人，不需要播放飞元宝的动画
    // 被明杠的人， 元宝飘到杠牌者的头像
    if(eD.gang == 1 &&  selfOffUid == fromUid){
        console.log("gangJieSuanAnim  1 off", off);
        console.log("gangJieSuanAnim  1 gangPlayOff", gangPlayOff);
        // 此节点被杠，播放动画
        InitUserCoinAndName(thisNode, off);
        InitUserCoinAndName(endNode, gangPlayOff);
        gangJieSuanAnim(thisNode, endNode)

        // 自摸杠牌， 3家元宝 元宝 飘到杠牌者的头像
    }else if(eD.gang != 1 && gangPlayUid!=selfOffUid){
        console.log("gangJieSuanAnim 2 gangPlayOff:" + off);
        console.log("gangJieSuanAnim 2 gangPlayOff:" + gangPlayOff);
        InitUserCoinAndName(thisNode, off);
        InitUserCoinAndName(endNode, gangPlayOff);
        gangJieSuanAnim(thisNode, endNode)
    }
}

/**
 * @function 杠牌立即结算得分飞元宝动画效果
 * @param {node} fromNode "top"|"left"|"down"|"right" node
 * @param {node} toNode "top"|"left"|"down"|"right" node
 * @param {function} callback
 */
function gangJieSuanAnim(fromNode, toNode, callback)
{
    var fromCoinNode = fromNode.getChildByName("head");
    var toCoinNode = toNode.getChildByName("head");

    var distance = cc.pDistance(fromNode.getPosition(), toNode.getPosition());
    var costTime = distance/600;
    if (costTime > 1)
        costTime = 1;
    else  if (costTime < 0.5)
        costTime = 0.5;

    var zuanshi = new cc.Sprite("game_picture/ico_zuanshi.png");
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
        zuanshi = new cc.Sprite("game_picture/ico_yuanbao.png");
    zuanshi.setPosition(fromCoinNode.getPosition());
    zuanshi.setScale(MjClient.size.height/720);
    fromNode.getParent().addChild(zuanshi,10000);

    callback = callback ? callback: function(){};
    zuanshi.runAction(cc.sequence(cc.fadeIn(0.2), cc.moveTo(costTime, toCoinNode.getPosition()), cc.fadeOut(0.2), cc.callFunc(callback), cc.removeSelf()));
}

function setGameOverPanelPlayerState(stateNode, pl, checkCount, bGoldField)
{
    var fileName = "";
    var cardCount = checkCount ? MjClient.majiang.CardCount(pl) : -1;
    if(MjClient.gameType == MjClient.GAME_TYPE.LUAN_GUA_FENG){
        var count = MjClient.majiang.CardCount(pl);
        if(count % 3 == 2){
            cardCount = 14;
        }
        else{
            cardCount = 13;
        }
    }
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ) {
        stateNode.visible = false;
    }
    if (pl.winType == 3)
    {
        if (!checkCount || cardCount == 14){
            if(bGoldField == true){
                fileName = "game_picture/gold/end/mj/endGoldMJ_zimo.png";
            }else{
                fileName = "gameOver/ico_zimo.png";
            }
        }
    }
    else if (pl.winType > 0)
    {
        if (!checkCount || cardCount == 14){
            if(bGoldField == true){
                fileName = "game_picture/gold/end/mj/endGoldMJ_hu.png";
            }else{
                fileName = "gameOver/ico_hu-0.png";
            }
        }
    }

    else if ((pl.mjdesc + "").indexOf("点炮") >= 0)
    {

        if (!checkCount || cardCount == 13)
        {
            stateNode.visible = true;
            if(bGoldField == true){
                fileName = "game_picture/gold/end/mj/endGoldMJ_dianpao.png";
            }else{
                fileName = "gameOver/ico_dianpao.png";
            }
        }
    }

    if (fileName != "")
    {
        stateNode.loadTexture(fileName);
        stateNode.ignoreContentAdaptWithSize(true);
    }
    else
    {
        stateNode.visible = false;
    }
}


// 设置解散图标
function setDismissTypeImg(pl,node,scw,sch,file){

    // 获取解散方式的图片
    var getDismissImgFileName = function(pl){
        if(!pl) return "";
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        var index = 0;
        if (pl.info.uid == tData.firstDel) {
            index = 1;// "申请解散"
        }else if(pl.mjdesc.indexOf("同意解散") >= 0){
            index = 2;
        }else if(pl.mjdesc.indexOf("拒绝解散") >= 0){
            index = 3;
        }else{
            index = 4; // 默认同意
        }
        return ["","shenqing.png","tongyi.png","jujue.png","zidong.png"][index];
    }

    if(MjClient.isDismiss && 
        (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || 
         MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
         MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP)) {

        var imgFile = getDismissImgFileName(pl);
        if(imgFile != ""){
            var bgSize = node.getContentSize();
            var dismissImg = new ccui.ImageView();
            dismissImg.loadTexture("gameOver/jiesan/" + file + "/"+imgFile);
            node.addChild(dismissImg,99);
            dismissImg.setPosition(cc.p(bgSize.width * scw,bgSize.height * sch));
        }
    }
}

/**
 * @function 显示每个玩家放大出牌预览效果
 * @param {node} playerUi "top"|"left"|"down"|"right" node
 * @card {number} card 麻将牌值
 */
function showMJOutBig(playerUi, card, off)
{
    if (MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ)
        return;

    cc.log("-----showMJOutBig------" + playerUi.getName());
    var outBig = playerUi.getChildByName("outBig");
    if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU)
    {
        var _outBig_cp = MjClient.playui.jsBind.eat._node.getChildByName("outBig");
        var  outBig1 = _outBig_cp.clone();
        _outBig_cp.getParent().addChild(outBig1);
        outBig1.zIndex = 500;
    }
    if (outBig)
    {
        function outBigCallback()
        {
            this.removeAllChildren();
            this.visible = false;
        }

        function clearBigcard()
        {
            this.removeFromParent();
        }
        setCardSprite(outBig, card, 5);

        if (outBig1)
        {
            setCardSprite(outBig1, card, 5);
            outBig1.visible = true;
            outBig1.setPosition(outBig.getPosition());
        }

        //宁乡开王麻将封东时打出的是牌背
        if(MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG && getUIPlayer(off).fengDong){
            outBig.loadTexture(getNewMJBgFile("playing/MJ/Mj_2.png"));
            outBig.removeAllChildren();
            if(outBig1){
                outBig1.loadTexture(getNewMJBgFile("playing/MJ/Mj_2.png"));
                outBig1.removeAllChildren();
            }
        }

        outBig.visible = true;
        outBig.zIndex = 500;
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
        {
            var scale = outBig.getScale();
            outBig.setScale(0.0);
            outBig.runAction(cc.Sequence(cc.scaleTo(0.3, scale), cc.delayTime(1.0), cc.callFunc(outBigCallback, outBig)));
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU)
        {
            var scale = outBig.getScale();
            outBig.visible = false;
            outBig1.setScale(0.0);
            outBig1.runAction(cc.Sequence(cc.scaleTo(0.1, scale), cc.delayTime(0.5), cc.callFunc(clearBigcard, outBig1)));
        }
        else
        {
            outBig.setOpacity(255);
            outBig.runAction(cc.Sequence(cc.delayTime(0.5), cc.fadeOut(0.6), cc.callFunc(outBigCallback, outBig)));
        }
    }
}


/**
 * 单选组件
 * @param  {array} nodes 多个CheckBox节点组成的列表
 * @param  {Function} callback 点击组件后的回调 默认值:空
 * @param  {number} defaultIndex 默认选择的节点 默认值:0
 * @return {obj} 返回单选组件的实例
 *         var radioNode = createRadioBoxForCheckBoxs([node0, node1], function(index){}, 0);
 */
function createRadioBoxForCheckBoxs(nodes, callback, defaultIndex){
    var newobj = {};

    newobj._nodeList = nodes;
    newobj._selectIndex = defaultIndex || 0;
    newobj._callback = callback || function(){};

    for (var i in newobj._nodeList){
        var item = newobj._nodeList[i];
        if(item == null) {
            cc.log('createRadioBoxForCheckBoxs item is null', i);
            delete newobj._nodeList[i];
        }
    }

    for (var i in newobj._nodeList){
        var item = newobj._nodeList[i];
        item._index = i;
        item.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    cc.log("----_nodeList-----");
                    newobj.selectItem(sender._index);
                    newobj._callback(sender._index, sender, newobj._nodeList);
                    break;
            }
        }, item);
    }

    newobj.selectItem = function(index){
        index = Number(index);
        if(index >= newobj._nodeList.length || !newobj._nodeList[index]){
            cc.log('selectItem index overflow index:', index, newobj._nodeList.length)
            return;
        }

        for (var j in newobj._nodeList){
            newobj._nodeList[j].setSelected(false);
        }
        newobj._nodeList[index].setSelected(true);
        newobj._selectIndex = index;
        cc.log("selectItem radio select", typeof(index), index);
    }

    newobj.getSelectItem = function(){
        return newobj._nodeList[newobj._selectIndex];
    }

    newobj.getSelectIndex = function(){
        //cc.log("getSelectIndex radio select", typeof(newobj._selectIndex), newobj._selectIndex);
        return newobj._selectIndex;
    }

    newobj.setSelectCallBack = function(callback){
        newobj._callback = callback;
    }

    newobj.selectItem(newobj._selectIndex);

    return newobj;
}


/**
 * 互斥组件
 * @param  {array} nodes 多个CheckBox节点组成的列表
 * @param  {Function} callback 点击组件后的回调 默认值:空
 * @param  {number} defaultIndex 默认选择的节点 默认值:-1
 * @return {obj} 返回互斥组件的实例
 *         var radioNode = createRadioBoxForCheckBoxs([node0, node1], function(index){}, 0);
 */
function createRadioBoxForCheckBoxsHuChi(nodes, callback, defaultIndex){
    var newobj = {};

    newobj._nodeList = nodes;
    newobj._selectIndex = defaultIndex || -1;
    newobj._callback = callback || function(){};
    newobj._ignoreChange = false;
    for (var i in newobj._nodeList){
        var item = newobj._nodeList[i];
        if(item == null) {
            cc.log('createRadioBoxForCheckBoxs item is null', i);
            delete newobj._nodeList[i];
        }
    }

    for (var i in newobj._nodeList){
        var item = newobj._nodeList[i];
        item._index = i;
        item.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    newobj.selectItem(sender._index);
                    newobj._ignoreChange = true;
                    newobj._callback(sender._index, sender, newobj._nodeList);
                    newobj._ignoreChange = false;
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    cc.log("----_nodeList-----");
                    if (!newobj._ignoreChang){
                        newobj._selectIndex = -1;
                        newobj._callback(sender._index, sender, newobj._nodeList);
                    }
                    break;
            }
        }, item);
    }

    newobj.selectItem = function(index){
        index = Number(index);
        if(index != -1 && (index >= newobj._nodeList.length || !newobj._nodeList[index])){
            cc.log('selectItem index overflow index:', index, newobj._nodeList.length)
            return;
        }

        for (var j in newobj._nodeList){
            newobj._nodeList[j].setSelected(false);
        }
        if (index != -1)
            newobj._nodeList[index].setSelected(true);
        newobj._selectIndex = index;
        cc.log("selectItem radio select", typeof(index), index);
    }

    newobj.getSelectItem = function(){
        if(index >= newobj._nodeList.length || !newobj._nodeList[index]){
            cc.log('selectItem index overflow index:', index, newobj._nodeList.length)
            return;
        }
        return newobj._nodeList[newobj._selectIndex];
    }

    newobj.getSelectIndex = function(){
        //cc.log("getSelectIndex radio select", typeof(newobj._selectIndex), newobj._selectIndex);
        return newobj._selectIndex;
    }

    newobj.setSelectCallBack = function(callback){
        newobj._callback = callback;
    }

    newobj.selectItem(newobj._selectIndex);

    return newobj;
}

increaseByKey = function(dict, key, incr) {
    if (dict[key]) {
        dict[key] += (incr || 1);
    }
    else {
        dict[key] = (incr || 1);
    }
};

/**
 * 播放起手胡动画
 * @param  {object} node 头像节点 down/right/top/left
 * @param  {object} eD 起手胡事件 doQiShouHu 的数据
 * @param  {number} off 玩家对应位置
 * @return {boolean} 是否播放成功
 */
function playQiShouHuAnim(node, eD, off){
    var uidHu = eD.uid;
    var pl = getUIPlayer(off);
    var indexHu = getPlayerIndex(off);
    if(!pl || typeof pl == 'undefined')
        return false;

    if(uidHu != pl.info.uid)
        return false;

    if(0 == off){
        var eat = MjClient.playui.jsBind.eat;
        var qshu_node = eat.qshu_layout._node;
        qshu_node.visible = false;
        if (MjClient.GAME_TYPE.NING_XIANG_MJ == MjClient.gameType)
        {
            qshu_node.visible = true;
        }
    }

    var playuis = [];
    playuis[0] = MjClient.playui._downNode;
    playuis[1] = MjClient.playui._rightNode;
    playuis[2] = MjClient.playui._topNode;
    playuis[3] = MjClient.playui._leftNode;

    var showCards = eD.showCards.slice();
    showCards.sort(function(a, b){
        return a - b;
    })

    var qshuNode = node.getChildByName("out_qshu_layout");
    qshuNode.removeAllChildren();
    qshuNode.visible = true;
    qshuNode.setRotation(-off*90);
    var down = MjClient.playui._downNode
    var out = down.getChildByName("out0").clone();
    var outw = out.getSize().width;
    var outx = 227 - showCards.length/2*outw/2;
    var outy = 48;
    out.setPosition(cc.p(0, outy));
    out.setScale(0.5);
    out.setAnchorPoint(cc.p(0.5, 0.5));
    for(var i = 0; i < showCards.length; i++)
    {
        var card = out.clone();
        setCardSprite(card, showCards[i], 0);
        card.visible = true;
        card.setPositionX(outx + i * outw / 2);
        qshuNode.addChild(card);
    }

    if(eD.qshuName){
        var imgPath = "playing/gameTable/qs_" + eD.qshuName + ".png";
        var nameSp = new cc.Sprite(imgPath);
        qshuNode.addChild(nameSp);
        nameSp.setRotation(off*90);

        if(off==1) {
            nameSp.setPositionX(nameSp.getPositionX() + 200)
            nameSp.setPositionY(nameSp.getPositionY() + 200);
        }

        if(off==3){
            nameSp.setPositionX(nameSp.getPositionX() + 200);
            nameSp.setPositionY(nameSp.getPositionY() + 200);
        }

    }

    var callBack = function(){
        qshuNode.visible = false;
    }

    qshuNode.stopAllActions();
    qshuNode.runAction(cc.sequence(cc.DelayTime(3), cc.CallFunc(callBack)));

    for(var i in playuis){
        var playui = playuis[i];
        if(i != off){
            gangJieSuanAnim(playui, playuis[off])
        }
    }

    return true;
}

//清除热更缓存目录, 由于删了资源，为避免出错所以会重启游戏
removeUpdataDirectory = function(){
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/project.manifest");
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update_temp/project.manifest.temp");
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/res/project.manifest");
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/res_majiang/project.manifest");
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/res_majiang_temp/project.manifest.temp");
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/res_zipai/project.manifest");
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/res_zipai_temp/project.manifest.temp");
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/res_poker/project.manifest");
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/res_poker_temp/project.manifest.temp");
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/res_paodekuai/project.manifest");
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/res_paodekuai_temp/project.manifest.temp");
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/res_goldField/project.manifest");
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/res_goldField_temp/project.manifest.temp");
    for (var key in MjClient.RESOURCE_CLASS)
    {
        util.localStorageEncrypt.setStringItem("VERSION_RESOURCE_CLASS_" + MjClient.RESOURCE_CLASS[key], "");
    }

    if (jsb.fileUtils.isFileExist("src/Update_min.jsc") || jsb.fileUtils.isFileExist("src/Update_min.js") ||
        jsb.fileUtils.isFileExist("src/loginLayer.jsc") || jsb.fileUtils.isFileExist("src/loginLayer.js") ) {
        jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/project.json");
        jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/main.js");
        jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/main.jsc");
    }

    MjClient.restartGame();
};

//是否是代理
isAgent = function(){
    var result = false;
    if (!MjClient.data || !MjClient.data.pinfo)
        return result;

    if ((MjClient.data.pinfo.myMemberId && parseInt(MjClient.data.pinfo.myMemberId) > 0)
        || (MjClient.data.pinfo.myAgentId && parseInt(MjClient.data.pinfo.myAgentId) > 0))
    {
        result = true;
    }

    return result;
};

/**create by Lms
 * @DateTime:     2018-02-28
 * @Description: 桌面信息展示 （拉伸弹框）
 */
showPlayUI_roundInfo = function(strInfo,tableId,roomNoStr) {//桌面信息优化
    if(isJinZhongAPPType() ||
        MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
        MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG ||
        MjClient.gameType === MjClient.GAME_TYPE.ML_HONGZHONG_ZERO ||
        MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU ||
        MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN ||
        MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
        MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN ||
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
        MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU ||
        MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI  ||
        MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
        MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG)
    {
        return COMMON_UI.addPlayingInfo(strInfo,tableId);
    }
    else if(MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ && COMMON_UI3D.is3DUI())
    {
        return COMMON_UI.addPlayingInfo(strInfo,tableId);
    }

    cc.log(" ======= 桌面信息优化 ========== strInfo",strInfo);
    var roundui = ccs.load("PlayaroundInfo.json");
    if (!cc.sys.isObjectValid(MjClient.playui) ) {
        cc.log(" ======= 没有找到桌面======");
        return;
    }
    MjClient.playui.addChild(roundui.node,1);
    roundui.node.setName("node_roomInfo");
    var _infoNode = MjClient.playui.getChildByName("node_roomInfo");
    if (_infoNode) {
        var size_width = 318;
        var size_hight = 100;
        var pos_x1 = 320;
        var pos_x2 = 0;
        setWgtLayout(_infoNode, [0.15, 0.15], [0.0, 0.85], [0, 0]);

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ
            || isJinZhongAPPType()
            || MjClient.getAppType() == MjClient.APP_TYPE.TXLVLIANGMJ
            || MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ) {
            setWgtLayout(_infoNode, [0.1, 0.1], [0.0, 0.9], [0, 0]);
            size_hight = 85;
        }

        var _roundInfoNode = _infoNode.getChildByName("info_bg").getChildByName("roundInfo");

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
            setWgtLayout(_infoNode, [0.13, 0.13], [0.0, 0.89], [0, 0]);
            var _line = _infoNode.getChildByName("info_bg").getChildByName("img_line2");
            // cc.log(" ===== strInfo ",strInfo.length,strInfo,_line,(strInfo.length > 19) == true);
            //讲逗号换成空格
            // var arr = strInfo.split(",");
            // strInfo = arr.join(" ");
            // 字符长度是不可靠的 只能 通过实际长度来判断 克隆一个模板的实际长度
            var clone_info = _roundInfoNode.clone();
            clone_info.ignoreContentAdaptWithSize(true);
            clone_info.setString(strInfo);
            var _size = clone_info.getContentSize();
            cc.log(" ======clone_info font size =  ",clone_info.getFontSize());
            var max_size = 315;
            if (_line) {
                _line.visible = _size.width > max_size ? true:false;
            }

        }
        _roundInfoNode.setString(strInfo);
        _roundInfoNode.setContentSize(size_width,size_hight);

        var _len = strInfo.length - strInfo.split(",").length / 2;
        if(_len > 0 && (_len > 3 * 15))   // 字体为20，每行最多显示15个字
        {
            if (_len < 4 * size_width / 17)
                _roundInfoNode.setFontSize(17);
            else
                _roundInfoNode.setFontSize(15);
        }

        if(_len > 30)
        {
            _roundInfoNode.setFontSize(18);
        }

        var _tableIdNode_1 = _infoNode.getChildByName("Image_1");
        if (_tableIdNode_1) {
            var _tableIdNode = _tableIdNode_1.getChildByName("tableid");
            if (tableId) {
                _tableIdNode.ignoreContentAdaptWithSize(true);
                _tableIdNode.setString(tableId);
                if(roomNoStr){
                    var _roomNoNode = _tableIdNode_1.getChildByName("roomNo");
                    if(_roomNoNode){
                        _roomNoNode.setString(roomNoStr+"");
                    }
                }
                var _bannerNode = MjClient.playui._downNode.getParent().getChildByName("banner");
                //原来房间号的隐藏 如果 结构改变 请自己额外添加
                if (_bannerNode && _bannerNode.getChildByName("tableid") && _bannerNode.getChildByName("roomNo")) {
                    _bannerNode.getChildByName("tableid").visible = false;
                    _bannerNode.getChildByName("roomNo").visible = false;
                }
                pos_x2 = 145;
                pos_x1 = 480;
            } else {
                _tableIdNode_1.visible = false;
            }

        }
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ
            || isJinZhongAPPType()
            || MjClient.getAppType() == MjClient.APP_TYPE.TXLVLIANGMJ
            || MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ) {
            var _gametype = _tableIdNode_1.getChildByName("gameType");
            _gametype.setString(GameCnName[MjClient.gameType]);
        }
        var _info = MjClient.playui._downNode.getParent().getChildByName("roundInfo");
        if (_info) _info.visible = false;

        var _info_bgNode = _infoNode.getChildByName("info_bg");
        _info_bgNode.setPosition(cc.p(pos_x1, 41.10));
        _info_bgNode.setUserData(1);
        var _btn_arrowNode = _infoNode.getChildByName("info_bg").getChildByName("btn_arrow");
        var arrow_posX = _btn_arrowNode.getPositionX();
        _btn_arrowNode.setTouchEnabled(true);
        // _btn_arrowNode.runAction(cc.sequence(cc.fadeOut(0.4), cc.fadeIn(0.6)).repeatForever()); //产品说 花眼 取消闪烁
        _btn_arrowNode.loadTexture("playing/other/roomInfo3.png");

        // 产品需求 改成 开局后 收回去
        // _info_bgNode.scheduleOnce(function() {
        //     _info_bgNode.runAction(cc.sequence(cc.moveTo(0.5, cc.p(pos_x2, 41.10)), cc.callFunc(function() {
        //     })));
        //     _btn_arrowNode.loadTexture("playing/other/roomInfo2.png");
        //     _info_bgNode.setUserData(0);
        // }, 5);

        _btn_arrowNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (_info_bgNode.getUserData() == 0) {
                    _info_bgNode.runAction(cc.sequence(cc.moveTo(0.5, cc.p(pos_x1, 41.10)), cc.callFunc(function() {

                    })));
                    _btn_arrowNode.loadTexture("playing/other/roomInfo3.png");
                    _info_bgNode.setUserData(1);
                    _roundInfoNode.visible = true;
                    if (_line) {

                        _line.visible = _size.width > max_size ? true:false;
                    }
                } else {
                    _info_bgNode.runAction(cc.sequence(cc.moveTo(0.5, cc.p(pos_x2, 41.10)), cc.callFunc(function() {
                        //_btn_arrowNode.loadTexture("playing/other/roomInfo2.png");
                    })));
                    _btn_arrowNode.loadTexture("playing/other/roomInfo2.png");
                    _info_bgNode.setUserData(0);
                    _roundInfoNode.visible = false;
                    if (_line) {
                        _line.visible = false;
                    }
                }
            }
        }, this);

        var auto_goback = function() {
            if (_info_bgNode.getUserData() == 1) {
                _info_bgNode.runAction(cc.sequence(cc.moveTo(0.5, cc.p(pos_x2, 41.10)), cc.callFunc(function() {
                    //_btn_arrowNode.loadTexture("playing/other/roomInfo2.png");
                })));
                _btn_arrowNode.loadTexture("playing/other/roomInfo2.png");
                _info_bgNode.setUserData(0);
                _roundInfoNode.visible = false;
                if (_line) {
                    _line.visible = false;
                }
            }
        }

        var eventCfg =
            {
                _event:
                    {
                        onlinePlayer: function(eD) {
                            if(eD.uid == SelfUid() && !COMMON_UI3D.is3DUI()) this.visible = true;
                        },
                        initSceneData: function()
                        {
                            if(COMMON_UI3D.is3DUI())
                                this.visible = false;
                            else
                                this.visible = true;
                        },
                        roundEnd: function()
                        {
                            this.visible = false;
                        },
                        endRoom: function()
                        {
                            this.visible = false;
                        },
                        mjhand:function(){
                            auto_goback();
                        },
                    }
            }
        BindUiAndLogic(_infoNode, eventCfg);

    }
};


/**create by Wxd
 * @DateTime:     2018-03-27
 * @Description: 比赛信息展示 （拉伸弹框）
 */
showPlayUI_matchInfo = function(strInfo,tableId) {//桌面信息优化
    cc.log(" ======= 桌面信息优化 ========== strInfo",strInfo);
    var roundui = ccs.load("PlayaroundInfo.json");
    if (!cc.sys.isObjectValid(MjClient.playui) ) {
        cc.log(" ======= 没有找到桌面======");
        return;
    }

    MjClient.playui.addChild(roundui.node,1);
    roundui.node.setName("node_roomInfo")
    var _infoNode = MjClient.playui.getChildByName("node_roomInfo");
    if (_infoNode) {
        var size_width = 160;
        var size_hight = 70;
        var pos_x1 = 162;
        var pos_x2 = 0;
        setWgtLayout(_infoNode, [0.1, 0.1], [0.0, 0.9], [0, 0]);

        var _roundInfoNode = _infoNode.getChildByName("info_bg").getChildByName("roundInfo");
        _roundInfoNode.setString(strInfo);
        UIEventBind(null, _roundInfoNode, "match_rank_refresh",function(data) {
            var sData = MjClient.data.sData
            var tData = sData.tData;
            if(tData.matchId && tData.matchInfo){
                if(MjClient.matchRank){
                    _roundInfoNode.setString("排名："+MjClient.matchRank+"/"+tData.matchInfo.userCount+"\n前"+tData.matchInfo.jingjiCount+"名晋级");
                }else {
                    _roundInfoNode.setString("排名："+tData.matchInfo.userCount+"/"+tData.matchInfo.userCount+"\n前"+tData.matchInfo.jingjiCount+"名晋级");
                }
            }
        });
        UIEventBind(null, _roundInfoNode, "match_state_refresh",function(data) {
            var sData = MjClient.data.sData
            var tData = sData.tData;
            if(tData.matchId && tData.matchInfo){
                if(MjClient.matchRank){
                    _roundInfoNode.setString("排名："+MjClient.matchRank+"/"+tData.matchInfo.userCount+"\n前"+tData.matchInfo.jingjiCount+"名晋级");
                }else {
                    _roundInfoNode.setString("排名："+tData.matchInfo.userCount+"/"+tData.matchInfo.userCount+"\n前"+tData.matchInfo.jingjiCount+"名晋级");
                }
            }
        });
        _roundInfoNode.setContentSize(size_width,size_hight);
        var _tableIdNode_1 = _infoNode.getChildByName("Image_1");
        if (_tableIdNode_1) {
            var _tableIdNode = _tableIdNode_1.getChildByName("tableid");
            if (tableId) {
                _tableIdNode.ignoreContentAdaptWithSize(true);
                _tableIdNode.setString(tableId);
                var _bannerNode = MjClient.playui._downNode.getParent().getChildByName("banner");
                //原来房间号的隐藏 如果 结构改变 请自己额外添加
                if (_bannerNode) {
                    if (_bannerNode.getChildByName("tableid")){
                        _bannerNode.getChildByName("tableid").visible = false;
                    }
                    if(_bannerNode.getChildByName("roomNo")){
                        _bannerNode.getChildByName("roomNo").visible = false;
                    }

                }
                pos_x2 = 145;
                pos_x1 = 480;
            } else {
                _tableIdNode_1.visible = false;
            }

        }
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ || isJinZhongAPPType()) {
            var _gametype = _tableIdNode_1.getChildByName("gameType");
            _gametype.setString(GameCnName[MjClient.gameType]);
        }

        var _info = MjClient.playui._downNode.getParent().getChildByName("roundInfo");
        var _block = MjClient.playui._downNode.getParent().getChildByName("block");
        var _back = MjClient.playui._downNode.getParent().getChildByName("back");
        var titleInfo = _info.clone();
        if(_block){
            _block.setLocalZOrder(-3);
        }
        _back.setLocalZOrder(-2);
        titleInfo.setLocalZOrder(-1);
        setWgtLayout(titleInfo,[0.6, 0.6], [0.5, 0.63], [0, 1.0]);
        var tData = MjClient.data.sData.tData;
        titleInfo.setString(tData.matchInfo.title);
        titleInfo.setVisible(true);
        titleInfo.setFontSize(40);
        MjClient.playui._downNode.getParent().addChild(titleInfo);

        var gameName = MjClient.playui._downNode.getParent().getChildByName("gameName");
        gameName.setVisible(false);

        var _bannerNode = MjClient.playui._downNode.getParent().getChildByName("banner");
        //原来房间号的隐藏 如果 结构改变 请自己额外添加
        if (_bannerNode) {
            if (_bannerNode.getChildByName("tableid")){
                _bannerNode.getChildByName("tableid").visible = false;
            }
            if(_bannerNode.getChildByName("roomNo")){
                _bannerNode.getChildByName("roomNo").visible = false;
            }

        }

        var _info_bgNode = _infoNode.getChildByName("info_bg");
        _info_bgNode.setPosition(cc.p(pos_x1, 41.10));
        _info_bgNode.setUserData(1);
        var _btn_arrowNode = _infoNode.getChildByName("info_bg").getChildByName("btn_arrow");
        _btn_arrowNode.setTouchEnabled(true);
        // _btn_arrowNode.runAction(cc.sequence(cc.fadeOut(0.4), cc.fadeIn(0.6)).repeatForever()); //产品说 花眼 取消闪烁
        _btn_arrowNode.loadTexture("playing/other/roomInfo3.png");

        _btn_arrowNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (_info_bgNode.getUserData() == 0) {
                    _info_bgNode.runAction(cc.sequence(cc.moveTo(0.5, cc.p(pos_x1, 41.10)), cc.callFunc(function() {

                    })));
                    _btn_arrowNode.loadTexture("playing/other/roomInfo3.png");
                    _info_bgNode.setUserData(1);
                    _roundInfoNode.visible = true;
                } else {
                    _info_bgNode.runAction(cc.sequence(cc.moveTo(0.5, cc.p(pos_x2, 41.10)), cc.callFunc(function() {
                        //_btn_arrowNode.loadTexture("playing/other/roomInfo2.png");
                    })));
                    _btn_arrowNode.loadTexture("playing/other/roomInfo2.png");
                    _info_bgNode.setUserData(0);
                    _roundInfoNode.visible = false;
                }
            }
        }, this);

        var auto_goback = function() {
            if (_info_bgNode.getUserData() == 1) {
                _info_bgNode.runAction(cc.sequence(cc.moveTo(0.5, cc.p(pos_x2, 41.10)), cc.callFunc(function() {
                    //_btn_arrowNode.loadTexture("playing/other/roomInfo2.png");
                })));
                _btn_arrowNode.loadTexture("playing/other/roomInfo2.png");
                _info_bgNode.setUserData(0);
                _roundInfoNode.visible = false;
            }
        }

        var eventCfg =
            {
                _event:
                    {
                        onlinePlayer: function(eD) {
                            if(eD.uid == SelfUid()) this.visible = true;
                        },
                        initSceneData: function()
                        {
                            this.visible = true;
                        },
                        roundEnd: function()
                        {
                            this.visible = false;
                        },
                        endRoom: function()
                        {
                            this.visible = false;
                        },
                        mjhand:function(){
                            //auto_goback();
                        },
                    }
            }
        BindUiAndLogic(_infoNode, eventCfg);

    }
};


/*
 by sking 2018.1.29
 function : 复制信息,或者获取房间信息打开微信，复制信息
 @infoType :
 0  房间信息  <roundInfo>
 1  复制房间号 <getRoomNum>
 2  微信邀请   <wxinvite>
 3  小结算描述
 4  大结算描述
 */
getPlayingRoomInfo = function(infoType)
{
    var roomInfo = "";
    var tData = MjClient.data.sData.tData;
    var _MaxPlayerCount = parseInt(MjClient.data.sData.tData.maxPlayer);
    cc.log("----------------------------------_MaxPlayerCount = " + _MaxPlayerCount);
    if (MjClient.systemConfig.roomInviteType == "1" && infoType == 2) infoType = 1;

    if(infoType == 0) //房间玩法信息
    {

        roomInfo = getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount);
        roomInfo  = roomInfo.substring(0, roomInfo.lastIndexOf(',')); //去掉最后的逗号

        // 房卡房间的房间等级名称
        var fangkaRoomLevelName = FriendCard_Common.getFangkaRoomLevelName();
        if (fangkaRoomLevelName)
            roomInfo += "," + fangkaRoomLevelName + "房间";

        //比赛场
        var BSStr = "";
        if(tData.matchId){
            BSStr = ",10秒出牌";
            roomInfo += BSStr;
            roomInfo = GameCnName[MjClient.gameType]+","+roomInfo;
        }
    }
    else if(infoType == 1) //复制房间号
    {
        roomInfo = GameCnName[MjClient.gameType] + "," + getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount);
        var _playerCount = Object.keys(MjClient.data.sData.players).length;
        var _needCount = _MaxPlayerCount - _playerCount;

        var str1 = tData.roundNum + "局";
        if(tData.areaSelectMode.isQuan)
        {
            str1 = parseInt(tData.roundNum/tData.areaSelectMode.maxPlayer) + "圈";
        }

        var str8 = str1 + ",缺" +_needCount+ "人,速度加入("+AppCnName[MjClient.getAppType()]+")\n" + "(复制此消息打开游戏可直接进入该房间)";
        GLog(roomInfo + str8);
        MjClient.native.doCopyToPasteBoard("房间号:[" + tData.tableid + "]\n" + roomInfo + str8);
        MjClient.showMsg("已复制房间号，请不要返回大厅。选择社交平台后粘贴房间信息。", function(){
            //MjClient.native.openWeixin();
            MjClient.openAppToMultiPlatform();
        }, function(){});
    }
    else if(infoType == 2) //微信邀请
    {

        roomInfo = getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount);

        var str1 = tData.roundNum + "局";
        if(tData.areaSelectMode.isQuan)
        {
            str1 = parseInt(tData.roundNum/tData.areaSelectMode.maxPlayer) + "圈";
        }

        var str7 = str1 + "," + "速度加入【"+AppCnName[MjClient.getAppType()]+"】";
        GLog(roomInfo + str7);
        var clubInfoTable = getClubInfoInTable();
        // var txt_club = clubInfoTable ? "亲友圈("+clubInfoTable.clubId + ")" : "";
        var txt_club = clubInfoTable ? "亲友圈" + clubInfoTable.clubId : "";
        var _playerCount = Object.keys(MjClient.data.sData.players).length;
        var _needCount = _MaxPlayerCount - _playerCount;

        var _urlStr = MjClient.remoteCfg.entreRoomUrl+"?vipTable="+tData.tableid;
        if (clubInfoTable)
            _urlStr += ((clubInfoTable.isLMClub ? "&leagueId=":"&clubId=") + clubInfoTable.clubId);
        if (tData.ruleId)
            _urlStr += "&ruleId=" + tData.ruleId;

        var _titleStr = "";
        var _contentStr = ((clubInfoTable && clubInfoTable.ruleName) ? GameCnName[MjClient.gameType] + "," : "") + roomInfo + str7;
      
        _titleStr = GameCnName[MjClient.gameType] + " " + tData.tableid + " 缺" + _needCount+"人" +  " 点击加入>>>" + txt_club;
        // _titleStr = GameCnName[MjClient.gameType] + " 房间" + tData.tableid + txt_club;

        cc.log("邀请信息:", _titleStr, _contentStr);
        MjClient.getInviteUrl(function (_urlStr) {
            if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb())
            {
                h5.weixinHelper.wxShareUrl(_urlStr, _titleStr, _contentStr);
            }
            else
            {
                MjClient.shareUrlToMultiPlatform(_urlStr, _titleStr, _contentStr);
            }
        });
    }
    else if(infoType == 3) //小结算描述
    {
        // 晋中换皮，房间信息显示根据"#"拆分，by 江崇伟(只新增"#"部分用于拆分字符串)
        var _roundText = "";
        if(isJinZhongAPPType())
        {
            var _currentRound = tData.roundAll - tData.roundNum;
            if(_currentRound > tData.roundAll) _currentRound = tData.roundAll;

            _roundText = ",局数:" + _currentRound + "/" + tData.roundAll;
            var roundNumPre = typeof(tData.roundNumPre) != "undefined" ? tData.roundNumPre : tData.roundNum;
            if (roundNumPre && tData.roundAll - tData.roundNumPre + 1 <= tData.roundAll)
            {
                var _currentRound = tData.roundAll - tData.roundNumPre + 1;
                if(_currentRound > tData.roundAll) _currentRound = tData.roundAll;
                _roundText = ",局数:" + _currentRound + "/" + tData.roundAll;
            }
            if((MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_MA_JIANG ||
                MjClient.gameType == MjClient.GAME_TYPE.ZHUO_HAO_ZI) && tData.roundAll==9999)
            {
                if(tData.roundNum <=0 && !MjClient.isDismiss)
                {
                    cc.log("roundNum <= 0 " + JSON.stringify(tData));
                    var guoNum = tData.roundAll - tData.guoNum+1;
                    _roundText =  ",第" + guoNum+ "局,100锅";
                }
                else
                {
                    cc.log("roundNum > 0 " + _currentRound);
                    _roundText =  ",第" + _currentRound+ "局,100锅";
                }
            }
            cc.log("===显示剩余局数-------- = " + roomInfo);
            roomInfo = GameCnName[MjClient.gameType] + "," + getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount) + "#房间号:" + tData.tableid + _roundText;
            if (MjClient.isShenhe) {
                roomInfo = "牌友联盟" + GameCnName[MjClient.gameType] + "," + getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount) + "#房间号:" + tData.tableid;
            }
        }
        else {
            roomInfo = GameCnName[MjClient.gameType] + "," + getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount) + "房间号:" + tData.tableid +_roundText;
            if (MjClient.isShenhe) {
                roomInfo = "牌友联盟" + GameCnName[MjClient.gameType] + "," + getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount) + "房间号:" + tData.tableid;
            }
        }
        cc.log(" roomInfo 3 = " + roomInfo);
    }
    else if(infoType == 4) //大结算描述
    {
        // roomInfo = GameCnName[MjClient.gameType] + "," + getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount) + "房间号:" + tData.tableid;
        // if(MjClient.isShenhe){
        //     roomInfo = "牌友联盟"+GameCnName[MjClient.gameType] + "," + getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount) + "房间号:" + tData.tableid;
        // }
        // cc.log(" roomInfo 3 = " + roomInfo);
    }
    else if(infoType == 5) // 房间主要信息     长沙麻将 房间号： 866688  长沙麻将
    {
        roomInfo = tData.gameCnName + "  房间号:" + tData.tableid;
    }
    return roomInfo;
}


/*
 江苏的准备按钮的功能,by sking 2018.2.27
 用法参考牌友联盟江苏app的麻将，有waitReady事件就会有准备过程
 */
MJ_setReadyBtn = function(readyCallBack)
{
    // if(MjClient.getAppType() ==  MjClient.APP_TYPE.QXNTQP) {
    //
    //     var _parentNode = MjClient.playui._downNode.getParent();
    //     var node = new cc.Node();
    //     _parentNode.addChild(node);
    //
    //     UIEventBind(null, node, "mjhand", function (eD) {
    //         try{
    //             ScanCheatLayer.showStartOnce();
    //         }catch(e){
    //             cc.log('please add "src/ScanCheatLayer.js" to project.json');
    //         }
    //     });
    //
    //     return; //南通先不加准备
    // }

    if(!readyCallBack)
    {
        if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU ||
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI ||
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA ||
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DA_QI||
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.GAN_DENG_YAN||
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.GUAN_DAN
        )
        {
            readyCallBack = PKPassConfirmToServer_card;
        }
    }


    var _parentNode = MjClient.playui._downNode.getParent();
    var _btnReady = _parentNode.getChildByName("BtnReady");
    if(!_btnReady)
    {
        _btnReady = new ccui.Button("playing/doudizhu/zhunbei.png");
        _btnReady.setName("BtnReady");
        _parentNode.addChild(_btnReady);
    }

    _btnReady.visible = false;
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
        setWgtLayout(_btnReady,[0.16, 0], [0.5, 0.4], [0, 0]);
    }
    else if(MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER)
    {
        setWgtLayout(_btnReady,[0.2, 0.2], [0.5, 0.415], [0, 0]);
    }
    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
        // 江苏麻将牌桌UI优化
        setWgtLayout(_btnReady,[0.2, 0.2], [0.5, 0.48], [0, 0]);
    }
    else {
        setWgtLayout(_btnReady,[0.2, 0.2], [0.5, 0.4], [0, 0]);
    }

    if (!readyCallBack)
        readyCallBack = MJPassConfirmToServer;

    _btnReady.addTouchEventListener(function(sender,type){
        if(type === 2){
            cc.log("-----------------ready current game clase = " + MjClient.gameClass);
            readyCallBack();
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zhunbei", {uid: SelfUid(), gameType:MjClient.gameType});
        }
    },this);

    UIEventBind(null, _btnReady, "waitReady", function (eD) {
        if (currentIsAutoRelay())
            readyCallBack();
        else
            _btnReady.visible = true;
    });

    UIEventBind(null, _btnReady, "mjhand", function (eD) {
        _btnReady.visible = false;
        if(!MjClient.isInGoldFieldNormal()){
            //非金币场
            try{
                //ScanCheatLayer.showStartOnce();
            }catch(e){
                cc.log('please add "src/ScanCheatLayer.js" to project.json');
            }
        }
    });

    UIEventBind(null, _btnReady, "initSceneData", function (eD) {
        _btnReady.visible = false;
        var tData = MjClient.data.sData.tData;
        if (tData.roundNum != tData.roundAll) return;
        var pl = getUIPlayer(0);
        if(tData.tState == TableState.waitReady && pl.mjState == TableState.waitReady && !IsInviteVisible())
        {
            if (currentIsAutoRelay())
                readyCallBack();
            else
                _btnReady.visible = true;
        }
    });

    UIEventBind(null, _btnReady, "PKPass", function (eD) {
        _btnReady.visible = false;
    });

    UIEventBind(null, _btnReady, "removePlayer", function (eD) {
        _btnReady.visible = false;
    });

    UIEventBind(null, _btnReady, "onlinePlayer", function (msg) {
        if(msg.uid  == SelfUid())
        {
            _btnReady.visible = false;
        }
    });

}

/*
 晋中添加选座的功能,不能和准备同时存在，by sking 2018.4.10
 2
 |
 3-----|------ 1
 |
 0
 */
MJ_setSelectDirBtn = function()
{
    if(GameClass[MjClient.gameType] != MjClient.GAME_CLASS.MA_JIANG)
    {
        return;
    }
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    cc.log("==============MJ_setSelectDirBtn=================");
    var _parentNode = MjClient.playui._downNode.getParent();

    if(tData.maxPlayer == 2 ) return;
    if(tData.tState != TableState.waitJoin)
    {
        return;
    }

    if(_parentNode.getChildByName("selectLayer")) return; //防止创建2层

    var _waitNode = _parentNode.getChildByName("wait");
    var _getRoomNumBtn = _waitNode.getChildByName("getRoomNum");
    var _wxinviteBtn = _waitNode.getChildByName("wxinvite");
    var _delroomBtn = _waitNode.getChildByName("delroom");
    var _backHomeBtn = _waitNode.getChildByName("backHomebtn");
    var _btnDirArray = [];
    var _handAnimArray = [];
    var _posFator = [[0,-1.5],[1.5,0],[0,1.5],[-1.5,0]];
    var _posAngle = [0,90,180,270];

    if(tData.maxPlayer == 3){
        _posFator = [[0,-1.5],[0,1.5],[-1.5,0]];
        _posAngle = [0,180,270];
    }
    var _rotateBying = false;
    var _rotationNode = new ccui.Layout();
    _rotationNode.setName("selectLayer");

    _rotationNode.setContentSize(cc.size(1280,720));
    _parentNode.addChild(_rotationNode);

    var _naozhong = new ccui.ImageView("playing/paodekuaiTable/naozhong.png");
    _naozhong.setScale(0.85);
    var _timeText = new ccui.Text();
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {//岳阳同一使用方正兰亭
        _timeText.setFontName("fonts/lanting.TTF");
    }
    _timeText.setString("00");
    _timeText.setColor(cc.color(0,0,0));
    _timeText.setFontSize(40);
    _timeText.setPosition(_naozhong.getContentSize().width/2*1.08,_naozhong.getContentSize().height/2*0.9);
    _naozhong.addChild(_timeText);
    _rotationNode.addChild(_naozhong);


    function setDirHead(node,off) {

        cc.log("============= off= " + off);
        var down = getNode(off).getChildByName("head");
        //down.setVisible(false);

        var _copyHead = down.clone();

        var pl = getUIPlayer(off);
        var url = pl.info.headimgurl;
        if(!url) url="png/default_headpic.png";
        cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
        {
            if(!err&&texture&&cc.sys.isObjectValid(_copyHead))
            {
                var headSprite = new cc.Sprite(texture);
                var nobody = _copyHead.getChildByName("nobody");
                var WxHead = nobody.getChildByName("WxHead");
                if(WxHead)
                {
                    WxHead.removeFromParent();
                }

                headSprite.setName("WxHead");
                nobody.addChild(headSprite);
                setWgtLayout(headSprite, [0.91, 0.91], [0.5, 0.5], [0, 0], false, true);
            }
        });

        _copyHead.setVisible(true);
        _copyHead.setPosition(node.getPosition());
        _copyHead.setScale(node.getScale()*0.62);
        node.getParent().addChild(_copyHead);
        node.setVisible(false);
        node.setUserData(_copyHead);
        node._uid = pl.info.uid;

        var myPl = getUIPlayer(0);
        if(myPl.dir >= 0 && off != 0 && _rotateBying)
        {
            _copyHead.setRotation(node._rotateAngle);
        }

        if(_copyHead.getChildByName("chatbg")){
            _copyHead.getChildByName("chatbg").removeFromParent();
        }
    }

    function senderSelectPos(off) {
        var pl = getUIPlayer(off);
        if(!pl) return;

        var dirIdx = pl.dir;

        if(tData.maxPlayer == 3 && pl.dir > 0) dirIdx -= 1;

        setDirHead(_btnDirArray[dirIdx],off);
        if(off == 0) {
            _rotationNode.runAction(cc.rotateBy(_posAngle[dirIdx] / 200, _posAngle[dirIdx]).easing(cc.easeSineOut()));
            for (var i = 0; i < _btnDirArray.length; i++) {
                _btnDirArray[i].runAction(cc.rotateBy(_posAngle[dirIdx] / 200, -_posAngle[dirIdx]).easing(cc.easeSineOut()));
                _btnDirArray[i]._rotateAngle = -_posAngle[dirIdx];
                if (_btnDirArray[i].getUserData()) _btnDirArray[i].getUserData().runAction(cc.rotateBy(_posAngle[dirIdx] / 200, -_posAngle[dirIdx]).easing(cc.easeSineOut()));
            }
            _rotateBying = true;
            if (Object.keys(sData.players).length < MjClient.MaxPlayerNum) {
                _getRoomNumBtn.setVisible(true);
                if (_wxinviteBtn) _wxinviteBtn.setVisible(true);
            }
            _rotationNode.isRotated = true;

            if (cc.sys.isObjectValid(_naozhong)) _naozhong.removeFromParent();

        }

        util.localStorageEncrypt.setBoolItem("isFirstEnter", false);
    }



    function setOffLine(uid)
    {
        var off = getUiOffByUid(uid);
        var pl = getUIPlayer(off);

        if(!pl) return;
        for(var i = 0; i < _btnDirArray.length;i++)
        {
            if(_btnDirArray[i]._uid == uid)
            {

                if(cc.sys.isObjectValid(_btnDirArray[i].getUserData()))
                {
                    if(!_btnDirArray[i].getUserData().getChildByName("offline"))
                    {
                        var _onlineNode = new ccui.ImageView("playing/other/Z_offline.png");
                        _onlineNode.setName("offline");
                        _onlineNode.setPosition(_btnDirArray[i].getUserData().getChildByName("nobody").getPosition());
                        _btnDirArray[i].getUserData().addChild(_onlineNode);
                    }
                    _btnDirArray[i].getUserData().getChildByName("offline").visible = !pl.onLine;

                    if (pl.onLine == false)
                    {
                        //
                        // cc.log("========================pl.offLineTime  = " + pl.offLineTime );
                        // if(!pl.offLineTime || pl.offLineTime < 0) pl.offLineTime = 0;

                        var _offLineNode =  _btnDirArray[i].getUserData().getChildByName("offline");
                        _offLineNode.unscheduleAllCallbacks();
                        _offLineNode.schedule(function(){
                            var _timeNode = _offLineNode.getChildByName("offLineTime");
                            if (!_timeNode) {

                                cc.log("========================offLineTime = ");
                                _timeNode = new ccui.Text();
                                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {//岳阳同一使用方正兰亭
                                    _timeNode.setFontName("fonts/lanting.TTF");
                                }
                                _timeNode.setName("offLineTime");
                                _timeNode.setFontSize(26);
                                _timeNode.setString("llllllllllllllllllll")
                                _offLineNode.addChild(_timeNode)
                            }
                            else
                            {
                                _timeNode.visible = true;
                            }

                            _timeNode.setPosition(cc.p(_offLineNode.getContentSize().width/2,_offLineNode.getContentSize().height*0.8));

                            //cc.log("============00000============ pl.offLineTime = " + pl.offLineTime);
                            if (pl.offLineTime || pl.offLineTime == 0)
                            {
                                var _currentTime = new Date().getTime();
                                var _showTime = _currentTime - pl.offLineTime;
                                if(_showTime < 0) _showTime = 0;
                                _timeNode.setString(MjClient.dateFormat(new Date(_showTime),"mm:ss"));
                            }
                            else
                            {
                                // cc.log("============111111============offLineTime = ");
                                _timeNode.setString("");
                            }
                        });
                    }
                }
            }
        }
    }

    // 灵石编龙需要选座新手引导
    //晋中所有麻将类玩法第一次进入添加
    var needHandGuide = function () {
/*        if(MjClient.gameType === MjClient.GAME_TYPE.LING_SHI_BIAN_LONG){
            return util.localStorageEncrypt.getBoolItem("isFirstEnter", true);
        }
        return false;*/
        return util.localStorageEncrypt.getBoolItem("isFirstEnter", true);
    };

    for(var i = 0;i < tData.maxPlayer;i++)
    {
        _btnDirArray[i] = _parentNode.getChildByName("Dir_" + i);

        var dirIdx = i;
        if(tData.maxPlayer == 3 && i > 0) dirIdx += 1;
        if(!_btnDirArray[i]) _btnDirArray[i] = new ccui.Button("playing/other/dir_" + dirIdx + ".png");
        _btnDirArray[i].setName("Dir_" + i);
        _btnDirArray[i].setPosition(_btnDirArray[i].getContentSize().width*_posFator[i][0],_btnDirArray[i].getContentSize().height*_posFator[i][1]);
        _rotationNode.addChild(_btnDirArray[i]);
        _btnDirArray[i].setTag(dirIdx);
        _btnDirArray[i].visible = true;
        _btnDirArray[i].addTouchEventListener(function(sender,type){
            if(type === 2){
                var pl = getUIPlayer(0);
                if(pl.dir >= 0)
                {
                    return MjClient.showToastbyPos("你已经选了座位了",0.2);
                }

                if (MjClient.CheckPlayerCount(function(pl){ return pl.dir == sender.getTag()}) == 0)
                {
                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                        cmd: "selectDir",
                        dir: sender.getTag()
                    },function(rtn){
                        if(rtn && rtn.result == -1){
                            MjClient.showToastbyPos("此座位已被占用",0.2);
                        }
                    });
                }
                else
                {
                    MjClient.showToast("此座位已被占用");
                }
            }
        },this);
    }
    setWgtLayout(_rotationNode,[1.2, 1.2], [0.5, 0.5], [0, 0]);

    for(var i = 0; i < _btnDirArray.length; i++){
        if(needHandGuide()){
            var handX = _btnDirArray[0].width + 15;
            var handY = _btnDirArray[0].height/2 - 20;
            cc.spriteFrameCache.addSpriteFrames("playing/gameTable/SelectSeat/shou0.plist","playing/gameTable/SelectSeat/shou0.png");
            ccs.armatureDataManager.addArmatureFileInfo("playing/gameTable/SelectSeat/shou.ExportJson");
            var _anim = new ccs.Armature("shou");
            _anim.setPosition(handX, handY);
            _anim.getAnimation().setSpeedScale(1);
            _anim.animation.play("Animation2");
            _anim.setTag(dirIdx);
            _anim.setVisible(false);
            _btnDirArray[i].addChild(_anim);
            _handAnimArray.push(_anim);
        }
    }

    UIEventBind(null, _parentNode, "waitReady", function (eD) {
        var _tData = MjClient.data.sData.tData;
        if(_tData.tState == TableState.waitJoin)
        {
            for(var i = 0;i < _btnDirArray.length;i++)
            {
                _btnDirArray[i].visible = true;
                getNode(i).getChildByName("head").visible = false;
            }

            if(_tData.maxPlayer == 3) getNode(3).getChildByName("head").visible = false;
        }
    });

    UIEventBind(null, _parentNode, "mjhand", function (eD) {
        if(_rotationNode) {
            _rotationNode.removeFromParent();
            _rotationNode = null;
        }

        resetPlayerHead_mj();

        //重新刷新中间的四个位置，东南西北
        if(COMMON_UI3D.is3DUI())
            setArrowFengDir(_parentNode.getChildByName("arrowbk3D"));
        else
            setArrowFengDir(_parentNode.getChildByName("arrowbk"));

        var _gps_btn = MjClient.playui._downNode.getParent().getChildByName("gps_btn");
        _gps_btn.visible = true;

    });

    UIEventBind(null, _parentNode, "moveHead", function (d) {
        if(_rotationNode) {
            _rotationNode.removeFromParent();
            _rotationNode = null;
        }
    });

    UIEventBind(null, _parentNode, "initSceneData", function (eD) {


        var _tData = MjClient.data.sData.tData;
        if(_tData.tState != TableState.waitJoin)
        {
            if(_rotationNode) {
                _rotationNode.removeFromParent();
                _rotationNode = null;
            }
        }


        if (_tData.roundNum != _tData.roundAll) return;

        if(_tData.tState == TableState.waitJoin) {

            var _gps_btn = MjClient.playui._downNode.getParent().getChildByName("gps_btn");
            _gps_btn.visible = false;

            for (var i = 0; i < _btnDirArray.length; i++) {
                getNode(i).getChildByName("head").visible = false;
                _btnDirArray[i].visible = true;
                var pl = getUIPlayer(i);
                if (_btnDirArray[i].getUserData() && pl) {
                    _btnDirArray[i].visible = false;             // 有人已经坐下
                } else {
                    if (_btnDirArray[i].getUserData()) {
                        _btnDirArray[i].getUserData().removeFromParent();
                        _btnDirArray[i].setUserData(null);
                    }
                    _btnDirArray[i]._uid = null;

                }
            }
            if (_tData.maxPlayer == 3) getNode(3).getChildByName("head").visible = false;
            if (_rotationNode.isRotated) return;


            if (needHandGuide()) {
                var _handAnimDataArr = [0, 0, 0, 0];
                for (var i = 0; i < _handAnimDataArr.length; i++) {
                    var pl = getUIPlayer(i);
                    if (pl && pl.dir > -1) {
                        _handAnimDataArr[pl.dir] = 1;
                    }
                }

                if(MjClient.MaxPlayerNum === 3 && _handAnimDataArr.length === 4){
                    _handAnimDataArr.splice(1, 1);
                }
                var pl = getUIPlayer(0);
                if(pl && pl.dir === -1) {
                    // 说明自己没有选座
                    for(var j = 0; j < _handAnimDataArr.length; j++){
                        if(_handAnimDataArr[j] === 0){
                            _handAnimArray[j].visible = true;
                            break;
                        }
                    }
                }
            }


            MjClient.AllPlayerRun(function(pl){
                if(pl.dir >= 0)
                {
                    var off =  getUiOffByUid(pl.info.uid);
                    senderSelectPos(off);
                    setOffLine(pl.info.uid);
                }
            });

            var myPl = getUIPlayer(0);
            if(myPl.dir < 0)
            {
                MjClient.showToastbyPos("请在10秒内选座哟，否则将会被系统踢出房间",0.2);
                arrowbkNumberUpdate(_timeText, function(){
                    cc.log("============改选座位了====== ");
                });
                _getRoomNumBtn.setVisible(false);
                _wxinviteBtn.setVisible(false);
            }

            _delroomBtn.setVisible(true);
            // 山西非创建房间的人不显示解散房间按钮
            if (isJinZhongAPPType() && !IsRoomCreator()) {
                _delroomBtn.setVisible(false);
            }
            _backHomeBtn.setVisible(true);

        }
    });

    UIEventBind(null, _parentNode, "selectDir_event", function (eD) {
        var  _dir = ["东","南","西","北"];
        var off =  getUiOffByUid(eD.uid);
        var pl = getUIPlayer(off);

        if(pl && pl.info.uid == eD.uid)
        {
            pl.dir = eD.dir;
            senderSelectPos(off);
            cc.log("================ 当前选择 = " + _dir[pl.dir]);
        }

        // 选座完成，选座手势隐藏
        for(var i = 0; i < _handAnimArray.length; i ++){
            _handAnimArray[i].visible = false;
        }


    });

    UIEventBind(null, _parentNode, "addPlayer", function (eD) {
        var _tData = MjClient.data.sData.tData;
        if(_tData.tState == TableState.waitJoin)
        {
            for(var i = 0;i < _btnDirArray.length;i++) getNode(i).getChildByName("head").visible = false;
            if(_tData.maxPlayer == 3) getNode(3).getChildByName("head").visible = false;
        }

    });

    UIEventBind(null, _parentNode, "removePlayer", function (eD) {
        var _tData = MjClient.data.sData.tData;
        if(_tData.tState == TableState.waitJoin)
        {
            for(var i = 0;i < _btnDirArray.length;i++) getNode(i).getChildByName("head").visible = false;
            if(_tData.maxPlayer == 3) getNode(3).getChildByName("head").visible = false;
            for(var i = 0;i < _btnDirArray.length;i++) {
                if(eD.uid == _btnDirArray[i]._uid)
                {
                    _btnDirArray[i]._uid = null;
                    _btnDirArray[i].setVisible(true);
                    if(_btnDirArray[i].getUserData())
                    {
                        _btnDirArray[i].getUserData().removeFromParent();
                        _btnDirArray[i].setUserData(null);
                    }
                    break;
                }
            }

        }
    });

    UIEventBind(null, _parentNode, "LeaveRoom", function (eD) {
        var _tData = MjClient.data.sData.tData;
        for(var i = 0;i < _btnDirArray.length;i++) getNode(i).getChildByName("head").visible = false;
        if(_tData.maxPlayer == 3) getNode(3).getChildByName("head").visible = false;
    });


    UIEventBind(null, _parentNode, "onlinePlayer", function (msg) {
        var _tData = MjClient.data.sData.tData;
        if(_tData.tState == TableState.waitJoin)
        {
            setOffLine(msg.uid);
        }

        if(_tData.tState != TableState.waitJoin)
        {
            if(_rotationNode) {
                _rotationNode.removeFromParent();
                _rotationNode = null;
            }
        }
    });

    UIEventBind(null, _parentNode, "playerStatusChange", function (msg) {
        var _tData = MjClient.data.sData.tData;
        if(_tData.tState == TableState.waitJoin)
        {
            if (sData) {
                for (var uid in sData.players) {
                    var pl = sData.players[uid];

                    if(msg.uids.indexOf(uid) >= 0)
                    {
                        if (pl.onLine) //如果当前是在线
                        {
                            if(!msg.status && msg.uids.indexOf(uid) >= 0) //改为离线状态时
                            {
                                if(!pl.offLineTime) pl.offLineTime = new Date().getTime();
                            }
                        }

                        pl.onLine = msg.status;
                        if(pl.onLine)
                        {
                            delete pl.offLineTime;
                        }
                    }

                    setOffLine(Number(uid));
                }
            }
        }
    });

}

// pos:1=在微信邀请下方 2=在微信邀请左边 3=在微信邀请右下角 4=在微信邀请右下角(比3左一些)
function addClubYaoqingBtn(pos) {
    var clubInfoTable = getClubInfoInTable();
    if (!MjClient.data || !MjClient.data.sData || !MjClient.data.sData.tData || !clubInfoTable || !MjClient.playui)
        return null;

    var waitNode = MjClient.playui._downNode.getParent().getChildByName("wait");
    if(waitNode){
        var wxinviteBtn = waitNode.getChildByName("wxinvite");
    }else{//字牌重构csd修改使用
        waitNode = MjClient.playui._downNode.getParent();
        var wxinviteBtn = MjClient.playui._downNode.getParent().getChildByName("btn_inviteFriend");
    }
    var clubYaoqingBtn = waitNode.getChildByName("clubYaoqingBtn");
    if (clubYaoqingBtn || !wxinviteBtn)
        return clubYaoqingBtn;

    clubYaoqingBtn = new ccui.Button();
    clubYaoqingBtn.loadTextureNormal("friendCards/yaoqing/btn_yaoqing_n.png");
    clubYaoqingBtn.loadTexturePressed("friendCards/yaoqing/btn_yaoqing_s.png");
    if (clubYaoqingBtn.width == 0)
        return;

    clubYaoqingBtn.setName("clubYaoqingBtn");
    clubYaoqingBtn.setVisible(false);
    waitNode.addChild(clubYaoqingBtn);
    clubYaoqingBtn.addTouchEventListener(function(sender, Type) {
        switch (Type) {
            case ccui.Widget.TOUCH_ENDED:
                var tData = MjClient.data.sData.tData;
                
                MjClient.Scene.addChild(new FriendCard_yaoqingMember(clubInfoTable.clubId, tData.tableid, unescape(clubInfoTable.clubTitle)));
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Yaoqingpaiyou", {uid:SelfUid(), gameType:MjClient.gameType});

                break;
            default:
                break;
        }
    }, this);

    clubYaoqingBtn.runAction(cc.repeatForever(cc.callFunc(function() {
        clubYaoqingBtn.setVisible(wxinviteBtn && wxinviteBtn.isVisible());
    })));

    var getRoomNumBtn = waitNode.getChildByName("getRoomNum");

    if (!pos) pos = 1;

    if (pos == 1) {     // 在微信邀请下方
        clubYaoqingBtn.setScale(wxinviteBtn.width * wxinviteBtn.scaleX / clubYaoqingBtn.width);
        clubYaoqingBtn.x = wxinviteBtn.x;
        clubYaoqingBtn.y = wxinviteBtn.y - wxinviteBtn.height * wxinviteBtn.scaleY * 1.1;

        if (getRoomNumBtn && Math.abs(getRoomNumBtn.x - wxinviteBtn.x) < 20 && getRoomNumBtn.y < wxinviteBtn.y) {
            getRoomNumBtn.y = clubYaoqingBtn.y - getRoomNumBtn.height * getRoomNumBtn.scaleY * 1.1;
            var y = getRoomNumBtn.y - getRoomNumBtn.height * getRoomNumBtn.scaleY / 2;
            if (y < 5) {
                getRoomNumBtn.y += 5 - y;
                clubYaoqingBtn.y += 5 - y;
                wxinviteBtn.y += 5 - y;
            }
        }
    } else if (pos == 2) {  // 在微信邀请左边
        clubYaoqingBtn.setScale(wxinviteBtn.height * wxinviteBtn.scaleY / clubYaoqingBtn.height);
        wxinviteBtn.x += wxinviteBtn.width * wxinviteBtn.scaleX * 0.55;
        clubYaoqingBtn.x = wxinviteBtn.x - clubYaoqingBtn.width * clubYaoqingBtn.scaleX * 1.1;
        clubYaoqingBtn.y = wxinviteBtn.y;
    } else if (pos == 3) {  // 在微信邀请右下角
        clubYaoqingBtn.setScale(wxinviteBtn.height * wxinviteBtn.scaleY / clubYaoqingBtn.height);
        clubYaoqingBtn.x = wxinviteBtn.x + clubYaoqingBtn.width * clubYaoqingBtn.scaleX * 1.4;
        clubYaoqingBtn.y = wxinviteBtn.y - clubYaoqingBtn.height * clubYaoqingBtn.scaleY * 1.9;
    } else if (pos == 4) {  // 在微信邀请右下角
        clubYaoqingBtn.setScale(wxinviteBtn.height * wxinviteBtn.scaleY / clubYaoqingBtn.height);
        clubYaoqingBtn.x = wxinviteBtn.x + clubYaoqingBtn.width * clubYaoqingBtn.scaleX * 0.4;
        clubYaoqingBtn.y = wxinviteBtn.y - clubYaoqingBtn.height * clubYaoqingBtn.scaleY * 1.9;
    }else if (pos == 5){ //邵阳字牌玩法
        clubYaoqingBtn.loadTextureNormal("friendCards/yaoqing/sy_btn_yaoqing_n.png");
        clubYaoqingBtn.loadTexturePressed("friendCards/yaoqing/sy_btn_yaoqing_s.png");
        setWgtLayout(clubYaoqingBtn, [219/1280, 0],[0.5, 0.12],[0, 0]);
        setWgtLayout(wxinviteBtn, [219/1280, 0],[0.697, 0.12],[0, 0]);
        var backHomebtn = waitNode.getChildByName("backHomebtn");
        setWgtLayout(backHomebtn, [219/1280, 0],[0.30, 0.12],[0, 0]);
    }

    // 江苏，淮安 邀请牌友位置重设
    if (MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ ||
        MjClient.getAppType() === MjClient.APP_TYPE.QXHAMJ) {
        setWgtLayout(clubYaoqingBtn, [0.18, 0.18],[0.5, 0.12],[0, 0]);
    }


    return clubYaoqingBtn;
}

//获得app所有游戏
getAllGameListArray = function()
{
    var all = {};
    all._gameTypeList = [];
    all._allGameListArray = [];
    all._btnPosArray = [];
    all._btnPicArray = [];

    var isGetGameList = false;
    if(isJinZhongAPPType())
    {
        all._btnPosArray = [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6]];
        all._btnPicArray = ["all","jinzhong","lvliang","linfen","xinzhou","datong","yuncheng"];
        all._btnNameArray = ["通用", "晋中市", "吕梁市", "临汾市", "忻州市", "大同市", "运城市"];
        all._allGameListArray = [MjClient.gameListConfig.majiangList,
            MjClient.gameListConfig.jinZhongList,
            MjClient.gameListConfig.lvLiangList,
            MjClient.gameListConfig.linFenList,
            MjClient.gameListConfig.xinZhouList,
            MjClient.gameListConfig.daTongList,
            MjClient.gameListConfig.yunChengList];

    }else if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {

        all._btnPosArray = [[0,0],[1,1],[2,2]];
        all._btnPicArray = ["majiang","poker","zipai"];

        cc.log("MjClient.gameListConfig.pokerList = ",MjClient.gameListConfig.pokerList);

        all._allGameListArray = [MjClient.gameListConfig.majiangList, MjClient.gameListConfig.pokerList, MjClient.gameListConfig.zipaiList];
    }else if(MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {

        all._btnPosArray = [[0,0],[1,1]];
        all._btnPicArray = ["majiang","poker"];

        all._allGameListArray = [MjClient.gameListConfig.majiangList, MjClient.gameListConfig.pokerList];
    }else if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ)
    {
        all._gameTypeList[0] = MjClient.gameListConfig.majiangList;
        if (MjClient.gameListConfig.paodekuaiList){
            all._gameTypeList[1] = MjClient.gameListConfig.paodekuaiList;
        }else{
            all._gameTypeList[1] = [];
        }
        isGetGameList = true;
    }
    else
    {
        all._gameTypeList[0] = MjClient.gameListConfig.majiangList;
        all._gameTypeList[1] = [];
        isGetGameList = true;
    }

    cc.log('MjClient.gameListConfig.majiangList : '+ MjClient.gameListConfig.majiangList);
    cc.log('MjClient.getAppType(): '+ MjClient.getAppType());

    if(all._allGameListArray && all._allGameListArray.length > 0)
    {
        for(var i = 0;i <  all._allGameListArray.length ; i++)
        {
            cc.log('this._allGameListArray------:'+ all._allGameListArray[i]);
            all._gameTypeList[i] = all._allGameListArray[i];
        }
    }
    else if(!isGetGameList)
    {
        if(MjClient.gameListConfig.majiangList)
            all._gameTypeList[0].concat(MjClient.gameListConfig.majiangList);
        if(MjClient.gameListConfig.paohuziList)
            all._gameTypeList[0].concat(MjClient.gameListConfig.paohuziList);
        all._gameTypeList[1] = [];
    }


    cc.log('this._gameTypeList------:'+all._gameTypeList);


    // 审核时特殊游戏列表：
    if(MjClient.isAroundBeijing() || MjClient.isShenhe)
    {
        if (MjClient.APP_TYPE.QXNTQP == MjClient.getAppType())
            all._gameTypeList[0] = [MjClient.GAME_TYPE.RU_GAO];
        else
            all._gameTypeList[0] = [all._gameTypeList[0][0]];
        all._gameTypeList[1] = [];
    }

    cc.log("=========================all == " + JSON.stringify(all));
    return all;
}



/***
 * 获取图片的真实尺寸    —— by Tom
 * @param path 图片的路径
 * @returns {{w: 宽, h: 高}}
 */
getImageRealSize = function(path){
    if(!path) return;
    var tempImage = new ccui.ImageView(path);
    var realWidth = tempImage.width;
    var realHeight = tempImage.height;
    delete tempImage;
    return {w:realWidth || 246, h:realHeight || 89};
};


/***
 * 设置房间内聊天按钮的状态  by Tom
 * @constructor
 */
MJ_setChatBtn = function()
{
    var _parentNode = MjClient.playui._downNode.getParent();
    var _chatBtn = _parentNode.getChildByName("chat_btn");
    _chatBtn.visible = false;


    UIEventBind(null, _chatBtn, "moveHead", function () {
        _chatBtn.visible = true;
    });


    UIEventBind(null, _chatBtn, "initSceneData", function () {
        var tData = MjClient.data.sData.tData;
        if(tData.tState == TableState.waitJoin || tData.tState == TableState.waitReady || tData.tState == TableState.roundFinish)
        {
            _chatBtn.visible = false;
        }
        else
        {
            _chatBtn.visible = true;
        }
    });
};

/*
 江苏的麻将wait状态 的四个按钮  by sking 2018.2.27
 用法参考，牌友联盟江苏app的麻将玩法

 posAndSizeArr：返回大厅按钮自定义尺寸位置信息
 posAndSizeArrX：返回大厅按钮自定义iPhoneX尺寸位置信息
 不传则用默认信息
 */
MJ_setWaitBtn = function(needAdjust, posAndSizeArr, posAndSizeArrX)
{
    var _parentNode = MjClient.playui._downNode.getParent();
    var _waitNode = _parentNode.getChildByName("wait");
    _waitNode.visible = true;
    _waitNode.zIndex = 100;

    // 俱乐部返回大厅功能：by_jcw
    addClub_BackHallBtn(needAdjust, posAndSizeArr, posAndSizeArrX);

    var _getRoomNumBtn = _waitNode.getChildByName("getRoomNum");
    var tempSize = getImageRealSize("playing/gameTable/yaoqing_06.png");   //获取大按钮的真实尺寸
    _getRoomNumBtn.setContentSize(tempSize.w, tempSize.h);
    _getRoomNumBtn.visible = !MjClient.remoteCfg.guestLogin;
    setWgtLayout(_getRoomNumBtn, [0.18, 0.18],[0.85, 0.16],[0, 0]);
    if(isIPad()) setWgtLayout(_getRoomNumBtn, [0.18, 0.18],[0.85, 0.09],[0, 0]);
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
        setWgtLayout(_getRoomNumBtn, [0.18, 0.18],[0.75, 0.12],[0, 0]);
    }
    _getRoomNumBtn.addTouchEventListener(function(sender,type){
        if(type === 2) {
            getPlayingRoomInfo(1);
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fuzhifangjianxinxi", {uid:SelfUid(), gameType:MjClient.gameType});
        } //复制房间号
    },this);

    var _wxinviteBtn = _waitNode.getChildByName("wxinvite");
    _wxinviteBtn.visible = !MjClient.remoteCfg.guestLogin;
    _wxinviteBtn.setContentSize(tempSize.w, tempSize.h);
    setWgtLayout(_wxinviteBtn, [0.18, 0.18],[0.85, 0.33],[0, 0]);
    if(isIPad()) setWgtLayout(_wxinviteBtn, [0.18, 0.18],[0.85, 0.2],[0, 0]);
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
        setWgtLayout(_wxinviteBtn, [0.18, 0.18],[0.25, 0.12],[0, 0]);
    }
    _wxinviteBtn.addTouchEventListener(function(sender,type){
        if(type === 2) {
            getPlayingRoomInfo(2);
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Yaoqingweixinhaoyou", {uid:SelfUid(), gameType:MjClient.gameType});
        } //邀请
    },this);

    var _delroomBtn = _waitNode.getChildByName("delroom");
    var tempSize = getImageRealSize("playing/gameTable/yaoqing_13.png");   //获取小按钮的真实尺寸
    _delroomBtn.zIndex = 500;
    _delroomBtn.setTouchEnabled(true);
    if (!needAdjust)
    {
        _delroomBtn.setContentSize(tempSize.w, tempSize.h);
        setWgtLayout(_delroomBtn, [0.11, 0.11],[0.05, 0.45],[0, 0]);
    }
    // 山西南通海安非创建房间的人不显示解散房间按钮
    if((isJinZhongAPPType()
        || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ
        || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP)
        && !IsRoomCreator())
    {
        _delroomBtn.visible = false;
    }
    _delroomBtn.addTouchEventListener(function(sender,type){
        if(type === 2) {
            if (IsRoomCreator()) {
                MjClient.delRoom(true); //解散房间
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Jiesanfangjian", {uid:SelfUid(), gameType:MjClient.gameType});
            } else {
                MjClient.showMsg("确定要退出房间吗？",
                    function () {
                        MjClient.leaveGame();
                        MjClient.native.umengEvent4CountWithProperty("LikaifangjianClick", {uid:SelfUid(), gameType:MjClient.gameType});
                    },
                    function () {
                    });
            }
        }
    },this);
    UIEventBind(null, _delroomBtn, "waitReady", function (eD) {
        UIEventBind(null, _delroomBtn, "waitReady", function (eD) {
            _delroomBtn.visible = true;
            // 山西南通海安非创建房间的人不显示解散房间按钮
            if((isJinZhongAPPType()
                || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ
                || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP)
                && !IsRoomCreator())
            {
                _delroomBtn.visible = false;
            }
        });
    });

    var _backHomeBtn = _waitNode.getChildByName("backHomebtn");
    _backHomeBtn.zIndex = 500;
    _backHomeBtn.setTouchEnabled(true);
    if (!needAdjust)
    {
        _backHomeBtn.setContentSize(tempSize.w, tempSize.h);
        setWgtLayout(_backHomeBtn, [0.11, 0.11],[0.05, 0.6],[0, 0]);
    }
    _backHomeBtn.addTouchEventListener(function(sender,type){
        if(type === 2) {
            var sData = MjClient.data.sData;
            cc.log("---------_backHomeBtn----------");
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Likaifangjian", {uid:SelfUid(), gameType:MjClient.gameType});

            if (sData) {
                if (IsRoomCreator()) {
                    MjClient.showMsg("返回大厅房间仍然保留\n赶快去邀请好友吧",
                        function() {
                            MjClient.leaveGame();
                            MjClient.native.umengEvent4CountWithProperty("LikaifangjianClick", {uid:SelfUid(), gameType:MjClient.gameType});
                        },
                        function() {});
                } else {
                    MjClient.showMsg("确定要退出房间吗？",
                        function() {
                            MjClient.leaveGame();
                            MjClient.native.umengEvent4CountWithProperty("LikaifangjianClick", {uid:SelfUid(), gameType:MjClient.gameType});
                        },
                        function() {});
                }
            }
        }
    },this);

    if(isIPhoneX() && !needAdjust)
    {
        setWgtLayout(_delroomBtn, [0.11, 0.11],[0.1, 0.45],[0, 0]);
        setWgtLayout(_backHomeBtn, [0.11, 0.11],[0.1, 0.6],[0, 0]);
    }

    UIEventBind(null, _backHomeBtn, "returnPlayerLayer", function (eD) {
        MjClient.playui.visible = true;
    });

    UIEventBind(null, _backHomeBtn, "initSceneData", function (eD) {
        //_delroomBtn.visible = IsInviteVisible();

        var isWaitReady = (eD.tData.tState == TableState.waitReady || eD.tData.tState == TableState.waitJoin);

        cc.log("===================initSceneData=isWaitReady = " + isWaitReady);
        if((MjClient.getAppType()==MjClient.APP_TYPE.TXJINZHONGMJ|| MjClient.getAppType()==MjClient.APP_TYPE.DQSHANXIMJ) && 
            (MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN) &&
            !(!MjClient.data || !MjClient.data.sData || !MjClient.data.sData.tData || !getClubInfoInTable() || !MjClient.playui))
            _getRoomNumBtn.visible = false;
        else
            _getRoomNumBtn.visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
        _wxinviteBtn.visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
        _delroomBtn.visible = IsInviteVisible() || isWaitReady;
        // 山西南通海安非创建房间的人不显示解散房间按钮
        if((isJinZhongAPPType()
            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ
            || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP)
            && !IsRoomCreator())
        {
            _delroomBtn.setVisible(false);
        }
        _backHomeBtn.visible = IsInviteVisible() || isWaitReady;

        var _playerCount = Object.keys(MjClient.data.sData.players).length;
        var _needCount = MjClient.data.sData.tData.maxPlayer - _playerCount;
        //if(_needCount == 1)
        {
            if(!_wxinviteBtn.getChildByName("bubleText")) {
                var _bubbleText = new ccui.ImageView("playing/other/qipao_kaizhuo.png");
                _bubbleText.setAnchorPoint(0.98, 0.2);
                _bubbleText.setName("bubleText");
                _bubbleText.setPosition(cc.p(_wxinviteBtn.getContentSize().width*0,_wxinviteBtn.getContentSize().height*0.6));
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                    _bubbleText.loadTexture("playing/other/qipao_kaizhuo1.png");
                    _bubbleText.setAnchorPoint(0.5, 0);
                    _bubbleText.setPosition(cc.p(_wxinviteBtn.getContentSize().width/2, _wxinviteBtn.getContentSize().height));
                    var text = new ccui.Text();
                    text.setFontName("fonts/lanting.TTF");
                    text.setString("邀请好友马上开桌");
                    text.setColor(cc.color("#343535"));
                    text.setFontSize(26);
                    text.setAnchorPoint(0.5, 0.5);
                    text.setPosition(cc.p(_bubbleText.getContentSize().width/2, _bubbleText.getContentSize().height/2 + 10));
                    _bubbleText.addChild(text);
                }
                _wxinviteBtn.addChild(_bubbleText);
                var _seq = cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.3, 1)).repeatForever();
                _bubbleText.runAction(_seq);
            }
        }

        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("playing/gameTable/yaoqing_09.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        _wxinviteBtn.addChild(clipper);
        var sprite = new cc.Sprite("playing/other/saoguang.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction);//进行向右移动的重复动作

    });

    UIEventBind(null, _backHomeBtn, "addPlayer", function (eD) {
        if (isJinZhongAPPType() && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG)
        {
            return;
        }

        //_delroomBtn.visible = IsInviteVisible();

        var _playerCount = Object.keys(MjClient.data.sData.players).length;
        var _needCount = MjClient.data.sData.tData.maxPlayer - _playerCount;
        //if(_needCount == 1)
        {
            if(!_wxinviteBtn.getChildByName("bubleText")) {
                var _bubbleText = new ccui.ImageView("playing/other/qipao_kaizhuo.png");
                _bubbleText.setAnchorPoint(0.9, 0.2);
                _bubbleText.setName("bubleText");
                _bubbleText.setPosition(cc.p(_wxinviteBtn.getContentSize().width*0,_wxinviteBtn.getContentSize().height*0.6));
                _wxinviteBtn.addChild(_bubbleText);
                var _seq = cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.3, 1)).repeatForever();
                _bubbleText.runAction(_seq);
            }
        }

        var isWaitReady = eD.tData.tState == TableState.waitReady || TableState.waitJoin == eD.tData.tState ;
        cc.log(">>>>>> play add player >>>>isWaitReady = " + eD.tData.tState);
        if((MjClient.getAppType()==MjClient.APP_TYPE.TXJINZHONGMJ|| MjClient.getAppType()==MjClient.APP_TYPE.DQSHANXIMJ) && 
            (MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN) &&
            !(!MjClient.data || !MjClient.data.sData || !MjClient.data.sData.tData || !getClubInfoInTable() || !MjClient.playui))
            _getRoomNumBtn.visible = false;
        else
            _getRoomNumBtn.visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
        _wxinviteBtn.visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
        _delroomBtn.visible = IsInviteVisible() || isWaitReady;
        // 山西非创建房间的人不显示解散房间按钮
        if (isJinZhongAPPType() && !IsRoomCreator()) {
            _delroomBtn.setVisible(false);
        }
        _backHomeBtn.visible = IsInviteVisible() || isWaitReady;
    });

    UIEventBind(null, _backHomeBtn, "removePlayer", function (eD) {

        var isWaitReady = eD.tData.tState == TableState.waitReady;
        if((MjClient.getAppType()==MjClient.APP_TYPE.TXJINZHONGMJ|| MjClient.getAppType()==MjClient.APP_TYPE.DQSHANXIMJ) && 
            (MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN) &&
            !(!MjClient.data || !MjClient.data.sData || !MjClient.data.sData.tData || !getClubInfoInTable() || !MjClient.playui))
            _getRoomNumBtn.visible = false;
        else
            _getRoomNumBtn.visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
        _wxinviteBtn.visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
        _delroomBtn.visible = IsInviteVisible() || isWaitReady;
        // 山西非创建房间的人不显示解散房间按钮
        if (isJinZhongAPPType() && !IsRoomCreator()) {
            _delroomBtn.setVisible(false);
        }
        _backHomeBtn.visible = IsInviteVisible() || isWaitReady;

        var _playerCount = Object.keys(MjClient.data.sData.players).length;
        var _needCount = MjClient.data.sData.tData.maxPlayer - _playerCount;
        //if(_needCount == 1)
        {
            if(!_wxinviteBtn.getChildByName("bubleText")) {
                var _bubbleText = new ccui.ImageView("playing/other/qipao_kaizhuo.png");
                _bubbleText.setAnchorPoint(0.9, 0.2);
                _bubbleText.setName("bubleText");
                _bubbleText.setPosition(cc.p(_wxinviteBtn.getContentSize().width*0.1,_wxinviteBtn.getContentSize().height*0.85));
                _wxinviteBtn.addChild(_bubbleText);
                var _seq = cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.3, 1)).repeatForever();
                _bubbleText.runAction(_seq);
            }
        }
        // else
        // {
        //     if(_wxinviteBtn.getChildByName("bubleText"))
        //     {
        //         _wxinviteBtn.removeChildByName("bubleText");
        //     }
        // }
    });

    UIEventBind(null, _backHomeBtn, "waitJiazhu", function (eD) {
        _getRoomNumBtn.visible = false;
        _wxinviteBtn.visible = false;
        _delroomBtn.visible = false;
        _backHomeBtn.visible = false;
    });


    UIEventBind(null, _backHomeBtn, "moveHead", function (eD) {
        _getRoomNumBtn.visible = false;
        _wxinviteBtn.visible = false;
        _delroomBtn.visible = false;
        _backHomeBtn.visible = false;
    });

    UIEventBind(null, _backHomeBtn, "waitReady", function (eD) {
        _delroomBtn.visible = true;
        // 山西非创建房间的人不显示解散房间按钮
        if (isJinZhongAPPType() && !IsRoomCreator()) {
            _delroomBtn.setVisible(false);
        }
        _backHomeBtn.visible = true;
    });

    UIEventBind(null, _backHomeBtn, "onlinePlayer", function (eD) {
        if( IsAllPlayerReadyState() ) {
            _delroomBtn.visible = false;
            _backHomeBtn.visible = false;
        }
    });
}

/*
 // 俱乐部返回大厅功能：by_jcw
 *** posAndSizeArr: 适配尺寸
 *** posAndSizeArrX: IPhoneX适配
 如果传字符串的话, 第一个参数为参照物体的位置,第二个为上中下,第三个为和参照物之间的间距物体.
 */
addClub_BackHallBtn = function(needAdjust, posAndSizeArr, posAndSizeArrX, Texture)
{
    var _parentNode = MjClient.playui._downNode.getParent();
    var _waitNode = _parentNode.getChildByName("wait");
    if(_waitNode){
        _waitNode.visible = true;
        _waitNode.zIndex = 100;
    }else{//字牌重构csd修改使用
        _waitNode = _parentNode;
    }
    // 俱乐部返回大厅功能：by_jcw
    // 俱乐部，新增一个“返回大厅”按钮
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ
        || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP
        || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ
        || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
        || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ
        || isJinZhongAPPType()
        || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ
        || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ
        || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
        if (MjClient.data.sData && MjClient.data.sData.tData && getClubInfoInTable()) {
            var _backHallBtn = new ccui.Button();
            _backHallBtn.setName("backhallbtn");
            var btnTexture = Texture? Texture:"playing/gameTable/fanhuidating_btn.png";
            _backHallBtn.loadTextureNormal(btnTexture);
            if (MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ ||
                MjClient.getAppType() === MjClient.APP_TYPE.QXHAMJ) {
                _backHallBtn.loadTexturePressed("playing/gameTable/fanhuidating_btn_s.png");
            }
            var isSetPos = false;
            if(typeof(needAdjust) == "string")
            {
                isSetPos = addClub_BackHallBtnPos(_backHallBtn,needAdjust,posAndSizeArr,posAndSizeArrX)
            }
            if(!isSetPos)
            {
                _waitNode.addChild(_backHallBtn);
                if (!needAdjust) {
                    if (isIPhoneX()) {
                        setWgtLayout(_backHallBtn, [0.11, 0.11], [0.1, 0.75], [0, 0]);
                    } else {
                        setWgtLayout(_backHallBtn, [0.11, 0.11], [0.05, 0.75], [0, 0]);
                    }
                } else if (posAndSizeArrX && posAndSizeArrX[0]&& isIPhoneX()) {
                    setWgtLayout(_backHallBtn, posAndSizeArrX[0], posAndSizeArrX[1], posAndSizeArrX[2]);
                } else if (posAndSizeArr && posAndSizeArr[0]) {
                    setWgtLayout(_backHallBtn, posAndSizeArr[0], posAndSizeArr[1], posAndSizeArr[2]);
                } else {
                    if (isIPhoneX()) {
                        setWgtLayout(_backHallBtn, [0.12, 0.12], [0.67,0.92], [0,0]);
                    } else {
                        setWgtLayout(_backHallBtn, [0.115, 0.115], [0.67,0.93], [0,0]);
                    }
                }
            }


            //淮安单独设适配
            if(MjClient.getAppType() === MjClient.APP_TYPE.QXHAMJ) {
                setWgtLayout(_backHallBtn, [0.12, 0.12], [0.05, 0.75], [0, 0]);
                if(isIPhoneX()) setWgtLayout(_backHallBtn, [0.12, 0.12], [0.1, 0.75], [0, 0]);
            }


            _backHallBtn.addTouchEventListener(function(sender,type){
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fanhuidating", {uid:SelfUid(), gameType:MjClient.gameType});
                // 选座：未选座放回大厅直接离开房间
                if (MjClient.data.sData.tData.areaSelectMode["xuanzuo"] && isJinZhongAPPType() && parseInt(MjClient.data.sData.tData.maxPlayer) > 2) {
                    var pl = getUIPlayer(0);
                    if (pl.dir < 0) {
                        MjClient.leaveGame();
                        return;
                    }
                }

                var sData = MjClient.data.sData;
                if(type === 2 && sData) {
                    onClickBackHallBtn();
                }
            },this);

            UIEventBind(null, _backHallBtn, "initSceneData", function (eD) {
                if (_backHallBtn) {
                    _backHallBtn.visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
                }
            });

            UIEventBind(null, _backHallBtn, "addPlayer", function (eD) {
                if (_backHallBtn) {
                    _backHallBtn.visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
                }
            });

            UIEventBind(null, _backHallBtn, "removePlayer", function (eD) {
                if (_backHallBtn) {
                    _backHallBtn.visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
                }
            });

            UIEventBind(null, _backHallBtn, "waitJiazhu", function (eD) {
                if (_backHallBtn) {
                    _backHallBtn.visible = false;
                }
            });


            UIEventBind(null, _backHallBtn, "moveHead", function (eD) {
                if (_backHallBtn) {
                    _backHallBtn.visible = false;
                }
            });

            UIEventBind(null, _backHallBtn, "waitReady", function (eD) {
                if (_backHallBtn) {
                    _backHallBtn.visible = false;
                }
            });

            UIEventBind(null, _backHallBtn, "onlinePlayer", function (eD) {
                if( IsAllPlayerReadyState() ) {
                    if (_backHallBtn) {
                        _backHallBtn.visible = false;
                    }
                }
            });
        }
    }
}


addClub_BackHallBtnPos  = function(_backHallBtn,_widp,_pos,_comWidp)
{
    var widp = _widp;
    var comWidp = _comWidp;
    var pos = _pos;
    var _parentNode = MjClient.playui._downNode.getParent();
    var _waitNode = _parentNode.getChildByName("wait");
    var _banner = _parentNode.getChildByName("banner");
    var _banner2 = _parentNode.getChildByName("banner2");
    //MjClient.playui._downNode.getParent().getChildByName("gps_btn")
    if(_parentNode.getChildByName(widp))
    {
        widp = _parentNode.getChildByName(widp)
    }
    else if (_banner &&_banner.getChildByName(widp))
    {
        widp = _banner.getChildByName(widp)
    }
    else if(_waitNode && _waitNode.getChildByName(widp))
    {
        widp = _waitNode.getChildByName(widp)
    }
    else if(_banner2 && _banner2.getChildByName(widp))
    {
        widp = _banner2.getChildByName(widp)
    }

    if(_parentNode.getChildByName(comWidp))
    {
        comWidp = _parentNode.getChildByName(comWidp)
    }
    else if (_banner && _banner.getChildByName(comWidp))
    {
        comWidp = _banner.getChildByName(comWidp)
    }
    else if(_waitNode && _waitNode.getChildByName(comWidp))
    {
        comWidp = _waitNode.getChildByName(comWidp)
    }
    else if(_banner2 && _banner2.getChildByName(comWidp))
    {
        comWidp = _banner2.getChildByName(comWidp)
    }

    if(typeof(widp) == "string" || typeof(widp) == "comWidp") return false;

    widp.getParent().addChild(_backHallBtn);
    if(pos == "down")
    {
        _backHallBtn.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function(){
            if(!_backHallBtn.curScale)
            {
                _backHallBtn.curScale = widp.width *  widp.scale/_backHallBtn.width
            }
            _backHallBtn.scale = _backHallBtn.curScale;
            _backHallBtn.setPosition(cc.p(widp.x,widp.y - (comWidp.y - widp.y)));
        })))
    }
    else if(pos == "left")
    {
        _backHallBtn.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function(){
            if(!_backHallBtn.curScale)
            {
                _backHallBtn.curScale = widp.height *  widp.scale/_backHallBtn.height
            }
            _backHallBtn.scale = _backHallBtn.curScale;
            _backHallBtn.setPosition(cc.p(widp.x - (comWidp.x -widp.x),widp.y));
        })))
    }
    else if(pos == "rigth")
    {
        _backHallBtn.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function(){
            if(!_backHallBtn.curScale)
            {
                _backHallBtn.curScale = widp.height *  widp.scale/_backHallBtn.height
            }
            _backHallBtn.scale = _backHallBtn.curScale;
            _backHallBtn.setPosition(cc.p(widp.x + (widp.x - comWidp.x),widp.y));
        })))
    }
    return true
}


/*
 // 俱乐部返回大厅功能按钮点击事件：by_jcw
 */
onClickBackHallBtn = function()
{
    var sData = MjClient.data.sData;
    if(!sData) return;

    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fanhuidating", {uid:SelfUid(), gameType:MjClient.gameType});
    
    var clubInfoTable = getClubInfoInTable();

    if (cc.sys.isObjectValid(MjClient.gemewaitingui)) {
        MjClient.gemewaitingui.removeFromParent();
        delete MjClient.gemewaitingui;
    }
    if (cc.sys.isObjectValid(MjClient.goldMatchingui)) {
        MjClient.goldMatchingui.removeFromParent();
        delete MjClient.goldMatchingui;
    }

    MjClient.native.doCopyToPasteBoard(""); //清空剪切板

    //联盟后，原亲友圈可选择隐藏,隐藏后进入联盟
    if(clubInfoTable && MjClient._canNotBackToHallClubIds && 
        MjClient._canNotBackToHallClubIds.indexOf(clubInfoTable.clubId) > -1){
        var index = MjClient._canNotBackToHallClubIds.indexOf(clubInfoTable.clubId);
        MjClient.delRoom(true);
        return;
    }

    MjClient.block();
    if (clubInfoTable) {
        if (!MjClient.FriendCard_main_ui)
            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));

        var _btn_join = null;
        if (MjClient.FriendCard_main_ui._image_bottom.getChildByName("btnList2")) {
            _btn_join = MjClient.FriendCard_main_ui._image_bottom.getChildByName("btnList2").getChildByName("btn_join");
        }
        if ( !_btn_join && MjClient.FriendCard_main_ui._image_bottom.getChildByName("btnList")) {
            _btn_join = MjClient.FriendCard_main_ui._image_bottom.getChildByName("btnList").getChildByName("btn_join");
        }

        if (_btn_join) {
            _btn_join.loadTextureNormal("friendCards/btnbackroom2_n.png");
            if(FriendCard_Common.getSkinType() != 4){
                _btn_join.loadTexturePressed("friendCards/btnbackroom2_s.png");
            }
            _btn_join.textureType = "返回房间";
        }
    }
    // delete MjClient.data.sData;
    // delete MjClient.gameType;
    postEvent("LeaveGame");

    // add by cyc
    if (!MjClient.Scene.getActionByTag(20181023)) {
        var tickAction = cc.repeatForever(cc.sequence(cc.callFunc(function() {
            if (MjClient.playui || !MjClient.data || !MjClient.data.sData)
                MjClient.Scene.stopActionByTag(20181023);
            else if (MjClient.game_on_show)
                MjClient.tickGame(0);
        }), cc.delayTime(7)));
        tickAction.setTag(20181023);
        MjClient.Scene.runAction(tickAction);
    }

    MjClient.unblock();
}

/**create by Lms
 * @DateTime:     2018-03-28
 * @Description: 三个参数 1 文字图片的路径   2 是否需要刷新金币 3 本次刷新增加几个金币
 */

var boxActionLayer = cc.Layer.extend({

    ctor:function (wirtePath,isMoney,haveMoney) { //
        this._super();
        var UI = ccs.load("boxAction.json");
        this.addChild(UI.node);
        this._closeCallback = null;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0], true);

        if (MjClient.homeui && isMoney) {
            if (haveMoney) {
                var number = MjClient.homeui._moneyShow.getString() - haveMoney;
                MjClient.homeui._moneyShow.setString(number +"");
            }else{
                MjClient.homeui._moneyShow.setString("0");
            }

        }
        var close = _back.getChildByName("btn_ok");
        close.addTouchEventListener(function(sender,type){
            if (type ==2 ) {
                if (this._closeCallback)
                {
                    this._closeCallback();
                }
                // updateInfo
                if (isMoney) {
                    postEvent("updateInfo");
                }

                this.removeFromParent();
            }

        },this)

        var text_sp = new cc.Sprite(wirtePath);
        var pos_x = close.getPositionX();
        var pos_y = close.getPositionY() + 100;
        text_sp.setPosition(cc.p(pos_x,pos_y));
        _back.addChild(text_sp);

        cc.log(" ============== boxAction boxAction =====");
        cc.spriteFrameCache.addSpriteFrames("playing/other/BoxAction.plist","playing/other/BoxAction.png");
        var _frames = [];
        var prefix = "box_";
        var fc = cc.spriteFrameCache;
        for (var i = 1; i <= 4; i++) {
            var name = prefix + i + ".png";
            var f = fc.getSpriteFrame(name);
            if(f)
            {
                _frames.push(f);
            }
        }

        var _sprite = cc.Sprite();
        var _animate = cc.animate(new cc.Animation(_frames, 0.2, 1));
        _sprite.runAction(_animate);
        _sprite.initWithSpriteFrame(_frames[0]);
        var _node = _back.getChildByName("node_1");
        _node.addChild(_sprite,9999);



        return true;
    },
    setCloseCallback:function(callback)
    {
        this._closeCallback = callback;
    },


});

//iphone x 作特殊适配
isIPhoneX = function()
{
    var fator = 2960/1440;
    var currentFator = cc.winSize.width/cc.winSize.height;
    if(currentFator >= fator)
    {
        cc.log("==============iphone x ===========");
        return true;
    }
    return false;
}

//ipad 作特殊适配
isIPad = function()
{
    var fator = 2048/1536;

    var currentFator = cc.winSize.width/cc.winSize.height;
    if(currentFator <= fator)
    {
        cc.log("==============isIPad ===========");
        return true;
    }
    return false;
}


/*
 游戏场景ctor里调用，需要公共初始化的功能 by sking 2018.4.23
 */
initSceneFunc = function(needAdjust, posAndSizeArr, posAndSizeArrX)
{
    /* 等待玩家加入时候：复制房间号，微信邀请，解散，退出按钮*/
    MJ_setWaitBtn(needAdjust, posAndSizeArr, posAndSizeArrX);

    /* 设置房间内聊天按钮的状态 */
    MJ_setChatBtn();

    /* 准备按钮的初始化*/
    MJ_setReadyBtn();

    if(isNeedSetTingBtn())
    {
        COMMON_UI.showTingCardsBtn();
    }

    /* 麻将起手听牌*/
    COMMON_UI.showStartHandTingCards();

    /* 可胡的情况下，点击吃碰杠，弹出过胡操作(湘阴推倒胡，长沙麻将有开杠操作，在自己玩法中单独处理)*/
    if(MjClient.gameType !== MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
        && MjClient.gameType !== MjClient.GAME_TYPE.CHANG_SHA
        && MjClient.gameType !== MjClient.GAME_TYPE.CHANG_SHA_ER_REN
        && MjClient.gameType !== MjClient.GAME_TYPE.YI_YANG_MA_JIANG
        && MjClient.gameType !== MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO
        && MjClient.gameType !== MjClient.GAME_TYPE.NING_XIANG_MJ
        && MjClient.gameType !== MjClient.GAME_TYPE.XIANG_SHUI_MJ)
    {
        MJChiPengGangWhenHu();
    }

    /* 3,4 人选座的功能 */
    if(isJinZhongAPPType()) //金币场不选座
    {
        if (GameClass[MjClient.gameType] === MjClient.GAME_CLASS.MA_JIANG && !MjClient.data.sData.tData.fieldId)
        {
            if(MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_KD) //选座添加开房选项
            {
                if(MjClient.data.sData.tData.areaSelectMode["xuanzuo"])
                {
                    MJ_setSelectDirBtn();
                }
            }
            else
            {
                MJ_setSelectDirBtn();
            }
        }
    }

    if( isJinZhongAPPType() ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ)
    {
        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG)
        {
            COMMON_UI.addLeftCardAndRound();
        }
    }
    /*局数显示*/


    //晋中调手牌大小
    if(isJinZhongAPPType() || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ)
    {
        if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG)
        {

            //ipad 适配,打出桌子上的牌排版
            if(isIPad())
            {
                for(var off = 0;off < 4;off++) COMMON_UI.gSetIPadMJ(off);
            }
        }
    }


    if(MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
        isJinZhongAPPType() ||
        MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ)
    {
        if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG)
        {
            //触摸事件监听注册
            cc.eventManager.addListener(cc.EventListener.create(getTouchListener_MJ()),MjClient.playui.jsBind.eat._node);
        }
    }

    if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ)
    {
        COMMON_UI.setPlayingBtnSize();
    }

    //断线重连回来后，刷新UI,局数，牌张数
    COMMON_UI.reconnectRefeshUI();


    /*3d ,2d 效果切换的初始化*/
    if(COMMON_UI3D.isCanChangTo3D())
    {
        //东南西北转盘初始化
        COMMON_UI3D.InitSetArrowbk();

        //3D layout
        for(var off = 0;off < 4;off++)
        {
            COMMON_UI3D.resetCardLayout(off);

            if(COMMON_UI3D.is3DUI())
            {
                var tingIcon = getNode(off).getChildByName("head").getChildByName("tingIcon");
                if(tingIcon && off == 3) tingIcon.y = 150;
            }
        }
        

    }
    // 山西,岳阳没有3D功能麻将，刷新手牌 大小
    else
    {
        COMMON_UI.mjhandSizeSet();
    }

    /*晋中自由人数UI by sking */
    if(isJinZhongAPPType() )
    {
        if(MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU ||
            MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN ||
            MjClient.gameType == MjClient.GAME_TYPE.LING_SHI_BAN_MO ||
            MjClient.gameType == MjClient.GAME_TYPE.LING_SHI_BIAN_LONG ||
            MjClient.gameType == MjClient.GAME_TYPE.PING_YAO_MA_JIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.PING_YAO_KOU_DIAN ||
            MjClient.gameType == MjClient.GAME_TYPE.SHOU_YANG_QUE_KA ||
            MjClient.gameType == MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN ||
            MjClient.gameType == MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3 ||
            MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_KD ||
            MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_MA_JIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.ZHUO_HAO_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN ||
            MjClient.gameType == MjClient.GAME_TYPE.FEN_YANG_QUE_MEN ||
            MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI ||
            MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.FEN_XI_YING_KOU ||
            MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN ||
            MjClient.gameType == MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN ||
            MjClient.gameType == MjClient.GAME_TYPE.FAN_SHI_XIA_YU ||
            MjClient.gameType == MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.WU_TAI_KOU_DIAN ||
            MjClient.gameType == MjClient.GAME_TYPE.JING_LE_KOU_DIAN ||
            MjClient.gameType == MjClient.GAME_TYPE.LUAN_GUA_FENG ||
            MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN ||
            MjClient.gameType == MjClient.GAME_TYPE.HE_JIN_KUN_JIN
        )
        {
            if (MjClient.data.sData.tData.areaSelectMode["convertible"] && MjClient.rePlayVideo == -1)
                addFreeNumberBtn([0.5,0.5]);
        }
    }
   
};

/*
 是否是真的慌庄 by sking
 */

isRealHuangZhuang = function()
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    return tData.winner == -1;
    // var _isHuang = true;
    // for(var i = 0;i < tData.maxPlayer;i++)
    // {
    //     var _pl =getUIPlayer(i);
    //     if(_pl && _pl.winType != 0)
    //     {
    //         _isHuang = false;
    //         break;
    //     }
    // }
    // return _isHuang;
}

// 精度修正
revise = function(num, times) {
    // times = 1/允许误差
    times = times || 1e6;
    return Math.round(num * times) / times;
}
// console.log("0.1+0.2="+(0.1+0.2), "精度修正="+revise(0.1+0.2));

//头像倒计时动画
function showAndHideHeadEffect(){
    var tData = MjClient.data.sData.tData;
    var uids = tData.uids;
    var curPlayerIndex = (tData.curPlayer + MjClient.MaxPlayerNum - tData.uids.indexOf(SelfUid())) % MjClient.MaxPlayerNum;
    curPlayerIndex =  getOffForPlayerNum(curPlayerIndex);

    var curPlayerNode = null;
    if (curPlayerIndex == 0){
        curPlayerNode = MjClient.playui._downNode.getChildByName("head").getChildByName("headFrame");
    }
    else if (curPlayerIndex == 1){
        curPlayerNode = MjClient.playui._rightNode.getChildByName("head").getChildByName("headFrame");
    }else if (curPlayerIndex == 2){
        curPlayerNode = MjClient.playui._topNode.getChildByName("head").getChildByName("headFrame");
    }else if(curPlayerIndex == 3){
        curPlayerNode = MjClient.playui._leftNode.getChildByName("head").getChildByName("headFrame");
    }

    var tag = 2018726;
    if(MjClient.playui._downNode.getChildByName("head").getChildByName("headFrame").getChildByTag(tag))
        MjClient.playui._downNode.getChildByName("head").getChildByName("headFrame").removeChildByTag(tag, true);
    if(MjClient.playui._rightNode.getChildByName("head").getChildByName("headFrame").getChildByTag(tag))
        MjClient.playui._rightNode.getChildByName("head").getChildByName("headFrame").removeChildByTag(tag, true);
    if(MjClient.playui._topNode.getChildByName("head").getChildByName("headFrame").getChildByTag(tag))
        MjClient.playui._topNode.getChildByName("head").getChildByName("headFrame").removeChildByTag(tag, true);
    if(MjClient.playui._leftNode.getChildByName("head").getChildByName("headFrame").getChildByTag(tag))
        MjClient.playui._leftNode.getChildByName("head").getChildByName("headFrame").removeChildByTag(tag, true);
    if (curPlayerNode != null && MjClient.data.sData.tData.tState == TableState.waitPut)
    {
        curPlayerNode.visible = true;

        cc.spriteFrameCache.addSpriteFrames("animate/fangkuan.plist");

        var sp = curPlayerNode.getChildByTag(tag);
        if(sp && cc.sys.isObjectValid(sp)){
            sp.stopAllActions();
            sp.removeFromParent(true);
            sp = null;
        }

        var sp = new cc.Sprite("#lvquan_1.png");
        sp.setAnchorPoint(0.5,0.5);
        if(MjClient.gameType != MjClient.GAME_TYPE.LIAN_YUN_GANG &&
            MjClient.gameType != MjClient.GAME_TYPE.ML_HONGZHONG &&
            MjClient.gameType != MjClient.GAME_TYPE.ML_HONGZHONG_ZERO ){
            sp.scaleX = 1.2;
            sp.scaleY = 1.3;
        }

        sp.x = curPlayerNode.width * 0.5;
        sp.y = curPlayerNode.height * 0.5 ;
        sp.setTag(tag);
        curPlayerNode.addChild(sp);

        var arry = [];
        for(var i = 29; i >0; i--)
        {
            var frame = cc.spriteFrameCache.getSpriteFrame("lvquan_" + i + ".png");
            if(frame)
            {
                arry.push(frame);
            }
        }
        var blink=new cc.Blink(1000,2000);
        var ac =cc.animate(new cc.Animation(arry,0.34));
        sp.runAction(cc.sequence(cc.Repeat(ac,1),blink));
    }
}

/**
 * 获取金币字符串，小于10万，显示完整数字，10万及以上，显示【11.9万】的缩写，四舍五入
 * @param count
 */
function  getJinbiStr(count){
    var number = parseInt(count)
    if(number < 10 * 10000 && number > -10 * 10000){
        return number+"";
    }else{
        return (count/10000).toFixed(1)+"万"
    }
}

/**
 * 获取金币字符串，小于1万，显示完整数字，1万及以上，显示【1.9万】的缩写，四舍五入
 * @param count
 */
function  getJinbiStrEx(count,precision){
    precision = precision || 1
    var number = parseInt(count)
    if(number < 10000 && number > -10000){
        return number+"";
    }else{
        return (count/10000).toFixed(precision)+"万"
    }
}

/**
 * 点击金币场次检测金币是否足够，或者过多
 * return 1足够不超出， 2，不足没有可选，3，不足有可选 4，过多没有可选，5过多有可选
 */
function checkGold(lowerLimit,upperLimit,callback){
    if(!MjClient._GOLD_FIELD){
        cc.log("金币场配置还没有赋值，此方法失效");
        return 0;
    }
    var len = MjClient._GOLD_FIELD.length;
    var goldValue = MjClient.data.pinfo.gold;

    //先判读是否满足进入当前场次。满足直接返回结果
    if(goldValue >= lowerLimit){
        if(upperLimit){
            if(upperLimit >= goldValue){
                if(callback)callback(1);
                return 1;
            }
        }else{
            if(callback)callback(1);
            return 1;
        }
    }
    //晋中优先匹配同玩法
    var curFieldGameType = -1;
    if(isJinZhongAPPType()){
        for (var i = 0; i < len; i ++){
            if(lowerLimit == MjClient._GOLD_FIELD[i].lowerLimit && upperLimit == MjClient._GOLD_FIELD[i].upperLimit){
                curFieldGameType = MjClient._GOLD_FIELD[i].gameType;
                break;
            }
        }
    }
    var tempValue = -1;
    var bestIndex = -1;
    var tempGameType;

    function setFindValue(index) {
        tempValue = MjClient._GOLD_FIELD[index].lowerLimit;
        tempGameType = MjClient._GOLD_FIELD[index].gameType;
        bestIndex = i;
    }

    for (var i = 0; i < len; i ++){
        if(goldValue >= MjClient._GOLD_FIELD[i].lowerLimit){
            if (!MjClient._GOLD_FIELD[i].upperLimit || goldValue <=　MjClient._GOLD_FIELD[i].upperLimit){
                if(isJinZhongAPPType()){
                    //晋中的金币场，优先进入同玩法，再优先进入最低场次
                    if(tempValue == -1){
                        setFindValue(i);
                    }else{
                        if(tempGameType != curFieldGameType){
                            if(MjClient._GOLD_FIELD[i].gameType == curFieldGameType){
                                setFindValue(i);
                            }else{
                                if(MjClient._GOLD_FIELD[i].lowerLimit < tempValue){
                                    setFindValue(i);
                                }
                            }
                        }else{
                            if(MjClient._GOLD_FIELD[i].gameType == curFieldGameType){
                                if(MjClient._GOLD_FIELD[i].lowerLimit < tempValue){
                                    setFindValue(i);
                                }
                            }
                        }
                    }
                }else{
                    if(MjClient._GOLD_FIELD[i].lowerLimit > tempValue){
                        setFindValue(i);
                    }
                }
            }
        }
    }
    if(bestIndex < 0){//没有可选的场次
        if(goldValue >= lowerLimit){
            if(callback)callback(4);
            return 4;
        }
        if(callback)callback(2);
        return 2;
    }
    /*if(MjClient._GOLD_FIELD[bestIndex].lowerLimit == lowerLimit &&　MjClient._GOLD_FIELD[bestIndex].upperLimit == upperLimit){
     if(callback)callback(1);
     return 1;
     }*/
    if(upperLimit && goldValue >= upperLimit){
        if(callback)callback(5,MjClient._GOLD_FIELD[bestIndex]);
        return 5;
    }else{
        if(callback)callback(3,MjClient._GOLD_FIELD[bestIndex]);
        return 3;
    }
}

/**
 * 金币场快速开始
 */
function quickStartGoldMatch() {
    checkGold(MjClient._GOLD_FIELD[0].lowerLimit, MjClient._GOLD_FIELD[0].upperLimit,function (type, data) {
        if (type == 2) { //过少没有可选
            if (MjClient._FREE_COUNT > 0) {
                MjClient.Scene.addChild(new goldMianfeiLayer(0,MjClient._GOLD_FIELD[0].lowerLimit));
            } else {
                MjClient.Scene.addChild(new JinBibuzuTip1(MjClient._GOLD_FIELD[0].lowerLimit));
            }
        } else if (type == 3 || type == 5){
            MjClient.goldfieldEnter(data.fieldId,data.gameType)
        } else if (type == 1){
            MjClient.goldfieldEnter(MjClient._GOLD_FIELD[0].fieldId,MjClient._GOLD_FIELD[0].gameType);
        }else{
            MjClient.showToast("没有可进入的场次");
        }
    });
}

/**
 * 金币场判断结算时候是否破产
 */
function isGoldPoChan(pl) {
    // if (pl && pl.info && pl.info.gold <= 0){
    //     return true;
    // }
    if (pl.info.uid == SelfUid() && MjClient.data.pinfo.gold <= 0){
        return true;
    }

    if(pl && pl.info && pl.info.uid != SelfUid()){
        if(pl.winone + pl.info.gold <= 0){
            return true;
        }
    }
    return false
}

/**
 * 金币场判断小结算是否封顶（自身拥有金币*2）
 */
function isGoldTopLimit(pl) {
    if (pl && pl.info){
        if(pl.info._preGold && pl.info.gold){
            if(pl.info.gold >= pl.info._preGold * 2){
                return true;
            }
        }
    }
    if(pl && pl.info && pl.info.uid != SelfUid()){
        if(pl.winone == pl.info.gold){
            return true;
        }
    }
    return false
}

/**
 * 金币场获取连续胜利次数
 */
function getGoldWinTimes() {
    var winTimes = util.localStorageEncrypt.getNumberItem("GOLD_FIELD_WIN_TIMES",0)
    return winTimes;
}
function getGoldPreWinTimes() {
    var winTimes = util.localStorageEncrypt.getNumberItem("GOLD_FIELD_PRE_WIN_TIMES",0)
    return winTimes;
}

function leaveGameClearUI() {
    postEvent("clearCardUI");
    postEvent("LeaveGame");
    if(cc.sys.isObjectValid(MjClient.enterui)){
        MjClient.enterui.removeFromParent(true);
        MjClient.enterui = null;
    }
    if(cc.sys.isObjectValid(MjClient.goldMatchingui)){
        MjClient.goldMatchingui.removeFromParent(true);
        delete  MjClient.goldMatchingui;
    }
    if( MjClient.goldStoreLayer && cc.sys.isObjectValid(MjClient.goldStoreLayer)){
        MjClient.goldStoreLayer.removeFromParent(true);
        delete MjClient.goldStoreLayer;
    }
    if(cc.sys.isObjectValid(MjClient.createui)){
        MjClient.createui.removeFromParent(true);
        MjClient.createui = null;
    }
    if(cc.sys.isObjectValid(MjClient.endoneui)){
        MjClient.endoneui.removeFromParent(true);
        MjClient.endoneui = null;
    }
    if(cc.sys.isObjectValid(MjClient.endallui)){
        MjClient.endallui.removeFromParent(true);
        MjClient.endallui = null;
    }
    if(cc.sys.isObjectValid(MjClient.playui)){
        MjClient.playui.removeFromParent(true);
        MjClient.playui = null;
    }
    if(cc.sys.isObjectValid(MjClient.roomTableSwitch)){
        MjClient.roomTableSwitch.removeFromParent(true);
        MjClient.roomTableSwitch = null;
    }
    delete MjClient.data.sData;
    delete MjClient.gameType;
}

function stringLengthForMysql(str,maxLength) {
    var len = 0;
    var beforText = null;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
            if(len > maxLength){
                if (!beforText){
                    beforText = str.substring(0,i);
                }
            }
        }
        else {
            len += 3;
            if(len > maxLength){
                if (!beforText){
                    beforText = str.substring(0,i);
                }
            }
        }
    }
    return {len:len,txt:beforText};
}


/*
 *@author : by sking 2018.9.4
 *@function : 判断是否是百搭牌
 *@para cd : 当前这张牌
 */
function isHunCard(cd) {

    if(MjClient.gameType == MjClient.GAME_TYPE.FEN_XI_YING_KOU) return false;

    if((MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) && (MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG ||
        MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG)){
        if(MjClient.majiang.isHunCard && MjClient.majiang.isHunCard(cd, MjClient.data.sData.tData.hunCard)){
            return true;
        }
    }

    if ((MjClient.data.sData.tData.hunCard && MjClient.data.sData.tData.hunCard == cd) ||
        (MjClient.data.sData.tData.hunCard2 && MjClient.data.sData.tData.hunCard2 == cd))
    {
        return true;
    }

    return false;
}

function showTipsAndLeaveGame() {
    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Likaifangjian", {uid:SelfUid(), gameType:MjClient.gameType});
    var sData = MjClient.data.sData;
    if (sData) {
        if (IsRoomCreator()) {
            MjClient.showMsg("返回大厅房间仍然保留\n赶快去邀请好友吧",
                function() {
                    MjClient.leaveGame();
                },
                function() {});
        } else {
            MjClient.showMsg("确定要退出房间吗？",
                function() {
                    MjClient.leaveGame();
                },
                function() {});
        }
    }
}

/**
 * 转半角字符
 */
function stringDBCtoSBC(str){
    var result = "";
    var len = str.length;
    for(var i=0;i<len;i++)
    {
        var cCode = str.charCodeAt(i);
        //全角与半角相差（除空格外）：65248（十进制）
        cCode = (cCode>=0xFF01 && cCode<=0xFF5E)?(cCode - 65248) : cCode;
        //处理空格
        cCode = (cCode==0x03000)?0x0020:cCode;
        result += String.fromCharCode(cCode);
    }
    return result;
}

/**
 * 是否开启金币场活动 快速打5局
 * @returns {boolean}
 */
function isGoldActivityOpen() {
    if (MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JIN_BI_CHANG_HUO_DONG)) {
        return true;
    }
    return false;
}

/**
 * 是否开启金币场活动2 连胜7局
 * @returns {boolean}
 */
function isGoldActivityOpen_2() {
    if (MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JIN_BI_CHANG_HUO_DONG_2)) {
        return true;
    }
    return false;
}

/**
 * obj是否为null
 * @returns {boolean}
 */
function isStrNotEmpty(obj) {
    return typeof obj != 'undefined' && obj != null && obj != 'NaN' && obj.toString().replace(/^\s+|\s+$/g, '') != '';
}

//每日任务提示1 node: 显示tips旁的节点， off: 相对于node节点的偏移位置,默认0偏移
function createAndShowDayTaskTips1(node,off){

    // 非金币场不展示
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if (!tData || !tData.fieldId) {
        return
    }
    // 请求任务
    MjClient.gamenetReq.mission({
        },
        function(rtn) {
            MjClient.unblock();
            if (rtn.code != 0) {
                return
            }
            //判断节点是否有效
            if (!cc.sys.isObjectValid(node) ) {
                return
            }
            let data = rtn.data
            let num = 0
            for (i=0; i<data.length; i++) {
                if (data[i].count){
                    let leftCount = data[i].count - data[i].complete
                    if (leftCount >0 && leftCount <= 5 ) {
                        num = leftCount
                        break
                    }
                }
            }
            if (num == 0) {
                return
            }
            off = off || [0,0]
            var bkg = new ccui.ImageView("game_picture/dayTaskTips/TipsBkg1.png");
            node.getParent().addChild(bkg)
            bkg.setPosition(node.getPositionX() + node.width-40,node.getPositionY() + node.height-3)
            //创建tips文案
            var richText = new ccui.RichText();
            var re1 = new ccui.RichElementText(1, cc.color("#FFFFFF"), 255, "再玩", "fonts/lanting.TTF", 26);
            var re2 = new ccui.RichElementText(2, cc.color("#FFDB3E"), 255, num+"局", "fonts/lanting.TTF", 26);
            var re3 = new ccui.RichElementText(3, cc.color("#F1FFFF"), 255, "可领取奖励", "fonts/lanting.TTF", 26);
            richText.pushBackElement(re1);
            richText.pushBackElement(re2);
            richText.pushBackElement(re3);
            richText.setPosition(128,40)
            bkg.addChild(richText)
            return bkg
        }
    )
}

////每日任务提示2 node: 显示tips旁的节点，data:完成任务在数据 
function createAndShowDayTaskTips2(node,data,direct){
    //判断节点是否有效
    if (!cc.sys.isObjectValid(node) ) {
        return
    }
    //出现动画
    var hasTips = false
    let showTipsAnim = function() {
        hasTips = true
        bkg.runAction(cc.spawn(cc.moveTo(0.75,cc.p(node.getPositionX() - node.width,node.getPositionY() - node.height-(data.length - 1)*30)),cc.fadeIn(1)))
        setTimeout(closeTipsAnim,4000)
    }
    //消失动画
    let closeTipsAnim = function() {
        if (!hasTips) {
            return
        }
        hasTips = false
        bkg.runAction(cc.sequence( cc.spawn(cc.moveTo(0.75,cc.p(node.getPositionX() - node.width,node.getPositionY() - node.height+200-(data.length - 1)*30)),cc.fadeOut(1)),cc.callFunc(function() { bkg.removeFromParent()})))
    }

    if (direct == "left") {
        showTipsAnim = function() {
            hasTips = true
            bkg.runAction(cc.spawn(cc.moveTo(0.75,cc.p(node.getPositionX() -bkg.width+80,node.getPositionY()-15-(data.length - 1)*30 )),cc.fadeIn(1)))
            setTimeout(closeTipsAnim,4000)
        }
        //消失动画
        closeTipsAnim = function() {
            if (!hasTips) {
                return
            }
            hasTips = false
            bkg.runAction(cc.sequence( cc.spawn(cc.moveTo(0.75,cc.p(node.getPositionX() -bkg.width+500,node.getPositionY()-15-(data.length - 1)*30)),cc.fadeOut(1)),cc.callFunc(function() { bkg.removeFromParent()})))
        }
    }

    //创建tips背景

    let bkg = new cc.Scale9Sprite("game_picture/dayTaskTips/TipsBkg2.png", null,cc.rect(100, 50, 1, 1));
    if (direct == "left") {
        bkg = new cc.Scale9Sprite("game_picture/dayTaskTips/TipsBkg2_left.png", null,cc.rect(100, 50, 1, 1));
        bkg.setPosition(node.getPositionX() - bkg.width+500,node.getPositionY()-15-(data.length - 1)*30 )
    }else {
        bkg.setPosition(node.getPositionX() - node.width,node.getPositionY() - node.height+200-(data.length - 1)*30)
    }
    bkg.width = 208
    bkg.height = 110+(data.length - 1) * 30
    node.getParent().addChild(bkg)
    // bkg.setOpacity(0);
    //创建tips文案
    for (let i = 0; i < data.length; i++) {
        var richText = new ccui.RichText();
        var re1 = ""
        var re2 = ""
        var re3 = new ccui.RichElementText(3, cc.color("#000000"), 255, "局", "fonts/lanting.TTF", 22);
        if (data[i].winner ) {
            re1 = new ccui.RichElementText(1, cc.color("#000000"), 255, "娱乐场赢牌", "fonts/lanting.TTF", 22);
            re2 = new ccui.RichElementText(2, cc.color("#000000"), 255, data[i].winner, "fonts/lanting.TTF", 22);
        }else if (data[i].count ) {
            re1 = new ccui.RichElementText(1, cc.color("#000000"), 255, "娱乐场玩牌", "fonts/lanting.TTF", 22);
            re2 = new ccui.RichElementText(2, cc.color("#000000"), 255, data[i].count, "fonts/lanting.TTF", 22);
        }else if (data[i].share) {
            re1 = new ccui.RichElementText(1, cc.color("#000000"), 255, "分享游戏", "fonts/lanting.TTF", 22);
            re2 = new ccui.RichElementText(2, cc.color("#000000"), 255, data[i].share, "fonts/lanting.TTF", 22);
            re3 = new ccui.RichElementText(3, cc.color("#000000"), 255, "次", "fonts/lanting.TTF", 22);
        }
        richText.pushBackElement(re1);
        richText.pushBackElement(re2);
        richText.pushBackElement(re3);
        richText.setPosition(95,70+i * 30)
        bkg.addChild(richText)

        //创建勾选图片
        var selectImage = new ccui.ImageView("game_picture/dayTaskTips/select.png");
        bkg.addChild(selectImage)
        selectImage.setPosition(180,70+ i * 30)
    }

    //创建领取按钮
    getRewardBtn = new ccui.Button();
    getRewardBtn.loadTextureNormal("game_picture/dayTaskTips/get_Reward.png");
    getRewardBtn.loadTextureDisabled("game_picture/dayTaskTips/getSuccess.png")
    getRewardBtn.setName("getRewardBtn");
    getRewardBtn.setPosition(102,30);
    bkg.addChild(getRewardBtn);

    // 领取奖励回调
    getRewardBtn.addTouchEventListener(function (sender, Type) {
        switch (Type) {
            case ccui.Widget.TOUCH_ENDED:
                getRewardBtn.setEnabled(false)
                let delaySendMisson = function(i)  {
                    setTimeout(function() {
                        MjClient.gamenet.request("pkplayer.handler.missionAward", {
                            id:data[i].id
                        })
                    },i*300)
                }
                for (let i = 0; i < data.length; i ++) {
                    delaySendMisson(i)
                }
                setTimeout(function() {

                    closeTipsAnim()
                },500)
                break;
            default:
                break;
        }
    }, this);

    showTipsAnim()

    //创建tips文案
    return bkg
}

function ShowDayTaskTips(node,direct) {
    var that = this
    MjClient.block();
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if (!tData || !tData.fieldId) {
        return
    }
    MjClient.gamenet.request("pkplayer.handler.mission", {
        },
        function(rtn) {
            MjClient.unblock();
            if (rtn.code != 0) {
                return
            }
            let data = rtn.data
            let compData = new Array()
            console.log(JSON.stringify(data))
            for (i=0; i<data.length; i++) {
                if (data[i].status == 1) {
                    compData.push(data[i])
                }
            }
            if (compData.length > 0) {
                createAndShowDayTaskTips2(node,compData,direct)
            }
        }
    )
}

/**
 * 如果有异常情况发送异常数据给sever by sking 2018.12.28
 * @param data 要发送的异常数据，字数串string 或者 对象object
 */
function postBugDataToSever(data)
{
    var sendData = "";
    if(typeof (data) == "object")
    {
        sendData = JSON.stringify( data)
    }else{
        sendData = data;
    }
    var url =  'https://' +AppEnv[MjClient.getAppType()] + '.jtcfgame.com/user/logger?userId=' + SelfUid();
    var xmlHttp = cc.loader.getXMLHttpRequest();
    xmlHttp.open('POST', url, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    xmlHttp.send(sendData);
}

/*************APP TYPE***************/
/**
 *  是否是以晋中为模板的APP by sking
 * @returns {boolean}
 */
function isJinZhongAPPType()
{
    var _appType = MjClient.getAppType();
    if(_appType  ===  MjClient.APP_TYPE.TXJINZHONGMJ ||
        _appType ===  MjClient.APP_TYPE.LYSICHUANMJ  ||
        _appType ===  MjClient.APP_TYPE.DQSHANXIMJ
    )
    {
        return true;
    }
    return false;
}

/**
 * 判断是否是永州工程
 */
function isYongZhouProject(){
    var isYongZhou = false;
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
    {
        isYongZhou = true;
    }
    return isYongZhou;
}
function isShowBackBtn(){
    if(IsInviteVisible()){
        return true;
    }else{
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        if(TableState.waitReady == tData.tState){
            return true;
        }
        return false;
    }
}
function closeNewPopMsgView(cb){
    var scene = cc.director.getRunningScene();
    var view = scene.getChildByName("NewPopMsgView");
    if(view && cc.sys.isObjectValid(view)){
        view.removeFromParent(true);
    }
    if(cb){
        cb();
    }
}
/**
 *
 * @param {ImageView} backImageView
 */
function changeGameBg_yongzhou(backImageView, atMjGameing,gameBgType)
{
    var file = null;
    var type = gameBgType ? gameBgType : getCurrentGameBgType();

    if(COMMON_UI3D.is3DUI())
    {
        var defaultFile = "playing/MJ3D/beijing/beijing3D_1.jpg";
        var path = "playing/MJ3D/background/";
        var format = [".jpg", ".png"];
        for (var i = 0; i < 2; i++) {
            file = path + "beijing3D_" + (type + 1) + format[i];
            if (jsb.fileUtils.isFileExist(file)) {
                break;
            }
        }
        file = jsb.fileUtils.isFileExist(file) ? file : defaultFile;
        backImageView.loadTexture(file);
        return;
    }

    if (isIPhoneX() && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI && type <= 1)
        file = getGameBgFile(type+4);
    else
        file = getGameBgFile(type);

    cc.log("changeGameBg_yongzhou-------------------:",file);
    if (file != "") backImageView.loadTexture(file);
    return;
}

/*
添加永州部分玩法新增永州部分的公共函数
*/
//居中动画,数组里的节点居中排列 只关心x轴
doMoveCenterAction = function(arr,isScale){
    isScale = isScale === undefined ? true : isScale;
    var gap = 5;
    if(arr && arr.length > 0){
        var len = arr.length;
        var w = 0;
        for(var i = 0; i < len; i++){
            var node = arr[i];
            if(node && node.width){
                w += node.width * node.scale;
                w += gap;
            }
        }
    }
    var size = cc.winSize;
    var tx = (size.width - w) * 0.5;
    if(size.width < w){
        tx = size.width - w;
    }
    var preNode = null;
    var oldScale = 0.4;
    for(var i = 0; i < len - 1; i++){
        var node = arr[i];
        if(i == 0){
            oldScale = node.scale;
        }

        if(node){
            node.stopAllActions();
            tx += node.width * 0.5 * node.scale + gap;
            var p = cc.p(tx, node.y);
            var ac = cc.moveTo(0.2, p).easing(cc.easeExponentialOut(0.2));;
            node.runAction(ac);

            tx += node.width * 0.5 * node.scale + gap;
        }
    }

    var node = arr[len - 1];
    if(node){
        node.stopAllActions();
        tx += node.width * 0.5 * node.scale + gap;
        node.x = tx;

        if(isScale){
            node.scale = 0.1;
            var ac = cc.scaleTo(0.1, oldScale).easing(cc.easeExponentialOut(0.1));
            node.runAction(ac);
        }
    }

};
/*
岳阳自动摸打（主动托管）
*/
function AddAutoPutCheckBox()
{
    var tData = MjClient.data.sData.tData;
    {
        var AutoPut_btn = new ccui.CheckBox("playing/gameTable/checkbox.png","playing/gameTable/select.png");
        AutoPut_btn.setName("AutoPut_btn");
        AutoPut_btn.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_zidongmoda_kai", {uid:SelfUid()});
                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                        cmd: "MJTouchPutCard",
                        tPutCard: true
                    });
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_zidongmoda_guan", {uid:SelfUid()});
                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                        cmd: "MJTouchPutCard",
                        tPutCard: false
                    });
                    break;
            }
        }, AutoPut_btn);

        setWgtLayout(AutoPut_btn,[0.1,0.1],[0.5,0.05],[0,0]);
        return AutoPut_btn
    }
}
/*
岳阳胡牌牌型贴图
*/
ShowHuTypeImage = function(pl,node,off)
{
    var path = "spine/";
    var eatActionNode = node.getChildByName("play_tips");
    var ImgNodes = [];
    var huWords = [];
    if (pl.huWords)
        huWords = pl.huWords;
    else
        huWords = pl.huWord;

    if (typeof(huWords) != typeof([]) || huWords.length <= 0) return;
    for (var i = 0; i < huWords.length && i < 3; i++) {
        cc.log("加载图片    11" ,path + huWords[i] + ".png");
        var HuTypeImg = new ccui.ImageView();
        HuTypeImg.setName("HuImg");
        HuTypeImg.loadTexture(path + huWords[i] + "/" + huWords[i] + ".png");
        HuTypeImg.setScale(0.65);
        if(node.getName() != "down" && huWords[i] == "duohu"){
            continue;
        }
        eatActionNode.addChild(HuTypeImg);
        eatActionNode.visible = true;

        ImgNodes.push(HuTypeImg);
    }
    //固定间隔

    for (var m = 0; m < ImgNodes.length; m++) {
        var index = Math.floor(ImgNodes.length / 2);
        if(huWords.indexOf("duohu") >= 0){
            index = Math.floor((ImgNodes.length - 1) / 2);
        }
        if(huWords[m] == "duohu"){
            var worldPos = eatActionNode.convertToWorldSpace(ImgNodes[m].getPosition());
            ImgNodes[m].x = ImgNodes[m].x + cc.winSize.width / 2 - worldPos.x;
            ImgNodes[m].y = ImgNodes[m].y + cc.winSize.height / 2 - worldPos.y;
            continue;
        }
        if (off % 2 != 0) 
        {
            ImgNodes[index].x = 50 - (off -1 ) * 50;
            ImgNodes[index].y = -20;
            ImgNodes[m].x = ImgNodes[Math.floor(ImgNodes.length / 2)].x;
            if (ImgNodes.length % 2 == 0) 
            {
                ImgNodes[m].y = (1 - m * 2) * (ImgNodes[m].getContentSize().height /2  * ImgNodes[m].getScale() - (1 - m * 2) * 20);
            }
            else{
                ImgNodes[m].y = ImgNodes[index].y - (m -index) 
                                * (ImgNodes[index].getContentSize().height /2  * ImgNodes[index].getScale() +
                                   ImgNodes[m].getContentSize().height /2  * ImgNodes[m].getScale() + 20);
            }
        }
        else
        {
            ImgNodes[index].x = 0;
            ImgNodes[index].y = -20 + off * 20
            ImgNodes[m].y = ImgNodes[Math.floor(ImgNodes.length / 2)].y;
            if (ImgNodes.length  % 2 != 0) 
            {
                ImgNodes[m].x = ImgNodes[index].x - (index - m) 
                                * (ImgNodes[index].getContentSize().width /2  * ImgNodes[index].getScale() +
                                   ImgNodes[m].getContentSize().width /2  * ImgNodes[m].getScale() + 50)
            }
            else
            {
                ImgNodes[m].x = 0 + (m * 2 -1) * (ImgNodes[m].getContentSize().width /2  * ImgNodes[m].getScale() + 50);
            }

        }
    }
}

var isOnSameLMClubInTable = function(pinfo){
    if (MjClient.data.sData && MjClient.data.sData.tData && pinfo.clubId){
        var tData = MjClient.data.sData.tData;
        for (var i = 0; i < tData.uids.length; i++) {
            var plSelf = MjClient.data.sData.players[tData.uids[i]];
            if (plSelf && tData.uids[i] == MjClient.data.pinfo.uid) {
                if(plSelf.info.clubId == pinfo.clubId){
                    return true;
                }
            }
        }
    }
    return false;
}
//牌桌内获取俱乐部信息，不返会表示不是俱乐部房
var getClubInfoInTable = function(){
    if(!MjClient.data.sData || !MjClient.data.sData.tData){
        return;
    }
    var tData = MjClient.data.sData.tData;

    var clubInfo = {};
    //是否联盟俱乐部
    var isLMClub = tData.leagueId ? true : false;
    clubInfo.isLMClub = isLMClub;
    clubInfo.clubId = isLMClub ? tData.leagueId : tData.clubId;

    if(!clubInfo.clubId){//不是俱乐部房
        return;
    }
    clubInfo.clubTitle = isLMClub ? tData.leagueTitle : tData.clubTitle;
    clubInfo.clubAvatar = isLMClub ? tData.leagueAvatar : tData.clubAvatar;
    clubInfo.ruleName = tData.ruleName;
    clubInfo.ruleId = tData.ruleId;
    clubInfo.noAttackProp = tData.noAttackProp;//禁用攻击表情
    clubInfo.isForbVoice = tData.isForbVoice;//禁用语音0：不禁用，1：禁用
    clubInfo.isForbChat = tData.isForbChat;//禁用聊天0：不禁用，1：禁用
    return clubInfo;
}

var correctAccuracy = function(float, digit) { 
    var powValue = Math.pow(10, digit); 
    return parseInt(float * powValue, 10) / powValue;
} 

//俱乐部再来一局
var clubReplay = function (clubId, ruleId, gameType) {
    var tData = MjClient.data.sData.tData;
    var para = tData.areaSelectMode;
    var inviteVipTable = MjClient.data.inviteVipTable;
    para.maxPlayer = tData.maxPlayer;
    para.gameType = tData.gameType;
    var tClubId = tData.clubId;
    var tLeagueId = tData.leagueId;
    MjClient.showMsg("是否再来一局？", function () {
        //不让leaveGame自动进入俱乐部
        delete tData.clubId;
        delete tData.leagueId;
        MjClient.leaveGame();
        //恢复删除值
        tData.clubId = tClubId;
        tData.clubId = tLeagueId;
        MjClient.rematchInfo2(clubId, tData.uids, ruleId, gameType,function(rtn){
            if(!rtn || rtn.code != 0){
                cc.log("再来一局失败，回到俱乐部")
                if (!MjClient.FriendCard_main_ui){
                    MjClient.Scene.addChild(new FriendCard_main(clubId));
                }
            }else{
                cc.log("再来一局成功")
            }
        });

        //"nantongReplay" 再来一局的弹窗类型
    }, function () { }, "1", "nantongReplay");
};
var AddGuiZuHeadFrame_old = function(node){
    if(util.localStorageEncrypt.getBoolItem("_HeadKuangs", true) == false){
        return;
    }
    var headBg = node.getChildByName("headBg");
    // headBg.visible = false;
    if(!headBg)
    {
        var head = node.getChildByName("head");
        headBg = ccui.ImageView("userInfo_3.0/zhuangBan/headFrame/TX1.png");
        headBg.setScaleX(head.width + 10/headBg.width);
        headBg.setScaleY(head.height + 10/headBg.height);
        headBg.setPosition(cc.p(head.width/2 , head.height/2 ));
        head.addChild(headBg, 5)
    }
    

    var _strKuang = MjClient.data.pinfo.aliasId || "TX0";
    headBg.loadTexture("userInfo_3.0/zhuangBan/headFrame/" + _strKuang +".png");

    UIEventBind(null, node, "updateInfo", function () {
        var _strKuang = MjClient.data.pinfo.aliasId || "TX0";
        headBg.loadTexture("userInfo_3.0/zhuangBan/headFrame/" + _strKuang + ".png");
    });
}

var AddGuiZuHeadFrame = function(node){
    // 这个功能暂时不开放
    if(util.localStorageEncrypt.getBoolItem("_HeadKuangs", true) == false){
        return;
    }
    
    var _pos = cc.p(215, 115);
    if(which_mainHeadSkin() == 1){
        _pos = cc.p(230, 72);
    }else if(which_mainHeadSkin() == 2){
        _pos = cc.p(235, 100);
    }
    var head = node.getChildByName("head");
    var _img_hd2 = head.getChildByName("redPoint");
    if(_img_hd2) _img_hd2.visible = false;
    if(MjClient.isUseUIv3 && MjClient.isUseUIv3()){
        _pos = head.getChildByName("guizuTag").getPosition();
    }
    var _img_gz = ccui.ImageView("userInfo_3.0/guiZu/gz_00.png");
    _img_gz.visible = false;
    _img_gz.setScale(0.5);
    _img_gz.setPosition(_pos);
    node.addChild(_img_gz);
    var pinfo = MjClient.data.pinfo;
    var str_gz = pinfo.userGrade > 0 ? pinfo.userGrade : 0;
    _img_gz.loadTexture("userInfo_3.0/guiZu/gz_0" + str_gz + ".png");

    var headBg = node.getChildByName("headBg");
    if(!headBg){
        headBg = ccui.ImageView("userInfo_3.0/zhuangBan/headFrame/TX1.png");
        headBg.setScaleX((head.width + 18)/headBg.width);
        headBg.setScaleY((head.height + 18)/headBg.height);
        headBg.setPosition(cc.p(head.width/2 , head.height/2 ));
        head.addChild(headBg, 5)
    }

    var _img_hd = ccui.ImageView("userInfo_3.0/icon_hongdian.png");
    _img_hd.setPosition(cc.p(headBg.width - 35, headBg.height - 35));
    headBg.addChild(_img_hd);

    _img_hd.visible = false;

    var _strKuang = MjClient.data.pinfo.aliasId || "TX0";
    headBg.loadTexture("userInfo_3.0/zhuangBan/headFrame/" + _strKuang +".png");
    if(MjClient.getAppType() !== MjClient.APP_TYPE.QXYYQP &&  MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ )
        return;
    UIEventBind(null, node, "updateInfo", function () {
        var _strKuang = MjClient.data.pinfo.aliasId || "TX0";
        headBg.loadTexture("userInfo_3.0/zhuangBan/headFrame/" + _strKuang + ".png");
    });
    UIEventBind(null, node, "user_growth_activity", function(d) {
        var isShow = false;

        if(d){
            if(d.diamondManageCraveUp && d.diamondManageCraveUp.isShow){
                isShow = true;
            }
            if(d.dailyLoginEmpirical && d.dailyLoginEmpirical.isShow){
                isShow = true;
            }
            if(d.dailyBlessingLv1Open && d.dailyBlessingLv1Open.isShow){
                isShow = true;
            }
            if(d.dailyBlessingLv2Open && d.dailyBlessingLv2Open.isShow){
                isShow = true;
            }
            if(d.prop1New && d.prop1New.isShow){
                isShow = true;
            }
            if(d.prop2New && d.prop2New.isShow){
                isShow = true;
            }
        }

        _img_hd.visible = isShow;
        
    });
    UIEventBind(null, node, "user_treasure_activity", function(d) {
        MjClient.duoBaoPrizeData = d;
        if(MjClient.duoBaoPrizeData && !MjClient.duoBaoPrizeDataShow && MjClient.userInfoLayerUi 
            && (MjClient.userInfoLayerUi.selectPage == 2)){
            MjClient.Scene.addChild(new UserGrowth_actDuoBao_check(MjClient.duoBaoPrizeData.lotteryId));
            //标志弹过就不弹了
            MjClient.duoBaoPrizeDataShow = true;
        }
    });


    // headBg.setScale(1.1)
    // headBg.x -= 5;
    // headBg.y -= 5;
    // headBg.loadTexture("userInfo_3.0/zhuangBan/headFrame/" +"TX0" +".png");
    // var head = node.getChildByName("head");
    // head.setScale(1.1)
    // headBg.width = head.width + 10;
    // headBg.height = head.height + 10;
    // head.x -= 5;
    // head.y -= 5;
}

var which_mainHeadSkin = function(){
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || 
       MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
       MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
       MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
       MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
       MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
       MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ){
        return 1;
    }else if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
        MjClient.getAppType()==MjClient.APP_TYPE.TXJINZHONGMJ||
            MjClient.getAppType()==MjClient.APP_TYPE.DQSHANXIMJ ){
        return 2;
    }
    return 3;
};




MjClient.getInviteUrl = function (callback, tableid) {
    var parse = {};
    parse.type = 14;
    if(tableid){
        parse.tableid = tableid;
    }
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.openBrowser", parse,
        function(rtn) {
            MjClient.unblock();
            cc.log(" ===== pkplayer.handler.openBrowser === " + JSON.stringify(rtn));
            if (rtn.code == 0) {
                callback(rtn.data);
            } else {
                if (rtn.message) {
                    MjClient.showToast(rtn.message);
                }
            }
        }
    );
};




//rounedEnd消息会执行此函数
var doJiaShiActivityAfterRoundEnd= function(){
    showRedPkgJiaShiTip();//红包加时赛弹框
    showVoteJiaShiTip();//普通加时赛投票弹框
}

//mjhand消息会执行此函数
var stopDoJiaShiAction = function(){
    stopDoRedPkgJiaShiTip();//红包加时赛提示
    stopDoRedPkgJiaShiDialog();//红包加时赛抢红包弹框
    stopDoVoteJiaShiTip();//普通加时赛投票弹框
}

//亲友圈房卡普通加时赛投票提示监听
var showVoteJiaShiTip = function(params){
    if(!params){
        params = {};
    }
    if(!FriendCard_Common.isOpenForceMiankoujiashi()){
        return;
    }
    if(!MjClient.data.sData){
        return;
    }
    if(MjClient.rePlayVideo != -1){
        //回放不展示
        return;
    }
    
    if(!MjClient.data.sData.tData){
        return;
    }
    var tData = MjClient.data.sData.tData;
    var isCanShowVoteView = true;
    var isAllAgree = true
    if(tData.extraTimeVote){
        for(var i = 0 ; i < tData.uids.length; i++){
            var votePlData =  tData.extraTimeVote[tData.uids[i]];
            if(votePlData && votePlData.vote === 0){
                isCanShowVoteView = false;
            }
            if(votePlData && votePlData.vote != 1){
                isAllAgree = false;
            }
        }
    }
    isCanShowVoteView = (isCanShowVoteView && !isAllAgree)
    if(!isCanShowVoteView){
        stopDoVoteJiaShiTip();
        if(cc.sys.isObjectValid(MjClient.VoteJiaShiView)){
            MjClient.VoteJiaShiView.removeFromParent();
        }
        //去除准备按钮点击的遮罩
        if(cc.sys.isObjectValid(MjClient.endoneui) &&
            cc.sys.isObjectValid(MjClient.endoneui._readyBtnLayout)){
            MjClient.endoneui._readyBtnLayout.removeFromParent();
        }
        return;
    }

    if(MjClient.data.sData && 
        MjClient.data.sData.tData.roundNum > 1){
        stopDoVoteJiaShiTip();
        return;
    }
    if(('extraNum' in MjClient.data.sData.tData) &&
        MjClient.data.sData.tData.extraNum > 1){
        stopDoVoteJiaShiTip();
        return;
    }
    if(MjClient.data.sData.tData.extraTimeType != 2){
        //类型1是红包加时赛，类型2是普通加时赛
        stopDoVoteJiaShiTip();
        return;
    }
    if(!MjClient.data.sData.tData.extraTimeVote){
        stopDoVoteJiaShiTip();
        return;
    }
    
    if(cc.sys.isObjectValid(MjClient.playui)){
        if(params.fromInitScene){
            if(!cc.sys.isObjectValid(MjClient.VoteJiaShiView)){
                var voteJiaShiTipDialog = new VoteJiaShiView();
                voteJiaShiTipDialog.zIndex = 10000;
                MjClient.playui.addChild(voteJiaShiTipDialog);
                stopDoVoteJiaShiTip();
            }
        }else{
            var action = cc.repeatForever(cc.sequence(cc.callFunc(function() {
                if (cc.sys.isObjectValid(MjClient.endoneui)){
                    addReadyBtnClick();
                    var action2 = cc.sequence(cc.delayTime(1),cc.callFunc(function(){
                        if(!cc.sys.isObjectValid(MjClient.VoteJiaShiView)){
                            if(tData.extraTimeVote.isEnd){
                                return;
                            }
                            var voteJiaShiTipDialog = new VoteJiaShiView();
                            voteJiaShiTipDialog.zIndex = 10000;
                            MjClient.playui.addChild(voteJiaShiTipDialog);
                        }
                    }))
                    action2.setTag(20191206)
                    stopDoVoteJiaShiTip();
                    MjClient.playui.runAction(action2);

                }
            }), cc.delayTime(0.01)));
            if (cc.sys.isObjectValid(MjClient.endoneui)){
                addReadyBtnClick();
            }
            action.setTag(20191205);
            stopDoVoteJiaShiTip();
            MjClient.playui.runAction(action);
        }
        
    }
}
//普通加时赛开启不成功开始大结算展示监听，小结算关闭要显示大结算
var doShowEndAllAction = function(params){
    if(!params){
        params = {};
    }
    MjClient.playui.stopActionByTag(20191207)
    if(cc.sys.isObjectValid(MjClient.playui)){
        var action = cc.repeatForever(cc.sequence(cc.callFunc(function() {
            if (!cc.sys.isObjectValid(MjClient.endoneui)){
                MjClient.playui.stopActionByTag(20191207);
                if (!cc.sys.isObjectValid(MjClient.endallui)){
                    postEvent("endRoom",{
                        showEnd:true
                    });
                }
            }
        }), cc.delayTime(0.01)));
        action.setTag(20191207);
        MjClient.playui.stopActionByTag(20191207)
        MjClient.playui.runAction(action);
        
    }
}
/*
*准备按钮的点击遮罩
*/
var addReadyBtnClick = function(){
    if (cc.sys.isObjectValid(MjClient.endoneui)){
        if(MjClient.endoneui._readyBtnLayout){
            return;
        }
        //隐藏洗牌按钮
        var xiPaiBtnNameArr = ["btn_xiPai","xiPai"];
        for(var i = 0; i < xiPaiBtnNameArr.length; i++){
            var hasFind = false;
            findNodeByNameKey(MjClient.endoneui,xiPaiBtnNameArr[i],function(xiPaiBtn){
                xiPaiBtn.visible = false;
                //可能还需要改变位置,针对玩法
                hasFind = true;
            })
            if(hasFind){
                break;;
            }
        }

        var tData = MjClient.data.sData.tData;
        if(tData.extraTimeVote && tData.extraTimeVote.isEnd){
            return;
        }
        //要兼容准备按钮不同昵称的加进readyBtnNameArr
        var readyBtnNameArr = ["ready","readyBtn","btn_ready"];
        for(var i = 0; i < readyBtnNameArr.length; i++){
            var hasFind = false;
            findNodeByNameKey(MjClient.endoneui,readyBtnNameArr[i],function(readyBtn){
                if(!readyBtn.visible){
                    return;
                }
                hasFind = true;
                var readyBtnLayout = new ccui.Layout();
                readyBtnLayout.setAnchorPoint(readyBtn.getAnchorPoint());
                readyBtnLayout.setName("readyBtnLayout");
                //readyBtnLayout.setColor(cc.color(0, 0, 0));
                readyBtnLayout.setContentSize(cc.size(readyBtn.width,readyBtn.height));
                readyBtnLayout.setPosition(readyBtn.x,readyBtn.y);
                readyBtnLayout.setScale(readyBtn.getScale());
                readyBtnLayout.setTouchEnabled(true);
                readyBtn.getParent().addChild(readyBtnLayout);
                MjClient.endoneui._readyBtnLayout = readyBtnLayout;

                readyBtnLayout.addTouchEventListener(function(sender,Type){
                    if(!cc.sys.isObjectValid(MjClient.VoteJiaShiView)){
                        var voteJiaShiTipDialog = new VoteJiaShiView();
                        voteJiaShiTipDialog.zIndex = 10000;
                        MjClient.playui.addChild(voteJiaShiTipDialog);
                    }
                })
            })
            if(hasFind){
                break;;
            }
        }
        
    }
}

var stopDoVoteJiaShiTip = function(){
    if(cc.sys.isObjectValid(MjClient.playui)){
        MjClient.playui.stopActionByTag(20191205);
        MjClient.playui.stopActionByTag(20191206)
    }
}

var findNodeByNameKey = function (node,keyValue,func) {
    var childrens = node.getChildren();
    if (childrens){
        for(var i in childrens){
            if(childrens[i].name && childrens[i].name.indexOf(keyValue) != -1){
                func(childrens[i]);
                return;
            }else{
                if (childrens[i].getChildren() && childrens[i].getChildren().length > 0){
                    findNodeByNameKey(childrens[i],keyValue,func);
                }
            }
        }
    }
}
//亲友圈房卡红包加时赛提示监听
var showRedPkgJiaShiTip = function(){
    if(!FriendCard_Common.isOpenForceMiankoujiashi()){
        return;
    }
    if(MjClient.data.sData && 
        MjClient.data.sData.tData.roundNum > 1){
        stopDoRedPkgJiaShiTip();
        return;
    }
    if(MjClient.data.sData && 
        ('extraNum' in MjClient.data.sData.tData) &&
        MjClient.data.sData.tData.extraNum > 1){
        stopDoRedPkgJiaShiTip();
        return;
    }
    if(MjClient.data.sData.tData.extraTimeType != 1){
        //类型1是加时红包赛，类型2是普通加时赛
        stopDoRedPkgJiaShiTip();
        return;
    }
    if(cc.sys.isObjectValid(MjClient.playui)){
        var action = cc.repeatForever(cc.sequence(cc.callFunc(function() {
            if (cc.sys.isObjectValid(MjClient.endoneui)){

                if(!cc.sys.isObjectValid(MjClient.endallui) && 
                    MjClient.data.sData && 
                    MjClient.data.sData.tData.roundNum <= 1 &&
                    ('extraNum' in MjClient.data.sData.tData) &&
                    MjClient.data.sData.tData.extraNum == 1){
                    MjClient._showJiaShiTip = true;
                }else{
                    stopDoRedPkgJiaShiTip();
                }
            }else{
                if (MjClient._showJiaShiTip) {
                    MjClient._showJiaShiTip = false;
                    var jiaShiTipDialog = new friendcard_redPackage_beginTip();
                    jiaShiTipDialog.zIndex = 10000;
                    MjClient.playui.addChild(jiaShiTipDialog);
                    stopDoRedPkgJiaShiTip();
                }
            }
        }), cc.delayTime(0.01)));
        action.setTag(20190726);
        stopDoRedPkgJiaShiTip();
        MjClient.playui.runAction(action);
    }
}
//亲友圈房卡红包加时赛提示取消监听
var stopDoRedPkgJiaShiTip = function(){
    
    if(cc.sys.isObjectValid(MjClient.playui)){
        MjClient.playui.stopActionByTag(20190726)
    }
}
//亲友圈房卡红包加时赛展示抢红包监听,推送触发
var showRedPackageStickDialog = function(){
    if(!FriendCard_Common.isOpenForceMiankoujiashi()){
        return;
    }
    if(cc.sys.isObjectValid(MjClient.playui)){
        var action = cc.repeatForever(cc.sequence(cc.callFunc(function() {
            if(cc.sys.isObjectValid(MjClient.endallui) &&
                !cc.sys.isObjectValid(MjClient.endoneui)){
                if(MjClient._isNeedShowFriendCardActRedPackage){
                    MjClient._isNeedShowFriendCardActRedPackage = false;
                    var redPackageDialog = new friendcard_redPackage_dialog();
                    redPackageDialog.zIndex = 10000;
                    MjClient.playui.addChild(redPackageDialog);
                    stopDoRedPkgJiaShiDialog();
                }
            }
        }), cc.delayTime(0.01)));
        action.setTag(20190727);
        stopDoRedPkgJiaShiDialog();
        MjClient.playui.runAction(action);
    }
}
//亲友圈房卡红包加时赛提示取消监听
var stopDoRedPkgJiaShiDialog = function(){
    if(cc.sys.isObjectValid(MjClient.playui)){
        MjClient.playui.stopActionByTag(20190727)
    }
}

//在红包局加时赛解散房间ui显示时提示
var dismissTipInRedPackageRoom = function(){
    if(!FriendCard_Common.isOpenForceMiankoujiashi()){
        return;
    }
    if(!MjClient.data.sData || !MjClient.data.sData.tData){return};
    if(MjClient.data.sData.tData.extraTimeType != 1){
        //类型1是红包加时赛，类型2是普通加时赛
        return;
    }
    if((('extraNum' in MjClient.data.sData.tData) &&
        MjClient.data.sData.tData.extraNum > 0)){
        MjClient.showToast("解散红包局，无法参与红包抽奖哦~")
    }
}


//普通加时赛投票view
var VoteJiaShiView = cc.Layer.extend({
    ctor:function () {
        this._super();
        var node;
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
            node = ccs.load("VoteExtraTimeGame_3.0.json").node;
        else
            node = ccs.load("VoteExtraTimeGame.json").node;
        this.addChild(node);
        MjClient.VoteJiaShiView = this;
        stopDoVoteJiaShiTip();
        var that = this;
        var _block = node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);
        var _panel = node.getChildByName("Panel");
        setWgtLayout(_panel,[1,1],[0.5,0.5],[0,0],false);
        var _back = _panel.getChildByName("back");
        this._back = _back;
        COMMON_UI.setNodeTextAdapterSize(node);
        var _time = _back.getChildByName("Text_time");
        this.showDelRoomCountdown(_time);

        //确定
        var _yes = _back.getChildByName("yes");
        this._btn_yes = _yes;
        _yes.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    this.sendChoice(1);
                    break;
                default :
                    break;
            }
        }, this);

        //取消
        var _no = _back.getChildByName("no");
        this._btn_no = _no;
        _no.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    this.sendChoice(0);
                    break;
                default :
                    break;
            }
        }, this);

        var _close = _back.getChildByName("close");
        this._close = _close;
        _close.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    this.removeFromParent();
                    break;
                default :
                    break;
            }
        }, this);
        if (!cc.sys.isObjectValid(MjClient.endoneui)){
            _close.setVisible(false);
        }
        UIEventBind(null, this, "voteExtraTime", function(rtn) {
            that.refreshUI();
        });
        UIEventBind(null, this, "initSceneData", function(rtn) {
            that._close.setVisible(false);
        });
        this.refreshUI()
        return true;
    },
    showDelRoomCountdown:function(node){
        var callback = function(){
            var sData =MjClient.data.sData;
            var tData = sData.tData;
            var dTime = tData.extraTimeVote.voteEndTime - (MjClient.timeBetween + new Date().getTime());
            var autoTime =  Math.floor(dTime/1000);
            if (autoTime <= 0) {
                node.setString("在0秒之后将自动拒绝");
                node.stopAllActions();
                return;
            }
            node.setString("在"+autoTime+"秒"+"之后将自动拒绝");
        };
        node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callback),cc.delayTime(1.0))));
    },
    sendChoice:function(voteStatus){
        MjClient.gamenet.request("pkroom.handler.tableMsg", { cmd: "voteExtraTime", vote:voteStatus});
        this._btn_yes.setVisible(false);
        this._btn_no.setVisible(false);
    },
    getStatusText:function(voteStatus){
        if(voteStatus == -1){
            return "等待选择";
        }
        if(voteStatus == 0){
            return "等待选择";
        }
        if(voteStatus == 1){
            return "同意";
        }
    },
    refreshUI:function(){
        var sData = MjClient.data.sData;
        if(!sData){
            this.removeFromParent();
            return;
        }
        var tData = sData.tData;
        if(!tData){
            this.removeFromParent();
            return;
        }
        if(tData.extraTimeVote.isEnd){
            this.removeFromParent();
            return;
        }
        //处理标题
        var textTitle = this._back.getChildByName("Text_title");
        var textDesc = this._back.getChildByName("Text_Desc");
        var localIndex = 0;
        this._isAllAgree = true;
        for(var i = 0 ; i < tData.uids.length; i++){
            var plDesText = this._back.getChildByName("player"+localIndex);
            var pl = sData.players[tData.uids[i]+""];
            var votePlData =  tData.extraTimeVote[tData.uids[i]];
            if(plDesText && pl && votePlData){
                if(votePlData.vote != 1){
                    this._isAllAgree = false;
                }
                plDesText.setVisible(true);
                plDesText.setString("玩家["+unescape(pl.info.nickname)+"]" + this.getStatusText(votePlData.vote));
                if(tData.uids[i] == MjClient.data.pinfo.uid){
                    textTitle.setString(votePlData.voteDesc.title+"");
                    textDesc.setString(votePlData.voteDesc.content+"");
                    if(votePlData.vote != -1){
                        this._btn_yes.setVisible(false);
                        this._btn_no.setVisible(false);
                    }else{
                        this._btn_yes.setVisible(true);
                        this._btn_no.setVisible(true);
                    }
                }
                localIndex++;
            }
        }
        for(var i = localIndex; i < 6; i++){
            var plDesText = this._back.getChildByName("player"+i);
            if(plDesText){
                plDesText.setVisible(false)
            }
        }
    }
});


//在比赛场房间UI内添加比赛场信息
var showMatchInfo = function(){
    if(!cc.sys.isObjectValid(MjClient.playui)){
        return;
    }
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid()];
    if (!(pl.info.matchUser && pl.info.matchUser.status == 1)) {
        //比赛场条件过滤
        return;
    }
    if (MjClient.getAppType() !== MjClient.APP_TYPE.QXYYQP &&
        MjClient.getAppType() !== MjClient.APP_TYPE.QXSYDTZ) {
        //只支持邵阳岳阳
        return;
    }

    var parent = MjClient.playui;
    var nodes = MjClient.playui.getChildren();
    if (nodes.length >= 1) {
        if(cc.sys.isObjectValid(nodes[0])){
            parent = nodes[0];
        }
    }
    var matchInfo = parent.getChildByName("matchInfo");
    if (!matchInfo) {
        matchInfo = new ccui.ImageView();
        matchInfo.loadTexture("res/friendCards_Match/img_matchInfoBg.png");

        var rank = new ccui.Text();
        rank.setFontName("fonts/lanting.ttf");
        rank.setString("排名:"+pl.info.matchUser.rank);
        rank.setColor(cc.color("#ffffff"));
        rank.setName("rank");
        rank.setFontSize(17);
        rank.setPosition(cc.p(60,44))
        matchInfo.addChild(rank)

        var score = new ccui.Text();
        score.setFontName("fonts/lanting.ttf");
        score.setString("积分:"+pl.info.matchUser.score);
        score.setColor(cc.color("#ffffff"));
        score.setName("score");
        score.setFontSize(17);
        score.setPosition(cc.p(60,18))
        matchInfo.addChild(score)
        matchInfo.setName("matchInfo");
        parent.addChild(matchInfo,0);
        matchInfo.setAnchorPoint(cc.p(0,1));
        matchInfo.setTouchEnabled(false);
    }

    var size = [0.09, 0.0902];
    if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG) {//麻将
        var Pos3d = [0,0.9];
        var Pos2d = [0, 1];
        var pos3dDiffMap = {//需要特殊调整3d位置的麻将
            //岳阳
            2017053 : [0.035,0.9],//ML_HONGZHONG 红中麻将
            2018108 : [0.035,0.9],//YUE_YANG_HONG_ZHONG 岳阳红中
            2018134 : [0.08,0.9],//AN_HUA_MA_JIANG 安化七王麻将
            2018144 : [0.08,0.9],//AN_HUA_MA_JIANG_SW 安化四王麻将
            2018151 : [0.1,0.9],// YUE_YANG_YI_JIAO_LAI_YOU 一脚赖油
            //邵阳
            2017037 : [0.037,0.9],//TY_HONGZHONG: 湖南通用红中麻将
            2018130 : [0.037,0.9],//HUAI_HUA_MA_JIANG:怀化麻将
            2017035 : [0.037,0.9],//LEI_YANG_GMJ:耒阳鬼麻将
            2017059 : [0.037,0.9],//JIANG_HUA_MJ,江华麻将
            2017052 : [0.037,0.9],//YONG_ZHOU_MJ:永州麻将
            2017061 : [0.037,0.9],//DAO_ZHOU_MJ:道州麻将
        }
        if(pos3dDiffMap[MjClient.gameType]){
            Pos3d = pos3dDiffMap[MjClient.gameType];
        }
        var pos2dDiffMap = {//需要特殊调整2d位置的麻将
            //邵阳
            2018130 : [0,0.9],//HUAI_HUA_MA_JIANG:怀化麻将
            2017035 : [0,0.9],//LEI_YANG_GMJ:耒阳鬼麻将
            2018127 : [0,0.9],//HENG_YANG_CHANG_SHA:衡阳长沙麻将
        }
        if(pos2dDiffMap[MjClient.gameType]){
            Pos2d = pos2dDiffMap[MjClient.gameType];
        }
        
        if(MjClient.playui.isNewFrameMaJiang){
        //新版麻将框架
            if(MjClient.playui.get3DType && MjClient.playui.get3DType()){
                setWgtLayout(matchInfo, size, Pos3d, [0, 0]);
            }else{
                setWgtLayout(matchInfo, size, Pos2d, [0, 0]);
            }
            
            UIEventBind(null, matchInfo, "switch2Dor3D",function(data) {
                if (data.is3D) {
                    setWgtLayout(matchInfo, size, Pos3d, [0, 0]);
                }else{
                    setWgtLayout(matchInfo, size, Pos2d, [0, 0]);
                }
            });
        }else{
            //旧版麻将框架
            var changeLayout = function(){
                if (COMMON_UI3D.is3DUI()) {
                  setWgtLayout(matchInfo, size, Pos3d, [0, 0]);
                }else{
                    setWgtLayout(matchInfo, size, Pos2d, [0, 0]);
                } 
            }
            changeLayout();
            UIEventBind(null, matchInfo, "changeMJBgEvent",function(data) {
                changeLayout();
            });
        }
        
    }else if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI || GameClass[MjClient.gameType] == MjClient.GAME_CLASS.CHANG_PAI){//字牌
        var updateLayout = function(){
            if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER){
                setWgtLayout(matchInfo, size, [0, 0.9], [0, 0]);
                return;
            }
            if (MjClient.playui.getLayoutType() == 0 && MjClient.data.sData.tData.maxPlayer < 4) {
                //偏右
                setWgtLayout(matchInfo, size, [0, 0.32], [0, 0]);
            }else{
                //传统
                setWgtLayout(matchInfo, size, [0.3, 0.9], [0, 0]);
            }
        };
        var specialPosMap = {
            2018128: [0, 0.5],// YUE_YANG_FU_LU_SHOU: 岳阳福禄寿
            2018163: [0, 0.5],// FU_LU_SHOU_ER_SHI_ZHANG:福禄寿20张
            2019211: [0, 0.4],//XU_PU_LAO_PAI淑浦老牌  邵阳(天天)
            2017060: [0.3, 0.9]//JIANG_YONG_15Z:江永15张
        }
        if(MjClient.playui.getLayoutType){//新版字牌
            updateLayout();
            UIEventBind(null, matchInfo, "EZP_layout",function(data) {
                updateLayout();
            });
        }else if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU||
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI){
            updateLayout = function(){
                if (ziPai.getUiLayoutType() == 0 && MjClient.data.sData.tData.maxPlayer < 4) {
                    //偏右
                    setWgtLayout(matchInfo, size, [0, 0.32], [0, 0]);
                }else{
                    //传统
                    setWgtLayout(matchInfo, size, [0.3, 0.9], [0, 0]);
                }
            };
            updateLayout();
            UIEventBind(null, matchInfo, "EZP_layout",function(data) {
                updateLayout();
            });            
        }else if(specialPosMap[MjClient.gameType]){
            setWgtLayout(matchInfo, size, specialPosMap[MjClient.gameType], [0, 0]);
        }else{
            matchInfo.visible = false;
        }
        
    }else if(gameListConfig_yueyang.pokerList.indexOf(MjClient.gameType) >= 0 ){//扑克
         var posMap = {
            2019205 : [0.46,0.98],// PAO_DE_KUAI_ELEVEN:跑得快11张
            2017036 : [0.46,0.98],//PAO_DE_KUAI_TY 通用跑得快
            2019256 : [0.18,0.96],//DOU_DI_ZHU_HBTY 通用斗地主
            2019257 : [0.18,0.96],//DOU_DI_ZHU_QC 蕲春斗地主
            2017034 : [0.18,0.96],//DOU_DI_ZHU_TY 通用斗地主
            2017042 : [0.36,0.98],//SAN_DA_HA 三打哈
            2018107 : [0.36,0.98],// YUE_YANG_SAN_DA_HA 岳阳三打哈
            2018145 : [0.18,0.98],// YUE_YANG_NIU_SHI_BIE 株洲牛十别
            2018152 : [0.01,0.9],//DIAN_TUO 掂坨
            2018153 : [0.08,0.9],//YUE_YANG_DA_ZHA_DAN,     //岳阳打炸弹
            2018155 : [0.17,0.9],//  YUE_YANG_YUAN_JIANG_QIAN_FEN 岳阳沅江千分
            2018159 : [0.18,0.98],//ZHU_ZHOU_DA_MA_ZI:株洲打码子
            2019187 : [0.36,0.98]// AN_DA_HA_NEW 新三打哈
        }
        if(posMap[MjClient.gameType]){
            setWgtLayout(matchInfo, size, posMap[MjClient.gameType], [0, 0]);
        }else{
            matchInfo.visible = false;
        }
    }else if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){  
        switch(GameClass[MjClient.gameType]){
            case MjClient.GAME_CLASS.PAO_DE_KUAI:
                setWgtLayout(matchInfo, size, [0.46,0.98], [0, 0]);
                break;
            case MjClient.GAME_CLASS.DOU_DI_ZHU:
                setWgtLayout(matchInfo, size, [0.18,0.96], [0, 0]);
                break;
            case MjClient.GAME_CLASS.SAN_DA_HA:
                setWgtLayout(matchInfo, size, [0.36,0.98], [0, 0]);
                break;
            case MjClient.GAME_CLASS.BAN_BIAN_TIAN_ZHA:
                setWgtLayout(matchInfo, size, [0.6,1], [0, 0]);
                break;
            case MjClient.GAME_CLASS.DA_TONG_ZI:
                setWgtLayout(matchInfo, size, [0,0.75], [0, 0]);
                break;
            default:
                matchInfo.visible = false;
                break;
        }
    }else{
        matchInfo.visible = false;
    }
}


//【CMS后台数据导出增加APP大厅用户点击行为统计需求】
var updateUserBehavior = function (sourceStr) {
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.updateUserBehavior",{source:sourceStr},function(rtn){
        cc.log("wxd pkplayer.handler.updateUserBehavior:"+JSON.stringify(rtn));
        MjClient.unblock();
        if(rtn.code == 0) {

        }else {
            //MjClient.showToast(rtn.message);
        }
    });
}

//统计新老UI
var uploadCurrentUIFunc = function (uiIndex) {
    cc.log("wxd4566464545654546"+uiIndex);
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.uploadCurrentUI", {uiIndex:uiIndex}, function(rtn)
    {
        if(rtn.code==0) {

        } else {
            if (!cc.isUndefined(rtn.message))
                MjClient.showMsg(rtn.message);
        }
        MjClient.unblock();
    });
}


// 装扮 数据 
var cosPlayTableInfo = function (node) {
    node.GZQY_tab = [{
          "length": 3,
          "bg_icon": 1,
          "1": "qy_32.png",
          "2": "qy_28.png",
          "3": "qy_17.png",
    }, {
          "length": 5,
          "bg_icon": 2,
          "1": "qy_33.png",
          "2": "qy_28.png",
          "3": "qy_17.png",
          "4": "qy_01.png",
          "5": "qy_20.png",
    }, {
          "length": 6,
          "bg_icon": 3,
          "1": "qy_34.png",
          "2": "qy_28.png",
          "3": "qy_16.png",
          "4": "qy_01.png",
          "5": "qy_21.png",
          "6": "qy_07.png",
    }, {
          "length": 7,
          "bg_icon": 4,
          "1": "qy_35.png",
          "2": "qy_28.png",
          "3": "qy_16.png",
          "4": "qy_01.png",
          "5": "qy_22.png",
          "6": "qy_08.png",
          "7": "qy_06.png",
    }, {
          "length": 8,
          "bg_icon": 5,
          "1": "qy_36.png",
          "2": "qy_28.png",
          "3": "qy_16.png",
          "4": "qy_01.png",
          "5": "qy_23.png",
          "6": "qy_09.png",
          "7": "qy_29.png",
          "8": "qy_05.png",
    }, {
          "length": 8,
          "bg_icon": 6,
          "1": "qy_37.png",
          "2": "qy_28.png",
          "3": "qy_18.png",
          "4": "qy_01.png",
          "5": "qy_24.png",
          "6": "qy_10.png",
          "7": "qy_31.png",
          "8": "qy_05.png",
    }, {
          "length": 9,
          "bg_icon": 7,
          "1": "qy_38.png",
          "2": "qy_28.png",
          "3": "qy_18.png",
          "4": "qy_01.png",
          "5": "qy_25.png",
          "6": "qy_11.png",
          "7": "qy_02.png",
          "8": "qy_05.png",
          "9": "qy_04.png",
    }, {
          "length": 10,
          "bg_icon": 8,
          "1": "qy_39.png",
          "2": "qy_28.png",
          "3": "qy_18.png",
          "4": "qy_01.png",
          "5": "qy_26.png",
          "6": "qy_12.png",
          "7": "qy_14.png",
          "8": "qy_05.png",
          "9": "qy_04.png",
          "10": "qy_41.png",
    }, {
          "length": 12,
          "bg_icon": 9,
          "1": "qy_40.png",
          "2": "qy_28.png",
          "3": "qy_19.png",
          "4": "qy_01.png",
          "5": "qy_27.png",
          "6": "qy_13.png",
          "7": "qy_30.png",
          "8": "qy_05.png",
          "9": "qy_04.png",
          "10": "qy_41.png",
          "11": "qy_03.png",
          "12": "qy_15.png",
    }];

    node.GZHD_tab = [{
          "img": "userInfo_3.0/guiZu/qy_32.png",
          "title": "每日登录经验",
          "gz_lv": 1,
          "hongdian": false,
          "opt": "lingqu",
          "status": 0,
          "isOpen": true,
          "desc": "贵族1的玩家，每日登录可以领取10点经验",
          "btn": ["userInfo_3.0/btn_lingqu.png", "userInfo_3.0/btn_lingqu.png", "userInfo_3.0/btn_yilingqu.png"]
    }, {
          "img": "userInfo_3.0/guiZu/qy_01.png",
          "title": "钻石任务",
          "gz_lv": 2,
          "hongdian": false,
          "opt": "licai",
          "status": 0,
          "isOpen": true,
          "desc": "贵族2的玩家，每日可以参与钻石任务活动，下注完成任务，次日获得瓜分钻石的权利。",
          "btn": ["userInfo_3.0//btn_licai.png", "userInfo_3.0//btn_licai.png"]
    }, {
          "img": "userInfo_3.0/guiZu/qy_05.png",
          "title": "祈福袋Lv1",
          "gz_lv": 5,
          "hongdian": false,
          "opt": "qifu1",
          "status": 0,
          "isOpen": true,
          "desc": "贵族5的玩家，可以进入祈福界面，开启祈福福袋，有机会开出各类装扮，乐币，钻石",
          "btn": ["userInfo_3.0//btn_qukankan.png", "userInfo_3.0//btn_qukankan.png"]
    }, {
          "img": "userInfo_3.0/guiZu/qy_04.png",
          "title": "祈福袋Lv2",
          "gz_lv": 7,
          "hongdian": false,
          "opt": "qifu2",
          "status": 0,
          "isOpen": true,
          "desc": "贵族7的玩家，可进入祈福界面，开启高级祈福，有机会开出高级装扮，乐币，钻石福利。",
          "btn": ["userInfo_3.0/btn_qukankan.png", "userInfo_3.0/btn_qukankan.png"]
    },
    /*{ // 贵族8的活动删除
          "img": "userInfo_3.0/guiZu/qy_41.png",
          "title": "专属客服1V1",
          "gz_lv": 8,
          "hongdian": false,
          "opt": "kefu",
          "status": 0,
          "isOpen": true,
          "desc": "贵族8的玩家，可获得专属客服1V1服务，优先接入客服专线，可直接获取客服人员个人联系方式",
          "btn": ["userInfo_3.0/bg_weixinhaoma.png", "userInfo_3.0/bg_weixinhaoma.png"],
          "btn2": ["userInfo_3.0/bg_dianhuahaoma.png", "userInfo_3.0/bg_dianhuahaoma.png"]
    },*/ 
    {
          "img": "userInfo_3.0/guiZu/qy_03.png",
          "title": "超幸运夺宝",
          "gz_lv": 9,
          "hongdian": false,
          "opt": "duobao",
          "status": 0,
          "isOpen": true,
          "desc": "贵族1的玩家钻石参与，贵族9的玩家乐币参与。专属大奖夺宝，不定期举行。奖品以大家电，手机为主。",
          "btn": ["userInfo_3.0/btn_qukankan.png", "userInfo_3.0/btn_qukankan.png"]
    }, {
          "img": "userInfo_3.0/guiZu/qy_15.png",
          "title": "节日关怀",
          "gz_lv": 9,
          "hongdian": false,
          "opt": "jieri",
          "status": 0,
          "isOpen": true,
          "desc": "贵族9的玩家，每当国家法定节日均可获得公司特殊的节日关怀。",
          "btn": ["userInfo_3.0/btn_qukankan.png", "userInfo_3.0/btn_qukankan.png"]
    }];

    node.Exp_tab = [300, 1000, 2000, 4000, 7000, 12000, 20000, 50000, 100000, 100000, 100000];

    node.LTBQ_tab = {
          "LTBQ1": "daxiao",
          "LTBQ2": "yihuo",
          "LTBQ3": "huaixiao",
          "LTBQ4": "yunle",
          "LTBQ5": "keshui",
          "LTBQ6": "weiqu",
          "LTBQ7": "aini",
          "LTBQ8": "jingle",
          "LTBQ9": "shiluo",
          "LTBQ10": "dengchang",
          "LTBQ11": "kuaidian",
          "LTBQ12": "zhenbang",
          "LTBQ13": "dacuopaile",
          "LTBQ14": "dalaozaici",
          "LTBQ15": "yiqifacai",
          "LTBQ16": "haixiu",
          "LTBQ17": "shanyaodengchang",
          "LTBQ18": "wolaile",
          "LTBQ19": "kuaidianba",
          "LTBQ20": "anzhongguancha",
          "LTBQ21": "ainio",
          "LTBQ22": "biepao",
          "LTBQ23": "yishoulanpai",
          "LTBQ24": "886",
          "LTBQ25": "shiliqiangmeibanfa",
          "LTBQ26": "daikouzhao",
          "LTBQ27": "qinxishou",

    }
    node.LTBQ_nameTab = {
          "LTBQ1": "大笑",
          "LTBQ2": "疑惑",
          "LTBQ3": "坏笑",
          "LTBQ4": "晕了",
          "LTBQ5": "瞌睡",
          "LTBQ6": "委屈",
          "LTBQ7": "爱你",
          "LTBQ8": "震惊",
          "LTBQ9": "失落",
          "LTBQ10": "登场",
          "LTBQ11": "快点",
          "LTBQ12": "真棒",
          "LTBQ13": "打错牌了",
          "LTBQ14": "大佬在此",
          "LTBQ15": "发财",
          "LTBQ16": "害羞",
          "LTBQ17": "闪耀登场",
          "LTBQ18": "我来了",
          "LTBQ19": "快点吧",
          "LTBQ20": "暗中观察",
          "LTBQ21": "爱你哦",
          "LTBQ22": "别跑",
          "LTBQ23": "烂牌",
          "LTBQ24": "886",
          "LTBQ25": "实力强",
          "LTBQ26": "戴口罩",
          "LTBQ27": "勤洗手",

    };
    node.HDDJ_tab = {
          "HDDJ1": "xueqiu",
          "HDDJ3": "rengpingzi",
          "HDDJ5": "hongbao",
          "HDDJ7": "huanggua",
          "HDDJ9": "chuizi",
          "HDDJ10": "jiubei",
          "HDDJ11": "dangao",
          "HDDJ13": "jiguanqiang",
          "HDDJ14": "qinwen",
          "HDDJ20": "zhusheqi",
    };
    node.RCDH_nameTab = {
          "RCDH1": "滑板车",
          "RCDH2": "摩托车",
          "RCDH3": "拖拉机",
          "RCDH4": "宝马",
          "RCDH5": "红旗",
          "RCDH6": "私人飞机",
          "RCDH7": "兔子舞",
          "RCDH8": "救护车",

    };

    node.RCDH_tab = {
          "RCDH1": "huabanxie",
          "RCDH2": "motuoche",
          "RCDH3": "tuolaji",
          "RCDH4": "baoma",
          "RCDH5": "hongqi",
          "RCDH6": "sirenfeiji",
          "RCDH7": "tuziwu",
          "RCDH8": "jiuhuche",
    };

    // 图片
    node.DTCJ_picTab = {
        "DTCJ100": "JZZT-NAN",

    };
    // 动画
    node.DTCJ_tab = {
        "DTCJ100": "zhongnanshan",
    };

};