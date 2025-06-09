
/* ======================================
 *  放一些关于3D透视效果 UI共用的方法 2018.8.27  by sking
 *  ====================================== */
var COMMON_UI3D = COMMON_UI3D || {};


// 从本地数据获取is3D, 金币场和普通场，记录分离
COMMON_UI3D.getIs3DFromLocalStorage = function()
{
    var is3DNormal = util.localStorageEncrypt.getBoolItem("TableIs3D", true);
    var is3DGoldField = util.localStorageEncrypt.getBoolItem("GoldFieldTableIs3D", true);
    var sData = MjClient.data.sData;
    if(MjClient.playui && sData){
        var isGoldField = sData.tData.fieldId;
        return isGoldField ? is3DGoldField : is3DNormal;
    }
    return is3DNormal;
};


// 设置是否is3D, 金币场和普通场，记录分离
COMMON_UI3D.setIs3DFromLocalStorage = function(bool)
{
    if(typeof (bool) === 'undefined' || !MjClient.playui) return;
    var tData = MjClient.data.sData.tData;
    var isGoldField = tData.fieldId;
    if(isGoldField){
        util.localStorageEncrypt.setBoolItem("GoldFieldTableIs3D", bool);
    }else{
        util.localStorageEncrypt.setBoolItem("TableIs3D", bool);
    }
};



// 如果需要切换成3D，请添加
COMMON_UI3D.isCanChangTo3D = function()
{
    if (GameClass[MjClient.gameType] === MjClient.GAME_CLASS.MA_JIANG)
    {

        // 特殊麻将暂未开启3D
        if (MjClient.gameType === MjClient.GAME_TYPE.HONG_TONG_WANG_PAI ||
            MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG ||
            MjClient.gameType === MjClient.GAME_TYPE.XUE_ZHAN ||
            MjClient.gameType === MjClient.GAME_TYPE.XUE_LIU)
        {
            return false;
        }
        else if (isJinZhongAPPType() ||
            MjClient.getAppType() === MjClient.APP_TYPE.QXHAIANMJ ||
            MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ ||
            MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() === MjClient.APP_TYPE.QXHAMJ ||
            MjClient.getAppType() === MjClient.APP_TYPE.QXXZMJ ||
            MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP ||
            MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ ||
            MjClient.getAppType() === MjClient.APP_TYPE.QXLYQP ||
            MjClient.getAppType() === MjClient.APP_TYPE.BDHYZP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ)
        {
            return true;
        }
    }
    return false;
};


// 是否是山西临汾地区麻将
COMMON_UI3D.isLinFen = function()
{
    if(MjClient.gameType ===  MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI ||
        MjClient.gameType ===  MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI  ||
        MjClient.gameType ===  MjClient.GAME_TYPE.HONG_TONG_WANG_PAI ||
        MjClient.gameType ===  MjClient.GAME_TYPE.FEN_XI_YING_KOU ||
        MjClient.gameType ===  MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG ||
        MjClient.gameType ===  MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN ||
        MjClient.gameType ===  MjClient.GAME_TYPE.DA_NING_SHUAI_JIN
    )
    {
        return true;
    }
    return false;
};

// 江苏，淮安，岳阳，山西临汾地区，房间局数，和剩余张数UI特殊
COMMON_UI3D.isSpecialRoomUI = function()
{
    if(COMMON_UI3D.isLinFen() ||
        MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
        MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ ||
        MjClient.getAppType() === MjClient.APP_TYPE.QXXZMJ ||
        MjClient.getAppType() === MjClient.APP_TYPE.QXHAMJ ||
        MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ )
    {
        return true;
    }
    return false;
};


// 是否是3D, 金币场和普通场, 是否已选择3D记录分离
COMMON_UI3D.is3DUI = function()
{
    if(MjClient.rePlayVideo !== -1) return false;

    //海安的三人玩法，位置跟算分有关系，暂时不做3人的3D
    if((MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_MJ || MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_BAI_DA) && MjClient.data.sData && MjClient.data.sData.tData.maxPlayer == 3)
    {
        return false;
    }

    var is3D = COMMON_UI3D.getIs3DFromLocalStorage();
    if(is3D && COMMON_UI3D.isCanChangTo3D())
    {
        return true;
    }

    return false;
};


/*
   3D指示器,2D指示器切换
 */
COMMON_UI3D.InitSetArrowbk = function()
{
    //3D 2D 指示器只显示一个
    var arrowbk2D = getNode(0).getParent().getChildByName("arrowbk");
    var arrowbk3D = getNode(0).getParent().getChildByName("arrowbk3D");

    if(arrowbk3D)arrowbk3D.is3D = true;
    arrowbk2D.visible = false;
    if(arrowbk3D) arrowbk3D.visible = false;

    MjClient.arrowbkNode = arrowbk2D;
    MjClient.arrowbk3DNode = arrowbk3D;
    setWgtLayout(arrowbk2D, [0.17, 0.17], [0.5, 0.5], [0, 0.25]);
    if(MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ)
        setWgtLayout(arrowbk2D,  [0.129, 0.229], [0.5, 0.5], [0, 0.25]);

    setWgtLayout(arrowbk3D, [0.17, 0.17], [0.5, 0.525], [0, 0.25]);

    if(MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP  ||
        MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ ||
        MjClient.getAppType() === MjClient.APP_TYPE.BDHYZP  ||
        MjClient.getAppType() === MjClient.APP_TYPE.QXLYQP  )
    {
        setWgtLayout(arrowbk2D, [0.11, 0], [0.5, 0.5], [0, 0.25]);
        setWgtLayout(arrowbk3D, [0.13, 0], [0.5, 0.5], [0, 0.30]);
    }

    function InitArrowbk(arrowbkNode) {

        var _number = arrowbkNode.getChildByName("number");
        _number.setString("00");
        _number.ignoreContentAdaptWithSize(true);

        setDirVisible(arrowbkNode, true);
        setArrowFengDir(arrowbkNode);

        //var that = arrowbkNode;
        UIEventBind(null, arrowbkNode, "initSceneData", function (eD) {

            if(COMMON_UI3D.is3DUI())
            {
                if(!this.is3D) return;
            }
            else
            {
                if(this.is3D) return;
            }
            this.visible = IsArrowVisible();
            SetArrowRotation(this);
        });

        UIEventBind(null, arrowbkNode, "mjhand", function (eD) {

            if(COMMON_UI3D.is3DUI())
            {
                if(!this.is3D) return;
            }
            else
            {
                if(this.is3D) return;
            }
            this.visible = IsArrowVisible();
            SetArrowRotation(this);
        });

        UIEventBind(null, arrowbkNode, "waitPut", function (eD) {
            if(COMMON_UI3D.is3DUI())
            {
                if(!this.is3D) return;
            }
            else
            {
                if(this.is3D) return;
            }
            SetArrowRotation(this);

            _number.stopAllActions();
            stopEffect(playTimeUpEff);
            playTimeUpEff = null;
            var eat = MjClient.playui.jsBind.eat;
            var endFunc = null;
            if (IsTurnToMe()
                && !eat.ting._node.visible
                && !eat.hu._node.visible
                && !eat.peng._node.visible
                && !eat.chi0._node.visible
                && !eat.gang0._node.visible
                && !eat.gang1._node.visible
                && !eat.gang2._node.visible) {
                endFunc = MjClient.playui.jsBind.BtnPutCard._click;
            }
            arrowbkNumberUpdate(_number, endFunc);

        });

        UIEventBind(null, arrowbkNode, "MJPeng", function (eD) {
            if(COMMON_UI3D.is3DUI())
            {
                if(!this.is3D) return;
            }
            else
            {
                if(this.is3D) return;
            }
            SetArrowRotation(this);

            _number.stopAllActions();
            stopEffect(playTimeUpEff);
            playTimeUpEff = null;
            arrowbkNumberUpdate(_number);
        });

        UIEventBind(null, arrowbkNode, "MJChi", function (eD) {
            if(COMMON_UI3D.is3DUI())
            {
                if(!this.is3D) return;
            }
            else
            {
                if(this.is3D) return;
            }
            SetArrowRotation(this);

            _number.stopAllActions();
            stopEffect(playTimeUpEff);
            playTimeUpEff = null;
            arrowbkNumberUpdate(_number);
        });

        UIEventBind(null, arrowbkNode, "MJGang", function (eD) {
            if(COMMON_UI3D.is3DUI())
            {
                if(!this.is3D) return;
            }
            else
            {
                if(this.is3D) return;
            }
            SetArrowRotation(this)
        });

        UIEventBind(null, arrowbkNode, "MJPut", function (msg) {
            if(COMMON_UI3D.is3DUI())
            {
                if(!this.is3D) return;
            }
            else
            {
                if(this.is3D) return;
            }

            if (msg.uid == SelfUid()
            //&& MjClient.gameType != MjClient.GAME_TYPE.XU_ZHOU //自己出牌前端先行
            //&& MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP //自己出牌前端先行
            )
            {
                _number.stopAllActions();
                stopEffect(playTimeUpEff);
                playTimeUpEff = null;
                //arrowbkNumberUpdate(this);
                _number.setString("00");
            }
        });

        UIEventBind(null,arrowbkNode, "MJFlower", function (eD) {
            if(COMMON_UI3D.is3DUI())
            {
                if(!this.is3D) return;
            }
            else
            {
                if(this.is3D) return;
            }
            SetArrowRotation(this)
        });

        UIEventBind(null, arrowbkNode, "roundEnd", function (eD) {
            if(COMMON_UI3D.is3DUI())
            {
                if(!this.is3D) return;
            }
            else
            {
                if(this.is3D) return;
            }
            _number.stopAllActions();
            stopEffect(playTimeUpEff);
            playTimeUpEff = null;
        });

        UIEventBind(null,arrowbkNode, "LeaveGame", function (eD) {
            if(COMMON_UI3D.is3DUI())
            {
                if(!this.is3D) return;
            }
            else
            {
                if(this.is3D) return;
            }
            _number.stopAllActions();
            stopEffect(playTimeUpEff);
            playTimeUpEff = null;
        });
    }

    if(COMMON_UI3D.isCanChangTo3D()) InitArrowbk(arrowbk3D);
    InitArrowbk(arrowbk2D);

    if(COMMON_UI3D.is3DUI())
    {
        arrowbk2D.visible = false;
        if(arrowbk3D)arrowbk3D.visible = true;
        SetArrowRotation(arrowbk3D);
    }
    else
    {
        if(arrowbk3D) arrowbk3D.visible = false;
        arrowbk2D.visible = true;
        SetArrowRotation(arrowbk2D);
    }
}

/*
   重置指示器切换
 */
COMMON_UI3D.resSetArrowbk = function()
{
    var arrowbk2D = getNode(0).getParent().getChildByName("arrowbk");
    var arrowbk3D = getNode(0).getParent().getChildByName("arrowbk3D");
    arrowbk3D.is3D = true;

    if(COMMON_UI3D.is3DUI())
    {
        arrowbk2D.visible = false;
        if(arrowbk3D)arrowbk3D.visible = true;
        SetArrowRotation(arrowbk3D);
    }
    else
    {
        if(arrowbk3D) arrowbk3D.visible = false;
        arrowbk2D.visible = true;
        SetArrowRotation(arrowbk2D);
    }
    var tData = MjClient.data.sData.tData;

    if(tData.tState == TableState.waitJoin || tData.tState == TableState.waitReady)
    {
        arrowbk2D.visible = false;
        if(arrowbk3D) arrowbk3D.visible = false;
    }
}

/*
    设置手牌，吃，碰，杠的牌为3D透视效果
 */
