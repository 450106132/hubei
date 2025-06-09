/**
 * Created by sking on 2017/5/12.
 */
//东海加注
var jiaZhuLayer = cc.Layer.extend({
    _zhuIdx:5,
    _Button_sub:null,
    _Button_add:null,
    ctor: function (sureCB) {
        this._super();
        var UI = ccs.load("JiaZhu.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.7, 0.7], [0.5, 0.5], [0, 0]);
        this._zhuIdx = 5;

        this._ZhuNum = _back.getChildByName("Text_1");
        this._ZhuNum.setString(this._zhuIdx);

        /*
          减
         */
        this._Button_sub = _back.getChildByName("Button_sub");
        this._Button_sub.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                if(this._zhuIdx > 1)
                {
                    this._zhuIdx--;
                    this._ZhuNum.setString(this._zhuIdx);
                    this._Button_add.setTouchEnabled(true);
                    this._Button_add.setBright(true);
                    cc.log("----------------this._guidIdx = " + this._zhuIdx);
                }

                if(this._zhuIdx == 1)
                {
                    this._Button_sub.setTouchEnabled(false);
                    this._Button_sub.setBright(false);
                }
            }
        }, this);


        /*
         加
         */
        this._Button_add = _back.getChildByName("Button_add");
        this._Button_add.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(this._zhuIdx < 5)
                {
                    this._zhuIdx++;
                    this._ZhuNum.setString(this._zhuIdx);
                    this._Button_sub.setTouchEnabled(true);
                    this._Button_sub.setBright(true);
                }

                if(this._zhuIdx == 5){
                    this._Button_add.setTouchEnabled(false);
                    this._Button_add.setBright(false);
                }
            }
        }, this);
        this._Button_add.setTouchEnabled(false);
        this._Button_add.setBright(false);



        /*
            不加注
         */
        var _Button_buJia = _back.getChildByName("Button_buJia");
        _Button_buJia.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: 0,
                });
                if(sureCB)
                {
                    sureCB();
                }
                that.removeFromParent();
            }
        }, this);


        /*
         加注
         */
        var _Button_jia = _back.getChildByName("Button_jia");
        _Button_jia.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                var _str = this._ZhuNum.getString();
                cc.log("  加注数量 _str = " + _str);
                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    uid: SelfUid(),
                    jiazhuNum: parseInt(_str),
                });
                if(sureCB)
                {
                    sureCB();
                }
                that.removeFromParent();
            }
        }, this);

        UIEventBind(null, this, "initSceneData", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "LeaveGame", function()
        {
            that.removeFromParent();
        });

    }
});


