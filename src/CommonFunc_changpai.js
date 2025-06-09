
/* ======================================
 *  放一些共用的方法
 *  ====================================== */

MjClient.MaxPlayerNum_changPai = 3;
MjClient.ruGao_autoSort = true; //自动理牌还是手动理牌
MjClient.ruGao_Sort = false; //是否是理牌状态
var currentCardArray = []; //当前理牌的数组
//初始化玩家金币和名字
function InitUserCoinAndName_changpai(node, off)
{
    var pl = getUIPlayer_changpai(off);
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
                            _visible: true,
                            _run: function()
                            {
                                var coin = tData.initCoin;
                                if(this.getDescription() === "Label"){
                                    this.ignoreContentAdaptWithSize(true);
                                    this.setString(Number(coin + pl.winall) + "");
                                }else{
                                    changeAtalsForLabel(this, coin + pl.winall);
                                }
                            }
                        }
                }
        }

    //add by sking
    var name = node.getChildByName("head").getChildByName("name");
    name.ignoreContentAdaptWithSize(true);

    BindUiAndLogic(node, bind);
}

//显示玩家信息
function showPlayerInfo_changpai(off, node)
{
    //var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer_changpai(off);
    if(pl)
    {
        cc.log("pl data == " + JSON.stringify(pl));
        // if (pl.info.uid == SelfUid())
        // {
        //     MjClient.showPlayerInfo(pl.info, true);
        // }
        // else
        // {
        //     MjClient.showPlayerInfoPlaying(pl.info);
        // }
        MjClient.showPlayerInfoPlaying(pl.info);
    }
}


function getPlayerIndex_changpai(off)
{
    if (MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_ER ||
        MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
    {
        if(2 === off) return null;
        if(3 === off) return null;
    }
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    // cc.log("-----------------MjClient.MaxPlayerNum = " + MjClient.MaxPlayerNum);
    return (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_changPai;
}

// 通过off偏移值来获取Pl对象
function getUIPlayer_changpai(off)
{
    if(MjClient.MaxPlayerNum_changPai == 2)
    {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var uids = tData.uids;
        var index = getPlayerIndex_changpai(off);
        if(index < uids.length)
        {
            return sData.players[uids[index]];
        }

        return null;
    }



    var sData = MjClient.data.sData;
	var tData = sData.tData;
	var uids = tData.uids;

	var selfIndex = uids.indexOf(SelfUid());
	selfIndex = (selfIndex + off) % MjClient.MaxPlayerNum_changPai;

	if(selfIndex < uids.length)
	{
		return sData.players[uids[selfIndex]];
	}

	return null;
}

//位置设置
function setArrowFengDir_changpai(arrowbkNode) {
    var tData = MjClient.data.sData.tData;
    var uids = tData.uids;
    var selfIndex = uids.indexOf(SelfUid());

    // cc.log("这是我的selfIndex" + selfIndex);

    var winRight = arrowbkNode.getChildByName("dir_right");
    var winDown = arrowbkNode.getChildByName("dir_down");
    var winLeft = arrowbkNode.getChildByName("dir_left");
    var winUp = arrowbkNode.getChildByName("dir_up");

    var winobjArr = [winDown, winRight, winUp, winLeft];

    var temp = 0;
    for (var i = selfIndex; i < selfIndex + 4; i++)
    {
        var index = i % 4;
        if(winobjArr[temp])
        {
            winobjArr[temp].loadTexture("playing/gameTable/dir_normal_" + index + ".png");
            temp++;
        }
    }
}

//设置中间轮盘转动
function SetArrowRotation_changpai(arrowbkNode)
{
    var tData = MjClient.data.sData.tData;
    var uids = tData.uids;
    var selfIndex = uids.indexOf(SelfUid());



    selfIndex = (tData.curPlayer + MjClient.MaxPlayerNum_changPai - selfIndex) % MjClient.MaxPlayerNum_changPai;
    // var arrow = arrowbkNode.getChildByName("arrow");


    // //只有3个人
    // cc.log("===================方向位置 selfIndex ： " + selfIndex);
    // //cc.log("===================方向位置 ： " + getUiOffByUid(uids[selfIndex]));
    // //var idx = getUiOffByUid_changpai(uids[selfIndex]);

    // var setIdx = selfIndex;
    // if(selfIndex == 2)
    // {
    //     setIdx += 1;
    // }
    // arrow.rotation = 270 - 90 * setIdx;

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
    // cc.log("== selfIndex == 2222222222 "+selfIndex);
    // cc.log(" == arrow_2 == 22222222222" +　arrow_2)
    if(selfIndex == 2)
    {
        selfIndex += 1;
    }
    switch(selfIndex){
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


}


// 获取ui头像，通过偏移值
function getUIHeadByOff_changpai(off)
{
    var pl = getUIPlayer_changpai(off);
    if(!pl)
    {
        return {};
    }

    return {
        uid: pl.info.uid,
        url: pl.info.headimgurl
    };
}


//设置微信头像
function setWxHead_changpai(node, d, off)
{
    if(off >= 3)
    {
        return;
    }

    if(d.uid == getUIHeadByOff_changpai(off).uid)
    {
        var sp = new cc.Sprite(d.img);
        sp.setName("WxHead");
        var nobody = node.getChildByName("nobody");
        nobody.addChild(sp);
        setWgtLayout(sp, [1.0, 1.0], [0.5, 0.5], [0, 0], false, true);
        COMMON_UI.addNobleHeadFrame(nobody,getUIPlayer_changpai(off))
    }
}

//显示玩家庄的ui
function showUserZhuangLogo_changpai(node, off)
{
    var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer_changpai(off);
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

//显示房主
function showFangzhuTagIcon_changpai(node,off)
{
    var pl = getUIPlayer_changpai(off);
    if(!pl) //位置上没人则删掉房主标签
    {
        if(node.getChildByName("fangTag"))
        {
            node.removeChildByName("fangTag");
        }
        return;
    }

    var file = "playing/gameTable/fangzhu3.png";

    var tData = MjClient.data.sData.tData;
    if (tData.owner == pl.info.uid)
    {
        if(!node.getChildByName("fangTag"))
        {
            var sp = new cc.Sprite(file);
            sp.setPosition(node.getContentSize().width, 10);
            sp.setAnchorPoint(1,0);
            sp.setName("fangTag");
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

// 通过uid来获取该uid在off的位置(0,1,2,3)
function getUiOffByUid_changpai(uid)
{
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var uids = tData.uids;
	var selfIndex = uids.indexOf(SelfUid());
	var targetIndex = uids.indexOf(uid);
	return (targetIndex - selfIndex + MjClient.MaxPlayerNum_changPai) % MjClient.MaxPlayerNum_changPai;
}

function IsArrowVisible_changpai()
{
    var pl = getUIPlayer_changpai(0);
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


function clearCurrentPutTag_changpai()
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    for(var off = 0;off < MjClient.MaxPlayerNum_changPai ;off++)
    {
        var _node = getNode_changpai(off);
        var children = _node.children;
        for(var i = 0; i < children.length; i++)
        {
            //cc.log("oooooooooooooochildren name = " + children[i].name);
            if(children[i].name === "out" || children[i].name === "newout" || children[i].name === "outout")
            {
                var _child = children[i].getChildByName("cardShow");
                if(_child)
                {
                    //cc.log("00000000000000cardShow = ");
                    children[i].removeChildByName("cardShow");
                }
            }
        }
    }
}

function addCurrentPutTag_changpai(cardNode, off)
{
    var offSets = [[50, 135], [60, 105], [50, 135], [60, 105], [48, 93]];
    var _showSprite = cardNode.getChildByName("cardShow");
    if (_showSprite)
        _showSprite.removeFromParent();

    _showSprite = new ccui.ImageView("playing/other/sign.png");
    _showSprite.setPosition(offSets[off][0], offSets[off][1]);
    _showSprite.setScale(1.3);
    var a1 = cc.moveBy(0.5,0,50).easing(cc.easeCubicActionOut());
    var a2 = cc.moveBy(0.5,0,-50).easing(cc.easeCubicActionIn());
    var seq = cc.sequence(a1,a2);
    _showSprite.runAction(seq.repeatForever());
    _showSprite.setName("cardShow");
    cardNode.addChild(_showSprite,20);
}


function setCardSprite_CP(node, cd)
{
    if(!cd) return;

    var imgNames;
    var imgNames_normal = ["Bamboo_", "Character_", "Dot_", "other_", "flower_"];
    var imgNames_old = ["Bamboo_old_", "Character_old_", "Dot_old_", "other_", "flower_"];

    if(!MjClient.playui._BtnCardType.bSimple)
    {
        //cc.log("---------------------------------setCardSprite_CP ---cd = " + cd );
        imgNames = imgNames_old;
    }
    else
    {
        imgNames = imgNames_normal;
    };
    node.removeAllChildren();

    // 贴在麻将上面可变的图
    var path = "playing/ChangPai/";
    if (getCurrentCPBgType && getCurrentCPBgType() == 1) {
        path = "playing/ChangPai/CP_IMG_2/";
    }
    var imgName = "";
    if(cd < 30)
    {
        //条，筒，万
        imgName = imgNames[Math.floor(cd / 10)] + cd % 10;
    }
    else if (cd == 71 || cd == 81 || cd == 91)
    {
        // 红花，千字，百花
        imgName = imgNames[3] + cd;
    }
    else if (cd == 111 || cd == 121 ||cd == 131 ||cd == 141 ||cd == 151 ){
        // 福、禄、寿、喜、财
        imgName = imgNames[4] + cd;
    }
    else
    {
        cc.log("====error set card sprite======= cd = " + cd);

        // return MjClient.showToast("====error set card sprite======= cd = " + cd );
    }

    node.tag = cd;
    node.loadTexture(path + imgName + ".png");

    schedulePlayMoveCardOtherSameCardGrey(node)
}

function setCardSprite_MJ(node, cd,off)
{


    //东南西北中发白
    var imgNames = ["Bamboo_", "Character_", "Dot_", "Wind_east", "Wind_south", "Wind_west", "Wind_north", "Red", "Green", "White"];
    var offSets = [[51, 92], [60, 70], [51, 92], [60, 70], [52, 68]];
    /*
    var offSets = [];
    if (getCurrentMJBgType() == 0)
        offSets = [[50, 90], [60, 70], [50, 90], [60, 70], [48, 62]];
    else
        offSets = [[52, 100], [60, 70], [52, 100], [60, 70], [50, 66]];
    */

    var offHunSet = [[50 + 10, 90 + 17], [52, 70], [50 - 10, 84], [60 + 14, 68], [48 + 13, 62 + 16]];

    var imgNode = new ccui.ImageView();

    var angleIdx = 0;
    if(off === 2)
    {
        angleIdx = 3;
    }
    else
    {
        angleIdx = off;
    }
    //麻将的底牌公用图，4张
    node.loadTexture(getNewMJBgFile("playing/MJ/Mj_up_" + angleIdx + ".png"));

    if(angleIdx == 4)
    {

    }
    else
    {
        imgNode.setRotation(-90 * (angleIdx));
    }

    imgNode.setPosition(offSets[angleIdx][0], offSets[angleIdx][1]);
    imgNode.setName("imgNode");
    node.removeAllChildren();
    node.addChild(imgNode,10);


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


    //加载小图
    imgNode.loadTexture(getNewMJBgFile(path + imgName + ".png"));

    // 左右两侧的牌偏大，特殊处理，缩小
	// if (getCurrentMJBgType() != 0) {
    	if (angleIdx == 1 || angleIdx == 3)
    	{
        	imgNode.setScale(0.8);
    	}
	// }

    schedulePlayMoveCardOtherSameCardGrey(node)
}


//设置牌的渲染
function setCardSprite_changpai(node, cd,off)
{
     if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH || MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
     {
         setCardSprite_MJ(node, cd,off);
     }
     else if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO ||
         MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_ER ||
         MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG ||
         MjClient.gameType === MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG ||
         MjClient.gameType === MjClient.GAME_TYPE.BAI_PU_LIN_ZI)
     {
         setCardSprite_CP(node, cd);
     }
}



function CurrentPutCardMsg_changpai()
{
    var msg = - 1;
    var downNode = MjClient.playui._downNode;
    var standUI = downNode.getChildByName("stand");

    var stand = downNode.getChildByName("stand");
    var stand_0 = downNode.getChildByName("stand_0");

    var children = downNode.children;
    for(var i = 0; i < children.length; i++)
    {
        if(children[i].name == "mjhand")
        {

            var dy1 = Math.round(children[i].y - stand.y);  //上面这排
            var dy0 = Math.round(children[i].y - stand_0.y);  //下面这排

            if(dy0 === 20)
            {

                msg = children[i].tag;
                break;
            }
            else if(dy1  == 20)
            {
                msg = children[i].tag;
                break;
            }
            // if(children[i].y > standUI.y + 10)
            // {
            //     msg = children[i].tag;
            //     break;
            // }
        }
    }
    if(msg == -1)
    {
        cc.log(" 没有找到当前的牌")
    }
    return msg;
}



function setStandUIY(handCardNode)//idx 0 表示第一排的，1表示第二排的,即靠下面的一行
{
    var _downNode = getNode_changpai(0);
    var stand = _downNode.getChildByName("stand");
    var stand_0 = _downNode.getChildByName("stand_0");

    if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH || MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
    {

        var dy1 = Math.round(handCardNode.y - stand.y);  //上面这排
        //cc.log("============dy1dy1dy1 =  " + dy1);

        var dy0 = Math.round(handCardNode.y - stand_0.y);  //下面这排
        //cc.log("============dy0dy0dy0dy0 =  " + dy0);

            if(dy0 === 0 || dy0 == 20)
            {
                handCardNode.y = stand_0.y;
            }
            else if(dy1 === 0 ||dy1 == 20)
            {
                handCardNode.y = stand.y;
            }
    }
}




function getStandUIYByCardY(cardY)//idx 0 表示第一排的，1表示第二排的,即靠下面的一行
{
    var _downNode = getNode_changpai(0);
    var stand = _downNode.getChildByName("stand");
    var stand_0 = _downNode.getChildByName("stand_0");
    var myStandY = 0;
    cc.log("====================1111111100000000000 ");

    var dy1 = Math.round(cardY - stand.y);  //上面这排
    cc.log("============dy1dy1dy1 =  " + dy1);


    var dy0 = Math.round(cardY - stand_0.y);  //下面这排
    cc.log("============dy0dy0dy0dy0 =  " + dy0);



    if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH || MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
    {

        if(dy0 === 0 ||dy0 == 20)
        {
            myStandY = stand_0.y;
        }
        else if(dy1 === 0 || dy1 == 20)
        {
            myStandY = stand.y;
        }

        return myStandY;
    }

}



var cardBeginColor = null;
var _lastMoveTime = 0;
function SetTouchCardHandler_changpai(standUI, cardui)
{
    cardui.addTouchEventListener(function(btn, tp)
    {


        /*
         放在前面，不是自己回合，或者听牌之后，不让拖动麻将
         */
        var tData = MjClient.data.sData.tData;

        //cc.log("addTouchEventListener==================began===============");

        if((!IsTurnToMe()|| tData.tState != TableState.waitPut )&& !MjClient.ruGao_Sort) return;

        //cc.log("================cp==========111111111111111111111111111111111 =");
        var pl = getUIPlayer_changpai(0);
        if(pl.isTing)
        {
            //return;
        }

        if (MjClient.clickTing && !MjClient.canTingCards[cardui.tag])
        {
            return;
        }


        if(MjClient.playui._canJiaBei && !tData.allSelect){
            return;
        }


        ///cc.log("================cp==========2222222222222222222222 =MjClient.movingCard = " + MjClient.movingCard);
        // if(tp == ccui.Widget.TOUCH_BEGAN) MjClient.movingCard = null;

        if (MjClient.movingCard !== null && MjClient.movingCard !== btn)
        {
            return;
        }


        //cc.log("================cp==========333333333333333333333333333333 =");

        /*
            洛龙的手牌，不让点击
         */
        if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO ||
            MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_ER ||
            MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG ||
            MjClient.gameType === MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG ||
            MjClient.gameType === MjClient.GAME_TYPE.BAI_PU_LIN_ZI)
        {
            if(pl.long && pl.long.indexOf(btn.tag) >= 0 )
            {
                //ci.setColor(cc.color(255,128,0));
                return;
            }
        }


        //有花不让出牌
        //if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO)
        {
            var children = btn.getParent().children;
            for(var i = 0; i < children.length; i++) {
                if (children[i].name == "mjhand") {
                    if (MjClient.majiang.isCardFlower(children[i].tag)) {
                        MjClient.movingCard = null;
                        return;
                    }
                }
            }
            var pl = getUIPlayer_changpai(0);
            if (MjClient.majiang.isCardFlower(pl.newCd)) return;

            for(var i = 0; i < pl.mjhand.length;i++)
            {
                if (MjClient.majiang.isCardFlower(pl.mjhand[i])) {
                    MjClient.movingCard = null;
                    return;
                }
            }
        }


        if(tp == ccui.Widget.TOUCH_BEGAN)
        {

            var _currentTime = new Date().getTime();
            if((_currentTime - _lastMoveTime) < 500)
            {
                return;
            }
            else
            {
                _lastMoveTime =  new Date().getTime();
            }


            cc.log("tp == ccui.Widget.TOUCH_BEGAN");
            MjClient.movingCard = btn;
            cardBeginPos = btn.getPosition();
            cardBeginScale = btn.getScale();
            cardBeginZIndex = btn.zIndex;
            cardBeginColor = btn.getColor();

            // btn.setColor(cc.color(170,170,170)); // 去掉点击颜色
            if(!MjClient.ruGao_Sort)
            {
                var children = btn.getParent().children;
                for(var i = 0; i < children.length; i++)
                {
                    if(children[i].name == "mjhand" && children[i] !== btn)
                    {
                        if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH || MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
                        {
                            setStandUIY(children[i]);
                        }
                        else
                        {
                            children[i].y = standUI.y;
                        }
                    }
                }
            }


            /*
             设置当前可听的牌数
             */
            if(MjClient.clickTing ||
                MjClient.gameType === MjClient.GAME_TYPE.NAN_JING ||
                MjClient.gameType === MjClient.GAME_TYPE.HA_14DUN ||
                MjClient.gameType === MjClient.GAME_TYPE.RU_GAO ||
                MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_ER ||
                MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG ||
                MjClient.gameType === MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG ||
                MjClient.gameType === MjClient.GAME_TYPE.BAI_PU_LIN_ZI ||
                MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH ||
                MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG ||
                MjClient.gameType === MjClient.GAME_TYPE.HA_HONGZHONG
            )
            {
                //cc.log("tp == tingCards pl= " + JSON.stringify(pl));
                var tingCards = getCheckTingHuCards(cardui.tag,pl.mjhand);
                // cc.log("tp == tingCards = " + JSON.stringify(tingCards));
                setCurrentTingNum_changpai(tingCards);
            }
        }
        else if(tp == ccui.Widget.TOUCH_MOVED)
        {



            if (MjClient.movingCard == null)
            {
                return;
            }

            var pos = btn.getTouchMovePosition();



            if(cc.pDistance(cardBeginPos, pos) > 15)
            {
                if (pos.x < 0) pos.x = 0;
                if (pos.x > MjClient.size.width) pos.x = MjClient.size.width;
                if (pos.y < 0) pos.y = 0;
                if (pos.y > MjClient.size.height) pos.y = MjClient.size.height;
                btn.setPosition(pos);

                btn.zIndex  = 500;
                btn.scale = cardBeginScale*1.2;
            }
            else
            {
                MjClient.movingCard == null;
                return;
            }

        }
        else if(tp === ccui.Widget.TOUCH_ENDED || tp === ccui.Widget.TOUCH_CANCELED)
        {
            if (MjClient.movingCard == null)
            {
                return;
            }

            btn.zIndex  = cardBeginZIndex;
            btn.scale = cardBeginScale;
            btn.setColor(cardBeginColor);
            var pos = btn.getPosition();

            var _standUIy = standUI.y;
            if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH || MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
            {
                _standUIy = getStandUIYByCardY(cardBeginPos.y);
            }

            var dy = Math.round(pos.y - _standUIy);

            if(MjClient.ruGao_Sort)
            {
                //cc.log("------------------------------------------pl tState = " + pl.mjState);
                //cc.log("------------------------------------------tData.tState = " + tData.tState);
                if(IsTurnToMe() && tData.tState != TableState.waitEat) //拖到大于这个高度才能 打出去
                {
                    cc.log("-----------PutOutCard_changpai----------------IsTurnToMe");
                    if(pos.y > MjClient.size.height/3 )
                    {
                        PutOutCard_changpai(cardui, cardui.tag);
                    }
                    else
                    {
                        //回到原处
                        var endPos = btn.getPosition();
                        btn.setPosition(cardBeginPos);
                        btn.setScale(cardBeginScale);
                        btn.zIndex = cardBeginZIndex;
                        MjClient.movingCard = null;

                    }
                }
                else
                {
                    cc.log("-----------PutOutCard_changpai----------------手动理牌");
                    //手动理牌
                    var endPos = btn.getPosition();
                    btn.setPosition(cardBeginPos);
                    btn.setScale(cardBeginScale);
                    btn.zIndex = cardBeginZIndex;
                    MjClient.movingCard = null;

                    if(pl.mjState != TableState.waitEat) //有吃 ，碰，杠的状态时 不让手动理牌
                    {
                        resetCardSort(endPos,btn.tag);
                    }
                }
                return;
            }

            if(dy < 20)
            {
                MjClient.movingCard = null;
                btn.setPosition(cardBeginPos);
                btn.y = _standUIy + 20;
            }
            else
            {
                cc.log("-----------PutOutCard_changpai-----------------out----2222 cardui.tag = " + cardui.tag);

                PutOutCard_changpai(cardui, cardui.tag);
            }
        }
    }, cardui);
}


function getTouchListener_changPai()
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
                        if ((MjClient.clickTing && MjClient.canTingCards[_childrens[i].tag])
                            || (!MjClient.clickTing ))
                        {

                            _childrens[i].y = _standui.y + 20;
                            MjClient.selectedCard = _childrens[i];
                            found = true;
                            if (movedCard.indexOf(_childrens[i]) < 0)
                            {
                                movedCard.push(_childrens[i]);
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
            MjClient.selectedCard = null;
            // if(!IsTurnToMe() || tData.tState != TableState.waitPut)
            // {
            //     for(var i = 0; i < _childrens.length; i++)
            //     {
            //         if(_childrens[i].name == "mjhand")
            //         {
            //             _childrens[i].y = _standui.y;
            //             MjClient.selectedCard = null;
            //         }
            //     }
            // }

        }
    };
}





// 重置吃碰杠胡动作
function resetEatActionAnim_changpai()
{
    var jsBind = MjClient.playui.jsBind;
    var ui = [jsBind.down,jsBind.right,jsBind.top];
    for(var i = 0; i < MjClient.MaxPlayerNum_changPai; i++)
    {
        InitShowEatActionNode(ui[i]._node);
    }
}
/*
    准备阶段的头像位置
 */
function InitHeadPostionReady_changpai(node) {

    var down = node.getChildByName("down").getChildByName("head");
    var top = node.getChildByName("top").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");

    setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [0, -2], false, false);
    setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [-3, 0.1], false, false);
    setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [3, 0.1], false, false);

    if(isIPhoneX())
    {
        setWgtLayout(top, [0.13, 0.13], [0.5, 0.5], [0, 1.7], false, false);
    }
}
//开始游戏后的头像位置
function InitHeadPostionPlaying_changpai(node) {
    var down = node.getChildByName("down").getChildByName("head");
    var top = node.getChildByName("top").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");

    if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO)
    {
        setWgtLayout(down, [0.12, 0.12], [0, 0], [0.6, 3.8], false, false);
        setWgtLayout(top, [0.12, 0.12], [0, 0.58], [0.5, 2.45], false, false);
        setWgtLayout(right, [0.12, 0.12], [0.965, 0.84], [0, 0], false, false);
    }
    else if(MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
    {
        setWgtLayout(down, [0.12, 0.12], [0.05, 0.25], [0, 0], false, false);
        setWgtLayout(top, [0.12, 0.12], [0.05, 0.78], [0, 0], false, false);
        setWgtLayout(right, [0.12, 0.12], [0.95, 0.78], [0, 0], false, false);
    }
    else
    {
        setWgtLayout(down, [0.12, 0.12], [0.04, 0.48], [0, 0], false, false);
        setWgtLayout(top, [0.12, 0.12], [0.04, 0.81], [0, 0], false, false);
        setWgtLayout(right, [0.12, 0.12], [0.96, 0.81], [0, 0], false, false);
    }

    if(isIPhoneX())
    {
        node.getChildByName("top").x = cc.winSize.width*0.09;
        top.y =  cc.winSize.height*0.8;
        top.x = 0;
        setWgtLayout(down, [0.12, 0.12], [0.09, 0.48], [0, 0], false, false);
    }

}

//播放头像移动
function tableStartHeadMoveAction_changpaiER(node)
{
    cc.log("-----------------set head position ------");
    var down = node.getChildByName("down").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");

    setWgtLayout(down, [0.12, 0.12], [0, 0.6], [0.6, 0], false, false);
    setWgtLayout(right, [0.12, 0.12], [0.98, 0.58], [-0.28, 2.25], false, false);
    if(isIPhoneX())
    {
        setWgtLayout(down, [0.12, 0.12], [0.09, 0.6], [0, 0], false, false);
    }
    var downPoint = cc.p(down.x, down.y);
    var rightPoint = cc.p(right.x, right.y);

    setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [0, -2], false, false);
    setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [3, 0.1], false, false);
    down.runAction(cc.moveTo(0.3, downPoint).easing(cc.easeCubicActionOut()));
    right.runAction(cc.moveTo(0.3, rightPoint).easing(cc.easeCubicActionOut()));
    sendGPS();
}


