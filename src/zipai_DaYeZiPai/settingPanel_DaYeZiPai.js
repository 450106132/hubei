var settingPanel_DaYeZiPai = setting_ziPai.extend({
	ctor : function(){
		this._super("settingPanel_ziPai.json");
	},

	//Override
    initChuPai : function(gongNeng){
    	this._super(gongNeng);
    	var chupai = gongNeng.getChildByName("chupai");
        chupai.visible = false;
    },

    //出牌语音
    initYuYin : function(huaMian){
        huaMian.getChildByName("music").getChildByName("voice_1").visible = false;
        huaMian.getChildByName("music").getChildByName("voice_2").visible = false;
        huaMian.getChildByName("music").getChildByName("yyin").visible = false;
    },

    //出牌速度
    initSuDu : function(gongNeng){
        var suDuList = [];
        var man = gongNeng.getChildByName("suDu").getChildByName("man");
        var jiKuai = gongNeng.getChildByName("suDu").getChildByName("jiKuai");
        man.visible = true;
        jiKuai.visible = true;
        var daxiao = gongNeng.getChildByName("daxiao")
        var off = -daxiao.height * 0.8;
        daxiao.y += off;
        var tingpai = gongNeng.getChildByName("tingpai");
        tingpai.y += off;
        var huxi = gongNeng.getChildByName("huxi");
        huxi.y += off;
        var chupai = gongNeng.getChildByName("chupai");
        chupai.y += off;
        suDuList.push(man);
        suDuList.push(gongNeng.getChildByName("suDu").getChildByName("yb"));
        suDuList.push(gongNeng.getChildByName("suDu").getChildByName("bz"));
        suDuList.push(jiKuai);
        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_SU_DU_TYPE, 2);
        this.suDuRadio = createRadioBoxForCheckBoxs(suDuList, null, type);
        for(var i = 0; i < suDuList.length; i++){
            cc.eventManager.addListener(this.setTextClick(suDuList,i,this.suDuRadio),suDuList[i].getChildByName("text"));
        }
        this.suDuRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_SU_DU_TYPE, index);
            postEvent("EZP_suDu", {});
        });
    },

    //胡息显示
    initHuXi : function(gongNeng){
        var huxi = gongNeng.getChildByName("huxi");
        huxi.getChildByName("title").ignoreContentAdaptWithSize(true);
        huxi.visible = true;
        var huXiList = [];
        huXiList.push(huxi.getChildByName("guanbi"));
        huXiList.push(huxi.getChildByName("kaiqi"));
        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, 0);
        this.huXiRadio = createRadioBoxForCheckBoxs(huXiList, null, type);
        for(var i = 0; i < huXiList.length; i++){
            cc.eventManager.addListener(this.setTextClick(huXiList,i,this.huXiRadio),huXiList[i].getChildByName("text"));
        }
        this.huXiRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, index);
            postEvent("EZP_huXi", index);
        });
    },

    //听牌提示
    initTingPai : function(gongNeng){
        var tingpai = gongNeng.getChildByName("tingpai");
        tingpai.getChildByName("title").ignoreContentAdaptWithSize(true);
        tingpai.visible = true;
        var tingPaiList = [];
        tingPaiList.push(tingpai.getChildByName("guanbi"));
        tingPaiList.push(tingpai.getChildByName("kaiqi"));
        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_PLAY_TING_PAI, 1);
        this.tingPaiRadio = createRadioBoxForCheckBoxs(tingPaiList, null, type);
        cc.eventManager.addListener(this.setTextClick(tingPaiList,0,this.tingPaiRadio),tingPaiList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(tingPaiList,1,this.tingPaiRadio),tingPaiList[1].getChildByName("text"));
        this.tingPaiRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_PLAY_TING_PAI, index);
            postEvent("EZP_tingPai", index);
        });
    },

    loadGameBgTexture : function(huaMian){
        for (var i = 0; i<3; i ++)
        {
            var gameBg = huaMian.getChildByName("beiJing").getChildByName("gameBg" + (i + 1));
            if (!gameBg)
                break;

            var file = "playing/gameTable/beijing_"+(i+1)+".jpg";
            if (file != "")
            {
                var texture = cc.textureCache.getTextureForKey(file);
                if (texture)
                    gameBg.getChildByName("Image_1").loadTexture(file);
                else {
                    // 预加载游戏背景
                    gameBg.setVisible(false);
                    loadBgAsync(gameBg,gameBg.getChildByName("Image_1"),file);
                }
            }
            else
                gameBg.setVisible(false);
        }
    },
})