//徐州加嘴
var jiaZhuXuzhouLayer = cc.Layer.extend({
    _zhuIdx:1,
    _Button_sub:null,
    _Button_add:null,
    ctor: function (sureCB) {
        this._super();
        var UI = ccs.load("JiaZhu_xuzhou.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.7, 0.7], [0.5, 0.5], [0, 0]);
        this._zhuIdx = 1;

        var zhuArr = [1,2];
        this._ZhuNum = _back.getChildByName("Text_1");
        this._ZhuNum.setString(zhuArr[this._zhuIdx]);




        /*
         减
         */
        this._Button_sub = _back.getChildByName("Button_sub");
        this._Button_sub.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                if(this._zhuIdx > 0)
                {
                    this._zhuIdx--;
                    this._ZhuNum.setString(zhuArr[this._zhuIdx]);
                    this._Button_add.setTouchEnabled(true);
                    this._Button_add.setBright(true);
                    cc.log("----------------this._guidIdx = " + this._zhuIdx);
                }

                if(this._zhuIdx == 0)
                {
                    this._Button_sub.setTouchEnabled(false);
                    this._Button_sub.setBright(false);
                }
            }
        }, this);


        /*
         加
         */
        this._Button_add = _back.getChildByName("Button_add");
        this._Button_add.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(this._zhuIdx < 1)
                {
                    this._zhuIdx++;
                    this._ZhuNum.setString(zhuArr[this._zhuIdx]);
                    this._Button_sub.setTouchEnabled(true);
                    this._Button_sub.setBright(true);
                }

                if(this._zhuIdx == 1){
                    this._Button_add.setTouchEnabled(false);
                    this._Button_add.setBright(false);
                }
            }
        }, this);
        this._Button_add.setTouchEnabled(false);
        this._Button_add.setBright(false);


        var tData = MjClient.data.sData.tData;
        if(tData.areaSelectMode.isJiaZhuyizui)
        {
            this._ZhuNum.setString(zhuArr[0]);
            this._Button_sub.setTouchEnabled(false);
            this._Button_sub.setBright(false);

            this._Button_add.setTouchEnabled(false);
            this._Button_add.setBright(false);
        }


        /*
         不加注
         */
        var _Button_buJia = _back.getChildByName("Button_buJia");
        _Button_buJia.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: 0,
                });
                if(sureCB)
                {
                    sureCB();
                }
                that.removeFromParent();
            }
        }, this);


        /*
         加注
         */
        var _Button_jia = _back.getChildByName("Button_jia");
        _Button_jia.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                var _str = this._ZhuNum.getString();
                cc.log("  加注数量 _str = " + _str);
                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    uid: SelfUid(),
                    jiazhuNum: parseInt(_str),
                });
                if(sureCB)
                {
                    sureCB();
                }
                that.removeFromParent();
            }
        }, this);


        UIEventBind(null, this, "initSceneData", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "LeaveGame", function()
        {
            that.removeFromParent();
        });
    }
});


//道州加嘴
var jiaZhuDaoZhouLayer = cc.Layer.extend({
    _zhuIdx:1,
    _Button_sub:null,
    _Button_add:null,
    ctor: function (sureCB) {
        this._super();
        var UI = ccs.load("JiaZhu_daozhou.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.7, 0.7], [0.5, 0.5], [0, 0]);
        this._zhuIdx = 1;

        var zhuArr = [2,3,5];
        this._ZhuNum = _back.getChildByName("Text_1");
        this._ZhuNum.setString(zhuArr[this._zhuIdx]);

        /*
         减
         */
        this._Button_sub = _back.getChildByName("Button_sub");
        this._Button_sub.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                if(this._zhuIdx > 0)
                {
                    this._zhuIdx--;
                    this._ZhuNum.setString(zhuArr[this._zhuIdx]);
                    this._Button_add.setTouchEnabled(true);
                    this._Button_add.setBright(true);
                    cc.log("----------------this._guidIdx = " + this._zhuIdx);
                }

                if(this._zhuIdx == 0)
                {
                    this._Button_sub.setTouchEnabled(false);
                    this._Button_sub.setBright(false);
                }
            }
        }, this);


        /*
         加
         */
        this._Button_add = _back.getChildByName("Button_add");
        this._Button_add.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(this._zhuIdx < 3)
                {
                    this._zhuIdx++;
                    this._ZhuNum.setString(zhuArr[this._zhuIdx]);
                    this._Button_sub.setTouchEnabled(true);
                    this._Button_sub.setBright(true);
                }

                if(this._zhuIdx == 2){
                    this._Button_add.setTouchEnabled(false);
                    this._Button_add.setBright(false);
                }
            }
        }, this);
        // this._Button_add.setTouchEnabled(false);
        // this._Button_add.setBright(false);



        /*
         不加注
         */
        var _Button_buJia = _back.getChildByName("Button_buJia");
        _Button_buJia.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: 0,
                });
                if(sureCB)
                {
                    sureCB();
                }
                that.removeFromParent();
            }
        }, this);


        /*
         加注
         */
        var _Button_jia = _back.getChildByName("Button_jia");
        _Button_jia.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                var _str = this._ZhuNum.getString();
                cc.log("  加注数量 _str = " + _str);
                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    uid: SelfUid(),
                    jiazhuNum: parseInt(_str),
                });
                if(sureCB)
                {
                    sureCB();
                }
                that.removeFromParent();
            }
        }, this);
    }
});

