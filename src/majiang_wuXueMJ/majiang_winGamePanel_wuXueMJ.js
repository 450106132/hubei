
var majiang_winGamePanel_wuXueMJ = majiang_winGamePanel_hubei.extend({

    jsBind:{},

    ctor: function () {
        var jsonFile = "endOne_maJiang_wuXueMJ.json";
        this._super(jsonFile);
    },

    // override 无抓鸟
    showAddBird: function (back, tData) {
        // 修改显示
        var img_bridTips = back.getChildByName("img_bridTips");
        img_bridTips.visible = false;
    },

    // override 设置单个玩家面板数据
    setEndOneUserUI: function (infoImg, off) {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var pl = MjClient.playui.getPlayerWithIndex(off);
        if (!pl) return;

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
                text_piao: {
                    _visible: false,
                    _run: function () {
                        MjClient.endoneui.setPiaoFenText(this, pl, tData.areaSelectMode);
                    }
                },
                text_jinTip: {
                    _run: function () {
                        this.ignoreContentAdaptWithSize(true);
                        var textJinCount = this.getChildByName("text_jinCount");
                        textJinCount.ignoreContentAdaptWithSize(true);
                        textJinCount.setPositionX(this.width/2);
                        if (pl.cattyScores && pl.cattyScores > 0) {
                            textJinCount.setString(Number(pl.cattyScores) + "斤");
                        }
                        else {
                            textJinCount.setString("0斤");
                        }
                    }
                },
                img_ding: {
                    _run: function () {
                        this.visible = false;
                        this.ignoreContentAdaptWithSize(true);
                        var path = "res/gameOver/icon_jinding.png";
                        var str = this.parent.getChildByName("text_cardType").getString();
                        if (str.indexOf("小金鼎") >= 0) {
                            path = "res/gameOver/icon_xiaojinding.png";
                            this.visible = true;
                        }
                        else if (str.indexOf("金鼎") >= 0) {
                            this.visible = true;
                        }
                        this.loadTexture(path);
                    }
                }
            }
        };

        BindUiAndLogic(infoImg.parent, uibind);
        this.addWxHeadToEndUI(infoImg.getChildByName("img_head"), off);
        this.showHandCard(pl, infoImg);
        MjClient.playui.setUserOfflineInWinGame(infoImg.getChildByName("img_head"), pl);
    },

    setPiaoFenText: function (node, pl, roomSelect) {
        var piaoId = roomSelect.piaoId;
        var piaoFenArr = [0, 1, 5, 10, roomSelect.piaoFen];
        var piaoFen = piaoFenArr[piaoId];
        if(Number(piaoFen) === 0) return;
        node.setString("漂" + piaoFen + "分");
        node.setVisible(true);
    },


    showHandCard: function (pl, infoImg) {
        var arry = this.createEndSortCardArr(pl, infoImg);
        var posx = 0;
        var gangNum = 0; // 杠要叠牌
        for (var i = 0; i < arry.length; i++) {
            if(arry[i] === 1){
                posx += 8;
                continue;
            }

            if(!arry[i]){
                MjClient.showToast("报错了！！！");
                continue;
            }

            arry[i].visible = true;
            arry[i].enabled = false;
            // 结算牌子在原有缩放比上再次缩放0.8
            arry[i].setScale(arry[i].getScale() * 0.85);
            if(arry[i].name === "anGang" || arry[i].name === "mingGang"){
                gangNum++;
                if(gangNum % 3 === 0 && gangNum !== 0){
                    posx -= arry[i].width * arry[i].getScale();
                    arry[i].y += 8;
                }else if(gangNum === 4){
                    gangNum = 0;
                }
            }else{
                gangNum = 0;
            }
            arry[i].x += posx;
            posx += arry[i].width * arry[i].getScale() * 0.97;
        }
    }

});