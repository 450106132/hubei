
/* ======================================
 *  放一些UI共用的方法 2018.4.24  by sking
 *  ====================================== */
var COMMON_UI = COMMON_UI || {}
COMMON_UI.cardBetween = 1.2;
COMMON_UI.chipenggangBetween = 1.0; //吃碰杠牌间距

if (MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) {
    COMMON_UI.isPutScale = util.localStorageEncrypt.getBoolItem("_OUT_TYPE_ENLARGE", true); //出牌是否需要放大效果
    COMMON_UI.isChaPai   = util.localStorageEncrypt.getBoolItem("_OUT_TYPE_INSERT", true); //是否需要需要插牌动画
} else {
    COMMON_UI.isPutScale = util.localStorageEncrypt.getBoolItem("AnimChuPai", false); //出牌是否需要放大效果
    COMMON_UI.isChaPai   = util.localStorageEncrypt.getBoolItem("AnimChaPai", false); //是否需要需要插牌动画
}

/* 主界面添加退出按钮*/
COMMON_UI.addExitGame = function(homeUINode)
{

    var _BtnRuturn = homeUINode.getChildByName("ExitBtnRuturn");
    if(!_BtnRuturn)
    {
        _BtnRuturn = new ccui.Button("hall/back_1.png");
        _BtnRuturn.setName("ExitBtnRuturn");

        if(homeUINode.getChildByName("tilebg"))
        {
            homeUINode.getChildByName("tilebg").addChild(_BtnRuturn);
             // 新年元素版本 UI
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ
                || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ
                || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ
            ) {
                _BtnRuturn.setPosition(cc.p(55,45));
            }
            else {
                _BtnRuturn.setPosition(cc.p(55,69.91));
            }
        }
        else
        {
            homeUINode.addChild(_BtnRuturn);
            setWgtLayout(_BtnRuturn, [0.12, 0.12], [0.05, 0.95], [0, 0]);
        }
    }

    ////头像
    var _headbg = homeUINode.getChildByName("headbg");
    if (_headbg && MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
        setWgtLayout(_headbg, [0.078, 0.14], [0.045, 0.988], [0, 0]);
    }
    else if (_headbg) {
        setWgtLayout(_headbg, [0.078, 0.14], [0.11, 0.998], [0, 0]);
    }

    //返回主界面
    _BtnRuturn.addTouchEventListener(function(sender, Type) {
        switch (Type) {
            case ccui.Widget.TOUCH_ENDED:
                showExitGameLayer();
                break;
            default:
                break;
        }
    }, this);
} 

/*
    主界面文字：绿色游戏，禁止赌博
*/
COMMON_UI.addHintText = function(homeUINode)
{
    cc.log("===================绿色游戏，禁止赌博===============");
    var _hintText = homeUINode.getChildByName("hintText");
    if(!_hintText)
    {
        _hintText = new ccui.Text();
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) {//岳阳同一使用方正兰亭
            _hintText.setFontName("fonts/lanting.TTF");
        }else{
            _hintText.setFontName(MjClient.fzcyfont);
        }
        _hintText.setFontSize(16);
        _hintText.setColor(cc.color(255,255,255));
        _hintText.setName("hintText");
        _hintText.setString("绿色游戏 禁止赌博");
        _hintText.setAnchorPoint(0,0.5);
        homeUINode.addChild(_hintText);
    }
    if (_hintText && MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
        setWgtLayout(_hintText, [0.13, 0.13], [0.01, 0.835], [0, 0]);
        _hintText.setFontName("fonts/lanting.TTF");
    }
    else if (_hintText && MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
        // 不执行这函数
    }
    else if (_hintText) {
        if(MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ ||
            MjClient.getAppType() === MjClient.APP_TYPE.QXHAMJ ||
            MjClient.getAppType() === MjClient.APP_TYPE.QXXZMJ){
            setWgtLayout(_hintText, [0.13, 0.13], [0.09, 0.83], [0, 0]);
        }else {
            setWgtLayout(_hintText, [0.13, 0.13], [0.03, 0.82], [0, 0]);
        }
    }
}

COMMON_UI.createPokerLookbackView = function () {
    var Layer = cc.Layer.extend({
        _popView:null,
        jsBind: {
            _event: {
                mjhand: function () {
                    this.setVisible(true)
                },
                roundEnd:function () {
                    this.setVisible(false)
                },
                initSceneData: function(d) {
                    if (d.tData.tState == TableState.waitPut){
                        this.setVisible(true)
                    }
                }
            }
        },
        ctor: function() {
            this._super();
            this.setVisible(false)
            var btnLookBack = new ccui.Button();

            btnLookBack.setTouchEnabled(true);

            btnLookBack.setPressedActionEnabled(true);

            btnLookBack.loadTextures("playing/paodekuaiTable/lookBackNormal.png","playing/paodekuaiTable/lookBackSelected.png","");

            btnLookBack.addTouchEventListener(this.onBtnLookBackClicked.bind(this),this);

            btnLookBack.setScaleX(MjClient.size.width / 1280)
            btnLookBack.setScaleY(MjClient.size.height / 720)

            btnLookBack.setPosition(MjClient.size.width / 2 - (160 / 1280 * MjClient.size.width),- 60 / 720 * MjClient.size.height)

            this.addChild(btnLookBack,0,"btnLookBack");

            // pop
            var popView = cc.Sprite.create("playing/paodekuaiTable/lookBackPop.png");
            popView.y = 25 / 1280 * MjClient.size.height
            popView.setContentSize(520 / 1280 * MjClient.size.width, 288 / 720 * MjClient.size.height)
            this.addChild(popView)
            popView.setVisible(false)
            this._popView = popView

            BindUiAndLogic(this, this.jsBind);
        },
        onBtnLookBackClicked : function(sender,type){
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:{
                    if (!this._popView.isVisible()){

                        var actionRecord = MjClient.data.sData.tData.actionRecord || [];
                        // actionRecord = [
                        //     {id:"1000022",mjput : [11,9,36,11,9,36,11,9,36,11,9,36]},
                        //     {id:"1000022",mjput : [11,9,36,11,9,36,11,9,36,11,9,36]},
                        //     {id:"1000022",mjput : [11,9,36,11,9,36,11,9,36,11,9,36]},
                        // ]
                        var players = MjClient.data.sData.players
                        var itemViewModels = []
                        for (var i = 0;i < actionRecord.length;i++){
                            var player = players[actionRecord[i].id]
                            itemViewModels.push({
                                nickname:player.info.nickname,
                                cards:actionRecord[i].mjput
                            })
                        }
                        if (!itemViewModels || itemViewModels.length == 0){
                            // 弹出toast
                            MjClient.showToast("暂无回看信息");
                            return
                        }
                        this.popUp(itemViewModels)
                    }
                }
            }
        },
        popUp:function (itemViewModels) {
            //监听器
            var that = this
            this._listener = new cc.EventListener.create({

                event: cc.EventListener.TOUCH_ONE_BY_ONE,

                swallowTouches: false,

                onTouchBegan: function(touch, event)

                {
                    cc.log("popUp onTouchBegan======")
                    var target = that._popView
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());

                    var size = target.getContentSize();
                    var rect = cc.rect(0, 0, size.width, size.height);
                    // 在黑色框外点击消失，黑色框内不响应任何事件
                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        return true;
                    }else {
                        that.disMiss()
                        return true;
                    }
                }
            },this);
            //添加触摸监听
            cc.eventManager.addListener(this._listener, this);
            this._listener.setSwallowTouches(true);
            this.setContent(itemViewModels)
            this._popView.setVisible(true)
            this.setLocalZOrder(99999)
        },
        disMiss:function () {
            this._popView.setVisible(false)
            this.setLocalZOrder(12)
            var that = this
            cc.log("dismiss=====")
            if (this._listener) {
                cc.log("remove listener=====")
                this.scheduleOnce(function(){
                    that._listener.setSwallowTouches(false);
                    cc.eventManager.removeListener(that._listener);
                    that._listener = null
                },0);
            }
        },
        createPopItemView:function (item,size) {
            var node = new cc.Node()
            node.setAnchorPoint(0,0.5)

            var lbName = new ccui.Text(unescape(item.nickname),"Thonburi",18)
            // if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {//岳阳同一使用方正兰亭
            //     lbName.setFontName("fonts/lanting.TTF");
            // }
            lbName.setColor(cc.color(254,245,217))
            lbName.setAnchorPoint(0,0)
            node.addChild(lbName)

            var marginLeft = 72 / 1280 * MjClient.size.width
            // var pokerWidth = 62 / 1280 * MjClient.size.width
            // var pokerHeight = 76 / 720 * MjClient.size.height
            var pokerWidth = 54 / 1280 * MjClient.size.width
            var pokerHeight = 66 / 720 * MjClient.size.height
            var pokerSpace =  32 / 1280 * MjClient.size.width
            var startX = size.width - marginLeft
            for (var i = item.cards.length - 1; i >= 0;i--)
            {
                // var path = "playing/cardPic3/"
                // var cd = item.cards[i]
                // if(cd == 53 || cd == 54)
                // {
                //     if(cd == 53)
                //         path = path + "501.png"
                //     else
                //         path = path + "502.png"
                // }
                // else
                // {
                //     var cardType = Math.ceil(cd / 4);// A,2 ,3, 4, 。。。。 j ,Q .k
                //     var flowerType = cd % 4;// 0 黑桃 ，1 方块 ，2 梅花 ，3 红桃
                //     if (flowerType == 0)    // 0 黑桃对印的图牌是4
                //         flowerType = 4;
                //
                //     path = path + flowerType + (cardType >= 10 ? cardType : "0" + cardType) + ".png"
                // }
                // var sprite = cc.Sprite.create(path);
                // var idx = item.cards.length - i
                // sprite.x = startX - (pokerWidth * idx) + (pokerSpace * idx)
                // sprite.y = -20 / 760 * MjClient.size.height
                // sprite.zIndex = i
                // sprite.setContentSize(pokerWidth,pokerHeight)
                // node.addChild(sprite)

                var downNode = getNode_cards(0);
                var _deskCard = downNode.getChildByName("deskCard");
                var poker = _deskCard.clone();
                poker.visible = true;
                poker.name = "out";
                var idx = item.cards.length - i
                poker.x = startX - (pokerWidth * idx) + (pokerSpace * idx)
                poker.y = -20 / 760 * MjClient.size.height
                poker.zIndex = i
                setCardSprite_card(poker,item.cards[i], 0,true);
                node.addChild(poker)
                poker.setScale(pokerWidth / poker.getContentSize().width ,pokerHeight / poker.getContentSize().height)
            }
            lbName.x = marginLeft;
            lbName.y = 12 / 720  * MjClient.size.height
            lbName.setLocalZOrder(10)
            return node
        },
        setContent:function (items) {
            this._popView.removeAllChildrenWithCleanup(true)
            var itemSize = this._popView.getContentSize()
            var marginTop = 5 / 720 * MjClient.size.height
            var itemHeight = (itemSize.height - 2 * marginTop) / items.length
            for (var i = 0; i < items.length;i++){
                var itemView = this.createPopItemView(items[i],itemSize)
                this._popView.addChild(itemView)
                itemView.setPosition(0,itemHeight * (items.length - i) +  marginTop)
                itemView.setContentSize(itemSize.width,itemHeight)
            }
        }
    })
    return new(Layer)
};

// 切牌
COMMON_UI.createPokerPlayerShuffleView = function () {
    var Layer = cc.Layer.extend({
        jsBind: {
            _event: {
                // mjhand: function () {
                //
                // },
                initSceneData: function(d) {
                    if (d.tData.tState == TableState.afterReady && d.tData.actionName == 'qiepai'){
                        var tData = MjClient.data.sData.tData;
                        var isMe = SelfUid() == tData.uids[d.tData.curPlayer];
                        var players = MjClient.data.sData.players;
                        var player = players[tData.uids[d.tData.curPlayer]];
                        this.showView(isMe,d.tData.shuffleCardsNum,player.info.nickname)
                    }else{
                        this.setVisible(false)
                    }
                },
                showPlayerShuffleView:function (d) {
                    var tData = MjClient.data.sData.tData;
                    var isMe = SelfUid() == tData.uids[d.curPlayer];
                    var players = MjClient.data.sData.players
                    var player = players[tData.uids[d.curPlayer]]
                    this.showView(isMe,d.shuffleCardsNum,player.info.nickname)
                },
                select_shuffle_index:function (d) {
                    if(this._isMe != true){
                        this.viewPokerBgListShouldScrollToPoker(this._viewCards,this._viewCards.cardList[d.index])
                    }
                },
                showPlayerShuffleAnim:function (d) {
                    // 播放动画
                    // 从切牌位置，从两边移动，再合并到屏幕中间
                    // 1.获取切牌右边扑克
                    var rightPokers = []
                    var centerPoker = this._viewCards.cardList[Math.ceil(this._viewCards.cardList.length / 2)]
                    for(var i = 0;i <this._viewCards.cardList.length;i++){
                        if(this._viewCards.cardList[i].tag  >= this._shuffleIndex){
                            rightPokers.push(this._viewCards.cardList[i])
                        }
                    }
                    // 2.获取切牌左边扑克
                    var leftPokers = []
                    for(var i = 0;i <this._viewCards.cardList.length;i++){
                        if(this._viewCards.cardList[i].tag  < this._shuffleIndex){
                            leftPokers.push(this._viewCards.cardList[i])
                        }
                    }
                    var moveToBothsidesThenCloseCenter = function (leftPokers,rightPokers,after) {
                        for (var i = 0; i < leftPokers.length; i++) {
                            var actionLeft = cc.moveTo(0.4, leftPokers[0].getPosition()).easing(cc.easeOut(0.4));
                            var actionCenter = cc.moveTo(0.3,centerPoker.getPosition()).easing(cc.easeIn(0.3));
                            var actions = cc.sequence(actionLeft, actionCenter,cc.delayTime(0.2),cc.callFunc(after))
                            leftPokers[i].runAction(actions)
                        }
                        for (var i = 0; i < rightPokers.length; i++) {
                            var actionRight = cc.moveTo(0.4, rightPokers[rightPokers.length - 1].getPosition()).easing(cc.easeOut(0.4));
                            var actionCenter = cc.moveTo(0.3,centerPoker.getPosition()).easing(cc.easeIn(0.3));
                            var actions = cc.sequence(actionRight, actionCenter,cc.delayTime(0.2), cc.callFunc(after))
                            rightPokers[i].runAction(actions)
                        }
                    }
                    var that = this
                    this._viewFinger.setVisible(false)
                    this._btnShuffle.setVisible(false)
                    this._lbTip.setVisible(false)
                    this._lbIndex.setVisible(false)
                    moveToBothsidesThenCloseCenter(leftPokers,rightPokers,function () {
                        that.hideView()
                    })
                }
            }
        },
        ctor: function() {
            this._super();
            this.setVisible(false)
            // this.showView(true,54)
            BindUiAndLogic(this, this.jsBind);
        },
        showView:function (isMe,cardNum,playerName) {
            this.setVisible(true)
            // btn for sure
            if (!this._btnShuffle) {
                var btnShuffle = new ccui.Button();

                btnShuffle.setTouchEnabled(true);

                btnShuffle.setPressedActionEnabled(true);

                btnShuffle.loadTextures("playing/paodekuaiTable/qiepai.png", "playing/paodekuaiTable/qiepai.png", "");

                btnShuffle.addTouchEventListener(this.onBtnShuffleClicked.bind(this), this);

                var scale = 1
                if(MjClient.size.width / MjClient.size.height > 1280 / 720)
                {
                    // 以宽度适配
                    scale = MjClient.size.width / 1280
                }else{
                    scale = MjClient.size.height / 720
                }
                btnShuffle.setScale(scale)

                btnShuffle.setPosition(0, -180 / 720 * MjClient.size.height)

                this._btnShuffle = btnShuffle

                this.addChild(btnShuffle);
            }
            if (!this._lbTip){
                var lbTip = new ccui.Text()
                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) {//岳阳同一使用方正兰亭
                    lbTip.setFontName("fonts/lanting.TTF");
                }
                lbTip.setFontSize(30)
                lbTip.setVisible(false)
                lbTip.setPosition(0, -180 / 720 * MjClient.size.height)
                this._lbTip = lbTip
                this.addChild(lbTip)
            }
            if (!this._lbIndex){
                var _lbIndex = new ccui.Text()
                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) {//岳阳同一使用方正兰亭
                    _lbIndex.setFontName("fonts/lanting.TTF");
                }
                _lbIndex.setFontSize(20)
                _lbIndex.setVisible(true)
                this._lbIndex = _lbIndex
                this.addChild(_lbIndex,1)
            }
            this._lbIndex.setVisible(true)
            if (isMe){
                this._btnShuffle.setVisible(true)
                this._lbTip.setVisible(false)
            }else{
                this._btnShuffle.setVisible(false)
                this._lbTip.setVisible(true)

                this._lbTip.setString("等待‘"+unescape(playerName)+"’切牌")
            }

            // cards panel
            // 126,150 25缩小到0.75
            var viewCfg = {
                pokerNum:cardNum,
                pokerBgIcon:"playing/cardPic/beimian_puke.png",
                pokerWidth:95 / 1280 * MjClient.size.width,
                pokerHeight:113 / 720 * MjClient.size.height,
                pokerSpace:18 / 1280 * MjClient.size.width,
            }

            // 手指
            if (!this._viewFinger) {
                var viewFinger = cc.Sprite.create("playing/paodekuaiTable/finger.png")
                // 跟扑克牌一样大
                var scale = viewCfg.pokerWidth / viewFinger.getContentSize().width
                viewFinger.setScale(scale)
                this.addChild(viewFinger,1)
                this._viewFinger = viewFinger
            }

            this._viewFinger.setVisible(true)

            if(this._viewCards){
                this._viewCards.removeFromParent(true)
            }

            var viewCards = this.getViewPokerBgList(viewCfg,this,isMe,this._viewFinger.getBoundingBox().height)
            viewCards.y = 56 / 720 * MjClient.size.height
            this._isMe = isMe
            this.addChild(viewCards,0)
            this._viewCards = viewCards


            // 默认选择第一张
            this._shuffleIndex = 0
            this.viewPokerBgListShouldScrollToPoker(viewCards,viewCards.cardList[0])
        },
        hideView:function () {
            this.setVisible(false)
        },
        getViewPokerBgList:function (viewCfg,delegate,isEnabled,touchOffHeight) {
            var viewPokerBgList = new cc.Node()
            var pokerWidth = viewCfg.pokerWidth
            var pokerHeight = viewCfg.pokerHeight
            var pokerSpace =  viewCfg.pokerSpace
            var pokerNum = viewCfg.pokerNum
            var viewCardsWidth  = (pokerNum - 1) * pokerSpace + pokerWidth;
            var startX = -(viewCardsWidth / 2) + pokerWidth / 2
            var cardList = []
            for (var i = 0; i < pokerNum; i++){
                var pokerBg = cc.Sprite.create(viewCfg.pokerBgIcon)
                pokerBg.setTag(i)
                var idx = i
                pokerBg.x = startX + (pokerSpace * idx)
                pokerBg.zIndex = i
                pokerBg.setScale(pokerWidth / pokerBg.getContentSize().width ,pokerHeight / pokerBg.getContentSize().height)
                viewPokerBgList.addChild(pokerBg)
                cardList.push(pokerBg)
            }
            viewPokerBgList.cardList = cardList
            viewPokerBgList.setContentSize(viewCardsWidth,pokerHeight)
            if (isEnabled){
                var onTouchEvent = function(touch, event) {
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var size = target.getContentSize();
                    // 让鼠标手可以滑
                    var rect = cc.rect(-size.width / 2, -size.height / 2 - touchOffHeight , size.width, size.height + touchOffHeight * 2);
                    // 在扑克范围内
                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        // 获取具体扑克牌
                        for (var i = 0; i < cardList.length; i++)
                        {
                            var _boundingBox = cardList[i].getBoundingBox();
                            _boundingBox.width = pokerSpace
                            _boundingBox.y -= touchOffHeight
                            _boundingBox.height += touchOffHeight
                            if (cc.rectContainsPoint(_boundingBox, locationInNode))
                            {
                                if (delegate && delegate.viewPokerBgListShouldScrollToPoker){
                                    delegate.viewPokerBgListShouldScrollToPoker(target,cardList[i])
                                }
                                break
                            }
                        }
                        return true;
                    }
                    return true
                }
                var listener = cc.EventListener.create({

                    event: cc.EventListener.TOUCH_ONE_BY_ONE,

                    swallowTouches: false,

                    onTouchBegan: function(touch, event)

                    {
                        return onTouchEvent(touch,event)
                    },
                    onTouchMoved: function (touch, event) {
                        return onTouchEvent(touch,event)
                    },
                    onTouchEnded: function (touch, event) {
                        return onTouchEvent(touch,event)
                    }
                });
                //添加触摸监听
                cc.eventManager.addListener(listener, viewPokerBgList);
            }
            return viewPokerBgList
        },
        viewPokerBgListShouldScrollToPoker:function (viewPokerBgList,sender) {
            var pokers = viewPokerBgList.cardList
            // 第一张和最后一张不置灰
            var targetPokers = pokers.filter(function (poker) {
                if (poker.tag < sender.tag){
                    poker.setColor(MjClient.grayColor);
                }else{
                    poker.setColor(cc.color(255,255,255));
                }
                return poker.tag  >= sender.tag
            })

            // 设置当前张数提示
            this._lbIndex.setString("第"+(sender.tag + 1)+"张")
            this._lbIndex.width = sender.getContentSize().width
            this._lbIndex.setAnchorPoint(0.5,0)
            this._lbIndex.x = sender.x - this._lbIndex.getContentSize().width / 2
            // 扑克牌上方10
            this._lbIndex.y = viewPokerBgList.y + sender.getBoundingBox().height / 2 + 10 / 720 * MjClient.size.height
            // 设置手指位置
            // var offPoint = sender.convertToWorldSpaceAR(cc.p(0,0))
            // cc.log("viewPokerBgListShouldScrollToPoker================",sender.y,sender.getContentSize().height,offPoint.x,offPoint.y)
            this._viewFinger.x = sender.x - 8
            // 扑克牌下方10
            this._viewFinger.y = viewPokerBgList.y - (this._viewFinger.getContentSize().height / 2) - 10 / 720 * MjClient.size.height
            // 选中的和上次一样不进行网络请求
            if (sender.tag == this._shuffleIndex){
                return
            }
            // 如果可以交互
            this._shuffleIndex = sender.tag
            if(this._isMe) {
                // 避免频繁请求，将请求放到一个队列，两秒扫描一次，取最后一个请求,发起并清空
                this._requestQueue = this._requestQueue || []
                this._requestQueue.push(sender.tag)
                this.scheduleOnce(function () {
                    if (this._requestQueue.length > 0){
                        var targetIndex = this._requestQueue[this._requestQueue.length - 1]
                        // cc.log("send request c2s_playerShuffleIndex=======================")
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {
                            cmd: "c2s_playerShuffleIndex",
                            index: targetIndex
                        });
                        this._requestQueue = []
                    }
                }, 1.5);
            }
        },
        onBtnShuffleClicked : function(sender,type){
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:{
                    this._requestQueue = []
                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                        cmd: "c2s_playerShuffleFinish",
                        dealyTime:800,
                    });
                }
            }
        },
    })
    return new(Layer)
}