//徐州加注new
var jiaZhuXuzhouLayer_new = cc.Layer.extend({
    ctor: function (sureCB) {
        this._super();
        var UI = ccs.load("JiaZhu_xuzhou.json");
        if(this.getChildByName("jiazhu_xuzhou")) this.removeChildByName("jiazhu_xuzhou")
        this.addChild(UI.node);
        UI.node.setName("jiazhu_xuzhou");
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var back1 = UI.node.getChildByName("back1");
        var back2 = UI.node.getChildByName("back2");
        var _back;

        var tData = MjClient.data.sData.tData;
        if(tData.areaSelectMode.isJiaZhuyizui)
        {
            back1.setVisible(false);
            back2.setVisible(true);
            _back = back2;
        }
        else
        {
            back1.setVisible(true);
            back2.setVisible(false);
            _back = back1;
        }
        setWgtLayout(_back,[1, 1], [0.5, 0.5], [0, 0]);
        /*
         不加注
         */
        var _Button_buJia = _back.getChildByName("Button_buJia");
        _Button_buJia.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: 0,
                });
                if(sureCB)
                {
                    sureCB();
                }
                that.removeFromParent();
            }
        }, this);


        /*
         加注1
         */
        var _Button_jia1 = _back.getChildByName("Button_jia1");
        _Button_jia1.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    uid: SelfUid(),
                    jiazhuNum: 1,
                });
                if(sureCB)
                {
                    sureCB();
                }
                that.removeFromParent();
            }
        }, this);

        /*
         加注2
         */
        var _Button_jia2 = _back.getChildByName("Button_jia2");
        if(_Button_jia2)
        {
            _Button_jia2.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                        cmd: "MJJiazhu",
                        uid: SelfUid(),
                        jiazhuNum: 2,
                    });
                    if(sureCB)
                    {
                        sureCB();
                    }
                    that.removeFromParent();
                }
            }, this);
        }

        UIEventBind(null, this, "initSceneData", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "LeaveGame", function()
        {
            that.removeFromParent();
        });
    }
});


// 湘阴推倒胡
var jiaZhuXYTDH = cc.Layer.extend({
    nopiao:null,
    piao1:null,
    piao2:null,
    piao3:null,
    ctor: function (reqCallBack) {
        this._super();
        var UI = ccs.load("Jiazhu_XYTDH.json");
        this.addChild(UI.node);
        var that = this;

        this.block = UI.node.getChildByName("block");
        setWgtLayout(this.block,[1, 1], [0.5, 0.5], [0, 0]);

        this.nopiao = this.block.getChildByName("nopiao");
        this.nopiao.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: 0,
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);
        //setWgtLayout(_infoNode, [0.15, 0.15], [0.0, 0.85], [0, 0]);
        //setWgtLayout(this.nopiao,[0.13,0.13],[0.2,0.2],[0,0]);


        /*
            飘分1
         */
        this.piao1 = this.block.getChildByName("piao1");
        this.piao1.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: 1,
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);
        //setWgtLayout(this.piao1,[0.13,0.13],[0.4,0.2],[0,0]);

        /*        
            飘分2
         */
        this.piao2 = this.block.getChildByName("piao2");
        this.piao2.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: 2,
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);

        //setWgtLayout(this.piao2,[0.13,0.13],[0.6,0.2],[0,0]);

        /*
            飘分3
         */
        this.piao3 = this.block.getChildByName("piao3");
        this.piao3.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: 3,
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);

        //setWgtLayout(this.piao3,[0.13,0.13],[0.8,0.2],[0,0]);

        UIEventBind(null, this, "initSceneData", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "LeaveGame", function()
        {
            that.removeFromParent();
        });
    }
});

