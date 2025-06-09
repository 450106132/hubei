function addWxHeadToEndUI_SYZP(node,off)
{
    var pl = MjClient.getPlayerByIndex(off);
    var img = "png/default_headpic.png";
    if(pl && pl.wxHeadImg)
    {
        img = pl.wxHeadImg;
    }
    else
    {
        return;
    }
    var sp = new cc.Sprite(img);
    node.addChild(sp);
    var frame = node.getChildByName("frame");
    if (frame){
        frame.zIndex = sp.zIndex + 1;
    }

    // if(pl.onLine == false && MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
    setRoundEndUserOffline_hengYang(node,pl);
    // }

    setWgtLayout(sp,[0.88,0.88],[0.5,0.5],[0,0],false,true);
}

function addWxHeadToEndUI_newSYZP(node, off) {
    var pl = MjClient.getPlayerByIndex(off);
    var img = "png/default_headpic.png";
    if (pl && pl.wxHeadImg) {
        img = pl.wxHeadImg;
        loadWxHead();
    } else { // 回放直接弹总结算 没有缓存头像
        cc.loader.loadImg(pl.info.headimgurl, {isCrossOrigin: true}, function(err, texture) {
            if (!err && texture) {
                img = texture;
                loadWxHead();
            }
        });
    }

    function loadWxHead() {
        var sp = new cc.Sprite(img);
        var frame = node;
        var clippingNode = new cc.ClippingNode();
        var mask = new cc.Sprite("gameOver/gameOver_headBg2.png");
        clippingNode.setAlphaThreshold(0);
        clippingNode.setStencil(mask);

        sp.setScale(mask.getContentSize().width / sp.getContentSize().width);
        clippingNode.addChild(sp);
        clippingNode.setPosition(frame.getContentSize().width / 2, frame.getContentSize().height / 2);
        //遮罩框
        var hideblock = new cc.Sprite("gameOver/gameOver_headBg3.png");
        hideblock.setPosition(frame.getContentSize().width / 2, frame.getContentSize().height / 2);
        frame.addChild(clippingNode);
        setRoundEndUserOffline_shaoyang(frame,pl);
        frame.addChild(hideblock);
    }
}


function addListViewForLaoChuo(node, off){
    var tData = MjClient.data.sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    if(!pl){
        return;
    }

    var listView = new ccui.ListView();
    listView.setAnchorPoint(cc.p(0.5, 1));
    listView.setPosition(node.width/2, node.height/515*(515 -193));
    listView.width = node.width*0.7;
    listView.height = 180;
    listView.setClippingEnabled(true);
    listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
    listView.setBounceEnabled(true);
    listView.setScale(node.getScale());
    node.addChild(listView);

    for(var i = 0; i < tData.roundAll; i++){
        var item = new ccui.Layout();
        item.setAnchorPoint(0.5, 0);
        item.setName("item_layout");
        item.setContentSize(cc.size(listView.width, listView.height/4));
        item.setPosition(listView.width/2, listView.height - i*item.height -10);
        item.setTouchEnabled(true);
        item.setBackGroundColor(cc.color(255,0,0))

        var _height = item.getContentSize().height;
        var _width = item.getContentSize().width;

        var title = new ccui.Text();
        title.setAnchorPoint(0, 0.5);
        title.setFontName("fonts/lanting.ttf");
        title.setString("第"+ (i+1) + "局：");
        title.setColor(cc.color("#443333"));
        title.setName("title");
        title.setFontSize(28);
        title.setPosition(cc.p(5, _height/2)); 
        title.ignoreContentAdaptWithSize(true);
        item.addChild(title);

        var score = new ccui.Text();
        title.setAnchorPoint(0, 0.5);
        score.setFontName("fonts/lanting.ttf");
        score.setString("" + (typeof(pl.tableMsg[i]) != "undefined"  ? pl.tableMsg[i] : 0));
        score.setColor(cc.color("#D3260E"));
        score.setName("score");
        score.setFontSize(30);
        score.setPosition(cc.p(_width/4*3, _height/2));
        title.ignoreContentAdaptWithSize(true);
        item.addChild(score);

        listView.pushBackCustomItem(item);
    }
}

