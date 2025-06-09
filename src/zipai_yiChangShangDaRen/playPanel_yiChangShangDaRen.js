// 当阳翻精
var playPanel_yiChangShangDaRen = playPanel_dangYangFanJing.extend({

});

playPanel_yiChangShangDaRen.prototype.showOutCardAnimation = function (node) {
    playLayer_ziPai.prototype.showOutCardAnimation.apply(this, [node]);
};

playPanel_yiChangShangDaRen.prototype.checkCardCanPut = function(pl, card) {
    return (!pl.canNotPutCard || (pl.canNotPutCard.indexOf(card) == -1))
};

playPanel_yiChangShangDaRen.prototype.checkCanNotPutCardMask = function(){
    return true;
}

playPanel_yiChangShangDaRen.prototype.doPut = function(card, btn, col, row) {
    playLayer_ziPai.prototype.doPut.apply(this, [card, btn, col, row]);
    this.moveLastCardToRow();
    var pl = MjClient.playui.getUIPlayer(0);
    pl.canNotPutCard = [];
    MjClient.playui.refreshHandCard(0);
};