
MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT  = "KEY_ZI_PAI_PLAY_UI_LAYOUT";   //字牌布局
MjClient.KEY_ZI_PAI_GAME_BG_TYPE  = "KEY_ZI_PAI_GAME_BG_TYPE";   //字牌游戏背景类型
MjClient.KEY_ZI_PAI_ZI_PAI_TYPE  = "KEY_ZI_PAI_ZI_PAI_TYPE";   //字牌游戏字体类型
MjClient.KEY_ZI_PAI_HAND_SIZE_TYPE  = "KEY_ZI_PAI_HAND_SIZE_TYPE";   //字牌游戏字体大小类型
MjClient.KEY_ZI_PAI_FAST_EAT_TYPE  = "KEY_ZI_PAI_FAST_EAT_TYPE";   //字牌游戏快速吃牌类型
MjClient.KEY_ZI_PAI_HU_XI_TYPE  = "KEY_ZI_PAI_HU_XI_TYPE";   //字牌游戏 显示胡息
MjClient.KEY_ZI_PAI_XU_XIAN_TYPE  = "KEY_ZI_PAI_XU_XIAN_TYPE";   //字牌游戏 虚线位置
MjClient.KEY_ZI_PAI_SU_DU_TYPE  = "KEY_ZI_PAI_SU_DU_TYPE";   //字牌游戏 动画速度
MjClient.KEY_ZI_PAI_TING_PAI_TYPE  = "KEY_ZI_PAI_TING_PAI_TYPE";   //字牌游戏 听牌开关
MjClient.KEY_ZI_PAI_DOUBLE_CLICK_TYPE  = "KEY_ZI_PAI_DOUBLE_CLICK_TYPE";   //字牌游戏 双击出牌

var ziPai = ziPai || {};
ziPai.acTime = 0.2; //字牌动画 正常速度

//获取字牌布局
ziPai.getUiLayoutType = function(){
    if(MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG && MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ && MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP
        && MjClient.getAppType() != MjClient.APP_TYPE.QXXXGHZ){
        return 1;
    }
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT, 0);
}

//游戏背景
ziPai.getGameBgType = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE, 0);
}

//字牌字体
ziPai.getZiPaiType = function() {
    var defZiTiIndex = 2;
    //安化(还有移植的湘乡玩法)默认选择第二套字牌字体
    if (MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI || (ziPai.isXiangXiangZiPai() && (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ))){
        defZiTiIndex = 1;
    }
    var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, defZiTiIndex);
    if(type != 0 && type != 1 && type != 2){
        type = defZiTiIndex;
    }
    return type;
}

//字牌大小
ziPai.getHandSizeType = function() {
    var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_HAND_SIZE_TYPE, 0);
    if(type != 0 && type != 1 && type != 2){
        type = 0;
    }
    return type;
}

//快速吃牌
ziPai.getHasFastEat = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_FAST_EAT_TYPE, 0);
}

//显示胡息
ziPai.getHasHuXi = function() {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, 0);
}

//出牌虚线
ziPai.getXuXianType = function() {
    var typeIndex = 0;
    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
        typeIndex = 1; //邵阳默认高
    }
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_XU_XIAN_TYPE, typeIndex);
}

//出牌速度
ziPai.getSuDuType = function() {
    var def = 1;
    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
        def = 2;//默认快
    }
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_SU_DU_TYPE, def);
}

// 是否显示听牌
ziPai.getTingPaiType = function(){ 
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_TING_PAI_TYPE, 1);
}

// 是否显示听牌 兼容碰胡
ziPai.getTingPai = function(){
    return ziPai.getTingPaiType() == 1 ? 0 : 1;
}

// 是否可以双击出牌
ziPai.getDoubleClickType = function(){ 
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_DOUBLE_CLICK_TYPE, 1);
}

ziPai.getCardTypes = function(){
    var ziPaiType = ["type1", "type2", "type3"];
    if (MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI){
        ziPaiType = ["type1", "type5", "type3"];
    }else if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || ((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) && ziPai.isXiangXiangZiPai())){
        ziPaiType = ["type1", "type4", "type3"];
    }
    return ziPaiType;
}

//字牌资源路径
ziPai.getCardFilePath = function(){
    var path = "playing/ziPai/";
    var handSizeType = ["big", "small", "super"];
    var ziPaiType = ziPai.getCardTypes();
    var handSize = ziPai.getHandSizeType();
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
        handSizeType = ["big", "small"];
        handSize = handSize > 1 ? 0 : handSize;
    }
    path += handSizeType[handSize];
    path += "/" + ziPaiType[ziPai.getZiPaiType()];
    path += "/";
    return path;
}

ziPai.getNewFilePath = function(oldFile, type){
    var ziPaiType = ziPai.getCardTypes();

    var newFile = "";
    for(var i = 0; i < ziPaiType.length; i++){
        if(oldFile.indexOf(ziPaiType[i]) != -1){
            newFile = oldFile.replace(ziPaiType[i], ziPaiType[type]);
            break;
        }
    }
    
    if (newFile != "" && !jsb.fileUtils.isFileExist(newFile)) {
        newFile = "";
    }

    return newFile != "" ? newFile : oldFile;
}

//布局手牌
ziPai.setWgtLayoutHandCard = function(handCard){
    var sizeType = ziPai.getHandSizeType();
    cc.log("sizeType:", sizeType);

    handCard.loadTexture(ziPai.getCardFilePath() + "hand1.png");

    // handCard.setScale(1);
    if (sizeType == 0) {
        setWgtLayout(handCard, [87 / 1280, 0], [0.27, 0.75], [0, 0]);
    }else if(sizeType == 2){
        setWgtLayout(handCard, [95 / 1280, 0], [0.27, 0.75], [0, 0]);
    } else {
        setWgtLayout(handCard, [75 / 1280, 0], [0.27, 0.75], [0, 0]);
    }
}

//布局出牌虚线
ziPai.setWgtLayoutCutLine = function(cutLine){
    var type = ziPai.getXuXianType();
    if(type == 0){
        setWgtLayout(cutLine,[1, 0.3], [0.5, 0.5], [0, -2]);
    }else{
        setWgtLayout(cutLine,[1, 0.3], [0.5, 0.6], [0, -2]);
    }
}

ziPai.getAutoPassTime = function(){
    var t = 0.9; //标准
    var type = ziPai.getSuDuType();
    if(type == 0){
        //慢
        t = 1.1;
    }else if(type == 1){
        //标准
        t = 0.9;
    }else if(type == 2){
        //快
        t = 0.7;
    }else{
        //急速
        t = 0.7 * 0.8;
    }
    return t;
}

