MjClient.webViewLayer = null;

/***
 * WebViewLayer用于用户协议界面，玩法帮助界面    —— by Tom
 * 山西, 岳阳, 江苏，淮安，徐州, 海安，南通加在自己对应的Panel上
 */
WebViewLayer=cc.Layer.extend({
    webView: null,
    gameList: null,
    viewType: null,
    ctor:function () {
        this._super();
        var that = this;
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
            var web = ccs.load("WebView_3.0.json");
        else
            var web = ccs.load("WebView.json");
        var block = web.node.getChildByName("block");
        var bkNode = web.node.getChildByName("back");
        var node_friendCard = bkNode.getChildByName("node_friendCard");
        var gamePanel = bkNode.getChildByName("gamePanel");
        var pactPanel = bkNode.getChildByName("pactPanel");
        var cSize = bkNode.getCustomSize();
        gamePanel && gamePanel.setVisible(false);
        pactPanel && pactPanel.setVisible(false);

        node_friendCard.visible = false;//by sking 不需要分类

        this.viewType = MjClient.uiPara.help ? "viewHelp" : "viewPact";
        cc.log("=========================this.viewType = " + this.viewType);
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], 2);
        setWgtLayout(bkNode,[1, 1], [0.5, 0.5], [0, 0]);
        if(MjClient.getAppType() === MjClient.APP_TYPE.DQSHANXIMJ)
            setWgtLayout(bkNode,[0.93, 0.93], [0.5, 0.5], [0, 0]);

        bkNode.getChildByName("yes").addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    that.close();
                    break;
                default :
                    break;
            }
        }, this);


        if (ccui.WebView)
        {
            this.webView = new ccui.WebView();
            this.webView.name = "webView";
            this.webView.setScalesPageToFit(true);
            this.webView.setEventListener(ccui.WebView.EventType.LOADED, function () {
                that.webView.visible = true;
            });
            this.webView.visible = false;

            cc.log("=========================ccui.WebView is true = ");
        }


        // 需要区分地区，进行赋值操作
        var curType = "";
        var appType = MjClient.getAppType();
        var appTypeObj = {
            "jinzhong": MjClient.APP_TYPE.TXJINZHONGMJ,
            "yueyang": MjClient.APP_TYPE.QXYYQP,
            "jiangsu": MjClient.APP_TYPE.QXJSMJ,
            "nantong": MjClient.APP_TYPE.QXNTQP,
            "xuzhou" : MjClient.APP_TYPE.QXXZMJ,
            "huaian" : MjClient.APP_TYPE.QXHAMJ,
            "haian"  : MjClient.APP_TYPE.QXHAIANMJ,
            "ylhunan": MjClient.APP_TYPE.YLHUNANMJ,
            "guizhou": MjClient.APP_TYPE.AYGUIZHOUMJ,
            "sichuan": MjClient.APP_TYPE.LYSICHUANMJ,
            "shanxi": MjClient.APP_TYPE.DQSHANXIMJ,
            "hubei": MjClient.APP_TYPE.HUBEIMJ,
        };

        for (var key in appTypeObj)
        {
            if (appType === appTypeObj[key])
            {
                curType = key;
            }
        }


        switch (this.viewType)
        {

            // viewHelp 玩法帮助界面模块
            case "viewHelp":
            {
                var gameTypeList = [];
                var gameClass = JSON.parse(MjClient.systemConfig.gameClass);
                for (var i = 0; i < gameClass.length; i++)
                {
                    gameTypeList = gameTypeList.concat(GameTypeList[gameClass[i]]());
                }

                cc.log("======================================gameTypeList = " + JSON.stringify(gameTypeList));

                if (MjClient.isAroundBeijing() || MjClient.isShenhe)
                {
                    gameTypeList = [gameTypeList[0]];
                    if (curType === "nantong")
                    {
                        gameTypeList = [MjClient.GAME_TYPE.RU_GAO];
                    }
                }

                function clickButton(target)
                {
                    var gameList = target.getParent();

                    for (var i = 0; i < gameTypeList.length; i++)
                    {
                        var index = gameTypeList[i];
                        var item = gameList.getChildByTag(index);
                        if (index == target.getTag())
                        {
                            item.touchEnabled = false;
                            item.bright = false;

                            if (item.normalText && item.selectText) {
                                item.normalText.setVisible(false);
                                item.selectText.setVisible(true);
                            }
                        } else {
                            item.touchEnabled = true;
                            item.bright = true;

                            if (item.normalText && item.selectText) {
                                item.normalText.setVisible(true);
                                item.selectText.setVisible(false);
                            }
                        }


                    }
                    if (GameHelpUrl[target.getTag()] && MjClient.systemConfig[GameHelpUrl[target.getTag()]])
                    {
                        var url = MjClient.systemConfig[GameHelpUrl[target.getTag()]];
                        //MjClient.showToast("============help webView000000 url = " + JSON.stringify(url));
                        if (that.webView) that.webView.loadURL(url);

                    }
                    else if (GameHelpUrl[target.getTag()] && (GameHelpUrl[target.getTag()].indexOf("http://") == 0 || 
                        GameHelpUrl[target.getTag()].indexOf("https://") == 0)) {

                        //MjClient.showToast("============help webView1111111 url = " + JSON.stringify(GameHelpUrl[target.getTag()]));
                        if (that.webView) that.webView.loadURL(GameHelpUrl[target.getTag()]);
                    }
                    else {
                        MjClient.showToast("没有配置帮助文档 ID :" + target.getTag())
                    }
                }


                //---------------分页处理获取玩法列表-------------------------------------
                if (curType === "jinzhong" || curType === "shanxi" || curType === "yueyang" || curType === "hubei" || curType === "ylhunan" || curType === "guizhou")
                {
                    var _btnNodeArray = [];
                    var _path = "createNewPng/gameTypeBtn/";

                    if(curType === "jinzhong" || curType === "shanxi") {
                        var _list1 = MjClient.gameListConfig.majiangList || [];
                        var _list2 = MjClient.gameListConfig.jinZhongList || [];
                        var _list3 = MjClient.gameListConfig.lvLiangList || [];
                        var _list4 = MjClient.gameListConfig.linFenList || [];
                        var _list5 = MjClient.gameListConfig.xinZhouList || [];
                        var _list6 = MjClient.gameListConfig.daTongList || [];
                        var _list7 = MjClient.gameListConfig.yunChengList || [];
                        var _btnNameArray = ["all", "jinzhong", "lvliang", "linfen", "xinzhou", "datong", "yuncheng"];
                        this.gameList = [_list1, _list2, _list3, _list4, _list5, _list6, _list7];
                        gameTypeList = this.gameList[0];
                    }else if(curType === "yueyang" || curType === "ylhunan" || curType === "hubei") {

                        var _list1 = MjClient.gameListConfig.majiangList || [];
                        var _list2 = MjClient.gameListConfig.pokerList || [];
                        var _list3 = MjClient.gameListConfig.zipaiList || [];
                        var _btnNameArray = ["majiang", "poker", "zipai"];
                        this.gameList = [_list1, _list2, _list3];
                        gameTypeList = this.gameList[0];
                    }else if(curType === "guizhou") {

                        var _list1 = MjClient.gameListConfig.majiangList || [];
                        var _list2 = MjClient.gameListConfig.pokerList || [];
                        var _btnNameArray = ["majiang", "poker"];
                        this.gameList = [_list1, _list2];
                        gameTypeList = this.gameList[0];
                    }

                    for (var i = 0; i < _btnNameArray.length; i++) {
                        _btnNodeArray[i] = node_friendCard.getChildByName("btn_" + i);
                        if (_btnNodeArray[i]) {
                            if (i >= _btnNodeArray.length) {
                                _btnNodeArray[i].visible = false;
                                break;
                            }

                            _btnNodeArray[i].setTag(i);
                            _btnNodeArray[i].addTouchEventListener(function (sender, Type) {
                                switch (Type) {
                                    case ccui.Widget.TOUCH_ENDED:
                                        var idx = sender.getTag();
                                        updateTab(idx);
                                        break;
                                    default:
                                        break;
                                }
                            }, this);

                        }
                    };

                    var that = this;
                    var updateTab = function (tabIndex)
                    {
                        if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
                            for(var i = 0;i < _btnNodeArray.length;i++)
                            {
                                _btnNodeArray[i].setEnabled(tabIndex != i);
                                _btnNodeArray[i].getChildByName("normalImg").setVisible(tabIndex != i);
                                _btnNodeArray[i].getChildByName("selectImg").setVisible(tabIndex == i);
                            }
                        }
                        else {
                            for (var i = 0; i < _btnNodeArray.length; i++) {
                                if (tabIndex != i) {
                                    _btnNodeArray[i].loadTextureNormal(_path + _btnNameArray[i] + "_s" + ".png");
                                    _btnNodeArray[i].loadTexturePressed(_path + _btnNameArray[i] + "_s" + ".png");
                                }
                                else {
                                    _btnNodeArray[i].loadTextureNormal(_path + _btnNameArray[i] + ".png");
                                    _btnNodeArray[i].loadTexturePressed(_path + _btnNameArray[i] + ".png");
                                }
                            }
                        }

                        var gameListNode = bkNode.getChildByName("gameList");
                        gameListNode.setScrollBarEnabled(false);
                        gameListNode.removeAllChildren();
                        gameTypeList = that.gameList[tabIndex];
                        var gameItem = gameListNode.getParent().getChildByName("item");
                        for (var i = 0; i < gameTypeList.length; i++) {
                            var index = gameTypeList[i];
                            var newitem = gameItem.clone();
                            if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
                                newitem.normalText = newitem.getChildByName("normalText");
                                newitem.selectText = newitem.getChildByName("selectText");
                                newitem.normalText.ignoreContentAdaptWithSize(true);
                                newitem.selectText.ignoreContentAdaptWithSize(true);
                                newitem.normalText.setString(GameCnName[index]);
                                newitem.selectText.setString(GameCnName[index]);
                            }
                            else {
                                var textureNormal, texturePress;
                                cc.log("--------------1111--------"+index);
                                var preStr = GameButton[index];
                                textureNormal = preStr + "_n.png";
                                texturePress = preStr + "_s.png";
                                newitem.loadTextures(textureNormal, texturePress, texturePress);
                            }
                            newitem.setTag(index);
                            newitem.addClickEventListener(clickButton);
                            gameListNode.pushBackCustomItem(newitem);
                        }

                        var gameType = util.localStorageEncrypt.getNumberItem("KEY_GAME_TYPE", gameTypeList[0]);

                        gameType=getsamegametype(gameType);
                        if (gameTypeList.indexOf(gameType) < 0) {

                            gameType = gameTypeList[0];
                            cc.log("找不到");
                        }
                        cc.log("找到");
                        clickButton(gameListNode.getChildByTag(gameType));
                       // if(TableState.waitJoin==)
                        if(gameTypeList.indexOf(gameType)>5)
                        {
                            gameListNode.jumpToBottom();
                        }else{
                            gameListNode.jumpToTop();
                        }

                    };

                    var idx = util.localStorageEncrypt.getNumberItem("KEY_GAME_LIST", 0);
                    if (idx >= that.gameList.length) {
                        idx = that.gameList.length - 1;
                    }
                    //判断是否查看规则跳转过来
                    if(MjClient.uiPara.tabindex>=0)
                    {
                        idx=MjClient.uiPara.tabindex;
                        util.localStorageEncrypt.setNumberItem("KEY_GAME_TYPE", MjClient.uiPara.url);
                    }

                    updateTab(idx);
                }
                //----------------------------------------------------------------------------------------
                else {
                    bkNode.getChildByName("gameList").visible = true;

                    var gameListNode = bkNode.getChildByName("gameList");
                    gameListNode.setScrollBarEnabled(false);

                    var gameItem = gameListNode.getParent().getChildByName("item");
                    gameListNode.removeAllChildren();

                    for (var i = 0; i < gameTypeList.length; i++) {
                        var index = gameTypeList[i];
                        var newitem = gameItem.clone();
                        var textureNormal, texturePress;
                        var preStr = GameButton[index];
                        textureNormal = preStr + "_n.png";
                        texturePress = preStr + "_s.png";
                        newitem.loadTextures(textureNormal, texturePress, texturePress);
                        newitem.setTag(index);
                        newitem.addClickEventListener(clickButton);
                        gameListNode.pushBackCustomItem(newitem);
                    }

                    var gameType = util.localStorageEncrypt.getNumberItem("KEY_GAME_TYPE", gameTypeList[0]);
                    if (MjClient.uiPara.url != null && cc.isNumber(MjClient.uiPara.url)) {
                        gameType = MjClient.uiPara.url;
                    }
                    if (gameTypeList.indexOf(gameType) < 0) {
                        gameType = gameTypeList[0];
                    }
                    clickButton(gameListNode.getChildByTag(gameType));
                }


                if(that.webView)
                {
                    if(curType === "shanxi" || curType === "jinzhong" || curType === "yueyang" ||
                        curType === "guizhou" || curType === "nantong" || curType === "jiangsu" || curType === "hubei" ||
                        curType === "ylhunan" || curType === "xuzhou" || curType === "huaian" || curType === "haian")
                    {
                        gamePanel && gamePanel.setVisible(true);
                        that.webView.setAnchorPoint(cc.p(0, 0));
                        that.webView.setContentSize(gamePanel.width, gamePanel.height);
                        cc.log("===================webView===================");
                        gamePanel.addChild(that.webView);
                    }
                    else
                    {
                        that.webView.setContentSize(cSize.width * 0.77 * bkNode.scaleX, cSize.height * 0.85 * bkNode.scaleY);
                        that.webView.setPosition(bkNode.x * 1.136, bkNode.y * 0.97);
                        web.node.addChild(that.webView);
                    }
                }
                break;
            }


            // viewPact 用户协议界面模块
            case "viewPact":
            {
                // 需要隐藏的节点
                var visibleObj = {
                    "play": false,
                    "bg_game": false,
                    "bg_left": false,
                    "gameList": false,
                    "text_wanfa": false,
                    "node_friendCard": false,
                    "bg_wanfa": false,
                    "bg_xieyi": true,
                    "title": false,
                    "Image_3": false,
                    "item": false,
                    "gameListBg": false
                };

                for (var key in visibleObj) {
                    if (bkNode.getChildByName(key)) {
                        bkNode.getChildByName(key).visible = visibleObj[key];
                    }
                }

                if (that.webView)
                {
                    if(curType === "jinzhong" || curType === "yueyang" || curType === "nantong" || curType === "ylhunan" ||
                        curType === "jiangsu" || curType === "xuzhou" || curType === "huaian" || curType === "haian" ||
                        curType === "guizhou" || curType === "shanxi" || curType === "hubei")
                    {
                        pactPanel && pactPanel.setVisible(true);
                        that.webView.setAnchorPoint(cc.p(0, 0));
                        that.webView.setContentSize(pactPanel.width, pactPanel.height);
                        pactPanel.addChild(that.webView);
                    }
                    else
                    {
                        that.webView.setContentSize(cSize.width * 0.97 * bkNode.scaleX, cSize.height * 0.9 * bkNode.scaleY);
                        that.webView.setPosition(bkNode.x * 0.98, bkNode.y * 0.95);
                        web.node.addChild(that.webView);

                    }
                    that.webView.loadURL(MjClient.uiPara.url);
                }
                break;
            }

        }

        this.addChild(web.node);
        if (cc.sys.isObjectValid(MjClient.webViewLayer))
        {
            MjClient.webViewLayer.close();
        }
        MjClient.webViewLayer = this;
    },
    close:function()
    {
        this.webView = null;
        MjClient.webViewLayer=null;
        this.removeFromParent(true);
    }
});
function getsamegametype(tmptype)
{
    if (tmptype == MjClient.GAME_TYPE.LING_SHI_BAN_MO)
    {
        //灵石半摸用灵石编龙的入口
        tmptype = MjClient.GAME_TYPE.LING_SHI_BIAN_LONG;
    }
    if (tmptype == MjClient.GAME_TYPE.PING_YAO_KOU_DIAN)
    {
        //平遥扣点用平遥麻将的入口
        tmptype = MjClient.GAME_TYPE.PING_YAO_MA_JIANG;
    }
    if (tmptype == MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN)
    {
        //介休扣点用介休1点3的入口
        tmptype = MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3;
    }

    if (tmptype == MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN)
    {
        //晋中财神用晋中麻将的
        tmptype = MjClient.GAME_TYPE.JIN_ZHONG_MJ;
    }
    return tmptype;
}

