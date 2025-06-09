var settingPanel_yueYangWaiHuZi = setting_ziPai.extend({
    ctor : function(jsonSrc){
        this._super(jsonSrc);
    },
    initBeiJiang : function(huaMian){
        this._super(huaMian);
        var gameBg4 = huaMian.getChildByName("beiJing").getChildByName("gameBg4");
        gameBg4.visible = true;
        huaMian.getChildByName("beiJing").x = huaMian.getChildByName("beiJing").x - 60;
    },
    loadGameBgTexture : function(huaMian){
        var bg = MjClient.playui.getGameBgList();
        for (var i = 0; i < bg.length; i++)
        {
            var gameBg = huaMian.getChildByName("beiJing").getChildByName("gameBg" + (i + 1));
            if (!gameBg)
                break;

            var file = bg[i];
            if (file != "")
            {
                var texture = cc.textureCache.getTextureForKey(file);
                if (texture)
                    gameBg.getChildByName("Image_1").loadTexture(file);
                else {
                    // 预加载游戏背景
                    gameBg.setVisible(false);
                    this.loadBgAsync(gameBg,gameBg.getChildByName("Image_1"),file);
                }
            }
            else
                gameBg.setVisible(false);
        }
    },
    //字牌字体
    initCardType : function(huaMian){
        var ziPaiList = [];
        for(var i = 0; i < MjClient.playui.getCardFontList().length; i++){
            var pai = huaMian.getChildByName("ziPai").getChildByName("ziPai" + (i + 1));
            ziPaiList.push(pai);
            pai.getChildByName("Image").loadTexture("setting/ziPai" + (i + 1)+ ".png");
        }
        for(var i = 0; i < ziPaiList.length; i++){
            ziPaiList[i].x = (huaMian.getChildByName("ziPai").width - 40) / (ziPaiList.length) * (i + 1);
        }
        var type = MjClient.playui.getCardFontIdx();
        this.ziPaiRadio = createRadioBoxForCheckBoxs(ziPaiList, null, type);
        for(var i = 0; i < ziPaiList.length; i++){
            cc.eventManager.addListener(this.setTextClick(ziPaiList,i,this.ziPaiRadio),ziPaiList[i].getChildByName("Image"));
        }
        this.ziPaiRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, index);
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType, index);
            postEvent("EZP_cardType", {idx:index, type:"font"});
        });
    },
    //胡息显示
    initHuXi : function(gongNeng){
        var huxi = gongNeng.getChildByName("huxi");
        huxi.getChildByName("title").ignoreContentAdaptWithSize(true);
        huxi.visible = false;
    },
    //出牌提示
    initChuPaiGuide : function(gongNeng){
        this._super(gongNeng);
        var chuPaiGuide = gongNeng.getChildByName("chuPaiGuide");
        chuPaiGuide.getChildByName("title").ignoreContentAdaptWithSize(true);
        chuPaiGuide.visible = true; //默认没有

        var tingpai = gongNeng.getChildByName("tingpai");
        chuPaiGuide.y += (tingpai.y - chuPaiGuide.y) / 2;
    },
})