COMMON_UI.createZiPaiCutCardView = function () {
    var cutCardLayer  = cc.Layer.extend({
        jsBind:{
            _event:{
                initSceneData:function (d){
                    if (d.tData.tState == TableState.waitShuffle){
                        cc.log("chow", "createZiPaiCutCardView initSceneData");
                        this.initView();
                    }else{
                        this.visible = false;
                    }
                },
                startShuffleCards:function (d) {
                    cc.log("chow", "createZiPaiCutCardView startShuffleCards");
                    this.initView();
                },
                select_shuffle_index:function (d) {
                    this.updateViewByIndex(d.index);
                },
                endShuffleCards:function (d) {
                    this.cutCardsByIndex(d.index);
                }
            }
        },
        ctor:function () {
            this._super();
            this.setVisible(false);
            BindUiAndLogic(this, this.jsBind);

            this.cardsInfo = {width : 62 / 1280 * MjClient.size.width, height : 180 / 1280 * MjClient.size.width, space: 12 / 1280 * MjClient.size.width};
        },
        initView:function () {
            this.removeAllChildren();
            this.setVisible(true);
            this.isShuffler = SelfUid() == MjClient.data.sData.tData.uids[MjClient.data.sData.tData.shuffler];
            this.cardCount = MjClient.majiang.getAllCardsTotal(MjClient.data.sData.tData) ;
            this.shuffler = MjClient.data.sData.players[MjClient.data.sData.tData.uids[MjClient.data.sData.tData.shuffler]];
            cc.log("chow", "createZiPaiCutCardView initView" + " isShuffler = " + this.isShuffler + " cardCount = " + this.cardCount);

            if(this.isShuffler){
                this.initCutCardButton();
            }else{
                this.initCutCardTip();
            }
            this.initCardsAndHand();
            cc.eventManager.addListener(cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: false,
                onTouchBegan: function(touch, event)
                {
                    return this.onTouchBegan(touch, event);
                }.bind(this),
                onTouchMoved: function (touch, event) {
                    this.onTouchMoved(touch, event);
                }.bind(this),
                onTouchEnded: function (touch, event) {

                }
            }), this);
        },
        initCutCardButton:function() {
            this.cutCardButton = new ccui.Button();
            this.cutCardButton.setTouchEnabled(true);
            this.cutCardButton.setPressedActionEnabled(true);
            this.cutCardButton.loadTextures("playing/ziPaiCut/cutCard_btn.png", "playing/ziPaiCut/cutCard_btn.png", "playing/ziPaiCut/cutCard_btn.png");
            this.addChild(this.cutCardButton);
            setWgtLayout(this.cutCardButton,[172 / 1280,72 / 720],[0.5,0.2],[0,0],true);

            this.cutCardButton.addTouchEventListener(function (sender,eventType) {
                if(eventType == ccui.Widget.TOUCH_ENDED){
                    //发送切牌消息
                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                        cmd: "ZPEndShuffleCards",
                        index:this.targetIndex
                    });
                }
            }.bind(this));
        },
        initCutCardTip:function() {
            this.cutCardTip = new ccui.Text();
            this.cutCardTip.setFontSize(30);
            this.addChild(this.cutCardTip);
            this.cutCardTip.setString("等待‘"+ unescape(this.shuffler.info.nickname) +"’切牌");
            this.cutCardTip.setFontName("Arial");
            this.cutCardTip.setFontSize(25);
            setWgtLayout(this.cutCardTip,[this.cutCardTip.getContentSize().width / 1280,this.cutCardTip.getContentSize().height / 720],[0.5,0.2],[0,0],true);
        },
        initCardsAndHand:function() {
            this.cardsNode = new cc.Node();
            this.cardsNode.setAnchorPoint(0, 0);
            this.addChild(this.cardsNode);
            this.cardList = [];

            for(var i = 0; i < this.cardCount; i++){
                var card = new cc.Sprite("playing/ziPaiCut/cutCard_card.png");
                card.setScale(this.cardsInfo.width / card.getContentSize().width);
                this.cardsNode.addChild(card);
                card.setAnchorPoint(0, 0);
                card.setPosition(cc.p((i - 1) * this.cardsInfo.space, 0));

                this.cardList.push(card);
            }
            this.cardsNode.setPosition(cc.p((MjClient.size.width - (this.cardCount - 1) * this.cardsInfo.space - this.cardsInfo.width) / 2, MjClient.size.height / 2));
            this.cardRect = new cc.rect(this.cardsNode.x, this.cardsNode.y , (this.cardCount - 1) * this.cardsInfo.space + this.cardsInfo.width, this.cardsInfo.height);
            cc.log("chow", "x = " + this.cardsNode.x + " y = " + this.cardsNode.y);
            this.finger = new cc.Sprite("playing/ziPaiCut/cutCard_finger.png");
            this.finger.setAnchorPoint(0.2, 1);
            this.finger.setScale(MjClient.size.width / 1280/*, MjClient.size.height / 720*/);
            this.addChild(this.finger);
            this.finger.setPosition(cc.p(this.cardsNode.x, this.cardsNode.y));

            this.indexTip = new ccui.Text();
            this.indexTip.setAnchorPoint(0.5, 0);
            this.indexTip.setFontSize(30);
            this.indexTip.setScale(MjClient.size.width / 1280/*, MjClient.size.height / 720*/);
            this.addChild(this.indexTip);
            this.indexTip.setPosition(cc.p(this.cardsNode.x, this.cardsNode.y + this.cardsInfo.height));

            this.targetIndex = 0;
            this.updateViewByIndex(this.targetIndex);
        },
        onTouchBegan:function (touch, event) {
            if(!this.isShuffler || MjClient.data.sData.tData.tState != TableState.waitShuffle){
                return false;
            }
            var point = touch.getLocation();
            if(cc.sys.isObjectValid(this.finger) && cc.rectContainsPoint(this.finger.getBoundingBox(), point)){
                return true;
            }else if(cc.rectContainsPoint(this.cardRect, point)){
                this.updateViewByIndex(this.getIndexByPoint(point));
                return true;
            }
            return false;
        },
        onTouchMoved:function (touch, event) {
            var point = touch.getLocation();
            this.updateViewByIndex(this.getIndexByPoint(point));
        },
        getIndexByPoint:function(point){
            if(point.x < this.cardsNode.x || point.x > this.cardsNode.x + this.cardRect.width - this.cardsInfo.width){
                return -1;
            }
            return Math.floor((point.x - this.cardsNode.x) / this.cardsInfo.space);
        },
        updateViewByIndex: function(index){
            if(index < 0 || index > this.cardCount){
                return;
            }
            this.targetIndex = index;

            this.indexTip.setString("第" + (index + 1) + "张");
            this.indexTip.x = this.cardsNode.x + index * this.cardsInfo.space;

            this.finger.x = this.cardsNode.x + index * this.cardsInfo.space;

            for(var i = 0; i < this.cardList.length; i++){
                if(i <= index){
                    this.cardList[i].setColor(MjClient.grayColor);
                }else{
                    this.cardList[i].setColor(MjClient.whiteColor);
                }
            }
        },
        cutCardsByIndex:function(index){
            this.targetIndex = index;
            this.indexTip.runAction(cc.fadeOut(0.1));
            this.finger.runAction(cc.fadeOut(0.1));
            if(this.isShuffler){
                this.cutCardButton.runAction(cc.fadeOut(0.1));
            }
            if(!this.isShuffler){
                this.cutCardTip.runAction(cc.fadeOut(0.1));
            }
            for(var i = 0; i < this.cardList.length; i++){
                if(i <= index){
                    this.cardList[i].runAction(cc.moveBy(0.1, cc.p(-100 / 1280 * MjClient.size.width, 0)));
                }else{
                    this.cardList[i].runAction(cc.sequence(cc.moveBy(0.1, cc.p(50 / 1280 * MjClient.size.width, 0)), cc.callFunc(function () {
                        this.runAction(cc.fadeOut(0.2));
                    }.bind(this.cardList[i]))));
                }
            }
            this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                this.cardScaleByIndex();
            }.bind(this))));
        },
        cardScaleByIndex:function () {
            for(var i = 0; i < this.targetIndex; i++){
                this.cardList[i].runAction(cc.sequence(cc.moveTo(0.4, this.cardList[this.targetIndex].getPosition()).easing(cc.easeOut(0.4)), cc.callFunc(function () {
                    this.removeFromParent();
                }.bind(this.cardList[i]))));
            }
            this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
                this.removeAllChildren();
            }.bind(this))));
        },
    });
    return new (cutCardLayer);
}


/*
     晋中新UI,房间信息：玩法名称，房间号，时间，电池，信号
 */
COMMON_UI.addPlayingInfo = function(strInfo,tableId)
{
    if(!strInfo)
        strInfo = MjClient.playui._downNode.getParent().getChildByName("roundInfo").getString();

    if(!tableId)
        tableId = MjClient.isInGoldFieldNormal()?(getJinbiStr(MjClient.data.sData.tData.fieldBase)+"金币"):MjClient.data.sData.tData.tableId;

    var playingInfoUI = ccs.load("playingInfo.json");
    if (!cc.sys.isObjectValid(MjClient.playui) ) {
        cc.log(" ======= 没有找到桌面======");
        return;
    }
    if(!playingInfoUI || !playingInfoUI.node){ return;}

    var _backNode = MjClient.playui._downNode.getParent().getChildByName("back");
    _backNode.addChild(playingInfoUI.node,0);
    if(playingInfoUI.node.getChildByName("info_bg_3D")) playingInfoUI.node.getChildByName("info_bg_3D").visible = false;
    playingInfoUI.node.getChildByName("info_bg").visible = false;
    playingInfoUI.node.getChildByName("Panel_roundInfo").visible = false;


    playingInfoUI.node.setName("node_playingInfo");
    var _infoNode = _backNode.getChildByName("node_playingInfo");
    if (_infoNode) {
        var _infoBg3D = _infoNode.getChildByName("info_bg_3D");
        if(_infoBg3D) _infoBg3D.visible = false;

        var _infoBg = _infoNode.getChildByName("info_bg");
        _infoBg.visible = false;

        var _Panel_roundInfo = _infoNode.getChildByName("Panel_roundInfo");
        _Panel_roundInfo.visible = false;


        var _coply_infoBg = MjClient.playui._downNode.getParent().getChildByName("back").getChildByName("infoBg");
        if(_coply_infoBg)
        {
            _coply_infoBg.visible = false;
            _coply_infoBg.removeFromParent();
        }

        _coply_infoBg = _infoBg.clone();
        setWgtLayout(_coply_infoBg, [0.5, 0.5], [0.5, 1], [0, 0]);
        if(COMMON_UI3D.is3DUI())
        {
            _coply_infoBg = _infoBg3D.clone();
            setWgtLayout(_coply_infoBg, [0.125, 0.125], [0.001, 0.996], [0, 0]);

            /*3D设置百搭牌，如果存在*/
            var hunPaiBG = _coply_infoBg.getChildByName("hunpai_bg");
            // 安化四王
            if(MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW || MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG){ 
                hunPaiBG.setScale(1.2) 
                hunPaiBG.y = hunPaiBG.y - (hunPaiBG.height * 0.1);
                hunPaiBG.setTag(0); // hunCard 
                var showCardBG = hunPaiBG.clone(); 
                _coply_infoBg.addChild(showCardBG);
                showCardBG.setPosition(cc.p(hunPaiBG.x + (hunPaiBG.width * hunPaiBG.scale * 1.2),hunPaiBG.y));
                 showCardBG.setTag(1); // showCard
                COMMON_UI3D.setBaiDa3D(showCardBG);
            }  
            COMMON_UI3D.setBaiDa3D(hunPaiBG); 
        }

        MjClient.playui._downNode.getParent().getChildByName("back").addChild(_coply_infoBg,0);
        _coply_infoBg.setName("infoBg");
        _coply_infoBg.visible = true;

        var _bgpower = _coply_infoBg.getChildByName("power_9");
        if(_bgpower) _bgpower.visible = true;

        var _gameType = _coply_infoBg.getChildByName("gameType");
        var sData = MjClient.data.sData;
        var areaSelectMode = sData.tData.areaSelectMode;
        if(MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA && areaSelectMode.isErRen){
            _gameType.setString("二人缺门长麻");
        }else{
            _gameType.setString(GameCnName[MjClient.gameType]);
        }
        
        
        _gameType.ignoreContentAdaptWithSize(true);

        var _tableID = _coply_infoBg.getChildByName("tableid");
        if(tableId)
            _tableID.setString(tableId);
        else
        {
            _tableID.setString(MjClient.data.sData.tData.tableid);
        }

        if(MjClient.isInGoldFieldNormal()){
            var _roomNo = _coply_infoBg.getChildByName("roomNo");
            _roomNo.setVisible(false);
            _tableID.setVisible(false);
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


            var _copyBgDisc = null;
            var _helpDisc = null;
            if(!_bannerNode.getChildByName("helpDisc"))
            {
                _helpDisc = new ccui.Button("playing/gameTable/playDisc.png","playing/gameTable/playDisc_s.png");
                _helpDisc.setName("helpDisc");
                _bannerNode.addChild(_helpDisc,1);
            }
            else {
                _helpDisc = _bannerNode.getChildByName("helpDisc");
            }

            var _bg_disc = _infoNode.getChildByName("bg_disc");
            _bg_disc.visible = false;


            // 创建玩法列表
            var createCopyDise = function(){
                _copyBgDisc = _bg_disc.clone();
                _copyBgDisc.visible = true;
                _copyBgDisc.setName("disc");
                _copyBgDisc.setScale(_helpDisc.getScale()*3);
                _copyBgDisc.setPosition(_helpDisc.getBoundingBox().width*0.5,0);
                _helpDisc.addChild(_copyBgDisc);
                var _text = _copyBgDisc.getChildByName("Text_disc");
                var _scrollView = _copyBgDisc.getChildByName("scrollView");
                var _maxWidth =  _copyBgDisc.getContentSize().width;   //子串最长串宽度，默认框宽度，超过则自动增长
                var _discGap = _text.height/2;            //目录留出一个字符一半高度的间隙
                var _tempList = [];                       //临时数组
                var newStr = strInfo.split(",");          //字符分割
                for(var i = 0; i < newStr.length; i++)
                {
                    if (newStr[i].length <= 12)
                        continue;

                    var tempStr = newStr[i];
                    newStr[i] = tempStr.substr(0, 12);
                    newStr.splice(i, 0, tempStr.substr(12));
                }

                var len = newStr.length;
                var size = len > 19 ? 14 : _text.getFontSize();
                for(var i = 0; i < newStr.length; i++)
                {
                    var _textCopy = _text.clone();
                    _textCopy.setFontSize(size);
                    _textCopy.setVisible(true);
                    _textCopy.ignoreContentAdaptWithSize(true);
                    _textCopy.setString(newStr[i]);
                    _tempList.push(_textCopy);
                    if (_scrollView)
                        _scrollView.addChild(_textCopy);
                    else
                        _copyBgDisc.addChild(_textCopy);
                    _maxWidth = _textCopy.getContentSize().width > _maxWidth ? _textCopy.getContentSize().width : _maxWidth;
                }
                
                if (_scrollView && _textCopy.getContentSize().height != 0) {
                    _scrollView.setVisible(true);
                    _copyBgDisc.width = _maxWidth * 1.05;
                    _scrollView.runAction(cc.sequence(cc.delayTime(0.21), cc.callFunc(function() {
                        var innerHeight = _textCopy.getContentSize().height * (newStr.length + 1) * 1.25;
                        var maxHeight = _copyBgDisc.height - _copyBgDisc.convertToNodeSpace(cc.p(0, 0)).y - 10;
                        if (innerHeight < maxHeight)
                            maxHeight = innerHeight;
                        _copyBgDisc.height = maxHeight;

                        _scrollView.setScrollBarOpacity(0);
                        _scrollView.setPosition(_copyBgDisc.width / 2, _copyBgDisc.height - 16);
                        _scrollView.setContentSize(_copyBgDisc.width, maxHeight - 16);
                        _scrollView.setInnerContainerSize(cc.size(_copyBgDisc.width, innerHeight - 16));
                    })));
                }
                else {
                    _copyBgDisc.ignoreContentAdaptWithSize(true);
                    _copyBgDisc.setContentSize(_maxWidth * 1.05, _textCopy.getContentSize().height * (newStr.length + 1) * 1.25);
                }

                for(var i = 0; i < _tempList.length; i++)
                {
                    _tempList[i].setPosition(_copyBgDisc.getContentSize().width * 0.5, _discGap + _textCopy.getContentSize().height * i * 1.25);
                }
            }();

            _copyBgDisc =  _helpDisc.getChildByName("disc");
            _copyBgDisc.runAction(cc.sequence(
                cc.scaleTo(0.2, _helpDisc.getScale()*1.9).easing(cc.easeBackOut()),
                cc.delayTime(5),
                cc.scaleTo(0.2, 0).easing(cc.easeBackIn()),
                cc.callFunc(function(){
                    _copyBgDisc.visible = false;
                })
            ).repeat(1));

            _helpDisc.addTouchEventListener(function(sender, type) {
                if (type == 2) {
					MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Wanfa", {uid: SelfUid()});
                    _copyBgDisc = sender.getChildByName("disc");
                    _copyBgDisc.setScale(_helpDisc.getScale()*3);
                    cc.eventManager.addListener({
                        event: cc.EventListener.TOUCH_ONE_BY_ONE,
                        swallowTouches: false,
                        status: null,
                        onTouchBegan: function(touch, event) {
                            if (_copyBgDisc && _copyBgDisc.isVisible()) {
                                _copyBgDisc.runAction(cc.sequence(
                                    cc.scaleTo(0.2, 0).easing(cc.easeBackIn()),
                                    cc.callFunc(function(){
                                        _copyBgDisc.visible = false;
                                    })
                                ));
                                return true;
                            } else {
                                return false;
                            }
                        },
                    }, _copyBgDisc);
                    if(!_copyBgDisc)
                    {
                        createCopyDise();
                    }
                    else
                    {
                        if(_copyBgDisc.visible)
                        {
                            _copyBgDisc.runAction(cc.sequence(
                                cc.scaleTo(0.2, 0).easing(cc.easeBackIn()),
                                cc.callFunc(function(){
                                    _copyBgDisc.visible = false;
                                })
                            ));
                        }else{
                            _copyBgDisc.runAction(cc.sequence(
                                cc.scaleTo(0.2, 1.9).easing(cc.easeBackOut()),
                                cc.callFunc(function(){
                                    _copyBgDisc.visible = true;
                                })
                            ));
                        }
                    }
                }
            });


            var _roundInfo = MjClient.playui._downNode.getParent().getChildByName("roundInfo");
            _roundInfo.visible = false;
            _roundInfo.setString("");
            var _settingBtn = _bannerNode.getChildByName("setting");

            _settingBtn.setScale(0.6);
            _settingBtn.setPositionX(_bannerNode.getContentSize().width*1.43);
            _helpDisc.setContentSize(_settingBtn.getContentSize());
            _helpDisc.setAnchorPoint(_settingBtn.getAnchorPoint());
            _helpDisc.setPosition(_bannerNode.getContentSize().width*1.33, _settingBtn.getPositionY());
            _helpDisc.setScale(_settingBtn.getScale());

        }

        // ------------------------江苏, 淮安UI特殊处理-----------------------------------
        var _info2DNode = MjClient.playui.getChildByName("node_roomInfo");
        var is3D = COMMON_UI3D.is3DUI();
        if(MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ)
        {
            if(_info2DNode)         _info2DNode.visible = !is3D;                 //2D左上角弹框
            if(_coply_infoBg)       _coply_infoBg.visible = is3D;                //组合UI3D背景
            if(_helpDisc)           _helpDisc.visible = is3D;                    //问号内容黑框
            if(_bannnerbg_time)     _bannnerbg_time.visible = !is3D;             //原桌面2D时间
            if(_bannnerbg_wifi)     _bannnerbg_wifi.visible = !is3D;             //原桌面2DWIFI
            if(_bannnerbg_powerBar) _bannnerbg_powerBar.visible = !is3D;         //原桌面2D电池内芯
            if(_bannnerbg_power_9)  _bannnerbg_power_9.visible = !is3D;          //原桌面2D电池外壳
            if(!cc.sys.isObjectValid(_info2DNode) && !is3D)
            {
                var sData = MjClient.data.sData;
                var tData = sData.tData;
                var tableID = tData.tableid;
                if(tData.fieldId){
                    var payWay = tData.areaSelectMode.payWay;
                    delete tData.areaSelectMode.payWay;
                }
                var roomInfo = getPlayingRoomInfo(0);
                if(payWay){
                    tData.areaSelectMode.payWay = payWay;
                }
                showPlayUI_roundInfo(roomInfo,tData.fieldId?(getJinbiStr(MjClient.data.sData.tData.fieldBase)+"金币"):tableID,tData.fieldId?"底分 ":"");
            }
        }else if(MjClient.getAppType() === MjClient.APP_TYPE.QXHAMJ){
            if(_copyBgDisc)         _copyBgDisc.visible = false;                     //问号内容黑框
            if(_helpDisc)           _helpDisc.visible = false;                       //问号
            if(_coply_infoBg)       _coply_infoBg.visible = is3D;                    //组合UI3D背景
            if(_bannnerbg_time)     _bannnerbg_time.visible = !is3D;                 //原桌面2D时间
            if(_bannnerbg_wifi)     _bannnerbg_wifi.visible = !is3D;                 //原桌面2DWIFI
            if(_bannnerbg_powerBar) _bannnerbg_powerBar.visible = !is3D;             //原桌面2D电池内芯
            if(_bannnerbg_power_9)  _bannnerbg_power_9.visible = !is3D;              //原桌面2D电池外壳

            if(!is3D)
            {
                var _bannnerRoomNo = _bannerNode.getChildByName("roomNo");
                if(_bannnerRoomNo)_bannnerRoomNo.visible = true;
                var _bannnerTableId = _bannerNode.getChildByName("tableid");
                if(_bannnerTableId) _bannnerTableId.visible = true;
            }

            if(_roundInfo) {                                                         //牌局信息
                _roundInfo.visible = true;
                _roundInfo.setString(strInfo);
            }
         }
        // --------------------------------------------------------------------
    }
};

/*
    新UI，显示剩余张数，和剩余局数
 */