WebViewLayer_yongzhou=cc.Layer.extend({
    webView:null,
    ctor:function ()
    {
        this._super();
        var that = this;
        var web = ccs.load("WebView.json");
        var block = web.node.getChildByName("block");
        var bkNode = web.node.getChildByName("back");
        var node_friendCard = bkNode.getChildByName("node_friendCard");
        var gamePanel = bkNode.getChildByName("gamePanel");
        var pactPanel = bkNode.getChildByName("pactPanel");
        var cSize = bkNode.getCustomSize();
        gamePanel && gamePanel.setVisible(false);
        pactPanel && pactPanel.setVisible(false);
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], 2);
        setWgtLayout(bkNode,[1, 1], [0.5, 0.5], [0, 0]);

        bkNode.getChildByName("yes").addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    that.close();
                    break;
                default :
                    break;
            }
        },this);

        var node_friendCard = bkNode.getChildByName("node_friendCard");
        if(node_friendCard)
        {
            node_friendCard.setLocalZOrder(1);
        }

        // 不是玩法弹框，隐藏“玩法”标题
        var title = bkNode.getChildByName("play");
        if(title && !MjClient.uiPara.help) title.setVisible(false);
        if(node_friendCard &&　!MjClient.uiPara.help){
            node_friendCard.setVisible(false);
        }

        if (ccui.WebView)
        {
            this.webView = new ccui.WebView();
            this.webView.name="webView";
            this.webView.setScalesPageToFit(true);
            this.webView.setEventListener(ccui.WebView.EventType.LOADED, function () {
                that.webView.visible = true;
            });
            this.webView.visible = false;
        }

        if (MjClient.uiPara.help)
        {
            var _gameTypeList=[];
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ)
            {
                _gameTypeList[0] = MjClient.gameListConfig.paohuziList;
                _gameTypeList[1] = MjClient.gameListConfig.doudizhulist;
            }
            else
            {
                _gameTypeList[0] = MjClient.gameListConfig.paohuziList;
                _gameTypeList[1] = [];
            }

            var gameTypeList = [];
            for(var i = 0 ;i < _gameTypeList.length;i++)
            {
                var _list = _gameTypeList[i];
                if(_list)
                {
                    for(var j = 0;j < _list.length;j++)
                    {
                        gameTypeList[gameTypeList.length] = _list[j];
                    }
                }
            }

            //版号
            if(MjClient.isAroundBeijing() || MjClient.isShenhe)
            {
                gameTypeList = [gameTypeList[0]];
            }

            function clickButton(target)
            {
                var gameList = target.getParent();
                for (var i = 0; i < gameTypeList.length; i++){
                    var index = gameTypeList[i];
                    var item = gameList.getChildByTag(index);
                    if (index == target.getTag()){
                        item.touchEnabled = false;
                        item.bright = false;
                    }else{
                        item.touchEnabled = true;
                        item.bright = true;
                    }
                }

                if(GameHelpUrl[target.getTag()] && MjClient.systemConfig[GameHelpUrl[target.getTag()]])
                {
                    var url = MjClient.systemConfig[GameHelpUrl[target.getTag()]];
                    if (that.webView)
                        that.webView.loadURL(url);
                }
                else if (GameHelpUrl[target.getTag()] && (GameHelpUrl[target.getTag()].indexOf("http://") == 0 || 
                    GameHelpUrl[target.getTag()].indexOf("https://") == 0)) {
                    if (that.webView) that.webView.loadURL(GameHelpUrl[target.getTag()]);
                }
                else
                {
                    MjClient.showToast("没有配置帮助文档 ID :" + target.getTag())
                }
            }

            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ){
                var resetArr = [];
                if(MjClient.gameListConfig.paohuziList){
                    resetArr = resetArr.concat(MjClient.gameListConfig.paohuziList);
                }
                if(MjClient.gameListConfig.doudizhulist){
                    resetArr = resetArr.concat(MjClient.gameListConfig.doudizhulist);
                }
                _gameTypeList = [];
                var type_arr = ["ziPai","maJiang","puKe"];
                for(var i = 0;i < type_arr.length;i++){
                    _gameTypeList[i] = [];
                }
                
                for(var i = 0;i < resetArr.length;i++){
                    if(GameClass[resetArr[i]] == MjClient.GAME_CLASS.PAO_HU_ZI){
                        _gameTypeList[0].push(resetArr[i]);
                    }else if(GameClass[resetArr[i]] == MjClient.GAME_CLASS.MA_JIANG){
                        _gameTypeList[1].push(resetArr[i]);
                    }else if(GameClass[resetArr[i]] == MjClient.GAME_CLASS.PAO_DE_KUAI){
                        _gameTypeList[2].push(resetArr[i]);
                    }else if(GameClass[resetArr[i]] == MjClient.GAME_CLASS.DOU_DI_ZHU){
                        _gameTypeList[2].push(resetArr[i]);
                    }
                }

                gameTypeList = _gameTypeList[0];
                var typeBtn_arr = [];
                for (var i = 0; i < type_arr.length; i++){
                    typeBtn_arr[i] = node_friendCard.getChildByName("type_" + i);
                    if (typeBtn_arr[i]) {
                        if (i >= type_arr.length) {
                            typeBtn_arr[i].visible = false;
                            break;
                        }

                        typeBtn_arr[i].setTag(i);
                        typeBtn_arr[i].addTouchEventListener(function (sender, Type) {
                            switch (Type) {
                                case ccui.Widget.TOUCH_ENDED:
                                    var idx = sender.getTag();
                                    updateTab(idx);
                                    break;
                                default:
                                    break;
                            }
                        }, this);

                    }
                }

                var _path = "createNewPng/gameTypeBtn/";
                var updateTab = function (tabIndex) {
                    for (var i = 0; i < typeBtn_arr.length; i++) {
                        if (tabIndex != i) {
                            typeBtn_arr[i].loadTextureNormal(_path + type_arr[i] + "_n" + ".png");
                            typeBtn_arr[i].loadTexturePressed(_path + type_arr[i] + "_s" + ".png");
                        }
                        else {
                            typeBtn_arr[i].loadTextureNormal(_path + type_arr[i] + "_s" + ".png");
                            typeBtn_arr[i].loadTexturePressed(_path + type_arr[i] + "_s" + ".png");
                        }
                    }

                    var gameListNode = bkNode.getChildByName("gameList");
                    gameListNode.setScrollBarEnabled(false);
                    gameListNode.removeAllChildren();
                    gameTypeList = _gameTypeList[tabIndex];
                    var gameItem = gameListNode.getParent().getChildByName("item");
                    for(var i = 0; i< gameTypeList.length; i++){
                        var index = gameTypeList[i];
                        var newitem = gameItem.clone();
                        var textureNormal,texturePress;
                        var preStr = GameButton[index];
                        textureNormal = preStr + "_n.png";
                        texturePress = preStr + "_s.png";
                        newitem.loadTextures(textureNormal,texturePress,texturePress);
                        newitem.setTag(index);
                        newitem.setVisible(true);
                        newitem.addClickEventListener(clickButton);
                        gameListNode.pushBackCustomItem(newitem);
                    }

                    var gameType = util.localStorageEncrypt.getNumberItem("KEY_GAME_TYPE",gameTypeList[0]);
                    if (gameTypeList.indexOf(gameType) < 0)
                    {
                        gameType = gameTypeList[0];
                    }
                    clickButton(gameListNode.getChildByTag(gameType));
                };


                updateTab(util.localStorageEncrypt.getNumberItem("KEY_GAME_LIST",0));
            }else{
                bkNode.getChildByName("game_type").visible = true;
                bkNode.getChildByName("gameList").visible = true;

                var gameListNode = bkNode.getChildByName("gameList");
                var gameItem = gameListNode.getParent().getChildByName("item");
                gameListNode.removeAllChildren();

                for(var i = 0; i< gameTypeList.length; i++){
                    var index = gameTypeList[i];
                    var newitem = gameItem.clone();
                    var textureNormal,texturePress;
                    var preStr = GameButton[index];
                    textureNormal = preStr + "_n.png";
                    texturePress = preStr + "_s.png";
                    newitem.loadTextures(textureNormal,texturePress,texturePress);
                    newitem.setTag(index);
                    newitem.addClickEventListener(clickButton);
                    gameListNode.addChild(newitem);
                }

                var gameType = util.localStorageEncrypt.getNumberItem("KEY_GAME_TYPE",gameTypeList[0]);
                if (MjClient.uiPara.url!=null && cc.isNumber(MjClient.uiPara.url))
                {
                    gameType = MjClient.uiPara.url;
                }
                if (gameTypeList.indexOf(gameType) < 0)
                {
                    gameType = gameTypeList[0];
                }
                clickButton(gameListNode.getChildByTag(gameType));
            }

            if (this.webView){
                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ){
                    gamePanel && gamePanel.setVisible(true);
                    this.webView.setAnchorPoint(cc.p(0, 0));
                    this.webView.setContentSize(gamePanel.width, gamePanel.height);
                    gamePanel.addChild(this.webView);
                }else{
                    this.webView.setContentSize(cSize.width*0.77*bkNode.scaleX,cSize.height*0.85*bkNode.scaleY);
                    this.webView.setPosition(bkNode.x * 1.136,bkNode.y*0.97);
                    web.node.addChild(this.webView);
                }
            }

        }else{
            bkNode.getChildByName("play").loadTexture("joinGame/yonghuxieyi.png");
            bkNode.getChildByName("game_type").visible = false;
            bkNode.getChildByName("gameList").visible = false;
            bkNode.getChildByName("bg_game").visible = false;
            var visibleObj = {
                "play" : false,
                "bg_game" : false,
                "bg_left" : false,
                "gameList" : false,
                "node_friendCard" : false,
                "Image_3": false,
                "item": false
            };

            for(var key in visibleObj)
            {
                if(bkNode.getChildByName(key))
                {
                    bkNode.getChildByName(key).visible = visibleObj[key];
                }
            }
            if (this.webView){
                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ){
                    pactPanel && pactPanel.setVisible(true);
                    this.webView.setAnchorPoint(cc.p(0, 0));
                    this.webView.setContentSize(pactPanel.width, pactPanel.height);
                    pactPanel.addChild(this.webView);
                }else{
                    this.webView.setContentSize(cSize.width*0.97*bkNode.scaleX,cSize.height*0.9*bkNode.scaleY);
                    this.webView.setPosition(bkNode.x*0.98 ,bkNode.y*0.95);
                    web.node.addChild(this.webView);
                }
                this.webView.loadURL(MjClient.uiPara.url);
            }
        }

        // if (this.webView){
        //     this.webView.setScalesPageToFit(true);
        //     web.node.addChild(this.webView);
        //     this.webView.setEventListener(ccui.WebView.EventType.LOADED,function(){
        //         that.webView.visible=true;
        //     });
        //     this.webView.visible=false;
        // }

        this.addChild(web.node);
        if (cc.sys.isObjectValid(MjClient.webViewLayer)){
            MjClient.webViewLayer.close();
        }
        MjClient.webViewLayer=this;
    },
    close:function()
    {
        this.webView = null;
        MjClient.webViewLayer=null;
        this.removeFromParent(true);
    }
});

