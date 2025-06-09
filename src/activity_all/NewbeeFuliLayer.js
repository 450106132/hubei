/**
 * Created by lms.
 */


var newBeeFuliLayer = cc.Layer.extend({

    ctor: function(data) {
        this._super();
        var UI = ccs.load("Newbee_fuli.json");
        this.addChild(UI.node);
        var self = this;

        this._count = data.count;
        this._status = data.status;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [0.676, 0.788], [0.5, 0.5], [0, 0]);
        this._back = _back;
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self.removeFromParent();
            }
        }, this);

        this._textCount = this._back.getChildByName("text_times");
        this._textCount.setString("");
       
       this._btnget = this._back.getChildByName("btn_get");
       this._btnget.loadTextureNormal("newbeeFuli/btn_get_0.png");
       this._btnget.setTouchEnabled(false);
       this._btnget.addTouchEventListener(function(sender,type){
            if (type == 2) {
                this.reqGet();
            }
       },this)
       this.init();

    },

    init:function(){
        this._textCount.setString(this._count);
        if (this._status == 0) {
            this._btnget.loadTextureNormal("newbeeFuli/btn_get_0.png");
            this._btnget.setTouchEnabled(false);
        }else if (this._status == 1) {
            this._btnget.loadTextureNormal("newbeeFuli/btn_get_1.png");
            this._btnget.setTouchEnabled(true);
        }else if (this._status == 2) {
            this._btnget.loadTextureNormal("newbeeFuli/btn_get_2.png");
            this._btnget.setTouchEnabled(false);
        }
    },

    // reqFuli: function() {
    //     var self = this;
    //     var _lastId = this._lastId;
    //     MjClient.block();
    //     MjClient.gamenet.request("pkplayer.handler.newUserAwardInfo", {
    //         },
    //         function(rtn) {

    //             if (rtn.code == 0) {
    //                 self._count = rtn.data.count;
    //                 self._status = rtn.data.status;
    //                 self.init();
    //             } else {
    //                 if (rtn.message) {
    //                     MjClient.showToast(rtn.message);
    //                 } else {
    //                     MjClient.showToast("获取数据失败,请重新打开");
    //                 }

    //             }
    //             MjClient.unblock();
    //         }
    //     );
    // },
    reqGet: function() {
        var self = this;
        var _lastId = this._lastId;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.newUserAwardRecv", {
            },
            function(rtn) {
                if (rtn.code == 0) {
                    self._btnget.loadTextureNormal("newbeeFuli/btn_get_2.png");
                    self._btnget.setTouchEnabled(false);
                    // MjClient.showToast(rtn.message);
                    MjClient.showMsg(rtn.message,
                    function() {},
                    function() {});
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }

                }
                MjClient.unblock();
            }
        );
    }
});

