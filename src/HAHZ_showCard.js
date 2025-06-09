/**
 * Created by sking on 2017/7/6.
 */

var HAHZ_showCardLayer = cc.Layer.extend({
    setFlowerPos:null,
    ctor:function (showCards,finishCallBack) {
        this._super();
        var showflowerUI = ccs.load("HAHZ_showCard.json");
        this.addChild(showflowerUI.node);
        var that = this;

        var _block =  showflowerUI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);
        var that = this;


        var _back =  showflowerUI.node.getChildByName("back");
        _back.addTouchEventListener(function(sender,type){
            //if(type == 2)
            //{
            //    that.removeFromParent();
            //}
        },this);
        setWgtLayout(_back,[1,1],[0.5,0.5],[0,0],true);

        cc.log("====showCards = "+ JSON.stringify(showCards));
        var cardBingNode = _back.getChildByName("back_bg");


        var tData = MjClient.data.sData.tData ;
        var showZhongNiaoAni = false;
        if((MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) && (
                tData.gameType == MjClient.GAME_TYPE.ML_HONGZHONG ||
                tData.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO ||
                tData.gameType == MjClient.GAME_TYPE.CHEN_ZHOU ||
                tData.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
                tData.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU ||
                tData.gameType == MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG ||
                tData.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN ||
                tData.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG ||
                tData.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
                tData.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ ||
                tData.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
                tData.gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG
            )){
            showZhongNiaoAni = true;
            _block.setOpacity(255*0.7);
            _back.setOpacity(255);
            cardBingNode.loadTexture("gameOver/bird/number_empty.png");
        }
        var birdAnimation = false;
        /*if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP && tData.gameType == MjClient.GAME_TYPE.CHANG_SHA){
            birdAnimation = true;
            _block.setOpacity(0);
            _back.setOpacity(255);
            cardBingNode.loadTexture("gameOver/bird/number_empty.png");
        }*/
        var _cardNode = _back.getChildByName("back_bg").getChildByName("cardNode");
        var _size = _cardNode.getSize();
        var oSc = _cardNode.scale;
        _cardNode.visible = false;

        var _initX = _cardNode.x - ((_size.width * oSc * 0.91)/2)*(showCards.length- 1);

        var _endX =  _initX + _size.width*6 + _size.width;

        function addZhongNiaoStyle(card) {
            var path = "playing/Ani/zhongniao";
            var zhongniao = COMMON_UI.creatFrameAni(path,"zhongniao_",21);
            var offset = 0;
            if( tData.gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG) //益阳麻将牌距离微调
                offset = 5;
            zhongniao.setPositionX(_size.width/2 + offset)
            zhongniao.setPositionY(_size.height/2)
            zhongniao.setScale(oSc)
            card.addChild(zhongniao);
            card.zIndex = 2;
        }

        var time1 = showZhongNiaoAni ? 0.1:0.2;//停留右边时间
        var time2 = showZhongNiaoAni ? 0.25:0.5;//运动时间
        var time3 = showZhongNiaoAni ? 0.75:2;//全部鸟出完后关闭时间

        if(birdAnimation){
            time1 = 0.1;
            time2 = 0.2;
            time3 = 1;
        }
        var fanzhuanActionTime = 0.2;
        var birdSpwanAction;

        // 1、5、9抓牌人中鸟  下家为2、6，对家为3、7，上家为4、8（3人玩法时48为空）
        var niaoToPl = {1: 0, 2: 1, 3: 2, 4: 3, 5: 0, 6: 1, 7: 2, 8: 3, 9: 0};
        for(var i = 0 ; i < showCards.length;i++)
        {
            var _card = _cardNode.clone();
            _card.visible = true;
                setCardSprite(_card,showCards[i], 0);
            if(showZhongNiaoAni){
                //转转麻将上中下鸟不显示光效
                if(tData.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN && tData.areaSelectMode.anzhuang){
                    var cardNum = showCards[i] % 10;

                    if ((tData.zhuang + cardNum + tData.maxPlayer - 1) % tData.maxPlayer == tData.uids.indexOf(SelfUid()))
                    {
                        addZhongNiaoStyle(_card)
                    }
                }
                else if(tData.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN && tData.areaSelectMode.buLunKong){
                    var cardNum = showCards[i] % 10;

                    if ((cardNum + tData.maxPlayer) % tData.maxPlayer == 1)
                    {
                        addZhongNiaoStyle(_card)
                    }
                }
                else if (tData.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ ) 
                {
                    var cardNum = showCards[i] % 10;

                    if ((cardNum + tData.maxPlayer) % tData.maxPlayer == 1)
                    {
                        addZhongNiaoStyle(_card)
                    }
                }
                else if (tData.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ) 
                {
                    if (tData.maxPlayer == 4 || tData.areaSelectMode["zhaniaoRule"] == 4) 
                    {
                        if (showCards[i] <= 29 && showCards[i] % 10 == 1 || showCards[i] % 10 == 5 || showCards[i] % 10 == 9)
                        {
                            addZhongNiaoStyle(_card);
                        }
                    }
                    else if (tData.maxPlayer == 3 && tData.areaSelectMode["zhaniaoRule"] == 3) 
                    {
                        if (showCards[i] <= 29 && showCards[i] % 10 == 1 || showCards[i] % 10 == 4 || showCards[i] % 10 == 7)
                        {
                            addZhongNiaoStyle(_card);
                        }
                    }
                    else if (tData.maxPlayer == 2 && tData.areaSelectMode["zhaniaoRule"] == 2) 
                    {
                        addZhongNiaoStyle(_card);
                    }
                }
                else if (tData.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ)
                {
                    if (tData.maxPlayer == 4) 
                    {
                        if (showCards[i] <= 29 && showCards[i] % 10 == 1 || showCards[i] % 10 == 5 || showCards[i] % 10 == 9)
                        {
                            addZhongNiaoStyle(_card);
                        }
                    }
                    else if (tData.maxPlayer == 3) 
                    {
                        if (showCards[i] <= 29 && showCards[i] % 10 == 1 || showCards[i] % 10 == 4 || showCards[i] % 10 == 7)
                        {
                            addZhongNiaoStyle(_card);
                        }
                    }
                    else if (tData.maxPlayer == 2 && tData.areaSelectMode["zhongniao"] == 1) 
                    {
                        if (showCards[i] <= 29 && showCards[i] % 2 == 1)
                        {
                            addZhongNiaoStyle(_card);
                        }
                    }                
                }
                else if(showCards.length > 1 && tData.gameType == MjClient.GAME_TYPE.ML_HONGZHONG ||
                    tData.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
                    tData.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU ||
                    tData.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO ||
                    tData.gameType == MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG||
                    tData.gameType == MjClient.GAME_TYPE.CHEN_ZHOU||
                    tData.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ ||
                    tData.gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG ||
                    (tData.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN && tData.areaSelectMode.zhuaniao != 1)){
                    if (showCards[i] == 31 || showCards[i] == 71 ||
                        (showCards[i] <= 29 && showCards[i] % 10 == 1 || showCards[i] % 10 == 5 || showCards[i] % 10 == 9))
                    {
                        addZhongNiaoStyle(_card)
                    }
                }else if(tData.gameType == MjClient.GAME_TYPE.CHANG_SHA){
                    for(var j = 0; tData.niaoCards && j < tData.niaoCards.length; j++){
                        if (showCards[i] === tData.niaoCards[j]){
                            addZhongNiaoStyle(_card)
                            break;
                        }
                    }
                }else if(tData.gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG){
                    var sData = MjClient.data.sData;
                    var winPlayer;
                    var winCount = 0;
                    for (var uid in sData.players) {
                        var p = sData.players[uid];
                        if(p.winType > 0){
                            winPlayer = p;
                            winCount++;
                        }
                    }
                    var zhuaNiaoPlayer;
                    if(winCount > 1){
                        zhuaNiaoPlayer = sData.players[tData.uids[tData.lastPutPlayer]];
                    }
                    else
                        zhuaNiaoPlayer = winPlayer;
                    var plZhuaNiaoIndex = tData.uids.indexOf(zhuaNiaoPlayer.info.uid);
                    if (tData.maxPlayer == 4 || tData.maxPlayer == 3 || (tData.maxPlayer == 2 && tData.areaSelectMode.zhongNiaoType == 1)) {
                        var off = niaoToPl[showCards[i] % 10];
                        if (off < tData.maxPlayer) { // 如果抓到鸟
                            var plIndex = (plZhuaNiaoIndex + off) % tData.maxPlayer;
                           if(SelfUid() == tData.uids[plIndex] || (winCount == 1 && plIndex == tData.uids.indexOf(winPlayer.info.uid)) ){
                               addZhongNiaoStyle(_card);
                           }
                        }
                    }
                    // 2人玩法 第二个抓鸟类型 单数中鸟 翻到单数就是胡家中鸟
                    else if (tData.maxPlayer == 2 && tData.areaSelectMode.zhongNiaoType == 2) {
                        if ((showCards[i] % 10) % 2 == 1) {
                            addZhongNiaoStyle(_card);
                        }
                    }
                    // 2人玩法 第三个抓鸟类型 只要是鸟 胡家都中
                    else if (tData.maxPlayer == 2 && tData.areaSelectMode.zhongNiaoType == 3) {
                        addZhongNiaoStyle(_card);
                    }
                }

            }
            cardBingNode.addChild(_card);
            _card.setPositionX(_endX);//每张牌从这个位置开始移动
            _card.opacity = 0;
            _card.index = i;
            _card.setCascadeOpacityEnabled(true);



            if(birdAnimation){
                _card.setPositionX(_initX +  _size.width * oSc * _card.index * 0.91);

                var _card4 = _cardNode.clone();
                _card4.visible = true;
                _card4.loadTexture(getNewMJBgFile("playing/MJ/Mj_04.png"))
                cardBingNode.addChild(_card4);
                _card4.setPosition(_card.getPosition());
                _card4.scale = _card.scale;

                var sp = new cc.Sprite();
                sp.setPosition(_card.getPosition());
                cardBingNode.addChild(sp);
                sp.scale = _card.scale;


                //sp.runAction(cc.sequence(fanzhuanAction,cc.removeSelf()));

                if (birdSpwanAction){
                    birdSpwanAction = cc.sequence(birdSpwanAction,cc.callFunc(function () {
                        this.removeFromParent(true);
                    }.bind(_card4)),cc.callFunc(function () {
                        var fanzhuanAction = cc.animate(that.buildFanZhuanAction());
                        this.runAction(cc.sequence(fanzhuanAction,cc.removeSelf()));
                    }.bind(sp)),cc.delayTime(fanzhuanActionTime),cc.callFunc(function () {
                        this.opacity = 255;
                    }.bind(_card)),cc.callFunc(function(){
                        that.birdAction(this,cardBingNode);
                    }.bind(_card)),cc.delayTime(0.2));
                }else{
                    birdSpwanAction = cc.sequence(cc.callFunc(function () {
                        this.removeFromParent(true);
                    }.bind(_card4)),cc.callFunc(function () {
                        var fanzhuanAction = cc.animate(that.buildFanZhuanAction());
                        this.runAction(cc.sequence(fanzhuanAction,cc.removeSelf()));
                    }.bind(sp)),cc.delayTime(fanzhuanActionTime),cc.callFunc(function () {
                        this.opacity = 255;
                    }.bind(_card)),cc.callFunc(function(){
                        that.birdAction(this,cardBingNode);
                    }.bind(_card)),cc.delayTime(0.2));
                }
                if(i == (showCards.length - 1)){
                    _card.runAction(cc.sequence(birdSpwanAction,cc.delayTime(time3),cc.callFunc(function(){
                        if(finishCallBack)
                            finishCallBack();
                        that.removeFromParent();
                    })));
                }
            }else{
                var fadeAction = cc.fadeIn(time2);
                var moveAction = cc.moveTo(time2,cc.p(_initX +  _size.width * oSc * i * 0.91 ,_card.y));
                var spwanAction = cc.spawn(fadeAction,moveAction);
                if(i == (showCards.length - 1))
                {
                    _card.runAction(cc.sequence(cc.delayTime(i*time1),spwanAction.easing(cc.easeQuinticActionIn(time2)),cc.delayTime(time3),cc.callFunc(function(){
                        if(finishCallBack)
                            finishCallBack();
                        that.removeFromParent();
                    })));
                }
                else
                {
                    _card.runAction(cc.sequence(cc.delayTime(i*time1),spwanAction.easing(cc.easeQuinticActionIn(time2))));
                }
            }

        }


        UIEventBind(null, this, "initSceneData", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "LeaveGame", function()
        {
            that.removeFromParent();
        });
        return true;
    },
    buildFanZhuanAction:function () {
        var anim = new cc.Animation();
        anim.setDelayPerUnit(0.05);
        anim.addSpriteFrameWithFile(getNewMJBgFile("playing/MJ/Mj_04.png"))
        anim.addSpriteFrameWithFile(getNewMJBgFile("playing/MJ/Mj_f02.png"))
        anim.addSpriteFrameWithFile(getNewMJBgFile("playing/MJ/Mj_f03.png"))
        anim.addSpriteFrameWithFile(getNewMJBgFile("playing/MJ/Mj_01.png"))
        return anim;
    },
    //抓鸟显示完之后，鸟的飞行动画
    birdAction: function(cardNode){
        var targetNode = this.getMoveToNode(cardNode.tag);
        if(!targetNode){
            return;
        }


        var birdAnimation = cc.animationCache.getAnimation("bird");
        if(!birdAnimation){
            cc.spriteFrameCache.addSpriteFrames("gameOver/bird/niao.plist");
            var bird1 = cc.spriteFrameCache.getSpriteFrame("niao1.png");
            var bird2 = cc.spriteFrameCache.getSpriteFrame("niao3.png");
            birdAnimation = new cc.Animation([bird1, bird2], 0.1, 10);
            cc.animationCache.addAnimation(birdAnimation, "bird");
        }

        var back_bg =  cardNode.parent;
        var pos = cardNode.getPosition();
        var animate = cc.animate(birdAnimation);
        var birdSprite = new cc.Sprite();
        birdSprite.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("niao1.png"));
        birdSprite.setPosition(pos);
        back_bg.addChild(birdSprite);

        var headNode = targetNode.getChildByName("head");
        var targetPos = targetNode.convertToWorldSpace(headNode.getPosition());
        var nodePos = back_bg.convertToNodeSpace(targetPos);

        //变换方向
        var flipX = false;
        if(nodePos.x > pos.x){
            flipX = true;
            birdSprite.setFlippedX(true);
        }

        //角度变换
        var rotation = Math.atan2(nodePos.y - pos.y,nodePos.x - pos.x)*180/Math.PI;
        if(nodePos.x > pos.x){
            rotation = -rotation;
        }else{
            rotation = 180 - rotation;
        }
        birdSprite.setRotation(rotation);

        //添加粒子效果
        var size = birdSprite.getContentSize();
        var particleSystem = new cc.ParticleSystem("gameOver/bird/particle_texture.plist");
        particleSystem.setScale(1);
        particleSystem.setPosition(cc.p(size.width, size.height/2));
        if(flipX){
            particleSystem.setPosition(cc.p(0, size.height/2));
        }
        birdSprite.addChild(particleSystem,100100);

        var moveAction = cc.moveTo(0.8, nodePos);
        var that = this;
        var funcAction = cc.callFunc(function(){
            birdSprite.removeFromParent(true);
            var yuMaoNode = back_bg.getChildByName("yuMaoNode");
            if(yuMaoNode){
                yuMaoNode.removeFromParent(true);
            }
            yuMaoNode = that.yuMaoAction();
            yuMaoNode.setPosition(nodePos);
            yuMaoNode.setName("yuMaoNode");
            back_bg.addChild(yuMaoNode);
        });
        var reqAction = cc.sequence(moveAction, funcAction);
        var spawnAction = cc.spawn(animate, reqAction);
        birdSprite.runAction(spawnAction);
    },

    //鸟到达之后的羽毛动画
    yuMaoAction: function(){
        var node = new cc.Node();
        var yuanArr = [];
        for(var i = 0;i < 2;i++){
            var yuan = new cc.Sprite();
            yuan.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("yuan.png"));
            yuan.setScale(0.5);
            node.addChild(yuan);
            yuanArr.push(yuan);
        }

        var posArr =
            [
                {scale: 0.5, begin: [-10,20], end: [45,0], control1: [10,25], control2: [25,10]},
                {scale: 0.4, begin: [10,0], end: [-25,-20], control1: [8,-15], control2: [0,-30]},
                {scale: 0.3, begin: [-10,-20], end: [-15,40], control1: [-20,-10], control2: [-20,10]},
            ];
        var yumaoArr = [];
        for(var i = 0;i < 3;i++){
            var yumao = new cc.Sprite();
            var random = Math.floor(Math.random(0,2)) + 1;
            var data = posArr[i];
            yumao.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("yumao"+ random +".png"));
            yumao.setPosition(cc.p(data.begin[0],data.begin[1]));
            yumao.setScale(data.scale);
            node.addChild(yumao);
            yumaoArr.push(yumao);
        }

        var nodeAction = cc.callFunc(function(){
            for(var i = 0;i < yuanArr.length;i++){
                var delayAction = cc.delayTime(i * 0.2);
                var scaleAction = cc.scaleTo(0.5,1.5);
                yuanArr[i].runAction(cc.sequence(delayAction,scaleAction));
            }
            for(var i = 0;i < yumaoArr.length;i++){
                var random = Math.floor(Math.random(0,2));
                var flip = random == 0 ? 1 : -1;
                var data = posArr[i];
                var bezierToAction = cc.bezierTo(0.5,[cc.p(data.control1[0],data.control1[1]),
                    cc.p(data.control2[0],data.control2[1]),
                    cc.p(data.end[0],data.end[1])]);
                var fadeAction = cc.fadeTo(0.5,100);
                var rotationAction = cc.rotateBy(0.5, 150 * flip);
                var scaleAction = cc.scaleTo(0.5, 1);
                var spwanAction = cc.spawn(bezierToAction, rotationAction, scaleAction);
                yumaoArr[i].runAction(spwanAction);
            }
        });
        var nodeDelay = cc.delayTime(0.7);
        var spawnAction = cc.spawn(nodeAction, nodeDelay);
        node.runAction(cc.sequence(spawnAction,cc.callFunc(function(){
            node.removeFromParent(true);
        })));
        return node;
    },

    getMoveToNode: function(cardTag) {
        var tData = MjClient.data.sData.tData;
        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA) {
            for(var i = 0 ; i < 4;i++){
                var pl = getUIPlayer(i)
                if(pl){
                    if (pl.niaoCards && pl.niaoCards.indexOf(cardTag) >= 0){
                        return getNode(i);
                    }
                }
            }

            if (tData.niaoCards && tData.niaoCards.indexOf(cardTag) >= 0){
                return getNode(getOffByIndex(tData.zhuang));
            }
            return null
        }
        return null;
    }
});