//播放头像移动
function tableStartHeadMoveAction_changpai(node)
{
    if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_ER && MjClient.MaxPlayerNum_changPai === 2)
    {
        return tableStartHeadMoveAction_changpaiER(node);
    }
	cc.log("-----------------set head position ------");
	var down = node.getChildByName("down").getChildByName("head");
	var top = node.getChildByName("top").getChildByName("head");
	var right = node.getChildByName("right").getChildByName("head");

    InitHeadPostionPlaying_changpai(node);

	var downPoint = cc.p(down.x, down.y);
	var topPoint = cc.p(top.x, top.y);
	var rightPoint = cc.p(right.x, right.y);

    InitHeadPostionReady_changpai(node);

    down.runAction(cc.moveTo(0.3, downPoint).easing(cc.easeCubicActionOut()));
    top.runAction(cc.moveTo(0.3, topPoint).easing(cc.easeCubicActionOut()));
    right.runAction(cc.moveTo(0.3, rightPoint).easing(cc.easeCubicActionOut()));

	sendGPS();
}

function resetMaiZhuangNum(node)
{
    var down = node.getChildByName("down");

    var right = node.getChildByName("right");

    MjClient.majiang.setMaiZhuangIcon(down, getUIPlayer_changpai(0));
    MjClient.majiang.setMaiZhuangIcon(right, getUIPlayer_changpai(1));


    if(MjClient.MaxPlayerNum_changPai != 2)
    {
        var top = node.getChildByName("top");
        MjClient.majiang.setMaiZhuangIcon(top, getUIPlayer_changpai(2));
    }


    //MjClient.majiang.setMaiZhuangIcon(left, getUIPlayer(3));
}

function reConectHeadLayout_changpaiER(node)
{
    var tData = MjClient.data.sData.tData;
    var down = node.getChildByName("down").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");
    resetEatActionAnim_changpai();
    if(tData.tState == TableState.waitJoin || tData.tState == TableState.roundFinish)
    {
        setWgtLayout(down, [0.12, 0.12], [0.5, 0.5], [0, -2], false, false);
        setWgtLayout(right, [0.12, 0.12], [0.5, 0.5], [4.8, 0.1], false, false);
    }
    else
    {
        setWgtLayout(down, [0.12, 0.12], [0, 0.6], [0.6, 0], false, false);
        setWgtLayout(right, [0.12, 0.12], [0.98, 0.58], [-0.28, 2.25], false, false);

        if(isIPhoneX())
        {
            setWgtLayout(down, [0.12, 0.12], [0.09, 0.6], [0, 0], false, false);
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.RU_GAO_ER)
        {
            resetMaiZhuangNum(node);
        }
    }
}

//重置4家头像位置
function reConectHeadLayout_changpai(node)
{
    if(MjClient.MaxPlayerNum_changPai == 2)
    {
        return reConectHeadLayout_changpaiER(node);
    }


    var tData = MjClient.data.sData.tData;
    var down = node.getChildByName("down").getChildByName("head");
    var top = node.getChildByName("top").getChildByName("head");
    //var left = node.getChildByName("left").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");

    resetEatActionAnim_changpai();
    if(tData.tState == TableState.waitJoin || tData.tState == TableState.roundFinish || tData.tState == TableState.waitReady)
    {
        InitHeadPostionReady_changpai(node);

        //initFlower(false, false);
    }
    else
    {
        InitHeadPostionPlaying_changpai(node);

        //resetFlowerNum(node);
        //resetJiaZhuNum(node);
        if(MjClient.gameType == MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.RU_GAO ||
            MjClient.gameType == MjClient.GAME_TYPE.RU_GAO_ER ||
            MjClient.gameType == MjClient.GAME_TYPE.BAI_PU_LIN_ZI
        )
        {
            resetMaiZhuangNum(node);
        }
    }
}


function MJGangCardchange_changpai(tag)
{
    var eat = MjClient.playui.jsBind.eat;
    var changeuibg = eat.changeui.changeuibg;
    var card1 = changeuibg.card1._node;
    var card2 = changeuibg.card2._node;
    var card3 = changeuibg.card3._node;
    var card4 = changeuibg.card4._node;
    var card5 = changeuibg.card5._node;
    var card6 = changeuibg.card6._node;
    var card7 = changeuibg.card7._node;
    var card8 = changeuibg.card8._node;
    var card9 = changeuibg.card9._node;
    var card0 = changeuibg.card0._node;
    card1.visible = false;
    card2.visible = false;
    card3.visible = false;
    card4.visible = false;
    card5.visible = false;
    card6.visible = false;
    card7.visible = false;
    card8.visible = false;
    card9.visible = false;
    card0.visible = false;

    if(MjClient.gangCards.length == 1)//change by sking,多选一时，默认选第一个
    {
        MJGangToServer_changpai(MjClient.gangCards[0]);
    }
    else
    {
        eat.chi0._node.visible = false;
        eat.chi1._node.visible = false;
        eat.chi2._node.visible = false;
        eat.peng._node.visible = false;
        eat.long._node.visible = false;
        eat.gang0._node.visible = false;
        eat.gang1._node.visible = false;
        eat.gang2._node.visible = false;
        eat.hu._node.visible = false;
        eat.tingDi._node.visible = false;

        if(eat.luo)
        {
            eat.luo._node.visible = false;
        }
        if(eat.noLuo)
        {
            eat.noLuo._node.visible = false;
        }
        eat.guo._node.visible = false;
        if (eat.cancel) {
            eat.cancel._node.visible = false;
        }

        changeuibg._node.visible = true;

        var _nodeDown = getNode_changpai(0);
        var stand = _nodeDown.getChildByName("stand");
        var upSize = stand.getSize();
        var upS = stand.scale;
        var cardScale = 0.8;//upS*0.7;//upSize.width * upS * 0.013;//0.05;

        cc.log("杠牌多选一"+JSON.stringify(MjClient.gangCards))
        for(var i = 0; i < MjClient.gangCards.length; i++)
        {
            if(i == 0)
            {
                card1.visible = true;
                card1.setScale(cardScale);
                card1.ignoreContentAdaptWithSize(true);
                setCardSprite_changpai(card1, MjClient.gangCards[i], 4);
            }
            else if(i == 1)
            {
                card3.visible = true;
                card3.ignoreContentAdaptWithSize(true);
                card3.setScale(cardScale);
                setCardSprite_changpai(card3, MjClient.gangCards[i], 4);
            }
            else if(i == 2)
            {
                card0.visible = true;
                card0.setScale(cardScale);
                card0.ignoreContentAdaptWithSize(true);
                setCardSprite_changpai(card0, MjClient.gangCards[i], 4);
            }
        }
    }
}

function MJGangCardchange_MJH(tag)
{
    var eat = MjClient.playui.jsBind.eat;
    var changeuibg = eat.changeui.changeuibg;
    var cardTemplet = changeuibg._node.getChildByName("card");
    var children = changeuibg._node.getChildren().slice();
    for (var i = 0, len = children.length; i < len; i ++)
    {
        if (children[i] != cardTemplet && children[i].getName().indexOf("card") != -1)
            children[i].removeFromParent();
    }

    if(MjClient.gangCards.length === 1) //change by sking,多选一时，默认选第一个
    {
        MJGangToServer_changpai(MjClient.gangCards[0]);
    }
    else
    {
        eat.chi0._node.visible = false;
        eat.chi1._node.visible = false;
        eat.chi2._node.visible = false;
        eat.peng._node.visible = false;
        eat.long._node.visible = false;
        eat.gang0._node.visible = false;
        eat.gang1._node.visible = false;
        eat.gang2._node.visible = false;
        eat.hu._node.visible = false;
        eat.tingDi._node.visible = false;

        if(eat.luo)
        {
            eat.luo._node.visible = false;
        }
        if(eat.noLuo)
        {
            eat.noLuo._node.visible = false;
        }
        eat.guo._node.visible = false;
        if (eat.cancel) {
            eat.cancel._node.visible = false;
        }

        changeuibg._node.visible = true;

        cc.log("杠牌多选一"+JSON.stringify(MjClient.gangCards))
        var card = null;
        var width = (cardTemplet.width - 7)*cardTemplet.scaleX;
        var startX = changeuibg._node.width/2 - width * 1.5;
        for(var i = 0; i < MjClient.gangCards.length; i++)
        {
            for (var j = 0; j < 4; j ++)
            {
                card = cardTemplet.clone();
                setCardSprite(card, MjClient.gangCards[i], 4);
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



//向服务器发送杠牌
function MJGangToServer_changpai(cd)
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    cc.log("====================MJGangToServer=================");
    if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO ||
        MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_ER ||
        MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG ||
        MjClient.gameType === MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG ||
        MjClient.gameType === MjClient.GAME_TYPE.BAI_PU_LIN_ZI)
    {
        var tData = MjClient.data.sData.tData
        var pl = getUIPlayer_changpai(0);
        if( pl.mjState == TableState.waitLong)
        {

            cc.log("===================long================= pl.putCount" + pl.putCount);
            MjClient.playui.longTouch(cd);
            if(pl.mjState == TableState.waitLong)
            {
                if (MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG) {
                    if (cd == MjClient.data.sData.tData.hunCard && cd == MjClient.data.sData.tData.hunCard2) { // 2张牌的直接洛龙
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {
                            cmd: "MJGang",
                            card: cd,
                            eatFlag: EatFlag()
                        });
                        return;
                    }
                    else if (cd == MjClient.data.sData.tData.hunCard || cd == MjClient.data.sData.tData.hunCard2) { //三张牌的直接不洛龙
                        var noluoCard = cd;
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {
                            cmd: "RGLong",
                            card: noluoCard,
                            tingAfterPut: MjClient.clickTing
                        });
                        return;
                    }
                }
                else if ( MjClient.gameType === MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG)
                {

                    if (cd == MjClient.data.sData.tData.hunCard && cd == MjClient.data.sData.tData.hunCard2) { // 2张牌的直接洛龙
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {
                            cmd: "MJGang",
                            card: cd,
                            eatFlag: EatFlag()
                        });
                        return;
                    }

                    // else if (cd == MjClient.data.sData.tData.hunCard || cd == MjClient.data.sData.tData.hunCard2) { //三张牌的直接不洛龙
                    //     var noluoCard = cd;
                    //     MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    //         cmd: "RGLong",
                    //         card: noluoCard,
                    //         tingAfterPut: MjClient.clickTing
                    //     });
                    //     return;
                    // }
                }
                else if (cd == MjClient.data.sData.tData.hunCard) { //三张牌的直接不洛龙
                    var noluoCard = cd;
                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                        cmd: "RGLong",
                        card: noluoCard,
                        tingAfterPut: MjClient.clickTing
                    });
                    return;
                }
            }
        }
        else
        {
            MjClient.gamenet.request("pkroom.handler.tableMsg", {
                cmd: "MJGang",
                card: cd,
                eatFlag: EatFlag()
            });
        }
    }
    else
    {
        MjClient.gamenet.request("pkroom.handler.tableMsg", {
            cmd: "MJGang",
            card: cd,
            eatFlag: EatFlag()
        });
    }
}


/*
 设置过胡的标识  by sking
 */
function setSkipHuState_changpai()
{
    var pl = getUIPlayer_changpai(0);
    if (pl.skipHu) {
        var _skipHuIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipHuIconTag");
        if (_skipHuIconNode.getDescription() === "Text") _skipHuIconNode.setString("过\n胡");
        _skipHuIconNode.visible = true;
    }
}

function setSkipHuState_qutang_23zhang()
{
    var pl = getUIPlayer_changpai(0);
    var _skipHuIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipHuIconTag");
    if (pl.skipHu.length > 0) {
        _skipHuIconNode.visible = true;
    }else{
        _skipHuIconNode.visible = false;
    }
}




