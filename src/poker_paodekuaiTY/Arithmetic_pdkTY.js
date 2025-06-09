//跑得快算法类
(function() {
function PaodekuaiTY() {
    PaodekuaiBase.apply(this,arguments)
}
PaodekuaiTY.prototype = Object.create(PaodekuaiBase.prototype);
PaodekuaiTY.prototype.constructor = PaodekuaiTY

PaodekuaiBase.prototype.deleteChaiZhanDanArr = function(oHands, rets, areaSelectMode){
    if(!rets || !oHands || !areaSelectMode || !areaSelectMode.zhaDanBuChai ){return;}

    for(var i = rets.length - 1; i >= 0; i--){
        if ( this.isChaiZhaDan(oHands, rets[i], areaSelectMode) ){
            //cc.log("------delete card----- = "+ JSON.stringify(rets[i]));
            rets.splice(i, 1);
        }
    }
};

if(typeof(module)!="undefined" && module.exports)    
    module.exports = PaodekuaiTY;

if(typeof(MjClient)!="undefined")
    MjClient.majiang_PaodekuaiTY = new PaodekuaiTY();


})();