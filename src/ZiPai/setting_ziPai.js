playLayer_ziPai.prototype.initDefaultSettingKey = function() {
    MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT = "KEY_ZI_PAI_PLAY_UI_LAYOUT_" + MjClient.gameType; //字牌布局
    MjClient.KEY_ZI_PAI_GAME_BG_TYPE = "KEY_ZI_PAI_GAME_BG_TYPE_" + MjClient.gameType; //字牌游戏背景类型
    MjClient.KEY_ZI_PAI_ZI_PAI_TYPE = "KEY_ZI_PAI_ZI_PAI_TYPE_" + MjClient.gameType; //字牌游戏字体类型
    MjClient.KEY_ZI_PAI_FAST_EAT_TYPE = "KEY_ZI_PAI_FAST_EAT_TYPE_" + MjClient.gameType; //字牌游戏快速吃牌类型
    MjClient.KEY_ZI_PAI_HU_XI_TYPE = "KEY_ZI_PAI_HU_XI_TYPE_" + MjClient.gameType; //字牌游戏 显示胡息
    MjClient.KEY_ZI_PAI_XU_XIAN_TYPE = "KEY_ZI_PAI_XU_XIAN_TYPE_" + MjClient.gameType; //字牌游戏 虚线位置
    MjClient.KEY_ZI_PAI_SU_DU_TYPE = "KEY_ZI_PAI_SU_DU_TYPE_" + MjClient.gameType; //字牌游戏 动画速度 
    MjClient.KEY_ZI_PAI_CARD_SIZE = "KEY_ZI_PAI_CARD_SIZE_" + MjClient.gameType; // 字牌大小
    MjClient.KEY_ZI_PAI_VOICE_TYPE = "KEY_ZI_PAI_VOICE_TYPE_" + MjClient.gameType; // 字牌游戏语音
    MjClient.KEY_ZI_PAI_PLAY_TING_PAI = "KEY_ZI_PAI_PLAY_TING_PAI_" + MjClient.gameType; //听牌提示
    MjClient.KEY_ZI_PAI_CHU_PAI_TYPE = "KEY_ZI_PAI_CHU_PAI_TYPE_" + MjClient.gameType; //字牌游戏 出牌按钮
    MjClient.KEY_ZI_PAI_DOUBLE_CLICK_TYPE = "KEY_ZI_PAI_DOUBLE_CLICK_TYPE_" + MjClient.gameType; //字牌游戏 双击出牌
    MjClient.KEY_ZI_PAI_CHU_PAI_GUIDE = "KEY_ZI_PAI_CHU_PAI_GUIDE_" + MjClient.gameType; //字牌游戏 出牌提示

    this.initSettingData();
};

playLayer_ziPai.prototype.initSettingData = function() {

};

playLayer_ziPai.prototype.getDefaultSetting = function() {
    return {
        layout: 1,
        bg: 0,
        pai: 1,
        fastEat: 0,
        huXi: 1,
        xuXian: 0,
        suDu: 0,
        size: 0,
        voice: 1,
        ting: 0,
        chuBtn: 0,
        dblClick: 1,
        chuGuide:0,
    };
};

//自动过time
playLayer_ziPai.prototype.getAutoPassTime = function() {
    var t = 0.9; //标准
    var type = this.getSuDuType();
    if (type == 0) {
        //慢
        t = 1.1;
    } else if (type == 1) {
        //标准
        t = 0.9;
    } else {
        //快
        t = 0.7;
    }
    return t;
};

// 是否需要听牌提示
playLayer_ziPai.prototype.isNeedShowTing = function(){
    return true;
};

// 是否可以双击出牌
playLayer_ziPai.prototype.getDoubleClickType = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_DOUBLE_CLICK_TYPE, this.getDefaultSetting().dblClick);
};

//布局类型
playLayer_ziPai.prototype.getLayoutType = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT, this.getDefaultSetting().layout);
};

//语音类型
playLayer_ziPai.prototype.getVoiceType = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_VOICE_TYPE, this.getDefaultSetting().voice);
};

//游戏背景idx
playLayer_ziPai.prototype.getGameBgIdx = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE, this.getDefaultSetting().bg);
};

//字牌字体列表
playLayer_ziPai.prototype.getCardFontList = function() {
    return ["type1", "type5", "type3"];
};

//字牌大小列表
playLayer_ziPai.prototype.getCardSizeList = function() {
    return ["big", "small", "super"];
};

//字牌字体idx
playLayer_ziPai.prototype.getCardFontIdx = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, this.getDefaultSetting().pai);
};