//获取设置里快慢时所对应的时间
ziPai.getAcTime = function(t){
    var acTime = t;
    var type = ziPai.getSuDuType();
    if(type == 0){
        //慢
        acTime = t * 1.2;
    }else if(type == 1){
        //标准
        acTime = t;
    }else if(type == 2){
        //快
        acTime = t * 0.8;
    }else{
        //急速
        acTime = t * 0.8 * 0.8;
    }
    return acTime;
}

//更改动画执行时间
ziPai.changeAcTime = function(){
    var type = ziPai.getSuDuType();
    if(type == 0){
        //慢
        ziPai.acTime = 0.2 * 1.2;
    }else if(type == 1){
        //标准
        ziPai.acTime = 0.2;
    }else if(type == 2){
        //快
        ziPai.acTime = 0.2 * 0.8;
    }else{
        //急速
        ziPai.acTime = 0.16 * 0.8;
    }
}
ziPai.changeAcTime();

ziPai.showCardsHuXi = function(node){
    var tag = 180501;

    var type = ziPai.getHasHuXi();
    if(type == 0){
        node.removeChildByTag(tag);
        return;
    }
    var cards = node.getChildren().slice();
    var len = cards.length;
    var arr = [];
    var w = 0;
    var scale = 1;
    for(var i = 0; i < len; i++){
        var c = cards[i];
        if(c.tag){
            arr.push(c.tag);
            w = c.width;
            scale = c.getScaleX();
        }
    }
    
    var txt = null;
    var sp = node.getChildByTag(tag); 
    if(!sp){
        sp = new cc.Sprite("gameTable/youxizhong-2_29.png");
        sp.setTag(tag);
        sp.setAnchorPoint(0.5,0);
        sp.setScaleX(scale);
        sp.setScaleY(scale);
        sp.x = w * scale * 0.5;
        node.addChild(sp, 100);
        var txt = new cc.LabelTTF("0胡息","fonts/fzcy.ttf",25);
        txt.setTag(tag);
        sp.addChild(txt, 100);
        txt.x = sp.width * 0.5;
        txt.y = sp.height * 0.5;
    }else{
        txt = sp.getChildByTag(tag);
    }

    var hx = MjClient.huzi.getRowHuxi_hand(arr, MjClient.data.sData.tData);
    hx += "胡息";
    txt.setString(hx);
    sp.hx = hx;
    sp.scheduleOnce(function(){
        txt = this.getChildByTag(tag);
        if(txt && cc.sys.isObjectValid(txt)){
            txt.removeFromParent(true);
        }
        if(true){
            var txt = new cc.LabelTTF("0胡息","fonts/fzcy.ttf",25);
            txt.setTag(tag);
            this.addChild(txt, 100);
            txt.x = this.width * 0.5;
            txt.y = this.height * 0.5;
        }
        var hx = MjClient.huzi.getRowHuxi_hand(arr, MjClient.data.sData.tData);
        hx += "胡息";
        txt.setString(hx);
    }.bind(sp),0.1);
}

ziPai.callChangeCardSize = function(){
    if(MjClient.playui && MjClient.playui._downNode 
        && MjClient.playui._downNode.getChildByName("handCard") ){
        var handCard = MjClient.playui._downNode.getChildByName("handCard");
        ziPai.setWgtLayoutHandCard(handCard);
    }
}

ziPai.isXiangXiangZiPai = function(){
    if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI){
        return true;
    }
    return false;
}

