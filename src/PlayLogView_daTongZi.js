/**
 * Created by Administrator on 2017/5/18/018.
 */

var playLogIfoArry = [];
var playLogInfoItem = {};
(function(){

    var playLogView,uiItem,uiList,msgCount,delay,update_tData;
    var itemDTZ3;
    var itemDTZ4;
    var itemBZD4;
    var listType;

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
            _run: function() {
                for (var i = 0; i < 4; i++) {
                    var player = this.getChildByName("player" + i);
                    if (!player)
                        continue;

                    if (item.players.length <= i) {
                        player.setVisible(false);
                        continue;
                    }

                    player.ignoreContentAdaptWithSize(true);
                    addPlayersInfo(player, item.players[i], "winall", item.gametype);
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
    }

    function BindLogItem_daTongZi(ui, item, num, isThree){

        function getNewName (name,length) {
            var _newName = name;
            var strlen = name.length;
            if(cc.isUndefined(length) || length == null)
            {
                length = 5;//默认名字显示4个字符
            }
            if(strlen >= length)
            {
                _newName =  name.substring(0,length - 1);
                _newName += "...";
                // cc.log("sking mystr =  " + _newName);
            }
            return _newName;
        };

        if(item.players.length == 4){
            function findPlayersByTid(tid){
                var arr = [];
                for(var i = 0; i < item.players.length; i++){
                    var pl = item.players[i];
                    if(pl.teamid == tid){
                        arr.push(pl);
                    }
                }
                return arr;
            }

            var playersA = findPlayersByTid("A");
            var playersB = findPlayersByTid("B");

            cc.log("playersA:", playersA);
            cc.log("playersB:", playersB);

            if(item.gametype == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN &&  (!item.players[0].teamid || item.players[0].teamid.length == 0)){
                //霸炸弹 4人不分组
                var bind =
                {
                    resultIcon:{
                        _run:function(){
                            if (MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3())
                                this.loadTexture("playLog_3.0/icon_fu.png");
                            else
                                this.loadTexture("daTongZi/zhanji/fail.png");
                            for(var i = 0; i < item.players.length; i++){
                                var pl = item.players[i];
                                if(pl.uid == SelfUid()){
                                    if(pl.windif && pl.windif > 0){
                                        if (MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3())
                                            this.loadTexture("playLog_3.0/icon_sheng.png");
                                        else
                                            this.loadTexture("daTongZi/zhanji/win.png");
                                        break;
                                    }
                                }
                            }
                        }
                    },
                    time:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                            this.setTextAreaSize(cc.size(160,0));
                        },
                        _text:function(){

                            return item.now;
                        }
                    },
                    tableid:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _text:function(){  return "" + GameCnName[item.gametype] + "\n" + item.tableid }
                    },
                    _run: function() {
                        for (var i = 0; i < 4; i++) {
                            var nameLabel = this.getChildByName("name" + i);
                            if (nameLabel) {
                                nameLabel.ignoreContentAdaptWithSize(true);
                                if (item.players.length > i)
                                    nameLabel.setString(getNewName(unescape(item.players[i].nickname), 5));
                                else
                                    nameLabel.setString("");
                            }

                            var IDLabel = this.getChildByName("ID" + i);
                            if (IDLabel) {
                                IDLabel.ignoreContentAdaptWithSize(true);
                                if (item.players.length > i)
                                    IDLabel.setString("ID:" + item.players[i].uid);
                                else
                                    IDLabel.setString("");
                            }

                            var scoreLabel = this.getChildByName("score" + i);
                            if (scoreLabel) {
                                if (item.players.length > i) {
                                    scoreLabel.ignoreContentAdaptWithSize(true);
                                    var all = item.players[i].windif ? item.players[i].windif : 0;
                                    if (scoreLabel.setProperty) {
                                        if (all < 0) {
                                            scoreLabel.setProperty(all, "daTongZi/zhanji/shuzi.png", 25, 72, "+");
                                        } else {
                                            scoreLabel.setProperty("+" + all, "daTongZi/gameOver/biaoti_shuzi1.png", 28, 43, "+");
                                        }
                                    } else {
                                        scoreLabel.setTextColor(all <= 0 ? cc.color("#38ae6f") : cc.color("#ff6f20"));
                                        if (all <= 0) {
                                            scoreLabel.setString("" + all);
                                        } else {
                                            scoreLabel.setString("+" + all);
                                        }
                                    }
                                }
                            } else {
                                scoreLabel.setString("");
                            }
                        }
                    },
                    desBtn:{
                        _run:function(){
                            this.visible = item.playbackUrl ? true : false;
                        },
                        _click:function()
                        {
                            //MjClient.getPlayLogOne(item.now,item.logid);
                            MjClient.getPlayLogOne(item);
                            playLogInfoItem =item;
                        }
                    },
                    copyBtn: {
                        _click: function() {
                            copyPlayLogResult(item);
                        }
                    },

                    _click:function()
                    {
                        var playUrl = item.playbackUrl;
                        if(!playUrl){
                            return;
                        }
                        //MjClient.getPlayLogOne(item.now,item.logid);
                        MjClient.getPlayLogOne(item);
                        playLogInfoItem =item;
                    },
                    endScore:{
                        _run : function(){
                            this.setString("0");
                            for(var i = 0; i < item.players.length; i++){
                                var pl = item.players[i];
                                if(pl.uid == SelfUid()){
                                    if(pl.windif) this.setString(pl.windif); //回放报错加判断，by sking
                                }
                            }
                        }
                    }
                }
            }else{
                var bind =
                {
                    time:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                            this.setTextAreaSize(cc.size(160,0));
                        },
                        _text:function(){  return item.now }
                    },
                    tableid:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _text:function(){  return "" + GameCnName[item.gametype] + "\n" + item.tableid }
                    },
                    _run: function() {
                        for (var i = 0; i < 4; i ++) {
                            var player = null;
                            if (i == 0)
                                player = playersA[0];
                            else if (i == 1)
                                player = playersB[0];
                            else if (i == 2)
                                player = playersA[1];
                            else if (i == 3)
                                player = playersB[1];

                            var nameLabel = this.getChildByName("name" + i);
                            if (nameLabel) {
                                nameLabel.ignoreContentAdaptWithSize(true);
                                if (player)
                                    nameLabel.setString(getNewName(unescape(player.nickname),5));
                                else
                                    nameLabel.setString("");
                            }

                            var IDLabel = this.getChildByName("ID" + i);
                            if (IDLabel) {
                                IDLabel.ignoreContentAdaptWithSize(true);
                                if (player)
                                    IDLabel.setString("ID:" + player.uid);
                                else
                                    IDLabel.setString("");
                            }
                        }
                    },
                    desBtn:{
                        _run:function(){
                            this.visible = item.playbackUrl ? true : false;
                        },
                        _click:function()
                        {
                            //MjClient.getPlayLogOne(item.now,item.logid);
                            MjClient.getPlayLogOne(item);
                            playLogInfoItem =item;
                        }
                    },
                    copyBtn: {
                        _click: function() {
                            copyPlayLogResult(item);
                        }
                    },
                    _click:function()
                    {
                        var playUrl = item.playbackUrl;
                        if(!playUrl){
                            return;
                        }
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
                            this.ignoreContentAdaptWithSize(true);
                            for (var i = 0; i < item.players.length; i++) {
                                var pl = item.players[i];
                                if (pl.uid == SelfUid()) {
                                    var all = pl.t_windif;
                                    if (this.setProperty) {
                                        if (all <= 0) {
                                            this.setProperty(all, "daTongZi/zhanji/shuzi.png", 25, 72, "+");
                                        } else {
                                            this.setProperty("+" + all, "daTongZi/gameOver/biaoti_shuzi1.png", 28, 43, "+");
                                        }
                                    } else {
                                        this.setTextColor(all <= 0 ? cc.color("#38ae6f") : cc.color("#ff6f20"));
                                        if (all <= 0) {
                                            this.setString("" + all);
                                        } else {
                                            this.setString("-" + all);
                                        }
                                    }
                                }
                            }
                        }
                    },
                    pingJi:{
                        _run : function(){
                            if(item.gametype == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN){
                                this.visible = false;
                            }
                            this.ignoreContentAdaptWithSize(true);
                            for(var i = 0; i < item.players.length; i++){
                                var pl = item.players[i];
                                if(pl.uid == SelfUid()){
                                    var all = pl.t_windif;
                                    if(all >= 0){
                                        this.setString("(正" + Math.abs(Math.floor(all / 100)) + "级)");
                                    }else{
                                        if(!all){
                                            all = 0;
                                        }
                                        return this.setString("(负" + Math.floor(Math.abs(all) / 100) + "级)");
                                    }
                                }
                            }
                        }
                    },
                    resultIcon:{
                        _run:function(){
                            if (MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3())
                                this.loadTexture("playLog_3.0/icon_fu.png");
                            else
                                this.loadTexture("daTongZi/zhanji/fail.png");
                            for(var i = 0; i < item.players.length; i++){
                                var pl = item.players[i];
                                if(pl.uid == SelfUid()){
                                    if(pl.t_windif && pl.t_windif > 0){
                                        if (MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3())
                                            this.loadTexture("playLog_3.0/icon_sheng.png");
                                        else
                                            this.loadTexture("daTongZi/zhanji/win.png");
                                        break;
                                    }
                                }
                            }
                        }
                    },
                };
            }
            
        }else{
            var bind3R =
                {
                    resultIcon:{
                        _run:function(){
                            if (MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3())
                                this.loadTexture("playLog_3.0/icon_fu.png");
                            else
                                this.loadTexture("daTongZi/zhanji/fail.png");
                            for(var i = 0; i < item.players.length; i++){
                                var pl = item.players[i];
                                if(pl.uid == SelfUid()){
                                    if(pl.windif && pl.windif > 0){
                                        if (MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3())
                                            this.loadTexture("playLog_3.0/icon_sheng.png");
                                        else
                                            this.loadTexture("daTongZi/zhanji/win.png");
                                        break;
                                    }
                                }
                            }
                        }
                    },
                    time:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                            this.setTextAreaSize(cc.size(160,0));
                        },
                        _text:function(){

                            return item.now;
                        }
                    },
                    tableid:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _text:function(){  return "" + GameCnName[item.gametype] + "\n" + item.tableid }
                    },
                    _run: function() {
                        for (var i = 0; i < 3; i++) {
                            var nameLabel = this.getChildByName("name" + i);
                            if (nameLabel) {
                                nameLabel.ignoreContentAdaptWithSize(true);
                                if (item.players.length > i)
                                    nameLabel.setString(getNewName(unescape(item.players[i].nickname), 5));
                                else
                                    nameLabel.setString("");
                            }

                            var IDLabel = this.getChildByName("ID" + i);
                            if (IDLabel) {
                                IDLabel.ignoreContentAdaptWithSize(true);
                                if (item.players.length > i)
                                    IDLabel.setString("ID:" + item.players[i].uid);
                                else
                                    IDLabel.setString("");
                            }

                            var pingJiLabel = this.getChildByName("pingJi" + i);
                            if (pingJiLabel) {
                                if (item.gametype == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN) {
                                    pingJiLabel.visible = false;
                                }
                                else if (item.players.length <= i) {
                                    pingJiLabel.setString("");
                                }
                                else {
                                    pingJiLabel.ignoreContentAdaptWithSize(true);
                                    var all = item.players[i].windif;
                                    if (!all) {
                                        pingJiLabel.setString("(正0级)");
                                    } else if (all >= 0) {
                                        pingJiLabel.setString("(正" + Math.abs(Math.floor(all / 100)) + "级)");
                                    } else {
                                        pingJiLabel.setString("(负" + Math.floor(Math.abs(all) / 100) + "级)");
                                    }
                                }   
                            }

                            var scoreLabel = this.getChildByName("score" + i);
                            if (scoreLabel) {
                                if (item.players.length > i) {
                                    scoreLabel.ignoreContentAdaptWithSize(true);
                                    var all = item.players[i].windif ? item.players[i].windif : 0;
                                    if (scoreLabel.setProperty) {
                                        if (all < 0) {
                                            scoreLabel.setProperty(all, "daTongZi/zhanji/shuzi.png", 25, 72, "+");
                                        } else {
                                            scoreLabel.setProperty("+" + all, "daTongZi/gameOver/biaoti_shuzi1.png", 28, 43, "+");
                                        }
                                    } else {
                                        scoreLabel.setTextColor(all <= 0 ? cc.color("#38ae6f") : cc.color("#ff6f20"));
                                        if (all <= 0) {
                                            scoreLabel.setString("" + all);
                                        } else {
                                            scoreLabel.setString("+" + all);
                                        }
                                    }
                                } else {
                                    scoreLabel.setString("");
                                }
                            }
                        }
                    },
                    desBtn:{
                        _run:function(){
                            this.visible = item.playbackUrl ? true : false;
                        },
                        _click:function()
                        {
                            //MjClient.getPlayLogOne(item.now,item.logid);
                            MjClient.getPlayLogOne(item);
                            playLogInfoItem =item;
                        }
                    },
                    copyBtn: {
                        _click: function() {
                            copyPlayLogResult(item);
                        }
                    },
                    _click:function()
                    {
                        var playUrl = item.playbackUrl;
                        if(!playUrl){
                            return;
                        }
                        //MjClient.getPlayLogOne(item.now,item.logid);
                        MjClient.getPlayLogOne(item);
                        playLogInfoItem =item;
                    },
                    endScore:{
                        _run : function(){
                            this.setString("0");
                            for(var i = 0; i < item.players.length; i++){
                                var pl = item.players[i];
                                if(pl.uid == SelfUid()){
                                    if(pl.windif) this.setString(pl.windif); //回放报错加判断，by sking
                                }
                            }
                        }
                    }
                }
        }

        if(isThree){
            BindUiAndLogic(ui,bind3R);
        }else{
            BindUiAndLogic(ui,bind);
        }


        var endScore = ui.getChildByName("endScore")
        if(item.gametype == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || item.gametype == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN){

            if(item.players.length == 4 && item.players[0].teamid){
                var teamA = ui.getChildByName("teamA");
                var teamB = ui.getChildByName("teamB");;

                teamA.visible = true;
                teamB.visible = true;
                var aTotal = 0;
                var bTotal = 0;

                for(var i = 0; i < item.players.length; i++){
                    var pl = item.players[i];
                    if(pl.teamid == "A"){
                        aTotal = pl.t_score_total;

                        var text = teamA.getChildByName("winAll");
                        text.setString(pl.t_score_total);
                        if(pl.uid == SelfUid()){
                            if(pl.t_windif > 0){
                                endScore.setString("+" + pl.t_windif);
                            }else{
                                endScore.setString(pl.t_windif);
                            }

                        }
                    }else if(pl.teamid == "B"){
                        bTotal = pl.t_score_total;

                        var text = teamB.getChildByName("winAll");
                        text.setString(pl.t_score_total);
                        if(pl.uid == SelfUid()){
                            if(pl.t_windif > 0){
                                endScore.setString("+" + pl.t_windif);
                            }else{
                                endScore.setString(pl.t_windif);
                            }
                        }
                    }
                }

                var text = teamA.getChildByName("winAll");
                text.ignoreContentAdaptWithSize(true);
                text.setColor(cc.color(60,220,54));
                if(aTotal && aTotal > bTotal){
                    text.setColor(cc.color(255,233,79));
                }

                var text = teamB.getChildByName("winAll");
                text.ignoreContentAdaptWithSize(true);
                text.setColor(cc.color(60,220,54));
                if(bTotal && bTotal > aTotal){
                    text.setColor(cc.color(255,233,79));
                }
            }
        }
    }

    var playTimeInDex = 0;


    PlayLogView_daTongZi = cc.Layer.extend({
        jsBind:{
            block:
                {
                    _layout:[[1,1],[0.5,0.5],[0,0],2],
                },
            item:{
                _layout:[ [0.7,0],[0.5,0.5],[0,0]]
                ,_visible:false
                ,_run:function()
                {
                    uiItem=this;
                    uiItem.visible=false;
                }
            },
            itemDTZ3:{
                // _layout:[ [989/1280,0],[0.5,0.5],[0,0]]
                _visible:false
                ,_run:function()
                {
                    itemDTZ3=this;
                    itemDTZ3.visible=false;
                }
            },
            itemDTZ4:{
                // _layout:[ [989/1280,0],[0.5,0.5],[0,0]]
                _visible:false
                ,_run:function()
                {
                    itemDTZ4=this;
                    itemDTZ4.visible=false;
                }
            },
            itemBZD4:{
                // _layout:[ [989/1280,0],[0.5,0.5],[0,0]]
                _visible:false
                ,_run:function()
                {
                    itemBZD4=this;
                    itemBZD4.visible=false;
                }
            },
            back:{
                _run:function () {
                    if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
                        setWgtLayout(this, [this.width/1280, this.height/720], [0.5, 0.5], [0, 0]);
                    else
                        setWgtLayout(this, [0.9,0.9],[0.5,0.45],[0,0],false);
                },
                yes: {
                    // _layout:[[0,0.1],[0,1],[1,-0.6]]
                    _click:function()
                    {
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
                        MjClient.Scene.addChild(new playbackLayer());
                    }
                },
                _event:
                    {
                        playLog:function()
                        {
                            postEvent("changeLogType", {});
                        },

                        changeLogType : function(){
                            var log=MjClient.data.playLog;
                            // console.log("----- changeLogType log ---- " + JSON.stringify(log));
                            uiList.removeAllItems();
                            if(!log){
                                return;
                            }
                            var num=log.logs.length;

                            if (log.logs.length == 0)
                            {
                                if (playLogView.nullTip_image)
                                    playLogView.nullTip_image.visible = true;
                                if (playLogView.nullTip_text)
                                    playLogView.nullTip_text.visible = true;
                            }
                            else
                            {
                                var index = 1;
                                for(var i=0;i<log.logs.length;i++)
                                {
                                    var logItem = log.logs[i];
                                    if((logItem.gametype == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || logItem.gametype == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN) 
                                        && listType == 0){
                                        var item = itemDTZ3.clone();
                                        if(logItem.players.length == 4){
                                            item = itemDTZ4.clone();

                                            if(logItem.gametype == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN && !logItem.players[0].teamid){
                                                item = itemBZD4.clone();
                                            }

                                            item.visible=true;
                                            uiList.insertCustomItem(item,0);
                                            BindLogItem_daTongZi(item,log.logs[i],num-i);
                                        }else{
                                            item.visible=true;
                                            uiList.insertCustomItem(item,0);
                                            BindLogItem_daTongZi(item,log.logs[i],num-i, true);
                                        }

                                    }
                                    else if(logItem.gametype != MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG && 
                                            logItem.gametype != MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN && 
                                            listType != 0)
                                    {
                                        var item=uiItem.clone();
                                        item.visible=true;
                                        item.scale=uiList.width/item.width;
                                        uiList.insertCustomItem(item,0);
                                        sortLog(log.logs[i]);
                                        BindLogItem(item,log.logs[i],index);
                                        index += 1;
                                    }
                                }
                            }
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
            BindUiAndLogic(web.node, this.jsBind);
            MjClient.getPlayLog();//每次获取新数据
            playTimeInDex = 0;
            var _textFeildName1 = null;
            var _textRoomNum = null;
            var that = this;

            var _back = web.node.getChildByName("back");
            this._back = _back;
            var _testBtn = _back.getChildByName("testBtn");
            _testBtn.visible = false;

            var _suizi = _back.getChildByName("suizi");
            //穗子动画
            if(_suizi) 
                COMMON_UI.suiziAni(_suizi,8);
            else
                COMMON_UI.popDialogAni(_back);

            this._initUI();

            this.nullTip_image = _back.getChildByName("nullTip_image");
            this.nullTip_text = _back.getChildByName("nullTip_text");
            if (this.nullTip_image)
                this.nullTip_image.visible = false;
            if (this.nullTip_text)
                this.nullTip_text.visible = false;

            var _testNode = _back.getChildByName("tishi");
            _testNode.setTouchEnabled(true);
            _testNode.addTouchEventListener(function(sender,type){
                if(type == 2) {
                    playTimeInDex++;
                    if (playTimeInDex >= 10) {
                        cc.log("============== playTimeInDex ");
                        playTimeInDex = 0;
                        _testBtn.visible = true;
                        _textFeildName1 = new cc.EditBox(cc.size(356, 45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
                        _textFeildName1.setFontColor(cc.color(255, 255, 255));
                        _textFeildName1.setMaxLength(15);
                        _textFeildName1.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
                        _textFeildName1.setPlaceHolder("点击输入");
                        _textFeildName1.setPosition(sender.getContentSize().width / 2, sender.getContentSize().height / 2);
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


            /*var playLog=MjClient.data.playLog;
             if(!playLog) MjClient.getPlayLog();
             else
             {
             this.jsBind.back._event.playLog();
             }*/
            this.addChild(web.node);
            playLogView = this;
        },

        _initUI : function(){
            var titleList = this._back.getChildByName("titleList");
            // var dtzBg = this._back.getChildByName("dtzBg");

            var typeTab = this._back.getChildByName("typeTab");
            var dtz = typeTab.getChildByName("dtz");
            // dtz.titleText = "打筒子/炸弹";
            var other = typeTab.getChildByName("other");
            var title_1 = dtz.getTitleRenderer();
            var title_2 = other.getTitleRenderer();
            var posY = title_1.getPositionY() + 3;
            title_1.setPositionY(posY);
            title_2.setPositionY(posY);
            var that = this;
            var switchTab = function(tabIndex)
            {
                cc.log("switchTab: tabIndex=" + tabIndex);
                dtz.enabled = tabIndex != 0;
                other.enabled = tabIndex != 1;
                dtz.setTitleColor(tabIndex != 0 ? cc.color(116,60,19) : cc.color(255, 255, 255));
                other.setTitleColor(tabIndex != 1 ? cc.color(116,60,19) : cc.color(255, 255, 255));

                listType = tabIndex;
                if (titleList)
                    titleList.visible = tabIndex == 0;

                postEvent("changeLogType", {});
            };

            dtz.addTouchEventListener(function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        switchTab(0)
                        break;
                    default:
                        break;
                }
            }, this);

            other.addTouchEventListener(function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        switchTab(1);
                        break;
                    default:
                        break;
                }
            }, this);

            switchTab(1);

        }
    });

})();