//出牌
function PutOutCard_MJ(cdui, cd)
{
    MjClient.playui.jsBind.BtnPutCard._node.stopAllActions(); //修复抓花后自摸时自动打出bug

    //clearTagAreadyPutCards();
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
        // var tingIndex = pl.tingIndex;//沭阳麻将需要
        // if(cc.isUndefined(tingIndex) || !pl.isTing)
        // {
        //     tingIndex = -1;//为了不报错;
        // }

        var out0 = cdui.parent.getChildByName("out0");
        var out1 = cdui.parent.getChildByName("out1");

        var out;
        if(putnum > 11)
        {
            out = out1;
        }
        else
        {
            out = out0;
        }
        var oSize = out.getSize();
        var oSc = out.getScale()*1.3;
        if(putnum > 11)
        {
            putnum -= 12;
            //tingIndex -= 12;
        }
        var addWide =  0;
        // if(tingIndex <= putnum && tingIndex >= 0)
        // {
        //     addWide =  oSize.width * oSc *0.91;
        // }

        var endPoint = cc.p(0, 0);
        endPoint.y = out.y;
        // endPoint.x = out.x + oSize.width * oSc * putnum*0.91 + addWide;
        endPoint.x = out.x + 10000;
        cdui.zIndex = out.zIndex;
        setCardSprite(cdui,cd,0);
        cdui.setPosition(endPoint);
        cdui.setScale(oSc);
        cdui.addTouchEventListener(function () {});

        showMJOutBig(cdui.parent, cd);
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
            
        }
    }
    var _skipPengIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipPengIconTag");
    if(_skipPengIconNode)
        _skipPengIconNode.visible = false;
}

//出牌
function PutOutCard_CP(cdui, cd)
{
    //cc.log("===========mysking 00= " + cd);
    MjClient.playui.jsBind.BtnPutCard._node.stopAllActions(); //修复抓花后自摸时自动打出bug
    /*
     临时提高层级是为了在DealMJPut中RemoveNodeBack删除打出去的这张牌时，能准确找到选中的这张牌。
     如果不提高层级，mjhand里面如果有相同的两张牌时，就会删掉另一张不是用户操作的牌
     */

    var pl = getUIPlayer_changpai(0);

    cc.log("===========pl.long.indexOf(cd) = " + pl.long.indexOf(cd));

    if(pl.long.indexOf(cd) >= 0)
    {
        return MjClient.showToast("手上的龙不能打，重新选牌");
    }

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
    cc.log("================================mjhandNum =  " + mjhandNum);

    var pl = getUIPlayer_changpai(0);

    cc.log("====================send put out card ============mjhandNum =  " + mjhandNum);
    cc.log("====================send put out card ============pl.mjhand.length =  " + pl.mjhand.length);

    if (mjhandNum == pl.mjhand.length)
    {
        cc.log("====================send put out card ============changpai ");

        var out = cdui.parent.getChildByName("out");
        if(MjClient.MaxPlayerNum_changPai != 2)
        {
            MjClient.gamenet.request("pkroom.handler.tableMsg", {
                cmd: "MJPut",
                card: cd,
                tingAfterPut: MjClient.clickTing
            });
        }

        var oSize = out.getSize();
        var oSc = out.getScale()*1.3;

        var ws = cc.director.getWinSize();
        var endPoint = cc.p(0, 0);
        endPoint.y = out.y;
        endPoint.x = out.x + oSize.width * oSc*0.91;
        var Midpoint = cc.p(0, 0);
        Midpoint.x = ws.width / 2;
        Midpoint.y = ws.height * 0.5;
        cdui.zIndex = out.zIndex;
        setCardSprite_changpai(cdui,cd,0);
        cdui.addTouchEventListener(function () {});
        if (MjClient.gameType == MjClient.GAME_TYPE.BAI_PU_LIN_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG
        ||MjClient.gameType == MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG)
        {
            cdui.zIndex = 200;
            cdui.runAction(cc.sequence(cc.spawn(cc.moveTo(0.1, Midpoint), cc.scaleTo(0.1, 1.5*oSc), cc.rotateTo(0.1, 90)))).setTag(20180201);
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.RU_GAO_ER) //2人的时候
        {
            cdui.zIndex = 200;
            cdui.runAction(cc.sequence(cc.spawn(cc.moveTo(0.1, Midpoint), cc.scaleTo(0.1, 1.3*oSc), cc.rotateTo(0.1, 90)),cc.callFunc(function(){
                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJPut",
                    card: cd,
                    tingAfterPut: MjClient.clickTing
                });
            }))).setTag(20180201);
        }
        else
        {
            cdui.setPosition(endPoint);
            cdui.setScale(oSc);
        }


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
    //if (MjClient.gameType != MjClient.GAME_TYPE.SHU_YANG)
    {
        cc.log("====PutOutCard======_skipHuIconNode  ====  " + pl.skipHu); //if(!pl.isQiHu)
        if (!pl.skipHu) {
            var _skipHuIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipHuIconTag");
            if(_skipHuIconNode)
                _skipHuIconNode.visible = false;
            
        }
    }
    var _skipPengIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipPengIconTag");
    if(_skipPengIconNode)
        _skipPengIconNode.visible = false;


    // var mjhandNum = 0;
    // for(var i = 0; i < children.length; i++)
    // {
    //     if(children[i].name == "mjhand")
    //     {
    //         mjhandNum++;
    //     }
    // }
    // cc.log("=======end of putOutCard =========================mjhandNum =  " + mjhandNum);

}

function PutOutCard_changpai(cdui, cd)
{
    var bNewC = cdui.isNewC; //打出去那张牌是新摸的那张牌

    if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH || MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
    {
        PutOutCard_MJ(cdui, cd);
    }
    else if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO ||
        MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_ER ||
        MjClient.gameType === MjClient.GAME_TYPE.BAI_PU_LIN_ZI ||
        MjClient.gameType === MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG ||
        MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG)
    {
        PutOutCard_CP(cdui, cd);

        var pl = getUIPlayer_changpai(0);
        var children = cdui.parent.children;
        var mjhandNum = 0;
        for(var i = 0; i < children.length; i++)
        {
            if(children[i].name == "mjhand")
            {
                mjhandNum++;
            }
        }

        if (mjhandNum == (pl.mjhand.length - 1))
        {
            if(!MjClient.ruGao_autoSort) {
                var pl = getUIPlayer_changpai(0);
                pl.isNew = false;
                resetNewCardSort(cd,bNewC);
                MjClient.newCardTag = null;
            }
        }
        else
        {
            MjClient.showToast("出牌异常UI 数据对不上了")
        }
    }

}



function setTingCards_changpai(node, tingSet)
{
    node.zIndex = 500;
    node.visible = true;

    var cardNode0 = node.getChildByName("showNode");
    cardNode0.setRotation(0);
    cardNode0.setVisible(false);
    var BindingNode = node.getChildByName("Node_card");
    BindingNode.removeAllChildren(true);

    var i=0;
    var j = 0;//高
    var bHaveValue = false;


    for (var cd in tingSet)
    {
        var cardNode = cardNode0.clone();
        cardNode.visible = true;
        bHaveValue = true;

        if(i == 17)
        {
            j++;
            i = 0;
        }
        cardNode.setPositionY(cardNode0.getPositionY() + j*cardNode0.getBoundingBox().height*1.2);
        cardNode.setPositionX(cardNode0.getPositionX() + i*cardNode0.getBoundingBox().width*1.15);
        BindingNode.addChild(cardNode, 10-j);
        setCardSprite_changpai(cardNode, parseInt(cd), 0);
        i++;
    }

    //如果没有值则隐藏
    if(!bHaveValue)
    {
        node.visible = false;
    }

    if(j >= 1) i = 17;

    var tingCardsHeight = cardNode0.getBoundingBox().height*1.1 + j*cardNode0.getBoundingBox().height*1.2;
    var tingCardsWidth = cardNode0.getBoundingBox().width/0.207 + (i-1)*cardNode0.getBoundingBox().width;
    node.setContentSize(tingCardsWidth, tingCardsHeight);

}

function getNewCard_changpai(node, copy, name, tag, off, specialTAG)
{
	var cpnode = node.getChildByName(copy);
	var cp = cpnode.clone(); //克隆一个白板，上面没有任何条纹的麻将 ，by sking
    if (name == "mjhand")
    {

        if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH || MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
        {

            cp.setScale(cp.getScale()*1.18);
        }
        else //长牌的
        {
            if(specialTAG == "endOne")
            {
                cp.setScale(cp.getScale()*1.5);
            }
            else
            {
                if(MjClient.ruGao_Sort){
                    var _CardWith = cp.getSize().width * cp.getScale()*20; //20表示根据屏幕的宽度最多放下20张牌
                    var scaleValue = MjClient.size.width/_CardWith;
                    cp.setScale(cp.getScale()*scaleValue );
                }
                else
                {
                    var _CardWith = cp.getSize().width * cp.getScale()*24; //23张牌
                    var scaleValue = MjClient.size.width/_CardWith;
                    cp.setScale(cp.getScale()*scaleValue);
                }
            }
        }

        if(MjClient._isRotated && (MjClient.gameType == MjClient.GAME_TYPE.RU_GAO ||
                MjClient.gameType == MjClient.GAME_TYPE.RU_GAO_ER ||
                MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG ||
                MjClient.gameType === MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG ||
                MjClient.gameType === MjClient.GAME_TYPE.BAI_PU_LIN_ZI))
        {
            cp.setRotation(180);
        }
        else
        {
            cp.setRotation(0);
        }
    }
    else
    {
        if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH || MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
        {
            if(off != 0 && copy == "up" && MjClient.rePlayVideo == -1)//正常打牌，闲家吃碰杠的牌
            {
                cp.setScale(cp.getScale()*0.4);
            }
            else if(name == "standPri")//非自己的手牌
            {
                cp.setScale(cp.getScale()*0.6);
            }
            else if(name == "mjhand_replay")//回放的手牌
            {
                cc.log("=========mjhand_replay=======回放的手牌======");
                cp.setScale(cp.getScale()*0.45);
            }
            else if(copy == "upEndOne")//结算的
            {
                cp.setScale(cp.getScale()*0.55);
            }
            else
            {
                cp.setScale(cp.getScale()*0.4);
            }
        }
        else
        {
            if(off == 0)
            {
                cp.setScale(cp.getScale()*1.5);
            }
            else {
                cp.setScale(cp.getScale()*0.85);
            }
        }

        //cp.setScale(cp.getScale()*0.3);
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
        //cc.log("===========mysking =1 " + tag);
		setCardSprite_changpai(cp, tag, name == "mjhand" ? 4 : off);
		if(name == "mjhand" || name == "mjting")
		{
            SetTouchCardHandler_changpai(cpnode, cp);
		}
	}
    else
    {
        if (cp.getName() == "standPri") {
            cp.loadTexture(cpnode.getRenderFile().file);
        }
    }

	return cp;
}


//适用麻将,重置手牌麻将的大小，为了解决手牌变小的bug, by sking
function resetCardSize_changpai()
{
    var _downNode = getNode(0);
    var _cpnode = _downNode.getChildByName("stand");
    var children = _downNode.children;
    for(var i = 0; i < children.length; i++)
    {
        if(children[i].name == "mjhand")
        {
            setCardSprite_changpai(children[i], children[i].tag, 4);//by sking 2018,,1,13
            if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH || MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
            {
                children[i].setScale(_cpnode.getScale()*1.18);
            }
            else {
                var _stand = getNode_changpai(0).getChildByName("stand");
                var _CardWith = _stand.width * _stand.getScale()*24; //23张牌
                var scaleValue = MjClient.size.width/_CardWith;
                children[i].setScale(_cpnode.getScale()*scaleValue);
            }
        }
    }
    MjClient.movingCard = null;
}

