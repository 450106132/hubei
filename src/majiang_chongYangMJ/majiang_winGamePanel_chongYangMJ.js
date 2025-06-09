
var majiang_winGamePanel_chongYangMJ = majiang_winGamePanel_hubei.extend({

    jsBind:{},

    ctor: function () {
        var jsonFile = "endOne_maJiang.json";
        this._super(jsonFile);
    },


    // override 无抓鸟
    showAddBird: function (back, tData) {
        // 修改显示
        var img_bridTips = back.getChildByName("img_bridTips");
        img_bridTips.visible = false;
    },


});