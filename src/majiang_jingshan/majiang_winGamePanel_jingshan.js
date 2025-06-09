/***
 * 湖北App，通用小结算文件   对应endOne_maJiang.json
 * @type {void | Class | *}
 */
var majiang_winGamePanel_jingshan = majiang_winGamePanel_hubei.extend({
    ctor: function(){
        this._super("endOne_jingshan.json");
        var block = this.endOneJson.node.getChildByName("block");
        cc.log(" MjClient.isDismiss  ",MjClient.isDismiss);
        var tData = MjClient.data.sData.tData;
        cc.log("  tData.roundNum   ",tData.roundNum);
        if (MjClient.isDismiss || tData.roundNum == -2) {
            block.setOpacity(255 * 0.8);
        }else{
            block.setOpacity(0);
        }
    },
    initLayoutInfo: function (back, maxPlayer) {
        var img_info = back.getChildByName("img_info");
        var infoBg = back.getChildByName("img_bg");
        var backWidth = back.width;
        var width = infoBg.width / 4;
        var gap = infoBg.width * 0;
        img_info.visible = false;
        for (var i = 0; i < maxPlayer; i++) {
            var cloneInfoImg = util.clone(img_info);
            this.setCloneImgTexture(img_info, cloneInfoImg, i);
            back.addChild(cloneInfoImg);
            var spacing = 1.15;      // 上下item的间距
            //var pox = infoBg.width - (width * i * spacing) - gap;
            var pox = infoBg.x + infoBg.width * 0.28;
            cloneInfoImg.setPositionX(pox + ((img_info.width * spacing) * i ));
            this.setEndOneUserUI(cloneInfoImg, i);
        }
    },

    setCloneImgTexture: function (infoBg, cloneInfoBg, idx) {
        var pl = MjClient.playui.getPlayerWithIndex(idx);
        //if(pl && pl.endOneData.huScore > 0) cloneInfoBg.loadTexture("common/bg_gameover_win.png");
    },
});
// 设置单个玩家面板数据
majiang_winGamePanel_jingshan.prototype.setEndOneUserUI = function(infoImg,off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pl = MjClient.playui.getPlayerWithIndex(off);
    if(!pl)return;

    infoImg.setVisible(true);
    infoImg = infoImg.getChildByName("layout_infoData");
     
    var img_zhuang = infoImg.getChildByName("img_zhuang");
    var zhuangIndex = (typeof MjClient.preZhuang != 'undefined') ? MjClient.preZhuang : tData.zhuang;
    img_zhuang.setVisible(tData.uids[zhuangIndex] == pl.info.uid);
    img_zhuang.zIndex=10;
    var temp = this;
    var uibind= {
        layout_infoData: {
            text_name: {
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                    MjClient.endoneui.setUserNameAndIdColor(this, pl);
                },
                _text: function () {
                    var nameStr = unescape(pl.info.nickname ) + "";
                    return MjClient.playui.formatUserName(nameStr, 7, true);
                }
            },
            text_id: {
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    MjClient.endoneui.setUserNameAndIdColor(this, pl);
                },
                _text: function () {
                    return "ID:" + pl.info.uid.toString();
                }
            },
            text_cardType: {
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return pl.endOneData.huTypeStr || "";
                },
            },
            text_cardNum:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return pl.endOneData.paiXingScore;
                }
            },
            text_piaoFen:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    var piaoScore = pl.endOneData.plaoScore || 0;
                    return pl.endOneData.plaoScore;
                }
            },
            text_allScore:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return pl.endOneData.huScore;
                }
            },
            img_tingIcon:{
                _run: function(){
                    this.visible = false;
                    MjClient.endoneui.showTingIcon(pl,this);
                }
            },
            text_winNum: {
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return pl.endOneData.huScore;
                }
            },
            img_huType: {
                _run: function () {
                    MjClient.endoneui.setGameOverPanelPlayerState(this, pl, true);
                }
            }
        }
    };
    BindUiAndLogic(infoImg.parent, uibind);
    this.addWxHeadToEndUI(infoImg.getChildByName("img_head"), off);
    MjClient.playui.setUserOfflineInWinGame(infoImg.getChildByName("img_head"), pl);
};
// 显示麻将小结算底牌
majiang_winGamePanel_jingshan.prototype.showFinalCard = function (_back) {
    return;
};
majiang_winGamePanel_jingshan.prototype.showAddBird =function(){
    return false;
}
majiang_winGamePanel_jingshan.prototype.showTileType = function(title,pl){
    return title.visible = false;
};