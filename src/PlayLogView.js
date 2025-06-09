/**
 * Created by Administrator on 2017/5/18/018.
 */

var playLogIfoArry = [];
var playLogInfoItem = {};
(function(){

    var playLogView,uiItem,uiList,msgCount,delay,update_tData;

    function sortLog(log)
    {
        var players = log.players;
        players.sort(function(p1, p2){
            return p2.winall - p1.winall;
        })
    }

    function BindLogItem(ui,item,num)
    {

        var bind={
            time:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){  return item.now }
            },
            tableid:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){  return "房间ID:"+item.tableid }
            },
            player0:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    addPlayersInfo(this, item.players[0], "winall", item.gametype);
                },
            },
            player1:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    addPlayersInfo(this, item.players[1], "winall", item.gametype);
                },
            },
            player2:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length > 2)
                        addPlayersInfo(this, item.players[2], "winall", item.gametype);
                    else
                        this.visible = false;
                },
            },
            player3:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length > 3)
                        addPlayersInfo(this, item.players[3], "winall", item.gametype);
                    else
                        this.visible = false;
                },
            },
            player4:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length > 4)
                        addPlayersInfo(this, item.players[4], "winall");
                    else
                        this.visible = false;
                },
            },
            player5:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length > 5)
                        addPlayersInfo(this, item.players[5], "winall");
                    else
                        this.visible = false;
                },
            },
            line2:{
                _run:function(){
                    if(item.players.length <= 2) this.visible = false;
                },
            },
            line3:{
                _run:function(){
                    if(item.players.length <= 3) this.visible = false;
                },
            },
            line_shu3:{
                _run:function(){
                    if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
                        return;
                    if(item.players.length <= 2) this.visible = false;
                },
            },
            copyBtn: {
                _click: function() {
                    copyPlayLogResult(item);
                }
            },
            huifang: {
                _run:function(){
                    this.visible = item.playbackUrl ? true : false;
                },
            },
            num:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){return num+"";}
            },_click:function()
            {
                var playUrl = item.playbackUrl;
                if(!playUrl){
                    return;
                }
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji_Chakanzhanji", {uid:SelfUid()});
                //MjClient.getPlayLogOne(item.now,item.logid);
                MjClient.getPlayLogOne(item);
                playLogInfoItem =item;
            }
        }

        /*
            添加麻将名称
         */
        var gameTypeNode = ui.getChildByName("gameType");
        var gameTypeID = item.gametype;
        var text = GameCnName[gameTypeID];
        if((MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && 
            item.gametype == MjClient.GAME_TYPE.HY_LIU_HU_QIANG)
        {
            text = "六胡抢";

        }else if((MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) &&
                    item.gametype == MjClient.GAME_TYPE.HY_SHI_HU_KA)
        {
            text = "十胡卡";
        }
        gameTypeNode.setString(text || gameTypeID);
        gameTypeNode.ignoreContentAdaptWithSize(true);

        BindUiAndLogic(ui,bind);

        if (item.roundNum && item.roundNum < 40 && item.roundBeen) {
            var tableidLabel = bind.tableid._node;
            var roundLabel = tableidLabel.clone();
            roundLabel.setString(item.roundBeen + "/" + item.roundNum + "局");
            roundLabel.setPosition(tableidLabel.x + tableidLabel.width + 50, tableidLabel.y);
            if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
                roundLabel.x += 25;
            ui.addChild(roundLabel);
        }
    }

    function BindLogItem_nanjing(ui,item,num)
    {

        cc.log("=====================item msg = " + JSON.stringify(item));

        var isJinYuanZi = false;//是否进园子
        var offScore = 0;
        if(item.playType == 0)//进园子
        {
            offScore = -100;
            isJinYuanZi = true;
        }

        var bind={
            time:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){  return item.now }
            },
            tableid:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){  return "房间ID:"+item.tableid }
            },
            player0:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                },
                _text:function(){
                    var str = getNewName(unescape(item.players[0].nickname),6)+":"+ (item.players[0].winall + offScore);
                    if (isJinYuanZi)
                    {
                        str += " (菜:" + item.players[0].caibao + ",肉:" + item.players[0].roubao +")";
                    }
                    return str;
                }
            },
            player1:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                },
                _text:function(){
                    var str = getNewName(unescape(item.players[1].nickname),6)+":"+ (item.players[1].winall + offScore);
                    if (isJinYuanZi)
                    {
                        str += " (菜:" + item.players[1].caibao + ",肉:" + item.players[1].roubao +")";
                    }
                    return str;
                }
            },
            player2:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                },
                _text:function(){
                    if(!item.players[2]){
                        this.visible = false
                        return "";
                    };
                    var str = getNewName(unescape(item.players[2].nickname),6)+":"+ (item.players[2].winall + offScore);
                    if (isJinYuanZi)
                    {
                        str += " (菜:" + item.players[2].caibao + ",肉:" + item.players[2].roubao +")";
                    }
                    return str;
                }
            },
            player3:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                },
                _text:function(){
                    if(!item.players[3]){
                        this.visible = false
                        return "";
                    };
                    var str = getNewName(unescape(item.players[3].nickname),6)+":"+ (item.players[3].winall + offScore);
                    if (isJinYuanZi)
                    {
                        str += " (菜:" + item.players[3].caibao + ",肉:" + item.players[3].roubao +")";
                    }
                    return str;
                }
            },
            copyBtn: {
                _click: function() {
                    copyPlayLogResult(item);
                }
            },
            huifang: {
                _run:function(){
                    this.visible = item.playbackUrl ? true : false;
                },
            }
            ,num:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){return num+"";}
            },_click:function()
            {
                var playUrl = item.playbackUrl;
                if(!playUrl){
                    return;
                }
                //MjClient.getPlayLogOne(item.now,item.logid);
                MjClient.getPlayLogOne(item);
                playLogInfoItem =item;
            }
        }

        /*
         添加麻将名称
         */
        var gameTypeNode = ui.getChildByName("gameType");
        var gameTypeID = item.gametype;
        var text = GameCnName[gameTypeID];
        gameTypeNode.setString(text);
        gameTypeNode.ignoreContentAdaptWithSize(true);


        BindUiAndLogic(ui,bind);
}
    function BindLogItem_daTongZi(ui, item, num){
        var bind={
            time:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){  return item.now }
            },
            tableid:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){  return "房间ID:"+item.tableid }
            },
            player0:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                },
                _text:function(){
                    if(item.players.length == 4){
                        return getNewName(unescape(item.players[0].nickname),5) + "(" + item.players[0].uid + ")";
                    }else{
                        return addPlayersInfo(this, item.players[0], "winall");
                    }
                }
            },
            player1:{
                _run:function(){
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length == 4){
                        this.x = 714.14;
                    }else{
                        this.x = 671.14;
                    }
                },
                _text:function(){  
                    if(item.players.length == 4){
                        return getNewName(unescape(item.players[1].nickname),5) + "(" + item.players[1].uid + ")";
                    }else{
                        return addPlayersInfo(this, item.players[1], "winall");
                    }
                }
            },
            player2:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                },
                _text:function(){
                    if(item.players.length > 2)
                        if(item.players.length == 4){
                            return getNewName(unescape(item.players[2].nickname),5) + "(" + item.players[2].uid + ")";
                        }else{
                            return addPlayersInfo(this, item.players[2], "winall");
                        }
                    else
                        return unescape("");
                }
            },
            player3:{
                _run:function(){
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length == 4){
                        this.x = 714.14;
                    }else{
                        this.x = 671.14;
                    }
                },
                _text:function(){
                    if(item.players.length > 3)
                        if(item.players.length == 4){
                            return getNewName(unescape(item.players[3].nickname),5) + "(" + item.players[3].uid + ")";
                        }else{
                            return addPlayersInfo(this, item.players[3], "winall");
                        }
                    else
                        return unescape("");
                }
            }
            ,num:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){return num+"";}
            },
            _click:function()
            {
                //MjClient.getPlayLogOne(item.now,item.logid);
                MjClient.getPlayLogOne(item);
                playLogInfoItem =item;
            },
            teamA:{
                _run : function(){
                    this.visible = false;
                }
            },
            teamB:{
                _run : function(){
                    this.visible = false;
                }
            },
            endScore:{
                _run : function(){
                    this.setString("0");
                    for(var i = 0; i < item.players.length; i++){
                        var pl = item.players[i];
                        if(pl.uid == MjClient.data.pinfo.uid){
                            if(pl.windif) this.setString(pl.windif); //回放报错加判断，by sking
                        }
                    }
                }
            }
        }

        /*
            添加麻将名称
         */
        var gameTypeNode = ui.getChildByName("gameType");
        var gameTypeID = item.gametype;
        var text = GameCnName[gameTypeID];
        if((MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) && 
            item.gametype == MjClient.GAME_TYPE.HY_LIU_HU_QIANG)
        {
            text = "六胡抢";

        }else if((MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) && 
                    item.gametype == MjClient.GAME_TYPE.HY_SHI_HU_KA)
        {
            text = "十胡卡";
        }
        gameTypeNode.setString(text || gameTypeID);
        gameTypeNode.ignoreContentAdaptWithSize(true);

        BindUiAndLogic(ui,bind);

        var endScore = ui.getChildByName("endScore")
        if(item.gametype == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG){
            
            if(item.players.length == 4){
                var uiPl0 = ui.getChildByName("player0");
                var uiPl1 = ui.getChildByName("player1");
                var uiPl2 = ui.getChildByName("player2");
                var uiPl3 = ui.getChildByName("player3");
                uiPl0.setString("");
                uiPl1.setString("");
                uiPl2.setString("");
                uiPl3.setString("");
                var teamA = ui.getChildByName("teamA");
                var teamB = ui.getChildByName("teamB");
                var teamAUi = [uiPl0, uiPl2];
                var teamBUi = [uiPl1, uiPl3];
                var aIndex = 0;
                var bIndex = 0;

                teamA.visible = true;
                teamB.visible = true;

                for(var i = 0; i < item.players.length; i++){
                    var pl = item.players[i];
                    if(pl.teamid == "A"){
                        teamA.getChildByName("winAll").setString(pl.t_score_total);
                        if(pl.uid == MjClient.data.pinfo.uid){
                            endScore.setString(pl.t_windif);
                        }
                        var uiP = teamAUi[aIndex];
                        uiP.setString(getNewName(unescape(pl.nickname),5));
                        uiP.setFontName("Arial");
                        uiP.setFontSize(25);
                        aIndex += 1;
                    }else if(pl.teamid == "B"){
                        teamB.getChildByName("winAll").setString(pl.t_score_total);
                        if(pl.uid == MjClient.data.pinfo.uid){
                            endScore.setString(pl.t_windif);
                        }
                        cc.log(bIndex + "=======bIndex=========");
                        var uiP = teamBUi[bIndex];
                        uiP.setString(getNewName(unescape(pl.nickname),5));
                        uiP.setFontName("Arial");
                        uiP.setFontSize(25);
                        bIndex += 1;
                    }
                }
            }
        }else{
            endScore.setString("0");
            for(var i = 0; i < item.players.length; i++){
                var pl = item.players[i];
                if(pl.uid == MjClient.data.pinfo.uid){
                    if(pl.windif){
                        endScore.setString(pl.windif);
                    }else{
                        endScore.setString(pl.winall);
                    }
                    
                }
            }
        }
    }

    var playTimeInDex = 0;
    
    var _Text_record = null;
    PlayLogView=cc.Layer.extend({
        _gameType:1,
        _gameTypeArr:[1],
        _block0:null,
        _back0:null,
        jsBind:{
            block:
            {
                _layout:[[1,1],[0.5,0.5],[0,0],2],
            },
            item:{
                //_layout:[ [0.7,0],[0.5,0.5],[0,0]],
                _visible:false
                ,_run:function()
                {
                    uiItem=this;
                    uiItem.visible=false;
                }
            },
            back:{
                _layout:[[0.95,0.95],[0.5,0.5],[0,-0.02],false],
                yes: {
                    // _layout:[[0,0.1],[0,1],[1,-0.6]]
                    _click:function()
                    {
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji_Close", {uid:SelfUid()});
                        playLogView.removeFromParent(true);
                        delete MjClient.data.sData;
                    }
                },
                play:{
                    // _layout:[[0,0.06],[0.5,1],[0,-0.8]]

                },

                list:{
                    _run:function(){uiList=this;}
                },
                btnPlayback:{
                    _click:function () {
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji_Chakantarenhuifang", {uid:SelfUid()});
                        MjClient.Scene.addChild(new playbackLayer());
                                              
                    },
                },
                textGameType:{
                    _run:function () {
                        this.setString("当前玩法：全部")
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _event:{
                        playLogViewChangeGameType:function () {
                            if(playLogView._gameType == 1){
                                this.setString("当前玩法：全部")
                            }else {
                                this.setString("当前玩法："+GameCnName[playLogView._gameType]);
                            }
                        }
                    }
                },
                btnOtherFunc:{
                    _click:function () {
                        var key = "Zhujiemian_Zhanji_Xuanzewanfa";
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) 
                        {
                            key = "Zhujiemian_Shezhi_Chakanhuifang";
                        }
                        MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid()});
                        playLogView._block0.setVisible(true);
                        playLogView._back0.setVisible(true);
                    },
                },
                _event:
                {
                    playLog:function()
                    {
                        var log=MjClient.data.playLog;
                        console.log("----- log  sking ---- " + JSON.stringify(log));

                        uiList.removeAllItems();
                        var num=log.logs.length;
                        if( MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP &&
                            MjClient.getAppType() != MjClient.APP_TYPE.QXLYQP &&
                            MjClient.getAppType() != MjClient.APP_TYPE.QXXXGHZ)
                        {
                            playLogView._gameTypeArr = [1];
                            for(var j = 0; j< num; j++){
                                if(playLogView._gameTypeArr.indexOf(log.logs[j].gametype) == -1){
                                    playLogView._gameTypeArr.push(log.logs[j].gametype);
                                }
                            }
                            if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || 
                                MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ) {
                                playLogView.wanFaItem.setScale(0.85);                        
                            }
                            else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                                if (!MjClient.isUseUIv3 || !MjClient.isUseUIv3()) {
                                    playLogView.wanFaItem.setScale(0.8);
                                }
                            }
                            cc.log("wxd----- log  wxd ----"+JSON.stringify(playLogView._gameTypeArr));
                            
                            for(var k = 0; k< playLogView._gameTypeArr.length; k++){
                                if(k == 0){
                                    playLogView.wanFaItem.addTouchEventListener(function (sender, type) {
                                        if (type == ccui.Widget.TOUCH_ENDED) {
                                            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji_Xuanzewanfa_Chose", {uid:SelfUid()});
                                            playLogView._gameType = 1;
                                            playLogView._block0.setVisible(false);
                                            playLogView._back0.setVisible(false);
                                            postEvent("playLogViewChangeGameType", {});
                                        }
                                    }, this)
                                }else {
                                    var wanFaBtn = playLogView.wanFaItem.clone();
                                    wanFaBtn.gameType = playLogView._gameTypeArr[k];
                                    playLogView._back0.addChild(wanFaBtn);

                                    if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
                                        wanFaBtn.getChildByName("normalText").setString(GameCnName[wanFaBtn.gameType]);
                                    }
                                    else {
                                        var path_str = GameButton[playLogView._gameTypeArr[k]];
                                        // 玩法按钮路径
                                        if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ && path_str.indexOf("createNewPng/") >= 0)
                                        {
                                            var fullFilePath = path_str.replace("createNewPng/", "createNewPng/wanfaBtn/");
                                            if (jsb.fileUtils.isFileExist(fullFilePath + "_n.png") && jsb.fileUtils.isFileExist(fullFilePath + "_s.png"))
                                            {
                                                path_str = fullFilePath;
                                            }
                                        }

                                        wanFaBtn.loadTextureNormal(path_str+"_n.png");
                                    }

                                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || 
                                        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                                        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ) {
                                        wanFaBtn.x = playLogView.wanFaItem.x + (k%4)*180;
                                        wanFaBtn.y = playLogView.wanFaItem.y - Math.floor(k/4)*72;
                                        playLogView.wanFaItem.setScale(0.85);
                                        wanFaBtn.setScale(0.85);
                                    }else if(isJinZhongAPPType()) {
                                        wanFaBtn.x = playLogView.wanFaItem.x + (k%4)*160;
                                        wanFaBtn.y = playLogView.wanFaItem.y - Math.floor(k/4)*65;
                                        //playLogView.wanFaItem.setScale(0.70);
                                        wanFaBtn.setScale(0.75);
                                    }
                                    else if (MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
                                        if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
                                            wanFaBtn.x = playLogView.wanFaItem.x + (k%4)*164;
                                            wanFaBtn.y = playLogView.wanFaItem.y - Math.floor(k/4)*70;
                                        }
                                        else {
                                            wanFaBtn.x = playLogView.wanFaItem.x + (k%4)*185;
                                            wanFaBtn.y = playLogView.wanFaItem.y - Math.floor(k/4)*75;
                                            playLogView.wanFaItem.setScale(0.8);
                                            wanFaBtn.setScale(0.8);
                                            wanFaBtn.loadTexturePressed(path_str+"_s.png");
                                        }
                                    }
                                    else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                                        wanFaBtn.x = playLogView.wanFaItem.x + (k%4)*200;
                                        wanFaBtn.y = playLogView.wanFaItem.y - Math.floor(k/4)*75;
                                        playLogView.wanFaItem.setScale(0.8);
                                        wanFaBtn.setScale(0.8);
                                        wanFaBtn.loadTexturePressed(path_str+"_s.png");
                                    }
                                    else if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
                                        wanFaBtn.loadTextureNormal(path_str+"_s.png");
                                        wanFaBtn.x = playLogView.wanFaItem.x + (k%3)*185;
                                        wanFaBtn.y = playLogView.wanFaItem.y - Math.floor(k/3)*75;
                                        playLogView.wanFaItem.setScale(0.8);
                                        wanFaBtn.setScale(0.8);
                                    }
                                    else {
                                        wanFaBtn.x = playLogView.wanFaItem.x + (k%4)*145.27;
                                        wanFaBtn.y = playLogView.wanFaItem.y - Math.floor(k/4)*68;
                                        wanFaBtn.setScale(0.73);
                                    }
    
                                    wanFaBtn.addTouchEventListener(function (sender, type) {
                                        if (type == ccui.Widget.TOUCH_ENDED) {
                                            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji_Xuanzewanfa_Chose", {uid:SelfUid()});
                                            playLogView._gameType = sender.gameType;
                                            playLogView._block0.setVisible(false);
                                            playLogView._back0.setVisible(false);
                                            postEvent("playLogViewChangeGameType", {});
                                        }
                                    }, this)
                                }
                            }
                        }

                        if (log.logs.length == 0)
                        {
                        	if (playLogView.nullTip_image) {
				            	playLogView.nullTip_image.visible = true; 
                            }
                            if (playLogView.nullTip_text) {
								playLogView.nullTip_text.visible = true;
                            }
                        }
                        else
                        {
                            for(var i=0;i<log.logs.length;i++)
                            {
                                sortLog(log.logs[i]);
                                var item=uiItem.clone();
                                item.visible=true;
                                item.scale=uiList.width/item.width;
                                uiList.insertCustomItem(item,0);
                                if(log.logs[i].gametype == MjClient.GAME_TYPE.NAN_JING)　
                                {
                                    BindLogItem_nanjing(item,log.logs[i],num-i);
                                }else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                                    BindLogItem_daTongZi(item,log.logs[i],num-i);
                                }
                                else
                                {
                                    BindLogItem(item,log.logs[i],num-i);
                                }
                            }
                        }
    
                        
                        //计算今天总得分情况，add by sking
                        if(_Text_record)
                        {
                            // cc.log("-------_Text_record_Text_record_Text_record_Text_record = ");
                            // var _timeStr = MjClient.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
                            // var _NowMonth =  _timeStr.substring(5,7);
                            // var _NowDay =  _timeStr.substring(8,10);
                            // var _currentSumScores = 0;
                            // for(var i=0;i<log.logs.length;i++)
                            // {
                            //     var  _recordDay = log.logs[i].now.substring(8,10);
                            //     var _recordMonth  = log.logs[i].now.substring(5,7);
                            //     if(_recordMonth >= _NowMonth && _recordDay >= _NowDay)
                            //     {
                            //         for(var j = 0;j < log.logs[i].players.length;j++)
                            //         {
                            //             if(log.logs[i].players[j].uid  == SelfUid())
                            //             {
                            //                 _currentSumScores += log.logs[i].players[j].winall;
                            //             }
                            //         }
                            //     }
                            // }
                            // _Text_record.setString("今日总得分:" + _currentSumScores);
                            cc.log("战绩占 = ==  " +  log.todayScore);
                            _Text_record.setString("今日总得分:" + log.todayScore);
                        }
                        //end of 今日总得分
                    },
                    playLogViewChangeGameType:function () {
                        var log=MjClient.data.playLog;
                        console.log("----- log  sking 222222 ---- " + JSON.stringify(log));

                        uiList.removeAllItems();
                        var num=log.logs.length;

                        var logsT = [];
                        if(playLogView._gameType == 1){
                            logsT = log.logs;
                        }else {
                            for(var j = 0; j< num; j++){
                                cc.log("wxd............gameType:"+playLogView._gameType+".......:"+log.logs[j].gametype);
                                if(playLogView._gameType == log.logs[j].gametype){
                                    logsT.push(log.logs[j]);
                                }
                            }
                        }

                        if (logsT.length == 0)
                        {
                            if (playLogView.nullTip_image) {
                                playLogView.nullTip_image.visible = true;
                            }
                            if (playLogView.nullTip_text) {
                                playLogView.nullTip_text.visible = true;
                            }
                        }
                        else
                        {
                            for(var i=0;i<logsT.length;i++)
                            {
                                var item=uiItem.clone();
                                item.visible=true;
                                item.scale=uiList.width/item.width;
                                uiList.insertCustomItem(item,0);
                                if(logsT[i].gametype == MjClient.GAME_TYPE.NAN_JING)
                                {
                                    BindLogItem_nanjing(item,logsT[i],logsT.length-i);
                                }
                                else
                                {
                                    BindLogItem(item,logsT[i],logsT.length-i);
                                }
                            }
                        }


                        //计算今天总得分情况，add by sking
                        // if(_Text_record) {
                        //     // cc.log("-------_Text_record_Text_record_Text_record_Text_record = ");
                        //     // var _timeStr = MjClient.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
                        //     // var _NowMonth =  _timeStr.substring(5,7);
                        //     // var _NowDay =  _timeStr.substring(8,10);
                        //     // var _currentSumScores = 0;
                        //     // for(var i=0;i<logsT.length;i++)
                        //     // {
                        //     //     var  _recordDay = logsT[i].now.substring(8,10);
                        //     //     var _recordMonth  = logsT[i].now.substring(5,7);
                        //     //     if(_recordMonth >= _NowMonth && _recordDay >= _NowDay)
                        //     //     {
                        //     //         for(var j = 0;j < logsT[i].players.length;j++)
                        //     //         {
                        //     //             if(logsT[i].players[j].uid  == SelfUid())
                        //     //             {
                        //     //                 _currentSumScores += logsT[i].players[j].winall;
                        //     //             }
                        //     //         }
                        //     //     }
                        //     // }
                        //     // _Text_record.setString("今日总得分:" + _currentSumScores);
                        //     cc.log("战绩占 = ==  " + log.todayScore);
                        //     _Text_record.setString("今日总得分:" + log.todayScore);
                        // }
                    }
                }
            }
        },
        ctor:function () {
            //return;
            this._super();
            if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
                var web = ccs.load("PlayLog_3.0.json");
            else
                var web = ccs.load("PlayLog.json");
            var that = this;
            BindUiAndLogic(web.node, this.jsBind);
            MjClient.getPlayLog();//每次获取新数据
            playTimeInDex = 0;
            var _textFeildName1 = null;
            var _textRoomNum = null;

            var _back = web.node.getChildByName("back");
            if (MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
                setWgtLayout(_back, [0.95, 0.95], [0.5, 0.5], [0, 0]);
            }
            else if(isJinZhongAPPType() ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ)
            {
                setWgtLayout(_back, [1, 1], [0.5, 0.52], [0, 0]);
            }
            else if (MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
                if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
                    setWgtLayout(_back, [_back.width/1280, _back.height/720], [0.5, 0.5], [0, 0]);
                else
                    setWgtLayout(_back, [0.9, 0.9], [0.5, 0.45], [0, 0]);
            }
            else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                setWgtLayout(_back, [0.9, 0.9], [0.5, 0.4836], [0, 0]);
            }

            var _suizi = _back.getChildByName("suizi");
            //穗子动画
            if(_suizi) 
                COMMON_UI.suiziAni(_suizi,8);
            else
                COMMON_UI.popDialogAni(_back);

            var _testBtn = _back.getChildByName("testBtn");
            _testBtn.visible = false;

            var _tishi = _back.getChildByName("tishi");
            if (_tishi) {
                _tishi.ignoreContentAdaptWithSize(true);
                _tishi.setString("战绩录像保留5天");
            }
            

            //今日总得分显示
            _Text_record = _back.getChildByName("Text_record");
            if(_Text_record)
            {
                _Text_record.ignoreContentAdaptWithSize(true);
                _Text_record.setString("今日战绩:0");
                _Text_record.visible = true;
            }


            
			
			this.nullTip_image = _back.getChildByName("nullTip_image");
			this.nullTip_text = _back.getChildByName("nullTip_text");
			if (this.nullTip_image) {
                if(MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() === MjClient.APP_TYPE.QXHHZP){
                    this.nullTip_image.setTexture("game_picture/beidou.png");
                }
            	this.nullTip_image.visible = false; 
            }
            if (this.nullTip_text) {
				this.nullTip_text.visible = false;
            }

            var _btnPlayback = _back.getChildByName("btnPlayback");
            var _huifang = web.node.getChildByName("item").getChildByName("huifang");

            var _testNode = _back.getChildByName("play");
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP){
                _testNode = _back.getChildByName("tishi");
            }
            _testNode.setTouchEnabled(true);
            _testNode.addTouchEventListener(function(sender,type){
                if(type == 2) {
                    playTimeInDex++;
                    if (playTimeInDex >= 10) {
                        cc.log("============== playTimeInDex ");
                        playTimeInDex = 0;
                        _testBtn.visible = true;
                        _textFeildName1 = new cc.EditBox(cc.size(356, 45), new cc.Scale9Sprite("game_picture/xiaotanchuan_53.png"));
                        _textFeildName1.setFontColor(cc.color(255, 255, 255));
                        _textFeildName1.setMaxLength(15);
                        _textFeildName1.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
                        _textFeildName1.setPlaceHolder("点击输入");
                        if(isYongZhouProject()){
                            _textFeildName1.setPosition(sender.getContentSize().width / 2, sender.getContentSize().height / 2);
                        }else{
                            _textFeildName1.setAnchorPoint(cc.p(0, 0.5));
                            _textFeildName1.setPosition(sender.getContentSize().width, sender.getContentSize().height / 2);
                        }
                        sender.addChild(_textFeildName1);
                    }
                }
            },this);

            _testBtn.addTouchEventListener(function(sender,type){
                if(type == 2) {

                    var str = _textFeildName1.getString();
                    MjClient.devLogUid = str;
                }
            },this);

            if(MjClient.getAppType() != MjClient.APP_TYPE.QXXXGHZ && MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP &&
                MjClient.getAppType() != MjClient.APP_TYPE.QXLYQP) 
            {
                this._block0 = web.node.getChildByName("block_0");
                setWgtLayout(this._block0, [1, 1], [0.5, 0.5], [0, 0], true);
                this._block0.setVisible(false);
                this._back0 = web.node.getChildByName("back_0");
                this._back0.setVisible(false);
                var close = this._back0.getChildByName("close");
                close.addTouchEventListener(function (sender, type) {
                    if (type == ccui.Widget.TOUCH_ENDED) {
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji_Xuanzewanfa_Close", {uid:SelfUid()});
                        this._block0.setVisible(false);
                        this._back0.setVisible(false);
                    }
                }, this);

                this.wanFaItem = this._back0.getChildByName("btnWanFa_68");
            }            
            
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                setWgtLayout(this._back0, [0.7, 0.7], [0.5, 0.5], [0, 0]);
            }
            else if (MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
                setWgtLayout(this._back0, [0.75, 0.75], [0.5, 0.5], [0, 0]);
            }
            else {
                setWgtLayout(this._back0, [0.6, 0.6], [0.5, 0.5], [0, 0]);
            }   

            /*var playLog=MjClient.data.playLog;
             if(!playLog) MjClient.getPlayLog();
             else
             {
             this.jsBind.back._event.playLog();
             }*/
            this.addChild(web.node);
            playLogView = this;
            
        }


    });

})();