function DealMJPut_CP_RG(node, msg, off, outNum)
{
    if(MjClient.MaxPlayerNum_changPai == 2)
    {
        if(off == 2 || off == 3) off = 1;
    }

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_changPai;
    if(uids[selfIndex] == msg.uid)
    {
        var pl = sData.players[msg.uid];
        var putnum = outNum >= 0 ? outNum : (pl.mjput.length - 1);

        var out1 = node.getChildByName("out");
        var out2 = node.getChildByName("out0");
        var out3 = node.getChildByName("out1");
        var out4 = node.getChildByName("out2");
        var out = out1.clone();

        if(putnum > 8 && putnum <= 17)
        {
            out = out2.clone();
            out.x = out2.x;
            out.y = out2.y;
            putnum -= 9;
        }
        else if(out3 && putnum > 17 && putnum <= 26)
        {
            out = out3.clone();
            out.x = out3.x;
            out.y = out3.y;
            putnum -= 18;
        }
        else if(out4 && putnum > 26)
        {
            out = out4.clone();
            out.x = out4.x;
            out.y = out4.y;
            putnum -= 27;
        }

        out.visible = true;
        node.addChild(out);
        // out.setScale(out.getScale()*1.3);
        var oSize = out.getSize();
        var oSc = out.scale;
        // node.addChild(out);
        //
        //
        // out.visible = true;
        out.name = "outout";

        for(var i = 0; i < node.children.length; i++)
        {
            if(node.children[i].name == "newout")
            {
                node.children[i].name = "outout";
            }
        }

        setCardSprite_changpai(out, msg.card, off);

        var endPoint = cc.p(0, 0);
        var ws = cc.director.getWinSize();

        if(off == 0)
        {
            if(MjClient.MaxPlayerNum_changPai == 2)
            {
                if(!(outNum >= 0))
                {
                    if(RemoveNodeBack(node, "putOutCard", 1, msg.card) == 0)
                    {
                        RemoveNodeBack(node, "mjhand", 1, msg.card);
                    }
                }

                endPoint.y = out.y - oSize.height * oSc * putnum * 0.15;
                //endPoint.x = out.x - oSize.width * oSc * putnum*0.91;
                endPoint.x = out.x;
                out.setRotation(180);
                cc.log("--------------sss------msg.carMjClient.MaxPlayerNum_changPai == 2d -- " + msg.card);
            }
            else
            {
                endPoint.y = out.y;
                endPoint.x = out.x + oSize.width * oSc * putnum*0.71;
                if(!(outNum >= 0))
                {
                    if(RemoveNodeBack(node, "putOutCard", 1, msg.card) == 0)
                    {
                        RemoveNodeBack(node, "mjhand", 1, msg.card);
                    }
                }
                cc.log("--------------sss------msg.card -- " + msg.card);
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
            // cc.log("DealMJPut remove card  = " + msg.card);
            endPoint.y = out.y - oSize.height * oSc * putnum * 0.15;
            endPoint.x = out.x;
            //out.zIndex = 100 - putnum;
            out.setRotation(180);
        }
        else if(off == 2)
        {
            if(!(outNum >= 0))
            {
                if (MjClient.rePlayVideo == -1)
                    RemoveFrontNode(node, "standPri", 1);
                else//回放
                    RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
            }
            endPoint.y = out.y - oSize.height * oSc * putnum * 0.15;
            //endPoint.x = out.x - oSize.width * oSc * putnum*0.91;
            endPoint.x = out.x;
            out.setRotation(180);
        }

        if(outNum >= 0) //重连
        {
            //断线重连的时候
            if (tData.lastPutCard == msg.card && tData.lastPutPlayer == tData.uids.indexOf(msg.uid))
            {
                // clearCurrentPutTag_changpai();
                // addCurrentPutTag_changpai(out, off);
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
            clearCurrentPutTag_changpai();
            //addCurrentPutTag_changpai(out, off);
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
        setCardSprite_changpai(outAction, msg.card, off);
        outAction.scale = oSc;
        outAction.zIndex = zoder;
        outAction.setPosition(endPoint);
        //addCurrentPutTag_changpai(outAction, off);




        function RemovePutCard(onlySelf)
        {
            outAction.removeFromParent();
            if (!onlySelf)
            {
                out.visible = true;
                out.zIndex = zoder;
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
                            RemovePutCard(true)
                        },
                        MJFlower: function () {
                            RemovePutCard(false);
                        }
                    }
            }

        BindUiAndLogic(outAction, outActionBind);


        if (!(outNum >= 0))
        {
            MjClient.playui.CardLayoutRestore(node, off);
        }
    }
}

function DealMJPut_CP(node, msg, off, outNum)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_changPai;


    if(uids[selfIndex] == msg.uid)
    {
        var pl = sData.players[msg.uid];
        var putnum = outNum >= 0 ? outNum : (pl.mjput.length - 1);

        var out1 = node.getChildByName("out");
        var out2 = node.getChildByName("out0");
        var out = out1.clone();

        if(putnum > 8)
        {
            out = out2.clone();
            out.x = out2.x;
            out.y = out2.y;
            putnum -= 9;
        }

        out.visible = true;
        node.addChild(out);
        // out.setScale(out.getScale()*1.3);
        var oSize = out.getSize();
        var oSc = out.scale;
        // node.addChild(out);
        //
        //
        // out.visible = true;
        out.name = "outout";

        for(var i = 0; i < node.children.length; i++)
        {
            if(node.children[i].name == "newout")
            {
                node.children[i].name = "outout";
            }
        }

        setCardSprite_changpai(out, msg.card, off);

        var Midpoint = cc.p(0, 0);
        var endPoint = cc.p(0, 0);
        var ws = cc.director.getWinSize();

        if(off == 0)
        {
            if(MjClient.MaxPlayerNum_changPai == 2)
            {
                if(!(outNum >= 0))
                {
                    if (MjClient.rePlayVideo == -1)
                    {
                        if(RemoveNodeBack(node, "putOutCard", 1, msg.card) == 0)
                        {
                            RemoveNodeBack(node, "mjhand", 1, msg.card);
                        }
                    }
                    else//回放
                        RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
                }
                endPoint.y = out.y - oSize.height * oSc * putnum * 0.15;
                //endPoint.x = out.x - oSize.width * oSc * putnum*0.91;
                endPoint.x = out.x;
                out.setRotation(180);
                Midpoint.x = ws.width *0.38;
                Midpoint.y = ws.height* 2 / 3;

                cc.log("--------------sss------msg.carMjClient.MaxPlayerNum_changPai == 2d -- " + msg.card);
            }
            else
            {
                endPoint.y = out.y;
                endPoint.x = out.x + oSize.width * oSc * putnum*0.71;
                if(!(outNum >= 0))
                {
                    if(RemoveNodeBack(node, "putOutCard", 1, msg.card) == 0)
                    {
                        RemoveNodeBack(node, "mjhand", 1, msg.card);
                    }
                }

                Midpoint.x = ws.width / 2;
                Midpoint.y = ws.height *0.5;

                cc.log("--------------sss------msg.card -- " + msg.card);
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
            cc.log("DealMJPut remove card  = " + msg.card);
            endPoint.y = out.y - oSize.height * oSc * putnum * 0.15;
            endPoint.x = out.x;
            //out.zIndex = 100 - putnum;
            Midpoint.x = ws.width *(1 - 0.38);
            Midpoint.y = ws.height* 2 / 3;
            out.setRotation(180);
        }
        else if(off == 2)
        {
            if(!(outNum >= 0))
            {
                if (MjClient.rePlayVideo == -1)
                    RemoveFrontNode(node, "standPri", 1);
                else//回放
                    RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
            }
            endPoint.y = out.y - oSize.height * oSc * putnum * 0.15;
            //endPoint.x = out.x - oSize.width * oSc * putnum*0.91;
            endPoint.x = out.x;
            out.setRotation(180);
            Midpoint.x = ws.width *0.38;
            Midpoint.y = ws.height* 2 / 3;
        }

        if(outNum >= 0) //重连
        {
            //断线重连的时候
            if (tData.lastPutCard == msg.card && tData.lastPutPlayer == tData.uids.indexOf(msg.uid))
            {
                // clearCurrentPutTag_changpai();
                // addCurrentPutTag_changpai(out, off);
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
            clearCurrentPutTag_changpai();
            //addCurrentPutTag_changpai(out, off);
        }

        var zoder = out.zIndex;
        out.zIndex = 200;
        out.visible = false;
        out.x = Midpoint.x;
        out.y = Midpoint.y;
        out.scale = 1.5*oSc;
        out.name = "newout";


        var outAction = out.clone();
        outAction.name = "outAction";
        outAction.visible = true;
        node.addChild(outAction);
        setCardSprite_changpai(outAction, msg.card, off);
        outAction.zIndex = 200;



        var RemovePutCard = function (onlySelf)
        {
            MjClient.lastCardposNode = null;//抢杠胡没有牌 可以劈
            if (!cc.sys.isObjectValid(outAction))
            {
                return;
            }

            if (!onlySelf)
            {
                var delayNum = 0.5 - (Date.now() - putTime) / 1000;
                if (delayNum < 0)
                {
                    delayNum = 0;
                }

                outAction.runAction(cc.sequence(
                    cc.delayTime(delayNum),
                    cc.callFunc(function()
                    {
                        if(cc.sys.isObjectValid(out))
                        {
                            out.visible = true;
                            out.runAction(cc.sequence(
                                cc.spawn(cc.moveTo(0.1, endPoint), cc.scaleTo(0.1, oSc)),
                                cc.callFunc(function(){out.zIndex = zoder;})
                            ));
                        }
                    }),
                    cc.removeSelf()));
            }
            else
            {
                outAction.removeFromParent();
            }
        };



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
            };

        var putTime = Date.now();
        if (off == 0 && MjClient.rePlayVideo == -1)
        {
            outAction.x = Midpoint.x;
            outAction.y = Midpoint.y;
            outAction.scale = 1.5*oSc;
            RemovePutCard(false);
        }
        else
        {
            outAction.x = node.getChildByName("stand").x;
            outAction.y = node.getChildByName("stand").y;
            outAction.scale = oSc;
            outAction.runAction(cc.spawn(cc.moveTo(0.1, Midpoint), cc.scaleTo(0.1, 1.5 * oSc)));
            var pl = sData.players[SelfUid()+""];
            if (tData.tState != TableState.waitEat || (pl && pl.eatFlag == 0))//自己没有吃碰杠等操作
            {
                RemovePutCard(false);
            }
            else
            {
                BindUiAndLogic(outAction, outActionBind);
            }
        }





        if (!(outNum >= 0))
        {
            MjClient.playui.CardLayoutRestore(node, off);
        }
    }
}

function DealMJPut3_MJ(node, msg, off, outNum)
{
    cc.log("======DealMJPut======= " + off);
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_changPai;
    if(uids[selfIndex] == msg.uid)
    {
        var pl = sData.players[msg.uid];
        var putnum = outNum >= 0 ? outNum : (pl.mjput.length - 1);
        var tingIndex = pl.tingIndex;//沭阳麻将需要

        //cc.log( off + "------------- pl.tingIndex =" + pl.tingIndex);
        //cc.log("------------- pl.isTing =" + pl.isTing);

        if(cc.isUndefined(tingIndex) || !pl.isTing)
        {
            tingIndex = -1;//为了不报错;
        }

        var out0 = node.getChildByName("out0");
        var out1 = node.getChildByName("out1");

        var out;
        if(putnum > 11)
        {
            out = out1.clone();
        }
        else
        {
            out = out0.clone();
        }

        // 消除牌背资源尺寸不一致，导致出牌时牌会闪烁的问题
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP && off == 0) {
            var type = getCurrentMJBgType();
            if (type == 0) {
                out.loadTexture("playing/MJ/Mj_up_2.png");
            }
            else if (type == 1) {
                out.loadTexture("playing/MJ/MJBg1/Mj_up_2.png");
            }
            else if (type == 2) {
                out.loadTexture("playing/MJ/MJBg2/Mj_up_2.png");
            }
            else if (type == 3) {
                out.loadTexture("playing/MJ/MJBg3/Mj_up_2.png");
            }
            out.ignoreContentAdaptWithSize(true);
        }

        out.setScale(out.getScale()*1.3);
        var oSize = out.getSize();
        var oSc = out.scale;

        if(off == 0 && putnum > 11)
        {
            node.addChild(out);
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
                node.children[i].name = "outout";
            }
        }

        out.visible = true;
        out.name = "outout";
        setCardSprite_MJ(out, msg.card, off);
        var endPoint = cc.p(0, 0);
        var ws = cc.director.getWinSize();
        if(putnum > 11)
        {
            if (off == 2 || off == 1) {
                out.x = out1.x - 1.3;
                out.y = out1.y - 1;
            }
            else {
                out.x = out1.x;
                out.y = out1.y;
            }
            putnum -= 12;
            tingIndex -= 12;
        }

        //是否需要变宽
        var addWide =  0;
        // if(tingIndex <= putnum && tingIndex >= 0)
        // {
        //     if(off == 0 || off == 2)
        //     {
        //         addWide =  oSize.width * oSc *0.91;
        //     }
        //     else if (off  == 1 || off == 3)
        //     {
        //         addWide =  oSize.height * oSc *0.7;
        //     }
        // }

        if(off == 0)
        {
            endPoint.y = out.y;
            endPoint.x = out.x + oSize.width * oSc * putnum*0.92 + addWide + 10;
            if(!(outNum >= 0))
            {
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
                    RemoveFrontNode(node, "standPri", 1);
                else//回放
                    RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
            }
            cc.log("DealMJPut remove card  = " + msg.card);
            endPoint.y = out.y + oSize.height * oSc * putnum * 0.72 + addWide;
            endPoint.x = out.x;
            out.zIndex = 100 - putnum;
        }
        // else if(off == 2)
        // {
        //     if(!(outNum >= 0))
        //     {
        //         if (MjClient.rePlayVideo == -1)
        //             RemoveFrontNode(node, "standPri", 1);
        //         else//回放
        //             RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
        //     }
        //
        //     endPoint.x = out.x - oSize.width * oSc * putnum*0.91 - addWide;
        //     endPoint.y = out.y;
        // }
        else if (off === 2)
        {
            if(!(outNum >= 0))
            {
                if (MjClient.rePlayVideo == -1)
                    RemoveNodeBack(node, "standPri", 1);
                else
                    RemoveNodeBack(node, "mjhand_replay", 1, msg.card);
            }

            endPoint.y = out.y - oSize.height * oSc * putnum * 0.72 - addWide + 25;
            endPoint.x = out.x;
            out.zIndex = putnum;
        }



        if(outNum >= 0) //重连
        {
            //断线重连的时候
            if (tData.lastPutCard == msg.card && tData.lastPutPlayer == tData.uids.indexOf(msg.uid))
            {
                out.x = endPoint.x;
                out.y = endPoint.y;
                clearCurrentPutTag_changpai();
                addCurrentPutTag_changpai(out, off);
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
            clearCurrentPutTag_changpai();
            addCurrentPutTag_changpai(out, off);
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
        setCardSprite_MJ(outAction, msg.card, off);
        outAction.scale = oSc;
        outAction.zIndex = zoder;
        outAction.setPosition(endPoint);
        addCurrentPutTag_changpai(outAction, off);




        function RemovePutCard(onlySelf)
        {
            outAction.removeFromParent();
            if (!onlySelf)
            {
                out.visible = true;
                out.zIndex = zoder;
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
                            RemovePutCard(true)
                        },
                        MJFlower: function () {
                            RemovePutCard(false);
                        }
                    }
            }

        BindUiAndLogic(outAction, outActionBind);
        if (!(outNum >= 0))
        {
            cc.log("====putOut cardLayout===");
            MjClient.playui.CardLayoutRestore(node, off);
        }

        if (off != 0)
        {
            showMJOutBig(node, msg.card);
        }
    }
}


function DealMJPut_QUTANG(node, msg, off, outNum)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if(MjClient.MaxPlayerNum_changPai === 2 && off === 2){
        node.visible = false;
        return;
    }
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_changPai;
    if(uids[selfIndex] === msg.uid)
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

        var maxNum = 12;
        if(MjClient.MaxPlayerNum_changPai === 2) maxNum = 13;

        var out;
        if(putnum >= maxNum * 2 && out2) {
            out = out2.clone();
        } else if(putnum >= maxNum && out1) {
            out = out1.clone();
        }else{
            out = out0.clone();
        }

        // 消除牌背资源尺寸不一致，导致出牌时牌会闪烁的问题
        if (off === 0) {
            var type = getCurrentMJBgType();
            if (type === 0) {
                out.loadTexture("playing/MJ/Mj_up_2.png");
            }
            else if (type === 1) {
                out.loadTexture("playing/MJ/MJBg1/Mj_up_2.png");
            }
            else if (type === 2) {
                out.loadTexture("playing/MJ/MJBg2/Mj_up_2.png");
            }
            else if (type === 3) {
                out.loadTexture("playing/MJ/MJBg3/Mj_up_2.png");
            }
            out.ignoreContentAdaptWithSize(true);
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
            if(node.children[i].name === "newout")
            {
                node.children[i].name = "outout";
            }
        }

        out.visible = true;
        out.name = "outout";
        setCardSprite_MJ(out, msg.card, off);
        var endPoint = cc.p(0, 0);
        var ws = cc.director.getWinSize();
        var lineNum = 1; // 记录当前出牌显示的行数，默认第一行
        if(putnum > maxNum * 2 - 1 && out2) {
            out.x = out2.x;
            out.y = out2.y;
            putnum -= maxNum*2;
            tingIndex -= maxNum*2;
            lineNum = 3;
        }else if(putnum > maxNum - 1 && out1){
            out.x = out1.x;
            out.y = out1.y;
            putnum -= maxNum;
            tingIndex -= maxNum;
            lineNum = 2;
        }

        //是否需要变宽
        var addWide =  0;

        if(off === 0)
        {
            endPoint.y = out.y;
            endPoint.x = out.x + oSize.width * oSc * putnum*0.92 + addWide + 10;
            if(!(outNum >= 0))
            {
                if(RemoveNodeBack(node, "putOutCard", 1, msg.card) == 0)
                {
                    RemoveNodeBack(node, "mjhand", 1, msg.card);
                }
            }
        }
        else if (off === 1)
        {
            if(!(outNum >= 0))
            {
                if (MjClient.rePlayVideo === -1)
                    RemoveFrontNode(node, "standPri", 1);
                else//回放
                    RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
            }
            cc.log("DealMJPut remove card  = " + msg.card);
            endPoint.y = out.y + oSize.height * oSc * putnum * 0.72 + addWide;
            endPoint.x = out.x;
            out.zIndex = 100 - putnum;
        }
        else if (off === 2)
        {
            if(!(outNum >= 0))
            {
                if (MjClient.rePlayVideo === -1)
                    RemoveNodeBack(node, "standPri", 1);
                else
                    RemoveNodeBack(node, "mjhand_replay", 1, msg.card);
            }

            endPoint.y = out.y - oSize.height * oSc * putnum * 0.72 - addWide + 25;
            endPoint.x = out.x;
            out.zIndex = putnum;
        }



        if(outNum >= 0) //重连
        {
            //断线重连的时候
            if (tData.lastPutCard == msg.card && tData.lastPutPlayer == tData.uids.indexOf(msg.uid))
            {
                out.x = endPoint.x;
                out.y = endPoint.y;
                clearCurrentPutTag_changpai();
                addCurrentPutTag_changpai(out, off);
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
            clearCurrentPutTag_changpai();
            addCurrentPutTag_changpai(out, off);
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
        setCardSprite_MJ(outAction, msg.card, off);
        outAction.scale = oSc;
        outAction.zIndex = zoder;
        outAction.setPosition(endPoint);
        addCurrentPutTag_changpai(outAction, off);

        function RemovePutCard(onlySelf)
        {
            outAction.removeFromParent();
            if (!onlySelf)
            {
                out.visible = true;
                out.zIndex = zoder;
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
                            RemovePutCard(true)
                        },
                        MJFlower: function () {
                            RemovePutCard(false);
                        }
                    }
            }

        BindUiAndLogic(outAction, outActionBind);
        if (!(outNum >= 0))
        {
            cc.log("====putOut cardLayout===");
            MjClient.playui.CardLayoutRestore(node, off);
        }

        if (off != 0)
        {
            showMJOutBig(node, msg.card);
        }
    }
}


function DealMJPut_changpai(node, msg, off, outNum)
{

    // var children = getNode_changpai(0).children;
    // var mjhandNum = 0;
    // for(var i = 0; i < children.length; i++)
    // {
    //     if(children[i].name == "mjhand")
    //     {
    //         mjhandNum++;
    //     }
    // }
    //
    // cc.log("**************************BBBB DealMJPut_changpai=========================mjhandNum =  " + mjhandNum);

    if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH)
    {
        DealMJPut3_MJ(node, msg, off, outNum)
    }
    else if(MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG){
        DealMJPut_QUTANG(node, msg, off, outNum);
    }
    else if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG ||
        MjClient.gameType === MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG ||
        MjClient.gameType === MjClient.GAME_TYPE.BAI_PU_LIN_ZI)
    {
        DealMJPut_CP(node, msg, off, outNum);
    }
    else if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO ||
        MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_ER)
    {
        DealMJPut_CP_RG(node, msg, off, outNum);
    }

}
function DealNewCard_changpai(node, msg, off)
{
    /*
     下一次摸牌，过胡标志取消
     */
    var pl = getUIPlayer_changpai(0);
    if (off === 0 )
    {
        pl.isNew = true;
        if(!pl.skipHu)
        {
            var _skipHuIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipHuIconTag");
            if(_skipHuIconNode)
            {
                _skipHuIconNode.visible = !!pl.skipHu;
            }
        }

        if(!MjClient.clickTing && !pl.isTing)
        {
            //摸牌后显示可听得牌
            var tingCards = getCheckTingHuCards(msg,pl.mjhand);
            if(MjClient.playui._canJiaBei){
                var tData = MjClient.data.sData.tData;
                if(tData.allSelect) setCurrentTingNum_changpai(tingCards);
            }else {
                setCurrentTingNum_changpai(tingCards);
            }
        }


        if(MjClient.movingCard)
        {
            cc.log("---------DealNewCard_changpai---------- off = " + off);
            MjClient.movingCard.setPosition(cardBeginPos);
            MjClient.movingCard.setScale(cardBeginScale);
            MjClient.movingCard.zIndex = cardBeginZIndex;
            MjClient.movingCard = null;
        }

    }
    cc.log("=====================deal with new card -=============");
    //创建一个麻将，msg为麻将的信息，数字表示。by sking
    var newCard = getNewCard_changpai(node, "stand", "mjhand", msg, off);

    if(pl.isTing &&  MjClient.ruGao_Sort)
    {
       var pl = getUIPlayer_changpai(0);
       var eat = MjClient.playui.jsBind.eat;
       cc.log("*********自动出牌*********");
       MjClient.playui._btnPutCard.scheduleOnce(function(){
           if (pl.isTing && !eat.hu._node.visible && !eat.gang0._node.visible && !eat.gang1._node.visible && !eat.gang2._node.visible && cc.sys.isObjectValid(newCard) && !MjClient.majiang.isCardFlower(newCard.tag)) {
               PutOutCard_changpai(newCard, newCard.tag); //可以出牌
           }
       },0.8)

    }
    else
    {
        if(MjClient.GAME_TYPE.QU_TANG_23_ZHANG === MjClient.gameType){
            if(MjClient.playui._canJiaBei && !tData.allSelect){
                newCard.setVisible(false);
            }else{
                MjClient.playui.CardLayoutRestore(node, 0, true);
            }
        }else{
            MjClient.playui.CardLayoutRestore(node, 0, true);
        }
    }
}

function GetUIBind_changpai(uidPos, offStore)
{
    var tData = MjClient.data.sData.tData;
    var uids = tData.uids;
    var selfIndex = uids.indexOf(SelfUid());
    var uiOff = (uidPos + MjClient.MaxPlayerNum_changPai - selfIndex) % MjClient.MaxPlayerNum_changPai;
    if (offStore) offStore.push(uiOff);
    var jsBind = MjClient.playui.jsBind;
    var ui = [jsBind.down, jsBind.right, jsBind.top];
    return ui[uiOff];
}

// 处理碰
function DealMJPeng_changpai(node, msg, off)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_changPai;
    if(tData.curPlayer == selfIndex)
    {
        var fromOff = [];
        var fromBind = GetUIBind_changpai(msg.from, fromOff);
        var fnode = fromBind._node;

        RemoveNewCardOut(fnode);
        var pl = sData.players[tData.uids[selfIndex] + ""];
        // var i = pl.pengchigang.peng.length - 1;
        // var idx = tData.uids.indexOf(pl.info.uid);
        // var offIdx = 0;
        // if(i >= 0)
        // {
        //     offIdx = (pl.pengchigang.peng[i].pos - idx + 4) % 4 - 1;
        // }

        var idxPeng =  pl.mjpeng.length -1;
        for(var j = 0; j < 3; j++)
        {
            // if( (j % 3 == 2 - offIdx && off % 3 == 0) || (j % 3 == offIdx && off % 3 != 0) )
            // {
            //     var cdui = getNewCard_changpai(node, "up", "peng", pl.mjpeng[idxPeng], off, "heng", "heng");
            //     //setCardArrow(cdui, offIdx, off);
            // }
            // else
            {
                getNewCard_changpai(node, "up", "peng", pl.mjpeng[idxPeng], off);
            }
        }

        //删掉俩张stand
        if(off == 0)
        {
            RemoveNodeBack(node, "mjhand", 2, tData.lastPutCard);
            updateArrayData(tData.lastPutCard,2);
        }
        else
        {
            if (MjClient.rePlayVideo == -1)
                RemoveFrontNode(node, "standPri", 2);
            else
                RemoveFrontNode(node, "mjhand_replay", 2, tData.lastPutCard);
        }

        MjClient.playui.CardLayoutRestore(node, off);
        MjClient.playui.CardLayoutRestore(fnode, fromOff[0]);
        ShowEatActionAnim(node, ActionType.PENG, off);
    }

    if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH)
    {
        getCurrentHuCount(off);
    }
    else if(MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
    {
        MjClient.playui.getCurrentHuCount_QuTang(off);
    }
    else
    {
        getCurrentHuCount_changpai(off);
    }
}

