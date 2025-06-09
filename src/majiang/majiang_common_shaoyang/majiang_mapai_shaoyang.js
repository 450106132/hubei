//邵阳码牌类
var majiang_mapai_shaoyang = majiang_mapai_Layer.extend({

});

//Override
majiang_mapai_shaoyang.prototype.getCardScale = function(){
    var scaleList = [0.6, 0.64, 0.96, 0.6];
    var bgType = MjClient.playui.getMaJiangBgType();
    return scaleList[bgType];
};