ziPai.changePlayUILayout = function(uiNode){
    var downNode  = uiNode.getChildByName("down");
    var rightNode = uiNode.getChildByName("right");
    var leftNode  = uiNode.getChildByName("left");
    var eat = uiNode.getChildByName("eat");

    MjClient.playui.EatVisibleCheck();

    var type = ziPai.getUiLayoutType();
    // 新UI离边的间距
    var des = 0.005;
    var ipxSpace = isIPhoneX() ? 0.04 : 0; //ipx 增加间距

    var eatNode = leftNode.getChildByName("eatNode");
    setWgtLayout(eatNode, [0.14, 0.14], [0.035, 0.74], [0, 0]);
    if(type == 0){
        var eatNode = downNode.getChildByName("eatNode");
        setWgtLayout(eatNode, [0.14, 0.14], [533/1280, 361/720], [-0.2, 0]);//按产品要求:门牌位置向左调整一点
        var outNode = downNode.getChildByName("outNode");
        setWgtLayout(outNode, [0.14, 0.14], [1, 0], [0, 0]);
        var put = downNode.getChildByName("put");
        setWgtLayout(put, [0.35, 0.35], [0.6, 0.6], [0.5, 0]);//按产品要求:出牌位置向右调整一点
        var userData = {scale:put.getScale(), pos:put.getPosition()};
        put.setUserData(userData);

        var outNode = leftNode.getChildByName("outNode");
        setWgtLayout(outNode, [0.14, 0.14], [0.035, 249/720], [0, 0]);

        var outNode = rightNode.getChildByName("outNode");
        if(MjClient.data.sData.tData.maxPlayer == 2){
            setWgtLayout(outNode, [0.14, 0.14], [1, 350/720], [0, 0]);
        }else{
            setWgtLayout(outNode, [0.14, 0.14], [1, 249/720], [0, 0]);
        }

        var chat_btn = uiNode.getChildByName("chat_btn");
        setWgtLayout(chat_btn, [chat_btn.width/1280, 0],[0.97, 0.1875],[0, 0]);

        var voice_btn = uiNode.getChildByName("voice_btn");
        setWgtLayout(voice_btn, [80/1280, 0],[0.91, 0.1875],[0, 0]);

        var cancel = eat.getChildByName("cancel");
        setWgtLayout(cancel, [0, 0.16],[0.78, 0.3],[0, 1.12]);


        // 偏右（新UI布局）
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
            var outNode = downNode.getChildByName("outNode");
            setWgtLayout(outNode, [0.14, 0.14], [1 - des, des], [0, 0]);

            var outNode = leftNode.getChildByName("outNode");
            
            if(MjClient.data.sData.tData.maxPlayer == 2){
                setWgtLayout(outNode, [0.14, 0.14], [des + ipxSpace, 270/720], [0, 0]);
            }else{
                setWgtLayout(outNode, [0.14, 0.14], [des + ipxSpace, 320/720], [0, 0]);
            }

            var outNode = rightNode.getChildByName("outNode");
            if(MjClient.data.sData.tData.maxPlayer == 2){
                setWgtLayout(outNode, [0.14, 0.14], [1 - des, 320/720], [0, 0]);
            }else{
                setWgtLayout(outNode, [0.14, 0.14], [1 - des, 320/720], [0, 0]);
            }

            var eatNode = downNode.getChildByName("eatNode");
            var ty = 300;
            if(MjClient.data.sData.tData.maxPlayer == 2 || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                ty = 330;
            }
            var ipxPosY = isIPhoneX() ? 50 : 0;
            setWgtLayout(eatNode, [0.14, 0.14], [533/1280, (ty + ipxPosY)/720], [-0.2, 0]);
            // if(MjClient.data.sData.tData.maxPlayer == 2){
            //     setWgtLayout(eatNode, [0.14, 0.14], [533/1280, (330 + ipxPosY)/720], [-0.2, 0]);
            // } 
            var eatNode = leftNode.getChildByName("eatNode");
            setWgtLayout(eatNode, [0.14, 0.14], [des + ipxSpace, 0.82], [0, 0]);

            var eatNode = rightNode.getChildByName("eatNode");
            setWgtLayout(eatNode, [0.14, 0.14], [1-des, 0.82], [0, 0]);

            var chat_btn = uiNode.getChildByName("chat_btn");
            setWgtLayout(chat_btn, [chat_btn.width/1280, 0],[0.97, 0.187],[0, 0]);

            var voice_btn = uiNode.getChildByName("voice_btn");
            setWgtLayout(voice_btn, [43/1280, 0],[0.91, 0.1875],[0, 0]);
        }

    }else{
        var eatNode = downNode.getChildByName("eatNode");
        setWgtLayout(eatNode, [0.14, 0.14], [0.035, 0.23], [0, 0]);
        var outNode = downNode.getChildByName("outNode");
        setWgtLayout(outNode, [0.14, 0.14], [0.7, 0.5], [0, 0]);
        var put = downNode.getChildByName("put");
        setWgtLayout(put, [0.35, 0.35], [0.6, 0.6], [0.5, 0]);  //按产品要求:传统布局出牌位置调整为和偏右一致
        var userData = {scale:put.getScale(), pos:put.getPosition()};
        put.setUserData(userData);

        var outNode = leftNode.getChildByName("outNode");
        setWgtLayout(outNode, [0.14, 0.14], [0.12, 0.82], [0, 0]);

        var outNode = rightNode.getChildByName("outNode");
        if(MjClient.data.sData.tData.maxPlayer == 2){
            setWgtLayout(outNode, [0.14, 0.14], [0.70, 0.82], [0, 0]);
        }else{
            setWgtLayout(outNode, [0.14, 0.14], [0.88, 0.82], [0, 0]);
        }

        var chat_btn = uiNode.getChildByName("chat_btn");
        setWgtLayout(chat_btn, [chat_btn.width/1280, 0],[0.97, 0.5],[0, -0.2]);

        var voice_btn = uiNode.getChildByName("voice_btn");
        setWgtLayout(voice_btn, [80/1280, 0],[0.91, 0.5],[0, -0.2]);

        var cancel = eat.getChildByName("cancel");
        setWgtLayout(cancel, [0, 0.16],[0.78, 0.1],[0, 1.12]);

        // 传统（新UI布局）
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){ 
            var outNode = downNode.getChildByName("outNode");
            setWgtLayout(outNode, [0.14, 0.14], [1 - des, des], [0, 0]);

            var outNode = leftNode.getChildByName("outNode");
            setWgtLayout(outNode, [0.14, 0.14], [des + ipxSpace, 0.84], [0, 0]);

            var outNode = rightNode.getChildByName("outNode");
            if(MjClient.data.sData.tData.maxPlayer == 2){
                setWgtLayout(outNode, [0.14, 0.14], [1-des, 0.83], [0, 0]);
            }else{
                setWgtLayout(outNode, [0.14, 0.14], [1-des, 0.83], [0, 0]);
            }

            var ipxPosY = isIPhoneX() ? 0.01 : 0;

            var eatNode = downNode.getChildByName("eatNode");
            setWgtLayout(eatNode, [0.14, 0.14], [des + ipxSpace, 0.23 - ipxPosY], [0, 0]); 

            if(MjClient.data.sData.tData.maxPlayer == 2){
                setWgtLayout(eatNode, [0.14, 0.14], [des + ipxSpace, 0.3 - ipxPosY], [0, 0]);
            }

            var eatNode = leftNode.getChildByName("eatNode");
            setWgtLayout(eatNode, [0.14, 0.14], [des + ipxSpace, 0.76 + ipxPosY], [0, 0]);

            if(MjClient.data.sData.tData.maxPlayer == 2 && (MjClient.gameType != MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN 
                && MjClient.gameType != MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA && MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_PENG_HU && !ziPai.isXiangXiangZiPai)){
                setWgtLayout(eatNode, [0.14, 0.14], [des + ipxSpace, 0.81 + ipxPosY], [0, 0]);
            }

            var eatNode = rightNode.getChildByName("eatNode");
            setWgtLayout(eatNode, [0.14, 0.14], [1-des, 0.76 + ipxPosY], [0, 0]);

            var chat_btn = uiNode.getChildByName("chat_btn");
            setWgtLayout(chat_btn, [chat_btn.width/1280, 0],[0.97, 0.5 - 0.007],[0, -0.2]);

            var voice_btn = uiNode.getChildByName("voice_btn");
            setWgtLayout(voice_btn, [43/1280, 0],[0.91, 0.5],[0, -0.2]);
        }

    }
    
}