/***
 * 添加玩家的nickname、uid和score    by  Tom
 * @param node  player0/player1/player2/player3...节点
 * @param data  玩家个人信息
 * @param type  type = winall: 总分   type = winone: 单局得分
 */
function addPlayersInfo(node, data, type, gametype)
{
    if(!cc.sys.isObjectValid(node) || !data) return;
    var color1 = cc.color(211, 60, 0);
    var color2 = cc.color(59, 59, 61);
    if(isJinZhongAPPType()) {
        color1 = cc.color(208, 88, 60);
        color2 = cc.color(72, 132, 162);
    }
    else if(isJinZhongAPPType()) {
        color1 = cc.color(211, 38, 14);
        color2 = cc.color(68, 51, 51);
    }

    // 昵称
    var nickname = data.nickname || "";
    node.setString(getNewName_new(unescape(nickname),6));
    node.setFontName("Arial");
    node.setFontSize(node.getFontSize());

    // id
    var uid = data.uid;
    if(data.isDiffClub){
        uid = FriendCard_Common.getHideIdStr(uid)
    }
    // 分数
    var score = 0;
    if(type == "winall")
    {
        score = Number(data.winall) > 0 ? "+" + data.winall : data.winall;
        if(gametype === MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI || gametype === MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
            gametype === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || gametype === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA)
        {
            if(data.fenshu != undefined) score = Number(data.fenshu) > 0 ? "+" + data.fenshu : data.fenshu;
        }
    }else if(type == "winone"){
        score = Number(data.winone) > 0 ? "+" + data.winone : data.winone;
        if(gametype === MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE && data.isDouLiuZi) {
            var winOne = Number(data.winone);
            var winLiuZi = Number(data.winLiuZiScore);
            var betLiuZi = Number(data.betLiuZiScore);
            var factScore = winOne - winLiuZi - betLiuZi;
            factScore = revise(factScore);
            var exScore = winOne;
            score = factScore > 0 ? "+" + factScore : factScore;
            score += "(";
            score += exScore > 0 ? "+" + exScore : exScore;
            score += ")";
        }
    }
    var color = color1;
    if(Number(score) <= 0) color = color2;

    if (MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3()) {
        color = cc.color("#ff6f20");
        if(Number(score) <= 0) color = cc.color("#39b070");
    }

    // 衡阳新皮肤逻辑
    if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
        var idText = node.getChildByName("txt_id");
        var scoreText = node.getChildByName("txt_score");
        var color = cc.color(219, 21, 0);
        if(Number(score) <= 0) color = cc.color(82, 166, 150);
        //统一显示布局
        idText.setString("ID:" + uid);
        scoreText.setString(score);
        scoreText.setTextColor(color);
        node.setString(getNewName_new(unescape(nickname),6));
        node.setFontName("Arial");
        node.setFontSize(node.getFontSize());
        return
    }

    // 创建id
    var idText = new ccui.Text();
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {//岳阳同一使用方正兰亭
        idText.setFontName("fonts/lanting.TTF");
    }
    idText.setFontSize(node.getFontSize() - 1);
    idText.setFontName(node.getFontName());
    idText.setTextColor(node.getTextColor());
    idText.setAnchorPoint(0, 0);
    idText.setString("(" + uid + "): ");
    node.addChild(idText);
    // 创建score
    var scoreText = new ccui.Text();
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {//岳阳同一使用方正兰亭
        scoreText.setFontName("fonts/lanting.TTF");
    }
    if (MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3())
        scoreText.setFontSize(30);
    else 
        scoreText.setFontSize(node.getFontSize());
    scoreText.setFontName(node.getFontName());
    scoreText.setTextColor(color);
    scoreText.setAnchorPoint(0, 0);
    if(gametype != MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE) {
        score = revise(score);  // fix.安乡偎麻雀是字符串, 不能做精度修正!!!
    }
    scoreText.setString(score);
    scoreText.ignoreContentAdaptWithSize(true);

    if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || 
       MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
       MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
       MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
       MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ)
    {
        idText.setString("(" + uid + ")");
        idText.setAnchorPoint(0, 1);
        idText.setPosition(-5, -5);

        score = revise(score);
        scoreText.setString(": " + score);
        scoreText.setPosition(node.width, 0);
        node.addChild(scoreText);
        
    }else if(isJinZhongAPPType() || 
        MjClient.APP_TYPE.QXYZQP === MjClient.getAppType() || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP)
    {
        idText.setString("ID:" + uid);
        idText.setAnchorPoint(0.5, 0);
        idText.setFontName("fonts/lanting.TTF");
        idText.setPosition(node.width/2, -node.height*1.4);
        score = revise(score);
        scoreText.setString(score);
        scoreText.setAnchorPoint(0.5, 0);
        scoreText.setFontName("fonts/lanting.TTF");
        scoreText.setPosition(idText.width/2, -idText.height*1.4);
        idText.addChild(scoreText);
    }
    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP
        || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ
        || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ
        || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
        idText.setString("ID:" + uid);
        idText.setAnchorPoint(0, 0);
        idText.setFontName("fonts/lanting.TTF");
        idText.setPosition(0, -node.height*1.1);
        if (gametype == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE) {
            scoreText.setString(score); //fix.安乡偎麻雀是带'+'字符串, 不用追加'+',也不能做精度修正!!!
        } else {
            score = revise(score);
            if (MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3()) {
                scoreText.setString(score > 0 ? "+" + score : score);
            }
            else {
                scoreText.setString(score);
            }
        }
        
        scoreText.setAnchorPoint(0.5, 0);
        scoreText.setFontName("fonts/lanting.TTF");
        scoreText.setPosition(idText.width/2, -scoreText.height);
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3()) {
            scoreText.y -= 10;
        }
        idText.addChild(scoreText);
    }
    else {
        //idText.setPosition(145, 0);
        idText.setPosition(node.width, 0);
        scoreText.setPosition(idText.width, 0);

        idText.addChild(scoreText);
    }
};