// 处理杠
function DealMJGang_changpai(node, msg, off)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_changPai;
    if(uids[selfIndex] != msg.uid)
    {
        return;
    }

    if(msg.gang == 1)//明杠
    {
        var fromOff = [];
        var fromBind = GetUIBind_changpai(msg.from, fromOff);
        var fnode = fromBind._node;
        RemoveNewCardOut(fnode);
        if(off == 0)
        {
            RemoveNodeBack(node, "mjhand", 3, msg.card);
            updateArrayData(msg.card,3);
        }

        MjClient.playui.CardLayoutRestore(fnode, fromOff[0]);
    }
    else if(msg.gang == 2)//碰杠
    {
        RemoveNodeBack(node, "peng", 3, msg.card);
        if(off == 0)
        {
            RemoveNodeBack(node, "mjhand", 1, msg.card);
            updateArrayData(msg.card,1);
         }


    }
    else if(msg.gang == 3)//暗杠
    {
        if(off == 0)
        {
            RemoveNodeBack(node, "mjhand", 4, msg.card);
            updateArrayData(msg.card,4);
        }
    }
    else if(msg.gang == 4)//只有三张牌的龙
    {
        if(off == 0)
        {
            RemoveNodeBack(node, "mjhand", 3, msg.card);
            updateArrayData(msg.card,3);
        }
    }
    else if(msg.gang == 5)//只有2张牌的龙
    {
        if(off == 0)
        {
            RemoveNodeBack(node, "mjhand", 2, msg.card);
            updateArrayData(msg.card,2);
        }
    }


    if(off != 0)
    {
        if(off == 3)
        {
            if(msg.gang == 1)
            {
                var fromOff = [];
                var fromBind = GetUIBind_changpai(msg.from, fromOff);
                var fnode = fromBind._node;
                RemoveNewCardOut(fnode);
                if (MjClient.rePlayVideo == -1)
                    RemoveNodeBack(node, "standPri", 3);
                else
                    RemoveNodeBack(node, "mjhand_replay", 3, msg.card);
            }
            else if(msg.gang == 2)
            {
                RemoveNodeBack(node, "peng", 3, msg.card);
                if (MjClient.rePlayVideo == -1)
                    RemoveNodeBack(node, "standPri", 1);
                else
                    RemoveNodeBack(node, "mjhand_replay", 1, msg.card);
            }
            else if(msg.gang == 3)
            {
                if (MjClient.rePlayVideo == -1)
                    RemoveNodeBack(node, "standPri", 4);
                else
                    RemoveNodeBack(node, "mjhand_replay", 4, msg.card);
            }
        }
        else
        {
            if(msg.gang == 1)
            {
                var fromOff = [];
                var fromBind = GetUIBind_changpai(msg.from, fromOff);
                var fnode = fromBind._node;
                RemoveNewCardOut(fnode);
                if (MjClient.rePlayVideo == -1)
                    RemoveFrontNode(node, "standPri", 3);
                else
                    RemoveFrontNode(node, "mjhand_replay", 3, msg.card);
            }
            else if(msg.gang == 2)
            {
                RemoveFrontNode(node, "peng", 3, msg.card);
                if (MjClient.rePlayVideo == -1)
                    RemoveFrontNode(node, "standPri", 1);
                else
                    RemoveFrontNode(node, "mjhand_replay", 1, msg.card);
            }
            else if(msg.gang == 3)
            {
                if (MjClient.rePlayVideo == -1)
                    RemoveFrontNode(node, "standPri", 4);
                else
                    RemoveFrontNode(node, "mjhand_replay", 4, msg.card);
            }
            else if(msg.gang == 4)
            {
                if (MjClient.rePlayVideo == -1)
                    RemoveFrontNode(node, "standPri", 3);
                else
                    RemoveFrontNode(node, "mjhand_replay", 3, msg.card);
            }
            else if(msg.gang == 5)
            {
                if (MjClient.rePlayVideo == -1)
                    RemoveFrontNode(node, "standPri", 2);
                else
                    RemoveFrontNode(node, "mjhand_replay", 2, msg.card);
            }
        }
    }

    //var offIdx = 0;
    //var pl = sData.players[tData.uids[selfIndex] + ""];
    // var i = pl.pengchigang.gang.length - 1;
    // var idx = tData.uids.indexOf(pl.info.uid);
    // if (i >= 0)
    //     offIdx = (pl.pengchigang.gang[i].pos - idx + 4) % 4 - 1;
    // else
    // {
    //     i = pl.pengchigang.pgang.length-1;
    //     if (i >= 0)
    //         offIdx = (pl.pengchigang.pgang[i].pos - idx + 4) % 4 - 1;
    // }

    cc.log("========张牌的龙66666666666666666666 " + msg.gang);
    if(msg.gang == 4)//3张牌的龙,相当于碰
    {
        cc.log("=======3张牌的龙====================");
        for(var j = 0; j < 3; j++)
        {
            getNewCard_changpai(node, "up", "gang1", msg.card, off);
        }
    }
    else if(msg.gang == 5)//2张牌的龙,相当于碰
    {
        cc.log("========2张牌的龙====================");
        for(var j = 0; j < 2; j++)
        {
            getNewCard_changpai(node, "up", "gang1", msg.card, off);
        }
    }
    else
    {
        for(var j = 0; j < 4; j++)
        {
            /*
             不区分了
             */
            if(msg.gang == 3)//暗杠
            {
                getNewCard_changpai(node, "up", "gang1", msg.card, off);
            }
            else//明杠，补杠
            {
                getNewCard_changpai(node, "up", "gang0", msg.card, off);
            }
        }
    }

    if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH)
    {
        getCurrentHuCount(off);
    }
    else if(MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
    {
        MjClient.playui.getCurrentHuCount_QuTang(off)
    }
    else
    {
        getCurrentHuCount_changpai(off)
    }

    MjClient.playui.CardLayoutRestore(node, off);

    if(MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG){
        ShowEatActionAnim(node, ActionType.GANG, off);
    }else{
        if(tData.tState !== TableState.waitLong)
        {
            ShowEatActionAnim(node, ActionType.GANG, off);
        }
        else
        {
            ShowEatActionAnim(node, ActionType.LONG, off);
        }
    }
}


// 处理等待出牌
function DealWaitPut_changpai(node, msg, off)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_changPai;
    if(tData.curPlayer == selfIndex)
    {
        // cc.log("打印打印"+msg.card);
        if(MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG != MjClient.gameType &&
            MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG != MjClient.gameType &&
            MjClient.GAME_TYPE.BAI_PU_LIN_ZI != MjClient.gameType)//双桨长牌，不显示牌，只显示张数
        {
            if (MjClient.rePlayVideo == -1)//正常打牌流程
            {
                getNewCard_changpai(node, "stand", "standPri");
            }
            else //播放录像
            {
                var pl = getUIPlayer_changpai(off);
                if(pl){
                    getNewCard_changpai(node, "up", "mjhand_replay", pl.mjhand[pl.mjhand.length-1], off);
                }
            }
        }

        MjClient.playui.CardLayoutRestore(node, off);
    }
}

//处理不了裸龙
function DealNoLong_changpai(node,msg)
{

    cc.log("---------DealNoLong_changpai----------");

    var pl = getUIPlayer_changpai(0);
    var _childerns = node.getChildren();
    for(var i = 0;i < _childerns.length;i++)
    {
        if(_childerns[i].name == "mjhand")
        {
            var ci = _childerns[i];
            if(pl.long && pl.long.indexOf(ci.tag) >= 0 )
            {
                ci.setColor(cc.color(255,128,0));
            }
        }
    }
    //
    // MjClient.playui.CardLayoutRestore(getNode_changpai(0),0);
    var eat = MjClient.playui.jsBind.eat;
    eat.luo._node.visible = false;
    eat.noLuo._node.visible = false;

    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var uids = tData.uids;



    for(var off = 0;off < tData.uids.length;off++)
    {
        getCurrentHuCount_changpai(off);
        if(msg)
        {
            var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_changPai;
            if(uids[selfIndex] == msg.uid)
            {
                var _node = getNode_changpai(off);

                if(off != 0)
                {
                    var _longCard = new ccui.ImageView();
                    _longCard.loadTexture("playing/ChangPai/baidi.png");
                    _longCard.setScale(0.8);
                    setCardSprite_changpai(_longCard,msg.card,off);
                    var eatActionNode = _node.getChildByName("play_tips");
                    _longCard.setPosition(eatActionNode.getPosition());

                    if(off == 1)
                    {
                        _longCard.setPositionX(_longCard.getPositionX() - _longCard.getContentSize().width*1.5);
                    }
                    else if(off == 2)
                    {
                        _longCard.setPositionX(_longCard.getPositionX() + _longCard.getContentSize().width*1.5);
                    }

                    MjClient.playui._AniNode.addChild(_longCard);
                    var _btnLong = MjClient.playui._AniNode.getParent().getChildByName("long_btn");
                    var _spawn = cc.spawn(cc.moveTo(1,_btnLong.getPosition()),cc.scaleTo(1,0),cc.fadeOut(1.5));

                    _longCard.runAction(cc.sequence(
                        cc.delayTime(2)
                        ,_spawn
                        // ,cc.scaleTo(0,1)
                        // ,cc.scaleTo(0.2,1.3)
                        // ,cc.scaleTo(0.5,1)
                        ,cc.callFunc(function(){
                            // cc.log("--不咯龙按钮动画----");
                            // _btnLong.runAction(cc.sequence(cc.spawn(cc.tintTo(0.8, 255,0,0),cc.scaleTo(0.9,1 + 0.1)),
                            //     cc.spawn(cc.tintTo(0.6, 255,255,255),cc.scaleTo(0.8,1))).repeatForever());
                        })
                        ,cc.removeSelf()));
                }

                //ShowEatActionAnim(_node, ActionType.LONG, off);
            }
        }
    }
}