//湘乡，娄底打坨
var jiazhuXiangLouLayer = cc.Layer.extend({
    ctor: function (sureCB) {
        this._super();
        var UI = ccs.load("datuoTips.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1,1],[0.5,0.5],[0,0],true);
        _block.setSwallowTouches(false);
        
        cc.log("_block:"+ JSON.stringify(_block.getPosition()));

        // var _back = UI.node.getChildByName("back");
        // setWgtLayout(_back,[1,1],[0.5,0.5],[0,0],true);
        // cc.log("_back:"+ JSON.stringify(_back.getPosition()));



        /*
            不打坨
         */
        var _Button_buJia = _block.getChildByName("Button_buJia");
        if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI){
            _Button_buJia.loadTextureNormal("playing/other/budatuo_XX.png");
            _Button_buJia.loadTexturePressed("playing/other/budatuo_XX.png");
        }

        _Button_buJia.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: 0,
                });
                if(sureCB)
                {
                    sureCB(false);
                }
                that.removeFromParent();
            }
        }, this);


        /*
            打坨
         */
        var _Button_jia = _block.getChildByName("Button_jia");
        if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI){
            _Button_jia.loadTextureNormal("playing/other/datuo_XX.png");
            _Button_jia.loadTexturePressed("playing/other/datuo_XX.png");
        }

        _Button_jia.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    uid: SelfUid(),
                    jiazhuNum: 1,
                });
                if(sureCB)
                {
                    sureCB(true);
                }
                that.removeFromParent();
            }
        }, this);
    }
});

// 长沙麻将加注界面
var jiaZhuCS = cc.Layer.extend({
    nopiao:null,
    piao1:null,
    piao2:null,
    piao3:null,
    ctor: function (reqCallBack) {
        this._super();
        var UI = ccs.load("Jiazhu_changsha.json");
        this.addChild(UI.node);
        this.setName("jiaZhuCS");
        var that = this;

        this.block = UI.node.getChildByName("block");
        setWgtLayout(this.block,[1, 1], [0.5, 0.5], [0, 0]);

        this.nopiao = this.block.getChildByName("nopiao");
        this.nopiao.setTag(0);
        this.nopiao.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.requestJZ(sender.getTag(), reqCallBack)
            }
        }, this);
        //setWgtLayout(_infoNode, [0.15, 0.15], [0.0, 0.85], [0, 0]);
        //setWgtLayout(this.nopiao,[0.13,0.13],[0.2,0.2],[0,0]);

        for (var i = 1; i <= 3; i++) {
            this["piao" + i] = this.block.getChildByName("piao" + i);
            this["piao" + i].setTag(i);
            this["piao" + i].addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    this.requestJZ(sender.getTag(), reqCallBack)
                }
            }, this);

        }
       

        UIEventBind(null, this, "initSceneData", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "LeaveGame", function()
        {
            that.removeFromParent();
        });
    },
    requestJZ: function(tag, reqCallBack) {
        MjClient.gamenet.request("pkroom.handler.tableMsg", {
            cmd: "MJJiazhu",
            jiazhuNum: tag,
        });
        if (reqCallBack) {
            reqCallBack();
        }
        this.removeFromParent();
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var pl = getUIPlayer(0);
        pl.mjState = 7;
    },

});


