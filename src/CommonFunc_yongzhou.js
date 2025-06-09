
/* ======================================
 *  放一些共用的方法
 *  ====================================== */

MjClient.MaxPlayerNum = 4;
MjClient.endoneui = null;
MjClient.lastCardposNode= null;
MjClient.createRoomLayer = null;

var ActionType =  //图片提示
    {
        CHI:1,
        PENG:2,
        GANG:3,
        TING:4,
        FLOWER:5,
        HU:6,
        QINGYISE:7,
        GANGKAI:8,
        QIDUI:9,
        DIHU:10,
        TIANHU:11,
        ZIMO:12,
        WANGZHUA:13,
        GENGZHUANG:14,
        LIANGPIAN:15,
        KAIGANG:16,
        BUGANG:17,
        WANGCHUANG:18,
        WANGDIAO:19
    };

//iphone x 作特殊适配
function isIPhoneX()
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

// ipad 作特殊适配
function isIpadSize() {
    var checkSize = function(width , height){
        return (width == cc.winSize.width || width == cc.winSize.height)
            &&  (height == cc.winSize.width || height == cc.winSize.height);
    }
    return checkSize(2048,1536) || checkSize(1024,768);
}


//ipad 作特殊适配
isIPad = function()
{
    var fator = 2048/1536;

    var currentFator = cc.winSize.width/cc.winSize.height;
    if(currentFator <= fator)
    {
        return true;
    }
    return false;
}


/*
 游戏场景ctor里调用，需要公共初始化的功能 by sking 2018.7.2
 */
initSceneFunc = function()
{
    /* 准备按钮的初始化*/
    MJ_setReadyBtn();

    /* 麻将起手听牌*/
    COMMON_UI.showStartHandTingCards();

    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
    {
        if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG)
        {
            cc.log("---------------initSceneFunc.....   -------");
            //触摸事件监听注册
            cc.eventManager.addListener(cc.EventListener.create(getTouchListener_MJ()),MjClient.playui.jsBind.eat._node);
        }
    }

    /*3d ,2d 效果切换的初始化*/
    if(COMMON_UI3D.isCanChangTo3D())
    {
        //东南西北转盘初始化
        COMMON_UI3D.InitSetArrowbk();


        COMMON_UI3D.addPlayingInfo();

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

                            if(isNeedShowTingCard())
                            {
                                COMMON_UI.showCurrentTingCards(_childrens[i]);
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

//点击当前这张牌是否需要提示，听那些牌
function isNeedShowTingCard()
{
    if(MjClient.clickTing ||
        MjClient.gameType == MjClient.GAME_TYPE.NAN_JING ||
        MjClient.gameType == MjClient.GAME_TYPE.XU_ZHOU ||
        MjClient.gameType == MjClient.GAME_TYPE.HA_14DUN ||
        MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
        MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA ||
        MjClient.gameType == MjClient.GAME_TYPE.HA_HONGZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.JIANG_HUA_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN ||
        MjClient.gameType == MjClient.GAME_TYPE.HZMJ ||
        MjClient.gameType == MjClient.GAME_TYPE.NTHZ ||
        MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.LEI_YANG_GMJ ||
        MjClient.gameType == MjClient.GAME_TYPE.XIN_NING_MA_JIANG
    )
    {
        return true;
    }
    return false;
}


/**
 * 根据人数对应偏移 ui传过来的off , 用于ui逻辑计算
 * @param  {number} off ui对应的位置 自己down:0 right:1 top:2 left:3
 * @return {number} 对应人数偏移后的off
 */
function getOffForPlayerNum(off)
{
    if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI
        || MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI
        || MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI
        || MjClient.gameType === MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA){

        if(MjClient.MaxPlayerNum == 2){
            if(1 == off) off = 2;
        }
        return off;
    }

    if (MjClient.gameType != MjClient.GAME_TYPE.HUAIAN_CC
        && MjClient.gameType != MjClient.GAME_TYPE.LEI_YANG_GMJ
        && MjClient.gameType != MjClient.GAME_TYPE.YONG_ZHOU_MJ
        && MjClient.gameType != MjClient.GAME_TYPE.JIANG_HUA_MJ
        && MjClient.gameType != MjClient.GAME_TYPE.TY_ZHUANZHUAN
        && MjClient.gameType != MjClient.GAME_TYPE.DAO_ZHOU_MJ
        && MjClient.gameType != MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG
        && MjClient.gameType != MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG
        && MjClient.gameType != MjClient.GAME_TYPE.TY_HONGZHONG
        && MjClient.gameType != MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG
        && MjClient.gameType != MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG
        && MjClient.gameType != MjClient.GAME_TYPE.AN_HUA_MA_JIANG
        && MjClient.gameType != MjClient.GAME_TYPE.CHANG_SHA
        && MjClient.gameType != MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA
        && MjClient.gameType != MjClient.GAME_TYPE.XIN_NING_MA_JIANG
        && MjClient.gameType != MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA
        && MjClient.gameType != MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA
        && MjClient.gameType != MjClient.GAME_TYPE.XU_PU_LAO_PAI
        && MjClient.gameType != MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI )
        return off;

    if(MjClient.MaxPlayerNum==2){
        if(1 == off) off = 2;
    }
    else if(MjClient.MaxPlayerNum==3){
        if(2 == off) off = 3;
    }
    return off
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
        length = 7;//默认名字限制6个字符
    }
    // if(length < 7)
    // {
    //     length  = 7;
    // }
    if(strlen >= length)
    {
        _newName =  name.substring(0,length - 1);
        _newName += "...";
        // cc.log("sking mystr =  " + _newName);
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

    if(strlen >= length )
    {
        _newName =  name.substring(0,length - 1);
        _newName += "...";
    }
    return _newName;
};



//裁剪字符串 超出以...表示
function sliceStrByLen (str,length) {
    var tempStr = str;
    var strlen = str.length;
    if(cc.isUndefined(length) || length == null)
    {
        return str;
    }
    if(strlen >= length)
    {
        tempStr =  tempStr.substring(0,length - 1);
        tempStr += "...";
        // cc.log("sking mystr =  " + _newName);
    }
    return tempStr;
};

function MJJiaZhuToServer(num){
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    cc.log("====================MJJiaZhuToServer=================");
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJJiazhu",
        jiazhuNum: num,
    });
}

// // 回放时，延时显示大结算
// function playBackDelayedOverView(self){
//     if(MjClient.rePlayVideo >= 0 && MjClient.replayui){ 
//         self.setVisible(false)
//         self.scheduleOnce(function(){
//             self.setVisible(true);
//         }.bind(self),0.8); // 回放时的延时处理
//     }
// }

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
    cc.log("====================MJGangToServer=================");
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

/*
 设置过胡的标识  by sking
 */
function setSkipHuState()
{
    if (MjClient.gameType != MjClient.GAME_TYPE.SHU_YANG)
    {
        var pl = getUIPlayer(0);
        cc.log("====================setSkipHuState=============== pl.skipHu = " + pl.skipHu);
        if ((cc.isArray(pl.skipHu) && pl.skipHu.length > 0) || !cc.isArray(pl.skipHu)){
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
    // if (MjClient.gameType == MjClient.GAME_TYPE.GAN_YU)//赣榆
    // {
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

    // }
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
    cc.log("====================MJPassConfirmToServer 11111 =================");
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

            MjClient.playui.jsBind.BtnPutCard._node.visible = true;
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
    cc.log("====================MJPengToServer=================");
    var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer(0);
    if(tData.areaSelectMode.bihuType && (pl.eatFlag & 8) &&
        (MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG) )
    {
        return MjClient.showToast("有胡必胡");
    }

    if(pl.mustHu){
        return MjClient.showToast("有胡必胡");
    }

    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJPeng",
        eatFlag: EatFlag()
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

//发送王抓命令道服务器
function MJWangZhuaToServer()
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    cc.log("====================MJWangZhuaToServer=================");
    var tData = MjClient.data.sData.tData;
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJWangZhua",
        card:tData.lastPutCard
    });
}

//发送掷骰子命令道服务器
function MJTouZiToServer()
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    cc.log("====================MJTouZiToServer=================");
    var tData = MjClient.data.sData.tData;
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJZhiTouZi",
        card:tData.lastPutCard
    });
}

function getPlayerIndex(off)
{
    if (MjClient.gameType == MjClient.GAME_TYPE.HUAIAN_CC ||
        MjClient.gameType == MjClient.GAME_TYPE.LEI_YANG_GMJ ||
        MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.JIANG_HUA_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN ||
        MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
        MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA ||
        MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA ||
        MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN ||
        MjClient.gameType === MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
        MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA ||
        MjClient.gameType == MjClient.GAME_TYPE.XIN_NING_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.XU_PU_LAO_PAI || 
        MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI ) {
        if(MjClient.MaxPlayerNum==2){
            if(1 == off) return null;
            if(3 == off) return null;
            if(2 == off) off = 1;
        }
        else if(MjClient.MaxPlayerNum==3){
            if(2 == off) return null;
            if(3 == off) off = 2;
        }
    }

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    // cc.log("getPlayerIndex33333333333333", off, SelfUid(), tData.uids.indexOf(SelfUid()),MjClient.MaxPlayerNum);
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

    cc.log("getUIPlayer====err=====", JSON.stringify(tData), index);

    return null;
}


/*
 @auther: by sking 2018.10.29
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

/*
 //比较两个版本字符串，version1>version2返回1，version1==version2返回0，version1<version2返回-1。
 function checkVersionString(version1, version2)
 {
 cc.log("checkVersionString >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> version1 = "+ version1);
 cc.log("checkVersionString >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> version2 = "+ version2);
 var result = 0;
 if (cc.isUndefined(version1) || cc.isUndefined(version2))
 {
 return result;
 }

 var version1Name = String(version1).split(".").join("");
 var version2Name = String(version2).split(".").join("");
 var version1Num = parseInt(version1Name);
 var version2Num = parseInt(version2Name);
 if (version1Num > version2Num)
 {
 result = 1;
 }
 else if (version1Num < version2Num)
 {
 result = -1;
 }

 return result;
 }


 //检查当前native版本是否大于等于targetVersion
 function isCurrentNativeVersionBiggerThan(targetVersion)
 {
 var available = true;
 var minNativeVersionName = targetVersion;
 var curNativeVersionName = MjClient.native.GetVersionName();
 if (checkVersionString(curNativeVersionName, minNativeVersionName) >= 0)
 {
 available = true;
 }
 else
 {
 available = false;
 }

 return available;
 }


 //检查当前res资源版本是否大于等于targetVersion
 function isCurrentResVersionBiggerThan(targetVersion)
 {
 var available = true;
 var minVersionName = targetVersion;
 var curVersionName = MjClient.resVersion;
 if (checkVersionString(curVersionName, minVersionName) >= 0)
 {
 available = true;
 }
 else
 {
 available = false;
 }

 return available;
 }
 */


// 更新wifi信号
function updateWifiState(node)
{
    var callback = function()
    {
        var _path = "playing/gameTable/";
        // 新版UIwifi图标
        if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) ||
            (!(MjClient.isInGoldField()&&MjClient.getGoldFiledType() == 1) &&MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ) ||
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
            _path = "playing/ziPaiBanner/";
        }

        if(COMMON_UI3D.is3DUI()) _path = "playing/gameTable/WIFI3D/";

        var ms = MjClient.reqPingPong / 1000.0;
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
    var sData = MjClient.data.sData;
    if(sData.tData.delEnd != 0 && !MjClient.delroomui)
    {
        MjClient.Scene.addChild(new RemoveRoomView(), 1);
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
        cc.log("----------setWxHead---------------"+d.uid);
        var sp = new cc.Sprite(d.img);
        sp.setName("WxHead");
        nobody.addChild(sp);
        setWgtLayout(sp, [0.91, 0.91], [0.5, 0.5], [0, 0], false, true);
    }
}



//设置玩家掉线头像
function setUserOffline(node, off)
{
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

    node.getChildByName("head").getChildByName("offline").y = 80;
    if(MjClient.getAppType() != MjClient.APP_TYPE.QXXXGHZ){
        node.getChildByName("head").getChildByName("offline").zIndex = 99;
    }
    node.getChildByName("head").getChildByName("offline").visible = !pl.onLine;
    if (pl.onLine == false && (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP))
    {
        var _offLineNode = node.getChildByName("head").getChildByName("offline");
        _offLineNode.unscheduleAllCallbacks();
        _offLineNode.schedule(function(){
            var _timeNode = _offLineNode.getChildByName("offLineTime");
            if (!_timeNode) {

                _timeNode = new ccui.Text();
                _timeNode.setName("offLineTime");
                _timeNode.setFontSize(26);
                _offLineNode.addChild(_timeNode)

                if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
                    _timeNode.setFontSize(30);
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
                _timeNode.setString(MjClient.dateFormat(new Date(_showTime),"mm:ss"));
            }
            else
            {
                _timeNode.setString("");
            }
        });
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
        var tData = MjClient.data.sData.tData;
        var _node = null;
        switch (off)
        {
            case 0:
                _node = MjClient.playui._downNode;
                cc.log("1----");
                break;
            case 1:
                cc.log("2----");
                _node = MjClient.playui._rightNode;
                break;
            case 2:
                cc.log("3----");
                _node = MjClient.playui._topNode;
                break;
            case 3:
                cc.log("4----");
                _node = MjClient.playui._leftNode;
                break;
            default:
                break;
        }
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
            if(((MjClient.gameType == MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO ||
                MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI ||
                MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
                MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI ||
                MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG ||
                MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI ||
                MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA ||
                // MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI ||
                // MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King ||
                // MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King ||
                // MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER ||
                // MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King ||
                // MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR ||
                // MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO ||
                // MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z ||
                MjClient.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI) && MjClient.data.sData.tData.maxPlayer == 2) ||
                (MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN && MjClient.MaxPlayerNum_xiangxiang == 2)) {
                switch (off)
                {
                    case 0:
                        _node = MjClient.playui._downNode;
                        cc.log("1----");
                        break;
                    case 1:
                        cc.log("2----");
                        _node = MjClient.playui._topNode;
                        break;
                    case 2:
                        cc.log("3----");
                        _node = MjClient.playui._rightNode;
                        break;
                    default:
                        break;
                }
            }
        }
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU && MjClient.data.sData.tData.maxPlayer == 2){
            switch (off)
            {
                case 0:
                    _node = MjClient.playui._downNode;
                    break;
                case 1:
                    _node = MjClient.playui._topNode;
                    break;
                default:
                    break;
            }
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO && MjClient.MaxPlayerNum_paohuzi == 4 ||
            MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z && MjClient.MaxPlayerNum_paohuzi == 4 ||
            MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG && MjClient.data.sData.tData.maxPlayer == 4 ||
            MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI && MjClient.data.sData.tData.maxPlayer == 4 ||
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU && MjClient.data.sData.tData.maxPlayer == 4 ||
            MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA && MjClient.MaxPlayerNum_xiangxiang === 4 ||
            MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA && MjClient.MaxPlayerNum_xiangxiang === 4 ||
            MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR && MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King && MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            switch (off)
            {
                case 0:
                    _node = MjClient.playui._downNode;
                    cc.log("1----");
                    break;
                case 1:
                    cc.log("2----");
                    _node = MjClient.playui._xingNode;
                    break;
                case 2:
                    cc.log("3----");
                    _node = MjClient.playui._rightNode;
                    break;
                case 3:
                    cc.log("4----");
                    _node = MjClient.playui._topNode;
                    break;
                default:
                    break;
            }
        }
        if((MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King) &&
            MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ)
        {
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
                    cc.log("1----");
                    break;
                case 2:
                    cc.log("2----");
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
                    cc.log("3----");
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
                    cc.log("4----");
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

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) {
            if(((MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA || MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG)
                && MjClient.MaxPlayerNum_leiyang == 2)) {
                switch (off)
                {
                    case 0:
                        _node = MjClient.playui._downNode;
                        cc.log("1----");
                        break;
                    case 1:
                        cc.log("2----");
                        _node = MjClient.playui._topNode;
                        break;
                    default:
                        break;
                }
            }
        }
        return _node;
    }

    //fix新版字牌
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

    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
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
            firstFrame.runAction(cc.sequence(move, playSoundFunc, animate,cc.removeSelf()));

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
            firstFrame.runAction(cc.sequence(move, cc.delayTime(0.1),playSoundFunc, animate,cc.removeSelf()));

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
            firstFrame.runAction(cc.sequence(move, playSoundFunc, animate,cc.removeSelf()));

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
            firstFrame.runAction(cc.sequence(move, cc.delayTime(0.1),playSoundFunc, animate,cc.removeSelf()));

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
            firstFrame.runAction(cc.sequence(move, cc.delayTime(0.1),playSoundFunc, animate,cc.removeSelf()));
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
            firstFrame.runAction(cc.sequence(move, cc.delayTime(0.1),playSoundFunc, animate,cc.removeSelf()));
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
            firstFrame.runAction(cc.sequence(move, playSoundFunc, animate,cc.removeSelf()));
            break;
        default:
            break;

    }
    
    firstFrame.setPosition(StarNode.getPosition());

    firstFrame.setScale(MjClient.size.height/800);

    _AniNode.addChild(firstFrame,10000);




}


