/***
 * 湖北App，通用小结算文件   对应endOne_maJiang.json
 * @type {void | Class | *}
 */
var majiang_winGamePanel_hubei = majiang_winGamePanel.extend({

    jsBind:{},

    ctor: function(jsonFile){
        this._super(jsonFile);
    },


    // override  获取小结算中单个玩家的牌型描述
    getCardTypeDesc: function(pl, sData){
        var tData=sData.tData;
        if (MjClient.isDismiss && !sData.players[tData.firstDel] && pl.mjdesc[1]) // 会长或管理员解散房间
            return pl.mjdesc[1];
        return this._super(pl,sData);
    },

    // override 设置单个玩家面板数据
    setEndOneUserUI: function (infoImg, off) {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var pl = MjClient.playui.getPlayerWithIndex(off);
        if(!pl)return;

        infoImg.setVisible(true);
        infoImg = infoImg.getChildByName("layout_infoData");
         
        var img_zhuang = infoImg.getChildByName("img_zhuang");
        var zhuangIndex = (typeof MjClient.preZhuang != 'undefined') ? MjClient.preZhuang : tData.zhuang;
        img_zhuang.setVisible(tData.uids[zhuangIndex] == pl.info.uid);
        img_zhuang.zIndex=10;

        var uibind= {
            layout_infoData: {
                text_name: {
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                        this.setFontName("Arial");
                        this.setFontSize(this.getFontSize());
                        MjClient.endoneui.setUserNameAndIdColor(this, pl);
                    },
                    _text: function () {
                        var nameStr = unescape(pl.info.nickname ) + "";
                        return MjClient.playui.formatUserName(nameStr, 7, true);
                    }
                },
                text_id: {
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                        MjClient.endoneui.setUserNameAndIdColor(this, pl);
                    },
                    _text: function () {
                        return "ID:" + pl.info.uid.toString();
                    }
                },
                img_eatFrontCard: {_visible: false},
                img_eatBackCard: {_visible: false},
                img_handCard: {_visible: false},
                text_cardType: {
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                        MjClient.endoneui.setUserCardTypeDescColor(this, pl);
                    },
                    _text: function () {
                        return MjClient.endoneui.getCardTypeDesc(pl,sData);
                    },
                },
                img_tingIcon:{
                    _run: function(){
                        this.visible = false;
                        MjClient.endoneui.showTingIcon(pl,this);
                    }
                },
                text_winNum: {
                    _run:function(){
                        var str = pl.winone > 0 ? ("+" + pl.winone) : ("" + pl.winone);
                        var textUrl = pl.winone > 0 ? "common/zi_ying.png" : "common/zi_shu.png";
                        this.ignoreContentAdaptWithSize(true);
                        this.setString(str);
                        // 根据胜负分更换小结算得分切图
                        this.getVirtualRenderer().setCharMap(textUrl, 32, 43, "+".charCodeAt(0));
                    }
                },
                img_huType: {
                    _run: function () {
                        MjClient.endoneui.setGameOverPanelPlayerState(this, pl, true);
                    }
                },
                img_piao: {
                    _visible: false,
                    _run: function () {
                        MjClient.endoneui.setPiaoFenIcon(this, pl);
                    }
                }
            }
        };

        BindUiAndLogic(infoImg.parent, uibind);
        this.addWxHeadToEndUI(infoImg.getChildByName("img_head"), off);
        this.showHandCard(pl, infoImg);
        MjClient.playui.setUserOfflineInWinGame(infoImg.getChildByName("img_head"), pl);
    },

    // 没有鸟牌展示的时候，将底牌位置调整到鸟牌位置
    adjustFinalCardPosition: function (back, birdsNode) {
        var dipaiText = back.getChildByName("text_diPai");
        dipaiText.setPosition(birdsNode.getPosition());
        birdsNode.setVisible(false);
    },

    // @Override 展示底牌结构调整
    showFinalCard: function (back) {
        var dipaiText = back.getChildByName("text_diPai");
        var cardItem = dipaiText.getChildByName("img_eatFrontCard");
        var finalView = dipaiText.getChildByName("listiew_finalView");
        cardItem.setVisible(false);

        var dipaiCard = MjClient.data.sData.cards;
        if (dipaiCard) {
            var cardSize = cc.size(cardItem.width * cardItem.scale, cardItem.height * cardItem.scale );
            var backLayout = new ccui.Layout();
            backLayout.setContentSize(cc.size(cardSize.width * dipaiCard.length,cardSize.height));
            finalView.pushBackCustomItem(backLayout);

            for (var i = 0; i < dipaiCard.length; i ++) {
                var cardNode = MjClient.playui.createCard(dipaiText, MjClient.playui.CsdDefaultCardType.EatCardFront,
                    MjClient.playui.HandleCardType.Chi, dipaiCard[i], true);
                cardNode.removeFromParent();
                cardNode.visible = true;
                cardNode.x = (cardSize.width /2) + i * cardSize.width;
                cardNode.y = backLayout.height /2;
                backLayout.addChild(cardNode);
                if(cardNode.getChildByName("laiZi")) cardNode.getChildByName("laiZi").setPosition(cc.p(cardNode.width * 0.5, cardNode.height * 0.65));
            }
            finalView.forceDoLayout();
        }
    },


    //override 小结算显示捉鸟内容【湖北统一增加listview存放鸟牌】
    showAddBird : function (back, tData) {
        var img_bridTips = back.getChildByName("img_bridTips");
        if(!img_bridTips) return
        var listViewBirds = img_bridTips.getChildByName("listview_niao");
        var cards = tData.mopai ? tData.mopai : tData.showFanJiCards;
        if(!cards) return this.adjustFinalCardPosition(back, img_bridTips);
        var cardnode = img_bridTips.getChildByName(MjClient.playui.CsdDefaultCardType["EatCardFront"]);
        var countNode = img_bridTips.getChildByName("text_count");
        cardnode.visible = false;
        var slotwith = cardnode.width * cardnode.scale * 0.9;
        var zhongCount = 0, posX;
        cards = cards || {};
        for(var i = 0; i < cards.length; i++) {
            var cloneCard = util.clone(cardnode);
            cloneCard.setName(MjClient.playui.HandleCardType["Chi"]);
            cloneCard.visible = true;
            listViewBirds.pushBackCustomItem(cloneCard);
            MjClient.playui.setCardSprite(cloneCard, cards[i], true);
            if (this.isZhongNiao(cards[i])) {
                zhongCount++;
            }else{
                cloneCard.setColor(cc.color(170,170,170));
            }

            if(i === cards.length - 1){
                posX = cardnode.x + slotwith * (i + 1);
            }
        }

        if(zhongCount === 0){
            countNode.setVisible(false);
        }else{
            listViewBirds.refreshView();
            countNode.setPositionX(posX);
            countNode.setString("+" + zhongCount);
        }
    },

    // @Override 点击准备, 不重置 jiazhuNum 数据
    btnReadyEvent: function(){
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        for(var i = 0; i < tData.maxPlayer;i++){
            var pl = MjClient.playui.getPlayerWithIndex(i);
            if (!pl)
                continue;
            if (pl.mjflower)
                pl.mjflower = [];
        }
        postEvent("clearCardUI");
        postEvent("showAllCardNum");
        MjClient.endoneui.removeFromParent(true);
        MjClient.endoneui = null;
        if (MjClient.rePlayVideo >= 0 && MjClient.replayui) {
            MjClient.replayui.replayEnd();
        } else {
            MjClient.playui.sendPassToServer();
        }
        if (MjClient.endallui){
            MjClient.endallui.setVisible(true);
        }

        if(MjClient.playui) {
            MjClient.playui.hideEatNodeChildren();
            var playerNodeArr = MjClient.playui.playerNodeArr;
            for (var k = 0; k < playerNodeArr.length; k++) {
                MjClient.playui.removeAllCards(playerNodeArr[k]);
            }
        }
    },

    addWxHeadToEndUI: function (node, off) {
        var pl = MjClient.playui.getPlayerWithIndex(off);
        var img = "png/default_headpic.png";
        if (pl && pl.wxHeadImg) {
            img = pl.wxHeadImg;
            loadWxHead();
        } else { // 回放直接弹总结算 没有缓存头像
            MjClient.loadImgQX(pl.info.headimgurl, {isCrossOrigin: true}, function(err, texture) {
                if (!err && texture) {
                    img = texture;
                    loadWxHead();
                }
            });
        }

        function loadWxHead() {
            var spriteHead = new cc.Sprite(img);
            var frame = new cc.Sprite("common/bg_touxiangkuang.png");
            if(!spriteHead) return;
            node.addChild(spriteHead);
            node.addChild(frame);
            frame.setContentSize(node.getContentSize());
            frame.setPosition(node.width/2, node.height/2);
            spriteHead.setContentSize(node.getContentSize());
            spriteHead.setScale(0.98);
            spriteHead.setPosition(node.width/2, node.height/2);
        }
    },

    initLayoutInfo: function (back, maxPlayer) {
        var img_info = back.getChildByName("img_info");
        var infoBg = back.getChildByName("img_bg");
        var height = infoBg.height / 4;
        var gap = infoBg.height * 0.12;
        img_info.visible = false;
        for (var i = 0; i < maxPlayer; i++) {
            var cloneInfoImg = util.clone(img_info);
            this.setCloneImgTexture(img_info, cloneInfoImg, i);
            back.addChild(cloneInfoImg);
            var spacing = 0.8;      // 上下item的间距
            var poy = infoBg.height - (height * i * spacing) - gap;
            cloneInfoImg.setPositionY(poy + (img_info.height / 2));
            this.setEndOneUserUI(cloneInfoImg, i);
        }
    },

    setCloneImgTexture: function (infoBg, cloneInfoBg, idx) {
        var infoData = infoBg.getChildByName("layout_infoData");
        var eatFrontCard = infoData.getChildByName("img_eatFrontCard");
        var eatBackCard = infoData.getChildByName("img_eatBackCard");

        var cloneInfoData = cloneInfoBg.getChildByName("layout_infoData");
        cloneInfoData.getChildByName("img_eatFrontCard").loadTexture(eatFrontCard.getRenderFile().file);
        cloneInfoData.getChildByName("img_eatBackCard").loadTexture(eatBackCard.getRenderFile().file);

        var pl = MjClient.playui.getPlayerWithIndex(idx);
        if(pl && pl.winone > 0) cloneInfoBg.loadTexture("common/bg_gameover_win.png");
    },

    showTileType: function (title, pl) {
        if(pl.winone > 0){ // 胜利
            title.loadTexture("common/title_shengli.png");
        }else if(pl.winone < 0){ // 败了
            title.loadTexture("common/title_shibai.png");
        }else{
            var sData = MjClient.data.sData;
            var tData = sData.tData;
            if (MjClient.isDismiss){
                title.loadTexture("common/title_paijujiesuan.png");
            } else if (tData.winner === -1) {
                title.loadTexture("common/title_huangzhuang.png");
            } else {
                title.loadTexture("common/title_pingju.png");
            }
        }
        title.ignoreContentAdaptWithSize(true);
    },

    setUserNameAndIdColor: function (node, pl) {
        if(!node || !pl) return;
        node.setTextColor(pl.winone > 0 ? cc.color("#ffffff") : cc.color("#658c7f"));
    },

    setUserCardTypeDescColor: function (node, pl) {
        if(!node || !pl) return;
        node.setTextColor(pl.winone > 0 ? cc.color("#e1b66b") : cc.color("#658c7f"));
    },

    setPiaoFenIcon: function (node, pl) {
        if(!pl || pl.jiazhuNum === "undefined" || pl.jiazhuNum === -1 || pl.jiazhuNum === 0 || !node) return;
        var urlObj = {
            piaoArr0: {
                "1": "gameOver/piaoIcon/piao1.png",          // 漂1分
                "2": "gameOver/piaoIcon/piao2.png",          // 漂2分
                "3": "gameOver/piaoIcon/piao3.png",          // 漂3分
            },
            piaoArr1: {
                "1": "gameOver/piaoIcon/piao11.png",         // 飘1分
                "2": "gameOver/piaoIcon/piao22.png",         // 飘2分
                "3": "gameOver/piaoIcon/piao33.png",         // 飘3分
            },
        };

        var idx = Number(pl.jiazhuNum), url;
        var desc = MjClient.playui.getGameDesc();
        if(desc.indexOf("漂") > -1) {
            url = urlObj.piaoArr0[idx];
            node.setVisible(true);
            node.loadTexture(url);
        }
        if(desc.indexOf("飘") > -1) {
            url = urlObj.piaoArr1[idx];
            node.setVisible(true);
            node.loadTexture(url);
        }
        // mylog("Tom -------------- show -------- uid " + pl.info.uid + " id === " + idx + "   piao === " + pl.jiazhuNum)
    }
});