// 通用加注
var jiaZhuComLayer = cc.Layer.extend({
    _zhuIdx:5,
    _maxIdx:5,
    _Button_sub:null,
    _Button_add:null,
    ctor: function (maxNum, btnImg1, btnImg2, reqCallBack) {
        this._super();
        var UI = ccs.load("JiaZhu.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.7, 0.7], [0.5, 0.5], [0, 0]);
        this._zhuIdx = maxNum || 5;
        this._maxIdx = maxNum || 5;

        this._ZhuNum = _back.getChildByName("Text_1");
        this._ZhuNum.setString(this._zhuIdx);

        /*
          减
         */
        this._Button_sub = _back.getChildByName("Button_sub");
        this._Button_sub.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                if(this._zhuIdx > 1)
                {
                    this._zhuIdx--;
                    this._ZhuNum.setString(this._zhuIdx);
                    this._Button_add.setTouchEnabled(true);
                    this._Button_add.setBright(true);
                    cc.log("----------------this._guidIdx = " + this._zhuIdx);
                }

                if(this._zhuIdx == 1)
                {
                    this._Button_sub.setTouchEnabled(false);
                    this._Button_sub.setBright(false);
                }
            }
        }, this);


        /*
         加
         */
        this._Button_add = _back.getChildByName("Button_add");
        this._Button_add.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(this._zhuIdx < this._maxIdx)
                {
                    this._zhuIdx++;
                    this._ZhuNum.setString(this._zhuIdx);
                    this._Button_sub.setTouchEnabled(true);
                    this._Button_sub.setBright(true);
                }

                if(this._zhuIdx == this._maxIdx){
                    this._Button_add.setTouchEnabled(false);
                    this._Button_add.setBright(false);
                }
            }
        }, this);
        this._Button_add.setTouchEnabled(false);
        this._Button_add.setBright(false);



        /*
            不加注
         */
        var _Button_buJia = _back.getChildByName("Button_buJia");
        if(btnImg1)  _Button_buJia.loadTextureNormal(btnImg1);
        _Button_buJia.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: 0,
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);


        /*
         加注
         */
        var _Button_jia = _back.getChildByName("Button_jia");
        if(btnImg2)  _Button_jia.loadTextureNormal(btnImg2);
        _Button_jia.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                var _str = this._ZhuNum.getString();
                cc.log("  加注数量 _str = " + _str);
                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    uid: SelfUid(),
                    jiazhuNum: parseInt(_str),
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);

        UIEventBind(null, this, "initSceneData", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "LeaveGame", function()
        {
            that.removeFromParent();
        });
    }
});


//汨罗红中加注
var JiaZhu_MLHZ = cc.Layer.extend({
    ctor: function (reqCallBack) {
        this._super();
        var UI = ccs.load("JiaZhu_MLHZ.json");
        this.addChild(UI.node);
        var that = this;

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0], true);

        /*
            不加注
         */
        var _Button_buJia = _back.getChildByName("Button_buJia");
        _Button_buJia.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: 0,
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);


        /*
         加注
         */
        for (var i = 1; i < 4; i ++ )
        {
            var _Button_jia = _back.getChildByName("Button_jia"+i);
            _Button_jia.setTag(i)
            _Button_jia.addTouchEventListener(function (sender, type) {
                if (type == 2)
                {
                    var _str = sender.getTag()
                    cc.log("  加注数量 _str = " + _str);
                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                        cmd: "MJJiazhu",
                        uid: SelfUid(),
                        jiazhuNum: parseInt(_str),
                    });
                    if(reqCallBack)
                    {
                        reqCallBack();
                    }
                    that.removeFromParent();
                }
            }, this); 
        }


        UIEventBind(null, this, "initSceneData", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "LeaveGame", function()
        {
            that.removeFromParent();
        });
    }
});


// 岳阳跑得快
var JiaZhu_PaodekuaiTY= cc.Layer.extend({
    nopiao:null,
    piao1:null,
    piao2:null,
    piao3:null,
    //参数：jiazhuflag
    //1: 1 2 3 分
    //2: 2 3 5 分
    //3: 2 5 8 分
    ctor: function ( JiaZhuFlag, reqCallBack) {
        this._super();
        //服用湘阴推倒胡的界面
        var UI = ccs.load("Jiazhu_XYTDH.json");
        this.addChild(UI.node);
        var that = this;

        this.block = UI.node.getChildByName("block");
        setWgtLayout(this.block,[1, 1], [0.5, 0.5], [0, 0]);
        /*
         不飘
        */
        this.nopiao = this.block.getChildByName("nopiao");
        this.nopiao.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: 0,
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);


        //飘分选项定义
        var piaoFlagAry =
            {
                1:[1,2,3],
                2:[2,3,5],
                3:[2,5,8]
            };
        var curpiaoFlag = piaoFlagAry[JiaZhuFlag];
        if (!curpiaoFlag)
        {
            curpiaoFlag = piaoFlagAry[1];
        }
        var _path = "playing/gameTable/";

        /*
            飘分1
         */
        this.piao1 = this.block.getChildByName("piao1");
        this.piao1.loadTextureNormal(_path + "piao" + curpiaoFlag[0] + ".png");
        this.piao1.loadTexturePressed(_path + "piao" + curpiaoFlag[0] + ".png");
        this.piao1.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: curpiaoFlag[0],
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);

        /*
            飘分2
         */
        this.piao2 = this.block.getChildByName("piao2");
        this.piao2.loadTextureNormal(_path + "piao" + curpiaoFlag[1] + ".png");
        this.piao2.loadTexturePressed(_path + "piao" + curpiaoFlag[1] + ".png");
        this.piao2.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: curpiaoFlag[1],
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);

        /*
            飘分3
         */
        this.piao3 = this.block.getChildByName("piao3");
        this.piao3.loadTextureNormal(_path + "piao" + curpiaoFlag[2] + ".png");
        this.piao3.loadTexturePressed(_path + "piao" + curpiaoFlag[2] + ".png");
        this.piao3.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: curpiaoFlag[2],
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);

        //setWgtLayout(this.piao3,[0.13,0.13],[0.8,0.2],[0,0]);

        UIEventBind(null, this, "initSceneData", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "LeaveGame", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "after_ready", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "mjhand", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "s2cMJJiazhu", function(msg)
        {   
            var mySelf = getUIPlayer(0);
            if (!mySelf)
                return;

            if (mySelf.info.uid != msg.uid)
                return;
            
            that.removeFromParent();
        });
    }
});

