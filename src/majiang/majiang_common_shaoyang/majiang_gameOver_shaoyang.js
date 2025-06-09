/***
 * 邵阳App麻将玩法大结算基类
 * @type {void | Class | *}
 */
var majiang_gameOver_shaoyang = majiang_gameOver.extend({
    jsBind:{
     
    },
    ctor : function(jsonSrc){
        this._super(jsonSrc);
    }
});

majiang_gameOver_shaoyang.prototype.getEndallStatisticsName = function() {  
    if(MjClient.playui.getEndallStatisticsName) {
        return MjClient.playui.getEndallStatisticsName();
    }
        
    return ["zimoTotal","dianpaoTotal","jiepaoTotal","angangTotal","minggangTotal"];
};

majiang_gameOver_shaoyang.prototype.getEndallStatisticsKey = function() {  
    if(MjClient.playui.getEndallStatisticsKey) {
        return MjClient.playui.getEndallStatisticsKey();
    }

    return ["自摸次数","点炮次数","接炮次数","暗杠次数","明杠次数"];
};

majiang_gameOver_shaoyang.prototype.setGameOverLayer = function(node,off){
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.playui.getPlayerWithIndex(off);
    if(!pl){
        node.setVisible(false);
        return;
    }

    var uidSelf = SelfUid();
    var maxWinScore = 0, maxDianPaoCount = 0, maxWinPlayer, maxLoseScore = 999999999, maxLosePlayer;  
    var uid, pi;   
    //计算所有人数据
    for (uid in sData.players) {
        pi = sData.players[uid];
        if(!pi){
            continue;
        }
        if (maxWinScore < pi.winall) {
            maxWinScore = pi.winall;
            maxWinPlayer = uid;

        } else if (maxWinScore == pi.winall) {
            if (parseInt(uid) < parseInt(maxWinPlayer)) {
                maxWinScore = pi.winall;
                maxWinPlayer = uid;
            }
        }
        if (pi.winall < maxLoseScore) {
            maxLoseScore = pi.winall;
            maxLosePlayer = uid;
        } else if (pi.winall == maxLoseScore) {
            if (parseInt(uid) < parseInt(maxLosePlayer)) {
                maxLoseScore = pi.winall;
                maxLosePlayer = uid;
            }
        }
        //最大点炮数
        maxDianPaoCount = maxDianPaoCount>pi.dianpaoTotal?maxDianPaoCount:pi.dianpaoTotal;
    } 
    var paoScore = 9999, paoWang = null;
     //存点炮王的数组
    for (uid in sData.players) {
        pi = sData.players[uid];
        if(!pi){
            continue;
        }
        if(maxDianPaoCount == pi.dianpaoTotal){
            if(pi.winall <= paoScore){
                paoScore = pi.winall; 
                paoWang = pi;
            }
        }
    }

    var uibind={
        img_bg: {
            _run: function () {
                if(pl.winall === 0 || pl.winall < maxWinScore){
                    this.loadTexture("gameOver/pjjs_10.png");
                }else{
                    this.loadTexture("gameOver/pjjs_9.png");
                }
            }
        },
        text_name:{
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _text:function(){
                return MjClient.playui.formatUserName(unescape(pl.info.nickname)+"", 7, true);
            }
        },
        text_id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                return  "ID: " + pl.info.uid.toString();
            }
        },
        // 头像
        img_head: {
            _run:function(){
                MjClient.endallui.addWxHeadToEndUI(this,off);   
            }
        },
        img_jieSanIcon: {
            _visible:function(){
                return off == 0 && MjClient.isDismiss;
            }
        },
        text_score: {
            _run:function(){ 
                this.ignoreContentAdaptWithSize(true);

                var _img1 = "gameOver/over_add_sub.png";
                var _img2 = "gameOver/over_sub_text.png";
                var _star_text = "0";

                if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                    _img1 = "gameOver/pjjs_24_new.png";
                    _img2 = "gameOver/pjjs_29_new.png";
                    _star_text = ".";
                }

                var textFileName = pl.winall >= 0 ? _img1 : _img2;
                this.setProperty(pl.winall + "", textFileName, 40, 58, _star_text); 
            },
            // 分数加减
            img_icon: {
                _run : function(){
                    var fileName = pl.winall >= 0 ? "gameOver/over_add_icon.png" : "gameOver/over_sub_icon.png";
                    this.loadTexture(fileName);
                }
            }
        },
        // 大赢家
        img_bigWinner: {
            //最高得分  
            _run:function(){
                if(pl.winall == 0 || pl.winall < maxWinScore){
                    this.setVisible(false);
                }
            }
        },
        // 最佳炮手
        img_paoShowIcon:{
            _visible:function(){
                if(maxDianPaoCount == 0 || !paoWang)
                    return false;
                return paoWang === pl; 
            }
        },
        // 房主
        img_fangZhuIcon: {
            _visible:function(){
                return tData.owner == pl.info.uid; 
            }
        },
        text_scoreTips: {
            _run : function(){
                if(!tData.isFanBei && !pl.isNeedFanBei) return;
                node.getChildByName("text_score").y += 20;

                this.visible = true;
                this.setString("( " + pl.winall * 0.5 + " x2 )");
                this.ignoreContentAdaptWithSize(true);
                if(pl.winall < 0){
                    this.setTextColor(cc.color(0x78,0xf7,0xff));
                } else {
                    this.setTextColor(cc.color(0xf0,0xff,0x76));
                }
            }
        },
        originalScore: {
            _run: function(){
                //整场封顶(原始分数)
                if(tData.areaSelectMode.quanjufengdingScore){
                    this.visible = true;
                    var color = pl.originalScore >= 0 ? cc.color(255,156,0) : cc.color(0,154,156);
                    this.ignoreContentAdaptWithSize(true);
                    this.setTextColor(color);
                    this.setString("(" + pl.originalScore + ")");
                }
            }
        }
    }; 
    BindUiAndLogic(node,uibind); 

    var para = {};
    para.scale = 0.7;
    AddFangKaIcon(sData, node, tData, pl, maxWinScore, maxWinPlayer, maxLoseScore, maxLosePlayer, cc.p(15, 445), para);
    
    this.setRoomStatistics(node.getChildByName("layout_typeText"), pl );
};