function SetGameOverLayer_zipai(node,off,isNewUi){
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    if(!pl){
        node.setVisible(false);
        return;
    }

    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0; 
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;
  
    if (MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG
        || MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA
        || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI
        || MjClient.gameType == MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO
        || MjClient.gameType == MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI) {
        setDismissTypeImg(pl,node,0.5,0.25,"chang");
    }else{
        setDismissTypeImg(pl,node,0.5,0.19,"chang");
    }
    
     
    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) { // 衡阳
                MaxWinAll = MaxWinAll > pi.winall ? MaxWinAll : pi.winall;

            } else { // 邵阳
                if (MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI || MjClient.gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI) {

                    if (MaxWinAll < pi.winScore) {
                        MaxWinAll = pi.winScore;
                        MaxWinPlayer = uid;

                    } else if (MaxWinAll == pi.winScore) {
                        if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                            MaxWinAll = pi.winScore;
                            MaxWinPlayer = uid;
                        }
                    }
                    if (pi.winScore < MaxloseAll) {
                        MaxloseAll = pi.winScore;
                        MaxlosePlayer = uid;
                    } else if (pi.winScore == MaxloseAll) {
                        if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                            MaxloseAll = pi.winScore;
                            MaxlosePlayer = uid;
                        }
                    }
                } else {
                    if (MaxWinAll < pi.winall) {
                        MaxWinAll = pi.winall;
                        MaxWinPlayer = uid;

                    } else if (MaxWinAll == pi.winall) {
                        if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                            MaxWinAll = pi.winall;
                            MaxWinPlayer = uid;
                        }
                    }
                    if (pi.winall < MaxloseAll) {
                        MaxloseAll = pi.winall;
                        MaxlosePlayer = uid;
                    } else if (pi.winall == MaxloseAll) {
                        if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                            MaxloseAll = pi.winall;
                            MaxlosePlayer = uid;
                        }
                    }
                }
            }
        }
    }

    var uibind={
        name:{
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _text:function(){
                if(!pl){
                    return "";
                }
                return getNewName(unescape(pl.info.nickname)+"");
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                if(!pl){
                    return "ID:";
                }
                return  "ID: " + pl.info.uid.toString();
            }
        },
        allscore:{
            winNum1:{
            },
            winNum2:{
            },
            bigWinner:{
                _visible : false
            }
        } 
    }; 

    var wxNode = node.getChildByName("head"); 
    addWxHeadToEndUI_newSYZP(wxNode,off);   
    BindUiAndLogic(node,uibind); 

    
    node.getChildByName("jieSanIcon").setVisible(off == 0 && MjClient.isDismiss);
    
 
    
    var jiachuiIcon = node.getChildByName("jiachui"); 
    jiachuiIcon.setVisible(pl.jiachuiNum == 1);
    
    var textNode = node.getChildByName("textNode");
    if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
        jiachuiIcon.setVisible(false); 
        var zonghushu = textNode.getChildByName("zonghushu"); 
        zonghushu.setVisible(false); 

        // 衡阳增加放炮，怕影响线上的，先临时做位置处理，后期要改成读配置信息
        var movePos = function(){
            var text_6 = textNode.getChildByName("Text_6");
            var text_7 = textNode.getChildByName("Text_7");
            text_6.y -= 38;
            text_7.y -= 38;
            var cloneText = text_7.clone();
            textNode.addChild(cloneText);
            cloneText.setPositionY(text_7.y+74 );
            cloneText.setString("放炮次数");
            textNode.getChildByName("winall").setPositionY(cloneText.y);
            var tiNum = textNode.getChildByName("tiNum");
            var paoNum = textNode.getChildByName("paoNum");
            tiNum.y -= 38;
            paoNum.y -= 38;
        }

        movePos(); 
         
        textNode.setPositionY(188 + 50);

    }else{
        if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI) //字牌不显示加锤
            jiachuiIcon.setVisible(false);

        //冷水江十胡倒直接不显示加锤
        if (MjClient.gameType == MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO) {
            jiachuiIcon.setVisible(false);
        }

        if(MjClient.gameType != MjClient.GAME_TYPE.SHAO_YANG_BO_PI && MjClient.gameType != MjClient.GAME_TYPE.DA_ZI_BO_PI){
            // 位置上移    
            var zonghushu = textNode.getChildByName("zonghushu"); 
            zonghushu.setVisible(false);
            textNode.setPositionY(188 + 40);
            textNode.getChildByName("winall").setVisible(false); 
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI) {
            //增加个接炮次数
            var tiNode = textNode.getChildByName("Text_6");
            var paoNode = textNode.getChildByName("Text_7");
            var dianPaoNode = paoNode.clone();
            dianPaoNode.setString("点炮次数");
            dianPaoNode.ignoreContentAdaptWithSize(true);
            dianPaoNode.y = tiNode.y;
            tiNode.y = paoNode.y;
            paoNode.y = 2 * tiNode.y - dianPaoNode.y;
            textNode.getChildByName("tiNum").y = tiNode.y;
            textNode.getChildByName("paoNum").y = paoNode.y;
            dianPaoNode.setName("dianPao");
            var dianPaoNum = textNode.getChildByName("paoNum").clone();
            dianPaoNum.ignoreContentAdaptWithSize(true);
            dianPaoNum.y = dianPaoNode.y;
            dianPaoNum.setName('dianpao');
            textNode.addChild(dianPaoNode);
            textNode.addChild(dianPaoNum);

            //不显示加锤
            jiachuiIcon.setVisible(false);
        }   
    }
    

    //最高得分 
    var bigWinner = node.getChildByName("bigWinner");
    bigWinner.setVisible(false);

    // 玩家分数
    var winNum = node.getChildByName("score_text");
    winNum.ignoreContentAdaptWithSize(true); 
    var icon = node.getChildByName("icon");  
    var scoreContnet = 0;
    var scoreOriginal = 0;
    if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
        scoreContnet = pl.winScore2;
        if(tData.areaSelectMode.scoreNeedEnough == 1){
            if(pl.winScore < 0 && pl.winScore < pl.winScore2){
                var bg = new ccui.ImageView("gameOver/newOver/jifenbuzu.png");
                bg.anchorX = 0.5;
                bg.anchorY = 0;
                bg.x = wxNode.width / 2;
                bg.y = 0;
                bg.name = "scoreTip";
                wxNode.addChild(bg);
            }
        }
        scoreOriginal = pl.winScore;
    }else if(MjClient.gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI){
        scoreContnet = pl.winScore;
        scoreOriginal = pl.winScore;
    }else{
        scoreContnet = pl.winall;
        scoreOriginal = pl.winall;
    }
    
    // var textFileName = scoreContnet >= 0 ? "gameOver/addScore_zipai.png" : "gameOver/loseScore_zipai.png";
    // var iconImg = scoreContnet >= 0 ? "gameOver/add_zipai.png" : "gameOver/sub_zipai.png"; 
    
    var _img1 = "gameOver/over_add_sub.png";
    var _img2 = "gameOver/over_sub_text.png";

    var _item_text_width = 40;
    var _item_text_height = 58;
    var _star_text = "0";

    if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
        _img1 = "gameOver/pjjs_24_new.png";
        _img2 = "gameOver/pjjs_29_new.png";
        _star_text = ".";
    }

    var textFileName = scoreContnet >= 0 ? _img1 : _img2;
    var iconImg = scoreContnet >= 0 ? "gameOver/over_add_icon.png" : "gameOver/over_sub_icon.png"; 
    icon.loadTexture(iconImg); 
    winNum.setProperty(scoreContnet + "", textFileName, _item_text_width, _item_text_height, _star_text);
       

    if(tData.isFanBei){
        var score_tip = node.getChildByName("score_tip");
        score_tip.visible = true;
        winNum.y += 20;
        icon.y += 20;
        score_tip.setString("( " + scoreOriginal * 0.5 + " x2 )");
        score_tip.ignoreContentAdaptWithSize(true);
        if(scoreContnet < 0){
            score_tip.setTextColor(cc.color(165,255,255));
            score_tip.enableOutline(cc.color(66,60,102), 2)
        }
    }
    
    // 大赢家
    var nodeParent = node.getParent().getParent();  

    if( scoreContnet == MaxWinAll  && scoreContnet != 0  ){
        bigWinner.visible = true; 
        node.loadTexture("gameOver/over_box_1.png"); 
    }  

    AddFangKaIcon(sData, node, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(50, 435));

    //分数位置移动
    var moveSize = winNum.getCustomSize().width *0.3;
    winNum.x -= moveSize;
    icon.x -= moveSize;

 
    // 玩家数据信息  
    var showRoomStatistics = function(node,showList,data){
            // roomStatistics [] // 胡牌 自摸 点炮 提 跑次数统计 
        var showStatistics = {"huNum":0,"ziNum":1,"dianpao":2,"tiNum":3,"paoNum":4,"winall":5};
        for (var i = 0; i < showList.length; i++) {
            var name = showList[i];
            var text = node.getChildByName(name); 
            if(name === "winall"){
                if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                    text.setString("" + data[2]); 
                }else{
                    text.setString("" + pl.winall);  
                } 
            }
            else{
                text.setString("" + data[showStatistics[name]]);   
            }
        } 
    } 
    if (MjClient.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI) {
        showRoomStatistics(textNode,["winall","huNum","ziNum","dianpao","tiNum","paoNum"],pl.roomStatistics); 
    } else {
        showRoomStatistics(textNode,["winall","huNum","ziNum","tiNum","paoNum"],pl.roomStatistics); 
    }

    if(MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO && textNode){
        textNode.setVisible(false);
    }

    //整场封顶(原始分数)
    var originalScoreLabel = node.getChildByName("originalScore");
    if(tData.areaSelectMode.quanjufengdingScore){
        originalScoreLabel.visible = true;
        var color = pl.originalScore >= 0 ? cc.color(255,156,0) : cc.color(0,154,156);
        originalScoreLabel.ignoreContentAdaptWithSize(true);
        originalScoreLabel.setTextColor(color);
        originalScoreLabel.setString("(" + pl.originalScore + ")");
    }
}

