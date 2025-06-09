// ------牌友联盟岳阳棋牌 切换场景 3.0--------

MjClient.shopThemeList = {
    100:{//钟南山
        titleStr:"众志成城",
        homeTitle:"众志成城",
        title:"title_zhongzhichengcheng.png",
        bg:"bg_zhongnanshan.png",
        bgMusic:"YDGC.mp3",
        haveTouchAni:[false, false],
        icon:[
            "zhongzhichengcheng_nan.png",
            "zhongzhichengcheng_nan.png"
        ],
        role:[
            "zhongnanshan",
            "zhongnanshan",
        ],
        rolePos:[
            cc.p(665,100),
            cc.p(665,100),
        ]
    },
}

MjClient.themeList = [
    {//橘子洲头
        titleStr:"橘子洲头",
        homeTitle:"长沙·橘子洲头",
        title:"title_juzizhoutou.png",
        bg:"bg_juzizhoutou.jpg",
        bgMusic:"JZZT.mp3",
        haveTouchAni:[true, true],
        icon:[
            "juzizhoutouxiao_nan.png",
            "juzizhoutouxiao_nv.png"
        ],
        role:[
            "changshanan",
            "changshanv",
        ],
        rolePos:[
            cc.p(653,110),
            cc.p(653,110),
        ]
    },
    {//凤凰古城
        titleStr:"凤凰古城",
        homeTitle:"苗族·凤凰古城",
        title:"title_fenghuanggucheng.png",
        bg:"bg_fenghuanggucheng.jpg",
        bgMusic:"FHGC.mp3",
        haveTouchAni:[true, false],
        icon:[
            "fenghuangguchengxiao_nan.png",
            "fenghuangguchengxiao_nv.png"
        ],
        role:[
            "miaonan",
            "miaozunv",
        ],
        rolePos:[
            cc.p(653,110),
            cc.p(653,110),
        ]
    },
    {//九嶷山
        titleStr:"九嶷山",
        homeTitle:"永州·九嶷山",
        title:"title_jiuyiwanxia.png",
        bg:"bg_jiuyishan.jpg",
        bgMusic:"JYS.mp3",
        haveTouchAni:[false, false],
        icon:[
            "jiuyiwanxiaxiao_nan.png",
            "jiuyiwanxiaxiao_nv.png"
        ],
        role:[
            "yongzhounan",
            "yongzhounv",
        ],
        rolePos:[
            cc.p(653,110),
            cc.p(653,110),
        ]
    },
    {//东江垂钓
        titleStr:"东江垂钓",
        homeTitle:"郴州·东江垂钓",
        title:"title_dongjiangchudiao.png",
        bg:"bg_dongjiangchuidiao.jpg",
        bgMusic:"DJCD.mp3",
        haveTouchAni:[false, false],
        particle:"maomaoxiyu.plist",
        icon:[
            "dongjiangchuidiaoxiao_nan.png",
            "dongjiangchuidiaoxiao_nv.png"
        ],
        role:[
            "chenzhounan",
            "chenzhounv",
        ],
        rolePos:[
            cc.p(665,245),
            cc.p(650,155),
        ]
    },
    {//赛事盛典
        titleStr:"赛事盛典",
        homeTitle:"益阳·赛事盛典",
        title:"title_saishishengdian.png",
        bg:"bg_saishishengyan.jpg",
        bgMusic:"SSSD.mp3",
        haveTouchAni:[false, false],
        icon:[
            "saishishengdianxiao_nan.png",
            "saishishengdianxiao_nv.png"
        ],
        role:[
            "yiyangnan",
            "yiyangnv",
        ],
        rolePos:[ 
            cc.p(670,110),
            cc.p(670,110),
        ]

    },
    {//桃花源记
        titleStr:"桃花源记",
        homeTitle:"常德·桃花源记",
        title:"title_taohuayuanji.png",
        bg:"bg_taohuayuanji.jpg",
        bgMusic:"THYJ.mp3",
        haveTouchAni:[false, false],
        icon:[
            "taohuayuanjixiao_nan.png",
            "taohuayuanjixiao_nv.png"
        ],
        role:[
            "changdenan",
            "changdenv",
        ],
        rolePos:[
            cc.p(653,120),
            cc.p(630,110),
        ]
    },
    {//岳阳楼记
        titleStr:"岳阳楼记",
        homeTitle:"岳阳·岳阳楼记",
        title:"title_yuayanglouji.png",
        bg:"bg_yueyanglou.jpg",
        bgMusic:"YYLJ.mp3",
        haveTouchAni:[false, false],
        icon:[
            "yueyangloujixiao_nan.png",
            "yueyangloujixiao_nv.png"
        ],
        role:[
            "yueyangnan",
            "yueyangnv",
        ],
        rolePos:[
            cc.p(635,125),
            cc.p(653,110),
        ]
    },
    {//株洲
        titleStr:"炎帝广场",
        homeTitle:"株洲·炎帝广场",
        title:"title_yandiguangchang.png",
        bg:"bg_zhuzhou.jpg",
        bgMusic:"YDGC.mp3",
        haveTouchAni:[false, false],
        icon:[
            "taiyangguangchangxiao_nan.png",
            "taiyangguangchangxiao_nv.png"
        ],
        role:[
            "zhuzhounan",
            "zhuzhounv",
        ],
        rolePos:[
            cc.p(653,110),
            cc.p(653,110),
        ]
    },
];


