/***
 * 湘阴推倒胡，新框架牌桌逻辑
 * @type {void | Class | *}
 */

var majiang_panel_suiZhouKaiWuXing;
(function () {
    majiang_panel_suiZhouKaiWuXing = majiang_panel_hubei.extend({
        jsonFile: "Play_suiZhouKaWuXing.json",
        getJsBind:function(){
            return{
                node_down:{
                    layout_head:{
                        img_gangscore:{
                            _event: {
                                MJGangScore:function(ed){
                                    MjClient.playui.UpdateGangScore(this,ed,"node_down");
                                }
                            }
                        },
                        img_piaoFen:{
                            _run:function(){
                                this.visible = false;
                                var player = MjClient.playui.getPlayerInfoByName("node_down");
                                if (!player) return;
                                MjClient.playui.initChuZiShow(this,player);
                            },
                            _event:{
                                initSceneData:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    if (!player) return;
                                    MjClient.playui.initChuZiShow(this,player);
                                },
                                mjhand:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    if (!player) return;
                                    MjClient.playui.initChuZiShow(this,player);
                                },
                                MJChuzi:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    if (!player) return;
                                    MjClient.playui.initChuZiShow(this,player);
                                },
                                roundEnd:function(){
                                    this.visible = false;
                                }
                            }
                        },
                        img_tingCards: {
                            _event: {
                                initSceneData:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    var tData = MjClient.data.sData.tData;
                                    if(player && player.tingCards && tData.tState != TableState.roundFinish){
                                        this.setTingCards();
                                    }
                                },
                                setTingCards: function(cardTag){
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    var tingCards = {};
                                    for(var i = 0; i < player.tingCards.length; i++){
                                        tingCards[player.tingCards[i]] = 1;
                                    }

                                    if (Object.keys(tingCards).length <= 0) {
                                        tingCards = MjClient.playui.getLimitTingCards(cardTag);
                                    }
                                    
                                    var formatCards = MjClient.playui.removeLimitTingCards(tingCards);
                                    var keysArray = Object.keys(formatCards);
                                    var tingLightBtn = this.getParent().getChildByName("btn_tingLight");
                                    
                                    if (keysArray.length == 0){
                                        if(tingLightBtn){
                                            tingLightBtn.visible = false;
                                        }
                                        this.visible = false;
                                        return;
                                    }

                                    if(tingLightBtn && cc.sys.isObjectValid(tingLightBtn)){
                                        //位置适配听牌灯泡的位置
                                        this.setPositionY(tingLightBtn.getPositionY() + tingLightBtn.getContentSize().height * tingLightBtn.getScale() * 0.1);
                                    }
                                    
                                    if(MjClient.playui.isShowTingLight())
                                        tingLightBtn && (tingLightBtn.visible = true);
                                    this.visible = true;
                                    if(tingLightBtn && !tingLightBtn.isClick){
                                        this.visible = false;
                                    }
                                    this.cleanTingCards();
                                    if(MjClient.playui.isTingAllCards(tingCards)){
                                        this.tingAllCards();
                                        return;
                                    }
                                    var img_tingCard = this.getChildByName("img_tingCard");
                                    var startPos = img_tingCard.getPosition();
                                    var col_max = 17, row = 0, col = 0, row_space = 3;
                                    var lastTingNode = null;
                                    for(var i = 0;i < keysArray.length;i++){
                                        var card = keysArray[i];
                                        var cardNode = util.clone(img_tingCard);
                                        lastTingNode = cardNode;
                                        cardNode.visible = true;
                                        cardNode.setName("tingCard");
                                        cardNode.setPositionX(img_tingCard.x + col * img_tingCard.width * img_tingCard.scale);
                                        cardNode.setPositionY(img_tingCard.y + row * img_tingCard.height * img_tingCard.scale + row_space * row);
                                        MjClient.playui.setTingCardSprite(cardNode, card);
                                        this.addChild(cardNode);

                                        col++;
                                        row = Math.floor((i + 1) / col_max);
                                        col = col % col_max;
                                    }
                                    var factMaxCol = row > 0 ? col_max : col;
                                    var descLabel = this.getTingDesc(lastTingNode);
                                    var layerHeight = img_tingCard.height * (row + 1) + row_space * (row + 2);
                                    var layerWidth = img_tingCard.x + img_tingCard.width * (factMaxCol + 2);
                                    var addWidth = 0;
                                    if (descLabel){
                                        addWidth = row == 0 ? descLabel.width : (descLabel.width > (col_max - factMaxCol) * img_tingCard.width) ? 
                                                   descLabel.width : (col_max - factMaxCol) * img_tingCard.width;
                                    }
                                    ccui.helper.seekWidgetByName(this, "img_tingIcon").setPositionY(layerHeight/2);
                                    this.setContentSize(layerWidth + addWidth, layerHeight);
                                }
                            }
                        },
                        img_piao:{
                            _run:function(){
                                this.visible = false;
                                var player = MjClient.playui.getPlayerInfoByName("node_down");
                                if (!player) return;
                                this.visible = true;
                                var piaoNum = player.jiazhuNum || 0;
                                this.loadTexture("playing/jingshan/p_" + piaoNum + ".png");
                            },
                            _event:{
                                initSceneData:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    if (!player) return;
                                    this.visible = true;
                                    var piaoNum = player.jiazhuNum || 0;
                                    this.loadTexture("playing/jingshan/p_" + piaoNum + ".png");
                                },
                                mjhand:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    if (!player) return;
                                    this.visible = true;
                                    var piaoNum = player.jiazhuNum || 0;
                                    this.loadTexture("playing/jingshan/p_" + piaoNum + ".png");
                                },
                                MJJiazhu:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    if (!player) return;
                                    this.visible = true;
                                    var piaoNum = player.jiazhuNum || 0;
                                    this.loadTexture("playing/jingshan/p_" + piaoNum + ".png");
                                },
                                roundEnd:function(){
                                    this.visible = false;
                                }
                            }
                        }
                    },
                    _event:{
                        waitJiazhu:function(){
                            var param = MjClient.playui.getPiaoFenParam();
                            var _jiazhuLayer = new majiang_piaoFen(param);
                            _jiazhuLayer.setName("JiaZhuLayer");
                            MjClient.playui.addChild(_jiazhuLayer);
                        },
                        waitChooseCard:function(){
                            var _chuZiLayer = new majiang_chuZi();
                            _chuZiLayer.setName("ChuZiLayer");
                            MjClient.playui.addChild(_chuZiLayer);
                        },
                        MJPut: function(data) {
                            MjClient.playui.clickGangPass = false;
                            MjClient.playui.clickTingPass = false;
                            MjClient.playui.clickTing = false;
                            MjClient.playui.dealPut(this, data);
                            if(data.uid == MjClient.playui.getSelfUid()){
                                MjClient.playui.checkHandCards(this);
                                MjClient.playui.checkPutCards(this);
                                MjClient.playui.updateTingTips();
                            }else if (data.uid != MjClient.playui.getSelfUid() && data.tingAfterPut) {}{
                                MjClient.playui.refreshCardColor(this);
                            }
                        },
                        newCard: function(data) {
                            var tData = MjClient.data.sData.tData;
                            var playerNode = MjClient.playui.getNodeByName("node_down");

                            var cardNode = MjClient.playui.createCard(playerNode, MjClient.playui.CsdDefaultCardType.HandCard, 
                                        MjClient.playui.HandleCardType.Hand, data.newCard);
                            cardNode.visible = false;
                            MjClient.playui.searchAllTingCards();
                            if(MjClient.movingCard && cc.sys.isObjectValid(MjClient.movingCard)){
                                MjClient.movingCard = null;
                            }

                            var forbidArr = MjClient.playui.getAllForbidCards();
                            if (forbidArr.indexOf(cardNode.tag) >= 0) {
                                cardNode.setColor(cc.color(190,190,190));
                            }

                        },
                        initSceneData: function(){
                            //一炮多响的倒牌
                            var player = MjClient.playui.getUIPlayerByUID(MjClient.playui.getSelfUid());
                            if(player.mjState != TableState.roundFinish){
                                player.isZiMo = false;
                            }
                            //初始化所有数据
                            MjClient.playui.initGameData();
                            MjClient.playui.updatePlayerCards(this);
                            MjClient.playui.updataClickCancelTingBtn();
                            MjClient.playui.updateCardColorAfterTing(true);

                            MjClient.playui.allForbidCards = MjClient.playui.getAllForbidCards();
                            MjClient.playui.refreshCardColor(this);
                            
                            MjClient.playui.updatePlayerEatBtn();
                            //听牌
                            MjClient.playui.searchAllTingCards();
                            postEvent(MjClient.playui.PlayEventType.SHOW_TING_CARDS);
                            MjClient.playui.updateTingTips();

                            

                            MjClient.playui.cutDownCardsBeforEndOneWhen23D(this);

                            var tData = MjClient.data.sData.tData;
                            if (tData.tState == TableState.waitJiazhu) {
                                if (player.mjState == TableState.waitJiazhu) {
                                    var param = MjClient.playui.getPiaoFenParam();
                                    var _jiazhuLayer = new majiang_piaoFen(param);
                                    _jiazhuLayer.setName("JiaZhuLayer");
                                    MjClient.playui.addChild(_jiazhuLayer);
                                }
                            }

                            if (tData.tState == TableState.waitChooseCard) {
                                if (player.mjState == TableState.waitChooseCard) {
                                    var _chuZiLayer = new majiang_chuZi(param);
                                    _chuZiLayer.setName("ChuZiLayer");
                                    MjClient.playui.addChild(_chuZiLayer);
                                }
                            }
                        },
                        switch2Dor3D: function(){
                            if(!MjClient.playui.isInGame()){
                                return;
                            }
                            MjClient.playui.updata2DTo3DData();
                            MjClient.playui.updatePlayerCards(this);
                            MjClient.playui.updateCardColorAfterTing();
                            MjClient.playui.updateTingTips();
                            MjClient.playui.cutDownCardsBeforEndOneWhen23D(this);
                            MjClient.playui.refreshCardColor(this);
                        },
                        roundEnd: function(){
                            MjClient.playui.updatePlayerEatBtn();
                            MjClient.playui.initGameData();
                        },
                    }
                },
                node_top:{
                    layout_head:{
                        img_gangscore:{
                            _event: {
                                MJGangScore:function(ed){
                                    MjClient.playui.UpdateGangScore(this,ed,"node_top");
                                }
                            }
                        },
                        img_piaoFen:{
                            _run:function(){
                                this.visible = false;
                                var player = MjClient.playui.getPlayerInfoByName("node_top");
                                if (!player) return;
                                MjClient.playui.initChuZiShow(this,player);
                            },
                            _event:{
                                initSceneData:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    if (!player) return;
                                    MjClient.playui.initChuZiShow(this,player);
                                },
                                mjhand:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    if (!player) return;
                                    MjClient.playui.initChuZiShow(this,player);
                                },
                                MJChuzi:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    if (!player) return;
                                    MjClient.playui.initChuZiShow(this,player);
                                },
                                roundEnd:function(){
                                    this.visible = false;
                                }
                            }
                        },
                        img_tingCards: {
                            _layout: [[0.25, 0.12], [0.2, 0.25], [0, 0.1]],
                            _visible: false,
                            _run: function() {
                                this.zIndex = 500;
                                if(MjClient.playui.isIPhoneX())
                                    setWgtLayout(this,[0.25, 0.12], [0.2, 0.25], [0, 0.2]);

                                var originalPosY = this.getPositionY();
                                var originalHeight = this.getContentSize().height;
                                var originalScale = this.getScale();
                                this.visible = false;
                                this.setAnchorPoint(cc.p(0,0));
                                var tingLightBtn = this.getParent().getChildByName("btn_tingLight");
                                this.scale = 1.2;
                                this.y = this.parent.getChildByName("atlas_tuoGuanTime").y - 50;
                                this.x -= 20;
                            },
                            img_tingCard: {
                                _visible: false
                            },
                            _event: {
                                newCard: function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    if(!player.isTing) this.visible = false;
                                },
                                roundEnd: function() {
                                    this.visible = false;
                                },
                                MJTing: function(data){
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    if(data.uid == player.info.uid){
                                        this.setTingCards(data.tingCards);
                                    }
                                },
                                initSceneData:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    var tData = MjClient.data.sData.tData;
                                    if(player && player.tingCards && tData.tState != TableState.roundFinish){
                                        this.setTingCards(player.tingCards);
                                    }
                                }
                            },
                            getTingDesc: function(lastTingNode){
                                var player = MjClient.playui.getPlayerInfoByOff();
                                if(!player.isTing || !lastTingNode){
                                    return;
                                }
                                var descLabel = new cc.LabelTTF("", MjClient.fzcyfont, 25);
                                descLabel.setColor(cc.color(255,220,74));
                                descLabel.setAnchorPoint(0,0.5);
                                descLabel.setPosition(lastTingNode.getContentSize().width ,lastTingNode.getContentSize().height / 2);
                                lastTingNode.addChild(descLabel);
                                return descLabel;
                            },
                            cleanTingCards: function(){
                                var children = this.children;
                                for(var i = 0;i < children.length;i++){
                                    var child = children[i];
                                    if(child && (child.getName() == "tingCard" || child.getName() == "tingAllCards")){
                                        child.removeFromParent(true);
                                    }
                                }
                            },
                            setTingCards: function(tingCard){
                                var keysArray = tingCard;
                                var tingLightBtn = this.getParent().getChildByName("btn_tingLight");
                                
                                if (keysArray.length == 0){
                                    if(tingLightBtn){
                                        tingLightBtn.visible = false;
                                    }
                                    this.visible = false;
                                    return;
                                }

                                this.visible = true;
                                this.cleanTingCards();
                                var img_tingCard = this.getChildByName("img_tingCard");
                                var startPos = img_tingCard.getPosition();
                                var col_max = 17, row = 0, col = 0, row_space = 3;
                                var lastTingNode = null;
                                for(var i = 0;i < keysArray.length;i++){
                                    var card = keysArray[i];
                                    var cardNode = util.clone(img_tingCard);
                                    lastTingNode = cardNode;
                                    cardNode.visible = true;
                                    cardNode.setName("tingCard");
                                    cardNode.setPositionX(img_tingCard.x + col * img_tingCard.width * img_tingCard.scale);
                                    cardNode.setPositionY(img_tingCard.y + row * img_tingCard.height * img_tingCard.scale + row_space * row);
                                    MjClient.playui.setTingCardSprite(cardNode, card);
                                    this.addChild(cardNode);

                                    col++;
                                    row = Math.floor((i + 1) / col_max);
                                    col = col % col_max;
                                }
                                var factMaxCol = row > 0 ? col_max : col;
                                var descLabel = this.getTingDesc(lastTingNode);
                                var layerHeight = img_tingCard.height * (row + 1) + row_space * (row + 2);
                                var layerWidth = img_tingCard.x + img_tingCard.width * (factMaxCol + 2);
                                var addWidth = 0;
                                if (descLabel){
                                    addWidth = row == 0 ? descLabel.width : (descLabel.width > (col_max - factMaxCol) * img_tingCard.width) ? 
                                               descLabel.width : (col_max - factMaxCol) * img_tingCard.width;
                                }
                                ccui.helper.seekWidgetByName(this, "img_tingIcon").setPositionY(layerHeight/2);
                                this.setContentSize(layerWidth + addWidth, layerHeight);
                            }       
                        },
                        img_piao:{
                            _run:function(){
                                this.visible = false;
                                var player = MjClient.playui.getPlayerInfoByName("node_top");
                                if (!player) return;
                                this.visible = true;
                                var piaoNum = player.jiazhuNum || 0;
                                this.loadTexture("playing/jingshan/p_" + piaoNum + ".png");
                            },
                            _event:{
                                initSceneData:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    if (!player) return;
                                    this.visible = true;
                                    var piaoNum = player.jiazhuNum || 0;
                                    this.loadTexture("playing/jingshan/p_" + piaoNum + ".png");
                                },
                                mjhand:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    if (!player) return;
                                    this.visible = true;
                                    var piaoNum = player.jiazhuNum || 0;
                                    this.loadTexture("playing/jingshan/p_" + piaoNum + ".png");
                                },
                                MJJiazhu:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    if (!player) return;
                                    this.visible = true;
                                    var piaoNum = player.jiazhuNum || 0;
                                    this.loadTexture("playing/jingshan/p_" + piaoNum + ".png");
                                },
                                roundEnd:function(){
                                    this.visible = false;
                                }
                            }
                        }
                    },
                    _event:{
                        MJTing:function(ed){
                            var player = MjClient.playui.getPlayerInfoByName("node_top");
                            if  (player && ed.uid == player.info.uid) {
                                MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_top"));
                            }
                            MjClient.playui.allForbidCards = MjClient.playui.getAllForbidCards();
                        }
                    }
                },
                node_left:{
                    layout_head:{
                        img_gangscore:{
                            _event: {
                                MJGangScore:function(ed){
                                    MjClient.playui.UpdateGangScore(this,ed,"node_left");
                                }
                            }
                        },
                        img_piaoFen:{
                            _run:function(){
                                this.visible = false;
                                var player = MjClient.playui.getPlayerInfoByName("node_left");
                                if (!player) return;
                                MjClient.playui.initChuZiShow(this,player);
                            },
                            _event:{
                                initSceneData:function(){
                                    this.visible = false;
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    if (!player) return;
                                    MjClient.playui.initChuZiShow(this,player);
                                },
                                mjhand:function(){
                                    this.visible = false;
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    if (!player) return;
                                    MjClient.playui.initChuZiShow(this,player);
                                },
                                MJChuzi:function(){
                                    this.visible = false;
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    if (!player) return;
                                    MjClient.playui.initChuZiShow(this,player);
                                },
                                roundEnd:function(){
                                    this.visible = false;
                                }
                            }
                        },
                        img_tingCards: {
                            _layout: [[0.25, 0.12], [0.2, 0.25], [0, 0.1]],
                            _visible: false,
                            _run: function() {
                                this.zIndex = 500;
                                if(MjClient.playui.isIPhoneX())
                                    setWgtLayout(this,[0.25, 0.12], [0.2, 0.25], [0, 0.2]);

                                var originalPosY = this.getPositionY();
                                var originalHeight = this.getContentSize().height;
                                var originalScale = this.getScale();
                                this.setAnchorPoint(cc.p(0,0));
                                this.visible = false;
                                var tingLightBtn = this.getParent().getChildByName("btn_tingLight");
                                this.scale = 1.2;
                                this.y = this.parent.getChildByName("atlas_tuoGuanTime").y - 50;
                                this.x -= 20;
                            },
                            img_tingCard: {
                                _visible: false
                            },
                            _event: {
                                newCard: function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    if(!player.isTing) this.visible = false;
                                },
                                roundEnd: function() {
                                    this.visible = false;
                                },
                                MJTing: function(data){
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    if(data.uid == player.info.uid){
                                        this.setTingCards(data.tingCards);
                                    }
                                },
                                initSceneData:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    var tData = MjClient.data.sData.tData;
                                    if(player && player.tingCards && tData.tState != TableState.roundFinish){
                                        this.setTingCards(player.tingCards);
                                    }
                                }
                            },
                            getTingDesc: function(lastTingNode){
                                var player = MjClient.playui.getPlayerInfoByOff();
                                if(!player.isTing || !lastTingNode){
                                    return;
                                }
                                var descLabel = new cc.LabelTTF("", MjClient.fzcyfont, 25);
                                descLabel.setColor(cc.color(255,220,74));
                                descLabel.setAnchorPoint(0,0.5);
                                descLabel.setPosition(lastTingNode.getContentSize().width ,lastTingNode.getContentSize().height / 2);
                                lastTingNode.addChild(descLabel);
                                return descLabel;
                            },
                            cleanTingCards: function(){
                                var children = this.children;
                                for(var i = 0;i < children.length;i++){
                                    var child = children[i];
                                    if(child && (child.getName() == "tingCard" || child.getName() == "tingAllCards")){
                                        child.removeFromParent(true);
                                    }
                                }
                            },
                            setTingCards: function(tingCard){
                                var keysArray = tingCard;
                                var tingLightBtn = this.getParent().getChildByName("btn_tingLight");
                                
                                if (keysArray.length == 0){
                                    if(tingLightBtn){
                                        tingLightBtn.visible = false;
                                    }
                                    this.visible = false;
                                    return;
                                }

                                this.visible = true;
                                this.cleanTingCards();
                                var img_tingCard = this.getChildByName("img_tingCard");
                                var startPos = img_tingCard.getPosition();
                                var col_max = 17, row = 0, col = 0, row_space = 3;
                                var lastTingNode = null;
                                for(var i = 0;i < keysArray.length;i++){
                                    var card = keysArray[i];
                                    var cardNode = util.clone(img_tingCard);
                                    lastTingNode = cardNode;
                                    cardNode.visible = true;
                                    cardNode.setName("tingCard");
                                    cardNode.setPositionX(img_tingCard.x + col * img_tingCard.width * img_tingCard.scale);
                                    cardNode.setPositionY(img_tingCard.y + row * img_tingCard.height * img_tingCard.scale + row_space * row);
                                    MjClient.playui.setTingCardSprite(cardNode, card);
                                    this.addChild(cardNode);

                                    col++;
                                    row = Math.floor((i + 1) / col_max);
                                    col = col % col_max;
                                }
                                var factMaxCol = row > 0 ? col_max : col;
                                var descLabel = this.getTingDesc(lastTingNode);
                                var layerHeight = img_tingCard.height * (row + 1) + row_space * (row + 2);
                                var layerWidth = img_tingCard.x + img_tingCard.width * (factMaxCol + 2);
                                var addWidth = 0;
                                if (descLabel){
                                    addWidth = row == 0 ? descLabel.width : (descLabel.width > (col_max - factMaxCol) * img_tingCard.width) ? 
                                               descLabel.width : (col_max - factMaxCol) * img_tingCard.width;
                                }
                                ccui.helper.seekWidgetByName(this, "img_tingIcon").setPositionY(layerHeight/2);
                                this.setContentSize(layerWidth + addWidth, layerHeight);
                            }       
                        },
                        img_piao:{
                            _run:function(){
                                this.visible = false;
                                var player = MjClient.playui.getPlayerInfoByName("node_left");
                                if (!player) return;
                                this.visible = true;
                                var piaoNum = player.jiazhuNum || 0;
                                this.loadTexture("playing/jingshan/p_" + piaoNum + ".png");
                            },
                            _event:{
                                initSceneData:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    if (!player) return;
                                    this.visible = true;
                                    var piaoNum = player.jiazhuNum || 0;
                                    this.loadTexture("playing/jingshan/p_" + piaoNum + ".png");
                                },
                                mjhand:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    if (!player) return;
                                    this.visible = true;
                                    var piaoNum = player.jiazhuNum || 0;
                                    this.loadTexture("playing/jingshan/p_" + piaoNum + ".png");
                                },
                                MJJiazhu:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    if (!player) return;
                                    this.visible = true;
                                    var piaoNum = player.jiazhuNum || 0;
                                    this.loadTexture("playing/jingshan/p_" + piaoNum + ".png");
                                },
                                roundEnd:function(){
                                    this.visible = false;
                                }
                            }
                        }
                    },
                    _event:{
                        MJTing:function(ed){
                            var player = MjClient.playui.getPlayerInfoByName("node_left");
                            if  (player && ed.uid == player.info.uid) {
                                MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_left"));
                            }
                            MjClient.playui.allForbidCards = MjClient.playui.getAllForbidCards();
                        }
                    }
                },
                node_right:{
                    layout_head:{
                        img_gangscore:{
                            _event: {
                                MJGangScore:function(ed){
                                    MjClient.playui.UpdateGangScore(this,ed,"node_right");
                                }
                            }
                        },
                        img_piaoFen:{
                            _run:function(){
                                this.visible = false;
                                var player = MjClient.playui.getPlayerInfoByName("node_right");
                                if (!player) return;
                                MjClient.playui.initChuZiShow(this,player);
                            },
                            _event:{
                                initSceneData:function(){
                                    this.visible = false;
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    if (!player) return;
                                    MjClient.playui.initChuZiShow(this,player);
                                },
                                mjhand:function(){
                                    this.visible = false;
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    if (!player) return;
                                    MjClient.playui.initChuZiShow(this,player);
                                },
                                MJChuzi:function(){
                                    this.visible = false;
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    if (!player) return;
                                    MjClient.playui.initChuZiShow(this,player);
                                },
                                roundEnd:function(){
                                    this.visible = false;
                                }
                            }
                        },
                        img_tingCards: {
                            _layout: [[0.25, 0.12], [0.2, 0.25], [0, 0.1]],
                            _visible: false,
                            _run: function() {
                                this.zIndex = 500;
                                if(MjClient.playui.isIPhoneX())
                                    setWgtLayout(this,[0.25, 0.12], [0.2, 0.25], [0, 0.2]);

                                var originalPosY = this.getPositionY();
                                var originalHeight = this.getContentSize().height;
                                var originalScale = this.getScale();
                                this.setAnchorPoint(cc.p(0,0));
                                this.visible = false;
                                var tingLightBtn = this.getParent().getChildByName("btn_tingLight");
                                this.scale = 1.2;
                                this.y = this.parent.getChildByName("img_piaoFen").y + 30;
                            },
                            img_tingCard: {
                                _visible: false
                            },
                            _event: {
                                newCard: function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    if(!player.isTing) this.visible = false;
                                },
                                roundEnd: function() {
                                    this.visible = false;
                                },
                                MJTing: function(data){
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    if(data.uid == player.info.uid){
                                        this.setTingCards(data.tingCards);
                                    }
                                },
                                initSceneData:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    var tData = MjClient.data.sData.tData;
                                    if(player && player.tingCards && tData.tState != TableState.roundFinish){
                                        this.setTingCards(player.tingCards);
                                    }
                                }
                            },
                            getTingDesc: function(lastTingNode){
                                var player = MjClient.playui.getPlayerInfoByOff();
                                if(!player.isTing || !lastTingNode){
                                    return;
                                }
                                var descLabel = new cc.LabelTTF("", MjClient.fzcyfont, 25);
                                descLabel.setColor(cc.color(255,220,74));
                                descLabel.setAnchorPoint(0,0.5);
                                descLabel.setPosition(lastTingNode.getContentSize().width ,lastTingNode.getContentSize().height / 2);
                                lastTingNode.addChild(descLabel);
                                return descLabel;
                            },
                            cleanTingCards: function(){
                                var children = this.children;
                                for(var i = 0;i < children.length;i++){
                                    var child = children[i];
                                    if(child && (child.getName() == "tingCard" || child.getName() == "tingAllCards")){
                                        child.removeFromParent(true);
                                    }
                                }
                            },
                            setTingCards: function(tingCard){
                                var keysArray = tingCard;
                                var tingLightBtn = this.getParent().getChildByName("btn_tingLight");
                                
                                if (keysArray.length == 0){
                                    if(tingLightBtn){
                                        tingLightBtn.visible = false;
                                    }
                                    this.visible = false;
                                    return;
                                }

                                this.visible = true;
                                this.cleanTingCards();
                                var img_tingCard = this.getChildByName("img_tingCard");
                                var startPos = img_tingCard.getPosition();
                                var col_max = 17, row = 0, col = 0, row_space = 3;
                                var lastTingNode = null;
                                for(var i = 0;i < keysArray.length;i++){
                                    var card = keysArray[i];
                                    var cardNode = util.clone(img_tingCard);
                                    lastTingNode = cardNode;
                                    cardNode.visible = true;
                                    cardNode.setName("tingCard");
                                    cardNode.setPositionX(img_tingCard.x + col * img_tingCard.width * img_tingCard.scale);
                                    cardNode.setPositionY(img_tingCard.y + row * img_tingCard.height * img_tingCard.scale + row_space * row);
                                    MjClient.playui.setTingCardSprite(cardNode, card);
                                    this.addChild(cardNode);

                                    col++;
                                    row = Math.floor((i + 1) / col_max);
                                    col = col % col_max;
                                }
                                var factMaxCol = row > 0 ? col_max : col;
                                var descLabel = this.getTingDesc(lastTingNode);
                                var layerHeight = img_tingCard.height * (row + 1) + row_space * (row + 2);
                                var layerWidth = img_tingCard.x + img_tingCard.width * (factMaxCol + 2);
                                var addWidth = 0;
                                if (descLabel){
                                    addWidth = row == 0 ? descLabel.width : (descLabel.width > (col_max - factMaxCol) * img_tingCard.width) ? 
                                               descLabel.width : (col_max - factMaxCol) * img_tingCard.width;
                                }
                                ccui.helper.seekWidgetByName(this, "img_tingIcon").setPositionY(layerHeight/2);
                                this.setContentSize(layerWidth + addWidth, layerHeight);
                                this.x = -this.width;
                            }       
                        },
                        img_piao:{
                            _run:function(){
                                this.visible = false;
                                var player = MjClient.playui.getPlayerInfoByName("node_right");
                                if (!player) return;
                                this.visible = true;
                                var piaoNum = player.jiazhuNum || 0;
                                this.loadTexture("playing/jingshan/p_" + piaoNum + ".png");
                            },
                            _event:{
                                initSceneData:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    if (!player) return;
                                    this.visible = true;
                                    var piaoNum = player.jiazhuNum || 0;
                                    this.loadTexture("playing/jingshan/p_" + piaoNum + ".png");
                                },
                                mjhand:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    if (!player) return;
                                    this.visible = true;
                                    var piaoNum = player.jiazhuNum || 0;
                                    this.loadTexture("playing/jingshan/p_" + piaoNum + ".png");
                                },
                                MJJiazhu:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    if (!player) return;
                                    this.visible = true;
                                    var piaoNum = player.jiazhuNum || 0;
                                    this.loadTexture("playing/jingshan/p_" + piaoNum + ".png");
                                },
                                roundEnd:function(){
                                    this.visible = false;
                                }
                            }
                        }
                    },
                    _event:{
                        MJTing:function(ed){
                            var player = MjClient.playui.getPlayerInfoByName("node_right");
                            if  (player && ed.uid == player.info.uid) {
                                MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_right"));
                            }
                            MjClient.playui.allForbidCards = MjClient.playui.getAllForbidCards();
                        }
                    }
                },
                node_eat:{
                    choose_finish:{
                        _visible: false,
                        _touch:function(sender,type){
                            if (type == 2) {
                                MjClient.playui.anKeCards = [];
                                MjClient.playui.searchAllTingCards();
                                MjClient.playui.updateTingTips();
                                MjClient.playui.updataClickCancelTingBtn();
                                MjClient.playui.updateCardColorAfterTing();
                                this.visible = false;
                                this.parent.getChildByName("liangPaiTip").loadTexture("playing/xiaoGanKaWuXing/wenzi-2.png");
                            }
                        }
                    },
                    liangPaiTip:{
                        _visible: false,
                    },
                    btn_cancel: {
                        _visible: false,
                        _layout: [[0.12, 0.12], [0.8, 0.32], [0, 0], true],
                        _touch: function (sender, type) {
                            if(type === 2){
                                MjClient.playui.clickTing = false;
                                MjClient.playui.anKeCards = [];
                                MjClient.playui.clickAnKe = [];
                                var player = MjClient.playui.getPlayerInfoByName("node_down");
                                player.anKe = [];
                                MjClient.playui.updataClickCancelTingBtn();
                                MjClient.playui.updatePlayerEatBtn();
                                MjClient.playui.updatePlayerCards(MjClient.playui.getNodeByName("node_down"));
                                MjClient.playui.searchAllTingCards();
                                MjClient.playui.updateTingTips();
                                this.parent.getChildByName("liangPaiTip").loadTexture("playing/xiaoGanKaWuXing/wenzi-1.png");
                                var node = MjClient.playui.getNodeByName("node_down");
                                MjClient.playui.refreshCardColor(node)
                            }
                        },
                    },
                }
            }
        },
        ctor: function(){
            var jsonFile = this.jsonFile;
            this._super(majiang_panel_suiZhouKaiWuXing, jsonFile);
            return true;
        },
        initCardTypeName: function(){
            this._super();
            this.HandleCardType["PuCard"] = "puCard";
        },
        initGameData: function(){
            this.clickTing = false;
            this.gangCardArray = [];             //能杠的牌
            this.eatCardArray = [];              //能吃的牌
            this.playTimeUpEff = null;           //倒计时音效
            this.newCardNode  = null;
            this.clickGangPass = false;              //补杠、暗杠是否过杠
            this.clickTingPass = false;              //天听、是否过天听
            this.lastPutCardNode = null;            //上一家出的牌
            this.tingCardsArray = {};               //听牌数据
            this.hasClickBtn = false;               //是否点击操作按钮(补杠、暗杠时，不能点击出牌)
            this.shuffleList = [];                  //码牌的玩家ID列表
            MjClient.lastMJTick = 0;                //上一次的心跳时间
            MjClient.movingCard = null;
            MjClient.selectedCard = null;
            this.anKeCards = [];
            this.clickAnKe = [];
            this.allForbidCards = [];
        },
        // override 是否显示红中癞子牌
        isHunCardShow: function(){
            return false;
        },
        //是否需要飘分
        isNeedPiaoFen:function(){
            return true;
        },
        getPiaoFenParam:function(){
            return {file: "PiaoFen.json", list:[0, 1, 2], cmd:"MJJiazhu", callfunc:function(){}};
        },
        getAllForbidCards: function(){
            this.allForbidCards = [];
            if(MjClient.rePlayVideo != -1) return this.allForbidCards;
            for (var i = 1; i <= 3; i++) {
                var player = this.getPlayerInfoByOff(i);
                if (!player) continue;
                cc.log("player.tingCards ",player.tingCards);
                this.allForbidCards = this.allForbidCards.concat(player.tingCards);
            }
            var player = this.getPlayerInfoByName("node_down");
            var forbidCount = 0;
            for (var i = 0; i < player.mjhand; i++) {
                if (this.allForbidCards.indexOf(player.mjhand[i]) >= 0) {
                    forbidCount ++;
                }
            }
            if (forbidCount == player.mjhand.length) {
                this.allForbidCards = [];
            }
            return this.allForbidCards;
        },
        clickTingBtn: function(){
            var player = this.getPlayerInfoByOff();
            var tData = MjClient.data.sData.tData;
            var downNode = MjClient.playui.getNodeByOff(0);

            this.clickTing = true;
            this.anKeCards = MjClient.majiang.calAnKe(player.mjhand,tData.hunCard);
            this.clickAnKe = [];
            cc.log(" this.anKeCards  ",this.anKeCards);
            MjClient.playui.hideEatNodeChildren();
            var btn_cancel = MjClient.playui.jsBind.node_eat.btn_cancel._node;
            var choose_finish = MjClient.playui.jsBind.node_eat.choose_finish._node;
            var liangPaiTip = MjClient.playui.jsBind.node_eat.liangPaiTip._node;
            liangPaiTip.visible = true;
            choose_finish.visible = this.anKeCards.length > 0;
            btn_cancel.visible = true; //点了听按钮后，要显示取消按钮
            choose_finish.scale = btn_cancel.scale;
            if (this.anKeCards.length <= 0) {
                liangPaiTip.loadTexture("playing/xiaoGanKaWuXing/wenzi-2.png");
            }
            liangPaiTip.scale = liangPaiTip.scale;
            choose_finish.x = btn_cancel.x - choose_finish.width * choose_finish.scale -20;
            choose_finish.y = btn_cancel.y;
            liangPaiTip.x = choose_finish.x - liangPaiTip.width * liangPaiTip.scale -20;
            liangPaiTip.y = btn_cancel.y;

            downNode.getChildByName("img_tingCardsWithNum").visible = false;
            downNode.getChildByName("img_tingCards").visible = false;

            MjClient.playui.updateCardColorAfterTing();
        },
        updateCardColorAfterTing: function(isInitScene){
            this.allForbidCards = this.getAllForbidCards();
            var player = this.getPlayerInfoByOff();
            var playerNode = this.getNodeByOff();
            var color = cc.color(190, 190, 190);
            var standNode = playerNode.getChildByName(this.CsdDefaultCardType.HandCard);
            var children = playerNode.children;
            if(player.isTing){
                for(let i = 0;i < children.length;i++){
                    var cardNode = children[i];
                    if(cardNode.name === this.HandleCardType.Hand){
                        // 修复开杠情况下 牌没有置灰的bug
                        if(this.newCardNode && this.newCardNode == cardNode){
                           continue;
                        }
                        cardNode.isGray = true;
                        cardNode.setColor(color);
                        cardNode.addTouchEventListener(function () {});
                        cardNode.y = standNode.y;
                    }
                }
                return;
            }

            if(!this.isTurnMe() || isInitScene){
                return;
            }

            var unTingCards = [], handCount = 0;
            for(let i = 0;i < children.length;i++){
                var child = children[i];
                var tingSign = child.getChildByName("tingSign");
                if(child.name ===  this.HandleCardType.Hand){
                    handCount++;
                    if (this.anKeCards.length > 0 && this.anKeCards.indexOf(child.tag) < 0) {
                        unTingCards.push(child);
                    }else if(this.anKeCards.indexOf(child.tag) < 0 && this.allForbidCards.indexOf(child.tag) < 0 &&
                        !cc.sys.isObjectValid(tingSign) || (tingSign && !tingSign.visible)){
                        unTingCards.push(child);
                    }
                    child.y = standNode.y;
                    child.setColor(cc.color(255,255,255));
                }
            }
            if(unTingCards.length <= handCount && MjClient.playui.clickTing){
                for(var k = 0;k < unTingCards.length;k++){
                    var cardNode = unTingCards[k];
                    cardNode.setColor(color);
                    //cardNode.addTouchEventListener(function () {});
                    cardNode.setTouchEnabled(false);
                }
            }
            this.refreshCardColor(this);
        },
        //飘分大于上次选择
        PiaoFenMore:function(){
            return false;
        },
        getLaiZiIcon2D: function(){
            var laiZiNode = new ccui.ImageView();
            laiZiNode.setName("laiZi");
            laiZiNode.loadTexture("playing/MJ/gong.png");
            return laiZiNode;
        },
        
        // override 是否显示红中癞子牌
        isHunCardShow3D: function(){
            return true;
        },

        // override 是否开启显示最多听牌标识
        isShowMaxTingCards: function(){
            return true;
        },
        UpdateGangScore: function(node, data, nodeName){
            var sData = MjClient.data.sData;
            if(!sData){
                return;
            }

            var player = MjClient.playui.getPlayerInfoByName(nodeName);
            if(!player){
                return;
            }

            var score = data.scoreArr[player.info.uid + ""];
            cc.log("player.info.uid + ",player.info.uid,"    score",score);
            if(!score || score == 0){
                return;
            }

            node.visible = true;
            
            var iconImg = node;

            player.winall = player.winall || 0;

            var scoreFileName = score > 0 ? "playing/yijiaolaiyou/zi_ying.png" : "playing/yijiaolaiyou/zi_shu.png";
            var str = score > 0 ? "+" + score : score;
            node.setProperty(str, scoreFileName, 32, 43, "+");
            node.ignoreContentAdaptWithSize(true);

            var moveAction = cc.moveBy(0.5, cc.p(0, 10));
            var callFunc = cc.callFunc(function(){
                var headScore = node.parent.getChildByName("atlas_score");
                changeAtalsForLabel(headScore, player.winall);
            });
            var delayAction = cc.delayTime(1.5);
            var endCallFunc = cc.callFunc(function(){
                 node.visible = false;
            });
            var seqAction = cc.sequence(moveAction, callFunc, delayAction, endCallFunc);
            node.runAction(seqAction);
        },
        updataClickCancelTingBtn: function(){
            var player = this.getPlayerInfoByOff();

            if(player.isTing){
                return;
            }

            if(!this.isTurnMe()){
                return;
            }

            var playerNode = this.getNodeByOff();
            var copyNode = playerNode.getChildByName(this.CsdDefaultCardType.HandCard);
            var children = playerNode.children;
            for(var i = 0;i < children.length;i++){
                var cardNode = children[i];
                if(cardNode.name === this.HandleCardType.Hand){
                    var tingSign = cardNode.getChildByName("tingSign");
                    cardNode.setColor(cc.color(255,255,255));
                    cardNode.setTouchEnabled(true);
                }
            }
        },
        checkWhenTouchBegan: function(cardNode){
            if(MjClient.movingCard !== null && MjClient.movingCard != cardNode){
                return true;
            } 
            var handCount = this.getCardNodeCountByName(cardNode.getParent(), this.HandleCardType.Hand);
            if(!(handCount % 3 == 2 && this.isTurnMe() || handCount % 3 == 1 && !this.isTurnMe())){
                return true;
            }
            cc.log(" this.allForbidCards ",this.allForbidCards,cardNode.tag);
            if (this.allForbidCards.indexOf(cardNode.tag) >= 0 && this.anKeCards.indexOf(cardNode.tag) < 0) {
                return true;
            }
            // 自动摸打
            var player = MjClient.playui.getPlayerInfoByName("node_down");
            if (player.tPutCard && this.isTurnMe()) {
                if (!MjClient.Scene.ToastNodeArray || MjClient.Scene.ToastNodeArray.length == 0) {
                    MjClient.showToast("出牌请先取消自动摸打");
                }
                return true;
            }

            return false;
        },
        // @Override  end事件的处理,【拖出去牌过胡提示, 红中打出去需要提示】
        handlerWhenCardTouchEnded: function (cardNode, cardTag) {
            var that = this;
            var player = MjClient.playui.getPlayerInfoByName("node_down");
            var isShow = util.localStorageEncrypt.getBoolItem(this.guoHuTipPopup, true);
            var tData = MjClient.data.sData.tData;
            cc.log(" this.clickTin   ",this.clickTing  + "   " + this.anKeCards);
            if (this.clickTing && this.anKeCards.length > 0) {
                if (this.anKeCards.indexOf(cardTag) >= 0) {
                    this.clickAnKe.push(cardTag);
                    player.anKe = this.clickAnKe;
                    this.updatePlayerCards(this.getNodeByName("node_down"));
                    var cutHand = MjClient.majiang.getMjhandAfterCut(player.mjhand,player);
                    this.anKeCards = MjClient.majiang.calAnKe(cutHand,tData.hunCard);
                    MjClient.movingCard = null;
                    MjClient.playui.searchAllTingCards();
                    MjClient.playui.updateTingTips();
                    this.updateCardColorAfterTing();

                    var choose_finish = MjClient.playui.jsBind.node_eat.choose_finish._node;
                    var liangPaiTip = MjClient.playui.jsBind.node_eat.liangPaiTip._node;

                    choose_finish.visible = this.anKeCards.length > 0;
                    if (this.anKeCards.length <= 0) {
                        liangPaiTip.loadTexture("playing/xiaoGanKaWuXing/wenzi-2.png");
                    }
                }
            }else if(isShow && player && player.eatFlag & 8){
                MjClient.showMsg("确定不胡吗?", function (data) {
                    if(data) util.localStorageEncrypt.setBoolItem(that.guoHuTipPopup, !data.isSelect);
                    that.sendPassToServer();
                    that.putOutCard(cardNode, cardTag);
                }, function (data) {
                    if(data) util.localStorageEncrypt.setBoolItem(that.guoHuTipPopup, !data.isSelect);
                    MjClient.movingCard = null;
                    that.resetCardLayout(that.getNodeByName("node_down"));
                }, "3")
            }else{
                if (player && player.eatFlag & 8) {
                   that.sendPassToServer();
                }
                cc.log("  222 putOutCard ",cardNode,cardTag);
                this.putOutCard(cardNode, cardTag);
            }
        },
        putOutCard: function (cardNode, cardTag, autoput){
            if (MjClient.rePlayVideo != -1 || !this.isTurnMe()){
                return;
            }
            //打出去的是新摸的这张牌
            if(cardNode.isNew){
                this.newCardNode = null;
                cardNode.isNew = false;
            }

            var playerNode = cardNode.getParent();
            var children = playerNode.children;
            var handCount = 0;
            for(var i = 0; i < children.length; i++){
                if(children[i].name == this.HandleCardType.Hand || children[i].name == this.HandleCardType.PuCard){
                    handCount++;
                }
            }

            var player = this.getPlayerInfoByOff();
            if(handCount != player.mjhand.length){
                return;
            }

            //如果已经听牌了，打出去的牌必定是莫的那张
            if(player.isTing){
                this.newCardNode = null;
                cardNode.isNew = false;
            }
            this.sendPutToServer(cardTag);
            //前端先行
            if(!this.isFrontFirst() || autoput === false){
                return;
            }
            this.hideEatNodeChildren();
            
            var startPos = cardNode.getPosition();
            cardNode.removeFromParent(true);

            var copyNode = this.createCard(playerNode, this.CsdDefaultCardType.PutCardOne, this.HandleCardType.Put, cardTag);
            //设置为隐藏是为了可以在显示之前，进行一些其他操作
            copyNode.visible = false;
            //自己出牌时前端先行
            this.putOutSelfFirst(cardTag);
            if(MjClient.rePlayVideo == -1){
                player.isNew = false;
                this.doBeforeAddPutOutCard(copyNode);
                var self = this;
                this.addPutCard(copyNode, function(){
                    if(self.isOpenPutOutCardAnima() && MjClient.playui.getPutCardScaleConfig()){
                        self.playPutOutCardAnima(copyNode,startPos);
                    }else{
                        self.addPutCardTip(copyNode);
                    } 
                }, true);
                if(!player.isTing && !this.clickTing && this.isCanInsertcard() && this.getInsertCardAniConfig()){
                    this.insertCardAnimation();
                }else{
                    this.resetCardLayout(playerNode);
                }

                this.doEndAddPutOutCard(copyNode);
                this.updateColoeAfterSelectCard();
                this.updateCardColorAfterTing();
            }
        },
        sendPutToServer: function(cardTag){
            var sendMsg = {
                cmd: "MJPut",
                card: cardTag,
                tingAfterPut: MjClient.playui.clickTing, //这个后台有检测 by sking
                anKe:MjClient.playui.clickAnKe,
            };
            MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
            this.anKeCards = [];   
        },
        //@Override 获得玩家可操作的按钮
        getPlayerEatNode: function() {
            var sData = MjClient.data.sData;
            var tData = sData.tData;
            var player = sData.players[this.getSelfUid()];
            var eat = MjClient.playui.jsBind.node_eat;
            var nodeArr = [];
            this.gangCardArray = [];

            if(this.isTurnMe()){
                //杠
                if(this.checkGangBtn(player) && !this.clickGangPass){
                    nodeArr.push(eat.btn_gang._node);
                }
                if (this.checkTingBtn(player) && !this.clickTingPass) {
                    nodeArr.push(eat.btn_ting._node);
                }

                //胡
                if (player.eatFlag & 8) {
                    nodeArr.push(eat.btn_hu._node);
                }
            }else{
                if (player.eatFlag & 8) {
                    nodeArr.push(eat.btn_hu._node);
                }

                if (player.eatFlag & 4 ) {
                    nodeArr.push(eat.btn_gang._node);
                    this.gangCardArray.push(tData.lastPutCard);
                }

                if (player.eatFlag & 2) {
                    nodeArr.push(eat.btn_peng._node);
                }
            }

            if(nodeArr.length > 0){
                nodeArr.push(eat.btn_guo._node);

            }

            this.reloadBtnTexture(nodeArr);
            return nodeArr;
        },

        //过杠检测 加入开杠
        clickPass: function(){
            var that = this;
            if (that.checkWhenPass()){
                return;
            }
            var player = that.getPlayerInfoByOff(0);
            if (that.isTurnMe()){
                var msg = "确认过 ";
                if (that.checkGangBtn(player)){
                    msg += "杠 ";
                }
                if (player.eatFlag & 8){
                    msg += "胡 ";
                }
                msg += "吗?";
                MjClient.showMsg(msg, function(){
                    that.showPassHuTips();
                    that.hideEatNodeChildren();
                    that.sendPassToServer();
                    if(that.checkGangBtn(player)){
                        that.clickGangPass = true;
                    }
                    if(that.checkTingBtn(player)){
                        that.clickTingPass = true;
                    }
                }, function() {}, "1");
            }else{
                if(player.eatFlag & 8){
                    MjClient.showMsg("确认不胡吗?", function(){
                        that.showPassHuTips();
                        that.hideEatNodeChildren();
                        that.sendPassToServer();
                    }, function() {}, "1");
                }else{
                    that.hideEatNodeChildren();
                    that.sendPassToServer();
                }
            }
        },
        //@Override 检测杠牌数据
        checkGangBtn: function(player) {
            var tData = MjClient.data.sData.tData;
            this.gangCardArray = [];
            var tempGangCardArray = MjClient.majiang.canGang1(player.mjpeng, player.mjhand, player);
            if(tempGangCardArray.length > 0)
            {
                for (var i = 0; i < tempGangCardArray.length; i ++)
                {
                    //if (player.isNew) { // 补杠
                    this.gangCardArray.push(tempGangCardArray[i]);
                    //}
                }
                if (this.gangCardArray.length > 0) {
                    return true;
                }
            }
            return false;
        },
        //@Override 检测听牌数据
        checkTingBtn: function(player) {
            if (!player.isTing) {
                cc.log("￥￥￥￥听牌监测");
                this.canTingCards = {};
                var tData = MjClient.data.sData.tData;
                if (!this.allForbidCards || this.allForbidCards.length <= 0) {
                    this.allForbidCards = this.getAllForbidCards();
                }

                for (var i = 0; i < player.mjhand.length; i++) {
                    var cardsAfterPut = player.mjhand.slice(0);
                    cardsAfterPut.splice(i,1); //依次去掉某张牌看能不能听
                    if (MjClient.majiang.canTing(cardsAfterPut, tData.hunCard) && this.allForbidCards.indexOf(player.mjhand[i]) < 0) {
                        this.canTingCards[player.mjhand[i]] = 1;
                    }
                }
                cc.log(" this.canTingCards    ",JSON.stringify(this.canTingCards));
                if (Object.keys(this.canTingCards).length > 0) {
                    return true;
                }
                return false;
            }
        },
        // @Override 隐藏吃碰杠等按钮
        hideEatNodeChildren:function() {
            var eatArr = MjClient.playui.jsBind.node_eat;
            for(var key in eatArr){
                if(eatArr[key]._node)
                    eatArr[key]._node.setVisible(false);
            }
        },

        createEndOnePanel: function(){
            return new majiang_winGamePanel_suiZhouKaiWuXing();
        },
        //开启自动摸打
        isCanAutoPut: function(){
            return false;
        },
        getCardNodeByName: function(playerNode, cardName){
            var cardArray = [];
            var children = playerNode.children;
            for(var i = 0;i < children.length;i++){
                var child = children[i];
                if (cardName == this.HandleCardType.Hand) {
                    if(child.getName() == this.HandleCardType.Hand || child.getName() == this.HandleCardType.PuCard){
                        cardArray.push(child);
                    }
                }else{  
                    if(child.getName() == cardName){
                        cardArray.push(child);
                    }
                }
            }
            return cardArray;
        },
        initChuZiShow :function(node,player){
            return node.visible = false;
            var tData = MjClient.data.sData.tData;
            cc.log("tData.tState  ",tData.tState,TableState.roundFinish)
            if (tData.tState == TableState.roundFinish) 
            {
                cc.log("tData.tState   return",tData.tState,TableState.roundFinish)
                node.visible = false;
                return;
            }
            if (player.chuZi && player.chuZi.length > 0) {
                node.visible = true;
                for (var i = 0; i < 3; i++) {
                    var ziType = node.getChildByName("number" + i);
                    ziType.visible = false;
                }
                for (var i = 0; i < player.chuZi.length; i++) {
                    var index = player.chuZi[i] + 1;
                    if ([71,81,91].indexOf(index - 1) >= 0) {
                        index = 10 + [71,81,91].indexOf(index - 1) + 1;
                    }
                    cc.log(" player.chuZi",player.chuZi,index);
                    var ziType = node.getChildByName("number" + i);
                    ziType.loadTexture("playing/xiaoGanKaWuXing/chuzi-" + index +".png");
                    ziType.visible = true;
                }
            }
        },
        refreshCardColor:function(node){
            var children = node.children;
            for(i = 0; i < children.length; i++){
                var child = children[i];
                if(child.name == this.HandleCardType.Hand){
                    if(this.allForbidCards.indexOf(child.tag) >= 0){
                        child.setColor(cc.color(170,170,170));
                    }
                }
            }
        },
        handleRoundEnd: function(){
            var tData = MjClient.data.sData.tData;
            var niaoCards = tData.maPai;
            var self = this;
            if(MjClient.playui.isInGame()) return;
            var showEndCards = function(){
                if(niaoCards && niaoCards.length > 0){
                    MjClient.Scene.addChild(self.getShowBirdView(niaoCards)); 
                }else {
                    self.showBalanceLayer();
                }
            };

            var action = cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                self.showMjhandBeforeEndOne();
            }),cc.delayTime(0.5),cc.callFunc(showEndCards));
            action.setTag(1179);
            self.runAction(action);

            UIEventBind(null, this, "initSceneData", function(){
                self.stopActionByTag(1179);
            });
            UIEventBind(null, this, "LeaveGame", function(){
                self.stopActionByTag(1179); 
            });
        },
    });
}());