var GameOverLayer_syZiPai = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:{
            close :{ 
            },
            share :{
                img_shine:{
                    _visible:false
                },
                img_txt:{
                    _visible:false
                },
                img_point:{
                    _visible:false
                },
                _event:{
                    captureScreen_OK:function(){ 
                        if (MjClient.endallui.capture_screen != true)
                            return;
                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            } 
        } 
 
    },
    ctor:function () {
        this._super(); 
        //test
        // MjClient.data.sData = {"players":{"1000140":{"mjhand":[10,8,1,26,6,3,2,28,27,4,30,29,9],"mjdesc":[" ÓÚ2018-04-19 22:27:40ÉêÇë½âÉ¢"],"winone":0,"winall":34,"winType":0,"baseWin":0,"mjwei":[],"mjsort":[],"handSort":[],"be":[2],"hzdesc":{},"zimoTotal":0,"dianpaoTotal":0,"minggangTotal":0,"angangTotal":0,"mjpeng":[],"mjgang0":[],"mjflower":[],"info":{"uid":1000140,"appid":"yueyang","unionid":"unionid-1000140","sex":2,"nickname":"%u6E38%u5BA2140","headimgurl":"http://cdn.jtcfgame.com/images/8.jpg","district":"¹ã¶«Ê¡ÉîÛÚÊÐ","mobileNum":null,"registerIp":"233.69.220.83","lastLoginTime":1524144707673,"lastShareDay":0,"createRoomNum":10,"createTime":1522130860424,"money":84,"integral":0,"limitMoney":0,"myMemberId":null,"memberId":null,"bindHistory":0,"sid":28,"fid":"pkcon001","remoteIP":"172.17.100.42","lockMoney":4,"did":"pkplayer000","lastGameTime":1524148005207},"tableMsg":[6,-4,40,-8,0],"longCard":[]},"1000141":{"mjhand":[25,29,28,7,30,4,2,21,23,10,25,3,91,24],"mjdesc":["Í¬Òâ½âÉ¢"],"winone":0,"winall":1,"winType":0,"baseWin":0,"mjwei":[],"mjsort":[],"handSort":[],"be":[10],"hzdesc":{},"zimoTotal":0,"dianpaoTotal":0,"minggangTotal":0,"angangTotal":0,"mjpeng":[],"mjgang0":[],"mjflower":[],"info":{"uid":1000141,"appid":"yueyang","unionid":"unionid-1000141","sex":2,"nickname":"%u6E38%u5BA2141","headimgurl":"http://cdn.jtcfgame.com/images/0.jpg","district":"¹ã¶«Ê¡ÉîÛÚÊÐ","mobileNum":null,"registerIp":"51.72.78.192","lastLoginTime":1524140486058,"lastShareDay":0,"createRoomNum":10,"createTime":1522130860424,"money":100,"integral":0,"limitMoney":0,"myMemberId":null,"memberId":null,"bindHistory":0,"sid":28,"fid":"pkcon000","remoteIP":"172.17.100.42","lockMoney":0,"did":"pkplayer001","lastGameTime":1524148005208},"tableMsg":[-3,8,-20,16,0],"longCard":[]},"1000142":{"mjhand":[3,27,1,7,27,91,29,8,22,23,26,28,21],"mjdesc":["Í¬Òâ½âÉ¢"],"winone":0,"winall":-35,"winType":0,"baseWin":0,"mjwei":[],"mjsort":[],"handSort":[],"hzdesc":{},"zimoTotal":0,"dianpaoTotal":0,"minggangTotal":0,"angangTotal":0,"mjpeng":[],"mjgang0":[],"mjflower":[],"info":{"uid":1000142,"appid":"yueyang","unionid":"unionid-1000142","sex":2,"nickname":"%u6E38%u5BA2142","headimgurl":"http://cdn.jtcfgame.com/images/6.jpg","district":"¹ã¶«Ê¡ÉîÛÚÊÐ","mobileNum":null,"registerIp":"221.17.206.152","lastLoginTime":1524140487757,"lastShareDay":0,"createRoomNum":10,"createTime":1522130860424,"money":100,"integral":0,"limitMoney":0,"myMemberId":null,"memberId":null,"bindHistory":0,"sid":30,"fid":"pkcon001","remoteIP":"172.17.100.42","lockMoney":0,"did":"pkplayer000","lastGameTime":1524148005208},"tableMsg":[-3,-4,-20,-8,0],"longCard":[]}},"tData":{"initCoin":0,"gameType":2018092,"roundAll":16,"roundNum":-2,"isValidTable":true,"fanNum":0,"maxPlayer":3,"uids":[1000140,1000141,1000142],"owner":1000140,"maxHunNum":4,"tableid":"493386","cardNext":40,"winner":-1,"zhuang":1,"curPlayer":1,"lastPutPlayer":1,"putType":1,"lastDrawPlayer":1,"tState":6,"lastPutCard":24,"genpaiCount":0,"isHunCardPlay":false,"canHu7":false,"delEnd":0,"delEndHePai":0,"firstDel":1000140,"canEatHu":true,"huangNum":14,"lastGangType":0,"lastGangDianpaoPlayer":-1,"xingPlayer":-1,"datuoNum":0,"mingCard":0,"areaSelectMode":{"maxPlayer":3,"payWay":0},"gameCnName":"ãèÂÞºì×Ö","hunCard":-1,"currCard":-1,"drawType":0,"isLastDraw":true,"isFirstPut":false,"hasPay":true,"hePai":false,"roundNumPre":12},"cards":[25,29,28,7,30,4,2,21,23,10,25,3,91,3,27,1,7,27,91,29,8,22,23,26,28,21,10,8,1,26,6,3,2,28,27,4,30,29,9,24,22,23,8,10,26,2,27,91,30,3,1,22,25,6,5,10,22,21,7,29,5,30,9,7,24,91,25,2,9,6,5,21,8,5,4,24,28,9,26,23,6,1,24,4],"hunCard":-1,"roundEndTime":"2018-04-19 22:26:45","isDismiss":true,"playInfo":{"gametype":2018092,"owner":1000140,"money":4,"now":"2018-04-19 22:26:45","tableid":"493386","players":[{"uid":1000140,"winall":34,"nickname":"%u6E38%u5BA2140","money":84},{"uid":1000141,"winall":1,"nickname":"%u6E38%u5BA2141","money":100},{"uid":1000142,"winall":-35,"nickname":"%u6E38%u5BA2142","money":100}]}};
        cc.log("----------------------------------");

        cc.log(JSON.stringify(MjClient.data.sData));

        var endallui = ccs.load("endAll_ZiPai.json");
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);
        // setWgtLayout(endallui.node,[0,1],[0,0],[0,0]);
        MjClient.endallui=this;


        // 要测试后面的遮罩
        var _bgBox = endallui.node.getChildByName("bgBox");
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            _bgBox.setOpacity(255);  
            _bgBox.setBackGroundColorOpacity(255);
            _bgBox.removeBackGroundImage();
        }
        

        setWgtLayout(_bgBox,[1,1],[0.5,0.5],[0,0],true); 

        var _back = endallui.node.getChildByName("back");
        setWgtLayout(_back,[0.95,0.95],[0.5,0.5],[0,0]);
        // //分享
        var _share =  _back.getChildByName("share");
        this._share = _share;
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        _share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;

        //_share.x = 713.24;//屏蔽再来一局的时候，坐标要移动一下
        _share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                    {
                        COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                            cc.log("====================capture_screen=======================");
                            postEvent("capture_screen");
                            if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                MjClient.endallui.capture_screen = true;
                            }
                            _share.setTouchEnabled(false);
                        });
                    });
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fanxiang",  {uid:SelfUid(),gameType:MjClient.gameType});
                    break;
                default :
                    break;
            }
        },this);


        //四个玩家的详细信息
        var infoBg = _back.getChildByName("infoBg");
        var infoBgSize = infoBg.getCustomSize();

        var info = infoBg.getChildByName("info");
        info.visible = false;
        var bgSize = info.getCustomSize();
        var sData = MjClient.data.sData;
        var players = sData.players;
        var playerCount = Object.keys(players).length;


 

        var num = playerCount == 4 ? 3.5 : 3.5; 
        var pos = (infoBgSize.width /  num  - 10 );
        var space = (infoBgSize.width - playerCount * bgSize.width) / (playerCount + 1);
        var startPosX = space + bgSize.width / 2;

        var clone = null;
        for(var i = 0 ; i < playerCount ; i++){
            clone = info.clone();
            clone.visible = true;
            if(playerCount == 4){
                clone.setPosition(cc.p(pos * i + (bgSize.width*0.32 ),infoBgSize.height/2));
            }else if(playerCount == 2){
                clone.setPosition(cc.p(startPosX + (space + bgSize.width) * i, infoBgSize.height/2));
            }else{
                clone.setPosition(cc.p(pos * i + (infoBgSize.width*0.23),infoBgSize.height/2));
            }
            
            infoBg.addChild(clone); 
            SetGameOverLayer_zipai(clone,i, false); 

            if(MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO){
                addListViewForLaoChuo(clone, i);
            }

            COMMON_UI.addGameOverNotSameClubUI(clone,MjClient.getPlayerByIndex(i))
            // startPos = cc.p(startPos.x + bgSize.width+off_x,startPos.y);
        } 

        // // 如果是亲友圈的房间显示亲友圈图标及名称 
        var clubNode = _back.getChildByName("Image_club");
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubId && clubNode != null)
        { 
            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString("" + unescape(clubInfoTable.clubTitle));
            if(MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType() && (MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI 
                || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER
                || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR
                || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King || MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO)){
                    clubName.setFontSize(34);
            }

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);

            cc.loader.loadImg(clubInfoTable.clubAvatar, {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubNode != null)
        {
            clubNode.setVisible(false);
        } 

        var sData=MjClient.data.sData;
        var tData=sData.tData;  

        // var jieSanIcon = _back.getChildByName("jieSanIcon");  
        // jieSanIcon.setVisible(MjClient.isDismiss);

        var _infoMation =  _back.getChildByName("infoMation"); 
        if (_infoMation) { 
            _infoMation.setString("")
            _infoMation.visible = true;
            //描述结算  
            if (MjClient.isDismiss)
            {  

                var id = tData.firstDel;
                var pl = sData.players[id];
                var delStr = "";
                if(pl) {
                    var name  =  unescape(pl.info.nickname);
                    delStr = name + pl.mjdesc[0]; 
                } else {
                    pl = getUIPlayer(0);
                    if (pl)
                        delStr = pl.mjdesc[0];
                }  
                _infoMation.setString("" + delStr) ;
                _infoMation.setFontName("Arial");
                _infoMation.setFontSize(_infoMation.getFontSize());
            }
        } 

        // 结束时间
        if(!MjClient.isDismiss && _infoMation){
          _infoMation.setString( MjClient.roundEndTime+"");  
        } 
  
        function _infoText(){
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            var text = "";//GameCnName[MjClient.gameType];
            var roomID = tData.tableid;
            text += GameCnName[MjClient.gameType] +  ",房间号:" + roomID +  "," + getPlaySelectPara(MjClient.gameType, tData.areaSelectMode);
             
            if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI ||
                MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI ||
                MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI) {
                var textArr = text.split(","); 
                var tempText = "";
                for (var i = 0; i < textArr.length; i++) {
                    if(i != 0 && textArr[i] != "" && i < textArr.length  )
                        tempText += ",";
                    tempText += textArr[i]; 
                } 
                return tempText; 
            } 
            return text;
        }

        
        var information = _back.getChildByName("information"); 
        information.ignoreContentAdaptWithSize(false); 
        information.setSize(cc.size(370, 110));  
        if( MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ){
            information.setSize(cc.size(420, 90));
        }



        information.setString(_infoText());
 
        cc.log(JSON.stringify(MjClient.data.sData));
    
        // //close ,关闭
        var _close1 =  _back.getChildByName("close");
        this._close1 = _close1;
        _close1.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable && !(MjClient.rePlayVideo >= 0 && MjClient.replayui)) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    } 
                    //MjClient.leaveGame();
                    //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                    //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");
                    if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                        MjClient.Scene.addChild(new EnterRoomLayer());

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }

                    if(MjClient.rePlayVideo >= 0 && MjClient.replayui){
                        MjClient.replayui.replayEnd();
                    }


                    break;
                default :
                    break;
            }
        },this);  

        //复制战绩
        addCopyBtnToGameOverLayer(endallui.node);
     
        return true;
    },
    onEnter:function()
    {
        this._super();
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true")
        {
            MjClient.homeui.gameRankLayer();
        }
    },

    //提前查看总结算的一些设置
    replaySet : function(cb){
        this._close1.addTouchEventListener(function(sender,type){
            if (type == ccui.Widget.TOUCH_ENDED)
                MjClient.goOnReplay();
        }, this);

        // var btn = new ui.Button("ui/zhanji/huikanMj_n.png", "ui/zhanji/huikanMj_s.png", "ui/zhanji/huikanMj_s.png", ccui.Widget.LOCAL_TEXTURE);
        // btn.addClickEvent(function(){
        //     MjClient.goOnReplay();
        // }, this);
        // btn.x = this._share.x + 120;
        // btn.y = this._share.y;
        // // btn.scale = 1.2;
        // this._share.parent.addChild(btn);
        // this._share.x -= 120;

        // this._close1.addTouchEventListener(function(sender,Type){
        //     if(MjClient.endallui){
        //         MjClient.endallui.removeFromParent(true);
        //         MjClient.endallui = null;
        //     }

        //     if(MjClient.rePlayVideo >= 0 && MjClient.replayui){
        //         MjClient.replayui.replayEnd();
        //     }
        // },this);  
    }
});