//处理花
function HandleMJFlower_changpai(node,msg,off)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var selfIndex=(tData.uids.indexOf(SelfUid())+off)%MjClient.MaxPlayerNum_changPai;
    if( tData.uids[selfIndex]!=msg.uid) return;
    var pl = getUIPlayer_changpai(off);
    if(pl)
    {
        cc.log("播放补花动画");
        if(off==0)
        {
            if(RemoveNodeBack(node, "putOutCard", 1, msg.card) == 0)
            {
                RemoveNodeBack(node, "mjhand", 1, msg.card);
            }

            updateArrayData(msg.card,1);
            showMjhandUIByData();
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
        MjClient.playui.CardLayoutRestore(node,off);
        //MjClient.majiang.setFlowerImg(node, pl);

        /*
            显示花牌
       */
        if(MjClient.gameType == MjClient.GAME_TYPE.RU_GAO ||
            MjClient.gameType == MjClient.GAME_TYPE.RU_GAO_ER)
        {
            getCurrentHuCount_changpai(off);
            showFlowerCard(node,off);
        }
        else if (MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG ||
            MjClient.gameType === MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG ||
            MjClient.gameType === MjClient.GAME_TYPE.BAI_PU_LIN_ZI)
        {
            getCurrentHuCount_changpai(off);
            showFlowerCard_SJ(node,off);
        }
        else if(MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
        {
            MjClient.playui.showflowerCount_QuTang(node, off);
            MjClient.playui.getCurrentHuCount_QuTang(off);
        }
        else
        {
            showflowerCount_changpai(node,off)
            getCurrentHuCount(off);
        }

        ShowEatActionAnim(node,ActionType.FLOWER,off);

        MjClient.movingCard = null;
    }
}

function showFlowerCard_SJ(node,off)
{
    var pl = getUIPlayer_changpai(off);
    var  _flowerCardNode  = node.getChildByName("flowerCardNode");
    if(!_flowerCardNode) return;

    var _childerns = node.getChildren();
    for(var i = 0;i < _childerns.length;i++)
    {
        //cc.log("_childerns[i].name = " + _childerns[i].name);
        if(_childerns[i].name == "ShowflowerCard")
        {
            _childerns[i].removeFromParent();
        }
    }

    //pl.mjflower = [1,2,3];
    for(var i = 0;i < pl.mjflower.length; i++)
    {
        var _cardCopy = _flowerCardNode.clone();
        _cardCopy.visible = true;

        setCardSprite_changpai(_cardCopy,pl.mjflower[i],0);

        if(off == 0)
        {
            _cardCopy.setRotation(90);
            _cardCopy.setPositionX(_flowerCardNode.x  + i*15);
            _cardCopy.y = _flowerCardNode.y;
        }
        else if(off == 1)
        {
            cc.log("game type =  " + MjClient.gameType);
            _cardCopy.setRotation(90 + 180);
            _cardCopy.setPositionX(_flowerCardNode.x  - i*15);
            _cardCopy.zIndex = 20 - i;
            _cardCopy.y = _flowerCardNode.y;
        }
        else
        {
            cc.log("game type =  " + MjClient.gameType);
            _cardCopy.setRotation(90);
            _cardCopy.setPositionX(_flowerCardNode.x  + i*15);
            _cardCopy.y = _flowerCardNode.y;
        }

        _cardCopy.setName("ShowflowerCard");
        node.addChild(_cardCopy);
        ShowEatActionAnim(node,ActionType.FLOWER,off);
        //playEffect("lyg/nv/flower");
        playEffectInPlay("flower");
    }
}

function showFlowerCard(node,off)
{
    var pl = getUIPlayer_changpai(off);
    var  _flowerCardNode  = node.getChildByName("flowerCardNode");
    if(!_flowerCardNode) return;

    var _childerns = node.getChildren();
    for(var i = 0;i < _childerns.length;i++)
    {
        //cc.log("_childerns[i].name = " + _childerns[i].name);
        if(_childerns[i].name == "ShowflowerCard")
        {
            _childerns[i].removeFromParent();
        }
    }


    for(var i = 0;i < pl.mjflower.length; i++)
    {
        var _cardCopy = _flowerCardNode.clone();
        _cardCopy.visible = true;

        setCardSprite_changpai(_cardCopy,pl.mjflower[i],0);

        if(off == 0)
        {
            _cardCopy.setRotation(90);
            _cardCopy.setPositionX(_flowerCardNode.x  + i*20);
            _cardCopy.y = _flowerCardNode.y;
        }
        else
        {
            _cardCopy.setRotation(0);
            _cardCopy.setPositionY(_flowerCardNode.y  - i*15);
            _cardCopy.x = _flowerCardNode.x;
        }

        _cardCopy.setName("ShowflowerCard");
        node.addChild(_cardCopy);
        ShowEatActionAnim(node,ActionType.FLOWER,off);
        //playEffect("lyg/nv/flower");
        playEffectInPlay("flower");
    }
}

function showflowerCount_changpai(node,off)
{
    var pl = getUIPlayer_changpai(off);
    var huaIcon = node.getChildByName("head").getChildByName("flowerIcon");
    huaIcon.visible = true;
    huaIcon.getChildByName("count").setString("×" + pl.mjflower.length);
    if(pl.mjflower.length > 0)
    {
        ShowEatActionAnim(node,ActionType.FLOWER,off);
        //playEffect("lyg/nv/flower");
        playEffectInPlay("flower");

    }
}

function setCurrentTingNum_changpai(tingSet)
{
    var carNumNode = MjClient.playui._tingCardNumNode;
    //如果没有可听的牌
    // cc.log("=========tingSet======== " + tingSet.length);
    // cc.log("=========tingSet======== " + JSON.stringify(tingSet));
    var bHaveValue = false;

    carNumNode.zIndex = 500;
    carNumNode.setAnchorPoint(0,0);
    carNumNode.setContentSize(272, 120);
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

    var BindingNode = carNumNode.getChildByName("Node_card");
    BindingNode.removeAllChildren(true);
    var i=0;
    var j=0;//高的idx
    var width = 70;
    var hight = 120;

    for (var cd in tingSet)
    {
        var cardNode = cardTextNode.clone();
        cardNode.visible = true;
        bHaveValue = true;
        if(i >= 7)
        {
            i = 0;
            j++;
        }

        cardNode.setPositionX(cardTextNode.getPositionX() + width*i*1);//cardTextNode.getContentSize().width*0.5);

        cardNode.setPositionY(cardTextNode.getPositionY() + hight*j*1);//cardTextNode.getContentSize().width*0.5);
        BindingNode.addChild(cardNode);
        var countNode = cardNode.getChildByName("cardCount");
        var icount = getHuCardNum_changpai(parseInt(cd));
        countNode.setString(icount + "");
        setCardSprite_changpai(cardNode.getChildByName("cardNode"), parseInt(cd), 0);
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
    var tingCardHigh   = carNumNode.getContentSize().height + j*hight;
    carNumNode.setContentSize(tingCardsWidth, tingCardHigh);

    //carNumNode.setPositionX(carNumNode.getPositionX() - (i - 1)*width/2 - 50);
}


//求出，此张牌，外面还剩余可胡的张数 by sking
function getHuCardNum_changpai(card)
{
    var icount = 4;//每一种牌总共4张
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;


     if (MjClient.GAME_TYPE.RU_GAO == MjClient.gameType ||
         MjClient.GAME_TYPE.RU_GAO_ER == MjClient.gameType ||
         MjClient.GAME_TYPE.BAI_PU_LIN_ZI == MjClient.gameType)
    {

        var hunCard = MjClient.data.sData.tData.hunCard;
        if (card == hunCard)//系统删了一张牌
        {
            icount = 3;
        }
    }
    else if (MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG == MjClient.gameType || MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG == MjClient.gameTyp)
    {
        var hunCard = MjClient.data.sData.tData.hunCard;
        var hunCard2 = MjClient.data.sData.tData.hunCard2;
        if(card == hunCard && card == hunCard2) //系统删了一张牌
        {
            icount = 2;
        }
        else if((card == hunCard && card != hunCard2)|| (card != hunCard && card == hunCard2)){
            icount = 3;
        }
    }



    for(var off = 0;off < uids.length ;off++)
    {
        var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_changPai;
        var pl = sData.players[tData.uids[selfIndex] + ""];

        //计算出不咯龙的牌
        var longcard = [];
        if(pl.long)
        {
            for(var k = 0; k < pl.long.length;k++)
            {
                if (pl.mjgang1.indexOf(pl.long[k]) < 0)
                {
                    longcard.push(pl.long[k]);
                }
            }
        }

        if (MjClient.GAME_TYPE.RU_GAO == MjClient.gameType ||
            MjClient.GAME_TYPE.RU_GAO_ER == MjClient.gameType ||
            MjClient.GAME_TYPE.BAI_PU_LIN_ZI == MjClient.gameType)
        {
            if(longcard.indexOf(card) >= 0)
            {
                icount -= 4;
            }
        }
        else if (MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG == MjClient.gameType || MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG == MjClient.gameTyp)
        {
            var hunCard = MjClient.data.sData.tData.hunCard;
            var hunCard2 = MjClient.data.sData.tData.hunCard2;
            if(card == hunCard && card == hunCard2) //系统删了一张牌
            {
                if(longcard.indexOf(card) >= 0)  icount -= 4;

            }
            else if((card == hunCard && card != hunCard2)|| (card != hunCard && card == hunCard2)){
                if(longcard.indexOf(card) >= 0) icount -= 4;
            }
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

        // //明杠
        // if(pl.mjgang0.length > 0)
        // {
        //     for (var i = 0; i < pl.mjgang0.length ; i++)
        //     {
        //         if(pl.mjgang0[i] == card)
        //         {
        //             icount -= 4;
        //             break;
        //         }
        //     }
        // }

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


    // var pl = getUIPlayer_changpai(0);
    // var _childerns = node.getChildren();
    // for(var i = 0;i < _childerns.length;i++)
    // {
    //     if(_childerns[i].name == "mjhand")
    //     {
    //         var ci = _childerns[i];
    //         if(pl.long && pl.long.indexOf(ci.tag) >= 0 )
    //         {
    //             ci.setColor(cc.color(255,128,0));
    //         }
    //     }
    // }


    if(icount < 0) icount = 0;

    return icount;
}





//播放牌型动画
function cardRollAction_to(info,cb)
{
    var cardMsg   = info.showCard;
    var _seeUids  = info.seeUids;
    var _isJiang  = info.isJiang;

    //自己是否可见
    var bSee = false;
    for(var i = 0;i < _seeUids.length;i++)
    {
        if(_seeUids[i] == SelfUid())
        {
            bSee = true;
            break;
        }
    }


    var _standX = 285.84;
    var _standY = 38.13;

    var _time = 0.1;
    var cardMsg =  cardMsg;
    var _rollCard = MjClient.playui._showJiangCardBg.getChildByName("cardIcon");
    _rollCard.visible = true;
    _rollCard.y = _standY - _rollCard.getSize().height*1.3;
    _rollCard.setScale(1.5);
    _rollCard.setOpacity(255);
    _rollCard.loadTexture("playing/ChangPai/beimian.png")
    var _scale = _rollCard.getScale();

    var a1 = cc.scaleTo(_time,0,_scale*1);
    var a2 = cc.scaleTo(_time,_scale*1,_scale*1);
    var moveTo = cc.MoveTo(0.2,cc.p(_standX,_standY));
    var scaleto = cc.ScaleTo(0.2,1.16);
    var moveAction = cc.spawn(moveTo,scaleto);

    if(bSee)
    {
        if(_isJiang)
        {
            _rollCard.runAction(cc.sequence(a1,
                cc.callFunc(function(){
                    setCardSprite_changpai(_rollCard,cardMsg, 0);
                })
                ,a2
                ,cc.delayTime(1)
                ,moveAction,
                cc.callFunc(function(){
                    _rollCard.y = _standY;
                    _rollCard.setOpacity(255);
                    _rollCard.visible = true;
                    setCardSprite_changpai(_rollCard,cardMsg, 0);
                })));
        }
        else
        {
            _rollCard.runAction(cc.sequence(a1,
                cc.callFunc(function(){
                    setCardSprite_changpai(_rollCard,cardMsg, 0);
                }),
                a2,
                cc.delayTime(1),
                a1,
                cc.callFunc(function(){
                    _rollCard.loadTexture("playing/ChangPai/beimian.png")
                }),
                a2
                ));
        }
    }
}

//播放牌型动画
function cardRollAction_sj_to(info,cb)
{
    var cardMsg   = info.showCard;
    var _seeUids  = info.seeUids;
    var _isJiang  = info.isJiang;

    //自己是否可见
    var bSee = false;
    for(var i = 0;i < _seeUids.length;i++)
    {
        if(_seeUids[i] == SelfUid())
        {
            bSee = true;
            break;
        }
    }


    // var _standX = 181.68;
    // var _standY = 38.66;
    var _standX = 100;
    var _standY = 35.31;

    cc.log("-----------------qqq-----cardMsg = " + cardMsg);

    var _time = 0.1;
    var _cardMsg0 =  cardMsg[0];
    var _rollCard = MjClient.playui._showJiangCardBg.getChildByName("cardIcon");
    _rollCard.visible = true;
    _rollCard.y = _standY - _rollCard.getSize().height*1.3;
    _rollCard.x = _standX -  _rollCard.getSize().width*0.5;
    _rollCard.setScale(1.5);
    _rollCard.setOpacity(255);
    _rollCard.loadTexture("playing/ChangPai/beimian.png")
    var _scale = _rollCard.getScale();

    var a1 = cc.scaleTo(_time,0,_scale*1);
    var a2 = cc.scaleTo(_time,_scale*1,_scale*1);
    var moveTo = cc.MoveTo(0.2,cc.p(_standX,_standY));
    var scaleto = cc.ScaleTo(0.2,1.16);
    var moveAction = cc.spawn(moveTo,scaleto);

    if(bSee)
    {
        _rollCard.runAction(cc.sequence(a1,
            cc.callFunc(function(){
                setCardSprite_changpai(_rollCard,_cardMsg0, 0);
            })
            ,a2
            ,cc.delayTime(1)
            ,moveAction
            ,cc.callFunc(function(){
                _rollCard.y = _standY;
                _rollCard.setOpacity(255);
                setCardSprite_changpai(_rollCard,_cardMsg0, 0);
                _rollCard.visible = true;
            })));
    }


    //第二张牌
    // var _standX2 = 383.53;
    // var _standY2 = 38.66;
    var _standX2 = 292.00;
    var _standY2 = 35.31;
    var _cardMsg1 =  cardMsg[1];
    var _rollCard2 = MjClient.playui._showJiangCardBg.getChildByName("cardIcon2");
    _rollCard2.visible = true;
    _rollCard2.y = _standY2 - _rollCard2.getSize().height*1.3;
    _rollCard2.x = _standX2 + _rollCard2.getSize().width*0.5;
    _rollCard2.setScale(1.5);
    _rollCard2.setOpacity(255);
    _rollCard2.loadTexture("playing/ChangPai/beimian.png")
    var _scale2 = _rollCard2.getScale();

    var _a1 = cc.scaleTo(_time,0,_scale2*1);
    var _a2 = cc.scaleTo(_time,_scale2*1,_scale2*1);
    var _moveTo = cc.MoveTo(0.2,cc.p(_standX2,_standY2));
    var _scaleto = cc.ScaleTo(0.2,1.16);
    var _moveAction = cc.spawn(_moveTo,_scaleto);

    if(bSee)
    {
        _rollCard2.runAction(cc.sequence(_a1,
            cc.callFunc(function(){
                setCardSprite_changpai(_rollCard2,_cardMsg1, 0);
            })
            ,
            _a2,
            cc.delayTime(1),
            _moveAction,
            cc.callFunc(function(){
                _rollCard2.y = _standY2;
                _rollCard2.setOpacity(255);
                setCardSprite_changpai(_rollCard2,_cardMsg1, 0);
                _rollCard2.visible = true;
            })));
    }

}

//播放牌型动画
function cardRollAction_changpai(info,cb)
{
    if(MjClient.gameType != MjClient.GAME_TYPE.RU_GAO && MjClient.gameType != MjClient.GAME_TYPE.RU_GAO_ER && MjClient.gameType != MjClient.GAME_TYPE.BAI_PU_LIN_ZI)
    {
        return cardRollAction_to(info,cb);
    }

    var cardMsg   = info.showCard;
    var _seeUids  = info.seeUids;
    var _isJiang  = info.isJiang;

    //自己是否可见
    var bSee = false;
    for(var i = 0;i < _seeUids.length;i++)
    {
        if(_seeUids[i] == SelfUid())
        {
            bSee = true;
            break;
        }
    }

    cc.log("====================can see uid = " + JSON.stringify(_seeUids));

   var _standX = 285.84;
   var _standY = 38.13;
   if(MjClient.gameType == MjClient.GAME_TYPE.RU_GAO || MjClient.gameType == MjClient.GAME_TYPE.RU_GAO_ER || MjClient.gameType == MjClient.GAME_TYPE.BAI_PU_LIN_ZI)
   {
       _standX = 95.87;
       _standY = 35.31;
   }

    var _time = 0.1;
    var cardMsg =  cardMsg;
    var _rollCard = MjClient.playui._showJiangCardBg.getChildByName("cardIcon");
    _rollCard.visible = true;
    _rollCard.y = _standY - _rollCard.getSize().height*1.3;
    _rollCard.setScale(1.5);
    _rollCard.setOpacity(255);

    _rollCard.loadTexture("playing/ChangPai/beimian.png")

    setCardSprite_changpai(_rollCard,cardMsg, 0);
    var _scale = _rollCard.getScale();

    var a1 = cc.scaleTo(_time,0,_scale*1);
    var calfuc1 = cc.callFunc(function(){
        setCardSprite_changpai(_rollCard,cardMsg, 0);
    });
    var a2 = cc.scaleTo(_time,_scale*1,_scale*1);

    var moveTo = cc.MoveTo(0.2,cc.p(_standX,_standY));
    var scaleto = cc.ScaleTo(0.2,1.16);
    var moveAction = cc.spawn(moveTo,scaleto);

    if(bSee)
    {
        cc.log("===== can see show ======");
        _rollCard.runAction(cc.sequence(a1,calfuc1,a2,moveAction,cc.callFunc(function(){
            _rollCard.y = _standY;
            _rollCard.setOpacity(255);
            //_rollCard.setScale(1);
            _rollCard.visible = true;
        })));
    }
    else
    {
        cc.log("===== can not  see show ======");
        _rollCard.runAction(cc.sequence(a1,a2,moveAction,cc.fadeOut(0.3),cc.callFunc(function(){
            _rollCard.y = _standY;
            //_rollCard.setScale(1);
            _rollCard.visible = false;
        })));
    }


}

//双将 播放牌型动画
function cardRollAction_changpai_SJ(info,cb)
{
    if(MjClient.gameType != MjClient.GAME_TYPE.RU_GAO && MjClient.gameType != MjClient.GAME_TYPE.RU_GAO_ER)
    {
        return cardRollAction_sj_to(info,cb);
    }

    var cardMsg   = info.showCard;
    var _seeUids  = info.seeUids;
    var _isJiang  = info.isJiang;

    //自己是否可见
    var bSee = false;
    for(var i = 0;i < _seeUids.length;i++)
    {
        if(_seeUids[i] == SelfUid())
        {
            bSee = true;
            break;
        }
    }

    cc.log("====================can see uid = " + JSON.stringify(_seeUids));



    var _time = 0.1;
    var cardMsg =  cardMsg;

    var _standX = 181.68;
    var _standY = 38.66;
    var _rollCard = MjClient.playui._showJiangCardBg.getChildByName("cardIcon");
    _rollCard.visible = true;
    _rollCard.y = _standY - _rollCard.getSize().height*1.3;
    _rollCard.setScale(1.5);
    _rollCard.setOpacity(255);

    _rollCard.loadTexture("playing/ChangPai/beimian.png")

    setCardSprite_changpai(_rollCard,cardMsg[0], 0);
    var _scale = _rollCard.getScale();

    var a1 = cc.scaleTo(_time,0,_scale*1);
    var calfuc1 = cc.callFunc(function(){
        setCardSprite_changpai(_rollCard,cardMsg[0], 0);
    });
    var a2 = cc.scaleTo(_time,_scale*1,_scale*1);

    var moveTo = cc.MoveTo(0.2,cc.p(_standX,_standY));
    var scaleto = cc.ScaleTo(0.2,1.16);
    var moveAction = cc.spawn(moveTo,scaleto);

    if(bSee)
    {
        cc.log("===== can see show ======");
        _rollCard.runAction(cc.sequence(a1,calfuc1,a2,moveAction,cc.callFunc(function(){
            _rollCard.y = _standY;
            _rollCard.setOpacity(255);
            //_rollCard.setScale(1);
            _rollCard.visible = true;
        })));
    }
    else
    {
        cc.log("===== can not  see show ======");
        _rollCard.runAction(cc.sequence(a1,a2,moveAction,cc.fadeOut(0.3),cc.callFunc(function(){
            _rollCard.y = _standY;
            //_rollCard.setScale(1);
            _rollCard.visible = false;
        })));
    }


    //第二张牌
    var _standX2 = 383.53;
    var _standY2 = 38.66
    var _rollCard2 = MjClient.playui._showJiangCardBg.getChildByName("cardIcon2");
    _rollCard2.visible = true;
    _rollCard2.y = _standY2 - _rollCard2.getSize().height*1.3;
    _rollCard2.setScale(1.5);
    _rollCard2.setOpacity(255);

    _rollCard2.loadTexture("playing/ChangPai/beimian.png")

    setCardSprite_changpai(_rollCard2,cardMsg[1], 0);
    var _scale2 = _rollCard2.getScale();

    var _a1 = cc.scaleTo(_time,0,_scale2*1);
    var _calfuc1 = cc.callFunc(function(){
        setCardSprite_changpai(_rollCard2,cardMsg[1], 0);
    });
    var _a2 = cc.scaleTo(_time,_scale2*1,_scale2*1);

    var _moveTo = cc.MoveTo(0.2,cc.p(_standX2,_standY2));
    var _scaleto = cc.ScaleTo(0.2,1.16);
    var _moveAction = cc.spawn(_moveTo,_scaleto);

    if(bSee)
    {
        cc.log("===== can see show ======");
        _rollCard2.runAction(cc.sequence(_a1,_calfuc1,_a2,_moveAction,cc.callFunc(function(){
            _rollCard2.y = _standY2;
            _rollCard2.setOpacity(255);
            //_rollCard.setScale(1);
            _rollCard2.visible = true;
        })));
    }
    else
    {
        cc.log("===== can not  see show ======");
        _rollCard2.runAction(cc.sequence(_a1,_a2,_moveAction,cc.fadeOut(0.3),cc.callFunc(function(){
            _rollCard2.y = _standY2;
            //_rollCard.setScale(1);
            _rollCard2.visible = false;
        })));
    }
}


//设置手牌的样式
function resetCardSpriteType() {
    var pl = getUIPlayer_changpai(0);
    if (!pl ||!pl.mjhand) {
        return;
    }

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if(
        tData.tState != TableState.waitPut &&
        tData.tState != TableState.waitEat &&
        tData.tState != TableState.waitLong &&
        tData.tState != TableState.waitCard
    )
    {
        return;
    }




    for (var k = 0; k < 3; k++) {
        if(!getNode_changpai(k)) continue;
        var _childrens = getNode_changpai(k).getChildren();
        //cc.log("======================================== off =  " + k);
        
        for (var i = 0; i < _childrens.length; i++) {
            if (_childrens[i].name == "mjhand" ||
                _childrens[i].name == "gang0" ||
                _childrens[i].name == "gang1" ||
                _childrens[i].name == "newout" ||
                _childrens[i].name == "outout" ||
                _childrens[i].name == "out0" ||
                _childrens[i].name == "out" ||
                _childrens[i].name == "peng"
            ) {
                setCardSprite_changpai(_childrens[i], _childrens[i].tag);
            }
        }
        MjClient.playui.CardLayoutRestore(getNode_changpai(k),k);

    }

    if (MjClient.playui._showJiangCardBg) {
        var _rollCard = MjClient.playui._showJiangCardBg.getChildByName("cardIcon");
        var HuncardMsg = MjClient.data.sData.tData.hunCard;
        if (HuncardMsg) {
            _rollCard.visible = true;
            setCardSprite_changpai(_rollCard, HuncardMsg);
        }

        var _rollCard2 = MjClient.playui._showJiangCardBg.getChildByName("cardIcon2");
        var HuncardMsg2 = MjClient.data.sData.tData.hunCard2;
        if (HuncardMsg2 && _rollCard2) {
            _rollCard2.visible = true;
            setCardSprite_changpai(_rollCard2, HuncardMsg2);
        }
    }


}

//翻转手牌
var _lastTouchTime = 0;
var _KEY_ROTATE = "_ROTATE_";
MjClient._isRotated = util.localStorageEncrypt.getBoolItem(_KEY_ROTATE,false);//当前牌的是否正立
function resetCardDir()
{
    var _currentTime = new Date().getTime();

    if((_currentTime - _lastTouchTime) < 500)
    {
        return;
    }
    else
    {
        _lastTouchTime =  new Date().getTime();
    }


    var pl = getUIPlayer_changpai(0);
    var _childrens = getNode_changpai(0).getChildren();
    if(pl.mjhand)
    {
        for(var i = 0; i < _childrens.length; i++)
        {
            if(_childrens[i].name == "mjhand")
            {
                var _rotation = _childrens[i].getRotation();
                cc.log("---------------------rotation = " + _rotation);
                if(!MjClient._isRotated)
                {
                    _childrens[i].runAction(cc.RotateTo(0.2,180));
                }
                else
                {
                    _childrens[i].runAction(cc.RotateTo(0.2,0));
                }
            }
        }
    }

    MjClient._isRotated = !MjClient._isRotated;
    util.localStorageEncrypt.setBoolItem(_KEY_ROTATE,MjClient._isRotated);//当前牌的是否正立
}


/*
    获取玩家节点
 */
function getNode_changpai(off)
{
    var _node = null;
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

// 清理ui
function clearCardUI_changpai(node)
{
	//mylog("clearCardUI");
	var children = node.children;
	for(var i = 0; i < children.length; i++)
	{
		var ni = children[i];
		if(ni.name != "head"
			&& ni.name != "up"
			&& ni.name != "down"
			&& ni.name != "stand"
            && ni.name != "stand_0"
			&& ni.name != "out"
            && ni.name != "out0"
            && ni.name != "out1"
            && ni.name != "out2"
            && ni.name != "outBig"
			&& ni.getName() != "ready"
			&& ni.getName() != "play_tips"
			&& ni.getName() != "tai_layout"
            && ni.getName() != "flowerCardNode"
            && ni.getName() != "tingCardNumNode"
            && ni.getName() != "tingCardsNode"
            && ni.getName() != "fangTag"
        )
		{

			ni.removeFromParent(true);
		}
		else if(ni.getName() == "play_tips")
		{
			InitShowEatActionNode(ni.getParent());
		}
		else if(ni.getName() == "out")
        {
            ni.visible = false;
        }
	}

    // var _rollCard = MjClient.playui._showJiangCardBg.getChildByName("cardIcon");
    // _rollCard.visible = false;
    // _rollCard.loadTexture("playing/ChangPai/beimian.png")
    if(MjClient.playui._BtnCardType)
    {
        MjClient.playui._BtnCardType.bSimple = util.localStorageEncrypt.getBoolItem("_CARD_SHOW_TYPE_",true);
        // cc.log("ffffffffffffffffff")
        // MjClient.data.sData.tData.hunCard = null;
    }

    //清楚上一把的牌张数
    for(var off = 0;off < 4;off++)
    {
        var _node = getNode_changpai(off);
        if(_node)
        {
            var _nodeCount = _node.getChildByName("head").getChildByName("cardCount");
            if(_nodeCount)
            {
                var _nodeCount = _nodeCount.getChildByName("text");
                _nodeCount.setString("0");
            }
        }
    }

    if(MjClient.gameType == MjClient.GAME_TYPE.RU_GAO)
    {
        MjClient.ruGao_autoSort = true; //自动理牌还是手动理牌
        MjClient.ruGao_Sort = false; //是否是理牌状态
        var standNode = getNode_changpai(0).getChildByName("stand");
        if(standNode) setWgtLayout(standNode,[0.1, 0.1],[0.95, 0.05],[0, 0.15],true,false);
        MjClient.init_y  = standNode.y;
    }
}

//设置玩家掉线头像
function setUserOffline_changpai(node, off)
{
    var pl = getUIPlayer_changpai(off);
    if(!pl)
    {
        return;
    }

    // 离线自己不可见
    if (off == 0) {
        node.getChildByName("head").getChildByName("offline").visible = false;
        return;
    }

    if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ ) {
        node.getChildByName("head").getChildByName("offline").y = 80;
    }
    node.getChildByName("head").getChildByName("offline").zIndex = 99;
    node.getChildByName("head").getChildByName("offline").visible = !pl.onLine;
}

function getCurrentHuCount(off)
{
    var pl = getUIPlayer_changpai(off);
    if(!pl) return;
    var pengidx = 0;
    var pengScore = 0;
    var minggangScore = 0;
    var angangScore = 0;
    var longScore = 0;
    var flowerScore = 0;
    var sumScore = 0;

    var _node = getNode_changpai(off);

    if(MjClient.rePlayVideo != -1)
    {
        var _huCount = _node.getChildByName("head").getChildByName("huCount");
        _huCount.setString("");
        _huCount.visible = false;
        return "";
    }


    for (var i = 0; i < pl.mjpeng.length; i++) {
        if (pl.long.indexOf(pl.mjpeng[i]) < 0) {//排除龙的情况
            pengidx++;
        }
    }




    //暗杠，要排除龙的
    for (var i = 0; i < pl.mjgang1.length; i++) {
        if (pl.long.indexOf(pl.mjgang1[i]) == -1) {
            angangScore += 30;
        }
    }


    pengScore =  pengidx*5;
    minggangScore = pl.mjgang0.length*20;
    // angangScore = pl.mjgang1.length*30;
    longScore = pl.long.length*40;

    var flowerHuCount = 0;
    switch (pl.mjflower.length)
    {
        case 1:
            flowerHuCount = 10;
            break;
        case 2:
            flowerHuCount = 20;
            break;
        case 3:
            flowerHuCount = 30;
            break;
        case 4:
            flowerHuCount = 40;
            break;
        case 5:
            flowerHuCount = 50;
            break;
        case 6:
            flowerHuCount = 60;
            break;
        case 7:
            flowerHuCount = 70;
            break;
        case 8:
            if(pl.firstFlower8)
            {
                flowerHuCount = 200;
            }
            else {
                flowerHuCount = 160;
            }
            break;
    }

    flowerScore = flowerHuCount;




    sumScore = pengScore + minggangScore + angangScore + longScore + flowerScore;



    var _huCountNode = _node.getChildByName("head").getChildByName("huCount");
    _huCountNode.visible = true;
    _huCountNode.setString(sumScore + "胡");


    return sumScore;
}

function getCurrentHuCount_changpai(off)
{
    var _node = getNode_changpai(off);

    if(MjClient.rePlayVideo != -1)
    {
        var _huCount = _node.getChildByName("head").getChildByName("huCount");
        _huCount.setString("");
        _huCount.visible = false;
        return;
    }

    var pl = getUIPlayer_changpai(off);
    var sumScore = MjClient.majiang.calOutScore(MjClient.data.sData.tData, pl);

    var _huCountNode = _node.getChildByName("head").getChildByName("huCount");
    _huCountNode.visible = true;
    _huCountNode.setString(sumScore + "胡");
}


function setMaizhuangTag(msg,off)
{
    // cc.log("============setMaizhuangTag===========" + JSON.stringify(msg));
    // cc.log("============getUIPlayer_changpai(off).info.uid===========" + getUIPlayer_changpai(off).info.uid);
    var _node = getNode_changpai(off);
    if(_node)
    {
        var _maizhuangNode = _node.getChildByName("head").getChildByName("maizhuang");

        if(msg.uid === getUIPlayer_changpai(off).info.uid)
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
}

//南通的长牌排序要求：条，筒，万
function TagOrder_changpai(na, nb)
{
    var _a = na.tag;
    var _b = nb.tag;

    if((_a > 10 && _a < 20 && _b > 20 && _b < 30 ) || (_b > 10 && _b < 20 && _a > 20 && _a < 30))
    {
        return _b - _a;
    }

    return na.tag - nb.tag;
}

//南通的长牌排序要求：条，筒，万
function TagOrderHand_changpai(_a, _b)
{

    if((_a > 10 && _a < 20 && _b > 20 && _b < 30 ) || (_b > 10 && _b < 20 && _a > 20 && _a < 30))
    {
        return _b - _a;
    }

    return _a - _b;
}


/*
    关于如皋长牌和牌的功能
 */
function delRoomHePai(yes)
{
    //add by sking 没开始牌局 不能和牌 2018.9 .4
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    if(tData.tState != TableState.waitPut && tData.tState != TableState.waitEat && tData.tState != TableState.waitCard)
    {
        return MjClient.showToast("当前不能和牌！");
    }
    // end of by sking


    MjClient.native.doCopyToPasteBoard("");//清空剪切板
    MjClient.gamenet.request("pkroom.handler.tableMsg",{cmd:"DelRoomHePai",yes:yes});
}

function DelRoomHePaiConsent(node,off)
{
	if(!node) return;
	
    var pl=GetDelUserInfo(off);
    if(!pl) return;
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    // node.setFontName("Arial");
    // node.setFontSize(node.getFontSize());
    if(off==0)
    {
        node.setString("玩家["+unescape(pl.info.nickname)+"]申请和牌");
    }
    else
    {
        if(pl.delRoomHePai>0)
        {
            node.setString("玩家["+unescape(pl.info.nickname)+"]同意");
        }
        else if(pl.delRoomHePai==0)
        {
            node.setString("玩家["+unescape(pl.info.nickname)+"]等待选择");
        }
        else if(pl.delRoomHePai<0)
        {
            node.setString("玩家["+unescape(pl.info.nickname)+"]拒绝");
        }
    }
}

function DelRoomHePaiConsent_new(node, off, delPlayer)
{
    var pl = GetDelUserInfo(off);
    if(!node) return;
    if(!pl) {
        node.setVisible(false);
        return;
    }
    node.setVisible(true);
    // node.setFontName("Arial");
    // node.setFontSize(node.getFontSize());
    // 申请解散玩家显示
    if(delPlayer && off == 0)
    {
        node.setString("[" + unescape(pl.info.nickname) + "]");
        return;
    }

    var sData = MjClient.data.sData;
    var tData = sData.tData;

    var name = node.getChildByName("name");
    name.ignoreContentAdaptWithSize(true);
    var tipBgWait = node.getChildByName("tipBg_wait");
    tipBgWait.getChildByName("Text").ignoreContentAdaptWithSize(true);
    var tipBgSure = node.getChildByName("tipBg_sure");
    tipBgSure.getChildByName("Text").ignoreContentAdaptWithSize(true);

    var head = node.getChildByName("headImg");
    // 显示玩家头像
    var url = pl.info.headimgurl;
    if(!url) url="png/default_headpic.png";
    cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
    {
        if(!err && texture && cc.sys.isObjectValid(head))
        {
            var clippingNode = new cc.ClippingNode();
            var maskImg = "home/zhezhao.png";
            var hideblockImg = "home/homeHeadCusPic.png";
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP) {
                maskImg = "home/zhezhao.png";
                hideblockImg = "home/zhezhao_mask.png"
            }
            var mask = new cc.Sprite(maskImg);
            clippingNode.setAlphaThreshold(0);
            clippingNode.setStencil(mask);
            var img = new cc.Sprite(texture);
            img.setScale(mask.getContentSize().width / img.getContentSize().width);
            clippingNode.addChild(img);
            clippingNode.setScale(0.97);
            clippingNode.setPosition(head.getContentSize().width / 2, head.getContentSize().height / 2);
            //遮罩框
            var hideblock = new cc.Sprite(hideblockImg);
            hideblock.setPosition(hideblock.getContentSize().width / 2, hideblock.getContentSize().height / 2);
            head.addChild(clippingNode);
            head.addChild(hideblock);
        }
    });

    
    name.setString(getNewName(unescape(pl.info.nickname)+""));
    name.setFontName("Arial");
    name.setFontSize(name.getFontSize());
    if(pl.delRoomHePai > 0) // 同意
    {
        tipBgWait.visible = false;
        tipBgSure.visible = true;
    }
    else if(pl.delRoomHePai == 0) // 等待选择
    {
        tipBgWait.visible = true;
        tipBgSure.visible = false;
    }
    else if(pl.delRoomHePai < 0) // 拒绝
    {
        tipBgWait.visible = false;
        tipBgSure.visible = false;
    }
}

function setDelRoomVisibleHePai(node)
{
    var pl=getUIPlayer(0);
    node.visible=pl.delRoomHePai==0;
}

function showDelRoomHePaiCountdown_new(node)
{
    var callback = function(){
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var time = sData.serverNow + Date.now();
        var needtime =tData.delEndHePai - time;
        var need_s = Math.floor((needtime / 1000) % 60);
        var need_m = Math.floor((needtime / 1000) / 60);
        if (need_s==1 && need_m==0)
        {
            
			 var pl=getUIPlayer(0);
            if(pl.delRoomHePai == 0)
            {
                delRoomHePai(false);
            }
            node.stopAllActions();
        }
        node.setString("申请和牌，(" + need_m + "分" + need_s + ")后将自动拒绝和牌");
    };
    node.x = node.getParent().width+10;
    node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callback),cc.delayTime(1.0))));
}