//字牌大小idx
playLayer_ziPai.prototype.getCardSizeIdx = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_CARD_SIZE, this.getDefaultSetting().size);
};

//出牌按钮开关
playLayer_ziPai.prototype.getChuPaiType = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_CHU_PAI_TYPE, this.getDefaultSetting().chuBtn);
};

//出牌提示
playLayer_ziPai.prototype.getChuPaiGuide = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_CHU_PAI_GUIDE, this.getDefaultSetting().chuGuide);
};

//快速吃牌类型
playLayer_ziPai.prototype.getFastEatType = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_FAST_EAT_TYPE, this.getDefaultSetting().fastEat);
};

//出牌虚线显示类型
playLayer_ziPai.prototype.getXuXianType = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_XU_XIAN_TYPE, this.getDefaultSetting().xuXian);
};

//出牌速度
playLayer_ziPai.prototype.getSuDuType = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_SU_DU_TYPE, this.getDefaultSetting().suDu);
};

//是否显示听牌
playLayer_ziPai.prototype.getTingPaiType = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_PLAY_TING_PAI, this.getDefaultSetting().ting);
};

//是否胡息显示类型
playLayer_ziPai.prototype.getHuXiType = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, this.getDefaultSetting().huXi);
};

//字牌资源路径
playLayer_ziPai.prototype.getCardFilePath = function() {
    var sizeList = this.getCardSizeList();
    var fontList = this.getCardFontList();
    var sizeIdx = this.getCardSizeIdx();
    var fontIdx = this.getCardFontIdx();

    return "playing/ziPai/" + sizeList[sizeIdx] + "/" + fontList[fontIdx] + "/";
};

//改变出牌虚线布局
playLayer_ziPai.prototype.changeCutLineLayout = function(cutLine) {
    var type = this.getXuXianType();
    switch (type) {
        case 0:
            setWgtLayout(cutLine, [1, 0.3], [0.5, 0.5], [0, -2]);
            break;
        case 1:
            setWgtLayout(cutLine, [1, 0.3], [0.5, 0.6], [0, -2]);
            break;
    }
};

//动画执行时间
playLayer_ziPai.prototype.getActionTime = function() {
    var type = this.getSuDuType();
    var t = 0.2;
    switch (type) {
        case 0: //标准
            t = 0.2;
            break;
        case 1: //快
            t = 0.2 * 0.8;
            break;
        case 2: //慢
            t = 0.2 * 1.2;
            break;
        case 3: //急速
            t = 0.16 * 0.8;
            break;
    }
    return t;
};

//显示手牌胡息
playLayer_ziPai.prototype.showHandHuXi = function(node) {
    var tag = 180501;
    var type = this.getHuXiType();
    if (type == 1) {
        node.removeChildByTag(tag);
        return;
    }

    var cards = node.getChildren().slice();
    var len = cards.length;
    var arr = [];
    var w = 0;
    var scale = 1;
    for (var i = 0; i < len; i++) {
        var c = cards[i];
        if (c.tag) {
            arr.push(c.tag);
            w = c.width;
            scale = c.getScaleX();
        }
    }

    var txt = null;
    var sp = node.getChildByTag(tag);
    if (!sp) {
        sp = new cc.Sprite("gameTable/youxizhong-2_29.png");
        sp.setTag(tag);
        sp.setAnchorPoint(0.5, 0);
        sp.setScaleX(scale);
        sp.setScaleY(scale);
        sp.x = w * scale * 0.5;
        node.addChild(sp, 100);
        var txt = new cc.LabelTTF("0胡息", MjClient.fzcyfont, 25);
        txt.setTag(tag);
        sp.addChild(txt, 100);
        txt.x = sp.width * 0.5;
        txt.y = sp.height * 0.5;
    } else {
        txt = sp.getChildByTag(tag);
    }

    if (!MjClient.majiang.getRowHuxi_hand) {
        var hx = MjClient.huzi.getRowHuxi_hand(arr, MjClient.data.sData.tData);
    } else {
        var hx = MjClient.majiang.getRowHuxi_hand(arr, MjClient.data.sData.tData);
    }

    hx += "胡息";
    txt.setString(hx);
    sp.hx = hx;
    sp.scheduleOnce(function() {
        txt = this.getChildByTag(tag);
        if (txt && cc.sys.isObjectValid(txt)) {
            txt.removeFromParent(true);
        }
        if (true) {
            var txt = new cc.LabelTTF("0胡息", MjClient.fzcyfont, 25);
            txt.setTag(tag);
            this.addChild(txt, 100);
            txt.x = this.width * 0.5;
            txt.y = this.height * 0.5;
        }
        if (!MjClient.majiang.getRowHuxi_hand) {
            var hx = MjClient.huzi.getRowHuxi_hand(arr, MjClient.data.sData.tData);
        } else {
            var hx = MjClient.majiang.getRowHuxi_hand(arr, MjClient.data.sData.tData);
        }
        hx += "胡息";
        txt.setString(hx);
    }.bind(sp), 0.1);
};