COMMON_UI.addLeftCardAndRound = function()
{
    var _backNode = MjClient.playui._downNode.getParent().getChildByName("back");

    var _infoNode = _backNode.getChildByName("node_playingInfo");
    if(!_infoNode) return;
    var _bannerNode = MjClient.playui._downNode.getParent().getChildByName("banner");
    //显示牌的张数，剩余局数
    var _roundnumImg = MjClient.playui._downNode.getParent().getChildByName("roundnumImg");
    if(!_roundnumImg) return;
    _roundnumImg.visible = false;
    var _cardNumImg = MjClient.playui._downNode.getParent().getChildByName("cardNumImg");
    _cardNumImg.visible = false;


    var _infoBg3D = _infoNode.getChildByName("info_bg_3D");
    if(_infoBg3D) _infoBg3D.visible = false;

    var _infoBg = _infoNode.getChildByName("info_bg");
    _infoBg.visible = false;

    var _Panel_roundInfo = _infoNode.getChildByName("Panel_roundInfo");
    _Panel_roundInfo.visible = false;


    var _coplyPanel_roundInfo = MjClient.playui._downNode.getParent().getChildByName("back").getChildByName("roundInfo");
    if(!_coplyPanel_roundInfo)
    {
        _coplyPanel_roundInfo = _Panel_roundInfo.clone();
        MjClient.playui._downNode.getParent().getChildByName("back").addChild(_coplyPanel_roundInfo,0);
    }

    _coplyPanel_roundInfo.setName("roundInfo");
    _coplyPanel_roundInfo.visible = true;
    setWgtLayout(_coplyPanel_roundInfo, [0.09, 0.09], [0.1, 0.95], [0, 0]);


    if(COMMON_UI3D.is3DUI())
    {
        setWgtLayout(_coplyPanel_roundInfo, [0.09, 0.09], [0.8, 0.95], [0, 0]);
        if(isIPad()) setWgtLayout(_coplyPanel_roundInfo, [0.07, 0.079], [0.84, 0.95], [0, 0]);
    }
    else if(COMMON_UI3D.isSpecialRoomUI())    // 山西临汾地区, 淮安, 岳阳, 江苏2D特殊UI
    {
        _cardNumImg.visible = true;             //2D 剩余张数
        _roundnumImg.visible = true;            //2D 剩余局数
        _coplyPanel_roundInfo.visible = false;  //3D 剩余张数局数的底
    }


    // 晋中立四麻将UI特殊，23D剩余张数局数，都在牌桌中间
    if(MjClient.gameType === MjClient.GAME_TYPE.JIN_ZHONG_LI_SI){
        _cardNumImg.visible = true;
        _roundnumImg.visible = true;
        _coplyPanel_roundInfo.visible = false;
    }

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    
   
    var _cardLeftCount = _coplyPanel_roundInfo.getChildByName("card_bg").getChildByName("cardnumAtlas");
    if (tData) _cardLeftCount.setString((MjClient.majiang.getAllCardsTotal() - tData.cardNext) );
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
        var _roundText;
        var extraNum = tData.extraNum ? tData.extraNum:0; // 加时赛

        if((MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_MA_JIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.ZHUO_HAO_ZI )&& tData.roundAll==9999) _roundText = _currentRoundIdx;
        else _roundText = (_currentRoundIdx + extraNum) + "/" + tData.roundAll;

        if (tData) _roundLeftCount.setString(_roundText);
        _roundLeftCount.ignoreContentAdaptWithSize(true);
    }

    var hunCard =  _bannerNode.getChildByName("hunPai");
    if(hunCard) hunCard.visible = false;

    if (tData.fieldId) {
        _coplyPanel_roundInfo.getChildByName("round_bg").setVisible(false)
        _roundnumImg.setVisible(false);
        _roundtxt.setVisible(false);
    }

    //3D的单独显示
    if(COMMON_UI3D.is3DUI()) {
        
        if(hunCard) hunCard.visible = false;
    }
    else
    {
        var HuncardMsg = getFinalHunCardMsg();
        if(hunCard && HuncardMsg && HuncardMsg != -1) {
            hunCard.visible = true;
            if(hunCard.getChildByName("baidaImg")) hunCard.getChildByName("baidaImg").visible = true;

            var sData = MjClient.data.sData;
            var tData = sData.tData;
            //没开始没有癞子
            if(tData.tState != TableState.waitPut &&
                tData.tState != TableState.waitEat &&
                tData.tState != TableState.waitCard)
            {
                if(hunCard) hunCard.visible = false;
            }
        }
    }


    // if(hunCard)
    // {
    //     hunCard.setScale(_bannerNode.getScale());
    //     hunCard.setPositionX(_bannerNode.getContentSize().width*1.1);
    // }


    UIEventBind(null, MjClient.playui, "initSceneData", function (eD) {
        MjClient.data.sData = eD;
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        _roundnumImg.visible = false;
        _cardNumImg.visible = false;
        _coplyPanel_roundInfo.visible = true;

        //3D的单独显示
        if(COMMON_UI3D.is3DUI()) {
            if(hunCard) hunCard.visible = false;
        }
        else
        {
            var HuncardMsg = getFinalHunCardMsg();
            if(hunCard && HuncardMsg && HuncardMsg != -1) {
                hunCard.visible = true;
            }

            //没开始没有癞子
            if(tData.tState != TableState.waitPut &&
                tData.tState != TableState.waitEat &&
                tData.tState != TableState.waitCard)
            {
                if(hunCard) hunCard.visible = false;
            }

            if(COMMON_UI3D.isSpecialRoomUI())  // 山西临汾地区，岳阳，江苏2D特殊UI
            {
                _roundnumImg.visible = true;
                _cardNumImg.visible = true;
                _coplyPanel_roundInfo.visible = false;
            }
        }

        // 晋中立四麻将UI特殊，23D剩余张数局数，都在牌桌中间
        if(MjClient.gameType === MjClient.GAME_TYPE.JIN_ZHONG_LI_SI){
            _cardNumImg.visible = true;
            _roundnumImg.visible = true;
            _coplyPanel_roundInfo.visible = false;
        }


        if (tData) _cardLeftCount.setString((MjClient.majiang.getAllCardsTotal() - tData.cardNext));
        _cardLeftCount.ignoreContentAdaptWithSize(true);

        if(tData)
        {
            var _currentRoundIdx =  parseInt(tData.roundAll - tData.roundNum) + 1;
            if(_currentRoundIdx > tData.roundAll)
            {
                _currentRoundIdx = 1;
            }
            var _roundText;
            var extraNum = tData.extraNum ? tData.extraNum:0; // 加时
            if((MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_MA_JIANG ||
                MjClient.gameType == MjClient.GAME_TYPE.ZHUO_HAO_ZI )&& tData.roundAll==9999) _roundText = _currentRoundIdx;
            else _roundText = (_currentRoundIdx + extraNum) + "/" + tData.roundAll ;
            if (tData) _roundLeftCount.setString(_roundText);
            _roundLeftCount.ignoreContentAdaptWithSize(true);


            // 选座阶段，隐藏剩余张数和剩余局数
            if(tData.tState === TableState.waitJoin){
                _cardNumImg.visible = false;
                _roundnumImg.visible = false;
                _coplyPanel_roundInfo.visible = false;
            }
        }
    });

    UIEventBind(null, MjClient.playui, "waitPut", function (eD) {
        _roundnumImg.visible = false;
        _cardNumImg.visible = false;
        _coplyPanel_roundInfo.visible = true;

        if(!COMMON_UI3D.is3DUI() && COMMON_UI3D.isSpecialRoomUI())   // 山西临汾地区，岳阳，江苏2D特殊UI
        {
            _roundnumImg.visible = true;
            _cardNumImg.visible = true;
            _coplyPanel_roundInfo.visible = false;
        }
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        if(tData)
        {
            if (tData) _cardLeftCount.setString(MjClient.majiang.getAllCardsTotal() - tData.cardNext);
            _cardLeftCount.ignoreContentAdaptWithSize(true);
        }

        // 晋中立四麻将UI特殊，23D剩余张数局数，都在牌桌中间
        if(MjClient.gameType === MjClient.GAME_TYPE.JIN_ZHONG_LI_SI){
            _cardNumImg.visible = true;
            _roundnumImg.visible = true;
            _coplyPanel_roundInfo.visible = false;
        }
    });


    UIEventBind(null, MjClient.playui, "mjhand", function (eD) {
        _roundnumImg.visible = false;
        _cardNumImg.visible = false;
        _coplyPanel_roundInfo.visible = true;

        var sData = MjClient.data.sData;
        var tData = sData.tData;
        //3D的单独显示
        if(COMMON_UI3D.is3DUI()) {
            if(hunCard) hunCard.visible = false;
        }
        else
        {
            var HuncardMsg = getFinalHunCardMsg();
            if(hunCard && HuncardMsg && HuncardMsg != -1) {
                hunCard.visible = true;
            }

            if(COMMON_UI3D.isSpecialRoomUI())   // 山西临汾地区，岳阳，江苏2D特殊UI
            {
                _roundnumImg.visible = true;
                _cardNumImg.visible = true;
                _coplyPanel_roundInfo.visible = false;
            }
        }

        if(tData)
        {
            var _currentRoundIdx =  parseInt(tData.roundAll - tData.roundNum) + 1;
            if(_currentRoundIdx > tData.roundAll)
            {
                _currentRoundIdx = 1;
            }
            var _roundText;
            var extraNum = tData.extraNum ? tData.extraNum:0; // 加时
            if((MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_MA_JIANG ||
                MjClient.gameType == MjClient.GAME_TYPE.ZHUO_HAO_ZI )&& tData.roundAll==9999) _roundText = _currentRoundIdx ;
            else _roundText = (_currentRoundIdx + extraNum) + "/" + tData.roundAll ;

            if (tData) _roundLeftCount.setString(_roundText);
            _roundLeftCount.ignoreContentAdaptWithSize(true);

            cc.log("tData.rounddddAll = " + _roundText);
        }


        // 晋中立四麻将UI特殊，23D剩余张数局数，都在牌桌中间
        if(MjClient.gameType === MjClient.GAME_TYPE.JIN_ZHONG_LI_SI){
            _cardNumImg.visible = true;
            _roundnumImg.visible = true;
            _coplyPanel_roundInfo.visible = false;
        }
    });


    var _voice_btn = MjClient.playui._downNode.getParent().getChildByName("voice_btn");
    var _chat_btn = MjClient.playui._downNode.getParent().getChildByName("chat_btn");
    var _gps_btn = MjClient.playui._downNode.getParent().getChildByName("gps_btn");
    var _hua_btn = MjClient.playui._downNode.getParent().getChildByName("hua_btn");
    //var _tingBtn = MjClient.playui._downNode.getParent().getChildByName("tingBtn");
    var _btnArrray = [];
    if(_voice_btn) _btnArrray.push(_voice_btn);
    if(_chat_btn) _btnArrray.push(_chat_btn);
    if(_gps_btn && _gps_btn.isVisible()) _btnArrray.push(_gps_btn);
    if(_hua_btn) _btnArrray.push(_hua_btn);
    //if(_tingBtn) _btnArrray.push(_tingBtn);

    for(var idx = 0; idx < _btnArrray.length;idx++)
    {
        setWgtLayout(_btnArrray[idx],[0.08, 0.08], [0.97, 0.3 - 0.1 * idx], [0, 3.2]);
    }

};

/*
    断线重连后信息刷新,局数刷新
*/
COMMON_UI.reconnectRefeshUI = function()
{
    if(!MjClient.playui.getChildByName("roundnumImg")) return;

    var _roundLeftCount  = MjClient.playui.getChildByName("roundnumImg").getChildByName("roundnumAtlas");
    var _cardLeftCount = MjClient.playui.getChildByName("cardNumImg").getChildByName("cardnumAtlas");

    UIEventBind(null, MjClient.playui, "initSceneData", function (eD) {

        MjClient.data.sData = eD;
        var sData = MjClient.data.sData;
        var tData = sData.tData;

        if (tData && _roundLeftCount && _cardLeftCount)
        {
            _cardLeftCount.setString((MjClient.majiang.getAllCardsTotal() - tData.cardNext) + "张" );
            _cardLeftCount.ignoreContentAdaptWithSize(true);

            var _currentRoundIdx =  parseInt(tData.roundAll - tData.roundNum) + 1;
            if(_currentRoundIdx > tData.roundAll)
            {
                _currentRoundIdx = 1;
            }
            var _roundText;
            var extraNum = tData.extraNum ? tData.extraNum:0; // 加时
            if((MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_MA_JIANG ||
                MjClient.gameType == MjClient.GAME_TYPE.ZHUO_HAO_ZI )&& tData.roundAll==9999) _roundText = _currentRoundIdx ;
            else _roundText = (_currentRoundIdx + extraNum) + "/" + tData.roundAll + "局";
            if (tData) _roundLeftCount.setString(_roundText);
            _roundLeftCount.ignoreContentAdaptWithSize(true);

            MJChiPengGangWhenHu();
        }
    });
};

/*
    山西,岳阳手牌大小调节功能.
 */
COMMON_UI.mjhandSizeSet = function()
{
    // 大牌, sizeType == 0
    // 小牌, sizeType == 1
    if(!MjClient.playui || GameClass[MjClient.gameType] !== MjClient.GAME_CLASS.MA_JIANG) return;

    var sizeType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_mjhand_size, 1);
    var _node = getNode(0);
    var _stand = _node.getChildByName("stand");
    var _sca = sizeType === 1 ? 0.053 : 0.054;

    setWgtLayout(_stand, [_sca, 0], [0.5, 0], [8, 0.72]);
    MjClient.init_y = _stand.y;
    MjClient.playui.CardLayoutRestore(_node, 0);
};


/*
    晋中的创建房间帮助问号
 */
COMMON_UI.addHelpUI = function(parentNode)
{

    //GPS帮助的问号
    var _selectCol = CREATEROOM_COLOR_3;
    var _UnSelectCol = CREATEROOM_COLOR_1;
    var _helpNode = new ccui.ImageView("createNewPng/tip.png");
    var _helpImage = new ccui.ImageView("createNewPng/tip_di.png");
    var _helpText = new ccui.Text();
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) {//岳阳同一使用方正兰亭
        _helpText.setFontName("fonts/lanting.TTF");
    }
    _helpText.setPosition(201.50,49.80);
    _helpText.setColor(_selectCol);
    _helpText.setFontSize(19);
    _helpText.setString("开启后，打开软件定位权限才能创建房间，相\n同IP或低于安全距离的玩家不能进入同一房间");
    _helpText.setFontName(MjClient.fzcyfont);
    if(isJinZhongAPPType()) _helpText.setFontName("fonts/lanting.TTF");
    _helpImage.setScale(1.1);
    _helpImage.addChild(_helpText);
    _helpImage.setVisible(false);
    _helpImage.setPosition(129.42,86.80);
    _helpNode.name = "_helpNode";
    _helpNode.addChild(_helpImage);
    parentNode.addChild(_helpNode,100);
    parentNode.zIndex = 500;
    _helpNode.setTouchEnabled(true);
    _helpNode.setPosition(parentNode.getContentSize().width*5.5,parentNode.getContentSize().height/2);
    if(isJinZhongAPPType()){
        _helpNode.setPosition(parentNode.getContentSize().width*4.2,parentNode.getContentSize().height/2);
    }
    _helpNode.addTouchEventListener(function(sender, type) {
        if (type == 2) {
            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian_Fangzuobishuoming", {uid:SelfUid()});
            _helpImage.setVisible(true);
        }
    }, _helpNode);
    cc.eventManager.addListener({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: false,
        status: null,
        onTouchBegan: function(touch, event) {
            if (_helpImage.isVisible()) {
                _helpImage.setVisible(false);
                return true;
            } else {
                return false;
            }
        },
    }, _helpImage);

}

//专门为ipad 适配做的
COMMON_UI.gSetIPadMJ = function(off)
{
    var _node = getNode(off);
    var _out0  = _node.getChildByName("out0");
    _out0.visible = false;
    var _out1 = _node.getChildByName("out1");
    _out1.visible = false;
    var _out2 = _node.getChildByName("out2");
    if (_out2) _out2.visible = false;

    var _stand = _node.getChildByName("stand");
    if(_stand) _stand.visible = false;

    switch (off)
    {
        case 0:
            setWgtLayout(_out0, [0.06, 0.06], [0.545, -0.08], [-7, 6.1]);
            setWgtLayout(_out1, [0.06, 0.06], [0.545, -0.06], [-7, 4.9]);
            if(_out2) setWgtLayout(_out2, [0.06, 0.06], [0.545, -0.04], [-7, 3.7]);

            if (MjClient.MaxPlayerNum == 2)
            {
                _out0.x -= _out0.height * _out0.scale * 5;
                _out1.x -= _out1.height * _out1.scale * 5;
                if(_out2) _out2.x -= _out2.height * _out2.scale * 5;
            }
            break;
        case 1:
            setWgtLayout(_out0, [0.04, 0.04], [0.9, 0.5], [-5.2, -4.0]);
            setWgtLayout(_out1, [0.04, 0.04], [0.9, 0.5], [-4.0, -4.0]);
            if(_out2) setWgtLayout(_out2, [0.04, 0.04], [0.9, 0.5], [-2.6, -4.0]);
            break;
        case 2:
            setWgtLayout(_out0, [0.059, 0.059], [0.545, 0.95], [4.1, -4.1]);
            setWgtLayout(_out1, [0.059, 0.059], [0.545, 0.95], [4.1, -3.2]);
            if(_out2) setWgtLayout(_out2, [0.059, 0.059], [0.545, 0.95], [4.1, -2.3]);
            setWgtLayout(_stand,[0, 0.07],[0.45, 1], [-6, -1.0]);

            if (MjClient.MaxPlayerNum == 2)
            {
                _out0.x += _out0.height * _out0.scale * 5.5;
                _out1.x += _out1.height * _out1.scale * 5.5;
                if(_out2) _out2.x += _out2.height * _out2.scale * 5.5;
            }

            break;
        case 3:
            setWgtLayout(_out0, [0.04, 0.04], [0.1, 0.5], [5.2, 4.2]);
            setWgtLayout(_out1, [0.04, 0.04], [0.1, 0.5], [3.9, 4.2]);
            if(_out2) setWgtLayout(_out2, [0.04, 0.04], [0.1, 0.5], [2.6, 4.2]);
            break;
    }
}

COMMON_UI.setPlayingBtnSize = function()
{
    var _setScale = 1.2;
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
        _setScale = 1.0;
    }
    var _chat_btn = MjClient.playui._downNode.getParent().getChildByName("chat_btn");
    _chat_btn.setScale(_chat_btn.getScale()*_setScale);
    var _voice_btn = MjClient.playui._downNode.getParent().getChildByName("voice_btn");
    _voice_btn.setScale(_voice_btn.getScale()*_setScale);
    var _chat_btn = MjClient.playui._downNode.getParent().getChildByName("chat_btn");
    _chat_btn.setScale(_chat_btn.getScale());
};

//徐州发牌效果 4 + 4 + 4 +1
COMMON_UI.playMjhandAni = function()
{

    var pl = getUIPlayer(0);
    var node = getNode(0);
    if (pl.mjhand) {
        for (var i = 0; i < pl.mjhand.length; i++) {
            getNewCard(node, "stand", "mjhand", pl.mjhand[i], 0);
        }
    }

    var up = node.getChildByName("up");
    var stand = node.getChildByName("stand");
    var start, offui;
    start = up;
    offui = stand;
    var upSize = offui.getSize();
    var upS = offui.scale;
    var uistand = [];
    var children = node.children;
    var downDis = upSize.height * upS * 0.4;

    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            ci.stopActionByTag(20180131);
            if((typeof MjClient.init_y) == 'undefined')
            {
                MjClient.init_y = ci.y;
            }

            ci.y = MjClient.init_y + downDis;
        }
    }

    for(var i = 0; i < children.length; i++) //children 为 "down" 节点下的字节点
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            uistand.push(ci);
            ci.x = cc.winSize.width * 1.1;
            ci.addTouchEventListener(function () {});
        }
    }

    var statX = start.x + upSize.width * upS * 0.1;


    for(var i = 0;i < 13;i++)
    {
        var idx = parseInt(i/4);
        var endx = statX + upSize.width * upS *1.2*i;

        var ci = uistand[i];

        var _spawnAction = cc.spawn(cc.moveTo(0,cc.p(endx,ci.y)),cc.moveBy(0.1,cc.p(0,-downDis)));

        if(i == 12)
        {
            ci.runAction(cc.sequence(cc.delayTime(0.3*idx),cc.callFunc(function () {
                playEffect("select");
            }), _spawnAction,cc.callFunc(function(){

                MjClient.clickTing = false;
                hideCurrentTingNum();
                MjClient.playui.EatVisibleCheck();
                MjClient.playui.CardLayoutRestore(node, 0);
            })));
        }
        else
        {
            ci.runAction(cc.sequence(cc.delayTime(0.3*idx),cc.callFunc(function () {
                playEffect("select");
            }), _spawnAction));
        }
    }
}

//打牌插牌动画
COMMON_UI.afterMjputAnimation = function()
{
    cc.log("----------播放插牌动画------MjClient.newCard = " + MjClient.newCard);
    
    var pl = getUIPlayer(0);
    if(!MjClient.newCard || !cc.sys.isObjectValid(MjClient.newCard) || MjClient.clickTing || !cardBeginPos || pl.tPutCard)
    {
        cc.log("----------打出去的是新摸的牌，不用插牌动作--00----");
        MjClient.isChaPaiPlaying = false;
        MjClient.playui.CardLayoutRestore(getNode(0),0);
        return;
    }

    MjClient.isChaPaiPlaying = true;
    // //刷新手牌大小
    // resetCardSize();

    var node = getNode(0);
    var _cpnode = node.getChildByName("stand");
    var scaleStand = _cpnode.getScale()*1.30;

    var children = node.children;
    var handcardUI = [];
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            handcardUI.push(ci);
        }
    }


    handcardUI.sort(function (a, b) {return (a.x  - b.x)});

    var emptyIdx = 0;
    var emptyX = 0;
    for(var i = 0; i < handcardUI.length; i++)
    {
        if(handcardUI[i].x >= cardBeginPos.x)
        {
            emptyIdx = i;
            emptyX = handcardUI[i].x;
            break;
        }
    }

    var newCartPosIdx = 0;
    for(var i = 0; i < handcardUI.length; i++)
    {
        //徐州的白板可以当癞子的特殊牌使用
        var tagValue = handcardUI[i].tag;
        var newCardTag =  MjClient.newCard.tag;
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ)
        {

            if(tagValue == 91)
            {
                tagValue = handcardUI[i].getUserData();
            }


            if(newCardTag == 91)
            {
                newCardTag = MjClient.newCard.getUserData();
            }
        }

        //癞子放在最前面
        if(MjClient.newCard.tag  == MjClient.data.sData.tData.hunCard )
        {
            newCartPosIdx = 0;
            break;
        }

        if(MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN == MjClient.gameType ||
            MjClient.GAME_TYPE.HE_JIN_KUN_JIN == MjClient.gameType)
        {
            if(MjClient.newCard.tag  == MjClient.data.sData.tData.hunCard2)
            {
                newCartPosIdx = 0;
                break;
            }
        }

        //if(tagValue >= newCardTag && tagValue != MjClient.data.sData.tData.hunCard && tagValue != MjClient.data.sData.tData.hunCard2 )
        if(tagValue >= newCardTag && !isHunCard(tagValue))
        {
            newCartPosIdx = i;
            break;
        }
    }

    var cardBetween = COMMON_UI.cardBetween;
    //岳阳插牌由于移动不到位导致产生回弹现象
    if (MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) {
        if (COMMON_UI3D.is3DUI()) {
            cardBetween = 1.26;
        } else {
            cardBetween = 1.24;
        }
    }

    //移牌位置
    var stand = node.getChildByName("stand");
    var upSize = stand.getSize();
    var upS = stand.scale;
    var oneCardWith  = upSize.width * upS * cardBetween;
    var oneCardHeigh = upSize.height * upS *1.2;

    var moveDis = handcardUI[newCartPosIdx].x;
    if(newCartPosIdx > emptyIdx) //插牌在右边,牌往左边移
    {
        moveDis = handcardUI[newCartPosIdx - 1].x;
    }
    else if(newCartPosIdx == emptyIdx)
    {
        moveDis = cardBeginPos.x;
    }

    for(var i = 0; i < handcardUI.length; i++)
    {
        if(newCartPosIdx > emptyIdx) //插牌在右边,牌往左边移
        {
            if(i >= emptyIdx && i < newCartPosIdx)
            {
                handcardUI[i].runAction(cc.moveBy(0.3,cc.p(-oneCardWith,0)));
            }
        }
        else if(newCartPosIdx < emptyIdx)
        {
            if(i < emptyIdx && i >= newCartPosIdx)
            {
                handcardUI[i].runAction(cc.moveBy(0.3,cc.p(oneCardWith,0)));
            }
        }else{

        }
    }

    var _upAction   = cc.moveBy(0.1,cc.p(0,oneCardHeigh));
    var _moveAction =  cc.moveTo(0.3,cc.p(moveDis, stand.y + oneCardHeigh));
    var _downAction =  cc.moveTo(0.1,cc.p(moveDis,_cpnode.y));

    //handcardUI[handcardUI.length - 1].setScale(scaleStand);

    if(newCartPosIdx == (handcardUI.length - 1))//最后一个位置时，不用提上来，再放下去，直接横移过去
    {
        cc.log("----------------------最后一个位置时，不用提上来，再放下去，直接横移过去");
        var _moveAction1 =  cc.moveTo(0.3,cc.p(moveDis, stand.y));
        handcardUI[handcardUI.length - 1].runAction(cc.sequence( _moveAction1,cc.delayTime(0.3),cc.callFunc(function () {
            MjClient.playui.CardLayoutRestore(getNode(0),0);
            MjClient.isChaPaiPlaying = false;
        })));
    }
    else if (MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) {
        //岳阳插牌动画要求倾斜
        var _leftRotateAction =  cc.rotateBy(0.1, 10);
        var _rightRotateAction =  cc.rotateBy(0.1, -10);

        var currentZorder = handcardUI[handcardUI.length - 1].getLocalZOrder();
        handcardUI[handcardUI.length - 1].setLocalZOrder(300);
        handcardUI[handcardUI.length - 1].runAction(cc.sequence( 
            cc.spawn(_upAction,_leftRotateAction),_moveAction,_rightRotateAction,_downAction,cc.callFunc(function () {
            handcardUI[handcardUI.length - 1].setRotation(0.0);
            handcardUI[handcardUI.length - 1].setLocalZOrder(currentZorder);
            MjClient.playui.CardLayoutRestore(getNode(0),0);
            MjClient.isChaPaiPlaying = false;
        })));
    }
    else
    {
        var currentZorder = handcardUI[handcardUI.length - 1].getLocalZOrder();
        handcardUI[handcardUI.length - 1].setLocalZOrder(300);
        handcardUI[handcardUI.length - 1].runAction(cc.sequence( _upAction,_moveAction,_downAction,cc.delayTime(0.3),cc.callFunc(function () {
            handcardUI[handcardUI.length - 1].setLocalZOrder(currentZorder);
            MjClient.playui.CardLayoutRestore(getNode(0),0);
            MjClient.isChaPaiPlaying = false;
        })));
    }


    if(MjClient.newCard)
    {
        // MjClient.isChaPaiPlaying = false;
        delete MjClient.newCard;
        MjClient.newCard = null;
    }
}

// 统计立着牌手牌个数
COMMON_UI.countMjHandNums = function (orders, off)
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

