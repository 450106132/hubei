/***
 * 湘阴推倒胡，新框架牌桌逻辑
 * @type {void | Class | *}
 */

var majiang_panel_jingshan;
(function () {
    majiang_panel_jingshan = majiang_panel_hubei.extend({
        jsonFile: "Play_jingshan.json",
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
                        atlas_score:{
                            _event:{
                                initSceneData:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    if (!player) return;
                                    cc.log(" player.gangScore ",player.gangScore);
                                    changeAtalsForLabel(this, player.gangScore + player.winall);
                                },
                                mjhand:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_down");
                                    if (!player) return;
                                    cc.log(" player.gangScore ",player.gangScore);
                                    changeAtalsForLabel(this, player.gangScore + player.winall);
                                }
                            }
                        },
                        img_piaoFen:{
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
                            if (MjClient.playui.isNeedPiaoFen()) {
                                var param = MjClient.playui.getPiaoFenParam();
                                var _jiazhuLayer = new majiang_piaoFen(param);
                                _jiazhuLayer.setName("JiaZhuLayer");
                                MjClient.playui.addChild(_jiazhuLayer);
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
                            MjClient.playui.updatePlayerEatBtn();
                            //听牌
                            MjClient.playui.searchAllTingCards();
                            postEvent(MjClient.playui.PlayEventType.SHOW_TING_CARDS);
                            MjClient.playui.updateTingTips();

                            MjClient.playui.cutDownCardsBeforEndOneWhen23D(this);

                            var tData = MjClient.data.sData.tData;
                            if (tData.tState == TableState.waitJiazhu) {
                                if (player.mjState == TableState.waitJiazhu) {
                                    if (MjClient.playui.isNeedPiaoFen()) {
                                        var param = MjClient.playui.getPiaoFenParam();
                                        var _jiazhuLayer = new majiang_piaoFen(param);
                                        _jiazhuLayer.setName("JiaZhuLayer");
                                        MjClient.playui.addChild(_jiazhuLayer);
                                    }
                                }
                            }
                        }
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
                        atlas_score:{
                            _event:{
                                initSceneData:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    if (!player) return;
                                    changeAtalsForLabel(this, player.gangScore + player.winall);
                                },
                                mjhand:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_top");
                                    if (!player) return;
                                    cc.log(" player.gangScore ",player.gangScore);
                                    changeAtalsForLabel(this, player.gangScore + player.winall);
                                }
                            }
                        },
                        img_piaoFen:{
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
                        atlas_score:{
                            _event:{
                                initSceneData:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    if (!player) return;
                                    changeAtalsForLabel(this, player.gangScore + player.winall);
                                },
                                mjhand:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_left");
                                    if (!player) return;
                                    cc.log(" player.gangScore ",player.gangScore);
                                    changeAtalsForLabel(this, player.gangScore + player.winall);
                                }
                            }
                        },
                        img_piaoFen:{
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
                        atlas_score:{
                            _event:{
                                initSceneData:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    if (!player) return;
                                    changeAtalsForLabel(this, player.gangScore + player.winall);
                                },
                                mjhand:function(){
                                    var player = MjClient.playui.getPlayerInfoByName("node_right");
                                    if (!player) return;
                                    cc.log(" player.gangScore ",player.gangScore);
                                    changeAtalsForLabel(this, player.gangScore + player.winall);
                                }
                            }
                        },
                        img_piaoFen:{
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
                    }
                },
                layout_roundInfo2D:{
                    img_cardNum:{
                        ani_card:{
                            _event:{
                                mjhand:function(){
                                    MjClient.playui.UpdateCardNum(this)
                                }
                            }
                        }
                    }
                },
                layout_roundInfo3D:{
                    image_cardNumBg:{
                        ani_card:{
                            _event:{
                                mjhand:function(){
                                    MjClient.playui.UpdateCardNum(this)
                                }
                            }
                        }
                    }
                },
                img_gameover:{
                    _visible:false,
                    _layout:[[1, 1], [0.5, 0.5], [0, 0]],
                }
            }
        },
        ctor: function(){
            var jsonFile = this.jsonFile;
            this._super(majiang_panel_jingshan, jsonFile);
            this.bindShowInfo();
            return true;
        },
        // override 是否显示红中癞子牌
        isHunCardShow: function(){
            return true;
        },
        //是否需要飘分
        isNeedPiaoFen:function(){
            return true;
        },
        getPiaoFenParam:function(){
            return {file: "PiaoFen.json", list:[0, 1, 2, 3], cmd:"MJJiazhu", callfunc:function(){}};
        },
        //飘分大于上次选择
        PiaoFenMore:function(){
            return true;
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
        // 绑定头像下部飘分
        bindShowInfo: function(){
            for(var i = 0; i < this.NodeNameArray.length; i++){
                var nodeName = this.NodeNameArray[i];
                this.handelTextPiao(nodeName);
            }
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
                changeAtalsForLabel(headScore, player.gangScore + player.winall);
            });
            var delayAction = cc.delayTime(1.5);
            var endCallFunc = cc.callFunc(function(){
                 node.visible = false;
            });
            var seqAction = cc.sequence(moveAction, callFunc, delayAction, endCallFunc);
            node.runAction(seqAction);
        },
        UpdateCardNum:function(node){
            var tData = MjClient.data.sData.tData;
            var score = tData.randomPoint * 2;
            var scoreFileName = "playing/yijiaolaiyou/zi_ying.png" ;
            var str =  "-" + score ;
            node.setProperty(str, scoreFileName, 32, 43, "+");
            node.ignoreContentAdaptWithSize(true);

            var moveAction = cc.moveBy(0.5, cc.p(0, 10));
            var callFunc = cc.callFunc(function(){
                var headScore = node.parent.getChildByName("text_cardNum");
                cc.log(" MjClient.majiang.getAllCardsTotal(tData)   ",MjClient.majiang.getAllCardsTotal(tData),tData.cardNext);
                headScore.setString(MjClient.majiang.getAllCardsTotal(tData) - tData.cardNext - 1);
            });
            var delayAction = cc.delayTime(1.5);
            var endCallFunc = cc.callFunc(function(){
                 node.visible = false;
            });
            var seqAction = cc.sequence(moveAction, callFunc, delayAction, endCallFunc);
            node.runAction(seqAction);
        },
        // 处理点飘显示
        handelTextPiao: function (nodeName) {

            var playerNode = MjClient.playui.getNodeByName(nodeName);

            var showTextPiao = function (textNode, needAnim) {
                var tData = MjClient.data.sData.tData;
                var player = MjClient.playui.getPlayerInfoByName(nodeName);
                var string;
                if(!tData || !player || tData.tState === TableState.waitJiazhu || player.jiazhuNum === undefined || player.jiazhuNum <= 0){
                    return textNode.visible = false;
                }

                textNode.visible = true;
                if(tData.areaSelectMode.piaoniao){
                    string = "鸟" + player.jiazhuNum + "分";
                }else{
                    string = "飘" + player.jiazhuNum + "分";
                }
                textNode.ignoreContentAdaptWithSize(true);
                textNode.setString(string);

                var palyerNode = textNode.getParent().getParent();
                if(cc.sys.isObjectValid(palyerNode) && needAnim){
                    var endPos = textNode.getPosition();    
                    var anim = palyerNode.getChildByName("node_animation");
                    var worldPos = anim.convertToWorldSpace(palyerNode.getPosition());
                    var startPos = textNode.convertToNodeSpace(worldPos);
                    textNode.setPosition(startPos);
                    textNode.runAction(cc.sequence(
                        cc.fadeIn(0.01),
                        cc.scaleTo(0.01, 2),
                        cc.delayTime(2),
                        cc.spawn(
                            cc.moveTo(0.3, endPos),
                            cc.scaleTo(0.3, 1)
                        )
                    ));
                }
            };

            var jsBind = {
                layout_head:{
                    text_piao:{
                        _visible: false,
                        _event:{
                            clearCardUI: function() {
                                this.visible = false;
                            },
                            mjhand: function () {
                                showTextPiao(this, true);
                            },
                            initSceneData: function () {
                                showTextPiao(this);
                            }
                        }
                    }
                }
            };
            util.bindUiAndLogicMajiang(playerNode, jsBind);
        },
        // @Override  end事件的处理,【拖出去牌过胡提示, 红中打出去需要提示】
        handlerWhenCardTouchEnded: function (cardNode, cardTag) {
            var that = this;
            var player = MjClient.playui.getPlayerInfoByName("node_down");
            var isShow = util.localStorageEncrypt.getBoolItem(this.guoHuTipPopup, true);
            if(isShow && player && player.eatFlag & 8){
                MjClient.showMsg("确定不胡吗?", function (data) {
                    if(data) util.localStorageEncrypt.setBoolItem(that.guoHuTipPopup, !data.isSelect);
                    that.sendPassToServer();
                    that.putOutCard(cardNode, cardTag);
                }, function (data) {
                    if(data) util.localStorageEncrypt.setBoolItem(that.guoHuTipPopup, !data.isSelect);
                    MjClient.movingCard = null;
                    that.resetCardLayout(that.getNodeByName("node_down"));
                }, "3");

            }/*else if(this.isHunCard(cardNode.tag)){

                MjClient.showMsg("确定要打出红中吗? ", function () {
                    that.putOutCard(cardNode, cardTag);
                }, function () {
                    MjClient.movingCard = null;
                    that.resetCardLayout(that.getNodeByName("node_down"));
                }, "1");

            }*/else{
                if (player && player.eatFlag & 8) {
                   that.sendPassToServer();
                }
                this.putOutCard(cardNode, cardTag);
            }
        },


        //@Override 获得玩家可操作的按钮
        getPlayerEatNode: function() {
            var sData = MjClient.data.sData;
            var tData = sData.tData;
            var player = sData.players[this.getSelfUid()];
            var eat = MjClient.playui.jsBind.node_eat;
            var nodeArr = [];

            if(this.isTurnMe()){
                //杠
                if(this.checkGangBtn(player) && !this.clickGangPass){
                    nodeArr.push(eat.btn_gang._node);
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
                    if (!player.isTing) {
                        nodeArr.push(eat.btn_gang._node);
                        this.gangCardArray.push(tData.lastPutCard);
                    }
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
            var tempGangCardArray = MjClient.majiang.canGang1(player.mjpeng, player.mjhand, player.skipGang);
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
        // @Override 隐藏吃碰杠等按钮
        hideEatNodeChildren:function() {
            var eatArr = MjClient.playui.jsBind.node_eat;
            for(var key in eatArr){
                if(eatArr[key]._node)
                    eatArr[key]._node.setVisible(false);
            }
        },

        createEndOnePanel: function(){
            return new majiang_winGamePanel_jingshan();
        },
        createGameOverPanel: function(){
            return new majiang_gameOver_jingshan();
        },
        //开启自动摸打
        isCanAutoPut: function(){
            return false;
        },
        showBalanceLayer:function(){
            var tData = MjClient.data.sData.tData;
            var self = this;
            if (tData.roundNum <= 0){
                if(!tData.matchId){
                    self.addChild(self.createGameOverPanel());
                }else{
                    self.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){
                        self.addChild(self.createGameOverPanel());
                    })));
                }
            }
            if (tData.winner === -1) {
                var ani_Node = MjClient.playui.jsBind.img_gameover._node;
                ani_Node.visible = true;
                ani_Node.x += 600;
                ani_Node.runAction(cc.sequence(
                    cc.moveBy(0.5,cc.p(-600,0)),cc.delayTime(0.5),cc.callFunc(function(){
                        self.addChild(self.createEndOnePanel());
                        ani_Node.visible = false;
                    })));
            }else{
                self.addChild(self.createEndOnePanel());
            }
        }
    });
}());