COMMON_UI3D.set3DCardSprite = function(off,noSortHand)
{
    // node 是克隆新建的一个麻将节点 by sking
    var node = getNode(off);
    var newC = null; //先创建麻将的UI节点
    var children = node.children;
    var uipeng = [];
    var uigang0 = [];
    var uigang1 = [];
    var uichi = [];
    var uistand = [];
    var uihun = [];//癞子牌在最左边
    var uiwang = []; //红铜王牌
    var uique = [];//缺色牌
    var tempMaJiang = MjClient.majiang;
    var newVal = 0;
    var pl = getUIPlayer(off);
    var ziMoCard = null; //自摸的那张牌
    MjClient.movingCard = null;

    var gameTypeListOfPos = [MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG, MjClient.GAME_TYPE.AN_HUA_MA_JIANG,
        MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW, MjClient.GAME_TYPE.NING_XIANG_KAI_WANG];//调整癞子标签的位置

    //排序麻将的位置 by sking
    if (pl.mjhand && pl.mjhand.length > 0)
    {
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

        var count = tempMaJiang.CardCount(pl);
        //if(count == 14)
        if(count % 3 == 2 && mjhandNum == pl.mjhand.length)//是否摸上一张新牌: 乱刮风手牌总数不等于14
        {
            if(pl.isNew ) //isNew 每次摸完牌后设为true,打出去一张牌后 设为false by sking
            {
                newVal = pl.mjhand[pl.mjhand.length - 1];
                cc.log("新牌值    ",newVal);
            }
            else
            {
                if((MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) && (MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG ||
                    MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG) ||
                    ((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG)){
                    pl.mjhand.sort(function(a, b)
                    {
                        if(MjClient.majiang.isHunCard(a, MjClient.data.sData.tData.hunCard))
                        {
                            return -1;
                        }
                        else if (MjClient.majiang.isHunCard(b, MjClient.data.sData.tData.hunCard))
                        {
                            return 1;
                        }
                        else
                        {
                            return a - b;
                        }
                    });
                }else if(MjClient.gameType == MjClient.GAME_TYPE.XU_ZHOU) //为了徐州的白板的值是，癞子的值做的特殊处理，同步2D时候的手牌排版，by sking 2019.15
                {
                    pl.mjhand.sort(function(a, b)
                    {
                        if(MjClient.data.sData.tData.hunCard == a)
                        {
                            return -1;
                        }
                        else if (MjClient.data.sData.tData.hunCard == b)
                        {
                            return 1;
                        }
                        else
                        {

                            var aValue = 0;
                            aValue = a;
                            if(a === 91 &&  MjClient.data.sData.tData.hunCard !== 91)
                            {
                                aValue = MjClient.data.sData.tData.hunCard;
                            }

                            var bValue = 0;
                            bValue = b;
                            if( b === 91 &&  MjClient.data.sData.tData.hunCard !== 91)
                            {
                                bValue = MjClient.data.sData.tData.hunCard;
                            }

                            return aValue - bValue;
                        }
                    });

                } else if (MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ) {
                    pl.mjhand.sort(function(a, b)
                    {
                        if(tempMaJiang.isEqualHunCard && tempMaJiang.isEqualHunCard(a))
                        {
                            return -1;
                        }
                        else if (tempMaJiang.isEqualHunCard && tempMaJiang.isEqualHunCard(b))
                        {
                            return 1;
                        }
                        else
                        {
                            if(a == 71){
                                a = MjClient.data.sData.tData.hunCard;
                            }
                            if(b == 71){
                                b = MjClient.data.sData.tData.hunCard;
                            }
                            return a - b;
                        }
                    });
                }
                else{
                    pl.mjhand.sort(function(a, b)
                    {
                        if(tempMaJiang.isEqualHunCard && tempMaJiang.isEqualHunCard(a))
                        {
                            return -1;
                        }
                        else if (tempMaJiang.isEqualHunCard && tempMaJiang.isEqualHunCard(b))
                        {
                            return 1;
                        }
                        else
                        {
                            return a - b;
                        }
                    });
                }

                newVal = pl.mjhand[pl.mjhand.length - 1]; //为什么取最后一个节点 ？
                var idx = pl.mjhand.length - 1;
                do{
                    if(idx < 0 ) break;
                    newVal = pl.mjhand[idx];
                    if(!isHunCard(newVal))
                    {
                        cc.log("===============111111111111111=========isEqualHunCard======================newVal = " + newVal);
                        break;
                    }
                    idx--;
                }while(1);
                if (MjClient.gameType === MjClient.GAME_TYPE.XUE_ZHAN ||
                    MjClient.gameType === MjClient.GAME_TYPE.XUE_LIU) {
                    if (pl.que) {
                        for (var i = pl.mjhand.length -1 ; i >= 0 ; i--) {
                            var realnewVal = pl.mjhand[i];
                            if (Math.floor(realnewVal / 10) === pl.que)
                            {
                                newVal = realnewVal;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    for(var i = 0; i < children.length; i++) //children 为 "down" 节点下的字节点
    {
        var ci = children[i];
        if(ci.name === "mjhand")
        {
            if(newC == null && newVal == ci.tag)
            {
                newC = ci; //从down 节点下，复制一个麻将node保存在newC 里 by sking    //newC就是新摸的那张手牌
            }
            else
            {
                if(isHunCard(ci.tag))
                {
                    uihun.push(ci);
                }
                else
                {
                    if (MjClient.gameType === MjClient.GAME_TYPE.XUE_ZHAN || MjClient.gameType === MjClient.GAME_TYPE.XUE_LIU)
                    {
                        if (Math.floor(ci.tag / 10) === pl.que)
                        {
                            uique.push(ci);
                        }
                        else
                        {
                            uistand.push(ci);
                        }
                    }
                    else
                    {
                        uistand.push(ci);
                    }
                }
            }

            if(isHunCard(ci.tag))
            {
                ci.setColor(cc.color(240, 230, 140));
            }

        }
        else if(ci.name == "standPri")
        {
            if(ci.isWangPai)
            {
                uiwang.push(ci);
            }
            else
            {
                uistand.push(ci);
            }

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
        else if(ci.name == "mjhand_replay")
        {
            uistand.push(ci);
        }
        else if(ci.name == "zimoCardNode")
        {
            ziMoCard = ci;
        }
    }
    //为了徐州的白板的值是，癞子的值做的特殊处理，同步2D时候的手牌排版，by sking 2019.15
    var myOrder = TagOrder;
    if(MjClient.gameType == MjClient.GAME_TYPE.XU_ZHOU)
    {
        myOrder = TagOrder_xz;
    }

    if (MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ) {
        myOrder = function(na, nb) {
            var a = na.tag;
            var b = nb.tag;

            if(a == 71){
                a = MjClient.data.sData.tData.hunCard;
            }
            if(b == 71){
                b = MjClient.data.sData.tData.hunCard;
            }
            return a - b;
        }
    }

    uistand.sort(myOrder);
    uique.sort(myOrder);

    if(uihun.length > 0) //是否有柰子，有则放在最前面 by sking
    {
        uihun.sort(myOrder);//对混牌也进行排序
        for(var i = 0; i < uihun.length; i++)
        {
            uistand.unshift(uihun[i]); //向数组开头添加一个元素 unshift
        }
    }

    if(uique.length > 0) //是否有定缺色牌，有则放在最后面
    {
        for(var i = 0; i < uique.length; i++)
        {
            uistand.push(uique[i]);
        }
    }

    if(newC)
    {
        cc.log("==================newC===============");
        uistand.push(newC); //把这张牌放入手牌的数组里  by sking
    }



    var uiOrder = [uigang1, uigang0, uipeng, uichi, uistand,uiwang];
    if(off == 1 || off == 2)
    {
        uiOrder.reverse();//颠倒顺序
    }

    var orders = []; //重新排序后装到数组里 by sking
    for(var j = 0; j < uiOrder.length; j++)
    {
        var uis = uiOrder[j];
        for(var i = 0; i < uis.length; i++)
        {
            orders.push(uis[i]);
        }
    }

    if(ziMoCard)
    {
        orders.push(ziMoCard);
    }

    var countMjHandNums = function (off)
    {
        var count = 0;
        if(off === 0)
        {
            return MjClient.majiang.CardCount(getUIPlayer(0));
        }
        else
        {
            for(var i = 0; i < orders.length; i++)
            {
                var cd = orders[i];
                if(cd.name === "standPri")
                {
                    count ++;
                }
            }
            return count;
        }
    };

    //百搭命名的种类
    var baidaNameArray = ["haozi","lizi","imgBaiDa","wangzi","jinzi"];

    if(off == 0)
    {
        var up = node.getChildByName("up");
        var stand = node.getChildByName("stand");
        var standS = stand.scale*1.2;
        var upS = up.scale*1.2;
        var startY = cc.winSize.height*0.8;//;orders[orders.length - 1].y; //第一张牌开始的Y的位置
        var startX = cc.winSize.width*0.07;
        var starthandX = cc.winSize.width*0.05;
        var pengIdx = 0;//碰的牌张数
        //orders.sort(function (a, b) {return (a.x  - b.x)});
        var pl = getUIPlayer(0);
        function setCardSpirte(cardNode,Idx)
        {
            cardNode.loadTexture("playing/MJ3D/downCard/eat" + Idx + ".png");
        }

        var _mjPath = "playing/MJ3D/downCard/";
        var gangIdx =0; //杠牌引索1 ~ 4，杠牌是4张
        var cardIdx = 0; //值区间 1 ~ 12 张牌
        var dy = 0; //杠的上面那张牌的位置要往后移一点
        var dx = 0;//杠的上面那张牌的位置左边移一点点
        var handDx = 0; //山西的立四麻将的特殊UI
        for(var i = 0;i < orders.length;i++)
        {
            dy = 0;
            if(orders[i].name == "mjhand")
            {
                var MJ3Dtype = getCurrentMJBgType();
                if(MJ3Dtype === 0){    // 3D第一套手牌
                    if(MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG){
                        orders[i].loadTexture("playing/MJ3D/downCard/handCard_taojiang.png");
                    }else{
                        orders[i].loadTexture("playing/MJ3D/downCard/handCard.png");
                    }
                }
                else if(MJ3Dtype === 1)  // 3D第二套手牌
                {
                    orders[i].loadTexture("playing/MJ3D/downCard/handCard_liuxing.png");
                }
                orders[i].ignoreContentAdaptWithSize(true);
                orders[i].setScale(standS*1.3);

                var childs = orders[i].children;
                for(var k = 0; k < childs.length; k++)
                {
                    cc.log("orders[i].children name:", childs[k].getName());
                    if(childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);

                    if(MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG){
                        childs[k].setScale(1.13);
                    }else{
                        childs[k].setScale(1.0);
                    }

                    childs[k].setPosition(orders[i].getContentSize().width*0.5,orders[i].getContentSize().height*0.43);

                    if(baidaNameArray.indexOf(childs[k].getName()) >= 0)
                    {
                        childs[k].setPosition(childs[k].x*1.1,childs[k].y*1.1);
                    }
                }

                if(noSortHand){//立四麻将 需要
                    orders[i].x += stand.getScale()*stand.getSize().width*(0.5 + 0.2* cardIdx/3);
                    continue;
                }

                if(orders[i - 1] && orders[i - 1].name != "mjhand")
                {
                    //如果是杠
                    if(orders[i - 1].name == "gang0" || orders[i - 1].name == "gang1")
                        orders[i].x = orders[i - 2].x +  stand.getScale()*stand.getSize().width*1.20;
                    else
                        orders[i].x = orders[i - 1].x +  stand.getScale()*stand.getSize().width*1.20;
                }
                else  if(i != 0){
                    var count = MjClient.majiang.CardCount(pl);
                    if(count % 3 == 2  && i == orders.length-1 && newVal)
                    {
                        //orders[i].setColor(cc.color(0,255,255));
                        orders[i].x = orders[i - 1].x +  stand.getScale()*stand.getSize().width*1.80;
                    }
                    else {
                        orders[i].x = orders[i - 1].x +  stand.getScale()*stand.getSize().width*1.26;
                    }
                }
                else if(i == 0)
                {
                    orders[i].x = starthandX;
                }

                continue;
            }

            if(orders[i].name == "gang0")
            {
                gangIdx++;
                if(gangIdx == 4 ) gangIdx = 0;
                if(gangIdx == 0)
                {
                    //orders[i].setColor(cc.color(255,0,0));
                    setCardSpirte(orders[i],cardIdx - 1);
                }
                else
                {
                    cardIdx++;
                    setCardSpirte(orders[i],cardIdx);
                }


                if(i == 0)
                {
                    orders[i].x = startX;
                }
                else{
                    if(gangIdx == 0) //杠牌4张的最后一张牌
                    {
                        if(cardIdx <= 6)
                            orders[i].x = orders[i - 2].x*0.99;
                        else
                            orders[i].x = orders[i - 2].x;

                        //orders[i].setColor(cc.color(0,0,255));
                        dy = 0.5;
                    }
                    else
                    {
                        if(orders[i - 1].name && orders[i - 1].name != "gang0")
                        {
                            orders[i].x = orders[i - 2].x + orders[i - 2].getScale() * orders[i - 1].getSize().width * 1;
                        }
                        else {
                            if (gangIdx == 1) {
                                orders[i].x = orders[i - 2].x + orders[i - 2].getScale() * orders[i - 1].getSize().width * 0.9;
                            }
                            else {

                                var adx = 0;
                                if(cardIdx == 2)
                                    adx -= 0.05;
                                else if(cardIdx == 3)
                                    adx -= 0.05;
                                else if(cardIdx == 5)
                                    adx -= 0.01;
                                else if(cardIdx == 6)
                                    adx -= 0.01;

                                orders[i].x = orders[i - 1].x + orders[i - 1].getScale() * orders[i - 1].getSize().width * (0.75 + adx);
                            }
                        }
                    }
                }

            }
            else if(orders[i].name == "gang1")
            {
                gangIdx++;
                if(gangIdx == 4 ) gangIdx = 0;
                if(gangIdx == 0)
                {
                    if(cardIdx == 3)
                    {
                        orders[i].loadTexture("playing/MJ3D/downCard/eat21.png");
                        dy = 0.5;
                        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ)
                        {
                            orders[i].loadTexture("playing/MJ3D/downCard/eat2.png");
                        }
                    }
                    else  if(cardIdx == 6)
                    {
                        orders[i].loadTexture("playing/MJ3D/downCard/eat51.png");
                        dy = 0.43;
                        dx = -0.01;
                        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ)
                        {
                            orders[i].loadTexture("playing/MJ3D/downCard/eat5.png");
                        }
                    }
                    else if(cardIdx == 9){
                        orders[i].loadTexture("playing/MJ3D/downCard/eat81.png");
                        dy = 0.58;
                        dx = -0.01;
                        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ)
                        {
                            orders[i].loadTexture("playing/MJ3D/downCard/eat8.png");
                        }
                    }
                    else if(cardIdx == 12){
                        orders[i].loadTexture("playing/MJ3D/downCard/eat111.png");
                        dy = 0.5;
                        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ)
                        {
                            orders[i].loadTexture("playing/MJ3D/downCard/eat11.png");
                        }
                    }
                }
                else
                {
                    cardIdx++;
                    setCardSpirte(orders[i],cardIdx)
                    if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ)
                    {
                        var selfcardindex = cardIdx * 10 + 1;
                        if (cardIdx == 1)
                        {
                            selfcardindex = 110;
                        }
                        setCardSpirte(orders[i],selfcardindex)
                    }
                }

                if(i == 0)
                {
                    orders[i].x = startX;
                }
                else{
                    if(gangIdx == 0) //杠牌4张的最后一张牌
                    {
                        if(cardIdx < 6)
                            orders[i].x = orders[i - 2].x*(0.97 + dx);
                        else
                            orders[i].x = orders[i - 2].x*(1 + dx);
                        //orders[i].zIndex = orders[i - 2].zIndex + 4;
                    }
                    else
                    {
                        if(gangIdx == 1) //杠的第一张牌
                        {
                            orders[i].x = orders[i - 2].x +  orders[i - 2].getScale()*orders[i - 1].getSize().width*0.9;
                        }
                        else
                        {
                            var adx = 0;
                            if(cardIdx == 2)
                                adx -= 0.05;
                            else if(cardIdx == 3)
                                adx -= 0.05;
                            else if(cardIdx == 5)
                                adx -= 0.01;
                            else if(cardIdx == 6)
                                adx -= 0.01;

                            orders[i].x = orders[i - 1].x +  orders[i - 1].getScale()*orders[i - 1].getSize().width*(0.75 + adx);
                        }
                    }
                }
            }
            else if(orders[i].name == "chi" || orders[i].name == "peng")
            {

                cardIdx++;
                pengIdx++;
                if(pengIdx == 3 ) pengIdx = 0;
                setCardSpirte(orders[i],cardIdx);

                if(i == 0)
                {
                    orders[i].x = startX;
                }
                else{

                    if(orders[i - 1].name && orders[i - 1].name != "peng" && orders[i - 1].name != "chi")
                    {
                        //如果是杠
                        if(orders[i - 1].name == "gang0" || orders[i - 1].name == "gang1")
                            orders[i].x = orders[i - 1].x +  up.getScale()*up.getSize().width*2.3;
                        else
                            orders[i].x = orders[i - 1].x +  up.getScale()*up.getSize().width*1.1;
                    }
                    else {
                        if(pengIdx == 1) //碰与碰之间添加间隔
                        {
                            //orders[i].setColor(cc.color(0,255,255));
                            orders[i].x = orders[i - 1].x +  up.getScale()*up.getSize().width*1.3;
                        }
                        else {
                            orders[i].x = orders[i - 1].x +  up.getScale()*up.getSize().width*0.9;
                        }
                    }
                }
            }


            orders[i].ignoreContentAdaptWithSize(true);
            orders[i].setScale(upS*1.5);
            orders[i].setPositionY(up.y*(1.3 + dy));


            //旋转的角度
            var rotaValue = [
                2,2,2,
                1,-1,-1,
                -1,-3,-4,
                -3,-5,-6
            ];
            //平行四边形拉伸度
            var skewValue = [
                17,16,14,
                10,9,8,
                4,2,0,
                -3,-5,-6
            ];
            //x 位置偏移度
            var posValue =  [
                0.48,0.48,0.48,
                0.48,0.48,0.48,
                0.46,0.47,0.49,
                0.49,0.49,0.49
            ];

            var childs = orders[i].children;
            for(var k = 0; k < childs.length; k++)
            {
                if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                childs[k].setScale(0.61);
                childs[k].setPosition(orders[i].getContentSize().width*posValue[cardIdx - 1],orders[i].getContentSize().height*0.66);
                if(childs[k].getName() == "arrow") {

                    if(childs[k].getRotation()%180 != 0)
                    {
                        childs[k].setSkewY(-skewValue[cardIdx - 1]);
                    }
                }
                else {
                    if(cardIdx >0 )
                    {
                        childs[k].setSkewX(skewValue[cardIdx - 1]);
                    }
                }
                if(baidaNameArray.indexOf(childs[k].getName()) >= 0)
                {
                    if(gameTypeListOfPos.indexOf(MjClient.gameType) != -1){
                        childs[k].setPosition(childs[k].x*1.1,childs[k].y*0.95);
                    }else{
                        childs[k].setPosition(childs[k].x*1.2,childs[k].y*1.05);
                    }
                }
            }
        }
    }
    else if(off == 3)
    {
        var gangIdx   =0; //杠牌引索1 ~ 4，杠牌是4张
        var cardIdx   = 0; //数列牌个数，不算重叠的
        var distanceX = -0.25; //离手牌的距离，或者靠边
        var _ds       = 1.02; //依次递减的缩放比例
        var _angleDis =  isIPad()? 0.05 : 0.031 ; //0.0079; //吃 碰，杠 排列的偏移角度，越小越靠右边
        var up        = node.getChildByName("up");
        var stand     = node.getChildByName("stand");
        var standS    = stand.scale*1.1;
        var upS       = up.scale*1.2;
        var startY    = cc.winSize.height*0.785;//;orders[orders.length - 1].y; //第一张牌开始的Y的位置
        var startX    = cc.winSize.width*0.215;
        var pengIdx   = 0;//碰的牌张数
        var mjhandIdx = 0;//当前手牌张数
        var dx        = 0;
        var cardOn    = 0; //杠上面的那张牌的偏移
        var angleX    = standS*stand.getSize().width;
        var angleY    = standS*stand.getSize().height;


        for(var i = 0;i < orders.length;i++)
        {
            if(orders[i].name == "standPri")
            {
                startY = cc.winSize.height*0.785;//;orders[orders.length - 1].y; //第一张牌开始的Y的位置

                mjhandIdx++;


                if(!orders[i - 1] || orders[i - 1].name != "standPri")
                {
                    orders[i].y = startY;
                }
                else
                {

                    orders[i].y = orders[i - 1].y -  orders[i - 1].getScale()*orders[i - 1].getSize().height*0.41;
                }

                //var iphonXX =  isIPhoneX() ? cc.winSize.width*0.005 : 0; //iphone x 的位置优化

                orders[i].setScale(standS*1.8*(1 + mjhandIdx*0.01));
                orders[i].setPositionX(startX - mjhandIdx*angleX*0.2);
                orders[i].ignoreContentAdaptWithSize(true);

                if(orders[i].isWangPai){ //红铜王牌的3D,特殊显示
                    var baidaNameArray = ["haozi","lizi","imgBaiDa","wangzi","jinzi"];
                    orders[i].loadTexture("playing/MJ3D/common/1-2.png");
                    var childs = orders[i].children;
                    for(var k = 0; k < childs.length; k++)
                    {
                        if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                        childs[k].setScale(0.3);
                        childs[k].setSkewY(6);
                        if(baidaNameArray.indexOf(childs[k].getName()) >= 0)
                        {
                            childs[k].setPosition(40,35);
                        }
                        else
                        {
                            childs[k].setPosition(orders[i].getContentSize().width/2,orders[i].getContentSize().width*0.56);
                        }
                    }
                    orders[i].y -= orders[i - 1].getScale()*orders[i - 1].getSize().height*0.45;
                    if(orders[i - 1]&& orders[i -1].isWangPai)
                    {
                        orders[i].y += orders[i - 1].getScale()*orders[i - 1].getSize().height*0.3;
                        orders[i].zIndex = orders[i - 1].zIndex + 1;
                    }
                    orders[i].zIndex = -1;
                    continue;
                }


                orders[i].zIndex += 100 + i;//从上往下排，层级越来越高 by sking 2018.9.19
                orders[i].loadTexture("playing/MJ3D/left/leftStand.png");
                continue;
            }
            else if(orders[i].name == "zimoCardNode")
            {
                orders[i].y = cc.winSize.height*0.25;
                orders[i].ignoreContentAdaptWithSize(true);
                orders[i].loadTexture("playing/MJ3D/left/1-2.png");
                var childs = orders[i].children;
                for(var k = 0; k < childs.length; k++)
                {
                    if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                    childs[k].setScale(0.3);
                    childs[k].setPosition(orders[i].getContentSize().width*0.48,orders[i].getContentSize().width*0.55);
                    if(baidaNameArray.indexOf(childs[k].getName()) >= 0)
                    {
                        childs[k].setPosition(orders[i].getContentSize().width*0.65,orders[i].getContentSize().width*0.55);
                    }
                    childs[k].setSkewY(-15);
                }
                orders[i].setScale(upS*2.6*(Math.pow(_ds,cardIdx + cardOn)));
                orders[i].setPositionX(startX*0.75);
                continue;
            }
            else if(orders[i].name == "gang0")
            {
                startY = cc.winSize.height*0.83;//;orders[orders.length - 1].y; //第一张牌开始的Y的位置
                gangIdx++;
                var dx = 0;
                var cardOn = 0;
                if(gangIdx == 4 ) gangIdx = 0;
                if(gangIdx == 0)
                {
                    dx  = 0.005;
                    cardOn = 1;
                }
                else
                {
                    cardIdx++;
                }
                orders[i].zIndex = cardIdx;
                orders[i].ignoreContentAdaptWithSize(true);
                //orders[i].setScale(upS*2.8*(Math.pow(_ds,cardIdx + cardOn)));
                orders[i].loadTexture("playing/MJ3D/common/1-1.png");

                if(i == 0)
                {
                    orders[i].y = startY;
                }else if(orders[i - 1] && orders[i - 1].name != "gang0")
                {
                    orders[i].y = orders[i - 2].y - angleY*0.7;
                }
                else
                {
                    orders[i].y = orders[i - 1].y -  orders[i - 1].getScale()*orders[i - 1].getSize().height*0.5;
                    if(gangIdx == 0)
                    {
                        orders[i].y = orders[i - 2].y + orders[i - 2].getScale()*orders[i - 2].getSize().height*0.3;
                    }

                    //上一堆牌，还是gang0
                    if(gangIdx == 1 && orders[i - 1] && orders[i - 1].name == "gang0")
                    {
                        orders[i].y = orders[i - 1].y -  orders[i - 1].getScale()*orders[i - 1].getSize().height*1.6;
                    }
                }

                if(gangIdx == 1)
                {
                    //orders[i].setColor(cc.color(0,255,255));
                    distanceX -= 0.02;
                }
            }
            else if(orders[i].name == "gang1")
            {
                startY = cc.winSize.height*0.83;//;orders[orders.length - 1].y; //第一张牌开始的Y的位置
                gangIdx++;

                var cardOn = 0;
                if(gangIdx == 4 ) gangIdx = 0;
                if(gangIdx == 0)
                {
                    //orders[i].setColor(cc.color(0,255,0));
                    cardOn = 1;
                    dx  = 0.005;
                    orders[i].y *= 1.01;
                    orders[i].loadTexture("playing/MJ3D/common/2-1.png");
                }
                else
                {
                    cardIdx++;
                    if(!orders[i].getChildByName("imgNode") || !orders[i].getChildByName("imgNode").visible) //如果没有这个贴图，说明是特殊的暗杠，如分析硬扣的不可见暗杠
                    {
                        orders[i].loadTexture("playing/MJ3D/common/2-1.png");
                    }
                    else
                    {
                        orders[i].loadTexture("playing/MJ3D/common/1-1.png");
                    }
                }

                orders[i].ignoreContentAdaptWithSize(true);
                orders[i].zIndex = cardIdx;
                if(i == 0)
                {
                    //orders[i].setColor(cc.color(0,0,255));
                    orders[i].y = startY;
                }else if(orders[i - 1] && orders[i - 1].name != "gang1")
                {
                    orders[i].y = orders[i - 1].y -  orders[i - 1].getScale()*orders[i- 1].getSize().height*1.5;
                }
                else
                {
                    orders[i].y = orders[i - 1].y -  orders[i - 1].getScale()*orders[i - 1].getSize().height*0.5;
                    if(gangIdx == 0)
                    {
                        //orders[i].setColor(cc.color(0,255,255));
                        orders[i].y = orders[i - 2].y + orders[i - 2].getScale()*orders[i - 2].getSize().height*0.3;//如果有暗杠，暗杠是放在最前面的
                    }

                    //上一堆牌，还是gang1
                    if(gangIdx == 1 && orders[i - 1] && orders[i - 1].name == "gang1")
                    {
                        orders[i].y = orders[i - 1].y -  orders[i - 1].getScale()*orders[i - 1].getSize().height*1.6;
                    }

                    if(gangIdx == 1)
                    {
                        //orders[i].setColor(cc.color(0,255,255));
                        distanceX -= 0.02;
                    }
                }
            }
            else if(orders[i].name == "chi" || orders[i].name == "peng")
            {
                startY = cc.winSize.height*0.83;//;orders[orders.length - 1].y; //第一张牌开始的Y的位置
                cardIdx++;
                pengIdx++;
                orders[i].zIndex = cardIdx;
                if(i == 0)
                {
                    orders[i].y = startY;
                }
                else{

                    if(orders[i - 1].name != "peng" && orders[i - 1].name != "chi")
                    {
                        orders[i].y = orders[i - 1].y -  orders[i - 1].getScale()*orders[i - 1].getSize().height*1.5;
                    }
                    else {
                        if(pengIdx == 1) //碰与碰之间添加间隔
                        {
                            orders[i].y = orders[i - 1].y -  orders[i - 1].getScale()*orders[i - 1].getSize().height*0.8;
                            distanceX += 0.013;
                        }
                        else {
                            orders[i].y = orders[i - 1].y -  orders[i - 1].getScale()*orders[i - 1].getSize().height*0.5;
                        }
                    }

                    if(pengIdx == 1)
                    {
                        //orders[i].setColor(cc.color(0,255,255));
                        distanceX -= 0.02;
                    }
                }


                if(pengIdx == 3 ) pengIdx = 0;
                orders[i].ignoreContentAdaptWithSize(true);
                orders[i].loadTexture("playing/MJ3D/common/1-1.png");
            }


            var childs = orders[i].children;
            for(var k = 0; k < childs.length; k++)
            {
                if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                childs[k].setScale(0.39);
                childs[k].setPosition(orders[i].getContentSize().width*0.48,orders[i].getContentSize().width*0.55);

                if(childs[k].getName() == "arrow") {
                    var anlge = childs[k].getRotation();
                    if(anlge%180 == 0)
                    {
                        childs[k].setSkewX(15);
                    }
                    else {
                        childs[k].setSkewY(-15);
                    }
                }
                else {
                    childs[k].setSkewY(-15);
                }
            }


            orders[i].setScale(upS*2.6*(Math.pow(_ds,cardIdx )));//+ cardOn

            var _currentScale = orders[i].getScale();
            cc.log("-------------------------------------------_currentScale = " + _currentScale);

            var iphonXX =  isIPhoneX() ? cc.winSize.width*0.035 : 0; //iphone x 的位置优化

            orders[i].setPositionX(startX*(1 - cardIdx*_angleDis +  distanceX + dx) + iphonXX);
        }

        // 新牌隔开
        var num = countMjHandNums(off);
        var idx = orders.length - 1;
        if(num % 3 === 2 && orders[idx] && orders[idx].name === "standPri")
        {
            orders[idx].x = orders[idx].x - orders[idx].scale * orders[idx].width * 0.09;
            orders[idx].y = orders[idx].y - orders[idx].scale * orders[idx].height * 0.28;
        }

    }
    else if(off == 1)
    {
        var gangIdx =0; //杠牌引索1 ~ 4，杠牌是4张 ,1 2 3 0
        var cardIdx = 0; //数列牌个数，不算重叠的
        var _ds = 0.98; //依次递减的缩放比例
        var distanceX = 0.12; //离手牌的距离，或者靠边，越大越靠右边
        var _angleDis = isIPad()? 0.012 : 0.00915 ; //0.0079; //吃 碰，杠 排列的偏移角度，越小越靠右边
        var pengIdx = 0;//碰的牌张数

        var up = node.getChildByName("up");
        var stand = node.getChildByName("stand");
        var standS = stand.scale*1.1;
        var upS = up.scale*1.2;

        var startY = cc.winSize.height*0.34;//;orders[orders.length - 1].y; //第一张牌开始的Y的位置
        var startX = cc.winSize.width*0.85;//  在下面重新设置了
        var mjhandIdx = 0;
        var angleX = standS*stand.getSize().width;
        var dx = 0;//杠牌最上面那张牌的位置微调

        for(var i = orders.length - 1;i >= 0;i--)
        {
            dx = 0;
            if(orders[i].name == "standPri" )
            {
                //开始的位置
                if(i == orders.length - 1)
                {
                    orders[i].y = startY;
                }

                startX = cc.winSize.width*0.792;
                mjhandIdx++;
                if(!orders[i + 1] || orders[i + 1].name != "standPri")
                {
                    orders[i].y = startY;
                }
                else
                {
                    orders[i].y = orders[i + 1].y +  orders[i + 1].getScale()*orders[i + 1].getSize().height*0.397;
                }

                distanceX = orders[i].getScale()*orders[i].getSize().width*1.7; //离手牌的距离，或者靠边，越大越靠右边
                //cc.log("=distanceX = " + distanceX);
                orders[i].setFlippedX(true);
                orders[i].setPositionX(startX + 13*angleX*0.2 - mjhandIdx*angleX*0.2);
                orders[i].ignoreContentAdaptWithSize(true);

                //红铜王牌 的王牌
                if(orders[i].isWangPai){
                    cc.log("--------------------------------");
                    //百搭命名的种类
                    var baidaNameArray = ["haozi","lizi","imgBaiDa","wangzi","jinzi"];
                    orders[i].setFlippedX(true);
                    orders[i].setScale(standS*1.8*(1.08 - mjhandIdx*0.015));
                    orders[i].loadTexture("playing/MJ3D/common/1-1.png");
                    var childs = orders[i].children;
                    for(var k = 0; k < childs.length; k++)
                    {
                        if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                        childs[k].setScale(0.34);
                        childs[k].setSkewY(-8);
                        if(baidaNameArray.indexOf(childs[k].getName()) >= 0)
                        {
                            childs[k].setPosition(28,35);
                        }
                        else
                        {
                            childs[k].setPosition(orders[i].getContentSize().width/2,orders[i].getContentSize().width/2);
                        }
                    }
                    orders[i].zIndex = -1;
                }
                else
                {
                    orders[i].setScale(standS*2*(1.08 - mjhandIdx*0.015));
                    orders[i].loadTexture("playing/MJ3D/rightCard/rightStand.png");
                }

                //层级调整 by sking 2018.9.19
                orders[i].zIndex = 100 + i;
            }
            else if(orders[i].name == "zimoCardNode")
            {
                startX = cc.winSize.width*0.79;
                mjhandIdx++;

                orders[i].y = cc.winSize.height*0.8;

                distanceX = orders[i].getScale()*orders[i].getSize().width*1.7; //离手牌的距离，或者靠边，越大越靠右边
                orders[i].setScale(standS*2*(1.08 - mjhandIdx*0.015));
                orders[i].setPositionX(startX  - mjhandIdx*angleX*0.2);
                orders[i].ignoreContentAdaptWithSize(true);
                orders[i].loadTexture("playing/MJ3D/rightCard/1-7.png");

                var childs = orders[i].children;
                for(var k = 0; k < childs.length; k++)
                {
                    if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                    childs[k].setScale(0.3);
                    childs[k].setPosition(orders[i].getContentSize().width*0.56,orders[i].getContentSize().width*0.55);
                    childs[k].setSkewY(20);
                }
            }
            else {
                if(orders[i].name == "gang0")
                {
                    //开始的位置
                    if(i == orders.length - 1)
                    {
                        orders[i].y = startY*0.8;
                    }

                    startX = cc.winSize.width*0.85;
                    gangIdx++;

                    if(gangIdx == 4 ) gangIdx = 0;
                    if(gangIdx == 1)
                    {
                        //orders[i].setColor(cc.color(225,255,0));
                        dx  = -0.009;
                    }
                    else
                    {
                        cardIdx++;
                    }

                    orders[i].loadTexture("playing/MJ3D/common/1-8.png");
                    if(orders[i + 1] && orders[i + 1].name != "gang0")
                    {
                        orders[i].y = orders[i + 1].y +  orders[i + 1].getScale()*orders[i + 1].getSize().height*0.5;
                    }
                    else  if(i < orders.length - 1)
                    {
                        orders[i].y = orders[i + 1].y +  orders[i + 1].getScale()*orders[i + 1].getSize().height*0.5;
                    }

                    if(gangIdx == 3)
                    {
                        //orders[i+ 2].setColor(cc.color(0,255,255));
                        orders[i + 2].y = orders[i].y + orders[i].getScale()*orders[i].getSize().height*0.3;//如果有暗杠，暗杠是放在最前面的
                        //orders[i + 2].x = orders[i].x;//如果有暗杠，暗杠是放在最前面的
                    }

                }
                else if(orders[i].name == "gang1")
                {
                    //开始的位置
                    if(i == orders.length - 1)
                    {
                        orders[i].y = startY*0.8;
                    }

                    startX = cc.winSize.width*0.85;
                    gangIdx++;
                    var dx = 0;
                    if(gangIdx == 4 ) gangIdx = 0;
                    if(gangIdx == 1)
                    {
                        dx  = -0.009;
                        orders[i].loadTexture("playing/MJ3D/common/2-8.png");
                    }
                    else
                    {
                        cardIdx++;
                        if(!orders[i].getChildByName("imgNode") || !orders[i].getChildByName("imgNode").visible) //如果没有这个贴图，说明是特殊的暗杠，如汾西硬扣的不可见暗杠
                        {
                            orders[i].loadTexture("playing/MJ3D/common/2-8.png");
                        }
                        else
                        {
                            orders[i].loadTexture("playing/MJ3D/common/1-8.png");
                        }
                    }

                    if(i < orders.length - 1)
                    {
                        orders[i].y = orders[i + 1].y +  orders[i + 1].getScale()*orders[i + 1].getSize().height*0.5;
                    }

                    if(gangIdx == 3)
                    {
                        // orders[i].setColor(cc.color(0,255,255));
                        orders[i + 2].y = orders[i].y + orders[i].getScale()*orders[i].getSize().height*0.3;//如果有暗杠，暗杠是放在最前面的
                    }
                }
                else if(orders[i].name == "chi" || orders[i].name == "peng")
                {
                    //开始的位置
                    if(i == orders.length - 1)
                    {
                        orders[i].y = startY;
                    }

                    startX = cc.winSize.width*0.85;
                    cardIdx++;
                    pengIdx++;
                    orders[i].loadTexture("playing/MJ3D/common/1-8.png");
                    if(pengIdx == 3 ) pengIdx = 0;

                    if(orders[i + 1] && orders[i + 1].name != "chi" && orders[i + 1].name != "peng")
                    {
                        orders[i].y = orders[i + 1].y +  orders[i + 1].getScale()*orders[i + 1].getSize().height*0.9;
                    }
                    else if(i != orders.length - 1){

                        if(pengIdx == 1) //碰与碰之间添加间隔
                        {
                            distanceX -= 0.005
                            orders[i].y = orders[i + 1].y +  orders[i + 1].getScale()*orders[i + 1].getSize().height*0.9;
                        }
                        else
                        {
                            orders[i].y = orders[i + 1].y +  orders[i + 1].getScale()*orders[i + 1].getSize().height*0.5;
                        }
                    }
                }

                orders[i].ignoreContentAdaptWithSize(true);
                orders[i].setScale(upS*3*(Math.pow(_ds,cardIdx)));
                orders[i].setPositionX(startX*(1 - cardIdx*_angleDis + distanceX + dx));

                var childs = orders[i].children;
                for(var k = 0; k < childs.length; k++)
                {
                    if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                    childs[k].setScale(0.39);
                    childs[k].setPosition(orders[i].getContentSize().width*0.56,orders[i].getContentSize().width*0.55);
                    if(childs[k].getName() == "arrow") {
                        var anlge = childs[k].getRotation();
                        if(anlge%180 == 0)
                        {
                            childs[k].setSkewX(-10);
                        }
                        else {
                            childs[k].setSkewY(20);
                        }
                    }
                    else {
                        childs[k].setSkewY(20);
                    }
                }
            }
        }

        // 新牌隔开
        var num = countMjHandNums(off);
        var idx = 0;
        if(num % 3 === 2 && orders[idx] && orders[idx].name === "standPri")
        {
            orders[idx].x = orders[idx].x - orders[idx].scale * orders[idx].width * 0.09;
            orders[idx].y = orders[idx].y + orders[idx].scale * orders[idx].height * 0.28;
        }

    }
    else if(off == 2)
    {
        //平行四边形拉伸度
        var skewValue = [
            -14, -13, -12,
            -11,-9,-8,
            -6,-5,-4,
            0,1,2
        ];

        function setCardSpirteTop(cardNode,Idx)
        {
            if(Idx <= 0) Idx = 1;
            if(Idx >= 12) Idx = 12;

            cardNode.loadTexture("playing/MJ3D/top/top" + (13 - Idx) + ".png");
        }

        var _mjPath = "playing/MJ3D/downCard/";
        var gangIdx =0; //杠牌引索1 ~ 4，杠牌是4张
        var cardIdx = 0; //值区间 1 ~ 12 张牌
        var dy = 0;
        var up = node.getChildByName("up");
        var stand = node.getChildByName("stand");
        var standS = stand.scale*1.2;
        var upS = up.scale*1.2;
        var upSize = up.getSize();
        var pengIdx = 0;//碰的牌张数
        var mjhandIdx = 0;

        var startY = cc.winSize.height*0.83;//;orders[orders.length - 1].y; //第一张牌开始的Y的位置
        var startX = cc.winSize.width*(isIPad()? 0.77 : 0.75)



        for(var i = orders.length - 1;i >= 0;i--)
        {
            if(orders[i].name == "standPri")
            {
                var oneCardWith = orders[i].getScale()*orders[i].getSize().width * 0.82;

                var handStartX = cc.winSize.width*(isIPad()? 0.29 : 0.35) + oneCardWith*orders.length

                if(orders[i].isWangPai) continue;
                mjhandIdx++;
                //开始的位置
                if(mjhandIdx == 1)
                {
                    var _pengGangCount = pl.mjchi.length + (pl.mjpeng.length + pl.mjgang0.length + pl.mjgang1.length)*3;

                    var countIdx = parseInt(_pengGangCount/3);
                    var _withArray = [0,0,0.1,0.1,0.2];//吃，碰，杠的个数
                    orders[i].x = handStartX- _pengGangCount*oneCardWith - _pengGangCount*oneCardWith*_withArray[countIdx];
                }
                else
                {
                    orders[i].x = orders[i + 1].x - oneCardWith*0.98;
                }//对家的手牌

                orders[i].loadTexture("playing/MJ3D/top/handCard.png");
                continue;
            }
            else if(orders[i].name == "zimoCardNode")
            {
                orders[i].y = cc.winSize.height*0.88;
                orders[i].setPositionX(cc.winSize.width*0.35);
                orders[i].ignoreContentAdaptWithSize(true);
                setCardSpirteTop(orders[i],12); //固定用最左边的那张图
                orders[i].ignoreContentAdaptWithSize(true);
                orders[i].setScale(upS*3.2);
                var _skewValue = 2;
                var childs = orders[i].children;
                for(var k = 0; k < childs.length; k++)
                {
                    if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                    childs[k].setScale(0.2);
                    childs[k].setPosition(orders[i].getContentSize().width*0.5,orders[i].getContentSize().height*0.645);
                    if(baidaNameArray.indexOf(childs[k].getName()) >= 0)
                    {
                        childs[k].setPosition(orders[i].getContentSize().width*0.6,orders[i].getContentSize().height*0.7);
                    }
                    childs[k].setSkewX(_skewValue);
                }
                continue;
            }
            if(orders[i].name == "gang0")
            {
                gangIdx++;
                dy = 0;
                if(gangIdx == 4 ) gangIdx = 0;

                if(gangIdx == 1)
                {
                    dy  = 0.003;
                    //orders[i].setColor(cc.color(255,0,0));
                    cc.log(" = name ========================cardIdx " + i);
                }
                else
                {
                    cardIdx++;
                }
                setCardSpirteTop(orders[i],cardIdx);

                //最右边的那张牌
                if(cardIdx == 1)
                {
                    orders[i].x = startX;
                }

                if(orders[i + 1] && orders[i + 1].name != "gang0")
                {
                    orders[i].x = orders[i + 1].x -  orders[i + 1].getScale()*orders[i + 1].getSize().width*0.2;
                }
                else  if(i < orders.length - 1 && cardIdx != 1)
                {


                    if(gangIdx == 1) //2个暗杠之间的饿间距
                    {
                        orders[i].x = orders[i + 1].x - orders[i + 1].getScale()*orders[i + 1].getSize().width*0.3;
                    }
                    else
                    {
                        orders[i].x = orders[i + 1].x - orders[i + 1].getScale()*orders[i + 1].getSize().width*0.7;
                    }

                }

                if(gangIdx == 0)
                {
                    orders[i + 3].x = orders[i + 1].x - orders[i + 1].getScale()*orders[i + 1].getSize().width*0.08;//如果有暗杠，暗杠是放在最前面的
                }

            }
            else if(orders[i].name == "gang1")
            {
                gangIdx++;
                dy = 0;
                if(gangIdx == 4) gangIdx = 0;
                if(gangIdx == 1)
                {
                    //orders[i].zIndex++;


                    if(cardIdx == 0)
                    {
                        orders[i].loadTexture("playing/MJ3D/top/top11-1.png");
                    }
                    else  if(cardIdx == 3)
                    {
                        orders[i].loadTexture("playing/MJ3D/top/top8-1.png");
                    }
                    else if(cardIdx == 6){
                        orders[i].loadTexture("playing/MJ3D/top/top5-1.png");
                    }
                    else if(cardIdx == 9){
                        orders[i].loadTexture("playing/MJ3D/top/top2-1.png");
                    }
                }
                else
                {
                    cardIdx++;

                    if(!orders[i].getChildByName("imgNode") || !orders[i].getChildByName("imgNode").visible) //如果没有这个贴图，说明是特殊的暗杠，如分析硬扣的不可见暗杠
                    {
                        cc.log("------------222200000----card idx =  " + cardIdx);
                        if(cardIdx <= 3)
                        {
                            orders[i].loadTexture("playing/MJ3D/top/top11-1.png");
                        }
                        else  if( cardIdx <= 6)
                        {
                            orders[i].loadTexture("playing/MJ3D/top/top8-1.png");
                        }
                        else if(cardIdx <= 9){
                            orders[i].loadTexture("playing/MJ3D/top/top5-1.png");
                        }
                        else{
                            orders[i].loadTexture("playing/MJ3D/top/top2-1.png");
                        }
                    }
                    else {
                        setCardSpirteTop(orders[i],cardIdx)
                    }
                }

                //最右边的那张牌
                if(cardIdx == 1)
                {
                    orders[i].x = startX;
                }
                if(orders[i + 1] && orders[i + 1].name != "gang1")
                {
                    orders[i].x = orders[i + 1].x -  orders[i + 1].getScale()*orders[i + 1].getSize().width*0.2;
                }
                else  if(i < orders.length - 1 && cardIdx != 1)
                {
                    if(gangIdx == 1) //2个暗杠之间的饿间距
                    {
                        orders[i].x = orders[i + 1].x - orders[i + 1].getScale()*orders[i + 1].getSize().width*0.2;
                    }
                    else
                    {
                        orders[i].x = orders[i + 1].x - orders[i + 1].getScale()*orders[i + 1].getSize().width*0.7;
                    }

                }

                if(gangIdx === 0)
                {
                    orders[i + 3].x = orders[i + 1].x - orders[i + 1].getScale()*orders[i + 1].getSize().width*0.01;//如果有暗杠，暗杠是放在最前面的
                }

            }
            else if(orders[i].name == "chi" || orders[i].name == "peng")
            {
                cardIdx++;
                pengIdx++;
                if(pengIdx == 3) pengIdx = 0;

                //最右边的那张牌
                if(cardIdx == 1)
                {
                    orders[i].x = startX;
                }


                //if(cardIdx == 9) orders[i].setColor(cc.color(0,255,255));

                setCardSpirteTop(orders[i],cardIdx);

                if(orders[i + 1] && orders[i + 1].name != "peng" && orders[i + 1].name != "chi")
                {
                    orders[i].x = orders[i + 1].x -  orders[i + 1].getScale()*orders[i + 1].getSize().width*1.1;
                }
                else  if(i < orders.length - 1 && cardIdx != 1)
                {
                    if(pengIdx == 1)
                    {
                        orders[i].x = orders[i + 1].x - orders[i + 1].getScale()*orders[i + 1].getSize().width*1.1;
                    }
                    else {
                        orders[i].x = orders[i + 1].x - orders[i + 1].getScale()*orders[i + 1].getSize().width*0.7;
                    }
                }
            }

            orders[i].ignoreContentAdaptWithSize(true);
            orders[i].setScale(upS*3.2);
            var childs = orders[i].children;
            for(var k = 0; k < childs.length; k++)
            {
                if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                childs[k].setScale(0.28);
                childs[k].setPosition(orders[i].getContentSize().width*0.5,orders[i].getContentSize().height*0.645);

                var _skewValue = skewValue[cardIdx - 1];
                if(cardIdx == 0) //如果第一堆牌是杠，cardIdx从0开始的
                    _skewValue = skewValue[1];

                if(childs[k].getName() == "arrow") {
                    if(childs[k].getRotation()%180 != 0)
                    {
                        childs[k].setSkewY(-_skewValue);
                    }
                }
                else {
                    childs[k].setSkewX(_skewValue);
                }
            }
        }

        // 新牌隔开
        var num = countMjHandNums(off);
        var idx = mjhandIdx - 1;
        if(num % 3 === 2 && orders[idx] && orders[idx].name === "standPri")
        {
            if(off == 2)
            {
                orders[idx].x = orders[0].x - orders[idx].scale * orders[idx].width * 1.35;
            }
            else
            {
                orders[idx].x = orders[idx].x - orders[idx].scale * orders[idx].width * 0.35;
            }
        }

    }

    // 刷新3D倒牌效果
    if(pl.mjState === TableState.roundFinish)
    {
        COMMON_UI3D.showMjhandBeforeEndOnePlayer(off);
    }
    COMMON_UI.cleanTingSign();
    //针对永州APP、邵阳APP、湘乡APP、衡阳APP、耒阳APP的2D切3D听牌做特殊处理
    if (MjClient.playui){
        if(MjClient.playui.ShowAllTingTips){
            MjClient.playui.ShowAllTingTips();
        }
        if(MjClient.playui.ShowCardTingTip){
            MjClient.playui.ShowCardTingTip();
        }
        if(MjClient.playui.showTingCardSign){
            MjClient.playui.showTingCardSign();
        }
    }
};

/**
 * 判断是否是百搭，癞子...
 * @param name
 * @returns {boolean}
 */
COMMON_UI3D.isBaidaSpite = function(name)
{
    if(MjClient.gameType == MjClient.GAME_TYPE.XU_ZHOU) return false;

    //百搭命名的种类
    var baidaNameArray = ["haozi","lizi","imgBaiDa","wangzi","jinzi"];
    return (baidaNameArray.indexOf(name) >= 0);
}

/*
    设置打出去的牌 3D
 */
COMMON_UI3D.setCurrentPutCard3D = function(off,out,putCardNum)
{

    if(!COMMON_UI3D.is3DUI()) return;

    var cardCount = [8,10,10,10]; //打出去的牌对应的每一列对应的牌的张数
    if (MjClient.MaxPlayerNum == 2)
    {
        cardCount = [12,14,16,16];
    }
    //百搭命名的种类
    var baidaNameArray = ["haozi","lizi","imgBaiDa","wangzi","jinzi"];

    if(off == 0)
    {
        //平行四边形拉伸度
        var skewValue = [
            5,4,3.5, 2,1,
            -1,-2,-3, -4.5,-5
        ];
        //x 位置偏移度
        var posValue =  [
            0.52,0.53,0.55,0.54,0.55,
            0.55,0.55,0.55,0.57,0.57
        ];

        var _picIdxArray = [1,2,3,4,5,6,7,8,9,10];

        if (MjClient.MaxPlayerNum == 2)
        {
            _picIdxArray = [11,12,13,1,2,3,4,5,6,7,8,9,10,14,15,16];

            posValue =  [
                0.52,0.52,0.52,0.53,0.53,0.55,0.55,0.55,
                0.55,0.56,0.57,0.58,0.59,0.6,0.6,0.58
            ];

            skewValue = [
                12,10,8,6,5,3, 2,-1,
                -3,-4,-5, -6,-9,-10,-12,-14
            ];
        }

        var posValueIdx,skewXValueIdx;

        if(putCardNum < cardCount[0])//第一列摆8张牌
        {
            posValueIdx   = posValue[putCardNum + 1];
            skewXValueIdx =  skewValue[putCardNum + 1];
            out.setScale(out.getScale()*2.2);

            var picIdx = _picIdxArray[putCardNum + 1];
            if (MjClient.MaxPlayerNum == 2)
            {
                picIdx = _picIdxArray[putCardNum + 2];
            }

            // cc.log("++++++++++++++++++++++++00000000000pic idx  = " +picIdx);

            out.loadTexture("playing/MJ3D/downCard/out2-" + picIdx + ".png");
            out.ignoreContentAdaptWithSize(true);
            if(putCardNum > _picIdxArray.length/2)
            {
                out.setLocalZOrder( _picIdxArray.length - putCardNum);
            }
            out.zIndex -= 10;
        }
        else if(putCardNum < cardCount[0] + cardCount[1])
        {

            var idx = putCardNum - cardCount[0];
            posValueIdx  = posValue[idx];
            skewXValueIdx =  skewValue[idx];
            out.setScale(out.getScale()*2.2);

            var picIdx = _picIdxArray[idx];
            if (MjClient.MaxPlayerNum == 2)
            {
                picIdx = _picIdxArray[idx + 1];
            }

            out.loadTexture("playing/MJ3D/downCard/out2-" +  picIdx  + ".png");
            out.ignoreContentAdaptWithSize(true);
            if(idx > _picIdxArray.length/2)
            {
                out.setLocalZOrder( cardCount[0] + cardCount[1] - idx);
            }
        }
        else if(putCardNum < cardCount[0] + cardCount[1] + cardCount[2])
        {

            var idx = putCardNum - cardCount[0] - cardCount[1];
            out.setScale(out.getScale()*2.2);
            out.loadTexture("playing/MJ3D/downCard/out2-" +  _picIdxArray[idx] + ".png");
            out.ignoreContentAdaptWithSize(true);
            if(idx > _picIdxArray.length/2)
            {
                out.setLocalZOrder( 10 + cardCount[0] + cardCount[1] + cardCount[2] - idx);
            }
            posValueIdx  = posValue[idx];
            skewXValueIdx =  skewValue[idx];
        }
        else
        {
            var idx = putCardNum  - cardCount[0] - cardCount[1] - cardCount[2] ;
            out.setScale(out.getScale()*2.2);
            out.loadTexture("playing/MJ3D/downCard/out2-" + _picIdxArray[idx]  + ".png");
            out.ignoreContentAdaptWithSize(true);
            if(idx > _picIdxArray.length/2)
            {
                out.setLocalZOrder( 10 + cardCount[0] + cardCount[1] + cardCount[2] + + cardCount[3]- idx);
            }
            posValueIdx  = posValue[idx];
            skewXValueIdx =  skewValue[idx];
        }

        var childs = out.children;
        for(var k = 0; k < childs.length; k++)
        {
            if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
            childs[k].setScale(0.45);

            childs[k].setSkewX(skewXValueIdx);

            if(COMMON_UI3D.isBaidaSpite(childs[k].getName()))
            {
                childs[k].setPosition(out.getContentSize().width*0.6, 51);
            }
            else
            {
                childs[k].setPosition(out.getContentSize().width*0.9*posValueIdx,45);
            }
        }

    }
    else if(off == 1)
    {
        //平行四边形拉伸度
        var skewValue = [
             5, 4, 3,  2, 1,
            -1,-2,-3, -4, -5
        ];


        if(putCardNum < cardCount[0])//第一列摆8张牌
        {
            var idx = putCardNum;
            var cardBetween = 2*idx; //牌间距
            out.setScale(out.getScale()* 2.2 * ( 1 - 0.02 * putCardNum));
            out.loadTexture("playing/MJ3D/rightCard/1-5.png");
            out.ignoreContentAdaptWithSize(true);
            out.setPositionX(out.getPositionX()*(1 - 0.0035 * putCardNum));
            out.setPositionY(out.getPositionY()*(1 - (0.0001 + putCardNum/2000) * putCardNum) + cardBetween);

            var childs = out.children;
            for(var k = 0; k < childs.length; k++)
            {
                if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                childs[k].setScale(0.42);
                childs[k].setSkewY(6);
                if(COMMON_UI3D.isBaidaSpite(childs[k].getName()))
                {
                    childs[k].setPosition(28,35);
                }
                else
                {
                    childs[k].setPosition(childs[k].x*0.56,childs[k].y*0.48);
                }
            }
        }
        else if(putCardNum < cardCount[0] + cardCount[1])
        {
            var idx = putCardNum - 8;
            var cardBetween = 2*idx; //牌间距
            out.setScale(out.getScale()*2.2 *( 1 - 0.02 * idx));
            out.loadTexture("playing/MJ3D/rightCard/1-6.png");
            out.ignoreContentAdaptWithSize(true);
            out.setPositionX(out.getPositionX()*(1 - 0.0048 * idx));
            out.setPositionY(out.getPositionY()*(1 - (0.0001 + idx/3000) * idx) + cardBetween);
            var childs = out.children;
            for(var k = 0; k < childs.length; k++)
            {
                if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                childs[k].setScale(0.42);

                if(COMMON_UI3D.isBaidaSpite(childs[k].getName()))
                {
                    childs[k].setPosition(28,35);
                }
                else
                {
                    childs[k].setPosition(childs[k].x*0.57,childs[k].y*0.5);
                }
                childs[k].setSkewY(7);
            }
        }
        else if(putCardNum < cardCount[0] + cardCount[1] + cardCount[2])
        {
            var idx = putCardNum - 8 - 10;
            var cardBetween = 2*idx; //牌间距
            out.zIndex -= 1;
            out.setScale(out.getScale()*2.2 *( 1 - 0.02 * idx));
            out.loadTexture("playing/MJ3D/rightCard/1-7.png");
            out.ignoreContentAdaptWithSize(true);
            out.setPositionX(out.getPositionX()*(1 - 0.0055 * idx));
            out.setPositionY(out.getPositionY()*(1 - (0.0001 + idx/3000) * idx) + cardBetween);
            var childs = out.children;
            for(var k = 0; k < childs.length; k++)
            {
                if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                childs[k].setScale(0.42);
                if(COMMON_UI3D.isBaidaSpite(childs[k].getName()))
                {
                    childs[k].setPosition(28,35);
                }
                else
                {
                    childs[k].setPosition(childs[k].x*0.57,childs[k].y*0.5);
                }
                childs[k].setSkewY(7);
            }
        }
        else {
            var idx = putCardNum - 8 - 10 - 10;
            var cardBetween = 2*idx; //牌间距
            out.zIndex -= 2;
            out.setScale(out.getScale()*2.2 *( 1 - 0.02 * idx));
            out.loadTexture("playing/MJ3D/rightCard/1-7.png");
            out.ignoreContentAdaptWithSize(true);
            out.setPositionX(out.getPositionX()*(1 - 0.0055 * idx));
            out.setPositionY(out.getPositionY()*(1 - (0.0001 + idx/3000) * idx) + cardBetween);
            var childs = out.children;
            for(var k = 0; k < childs.length; k++)
            {
                if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                childs[k].setScale(0.42);
                if(COMMON_UI3D.isBaidaSpite(childs[k].getName()))
                {
                    childs[k].setPosition(28,35);
                }
                else
                {
                    childs[k].setPosition(childs[k].x*0.57,childs[k].y*0.5);
                }
                childs[k].setSkewY(7);
            }
        }
    }
    else if(off == 2)
    {
        //旋转的角度
        var rotaValue = [
            -3,-2.5,-2,0,0,
            0,0,2,2.5,3
        ];
        //平行四边形拉伸度
        var skewValue = [
            -6, -5, -4, -3, -1, 1, 3, 4, 5, 7, 6
        ];

        var posX =  [
            0.53, 0.54, 0.55, 0.55, 0.55,
            0.55, 0.55, 0.56, 0.57, 0.58
        ];

        //x 位置偏移度
        // var posValue =  [
        //     0.52,0.5,0.5,0.52,0.55,
        //     0.55,0.55,0.55,0.55,0.52
        // ];

        var _picIdxArray = [1,2,3,4,5,6,7,8,9,10];

        if (MjClient.MaxPlayerNum == 2)
        {
            _picIdxArray = [11,12,13,1,2,3,4,5,6,7,8,9,10,14,15,16];

            posValue =  [
                0.52,0.52,0.52,0.52,0.52,0.52,0.52,0.53,
                0.55,0.56,0.57,0.58,0.59,0.6,0.6,0.6
            ];

            posX = [0.56,0.56,0.53,0.54,0.54,0.55,0.57,0.57,
                0.55,0.57,0.56,0.58,0.58,0.58,0.63,0.62];

            skewValue = [
                -13,-12,-11,-7,-5,-3,-1,0,
                1.5,2.5,3,6,8,8,10,10
            ];
        }

        var rotaValueIdx,skewXValueIdx;
        var picIdx;

        if(putCardNum < cardCount[0])//第一列摆8张牌
        {
            //posValueIdx  = posValue[putCardNum + 1];
            skewXValueIdx =  skewValue[putCardNum + 2];
            out.setScale(out.getScale()*2.2);




            picIdx = (cardCount[2] - (putCardNum + 2));
            if (MjClient.MaxPlayerNum == 2)
            {
                picIdx = (cardCount[2] - (putCardNum + 3));
            }

            if(out.afterTingCard && isJinZhongAPPType())
            {
                out.loadTexture("playing/MJ3D/common/ting-" + _picIdxArray[picIdx] + ".png");
            }
            else {
                out.loadTexture("playing/MJ3D/downCard/out2-" + _picIdxArray[picIdx] + ".png");
            }
            out.ignoreContentAdaptWithSize(true);

            if(picIdx > _picIdxArray.length/2)
            {
                out.setLocalZOrder( cardCount[3]  + cardCount[2] + cardCount[1] + cardCount[0] - picIdx);
            }
            else {
                out.setLocalZOrder(10 + picIdx);
            }

            out.zIndex += 100;
        }
        else if(putCardNum < cardCount[0] + cardCount[1])
        {
            var idx = putCardNum - cardCount[0];
            skewXValueIdx =  skewValue[idx];
            out.setScale(out.getScale()*2.2);
            picIdx = cardCount[2] - (idx + 1);
            if (MjClient.MaxPlayerNum == 2)
            {
                picIdx = cardCount[2] - (idx + 2);
            }
            if(out.afterTingCard && isJinZhongAPPType())
            {
                out.loadTexture("playing/MJ3D/common/ting-" + _picIdxArray[picIdx] + ".png");
            }
            else {
                out.loadTexture("playing/MJ3D/downCard/out2-" + _picIdxArray[picIdx] + ".png");
            }

            out.ignoreContentAdaptWithSize(true);
            if(idx >= _picIdxArray.length/2)
            {
                out.setLocalZOrder( cardCount[3]  + cardCount[2] + cardCount[1] - idx);
            }
            else {
                out.setLocalZOrder(idx);
            }
            out.zIndex += 50;
        }
        else if(putCardNum < cardCount[0] + cardCount[1] + cardCount[2])
        {
            var idx = putCardNum - cardCount[0] - cardCount[1] ;
            out.setScale(out.getScale()*2.2);
            skewXValueIdx =  skewValue[idx];
            picIdx = cardCount[2]- (idx + 1);

            cc.log("------------------------------------picIdx = " + picIdx);

            if(out.afterTingCard && isJinZhongAPPType())
            {
                out.loadTexture("playing/MJ3D/common/ting-" + _picIdxArray[picIdx] + ".png");
            }
            else {
                out.loadTexture("playing/MJ3D/downCard/out2-" + _picIdxArray[picIdx] + ".png");
            }

            out.ignoreContentAdaptWithSize(true);
            if(idx >  _picIdxArray.length/2)
            {
                out.setLocalZOrder( cardCount[3]  + cardCount[2] - idx);
            }
            else {
                out.setLocalZOrder(idx);
            }
        }
        else
        {
            var idx = putCardNum - cardCount[0] - cardCount[1] - cardCount[2];
            out.setScale(out.getScale()*2.2);
            skewXValueIdx =  skewValue[idx];
            picIdx = cardCount[2]- (idx + 1);

            if(out.afterTingCard && isJinZhongAPPType())
            {
                out.loadTexture("playing/MJ3D/common/ting-" + _picIdxArray[picIdx] + ".png");
            }
            else {
                out.loadTexture("playing/MJ3D/downCard/out2-" + _picIdxArray[picIdx] + ".png");
            }

            out.ignoreContentAdaptWithSize(true);
            if(idx >  _picIdxArray.length/2)
            {
                out.setLocalZOrder( cardCount[3] - idx);
            }
            else {
                out.setLocalZOrder(idx);
            }

            out.zIndex -= 10;
        }

        var childs = out.children;
        for(var k = 0; k < childs.length; k++)
        {
            if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);

            childs[k].setScale(0.45);

            if(COMMON_UI3D.isBaidaSpite(childs[k].getName()))
            {
                childs[k].setPosition(childs[k].x*0.6,48);
            }
            else
            {

                if(picIdx >= _picIdxArray.length ) picIdx = _picIdxArray.length - 1;
                var pos_x = 50;
                if(isYongZhouProject()){
                    pos_x = childs[k].x;
                }
                childs[k].setPosition(pos_x*posX[picIdx],45);
            }

            childs[k].setSkewX(skewXValueIdx);
            //childs[k].setRotation(rotaValueIdx);
        }

    }
    else if(off == 3)
    {
        var _picHunPos = cc.p(38,35);//混牌贴图的位置
        if(putCardNum < cardCount[0])//第一列摆8张牌
        {
            var idx = putCardNum;
            var cardBetween = (MjClient.MaxPlayerNum == 4)? 1.2*idx : 3*idx; //牌间距
            var scale = out.getScale()*2.2;
            out.setScale(scale*(1 - (cardCount[0] -putCardNum)*0.01 )); //putCardNum
            out.loadTexture("playing/MJ3D/left/1-4.png");
            out.ignoreContentAdaptWithSize(true);
            out.setPositionX(out.getPositionX()*(1 - 0.0058 * putCardNum));
            out.setPositionY(out.getPositionY()*(1 + (0.014 + putCardNum/600) * putCardNum) - cardBetween);
            out.zIndex = 300 + putCardNum;
            var childs = out.children;
            for(var k = 0; k < childs.length; k++)
            {
                if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                childs[k].setScale(0.42);
                if(COMMON_UI3D.isBaidaSpite(childs[k].getName()))
                {
                    childs[k].setPosition(_picHunPos);
                }
                else
                {
                    childs[k].setPosition(childs[k].x*0.5,childs[k].y*0.5);
                }
                childs[k].setSkewY(-6);
            }
        }
        else if(putCardNum < cardCount[0] + cardCount[1])
        {
            var idx = putCardNum - 8;
            var cardBetween = (MjClient.MaxPlayerNum == 4)? 1.1*idx : 2.5*idx; //牌间距
            out.zIndex = 100 + idx;
            var scale = out.getScale()*2.2;
            out.setScale(scale*(1 - (cardCount[1] -idx)*0.02 )); //putCardNum
            out.loadTexture("playing/MJ3D/left/1-3.png");
            out.ignoreContentAdaptWithSize(true);
            //if(idx == 0) out.setColor(cc.color(240, 230, 140));
            out.setPositionX(out.getPositionX()*(1 - 0.009 * idx));
            out.setPositionY(out.getPositionY()*(1 + (0.014 + idx/600) * idx) - cardBetween);
            var childs = out.children;
            for(var k = 0; k < childs.length; k++)
            {
                if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                childs[k].setScale(0.42);
                if(COMMON_UI3D.isBaidaSpite(childs[k].getName()))
                {
                    childs[k].setPosition(_picHunPos);
                }
                else
                {
                    childs[k].setPosition(childs[k].x*0.5,childs[k].y*0.5);
                }
                childs[k].setSkewY(-7);
            }
        }
        else if(putCardNum < cardCount[0] + cardCount[1]+ cardCount[2])
        {
            var scale = out.getScale()*2.2;
            var idx = putCardNum - 8 - 10 ;
            var cardBetween = 2.5*idx; //牌间距
            out.zIndex = 50 + idx;
            out.setScale(scale*(1 - (cardCount[2] -idx)*0.02 )); //putCardNum
            out.loadTexture("playing/MJ3D/left/1-2.png");
            out.ignoreContentAdaptWithSize(true);
            out.setPositionX(out.getPositionX()*(1 - 0.0135 * idx));
            out.setPositionY(out.getPositionY()*(1 + (0.0145 + idx/600) * idx) - cardBetween);
            var childs = out.children;
            for(var k = 0; k < childs.length; k++)
            {
                if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                childs[k].setScale(0.42);
                if(COMMON_UI3D.isBaidaSpite(childs[k].getName()))
                {
                    childs[k].setPosition(_picHunPos);
                }
                else
                {
                    childs[k].setPosition(childs[k].x*0.5,childs[k].y*0.5);
                }
                childs[k].setSkewY(-7);
            }
        }
        else {
            var scale = out.getScale()*2.2;
            var idx = putCardNum - 8 - 10 - 10 ;
            var cardBetween = 2.5*idx; //牌间距
            out.zIndex = idx;
            out.setScale(scale*(1 - (cardCount[3] -idx)*0.02 )); //putCardNum
            out.loadTexture("playing/MJ3D/left/1-2.png");
            out.ignoreContentAdaptWithSize(true);
            out.setPositionX(out.getPositionX()*(1 - 0.02 * idx));
            out.setPositionY(out.getPositionY()*(1 + (0.014 + idx/600) * idx) - cardBetween);
            var childs = out.children;
            for(var k = 0; k < childs.length; k++)
            {
                if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
                childs[k].setScale(0.42);
                if(COMMON_UI3D.isBaidaSpite(childs[k].getName()))
                {
                    childs[k].setPosition(_picHunPos);
                }
                else
                {
                    childs[k].setPosition(childs[k].x*0.5,childs[k].y*0.5);
                }
                childs[k].setSkewY(-7);
            }
        }
    }



    var processTingCard = function ()
    {
        var pl = getUIPlayer(off);
        var idx = pl.putCardAfterTing;
        if (idx >= 0 && idx == putCardNum) {
            if (MjClient.rePlayVideo == -1) {
                if (off == 0) {
                    //out.setColor(cc.color(240, 230, 140));
                } else if (off == 3) {
                    if (putCardNum < cardCount[0])//第一列摆8张牌
                    {
                        out.loadTexture("playing/MJ3D/common/2-2.png");
                    } else if (putCardNum < cardCount[0] + cardCount[1]) {
                        out.loadTexture("playing/MJ3D/common/2-3.png");
                    } else {
                        out.loadTexture("playing/MJ3D/common/2-4.png");
                    }
                    out.setColor(cc.color(255, 255, 255));
                } else if (off == 2) {
                    out.loadTexture("playing/MJ3D/common/eat81.png");
                    out.setColor(cc.color(255, 255, 255));
                } else if (off == 1) {
                    if (putCardNum < cardCount[0])//第一列摆8张牌
                    {
                        out.loadTexture("playing/MJ3D/common/2-5.png");
                    } else if (putCardNum < cardCount[0] + cardCount[1]) {
                        out.loadTexture("playing/MJ3D/common/2-6.png");
                    } else {
                        out.loadTexture("playing/MJ3D/common/2-7.png");
                    }
                    out.setColor(cc.color(255, 255, 255));
                }
                unschedulePlayMoveCardOtherSameCardGrey(out);
            } else//回放
            {
                out.setColor(cc.color(240, 230, 140));
            }
        }
    }

    //听牌，后盖住那张听得牌 ,晋中的玩法需要， by sking 2018.9.26
    var tData = MjClient.data.sData.tData;
    if(isJinZhongAPPType()) {
        if(MjClient.gameType === MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI){
            if(!tData.areaSelectMode["tingPaiBuKou"]) processTingCard();
        }else{
            processTingCard();
        }
    }

    //3D麻将，听后打出的一张牌
    if (MjClient.GAME_TYPE.SI_YANG == MjClient.gameType) {
        var pl = getUIPlayer(off);
        var idx = pl.putCardAfterTing;
        var tingIndex = pl.tingIndex;//沭阳麻将需要
        if(cc.isUndefined(tingIndex) || !pl.isTing) tingIndex = -1;//为了不报错;
        if (idx >= 0 && tingIndex == putCardNum) {
            out.setColor(cc.color(240, 230, 140));
        }
    }
};


/*
    重置牌桌麻将位置 0：down 1：left 2：top 3：left
 */
COMMON_UI3D.resetCardLayout = function(off)
{
    var _node = getNode(off);
    var _out0  = _node.getChildByName("out0");
    var jincard = _node.getChildByName("jinout");
    if(jincard) jincard.visible = false;
    _out0.visible = false;
    _out0.standScale = null;
    var _out1 = _node.getChildByName("out1");
    _out1.visible = false;
    _out1.standScale = null;
    var _out2 = _node.getChildByName("out2");
    if (!_out2)
    {
        _out2 = _out1.clone();
        _out2.setName("out2");
        _node.addChild(_out2);
        _out2.standScale = null;
    }
    if (_out2) _out2.visible = false;


    //第四排
    var _out3 = _node.getChildByName("out3");
    if(!_out3)
    {
        _out3 = _out1.clone();
        _out3.setName("out3");
        _node.addChild(_out3);
        _out3.standScale = null;
    }
    if (_out3) _out3.visible = false;



    var _stand = _node.getChildByName("stand");
    if(_stand){
        _stand.standScale = null;
        _stand.visible = false;
    }


    var _up = _node.getChildByName("up");
    if(_up) _up.visible = false;


    //ipad 适配
    var _ds = 0;
    if(isIPad())
    {
        _ds = -0.01;
    }

    if(COMMON_UI3D.is3DUI())
    {
        switch (off)
        {
            case 0:
                setWgtLayout(_stand, [0.053, 0], [0.5, 0], [8, 0.72]);
                if(MjClient.data.sData.tData.maxPlayer == 4)
                {
                    setWgtLayout(_out0, [0.0, 0.076 + _ds], [0.58, -0.07], [-7, 6.1]);
                    setWgtLayout(_out1, [0.0, 0.079 + _ds], [0.547, -0.062], [-7, 4.9]);
                    if(_out2) setWgtLayout(_out2, [0.0, 0.081 + _ds], [0.546, -0.054], [-7 + 0.06, 3.83]);
                    setWgtLayout(_up,[0.05, 0], [0, 0], [0.7, 0.5]);
                }
                else if(MjClient.data.sData.tData.maxPlayer == 3)
                {
                    setWgtLayout(_out0, [0.0, 0.076 + _ds], [0.57 + 0.007, -0.07 + 0.04], [-7, 6.1]);
                    setWgtLayout(_out1, [0.0, 0.079 + _ds], [0.54 + 0.003, -0.062 + 0.04], [-7, 4.9]);
                    if(_out2) setWgtLayout(_out2, [0.0, 0.081 + _ds], [0.54 + 0.002, -0.054 + 0.04], [-7 + 0.06, 3.83]);
                    if(_out3) setWgtLayout(_out3, [0.0, 0.082 + _ds], [0.54 + 0.002, -0.054 + 0.04], [-7 , 3]);
                    setWgtLayout(_up,[0.05, 0], [0, 0], [0.7, 0.5]);
                }
                else if(MjClient.data.sData.tData.maxPlayer == 2)
                {
                    setWgtLayout(_out0, [0.0, 0.076+ _ds], [0.506, -0.05 + 0.02], [-7, 6.1]);
                    setWgtLayout(_out1, [0.0, 0.079+ _ds], [0.47, -0.04+ 0.02], [-7, 4.9]);
                    if(_out2) setWgtLayout(_out2, [0.0, 0.082+ _ds], [0.429, -0.039+ 0.022], [-7 + 0.06, 3.83]);
                    if(_out3) setWgtLayout(_out3, [0.0, 0.084+ _ds], [0.425 + 0.002, -0.049+ 0.022], [-7 + 0.06 , 3]);
                    setWgtLayout(_up,[0.05, 0], [0, 0], [0.7, 0.5]);
                }
                break;
            case 1:
                if(MjClient.data.sData.tData.maxPlayer == 4)
                {
                    setWgtLayout(_out0, [0, 0.056+ _ds], [0.9, 0.645], [-5.2, -4.0]);
                    setWgtLayout(_out1, [0, 0.055+ _ds], [0.9, 0.601], [-4.0, -4.1]);
                    if(_out2) setWgtLayout(_out2, [0, 0.055+ _ds], [0.9, 0.601], [-2.8 + 0.02, -4.1]);
                    //setWgtLayout(_up,[0, 0.05], [1, 0],[-3.0, 3]);
                }
                else if(MjClient.data.sData.tData.maxPlayer == 3)
                {
                    setWgtLayout(_out0, [0, 0.056+ _ds], [0.9  - 0.055 - 0.006, 0.645 + 0.097], [-5.2, -4.0]);
                    setWgtLayout(_out1, [0, 0.055+ _ds], [0.9 - 0.055 - 0.006, 0.601+ 0.09], [-4.0, -4.0]);
                    if(_out2) setWgtLayout(_out2, [0, 0.055+ _ds], [0.9 - 0.055 - 0.006, 0.601+ 0.09], [-2.8 + 0.02, -4.0]);
                    if(_out3) setWgtLayout(_out3, [0, 0.055+ _ds], [0.9 - 0.055 - 0.006, 0.601+ 0.09], [-1.6, -4.0]);
                }
                setWgtLayout(jincard, [0, 0.055], [0.94, 0.5], [-4.6, 0.7]);

                break;
            case 2:
                if(MjClient.data.sData.tData.maxPlayer == 4)
                {
                    setWgtLayout(_out0, [0, 0.07+ _ds], [0.51, 1 + 0.02], [4.1, -4.1]);
                    setWgtLayout(_out1, [0, 0.0675+ _ds], [0.5405, 0.988 + 0.02], [4.1, -3.2]);
                    if(_out2) setWgtLayout(_out2, [0, 0.065+ _ds], [0.54, 1], [4.15, -2.3]);
                    setWgtLayout(_stand, [0, 0.07], [0.5 + 0.05 - 0.1, 1], [-6, -0.8]);
                    setWgtLayout(_up,[0, 0.07], [0.5, 1 + 0.015], [6, -1.4]);


                }
                else if(MjClient.data.sData.tData.maxPlayer == 2) {
                    setWgtLayout(_out0, [0, 0.07+ _ds], [0.57, 1 - 0.02 ], [4.1, -4.1]);
                    setWgtLayout(_out1, [0, 0.0675+ _ds], [0.598, 0.988  - 0.02], [4.1, -3.2]);
                    if(_out2) setWgtLayout(_out2, [0, 0.065+ _ds], [0.623, 0.98 - 0.02], [4.15, -2.3]);
                    if(_out3) setWgtLayout(_out3, [0, 0.062+ _ds], [0.618, 1 - 0.005], [4.11, -2.2]);
                    setWgtLayout(_stand, [0, 0.07], [0.5, 1], [-6, -0.8]);
                    setWgtLayout(_up,[0, 0.07], [0.5, 1 + 0.033], [6, -1.4]);
                }
                setWgtLayout(jincard, [0, 0.08], [0.55, 1], [-1.8, -1.7]);
                // if(isIPad())
                // {
                //     setWgtLayout(_stand, [0, 0.07], [0.45, 1], [-6, -0.8]);
                // }

                break;
            case 3:
                if(MjClient.data.sData.tData.maxPlayer == 4)
                {
                    setWgtLayout(_out0, [0, 0.056+ _ds], [0.15 - 0.02 - 0.007 + 0.002,0.477 + 0.016], [5.2, 4.2]);
                    setWgtLayout(_out1, [0, 0.056+ _ds], [0.163 - 0.02- 0.014+ 0.0046, 0.514 + 0.016], [3.9, 4.2]);
                    if(_out2) setWgtLayout(_out2, [0, 0.056+ _ds], [0.15- 0.014+ 0.003, 0.514+ 0.016], [2.73, 4.2]);
                }
                else if(MjClient.data.sData.tData.maxPlayer == 3)
                {
                    setWgtLayout(_out0, [0, 0.056+ _ds], [0.15 - 0.018  + 0.05,0.477 + 0.08 + 0.035], [5.2, 4.2]);
                    setWgtLayout(_out1, [0, 0.056+ _ds], [0.163 - 0.02 + 0.05 , 0.514+ 0.08 + 0.035], [3.9, 4.2]);
                    if(_out2) setWgtLayout(_out2, [0, 0.056+ _ds], [0.15 + 0.05, 0.514+ 0.08 + 0.035], [2.73, 4.2]);
                    if(_out3) setWgtLayout(_out3, [0, 0.056+ _ds], [0.15 + 0.05, 0.514+ 0.08 + 0.035], [1.72, 4.2]);
                }
                setWgtLayout(jincard, [0, 0.055], [0.065, 0.5], [4.2, 0.7]);
                break;
            default:
                break;
        }
    }
    else {
        if(isIPad())
        {
            COMMON_UI.gSetIPadMJ(off);
        }
        else
        {
            if(isJinZhongAPPType())
            {
                switch (off)
                {
                    case 0:
                        setWgtLayout(_stand, [0.053, 0], [0.5, 0], [8, 0.72]);
                        setWgtLayout(_out0, [0.0, 0.08], [0.55, -0.08], [-7, 6.1]);
                        setWgtLayout(_out1, [0.0, 0.08], [0.55, -0.06], [-7, 4.9]);
                        setWgtLayout(_out2, [0.0, 0.08], [0.55, -0.04], [-7, 3.7]);
                        setWgtLayout(_up,[0.05, 0], [0, 0], [0.7, 0.7]);
                        if (MjClient.MaxPlayerNum === 2)
                        {
                            _out0.x -= _out0.height * _out0.scale *  4.2;
                            _out1.x -= _out1.height * _out1.scale *  4.2;
                            if(_out2) _out2.x -= _out2.height * _out2.scale *  4.2;
                        }
                        break;
                    case 1:
                        setWgtLayout(_out0, [0, 0.055], [0.94, 0.5], [-5.2, -4.0]);
                        setWgtLayout(_out1, [0, 0.055], [0.94, 0.5], [-4.0, -4.0]);
                        setWgtLayout(_out2, [0, 0.055], [0.94, 0.5], [-2.8, -4.0]);
                        break;
                    case 2:
                        setWgtLayout(_out0, [0, 0.08], [0.55, 1], [4.1, -4.1]);
                        setWgtLayout(_out1, [0, 0.08], [0.55, 1], [4.1, -3.2]);
                        setWgtLayout(_out2, [0, 0.08], [0.55, 1], [4.1, -2.3]);
                        setWgtLayout(_stand,[0, 0.07],[0.5 - 0.05, 1], [-6, -1.4]);
                        setWgtLayout(_up,[0, 0.07], [0.5, 1], [6, -1.4]);
                        if (MjClient.MaxPlayerNum === 2)
                        {
                            _out0.x += _out0.height * _out0.scale *  4;
                            _out1.x += _out1.height * _out1.scale *  4;
                            if(_out2) _out2.x += _out2.height * _out2.scale *  4;
                        }
                        break;
                    case 3:
                        setWgtLayout(_out0, [0, 0.055], [0.065, 0.5], [5.2, 4.2]);
                        setWgtLayout(_out1, [0, 0.055], [0.065, 0.5], [3.9, 4.2]);
                        setWgtLayout(_out2, [0, 0.055], [0.068, 0.5], [2.6, 4.2]);
                        if (MjClient.MaxPlayerNum === 3)
                        {
                            _out0.y += _out0.height * _out0.scale * 2;
                            _out1.y += _out1.height * _out1.scale * 2;
                            if(_out2) _out2.y += _out2.height * _out2.scale * 2;
                        }
                        break;
                    default:
                        break;
                }
            }
            else if(MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
            {
                switch (off)
                {
                    case 0:
                        setWgtLayout(_stand, [0.053, 0], [0.5, 0], [8, 0.72]);
                        setWgtLayout(_up, [0.05, 0], [0, 0], [0.8, 0.7]);
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0.0, 0.0763], [0.53, 0], [-7, 3.8]);
                        } else {
                            setWgtLayout(_out0, [0.0, 0.07], [0.53, 0], [-3, 3.8]);
                        }
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0.0, 0.0763], [0.53, 0], [-7, 4.85]);
                        } else {
                            setWgtLayout(_out1, [0.0, 0.07], [0.53, 0], [-3, 4.85]);
                        }
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out2, [0.0, 0.0763], [0.53, 0], [-7, 5.9]);
                        } else {
                            setWgtLayout(_out2, [0.0, 0.07], [0.53, 0], [-3, 5.9]);
                        }

                        if (MjClient.MaxPlayerNum === 2){
                            _out0.x -= _out0.height * _out0.scale * 5;
                            _out1.x -= _out1.height * _out1.scale * 5;
                            if(_out2) _out2.x -= _out2.height * _out2.scale * 5;
                        }
                        break;

                    case 1:
                        setWgtLayout(_up, [0, 0.05], [1, 0], [-3, 6]);
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0, 0.0545], [1, 0.5], [-4.6, -4.1]);
                        } else {
                            setWgtLayout(_out0, [0, 0.05], [1, 0.5], [-4.6, -5.1]);
                        }
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0, 0.0545], [1, 0.5], [-5.9, -4.1]);
                        } else {
                            setWgtLayout(_out1, [0, 0.05], [1, 0.5], [-5.9, -5.1]);
                        }
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            if(_out2) setWgtLayout(_out2, [0, 0.0545], [1, 0.5], [-7.2, -4.1]);
                        } else {
                            if(_out2) setWgtLayout(_out2, [0, 0.05], [1, 0.5], [-7.2, -5.1]);
                        }
                        break;

                    case 2:
                        setWgtLayout(_stand, [0, 0.07], [0.5 , 1], [-6, -1.4]);
                        setWgtLayout(_up, [0, 0.07], [0.5, 1], [6, -1.4]);
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0, 0.0763], [0.5, 1], [6.8, -2.5]);
                        } else {
                            setWgtLayout(_out0, [0, 0.07], [0.5, 1], [4.8, -2.5]);
                        }
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0, 0.0763], [0.5, 1], [6.8, -3.55]);
                        } else {
                            setWgtLayout(_out1, [0, 0.07], [0.5, 1], [4.8, -3.55]);
                        }
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            if(_out2) setWgtLayout(_out2, [0, 0.0763], [0.5, 1], [6.8, -4.6]);
                        } else {
                            if(_out2) setWgtLayout(_out2, [0, 0.07], [0.5, 1], [4.8, -4.6]);
                        }

                        if (MjClient.MaxPlayerNum === 2){
                            _out0.x += _out0.height * _out0.scale * 5.5;
                            _out1.x += _out1.height * _out1.scale * 5.5;
                            if(_out2) _out2.x += _out2.height * _out2.scale * 5.5;
                        }
                        break;

                    case 3:
                        setWgtLayout(_up, [0, 0.05], [0, 1], [3.0, -3.5]);
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0, 0.0545], [0, 0.5], [4.5, 4.8]);
                        } else {
                            setWgtLayout(_out0, [0, 0.05], [0, 0.5], [4.5, 4.8]);
                        }
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0, 0.0545], [0, 0.5], [5.7, 4.8]);
                        } else {
                            setWgtLayout(_out1, [0, 0.05], [0, 0.5], [5.7, 4.8]);
                        }
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out2, [0, 0.0545], [0, 0.5], [6.9, 4.8]);
                        } else {
                            setWgtLayout(_out2, [0, 0.05], [0, 0.5], [6.9, 4.8]);
                        }

                        if (MjClient.MaxPlayerNum === 3){
                            _out0.y += _out0.height * _out0.scale * 2;
                            _out1.y += _out1.height * _out1.scale * 2;
                            if(_out2) _out2.y += _out2.height * _out2.scale * 2;
                        }
                        break;

                    default:
                        break;
                }
            }
            else if(MjClient.getAppType() === MjClient.APP_TYPE.QXHAIANMJ)
            {
                switch (off)
                {
                    case 0:
                        setWgtLayout(_up, [0.05, 0], [0, 0], [0.8, 0.7]);
                        setWgtLayout(_out0, [0.0, 0.08], [0.55, -0.08], [-7, 6.1]);
                        setWgtLayout(_out1, [0.0, 0.08], [0.55, -0.06], [-7, 4.9]);
                        setWgtLayout(_out2, [0.0, 0.08], [0.55, -0.04], [-7, 3.7]);

                        if (MjClient.MaxPlayerNum === 2){
                            _out0.x -= _out0.height * _out0.scale * 5;
                            _out1.x -= _out1.height * _out1.scale * 5;
                            if(_out2) _out2.x -= _out2.height * _out2.scale * 5;
                        }
                        break;

                    case 1:
                        setWgtLayout(_up, [0, 0.05], [1, 0], [-3, 6]);
                        setWgtLayout(_out0, [0, 0.055], [0.94, 0.5], [-5.2, -4.0]);
                        setWgtLayout(_out1, [0, 0.055], [0.94, 0.5], [-4.0, -4.0]);
                        setWgtLayout(_out2, [0, 0.055], [0.94, 0.5], [-2.8, -4.0]);
                        break;

                    case 2:
                        setWgtLayout(_stand, [0, 0.07], [0.5 , 1], [-6, -1.4]);
                        setWgtLayout(_up, [0, 0.07], [0.5, 1], [6, -1.4]);
                        setWgtLayout(_out0, [0, 0.08], [0.55, 1], [4.1, -4.1]);
                        setWgtLayout(_out1, [0, 0.08], [0.55, 1], [4.1, -3.2]);
                        setWgtLayout(_out2, [0, 0.08], [0.55, 1], [4.1, -2.3]);

                        if (MjClient.MaxPlayerNum === 2){
                            _out0.x += _out0.height * _out0.scale * 5.5;
                            _out1.x += _out1.height * _out1.scale * 5.5;
                            if(_out2) _out2.x += _out2.height * _out2.scale * 5.5;
                        }
                        break;

                    case 3:
                        setWgtLayout(_up, [0, 0.05], [0, 1], [3.0, -3.5]);
                        setWgtLayout(_out0, [0, 0.055], [0.065, 0.5], [5.2, 4.2]);
                        setWgtLayout(_out1, [0, 0.055], [0.065, 0.5], [3.9, 4.2]);
                        setWgtLayout(_out2, [0, 0.055], [0.065, 0.5], [2.6, 4.2]);
                        break;

                    default:
                        break;
                }
            }
            else if(MjClient.getAppType() === MjClient.APP_TYPE.QXXZMJ)
            {
                switch (off)
                {
                    case 0:
                        setWgtLayout(_up, [0.05, 0], [0, 0], [0.8, 0.7]);
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0.0, 0.0763], [0.53, 0], [-7, 3.7]);
                        } else {
                            setWgtLayout(_out0, [0.0, 0.07], [0.53, 0], [-7, 3.7]);
                        }
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0.0, 0.0763], [0.53, 0], [-7, 4.7]);
                        } else {
                            setWgtLayout(_out1, [0.0, 0.07], [0.53, 0], [-7, 4.7]);
                        }
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out2, [0.0, 0.0763], [0.53, 0], [-7, 5.7]);
                        } else {
                            setWgtLayout(_out2, [0.0, 0.07], [0.53, 0], [-7, 5.7]);
                        }

                        if (MjClient.MaxPlayerNum === 2){
                            _out0.x -= _out0.height * _out0.scale * 5;
                            _out1.x -= _out1.height * _out1.scale * 5;
                            if(_out2) _out2.x -= _out2.height * _out2.scale * 5;
                        }
                        break;
                    case 1:
                        setWgtLayout(_stand, [0, 0.08], [1, 0.95], [-5.5, -2.3]);
                        setWgtLayout(_up, [0, 0.05], [1, 0], [-3.0, 6]);
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0, 0.0545], [1, 0.5], [-4.8, -4.1]);
                        } else {
                            setWgtLayout(_out0, [0, 0.05], [1, 0.5], [-4.8, -5.1]);
                        }
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0, 0.0545], [1, 0.5], [-6.0, -4.1]);
                        } else {
                            setWgtLayout(_out1, [0, 0.05], [1, 0.5], [-6.0, -5.1]);
                        }
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out2, [0, 0.0545], [1, 0.5], [-7.2, -4.1]);
                        } else {
                            setWgtLayout(_out2, [0, 0.05], [1, 0.5], [-7.2, -5.1]);
                        }
                        break;
                    case 2:
                        setWgtLayout(_stand, [0, 0.07], [0.5, 1], [-6, -1.4]);
                        setWgtLayout(_up,  [0, 0.07], [0.5, 1], [6, -1.4]);
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0, 0.0763], [0.5, 1], [6.8, -2.5]);
                        } else {
                            setWgtLayout(_out0, [0, 0.07], [0.5, 1], [6.8, -2.5]);
                        }
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0, 0.0763], [0.5, 1], [6.8, -3.5]);
                        } else {
                            setWgtLayout(_out1, [0, 0.07], [0.5, 1], [6.8, -3.5]);
                        }
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out2, [0, 0.0763], [0.5, 1], [6.8, -4.5]);
                        } else {
                            setWgtLayout(_out2, [0, 0.07], [0.5, 1], [6.8, -4.5]);
                        }

                        if (MjClient.MaxPlayerNum === 2){
                            _out0.x += _out0.height * _out0.scale * 5.5;
                            _out1.x += _out1.height * _out1.scale * 5.5;
                            if(_out2) _out2.x += _out2.height * _out2.scale * 5.5;
                        }
                        break;
                    case 3:
                        setWgtLayout(_stand, [0, 0.08], [0, 0], [5.2, 3]);
                        setWgtLayout(_up, [0, 0.05], [0, 1], [3.0, -3.5]);

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0, 0.0545], [0, 0.5], [4.5, 4.8]);
                        } else {
                            setWgtLayout(_out0, [0, 0.05], [0, 0.5], [4.5, 4.8]);
                        }
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0, 0.0545], [0, 0.5], [5.6, 4.8]);
                        } else {
                            setWgtLayout(_out1, [0, 0.05], [0, 0.5], [5.6, 4.8]);
                        }
                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out2, [0, 0.0545], [0, 0.5], [6.7, 4.8]);
                        } else {
                            setWgtLayout(_out2, [0, 0.05], [0, 0.5], [6.7, 4.8]);
                        }
                        if (MjClient.MaxPlayerNum === 3){
                            _out0.y += _out0.height * _out0.scale * 2;
                            _out1.y += _out1.height * _out1.scale * 2;
                            if(_out2) _out2.y += _out2.height * _out2.scale * 2;
                        }
                        break;
                }
            }
            else if(MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ ||
                MjClient.getAppType() === MjClient.APP_TYPE.QXHAMJ )
            {
                switch (off)
                {
                    case 0:
                        setWgtLayout(_stand, [0.053, 0], [0.5, 0], [8, 0.72]);
                        setWgtLayout(_up, [0.05, 0], [0, 0], [0.8, 0.7]);

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0.0, 0.0763], [0.53, 0], [-7, 3.7]);
                        } else {
                            setWgtLayout(_out0, [0.0, 0.07], [0.53, 0], [-7, 3.7]);
                        }
                        if (MjClient.MaxPlayerNum === 2)
                            _out0.x -= _out0.height * _out0.scale * 5;

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0.0, 0.0763], [0.53, 0], [-7, 4.7]);
                        } else {

                            setWgtLayout(_out1, [0.0, 0.07], [0.53, 0], [-7, 4.7]);
                        }
                        if (MjClient.MaxPlayerNum === 2)
                            _out1.x -= _out1.height * _out1.scale * 5;

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out2, [0.0, 0.0763], [0.53, 0], [-7, 5.7]);
                        } else {
                            setWgtLayout(_out2, [0.0, 0.07], [0.53, 0], [-7, 5.7]);
                        }
                        if (MjClient.MaxPlayerNum === 2)
                            _out2.x -= _out2.height * _out2.scale * 5;
                        break;
                    case 1:
                        setWgtLayout(_stand, [0, 0.08], [1, 1], [-5.5, -2.3]);
                        setWgtLayout(_up, [0, 0.05], [1, 0], [-3.0, 6]);

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0, 0.0545], [1, 0.5], [-4.6, -4.1]);
                        } else {
                            setWgtLayout(_out0, [0, 0.05], [1, 0.5], [-4.6, -5.1]);
                        }

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0, 0.0545], [1, 0.5], [-5.8, -4.1]);
                        } else {
                            setWgtLayout(_out1, [0, 0.05], [1, 0.5], [-5.8, -5.1]);
                        }

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out2, [0, 0.0545], [1, 0.5], [-7.0, -4.1]);
                        } else {
                            setWgtLayout(_out2, [0, 0.05], [1, 0.5], [-7.0, -5.1]);
                        }
                        break;
                    case 2:

                        setWgtLayout(_stand, [0, 0.07], [0.5, 1], [-6, -1.0]);
                        if(MjClient.getAppType() === MjClient.APP_TYPE.QXXZMJ) setWgtLayout(_stand,[0, 0.07],[0.5 - 0.05, 1], [-6, -1.4]);
                        setWgtLayout(_up,  [0, 0.07], [0.5, 1], [6, -1.0]);

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0, 0.0763], [0.5, 1], [6.8, -2.5]);
                        } else {
                            setWgtLayout(_out0, [0, 0.07], [0.5, 1], [6.8, -2.5]);
                        }
                        if (MjClient.MaxPlayerNum === 2)
                            _out0.x += _out0.height * _out0.scale * 5.5;

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0, 0.0763], [0.5, 1], [6.8, -3.5]);
                        } else {
                            setWgtLayout(_out1, [0, 0.07], [0.5, 1], [6.8, -3.5]);
                        }
                        if (MjClient.MaxPlayerNum === 2)
                            _out1.x += _out1.height * _out1.scale * 5.5;

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out2, [0, 0.0763], [0.5, 1], [6.8, -4.5]);
                        } else {
                            setWgtLayout(_out2, [0, 0.07], [0.5, 1], [6.8, -4.5]);
                        }
                        if (MjClient.MaxPlayerNum === 2)
                            _out2.x += _out2.height * _out2.scale * 5.5;
                        break;
                    case 3:
                        setWgtLayout(_stand, [0, 0.08], [0, 0], [5.2, 3]);
                        setWgtLayout(_up, [0, 0.05], [0, 1], [3.0, -3.5]);

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0, 0.0545], [0, 0.5], [4.5, 4.8]);
                        } else {
                            setWgtLayout(_out0, [0, 0.05], [0, 0.5], [4.5, 4.8]);
                        }
                        if (MjClient.MaxPlayerNum === 3)
                            _out0.y += _out0.height * _out0.scale * 2;

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0, 0.0545], [0, 0.5], [5.6, 4.8]);
                        } else {
                            setWgtLayout(_out1, [0, 0.05], [0, 0.5], [5.6, 4.8]);
                        }
                        if (MjClient.MaxPlayerNum === 3)
                            _out1.y += _out1.height * _out1.scale * 2;

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out2, [0, 0.0545], [0, 0.5], [6.85, 4.8]);
                        } else {
                            setWgtLayout(_out2, [0, 0.05], [0, 0.5], [6.85, 4.8]);
                        }
                        if (MjClient.MaxPlayerNum === 3)
                            _out2.y += _out2.height * _out2.scale * 2;
                        break;
                }
            }else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ)
            {
                switch (off)
                {
                    case 0:
                        setWgtLayout(_up, [0.05, 0], [0, 0], [0.8, 0.7]);

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0.0, 0.0763], [0.53, 0], [-7, 3.8]);
                        } else {
                            setWgtLayout(_out0, [0.0, 0.07], [0.53, 0], [-3, 3.8]);
                        }

                        if (MjClient.MaxPlayerNum == 2)
                            _out0.x -= _out0.height * _out0.scale * 5;


                        if (MjClient.size.width / MjClient.size.height >= 1.5) {

                            setWgtLayout(_out1, [0.0, 0.0763], [0.53, 0], [-7, 4.85]);
                        } else {

                            setWgtLayout(_out1, [0.0, 0.07], [0.53, 0], [-3, 4.85]);
                        }
                        if (MjClient.MaxPlayerNum == 2)
                            _out1.x -= _out1.height * _out1.scale * 5;


                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            if(_out2) setWgtLayout(_out2, [0.0, 0.0763], [0.53, 0], [-7, 5.9]);
                        } else {
                            if(_out2) setWgtLayout(_out2, [0.0, 0.07], [0.53, 0], [-3, 5.9]);
                        }
                        if (MjClient.MaxPlayerNum == 2)
                            if(_out2) _out2.x -= _out2.height * _out2.scale * 5;
                        break;
                    case 1:
                        setWgtLayout(_up, [0, 0.05], [1, 0], [-3, 6]);

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0, 0.0545], [1, 0.5], [-4.6, -4.1]);
                        } else {
                            setWgtLayout(_out0, [0, 0.05], [1, 0.5], [-4.6, -5.1]);
                        }

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0, 0.0545], [1, 0.5], [-5.9, -4.1]);
                        } else {
                            setWgtLayout(_out1, [0, 0.05], [1, 0.5], [-5.9, -5.1]);
                        }

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            if(_out2) setWgtLayout(_out2, [0, 0.0545], [1, 0.5], [-7.2, -4.1]);
                        } else {
                            if(_out2) setWgtLayout(_out2, [0, 0.05], [1, 0.5], [-7.2, -5.1]);
                        }

                        break;
                    case 2:
                        setWgtLayout(_stand, [0, 0.07], [0.5 , 1], [-6, -1.0]);
                        setWgtLayout(_up, [0, 0.07], [0.5, 1],[6, -1.0]);

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0, 0.0763], [0.5, 1], [6.8, -2.5]);
                        } else {
                            setWgtLayout(_out0, [0, 0.07], [0.5, 1], [4.8, -2.5]);
                        }
                        if (MjClient.MaxPlayerNum == 2)
                            _out0.x += _out0.height * _out0.scale * 5.5;

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0, 0.0763], [0.5, 1], [6.8, -3.55]);
                        } else {
                            setWgtLayout(_out1, [0, 0.07], [0.5, 1], [4.8, -3.55]);
                        }
                        if (MjClient.MaxPlayerNum == 2)
                            _out1.x += _out1.height * _out1.scale * 5.5;

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            if(_out2) setWgtLayout(_out2, [0, 0.0763], [0.5, 1], [6.8, -4.6]);
                        } else {
                            if(_out2) setWgtLayout(_out2, [0, 0.07], [0.5, 1], [4.8, -4.6]);
                        }
                        if (MjClient.MaxPlayerNum == 2)
                            if(_out2) _out2.x += _out2.height * _out2.scale * 5.5;

                        break;
                    case 3:
                        setWgtLayout(_up, [0, 0.05], [0, 1], [3.0, -3.5]);

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0, 0.0545], [0, 0.5], [4.5, 4.8]);
                        } else {
                            setWgtLayout(_out0, [0, 0.05], [0, 0.5], [4.5, 4.8]);
                        }
                        if (MjClient.MaxPlayerNum == 3)
                            _out0.y += _out0.height * _out0.scale * 2;

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0, 0.0545], [0, 0.5], [5.7, 4.8]);
                        } else {
                            setWgtLayout(_out1, [0, 0.05], [0, 0.5], [5.7, 4.8]);
                        }
                        if (MjClient.MaxPlayerNum == 3)
                            _out1.y += _out1.height * _out1.scale * 2;

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            if(_out2) setWgtLayout(_out2, [0, 0.0545], [0, 0.5], [6.9, 4.8]);
                        } else {
                            if(_out2) setWgtLayout(_out2, [0, 0.05], [0, 0.5], [6.9, 4.8]);
                        }
                        if (MjClient.MaxPlayerNum == 3)
                            if(_out2) _out2.y += _out2.height * _out2.scale * 2;

                        break;
                    default:
                        break;
                }
            }
            else if(MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP  ||
                MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ ||
                MjClient.getAppType() === MjClient.APP_TYPE.QXLYQP  ||
                MjClient.getAppType() === MjClient.APP_TYPE.BDHYZP )
            {
                switch (off)
                {
                    case 0:
                        setWgtLayout(_up, [0.05, 0], [0, 0], [0.8, 0.7]);

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0.0, 0.0763], [0.53, 0], [-7, 3.7]);
                            if(MjClient.MaxPlayerNum === 2){
                                setWgtLayout(_out0, [0.0, 0.0763], [0.37, 0], [-7, 3.7]);
                            }
                        } else {
                            setWgtLayout(_out0, [0.0, 0.07], [0.53, 0], [-7, 3.7]);
                            if(MjClient.MaxPlayerNum === 2){
                                setWgtLayout(_out0, [0.0, 0.07], [0.37, 0], [-7, 3.7]);
                            }
                        }

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0.0, 0.0763], [0.53, 0], [-7, 4.7]);
                            if(MjClient.MaxPlayerNum === 2){
                                setWgtLayout(_out1, [0.0, 0.0763], [0.37, 0], [-7, 4.7]);
                            }
                        } else {
                            setWgtLayout(_out1, [0.0, 0.07], [0.53, 0], [-7, 4.7]);
                            if(MjClient.MaxPlayerNum === 2){
                                setWgtLayout(_out1, [0.0, 0.07], [0.37, 0], [-7, 4.7]);
                            }
                        }

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out2, [0.0, 0.0763], [0.53, 0], [-7, 5.7]);
                            if(MjClient.MaxPlayerNum === 2){
                                setWgtLayout(_out2, [0.0, 0.0763], [0.37, 0], [-7, 5.7]);
                            }
                        } else {
                            setWgtLayout(_out2, [0.0, 0.07], [0.53, 0], [-7, 5.7]);
                            if(MjClient.MaxPlayerNum === 2){
                                setWgtLayout(_out2, [0.0, 0.07], [0.37, 0], [-7, 5.7]);
                            }
                        }
                        break;
                    case 1:
                        setWgtLayout(_up, [0, 0.05], [1, 0], [-3, 6]);

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0, 0.0545],[1, 0.5],[-4.8, -4.1]);
                        } else {
                            setWgtLayout(_out0, [0, 0.05],[1, 0.5],[-4.8, -5.1]);
                        }

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0, 0.0545],[1, 0.5],[-6.0, -4.1]);
                        }else {
                            setWgtLayout(_out1, [0, 0.05],[1, 0.5],[-6.0, -5.1]);
                        }

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out2, [0, 0.0545], [1, 0.5], [-7.2, -4.1]);
                        } else {
                            setWgtLayout(_out2, [0, 0.05], [1, 0.5], [-7.2, -5.1]);
                        }
                        break;
                    case 2:
                        setWgtLayout(_stand, [0, 0.07], [0.5, 1], [-6, -1.0]);
                        setWgtLayout(_up, [0, 0.07], [0.5, 1],[6, -1.0]);

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0, 0.0763],[0.5, 1],[6.8, -2.5]);
                        } else {
                            setWgtLayout(_out0, [0, 0.07],[0.5, 1],[6.8, -2.5]);
                        }

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0, 0.0763],[0.5, 1],[6.8, -3.5]);
                        } else {
                            setWgtLayout(_out1, [0, 0.07],[0.5, 1],[6.8, -3.5]);
                        }

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out2, [0, 0.0763], [0.5, 1], [6.8, -4.5]);
                        } else {
                            setWgtLayout(_out2, [0, 0.07], [0.5, 1], [6.8, -4.5]);
                        }
                        if (MjClient.MaxPlayerNum === 2){
                            _out0.x += _out0.height * _out0.scale * 2.6;
                            _out1.x += _out1.height * _out1.scale * 2.6;
                            if(_out2) _out2.x += _out2.height * _out2.scale * 2.6;
                        }
                        break;
                    case 3:
                        setWgtLayout(_up, [0, 0.05], [0, 1], [3.0, -3.5]);

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out0, [0, 0.0545],[0, 0.5],[4.5, 4.8]);
                        } else {
                            setWgtLayout(_out0, [0, 0.05],[0, 0.5],[4.5, 4.8]);
                        }
                        if (MjClient.MaxPlayerNum === 3)
                            _out0.y += _out0.height * _out0.scale * 2;

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out1, [0, 0.0545],[0, 0.5],[5.6, 4.8]);
                        }
                        else {
                            setWgtLayout(_out1, [0, 0.05],[0, 0.5],[5.6, 4.8]);
                        }
                        if (MjClient.MaxPlayerNum === 3)
                            _out1.y += _out1.height * _out1.scale * 2;

                        if (MjClient.size.width / MjClient.size.height >= 1.5) {
                            setWgtLayout(_out2, [0, 0.0545], [0, 0.5], [6.7, 4.8]);
                        } else {
                            setWgtLayout(_out2, [0, 0.05], [0, 0.5], [6.7, 4.8]);
                        }
                        if (MjClient.MaxPlayerNum === 3)
                            _out2.y += _out2.height * _out2.scale * 2;
                        break;
                    default:
                        break;
                }
            }

        }
    }

    // 山西，岳阳刷新手牌大小
    COMMON_UI.mjhandSizeSet();
};