var ZiPaiSettingView = cc.Layer.extend({
	jsBind:{
		block:{
			_layout:[[1,1],[0.5,0.5],[0,0],true]
            // _run:function(){ 
            //     // if(isIPhoneX()){ 
            //     //     setWgtLayout(this, [0.1, 0.1],[0.9, 0.2],[0, 0]);
            //     // }else{
            //     //     setWgtLayout(this, [0.1, 0.1],[0.7, 0.2],[0, 0]);
            //     // }
                
            // }
		},
		back:
		{	
            // _layout:[[1,0],[0,0],[0,0]],
            _layout:[[0, 1],[1, 0],[-1, 0]],
            // _run:function(){ 
            //     if(isIPhoneX()){ 
            //         setWgtLayout(this, [0, 1],[1, 0],[-1, 0]); 
            //     }else{
            //         setWgtLayout(this, [1, 0],[0, 0],[0, 0]);
            //     }

            // },
		    close:{
				_click:function(){
					MjClient.setui.removeFromParent(true);
				}
			},

            menu : {
                _click:function(sender){
                    sender._type += 1;
                    if(sender._type > 2){
                        sender._type = 1;
                    }
                    sender.checkType();
                    postEvent("ZPaiSetType",{type:sender._type});
                    util.localStorageEncrypt.setNumberItem("ziPaiMenu", sender._type);
                },
                _run : function(){
                    this._type = util.localStorageEncrypt.getNumberItem("ziPaiMenu", 1);
                    this.frame = this.getChildByName("frame");        // 画面设置
                    this.function = this.getChildByName("function");  // 功能设置

                    this.checkType = function(){
                        if(this._type == 1){
                            this.frame.setVisible(true);
                            this.function.setVisible(false);
                        }else{
                            this.frame.setVisible(false);
                            this.function.setVisible(true);
                        }
                    }
                    this.checkType();
                },
            },

            title : {
                _click:function(sender){
                    sender._type += 1;
                    if(sender._type > 2){
                        sender._type = 1;
                    }
                    sender.checkType();
                    postEvent("ZPaiSetType",{type:sender._type});
                    util.localStorageEncrypt.setNumberItem("ziPaiMenu", sender._type);
                },
                _run : function(){
                    this._type = util.localStorageEncrypt.getNumberItem("ziPaiMenu", 1);
                    this.bg = this.getChildByName("bg");
                    this.huaMianTxt = this.getChildByName("huaMianTxt");
                    this.huaMianTxt.ignoreContentAdaptWithSize(true);
                    this.gongNengTxt = this.getChildByName("gongNengTxt");
                    this.gongNengTxt.ignoreContentAdaptWithSize(true);

                    this.checkType = function(){
                        if(this._type == 1){
                            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                                this.huaMianTxt.visible = true;
                                this.gongNengTxt.visible = false;
                            }else{
                                this.bg.setScaleX(1);
                                this.huaMianTxt.setTextColor(cc.color(158, 81, 43));
                                this.gongNengTxt.setTextColor(cc.color(244, 205, 167));
                            }
                        }else{
                            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                                this.huaMianTxt.visible = false;
                                this.gongNengTxt.visible = true;
                            }else{
                                this.bg.setScaleX(-1);
                                this.gongNengTxt.setTextColor(cc.color(158, 81, 43));
                                this.huaMianTxt.setTextColor(cc.color(244, 205, 167));
                            } 
                        }
                    };
                    this.checkType();
                },
            },

            huaMian : {
                _run : function(){
                    this.visible = false;
                    var type = util.localStorageEncrypt.getNumberItem("ziPaiMenu", 1);
                    if(type === 1)
                    {
                        this.visible = true;
                    }
                },
                _event : {
                    ZPaiSetType : function(ed){
                        if(ed.type == 1){
                            this.visible = true;
                        }else{
                            this.visible = false;
                        }
                    }
                },

                music : {
                    _run : function(){
                        var yyin = this.getChildByName("yyin");
                        var voice_1 = this.getChildByName("voice_1");
                        var voice_2 = this.getChildByName("voice_2");
                        if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
                            && MjClient.gameType != MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN
                            && MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_PENG_HU
                            && MjClient.gameType != MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI
                            && MjClient.gameType != MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI
                            && !ziPai.isXiangXiangZiPai()){
                            yyin.visible = false;
                            voice_1.visible = false;
                            voice_2.visible = false;
                        }


                        this.noEffect = this.getChildByName("noEffect");
                        this.noMusic = this.getChildByName("noMusic");
                        this.noSpeak = this.getChildByName("noSpeak");
                        this.Slider_effect = this.getChildByName("Slider_effect");
                        this.Slider_music = this.getChildByName("Slider_music");
                        this.Slider_speak = this.getChildByName("Slider_speak");
                        this.noEffect.setSelected(util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1);
                        this.noMusic.setSelected(util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1);
                        this.noSpeak.setSelected(util.localStorageEncrypt.getNumberItem("oldSpeakVolume", -1) != -1);

                        MjClient.setui.noEffect = this.noEffect;
                        MjClient.setui.noMusic = this.noMusic;
                        MjClient.setui.noSpeak = this.noSpeak;

                        this.noEffect.addEventListener(function(sender,type)
                        {
                            switch (type) {
                                case ccui.CheckBox.EVENT_SELECTED:
                                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", this.Slider_effect.getPercent() / 100);
                                    this.noEffect.setSelected(true);
                                    this.Slider_effect.setPercent(0);
                                    setEffectsVolume(0);
                                    break;
                                case ccui.CheckBox.EVENT_UNSELECTED:
                                    this.noEffect.setSelected(false);
                                    var v = util.localStorageEncrypt.getNumberItem("oldEffectVolume", 0);
                                    this.Slider_effect.setPercent(v * 100);
                                    setEffectsVolume(v);
                                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                                    break;
                            }
                        },this);

                        this.noMusic.addEventListener(function(sender,type)
                        {
                            switch (type) {
                                case ccui.CheckBox.EVENT_SELECTED:
                                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", this.Slider_music.getPercent() / 100);
                                    this.noMusic.setSelected(true);
                                    this.Slider_music.setPercent(0);
                                    setMusicVolume(0);
                                    break;
                                case ccui.CheckBox.EVENT_UNSELECTED:
                                    this.noMusic.setSelected(false);
                                    var v = util.localStorageEncrypt.getNumberItem("oldMusicVolume", 0);
                                    this.Slider_music.setPercent(v * 100);
                                    setMusicVolume(v);
                                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                                    break;
                            }
                        },this);

                        this.noSpeak.addEventListener(function(sender,type)
                        {
                            switch (type) {
                                case ccui.CheckBox.EVENT_SELECTED:
                                    util.localStorageEncrypt.setNumberItem("oldSpeakVolume", this.Slider_speak.getPercent() / 100);
                                    this.noSpeak.setSelected(true);
                                    this.Slider_speak.setPercent(0);
                                    setSpeakVolume(0);
                                    break;
                                case ccui.CheckBox.EVENT_UNSELECTED:
                                    this.noMusic.setSelected(false);
                                    var v = util.localStorageEncrypt.getNumberItem("oldSpeakVolume", 0);
                                    this.Slider_speak.setPercent(v * 100);
                                    setSpeakVolume(v);
                                    util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                                    break;
                            }
                        },this);
                    },
                    Slider_effect:{
                        _run:function(){ this.setPercent(getEffectsVolume()*100); },
                        _slider:function(sdr,tp){
                            setEffectsVolume(this.getPercent()/100);
                            MjClient.setui.noEffect.setSelected(false);
                            util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                        }
                    },
                    Slider_music:{
                        _run:function(){ this.setPercent(setMusicVolume(-1)*100); },
                        _slider:function(sdr,tp){
                            setMusicVolume(this.getPercent()/100);
                            MjClient.setui.noMusic.setSelected(false);
                            util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                        }
                    },
                    Slider_speak:{
                        _run:function(){ this.setPercent(getSpeakVolume()*100); },
                        _slider:function(sdr,tp){
                            setSpeakVolume(this.getPercent()/100);
                            MjClient.setui.noSpeak.setSelected(false);
                            util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                        }
                    }

                },

                delBtn:{
                    _click:function(){
                        if (!IsRoomCreator() &&
                            (MjClient.data.sData.tData.tState == TableState.waitJoin || MjClient.data.sData.tData.tState == TableState.waitReady))
                        {
                            MjClient.showMsg("确定要退出房间吗？",
                                function() {
                                    MjClient.leaveGame();
                                    // MjClient.setui.removeFromParent(true);
                                    MjClient.delRoomTime = new Date().getTime();//记录点击申请解散房间按钮的时间
                                    if (!MjClient.enterui && !getClubInfoInTable())
                                        MjClient.Scene.addChild(new EnterRoomLayer());
                                },
                                function() {});
                        }
                        else {
                            MjClient.showMsg("是否解散房间？", function () {
                                MjClient.delRoom(true);
                                // MjClient.setui.removeFromParent(true);
                                MjClient.delRoomTime = new Date().getTime();//记录点击申请解散房间按钮的时间
                            }, function(){}, 1);
                        }

                        MjClient.setui.removeFromParent();
                    }
                }
            },

            Text_ver:
                {
                    _visible:true,
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                        if(MjClient.isShenhe == true){
                            this.setVisible(false);
                        }
                        this.setPositionY(this.getPositionY()+(this.getContentSize().height * 1.6));
                        //  一键修复按钮
                        var _fixBtn = new ccui.Button();
                        _fixBtn.loadTextureNormal("game_picture/yijianxiufu.png");
                        _fixBtn.loadTexturePressed("game_picture/yijianxiufu_p.png");
                        _fixBtn.addTouchEventListener(function(sender,Type){
                            switch (Type)
                            {
                                case ccui.Widget.TOUCH_ENDED:
                                    removeUpdataDirectory();
                                    break;
                                default :
                                    break;
                            }
                        });
                        _fixBtn.setPosition(50, -this.getContentSize().height * 2/3);
                        _fixBtn.setScale(0.7);
                        this.addChild(_fixBtn);
                    },
                    _text:function(){
                        return "        ";
                    }
                },

            gongNeng : {
                _run : function(){
                    this.visible = false
                    var type = util.localStorageEncrypt.getNumberItem("ziPaiMenu", 1);
                    if(type === 2)
                    {
                        this.visible = true;
                    }
                },

                _event : {
                    ZPaiSetType : function(ed){
                        if(ed.type == 2){
                            this.visible = true;
                        }else{
                            this.visible = false;
                        }
                    }
                },

                delBtn:{
                    _run : function(){
                        if(MjClient.data.sData.tData.fieldId){
                            this.visible = false;
                        }
                    },
                    _click:function(){
                        if (!IsRoomCreator() &&
                            (MjClient.data.sData.tData.tState == TableState.waitJoin || MjClient.data.sData.tData.tState == TableState.waitReady))
                        {
                            MjClient.showMsg("确定要退出房间吗？",
                                function() {
                                    MjClient.leaveGame();
                                    // MjClient.setui.removeFromParent(true);
                                    MjClient.delRoomTime = new Date().getTime();//记录点击申请解散房间按钮的时间
                                    if (!MjClient.enterui && !getClubInfoInTable())
                                        MjClient.Scene.addChild(new EnterRoomLayer());
                                },
                                function() {});
                        }
                        else {
                            MjClient.showMsg("是否解散房间？", function () {
                                MjClient.delRoom(true);
                                // MjClient.setui.removeFromParent(true);
                                MjClient.delRoomTime = new Date().getTime();//记录点击申请解散房间按钮的时间
                            }, function(){}, 1);
                        }

                        MjClient.setui.removeFromParent();
                    }
                },
                exitBtn:
                {
                    _visible:false,
                    _click:function(){
                       MjClient.logout();
                       MjClient.setui.removeFromParent(true);
                    }
                },
            },
            btn_vibrato:{//振动开关
                _run:function () {
                    var isVibrato = util.localStorageEncrypt.getBoolItem("isVibrato", true);
                    if(isVibrato){
                        this.loadTextureNormal("game_picture/vibrato_on.png");
                    }else {
                        this.loadTextureNormal("game_picture/vibrato_off.png");
                    }
                },
                _click: function(btn) {
                    cc.log("wxd=======_click===");
                    var isVibrato = util.localStorageEncrypt.getBoolItem("isVibrato", true);
                    if(isVibrato){
                        btn.loadTextureNormal("game_picture/vibrato_off.png");
                        util.localStorageEncrypt.setBoolItem("isVibrato", false);
                    }else {
                        btn.loadTextureNormal("game_picture/vibrato_on.png");
                        util.localStorageEncrypt.setBoolItem("isVibrato", true);
                    }
                }
            }
        }
    },
    ctor:function (jsonSrc) {
        this._super();

        var jsonFile = jsonSrc === undefined ? "ziPai_Setting.json" : jsonSrc;
        var setui = ccs.load(jsonFile);
        this.addChild(setui.node);
		this._uiNode = setui.node
        settingView = this;
        MjClient.setui = this;
        BindUiAndLogic(setui.node,this.jsBind);

        this.loadBg();
        this.initParam();
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
            var gongNeng = setui.node.getChildByName("back").getChildByName("gongNeng");
            this.initVibrato(gongNeng);
        }
        return true;
    },

    initVibrato : function(back){
        var vibratoTypes = [];
        var type1 = back.getChildByName("vibratoKai");
        vibratoTypes.push(type1);
        var type2 = back.getChildByName("vibratoGuan");
        vibratoTypes.push(type2);
        this.vibratoTypes = createRadioBoxForCheckBoxs(vibratoTypes,function(index, sender, list){
            util.localStorageEncrypt.setBoolItem("isVibrato", index == 0);
        });
        var flg = util.localStorageEncrypt.getBoolItem("isVibrato", true);
        var index = flg ? 0 : 1;
        this.vibratoTypes.selectItem(index);
        // cc.eventManager.addListener(this.setTextClick(vibratoTypes,0,this.vibratoTypes),vibratoTypes[0].getChildByName("text"));
        // cc.eventManager.addListener(this.setTextClick(vibratoTypes,1,this.vibratoTypes),vibratoTypes[1].getChildByName("text"));
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU){
            var suDu = back.getChildByName("suDu");
            var Text_vibrato = back.getChildByName("Text_vibrato");
            Text_vibrato.y = type1.y = type2.y = suDu.y - (suDu.y - Text_vibrato.y) * 2 / 3;
        }
    },

    loadBg : function (){
        if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA){
            //邵阳 娄底放炮罚 背景特殊处理
            //游戏背景
            var back = this._uiNode.getChildByName("back");
            var huaMian = back.getChildByName("huaMian");
            var url = "setting/louDiFPF/beijing_";
            var beiJingList = [];
            beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg1").getChildByName("Image_1"));
            beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg2").getChildByName("Image_1"));
            beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg3").getChildByName("Image_1"));
            for(var i = 0; i < beiJingList.length; i++){
                var imgUI = beiJingList[i];
                imgUI.loadTexture(url + (i + 1) + ".png");
            }
        }
    },

    onEnter : function(){
        this._super();

        if (this.getName() == "HomeClick") 
        {
            var back = this._uiNode.getChildByName("back");
            var gongNeng = back.getChildByName("gongNeng");
            var delBtn = gongNeng.getChildByName("delBtn");
            var exitBtn = gongNeng.getChildByName("exitBtn");
            if(exitBtn){
                exitBtn.visible = true;
                delBtn.visible = false;
            }
        }
    },

    initParam : function(){
        var back = this._uiNode.getChildByName("back");
        var huaMian = back.getChildByName("huaMian");
        var gongNeng = back.getChildByName("gongNeng");
        var tData = MjClient.data.sData.tData;
        var isPost = tData.tState == TableState.waitEat || tData.tState == TableState.waitPut || tData.tState == TableState.waitCard;
        //出牌语音
        var yuYinList = [];
        yuYinList.push(huaMian.getChildByName("music").getChildByName("voice_1"));
        yuYinList.push(huaMian.getChildByName("music").getChildByName("voice_2"));

        //红拐弯默认本地话
        if (MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
            var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 1);
        }else{
            var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0);
        }
        
        if(ziPai.isXiangXiangZiPai()){
            type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 1);
        }
        this.yuYinRadio = createRadioBoxForCheckBoxs(yuYinList, null, type);
        cc.eventManager.addListener(this.setTextClick(yuYinList,0,this.yuYinRadio),yuYinList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(yuYinList,1,this.yuYinRadio),yuYinList[1].getChildByName("text"));
        this.yuYinRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, index);
        });

        //布局
        var buJuList = [];
        buJuList.push(huaMian.getChildByName("buJu").getChildByName("layout1"));
        buJuList.push(huaMian.getChildByName("buJu").getChildByName("layout2"));
        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT, 0);
        //邵阳放炮罚坐醒玩法禁用布局
        if((MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA)
            && MjClient.data.sData.tData.maxPlayer === 4 && MjClient.data.sData.tData.areaSelectMode.zuoXing){
            type = 1;
            huaMian.getChildByName("buJu").getChildByName("layout1").visible = false;
        }
        this.buJuRadio = createRadioBoxForCheckBoxs(buJuList, null, type);
        cc.eventManager.addListener(this.setTextClick(buJuList,0,this.buJuRadio),buJuList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(buJuList,1,this.buJuRadio),buJuList[1].getChildByName("text"));
        this.buJuRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT, index);
            if(ziPai.isXiangXiangZiPai()){
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_XXZP_LAYOUT_SELECT, index);
            }
            if(isPost){
                postEvent("EZP_layout", {});
            }
        });

        //游戏背景
        var beiJingList = [];
        beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg1"));
        beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg2"));
        beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg3"));
        if(huaMian.getChildByName("beiJing").getChildByName("gameBg4")){
            beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg4"));
        }
        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE, 0);
        var type1 = util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType, 0); 
        if(type != type1){
            //兼容下大厅里的设置
            type = type1;
        }
        this.beiJingRadio = createRadioBoxForCheckBoxs(beiJingList, null, type);
        cc.eventManager.addListener(this.setTextClick(beiJingList,0,this.beiJingRadio),beiJingList[0].getChildByName("Image_1"));
        cc.eventManager.addListener(this.setTextClick(beiJingList,1,this.beiJingRadio),beiJingList[1].getChildByName("Image_1"));
        cc.eventManager.addListener(this.setTextClick(beiJingList,2,this.beiJingRadio),beiJingList[2].getChildByName("Image_1"));
        if(huaMian.getChildByName("beiJing").getChildByName("gameBg4")){
            cc.eventManager.addListener(this.setTextClick(beiJingList,3,this.beiJingRadio),beiJingList[3].getChildByName("Image_1"));
        }
        this.beiJingRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE,  index);
            setCurrentGameBgType(parseInt(index));
            postEvent("changeGameBgEvent", {});
        });

        //字牌字体
        var ziPaiList = [];
        ziPaiList.push(huaMian.getChildByName("ziPai").getChildByName("ziPai1"));
        ziPaiList.push(huaMian.getChildByName("ziPai").getChildByName("ziPai2"));
        ziPaiList.push(huaMian.getChildByName("ziPai").getChildByName("ziPai3"));

        var defZiTiIndex = 2;
        //安化（还有移植的湘乡玩法）默认选择第二套字牌字体
        if (MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI || (ziPai.isXiangXiangZiPai() && (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ))){
            defZiTiIndex = 1;
        }
        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, defZiTiIndex);
        this.ziPaiRadio = createRadioBoxForCheckBoxs(ziPaiList, null, type);
        cc.eventManager.addListener(this.setTextClick(ziPaiList,0,this.ziPaiRadio),ziPaiList[0].getChildByName("Image"));
        cc.eventManager.addListener(this.setTextClick(ziPaiList,1,this.ziPaiRadio),ziPaiList[1].getChildByName("Image"));
        cc.eventManager.addListener(this.setTextClick(ziPaiList,2,this.ziPaiRadio),ziPaiList[2].getChildByName("Image"));
        this.ziPaiRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, index);
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType, index);
            if(isPost){
                postEvent("changeMJBgEvent", type);
            }else{
                ziPai.callChangeCardSize();
            }
        });

        //邵阳娄底改变第二套牌
        if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA 
            || (ziPai.isXiangXiangZiPai() && (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ))){
            ziPaiList[1].getChildByName("Image").loadTexture("setting/ziPai4.png");
        //安化跑胡子改变第二套牌
        }else if(MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI){
            ziPaiList[1].getChildByName("Image").loadTexture("setting/ziPai5.png");
        }else{
            ziPaiList[1].getChildByName("Image").loadTexture("setting/ziPai2.png");
        }

        //湘乡字体移动到功能界面
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
            var ziPaiList = [];
            ziPaiList.push(gongNeng.getChildByName("ziPai").getChildByName("ziPai1"));
            ziPaiList.push(gongNeng.getChildByName("ziPai").getChildByName("ziPai2"));
            ziPaiList.push(gongNeng.getChildByName("ziPai").getChildByName("ziPai3"));
            var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, 1);
            this.ziPaiRadio = createRadioBoxForCheckBoxs(ziPaiList, null, type);
            cc.eventManager.addListener(this.setTextClick(ziPaiList,0,this.ziPaiRadio),ziPaiList[0].getChildByName("Image"));
            cc.eventManager.addListener(this.setTextClick(ziPaiList,1,this.ziPaiRadio),ziPaiList[1].getChildByName("Image"));
            cc.eventManager.addListener(this.setTextClick(ziPaiList,2,this.ziPaiRadio),ziPaiList[2].getChildByName("Image"));
            this.ziPaiRadio.setSelectCallBack(function(index, sender, nodeList){
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, index);
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZPFontType, index);
                if(isPost){
                    postEvent("changeMJBgEvent", type);
                }else{
                    ziPai.callChangeCardSize();
                }
            });            
        }

        //手牌大小
        var sizeTypeList = [];
        sizeTypeList.push(gongNeng.getChildByName("shouPai").getChildByName("da"));
        sizeTypeList.push(gongNeng.getChildByName("shouPai").getChildByName("xiao"));
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            var superCard = gongNeng.getChildByName("shouPai").getChildByName("super");
            var smallCard = gongNeng.getChildByName("shouPai").getChildByName("xiao");
            var tempX = smallCard.x;
            smallCard.x = superCard.x;
            superCard.x = tempX;
            
            sizeTypeList.push(superCard);
        }
        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_HAND_SIZE_TYPE, 0);
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
            var type1 = util.localStorageEncrypt.getNumberItem(MjClient.KEY_XXZP_CARD_SIZE,0);
            if(type != type1){
                type = type1;
            }
        }
        this.sizeTypeRadio = createRadioBoxForCheckBoxs(sizeTypeList, null, type);
        for(var i = 0; i < sizeTypeList.length; i++){
            cc.eventManager.addListener(this.setTextClick(sizeTypeList,i,this.sizeTypeRadio),sizeTypeList[i].getChildByName("text"));
        }
        this.sizeTypeRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_HAND_SIZE_TYPE, index);
            if(ziPai.isXiangXiangZiPai() || MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN ||
                MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA){
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_XXZP_CARD_SIZE, index);
                if(isPost){
                    postEvent("changeMJBgSize", index);
                }
            }else{
                if(isPost){
                    postEvent("changeMJBgEvent", ziPai.getZiPaiType());
                }else{
                    ziPai.callChangeCardSize();
                }
            }
        });

        //快速吃牌
        var fastEatList = [];
        fastEatList.push(gongNeng.getChildByName("chiPai").getChildByName("no"));
        fastEatList.push(gongNeng.getChildByName("chiPai").getChildByName("yes"));
        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_FAST_EAT_TYPE, 0);
        this.fastEatRadio = createRadioBoxForCheckBoxs(fastEatList, null, type);
        cc.eventManager.addListener(this.setTextClick(fastEatList,0,this.fastEatRadio),fastEatList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(fastEatList,1,this.fastEatRadio),fastEatList[1].getChildByName("text"));
        this.fastEatRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_FAST_EAT_TYPE, index);
            postEvent("EZP_faseEat", {});
        });

        //显示胡息
        var huXiList = [];
        huXiList.push(gongNeng.getChildByName("huXi").getChildByName("no"));
        huXiList.push(gongNeng.getChildByName("huXi").getChildByName("yes"));
        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, 0);
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
            huXiList = [];
            huXiList.push(gongNeng.getChildByName("huXi").getChildByName("yes"));
            huXiList.push(gongNeng.getChildByName("huXi").getChildByName("no"));
            type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, 0);
            // var type1 = util.localStorageEncrypt.getNumberItem(MjClient.KEY_XXZP_HUXISHOW_SELECT,0);
            // if(type != type1){
            //     type = type1;
            // }
        }
        this.huXiRadio = createRadioBoxForCheckBoxs(huXiList, null, type);
        cc.eventManager.addListener(this.setTextClick(huXiList,0,this.huXiRadio),huXiList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(huXiList,1,this.huXiRadio),huXiList[1].getChildByName("text"));
        this.huXiRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, index);
            if(isPost){
                postEvent("EZP_huXi", {});
            }
        });

        //出牌虚线
        var xuXianList = [];
        xuXianList.push(gongNeng.getChildByName("xuXian").getChildByName("bz"));
        xuXianList.push(gongNeng.getChildByName("xuXian").getChildByName("gao"));
        var typeIndex = 0;
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            typeIndex = 1; //邵阳默认高
        }
        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_XU_XIAN_TYPE, typeIndex);
        this.xuXianRadio = createRadioBoxForCheckBoxs(xuXianList, null, type);
        cc.eventManager.addListener(this.setTextClick(xuXianList,0,this.xuXianRadio),xuXianList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(xuXianList,1,this.xuXianRadio),xuXianList[1].getChildByName("text"));
        this.xuXianRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_XU_XIAN_TYPE, index);
            postEvent("EZP_xuXian", {});
        });

        //出牌速度
        var suDuList = [];
        suDuList.push(gongNeng.getChildByName("suDu").getChildByName("yb"));//慢
        suDuList.push(gongNeng.getChildByName("suDu").getChildByName("bz"));//标准
        suDuList.push(gongNeng.getChildByName("suDu").getChildByName("js"));//快
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
           suDuList.push(gongNeng.getChildByName("suDu").getChildByName("js1")); //急速
        }
        var type = ziPai.getSuDuType();
        this.suDuRadio = createRadioBoxForCheckBoxs(suDuList, null, type);
        cc.eventManager.addListener(this.setTextClick(suDuList,0,this.suDuRadio),suDuList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(suDuList,1,this.suDuRadio),suDuList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(suDuList,2,this.suDuRadio),suDuList[2].getChildByName("text"));
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
           cc.eventManager.addListener(this.setTextClick(suDuList,3,this.suDuRadio),suDuList[3].getChildByName("text"));
        }
        
        this.suDuRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_SU_DU_TYPE, index);
            postEvent("EZP_suDu", {});
            ziPai.changeAcTime();
        });

        // 听牌提示控制
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            //听牌提示
            var tingPaiEat = [];
            tingPaiEat.push(gongNeng.getChildByName("tingPai").getChildByName("no"));
            tingPaiEat.push(gongNeng.getChildByName("tingPai").getChildByName("yes"));
            var type = ziPai.getTingPaiType(); 
            this.tingPaiEat = createRadioBoxForCheckBoxs(tingPaiEat, null, type);
            cc.eventManager.addListener(this.setTextClick(tingPaiEat,0,this.tingPaiEat),tingPaiEat[0].getChildByName("text"));
            cc.eventManager.addListener(this.setTextClick(tingPaiEat,1,this.tingPaiEat),tingPaiEat[1].getChildByName("text"));
            this.tingPaiEat.setSelectCallBack(function(index, sender, nodeList){
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_TING_PAI_TYPE, index);
                if(isPost){
                    postEvent("EZP_tingPai", {});
                }
                cc.log("发送消息开启或者关闭听牌提示内容"); 
            }); 
        }

        // 双击出牌控制
        if(ziPai.isXiangXiangZiPai()){
            //喜欢的牌就双击它
            var doubleClick = [];
            doubleClick.push(gongNeng.getChildByName("doubleClickToPut").getChildByName("no"));
            doubleClick.push(gongNeng.getChildByName("doubleClickToPut").getChildByName("yes"));
            var type = ziPai.getDoubleClickType(); 
            this.doubleClick = createRadioBoxForCheckBoxs(doubleClick, null, type);
            cc.eventManager.addListener(this.setTextClick(doubleClick,0,this.doubleClick),doubleClick[0].getChildByName("text"));
            cc.eventManager.addListener(this.setTextClick(doubleClick,1,this.doubleClick),doubleClick[1].getChildByName("text"));
            this.doubleClick.setSelectCallBack(function(index, sender, nodeList){
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_DOUBLE_CLICK_TYPE, index);
                postEvent("EZP_doubleClick", {});
            }); 
        }

        if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && ziPai.isXiangXiangZiPai()){
            gongNeng.getChildByName("tingPai").visible = false;
            gongNeng.getChildByName("doubleClickToPut").visible = true;
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU){
            var huXi = gongNeng.getChildByName("huXi");
            var xuXian = gongNeng.getChildByName("xuXian");
            var suDu = gongNeng.getChildByName("suDu");
            huXi.visible = false;
            suDu.y = xuXian.y;
            xuXian.y = huXi.y;
        }
    },

    //创建房间 点击范围扩大 使得文字也能点击
    setTextClick:function (listnode,number,radio) 
    {   
        var that = this;
        return cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {

                var target = event.getCurrentTarget();
                var parent = target;
                for (; parent; parent = parent.parent)
                {
                    if (!parent.visible)
                        return false;
                }

                var pos = target.getParent().convertTouchToNodeSpace(touch); // 世界坐标转换 (子节点相对于父节点的位置)

                // 如果触碰起始地点在本区域中
                var box = target.getBoundingBox();
                box.width += 10;
                box.height += 10;
                box.x -= 10;
                box.y -= 10;
                if(!cc.rectContainsPoint(box, pos))
                {
                    return false;
                }
                return true;
            },
            onTouchEnded: function (touch, event) { 
                var tData = MjClient.data.sData.tData;
                var isPost = tData.tState != TableState.roundFinish;
                var target = event.getCurrentTarget();
                var pos = target.getParent().convertTouchToNodeSpace(touch); // 世界坐标转换 (子节点相对于父节点的位置)
                if (listnode) {
                    for (var i = 0; i < listnode.length; i++) {
                        if (i==number) {
                            listnode[i].setSelected(true); 
                            radio.selectItem(i);
                        }else{
                            listnode[i].setSelected(false);
                        } 
                    }

                    //游戏语音
                    if (radio == that.yuYinRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, number);
                    }

                    //游戏布局
                    if (radio == that.buJuRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT, number);
                        if(ziPai.isXiangXiangZiPai()){
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_XXZP_LAYOUT_SELECT, number);
                        }
                        if(!isPost){
                            return;
                        }
                        postEvent("EZP_layout", {}); 
                    }

                    //游戏背景
                    if (radio == that.beiJingRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE, number);
                        setCurrentGameBgType(number);
                        postEvent("changeGameBgEvent", {});
                    }

                    //字牌字体
                    if (radio == that.ziPaiRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, number);
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType, number);
                        if(!isPost){
                            ziPai.callChangeCardSize();
                            return;
                        }
                        postEvent("changeMJBgEvent", {}); 
                    }

                    //字牌大小
                    if (radio == that.sizeTypeRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_HAND_SIZE_TYPE, number);
                        if(ziPai.isXiangXiangZiPai() ||　MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN ||
                            MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA){
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_XXZP_CARD_SIZE, number);
                            if(!isPost){
                                return;
                            }
                            postEvent("changeMJBgSize", number);
                        }else{
                            if(!isPost){
                                ziPai.callChangeCardSize();
                                return;
                            }

                            postEvent("changeMJBgEvent", ziPai.getZiPaiType());
                        }
                    }

                    //快速吃牌
                    if (radio == that.fastEatRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_FAST_EAT_TYPE, number);
                        postEvent("EZP_faseEat", {});
                    }

                    //显示胡息
                    if (radio == that.huXiRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, number);
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_XXZP_HUXISHOW_SELECT, number);
                        }
                        if(!isPost){
                            return;
                        }
                        postEvent("EZP_huXi", {});
                    }

                    //出牌虚线
                    if (radio == that.xuXianRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_XU_XIAN_TYPE, number);
                        postEvent("EZP_xuXian", {});
                    }

                    //出牌速度
                    if (radio == that.suDuRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_SU_DU_TYPE, number);
                        postEvent("EZP_suDu", {});
                        ziPai.changeAcTime();
                    }
                    
                    // 听牌提示
                    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                        if (radio == that.tingPaiEat){
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_TING_PAI_TYPE, number);
                            if(!isPost){
                                return;
                            }
                            postEvent("EZP_tingPai", {});
                        }
                    } 

                    // 双击出牌
                    if(ziPai.isXiangXiangZiPai()){
                        if (radio == that.doubleClick){
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_DOUBLE_CLICK_TYPE, number);
                            postEvent("EZP_doubleClick", {});
                        }
                    }

                }else{
                    // 如果触碰起始地点在本区域中
                    if(!cc.rectContainsPoint(target.getBoundingBox(), pos))
                        return;
                    target.parent.setSelected(!target.parent.isSelected());
                }
                
            }
        });       
    }
});