/****                 
********/
//    邵阳娄底放炮罚  大结算设置个人信息  这是娄底
function SetGameOverLayer_loudi(node,off,isNewUi){
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    cc.log("大结算 pl：" + JSON.stringify(pl));

    if(!pl){
        node.setVisible(false);
        return;
    }
    setDismissTypeImg(pl,node,0.5,0.19,"chang");

    var jieSanIcon = node.getChildByName("jieSanIcon");  
    jieSanIcon.setVisible(MjClient.isDismiss && off == 0);

    var uidSelf = SelfUid();

    var MaxWinAll = 0;
    var MaxDianPao = 0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }


    var uibind={
        name:{
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _text:function(){
                if(!pl){
                    return "";
                }
                return getNewName_new(unescape(pl.info.nickname)+"",6);
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                if(!pl){
                    return "ID:";
                }
                return  "ID: " + pl.info.uid.toString();
            }
        },
        bigWinner: {
            _visible: false,
            _run:function(){
                var isShow = true;
                for(var uid in sData.players){
                    var player = sData.players[uid];
                    if(pl.info.uid == player.info.uid){
                        continue;
                    }
                    
                    if(player.fenshu != undefined && pl.fenshu != undefined)
                    {
                        if(player.fenshu > pl.fenshu || pl.fenshu == 0)
                        {
                            isShow = false;
                        }
                    }
                    else
                    {
                        if(player.winall > pl.winall || pl.winall == 0)
                        {
                            isShow = false;
                        }
                    }
                }
                if(isShow){
                    this.setVisible(isShow); 
                    this.getParent().loadTexture("gameOver/over_box_1.png"); 
                } 
            },
        },
        jiachui: {
            _run:function(){
                if (MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI || MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI) {
                    this.visible = false;
                    return;
                }
                this.visible = true;
                var tData = MjClient.data.sData.tData;
                var daTuoImg = "gameOver/datuo.png";
                var BuDaTuoImg = "gameOver/budatuo.png";
                if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI){
                    daTuoImg = "gameOver/datuo_XX.png";
                    BuDaTuoImg = "gameOver/budatuo_XX.png";
                }

                if(pl.jiazhuNum == 0){
                    this.loadTexture(BuDaTuoImg);
                }else{
                    this.loadTexture(daTuoImg);
                }
                
                if(tData.areaSelectMode.tuototuo == 0){
                    this.visible = false;
                }
            }
        }
    }; 

    var wxNode = node.getChildByName("head"); 
    addWxHeadToEndUI_newSYZP(wxNode,off); 
    BindUiAndLogic(node,uibind); 

    // 玩家分数   这是娄底
    var winNum = node.getChildByName("score_text");
    winNum.ignoreContentAdaptWithSize(true); 
    var icon = node.getChildByName("icon"); 
    var scoreContnet = pl.fenshu != undefined ? pl.fenshu : pl.winall;
    var scoreOriginal = scoreContnet;
    if(pl.fenshu2 != undefined){
        scoreContnet = pl.fenshu2;
        if(tData.areaSelectMode.scoreNeedEnough == 1){
            if(pl.fenshu < 0 && pl.fenshu < pl.fenshu2){
                var bg = new ccui.ImageView("gameOver/newOver/jifenbuzu.png");
                bg.anchorX = 0.5;
                bg.anchorY = 0;
                bg.x = wxNode.width / 2;
                bg.y = 0;
                bg.name = "scoreTip";
                wxNode.addChild(bg);
            }
        }
    }
    
    
    var _img1 = "gameOver/addScore_zipai.png";
    var _img2 = "gameOver/loseScore_zipai.png";

    var _item_text_width = 33;
    var _item_text_height = 46;
    var _star_text = "0";

    if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
        _img1 = "gameOver/pjjs_24_new.png";
        _img2 = "gameOver/pjjs_29_new.png";

        _item_text_width = 40;
        _item_text_height = 58;
        
        _star_text = ".";
    }

    var textFileName = scoreContnet >= 0 ? _img1 : _img2;
    var iconImg = scoreContnet >= 0 ? "gameOver/add_zipai.png" : "gameOver/sub_zipai.png"; 
    icon.loadTexture(iconImg);
    winNum.setProperty(scoreContnet + "", textFileName, _item_text_width, _item_text_height, _star_text);
    

    //玩家总胡息
    var textNode = node.getChildByName("textNode"); 
    var winall = textNode.getChildByName("winall");
    winall.setString((pl.winall/10).toFixed(0)*10);

    if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI || MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI){
        textNode.getChildByName("Text_3").visible = false;
        winall.visible = false;
    }

    if(tData.isFanBei || pl.isNeedFanBei){
        var score_tip = node.getChildByName("score_tip");
        score_tip.visible = true;
        winNum.y += 20;
        icon.y += 20;
        score_tip.setString("( " + scoreOriginal * 0.5 + " x2 )");
        score_tip.ignoreContentAdaptWithSize(true);
        if(scoreContnet < 0){
            score_tip.setTextColor(cc.color(165,255,255));
            score_tip.enableOutline(cc.color(66,60,102), 2)
        }
    }
    AddFangKaIcon(sData, node, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(50, 435));

    //分数位置移动
    var moveSize = winNum.getCustomSize().width / 2;
    winNum.x -= moveSize;
    icon.x -= moveSize;

    // 玩家数据信息  
    var showRoomStatistics = function(node,showList,data){
        // 胡牌 自摸 点炮 提 跑次数统计 
        for (var i = 0; i < showList.length; i++) {
            var name = showList[i];
            var text = node.getChildByName(name); 
            var textContnet = data[name] != undefined ? data[name] : data[i];
            text.setString("" + textContnet);   
        } 
    } 

    var gameOverData = pl.totalFinish;
    var gameOverShow = ["huNum","ziMoNum","dianpaoNum","tiPaiNum","paoPaiNum"];
    if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI || MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI){
        gameOverData = pl.roomStatistics;
        gameOverShow = ["huNum","ziMoNum","tiPaiNum","paoPaiNum"];
        textNode.getChildByName("dianpaoNum").setString("0");
    }

    showRoomStatistics(textNode,gameOverShow,gameOverData);
}
 