if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
    MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) 
{
    WebViewLayer = WebViewLayer_yongzhou;
}

//邵阳玩法换皮
WebViewLayer_sy=cc.Layer.extend({
    webView:null,
    curTabIdx:null,     //当前标签页
    ctor:function ()
    {
        cc.log("邵阳玩法");
        this._super();
        var that = this;
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
            var web = ccs.load("WebView_3.0.json");
        else
            var web = ccs.load("WebView.json");
        var block = web.node.getChildByName("block");
        var bkNode = web.node.getChildByName("back");
        var node_friendCard = bkNode.getChildByName("node_friendCard");
        var gamePanel = bkNode.getChildByName("gamePanel");
        var pactPanel = bkNode.getChildByName("pactPanel");
        var cSize = bkNode.getCustomSize();
        gamePanel && gamePanel.setVisible(false);
        pactPanel && pactPanel.setVisible(false);
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], 2);
        setWgtLayout(bkNode,[1, 1], [0.5, 0.5], [0, 0]);

        bkNode.getChildByName("yes").addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    that.close();
                    break;
                default :
                    break;
            }
        },this);

        if(node_friendCard)
        {
            node_friendCard.setLocalZOrder(1);
        }

        // 不是玩法弹框，隐藏“玩法”标题
        var title = bkNode.getChildByName("play");
        if(title && !MjClient.uiPara.help) title.setVisible(false);
        if(node_friendCard &&　!MjClient.uiPara.help){
            node_friendCard.setVisible(false);
        }

        if (ccui.WebView)
        {
            this.webView = new ccui.WebView();
            this.webView.name="webView";
            this.webView.setScalesPageToFit(true);
            this.webView.setEventListener(ccui.WebView.EventType.LOADED, function () {
                that.webView.visible = true;
            });
            this.webView.visible = false;
        }

        that.curTabIdx = 0;  //初始化标签页
        if (MjClient.uiPara.help)
        {
            var xieYiBg = bkNode.getChildByName("img_xieyiBg");
            if(cc.sys.isObjectValid(xieYiBg)) {
                xieYiBg.setVisible(false);
            }
            bkNode.getChildByName("gameList").setVisible(true);
            var imgTitle = bkNode.getChildByName("img_title")
            if(cc.sys.isObjectValid(imgTitle)) {
                imgTitle.setVisible(true);
            }
            var _gameTypeList=[];
            if(MjClient.gameListConfig.paohuziList){
                _gameTypeList = _gameTypeList.concat(MjClient.gameListConfig.paohuziList);
            }
            if(MjClient.gameListConfig.doudizhulist){
                _gameTypeList = _gameTypeList.concat(MjClient.gameListConfig.doudizhulist);
            }           

            var gameTypeList = [];
            for(var i = 0;i < 3; i++){
                gameTypeList[i] = [];  //麻将，扑克，字牌 3列表初始化
            }
            for(var i = 0;i < _gameTypeList.length;i++){
                if(GameClass[_gameTypeList[i]] == MjClient.GAME_CLASS.PAO_HU_ZI ||
                   GameClass[_gameTypeList[i]] == MjClient.GAME_CLASS.CHANG_PAI){
                    gameTypeList[0].push(_gameTypeList[i]);
                }else if(GameClass[_gameTypeList[i]] == MjClient.GAME_CLASS.MA_JIANG){
                    gameTypeList[1].push(_gameTypeList[i]);
                }else if(GameClass[_gameTypeList[i]] == MjClient.GAME_CLASS.PAO_DE_KUAI){
                    gameTypeList[2].push(_gameTypeList[i]);
                }else if(GameClass[_gameTypeList[i]] == MjClient.GAME_CLASS.DOU_DI_ZHU){
                    gameTypeList[2].push(_gameTypeList[i]);
                }else if(GameClass[_gameTypeList[i]] == MjClient.GAME_CLASS.SAN_DA_HA) {
                    gameTypeList[2].push(_gameTypeList[i]);
                }else if(GameClass[_gameTypeList[i]] == MjClient.GAME_CLASS.DA_TONG_ZI ||
                         GameClass[_gameTypeList[i]] == MjClient.GAME_CLASS.BA_ZHA_DAN || 
                         GameClass[_gameTypeList[i]] == MjClient.GAME_CLASS.BAN_BIAN_TIAN_ZHA){
                    gameTypeList[2].push(_gameTypeList[i]);
                }
            }

            //版号
            if(MjClient.isAroundBeijing() || MjClient.isShenhe)
            {
                gameTypeList = [gameTypeList[0]];
            }

            function clickButton(target)
            {
                var selectColor = cc.color("#255662");
                var unSelectColor = cc.color("#ffffff");
                var tabIdx = that.curTabIdx;
                var gameList = target.getParent();
                for (var i = 0; i < gameTypeList[tabIdx].length; i++){
                    var index = gameTypeList[tabIdx][i];
                    var item = gameList.getChildByTag(index);
                    if (index == target.getTag()){
                        item.touchEnabled = false;
                        item.bright = false;

                        if (item.normalText && item.selectText) {
                            item.normalText.setVisible(false);
                            item.selectText.setVisible(true);
                        }

                        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                            item.setTitleColor(selectColor);
                        }
                    }else{
                        item.touchEnabled = true;
                        item.bright = true;

                        if (item.normalText && item.selectText) {
                            item.normalText.setVisible(true);
                            item.selectText.setVisible(false);
                        }

                        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                            item.setTitleColor(unSelectColor);
                        }
                    }
                }

                if(GameHelpUrl[target.getTag()] && MjClient.systemConfig[GameHelpUrl[target.getTag()]])
                {
                    var url = MjClient.systemConfig[GameHelpUrl[target.getTag()]];
                    if (that.webView)
                        that.webView.loadURL(url);
                }
                else if (GameHelpUrl[target.getTag()] && (GameHelpUrl[target.getTag()].indexOf("http://") == 0 || 
                    GameHelpUrl[target.getTag()].indexOf("https://") == 0)) {
                    if (that.webView) that.webView.loadURL(GameHelpUrl[target.getTag()]);
                }
                else
                {
                    MjClient.showToast("没有配置帮助文档 ID :" + target.getTag())
                }
            }

            //邵阳玩法界面处理
            var _btnNodeArray = [];
            var _path = "createNewPng/gameTypeBtn/";
            var _btnNameArray = ["zipai", "majiang", "puKe"];
            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                _path = "ui/createRoom/";
                _btnNameArray = ["ziPai", "maJiang", "puKe"];
            }
            this.gameList = gameTypeList;

            for (var i = 0; i < _btnNameArray.length; i++) {
                _btnNodeArray[i] = node_friendCard.getChildByName("btn_" + i);
                if (_btnNodeArray[i]) {
                    if (i >= _btnNodeArray.length) {
                        _btnNodeArray[i].visible = false;
                        break;
                    }

                    _btnNodeArray[i].setTag(i);
                    _btnNodeArray[i].addTouchEventListener(function (sender, Type) {
                        switch (Type) {
                            case ccui.Widget.TOUCH_ENDED:
                                that.curTabIdx = sender.getTag();
                                updateTab(that.curTabIdx);
                                break;
                            default:
                                break;
                        }
                    }, this);
                }
            };

            var updateTab = function (tabIndex)
            {
                if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
                    for(var i = 0;i < _btnNodeArray.length;i++){
                        _btnNodeArray[i].setEnabled(tabIndex != i);
                        _btnNodeArray[i].getChildByName("normalImg").setVisible(tabIndex != i);
                        _btnNodeArray[i].getChildByName("selectImg").setVisible(tabIndex == i);
                    }
                }
                else {
                    for (var i = 0; i < _btnNodeArray.length; i++) {
                        if (tabIndex == i) {
                            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                                _btnNodeArray[i].loadTextureNormal(_path + "type_s.png");
                                _btnNodeArray[i].loadTexturePressed(_path + "type_s.png");
                                _btnNodeArray[i].getChildByName("img_text").loadTexture(_path + _btnNameArray[i] + "_s.png");
                            } else {
                                _btnNodeArray[i].loadTextureNormal(_path + _btnNameArray[i] + "_s.png");
                            }
                        }
                        else {
                            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                                _btnNodeArray[i].loadTextureNormal(_path + "type_n.png");
                                _btnNodeArray[i].loadTexturePressed(_path + "type_s.png");
                                _btnNodeArray[i].getChildByName("img_text").loadTexture(_path + _btnNameArray[i] + "_n.png");
                            } else {
                                _btnNodeArray[i].loadTextureNormal(_path + _btnNameArray[i] + "_n.png");
                            }
                        }
                    }
                }

                var gameListNode = bkNode.getChildByName("gameList");
                gameListNode.setScrollBarEnabled(false);
                gameListNode.removeAllChildren();
                var curTypeList = that.gameList[tabIndex];
                var gameItem = gameListNode.getParent().getChildByName("item");
                for (var i = 0; i < curTypeList.length; i++) {
                    var index = curTypeList[i];
                    var newitem = gameItem.clone();
                    if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
                        newitem.normalText = newitem.getChildByName("normalText");
                        newitem.selectText = newitem.getChildByName("selectText");
                        newitem.normalText.ignoreContentAdaptWithSize(true);
                        newitem.selectText.ignoreContentAdaptWithSize(true);
                        newitem.normalText.setString(GameCnName[index]);
                        newitem.selectText.setString(GameCnName[index]);
                    } else {
                        var textureNormal, texturePress;
                        var preStr = GameButton[index];
                        if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                            preStr = "ui/createRoom/game"
                            newitem.setTitleText(GameCnName[index]);
                            newitem.setTitleColor(cc.color("#ffffff"));
                        }
                        textureNormal = preStr + "_n.png";
                        texturePress = preStr + "_s.png";
                        newitem.loadTextures(textureNormal, texturePress, texturePress);
                    }
                    newitem.setTag(index);
                    newitem.addClickEventListener(clickButton);
                    gameListNode.pushBackCustomItem(newitem);
                }

                //给个默认的
                var defaultGame;
                if (curTypeList.length > 0) {
                    if (that.recordTabIdx == tabIndex) {
                        defaultGame = util.localStorageEncrypt.getNumberItem("KEY_GAME_TYPE", curTypeList[0]);
                    } else {
                        defaultGame = curTypeList[0];
                    }
                    
                }

                if (!defaultGame || (curTypeList.indexOf(defaultGame) < 0)) {
                    return;
                }

                clickButton(gameListNode.getChildByTag(defaultGame));
                if(curTypeList.indexOf(defaultGame)>5)
                {
                    gameListNode.jumpToBottom();
                }else{
                    gameListNode.jumpToTop();
                }
            };

            that.curTabIdx = util.localStorageEncrypt.getNumberItem("KEY_GAME_LIST", 0);
            that.recordTabIdx = that.curTabIdx;
            if (that.curTabIdx >= that.gameList.length) {
                that.curTabIdx = that.gameList.length - 1;
            }
            //判断是否查看规则跳转过来
            if(MjClient.uiPara.tabindex>=0)
            {
                that.curTabIdx=MjClient.uiPara.tabindex;
                util.localStorageEncrypt.setNumberItem("KEY_GAME_TYPE", MjClient.uiPara.url);
            }

            updateTab(that.curTabIdx);

            if (this.webView){
                gamePanel && gamePanel.setVisible(true);
                this.webView.setAnchorPoint(cc.p(0, 0));
                this.webView.setContentSize(gamePanel.width, gamePanel.height);
                gamePanel.addChild(this.webView);
            }

        }else{
            //bkNode.getChildByName("play").loadTexture("joinGame/yonghuxieyi.png");
            var visibleObj = {
                "play" : false,
                "bg_game" : false,
                "bg_left" : false,
                "gameList" : false,
                "game_type" : false,
                "node_friendCard" : false,
                "img_title" : false,
                "gamePanel" : false,
                "title": false,
                "gameListBg": false
            };

            for(var key in visibleObj)
            {
                if(bkNode.getChildByName(key))
                {
                    var obj = bkNode.getChildByName(key);
                    if(cc.sys.isObjectValid(obj)) {
                        obj.visible = visibleObj[key];
                    }
                }
            }

            if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                bkNode.getChildByName("play").setVisible(true);
                bkNode.getChildByName("img_xieyiBg").setVisible(true);
            }

            if (this.webView){
                pactPanel && pactPanel.setVisible(true);
                this.webView.setAnchorPoint(cc.p(0, 0));
                this.webView.setContentSize(pactPanel.width, pactPanel.height);
                pactPanel.addChild(this.webView);

                this.webView.loadURL(MjClient.uiPara.url);
            }
        }

        this.addChild(web.node);
        if (cc.sys.isObjectValid(MjClient.webViewLayer)){
            MjClient.webViewLayer.close();
        }
        MjClient.webViewLayer=this;
    },
    close:function()
    {
        this.webView = null;
        MjClient.webViewLayer=null;
        this.removeFromParent(true);
    }
});