/*
     3D模式设置百塔牌
 */
COMMON_UI3D.setBaiDa3D = function(cardNodeBG)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var hideBaiDaList = [MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG,MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG,MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG,
        MjClient.GAME_TYPE.CHEN_ZHOU]; //有癞子但不需要显示的

    var HuncardMsg = getFinalHunCardMsg();
    if(!HuncardMsg){
        HuncardMsg = tData.showCard ? tData.showCard : tData.hunCard;
    }
    if(!HuncardMsg || HuncardMsg == -1 || hideBaiDaList.indexOf(MjClient.gameType) != -1)
    {
        cardNodeBG.visible = false;
    }
    else
    {
        cardNodeBG.visible = true;
        setBaiDaCard3D();
    }

    //没开始没有癞子
    if(tData.tState != TableState.waitPut &&
        tData.tState != TableState.waitEat &&
        tData.tState != TableState.waitCard)
    {
        cardNodeBG.visible = false;
    }


    function setBaiDaCard3D()
    { 
        var HuncardMsg = getFinalHunCardMsg(); 
        if(!HuncardMsg){
            HuncardMsg = tData.showCard ? tData.showCard : tData.hunCard;
        } 
        var siwang_hunCard = false; // 安化四王需要标签
        
        if(MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW || 
            MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG){
            var hunNmae = ["showCard","hunCard"]; 
            HuncardMsg = MjClient.data.sData.tData[ hunNmae[ cardNodeBG.tag ] ];  
            siwang_hunCard = MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW;
            if(hunNmae[ cardNodeBG.tag ] == "hunCard" && typeof(HuncardMsg) == "object" ){ 
                HuncardMsg = HuncardMsg[1];
            }  
        }

        if(HuncardMsg && HuncardMsg !== -1 && hideBaiDaList.indexOf(MjClient.gameType) === -1)
        {
            var cardNode = cardNodeBG.getChildByName("Image_2");
            cardNode.visible = true;
            setCardSprite(cardNode, parseInt(HuncardMsg), 4, siwang_hunCard);
            if(!cardNode.isSetted)
            {
                var imgMing = new ccui.ImageView();
                imgMing.loadTexture("playing/MJ/ming.png");
                imgMing.setPosition(cardNode.getContentSize().width/2, cardNode.getContentSize().height/2);
                cardNode.addChild(imgMing,100);
            }
        }

        var HuncardMsg2 = MjClient.data.sData.tData.hunCard2;
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
            MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU)
        {
            HuncardMsg2=MjClient.data.sData.tData.hunCard;
        }
        if( HuncardMsg2 && HuncardMsg2 != -1)
        {
            var cardWith =  cardNodeBG.getSize().width * cardNodeBG.getScale();
            var _hunCard2 = cardNodeBG.getParent().getChildByName("hunCard2");
            if(!_hunCard2)
            {
                _hunCard2 = cardNodeBG.clone();
                _hunCard2.setName("hunCard2");
                cardNodeBG.getParent().addChild(_hunCard2);

                var imgMing = new ccui.ImageView();
                imgMing.loadTexture("playing/MJ/ming.png");
                imgMing.setPosition(_hunCard2.getContentSize().width/2,_hunCard2.getContentSize().height/2);
                _hunCard2.getChildByName("Image_2").addChild(imgMing,100);
            }
            _hunCard2.visible = true;


            var cardNode = cardNodeBG.getChildByName("Image_2");
            if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
                MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU)
            {
                cardNodeBG.scale=1.2;
                _hunCard2.scale=1.2;
                var text = new ccui.Text();
                text.setFontName("fonts/lanting.ttf");
                text.setFontSize(22);
                text.setTextColor(cc.color(92,205,86,255));
                text.setAnchorPoint(0.5, 0.5);
                text.scale=0.8;
                text.setPosition(13,-45);
                cardNodeBG.getParent().addChild(text);
                text.schedule(function(){
                    var str = "朝\n天\n牌\n";
                    text.setString(str);
                });
                cardNodeBG.setPosition(cc.p(50.4, -30));
                _hunCard2.setPosition(95,-30);
            }else{
                _hunCard2.setPosition(cardNode.getPositionX()+ cardWith*1.1 ,_hunCard2.getPositionY());
            }

            setCardSprite(_hunCard2.getChildByName("Image_2"), parseInt(HuncardMsg2), 4);

        }
    }
    function setBaiDaCardAni3D()
    {

        var cardNode = cardNodeBG.getChildByName("Image_2");
        var finalPos = cc.p(17.4, 23.4);
        var winsizePos = cc.p(cc.winSize.width/2, cc.winSize.height*4/5);
        var startPos = cardNodeBG.convertToNodeSpace(winsizePos);
        cardNode.setPosition(startPos);
        cardNode.scale = 0.6;

        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
            MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN ||
            MjClient.gameType == MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG ||
        MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ)
        {
            var _hunCard2=setHunCard();
            cardNode.runAction(cc.sequence(cc.delayTime(1),
                cc.spawn(cc.scaleTo(0.6, 0.28), cc.moveTo(0.6, finalPos)).easing(cc.easeQuinticActionOut()),cc.callFunc(function(){
                    _hunCard2.visible=true;
            })));
        }else{
            cardNode.runAction(cc.sequence(cc.delayTime(1),
                cc.spawn(cc.scaleTo(0.6, 0.28), cc.moveTo(0.6, finalPos)).easing(cc.easeQuinticActionOut())));
        }

    }
    function setHunCard()
    {
        var _hunCard2 = cardNodeBG.getParent().getChildByName("hunCard2");
        if (!_hunCard2) {
            _hunCard2 = cardNodeBG.clone();
            _hunCard2.setName("hunCard2");
            cardNodeBG.getParent().addChild(_hunCard2);

            var imgMing = new ccui.ImageView();
            imgMing.loadTexture("playing/MJ/ming.png");
            imgMing.setPosition(_hunCard2.getContentSize().width / 2, _hunCard2.getContentSize().height / 2);
            _hunCard2.getChildByName("Image_2").addChild(imgMing, 100);
        }
        _hunCard2.visible = false;
       return _hunCard2;

    }


    UIEventBind(null, cardNodeBG, "mjhand", function (eD) {
        var HuncardMsg = getFinalHunCardMsg();
        if(!HuncardMsg){
            HuncardMsg = tData.showCard ? tData.showCard : tData.hunCard;
        }
        if(HuncardMsg && HuncardMsg != -1 && hideBaiDaList.indexOf(MjClient.gameType) === -1)
        {
            this.visible = true;
            setBaiDaCard3D();
            if(MjClient.gameType === MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
                MjClient.gameType === MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU ||
                MjClient.gameType === MjClient.GAME_TYPE.XU_ZHOU ||
                MjClient.gameType === MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN ||
                MjClient.gameType == MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG ||
                MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ)              //3D癞子牌开场动画
            {
                cc.log("lijm++++++++++++>>>>>>>>>>",HuncardMsg);
                setBaiDaCardAni3D();
            }
        }
        else
        {
            this.visible = false;
        }
    });

    UIEventBind(null, cardNodeBG, "initSceneData", function (eD) {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        if(tData.tState != TableState.waitPut &&
            tData.tState != TableState.waitEat &&
            tData.tState != TableState.waitCard
        )
        {
            this.visible = false;
        }else{
            var HuncardMsg = getFinalHunCardMsg();
            if(!HuncardMsg){
                HuncardMsg = tData.showCard ? tData.showCard : tData.hunCard;
            }
            if(HuncardMsg && HuncardMsg != -1 && hideBaiDaList.indexOf(MjClient.gameType) == -1)
            {
                this.visible = true;
                setBaiDaCard3D();
            }
            else
            {
                this.visible = false;
            }
        }
    });

    UIEventBind(null, cardNodeBG, "clearCardUI", function (eD) {
        this.visible = false;
        var _huncard2 = cardNodeBG.getParent().getChildByName("hunCard2");
        if(_huncard2) _huncard2.visible = false;
    });
};