//显示玩家信息
function showPlayerInfo(off, node)
{
    //var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer(off);
    if(pl)
    {
        cc.log("pl data == " + JSON.stringify(pl));
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
    node.zIndex = 100;
    if(tData && pl)
    {
        if(tData.uids[tData.zhuang] == pl.info.uid)
        {
            node.visible = true;
            var linkZhuang = node.getChildByName("linkZhuang");
            var path = "playing/gameTable/shuzi/shuzi_" + pl.linkZhuang + ".png";
            //cc.log("path = " + path);
            linkZhuang.loadTexture(path);
            // var isVisible = (tData.gameType == MjClient.GAME_TYPE.SHEN_YANG);
            // linkZhuang.setVisible(isVisible);
        }
        else
        {
            node.visible = false;
        }
    }
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
            var imgSrc = "playing/gameTable/fangzhu.png";
            var tx = node.getContentSize().width - 7;
            var ty = 17;
            cc.log("=============head:" + MjClient.gameType);
            if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI||
                MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI){
                imgSrc = "playing/gameTable/fangzhu2.png";
                tx = 37;
                ty = node.height - 22;
            }
            else if(MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG ||
                MjClient.gameType == MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA ||
                MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO ||
                MjClient.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN){
                imgSrc = "daTongZi/playing/fang.png";
                ty = node.height - 20;
            }
            else if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA ||
                MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA ||
                MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA  ){
                imgSrc = "playing/gameTable/fangzhu3.png";
                tx = 40;
                ty = node.getContentSize().height - 17;
            }
            else if (MjClient.gameType == MjClient.GAME_TYPE.XU_PU_LAO_PAI) {
                imgSrc = "playing/ziPaiBanner/fangzhu.png";
                tx = node.getContentSize().width - 15;
                ty = node.height - 40;
            }


            var sp = new cc.Sprite(imgSrc);
            sp.setPosition(tx, ty);
            sp.setAnchorPoint(1,0);
            sp.setName("fangTag");
            if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA||
                MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA ||
                MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA ||
                MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI)
            {
                sp.scale = 1.2;
            }
            node.addChild(sp);
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
    if (getCurrentMJBgType() == 0)
        offSets = [[50, 90], [60, 70], [50, 90], [60, 70], [48, 62], [53, 65]];
    else
        offSets = [[52, 100], [60, 70], [52, 100], [60, 70], [50, 66], [53, 65]];
    var offHunSet = [[50 + 10, 90 + 17], [52, 70], [50 - 10, 84], [60 + 14, 68], [48 + 13, 62 + 16], [48 + 13, 62 + 16]];

    if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
        if(getCurrentMJBgType() == 3){
            offSets = [[52, 104], [65, 68], [52, 104], [65, 68], [50, 66], [53, 65], [19, 25]];
        }
    }

    //麻将的底牌公用图，4张
    var isChange = false;
    if(off == 5 && MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ
        && (MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG
        || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA))
    {
        // 出牌放大设置的5 找不到资源 off = 4；
        isChange = true;
        off = 4;
    }
    node.loadTexture(getNewMJBgFile("playing/MJ/Mj_up_" + off + ".png"));
    if(isChange)
    {
        off = 5;
    }
    //
    // if (off != 0 && off != 1 && off != 2 && off != 3 && off != 4) {
    // 	cc.log("off = " + off);
    // }


    var imgNode = new ccui.ImageView();
    if(off == 4 || off == 5)
    {
        // img.scaleX = 0.7;
        // img.scaleY = 0.7;
    }
    else
    {
        imgNode.setRotation(-90 * (off));
        // img.scaleX = 0.35;
        // img.scaleY = 0.35;
    }
    cc.log("cur player idnex:" + off);
    imgNode.setPosition(offSets[off][0], offSets[off][1]);
    imgNode.setName("imgNode");
    node.removeAllChildren();
    node.addChild(imgNode,10);


    //add by sking
    //如果是混牌，即白搭,癞子
    if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && (MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG)){
        if(MjClient.majiang.isHunCard && MjClient.majiang.isHunCard(cd, MjClient.data.sData.tData.hunCard)){
            var _zorder  = 11;
            var imgBaiDaNode = new ccui.ImageView();
            imgBaiDaNode.setName("imgBaiDa");
            imgBaiDaNode.setPosition(offHunSet[off][0], offHunSet[off][1]);
            if (off != 5){
                imgBaiDaNode.setRotation(-90 * (off));
            }

            imgBaiDaNode.loadTexture("playing/MJ/gong.png");
            // imgBaiDaNode.setPosition(offHunSet[off][0] + _off[off][0], offHunSet[off][1] + _off[off][1]);
            node.addChild(imgBaiDaNode,_zorder);
        }
    }else if(MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG){
        var _zorder  = 11;
        var imgBaiDaNode = new ccui.ImageView();
        imgBaiDaNode.setName("imgBaiDa");
        imgBaiDaNode.setPosition(offHunSet[off][0], offHunSet[off][1]);
        if (off != 5){
            imgBaiDaNode.setRotation(-90 * (off));
        }
        //安化麻将上面展示的王牌如果是四王玩法则显示翻
        if(arguments[3] == true && MjClient.data.sData.tData.areaSelectMode.kingNum == 4){
            imgBaiDaNode.loadTexture("playing/MJ/fan.png");
        }

        if(MjClient.majiang.isHunCard && MjClient.majiang.isHunCard(cd, MjClient.data.sData.tData.hunCard)){
            imgBaiDaNode.loadTexture("playing/MJ/wangzi.png");
        }
        node.addChild(imgBaiDaNode,_zorder);

    }else if(MjClient.gameType == MjClient.GAME_TYPE.LEI_YANG_GMJ && MjClient.majiang.isHunCard(cd, MjClient.data.sData.tData.hunCard)){
        var _zorder  = 11;
        var imgBaiDaNode = new ccui.ImageView();
        imgBaiDaNode.setName("imgBaiDa");
        imgBaiDaNode.setPosition(offHunSet[off][0], offHunSet[off][1]);
        imgBaiDaNode.loadTexture("playing/MJ/gui.png");
        if (off == 5)
        {
            imgBaiDaNode.scaleX = node.width / imgBaiDaNode.width * 0.8;
            imgBaiDaNode.scaleY = node.height / imgBaiDaNode.height * 0.9;
            imgBaiDaNode.x = node.width/2;
            imgBaiDaNode.y = node.height/2;
        }
        node.addChild(imgBaiDaNode,_zorder);

    }else if(MjClient.data.sData.tData.hunCard && MjClient.data.sData.tData.hunCard == cd){
        var _zorder  = 11;
        var imgBaiDaNode = new ccui.ImageView();
        imgBaiDaNode.setName("imgBaiDa");
        imgBaiDaNode.setPosition(offHunSet[off][0], offHunSet[off][1]);

        if (off != 5)
            imgBaiDaNode.setRotation(-90 * (off));

        if (MjClient.gameType == MjClient.GAME_TYPE.HA_HONGZHONG ||
            MjClient.gameType == MjClient.GAME_TYPE.HZMJ ||
            MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG ||
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG ||
            MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.NTHZ ||
            MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN ||
            MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG) {
            imgBaiDaNode.loadTexture("playing/MJ/gong.png");
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.SU_QIAN)
        {
            imgBaiDaNode.loadTexture("playing/MJ/gong1.png");
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.JIANG_HUA_MJ ||MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ)
        {
            imgBaiDaNode.loadTexture("playing/MJ/gui.png");
            if (off == 5)
            {
                imgBaiDaNode.scaleX = node.width / imgBaiDaNode.width * 0.8;
                imgBaiDaNode.scaleY = node.height / imgBaiDaNode.height * 0.9;
                imgBaiDaNode.x = node.width/2;
                imgBaiDaNode.y = node.height/2;
            }
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.XU_ZHOU)
        {
            _zorder = 1;
            imgBaiDaNode.loadTexture("playing/MJ/peizi.png");
            var _off = [[-10, -12], [10,-6], [10, 11], [-10, 0], [-11, -10]];
            if(off == 1 || off == 3)
            {
                imgBaiDaNode.setScaleX(0.9);
            }

            imgBaiDaNode.setPosition(offHunSet[off][0] + _off[off][0], offHunSet[off][1] + _off[off][1]);
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.SI_YANG_HH || MjClient.gameType == MjClient.GAME_TYPE.YAN_CHENG_HH)
        {
            imgBaiDaNode.loadTexture("playing/MJ/peizi.png");
        }
        cc.log("--------------off = " + off);

        node.addChild(imgBaiDaNode,_zorder);
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

    node.tag = cd;

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
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
        imgNode.setScale(1.2);

    if (getCurrentMJBgType() != 0) {
        // 左右两侧的牌偏大，特殊处理，缩小
        if (off == 1 || off == 3) {
            if (MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP )
                imgNode.setScale(1.0);
            else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
                imgNode.setScale(0.95);
            else
                imgNode.setScale(0.8);
        }

    }
    else {
        // 左右两侧的牌偏大，特殊处理，缩小
        if (off == 1 || off == 3) {
            if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
                imgNode.setScale(0.95);
        }
    }

    schedulePlayMoveCardOtherSameCardGrey(node);

    node.off = off;
    setMJDif(node);

    // var callback = function()
    // {
    // 	//加载小图
    // 	imgNode.loadTexture(path + imgName + ".png");
    // };
    //
    // node.stopAllActions();
    // node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callback), cc.delayTime(1))));
}

function schedulePlayMoveCardOtherSameCardGrey(card)
{
    if (card.name == "chi" || card.name == "peng" || card.name == "out"  || card.name == "outout")
    {
        card.schedulePlayMoveCardOtherSameCardGreyFunction = function () {
            if (!(MjClient.movingCard) && card.moveTag) {
                card.setColor(cc.color(255, 255, 255));
                card.moveTag = false;
            }
            else if (MjClient.movingCard &&
                cc.sys.isObjectValid(MjClient.movingCard) &&
                cc.sys.isObjectValid(card) &&
                MjClient.movingCard.tag == card.tag &&
                !card.moveTag &&
                cc.colorEqual(card.getColor(), cc.color(255, 255, 255))
            ){
                card.moveTag = true;
                card.setColor(cc.color(170, 170, 170));
            }
            if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)//邵阳提起的牌也要提示
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
        }
        card.schedule(card.schedulePlayMoveCardOtherSameCardGreyFunction);
    }
}

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

    if(MjClient.gameType == MjClient.GAME_TYPE.XU_ZHOU || MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.JIANG_HUA_MJ){
        var card = tData.lastPutCard;
        var path = "playing/MJ/White.png";
        if(MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ || MjClient.gameType == MjClient.GAME_TYPE.JIANG_HUA_MJ){
            path = "playing/MJ/Red.png";
        }
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
                if(card == 71 && (MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ || MjClient.gameType == MjClient.GAME_TYPE.JIANG_HUA_MJ)){
                    //红中可以当作癞子原本拿张牌用
                    card =  tData.hunCard;
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
                if(card == 71 && (MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ || MjClient.gameType == MjClient.GAME_TYPE.JIANG_HUA_MJ)){
                    //红中可以当作癞子原本拿张牌用
                    card =  tData.hunCard;
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
                if(card == 71 && (MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ || MjClient.gameType == MjClient.GAME_TYPE.JIANG_HUA_MJ)){
                    //红中可以当作癞子原本拿张牌用
                    card =  tData.hunCard;
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

    if(eat.gang0 && eat.gang0._node.visible)
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

    if(eat.zhua && eat.zhua._node.visible){
        eatFlag = eatFlag + 16;
    }

    if((MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG || MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG)
        && eat.touzi && eat.touzi._node.visible){
        eatFlag = eatFlag + 16;
    }
    mylog("eatFlag-------------" + eatFlag)
    return eatFlag;
}

//这里应该是在netcbalck里设置是否听的状态，不能用渲染来控制
function GetReadyVisible(node, off) {
    if(MjClient.playui.GetReadyVisible) return MjClient.playui.GetReadyVisible(node, off);

    if (off < 0) {
        node.visible = false;
        return false;
    }


    var sData = MjClient.data.sData;
    var tData = sData.tData;

    //霸炸弹随机分组时 第一局不显示准备
    if(MjClient.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN){
        if ((tData.tState == TableState.waitJoin || tData.tState == TableState.waitReady) &&
            (tData.maxPlayer == 4 && tData.areaSelectMode.isDivideTeam && tData.areaSelectMode.isRandomTeam)) {
            if(tData.roundAll == tData.roundNum){
                node.visible = false;
                return false;
            }
        }
    }


    if (Object.keys(sData.players).length < tData.maxPlayer) {
        node.visible = false;
        return false;
    }

    var pl = getUIPlayer(off);
    if (pl && pl.mjState == TableState.isReady && tData.tState != TableState.waitJoin) {
        node.visible = true;
    } else {
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
    var showJinBi = tData.fieldId;
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
            jinbiIcon.setPosition(coin.getPositionX()-50, coin.getPositionY());
            jinbiIcon.setName("jinbiIcon");
            node.getChildByName("head").addChild(jinbiIcon);
        }
        if (!jinbi){
            jinbi = new ccui.Text();

            jinbi.setFontSize(20);
            jinbi.setAnchorPoint(0.5,0.5);
            var coin = node.getChildByName("head").getChildByName("coin");
            jinbi.setPosition(coin.getPositionX()+5, coin.getPositionY());
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
                                var _nameStr = unescape(pl.info.nickname);
                                return getNewName(_nameStr,5);
                            }
                        },
                    coin:
                        {
                            _visible:function(){
                                if(showJinBi){
                                    return false
                                }
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
    name.ignoreContentAdaptWithSize(false);

    BindUiAndLogic(node, bind);

    // 邵阳玩家昵称字体较大，需要处理下
    if ((GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI|| GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU)&&
        (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ))
    {
        var head_bottom = node.getChildByName("head").getChildByName("head_bottom");
        var bottomWidth = Math.max(name.getAutoRenderSize().width,115);
        bottomWidth = Math.min(bottomWidth,150);
        head_bottom.setSize(cc.size(bottomWidth, head_bottom.getContentSize().height));
    }

}

//初始化花的信息
function initFlower(isNormalVisible, isZfbVisible)
{

    var jsBind=MjClient.playui.jsBind;
    var ui=[jsBind.down,jsBind.right,jsBind.top,jsBind.left];
    cc.log("------------------isNormalVisible=" + isNormalVisible + "--------------------------isZfbVisible" + isZfbVisible + ui);

    for(var i = 0; i < 4; i++)
    {
        var parent0 = ui[i]._node.getChildByName("head").getChildByName("flower_layout");
        if(parent0)
        {
            parent0.setVisible(isNormalVisible);
        }
        var parent1 = ui[i]._node.getChildByName("head").getChildByName("flower_zfb_layout");
        if(parent1)
        {
            parent1.setVisible(isZfbVisible);
        }
    }
}


//播放头像移动
function tableStartHeadMoveAction(node)
{
    cc.log("-----------------set head position ------");
    var down = node.getChildByName("down").getChildByName("head");
    var top = node.getChildByName("top").getChildByName("head");
    var left = node.getChildByName("left").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");
    var _sc = 0.13;
    if(isIPad()) _sc = 0.085;
    InitHeadPostionPlaying(node);

    var downPoint = cc.p(down.x, down.y);
    var topPoint = cc.p(top.x, top.y);
    var rightPoint = cc.p(right.x, right.y);
    var leftPoint = cc.p(left.x, left.y);

    setWgtLayout(down, [_sc, _sc], [0.5, 0.5], [0, -2], false, false);
    setWgtLayout(top, [_sc, _sc], [0.5, 0.5], [0, 2.1], false, false);
    setWgtLayout(left, [_sc, _sc], [0.5, 0.5], [-3, 0.1], false, false);
    setWgtLayout(right, [_sc, _sc], [0.5, 0.5], [3, 0.1], false, false);
    down.runAction(cc.moveTo(0.3, downPoint).easing(cc.easeCubicActionOut()));
    top.runAction(cc.moveTo(0.3, topPoint).easing(cc.easeCubicActionOut()));
    left.runAction(cc.moveTo(0.3, leftPoint).easing(cc.easeCubicActionOut()));
    right.runAction(cc.moveTo(0.3, rightPoint).easing(cc.easeCubicActionOut()));

    sendGPS();
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
    cc.log("==================msg = " + msg);
    SendChat(SelfUid(), 4, msg, 0);
}

function SendChat(uid,type,msg,num){ //广播消息
    // MjClient.showMsg("uid="+uid+"  type="+type+"   msg="+msg+"  num="+num);
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    MjClient.gamenet.request("pkroom.handler.tableMsg",{cmd:"MJChat",uid:uid ,type:type,msg:msg ,num:num  });
}



function InitHeadPostionPlaying(node)
{
    if(COMMON_UI3D.is3DUI()) return COMMON_UI3D.InitHeadPostionPlaying();
    if(!node) node = getNode(0).getParent();
    var downHead = node.getChildByName("down").getChildByName("head");
    var topHead = node.getChildByName("top").getChildByName("head");
    var leftHead = node.getChildByName("left").getChildByName("head");
    var rightHead = node.getChildByName("right").getChildByName("head");
    var _sc = 0.13;
    if(isIPad()) _sc = 0.085;

    setWgtLayout(downHead, [_sc, _sc], [0, 0], [0.6, 2.8], false, false);
    setWgtLayout(leftHead, [_sc, _sc], [0, 0.5], [0.6, 2.35], false, false);
    setWgtLayout(topHead, [_sc, _sc], [0, 1], [3.8, -0.65], false, false);
    setWgtLayout(rightHead, [_sc, _sc], [1, 0.5], [-0.6, 1.7], false, false);

    if (MjClient.MaxPlayerNum === 2 &&
        MjClient.gameType === MjClient.GAME_TYPE.DAO_ZHOU_MJ ||
        MjClient.gameType === MjClient.GAME_TYPE.TY_HONGZHONG ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG ||
        MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG ||
        MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG) {
        setWgtLayout(topHead, [_sc, _sc], [0, 1], [3.1, -0.65], false, false);
    }

    if(isIPhoneX()) {
        node.getChildByName("left").x = cc.winSize.width * 0.05;
        setWgtLayout(downHead,[0.13, 0.13], [0.08, 0], [0.1, 2.8], false, false);
    }else if(isIPad()){
        setWgtLayout(topHead, [_sc, _sc], [0, 1], [2.8, -0.65], false, false);
    }
}

//重置4家头像位置
function reConectHeadLayout(node)
{
    var tData = MjClient.data.sData.tData;
    var down = node.getChildByName("down").getChildByName("head");
    var top = node.getChildByName("top").getChildByName("head");
    var left = node.getChildByName("left").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");

    resetEatActionAnim();
    if(tData.tState == TableState.waitJoin || tData.tState == TableState.waitReady || tData.tState == TableState.roundFinish)
    {
        setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [0, -2.2], false, false);
        setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [0, 2.6], false, false);
        setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-4.8, 0.1], false, false);
        setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [4.8, 0.1], false, false);
        initFlower(false, false);

        if(MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ && isIpadSize()){      //湘乡告胡子APP添加ipad适配
            setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-4.5, 0.1], false, false);
            setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [4.5, 0.1], false, false);
        }else if(isIPad()){
            setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-3.2, 0.1], false, false);
            setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [3.2, 0.1], false, false);
        }
    }
    else
    {
        InitHeadPostionPlaying(node);
        resetFlowerNum(node);
        resetJiaZhuNum(node);
    }
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
    if(!MjClient.data.sData)return;
    var tData = MjClient.data.sData.tData;

    var off = getOffByIndex(tData.curPlayer);
    if(nextPlayer != null && !cc.isUndefined(nextPlayer) )
        off = getOffByIndex(nextPlayer);

    setArrowFengDir(arrowbkNode);

    // var off = getOffByIndex(tData.curPlayer);
    var arrow = arrowbkNode.getChildByName("arrow");
    var arrow_2 = arrowbkNode.getChildByName("arrow_2");
    var arrow_3 = arrowbkNode.getChildByName("arrow_3");
    var arrow_4 = arrowbkNode.getChildByName("arrow_4");
    arrow.setVisible(false);
    arrow_2.setVisible(false);
    arrow_3.setVisible(false);
    arrow_4.setVisible(false);
    arrow.runAction(cc.sequence(cc.FadeIn(0.75), cc.FadeOut(0.75)).repeatForever());
    arrow_2.runAction(cc.sequence(cc.FadeIn(0.75), cc.FadeOut(0.75)).repeatForever());
    arrow_3.runAction(cc.sequence(cc.FadeIn(0.75), cc.FadeOut(0.75)).repeatForever());
    arrow_4.runAction(cc.sequence(cc.FadeIn(0.75), cc.FadeOut(0.75)).repeatForever());
    cc.log("== off 1111111111111 == " + off);


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
            arrow_4.stopAllActions();
            arrow_2.stopAllActions();
            arrow_3.stopAllActions();
            arrow.setVisible(true);
            break;
    }


    //刷新东南西北的方向 dir_curr: 为了标记3D的方位旋转角度和颜色指示
    if(COMMON_UI3D.is3DUI())
    {
        var winRight = arrowbkNode.getChildByName("dir_right");
        var winDown = arrowbkNode.getChildByName("dir_down");
        var winLeft = arrowbkNode.getChildByName("dir_left");
        var winUp = arrowbkNode.getChildByName("dir_up");
        var textArr = [winDown, winRight, winUp, winLeft];
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

    var winobjArr = [winDown, winRight, winUp, winLeft];

    var temp = 0;
    // 2人 游戏时， 两家固定是东和西
    if(2 == MjClient.MaxPlayerNum && 1 == selfIndex)
    {
        selfIndex = 2;
    }

    for (var i = selfIndex; i < selfIndex + 4; i++)
    {
        var index = i % 4;

        if(winobjArr[temp])
        {
            // cc.log("这是我的selfIndex" + index);
            winobjArr[temp].loadTexture(path_normal + index + ".png");

            temp++;
        }

    }
}