var PiaoFen4ChaoGu = cc.Layer.extend({
    nopiao:null,
    piao1:null,
    piao2:null,
    piao3:null,
    piao4:null,
    //参数：jiazhuflag
    //1: 1 2 3 分
    //2: 2 3 5 分
    //3: 2 5 8 分
    ctor: function ( JiaZhuFlag, reqCallBack) {
        this._super();
        //服用湘阴推倒胡的界面
        var UI = ccs.load("Jiazhu_CG.json");
        this.addChild(UI.node);
        var that = this;

        this.block = UI.node.getChildByName("block");
        setWgtLayout(this.block,[1, 1], [0.5, 0.5], [0, 0]);
        /*
         不飘
        */
        this.nopiao = this.block.getChildByName("nopiao");
        this.nopiao.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: 0,
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);


        //飘分选项定义
        var piaoFlagAry =
            {
                1:[1,2,3],
                2:[2,3,5],
                3:[2,5,8],
                4:[1,2,3,4],
            };
        var curpiaoFlag = piaoFlagAry[JiaZhuFlag];
        if (!curpiaoFlag)
        {
            curpiaoFlag = piaoFlagAry[1];
        }
        var _path = "playing/gameTable/";

        /*
            飘分1
         */
        this.piao1 = this.block.getChildByName("piao1");
        this.piao1.loadTextureNormal(_path + "piao" + curpiaoFlag[0] + ".png");
        this.piao1.loadTexturePressed(_path + "piao" + curpiaoFlag[0] + ".png");
        this.piao1.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: curpiaoFlag[0],
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);

        /*
            飘分2
         */
        this.piao2 = this.block.getChildByName("piao2");
        this.piao2.loadTextureNormal(_path + "piao" + curpiaoFlag[1] + ".png");
        this.piao2.loadTexturePressed(_path + "piao" + curpiaoFlag[1] + ".png");
        this.piao2.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: curpiaoFlag[1],
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);

        /*
            飘分3
         */
        this.piao3 = this.block.getChildByName("piao3");
        this.piao3.loadTextureNormal(_path + "piao" + curpiaoFlag[2] + ".png");
        this.piao3.loadTexturePressed(_path + "piao" + curpiaoFlag[2] + ".png");
        this.piao3.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: curpiaoFlag[2],
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);

                /*
            飘分3
         */
        this.piao4 = this.block.getChildByName("piao4");
        this.piao4.loadTextureNormal(_path + "piao" + curpiaoFlag[3] + ".png");
        this.piao4.loadTexturePressed(_path + "piao" + curpiaoFlag[3] + ".png");
        this.piao4.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    jiazhuNum: curpiaoFlag[3],
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);

        //setWgtLayout(this.piao3,[0.13,0.13],[0.8,0.2],[0,0]);

        UIEventBind(null, this, "initSceneData", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "LeaveGame", function()
        {
            that.removeFromParent();
        });
    }
});