if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
    MjClient.themeList = [
        {//崀山美景
            titleStr:"崀山美景",
            homeTitle:"邵阳·崀山美景",
            title:"title_liangshanmeijing.png",
            bg:"shaoyang_liangshanmeijing.png",
            bgMusic:"JZZT.mp3",
            haveTouchAni:[true, true],
            icon:[
                "langshanmeijing_nan.png",
                "langshanmeijing_nv.png"
            ],
            role:[
                "changdenan",
                "changdenv",
            ],
            rolePos:[
                cc.p(600,80),
                cc.p(600,80),
            ]
        },
        {//南岳衡山
            titleStr:"南岳衡山",
            homeTitle:"衡阳·南岳衡山",
            title:"title_nanyuehengshan.png",
            bg:"hengyang_nanyuehengshan.png",
            bgMusic:"JZZT.mp3",
            haveTouchAni:[false, false],
            icon:[
                "nanyuehengshan_nan.png",
                "nanyuehengshan_nv.png"
            ],
            role:[
                "zhuzhounan",
                "zhuzhounv",
            ],
            rolePos:[
                cc.p(653,110),
                cc.p(653,110),
            ]
        },
        {//石鼓书院
            titleStr:"石鼓书院",
            homeTitle:"衡阳·石鼓书院",
            title:"title_shigushuyuan.png",
            bg:"hengyang_shigushuyuan.png",
            bgMusic:"JZZT.mp3",
            haveTouchAni:[false, false],
            icon:[
                "shigushuyuan_nan.png",
                "shigushuyuan_nv.png"
            ],
            role:[
                "yueyangnan",
                "yueyangnv",
            ],
            rolePos:[
                cc.p(653,110),
                cc.p(653,110),
            ]
        },
        {//安江袁隆平
            titleStr:"杂交水稻",
            homeTitle:"怀化·杂交水稻",
            title:"title_zajiaoshuidao.png",
            bg:"huaihua_anjiangyuanlongpin.png",
            bgMusic:"JZZT.mp3",
            haveTouchAni:[false, false],
            icon:[
                "anjiangyuanlongping_nan.png",
                "anjiangyuanlongping_nv.png"
            ],
            role:[
                "changdenan",
                "changdenv",
            ],
            shelter:"daocao.png",
            rolePos:[
                cc.p(565,90),
                cc.p(565,90),
            ]
        },
        {//风雨桥
            titleStr:"风雨桥旁",
            homeTitle:"怀化·风雨桥旁",
            title:"title_fengyuqiaopang.png",
            bg:"huaihua_fengyuqiao.png",
            bgMusic:"JZZT.mp3",
            haveTouchAni:[true, true],
            icon:[
                "fengyuqiao_nan.png",
                "fengyuqiao_nv.png"
            ],
            role:[
                "changshanan",
                "changshanv",
            ],
            rolePos:[
                cc.p(653,110),
                cc.p(653,110),
            ]
        },
        {//紫鹊桥梯田
            titleStr:"紫鹊梯田",
            homeTitle:"娄底·紫鹊梯田",
            title:"title_zihetitian.png",
            bg:"loudi_ciheqiaotitian.png",
            bgMusic:"JZZT.mp3",
            haveTouchAni:[true, false],
            icon:[
                "ziqueqiaotitian_nan.png",
                "ziqueqiaotitian_nv.png"
            ],
            role:[
                "miaonan",
                "miaozunv",
            ],
            rolePos:[
                cc.p(653,110),
                cc.p(653,110),
            ]
        },
        {//曾公故居
            titleStr:"曾公故居",
            homeTitle:"湘潭·曾公故居",
            title:"title_guopanguju.png",
            bg:"xiangtan_guofanguju.png",
            bgMusic:"JZZT.mp3",
            haveTouchAni:[true, true],
            icon:[
                "guofanguju_nan.png",
                "guofanguju_nv.png"
            ],
            role:[
                "changdenan",
                "changdenv",
            ],
            rolePos:[
                cc.p(653,110),
                cc.p(653,110),
            ]
        },
        {//九嶷山
            titleStr:"九嶷山",
            homeTitle:"永州·九嶷山",
            title:"title_jiuyiwanxia.png",
            bg:"bg_jiuyishan.jpg",
            bgMusic:"JYS.mp3",
            haveTouchAni:[false, false],
            icon:[
                "jiuyiwanxiaxiao_nan.png",
                "jiuyiwanxiaxiao_nv.png"
            ],
            role:[
                "yongzhounan",
                "yongzhounv",
            ],
            rolePos:[
                cc.p(653,110),
                cc.p(653,110),
            ]
        },
    ]
}
else if(MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ){
   MjClient.themeList = [
        {//黄鹤楼记
            titleStr:"黄鹤楼记",
            homeTitle:"武昌·黄鹤楼记",
            title:"title_huanghelou.png",
            bg:"bg_huanghelou.png",
            bgMusic:"JZZT.mp3",
            haveTouchAni:[true, true],
            icon:[
                "huanghelouji_nan_xiao.png",
                "bg_huanghelouji_nv_xiao.png"
            ],
            role:[
                "changshanan",
                "changshanv",
            ],
            rolePos:[
                cc.p(653,110),
                cc.p(653,110),
            ]
        },
        {//三峡大坝
            titleStr:"三峡大坝",
            homeTitle:"宜昌·三峡大坝",
            title:"title_sanxiadaba.png",
            bg:"bg_sanxiadaba.png",
            bgMusic:"JZZT.mp3",
            haveTouchAni:[true, true],
            icon:[
                "sanxiadaba_nan_xiao.png",
                "sanxiadaba_nv_xiao.png"
            ],
            role:[
                "changshanan",
                "changshanv",
            ],
            rolePos:[
                cc.p(653,110),
                cc.p(653,110),
            ]
        },
        {//武当山巅
            titleStr:"武当山巅",
            homeTitle:"十堰·武当山巅",
            title:"title_wudangshan.png",
            bg:"bg_wudangshan.png",
            bgMusic:"JZZT.mp3",
            haveTouchAni:[false, false],
            icon:[
                "wudangshandian_nan_xiao.png",
                "wudangshandian_xiaonv.png"
            ],
            role:[
                "changdenan",
                "changdenv",
            ],
            rolePos:[
                cc.p(653,110),
                cc.p(653,110),
            ]
        }
    ] 
}