// function resetSelectNode(node,off)
// {
// 	var playState = node.getChildByName("head").getChildByName("play_state");
// 	if(playState)
// 	{
// 		playState.visible = false;
// 	}
// }


function GetUIBind(uidPos, offStore)
{
    var uiOff = getOffByIndex(uidPos);
    if (offStore)
        offStore.push(uiOff);
    var jsBind = MjClient.playui.jsBind;
    var ui = [jsBind.down, jsBind.right, jsBind.top, jsBind.left];
    return ui[uiOff];
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
    if (MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ &&
        MjClient.gameType != MjClient.GAME_TYPE.NAN_JING &&
        MjClient.gameType != MjClient.GAME_TYPE.SI_YANG &&
        MjClient.gameType != MjClient.GAME_TYPE.XIN_SI_YANG &&
        MjClient.gameType != MjClient.GAME_TYPE.HA_14DUN &&
        MjClient.gameType != MjClient.GAME_TYPE.HUAIAN_CC &&
        MjClient.gameType != MjClient.GAME_TYPE.LIAN_YUN_GANG &&
        MjClient.gameType != MjClient.GAME_TYPE.SU_QIAN &&
        MjClient.gameType != MjClient.GAME_TYPE.XU_ZHOU &&
        MjClient.gameType != MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
    {
        return;
    }

    var offSets = [[50, 90], [60, 70], [50, 90], [60, 70], [48, 62]];
    var arrow = new cc.Sprite("playing/other/arrow.png");
    arrow.setScale(1.2);
    arrow.setPosition(offSets[off][0], offSets[off][1]);
    arrow.setName("arrow");
    node.addChild(arrow,12);

    // 2人 3人 游戏
    if(MjClient.MaxPlayerNum==2){
        offIdx = 1;
    }
    else if(MjClient.MaxPlayerNum==3){
        if(0 == off && 1 == offIdx) offIdx = 2;
        else if(1 == off && 0 == offIdx) offIdx = 1;
        else if(1 == off && 1 == offIdx) offIdx = 2;
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
    var _downNode = getNode(0);
    var _cpnode = _downNode.getChildByName("stand");
    var children = _downNode.children;
    for(var i = 0; i < children.length; i++)
    {
        if(children[i].name == "mjhand")
        {
            setCardSprite(children[i], children[i].tag, 4);//by sking 2018,,1,13
            //children[i].loadTexture(getNewMJBgFile("playing/MJ/Mj_up_4.png"));
            children[i].setScale(_cpnode.getScale()*1.30);
        }
    }
    MjClient.movingCard = null;
}




function getNewCard(node, copy, name, tag, off, specialTAG)
{
    if(MjClient.playui.getNewCard) return MjClient.playui.getNewCard(node, copy, name, tag, off, specialTAG);

    // cc.log("1111111111111111111111111新牌", copy, name, tag, off);
    var cpnode = node.getChildByName(copy);
    var cp = cpnode.clone(); //克隆一个白板，上面没有任何条纹的麻将 ，by sking

    if (name == "mjhand")
    {
        cp.setScale(cp.getScale()*1.30);
    }
    else
    {
        cp.setScale(cp.getScale()*1.15);
    }
    cp.visible = true;
    cp.name = name;

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
        cp.loadTexture(cpnode.getRenderFile().file);
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
    var carNumNode = MjClient.playui._tingCardNumNode;
    carNumNode.visible = false;
    var cardTextNode = carNumNode.getChildByName("showNode");
    cardTextNode.visible = false;

    var BindingNode = carNumNode.getChildByName("Node_card");
    BindingNode.removeAllChildren(true);
}

function setCurrentTingNum(tingSet)
{
    var tData = MjClient.data.sData.tData;
    if ("isOpenTingTip" in tData.areaSelectMode && !tData.areaSelectMode.isOpenTingTip)
        return;

    var carNumNode = MjClient.playui._tingCardNumNode;
    //如果没有可听的牌
    // cc.log("=========tingSet======== " + tingSet.length);
     cc.log("=========tingSet==000000000000000====== " + JSON.stringify(tingSet));
    var bHaveValue = false;

    carNumNode.zIndex = 500;
    carNumNode.setAnchorPoint(0,0);
    carNumNode.setContentSize(272, 80);
    if(MjClient.gameType == MjClient.GAME_TYPE.XU_PU_LAO_PAI)
    {
        carNumNode.setContentSize(272, 110);
    }

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

        var countNode = cardNode.getChildByName("cardCount");
        var icount = getHuCardNum(parseInt(cd));
        countNode.setString(icount + "");
        var off = 0;

        setCardSprite(cardNode.getChildByName("cardNode"), parseInt(cd), off);
        cardNode.setPositionX(cardTextNode.getPositionX() + width*i*1);//cardTextNode.getContentSize().width*0.5);
        cardNode.setPositionY(cardTextNode.getPositionY() + hight*j*1);//cardTextNode.getContentSize().width*0.5);
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
}


MjClient.movingCard = null;
MjClient.selectedCard = null;
var cardBeginPos = null;
var cardBeginScale = null;
var cardBeginZIndex = null;
var bIsPut = false;
var bStartMoved = false;
//var cardPutted = false; //为了解决如果已经打出牌，不能在打其他的牌
//设置回调，并处理回调
function SetTouchCardHandler(standUI, cardui)
{
    //var cardBeginPos = null;
    //var cardBeginScale = null;
    //var cardBeginZIndex = null;

    cardui.addTouchEventListener(function(btn, tp)
    {

        /*
         放在前面，不是自己回合，或者听牌之后，不让拖动麻将
         */
        var tData = MjClient.data.sData.tData;
        if(!IsTurnToMe() || tData.tState != TableState.waitPut)
        {
            // cc.log("tp == MjClient.movingCard=======================00000000000 " + MjClient.movingCard);
            return;
        }

        var pl = getUIPlayer(0);
        if(pl.isTing )
        {
            //return;
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.XU_PU_LAO_PAI && tp == ccui.Widget.TOUCH_BEGAN )
        {
            if(pl && !MjClient.data.sData.tData.areaSelectMode["qxgc"])
            {
                var _isShowGuLayer = true;
                var _seletIdx = 0; //当前做选择的人数
                MjClient.AllPlayerRun(function(Pll){
                    if(Pll.guChouValue > 0  && _isShowGuLayer)
                    {
                        _isShowGuLayer =  false;
                    }
                    if(Pll.guChouValue != -1)
                    {
                        _seletIdx++;
                    }
                });
                if(_isShowGuLayer && _seletIdx < (MjClient.MaxPlayerNum - 1)) return  MjClient.showToast("等待其他人选择箍臭");

                if(pl.guChouValue == 1)//选择杂丑后，就不能出牌了
                {
                    return MjClient.showToast("当前状态不能出牌！");
                }
            }

            // cc.log("===========================pl.mjpeng = " + JSON.stringify(pl.mjchiCard));
            // cc.log("=========================== btn.tag = " + JSON.stringify( btn.tag));

            if(tData.putType == 1 && pl.mjhand.length > 2 && pl.mjchiCard && MjClient.data.sData.tData.areaSelectMode["chbctz"] )
            {
                if(pl.mjchiCard[pl.mjchiCard.length - 1] == btn.tag )
                {
                    MjClient.showToast("刚吃的牌不能打");
                    return false;
                }
            }

           // cc.log("===========================pl.mjpeng = " + JSON.stringify(pl.mjpeng));
           // cc.log("=========================== btn.tag = " + JSON.stringify( btn.tag));

            if(tData.putType === 3 && pl.mjhand.length > 2 && pl.mjpeng && MjClient.data.sData.tData.areaSelectMode["phbctz"])
            {
                if(pl.mjpeng[pl.mjpeng.length - 1] ===  btn.tag)
                {
                    MjClient.showToast("刚碰的牌不能打");
                    return false;
                }
            }
        }

        //转转麻将，通用红中，湘乡红中（移植自通用红中），自摸胡必须胡，不能出牌
        if(MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN
            || MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG
            || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG) {
            if(pl.isZiMoHu) {
                return MjClient.showToast("自摸必须胡牌");
            }
        }

        if((MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG)
            && tData.areaSelectMode.bihuType && (pl.eatFlag & 8))
        {
            return MjClient.showToast("有胡必胡");
        }

        if(pl.mustHu){
            return MjClient.showToast("有胡必胡");
        }

        if (MjClient.clickTing && !MjClient.canTingCards[cardui.tag])
        {
            return;
        }
        //晃晃麻将（原泗阳晃晃）和盐城晃晃特殊处理 不能出赖子
        if (MjClient.gameType == MjClient.GAME_TYPE.SI_YANG_HH ||
            MjClient.gameType == MjClient.GAME_TYPE.YAN_CHENG_HH ||
            MjClient.gameType == MjClient.GAME_TYPE.NTHZ){
            if(cardui.tag == tData.hunCard){
                return;
            }
        }
        // 王钓麻将 红中（赖子）只有在手里麻将全是红中的情况下才允许出
        if(MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG && cardui.tag == tData.hunCard )
        {
            var isClick = true;
            //手里的牌必须全是红中 
            for (var i = 0; i < pl.mjhand.length; i++) {
                if(pl.mjhand[i] != 71){
                    isClick = false;
                    break;
                }
            }
            if(!isClick)
                return;
        }

        //邵阳通用红中、通用转转癞子牌不能打出
        if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) &&
            (MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG || MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN ||
            MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG || MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG))
        {
            var hunCard = MjClient.data.sData.tData.hunCard;
            if((MjClient.majiang.isHunCard && MjClient.majiang.isHunCard(cardui.tag, hunCard)) ||
                (hunCard && hunCard == cardui.tag))
            {
                return MjClient.showToast("癞子牌不可出");
            }
        }

        //安化麻将杠开时不能出牌
        if(MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG){
            if(pl.isTing){
                return;
            }
        }

        //怀化麻将等待其他玩家胡时庄家不能出牌，怀化麻将杠开不能出牌
        if(MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG){
            var sData = MjClient.data.sData;
            var tData = sData.tData;
            if(tData.canBaotingNum != 0 || getUIPlayer(0).isTing && tData.gangAddCard && tData.gangAddCard.length != 0) return ;
        }

        //南通红中（十三张） 手上有四张红中时必须胡
        if (MjClient.gameType == MjClient.GAME_TYPE.NTHZ && MjClient.majiang.isCanQishouhu(pl.mjhand))
        {
            // cc.log("tp == MjClient.movingCard=======================11111111111111 " + MjClient.movingCard);
            return;
        }

        if (MjClient.movingCard !== null && MjClient.movingCard !== btn)
        {
            // cc.log("tp == MjClient.movingCard=======================222222222222222 " + MjClient.movingCard);
            return;
        }
        if ((MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA) &&
            (pl.haiDiLaoState == 1 || MjClient.playui._jiazhuWait.isVisible() || MjClient.playui.jsBind.eat.qshu_layout._node.isVisible()))
        {
            return;
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG
            || MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN) 
        {
            if (pl.tPutCard) 
            {
                if (!MjClient.Scene.ToastNodeArray || MjClient.Scene.ToastNodeArray.length == 0) 
                {
                    MjClient.showToast("出牌请先取消自动摸打");
                }
                return;
            }
        }
        if(tp == ccui.Widget.TOUCH_BEGAN)
        {
            cc.log("tp == ccui.Widget.TOUCH_BEGAN");
            playEffect("cardClick");
            //为了解决，有花的情况，下花没自动打出去，打了其他的牌
            var children = btn.getParent().children;
            for(var i = 0; i < children.length; i++) {
                //手里打出去，要删掉的那张牌没有删除之前不让出第二张牌，也就是没有收到Mjput消息回调前不让出牌  by sking 2018.9.14
                if(children[i].name == "putOutCard" ) { return false };
                if(children[i].name == "mjhand" && MjClient.majiang.isCardFlower && MjClient.majiang.isCardFlower(children[i].tag)) {
                    return false;
                }
                if(children[i].name == "mjhand" && children[i] !== btn) {
                    children[i].y = standUI.y;
                }
            }
            MjClient.movingCard = btn;
            MjClient.selectedCard = btn;
            cardBeginPos = btn.getPosition();
            cardBeginScale = btn.getScale();
            cardBeginZIndex = btn.zIndex;
            bIsPut = true;
            bStartMoved = false;

            /*
             设置当前可听的牌数
             */
            if(isNeedShowTingCard())
            {
                COMMON_UI.showCurrentTingCards(cardui);
            }

        }
        else if(tp == ccui.Widget.TOUCH_MOVED)
        {
            if (MjClient.movingCard == null)
            {
                return;
            }

            var pos = btn.getTouchMovePosition();

            var _standHeight = standUI.getContentSize().height;


            if(pos.y - cardBeginPos.y > _standHeight/2)
            {
                if (pos.x < 0) pos.x = 0;
                if (pos.x > MjClient.size.width) pos.x = MjClient.size.width;
                if (pos.y < 0) pos.y = 0;
                if (pos.y > MjClient.size.height) pos.y = MjClient.size.height;
                btn.setPosition(pos);
                bIsPut = true;
                bStartMoved = true;
                btn.zIndex  = 500;
                btn.scale = cardBeginScale*1.2;
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

                        btn.scale = cardBeginScale;
                    }
                }
            }
        }
        else if(tp === ccui.Widget.TOUCH_ENDED || tp === ccui.Widget.TOUCH_CANCELED)
        {
            if (MjClient.movingCard == null) {
                return;
            }
            bStartMoved = false;
            cc.log("tp === ccui.Widget.TOUCH_ENDED || tp === ccui.Widget.TOUCH_CANCELED");
            btn.zIndex  = cardBeginZIndex;
            btn.scale = cardBeginScale;

            var pos = btn.getPosition();
            var dy = Math.round(pos.y - standUI.y);

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

                if (MjClient.gameType == MjClient.GAME_TYPE.XU_PU_LAO_PAI) {
                    var arr = [];
                    if (MjClient.outTingCards && MjClient.outTingCards[btn.tag.toString()]) {
                        arr = MjClient.outTingCards[btn.tag.toString()];
                    }
                    MjClient.playui.showTingCardsName(null, null, arr);
                }
            }
            else
            {
                // 耒阳麻将不杀鬼 打鬼牌二次确认提示
                if (MjClient.gameType == MjClient.GAME_TYPE.LEI_YANG_GMJ && tData.areaSelectMode.shaguiType == 0 &&
                    MjClient.majiang.isHunCard(cardui.tag, tData.hunCard) ) {
                    MjClient.showMsg("确定要打出鬼牌吗?",function() {
                        hideCurrentTingNum();
                        PutOutCard(cardui, cardui.tag);
                    }, function() {
                        MjClient.movingCard = null;
                        btn.setPosition(cardBeginPos);
                        btn.y = standUI.y + 20;
                    }, "1");

                    return;
                }
                //添加弃胡提示
                var eat = MjClient.playui.jsBind.eat;
                if ((MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA) &&
                    eat.hu._node.visible && !eat.guo._node.visible && getUIPlayer(0).isTing) {
                    // 此时为开杠后，可以自摸则不能把牌打出去
                    MjClient.movingCard = null;
                    btn.setPosition(cardBeginPos);
                    btn.y = standUI.y + 20;
                    return;
                } else if ((MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
                    && eat.hu._node.visible) {
                    MjClient.showMsg("确认不胡吗?",
                        function(){
                            //过胡提示
                            if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                                MjClient.showToast("你选择了过，暂时放弃胡牌");
                            }
                            MJPassConfirmToServer();
                            hideCurrentTingNum();
                            PutOutCard(cardui, cardui.tag);
                        },
                        function() {
                            MjClient.movingCard = null;
                            btn.setPosition(cardBeginPos);
                            btn.y = standUI.y + 20;
                        },
                        "1");
                    return;
                }
                hideCurrentTingNum();
                //已经是点击出的牌了，直接出牌
                PutOutCard(cardui, cardui.tag);
            }
        }
    }, cardui);
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
    MjClient.playui.jsBind.BtnPutCard._node.stopAllActions(); //修复抓花后自摸时自动打出bug
    /*
     临时提高层级是为了在DealMJPut中RemoveNodeBack删除打出去的这张牌时，能准确找到选中的这张牌。
     如果不提高层级，mjhand里面如果有相同的两张牌时，就会删掉另一张不是用户操作的牌
     */
    cdui.zIndex = 500;
    if(cdui.isNew){
        MjClient.newCard = null;
        cdui.isNew = false;
    }

    if(COMMON_UI3D.is3DUI())
    {
        return COMMON_UI3D.PutOutCard3D(cdui,cd);
    }
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
    if (mjhandNum == pl.mjhand.length)
    {
        MjClient.gamenet.request("pkroom.handler.tableMsg", {
            cmd: "MJPut",
            card: cd,
            tingAfterPut: MjClient.clickTing
        });


        var pl = getUIPlayer(0);
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
        if ( (MjClient.gameType == MjClient.GAME_TYPE.HUAIAN_CC || MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG
            || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG || MjClient.gameType == MjClient.GAME_TYPE.XIN_NING_MA_JIANG
            || MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN ||
            (MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ && MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ))
            && MjClient.MaxPlayerNum == 2)
            maxNum = 20;

        if (putnum >= maxNum*2 && out2 )
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
        var oSize = out.getSize();
        var oSc = out.getScale()*1.3;
        if(putnum >= maxNum)
        {
            putnum -= maxNum;
            tingIndex -= maxNum;
        }
        var addWide =  0;
        if(tingIndex <= putnum && tingIndex >= 0)
        {
            addWide =  oSize.width * oSc *0.91;
        }

        var endPoint = cc.p(0, 0);
        endPoint.y = out.y;
        endPoint.x = out.x + oSize.width * oSc * putnum*0.91 + addWide;
        cdui.zIndex = out.zIndex;
        setCardSprite(cdui,cd,0);
        cdui.setPosition(endPoint);
        cdui.setScale(oSc);
        cdui.addTouchEventListener(function () {});



        //没有插牌动画就提前重置
        if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP) && MjClient.rePlayVideo == -1)
        {
            // COMMON_UI.afterMjputAnimation();
            if(MjClient.gameType === MjClient.GAME_TYPE.XU_PU_LAO_PAI){  // 邵阳溆浦老牌不加箭头
                cdui.zIndex = out.zIndex;
                cdui.setPosition(endPoint);
                cdui.setScale(oSc);
                cdui.setVisible(false);
                cdui.isOuting = false;
                //自己出牌时前端先行
                COMMON_UI.BeforehandSelfPutOutCard(cd);
            }else{
                cdui.zIndex = out.zIndex;
                cdui.setPosition(endPoint);
                cdui.setScale(oSc);
                clearCurrentPutTag();
                cdui.isOuting = false;
                addCurrentPutTag(cdui, 0);
                //自己出牌时前端先行
                COMMON_UI.BeforehandSelfPutOutCard(cd);
            }

        }

        showMJOutBig(cdui.parent, cd);
        cdui.name = "putOutCard"; // changed by sking 适配所有的麻将，标记打出的那张牌
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
        cc.log("====PutOutCard======_skipHuIconNode  ====  " + pl.skipHu); //if(!pl.isQiHu)
        if (!pl.isQiHu ) {
            var _skipHuIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipHuIconTag");
            if(_skipHuIconNode)
                _skipHuIconNode.visible = false;
            var _skipPengIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipPengIconTag");
            if(_skipPengIconNode)
                _skipPengIconNode.visible = false;
        }
    }

    if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP) && MjClient.rePlayVideo == -1)
        MjClient.playui.CardLayoutRestore(getNode(0), 0);



}