if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
    WebViewLayer = WebViewLayer_sy;
}

var NormalWebviewLayer = cc.Layer.extend({
    webView:null,
    ctor:function (url, portraitScreen)
    {
        this._super();
        var that = this;

        if(portraitScreen){
            if (MjClient.native.setOrientation(false))
                this.portraitScreen = true;
        
            var size = MjClient.size;
            cc.view.setFrameSize(size.height, size.width);
            cc.view.adjustViewPort(true);
            cc.view.resizeWithBrowserSize(true);
            cc.view.setDesignResolutionSize(size.height, size.width, cc.ResolutionPolicy.NO_BORDER);
            MjClient.size = {
                width: size.height,
                height: size.width
            };
        }

        var image = new ccui.ImageView();
        image.loadTexture("webview/ditu.png");
        image.setTouchEnabled(true);
        this.addChild(image);
        setWgtLayout(image,[1,1], [0.5, 0.5], [0, 0], false);
        var contentSize = image.getContentSize();
        image.setScale(MjClient.size.width/contentSize.width, MjClient.size.height/contentSize.height);


        var imageTip = new ccui.ImageView();
        imageTip.loadTexture("webview/jiazaizhong.png");
        this.addChild(imageTip);
        setWgtLayout(imageTip,[0.2,0.2], [0.45, 0.5], [0,0]);



        var closeBtn = new ccui.Button();
        closeBtn.loadTextureNormal("webview/guanbi.png");
        setWgtLayout(closeBtn,[0.14,0.14], [1, 1], [-0.5, -0.9]);
        closeBtn.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    that.close();
                    break;
                default :
                    break;
            }
        },this);
        this.addChild(closeBtn);

        imageTip.x = (MjClient.size.width - closeBtn.width * closeBtn.getScaleX())/2;


        var openBrowserBtn = new ccui.Button();
        openBrowserBtn.loadTextureNormal("webview/liulanqi.png");
        setWgtLayout(openBrowserBtn,[0.14,0.14], [1, 1], [-0.5, -1.95]);
        openBrowserBtn.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.OpenUrl(url);
                    break;
                default :
                    break;
            }
        },this);
        this.addChild(openBrowserBtn);


        if(ccui.WebView)
        {
            this.webView = new ccui.WebView();
            this.webView.setPosition(imageTip.getPosition());
            this.webView.setContentSize(this.webView.getPositionX()*2, MjClient.size.height);
            this.webView.loadURL(url);
            this.webView.setScalesPageToFit(true);
            this.addChild(this.webView);
            this.webView.setEventListener(ccui.WebView.EventType.LOADED,function(){
                that.webView.visible=true;
            });
            this.webView.visible=false;
        }

        if (cc.sys.isObjectValid(MjClient.webViewLayer))
        {
            MjClient.webViewLayer.close();
        }
        MjClient.webViewLayer=this;
    },
    close:function()
    {
        this.webView = null;
        MjClient.webViewLayer=null;
        this.removeFromParent(true);
        if (this.portraitScreen) {
            MjClient.native.setOrientation(true);
            screenChange();
        }
    }
});

