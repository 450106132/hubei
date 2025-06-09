/***
 * 湖北App，通用大结算文件   对应 endAll_maJiang.json
 * @type {void | Class | *}
 */
var majiang_gameOver_jingshan = majiang_gameOver_hubei.extend({



    ctor: function(){
        this._super();
    },

    getEndallStatisticsName: function () {
        return ["zuoZhuangNum", "huPaiNum", "piaoFenNum"];
    },

    getEndallStatisticsKey: function () {
        return ["坐庄次数", "胡牌次数", "漂分次数"];
    }
});