if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || 
    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {

    MjClient.themeList.push({ //新年theme
        titleStr: "恭贺新春",
        homeTitle: "天宫·恭贺新春",
        title: "title_gonghexinchun.png",
        bg: "bg_tiankongbeij.jpg",
        bgMusic: "newYear.mp3",
        haveTouchAni: [false, false],
        icon: [
            "xinnian_nan.png",
            "xinnian_nv.png"
        ],
        role: [
            "nancaishen-daiji",
            "nvcaishen",
        ],
        rolePos: [
            cc.p(653, 110),
            cc.p(683, 110),
        ],
        touchSpine: [
            ["gongxifacai", "wulong", "yuanbao"],
            ["caiyuangungun", "denglong", "jinli"]
        ],
        touchPos: [
            [cc.p(653, 70), cc.p(693, 100), cc.p(693, 110)],
            [cc.p(683, 80), cc.p(683, 90), cc.p(683, 60)]
        ],
        rolePath: [
            "nancaishen", "nvcaishen"
        ],
        isNewYear: true
    });
}

MjClient.defaultThemeNum = MjClient.themeList.length;
// 把当前使用的UI索引存在后端
MjClient.setSkinToServer = function(uiIndex, successCallBack) {
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.updateUISkin", {type: uiIndex}, function(rtn) {
        MjClient.unblock();

        if (rtn.code == 0) {
            MjClient.data.pinfo.uiType = uiIndex;
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_uiSelect, uiIndex);
            successCallBack();
        } else if (rtn.message) {
            MjClient.showToast(rtn.message);
        } else {
            MjClient.showToast("设置失败，请重试！");
        }
    });
}

