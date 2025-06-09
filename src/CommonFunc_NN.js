
/* ======================================
 *  牛牛放一些共用的方法,末尾都以NN 结束
 *  ====================================== */

MjClient.selectCards_NN = [];


//设置牌的渲染
function setCardSprite_NN(node, cd, off)
{
    //东南西北中发白
    var imgNames = ["Bamboo_", "Character_", "Dot_", "Wind_east", "Wind_south", "Wind_west", "Wind_north", "Red", "Green", "White"];
    var offSets = [[50, 90], [60, 70], [50, 90], [60, 70], [48, 62]]

    //麻将的底牌公用图，4张
    node.loadTexture(getNewMJBgFile("playing/MJ/Mj_up_" + off + ".png"));
    //
    // if (off != 0 && off != 1 && off != 2 && off != 3 && off != 4) {
    // 	cc.log("off = " + off);
    // }

    var imgNode = new ccui.ImageView();
    if(off == 4)
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

    imgNode.setPosition(offSets[off][0], offSets[off][1]);
    imgNode.setName("imgNode");
    node.removeAllChildren();
    node.addChild(imgNode);

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
    var callback = function()
    {
        //加载小图
        imgNode.loadTexture(getNewMJBgFile(path + imgName + ".png"));
    };

    node.stopAllActions();
    node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callback), cc.delayTime(1))));


}

////重新设置加注数
//function resetJiaZhuNum_NN(node) {
//    var down = node.getChildByName("down");
//    var top = node.getChildByName("top");
//    var left = node.getChildByName("left");
//    var right = node.getChildByName("right");
//
//
//    MjClient.majiang.setJiaZhuNum(down, getUIPlayer(0));
//    MjClient.majiang.setJiaZhuNum(right, getUIPlayer(1));
//    MjClient.majiang.setJiaZhuNum(top, getUIPlayer(2));
//    MjClient.majiang.setJiaZhuNum(left, getUIPlayer(3));
//}


function getNewCard_NN(node, copy, name, tag, off, specialTAG)
{
	// cc.log("新牌"+off);
    cc.log("---------- copy = " + copy);
	var cpnode = node.getChildByName(copy);
	var cp = cpnode.clone(); //克隆一个白板，上面没有任何条纹的麻将 ，by sking
    if (name == "mjhand")
    {
        cp.setScale(cp.getScale()*1.30);
    }
    else
    {
        cp.setScale(cp.getScale()*1.5);
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
        setCardSprite_NN(cp, tag, name == "mjhand" ? 4 : off);
		if(name == "mjhand" || name == "mjting")
		{
            SetTouchCardHandler_NN(cpnode, cp);
		}
	}
	return cp;
}

//设置回调，并处理回调
function SetTouchCardHandler_NN(standUI, cardui)
{
	cardui.addTouchEventListener(function(btn, tp)
	{
        var tData = MjClient.data.sData.tData;
        //if(tData.tState != TableState.waitPut)
        //{
        //    return;
        //}
        var pl = getUIPlayer(0);

        if(tp === ccui.Widget.TOUCH_ENDED || tp === ccui.Widget.TOUCH_CANCELED)
        {
            if(pl.mjState == TableState.roundFinish)//已经完成
            {
                return;
            }

            playEffectInPlay("clickCard");

            var pos = btn.getPosition();
            var dy = pos.y - standUI.y;
            cc.log("==========touchend = " + dy);
            if(dy < 10)
            {
                if(MjClient.selectCards_NN.length >= 3)//最多选择三张牌
                {
                    return;
                }
                btn.y = standUI.y + 20;
                MjClient.selectCards_NN.push(cardui.tag);//添加一张牌

            }else{
                btn.y = standUI.y;
                var index = MjClient.selectCards_NN.indexOf(cardui.tag);//把这张牌从数组删除
                MjClient.selectCards_NN.splice(index,1);
            }

            UpdataCurrentNiuShow_NN();
        }
	}, cardui);
}