//徐州摸新牌抖动动画
COMMON_UI.newCardShakAni = function(cardNode,off,justDown)
{
    if(!cardNode) return;
    var pl = getUIPlayer(off);
    if(pl.isTianting || pl.isTing) return; //听牌后不用做抖动动画，会跟出牌动画冲突
    if(MjClient.rePlayVideo != -1) return;//回放的时候不用斗牌
    var _standui = MjClient.playui._downNode.getChildByName("stand");
    var _hight = _standui.getScale()*_standui.getSize().height;


    var a1,a2,a3,a4,action;
    if(MjClient.getAppType()==MjClient.APP_TYPE.QXYZQP){
        if(off == 0)
        {
            a1 = cc.moveBy(0.2,cc.p(0,10));
            a2 = cc.moveBy(0.1,cc.p(0,-10));
            a3 = cc.moveBy(0.2,cc.p(0,5));
            a4 = cc.moveBy(0.2,cc.p(0,-5));
            action = cc.sequence(a1,a2,a3,a4);
        }
        else if(off == 1 || off == 2 || off == 3)
        {
            a1 = cc.moveBy(0.2,cc.p(0,10));
            a2 = cc.moveBy(0.1,cc.p(0,-10));
            a3 = cc.moveBy(0.2,cc.p(0,5));
            a4 = cc.moveBy(0.2,cc.p(0,-5));
            action = cc.sequence(a1,a2,a3,a4,cc.delayTime(2)).repeatForever();
        }
    }else{
        if(off == 0)
        {
            if(justDown) //只有掉落没有抖动
            {
                a1 = cc.moveBy(0.2,cc.p(0,-20));
                action = cc.sequence(a1,cc.callFunc(function(){
                    cardNode.setPositionY(_standui.y);
                }));
            }
            else {
                cardNode.setPositionY(_standui.y);
                a1 = cc.moveBy(0.2,cc.p(0,-10));
                a2 = cc.moveBy(0.1,cc.p(0,10));
                a3 = cc.moveBy(0.2,cc.p(0,-10));
                action = cc.sequence(a1,a2,a3,cc.callFunc(function(){
                    cardNode.setPositionY(_standui.y);
                }));
            }
        }
        else if(off == 1 || off == 2 || off == 3)
        {
            a1 = cc.moveBy(0.2,cc.p(0,_hight*0.15));
            a2 = cc.moveBy(0.1,cc.p(0,-_hight*0.15));
            a3 = cc.moveBy(0.2,cc.p(0,_hight*0.1));
            a4 = cc.moveBy(0.2,cc.p(0,-_hight*0.1));
            action = cc.sequence(a1,a2,a3,a4,cc.delayTime(2)).repeatForever();
        }
    }


    cardNode.runAction(action);
}

//岳阳摸新牌抖动动画
COMMON_UI.newCardShakAni_yueYang = function(cardNode, off) {
    var pl = getUIPlayer(off);
    if (!cardNode || pl.isTianting || pl.isTing || MjClient.rePlayVideo != -1) {
        return;
    }
    
    var standCard = MjClient.playui._downNode.getChildByName("stand");
    var standCardHight = standCard.getScale()*standCard.getSize().height;
    var originPos = cardNode.getPosition();
    var action = null;
    if (off == 0) {
        cardNode.setPositionY(standCard.y + 20);
        action = cc.sequence(cc.moveBy(0.1, cc.p(0, -20)), cc.callFunc(function () {
            cardNode.y = originPos.y;
        })); 
    } else if (off == 1 || off == 2 || off == 3) {
        a1 = cc.moveBy(0.2,cc.p(0,standCardHight*0.15));
        a2 = cc.moveBy(0.1,cc.p(0,-standCardHight*0.15));
        a3 = cc.moveBy(0.2,cc.p(0,standCardHight*0.1));
        a4 = cc.moveBy(0.2,cc.p(0,-standCardHight*0.1));
        action = cc.sequence(cc.delayTime(3), a1, a2, a3, a4).repeatForever();
    }
    action.setTag(1);
    cardNode.runAction(action);

    //因为对家出牌时删除的不是摸的牌，所以出牌时要停止其抖牌动画
    if (off == 2) {
        UIEventBind(null, cardNode, "MJPut", function (eD) {
            cardNode.stopActionByTag(1);
            cardNode.setPositionY(originPos.y);
        });
    }
    
}

/**
 * 新版摸新牌抖动  by Tom
*/
COMMON_UI.newCardShakeAnimation = function()
{
    if(MjClient.rePlayVideo !== -1) return;
    for(var off = 0; off < 4; off ++)
    {
        var arr = [];
        var newCardNode = null;
        var node = getNode(off);
        var childs = node.children;
        var pl = getUIPlayer(off);
        if(pl.isTing) return;
        for(var i = 0; i < childs.length; i++)
        {
            var cd = childs[i];
            if(off === 0 && cd.name === "mjhand")
            {
                cd.stopAllActions();
                arr.push(cd);
                if(pl && pl.mjhand && newCardNode === null && cd.tag === pl.mjhand[pl.mjhand.length - 1])
                {
                    newCardNode = cd;
                }
            }
            else
            {
                if(cd.name === "standPri")
                {
                    cd.stopAllActions();
                    arr.push(cd);
                }
            }
        }

        var len = arr.length;
        if(len % 3 === 2)
        {
            var newCard = null;
            var a1, a2, a3, a4, action0, action1;
            switch (off)
            {
                case 0:
                    if(newCardNode) newCard = newCardNode;
                    break;
                case 1:
                    newCard = arr[0];
                    break;
                case 2:
                    if(COMMON_UI3D.is3DUI())
                        newCard = arr[arr.length - 1];
                    else
                        newCard = arr[0];
                    break;
                case 3:
                    newCard = arr[arr.length - 1];
                    break;
            }
            // newCard.setColor(cc.color(0, 0, 0));
            a1 = cc.MoveBy(0.1, cc.p(0,  15));
            a2 = cc.MoveBy(0.1, cc.p(0, -15));
            a3 = cc.MoveBy(0.1, cc.p(0,   8));
            a4 = cc.MoveBy(0.1, cc.p(0,  -8));
            action0 = cc.sequence(a1, a2, a3, a4);
            action1 = cc.sequence(a1, a2, a3, a4, cc.delayTime(2)).repeatForever();
            if(newCard)
            {
                if(off === 0)
                    newCard.runAction(action0);
                else
                    newCard.runAction(action1);
            }
        }
    }
};


/***
 * 小结算之前倒牌入口      by Tom
 */
COMMON_UI.showMjhandBeforeEndOne = function()
{
    cc.log("=========showMjhandBeforeEndOne===============");

    if (MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO) 
    {
        for(var i = 0; i < 4; i++)
        {
            var pl_index = MjClient.getPlayerByIndex(i);
            if (pl_index && typeof(pl_index.mjhand) == "undefined") 
            {
                return;
            }
        }
    }
    var fun = null;
    if(COMMON_UI3D.is3DUI())
    {
        fun = function (off)
        {
            COMMON_UI3D.showMjhandBeforeEndOnePlayer(off);
        }
    }
    else
    {
        fun = function (off)
        {
            COMMON_UI.showMjhandBeforeEndOnePlayer(off);
        }
    }

    for(var off = 0; off < 4; off ++)
    {
        fun(off);
    }
};

/***
 *  2, 3D倒牌总入口      by Tom
 */
COMMON_UI.showMjhandBeforeEndOnePlayer = function(off) {
    if(COMMON_UI3D.is3DUI()) return COMMON_UI3D.showMjhandBeforeEndOnePlayer(off);
    var node = getNode(off);
    if(!node)
    {
        return;
    }

    var pl = getUIPlayer(off);
    if (!pl || !pl.mjhand || MjClient.rePlayVideo !== -1 ) return;
    var children = node.children;
    var mjhand = pl.mjhand;

    //删除桌面的牌
    for (var i = 0; i < children.length; i++) {
        var ci = children[i];
        if (ci.name === "standPri" || ci.name === "mjhand" || ci.name === "mjhand_replay") {
            ci.removeFromParent();
        }
    }

    //当点炮时，不显示点炮的牌
    if (MjClient.data.sData.tData.tState === TableState.waitEat && mjhand.length % 3 === 2) mjhand = mjhand.slice(0, -1);

    //重新创建所有玩家手牌
    var handLen = mjhand.length;
    var myCard = [];
    for (var i = 0; i < handLen; i++) {
        var cd = getNewCard(node, "up", "mjhand_replay", mjhand[i], off);
        if(off === 0) myCard.push(cd);
    }

    // 显示自己手牌, off == 0, 自行CardLayout, 整理到屏幕中间(因为CardLayoutRestore对自己手牌不会居中对齐)
    if(off === 0){
        var upNode = node.getChildByName("up");
        var startX = cc.winSize.width * 0.82;
        var startY = cc.winSize.height * 0.1;
        var len = myCard.length;
        if(len === 0) return;
        var upw = upNode.width * upNode.scale;
        var myCard = myCard.sort(TagOrder);
        for(var i = len - 1; i > -1; i--) {
            var idm = len - i - 1;
            myCard[i].x = startX - upw * idm * 1.05;
            myCard[i].y = startY;
        }
    // 显示别人手牌, off !== 0 别人的手牌，直接 CardLayout
    } else{
        MjClient.playui.CardLayoutRestore(node, off);
    }

};

//听牌按钮的功能
COMMON_UI.tingBtnAndCards = function()
{
    var pl = getUIPlayer(0);
    if(pl.isTing) return; //非报听模式，适用

    var _downNode = getNode(0);
    var _that = MjClient.playui;
    var isClickBtn = false;

    //初始化
    var headNode = _downNode.getChildByName("head");
    var btnTing = new ccui.Button();
    btnTing.visible = false;
    var _tingCardsNode = MjClient.playui._tingCardsNode;
    if(MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN == MjClient.gameType) {
        _tingCardsNode = MjClient.playui._tingCardNumNode;
    }

    _tingCardsNode.visible = false;
    btnTing.loadTextureNormal("playing/gameTable/tingBtn.png");
    btnTing.setPosition(cc.p(headNode.getContentSize().width/2,headNode.getContentSize().height*1.5));
    btnTing.setScale(0.9);
    btnTing.setName("tingBtn");
    btnTing.setEnabled(true);
    headNode.addChild(btnTing,100);
    btnTing.addTouchEventListener(function(sender,type){
        if(type == 2)
        {
            var _curTingCards = _downNode.getChildByName("tingCardNumNode");
            if(_curTingCards.isVisible() && MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN != MjClient.gameType)
            {
                btnTing.setTouchEnabled(false);
                return;
            }

            if(!_tingCardsNode.visible)
            {
                isClickBtn = true;
                _tingCardsNode.visible = true;
                if (MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN == MjClient.gameType) {
                    // 这里用 getUIPlayer(0) 而不是 上面的pl，是为了解决乡宁摔金打出去牌的顺序锁屏造成提示不对的bug
                    MjClient.playui.setCurrentTingNum(MjClient.majiang.getTingCardSetByPlayer(getUIPlayer(0)));
                }

            }
            else
            {
                isClickBtn = false;
                _tingCardsNode.visible = false;
            }
            cc.log("------------------btn ting =============");
        }
    },this);
    // var that = MjClient.playui;
    cc.eventManager.addListener({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: false,
        status: null,
        onTouchBegan: function(touch, event) {
            if (_tingCardsNode.isVisible()  && !pl.isTing && isClickBtn) {
                _tingCardsNode.setVisible(false);
                return true;
            } else {
                return false;
            }
        },
    },_tingCardsNode);


    //比较2个对象是否相同
    var compare = function (obj1,obj2) {
        var state = true;
        for (var key in obj1) {
            if (typeof (obj2[key]) === 'undefined') {
                state = false;
            } else {
                if (typeof (obj1[key]) === 'object') {
                    compare(obj1[key],obj2[key]);
                } else {
                    if (obj1[key] !== obj2[key]) {
                        state = false;
                    }
                }
            }
        }
        return state;
    };

    var checkTingCard = function(eD)
    {
        var pl = getUIPlayer(0);
        var _tingCards = _downNode.getChildByName("tingCardsNode");
        var _curTingCards = _downNode.getChildByName("tingCardNumNode");
        if(MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN == MjClient.gameType) {
            _tingCards = _downNode.getChildByName("tingCardNumNode");
        }

        var tingSet = calTingSet(pl.mjhand);

        var tData = MjClient.data.sData.tData;
        var isUseDefault = true;
        if(MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU == MjClient.gameType || MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI == MjClient.gameType)
        {
            tingSet = MjClient.majiang.calTingSet(pl.mjhand);
        } else if (MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN == MjClient.gameType) {
            tingSet = MjClient.majiang.getTingCardSetByPlayer(pl);
            MjClient.playui.setCurrentTingNum(tingSet);
            isUseDefault = false;
        }

        if(_tingCards && isUseDefault) {
            // if (MjClient.gameType == MjClient.GAME_TYPE.FAN_SHI_XIA_YU
            //     || MjClient.gameType == MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG
            //     || MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO
            //     || (MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU && !MjClient.data.sData.tData.areaSelectMode.baoting)
            // ) {
            if (isJinZhongAPPType()) {
                setTingCards_JINZHONGMJ(_tingCards,tingSet);
            }
            else {
                setTingCards(_tingCards,tingSet);
            }
        }
        var tingCount = Object.keys(tingSet).length;
        var isSame = compare(tingSet,preTingCards);
        preTingCards = tingSet;
        var _tingBtn = _downNode.getChildByName("head").getChildByName("tingBtn");
        _tingCards.visible = false;
        if(tingCount > 0)
        {
            _tingBtn.visible = true;
            // 如果当前听牌内容显示，上次听牌内容不显示并返回（解决重叠问题）
            if(_curTingCards.isVisible())
            {
                _tingCards.visible = false;
                return;
            }

            if(!isSame)//与上次听牌不相同就要播下动画,并且显示当前听得牌   
            {
                _tingCards.visible = true;
                _tingBtn.stopAllActions();
                _tingBtn.runAction(cc.sequence(cc.spawn(cc.tintTo(0.2, 255,0,0),cc.scaleTo(0.25,_tingBtn.getScale() + 0.1)),
                    cc.spawn(cc.tintTo(0.15, 255,255,255),cc.scaleTo(0.2,_tingBtn.getScale()))).repeat(4));
                _tingBtn.visible = true;
                _downNode.scheduleOnce(function(){
                    _tingCards.visible = false;
                    isClickBtn = false;
                },2)
            }
        }
        else
        {
            _tingBtn.visible = false;
        }
    };

    // 吃，碰，杠，出牌的时候，刷新非报停模式下，听牌提示的牌的个数  by jiangcw
    var refreshTingNum = function(pl, tingSet){
        if (!pl || pl.isTing || !btnTing) return;   // 非听模式下
        // 准备出牌的人不刷新
        if(pl.mjhand && pl.mjhand.length % 3 == 2) {
            isClickBtn = false;
            btnTing.visible = false;
            _that._tingCardsNode.visible = false;
            return;
        }
        if (btnTing.visible) {
            var tingSet = tingSet || calTingSet(pl.mjhand);
            cc.log("CommonFunc_UI --------------- refreshTingNum --------------- tingSet = " + JSON.stringify(tingSet));
            // if (MjClient.gameType == MjClient.GAME_TYPE.FAN_SHI_XIA_YU
            //     || MjClient.gameType == MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG
            //     || MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO
            //     || (MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU && !MjClient.data.sData.tData.areaSelectMode.baoting)
            // ) {
            if (isJinZhongAPPType() &&
                MjClient.gameType != MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN

            ) {
                setTingCards_JINZHONGMJ(_that._tingCardsNode,tingSet);
            }
            else if (MjClient.gameType != MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN
            ) {
                setTingCards(_that._tingCardsNode,tingSet);
            }
        }
    };

    var preTingCards = {};
    UIEventBind(null, _downNode, "MJPut", function (eD) {
        var pl = getUIPlayer(0);
        if(pl.isTing) return; //非报听模式，适用
        if (pl && eD.uid == pl.info.uid)
        {
            checkTingCard(eD);
            btnTing.setTouchEnabled(true);
        }

        refreshTingNum(pl);

    });

    UIEventBind(null, _downNode, "MJChi", function (eD) {
        var pl = getUIPlayer(0);
        refreshTingNum(pl);
    });

    UIEventBind(null, _downNode, "MJGang", function (eD) {
        var pl = getUIPlayer(0);
        refreshTingNum(pl);
    });

    UIEventBind(null, _downNode, "MJPeng", function (eD) {
        var pl = getUIPlayer(0);
        refreshTingNum(pl);
    });

    UIEventBind(null, _downNode, "newCard", function (eD) {
        if (!btnTing) {
            return;
        }
        isClickBtn = false;
        btnTing.visible = false;
        _that._tingCardsNode.visible = false;
        // btnTing.setTouchEnabled(false);
    });


    UIEventBind(null, _downNode, "initSceneData", function (eD) {

        if (!btnTing) return;
        var tData = MjClient.data.sData.tData;
        if(tData.tState === TableState.waitJoin || tData.tState === TableState.waitReady || tData.tState === TableState.roundFinish)
        {
            btnTing.visible = false;
            return;
        }

        var pl = getUIPlayer(0);
        var tingSet = calTingSet(pl.mjhand);
        refreshTingNum(pl, tingSet);
        cc.log("CommonFunc_UI --------------- refreshTingNum --------------- tingSet ss = " + JSON.stringify(tingSet));
        isClickBtn = false;
        btnTing.visible = false;
        _that._tingCardsNode.visible = false;

        var _tingCount = Object.keys(tingSet).length;
        cc.log("===================== pl.putCount = " + pl.putCount);

        if(_tingCount > 0 && pl.putCount > 0)
        {
            isClickBtn = true;
            btnTing.visible = true;
            btnTing.setTouchEnabled(true);
            _that._tingCardsNode.visible = true;
        }
        cc.log("===================== pl.mjState = " + pl.mjState);
        if(pl.mjhand && pl.mjhand.length % 3 == 2)
        {
            isClickBtn = false;
            btnTing.visible = false;
            _that._tingCardsNode.visible = false;
        }

    });

    UIEventBind(null, _downNode, "clearCardUI", function (eD) {
        var _tingbtn = _downNode.getChildByName("head").getChildByName("tingBtn");
        isClickBtn = false;
        _tingbtn.visible = false;
        _that._tingCardsNode.visible = false;
        preTingCards = {};
    });

}


//简化听牌的界面 by sking 2019.4.2
COMMON_UI.showTingCardsBtn = function(callBack)
{

    var tData = MjClient.data.sData.tData;
    if ("isOpenTingTip" in tData.areaSelectMode){
         if(!tData.areaSelectMode.isOpenTingTip) return;
    }

    if(MjClient.rePlayVideo != -1){
        return;
    }

    var pl = getUIPlayer(0);
    var _downNode = getNode(0);
    var isClickBtn = false;
    //初始化

    var btnTing = _downNode.getParent().getChildByName("showTingBtn");
    if(!btnTing)
    {
        btnTing = new ccui.Button();
        btnTing.setName("showTingBtn");
        btnTing.loadTextureNormal("playing/gameTable/tingCard.png");
        _downNode.getParent().addChild(btnTing);
    }

    btnTing.visible = false;
    var _tingCardsNode = MjClient.playui._tingCardNumNode;
    _tingCardsNode.visible = false;
    setWgtLayout(btnTing,[0.09, 0.09], [0.17, 0],[0, 2.8]);
    btnTing.addTouchEventListener(function(sender,type){
        if(type == 2)
        {
            var sData = MjClient.data.sData;
            var tData = sData.tData;

            if(tData.tState != TableState.waitPut &&
                tData.tState != TableState.waitEat &&
                tData.tState != TableState.waitCard)
            {
                return;
            }

            if(callBack) {
                callBack()
            }
            else {
                var pl = getUIPlayer(0);
                var _currentCard =  CurrentPutCardMsg();
                var tingCards = {};
                if (COMMON_UI.isNewGame()) 
                {
                    if (pl.tingLists && pl.tingLists[_currentCard]) 
                    {
                        var curtingset = pl.tingLists[_currentCard];
                        for (var i = 0; i < curtingset.length; i++) {
                            tingCards[curtingset[i]] = 1;
                        }
                    }
                }
                else{
					if(MjClient.majiang.getCheckTingHuCards)
					{
						tingCards = MjClient.majiang.getCheckTingHuCards(_currentCard,pl.mjhand);
					}
					else
					{
						tingCards = getCheckTingHuCards(_currentCard,pl.mjhand);
					}
                }

                if (MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO) 
                {
                    for (var i = 0; i < pl.tingListAfterPut.length; i++) {
                        tingCards[pl.tingListAfterPut[i]] = 1;
                    }
                }
                setCurrentTingNum(tingCards);
                cc.log(_currentCard + " = _currentCard ================================== tingCards = " + JSON.stringify(tingCards));
                isClickBtn = true;
            }
        }
    },this);
    cc.eventManager.addListener({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: false,
        status: null,
        onTouchBegan: function(touch, event) {
            if (_tingCardsNode.isVisible()  && isClickBtn) {
                _tingCardsNode.setVisible(false);
                return true;
            } else {
                return false;
            }
        },
    },_tingCardsNode);


    function setBtnStata(isMjPut){

        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var pl = getUIPlayer(0);
        if(tData.tState != TableState.waitPut &&
            tData.tState != TableState.waitEat &&
            tData.tState != TableState.waitCard)
        {
            btnTing.visible = false;
            return  _tingCardsNode.visible = false;
        }

        var _currentCard =  CurrentPutCardMsg();
        if (isMjPut && COMMON_UI.isChaPai && (MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ)) {
            _currentCard = -1;
        }

        var tingCards = {};
        if (COMMON_UI.isNewGame()) 
        {
            if (pl.tingLists && pl.tingLists[_currentCard]) 
            {
                var curtingset = pl.tingLists[_currentCard];
                for (var i = 0; i < curtingset.length; i++) {
                    tingCards[curtingset[i]] = 1;
                }
            }
        }
        else{
            if(MjClient.majiang.getCheckTingHuCards)
            {
                tingCards = MjClient.majiang.getCheckTingHuCards(_currentCard,pl.mjhand);
            }
            else
            {
                tingCards = getCheckTingHuCards(_currentCard,pl.mjhand);
            }
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO) 
        {
            for (var i = 0; i < pl.tingListAfterPut.length; i++) {
                tingCards[pl.tingListAfterPut[i]] = 1;
            }
        }
        btnTing.visible = false;
        if(Object.keys(tingCards).length > 0)
        {
            btnTing.visible = true;
        }
    }


    UIEventBind(null, _downNode, "MJPut", function (eD) {
        if (eD.uid == SelfUid()) {
            if(btnTing) btnTing.visible = false;
            if(MjClient.playui._tingCardNumNode)  MjClient.playui._tingCardNumNode.visible = false;
            setBtnStata(true);
        }
    });

    UIEventBind(null, _downNode, "initSceneData", function (eD) {
        setBtnStata();
    });

    UIEventBind(null, _downNode, "clearCardUI", function (eD) {
        if(btnTing) btnTing.visible = false;
        if(MjClient.playui._tingCardNumNode)  MjClient.playui._tingCardNumNode.visible = false;

    });

    UIEventBind(null, _downNode, "mjhand", function (eD) {
        if(btnTing) btnTing.visible = false;
        if(MjClient.playui._tingCardNumNode)  MjClient.playui._tingCardNumNode.visible = false;
    });

    UIEventBind(null, _downNode, "sendKaiGangCard", function (eD) {
        if (eD.uid == SelfUid()) {
            if(btnTing) btnTing.visible = false;
            if(MjClient.playui._tingCardNumNode)  MjClient.playui._tingCardNumNode.visible = false;
            setBtnStata();
        }
    });
}

/***
 * 去掉箭头对象中多余的牌：防止听0张加箭头
 * @param mjhand
 * @param canTingCards
 */
COMMON_UI.deleteCanTingCardsForShowArrow = function(mjhand, canTingCards){
    var hun = MjClient.data.sData.tData.hunCard || 200;
    if(canTingCards === {}) return {};
    for(var cd in canTingCards) {
        var hand = mjhand.slice();
        var idx = hand.indexOf(Number(cd));
        hand.splice(idx, 1);
        var tingSet = {};
        if (COMMON_UI.isNewGame()) 
        {
            var pl = getUIPlayer(0);
            if (pl.tingListAfterPut) 
            {
                tingSet = pl.tingListAfterPut;
            }   
        }
        else{
            tingSet = calTingSet(hand, hun);
        }
        var counts = {};
        for(var card in tingSet) {
            counts[card] = 0;
            for(var i = 0; i < mjhand.length; i++){
                if(Number(card) === mjhand[i]) counts[card] ++;
            }
        }
        var all4 = true;
        for (var card in counts) {
            if (counts[card] < 4) {
                all4 = false;
                break;
            }
        }
        if(all4) delete canTingCards[cd];
    }
    return canTingCards;
};