MjClient.setSkinToLocal = function(uiIndex) {
    if (uiIndex != -1)
        util.localStorageEncrypt.getNumberItem(MjClient.KEY_uiSelect, uiIndex);
    MjClient.switch_skinFresh();
}

// 获取当前使用的UI索引
MjClient.getUiIndex = function() {
    if (MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.uiType && MjClient.data.pinfo.uiType != -1)
        return MjClient.data.pinfo.uiType;

    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_uiSelect, 2);
}

// 是否使用UI 3.0 版
MjClient.isUseUIv3 = function() {

    return false;//用旧UI

    if (MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ)
        return true;

    if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ)
        return false;
        
    if (MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.uiType && MjClient.data.pinfo.uiType != -1)
        return MjClient.data.pinfo.uiType == 2;

    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_uiSelect, 2) == 2;
}

//亲友圈是否使用ui3.0,如果当前不在亲友圈，返回isUseUIv3
MjClient.isFriendCardUseUIv3 = function() {
    if (MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ)
        return true;
    if(cc.sys.isObjectValid(MjClient.FriendCard_main_ui)){
        return false;
    }
    return MjClient.isUseUIv3();
}

MjClient.getUIThemeIndex = function() {
    if (MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.skinNum && MjClient.data.pinfo.skinNum != -1){   // 皮肤索引，从1开始
        if (MjClient.data.pinfo.skinNum > MjClient.themeList.length) {
            if (!MjClient.shopThemeList[MjClient.data.pinfo.skinNum-1]) {
                MjClient.data.pinfo.skinNum = 1;
            }
        }
        return MjClient.data.pinfo.skinNum - 1;
    }
    else
        return 0;
}

MjClient.getUIThemeRoleSex = function() {
    if (MjClient.data && MjClient.data.pinfo) {
        if (MjClient.data.pinfo.skinSex && MjClient.data.pinfo.skinSex != -1)   // 1男 2女
            return MjClient.data.pinfo.skinSex == 1 ? 0 : 1;
        else
            return MjClient.data.pinfo.sex == 1 ? 0 : 1;
    }
     
    return 0;
}

MjClient.getThemeInfo = function(themeIndex) {
    if (themeIndex >= 100) {//100以上为商城的主题
        if (MjClient.shopThemeList[themeIndex]) {
            return MjClient.shopThemeList[themeIndex];
        }
    }
    if (MjClient.themeList[themeIndex]) {
        return MjClient.themeList[themeIndex];
    }else{
        return MjClient.themeList[0];
    }
}

// 切换 皮肤  需要 切换的界面 在这里面刷新
MjClient.switch_skinFresh = function(){
    Switch_enterRoom();
    Switch_userInfo();
    Switch_bindPhone();

};

