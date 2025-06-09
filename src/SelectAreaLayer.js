var selectAreaDatas = [];

// 此函数用来生成gameTypes配置// 地图上的显示地区
var initSelectAreaData_yueyang = function() {
    selectAreaDatas = [
        {
            common: "通用",
            gameCnNames: [GameCnName[MjClient.GAME_TYPE.CHANG_SHA_ER_REN], GameCnName[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ], "11张跑得快", "红中麻将", "转转麻将", "长沙麻将", "跑得快", "欢乐斗地主", GameCnName[MjClient.GAME_TYPE.SAN_DA_HA], GameCnName[MjClient.GAME_TYPE.SAN_DA_HA_NEW], "衡阳三打哈",
            ,"永州包牌", ],
            gameTypes: [],
         }
         ,
        {
            yueyang: "岳阳市",
            gameCnNames: [GameCnName[MjClient.GAME_TYPE.CHANG_SHA_ER_REN], GameCnName[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ], "11张跑得快", "湘阴推倒胡", "岳阳红中", "捉虾子", GameCnName[MjClient.GAME_TYPE.SAN_DA_HA], "岳阳三打哈", "捉红字", "湘阴捉红字", "岳阳歪胡子",
                "福禄寿", "长沙麻将", "一脚赖油", "打炸弹", "平江扎鸟", "福禄寿20张", "炒股麻将"
            ],
            gameTypes: [],
        },
        {
            yiyang: "益阳市",
            gameCnNames: [GameCnName[MjClient.GAME_TYPE.CHANG_SHA_ER_REN], GameCnName[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ], "11张跑得快", "益阳歪胡子", "益阳麻将", "桃江麻将", "安化七王麻将", "安化四王麻将", "安化跑胡子", "沅江麻将", "沅江千分", "掂坨", "南县鬼胡子", "沅江鬼胡子", "南县麻将"],
            gameTypes: [],
        },
        {
            changsha: "长沙市",
            gameCnNames: [GameCnName[MjClient.GAME_TYPE.CHANG_SHA_ER_REN], GameCnName[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ], "11张跑得快", "宁乡跑胡子", "宁乡开王麻将", "宁乡麻将"],
            gameTypes: [],
        },
        {
            zhuzhou: "株洲市",
            gameCnNames: [GameCnName[MjClient.GAME_TYPE.CHANG_SHA_ER_REN], GameCnName[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ], "11张跑得快", "株洲牛十别", "株洲碰胡", "株洲打码子"],
            gameTypes: [],
        },
        {
            chenzhou: "郴州市",
            gameCnNames: [GameCnName[MjClient.GAME_TYPE.CHANG_SHA_ER_REN], GameCnName[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ], "11张跑得快", "郴州字牌", "桂阳字牌", "六胡抢", "郴州毛胡子", "郴州麻将", "耒阳字牌"],
            gameTypes: [],
        },
        {
            xiangxi: "湘西",
            gameCnNames: [GameCnName[MjClient.GAME_TYPE.CHANG_SHA_ER_REN], GameCnName[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ], "11张跑得快", "湘西2710", "96扑克"],
            gameTypes: [],
        },
        {
            changde: "常德市",
            gameCnNames: [GameCnName[MjClient.GAME_TYPE.CHANG_SHA_ER_REN], GameCnName[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ], "11张跑得快", "常德跑胡子", "汉寿跑胡子","石门跑胡子", "安乡偎麻雀"],
            gameTypes: [],
        },
        {
            yongzhou: "永州市",
            gameCnNames: [GameCnName[MjClient.GAME_TYPE.CHANG_SHA_ER_REN], GameCnName[MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ], "11张跑得快", "落地扫", "六胡抢","十胡卡","江永15张","王钓麻将","永州麻将","转转麻将","长沙麻将","江华麻将","道州麻将",""],
            gameTypes: [],
        }
    ];

    initSelectAreaDataGameTypes(selectAreaDatas);
}