//转盘显示状态
//function IsArrowVisible_NN()
//{
//	var pl = getUIPlayer(0);
//	if(
//		TableState.waitPut == pl.mjState ||
//		TableState.waitEat == pl.mjState ||
//		TableState.waitCard == pl.mjState ||
//		TableState.roundFinish == pl.mjState
//	)
//	{
//		return true;
//	}
//	else
//	{
//		return false;
//	}
//}

// 清理ui
function clearCardUI_NN(node)
{
	mylog("clearCardUI");

    MjClient.selectCards_NN = [];
	var children = node.children;
	for(var i = 0; i < children.length; i++)
	{
		var ni = children[i];
		cc.log("ni.name SKING==== SKING  == "+ ni.name);
		if(ni.name != "head"
			&& ni.name != "up"
			&& ni.name != "stand"
			&& ni.name != "ready"
			&& ni.name != "play_tip_NN"
            && ni.name != "BtnHaveNiu"
            && ni.name != "BtnNoNiu"
        )
		{
			ni.removeFromParent(true);
		}
		else if(ni.getName() == "play_tip_NN")
		{
            ni.visible = false;
            for(var j = 0; j < ni.children.length; j++)
            {
                ni.children[j].visible = false;
            }
		}
	}
}

function DealWithMJPinNiu(handCards) {
    var _downNode  = MjClient.playui._downNode;
    var _btnHaveNiu = _downNode.getChildByName("BtnHaveNiu");
    _btnHaveNiu.visible = false;
    var _BtnNoNiu = _downNode.getChildByName("BtnNoNiu");
    _BtnNoNiu.visible = false;


    var standUI = _downNode.getChildByName("stand");
    var children = _downNode.children;
    for(var i = 0; i < children.length; i++)
    {
        if(children[i].name == "mjhand")
        {
            children[i].y = standUI.y;
        }
    }

    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJPinniu",
        selectedCards: handCards,
    });
}


//重置4家头像位置
function reConectHeadLayout_NN(node)
{
    var tData = MjClient.data.sData.tData;
    var down = node.getChildByName("down").getChildByName("head");
    var top = node.getChildByName("top").getChildByName("head");
    var left = node.getChildByName("left").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");

    if(tData.tState == TableState.waitJoin || tData.tState == TableState.waitJiazhu)
    {
        setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [0, -2], false, false);
        setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [0, 2.0], false, false);
        setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-4.8, 0.1], false, false);
        setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [4.8, 0.1], false, false);
        initFlower(false, false);
    }
    else
    {
        setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 1.5], false, false);
        setWgtLayout(top, [0.13, 0.13], [0, 1], [2.8, -0.65], false, false);
        setWgtLayout(left, [0.13, 0.13], [0, 0.5], [0.6, 0.5], false, false);
        setWgtLayout(right, [0.13, 0.13], [1, 0.5], [-0.6, 0.5], false, false);
        //resetFlowerNum(node);
        if (tData.tState != TableState.roundFinish)
        {
            resetJiaZhuNum(node);
        }
    }
}



// 向服务器发送过牌
function MJPassConfirmToServer_NN()
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    cc.log("====================MJPassConfirmToServer  3333 =================");
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJPass"
    });
}

/*
    每次更新选牌显示
 */