/***
 *  胡牌引导，可听得牌加箭头   - by Tom
 */
COMMON_UI.willHuShowArrow = function()
{
    COMMON_UI.cleanTingSign();
    var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer(0);
    if ("isOpenTingTip" in tData.areaSelectMode && !tData.areaSelectMode.isOpenTingTip) return;

    if(!IsTurnToMe() || !pl.mjhand || pl.isTing) return;

    // 依次打掉每一张牌，判断是否可听，可听标记为1
    var myCards = MjClient.playui._downNode.children;
    var hunCard = MjClient.data.sData.tData.hunCard;
    var _canTingCards = {};

    // 防止canTingCards多计算一次
    if( !!MjClient.canTingCards && Object.keys(MjClient.canTingCards).length > 0)
    {
        _canTingCards = MjClient.canTingCards;
    }
    else if (COMMON_UI.isNewGame()) 
    {
        if (pl.tingLists)
        {
            for (var i in pl.tingLists)
            {
                _canTingCards[i] = 1;
            }
        }   
    }
    else
    {
        for(var i = 0; i < pl.mjhand.length; i++)
        {
            var afterPutCards = pl.mjhand.slice();
            afterPutCards.splice(i, 1);
            if(MjClient.majiang.canTing && MjClient.majiang.canTing(afterPutCards, hunCard, pl))
            {
                _canTingCards[pl.mjhand[i]] = 1;
            }
        }
    }


    //  去掉箭头对象中多余的牌：防止听0张加箭头
    _canTingCards = COMMON_UI.deleteCanTingCardsForShowArrow(pl.mjhand, _canTingCards);
    cc.log("Tom -----------------------------   _canTingCards ", JSON.stringify(_canTingCards));

    // 添加听牌标识
    if(Object.keys(_canTingCards).length <= 0) return;

    var tingMostCard = calculateTotalCardsOfTingHu(_canTingCards, pl.mjhand);

    for(var i = 0; i < myCards.length; i++)
    {
        if((myCards[i].name === "mjhand") && (myCards[i].tag in _canTingCards))
        {
            var tingSign = myCards[i].getChildByName("tingSign");
            if (!tingSign)
            {
                if ((MjClient.gameType === MjClient.GAME_TYPE.ML_HONGZHONG || 
                    MjClient.gameType === MjClient.GAME_TYPE.ML_HONGZHONG_ZERO ||
                    MjClient.gameType === MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
                    MjClient.gameType === MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI ||
                    MjClient.gameType === MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
                    MjClient.gameType === MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU ||
                    MjClient.gameType === MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ ||
                    MjClient.gameType === MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING ||
                    MjClient.gameType === MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING ||
                    MjClient.gameType === MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN ||
                    MjClient.gameType === MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG ||
                    MjClient.gameType === MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG ||
                    MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG ||
                    MjClient.gameType === MjClient.GAME_TYPE.CHAO_GU_MJ ||
                    MjClient.gameType === MjClient.GAME_TYPE.NAN_XIAN_MJ ||
                    MjClient.gameType === MjClient.GAME_TYPE.CHEN_ZHOU ||
                    MjClient.gameType === MjClient.GAME_TYPE.YUAN_JIANG_MJ ||
                    MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_MJ ||
                    MjClient.gameType === MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
                    MjClient.gameType === MjClient.GAME_TYPE.CHANG_SHA
                    )
                    && tingMostCard[myCards[i].tag] > 0) {
                    tingSign = new cc.Sprite("playing/other/tingcardmost.png");
                } else {
                    tingSign = new cc.Sprite("common/tingcard.png");
                }
                
                tingSign.setName("tingSign");
                myCards[i].addChild(tingSign);
            }
            tingSign.setPosition(myCards[i].getContentSize().width/2, myCards[i].getContentSize().height+20);
            tingSign.setVisible(true);
        }
    }


    var downNode = getNode(0);
    UIEventBind(null, downNode, "MJPut", function () {
        COMMON_UI.cleanTingSign();
    });
};


/***
 *  胡牌引导，清除箭头   - by Tom
 */
COMMON_UI.cleanTingSign = function()
{
    var pl = getUIPlayer(0);
    if(!pl) return;
    if(!pl.mjhand) return;
    var myCards = MjClient.playui._downNode.children;
    for(var i = 0; i < myCards.length; i++)
    {
        if((myCards[i].name === "mjhand") && myCards[i].getChildByName("tingSign"))
        {
            myCards[i].getChildByName("tingSign").removeFromParent();
        }
    }
};


//显示当前可以，吃，碰，杠的牌
COMMON_UI.showCurrentEatCards = function(vnode)
{
    COMMON_UI.clearShowCurrentEatCards();
    if(vnode.length <= 0) return;



    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pl = sData.players[SelfUid() + ""];
    var eat = MjClient.playui.jsBind.eat;


    var _bgNode =  MjClient.playui._AniNode.getChildByName("vnodeBG");

    if(!_bgNode)
    {
        _bgNode = new ccui.ImageView("playing/other/vnodeBG.png");
        _bgNode.setName("vnodeBG");
        //_bgNode.setAnchorPoint(0.8,0.5);
        MjClient.playui._AniNode.addChild(_bgNode,21);
    }
    else
    {
        _bgNode.visible = true;
    }

    var upOff = 0;
    if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.CHANG_PAI) //长牌需要调整显示位置。
    {
        upOff = 0.08;
    }

    /*按钮移到右边*/
    setWgtLayout(_bgNode, [0, 0.16], [0.9, upOff], [-0.1, 2.15], false, false);
    _bgNode.setAnchorPoint(0.88,0.5);
    _bgNode.setScaleX(_bgNode.getScaleX()*(0.6 + (vnode.length- 2)*0.3));


    for(var i = vnode.length - 1;i >= 0;i--)
    {
        var dx = (vnode.length - i);
        if(vnode.length == 1) dx = 1.7;

        vnode[i].setLocalZOrder(25);
        setWgtLayout(vnode[i], [0, 0.19], [1.08, upOff], [-dx* 1.55, 1.8], false, false);
    }

    //过按钮,变小
    if( vnode.indexOf(eat.guo._node) >= 0 )
    {
        var guoNode = vnode[vnode.indexOf(eat.guo._node)];
        if (isJinZhongAPPType()
            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
            guoNode.setScale(guoNode.getScale()*1.2);
            guoNode.setPosition(guoNode.getPositionX()*0.95,guoNode.getPositionY()*0.99);
        }
        else {
            guoNode.setScale(guoNode.getScale()*0.8);
            guoNode.setPosition(guoNode.getPositionX()*0.95,guoNode.getPositionY()*0.95);
        }
    }

    if(isIPad())
    {
        for(var i = vnode.length - 1;i >= 0;i--)
        {
            var dx = (vnode.length - i);
            if(vnode.length == 1) dx = 1.7;

            vnode[i].setLocalZOrder(25);
            setWgtLayout(vnode[i], [0, 0.13], [1.08, 0.055], [-dx* 1.55, 2.2], false, false);
        }
    }

    var showCardsArray = [];
    //杠
    if (MjClient.gangCards && MjClient.gangCards.length > 0) {
        if (MjClient.gameType == MjClient.GAME_TYPE.JING_LE_KOU_DIAN &&
            MjClient.gangCards.length > 0) 
        {
            
            if (MjClient.fgang && MjClient.fgang != -1) 
            {
                showCardsArray.push(MjClient.fgang);
            }
            else
            {
                showCardsArray = MjClient.gangCards;
            }
            cc.log("MjClient.gangCards[0] ",showCardsArray,MjClient.fgang);
        }
        else
        {
            showCardsArray = MjClient.gangCards;
        }
    }

    //碰
    if (pl.eatFlag & 2) {
        if(showCardsArray.indexOf(tData.lastPutCard) < 0)//碰杠都存在，杠牌已经包含碰的情况
            showCardsArray.push(tData.lastPutCard);
    }

    //吃
    if(MjClient.eatpos && MjClient.eatpos.length > 0)
    {
        if(showCardsArray.indexOf(tData.lastPutCard) < 0)
            showCardsArray.push(tData.lastPutCard);
    }

    //没有可现实的牌
    //if(showCardsArray.length <= 0) _bgNode.visible = false;

    var _copyNode = MjClient.playui._AniNode.getChildByName("gang0").getChildByName("card1");
    if(!_copyNode)
    {
        return MjClient.showMsg("异常报错，请找李晓钟解决！");
    }


    var bingdingNode = vnode[0];

    var posNode = [];
    if(vnode.indexOf(eat.hu._node) >= 0 || vnode.indexOf(eat.ting._node) >= 0) //如果有胡，有听得情况下
    {
        bingdingNode = vnode[1];
        if(showCardsArray.length > 1)
        {
            vnode[0].setPositionX( vnode[0].x - vnode[0].getScale()*vnode[0].getContentSize().width*0.28*(showCardsArray.length -1));
        }
    }


    function createOneCard(cd,bingdingNode,nameIdx) {
        var _cardbg = new ccui.ImageView("playing/other/cardBG.png");
        var _cardNode = _copyNode.clone();
        _cardNode.setColor(cc.color(255,255,255));
        _cardNode.visible = true;
        _cardNode.setPosition(_cardbg.getContentSize().width / 2, _cardbg.getContentSize().height / 2);
        setCardSprite(_cardNode, cd, 0);
        _cardbg.addChild(_cardNode);
        _cardbg.setName("chiPengCard" + nameIdx);

        cc.log("==============bingdingNode.getScale() = " + bingdingNode.getScale());

        if(COMMON_UI3D.is3DUI()) _cardNode.getChildByName("imgNode").setScale(1.2);

        var _scale = bingdingNode.getScale()*1.6;
        _cardbg.setScale(_scale*0.85);
        _cardbg.setPosition(bingdingNode.getPosition().x - _cardbg.getScale() * _cardbg.getContentSize().width * (nameIdx + 2) +10, bingdingNode.getPosition().y);
        _cardNode.setScale(0.46);
        return _cardbg;
    }


    //吃，碰，杠 有2个以上
    var chiPengGangCount = 0;
    var gangNode = null,pengNode = null,chiNode = null;

    if( vnode.indexOf(eat.gang0._node) >= 0 )
    {
        chiPengGangCount++;
        gangNode = vnode[vnode.indexOf(eat.gang0._node)];
    }
    if( vnode.indexOf(eat.peng._node) >= 0 )
    {
        chiPengGangCount++;
        pengNode = vnode[vnode.indexOf(eat.peng._node)];
    }
    if( vnode.indexOf(eat.chi0._node) >= 0)
    {
        chiPengGangCount++;
        chiNode = vnode[vnode.indexOf(eat.chi0._node)];
    }




    if(chiPengGangCount >= 2)
    {

        var cd = showCardsArray[0];
        if(gangNode)
        {
            var _cardbg0 = createOneCard(cd,gangNode,0);
            MjClient.playui._AniNode.addChild(_cardbg0,25);
        }

        if(pengNode)
        {
            var _cardbg1 = createOneCard(cd,pengNode,0);
            MjClient.playui._AniNode.addChild(_cardbg1,25);
        }

        if(chiNode)
        {
            var _cardbg2 = createOneCard(cd,chiNode,0);
            MjClient.playui._AniNode.addChild(_cardbg2,25);
        }

    }
    else
    {
        for(var i = 0;i < showCardsArray.length;i++)
        {
            var cd = showCardsArray[i];
            var _cardbg = createOneCard(cd,bingdingNode,i);
            MjClient.playui._AniNode.addChild(_cardbg,25);
        }
    }

}
//清除当前可以，吃，碰，杠的牌
COMMON_UI.clearShowCurrentEatCards = function()
{
    if(!MjClient.playui || !MjClient.playui._AniNode) return;

    var childrens = MjClient.playui._AniNode.children;
    for(var i = 0;i < childrens.length;i++)
    {
        var node = childrens[i];
        if(node.name && (node.name == "vnodeBG" || node.name.indexOf("chiPengCard") >= 0 ))
        {
            node.removeFromParent();
        }
    }
}
//添加 吃，碰，杠，胡等等按钮的光晕动画
COMMON_UI.addAniEatCardsBtn = function()
{
    // MjClient.Game3DTexiao 3D麻将特效：0代表开，1代表关
    if (!MjClient.Game3DTexiao) {
        MjClient.Game3DTexiao = getCurrent3DMJTexiaoType();
    }

    if (MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ 
        && MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ
        && MjClient.getAppType() != MjClient.APP_TYPE.LYSICHUANMJ
        && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP
        && MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ
        && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ
        && MjClient.getAppType() != MjClient.APP_TYPE.QXHAMJ
        && MjClient.getAppType() != MjClient.APP_TYPE.QXXZMJ
        && MjClient.getAppType() != MjClient.APP_TYPE.QXJSMJ
        && MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ
        && MjClient.getAppType() != MjClient.APP_TYPE.QXHAIANMJ) {
        return;
    }

    var childrens = MjClient.playui._AniNode.children;
    if (COMMON_UI3D.is3DUI() && MjClient.Game3DTexiao == 0) {
        // 新版动画 (吃/碰/杠/胡/过/听等等)
        cc.spriteFrameCache.addSpriteFrames("spine/new_chipengganghuBtn/chipengganganniu0.plist", "spine/new_chipengganghuBtn/chipengganganniu0.png");
        ccs.armatureDataManager.addArmatureFileInfo("spine/new_chipengganghuBtn/chipengganganniu.ExportJson");
    }

    for(var i = 0;i < childrens.length;i++)
    {
        var node = childrens[i];
        if (node.name && (node.name == "chi0"
            || node.name == "peng"
            || node.name == "gang0"
            || node.name == "gang1"
            || node.name == "ting"
            || node.name == "hu"
            || node.name == "ou"
            )) {
            var childNode = node.getChildByName("guangyunnAni");
            if(childNode && childNode.name && childNode.name == "guangyunnAni")
            {
                childNode.removeFromParent();
            }
            if (COMMON_UI3D.is3DUI() && MjClient.Game3DTexiao == 0) {
                // 添加光晕动画
                var guangAni = new ccs.Armature("chipengganganniu");
                guangAni.name = "guangyunnAni";
                if (node.name == "chi0" || node.name == "peng" || node.name == "gang0" || node.name == "gang1") {
                    guangAni.animation.play("huang");
                } else if (node.name == "ting") {
                    guangAni.animation.play("lv");
                } else if (node.name == "hu") {
                    guangAni.animation.play("hong");
                } else if (node.name == "ou") {
                    guangAni.animation.play("hui");
                }
                if (isJinZhongAPPType()
                    || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ
                    || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ
                    || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                    guangAni.setAnchorPoint(cc.p(0.5, 0.48));
                }
                guangAni.setPosition(cc.p(node.width/2, node.height/2));
                node.addChild(guangAni, 999999);
            } 
        }
    }
}


//显示当前听得牌
COMMON_UI.showCurrentTingCards = function(cardNode)
{
    var cardui = cardNode;
    var pl = getUIPlayer(0);
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if(!pl.mjhand) return;
	
    if( MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_BAI_DA && pl.mjhand && MjClient.majiang.quantingpai(pl.mjhand,MjClient.data.sData.tData,cardui.tag))
    {
        //全听牌
        MjClient.playui.showQuanTingPai();
        return;
    }

    if (MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI) {
        var copyhand = pl.mjhand.slice();
        var index = copyhand.indexOf(cardui.tag);//排除当前选择的一张牌
        copyhand.splice(index,1);
        var tingCards = MjClient.majiang.calTingSet(copyhand, null, pl, tData);
        cc.log("tp == tingCards = " + JSON.stringify(tingCards));
        setCurrentTingNum(tingCards);
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN){
        if(MjClient.majiang.isEqualHunCard(cardui.tag) || pl.rate > 0){//选中金牌或者已经摔过金
            var tingCards = MjClient.majiang.getCheckTingHuCards(cardui.tag,pl.mjhand, true);
        }else{
            var tingCards = MjClient.majiang.getCheckTingHuCards(cardui.tag,pl.mjhand, false);
        }
        MjClient.playui.setCurrentTingNum(tingCards, MjClient.playui._tingCard_showAll, cardui.tag);
    }else if(MjClient.gameType == MjClient.GAME_TYPE.HZMJ ||
        MjClient.gameType == MjClient.GAME_TYPE.NTHZ ||
        MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.LEI_YANG_GMJ ||
        MjClient.gameType == MjClient.GAME_TYPE.XIN_NING_MA_JIANG ||
        (MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN && isYongZhouProject()))
    {
        var tingCards = MjClient.majiang.getCheckTingHuCards(cardui.tag,pl.mjhand);
        setCurrentTingNum(tingCards);
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN){

            var tingCards = MjClient.majiang.getCheckTingHuCards(cardui.tag,pl.mjhand, true);

        MjClient.playui.setCurrentTingNum(tingCards, MjClient.playui._tingCard_showAll, cardui.tag);
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_BAI_DA) {
        var tingCards = MjClient.majiang.getCheckTingHuCards(cardui.tag,pl.mjhand);
        setCurrentTingNum(tingCards);
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.FEN_XI_YING_KOU) {

        var tingCards = MjClient.majiang.getCheckTingHuCards(cardui.tag,pl.mjhand);
        setCurrentTingNum(tingCards);
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_KD ||
            MjClient.gameType == MjClient.GAME_TYPE.WU_TAI_KOU_DIAN ||
            MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI) {
        var copyhand = pl.mjhand.slice();
        var index = copyhand.indexOf(cardui.tag);//排除当前选择的一张牌
        copyhand.splice(index,1);
        var tingCards = calTingSet(copyhand, new Set([tData.hunCard, tData.hunCard2]));
        setCurrentTingNum(tingCards);
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_MA_JIANG ) {
        var copyhand = pl.mjhand.slice();
        var index = copyhand.indexOf(cardui.tag);//排除当前选择的一张牌
        copyhand.splice(index,1);
        //var t1 = +new Date;
        var tingCards = calTingSet(copyhand, new Set([tData.hunCard, tData.hunCard2]));
        //var t2 = +new Date;
        setCurrentTingNum(tingCards);
        //cc.log("耗时统计", +new Date - t2, t2 - t1)
        cc.log("=============tingCards  tuidao hu  = " + JSON.stringify(tingCards));
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.ZHUO_HAO_ZI){
        var tingCards = MjClient.majiang.getCheckTingHuCards(cardui.tag,pl.mjhand);
        setCurrentTingNum(tingCards);
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU ||
             MjClient.gameType == MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI) {
        var copyhand = pl.mjhand.slice();
        var index = copyhand.indexOf(cardui.tag);//排除当前选择的一张牌
        copyhand.splice(index,1);
        var tingCards = MjClient.majiang.calTingSet(copyhand);

        setCurrentTingNum(tingCards);
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.XIN_PU_HZ ||
             MjClient.gameType == MjClient.GAME_TYPE.NTHZ ||
             MjClient.gameType == MjClient.GAME_TYPE.FAN_SHI_XIA_YU ||
             MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG || 
             MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
             MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG ||
             MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG ||
             MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG)
    {
        var tingCards = MjClient.majiang.getCheckTingHuCards(cardui.tag,pl.mjhand);
        setCurrentTingNum(tingCards);
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.FEN_YANG_QUE_MEN) 
    {
        var tingCards = MjClient.majiang.getCheckTingHuCards(cardui.tag,pl.mjhand,pl);
        setCurrentTingNum(tingCards);
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.JING_LE_KOU_DIAN) 
    {
        var tingCards = MjClient.majiang.getCheckTingHuCards(cardui.tag,pl.mjhand,pl.fgang);
        setCurrentTingNum(tingCards);
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.LUAN_GUA_FENG) 
    {
        var tingCards = MjClient.majiang.getCheckTingHuCards(cardui.tag,pl.mjhand,tData);
        setCurrentTingNum(tingCards);
    }
    else if(MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU ||
            MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ || 
            MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.HE_JIN_KUN_JIN ||
            MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN ||
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ) 
    {
        if (pl.tingLists && pl.tingLists[cardui.tag]) 
        {
            var curtingset = pl.tingLists[cardui.tag];
            var tingCards_self = {};
            for (var i = 0; i < curtingset.length; i++) {
                tingCards_self[curtingset[i]] = 1;
            }
        }
        setCurrentTingNum(tingCards_self);    
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO) 
    {
        if (MjClient.clickTing) 
        {
            if (pl.jiangjianghuLists && pl.jiangjianghuLists[cardui.tag]) 
            {
                var curtingset = pl.jiangjianghuLists[cardui.tag];
                var tingCards_self = {};
                for (var i = 0; i < curtingset.length; i++) {
                    tingCards_self[curtingset[i]] = 1;
                }
            }
            setCurrentTingNum(tingCards_self);//将将胡听牌
        }
        else
        {
            if (pl.tingLists && pl.tingLists[cardui.tag]) 
            {
                var curtingset = pl.tingLists[cardui.tag];
                var tingCards_self = {};
                for (var i = 0; i < curtingset.length; i++) {
                    tingCards_self[curtingset[i]] = 1;
                }
            }
            setCurrentTingNum(tingCards_self);
        }
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
             MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU)
    {
        if (MjClient.data.sData.tData.areaSelectMode.isOpenTingTip) {
            var tingCards = getCheckTingHuCards(cardui.tag,pl.mjhand);
            setCurrentTingNum(tingCards);
			
			cc.log(" YI JIAO LAI  YOU == tingCards tingCards= " + JSON.stringify(tingCards));
        }
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ
        || MjClient.gameType == MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN
        || MjClient.gameType == MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING
        || MjClient.gameType == MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING
        || MjClient.gameType == MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG)
    {
        if (MjClient.data.sData.tData.areaSelectMode.isOpenTingTip) {
            var tingCards = getCheckTingHuCards(cardui.tag,pl.mjhand);
            setCurrentTingNum(tingCards);
        }
    }
    else if (MjClient.GAME_TYPE.XUE_ZHAN == MjClient.gameType ||
            MjClient.GAME_TYPE.XUE_LIU == MjClient.gameType) 
    {
        if (pl && Math.floor(cardui.tag / 10) != pl.que)
        {
            var tingCards = getCheckTingHuCards(cardui.tag, pl.mjhand);
            setCurrentTingNum(tingCards);
        }
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG ||
        MjClient.gameType === MjClient.GAME_TYPE.ML_HONGZHONG_ZERO ) {
        var tingCards = MjClient.allCanTingCards[cardui.tag];
        setCurrentTingNum(tingCards);
    }
    else if(MjClient.gameType === MjClient.GAME_TYPE.XU_PU_LAO_PAI){
        var tingCards = MjClient.majiang.getCheckTingHuCards(cardui.tag, pl.mjhand);
        setCurrentTingNum(tingCards);
    } else if (MjClient.gameType == MjClient.GAME_TYPE.GUAN_YUN ||
        MjClient.gameType == MjClient.GAME_TYPE.GUAN_NAN) {
        var tingCards = {};
        if (MjClient.clickTing) {
            tingCards = getCheckTingHuCards(cardui.tag, pl.mjhand);
        }else{
            tingCards = MjClient.majiang.getCheckTingHuCardsSplice(cardui.tag, pl.mjhand);
        }
        setCurrentTingNum(tingCards);
    } 
    else
    {
        cc.log("tp == tingCards pl= " + JSON.stringify(pl));
        var tingCards = getCheckTingHuCards(cardui.tag, pl.mjhand);
        cc.log("tp == tingCards = " + JSON.stringify(tingCards));
        setCurrentTingNum(tingCards);
    }
};

/**
 *  新版麻将玩法，后端计算听牌数据pl.tingLists   by Tom
 */
COMMON_UI.isNewGame = function(){
    if(MjClient.gameType === MjClient.GAME_TYPE.CHEN_ZHOU ||
       MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_MJ ||
       MjClient.gameType === MjClient.GAME_TYPE.YUAN_JIANG_MJ ||
       MjClient.gameType === MjClient.GAME_TYPE.NAN_XIAN_MJ ||
       MjClient.gameType === MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
       MjClient.gameType === MjClient.GAME_TYPE.CHAO_GU_MJ ||
       MjClient.gameType === MjClient.GAME_TYPE.HE_JIN_KUN_JIN ||
       MjClient.gameType === MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN ||
       MjClient.gameType === MjClient.GAME_TYPE.XIANG_SHUI_MJ
       )
    {
        return true;
    }
};


/**
 *  需要显示起手听牌    by Tom
 */