//申请解散房间
var RemoveRoomHePaiView = cc.Layer.extend({
    jsBind:{
        back:{
            player0:
                {
                    _event:{DelRoomHePai:function(){ DelRoomHePaiConsent(this,0);  }}
                },
            player1:{
                _event:{DelRoomHePai:function(){ DelRoomHePaiConsent(this,1);  }}
            },
            player2:{
                _event:{DelRoomHePai:function(){ DelRoomHePaiConsent(this,2);  }}
            },
            player3:{
                //_run:function(){ DelRoomConsent(this,3);  },
                _event:{DelRoomHePai:function(){ DelRoomHePaiConsent(this,3);  }}
            },
            yes:{
                _event:{DelRoomHePai:function(){ DelRoomHePaiConsent(this);  }}
            },
            no:{
                _event:{DelRoomHePai:function(){ DelRoomHePaiConsent(this);  }}
            }
        },
        _event:{
            endRoom:function() {MjClient.delroomui.removeFromParent(true); delete MjClient.delroomui; },
            roundEnd:function(){MjClient.delroomui.removeFromParent(true); delete MjClient.delroomui; },
            LeaveGame:function(){MjClient.delroomui.removeFromParent(true); delete MjClient.delroomui; }
        }
    },
    ctor:function () {
        this._super();
        var delroomui = ccs.load("DelRoom.json");
        BindUiAndLogic(delroomui.node,this.jsBind);
        this.addChild(delroomui.node);
        MjClient.delroomui=this;

        /*
         changed by sking
         */
        var _block = delroomui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = delroomui.node.getChildByName("back");
        setWgtLayout(_back,[0.6,0.75],[0.5,0.5],[0,0]);

        var _player0 = _back.getChildByName("player0");
        DelRoomHePaiConsent(_player0,0);
        _player0.ignoreContentAdaptWithSize(true);

        var _player1 = _back.getChildByName("player1");
        DelRoomHePaiConsent(_player1,1);
        _player1.ignoreContentAdaptWithSize(true);

        var _player2 = _back.getChildByName("player2");
        DelRoomHePaiConsent(_player2,2);
        _player2.ignoreContentAdaptWithSize(true);

        var _player3 = _back.getChildByName("player3");
        DelRoomHePaiConsent(_player3,3);
        _player3.ignoreContentAdaptWithSize(true);

        if(MjClient.data.sData.tData.maxPlayer == 2){
            _player3.visible = false;
        }


        //确定解散
        var _yes = _back.getChildByName("yes");
        var pl=getUIPlayer(0);
        cc.log("==========我的和牌。。。===========pl.delRoomHePai =  " + pl.delRoomHePai);
        var _time = _back.getChildByName("time");
        _time.ignoreContentAdaptWithSize(true);
        _time.setColor(cc.color(255,0,0));
        function showDelRoomHePaiCountdown(node)
        {

            var callback = function(){
                var sData =MjClient.data.sData;
                var tData = sData.tData;
                var  time = sData.serverNow + Date.now();
                var  needtime =tData.delEndHePai-time;
                var need_s =Math.floor((needtime /1000)%60);
                var need_m = Math.floor((needtime / 1000) /60);
                if (need_s==1 && need_m==0)
                {
                    cc.log("==========不同意和牌。。。=========== " + pl.delRoomHePai);
                    if(pl.delRoomHePai == 0)
                    {
                        delRoomHePai(false);
                    }
                    node.stopAllActions();
                }
                node.setString(need_m+"分"+need_s+"秒之后未同意将自动拒绝和牌");
            };
            node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callback),cc.DelayTime(1.0))));
        }

        showDelRoomHePaiCountdown(_time);





        setDelRoomVisibleHePai(_yes);
        _yes.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    delRoomHePai(true);

                    break;
                default :
                    break;
            }
        }, this);

        //取消
        var _no = _back.getChildByName("no");
        setDelRoomVisibleHePai(_no);
        _no.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    delRoomHePai(false);
                    break;
                default :
                    break;
            }
        }, this);


        return true;
    }
});

// 新版和牌
var RemoveRoomHePaiView_new = cc.Layer.extend({
    jsBind:{
        back:{
            player0: {
                _event:{DelRoomHePai:function(){ DelRoomHePaiConsent_new(this, 0, true);  }}
            },
            yes: {
                _event:{DelRoomHePai:function(){ DelRoomHePaiConsent_new(this);  }}
            },
            no: {
                _event:{DelRoomHePai:function(){ DelRoomHePaiConsent_new(this);  }}
            },
            item: {
                _visible: false
            },
        },
        _event:{
            endRoom:function() {MjClient.delroomui.removeFromParent(true); delete MjClient.delroomui; },
            roundEnd:function(){MjClient.delroomui.removeFromParent(true); delete MjClient.delroomui; },
            LeaveGame:function(){MjClient.delroomui.removeFromParent(true); delete MjClient.delroomui; }
        }
    },
    ctor:function () {
        this._super();
        var delroomui = ccs.load("DelRoom.json");
        BindUiAndLogic(delroomui.node,this.jsBind);
        this.addChild(delroomui.node);
        MjClient.delroomui=this;

        /*
         changed by sking
         */
        var _block = delroomui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = delroomui.node.getChildByName("back");
        setWgtLayout(_back,[0.65,0.65],[0.5,0.5],[0,0]);

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP) {
            delroomui.node.getChildByName("back").getChildByName("DelRoom_title").setVisible(false);
            delroomui.node.getChildByName("back").getChildByName("hePai_title").setVisible(true);
        }

        var _player0 = _back.getChildByName("player0");
        DelRoomHePaiConsent_new(_player0, 0, true);
        _player0.ignoreContentAdaptWithSize(true);

        var listViewNode = _back.getChildByName("ListView");
        listViewNode.removeAllChildren();
        listViewNode.width = MjClient.data.sData.tData.maxPlayer * 168;
        var playerItem = listViewNode.getParent().getChildByName("item");
        for (var i = 0; i < MjClient.data.sData.tData.maxPlayer; i++) {
            var newitem = playerItem.clone();
            newitem.setName("item"+i);
            listViewNode.pushBackCustomItem(newitem);

            DelRoomHePaiConsent_new(newitem, i);
        }

        var uibind = {
                item0: {
                    _event:{DelRoom:function(){ DelRoomHePaiConsent_new(this,0);  }}
                },
                item1: {
                    _event:{DelRoom:function(){ DelRoomHePaiConsent_new(this,1);  }}
                },
                item2: {
                    _event:{DelRoom:function(){ DelRoomHePaiConsent_new(this,2);  }}
                },
                item3: {
                    _event:{DelRoom:function(){ DelRoomHePaiConsent_new(this,3);  }}
                },
            }
        BindUiAndLogic(listViewNode, uibind);

        var _time = _player0.getChildByName("time");
        _time.ignoreContentAdaptWithSize(true);
        showDelRoomHePaiCountdown_new(_time);

        //确定
        var _yes = _back.getChildByName("yes");
        setDelRoomVisibleHePai(_yes);
        _yes.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    delRoomHePai(true);

                    break;
                default :
                    break;
            }
        }, this);

        //取消
        var _no = _back.getChildByName("no");
        setDelRoomVisibleHePai(_no);
        _no.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    delRoomHePai(false);
                    break;
                default :
                    break;
            }
        }, this);

        return true;
    }
});

// 南通
if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP) {
    RemoveRoomHePaiView = RemoveRoomHePaiView_new;
}

function CheckRoomUiHePaiDelete()
{
    var sData = MjClient.data.sData;
    if(sData.tData.delEnd != 0) return;

    if(sData.tData.delEndHePai != 0 && !MjClient.delroomui)
    {
        MjClient.Scene.addChild(new RemoveRoomHePaiView());
        if (MjClient.webViewLayer != null)
        {
            MjClient.webViewLayer.close();
        }
    }
    else if(sData.tData.delEndHePai == 0 && MjClient.delroomui)
    {
        MjClient.delroomui.removeFromParent(true);
        delete MjClient.delroomui;
    }
    if(MjClient.gemewaitingui){
        MjClient.gemewaitingui.removeFromParent(true);
        delete MjClient.gemewaitingui;
    }
}

