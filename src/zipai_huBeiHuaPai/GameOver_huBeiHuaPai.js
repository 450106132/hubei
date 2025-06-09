//湖北花牌 大结算
var GameOverLayer_huBeiHuaPai = GameOverLayer_dangYangFanJing.extend({
    childBind:{},
    setPlInfo:function (node, pl) {
        this._super(node, pl);
        this.setPlStatsInfo(node.getChildByName('scroll'), pl.roomStatistics);
    },
    ctor:function () {
        //util.assign(childBind, this.jsBind);
        //this.jsBind = childBind; //重新指向 
        this._super('endAll_huBeiHuaPai.json');
    },
});

GameOverLayer_huBeiHuaPai.prototype.getRoomStats = function(stats) {
    if (!stats || stats.length < 6)
        return [];

    //后台的数据顺序和含义如下
    //pl.roomStatistics = [0, 0, 0, 0, 0, 0]; // 胡牌 自摸 接炮 提 跑次数 最大胡数 统计

    //湖北花牌取.[自摸, 胡牌, 点炮, 最大胡数]
    var ret = [{name:'自摸次数', num:stats[1]},
               {name:'胡牌次数', num:stats[0]},
               {name:'点炮次数', num:stats[2]},
               {name:'最大胡数', num:stats[5]}];
    return ret;
};

GameOverLayer_huBeiHuaPai.prototype.setPlStatsInfo = function(view, stats) {
    //统计次数
    var temp = view.getChildByName('pnl_stats');
    temp.visible = false;
    var yGap = 4;
    var yStart = 4; //首尾行距容器边缘的间隙
    var stats = this.getRoomStats(stats);
   
    //控制高度
    var innerYsize = yStart * 2 + stats.length * temp.height + (stats.length - 1) * yGap;
    view.setInnerContainerSize(cc.size(view.width, innerYsize));
    for (var i = 0; i < stats.length; i++) {
        var item = temp.clone();
        var title = item.getChildByName('text_title');
        var num = item.getChildByName('text_num');
        title.setString(stats[i].name);
        num.setString(stats[i].num);
        title.ignoreContentAdaptWithSize(true);
        num.ignoreContentAdaptWithSize(true);
        item.visible = true;
        item.x = temp.x;
        item.y = view.height - yStart - item.height * (1 - item.anchorY) - i * temp.height - i * yGap;
        view.addChild(item);
    }
}