COMMON_UI.needShowStartTing = function(){
    if (MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_MJ ||
        MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG ){
        return false;
    }else if(GameClass[MjClient.gameType] === MjClient.GAME_CLASS.MA_JIANG) {
        return true;
    }
};


/**
 *  显示起手听牌    by Tom
 */
COMMON_UI.showStartHandTingCards = function() {
    if(!COMMON_UI.needShowStartTing()) return;

    var downNode = getNode(0);
    UIEventBind(null, downNode, "mjhand", function () {
        showTingCardsForMjHand();
    });
    UIEventBind(null, downNode, "initSceneData", function () {
        showTingCards();
    });
    UIEventBind(null, downNode, "MJPut", function () {
        showTingCards();
    });
    UIEventBind(null, downNode, "newCard", function () {
        clearTingCards();
    });
    UIEventBind(null, downNode, "roundEnd", function () {
        clearTingCards();
    });
    UIEventBind(null, downNode, "endRoom", function () {
        clearTingCards();
    });
    UIEventBind(null, downNode, "LeaveGame", function () {
        clearTingCards();
    });


    /* 有筛子动画时，延迟显示起手听牌*/
    function showTingCardsForMjHand() {
        if(MjClient.playui.hasShaziAni) {
            downNode.runAction(cc.sequence(cc.delayTime(2.8), cc.callFunc(function () {
                showTingCards();
            })));
        }else {
            showTingCards();
        }
    }

    function showTingCards() {
        var tData = MjClient.data.sData.tData;
        var pl = getUIPlayer(0);
        var factor0 = IsTurnToMe();
        var factor1 = !pl || !pl.mjhand ||(pl.mjhand && pl.mjhand.length === 0) || pl.mjput.length > 0;
        var factor2 = pl.mjpeng.length > 0 || pl.mjchi.length > 0;
        var factor3 = pl.mjgang0.length > 0 || pl.mjgang1.length > 0;
        var factor4 = pl.mjState === TableState.waitEat;
        var factor5 = tData.tState === TableState.roundFinish;
        if  (factor0 || factor1 || factor2 || factor3 || factor4 || factor5) return;
        var tingCardSet = COMMON_UI.getTingSet();
        setCurrentTingNum(tingCardSet);
    }

    function clearTingCards(){
        var tingCardNumNode = MjClient.playui._tingCardNumNode;
        if(tingCardNumNode || tingCardNumNode.visible) tingCardNumNode.visible = false;
    }
};

/**
 *  获取听牌数据     by Tom
 */
COMMON_UI.getTingSet = function()
{
    var sData = MjClient.data.sData;
    var hunCard = sData.hunCard;
    if (!hunCard) 
    {
        hunCard = sData.tData.hunCard;
    }
    var pl = getUIPlayer(0);
    var tingSet = {};
    if (COMMON_UI.isNewGame()) {
        if (pl.tingListAfterPut) {
            var tingList = pl.tingListAfterPut.slice();
            for (var value of tingList) {
                tingSet[value] = 1;
            }
        }
    }
    else{
        if(MjClient.majiang.calTingSet) {
            tingSet = MjClient.majiang.calTingSet(pl.mjhand, hunCard);
        }else{
            tingSet = calTingSet(pl.mjhand, hunCard);
        }
    }


    return tingSet;
};


/*
    创建一个帧动画，并反回 帧动画 by sking
    @resPath    资源路径，eg: path = "hall/homeEffect/headfly";
    @frameName  资源的图片名称，eg : "HDH000"
    @frameCount 帧数
 */
COMMON_UI.creatFrameAni = function(resPath,frameName,frameCount,dt,dealyTime)
{
    dt = dt || 1;
    dealyTime = dealyTime || 0;
    cc.spriteFrameCache.addSpriteFrames(resPath + ".plist",resPath + ".png");
    var frames = [];
    var prefix = frameName; //"HDH000";
    var fc = cc.spriteFrameCache;
    var count = 0;
    for (var i = dt; count <  frameCount; i++) {
        var k = i%frameCount + 1;
        var name = prefix + k + ".png";
        var f = fc.getSpriteFrame(name);
        if(f)
        {
            frames.push(f);
        }
        count++;
    }
    var firstFrame = new cc.Sprite("#" + frameName + "1.png");
    var ani = cc.animate(new cc.Animation(frames, 0.06, 1));
    var animate = cc.sequence(ani,cc.delayTime(dealyTime));
    firstFrame.runAction(animate.repeatForever());
    return firstFrame;
}


COMMON_UI.creatFrameAniEx = function(params)
{   
    var resPath = params.resPath; // 路径
    var frameName = params.frameName; // 名称前缀
    var startFrame = params.startFrame || 1; // 起始帧
    var endFrame = params.endFrame || 100; // 结束帧
    var delayTime = params.delayTime || 0; // 循环间隔
    var callback = params.callback || function() {};    // 每次循环结束的回调
    var playTime = params.playTime || 1;     // 一次循环需要的时间
    var playNum = params.playNum || 1; // 是否循环播放

    cc.spriteFrameCache.addSpriteFrames(resPath + ".plist", resPath + ".png");
    var frames = [];
    var frameNum = endFrame - startFrame + 1;
    for (var i = startFrame; i <= endFrame; i++) {
        var name = frameName + i + ".png";
        var f = cc.spriteFrameCache.getSpriteFrame(name);
        if(!f) break;
        frames.push(f);
    }

    var firstFrame = new cc.Sprite("#" + frameName + startFrame + ".png");
    var ani = cc.animate(new cc.Animation(frames, playTime / frameNum, 1));
    var aniCallBack = cc.callFunc(callback);
    var animate = cc.sequence(ani, aniCallBack, cc.delayTime(delayTime));

    if(playNum > 0) {
        firstFrame.runAction(animate);
    } else {
        firstFrame.runAction(animate.repeatForever());
    }
    return firstFrame;
}


/*
    岳阳app，弹窗穗子摆动的动画 by sking
    @angle 摆动的幅度，0 ~ 360
    @node 穗子节点
*/
COMMON_UI.suiziAni = function(node,angle)
{
    if(!angle) angle = 4;

    var closeBtn = node.getParent().getChildByName("close") || node.getParent().getChildByName("goHome") ||  node.getParent().getChildByName("yes");
    if(closeBtn)
    {
        closeBtn.ignoreContentAdaptWithSize(true);
        closeBtn.setContentSize(155.00,145.00);

        var path = "hall/homeEffect/tanchaunghudie";
        var skyfly = COMMON_UI.creatFrameAni(path,"honghudie_",9);
        skyfly.setPosition(closeBtn.getContentSize().width*0.3,closeBtn.getContentSize().height*0.7);
        closeBtn.addChild(skyfly);

        var starParticle1 =  new cc.ParticleSystem("Particle/close.plist");
        starParticle1.setPosition(closeBtn.getContentSize().width/2,closeBtn.getContentSize().height/2);
        //starParticle1.setScale(2);
        closeBtn.addChild(starParticle1,0);
 
        var _back = node.getParent();
        var _currentScale = _back.getScale();
        _back.setScale(0);
        _back.runAction(cc.scaleTo(0.2,_currentScale).easing(cc.easeBackOut()));

    }


    //动画
    node.setRotation(-angle/2);
    node.runAction(cc.sequence(cc.rotateBy(2,angle).easing(cc.easeQuadraticActionInOut()), cc.rotateBy(2,-angle).easing(cc.easeQuadraticActionInOut())).repeatForever());
}

// 弹窗动画
COMMON_UI.popDialogAni = function(back) {
    if (!back)
        return;

    var currentScale = back.getScale();
    back.setScale(0);
    back.runAction(cc.scaleTo(0.2, currentScale).easing(cc.easeBackOut()));
}

/*
 *抓一只鸟效果,停留0.5秒
 */
COMMON_UI.showZhuaOneNiao = function(card,callback,delayTime)
{
    cc.log("showZhuaOneNiao");
    var timeStay = 0.5;
    if(delayTime){
        timeStay = delayTime;
    }
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var eatNode = MjClient.playui.jsBind.eat._node;
    var niaopai = eatNode.getChildByName("oneniaoNode");
    if (niaopai ==  null){
        niaopai = MjClient.playui._downNode.getChildByName("stand").clone();
        setCardSprite(niaopai,card,0);
        eatNode.addChild(niaopai);
        UIEventBind(null, niaopai, "LeaveGame", function (eD) {
            niaopai.visible = false;
            setWgtLayout(niaopai,[0.13, 0.13], [0.5, 0.5], [0, 0.4]);
        });
        UIEventBind(null, niaopai, "initSceneData", function (eD) {
            niaopai.visible = false;
            setWgtLayout(niaopai,[0.13, 0.13], [0.5, 0.5], [0, 0.4]);
        });
        UIEventBind(null, niaopai, "clearCardUI", function (eD) {
            niaopai.visible = false;
            setWgtLayout(niaopai,[0.13, 0.13], [0.5, 0.5], [0, 0.4]);
        });
    }
    setWgtLayout(niaopai,[0.13, 0.13], [0.5, 0.5], [0, 0.4]);
    niaopai.setVisible(true);
    //判断哪个玩家中鸟
    var indexoff = 0;
    for (var i = 0; i < 4; i++) {
        var pl = getUIPlayer(i);
        if (pl && pl.niaoNum > 0)
        {
            indexoff = i;
            break;
        }
    }
    cc.log("showZhuaOneNiao indexoff = "+i);

    var head_node = null;
    var moveAction = null;
    if (indexoff == 0)
    {
        head_node = MjClient.playui._downNode.getChildByName("head");
        moveAction = cc.moveTo(0.5,cc.p(head_node.x + niaopai.getContentSize().width/2,head_node.y));
    }
    else if(indexoff == 1)
    {
        head_node = MjClient.playui._rightNode.getChildByName("head");
        moveAction = cc.moveTo(0.5,cc.p(head_node.x - niaopai.getContentSize().width/2,head_node.y));
    }
    else if(indexoff == 2)
    {
        head_node = MjClient.playui._topNode.getChildByName("head");
        moveAction = cc.moveTo(0.5,cc.p(head_node.x + niaopai.getContentSize().width/2,head_node.y));
    }
    else if(indexoff == 3)
    {
        head_node = MjClient.playui._leftNode.getChildByName("head");
        moveAction = cc.moveTo(0.5,cc.p(head_node.x + niaopai.getContentSize().width/2,head_node.y));
    }
    if (moveAction){
        niaopai.runAction(cc.sequence(cc.DelayTime(0.2),moveAction));
    }
    if (callback){
        MjClient.playui.runAction(cc.sequence(cc.DelayTime(0.7+ timeStay),cc.callFunc(callback)));
    }
}


/*加载头像(废弃)
使用COMMON_UI.loadHeadImg
*/
COMMON_UI.refreshHead = function(that, url, head) {
    COMMON_UI.loadHeadImg(that,url, head);
}

/*
加载头像，that最多加载30个，不重复加载
*/
COMMON_UI.loadHeadImg = function(that,url, head) {
    if(!cc.sys.isObjectValid(head)){
        return;
    }
    //！！！注意url可能为空
    //下载头像
    function downloadImg(url, head) {
        //cc.log("图片开始下载url",url);
        that._loadingImgList.push({url:url})
        cc.loader.loadImg(url ? url : "png/default_headpic.png", {isCrossOrigin: true},
            function(err, texture) {
            removeLoadingImgUrl(url);
            //cc.log("图片下载回调",(err?("失败"+err):"成功"),"url",url);
            if (!sys.isObjectValid(head)){
                downloadNextImg();
                return;
            }
            if (err || !texture) {
                if (!head.errNum){
                    head.errNum = 0;
                }else if (head.errNum >= 3){
                    downloadNextImg();
                    return;
                }
                head.errNum++;
                downloadImg(url,head);
                return;
            }
            setHeadImg(head,texture,url);
            deleteDirtyData();
            for(var i = that._needLoadImgList.length - 1; i >= 0; i--){
                var itemData = that._needLoadImgList[i];
                if(itemData.head._bindurl == url && itemData.url == url){
                    //cc.log("图片存在队列中，直接成功设置");
                    that._needLoadImgList.splice(i,1);
                    setHeadImg(itemData.head,texture,itemData.url);
                }
            }
            downloadNextImg();
        });
    }

    //设置头像
    function setHeadImg(head,texture,url){
        if(head._bindurl != url){
            return;
        }
        if (!head.needScale){
            head.needScale = 8;
        }
        if(FriendCard_Common.getSkinType() == 1 && head.isMask){
            var clippingNode = head.getChildByName("headClippingNode");
            if(!clippingNode){
                var sp = new cc.Sprite(texture);
                if (!sp){
                    return;
                }
                clippingNode = new cc.ClippingNode();
                var headMask = head.headMask ? head.headMask :  "friendCards/head/img_head.png";
                var mask = new cc.Sprite(headMask);

                mask.width = head.width
                mask.height = head.height;
                clippingNode.setAlphaThreshold(0);
                clippingNode.setStencil(mask);

                sp.setScale(mask.getContentSize().width/sp.getContentSize().width);
                sp.setName("headTexture");
                clippingNode.addChild(sp);
                clippingNode.setScale(0.99);

                clippingNode.setName("headClippingNode");
                clippingNode.setPosition(head.getContentSize().width/2,head.getContentSize().height/2);
                head.addChild(clippingNode);
            }else{
                clippingNode.setVisible(true);
                var sp = clippingNode.getChildByName("headTexture");
                sp.setTexture(texture);
            }
            
            var hideblock = head.getChildByName("headHideblock");
            if(!hideblock)
            {
                var hideblock = new cc.Sprite("friendCards/head/head_kuang.png");
                hideblock.width = head.width + 2.5;
                hideblock.height = head.height + 2.5;
                hideblock.setName("headHideblock");
                hideblock.setPosition(head.getContentSize().width / 2, head.getContentSize().height / 2);  
                head.addChild(hideblock);
            }else{
                hideblock.setVisible(true);
            }
        }
        else if(FriendCard_Common.getSkinType() == 2 && head.isMask){
            var clippingNode = head.getChildByName("headClippingNode");
            if(!clippingNode){
                var sp = new cc.Sprite(texture);
                if (!sp){
                    return;
                }
                clippingNode = new cc.ClippingNode();
                var headMask = head.headMask ? head.headMask : "friendCards/common/headMask.png";
                var mask = new cc.Sprite(headMask);
                clippingNode.setAlphaThreshold(0);
                clippingNode.setStencil(mask);
                sp.setScale(mask.getContentSize().width/sp.getContentSize().width);
                sp.setName("headTexture");
                clippingNode.addChild(sp);
                clippingNode.setScale(0.999);
                clippingNode.setName("headClippingNode");
                clippingNode.setPosition(head.getContentSize().width/2,head.getContentSize().height/2);
                head.addChild(clippingNode);
            }else{
                clippingNode.setVisible(true);
                var sp = clippingNode.getChildByName("headTexture");
                sp.setTexture(texture);
            }

            var hideblock = head.getChildByName("headHideblock");
            if(!hideblock){
                hideblock = new cc.Sprite("friendCards/common/head_kuang.png");
                hideblock.setName("headHideblock");
                hideblock.setPosition(head.getContentSize().width / 2, head.getContentSize().height / 2);  
                head.addChild(hideblock);
            }else{
                hideblock.setVisible(true);
            }
        }
        else if(FriendCard_Common.getSkinType() == 3 && head.isMask){
            
            var headMask = head.headMask ? head.headMask : "friendCards/common/headMask.png";
            var headkuang = head.headkuang ?　head.headkuang　: "friendCards/common/head_kuang.png";

            if(head._type){
                headMask = "friendCards/common/head/headMask_" + head._type + ".png";
                headkuang = "friendCards/common/head/headKuang_" + head._type + ".png";
            }
            var clippingNode = head.getChildByName("headClippingNode");
            if(!clippingNode){
                var sp = new cc.Sprite(texture);
                if (!sp){
                    return;
                }
                clippingNode = new cc.ClippingNode();
                var mask = new cc.Sprite(headMask);
                clippingNode.setAlphaThreshold(0);
                clippingNode.setStencil(mask);
                sp.setScale(mask.getContentSize().width/sp.getContentSize().width);
                sp.setName("headTexture");
                clippingNode.addChild(sp);
                clippingNode.setScale(0.999);
                clippingNode.setName("headClippingNode");
                clippingNode.setPosition(head.getContentSize().width/2,head.getContentSize().height/2);
                head.addChild(clippingNode);
            }else{
                clippingNode.setVisible(true);
                var sp = clippingNode.getChildByName("headTexture");
                sp.setTexture(texture);
            }
            
            var hideblock = head.getChildByName("headHideblock");
            if(!hideblock){
                hideblock = new cc.Sprite(headkuang);
                hideblock.setName("headHideblock");
                hideblock.setPosition(head.getContentSize().width / 2, head.getContentSize().height / 2);  
                head.addChild(hideblock);
            }else{
                hideblock.setVisible(true);
            }
        }else if(FriendCard_Common.getSkinType() == 4 && head.isMask){
            
            var headMask = head.headMask ? head.headMask : "friendCards/common/headMask1.png";
            var headkuang = head.headkuang ?　head.headkuang　: "friendCards/common/head_kuang1.png";

            var clippingNode = head.getChildByName("headClippingNode");
            if(!clippingNode){
                var sp = new cc.Sprite(texture);
                if (!sp){
                    return;
                }
                clippingNode = new cc.ClippingNode();
                var mask = new cc.Sprite(headMask);
                clippingNode.setAlphaThreshold(0);
                clippingNode.setStencil(mask);
                sp.setScale(mask.getContentSize().width/sp.getContentSize().width);
                sp.setName("headTexture");
                clippingNode.addChild(sp);
                clippingNode.setName("headClippingNode");
                clippingNode.setPosition(head.getContentSize().width/2,head.getContentSize().height/2);
                head.addChild(clippingNode);
            }else{
                clippingNode.setVisible(true);
                var sp = clippingNode.getChildByName("headTexture");
                sp.setTexture(texture);
            }
            
            var hideblock = head.getChildByName("headHideblock");
            if(!hideblock){
                hideblock = new cc.Sprite(headkuang);
                hideblock.setName("headHideblock");
                hideblock.setPosition(head.getContentSize().width / 2, head.getContentSize().height / 2);  
                head.addChild(hideblock);
            }else{
                hideblock.setVisible(true);
            }
        }
        else{
            var sp = head.getChildByName("headTexture");
            if(!sp){
                sp = new cc.Sprite(texture);
                if (!sp){
                    return;
                }
                sp.setScale((head.width - head.needScale) / sp.width);
                sp.setPosition(cc.p(head.width / 2, head.height / 2));
                sp.zIndex = 2;
                sp.setName("headTexture");
                head.addChild(sp);
            }else{
                sp.setVisible(true);
                sp.setTexture(texture);
            }
            
            
        }
        
        if (head.callFunc){
            head.callFunc()
        }
    }
    //下载下一张图片
    function downloadNextImg(){
        var maxLoadNum = 15;
        if (that._loadingImgList.length <= maxLoadNum){
            deleteDirtyData();
            for(var i = 0; i < that._needLoadImgList.length; i++){
                var itemData = that._needLoadImgList[i];
                var hasLoading = false;
                for(var j = 0; j < that._loadingImgList.length; j++){
                    if(that._loadingImgList[j].url == itemData.url){
                        hasLoading = true;
                    }
                }
                if(!hasLoading){
                    that._needLoadImgList.splice(i,1);
                    downloadImg(itemData.url, itemData.head);
                    return;
                }else{
                    //已经在加载中
                    //cc.log("图片已经在加载中了,不用再次加载")
                }
            }
        }else{
            //cc.log("图片加载数量>",maxLoadNum)
        }
    }
    //移除的loadingurl
    function removeLoadingImgUrl(url){
        for(var i = that._loadingImgList.length -1; i >= 0; i--){
            if(that._loadingImgList[i].url == url){
                that._loadingImgList.splice(i,1);
            }
        }
    }
    //移除脏数据
    function deleteDirtyData(){
        for(var i = that._needLoadImgList.length - 1; i >= 0; i--){
            var itemData = that._needLoadImgList[i];
            //移除ui已经不存在的
            if(!cc.sys.isObjectValid(itemData.head)){
                that._needLoadImgList.splice(i,1);
            }
        }
    }

    if (!that._loadingImgList){
        that._loadingImgList = [];
    }
    if (!that._needLoadImgList){
        that._needLoadImgList = [];
    }

    for(var i = that._needLoadImgList.length - 1; i >= 0; i--){
        var itemData = that._needLoadImgList[i];
        //移除相同的
        if(head == itemData.head){
            that._needLoadImgList.splice(i,1);
        }
    }
    head._bindurl = url;
    var cachedTex = url ? cc.textureCache.getTextureForKey(url) : null;
    if(cachedTex){
        //已经存在直接设置
        setHeadImg(head,cachedTex,url);
    }else{
        if(FriendCard_Common.getSkinType() == 1 && head.isMask){
            var clippingNode = head.getChildByName("headClippingNode");
            if(clippingNode){
                clippingNode.setVisible(false);
            }
            var hideblock = head.getChildByName("headHideblock");
            if(hideblock){
                hideblock.setVisible(false);
            }
        }
        else if(FriendCard_Common.getSkinType() == 2 && head.isMask){
            var clippingNode = head.getChildByName("headClippingNode");
            if(clippingNode){
                clippingNode.setVisible(false);
            }

            var hideblock = head.getChildByName("headHideblock");
            if(hideblock){
                hideblock.setVisible(false);
            }
        }
        else if(FriendCard_Common.getSkinType() == 3 && head.isMask){
            var clippingNode = head.getChildByName("headClippingNode");
            if(clippingNode){
                clippingNode.setVisible(false);
            }
            var hideblock = head.getChildByName("headHideblock");
            if(hideblock){
                hideblock.setVisible(false);
            }
        }else if(FriendCard_Common.getSkinType() == 4 && head.isMask){
            var clippingNode = head.getChildByName("headClippingNode");
            if(clippingNode){
                clippingNode.setVisible(false);
            }
            var hideblock = head.getChildByName("headHideblock");
            if(hideblock){
                hideblock.setVisible(false);
            }
        }else{
            var sp = head.getChildByName("headTexture");
            if(sp){
                sp.setVisible(false);
            }
        }
        if(url){
            //插入队列
            that._needLoadImgList.push({
                url: url,
                head: head
            });
            downloadNextImg();
        }
        
    }
    
    
}
/**create by Lms
 * @DateTime:     2018-08-11
 * @Description: COMMON_UI.listEncapsulatio
 * 这个函数可以直接用 直接传参数 什么都不用做了
 * listview 列表 showNum 每页显示多少条数据   dataList 数据列表
 * createItemFunc 生成列表项函数 （一定要绑定this 函数可以在传进来的时候绑定，也可以在申明是绑定 ）
 */