var DaiLiWebviewLayer = cc.Layer.extend({
    webView:null,
    initSuccess:true,
    isInitSuccess: function() {
        return this.initSuccess;
    },
    ctor:function (url)
    {
        this._super();
        var that = this;

        cc.log("DaiLiWebviewLayer url:" + url);

        if (!MjClient.native.setOrientation(false)) {
            this.initSuccess = false;
            return;
        }

        var size = MjClient.size;
        cc.view.setFrameSize(size.height, size.width);
        cc.view.adjustViewPort(true);
        cc.view.resizeWithBrowserSize(true);
        cc.view.setDesignResolutionSize(size.height, size.width, cc.ResolutionPolicy.NO_BORDER);
        MjClient.size = {width:size.height,height:size.width};

        var image = new ccui.ImageView();
        image.loadTexture("webview/daili.jpg");
        image.setTouchEnabled(true);
        this.addChild(image);
        setWgtLayout(image,[1,1], [0.5, 0.5], [0, 0], false);
        var contentSize = image.getContentSize();
        image.setScale(MjClient.size.width/contentSize.width, MjClient.size.height/contentSize.height);

        var waitTip = new ccui.Text("首次加载时间稍长，请耐心等待...", "fonts/lanting.TTF", 24);
        waitTip.setAnchorPoint(cc.p(0.0, 0.5));
        waitTip.setPosition(this.width/2 - waitTip.width/2, this.height/2);
        setWgtLayout(waitTip,[0, 0.022], [0.5, 0.55], [-0.5, 0]);
        waitTip.runAction(cc.sequence(
            cc.delayTime(0.5), cc.callFunc(function() {waitTip.setString("首次加载时间稍长，请耐心等待.");}),
            cc.delayTime(0.5), cc.callFunc(function() {waitTip.setString("首次加载时间稍长，请耐心等待..");}),
            cc.delayTime(0.5), cc.callFunc(function() {waitTip.setString("首次加载时间稍长，请耐心等待...");})
        ).repeatForever());
        this.addChild(waitTip);

        var closeBtn = new ccui.Button();
        closeBtn.loadTextureNormal("webview/guanbi_chuanqi.png");
        setWgtLayout(closeBtn,[0.03,0.03], [1, 1], [-2, -2]);
        closeBtn.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    that.close();
                    break;
                default :
                    break;
            }
        },this);
        this.addChild(closeBtn);

        if(ccui.WebView)
        {
            this.webView = new ccui.WebView();
            this.webView.setPosition(MjClient.size.width/2, MjClient.size.height/2);
            this.webView.setContentSize(MjClient.size);
            this.webView.loadURL(url);
            this.webView.setScalesPageToFit(true);
            this.webView.setJavascriptInterfaceScheme("cocosjs");
            this.webView.setColor(cc.BLACK);
            this.addChild(this.webView);
            this.webView.setEventListener(ccui.WebView.EventType.LOADED,function(){
                that.webView.visible=true;
                if (cc.sys.isObjectValid(waitTip))
                    waitTip.removeFromParent();
                if (cc.sys.isObjectValid(image))
                    image.removeFromParent();
                if (cc.sys.isObjectValid(closeBtn))
                    closeBtn.removeFromParent();
                MjClient.native.umengEvent4CountWithProperty("zhujiemian_daili_tiaozhuan", {uid:SelfUid()});
            });

            this.webView.visible=false;
            this.webView.setOnJSCallback(function (sender, url) {
                cc.log("OnJSCallback:"+url);
                if (url.indexOf("cocosjs://close") >= 0) {
                    MjClient.daiLiWebViewLayer.close();
                }
                else if (url.indexOf("cocosjs://pay?") >= 0) {
                    var paras = url.replace("cocosjs://pay?","");
                    if (paras.length > 0) {
                        var data = JSON.parse(decodeURI(paras));
                        if (platform == PayPlatformType.WEIXIN_WEB ||
                            platform == PayPlatformType.ALIPAY_WEB ||
                            platform == PayPlatformType.ALIPAY_WEB_XY) {
                            MjClient.native.OpenUrl(data.data);
                        } else if (platform == PayPlatformType.WEIXIN_GZH || platform == PayPlatformType.WEIXIN_GZH_XY) {
                            MjClient.native.wxShareUrl(rtn.data.url, unescape(rtn.data.title), unescape(rtn.data.content));
                        } else {
                            MjClient.native.pay(data.platform, data.data);
                        }
                    }
                }
                else if (url.indexOf("cocosjs://share") >= 0) {
                    var paras = url.replace("cocosjs://share?","");
                    if (paras.length > 0) {
                        var data = JSON.parse(decodeURI(paras));
                        MjClient.native.wxShareUrl(data.url, data.title, data.content);
                    }
                }
            });
        }

        if (cc.sys.isObjectValid(MjClient.webViewLayer))
        {
            MjClient.webViewLayer.close();
        }
        MjClient.daiLiWebViewLayer=this;

        if(MjClient.homeui)
        {
            MjClient.homeui.removeFromParent();
            MjClient.homeui = null;
        }
        if(MjClient.playui)
        {
            MjClient.playui.removeFromParent();
            MjClient.playui = null;
        }
        MjClient.Scene.unscheduleUpdate();
        if (MjClient.gamenet) MjClient.gamenet.disconnect();
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic();
    },
    close:function()
    {
        this.webView = null;
        MjClient.daiLiWebViewLayer=null;
        this.removeFromParent(true);
        MjClient.native.setOrientation(true);
        screenChange();

        MjClient.Scene.scheduleUpdate();
        MjClient.addHomeView();
        postEvent("disconnect", 6);
    }
});

