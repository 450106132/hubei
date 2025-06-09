
/* ======================================
 *  扑克牌的一些公用方法 by sking
 *  ====================================== */

MjClient.selectCards_card = [];//当前选牌的数据
MjClient.colloctionCardsArray = [];//理牌数组.数据
MjClient.colloctionCardsUIArray = [];//理牌数组ui节点
MjClient.colloctionCurrentSelcetUIArray = [];//当前需要理牌的数组UI;
MjClient.cardIdx = 0;//同花顺index
MjClient.tongHuaShunArray = [];//当前拥有的同花顺
MjClient.isSorting = false;//按钮是理牌还是恢复
MjClient.selectCardsUI = [];
MjClient.currentCardPileCount = 0;

MjClient.grayColor  = cc.color(190,190,190);
MjClient.whiteColor = cc.color(255,255,255);
MjClient.sortClassType = 1;//0 正常排序， 1  纵向排序
MjClient.sortClassKey = "_SORT_CLASS_TYPE_";

MjClient.sortType = {
    flower:1,//花色
    count:2,//张数
    normal:3//大小排序
}

//清除排版数据
function clearSortData()
{
    // MjClient.colloctionCardsArray = [];//理牌数组.数据
    // MjClient.colloctionCardsUIArray = [];//理牌数组ui节点
    // MjClient.colloctionCurrentSelcetUIArray = [];//当前需要理牌的数组UI;
    // //MjClient.tongHuaShunArray = [];//当前拥有的同花顺
    MjClient.selectCards_card = [];
    if(MjClient.sortClassType == 0) {
        setCardToNormalPos();
    }
    else {
        setCardToNormalColor();
    }
    MjClient.cardIdx = 0;
}

function setYouPaiSprite(node, cd){
    var path = "playing/cardPic3/mini/";

    //麻将的底牌公用图，4张
    node.removeAllChildren();

    if (cd == 53 || cd == 54) {
        if (cd == 53)
            node.loadTexture(path + "501.png");
        else
            node.loadTexture(path + "502.png");
    } else if(cd == 55 ){
        node.loadTexture(path + "503.png");
    }
    else {
        var cardType = Math.ceil(cd / 4);// A,2 ,3, 4, 。。。。 j ,Q .k
        var flowerType = cd % 4;// 0 黑桃 ，1 方块 ，2 梅花 ，3 红桃
        if (flowerType == 0)    // 0 黑桃对印的图牌是4
            flowerType = 4;

        node.loadTexture(path + flowerType + (cardType >= 10 ? cardType : "0" + cardType) + ".png");
    }

    node.tag = cd;
    node.isPKMiniImg = true;
}

//设置牌的渲染
function setCardSprite_card(node, cd, isOnDesk, name)
{
    if (MjClient.majiang && MjClient.majiang.removeLaiziSign)
        cd = MjClient.majiang.removeLaiziSign(cd);

    if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI ||
        GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA ||
        MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI ||
        MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN ||
        MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER ||
        GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU)
    {
        return setPKImg(node, cd, isOnDesk);
    } else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN || MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K || MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
        MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG || MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K) {
        if (name == "mjhand_ming" || name == "mjhand_replay" || name == "mjhand_you" )
            return setPKMiniImg(node, cd, name);
        else
            return setPKImg(node, cd, isOnDesk);
    }


    //麻将的底牌公用图，4张
    node.loadTexture("playing/cardPic/baidi_puke.png");
    var cardType = Math.ceil(cd / 4);// A,2 ,3, 4, 。。。。 j ,Q .k
    var flowerType = cd % 4;// 0 黑桃 ，1 方块 ，2 梅花 ，3 红桃

    // 上面可变的图
    var path = "playing/cardPic/"
    node.removeAllChildren();

    var isJoker = false;
    if(cd == 53 || cd == 54)//小王， 大王
    {
        isJoker = true;
    }
    //花色类型
    var flowerTypeNode = new ccui.ImageView();

    flowerTypeNode.setName("imgNode");
    node.addChild(flowerTypeNode);

    //牌的类型
    var cardTypeNode = new ccui.ImageView();
    cardTypeNode.setName("cardType");
    node.addChild(cardTypeNode);



    //癞子牌
    if(MjClient.data.sData.tData.hunCard == cd)
    {
        var imgBaiDaNode = new ccui.ImageView();
        imgBaiDaNode.loadTexture("playing/cardPic/pei_puke.png");
        //imgBaiDaNode.setScale(node.getScale());
        imgBaiDaNode.setPosition(60, 87);
        node.addChild(imgBaiDaNode);
    }

    if(!isJoker)//不是大小王
    {
        //小花

        var smallFlowerNode = new ccui.ImageView();
        smallFlowerNode.setName("smallFlower");
        if(MjClient.sortClassType == 0)
        {
            smallFlowerNode.setScale(0.4);
            smallFlowerNode.setPosition(22,35);
        }
        else
        {
            smallFlowerNode.setScale(0.4);
            smallFlowerNode.setPosition(65,80);
        }

        if(isOnDesk)
        {
            smallFlowerNode.setScale(0.4);
            smallFlowerNode.setPosition(22,35);
        }




        cardTypeNode.addChild(smallFlowerNode);

        cardTypeNode.setPosition(25,120);

        if(MjClient.data.sData.tData.hunCard == cd)
        {
            smallFlowerNode.loadTexture(path + "da_wujiaoxing.png");
        }
        else
        {
            smallFlowerNode.loadTexture(path + "flower_" + flowerType + ".png");
        }


        flowerTypeNode.setScale(1.1);
        flowerTypeNode.setPosition(80, 50);
        flowerTypeNode.loadTexture(path + "flower_" + flowerType + ".png");


        if(flowerType == 0 || flowerType == 2)
        {
            cardTypeNode.loadTexture(path + "hei_" + cardType + ".png");
        }
        else
        {
            cardTypeNode.loadTexture(path + "hong_" + cardType + ".png");
        }
    }
    else
    {
        flowerTypeNode.setScale(0.8);
        if(cd == 53)//小王
        {
            flowerTypeNode.loadTexture(path + "xiaowang_hua.png");
            cardTypeNode.loadTexture(path + "joker_xiao.png");
        }
        else if(cd == 54)//大王
        {
            flowerTypeNode.loadTexture(path + "dawang_hua.png");
            cardTypeNode.loadTexture(path + "joker_da.png");
        }
        cardTypeNode.setPosition(20,120);
        flowerTypeNode.setPosition(65, 80);
    }


    node.tag = cd;
}

function getCardValueByID(ID)
{
    return  Math.ceil(ID / 4);// A,2 ,3, 4, 。。。。 j ,Q .k
}

function getNewCard_card(node, copy, name, tag)
{
	var cpnode = node.getChildByName(copy);
	var cp = cpnode.clone(); //克隆一个白板，上面没有任何条纹的麻将 ，by sking
    if (name == "mjhand")
    {
        if (MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE)
            cp.setScale(cp.getScale()*1.30);
    }
    // else
    // {
    //     cp.setScale(cp.getScale()*1);
    // }

    if ((MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
        MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
        MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
        MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
        MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ) && 
        (name == "mjhand_ming" || name == "mjhand_replay"))
        cp.setScale(cp.getScale()*0.9);

    cp.visible = true;
	cp.name = name;

	node.addChild(cp);

	if(tag > 0)
	{
	    //创建一个带有麻将信息的麻将 cp为创建后的麻将
        setCardSprite_card(cp, tag, false, name);
		if(name == "mjhand")
		{
            SetTouchCardHandler_card(cpnode, cp);
		}
	}
	return cp;
}
//设置回调，并处理回调
function SetTouchCardHandler_card(standUI, cardui)
{
    return;

	cardui.addTouchEventListener(function(btn, tp)
	{
        var tData = MjClient.data.sData.tData;
        //if(tData.tState != TableState.waitPut)
        //{
        //    return;
        //}
        var pl = getUIPlayer(0);
        if(pl.mjState == TableState.roundFinish)//已经完成
        {
            cc.log("pl.mjState == TableState.roundFinish");
            return;
        }

        var tData = MjClient.data.sData.tData;
        if(!IsTurnToMe() || tData.tState != TableState.waitPut)
        {
            cc.log("!IsTurnToMe() || tData.tState != TableState.waitPut");
            return;
        }


        switch (tp)
        {
            case ccui.Widget.TOUCH_BEGAN:

                break;
            case ccui.Widget.TOUCH_MOVED:
                var pos = btn.getTouchMovePosition();
                //btn.setColor(cc.color(255,0,0));
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                var pos = btn.getPosition();
                var dy = pos.y - standUI.y;
                if(dy < 10)
                {
                    btn.y = standUI.y + 20;
                    MjClient.selectCards_card.push(cardui.tag);//添加一张牌

                }else{
                    btn.y = standUI.y;
                    var index = MjClient.selectCards_card.indexOf(cardui.tag);//把这张牌从数组删除
                    MjClient.selectCards_card.splice(index,1);
                }
                UpdataCurrentPutCard();
                break;
        }
	}, cardui);
}

// 清理ui
function clearCardUI_card(node,uiOff)
{
	// mylog("clearCardUI");

    MjClient.selectCards_card = [];//当前选牌的数据
    MjClient.colloctionCardsArray = [];//理牌数组.数据
    MjClient.colloctionCardsUIArray = [];//理牌数组ui节点
    MjClient.colloctionCurrentSelcetUIArray = [];//当前需要理牌的数组UI;
    MjClient.cardIdx = 0;//同花顺index
    MjClient.tongHuaShunArray = [];//当前拥有的同花顺
    MjClient.isSorting = false;//按钮是理牌还是恢复
    MjClient.selectCardsUI = [];
    MjClient.currentCardPileCount = 0;
	var children = node.children;
	for(var i = 0; i < children.length; i++)
	{
		var ni = children[i];
		//cc.log("ni.name SKING==== SKING  == "+ ni.name);
		if(ni.name != "head"
			&& ni.name != "up"
			&& ni.name != "stand"
			&& ni.getName() != "ready"
			&& ni.getName() != "play_tip_card"
            && ni.getName() != "deskCard"
            && ni.getName() != "noPutTag"
            && ni.getName() != "jiaodizhuTag"
            && ni.getName() != "tiTagicon"
            && ni.getName() != "jiaoFenTag"
            && ni.getName() != "laiFenTag"
            && ni.getName() != "tishi"
            && ni.getName() != "geFanState"
            && ni.getName() != "buQiangTag"
            && ni.getName() != "buFanTag"
            && ni.getName() != "bieWangTag"
            && ni.getName() != "selectDiCardPannel_New"
        )
		{
            cc.log("removeFromParent 444==== SKING  == "+ ni.name+ "tag:==="+ni.tag);
			ni.removeFromParent(true);
		}
		else if(ni.getName() == "play_tip_card")
		{
            ni.visible = false;
            for(var j = 0; j < ni.children.length; j++)
            {
                ni.children[j].visible = false;
            }
		}
	}

    // 重置发牌标记
    if (MjClient.playui && cc.sys.isObjectValid(MjClient.playui))
    {
        delete MjClient.playui.isFaPai;

        if (uiOff == 0 && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI) {
            MjClient.playui.stopActionByTag(8635921);
            delete MjClient.playui.isWaitAniEnd;
        }
    }
}


//重置4家头像位置
function reConectHeadLayout_card(node)
{
    var tData = MjClient.data.sData.tData;
    var down = node.getChildByName("down").getChildByName("head");
    var top = node.getChildByName("top").getChildByName("head");

    var left = node.getChildByName("left").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");
    if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DA_QI || 
        MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER || 
        MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN){
        var fifth = node.getChildByName("fifth").getChildByName("head");
    }

    var appType = MjClient.getAppType();

    if(tData.tState == TableState.waitJoin || 
        tData.tState == TableState.roundFinish || 
        tData.tState == TableState.waitReady)
    {
        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU)
        {
            if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN)
            {
                setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [0, -2], false, false);
                setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [0, 2.0], false, false);
                setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-4.8, 0.1], false, false);
                setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [4.8, 0.1], false, false);
            }else if(MjClient.gameType == MjClient.GAME_TYPE.DIAN_TUO){ 
                // 掂坨新UI的位置摆放
                setWgtLayout(down, [0.15, 0.15], [0.04, 0.34], [0, -2], false, false);
                setWgtLayout(top, [0.15, 0.15], [0.5, 0.6], [0, 2.0], false, false);
                setWgtLayout(left, [0.15, 0.15], [0.45, 0.68], [-4.8, 0.1], false, false);
                setWgtLayout(right, [0.15, 0.15], [0.55, 0.68], [4.8, 0.1], false, false);
            }
            else
            {
                setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [0, -2], false, false);
                setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [-4.8, 0.1], false, false);
                setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [4.8, 0.1], false, false);
            }
        }
        // 跑得快要固定位置
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
        {
            setWgtLayout(right, [0.13, 0.13], [1, 1.0], [-0.6, -1.7], false, false);

            if (isIPhoneX()) {
                if (appType == MjClient.APP_TYPE.QXYYQP || appType == MjClient.APP_TYPE.HUBEIMJ)
                    setWgtLayout(down, [0.13, 0.13], [0.05, 0.05], [0.6, 3.5], false, false);
                else if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || appType == MjClient.APP_TYPE.QXSYDTZ ||
                    appType == MjClient.APP_TYPE.QXLYQP)
                    // 邵阳、耒阳特殊处理
                    setWgtLayout(down, [0.13, 0.13], [0, 0], [1.1, 4.4], false, false);
                else if (isYongZhouProject())
                    setWgtLayout(down, [0.13, 0.13], [0, 0], [1.1, 3.7], false, false);
                else
                    setWgtLayout(down, [0.13, 0.13], [0.05, 0.03], [0.6, 3.5], false, false);

                setWgtLayout(top, [0.13, 0.13], [0, 1.0], [1.1, -1.7], false, false);
            }else{
                if (appType == MjClient.APP_TYPE.QXYYQP || appType == MjClient.APP_TYPE.HUBEIMJ)
                    setWgtLayout(down, [0.13, 0.13], [0, 0.03], [0.6, 3.5], false, false);
                else if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || appType == MjClient.APP_TYPE.QXSYDTZ ||
                    appType == MjClient.APP_TYPE.QXLYQP)
                    // 邵阳、耒阳特殊处理
                    setWgtLayout(down, [0.13, 0.13], [0, 0.03], [0.6, 3.7], false, false);
                else if (isYongZhouProject())
                    setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3.5], false, false);
                else
                    setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3.5], false, false);

                setWgtLayout(top, [0.13, 0.13], [0, 1.0], [0.6, -1.7], false, false);
            }
        }
        else if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DA_QI || 
            MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER || 
            MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)
        {
            if(MjClient.MaxPlayerNum == 5)
            {
                if( MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER)
                {
                    setWgtLayout(down, [0.17, 0.17], [0.5, 0.25], [0, 0.0], false, false);
                    setWgtLayout(right, [0.17, 0.17], [0.5, 0.5], [2.5, 0.2], false, false);
                    setWgtLayout(top, [0.17, 0.17], [0.5, 0.5], [2.5, 2.2], false, false);
                    setWgtLayout(left, [0.17, 0.17], [0.5, 0.5], [-2.5, 2.2], false, false);
                    setWgtLayout(fifth, [0.17, 0.17], [0.5, 0.5], [-2.5, 0.2], false, false);
                }
                else {
                    setWgtLayout(down, [0.17, 0.17], [0.5, 0.25], [0, 0.0], false, false);
                    setWgtLayout(right, [0.17, 0.17], [0.5, 0.5], [2.5, 0.2], false, false);
                    setWgtLayout(top, [0.17, 0.17], [0.5, 0.5], [2.5, 2.2], false, false);
                    setWgtLayout(left, [0.17, 0.17], [0.5, 0.5], [-2.5, 2.2], false, false);
                    setWgtLayout(fifth, [0.17, 0.17], [0.5, 0.5], [-2.5, 0.2], false, false);
                }
            }
            else {
                setWgtLayout(down, [0.17, 0.17], [0.5, 0.25], [0, 0.0], false, false);
                setWgtLayout(right, [0.17, 0.17], [0.5, 0.5], [2.5, 0.2], false, false);
                setWgtLayout(top, [0.17, 0.17], [0.25, 0.4], [2.5, 2.2], false, false);
                setWgtLayout(fifth, [0.17, 0.17], [0.5, 0.5], [-2.5, 0.2], false, false);
            }

        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA)
        {
            setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [0, -2.5], false, false);
            setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [-4.8, 0.1], false, false);
            setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [4.8, 0.1], false, false);
            if(isIPad())
            {
                setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [-2.8, 0.1], false, false);
                setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [2.8, 0.1], false, false);
            }
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
            MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
            MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
            MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
            MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ) {

            setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 0.3], false, false);
            setWgtLayout(top, [0.13, 0.13], [0.415, 1], [0, -0.6], false, false);
            setWgtLayout(right, [0.13, 0.13], [1, 0.5], [-0.6, 0.6], false, false);
            if (isIPhoneX()) {
                setWgtLayout(left, [0.13, 0.13], [0.05, 0.5], [0.6, 0.6], false, false);
            }else{
                setWgtLayout(left, [0.13, 0.13], [0, 0.5], [0.6, 0.6], false, false);
            }
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA || 
            MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA ||
            MjClient.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA)
        {
            setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [2.5, -1.2], false, false);
            setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [-2.5, 1.6], false, false);
            setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-2.5, -1.2], false, false);
            setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [2.5, 1.6], false, false);

            setWgtLayout(node.getChildByName("down").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[3.2, -1], false, false);
            setWgtLayout(node.getChildByName("top").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[-3.2, 2.4], false, false);
            setWgtLayout(node.getChildByName("left").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[-3.2, -1.7], false, false);
            setWgtLayout(node.getChildByName("right").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[3.2, 2.4], false, false);
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA)
        {
            setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [0, 2.5], false, false);
            setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [0, -2.5], false, false);
            setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-4.8, 0.1], false, false);
            setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [4.8, 0.1], false, false);
            //湘乡告胡子APP添加ipad适配
            if(MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ && isIpadSize()){
                setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [-4.5, 0.1], false, false);
                setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [4.5, 0.1], false, false);
            }
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI) {
            setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [2.5, -1.2], false, false);
            setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [-2.5, 1.6], false, false);
            setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-2.5, -1.2], false, false);
            setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [2.5, 1.6], false, false);

            if(isIPad())
            {
                setWgtLayout(node.getChildByName("down").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[1.7, -2], false, false);
                setWgtLayout(node.getChildByName("top").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[-1.7, 2.4], false, false);
                setWgtLayout(node.getChildByName("left").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[-1.7, -2], false, false);
                setWgtLayout(node.getChildByName("right").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[1.7, 2.4], false, false);
            } else {
                setWgtLayout(node.getChildByName("down").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[3.2, -1], false, false);
                setWgtLayout(node.getChildByName("top").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[-3.2, 2.4], false, false);
                setWgtLayout(node.getChildByName("left").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[-3.2, -1.7], false, false);
                setWgtLayout(node.getChildByName("right").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[3.2, 2.4], false, false);
            }
        }
        else
        {
            setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [0, -2], false, false);
            setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [0, 2.0], false, false);
            setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-4.8, 0.1], false, false);
            setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [4.8, 0.1], false, false);

            if (appType == MjClient.APP_TYPE.QXYYQP || appType == MjClient.APP_TYPE.YLHUNANMJ || appType == MjClient.APP_TYPE.HUBEIMJ) {
                setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [2.5, -1.2], false, false);
                setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [-2.5, 1.6], false, false);
                setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-2.5, -1.2], false, false);
                setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [2.5, 1.6], false, false);

                setWgtLayout(node.getChildByName("down").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[3.2, -1], false, false);
                setWgtLayout(node.getChildByName("top").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[-3.2, 2.4], false, false);
                setWgtLayout(node.getChildByName("left").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[-3.2, -1.7], false, false);
                setWgtLayout(node.getChildByName("right").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[3.2, 2.4], false, false);

                if(MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO){
                    setWgtLayout(node.getChildByName("down").getChildByName('ready'), [0.042, 0.0819],[0.5, 0.5],[3.2, -1], false, false);
                    setWgtLayout(node.getChildByName("top").getChildByName('ready'), [0.042, 0.0819],[0.5, 0.5],[-3.0, 2.4], false, false);
                    setWgtLayout(node.getChildByName("left").getChildByName('ready'), [0.042, 0.0819],[0.5, 0.5],[-3.0, -1.7], false, false);
                    setWgtLayout(node.getChildByName("right").getChildByName('ready'), [0.042, 0.0819],[0.5, 0.5],[3.2, 2.4], false, false);
                }


                if(isIPad() && (MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO ||
                    MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA_NEW))
                {
                    setWgtLayout(node.getChildByName("down").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[1.7, -2], false, false);
                    setWgtLayout(node.getChildByName("top").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[-1.7, 2.4], false, false);
                    setWgtLayout(node.getChildByName("left").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[-1.7, -2], false, false);
                    setWgtLayout(node.getChildByName("right").getChildByName('ready'), [0.084, 0.094],[0.5, 0.5],[1.7, 2.4], false, false);
                }
            }
        }
        initFlower(false, false);
    }
    else
    {
        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU)
        {
            if (MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN) 
            {
                setWgtLayout(down, [0.13, 0.13], [0, 0], [0.8, 3], false, false);
                setWgtLayout(right, [0.13, 0.13], [1, 1], [-0.8, -2.6], false, false);
                setWgtLayout(top, [0.13, 0.13], [0.5, 1], [0, -0.6], false, false);
                setWgtLayout(left, [0.13, 0.13], [0, 1], [0.8, -2.5], false, false);
            }else if(MjClient.gameType == MjClient.GAME_TYPE.DIAN_TUO){
                setWgtLayout(down, [0.15, 0.15], [0.04, 0.34], [0, -2], false, false);
                setWgtLayout(top, [0.15, 0.15], [0.5, 0.6], [0, 2.0], false, false);
                setWgtLayout(left, [0.15, 0.15], [0.45, 0.68], [-4.8, 0.1], false, false);
                setWgtLayout(right, [0.15, 0.15], [0.55, 0.68], [4.8, 0.1], false, false);
            }else if(MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN){
                setWgtLayout(right, [0.13, 0.13], [1,  0.96], [-0.6, -1.5], false, false);
                if (isIPhoneX()) {
                    setWgtLayout(down, [0.13, 0.13], [0.05, 0], [0.6, 3], false, false);
                    setWgtLayout(top, [0.13, 0.13], [0.05, 0.96], [0.6, -1.5], false, false);
                }else{
                    setWgtLayout(down, [0.13, 0.13], [0, 0.05], [0.6, 3], false, false);
                    setWgtLayout(top, [0.13, 0.13], [0, 0.96], [0.6, -1.5], false, false);
                }
            }
            else
            {
                if(appType == MjClient.APP_TYPE.QXNTQP || appType == MjClient.APP_TYPE.QXHAIANMJ)
                {
                    setWgtLayout(right, [0.13, 0.13], [1,  0.92], [-0.6, -1.2], false, false);
                    if (isIPhoneX()) {
                        setWgtLayout(down, [0.13, 0.13], [0.05, 0], [0.6, 3], false, false);
                        setWgtLayout(top, [0.13, 0.13], [0.05, 0.92], [0.6, -1.2], false, false);
                    }else{
                        setWgtLayout(down, [0.13, 0.13], [0.01, 0.05], [0.6, 3], false, false);
                        setWgtLayout(top, [0.13, 0.13], [0.01, 0.92], [0.6, -1.2], false, false);
                    }
                }
                else {
                    setWgtLayout(right, [0.13, 0.13], [1,  0.96], [-0.6, -1.2], false, false);
                    if (isIPhoneX()) {
                        setWgtLayout(down, [0.13, 0.13], [0.05, 0], [0.6, 3], false, false);
                        setWgtLayout(top, [0.13, 0.13], [0.05, 0.96], [0.6, -1.2], false, false);
                    }else{
                        setWgtLayout(down, [0.13, 0.13], [0, 0.05], [0.6, 3], false, false);
                        setWgtLayout(top, [0.13, 0.13], [0, 0.96], [0.6, -1.2], false, false);
                    }
                }
            }
        }
        // 跑得快要固定位置
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
        {
            setWgtLayout(right, [0.13, 0.13], [1, 1.0], [-0.6, -1.7], false, false);

            if (isIPhoneX()) {
                if (appType == MjClient.APP_TYPE.QXYYQP || appType == MjClient.APP_TYPE.HUBEIMJ)
                    setWgtLayout(down, [0.13, 0.13], [0.05, 0.05], [0.6, 3.5], false, false);
                else if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || appType == MjClient.APP_TYPE.QXSYDTZ ||
                    appType == MjClient.APP_TYPE.QXLYQP)
                    // 邵阳、耒阳特殊处理
                    setWgtLayout(down, [0.13, 0.13], [0, 0], [1.1, 4.4], false, false);
                else if (isYongZhouProject())
                    setWgtLayout(down, [0.13, 0.13], [0, 0], [1.1, 3.7], false, false);
                else
                    setWgtLayout(down, [0.13, 0.13], [0.05, 0.03], [0.6, 3.5], false, false);

                setWgtLayout(top, [0.13, 0.13], [0, 1.0], [1.1, -1.7], false, false);
            }else{
                if (appType == MjClient.APP_TYPE.QXYYQP || appType == MjClient.APP_TYPE.HUBEIMJ)
                    setWgtLayout(down, [0.13, 0.13], [0, 0.03], [0.6, 3.5], false, false);
                else if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || appType == MjClient.APP_TYPE.QXSYDTZ ||
                    appType == MjClient.APP_TYPE.QXLYQP)
                    // 邵阳、耒阳特殊处理
                    setWgtLayout(down, [0.13, 0.13], [0, 0.03], [0.6, 3.7], false, false);
                else if (isYongZhouProject())
                    setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3.5], false, false);
                else
                    setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3.5], false, false);

                setWgtLayout(top, [0.13, 0.13], [0, 1.0], [0.6, -1.7], false, false);
            }
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || 
            MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER || 
            MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)
        {
            if(MjClient.MaxPlayerNum == 5)
            {
                if(MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)
                {
                    setWgtLayout(down, [0.17, 0.17], [0, 0.05], [0.5, 0.0], false, false);
                    setWgtLayout(right, [0.17, 0.17], [1, 0.4], [-0.5, 1.3], false, false);
                    setWgtLayout(top, [0.17, 0.17], [0.78, 1], [0, -0.55], false, false);
                    setWgtLayout(left, [0.17, 0.17], [0.22, 1], [0, -0.55], false, false);
                    setWgtLayout(fifth, [0.17, 0.17], [0, 0.4], [0.5, 1.3], false, false);
                }
                else {
                    setWgtLayout(down, [0.17, 0.17], [0, 0.05], [0.5, 0.0], false, false);
                    setWgtLayout(right, [0.17, 0.17], [1, 0.4], [-0.5, 1.3], false, false);
                    setWgtLayout(top, [0.17, 0.17], [0.73, 1], [0, -0.55], false, false);
                    setWgtLayout(left, [0.17, 0.17], [0.27, 1], [0, -0.55], false, false);
                    setWgtLayout(fifth, [0.17, 0.17], [0, 0.4], [0.5, 1.3], false, false);
                }
            }
            else {
                setWgtLayout(down, [0.17, 0.17], [0, 0.05], [0.5, 0.0], false, false);
                setWgtLayout(right, [0.17, 0.17], [1, 0.4], [-0.5, 1.3], false, false);
                setWgtLayout(top, [0.17, 0.17], [0.5, 1], [0, -0.55], false, false);
                setWgtLayout(fifth, [0.17, 0.17], [0, 0.4], [0.5, 1.3], false, false);
            }
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA || 
            MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO ||
            MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA_NEW || 
            MjClient.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA || 
            MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI)
        {
            setWgtLayout(top, [0.13, 0.13], [0.5, 1], [0, -0.7], false, false);
            if(MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO){
               setWgtLayout(top, [0.13, 0.13], [0.5, 1], [0.6, -0.7], false, false);
            }

            setWgtLayout(right, [0.13, 0.13], [1, 1.0], [-0.6, -1.7], false, false);
            if (isIPhoneX()) {
                setWgtLayout(down, [0.13, 0.13], [0.05, 0], [0.6, 3], false, false);
                setWgtLayout(left, [0.13, 0.13], [0.05, 1.0], [0.6, -1.7], false, false);
            }else if(isIPad()){
                setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3], false, false);
                setWgtLayout(left, [0.13, 0.13], [0, 1.0], [0.6, -1.7], false, false);
            }else{
                setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3], false, false);
                setWgtLayout(left, [0.13, 0.13], [0, 1.0], [0.6, -1.7], false, false);
            }
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA)
        {
            setWgtLayout(right, [0.13, 0.13], [1, 1.0], [-0.6, -1.7], false, false);
            if (isIPhoneX()) {
                setWgtLayout(down, [0.13, 0.13], [0.05, 0], [0.6, 3], false, false);
                setWgtLayout(top, [0.13, 0.13], [0.05, 1.0], [0.6, -1.7], false, false);
            } else{
                setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3], false, false);
                setWgtLayout(top, [0.13, 0.13], [0, 1.0], [0.6, -1.7], false, false);
            }
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
            MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
            MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
            MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ) {

            setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 0.3], false, false);
            setWgtLayout(top, [0.13, 0.13], [0.415, 1], [0, -0.6], false, false);
            setWgtLayout(right, [0.13, 0.13], [1, 0.5], [-0.6, 0.6], false, false);
            if (isIPhoneX()) {
                setWgtLayout(left, [0.13, 0.13], [0.05, 0.5], [0.6, 0.6], false, false);
            }else{
                setWgtLayout(left, [0.13, 0.13], [0, 0.5], [0.6, 0.6], false, false);
            }
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA)
        {
            setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 0.4], false, false);
            setWgtLayout(top, [0.13, 0.13], [0.5, 1], [0, -0.7], false, false);
            setWgtLayout(right, [0.13, 0.13], [1, 0.7], [-1.1, 0.5], false, false);
            if (isIPhoneX()) {
                //setWgtLayout(down, [0.13, 0.13], [0.05, 0], [0.6, 0.4], false, false);
                setWgtLayout(left, [0.13, 0.13], [0.05, 0.7], [1.0, 0.4], false, false);
            }else{
                setWgtLayout(left, [0.13, 0.13], [0, 0.7], [1.0, 0.4], false, false);
            }
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA)
        {
            setWgtLayout(top, [0.13, 0.13], [0.5, 1], [0, -0.7], false, false);
            setWgtLayout(right, [0.13, 0.13], [1, 1.0], [-0.6, -1.7], false, false);
            if (isIPhoneX()) {
                setWgtLayout(down, [0.13, 0.13], [0.05, 0], [0.6, 3], false, false);
                setWgtLayout(left, [0.13, 0.13], [0.05, 1.0], [0.6, -1.7], false, false);
            }else{
                setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3], false, false);
                setWgtLayout(left, [0.13, 0.13], [0, 1.0], [0.6, -1.7], false, false);
            }
        }
        else
        {
            setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3.5], false, false);
           	setWgtLayout(top, [0.13, 0.13], [0, 1], [2.8, -0.65], false, false);
            setWgtLayout(left, [0.13, 0.13], [0, 0.5], [0.6, 1.5], false, false);
            setWgtLayout(right, [0.13, 0.13], [1, 0.7], [-0.6, 0.5], false, false);
        }
        
        //UpdataCurrentPutCard();
        //resetFlowerNum(node);
    }

    if (MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI && MjClient.MaxPlayerNum == 4)
    {
        left.visible = false;
    }

    // if (MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN) {
    //     left.visible == MjClient.MaxPlayerNum == 5;
    // }
}


// 向服务器发送过牌
function PKPassConfirmToServer_card(msgData)
{

    if(MjClient.sortClassType == 0)
    {
        setCardToNormalPos();
    }
    else
    {
        setCardToNormalColor();
    }

    //出完牌，清0数组
    MjClient.selectCards_card = [];
    if(MjClient.sortClassType == 0) {
        setCardToNormalPos();
    }
    else {
        setCardToNormalColor();
    }

    if (MjClient.playui._noPutTips) MjClient.playui._noPutTips.visible = false;
    MjClient.playui.stopActionByTag(212);

    //第一个人不能过牌
    // var sData = MjClient.data.sData;
    // var tData = sData.tData;
    // var lastPutCards =  tData.lastPutCard;
    // if (tData.lastPutPlayer == tData.curPlayer || tData.lastPutPlayer == -1) {
    //     MjClient.showToast("请出牌！");
    //     // return;
    // }

    //cc.log("=============card=======MJPassConfirmToServer=================");
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    //cc.log("========commonFunc card============MJPassConfirmToServer=================");
    
    if(msgData) {
        MjClient.gamenet.request("pkroom.handler.tableMsg", msgData);
    } else {
        MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd: "PKPass"} );
    }
    
    // 解决跑得快过牌后智能提示不正确
    if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
        MjClient.selectTipCardsArray = null;
}


//把所以的牌归位
function setCardToNormalPos()
{
    var _UINode = getNode_cards(0);
    if (!_UINode || !cc.sys.isObjectValid(_UINode)) return;
    var children = _UINode.getChildren();
    var standUI = _UINode.getChildByName("stand");

    if(isSelectDiCards_HuaQuanJiao()){
        children = MjClient.playui._downNode.getChildByName("selectDiCardPannel_New").getChildren(); 
        standUI = MjClient.playui._downNode.getChildByName("selectDiCardPannel_New").getChildByName("stand")
    }

    var specialType = (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA
                || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA);

    for(var i = 0; i < children.length; i++)
    {

        if(children[i] && children[i].name && children[i].name == "mjhand")
        {
            if(children[i].isUp && specialType)
            {
                if(children[i].y != standUI.y) children[i].y = standUI.y*2;
            }
            else {
                if(children[i].y != standUI.y)
                {
                    children[i].y = standUI.y;

                    var standUI_2RowY = standUI.y - standUI.height*1.3;//children[i].height*1.3;
                    if(isSelectDiCards_HuaQuanJiao() && i >= MjClient.playui.secondRowStartIndex && 
                        children[i].y != standUI_2RowY ){
                        children[i].y = standUI_2RowY;
                    }
                }
            }
        }
    }

    if (isJinZhongAPPType() && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU) {
        // 山西斗地主系列, 断线重连会出现出牌按钮亮，牌全放下bug，这里清除 selectCards_card,目前只改山西斗地主
        MjClient.selectCards_card = []; 
    }
}

//把所有的牌变为正常
function setCardToNormalColor()
{
    var _UINode = getNode_cards(0);
    if(!_UINode || !cc.sys.isObjectValid(_UINode)) return;
    var children = _UINode.getChildren();
    for(var i = 0; i < children.length; i++)
    {
        if(children[i] && children[i].name && children[i].name == "mjhand")
        {
            children[i].isGray = false;
            children[i].setColor(MjClient.whiteColor);
        }
    }
}

/*
    每次更新选牌显示
 */
function UpdataCurrentPutCard(isTouch)
 {
     var sData = MjClient.data.sData;
     var tData = sData.tData;
     var uids = tData.uids;
     var lastPutCards =  tData.lastPutCard;
     var pl = getUIPlayer(0);

    if ((tData.lastPutPlayer == tData.curPlayer || tData.lastPutPlayer == -1)&&
         (MjClient.data.c_Data ? (MjClient.data.c_Data.autoPKPUT == undefined || MjClient.data.c_Data.autoPKPUT == false)  : true)) {
     //(MjClient.data.c_Data ? MjClient.data.c_Data.autoPKPUT == false : true)) {
         lastPutCards = null;
          cc.log("------------------------------last put player -------updatee current putCard ");
         /*
          清除自己上次打的牌
          */
         var children = MjClient.playui._downNode.children;
         for (var i = 0; i < children.length; i++)
         {
             var ni = children[i];
             if(ni.name == "out" || ni.name == "cardTypeTietu")
             {
                 cc.log("---------轮到自己出牌，清楚打出的牌---------111111");
                 ni.removeFromParent(true);
             }
         }

         if(tData.lastPutPlayer != tData.curPlayer && tData.lastPutPlayer == -1)
         {
             //队友出完，自己接风
             var noPutTag = MjClient.playui._downNode.getChildByName("noPutTag");
             if (noPutTag)
                noPutTag.visible = false;
         }
         if (MjClient.playui._btnNoPut)
         {
            MjClient.playui._btnNoPut.setBright(false);
            MjClient.playui._btnNoPut.setTouchEnabled(false);
         }

        if (GameClass[MjClient.gameType] != MjClient.GAME_CLASS.PAO_DE_KUAI && 
            MjClient.gameType != MjClient.GAME_TYPE.CHONG_YANG_DA_GUN &&
            MjClient.gameType != MjClient.GAME_TYPE.QI_CHUN_DA_GONG &&
            MjClient.gameType != MjClient.GAME_TYPE.DA_YE_510K &&
            MjClient.gameType != MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN &&
            MjClient.gameType != MjClient.GAME_TYPE.WU_XUE_510K)
        {
            if (MjClient.playui._btnHimt)
            {
                MjClient.playui._btnHimt.setBright(false);
                MjClient.playui._btnHimt.setTouchEnabled(false);
            }
        }
        else
        {
            if (MjClient.playui._btnHimt)
            {
                MjClient.playui._btnHimt.setBright(true);
                MjClient.playui._btnHimt.setTouchEnabled(true);
            }
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN) {
            MjClient.playui._btnPutCard.x = MjClient.playui._btnHimt.x;

            // 先手手里只剩一张王，则只能过
            if (pl.mjhand && pl.mjhand.length == 1 && MjClient.majiang.isLaizi(pl.mjhand[0])) {
                MjClient.playui._btnPutCard.visible = false;

                if (IsTurnToMe()) {
                    MjClient.playui._btnNoPut.visible = true;
                    MjClient.playui._btnNoPut.x = MjClient.playui._btnHimt.x;

                    MjClient.playui._btnNoPut.setBright(true);
                    MjClient.playui._btnNoPut.setTouchEnabled(true);
                }
            }

            // 上家先手过，轮到我先手，过标记隐藏
            var noPutTag = MjClient.playui._downNode.getChildByName("noPutTag");
            if (IsTurnToMe() && noPutTag) {
                noPutTag.visible = false;
            }
        } 

        if( (MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG) && 
            MjClient.playui._btnHimt ){
            MjClient.playui._btnHimt.setVisible(false);
        }

         //斗地主断线重连的标签
         // if (MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT)
         // {
         //     cc.log("=======================lastPutPlayer=========== = " + tData.lastPutPlayer);
         //     cc.log("==================curPlayer================ = " + tData.curPlayer);
         //     cc.log("=====================lastPutCard============= = " + tData.lastPutCard);
         //     if(tData.lastPutPlayer == tData.curPlayer && tData.lastPutCard != -1 &&  tData.lastPutCard )
         //     {
         //         for(var i = 0 ;i < uids.length;i++)
         //         {
         //             var idx =  getPlayerIndex(i);
         //             if(idx != tData.curPlayer)
         //             {
         //                 var _node = getNode_cards(i);
         //                 _node.getChildByName("noPutTag").visible = true;
         //             }
         //         }
         //     }
         // }
    }
    else
    {
        if (MjClient.playui._btnNoPut)
        {
            MjClient.playui._btnNoPut.setBright(true);
            MjClient.playui._btnNoPut.setTouchEnabled(true);

            var isPaodekuai = GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI;
            if (isPaodekuai && IsTurnToMe() && getUIPlayer(1).handCount == 1 && tData.lastPutCard.length == 1 && MjClient.tipCardsArray) {
                var mustPut = false;
                // 连云港、淮安、原江苏跑得快：下家报单,接单牌时不能过牌(炸弹可不出)
                if (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_LYG ||
                    MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI ||
                    MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI ||
                    MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO ||
                    MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HA ||
                    MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW ||
                    MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_TY ||
                    MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN || 
                    MjClient.gameType == MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY ||
                    MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY) {
                    for (var i = 0; i < MjClient.tipCardsArray.length; i++) {
                        if (MjClient.tipCardsArray[i].length == 1) {
                            mustPut = true;
                            break;
                        }
                    }

                // 徐州跑得快：下家报单,接单牌时不能过牌(只有炸弹也不能过)
                } else if (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU && MjClient.tipCardsArray.length > 0) {
                    mustPut = true;
                // 南通跑得快：
                } else if ((MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_NT || 
                    MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN) 
                    && MjClient.tipCardsArray.length > 0 && (tData.areaSelectMode.winCountType != 1 || tData.areaSelectMode.baoDanMustPut)) {
                    mustPut = true;
                }
                // 晋中跑得快勾选报单出大牌，不能过
                else if (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_JZ && tData.areaSelectMode.baoDanPutMax && MjClient.tipCardsArray.length > 0) {
                    mustPut = true;
                }


                if (mustPut) {
                    MjClient.playui._btnNoPut.setBright(false);
                    MjClient.playui._btnNoPut.setTouchEnabled(false);
                }
            }

            // 淮安新跑得快 巡航导弹玩法时，非必管情况下：有玩家出单张A，有2必须用2管（用炸弹管都不行)
            if (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW && IsTurnToMe() && tData.lastPutCard.length == 1 && MjClient.tipCardsArray) {
                if (MjClient.majiang.mustOut2(tData.lastPutCard, MjClient.tipCardsArray, tData.areaSelectMode)) {
                    MjClient.playui._btnNoPut.setBright(false);
                    MjClient.playui._btnNoPut.setTouchEnabled(false);
                }
            }
        }
        if (MjClient.playui._btnHimt)
        {
            MjClient.playui._btnHimt.setBright(true);
            MjClient.playui._btnHimt.setTouchEnabled(true);
        }

         /*
          清除自己上次打的牌
          */

         if(IsTurnToMe() &&
             (MjClient.data.c_Data ? (MjClient.data.c_Data.autoPKPUT == undefined || MjClient.data.c_Data.autoPKPUT == false) : true))//如果刚刚客户端处理牌，服务器还没有返回，不删除出的牌
         {
             var children = MjClient.playui._downNode.children;
             for (var i = 0; i < children.length; i++)
             {
                 var ni = children[i];
                 if(ni.name == "out" || ni.name == "cardTypeTietu")
                 {
                     cc.log("---------轮到自己出牌，清楚打出的牌---------22222");
                     ni.removeFromParent(true);
                 }
             }
             
            // if ((MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_LYG || 
            //     MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI ||
            //     MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HA ||
            //     MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW ||
            //     MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_TY || 
            //     MjClient.gameType == MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY||
            //     MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU) &&
            if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI&&
                !tData.areaSelectMode.mustPut /*&& getUIPlayer(0).handCount != 1*/ && MjClient.tipCardsArray && MjClient.tipCardsArray.length <= 0)
            {
                MjClient.playui._btnNoPut.visible = true;
                MjClient.playui._btnPutCard.visible = true;
                MjClient.playui._btnHimt.visible = true;

                MjClient.playui._btnPutCard.setBright(false);
                MjClient.playui._btnPutCard.setTouchEnabled(false);

                MjClient.playui._btnHimt.setBright(false);
                MjClient.playui._btnHimt.setTouchEnabled(false);
            }

            if( (MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ) && 
                MjClient.playui._btnHimt ){
                MjClient.playui._btnHimt.setVisible(true);
            }

            if (MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN || 
                MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
                MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K) {
                if (MjClient.tipCardsArray && MjClient.tipCardsArray.length > 0) {
                    MjClient.playui._btnPutCard.x = MjClient.playui._btnPutCard.srcX;
                    MjClient.playui._btnNoPut.x = MjClient.playui._btnNoPut.srcX;
                } else {
                    MjClient.playui._btnPutCard.visible = false;
                    MjClient.playui._btnHimt.visible = false;

                    MjClient.playui._btnNoPut.x = MjClient.playui._btnHimt.x;
                }
            }
         }
     }

     var currentSelectCards = MjClient.selectCards_card;
     cc.log("currentSelectCards = " + JSON.stringify(MjClient.selectCards_card));

     if (MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN && IsTurnToMe()) {
        var bResetEnabled = currentSelectCards.length > 0;

        MjClient.playui._btnReset.setBright(bResetEnabled);
        MjClient.playui._btnReset.setTouchEnabled(bResetEnabled);
     }

     if(!pl.mjhand)
     {
         return;
     }


    var isCanPut;
    if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI){

        var pl2 = getUIPlayer(1);
        var isNextPlayerOneCard = false;

        if(pl2){
            isNextPlayerOneCard = pl2.handCount==1;
        }
        

        if (MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI) {
            var majiang = MjClient.majiang;
            var tData = MjClient.data.sData.tData;
            var selectData = {}
            for(var i in tData.areaSelectMode) selectData[i] = tData.areaSelectMode[i];
            var firstPutRuleNum = tData.areaSelectMode.firstPutRule;
            if(1 == firstPutRuleNum || 3 == firstPutRuleNum) {
                selectData.firstHeiTao3 = true;  // 必须出黑桃3
            } else if(2 == firstPutRuleNum || 4 == firstPutRuleNum) {
                selectData.firstHeiTao3 = false; // 可以不出黑桃3
            }

            var isFirstRound = tData.roundAll == tData.roundNum;
            isCanPut = majiang.checkPut(pl.mjhand, currentSelectCards, lastPutCards, selectData, isNextPlayerOneCard, isFirstRound);
        } else {
            var mustPutHongTaoSan = MjClient.data.sData.tData.areaSelectMode.mustPutHongTaoSan
            isCanPut = MjClient.majiang.checkPut(pl.mjhand, currentSelectCards, lastPutCards, mustPutHongTaoSan, isNextPlayerOneCard)
        }

    }else if(MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO ||
        MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI ) {
        var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
        isCanPut = MjClient.majiang.checkPutSdh(pl.mjhand, currentSelectCards, roundFirstCard, tData.zhuPaiType, false);
        if (tData.isCanShuaiPai)
        {
            var isCanShuaiPai = MjClient.majiang.checkPutSdh(pl.mjhand, currentSelectCards, roundFirstCard, tData.zhuPaiType, true);
            MjClient.playui.jsBind.BtnShuaiPai._node.setEnabled(!isCanPut && isCanShuaiPai);
        }
    } else if(MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER) {
        var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
        isCanPut = MjClient.majiang.checkPut(pl.mjhand, currentSelectCards, roundFirstCard, tData);
    }else if(MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI) {
        var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
        isCanPut = MjClient.majiang.checkPutSdh(pl.mjhand, currentSelectCards, roundFirstCard, tData.zhuPaiType, false);
        if (tData.isCanShuaiPai)
        {
            var isCanShuaiPai = MjClient.majiang.checkPutSdh(pl.mjhand, currentSelectCards, roundFirstCard, tData.zhuPaiType, true);
            MjClient.playui.jsBind.BtnShuaiPai._node.setEnabled(!isCanPut && isCanShuaiPai);
        }
    }else if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA) {
        var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
        isCanPut = MjClient.majiang.checkPutSdh(pl.mjhand, currentSelectCards, roundFirstCard, tData,false);
        if (tData.isCanShuaiPai)
        {
            var isCanShuaiPai = MjClient.majiang.checkPutSdh(pl.mjhand, currentSelectCards, roundFirstCard, tData,true);
            MjClient.playui.jsBind.BtnShuaiPai._node.setEnabled(!isCanPut && isCanShuaiPai);
        }
    }
    else if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA
        || MjClient.gameType == MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA_NEW || 
        MjClient.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA) {
        var tData = MjClient.data.sData.tData;
        var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
        isCanPut = MjClient.majiang.checkPutSdh(pl.mjhand, currentSelectCards, roundFirstCard, tData.zhuPaiType, false,tData);
        if (tData.isCanShuaiPai)
        {
            var isCanShuaiPai = MjClient.majiang.checkPutSdh(pl.mjhand, currentSelectCards, roundFirstCard, tData.zhuPaiType, true,tData);
            MjClient.playui.jsBind.BtnShuaiPai._node.setEnabled(!isCanPut && isCanShuaiPai);
        }
    }
    else if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA) {
        var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
        isCanPut = MjClient.majiang.checkPutSdh(pl.mjhand, currentSelectCards, roundFirstCard, tData,false);
        if (tData.isCanShuaiPai)
        {
            var isCanShuaiPai = MjClient.majiang.checkPutSdh(pl.mjhand, currentSelectCards, roundFirstCard, tData,true);
            MjClient.playui.jsBind.BtnShuaiPai._node.setEnabled(!isCanPut && isCanShuaiPai);
        }
    }else if (MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN) {
        // 临汾斗地主，提起一张牌按钮就会亮
        isCanPut = currentSelectCards.length > 0;
    } else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
        MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI) {
        isCanPut = MjClient.majiang.checkPut(pl.mjhand, currentSelectCards, lastPutCards,tData.areaSelectMode)
    } 
    else if (MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN ||
        MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG || 
        MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG || 
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
        MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K) {
        isCanPut = MjClient.playui.checkPut(pl.mjhand, currentSelectCards, lastPutCards, tData.areaSelectMode);
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN){
        var nextPlayer = MjClient.playui.getNextOffPlayer(tData.curPlayer,1);
        var nextPlayerCardNum = nextPlayer.handCount;
        isCanPut = MjClient.playui.checkPut(pl.mjhand, currentSelectCards, lastPutCards, tData.areaSelectMode,nextPlayerCardNum);
        cc.log("isCanPutisCanPut",isCanPut)
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN || 
        MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN) {
        isCanPut = MjClient.playui.checkPut(pl.mjhand, currentSelectCards, lastPutCards);
    }
    else {
        isCanPut = MjClient.majiang.checkPut(pl.mjhand, currentSelectCards, lastPutCards,MjClient.data.sData.tData)
    }

    if (MjClient.playui._btnPutCard)
    {
        if(!isCanPut)
        {
             MjClient.playui._btnPutCard.setBright(false);

            if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA ||
                GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DA_QI ||
                GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU || 
                GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI ||
                MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
                MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
                MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN) {
                
                MjClient.playui._btnPutCard.setTouchEnabled(false);
            }

            if(isTouch == true)
            {
                cc.log("no put down cards")
            }
            else {
                if(IsTurnToMe())
                {
                    if((GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU && isJinZhongAPPType()) || 
                        MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER)
                    {
                        MjClient.colloctionCardsArray = [];
                        MjClient.colloctionCardsUIArray = [];
                        MjClient.selectCards_card = [];
                        setCardToNormalPos();
                    }
                }
            }
        }
        else
        {
            MjClient.playui._btnPutCard.setBright(true);
            MjClient.playui._btnPutCard.setTouchEnabled(true);
        }
    }
}

/*
    根据UIOff 获取 down top 。。.四个节点
 */
var getNode_cards = function(off)
{
    if(!MjClient.playui) return cc.log("error ============= MjClient.playui = null ");

    var _node = null;
    switch (off)
    {
        case 0:
            _node = MjClient.playui._downNode;
            cc.log("0----getNode_cards");
            break;
        case 1:
            cc.log("1----getNode_cards");
            _node = MjClient.playui._rightNode;
            break;
        case 2:
            cc.log("2----getNode_cards");
            _node = MjClient.playui._topNode;
            break;
        case 3:
            cc.log("3----getNode_cards");
            _node = MjClient.playui._leftNode;
            break;
        case 4:
            cc.log("4----getNode_cards");
            _node = MjClient.playui._fifthNode;
            break;    
        default:
            break;
    }
    return _node;
}

function showUserZhuangLogo_card(ZhangIdx)
{
    cc.log("设置庄 == "+ ZhangIdx);
    var tData = MjClient.data.sData.tData;
    var uids = tData.uids;
    var selfIndex = uids.indexOf(SelfUid());
    selfIndex = (ZhangIdx + 4 - selfIndex) % 4;


    var zhuang0 = MjClient.playui._downNode.getChildByName("head").getChildByName("zhuang");
    var zhuang1 = MjClient.playui._rightNode.getChildByName("head").getChildByName("zhuang");
    var zhuang2 = MjClient.playui._topNode.getChildByName("head").getChildByName("zhuang");
    var zhuang3 = MjClient.playui._leftNode.getChildByName("head").getChildByName("zhuang");

    zhuang0.visible = false;
    zhuang1.visible = false;
    zhuang2.visible = false;
    zhuang3.visible = false;


    zhuang0.zIndex = 100;
    zhuang1.zIndex = 100;
    zhuang2.zIndex = 100;
    zhuang3.zIndex = 100;

    zhuang0.getChildByName("linkZhuang").visible = false;
    zhuang1.getChildByName("linkZhuang").visible = false;
    zhuang2.getChildByName("linkZhuang").visible = false;
    zhuang3.getChildByName("linkZhuang").visible = false;


    switch (selfIndex)
    {
        case 0:
            zhuang0.visible = true;
            break;
        case 1:
            zhuang1.visible = true;
            break;
        case 2:
            zhuang2.visible = true;
            break;
        case 3:
            zhuang3.visible = true;
            break;
    }

}

function arrowbkNumberUpdate_card(node, endFunc)
{
    node.setString("10");
    var number = function()
    {
        if(node.getString() == 0)
        {
            GLog("==================================================arrowbkNumberUpdate 22222======================");
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
                node.setString("0" + number);
                if(number == 0)
                {
                    //记录音效的handle
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) {
                        playTimeUpEff = playEffect("loop_alarm", false);
                    }else{
                        playTimeUpEff = playEffect("loop_alarm", true);
                    }
                    MjClient.native.NativeVibrato();
                }
            }
        }
    };

    node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1.0), cc.callFunc(number, node))));
}

function tableStartHeadMoveAction_card(node)
{
    cc.log("-----------------set head position ------");
    var down = node.getChildByName("down").getChildByName("head");
    var top = node.getChildByName("top").getChildByName("head");
    var left = node.getChildByName("left").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");
    var fifth = null;
    if(MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || 
        MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER || 
        MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN){
        fifth = node.getChildByName("fifth").getChildByName("head");
    }
	if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
    {
        if(isIPhoneX())
        {
            if (isYongZhouProject()) {
                setWgtLayout(down, [0.13, 0.13], [0, 0], [1.1, 3.5], false, false);
                setWgtLayout(top, [0.13, 0.13], [0, 1.0], [1.1, -1.7], false, false);
            } else {
                setWgtLayout(down, [0.13, 0.13], [0.05, 0], [0.6, 3.5], false, false);
                setWgtLayout(top, [0.13, 0.13], [0.05, 1.0], [0.6, -1.7], false, false);
            }
        }
        else
        {
            if (isYongZhouProject()) {
                setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3.5], false, false);
                setWgtLayout(top, [0.13, 0.13], [0, 1.0], [0.6, -1.7], false, false);
            } else {
                setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3.5], false, false);
                setWgtLayout(top, [0.13, 0.13], [0, 1.0], [0.6, -1.7], false, false);
            }
        }
    }
    else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU)
    {
        if (MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN) 
        {
            setWgtLayout(down, [0.13, 0.13], [0, 0], [0.8, 3], false, false);
            setWgtLayout(right, [0.13, 0.13], [1, 1], [-0.8, -2.6], false, false);
            setWgtLayout(top, [0.13, 0.13], [0.5, 1], [0, -0.6], false, false);
            setWgtLayout(left, [0.13, 0.13], [0, 1], [0.8, -2.5], false, false);
        }
        else
        {
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ)
            {
                setWgtLayout(down, [0.13, 0.13], [0.01, 0], [0.6, 3], false, false);
                setWgtLayout(top, [0.13, 0.13], [0.01, 0.92], [0.6, -1.2], false, false);
                setWgtLayout(right, [0.13, 0.13], [1, 0.92], [-0.6, -1.2], false, false);
                if (isIPhoneX()) {
                    setWgtLayout(down, [0.13, 0.13], [0.05, 0], [0.6, 3], false, false);
                    setWgtLayout(top, [0.13, 0.13], [0.05, 0.92], [0.6, -1.2], false, false);
                }
            }else if (MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN) {
                // setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3], false, false);
                // setWgtLayout(top, [0.13, 0.13], [0, 0.96], [0.6, -1.5], false, false);
                // setWgtLayout(right, [0.13, 0.13], [1, 0.96], [-0.6, -1.5], false, false);
                // if (isIPhoneX()) {
                //     setWgtLayout(down, [0.13, 0.13], [0.05, 0], [0.6, 3], false, false);
                //     setWgtLayout(top, [0.13, 0.13], [0.05, 0.96], [0.6, -1.2], false, false);
                // }
                setWgtLayout(right, [0.13, 0.13], [1,  0.96], [-0.6, -1.5], false, false);
                if (isIPhoneX()) {
                    setWgtLayout(down, [0.13, 0.13], [0.05, 0], [0.6, 3], false, false);
                    setWgtLayout(top, [0.13, 0.13], [0.05, 0.96], [0.6, -1.5], false, false);
                }else{
                    setWgtLayout(down, [0.13, 0.13], [0, 0.05], [0.6, 3], false, false);
                    setWgtLayout(top, [0.13, 0.13], [0, 0.96], [0.6, -1.5], false, false);
                }
            }
            else {
                setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3], false, false);
                setWgtLayout(top, [0.13, 0.13], [0, 0.96], [0.6, -1.2], false, false);
                setWgtLayout(right, [0.13, 0.13], [1, 0.96], [-0.6, -1.2], false, false);
                if (isIPhoneX()) {
                    setWgtLayout(down, [0.13, 0.13], [0.05, 0], [0.6, 3], false, false);
                    setWgtLayout(top, [0.13, 0.13], [0.05, 0.96], [0.6, -1.2], false, false);
                }
            }
        }
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || 
        MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER || 
        MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)
    {
        if(MjClient.MaxPlayerNum == 5)
        {
            if(MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)
            {
                setWgtLayout(down, [0.17, 0.17], [0, 0.05], [0.5, 0.0], false, false);
                setWgtLayout(right, [0.17, 0.17], [1, 0.4], [-0.5, 1.3], false, false);
                setWgtLayout(top, [0.17, 0.17], [0.78, 1], [0, -0.55], false, false);
                setWgtLayout(left, [0.17, 0.17], [0.22, 1], [0, -0.55], false, false);
                setWgtLayout(fifth, [0.17, 0.17], [0, 0.4], [0.5, 1.3], false, false);
            }
           else {
                setWgtLayout(down, [0.17, 0.17], [0, 0.05], [0.5, 0.0], false, false);
                setWgtLayout(right, [0.17, 0.17], [1, 0.4], [-0.5, 1.3], false, false);
                setWgtLayout(top, [0.17, 0.17], [0.73, 1], [0, -0.55], false, false);
                setWgtLayout(left, [0.17, 0.17], [0.27, 1], [0, -0.55], false, false);
                setWgtLayout(fifth, [0.17, 0.17], [0, 0.4], [0.5, 1.3], false, false);
            }
        }
        else
        {
            setWgtLayout(down, [0.17, 0.17], [0, 0.05], [0.5, 0.0], false, false);
            setWgtLayout(right, [0.17, 0.17], [1, 0.4], [-0.5, 1.3], false, false);
            setWgtLayout(top, [0.17, 0.17], [0.5, 1], [0, -0.55], false, false);
            setWgtLayout(fifth,  [0.17, 0.17], [0, 0.4], [0.5, 1.3], false, false);
        }
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA_NEW || 
        MjClient.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO ||
        MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI)
    {
        setWgtLayout(top, [0.13, 0.13], [0.5, 1], [0, -0.7], false, false);
        setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3], false, false);
        setWgtLayout(left, [0.13, 0.13], [0, 1.0], [0.6, -1.7], false, false);
        setWgtLayout(right, [0.13, 0.13], [1, 1.0], [-0.6, -1.7], false, false);

        if(MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO ){
            setWgtLayout(top, [0.13, 0.13], [0.5, 1], [0.6, -0.7], false, false);
        }

        if (isIPhoneX()) {
            setWgtLayout(down, [0.13, 0.13], [0.05, 0], [0.6, 3], false, false);
            setWgtLayout(left, [0.13, 0.13], [0.05, 1.0], [0.6, -1.7], false, false);
        } else if(isIPad()){
            setWgtLayout(left, [0.13, 0.13], [0, 1.0], [0.6, -1.7], false, false);
            setWgtLayout(right, [0.13, 0.13], [1, 1.0], [-0.6, -1.7], false, false);
        }
    }

    else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA)
    {
        setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3], false, false);
        setWgtLayout(top, [0.13, 0.13], [0, 1.0], [0.6, -1.7], false, false);
        setWgtLayout(right, [0.13, 0.13], [1, 1.0], [-0.6, -1.7], false, false);
        if (isIPhoneX()) {
            setWgtLayout(down, [0.13, 0.13], [0.05, 0], [0.6, 3], false, false);
            setWgtLayout(top, [0.13, 0.13], [0.05, 1.0], [0.6, -1.7], false, false);
        }
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA || 
        MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA)
    {
        setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 0.4], false, false);
        setWgtLayout(top, [0.13, 0.13], [0.5, 1], [0, -0.7], false, false);
        setWgtLayout(left, [0.13, 0.13], [0, 0.7], [1.0, 0.4], false, false);
        setWgtLayout(right, [0.13, 0.13], [1, 0.7], [-1.1, 0.5], false, false);
        if (isIPhoneX()) {
            //setWgtLayout(down, [0.13, 0.13], [0.05, 0], [0.6, 0.4], false, false);
            setWgtLayout(left, [0.13, 0.13], [0.05, 0.7], [1.0, 0.4], false, false);
        }
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA)
    {
        setWgtLayout(top, [0.13, 0.13], [0.5, 1], [0, -0.7], false, false);
        setWgtLayout(right, [0.13, 0.13], [1, 1.0], [-0.6, -1.7], false, false);
        if (isIPhoneX()) {
            setWgtLayout(down, [0.13, 0.13], [0.05, 0], [0.6, 3], false, false);
            setWgtLayout(left, [0.13, 0.13], [0.05, 1.0], [0.6, -1.7], false, false);
        }else{
            setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3], false, false);
            setWgtLayout(left, [0.13, 0.13], [0, 1.0], [0.6, -1.7], false, false);
        }
    }
	else 
	{
		setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 3.5], false, false);
	    setWgtLayout(top, [0.13, 0.13], [0, 1], [2.8, -0.65], false, false);
	    setWgtLayout(left, [0.13, 0.13], [0, 0.5], [0.6, 1.5], false, false);
	    setWgtLayout(right, [0.13, 0.13], [1, 0.7], [-0.6, 0.5], false, false);
	}

    var downPoint = cc.p(down.x, down.y);
    var topPoint = cc.p(top.x, top.y);
    var rightPoint = cc.p(right.x, right.y);
    var leftPoint = cc.p(left.x, left.y);
    if(fifth != null){
        var fifthPoint = cc.p(fifth.x, fifth.y);
    }
	
	setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [0, -2], false, false);
	if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
		setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [-3, 0.1], false, false);
	else
    	setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [0, 2.1], false, false);
    setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-3, 0.1], false, false);
    setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [3, 0.1], false, false);

    if(MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || 
        MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER || 
        MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN){
        if(MjClient.MaxPlayerNum == 5)
        {
            if(MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN) {
                setWgtLayout(down, [0.17, 0.17], [0.5, 0.25], [0, 0.0], false, false);
                setWgtLayout(right, [0.17, 0.17], [0.5, 0.5], [2.5, 0.2], false, false);
                setWgtLayout(top, [0.17, 0.17], [0.5, 0.5], [2.5, 2.2], false, false);
                setWgtLayout(left, [0.17, 0.17], [0.5, 0.5], [-2.5, 2.2], false, false);
                setWgtLayout(fifth, [0.17, 0.17], [0.5, 0.5], [-2.5, 0.2], false, false);
            }
            else {
                setWgtLayout(down, [0.17, 0.17], [0.5, 0.25], [0, 0.0], false, false);
                setWgtLayout(right, [0.17, 0.17], [0.5, 0.5], [2.5, 0.2], false, false);
                setWgtLayout(top, [0.17, 0.17], [0.5, 0.5], [2.5, 2.2], false, false);
                setWgtLayout(left, [0.17, 0.17], [0.5, 0.5], [-2.5, 2.2], false, false);
                setWgtLayout(fifth, [0.17, 0.17], [0.5, 0.5], [-2.5, 0.2], false, false);
            }
        }
        else {
            setWgtLayout(down, [0.17, 0.17], [0.5, 0.25], [0, 0.0], false, false);
            setWgtLayout(right, [0.17, 0.17], [0.5, 0.5], [2.5, 0.2], false, false);
            setWgtLayout(top, [0.17, 0.17], [0.25, 0.4], [2.5, 2.2], false, false);
            setWgtLayout(fifth,  [0.17, 0.17], [0.5, 0.5], [-2.5, 0.2], false, false);
        }
    }

    down.runAction(cc.moveTo(0.3, downPoint).easing(cc.easeCubicActionOut()));
    top.runAction(cc.moveTo(0.3, topPoint).easing(cc.easeCubicActionOut()));
    if((MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI /*|| MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN*/) 
        && MjClient.MaxPlayerNum == 4 )
    {
        left.visible = false;
    }
    // else {
    //     left.visible = true;
    // }
    left.runAction(cc.moveTo(0.3, leftPoint).easing(cc.easeCubicActionOut()));
    right.runAction(cc.moveTo(0.3, rightPoint).easing(cc.easeCubicActionOut()));
    if(fifth != null){
        fifth.runAction(cc.moveTo(0.3, fifthPoint).easing(cc.easeCubicActionOut()));
    }
    sendGPS();
    MjClient.checkChangeLocationApp();
}

function AutoPutLastCard_card()
{
    if(!IsTurnToMe()) 
        return;
    
    var pl = getUIPlayer(0);
    // 如果两家不要， 又到我出牌
    var isTurnToMeAgain = (MjClient.data.sData.tData.lastPutPlayer == -1 || MjClient.data.sData.tData.lastPutPlayer == MjClient.data.sData.tData.curPlayer)
    var isCanPut = MjClient.majiang.checkPut(pl.mjhand, pl.mjhand)
    var tData = MjClient.data.sData.tData;

    var pl2 = getUIPlayer(1);
    var isNextPlayerOneCard = pl2 ? pl2.handCount==1 : false;
    var mustPutHongTaoSan = MjClient.data.sData.tData.areaSelectMode.mustPutHongTaoSan;

    var tipCardsArray;
    if (MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI) {
        var majiang = MjClient.majiang;
        var tData = MjClient.data.sData.tData;
        var selectData = {}
        for(var i in tData.areaSelectMode) selectData[i] = tData.areaSelectMode[i];
        var firstPutRuleNum = tData.areaSelectMode.firstPutRule;
        if(1 == firstPutRuleNum || 3 == firstPutRuleNum) {
            selectData.firstHeiTao3 = true;  // 必须出黑桃3
        } else if(2 == firstPutRuleNum || 4 == firstPutRuleNum){
            selectData.firstHeiTao3 = false; // 可以不出黑桃3
        }

        var isFirstRound = tData.roundAll == tData.roundNum;
        tipCardsArray = majiang.tipCards(pl.mjhand, tData.lastPutCard, selectData, isNextPlayerOneCard, isFirstRound);
    }else{
        tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, tData.lastPutCard, mustPutHongTaoSan, isNextPlayerOneCard);
    }

    if(pl.mjhand.length == 1 && isTurnToMeAgain && MjClient.majiang.checkPut(pl.mjhand, pl.mjhand) ){
        tipCardsArray.push(pl.mjhand);
    }

    if(tipCardsArray.length==1){
        var canPutLastCard = pl.mjhand.length == tipCardsArray[0].length;

        // 如果两家不要， 到我出牌， 可以一手出完
        cc.log('wwwwww111')
        if(isTurnToMeAgain && canPutLastCard){
            MjClient.selectCards_card = pl.mjhand;
            MjClient.tipCardsArray = []
            MjClient.tipCardsArray.push(pl.mjhand);
        // 如果两家不要, 但是不能一手出完， 不自动提示
        }else if(isTurnToMeAgain){
            return;
        // 自动提示
        }else{
            InitPutOutCardTips(0);
        }
        // 自动提起牌
        putOutCardTips();

        // 能一手打完， 自动出牌
        if(canPutLastCard && pl.mjhand.length==1 && MjClient.rePlayVideo == -1)
            PutOutCard_card();
    }
}

function AutoPutLastCard_card_ty()
{
    if(!IsTurnToMe()) 
        return;
    
    var pl = getUIPlayer(0);
    if (pl.trust == true) return;
    // 如果两家不要， 又到我出牌
    var isTurnToMeAgain = (MjClient.data.sData.tData.lastPutPlayer == -1 || MjClient.data.sData.tData.lastPutPlayer == MjClient.data.sData.tData.curPlayer)
    var isCanPut = MjClient.majiang.checkPut(pl.mjhand, pl.mjhand)
    var tData = MjClient.data.sData.tData;
    var pl2 = getUIPlayer(1);
    var isNextPlayerOneCard = pl2 ? pl2.handCount==1 : false;
    var mustPutHongTaoSan = MjClient.data.sData.tData.areaSelectMode.mustPutHongTaoSan;

    var tipCardsArray;
    var majiang = MjClient.majiang;
    var tData = MjClient.data.sData.tData;

    if (MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI) {
        var selectData = {}
        for(var i in tData.areaSelectMode) selectData[i] = tData.areaSelectMode[i];
        var firstPutRuleNum = tData.areaSelectMode.firstPutRule;
        if(1 == firstPutRuleNum || 3 == firstPutRuleNum) {
            selectData.firstHeiTao3 = true;  // 必须出黑桃3
        } else if(2 == firstPutRuleNum || 4 == firstPutRuleNum){
            selectData.firstHeiTao3 = false; // 可以不出黑桃3
        }

        var isFirstRound = tData.roundAll == tData.roundNum;
        tipCardsArray = majiang.tipCards(pl.mjhand, tData.lastPutCard, selectData, isNextPlayerOneCard, isFirstRound);
    } else {
        tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, tData.lastPutCard, mustPutHongTaoSan, isNextPlayerOneCard);
    }
    

    if(isCanPut && isTurnToMeAgain){
        tipCardsArray.push(pl.mjhand);
    }

    var maxNumCardType = 0;
    for(var i in tipCardsArray) {
        if(maxNumCardType < tipCardsArray[i].length ) maxNumCardType = tipCardsArray[i].length;
    }
    if(maxNumCardType){
        // 如果可以一手出完 自动打牌
        var isHadZhaDan = majiang.isHadZhaDan(pl.mjhand,selectData);
        if(maxNumCardType == pl.mjhand.length && !isHadZhaDan &&  MjClient.rePlayVideo == -1){
            MjClient.selectCards_card = pl.mjhand;
            MjClient.tipCardsArray = [];
            MjClient.tipCardsArray.push(pl.mjhand);
            putOutCardTips();
            PutOutCard_card();

        // 自动提起牌
        }else if(!isTurnToMeAgain){
            // 自动提示
            var isAutoTip = tData.areaSelectMode.isAutoTip;
            if (tData.areaSelectMode.mustPut == true &&//必管
                MjClient.majiang.IsSametipCards && 
                MjClient.majiang.IsSametipCards(tipCardsArray, tData.areaSelectMode)&& //提示都是同一牌型和牌值
                GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)// && //跑得快游戏
            {//...........使用去掉带牌的自动提示
                InitPutOutCardTips(0);
                putOutCardTips(true);
            }
            else if(isAutoTip){
                InitPutOutCardTips(0);
                putOutCardTips();
            }
        }
    }
}


//出牌
function PutOutCard_card()
{
    MjClient.playui.jsBind.BtnPutCard._node.stopAllActions(); //修复抓花后自摸时自动打出bug

    if(MjClient.selectCards_card.length <= 0)
    {
        if (MjClient.playui._noPutTips)
            MjClient.playui._noPutTips.visible = false;
        return;
    }

    cc.log("current put out cards = " + JSON.stringify(MjClient.selectCards_card));

    if(MjClient.selectTipCardsArray) 
        MjClient.selectTipCardsArray = null;

    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "PKPut",
        card: MjClient.selectCards_card,
        tingAfterPut: MjClient.clickTing
    });
    

    //前端提前显示自己出的牌，不用等后台回复，避免视觉卡顿 by sking
    if (MjClient.playui._btnPutCard && MjClient.playui._btnPutCard.isBright()
    ) {
        if( GameClass[MjClient.gameType] != MjClient.GAME_CLASS.SAN_DA_HA && 
            GameClass[MjClient.gameType] != MjClient.GAME_CLASS.GUAN_DAN && 
            GameClass[MjClient.gameType] != MjClient.GAME_CLASS.GAN_DENG_YAN &&
            MjClient.gameType != MjClient.GAME_TYPE.WU_XUE_GE_BAN && 
            MjClient.gameType != MjClient.GAME_TYPE.DA_YE_510K &&
            MjClient.gameType != MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN &&
            MjClient.gameType != MjClient.GAME_TYPE.WU_XUE_510K &&
            MjClient.gameType != MjClient.GAME_TYPE.QI_CHUN_DA_GONG &&
            MjClient.gameType != MjClient.GAME_TYPE.TONG_SHAN_DA_GONG &&
            MjClient.gameType != MjClient.GAME_TYPE.DA_YE_DA_GONG &&
            MjClient.gameType != MjClient.GAME_TYPE.CHONG_YANG_DA_GUN)
        {
            var sData = MjClient.data.sData;
            var tData = sData.tData;
            tData.lastPutCard = MjClient.selectCards_card.slice();
            var msg = {
                uid: SelfUid(),
                noPlayEffect: false
            };
            if (MjClient.playui.ClearLiPai)
                MjClient.playui.ClearLiPai(SelfUid(),tData.lastPutCard);
            DealMJPut_card(getNode_cards(0), msg, 0, true);
            MjClient.playui._btnPutCard.visible = false;
            if (MjClient.playui._btnHimt)
                MjClient.playui._btnHimt.visible = false;
            if (MjClient.playui._btnNoPut)
                MjClient.playui._btnNoPut.visible = false;
            //设置自动出牌状态，等服务器返回了重置
            if (!MjClient.data.c_Data)
                MjClient.data.c_Data={};
            MjClient.data.c_Data.autoPKPUT = true;
        }
    }
}

//出牌回调
function DealWaitPut_card(node, msg, off)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    //var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum;
    var selfIndex = getPlayerIndex(off)
    if(tData.curPlayer == selfIndex && off < MjClient.MaxPlayerNum)
    {
        InitPutOutCardTips(off);
        MjClient.playui.CardLayoutRestore(node, off);
    }
}

//过的回调
function DealPKPass_card(off)
{
    var _node = getNode_cards(off);
    _node.getChildByName("noPutTag").visible = true;

    var _node = getNode_cards(off);
    MjClient.playui.CardLayoutRestore(_node, off);
}

//处理出牌,放一张牌，打牌动作
// @param clientOut 是否是客户端自己提前表现自己打出的牌，没等服务器返回。
function DealMJPut_card(node, msg, UIOff, clientOut)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    var uids = tData.uids;

    if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI &&
        UIOff >= MjClient.MaxPlayerNum )
    {//(uids.indexOf(SelfUid()) + UIOff) % MjClient.MaxPlayerNum;
     //这句代码应该有问题，但为了不影响其他游戏做了跑得快判断。   
        return;
    }

    //var selfIndex = (uids.indexOf(SelfUid()) + UIOff) % MjClient.MaxPlayerNum;
    var selfIndex = getPlayerIndex(UIOff);


    var _node = getNode_cards(UIOff);
    var noPutTagNode = _node.getChildByName("noPutTag");
    if (noPutTagNode)
        noPutTagNode.visible = false;
    /*
     清除其他打的牌
     */
    if(MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN == MjClient.gameType)
    {
        //cc.log("清除其他打的牌 UIOff = " + UIOff);
        var children = node.children;
        for (var i = 0; i < children.length; i++)
        {
            var ni = children[i];
            if(ni.name == "out" || ni.name == "cardTypeTietu")
            {
                ni.removeFromParent(true);
            }
        }
    }

    if(uids[selfIndex] == msg.uid)
    {
        //不清楚其他人打出的牌
        var children = node.children;
        for (var i = 0; i < children.length; i++)
        {
            var ni = children[i];
            if(ni.name == "out" || ni.name == "cardTypeTietu")
            {
                ni.removeFromParent(true);
            }
        }

        cc.log("删除UI");
        showCurrentPutCardAndLayout(UIOff, msg.noPlayEffect);

        var pl = getUIPlayer(UIOff);
        if(pl && pl.handCount == 1)
        {
            if(!msg.noPlayEffect && 
                MjClient.gameType != MjClient.GAME_TYPE.LV_LIANG_DA_QI && 
                MjClient.gameType != MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN && 
                MjClient.gameType != MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER && 
                MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE && 
                MjClient.gameType != MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI &&
                MjClient.gameType != MjClient.GAME_TYPE.CHONG_YANG_DA_GUN && 
                MjClient.gameType != MjClient.GAME_TYPE.DA_YE_DA_GONG &&
                MjClient.gameType != MjClient.GAME_TYPE.TONG_SHAN_DA_GONG &&
                MjClient.gameType != MjClient.GAME_TYPE.DA_YE_510K &&
                MjClient.gameType != MjClient.GAME_TYPE.WU_XUE_510K &&
                MjClient.gameType != MjClient.GAME_TYPE.QI_CHUN_DA_GONG && 
                !clientOut)
            {
                playEffectInPlay("singer");
            }
        }
        else if(pl && pl.handCount == 2)
        {
            if(!msg.noPlayEffect &&
                (MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN)){//临汾斗地主只剩两张语音
                playEffectInPlay("double");
            }
        }
    }




    //出完牌，清0数组
    if(SelfUid() == msg.uid && UIOff == 0)
    {
        cc.log("清除数据 ----")
        MjClient.selectCards_card = [];
        MjClient.colloctionCurrentSelcetUIArray = [];
        MjClient.isSorting = false;
        MjClient.cardIdx = 0;

        if(MjClient.playui._bg_sort)
        {
            if(MjClient.colloctionCardsArray.length > 0)
            {
                MjClient.playui._bg_sort.getChildByName("Button_sort").loadTextureNormal("playing/cardTable/huifu.png");
                MjClient.playui._bg_sort.getChildByName("Button_sort").visible = true;
                MjClient.playui._bg_sort.getChildByName("Button_sort").setTouchEnabled(true);
            }
            else
            {
                MjClient.playui._bg_sort.getChildByName("Button_sort").visible = false;
                MjClient.playui._bg_sort.getChildByName("Button_sort").setTouchEnabled(false);
            }
        }


        if(MjClient.sortClassType == 0) {
            setCardToNormalPos();
        }
        else {
            setCardToNormalColor();
        }

        if (GameClass[MjClient.gameType] != MjClient.GAME_CLASS.PAO_DE_KUAI &&
            GameClass[MjClient.gameType] != MjClient.GAME_CLASS.DOU_DI_ZHU &&
            MjClient.gameType != MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI &&
            MjClient.gameType != MjClient.GAME_TYPE.SAN_DA_HA &&
            MjClient.gameType != MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO &&
            MjClient.gameType != MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA &&
            MjClient.gameType != MjClient.GAME_TYPE.SAN_DA_HA_NEW &&
            MjClient.gameType != MjClient.GAME_TYPE.LV_LIANG_DA_QI &&
            MjClient.gameType != MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN &&
            MjClient.gameType != MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER &&
            MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA && 
            MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE && 
            MjClient.gameType != MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI &&
            MjClient.gameType != MjClient.GAME_TYPE.QI_CHUN_DA_GONG &&
            MjClient.gameType != MjClient.GAME_TYPE.DA_YE_510K &&
            MjClient.gameType != MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN &&
            MjClient.gameType != MjClient.GAME_TYPE.WU_XUE_510K &&
            MjClient.gameType != MjClient.GAME_TYPE.TONG_SHAN_DA_GONG &&
            MjClient.gameType != MjClient.GAME_TYPE.DA_YE_DA_GONG &&
            MjClient.gameType != MjClient.GAME_TYPE.CHONG_YANG_DA_GUN  
        )
        {
            //检查同花顺
            checkTongHuaShun();
        }
    }




    //刷新 牌显示张数
    currentLeftCardCount(UIOff,clientOut);

    if (uids[selfIndex] == msg.uid && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
    {
        var pl = getUIPlayer(UIOff);
        if (!msg.noPlayEffect && pl && pl.handCount && pl.handCount == 1)
            playEffectInPlay("single");
    }


    //斗地主，每次出牌更新倍数
    if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU)
    {
        DealBeishu(node.getChildByName("head").getChildByName("beishu"),msg,UIOff)
    }
}

function correctPKPut(msg,uiOff) {
    if(SelfUid() == msg.uid && uiOff == 0) {
        var node = getNode_cards(uiOff);
        var putCards = msg.card;
        var restoreCards = false;

        // 删除意外情况下，没有删除的手牌
        for (var i = 0; i < putCards.length; i++)
        {
            if (RemoveNodeBack(node, "mjhand", 1, putCards[i]) > 0)
                restoreCards = true;
        }

        if (restoreCards)
            MjClient.playui.CardLayoutRestore(node, uiOff);
    }
}


/*
    龙后补牌,如皋长牌，如皋麻将胡
 */
function HandleBuLongCards(msg)
{

    for(var off = 0; off  < 3;off++)
    {
        var pl = getUIPlayer_changpai(off);
        if(!pl) return;
        var node = getNode_changpai(off);
        //添加手牌
        if (MjClient.rePlayVideo == -1)//表示正常游戏
        {
            if (msg[pl.info.uid]) {
                for (var i = 0; i < msg[pl.info.uid].length; i++) {
                    if (off == 0) {
                        getNewCard_changpai(node, "stand", "mjhand", msg[pl.info.uid][i], off);
                    }
                    else {
                        getNewCard_changpai(node, "stand", "standPri");
                    }
                }
            }
        }
        else {
            /*
             播放录像
             */
            cc.log("_________________mjhand_replay_______________" + JSON.stringify(pl.mjhand));
            if (pl.mjhand && msg[pl.info.uid]) {

                for (var i = 0; i < msg[pl.info.uid].length; i++) {
                    if(off == 0)
                    {
                        getNewCard_changpai(node, "stand", "mjhand", msg[pl.info.uid][i], off);
                    }
                    else
                    {
                        getNewCard_changpai(node, "up", "mjhand_replay", msg[pl.info.uid][i], off);
                    }
                }
                //
                // if (off == 0) {
                //     for (var i = 0; i < msg[pl.info.uid].length; i++) {
                //         getNewCard_changpai(node, "stand", "mjhand", msg[pl.info.uid][i], off);
                //     }
                // }
                // else {
                //
                //     for (var i = 0; i < msg[pl.info.uid].length; i++) {
                //         getNewCard_changpai(node, "up", "mjhand_replay", msg[pl.info.uid][i], off);
                //     }
                // }
            }

        }
        MjClient.playui.CardLayoutRestore(node, off);

    }

}


//显示牌桌上最后打出的牌UI,断线重连走这里
function reConnectShowDeskCard()//为 down  top, left ,right 节点
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    
    reconnectShowCurrentPutCardAndLayout(getUiOffByUid( uids[tData.lastPutPlayer]));

    //断线重连，且轮到自己出牌
    if(IsTurnToMe() && tData.tState == TableState.waitPut)
    {
        //初始化，出牌提示数组
        InitPutOutCardTips(0);
        cc.log('xxxxxx444')
        //更新按钮状态
        UpdataCurrentPutCard();
    }

}

/*
    只能off等0的时候使用
 */
function RemoveCardByUINode(cardNode)
{
    var children = getNode_cards(0).children;

    for(var i = 0; i < children.length - 1; i++)
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            if(ci.tag == cardNode.tag && ci.getUserData() == cardNode.getUserData())
            {
                cc.log("=======RemoveCardByUINode=====tag = " + ci.tag);
                ci.removeFromParent(true);
                break;
            }
        }
    }
}

/*
    _arr 是二维数组
    从_arr数组，删除_deArr数组。并返回对应的UI，和数据
 */
function getCheckAndDel(_arr,_deArr)
{
    var deArr = _deArr.concat();
    var _myuiArr = [];
    var _uiArry = [];
    for(var i  = 0;i < _arr.length; i++)
    {
        var _uiArr = _arr[i];
        var _tempui = [];
        var _tempuiArr  = [];
        for(var j = 0;j < _uiArr.length;j++) {
            var bExsit = false;
            for(var k = 0;k < deArr.length;)
            {
                if (_uiArr[j].tag == deArr[k].tag &&
                    _uiArr[j].getUserData() == deArr[k].getUserData()
                ) {

                    deArr.splice(k,1);
                    bExsit = true;
                    break;
                }
                else
                {
                    k++;
                }
            }

            if(!bExsit)
            {
                _tempuiArr.push(_uiArr[j]);
                _tempui.push(_uiArr[j].tag);
            }
        }

        _uiArry.push(_tempui);
        _myuiArr.push(_tempuiArr);
    }


    return {UIData:_myuiArr,IDData:_uiArry};
}

//停止手牌的所有当前的动画，谨慎调用，一般在重置手牌位置时条用
function StopHandCardAnim(node) {

    var children = node.children;
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            ci.stopAllActions();
        }
    }
}

//显示当前打出在牌桌上的牌
function showCurrentPutCardAndLayout(UIoff, noPlayEffect)
{
    if(MjClient.data.c_Data &&
       MjClient.data.c_Data.bPutCardAnim)
    {
        showCurrentPutCardAndLayoutNew(UIoff, noPlayEffect);
        return;
    }


    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var node = getNode_cards(UIoff);
    var lastPutCards = tData.lastPutCard;
    var _deskCard = node.getChildByName("deskCard");
    var putCards = lastPutCards;
    if(!putCards)
    {
        return;
    }
    cc.log("MjClient.colloctionCurrentSelcetUIArray = " +  JSON.stringify(MjClient.colloctionCurrentSelcetUIArray));

    if(UIoff == 0)
    {
        if(MjClient.rePlayVideo == -1)// 表示正常游戏
        {
            for(var i  =  0;i < MjClient.colloctionCurrentSelcetUIArray.length;i++)
            {
                cc.log("1111当前变灰的牌" + MjClient.colloctionCurrentSelcetUIArray[i].tag);
                cc.log("11111当前变灰的牌 DATA ：" + MjClient.colloctionCurrentSelcetUIArray[i].getUserData());
            }

            var _data = getCheckAndDel(MjClient.colloctionCardsUIArray,MjClient.colloctionCurrentSelcetUIArray)
            MjClient.colloctionCardsUIArray = _data.UIData;
            MjClient.colloctionCardsArray = _data.IDData;
        }



        cc.log(" 1111MjClient.colloctionCardsArray  = " + JSON.stringify(MjClient.colloctionCardsArray));

        // for(var i  =  0;i < MjClient.colloctionCardsUIArray.length;i++)
        // {
        //     var _colloctionUICards = MjClient.colloctionCardsUIArray[i];
        //     for(var j = 0;j < _colloctionUICards.length;j++) {
        //         cc.log("77777理牌堆里面的牌：" + _colloctionUICards[j].tag);
        //         cc.log("77777T理牌堆里面的牌 DATA ：" + _colloctionUICards[j].getUserData());
        //     }
        // }
        // // //利好的牌
        // for(var i  =  0;i < MjClient.colloctionCurrentSelcetUIArray.length;i++)
        // {
        //     var _colloctionUICards = MjClient.colloctionCurrentSelcetUIArray[i];
        //     for(var j = 0;j < _colloctionUICards.length;j++) {
        //         cc.log("当前变灰的牌" + _colloctionUICards[j].tag);
        //         cc.log("当前变灰的牌 DATA ：" + _colloctionUICards[j].getUserData());
        //     }
        // }

		// by cyc, 修正因网络延迟，从手牌中移除打出去的牌不准确的bug.
        for (var i = 0; i < putCards.length; i++)
        {
            cc.log("从手牌中移除打出去的牌：" + putCards[i]);
            RemoveNodeBack(node, "mjhand", 1, putCards[i])
        }
		/* 注掉 by cyc
		for(var i =  0;i <MjClient.colloctionCurrentSelcetUIArray.length;i++ )
        {
           cc.log("MjClient.colloctionCurrentSelcetUIArray tag = " +  MjClient.colloctionCurrentSelcetUIArray[i].tag);
            RemoveCardByUINode(MjClient.colloctionCurrentSelcetUIArray[i]);
        }
		*/
    }

    for(var i = 0; i < putCards.length;i++)
    {
        //打出去的牌,添加的牌桌上
        var out = _deskCard.clone();

        if(MjClient.rePlayVideo == -1)// 表示正常游戏
        {   
            if (MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE)
                out.setScale(out.getScale()*1.3);
        }
        else
        {
            out.setScale(out.getScale()*1);
        }

        out.visible = true;
        out.name = "out";

        setCardSprite_card(out,putCards[i], 0,true);
        node.addChild(out);
        // 掂坨扑克要求缩小
        if(MjClient.gameType == MjClient.GAME_TYPE.DIAN_TUO)
            out.setScale(0.5 * MjClient.size.height / 720);

        if(UIoff == 0)//只有自己有手牌
        {
            /* 注掉 by cyc 上边已经移除过了
            cc.log("putCards[i] = " + putCards[i]);
            //移除手牌，打出去的牌.播放录像的时候用
            if(MjClient.rePlayVideo != -1)
            {
                RemoveNodeBack(node, "mjhand", 1, putCards[i]);
            }
            */
        }
        else
        {
            if(MjClient.rePlayVideo != -1)
            {
                cc.log(UIoff + "打出去桌子的牌 = " + JSON.stringify(putCards));
                //其他人手牌，为了支持回放功能
                RemoveNodeBack(node, "mjhand_replay", 1, putCards[i]);
            }
            else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
                MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI || 
                MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K) {
                //其他人明牌

                var player = getUIPlayer(UIoff)
                if (player && player.isMingCard)
                    RemoveNodeBack(node, "mjhand_ming", 1, putCards[i]);
            }
        }
    }

    cc.log("=====lastPutCards" + lastPutCards);


    //cc.log("打出去桌子的牌 = " + putCards.length);
    //排序牌桌上的牌
    if(putCards.length > 0)
    {
        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU && MjClient.gameType != MjClient.GAME_TYPE.WU_XUE_GE_BAN)
        {
            setDiZhuCards(UIoff);
        }

        if( MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
            MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN || MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K){
            setHongPaiIcon(UIoff);
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG){
            setBaoPaiIcon(UIoff);
        }

        MjClient.playui.CardLayoutDesk(node, putCards, UIoff);
    }

    //排序手牌
    if(putCards.length > 0)
    {
        // if(IsTurnToMe() && tData.tState == TableState.waitPut)
        // {
        //     cc.log("------排序手牌------- ");
        //     MjClient.playui.CardLayoutRestore(node, UIoff);
        // }

        MjClient.playui.CardLayoutRestore(node, UIoff);
    }
    //播放出牌牌型动画
    if (!noPlayEffect)
        (MjClient.data.c_Data && MjClient.data.c_Data.bTxtAnim) ? playCardAni_txtsprite(putCards,UIoff) : playCardAni(putCards,UIoff);
}

//显示当前打出在牌桌上的牌
function showCurrentPutCardAndLayoutNew(UIoff,noPlayEffect) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var node = getNode_cards(UIoff);
    var deskCard = node.getChildByName("deskCard");
    var putCards = tData.lastPutCard;
    if (!putCards)
        return;

    if (UIoff == 0) {
        if (MjClient.rePlayVideo == -1) // 表示正常游戏
        {
            var _data = getCheckAndDel(MjClient.colloctionCardsUIArray, MjClient.colloctionCurrentSelcetUIArray)
            MjClient.colloctionCardsUIArray = _data.UIData;
            MjClient.colloctionCardsArray = _data.IDData;
        }
    }

    if (putCards.length <= 0)
        return;

    var putNodes = [];
    for (var i = 0; i < putCards.length; i++) {
        //打出去的牌,添加的牌桌上
        var out = deskCard.clone();

        if (MjClient.rePlayVideo == -1) // 表示正常游戏
        {
            if (MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE)
                out.setScale(out.getScale()*1.3);
        } else {
            out.setScale(out.getScale() * 1);
        }
        out.visible = true;
        out.name = "out";

        setCardSprite_card(out, putCards[i], 0, true);
        node.addChild(out);
        putNodes.push(out);
        // 掂坨扑克要求缩小
        if(MjClient.gameType == MjClient.GAME_TYPE.DIAN_TUO)
            out.setScale(0.5 * MjClient.size.height / 720);
    }

    //排序牌桌上的牌
    if (MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_TY ||
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY ||
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_QC ||
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT)
        setDiZhuCards(UIoff);

    MjClient.playui.CardLayoutDesk(node, putCards, UIoff);

    var putHandNodes = [];
    if (UIoff == 0)
        putHandNodes = findNodesBack(node, "mjhand", putCards);
    else if (MjClient.rePlayVideo != -1)
        putHandNodes = findNodesBack(node, "mjhand_replay", putCards);
    else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
        MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
        MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
        MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K)
        putHandNodes = findNodesBack(node, "mjhand_ming", putCards);

    //播放出牌牌型动画 这一行必须放在playPKPutAni前面
    if (!noPlayEffect)
        (MjClient.data.c_Data && MjClient.data.c_Data.bTxtAnim) ? playCardAni_txtsprite(putCards,UIoff) : playCardAni(putCards,UIoff);

    if (putHandNodes.length != putNodes.length)
    {
        //容错处理
        var putHandNode = putHandNodes.shift();
        while (putHandNode) {
            putHandNode.removeFromParent();
            putHandNode = putHandNodes.shift();
        }
        MjClient.playui.CardLayoutRestore(node, UIoff);

        return;
    }

    // 让“out”结点移动
    var outPostions = [];
    var outScale = null;
    for (var i = 0; i < putNodes.length; i++) {
        if (!outScale)
            outScale = putNodes[i].getScale();

        outPostions.push(putNodes[i].getPosition());
        
        putNodes[i].setScale(putHandNodes[i].getScale());
        putNodes[i].setPosition(putHandNodes[i].getPosition());
        putHandNodes[i].removeFromParent();
    }
    putHandNodes = null;

    playPKPutAni(UIoff, outPostions, putNodes, putCards, outScale);
}

function playPKPutAni(UIoff, targetsPostions, putNodes, putCards, targetScale) {
    var node = getNode_cards(UIoff);
    var x1 = 0;
    var x2 = 0;
    for (var i = 0; i < targetsPostions.length; i++) {
        if (targetsPostions[i].x < x1 || x1 == 0)
            x1 = targetsPostions[i].x;
        if (targetsPostions[i].x > x2 || x2 == 0)
            x2 = targetsPostions[i].x;
    }

    var speed = 0.8;
    var scale = Math.min(MjClient.size.width/1280, MjClient.size.height/720);
    if (UIoff == 0) {
        var centerX = (x1 + x2) / 2;
        var offset = putCards.length <= 2 ? 0 : 20 * scale / (x2 - centerX);
        var time1 = offset == 0 ? 0.15 * speed : 0.2 * speed;

        function func(destP, putNode, index) {
            var toX = offset == 0 ? destP.x : centerX;
            var subTime = (putCards.length/2 - Math.abs(putCards.length/2 - index)) * 0.05;
            putNode.runAction(cc.sequence(
                cc.spawn(
                    cc.moveTo(time1, cc.p(toX, destP.y)),
                    cc.scaleTo(time1, targetScale)
                ),
                cc.callFunc(function() {
                    putNode.zIndex = destP.x - destP.x % 1;
                }),
                cc.spawn(
                    cc.moveTo((0.07 * putCards.length - subTime) * speed, cc.p(centerX - (centerX - destP.x) * (1 + offset), destP.y)),
                    cc.delayTime(0.07 * putCards.length * speed)
                ),
                cc.moveTo(0.03 * putCards.length * speed, cc.p(destP.x, destP.y))
            ));
        }

        for (var i = 0; i < targetsPostions.length; i++) {
            func(targetsPostions[i], putNodes[i], i);
        }
    } else if (UIoff == 1) {
        var offset = putCards.length <= 2 ? 0 : 20 * scale / (x2 - x1);
        var time1 = offset == 0 ? 0.15 * speed : 0.2 * speed;

        function func(destP, putNode, index ) {
            putNode.setPosition(node.getChildByName("head").getPosition());
            //putNode.zIndex = 1;
            
            var toX = offset == 0 ? destP.x : x2;
            var subTime = index * 0.05;
            putNode.runAction(cc.sequence(
                cc.spawn(
                    cc.moveTo(time1, cc.p(toX, destP.y)),
                    cc.scaleTo(time1, targetScale),
                    cc.fadeTo(time1, 255)
                ),
                cc.spawn(
                    cc.moveTo((0.07 * putCards.length - subTime) * speed, cc.p(x2 - (x2 - destP.x) * (1 + offset), destP.y)),
                    cc.delayTime(0.07 * putCards.length * speed)
                ),
                cc.moveTo(0.03 * speed * putCards.length, cc.p(destP.x, destP.y)),
                cc.callFunc(function() {
                    //putNode.zIndex = 0;
                })
            ));
            putNode.setScale(targetScale * 0.2);
            putNode.setOpacity(128);
        }

        for (var i = 0; i < targetsPostions.length; i++) {
            func(targetsPostions[i], putNodes[i], i);
        }
    } else if (UIoff == 2) {
        var offset = putCards.length <= 2 ? 0 : 20 * scale / (x2 - x1);
        var time1 = offset == 0 ? 0.15 * speed : 0.2 * speed;

        function func(destP, putNode, index) {
            putNode.setPosition(node.getChildByName("head").getPosition());
            //putNode.zIndex = 1;
            
            var toX = offset == 0 ? destP.x : x1;
            var subTime = (putCards.length - index) * 0.05;
            putNode.runAction(cc.sequence(
                cc.spawn(
                    cc.moveTo(time1, cc.p(toX, destP.y)),
                    cc.scaleTo(time1, targetScale),
                    cc.fadeTo(time1, 255)
                ),
                cc.spawn(
                    cc.moveTo((0.07 * putCards.length - subTime) * speed, cc.p(x1 - (x1 - destP.x) * (1 + offset), destP.y)),
                    cc.delayTime(0.07 * putCards.length * speed)
                ),
                cc.moveTo(0.03 * speed * putCards.length, cc.p(destP.x, destP.y)),
                cc.callFunc(function() {
                    //putNode.zIndex = 0;
                })
            ));
            putNode.setScale(targetScale * 0.2);
            putNode.setOpacity(128);
        }

        for (var i = 0; i < targetsPostions.length; i++) {
            func(targetsPostions[i], putNodes[i], i);
        }
    }

    var children = node.children;
    var handNodes = [];
    for (var i = 0; i < children.length; i++) {
        var ci = children[i];
        if (ci.name == "mjhand" || ci.name == "mjhand_replay" || ci.name == "mjhand_ming")
            handNodes.push({node: ci, p: ci.getPosition()});
    }

    //排序手牌
    MjClient.playui.CardLayoutRestore(node, UIoff);

    for (var i = 0; i < handNodes.length; i++) {
        var handNode = handNodes[i].node;
        var p2 = handNode.getPosition();
        handNode.setPosition(handNodes[i].p);
        handNode.runAction(cc.moveTo(0.15 * speed, p2));
    }
}



//断线重连显示牌
function reconnectShowCurrentPutCardAndLayout(UIOff)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var node = getNode_cards(UIOff);
    var lastPutCards = tData.lastPutCard;
    var _deskCard = node.getChildByName("deskCard");
    var putCards = lastPutCards;
    if(!putCards)
    {
        return;
    }

    for(var i = 0; i < putCards.length;i++)
    {
        //打出去的牌,添加的牌桌上
        var out = _deskCard.clone();
        if (MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE)
        {
            out.setScale(out.getScale()*1.3);
        }

        out.visible = true;
        out.name = "out";
        //cc.log("打出去桌子的牌 = " + JSON.stringify(putCards));
        setCardSprite_card(out,putCards[i], 0,true);
        if(MjClient.gameType == MjClient.GAME_TYPE.DIAN_TUO)
            out.setScale(0.5 * MjClient.size.height / 720);
        node.addChild(out);
    }

    //cc.log("打出去桌子的牌 = " + putCards.length);


    //排序手牌
    if(putCards.length > 0)
    {
        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU && MjClient.gameType != MjClient.GAME_TYPE.WU_XUE_GE_BAN)
        {
            setDiZhuCards(UIOff);
        }

        if( MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
            MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN || MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K){
            setHongPaiIcon(UIOff);
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG){
            setBaoPaiIcon(UIOff);
        }

        MjClient.playui.CardLayoutRestore(node, UIOff);
    }

    if (GameClass[MjClient.gameType] != MjClient.GAME_CLASS.PAO_DE_KUAI &&
        GameClass[MjClient.gameType] != MjClient.GAME_CLASS.DOU_DI_ZHU &&
        MjClient.gameType != MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI &&
        MjClient.gameType != MjClient.GAME_TYPE.SAN_DA_HA &&
        MjClient.gameType != MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO &&
        MjClient.gameType != MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA &&
        MjClient.gameType != MjClient.GAME_TYPE.SAN_DA_HA_NEW &&
        MjClient.gameType != MjClient.GAME_TYPE.LV_LIANG_DA_QI &&
        MjClient.gameType != MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN &&
        MjClient.gameType != MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER &&
        MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA && 
        MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE && 
        MjClient.gameType != MjClient.GAME_TYPE.CHONG_YANG_DA_GUN &&
        MjClient.gameType != MjClient.GAME_TYPE.DA_YE_DA_GONG &&
        MjClient.gameType != MjClient.GAME_TYPE.TONG_SHAN_DA_GONG &&
        MjClient.gameType != MjClient.GAME_TYPE.DA_YE_510K &&
        MjClient.gameType != MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN &&
        MjClient.gameType != MjClient.GAME_TYPE.WU_XUE_510K &&
        MjClient.gameType != MjClient.GAME_TYPE.QI_CHUN_DA_GONG &&
        MjClient.gameType != MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI)
    {
        //检查同花顺
        checkTongHuaShun();
    }

    //排序牌桌上的牌
    if(putCards.length > 0)
    {
        MjClient.playui.CardLayoutDesk(node, putCards, UIOff);
    }
}
//剩余牌的张数
function currentLeftCardCount(UIoff,clientOut)
{
    if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA ||
        MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI ||
        MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN ||
        MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER)
        return;

    if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI ||
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HA ||
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT ||
        MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN
        )
    {
        return currentLeftCardCount_paodekuai(UIoff,clientOut);
    }
    else if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_TY ||
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY ||

        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_QC )
    {
        return currentLeftCardCount_TY(UIoff);
    }
    else if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_JZ||
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO||
            MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG||
        MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI||
            MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU || 
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ)
    {
        return currentLeftCardCount_JZ(UIoff);
    }
    else if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN)
    {
        return currentLeftCardCount_LF(UIoff);
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
        MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI || 
        MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
        MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K)
        return currentLeftCardCount_NiuShiBie(UIoff,clientOut);

    var node = getNode_cards(UIoff);
    if(UIoff != 0)//自己不需要显示张数
    {
        var _countNode = node.getChildByName("head").getChildByName("tingCard").getChildByName("Text_count");
        cc.log("===================================================剩余张数----- ");
        var pl = getUIPlayer(UIoff);
        if((pl.handCount || pl.handCount == 0) && _countNode)
        {
            node.getChildByName("head").getChildByName("tingCard").visible = true;
            //cc.log("pl.mjhand.length = " + pl.handCount);
            _countNode.setString(pl.handCount);
        }
    }
}

//剩余牌的张数
function currentLeftCardCount_chongYangDaGun(UIoff, clientOut, needShowCount)
{
    var node = getNode_cards(UIoff);
    if(UIoff == 0)//自己不需要显示
        return;

    var countNode = node.getChildByName("head").getChildByName("tingCard");
    if (!countNode)
        return;

    if(!clientOut)
        return;

    var pl = getUIPlayer(UIoff);
    var sData = MjClient.data.sData;
    var tData = MjClient.data.sData.tData;
    if (!pl || !pl.handCount || pl.handCount <= 0 || sData.tData.zhuang == -1)
    {
        countNode.visible = false;
        return;
    }

    cc.log("pl.handCount = " + pl.handCount);
    var textCount = countNode.getChildByName("textCount");
    var alarm = countNode.getChildByName("alarm")
    var count = needShowCount ? needShowCount : 5;
    // 警报
    if (pl.handCount <= count)
    {
        countNode.visible = true;

        textCount.setString(pl.handCount);

        var shining = countNode.getChildByName("alarm").getChildByName("shining");

        if (!shining.getActionByTag(51839)) {
            var fadeAction = cc.sequence(cc.FadeIn(0.6), cc.FadeOut(0.6)).repeatForever();
            fadeAction.setTag(51839);
            shining.runAction(fadeAction);
        }
    } else{
        countNode.visible = false;
    }

    if(tData.areaSelectMode.showHandCount){

        countNode.visible = true;
        alarm.visible = pl.handCount <= count ? true : false;
        textCount.visible = true;

        textCount.setString(pl.handCount);
    }
}

//剩余牌的张数
function currentLeftCardCount_paodekuai(UIoff,clientOut)
{
    var pl = getUIPlayer(UIoff);
    var sData = MjClient.data.sData;

    var tData = MjClient.data.sData.tData;
    var needHide = false;
    
    if( MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN && !tData.areaSelectMode.showHandCount){
        needHide = true;
    }

    //自己不需要显示张数
    if(UIoff == 0) {
        // 跑得快特殊处理
        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI || MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN) {

            var _sprite_single = MjClient.playui._spriteSingle;
            if (!pl || !pl.handCount || pl.handCount <= 0 )
            {
                _sprite_single.visible = false;
                return;
            }

            var _leftRet = pl.handCount == 1;
            if(MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN){

                _leftRet = pl.handCount == 1;
            }
            _sprite_single.visible = clientOut ? pl.mjhand.length - sData.tData.lastPutCard.length == 1 : _leftRet;

            if (_sprite_single.visible) {
                var shining = _sprite_single.getChildByName("shining");
                var alarm = _sprite_single.getChildByName("alarm");

                if (!shining.getActionByTag(51839)) {
                    var fadeAction = cc.sequence(cc.FadeIn(0.6), cc.FadeOut(0.6)).repeatForever();
                    fadeAction.setTag(51839);
                    shining.runAction(fadeAction);

                    var rotateAction = cc.sequence(cc.RotateTo(0.4,-15), cc.RotateTo(0.4,0)).repeatForever();
                    alarm.runAction(rotateAction);
                }
            }
        }

        return;
    }


    var node = getNode_cards(UIoff);

    var _countNode = node.getChildByName("head").getChildByName("tingCard");
    if (!_countNode)
        return;

    if (!pl || !pl.handCount || pl.handCount < 0 )
    {
        _countNode.visible = false;
        return;
    }

    _countNode.visible = true;

    var showCardNumber = null;
    if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI) {
        showCardNumber = sData.tData.areaSelectMode.showCardNumber;
    } else {
        showCardNumber = 20;
        if (sData.tData.areaSelectMode.showCardNumber) { // by sking
            showCardNumber = sData.tData.areaSelectMode.showCardNumber;
        }
    }

    var _unKnow = _countNode.getChildByName("unKnow");
    var _sprite_single = _countNode.getChildByName("sprite_single");
    var _Text_count = _countNode.getChildByName("Text_count");
    _Text_count.visible = true;

    //没有确定地主之前不用显示张数
    if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU)
    {
        var tData = sData.tData;
        if(tData.zhuang === -1)
        {
            _sprite_single.visible = false;
            _unKnow.visible = false;
            _Text_count.visible = false;
            return;
        }
    }

    _Text_count.visible = showCardNumber || pl.handCount <= 1;

    

    if (showCardNumber || pl.handCount <= 1)
    {
        _Text_count.setString(pl.handCount);
    }


    var _showWuXueGeBan = false;
    if(MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN ){
        if(pl.handCount <= 1){
            _showWuXueGeBan = true;
        }else{
            if(!tData.areaSelectMode.showHandCount){
                _countNode.visible = false;
            }
        }
        
    }
    // 报单
    if ( pl.handCount == 1 && (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI || 
        (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU && MjClient.gameType != MjClient.GAME_TYPE.WU_XUE_GE_BAN))  
        || _showWuXueGeBan )
    {
        _unKnow.visible = !_Text_count.visible;

        // 跑得快特殊处理
        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI || _showWuXueGeBan) {
            _sprite_single.visible = true;

            // 跑得快特殊处理
            var shining = _sprite_single.getChildByName("shining");
            var alarm = _sprite_single.getChildByName("alarm");

            if (!shining.getActionByTag(51839)) {
                var fadeAction = cc.sequence(cc.FadeIn(0.6), cc.FadeOut(0.6)).repeatForever();
                fadeAction.setTag(51839);
                shining.runAction(fadeAction);

                var rotateAction = cc.sequence(cc.RotateTo(0.4,-15), cc.RotateTo(0.4,0)).repeatForever();
                alarm.runAction(rotateAction);
            }
        } else {
            var func1 = function() {

                _sprite_single.setTexture("playing/paodekuaiTable/baodan.png");
            }
            var func2 = function() {
                _sprite_single.setTexture("playing/paodekuaiTable/baodan_s.png");
            }

            if(! _sprite_single.visible){
                _sprite_single.visible = pl.handCount == 1;
                _sprite_single.runAction(cc.repeatForever(
                    cc.sequence(cc.callFunc(func1, _sprite_single), cc.delayTime(0.5), cc.callFunc(func2, _sprite_single), cc.delayTime(0.5))));
            }
        }
    }
    else {
        _sprite_single.visible = false;
        _unKnow.visible = false;
    }
}

function currentLeftCardCount_TY(UIoff)
{
    var node = getNode_cards(UIoff);
    if(UIoff == 0)//自己不需要显示张数
        return;
    var _countNode = node.getChildByName("head").getChildByName("tingCard");
    if (!_countNode)
        return;

    var pl = getUIPlayer(UIoff);
    var sData = MjClient.data.sData;
    if (!pl || !pl.handCount || pl.handCount <= 0 || sData.tData.zhuang == -1)
    {
        _countNode.visible = false;
        return;
    }

    _countNode.visible = true;

    var showCardNumber = 20;//MjClient.data.sData.tData.areaSelectMode.showCardNumber;

    var _unKnow = _countNode.getChildByName("unKnow");
    var _sprite_single = _countNode.getChildByName("sprite_single");
    _sprite_single.visible = false;
    var _Text_count = _countNode.getChildByName("Text_count");

    _Text_count.visible = showCardNumber || pl.handCount <= 1;

    var tData = MjClient.data.sData.tData;
    if(tData.areaSelectMode.showHandCount)
    {
        _Text_count.setString(pl.handCount);
        _unKnow.visible = false;
    }
    else {
        _unKnow.visible = true;
        _Text_count.visible = false;
    }


    // 报单
    if (pl.handCount == 1)
    {
        _sprite_single.visible = pl.handCount == 1;
        _unKnow.visible = !_Text_count.visible;

        var func1 = function() {

            _sprite_single.setTexture("playing/paodekuaiTable/baodan.png");
        }
        var func2 = function() {
            _sprite_single.setTexture("playing/paodekuaiTable/baodan_s.png");
        }
        _sprite_single.runAction(cc.repeatForever(
            cc.sequence(cc.callFunc(func1, _sprite_single), cc.delayTime(0.5), cc.callFunc(func2, _sprite_single), cc.delayTime(0.5))));
    }
}

function currentLeftCardCount_JZ(UIoff)
{
    var node = getNode_cards(UIoff);
    if(UIoff == 0)//自己不需要显示张数
        return;

    var _countNode = node.getChildByName("head").getChildByName("tingCard");
    if (!_countNode)
        return;

    var pl = getUIPlayer(UIoff);
    var sData = MjClient.data.sData;
    if (!pl || !pl.handCount || pl.handCount <= 0 || sData.tData.zhuang == -1)
    {
        _countNode.visible = false;
        return;
    }

    _countNode.visible = true;

    var showCardNumber = 20;//MjClient.data.sData.tData.areaSelectMode.showCardNumber;

    var _unKnow = _countNode.getChildByName("unKnow");
    var _sprite_single = _countNode.getChildByName("sprite_single");
    _sprite_single.visible = false;
    var _Text_count = _countNode.getChildByName("Text_count");

    _Text_count.visible = showCardNumber || pl.handCount <= 1;

    var tData = MjClient.data.sData.tData;
    _Text_count.setString(pl.handCount);
    _unKnow.visible = false;
    _Text_count.visible = true;

    cc.log("------------_Text_count------");

    // 报单
    if (pl.handCount == 1)
    {
        _sprite_single.visible = pl.handCount == 1;
        _unKnow.visible = !_Text_count.visible;

        var func1 = function() {

            _sprite_single.setTexture("playing/paodekuaiTable/baodan.png");
        }
        var func2 = function() {
            _sprite_single.setTexture("playing/paodekuaiTable/baodan_s.png");
        }
        _sprite_single.runAction(cc.repeatForever(
            cc.sequence(cc.callFunc(func1, _sprite_single), cc.delayTime(0.5), cc.callFunc(func2, _sprite_single), cc.delayTime(0.5))));
    }
}

function currentLeftCardCount_LF(UIoff)
{
    var node = getNode_cards(UIoff);
    if(UIoff == 0)//自己不需要显示张数
        return;

    var _countNode = node.getChildByName("head").getChildByName("tingCard");
    if (!_countNode)
        return;

    var pl = getUIPlayer(UIoff);
    var sData = MjClient.data.sData;
    if (!pl || !pl.handCount || pl.handCount <= 0 || sData.tData.zhuang == -1)
    {
        _countNode.visible = false;
        return;
    }

    _countNode.visible = true;

    var showCardNumber = 20;//MjClient.data.sData.tData.areaSelectMode.showCardNumber;

    var _unKnow = _countNode.getChildByName("unKnow");
    var _sprite_single = _countNode.getChildByName("sprite_single");
    _sprite_single.visible = false;
    var _Text_count = _countNode.getChildByName("Text_count");

    _Text_count.visible = showCardNumber || pl.handCount <= 1;

    var tData = MjClient.data.sData.tData;
    _Text_count.setString(pl.handCount);
    _unKnow.visible = false;
    _Text_count.visible = true;

    cc.log("------------_Text_count------");

    // 报单
    if (pl.handCount == 1)
    {
        _sprite_single.visible = pl.handCount == 1;
        _unKnow.visible = !_Text_count.visible;

        var func1 = function() {

            _sprite_single.setTexture("playing/paodekuaiTable/baodan.png");
        }
        var func2 = function() {
            _sprite_single.setTexture("playing/paodekuaiTable/baodan_s.png");
        }
        _sprite_single.runAction(cc.repeatForever(
            cc.sequence(cc.callFunc(func1, _sprite_single), cc.delayTime(0.5), cc.callFunc(func2, _sprite_single), cc.delayTime(0.5))));
    }
}

function currentLeftCardCount_NiuShiBie(UIoff)
{
    if(MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K){
        currentLeftCardCount_chongYangDaGun(UIoff, true)
        return;
    }
    if(MjClient.gameType ===  MjClient.GAME_TYPE.WU_XUE_510K) {
        var tData = MjClient.data.sData.tData;
        var isOpenAlarm = tData.areaSelectMode.baoJing;
        return currentLeftCardCount_chongYangDaGun(UIoff, isOpenAlarm, 2);
    }
    if(MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN){
        currentLeftCardCount_chongYangDaGun(UIoff, true, 2);
        return;
    }
    var node = getNode_cards(UIoff);
    if(UIoff == 0)//自己不需要显示
        return;

    var countNode = node.getChildByName("head").getChildByName("tingCard");
    if (!countNode)
        return;

    var pl = getUIPlayer(UIoff);
    var sData = MjClient.data.sData;
    if (!pl || !pl.handCount || pl.handCount <= 0 || sData.tData.zhuang == -1)
    {
        countNode.visible = false;
        return;
    }

    cc.log("pl.handCount = " + pl.handCount);

    // 警报
    if (pl.handCount <= 5)
    {
        countNode.visible = true;

        countNode.getChildByName("textCount").setString(pl.handCount);

        var shining = countNode.getChildByName("alarm").getChildByName("shining");

        if (!shining.getActionByTag(51839)) {
            var fadeAction = cc.sequence(cc.FadeIn(0.6), cc.FadeOut(0.6)).repeatForever();
            fadeAction.setTag(51839);
            shining.runAction(fadeAction);
        }
    } else
        countNode.visible = false;
}

//获取UIoff的位置 0 ，1， 2，3
function card_getUiOffByUid(uid,uids)
{
    var selfIndex = uids.indexOf(SelfUid());
    var targetIndex = uids.indexOf(uid);
    return (targetIndex - selfIndex + MjClient.MaxPlayerNum) % MjClient.MaxPlayerNum;
}

//换座位
function changePositionByUIoff(fromOff,ToPos)
{
    var _fromNode = getNode_cards(fromOff).getChildByName("head");
    var _fromZoder = _fromNode.zIndex;
    //_fromNode.zIndex = 500;

    var seq1 = cc.sequence(cc.moveTo(0.2,ToPos), cc.callFunc(function () {
        _fromNode.zIndex = _fromZoder;
    }));
    _fromNode.runAction(seq1);
}


//重置四个玩家的位置
function resetPlayerHead()
{
    cc.log("重置头像信息位置");
    for(var off = 0;off < MjClient.MaxPlayerNum;off++)
    {
        var node = getNode_cards(off);
        var pl = getUIPlayer(off);

        if(!pl)
        {
            return;
        }
        //初始化玩家金币和名称
        // InitUserCoinAndName(node, off);
        if(off != 0)
        {
            if (GameClass[MjClient.gameType] != MjClient.GAME_CLASS.DOU_DI_ZHU)
            {
                currentLeftCardCount(off);
            }

            // 搞不懂为啥要调用团团转的函数？
            //SetUserVisible_tuantuanzhuan(node, off)

            if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE)
                SetUserVisible_NiuShiBieYueYang(node, off)
            else if (MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI)
                SetUserVisible_DaMaZiZhuZhou(node, off)
            else if (MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN)
                SetUserVisible_ChongYangDaGun(node, off)
            else if(MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG)
                SetUserVisible_DaYeDaGun(node, off)
            else if(MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG)
                SetUserVisible_TongShanDaGong(node, off)
            else if (MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG)
                SetUserVisible_QiChunDaGong(node, off)
            else if (MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K)
                SetUserVisible_DaYe510K(node, off)
            else if (MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN)
                SetUserVisible_QianJiangQianFen(node, off)
            else if (MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K)
                SetUserVisible_wuXue510K(node, off)
            else
                SetUserVisible_tuantuanzhuan(node, off)
        }

        //重置房主
        showFangzhuTagIcon(node.getChildByName("head"),off)

        //回放的时候需要刷新手牌
        if(MjClient.rePlayVideo != -1)
        {
            refreshHandCardForReplay(off);
        }
    }

    reConectHeadLayout_card(node.parent);

    if (GameClass[MjClient.gameType] != MjClient.GAME_CLASS.PAO_DE_KUAI &&
        GameClass[MjClient.gameType] != MjClient.GAME_CLASS.DOU_DI_ZHU && 
        MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE && 
        MjClient.gameType != MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI &&
        MjClient.gameType != MjClient.GAME_TYPE.QI_CHUN_DA_GONG &&
        MjClient.gameType != MjClient.GAME_TYPE.DA_YE_510K &&
        MjClient.gameType != MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN &&
        MjClient.gameType != MjClient.GAME_TYPE.WU_XUE_510K &&
        MjClient.gameType != MjClient.GAME_TYPE.TONG_SHAN_DA_GONG &&
        MjClient.gameType != MjClient.GAME_TYPE.DA_YE_DA_GONG &&
        MjClient.gameType != MjClient.GAME_TYPE.CHONG_YANG_DA_GUN )
    {
        //重新刷新中间的四个位置，东南西北
        setArrowFengDir(node.parent.getChildByName("arrowbk"));
    }
}

//开始打牌前的抽一张牌的翻滚动画
function cardRollAction(selectCard,cb)
{
    var _time = 0.1;
    var cardMsg =  selectCard;

    setCardSprite_card(MjClient.playui._positionCard,cardMsg, 0);

    var _scale = MjClient.playui._positionCard.getScale();
    var a1 = cc.scaleTo(_time,0,_scale*1);
    var calfuc1 = cc.callFunc(function(){
        MjClient.playui._positionCard.loadTexture("playing/cardPic/baidi_puke.png")
        var children = MjClient.playui._positionCard.children;
        for (var i = 0; i < children.length; i++)
        {
            var ni = children[i];
            ni.visible = true;
        }
    });

    var a2 = cc.scaleTo(_time,_scale*1,_scale*1);
    var a3 = cc.scaleTo(_time,0,_scale*1);
    var calfuc2 = cc.callFunc(function(){
        MjClient.playui._positionCard.loadTexture("playing/cardPic/beimian_puke.png")
        var children = MjClient.playui._positionCard.children;
        for (var i = 0; i < children.length; i++)
        {
            var ni = children[i];
            ni.visible = false;
        }
    });

    var calfucEnd = cc.callFunc(function(){
        MjClient.playui._positionCard.loadTexture("playing/cardPic/baidi_puke.png")
        var children = MjClient.playui._positionCard.children;
        for (var i = 0; i < children.length; i++)
        {
            var ni = children[i];
            ni.visible = true;
        }
    });

    var a4 = cc.scaleTo(_time,_scale*1,_scale*1);
    var seq = cc.sequence(a1,calfuc1,a2,a3,calfuc2,a4).repeat(1);

    var seqEnd = cc.sequence(seq,a3,calfucEnd,a2,cc.delayTime(1),cc.callFunc(function(){
        if(cb) cb();
        MjClient.playui._positionCard.visible = false;
    }));
    MjClient.playui._positionCard.runAction(seqEnd);
}

//出牌提示
function putOutCardTips(delDaipai)//delDaipai提示时是否不提示带牌
{
    var tData = MjClient.data.sData.tData;
    if(cc.isUndefined(MjClient.tipCardsArray))
    {
        MjClient.selectCards_card = [];
        if(MjClient.sortClassType == 0) {
            setCardToNormalPos();
        }
        else {
            setCardToNormalColor();
        }
        return 0;
    }

    var tipsLength = MjClient.tipCardsArray.length;
    if(tipsLength <= 0)
    {
        MjClient.selectCards_card = [];
        if(MjClient.sortClassType == 0) {
            setCardToNormalPos();
        }
        else {
            setCardToNormalColor();
        }
        return tipsLength;
    }


    if(MjClient.tipsIdx < 0 || MjClient.tipsIdx >= tipsLength || !MjClient.tipCardsArray[MjClient.tipsIdx])
    {
        MjClient.tipsIdx = 0;
    }
    var tipsCardArray = MjClient.tipCardsArray[MjClient.tipsIdx].slice();
    if (delDaipai && MjClient.majiang.delDaipai)//是否去掉带牌
        tipsCardArray = MjClient.majiang.delDaipai(tipsCardArray, tData.areaSelectMode);

    selectUICards(tipsCardArray);
    //待出的牌
    MjClient.selectCards_card = tipsCardArray;//MjClient.tipCardsArray[MjClient.tipsIdx].slice();
    cc.log("------MjClient.selectCards_card----- = "+ JSON.stringify(MjClient.selectCards_card));

    if( (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI) && 
        (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) ){

        if (tData.areaSelectMode && tData.areaSelectMode.zhaDanBuChai && MjClient.majiang.isZhaDan(tipsCardArray, tData.areaSelectMode) ){
            MjClient.showToast("炸弹不可拆");
        }
    }

    UpdataCurrentPutCard();
    MjClient.tipsIdx++;

    return tipsLength;
}

//弹出选择的牌
function selectUICards(_tipsCardArray)
{
    cc.log("tipsCardArray selectUICards= " + JSON.stringify(_tipsCardArray));

    if (MjClient.playui.selectUICards)
        return MjClient.playui.selectUICards(_tipsCardArray);

    var tipsCardArray = _tipsCardArray.concat();

    if(!tipsCardArray)
    {
        return;
    }

    var downNode = MjClient.playui._downNode;
    var standUI = downNode.getChildByName("stand");
    var children = downNode.getChildren();
    var upSize = standUI.getSize();
    var upS = standUI.scale;
    var cardY = upSize.width * upS*1.5; //一张牌的长度
    var cardOut = parseInt(cardY/4);//点击牌弹起的高度,以前是20像素

    if(MjClient.sortClassType == 0)
    {
        setCardToNormalPos();
    }
    else
    {
        setCardToNormalColor();
    }

    MjClient.colloctionCurrentSelcetUIArray = [];


    //var _children = children.concat();

    var specialType = (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA || 
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA);

    for(var m = 0; m < children.length; m++)
    {
        for(var n = 0;n < tipsCardArray.length;n++)
        {
            if(children[m].name == "mjhand")
            {
                if(children[m].tag == tipsCardArray[n])
                {
                    if(checkUIHave(MjClient.colloctionCurrentSelcetUIArray,children[m]))
                    {
                        break;
                    }
                    tipsCardArray[n] = -1;
                    cc.log("======弹出选择的牌===== colloctionCurrentSelcetUIArray = " + children[m].tag);
                    MjClient.colloctionCurrentSelcetUIArray.push(children[m]);
                    if(MjClient.sortClassType == 0)
                    {
                        var pos = children[m].getPosition();
                        var dy = Math.round(pos.y - standUI.y);
                        if(dy < standUI.y+cardOut && specialType)
                        {
                            if(children[m].isUp) children[m].setPositionY(standUI.y*2 + cardOut);
                            else children[m].setPositionY(standUI.y + cardOut);
                            break;
                        }
                        else{
                            if(dy < cardOut)
                            {
                                children[m].setPositionY(standUI.y + cardOut);
                                break;
                            }
                        }

                    }
                    else
                    {
                        if(!children[m].isGray)
                        {
                            children[m].isGray = true;
                            children[m].setColor(MjClient.grayColor);
                        }
                    }
                }
            }
        }
    }


    // //弹出选择的牌
    // for(var n = 0;n < tipsCardArray.length;n++)
    // {
    //     for(var m = 0; m < children.length; m++)
    //     {
    //         if(children[m].name == "mjhand")
    //         {
    //             if(children[m].tag == tipsCardArray[n])
    //             {
    //                 if(checkUINodeHave(MjClient.colloctionCurrentSelcetUIArray,children[m]))
    //                 {
    //                      break;
    //                 }
    //
    //                 cc.log("======弹出选择的牌===== colloctionCurrentSelcetUIArray = " + children[m].tag);
    //
    //                 MjClient.colloctionCurrentSelcetUIArray[n] = children[m];
    //                 if(MjClient.sortClassType == 0)
    //                 {
    //                     var pos = children[m].getPosition();
    //                     var dy = Math.round(pos.y - standUI.y);
    //                     if(dy < 20)
    //                     {
    //                         children[m].setPositionY(standUI.y + 20);
    //                         break;
    //                     }
    //                 }
    //                 else
    //                 {
    //                     if(!children[m].isGray)
    //                     {
    //                         children[m].isGray = true;
    //                         children[m].setColor(MjClient.grayColor);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }






    for(var i  =  0;i < MjClient.colloctionCurrentSelcetUIArray.length;i++)
    {
        var _colloctionUICards = MjClient.colloctionCurrentSelcetUIArray[i];
        for(var j = 0;j < _colloctionUICards.length;j++) {
            cc.log("00000==当前变灰的牌" + _colloctionUICards[j].tag);
            cc.log("00000==当前变灰的牌 DATA ：" + _colloctionUICards[j].getUserData());
        }
    }

    //弹出牌的时候显示理牌按钮
    if(MjClient.playui._bg_sort)
    {
        MjClient.playui._bg_sort.getChildByName("Button_sort").visible = true;
        MjClient.isSorting = true;
    }
    //MjClient.playui.CardLayoutRestore(MjClient.playui._downNode, 0);
}

/*
    没有大过上家的牌，自动过
 */
function autoSendPass()
{
    MjClient.playui._btnPutCard.visible = false;
    MjClient.playui._btnHimt.visible = false;
    MjClient.playui._btnNoPut.visible = false;
    var delay = 1;
    var func = function() {
        PKPassConfirmToServer_card({cmd: "PKPass", autoPass: true});
        MjClient.playui.recoverCannotOutCard();
    };
    var actions = cc.sequence(cc.delayTime(delay), cc.callFunc(func));
    actions.setTag(212);
    MjClient.playui.runAction(actions);
}

//初始化提示的牌数组
function InitPutOutCardTips(off)
{
    cc.log("===InitPutOutCardTips==");

    var sData = MjClient.data.sData;
    var tData = sData.tData;

    if(IsTurnToMe() && tData.tState == TableState.waitPut)
    {
        if (tData.lastPutPlayer != tData.curPlayer)
        {
            var pl = getUIPlayer(off);
            if(!pl) return;

            if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI) {

                var pl2 = getUIPlayer(off + 1);
                var isNextPlayerOneCard = pl2 ? pl2.handCount==1 : false;
                var majiang = MjClient.majiang;
                var tData = MjClient.data.sData.tData;

                if (MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI) {
                    var selectData = {}
                    for(var i in tData.areaSelectMode) selectData[i] = tData.areaSelectMode[i];
                    var firstPutRuleNum = tData.areaSelectMode.firstPutRule;
                    if(1 == firstPutRuleNum || 3 == firstPutRuleNum) {
                        selectData.firstHeiTao3 = true;  // 必须出黑桃3
                    } else if(2 == firstPutRuleNum || 4 == firstPutRuleNum){
                        selectData.firstHeiTao3 = false; // 可以不出黑桃3
                    }

                    var isFirstRound = tData.roundAll == tData.roundNum;
                    var isSmartTip = true;
                    MjClient.tipCardsArray = majiang.tipCards(pl.mjhand, tData.lastPutCard, selectData, 
                        isNextPlayerOneCard, isFirstRound, isSmartTip);

                    if(majiang.allTipsNoOrder && !MjClient.selectTipCardsArray && MjClient.tipCardsArray.length > 0) {
                        majiang.useNewTip = true;
                        MjClient.selectTipCardsArray = majiang.findPutTipCards(pl.mjhand, tData.lastPutCard, selectData, 
                            isNextPlayerOneCard, isFirstRound, majiang.allTipsNoOrder);
                        majiang.useNewTip = false;
                    }

                }else{
                    var mustPutHongTaoSan = tData.areaSelectMode.mustPutHongTaoSan;
                    MjClient.tipCardsArray = majiang.tipCards(pl.mjhand, tData.lastPutCard, mustPutHongTaoSan, isNextPlayerOneCard, true);
                    
                    if(majiang.allTipsNoOrder && !MjClient.selectTipCardsArray && MjClient.tipCardsArray.length > 0) {
                        majiang.useNewTip = true;
                        MjClient.selectTipCardsArray = majiang.findPutTipCards(pl.mjhand, tData.lastPutCard, mustPutHongTaoSan, 
                            isNextPlayerOneCard, majiang.allTipsNoOrder);
                        majiang.useNewTip = false;
                    }
                }
            } else if (MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA || 
                MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA_NEW || MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO ||
                MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI ){
                var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
                MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, roundFirstCard, tData.zhuPaiType, 
                    tData.areaSelectMode.chou6, tData.areaSelectMode.daWuZhu27NotTuoLaJi, tData.areaSelectMode.allowTuoLaJiXiaoDui);
            }else if (MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER){
                var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
                MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, roundFirstCard, tData.zhuPaiType,tData);
            } else if (MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI){
                var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
                MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, roundFirstCard, tData.zhuPaiType);
            } else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA){
                var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
                MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, roundFirstCard, tData.zhuPaiType,tData.areaSelectMode["SAN_DA_HA_allowTuoLaJiXiaoDui"]);
            } else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
                MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI || 
                MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN ||
                MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN){
                MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, tData.lastPutCard, tData.areaSelectMode);
            } else if (MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA || 
                MjClient.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA){
                var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
                var bteshutuolaji=tData.areaSelectMode.teshutuolaji;
                var bchou6 = tData.areaSelectMode.chou6;
                MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, roundFirstCard, tData.zhuPaiType,bteshutuolaji,bchou6);
            }
            else if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA){
                var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
                MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, roundFirstCard, tData.zhuPaiType,tData.areaSelectMode["SAN_DA_HA_allowTuoLaJiXiaoDui"],tData);
            }else{
                cc.log("tipCardsArray = ....... lastPutCard = " + JSON.stringify(MjClient.majiang.tipCards(pl.mjhand, tData.lastPutCard)));
                MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, tData.lastPutCard);
            }

            MjClient.tipsIdx = 0;//提示第几组牌
            cc.log("tipCardsArray = "+ JSON.stringify(MjClient.tipCardsArray));
            cc.log("tipCardsArray = "+ MjClient.tipCardsArray.length);
            if(MjClient.tipCardsArray.length <= 0)
            {
                //开局是自己出牌时候
                if (tData.lastPutPlayer == tData.curPlayer || tData.lastPutPlayer == -1)
                {
                    if (MjClient.playui._noPutTips)
                        MjClient.playui._noPutTips.visible = false;
                }
                else
                {
                    if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
                    {
                        MjClient.playui._btnPutCard.visible = false;
                        MjClient.playui._btnHimt.visible = false;
                        MjClient.playui._btnNoPut.visible = false;

                        var delay = 0.75;
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || isJinZhongAPPType())
                            delay = 1.0;
                            
                        if ((MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || 
                            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) &&
                            !tData.areaSelectMode.mustPut /*&& getUIPlayer(0).handCount != 1*/)
                        {
                            delay = 3.0;
                        }

                        // 跑得必管模式没有牌大过上家不显示“没有牌大过上家”提示，server自动过牌，客户端也不再发送过牌请求
                        var isShouldSendPass = true;
                        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI && tData.areaSelectMode.mustPut != false){
                            delay = 0.1;
                            MjClient.playui._noPutTips.visible = false;
                            // 新增字段，某些地区服务器自动过牌还未同步
                            if (tData.hadTipCards === false){
                                isShouldSendPass = false;
                            }
                        }else{
                            MjClient.playui._noPutTips.visible = true;
                            isShouldSendPass = true;
                            //每个游戏可能需求不一样，自己在各自的InitC_Data里赋值
                            if (MjClient.data.c_Data && MjClient.data.c_Data.bMustputIsAutoPass != undefined)
                            {
                                isShouldSendPass = MjClient.data.c_Data.bMustputIsAutoPass;
                                MjClient.playui._btnPutCard.visible = !MjClient.data.c_Data.bMustputIsAutoPass;
                                MjClient.playui._btnHimt.visible = !MjClient.data.c_Data.bMustputIsAutoPass;
                                MjClient.playui._btnNoPut.visible = !MjClient.data.c_Data.bMustputIsAutoPass;
                            }
                            //非必管，要不起闹钟显示3秒
                            if (tData.areaSelectMode.mustPut == false && MjClient.playui._clock)
                            {
                                var nodeNum = MjClient.playui._clock.getChildByName("number");
                                if (nodeNum)
                                    arrowbkNumberUpdate(nodeNum, null, 3);
                            }
                        }

                        if (isShouldSendPass)
                            isShouldSendPass = (getUIPlayer(0).trust!=true);

                        if (isShouldSendPass) {
                            var func = function() {
                                PKPassConfirmToServer_card({cmd: "PKPass", autoPass: true, Opt : 1/*自动过*/});
                                MjClient.playui.recoverCannotOutCard();
                            };
                            var actions = cc.sequence(cc.delayTime(delay), cc.callFunc(func));
                            actions.setTag(212);
                            MjClient.playui.runAction(actions);
                        }else{
                            cc.log("=====not need send pass,server auto pass=====")
                        }
                    }
                    else
                    {
                        if (MjClient.playui._noPutTips)
                        {
                            MjClient.playui._noPutTips.visible = true;
                            // if(
                            //     MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG ||
                            //     MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN)
                            // {
                            //     autoSendPass();//自动过
                            // }
                        }
                    }
                }
            }else{
                if (MjClient.playui._noPutTips)
                    MjClient.playui._noPutTips.visible = false;
            }

            if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI ||
                GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA ||
                MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI ||
                MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN ||
                MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI
            )
            {
                // 跑得快必管模式没牌可压不置灰
                var isPaodekuai = GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI
                var isMustPut = tData.areaSelectMode.mustPut != false
                var isShouldMakeCardGrey = !(isPaodekuai && isMustPut && MjClient.tipCardsArray.length <= 0)
                if (isShouldMakeCardGrey){
                    MjClient.playui.cannotOutCardGrey();
                }
            }

            // 下面的注释掉了  连云港的等发牌完了以后再提牌 added by Joey
            // if (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_LYG) {
            //     var tData = MjClient.data.sData.tData;
            //     var selectData = tData.areaSelectMode;
            //     var isFirstRound = tData.roundAll == tData.roundNum;
            //     if (MjClient.majiang.isMustPutCard3 && MjClient.majiang.isMustPutCard3(pl.mjhand, selectData, isFirstRound)) {
            //         // 自动提起牌
            //         //putOutCardTips();
            //     }
            // }
        }
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
        {
            var pl = getUIPlayer(off);
            if(!pl) return;
            var pl2 = getUIPlayer(off + 1);
            var isNextPlayerOneCard = pl2 ? pl2.handCount==1 : false;
            var majiang = MjClient.majiang;
            var tData = MjClient.data.sData.tData;

            if (MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI){
                
                var selectData = {}
                for(var i in tData.areaSelectMode) selectData[i] = tData.areaSelectMode[i];
                var firstPutRuleNum = tData.areaSelectMode.firstPutRule;
                if(1 == firstPutRuleNum || 3 == firstPutRuleNum) {
                    selectData.firstHeiTao3 = true;  // 必须出黑桃3
                } else if(2 == firstPutRuleNum || 4 == firstPutRuleNum){
                    selectData.firstHeiTao3 = false; // 可以不出黑桃3
                }

                var isFirstRound = tData.roundAll == tData.roundNum;
                var isSmartTip = true;
                MjClient.tipCardsArray = majiang.tipCards(pl.mjhand, [], selectData, 
                    isNextPlayerOneCard, isFirstRound, isSmartTip);

                if(majiang.allTipsNoOrder && MjClient.tipCardsArray.length > 0 && !MjClient.selectTipCardsArray) {
                    majiang.useNewTip = true;
                    MjClient.selectTipCardsArray = majiang.findPutTipCards(pl.mjhand, [], selectData, 
                        isNextPlayerOneCard, isFirstRound, majiang.allTipsNoOrder);
                    majiang.useNewTip = false;
                }

            }else{
                var mustPutHongTaoSan = tData.areaSelectMode.mustPutHongTaoSan;
                MjClient.tipCardsArray = majiang.tipCards(pl.mjhand, [], mustPutHongTaoSan, isNextPlayerOneCard, true);
            
                if(majiang.allTipsNoOrder && MjClient.tipCardsArray.length > 0 && !MjClient.selectTipCardsArray) {
                    majiang.useNewTip = true;
                    MjClient.selectTipCardsArray = majiang.findPutTipCards(pl.mjhand, [], mustPutHongTaoSan, 
                        isNextPlayerOneCard, majiang.allTipsNoOrder);
                    majiang.useNewTip = false;
                }
            }
            MjClient.tipsIdx = 0;//提示第几组牌
        } else if (MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA || 
            MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA_NEW || MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI ||
             MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO){
            var pl = getUIPlayer(off);
            if(!pl || !pl.mjhand) return;
            var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
            MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, roundFirstCard, tData.zhuPaiType ,
                tData.areaSelectMode.chou6,tData.areaSelectMode.daWuZhu27NotTuoLaJi,tData.areaSelectMode.allowTuoLaJiXiaoDui);
            MjClient.tipsIdx = 0;//提示第几组牌
        } else if (MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER){
            var pl = getUIPlayer(off);
            if(!pl || !pl.mjhand) return;
            var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
            MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, roundFirstCard, tData.zhuPaiType,tData);
            MjClient.tipsIdx = 0;//提示第几组牌
        }else if (MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI){
            var pl = getUIPlayer(off);
            if(!pl || !pl.mjhand) return;
            var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
            MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, roundFirstCard, tData.zhuPaiType);
            MjClient.tipsIdx = 0;//提示第几组牌
        }else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA){
            var pl = getUIPlayer(off);
            if(!pl || !pl.mjhand) return;
            var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
            MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, roundFirstCard, tData.zhuPaiType);
            MjClient.tipsIdx = 0;//提示第几组牌
        } else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE){
            var pl = getUIPlayer(off);
            MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, tData.lastPutCard, tData.areaSelectMode);
        } else if (MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI){
            var pl = getUIPlayer(off);
            MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, tData.lastPutCard, tData.areaSelectMode);
        } else if (MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN){
            var pl = getUIPlayer(off);
            MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, tData.lastPutCard);
        } else if (MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K || MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN || MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K){
            var pl = getUIPlayer(off);
            MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, tData.lastPutCard, tData.areaSelectMode);
        } else if (MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA || 
            MjClient.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA){
            var pl = getUIPlayer(off);
            if(!pl || !pl.mjhand) return;
            var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
            MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, roundFirstCard, tData.zhuPaiType);
            MjClient.tipsIdx = 0;//提示第几组牌
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA){
            var pl = getUIPlayer(off);
            if(!pl || !pl.mjhand) return;
            var roundFirstCard = MjClient.majiang.getRoundFirstCards(tData.putCardsRecord, tData.firstPutCardUid, tData.maxPlayer);
            MjClient.tipCardsArray = MjClient.majiang.tipCards(pl.mjhand, roundFirstCard, tData.zhuPaiType,tData.areaSelectMode["SAN_DA_HA_allowTuoLaJiXiaoDui"],tData);
            MjClient.tipsIdx = 0;//提示第几组牌
        }
    }

    cc.log("===InitPutOutCardTips= end =");
}

// 发牌结束的处理
function postCardsEnded()
{
    MjClient.playui.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function () {
        postEvent("PostCardsEnded");

        // 连云港的发完牌  要自动提牌
        if (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_LYG) {
            var pl = getUIPlayer(0);
            if (!pl) return;
            var tData = MjClient.data.sData.tData;
            var selectData = tData.areaSelectMode;
            var isFirstRound = tData.roundAll == tData.roundNum;
            if (MjClient.majiang.isMustPutCard3 && MjClient.majiang.isMustPutCard3(pl.mjhand, selectData, isFirstRound)) {
                // 自动提起牌
                putOutCardTips();
            }
        }
    })));
}

// 给自己发牌 added by Joey
function postCardsToMe(cards) {
    // 设置一个标识 表示当前为发牌动画
    MjClient.playui.isFaPai = 1;

    if (GameClass[MjClient.gameType] != MjClient.GAME_CLASS.NIU_SHI_BIE && 
        GameClass[MjClient.gameType] != MjClient.GAME_CLASS.DA_MA_ZI && MjClient.gameType != MjClient.GAME_TYPE.CHONG_YANG_DA_GUN 
        && MjClient.gameType != MjClient.GAME_TYPE.DA_YE_510K && MjClient.gameType != MjClient.GAME_TYPE.TONG_SHAN_DA_GONG
        && MjClient.gameType != MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN
        && MjClient.gameType != MjClient.GAME_TYPE.QI_CHUN_DA_GONG && MjClient.gameType != MjClient.GAME_TYPE.DA_YE_DA_GONG
        && MjClient.gameType != MjClient.GAME_TYPE.WU_XUE_510K) {
        // 发牌初始的位置
        var initPos = cc.p(cc.director.getWinSize().width * 0.5, cc.director.getWinSize().height * 0.5 + 100);
        MjClient.originalCardsPositions = [];

        // 执行一系列的动作
        for(var i = 0; i < cards.length; i++) 
        {
            var card = cards[i];
            var nowPos = card.getPosition();
            card.setPosition(initPos);
            card.setOpacity(0);
            
            MjClient.originalCardsPositions.push(nowPos);

            if (i == cards.length - 1) {
                card.runAction(cc.sequence(
                    cc.delayTime(i * 0.03),
                    cc.spawn(
                        cc.moveTo(0.25, nowPos),
                        cc.fadeIn(0.25)
                    ),
                    cc.callFunc(function () {
                        MjClient.playui.stopActionByTag(8635921);
                        
                        delete MjClient.playui.isFaPai;

                        MjClient.playui.CardLayoutRestore(getNode(0), 0);

                        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
                        {
                            // 计算牌型提示比较耗时，放到播完飞牌动画之后
                            var flyCard = MjClient.playui.getChildByName("playUINode").getChildByName("flyCard");
                            if (!flyCard || !flyCard.isVisible())
                            {
                                postCardsEnded();
                            }
                        }
                        else
                            postCardsEnded();
                    }
                )));
            }
            else {
                card.runAction(cc.sequence(
                    cc.delayTime(i * 0.03),
                    cc.spawn(
                        cc.moveTo(0.25, nowPos),
                        cc.fadeIn(0.25))
                    ));
            }
        }
    } else {
        // 发牌初始的位置
        var initPos = cc.p(cc.director.getWinSize().width * 0.5, cc.director.getWinSize().height * 0.5 + 50);

        for(var i = 0; i < cards.length; i++) {
            cards[i].setOpacity(0);
        }

        var cardBackStandBy = [];
        var baseCardBack = null;
        var screenScale = Math.min(MjClient.size.width/1280,MjClient.size.height/720);
        for (var j = 0; j <= 3; j++) {
            var cardBack = null;
            if (j == 0)
                cardBack = new ccui.ImageView("playing/shaoyangOptimize/PAIBEI.png");
            else
                cardBack = baseCardBack.clone();
            
            cardBack.setPosition(initPos);
            cardBack.setScale(0.6*screenScale);
            MjClient.playui.addChild(cardBack, 10, "postingCard");

            if (j == 0)
                baseCardBack = cardBack;

            cardBackStandBy.push(cardBack);
        }

        var indexFinished = -1;
        var indexNext = -1;
        var moveTimes = 15;
        var beginMove = function(cardBack)
        {
            if (!cardBack)
                return;

            indexNext++;

            if (indexNext >= cards.length)
            {
                cardBack.removeFromParent();

                for (var m = cardBackStandBy.length - 1; m >= 0; m--) {
                    cardBackStandBy[m].removeFromParent();
                }
                cardBackStandBy.length = 0;

                return;
            }

            cardBack.zIndex += indexNext;

            var targetPos = cards[indexNext].getPosition();
            var movePositions = [];
            var xDistance = targetPos.x - initPos.x;
            var yDistance = targetPos.y - initPos.y;
            for (var k = 1; k <= moveTimes; k++) {
                movePositions.push(cc.p(initPos.x + xDistance/moveTimes*k,initPos.y + yDistance/moveTimes*k));
            }

            var moveIndex = 0;
            var moveCallBack = function() {
                if (moveIndex <= moveTimes - 1) {
                    if (moveIndex == moveTimes/3)
                        beginMove(cardBackStandBy.shift());

                    this.setPosition(movePositions[moveIndex]);

                    moveIndex++;
                } else {
                    indexFinished++;

                    if (indexNext >= cards.length - 1)
                    {
                        this.removeFromParent();

                        for (var m = cardBackStandBy.length - 1; m >= 0; m--) {
                            cardBackStandBy[m].removeFromParent();
                        }
                        cardBackStandBy.length = 0;
                    }
                    else
                    {
                        this.unscheduleAllCallbacks();
                        cardBackStandBy.push(this);
                        this.setPosition(initPos);
                    }

                    if (indexFinished < cards.length) {
                        cards[indexFinished].setOpacity(255);
                    }

                    if (indexFinished == cards.length - 1) {
                        delete MjClient.playui.isFaPai;
                        postCardsEnded();
                    }
                }
            }.bind(cardBack);
            cardBack.schedule(moveCallBack);
        }

        beginMove(cardBackStandBy.shift());
    }
}

// 给其他同志发牌 根据索引来发 off是位置的偏移 added by Joey
function postCardsToOther(off,cardsCount) {
    if (GameClass[MjClient.gameType] != MjClient.GAME_CLASS.NIU_SHI_BIE && 
        GameClass[MjClient.gameType] != MjClient.GAME_CLASS.DA_MA_ZI && MjClient.gameType != MjClient.GAME_TYPE.CHONG_YANG_DA_GUN
        && MjClient.gameType != MjClient.GAME_TYPE.DA_YE_510K && MjClient.gameType != MjClient.GAME_TYPE.TONG_SHAN_DA_GONG
        && MjClient.gameType != MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN
        && MjClient.gameType != MjClient.GAME_TYPE.QI_CHUN_DA_GONG &&  MjClient.gameType != MjClient.GAME_TYPE.DA_YE_DA_GONG
        && MjClient.gameType != MjClient.GAME_TYPE.WU_XUE_510K) {
        // 发牌初始的位置
        var initPos = cc.p(cc.director.getWinSize().width * 0.5, cc.director.getWinSize().height * 0.5 + 100);
        var head = getNode_cards(off).getChildByName("head");
        var point = head.convertToWorldSpace(cc.p(head.width/2, head.height/2));
        point = head.getParent().convertToNodeSpace(point);
        for (var i = 0; i != 6; i++) {
            var sprBack = new cc.Sprite("playing/shaoyangOptimize/PAIBEI.png");
            var delay = 0.5;
            if (i == 0) {
                delay = 1.0;
            }
            sprBack.setPosition(initPos);
            MjClient.playui.addChild(sprBack, 500 + i, "postingCard");
            sprBack.setScale(0.8);
            sprBack.runAction(cc.sequence(
                cc.delayTime((5 - i) * 0.06),
                cc.spawn(
                    cc.moveTo(0.25, point.x, point.y + 5),
                    cc.scaleTo(0.25, 0.38)
                ),
                cc.delayTime(delay),
                cc.removeSelf()
            ));
        }
    } else {
        // 发牌初始的位置
        var initPos = cc.p(cc.director.getWinSize().width * 0.5, cc.director.getWinSize().height * 0.5 + 50);
        var head = getNode_cards(off).getChildByName("head");
        var targetPos = head.convertToWorldSpace(cc.p(head.width/2, head.height/2));
        targetPos = head.getParent().convertToNodeSpace(targetPos);

        var movePositions = [];
        var moveTimes = 15;
        var xDistance = targetPos.x - initPos.x;
        var yDistance = targetPos.y - initPos.y;
        for (var k = 1; k <= moveTimes; k++) {
            movePositions.push(cc.p(initPos.x + xDistance/moveTimes*k,initPos.y + yDistance/moveTimes*k));
        }

        var cardBackStandBy = [];
        var baseCardBack = null;
        var screenScale = Math.min(MjClient.size.width/1280,MjClient.size.height/720);
        for (var j = 0; j <= 3; j++) {
            var cardBack = null;
            if (j == 0)
                cardBack = new ccui.ImageView("playing/shaoyangOptimize/PAIBEI.png");
            else
                cardBack = baseCardBack.clone();

            cardBack.setPosition(initPos);
            cardBack.setScale(0.6*screenScale);
            MjClient.playui.addChild(cardBack, 10, "postingCard");

            if (j == 0)
                baseCardBack = cardBack;

            cardBackStandBy.push(cardBack);
        }

        var indexFinished = -1;
        var indexNext = -1;
        var beginMove = function(cardBack)
        {
            if (!cardBack)
                return;

            indexNext++;

            if (indexNext >= cardsCount)
            {
                cardBack.removeFromParent();

                for (var m = cardBackStandBy.length - 1; m >= 0; m--) {
                    cardBackStandBy[m].removeFromParent();
                }
                cardBackStandBy.length = 0;

                return;
            }

            cardBack.zIndex += indexNext;

            var moveIndex = 0;
            var moveCallBack = function() {
                if (moveIndex <= moveTimes - 1) {
                    if (moveIndex == moveTimes/3)
                        beginMove(cardBackStandBy.shift());

                    this.setPosition(movePositions[moveIndex]);

                    moveIndex++;
                } else {
                    indexFinished++;

                    if (indexNext >= cardsCount - 1)
                    {
                        this.removeFromParent();

                        for (var m = cardBackStandBy.length - 1; m >= 0; m--) {
                            cardBackStandBy[m].removeFromParent();
                        }
                        cardBackStandBy.length = 0;
                    }
                    else
                    {
                        this.unscheduleAllCallbacks();
                        cardBackStandBy.push(this);
                        this.setPosition(initPos);
                    }
                }
            }.bind(cardBack);
            cardBack.schedule(moveCallBack);
        }

        beginMove(cardBackStandBy.shift());
    }
}

function playPostCardAnim(){
    if(MjClient.rePlayVideo != -1){
        return
    }
    var tData = MjClient.data.sData.tData;

    var unit = tData.areaSelectMode.postCardsWay == 0 ? 1 : 4;
    var cardCount = tData.areaSelectMode.jokerNum == 4 ? 108 : 112 ;
    var _perCardsCount = cardCount/MjClient.MaxPlayerNum;

    var _index = null;
    var _uioff = null;
    var _node = null;

    var _roundDelayTime = (unit == 1) ? 0.05 : 0.25;

    MjClient.playui.isFaPai = 1;
    var srcPos = cc.p(cc.director.getWinSize().width * 0.5, cc.director.getWinSize().height * 0.5 + 50);
    var cardNext = {};
    var children = {};

    var screenScale = Math.min(MjClient.size.width/1280,MjClient.size.height/720);

    function _finishedExe(){
        MjClient.playui.CardLayoutRestore(getNode(0), 0);
        delete MjClient.playui.isFaPai;
        postCardsEnded();  
    }

    function _generate(cardBackStandBy, destPos){
        for(var _item = 0; _item < cardBackStandBy.length; _item++){

            cardBackStandBy[_item].runAction(cc.sequence(cc.delayTime(0.135 +(_item*0.03)), cc.moveTo(0.4+0.1/**_item*/, destPos), cc.callFunc(function(){

                if(this.indexTag == cardCount - 1){
                    _finishedExe();
                }

                if(this.uiOff == 0){
                    if(children[this._itemIndex]){
                       children[this._itemIndex].setOpacity(255);
                    }
                }

                this.removeFromParent();
                
            }.bind(cardBackStandBy[_item]))));
        }
        cardBackStandBy = [];
    }

    var _count = 0

    var sendCards = function(){
        if(_count == cardCount){
            return ;
        }

        for(var i = 0; i < MjClient.MaxPlayerNum; i++){
            _index = (i + tData.zhuang + MjClient.MaxPlayerNum)%MjClient.MaxPlayerNum;
            _uioff = getUiOffByUid(tData.uids[_index]);
            _node = getNode(_uioff);

            if(!cardNext[_uioff] && _uioff == 0){
                children = _node.children;

                children.sort(function(n1, n2) {
                    if (n1.x > n2.x) return -1;
                    else return 1;
                });

                children = children.filter(function(node) {
                    return node.isPKImg;
                });

                for(var n = 0; n < children.length; n++) {
                    children[n].setOpacity(0);
                }
            }

            (function(uioff){
                var cardBackStandBy = [];
                var baseCardBack = null;
                var _uioff = uioff;
            
                for(var j = 0; j < unit; j++){

                    if(cardNext[_uioff]){
                        cardNext[_uioff]++;
                    }else{
                        cardNext[_uioff] = 1;
                    }
                    cc.log("----66+++++_uioff---cardNext-", _uioff, cardNext[_uioff])
                    var head = getNode_cards(_uioff).getChildByName("head");
                    var destPos = head.convertToWorldSpace(cc.p(head.width/2, head.height/2));
                    destPos = head.getParent().convertToNodeSpace(destPos);
                    
                    if(cardNext[_uioff] > _perCardsCount){
                        return;
                    }

                    if(_uioff == 0 ){
                        destPos = children[cardNext[_uioff] - 1].getPosition();
                    }

                    var cardBack = null;
                    if (j == 0)
                        cardBack = new ccui.ImageView("playing/shaoyangOptimize/PAIBEI.png");
                    else
                        cardBack = baseCardBack.clone();
                    
                    var _Pos = srcPos;

                    cardBack.setPosition(_Pos);
                    cardBack.setScale(0.6*screenScale);
                    cardBack.indexTag = _count;
                    cardBack.uiOff = _uioff;
                    cardBack._itemIndex = cardNext[_uioff] - 1;
                    MjClient.playui.addChild(cardBack, 10, "postingCard");

                    if (j == 0){
                        baseCardBack = cardBack;
                    }

                    cardBackStandBy.push(cardBack);

                    if(tData.areaSelectMode.postCardsWay == 0){
                        var _time = cardNext[_uioff]%3;
                        cardBack.runAction(cc.sequence(cc.delayTime(0.135 +(_time*0.03)), cc.moveTo(0.4/*+_time*0.03*/, destPos), cc.callFunc(function(){

                            if(cardBack.indexTag == cardCount - 1){
                                _finishedExe();
                            }
                            if(cardBack.uiOff == 0){
                                if(children[cardBack._itemIndex]){
                                   children[cardBack._itemIndex].setOpacity(255);
                                }
                            }
                            //cc.removeSelf();
                            cardBack.removeFromParent();
                            cardBackStandBy = [];
                        })));
                    }else{
                        if(tData.areaSelectMode.jokerNum == 4){//每人27张的
                            if(cardNext[_uioff] >= _perCardsCount){
                                if( j == unit - 2){
                                    _generate(cardBackStandBy, destPos)
                                }
                            }else{
                                if( j == unit - 1){
                                    _generate(cardBackStandBy, destPos)
                                }
                            }
                        }else{
                            if(j == unit -1){
                                _generate(cardBackStandBy, destPos)
                                // cc.log("-----555dfff-j---_uioff----",j, _uioff, _perCardsCount);
                                // (function(cardBackStandBy){
                                //     _generate(cardBackStandBy);
                                // })(cardBackStandBy);

                            }
                        }
                    }

                    _count++;
                }
            })(_uioff);
        }

        if(_count == cardCount){
            return ;
        }

        MjClient.playui.scheduleOnce(sendCards, _roundDelayTime);
    }

    sendCards();
 
}

// 添加发牌动画
function showPostCardAnimation() {
    var  isHaveRes = jsb.fileUtils.isFileExist('playing/shaoyangOptimize/PAIBEI.png');
    
    if (isHaveRes && MjClient.rePlayVideo == -1) {
        // 先设置自己发牌的动画
        // 获取所有的牌
        var node = getNode(0);
        var children = node.children;

        // 对牌进行x的位置关系进行排序
        children.sort(function(n1, n2) {
            if (n1.x > n2.x) return -1;
            else return 1;
        });

        // 剔除不是牌的child
        children = children.filter(function(node) {
            return node.isPKImg;
        });

        postCardsToMe(children);

        // 给其他玩家发牌动画
        for (var i = 1; i != 4; i++) {
            if (getNode(i).visible) {
                postCardsToOther(i,children.length);
            }
        }

        // 跑得快手牌有极低几率出现发牌动画播放不完整，导致部分手牌没有显示，这里强制1秒后强制结束动画并重排手牌
        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI) {
            var adjustAction = cc.sequence(cc.delayTime(1.0), cc.callFunc(function () {
                if (!MjClient.playui.isFaPai)
                    return;

                delete MjClient.playui.isFaPai;

                var node = getNode(0);
                var child = node.children;
                child.sort(function(n1, n2) {
                    if (n1.x > n2.x) return -1;
                    else return 1;
                });
                child = child.filter(function(node) {
                    return node.isPKImg;
                });

                for(var i = 0; i < child.length; i++)
                {
                    child[i].setOpacity(255);
                    child[i].setPosition(MjClient.originalCardsPositions[i]);
                }

                MjClient.playui.CardLayoutRestore(getNode(0), 0);

                // 计算牌型提示比较耗时，放到播完飞牌动画之后
                var flyCard = MjClient.playui.getChildByName("playUINode").getChildByName("flyCard");
                if (!flyCard || !flyCard.isVisible())
                {
                    postCardsEnded();
                }
            }));
            adjustAction.setTag(8635921);
            MjClient.playui.runAction(adjustAction);
        }
    }
}

// 添加三打哈发牌动画
function showSanDaHaPostCardAnimation() {
    var  isHaveRes = jsb.fileUtils.isFileExist('playing/shaoyangOptimize/PAIBEI.png');
    
    if (isHaveRes && MjClient.rePlayVideo == -1) {
        // 设置一个标识 表示当前为发牌动画
        MjClient.playui.isFaPai = 1;

        // 获取所有的牌
        var node = getNode(0);
        var children = node.children;

        // 剔除不是牌的child
        children = children.filter(function(node) {
            return node.isPKImg;
        });

        // 隐藏手牌
        var cardCount = children.length;
        for(var i = 0; i < cardCount; i++) {
            children[i].setOpacity(0);
        }

        var cardCountPerFrame = 3;
        var cardCountPerDir = 18;
        var totalCount = cardCountPerDir * MjClient.MaxPlayerNum;
        var cardBacks = [];
        var indexGenerated = 0;
        var baseZorder = 10;
        var screenScale = Math.min(MjClient.size.width/1280,MjClient.size.height/720);
        var radius = 80 * screenScale;
        var center = cc.p(MjClient.size.width * 0.5, MjClient.size.height * 0.5);
        var baseAngle = -360 / totalCount;

        var uiOffs = [0,1,2,3];
        if (MjClient.MaxPlayerNum < 4)
            uiOffs.splice(2,1);

        var targetPoints = [];
        for (var i = 0; i < MjClient.MaxPlayerNum; i++) {
            var head = getNode_cards(uiOffs[i]).getChildByName("head");
            var targetPos = head.convertToWorldSpace(cc.p(head.width/2, head.height/2));
            targetPos = head.getParent().convertToNodeSpace(targetPos);

            targetPoints.push(targetPos);
        }

        var scheduleNode = new cc.Node();
        MjClient.playui.addChild(scheduleNode, 0, "postingCard");

        var baseCardBack = new ccui.ImageView("playing/shaoyangOptimize/PAIBEI.png");
        baseCardBack.setScale(0.7*screenScale);
        MjClient.playui.addChild(baseCardBack, baseZorder, "postingCard");

        // 开始移动一张牌
        var beginMove = function(cardIndex,uiIndex) {
            if (!MjClient.playui.isFaPai)
                return;
            
            var cardBack = cardBacks[cardIndex];
            var cardBackPos = cardBack.getPosition();
            var controlPoints = [
                cardBackPos,
                cc.p((targetPoints[uiIndex].x + cardBackPos.x) / 2 + 100 * screenScale, (targetPoints[uiIndex].y + cardBackPos.y) / 2 - 100 * screenScale),
                targetPoints[uiIndex]
            ];

            var action = cc.spawn(cc.bezierTo(0.5, controlPoints).easing(cc.easeSineOut()),cc.rotateBy(0.5, -cardBack.getRotation()).easing(cc.easeSineOut()));
            if (cardIndex == 0) {
                action = cc.sequence(action, cc.callFunc(function() {
                        MjClient.playui.isFaPai = 0;

                        // 发牌结束
                        scheduleNode.unscheduleAllCallbacks();

                        // 清空动画
                        clearPostingCards();
                        cardBacks = null;

                        // 显示手牌
                        for(var i = 0; i < cardCount; i++) {
                            children[i].setOpacity(255);
                        }

                        // 弹出叫分面板
                        var tData = MjClient.data.sData.tData;
                        if (tData.tState == TableState.waitJiaoFen) {   // 叫分
                            MjClient.playui.showJiaoFenPanel();
                            MjClient.playui.showWaitTip();
                        }
                    }
                ))
            }
            cardBack.runAction(action);
        }

        var postedPerDir = {}
        var postCards = function(uiIndex) {
            if (uiIndex >= MjClient.MaxPlayerNum)
                return;

            if (!MjClient.playui.isFaPai)
                return;

            postedPerDir[uiIndex] = postedPerDir[uiIndex] || 0;

            if (postedPerDir[uiIndex] < cardCountPerDir) {
                postedPerDir[uiIndex]++;

                var cardIndex = (MjClient.MaxPlayerNum - uiIndex) * cardCountPerDir - postedPerDir[uiIndex];

                beginMove(cardIndex,uiIndex);
            }
        }

        var doSomething = function() {
            if (indexGenerated < totalCount) {
                // 摆牌
                for (var i  = 1; i <= cardCountPerFrame; i++) {
                    indexGenerated++;

                    var cardBack = null;

                    if (indexGenerated > 1) {
                        cardBack = baseCardBack.clone();
                        MjClient.playui.addChild(cardBack, baseZorder + indexGenerated, "postingCard");
                    }
                    else
                        cardBack = baseCardBack;

                    var rotateAngle = indexGenerated * baseAngle;
                    var realAngle = (rotateAngle-90)*Math.PI/180;
                    cardBack.setRotation(Math.abs(rotateAngle));
                    cardBack.setPosition(cc.p(center.x + radius * Math.cos(realAngle),center.y + radius * Math.sin(realAngle)));

                    cardBacks.push(cardBack);
                }

                indexGenerated = cardBacks.length;
            } else {
                // 开始发牌
                postCards(0);

                var diff = indexGenerated - totalCount;
                if (diff >= cardCountPerDir / 2) {
                    postCards(1);
                }

                if (diff >= cardCountPerDir) {
                    postCards(2);
                }

                if (diff >= cardCountPerDir / 2 * 3) {
                    postCards(3);
                }

                indexGenerated++;
            }
        }

        scheduleNode.schedule(doSomething);
    }
}

function clearPostingCards() {
    delete MjClient.playui.isFaPai;

    var children = MjClient.playui.children;
    for(var i = 0; i < children.length; i++)
    {
        var ni = children[i];

        if(ni.name == "postingCard")
            ni.removeFromParent();
    }
}

function playCardAni_Hu(UIoff)
{
    var speed = 0.8;
    var node = getNode_cards(UIoff);

    var anmPic = cc.Sprite("playing/paohuzi/ani/hu/ani_hu10.png");
    for (var i = 9; i >= 0; i --) {
        anmPic.setTexture("playing/paohuzi/ani/hu/ani_hu" + i + ".png");
    }

    var p = cc.p(MjClient.size.width/2, MjClient.size.height * 0.55);

    var scale = Math.min(MjClient.size.width/1280, MjClient.size.height/720);
    anmPic.setScale(scale * 1.2);

    if (UIoff == 0)
        anmPic.setPosition(0, -anmPic.height*scale);
    else if (UIoff == 1)
        anmPic.setPosition(MjClient.size.width + anmPic.width*scale, MjClient.size.height * 0.9);
    else if (UIoff == 2)
        anmPic.setPosition(0, MjClient.size.height + anmPic.height*scale);
    else if (UIoff == 3)
        anmPic.setPosition(-anmPic.width*scale, MjClient.size.height * 0.9);
    

    node.addChild(anmPic,9999);
    anmPic.setRotation(180);
    var zhadanIndex = 0;
    var startP = anmPic.getPosition();
    anmPic.runAction(cc.sequence(
        cc.delayTime(0.2 * speed),
        cc.spawn(
            cc.bezierTo(0.5 * speed, [startP, cc.p((startP.x + p.y)/2, (startP.y + p.y)/2 + 100 * scale), p]),
            cc.rotateTo(0.5 * speed, 0)
        ),
        cc.repeat(cc.sequence(
            cc.delayTime(0.05 * speed),
            cc.callFunc(function() {
                zhadanIndex ++;
                anmPic.setTexture("playing/paohuzi/ani/hu/ani_hu" + zhadanIndex + ".png");
                // if (zhadanIndex == 9){
                //     playEffectInPlay("ani_zhadan");
                // }
            })),
            10
        ),
        cc.delayTime(0.1 * speed),
        cc.removeSelf()
    ));
}

function playCardAni_huangZhuang(UIoff)
{
    var UIoff = 0
    var speed = 0.8;
    var node = getNode_cards(UIoff);

    var anmPic = cc.Sprite("playing/paohuzi/ani/haungzhuang/1.png");
    for (var i = 2; i <=12; i++) {
        anmPic.setTexture("playing/paohuzi/ani/haungzhuang/" + i + ".png");
    }

    var p = cc.p(MjClient.size.width/2, MjClient.size.height * 0.55);

    var scale = Math.min(MjClient.size.width/1280, MjClient.size.height/720);
    anmPic.setScale(scale * 1.2);

    if (UIoff == 0)
        anmPic.setPosition(0, -anmPic.height*scale);
    else if (UIoff == 1)
        anmPic.setPosition(MjClient.size.width + anmPic.width*scale, MjClient.size.height * 0.9);
    else if (UIoff == 2)
        anmPic.setPosition(0, MjClient.size.height + anmPic.height*scale);
    else if (UIoff == 3)
        anmPic.setPosition(-anmPic.width*scale, MjClient.size.height * 0.9);

    
    anmPic.setPosition(p)

    node.addChild(anmPic,9999);
    anmPic.setRotation(180);
    var zhadanIndex = 1;
    var startP = anmPic.getPosition();
    anmPic.runAction(cc.sequence(
        cc.delayTime(0.2 * speed),
        cc.repeat(cc.sequence(
            cc.delayTime(0.05 * speed),
            cc.callFunc(function() {
                zhadanIndex ++;
                anmPic.setTexture("playing/paohuzi/ani/haungzhuang/" + zhadanIndex + ".png");
                // if (zhadanIndex == 9)
                //     playEffectInPlay("ani_zhadan");
            })),
            12
        ),
        cc.delayTime(0.1 * speed),
        cc.removeSelf()
    ));

    var zhadanPic = cc.Sprite("playing/paohuzi/ani/haungzhuang/huangzhuang_liuju.png");
    zhadanPic.setPosition(p);
    node.addChild(zhadanPic,9999);
    //zhadanPic.setOpacity(0);
    zhadanPic.setScale(0.1 * scale);
    zhadanPic.runAction(cc.sequence(
        cc.sequence(cc.delayTime(0.2 * speed), cc.scaleTo(0.7*speed, 1*scale), 
             cc.scaleTo(0.3*speed, 0.5*scale), cc.scaleTo(0.2*speed, 1*scale) ).repeat(1),

        cc.delayTime(0.1 * speed),
        cc.removeSelf())
    );
}

function playCardAni_siwang(UIoff)
{
    cc.spriteFrameCache.addSpriteFrames("playing/cardTable/siwang.plist","playing/cardTable/siwang.png");
    var _frames = [];
    var prefix = "img_siwang_";
    var fc = cc.spriteFrameCache;
    for (var i = 1; i <= 16; i++) {
        var name = prefix + i + ".png";
        var f = fc.getSpriteFrame(name);
        if(f)
        {
            _frames.push(f);
        }
    }

    var _sprite = cc.Sprite();
    var _animate = cc.animate(new cc.Animation(_frames, 1.5/16, 1));
    _sprite.runAction(cc.sequence( _animate,cc.removeSelf()));
    _sprite.initWithSpriteFrame(_frames[0]);
    var _node = getNode_cards(UIoff);
    var _nodeAni = _node.getChildByName("deskCard");
    _sprite.setScale(_nodeAni.getScale()*4);
    _sprite.setPosition(_nodeAni.getPosition().x, _nodeAni.getPosition().y+_sprite.getContentSize().height/4);
    _node.addChild(_sprite,9999);
}

function playCardAni_tonghuashun(UIoff)
{
    cc.spriteFrameCache.addSpriteFrames("playing/cardTable/tonghuashunAni.plist","playing/cardTable/tonghuashunAni.png");
    var _frames = [];
    var prefix = "img_tonghuashun_";
    var fc = cc.spriteFrameCache;
    for (var i = 1; i <= 13; i++) {
        var name = prefix + i + ".png";
        var f = fc.getSpriteFrame(name);
        if(f)
        {
            _frames.push(f);
        }
    }
    var _sprite = cc.Sprite();
    _sprite.initWithSpriteFrame(_frames[0]);
    var _animate = cc.animate(new cc.Animation(_frames, 1.2/13, 1));
    _sprite.runAction(cc.sequence( _animate,cc.removeSelf()));

    var _node = getNode_cards(UIoff);
    var _nodeAni = _node.getChildByName("deskCard");
    _sprite.setScale(_nodeAni.getScale()*4);
    _sprite.setPosition(_nodeAni.getPosition().x, _nodeAni.getPosition().y+_sprite.getContentSize().height/4);
    _node.addChild(_sprite,9999);
}

function playCardAni_xunhangdaodan(UIoff) 
{
    var sp = new cc.Sprite("playing/Ani/xunhangdaodan/0.png");
    var ac = createAnimation("playing/Ani/xunhangdaodan/", 14, cc.rect(0, 0, 382, 278), 0.1);
    sp.runAction(cc.sequence(ac, cc.delayTime(0.1), cc.removeSelf()));

    var node = getNode_cards(UIoff);
    var nodeAni = node.getChildByName("deskCard");
    sp.setScale(nodeAni.getScale() * 8);
    sp.setPosition(nodeAni.getPosition().x + sp.getContentSize().width / 4, nodeAni.getPosition().y + sp.getContentSize().height / 4);
    node.addChild(sp, 9999);
}

function playCardAni_tonghuashun_PDK(UIoff)
{
    cc.spriteFrameCache.addSpriteFrames("playing/cardTable/tonghuashunAni_PDK.plist","playing/cardTable/tonghuashunAni_PDK.png");
    var _frames = [];
    var prefix = "img_tonghuashun_PDK_";
    var fc = cc.spriteFrameCache;
    for (var i = 1; i <= 13; i++) {
        var name = prefix + i + ".png";
        var f = fc.getSpriteFrame(name);
        if(f)
        {
            _frames.push(f);
        }
    }
    var _sprite = cc.Sprite();
    _sprite.initWithSpriteFrame(_frames[0]);
    var _animate = cc.animate(new cc.Animation(_frames, 1.2/13, 1));
    _sprite.runAction(cc.sequence( _animate,cc.removeSelf()));

    var _node = getNode_cards(UIoff);
    var _nodeAni = _node.getChildByName("deskCard");
    _sprite.setScale(_nodeAni.getScale()*4);
    _sprite.setPosition(_nodeAni.getPosition().x, _nodeAni.getPosition().y+_sprite.getContentSize().height/4);
    _node.addChild(_sprite,9999);
}

function playCardAni_chuntian(UIoff)
{
    if (GameClass[MjClient.gameType] != MjClient.GAME_CLASS.DOU_DI_ZHU) {
        return;
    }

    cc.spriteFrameCache.addSpriteFrames("playing/cardTable/chuntian.plist","playing/cardTable/chuntian.png");
    var _frames = [];
    var prefix = "lord_anim_spring_";
    var fc = cc.spriteFrameCache;
    for (var i = 1; i <= 17; i++) {
        var name = prefix + i + ".png";
        var f = fc.getSpriteFrame(name);
        if(f)
        {
            _frames.push(f);
        }
    }
    var _sprite = cc.Sprite();
    _sprite.initWithSpriteFrame(_frames[0]);
    var _animate = cc.animate(new cc.Animation(_frames, 1.2/13, 1));
    _sprite.runAction(cc.sequence( _animate,cc.removeSelf()));

    var _node = getNode_cards(UIoff);
    var _nodeAni = _node.getChildByName("deskCard");
    _sprite.setScale(_nodeAni.getScale()*1.5);
    _sprite.setPosition(_nodeAni.getPosition().x, _nodeAni.getPosition().y);
    _node.addChild(_sprite,9999);
}
function playCardAni_feiji(cards,UIoff)
{
    if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
        playEffectInPlay("ani_feiji");

        var anmPic = cc.Sprite("playing/shaoyangOptimize/feiji.png");
        var _node = getNode_cards(UIoff);
        var _nodeAni = _node.getChildByName("deskCard");
        anmPic.setScale(_nodeAni.getScale()*2);
        // 需要根据当前的位置以及牌的数量调整图片x坐标 added by Joey
        var xOffset = 0;
        if (UIoff == 2) {// 左上角
            xOffset = 35 + cards.length * 1;
        }
        else if (UIoff == 1) { // 右上角
            xOffset = -35 - cards.length * 1;
        }
        anmPic.setPosition(_nodeAni.getPosition().x - 40 + xOffset, _nodeAni.getPosition().y - 30);
        _node.addChild(anmPic,9999);
        anmPic.runAction(cc.sequence(
            cc.moveBy(0.3, 40, 0),
            cc.delayTime(1.5),
            cc.removeSelf()
        ));
    } else {
        if (GameClass[MjClient.gameType] != MjClient.GAME_CLASS.DOU_DI_ZHU &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_NT &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_TY &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_HA &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_LYG &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_JZ &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU){
            return;
        }

        var s_Robot_png = "playing/Ani/feijiyuanwenjian0.png";
        var s_Robot_plist = "playing/Ani/feijiyuanwenjian0.plist";
        var s_Robot_json = "playing/Ani/feijiyuanwenjian.ExportJson";
        playEffectInPlay("ani_feiji");
        ccs.armatureDataManager.addArmatureFileInfo(
            s_Robot_png,
            s_Robot_plist,
            s_Robot_json);

        var _armature = new ccs.Armature("feijiyuanwenjian");
        _armature.animation.play("Animation1");    // 站立
        var _node = getNode_cards(UIoff);
        var _nodeAni = _node.getChildByName("deskCard");
        _armature.setScale(_nodeAni.getScale()*1.5);
        _armature.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        _node.addChild(_armature,9999);

        var a1 = cc.fadeOut(1);
        var b1 = cc.moveBy(0.5,cc.p(-cc.winSize.width/4,0));

        var seq = cc.sequence(cc.delayTime(1),cc.spawn(b1,a1),cc.removeSelf());
        _armature.runAction(seq);
    }
}
function playCardAni_feiji_new(cards, UIoff) {
    playEffectInPlay("ani_feiji");

    var speed = 0.7;
    var node = getNode_cards(UIoff);

    var scale = Math.min(MjClient.size.width/1280, MjClient.size.height/720);
    var anmPic = cc.Sprite("playing/paodekuaiTable_new/ani/feiji/feiji.png");
    anmPic.setPosition(MjClient.size.width / 2, MjClient.size.height / 2);
    anmPic.setScale(scale * 0.5);
    node.addChild(anmPic, 9999);
    anmPic.setOpacity(0);
    anmPic.runAction(cc.sequence(
        cc.delayTime(0.2 * speed),
        cc.spawn(
            cc.fadeTo(0.3 * speed, 255),
            cc.scaleTo(0.3 * speed, scale * 1.2)
        ),
        cc.scaleTo(0.2 * speed, scale * 1.0),
        cc.delayTime(0.2 * speed),
        cc.scaleTo(0.2 * speed, scale * 1.2),
        cc.spawn(
            cc.fadeTo(0.2 * speed, 0),
            cc.scaleTo(0.2 * speed, scale * 0.5)
        ),
        cc.removeSelf()
    ));

    var lvguang = cc.Sprite("playing/paodekuaiTable_new/ani/lvguang.png");
    lvguang.setPosition(anmPic.width / 2, anmPic.height / 2);
    lvguang.setScale(anmPic.width / lvguang.width * 1.5);
    anmPic.setCascadeOpacityEnabled(true);
    anmPic.addChild(lvguang, -1);

    var feijiPic = cc.Sprite("playing/paodekuaiTable_new/ani/feiji/feiji1.png");
    var p = cc.p(0, MjClient.size.height / 2);
    var p2 = cc.p(MjClient.size.width, MjClient.size.height / 2);
    feijiPic.setScale(scale);
    feijiPic.setPosition(p.x - feijiPic.width * feijiPic.getScale() / 2, p.y);
    node.addChild(feijiPic, 9999);
    feijiPic.runAction(cc.sequence(
        cc.delayTime(0.2 * speed),
        cc.moveTo(1.5 * speed, p2.x + feijiPic.width * feijiPic.getScale() / 2, p2.y),
        cc.removeSelf()
    ));
    feijiPic.setScaleX(-feijiPic.getScale());
}
function playCardAni_huojian(UIoff)
{
    if (GameClass[MjClient.gameType] != MjClient.GAME_CLASS.DOU_DI_ZHU){
        return;
    }

    var s_Robot_png = "playing/Ani/feijiyuanwenjian0.png";
    var s_Robot_plist = "playing/Ani/feijiyuanwenjian0.plist";
    var s_Robot_json = "playing/Ani/feijiyuanwenjian.ExportJson";
    playEffectInPlay("ani_huojian");
    ccs.armatureDataManager.addArmatureFileInfo("playing/Ani/huojian.ExportJson");

    var _armature = new ccs.Armature("huojian");
    _armature.animation.play("Animation1");    // 站立
    var _node = getNode_cards(UIoff);
    var _nodeAni = _node.getChildByName("deskCard");
    _armature.setScale(_nodeAni.getScale()*2);
    _armature.setPosition(cc.winSize.width/2, cc.winSize.height/2);
    _node.addChild(_armature,9999);

    var a1 = cc.fadeOut(0.5);
    var b1 = cc.moveBy(0.5,cc.p(0,cc.winSize.height/2));
    var seq = cc.sequence(cc.delayTime(1.5),cc.spawn(b1,a1),cc.removeSelf());
    _armature.runAction(seq);
}
function playCardAni_shunzi(cards,UIoff)
{
    if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K || MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN || MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K) {
        playEffectInPlay("ani_shunzi");

        var anmPic = cc.Sprite("playing/shaoyangOptimize/shunzi.png");
        var _node = getNode_cards(UIoff);
        var _nodeAni = _node.getChildByName("deskCard");
        anmPic.setScale(_nodeAni.getScale()*2);
        // 需要根据当前的位置以及牌的数量调整图片x坐标 added by Joey
        var xOffset = 0;
        if (UIoff == 2) {// 左上角
            xOffset = 35 + cards.length * 1;
        }
        else if (UIoff == 1) { // 右上角
            xOffset = -35 - cards.length * 1;
        }
        anmPic.setPosition(_nodeAni.getPosition().x - 40 + xOffset, _nodeAni.getPosition().y - 30);
        _node.addChild(anmPic,9999);
        anmPic.runAction(cc.sequence(
            cc.moveBy(0.3, 40, 0),
            cc.delayTime(1.5),
            cc.removeSelf()
        ));
    } else {
        if (GameClass[MjClient.gameType] != MjClient.GAME_CLASS.DOU_DI_ZHU &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_NT &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_TY &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_HA &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_LYG &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_JZ &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU){
            return;
        }

        playEffectInPlay("ani_shunzi");
        ccs.armatureDataManager.addArmatureFileInfo("playing/Ani/shunziyuanwenjian.ExportJson");
        var _armature = new ccs.Armature("shunziyuanwenjian");
        _armature.animation.play("Animation1");
        var _node = getNode_cards(UIoff);
        var _nodeAni = _node.getChildByName("deskCard");
        _armature.setScale(_nodeAni.getScale()*2);
        _armature.setPosition(_nodeAni.getPosition().x, _nodeAni.getPosition().y);
        _node.addChild(_armature,9999);
    }
}

function playCardAni_liandui(cards,UIoff)
{
    if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
        playEffectInPlay("ani_liandui");
        var anmPic = cc.Sprite("playing/shaoyangOptimize/liandui.png");
        var _node = getNode_cards(UIoff);
        var _nodeAni = _node.getChildByName("deskCard");
        anmPic.setScale(_nodeAni.getScale()*2);
        // 需要根据当前的位置以及牌的数量调整图片x坐标 added by Joey
        var xOffset = 0;
        if (UIoff == 2) {// 左上角
            xOffset = 35 + cards.length * 1;
        }
        else if (UIoff == 1) { // 右上角
            xOffset = -35 - cards.length * 1;
        }
        anmPic.setPosition(_nodeAni.getPosition().x - 40 + xOffset, _nodeAni.getPosition().y - 30);
        _node.addChild(anmPic,9999);
        anmPic.runAction(cc.sequence(
            cc.moveBy(0.3, 40, 0),
            cc.delayTime(1.5),
            cc.removeSelf()
        ));
    } else {
        if (GameClass[MjClient.gameType] != MjClient.GAME_CLASS.DOU_DI_ZHU &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_NT &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_TY &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_HA &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_LYG &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_JZ &&
            MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU){
            return;
        }
        playEffectInPlay("ani_liandui");
        ccs.armatureDataManager.addArmatureFileInfo("playing/Ani/lianduiyuanwenjian.ExportJson");
        var _armature = new ccs.Armature("lianduiyuanwenjian");
        _armature.animation.play("Animation1");
        var _node = getNode_cards(UIoff);
        var _nodeAni = _node.getChildByName("deskCard");
        _armature.setScale(_nodeAni.getScale()*2);
        _armature.setPosition(_nodeAni.getPosition().x, _nodeAni.getPosition().y);
        _node.addChild(_armature,9999);
    }
}

function playCardAni_WangZha(UIoff, numWang)
{
    var speed = 0.8;
    var node = getNode_cards(UIoff);

    var anmPic = cc.Sprite("playing/paodekuaiTable_new/ani/zhadan/16.png");
    for (var i = 15; i >= 0; i --) {
        anmPic.setTexture("playing/paodekuaiTable_new/ani/zhadan/" + i + ".png");
    }

    var p = cc.p(MjClient.size.width/2, MjClient.size.height * 0.55);

    var scale = Math.min(MjClient.size.width/1280, MjClient.size.height/720);
    anmPic.setScale(scale * 1.2);

    if (UIoff == 0)
        anmPic.setPosition(0, -anmPic.height*scale);
    else if (UIoff == 1)
        anmPic.setPosition(MjClient.size.width + anmPic.width*scale, MjClient.size.height * 0.9);
    else if (UIoff == 2)
        anmPic.setPosition(0, MjClient.size.height + anmPic.height*scale);
    else if (UIoff == 3)
        anmPic.setPosition(-anmPic.width*scale, MjClient.size.height * 0.9);
    

    node.addChild(anmPic,9999);
    anmPic.setRotation(180);
    var zhadanIndex = 0;
    var startP = anmPic.getPosition();
    anmPic.runAction(cc.sequence(
        cc.delayTime(0.2 * speed),
        cc.spawn(
            cc.bezierTo(0.5 * speed, [startP, cc.p((startP.x + p.y)/2, (startP.y + p.y)/2 + 100 * scale), p]),
            cc.rotateTo(0.5 * speed, 0)
        ),
        cc.repeat(cc.sequence(
            cc.delayTime(0.05 * speed),
            cc.callFunc(function() {
                zhadanIndex ++;
                anmPic.setTexture("playing/paodekuaiTable_new/ani/zhadan/" + zhadanIndex + ".png");
                if (zhadanIndex == 9)
                    playEffectInPlay("ani_zhadan");
            })),
            15
        ),
        cc.delayTime(0.1 * speed),
        cc.removeSelf()
    ));

    var zhadanPic = cc.Sprite("playing/paodekuaiTable_new/ani/zhadan/wangzha.png");
    zhadanPic.setPosition(p);
    node.addChild(zhadanPic,9999);
    zhadanPic.setOpacity(0);
    zhadanPic.setScale(0.1 * scale);
    zhadanPic.runAction(cc.sequence(
        cc.delayTime(1.2 * speed),
        cc.spawn(
            cc.scaleTo(0.4 * speed, 1 * scale),
            cc.fadeTo(0.4 * speed, 255)
        ),
        cc.spawn(
            cc.scaleTo(0.2 * speed, 0.8 * scale),
            cc.fadeTo(0.2 * speed, 200)
        ),
        cc.spawn(
            cc.scaleTo(0.2 * speed, 1.2 * scale),
            cc.fadeTo(0.2 * speed, 255)
        ),
        cc.spawn(
            cc.scaleTo(0.2 * speed, 0.1 * scale),
            cc.fadeTo(0.2 * speed, 0)
        )
    ));

    var lvguang = cc.Sprite("playing/paodekuaiTable_new/ani/lvguang.png");
    lvguang.setPosition(zhadanPic.width/2, zhadanPic.height/2);
    lvguang.setScale(zhadanPic.width/lvguang.width * 1.3);
    zhadanPic.setCascadeOpacityEnabled(true);
    zhadanPic.addChild(lvguang, -1);
}

function playCardAni_gunLong(UIoff)
{
    var speed = 0.8;
    var node = getNode_cards(UIoff);

    var anmPic = cc.Sprite("playing/paodekuaiTable_new/ani/zhadan/16.png");
    for (var i = 15; i >= 0; i --) {
        anmPic.setTexture("playing/paodekuaiTable_new/ani/zhadan/" + i + ".png");
    }

    var p = cc.p(MjClient.size.width/2, MjClient.size.height * 0.55);

    var scale = Math.min(MjClient.size.width/1280, MjClient.size.height/720);
    anmPic.setScale(scale * 1.2);

    if (UIoff == 0)
        anmPic.setPosition(0, -anmPic.height*scale);
    else if (UIoff == 1)
        anmPic.setPosition(MjClient.size.width + anmPic.width*scale, MjClient.size.height * 0.9);
    else if (UIoff == 2)
        anmPic.setPosition(0, MjClient.size.height + anmPic.height*scale);
    else if (UIoff == 3)
        anmPic.setPosition(-anmPic.width*scale, MjClient.size.height * 0.9);
    

    node.addChild(anmPic,9999);
    anmPic.setRotation(180);
    var zhadanIndex = 0;
    var startP = anmPic.getPosition();
    anmPic.runAction(cc.sequence(
        cc.delayTime(0.2 * speed),
        cc.spawn(
            cc.bezierTo(0.5 * speed, [startP, cc.p((startP.x + p.y)/2, (startP.y + p.y)/2 + 100 * scale), p]),
            cc.rotateTo(0.5 * speed, 0)
        ),
        cc.repeat(cc.sequence(
            cc.delayTime(0.05 * speed),
            cc.callFunc(function() {
                zhadanIndex ++;
                anmPic.setTexture("playing/paodekuaiTable_new/ani/zhadan/" + zhadanIndex + ".png");
                if (zhadanIndex == 9)
                    playEffectInPlay("ani_zhadan");
            })),
            15
        ),
        cc.delayTime(0.1 * speed),
        cc.removeSelf()
    ));

    var zhadanPic = cc.Sprite("playing/paodekuaiTable_new/ani/zhadan/gunlong.png");
    zhadanPic.setPosition(p);
    node.addChild(zhadanPic,9999);
    zhadanPic.setOpacity(0);
    zhadanPic.setScale(0.1 * scale);
    zhadanPic.runAction(cc.sequence(
        cc.delayTime(1.2 * speed),
        cc.spawn(
            cc.scaleTo(0.4 * speed, 1 * scale),
            cc.fadeTo(0.4 * speed, 255)
        ),
        cc.spawn(
            cc.scaleTo(0.2 * speed, 0.8 * scale),
            cc.fadeTo(0.2 * speed, 200)
        ),
        cc.spawn(
            cc.scaleTo(0.2 * speed, 1.2 * scale),
            cc.fadeTo(0.2 * speed, 255)
        ),
        cc.spawn(
            cc.scaleTo(0.2 * speed, 0.1 * scale),
            cc.fadeTo(0.2 * speed, 0)
        )
    ));

    var lvguang = cc.Sprite("playing/paodekuaiTable_new/ani/lvguang.png");
    lvguang.setPosition(zhadanPic.width/2, zhadanPic.height/2);
    lvguang.setScale(zhadanPic.width/lvguang.width * 1.3);
    zhadanPic.setCascadeOpacityEnabled(true);
    zhadanPic.addChild(lvguang, -1);
}

function playCardAni_huochepi(uiOff) {
    //playEffectInPlay("ani_liandui");
    var _armature =createSpine("playing/Ani/huochepi/huoche.json", "playing/Ani/huochepi/huoche.atlas");
    _armature.setAnimation(0, "animation", true);

    var _node = getNode_cards(uiOff);
    var _nodeAni = _node.getChildByName("deskCard");
    _armature.setScale(_nodeAni.getScale()*2);
    _armature.setPosition(_nodeAni.getPosition().x, _nodeAni.getPosition().y);
    _node.addChild(_armature,9999);

    var a1 = cc.fadeOut(1);
    var b1 = cc.moveBy(0.5,cc.p(-cc.winSize.width/3,0));

    var seq = cc.sequence(cc.delayTime(0.5),cc.spawn(b1,a1),cc.removeSelf());
    _armature.runAction(seq);
}

function playCardAni_zhadan(cards,UIoff)
{
    
    if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
        playEffectInPlay("ani_zhadan");

        var anmPic = cc.Sprite("playing/shaoyangOptimize/zhadan.png");
        var _node = getNode_cards(UIoff);
        var _nodeAni = _node.getChildByName("deskCard");
        anmPic.setScale(_nodeAni.getScale()*2);
        // 需要根据当前的位置以及牌的数量调整图片x坐标 added by Joey
        var xOffset = 0;
        if (UIoff == 2) {// 左上角
            xOffset = 35 + cards.length * 1;
        }
        else if (UIoff == 1) { // 右上角
            xOffset = -35 - cards.length * 1;
        }
        anmPic.setPosition(_nodeAni.getPosition().x - 40 + xOffset, _nodeAni.getPosition().y - 30);
        _node.addChild(anmPic,9999);
        anmPic.runAction(cc.sequence(
            cc.moveBy(0.3, 40, 0),
            cc.delayTime(1.5),
            cc.removeSelf()
        ));
    } else {
        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU &&
             MjClient.gameType != MjClient.GAME_TYPE.DOU_DI_ZHU_JZ &&
            MjClient.gameType != MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU &&
             MjClient.gameType != MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN &&
            MjClient.gameType != MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI &&
             MjClient.gameType != MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG && 
            MjClient.gameType != MjClient.GAME_TYPE.DOU_DI_ZHU_GZ){
            return;
        }

        playEffectInPlay("ani_zhadan");
        playMusic("doudizhu/table_sound_After_the_bomb");
        ccs.armatureDataManager.addArmatureFileInfo("playing/Ani/zhadan/zhadanyuanwenjian.ExportJson");
        var _armature = new ccs.Armature("zhadanyuanwenjian");
        _armature.animation.play("Animation1");
        var _node = getNode_cards(UIoff);
        var _nodeAni = _node.getChildByName("deskCard");
        _armature.setScale(_nodeAni.getScale()*2);
        _armature.setPosition(_nodeAni.getPosition().x, _nodeAni.getPosition().y);
        _node.addChild(_armature,9999);

        var a1 = cc.callFunc(function(){
            playMusic("doudizhu/table_background_music");
        });
        var _seq = cc.sequence(cc.delayTime(15),a1);
        _nodeAni.runAction(_seq);
    }
}

function playCardAni_shunzi_new(cards, UIoff) {
    playEffectInPlay("ani_shunzi");
    if(MjClient.playui.playCardAni_shunzi_new) {
        MjClient.playui.playCardAni_shunzi_new(UIoff);
        return;
    }
    var speed = 0.7;
    var node = getNode_cards(UIoff);
    var nodeAni = node.getChildByName("deskCard");

    var scale = Math.min(MjClient.size.width/1280, MjClient.size.height/720);
    var x1 = x2 = nodeAni.x;
    var children = node.children;
    for (var i = 0; i < children.length; i++) {
        if (children[i].name != "out")
            continue;
        if (children[i].x < x1 || x1 == nodeAni.x)
            x1 = children[i].x;
        if (children[i].x > x2 || x2 == nodeAni.x)
            x2 = children[i].x;
    }
    var anmPic = cc.Sprite("playing/paodekuaiTable_new/ani/shunzi/shunzi.png");
    anmPic.setScale(scale);
    anmPic.setPosition((x1 + x2)/2 - 60 * scale, nodeAni.y - 45 * scale);
    node.addChild(anmPic, 9999);
    anmPic.setOpacity(0);
    anmPic.setCascadeOpacityEnabled(true);
    anmPic.runAction(cc.sequence(
        cc.delayTime(0.2 * speed),
        cc.spawn(
            cc.moveBy(0.5 * speed, 60 * scale, 0),
            cc.fadeTo(0.2 * speed, 255)
        ),
        cc.delayTime(0.4 * speed),
        cc.spawn(
            cc.moveBy(0.8 * speed, 60 * scale, 0),
            cc.sequence(cc.delayTime(0.4 * speed), cc.fadeTo(0.4 * speed, 0))
        ),
        cc.removeSelf()
    ));

    var anmPic2 = cc.Sprite("playing/paodekuaiTable_new/ani/shunzi/shunzimoh.png");
    anmPic2.setPosition(anmPic.width / 2 - 120, anmPic.height / 2);
    anmPic.addChild(anmPic2, -1);
    anmPic2.runAction(cc.sequence(
        cc.delayTime(0.2 * speed),
        cc.moveBy(0.5 * speed, 120, 0),
        cc.removeSelf()
    ));

    var lvguang = cc.Sprite("playing/paodekuaiTable_new/ani/lvguang.png");
    lvguang.setPosition(anmPic.width / 2, anmPic.height / 2);
    lvguang.setScale(anmPic.width / lvguang.width * 1.5);
    anmPic.addChild(lvguang, -2);

    var star = cc.Sprite("playing/paodekuaiTable_new/ani/shunzi/star/0.png");
    var ac = createAnimation("playing/paodekuaiTable_new/ani/shunzi/star/", 29, cc.rect(0, 0, 254, 107), 0.05 * speed);
    star.runAction(cc.sequence(ac, cc.delayTime(0.05 * speed), cc.removeSelf()));
    star.setPosition(anmPic.width / 2, anmPic.height / 2);
    star.setScale(anmPic.width / star.width * 1.5);
    anmPic.addChild(star, 1);
}

function playCardAni_liandui_new(cards, UIoff) {
    playEffectInPlay("ani_liandui");
    if(MjClient.playui.playCardAni_liandui_new) {
        MjClient.playui.playCardAni_liandui_new(UIoff);
        return;
    }
    var speed = 0.9;
    var node = getNode_cards(UIoff);
    var nodeAni = node.getChildByName("deskCard");

    var lianPic1 = cc.Sprite("playing/paodekuaiTable_new/ani/liandui/lian.png");
    var lianPic2 = cc.Sprite("playing/paodekuaiTable_new/ani/liandui/lian1.png");
    var duiPic1 = cc.Sprite("playing/paodekuaiTable_new/ani/liandui/dui.png");
    var duiPic2 = cc.Sprite("playing/paodekuaiTable_new/ani/liandui/dui1.png");

    var scale = Math.min(MjClient.size.width/1280, MjClient.size.height/720);
    var x1 = x2 = nodeAni.x;
    var children = node.children;
    for (var i = 0; i < children.length; i++) {
        if (children[i].name != "out")
            continue;
        if (children[i].x < x1 || x1 == 0)
            x1 = children[i].x;
        if (children[i].x > x2 || x2 == 0)
            x2 = children[i].x;
    }
    var p = cc.p((x1 + x2)/2, nodeAni.y - 45 * scale);
    var lvguang = cc.Sprite("playing/paodekuaiTable_new/ani/lvguang.png");
    lvguang.setPosition(p);
    lvguang.setScale(0.45 * scale);
    node.addChild(lvguang, 9999);
    lvguang.setOpacity(0);
    lvguang.runAction(cc.sequence(
        cc.fadeTo(0.2 * speed, 255),
        cc.delayTime(1.0 * speed),
        cc.fadeOut(0.2 * speed),
        cc.removeSelf()
    ));

    lianPic1.setScale(scale);
    lianPic1.setPosition(p.x - 150 * scale, p.y);
    node.addChild(lianPic1, 9999);
    lianPic1.setOpacity(40);
    lianPic1.runAction(cc.sequence(
        cc.spawn(
            cc.moveTo(0.2 * speed, p.x - 35 * scale, p.y),
            cc.fadeTo(0.2 * speed, 255)
        ),
        cc.scaleTo(0.15 * speed, lianPic1.getScale() * 1.25),
        cc.scaleTo(0.15 * speed, lianPic1.getScale()),
        cc.delayTime(0.4 * speed),
        cc.scaleTo(0.15 * speed, lianPic1.getScale() * 1.25),
        cc.spawn(
            cc.scaleTo(0.15 * speed, lianPic1.getScale()),
            cc.fadeOut(0.15 * speed)
        ),
        cc.removeSelf()
    ));

    duiPic1.setScale(scale);
    duiPic1.setPosition(p.x + 100 * scale, p.y);
    node.addChild(duiPic1, 9999);
    duiPic1.setOpacity(40);
    duiPic1.runAction(cc.sequence(
        cc.spawn(
            cc.moveTo(0.2 * speed, p.x + 35 * scale, p.y),
            cc.fadeTo(0.2 * speed, 255)
        ),
        cc.scaleTo(0.15 * speed, duiPic1.getScale() * 1.3),
        cc.scaleTo(0.15 * speed, duiPic1.getScale()),
        cc.delayTime(0.4 * speed),
        cc.scaleTo(0.15 * speed, duiPic1.getScale() * 1.3),
        cc.spawn(
            cc.scaleTo(0.15 * speed, duiPic1.getScale()),
            cc.fadeOut(0.15 * speed)
        ),
        cc.removeSelf()
    ));

    lianPic2.setAnchorPoint(cc.p(1.0, 0.5));
    lianPic2.setPosition(lianPic1.width, lianPic1.height / 2);
    lianPic1.addChild(lianPic2, -1);
    lianPic2.setOpacity(0);
    lianPic2.setScale(lianPic1.width / lianPic2.width);
    lianPic2.runAction(cc.sequence(
        cc.delayTime(0.2 * speed),
        cc.spawn(
            cc.scaleTo(0.2 * speed, 0.9),
            cc.sequence(cc.fadeTo(0.2, 200), cc.fadeTo(0.2 *speed, 0))
        )
    ));

    duiPic2.setAnchorPoint(cc.p(0.0, 0.5));
    duiPic2.setPosition(0, duiPic1.height / 2);
    duiPic1.addChild(duiPic2, -1);
    duiPic2.setOpacity(0);
    duiPic2.setScale(duiPic1.width / duiPic2.width);
    duiPic2.runAction(cc.sequence(
        cc.delayTime(0.2 * speed),
        cc.spawn(
            cc.scaleTo(0.2 * speed, 0.9),
            cc.sequence(cc.fadeTo(0.2 * speed, 200), cc.fadeTo(0.2 * speed, 0))
        )
    ));
}

function playCardAni_feiji_new(cards, UIoff) {
    playEffectInPlay("ani_feiji");

    var speed = 0.7;
    var node = getNode_cards(UIoff);

    var scale = Math.min(MjClient.size.width/1280, MjClient.size.height/720);
    var anmPic = cc.Sprite("playing/paodekuaiTable_new/ani/feiji/feiji.png");
    anmPic.setPosition(MjClient.size.width / 2, MjClient.size.height / 2);
    anmPic.setScale(scale * 0.5);
    node.addChild(anmPic, 9999);
    anmPic.setOpacity(0);
    anmPic.runAction(cc.sequence(
        cc.delayTime(0.2 * speed),
        cc.spawn(
            cc.fadeTo(0.3 * speed, 255),
            cc.scaleTo(0.3 * speed, scale * 1.2)
        ),
        cc.scaleTo(0.2 * speed, scale * 1.0),
        cc.delayTime(0.2 * speed),
        cc.scaleTo(0.2 * speed, scale * 1.2),
        cc.spawn(
            cc.fadeTo(0.2 * speed, 0),
            cc.scaleTo(0.2 * speed, scale * 0.5)
        ),
        cc.removeSelf()
    ));

    var lvguang = cc.Sprite("playing/paodekuaiTable_new/ani/lvguang.png");
    lvguang.setPosition(anmPic.width / 2, anmPic.height / 2);
    lvguang.setScale(anmPic.width / lvguang.width * 1.5);
    anmPic.setCascadeOpacityEnabled(true);
    anmPic.addChild(lvguang, -1);

    var feijiPic = cc.Sprite("playing/paodekuaiTable_new/ani/feiji/feiji1.png");
    var p = cc.p(0, MjClient.size.height / 2);
    var p2 = cc.p(MjClient.size.width, MjClient.size.height / 2);
    feijiPic.setScale(scale);
    feijiPic.setPosition(p.x - feijiPic.width * feijiPic.getScale() / 2, p.y);
    node.addChild(feijiPic, 9999);
    feijiPic.runAction(cc.sequence(
        cc.delayTime(0.2 * speed),
        cc.moveTo(1.5 * speed, p2.x + feijiPic.width * feijiPic.getScale() / 2, p2.y),
        cc.removeSelf()
    ));
    feijiPic.setScaleX(-feijiPic.getScale());
}

function playCardAni_zhadan_new(cards, UIoff)
{
    var speed = 0.8;
    var node = getNode_cards(UIoff);

    var anmPic = cc.Sprite("playing/paodekuaiTable_new/ani/zhadan/16.png");
    for (var i = 15; i >= 0; i --) {
        anmPic.setTexture("playing/paodekuaiTable_new/ani/zhadan/" + i + ".png");
    }

    var p = cc.p(MjClient.size.width/2, MjClient.size.height * 0.55);

    var scale = Math.min(MjClient.size.width/1280, MjClient.size.height/720);
    anmPic.setScale(scale * 1.2);

    if (MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE && 
        MjClient.gameType != MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI && 
        MjClient.gameType != MjClient.GAME_TYPE.CHONG_YANG_DA_GUN &&
        MjClient.gameType != MjClient.GAME_TYPE.DA_YE_DA_GONG &&
        MjClient.gameType != MjClient.GAME_TYPE.TONG_SHAN_DA_GONG &&
        MjClient.gameType != MjClient.GAME_TYPE.QI_CHUN_DA_GONG &&
        MjClient.gameType != MjClient.GAME_TYPE.DA_YE_510K &&
        MjClient.gameType != MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
        MjClient.gameType != MjClient.GAME_TYPE.WU_XUE_510K) {
        if (UIoff == 0)
            anmPic.setPosition(0, -anmPic.height*scale);
        else if (UIoff == 1)
            anmPic.setPosition(MjClient.size.width + anmPic.width*scale, MjClient.size.height * 0.9);
        else if (UIoff == 2)
            anmPic.setPosition(-anmPic.width*scale, MjClient.size.height * 0.9);
    } else {
        if (UIoff == 0)
            anmPic.setPosition(0, -anmPic.height*scale);
        else if (UIoff == 1)
            anmPic.setPosition(MjClient.size.width + anmPic.width*scale, MjClient.size.height * 0.9);
        else if (UIoff == 2)
            anmPic.setPosition(0, MjClient.size.height + anmPic.height*scale);
        else if (UIoff == 3)
            anmPic.setPosition(-anmPic.width*scale, MjClient.size.height * 0.9);
    }

    node.addChild(anmPic,9999);
    anmPic.setRotation(180);
    var zhadanIndex = 0;
    var startP = anmPic.getPosition();
    anmPic.runAction(cc.sequence(
        cc.delayTime(0.2 * speed),
        cc.spawn(
            cc.bezierTo(0.5 * speed, [startP, cc.p((startP.x + p.y)/2, (startP.y + p.y)/2 + 100 * scale), p]),
            cc.rotateTo(0.5 * speed, 0)
        ),
        cc.repeat(cc.sequence(
            cc.delayTime(0.05 * speed),
            cc.callFunc(function() {
                zhadanIndex ++;
                anmPic.setTexture("playing/paodekuaiTable_new/ani/zhadan/" + zhadanIndex + ".png");
                if (zhadanIndex == 9)
                    playEffectInPlay("ani_zhadan");
            })),
            15
        ),
        cc.delayTime(0.1 * speed),
        cc.removeSelf()
    ));

    var zhadanPic = cc.Sprite("playing/paodekuaiTable_new/ani/zhadan/zhadan.png");
    zhadanPic.setPosition(p);
    node.addChild(zhadanPic,9999);
    zhadanPic.setOpacity(0);
    zhadanPic.setScale(0.1 * scale);
    zhadanPic.runAction(cc.sequence(
        cc.delayTime(1.2 * speed),
        cc.spawn(
            cc.scaleTo(0.4 * speed, 1 * scale),
            cc.fadeTo(0.4 * speed, 255)
        ),
        cc.spawn(
            cc.scaleTo(0.2 * speed, 0.8 * scale),
            cc.fadeTo(0.2 * speed, 200)
        ),
        cc.spawn(
            cc.scaleTo(0.2 * speed, 1.2 * scale),
            cc.fadeTo(0.2 * speed, 255)
        ),
        cc.spawn(
            cc.scaleTo(0.2 * speed, 0.1 * scale),
            cc.fadeTo(0.2 * speed, 0)
        )
    ));

    var lvguang = cc.Sprite("playing/paodekuaiTable_new/ani/lvguang.png");
    lvguang.setPosition(zhadanPic.width/2, zhadanPic.height/2);
    lvguang.setScale(zhadanPic.width/lvguang.width * 1.3);
    zhadanPic.setCascadeOpacityEnabled(true);
    zhadanPic.addChild(lvguang, -1);

    // var w = MjClient.size.width/60;
    // zhadanPic.runAction(cc.sequence(
    //     cc.delayTime(1.0 * speed),
    //     cc.repeat(cc.sequence(
    //         cc.delayTime(0.01 * speed),
    //         cc.callFunc(function() {
    //             MjClient.playui.setScale(1.05);
    //             MjClient.playui.setPosition((Math.random() - 0.5) * w, (Math.random() - 0.5) * w);
    //         })),
    //         100
    //     ),
    //     cc.callFunc(function() {
    //         MjClient.playui.setScale(1);
    //         MjClient.playui.setPosition(cc.p(0, 0));
    //     }),
    //     cc.delayTime(1.0 * speed),
    //     cc.removeSelf()
    // ));
}

function playCardAni_zhadan_qianFen(cards, UIoff)
{
    var speed = 0.8;
    //var p = cc.p(MjClient.size.width/2, MjClient.size.height * 0.55);
    var node = getNode_cards(UIoff);
    var p = MjClient.playui.getAniPos(UIoff);

    var scale = Math.min(MjClient.size.width/1280, MjClient.size.height/720);
    var zhadanPic = cc.Sprite("playing/paodekuaiTable_new/ani/zhadan/zhadan.png");
    zhadanPic.setPosition(p);
    node.addChild(zhadanPic,9999);
    zhadanPic.setOpacity(0);
    zhadanPic.setScale(0.1 * scale);
    zhadanPic.runAction(cc.sequence(
        cc.delayTime(0.2 * speed),
        cc.spawn(
            cc.scaleTo(0.4 * speed, 1 * scale),
            cc.fadeTo(0.4 * speed, 255)
        ),
        cc.spawn(
            cc.scaleTo(0.2 * speed, 0.8 * scale),
            cc.fadeTo(0.2 * speed, 200)
        ),
        cc.spawn(
            cc.scaleTo(0.2 * speed, 1.2 * scale),
            cc.fadeTo(0.2 * speed, 255)
        ),
        cc.spawn(
            cc.scaleTo(0.2 * speed, 0.1 * scale),
            cc.fadeTo(0.2 * speed, 0)
        ),
        cc.removeSelf()
    ));

    var lvguang = cc.Sprite("playing/paodekuaiTable_new/ani/lvguang.png");
    lvguang.setPosition(zhadanPic.width/2, zhadanPic.height/2);
    lvguang.setScale(zhadanPic.width/lvguang.width * 1.3);
    zhadanPic.setCascadeOpacityEnabled(true);
    zhadanPic.addChild(lvguang, -1);
}
function getAniPos(UIoff) {
    var node = getNode_cards(UIoff);
    var x1 = 0, x2 = 0, y1 =0;
    var children = node.children;
    for (var i = 0; i < children.length; i++) {
        if (children[i].name != "out")
            continue;
        if(y1 == 0) {
            y1 = children[i].y;
        }
        if (children[i].x < x1 || x1 == 0)
            x1 = children[i].x;
        if (children[i].x > x2 || x2 == 0)
            x2 = children[i].x;
    }
    var pos = cc.p((x1 + x2)/2,y1);
    return node.convertToWorldSpaceAR(pos);
}
//播放牌型动画
function playCardAni(cards,UIoff)
{
    var tData = MjClient.data.sData.tData;
    var cardType;

    if (GameClass[MjClient.gameType] != MjClient.GAME_CLASS.DA_QI && GameClass[MjClient.gameType] != MjClient.GAME_CLASS.SAN_DA_HA ) {
        cardType = MjClient.majiang.cardsType(cards, tData.areaSelectMode, tData);
    } else if (MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA || 
        MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA || 
        MjClient.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA) {
        cardType = MjClient.majiang.cardsType(cards, tData.zhuPaiType, tData.areaSelectMode.teshutuolaji, tData.areaSelectMode.chou6);
    } else
        cardType = MjClient.majiang.cardsType(cards, tData.zhuPaiType, tData.areaSelectMode.chou6, tData.areaSelectMode.daWuZhu27NotTuoLaJi);

    cc.log("牌型 = "+cardType);
    var CARDTPYE = MjClient.majiang.CARDTPYE;
    if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU)
    {
        var tData = MjClient.data.sData.tData;
        var pl = getUIPlayer(UIoff);
        var cardCount = 17;
        if(tData.uids[tData.zhuang] == pl.info.uid)
        {
            cardCount = 20;
        }
        //playCardAni_liandui(UIoff);
        //playCardAni_shunzi(UIoff);
        //playCardAni_huojian(UIoff);
        //playCardAni_feiji(UIoff);
        //playCardAni_zhadan(UIoff);
        if(pl.isChunTian)
        {
            //春天的动画
            playCardAni_chuntian(UIoff);
            return;
        }
    }

    if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HA) {
        MjClient.playui.AniLayer.loadCardTypeAni(cardType,getAniPos(UIoff),UIoff);
        return;
    }
    switch (cardType)
    {   
        case CARDTPYE.mantianfei:
        case CARDTPYE.zhadan:
        case CARDTPYE.ruanzha2:
        case CARDTPYE.ruanzha:
        case CARDTPYE.zhadan6:
        case CARDTPYE.zhadan7:
        case CARDTPYE.zhadan8:
        case CARDTPYE.tianjian:
        case CARDTPYE.wang382a:
            if( MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_DA_TONG||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_JZ||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO||
                MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HA||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_TY||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_QC||
                MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE||
                MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN || 
                MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI || 
                MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ || 
                MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN ||
                MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN)
            {
                if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN) {
                    cc.log("playCardAni_zhadan_qianFen ");
                    playCardAni_zhadan_qianFen(cards,UIoff);
                } else {
                    playCardAni_zhadan_new(cards,UIoff);
                }
            }
            break;
        case CARDTPYE.xunhangdaodan:
            playCardAni_xunhangdaodan(UIoff);
            break;
        case CARDTPYE.huojian:
            playCardAni_huojian(UIoff);
            break;
        case CARDTPYE.huochepi:
            if(MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO){
                playCardAni_huochepi(UIoff)
            }
            break;
        case CARDTPYE.gunlong:
        case CARDTPYE.f_510kgunlong:
        case CARDTPYE.z_510kgunlong:
            playCardAni_gunLong(UIoff)
            break;
        case CARDTPYE.sanshun:
        case CARDTPYE.feiji:
        case CARDTPYE.feiji2:
            if((GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI ||
                 MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE ||
                 MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN || 
                 MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI || 
                 MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
                 MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                 MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
                 MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
                 MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                 MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K) &&
                !MjClient.data.c_Data.bPutCardAnimOld)
            {
                cc.log("playCardAni_feiji_new qianfen");
                playCardAni_feiji_new(cards,UIoff);
            }
                else
            {
                playCardAni_feiji(cards,UIoff);
            }

            break;
        case CARDTPYE.sztonghua:
            playCardAni_tonghuashun_PDK(UIoff);
        case CARDTPYE.sangeA://AAA
        case CARDTPYE.sange3://AAA
        case CARDTPYE.sizha:
            if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI&&
                !MjClient.data.c_Data.bPutCardAnimOld)
            {
                playCardAni_zhadan_new(cards,UIoff);
            }
            else
            {
                playCardAni_tonghuashun(UIoff);
            }
            break;
        case CARDTPYE.sidaiyi:
        case CARDTPYE.sangeAdaiyi:
        case CARDTPYE.sange3daiyi:
            if ((MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW||
                MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN)
                &&!MjClient.data.c_Data.bPutCardAnimOld)
            {
                var tData = MjClient.data.sData.tData;
                if (tData.areaSelectMode.canZhaDanDai1 && tData.areaSelectMode.canZhaDanDai1 )
                    playCardAni_zhadan_new(cards,UIoff);
                else
                    playCardAni_tonghuashun(UIoff);
            }

            break;
        case CARDTPYE.tianwangzha://四个王
        case CARDTPYE.wangzha:
            {
                if(MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG){
                    playEffectInPlay("ani_wangzha");
                    playCardAni_WangZha(UIoff, cards.length);
                    break;
                }

                playCardAni_siwang(UIoff);
            
                // if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE)
                //     playEffectInPlay("ani_wangzha");

                if (MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI || 
                    MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
                    MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                    MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
                    MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                    MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                    MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K)
                    playEffectInPlay("ani_wangzha");
            }

            break;
        case CARDTPYE.shunzi:
            if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
                MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
                MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN )
                break;

            if((GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI ||
                MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN || 
                MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)&&
                !MjClient.data.c_Data.bPutCardAnimOld)
            {
                cc.log("playCardAni_shunzi_new qianfen");
                playCardAni_shunzi_new(cards,UIoff);
            }
            else
            {
                playCardAni_shunzi(cards,UIoff);
            }
            break;
        case CARDTPYE.liandui:
            if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE)
                break;

            if((GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI || 
                MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI || 
                MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
                MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG || 
                MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG || 
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN || 
                MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN)&&
                !MjClient.data.c_Data.bPutCardAnimOld)
            {
                cc.log("playCardAni_liandui_new qianfen");
                playCardAni_liandui_new(cards,UIoff);
            }
            else if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA 
                || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA
                || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA 
                || MjClient.gameType == MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA 
                || MjClient.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA){
                MjClient.playui.playCardAni_liandui();
            }
            else
            {
                playCardAni_liandui(cards,UIoff);
            }
            break;
        case CARDTPYE.tonghuashun:
        case CARDTPYE.sizha:
        case CARDTPYE.wuzha:
        case CARDTPYE.liuzha:
        case CARDTPYE.qizha:
        case CARDTPYE.bazha:
        case CARDTPYE.jiuzha:
        case CARDTPYE.shizha:
        case CARDTPYE.f_510k:
        case CARDTPYE.z_510k:
            playCardAni_tonghuashun(UIoff);

            if (MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
                MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K) {
                if (cardType == CARDTPYE.f_510k || cardType == CARDTPYE.z_510k)
                    playEffectInPlay("ani_K105");
            }

            break;
    }
}

//播放牌型动画----文字贴图版本
function playCardAni_txtsprite(cards,UIoff)
{
    var cardType = MjClient.majiang.cardsType(cards, MjClient.data.sData.tData.areaSelectMode);
    cc.log("牌型 = "+cardType);
    var CARDTPYE = MjClient.majiang.CARDTPYE;

    if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU)
    {
        var tData = MjClient.data.sData.tData;
        var pl = getUIPlayer(UIoff);
        var cardCount = 17;
        if(tData.uids[tData.zhuang] == pl.info.uid)
        {
            cardCount = 20;
        }
        if(pl.isChunTian)
        {
            //春天的动画
            playCardAni_chuntian(UIoff);
            return;
        }
    }
    // xunhangdaodan: 20,
    //     sangeAdaiyi: 19,
    // sidaiyi: 18,
    // sange3daiyi: 17,
    // szdaipai: 16,
    // sztonghua: 15,
    // sizha: 14,
    // sidaisan: 13,
    // sandaier: 12,
    // feiji: 11,
    // sanshun: 10,
    // sidaier: 9,
    // sangeA: 8,
    // sange3: 7,
    // sandaiyi: 6,
    // liandui: 5,
    // shunzi: 4,
    // sanzhang: 3, // 只能最后一次出牌有效
    // duizi: 2,
    // danpai: 1,
    var strSpritePath = "";
    switch (cardType)
    {
        case CARDTPYE.xunhangdaodan:
        {
            strSpritePath = "playing/paodekuaiTable_new/txtsprite/xunhangdaodan.png";
            break;
        }
        case CARDTPYE.zhadan:
        case CARDTPYE.ruanzha:
        case CARDTPYE.huojian:
        case CARDTPYE.sangeA:
        case CARDTPYE.sange3:
        case CARDTPYE.sizha:
        case CARDTPYE.wuzha:
        case CARDTPYE.liuzha:
        case CARDTPYE.qizha:
        case CARDTPYE.bazha:
        case CARDTPYE.jiuzha:
        case CARDTPYE.shizha:;
        case CARDTPYE.tianwangzha:
        {
            strSpritePath = "playing/paodekuaiTable_new/txtsprite/zhadan.png";
            break;
        }
        case CARDTPYE.sanshun:
        {
            strSpritePath = "playing/paodekuaiTable_new/txtsprite/sanshun.png";
            break;
        }
        case CARDTPYE.feiji:
        {
            strSpritePath = "playing/paodekuaiTable_new/txtsprite/feiji.png";
            break;
        }
        case CARDTPYE.sztonghua:
        case CARDTPYE.tonghuashun:
        {
            strSpritePath = "playing/paodekuaiTable_new/txtsprite/tonghuashun.png";
            break;
        }
        case CARDTPYE.shunzi:
        {
            strSpritePath = "playing/paodekuaiTable_new/txtsprite/shunzi.png";
            break;
        }
        case CARDTPYE.liandui:
        {
            strSpritePath = "playing/paodekuaiTable_new/txtsprite/liandui.png";
            break;
        }
        case CARDTPYE.sidaiyi:
        case CARDTPYE.sangeAdaiyi:
        case CARDTPYE.sange3daiyi:
        {
            if (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW||
                MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN)
            {
                var tData = MjClient.data.sData.tData;
                if (tData.areaSelectMode.canZhaDanDai1 && tData.areaSelectMode.canZhaDanDai1 )
                    strSpritePath = "playing/paodekuaiTable_new/txtsprite/zhadan.png";
            }

            if(MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI ){
                var tData = MjClient.data.sData.tData;
                if (tData.areaSelectMode.can4dai1 ){
                    strSpritePath = "playing/paodekuaiTable_new/txtsprite/zhadan.png";
                    break;
                }
            }
            return;
        }

    }

    var txtSprite = cc.Sprite(strSpritePath);
    var _node = getNode_cards(UIoff);
    var _nodeAni = _node.getChildByName("deskCard");
    txtSprite.setScale(_nodeAni.getScale()*2);
    txtSprite.setPosition(_nodeAni.getPosition().x, _nodeAni.getPosition().y - 20);
    _node.addChild(txtSprite,9999);
    txtSprite.runAction(cc.sequence( cc.moveBy(0.5, 50, 0),cc.removeSelf()));
}


//播放牌型音效
function playCardEffect(putCards, handCount)
{
    var tData = MjClient.data.sData.tData;

    var cardType;

    // 为毛三打哈、打七相关要计算两次cardType，而且函数传参还不对??? 果断注释

    // if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA || 
    //     MjClient.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA){
    //     cardType = MjClient.majiang.cardsType(putCards, tData.zhuPaiType,tData.areaSelectMode.teshutuolaji,tData.areaSelectMode.chou6);
    // }else if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA){
    //     cardType = MjClient.majiang.cardsType(putCards, tData.zhuPaiType, tData.areaSelectMode.chou6);
    // }else{
    //     cardType = MjClient.majiang.cardsType(putCards, MjClient.data.sData.tData.areaSelectMode, MjClient.data.sData.tData);
    // }

    // 三打哈、打七只下面计算
    if (GameClass[MjClient.gameType] != MjClient.GAME_CLASS.DA_QI && GameClass[MjClient.gameType] != MjClient.GAME_CLASS.SAN_DA_HA) {
        cardType = MjClient.majiang.cardsType(putCards, tData.areaSelectMode, tData);
    }

    cc.log("牌型 =-------- "+cardType);

    function _removeLaiZiSignAndGetValue(cards){
        var cd = cards;
        if(MjClient.majiang && MjClient.majiang.removeLaiziSign && MjClient.majiang.haveLaiziSign){
            if(MjClient.majiang.haveLaiziSign(cd)){
                cd = MjClient.majiang.removeLaiziSign(cd);
            }
        }
        return cd;
    }


    var CARDTPYE = MjClient.majiang.CARDTPYE;
    if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI ||
        GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU || 
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE ||
        MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
        MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
        MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
        MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN ||
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN )
    {

        // 解决问题：矫正同花顺带牌作为顺子压牌时的语音
        if (cardType == CARDTPYE.szdaipai) {
            if (MjClient.putTypeSaved)
                cardType = CARDTPYE.shunzi;
        } else if (MjClient.putTypeSaved)
            delete MjClient.putTypeSaved;

        switch (cardType)
        {
            case CARDTPYE.danpai:
                var card = putCards[0];
                if (card == 53 || card == 54)//小王大王
                {
                    cc.log("============= 大小王 = " + card);
                    playEffectInPlay(card);
                }
                else
                {
                    card = Math.ceil(card / 4);
                    playEffectInPlay(card);
                }
                break;
            case CARDTPYE.duizi:
                var card = putCards[1];
                card = _removeLaiZiSignAndGetValue(card);
                if (card != 53 && card != 54)
                {
                    card = Math.ceil(card / 4);
                }
                playEffectInPlay("d"+card);
                break;
            case CARDTPYE.sanzhang:
                var card = putCards[1];
                card = _removeLaiZiSignAndGetValue(card);
                if(MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG && 
                    (card == 53 || card == 54)){
                    playEffectInPlay("sgui");
                    break;
                }
                card = Math.ceil(card / 4);
                playEffectInPlay("s"+card);
                break;
            case CARDTPYE.sizhang:
                var card = putCards[1];
                card = _removeLaiZiSignAndGetValue(card);
                card = Math.ceil(card / 4);
                playEffectInPlay("sizhang"+card);
                break;
            case CARDTPYE.sanwang:
                playEffectInPlay("sgui");
                break;
            case CARDTPYE.shunzi:
                // 解决问题：矫正同花顺带牌作为顺子压牌时的语音
                if (CARDTPYE.szdaipai && CARDTPYE.szdaipai > 0) {
                    MjClient.putTypeSaved = CARDTPYE.shunzi;
                }
                playEffectInPlay("shunzi");
                break;
            case CARDTPYE.liandui:
                {
                    if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE)
                    {
                        if (putCards.length == 6)
                            playEffectInPlay("lian3dui");
                        else
                            playEffectInPlay("liandui");
                    } else if (MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
                         MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
                         MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                         MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
                         MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
                         MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                        MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                         MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K) {
                        playEffectInPlay("lian" + putCards.length/2 + "dui");
                    }
                    else
                        playEffectInPlay("liandui");
                }
                break;
            case CARDTPYE.sandaiyi:
                playEffectInPlay("sandaiyi");
                break;
            case CARDTPYE.sandaier:
                playEffectInPlay("sandaier");
                break;
            case CARDTPYE.sidaier:
                playEffectInPlay("sidaier");
                break;
            case CARDTPYE.sidaisan:
                playEffectInPlay("sidaisan");
                break;
            case CARDTPYE.sidaier2:
                playEffectInPlay("sidaier2");
                break;
            case CARDTPYE.sanshun:
            case CARDTPYE.feiji:
            case CARDTPYE.feiji2:
                playEffectInPlay("feiji");
                break;
            case CARDTPYE.gunlong:
            case CARDTPYE.f_510kgunlong:
            case CARDTPYE.z_510kgunlong:
                playEffectInPlay("zhandan");
                playEffectInPlay("bomb1");
                break
            case CARDTPYE.zhadan:
            case CARDTPYE.sizha:
            case CARDTPYE.ruanzha:
            case CARDTPYE.ruanzha2:
            case CARDTPYE.sangeA://AAA
            case CARDTPYE.sange3://AAA
            case CARDTPYE.tianjian:
            case CARDTPYE.wang382a:
                if( MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
                    MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                    MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG || 
                    MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG || 
                    MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                    MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                    MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K){
                    playEffectInPlay("zhandan");
                    playEffectInPlay("bomb1");
                    break;
                }

                if (putCards.length == 5) {
                    if (MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN && 
                        MjClient.gameType != MjClient.GAME_TYPE.WU_XUE_GE_BAN) {
                        var card = putCards[1];
                        card = Math.ceil(card / 4);
                        playEffectInPlay("wuzhang"+card);
                    } else {
                        playEffectInPlay("bomb1");
                    }
                }
                else if (MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN && putCards.length == 2)
                    playEffectInPlay("wangzha");
                else
                    playEffectInPlay("bomb1");
                break;
            case CARDTPYE.sidaiyi:
            case CARDTPYE.sangeAdaiyi:
            case CARDTPYE.sange3daiyi:
                if (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW||
                    MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN)
                    playEffectInPlay("bomb1");
                break;
            case CARDTPYE.xunhangdaodan:
                playEffectInPlay("bomb1");
                break;
            case CARDTPYE.huojian:
                playEffectInPlay("huojian");
                break;
            case CARDTPYE.sztonghua:
            case CARDTPYE.tonghuashun:
                playEffectInPlay("tonghuashun");
                break;
            case CARDTPYE.szdaipai:
                playEffectInPlay("tonghuashunDaipai");
                break;
            case CARDTPYE.f_510k:
                playEffectInPlay("f_510k");
                break;
            case CARDTPYE.z_510k:
                playEffectInPlay("z_510k");
                break;
            case CARDTPYE.wangzha:// 王炸
                if(MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K || MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
                    MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN || MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K){
                    if(putCards.length == 3){
                        playEffectInPlay("sgui");
                        break;
                    }else if(putCards.length == 2 ){
                        if(putCards[0] == putCards[1]){
                            if(putCards[0] == 53 ){
                                playEffectInPlay("d53");
                            }else{
                                playEffectInPlay("d54");
                            }
                        }else{
                            playEffectInPlay("d5354"); 
                        }
                        break;
                    }
                }
                if(MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ){
                    //playEffectInPlay("wangzha");
                    playEffectInPlay("wangzhan_new"); 
                    break;
                }
                playEffectInPlay("wangzha");
                break;
            case CARDTPYE.zhadan6:// 炸弹6、7、8张
            case CARDTPYE.zhadan7:
            case CARDTPYE.zhadan8:
                playEffectInPlay("zhadan" + putCards.length);
                break;
            case CARDTPYE.s_2wang:
                if (putCards[0] == putCards[1])
                    playEffectInPlay("d53");
                else
                    playEffectInPlay("d5354");

                break;
            case CARDTPYE.b_2wang:
                playEffectInPlay("d54");
                break;
        }

        switch (cardType)
        {
            case CARDTPYE.sizha:
            case CARDTPYE.sange3:
            case CARDTPYE.sange3daiyi:
                playEffect("guandan/bombAct");
                break;
            case CARDTPYE.sidaiyi:
                if (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW )
                    playEffect("guandan/bombAct");
                if(MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI){
                    playEffect("guandan/bombAct");
                    playEffectInPlay("bomb1");
                }
                break;
            case CARDTPYE.sangeA://AAA
            case CARDTPYE.sangeAdaiyi:
            case CARDTPYE.xunhangdaodan:
                playEffect("guandan/siwangAct");
                break;
        }

        if ((MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
            MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
            MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
            MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K) &&
            handCount == 0 && 
            MjClient.CheckPlayerCount(function(pl){return pl.handCount == 0;}) == 1)
        {
            playEffectInPlay("touyou");
        }
    }
    else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA ||
             MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER ||
             MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI)
    {
        if((MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI ||
            MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA ||
            MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO ||
            MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA ||
            MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA_NEW ||
            MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER ||
            MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA ||
            MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA ||
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA ||
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA || 
            MjClient.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA) &&
        tData.firstPutCardUid != tData.uids[tData.curPlayer]){
            //三打哈和打七玩法只有第一张有语音
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI){
            cardType = MjClient.majiang.cardsType(putCards, tData.zhuPaiType);
            var isZhu = MjClient.majiang.isZhuCard(putCards[0], tData.zhuPaiType);
            switch (cardType)
            {
                case MjClient.majiang.CARDTPYE.liandui:
                    playEffectInPlay(isZhu ? "diaozhu" : "tractor");
                    break;
                case MjClient.majiang.CARDTPYE.duizi:
                    playEffectInPlay(isZhu ? "diaozhu" : "pair");
                    break;
                case MjClient.majiang.CARDTPYE.danpai:
                    playEffectInPlay(isZhu ? "diaozhu" : "oneCard");
                    break;
                default:
                    if (tData.isCanShuaiPai && tData.firstPutCardUid == tData.uids[tData.curPlayer] && isZhu)
                        playEffectInPlay("swingcard");
            }
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER){
            cardType = MjClient.majiang.cardsType(putCards, tData.zhuPaiType);
            var isZhu = MjClient.majiang.isZhuCard(putCards[0], tData.zhuPaiType,tData.areaSelectMode["twoIsChangZhu"]);
            switch (cardType)
            {
                case MjClient.majiang.CARDTPYE.liandui:
                    playEffectInPlay(isZhu ? "tractormain" : "tractor");
                    break;
                case MjClient.majiang.CARDTPYE.duizi:
                    // playEffectInPlay(isZhu ? "pairsMain" : "pair");
                    // break;
                    var card = putCards[1];
                    card = Math.ceil(card / 4);
                    playEffectInPlay(isZhu ?"diaozhu":"duiPai_"+card);
                    break;
                case MjClient.majiang.CARDTPYE.danpai:
                    // playEffectInPlay(isZhu ? "oneMainCard" : "oneCard");
                    // break;
                    var card = putCards[0];
                    card = Math.ceil(card / 4);
                    playEffectInPlay(isZhu ?"oneMainCard":"oneCard");
                    break;
                default:
                    if (tData.isCanShuaiPai && tData.firstPutCardUid == tData.uids[tData.curPlayer] && isZhu)
                        playEffectInPlay("swingcard");
            }
        }
        else {
            if (MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA || 
                MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA || 
                MjClient.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA) {
                cardType = MjClient.majiang.cardsType(putCards, tData.zhuPaiType, tData.areaSelectMode.teshutuolaji, tData.areaSelectMode.chou6);
            } else
                cardType = MjClient.majiang.cardsType(putCards, tData.zhuPaiType, tData.areaSelectMode.chou6, tData.areaSelectMode.daWuZhu27NotTuoLaJi);

            var isZhu = MjClient.majiang.isZhuCard(putCards[0], tData.zhuPaiType, tData.areaSelectMode["twoIsChangZhu"]);
            
            switch (cardType)
            {
            case MjClient.majiang.CARDTPYE.liandui:
                playEffectInPlay(isZhu ? "tractormain" : "tractor");
                break;
            case MjClient.majiang.CARDTPYE.duizi:
                // playEffectInPlay(isZhu ? "pairsMain" : "pair");
                // break;
                var card = putCards[1];
                card = Math.ceil(card / 4);
                playEffectInPlay(isZhu ?"diaozhu":"duiPai_"+card);
                break;
            case MjClient.majiang.CARDTPYE.danpai:
                // playEffectInPlay(isZhu ? "oneMainCard" : "oneCard");
                // break;
                var card = putCards[0];
                card = Math.ceil(card / 4);
                playEffectInPlay(isZhu ?"diaozhu":"danpai_"+card);
                break;
            default:
                if (tData.isCanShuaiPai && tData.firstPutCardUid == tData.uids[tData.curPlayer] && isZhu)
                    playEffectInPlay("swingcard");
            }
        }
    }
    else
    {

        if (handCount == 0 && MjClient.CheckPlayerCount(function(pl){return pl.handCount == 0;}) == 1)
        {
            playEffectInPlay("touyou");
        }
        else
        {
            switch (cardType)
            {
                case CARDTPYE.danpai:
                    var card = putCards[0];
                    if (card == 53 || card == 54)//小王大王
                    {
                        playEffectInPlay(card);
                    }
                    else
                    {
                        card = Math.ceil(card / 4);
                        playEffectInPlay(card);
                    }
                    break;
                case CARDTPYE.duizi:
                    var card = putCards[0];
                    if (card == 7)
                    {
                        card = putCards[1];
                    }

                    if (card == 53 || card == 54)//小王大王
                    {

                    }
                    else
                    {
                        card = Math.ceil(card / 4);
                        playEffectInPlay("d"+card);
                    }
                    break;
                case CARDTPYE.sanzhang:
                    playEffectInPlay("sanzhang");
                    break;
                case CARDTPYE.shunzi:
                    playEffectInPlay("shunzi");
                    break;
                case CARDTPYE.sandaier:
                    playEffectInPlay("threetwo");
                    break;
                case CARDTPYE.liandui:
                    playEffectInPlay("liandui");
                    break;
                case CARDTPYE.gangban:
                    playEffectInPlay("gangban");
                    break;
                case CARDTPYE.sizha:
                case CARDTPYE.wuzha:
                case CARDTPYE.liuzha:
                case CARDTPYE.qizha:
                    cc.log("----------------------bomb1");
                    playEffectInPlay("bomb1");
                    break;
                case CARDTPYE.bazha:
                case CARDTPYE.jiuzha:
                case CARDTPYE.shizha:
                case CARDTPYE.tianwangzha://四个王
                    playEffectInPlay("bomb2");
                    break;
                case CARDTPYE.tonghuashun:
                    playEffectInPlay("tonghuashun");
                    break;

            }
        }

        switch (cardType)
        {
            case CARDTPYE.sizha:
            case CARDTPYE.wuzha:
            case CARDTPYE.liuzha:
            case CARDTPYE.qizha:
            case CARDTPYE.bazha:
            case CARDTPYE.jiuzha:
            case CARDTPYE.shizha:
                playEffect("guandan/bombAct");
                break;
            case CARDTPYE.tianwangzha://四个王
                playEffect("guandan/siwangAct");
                break;
            case CARDTPYE.tonghuashun:
                playEffect("guandan/tongHuaShunAct");
                break;
        }
    }


    
}

//回放的时候换了位置重新刷新手牌
function refreshHandCardForReplay(UIOff)
{
    cc.log("refreshHandCardForReplay----------------" + UIOff);
    if(UIOff == 0)
    {
        return;
    }

    var pl = getUIPlayer(UIOff);
    if(!pl || cc.isUndefined(pl.mjhand))
    {
        return;
    }

    var _UINode = getNode_cards(UIOff);
    var children = _UINode.getChildren();
    for(var i = 0; i < children.length; i++)
    {
        if(children[i].name == "mjhand_replay")
        {
            //cc.log("============mjhand_replay remove children============");
            children[i].removeFromParent();
        }
    }

    //cc.log("============refreshHandCardForReplay============" + UIOff);

    for (var i = 0; i < pl.mjhand.length ; i++) {
        getNewCard_card(_UINode, "stand", "mjhand_replay", pl.mjhand[i], UIOff);
    }
    MjClient.playui.CardLayoutRestore(_UINode, UIOff);
}


//理牌
function collectionCards()
{

    ///当前选中的牌的UI节点
    var _tempColloctionCardArray = [];
    var _tempColloctionCardsUIArray = [];
    var _copySelcetCardArray = MjClient.colloctionCurrentSelcetUIArray.slice();


    //for(var k = 0 ; k < _copySelcetCardArray.length;k++)
    {
        for(var i = 0;i< MjClient.colloctionCardsUIArray.length;i++) {
            var _colloctionUICards = MjClient.colloctionCardsUIArray[i];
            var _colloctionCards = [];
            var _colloctionCardsUI = [];
            for(var j = 0;j < _colloctionUICards.length;j++) {
                var bExist = false;
                for(var k = 0 ; k < _copySelcetCardArray.length;)
                {
                    if (_copySelcetCardArray[k].tag == _colloctionUICards[j].tag &&
                        _copySelcetCardArray[k].getUserData() == _colloctionUICards[j].getUserData()
                    )
                    {
                        cc.log("continue----" + _copySelcetCardArray[k].tag);
                        var index = _copySelcetCardArray.indexOf(_copySelcetCardArray[k]);
                        _copySelcetCardArray.splice(index, 1);
                        bExist = true;
                    }
                    else
                    {
                        k++;
                    }
                }

                if(!bExist)
                {
                    cc.log("%%%%%%%%%   " + _colloctionUICards[j].tag);
                    _colloctionCards.push(_colloctionUICards[j].tag);
                    _colloctionCardsUI.push(_colloctionUICards[j]);
                }
            }

            _tempColloctionCardArray[i] = _colloctionCards;
            _tempColloctionCardsUIArray[i] = _colloctionCardsUI;
        }
    }


    MjClient.colloctionCardsArray  = _tempColloctionCardArray;
    MjClient.colloctionCardsUIArray = _tempColloctionCardsUIArray;


    //利好的牌
    for(var i  =  0;i < MjClient.colloctionCardsUIArray.length;i++)
    {
        var _colloctionUICards = MjClient.colloctionCardsUIArray[i];
        for(var j = 0;j < _colloctionUICards.length;j++) {
            cc.log("理牌堆里面的牌000：" + _colloctionUICards[j].tag);
            //cc.log("理牌堆里面的牌 DATA ：" + _colloctionUICards[j].getUserData());
        }
    }


    var _length = MjClient.colloctionCardsArray.length;
    MjClient.colloctionCardsArray[_length] = MjClient.selectCards_card.slice();//理牌数组


    var _lengthui = MjClient.colloctionCardsUIArray.length;
    MjClient.colloctionCardsUIArray[_lengthui] = MjClient.colloctionCurrentSelcetUIArray.slice();//理牌数组UI


    cc.log("MjClient.colloctionCardsArray = " + JSON.stringify(MjClient.colloctionCardsArray));
    var node = getNode_cards(0);
    MjClient.selectCards_card = [];
    if(MjClient.sortClassType == 0)
    {
        setCardToNormalPos();
    }
    else
    {
        setCardToNormalColor();
    }
    MjClient.playui.CardLayoutRestore(node,0);
    UpdataCurrentPutCard();
}

//恢复
function recoverCards()
{
    MjClient.colloctionCardsArray = [];
    MjClient.colloctionCardsUIArray = [];
    MjClient.selectCards_card = [];
    if(MjClient.sortClassType == 0) {
        setCardToNormalPos();
    }
    else {
        setCardToNormalColor();
    }
    MjClient.cardIdx = 0;
    MjClient.playui.CardLayoutRestore(MjClient.playui._downNode, 0);
    UpdataCurrentPutCard();
}

//从手牌mjhand中排除，excludeCards的牌后的牌
function getExcludeCards(mjhand,_excludeCards)
{
    //cc.log("================excludeCards = " + _excludeCards);
    var excludeCards = _excludeCards.slice();
    var mjhand_copy = mjhand.slice();
    var _getCardS = [];
    //弹出选择的牌
    for(var m = 0; m < mjhand_copy.length; m++)
    {
        var bExsit = false;
        for(var n = 0;n < excludeCards.length;n++)
        {
            if(mjhand_copy[m] == excludeCards[n])
            {
                var index = excludeCards.indexOf(excludeCards[n]);
                excludeCards.splice(index,1);
                bExsit = true;
                break;
            }
        }

        if(!bExsit)
        {
            _getCardS[_getCardS.length] = mjhand_copy[m];
        }
    }
    return _getCardS;
}


//检查同花顺
function checkTongHuaShun()
{
    var mjhand = getUIPlayer(0).mjhand;
    if (cc.isUndefined(mjhand) || mjhand == null)
    {
        return;
    }

    if (!MjClient.majiang.tipTonghuashuns)
        return;

    var UI_bg = MjClient.playui._bg_sort;
    MjClient.tongHuaShunArray = MjClient.majiang.tipTonghuashuns(mjhand);
    cc.log("---checkTongHuaShun MjClient.tongHuaShunArray = " + JSON.stringify(MjClient.tongHuaShunArray));
    var _path = "playing/cardTable/";
    if(MjClient.tongHuaShunArray.length > 0)
    {
        for(var i = 0;i < 4;i++)
        {
            var flowerNode = UI_bg.getChildByName("Button_" + i);
            if(MjClient.tongHuaShunArray[i].length > 0)
            {
                switch (i)
                {
                    case 0:
                        flowerNode.loadTextureNormal(_path + "heitao_n" + ".png");
                        break;
                    case 1:
                        flowerNode.loadTextureNormal(_path + "fangpian_n" + ".png");
                        break;
                    case 2:
                        flowerNode.loadTextureNormal(_path + "meihua_n" + ".png");
                        break;
                    case 3:
                        flowerNode.loadTextureNormal(_path + "hongtao_n" + ".png");
                        break;
                }
                flowerNode.setTouchEnabled(true);
            }
            else
            {
                switch (i)
                {
                    case 0:
                        flowerNode.loadTextureNormal(_path + "heitao_hui" + ".png");
                        break;
                    case 1:
                        flowerNode.loadTextureNormal(_path + "fangpian_hui" + ".png");
                        break;
                    case 2:
                        flowerNode.loadTextureNormal(_path + "meihua_hui" + ".png");
                        break;
                    case 3:
                        flowerNode.loadTextureNormal(_path + "hongtao_hui" + ".png");
                        break;
                }
                flowerNode.setTouchEnabled(false);
            }
        }
    }
}


//排除当前存在的UI节点
function checkUINodeHave(uiNodeArray,currentUI)
{
    var bHave = false;
    for(var i = 0; i < uiNodeArray.length; i++) {
        var _uiArray = uiNodeArray[i];
        if(!_uiArray) continue;
        for(var j = 0; j < _uiArray.length; j++) {

            if(_uiArray[j].tag == currentUI.tag &&
                _uiArray[j].getUserData() == currentUI.getUserData() )
            {
                bHave = true;
                break;
            }
        }
    }
    return bHave;
}

function checkUIHave(uiNodeArray,currentUI)
{
    var bHave = false;
    for(var i = 0; i < uiNodeArray.length; i++) {
            if(uiNodeArray[i].tag == currentUI.tag &&
                uiNodeArray[i].getUserData() == currentUI.getUserData() )
            {
                bHave = true;
                break;
            }
        }
    return bHave;
}


function initSortUI()
{
    var UI_bg = MjClient.playui._bg_sort;
    UI_bg.setTouchEnabled(false);
    MjClient.cardIdx = 0;
    cc.log('wwwwww333')
    function _eventCallBack(sender,type)
    {
        if(type == 2)
        {
            var itag = sender.getTag();
            checkTongHuaShun();
            if( MjClient.cardIdx >= MjClient.tongHuaShunArray[itag].length)
            {
                MjClient.cardIdx = 0;
            }

            selectUICards(MjClient.tongHuaShunArray[itag][ MjClient.cardIdx]);
            MjClient.selectCards_card = MjClient.tongHuaShunArray[itag][ MjClient.cardIdx];

            cc.log("after tonghuashun  = " + JSON.stringify(MjClient.tongHuaShunArray));
            cc.log('xxxxxx999')
            UpdataCurrentPutCard();
            MjClient.cardIdx++;
        }
    }

    for(var i = 0;i < 4;i++)
    {
        var flowerNode = UI_bg.getChildByName("Button_" + i);
        if (flowerNode)
        {
            flowerNode.addTouchEventListener(_eventCallBack,MjClient.playui);
            flowerNode.setTag(i);
        }
    }

    //理牌
    var _ButtonSort = UI_bg.getChildByName("Button_sort");
    _ButtonSort.visible = false;
    _ButtonSort.addTouchEventListener(function(sender,type){
        if(type == 2)
        {
            if(MjClient.isSorting)
            {
                cc.log("理牌");
                //理牌
                _ButtonSort.loadTextureNormal("playing/cardTable/huifu.png");
                MjClient.isSorting = false;
                //_ButtonSort.setTouchEnabled(false)
                collectionCards();
            }
            else
            {
                _ButtonSort.loadTextureNormal("playing/cardTable/lipai.png");
                MjClient.isSorting = true;
                _ButtonSort.visible = false;
                //_ButtonSort.setTouchEnabled(false)
                cc.log("恢复");
                //恢复
                recoverCards();
            }
            MjClient.colloctionCurrentSelcetUIArray = [];
        }
    },MjClient.playui);

}


//设置地区信息
function setAreaTypeInfo_card(isVisible)
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

/**************************************************************************************************************
                                            斗地主新增函数
***************************************************************************************************************/
/*
    抢地主
 */
function sendQiangdizhu(bQiang)
{
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "Qiangdizhu",
        qiang: bQiang
    });
}

/*
    设置抢地主标志
*/
function setQiangDiZhu(msg)
{


}


/*
    处理抢地主,晋中斗地主
 */
function DealQiangdizhu_jinzhong(msg)
{
    if(!MjClient.playui.isJD())
    {
        return DealQiangdizhu(msg);
    }


    var _uid = msg.uid;
    var _qiang = msg.qiang;
    var _hasJiao = msg.hasJiao;
    var tData = MjClient.data.sData.tData;
    if(typeof(msg.curPlayer) != "undefined"){
        tData.curPlayer = msg.curPlayer;
    }

    //todo...收到抢到地主的人
    var _off = getUiOffByUid(_uid);
    var pl = getUIPlayer(_off);
    var _node = getNode_cards(_off);
    cc.log(_off + " = off --------------处理抢地主----------------------JZ:" + JSON.stringify(msg));
    var _dizhutag = _node.getChildByName("jiaodizhuTag");
    _dizhutag.visible = true;
    _dizhutag.ignoreContentAdaptWithSize(true);
    if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HA||
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT){
        _dizhutag.setScale(1);
    }else{
        _dizhutag.setScale(1.3);
    }

    cc.log('wwwwww444')
    if(_qiang != 0)
    {

        MjClient.selectCards_card = [];
        _dizhutag.loadTexture("playing/doudizhu/fen_"+_qiang + ".png");
        playEffectInPlay("robDZScore"+_qiang.toString())
    }
    else
    {
        if(_hasJiao)
        {
            //不抢
            playEffectInPlay("notRobDZ");
            if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HA||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT){
                _dizhutag.loadTexture("playing/doudizhu/buqiang2.png");
            }else{
                _dizhutag.loadTexture("playing/paodekuaiTable/buqiang2.png");
            }

        }
        else {
            //不叫
            playEffectInPlay("bujiao");
            if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HA||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT){
                _dizhutag.loadTexture("playing/doudizhu/bujiao.png");
            }else{
                _dizhutag.loadTexture("playing/paodekuaiTable/bujiao.png");
            }

        }
    }
}


/*
    处理抢地主
 */
function DealQiangdizhu(msg)
{
    var _uid = msg.uid;
    var _qiang = msg.qiang;
    var _hasJiao = msg.hasJiao;
    var tData = MjClient.data.sData.tData;
    if(typeof(msg.curPlayer) != "undefined"){
        tData.curPlayer = msg.curPlayer;
    }

    //todo...收到抢到地主的人
    var _off = getUiOffByUid(_uid);
    var pl = getUIPlayer(_off);
    var _node = getNode_cards(_off);
    cc.log(_off + " = off --------------处理抢地主----------------------" + JSON.stringify(msg));
    var _dizhutag = _node.getChildByName("jiaodizhuTag");
    _dizhutag.visible = true;
    _dizhutag.ignoreContentAdaptWithSize(true);

    if(_qiang)
    {
        MjClient.selectCards_card = [];
        if(_hasJiao)
        {
            //抢地主音效缺失
            playEffectInPlay("robDZ");
            if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HA||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT){
                _dizhutag.loadTexture("playing/doudizhu/qiangdizhu2.png");
            }else{
                _dizhutag.loadTexture("playing/paodekuaiTable/qiangdizhu2.png");
            }

        }
        else
        {
            //叫地主
            playEffectInPlay("jiaodizhu");
            if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HA||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT){
                _dizhutag.loadTexture("playing/doudizhu/jiaodizhu.png");
            }else{
                _dizhutag.loadTexture("playing/paodekuaiTable/jiaodizhu.png");
            }
        }
    }
    else
    {
        if(_hasJiao)
        {
            //不抢
            playEffectInPlay("notRobDZ");
            if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HA||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT){
                _dizhutag.loadTexture("playing/doudizhu/buqiang2.png");
            }else{
                _dizhutag.loadTexture("playing/paodekuaiTable/buqiang2.png");
            }
        }
        else {
            //不叫
            playEffectInPlay("bujiao");
            if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HA||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT){
                _dizhutag.loadTexture("playing/doudizhu/bujiao.png");
            }else{
                _dizhutag.loadTexture("playing/paodekuaiTable/bujiao.png");
            }
        }
    }
}
/*
* 地主坐标从屏幕中间平移到玩家头像旁边
* 
* */
function dizhufrommiddleTOHead(msg) {

    var UIOff = getOffByIndex(msg.zhuang);
    var pl = getUIPlayer(UIOff);
    var _node = getNode_cards(UIOff); //设置谁是地主的标记
    _node.getChildByName("head").getChildByName("icon_dizhu").visible = true;
    var orgPos= _node.getChildByName("head").getChildByName("icon_dizhu").getPosition();
    var scencesize=MjClient.size;
    var centerPos1= _node.convertToNodeSpace(cc.p(scencesize.width/2,scencesize.height/2));
    var  headnode=_node.getChildByName("head");
    var centerPos2= headnode.convertToNodeSpace(cc.p(centerPos1.x,centerPos1.y));
    var dizhunode=headnode.getChildByName("icon_dizhu");
    dizhunode.setPosition(cc.p(centerPos2.x,centerPos2.y+80));
    dizhunode.setScale(3);
    var ac1=cc.MoveTo(0.3,orgPos);
    var ac2=cc.ScaleTo(0.3,1);
    dizhunode.runAction(cc.sequence(cc.DelayTime(0.6),cc.spawn(ac1,ac2)));


}
//清空常规地主牌
function clearddzcardthree(node,isLF) {
    var _card0 = node.getChildByName("dizhuCards_0");
    var _card1 = node.getChildByName("dizhuCards_1");
    var _card2 = node.getChildByName("dizhuCards_2");
    _card0.removeAllChildren();
    _card1.removeAllChildren();
    _card2.removeAllChildren();
    _card0.isPKImg = false;
    _card1.isPKImg = false;
    _card2.isPKImg = false;
    _card0.loadTexture("playing/cardPic2/beimian_puke.png");
    _card1.loadTexture("playing/cardPic2/beimian_puke.png");
    _card2.loadTexture("playing/cardPic2/beimian_puke.png");
    _card0.tag=-1;
    _card1.tag=-1;
    _card2.tag=-1;
    if(isLF){
        var _card3 = node.getChildByName("dizhuCards_3");
        _card3.removeAllChildren();
        _card3.isPKImg = false;
        _card3.loadTexture("playing/cardPic2/beimian_puke.png");
        _card3.tag=-1;
    }
}

/*
    翻地主的三张牌
    isfly bool值，为true ,地主会飞到头像旁边
 */
function DealDDZdipai(node,msg)
{
    var tData = MjClient.data.sData.tData;
    var _cards    = msg.diCards;
    var _dizhuUid =  msg.zhuang;
    tData.zhuang = msg.zhuang;

    var _card0 = node.getChildByName("dizhuCards_0");
    var _card1 = node.getChildByName("dizhuCards_1");
    var _card2 = node.getChildByName("dizhuCards_2");
    _card0.visible = true;
    _card1.visible = true;
    _card1.visible = true;
    setCardSprite_card(_card0,_cards[0],false);
    setCardSprite_card(_card1,_cards[1],false);
    setCardSprite_card(_card2,_cards[2],false);

    var UIOff = getOffByIndex(msg.zhuang);
    var pl = getUIPlayer(UIOff);
    var _node = getNode_cards(UIOff); //设置谁是地主的标记

    if( tData.tState == TableState.waitPut) {
        _node.getChildByName("head").getChildByName("icon_dizhu").visible = true;
    }else if(tData.tState == TableState.waitReady){
        _node.getChildByName("head").getChildByName("icon_dizhu").visible = false;
    }
  /*  if(isfly==true)
    {
        _node.getChildByName("head").getChildByName("icon_dizhu").visible = true;
        dizhufrommiddleTOHead(_node);
    }
*/
    var children = _node.children;
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            ci.removeFromParent();
        }
        else if(ci.name == "mjhand_replay")
        {
            ci.removeFromParent();
        }
    }
    InitUserHandUI_doudizhu(_node, UIOff);
}
/*
    翻地主的牌  临汾需特殊处理
 */
function DealDDZdipai_LF(node,msg,isRoundEnd)
{
    var tData = MjClient.data.sData.tData;
    var _cards    = msg.diCards;
    var _dizhuUid =  msg.zhuang;
    tData.zhuang = msg.zhuang;
    var UIOff = getOffByIndex(msg.zhuang);
    var pl = getUIPlayer(UIOff);

    if ((pl.info.uid  == SelfUid() || isRoundEnd) || MjClient.rePlayVideo != -1){//自己是地主才能翻牌
        var _card0 = node.getChildByName("dizhuCards_0");
        var _card1 = node.getChildByName("dizhuCards_1");
        var _card2 = node.getChildByName("dizhuCards_2");
        if(MjClient.getAppType()!=MjClient.APP_TYPE.QXNTQP)
        var _card3 = node.getChildByName("dizhuCards_3");
        _card0.visible = true;
        _card1.visible = true;
        _card2.visible = true;
        setCardSprite_card(_card0,_cards[0],false);
        setCardSprite_card(_card1,_cards[1],false);
        setCardSprite_card(_card2,_cards[2],false);
        if(MjClient.getAppType()!=MjClient.APP_TYPE.QXNTQP)
        {
            if(MjClient.MaxPlayerNum != 2 && _cards[3]){
                _card3.visible = true;
                setCardSprite_card(_card3,_cards[3],false);
            }else{
                _card3.visible = false;
            }
        }
    }
    var _node = getNode_cards(UIOff); //设置谁是地主的标记
   if( tData.tState == TableState.waitPut) {
        _node.getChildByName("head").getChildByName("icon_dizhu").visible = true;
    }else if(tData.tState == TableState.waitReady){
        _node.getChildByName("head").getChildByName("icon_dizhu").visible = false;
    }

/*    if(isfly==true)
    {
       // _node.getChildByName("head").getChildByName("icon_dizhu").visible = true;
        dizhufrommiddleTOHead(_node);
    }
*/
 //   dizhufrommiddleTOHead(_node);
    var children = _node.children;
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            ci.removeFromParent();
        }
        else if(ci.name == "mjhand_replay")
        {
            ci.removeFromParent();
        }
    }
    InitUserHandUI_doudizhu(_node, UIOff);
}
function InitUserHandUI_doudizhu(node, off)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    MjClient.selectCards_card = []; // 在之前已经清空手牌了，需要把数组也清除
    var pl = getUIPlayer(off);
    if(!pl)
    {
        return;
    }

    //初始化玩家金币和名称
    if(MjClient.gameType==MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN||
        MjClient.gameType==MjClient.GAME_TYPE.DOU_DI_ZHU_JZ||
        MjClient.gameType==MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO||
        MjClient.gameType==MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI||
        MjClient.gameType==MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG||
        MjClient.gameType==MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU ||
        MjClient.gameType==MjClient.GAME_TYPE.DOU_DI_ZHU_NT ||
        MjClient.gameType==MjClient.GAME_TYPE.DOU_DI_ZHU_HA || 
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ
    )
    {
        InitUserCoinAndName_jinzhong(node, off);
    }

    else
    {
        InitUserCoinAndName(node, off);
    }
    setAreaTypeInfo(true);
    //currentLeftCardCount_paodekuai(off);


    //initSortUI();

    if(
        tData.tState != TableState.waitPut &&
        tData.tState != TableState.waitEat &&
        tData.tState != TableState.waitCard &&
        tData.tState != TableState.waitJiazhu

    )
    {
        cc.log("=========================添加手牌22=============");
        return;
    }

    cc.log("=========================添加手牌=============");
    //添加手牌
    if(MjClient.rePlayVideo == -1)// 表示正常游戏
    {
        if (pl.mjhand && off == 0) {//只初始化自己的手牌
            var vcard = [];
            for (var i = 0; i < pl.mjhand.length; i++) {

                var card = getNewCard_card(node, "stand", "mjhand", pl.mjhand[i], off);
                var index = vcard.indexOf(pl.mjhand[i]);//区分2张一样的牌
                if(index >= 0)
                {
                    card.setUserData(1);
                }
                else
                {
                    card.setUserData(0);
                }
                vcard.push(pl.mjhand[i]);
            }
            setDiZhuCards(off);
        }
        else if (off > 0) {

        }
    }
    else
    {
        /*
            播放录像
        */
        if (pl.mjhand)
        {
            if(off == 0)
            {
                for (var i = 0; i < pl.mjhand.length; i++) {
                    getNewCard_card(node, "stand", "mjhand", pl.mjhand[i], off);
                }
            }
            else
            {
                for (var i = 0; i < pl.mjhand.length ; i++) {
                    getNewCard_card(node, "stand", "mjhand_replay", pl.mjhand[i], off);
                }
            }
        }
    }

    MjClient.playui.CardLayoutRestore(node, off);
}

/*
 踢的操作，tiMun  1 踢  -1 不踢
 */
function sendTi(tiNum)
{
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJJiazhu",
        jiazhuNum: tiNum,
    });
}

/*
    处理踢
 */
function DealTi(node,msg) {
    cc.log("DealTi = " +"=====================DealTi msg = " + JSON.stringify(msg));
    var _uid = msg.uid;
    var _rates = msg.rates;
    var _isTi = msg.jiazhuNum;
    var tData = MjClient.data.sData.tData;
    if(_uid == SelfUid())
    {
        node.visible = false;
    }
    else {

    }
}

/*
 处理踢
 */
function setTiTag(msg,off) {
    cc.log("setTiTag ===DealTi msg = " + JSON.stringify(msg));
    var _uid = msg.uid;
    var _rates = msg.rates;
    var _isTi = msg.jiazhuNum;
    var pl = getUIPlayer(off);
    var tData = MjClient.data.sData.tData;
    var _node = getNode_cards(off);
    cc.log(off + " = off =====================DealTi msg = " + pl.info.uid);
    if(_uid == pl.info.uid)
    {
        var iconNode = _node.getChildByName("head").getChildByName("tiTagicon");
        if(_isTi == 1)
        {
            if(tData.zhuang == getPlayerIndex(off)) //如果是庄
            {
                 //todo 反踢
                playEffectInPlay("fanti");
                cc.log("todo 反踢fffffffffffffffffffffff");
                iconNode.loadTexture("playing/paodekuaiTable/fantiTag.png");
            }
            else
            {
                //todo 踢
                playEffectInPlay("ti");
                cc.log("踢nnnnnnnnnnnnnnnnnnnn");
                iconNode.loadTexture("playing/paodekuaiTable/tiTag.png");
            }
        }
        else
        {
            //todo 不踢
            playEffectInPlay("buti");
            cc.log("不踢888888888888888");
            iconNode.loadTexture("playing/paodekuaiTable/butiTag.png");
        }
        iconNode.visible = true;
    }
}
/*
    设置倍数
 */
function DealBeishu(node,msg,off)
{
    var _off = getUiOffByUid(msg.uid);
    var pl = getUIPlayer(off);
    //if(_off == off)
    if(pl)
    {
        //if(msg.jiazhuNum == 1)
        {
            for(var k in msg.rates)
            {
                cc.log("=====DealBeishu==========k = " + k);
                if(pl.info.uid == k)
                {
                    node.setString("×" + msg.rates[k] + "倍");
                    node.ignoreContentAdaptWithSize(true);
                    node.visible = true;
                }
            }
        }
    }
}

//设置牌的渲染
function setCardSpriteByCardPic2(node, cd, isOnDesk)
{
    if (MjClient.data.sData.tData.hunCard == cd)//小王，大王, 癞子牌
    {
        cc.log("setCardSpriteByCardPic2: param error!!!");
        return;
    }

    if(MjClient.data.sData.tData.mcTransValue == cd && 
        MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI){//明牌
        node.isMing = true;
        cd = MjClient.data.sData.tData.mingCard;
    }else{
        node.isMing = false;
    }

    var path = "playing/cardPic2/";
    //麻将的底牌公用图，4张
    node.loadTexture(path + "baidi_puke.png");
    var cardType = Math.ceil(cd / 4);// A,2 ,3, 4, 。。。。 j ,Q .k
    var flowerType = cd % 4;// 0 黑桃 ，1 方块 ，2 梅花 ，3 红桃

    if (node.getChildByName("cardType"))
        node.removeChildByName("cardType");
    if (node.getChildByName("imgNode"))
        node.removeChildByName("imgNode");
    if (node.getChildByName("smallFlower"))
        node.removeChildByName("smallFlower");
    if (node.getChildByName("cardType2"))
        node.removeChildByName("cardType2");
    if (node.getChildByName("smallFlower2"))
        node.removeChildByName("smallFlower2");
	node.tag = cd;
    if(node.isMing == true){
        node.tag = MjClient.data.sData.tData.mcTransValue;
    }
    node.isOnDesk = isOnDesk;
    node.isPKImg = true;

    //牌的类型
    var cardTypeNode = new ccui.ImageView();
    if(cd == 53 || cd == 54)
    {
        if(cd == 53)
            cardTypeNode.loadTexture(path + "joker_xiao.png");
        else
            cardTypeNode.loadTexture(path + "joker_da.png");

        cardTypeNode.setName("cardType");
        node.addChild(cardTypeNode);

        //花色类型
        var flowerTypeNode = new ccui.ImageView();
        flowerTypeNode.setName("imgNode");
        node.addChild(flowerTypeNode);
        if(cd == 53)
        {
            flowerTypeNode.loadTexture(path + "xiaowang_hua.png");
        }
        else
        {
            flowerTypeNode.loadTexture(path + "dawang_hua.png");
        }

        //小花
        var smallFlowerNode = new ccui.ImageView();
        smallFlowerNode.setName("smallFlower");
        smallFlowerNode.setScale(0.4);
        smallFlowerNode.visible = false;
        node.addChild(smallFlowerNode);

        var nodeSize = node.getContentSize();
        cardTypeNode.setPosition(7 + cardTypeNode.getContentSize().width/2, nodeSize.height - 7 - cardTypeNode.getContentSize().height/2);
        flowerTypeNode.setPosition(nodeSize.width - 10 - flowerTypeNode.getContentSize().width/2, 10 + flowerTypeNode.getContentSize().height/2);
    }
    else
    {
        if(flowerType == 0 || flowerType == 2)
            cardTypeNode.loadTexture(path + "hei_" + cardType + ".png");
        else
            cardTypeNode.loadTexture(path + "hong_" + cardType + ".png");

        cardTypeNode.setName("cardType");
        node.addChild(cardTypeNode);

        //花色类型
        var flowerTypeNode = new ccui.ImageView();
        flowerTypeNode.loadTexture(path + "flower_" + flowerType + ".png");
        flowerTypeNode.setName("imgNode");
        flowerTypeNode.setScale(0.66);
        node.addChild(flowerTypeNode);

        //小花
        var smallFlowerNode = new ccui.ImageView();
        smallFlowerNode.loadTexture(path + "flower_" + flowerType + ".png");
        smallFlowerNode.setName("smallFlower");
        smallFlowerNode.setScale(0.4);
        node.addChild(smallFlowerNode);

        var nodeSize = node.getContentSize();
        cardTypeNode.setPosition(7 + cardTypeNode.getContentSize().width/2, nodeSize.height - 7 - cardTypeNode.getContentSize().height/2);
        flowerTypeNode.setPosition(nodeSize.width - 10 - flowerTypeNode.getContentSize().width*flowerTypeNode.getScaleX()/2, 10 + flowerTypeNode.getContentSize().height/2);

        if(MjClient.sortClassType == 0 || isOnDesk)
            smallFlowerNode.setPosition(cardTypeNode.getPositionX(), nodeSize.height - 80);
        else
            smallFlowerNode.setPosition(65,80);

    }

    //添加明牌标记
    if(node.isMing == true){
        var nodeSize = node.getContentSize();
        var mingTagNode = new ccui.ImageView();
        mingTagNode.loadTexture(path + "ming_puke.png");
        mingTagNode.setPosition(mingTagNode.getContentSize().width/2, mingTagNode.getContentSize().height/2);
        node.addChild(mingTagNode);
    }
}


// 掂坨用法 用的CardPic3的资源
function setCardSpriteByCardPic3DIanTuo(node, cd){ 
    var path = "playing/diantuo/cards/"; 
    node.setScale(0.7 * MjClient.size.height / 720);
    node.tag = cd;

    node.isPKImg = true;

    // if(cd == 516 || cd == 517){
    //     //501 王
    //     node.loadTexture(path + cd + ".png"); 
    // }else if(cd % 100 > 13){
    //     // 重新拼接名称
    //     node.loadTexture(path + cd  + ".png");
    // }else{
        node.loadTexture(path + cd + ".png");
    // }

    // if(jsb.fileUtils.isFileExist("playing/cardPic3/" + cd + ".png")){

    // }else{
    //     cc.log("err = ","playing/cardPic3/" + cd + ".png");
    // } 
    
}

// 设置晋中牌的渲染 基于CardPic3的素材
function setCardSpriteByCardPic3JinZhong(node, cd, isOnDesk) {
    if (MjClient.data.sData.tData.hunCard == cd)//小王，大王, 癞子牌
    {
        cc.log("setCardSpriteByCardPic2: param error!!!");
        return;
    }

    if(MjClient.data.sData.tData.mcTransValue == cd &&
        MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI){//明牌
        node.isMing = true;
        cd = MjClient.data.sData.tData.mingCard;
    }else{
        node.isMing = false;
    }

    var path = "playing/cardPic3/";
    //麻将的底牌公用图，4张
    node.loadTexture(path + "baidi_puke.png");
    var cardType = Math.ceil(cd / 4);// A,2 ,3, 4, 。。。。 j ,Q .k
    var flowerType = cd % 4;// 0 黑桃 ，1 方块 ，2 梅花 ，3 红桃

    if (node.getChildByName("cardType"))
        node.removeChildByName("cardType");
    if (node.getChildByName("imgNode"))
        node.removeChildByName("imgNode");
    if (node.getChildByName("smallFlower"))
        node.removeChildByName("smallFlower");
    if (node.getChildByName("cardType2"))
        node.removeChildByName("cardType2");
    if (node.getChildByName("smallFlower2"))
        node.removeChildByName("smallFlower2");
    node.tag = cd;
    if(node.isMing == true){
        node.tag = MjClient.data.sData.tData.mcTransValue;
    }
    node.isOnDesk = isOnDesk;
    node.isPKImg = true;

    //牌的类型
    var cardTypeNode = new ccui.ImageView();
    var nodeSize = node.getContentSize();
    if(cd == 53 || cd == 54)
    {
        if(cd == 53)
            cardTypeNode.loadTexture(path + "joker_xiao.png");
        else
            cardTypeNode.loadTexture(path + "joker_da.png");

        cardTypeNode.setName("cardType");
        node.addChild(cardTypeNode);

        //花色类型
        var flowerTypeNode = new ccui.ImageView();
        flowerTypeNode.setName("imgNode");
        node.addChild(flowerTypeNode);
        if(cd == 53)
        {
            flowerTypeNode.loadTexture(path + "xiaowang_hua.png");
        }
        else
        {
            flowerTypeNode.loadTexture(path + "dawang_hua.png");
        }

        cardTypeNode.setPosition(7 + cardTypeNode.getContentSize().width/2, nodeSize.height - cardTypeNode.getContentSize().height/2 - 12);
        flowerTypeNode.setPosition(nodeSize.width / 2, nodeSize.height / 2);

        var cardTypeNode2 = cardTypeNode.clone();
        cardTypeNode2.setPosition(nodeSize.width - cardTypeNode.getPositionX(), nodeSize.height - cardTypeNode.getPositionY());
        cardTypeNode2.setRotation(180);
        cardTypeNode2.setName("cardType2");
        node.addChild(cardTypeNode2);
    }
    else {
        if(flowerType == 0 || flowerType == 2) {
            cardTypeNode.loadTexture(path + "hei_" + cardType + ".png");
        }
        else {
            cardTypeNode.loadTexture(path + "hong_" + cardType + ".png");
        }

        cardTypeNode.setName("cardType");
        node.addChild(cardTypeNode);
        cardTypeNode.setPosition(7 + cardTypeNode.getContentSize().width/2, nodeSize.height - cardTypeNode.getContentSize().height/2 - 12);

        var cardTypeNode2 = cardTypeNode.clone();
        cardTypeNode2.setPosition(nodeSize.width - cardTypeNode.getPositionX(), nodeSize.height - cardTypeNode.getPositionY());
        cardTypeNode2.setRotation(180);
        cardTypeNode2.setName("cardType2");
        node.addChild(cardTypeNode2);

        // 小花1
        var smallFlowerNode = new ccui.ImageView();
        smallFlowerNode.loadTexture(path + "flower_" + flowerType + "_1.png");
        smallFlowerNode.setName("smallFlower");
        smallFlowerNode.setScale(1.1);
        node.addChild(smallFlowerNode);

        if(MjClient.sortClassType == 0 || isOnDesk)
            smallFlowerNode.setPosition(cardTypeNode.getPositionX(), nodeSize.height - 75);
        else
            smallFlowerNode.setPosition(65,80);

        // 小花2
        var smallFlowerNode2 = new ccui.ImageView();
        smallFlowerNode2.loadTexture(path + "flower_" + flowerType + "_1.png");
        smallFlowerNode2.setName("smallFlower2");
        smallFlowerNode2.setScale(1.1);
        smallFlowerNode2.setRotation(180);
        node.addChild(smallFlowerNode2);

        if(MjClient.sortClassType == 0 || isOnDesk)
            smallFlowerNode2.setPosition(nodeSize.width - cardTypeNode.getPositionX(), nodeSize.height - (nodeSize.height - 75));
        else
            smallFlowerNode2.setPosition(nodeSize.width - 65, nodeSize.height - 80);
    }

    //添加明牌标记
    if(node.isMing == true){
        var mingTagNode = new ccui.ImageView();
        mingTagNode.loadTexture(path + "ming_puke.png");
        mingTagNode.setPosition(mingTagNode.getContentSize().width/2, mingTagNode.getContentSize().height/2);
        node.addChild(mingTagNode);
    }
}

//设置牌的渲染
function setCardSpriteByCardPic3(node, cd, isOnDesk)
{
    if (MjClient.data.sData.tData.hunCard == cd)//小王，大王, 癞子牌
    {
        cc.log("setCardSpriteByCardPic3: param error!!!");
        return;
    }

    if(MjClient.data.sData.tData.mcTransValue == cd && 
        MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI){//明牌
        node.isMing = true;
        cd = MjClient.data.sData.tData.mingCard;
    }else{
        node.isMing = false;
    }

    var path = "playing/cardPic3/";
    if (node.getChildByName("cardType"))
        node.removeChildByName("cardType");
    if (node.getChildByName("imgNode"))
        node.removeChildByName("imgNode");
    if (node.getChildByName("smallFlower"))
        node.removeChildByName("smallFlower");
    if (node.getChildByName("cardType2"))
        node.removeChildByName("cardType2");
    if (node.getChildByName("smallFlower2"))
        node.removeChildByName("smallFlower2");
    node.tag = cd;
    if(node.isMing == true){
        node.tag = MjClient.data.sData.tData.mcTransValue;
    }
    node.isOnDesk = isOnDesk;
    node.isPKImg = true;

    if(cd == 53 || cd == 54)
    {
        if(cd == 53)
            node.loadTexture(path + "501.png");
        else
            node.loadTexture(path + "502.png");
    }
    else
    {
        var cardType = Math.ceil(cd / 4);// A,2 ,3, 4, 。。。。 j ,Q .k
        var flowerType = cd % 4;// 0 黑桃 ，1 方块 ，2 梅花 ，3 红桃
        if (flowerType == 0)    // 0 黑桃对印的图牌是4
            flowerType = 4;

        node.loadTexture(path + flowerType + (cardType >= 10 ? cardType : "0" + cardType) + ".png");
    }

    // 牌的类型 (看似没必要，但setCardSpriteByCardPic2 设置了，代码中会获取这一节点)
    var cardTypeNode = new ccui.ImageView();
    cardTypeNode.setName("cardType");
    cardTypeNode.visible = false;
    node.addChild(cardTypeNode);

    // 花色类型
    var flowerTypeNode = new ccui.ImageView();
    flowerTypeNode.setName("imgNode");
    flowerTypeNode.visible = false;
    node.addChild(flowerTypeNode);

    // 小花 
    var smallFlowerNode = new ccui.ImageView();
    smallFlowerNode.setName("smallFlower");
    smallFlowerNode.visible = false;
    node.addChild(smallFlowerNode);
    
    //添加明牌标记
    if(node.isMing == true && MjClient.data.sData.tData.mcTransValue > 0){
        var nodeSize = node.getContentSize();
        var mingTagNode = new ccui.ImageView();
        mingTagNode.loadTexture(path + "ming_puke.png");
        mingTagNode.setPosition(mingTagNode.getContentSize().width/2, mingTagNode.getContentSize().height/2);
        node.addChild(mingTagNode);
    }
}

//设置牌的渲染
function setCardSpriteByCardPic4(node, cd, isOnDesk) {
    if (MjClient.data.sData.tData.hunCard == cd)//小王，大王, 癞子牌
    {
        cc.log("setCardSpriteByCardPic4: param error!!!");
        return;
    }

    var path = "playing/cardPic4/";
    if (node.getChildByName("cardType"))
        node.removeChildByName("cardType");
    if (node.getChildByName("imgNode"))
        node.removeChildByName("imgNode");
    if (node.getChildByName("smallFlower"))
        node.removeChildByName("smallFlower");
    node.tag = cd;
    node.isOnDesk = isOnDesk;
    node.isPKImg = true;

    if (cd == 53 || cd == 54) {
        if (cd == 53)
            node.loadTexture(path + "501.png");
        else
            node.loadTexture(path + "502.png");
    }
    else {
        var cardType = Math.ceil(cd / 4);// A,2 ,3, 4, 。。。。 j ,Q .k
        var flowerType = cd % 4;// 0 黑桃 ，1 方块 ，2 梅花 ，3 红桃
        if (flowerType == 0)    // 0 黑桃对印的图牌是4
            flowerType = 4;

        node.loadTexture(path + flowerType + (cardType >= 10 ? cardType : "0" + cardType) + ".png");
    }

    // 牌的类型 (看似没必要，但setCardSpriteByCardPic2 设置了，代码中会获取这一节点)
    var cardTypeNode = new ccui.ImageView();
    cardTypeNode.setName("cardType");
    cardTypeNode.visible = false;
    node.addChild(cardTypeNode);

    // 花色类型
    var flowerTypeNode = new ccui.ImageView();
    flowerTypeNode.setName("imgNode");
    flowerTypeNode.visible = false;
    node.addChild(flowerTypeNode);

    // 小花
    var smallFlowerNode = new ccui.ImageView();
    smallFlowerNode.setName("smallFlower");
    smallFlowerNode.visible = false;
    node.addChild(smallFlowerNode);
}

//设置牌的渲染
function setCardSpriteByCardPicYueYangNiuShiBie(node, cd, isOnDesk, imageType)
{
    if (MjClient.data.sData.tData.hunCard == cd)//小王，大王, 癞子牌
    {
        cc.log("setCardSpriteByCardPicYueYangNiuShiBie: param error!!!");
        return;
    }

    if(MjClient.data.sData.tData.mcTransValue == cd && 
        MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI){//明牌
        node.isMing = true;
        cd = MjClient.data.sData.tData.mingCard;
    }else{
        node.isMing = false;
    }

    var path = "playing/niushibie/cardPic/";
    if (imageType == 1)
        path = "playing/niushibie/cardPic1/";
    if (node.getChildByName("cardType"))
        node.removeChildByName("cardType");
    if (node.getChildByName("imgNode"))
        node.removeChildByName("imgNode");
    if (node.getChildByName("smallFlower"))
        node.removeChildByName("smallFlower");
    if (node.getChildByName("cardType2"))
        node.removeChildByName("cardType2");
    if (node.getChildByName("smallFlower2"))
        node.removeChildByName("smallFlower2");
    node.tag = cd;
    if(node.isMing == true){
        node.tag = MjClient.data.sData.tData.mcTransValue;
    }
    node.isOnDesk = isOnDesk;
    node.isPKImg = true;

    if(cd == 53 || cd == 54)
    {
        if(cd == 53)
            node.loadTexture(path + "501.png");
        else
            node.loadTexture(path + "502.png");
    }
    else if(cd == 55 ){
        node.loadTexture(path + "503.png");
    }
    else
    {
        var cardType = Math.ceil(cd / 4);// A,2 ,3, 4, 。。。。 j ,Q .k
        var flowerType = cd % 4;// 0 黑桃 ，1 方块 ，2 梅花 ，3 红桃
        if (flowerType == 0)    // 0 黑桃对印的图牌是4
            flowerType = 4;

        node.loadTexture(path + flowerType + (cardType >= 10 ? cardType : "0" + cardType) + ".png");
    }

    // 牌的类型 (看似没必要，但setCardSpriteByCardPic2 设置了，代码中会获取这一节点)
    var cardTypeNode = new ccui.ImageView();
    cardTypeNode.setName("cardType");
    cardTypeNode.visible = false;
    node.addChild(cardTypeNode);

    // 花色类型
    var flowerTypeNode = new ccui.ImageView();
    flowerTypeNode.setName("imgNode");
    flowerTypeNode.visible = false;
    node.addChild(flowerTypeNode);

    // 小花 
    var smallFlowerNode = new ccui.ImageView();
    smallFlowerNode.setName("smallFlower");
    smallFlowerNode.visible = false;
    node.addChild(smallFlowerNode);
    
    //添加明牌标记
    if(node.isMing == true && MjClient.data.sData.tData.mcTransValue > 0){
        var nodeSize = node.getContentSize();
        var mingTagNode = new ccui.ImageView();
        mingTagNode.loadTexture(path + "ming_puke.png");
        mingTagNode.setPosition(mingTagNode.getContentSize().width/2, mingTagNode.getContentSize().height/2);
        node.addChild(mingTagNode);
    }
}

//设置牌的渲染
function setCardMiniSprite(node, cd) {
    var path = "playing/cardPic2/";

    //麻将的底牌公用图，4张
    node.loadTexture("playing/sanDaHa/xiaopai.png");
    node.removeAllChildren();

    //牌的类型
    var cardTypeNode = new ccui.ImageView();
    if (cd == 53 || cd == 54) {
        if (cd == 53)
            cardTypeNode.loadTexture(path + "joker_xiao.png");
        else
            cardTypeNode.loadTexture(path + "joker_da.png");
        cardTypeNode.setScale((node.height - 4) / cardTypeNode.height);
    } else {
        var cardType = Math.ceil(cd / 4); // A,2 ,3, 4, 。。。。 j ,Q .k
        var flowerType = cd % 4; // 0 黑桃 ，1 方块 ，2 梅花 ，3 红桃
        if (flowerType == 0 || flowerType == 2)
            cardTypeNode.loadTexture(path + "hei_" + cardType + ".png");
        else
            cardTypeNode.loadTexture(path + "hong_" + cardType + ".png");
        cardTypeNode.setScale((node.width - 4) / cardTypeNode.width);

        //小花
        var smallFlowerNode = new ccui.ImageView();
        smallFlowerNode.loadTexture(path + "flower_" + flowerType + ".png");
        smallFlowerNode.setName("smallFlower");
        smallFlowerNode.setScale((node.width - 4) / smallFlowerNode.width);
        smallFlowerNode.setPosition(node.width / 2, 2 + smallFlowerNode.width * smallFlowerNode.scaleY / 2);
        node.addChild(smallFlowerNode);
    }

    cardTypeNode.setName("cardType");
    cardTypeNode.setPosition(node.width / 2, node.height - 2 - cardTypeNode.height * cardTypeNode.scaleY / 2)
    node.addChild(cardTypeNode);

    node.tag = cd;
	node.isPKMiniImg = true;
}

function setCardMiniSpriteByCardPic3(node, cd) {
    var path = "playing/cardPic3/mini/";

    // 校正：如果没有第三套小牌资源，则依旧使用第二套
    if (!jsb.fileUtils.isFileExist(path + "302.png")) {
        setCardMiniSprite(node, cd)
        return;
    }

    //麻将的底牌公用图，4张
    node.loadTexture("playing/sanDaHa/xiaopai.png");
    node.removeAllChildren();

    //牌的类型
    if (cd == 53 || cd == 54) {
        if (cd == 53)
            node.loadTexture(path + "501.png");
        else
            node.loadTexture(path + "502.png");
    } else {
        var cardType = Math.ceil(cd / 4);// A,2 ,3, 4, 。。。。 j ,Q .k
        var flowerType = cd % 4;// 0 黑桃 ，1 方块 ，2 梅花 ，3 红桃
        if (flowerType == 0)    // 0 黑桃对印的图牌是4
            flowerType = 4;

        node.loadTexture(path + flowerType + (cardType >= 10 ? cardType : "0" + cardType) + ".png");
    }

    node.tag = cd;
	node.isPKMiniImg = true;
}

function setCardMiniSpriteByCardPicYueYangNiuShiBie(node, cd)
{
    var path = "playing/niushibie/miniCardPic/";

    //麻将的底牌公用图，4张
    node.removeAllChildren();

    if (cd == 53 || cd == 54) {
        if (cd == 53)
            node.loadTexture(path + "501.png");
        else
            node.loadTexture(path + "502.png");
    } else {
        var cardType = Math.ceil(cd / 4);// A,2 ,3, 4, 。。。。 j ,Q .k
        var flowerType = cd % 4;// 0 黑桃 ，1 方块 ，2 梅花 ，3 红桃
        if (flowerType == 0)    // 0 黑桃对印的图牌是4
            flowerType = 4;

        node.loadTexture(path + flowerType + (cardType >= 10 ? cardType : "0" + cardType) + ".png");
    }

    node.tag = cd;
    node.isPKMiniImg = true;
}

function setZhuangPaiIcon(off){

    var tData = MjClient.data.sData.tData;
    var node = getNode_cards(off);

    var pl = getUIPlayer(off);
    if(tData.zhuang == null || tData.zhuang == -1 || tData.uids[tData.zhuang] !== pl.info.uid ||
        tData.tState == TableState.isReady || tData.tState == TableState.roundFinish /*|| (tData.chickenCard != -1)*/ ||
        tData.tState == TableState.waitJiazhu  || tData.tState == TableState.waitCard )
    {
        return;
    }

    _path = "playing/damazi/jiaobiao-zhuangjia.png";
    if(tData.chickenCard == -1){ //1v3
        _path = "playing/damazi/jiaobiao-mingdu.png"
    }

    function _addTagIcon(name){
        var children = node.children;
        var _max = -9999;
        var _endCard = null;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == name){
                if(ci.zIndex > _max){
                    _max = ci.zIndex
                    _endCard = ci;
                }

                var _tag = ci.getChildByName("hongPaiTag");
                if(_tag){
                    _tag.removeFromParent();
                }
            }
        }
        
        if(_endCard){
            var _cardTag = new ccui.ImageView(_path);
            if(name == "out"){
                _cardTag.setScale(1.8)
            }
            var _scale = _cardTag.getScale();
            _cardTag.setPosition(_endCard.width - _scale*_cardTag.width/2, _endCard.height - _scale*_cardTag.height/2);
            _cardTag.setName("hongPaiTag");
            _endCard.addChild(_cardTag);
        }
    }

    if(off === 0)
    {
        _addTagIcon("mjhand");
        _addTagIcon("out");
    }
    else
    {
        _addTagIcon("out");
    }
}

function setBaoPaiIcon(off){

    var tData = MjClient.data.sData.tData;
    var node = getNode_cards(off);

    var pl = getUIPlayer(off);
    if(tData.zhuang == null || tData.zhuang == -1 || tData.uids[tData.zhuang] !== pl.info.uid ||
        tData.tState == TableState.isReady || tData.tState == TableState.roundFinish ||
        tData.tState == TableState.waitJiazhu  || tData.tState == TableState.waitCard )
    {
        return;
    }

    var _path = "playing/damazi/icon-baopai.png";
    if (tData.chickenCard != -1) {
        _path = "playing/damazi/jiaobiao-zhuangjia.png";
    }

    if(off === 0)
    {
        //手牌
        var children = node.children;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == "mjhand")
            {
                if(!ci.getChildByName("hongPaiTag"))
                {
                    var _cardTag = new ccui.ImageView(_path);
                    _cardTag.setPosition(ci.width - _cardTag.width/2, ci.height - _cardTag.height/2);
                    _cardTag.setName("hongPaiTag");
                    ci.addChild(_cardTag);
                }
            }
        }

        //打出去的牌
        var children = node.children;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == "out")
            {
                if(!ci.getChildByName("hongPaiTag"))
                {
                    var _cardTag = new ccui.ImageView(_path);
                    _cardTag.setPosition(ci.width - _cardTag.width/2, ci.height - _cardTag.height/2);
                    _cardTag.setName("hongPaiTag");
                    ci.addChild(_cardTag);
                }
            }
        }
    }
    else
    {
        //手牌
        var children = node.children;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == "mjhand_replay")
            {
                if(MjClient.rePlayVideo != -1 ){
                    break;
                }
                
                if(!ci.getChildByName("hongPaiTag"))
                {
                    var _cardTag = new ccui.ImageView(_path);
                    _cardTag.setPosition(ci.width - _cardTag.width/2, ci.height - _cardTag.height/2);
                    ci.addChild(_cardTag);
                    _cardTag.setName("hongPaiTag");
                }
            }
        }

        //打出去的牌
        var children = node.children;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == "out")
            {
                if(!ci.getChildByName("hongPaiTag"))
                {
                    var _cardTag = new ccui.ImageView(_path);
                    _cardTag.setPosition(ci.width - _cardTag.width/2, ci.height - _cardTag.height/2);
                    _cardTag.setName("hongPaiTag");
                    ci.addChild(_cardTag);
                }
            }
        }
    }
}

function setHongPaiIcon(off){

    var tData = MjClient.data.sData.tData;
    var node = getNode_cards(off);

    var pl = getUIPlayer(off);
    if(tData.zhuang == null || tData.zhuang == -1 || tData.uids[tData.zhuang] !== pl.info.uid ||
        tData.tState == TableState.isReady || tData.tState == TableState.roundFinish || !(tData.chickenCard == -1) ||
        tData.tState == TableState.waitJiazhu  || tData.tState == TableState.waitCard )
    {
        return;
    }

    var _path = "playing/damazi/icon-houpai.png";

    if(off === 0)
    {
        //手牌
        var children = node.children;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == "mjhand")
            {
                if(!ci.getChildByName("hongPaiTag"))
                {
                    var _cardTag = new ccui.ImageView(_path);
                    _cardTag.setPosition(ci.width - _cardTag.width/2, ci.height - _cardTag.height/2);
                    _cardTag.setName("hongPaiTag");
                    ci.addChild(_cardTag);
                }
            }
        }

        //打出去的牌
        var children = node.children;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == "out")
            {
                if(!ci.getChildByName("hongPaiTag"))
                {
                    var _cardTag = new ccui.ImageView(_path);
                    _cardTag.setPosition(ci.width - _cardTag.width/2, ci.height - _cardTag.height/2);
                    _cardTag.setName("hongPaiTag");
                    ci.addChild(_cardTag);
                }
            }
        }
    }
    else
    {
        //手牌
        var children = node.children;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == "mjhand_replay")
            {
                if(MjClient.rePlayVideo != -1 ){
                    break;
                }
                
                if(!ci.getChildByName("hongPaiTag"))
                {
                    var _cardTag = new ccui.ImageView(_path);
                    _cardTag.setPosition(ci.width - _cardTag.width/2, ci.height - _cardTag.height/2);
                    ci.addChild(_cardTag);
                    _cardTag.setName("hongPaiTag");
                }
            }
        }

        //打出去的牌
        var children = node.children;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == "out")
            {
                if(!ci.getChildByName("hongPaiTag"))
                {
                    var _cardTag = new ccui.ImageView(_path);
                    _cardTag.setPosition(ci.width - _cardTag.width/2, ci.height - _cardTag.height/2);
                    _cardTag.setName("hongPaiTag");
                    ci.addChild(_cardTag);
                }
            }
        }
    }
}

function setDiZhuCards(off)
{


    var tData = MjClient.data.sData.tData;
    var node = getNode_cards(off);

    var pl = getUIPlayer(off);
    if(tData.zhuang == -1 || tData.uids[tData.zhuang] !== pl.info.uid)
    {
        return;
    }

    cc.log(off + "= off =================================== tData.zhuang = " + tData.zhuang);

    var _path = "playing/cardPic2/dizhu_biao.png";
    if(off === 0)
    {
        //手牌
        var children = node.children;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == "mjhand")
            {
                if(!ci.getChildByName("dizhuTag"))
                {
                    var _cardTag = new ccui.ImageView(_path);
                    _cardTag.setPosition(ci.width - _cardTag.width/2, ci.height - _cardTag.height/2);
                    _cardTag.setName("dizhuTag");
                    ci.addChild(_cardTag);
                }
            }
        }

        //打出去的牌
        var children = node.children;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == "out")
            {
                if(!ci.getChildByName("dizhuTag"))
                {
                    var _cardTag = new ccui.ImageView(_path);
                    _cardTag.setPosition(ci.width - _cardTag.width/2, ci.height - _cardTag.height/2);
                    _cardTag.setName("dizhuTag");
                    ci.addChild(_cardTag);
                }
            }
        }
    }
    else
    {
        //手牌
        var children = node.children;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == "mjhand_replay")
            {
                if(!ci.getChildByName("dizhuTag"))
                {
                    var _cardTag = new ccui.ImageView(_path);
                    _cardTag.setPosition(ci.width - _cardTag.width/2, ci.height - _cardTag.height/2);
                    ci.addChild(_cardTag);
                    _cardTag.setName("dizhuTag");
                }
            }
        }

        cc.log("=======setDiZhuCards out =====");

        //打出去的牌
        var children = node.children;
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == "out")
            {
                if(!ci.getChildByName("dizhuTag"))
                {
                    var _cardTag = new ccui.ImageView(_path);
                    _cardTag.setPosition(ci.width - _cardTag.width/2, ci.height - _cardTag.height/2);
                    _cardTag.setName("dizhuTag");
                    ci.addChild(_cardTag);
                }
            }
        }
    }


}


/**************************************************************************************************************
                                                end of 斗地主新增函数
 ***************************************************************************************************************/

/*
    滑动选牌
*/
//取消选中的牌
function cancelSelectCard(cardnode)
{
    if (!cc.sys.isObjectValid(cardnode)) {
        return;
    }
    for(var i = 0; i < MjClient.touchMoveSelcetCardArray.length; i++)
    {
        if (!cc.sys.isObjectValid(MjClient.touchMoveSelcetCardArray[i])) { continue; }
        if(MjClient.touchMoveSelcetCardArray[i].tag  == cardnode.tag  &&
            MjClient.touchMoveSelcetCardArray[i].getUserData() == cardnode.getUserData()
        )
        {
            MjClient.touchMoveSelcetCardArray[i].isGray = false;
            MjClient.touchMoveSelcetCardArray[i].setColor(MjClient.whiteColor);
            MjClient.touchMoveSelcetCardArray.splice(i, 1);
            break;
        }
    }
}
//是否取消最后选中的牌
function IsCancelSelect(lastMouseIn, curMouseIn)
{
    if (!cc.sys.isObjectValid(lastMouseIn) || !cc.sys.isObjectValid(curMouseIn)) return false;

    if(lastMouseIn.tag  == curMouseIn.tag  &&
        lastMouseIn.getUserData() == curMouseIn.getUserData()
    )
    {
        return false;
    }
    else if (checkIsHave(curMouseIn) && lastMouseIn.cannotOut != true)
    {
        cancelSelectCard(lastMouseIn);
        return true;
    }
    else
    {
        return false;
    }
}
var bTouchMove = false;//是否滑动出牌
var lastMouseIn = null;//触碰中当前最后的一张牌

var begPos=null;
var bsleep = false;//onmove隔次处理。提高效率
var OnSelectCrad = function(curPos, isTchBge/*是否是touchbegin*/)
{
    if (bsleep&&!isTchBge)
    {
        bsleep = false;
        return;
    }
    else
        bsleep = true;

    var IsSelect = false;
    var _begPos = isTchBge?curPos:begPos;
    if (_begPos == null) return IsSelect;

    var minx = Math.min(_begPos.x, curPos.x);
    var maxx = Math.max(_begPos.x, curPos.x);

    MjClient.touchMoveSelcetCardArray = [];


    var _childrens = MjClient.playui._downNode.getChildren();

    for(var i = 0; i  < _childrens.length; i++)
    {
        if(_childrens[i].name == "mjhand")
        {
            if (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI ||
                MjClient.gameType == MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY ||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT ||
                MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA ||
                MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA ||
                MjClient.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA || 
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_TY ||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_QC||
                GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI
                )
            {
                if (_childrens[i].cannotOut)
                    continue;
            }

            _childrens[i].setColor(MjClient.whiteColor);

            var _boundingBox = _childrens[i].getBoundingBox();

            if(MjClient.sortClassType == 0)
            {
                if (getLashCardX(_childrens) != parseInt(_childrens[i].x)) {
                    if (MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA ||
                        MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA ||
                        MjClient.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA || 
                        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
                        MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
                        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                        MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                        MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
                        MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG || 
                        MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN ||
                        MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
                        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                        MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN )
                    {
                        _boundingBox.width = _childrens[i].showWidth;
                    }
                    else
                        _boundingBox.width -= _boundingBox.width / 2;
                }
            }
            else
            {
                _boundingBox = cc.rect(_boundingBox.x ,_boundingBox.y +  60,_boundingBox.width,_boundingBox.height/4);
            }
            if ( _boundingBox.x+_boundingBox.width < minx || _boundingBox.x > maxx)
            {
                //么有选中。。。。。。。
            }
            else
            {
                if (isTchBge )
                {
                    if (curPos.y >= _boundingBox.y && curPos.y <= (_boundingBox.y + _boundingBox.height))
                    {
                        bTouchMove = true;
                        _childrens[i].setColor(MjClient.grayColor);
                        MjClient.touchMoveSelcetCardArray.push(_childrens[i]);
                        begPos = curPos;
                        IsSelect = true;
                    }
                }
                else
                {
                    bTouchMove = true;
                    _childrens[i].setColor(MjClient.grayColor);
                    MjClient.touchMoveSelcetCardArray.push(_childrens[i]);
                    IsSelect = true;
                }
            }
        }
    }
    return IsSelect;
}

function getTouchListener_card()
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

            if (MjClient.playui.isFaPai)
                return false;
            if (MjClient.playui.isDeal ==true)
                return false;

            if (MjClient.selectCards_card.length == 0) {
                MjClient.isDoudizhuValidAutoUpCards = true;
            }

            var target = event.getCurrentTarget();  // 获取事件所绑定的 target,这个target 就是down
            
            if(isSelectDiCards_HuaQuanJiao() ){
                target = MjClient.playui._rightNode;
                // var BtnTouXiang = MjClient.playui._downNode.getChildByName("selectDiCardPannel_New").getChildByName("BtnTouXiang");
                var BtnMaiPai = MjClient.playui._downNode.getChildByName("selectDiCardPannel_New").getChildByName("BtnMaiPai");
                var btn_boundingBox = BtnMaiPai.getBoundingBox();
                var tempPt = target.convertToNodeSpace(touch.getLocation());
                var _destPt = MjClient.playui._downNode.getChildByName("selectDiCardPannel_New").convertToNodeSpace(tempPt);

                if (cc.rectContainsPoint(btn_boundingBox, _destPt)){
                    return false;
                }
            }

            // 获取当前点击点所在相对按钮的位置坐标
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var _childrens = MjClient.playui._downNode.getChildren();
            var _standui = MjClient.playui._downNode.getChildByName("stand");

        
            if(isSelectDiCards_HuaQuanJiao()){
                _childrens = MjClient.playui._downNode.getChildByName("selectDiCardPannel_New").getChildren(); //MjClient.playui.panel
                _standui = MjClient.playui._downNode.getChildByName("selectDiCardPannel_New").getChildByName("stand");
                locationInNode = MjClient.playui._downNode.getChildByName("selectDiCardPannel_New").convertToNodeSpace(locationInNode);
            }

            var upSize = _standui.getSize();
            var upS = _standui.scale;
            var cardX = upSize.width * upS*1.28;//一张牌的宽度
            var cardY = upSize.width * upS*1.5; //一张牌的长度
            MjClient.touchMoveSelcetCardArray = [];

            var _bg_sort = MjClient.playui._bg_sort;
            if (_bg_sort && cc.rectContainsPoint(_bg_sort.getBoundingBox(), locationInNode))
            {
                return false;
            }

            bTouchMove = false;
            if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI||
            MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_TY || 
            MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY||
            MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_QC||
            MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN ||
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
            MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
            MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
            MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K)
            {//无间断选牌
                if  (OnSelectCrad(locationInNode,true))return true;
            }
            else
            {
                for(var i = 0; i < _childrens.length; i++)
                {
                    if(_childrens[i].name == "mjhand")
                    {
                        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI ||
                            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU ||
                            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA ||
                            MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER ||
                            MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI ||
                            MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)
                        {
                            if (_childrens[i].cannotOut)
                                continue;
                        }

                        var _boundingBox = _childrens[i].getBoundingBox();

                        if(isSelectDiCards_HuaQuanJiao()){
                        }

                        if(MjClient.sortClassType == 0)
                        {
                            if (getLashCardX(_childrens) != parseInt(_childrens[i].x)) {
                                if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA ||
                                    MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER ||
                                    MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || 
                                    MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
                                    MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI || 
                                    MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
                                    MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                                    MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG || 
                                    MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                                    MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                                    MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
                                    MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
                                    MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
                                    MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)
                                {
                                    _boundingBox.width = _childrens[i].showWidth;
                                }
                                else
                                    _boundingBox.width -= _boundingBox.width / 2;
                            }
                        }
                        else
                        {
                            if(Math.round(_childrens[i].y) == Math.round(_standui.y))
                            {
                                _boundingBox = cc.rect(_boundingBox.x ,_boundingBox.y,_boundingBox.width,_boundingBox.height);
                            }
                            else
                            {
                                var _value  = (MjClient.currentCardPileCount - 13)*cardX/13;
                                if(_value <= 0 ) _value  = 0;
                                _boundingBox = cc.rect(_boundingBox.x ,_boundingBox.y + cardY*0.9,cardX - _value ,cardY*0.3);
                            }
                        }

                        if (cc.rectContainsPoint(_boundingBox, locationInNode))
                        {
                            if(!checkIsHave(_childrens[i]))
                            {
                                //_childrens[i].isGray = true;
                                _childrens[i].setColor(MjClient.grayColor);
                                MjClient.touchMoveSelcetCardArray.push(_childrens[i]);
                                return true;
                            }
                        }
                    }
                }
            }

            //点击空白出，所有的牌复原
            if(MjClient.touchMoveSelcetCardArray.length <= 0)
            {
                if (MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN || 
                    MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
                    MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                    MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
                    MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                    MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                    MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K)
                    postEvent("CloseSelectPutCardsPanel");

                MjClient.selectCards_card = [];
                MjClient.colloctionCurrentSelcetUIArray = [];
                if(MjClient.sortClassType == 0) {
                    setCardToNormalPos();
                }
                else {
                    setCardToNormalColor();
                }
                MjClient.isSorting = false;
                if(MjClient.colloctionCardsArray.length > 0)
                {
                    if (MjClient.playui._bg_sort)
                    {
                        MjClient.playui._bg_sort.getChildByName("Button_sort").loadTextureNormal("playing/cardTable/huifu.png");
                        MjClient.playui._bg_sort.getChildByName("Button_sort").visible = true;
                        MjClient.playui._bg_sort.getChildByName("Button_sort").setTouchEnabled(true);
                    }
                }
                else
                {
                    if(MjClient.playui._bg_sort)
                    {
                        MjClient.playui._bg_sort.getChildByName("Button_sort").visible = false;
                        MjClient.playui._bg_sort.getChildByName("Button_sort").setTouchEnabled(false);
                    }
                }
                UpdataCurrentPutCard();
            }
            return false;
        },
        onTouchMoved: function (touch, event) {         // 触摸移动时触发
            var target = event.getCurrentTarget();  // 获取事件所绑定的 target,这个target 就是down
            // 获取当前点击点所在相对按钮的位置坐标
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI ||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_TY || 
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_QC||
                MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN || 
                MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE ||
                MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN )
            {//无间断选牌
                 OnSelectCrad(locationInNode);
                 return false;
            }
            
            var _childrens = MjClient.playui._downNode.getChildren();

            if(isSelectDiCards_HuaQuanJiao()){
                _childrens = MjClient.playui._downNode.getChildByName("selectDiCardPannel_New").getChildren(); //MjClient.playui.panel
                
                locationInNode = MjClient.playui._downNode.getChildByName("selectDiCardPannel_New").convertToNodeSpace(locationInNode);
            }

            for(var i = 0; i < _childrens.length; i++)
            {
                if(_childrens[i].name == "mjhand")
                {
                    var _boundingBox = _childrens[i].getBoundingBox();
                    if(MjClient.sortClassType == 0)
                    {
                        if (MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA ||
                            MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO ||
                            MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI ||
                            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA ||
                            MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA_NEW ||
                            MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER ||
                            MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || 
                            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
                            MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
                            MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN
                            )
                            _boundingBox.width = _childrens[i].showWidth;
                        else
                            _boundingBox.width -= _boundingBox.width / 2;
                    }
                    else
                    {
                        if (MjClient.gameType == MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN) {
                            var _standui = MjClient.playui._downNode.getChildByName("stand");
                            var upSize = _standui.getSize();
                            var upS = _standui.scale;
                            var cardX = upSize.width * upS*1.28;//一张牌的宽度
                            var cardY = upSize.width * upS*1.5; //一张牌的长度
                            if (Math.round(_childrens[i].y) == Math.round(_standui.y)) {
                                _boundingBox = cc.rect(_boundingBox.x ,_boundingBox.y,_boundingBox.width,_boundingBox.height);
                            }
                            else {
                                var _value  = (MjClient.currentCardPileCount - 13)*cardX/13;
                                if(_value <= 0 ) _value  = 0;
                                _boundingBox = cc.rect(_boundingBox.x ,_boundingBox.y + cardY*0.9,cardX - _value ,cardY*0.3);
                            }
                        }
                        else {
                            _boundingBox = cc.rect(_boundingBox.x ,_boundingBox.y +  60,_boundingBox.width,_boundingBox.height/4);
                        }
                    }

                    if (cc.rectContainsPoint(_boundingBox, locationInNode))
                    {
                        ///////////////////监测取消刚才选中的牌
                        if (IsCancelSelect(lastMouseIn, _childrens[i]))
                        {
                            lastMouseIn = _childrens[i];
                            continue;
                        }
                        lastMouseIn = _childrens[i];
                        /////////////////////////////////////
                        if(!checkIsHave(_childrens[i]))
                        {
                            cc.log("选中了");
                            bTouchMove = true;
                            if((MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || 
                                MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER || 
                                MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI || 
                                MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)  && 
                                _childrens[i].cannotOut && _childrens[i].cannotOut == true) {
                                //打七中置灰的牌不可提起
                            } else {
                                _childrens[i].setColor(MjClient.grayColor);
                                MjClient.touchMoveSelcetCardArray.push(_childrens[i]);
                            }
                        }
                    }
                }
            }
        },
        onTouchEnded: function (touch, event) {         // 点击事件结束处理
            begPos=null;
            var target = event.getCurrentTarget();
            playEffectInPlay("clickCards");

            // 处理斗地主智能提示
            if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU){
                handleDoudizhuCardsAutoUp();
            }

            if (MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN || MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
                MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG || MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG || MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
                MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN || MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K)
                postEvent("CloseSelectPutCardsPanel");

            if(MjClient.sortClassType == 0)
            {
                showTouchSelectHorCards();
            }
            else
            {
                showTouchSelectVerCards()
            }
        }
    };
}

// 处理斗地主智能提牌
function handleDoudizhuCardsAutoUp() {
    var tData = MjClient.data.sData.tData;
    if(!IsTurnToMe() || tData.tState != TableState.waitPut) { return; }
    if (!MjClient.isDoudizhuValidAutoUpCards) { return; } // 智能提牌已经失效
    if (MjClient.selectCards_card.length > 0 && bTouchMove) {
        // 已有提出牌，划牌，智能提牌失效
        MjClient.isDoudizhuValidAutoUpCards = false;
        return;
    }
    if(tData.lastPutPlayer == tData.curPlayer || tData.lastPutPlayer == -1){//首出没有提示
        // 首出
        handleAutoUpWithFirstOut(bTouchMove);
    } else {
        // 接牌
        handleAutoUpWithTipCards(bTouchMove);
    }
    
}

// 首出牌处理自动提牌
function handleAutoUpWithFirstOut(bTouchMove) {
    if(!MjClient.majiang || !MjClient.majiang.calAutoPutCardWithFirstOut) { return; }

    if (bTouchMove && MjClient.touchMoveSelcetCardArray.length > 0) { // 首出牌，滑动会出顺子
        var upSelectCards = [];
        for (var i = 0; i < MjClient.touchMoveSelcetCardArray.length; i++) {
            if( !cc.sys.isObjectValid(MjClient.touchMoveSelcetCardArray[i]) ) continue;
            upSelectCards.push(MjClient.touchMoveSelcetCardArray[i].tag);
        }
        var hands = [];
        var children = MjClient.playui._downNode.children;
        for(var i = 0; i < children.length; i++) {
            if( !cc.sys.isObjectValid(children[i]) ) continue;
            if(children[i].name == "mjhand") {
                hands.push(children[i].tag);
            }
        }
        var data = MjClient.majiang.calAutoPutCardWithFirstOut(upSelectCards, hands);
        changeSelectToValidCards(data, bTouchMove);
    }
    return;    
}

//  接牌处理自动提牌
function handleAutoUpWithTipCards(bTouchMove) {
    var tData = MjClient.data.sData.tData;
    if (MjClient.tipCardsArray == null || MjClient.tipCardsArray.length == 0) { return; } // 没有提示
    if(!MjClient.majiang || !MjClient.majiang.calType) { return; }
    if(!MjClient.majiang || !MjClient.majiang.calAutoPutCards) { return; }

    var cType = MjClient.majiang.calType(tData.lastPutCard);
    var CARDTPYE = MjClient.majiang.CARDTPYE;
    if (cType == CARDTPYE.danpai) { // 单牌不做自动提示
        MjClient.isDoudizhuValidAutoUpCards = false;
        return;
    }
    var upSelectCards = [];
    var lastSelectCards = MjClient.selectCards_card.slice();
    for (var i = 0; i < MjClient.touchMoveSelcetCardArray.length; i++) {
        if( !cc.sys.isObjectValid(MjClient.touchMoveSelcetCardArray[i]) ) continue;
        var tag = MjClient.touchMoveSelcetCardArray[i].tag;
        var idx = lastSelectCards.indexOf(tag);
        if (idx == -1) { // 增加提牌
            upSelectCards.push(tag);
        } else {
            // 减少提牌
            return;
        }
    }
    upSelectCards = lastSelectCards.concat(upSelectCards);
    var pl = getUIPlayer(0);
    var data = MjClient.majiang.calAutoPutCards(bTouchMove, MjClient.tipCardsArray, upSelectCards, tData.lastPutCard, pl.mjhand);
    changeSelectToValidCards(data, bTouchMove);
}

// 将选择的牌转换为有效的出牌
function changeSelectToValidCards(data, bTouchMove) {
    var hasCardToUp = data.hasCardToUp;
    var tSelectCards = data.tSelectCards;

    MjClient.isDoudizhuValidAutoUpCards = false;
    if (data.hasCardToUp) {
        setCardToNormalPos();
        MjClient.selectCards_card = [];
        MjClient.touchMoveSelcetCardArray = [];
        var children = MjClient.playui._downNode.children;
        for(var i = 0; i < children.length; i++) {
            if( !cc.sys.isObjectValid(children[i]) ) continue;
            if(children[i].name == "mjhand" && tSelectCards.indexOf(children[i].tag) > -1) {
                MjClient.touchMoveSelcetCardArray.push(children[i]);
            }
        }
    }
}

function checkIsHave(cardnode)
{
    if( !cc.sys.isObjectValid(cardnode) ) {
        return false;
    }
    var bHave = false;
    for(var i = 0; i < MjClient.touchMoveSelcetCardArray.length; i++)
    {
        if(!cc.sys.isObjectValid(MjClient.touchMoveSelcetCardArray[i])) continue;
        if(MjClient.touchMoveSelcetCardArray[i].tag  == cardnode.tag  &&
                MjClient.touchMoveSelcetCardArray[i].getUserData() == cardnode.getUserData()
        )
        {
            bHave = true;
            break;
        }

        // var tx = parseInt(MjClient.touchMoveSelcetCardArray[i].x);
        // var cx = parseInt(cardnode.x);
        // if(tx == cx)
        // {
        //     bHave = true;
        //     break;
        // }
    }
    return bHave;
}

function getLashCardX(_childrens)
{
    var lastX = 0;
    for(var i = 0; i < _childrens.length; i++)
    {
        if (_childrens[i].name == "mjhand")
        {
            if(_childrens[i].x > lastX)
            {
                lastX = _childrens[i].x;
            }
        }
    }
    return parseInt(lastX);
}

// 获取牌型点数总和
function getCardsSum(cards)
{
    var sum = 0;
    for(var i in cards)
    {
        sum += MjClient.majiang.calPoint(cards[i]);
    }

    return sum;
}

// 获取牌型点数乘积
function getCardsProduct(cards)
{
    var product = 1;
    for(var i in cards)
    {
        product *= MjClient.majiang.calPoint(cards[i]);
    }

    return product;
}

// 从同类牌型数组中挑选最小的一组
function getMinCards(cardsArray, type, areaSelectMode)
{
    var majiang = MjClient.majiang;

    // 三带二关于带单牌或带对子的处理
    if (majiang.CARDTPYE.sandaier == type && cardsArray.length > 2)
    {
        var value_1,value_2,value_3,value_4,value_5;
        value_1 = value_2 = value_3 = value_4 = value_5 = 0;

        // 筛选出所有对子的点数
        var duiziValues = [];
        for(var i in cardsArray) 
        {
            value_1 = majiang.calPoint(cardsArray[i][0]);
            value_2 = majiang.calPoint(cardsArray[i][1]);
            value_4 = majiang.calPoint(cardsArray[i][3]);
            value_5 = majiang.calPoint(cardsArray[i][4]);

            if (value_1 == value_2 && value_4 == value_5)
            {
                if (value_1 == majiang.calPoint(cardsArray[i][2]))
                {
                    if (duiziValues.indexOf(value_5) < 0)
                        duiziValues.push(value_5);
                }
                else
                {
                    if (duiziValues.indexOf(value_1) < 0)
                        duiziValues.push(value_1);
                }
            }
        }

        if (duiziValues.length > 0)
        {
            // 如果存在完全不同于对子点数的单牌组合，则优先提示带单牌组合
            var danPrior = false;
            for(var i in cardsArray) 
            {
                value_1 = majiang.calPoint(cardsArray[i][0]);
                value_2 = majiang.calPoint(cardsArray[i][1]);
                value_4 = majiang.calPoint(cardsArray[i][3]);
                value_5 = majiang.calPoint(cardsArray[i][4]);

                if (value_1 != value_2 || value_4 != value_5)
                {
                    if (value_1 != value_2)
                    {
                        if (value_2 == majiang.calPoint(cardsArray[i][2]))
                        {
                            if (duiziValues.indexOf(value_1) < 0 && duiziValues.indexOf(value_5) < 0)
                            {
                                danPrior = true;
                                break;
                            }
                        }
                        else
                        {
                            if (duiziValues.indexOf(value_1) < 0 && duiziValues.indexOf(value_2) < 0)
                            {
                                danPrior = true;
                                break;
                            }
                        }
                        
                    }
                    else
                    {
                        if (duiziValues.indexOf(value_4) < 0 && duiziValues.indexOf(value_5) < 0)
                        {
                            danPrior = true;
                            break;
                        }
                    }
                }
            }

            // 带单牌优先，移除包含对子点数的组合
            if (danPrior)
            {
                var bRemove = false;
                var cmpValue = 0;

                for (var i = 0; i < cardsArray.length; i++) {
                    bRemove = false;

                    value_3 = majiang.calPoint(cardsArray[i][2]);

                    for (var j = 0; j < 5; j++)
                    {
                        cmpValue = majiang.calPoint(cardsArray[i][j]);

                        if (value_3 == cmpValue)
                            continue;

                        if (duiziValues.indexOf(cmpValue) >= 0)
                        {
                            bRemove = true;
                            break;
                        }
                    }

                    if (bRemove)
                    {
                        cardsArray.splice(i, 1);
                        i--;
                    }
                }
            }
        }
    }

    var minCards = cardsArray[0];

    for(var i in cardsArray) 
    {
        if (i == 0)
            continue;

        if (majiang.calCardsValue(cardsArray[i],type,areaSelectMode) < majiang.calCardsValue(minCards,type,areaSelectMode) || 
            getCardsSum(cardsArray[i]) < getCardsSum(minCards) || getCardsProduct(cardsArray[i]) < getCardsProduct(minCards))
            minCards = cardsArray[i];
    }

    return minCards;
}

// 获取选择的牌的提示   / 滑牌提示
function getSelectCardsTips()
{
    if(GameClass[MjClient.gameType] != MjClient.GAME_CLASS.PAO_DE_KUAI) {
        return [];
    }

    if(!MjClient.majiang || !MjClient.majiang.allTipsNoOrder) {
        return [];
    }

    var pl = getUIPlayer(0);
    var pl2 = getUIPlayer(1);
    var isNextPlayerOneCard = pl2 ? pl2.handCount==1 : false;
    var majiang = MjClient.majiang;
    var tData = MjClient.data.sData.tData;
    var selectData = {}
    for(var i in tData.areaSelectMode) selectData[i] = tData.areaSelectMode[i];
    var firstPutRuleNum = tData.areaSelectMode.firstPutRule;
    if(1 == firstPutRuleNum || 3 == firstPutRuleNum) {
        selectData.firstHeiTao3 = true;  // 必须出黑桃3
    } else if(2 == firstPutRuleNum || 4 == firstPutRuleNum){
        selectData.firstHeiTao3 = false; // 可以不出黑桃3
    }

    var isFirstRound = tData.roundAll == tData.roundNum;

    var selectCard = [];
    for(var index in MjClient.touchMoveSelcetCardArray) {
        var selectnode = MjClient.touchMoveSelcetCardArray[index];
        if (cc.sys.isObjectValid(selectnode))    
            selectCard.push(selectnode.tag);
    }
    if(MjClient.selectCards_card && MjClient.selectCards_card.length > 0 ) {
        return selectCard;
    }

    // 如果选择的牌可出， 全部提起
    var lastPutCards = tData.lastPutCard;
    if (tData.lastPutPlayer == tData.curPlayer || tData.lastPutPlayer == -1) {
        lastPutCards = null;
    }

    var isCanPut = majiang.checkPut(pl.mjhand, selectCard, lastPutCards, selectData, isNextPlayerOneCard, isFirstRound);
    if(isCanPut) {
        return selectCard;
    }

    // 选择的牌全为3张， 直接提起
    var isAllSanZhang = true;
    for(var i in selectCard) {
        var find = majiang.findNSameCard(selectCard, majiang.calPoint(selectCard[i]), 3);
        if(!find) isAllSanZhang = false;
    }
    if(isAllSanZhang) {
        return selectCard;
    }

    if(!MjClient.selectTipCardsArray) return selectCard;

    // 原有提示上筛选合适的提示
    var tipCardsArray = [];
    var allTipCards = MjClient.selectTipCardsArray.slice();
    allTipCards.sort(function(a, b){
        return b.length - a.length
    })

    // 寻找牌最多的提示
    var maxSameNum = 0;
    //var lastDuiziIndex = -1;
    var sameIndexs = {};

    for(var i in allTipCards) {
        var tipcards = allTipCards[i];

        // cc.log("----------------------------------------------");

        // for(var j in tipcards) {
        //     cc.log("The tip value = " + majiang.calPoint(tipcards[j]));
        // }

        // if(tipcards.length == 2) 
        // {
        //     lastDuiziIndex = i;
        // }

        if(tipcards.length <= selectCard.length) { 
            var sameNum = 0;

            // 完全从原有提示中挑选，如果提示牌不在选中的牌中，则丢弃这组提示
            for(var j in tipcards) {
                if(selectCard.indexOf(tipcards[j]) >= 0) 
                    sameNum++;
                else if ((!majiang.CARDTPYE.szdaipai || majiang.CARDTPYE.szdaipai < 0) && 
                    (!majiang.CARDTPYE.sztonghua || majiang.CARDTPYE.sztonghua < 0) && 
                    !selectData.tongHuaShun && (!isFirstRound || !selectData.firstHeiTao3))
                {
                    // 修正提示点数匹配，但是牌值不能匹配的情况
                    var bContain = false;
                    for(var k = selectCard.length - 1; k >= 0; k--) {
                        if (majiang.calPoint(selectCard[k]) == majiang.calPoint(tipcards[j]) && tipcards.indexOf(selectCard[k]) < 0)
                        {
                            bContain = true;
                            sameNum++;
                            tipcards[j] = selectCard[k];
                            break;
                        }
                    }

                    if (!bContain)
                        break;
                } 
                else
                    break;
            }

            if (sameNum > 0 && sameNum == tipcards.length)
            {
                if (!sameIndexs["_" + sameNum])
                    sameIndexs["_" + sameNum] = [];

                sameIndexs["_" + sameNum].push(i);

                if(maxSameNum < sameNum) {
                    maxSameNum = sameNum;
                }
            }    
        }
    }

    // 如果提示的只有单牌，就提起所有选择的牌
    if (maxSameNum < 2)
        return selectCard;

    // 相同牌数时，提示牌优先级
    var putOrders = [
        majiang.CARDTPYE.shunzi,
        majiang.CARDTPYE.feiji,
        majiang.CARDTPYE.liandui,
        majiang.CARDTPYE.sidaisan,
        majiang.CARDTPYE.sidaier,
        majiang.CARDTPYE.sandaier,
        majiang.CARDTPYE.sandaiyi,
        majiang.CARDTPYE.sanzhang,
        majiang.CARDTPYE.sange3,
        majiang.CARDTPYE.sizha,
        majiang.CARDTPYE.sangeA,
        majiang.CARDTPYE.duizi
    ];

    // 加入同花顺和同花顺带牌的类型
    if (majiang.CARDTPYE.sztonghua && majiang.CARDTPYE.sztonghua > 0)
        putOrders.splice(0,0,majiang.CARDTPYE.sztonghua);

    if (majiang.CARDTPYE.szdaipai && majiang.CARDTPYE.szdaipai > 0)
        putOrders.splice(0,0,majiang.CARDTPYE.szdaipai);

    // 加入巡航导弹类型
    if (majiang.CARDTPYE.xunhangdaodan && majiang.CARDTPYE.xunhangdaodan > 0)
    {
        var index = putOrders.indexOf(majiang.CARDTPYE.liandui);
        putOrders.splice(index,0,majiang.CARDTPYE.xunhangdaodan);
    }

    // 加入sange3daiyi类型
    if (majiang.CARDTPYE.sange3daiyi && majiang.CARDTPYE.sange3daiyi > 0)
    {
        var index = putOrders.indexOf(majiang.CARDTPYE.sange3);
        putOrders.splice(index,0,majiang.CARDTPYE.sange3daiyi);
    }

    // 加入sidaiyi类型
    if (majiang.CARDTPYE.sidaiyi && majiang.CARDTPYE.sidaiyi > 0)
    {
        var index = putOrders.indexOf(majiang.CARDTPYE.sizha);
        putOrders.splice(index,0,majiang.CARDTPYE.sidaiyi);
    }

    // 加入sangeAdaiyi类型
    if (majiang.CARDTPYE.sangeAdaiyi && majiang.CARDTPYE.sangeAdaiyi > 0)
    {
        var index = putOrders.indexOf(majiang.CARDTPYE.sangeA);
        putOrders.splice(index,0,majiang.CARDTPYE.sangeAdaiyi);
    }

    // 加入sanshun类型
    // if (majiang.CARDTPYE.sanshun && majiang.CARDTPYE.sanshun > 0)
    // {
    //     var index = putOrders.indexOf(majiang.CARDTPYE.feiji);
    //     putOrders.splice(index+1,0,majiang.CARDTPYE.sanshun);
    // }

    for (var cardCount in sameIndexs) {
        var indexs = sameIndexs[cardCount];

        // 对张数相同的提示牌进行分类
        var classifiedCards = {};

        for(var i in indexs) {
            var cardType = majiang.cardsType(allTipCards[indexs[i]], selectData);

            if (!classifiedCards[cardType])
                classifiedCards[cardType] = [];

            var cards = allTipCards[indexs[i]].slice();
            cards.sort(majiang.cardValueCmp.bind(majiang));
            classifiedCards[cardType].push(cards);
        }

        for(var i in putOrders)
        {
            if (classifiedCards[putOrders[i]])
            {   
                // 挑一组同类型的最小牌组合
                return getMinCards(classifiedCards[putOrders[i]],putOrders[i],selectData);;
            }
        }
    }

    // 如果有对子, 提起对子
    // if(lastDuiziIndex > 0 && maxSameNum > 2) {
    //     tipcards = allTipCards[ lastDuiziIndex + 1]
    // }

    return selectCard;
}

function isSelectDiCards_HuaQuanJiao(){
    var tData = MjClient.data.sData.tData;
    var _isSelectDiCards = false;

    if(MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO &&
        tData.tState == TableState.waitMaiPai && 0 == getOffByIndex(tData.curPlayer) ){
        _isSelectDiCards = true;
    }

    return _isSelectDiCards;
}

function showTouchSelectHorCards()
{
    var downNode = MjClient.playui._downNode;
    var standUI = downNode.getChildByName("stand");
    var children = downNode.children;

    var tData = MjClient.data.sData.tData;
    if(isSelectDiCards_HuaQuanJiao()){
        children = MjClient.playui._downNode.getChildByName("selectDiCardPannel_New").getChildren(); //MjClient.playui.panel
        standUI = MjClient.playui._downNode.getChildByName("selectDiCardPannel_New").getChildByName("stand");
    }

    var upSize = standUI.getSize();
    var upS = standUI.scale;
    var cardY = upSize.width * upS*1.5; //一张牌的长度
    var cardOut = parseInt(cardY/4);//点击牌弹起的高度,以前是20像素

    cc.log('standUIstandUI'+JSON.stringify(standUI))
    cc.log('childrenchildren'+JSON.stringify(children))

    MjClient.colloctionCurrentSelcetUIArray = [];
    var tipcards = getSelectCardsTips();

    var specialType_1 = (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI || 
        GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU || 
        GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA || 
        MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || 
        MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER || 
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
        MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI || 
        MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
        MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
        MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
        MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||  
        MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN);

    var specialType_2 = (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA || 
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA);

    for(var i = 0; i < children.length; i++)
    {
        if( !cc.sys.isObjectValid(children[i]) ) continue;

        if(children[i].name == "mjhand")
        {
            if (specialType_1)
            {
                if (!children[i].cannotOut)
                    children[i].setColor(cc.color(255,255,255));
            }
            else
            {
                children[i].setColor(cc.color(255,255,255));
            }

            //如果是理牌的牌，则继续灰色
            for(var m = 0;m< MjClient.colloctionCardsArray.length;m++)
            {
                var _colloctionCards = MjClient.colloctionCardsArray[m].slice();

                for (var k = 0; k < _colloctionCards.length; k++) {
                    if (children[i].tag == _colloctionCards[k] &&
                        checkUINodeHave(MjClient.colloctionCardsUIArray,children[i])//判断是否是此UI节点
                    ) {
                        children[i].setColor(cc.color(190,190,190));
                        var index = _colloctionCards.indexOf(_colloctionCards[k]);
                        _colloctionCards.splice(index,1);
                    }
                }
            }

            var standUI_2RowY = null;
            if(isSelectDiCards_HuaQuanJiao() && i >= MjClient.playui.secondRowStartIndex ){
                if(children[i]){
                    standUI_2RowY = standUI.y - standUI.height*1.3//children[i].height*1.3
                }
            }

            // var tipcards = getSelectCardsTips();
            for(var j = 0;j < MjClient.touchMoveSelcetCardArray.length;j++)
            {
                if(!cc.sys.isObjectValid(MjClient.touchMoveSelcetCardArray[j])) continue;
                if(children[i].tag == MjClient.touchMoveSelcetCardArray[j].tag &&
                    children[i].getUserData() == MjClient.touchMoveSelcetCardArray[j].getUserData()
                )
                {
                    var dy = Math.round(children[i].y - standUI.y);

                    if(isSelectDiCards_HuaQuanJiao() && i >= MjClient.playui.secondRowStartIndex ){

                        dy = Math.round(children[i].y - standUI_2RowY);
                    }

                    if(children[i]&&children[i].isUp && dy < Math.round(standUI.y + cardOut) && specialType_2)
                    {
                        if (MjClient.majiang && MjClient.majiang.allTipsNoOrder) {
                            if(tipcards.indexOf(MjClient.touchMoveSelcetCardArray[j].tag) >= 0) {
                                children[i].y = standUI.y*2 + cardOut;
                                MjClient.selectCards_card.push(children[i].tag);
                            }
                        } else {
                            children[i].y = standUI.y*2 + cardOut;
                            MjClient.selectCards_card.push(children[i].tag);
                        }
                    }
                    else if(dy < cardOut)
                    {
                        if (MjClient.majiang && MjClient.majiang.allTipsNoOrder) {
                            if(tipcards.indexOf(MjClient.touchMoveSelcetCardArray[j].tag) >= 0) {
                                children[i].y = standUI.y + cardOut;
                                MjClient.selectCards_card.push(children[i].tag);
                            }
                        } else {
                            children[i].y = standUI.y + cardOut;

                            if(isSelectDiCards_HuaQuanJiao() && i >= MjClient.playui.secondRowStartIndex ){
                                children[i].y = standUI_2RowY + cardOut;
                            }
                            MjClient.selectCards_card.push(children[i].tag);
                        }
                    }
                    else
                    {
                        if(bTouchMove)
                        {
                            if(children[i]&&children[i].isUp && specialType_2) {
                                children[i].y = standUI.y*2;
                            }
                            else 
                            {
                                children[i].y = standUI.y;

                                if(isSelectDiCards_HuaQuanJiao() && i >= MjClient.playui.secondRowStartIndex ){
                                    children[i].y = standUI_2RowY + cardOut;

                                    if(children[i].y > standUI_2RowY ){ //提起来的放下
                                        children[i].y = standUI_2RowY;
                                    }
                                }
                            }
                            var index = MjClient.selectCards_card.indexOf(children[i].tag);//把这张牌从数组删除

                            if(index >= 0)  
                                MjClient.selectCards_card.splice(index,1);
                            else if (children[i].replacement) {
                                index = MjClient.selectCards_card.indexOf(children[i].replacement);

                                if (index >= 0)
                                    MjClient.selectCards_card.splice(index,1);
                            }
                        }
                        else
                        {
                            if(children[i]&&children[i].isUp && specialType_2) {
                                children[i].y = standUI.y*2;
                            } 
                            else 
                            {
                                children[i].y = standUI.y;

                                if(isSelectDiCards_HuaQuanJiao() && i >= MjClient.playui.secondRowStartIndex){
                                    children[i].y = standUI_2RowY;
                                }
                            }

                            var index = MjClient.selectCards_card.indexOf(children[i].tag);//把这张牌从数组删除
                            if(index >= 0)  
                                MjClient.selectCards_card.splice(index,1);
                            else if (children[i].replacement) {
                                index = MjClient.selectCards_card.indexOf(children[i].replacement);

                                if (index >= 0)
                                    MjClient.selectCards_card.splice(index,1);
                            }
                        }
                    }
                }
            }


            var dy = Math.round(children[i].y - standUI.y);

            if(isSelectDiCards_HuaQuanJiao() && i >= MjClient.playui.secondRowStartIndex ){
                dy = Math.round(children[i].y - standUI_2RowY);
            }

            if(dy >= cardOut)
            {
                //排除已选的牌UI
                var bExist = false;
                for(var w  = 0 ;w < MjClient.colloctionCurrentSelcetUIArray.length;w++)
                {
                    if(MjClient.colloctionCurrentSelcetUIArray[w].tag == children[i].tag &&
                        MjClient.colloctionCurrentSelcetUIArray[w].getUserData() == children[i].getUserData()
                    )
                    {
                        bExist = true;
                        break;
                    }
                }

                if(!bExist)
                {
                    MjClient.colloctionCurrentSelcetUIArray.push(children[i]);
                }
            }
        }
    }

    //理牌按钮状态修改
    if(MjClient.playui._bg_sort)
    {
        if(MjClient.selectCards_card.length > 0)
        {
            MjClient.isSorting = true;
            MjClient.playui._bg_sort.getChildByName("Button_sort").loadTextureNormal("playing/cardTable/lipai.png");
            MjClient.playui._bg_sort.getChildByName("Button_sort").visible = true;
            MjClient.playui._bg_sort.getChildByName("Button_sort").setTouchEnabled(true);
        }
        else
        {
            MjClient.isSorting = false;
            if(MjClient.colloctionCardsArray.length > 0)
            {
                MjClient.playui._bg_sort.getChildByName("Button_sort").loadTextureNormal("playing/cardTable/huifu.png");
                MjClient.playui._bg_sort.getChildByName("Button_sort").visible = true;
                MjClient.playui._bg_sort.getChildByName("Button_sort").setTouchEnabled(true);
            }
            else
            {
                MjClient.playui._bg_sort.getChildByName("Button_sort").visible = false;
                MjClient.playui._bg_sort.getChildByName("Button_sort").setTouchEnabled(false);
            }
        }
    }

    UpdataCurrentPutCard(true);
}

function showTouchSelectVerCards()
{
    var downNode = MjClient.playui._downNode;
    var standUI = downNode.getChildByName("stand");
    var children = downNode.children;

    for(var i = 0; i < children.length; i++)
    {
        if(cc.sys.isObjectValid(children[i]) && children[i].name == "mjhand")
        {

            // children[i].setColor(MjClient.whiteColor);
            // children[i].isGray = false;
            // //如果是理牌的牌，则继续灰色
            if(children[i].isGray)
            {
                cc.log(" children[i] = " + children[i].tag);
                children[i].setColor(MjClient.grayColor);
            }

            // //如果是理牌的牌，则继续灰色
            // for(var m = 0;m< MjClient.colloctionCardsArray.length;m++)
            // {
            //     var _colloctionCards = MjClient.colloctionCardsArray[m].slice();
            //
            //     for (var k = 0; k < _colloctionCards.length; k++) {
            //         if (children[i].tag == _colloctionCards[k] &&
            //             checkUINodeHave(MjClient.colloctionCardsUIArray,children[i])//判断是否是此UI节点
            //         ) {
            //             children[i].setColor(MjClient.grayColor);
            //             children[i].isGray = true;
            //             var index = _colloctionCards.indexOf(_colloctionCards[k]);
            //             _colloctionCards.splice(index,1);
            //         }
            //     }
            // }


            for(var j = 0;j < MjClient.touchMoveSelcetCardArray.length;j++)
            {
                cc.log('wwwwww777')
                if(children[i].tag == MjClient.touchMoveSelcetCardArray[j].tag &&
                    children[i].getUserData() == MjClient.touchMoveSelcetCardArray[j].getUserData()
                )
                {

                    cc.log("=========gray tag = " +children[i].tag);

                    if(!children[i].isGray)
                    {
                        children[i].isGray = true;
                        MjClient.selectCards_card.push(children[i].tag);
                        children[i].setColor(MjClient.grayColor);
                    }
                    else
                    {
                        if(bTouchMove)
                        {
                            var index = MjClient.selectCards_card.indexOf(children[i].tag);//把这张牌从数组删除
                            MjClient.selectCards_card.splice(index,1);
                        }
                        else
                        {

                            var index = MjClient.selectCards_card.indexOf(children[i].tag);//把这张牌从数组删除
                            MjClient.selectCards_card.splice(index,1);
                        }
                        children[i].setColor(MjClient.whiteColor);
                        children[i].isGray = false;
                    }
                }
            }
        }
    }


    MjClient.colloctionCurrentSelcetUIArray = [];
    //MjClient.currentSelectCards = [];
    for(var k = 0; k < children.length; k++)
    {
        if (children[k].isGray)//能这样判断？
        {
            //排除已选的牌UI
            var bExist = false;
            for (var w = 0; w < MjClient.colloctionCurrentSelcetUIArray.length; w++) {
                if (MjClient.colloctionCurrentSelcetUIArray[w].tag == children[k].tag &&
                    MjClient.colloctionCurrentSelcetUIArray[w].getUserData() == children[k].getUserData()
                ) {
                    bExist = true;
                    break;
                }
            }

            if (!bExist) {
                cc.log("  colloctionCurrentSelcetUIArray children[i] " + children[k].tag)
                MjClient.colloctionCurrentSelcetUIArray.push(children[k]);
                //MjClient.currentSelectCards.push(children[k].tag);
            }
        }
    }


    for(var m  =  0;m < MjClient.colloctionCurrentSelcetUIArray.length;m++) {
        cc.log("33333333333333：" + MjClient.colloctionCurrentSelcetUIArray[m].tag);
        cc.log("333333333333333DATA ：" + MjClient.colloctionCurrentSelcetUIArray[m].getUserData());
    }


    // //利好的牌
    // for(var i  =  0;i < MjClient.colloctionCurrentSelcetUIArray.length;i++)
    // {
    //     var _colloctionUICards = MjClient.colloctionCurrentSelcetUIArray[i];
    //     for(var j = 0;j < _colloctionUICards.length;j++) {
    //         cc.log("EEEEETTTTT理牌堆里面的牌：" + _colloctionUICards[j].tag);
    //         cc.log("EEEEETTTTT理牌堆里面的牌 DATA ：" + _colloctionUICards[j].getUserData());
    //     }
    // }



    //理牌按钮状态修改
    if(MjClient.selectCards_card.length > 0)
    {
        MjClient.isSorting = true;
        MjClient.playui._bg_sort.getChildByName("Button_sort").loadTextureNormal("playing/cardTable/lipai.png");
        MjClient.playui._bg_sort.getChildByName("Button_sort").visible = true;
        MjClient.playui._bg_sort.getChildByName("Button_sort").setTouchEnabled(true);
    }
    else
    {
        MjClient.isSorting = false;
        if(MjClient.colloctionCardsArray.length > 0)
        {
            MjClient.playui._bg_sort.getChildByName("Button_sort").loadTextureNormal("playing/cardTable/huifu.png");
            MjClient.playui._bg_sort.getChildByName("Button_sort").visible = true;
            MjClient.playui._bg_sort.getChildByName("Button_sort").setTouchEnabled(true);
        }
        else
        {
            MjClient.playui._bg_sort.getChildByName("Button_sort").visible = false;
            MjClient.playui._bg_sort.getChildByName("Button_sort").setTouchEnabled(false);
        }
    }
    cc.log('xxxxxx666')
    UpdataCurrentPutCard();
}

/*
    end of 滑动选牌
 */

function CardLayoutRestoreForEndOne_ty (node, plNode)
{
    var layoutType = false;//默认排序
    var newVal = 0; //新牌的值，是几万，几筒，几条....为数字
    var pl; //player 信息

    pl = plNode;//获取玩家信息.off 为0 ，就是自己得信息，能看到自己摸牌 by sking
    var children = node.children;
    var tempMaJiang = MjClient.majiang; //麻将的各种方法判断，是否可以杠，是否可以吃... by sking

    //up stand 是2种麻将的图。
    var up = node.getChildByName("up");
    var stand = node.getChildByName("stand");
    var start;
    start = stand;
    var upSize = start.getSize();
    var upS = start.scale;
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
            if(MjClient.data.sData.tData.hunCard == ci.tag)
            {
                uihun.push(ci);
            }
            else
            {
                uistand.push(ci);
            }

            if(MjClient.data.sData.tData.hunCard == ci.tag)
            {
                //ci.setColor(cc.color(255,255,63));
            }

            var _smallFlower = ci.getChildByName("cardType").getChildByName("smallFlower");
            if(_smallFlower)
            {
                _smallFlower.setPosition(22,35)
            }

        }
        else if(ci.name == "standPri")
        {
            uistand.push(ci);
        }
        else if(ci.name == "mjhand_replay")
        {
            uistand.push(ci);
            var _smallFlower = ci.getChildByName("cardType").getChildByName("smallFlower");
            if(_smallFlower)
            {
                _smallFlower.setPosition(22,35)
            }
        }
    }

    /*
     排序方式
     */
    var rankType = 1;//0 从小到大排序 ，1 按照算法排序
    var pro_rankType = false;
    if(!layoutType)
    {
        pro_rankType = false;
    }
    else
    {
        pro_rankType = true;
    }

    if(rankType == 0)
    {
        uistand.sort(TagOrder);
    }
    else
    {   
        var handcards = pl.mjhandRecord || pl.mjhand;   // 有mjhandRecord则显示所有牌， 打出的牌显示遮罩
        if(handcards && handcards.length > 0)
        {
            var mjhandPai = tempMaJiang.sortHandCards(handcards, pro_rankType);
            var cardCount = 0;
            var tempuistand = uistand.slice();
            cc.log(pro_rankType + "=========  mjhandPai = " + JSON.stringify(mjhandPai));
            var myUiStand = []; //重新排序后
            for(var j = 0;j < mjhandPai.length;j++)
            {
                for (var i = 0; i < tempuistand.length; i++) {
                    var tag = tempuistand[i].tag;
                    if (tag == mjhandPai[j])
                    {
                        myUiStand.push(tempuistand[i]);
                        var index = tempuistand.indexOf(tempuistand[i]);
                        tempuistand.splice(index,1);
                        cardCount++;
                    }
                }
            }
            uistand = myUiStand;
        }
    }


    if(uihun.length > 0) //是否有柰子，有则放在最前面 by sking
    {
        for(var i = 0; i < uihun.length; i++)
        {
            uistand.unshift(uihun[i]); //向数组开头添加一个元素 unshift
        }
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

    //设置麻将位置
    for(var i = 0; i < orders.length; i++) {
        var ci = orders[i];
        if (i != 0) {
            if (ci.name == orders[i - 1].name) {
                if (ci.name == "mjhand") {
                    ci.x = orders[i - 1].x + upSize.width * upS * 0.4;//调牌的距离的
                }
            }
        }
        else {
            ci.x = start.x + upSize.width * upS * 0.1;
        }

        ci.zIndex = i;
    }
};

function setjiaBeiTag_card(msg,off)
{
     cc.log("============setMaizhuangTag===========" + JSON.stringify(msg));
    var _node = getNode_cards(off);
    var _maizhuangNode = _node.getChildByName("head").getChildByName("icon_jiabei");
    var pl = getUIPlayer(off);
    if(pl && msg.uid === pl.info.uid)
    {
        if(msg.jiazhuNum == 2)
        {
            cc.log("加倍。。。。。。。。。。。");
            _maizhuangNode.visible = true;
        }
        else {

            _maizhuangNode.visible = false;
        }
    }
}

function isExistPKImg(type) {
    switch (type) {
        case 0:
            return true;
        case 1:
            return jsb.fileUtils.isFileExist("playing/cardPic3/302.png") || jsb.fileUtils.isFileExist("playing/cardPic3/hong_1.png");
        case 2:
            {
                if ((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
                    return jsb.fileUtils.isFileExist("playing/cardPic4/302.png");
            }
    }
    return false;
}

function setPKImg(node, cd, isOnDesk, type) {
    if ((MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP &&
        MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ &&
        MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXXXGHZ && 
        MjClient.getAppType() != MjClient.APP_TYPE.QXLYQP && 
        MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXXZMJ && 
        MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ &&
        MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXNTQP &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXHAMJ &&
        MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ) || 
        (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ && GameClass[MjClient.gameType] != MjClient.GAME_CLASS.PAO_DE_KUAI) || 
        (MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ && GameClass[MjClient.gameType] != MjClient.GAME_CLASS.PAO_DE_KUAI) || 
        (MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP && GameClass[MjClient.gameType] != MjClient.GAME_CLASS.PAO_DE_KUAI) ||
        (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ && GameClass[MjClient.gameType] != MjClient.GAME_CLASS.PAO_DE_KUAI)) {
        setCardSpriteByCardPic2(node, cd, isOnDesk);
        return;
    }

    setPKImgDif(node);

    if (arguments.length < 4)
        type = getCurrentPKImgType();

    if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
        MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
        MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
        MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
        MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ) {
        setCardSpriteByCardPicYueYangNiuShiBie(node, cd, isOnDesk, type);
        return;
    }
    
    switch (type) {
        case 0:
            setCardSpriteByCardPic2(node, cd, isOnDesk);
            break;
        case 1:
            if (isJinZhongAPPType() || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP)
                setCardSpriteByCardPic3JinZhong(node, cd, isOnDesk);
            else if(MjClient.gameType == MjClient.GAME_TYPE.DIAN_TUO)
                 setCardSpriteByCardPic3DIanTuo(node, cd, isOnDesk);
            else
                setCardSpriteByCardPic3(node, cd, isOnDesk);
            break;
        case 2:
            setCardSpriteByCardPic4(node, cd, isOnDesk);
            break;
    }

    if(cd == -1 && MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO ){
        var beiMain = new cc.Sprite("playing/cardPic2/beimian_puke.png");
        beiMain.setName("beiMain");
        beiMain.setScale(node.width/beiMain.width, node.height/beiMain.height);
        beiMain.setPosition(node.width/2, node.height/2);
        node.addChild(beiMain, 111);
    }

    var dizhuTag = node.getChildByName("dizhuTag");
    if (dizhuTag)
        dizhuTag.setPosition(node.width - dizhuTag.width/2, node.height - dizhuTag.height/2);

    var beiMain = node.getChildByName("beiMain");
    if (beiMain) {
        beiMain.setPosition(node.width/2, node.height/2);
        beiMain.setScale(node.width/beiMain.width, node.height/beiMain.height);
    }
}

function setPKMiniImg(node, cd, type) {

    if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
        MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
        MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
        MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K ||
        MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN  ) {

        if( (type == "mjhand_you" || (type == "mjhand_replay") || (node && node.isPKMiniImg)) && (MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
            MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG || MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG || MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN || MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K) )
        {
            setYouPaiSprite(node, cd);
            return;
        }else{
            setCardMiniSpriteByCardPicYueYangNiuShiBie(node, cd);
            return;
        }
    }

    if (arguments.length < 3)
        type = getCurrentPKImgType();

    switch (type) {
        case 0:
            setCardMiniSprite(node, cd);
            break;
        case 1:
            setCardMiniSpriteByCardPic3(node, cd);
            break;
        default:
            setCardMiniSprite(node, cd);
            break;
    }
}

function setPKImgDif(node)
{
    if (isJinZhongAPPType())
        return;

    var currentPKImgType = getCurrentPKImgType();
    if (!node.srcScale) {
        node.srcScale = node.getScale();
        node.srcWidth = node.width;
        node.srcHeight = node.height;
    }

    var isDownHandNode = node.getParent() && node.getParent().getName() == "down" && (node.name == "mjhand" || node.name == "mjhand_replay")    // 自己的手牌 
    var condition_1 = (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN || MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
        MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG || MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN || MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
        MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_510K);
    var condition_2 = currentPKImgType == 1;
    var condition_3 = currentPKImgType == 2;
    if (condition_1 || condition_2 || condition_3) {
        if (condition_1) {
            isDownHandNode = isDownHandNode || (node.getParent() && node.getParent().getName() == "partner" && node.name == "mjhand_partner")    // 队友的手牌
            
            node.width = 157;
            node.height = 218;
        }
        else if (condition_2) {
            node.width = 155;
            node.height = 216;
        } else if (condition_3) {
            node.width = 179;
            node.height = 242;
        }

        if (isDownHandNode) {
            if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE)
                node.setScale(MjClient.size.width/1280 * 0.8);
            else if (MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI)
                node.setScale(MjClient.size.width/1280 * 0.88);
            else
                node.setScale(MjClient.size.width/1280 * 1.0);
        }
        else {
            var scaleX = node.srcWidth*node.srcScale/node.width;
            var scaleY = node.srcHeight*node.srcScale/node.height;
            node.setScale(scaleX < scaleY ? scaleX : scaleY);
        }
    } else {
        node.setScale(node.srcScale);
        node.width = node.srcWidth;
        node.height = node.srcHeight;
    }

    if (isDownHandNode) {
        var stand = node.getParent().getChildByName("stand");
        if (!stand.isDifInit) {
            stand.isDifInit = true;
            stand.srcY = stand.y;
        }

        var baseY = 0;
        if (node.isUp &&  (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA
            || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA)) {
            if (stand.srcY - node.height*node.scaleX*0.5 < 0)
                baseY = node.height*node.scaleX;
            else
                baseY = stand.srcY*2;
        }
        else {
            if (stand.srcY - node.height*node.scaleX*0.5 < 0)
                baseY = node.height*node.scaleX*0.5;
            else
                baseY = stand.srcY;

            if (baseY != stand.srcY)
                stand.y = baseY;
        }

        var upSize = stand.getSize();
        var upS = stand.scale;
        var cardY = upSize.width * upS * 1.5; //一张牌的长度
        var cardOut = cardY / 4; //点击牌弹起的高度,以前是20像素
        var difY = node.y - baseY;
        if (difY > cardOut/2)
            node.y = baseY + cardOut;
        else
            node.y = baseY;
    }
}

function changePKImg(node, type)
{
    if (MjClient.playui.isFaPai) {
        node.stopActionByTag(20180723);
        var action = cc.sequence(cc.delayTime(0.1), cc.callFunc(function() {
            changePKImg(node, type);
        }));
        action.setTag(20180723);
        node.runAction(action);
        return;
    }

    if (node.isPKImg && node.toString() == "[object ImageView]") {
        setPKImg(node, node.tag, node.isOnDesk, type);
    }
    else if (node.isPKMiniImg && node.toString() == "[object ImageView]") {
        setPKMiniImg(node, node.tag, type);
    }

    var childArray = node.getChildren();
    for(var index in childArray)
    {
        var child = childArray[index];
        changePKImg(child, type);
    }
}
function setReadyHide(node) {

   function callfunc(node1) {
        node1.getChildByName("ready").visible=false;
       cc.log("setReadyHide"+node1._name);
    }
    var ready1=callfunc.call(null,node);

}
function setNoPutHide(node) {

    function callfunc(node1) {
        node1.getChildByName("noPutTag").visible=false;
        cc.log("setNoputHide"+node1._name);
    }
    var ready1=callfunc.call(null,node);

}

function setTuoGuanCountDown(msg,countDownNode,uiOff) {
    var player = getUIPlayer(uiOff);

    if(player && player.info.uid == msg.uid){
        countDownNode.visible = true;

        var tipCountDown = msg.tipCountDown;
        var countDownText = countDownNode.getChildByName("TG_CountDown");
        if (!countDownText)
            countDownText = countDownNode;

        countDownText.setString(tipCountDown);
        
        countDownNode.schedule(function () {
            if (tipCountDown > 0)
                tipCountDown--;

            if (tipCountDown <= 0) {
                countDownNode.setVisible(false);
                countDownNode.unscheduleAllCallbacks();
            } else
                countDownText.setString(tipCountDown);

        }, 1, cc.REPEAT_FOREVER, 0);
    }
}

// 播放闲家得分动画
function showSanDaHaScoreAddedAnim(curScore,scoreAdded,scoreNode)
{
    if (scoreAdded <= 0)
        return;

    var scoreText = new ccui.TextAtlas("+" + scoreAdded, "playing/sanDaHa/xian_add_score.png", 36, 48, "+");
    scoreText.setAnchorPoint(cc.p(0.5,0.5));
    MjClient.playui.addChild(scoreText,10);

    setWgtLayout(scoreText, [scoreText.width / 1280, scoreText.height / 720], [0.3, 0.7], [0, 0]);

    var originalScale = scoreText.getScale();
    scoreText.setScale(0.9 * originalScale);

    var desPoint = scoreNode.convertToWorldSpace(cc.p(scoreNode.getContentSize().width/2, 0));
    desPoint = cc.p(desPoint.x,desPoint.y - 10 * Math.min(MjClient.size.width/1280,MjClient.size.height/720));

    scoreText.runAction(cc.sequence(cc.delayTime(1),cc.spawn(cc.moveTo(0.5, desPoint).easing(cc.easeSineIn()),cc.scaleTo(0.5, 0.5 * originalScale).easing(cc.easeSineIn())), 
        cc.callFunc(function() {
            scoreText.removeFromParent();
            
            scoreNode.setString(curScore);

            originalScale = scoreNode.getScale();
            scoreNode.runAction(cc.sequence(cc.scaleTo(0.2, 1.5 * originalScale),cc.scaleTo(0.2, originalScale)));
        }
    )));
}

// 显示计分面板
function showSanDaHaJiFenPanel(jiFenPanel) {
    var tData = MjClient.data.sData.tData;
    var fenPaiArr = tData.allFenPaiArr.slice();
    jiFenPanel.visible = true;

    var remainNum = 200;
    for(var i = 0; i < fenPaiArr.length; i++)
    {
        var cardType = Math.ceil(fenPaiArr[i] / 4)
        if(cardType == 5) {
            remainNum -= 5;
        }
        else {
            remainNum -= 10;
        }
    }
    var remainPointNode = jiFenPanel.getChildByName("remainPoint");
    remainPointNode.ignoreContentAdaptWithSize(true);
    remainPointNode.setString(remainNum);

    var func = function(node, type){
        var children = node.children;
        for(var i = 0; i < children.length; i++)
        {
            if(i == 0 || i == 1)
            {
                setCardSprite_card(children[i],20 - type);
                var index = fenPaiArr.indexOf(20 - type);
                var flag = false;
                children[i].setColor(cc.color(255,255,255));
                if(index != -1)
                {
                    flag = true;
                    fenPaiArr.splice(index,1);
                }
                if(flag)
                {
                    flag = false;
                    children[i].setColor(cc.color(127,127,127));
                }
            }
            if(i == 2 || i == 3)
            {
                setCardSprite_card(children[i],40 - type);
                var index = fenPaiArr.indexOf(40 - type);
                var flag = false;
                children[i].setColor(cc.color(255,255,255));
                if(index != -1)
                {
                    flag = true;
                    fenPaiArr.splice(index,1);
                }
                if(flag)
                {
                    flag = false;
                    children[i].setColor(cc.color(127,127,127));
                }
            }
            if(i == 4 || i == 5)
            {
                setCardSprite_card(children[i],52 - type);
                var index = fenPaiArr.indexOf(52 - type);
                var flag = false;
                children[i].setColor(cc.color(255,255,255));
                if(index != -1)
                {
                    flag = true;
                    fenPaiArr.splice(index,1);
                }
                if(flag)
                {
                    flag = false;
                    children[i].setColor(cc.color(127,127,127));
                }
            }
        }
    }
    var heiT = jiFenPanel.getChildByName("heiT");
    var hongT = jiFenPanel.getChildByName("hongT");
    var meiH = jiFenPanel.getChildByName("meiH");
    var fangK = jiFenPanel.getChildByName("fangK");
    func(heiT,0);
    func(hongT,1);
    func(meiH,2);
    func(fangK,3);
}

function setChickenCardIcon(eD)
{
    var tData = MjClient.data.sData.tData;

    var _isZhuangPut = false;
    var _isZhuangPartnerWrong = false;
    var _isZhuangPartnerPut = false;

    if(eD){
        _isZhuangPut = eD.uid == tData.uids[tData.zhuang];
        _isZhuangPartnerWrong =(eD.zhuangPartner == null || eD.zhuangPartner < 0);

        if(_isZhuangPartnerWrong){ //首次才有zhuangPartner；
            _isZhuangPartnerWrong = typeof(tData.zhuangPartner) == "undefined" ||  tData.zhuangPartner < 0 || tData.zhuangPartner == null;
        }
        
        var _zhuangPartnerUid = eD.zhuangPartner;
        if(_zhuangPartnerUid >= 0){
            _zhuangPartnerUid = tData.uids[eD.zhuangPartner];
        }
        
        if(typeof(_zhuangPartnerUid) ==  "undefined" && tData.zhuangPartner >= 0){
            _zhuangPartnerUid = tData.uids[tData.zhuangPartner];
        }

        if( (_zhuangPartnerUid > 0) && (!(tData.zhuangPartner >= 0)) ){
            tData.zhuangPartner = tData.uids.indexOf(_zhuangPartnerUid);
        }
    }
    else{
        _isZhuangPut = tData.lastPutPlayer == tData.zhuang; 
        _isZhuangPartnerWrong = (typeof(tData.zhuangPartner) == "undefined" || tData.zhuangPartner < 0); 
        _isZhuangPartnerPut = tData.lastPutPlayer == tData.zhuangPartner;

        if(_isZhuangPut){
            _isZhuangPut = false;//重连忽略
        }
    }

    _isZhuangPartnerPut = (eD ? (eD.uid == _zhuangPartnerUid ) : true) ;//重连忽略

    if( tData.chickenCard == -1 || tData.chickenCard == null || tData.zhuang == -1 || _isZhuangPut || _isZhuangPartnerWrong || !_isZhuangPartnerPut
        || tData.tState == TableState.isReady || tData.tState == TableState.roundFinish || tData.tState == TableState.waitJiazhu ){
        return
    }

    if(!eD ){ //(tData.lastPutPlayer > 0 && (tData.lastPutPlayer ==  tData.zhuangPartner) )
        if(tData.lastPutPlayer == tData.zhuang){
            _isZhuangPut = true;
        }

        if(tData.uids[tData.zhuang] == SelfUid() && _isZhuangPut){
            return ;
        }

        if( tData.uids[tData.zhuangPartner] == tData.uids[tData.lastPutPlayer]) {

            MjClient.playui.addChickenCardIcon(getUiOffByUid(tData.uids[tData.lastPutPlayer]));
        }else{
            if(SelfUid() == tData.uids[tData.zhuangPartner] ){
                MjClient.playui.addChickenCardIcon(0);
            }
        }

        return ;
    }

    var off = getUiOffByUid(tData.uids[tData.lastPutPlayer]) ;
    if(eD){
        off = getUiOffByUid(eD.uid);
        MjClient.playui.addChickenCardIcon(off);
    }
};