/*
    邵阳里面的   《娄底》   字牌大结算  这是娄底
 */
var GameOverLayer_syLoudi = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:{
            close :{ 
            },
            share :{
                img_shine:{
                    _visible:false
                },
                img_txt:{
                    _visible:false
                },
                img_point:{
                    _visible:false
                },
                _event:{
                    captureScreen_OK:function(){ 
                        if (MjClient.endallui.capture_screen != true)
                            return;
                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            },
            dir_roomname:
            {
                _visible:true,
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    var sData=MjClient.data.sData;
                    var tData=sData.tData;

                    var str = GameCnName[MjClient.gameType];
                    var text = str;
                    return text;
                }
            },
            dir_roomnum:
            {
                _visible:true,
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    var sData=MjClient.data.sData;
                    var tData=sData.tData;

                    var str ="";
                    var text = str;
                    text += ("房间号:" + tData.tableid);
                    return text;
                }
            },
            time:
            {
                _visible:true,
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    var str = MjClient.roundEndTime;
                    return str;
                }
            } 
        } 
 
    },
    ctor:function () {
        this._super(); 
        //test这是娄底
        // MjClient.data.sData = {"players":{"1000140":{"mjhand":[10,8,1,26,6,3,2,28,27,4,30,29,9],"mjdesc":[" ÓÚ2018-04-19 22:27:40ÉêÇë½âÉ¢"],"winone":0,"winall":34,"winType":0,"baseWin":0,"mjwei":[],"mjsort":[],"handSort":[],"be":[2],"hzdesc":{},"zimoTotal":0,"dianpaoTotal":0,"minggangTotal":0,"angangTotal":0,"mjpeng":[],"mjgang0":[],"mjflower":[],"info":{"uid":1000140,"appid":"yueyang","unionid":"unionid-1000140","sex":2,"nickname":"%u6E38%u5BA2140","headimgurl":"http://cdn.jtcfgame.com/images/8.jpg","district":"¹ã¶«Ê¡ÉîÛÚÊÐ","mobileNum":null,"registerIp":"233.69.220.83","lastLoginTime":1524144707673,"lastShareDay":0,"createRoomNum":10,"createTime":1522130860424,"money":84,"integral":0,"limitMoney":0,"myMemberId":null,"memberId":null,"bindHistory":0,"sid":28,"fid":"pkcon001","remoteIP":"172.17.100.42","lockMoney":4,"did":"pkplayer000","lastGameTime":1524148005207},"tableMsg":[6,-4,40,-8,0],"longCard":[]},"1000141":{"mjhand":[25,29,28,7,30,4,2,21,23,10,25,3,91,24],"mjdesc":["Í¬Òâ½âÉ¢"],"winone":0,"winall":1,"winType":0,"baseWin":0,"mjwei":[],"mjsort":[],"handSort":[],"be":[10],"hzdesc":{},"zimoTotal":0,"dianpaoTotal":0,"minggangTotal":0,"angangTotal":0,"mjpeng":[],"mjgang0":[],"mjflower":[],"info":{"uid":1000141,"appid":"yueyang","unionid":"unionid-1000141","sex":2,"nickname":"%u6E38%u5BA2141","headimgurl":"http://cdn.jtcfgame.com/images/0.jpg","district":"¹ã¶«Ê¡ÉîÛÚÊÐ","mobileNum":null,"registerIp":"51.72.78.192","lastLoginTime":1524140486058,"lastShareDay":0,"createRoomNum":10,"createTime":1522130860424,"money":100,"integral":0,"limitMoney":0,"myMemberId":null,"memberId":null,"bindHistory":0,"sid":28,"fid":"pkcon000","remoteIP":"172.17.100.42","lockMoney":0,"did":"pkplayer001","lastGameTime":1524148005208},"tableMsg":[-3,8,-20,16,0],"longCard":[]},"1000142":{"mjhand":[3,27,1,7,27,91,29,8,22,23,26,28,21],"mjdesc":["Í¬Òâ½âÉ¢"],"winone":0,"winall":-35,"winType":0,"baseWin":0,"mjwei":[],"mjsort":[],"handSort":[],"hzdesc":{},"zimoTotal":0,"dianpaoTotal":0,"minggangTotal":0,"angangTotal":0,"mjpeng":[],"mjgang0":[],"mjflower":[],"info":{"uid":1000142,"appid":"yueyang","unionid":"unionid-1000142","sex":2,"nickname":"%u6E38%u5BA2142","headimgurl":"http://cdn.jtcfgame.com/images/6.jpg","district":"¹ã¶«Ê¡ÉîÛÚÊÐ","mobileNum":null,"registerIp":"221.17.206.152","lastLoginTime":1524140487757,"lastShareDay":0,"createRoomNum":10,"createTime":1522130860424,"money":100,"integral":0,"limitMoney":0,"myMemberId":null,"memberId":null,"bindHistory":0,"sid":30,"fid":"pkcon001","remoteIP":"172.17.100.42","lockMoney":0,"did":"pkplayer000","lastGameTime":1524148005208},"tableMsg":[-3,-4,-20,-8,0],"longCard":[]}},"tData":{"initCoin":0,"gameType":2018092,"roundAll":16,"roundNum":-2,"isValidTable":true,"fanNum":0,"maxPlayer":3,"uids":[1000140,1000141,1000142],"owner":1000140,"maxHunNum":4,"tableid":"493386","cardNext":40,"winner":-1,"zhuang":1,"curPlayer":1,"lastPutPlayer":1,"putType":1,"lastDrawPlayer":1,"tState":6,"lastPutCard":24,"genpaiCount":0,"isHunCardPlay":false,"canHu7":false,"delEnd":0,"delEndHePai":0,"firstDel":1000140,"canEatHu":true,"huangNum":14,"lastGangType":0,"lastGangDianpaoPlayer":-1,"xingPlayer":-1,"datuoNum":0,"mingCard":0,"areaSelectMode":{"maxPlayer":3,"payWay":0},"gameCnName":"ãèÂÞºì×Ö","hunCard":-1,"currCard":-1,"drawType":0,"isLastDraw":true,"isFirstPut":false,"hasPay":true,"hePai":false,"roundNumPre":12},"cards":[25,29,28,7,30,4,2,21,23,10,25,3,91,3,27,1,7,27,91,29,8,22,23,26,28,21,10,8,1,26,6,3,2,28,27,4,30,29,9,24,22,23,8,10,26,2,27,91,30,3,1,22,25,6,5,10,22,21,7,29,5,30,9,7,24,91,25,2,9,6,5,21,8,5,4,24,28,9,26,23,6,1,24,4],"hunCard":-1,"roundEndTime":"2018-04-19 22:26:45","isDismiss":true,"playInfo":{"gametype":2018092,"owner":1000140,"money":4,"now":"2018-04-19 22:26:45","tableid":"493386","players":[{"uid":1000140,"winall":34,"nickname":"%u6E38%u5BA2140","money":84},{"uid":1000141,"winall":1,"nickname":"%u6E38%u5BA2141","money":100},{"uid":1000142,"winall":-35,"nickname":"%u6E38%u5BA2142","money":100}]}};
        cc.log("----------------------------------");

        cc.log(JSON.stringify(MjClient.data.sData));

        var endallui = ccs.load("endAll_loudi.json");
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);
        // setWgtLayout(endallui.node,[0,1],[0,0],[0,0]);
        MjClient.endallui=this;


        // 这是娄底
        var _bgBox = endallui.node.getChildByName("bgBox");
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            _bgBox.setOpacity(255); 
            _bgBox.setBackGroundColorOpacity(255);
            _bgBox.removeBackGroundImage();
        }
        setWgtLayout(_bgBox,[1,1],[0.5,0.5],[0,0],true); 

        var _back = endallui.node.getChildByName("back");
        setWgtLayout(_back,[0.95,0.95],[0.5,0.5],[0,0]);
        // //这是娄底分享
        var _share =  _back.getChildByName("share");
        this._share = _share;
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        _share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;

        //_share.x = 713.24;//屏蔽再来一局的时候，坐标要移动一下   这是娄底
        _share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                    {
                        COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                            cc.log("====================capture_screen=======================");
                            postEvent("capture_screen");
                            if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                MjClient.endallui.capture_screen = true;
                            }
                            _share.setTouchEnabled(false);
                        });
                    });
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fanxiang",  {uid:SelfUid(),gameType:MjClient.gameType});
                    break;
                default :
                    break;
            }
        },this);


        //这是娄底   玩家的详细信息
        var infoBg = _back.getChildByName("infoBg");
        var infoBgSize = infoBg.getCustomSize();

        var info = infoBg.getChildByName("info");
        info.visible = false;
        var bgSize = info.getCustomSize();
        var sData = MjClient.data.sData;
        var players = sData.players;
        var playerCount = Object.keys(players).length;

        var startPos = cc.p( (infoBgSize.width - bgSize.width*playerCount) / (playerCount + 1) + bgSize.width / 2,infoBgSize.height/2);
        var clone = null;
        for(var i = 0 ; i < playerCount ; i++){
            clone = info.clone();
            clone.visible = true;
            clone.setPosition(startPos);
            infoBg.addChild(clone);
            SetGameOverLayer_loudi(clone,i);
            startPos = cc.p(startPos.x + bgSize.width + ((infoBgSize.width - bgSize.width*playerCount) / (playerCount + 1)) , startPos.y);

            COMMON_UI.addGameOverNotSameClubUI(clone,MjClient.getPlayerByIndex(i))
        }

        // // 如果是亲友圈的房间显示亲友圈图标及名称  这是娄底 
        var clubNode = _back.getChildByName("Image_club");
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubId && clubNode != null)
        { 
            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString("" + unescape(clubInfoTable.clubTitle));

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);

            cc.loader.loadImg(clubInfoTable.clubAvatar, {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubNode != null)
        {
            clubNode.setVisible(false);
        } 

        var sData=MjClient.data.sData;
        var tData=sData.tData;  

        //解散信息 说明
         var _infoMation =  _back.getChildByName("infoMation"); 
        if (_infoMation) { 
            _infoMation.setString("")
            _infoMation.visible = true;
            //描述结算  
            if (MjClient.isDismiss)
            {  

                var id = tData.firstDel;
                var pl = sData.players[id];
                var delStr = "";
                if(pl) {
                    var name  =  getNewName_new(unescape(pl.info.nickname),7);
                    delStr = name + pl.mjdesc[0]; 
                } else {
                    pl = getUIPlayer(0);
                    if (pl)
                        delStr = pl.mjdesc[0];
                }  
                _infoMation.setString("" + delStr) ;
                _infoMation.setFontName("Arial");
                _infoMation.setFontSize(_infoMation.getFontSize());
            }
        } 

        
        // var _infoMation_1 =  _back.getChildByName("infoMation");
        // _infoMation_1.visible = false;
        // var pl = MjClient.data.sData.players[tData.firstDel];

        // if(pl){
        //    var _nameStr = getNewName(unescape(pl.info.nickname ) + "");
        //    _infoMation_1.setString(_nameStr + "于" + MjClient.roundEndTime + "申请解散");
        //    _infoMation_1.setVisible(true);
        // }
 
        cc.log(JSON.stringify(MjClient.data.sData));
    
        // //close ,关闭  这是娄底
        var _close1 =  _back.getChildByName("close");
        this._close1 = _close1;
        _close1.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable && !(MjClient.rePlayVideo >= 0 && MjClient.replayui) ) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    } 
                    //MjClient.leaveGame();
                    //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                    //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");
                    if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                        MjClient.Scene.addChild(new EnterRoomLayer());

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }
                    if(MjClient.rePlayVideo >= 0 && MjClient.replayui){
                        MjClient.replayui.replayEnd();
                    }
                    break;
                default :
                    break;
            }
        },this);  

        //复制战绩
        addCopyBtnToGameOverLayer(endallui.node);
     
        return true;
    },
    onEnter:function()
    {
        this._super();
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true")
        {
            MjClient.homeui.gameRankLayer();
        }
    },

    replaySet : function(){
        this._close1.addTouchEventListener(function(sender,type){
            if (type == ccui.Widget.TOUCH_ENDED)
                MjClient.goOnReplay();
        }, this);
        
        // var btn = new ui.Button("ui/zhanji/huikanMj_n.png", "ui/zhanji/huikanMj_s.png", "ui/zhanji/huikanMj_s.png", ccui.Widget.LOCAL_TEXTURE);
        // btn.addClickEvent(function(){
        //     MjClient.goOnReplay();
        // }, this);
        // btn.x = this._share.x + 120;
        // btn.y = this._share.y;
        // // btn.scale = 1.2;
        // this._share.parent.addChild(btn);
        // this._share.x -= 120;

        // this._close1.addTouchEventListener(function(sender,Type){
        //     if(MjClient.endallui){
        //         MjClient.endallui.removeFromParent(true);
        //         MjClient.endallui = null;
        //     }

        //     if(MjClient.rePlayVideo >= 0 && MjClient.replayui){
        //         MjClient.replayui.replayEnd();
        //     }
        // },this); 
    }
});