/*
    2D,3D之间的切换
*/
COMMON_UI3D.switch2DTo3D = function()
{
    if(!MjClient.playui) return;
    //如果点击了听按钮，清除点击状态
    MjClient.clickTing = false;

    //清除当前打出去牌的上面的箭头
    COMMON_UI3D.cleanOutCardArrow();

    CommonPool.drainAllPools();

    //东南西北指示器重置
    COMMON_UI3D.resSetArrowbk();

    //重置吃碰杠打出去的牌UI
    for(var off = 0;off < 4; off++)
    {
        //清除数据
        var node = getNode(off);
        clearCardUI(node, off);
        var pl = getUIPlayer(off);

        //重置layout位置
        COMMON_UI3D.resetCardLayout(off);

        //再次加载
        COMMON_UI3D.reInitUserHandUI(off);
    }


    //房间信息：玩法名称，房间号，时间，电池，信号
    if (isYongZhouProject()) {
        COMMON_UI3D.addPlayingInfo();
    }else{
        COMMON_UI.addPlayingInfo();
    }

    // 添加吃碰杠光晕动画
    COMMON_UI.addAniEatCardsBtn();

    //剩余张数局数
    if(!isYongZhouProject()){
        COMMON_UI.addLeftCardAndRound();
    }

    //重置头像的位置选座状态，还没开始游戏，不让切换头像位置
    var tData = MjClient.data.sData.tData;
    if(!(tData.tState !== TableState.waitPut &&
        tData.tState !== TableState.waitEat &&
        tData.tState !== TableState.waitCard)) {
        InitHeadPostionPlaying();
    }

    /* 重置起手听牌 */
    COMMON_UI3D.resetTingCardShow();

};