COMMON_UI.listEncapsulation = function(listView, dataList, showNum, createItemFunc) {

    var upOffset = function(listView, dataList) {
        if (listView.getItems().length <= 0 || listView.getItem(0).dataIndex == 0)
            return;

        var srcItemNum = listView.getItems().length;
        var srcStartIndex = listView.getItem(0).dataIndex;
        var i = 0;
        for (i = 0; i < srcItemNum - showNum; i++) {
            listView.removeLastItem();
        }

        var rankList = dataList;
        srcItemNum = listView.getItems().length;
        for (i = srcStartIndex - 1; i >= 0 && srcStartIndex + srcItemNum - i <= showNum * 2; i--) {
            var item = createItemFunc(rankList[i], i);
            listView.insertCustomItem(item, 0);
            item.dataIndex = i;
        }

        refreshMoreTip(listView, rankList);
        listView.forceDoLayout();
        listView.jumpToItem(listView.getItems().length - srcItemNum, cc.p(0.5, 1.0), cc.p(0.5, 1.0));
        listView.scrollToItem(listView.getItems().length - srcItemNum - 1, cc.p(0.5, 1.0), cc.p(0.5, 1.0));
    };
    var bottomOffset = function(listView, dataList) {
        var srcItemNum = listView.getItems().length;

        var i = 0;
        for (i = 0; i < srcItemNum - showNum; i++) {
            listView.removeItem(0);
        }

        var rankList = dataList; //this._data.list;
        srcItemNum = listView.getItems().length;
        var startIndex = srcItemNum > 0 ? listView.getItem(0).dataIndex : 0;
        for (i = startIndex + srcItemNum; i < rankList.length && i - startIndex < showNum * 2; i++) {
            var item = createItemFunc(rankList[i], i);
            listView.pushBackCustomItem(item);
            item.dataIndex = i;
        }

        refreshMoreTip(listView, rankList);
        listView.forceDoLayout();
        listView.jumpToItem(srcItemNum - 1, cc.p(0.5, 0.0), cc.p(0.5, 0.0));
        listView.scrollToItem(srcItemNum, cc.p(0.5, 0.0), cc.p(0.5, 0.0));
    };
    var refreshMoreTip = function(listView, dataList) {
        var items = listView.getItems();
        for (var i = 0; i < items.length; i++) {
            if (items[i].getChildByName("moreTextTip"))
                items[i].removeChildByName("moreTextTip");
        }

        if (items.length > 0 && items[items.length - 1].dataIndex < dataList.length - 1) {
            var item = items[items.length - 1];
            var moreTextTip = new cc.LabelTTF("上拉显示更多", MjClient.fzcyfont, 26);
            moreTextTip.setColor(cc.color(0x79, 0x34, 0x12));
            moreTextTip.setName("moreTextTip");
            moreTextTip.setPosition(item.width / 2, -30);
            item.addChild(moreTextTip);
        }
    };
    listView.removeAllItems();
    for (var i = 0; i < dataList.length && i < showNum * 2; i++) {
        var item = createItemFunc(dataList[i], i);
        listView.pushBackCustomItem(item);
        item.dataIndex = i;
    }
    refreshMoreTip(listView, dataList);
    listView.forceDoLayout();

    var listViewState = 0;
    var listViewState_2 = 0;
    listView.addCCSEventListener(function(sender, type) {
        // **新老引擎bug**
        var EVENT_AUTOSCROLL_ENDED = ccui.ScrollView.EVENT_AUTOSCROLL_ENDED;
        if (cc.sys.OS_WINDOWS == cc.sys.os || cc.ENGINE_VERSION.indexOf("3.16") >= 0)
            EVENT_AUTOSCROLL_ENDED = 12;

        switch (type) {
            case ccui.ScrollView.EVENT_SCROLL_TO_TOP:
                if (listViewState_2 == 0)
                    listViewState = -1;
                else
                    listViewState_2 = 0;
                break;
            case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                listViewState = 1;
                break;
            case EVENT_AUTOSCROLL_ENDED:
                if (listViewState == -1 && listView.getCurSelectedIndex() < 6) {
                    //MjClient.showToast("to top!!");
                    upOffset(listView, dataList);
                } else if (listViewState == 1) {
                    //MjClient.showToast("to bottom!!");
                    var items = listView.getItems();
                    if (items.length != 0 && items[items.length - 1].dataIndex < dataList.length - 1) {
                        bottomOffset(listView, dataList);
                    }
                } else {
                    //MjClient.showToast("to null!!");
                }
                listViewState = 0;
        }
    });
};

// 显示麻将小结算底牌
COMMON_UI.showMjWinGamePanelDiPai = function (_back) {
    var dipaiListView = _back.getChildByName("dipaiListView");
    var dipaiItem = _back.getChildByName("dipaiItem");
    var dipai = MjClient.data.sData.cards;
    if (!dipaiListView || !dipaiItem || !dipaiItem.getChildByName("dipaiImg"))
        return;

    cc.log("dipai:", dipai);
    if (dipai) {
        for (var i = 0; i < dipai.length; i ++) {
            var item = dipaiItem.clone();
            dipaiListView.pushBackCustomItem(item);
            setCardSprite(item.getChildByName("dipaiImg"), dipai[i], 0);
        }
        dipaiListView.forceDoLayout();
    }
    dipaiItem.setVisible(false);
};


//遍历次节点下所有的lable节点,设置为自适应大小
COMMON_UI.setNodeTextAdapterSize = function (node) {
    //获得rootnode根下的节点
    var childrens = node.getChildren();
    if (childrens){
        for(var i in childrens){
            if (childrens[i].getChildren()){
                COMMON_UI.setNodeTextAdapterSize(childrens[i]);
            }
            var type_name = childrens[i].getDescription();
            if (type_name == "Label" || type_name == "TextAtlas"){
                childrens[i].ignoreContentAdaptWithSize(true);
            }
        }
    }
    var type_name = node.getDescription();
    if (type_name == "Label"|| type_name == "TextAtlas"){
        node.ignoreContentAdaptWithSize(true);
    }
};


//自己出牌时前端先行的操作
COMMON_UI.BeforehandSelfPutOutCard = function(cd)
{
    //自己打出的牌立即播放声音
    if(MjClient.majiang.isCardFlower && !MjClient.majiang.isCardFlower(cd))//补花在MJFlower播放
    {

        var pl = getUIPlayer(0);
        playEffect("give");
        if(MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN ||
            MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_LI_SI ||
            MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU ||
            MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_KD ||
            MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN ||
            MjClient.gameType == MjClient.GAME_TYPE.HE_JIN_KUN_JIN ||
            MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_MA_JIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.ZHUO_HAO_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.LING_SHI_BIAN_LONG ||
            MjClient.gameType == MjClient.GAME_TYPE.LING_SHI_BAN_MO ||
            MjClient.gameType == MjClient.GAME_TYPE.PING_YAO_KOU_DIAN ||
            MjClient.gameType == MjClient.GAME_TYPE.PING_YAO_MA_JIANG||
            MjClient.gameType == MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3||
            MjClient.gameType == MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN ||
            MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO||
            MjClient.gameType == MjClient.GAME_TYPE.SHOU_YANG_QUE_KA ||
            MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI ||
            MjClient.gameType == MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.FEN_XI_YING_KOU ||
            MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI||
            MjClient.gameType == MjClient.GAME_TYPE.WU_TAI_KOU_DIAN ||
            MjClient.gameType == MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG||
            MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN ||
            MjClient.gameType == MjClient.GAME_TYPE.FEN_YANG_QUE_MEN  ||
            MjClient.gameType == MjClient.GAME_TYPE.JING_LE_KOU_DIAN  )
        {
            var putnum = pl.mjput.length;
            if(MjClient.clickTing)
            {
                cc.log("----------盖住的牌不播声音------晋中麻将----");
            }
            else
            {
                playEffectInPlay(cd);
            }
        }
        else {
            var putnum = pl.mjput.length;
            var tData = MjClient.data.sData.tData;
            cc.log("----------盖住的牌不播声音------1111提前出牌----" + putnum);
            if(MjClient.gameType === MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN && MjClient.clickTing && tData.areaSelectMode["anting"]){

            }else if(MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG && pl.fengDong){

            }else if(MjClient.gameType === MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI && MjClient.clickTing && !tData.areaSelectMode['tingPaiBuKou']){

            }else{
                playEffectInPlay(cd);
            }
        }
    }

    //方位指向下家,倒计时计时
    var _arrowbkNode = MjClient.arrowbkNode;
    if (COMMON_UI3D.is3DUI())
    {
        _arrowbkNode = MjClient.arrowbk3DNode;
    }
    if (cc.sys.isObjectValid(_arrowbkNode))
    {
        var tData = MjClient.data.sData.tData;
        var nextPlayer = (tData.uids.indexOf(SelfUid())+1 + tData.uids.length) % tData.uids.length;
        SetArrowRotation(_arrowbkNode, nextPlayer);

        var number_node = _arrowbkNode.getChildByName("number");
        if (number_node)
        {
            number_node.stopAllActions();
            stopEffect(playTimeUpEff);
            playTimeUpEff = null;
            //arrowbkNumberUpdate(number_node);
        }
    }

};


COMMON_UI.CopyProperties = function (clonedNode, widget) {

    for (var clonedNodeKey in clonedNode)
    {
        var exist = false;
        for (var widgetKey in widget)
        {
            if (clonedNodeKey == widgetKey)
                exist = true;
        }
        if (!exist)
            delete clonedNode[clonedNodeKey];
    }

    clonedNode.setEnabled(widget.isEnabled());
    clonedNode.setVisible(widget.isVisible());
    clonedNode.setBright(widget.isBright());
    clonedNode.setTouchEnabled(widget.isTouchEnabled());
    clonedNode.setLocalZOrder(widget.getLocalZOrder());
    clonedNode.setTag(widget.getTag());
    clonedNode.setName(widget.getName());
    clonedNode.setActionTag(widget.getActionTag());

    clonedNode.ignoreContentAdaptWithSize(widget.isIgnoreContentAdaptWithSize());


    //clonedNode._customSize.width = widget._customSize.width;
    // clonedNode._customSize.height = widget._customSize.height;

    clonedNode.setSizeType(widget.getSizeType());
    clonedNode.setSizePercent(widget.getSizePercent());
    clonedNode.setPositionType(widget.getPositionType());


    // clonedNode._positionPercent.x = widget._positionPercent.x;
    // clonedNode._positionPercent.y = widget._positionPercent.y;

    clonedNode.setPosition(widget.getPosition());
    clonedNode.setAnchorPoint(widget.getAnchorPoint());
    clonedNode.setScaleX(widget.getScaleX());
    clonedNode.setScaleY(widget.getScaleY());
    clonedNode.setRotation(widget.getRotation());
    clonedNode.setRotationX(widget.getRotationX());
    clonedNode.setRotationY(widget.getRotationY());
    clonedNode.setFlippedX(widget.isFlippedX());
    clonedNode.setFlippedY(widget.isFlippedY());
    clonedNode.setColor(widget.getColor());
    clonedNode.setOpacity(widget.getOpacity());

    clonedNode.setFocused(widget.isFocused());
    clonedNode.setFocusEnabled(widget.isFocusEnabled());

    var lp = widget.getLayoutParameter();
    if (lp)
    {
        clonedNode.setLayoutParameter(lp.clone());
    }
    clonedNode.setContentSize(widget.getContentSize());

    var sourceNodeChildren = widget.getChildren();
    var clonedNodeChildren = clonedNode.getChildren();
    for (var i=0; i<sourceNodeChildren.length; i++)
    {
        for (var j=0; j<clonedNodeChildren.length; j++)
        {
            if (sourceNodeChildren[i].getName() == clonedNodeChildren[j].getName())
            {
                COMMON_UI.CopyProperties(clonedNodeChildren[j], sourceNodeChildren[i]);
            }
        }
    }
};

/**create by Lms 创建富文本
 * @DateTime:     2018-11-29 
 * @Description: data =[["仅需是UI哦牛噢耶"  , "fonts/lanting.TTF", 25, "#ff0000"],["股份的施工法大使馆", "fonts/lanting.TTF", 25, "ff00ff"]]
 *                  字符串                  字体            字号     颜色 （可带# 可不带 做了兼容）
 * node 是承载的有长度的容器，根据这个容器，做长度换行， 如果是没有长度的节点， 就不要传了~~
 *  上面所有的参数都可传可不传 例如  data =[["仅需是UI哦牛噢耶"],["范德萨范德萨"]];
 *   默认 系统字体  字号18 白色
 */

COMMON_UI.RichText = function(data, node) {
    // node 可以不传 尽量不要传 node
    var str = "";
    for (let index = 0; index < data.length; index++) {
        var element = data[index];
        str += "<font ";
        if(!element && !element[0])
            continue;
        //字体默认 兰亭
        if (element[1])
            str += "face='" + element[1] + "'";

        // 字号 默认18
        if (element[2])
            str += "size='" + element[2] + "'";
        else
            str += "size='" + 18 + "'";
        //  颜色 默认  自带 白色
        if (element[3]){
            if(element[3].length == 6){
                str += "color='#" + element[3] + "'";
            } else{
                str += "color='" + element[3] + "'";
            }  
        }
            
        str += ">" + element[0] + "</font>";
    }
    // 上面 str 将字符串转化为xml格式~~~
    var _richText = ccui.RichText.createWithXML(str, null);
    _richText.ignoreContentAdaptWithSize(false);
    _richText.setAnchorPoint(cc.p(0, 0));
    _richText.width = 1280; // 我们屏幕的宽度是1280为模板 默认这样
    if(node && node.width)
        _richText.width = node.width;

    return _richText;

};


/**
 * 在这些情况下不能出牌，简化addTouchEventListener里面的判断，增强代码可读性 by sking 2018.12.6
 * @param cardui
 * @param btn
 * @returns {boolean} 返回false 表示不能出牌
 */
COMMON_UI.isCanTouch = function(cardui,btn,touchType)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pl = getUIPlayer(0);
    if(MjClient.gameType == MjClient.GAME_TYPE.LIAN_SHUI)
    {
        if (tData)
        {
            var _num = MjClient.majiang.getAllCardsTotal() - tData.cardNext;
            if(_num <= 7)
            {
                MjClient.showToast("最后一张牌不能打");
                return false;
            }
        }
    }

    if(MjClient.gameType == MjClient.GAME_TYPE.ZHUO_HAO_ZI){
        if ( (cardui.tag == tData.hunCard || cardui.tag == tData.hunCard2 ) &&
            !MjClient.majiang.hasNotHunCard(pl,tData.hunCard,tData.hunCard2)){
            MjClient.showToast("耗子牌当前不可出");
            return false;
        }
    }

    if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI && tData.areaSelectMode["mantianfei"])
    {
        if (cardui.tag == tData.hunCard)
        {
            MjClient.showToast("癞子牌不可出");
            return false;
        }
    }


    //安化麻将王牌不能打出
    if(MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG)
    {
        var hunCard = MjClient.data.sData.tData.hunCard;
        if((MjClient.majiang.isHunCard && MjClient.majiang.isHunCard(cardui.tag, hunCard)) ||
            (hunCard && hunCard == cardui.tag))
        {
            MjClient.showToast("王牌不可出");
            return false;
        }
    }


    if (MjClient.GAME_TYPE.NING_XIANG_MJ == MjClient.gameType)
    {
        if (pl.mjState == TableState.waitSelect || tData.tState == TableState.waitSelect) return;
        var stopputout = false;
        for (var i = 1; i < 4; i++) {
            var pl_other = getUIPlayer(i);
            if (!pl_other) continue;
            if (pl_other.tingFinish == true) continue;
            else{
                cc.log("有人没听牌完成~~~  ",i);
                stopputout = true;
                break;
            }

        }
        if (stopputout) return false;;
    }

    //宁乡开王麻将纯王不能打出
    if(MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG)
    {
        var pl = getUIPlayer(0);
        var hunCard = MjClient.data.sData.tData.hunCard;
        if(MjClient.majiang.isHunCard(cardui.tag, hunCard) && !pl.fengDong)
        {
            MjClient.showToast("纯王不能打出");
            return false;
        }
    }

    //安化麻将杠时不能选牌
    if(MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG || MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
        MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG || MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG){
        var pl = getUIPlayer(0);
        if(pl.isTing && tData.gangAddCard && tData.gangAddCard.length != 0){
            return false;
        }
    }


    //安化四王麻将等待其他玩家听时不能出牌
    if(MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW || MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG ||
        MjClient.gameType == MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG){
        // var sData = MjClient.data.sData;
        // var tData = sData.tData;
        var canBaoTingPl = [];
        if(MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW){
            for (var uid in sData.players) {
                var pl = sData.players[uid];
                if (tData.allPlayerTingFalg && tData.allPlayerTingFalg[uid]) {
                    canBaoTingPl.push(pl);
                }
            }
            if(canBaoTingPl.length != tData.canBaotingNum) return false;
        }else{
            if(tData.canBaotingNum != 0) return false;
        }
    }


    var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer(0);
    if(!IsTurnToMe() || tData.tState != TableState.waitPut)
    {
        if(MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI &&
            tData.areaSelectMode.wanfa == "duiwangdajiangbao")
        {
            if (pl.hunCard != null && pl.hunCard != -1)
            {
                if (IsTurnToMe() && tData.tState == TableState.waitWang)
                {
                    MjClient.showToast("等他其他玩家选王");
                }
                return false;
            }
        }
        else
        {
            return false;
        }
    }

    if (MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG
        || MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG
        || MjClient.gameType === MjClient.GAME_TYPE.ML_HONGZHONG_ZERO
        || MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN
        || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
        || MjClient.gameType === MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU
        || MjClient.gameType === MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU
        || MjClient.gameType === MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ
        || MjClient.gameType === MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN
        || MjClient.gameType === MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING
        || MjClient.gameType === MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING
        || MjClient.gameType === MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG
        || MjClient.gameType === MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG
        || MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG
        || MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG
        || MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG
        || MjClient.gameType === MjClient.GAME_TYPE.CHANG_SHA
        || MjClient.gameType === MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ 
        || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ
        || MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU
        || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ
        || MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ
        || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO) 
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


    if (MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ)
    {
        if (MjClient.majiang.getAllCardsTotal(tData) - tData.cardNext < MjClient.MaxPlayerNum)
        {
            return false;//最后几张海底牌不能出
        }
        for (var i = 1; i < 4; i++) {
            var pl_other = getUIPlayer(i);
            if (!pl_other)
            {
                continue;
            }
            if (pl_other.needTing)
            {
                MjClient.showToast("等待其他玩家操作");
                return false;
            }
        }
    }

    if (MjClient.gameType == MjClient.GAME_TYPE.XUE_ZHAN ||  MjClient.gameType == MjClient.GAME_TYPE.XUE_LIU)
    {
        if (typeof(pl.que) == "undefined" || pl.que == -1)
        {
            return false; //定缺状态不能出牌
        }
        else if ( pl.que != -1 && Math.floor(cardui.tag / 10) != pl.que && MjClient.QueMenCounts > 0)
        {
            return false;
        }
    }


    //平江扎鸟有人听牌不可出258
    if (MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO)
    {
        var pl_self = getUIPlayer(0);
        if (pl_self.isBBHu) {

             MjClient.showToast("不可出牌");
            return false;
        }
        var isall = true;
        for (var i = 0; i < pl.mjhand.length; i++) {
            if ([2,5,8].indexOf(pl.mjhand[i] % 10) < 0)
            {
                isall = false;
                break;
            }
        }
        for (var i = 1; i < 4; i++) {
            var pl_other = getUIPlayer(i);
            if (!pl_other)
            {
                continue;
            }
            if (pl_other.isBBHu)
            {
                MjClient.showToast("等待其他玩家操作");
                return false;
            }
        }
        if (!isall)
        {
            for (var i = 1; i < 4; i++) {
                var pl_other = getUIPlayer(i);
                if (!pl_other)
                {
                    continue;
                }
                if (pl_other.isTingJJHu && [2,5,8].indexOf(cardui.tag % 10) >= 0)
                {
                    MjClient.showToast("不可出2，5，8");
                    return false;
                }

            }
        }
    }


    if (MjClient.gameType == MjClient.GAME_TYPE.LUAN_GUA_FENG)
    {
        var fengcards = [31,41,51,61,71,81,91];
        fengcards.splice(fengcards.indexOf(tData.hunCard),1);
        if (MjClient.majiang.canchangecolor(cardui.tag,pl.mjhand,pl))
        {
            return false;//手牌中剩余风牌时，其他牌不可出
        }
        if (pl.mjState == TableState.waitSelect)
        {
            return false; // 选择亮风阶段不可出牌
        }
    }

    //转转麻将，和通用红中，自摸胡必须胡，不能出牌
    if (MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN ||
        MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_KD ||
        MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.JING_LE_KOU_DIAN ||
        MjClient.gameType == MjClient.GAME_TYPE.WU_TAI_KOU_DIAN ||
        MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_MA_JIANG ||
        MjClient.gameType == MjClient.GAME_TYPE.ZHUO_HAO_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG ||
        MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO ||
        MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU ||
        MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ ||
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
        MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU ||
        MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.PING_YAO_KOU_DIAN ||
        MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN ||
        MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI)
    {
        if(pl.isZiMoHu) {
            MjClient.showToast("必须胡牌");
            return false;
        }
    }

    //乡宁摔金
    if(MjClient.gameType==MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN)
    {
        var tData = MjClient.data.sData.tData;
        if(pl.eatFlag & 8 && (cardui.tag != tData.hunCard)&&tData.areaSelectMode.baotingbaohu){
            cc.log("有胡必胡----------------------------------1111111");
            MjClient.showToast("有胡必胡");
            return false;
        }
    }

    //大宁摔金
    if(MjClient.gameType==MjClient.GAME_TYPE.DA_NING_SHUAI_JIN)
    {
        var tData = MjClient.data.sData.tData;
        if( (cardui.tag != tData.hunCard)&&MjClient.majiang.CalHunCardNum(pl.mjhand,tData.hunCard)>1){
            cc.log("手上有多个金牌，只能留一张金牌----------------------------------1111111");
            MjClient.showToast("手上有多个金牌，只能打金牌");
            return false;
        }

        if(pl.eatFlag & 8 && (cardui.tag != tData.hunCard)){
            cc.log("大宁摔金有胡必胡----------------------------------1111111");
            MjClient.showToast("有胡必胡");
            return false;
        }
    }
    if(MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN){
        if(tData.areaSelectMode.bihuType && pl.eatFlag & 8){
            MjClient.showToast("有胡必胡");
            return false;
        }
    }

    if(pl.mustHu){
        MjClient.showToast("有胡必胡");
        return false;
    }
    if (MjClient.GAME_TYPE.JING_LE_KOU_DIAN == MjClient.gameType)
    {
        if (pl.eatFlag & 8 && tData.areaSelectMode["bihu"])
        {
            MjClient.showToast("有胡必胡");
            return false;
        }
    }
    if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ) 
    {
        if (MjClient.clickTing && !MjClient.canBaoTingCards[cardui.tag])
        {
            return false;
        }
        if(pl.eatFlag & 8 && pl.isTing )
        {
            return false;
        }
    }

    if (MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO) {
        if (MjClient.clickTing && MjClient.JJHcanTingCards && !MjClient.JJHcanTingCards[cardui.tag])
        {
            return false;
        }
    }else{ 
        if (MjClient.clickTing && !MjClient.canTingCards[cardui.tag])
        {
            return false;
        }
    }

    //晃晃麻将（原泗阳晃晃）和盐城晃晃特殊处理 不能出赖子
    if (MjClient.gameType == MjClient.GAME_TYPE.SI_YANG_HH ||
        MjClient.gameType == MjClient.GAME_TYPE.YAN_CHENG_HH ||
        MjClient.gameType == MjClient.GAME_TYPE.NTHZ){
        if(cardui.tag == tData.hunCard){
            return false;
        }
    }

    if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA && cardui.tag == tData.hunCard)
    {
        if (pl.mjhand.length != MjClient.majiang.getCardCount(pl.mjhand, tData.hunCard) || pl.eatFlag >= 8)
            return false;
    }

    //南通红中（十三张） 手上有四张红中时必须胡
    if (MjClient.gameType == MjClient.GAME_TYPE.NTHZ && MjClient.majiang.getHongZhongNum(pl.mjhand) >= 4)
    {
        return false;
    }



    if (MjClient.movingCard !== null && MjClient.movingCard !== btn)
    {
        return false;
    }

    if ((MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA
        || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
        || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ) &&
        (pl.haiDiLaoState == 1 ||
            MjClient.playui._jiazhuWait.isVisible() ||
            MjClient.playui.jsBind.eat.qshu_layout._node.isVisible()))
    {
        return false;
    }

    //为了解决，有花的情况，下花没自动打出去，打了其他的牌,《海安除外，海安花可以留手上》
    if (MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_BAI_DA
        || MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_MJ
        || MjClient.gameType == MjClient.GAME_TYPE.XUE_ZHAN
        || MjClient.gameType == MjClient.GAME_TYPE.XUE_LIU)
    {
        if(MjClient.majiang.isCardFlower(btn.tag))
        {
            if(!pl.isNew && touchType == ccui.Widget.TOUCH_BEGAN)
            {
                MjClient.showToast("不能出花牌");
                return false;
            }
        }

        if(tData.putType == 1 && pl.mjhand.length > 2 && pl.mjchiCard)
        {
            if(pl.mjchiCard[pl.mjchiCard.length - 1] == btn.tag && touchType == ccui.Widget.TOUCH_BEGAN)
            {
                MjClient.showToast("刚吃的牌不能打");
                return false;
            }
        }
    }

    var children = btn.getParent().children;

    //by sking 新摸的牌是花
    if(MjClient.gameType == MjClient.GAME_TYPE.LIAN_SHUI && MjClient.majiang.isCardFlower(pl.newCd))
    {
        return false;
    }


    for(var i = 0; i < children.length; i++)
    {
        if(children[i].name == "mjhand" )
        {
            if (MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_BAI_DA
                || MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_MJ
                || MjClient.gameType == MjClient.GAME_TYPE.XUE_ZHAN
                || MjClient.gameType == MjClient.GAME_TYPE.XUE_LIU)
            {
                if(pl.isNew) //修复碰牌，不能出出牌的bug
                {
                    if(MjClient.majiang.isCardFlower(children[i].tag))
                    {
                        return false;
                    }
                }
            }
            else
            {
                if(MjClient.majiang.isCardFlower(children[i].tag) &&
                    MjClient.gameType != MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI&&MjClient.gameType != MjClient.GAME_TYPE.LUAN_GUA_FENG)
                {
                    return false;
                }
            }
        }

        //手里打出去，要删掉的那张牌没有删除之前不让出第二张牌，也就是没有收到Mjput消息回调前不让出牌  by sking 2018.9.12
        if(children[i].name == "putOutCard" ) return false;
    }

    if(MjClient.isChaPaiPlaying) return false; //正在播插牌动画时不让点击其他的牌 by sking 2018.9.12

    return  true;
}