/****
 ********/
//    大结算设置个人信息  
function SetGameOverLayer_ERenPaoHuZi(node,off,isNewUi){
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    cc.log("大结算 pl：" + JSON.stringify(pl));

    if(!pl){
        node.setVisible(false);
        return;
    }

    var MaxWinAll = 0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;
    //计算所有人数据
     //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }

    setDismissTypeImg(pl,node,0.5,0.19,"chang");

    var uibind={
        name:{
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _text:function(){
                if(!pl){
                    return "";
                }
                return getNewName_new(unescape(pl.info.nickname)+"",6);
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                if(!pl){
                    return "ID:";
                }
                return  "ID: " + pl.info.uid.toString();
            }
        },
    };

    var wxNode = node.getChildByName("head");
    addWxHeadToEndUI_SYZP(wxNode,off);
    BindUiAndLogic(node,uibind);

    // 玩家分数   
    var winNum = node.getChildByName("score_text");
    winNum.ignoreContentAdaptWithSize(true);
    var icon = node.getChildByName("icon");
    var scoreContnet = pl.winall;

    var textFileName = scoreContnet >= 0 ? "gameOver/addScore_zipai.png" : "gameOver/loseScore_zipai.png";
    var iconImg = scoreContnet >= 0 ? "gameOver/add_zipai.png" : "gameOver/sub_zipai.png";
    icon.loadTexture(iconImg);
    winNum.setProperty(scoreContnet + "", textFileName, 33, 46, "0");

    var bigWinner = node.getChildByName("bigWinner");
    if(MaxWinAll == pl.winall && MaxWinAll != 0) {
        bigWinner.visible = true;
    }else {
        bigWinner.visible = false;
    }

    AddFangKaIcon(sData, node, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(-115, 385));

    //分数位置移动
    var moveSize = winNum.getCustomSize().width / 2;
    winNum.x -= moveSize;
    icon.x -= moveSize;

    var textNode = node.getChildByName("textNode");
    // 玩家数据信息
    var showRoomStatistics = function(node,showList,data){
        // 胡牌 自摸 点炮 提 跑次数统计
        for (var i = 0; i < showList.length; i++) {
            var name = showList[i];
            var text = node.getChildByName(name);
            if(text){
                text.setString("" + data[i]);
            }
        }
    };

    showRoomStatistics(textNode,["huNum","ziMoNum","dianpaoNum","tiPaiNum","paoPaiNum"],pl.roomStatistics);
}