/* 重置起手听牌 */
COMMON_UI3D.resetTingCardShow = function(){

    hideCurrentTingNum();
    if(MjClient.playui.EatVisibleCheck) MjClient.playui.EatVisibleCheck();
    if (MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_MJ)
    {
        MjClient.playui.EatBaoTingVisibleCheck();
    }

    var pl = getUIPlayer(0);
    var factor0 = IsTurnToMe();
    var factor1 = !pl || (pl.mjhand && pl.mjhand.length === 0) || pl.mjput.length > 0;
    var factor2 = pl.mjpeng.length > 0 || pl.mjchi.length > 0;
    var factor3 = pl.mjgang0.length > 0 || pl.mjgang1.length > 0;
    var factor4 = pl.mjState === TableState.waitEat;
    if  (factor0 || factor1 || factor2 || factor3 || factor4) return;
    var tingCardSet = COMMON_UI.getTingSet();
    if(MjClient.playui.setCurrentTingNum)
        MjClient.playui.setCurrentTingNum(tingCardSet);
    else
        setCurrentTingNum(tingCardSet);
};


//清除当前打出去牌的上面的箭头
COMMON_UI3D.cleanOutCardArrow = function(){
    var showSprite = MjClient.playui.jsBind.eat._node.getChildByName("cardShow");
    if (showSprite) showSprite.removeFromParent(true);
};