// 此函数用来生成gameTypes配置
var initSelectAreaData_hubei = function() {
    selectAreaDatas = [
        {
            common: "通用",
            gameCnNames: ["血流成河","一痞二癞", "一脚癞油", "京山麻将", "崇阳麻将", "通城麻将", "大冶开口番", "戳虾子", "阳新麻将", "红中癞子杠", "黄石晃晃", "通山晃晃", "江陵红中", "蕲春晃晃", "蕲春广东麻将", "石首捱晃", "潜江晃晃", "武穴麻将","孝感卡五星", "蕲春红中杠","随州卡五星","武穴510K", "湖北跑得快", "武穴隔板", "崇阳打滚", "大冶510K", "欢乐斗地主", "蕲春地主", "崇阳画圈脚", "通山打拱", "蕲春打拱", "大冶打拱","潜江千分","当阳翻精", "大冶字牌", "宜昌上大人", "湖北花牌", "公安花牌", "通城个子牌", "恩施绍胡"],
            gameTypes: [],
        }, 
        {
            enshi: "恩施市",
            gameCnNames: ["一痞二赖","恩施绍胡"],
            gameTypes: [],
        }, 
        {
            yichang: "宜昌市",
            gameCnNames: ["宜昌上大人","当阳翻金","血流成河"],
            gameTypes: [],
        }, 
        {
            jingzhou: "荆州市",
            gameCnNames: ["公安跑得快","公安花牌","一脚赖油","洪湖跑得快","洪湖戳虾子","江陵红中","江陵跑得快","湖北跑得快","一脚赖油","湖北花牌","血流成河","石首捱晃"],
            gameTypes: [],
        }, 
        {
            jingmen: "荆门市",
            gameCnNames: ["京山麻将"],
            gameTypes: [],
        }, 
        {
            suizhou: "随州市",
            gameCnNames: ["随州卡五星"],
            gameTypes: [],
        }, 
        {
            xiaogan: "孝感市",
            gameCnNames: ["孝感卡五星"],
            gameTypes: [],
        }, 
        {
            wuhan: "武汉市",
            gameCnNames: [],
            gameTypes: [],
        }, 
        {
            huanggang: "黄冈市",
            gameCnNames: ["武穴五十K","武穴隔板","武穴麻将","蕲春广东麻将","蕲春斗地主","蕲春红中杠","蕲春晃晃麻将","蕲春打拱"],
            gameTypes: [],
        }, 
        {
            xianning: "咸宁市",
            gameCnNames: ["崇阳画圈圈","崇阳麻将","崇阳打滚","通城麻将","通城个字牌","通山晃晃","红中癞子杠","通山打拱"],
            gameTypes: [],
        }, 
        {
            huangshi: "黄石市",
            gameCnNames: ["大冶五十K","大冶字牌","大冶打拱","大冶开口番","黄石晃晃","阳新麻将"],
            gameTypes: [],
        }, 
    ];

    initSelectAreaDataGameTypes(selectAreaDatas);
}

var initSelectAreaDataGameTypes = function(selectAreaDatas) {
    var gameList = [];
    for (var listName in MjClient.gameListConfig) {
        gameList = gameList.concat(MjClient.gameListConfig[listName]);
    }

    // cc.log(JSON.stringify(gameList));
    for (var i = 0; i < selectAreaDatas.length; i++) {
        var gameCnNames = selectAreaDatas[i].gameCnNames;
        selectAreaDatas[i].gameTypes = [];
        for (var j = 0; j < gameCnNames.length; j++) {
            var exist = false;
            for (var k = 0; k < gameList.length; k++) {
                if (GameCnName[gameList[k]] == gameCnNames[j]) {
                    selectAreaDatas[i].gameTypes.push(gameList[k]);
                    exist = true;
                    break;
                }
            }
            if (!exist)
                cc.log("本APP不存在玩法:" + gameCnNames[j]);
        }

        if (i != 0) {
            for (var j = 0; j < selectAreaDatas[0].gameTypes.length; j ++) {
                if (selectAreaDatas[i].gameTypes.indexOf(selectAreaDatas[0].gameTypes[j]) < 0)
                    selectAreaDatas[i].gameTypes.push(selectAreaDatas[0].gameTypes[j]);
            }
        }
    }
    cc.log(JSON.stringify(selectAreaDatas));
}

// 此函数用来生成gameTypes配置
var initSelectAreaData_shaoyang = function() {
    selectAreaDatas = [
        {
            common: "通用",
            gameCnNames: ["急速8张麻将", "大字剥皮", "邵阳剥皮", "娄底放炮罚", "十胡卡", "六胡抢", "安化跑胡子", "转转麻将", "红中麻将", "长沙麻将", "跑得快", "欢乐斗地主", "干瞪眼"],
            gameTypes: [],
        }, 
        {
            shaoyang: "邵阳市",
            gameCnNames: ["急速8张麻将", "邵阳字牌", "邵阳麻将", "新宁麻将", "王钓麻将", "打筒子", "半边天炸", "霸炸弹"],
            gameTypes: [],
        }, 
        {
            hengyang: "衡阳市",
            gameCnNames: ["急速8张麻将", "十五胡", "二人跑胡子", GameCnName[MjClient.GAME_TYPE.YUE_YANG_PENG_HU], "鬼麻将", "258麻将", "衡阳三打哈"],
            gameTypes: [],
        }, 
        {
            xiangtan: "湘潭市",
            gameCnNames: ["急速8张麻将", "湘乡告胡子", "湘乡跑胡子", "湘潭跑胡子", "湘潭三打哈"],
            gameTypes: [],
        }, 
        {
            yongzhou: "永州市",
            gameCnNames: ["急速8张麻将", GameCnName[MjClient.GAME_TYPE.PAO_HU_ZI], "落地扫", "江永十五张", "江华麻将", "永州麻将", "道州麻将", "王钓麻将", "永州包牌"],
            gameTypes: [],
        }, 
        {
            huaihua: "怀化市",
            gameCnNames: ["急速8张麻将", "怀化红拐弯", "沅陵跑胡子", "溆浦老牌", "溆浦跑胡子", "怀化麻将"],
            gameTypes: [],
        }, 
        {
            loudi: "娄底市",
            gameCnNames: ["急速8张麻将", "冷水江十胡倒"],
            gameTypes: [],
        }
    ];

    initSelectAreaDataGameTypes(selectAreaDatas);
}