var chuanQi_cfg = {
    isVerticalScreen: true,
    waitImgFile: "webview/chuanqi.jpg",
    appKey: "47e8FT5UaA8Zrpd1ecxpUradQwg3TiBS",
    url: "http://sdk.djsh5.com/c/login/cgKy2e6qhZFn.php?rGTaSneKdZ4yx",
    appIds: function() {
        var appIds = {};
        appIds[MjClient.APP_TYPE.QXYYQP] = 101;
        appIds[MjClient.APP_TYPE.QXSYDTZ] = 102;
        appIds[MjClient.APP_TYPE.TXJINZHONGMJ] = 103;
        appIds[MjClient.APP_TYPE.QXJSMJ] = 104;

        appIds[MjClient.APP_TYPE.DQSHANXIMJ] = 106;
        appIds[MjClient.APP_TYPE.QXHAIANMJ] = 107;
        appIds[MjClient.APP_TYPE.QXHAMJ] = 108;
        appIds[MjClient.APP_TYPE.QXXZMJ] = 111;

        appIds[MjClient.APP_TYPE.BDHYZP] = 105;
        appIds[MjClient.APP_TYPE.QXLYQP] = 109;
        appIds[MjClient.APP_TYPE.QXXXGHZ] = 110;
        appIds[MjClient.APP_TYPE.QXYZQP] = 112;

        appIds[MjClient.APP_TYPE.QXNTQP] = 113;
        appIds[MjClient.APP_TYPE.AYGUIZHOUMJ] = 114;
        appIds[MjClient.APP_TYPE.HUNANWANGWANG] = 115;
        // appIds[MjClient.APP_TYPE.LYSICHUANMJ] = 115;
        appIds[MjClient.APP_TYPE.HUBEIMJ] = 116;
        return appIds;
    }(),
}

var baZiSuanMian_cfg = {
    isVerticalScreen: true,
    waitImgFile: "webview/bazisuanmian.jpg",
    appKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZ012",
    url: "http://sm.jtcfgame.com",
    appIds: function() {
        var appIds = {};
        appIds[MjClient.APP_TYPE.QXYYQP] = 201;
        appIds[MjClient.APP_TYPE.QXSYDTZ] = 202;
        appIds[MjClient.APP_TYPE.QXJSMJ] = 203;
        appIds[MjClient.APP_TYPE.TXJINZHONGMJ] = 204;
        appIds[MjClient.APP_TYPE.DQSHANXIMJ] = 205;
        appIds[MjClient.APP_TYPE.QXHAIANMJ] = 206;
        appIds[MjClient.APP_TYPE.BDHYZP] = 207;
        appIds[MjClient.APP_TYPE.QXHAMJ] = 208;
        appIds[MjClient.APP_TYPE.QXLYQP] = 209;
        appIds[MjClient.APP_TYPE.QXXXGHZ] = 210;
        appIds[MjClient.APP_TYPE.QXXZMJ] = 211;
        appIds[MjClient.APP_TYPE.QXYZQP] = 212;
        appIds[MjClient.APP_TYPE.QXNTQP] = 213;
        appIds[MjClient.APP_TYPE.AYGUIZHOUMJ] = 214;
        appIds[MjClient.APP_TYPE.HUNANWANGWANG] = 215;
        // appIds[MjClient.APP_TYPE.LYSICHUANMJ] = 215;
        appIds[MjClient.APP_TYPE.HUBEIMJ] = 216;
        return appIds;
    }(),
}

var wangzheZhanshen_cfg = {
    isVerticalScreen: false,
    waitImgFile: "webview/buyu.jpg",
    appKey: "HzpOPtJ2yBGVaUBH1dne9Q1eNCHBrw08",
    url: "https://ol.feed.uu.cc/sns/jtcfH5Login?consumer_key=16f898419504c2f4e3b8&channel_id=JT0S0N30001",
    appIds: function() {
        var appIds = {};
        appIds[MjClient.APP_TYPE.QXYYQP] = 301;
        appIds[MjClient.APP_TYPE.QXHAIANMJ] = 302;
        appIds[MjClient.APP_TYPE.BDHYZP] = 303;
        appIds[MjClient.APP_TYPE.QXHAMJ] = 304;
        appIds[MjClient.APP_TYPE.QXJSMJ] = 305;
        appIds[MjClient.APP_TYPE.TXJINZHONGMJ] = 306;
        appIds[MjClient.APP_TYPE.QXLYQP] = 307;
        appIds[MjClient.APP_TYPE.QXSYDTZ] = 308;
        appIds[MjClient.APP_TYPE.QXXXGHZ] = 309;
        appIds[MjClient.APP_TYPE.QXXZMJ] = 310;
        appIds[MjClient.APP_TYPE.QXYZQP] = 311;
        appIds[MjClient.APP_TYPE.DQSHANXIMJ] = 312;
        appIds[MjClient.APP_TYPE.QXNTQP] = 313;
        appIds[MjClient.APP_TYPE.AYGUIZHOUMJ] = 314;
        appIds[MjClient.APP_TYPE.HUNANWANGWANG] = 315;
        // appIds[MjClient.APP_TYPE.LYSICHUANMJ] = 315;
        appIds[MjClient.APP_TYPE.HUBEIMJ] = 316;
        return appIds;
    }(),
}

var buyu_cfg = {
    isVerticalScreen: false,
    waitImgFile: "webview/buyu.jpg",
    appKey: "qxiMyNwctriR1v7gVdAHyS9o3vVWIarq",
    url: "http://fishwxh5.naler.cn/qixing/tyby",
    appIds: function() {
        var appIds = {};
        appIds[MjClient.APP_TYPE.QXYYQP] = 401;
        appIds[MjClient.APP_TYPE.QXHAIANMJ] = 402;
        appIds[MjClient.APP_TYPE.BDHYZP] = 403;
        appIds[MjClient.APP_TYPE.QXHAMJ] = 404;
        appIds[MjClient.APP_TYPE.QXJSMJ] = 405;
        appIds[MjClient.APP_TYPE.TXJINZHONGMJ] = 406;
        appIds[MjClient.APP_TYPE.QXLYQP] = 407;
        appIds[MjClient.APP_TYPE.QXSYDTZ] = 408;
        appIds[MjClient.APP_TYPE.QXXXGHZ] = 409;
        appIds[MjClient.APP_TYPE.QXXZMJ] = 410;
        appIds[MjClient.APP_TYPE.QXYZQP] = 411;
        appIds[MjClient.APP_TYPE.DQSHANXIMJ] = 412;
        appIds[MjClient.APP_TYPE.QXNTQP] = 413;
        appIds[MjClient.APP_TYPE.AYGUIZHOUMJ] = 414;
        appIds[MjClient.APP_TYPE.HUNANWANGWANG] = 415;
        // appIds[MjClient.APP_TYPE.LYSICHUANMJ] = 415;
        appIds[MjClient.APP_TYPE.HUBEIMJ] = 416;
        return appIds;
    }(),
}

var rexueHeji_cfg = {
    isVerticalScreen: true,
    waitImgFile: "webview/rexueheji.jpg",
    appKey: "yqkM3SO3UKBfYwbRLlS2IRNzNYbGKwdj",
    url: "http://sdk.djsh5.com/c/login/cgKy2e6qhZFn.php?DCJPpNpCuJgz7",
    appIds: function() {
        var appIds = {};
        appIds[MjClient.APP_TYPE.QXYYQP] = 501;
        appIds[MjClient.APP_TYPE.QXHAIANMJ] = 502;
        appIds[MjClient.APP_TYPE.BDHYZP] = 503;
        appIds[MjClient.APP_TYPE.QXHAMJ] = 504;
        appIds[MjClient.APP_TYPE.QXJSMJ] = 505;
        appIds[MjClient.APP_TYPE.TXJINZHONGMJ] = 506;
        appIds[MjClient.APP_TYPE.QXLYQP] = 507;
        appIds[MjClient.APP_TYPE.QXSYDTZ] = 508;
        appIds[MjClient.APP_TYPE.QXXXGHZ] = 509;
        appIds[MjClient.APP_TYPE.QXXZMJ] = 510;
        appIds[MjClient.APP_TYPE.QXYZQP] = 511;
        appIds[MjClient.APP_TYPE.DQSHANXIMJ] = 512;
        appIds[MjClient.APP_TYPE.QXNTQP] = 513;
        appIds[MjClient.APP_TYPE.AYGUIZHOUMJ] = 514;
        appIds[MjClient.APP_TYPE.HUNANWANGWANG] = 515;
        // appIds[MjClient.APP_TYPE.LYSICHUANMJ] = 515;
        appIds[MjClient.APP_TYPE.HUBEIMJ] = 516;
        return appIds;
    }(),
}

var moyuLaile_cfg = {
    isVerticalScreen: true,
    waitImgFile: "webview/moyu.jpg",
    appKey: "smDGD15zaWikSdT5kzzjo5nGmk9DFG67",
    url: "http://sdk.djsh5.com/c/login/cgKy2e6qhZFn.php?4DWGiGFGP5fB8",
    appIds: function() {
        var appIds = {};
        var appIds = {};
        appIds[MjClient.APP_TYPE.QXYYQP] = 601;
        appIds[MjClient.APP_TYPE.QXHAIANMJ] = 602;
        appIds[MjClient.APP_TYPE.BDHYZP] = 603;
        appIds[MjClient.APP_TYPE.QXHAMJ] = 604;
        appIds[MjClient.APP_TYPE.QXJSMJ] = 605;
        appIds[MjClient.APP_TYPE.TXJINZHONGMJ] = 606;
        appIds[MjClient.APP_TYPE.QXLYQP] = 607;
        appIds[MjClient.APP_TYPE.QXSYDTZ] = 608;
        appIds[MjClient.APP_TYPE.QXXXGHZ] = 609;
        appIds[MjClient.APP_TYPE.QXXZMJ] = 610;
        appIds[MjClient.APP_TYPE.QXYZQP] = 611;
        appIds[MjClient.APP_TYPE.DQSHANXIMJ] = 612;
        appIds[MjClient.APP_TYPE.QXNTQP] = 613;
        appIds[MjClient.APP_TYPE.AYGUIZHOUMJ] = 614;
        appIds[MjClient.APP_TYPE.HUNANWANGWANG] = 615;
        // appIds[MjClient.APP_TYPE.LYSICHUANMJ] = 615;
        appIds[MjClient.APP_TYPE.HUBEIMJ] = 616;
        return appIds;
    }(),
}

