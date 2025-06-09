/**create by Lms
 * @DateTime:     2018-08-03 
 * @Description: Description 
 */


var Active_Help = cc.Layer.extend({

    ctor: function() {
        this._super();
        var UI = ccs.load("Active_Help.json");
        this.addChild(UI.node);
        var self = this;
        this._data = null;
        this._closeCallback = null;

        this.back_1 = UI.node.getChildByName("back");
        setWgtLayout(this.back_1, [0.08, 0.45], [0.0, 0.5], [0, 0]);
        // this.back_1.setScale(2);

        this.back_help = UI.node.getChildByName("back_2");
        setWgtLayout(this.back_help, [1, 1], [0.5, 0.5], [0, 0]);
        this.back_help.visible = false;

        this.block_help = UI.node.getChildByName("block");
        setWgtLayout(this.block_help, [1, 1], [0.5, 0.5], [0, 0], true);
        this.block_help.visible = false;
        this.bg_view = this.back_help.getChildByName("bg_view");
        this.back_1.setTouchEnabled(true);
        this.bg_view.setPosition(cc.p(-500, 360));
        this.back_1.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.bg_view.runAction(cc.sequence(cc.callFunc(function() {
                    self.back_help.visible = true;
                    self.block_help.visible = true;
                    self.back_help.setTouchEnabled(false);
                }), cc.moveTo(0.75, cc.p(440, 360)), cc.delayTime(0.2), cc.callFunc(function() {
                    self.back_help.setTouchEnabled(true);
                })));
            }
        }, this);

        this.bg_view.setTouchEnabled(true);

        this.btn_close = this.bg_view.getChildByName("btn_close");
        this.btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self.back_help.setTouchEnabled(false);
                this.bg_view.runAction(cc.sequence(cc.moveTo(0.75, cc.p(-500, 360)), cc.callFunc(function() {
                    self.back_help.visible = false;
                    self.block_help.visible = false;
                })));

            }
        }, this);


        this.node_jiaocheng = this.bg_view.getChildByName("node_jiaocheng");
        this.listView_jc = this.node_jiaocheng.getChildByName("listView_jc");
        this.cell_jc = this.node_jiaocheng.getChildByName("cell_jc");
        this.cell_jc.visible = false;

        this.node_wenti = this.bg_view.getChildByName("node_wenti");
        this.listView_wenti = this.node_wenti.getChildByName("listView_wenti");
        this.text_desc = this.listView_wenti.getChildByName("text_desc");

        this.bg_switch = this.bg_view.getChildByName("node_switch");
        this.btn_jiaocheng = this.bg_switch.getChildByName("btn_jiaocheng");
        this.btn_wenti = this.bg_switch.getChildByName("btn_wenti");
        this.node_wenti = this.bg_view.getChildByName("node_wenti");
        this.wenti_list = this.node_wenti.getChildByName("listView_wenti");
        this.wenti_cell = this.node_wenti.getChildByName("text_desc");
        this.wenti_cell.visible = false;
        // this.wenti_cell.setString("dsfaasdf");
        // var sss = this.wenti_cell.getVirtualRenderer().height;
        // cc.log(" ==== sss ",sss);

        this.btn_jiaocheng.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.switch_showView(true);
            }
        }, this);

        this.btn_wenti.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.switch_showView(false);

            }
        }, this);



        this.switch_showView(true);
        this.reqJiaoCheng();

    },

    switch_showView: function(isbool) {
        this.btn_wenti.setTouchEnabled(isbool);
        this.node_wenti.visible = !isbool;
        this.btn_jiaocheng.setTouchEnabled(!isbool);
        this.node_jiaocheng.visible = isbool;
        if (isbool) {
            this.btn_jiaocheng.loadTextureNormal("active_help/btn_jiaocheng_s.png");
            this.btn_wenti.loadTextureNormal("active_help/btn_wenti.png");
        } else {
            this.btn_jiaocheng.loadTextureNormal("active_help/btn_jiaocheng.png");
            this.btn_wenti.loadTextureNormal("active_help/btn_wenti_s.png");
        }
    },


    initRankJiaoChengList: function() {
        if (!cc.sys.isObjectValid(this)) {
            return;
        }

        var _rankList = this._data.tutorial_list;
        this.listView_jc.removeAllItems();
        for (var i = 0; i < _rankList.length; i++) {
            var item = this.createCellJiaoCheng(_rankList[i], i);
            this.listView_jc.pushBackCustomItem(item);
        }


    },

    initRankWenTiList: function() {

        if (!cc.sys.isObjectValid(this)) {
            return;
        }
        var _rankList = this._data.common_problem;
        this.wenti_list.removeAllItems();
        for (var i = 0; i < _rankList.length; i++) {
            var item = this.createCellWenTi(_rankList[i], i);
            this.wenti_list.pushBackCustomItem(item);
        }


    },

    initRank: function() {

        if (!cc.sys.isObjectValid(this)) {
            return;
        }
        this.initRankJiaoChengList();
        this.initRankWenTiList();
    },

    createCellJiaoCheng: function(oneData, rankNum) {
        var copyNode = this.cell_jc.clone();
        copyNode.visible = true;
        var text_tile = copyNode.getChildByName("text_tile");
        text_tile.ignoreContentAdaptWithSize(true);
        text_tile.setString(oneData.title);

        var btn_chakan = copyNode.getChildByName("btn_chakan");
        btn_chakan.data = oneData;
        btn_chakan.addTouchEventListener(function(sender,type){
            if (type ==2) {
                var url = sender.data.url;
                MjClient.native.OpenUrl(url);
                // MjClient.Scene.addChild(new NormalVideoLayer(_data.url));
            }
        },this);

        var btn_fenxiang = copyNode.getChildByName("btn_fenxiang");
        btn_fenxiang.data = oneData;
        btn_fenxiang.addTouchEventListener(function(sender,type){
            if (type ==2) {
                var _data = sender.data;
                var shareTitle = AppCnName[MjClient.getAppType()].substr(2, 2) + "";
                var shareContent = AppCnName[MjClient.getAppType()] + _data.title;
                MjClient.native.wxShareUrl(_data.url, shareTitle, shareContent);

            }
        },this);

        return copyNode;
    },

    createCellWenTi: function(oneData, rankNum) {
        var copyNode = this.wenti_cell.clone();
        copyNode.visible = true;

        copyNode.setString(oneData.ask + "\n"+oneData.answer +"\n");
        copyNode.height = copyNode.getVirtualRenderer().height;

        return copyNode;
    },
    reqJiaoCheng: function() {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.tutorialList", {},
            function(rtn) {
                if (rtn.code == 0) {
                    self._data = rtn.data;
                    self.initRank();
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
    },

    setCloseCallback: function(callback) {

        this._closeCallback = callback;

    },
});