var SetTheme = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.node = ccs.load("setThemeLayer.json").node;
        this.addChild(this.node);
        this.initData();
        this.initUi();
    },
    initData:function(){
        this.sex = MjClient.getUIThemeRoleSex();
        this.selectIdx = MjClient.getUIThemeIndex();
        this.curThemeIdx = this.selectIdx;
    },
    initUi:function(){
        var that = this;
        this._back = this.node.getChildByName("back"); 
        this._back.setTouchEnabled(false);
        this._back.getChildByName("img_role").visible = false;

        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0], true);

        if (cc.winSize.width/cc.winSize.height < 1280/720) {
            setWgtLayout(this.node.getChildByName("ListView"), [1, 0.2361], [0.5, 0], [0, 0], false);
        }else{
            setWgtLayout(this.node.getChildByName("ListView"), [1, 0.2361], [0.5, 0], [0, 0], true);
        }
       

        setWgtLayout(this.node.getChildByName("panel_bottom"), [0.0977, 0.0875], [0.9093, 0.9217], [0, 0], false);
        setWgtLayout(this.node.getChildByName("btn_back"), [0.0688, 0.1222], [0.062, 0.9084], [0, 0], false);
        setWgtLayout(this.node.getChildByName("btn_left"), [0.0742, 0.1361], [0.1, 0.5232], [0, 0], false);
        setWgtLayout(this.node.getChildByName("btn_right"), [0.0742, 0.1361], [0.9, 0.5232], [0, 0], false);
        setWgtLayout(this.node.getChildByName("btn_right"), [0.0742, 0.1361], [0.9, 0.5232], [0, 0], false);
        setWgtLayout(this.node.getChildByName("btn_sex"), [0.0977, 0.0875], [0.9093, 0.9217], [0, 0], false);
        setWgtLayout(this.node.getChildByName("btn_set"), [0.1703, 0.1069], [0.5, 0.3140], [0, 0], false);

        this.node.getChildByName("btn_set").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var index = that.selectIdx;
                if (MjClient.themeList[that.selectIdx].shopData) {
                    index = Number(MjClient.themeList[that.selectIdx].shopData.aliasId.replace("DTCJ",""));
                }
                if (MjClient.themeList[that.selectIdx].shopData && !MjClient.themeList[that.selectIdx].shopData.isLocked) {
                    var shopData = MjClient.themeList[that.selectIdx].shopData
                    MjClient.jumpToStoreData = {
                        propId : shopData.propId,
                        packPropId : shopData.packPropId,
                        proptype : shopData.proptype,
                        aliasId : shopData.aliasId,
                        bPack : true,
                    }
                    MjClient.Scene.addChild(enter_store());
                }else{
                    that.setThemeToServer(index, that.sex);
                }
            }
        });

        this.node.getChildByName("btn_back").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent(true);
                if (MjClient.homeui.playSceneChangeAni) {
                    MjClient.homeui.playSceneChangeAni();
                }
                
            }
        });

        that.spineNode = new cc.Node();
        that.spineNode.setZOrder(2)
        that._back.addChild(that.spineNode);
        this.initSex();
        this.initListView();
        this.updateRole();
    },
    initSex: function(){
        var that = this;
        var btn_sex =  this.node.getChildByName("btn_sex");
        var img_boy = btn_sex.getChildByName("img_boy");
        var img_girl = btn_sex.getChildByName("img_girl");
        img_boy.visible = this.sex == 0;
        img_girl.visible = !img_boy.visible;
        btn_sex.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.setThemeToServer(that.curThemeIdx, that.sex ^ 1);
            }
        });
        this.img_boy = img_boy;
        this.img_girl = img_girl;
    },
    refreshSex: function() {
        this.img_boy.visible = this.sex == 0;
        this.img_girl.visible = !this.img_boy.visible;
        var ListView = this.node.getChildByName("ListView");
        var items = ListView.getItems();
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            item.getChildByName("img_bg").loadTexture("home_3.0/setTheme/"+MjClient.themeList[i].icon[this.sex]);
        }
        this.updateRole();
    },
    initListView: function(){
        var that = this;
        var ListView = this.node.getChildByName("ListView");
        var item = this.node.getChildByName("item");
        item.visible = false;
        var themeNum = MjClient.defaultThemeNum;

        this.node.getChildByName("btn_left").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (that.selectIdx>0) {
                    that.selectIdx--;
                }
                that.setItemSelect(that.selectIdx);
                var toIdx = that.selectIdx;
                if (that.selectIdx < 1) {
                    toIdx = 1;
                }
                ListView.scrollToItem(toIdx, cc.p(0.5, 0.0), cc.p(0.5, 0.0));
            }
        });
        this.node.getChildByName("btn_right").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (that.selectIdx<themeNum-1) {
                    that.selectIdx++;
                }
                that.setItemSelect(that.selectIdx);
                var toIdx = that.selectIdx;
                if (that.selectIdx > themeNum-3) {
                    toIdx =  themeNum-3;
                }
                ListView.scrollToItem(toIdx, cc.p(0.5, 0.0), cc.p(0.5, 0.0));
                
            }
        });
        // that.setItemSelect(that.selectIdx);
        //that.setTheme(that.curThemeIdx);
        var curTheme = MjClient.getThemeInfo(that.selectIdx);
        that._back.getChildByName("Image_title").loadTexture("home_3.0/setTheme/" + curTheme.title);
        that._back.loadTexture("home_3.0/bg/" + curTheme.bg);
        this.node.getChildByName("btn_set").setEnabled(this.curThemeIdx != this.selectIdx);
        this.updateRole();  
        

        var setListItem = function(){
            for (var i = 0; i < themeNum; i++) {
                var newItem = item.clone();
                newItem.visible = true;
                var img_bg = newItem.getChildByName("img_bg");
                img_bg.loadTexture("home_3.0/setTheme/"+MjClient.themeList[i].icon[that.sex]);
                var txt_title = img_bg.getChildByName("txt_title");
                txt_title.ignoreContentAdaptWithSize(true);
                txt_title.setString(MjClient.themeList[i].titleStr);
                
                ListView.pushBackCustomItem(newItem);
                img_bg.setTag(i);
                img_bg.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        that.selectIdx = sender.getTag();
                        that.setItemSelect(that.selectIdx)
                    }
                });
            }
            that.setItemSelect(that.selectIdx);
            that.setTheme(that.curThemeIdx);
        }
        if (false) {
            setListItem();
        }else{
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.userDressDTCJList", {}, function(rtn) {
                MjClient.unblock();
                if (rtn.code == 0) { 
                    MjClient.themeList.length = MjClient.defaultThemeNum;
                    for (var i = 0; i < rtn.data.length; i++) {
                        var data = rtn.data[i];
                        var Id = data.aliasId.replace("DTCJ", "")
                        if (MjClient.shopThemeList[Id]) {
                            MjClient.shopThemeList[Id].shopData = data;
                            MjClient.themeList.push(MjClient.shopThemeList[Id]);
                            if (Id==that.selectIdx) {
                                that.selectIdx = themeNum;
                                that.curThemeIdx = themeNum;
                            }
                            themeNum ++;
                        }
                    }
                    setListItem();
                } else if (rtn.message) {
                    MjClient.showToast(rtn.message);
                } else {
                    MjClient.showToast("加载失败，请重试！");
                }
            });
        }
    },
    setTheme:function(themeIdx){
        var ListView = this.node.getChildByName("ListView");
        var allItems = ListView.getItems();
        for(var i = 0; i < allItems.length; i ++){
            var Image_shiyongzhong = allItems[i].getChildByName("img_bg").getChildByName("Image_shiyongzhong");
            Image_shiyongzhong.visible = i == themeIdx;
        }
        this.curThemeIdx = themeIdx;
        playMusic("bgMain");
        this.node.getChildByName("btn_set").setEnabled(this.curThemeIdx != this.selectIdx);
    },
    setItemSelect:function(idx){
        var that = this;
        this.selectIdx = idx;
        var ListView = this.node.getChildByName("ListView");
        var allItems = ListView.getItems();
        for(var i = 0; i < allItems.length; i ++){
            var img_bg = allItems[i].getChildByName("img_bg");
            img_bg.y = 0;
            img_bg.getChildByName("txt_title").setTextColor(cc.color("#e1e1e1"));
        }
        var img_bg = allItems[idx].getChildByName("img_bg")
        img_bg.y += 10;
        img_bg.getChildByName("txt_title").setTextColor(cc.color("#a3ff52"));
        that._back.getChildByName("Image_title").loadTexture("home_3.0/setTheme/" + MjClient.themeList[that.selectIdx].title);
        that._back.loadTexture("home_3.0/bg/" + MjClient.themeList[that.selectIdx].bg);
        var btn_set = this.node.getChildByName("btn_set");
        btn_set.setEnabled(this.curThemeIdx != this.selectIdx);
        if (MjClient.themeList[this.selectIdx].shopData && !MjClient.themeList[this.selectIdx].shopData.isLocked) {
            btn_set.loadTextureNormal("home_3.0/setTheme/btn_shangchengjiesuo.png")
        }else{
            btn_set.loadTextureNormal("home_3.0/setTheme/btn_shiyong.png")
        }
        this.updateRole();   
        //播放粒子特效
        var lizitexiao = this._back.getChildByName("lizitexiao");
        if (!lizitexiao) {
            lizitexiao =  new cc.ParticleSystem();
            lizitexiao.setName("lizitexiao");
            lizitexiao.setZOrder(1);
            this._back.addChild(lizitexiao);
        }
        if (MjClient.themeList[that.selectIdx].particle) {
            lizitexiao.initWithFile("home_3.0/Particle/"+MjClient.themeList[that.selectIdx].particle);
            lizitexiao.setPosition(cc.p(this._back.width/2, this._back.height/2));
            lizitexiao.resetSystem();
            lizitexiao.visible = true;
        }
        else{
            lizitexiao.stopSystem();
            lizitexiao.visible = false;
        }

        var Shelter = this._back.getChildByName("Shelter");
        if (!Shelter){
            Shelter = new ccui.ImageView();
            Shelter.setName("Shelter");
            Shelter.setZOrder(3);
            Shelter.setPosition(cc.p(this._back.width/2, this._back.height/2));
            this._back.addChild(Shelter);
        }
        Shelter.visible = false;
        if (MjClient.themeList[that.selectIdx].shelter) {
            Shelter.visible = true;
            Shelter.loadTexture("res/home_3.0/shelter/" + MjClient.themeList[that.selectIdx].shelter);
        }
    },
    updateRole:function(){
        var theme = MjClient.getThemeInfo(this.selectIdx);
        if (theme.isNewYear) {
            UI30_updateRoteNewYear(this, this.spineNode, this.selectIdx, this.sex, false);
            return;
        }

        var that = this;
        this.spineNode.removeAllChildren();
        var spine = createSpine("home_3.0/role/spine/"+ theme.role[this.sex] +".json", "home_3.0/role/spine/"+ theme.role[this.sex] +".atlas");
        this.spineNode.addChild(spine);
        spine.setAnimation(0, "animation", true);
        

        spine.setPosition(theme.rolePos[this.sex]);
        if (theme.role[this.sex] === "miaozunv") {
            //苗族女,动画做大了，需缩小
            spine.setScale(0.28);
        }

        if (that.roleTouchListener) {
            cc.eventManager.removeListener(that.roleTouchListener);
            that.roleTouchListener = null;
        }

        that.roleTouchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan : function(touch, event){
                if (theme.haveTouchAni[that.sex]) {
                    spine.setAnimation(0, "touchAni", false);
                    spine.addAnimation(0, "animation", true);
                }
                return true;
            }
        });
        cc.eventManager.addListener(that.roleTouchListener, that);
        
    },

    // 把新的theme数据传到服务器
    setThemeToServer: function(index, sex) {
        var that = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.updateSkinNumber", {skinNum: index + 1, skinSex: sex + 1}, function(rtn) {
            MjClient.unblock();
            if (rtn.code == 0) {
                MjClient.data.pinfo.skinNum = index + 1;
                MjClient.data.pinfo.skinSex = sex + 1;
                if (cc.sys.isObjectValid(that)) {
                    index = that.getListIdxBySkinNum(index)
                    if (that.curThemeIdx != index) {
                        that.curThemeIdx = index;
                        that.setTheme(index);
                    }
                    if (that.sex != sex) {
                        that.sex = sex;
                        that.refreshSex();
                    }                    
                }
                postEvent("themeChange", {themeIdx:that.curThemeIdx, sex:that.sex});
            } else if (rtn.message) {
                MjClient.showToast(rtn.message);
            } else {
                MjClient.showToast("设置失败，请重试！");
            }
        });
    },

    //获取皮肤所对应的列表id
    getListIdxBySkinNum: function(skinNum){
        var ret = skinNum;
        if (skinNum >= 100) {
            ret = 0;
            for(var i = MjClient.defaultThemeNum; i<MjClient.themeList.length; i++){
                if (MjClient.themeList[i].shopData && Number(MjClient.themeList[i].shopData.aliasId.replace("DTCJ", ""))==skinNum ) {
                    ret = i;
                    break;
                }
            }
        }
        return ret;
    }
    
});