var qiShanMianLi_cfg = {
    isVerticalScreen: true,
    waitImgFile: "webview/bazisuanmian.jpg",
    appKey: "oae440ksL7axt5MZYaCF3L7vtbZBeGM4",
    url: "http://sg.364258.com/qd53",
    appIds: function() {
        var appIds = {};
        appIds[MjClient.APP_TYPE.QXYYQP] = 701;
        appIds[MjClient.APP_TYPE.QXHAIANMJ] = 702;
        appIds[MjClient.APP_TYPE.BDHYZP] = 703;
        appIds[MjClient.APP_TYPE.QXHAMJ] = 704;
        appIds[MjClient.APP_TYPE.QXJSMJ] = 705;
        appIds[MjClient.APP_TYPE.TXJINZHONGMJ] = 706;
        appIds[MjClient.APP_TYPE.QXLYQP] = 707;
        appIds[MjClient.APP_TYPE.QXSYDTZ] = 708;
        appIds[MjClient.APP_TYPE.QXXXGHZ] = 709;
        appIds[MjClient.APP_TYPE.QXXZMJ] = 710;
        appIds[MjClient.APP_TYPE.QXYZQP] = 711;
        appIds[MjClient.APP_TYPE.DQSHANXIMJ] = 712;
        appIds[MjClient.APP_TYPE.QXNTQP] = 713;
        appIds[MjClient.APP_TYPE.AYGUIZHOUMJ] = 714;
        appIds[MjClient.APP_TYPE.HUNANWANGWANG] = 715;
        // appIds[MjClient.APP_TYPE.LYSICHUANMJ] = 715;
        appIds[MjClient.APP_TYPE.HUBEIMJ] = 716;
        return appIds;
    }(),
}

// 爆金捕鱼
var baoJinBuYu_cfg = {
    isVerticalScreen: false,
    waitImgFile: "webview/baojinbuyu.jpg",
    appKey: "KFUxR0N37t8KxJWkzGCQS7gG5NYUmjz4",
    url: "http://fc.51you1.com/index.html",
    appIds: function() {
        var appIds = {};
        appIds[MjClient.APP_TYPE.QXYYQP] = 801;
        appIds[MjClient.APP_TYPE.QXHAIANMJ] = 802;
        appIds[MjClient.APP_TYPE.BDHYZP] = 803;
        appIds[MjClient.APP_TYPE.QXHAMJ] = 804;
        appIds[MjClient.APP_TYPE.QXJSMJ] = 805;
        appIds[MjClient.APP_TYPE.TXJINZHONGMJ] = 806;
        appIds[MjClient.APP_TYPE.QXLYQP] = 807;
        appIds[MjClient.APP_TYPE.QXSYDTZ] = 808;
        appIds[MjClient.APP_TYPE.QXXXGHZ] = 809;
        appIds[MjClient.APP_TYPE.QXXZMJ] = 810;
        appIds[MjClient.APP_TYPE.QXYZQP] = 811;
        appIds[MjClient.APP_TYPE.DQSHANXIMJ] = 812;
        appIds[MjClient.APP_TYPE.QXNTQP] = 813;
        appIds[MjClient.APP_TYPE.AYGUIZHOUMJ] = 814;
        appIds[MjClient.APP_TYPE.HUNANWANGWANG] = 815;
        // appIds[MjClient.APP_TYPE.LYSICHUANMJ] = 815;
        appIds[MjClient.APP_TYPE.HUBEIMJ] = 816;

        return appIds;
    }(),
}

var zhanYueTuLong_cfg = {
    isVerticalScreen: true,
    waitImgFile: "webview/zhanyuetulong.jpg",
    appKey: "Jw2i9u0KnJ8wYPTKReBXHmGhZ3oBxiNU",
    url: "https://ol.feed.uu.cc/sns/jtcfH5Login?consumer_key=16f898419504c2f4e3b8&channel_id=JT0S0N30001",
    appIds: function() {
        var appIds = {};
        appIds[MjClient.APP_TYPE.QXYYQP] = 901;
        appIds[MjClient.APP_TYPE.QXHAIANMJ] = 902;
        appIds[MjClient.APP_TYPE.BDHYZP] = 903;
        appIds[MjClient.APP_TYPE.QXHAMJ] = 904;
        appIds[MjClient.APP_TYPE.QXJSMJ] = 905;
        appIds[MjClient.APP_TYPE.TXJINZHONGMJ] = 906;
        appIds[MjClient.APP_TYPE.QXLYQP] = 907;
        appIds[MjClient.APP_TYPE.QXSYDTZ] = 908;
        appIds[MjClient.APP_TYPE.QXXXGHZ] = 909;
        appIds[MjClient.APP_TYPE.QXXZMJ] = 910;
        appIds[MjClient.APP_TYPE.QXYZQP] = 911;
        appIds[MjClient.APP_TYPE.DQSHANXIMJ] = 912;
        appIds[MjClient.APP_TYPE.QXNTQP] = 913;
        appIds[MjClient.APP_TYPE.AYGUIZHOUMJ] = 914;
        appIds[MjClient.APP_TYPE.HUNANWANGWANG] = 915;
        // appIds[MjClient.APP_TYPE.LYSICHUANMJ] = 915;
        appIds[MjClient.APP_TYPE.HUBEIMJ] = 916;

        return appIds;
    }(),
}

// 剑荡江湖
var jianDangJiangHu_cfg = {
    isVerticalScreen: true,
    waitImgFile: "webview/jianDangJiangHu.jpg",
    appKey: "PFJtnq8Q31jqt4GTBkZo7rGZkvXRy1ip",
    url: "http://sdk.djsh5.com/c/login/cgKy2e6qhZFn.php?NnC7EBVPxN0jf",
    appIds: function() {
        var appIds = {};
        appIds[MjClient.APP_TYPE.QXYYQP] = 931;
        appIds[MjClient.APP_TYPE.QXHAIANMJ] = 932;
        appIds[MjClient.APP_TYPE.BDHYZP] = 933;
        appIds[MjClient.APP_TYPE.QXHAMJ] = 934;
        appIds[MjClient.APP_TYPE.QXJSMJ] = 935;
        appIds[MjClient.APP_TYPE.TXJINZHONGMJ] = 936;
        appIds[MjClient.APP_TYPE.QXLYQP] = 937;
        appIds[MjClient.APP_TYPE.QXSYDTZ] = 938;
        appIds[MjClient.APP_TYPE.QXXXGHZ] = 939;
        appIds[MjClient.APP_TYPE.QXXZMJ] = 940;
        appIds[MjClient.APP_TYPE.QXYZQP] = 941;
        appIds[MjClient.APP_TYPE.DQSHANXIMJ] = 942;
        appIds[MjClient.APP_TYPE.QXNTQP] = 943;
        appIds[MjClient.APP_TYPE.AYGUIZHOUMJ] = 944;
        appIds[MjClient.APP_TYPE.HUNANWANGWANG] = 945;
        appIds[MjClient.APP_TYPE.HUBEIMJ] = 946;
        return appIds;
    }(),
}