function UpdataCurrentNiuShow_NN()
 {

    var isum = 0;
    var _eatNode   = MjClient.playui._AniNode;
    var _downNode  = MjClient.playui._downNode;
    var _scoreBg = _eatNode.getChildByName("scoreBg");
    //_scoreBg.visible = true;

     //加载plist图
     cc.spriteFrameCache.addSpriteFrames("niuniu/plist_2.plist","niuniu/plist_2.png");


    var pl = getUIPlayer(0);
    if(pl.mjState == TableState.roundFinish)//已经完成状态
    {
        //_scoreBg.visible = false;
        return;
    }

    for(var i = 0;i < 3;i++)
    {
        var _node = _scoreBg.getChildByName("Text_" + i);
        if(i < MjClient.selectCards_NN.length)
        {
            isum  +=  MjClient.majiang.cardValue(MjClient.selectCards_NN[i]);
            cc.log("MjClient.majiang = "+ JSON.stringify(MjClient.majiang));
            cc.log(".majiang = "+ MjClient.majiang);
            var _value = MjClient.selectCards_NN[i];
            var showValue = MjClient.majiang.cardValue(_value);
            _node.setString(showValue);
            _node.visible = true;
        }
        else
        {
            _node.visible = false;
        }
    }

    var _btnHaveNiu = _downNode.getChildByName("BtnHaveNiu");
    _btnHaveNiu.visible = true;
    var _BtnNoNiu = _downNode.getChildByName("BtnNoNiu");
    _BtnNoNiu.visible = true;

    //显示总分和几牛
    var _nodeSum = _scoreBg.getChildByName("Text_3");
    var _nodeIcon = _scoreBg.getChildByName("Image_niu");
    if(MjClient.selectCards_NN.length == 3)
    {
        _nodeSum.visible = true;
        _nodeIcon.visible = true;

        _nodeSum.setString(isum);
        var pl = getUIPlayer(0);//手牌
        var handScore = MjClient.majiang.calHandScore(pl.mjhand,MjClient.selectCards_NN)
        var _niuCount = MjClient.majiang.handPoint(handScore);
        _nodeIcon.loadTexture("lbl_cow_" + _niuCount + ".png",ccui.Widget.PLIST_TEXTURE);

        if(_niuCount <= 0)
        {
            _btnHaveNiu.setBright(false);
            _btnHaveNiu.setTouchEnabled(false);
            //无牛
        }else{
            _btnHaveNiu.setBright(true);
            _btnHaveNiu.setTouchEnabled(true);
        }
    }else{
        _nodeSum.visible = false;
        _nodeIcon.visible = false;
        _btnHaveNiu.setBright(false);
        _btnHaveNiu.setTouchEnabled(false);
    }

}



/*
 显示牛几的icon 和对应的倍数
 @;head 为 down ,left ,right ,top 节点
 */
function showNiuCount_NN(off)
{
    var offNode;
    var pl = getUIPlayer(off);
    switch (off)
    {
        case 0:
            offNode = MjClient.playui._downNode;
            break;
        case 1:
            offNode = MjClient.playui._rightNode;
            break;
        case 2:
            offNode = MjClient.playui._topNode;
            break;
        case 3:
            offNode = MjClient.playui._leftNode;
            break;
    }
    var play_tips = offNode.getChildByName("play_tip_NN");
    if(!pl) {
        play_tips.visible = false;
        return;
    }

    var NiuCount = MjClient.majiang.handPoint(pl.handScore);

    play_tips.visible = true;
    var niuFinishedNode = play_tips.getChildByName("finished");
    niuFinishedNode.visible = false;
    var niuIconNode = play_tips.getChildByName("niuIcon");
    niuIconNode.visible = true;


    var niuBeiNode = niuIconNode.getChildByName("niuBei");
    niuIconNode.loadTexture("lbl_cow_" + NiuCount + ".png",ccui.Widget.PLIST_TEXTURE);
    niuIconNode.ignoreContentAdaptWithSize(true);
    var _Multiple =  MjClient.majiang.calRate(pl.handScore);
    niuBeiNode.loadTexture("lbl_x" + _Multiple + ".png",ccui.Widget.PLIST_TEXTURE);
    if(NiuCount == 12)//五小牛
    {
        niuBeiNode.x   =  97.5 + 38;
    }else{
        niuBeiNode.x   = 97.5;
    }


    niuBeiNode.ignoreContentAdaptWithSize(true);
    if(NiuCount == 0)
    {
        niuBeiNode.visible = false;//无牛
        niuIconNode.setPosition(niuFinishedNode.getPosition());
    }
    else
    {
        niuBeiNode.visible = true;
        niuIconNode.setPosition(40.3, 31.33);
    }

    var oldScale = niuIconNode.getScale();
    niuIconNode.setScale(0);
    niuIconNode.runAction(cc.scaleTo(0.5, oldScale).easing(cc.easeBackOut()));

    playEffectInPlay(NiuCount);
}