// 主界面和这个设置界面共用此函数
var UI30_updateRoteNewYear = function(that, spineNode, themeIdx, sex, isTouch, yanwu) {
    if (spineNode.getChildByName("long")) {
        spineNode.removeChildByName("newYearRole");
    } else {
        spineNode.removeAllChildren();

        function fuDong(node) {
            var x = (Math.random() - 0.5) * 30 * node.getScaleX();
            var y = (Math.random() - 0.5) * 60 * node.getScaleX();
            var delay = (x * x + y * y) * 0.01 / node.getScaleX();
            cc.log(x, y, delay);
            node.runAction(cc.sequence(cc.moveBy(delay, cc.p(x, y)), cc.moveBy(delay, cc.p(-x, -y)), cc.callFunc(function() {
                fuDong(node);
            })));
        }

        var long = createSpine("home_3.0/role/spine/nancaishen/long.json", "home_3.0/role/spine/nancaishen/long.atlas");
        long.setName("long");
        long.setScale(0.5);
        spineNode.addChild(long);
        long.setPosition(2000, 240);
        long.setAnimation(0, "animation", true);
        long.runAction(cc.sequence(cc.moveTo(30, cc.p(-1000, long.y)), cc.delayTime(10), cc.callFunc(function() {
            long.setPosition(2000, 240);
        })).repeatForever());

        var dengl1 = new cc.Sprite("home_3.0/bg/dengl1.png");
        var dengl2 = new cc.Sprite("home_3.0/bg/dengl1.png");
        var dengl3 = new cc.Sprite("home_3.0/bg/dengl1.png");
        spineNode.addChild(dengl1);
        spineNode.addChild(dengl2);
        spineNode.addChild(dengl3);
        dengl1.setPosition(335, 207);
        dengl2.setPosition(500, 580);
        dengl3.setPosition(1500, 400);
        dengl2.setScale(0.75);
        dengl3.setScale(0.5);
        fuDong(dengl1);
        fuDong(dengl2);
        fuDong(dengl3);

        var jinhexinc = new cc.Sprite("home_3.0/bg/jinhexinc.png");
        spineNode.addChild(jinhexinc, 1);
        jinhexinc.setScale(0.75);
        jinhexinc.setPosition(900, 530);
        fuDong(jinhexinc);

        var particleSystem = new cc.ParticleSystem("home_3.0/role/spine/nancaishen/yanhua.plist");
        particleSystem.setScale(0.5);
        particleSystem.setPosition(1560/2, 720);
        spineNode.addChild(particleSystem);
    }
    var theme = MjClient.getThemeInfo(themeIdx);
    var rolePath = "home_3.0/role/spine/" + theme.rolePath[sex] + "/";
    var touchSpine = theme.touchSpine[sex];

    if (isTouch) {
        if (!("touchSpineIndex" in spineNode))
            spineNode.touchSpineIndex = 0;
        var spine = createSpine(rolePath + touchSpine[spineNode.touchSpineIndex] + ".json", rolePath + touchSpine[spineNode.touchSpineIndex] + ".atlas");
    } else {
        var spine = createSpine(rolePath + theme.role[sex] + ".json", rolePath + theme.role[sex] + ".atlas");
    }
    spine.setName("newYearRole");
    spineNode.addChild(spine);
    spine.setAnimation(0, "animation", false);

    if (yanwu) {
        var yanwu = createSpine("home_3.0/role/spine/nancaishen/yanwu.json", "home_3.0/role/spine/nancaishen/yanwu.atlas");
        spineNode.addChild(yanwu);
        yanwu.setScale(0.35);
        yanwu.setPosition(theme.rolePos[sex]);
        yanwu.x += 50;
        yanwu.y += 150;
        yanwu.setAnimation(0, "animation", false);
        yanwu.setCompleteListener(function(trackEntry) {
            spineNode.runAction(cc.callFunc(function() {
                yanwu.removeFromParent();
            }));
        });
    }

    spine.setCompleteListener(function(trackEntry) {
        if (isTouch) {
            times --;
            if (times > 0) {
                spine.setAnimation(0, "animation", false);
            }
            else {
                spineNode.runAction(cc.callFunc(function() {
                    UI30_updateRoteNewYear(that, spineNode, themeIdx, sex, false, true);
                }));
            }
            return;
        }
        if (trackEntry.animation.name == "animation") {
            if (sex == 0)
                spine.setAnimation(0, "animation2", false);
            else
                spine.setAnimation(0, "animation", false);
        } else if (trackEntry.animation.name == "animation2") {
            spine.setAnimation(0, "animation", false);
        }
    });

    var times = 1;
    if (isTouch) {
        if (sex == 0 && (spineNode.touchSpineIndex == 1 || spineNode.touchSpineIndex == 2))
            times = 2;

        if (sex == 1 && spineNode.touchSpineIndex == 0)
            spine.setScale(0.95);
        else if (sex == 1 && spineNode.touchSpineIndex == 2)
            times = 2;

        spine.setPosition(theme.touchPos[sex][spineNode.touchSpineIndex]);

    }
    else {
        spine.setPosition(theme.rolePos[sex]);
    }

    if (that.roleTouchListener) {
        cc.eventManager.removeListener(that.roleTouchListener);
        that.roleTouchListener = null;
    }

    if (isTouch) {
        spineNode.touchSpineIndex++;
        if (spineNode.touchSpineIndex > touchSpine.length - 1)
            spineNode.touchSpineIndex = 0;
    }

    that.roleTouchListener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function(touch, event) {
            if (!isTouch) {
                spineNode.runAction(cc.callFunc(function() {
                    playEffect("newYearRoleClick");
                    UI30_updateRoteNewYear(that, spineNode, themeIdx, sex, true, true);
                }));
            }
            return true;
        }
    });

    cc.eventManager.addListener(that.roleTouchListener, that);
}