var ThirdPartyWebviewLayer = cc.Layer.extend({
    _webView: null,
    _initSuccess: true,
    _image: null,
    _closeBtn: null,
    _cfg: null,
    isInitSuccess: function() {
        return this._initSuccess;
    },
    toVerticalScreen: function() {
        if (!MjClient.native.setOrientation(false)) {
            this._initSuccess = false;
            return false;
        }

        var size = MjClient.size;
        cc.view.setFrameSize(size.height, size.width);
        cc.view.adjustViewPort(true);
        cc.view.resizeWithBrowserSize(true);
        cc.view.setDesignResolutionSize(size.height, size.width, cc.ResolutionPolicy.NO_BORDER);
        MjClient.size = {
            width: size.height,
            height: size.width
        };

        return true;
    },
    setWaitLayer: function(waitImgFile) {
        var image = new ccui.ImageView();
        image.loadTexture(waitImgFile);
        image.setTouchEnabled(true);
        this.addChild(image);
        setWgtLayout(image, [1, 1], [0.5, 0.5], [0, 0], false);
        var contentSize = image.getContentSize();
        image.setScale(MjClient.size.width / contentSize.width, MjClient.size.height / contentSize.height);

        var waitTip = new ccui.Text("首次加载时间稍长，请耐心等待...", "fonts/lanting.TTF", 24);
        waitTip.setAnchorPoint(cc.p(0.0, 0.5));
        waitTip.setPosition(this.width / 2 - waitTip.width / 2, this.height / 2);
        setWgtLayout(waitTip, [0, 0.022], [0.5, 0.5], [-0.5, 0]);
        waitTip.runAction(cc.sequence(
            cc.delayTime(0.5), cc.callFunc(function() {
                waitTip.setString("首次加载时间稍长，请耐心等待.");
            }),
            cc.delayTime(0.5), cc.callFunc(function() {
                waitTip.setString("首次加载时间稍长，请耐心等待..");
            }),
            cc.delayTime(0.5), cc.callFunc(function() {
                waitTip.setString("首次加载时间稍长，请耐心等待...");
            })
        ).repeatForever());
        this.addChild(waitTip);

        var closeBtn = new ccui.Button();
        closeBtn.loadTextureNormal("webview/guanbi_chuanqi.png");
        setWgtLayout(closeBtn, [0.03, 0.03], [1, 1], [-2, -2]);
        var that = this;
        closeBtn.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    that.close();
                    break;
                default:
                    break;
            }
        }, this);
        this.addChild(closeBtn);

        this._image = image;
        this._waitTip = waitTip;
        this._closeBtn = closeBtn;
    },
    getUrl: function(cfg) {
        var appId = cfg.appIds[MjClient.getAppType()];
        var userId = String(appId * 10000000 + MjClient.data.pinfo.uid);
        var appKey = cfg.appKey;
        var package = MjClient.native.GetPackageName();
        var time = parseInt(new Date().getTime() / 1000);
        var signStr = "userId=" + userId + "&appId=" + appId + "&package=" + package + "&time=" + time + "&appKey=" + appKey;
        var sign = util.md5.hex_md5(signStr);
        return cfg.url + (cfg.url.indexOf("?") == -1 ? "?" : "&") + "userId=" + userId + "&appId=" + appId + "&package=" + package + "&time=" + time + "&sign=" + sign;
    },
    ctor: function(cfg) {
        this._super();
        this._cfg = cfg;
        var that = this;

        if (cfg.isVerticalScreen && !this.toVerticalScreen())
            return;

        this.setWaitLayer(cfg.waitImgFile);

        var url = this.getUrl(cfg);
        cc.log(url);

        if (ccui.WebView) {
            this.webView = new ccui.WebView();
            this.webView.setPosition(MjClient.size.width / 2, MjClient.size.height / 2);
            this.webView.setContentSize(MjClient.size);
            this.webView.loadURL(url);
            this.webView.setScalesPageToFit(true);
            this.webView.setJavascriptInterfaceScheme("cocosjs");
            this.webView.setColor(cc.BLACK);
            this.addChild(this.webView);
            this.webView.setEventListener(ccui.WebView.EventType.LOADED, function() {
                that.webView.visible = true;
                that._waitTip.removeFromParent();
                that._image.removeFromParent();
                that._closeBtn.removeFromParent();
                that.loaded();
            });
            this.webView.visible = false;
            this.webView.setOnJSCallback(function(sender, url) {
                cc.log("OnJSCallback:" + url);
                if (url.indexOf("cocosjs://close") >= 0) {
                    MjClient.thirdPartyWebviewLayer.close();
                } else if (url.indexOf("cocosjs://pay?") >= 0) {
                    var paras = url.replace("cocosjs://pay?","");
                    if (paras.length > 0) {
                        paras = decodeURI(paras);
                        if (paras.indexOf("title") != -1 && paras.indexOf("content") != -1 && paras.indexOf("url") != -1) {
                            var obj = JSON.parse(paras);
                            MjClient.native.wxShareUrl(obj.url, unescape(obj.title), unescape(obj.content));
                        }
                        else if (paras.indexOf("http") == 0) {
                            MjClient.native.OpenUrl(paras);
                        } else if (paras.indexOf("prepayId") >= 0) {
                            MjClient.native.pay(PayPlatformType.WEIXIN, JSON.parse(paras));
                        } else {
                            MjClient.native.pay(PayPlatformType.IAPPPAY, JSON.parse(paras));
                        }
                    }
                }
            });
        }

        if (cc.sys.isObjectValid(MjClient.webViewLayer)) {
            MjClient.webViewLayer.close();
        }
        MjClient.thirdPartyWebviewLayer = this;

        if (MjClient.homeui) {
            MjClient.homeui.removeFromParent();
            MjClient.homeui = null;
        }
        if (MjClient.playui) {
            MjClient.playui.removeFromParent();
            MjClient.playui = null;
        }
        MjClient.Scene.unscheduleUpdate();
        if (MjClient.gamenet) MjClient.gamenet.disconnect();
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic();
    },
    loaded: function() {
        // todo 子类实现可用来友盟打点
    },
    close: function() {
        this.webView = null;
        MjClient.thirdPartyWebviewLayer = null;
        this.removeFromParent(true);
        MjClient.native.setOrientation(true);
        screenChange();

        MjClient.Scene.scheduleUpdate();
        MjClient.addHomeView();
        postEvent("disconnect", 6);
    }
});

var ChuanQiWebviewLayer = ThirdPartyWebviewLayer.extend({
    _enterWay: null,
    ctor: function(enterWay) {
        this._super(chuanQi_cfg);
        this._enterWay = enterWay;
    },
    loaded: function() {
        this._super();
        if (!this._enterWay) {
            MjClient.native.umengEvent4CountWithProperty("zhujiemian_chuanqi_tiaozhuan", {
                uid: SelfUid()
            });
        } else if (this._enterWay == 1) {
            MjClient.native.umengEvent4CountWithProperty("adv_chuanqi_tiaozhuan", {
                uid: SelfUid()
            });
        }
    }
});

var BaZiSuanMianWebviewLayer = ThirdPartyWebviewLayer.extend({
    ctor: function() {
        this._super(baZiSuanMian_cfg);

        if (this._waitTip)
            setWgtLayout(this._waitTip, [0, 0.022], [0.5, 0.54], [-0.5, 0]);
    },
    loaded: function() {
        this._super();
        MjClient.native.umengEvent4CountWithProperty("zhujiemian_bazisuanmian_tiaozhuan", {
            uid: SelfUid()
        });
    }
});

// 热血合击
var RexueHejiWebviewLayer = ThirdPartyWebviewLayer.extend({
    ctor: function() {
        this._super(rexueHeji_cfg);

        if (this._waitTip)
            setWgtLayout(this._waitTip, [0, 0.022], [0.5, 0.515], [-0.5, 0]);
    },
    loaded: function() {
        this._super();
        MjClient.native.umengEvent4CountWithProperty("zhujiemian_rexueheji_tiaozhuan", {
            uid: SelfUid()
        });
    }
});

// 捕鱼
var BuyuWebviewLayer = ThirdPartyWebviewLayer.extend({
    ctor: function() {
        this._super(buyu_cfg);

        if (this._waitTip)
            setWgtLayout(this._waitTip, [0, 0.044], [0.5, 0.07], [-0.5, 0]);
    },
    loaded: function() {
        this._super();
        MjClient.native.umengEvent4CountWithProperty("zhujiemian_buyu_tiaozhuan", {
            uid: SelfUid()
        });
    }
});

// 王者战神
var WangzheZhanshenWebviewLayer = ThirdPartyWebviewLayer.extend({
    ctor: function() {
        this._super(wangzheZhanshen_cfg);

        if (this._waitTip)
            setWgtLayout(this._waitTip, [0, 0.044], [0.5, 0.07], [-0.5, 0]);
    },
    loaded: function() {
        this._super();
        MjClient.native.umengEvent4CountWithProperty("zhujiemian_wangzhezhanshen_tiaozhuan", {
            uid: SelfUid()
        });
    }
});

// 魔域来了
var MoyuLaileWebviewLayer = ThirdPartyWebviewLayer.extend({
    ctor: function() {
        this._super(moyuLaile_cfg);

        if (this._waitTip)
            setWgtLayout(this._waitTip,[0, 0.022], [0.5, 0.52], [-0.5, 0]);
    },
    loaded: function() {
        this._super();
        MjClient.native.umengEvent4CountWithProperty("zhujiemian_moyulaile_tiaozhuan", {
            uid: SelfUid()
        });
    }
});

// 善奇命理
var QiShanMianLiWebviewLayer = ThirdPartyWebviewLayer.extend({
    ctor: function() {
        this._super(qiShanMianLi_cfg);

        if (this._waitTip)
            setWgtLayout(this._waitTip, [0, 0.022], [0.5, 0.5], [-0.5, 2]);
    },
    loaded: function() {
        this._super();
        MjClient.native.umengEvent4CountWithProperty("zhujiemian_qiShanMianLi_tiaozhuan", {
            uid: SelfUid()
        });
    }
});

// 爆金捕鱼
var BaoJinBuYuWebviewLayer = ThirdPartyWebviewLayer.extend({
    ctor: function() {
        this._super(baoJinBuYu_cfg);

        if (this._waitTip)
            setWgtLayout(this._waitTip, [0, 0.044], [0.5, 0.07], [-0.5, 0]);
    },
    loaded: function() {
        this._super();
        MjClient.native.umengEvent4CountWithProperty("zhujiemian_baoJinBuYu_tiaozhuan", {
            uid: SelfUid()
        });
    }
});

// 斩月屠龙
var ZhanYueTuLongWebviewLayer = ThirdPartyWebviewLayer.extend({
    ctor: function() {
        this._super(zhanYueTuLong_cfg);

        if (this._waitTip)
            setWgtLayout(this._waitTip, [0, 0.022], [0.5, 0.54], [-0.5, 0]);
    },
    loaded: function() {
        this._super();
        MjClient.native.umengEvent4CountWithProperty("zhujiemian_zhanYueTuLong_tiaozhuan", {
            uid: SelfUid()
        });
    }
});

JianDangJiangHuWebviewLayer = ThirdPartyWebviewLayer.extend({
    ctor: function() {
        this._super(jianDangJiangHu_cfg);

        if (this._waitTip)
            setWgtLayout(this._waitTip, [0, 0.022], [0.5, 0.5], [-0.5, 2]);
    },
    loaded: function() {
        this._super();
        MjClient.native.umengEvent4CountWithProperty("zhujiemian_jianDangJiangHu_tiaozhuan", {
            uid: SelfUid()
        });
    }
});

var haveThirdPartyWebView = function() {
    return MjClient.daiLiWebViewLayer ||
        MjClient.thirdPartyWebviewLayer;
}