/*
 字牌大结算 
 */
var GameOverLayer_HYERenPaoHuZi = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:{
            close :{
            },
            share :{
                img_shine:{
                    _visible:false
                },
                img_txt:{
                    _visible:false
                },
                img_point:{
                    _visible:false
                },
                _event:{
                    captureScreen_OK:function(){
                        if (MjClient.endallui.capture_screen != true)
                            return;
                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            },
            dir_roomname:
                {
                    _visible:true,
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function () {
                        var sData=MjClient.data.sData;
                        var tData=sData.tData;

                        var str = GameCnName[MjClient.gameType];
                        var text = str;
                        return text;
                    }
                },
            dir_roomnum:
                {
                    _visible:true,
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function () {
                        var sData=MjClient.data.sData;
                        var tData=sData.tData;

                        var str ="";
                        var text = str;
                        text += (tData.areaSelectMode.huxiType == 0) ? "21胡息" : "卡20张" ;
                        text += ",";
                        text += ("房间号:" + tData.tableid);
                        return text;
                    }
                },
            time:
                {
                    _visible:true,
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function () {
                        var str = MjClient.roundEndTime;
                        return str;
                    }
                }
        }

    },
    ctor:function () {
        this._super();
        //test
        // MjClient.data.sData = {"players":{"1000140":{"mjhand":[10,8,1,26,6,3,2,28,27,4,30,29,9],"mjdesc":[" ÓÚ2018-04-19 22:27:40ÉêÇë½âÉ¢"],"winone":0,"winall":34,"winType":0,"baseWin":0,"mjwei":[],"mjsort":[],"handSort":[],"be":[2],"hzdesc":{},"zimoTotal":0,"dianpaoTotal":0,"minggangTotal":0,"angangTotal":0,"mjpeng":[],"mjgang0":[],"mjflower":[],"info":{"uid":1000140,"appid":"yueyang","unionid":"unionid-1000140","sex":2,"nickname":"%u6E38%u5BA2140","headimgurl":"http://cdn.jtcfgame.com/images/8.jpg","district":"¹ã¶«Ê¡ÉîÛÚÊÐ","mobileNum":null,"registerIp":"233.69.220.83","lastLoginTime":1524144707673,"lastShareDay":0,"createRoomNum":10,"createTime":1522130860424,"money":84,"integral":0,"limitMoney":0,"myMemberId":null,"memberId":null,"bindHistory":0,"sid":28,"fid":"pkcon001","remoteIP":"172.17.100.42","lockMoney":4,"did":"pkplayer000","lastGameTime":1524148005207},"tableMsg":[6,-4,40,-8,0],"longCard":[]},"1000141":{"mjhand":[25,29,28,7,30,4,2,21,23,10,25,3,91,24],"mjdesc":["Í¬Òâ½âÉ¢"],"winone":0,"winall":1,"winType":0,"baseWin":0,"mjwei":[],"mjsort":[],"handSort":[],"be":[10],"hzdesc":{},"zimoTotal":0,"dianpaoTotal":0,"minggangTotal":0,"angangTotal":0,"mjpeng":[],"mjgang0":[],"mjflower":[],"info":{"uid":1000141,"appid":"yueyang","unionid":"unionid-1000141","sex":2,"nickname":"%u6E38%u5BA2141","headimgurl":"http://cdn.jtcfgame.com/images/0.jpg","district":"¹ã¶«Ê¡ÉîÛÚÊÐ","mobileNum":null,"registerIp":"51.72.78.192","lastLoginTime":1524140486058,"lastShareDay":0,"createRoomNum":10,"createTime":1522130860424,"money":100,"integral":0,"limitMoney":0,"myMemberId":null,"memberId":null,"bindHistory":0,"sid":28,"fid":"pkcon000","remoteIP":"172.17.100.42","lockMoney":0,"did":"pkplayer001","lastGameTime":1524148005208},"tableMsg":[-3,8,-20,16,0],"longCard":[]},"1000142":{"mjhand":[3,27,1,7,27,91,29,8,22,23,26,28,21],"mjdesc":["Í¬Òâ½âÉ¢"],"winone":0,"winall":-35,"winType":0,"baseWin":0,"mjwei":[],"mjsort":[],"handSort":[],"hzdesc":{},"zimoTotal":0,"dianpaoTotal":0,"minggangTotal":0,"angangTotal":0,"mjpeng":[],"mjgang0":[],"mjflower":[],"info":{"uid":1000142,"appid":"yueyang","unionid":"unionid-1000142","sex":2,"nickname":"%u6E38%u5BA2142","headimgurl":"http://cdn.jtcfgame.com/images/6.jpg","district":"¹ã¶«Ê¡ÉîÛÚÊÐ","mobileNum":null,"registerIp":"221.17.206.152","lastLoginTime":1524140487757,"lastShareDay":0,"createRoomNum":10,"createTime":1522130860424,"money":100,"integral":0,"limitMoney":0,"myMemberId":null,"memberId":null,"bindHistory":0,"sid":30,"fid":"pkcon001","remoteIP":"172.17.100.42","lockMoney":0,"did":"pkplayer000","lastGameTime":1524148005208},"tableMsg":[-3,-4,-20,-8,0],"longCard":[]}},"tData":{"initCoin":0,"gameType":2018092,"roundAll":16,"roundNum":-2,"isValidTable":true,"fanNum":0,"maxPlayer":3,"uids":[1000140,1000141,1000142],"owner":1000140,"maxHunNum":4,"tableid":"493386","cardNext":40,"winner":-1,"zhuang":1,"curPlayer":1,"lastPutPlayer":1,"putType":1,"lastDrawPlayer":1,"tState":6,"lastPutCard":24,"genpaiCount":0,"isHunCardPlay":false,"canHu7":false,"delEnd":0,"delEndHePai":0,"firstDel":1000140,"canEatHu":true,"huangNum":14,"lastGangType":0,"lastGangDianpaoPlayer":-1,"xingPlayer":-1,"datuoNum":0,"mingCard":0,"areaSelectMode":{"maxPlayer":3,"payWay":0},"gameCnName":"ãèÂÞºì×Ö","hunCard":-1,"currCard":-1,"drawType":0,"isLastDraw":true,"isFirstPut":false,"hasPay":true,"hePai":false,"roundNumPre":12},"cards":[25,29,28,7,30,4,2,21,23,10,25,3,91,3,27,1,7,27,91,29,8,22,23,26,28,21,10,8,1,26,6,3,2,28,27,4,30,29,9,24,22,23,8,10,26,2,27,91,30,3,1,22,25,6,5,10,22,21,7,29,5,30,9,7,24,91,25,2,9,6,5,21,8,5,4,24,28,9,26,23,6,1,24,4],"hunCard":-1,"roundEndTime":"2018-04-19 22:26:45","isDismiss":true,"playInfo":{"gametype":2018092,"owner":1000140,"money":4,"now":"2018-04-19 22:26:45","tableid":"493386","players":[{"uid":1000140,"winall":34,"nickname":"%u6E38%u5BA2140","money":84},{"uid":1000141,"winall":1,"nickname":"%u6E38%u5BA2141","money":100},{"uid":1000142,"winall":-35,"nickname":"%u6E38%u5BA2142","money":100}]}};
        cc.log("----------------------------------");

        cc.log(JSON.stringify(MjClient.data.sData));

        var endallui = ccs.load("endAll_erenpaohuzi.json");
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);
        // setWgtLayout(endallui.node,[0,1],[0,0],[0,0]);
        MjClient.endallui=this;

        var _bgBox = endallui.node.getChildByName("bgBox");
        setWgtLayout(_bgBox,[1,1],[0.5,0.5],[0,0],true);

        var _back = endallui.node.getChildByName("back");
        setWgtLayout(_back,[0.95,0.95],[0.5,0.5],[0,0]);
        // //这是分享
        var _share =  _back.getChildByName("share");
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        _share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;

        //_share.x = 713.24;//屏蔽再来一局的时候，坐标要移动一下   
        _share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                    {
                        COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                            cc.log("====================capture_screen=======================");
                            postEvent("capture_screen");
                            if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                MjClient.endallui.capture_screen = true;
                            }
                            _share.setTouchEnabled(false);
                        });
                    });
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fanxiang",  {uid:SelfUid(),gameType:MjClient.gameType});
                    break;
                default :
                    break;
            }
        },this);


        //   玩家的详细信息
        var infoBg = _back.getChildByName("infoBg");
        var infoBgSize = infoBg.getCustomSize();

        var info = infoBg.getChildByName("info");
        info.visible = false;
        var bgSize = info.getCustomSize();
        var sData = MjClient.data.sData;
        var players = sData.players;
        var playerCount = Object.keys(players).length;

        var startPos = cc.p( (infoBgSize.width - bgSize.width*playerCount) / (playerCount + 1) + bgSize.width / 2,infoBgSize.height/2);
        var clone = null;
        for(var i = 0 ; i < playerCount ; i++){
            clone = info.clone();
            clone.visible = true;
            clone.setPosition(startPos);
            infoBg.addChild(clone);
            SetGameOverLayer_ERenPaoHuZi(clone,i);
            startPos = cc.p(startPos.x + bgSize.width + ((infoBgSize.width - bgSize.width*playerCount) / (playerCount + 1)) , startPos.y);

            COMMON_UI.addGameOverNotSameClubUI(clone,MjClient.getPlayerByIndex(i))
        }

        // // 如果是亲友圈的房间显示亲友圈图标及名称  
        var clubNode = _back.getChildByName("Image_club");
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubId && clubNode != null)
        {
            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString("" + unescape(clubInfoTable.clubTitle));

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);

            cc.loader.loadImg(clubInfoTable.clubAvatar, {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubNode != null)
        {
            clubNode.setVisible(false);
        }

        var sData=MjClient.data.sData;
        var tData=sData.tData;

        var jieSanIcon = _back.getChildByName("jieSanIcon");  
        jieSanIcon.setVisible(MjClient.isDismiss);

        //解散信息 说明
        var _infoMation =  _back.getChildByName("infoMation"); 
        _infoMation.visible = false;
        if (_infoMation) { 
            _infoMation.setString("")
            _infoMation.visible = true;
            //描述结算  
            if (MjClient.isDismiss)
            {  

                var id = tData.firstDel;
                var pl = sData.players[id];
                var delStr = "";
                if(pl) {
                    var name  =  unescape(pl.info.nickname);
                    delStr = name + pl.mjdesc[0]; 
                } else {
                    pl = getUIPlayer(0);
                    if (pl)
                        delStr = pl.mjdesc[0];
                }  
                _infoMation.setString("" + delStr) ;
                _infoMation.setFontName("Arial");
                _infoMation.setFontSize(_infoMation.getFontSize());
            }
        } 
 

        // //close ,关闭  
        var _close1 =  _back.getChildByName("close");
        _close1.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    }
                    //MjClient.leaveGame();
                    //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                    //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");
                    if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                        MjClient.Scene.addChild(new EnterRoomLayer());

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }
                    if(MjClient.rePlayVideo >= 0 && MjClient.replayui){
                        MjClient.replayui.replayEnd();
                    }
                    break;
                default :
                    break;
            }
        },this);

        return true;
    },
    onEnter:function()
    {
        this._super();
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true")
        {
            MjClient.homeui.gameRankLayer();
        }
    }
});