// 获取牌IMG
// @param name // 手牌 'hand'  吃牌 弃牌 'out'  展示牌'put'
playLayer_ziPai.prototype.getNewCard = function(name, tag, off, isTurn) {
    var node = this.getUINode(off);
    var cardImg = node.getChildByName("img_" + name + "Card").clone();

    var src = this.getCardSrc(name, tag, isTurn);
    //cardImg.loadTexture(src, name == "put" ? 0 : this.getResType());
    this.loadCardTexture(cardImg, src, name == "put" ? 0 : this.getResType());
    cardImg.visible = true;
    cardImg.tag = tag;

    return cardImg;
};

// 获取牌资源路径
playLayer_ziPai.prototype.getCardSrc = function(name, tag, isTurn) {
    var path = this.getCardFilePath();
    if(this.getResType() == 1 && name != "put"){
        path = path.replace("playing/ziPai/", "");
    }
    if (isTurn) {
        switch (name) {
            case "out":
                return path + "huxiBG.png";
            case "put":
                return path + "normalBG.png";
        }
    }

    return (path + name + tag + ".png");
};

playLayer_ziPai.prototype.getGameBgList = function() {
    return ["playing/paohuziTable/beijing_1.jpg", "playing/paohuziTable/beijing_2.jpg", "playing/paohuziTable/beijing_3.jpg"];
};

playLayer_ziPai.prototype.changeGameBg = function(node) {
    var idx = this.getGameBgIdx();
    var bgList = this.getGameBgList();
    node.loadTexture(bgList[idx]);
};

playLayer_ziPai.prototype.changeGameBgToNext = function() {
    var idx = this.getGameBgIdx() + 1;
    var bgList = this.getGameBgList();
    if (idx >= bgList.length) {
        idx = 0;
    }
    util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE, idx);
    postEvent("EZP_gameBG");
};

/**
 * @param node 
 * @param {String} type 改变的类型:font|size
 */
playLayer_ziPai.prototype.changeCardFrame = function(node, type) {
    var childArray = node.getChildren();
    var len = childArray.length;
    for (var i = 0; i < len; i++) {
        var child = childArray[i];
        this.changeCardFrame(child, type);
    }

    if (node.toString() != "[object ImageView]") {
        return;
    }

    var oldFile = node.getRenderFile().file;
    /*if (oldFile.indexOf("playing/ziPai/") < 0) {
        return;
    }*/
    if (oldFile.indexOf("big/") < 0 && oldFile.indexOf("small/") < 0 && oldFile.indexOf("super/") < 0) {
        return;
    }

    var list = [];
    var idx = 0;
    switch (type) {
        case "font":
            list = this.getCardFontList();
            idx = this.getCardFontIdx();
            break;
        case "size":
            list = this.getCardSizeList();
            idx = this.getCardSizeIdx();
            break;
    }

    var newFile = oldFile;
    for (var i = 0; i < list.length; i++) {
        if (oldFile.indexOf(list[i]) != -1) {
            newFile = oldFile.replace(list[i], list[idx]);
            break;
        }
    }

    if (newFile != oldFile && ((jsb.fileUtils.isFileExist(newFile) && this.getResType() == 0) || this.getResType() == 1)) {
        //node.loadTexture(newFile, (node.getParent().getName() == "img_putCard" || (this.isShowLongCard() && node == MjClient.movingCard_paohuzi)) ? 0 : this.getResType());
        this.loadCardTexture(node, newFile, (node.getParent().getName() == "img_putCard" || (this.isShowLongCard() && node == MjClient.movingCard_paohuzi)) ? 0 : this.getResType())
    }
};

