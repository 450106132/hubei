
var majiang_winGamePanel_yiChangXueLiu = majiang_winGamePanel_hubei.extend({

    ctor: function () {
        var jsonFile = "endOne_maJiang_yiChangXueLiu.json";
        this._super(jsonFile);
    },

    setEndOneUserUI: function (infoImg, off) {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var pl = MjClient.playui.getPlayerWithIndex(off);
        if(!pl)return;

        infoImg.setVisible(true);
        infoImg = infoImg.getChildByName("layout_infoData");

        var uibind = {
            layout_infoData: {
                text_name: {
                    _run:function(){
                        var nameStr = unescape(pl.info.nickname) + "";
                        this.ignoreContentAdaptWithSize(true);
                        this.setColor(pl.winone > 0 ? cc.color("#FFFFFF") : cc.color("#658C7F"));
                        this.setString(MjClient.playui.formatUserName(nameStr, 7, true));
                    }
                },
                text_id: {
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                        this.setColor(pl.winone > 0 ? cc.color("#FFFFFF") : cc.color("#658C7F"));
                        this.setString("ID:" + pl.info.uid.toString());
                    }
                },
                img_zhuang: {
                    _index: 10,
                    _visible: function () {
                        var zhuangIndex = (typeof MjClient.preZhuang != 'undefined') ? MjClient.preZhuang : tData.zhuang;
                        return tData.uids[zhuangIndex] === pl.info.uid
                    }
                },
                img_tingIcon:{
                    _visible: false,
                    _run: function(){
                        MjClient.endoneui.showTingIcon(pl, this);
                    }
                },
                text_cardType: {
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                        this.setColor(pl.winone > 0 ? cc.color("#E1B66B") : cc.color("#658C7F"));
                        this.setString(MjClient.endoneui.getCardTypeDesc(pl, sData));
                    }
                },
                img_eatFrontCard: {_visible: false},
                img_eatBackCard: {_visible: false},
                img_handCard: {_visible: false},
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
                text_fanScore: {
                    _run: function () {
                        this.ignoreContentAdaptWithSize(true);
                        this.setString(pl.maxFan + "番 ");
                    }
                },
                img_huazhu: {
                    _visible: function () {
                        if(!pl) return false;
                        var dict = {};
                        var cards = [].concat(pl.mjhand).concat(pl.mjpeng).concat(pl.mjgang0).concat(pl.mjgang1);
                        for(var i = 0; i < cards.length; i++){
                            var color = Math.floor(cards[i]/10);
                            dict[color] = dict[color] ? dict[color] + 1 : 1;
                        }
                        return Object.keys(dict).length === 3;
                    }
                },
                img_chajiao: {
                    _visible: function () {
                        var chaDajiaoData = tData.chaDajiaoData;
                        for(var i = 0; i < chaDajiaoData.length; i ++){
                            var data = chaDajiaoData[i];
                            if(data.uid === pl.info.uid && data.str === "beichadajiao.png") {
                                return true;
                            }
                        }
                        return false;
                    }
                }
            }
        };
        BindUiAndLogic(infoImg.parent, uibind);
        this.addWxHeadToEndUI(infoImg.getChildByName("img_head"), off);
        this.showHandCard(pl, infoImg);
        MjClient.playui.setUserOfflineInWinGame(infoImg.getChildByName("img_head"), pl);
    },

    setGameOverPanelPlayerState: function (stateNode, pl) {
        var fileName = "";
        var cardCount = MjClient.majiang.CardCount(pl);
        if (pl.winType === 3 && cardCount % 3 === 2){
            fileName = "gameOver/ico_zimo.png";

        }else if (pl.winType > 0 && cardCount % 3 === 2){
            fileName = "gameOver/ico_hu-0.png";

        } else if ((pl.mjdesc + "").indexOf("点炮") >= 0 && cardCount % 3 === 1){
            stateNode.visible = true;
            fileName = "gameOver/ico_dianpao.png";
        }

        if (fileName !== ""){
            stateNode.loadTexture(fileName);
            stateNode.ignoreContentAdaptWithSize(true);
        } else {
            stateNode.visible = false;
        }
    },

    createEndSortCardArr: function (pl, infoImg) {
        var i, j, cardNode, arry = [];
        //扑牌
        if(pl.puCards && pl.puCards.length === 3) {
            for (i = 0; i < pl.puCards.length; i++) {
                cardNode = MjClient.playui.createCard(infoImg, MjClient.playui.CsdDefaultCardType.EatCardFront,
                    MjClient.playui.HandleCardType.PuCard, pl.puCards[i], true);
                arry.push(cardNode);
            }
            arry.push(1); // 标志多移动一点
        }

        //明杠
        for (i = 0; i < pl.mjgang0.length; i++) {
            for (j = 0; j < 4; j++) {
                cardNode = MjClient.playui.createCard(infoImg, MjClient.playui.CsdDefaultCardType.EatCardFront,
                    MjClient.playui.HandleCardType.MingGang, pl.mjgang0[i], true);
                arry.push(cardNode);
            }
            arry.push(1); // 标志多移动一点
        }
        //添加暗杠
        for (i = 0; i < pl.mjgang1.length; i++) {
            for (j = 0; j < 4; j++) {
                // 给牌背
                var handleCardType = j == 2 ? MjClient.playui.CsdDefaultCardType.EatCardBack : MjClient.playui.CsdDefaultCardType.EatCardFront;
                var cardTag = j == 2 ? null : pl.mjgang1[i];
                cardNode = MjClient.playui.createCard(infoImg, handleCardType, MjClient.playui.HandleCardType.AnGang, cardTag, true);
                arry.push(cardNode);
            }
            arry.push(1); // 标志多移动一点
        }
        //添加碰
        for (i = 0; i < pl.mjpeng.length; i++) {
            for (j = 0; j < 3; j++) {
                cardNode= MjClient.playui.createCard(infoImg, MjClient.playui.CsdDefaultCardType.EatCardFront,
                    MjClient.playui.HandleCardType.Peng, pl.mjpeng[i], true);
                arry.push(cardNode);
            }
            arry.push(1); // 标志多移动一点
        }

        var isSeparate = false; // 是否需要隔开最后一张-
        if (pl.mjhand && pl.mjhand.length > 0){
            var count = MjClient.majiang.CardCount(pl);
            isSeparate = (count === 8);
        }
        var sortHandCard = this.getHandSort(pl.mjhand, isSeparate);
        if(!sortHandCard) return MjClient.endoneui.removeFromParent(true);
        //添加手牌
        for (i = 0; i < sortHandCard.length; i++) {
            if( isSeparate && i === (sortHandCard.length - 1)){
                arry.push(1); // 标志多移动一点
            }
            cardNode = MjClient.playui.createCard(infoImg, MjClient.playui.CsdDefaultCardType.HandCard,
                MjClient.playui.HandleCardType.Hand, sortHandCard[i], true);
            arry.push(cardNode);

        }
        return arry;
    },

    showFinalCard: function () {
        return true;
    },

    showAddBird : function () {
        return true;
    },
});