// 剩余10张牌，显示为红色，并播放语音"牌不多了~"
function setLeftCard(node)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var leftCards = Number(MjClient.majiang.getAllCardsTotal() - tData.cardNext);
    var color = leftCards > 10 ? cc.color(0xFF, 0xFA, 0x6A) : cc.color(0xF0, 0x3C, 0x24);
    node.setTextColor(color);
    node.setString(leftCards);
    if(leftCards === 10)
    {
        playEffect("leftcards");
    }
}


/*****************************************************************************************************
 *
 *
 *理牌
 *
 *
 ****************************************************************************************************/
/**
 * 比较2个组数是否一样
 * @param array1  第一个数组
 * @param array2  第二个数组
 * @returns {boolean} 返回true 为相同
 */
function isSameArray(array1,array2)
{
    if(array1.sort().toString() == array2.sort().toString()){
        return true;
    }
    return false;
}

/**
 * 重新排列手牌(插牌的动作) by sking 2018.1.8
 * @param card
 */
function resetCardSort(endPos,moveCd)
{

    cc.log("----------------------------000000000000-currentCardArray = " + JSON.stringify(currentCardArray));

    if(!MjClient.ruGao_Sort) return;
    var pl = getUIPlayer_changpai(0);
    var count =  MjClient.majiang.CardCount(pl);
    if(count == 23 && pl.isNew)
    {
        return
    }

    //结束点击的那个数组
    var _endCardArray = [];
    var _node = getNode_changpai(0);
    var stand = _node.getChildByName("stand");
    var standSize = stand.getSize();
    var standS = stand.scale;
    var _CardWith = standSize.width * standS*20; //20表示根据屏幕的宽度最多放下20张牌
    var scaleValue = MjClient.size.width/_CardWith;
    var _onecCardWith = standSize.width * standS * scaleValue;//0.05;
    var children = _node.children;
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            if(endPos.x  > ci.x - _onecCardWith/2 && endPos.x  < ci.x + _onecCardWith/2 )
            {
                _endCardArray.push(ci.tag);
            }
        }
    }
    cc.log("----------------------------1_endCardArray = " + JSON.stringify(_endCardArray));


    if(_endCardArray.length >= 4) return ;

    if(_endCardArray.length == 0) return;

    if(endPos.x > cardBeginPos.x - _onecCardWith/2  && endPos.x < cardBeginPos.x + _onecCardWith/2) return ;


    //起始点击的那个数组
    var _beginCardArray = [];
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            if(cardBeginPos.x  > ci.x - _onecCardWith/2 && cardBeginPos.x  < ci.x + _onecCardWith/2 )
            {
                MjClient.ruGao_autoSort = false;
                //MjClient.showToast("当前为手动理牌模式！");
                ci.setColor(cc.color(0,255,255));
                _beginCardArray.push(ci.tag);
            }
        }
    }
    // MjClient.showToast("当前为手动理牌模式00000000000！");
    cc.log("----------------------------_beginCardArray = " + JSON.stringify(_beginCardArray));

    //重组数组
    var bEndPush = false;
    var bBeginSlice = false;
    for(var i = 0; i < currentCardArray.length ;i++)
    {
        var _typeArray = currentCardArray[i];

        for(var j = 0;j < _typeArray.length;j++)
        {
            var _duiArray = _typeArray[j];
            cc.log("::_duiArray = " + JSON.stringify(_duiArray));
            if(isSameArray(_duiArray,_endCardArray) && !bEndPush)
            {
                _duiArray.push(moveCd);
                _duiArray.sort();
                bEndPush = true;
            }
            else if(isSameArray(_duiArray,_beginCardArray) && !bBeginSlice)
            {
                _duiArray.splice(_duiArray.indexOf(moveCd),1);
                _duiArray.sort();
                bBeginSlice = true;
            }
        }
    }


    if(!bEndPush || !bBeginSlice)
    {
        MjClient.showToast("-------------理牌出bug了");
    }

    cc.log("----------------------------1111-currentCardArray = " + JSON.stringify(currentCardArray));
    //MjClient.ruGao_autoSort = false;
    showMjhandUIByData(currentCardArray);
}


/**
 * 打出去一张牌后，新摸的那张牌的插牌位置
 * @param outCard 打出这张牌的值
 * @param bNewC  是否是打出新摸的这张牌
 */
function resetNewCardSort(outCard,bNewC)
{
    if(!MjClient.ruGao_Sort) return;
    var newTag = -1;
    if(MjClient.newCardTag)
    {
        newTag = MjClient.newCardTag;

        //把新摸的这张牌，从数组删除
        var bfind = false;
        for(var i = 0; i < currentCardArray.length ;i++)
        {
            if(bfind) break;
            var _typeArray = currentCardArray[i];
            for(var j = 0;j < _typeArray.length;j++)
            {
                var _duiArray = _typeArray[j];
                _duiArray.splice(_duiArray.indexOf(newTag),1);
                bfind = true;
                break;
            }
        }
    }
    cc.log(bNewC + "= bNewC==================================currentCardArray = " + JSON.stringify(currentCardArray));

    cc.log("=======resetNewCardSort============newTag = " + newTag);




    if(bNewC) //打出去的是新摸的那张牌
    {
        showMjhandUIByData(currentCardArray);
        return;
    }


    var _node = getNode_changpai(0);
    var stand = _node.getChildByName("stand");
    var standSize = stand.getSize();
    var standS = stand.scale;
    var _CardWith = standSize.width * standS*20; //20表示根据屏幕的宽度最多放下20张牌
    var scaleValue = MjClient.size.width/_CardWith;
    var _onecCardWith = standSize.width * standS * scaleValue;//0.05;
    var children = _node.children;

    if(cardBeginPos)
    {
        var _beginCardArray = [];
        for(var i = 0; i < children.length; i++)
        {
            var ci = children[i];
            if(ci.name == "mjhand" )
            {
                if(cardBeginPos.x  > ci.x - _onecCardWith/2 && cardBeginPos.x  < ci.x + _onecCardWith/2 )
                {
                    _beginCardArray.push(ci.tag);
                }
            }
        }

        _beginCardArray.push(outCard);
        _beginCardArray.sort();
        cc.log("==================================_beginCardArray = " + JSON.stringify(_beginCardArray));



        cc.log("==================================currentCardArray 000000000 = " + JSON.stringify(currentCardArray));
        //把打出的这张牌，从数组中剔除
        var bSplice = false;
        for(var i = 0; i < currentCardArray.length ;i++)
        {
            var _typeArray = currentCardArray[i];
            if(bSplice) break;

            for(var j = 0;j < _typeArray.length;j++)
            {
                var _duiArray = _typeArray[j];
                if(isSameArray(_duiArray,_beginCardArray) && !bSplice)
                {
                    cc.log(outCard + " = outCard 从数组里删除 打出去的一张牌 out cd =  " + JSON.stringify(_duiArray));
                    _duiArray.splice(_duiArray.indexOf(outCard),1);
                    _duiArray.sort();
                    bSplice = true;
                }
            }
        }

        cc.log("==================================currentCardArray 11111111111 = " + JSON.stringify(currentCardArray));

        if(newTag == -1) // 碰，杠后打出一张牌，没有摸新牌
        {
            showMjhandUIByData(currentCardArray);
            return;
        }


        /**
         * 判断这堆牌中是否有四个，三个，二个，顺子，半顺
         * @param CardArray
         */
        function isChengPai(CardArray)
        {
            //是否可能成四个，三个，二个
            var num = 0;
            var canshun = false;
            for(var i = 0;i < CardArray.length;i++)
            {
                if(CardArray[i] == newTag) num++;

                if(CardArray[i] == (newTag - 1) || CardArray[i] == (newTag + 1)){
                    canshun = true;
                    break;
                }
            }
            if(num >= 1 || canshun) return true;

            return false;
        }

        cc.log("==================================currentCardArray 22222222222222222222  = " + JSON.stringify(currentCardArray));

        //newC 的位置放在哪里
        var bfind = false;
        for(var i = 0; i < currentCardArray.length ;i++)
        {
            if(bfind) break;
            var _typeArray = currentCardArray[i];
            for(var j = 0;j < _typeArray.length;j++)
            {
                var _duiArray = _typeArray[j];
                cc.log("::_duiArray = " + JSON.stringify(_duiArray));
                if(_duiArray.length > 0 && _duiArray.length < 4)
                {
                    if(parseInt(_duiArray[0]/10) == parseInt(newTag / 10))
                    {
                        //看能不能组成 四个，三个，二个，顺子，半顺
                        if(isChengPai(_duiArray))
                        {
                            bfind = true;
                            _duiArray.push(newTag);
                            _duiArray.sort();
                            break;
                        }
                    }
                else
                    {
                        continue;
                    }
                }
            }
        }

        if(!bfind)
        {
            cc.log("-----------------------没有找到放置的位置，需要创建新的一列 currentCardArray " + JSON.stringify(currentCardArray));
            var bput= false;
            for(var i = 0; i < currentCardArray.length ;i++)
            {
                if(bput) break;
                var _typeArray = currentCardArray[i];
                for(var j = 0;j < _typeArray.length;j++)
                {
                    var _duiArray = _typeArray[j];
                    if(_duiArray.length > 0 && _duiArray.length < 4)
                    {
                        if(parseInt(_duiArray[0]/10) == parseInt(newTag / 10)) //没找到单独创建一列
                        {
                            var _newArray = [newTag];
                            _typeArray.push(_newArray);
                            bput  = true;
                            break;
                        }
                    }
                }
            }

            //如果这一大类（条 筒 万 ...）都没有, 单独创建一个
            if(!bput)
            {
                var _newArrayArray = [[newTag]];
                currentCardArray.push(_newArrayArray);
            }
        }

        cc.log("==================================currentCardArray 33333333333333333333333  = " + JSON.stringify(currentCardArray));
        showMjhandUIByData(currentCardArray);
    }
}

/**
 * 根据currentCardArray 的数据显示手牌
 */
function showMjhandUIByData(dataArray)
{
    if(!MjClient.ruGao_Sort) return;
    if(!currentCardArray || currentCardArray.length == 0) return;

    if(!dataArray) dataArray = currentCardArray;

    if(dataArray.length <= 0) return;

    cc.log("-----------------------showMjhandUIByData currentCardArray " + JSON.stringify(currentCardArray));

    var stand = getNode_changpai(0).getChildByName("stand");
    setWgtLayout(stand,[1, 1],[0.95, 0],[0, 0],true,false);
    //currentCardArray.reverse();//颠倒顺序

    var pl = getUIPlayer_changpai(0);
    var _node = getNode_changpai(0);
    var children = _node.children;
    var stand = _node.getChildByName("stand");
    var standSize = stand.getSize();
    var standS = stand.scale;
    var _CardWith = standSize.width * standS*20; //20表示根据屏幕的宽度最多放下20张牌
    var scaleValue = MjClient.size.width/_CardWith;
    var _onecCardWith = standSize.width * standS * scaleValue;//0.05;

    //把手牌删除，重新创建手牌UI
    var _handNum = 0;
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            _handNum++;
            ci.removeFromParent();
        }
    }

    var XIdx = 0;
    var isNew = false;
    var count =  MjClient.majiang.CardCount(pl);
    if(count == 23 && pl.isNew)
    {
        isNew = true;
    }

    //顺序排一下,非自动理牌（手动理牌） 不需要重新排序
    if(MjClient.ruGao_autoSort)
    {
        cc.log("----------------------------自动理牌 showMjhandUIByData  = " + JSON.stringify(dataArray));
        for(var m = 0; m < dataArray.length ;m++) {
            orderArray(dataArray[m]);
        }
    }






    for(var m = 0; m < dataArray.length ;m++)
    {
        var _arr = dataArray[m];
        if(isNew && m == 0 && _arr.length > 0){//第0个是新摸的牌，如果存在
            var newCardNode = getNewCard_changpai(_node, "stand", "mjhand",_arr[0], 0);
            newCardNode.setPositionX(cc.winSize.width * 0.92);
            newCardNode.setPositionY(stand.y + _onecCardWith*2);
            // newCardNode.isNewCard = true;
            newCardNode.isNewC = true;
            // cc.log("======================newC============*********自动出牌*********sort****=============");
            // var pl = getUIPlayer_changpai(0);
            // var eat = MjClient.playui.jsBind.eat;
            // if (IsTurnToMe() && pl.isTing && !eat.hu._node.visible && !eat.gang0._node.visible && !eat.gang1._node.visible && !eat.gang2._node.visible && !MjClient.majiang.isCardFlower(pl.newCd))
            // {    cc.log("*********自动出牌*********sort****");
            //     MjClient.playui._btnPutCard.runAction(cc.sequence(cc.delayTime(0.8),
            //         cc.callFunc(function(){
            //             PutOutCard_changpai(newCardNode, newCardNode.tag); //可以出牌
            //         })));
            // }

            continue;
        }

        for(var i =  _arr.length -1; i >= 0;i--)
        {
            var YIdx = 0;
            var _cards = _arr[i];//一堆牌
            if(_cards.length > 0) XIdx++;
            for(var j = _cards.length - 1;j >= 0;j--) //数字排序从上往下一次增大
            {
                YIdx++;
                var cardNode = getNewCard_changpai(_node, "stand", "mjhand",_cards[j], 0);
                cardNode.setPositionX(cc.winSize.width * 0.83 - (XIdx - 1)* _onecCardWith);
                cardNode.setPositionY(stand.y + (YIdx - 1)*_onecCardWith*0.7);
                cardNode.zIndex = 10 - YIdx;
            }
        }
    }


    //手牌变灰后
    var children = _node.children;
    var _handNum = 0;
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            /*
            听牌的时候
            */
            var isGray =  pl.isTing;
            if(MjClient.clickTing)
            {
                // ci.y = MjClient.init_y;
                if (ci.name == "mjhand")
                {
                    if(MjClient.canTingCards[ci.tag])
                    {
                        ci.setColor(cc.color(255, 255, 255));
                        // if (!checkTingUp) {
                        //     ci.y += 20;
                        //     checkTingUp = true;
                        // }
                    }
                    else {
                        ci.setColor(cc.color(190, 190, 190));
                        //hasUp = false;
                    }
                }
                else {
                    ci.setColor(cc.color(255, 255, 255));
                }
            }
            else if(ci.isNewC)
            {
                ci.setColor(cc.color(255, 255, 255));
                SetTouchCardHandler_changpai(stand, ci);
            }
            else if(isGray)
            {
                ci.setColor(cc.color(190, 190, 190));
                ci.addTouchEventListener(function () {});
            }
            else
            {
                ci.setColor(cc.color(255, 255, 255));
                SetTouchCardHandler_changpai(stand, ci);
            }

            _handNum++;
        }
        else if(ci.name == "putOutCard")
        {
            _handNum++;
        }
    }


    // if(_handNum != pl.mjhand.length && !MjClient.ruGao_autoSort)
    // {
    //     MjClient.showToast("_handNum != pl.mjhand.length 改为自动理牌模式了");
    //     MjClient.ruGao_autoSort = true;
    //     MjClient.playui.CardLayoutRestore_auto(getNode_changpai(0),0);
    // }
    //




    DealNoLong_changpai(getNode_changpai(0));
}


/**
 * 排列数组的顺序 by sking 2018.10.11
 * @param _CardArray 二维数组
 */
function orderArray(_CardArray)
{
    if(!MjClient.ruGao_Sort) return;
    for(var i  = 0;i < _CardArray.length;i++)
    {
        for(var j = i + 1;j < _CardArray.length;j++)
        {
            var _arri = _CardArray[i];
            var _arrj = _CardArray[j];
            if(Math.max.apply(null, _arri) > Math.max.apply(null, _arrj))
            {
                //交换
                var tempArray = _CardArray[i];
                _CardArray[i] = _CardArray[j]
                _CardArray[j] = tempArray;
            }
        }
    }
}

/**
 * 从数组currentCardArray 删除dCount个元素cd
 * @param cd 要删除的值
 * @param dCount 个数
 */
function updateArrayData(cd,dCount)
{

    if(!MjClient.ruGao_Sort) return;

    if(!currentCardArray || currentCardArray.length == 0) return;
     cc.log("----------------------------updateArrayData-currentCardArray = " + JSON.stringify(currentCardArray));
    var _count = 0;
    var bfinished = false;
    for(var i = 0; i < currentCardArray.length ;i++) {
        if(bfinished) break;
        var _typeArray = currentCardArray[i];
        for(var j = 0;j < _typeArray.length;j++)
        {
            if(bfinished) break;
            var _cdArray = _typeArray[j];
            for(var m = 0;m < _cdArray.length ;)
            {
                if(cd == _cdArray[m])
                {
                    _cdArray.splice(_cdArray.indexOf(cd),1);
                    _count++;
                    if(_count >= dCount){
                        bfinished = true;
                        break;
                    }
                }
                else
                    m++;
            }
        }
    }
    showMjhandUIByData(currentCardArray);
    cc.log(bfinished + " bfinished----------------------------updateArrayData-currentCardArray0000000000000000 = " + JSON.stringify(currentCardArray));
}


function btnCPLiPai()
{
    var pl = getUIPlayer_changpai(0);

    var children = getNode_changpai(0).children;
    for(var i = 0; i < children.length; i++) {
        if (children[i].name == "mjhand") {
            if (MjClient.majiang.isCardFlower(children[i].tag)) {
                MjClient.movingCard = null;
                return;
            }
        }
    }

    if(MjClient.majiang.isCardFlower(pl.newCd))
    {
        return;
    }




    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if(
        tData.tState != TableState.waitPut &&
        tData.tState != TableState.waitEat &&
        tData.tState != TableState.waitCard
        // tData.tState != TableState.waitLong
    )
    {
        return;
    }


    MjClient.ruGao_Sort = ! MjClient.ruGao_Sort;
    MjClient.ruGao_autoSort = true;
    var standNode = getNode_changpai(0).getChildByName("stand");
    if(MjClient.ruGao_Sort)
    {
        setWgtLayout(standNode,[1, 1],[0.95, 0],[0, 0],true,false);
    }
    else
    {
        setWgtLayout(standNode,[0.1, 0.1],[0.95, 0.05],[0, 0.15],true,false);
    }

    MjClient.init_y  = standNode.y;
    var _node = getNode_changpai(0);
    var children = _node.children;
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            ci.removeFromParent();
        }
    }


    if(pl.mjhand)
    {
        for(var i = 0; i < pl.mjhand.length; i++)
        {
            getNewCard_changpai(getNode_changpai(0), "stand", "mjhand", pl.mjhand[i], 0);
        }
    }
    MjClient.playui.CardLayoutRestore(getNode_changpai(0),0);
}