function CardLayoutRestoreForEndOne_qxsydtz(node, endonepl)
{
    // node 是克隆新建的一个麻将节点 by sking

    var newC = null; //先创建麻将的UI节点
    var newVal = 0; //新牌的值，是几万，几筒，几条....为数字
    var pl = endonepl; //player 信息



    var mjhandNum = 0;
    var children = node.children;
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            mjhandNum++;
        }
    }

    var tempMaJiang = MjClient.majiang; //麻将的各种方法判断，是否可以杠，是否可以吃... by sking

    //排序麻将的位置 by sking
    if (pl.mjhand && pl.mjhand.length > 0)
    {
        var count = tempMaJiang.CardCount(pl);
        if(count == 14 && mjhandNum == pl.mjhand.length)
        {
            newVal = pl.mjhand[pl.mjhand.length - 1]; //为什么取最后一个节点 ？
        }
    }

    //up stand 是2种麻将的图。
    var up = node.getChildByName("up");
    var stand = node.getChildByName("stand");
    var start = up, offui = stand;


    var upSize = offui.getSize();
    var upS = offui.scale;
    //mjhand standPri out chi peng gang0 gang1
    var uipeng = [];
    var uigang0 = [];
    var uigang1 = [];
    var uichi = [];
    var uistand = [];
    var uihun = [];//癞子牌在最左边
    // var sData = MjClient.data.sData;
    // var tData = sData.tData;
    for(var i = 0; i < children.length; i++) //children 为 "down" 节点下的字节点
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            if(newC == null && newVal == ci.tag)
            {
                newC = ci; //从down 节点下，复制一个麻将node保存在newC 里 by sking
            }
            else
            {
                if(MjClient.data.sData.tData.hunCard == ci.tag)
                {
                    uihun.push(ci);
                }
                else
                {
                    uistand.push(ci);
                }
            }

            //if(MjClient.data.sData.tData.hunCard == ci.tag)
            //{
            //    ci.setColor(cc.color(255,255,63));
            //}

        }
        else if(ci.name == "standPri")
        {
            uistand.push(ci);
        }
        else if(ci.name == "gang0")
        {
            uigang0.push(ci);
        }
        else if (ci.name == "gang1")
        {
            uigang1.push(ci);
        }
        else if (ci.name == "chi")
        {
            uichi.push(ci);
        }
        else if (ci.name == "peng")
        {
            uipeng.push(ci);
        }
    }


    if(MjClient.gameType === MjClient.GAME_TYPE.XU_ZHOU)
    {
        uistand.sort(TagOrder_xz);
    }else if((MjClient.gameType === MjClient.GAME_TYPE.DAO_ZHOU_MJ &&
        !MjClient.majiang.so13(pl.mjhand, MjClient.data.sData.tData.hunCard))||
        MjClient.gameType === MjClient.GAME_TYPE.YONG_ZHOU_MJ)
    {
        uistand.sort(function(node_a,node_b){
            var tag_a = node_a.tag;
            var tag_b = node_b.tag;
            if(tag_a == 71){
                tag_a = MjClient.data.sData.tData.hunCard;
            }
            if(tag_b == 71){
                tag_b = MjClient.data.sData.tData.hunCard;
            }
            return tag_a - tag_b;
        });
    }
    else
    {
        uistand.sort(TagOrder);
    }


    if(uihun.length > 0) //是否有柰子，有则放在最前面 by sking
    {
        for(var i = 0; i < uihun.length; i++)
        {
            uistand.unshift(uihun[i]); //向数组开头添加一个元素 unshift
        }
    }

    if(newC)
    {
        uistand.push(newC); //把这张牌放入手牌的数组里  by sking
    }

    var uiOrder = [uigang1, uigang0, uipeng, uichi, uistand];


    var orders = []; //重新排序后装到数组里 by sking
    for(var j = 0; j < uiOrder.length; j++)
    {
        var uis = uiOrder[j];
        for(var i = 0; i < uis.length; i++)
        {
            orders.push(uis[i]);
        }
    }

    //设置麻将大小
    var slotwith = upSize.width * upS * 0.2;//0.05;
    var slotheigt = upSize.height * upS * 0.3;
    var spacingNum = 0;// 增加间距

    for(var i = 0; i < orders.length; i++)
    {
        var ci = orders[i];
        if(i != 0)
        {
            if(ci.name == orders[i - 1].name)
            {
                spacingNum++;
                if(ci.isgang4)
                {
                    ci.x = orders[i - 2].x;
                    ci.y = orders[i - 2].y + upSize.height * upS * 0.18;
                    spacingNum = 0;
                }
                else if(orders[i - 1].isgang4)
                {
                    ci.x = orders[i - 2].x + upSize.width * upS*1.2 + slotwith;
                    spacingNum = 0;
                }
                else
                {
                    if(ci.name == "mjhand")
                    {
                        ci.x = orders[i - 1].x + upSize.width * upS *1.35;
                    }
                    else
                    {
                        ci.x = orders[i - 1].x + upSize.width * upS *1.2;
                    }
                }
            }
            else if(orders[i - 1].name == "gang0" || orders[i - 1].name == "gang1")
            {
                ci.x = orders[i - 2].x + upSize.width * upS*1.2 + slotwith;
                spacingNum = 0;
            }
            else
            {
                spacingNum = 0;
                ci.x = orders[i - 1].x + upSize.width * upS*1.2 + slotwith;
            }

            if(i == orders.length - 1)
            {
                console.log("--------newC--------"+newC);
                if(newC && endonepl)
                {
                    ci.x = ci.x + slotwith + 10;
                }
                else if(newC)
                {
                    ci.x = ci.x + slotwith + 10;
                    ci.y += 20;
                }
            }

            if( orders[i].name == "chi"  ||orders[i].name == "peng" ){
                if(spacingNum >= 3 ){
                    ci.x += slotwith;
                    spacingNum = 0;
                }
            }
        }
        else
        {
            ci.x = start.x + upSize.width * upS;
        }
    }
}


//处理出牌,放一张牌，打牌动作
function DealMJPut(node, msg, off, outNum)
{
    if(MjClient.playui.DealMJPut) return MjClient.playui.DealMJPut(node, msg, off, outNum);

    //断线重连 起手胡 不消失
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    try{
        cc.log(" ========= QiShouHuNode ",QiShouHuNode);
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

    
    if(COMMON_UI3D.is3DUI())
    {
        return  COMMON_UI3D.DealMJPut_3D(node, msg, off, outNum);
    }

    //cardPutted = false;
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && off == 0){
        playEffect("dapai");
    }
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ && off == 0
        &&(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG
        || MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN))
    {
        playEffect("chupai");
    }

    var uids = tData.uids;
    var selfIndex = getPlayerIndex(off);
    if(uids[selfIndex] == msg.uid)
    {
        var pl = sData.players[msg.uid];
        var putnum = outNum >= 0 ? outNum : (pl.mjput.length - 1);
        var tingIndex = pl.tingIndex;//沭阳麻将需要

        cc.log( off + "------------- pl.tingIndex =" + pl.tingIndex);
        cc.log("------------- pl.isTing =" + pl.isTing);

        if(cc.isUndefined(tingIndex) || !pl.isTing)
        {
            tingIndex = -1;//为了不报错;
        }

        var out0 = node.getChildByName("out0");
        var out1 = node.getChildByName("out1");
        var out2 = node.getChildByName("out2");

        var maxNum = 11;
        if (MjClient.gameType == MjClient.GAME_TYPE.HUAIAN_CC
            || MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG
            || MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG
            || MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG
            || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG
            || MjClient.gameType == MjClient.GAME_TYPE.LEI_YANG_GMJ
            || MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ
            || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG
            || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA
            || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA
            || MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG
            || MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN
            || (MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ && MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)) {
            if (MjClient.MaxPlayerNum == 2)
                maxNum = 20;
            else if (MjClient.MaxPlayerNum == 3 && off != 0)
                maxNum = 13;
        }

        if((MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG || MjClient.gameType == MjClient.GAME_TYPE.XIN_NING_MA_JIANG)
            && MjClient.MaxPlayerNum == 2){
            maxNum = 27;
        }


        var out;

        if (putnum >= maxNum*2 && out2)
        {
            out = out2.clone();
        }
        else if(putnum >= maxNum)
        {
            out = out1.clone();
        }
        else
        {
            out = out0.clone();
        }
        out.setScale(out.getScale()*1.3);
        var oSize = out.getSize();
        var oSc = out.scale;

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
        out.name = "out";
        setCardSprite(out, msg.card, off);
        var endPoint = cc.p(0, 0);
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
        if(tingIndex <= putnum && tingIndex >= 0)
        {
            if(off == 0 || off == 2)
            {
                addWide =  oSize.width * oSc *0.91;
            }
            else if (off  == 1 || off == 3)
            {
                addWide =  oSize.height * oSc *0.7;
            }
        }



        if(off == 0)
        {
            endPoint.y = out.y;
            endPoint.x = out.x + oSize.width * oSc * putnum*0.91 + addWide;

            if (isIPad()) {
                var ax = ws.height/1024;
                var ay = ws.height/768;
                endPoint.x = endPoint.x + 20 * ax;
                out.zIndex = 100 - putnum;
                endPoint.y = lineNum > 1 ? endPoint.y - 8 * ay: endPoint.y;
            }

            if(!(outNum >= 0))
            {

                //chang by sking 2018.9.14
                if((MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
                MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG) && msg.isAfterGang)
                {

                }else{
                    if(RemoveNodeBack(node, "putOutCard", 1, msg.card) == 0)
                    {
                        RemoveNodeBack(node, "mjhand", 1, msg.card);
                    }
                }

            }
        }
        else if (off == 1)
        {
            if(!(outNum >= 0))
            {
                if((MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
                MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG) && msg.isAfterGang)
                {

                }else{
                    if (MjClient.rePlayVideo == -1)
                        RemoveFrontNode(node, "standPri", 1);
                    else//回放
                        RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
                }
            }
            cc.log("DealMJPut remove card  = " + msg.card);
            endPoint.y = out.y + oSize.height * oSc * putnum * 0.72 + addWide;
            endPoint.x = out.x;

            if (isIPad()) {
                var ay = ws.height/768;
                endPoint.y = endPoint.y + 20 * ay;
            }

            out.zIndex = 100 - putnum;
        }
        else if(off == 2)
        {
            if(!(outNum >= 0))
            {
                if((MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
                MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG) && msg.isAfterGang)
                {

                }else{
                    if (MjClient.rePlayVideo == -1)
                        RemoveFrontNode(node, "standPri", 1);
                    else//回放
                        RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
                }
            }

            endPoint.x = out.x - oSize.width * oSc * putnum*0.91 - addWide;
            endPoint.y = out.y;

            if (isIPad()) {
                var ax = ws.height/1024;
                var ay = ws.height/768;
                endPoint.x = endPoint.x - 20 * ax;
                out.zIndex = 100 - putnum - lineNum;
                endPoint.y = lineNum > 1 ? endPoint.y + 5 * ay: endPoint.y;
            }
        }
        else if (off == 3)
        {
            if(!(outNum >= 0))
            {
                if((MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
                    MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG) && msg.isAfterGang)
                {

                }else{
                    if (MjClient.rePlayVideo == -1)
                        RemoveNodeBack(node, "standPri", 1);
                    else
                        RemoveNodeBack(node, "mjhand_replay", 1, msg.card);
                }
            }

            endPoint.y = out.y - oSize.height * oSc * putnum * 0.72 - addWide;
            endPoint.x = out.x;
            out.zIndex = putnum;

            if (isIPad()) {
                var ay = ws.height/768;
                endPoint.y = MjClient.MaxPlayerNum === 3 ? endPoint.y + 120 * ay: endPoint.y - 25 * ay;
            }
        }





        if(outNum >= 0) //重连
        {
            cc.log("==================tData = "+ JSON.stringify(tData));
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
        out.x = endPoint.x;
        out.y = endPoint.y;
        out.scale = oSc;
        out.name = "newout";


        var outAction = out.clone();
        outAction.name = "outAction";
        outAction.visible = true;
        node.addChild(outAction);
        setCardSprite(outAction, msg.card, off);
        outAction.scale = oSc;
        outAction.zIndex = zoder;
        outAction.setPosition(endPoint);
        addCurrentPutTag(outAction, off);



        function RemovePutCard(onlySelf)
        {
            MjClient.lastCardposNode = null;//抢杠胡没有牌 可以劈
            outAction.removeFromParent();
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
                        roundEnd: function(eD)
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
        // 邵阳把插牌动画取消掉了 
        // if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ && 
        //     GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG &&
        //     off == 0 && MjClient.rePlayVideo == -1)
        // {
        //     // COMMON_UI.afterMjputAnimation(); // 这个只有邵阳在用
        // }else 

        if (!(outNum >= 0)){
            if( cc.sys.isObjectValid(MjClient.playui) )   MjClient.playui.CardLayoutRestore(node, off);
        }

        if (off != 0)
        {
            showMJOutBig(node, msg.card);
        }
    }

}

/*
 by sking
 */
function getNode(off)
{
    var _node = null;
    switch (off)
    {
        case 0:
            _node = MjClient.playui._downNode;
            cc.log("1----");
            break;
        case 1:
            cc.log("2----");
            _node = MjClient.playui._rightNode;
            break;
        case 2:
            cc.log("3----");
            _node = MjClient.playui._topNode;
            break;
        case 3:
            cc.log("4----");
            _node = MjClient.playui._leftNode;
            break;
        default:
            break;
    }
    return _node;
}


// delete by sking 2018.11.5
// function clearCurrentPutTag()
// {
//     var sData = MjClient.data.sData;
//     var tData = sData.tData;
//     var uids = tData.uids;
//     for(var off = 0;off < 4 ;off++)
//     {
//         var _node = getNode(off);
//         var children = _node.children;
//         for(var i = 0; i < children.length; i++)
//         {
//             if(children[i].name == "out" || children[i].name == "newout")
//             {
//                 var _child = children[i].getChildByName("cardShow");
//                 if(_child)
//                 {
//                     children[i].removeChildByName("cardShow");
//                 }
//             }
//         }
//     }
// }

// delete by sking 2018.10.31
// function addCurrentPutTag(cardNode, off)
// {
//     var offSets = [[50, 135], [60, 105], [50, 135], [60, 105], [48, 93]];
//     MjClient.lastCardposNode = cardNode;
//     var _showSprite = cardNode.getChildByName("cardShow");
//
//     if (_showSprite)
//         _showSprite.removeFromParent();
//
//     _showSprite = new ccui.ImageView("playing/other/sign.png");
//     _showSprite.setPosition(offSets[off][0], offSets[off][1]);
//     _showSprite.setScale(1.3);
//     var a1 = cc.moveBy(0.5,0,50).easing(cc.easeCubicActionOut());
//     var a2 = cc.moveBy(0.5,0,-50).easing(cc.easeCubicActionIn());
//     var seq = cc.sequence(a1,a2);
//     _showSprite.runAction(seq.repeatForever());
//     _showSprite.setName("cardShow");
//     cardNode.addChild(_showSprite,20);
// }

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
        _showSprite = new cc.Sprite();
        var _image = new cc.Sprite("playing/other/sign.png");
        var h = Math.min(cardNode.getBoundingBox().width, cardNode.getBoundingBox().height);
        var a1 = cc.moveBy(0.5,0,h/2).easing(cc.easeCubicActionOut());
        var a2 = cc.moveBy(0.5,0,-h/2).easing(cc.easeCubicActionIn());
        var seq = cc.sequence(a1,a2);
        _image.runAction(seq.repeatForever());
        _image.setPosition(0,0);
        _showSprite.addChild(_image);
        _showSprite.setScale(cardNode.getScale()*1.2);
        _showSprite.setName("cardShow");
        MjClient.playui.jsBind.eat._node.addChild(_showSprite,20);
    }
    _showSprite.setVisible(true);
    _showSprite.setPosition(cardNode.getPositionX(), cardNode.getPositionY()+Math.max(cardNode.getBoundingBox().width, cardNode.getBoundingBox().height)/2);


    if(isIPhoneX() && !COMMON_UI3D.is3DUI()&& off == 3)
    {
        _showSprite.setPosition(cardNode.getPositionX()+ cc.winSize.width*0.05, cardNode.getPositionY()+Math.max(cardNode.getBoundingBox().width, cardNode.getBoundingBox().height)/2);
    }
}



