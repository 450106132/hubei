/***
 * 新框架牌桌逻辑
 * @type {void | Class | *}
 */

var majiang_panel_tongShanHuangHuangMaJiang;
(function () {

    majiang_panel_tongShanHuangHuangMaJiang = majiang_panel_hubei.extend({
        jsonFile: "Play_majiang_tongShanHuangHuang.json",
        getJsBind: function(){
            var jsBind = {
                img_gameover: {
                    _visible: false,
                    _layout: [[0.5, 0.5], [0.5, 0.55], [0, 0]],
                    _event: {
                        roundEnd: function () {
                            this.setVisible(true);
                            this.runAction(cc.sequence(
                                cc.scaleTo(0.3, 2),
                                cc.scaleTo(0.3, 1).easing(cc.easeElasticOut(1)),
                                cc.fadeOut(0.2)
                            ))
                        }
                    }
                }
            };
            return jsBind;
        },

        ctor: function () {
            this._super(majiang_panel_tongShanHuangHuangMaJiang, this.jsonFile);
            return true;
        },

        // override 是否开启显示最多听牌标识
        isShowMaxTingCards: function(){
            return true;
        }
    });
}());
































