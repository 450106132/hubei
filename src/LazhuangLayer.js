/**
 * Created by sking on 2017/5/12.
 */

var laZhangLayer = cc.Layer.extend({
    ctor: function (sureCB) {
        this._super();
        var UI = ccs.load("lazhuangTips.json");
        if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
            MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
            MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_MJ) 
        {
            UI = ccs.load("haidilaoTips.json");
        }
        this.addChild(UI.node);
        this.setName("laZhangLayer");
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.7, 0.7], [0.5, 0.5], [0, 0]);



        /*
            不拉庄/不飘分
         */
        var _Button_buJia = _back.getChildByName("Button_buJia");

        _Button_buJia.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                if (MjClient.gameType != MjClient.GAME_TYPE.CHANG_SHA && 
                    MjClient.gameType != MjClient.GAME_TYPE.NING_XIANG_KAI_WANG)
                {
                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                        cmd: "MJJiazhu",
                        jiazhuNum: 0,
                    });
                }
                if(sureCB)
                {
                    sureCB(false);
                }
                that.removeFromParent();
            }
        }, this);


        /*
         拉庄/飘分
         */
        var _Button_jia = _back.getChildByName("Button_jia");
        _Button_jia.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (MjClient.gameType != MjClient.GAME_TYPE.CHANG_SHA && MjClient.gameType != MjClient.GAME_TYPE.NING_XIANG_KAI_WANG)
                {
                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                        cmd: "MJJiazhu",
                        uid: SelfUid(),
                        jiazhuNum: 1,
                    });
                }
               
                if(sureCB)
                {
                    sureCB(true);
                }
                that.removeFromParent();
            }
        }, this);

        if (MjClient.gameType == MjClient.GAME_TYPE.NTHZ)
        {
            _back.getChildByName("Text_1").setString("请选择是否飘分？");
            _Button_buJia.loadTextureNormal("playing/other/bupiaofen.png");
            _Button_jia.loadTextureNormal("playing/other/piaofen.png");
        } 

        else if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || 
            MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA || 
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
            MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
            MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG ||
            MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_MJ)
        {
            _back.getChildByName("Text_1").setString("海底捞一把？");
            _Button_buJia.loadTextureNormal("playing/other/guo.png");
            _Button_jia.loadTextureNormal("playing/other/yao.png");
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN)
        {
            _back.getChildByName("Text_1").setString("请选择是否下码？");
            _Button_buJia.loadTextureNormal("playing/other/buxiama.png");
            _Button_jia.loadTextureNormal("playing/other/xiama.png");
        }else if (MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ)
        {
            _back.getChildByName("Text_1").setString("请选择是否举手？");
            _Button_buJia.loadTextureNormal("playing/other/bujushou.png");
            _Button_jia.loadTextureNormal("playing/other/jushou.png");
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
            MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
            MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_MJ) 
        {
           //setWgtLayout(_back,[0.3, 0.3], [0.5, 0.5], [0, 0]);
           setWgtLayout(_back,[0.27, 0.27], [0.5, 0.55], [0, 0]);
           _back.getChildByName("Button_jia").setScale(0.70);
           _back.getChildByName("Button_buJia").setScale(0.70);
        }
        
        UIEventBind(null, this, "initSceneData", function()
        {
            that.removeFromParent();
        });

        UIEventBind(null, this, "roundEnd", function()
        {
            that.removeFromParent();
        });
    }
});

/**
 * @param {function} sureCB
 * @param {number}
 */
var LazhuangSelectLayer = cc.Layer.extend({
    _Button_sub:null,
    _Button_add:null,
    ctor: function (sureCB, max, isDingZhuang) {
        this._super();
        var UI = ccs.load("lazhuangSelect.json");

        if(MjClient.playui && MjClient.playui.getChildByName("laZhuangLayer"))  MjClient.playui.removeChildByName("laZhuangLayer");

        this.addChild(UI.node);
        this.setName("laZhuangLayer");
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.7, 0.7], [0.5, 0.5], [0, 0]);
        this._zhuIdx = 1;

        this._ZhuNum = _back.getChildByName("Text_1");
        this._ZhuNum.setString(this._zhuIdx);

        //减
        this._Button_sub = _back.getChildByName("Button_sub");
        this._Button_sub.addTouchEventListener(function (sender, type) {
            if (type == 2) 
            {
                if(this._zhuIdx > 1)
                {
                    this._zhuIdx--;
                    this._ZhuNum.setString(this._zhuIdx);
                    this._Button_add.setTouchEnabled(true);
                    this._Button_add.setBright(true);
                    cc.log("LazhuangSelectLayer----------------this._guidIdx = " + this._zhuIdx);
                }

                if(this._zhuIdx == 1)
                {
                    this._Button_sub.setTouchEnabled(false);
                    this._Button_sub.setBright(false);
                }
            }
        }, this);

        this._Button_sub.setTouchEnabled(false);
        this._Button_sub.setBright(false);

        //加
        this._Button_add = _back.getChildByName("Button_add");
        this._Button_add.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(this._zhuIdx <= max)
                {
                    this._zhuIdx++;
                    this._ZhuNum.setString(this._zhuIdx);
                    this._Button_sub.setTouchEnabled(true);
                    this._Button_sub.setBright(true);
                }

                if(this._zhuIdx == max){
                    this._Button_add.setTouchEnabled(false);
                    this._Button_add.setBright(false);
                }
            }
        }, this);

        //不加注
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
                this.removeFromParent();
            }
        }, this);


        //加注
        var _Button_jia = _back.getChildByName("Button_jia");
        _Button_jia.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                var _str = this._ZhuNum.getString();
                cc.log(" LazhuangSelectLayer 加注数量 _str = " + _str);
                MjClient.gamenet.request("pkroom.handler.tableMsg", {
                    cmd: "MJJiazhu",
                    uid: SelfUid(),
                    jiazhuNum: parseInt(_str),
                });
                if(sureCB)
                {
                    sureCB();
                }
                this.removeFromParent();
            }
        }, this);

        if (isDingZhuang)
        {
            _Button_buJia.loadTextureNormal("playing/other/budingzhuang.png");
            _Button_jia.loadTextureNormal("playing/other/dingzhuang.png");
        }
    }
});