var initSelectAreaData_jinzhong = function() {
    selectAreaDatas = [];

    var all = getAllGameListArray();
    for (var i = 1; i < all._gameTypeList.length; i++) {
        var areaName = all._btnPicArray[i];
        var list = {gameTypes: all._gameTypeList[i]}
        list[areaName] = all._btnNameArray[i];
        selectAreaDatas.push(list);
    }
    cc.log(JSON.stringify(selectAreaDatas));
}

var initSelectAreaData = function() {
    if (MjClient.APP_TYPE.QXYYQP == MjClient.getAppType() || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
        return initSelectAreaData_yueyang();
    else if (MjClient.APP_TYPE.HUBEIMJ == MjClient.getAppType())
        return initSelectAreaData_hubei();
    else if (isJinZhongAPPType())
        return initSelectAreaData_jinzhong();
    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
        return initSelectAreaData_shaoyang();
}

var getSelectAreaData = function(areaName) {
    if (!areaName || areaName == "")
        return null;

    for (var i = 0; i < selectAreaDatas.length; i++) {
        if (selectAreaDatas[i][areaName])
            return selectAreaDatas[i];
    }
    return null;
}

SelectAreaLayer = cc.Layer.extend({
    ctor:function (curAreaName) {
        this._super();

        initSelectAreaData();

        curAreaName = curAreaName || "";

        var ui = ccs.load("selectArea.json");
        this.addChild(ui.node);

        this._mapData = jsb.fileUtils.getStringFromFile("selectArea/mapData.json");
        if (this._mapData) {
            try {
                this._mapData = JSON.parse(this._mapData);
            } catch (e) {
                cc.log("parse mapData error");
            }
        }

        var scrollView = ui.node.getChildByName("scrollView");
        scrollView.setScrollBarOpacity(0);
        setWgtLayout(scrollView, [1, 1], [0.5, 0.5], [0, 0], true);

        var map = scrollView.getChildByName("map");
        var mapScale = (1280/720)/(MjClient.size.width/MjClient.size.height);
        if (mapScale < 1)
            map.setScale(mapScale);
        cc.log("mapScale:" + map.getScale());
        scrollView.setInnerContainerSize(cc.size(map.width * map.getScaleX(), map.height * map.getScaleY()));
        map.x = map.width * map.getScaleX() / 2;
        map.y = map.height * map.getScaleY() / 2;
        this._map = map;

        var children = map.children;
        for (var i = 0; i < children.length; i++) {
            children[i].setVisible(false);
        }

        cc.eventManager.addListener(cc.EventListener.create(this.getTouchListener()), map);

        scrollView.jumpToPercentBothDirection(cc.p(35, 35 * mapScale));

        var leftPanel = ui.node.getChildByName("leftPanel");
        setWgtLayout(leftPanel, [0, 1], [0, 0.5], [0.5, 0]);
        this._leftPlanel = leftPanel;

        this._curAreaName = "";
        this.refreshSelect(curAreaName);

        var yunLeft = ui.node.getChildByName("yunLeft");
        setWgtLayout(yunLeft, [0, 1], [0, 0.5], [0, 0]);

        var yunRight = ui.node.getChildByName("yunRight");
        setWgtLayout(yunRight, [0, 1], [1, 0.5], [0, 0]);

        yunLeft.runAction(cc.sequence(cc.moveTo(1, cc.p(-yunLeft.width*yunLeft.getScaleX(), yunLeft.y))));
        yunRight.runAction(cc.sequence(cc.moveTo(1, cc.p(yunRight.x + yunRight.width*yunLeft.getScaleX(), yunRight.y))));

        var backBtn = leftPanel.getChildByName("backBtn");
        backBtn.addTouchEventListener(function(sender, type) {
            if (type != 2)
                return;

            this.removeFromParent();
        }.bind(this));

        var sureBtn = leftPanel.getChildByName("sureBtn");
        sureBtn.addTouchEventListener(function(sender, type) {
            if (type != 2)
                return;

            if (this._curAreaName != curAreaName) {
                switch (this._curAreaName) {
                    case "yueyang":
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian_Xuanzediqu_Yueyang", {uid:SelfUid()});
                        break;
                    case "yiyang":
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian_Xuanzediqu_Yiyang", {uid:SelfUid()});
                        break;
                    case "changsha":
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian_Xuanzediqu_Changsha", {uid:SelfUid()});
                        break;
                    case "zhuzhou":
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian_Xuanzediqu_Zhuzhou", {uid:SelfUid()});
                        break;
                    case "chenzhou":
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian_Xuanzediqu_Chenzhou", {uid:SelfUid()});
                        break;
                    case "xiangxi":
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian_Xuanzediqu_Xiangxi", {uid:SelfUid()});
                        break;
                }

                util.localStorageEncrypt.setStringItem("KEY_selectArea", this._curAreaName);
                postEvent("selectArea");
            }
            this.removeFromParent();
        }.bind(this));
    },
    getTouchListener: function() {
        var curAreaName = "";
        var that = this;
        var map = this._map;
        var beginP = null;
        var ret = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function(touch, event) {
                curAreaName = "";
                var p = map.convertToNodeSpace(touch.getLocation());
                var children = map.children;
                for (var i = 0; i < children.length; i++) {
                    if (that.checkTouch(children[i].getName(), children[i], p)) {
                        curAreaName = children[i].getName();
                        beginP = touch.getLocation();
                        break;
                    }
                }

                return curAreaName != "";
            },
            onTouchMoved: function(touch, event) {
                if (curAreaName == "")
                    return;

                var p = touch.getLocation();
                var distance = Math.sqrt((p.x - beginP.x) * (p.x - beginP.x) + (p.y - beginP.y) * (p.y - beginP.y));
                if (distance > 30 * MjClient.size.width / 1280) {
                    curAreaName = "";
                }
            },
            onTouchEnded: function(touch, event) {
                if(curAreaName == "")
                    return;

                if (getSelectAreaData(curAreaName)) {
                    var node =  map.getChildByName(curAreaName);
                    node.setVisible(!node.isVisible());
                    if (!node.isVisible())
                        curAreaName = "";
                }
                
                that.refreshSelect(curAreaName);
            },
            onTouchCancelled: function(touch, event) {
            }
        };
        return ret;
    },
    checkTouch: function(areaName, area, p) {
        var x = p.x - area.x + area.width/2;
        var y = p.y - area.y + area.height/2;
        if (x < 0 || x > area.width || y < 0 || y > area.height)
            return false;

        var mapAreaData = null;
        if (this._mapData && this._mapData.layers) {
            for (var i = 0; i < this._mapData.layers.length; i ++) {
                if (this._mapData.layers[i].name == areaName) {
                    mapAreaData = this._mapData.layers[i];
                    break;
                }
            }
        }
        
        if (!mapAreaData) {
            cc.log("mapData 不存在:" + areaName);
            return true;
        }

        var row = Math.floor((area.height - y) / this._mapData.tileheight);
        var col = Math.floor(x / this._mapData.tilewidth);
        var index = row * mapAreaData.width + col;
        return mapAreaData.data[index] > 0;
    },
    refreshSelect: function(curAreaName) {
        var curAreaData = getSelectAreaData(curAreaName);
        if (curAreaName != "" && !curAreaData) {
            MjClient.showToast("该地区暂未开放，敬请期待。");
            return;
        }

        var oldArea = !this._curAreaName || this._curAreaName == "" ? null : this._map.getChildByName(this._curAreaName);
        if (oldArea)
            oldArea.setVisible(false);

        this._curAreaName = curAreaName;
        var newArea = !curAreaName || curAreaName == "" ? null : this._map.getChildByName(this._curAreaName);
        if (newArea)
            newArea.setVisible(true);
    
        var titleLabel = this._leftPlanel.getChildByName("titleLabel");
        titleLabel.ignoreContentAdaptWithSize(true);
        titleLabel.setString(curAreaData ? curAreaData[curAreaName] : "");

        var gameListView = this._leftPlanel.getChildByName("gameListView");
        gameListView.removeAllItems();

        var tempGameNameLabel = this._leftPlanel.getChildByName("gameNameLabel");
        tempGameNameLabel.setVisible(true);

        if (curAreaData) {
            for (var i = 0; i < curAreaData.gameTypes.length; i ++)
            {
                var gameNameLabel = tempGameNameLabel.clone();
                gameNameLabel.setString(GameCnName[curAreaData.gameTypes[i]]);
                gameListView.pushBackCustomItem(gameNameLabel);
            }
        }

        var nullTipLabel = this._leftPlanel.getChildByName("nullTipLabel");
        nullTipLabel.setVisible(!curAreaData);

        tempGameNameLabel.setVisible(false);
        gameListView.forceDoLayout();
    }
});