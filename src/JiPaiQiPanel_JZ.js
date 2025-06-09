var JiPaiQiPanel_JZ = cc.Layer.extend({
    jsBind:{
        banner: {
            _run: function() {
                setWgtLayout(this, [0.27, 0.3], [0.5, 0.98], [0, 0]);
            },
            titlebg: {
                _run: function() {
                    this.visible = false;
                },
            },
            jipai_btn: {
                _run: function() {
                    this.visible = true;
                },
                _click: function() {

                    if (MjClient.playui.jiPaiQiPanel.isJiPaiQiShowing()) {
                        postEvent("jiPaiQiOperation",false);
                    } else if (MjClient.playui.jiPaiQiPanel.isUsingJiPaiQi()) {
                        postEvent("jiPaiQiOperation",true);
                    } else {
                        var useJipaiqi = function () {
                            cc.log("this is in useJipaiqi");

                            // 使用记牌器
                            MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd: "useJipaiqi"}, 
                                function(rtn) {
                                    if (rtn.code == 0) {
                                        // postEvent("jiPaiQiOperation",true);
                                    } else if (rtn.message) {
                                        MjClient.showToast(rtn.message);
                                    }
                                }
                            );
                        }
                        if (MjClient.data.pinfo.jipaiqi1 > 0 || MjClient.data.pinfo.jipaiqi2 > 0) {
                            // 直接使用
                            useJipaiqi();
                        } else {
                            // 先购买
                            MjClient.gamenet.request("pkplayer.handler.getRechargeLadder", {type: "jipaiqi"}, 
                                function(rtn) {
                                    if (rtn.code == 0) {
                                        var validCommoditys = MjClient.playui.jiPaiQiPanel.checkJiPaiQiListValid(rtn.data);

                                        if (MjClient.playui.jiPaiQiPanel)
                                            MjClient.playui.jiPaiQiPanel.showJiPaiQiBuyingPanel(validCommoditys,useJipaiqi)
                                        else
                                            MjClient.showToast("无可用记牌器");
                                    } else if (rtn.message) {
                                        MjClient.showToast(rtn.message);
                                    }
                                }
                            );
                        }
                    }
                },
                _event:{
                    mjhand: function() {
                        //MjClient.playui.jiPaiQiPanel.setJiPaiQiEnabled(this);

                        if (MjClient.playui.jiPaiQiPanel.isUsingJiPaiQi() || 
                            MjClient.data.pinfo.jipaiqi1 > 0 || 
                            MjClient.data.pinfo.jipaiqi2 > 0)
                            this.visible = true;
                        else {
                            this.visible = false;

                            // 根据是否配置了记牌器商品显隐记牌器按钮
                            MjClient.gamenet.request("pkplayer.handler.getRechargeLadder", {type: "jipaiqi"}, 
                                function(rtn) {
                                    this.visible = (rtn.code == 0 && MjClient.playui.jiPaiQiPanel.checkJiPaiQiListValid(rtn.data));
                                }.bind(this)
                            );
                        }
                    },
                    // waitPut: function() {
                    //     MjClient.playui.jiPaiQiPanel.setJiPaiQiEnabled(this);
                    // },
                    initSceneData: function()
                    {
                        if (MjClient.playui.jiPaiQiPanel.isUsingJiPaiQi() || 
                            MjClient.data.pinfo.jipaiqi1 > 0 || 
                            MjClient.data.pinfo.jipaiqi2 > 0)
                            this.visible = true;
                        else {
                            this.visible = false;

                            // 根据是否配置了记牌器商品显隐记牌器按钮
                            MjClient.gamenet.request("pkplayer.handler.getRechargeLadder", {type: "jipaiqi"}, 
                                function(rtn) {
                                    this.visible = (rtn.code == 0 && MjClient.playui.jiPaiQiPanel.checkJiPaiQiListValid(rtn.data));
                                }.bind(this)
                            );
                        }
                    },
                    // PostCardsEnded: function()
                    // {
                    //     MjClient.playui.jiPaiQiPanel.setJiPaiQiEnabled(this);
                    // }
                },
                jiPaiQiNum: {
                    _run: function() {
                        MjClient.playui.jiPaiQiPanel.setJiPaiQiNum(this);
                    },
                    _event: {
                        updateInfo: function() {
                            MjClient.playui.jiPaiQiPanel.setJiPaiQiNum(this);
                        }
                    }
                }
            },
        },

        jiPaiQiBg:{
            _run: function() {
                setWgtLayout(this, [this.width/1280, this.height/720], [0.5, 1.0], [0, 0.5]);
            },
            _event:{
                diCards: function(msg) {
                    if (!MjClient.playui.jiPaiQiPanel.isUsingJiPaiQi())
                        return;
                    
                    // 如果底牌在自己手上  去除底牌
                    if(msg.zhuang == getPlayerIndex(0)){
                        for (var j = 0; j < msg.diCards.length; j++) {
                            MjClient.playui.jiPaiQiPanel.cardsFormated[MjClient.majiang.calPoint(msg.diCards[j])]--;
                        }
                        MjClient.playui.jiPaiQiPanel.updateJiPaiQi(this);
                    }
                },
                PKPut: function(msg) {
                    if (msg.uid == SelfUid())
                        return;

                    if (!MjClient.playui.jiPaiQiPanel.isUsingJiPaiQi())
                        return;
                    
                    // 去除本次打出的牌
                    for (var i = 0; i < msg.card.length; i++) {
                        MjClient.playui.jiPaiQiPanel.cardsFormated[MjClient.majiang.calPoint(msg.card[i])]--;
                    }

                    MjClient.playui.jiPaiQiPanel.updateJiPaiQi(this);
                },
                roundEnd: function() {
                    MjClient.playui.jiPaiQiPanel.showOrHideJiPaiQi(this,false);
                },
                initSceneData: function(msg) {
                    if (!MjClient.playui.jiPaiQiPanel.isUsingJiPaiQi())
                        return;
                    MjClient.playui.jiPaiQiPanel.originCards = msg.leftCards;
                    MjClient.playui.jiPaiQiPanel.formatCards();

                    var selfPlayer = getUIPlayer(0);

                    // 去除己方手牌
                    for (var i = 0; i < selfPlayer.mjhand.length; i++) {
                        MjClient.playui.jiPaiQiPanel.cardsFormated[MjClient.majiang.calPoint(selfPlayer.mjhand[i])]--;
                    }

                    MjClient.playui.jiPaiQiPanel.updateJiPaiQi(this);

                    if (MjClient.data.sData.tData.tState == TableState.roundFinish) {
                        MjClient.playui.jiPaiQiPanel.showOrHideJiPaiQi(this,false);
                    }
                },
                initJiPaiQi: function(msg) {
                    MjClient.playui.jiPaiQiPanel.originCards = msg.leftCards;
                    MjClient.playui.jiPaiQiPanel.formatCards();

                    // 在位置未定的情况下这样查找己方较为准确
                    var sData = MjClient.data.sData;
                    var players = sData.players;
                    var selfPlayer = null;
                    for (var uid in players) {
                        if (SelfUid() == uid)
                        {
                            selfPlayer = players[uid];
                            break;
                        }
                    }

                    // 去除己方手牌
                    for (var i = 0; i < selfPlayer.mjhand.length; i++) {
                        MjClient.playui.jiPaiQiPanel.cardsFormated[MjClient.majiang.calPoint(selfPlayer.mjhand[i])]--;
                    }

                    MjClient.playui.jiPaiQiPanel.updateJiPaiQi(this);
                    MjClient.playui.jiPaiQiPanel.showOrHideJiPaiQi(this,true);
                },
                jiPaiQiOperation: function(bShow) {
                    MjClient.playui.jiPaiQiPanel.showOrHideJiPaiQi(this,bShow);
                }
            }
        }
    },
    ctor: function () {
        this._super();
        var panelUi = ccs.load("JiPaiQiPanel.json");
        MjClient.playui.jiPaiQiPanel = this;
        BindUiAndLogic(panelUi.node,this.jsBind);
        this.addChild(panelUi.node);
    },
    formatCards: function() {
        this.cardsFormated = {};
        var keys = [54,53,15,14,13,12,11,10,9,8,7,6,5,4,3];
        var cardsCount = keys.length;

        for (var i = 0; i < cardsCount; i++) {
            this.cardsFormated[keys[i]] = 0;
        }

        cardsCount = this.originCards.length;
        for (var i = 0; i < cardsCount; i++) {
            this.cardsFormated[MjClient.majiang.calPoint(this.originCards[i])]++;
        }
    },
    updateJiPaiQi: function(jiPaiQiBg) {
        //var textColors = [cc.color(221,86,31),cc.color(151,151,151)];
        for (var key in this.cardsFormated) {
            var cardCount = this.cardsFormated[key];
            var textNode = jiPaiQiBg.getChildByName(parseInt(key));

            if (!textNode)
                continue;

            textNode.setString(cardCount);
            //textNode.setColor(cardCount > 0 ? textColors[0] : textColors[1]);
        }
    },
    showOrHideJiPaiQi: function(jiPaiQiBg,bShow) {
        this.jiPaiQiShowing = bShow;

        jiPaiQiBg.stopAllActions();

        if (bShow)
            jiPaiQiBg.runAction(cc.sequence(cc.moveTo(0.3, MjClient.size.width/2, MjClient.size.height - (jiPaiQiBg.getContentSize().height/2 + 10) * jiPaiQiBg.getScale()).easing(cc.easeSineOut())));
        else
            jiPaiQiBg.runAction(cc.sequence(cc.moveTo(0.3, MjClient.size.width/2, MjClient.size.height + jiPaiQiBg.getContentSize().height * jiPaiQiBg.getScale() / 2).easing(cc.easeSineIn())));
    },
    isJiPaiQiShowing: function() {
        return this.jiPaiQiShowing;
    },
    isUsingJiPaiQi: function(){
        var jipaiqi = MjClient.data.sData.tData.jipaiqi;
        return jipaiqi && jipaiqi.indexOf(SelfUid()) >= 0;
    },
    checkJiPaiQiListValid: function(commoditys) {
        if (!commoditys || commoditys.length <= 0)
            return null;

        var validCommoditys = [];
        for (var i = 0; i < commoditys.length; i++) {
            if (commoditys[i].money && commoditys[i].money > 0)
                validCommoditys.push(commoditys[i]);
        }

        if (validCommoditys[0])
            return validCommoditys;
        else
            return null;
    },
    setJiPaiQiNum: function(node) {
        if (MjClient.data.pinfo.jipaiqi2 > 0)
            node.setString(MjClient.data.pinfo.jipaiqi2 + "天");
        else if (MjClient.data.pinfo.jipaiqi1 > 0)
            node.setString(MjClient.data.pinfo.jipaiqi1 + "个");
        else
            node.setString("0个");
    },
    // setJiPaiQiEnabled: function(node) {
    //     var tData = MjClient.data.sData.tData;
    //     var enabled = true;
    //     // enabled = tData.tState != TableState.waitJoin && 
    //     //     tData.tState != TableState.roundFinish && 
    //     //     tData.tState != TableState.waitReady && 
    //     //     tData.tState != TableState.waitCard;

    //     node.setBright(enabled);
    //     node.setTouchEnabled(enabled);
    // },
    showJiPaiQiBuyingPanel: function(commoditys,purchaseCallback) {
        var buyingPanel = null;
        var JiPaiQiBuyingPanel = cc.Layer.extend({
            jsBind:{
                block:{
                    _event:{
                        roundEnd:function(){
                            buyingPanel.removeFromParent();
                        },
                        initSceneData: function(){
                            buyingPanel.removeFromParent();
                        }
                    }
                }
            },
            ctor: function () {
                this._super();

                var panelUi = ccs.load("JiPaiQiBuyingPanel.json");
                BindUiAndLogic(panelUi.node,this.jsBind);
                this.addChild(panelUi.node);

                var _block = panelUi.node.getChildByName("block");
                setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

                var _back = panelUi.node.getChildByName("back");
                setWgtLayout(_back,[0.64,0.78],[0.5,0.5],[0,0]);

                var btn_close = _back.getChildByName("btn_close");
                btn_close.addTouchEventListener(function(sender,type){
                    switch (type)
                    {
                        case ccui.Widget.TOUCH_ENDED:
                            this.removeFromParent();
                            break;
                        default :
                            break;
                    }
                },this);

                var confirmCallBack = function(commodityID) {
                    // 发送购买消息

                    //MjClient.block();

                    MjClient.gamenet.request("pkplayer.handler.purchaseCardHolder", {id: commodityID}, 
                        function(rtn) {
                            //MjClient.unblock();
                            if(!sys.isObjectValid(buyingPanel)){
                                return;
                            }

                            if (rtn.code == 0) {
                                buyingPanel.removeFromParent();

                                purchaseCallback();
                            } else if (rtn.message) {
                                cc.log("rtn.message rtn.message = " + rtn.message);
                                MjClient.showToast(rtn.message);
                            }
                        }
                    );
                }

                var itemList = _back.getChildByName("itemList");
                var firstItem = itemList.getChildByName("item");
                var commoditysCount = commoditys.length;
                for (var i = 0; i < commoditysCount; i++) {
                    var item = i == 0 ? firstItem : firstItem.clone();
                    if (i != 0)
                        itemList.insertCustomItem(item, i);
                    this.itemsBind(item, commoditys[i], confirmCallBack);
                }
            },
            itemsBind: function(item, commodity, confirmCallBack) {
                var bind = {
                    btnBuy: {
                        _click: function() {
                            if (MjClient.data.pinfo.gold < commodity.lowerLimit) {
                                MjClient.showToast("金币大于" + commodity.lowerLimit + "才可购买");
                                return;
                            }

                            if (MjClient.data.pinfo.gold < commodity.amount) {
                                MjClient.showToast("金币不足");
                                return;
                            }

                            var content;
                            if (commodity.os == "jipaiqi1")
                                content = "确定使用" + commodity.amount + "金币购买记牌器" + commodity.money + "个吗？"
                            else
                                content = "确定使用" + commodity.amount + "金币购买记牌器" + commodity.money + "天吗？"
                           
                            MjClient.showMsg(content, function () {
                                confirmCallBack(commodity.id);
                            }, function(){}, 1);
                        }
                    }
                }

                BindUiAndLogic(item, bind);

                cc.log("commodity commodity " + JSON.stringify(commodity));

                item.getChildByName("costLabel").setString(getJinbiStrEx(commodity.amount));
                item.getChildByName("itemTitle").setString(commodity.title);
            },
        });

        var buyingPanel = new JiPaiQiBuyingPanel();
        MjClient.playui.addChild(buyingPanel,500);
    },
});