var HAHZ_showCardLayer_yongzhou = cc.Layer.extend({
    setFlowerPos:null,
    ctor:function (showCards,finishCallBack) {
        this._super();

        var sData = MjClient.data.sData;
        var tData = sData.tData;


        var showflowerUI = ccs.load("HAHZ_showCard.json");
        this.addChild(showflowerUI.node);
        var that = this;
        MjClient.ShowCardsLayer = this;

        var _block =  showflowerUI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);
        var that = this;


        var _back =  showflowerUI.node.getChildByName("back");
        _back.addTouchEventListener(function(sender,type){
            //if(type == 2)
            //{
            //    that.removeFromParent();
            //}
        },this);
        setWgtLayout(_back,[1,1],[0.5,0.5],[0,0],true);

        cc.log("====showCards = "+ JSON.stringify(showCards));

        var cardBingNode = _back.getChildByName("back_bg");

        var showZhongNiaoAni = false;
        if ((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
            && tData.gameType != MjClient.GAME_TYPE.CHANG_SHA)
        {
            showZhongNiaoAni = true;
            _block.setOpacity(255 * 0.7);
            _back.setOpacity(255);
            cardBingNode.loadTexture("gameOver/bird/number_empty.png");
        }

        var birdAnimation = false;
        var newBirdAnimation = false;

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
            birdAnimation = true;
            newBirdAnimation = true;   //湘乡也能翻牌
            _block.setOpacity(0);
            _back.setOpacity(255);
            cardBingNode.loadTexture("gameOver/bird/number_empty.png");
        }

        if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP
            || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && (tData.gameType == MjClient.GAME_TYPE.CHANG_SHA)){
            newBirdAnimation = true;
            _block.setOpacity(0);
            _back.setOpacity(255);
            cardBingNode.loadTexture("gameOver/bird/number_empty.png");
        }
        var _cardNode = _back.getChildByName("back_bg").getChildByName("cardNode");
        var _size = _cardNode.getSize();
        var oSc = _cardNode.scale;
        _cardNode.visible = false;

        var maxNum  = showCards.length; // 两行取余
        var cardLeng = showCards.length;
        if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
            && tData.gameType == MjClient.GAME_TYPE.TY_HONGZHONG){
            cardLeng = showCards.length > 6 ? 4 : showCards.length;
            maxNum = showCards.length > 6 ? 4 : showCards.length;
            if(showCards.length >= 9){
                maxNum++; cardLeng++;
            }
            cardBingNode.loadTexture("playing/gameTable/empty.png");
        }

        var _initX = _cardNode.x - ((_size.width * oSc * 0.91)/2)*(cardLeng- 1);


        var _endX =  _initX + _size.width*6 + _size.width;

        function addZhongNiaoStyle(card) {
            var path = "playing/Ani/zhongniao";
            var zhongniao = COMMON_UI.creatFrameAni(path,"zhongniao_",21);
            zhongniao.setPositionX(_size.width/2)
            zhongniao.setPositionY(_size.height/2)
            zhongniao.setScale(oSc)
            card.addChild(zhongniao);
            card.zIndex = 2;
        }
        var fanzhuanActionTime = 0.4;
        var flyDelayTime = 0.3;
        var birdSpwanAction;
        if(MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ){
            fanzhuanActionTime = 0.2;
            flyDelayTime = 0.1;
        }
        else if(newBirdAnimation){
            fanzhuanActionTime = 0.2;
            flyDelayTime = 0.2;
        }

        for(var i = 0 ; i < showCards.length;i++)
        {
            var _card = _cardNode.clone();
            _card.visible = true;
            setCardSprite(_card,showCards[i], 0);

            if (showZhongNiaoAni) {
                //转转麻将上中下鸟不显示光效
                if (showCards.length > 1 &&
                    ((tData.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN && tData.areaSelectMode.zhuaniao != 1) ||
                    tData.gameType == MjClient.GAME_TYPE.TY_HONGZHONG)) 
                {
                    if (showCards[i] == 71 ||
                        (showCards[i] <= 29 && showCards[i] % 10 == 1 || showCards[i] % 10 == 5 || showCards[i] % 10 == 9)) 
                    {
                        addZhongNiaoStyle(_card)
                    }
                } else if (tData.gameType == MjClient.GAME_TYPE.CHANG_SHA) {
                    if (tData.niaoCards && tData.niaoCards.indexOf(showCards[i]) >= 0)
                        addZhongNiaoStyle(_card);
                } else if(tData.gameType == MjClient.GAME_TYPE.XIN_NING_MA_JIANG || 
                    tData.gameType == MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG)
                {
                    var count = 0;
                    for(var uid in sData.players){
                        var player = sData.players[uid];
                        if(player.winType > 0){
                            count++;
                        }
                    }
                    if(count > 1){
                        var zhongIndex = MjClient.majiang.getNiaoIsShow(showCards[i]);
                        var selfIndex = tData.uids.indexOf(SelfUid());
                        if(zhongIndex == selfIndex){
                            addZhongNiaoStyle(_card);
                        }
                    }else{
                        if(showCards[i] % 10 == 1 || showCards[i] % 10 == 5 || showCards[i] % 10 == 9 || showCards[i] > 30 ){
                            addZhongNiaoStyle(_card);
                        }
                    }
                }else if(tData.gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG){
                    if(showCards[i] % 10 == 1 || showCards[i] % 10 == 5 || showCards[i] % 10 == 9){
                        addZhongNiaoStyle(_card);
                    }
                }
                else if(tData.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG){
                    var selectIndex = (tData.zhuang + showCards[i] % 10 + tData.maxPlayer - 1) % tData.maxPlayer;
                    if(tData.areaSelectMode.zhuaniaovalue){
                        if(showCards[i] % 10 == 1 || showCards[i] % 10 == 5 || showCards[i] % 10 == 9){
                            addZhongNiaoStyle(_card);
                        }
                    }else if(selectIndex == tData.uids.indexOf(SelfUid())){
                        addZhongNiaoStyle(_card);
                    }
                }
            }

            cardBingNode.addChild(_card);
            _card.setPositionX(_endX);//每张牌从这个位置开始移动
            _card.opacity = 0;
            _card.index = i;
            _card.setCascadeOpacityEnabled(true);

            var delTime = 0.2; // 间隔时间
            var actTime = 0.5;
            var moveTime = 0.5; // 移动和显示出来的时间 秒为单位
            var stayTime = 2;//停留时间
            
            if(MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG){
                delTime = 0.5; // 间隔时间
                actTime = 1;
                moveTime = 0.6 - (0.05 * i); // 移动和显示出来的时间 秒为单位
            } 

            if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ || newBirdAnimation){
                delTime = 0.1;
                actTime = 0.2;
                moveTime = 0.2;
                stayTime = 1;
            }
            
            if (showZhongNiaoAni) {
                delTime = 0.1;
                moveTime = 0.25;
                stayTime = 0.75;
            }
            if(newBirdAnimation){
                _card.setPositionX(_initX +  _size.width * oSc * _card.index * 0.91);

                var _card4 = _cardNode.clone();
                _card4.visible = true;
                _card4.loadTexture(getNewMJBgFile("playing/MJ/Mj_04.png"))
                cardBingNode.addChild(_card4);
                _card4.setPosition(_card.getPosition());
                _card4.scale = _card.scale;

                var sp = new cc.Sprite();
                sp.setPosition(_card.getPosition());
                cardBingNode.addChild(sp);
                sp.scale = _card.scale;


                //sp.runAction(cc.sequence(fanzhuanAction,cc.removeSelf()));

                if (birdSpwanAction){
                    birdSpwanAction = cc.sequence(birdSpwanAction,cc.callFunc(function () {
                        this.removeFromParent(true);
                    }.bind(_card4)),cc.callFunc(function () {
                        var fanzhuanAction = cc.animate(that.buildFanZhuanAction());
                        this.runAction(cc.sequence(fanzhuanAction,cc.removeSelf()));
                    }.bind(sp)),cc.delayTime(fanzhuanActionTime),cc.callFunc(function () {
                        this.opacity = 255;
                    }.bind(_card)),cc.callFunc(function(){
                        that.birdAction(this.index,cardBingNode);
                    }.bind(_card)),cc.delayTime(flyDelayTime));
                }else{
                    birdSpwanAction = cc.sequence(cc.callFunc(function () {
                        this.removeFromParent(true);
                    }.bind(_card4)),cc.callFunc(function () {
                        var fanzhuanAction = cc.animate(that.buildFanZhuanAction());
                        this.runAction(cc.sequence(fanzhuanAction,cc.removeSelf()));
                    }.bind(sp)),cc.delayTime(fanzhuanActionTime),cc.callFunc(function () {
                        this.opacity = 255;
                    }.bind(_card)),cc.callFunc(function(){
                        that.birdAction(this.index,cardBingNode);
                    }.bind(_card)),cc.delayTime(flyDelayTime));
                }
                if(i == (showCards.length - 1)){
                    _card.runAction(cc.sequence(birdSpwanAction,cc.delayTime(stayTime),cc.callFunc(function(){
                        if(finishCallBack)
                            finishCallBack();
                        that.removeFromParent();
                        MjClient.ShowCardsLayer = null;
                    })));
                }
            }else{
                var fadeAction = cc.fadeIn(moveTime);
                var moveAction = cc.moveTo(moveTime,cc.p(_initX +  _size.width * oSc * i * 0.91,_card.y));


                if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
                    && tData.gameType == MjClient.GAME_TYPE.TY_HONGZHONG && showCards.length >6){
                    var subLineY = i >= maxNum ? 1 : -1;
                    moveAction = cc.moveTo(moveTime,cc.p(_initX +  _size.width * oSc * (i % maxNum) * 0.91,
                        _card.y - (_card.height / 2 * subLineY)  ));
                }
                var spwanAction = cc.spawn(fadeAction,moveAction);

                if(birdAnimation){
                    var pos = cc.p(_initX +  _size.width * oSc * i * 0.91 ,_card.y);
                    spwanAction = cc.sequence(spwanAction,cc.callFunc(function(){
                        that.birdAction(parseInt(this), cardBingNode);
                    }.bind(i)));
                }


                if(i == (showCards.length - 1))
                {
                    _card.runAction(cc.sequence(cc.delayTime(i*delTime),spwanAction.easing(cc.easeQuinticActionIn(actTime)),cc.delayTime(stayTime),cc.callFunc(function(){
                        if(finishCallBack)
                            finishCallBack();
                        that.removeFromParent();
                        MjClient.ShowCardsLayer = null;
                    })));
                }
                else
                {
                    _card.runAction(cc.sequence(cc.delayTime(i*delTime),spwanAction.easing(cc.easeQuinticActionIn(actTime))));
                }
            }

        }


        UIEventBind(null, this, "initSceneData", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "LeaveGame", function()
        {
            that.removeFromParent();
        });
        return true;
    },
    buildFanZhuanAction:function () {
        var anim = new cc.Animation();
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
            anim.setDelayPerUnit(0.05);
        }else{
            anim.setDelayPerUnit(0.05);
        }
        anim.addSpriteFrameWithFile(getNewMJBgFile("playing/MJ/Mj_04.png"))
        anim.addSpriteFrameWithFile(getNewMJBgFile("playing/MJ/Mj_f02.png"))
        anim.addSpriteFrameWithFile(getNewMJBgFile("playing/MJ/Mj_f03.png"))
        anim.addSpriteFrameWithFile(getNewMJBgFile("playing/MJ/Mj_01.png"))
        return anim;
    },
    //抓鸟显示完之后，鸟的飞行动画

    birdAction: function(index, backBg){
        var nodeArr = backBg.getChildren();
        var cardNode = nodeArr[index + 1];
        if(!cardNode){
            return;
        }

        var targetNode = this.getMoveToNode(cardNode.tag);
        if(!targetNode){
            return;
        }


        var birdAnimation = cc.animationCache.getAnimation("bird");
        var frameTime = 0.1;
        if(MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ){
            frameTime = 0.07;
        }

        if(!birdAnimation){
            cc.spriteFrameCache.addSpriteFrames("gameOver/bird/niao.plist");
            var bird1 = cc.spriteFrameCache.getSpriteFrame("niao1.png");
            var bird2 = cc.spriteFrameCache.getSpriteFrame("niao3.png");
            birdAnimation = new cc.Animation([bird1, bird2], frameTime, 10);
            cc.animationCache.addAnimation(birdAnimation, "bird");
        }

        var back_bg =  cardNode.parent;
        var pos = cardNode.getPosition();
        var animate = cc.animate(birdAnimation);
        var birdSprite = new cc.Sprite();
        birdSprite.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("niao1.png"));
        birdSprite.setPosition(pos);
        back_bg.addChild(birdSprite);  

        var headNode = targetNode.getChildByName("head");
        var targetPos = targetNode.convertToWorldSpace(headNode.getPosition());
        var nodePos = back_bg.convertToNodeSpace(targetPos);        

        //变换方向
        var flipX = false;
        if(nodePos.x > pos.x){
            flipX = true;
            birdSprite.setFlippedX(true);
        }

        //角度变换
        var rotation = Math.atan2(nodePos.y - pos.y,nodePos.x - pos.x)*180/Math.PI;
        if(nodePos.x > pos.x){
            rotation = -rotation;
        }else{
            rotation = 180 - rotation;
        }
        birdSprite.setRotation(rotation);

        //添加粒子效果
        var size = birdSprite.getContentSize();
        var particleSystem = new cc.ParticleSystem("gameOver/bird/particle_texture.plist"); 
        particleSystem.setScale(1);
        particleSystem.setPosition(cc.p(size.width, size.height/2));
        if(flipX){
            particleSystem.setPosition(cc.p(0, size.height/2));
        }      
        birdSprite.addChild(particleSystem,100100);

        var moveAction = cc.moveTo(0.8, nodePos);
        var that = this;
        var funcAction = cc.callFunc(function(){
            birdSprite.removeFromParent(true);
            var yuMaoNode = back_bg.getChildByName("yuMaoNode");
            if(yuMaoNode){
                yuMaoNode.removeFromParent(true);
            }
            yuMaoNode = that.yuMaoAction();
            yuMaoNode.setPosition(nodePos);
            yuMaoNode.setName("yuMaoNode");
            back_bg.addChild(yuMaoNode);
        });
        var reqAction = cc.sequence(moveAction, funcAction);
        var spawnAction = cc.spawn(animate, reqAction);
        birdSprite.runAction(spawnAction);
    },

    //鸟到达之后的羽毛动画
    yuMaoAction: function(){
        var node = new cc.Node();
        var yuanArr = [];
        for(var i = 0;i < 2;i++){
            var yuan = new cc.Sprite();
            yuan.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("yuan.png"));
            yuan.setScale(0.5);
            node.addChild(yuan);
            yuanArr.push(yuan);
        }

        var posArr = 
        [   
            {scale: 0.5, begin: [-10,20], end: [45,0], control1: [10,25], control2: [25,10]},
            {scale: 0.4, begin: [10,0], end: [-25,-20], control1: [8,-15], control2: [0,-30]},
            {scale: 0.3, begin: [-10,-20], end: [-15,40], control1: [-20,-10], control2: [-20,10]},
        ];
        var yumaoArr = [];
        for(var i = 0;i < 3;i++){
            var yumao = new cc.Sprite();
            var random = Math.floor(Math.random(0,2)) + 1;
            var data = posArr[i];
            yumao.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("yumao"+ random +".png"));
            yumao.setPosition(cc.p(data.begin[0],data.begin[1]));
            yumao.setScale(data.scale);
            node.addChild(yumao);
            yumaoArr.push(yumao);
        }

        var nodeAction = cc.callFunc(function(){
            for(var i = 0;i < yuanArr.length;i++){
                var delayAction = cc.delayTime(i * 0.2);
                var scaleAction = cc.scaleTo(0.5,1.5);
                yuanArr[i].runAction(cc.sequence(delayAction,scaleAction));
            }
            for(var i = 0;i < yumaoArr.length;i++){
                var random = Math.floor(Math.random(0,2));
                var flip = random == 0 ? 1 : -1;
                var data = posArr[i];
                var bezierToAction = cc.bezierTo(0.5,[cc.p(data.control1[0],data.control1[1]),
                        cc.p(data.control2[0],data.control2[1]),
                        cc.p(data.end[0],data.end[1])]);
                var fadeAction = cc.fadeTo(0.5,100);
                var rotationAction = cc.rotateBy(0.5, 150 * flip);
                var scaleAction = cc.scaleTo(0.5, 1);
                var spwanAction = cc.spawn(bezierToAction, rotationAction, scaleAction);
                yumaoArr[i].runAction(spwanAction);
            }            
        });
        var nodeDelay = cc.delayTime(0.7);
        var spawnAction = cc.spawn(nodeAction, nodeDelay);
        node.runAction(cc.sequence(spawnAction,cc.callFunc(function(){
            node.removeFromParent(true);
        })));
        return node;
    },

    getMoveToNode: function(cardTag){
        var tData = MjClient.data.sData.tData;
        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA) {
            for(var i = 0 ; i < 4;i++){
                var pl = getUIPlayer(i)
                if(pl){
                    if (pl.niaoCards && pl.niaoCards.indexOf(cardTag) >= 0){
                        return getNode(i);
                    }
                }
            }

            if (tData.niaoCards && tData.niaoCards.indexOf(cardTag) >= 0){
                return getNode(getOffByIndex(tData.zhuang));
            }
            return null
        }
        var selectIndex = -1;
        if(MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN && tData.areaSelectMode.anzhuang){
            var cardNum = cardTag % 10;
            selectIndex = (tData.zhuang + cardNum + tData.maxPlayer - 1) % tData.maxPlayer;

        }else if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ && 
            (MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN && tData.areaSelectMode.zhuaniao == 10 || 
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG && tData.areaSelectMode.zhuaniao == 1)){

            selectIndex = tData.winner;
        }else{
            if (cardTag == 71 ||
                (cardTag <= 29 && cardTag % 10 == 1 || cardTag % 10 == 5 || cardTag % 10 == 9)) 
            {
                selectIndex = tData.winner;
            }
        }
        if(selectIndex == -1){
            return null;
        }
        var selfIndex = tData.uids.indexOf(SelfUid());
        var off = (selectIndex - selfIndex + tData.maxPlayer) % tData.maxPlayer;
        off = getOffForPlayerNum(off);
        return getNode(off);
    }
});

if(isYongZhouProject()){
    HAHZ_showCardLayer = HAHZ_showCardLayer_yongzhou;
}