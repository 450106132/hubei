// 石首捱晃小结算
var majiang_winGamePanel_shiShouAiHuang = majiang_winGamePanel_hubei.extend({
    jsonFile: "endOne_shiShouAiHuang.json",
    jsBind:{
        back: {
            img_bridTips:{
                _visible: false,
            }
        }
    },

    ctor: function(){
        this._super(this.jsonFile);
    },

    setZhuaMaUserUI: function (playerNode, off) {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var pl = MjClient.playui.getPlayerWithIndex(off);
        if(!pl)return;

        // 玩家信息
        var img_info = playerNode.getChildByName("img_info");
        var img_zhuang = img_info.getChildByName("img_zhuang");
        var zhuangIndex = (typeof MjClient.preZhuang != 'undefined') ? MjClient.preZhuang : tData.zhuang;
        img_zhuang.setVisible(tData.uids[zhuangIndex] == pl.info.uid);
        img_zhuang.zIndex=10;

        var uibind= {
            img_info: {
                text_name: {
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                        this.setFontName("Arial");
                        this.setFontSize(this.getFontSize());
                    },
                    _text: function () {
                        var nameStr = unescape(pl.info.nickname ) + "";
                        return MjClient.playui.formatUserName(nameStr, 7, true);
                    }
                },
                text_id: {
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function () {
                        return "ID:" + pl.info.uid.toString();
                    }
                },
            }
        };

        // 抓码牌
        var zhuaMaSize = 0;
        var moZhong = tData.moZhong[pl.info.uid];
        var cardItem = playerNode.getChildByName("img_eatFrontCard");
        var cardSize = cc.size(cardItem.width * cardItem.scale, cardItem.height * cardItem.scale);
        for (var i = 0; i < moZhong.length; i ++) {
            var cardNode = MjClient.playui.createCard(playerNode, MjClient.playui.CsdDefaultCardType.EatCardFront,
                MjClient.playui.HandleCardType.Chi, moZhong[i], true);
            cardNode.removeFromParent();
            cardNode.visible = true;
            cardNode.x = (cardSize.width / 2) + i * cardSize.width;
            cardNode.y = cardItem.y;
            playerNode.addChild(cardNode);
            zhuaMaSize += cardSize.width;
            if(cardNode.getChildByName("laiZi")) cardNode.getChildByName("laiZi").setPosition(cc.p(cardNode.width * 0.5, cardNode.height * 0.65));
        }

        if (moZhong.length > 5) {
            img_info.x += cardSize.width / 2 * (moZhong.length - 5);
        }
        else {
            zhuaMaSize = cardSize.width * 5;
        }

        // 微信头像
        BindUiAndLogic(playerNode, uibind);
        this.addWxHeadToEndUI(img_info.getChildByName("img_head"), off);
        MjClient.playui.setUserOfflineInWinGame(img_info.getChildByName("img_head"), pl);

        return zhuaMaSize;
    },

    // 抓码信息初始化
    initZhuaMaInfo: function(zhuaMaInfo) {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var hasMaCard = false;
        for (var uid in tData.moZhong) {
            if (tData.moZhong[uid].length != 0) {
                hasMaCard = true;
            }
        }

        if (!hasMaCard) {
            zhuaMaInfo.visible = false;
            return;
        }
        
        var title = zhuaMaInfo.getChildByName("text_title");
        var img_player = zhuaMaInfo.getChildByName("img_player");
        img_player.visible = false;

        // 配置中码玩家抓码信息
        var zhuaMaSize = [];
        var playerNodeArr = [];
        var count = 0;
        var maWidth = 0;
        for (var i = 0; i < tData.maxPlayer; i++) {
            if (tData.moZhong[tData.uids[i]].length == 0) {
                continue;
            }

            var playerNodeClone = img_player.clone();
            playerNodeClone.visible = true;
            zhuaMaSize[count] = this.setZhuaMaUserUI(playerNodeClone, i);
            playerNodeArr[count] = playerNodeClone;
            maWidth += zhuaMaSize[count];
            zhuaMaInfo.addChild(playerNodeClone);
            count++;
        }

        // 根据宽度自适应坐标
        var gap = (zhuaMaInfo.width - maWidth) / (count + 1);
        var playerNodePos = gap;
        for (var i = 0; i < count; i++) {
            if (i != 0) {
                playerNodePos += gap + zhuaMaSize[i - 1];
            }

            playerNodeArr[i].x = playerNodePos;
        }
        
        title.x = playerNodeArr[0].x - title.width;
    },

    // Override
    initLayoutInfo: function (back, maxPlayer) {
        var img_info = back.getChildByName("img_info");
        var infoBg = back.getChildByName("img_bg");
        var height = infoBg.height / 4;
        var gap = infoBg.height * 0.12;
        var spacing = 0.8;      // 上下item的间距
        img_info.visible = false;
        for (var i = 0; i < maxPlayer; i++) {
            var cloneInfoImg = util.clone(img_info);
            this.setCloneImgTexture(img_info, cloneInfoImg, i);
            back.addChild(cloneInfoImg);
            var poy = infoBg.height - (height * i * spacing) - gap;
            cloneInfoImg.setPositionY(poy + (img_info.height / 2));
            this.setEndOneUserUI(cloneInfoImg, i);
        }

        var zhuaMaInfo = back.getChildByName("layout_zhuaMaInfo");
        zhuaMaInfo.setPositionY(infoBg.height - (height * 3 * spacing) - gap + (img_info.height / 2));

        this.initZhuaMaInfo(zhuaMaInfo);
    }
});