/*
    重新加载牌桌UI
 */
COMMON_UI3D.reInitUserHandUI = function(off)
{
    var node = getNode(off);

    switch (MjClient.gameType)
    {
        case MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU:
            InitUserHandUI_tuidaohu(node, off);
            break;
        case MjClient.GAME_TYPE.JIN_ZHONG_KD:
            InitUserHandUI_koudian(node, off);
            break;
        case MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI:
            InitUserHandUI_linfenkoudianfengzuizi(node, off);
            break;
        case MjClient.GAME_TYPE.JIN_ZHONG_MJ:
            if(MjClient.playui.InitUserHandUI)
                MjClient.playui.InitUserHandUI(node, off);
            else
                InitUserHandUI_jinzhong(node, off);
            break;
        case MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN:
            InitUserHandUI_jinzhongcaishen(node, off);
            break;
        case MjClient.GAME_TYPE.LING_SHI_BIAN_LONG:
            InitUserHandUI_lingshibianlong(node, off);
            break;
        case MjClient.GAME_TYPE.LING_SHI_BAN_MO:
            InitUserHandUI_lingshibanmo(node, off);
            break;
        case MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3:
            InitUserHandUI_jiexiuyidiansan(node, off);
            break;
        case MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN:
            InitUserHandUI_jiexiukoudian(node, off);
            break;
        case MjClient.GAME_TYPE.JIN_ZHONG_LI_SI:
            InitUserHandUI_jinzhonglisi(node, off);
            break;
        case MjClient.GAME_TYPE.PING_YAO_MA_JIANG:
            InitUserHandUI_pingyaomajiang(node, off);
            break;
        case MjClient.GAME_TYPE.PING_YAO_KOU_DIAN:
            InitUserHandUI_pingyaokoudian(node, off);
            break;
        case MjClient.GAME_TYPE.SHOU_YANG_QUE_KA:
            InitUserHandUI_shouyangqueka(node, off);
            break;
        case MjClient.GAME_TYPE.LV_LIANG_MA_JIANG:
            InitUserHandUI_lvliangmajiang(node, off);
            break;
        case MjClient.GAME_TYPE.ZHUO_HAO_ZI:
            InitUserHandUI_zhuohaozi(node, off);
            break;
        case MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN:
            InitUserHandUI_xiaoyikoudian(node, off);
            break;
        case MjClient.GAME_TYPE.FEN_YANG_QUE_MEN:
            InitUserHandUI_fenyangquemen(node, off);
            break;
        case MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI:
            InitUserHandUI_linfenyingsanzui(node, off);
            break;
        case MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI:
            InitUserHandUI_linfenyimenzi(node, off);
            break;
        case MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN:
            InitUserHandUI_xiangningshuaijin(node, off);
            break;
        case MjClient.GAME_TYPE.DA_NING_SHUAI_JIN:
            InitUserHandUI_daningshuaijin(node, off);
            MjClient.playui.setOuCard(off); //改变呕牌的状态
            break;
        case MjClient.GAME_TYPE.WU_TAI_KOU_DIAN:
            InitUserHandUI_wutaikoudian(node, off);
            break;
        case MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG:
            InitUserHandUI_daixian(node, off);
            break;
        case MjClient.GAME_TYPE.FAN_SHI_XIA_YU:
            InitUserHandUI_daixian(node, off);
            break;
        case MjClient.GAME_TYPE.FEN_XI_YING_KOU:
            InitUserHandUI_fenxiyingkou(node, off);
            break;
        case MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG:
            InitUserHandUI_linfenjixian(node, off);
            break;
        case MjClient.GAME_TYPE.HONG_TONG_WANG_PAI:
            InitUserHandUI_hongtongwangpai(node, off);
            break;
        case MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO:
            InitUserHandUI_guaisanjiao(node, off);
            break;
        case MjClient.GAME_TYPE.JING_LE_KOU_DIAN:
            InitUserHandUI_jingle(node, off);
            break;
        case MjClient.GAME_TYPE.LUAN_GUA_FENG:
            InitUserHandUI_luanguafeng(node, off);
            break;
        case MjClient.GAME_TYPE.DA_TONG_GUAI_SAN_JIAO:
            InitUserHandUI_datongguaisanjiao(node, off);
            break;
        case MjClient.GAME_TYPE.ML_HONGZHONG:
            InitUserHandUI_MLHZ(node, off);
            break;
        case MjClient.GAME_TYPE.ML_HONGZHONG_ZERO:
            InitUserHandUI_MLHZ_AI(node, off);
            break;
        case MjClient.GAME_TYPE.CHEN_ZHOU:
            InitUserHandUI_chenzhou(node, off);
            break;
        case MjClient.GAME_TYPE.NING_XIANG_MJ:
            InitUserHandUI_ningxiang(node, off);
            break;
        case MjClient.GAME_TYPE.YUAN_JIANG_MJ:
            InitUserHandUI_yuanjiang(node, off);
            break;
        case MjClient.GAME_TYPE.NAN_XIAN_MJ:
            InitUserHandUI_nanxian(node, off);
            break;
        case MjClient.GAME_TYPE.CHANG_SHA:
            InitUserHandUI_changSha(node, off);
            break;
        case MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU:
            InitUserHandUI_xiangyintuidaohu(node, off);
            break;
        case MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO:
            InitUserHandUI_pingjiangzhaniao(node, off);
            break;
        case MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG:
            InitUserHandUI_yueyanghongzhong(node, off);
            break;
        case MjClient.GAME_TYPE.TY_ZHUANZHUAN:
            InitUserHandUI_TYZZ(node, off);
            break;
        case MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI:
            InitUserHandUI_zhuoxiazi(node, off);
            break;
        case MjClient.GAME_TYPE.CHAO_GU_MJ:
            InitUserHandUI_chaogu(node, off);
            break;
        case MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG:
            InitUserHandUI_taoJiang(node, off);
            break;
        case MjClient.GAME_TYPE.AN_HUA_MA_JIANG:
            InitUserHandUI_anhuaMaJiang(node, off);
            break;
        case MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW:
            InitUserHandUI_anhuaMaJiangSW(node, off);
            break;
        case MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU:
            InitUserHandUI_yiJiaoLaiYou(node, off);
            break;
        case MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU:
            InitUserHandUI_yiJiaoLaiYouHuBei(node, off);
            break;
        case MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ:
            InitUserHandUI_yiJiaoLaiYouHuBei(node, off);
            break;
        case MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING:
            InitUserHandUI_xiaoGanKaWuXing(node, off);
            break;
        case MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING:
            InitUserHandUI_suiZhouKaWuXing(node, off);
            break;
        case MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN:
            InitUserHandUI_yiJiaoLaiYouHuBei(node, off);
            break;
        case MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG:
            InitUserHandUI_yiJiaoLaiYouHuBei(node, off);
            break;
        case MjClient.GAME_TYPE.YI_YANG_MA_JIANG:
            InitUserHandUI_yiYang(node, off);
            break;
        case MjClient.GAME_TYPE.LIAN_YUN_GANG:
            InitUserHandUI_LYG(node, off);
            break;
        case MjClient.GAME_TYPE.GUAN_NAN:
            InitUserHandUI_guannan(node, off);
            break;
        case MjClient.GAME_TYPE.GUAN_YUN:
            InitUserHandUI_guanyun(node, off);
            break;
        case MjClient.GAME_TYPE.XIANG_SHUI_MJ:
            InitUserHandUI_xiangshui(node, off);
            break;
        case MjClient.GAME_TYPE.SI_YANG:
            InitUserHandUI_siyang(node, off);
            break;
        case MjClient.GAME_TYPE.XIN_SI_YANG:
            InitUserHandUI_siyang_New(node, off);
            break;
        case MjClient.GAME_TYPE.SI_YANG_HH:
            InitUserHandUI_siyanghh(node, off);
            break;
        case MjClient.GAME_TYPE.GAN_YU:
            InitUserHandUI_ganyu(node, off);
            break;
        case MjClient.GAME_TYPE.SU_QIAN:
            InitUserHandUI_suqian(node, off);
            break;
        case MjClient.GAME_TYPE.DONG_HAI:
            InitUserHandUI_donghai(node, off);
            break;
        case MjClient.GAME_TYPE.XIN_PU_HZ:
            InitUserHandUI_HZMJ(node, off);
            break;
        case MjClient.GAME_TYPE.SHU_YANG:
            InitUserHandUI_shuyang(node, off);
            break;
        case MjClient.GAME_TYPE.HUAI_AN:
            InitUserHandUI_huaian(node, off);
            break;
        case MjClient.GAME_TYPE.HUAI_AN_CC:
            InitUserHandUI_huaianCC(node, off);
            break;
        case MjClient.GAME_TYPE.HUAI_AN_TTZ:
            InitUserHandUI_huaianTTZ(node, off);
            break;
        case MjClient.GAME_TYPE.HUAI_AN_ERZ:
            InitUserHandUI_huaianERZ(node, off);
            break;
        case MjClient.GAME_TYPE.HA_HONGZHONG:
            InitUserHandUI_HAHZ(node, off);
            break;
        case MjClient.GAME_TYPE.HZ_TUI_DAO_HU:
            InitUserHandUI_HZTDH(node, off);
            break;
        case MjClient.GAME_TYPE.LIAN_SHUI:
            InitUserHandUI_Lianshui(node, off);
            break;
        case MjClient.GAME_TYPE.XU_ZHOU:
            InitUserHandUI_xuzhou(node, off);
            break;
        case MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN:
            InitUserHandUI_xuzhoupeixian(node, off);
            break;
        case MjClient.GAME_TYPE.HAI_AN_MJ:
            InitUserHandUI_haian(node, off);
            break;
        case MjClient.GAME_TYPE.HAI_AN_BAI_DA:
            InitUserHandUI_haianbaida(node, off);
            break;
        case MjClient.GAME_TYPE.XUE_LIU:
            InitUserHandUI_xueliu(node, off);
            break;
        case MjClient.GAME_TYPE.XUE_ZHAN:
            InitUserHandUI_xuezhanMJ(node, off);
            break;
        case MjClient.GAME_TYPE.NAN_JING:
            InitUserHandUI_nanjing(node, off);
            break;
        case MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN:
            InitUserHandUI_yunchengtiejin(node, off);
            break;
        case MjClient.GAME_TYPE.HE_JIN_KUN_JIN:
            InitUserHandUI_hejinkunjin(node, off);
            break;
        case MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI:
            InitUserHandUI_yunchengfenghaozi(node, off);
            break;
        case MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI:
            InitUserHandUI_jiShanNiuYeZi(node, off);
            break;
        case MjClient.GAME_TYPE.DAO_ZHOU_MJ:
            InitUserHandUI_DaozhouMJ(node, off);
            break;
        case MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG:
            InitUserHandUI_WangDiaoMJ(node, off);
            break;
        case MjClient.GAME_TYPE.JIANG_HUA_MJ:
            InitUserHandUI_JiangHuaMJ(node, off);
            break;
        case MjClient.GAME_TYPE.YONG_ZHOU_MJ:
            InitUserHandUI_YongZhouGMJ(node, off);
            break;
        case MjClient.GAME_TYPE.TY_HONGZHONG:
            InitUserHandUI_TYHZ(node, off);
            break;
        case MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA:
            InitUserHandUI_hengyangChangSha(node, off);
            break;
        case MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG:
            InitUserHandUI_XXHZ(node, off);
            break;
        case MjClient.GAME_TYPE.LEI_YANG_GMJ:
            InitUserHandUI_leiyangGMJ(node, off);
            break;
        case MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG:
            InitUserHandUI_SYMJ(node, off);
            break;
        case MjClient.GAME_TYPE.XIN_NING_MA_JIANG:
            InitUserHandUI_SYMJ(node, off);
            break;
        case MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG:
            InitUserHandUI_SYMJ(node, off);
            break;
        default:
            MjClient.showToast("InitUserHandUI 没有加载,请找李晓钟");
            break;
    }
}


/**
 * 3D麻将打出一张牌 by sking  2018.9.19
 * @param cdui 打出这张牌的UI节点
 * @param cd   打出这张牌的信息
 * @constructor
 */
COMMON_UI3D.PutOutCard3D = function(cdui, cd)
{

    cc.log("出牌---------");
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
        var putnum = pl.mjput.length;
        var putCardNum = pl.mjput.length;
        var tingIndex = pl.tingIndex;//沭阳麻将需要
        if(cc.isUndefined(tingIndex) || !pl.isTing)
        {
            tingIndex = -1;//为了不报错;
        }

        var out0 = cdui.parent.getChildByName("out0");
        var out1 = cdui.parent.getChildByName("out1");
        var out2 = cdui.parent.getChildByName("out2");
        var out3 = cdui.parent.getChildByName("out3");

        var cardCount = [8,10,10,10]; //打出去的牌对应的每一列对应的牌的张数
        var _picIdxArray = [1,2,3,4,5,6,7,8,9,10];

        //平行四边形拉伸度
        var skewValue = [
            5,4,3, 2,1,
            -1,-2,-3, -4,-5
        ];
        //x 位置偏移度
        var posValue =  [
            0.52,0.53,0.53,0.52,0.55,
            0.55,0.55,0.55,0.55,0.52
        ];

        var _picIdxArray = [1,2,3,4,5,6,7,8,9,10];

        if (MjClient.MaxPlayerNum == 2)
        {
            _picIdxArray = [11,12,13,1,2,3,4,5,6,7,8,9,10,14,15,16];

            cardCount = [12,14,16,16]; //打出去的牌对应的每一列对应的牌的张数

            posValue =  [
                0.52,0.52,0.52,0.52,0.52,0.52,0.52,0.53,
                0.55,0.56,0.57,0.58,0.59,0.6,0.6,0.6
            ];

            skewValue = [
                8,7,6,5,4,3, 2,1,
                -1,-2,-3, -4,-5,-6,-7,-8
            ];
        }
        var out;

        if (putnum >= (cardCount[0] + cardCount[1] + cardCount[2]) && out3)
        {
            out = out3.clone();
        }else if (putCardNum >= (cardCount[0] + cardCount[1]) && out2)
        {
            out = out2.clone();
        }
        else if(putCardNum >= cardCount[0])
        {
            out = out1.clone();
        }
        else
        {
            out = out0.clone();
        }
        out.setScale(out.getScale()*1.3);
        var oSize = out.getSize();
        var oSc = out.getScale();


        var ws = cc.director.getWinSize();
        var endPoint = cc.p(0, 0);
        var Midpoint = cc.p(0, 0);
        if (putCardNum > (cardCount[0] + cardCount[1] + cardCount[2]) - 1 && out3)
        {
            out.x = out3.x;
            out.y = out3.y;
            putnum -= (cardCount[0] + cardCount[1] + cardCount[2]);
        }
        else if (putCardNum > (cardCount[0] + cardCount[1]) - 1 && out2)
        {
            out.x = out2.x;
            out.y = out2.y;
            putnum -= (cardCount[0] + cardCount[1]);
        }
        else if (putCardNum > cardCount[0] - 1)
        {
            out.x = out1.x;
            out.y = out1.y;
            putnum -= cardCount[0];
        }


        // //麻将间距离
        var dd = 0;
        var outDisDown = oSize.width * oSc * putnum*(0.95 + dd);

        endPoint.y = out.y;
        endPoint.x = out.x + outDisDown;
        Midpoint.x = ws.width / 2;
        Midpoint.y = ws.height * 0.3;



        var skewXValueIdx,posValueIdx;
        if(putCardNum < cardCount[0])//第一列摆8张牌
        {
            skewXValueIdx =  skewValue[putCardNum + 1];
            posValueIdx   = posValue[putCardNum + 1];
            cdui.loadTexture("playing/MJ3D/downCard/out2-" +  _picIdxArray[putCardNum + 2] + ".png");

            if(putCardNum > _picIdxArray.length/2)
            {
                cdui.setLocalZOrder( _picIdxArray.length - putCardNum);
            }
            out.zIndex -= 10;
        }
        else if(putCardNum < cardCount[0] + cardCount[1])
        {
            var idx = putCardNum - cardCount[0];
            skewXValueIdx =  skewValue[idx];
            posValueIdx   = posValue[idx];
            cdui.loadTexture("playing/MJ3D/downCard/out2-" + _picIdxArray[idx] + ".png");
            if(idx > _picIdxArray.length/2)
            {
                cdui.setLocalZOrder( cardCount[0] + cardCount[1] - idx);
            }

        }
        else if(putCardNum < cardCount[0] + cardCount[1] + cardCount[2])
        {
            var idx = putCardNum - cardCount[0] - cardCount[1];
            cdui.loadTexture("playing/MJ3D/downCard/out2-" + _picIdxArray[idx] + ".png");
            skewXValueIdx =  skewValue[idx];
            posValueIdx   = posValue[idx];

            if(idx > _picIdxArray.length/2)
            {
                cdui.setLocalZOrder( 10 + cardCount[0] + cardCount[1] + cardCount[2] - idx);
            }

        }
        else
        {
            var idx = putCardNum- cardCount[0] - cardCount[1] - cardCount[2];
            cdui.loadTexture("playing/MJ3D/downCard/out2-" + _picIdxArray[idx] + ".png");
            skewXValueIdx =  skewValue[idx];
            posValueIdx   = posValue[idx];
            if(idx > _picIdxArray.length/2)
            {
                cdui.setLocalZOrder( 10 + cardCount[0] + cardCount[1] + cardCount[2] + + cardCount[3]- idx);
            }
        }

        //百搭命名的种类
        var baidaNameArray = ["haozi","lizi","imgBaiDa","wangzi","jinzi"];

        cdui.ignoreContentAdaptWithSize(true);
        var childs = cdui.children;
        for(var k = 0; k < childs.length; k++)
        {
            if (childs[k].ignoreContentAdaptWithSize) childs[k].ignoreContentAdaptWithSize(true);
            childs[k].setScale(0.45);
            childs[k].setSkewX(skewXValueIdx);

            if(MjClient.gameType != MjClient.GAME_TYPE.XU_ZHOU &&  baidaNameArray.indexOf(childs[k].getName()) >= 0)
            {
                childs[k].setPosition(cdui.getContentSize().width*0.6, 51);
            }
            else
            {
                childs[k].setPosition(cdui.getContentSize().width*0.9*posValueIdx,45);
            }

        }
        out.setScale(out.getScale()*2.2);
        oSc = out.getScale();

        cdui.addTouchEventListener(function () {});

        //飞行动画
        // cdui.moving = true;
        // cdui.runAction(cc.sequence(cc.spawn(cc.moveTo(0.2, endPoint), cc.scaleTo(0.2, oSc)), cc.callFunc(function(){
        //     clearCurrentPutTag();
        //     addCurrentPutTag(cdui, 0);
        //     var _showSprite = MjClient.playui.jsBind.eat._node.getChildByName("cardShow");
        //     if (_showSprite) _showSprite.setScale(oSc*0.5);
        //     cdui.moving = false;
        // })));
        //无飞行动画
        cdui.setPosition(endPoint);
        cdui.setScale(oSc);
        clearCurrentPutTag();
        addCurrentPutTag(cdui, 0);
        var _showSprite = MjClient.playui.jsBind.eat._node.getChildByName("cardShow");
        if (_showSprite) _showSprite.setScale(oSc*0.5);


        //自己出牌时前端先行
        COMMON_UI.BeforehandSelfPutOutCard(cd);

        showMJOutBig(cdui.parent, cd, 0);

        //标记着这张打出去的牌，在服务器回调 DealMjput  by sking  2018.9.25
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


    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
        isJinZhongAPPType() ||
        MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )    //晋中的打出牌后提前对手牌排序 前端先行 add by sking 2018.9.6
    {
        if(MjClient.rePlayVideo == -1)
        {   
            if(!MjClient.clickTing && COMMON_UI.isChaPai)
            {
                COMMON_UI.afterMjputAnimation();
            }
            else
            {
                MjClient.playui.CardLayoutRestore(getNode(0), 0);
                cc.log("===============DealMJPut_3D===============000000000000000000000000000");
            }
        }
    }
}

/**
 * 山西APP的3D DealMJput by sking  2018.9.19
 * @param node
 * @param msg
 * @param off
 * @param outNum
 */