function MJChiCardchange(tag)
{
    var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer(0);
    if(tData.areaSelectMode.bihuType && (pl.eatFlag & 8) &&
        (MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG)){
        return MjClient.showToast("有胡必胡");
    }

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
        if(MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ){
            MJChiToServer(0);
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
        {
            MjClient.majiang.MJChiToServer(MjClient.eatpos[0], tag);
        }
        else{
            MJChiToServer(MjClient.eatpos[0]);
        }
    }
    else
    {
        if(eat.gang0) eat.gang0._node.visible = false;
        if(eat.gang1) eat.gang1._node.visible = false;
        if(eat.gang2) eat.gang2._node.visible = false;
        eat.chi0._node.visible = false;
        eat.chi1._node.visible = false;
        eat.chi2._node.visible = false;
        eat.peng._node.visible = false;
        eat.hu._node.visible = false;
        eat.guo._node.visible = false;
        changeuibg._node.visible = true;
        if(eat.zhua){
            eat.zhua._node.visible = false;
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
        {
            eat.eatSelectPanel._node.visible = false;
        }

        var card = [];
        var width = (cardTemplet.width - 7)*cardTemplet.scaleX;
        var startX = changeuibg._node.width/2 - width;
        for (var i = 0; i < MjClient.eatpos.length; i++)
        {
            for (var j = 0; j < 3; j ++)
            {
                card[j] = cardTemplet.clone();
                var showcard = tData.lastPutCard - MjClient.eatpos[i] + j;
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

                card[j].tag = i;
                card[j].visible = true;
                card[j].setName("card" + (MjClient.eatpos[i]*3 + j));
                card[j].setPosition(startX + j*width, cardTemplet.y + i*cardTemplet.height*cardTemplet.scaleY);
                changeuibg._node.addChild(card[j]);

                card[j].addTouchEventListener(changeuibg._node.chiTouch, card[j]);
            }

            ShowChiCards(changeuibg._node, MjClient.eatpos[i], card[0], card[1], card[2]);
        }

        if (card[0])
            changeuibg._node.height = card[0].y + card[0].height * card[0].scaleY * card[0].anchorY + 8.0;
    }
}

function MJWangZhuaChange(){
    var eat = MjClient.playui.jsBind.eat;
    var changeuibg = eat.changeui.changeuibg;
    eat.chi0._node.visible = false;
    eat.chi1._node.visible = false;
    eat.chi2._node.visible = false;
    eat.peng._node.visible = false;
    eat.gang0._node.visible = false;
    eat.gang1._node.visible = false;
    eat.gang2._node.visible = false;
    eat.hu._node.visible = false;
    eat.guo._node.visible = false;
    changeuibg._node.visible = false;
    if(eat.zhua){
        eat.zhua._node.visible = false;
    }

    MJWangZhuaToServer();
}

function MJZhiTouZi(tag){
    var eat = MjClient.playui.jsBind.eat;
    var changeuibg = eat.changeui.changeuibg;
    eat.chi0._node.visible = false;
    eat.chi1._node.visible = false;
    eat.chi2._node.visible = false;
    eat.peng._node.visible = false;
    eat.gang0._node.visible = false;
    eat.gang1._node.visible = false;
    eat.gang2._node.visible = false;
    eat.hu._node.visible = false;
    eat.guo._node.visible = false;
    changeuibg._node.visible = false;
    if(eat.touzi){
        eat.touzi._node.visible = false;
    }

    MJTouZiToServer();
}

function MJGangCardchange(tag)
{
    cc.log("==========mj gang card chang============");
    var pl = getUIPlayer(0);
    var tData = MjClient.data.sData.tData;
    if(pl && pl.isZiMoHu && MjClient.gameType != MjClient.GAME_TYPE.TY_HONGZHONG && MjClient.gameType != MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG &&
        MjClient.gameType != MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG && MjClient.gameType != MjClient.GAME_TYPE.AN_HUA_MA_JIANG) { // 通用红中可以杠 湘乡红中移植自通用红中 同样的处理逻辑
        if(MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN && MjClient.majiang.canHuAfterGang(pl.mjhand, MjClient.gangCards[0], tData.hunCard)){

        }else{
            return MjClient.showToast("自摸必须胡牌");
        }
    }else if(tData.areaSelectMode.bihuType && (pl.eatFlag & 8) &&
        (MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG))
    {

        if(!MjClient.majiang.canHuAfterGang(pl.mjhand, MjClient.gangCards[0], tData.hunCard)){
            return MjClient.showToast("有胡必胡");
        }
    }

    if(pl.mustHu)
    {
        return MjClient.showToast("有胡必胡");
    }

    var gangCards = MjClient.gangCards;
    if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA) {
        if (MjClient.playui.isKaiGang && MjClient.kaiGangCards) {
            gangCards = MjClient.kaiGangCards;
        }
    }
    if (gangCards.length == 0)
        return;

    var eat = MjClient.playui.jsBind.eat;
    var changeuibg = eat.changeui.changeuibg;
    var cardTemplet = changeuibg._node.getChildByName("card");
    var children = changeuibg._node.getChildren().slice();
    for (var i = 0, len = children.length; i < len; i ++)
    {
        if (children[i] != cardTemplet && children[i].getName().indexOf("card") != -1)
            children[i].removeFromParent();
    }

    if(gangCards.length == 1)
    {
        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
        {
            MjClient.majiang.MJGangToServer(gangCards[0], MjClient.playui.isKaiGang);
        }
        else if((MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG || MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG)
            && tag === 762){
            MjClient.majiang.MJTouZiToServer(gangCards[0]);
        }else{
            MJGangToServer(gangCards[0]);
        }
    }
    else
    {
        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
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
        if(eat.zhua){
            eat.zhua._node.visible = false;
        }
        if(eat.touzi){
            eat.touzi._node.visible = false;
        }
        changeuibg._node.visible = true;

        changeuibg._node.setTouchEnabled(true);


        cc.log("杠牌多选一"+JSON.stringify(gangCards))
        var card = null;
        var width = (cardTemplet.width - 7)*cardTemplet.scaleX;
        var startX = changeuibg._node.width/2 - width * 1.5;
        for(var i = 0; i < gangCards.length; i++)
        {
            for (var j = 0; j < 4; j ++)
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

        if (card)
            changeuibg._node.height = card.y + card.height * card.scaleY * card.anchorY + 8.0;
    }
}

function setUserOfflineWinGamePanel(node,pl)
{
    if(!pl || pl.onLine == true)
        return;

    //回放的时候
    if(MjClient.rePlayVideo != -1) 
        return; 

    var headNode = node.getChildByName("head");
    if (!headNode) {
        // 兼容不同头像名称的结点
        headNode = node.getChildByName("image_head");

        if (!headNode)
            return;
    }

    var path = "playing/other/Z_offline.png";
    var posY = 0.8;

    if(MjClient.APP_TYPE.QXYYQP === MjClient.getAppType() || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.APP_TYPE.QXSYDTZ === MjClient.getAppType())
    {
        path = "gameOver/Z_offline.png";
        posY = 0.6;
    }

    if(!headNode.getChildByName("offline"))
    {
        var _offline = new ccui.ImageView(path);
        _offline.setName("offline");
        _offline.setPosition(cc.p(headNode.getContentSize().width/2,headNode.getContentSize().height/2));
        headNode.addChild(_offline);
    }

    var _offLineNode = headNode.getChildByName("offline");
    _offLineNode.zIndex = 99;
    _offLineNode.visible = true;

    var _timeNode = _offLineNode.getChildByName("offLineTime");
    if(!_timeNode)
    {
        _timeNode = new ccui.Text();
        _timeNode.setName("offLineTime");
        _timeNode.setFontSize(26);
        _offLineNode.addChild(_timeNode)
        _timeNode.setPosition(cc.p(_offLineNode.getContentSize().width/2,_offLineNode.getContentSize().height*posY));
    }

    //cc.log("-----------------pl.offLineTime-------------------" + pl.offLineTime);
    
    if (pl.lastOffLineTime)
    {

        //var _currentTime = MjClient.data.sData.serverTime - MjClient.data.sData.serverNow;

        var _showTime = (MjClient.data.sData.serverTime - pl.lastOffLineTime);
        if(_showTime < 0)
        {
            headNode.getChildByName("offline").visible = false;
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

function  RemoveFrontNode(node, name, num, tag)
{
    var children = node.children;
    for(var i = 0; i < children.length && num > 0; i++)
    {
        var ci = children[i];
        if(ci.name == name && (!(tag > 0) || ci.tag == tag))
        {
            ci.removeFromParent(true);
            num--;
        }
    }

    if(num != 0)
    {
        //mylog(node.name + " RemoveFrontNode fail " + name + " " + tag);
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



function RemoveNodeBack(node, name, num, tag)
{
    var _delCount = 0; //标记是否有删除的牌 add by sking 2018.11.6
    var children = node.children;
    for(var i = children.length - 1; i >= 0 && num > 0; i--)
    {
        var ci = children[i];
        if(ci.name == name && (!(tag > 0) || ci.tag == tag))
        {
            // cc.log("删除");
            _delCount++;
            ci.removeFromParent(true);
            num--;
        }
    }

    if (num != 0)
    {
        // mylog(node.name + " RemoveNodeBack fail " + name + " " + tag);
    }

    return _delCount;
}

function findNodesBack(node, name, tags) {
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
    if ((TableState.waitJoin == tData.tState || TableState.waitReady == tData.tState )&& !tData.matchId)
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

    if(Object.keys(sData.players).length < MjClient.data.sData.tData.maxPlayer )
    {
        isAllReady = false
    }

    return isAllReady;
}

//是否显示离开按钮（包括准备阶段）
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



//转盘显示状态
function IsArrowVisible()
{
    var pl = getUIPlayer(0);
    if (!pl)
    {
        return;
    }
    if(
        TableState.waitPut == pl.mjState ||
        TableState.waitEat == pl.mjState ||
        TableState.waitCard == pl.mjState ||
        TableState.roundFinish == pl.mjState
    )
    {
        return true;
    }
    else
    {
        return false;
    }
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
            && ni.name != "out_qshu_layout"
            && ni.getName() != "ready"
            && ni.getName() != "play_tips"
            && ni.getName() != "tai_layout"
            && ni.getName() != "tingCardsNode"
            && ni.getName() != "tingCardNumNode"
            && ni.getName() != "fangTag"
            && ni.getName() != "chuo"
        )
        {
            ni.removeFromParent(true);
        }
        else if(ni.getName() == "play_tips")
        {
            InitShowEatActionNode(ni.getParent());
        }
    }

    clearCurrentPutTag();
}


function DealWangZhua(node, msg, off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = getPlayerIndex(off);
    if (msg.uid == uids[selfIndex])
    {
        ShowEatActionAnim(node, ActionType.WANGZHUA, off);
    }
}

function DealNewCard(node, msg, off,bFirstCard)
{
    if(MjClient.playui.DealNewCard) return MjClient.playui.DealNewCard(node, msg, off);

    /*
     下一次摸牌，过胡标志取消
     */
    if (off === 0 && MjClient.gameType != MjClient.GAME_TYPE.SHU_YANG)
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

    if ((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ )&& !COMMON_UI3D.is3DUI()) // 邵阳 4 列 4列的发牌效果
    {
        cc.log("第一张发的牌--------------");
        if(bFirstCard) cardNode.visible = false;

        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA)  // 长沙麻将跑这个代码，解决不会动自出牌的问题
            MjClient.playui.CardLayoutRestore(node, 0);
    }
    else
    {
        //摆放位置，排序，设置大小
        MjClient.playui.CardLayoutRestore(node, 0);
    }


}




// 处理等待出牌
function DealWaitPut(node, msg, off)
{
    if(MjClient.playui.DealWaitPut) return MjClient.playui.DealWaitPut(node, msg, off);
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = getPlayerIndex(off);
    if(tData.curPlayer == selfIndex)
    {
        cc.log("DealWaitPut ------------ = "+msg.card);
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
    if(MjClient.playui.DealMJChi) return MjClient.playui.DealMJChi(node, msg, off);

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = getPlayerIndex(off);
    if (tData.curPlayer == selfIndex)
    {
        var fromOff = [];
        var fromBind = GetUIBind(msg.from, fromOff);
        var fnode = fromBind._node;
        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
        {
            MjClient.playui.RemoveNewCardOut(fnode, msg.mjchi);
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
        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA) {
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

        for(var i = 0; i < cds.length; i++)
        {
            if(cds[i] == tData.lastPutCard)
            {
                var cdui = getNewCard(node, "up", "chi", cds[i], off, "heng");
                setCardArrow(cdui, MjClient.MaxPlayerNum - 2, off);
            }
            else
            {
                getNewCard(node, "up", "chi", cds[i], off);
            }

            if(off == 0 && cds[i] != tData.lastPutCard)
            {
                RemoveNodeBack(node, "mjhand", 1, cds[i]);
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
                if(cds[i] != tData.lastPutCard)
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
    if(MjClient.playui.DealMJPeng) return MjClient.playui.DealMJPeng(node, msg, off);

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = getPlayerIndex(off);
    if(tData.curPlayer == selfIndex)
    {
        var fromOff = [];
        var fromBind = GetUIBind(msg.from, fromOff);
        var fnode = fromBind._node;
        var lastPutCard = tData.lastPutCard;
        var pl = sData.players[tData.uids[selfIndex] + ""];
        var i = pl.pengchigang.peng.length - 1;

        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
        {
            MjClient.playui.RemoveNewCardOut(fnode, pl.pengchigang.peng[i].card);
            lastPutCard = pl.pengchigang.peng[i].card;
        }
        else
        {
            RemoveNewCardOut(fnode);
        }

        var idx = tData.uids.indexOf(pl.info.uid);
        var offIdx = (pl.pengchigang.peng[i].pos - idx + MjClient.MaxPlayerNum)  % MjClient.MaxPlayerNum - 1;

        var idxPeng =  pl.mjpeng.length -1;
        for(var j = 0; j < 3; j++)
        {
            if(j == 1)
            {
                var cdui = getNewCard(node, "up", "peng", pl.mjpeng[idxPeng], off, "heng", "heng");
                setCardArrow(cdui, offIdx, off);
            }
            else
            {
                getNewCard(node, "up", "peng", pl.mjpeng[idxPeng], off);
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

        MjClient.playui.CardLayoutRestore(node, off);
        MjClient.playui.CardLayoutRestore(fnode, fromOff[0]);
        ShowEatActionAnim(node, ActionType.PENG, off);
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
    cc.log("============HandleMJHu==============");
    if(pl)
    {
        if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
            if (pl.huWord && pl.huWord.indexOf("zimo") != -1) {
                ShowEatActionAnim(node, ActionType.ZIMO, off);
            } else {
                ShowEatActionAnim(node, ActionType.HU, off);
            }
            ShowHuTypeImage(pl, node, off);
        } else {
            //MjClient.playui.EatVisibleCheck(); //??? 多胡的时候，会屏蔽下一家的胡按钮 by sking
            if (pl.huWord == "wangchuang") {
                ShowEatActionAnim(node, ActionType.WANGCHUANG, off);
            } else if (pl.huWord == "wangdiao") {
                ShowEatActionAnim(node, ActionType.WANGDIAO, off);
            } else if (pl.huWord == "qingyise") {
                ShowEatActionAnim(node, ActionType.QINGYISE, off);
            } else if (pl.huWord == "tianhu") {
                ShowEatActionAnim(node, ActionType.TIANHU, off);
            } else if (pl.huWord == "dihu") {
                ShowEatActionAnim(node, ActionType.DIHU, off);
            } else if (pl.huWord == "qidui") {
                ShowEatActionAnim(node, ActionType.QIDUI, off);
            } else if (pl.huWord == "gangkai") {
                ShowEatActionAnim(node, ActionType.GANGKAI, off);
            } else if (pl.huWord == "zimo") {
                ShowEatActionAnim(node, ActionType.ZIMO, off);
            } else {
                ShowEatActionAnim(node, ActionType.HU, off);
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
        if(off==0)
        {
            if(RemoveNodeBack(node, "putOutCard", 1, msg.card) == 0)
            {
                RemoveNodeBack(node, "mjhand", 1, msg.card);
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
        ShowEatActionAnim(node,ActionType.FLOWER,off);


    }
}

function setTingCards(node, tingSet)
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
        var cardNode = cardNode0.clone();
        lastCardNode = cardNode;
        cardNode.visible = true;
        bHaveValue = true;

        if(i == 17)
        {
            j++;
            i = 0;
        }
        cardNode.setPositionY(cardNode0.getPositionY() + j*cardNode0.getBoundingBox().height*0.85);
        cardNode.setPositionX(cardNode0.getPositionX() + i*cardNode0.getBoundingBox().width*0.95);
        BindingNode.addChild(cardNode, 10-j);
        setCardSprite(cardNode, parseInt(cd), 0);
        i++;
    }

    var textContentW = 0;
    var pl = getUIPlayer(0);
    if(lastCardNode && pl.isTing)
    {
        var _gameName;
        if(MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA){
            _gameName = new cc.LabelTTF("开杠自动摸打...","fonts/fzcy.ttf",25);
        }else{
            _gameName = new cc.LabelTTF("听牌自动摸打...","fonts/fzcy.ttf",25);
        }
        _gameName.setFontSize(_gameName.getFontSize());
        _gameName.setScale(3.5);
        _gameName.setColor(cc.color(255,220,74));
        _gameName.setAnchorPoint(0,0.5);
        _gameName.setPosition(lastCardNode.getContentSize().width*1.3 ,lastCardNode.getContentSize().height/2);
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
    var tingCardsWidth = cardNode0.getBoundingBox().width/0.207 + (i-1)*cardNode0.getBoundingBox().width*1.1;
    node.setContentSize(tingCardsWidth + textContentW, tingCardsHeight);
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

        ShowEatActionAnim(node,ActionType.TING,off);
        if (MjClient.gameType == MjClient.GAME_TYPE.LIAN_YUN_GANG) {
            var tingIcon = node.getChildByName("head").getChildByName("tingIcon");
            tingIcon.visible = true;
            MjClient.playui.CardLayoutRestore(node, off);
        }
        else {
            var tingIcon = node.getChildByName("head").getChildByName("tingIcon");
            var _cardIcon = node.getChildByName("head").getChildByName("tingCard");
            if(tingIcon)
                tingIcon.visible = true;
            if(_cardIcon)
                _cardIcon.visible = true;
        }
    }
}

// 处理杠
function DealMJGang(node, msg, off)
{

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
        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
            MjClient.playui.RemoveNewCardOut(fnode, msg.card);
        else
            RemoveNewCardOut(fnode);
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
                if (MjClient.gameType != MjClient.GAME_TYPE.CHANG_SHA && MjClient.gameType != MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
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
                    if (msg.isKaiGangAfterSelfAnGang)   // 长沙麻将,怀化麻将开杠后再暗杠
                        ;
                    else
                        RemoveNodeBack(node, "standPri", 1);
                }
                else
                    RemoveNodeBack(node, "mjhand_replay", 1, msg.card);
            }
            else if(msg.gang == 3)
            {
                if (MjClient.rePlayVideo == -1) {
                    if (msg.isKaiGangAfterSelfAnGang)   // 长沙麻将,怀化麻将开杠后再暗杠
                        RemoveNodeBack(node, "standPri", 3);
                    else
                        RemoveNodeBack(node, "standPri", 4);
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
                if (MjClient.gameType != MjClient.GAME_TYPE.CHANG_SHA && MjClient.gameType != MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
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
                    if (msg.isKaiGangAfterSelfAnGang)   // 长沙麻将,怀化麻将开杠后再暗杠
                        ;
                    else
                        RemoveFrontNode(node, "standPri", 1);
                }
                else
                    RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
            }
            else if(msg.gang == 3)
            {
                if (MjClient.rePlayVideo == -1) {
                    if (msg.isKaiGangAfterSelfAnGang)   // 长沙麻将,怀化麻将开杠后再暗杠
                        RemoveFrontNode(node, "standPri", 3);
                    else
                        RemoveFrontNode(node, "standPri", 4);
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
            offIdx = (pl.pengchigang.gang[i].pos - idx + MjClient.MaxPlayerNum) % MjClient.MaxPlayerNum - 1;
            break;
        }
    }
    if (offIdx == null)
    {
        for (var i=0; i<pl.pengchigang.pgang.length; i++)
        {
            if (pl.pengchigang.pgang[i].card == msg.card)
            {
                offIdx = (pl.pengchigang.pgang[i].pos - idx + MjClient.MaxPlayerNum) % MjClient.MaxPlayerNum - 1;
                break;
            }
        }
    }
    if (offIdx == null)
    {
        cc.log("DealMJGang:offIdx == null!!!!");
        offIdx = 0;
    }


    for(var j = 0; j < 4; j++)
    {
        if(msg.gang == 3)//暗杠
        {
            if(j == 3)
            {
                getNewCard(node, "down", "gang1", 0, off, "isgang4").tag = msg.card;
            }
            else
            {
                getNewCard(node, "up", "gang1", msg.card, off);
            }
        }
        else//明杠，补杠
        {
            var setCardArrowOnGang4 = false;
            for(var j = 0; j < 4; j++)
            {
                if(j < 3)
                {
                    if( (j % 3 == 2 - offIdx && off % 3 == 0) || (j % 3 == offIdx && off % 3 != 0) )
                    {
                        var cdui = getNewCard(node, "up", "gang0", msg.card, off, "heng", "heng");
                        setCardArrowOnGang4 = true;
                    }
                    else
                    {
                        getNewCard(node, "up", "gang0", msg.card, off);
                    }
                }
                else
                {
                    var cdui = getNewCard(node, "up", "gang0", msg.card, off, "isgang4");//最后一张牌放上面
                    cdui.tag = msg.card;
                    if (setCardArrowOnGang4)
                    {
                        setCardArrow(cdui, offIdx, off);
                    }
                }
            }
        }
    }

    MjClient.playui.CardLayoutRestore(node, off);
    if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
    {
        if(msg.isKaiGang)
        {
            ShowEatActionAnim(node, ActionType.KAIGANG, off);
        }
        else
        {
            ShowEatActionAnim(node, ActionType.BUGANG, off);
        }
    }
    else
    {
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
    var selfPlayer = MjClient.data.sData.players[SelfUid()];
    if (!play_tips) {
        return;
    }

    for (var i = 0; i < play_tips.children.length; i++) {
        if ((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && play_tips.children[i].getName() == "HuImg" && selfPlayer.mjState == TableState.roundFinish) {
            continue ;
        } else {
            play_tips.children[i].visible = false;
        }
    }
}



// 重置吃碰杠胡动作
function resetEatActionAnim()
{
    var jsBind = MjClient.playui.jsBind;
    var ui = [jsBind.down,jsBind.right,jsBind.top,jsBind.left];
    for (var i = 0; i < 4; i++) {
        if (ui[i]) {
            InitShowEatActionNode(ui[i]._node);
        }
    }
}



// 显示吃碰杠胡动作 =====lms==========
function ShowEatActionAnim(node, actType, off)
{
    cc.log("eatActionChild---------1");
    var delayTime = 2;
    var eatActionNode = node.getChildByName("play_tips");
    if(!eatActionNode)
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

    MjClient.Game3DTexiao = getCurrent3DMJTexiaoType();

    if (COMMON_UI3D.is3DUI() && MjClient.Game3DTexiao == 0 // 3D麻将，且选择了开启特效
        && (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ
            || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP
            || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP
            || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP
            || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ
        ) && (
            actType == ActionType.CHI
            || actType == ActionType.PENG
            || actType == ActionType.GANG
            || actType == ActionType.HU
            || actType == ActionType.ZIMO
            || actType == ActionType.KAIGANG
            || actType == ActionType.BUGANG
            || actType == ActionType.TING
        ))
    {
        // 新版动画 (吃/碰/杠/胡/补/开杠)
        cc.spriteFrameCache.addSpriteFrames("spine/new_chipengganghu/chipenggang0.plist", "spine/new_chipengganghu/chipenggang0.png");
        cc.spriteFrameCache.addSpriteFrames("spine/new_chipengganghu/chipenggang1.plist", "spine/new_chipengganghu/chipenggang1.png");
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

            case ActionType.BUGANG:

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
        switch(actType)
        {
            case ActionType.CHI:

                eatActionChild = eatActionNode.getChildByName("chi");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                var projNode = createSpine("spine/chi/chi.json", "spine/chi/chi.atlas");
                projNode.setAnimation(0, 'idle', false);
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
                projNode.setAnimation(0, 'idle', false);
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
                projNode.setAnimation(0, 'idle', false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                eatActionChild.addChild(projNode,999999);
                break;

            case ActionType.KAIGANG:
                eatActionChild = eatActionNode.getChildByName("gang");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                var projNode = new cc.Sprite("spine/kaigang/kaigang.png");
                projNode.setScale(0.0);
                projNode.runAction(cc.sequence(cc.scaleTo(0.2, 0.6), cc.scaleTo(0.3, 0.5)) );
                eatActionChild.addChild(projNode,999999);
                break;

            case ActionType.BUGANG:
                eatActionChild = eatActionNode.getChildByName("gang");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                var projNode = new cc.Sprite("spine/bu/bu.png");
                projNode.setScale(0.0);
                projNode.runAction(cc.sequence(cc.scaleTo(0.2, 0.6), cc.scaleTo(0.3, 0.5)) );
                eatActionChild.addChild(projNode,999999);
                break;

            case ActionType.HU:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/hu/skeleton.json", "spine/hu/skeleton.atlas");
                projNode.setAnimation(0, 'idle', false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(0.5);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.QINGYISE:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/qingyise/skeleton.json", "spine/qingyise/skeleton.atlas");
                projNode.setAnimation(0, 'idle', false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(0.5);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.TIANHU:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/tianhu/skeleton.json", "spine/tianhu/skeleton.atlas");
                projNode.setAnimation(0, 'idle', false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(0.5);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.DIHU:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/dihu/skeleton.json", "spine/dihu/skeleton.atlas");
                projNode.setAnimation(0, 'idle', false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(0.5);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.QIDUI:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/qidui/skeleton.json", "spine/qidui/skeleton.atlas");
                projNode.setAnimation(0, 'idle', false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(0.5);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.GANGKAI:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/dagangkaihua/dagangkaihua.json", "spine/dagangkaihua/dagangkaihua.atlas");
                projNode.setAnimation(0, 'idle', false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(0.5);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.ZIMO:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/zimo/skeleton.json", "spine/zimo/skeleton.atlas");
                projNode.setAnimation(0, 'idle', false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(0.5);
                eatActionChild.addChild(projNode,999999);
                break;

            case ActionType.FLOWER:
                eatActionChild = eatActionNode.getChildByName("hua");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));

                var projNode = createSpine("spine/buhua/skeleton.json", "spine/buhua/skeleton.atlas");
                projNode.setAnimation(0, 'idle', false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(0.5);
                eatActionChild.addChild(projNode,999999);

                break;
            case ActionType.TING:
                eatActionChild = eatActionNode.getChildByName("ting");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                var projNode = createSpine("spine/ting/ting.json", "spine/ting/ting.atlas");
                projNode.setAnimation(0, 'idle', false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.WANGZHUA:
                eatActionChild = eatActionNode.getChildByName("zhua");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
                var projNode = createSpine("spine/wangzhua/wangzhua.json", "spine/wangzhua/wangzhua.atlas");
                projNode.setAnimation(0, 'idle', false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.GENGZHUANG:

                eatActionChild = eatActionNode.getChildByName("hua");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));

                var projNode = createSpine("spine/genzhuang/skeleton.json", "spine/genzhuang/skeleton.atlas");
                projNode.setAnimation(0, 'idle', false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(0.5);
                eatActionChild.addChild(projNode,999999);

                break;
            case ActionType.LIANGPIAN:

                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();

                eatActionChild = eatActionNode.getChildByName("hua");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                eatActionChild.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(callback)));

                var projNode = createSpine("spine/liangpian/skeleton.json", "spine/liangpian/skeleton.atlas");
                projNode.setAnimation(0, 'idle', false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(0.5);
                eatActionChild.addChild(projNode,999999);

                break;
            case ActionType.WANGDIAO:
                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/wangdiao/skeleton.json", "spine/wangdiao/skeleton.atlas");
                projNode.setAnimation(0, 'animation', false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(0.7);
                // var animationListener = function(skeletonNode, trackEntry, eventType, event, loopCount){
                //     if(eventType == sp.ANIMATION_EVENT_TYPE.COMPLETE){
                //         eatActionNode.getChildByName("hu").visible = false;
                //     }
                // };
                // projNode.setAnimationListener(projNode,animationListener);
                eatActionChild.addChild(projNode,999999);
                break;
            case ActionType.WANGCHUANG:
                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/wangchuang/skeleton.json", "spine/wangchuang/skeleton.atlas");
                projNode.setAnimation(0, 'animation', false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(0.7);
                // var animationListener = function(skeletonNode, trackEntry, eventType, event, loopCount){
                //     if(eventType == sp.ANIMATION_EVENT_TYPE.COMPLETE){
                //         eatActionNode.getChildByName("hu").visible = false;
                //     }
                // };
                // projNode.setAnimationListener(projNode,animationListener);
                eatActionChild.addChild(projNode,999999);
                break;
        }
    }


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

    if(MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP  ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP  ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP  ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHHZP)
    {
        scale = 2;
        infoList = [
            {framename : "bb", delaytime : 0.1, playCount : 3},
            {framename : "daku", delaytime : 0.15, playCount : 3},
            {framename : "fennu_", delaytime : 0.2, playCount : 1},
            {framename : "guzhang", delaytime : 0.2, playCount : 4},
            {framename : "kaiqiang", delaytime : 0.18, playCount : 1},
            {framename : "kaixin", delaytime : 0.2, playCount : 2},
            {framename : "keshui", delaytime : 0.2, playCount : 1},
            {framename : "pp", delaytime : 0.2, playCount : 2},
            {framename : "tuxue", delaytime : 0.2, playCount : 1}
        ];
    }

    var obj = infoList[num]
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

    //炮兵表情音效
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP  ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP  ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP  ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHHZP){

        var url = "chat/" + framename;
        playEffect(url);
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


// 邵阳麻将新宁麻将加锤标记显示设置
function setJiaChuiTipsShow(sp,data){
    if(data.jiachuiNum === 1)
        sp.loadTexture("playing/other/jiachui_text_1.png");
    else
        sp.loadTexture("playing/other/jiachui_text_0.png");
}




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
                    if( distance < 50 && distance >=0 )
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

            //add by sking 当有人距离小于500米 时候提示
            // if(displayCount >= 1 && !tData.matchId)
            // {
            //     if (tData.maxPlayer == 3)
            //         MjClient.Scene.addChild(new showDistance3PlayerLayer());
            //     else
            //         MjClient.Scene.addChild(new showDistanceLayer());
            // }
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
        if(type == 0)
        {
            node.getParent().visible = true;
            node.setString(message);
            var callback = function()
            {
                node.getParent().visible = false;
            };

            node.getParent().width = node.stringLength * node.fontSize + 72;
            node.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(callback)));
        }
        else if(type == 1)
        {
            node.getParent().visible = true;
            node.setString(message.text);
            var callback = function()
            {
                node.getParent().visible = false;
            };

            var musicnum = msg.num + 1;

            //var one = node.getCustomSize().width / 20.0;
            node.getParent().width = node.stringLength * node.fontSize + 72;
            var voiceType = /*message.voiceType == 0 ? "normal" : */ MjClient.gameType;
            if(MjClient.isInGoldField() && MjClient.getGoldFiledType() == 1){
                voiceType = GoldPrefix + MjClient.gameType;
            }
            playEffect(GameSound4Chat[voiceType][getRandomRange(0,GameSound4Chat[voiceType].length-1)] + musicnum, false, pl.info.sex);
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

    cc.audioEngine.unloadEffect(message);

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
function setHunNodeVisible(isVisible) {
    MjClient.playui.jsBind.banner.hunPai._node.visible = isVisible;
}

//设置地区信息
function setAreaTypeInfo(isVisible)
{
    var info = MjClient.playui.jsBind.banner._node.getChildByName("gameName");
    if(!info){
        info = MjClient.playui.jsBind.gameName._node
    }

    if(isVisible && info)
    {
        cc.log("----- sking -----5555555555555555555555 =" + MjClient.gameType);
        var text = GameBg[MjClient.gameType];
        info.loadTexture(text);
        info.visible = true;
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

//设置地区信息
function setAreaTypeInfo_MJ(isVisible)
{
    var info = MjClient.playui.jsBind.gameName._node;
    if(isVisible && info)
    {
        cc.log("----- sking -----" + MjClient.gameType);
        var text = GameBg[MjClient.gameType];
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
            console.log("在触摸东西11111111");
            var target = event.getCurrentTarget();
            var pos = target.getParent().convertTouchToNodeSpace(touch); // 世界坐标转换 (子节点相对于父节点的位置)
            if(!target.visible){
                //按钮不可见直接屏蔽触摸事件，避免触摸到隐藏的按钮还触发事件
                return false;
            }
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
        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shishiyuyin", {uid: SelfUid()});
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
                // endFunc();
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
                if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
                    node.setString(number+"");
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
                        playTimeUpEff = playEffect("loop_alarm", true);
                        MjClient.native.NativeVibrato();
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

function playEffect(sd, isLoop, sex, voiceType)
{
    // mylog(sd);
    var str = "sound/"+sd+".mp3";
    //if (cc.sys.OS_ANDROID == cc.sys.os)
    //{
    //    str = "sound_ogg/"+sd+".ogg";
    //}
    if(MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_TY ||
        (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP && 
        (MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.JIANG_HUA_MJ )) ||
      //  MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN ||
        (MjClient.gameType == MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY && MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP)
    )
    {
        if(sex !== undefined && (MjClient.getAppType() != MjClient.APP_TYPE.BDYZPHZ &&
            MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP)){
            //说明是快捷聊天
            str = "sound/new_"+sd+".mp3";
        }
    }
    if( MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN)
    {
        if(MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ &&
            MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG &&
            MjClient.getAppType() != MjClient.APP_TYPE.QXXXGHZ&&
            MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP &&
            MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP)
        {
            str = "sound/new_"+sd+".mp3";
        }
    }
    cc.log(jsb.fileUtils.fullPathForFilename(str));
    if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
        MjClient.gameType === MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI)
    {
        var showNormal = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType,1);
        if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) {
            showNormal = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_VOICE_TYPE,1);
        }
        
        if(voiceType){
            var fullFilePath = str.replace("/normal/", "/local/");
            if (jsb.fileUtils.isFileExist(fullFilePath) && voiceType != 1)
            {
                str = fullFilePath;
            }
        }
        else if(showNormal != 0){
            var fullFilePath = str.replace("/normal/", "/local/");
            if (jsb.fileUtils.isFileExist(fullFilePath))
            {
                str = fullFilePath;
            }
        }
    }

    if(MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA)
    {
        var fullFilePath = str.replace("xxGaoHuZi/nv/normal/fix_msg/fix_msg_", "fix_msg/nv/fix_msg_");
        if (jsb.fileUtils.isFileExist(fullFilePath))
        {
            str = fullFilePath;
        }
    }

    // if(MjClient.getAppType() == MjClient.APP_TYPE.QXHHZP && 
    //     MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN)
    // {
    //     var showNormal = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType,0);
    //     if(showNormal != 0){
    //         var fullFilePath = str.replace("/normal/", "/local/");
    //         if (jsb.fileUtils.isFileExist(fullFilePath))
    //         {
    //             str = fullFilePath;
    //         }
    //     }
    // }

    if((MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP &&
        (MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA)) ||
        ((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI))
    {
        var showNormal = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType,0);
        if(showNormal != 1){
            var fullFilePath = str.replace("/fix_msg/", "/fix_msg_normal/");
            if (jsb.fileUtils.isFileExist(fullFilePath))
            {
                str = fullFilePath;
            }
        }
    }

    if(MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ){
        var showNormal = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType,1);
        if(showNormal == 0){
            var fullFilePath = str.replace("/daozhou/", "/normal/");
            if (jsb.fileUtils.isFileExist(fullFilePath))
            {
                str = fullFilePath;
            }
        }
    }
    // if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ &&
    //     (MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG || MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN))
    // {
    //     var showNormal = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0);
    //     if(showNormal != 0){
    //         cc.log("speak hua" + str);
    //         var fullFilePath = str.replace("/fix_msg/nv/", "/local_fix/nan/");
    //         if (jsb.fileUtils.isFileExist(fullFilePath))
    //         {
    //             str = fullFilePath;
    //         }
    //     }
    // }

    //邵阳APP 快捷语音调整
    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
        if(MjClient.gameType != MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI &&
            MjClient.gameType != MjClient.GAME_TYPE.TY_ZHUANZHUAN&&
            MjClient.gameType != MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG &&
            MjClient.gameType != MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI &&
            MjClient.gameType != MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI &&
            MjClient.gameType != MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI &&
            MjClient.gameType != MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI &&
            MjClient.gameType != MjClient.GAME_TYPE.DAO_ZHOU_MJ &&
            MjClient.gameType != MjClient.GAME_TYPE.YONG_ZHOU_MJ &&
            MjClient.gameType != MjClient.GAME_TYPE.JIANG_HUA_MJ &&
            !getSYMovePlayYZ_ziPai()){

            // console.log(sd + "  $$$$");

            if(MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG ||
                MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_TY||
                MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA ||
                MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA ||
                MjClient.gameType == MjClient.GAME_TYPE.LEI_YANG_GMJ ||
                MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG
            ){
                sd = sd.replace("normal/fix_msg", "new_fix_msg");
                str = "sound/" + sd + ".mp3";
            }else if(MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA){
                sd = sd.replace("changsha/fix_msg", "new_fix_msg");
                str = "sound/" + sd + ".mp3";
            }else{
                sd = sd.replace("fix_msg", "new_fix_msg");
                str = "sound/" + sd + ".mp3";
            }

            // console.log(str + " $$$");
        }
    }

    //从永州移植到邵阳的字牌玩法
    if (getSYMovePlayYZ_ziPai()) {
        sd = sd.replace("fix_msg", "fix_msg_yongzhou");
        str = "sound/" + sd + ".mp3";
    }

    //支持男女声
    if (str.indexOf("/nv/") >= 0 && sex == 1)
    {
        var fullFilePath = str.replace("/nv/", "/nan/");
        if (jsb.fileUtils.isFileExist(fullFilePath))
        {
            str = fullFilePath;
        }
    }
    cc.log("========== play effect path =  " + str);
    return reallyPlayEffect(str, isLoop);
}

function playEffectInPlay(card, isLoop)
{
    var isNewSound = false;
    var voiceType = getCurrentVoiceType() == 0 ? "normal" : MjClient.gameType;

    if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
        && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG){
        if(card.toString() == "fangpao") // 邵阳地区麻将 放炮全部改成胡
            card = "hu";
    }

    if (MjClient.gameType == MjClient.GAME_TYPE.NIU_NIU || //牛牛暂时不用normal中的音效
        MjClient.gameType == MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN ||
        MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI ||
        MjClient.gameType == MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY ||
        MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_TY ||
        MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER ||
        MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR ||
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT ||
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_TY ||
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_JZ ||
        MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO ||
        MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z ||
        MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King ||
        MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King ||
        MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King ||
        MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ ||
        MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG||
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU ||
        MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
        MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA ||
        MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI ||
        MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI ||
        MjClient.gameType === MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
        MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA ||
        MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI ||
        MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN ||
        MjClient.gameType === MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
        MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA ||
        MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA ||
        MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA ||
        MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA ||
        MjClient.gameType == MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO ||
        MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI || 
        MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN)
    {
        voiceType = MjClient.gameType;

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP &&
            (MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER ||
            MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR ||
            MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO ||
            MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z ||
            MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King ||
            MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King ||
            MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King ))
        {

            var uid = SelfUid();
            var index = util.localStorageEncrypt.getNumberItem("Setting_sound_type_" + uid,1);
            if(index == 0){
                isNewSound = true;
            }
        }
    }

    // // 王钓麻将增加的语音切换
    // if(MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG){
    //     var bShowTypeEffect = util.localStorageEncrypt.getBoolItem("oldShowPlayTypeEffect",true);  
    //     voiceType = bShowTypeEffect ? "normal" : MjClient.gameType; 
    // }

    var origSounds = GameSound4Play[voiceType][card.toString()];

    // 溆浦老牌语音特殊
    if(MjClient.gameType === MjClient.GAME_TYPE.XU_PU_LAO_PAI){
        if(getCurrentVoiceType() === 0){
            // 普通话
            origSounds = GameSound4Play[MjClient.gameType]["mandarin"][card.toString()];
        }else{
            // 本地话
            origSounds = GameSound4Play[MjClient.gameType]["dialect"][card.toString()];
        }
    }

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

    if (pl.info.sex == 1)
    {
        for (var i=0; i<sounds.length; i++)
        {
            var newPath = sounds[i].replace("/nv/", "/nan/");
            var fullFilePath = "sound/"+newPath+".mp3";
            if (jsb.fileUtils.isFileExist(fullFilePath))
            {
                if(MjClient.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN || MjClient.gameType == MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA){
                    //do nothing 霸炸弹 暂时去掉男声
                }else{
                    sounds[i] = newPath;
                }

            }
        }
    }

    if ((MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA/* || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA*/) && getCurrentVoiceType() == 1) {
        if(MjClient.gameType != MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA ||
            MjClient.gameType != MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA ||
            MjClient.gameType != MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA ||
            MjClient.gameType != MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI ||
            MjClient.gameType != MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA) {
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

    if(MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ &&
        (MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
        MjClient.gameType === MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI))
    {
        var showNormal = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType,1);
        if(showNormal != 0){
            for (var i=0; i<sounds.length; i++)
            {
                if(pl.info.sex == 1){
                    sounds[i] = sounds[i].replace("/normal/", "/local/");
                }else{
                    var newPath = sounds[i].replace("/normal/", "/local/");
                    cc.log("newPath:" + newPath);
                    var fullFilePath = "sound/"+newPath+".mp3";
                    if (jsb.fileUtils.isFileExist(fullFilePath))
                    {
                        sounds[i] = newPath;
                    }
                }
            }
        }
    }

    if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) &&
        (MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI))
    {
        var showNormal = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_VOICE_TYPE,1);
        if(showNormal != 0){
            for (var i=0; i<sounds.length; i++)
            {
                if(pl.info.sex == 1){
                    sounds[i] = sounds[i].replace("/normal/", "/local_xiangxiang/");
                }else{
                    var newPath = sounds[i].replace("/normal/", "/local_xiangxiang/");
                    cc.log("newPath:" + newPath);
                    var fullFilePath = "sound/"+newPath+".mp3";
                    if (jsb.fileUtils.isFileExist(fullFilePath))
                    {
                        sounds[i] = newPath;
                    }
                }
            }
        }
    }

    if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI)
    {
        var showNormal = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType,1);
        if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) {
            showNormal = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_VOICE_TYPE,1);
        }

        if(showNormal != 0){
            for (var i=0; i<sounds.length; i++)
            {
                if(pl.info.sex == 1){
                    sounds[i] = sounds[i].replace("/normal/", "/local_xiangtan/");
                }else{
                    var newPath = sounds[i].replace("/normal/", "/local_xiangtan/");
                    cc.log("newPath:" + newPath);
                    var fullFilePath = "sound/"+newPath+".mp3";
                    if (jsb.fileUtils.isFileExist(fullFilePath))
                    {
                        sounds[i] = newPath;
                    }
                }
            }
        }
    }

    if(MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA)
    {
        for (var i=0; i<sounds.length; i++)
        {
            if(pl.info.sex == 1){
                sounds[i] = sounds[i].replace("/normal/", "/local/");
            }else{
                var newPath = sounds[i].replace("/normal/", "/local/");
                var fullFilePath = "sound/"+newPath+".mp3";
                if (jsb.fileUtils.isFileExist(fullFilePath))
                {
                    cc.log("newPath:" + newPath);
                    sounds[i] = newPath;
                }
            }
        }
    }

    if(MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN)
    {
        var showNormal = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType,1);
        if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) {
            showNormal = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_VOICE_TYPE,1);
        }

        cc.log("showNormal:" + showNormal);
        if(showNormal == 1){
            for (var i=0; i<sounds.length; i++)
            {
                if(pl.info.sex == 1){
                    sounds[i] = sounds[i].replace("/normal/", "/local/");
                }else{
                    var newPath = sounds[i].replace("/normal/", "/local/");
                    cc.log("newPath:" + newPath);
                    var fullFilePath = "sound/"+newPath+".mp3";
                    if (jsb.fileUtils.isFileExist(fullFilePath))
                    {
                        sounds[i] = newPath;
                    }
                }
            }
        }
    }

    if(getSYMovePlayYZ_ziPai()) {
        var showNormal = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType,1);
        var voiceStr  = "new_yongzhou_move/";
        if (showNormal == 1) {
            voiceStr  = "yongzhou_move/";
        }

        for (var i=0; i<sounds.length; i++)
        {
            if(pl.info.sex == 1){
                sounds[i] = sounds[i].replace("yongzhou/", voiceStr);
            }else{
                var newPath = sounds[i].replace("yongzhou/", voiceStr);
                cc.log("newPath:" + newPath);
                var fullFilePath = "sound/"+newPath+".mp3";
                if (jsb.fileUtils.isFileExist(fullFilePath))
                {
                    sounds[i] = newPath;
                }
            }
        }
    }

    if(
        (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP && (MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA)) || 
        ((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ )&& MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI)
      )
    {
        var showNormal = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType,0);
        cc.log("showNormal:" + showNormal);
        if(showNormal == 0){
            for (var i=0; i<sounds.length; i++)
            {
                if(pl.info.sex == 1){
                    sounds[i] = sounds[i].replace("15hu/", "yongzhou/");
                }else{
                    var newPath = sounds[i].replace("15hu/", "yongzhou/");
                    var fullFilePath = "sound/"+newPath+".mp3";
                    if (jsb.fileUtils.isFileExist(fullFilePath))
                    {
                        sounds[i] = newPath;
                    }
                }
            }
        }
    }

    var soundFile = sounds[0];

    if((MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP && (MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || 
                                                            MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA || 
                                                            MjClient.gameType == MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI || 
                                                            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU)) ||
        ((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && (MjClient.gameType == MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI ||
                                                            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU))
      ){
        var type = getCurrentVoiceType();
        if(!type || type > 2){
            type = 0;
        }
        soundFile = sounds[type];
    }

    if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ &&
        (MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG || MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN))
    {
        var showNormal = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0);
        cc.log("difanghua" + showNormal);
        if(showNormal != 0){
            for (var i=0; i<sounds.length; i++)
            {
                cc.log("pythua" + sounds[i] + ":sex" + pl.info.sex);
                var newPath = sounds[i].replace("normal", "local");
                cc.log("newPath:" + newPath);
                var ranNum = Math.floor(Math.random()*2);
                var newTempPath =( ranNum == 1) ? (newPath + "_1") : newPath;
                cc.log("randNum：" + ranNum + ":" + newTempPath);
                var fullFilePath = "sound/"+newTempPath+".mp3";
                if (jsb.fileUtils.isFileExist(fullFilePath))
                {
                    soundFile = newTempPath;
                }
            }
        }
    }
    cc.log("soundFile:" + soundFile);
    switch (voiceType)
    {
        case MjClient.GAME_TYPE.LIAN_YUN_GANG:
        case MjClient.GAME_TYPE.DONG_HAI:
        case MjClient.GAME_TYPE.GUAN_YUN:
        case MjClient.GAME_TYPE.GUAN_NAN:
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
        case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
        case MjClient.GAME_TYPE.DOU_DI_ZHU_NT:
        case MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN:
            if (card == "pass" || card == "single")
            {
                soundFile = sounds[getRandomRange(0,100)<50 ? 0 : 1];
            }
            break;
        case "normal":
            if (MjClient.gameType == MjClient.GAME_TYPE.RU_GAO)
            {
                if (card == 71 || card == 81 || card == 91)
                {
                    soundFile = "normal_rugao/nv/"+card;
                }
            }
            else if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
            {
                if (card == 'gang' || card == 'anGang' )
                {
                    soundFile = "normal/nv/bu";
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
    }

    var str = "sound/"+soundFile+".mp3";
    //if (cc.sys.OS_ANDROID == cc.sys.os)
    //{
    //    str = "sound_ogg/"+soundFile+".ogg";
    //}

    if(isNewSound){
        str = "sound/new_"+soundFile+".mp3";
    }

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
        playTimeUpEff = playEffect("loop_alarm", true);
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
    for(var off = 0;off < 4;off++)
    {
        var node = getNode(off);
        var pl = getUIPlayer(off);

        if(!pl)
        {
            return;
        }
        //初始化玩家金币和名称
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

    cc.log("===========cds function calTingSet ======= " + JSON.stringify(cds));

    for (var i = 0; i < allCardsArray.length; i++) {
        if (MjClient.majiang.canHu(cds, allCardsArray[i], hun)) {
            tingSet[allCardsArray[i]] = 1;
        }
    }
    return tingSet;
}

//求出，听牌时，选择一张牌能胡的牌的张数 by sking
function getCheckTingHuCards(selectCard,mjhandCard) {
    var copyhand = mjhandCard.slice();
    var index = copyhand.indexOf(selectCard);//排除当前选择的一张牌
    copyhand.splice(index,1);
    var tingSet = null;
    tingSet = calTingSet(copyhand, MjClient.data.sData.tData.hunCard);

    return tingSet;
}

//求出，此张牌，外面还剩余可胡的张数 by sking
function getHuCardNum(card)
{
    var icount = 4;//每一种牌总共4张
    if (MjClient.GAME_TYPE.LEI_YANG_GMJ == MjClient.gameType)
    {
        var hunCard = MjClient.data.sData.tData.hunCard;
        var showcard = MjClient.majiang.getShanGunCard(hunCard);
        if (card == showcard && card != hunCard)//系统删了一张牌
        {
            icount = 3;
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
        if (!pl) {
            continue;
        }

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
        if(pl.mjgang0.length > 0)
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
        if(pl.mjgang1.length > 0)
        {
            for (var i = 0; i < pl.mjgang1.length ; i++)
            {
                if(pl.mjgang1[i] == card)
                {
                    icount -= 4;
                    break;
                }
            }
        }

        //吃
        if(pl.mjchi.length > 0)
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
        if(pl.mjput.length > 0)
        {
            //碰
            for (var i = 0; i < pl.mjput.length ; i++)
            {
                if(pl.mjput[i] == card)
                {
                    icount -= 1;
                }
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
        var _dataValue = areaSelectMode[data];
        var descConf = getGameCnDesc(gameType, data, _dataValue, areaSelectMode)
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

    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
        path = "daTongZi/playing/";
        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI){
            path = "playing/gameTable/";

            if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
                path = "setting/louDiFPF/";
            }
            if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King ||
                MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King ||
                MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER ||
                MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King ||
                MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR ||
                MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI ||
                MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO ||
                MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z)
            {
                path = "playing/gameTable/YZCHZ/";
            }
        }

        if (GameClass[MjClient.gameType] === MjClient.GAME_CLASS.CHANG_PAI){
            path = "playing/gameTable/";
        }
    }

    if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI){
            path = "setting/";
        }
    }

    if ((MjClient.playui || MjClient.goldMatchingui) && typeof(MjClient.gameType) != "undefined" && typeof(GameClass[MjClient.gameType]) != "undefined") {
        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
            path = "playing/paodekuaiTable/";
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU)
            path = "playing/doudizhu/";
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA)
            path = "playing/sanDaHa/";
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG)
            path = "playing/MJ/";
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
    var path = "playing/MJ3D/background/";
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
function changeGameBg(backImageView, atMjGameing,gameBgType)
{
    var file = null;
    var type = gameBgType ? gameBgType : getCurrentGameBgType();

    if(COMMON_UI3D.is3DUI())
    {
        var defaultFile = "playing/MJ3D/beijing/beijing3D_1.jpg";
        var file = getGameBgFile_3D(type);
        file = jsb.fileUtils.isFileExist(file) ? file : defaultFile;
        backImageView.loadTexture(file);
        return;
    }

    if (isIPhoneX() && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI && type <= 1)
        file = getGameBgFile(type+4);
    else
        file = getGameBgFile(type);

    cc.log("changeGameBg-------------------:",file);
    if (file != "") backImageView.loadTexture(file);
    return;
}

function getNewMJBgFile(oldFile, type)
{
    if(COMMON_UI3D.is3DUI()) return COMMON_UI3D.getNewMJBgFile3D(oldFile, type);


    if (oldFile.indexOf("playing/MJ/") == -1)
        return oldFile;

    if (type == undefined)
        type = getCurrentMJBgType();

    var replaceFunc = function(oldFile, bgDir, mjDir) {
        var newFile = "";
        newFile = oldFile.replace(/\/MJ\/.*Mj_/, "/MJ" + bgDir + "/Mj_");
        newFile = newFile.replace(/\/MJ\/.*(Bamboo_|Character_|Dot_|flower_|Green.png|Red.png|White.png|Wind_)/, "/MJ" + mjDir + "/$1")
        return newFile;
    }

    var newFile = "";
    if (type == 0) {
        newFile = replaceFunc(oldFile, "", "");
    }
    else if (type == 1) {
        newFile = replaceFunc(oldFile, "/MJBg1", "/MJCard1");
    }
    else if (type == 2) {
        newFile = replaceFunc(oldFile, "/MJBg2", "/MJCard2");
    }
    else if (type == 3) {
        newFile = replaceFunc(oldFile, "/MJBg3", "/MJCard3");
    }
    else if (type == 4) {
        newFile = replaceFunc(oldFile, "/MJBg4", "/MJCard4");
    }

    //if (newFile != "" && newFile != oldFile)
    //    cc.log("newFile=" + newFile);

    if (newFile != "" && newFile != oldFile && !jsb.fileUtils.isFileExist(newFile)) {
        cc.log("getNewMJBgFile file not exsit : " + newFile);
        newFile = "";
    }

    return newFile != "" ? newFile : oldFile;
}

function  setMJDif(node)
{
    var _currentMJType = getCurrentMJBgType();
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
    {
        if (node.name == "mjhand") {
            if (!node.standScale)
                node.standScale = node.getScale();
            var tempScale = node.getScale();
            if (_currentMJType == 3)
                node.setScale(node.standScale * 1.04);
            else if (_currentMJType == 2)
                node.setScale(node.standScale * 1.03);
            else if (_currentMJType == 0)
                node.setScale(node.standScale * 0.995);
            else
                node.setScale(node.standScale);
        }

        var imgNode = node.getChildByName("imgNode");
        if (imgNode) {
            cc.log("========setMJDir===" + node.name);
            if (!imgNode.standScale)
                imgNode.standScale = imgNode.getScale();
            if (!imgNode.standY)
                imgNode.standY = imgNode.y;
            if (_currentMJType == 2 || _currentMJType == 1)
                imgNode.setScale(imgNode.standScale * 0.88);
            else
                imgNode.setScale(imgNode.standScale);

            if(node.name == "outBig"){
                imgNode.y = imgNode.standY + 8;
            }else if (_currentMJType == 3 && node.off == 2){
                imgNode.y = imgNode.standY - 10;
            }else if(_currentMJType == 3 && node.off == 4){
                imgNode.y = imgNode.standY + 10;
            }else{
                imgNode.y = imgNode.standY;
            }
        }
    }else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ){
        var imgNode = node.getChildByName("imgNode");
        if (imgNode) {
            if (!imgNode.standY)
                imgNode.standY = imgNode.y;

            if (_currentMJType == 2 && (node.off == 0 || node.off == 2))
                imgNode.y = imgNode.standY - 10;
            else if (_currentMJType == 4){
                if (node.off == 0 || node.off == 4) {
                    imgNode.y = imgNode.standY + 10;
                }else if (node.off == 2) {
                    imgNode.y = imgNode.standY - 5;
                }else if (node.off == 1) {
                    imgNode.x = imgNode.x - 2;
                }else if (node.off == 3) {
                    imgNode.x = imgNode.x + 10;
                }

            }
            else
                imgNode.y = imgNode.standY;

            if(node.name === "cardNode" && node.off === 0){
                if(_currentMJType === 3)
                    imgNode.setScale(1.4);
                else
                    imgNode.setScale(1.0);
            }
        }
    } else{
        var imgNode = node.getChildByName("imgNode");
        if (imgNode) {
            if (!imgNode.standY)
                imgNode.standY = imgNode.y;

            if (_currentMJType == 2 && (node.off == 0 || node.off == 2))
                imgNode.y = imgNode.standY - 10;
            else
                imgNode.y = imgNode.standY;
        }
    }
}

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
        if(pl.winall)
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
    zuanshi.setPosition(fromCoinNode.getPosition());
    zuanshi.setScale(MjClient.size.height/720);
    fromNode.getParent().addChild(zuanshi,10000);

    callback = callback ? callback: function(){};
    zuanshi.runAction(cc.sequence(cc.fadeIn(0.2), cc.moveTo(costTime, toCoinNode.getPosition()), cc.fadeOut(0.2), cc.callFunc(callback), cc.removeSelf()));
}

function setGameOverPanelPlayerState(stateNode, pl, checkCount)
{
    var fileName = "";
    var cardCount = checkCount ? MjClient.majiang.CardCount(pl) : -1;

    if (pl.winType == 3)
    {
        if (!checkCount || cardCount == 14)
            fileName = "gameOver/ico_zimo.png";
    }
    else if (pl.winType > 0)
    {
        if (!checkCount || cardCount == 14)
            fileName = "gameOver/ico_hu-0.png";
    }
    else if ((pl.mjdesc + "").indexOf("点炮") >= 0)
    {
        if (!checkCount || cardCount == 13)
            fileName = "gameOver/ico_dianpao.png";
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

/**
 * @function 显示每个玩家放大出牌预览效果
 * @param {node} playerUi "top"|"left"|"down"|"right" node
 * @card {number} card 麻将牌值
 */
function showMJOutBig(playerUi, card)
{
    cc.log("here@@2 ")
    var isScale = false;
    if (MjClient.data && MjClient.data.sData && (MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.LEI_YANG_GMJ ||
        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ || MjClient.gameType == MjClient.GAME_TYPE.JIANG_HUA_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN || MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
        MjClient.data.sData.tData.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA
        || (MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ && MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG))) {
        if((MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) && (MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN
            || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA))
        {
            isScale = util.localStorageEncrypt.getBoolItem("isoutCardScale", true);
        }
        else
            return;
    }

    cc.log("-----showMJOutBig------" + playerUi.getName())
    var outBig = playerUi.getChildByName("outBig");
    cc.log("==outBig:" + outBig);
    if (outBig && isScale)
    {
        cc.log("-----showMJOutBig--2----")
        function outBigCallback()
        {
            this.removeAllChildren();
            this.visible = false;
            cc.log("-----showMJOutBig---3---")
        }
        setCardSprite(outBig, card, 5);

        outBig.visible = true;
        outBig.zIndex = 500;
        outBig.setOpacity(255);
        if(isScale)
            outBig.runAction(cc.Sequence(cc.delayTime(0.5), cc.callFunc(outBigCallback, outBig)));
        else
            outBig.runAction(cc.Sequence(cc.delayTime(0.5), cc.fadeOut(0.6), cc.callFunc(outBigCallback, outBig)));
    }
}
// 获取解散方式的图片
function getDismissTypeImgFile(pl){
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
// 设置解散图标
function setDismissTypeImg(pl,node,scw,sch,file){
    if(MjClient.isDismiss && (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ
        || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)){

        var imgFile = getDismissTypeImgFile(pl);
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
        item._index = i;
        item.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    newobj.selectItem(sender._index);
                    newobj._callback(sender._index, sender, newobj._nodeList);
                    break;
            }
        }, item);
    }

    newobj.selectItem = function(index){
        index = Number(index);
        if(index >= newobj._nodeList.length){
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
        cc.log("==========_nodeList============");
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

    if (MjClient.getAppType() !=  MjClient.APP_TYPE.BDHYZP) {
        for(var i in playuis){
            var playui = playuis[i];
            if(i != off){
                gangJieSuanAnim(playui, playuis[off])
            }
        }
    }

    return true;
}

//清除热更缓存目录, 由于删了资源，为避免出错所以会重启游戏
removeUpdataDirectory = function(){
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/project.manifest");
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/project.manifest.temp");
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath() + "update/res/project.manifest");
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/res_goldField/project.manifest");
    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/res_goldField_temp/project.manifest.temp");
    util.localStorageEncrypt.setStringItem("VERSION_RESOURCE_CLASS_" + MjClient.RESOURCE_CLASS.GOLD_FIELD, "");

    if (jsb.fileUtils.isFileExist("src/Update_min.jsc") || jsb.fileUtils.isFileExist("src/Update_min.js") ||
        jsb.fileUtils.isFileExist("src/loginLayer.jsc") || jsb.fileUtils.isFileExist("src/loginLayer.js") ) {
        jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/project.json");
        jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/main.js");
        jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath()+ "update/main.jsc");
    }

    MjClient.restartGame();

    // cc.audioEngine.end();
    // cc.game.restart();
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

/**
 *
 * @param {ImageView} backImageView
 */
function changeGameTitleBg(backImageView, atMjGameing)
{
    var type = getCurrentGameBgType();
    var file = "playing/gameTable/titleBg2.png";
    switch(type){
        case 0:
        case 1:
        case 2:
            file = "playing/gameTable/titleBg"+ type +".png";
            break;
    }

    if (jsb.fileUtils.isFileExist(file))
        backImageView.loadTexture(file);
};

//检测距离信息
function checkCanShowDistance(layoutData)
{
    if (MjClient.playui.isNewFrameMaJiang && !MjClient.playui.isCheckDistance()) {
        return;
    }

    var gameUI = MjClient.playui;
    if(gameUI){
        var disLayer = gameUI.disLayer;
        if(disLayer){
            disLayer.removeFromParent();
            gameUI.disLayer = null;
        }

        var tState = MjClient.data.sData.tData.tState;
        cc.log("===tState:", tState);
        if(!tState || tState > TableState.waitReady){
            return;
        }
        if(MjClient.data.sData.tData.fieldId){
            return;
        }
        if(MjClient.timeoutShowDistanceID){
            clearTimeout(MjClient.timeoutShowDistanceID);
            MjClient.timeoutShowDistanceID = null;
        }

        var maxNum = parseInt(MjClient.data.sData.tData.maxPlayer);
        if(maxNum == 3){
            disLayer = new Distance3PlayerLayer(layoutData);
        }else if(maxNum == 4){
            disLayer = new DistanceLayer(layoutData);
        }else{
            return;
        }
        gameUI.disLayer = disLayer;
        gameUI.addChild(disLayer);
    }
}

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

        var str8 = str1 + ",缺" +_needCount+ "人,速度加入【"+AppCnName[MjClient.getAppType()]+"】\n" + "(复制此消息打开游戏可直接进入该房间)";
        GLog(roomInfo + str8);
        MjClient.native.doCopyToPasteBoard("房间号:[" + tData.tableid + "]\n" + roomInfo + str8);
        MjClient.showMsg("已复制房间号，请不要返回大厅。打开社交平台后粘贴房间信息。", function(){
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
        var txt_club = clubInfoTable ? "(亲友圈:" + clubInfoTable.clubId + "," + getPlayersName(MjClient.data.sData.players) +  ")" :
            "(" + getPlayersName(MjClient.data.sData.players) + ")";
        var _playerCount = Object.keys(MjClient.data.sData.players).length;
        var _needCount = _MaxPlayerCount - _playerCount;

        var _urlStr = MjClient.remoteCfg.entreRoomUrl+"?vipTable="+tData.tableid;
        var _titleStr = "";
        var _contentStr = ((clubInfoTable && clubInfoTable.ruleName) ? GameCnName[MjClient.gameType] + "," : "") + roomInfo + str7;
       
        _titleStr = GameCnName[MjClient.gameType] + "  " + tData.tableid + " 缺" + _needCount+"人" +  " 点击加入>>>" + txt_club;
        // _titleStr = GameCnName[MjClient.gameType] + " 房间" + tData.tableid + txt_club;

        cc.log("邀请信息:", _titleStr, _contentStr)
        MjClient.getInviteUrl(function (_urlStr) {
            MjClient.shareUrlToMultiPlatform(_urlStr, _titleStr, _contentStr);
        });
    }
    else if(infoType == 3) //小结算描述
    {
        roomInfo = GameCnName[MjClient.gameType] + "," + getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount) + "房间号:" + tData.tableid;
        if(MjClient.isShenhe){
            roomInfo = "牌友联盟"+GameCnName[MjClient.gameType] + "," + getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount) + "房间号:" + tData.tableid;
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
    }else if(infoType == 5) // 房间主要信息     长沙麻将 房间号： 866688  长沙麻将
    {
        roomInfo = tData.gameCnName + "  房间号:" + tData.tableid;
    }


    return roomInfo;
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
                break;
            default:
                break;
        }
    }, this);

    clubYaoqingBtn.runAction(cc.repeatForever(cc.callFunc(function() {
        clubYaoqingBtn.setVisible(wxinviteBtn && wxinviteBtn.isVisible());
    })));

    var getRoomNumBtn = waitNode.getChildByName("getRoomNum");

    if (!pos) {
        if (MjClient.APP_TYPE.QXHAMJ && MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ)
            pos = 3;
        else
            pos = 1;
    }

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
        else {
            var y = clubYaoqingBtn.y - clubYaoqingBtn.height * clubYaoqingBtn.scaleY / 2;
            if (y < 5) {
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
        setWgtLayout(clubYaoqingBtn, [219/1280, 0],[0.5, 0.12],[0, 0]);
        setWgtLayout(wxinviteBtn, [219/1280, 0],[0.697, 0.12],[0, 0]);
        var backHomebtn = waitNode.getChildByName("backHomebtn");
        setWgtLayout(backHomebtn, [219/1280, 0],[0.30, 0.12],[0, 0]);
    }

    return clubYaoqingBtn;
}


//获得app所有游戏
getAllGameListArray = function()
{
    var all = {};
    all._gameTypeList = [];

    var type_arr = ["ziPai","maJiang","puKe"];

    /* if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ)
     {
     all._gameTypeList[0] = MjClient.gameListConfig.paohuziList;
     all._gameTypeList[1] = MjClient.gameListConfig.doudizhulist;
     }
     else
     {
     all._gameTypeList[0] = MjClient.gameListConfig.paohuziList;
     all._gameTypeList[1] = [];
     }*/

    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
    {
        var resetArr = [];
        if(MjClient.gameListConfig.paohuziList){
            resetArr = resetArr.concat(MjClient.gameListConfig.paohuziList);
        }
        if(MjClient.gameListConfig.doudizhulist){
            resetArr = resetArr.concat(MjClient.gameListConfig.doudizhulist);
        }
        for(var i = 0;i < type_arr.length;i++){
            all._gameTypeList[i] = [];
        }
        for(var i = 0;i < resetArr.length;i++){
            if(GameClass[resetArr[i]] == MjClient.GAME_CLASS.PAO_HU_ZI ||
               GameClass[resetArr[i]] == MjClient.GAME_CLASS.CHANG_PAI){
                all._gameTypeList[0].push(resetArr[i]);
            }else if(GameClass[resetArr[i]] == MjClient.GAME_CLASS.MA_JIANG){
                all._gameTypeList[1].push(resetArr[i]);
            }else if(GameClass[resetArr[i]] == MjClient.GAME_CLASS.PAO_DE_KUAI){
                all._gameTypeList[2].push(resetArr[i]);
            }else if(GameClass[resetArr[i]] == MjClient.GAME_CLASS.DOU_DI_ZHU){
                all._gameTypeList[2].push(resetArr[i]);
            }else if(GameClass[resetArr[i]] == MjClient.GAME_CLASS.SAN_DA_HA ) {
                all._gameTypeList[2].push(resetArr[i]);
            }else if(GameClass[resetArr[i]] == MjClient.GAME_CLASS.DA_TONG_ZI ||
                GameClass[resetArr[i]] == MjClient.GAME_CLASS.BA_ZHA_DAN ||
                GameClass[resetArr[i]] == MjClient.GAME_CLASS.BAN_BIAN_TIAN_ZHA){
                all._gameTypeList[2].push(resetArr[i]);
            }
        }
        cc.log("this._gameTypeList[1]:" + JSON.stringify(all._gameTypeList[1]));
    }
    else
    {
        all._gameTypeList[0] = MjClient.gameListConfig.paohuziList;
        all._gameTypeList[1] = [];
    }

    // 审核时特殊游戏列表：
    if(MjClient.isAroundBeijing() || MjClient.isShenhe)
    {
        if (MjClient.APP_TYPE.QXNTQP == MjClient.getAppType())
            all._gameTypeList[0] = [MjClient.GAME_TYPE.RU_GAO];
        else
            all._gameTypeList[0] = [all._gameTypeList[0][0]];
        all._gameTypeList[1] = [];
    }

    cc.log('this._gameTypeList------:'+all._gameTypeList);


    return all;
}


/**
 * 获取plist动画资源
 * @param preName {String} 图片资源前缀
 * @param len {Number} 动画资源总个数
 * @param delaytime {Number} 每帧延迟
 * @param playCount {Number} 播放次数
 * @param startIndex {Number} 图片开始位置
 */
function getAnimate(preName, len, delaytime, playCount, startIndex){
    playCount = playCount === undefined ? 1 : playCount;
    delaytime = delaytime === undefined ? 0.1 : delaytime;
    startIndex = startIndex === undefined ? 0 : startIndex;

    var arry = [];
    for(var i = startIndex; i <= len; i++)
    {
        var frame = cc.spriteFrameCache.getSpriteFrame(preName + i + ".png");
        if(frame)
        {
            arry.push(frame);
        }
    }
    return cc.animate(new cc.Animation(arry, delaytime, playCount));
}

//获取牌局中的玩家名字
function getPlayersName(players){
    var str = "";
    if(players){
        for(var uid in players){
            var pl =  players[uid];
            str += unescape(pl.info.nickname);
            str += ",";
        }
    }

    str = str.slice(0, str.length - 1);
    return str;
}

/*
 江苏的准备按钮的功能,by sking 2018.2.27
 用法参考牌友联盟江苏app的麻将，有waitReady事件就会有准备过程
 */
var MJ_setReadyBtn = function(readyCallBack)
{
    if(MjClient.getAppType() ===  MjClient.APP_TYPE.QXNTQP ||
        MjClient.getAppType() ===  MjClient.APP_TYPE.QXLYQP) return; //先不加准备

    if(!readyCallBack)
    {
        if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU ||
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI ||
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA ||
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DA_QI||
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.GUAN_DAN || 
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.GAN_DENG_YAN
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
    setWgtLayout(_btnReady,[0.2, 0.2], [0.5, 0.4], [0, 0]);

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

// 是否自动准备
function currentIsAutoRelay()
{
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ)
        return util.localStorageEncrypt.getBoolItem(MjClient.KEY_autoRelay, false);
    else
        return false;
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
 // 俱乐部返回大厅功能：by_jcw
 *** posAndSizeArr: 适配尺寸
 *** posAndSizeArrX: IPhoneX适配
 如果传字符串的话, 第一个参数为参照物体的位置,第二个为上中下,第三个为和参照物之间的间距物体.
 */
addClub_BackHallBtn = function(needAdjust, posAndSizeArr, posAndSizeArrX)
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
    if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ
        || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP
        || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP
        || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP
        || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ) {
        if (MjClient.data.sData && MjClient.data.sData.tData && getClubInfoInTable()) {
            var _backHallBtn = new ccui.Button();
            _backHallBtn.setName("backhallbtn");
            _backHallBtn.loadTextureNormal("playing/gameTable/fanhuidating_btn.png");

            if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ && MjClient.GAME_CLASS.PAO_HU_ZI == GameClass[MjClient.data.sData.tData.gameType]){
                _backHallBtn.loadTextureNormal("playing/gameTable/fanhuidating_btnZiPai.png");
            }
            else if(MjClient.GAME_CLASS.PAO_HU_ZI == GameClass[MjClient.data.sData.tData.gameType] && 
                (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || 
                    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)){
                _backHallBtn.loadTextureNormal("playing/gameTable/fanhuidating_btnZiPai.png");
            }else if(MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY == MjClient.data.sData.tData.gameType && (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)){
                _backHallBtn.loadTextureNormal("playing/gameTable/fanhuidating_btnPDK.png");
             }
            // _backHallBtn.loadTexturePressed("playing/gameTable/fanhuidating_btn.png");
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
                        setWgtLayout(_backHallBtn, [0.11, 0.11], [0.1, 0.34], [0, 0]);
                    } else {
                        setWgtLayout(_backHallBtn, [0.11, 0.11], [0.05, 0.34], [0, 0]);
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

            if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ && MjClient.GAME_CLASS.PAO_HU_ZI == GameClass[MjClient.data.sData.tData.gameType]){
                var dec = MjClient.data.sData.tData.maxPlayer == 2 ? 0.05 : 0;

                if (isIPhoneX()) {
                    setWgtLayout(_backHallBtn, [0.08, 0.08], [0.84 - dec,0.94], [0,0]);
                } else {
                    setWgtLayout(_backHallBtn, [0.07, 0.07], [0.84 - dec,0.95], [0,0]);
                }
            }

            _backHallBtn.addTouchEventListener(function(sender,type){
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

onClickBackHallBtn = function(){
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
    var tempValue = -1;
    var bestIndex = -1;
    for (var i = 0; i < len; i ++){
        if(goldValue >= MjClient._GOLD_FIELD[i].lowerLimit){
            if (!MjClient._GOLD_FIELD[i].upperLimit || goldValue <=　MjClient._GOLD_FIELD[i].upperLimit){
                if(MjClient._GOLD_FIELD[i].lowerLimit > tempValue){
                    tempValue = MjClient._GOLD_FIELD[i].lowerLimit;
                    bestIndex = i;
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
 * 金币场判断结算时候是否破产
 */
function isGoldPoChan(pl) {
    if (pl && pl.info && pl.info.gold <= 0){
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
    delete MjClient.data.sData;
    delete MjClient.gameType;
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


/*
 *@author : by sking 2018.10.31
 *@function : 判断是否是百搭牌
 *@para cd : 当前这张牌
 */
function isHunCard(cd) {

    if(((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) && MjClient.gameType === MjClient.GAME_TYPE.TY_HONGZHONG) ||
        MjClient.gameType === MjClient.GAME_TYPE.LEI_YANG_GMJ)
    {
        if(MjClient.majiang.isHunCard && MjClient.majiang.isHunCard(cd, MjClient.data.sData.tData.hunCard)){
            return true;
        }
        return false;
    }

    if ((MjClient.data.sData.tData.hunCard && MjClient.data.sData.tData.hunCard === cd) ||
        (MjClient.data.sData.tData.hunCard2 && MjClient.data.sData.tData.hunCard2 === cd))
    {
        return true;
    }

    return false;
}


// 精度修正
revise = function(num, times) {
    // times = 1/允许误差
    times = times || 1e6;
    return Math.round(num * times) / times;
}
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
    if (!tData || !tData.fieldId || MjClient.getGoldFiledType() == 1) {
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

// 永州移植到邵阳的字牌玩法
function getSYMovePlayYZ_ziPai() { 
    // 下面几个玩法被拿到邵阳了，所以在针对玩法增加
    return MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ &&
        (MjClient.gameType === MjClient.GAME_TYPE.PAO_HU_ZI || 
         MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER ||
         MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO || 
         MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR ||
         MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King ||  
         MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King ||  
         MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King);
}
