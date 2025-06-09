
// 岳阳，大厅客服界面 3.0
var HomeKefuView_yueyang_v3 = cc.Layer.extend({
    jsBind:{
        block:{
            _layout:[[1, 1], [0.5, 0.5], [0, 0], true]
        },
        back:{
            _layout:[[1, 1], [0.5, 0.5], [0, 0]],
            close:{
                _click: function () {
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Kefu_Close", {uid:SelfUid()});
                    if(MjClient.homeKefuUi)
                    {
                        MjClient.homeKefuUi.removeFromParent(true);
                        MjClient.homeKefuUi = null;
                    }
                }
            },

            show_container: {
                wximg1: {
                    wxtxt: {
                        _run:function () {
                            this.string = "微信：wbkf1";
                        },
                    }
                },
                wximg2: {
                    wxtxt: {
                        _run:function () {
                            this.string = "微信：wbkf2";
                        },
                    } 
                },
                wximg3: {
                    wxtxt: {
                        _run:function () {
                            this.string = "微信：wbkf3";
                        },
                    }
                },
            },

            erPanel:{
                _run:function () {
                    //     this.loadTexture("joinGame_3.0/vibrato_on.png");
                },
            },
        }

    },
    ctor: function () {
        this._super();
        var homeKefuUi = ccs.load("setting_kefu_3.0.json");
        var _back = homeKefuUi.node.getChildByName("back");
        
        this.kftxt1 = _back.getChildByName("show_container").getChildByName("wximg1").getChildByName("wxtxt");

        this.erPanel = _back.getChildByName("show_container").getChildByName("erPanel");

        MjClient.homeKefuUi = this;
        BindUiAndLogic(homeKefuUi.node, this.jsBind);
        this.addChild(homeKefuUi.node);

        COMMON_UI.popDialogAni(_back);

        return true;
    },

});