COMMON_UI3D.DealMJPut_shanXiApp3D = function(node, msg, off, outNum)
{

    //cardPutted = false;
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = getPlayerIndex(off);
    if(uids[selfIndex] == msg.uid)
    {
        var pl = sData.players[msg.uid];
        var putnum = outNum >= 0 ? outNum : (pl.mjput.length - 1);
        var putCardNum =  putnum;
        var tingPutNum = putnum;
        var tingIndex = pl.tingIndex;//沭阳麻将需要


        if(cc.isUndefined(tingIndex) || !pl.isTing)
        {
            tingIndex = -1;//为了不报错;
        }


        var out0 = node.getChildByName("out0");
        var out1 = node.getChildByName("out1");
        var out2 = node.getChildByName("out2");
        var out3 = node.getChildByName("out3");

        var out0_self = getNode(0).getChildByName("out0");
        var out1_self = getNode(0).getChildByName("out1");
        var out2_self = getNode(0).getChildByName("out2");
        var out3_self = getNode(0).getChildByName("out3");

        var cardCount = [8,10,10,10]; //打出去的牌对应的每一列对应的牌的张数

        if (MjClient.MaxPlayerNum == 2)
        {
            cardCount = [12,14,16,16];
        }


        var out;
        var out_self;
        if (putnum >= (cardCount[0] + cardCount[1] + cardCount[2]) && out3)
        {
            out = out3.clone();
            out_self = out3_self.clone();
        }
        else if (putnum >= (cardCount[0] + cardCount[1]) && out2)
        {
            out = out2.clone();
            out_self = out2_self.clone();
        }
        else if(putnum >= cardCount[0])
        {
            out = out1.clone();
            out_self = out1_self.clone();
        }
        else
        {
            out = out0.clone();
            out_self = out0_self.clone();
        }
        out.setScale(out.getScale()*1.3);

        out_self.setScale(out_self.getScale()*1.3);




        var oSize = out.getSize();
        var oSc = out.scale;

        if (off == 0 && putnum >= (cardCount[0] + cardCount[1] + cardCount[2]) && out3)
        {
            node.addChild(out,putnum + 30);
        }
        else if (off == 0 && putnum >= (cardCount[0] + cardCount[1]) && out2)
        {
            node.addChild(out,putnum + 30);
        }
        else if (off == 0 && putnum >= cardCount[0] )
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
            node.addChild(out, 20 - putnum);
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
        out.istingcard = false;

        var myOff = off;
        if(myOff == 2) myOff = 0;


        setCardSprite(out, msg.card, myOff);
        //out.setColor(cc.color(0,111,111));
        if (MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN ||
            MjClient.gameType == MjClient.GAME_TYPE.HE_JIN_KUN_JIN)
        {
            if (out.tag == tData.hunCard || out.tag == tData.hunCard2)
            {
                out.setColor(cc.color(190,190,190));
            }
        }


        //if (MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_MJ)
        {
            var idx = pl.putCardAfterTing;
            if (idx >= 0 && idx == tingPutNum)
            {
                out.istingcard = true;
                if (MjClient.rePlayVideo == -1)
                {
                    if(off == 0)
                    {
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
                            if(MjClient.data.sData.tData.areaSelectMode["anting"])
                            {
                                out.removeAllChildren();
                                if(off == 2)
                                {
                                    out.afterTingCard = true;
                                }
                                else
                                {
                                    var _UINode = getNode(off);
                                    var cpnode = _UINode.getChildByName("down");
                                    out.loadTexture(cpnode.getRenderFile().file);
                                }
                                unschedulePlayMoveCardOtherSameCardGrey(out);
                            }
                            else {
                                out.setColor(cc.color(240, 230, 140));
                            }
                        }
                        else if(MjClient.gameType === MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI)
                        {
                            if(!MjClient.data.sData.tData.areaSelectMode["tingPaiBuKou"]) {
                                out.removeAllChildren();
                                if(off == 2)
                                {
                                    out.afterTingCard = true;
                                }
                                else
                                {
                                    var _UINode = getNode(off);
                                    var cpnode = _UINode.getChildByName("down");
                                    out.loadTexture(cpnode.getRenderFile().file);
                                }
                                unschedulePlayMoveCardOtherSameCardGrey(out);
                            }else{
                                out.setColor(cc.color(240, 230, 140));
                            }
                        }
                        else{
                            out.removeAllChildren();
                            if(off == 2)
                            {
                                out.afterTingCard = true;
                            }
                            else
                            {
                                var _UINode = getNode(off);
                                var cpnode = _UINode.getChildByName("down");
                                out.loadTexture(cpnode.getRenderFile().file);
                            }
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

        var endPoint = cc.p(0, 0);
        var Midpoint = cc.p(0, 0);
        var ws = cc.director.getWinSize();

        if (putnum > (cardCount[0] + cardCount[1] + cardCount[2]) - 1 && out3)
        {
            out.x = out3.x;
            out.y = out3.y;
            putnum -= (cardCount[0] + cardCount[1] + cardCount[2]);
            tingIndex -= (cardCount[0] + cardCount[1] + cardCount[2]);
        }
        else if (putnum > (cardCount[0] + cardCount[1]) - 1 && out2)
        {
            out.x = out2.x;
            out.y = out2.y;
            putnum -= (cardCount[0] + cardCount[1]);
            tingIndex -= (cardCount[0] + cardCount[1]);
        }
        else if (putnum > cardCount[0] - 1)
        {
            out.x = out1.x;
            out.y = out1.y;
            putnum -= cardCount[0];
            tingIndex -= cardCount[0];
        }


        // //麻将间距离
        var dd = 0;
        // if(putnum >= cardCount[0])
        // {
        //     dd = 0.09
        // }
        // else if(putnum >= (cardCount[0] + cardCount[1]))
        // {
        //     dd = 0.02
        // }
        var outDisDown = oSize.width * oSc * putnum*(0.95 + dd);


        if(off == 0)
        {
            endPoint.y = out.y;
            endPoint.x = out.x + outDisDown;
            Midpoint.x = ws.width / 2;
            Midpoint.y = ws.height * 0.3;
            if(!(outNum >= 0))
            {
                if (RemoveNodeBack(node, "putOutCard", 1, msg.card) == 0)
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
                    RemoveFrontNode(node, "standPri", 1);
                else//回放
                    RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
            }
            cc.log("DealMJPut_haian remove card  = " + msg.card);
            endPoint.y = out.y + oSize.height * oSc * putnum * 0.6;
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
                    RemoveNodeBack(node, "standPri", 1);
                else//回放
                    RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
            }

            endPoint.x = out.x - oSize.width * oSc * putnum*0.95;
            endPoint.y = out.y;
            Midpoint.x = ws.width / 2;
            Midpoint.y = ws.height / 4 * 3;
        }
        else if (off == 3)
        {
            if(!(outNum >= 0))
            {
                if (MjClient.rePlayVideo == -1)
                    RemoveNodeBack(node, "standPri", 1);
                else
                    RemoveNodeBack(node, "mjhand_replay", 1, msg.card);
            }

            endPoint.y = out.y - oSize.height * oSc * putnum * 0.7;
            endPoint.x = out.x;
            Midpoint.x = ws.width*(1- 0.78);
            Midpoint.y = ws.height * 0.57;
            out.zIndex = putnum;
        }


        if(outNum >= 0) //重连
        {
            //断线重连的时候
            if((outNum == pl.mjput.length - 1) && tData.curPlayer == selfIndex && tData.tState == TableState.waitEat)
            {
                if (tData.lastPutCard == msg.card && tData.lastPutPlayer == tData.uids.indexOf(msg.uid))
                {
                    out.x = endPoint.x;
                    out.y = endPoint.y;
                    clearCurrentPutTag();
                    addCurrentPutTag(out, off);
                }
            }
            else
            {
                out.x = endPoint.x;
                out.y = endPoint.y;
                COMMON_UI3D.setCurrentPutCard3D(off,out,outNum);
                if (tData.lastPutCard == msg.card && tData.lastPutPlayer == tData.uids.indexOf(msg.uid))
                {
                    clearCurrentPutTag();
                    addCurrentPutTag(out, off);
                    var _showSprite = MjClient.playui.jsBind.eat._node.getChildByName("cardShow");
                    if (_showSprite) _showSprite.setScale(out.getScale()*0.5);
                }
                return;
            }
        }
        else //打牌
        {
            clearCurrentPutTag();
            addCurrentPutTag(out, off);
        }

        if (MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN == MjClient.gameType ||
            MjClient.gameType == MjClient.GAME_TYPE.HE_JIN_KUN_JIN)
        {
            if (msg.card == tData.hunCard || msg.card == tData.hunCard2)
            {
                //牌桌牌变色
                //播放声音
                playEffectInPlay("shangjin");
                //播放动画
                var play_node = getNode(off);
                ShowEatActionAnim(play_node, ActionType.SHANGJIN, off);
            }
        }


        //var zoder = out.zIndex;
        //out.zIndex = 200;
        out.visible = false;
        if(COMMON_UI.isPutScale && off != 0)
        {
            //out.zIndex = 200;
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

        var outAction = out.clone();
        setCardSprite(outAction, msg.card, myOff);


        if (off != 0)
        {
            if(COMMON_UI.isPutScale)
            {
                outAction = out_self.clone();
                setCardSprite(outAction, msg.card, 0);
            }
            var idx = pl.putCardAfterTing;
            if (idx >= 0 && idx == tingPutNum) {
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
                    else if(MjClient.gameType === MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI){
                        if(!MjClient.data.sData.tData.areaSelectMode["tingPaiBuKou"]){
                            var _UINode = getNode(off);
                            var cpnode = _UINode.getChildByName("down");
                            outAction.removeAllChildren();
                            outAction.loadTexture(cpnode.getRenderFile().file);
                            unschedulePlayMoveCardOtherSameCardGrey(outAction);
                        }else{
                            out.setColor(cc.color(240, 230, 140));
                        }
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

        /*
        // 只作用于 吃碰杠 的牌
        outAction.setOpacity(0);
        var actincd = node.getChildByName("action");
        if(actincd && (MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || (isJinZhongAPPType() && !COMMON_UI.isPutScale)))
        {
            if(actincd.canDelete)
            {
                actincd.removeFromParent(true);
                outAction.setOpacity(255);
            }
            else
            {
                actincd.schedule(function(){
                    if(actincd.canDelete && cc.sys.isObjectValid(outAction))
                    {
                        // actincd.stopAllActions();
                        actincd.unscheduleAllCallbacks();
                        actincd.removeFromParent(true);
                        outAction.setOpacity(255);
                    }
                    else if (cc.sys.isObjectValid(outAction))
                    {
                        outAction.setOpacity(0);
                    }
                });
            }
        }
        else
        {
            outAction.setOpacity(255);
        }
        */

        if(COMMON_UI.isPutScale) outAction.zIndex = 1000;

        if(COMMON_UI.isPutScale && off != 0)
        {
            //outAction = out_self.clone();
            //setCardSprite(outAction, msg.card, 0);
            //outAction.zIndex = 200;
            outAction.scale = 2*oSc;
            outAction.setPosition(Midpoint);
            clearCurrentPutTag();

        }
        else
        {
            outAction.scale = oSc;
            outAction.setPosition(endPoint);


            COMMON_UI3D.setCurrentPutCard3D(off,outAction,putCardNum);
            COMMON_UI3D.setCurrentPutCard3D(off,out,putCardNum);

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
                                    out.setPosition(endPoint);
                                    out.setScale(oSc);
                                    //out.zIndex = zoder;
                                    COMMON_UI3D.setCurrentPutCard3D(off,out,putCardNum);
                                    addCurrentPutTag(out, off);
                                    if (MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN ||
                                        MjClient.gameType == MjClient.GAME_TYPE.HE_JIN_KUN_JIN)
                                    {
                                        if (out.tag == tData.hunCard || out.tag == tData.hunCard2)
                                        {
                                            out.setColor(cc.color(190,190,190));
                                        }
                                    }
                                })
                            ));
                        }

                    }),
                    cc.removeSelf()));
            }
            else
            {
                clearCurrentPutTag();
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
                outAction.removeFromParent();
            }
            if (!onlySelf)
            {
                out.visible = true;
                //out.zIndex = zoder;
                if (MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN ||
                    MjClient.gameType == MjClient.GAME_TYPE.HE_JIN_KUN_JIN)
                {
                    if (out.tag == tData.hunCard || out.tag == tData.hunCard2)
                    {
                        out.setColor(cc.color(190,190,190));
                    }
                }
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
                            RemovePutCard(false);
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
        if(off == 0 && !pl.isTing && MjClient.rePlayVideo == -1 && COMMON_UI.isChaPai &&!pl.trust && MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_LI_SI) //晋中立四没有插牌动画
        {
            if(MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ && MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ)
            {
                COMMON_UI.afterMjputAnimation();
            }
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


/**
 * 3D 麻将通用的DealMJput  by sking  2018.9.19
 * @param node
 * @param msg
 * @param off
 * @param outNum
 */
COMMON_UI3D.DealMJPut_3D = function(node, msg, off, outNum, isKaiGang)
{
    //cardPutted = false;
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = getPlayerIndex(off);
    var noNeedOutBig = false;
    if (msg && msg.isAfterGang || isKaiGang){
        noNeedOutBig = true;
    }

    if(uids[selfIndex] == msg.uid)
    {

        var pl = sData.players[msg.uid];
        var putnum = outNum >= 0 ? outNum : (pl.mjput.length - 1);
        var putCardNum =  putnum;
        var tingPutNum = putnum;
        var tingIndex = pl.tingIndex;//沭阳麻将需要

        if(cc.isUndefined(tingIndex) || !pl.isTing)
        {
            tingIndex = -1;//为了不报错;
        }


        var out0 = node.getChildByName("out0");
        var out1 = node.getChildByName("out1");
        var out2 = node.getChildByName("out2");
        var out3 = node.getChildByName("out3");

        var out0_self = getNode(0).getChildByName("out0");
        var out1_self = getNode(0).getChildByName("out1");
        var out2_self = getNode(0).getChildByName("out2");
        var out3_self = getNode(0).getChildByName("out3");

        var cardCount = [8,10,10,10]; //打出去的牌对应的每一列对应的牌的张数

        if (MjClient.MaxPlayerNum == 2)
        {
            cardCount = [12,14,16,16];
        }


        var out;
        var out_self;
        if (putnum >= (cardCount[0] + cardCount[1] + cardCount[2]) && out3)
        {
            out = out3.clone();
            out_self = out3_self.clone();
        }
        else if (putnum >= (cardCount[0] + cardCount[1]) && out2)
        {
            out = out2.clone();
            out_self = out2_self.clone();
        }
        else if(putnum >= cardCount[0])
        {
            out = out1.clone();
            out_self = out1_self.clone();
        }
        else
        {
            out = out0.clone();
            out_self = out0_self.clone();
        }
        out.setScale(out.getScale()*1.3);
        out_self.setScale(out_self.getScale()*1.3);
        var oSize = out.getSize();
        var oSc = out.scale;

        if (off == 0 && putnum >= (cardCount[0] + cardCount[1] + cardCount[2]) && out3)
        {
            node.addChild(out,putnum + 30);
        }
        else if (off == 0 && putnum >= (cardCount[0] + cardCount[1]) && out2)
        {
            node.addChild(out,putnum + 30);
        }
        else if (off == 0 && putnum >= cardCount[0] )
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
            node.addChild(out, 20 - putnum);
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
        out.istingcard = false;

        var myOff = off;
        if(myOff == 2) myOff = 0;


        setCardSprite(out, msg.card, myOff);


        //if (MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_MJ)
        {
            var idx = pl.putCardAfterTing;
            if (idx >= 0 && idx == tingPutNum)
            {
                out.istingcard = true;
                if (MjClient.rePlayVideo == -1)
                {
                    if(off == 0)
                    {
                        // 岳阳开杠听后，打出去的牌不变色
                        if(!MjClient.APP_TYPE.QXYYQP === MjClient.getAppType() && !MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ && !MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ )
                        {
                            out.setColor(cc.color(240, 230, 140));
                        }
                    }
                    else {
                        // out.removeAllChildren();
                        // if(off == 2)
                        // {
                        //     out.afterTingCard = true;
                        // }
                        // else
                        // {
                        //     var _UINode = getNode(off);
                        //     var cpnode = _UINode.getChildByName("down");
                        //     out.loadTexture(cpnode.getRenderFile().file);
                        // }

                        unschedulePlayMoveCardOtherSameCardGrey(out);
                    }
                }
                else//回放
                {
                    out.setColor(cc.color(240, 230, 140));
                    // if(MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_LI_SI)
                    // {
                    //     out.isFour = true; //立四麻将需要
                    //     setCardSprite(out, msg.card, myOff);
                    // }
                }
            }
        }

        var endPoint = cc.p(0, 0);
        var Midpoint = cc.p(0, 0);
        var ws = cc.director.getWinSize();

        if (putnum > (cardCount[0] + cardCount[1] + cardCount[2]) - 1 && out3)
        {
            out.x = out3.x;
            out.y = out3.y;
            putnum -= (cardCount[0] + cardCount[1] + cardCount[2]);
            tingIndex -= (cardCount[0] + cardCount[1] + cardCount[2]);
        }
        else if (putnum > (cardCount[0] + cardCount[1]) - 1 && out2)
        {
            out.x = out2.x;
            out.y = out2.y;
            putnum -= (cardCount[0] + cardCount[1]);
            tingIndex -= (cardCount[0] + cardCount[1]);
        }
        else if (putnum > cardCount[0] - 1)
        {
            out.x = out1.x;
            out.y = out1.y;
            putnum -= cardCount[0];
            tingIndex -= cardCount[0];
        }


        // //麻将间距离
        var dd = 0;
        var outDisDown = oSize.width * oSc * putnum*(0.95 + dd);


        if(off == 0)
        {
            endPoint.y = out.y;
            endPoint.x = out.x + outDisDown;
            Midpoint.x = ws.width / 2;
            Midpoint.y = ws.height * 0.3;
            if(!(outNum >= 0))
            {
                if((MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG || MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
                    MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG || MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG ||
                    MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG)
                    && msg.isAfterGang)
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
                if((MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG || MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
                    MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG || MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG ||
                    MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG)
                    && msg.isAfterGang)
                {

                }else{
                    if (MjClient.rePlayVideo == -1)
                        RemoveFrontNode(node, "standPri", 1);
                    else//回放
                        RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
                }
            }
            cc.log("DealMJPut_haian remove card  = " + msg.card);
            endPoint.y = out.y + oSize.height * oSc * putnum * 0.6;
            endPoint.x = out.x;
            Midpoint.x = ws.width*0.78;
            Midpoint.y = ws.height*0.57;
            out.zIndex = 100 - putnum;
        }
        else if(off == 2)
        {
            if(!(outNum >= 0))
            {
                if((MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG || MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
                    MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG || MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG ||
                    MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG)
                    && msg.isAfterGang)
                {

                }else{
                    if (MjClient.rePlayVideo == -1)
                        RemoveNodeBack(node, "standPri", 1);
                    else//回放
                        RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
                }
            }

            cc.log("================================oSize.width = " + oSize.width);
            cc.log("================================oSc = " + oSc);

            endPoint.x = out.x - oSize.width * oSc * putnum*0.95;
            endPoint.y = out.y;
            Midpoint.x = ws.width / 2;
            Midpoint.y = ws.height / 4 * 3;
        }
        else if (off == 3)
        {
            if(!(outNum >= 0))
            {
                if((MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG || MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
                    MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG || MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG ||
                    MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG)
                    && msg.isAfterGang)
                {

                }else{
                    if (MjClient.rePlayVideo == -1)
                        RemoveNodeBack(node, "standPri", 1);
                    else
                        RemoveNodeBack(node, "mjhand_replay", 1, msg.card);
                }
            }

            endPoint.y = out.y - oSize.height * oSc * putnum * 0.7;
            endPoint.x = out.x;
            Midpoint.x = ws.width*(1- 0.78);
            Midpoint.y = ws.height * 0.57;
            out.zIndex = putnum;
        }


        if(outNum >= 0) //重连
        {
            //断线重连的时候
            if((outNum == pl.mjput.length - 1) && tData.curPlayer == selfIndex && tData.tState == TableState.waitEat)
            {
                if (tData.lastPutCard == msg.card && tData.lastPutPlayer == tData.uids.indexOf(msg.uid))
                {
                    out.x = endPoint.x;
                    out.y = endPoint.y;
                    clearCurrentPutTag();
                    addCurrentPutTag(out, off);
                }
            }
            else
            {
                out.x = endPoint.x;
                out.y = endPoint.y;
                COMMON_UI3D.setCurrentPutCard3D(off,out,outNum);
                if (tData.lastPutCard == msg.card && tData.lastPutPlayer == tData.uids.indexOf(msg.uid))
                {
                    clearCurrentPutTag();
                    addCurrentPutTag(out, off);
                    var _showSprite = MjClient.playui.jsBind.eat._node.getChildByName("cardShow");
                    if (_showSprite) _showSprite.setScale(out.getScale()*0.5);
                }
                return;
            }
        }
        else //打牌
        {
            clearCurrentPutTag();
            addCurrentPutTag(out, off);
        }


        //var zoder = out.zIndex;
        //out.zIndex = 200;
        out.visible = false;
        if(COMMON_UI.isPutScale && off != 0 && !noNeedOutBig)
        {
            //out.zIndex = 200;
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

        var outAction = out.clone();
        setCardSprite(outAction, msg.card, myOff);

        if (off != 0)
        {
            if(COMMON_UI.isPutScale && !noNeedOutBig)
            {
                outAction = out_self.clone();
                setCardSprite(outAction, msg.card, 0);
            }
            var idx = pl.putCardAfterTing;
            if (idx >= 0 && idx == tingPutNum) {
                outAction.istingcard = true;
                if (MjClient.rePlayVideo == -1)
                {
                    var _UINode = getNode(off);
                    var cpnode = _UINode.getChildByName("down");
                    outAction.removeAllChildren();
                    outAction.loadTexture(cpnode.getRenderFile().file);
                    unschedulePlayMoveCardOtherSameCardGrey(outAction);
                }
                if (MjClient.GAME_TYPE.XIANG_SHUI_MJ == MjClient.gameType) 
                {
                    outAction.loadTexture(out.getRenderFile().file);
                    setCardSprite(outAction, msg.card, myOff);//听牌打出去的不需要盖起来；
                }
            }

            //听牌打出去的牌，自己可以碰的情况下看到的是白板
            if (MjClient.GAME_TYPE.GUAN_NAN == MjClient.gameType ||
                MjClient.GAME_TYPE.HUAI_AN_ERZ == MjClient.gameType ||
                MjClient.GAME_TYPE.GUAN_YUN   == MjClient.gameType ||
                MjClient.GAME_TYPE.SI_YANG  == MjClient.gameType ||
                MjClient.GAME_TYPE.GAN_YU   == MjClient.gameType ||
                MjClient.GAME_TYPE.DONG_HAI == MjClient.gameType ||
                MjClient.GAME_TYPE.SHU_YANG == MjClient.gameType)
                setCardSprite(outAction, msg.card, myOff);
        }



        outAction.name = "outAction";
        outAction.visible = true;

        node.addChild(outAction);


        if(COMMON_UI.isPutScale && !noNeedOutBig) outAction.zIndex = 1000;

        if(COMMON_UI.isPutScale && off != 0 && !noNeedOutBig)
        {
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                outAction.scale = 0.2*oSc;
                outAction.setPosition(Midpoint);
                clearCurrentPutTag();
                outAction.runAction(cc.scaleTo(0.2, 2 * oSc));
            } else {
                outAction.scale = 2*oSc;
                outAction.setPosition(Midpoint);
                clearCurrentPutTag();
            }
        }
        else
        {
            outAction.scale = oSc;
            outAction.setPosition(endPoint);
            COMMON_UI3D.setCurrentPutCard3D(off,outAction,putCardNum);
            COMMON_UI3D.setCurrentPutCard3D(off,out,putCardNum);
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
                                    out.setPosition(endPoint);
                                    out.setScale(oSc);
                                    //out.zIndex = zoder;
                                    COMMON_UI3D.setCurrentPutCard3D(off,out,putCardNum);
                                    addCurrentPutTag(out, off);
                                })
                            ));
                        }

                    }),
                    cc.removeSelf()));
            }
            else
            {
                clearCurrentPutTag();
                outAction.removeFromParent();
            }
        }



        function RemovePutCard(onlySelf)
        {

            MjClient.lastCardposNode = null;//抢杠胡没有牌 可以劈
            if(COMMON_UI.isPutScale && off != 0 && !noNeedOutBig)
            {
                return RemovePutCardScale(onlySelf);
            }
            if (cc.sys.isObjectValid(outAction))
            {
                outAction.removeFromParent();
            }
            if (!onlySelf)
            {
                out.visible = true;
                //out.zIndex = zoder;
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


        if (!isKaiGang)
            BindUiAndLogic(outAction, outActionBind);


        if(off == 0 && !pl.isTing &&  MjClient.rePlayVideo == -1 && !pl.trust && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ)
        {
            if(COMMON_UI.isChaPai) {
                COMMON_UI.afterMjputAnimation();
            }
            else {
                if (!(outNum >= 0))
                {
                    MjClient.playui.CardLayoutRestore(node, off);
                }
            }
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
            if (pl.trust) {
                MjClient.playui.CardLayoutRestore(node, off);
            }
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


/**
 * 3D小结算之前的摊牌效果  by Tom
 * @param off
 */
COMMON_UI3D.showMjhandBeforeEndOnePlayer = function(off)
{
    var pl = getUIPlayer(off);
    if (!pl || !pl.mjhand || MjClient.rePlayVideo !== -1) return;
    cc.log("Tom------------COMMON_UI3D.showMjhandBeforeEndOnePlayer---off", off);
    //删除背面的牌
    var node = getNode(off);
    if(!node) return;
    var children = node.children;
    for (var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if (ci.name === "standPri" || ci.name === "mjhand" || ci.name === "zimoCardNode" || ci.name === "mjhand_replay")
        {
            ci.removeFromParent();
        }
    }

    var up = node.getChildByName("up");

    //Show ALL Player MJHands
    var sta = [0.80, 0.83, 0.36, 0.83];
    var gap = [
        [0, 0.842, 0.844, 0.850, 0.854, 0.856, 0.854, 0.853, 0.853, 0.853, 0.853, 0.853, 0.853, 0.852],
        [0, 0.800, 0.800, 0.800, 0.800, 0.800, 0.800, 0.800, 0.800, 0.800, 0.800, 0.800, 0.800, 0.800],
        [0, 0.930, 0.932, 0.933, 0.933, 0.924, 0.923, 0.923, 0.923, 0.923, 0.923, 0.923, 0.922, 0.921],
        [0, 0.800, 0.800, 0.800, 0.800, 0.800, 0.800, 0.800, 0.800, 0.800, 0.800, 0.800, 0.800, 0.800],
    ];
    var skew = [
        [8, 6.5, 5, 4, 3, 2, 1, -1, -2, -3, -4, -5, -6.5, -8],
        [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
        [6, 5, 4, 3, 2, 1, 0, -1, -3, -4, -5, -6, -8, -10],
        [-15, -15, -15, -15, -15, -15, -15, -15, -15, -15, -15, -15, -15, -15],
    ];


    function processHunPai(cd, off,Idx)
    {
        //徐州的癞子的贴图比较特殊
        if(MjClient.gameType === MjClient.GAME_TYPE.XU_ZHOU){
            var img = cd.getChildByName("imgBaiDa");
            if(!img) return;
            var pos0 = {x: 0.50, y: 0.63};
            var pos1 = {x: 0.55, y: 0.70};
            var pos2 = {x: 0.45, y: 0.70};
            switch(off)
            {
                case 0:
                    img.scale = 0.95;
                    img.setSkewX(skew[off][Idx]);
                    img.setPositionPercent(pos0);
                    break;
                case 1:
                    img.scale = 0.75;
                    img.setSkewY(skew[off][Idx]);
                    img.setPositionPercent(pos1);
                    break;
                case 2:
                    img.scale = 0.95;
                    img.setSkewX(skew[off][Idx]);
                    img.setPositionPercent(pos0);
                    break;
                case 3:
                    img.scale = 0.75;
                    img.setSkewY(skew[off][Idx]);
                    img.setPositionPercent(pos2);
                    break;
            }

            return;
        }


        if(!cc.sys.isObjectValid(cd)) return;
        var baidaNameArray = ["haozi","lizi","imgBaiDa","wangzi","jinzi"];

        for(var i = 0; i < baidaNameArray.length; i++)
        {
            var laiziImg = cd.getChildByName(baidaNameArray[i]);
            if(cc.sys.isObjectValid(laiziImg))
            {
                if(off === 0)
                {
                    laiziImg.setPositionPercent({x: 0.50, y: 0.66});
                }
                else if(off === 1)
                {
                    laiziImg.setPositionPercent({x: 0.63, y: 0.63});
                    laiziImg.setSkewY(skew[off][0]);
                    laiziImg.setRotation(-90);
                }
                else if(off === 2)
                {
                    laiziImg.setPositionPercent({x: 0.47, y: 0.64});
                    laiziImg.setFlippedX(true);
                    laiziImg.setFlippedY(true);
                }
                else if(off === 3)
                {
                    laiziImg.setPositionPercent({x: 0.45, y: 0.80});
                    laiziImg.setSkewY(skew[off][0]);
                    laiziImg.setRotation(90);
                }
            }
        }

    }

    function setSpreadOutCardSprite(cardNode, Idx, off)
    {
        var img = cardNode.getChildByName("imgNode");
        processHunPai(cardNode, off, Idx);
        if(!img) return;
        var pos0 = {x: 0.50, y: 0.63};
        var pos1 = {x: 0.55, y: 0.70};
        var pos2 = {x: 0.45, y: 0.70};
        switch(off)
        {
            case 0:
                cardNode.loadTexture("playing/MJ3D/spreadHand/down/" + Idx + ".png");
                cardNode.scaleX = up.scale * 1.3;
                cardNode.scaleY = up.scale * 1.0;
                img.scale = 0.95;
                img.setSkewX(skew[off][Idx]);
                img.setPositionPercent(pos0);
                break;
            case 1:
                cardNode.loadTexture("playing/MJ3D/spreadHand/right/0.png");
                img.scale = 0.75;
                img.setSkewY(skew[off][Idx]);
                img.setPositionPercent(pos1);
                break;
            case 2:
                cardNode.loadTexture("playing/MJ3D/spreadHand/top/" + Idx + ".png");
                cardNode.scaleX = up.scale * 1.6;
                cardNode.scaleY = up.scale * 1.0;
                img.scale = 0.95;
                if(isJinZhongAPPType()) img.setRotation(0);
                img.setSkewX(skew[off][Idx]);
                img.setPositionPercent(pos0);
                break;
            case 3:
                cardNode.loadTexture("playing/MJ3D/spreadHand/left/0.png");
                img.scale = 0.75;
                img.setSkewY(skew[off][Idx]);
                img.setPositionPercent(pos2);
                break;
        }
    }

    function dealMJhand(mjhand)
    {
        var mjhands = mjhand.slice();
        var tData = MjClient.data.sData.tData;
        var len = mjhand.length;
        if(tData.tState === TableState.roundFinish || tData.tState === TableState.waitPut)
        {
            if(len % 3 === 2)
            {
                var last = mjhands.pop();
                mjhands.sort(function (a, b) {
                    return a - b;
                }).push(last);
            }
            else
            {
                mjhands.sort(function (a, b) {
                    return a - b;
                });
            }
        }
        else if(tData.tState === TableState.waitEat)   // 点炮时去掉手牌最后一张
        {
            if(len % 3 === 2)
            {
                mjhands.pop();
                mjhands.sort(function (a, b) {
                    return a - b;
                })
            }
        }
        return mjhands;
    }

    function hasNewCard(mjhand)
    {
        if(!mjhand || mjhand.length === 0) return false;
        var len = mjhand.length;
        if(len % 3 === 2)
        {
            return true;
        }
        return false;
    }

    // 3D 自摸闪电动画
    function ziMoAnimate3D(lastCardNode, off)
    {
        var pl = getUIPlayer(off);
        if(pl.zimoNode && lastCardNode)
        {
            var projNode = createSpine("spine/dianpao/skeleton.json", "spine/dianpao/skeleton.atlas");
            lastCardNode.addChild(projNode,999999);
            projNode.setAnimation(0, 'idle', false);
            projNode.setPosition(lastCardNode.width/2, lastCardNode.height/2);
            projNode.setScale(1.5);
            projNode.setTimeScale(0.35);
        }
    }

    var lastCard = null;
    var mjhand = dealMJhand(pl.mjhand);
    var isHasNewCard = hasNewCard(mjhand);
    var startX = cc.winSize.width * sta[off];
    var startY = cc.winSize.height * sta[off];
    try {
        for (var i = 0; i < mjhand.length; i++) {
            var idm = mjhand.length - i - 1;   // 逆序渲染：记录当前麻将下标
            var idx = 14 - i - 1;              // 逆序渲染：记录当前所有3D麻将白板类型
            switch (off) {
                case 0:
                    // 杠在左边，所以从右边逆序渲染
                    var cp = getNewCard(node, "up", "mjhand_replay", mjhand[idm], off);
                    cp.x = startX - cp.width * cp.scale * i * gap[off][i];
                    cp.y = cc.winSize.width * 0.05;
                    cp.setLocalZOrder(idm);
                    setSpreadOutCardSprite(cp, idx, off);
                    if (i === 0 && isHasNewCard)  // 0号位特殊处理最后一张隔开的牌
                    {
                        lastCard = cp;
                        cp.x = cp.x + 20;
                        cp.loadTexture("playing/MJ3D/spreadHand/down/13e.png");
                    }
                    if (i === 1 && mjhand.length === 2)  // 0号位特殊处理倒数第二张牌
                    {
                        cp.loadTexture("playing/MJ3D/spreadHand/down/12e.png");
                    }
                    break;
                case 1:
                    var rightX = cc.winSize.width * 0.8;
                    if (isIPad()) rightX = cc.winSize.width * 0.76;
                    var rightScale = up.scale * 1.7;
                    var cp = getNewCard(node, "up", "mjhand_replay", mjhand[idm], off);
                    cp.y = startY - cp.height * cp.scale * i * gap[off][i];
                    cp.x = rightX + cp.width * cp.scale * i * 0.18;
                    cp.scale = rightScale + i * 0.005;
                    cp.setLocalZOrder(i);
                    setSpreadOutCardSprite(cp, i, off);
                    if (i === 0 && isHasNewCard) {
                        lastCard = cp;
                        cp.x = cp.x - 4;
                        cp.y = cp.y + 10;
                    }
                    break;
                case 2:
                    // 杠在右边，所以从左边顺序渲染
                    var cp = getNewCard(node, "up", "mjhand_replay", mjhand[idm], off);
                    if (isIPad()) startX = cc.winSize.width * sta[off] * 0.85;
                    cp.x = startX + cp.width * cp.scale * i * gap[off][i];
                    cp.setLocalZOrder(i);
                    setSpreadOutCardSprite(cp, i, off);
                    if (i === 0 && isHasNewCard) {
                        lastCard = cp;
                        cp.x = cp.x - 10;
                    }
                    break;
                case 3:
                    var leftX = cc.winSize.width * 0.235;
                    var leftScale = up.scale * 1.7;
                    var cp = getNewCard(node, "up", "mjhand_replay", mjhand[i], off);
                    cp.y = startY - cp.height * cp.scale * i * gap[off][i];
                    cp.x = leftX - cp.width * cp.scale * i * 0.18;
                    cp.scale = leftScale + i * 0.005;
                    cp.setLocalZOrder(i);
                    setSpreadOutCardSprite(cp, i, off);
                    if (i === mjhand.length - 1 && isHasNewCard) {
                        lastCard = cp;
                        cp.x = cp.x - 3.5;
                        cp.y = cp.y - 15;
                    }
                    break;
            }
        }
    } catch (e) {
        cc.log(" warning : ", e)
    }
    
    ziMoAnimate3D(lastCard, off);
};


/**
 * 3D 模式下，重置四个玩家头像位置 by sking
 * @constructor
 */
COMMON_UI3D.InitHeadPostionPlaying = function()
{
    var node = getNode(0).getParent();
    var down = node.getChildByName("down").getChildByName("head");
    var top = node.getChildByName("top").getChildByName("head");
    var left = node.getChildByName("left").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");
    var topTingCard = top.getChildByName("tingCard");
    var topTingIcon = top.getChildByName("tingIcon");
    down.visible = true;
    var _sc = 0.13;
    if(isIPad()) _sc = 0.1;

    if (isCanChangePlayerNum() && MjClient.MaxPlayerNum == 2 && !isYongZhouProject())
    {
        setWgtLayout(top, [_sc, _sc], [0, 1], [3.1, -0.65], false, false);
        if(isIPad())
        {
            setWgtLayout(top, [_sc, _sc], [0, 1], [2.05, -0.65], false, false);
        }
        setWgtLayout(top, [_sc, _sc], [0.28, 1], [0, -0.65], false, false);
    }
    else
    {
        setWgtLayout(top, [_sc, _sc], [0.28, 1], [0, -0.65], false, false);
        if(isIPad())
        {
            setWgtLayout(top, [_sc, _sc], [0.205, 1], [0, -0.65], false, false);
        }
    }


    if (MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
        setWgtLayout(down, [_sc, _sc], [0, 0], [0.6, 3], false, false);
    }
    else {
        setWgtLayout(down,[_sc, _sc], [0, 0], [0.6, 2.8], false, false);
    }
    setWgtLayout(left, [_sc, _sc], [0, 0.5], [0.6, 1.7], false, false);
    if(isYongZhouProject()){
        setWgtLayout(left, [_sc, _sc], [0, 0.43], [0.6, 2.35], false, false);
    }
    setWgtLayout(right, [_sc, _sc], [1, 0.5], [-0.6, 1.7], false, false);
    setWgtLayout(topTingCard, [0.6, 0.6], [-0.40, 0.5], [0, 0], false, true);
    setWgtLayout(topTingIcon, [0.6, 0.6], [-0.35, 0], [0, 0], false, true);


    if(isIPad())
        setWgtLayout(top, [_sc, _sc], [0.03, 0.97], [2.2, -0.65], false, false);

    if(isIPhoneX())
    {
        node.getChildByName("left").x = 0;
        left.y = cc.winSize.height*0.75;
        left.x = 0;
        left.setScale(down.getScale());

        setWgtLayout(down,[_sc, _sc], [0.05, 0], [0.3, 2.8], false, false);
        setWgtLayout(left, [_sc, _sc], [0.05, 0.49], [0.3, 1.7], false, false);
    }

}

/**
 *
 *  3D 的牌面 by sking
 * @param oldFile
 * @param type
 * @returns {*}
 */
COMMON_UI3D.getNewMJBgFile3D = function(oldFile, type)
{
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
    if (type === 0)
    {
        newFile = replaceFunc(oldFile, "/MJBg3D1", "/MJCard3D1");
    }
    else if(type === 1)
    {
        newFile = replaceFunc(oldFile, "/MJBg3D2", "/MJCard3D2");
    }


    if (newFile != "" && newFile != oldFile && !jsb.fileUtils.isFileExist(newFile)) {
        cc.log("getNewMJBgFile file not exsit : " + newFile);
        newFile = "";
    }

    return newFile != "" ? newFile : oldFile;
}

/**
 * 3D 的房间信息：玩法名称，房间号，时间，电池，信号, 剩余张数，剩余局数
 */
COMMON_UI3D.addPlayingInfo = function()
{
    var _backNode = MjClient.playui._downNode.getParent().getChildByName("back");
    var hideBaiDaList = [2018081, 2018111]; //有癞子但不需要显示的

    if(!COMMON_UI3D.is3DUI())
    {
        var _bannerNode = MjClient.playui._downNode.getParent().getChildByName("banner");
        var _bannnerTableId = _bannerNode.getChildByName("tableid");
        if(_bannnerTableId) _bannnerTableId.visible = true;

        var _tableId = _bannerNode.getParent().getChildByName("tableid"); //有的玩法节点不一样
        if(_tableId) _tableId.visible = true;

        var _bannnerRoomNo = _bannerNode.getChildByName("roomNo");
        if(_bannnerRoomNo)_bannnerRoomNo.visible = true;
        var _bannnerbg_time = _bannerNode.getChildByName("bg_time");
        if(_bannnerbg_time) _bannnerbg_time.visible = true;

        var _bannnerbg_wifi = _bannerNode.getChildByName("wifi");
        if(_bannnerbg_wifi) _bannnerbg_wifi.visible = true;

        var _bannnerbg_powerBar = _bannerNode.getChildByName("powerBar");
        if(_bannnerbg_powerBar) _bannnerbg_powerBar.visible = true;

        var _bannnerbg_power_9 = _bannerNode.getChildByName("power_9");
        if(_bannnerbg_power_9)  _bannnerbg_power_9.visible = true;

        var _roundInfo = MjClient.playui._downNode.getParent().getChildByName("roundInfo");
        _roundInfo.visible = true;
        // _roundInfo.setString("");
        var _settingBtn = _bannerNode.getChildByName("setting");
        _settingBtn.setScale(0.5);
        _settingBtn.setScale(_settingBtn.getScale()*1.2);
        _settingBtn.setPositionX(_bannerNode.getContentSize().width*1.44);

        if(_backNode.getChildByName("playingInfo3D"))
        {
            _backNode.getChildByName("playingInfo3D").visible = false;
        }

        if(_backNode.getChildByName("infoBg"))
        {
            _backNode.getChildByName("infoBg").visible = false;
        }

        if(_backNode.getChildByName("roundInfo3D"))
        {
            _backNode.getChildByName("roundInfo3D").visible = false;
        }

        var hunCard = _bannerNode.getChildByName("hunPai");
        var tData = MjClient.data.sData.tData;
        var HuncardMsg = tData.showCard ? tData.showCard : tData.hunCard;
        var hideBaiDaList = [2018081, 2018111]; //有癞子但不需要显示的
        if(hunCard)
        {
            hunCard.visible = false;
            if(HuncardMsg && HuncardMsg !== -1 && hideBaiDaList.indexOf(MjClient.gameType) === -1){
                hunCard.visible = true;
            }
        }

        var _roundnumImg = MjClient.playui._downNode.getParent().getChildByName("roundnumImg");
        _roundnumImg.visible = true;
        var _cardNumImg  = MjClient.playui._downNode.getParent().getChildByName("cardNumImg");
        _cardNumImg.visible = true;
        var tState = MjClient.data.sData.tData.tState;
        if(tState === TableState.waitJoin || tState === TableState.waitReady || tState === TableState.roundFinish)
        {
            _roundnumImg.visible = false;
            _cardNumImg.visible  = false;
        }

        // 2、3D刷新牌桌聊天，语音，GPS位置按钮位置
        COMMON_UI3D.updateTableBtnPosition();

        return;
    }


    var tableId = MjClient.data.sData.tData.tableid;

    var playingInfoUI = ccs.load("playingInfo3D.json");

    if (!cc.sys.isObjectValid(MjClient.playui) ) {
        cc.log(" ======= 没有找到桌面======");
        return;
    }

    if(!playingInfoUI || !playingInfoUI.node){ return;}



    _backNode.addChild(playingInfoUI.node,0);
    playingInfoUI.node.setName("playingInfo3D");

    playingInfoUI.node.getChildByName("info_bg").visible = false;
    playingInfoUI.node.getChildByName("Panel_roundInfo").visible = false;


    playingInfoUI.node.setName("node_playingInfo");
    var _infoNode = _backNode.getChildByName("node_playingInfo");
    if (_infoNode) {

        var _infoBg = _infoNode.getChildByName("info_bg");
        _infoBg.visible = false;

        var _coply_infoBg = MjClient.playui._downNode.getParent().getChildByName("back").getChildByName("infoBg");
        if(_coply_infoBg)
        {
            _coply_infoBg.visible = false;
            _coply_infoBg.removeFromParent();
        }

        _coply_infoBg = _infoBg.clone();
        setWgtLayout(_coply_infoBg, [0.125, 0.125], [0.001, 0.996], [0, 0]);

        /*3D设置百搭牌，如果存在*/
        var hunPaiBG = _coply_infoBg.getChildByName("hunpai_bg");
        COMMON_UI3D.setBaiDa3D(hunPaiBG);


        MjClient.playui._downNode.getParent().getChildByName("back").addChild(_coply_infoBg,0);
        _coply_infoBg.setName("infoBg");
        _coply_infoBg.visible = true;

        var _bgpower = _coply_infoBg.getChildByName("power_9");
        if(_bgpower) _bgpower.visible = true;

        var _gameType = _coply_infoBg.getChildByName("gameType");
        _gameType.setString(GameCnName[MjClient.gameType]);
        _gameType.ignoreContentAdaptWithSize(true);

        var _tableID = _coply_infoBg.getChildByName("tableid");
        if(MjClient.isInGoldFieldNormal()){
            _tableID.setString(getJinbiStr(MjClient.data.sData.tData.fieldBase)+"金币");
            var _roomNo = _coply_infoBg.getChildByName("roomNo");
            if(_roomNo){
                _roomNo.setString("积分底分");
            }
        }else{
            if(tableId){
                _tableID.setString(tableId);
            }
            else {
                _tableID.setString(MjClient.data.sData.tData.tableid);
            }
        }

        _tableID.ignoreContentAdaptWithSize(true);

        var _bg_time = _coply_infoBg.getChildByName("bg_time");
        var text = new ccui.Text();
        text.setFontName("fonts/lanting.ttf");
        text.setFontSize(18);
        text.setTextColor(cc.color(171,220,208,255));
        text.setAnchorPoint(0.5, 0.5);
        text.setPosition(20, 9);
        _bg_time.addChild(text);
        text.schedule(function(){
            var time = MjClient.getCurrentTime();
            var str = (time[3]<10?"0"+time[3]:time[3])+":"+
                (time[4]<10?"0"+time[4]:time[4]);
            text.setString(str);
        });

        var _wifi = _coply_infoBg.getChildByName("wifi");
        updateWifiState(_wifi);


        var _powerBar = _coply_infoBg.getChildByName("powerBar");
        UIEventBind(null, _powerBar, "nativePower", function (d) {
            _powerBar.setPercent(Number(d));
        });
        updateBattery(_powerBar);

        var _bannerNode = MjClient.playui._downNode.getParent().getChildByName("banner");
        //原来房间号的隐藏 如果 结构改变 请自己额外添加
        if (_bannerNode) {
            _bannerNode.setZOrder(200); //比wait的按钮，层级高一点
            var _bannnerTableId = _bannerNode.getChildByName("tableid");
            if(_bannnerTableId) _bannnerTableId.visible = false;

            var _tableId = _bannerNode.getParent().getChildByName("tableid"); //有的玩法节点不一样
            if(_tableId) _tableId.visible = false;

            var _bannnerRoomNo = _bannerNode.getChildByName("roomNo");
            if(_bannnerRoomNo)_bannnerRoomNo.visible = false;
            var _bannnerbg_time = _bannerNode.getChildByName("bg_time");
            if(_bannnerbg_time) _bannnerbg_time.visible = false;

            var _bannnerbg_wifi = _bannerNode.getChildByName("wifi");
            if(_bannnerbg_wifi) _bannnerbg_wifi.visible = false;

            var _bannnerbg_powerBar = _bannerNode.getChildByName("powerBar");
            if(_bannnerbg_powerBar) _bannnerbg_powerBar.visible = false;

            var _bannnerbg_power_9 = _bannerNode.getChildByName("power_9");
            if(_bannnerbg_power_9)  _bannnerbg_power_9.visible = false;

            var _roundInfo = MjClient.playui._downNode.getParent().getChildByName("roundInfo");
            _roundInfo.visible = true; //对于3D来说 当前玩法的选项描述也是显示显示在这里
            // _roundInfo.setString("");
            var _settingBtn = _bannerNode.getChildByName("setting");
            _settingBtn.setScale(0.5);
            _settingBtn.setScale(_settingBtn.getScale()*1.2);
            _settingBtn.setPositionX(_bannerNode.getContentSize().width*1.44);
        }

        var hunCard =  _bannerNode.getChildByName("hunPai");
        if(hunCard) hunCard.visible = false;


        /*剩余局数 和 张数 */
        var _roundnumImg = MjClient.playui._downNode.getParent().getChildByName("roundnumImg");
        _roundnumImg.visible = false;
        var _cardNumImg  = MjClient.playui._downNode.getParent().getChildByName("cardNumImg");
        _cardNumImg.visible = false;

        var _Panel_roundInfo = _infoNode.getChildByName("Panel_roundInfo");
        _Panel_roundInfo.visible = false;
        var _coplyPanel_roundInfo = MjClient.playui._downNode.getParent().getChildByName("back").getChildByName("roundInfo3D");
        if(!_coplyPanel_roundInfo)
        {
            _coplyPanel_roundInfo = _Panel_roundInfo.clone();
            MjClient.playui._downNode.getParent().getChildByName("back").addChild(_coplyPanel_roundInfo,0);
        }

        _coplyPanel_roundInfo.setName("roundInfo3D");
        _coplyPanel_roundInfo.visible = true;
        setWgtLayout(_coplyPanel_roundInfo, [0.09, 0.09], [0.8, 0.95], [0, 0]);
        if(isIPad()) setWgtLayout(_coplyPanel_roundInfo, [0.07, 0.079], [0.84, 0.95], [0, 0]);

        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var _cardLeftCount = _coplyPanel_roundInfo.getChildByName("card_bg").getChildByName("cardnumAtlas");
        if (tData) _cardLeftCount.setString((MjClient.majiang.getAllCardsTotal(tData) - tData.cardNext) );
        _cardLeftCount.ignoreContentAdaptWithSize(true);

        var _roundLeftCount = _coplyPanel_roundInfo.getChildByName("round_bg").getChildByName("cardnumAtlas");
        var _leftcounttxt=_coplyPanel_roundInfo.getChildByName("card_bg").getChildByName("LeftCounttxt");
        if(_leftcounttxt ){
            _leftcounttxt.setString("剩余");
            _leftcounttxt.ignoreContentAdaptWithSize(true);
        }

        var _roundtxt=_coplyPanel_roundInfo.getChildByName("round_bg").getChildByName("Roundtxt");
        if(_roundtxt)
        {
            _roundtxt.setString("局数");
            _roundtxt.ignoreContentAdaptWithSize(true);
        }

        if(tData)
        {
            var _currentRoundIdx =  parseInt(tData.roundAll - tData.roundNum) + 1;
            if(_currentRoundIdx > tData.roundAll)
            {
                _currentRoundIdx = 1;
            }
            var extraNum = tData.extraNum ? tData.extraNum:0; // 加时赛
            var _roundText = (_currentRoundIdx + extraNum) + "/" + tData.roundAll;
            _roundLeftCount.setString(_roundText);
            _roundLeftCount.ignoreContentAdaptWithSize(true);
        }

        UIEventBind(null, MjClient.playui, "initSceneData", function (eD) {
            MjClient.data.sData = eD;
            var sData = MjClient.data.sData;
            var tData = sData.tData;

            //3D的单独显示
            if(COMMON_UI3D.is3DUI()) {
                _roundnumImg.visible = false;
                _cardNumImg.visible = false;
                _coplyPanel_roundInfo.visible = true;
                if(hunCard) hunCard.visible = false;
            }
            else
            {
                _coplyPanel_roundInfo.visible = false;
                _roundnumImg.visible = true;
                _cardNumImg.visible = true;
                var tData = MjClient.data.sData.tData;
                var HuncardMsg = tData.showCard ? tData.showCard : tData.hunCard;
                if(hunCard && HuncardMsg && HuncardMsg !== -1 && hideBaiDaList.indexOf(MjClient.gameType) === -1) {
                    hunCard.visible = true;
                }

                //没开始没有癞子
                if(tData.tState != TableState.waitPut &&
                    tData.tState != TableState.waitEat &&
                    tData.tState != TableState.waitCard)
                {
                    if(hunCard) hunCard.visible = false;
                }
            }


            if (tData) _cardLeftCount.setString((MjClient.majiang.getAllCardsTotal(tData) - tData.cardNext));
            _cardLeftCount.ignoreContentAdaptWithSize(true);

            if(tData)
            {
                var _currentRoundIdx =  parseInt(tData.roundAll - tData.roundNum) + 1;
                if(_currentRoundIdx > tData.roundAll)
                {
                    _currentRoundIdx = 1;
                }
                var extraNum = tData.extraNum ? tData.extraNum:0; // 加时赛
                var _roundText = (_currentRoundIdx + extraNum) + "/" + tData.roundAll;
                _roundLeftCount.setString(_roundText);
                _roundLeftCount.ignoreContentAdaptWithSize(true);
            }
        });

        UIEventBind(null, MjClient.playui, "waitPut", function (eD) {
            _roundnumImg.visible = false;
            _cardNumImg.visible = false;

            //3D的单独显示
            if(COMMON_UI3D.is3DUI()) {
                _coplyPanel_roundInfo.visible = true;
            }
            else
            {
                _roundnumImg.visible = true;
                _cardNumImg.visible = true;
            }

            var sData = MjClient.data.sData;
            var tData = sData.tData;
            if(tData)
            {
                if (tData) _cardLeftCount.setString(MjClient.majiang.getAllCardsTotal(tData) - tData.cardNext);
                _cardLeftCount.ignoreContentAdaptWithSize(true);
            }
        });

        UIEventBind(null, MjClient.playui, "mjhand", function (eD) {
            _roundnumImg.visible = false;
            _cardNumImg.visible = false;
            var _coplyPanel_roundInfo = MjClient.playui._downNode.getParent().getChildByName("back").getChildByName("roundInfo3D");
            if(_coplyPanel_roundInfo) _coplyPanel_roundInfo.visible = true;

            var sData = MjClient.data.sData;
            var tData = sData.tData;



            //3D的单独显示
            if(COMMON_UI3D.is3DUI()) {
                if(hunCard) hunCard.visible = false;
                if(_coplyPanel_roundInfo) _coplyPanel_roundInfo.visible = true;
            }
            else
            {
                if(_coplyPanel_roundInfo) _coplyPanel_roundInfo.visible = false;
                var HuncardMsg = tData.showCard ? tData.showCard : tData.hunCard;
                if(hunCard && HuncardMsg && HuncardMsg != -1 && hideBaiDaList.indexOf(MjClient.gameType) === -1) {
                    hunCard.visible = true;
                }
            }

            if(tData)
            {
                var _currentRoundIdx =  parseInt(tData.roundAll - tData.roundNum) + 1;
                if(_currentRoundIdx > tData.roundAll)
                {
                    _currentRoundIdx = 1;
                }
                var extraNum = tData.extraNum ? tData.extraNum:0; // 加时赛
                var _roundText = (_currentRoundIdx + extraNum) + "/" + tData.roundAll ;

                if (tData) _roundLeftCount.setString(_roundText);
                _roundLeftCount.ignoreContentAdaptWithSize(true);

                cc.log("tData.rounddddAll = " + _roundText);
            }
        });

        // 2、3D刷新牌桌聊天，语音，GPS位置按钮位置
        COMMON_UI3D.updateTableBtnPosition();

        /*end of 剩余局数 和 张数 */
    }
};
/**
 * 2、3D刷新牌桌聊天，语音，GPS位置按钮位置
 */
COMMON_UI3D.updateTableBtnPosition = function() {

    var _voice_btn = MjClient.playui._downNode.getParent().getChildByName("voice_btn");
    var _chat_btn = MjClient.playui._downNode.getParent().getChildByName("chat_btn");
    var _gps_btn = MjClient.playui._downNode.getParent().getChildByName("gps_btn");

    setWgtLayout(_voice_btn,[0.08, 0.08], [0.97, 0.2], [0, 3.2]);
    setWgtLayout(_chat_btn,[0.08, 0.08], [0.97, 0.1],[0, 3.2]);
    if(_gps_btn) setWgtLayout(_gps_btn,[0.08, 0.08], [0.97, 0.3], [0, 3.2]);
};