var DingQueLayer = cc.Layer.extend({
    quewan:null,
    quetiao:null,
    quetong:null,
    quementip:null,
    quese:-1,
    ctor: function (reqCallBack,pl) {
        this._super();
        var UI = ccs.load("DingQueLayer.json");
        this.addChild(UI.node);
        var that = this;

        this.block = UI.node.getChildByName("block");
        setWgtLayout(this.block,[1, 1], [0.5, 0.5], [0, 0]);

        this.quewan = this.block.getChildByName("quewan");
        var light_wan = this.block.getChildByName("light_wan");
        light_wan.visible = false;
        light_wan.runAction(cc.sequence(cc.fadeIn(0),cc.scaleTo(1,1.2),cc.fadeOut(1),cc.scaleTo(0,1)).repeatForever());
        this.quewan.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJSelect",
                    que: 1,
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);
        //setWgtLayout(_infoNode, [0.15, 0.15], [0.0, 0.85], [0, 0]);
        //setWgtLayout(this.nopiao,[0.13,0.13],[0.2,0.2],[0,0]);


        /*
            
         */
        this.quetiao = this.block.getChildByName("quetiao");
        var light_tiao = this.block.getChildByName("light_tiao");
        light_tiao.visible = false;
        light_tiao.runAction(cc.sequence(cc.fadeIn(0),cc.scaleTo(1,1.2),cc.fadeOut(1),cc.scaleTo(0,1)).repeatForever());
        this.quetiao.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJSelect",
                    que: 0,
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);
        //setWgtLayout(this.piao1,[0.13,0.13],[0.4,0.2],[0,0]);

        /*        
            
         */
        this.quetong = this.block.getChildByName("quetong");
        var light_tong = this.block.getChildByName("light_tong");
        light_tong.visible = false;
        light_tong.runAction(cc.sequence(cc.fadeIn(0),cc.scaleTo(1,1.2),cc.fadeOut(1),cc.scaleTo(0,1)).repeatForever());
        this.quetong.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJSelect",
                    que: 2,
                });
                if(reqCallBack)
                {
                    reqCallBack();
                }
                that.removeFromParent();
            }
        }, this);

        this.getquenum(pl);

        if (this.quese == 0) 
        {
            light_tiao.visible = true;
        }
        else if (this.quese == 1) 
        {
            light_wan.visible = true;
        }
        else if (this.quese == 2) 
        {
            light_tong.visible = true;
        }
        //setWgtLayout(this.piao2,[0.13,0.13],[0.6,0.2],[0,0]);

        //setWgtLayout(this.piao3,[0.13,0.13],[0.8,0.2],[0,0]);

        UIEventBind(null, this, "initSceneData", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "LeaveGame", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "endRoom", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "MJPut", function()
        {
            if (MjClient.rePlayVideo != -1) 
            {
                that.removeFromParent();
            }
        });
    },
    getquenum: function(pl)
    {
        if (!pl.mjhand) 
        {
            return;
        }
        var hands = pl.mjhand;
        var wannum = 0;
        var tiaonum = 0;
        var tongnum = 0;
        for (var i = 0; i < hands.length; i++) {
            if (Math.floor(hands[i]) / 10 < 1) 
            {
                tiaonum += 1;
            }
            else if (Math.floor(hands[i]) / 10 < 2) 
            {
                wannum += 1;
            }
            else
            {
                tongnum += 1;
            }
        }

        var maxNum = tiaonum < wannum ? tiaonum : wannum;
        maxNum = maxNum < tongnum ? maxNum : tongnum;
        if (maxNum == tiaonum) 
        {
            this.quese = 0;
        }
        else if (maxNum == wannum)
        {
            this.quese = 1;
        }
        else if (maxNum == tongnum) 
        {
            this.quese = 2;
        }
    }
});