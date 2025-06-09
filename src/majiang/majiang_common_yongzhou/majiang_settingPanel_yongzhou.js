/***
 * 永州App，通用设置界面
 * @type {void | Class | *}
 */

var majiang_settingPanel_yongzhou = setting_maJiang.extend({
    ctor: function(){
        this._super("setting_majiang_new.json");

        COLOR.SETTNG_COLOR_1 = cc.color(52,128,255);  //选中
        COLOR.SETTNG_COLOR_2 = cc.color(66,94,112);  //选中
    }
});