/**
 * eatNode适配iOS产品   by Tom
 */
COMMON_UI.vnodeAdaptForiOS = function (vnode)
{
    var eatNodeList = vnode;
    // 第一个为iPad参数，第二个为iPhoneX参数
    var pct = isIPad() ? 0.12 : 0.16;
    var pos = isIPad() ? 0.75 : 0.70;
    var space = isIPad() ? 1.4 : 1.5;
    var offy = isIPad() ? 1.7 : 2.0;
    if(isIPad() || isIPhoneX())
    {
        for(var i = 0, len = eatNodeList.length; i < len; i++)
        {
            if(eatNodeList[i])
            {
                setWgtLayout(vnode[i], [0, pct], [pos, 0], [(i - len + 1) * space, offy], false, false);
            }
        }
    }
};

// 统计立着牌手牌个数
COMMON_UI.countMjHandNums = function (orders, off)
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

//弹框弹出动画(从大到小)
COMMON_UI.layerShowEffect = function (layer) {
    var oldScale = layer.getScale();
    layer.setScale(0);
    layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
}

/*****************************************************************************************
 * 1,主界面的第三方应用广告板块，根据需要可配置
 * 2,ui的格式请参考《湖南地区》（岳阳APP）
 * 3, by sking
 ******************************************************************************************/
COMMON_UI.addHomeAdvMode = function(advNode, _Y_Pos)
{
    if(!advNode) return;

    //advNode.setVisible(false);

    /* 这里是调整主界面的两个模块之间的间距，靠中间对齐*/
    var _parentNode = advNode.getParent();
    var  _gameNode = _parentNode.getChildByName("game_bg");
    if (_gameNode) {
        if (MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
            advNode.setAnchorPoint(1,0.5);
            _gameNode.setAnchorPoint(0,0.5);
            advNode.setPositionX(_parentNode.getContentSize().width*0.46);
            _gameNode.setPositionX(_parentNode.getContentSize().width*0.5);
        }
        else {
            _gameNode.setAnchorPoint(1,0.5);
            advNode.setAnchorPoint(0,0.5);
            _gameNode.setPositionX(_parentNode.getContentSize().width*0.5);
            advNode.setPositionX(_parentNode.getContentSize().width*0.54);
        }
    }
    /* end of 这里是调整主界面的两个模块之间的间距，靠中间对齐*/

    // function toPage(idx)
    // {
    //     advNode.unscheduleAllCallbacks();
    //     pageView_image.scrollToPage(idx);
    //     //updateIconList(idx);
    // }

    var allAdvImages = {
        "personalStore":{icon:"personalStoreicon",bigImage:"personalStoreicon",callback:function(sender,type){
            if (type === ccui.Widget.TOUCH_ENDED) {
                // if(sender.getScale() == 1 && sender.getName() != "page") {
                //     toPage(3);
                //     return;
                // }
                MjClient.native.umengEvent4CountWithProperty("zhujiemian_gerenshangcheng_dianji", {uid: SelfUid()});
                updateUserBehavior("个人商城");
                cc.log("------个人商城 " + util.localStorageEncrypt.getBoolItem("_Disclaimer_NoRem_", false));
                if (util.localStorageEncrypt.getBoolItem("_Disclaimer_Agree_", false) && util.localStorageEncrypt.getBoolItem("_Disclaimer_NoRem_", false)) {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.openBrowser", {type: 16}, function (rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            MjClient.native.OpenUrl(rtn.data);
                            //MjClient.native.wxShareUrl(rtn.data, unescape(pinfo.nickname) + "的战绩", "个人记录请勿对外分享\n绿色健康游戏，享受美好生活");
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
                } else {
                    var layer = new disclaimerReminderLayer();
                    if(layer) MjClient.Scene.addChild(layer);
                    
                }
                cc.log("当前进入个人商城");
            }
        }},

        "baojinbuyu":{icon:"baojinbuyuicon",bigImage:"baiwanbuyu",callback:function(sender,type){
            if (type === ccui.Widget.TOUCH_ENDED) {
                // if(sender.getScale() == 1 && sender.getName() != "page") {
                //     toPage(3);
                //     return;
                // }
                MjClient.native.umengEvent4CountWithProperty("zhujiemian_baojinbuyu_dianji", {uid: SelfUid()});
                updateUserBehavior("送话费");
                var layer = new BaoJinBuYuWebviewLayer();
                if(layer) MjClient.Scene.addChild(layer);
                cc.log("当前游戏：爆金捕鱼");
            }
        }},
        "chuanqi":{icon:"chuanqilaile-icon-fs8",bigImage:"chuanqilaile-Banner-fs8",callback:function(sender,type){
                if (type === ccui.Widget.TOUCH_ENDED) {
                    // if(sender.getScale() == 1 && sender.getName() != "page") {
                    //     toPage(0);
                    //     return;
                    // }

                    MjClient.native.umengEvent4CountWithProperty("zhujiemian_chuanqi_dianji", {uid:SelfUid()});
                    updateUserBehavior("传奇游戏");
                    var layer = new ChuanQiWebviewLayer();
                    if (layer.isInitSuccess())
                        MjClient.Scene.addChild(layer);
                    cc.log("当前游戏：传奇");
                }
            }},
        "rexue":{icon:"rexueheji_icon",bigImage:"rexueheji_banner",callback:function(sender,type){
                if (type === ccui.Widget.TOUCH_ENDED) {
                    // if(sender.getScale() == 1 && sender.getName() != "page") {
                    //     toPage(1);
                    //     return;
                    // }
                    MjClient.native.umengEvent4CountWithProperty("zhujiemian_rexueheji_dianji", {uid:SelfUid()});
                    updateUserBehavior("热血合击");
                    var layer = new RexueHejiWebviewLayer();
                    if (layer.isInitSuccess())
                        MjClient.Scene.addChild(layer);
                    cc.log("当前游戏：热血");
                }
            }},
        "moyu":{icon:"moyu_icon",bigImage:"moyulaile",callback:function(sender,type){
                if (type === ccui.Widget.TOUCH_ENDED) {
                    // if(sender.getScale() == 1 && sender.getName() != "page") {
                    //     toPage(2);
                    //     return;
                    // }
                    MjClient.native.umengEvent4CountWithProperty("zhujiemian_moyulaile_dianji", {uid:SelfUid()});
                    updateUserBehavior("魔域");
                    var layer = new MoyuLaileWebviewLayer();
                    if (layer.isInitSuccess())
                        MjClient.Scene.addChild(layer);
                    cc.log("当前游戏：魔域");
                }
            }},
        "caiyun":{icon:"icon_yinyuancaiyun",bigImage:"banner_yinyuancaiyun",callback:function(sender,type){
                if (type === ccui.Widget.TOUCH_ENDED) {
                    // if(sender.getScale() == 1 && sender.getName() != "page") {
                    //     toPage(4);
                    //     return;
                    // }
                    MjClient.native.umengEvent4CountWithProperty("zhujiemian_yinyuancaiyun_dianji", {uid: SelfUid()});
                    updateUserBehavior("今日牌运");
                    var layer = new QiShanMianLiWebviewLayer();
                    if (layer.isInitSuccess())
                        MjClient.Scene.addChild(layer);
                    cc.log("当前游戏：奇善命里");
                }
            }},
        "jiandangjianghu":{icon:"jiandangjianghuicon",bigImage:"baiwanbuyu",callback:function(sender,type){
            if (type === ccui.Widget.TOUCH_ENDED) {
                // if(sender.getScale() == 1 && sender.getName() != "page") {
                //     toPage(3);
                //     return;
                // }
                MjClient.native.umengEvent4CountWithProperty("zhujiemian_jiandangjianghu_dianji", {uid: SelfUid()});
                updateUserBehavior("剑荡江湖");
                var layer = new JianDangJiangHuWebviewLayer();
                if(layer) MjClient.Scene.addChild(layer);
                cc.log("当前游戏：剑荡江湖");
            }
        }},
        "buyu":{icon:"buyuicon",bigImage:"baiwanbuyu",callback:function(sender,type){
            if (type === ccui.Widget.TOUCH_ENDED) {
                // MjClient.showMsg("玩捕鱼，赢话费！全面升级的爆金捕鱼，给你全方位的游戏享受。现在就去试试吧！", function() {
                //     MjClient.native.umengEvent4CountWithProperty("zhujiemian_baojinbuyu_dianji", {uid: SelfUid()});
                //     var layer = new BaoJinBuYuWebviewLayer();
                //     if(layer) MjClient.Scene.addChild(layer);
                //     cc.log("当前游戏：爆金捕鱼");
                // }, function() {
                    util.localStorageEncrypt.setNumberItem("lastIntoBuyuTime", MjClient.data.serverTime);
                    MjClient.native.umengEvent4CountWithProperty("zhujiemian_buyu_dianji", {uid:SelfUid()});
                    var layer = new BuyuWebviewLayer();
                    if(layer) MjClient.Scene.addChild(layer);
                    cc.log("当前游戏：捕鱼");
                //});
            }
        }},
       
        // "daikuanchaoshi":{icon:"daikuanchaoshi",bigImage:"daikuanchaoshiB",callback:function(sender,type){
        //         if (type === ccui.Widget.TOUCH_ENDED) {
        //             //todo...
        //             cc.log("当前游戏：贷款超市");
        //         }
        //     }},
        // "wangzhe":{icon:"wangzhe",bigImage:"wangzhe3",callback:function(sender,type){
        //         if (type === ccui.Widget.TOUCH_ENDED) {
        //             // MjClient.native.umengEvent4CountWithProperty("zhujiemian_wangzhezhanshen_dianji", {uid:SelfUid()});
        //             // MjClient.Scene.addChild(new WangzheZhanshenWebviewLayer());
        //             // cc.log("当前游戏：王者");
        //         }
        //     }}
    }

    var time = 0;
    var isShowBuyu = true;
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ) {
        time = Date.parse("2019-07-18T06:00:00");
    } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) {
        time = Date.parse("2019-07-19T06:00:00");
    } else if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
        time = Date.parse("2019-07-20T06:00:00");
    } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
        time = Date.parse("2019-07-25T06:00:00");
    } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ) {
        time = Date.parse("2019-07-26T06:00:00");
    } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ) {
        time = Date.parse("2019-08-08T06:00:00");
    }

    // 在指天日期后注册的玩家，不显示捕鱼
    if (time > 0 && MjClient.data.pinfo.createTime > time)
        isShowBuyu = false;

    if (isShowBuyu) {
        time = util.localStorageEncrypt.getNumberItem("lastIntoBuyuTime", 0);
        if (time == 0) 
            util.localStorageEncrypt.setNumberItem("lastIntoBuyuTime", MjClient.data.serverTime);

        // 五天内没有进入捕鱼，不显示捕鱼
        if (time > 0 && time < MjClient.data.serverTime - 5 * 24 * 60 * 60 * 1000)
            isShowBuyu = false;
    }
    if (!isShowBuyu)
        delete allAdvImages["buyu"];

    var _Y_Pos = _Y_Pos || [0.05,0.37,0.69];

    //icon
    var listView_icon = advNode.getChildByName("ListView_advs");
    var _copyIcon = listView_icon.getChildByName("gameIcon").clone();
    listView_icon.removeAllChildren(true);
    listView_icon.setInnerContainerSize(cc.size(listView_icon.width, 16+_copyIcon.getContentSize().height*1.2*Math.ceil(Object.keys(allAdvImages).length/_Y_Pos.length)));

    //image
    // var pageView_image = advNode.getChildByName("PageView_advs");
    // var _copyIamge = pageView_image.getChildByName("Panel_bg").clone();
    // pageView_image.removeAllChildren(true);
    var _picPath = "game_picture/mainMenu/adv/";
    listView_icon.setScrollBarEnabled(false);

    var _startY = 69;
    var idx_x = 0;
    var idx_y = 0;

    for(var key in allAdvImages)
    {
        var _itemIcon = _copyIcon.clone();
        _itemIcon.loadTextureNormal(_picPath + allAdvImages[key].icon + ".png");
        listView_icon.addChild(_itemIcon);
        _itemIcon.setName(key);
        _itemIcon.addTouchEventListener(allAdvImages[key].callback);
        _itemIcon.setAnchorPoint(0,0.5);
        if (_Y_Pos.length == 2)
            _itemIcon.setPosition(listView_icon.getContentSize().width * _Y_Pos[idx_x],listView_icon.getInnerContainerSize().height - 60 - _itemIcon.getContentSize().width * _itemIcon.scaleY * 1.1 * parseInt(idx_y/2));
        else
            _itemIcon.setPosition(listView_icon.getContentSize().width * _Y_Pos[idx_x],listView_icon.getInnerContainerSize().height - _startY - _itemIcon.getContentSize().width*1.2 * parseInt(idx_y/3));
        idx_y++;
        idx_x = idx_y% _Y_Pos.length;

        if(key == "baojinbuyu"){
            var buyuicon = new cc.Sprite("game_picture/mainMenu/adv/baojinbuyuicon_01.png");
            buyuicon.setPosition(cc.p(_itemIcon.width/2, _itemIcon.height/2));
            _itemIcon.addChild(buyuicon);
        
            //创建帧动画序列，名词形式
            var animation = new cc.Animation();
            for (var i = 1; i <= 4; i++)
            {
                animation.addSpriteFrameWithFile("game_picture/mainMenu/adv/baojinbuyuicon_0"+ i +".png");
            }
            //设置帧动画属性
            animation.setDelayPerUnit(0.2);       //每一帧停留的时间
            animation.setRestoreOriginalFrame(true);   //播放完后回到第一帧
            var animate = new cc.Animate(animation);
            buyuicon.runAction(new cc.RepeatForever(animate));
        }

        // var _itemImage = _copyIamge.clone();
        // _itemImage.getChildByName("Image").loadTexture(_picPath + allAdvImages[key].bigImage + ".png");
        // pageView_image.pushBackCustomItem(_itemImage);
        //
        // _itemImage.setTouchEnabled(true);
        // _itemImage.setName("page");
        // _itemImage.addTouchEventListener(allAdvImages[key].callback);
    }

    

    //var _listViewItems = listView_icon.getItems();
    // function updateIconList(idx)
    // {
    //     if(!_listViewItems[idx]) return;
    //     for(var i = 0; i < _listViewItems.length; i++)
    //     {
    //         if(_listViewItems[i].getChildByName("kuang")) _listViewItems[i].removeChildByName("kuang");
    //         _listViewItems[i].setScale(1);
    //     }
    //     _listViewItems[idx].setScale(1.08);
    //     var _kuang = new ccui.ImageView(_picPath + "kuang.png");
    //     _kuang.setPosition(_listViewItems[idx].getContentSize().width/2,_listViewItems[idx].getContentSize().height/2);
    //     _kuang.setName("kuang");
    //     _listViewItems[idx].addChild(_kuang);
    //
    //
    // }
    //var _currentIdx = 3;//getRandomRange(0,pageView_image.getItems().length - 1);//一进来的时候随机
    //updateIconList(_currentIdx);
    //pageView_image.scrollToPage(_currentIdx);

    // var ooff = 0;
    // var _updetaInfo = function(){
    //     if(_currentIdx >= 5)
    //     {
    //         listView_icon.jumpToRight();
    //     }
    //     else
    //     {
    //         listView_icon.jumpToLeft();
    //     }
    //
    //     //updateIconList(_currentIdx);
    //     pageView_image.scrollToPage(_currentIdx);
    //     _currentIdx++;
    //     ooff = 0;
    //     if(_currentIdx == pageView_image.getItems().length) _currentIdx = 0;
    // }
    //
    // pageView_image.addEventListener(function(sender,type){
    //     switch (type) {
    //         case ccui.PageView.EVENT_TURNING:
    //             var currentPageIndex = pageView_image.getCurrentPageIndex();
    //             //updateIconList(currentPageIndex);
    //             if(ooff == 1)
    //             {
    //                 _currentIdx = currentPageIndex;
    //                 // advNode.unschedule(_updetaInfo);
    //                 // advNode.schedule(_updetaInfo,3);
    //             }
    //             ooff = 1;
    //             break;
    //         default:
    //             break;
    //     }
    // },this);
    // advNode.schedule(_updetaInfo,3);
}

/**
 * 大结算，分享的二维码
 * @param url
 * @cb  下载图片成功后的回调函数
 */
COMMON_UI.getShareCodeTexture = function(url,node,cb)
{
    // 有个性头像，使用个性头像，没有则用传参的 url 即二维码图片
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pl = sData.players[SelfUid() + ""];
    if (pl && pl.info.photo) {
        url = pl.info.photo;
        if (url.indexOf("https") == 0) {
            url = url.replace(/https/, "http");
        }
    }

    if (!url || url == "") {
        if(cb) cb();
        return;
    }
    if (url) cc.loader.loadImg(url, { isCrossOrigin: true }, function(err, texture) {
        if (!err && texture) {
            var _codePic = new cc.Sprite(texture);
            _codePic.setPosition(cc.winSize.width,cc.winSize.height);
            _codePic.setName("shareCode");
            // _codePic.setScale(1.5);
            _codePic.setAnchorPoint(1,1);
            MjClient.Scene.addChild(_codePic,100); 
            setWgtLayout(_codePic,[0.12,0.12],[1,1],[0,0], true);
            if(cb) cb();
        }
    });
}

//联盟房间，不同俱乐部，添加标识
COMMON_UI.addGameOverNotSameClubUI = function(node,pl){
    if(!node || !pl){
        return ;
    }
    var clubInfoTable = getClubInfoInTable();
    if(!clubInfoTable || !clubInfoTable.isLMClub){
        //不是俱乐部房或不是联盟俱乐部
        return;
    }
    //判断是否同一个俱乐部
    var sign = node.getChildByName("notSameClubSign");
    if(isOnSameLMClubInTable(pl.info)){
        if(sign){
            sign.visible = false;
        }
        return false;
    }
    //添加标记
    if(!sign){
        var nameNode = node.getChildByName("name");
        if(!nameNode){
            nameNode = node.getChildByName("text_name");
        }
        if(nameNode){
            var sign = new ccui.ImageView("friendCards_LM/img_notSameClubSign.png");
            sign.setName("notSameClubSign")
            var signPosition = nameNode.getPosition();
            signPosition.x = signPosition.x - nameNode.getAnchorPoint().x * nameNode.width - sign.width/2 - 15;
            sign.setPosition(signPosition)
            node.addChild(sign,1)
        }else{
            cc.log("nameNode false")
            mylog("addGameOverNotSameClubUI nameNode not found,这是一个bug")
        }
        
    }else{
        sign.visible = true;
    }

    var idNode = node.getChildByName("id");
    if(!idNode){
        idNode = node.getChildByName("text_id");
    }
    if(idNode){
        //与自己不是一个亲友圈的玩家ID，从第二位开始隐藏3位
        var hideIdStr = pl.info.uid +"";
        if(hideIdStr.length >= 4){
            hideIdStr = hideIdStr.slice(0,1) + "***" + hideIdStr.slice(4,hideIdStr.length)
        }
        var idStr = idNode.getString();
        if(idStr.indexOf(":") > -1){
            idNode.setString("ID:"+hideIdStr);
        }else if (idStr.indexOf("：") > -1){
            idNode.setString("ID："+hideIdStr);
        }else if (idStr.indexOf("ID") > -1){
            idNode.setString("ID"+hideIdStr);
        }else if (idStr.indexOf("id") > -1){
            idNode.setString("id"+hideIdStr);
        }else{
            idNode.setString(hideIdStr);
        }
    }else{
        cc.log("idNode false")
        mylog("addGameOverNotSameClubUI idNode not found,这是一个bug")
    }

    
    
    return true;
    
}


/*
*添加贵族头像框 添加的头像框层级是1
*attachNode 依附的节点
*pInfo 用户信息 pl.info
*afterFunc 添加后的回调方法,已经存在不回调
*/
COMMON_UI.addNobleHeadFrame = function(attachNode,pInfo,afterFunc){
    if(!MjClient.isOpenHeadFrame()){
        return;
    }
    if(!attachNode || !pInfo){
        return;
    }
    var nobleHeadFrame = attachNode.getChildByName("nobleHeadFrame");
    //添加贵族头像框
    if(!nobleHeadFrame && pInfo.info.aliasId){
        nobleHeadFrame = new ccui.ImageView("userInfo_3.0/zhuangBan/headFrame/"+pInfo.info.aliasId+".png");
        attachNode.addChild(nobleHeadFrame,1);
        // 微调头像框 by lms
        setWgtLayout(nobleHeadFrame, [1.15, 1.15], [0.5, 0.5], [0, 0], false, true);
        if(afterFunc){
            afterFunc(nobleHeadFrame);
        }
        UIEventBind(null, nobleHeadFrame, "removePlayer", function(){
            var sData = MjClient.data.sData;
            var uids = sData.tData.uids;
            var hasFind = false;
            for(var i = 0; i < uids; i++){
                if(uids[i] = this._uid){
                    hasFind = true;
                    break;
                }
            }
            if(!hasFind){
                this.visible = false;
            }
        }.bind(nobleHeadFrame));

        UIEventBind(null, nobleHeadFrame, "initSceneData", function(){
            var sData = MjClient.data.sData;
            var uids = sData.tData.uids;
            var hasFind = false;
            for(var i = 0; i < uids; i++){
                if(uids[i] = this._uid){
                    hasFind = true;
                    break;
                }
            }
            if(!hasFind){
                this.visible = false;
            }
        }.bind(nobleHeadFrame));
    }else if(nobleHeadFrame && pInfo.info.aliasId){
        nobleHeadFrame.loadTexture("userInfo_3.0/zhuangBan/headFrame/"+pInfo.info.aliasId+".png");
    }
    if(nobleHeadFrame){
        nobleHeadFrame._uid = pInfo.info.uid;
        nobleHeadFrame.visible = true;
    }
    if(nobleHeadFrame && !pInfo.info.aliasId){
        nobleHeadFrame.visible = false;
    }

    COMMON_UI.addJoinGameAni(attachNode,pInfo)
}

/*
*添加入场动画
*headNode 头像节点(动画结束的位置)
*pInfo 用户信息 pl.info
*/
COMMON_UI.addJoinGameAni = function(headNode,pInfo){
    if(!MjClient.isOpenJoinGameAni()){
        return;
    }


    cc.log("wxd==============pInfo.info"+JSON.stringify(pInfo.info));
    if(!pInfo.info.rcdhAliasId||headNode.getChildByName("animation"+pInfo.info.uid)){
        return;
    }

    var RCDH_tab = {
        "RCDH1": "huabanxie",
        "RCDH2": "motuoche",
        "RCDH3": "tuolaji",
        "RCDH4": "baoma",
        "RCDH5": "hongqi",
        "RCDH6": "sirenfeiji",
        "RCDH7": "tuziwu",
        "RCDH8": "jiuhuche",
    };
    var _json = "userInfo_3.0/zhuangBan/cartoon/" + RCDH_tab[pInfo.info.rcdhAliasId] + "/" + RCDH_tab[pInfo.info.rcdhAliasId] + ".json";
    var _atlas = "userInfo_3.0/zhuangBan/cartoon/" + RCDH_tab[pInfo.info.rcdhAliasId] + "/" + RCDH_tab[pInfo.info.rcdhAliasId] + ".atlas";
    var projNode = createSpine(_json, _atlas);
    projNode.setAnimation(0, 'animation', false);
    projNode.setPosition(cc.p(headNode.width * 0.5,headNode.height * 0.2));
    projNode.setScale(0.4);
    projNode.setName("animation"+pInfo.info.uid);
    projNode.setCompleteListener(function(trackEntry) {
        this.visible = false;
        //this.runAction(cc.removeSelf());
    }.bind(projNode));
    headNode.addChild(projNode,9);
}