function showNiuFinished(play_tips,pl,touchShow)
{
    if(!pl)
    {
        play_tips.visible = false;
        return;
    }
    play_tips.visible = true;
    var niuFinishedNode = play_tips.getChildByName("finished");
    var niuIconNode = play_tips.getChildByName("niuIcon");

    cc.log("============tData.tState =  "  + pl.mjState);
    if(pl.mjState == TableState.roundFinish || touchShow)//已经完成
    {
        cc.log("============tData.tState" );
        niuFinishedNode.visible = true;
        niuIconNode.visible = false;
    }
    else{
        play_tips.visible = false;
    }
}

function randomArrowAction(node,ZhangIdx, callback)
{
    node.setRotation(-90);

    var tData = MjClient.data.sData.tData;
    var uids = tData.uids;
    var selfIndex = uids.indexOf(SelfUid());
    selfIndex = (ZhangIdx + 4 - selfIndex) % 4;

    cc.log("******zhuang  = "+selfIndex);

    var round = 5*4;
    var step = selfIndex;
    step = step < 2 ? step+4 : step;

    var setRotationFunc = cc.callFunc(function () {
        node.setRotation(node.getRotation()-90);
    });

    var callbackFunc = cc.callFunc(function() {
        node.visible = false;
        if (callback)
            callback();
    });

    var seqAction = [];
    for (var i=0; i<round; i++)
    {
        seqAction.push(cc.delayTime(0.1));
        seqAction.push(setRotationFunc);
    }
    for (var i=0; i<step; i++)
    {
        seqAction.push(cc.delayTime(0.1+step*0.1));
        seqAction.push(setRotationFunc);
    }
    seqAction.push(cc.delayTime(1));
    seqAction.push(callbackFunc);
    node.runAction(cc.sequence(seqAction));

}

function showUserZhuangLogo_NN(ZhangIdx)
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

function arrowbkNumberUpdate_NN(node, endFunc)
{
    node.setString("10");
    var number = function()
    {
        if(node.getString() == 0)
        {
            GLog("==================================================arrowbkNumberUpdate 3333 ======================");
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
                    playTimeUpEff = playEffect("loop_alarm", true);
                    MjClient.native.NativeVibrato();
                }
            }
        }
    };

    node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1.0), cc.callFunc(number, node))));
}

function tableStartHeadMoveAction_NN(node)
{
    cc.log("-----------------set head position ------");
    var down = node.getChildByName("down").getChildByName("head");
    var top = node.getChildByName("top").getChildByName("head");
    var left = node.getChildByName("left").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");
    setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 1.5], false, false);
    setWgtLayout(top, [0.13, 0.13], [0, 1], [2.8, -0.65], false, false);
    setWgtLayout(left, [0.13, 0.13], [0, 0.5], [0.6, 0.5], false, false);
    setWgtLayout(right, [0.13, 0.13], [1, 0.5], [-0.6, 0.5], false, false);

    var downPoint = cc.p(down.x, down.y);
    var topPoint = cc.p(top.x, top.y);
    var rightPoint = cc.p(right.x, right.y);
    var leftPoint = cc.p(left.x, left.y);

    setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [0, -2], false, false);
    setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [0, 2.1], false, false);
    setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-3, 0.1], false, false);
    setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [3, 0.1], false, false);
    down.runAction(cc.moveTo(0.3, downPoint).easing(cc.easeCubicActionOut()));
    top.runAction(cc.moveTo(0.3, topPoint).easing(cc.easeCubicActionOut()));
    left.runAction(cc.moveTo(0.3, leftPoint).easing(cc.easeCubicActionOut()));
    right.runAction(cc.moveTo(0.3, rightPoint).easing(cc.easeCubicActionOut()));

    sendGPS();
    MjClient.checkChangeLocationApp();
}