// 改变布局
playLayer_ziPai.prototype.changeLayout = function(uiNode) {
    var downNode = uiNode.getChildByName("node_down");
    var rightNode = uiNode.getChildByName("node_right");
    var leftNode = uiNode.getChildByName("node_left");

    var type = this.getLayoutType();
    // 间距
    var des = 0.005;

    var ipxSpace = isIPhoneX() ? 0.04 : 0; //ipx 增加间距
    if (type == 0) { //偏右
        var layoutOut = downNode.getChildByName("layout_outCards");
        setWgtLayout(layoutOut, [0.14, 0.14], [1 - des, des], [0, 0]);

        var layoutOut = leftNode.getChildByName("layout_outCards");
        if (this.getPlayersNum() == 2) {
            setWgtLayout(layoutOut, [0.14, 0.14], [des + ipxSpace, 270 / 720], [0, 0]);
        } else {
            setWgtLayout(layoutOut, [0.14, 0.14], [des + ipxSpace, 320 / 720], [0, 0]);
        }

        var layoutOut = rightNode.getChildByName("layout_outCards");
        if (this.getPlayersNum() == 2) {
            setWgtLayout(layoutOut, [0.14, 0.14], [1 - des, 270 / 720], [0, 0]);
        } else {
            setWgtLayout(layoutOut, [0.14, 0.14], [1 - des, 320 / 720], [0, 0]);
        }

        var layoutEat = downNode.getChildByName("layout_eatCards");
        var ipxPosY = isIPhoneX() ? 50 : 0; // 公用代码todo
        setWgtLayout(layoutEat, [0.14, 0.14], [533 / 1280, (330 + ipxPosY) / 720], [-0.2, 0]);
        var layoutEat = leftNode.getChildByName("layout_eatCards");
        setWgtLayout(layoutEat, [0.14, 0.14], [des + ipxSpace, 0.82], [0, 0]);

        var layoutEat = rightNode.getChildByName("layout_eatCards");
        setWgtLayout(layoutEat, [0.14, 0.14], [1 - des, 0.82], [0, 0]);
    } else { //传统
        var layoutOut = downNode.getChildByName("layout_outCards");
        setWgtLayout(layoutOut, [0.14, 0.14], [1 - des, des], [0, 0]);

        var layoutOut = leftNode.getChildByName("layout_outCards");
        setWgtLayout(layoutOut, [0.14, 0.14], [ipxSpace + des, 0.84 - des], [0, 0]);

        var layoutOut = rightNode.getChildByName("layout_outCards");
        if (this.getPlayersNum() == 2) {
            setWgtLayout(layoutOut, [0.14, 0.14], [1 - des, 0.83 - des], [0, 0]);
        } else {
            setWgtLayout(layoutOut, [0.14, 0.14], [1 - des, 0.83 - des], [0, 0]);
        }

        var ipxPosY = isIPhoneX() ? 0.01 : 0;

        var layoutEat = downNode.getChildByName("layout_eatCards");
        setWgtLayout(layoutEat, [0.14, 0.14], [des + ipxSpace, 0.23 - ipxPosY], [0, 0]);
        if (this.getPlayersNum() == 2) {
            setWgtLayout(layoutEat, [0.14, 0.14], [des + ipxSpace, 0.23 - ipxPosY], [0, 0]);
        }

        var layoutEat = leftNode.getChildByName("layout_eatCards");
        setWgtLayout(layoutEat, [0.14, 0.14], [des + ipxSpace, 0.76 + ipxPosY], [0, 0]);

        var layoutEat = rightNode.getChildByName("layout_eatCards");
        setWgtLayout(layoutEat, [0.14, 0.14], [1 - des, 0.75 + ipxPosY], [0, 0]);
    }
};

// 改变手牌大小
playLayer_ziPai.prototype.changeHandCardSize = function(handCard) {
    var src = this.getCardSrc("hand", 1)
    //handCard.loadTexture(src, this.getResType());
    this.loadCardTexture(handCard, src, this.getResType());
    var idx = this.getCardSizeIdx();
    switch (idx) {
        case 0:
            setWgtLayout(handCard, [87 / 1280, 0], [0.27, 0.75], [0, 0]);
            break;
        case 1:
            setWgtLayout(handCard, [75 / 1280, 0], [0.27, 0.75], [0, 0]);
            break;
        case 2:
            setWgtLayout(handCard, [95 / 1280, 0], [0.27, 0.75], [0, 0]);
            break;
    }
};

/**
 * 是否兼容金币场
 * @returns {boolean}
 */
playLayer_ziPai.prototype.isHasTrust = function() {
    return MjClient.data.sData.tData.areaSelectMode.trustTime > 0;
};

/**
 * 是否使用plist
 * @returns {boolean}
 */
playLayer_ziPai.prototype.getResType = function() {
    return 0;
};

