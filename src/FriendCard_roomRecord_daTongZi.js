/*
* @Author: Administrator
* @Date:   2017-11-24 19:18:08
* @Last Modified by:   Administrator
*/

function BindLogItem_daTongZi(ui, item, num, isThree, uiObj){
        item.gametype = item.gameType;
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

            if(item.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN &&  (!item.players[0].teamid || item.players[0].teamid.length == 0)){
                //霸炸弹 4人不分组
                var bind =
                {
                    resultIcon:{
                        _run:function(){
                            this.loadTexture("daTongZi/zhanji/fail.png");
                            for(var i = 0; i < item.players.length; i++){
                                var pl = item.players[i];
                                if(i == 0){
                                    if(pl.windif && pl.windif > 0){
                                        this.loadTexture("daTongZi/zhanji/win.png");
                                    }
                                }
                                if(pl.uid == SelfUid()){
                                    if(pl.windif && pl.windif > 0){
                                        this.loadTexture("daTongZi/zhanji/win.png");
                                        break;
                                    }else{
                                        this.loadTexture("daTongZi/zhanji/fail.png");
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

                            return item.showTime;
                        }
                    },
                    tableid:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _text:function(){  return "" + GameCnName[item.gametype] + "\n" + item.roomNum }
                    },
                    fangkaRebateText:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                            this.setVisible(true);
                            this.setString("");
                            if(item.fangkaRebate && ui.isCreator){
                                if(item.fangkaRebate == -1){
                                    this.setString("免");
                                    this.setTextColor(this.getParent().getChildByName("tableid").getTextColor());
                                }else {
                                    this.setString(item.fangkaRebate);
                                    this.setTextColor(cc.color("#000000"));
                                }
                            }
                            if(item.matchScoreLimitUser && Object.keys(item.matchScoreLimitUser).length > 0){
                                 this.setString(this.getString() +"(低分解散)");
                            }
                        },
                    },
                    name0:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                            this.setFontName("Arial");
                            this.setFontSize(this.getFontSize());
                        },
                        _text:function(){
                            return getNewName(unescape(item.players[0].nickname),5);
                        }
                    },
                    name1:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                            this.setFontName("Arial");
                            this.setFontSize(this.getFontSize());
                        },
                        _text:function(){
                            return getNewName(unescape(item.players[1].nickname),5);
                        }
                    },
                    name2:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                            this.setFontName("Arial");
                            this.setFontSize(this.getFontSize());
                        },
                        _text:function(){
                            if(item.players.length > 2)
                                return getNewName(unescape(item.players[2].nickname),5);
                            else{
                                return unescape("");
                            }
                        }
                    },
                    name3:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                            this.setFontName("Arial");
                            this.setFontSize(this.getFontSize());
                        },
                        _text:function(){
                            return getNewName(unescape(item.players[3].nickname),5);
                        }
                    },
                    ID0:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _text:function(){
                            if(item.players[0].isDiffClub){
                                return "ID:" +FriendCard_Common.getHideIdStr(item.players[0].userId);
                            }else{
                                return "ID:" + item.players[0].userId;
                            }
                            
                        }
                    },
                    ID1:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _text:function(){
                            if(item.players[1].isDiffClub){
                                return "ID:" +FriendCard_Common.getHideIdStr(item.players[1].userId);
                            }else{
                                return "ID:" + item.players[1].userId;
                            }
                        }
                    },
                    ID2:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _text:function(){
                            if(item.players[2].isDiffClub){
                                return "ID:" +FriendCard_Common.getHideIdStr(item.players[2].userId);
                            }else{
                                return "ID:" + item.players[2].userId;
                            }
                        }
                    },
                    ID3:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _text:function(){
                            if(item.players[3].isDiffClub){
                                return "ID:" +FriendCard_Common.getHideIdStr(item.players[3].userId);
                            }else{
                                return "ID:" + item.players[3].userId;
                            }
                        }
                    },
                    score0:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                            var all = item.players[0].windif;
                            if(all <= 0){
                                this.setProperty(all, "daTongZi/zhanji/shuzi.png", 25, 72, "+");
                            }else{
                                this.setProperty("+" + all, "daTongZi/gameOver/biaoti_shuzi1.png", 28, 43, "+");
                            }
                        }
                    },
                    score1:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                            var all = item.players[1].windif;
                            if(all <= 0){
                                this.setProperty(all, "daTongZi/zhanji/shuzi.png", 25, 72, "+");
                            }else{
                                this.setProperty("+" + all, "daTongZi/gameOver/biaoti_shuzi1.png", 28, 43, "+");
                            }
                        },
                    },
                    score2:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                            if(item.players.length > 2){
                                var all = item.players[2].windif;
                                if(all <= 0){
                                    this.setProperty(all, "daTongZi/zhanji/shuzi.png", 25, 72, "+");
                                }else{
                                    this.setProperty("+" + all, "daTongZi/gameOver/biaoti_shuzi1.png", 28, 43, "+");
                                }
                            }else{
                                this.setString("");
                            }

                        }
                    },
                    score3:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                            if(item.players.length > 2){
                                var all = item.players[3].windif;
                                if(all <= 0){
                                    this.setProperty(all, "daTongZi/zhanji/shuzi.png", 25, 72, "+");
                                }else{
                                    this.setProperty("+" + all, "daTongZi/gameOver/biaoti_shuzi1.png", 28, 43, "+");
                                }
                            }else{
                                this.setString("");
                            }

                        }
                    },
                    desBtn:{
                        _click:function()
                        {
                            //MjClient.getPlayLogOne(item.now,item.logid);
                            uiObj.reqRecord_one(item);
                            playLogInfoItem =item;
                        }
                    },
                    copyBtn: {
                        _click: function() {
                            copyPlayLogResult_friendCard(item);
                        }
                    },
                    _click:function()
                    {
                        //MjClient.getPlayLogOne(item.now,item.logid);
                        uiObj.reqRecord_one(item);
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
                        _text:function(){  
                            return MjClient.dateFormat(new Date(parseInt(item.createTime)), 'yyyy-MM-dd hh:mm:ss'); 
                        }
                    },
                    tableid:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _text:function(){  return "" + GameCnName[item.gametype] + "\n" + item.roomNum }
                    },
                     fangkaRebateText:{
                         _run:function(){
                             this.ignoreContentAdaptWithSize(true);
                             this.setVisible(true);
                             this.setString("");
                             if(item.fangkaRebate && ui.isCreator){
                                 if(item.fangkaRebate == -1){
                                     this.setString("免");
                                     this.setTextColor(this.getParent().getChildByName("tableid").getTextColor());
                                 }else {
                                     this.setString(item.fangkaRebate);
                                     this.setTextColor(cc.color("#000000"));
                                 }
                             }
                             if(item.matchScoreLimitUser && Object.keys(item.matchScoreLimitUser).length > 0){
                                 this.setString(this.getString() +"(低分解散)");
                             }
                         },
                     },
                    lineScore : {
                        _run: function(){
                            if(item.players[0].t_windif == null || item.players[0].t_windif == undefined){
                                this.visible = false;
                            }
                        }
                    },
                    name0:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                            this.setFontName("Arial");
                            this.setFontSize(this.getFontSize());
                        },
                        _text:function(){
                            if(item.players[0].t_windif == null || item.players[0].t_windif == undefined){
                                return getNewName(unescape(playersA[0].nickname),5) + ":" + playersA[0].score; 
                            }else{
                                return getNewName(unescape(playersA[0].nickname),5); 
                            }
                            
                        }
                    },
                    name1:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                            this.setFontName("Arial");
                            this.setFontSize(this.getFontSize());
                        },
                        _text:function(){  
                            if(item.players[1].t_windif == null || item.players[1].t_windif == undefined){
                                return getNewName(unescape(playersB[0].nickname),5) + ":" + playersB[0].score; 
                            }else{
                                return getNewName(unescape(playersB[0].nickname),5); 
                            }
                            // return getNewName(unescape(item.players[1].nickname),5);
                        }
                    },
                    name2:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                            this.setFontName("Arial");
                            this.setFontSize(this.getFontSize());
                        },
                        _text:function(){
                            if(item.players[2].t_windif == null || item.players[2].t_windif == undefined){
                                return getNewName(unescape(playersA[1].nickname),5) + ":" + playersA[1].score; 
                            }else{
                                return getNewName(unescape(playersA[1].nickname),5); 
                            }
                            // return getNewName(unescape(item.players[2].nickname),5);
                        }
                    },
                    name3:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                            this.setFontName("Arial");
                            this.setFontSize(this.getFontSize());
                        },
                        _text:function(){
                            if(item.players[3].t_windif == null || item.players[3].t_windif == undefined){
                                return getNewName(unescape(playersB[1].nickname),5) + ":" + playersB[1].score; 
                            }else{
                                return getNewName(unescape(playersB[1].nickname),5); 
                            }
                            // return getNewName(unescape(item.players[3].nickname),5);
                        }
                    },
                    ID0:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _text:function(){
                            if(playersA[0].isDiffClub){
                                return "ID:" +FriendCard_Common.getHideIdStr(playersA[0].userId);
                            }else{
                                return "ID:" + playersA[0].userId;
                            }
                        }
                    },
                    ID1:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _text:function(){  
                            if(playersB[0].isDiffClub){
                                return "ID:" +FriendCard_Common.getHideIdStr(playersB[0].userId);
                            }else{
                                return "ID:" + playersB[0].userId;
                            }
                        }
                    },
                    ID2:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _text:function(){
                            if(playersA[1].isDiffClub){
                                return "ID:" +FriendCard_Common.getHideIdStr(playersA[1].userId);
                            }else{
                                return "ID:" + playersA[1].userId;
                            }
                        }
                    },
                    ID3:{
                        _run:function(){
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _text:function(){  
                            if(playersB[1].isDiffClub){
                                return "ID:" +FriendCard_Common.getHideIdStr(playersB[1].userId);
                            }else{
                                return "ID:" + playersB[1].userId;
                            }
                        }
                    },
                    desBtn:{
                        _click:function()
                        {
                            //MjClient.getPlayLogOne(item.now,item.logid);
                            uiObj.reqRecord_one(item);
                            playLogInfoItem =item;
                        }
                    },
                    copyBtn: {
                        _click: function() {
                            copyPlayLogResult_friendCard(item);
                        }
                    },
                    _click:function()
                    {
                        //MjClient.getPlayLogOne(item.now,item.logid);
                        uiObj.reqRecord_one(item);
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
                            for(var i = 0; i < item.players.length; i++){
                                var pl = item.players[i];
                                if(pl.userId == SelfUid()){
                                    var all = pl.t_windif;
                                    if(all <= 0){
                                        this.setProperty(all, "daTongZi/zhanji/shuzi.png", 25, 72, "+");
                                    }else{
                                        this.setProperty("+" + all, "daTongZi/gameOver/biaoti_shuzi1.png", 28, 43, "+");
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
                            this.setString("");
                            this.ignoreContentAdaptWithSize(true);
                            for(var i = 0; i < item.players.length; i++){
                                var pl = item.players[i];
                                if(pl.userId == SelfUid()){
                                    var all = pl.t_windif;
                                    if(all >= 0){
                                        this.setString("(正" + Math.abs(Math.floor(all / 100)) + "级)");
                                    }else{
                                        this.setString("(负" + Math.abs(Math.floor(all / 100)) + "级)");
                                    }
                                }
                                if(pl.t_windif == null || pl.t_windif == undefined){
                                    this.visible = false;
                                }
                            }
                        }
                    },
                    resultIcon:{
                        _run:function(){
                            this.loadTexture("daTongZi/zhanji/fail.png");
                            var hasDefault = false;
                            for(var i = 0; i < item.players.length; i++){
                                var pl = item.players[i];
                                if(pl.teamid == "A" && !hasDefault){
                                    hasDefault = true;
                                    if(pl.t_windif && pl.t_windif > 0){
                                        this.loadTexture("daTongZi/zhanji/win.png");
                                    }
                                }
                                if(pl.userId == SelfUid()){
                                    hasDefault = true;
                                    if(pl.t_windif && pl.t_windif > 0){
                                        this.loadTexture("daTongZi/zhanji/win.png");
                                        break;
                                    }else{
                                        this.loadTexture("daTongZi/zhanji/fail.png");
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
                        this.loadTexture("daTongZi/zhanji/fail.png");
                        for(var i = 0; i < item.players.length; i++){
                            var pl = item.players[i];
                            if(i == 0){
                                if(pl.windif && pl.windif > 0){
                                    this.loadTexture("daTongZi/zhanji/win.png");
                                }
                            }
                            if(pl.userId == SelfUid()){
                                if(pl.windif && pl.windif > 0){
                                    this.loadTexture("daTongZi/zhanji/win.png");
                                    break;
                                }else{
                                    this.loadTexture("daTongZi/zhanji/fail.png");
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

                        return MjClient.dateFormat(new Date(parseInt(item.createTime)), 'yyyy-MM-dd hh:mm:ss'); 
                    }
                },
                tableid:{
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text:function(){  return "" + GameCnName[item.gametype] + "\n" + item.roomNum }
                },
                 fangkaRebateText:{
                     _run:function(){
                         this.ignoreContentAdaptWithSize(true);
                         this.setVisible(true);
                         this.setString("");
                         if(item.fangkaRebate && ui.isCreator){
                             if(item.fangkaRebate == -1){
                                 this.setString("免");
                                 this.setTextColor(this.getParent().getChildByName("tableid").getTextColor());
                             }else {
                                 this.setString(item.fangkaRebate);
                                 this.setTextColor(cc.color("#000000"));
                             }
                         }
                         if(item.matchScoreLimitUser && Object.keys(item.matchScoreLimitUser).length > 0){
                            this.setString(this.getString() +"(低分解散)");
                         }
                     },
                 },
                name0:{
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                        this.setFontName("Arial");
                        this.setFontSize(this.getFontSize());
                    },
                    _text:function(){
                        return getNewName(unescape(item.players[0].nickname),5); 
                    }
                },
                name1:{
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                        this.setFontName("Arial");
                        this.setFontSize(this.getFontSize());
                    },
                    _text:function(){  
                        return getNewName(unescape(item.players[1].nickname),5);
                    }
                },
                name2:{
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                        this.setFontName("Arial");
                        this.setFontSize(this.getFontSize());
                    },
                    _text:function(){
                        if(item.players.length > 2)
                            return getNewName(unescape(item.players[2].nickname),5);
                        else{
                            return unescape("");
                        }
                    }
                },
                ID0:{
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text:function(){
                        if(item.players[0].isDiffClub){
                            return "ID:" +FriendCard_Common.getHideIdStr(item.players[0].userId);
                        }else{
                            return "ID:" + item.players[0].userId;
                        }
                        
                    }
                },
                ID1:{
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text:function(){  
                        if(item.players[1].isDiffClub){
                            return "ID:" +FriendCard_Common.getHideIdStr(item.players[1].userId);
                        }else{
                            return "ID:" + item.players[1].userId;
                        }
                    }
                },
                ID2:{
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text:function(){
                        if(item.players.length > 2){
                            if(item.players[2].isDiffClub){
                                return "ID:" +FriendCard_Common.getHideIdStr(item.players[2].userId);
                            }else{
                                return "ID:" + item.players[2].userId;
                            }
                        }
                        return ("");
                            
                    }
                },
                pingJi0:{
                    _run:function(){
                        if(item.gametype == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN){
                            this.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                        if(item.players[0].windif == undefined || item.players[0].windif == null){
                            this.visible = false;
                        }
                    },
                    _text:function(){
                        var all = item.players[0].windif;
                        if(all >= 0){
                            return "(正" + Math.abs(Math.floor(all / 100)) + "级)";
                        }else{
                            return "(负" + Math.abs(Math.floor(all / 100)) + "级)";
                        }
                    }
                },
                pingJi1:{
                    _run:function(){
                        if(item.gametype == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN){
                            this.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                        if(item.players[1].windif == undefined || item.players[1].windif == null){
                            this.visible = false;
                        }
                    },
                    _text:function(){
                        var all = item.players[1].windif;
                        if(all >= 0){
                            return "(正" + Math.abs(Math.floor(all / 100)) + "级)";
                        }else{
                            return "(负" + Math.abs(Math.floor(all / 100)) + "级)";
                        }
                    }
                },
                pingJi2:{
                    _run:function(){
                        if(item.gametype == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN){
                            this.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                        if(item.players.length > 2 && (item.players[2].windif == undefined || item.players[2].windif == null)){
                            this.visible = false;
                        }
                        if(item.players.length < 3){
                            this.visible = false;
                        }
                    },
                    _text:function(){
                        if(item.players.length > 2){
                            var all = item.players[2].windif;
                            if(all >= 0){
                                return "(正" + Math.abs(Math.floor(all / 100)) + "级)";
                            }else{
                                return "(负" + Math.abs(Math.floor(all / 100)) + "级)";
                            }
                        }
                        else
                            return ("");
                    }
                },
                score0:{
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                        var all = item.players[0].windif;
                        if(all == null || all == undefined){
                            all = item.players[0].score;
                        }
                        if(all <= 0){
                            this.setProperty(all, "daTongZi/zhanji/shuzi.png", 25, 72, "+");
                        }else{
                            this.setProperty("+" + all, "daTongZi/gameOver/biaoti_shuzi1.png", 28, 43, "+");
                        }
                    }
                },
                score1:{
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                        var all = item.players[1].windif;
                        if(all == null || all == undefined){
                            all = item.players[1].score;
                        }
                        if(all <= 0){
                            this.setProperty(all, "daTongZi/zhanji/shuzi.png", 25, 72, "+");
                        }else{
                            this.setProperty("+" + all, "daTongZi/gameOver/biaoti_shuzi1.png", 28, 43, "+");
                        }
                    },
                },
                score2:{
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                        if(item.players.length > 2){
                            var all = item.players[2].windif;
                            if(all == null || all == undefined){
                                all = item.players[2].score;
                            }
                            if(all <= 0){
                                this.setProperty(all, "daTongZi/zhanji/shuzi.png", 25, 72, "+");
                            }else{
                                this.setProperty("+" + all, "daTongZi/gameOver/biaoti_shuzi1.png", 28, 43, "+");
                            }
                        }else{
                            this.setString("");
                        }
                        
                    }
                },
                desBtn:{
                    _click:function()
                    {
                        //MjClient.getPlayLogOne(item.now,item.logid);
                        uiObj.reqRecord_one(item);
                        playLogInfoItem =item;
                    }
                },
                copyBtn: {
                    _click: function() {
                        copyPlayLogResult_friendCard(item);
                    }
                },
                _click:function()
                {
                    //MjClient.getPlayLogOne(item.now,item.logid);
                    uiObj.reqRecord_one(item);
                    playLogInfoItem =item;
                },
                endScore:{
                    _run : function(){
                        this.setString("0");
                        for(var i = 0; i < item.players.length; i++){
                            var pl = item.players[i];
                            if(pl.userId == SelfUid()){
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
        if(item.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || item.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN){
            if(item.players.length == 4 && item.players[0].teamid){
                var teamA = ui.getChildByName("teamA");
                var teamB = ui.getChildByName("teamB");;

                teamA.visible = true;
                teamB.visible = true;

                var hasDefault = false;
                for(var i = 0; i < item.players.length; i++){
                    var pl = item.players[i];
                    if(pl.teamid == "A"){
                        var text = teamA.getChildByName("winAll");
                        text.ignoreContentAdaptWithSize(true);
                        text.setString(pl.t_score_total);
                    }else if(pl.teamid == "B"){
                        var text = teamB.getChildByName("winAll")
                        text.ignoreContentAdaptWithSize(true);
                        text.setString(pl.t_score_total);
                    }else{
                        teamA.visible = false;
                        teamB.visible = false;
                    }

                    if(pl.teamid == "A" && !hasDefault){
                        hasDefault = true;
                        if(pl.t_windif <= 0){
                            endScore.setProperty(pl.t_windif, "daTongZi/zhanji/shuzi.png", 25, 72, "+");
                        }else{
                            endScore.setProperty("+" + pl.t_windif, "daTongZi/gameOver/biaoti_shuzi1.png", 28, 43, "+");
                        }
                    }
                    if(pl.userId == SelfUid()){
                        hasDefault = true;
                        if(pl.t_windif <= 0){
                            endScore.setProperty(pl.t_windif, "daTongZi/zhanji/shuzi.png", 25, 72, "+");
                        }else{
                            endScore.setProperty("+" + pl.t_windif, "daTongZi/gameOver/biaoti_shuzi1.png", 28, 43, "+");
                        }
                    }
                }
            }
        }
}
var itemDTZ3;
var itemDTZ4;
var itemBZD4;
var listType;
var FriendCard_roomRecord_daTongZi = cc.Layer.extend({
    _lastId:null,
	ctor: function(data,openType,isByFCM) {
		cc.log(" ======== FriendCard_roomRecord_daTongZi  data : ",JSON.stringify(data))
		this._super();
		this._numberRecord = 0;
        this.clubData = data;
        this._clubData = data;
        this._isByFCM = isByFCM;
        this._gameName = "打筒子/炸弹";  //用于更新底部信息栏
        this._opeLastId = -1;
        this._gameType = -1;
        this._gameTypeList = []; //用于选择玩法界面
        this.tabpage = 1; //当前选择的是什么界面, 1其他玩法 2打筒子霸炸弹
        this._selectedRenshu = -1;//选择查询的人数
        this.isLMClub = FriendCard_Common.isLMClub(this._clubData.info);
        this.isManager = FriendCard_Common.isManager(this._clubData.info);
        this.isGroupLeader = FriendCard_Common.isGroupLeader(this._clubData.info);
        this.isCreator =  FriendCard_Common.isSupperManger(this._clubData.info);

        if( openType )
        {
            this.openType = openType; //1是从玩家统计中打开
            this.openPlayerInfo = data.openPlayerInfo;
        }
        else
        {
            this.openType = null;
            this.openPlayerInfo = null;
        }

		var UI = ccs.load("friendcard_roomRecord.json");
		this.addChild(UI.node);
        this.uiNode = UI.node;
		var that = this;

		var _block = UI.node.getChildByName("block");
		setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


		var _back = UI.node.getChildByName("back");
		setWgtLayout(_back, [0.9,0.9],[0.5,0.45],[0,0],false);
		this._node_1 = _back.getChildByName("Node_1");
		var _close = _back.getChildByName("close");
		_close.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				that.removeFromParent();
			}
		}, this);

		var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (FriendCard_Common.club_roleId) {
                    FriendCard_Common.club_roleId =null;
                }
                that.removeFromParent();
            }
        }, this);

        this._back = _back;

        this.Button_showReflash =  _back.getChildByName("Button_showReflash");
        COMMON_UI.setNodeTextAdapterSize(this.Button_showReflash);
        this.Button_showReflash.visible = false;
        this.Button_showReflash.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.Button_showReflash.visible = false;
                this._lastId = -1;
                this.addItems(this._tempRtn.data.list);
                //更新底部信息
                this.updateBottomMsg(this._tempRtn);
            }
        }, this);

        this._listDataCount = 0;
        this._ListView =  _back.getChildByName("list");
        var _listViewState = 0;
        this._ListView.visible = false;

        this._listView_dtz =  _back.getChildByName("list_dtz");
        this._listView_dtz.visible = false;


        var EVENT_AUTOSCROLL_ENDED = ccui.ScrollView.EVENT_AUTOSCROLL_ENDED;
        if (cc.sys.OS_WINDOWS == cc.sys.os || cc.ENGINE_VERSION.indexOf("3.16") >= 0)
            EVENT_AUTOSCROLL_ENDED = 12;
        this._ListView.addCCSEventListener(function(sender,type){
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    _listViewState = 1;
                    break;
                case EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState == 1)
                    {
                        that.reqRecord(data.info.clubId, that._lastId,that._gameType);
                    }
                    _listViewState = 0;
                    break;
            }
        });

        this._listView_dtz.addCCSEventListener(function(sender,type){
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    _listViewState = 1;
                    break;
                case EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState == 1)
                    {
                        that.reqRecord(data.info.clubId, that._lastId,that._gameType);
                    }
                    _listViewState = 0;
                    break;
            }
        });

        this._cell = this.uiNode.getChildByName("item");
        this._cell.getChildByName("tableid").x += 35;//玩法名称最多可设八个字，调整位置
        this._cell.getChildByName("fangkaRebateText").x += 20;//玩法名称最多可设八个字，调整位置
        this._cell.visible = false;

        this._itemTime = _back.getChildByName("itemTime");  // 时间
        this._itemTime.visible = false;

        this._nullTip_text = _back.getChildByName("nullTip_text");
        this._nullTip_text.ignoreContentAdaptWithSize(true);
		if (this._nullTip_text)
		{
        	this._nullTip_text.visible = false;
		}
		this._text_record = _back.getChildByName("Text_record");

        if (!this.isManager && !this.isGroupLeader)
        {
            this._text_record.setString("房间记录保留30天  战绩只保留3天");
        }else{
            if(this.isLMClub){
                this._text_record.setString("回放只保留5天");
            }
        }
        //选择玩法
        this.initManagerView(_back);
        this._initUI();
        this.initPlayerInfo(_back);
	},
    initManagerView:function(_back) {
        var that = this;
        //Panel_playertongji_manager
        //修改年月日的EditBox配置
        var setEditBoxConfig = function(_parent,_child,str,MaxLength) {
            _child.setFontColor(cc.color(0x77, 0x77, 0x77));
            _child.setMaxLength(MaxLength);
            _child.setFontSize(20);
            _child.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            _child.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            _child.setPlaceHolder(str);
            _child.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            _child.setPlaceholderFontSize(20);
            _child.setPosition(_parent.getContentSize().width / 2, _parent.getContentSize().height / 2);
            _parent.addChild(_child);
        }.bind(this);
        //输入玩家ID
        var panel_check = _back.getChildByName("panel_check");

       

        if(this.openType === "1")
        {
            panel_check.visible = false;
            panel_check.isShow = false;
        }
        else
        {
            panel_check.isShow = this.isManager || this.isGroupLeader;
            panel_check.visible = this.isManager || this.isGroupLeader;
        }

        var img_IDorName = panel_check.getChildByName("img_IDorName");
        this.panel_check = panel_check;
        this.img_IDorName = new cc.EditBox(img_IDorName.getContentSize(), new cc.Scale9Sprite("friendCards/tj_input.png"));
        setEditBoxConfig(img_IDorName, this.img_IDorName,"请输入ID",10);

        var nowTime = MjClient.getCurrentTime();
        var _start_Time = panel_check.getChildByName("image_date1_bg");
        var  point1 = _start_Time.convertToWorldSpace(_start_Time.getAnchorPointInPoints());
        point1.y = (point1.y-_start_Time.getBoundingBox().height/2);
        _start_Time.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var str =that._start_Time_date_txt.getString();
                str = str.replace(/-/g,"/");
                var date = new Date(str);
                var data = {event:"ROOM_start_Time_date_txt",date:date,px:point1.x,py:point1.y,WASD:"S"};
                that.uiNode.addChild(new friendcard_selectTime(data));
            }
        }, this);
        this._start_Time_date_txt = _start_Time.getChildByName("Text_date_start");
        this._start_Time_date_txt.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
        this._start_Time_date_txt.setFontSize(this._start_Time_date_txt.getFontSize()-2)
        this._start_Time_date_txt.ignoreContentAdaptWithSize(true);
        this._setShowTime(this._start_Time_date_txt, nowTime[0], nowTime[1], nowTime[2], "00", "00");
        UIEventBind(null, this._start_Time_date_txt, "ROOM_start_Time_date_txt", function (eD) {
            this._setShowTime(this._start_Time_date_txt,eD.year,eD.month,eD.day,eD.hour,eD.minute);
        }.bind(this));

        var _end_Time = panel_check.getChildByName("image_date2_bg");
        var  point2 = _end_Time.convertToWorldSpace(_end_Time.getAnchorPointInPoints());
        point2.y = (point2.y-_end_Time.getBoundingBox().height/2);
        _end_Time.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var str =that._end_Time_date_txt.getString();
                str = str.replace(/-/g,"/");
                var date = new Date(str);
                var data = {event:"ROOM_end_Time_date_txt",date:date,px:point2.x,py:point2.y,WASD:"S"};
                that.uiNode.addChild(new friendcard_selectTime(data));
            }
        }, this);
        this._end_Time_date_txt = _end_Time.getChildByName("Text_date_end");
        this._end_Time_date_txt.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
        this._end_Time_date_txt.setFontSize(this._end_Time_date_txt.getFontSize()-2)
        this._end_Time_date_txt.ignoreContentAdaptWithSize(true);
        
        var nextDate = new Date(nowTime[0],nowTime[1]-1,nowTime[2] + 1);
        var nextTime = MjClient.getCurrentTime(nextDate);
        this._setShowTime(this._end_Time_date_txt,nextTime[0],nextTime[1],nextTime[2],"00","00");

        UIEventBind(null, this._end_Time_date_txt, "ROOM_end_Time_date_txt", function (eD) {
            this._setShowTime(this._end_Time_date_txt,eD.year,eD.month,eD.day,eD.hour,eD.minute);
        }.bind(this));


        this.btn_check = panel_check.getChildByName("btn_check");
        this.btn_check.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.getData();
            }
        }, this);

        //玩法
        this.btn_wanFa = panel_check.getChildByName("btn_wanFa");
        this.btn_wanFa.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var data = {event:"ROOM_WANFA"};
                data._gameTypeList = this._gameTypeList;

                that.uiNode.addChild(new Friendcard_selectWanfa(data));
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Jilu_Fangjianjilu_xuanzewanfa", {uid: SelfUid()});
            }
        }, this);
        UIEventBind(null, this.btn_wanFa, "ROOM_WANFA", function (eD) {
            if (eD.gameType != -1){
                this.btn_wanFa.setTitleText(eD.gameName);
                this.btnOtherFunc.setTitleText(eD.gameName);
                this._gameType = eD.gameType;
            }else{
                this.btn_wanFa.setTitleText("全部玩法");
                this.btnOtherFunc.setTitleText("全部玩法");

                this._gameType = -1;
            }
            this._selectedRenshu = eD.renshu;
            this.getData();
        }.bind(this));

    },
    _setShowTime:function(node,txt_1,txt_2,txt_3,txt_4,txt_5){
        if((txt_2+"").length < 2){
            txt_2 = "0"+txt_2;
        }
        if((txt_3+"").length < 2){
            txt_3 = "0"+txt_3;
        }
        if((txt_4+"").length < 2){
            txt_4 = "0"+txt_4;
        }
        if((txt_5+"").length < 2){
            txt_5 = "0"+txt_5;
        }
        node.setString(txt_1+"-"+txt_2+"-"+txt_3+"\n"+txt_4+":"+txt_5);
    },
    //校准时间的合法性
    is_RightData: function() {
        this._start_time = this._start_Time_date_txt.getString();
        this._end_time = this._end_Time_date_txt.getString();
        var time_1 = FriendCard_Common.transdate(this._start_time.substring(0,4),Number(this._start_time.substring(5,7))-1,this._start_time.substring(8,10),this._start_time.substring(11,13),this._start_time.substring(14,16));
        var time_2 = FriendCard_Common.transdate(this._end_time.substring(0,4),Number(this._end_time.substring(5,7))-1,this._end_time.substring(8,10),this._end_time.substring(11,13),this._end_time.substring(14,16));

        if(!time_1 || !time_2) return false;

        this._start_time_date = time_1 < time_2 ? time_1:time_2;
        this._end_time_date = time_1 > time_2 ? time_1:time_2;
        if(time_1  > time_2){
            var endTime = this._end_time;
            this._end_time = this._start_time;
            this._start_time = endTime;
        }
        return true;
    },
    getData:function () {
        this.reqRecord(this.clubData.info.clubId,-1,this._gameType);
    },
    doAutoReflash:function () {
        if(this.isManager || this.isGroupLeader){
            var that= this;
            //管理员15秒自动刷新
            this.stopActionByTag(20190304);
            this.runAction(cc.repeatForever(cc.sequence(cc.delayTime(15),cc.callFunc(function () {
                that.reqRecord(that._clubData.info.clubId, -1, that._gameType,"autoReflash");
            })))).setTag(20190304);
        }
    },
    initPlayerInfo:function(back)
    {
        //this.openPlayerInfo
        var img_head = back.getChildByName("img_head");
        if(img_head && this.openType && this.openType === "1")
        {
            MjClient.loadImgQX(this.openPlayerInfo.headimgurl ? this.openPlayerInfo.headimgurl : "png/default_headpic.png", {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(img_head))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                //img_head= item.getChildByName("Image_head");
                sp.setScale((img_head.width - 8) / sp.width);
                sp.setPosition(cc.p(img_head.width / 2, img_head.height / 2));
                img_head.addChild(sp);
            });

            var  name = img_head.getChildByName("text_name");
            name.ignoreContentAdaptWithSize(true);
            name.setString(getNewName(unescape(this.openPlayerInfo.nickname)));
            name.setFontName("Arial");
            name.setFontSize(name.getFontSize());

            var id = img_head.getChildByName("text_id");
            id.ignoreContentAdaptWithSize(true);
            id.setString("ID："+this.openPlayerInfo.userId);

            img_head.visible = true;
        }
        else if(img_head)
        {
            img_head.visible = false;
        }
    },
    _initUI : function(){

        itemDTZ4 = this.uiNode.getChildByName("itemDTZ4");
        itemDTZ4.visible = false;
        itemDTZ3 = this.uiNode.getChildByName("itemDTZ3");
        itemDTZ3.visible = false;
        itemBZD4 = this.uiNode.getChildByName("itemBZD4");
        itemBZD4.visible = false;

        this.btnOtherFunc =this._back.getChildByName("btnOtherFunc");
        this.btnOtherFunc.visible = (this.openType === "1");
        this.btnOtherFunc._preVisible = this.btnOtherFunc.visible;
        if(this.openPlayerInfo){
            this._gameType = this.openPlayerInfo.gameType;
            var gameName = this._gameType != -1 ? GameCnName[this._gameType] : "全部玩法";
            if(this.btnOtherFunc.getChildByName("Text")){
                this.btnOtherFunc.getChildByName("Text").setString(gameName);
            }else{
                this.btnOtherFunc.setTitleText(gameName);
            }
        }
        var titleList = this._back.getChildByName("titleList");

        var typeTab = this._back.getChildByName("typeTab");
        var dtz = typeTab.getChildByName("dtz");
        //dtz.titleText = "打筒子/炸弹";
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
            that.Button_showReflash.visible = false;
            listType = tabIndex;
            that.panel_check.visible = that.panel_check.isShow;
            if(tabIndex == 0){
                that.tabpage = 2;
                that.btnOtherFunc.visible = false;
                titleList.visible = true;
                that._listView_dtz.visible = true;
                that.panel_check.getChildByName("btn_wanFa").visible = false;
                that._ListView.visible = false;
                that._listView_dtz.visible = true;
                that.reqRecord(that.clubData.info.clubId,that._opeLastId,null)
                postEvent("changeLogType", {});
            }else if(tabIndex == 1)
            {
                that.tabpage = 1;
                that.btnOtherFunc.visible = that.btnOtherFunc._preVisible;
                titleList.visible = false;
                that._listView_dtz.visible = false;
                that.panel_check.getChildByName("btn_wanFa").visible = true;
                that._ListView.visible = true;
                that._listView_dtz.visible = false;
                that.reqRecord(that.clubData.info.clubId,that._opeLastId,null)
                postEvent("changeLogType", {});
            }

 
        };
        if(!this.openPlayerInfo || this._gameType == -1){
            this.btnOtherFunc.addTouchEventListener(function(sender, type) {
                if (type == 2) {

                    var data = {event:"ROOM_WANFA"};
                    data._gameTypeList = this._gameTypeList;

                    that.uiNode.addChild(new Friendcard_selectWanfa(data));
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Jilu_Fangjianjilu_xuanzewanfa", {uid: SelfUid()});
                }
            }, this);

            dtz.addTouchEventListener(function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        this._gameName = "打筒子/炸弹";
                        switchTab(0)
                        break;
                    default:
                        break;
                }
            }, this);

            other.addTouchEventListener(function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        this._gameName = "其他游戏";
                        switchTab(1);
                        break;
                    default:
                        break;
                }
            }, this);
        }


        if(this._gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || this._gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN){
            switchTab(0);
        }else{
            switchTab(1);
        }
        this.doAutoReflash();
    },


	reqRecord: function(clubId,lastId,gameType,reflashType) {
		var that = this;
        var requestInfo = {
            lastId: lastId == -1 ? null : lastId,
            gameType: gameType == -1 ? null : gameType,
            tabpage: that.tabpage ? that.tabpage : 1  //tabpage邵阳独有的, tabpage1 请求其他玩法战绩,tabpage2 请求打筒子战绩
        };
        if(this.isLMClub){
            requestInfo.leagueId = clubId;
        }else{
            requestInfo.clubId = clubId;
        }
        if(this.openType === "1")
        {
            requestInfo.userId = this.openPlayerInfo.userId;
            requestInfo.startTime = this.openPlayerInfo.startTime;
            requestInfo.endTime = this.openPlayerInfo.endTime;
            requestInfo.max = this.openPlayerInfo.fensuData.max;
            requestInfo.min = this.openPlayerInfo.fensuData.min;
            requestInfo.groupId = this.openPlayerInfo.group;
        }
        else {
            if (this.is_RightData() && (this.isManager || this.isGroupLeader)) { //房间记录只有管理员可以选择时间段
                requestInfo.startTime = this._start_time_date;
                requestInfo.endTime = this._end_time_date;
                var oneDayTime = 86400000;
                if ((this._end_time_date - this._start_time_date) > oneDayTime * 7) {
                    if (reflashType != "autoReflash") {
                        MjClient.showToast("时间搜索跨度不能超过7天。")
                    }
                    return;
                }
            } else if ((this.isManager || this.isGroupLeader)) {
                MjClient.showToast("输入日期不合法")
                return;
            }

            //查询玩家ID
            if (this.img_IDorName && this.img_IDorName.getString().length > 2)
                requestInfo.userId = this.img_IDorName.getString();
        }
        if (this._selectedRenshu != -1) { //人数
            requestInfo.renshu = this._selectedRenshu
        }

        var api = "";
        if (this._isByFCM) {
            api = this.isLMClub ? "pkplayer.handler.leagueMpGameRecord" : "pkplayer.handler.clubMpGameRecord";
        }
        else {
            api = this.isLMClub ? "pkplayer.handler.leagueGameRecord" : "pkplayer.handler.clubGameRecord";
        }
        cc.log(api + ":" + JSON.stringify(requestInfo));

        MjClient.block();
		MjClient.gamenet.request(api, requestInfo,
			function(rtn) {

                MjClient.unblock();
                if (!cc.sys.isObjectValid(that))
                    return;

				if (rtn.code == 0) {
                    if((reflashType && reflashType == "autoReflash")){
                        //自动刷新的先保存数据
                        that.checkHasNewData(rtn);
                    }else{
                        that._gameType = gameType;
                        that._lastId = lastId;
                        that.addItems(rtn.data.list);
                        //更新底部信息
                        that.updateBottomMsg(rtn);
                    }
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);

					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}
				}
                that.doAutoReflash();
			}
		);
	},
    checkHasNewData:function(rtn){
        var listData = rtn.data.list;
        var tempFistId = -1;
        if(listData && listData.length > 0){

            for(var i = 0;i < listData.length ;i++)
            {
                var logInfo = listData[i];
                if((logInfo.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || logInfo.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN)
                    && logInfo.players.length == 4){
                    if(this._listView_dtz.visible){
                        tempFistId = logInfo.id;
                        break;
                    }
                }else if((logInfo.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || logInfo.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN)
                    && (logInfo.players.length == 3 || logInfo.players.length == 2)){
                    if(this._listView_dtz.visible){
                        tempFistId = logInfo.id;
                        break;
                    }
                } else{
                    if(this._ListView.visible){
                        tempFistId = logInfo.id;
                        break;
                    }
                }
            }
        }
        this.Button_showReflash.visible = (tempFistId != this._firstId);
        this._tempRtn = rtn;
    },
    //更新底部信息
    updateBottomMsg:function(rtn)
    {
        if ((this.isManager || this.isGroupLeader))
        {
            //从统计那里进来 显示的不一样 _listView_dtz
            if (this.openType === "1")
            {
                var str =this.openPlayerInfo.fensuData.text +"  ";
                if (this.openPlayerInfo.startTime && this.openPlayerInfo.endTime)
                    str += this.passUxinGetTime(this.openPlayerInfo.startTime)+"- "+this.passUxinGetTime(this.openPlayerInfo.endTime - 86400000)+"  ";
                str += " 回放只保留5天"

                if (this._text_record)
                    this._text_record.setString(str);
            }
            else if(this.img_IDorName && this.img_IDorName.getString().length > 2)
            {
                this._text_record.setString("");
            }
            else
            {
                this._text_record.setString("回放只保留5天");
                /*if(this.isLMClub){
                    this._text_record.setString("回放只保留5天");
                }else{
                    var str = "今日： " + rtn.data.today + "场       昨日：" + rtn.data.yesterday + "场";
                    this._text_record.setString(str  + "   回放只保留5天");
                }*/
                
            }
        }
    },

    //通过时间戳来获得年月日
    passUxinGetTime:function(Uxin)
    {
        var date = new Date(Uxin)
        var Y = date.getFullYear() + '.';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
        var D = date.getDate() + ' ';
        // h = date.getHours() + ':';
        // m = date.getMinutes() + ':';
        // s = date.getSeconds();
        return Y+M+D;
    },
    sortLog: function(oneData)
    {
        var players = oneData.players;
        players.sort(function(p1, p2){
            return p2.score - p1.score;
        })
    },
    createItem:function(oneData){
        this.sortLog(oneData);
        var WinerId = oneData.winner;
        var copyNode = this._cell.clone();
        copyNode.visible = true;
        
        this._numberRecord ++;


        var num = copyNode.getChildByName("num");
        num.ignoreContentAdaptWithSize(true);
        num.setString(this._numberRecord + "")
        
        var gameType = copyNode.getChildByName("gameType");
        gameType.ignoreContentAdaptWithSize(true);
        if (oneData.ruleName) {
            gameType.setString(unescape(oneData.ruleName));
        }
        else if((MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && oneData.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG){
            gameType.setString("六胡抢"); 
        }else if((MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
         MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
         MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && oneData.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA){
            gameType.setString("十胡卡");
        }
        else{

            gameType.setString(GameCnName[oneData.gameType]); 
        }
        
        this._gameTypeList.push(oneData.gameType);
        var tableid = copyNode.getChildByName("tableid"); //roomNum
        tableid.ignoreContentAdaptWithSize(true);
        tableid.setString(" "+oneData.roomNum);

        var fangkaRebateText = copyNode.getChildByName("fangkaRebateText");
        fangkaRebateText.ignoreContentAdaptWithSize(true);
        fangkaRebateText.setVisible(true);
        fangkaRebateText.setString("");
        if(oneData.fangkaRebate && this.isCreator){
            if(oneData.fangkaRebate == -1){
                fangkaRebateText.setString("免");
                fangkaRebateText.setTextColor(tableid.getTextColor());
            }else {
                fangkaRebateText.setString(oneData.fangkaRebate);
                fangkaRebateText.setTextColor(cc.color("#000000"));
            }
        }
        if(oneData.matchScoreLimitUser && Object.keys(oneData.matchScoreLimitUser).length > 0){
            fangkaRebateText.setString(fangkaRebateText.getString() +"(低分解散)");
        }

        var post = copyNode.getChildByName("cost");
        if(post){
            post.ignoreContentAdaptWithSize(true);
            post.setString( "-"+ oneData.cost)
            post.setVisible(false);
        }


        var huifang = copyNode.getChildByName("huifang");
        if (!huifang) {
            //有些地区前面有空格
            huifang = copyNode.getChildByName(" huifang");
        }
        if (huifang) {
            huifang.setVisible(oneData.playbackUrl?true:false);
        }
        if (oneData.roundNum && oneData.roundNum < 40 && oneData.roundBeen) {
            tableid.setString(" "+oneData.roomNum +" (" +oneData.roundBeen + "/" + oneData.roundNum + "" + ")");
        }

        var _info = copyNode.getChildByName("Text_1");
        if(_info){
            _info.ignoreContentAdaptWithSize(true);
            var playString = "";
            switch (oneData.payWay) {
                case 0:
                    playString += "房主付"
                    break;
                case 1:
                    playString += "AA付"
                    break;
                case 2:
                    playString += "亲友圈付"
                    break;
            }
            _info.setString(oneData.roundNum + "局" + "," + playString);
            if(oneData.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI ||
                oneData.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG ||
                oneData.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN){
                _info.setString(playString);
            }
        }


        function nameText(idx) {
            if (!oneData.players[idx]) {
                cc.log("Error:data.players is null");
                return "";
            }
            var _name = copyNode.getChildByName("player" + idx);
            if( _name.getChildByName("tagIcon")){
                if (oneData.players[idx].userId == WinerId) {
                    _name.getChildByName("tagIcon").visible = true;
                } else {
                    _name.getChildByName("tagIcon").visible = false;
                }
            }

            //ID
            var playerID = _name.getChildByName("playerID");
            if(playerID)
            {
                playerID.ignoreContentAdaptWithSize(true);
                if(oneData.players[idx].isDiffClub){
                    playerID.setString("(" + FriendCard_Common.getHideIdStr(oneData.players[idx].userId) + ")");
                }else{
                    playerID.setString("(" + oneData.players[idx].userId + ")");
                }

            }
            //分数
            var playerScore = _name.getChildByName("playerScore");
            if(Number(oneData.players[idx].score)> 0  && playerScore)
            {
                playerScore.ignoreContentAdaptWithSize(true);
                playerScore.setTextColor(cc.color(208, 88, 60));
                _name.zIndex = 1;
                if(oneData.players[idx].score != undefined) playerScore.setString(" +" +  Number(oneData.players[idx].score));
            }
            else if(playerScore)
            {
                playerScore.ignoreContentAdaptWithSize(true);
                playerScore.setTextColor(cc.color(72, 132, 162));
                _name.zIndex = 1;
                if(oneData.players[idx].score != undefined) playerScore.setString(" " +  Number(oneData.players[idx].score));
            }

            return getNewName_new(unescape(oneData.players[idx].nickname), 6);
        }

        var player0 = copyNode.getChildByName("player0");
        player0.ignoreContentAdaptWithSize(true);
        player0.setString(nameText(0));
        
        var player1 = copyNode.getChildByName("player1");
        player1.ignoreContentAdaptWithSize(true);
        player1.setString(nameText(1));
        
        var player2 = copyNode.getChildByName("player2");
        player2.ignoreContentAdaptWithSize(true);
        if (oneData.players.length >= 3) {
            player2.setString(nameText(2));
        } else {
            player2.visible = false;
        }
        
        
        var player3 = copyNode.getChildByName("player3");
        player3.ignoreContentAdaptWithSize(true);
        if (oneData.players.length >= 4) {
            player3.setString(nameText(3));
        } else {
            player3.visible = false;
        }
        
        
        var time = copyNode.getChildByName("time");
        var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy-MM-dd hh:mm:ss');
        time.ignoreContentAdaptWithSize(true);
        time.setString(_timeStr);
        copyNode.setTag(this._numberRecord);
        copyNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var playUrl = oneData.playbackUrl;
                if(!playUrl){
                    return;
                }
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Jilu_Chakanhuifang", {uid:SelfUid()});
                //var index = sender.getTag();
                //cc.log(" ========= index", index);
                this.reqRecord_one(oneData);
            }
        },this);

        var copyBtn = copyNode.getChildByName("copyBtn");
        if (copyBtn) {
            copyBtn.addTouchEventListener(function(sender, Type) {
            if (Type != ccui.Widget.TOUCH_ENDED)
                return;

                copyPlayLogResult_friendCard(oneData);
            });
        }

        this._lastId = oneData.id;
        return copyNode;
    },
    createTimeItem:function(oneData,str)
    {   
        var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy-MM-dd');
        if(str === "dtz")
        {
            if(this._listView_dtz._timeStr == _timeStr)
            {
                return;
            }
            var copyNode = null;
            copyNode = this._itemTime.clone();
            this._listView_dtz._timeStr = _timeStr
            copyNode.visible = true;
            
            var text_time = copyNode.getChildByName("text_time");
            text_time.ignoreContentAdaptWithSize(true);
            text_time.setString(_timeStr);
            this._listView_dtz.pushBackCustomItem(copyNode); 
        }
        else
        {
            if(this._ListView._timeStr == _timeStr)
            {
                return;
            }
            var copyNode = null;
            copyNode = this._itemTime.clone();
            this._ListView._timeStr = _timeStr
            copyNode.visible = true;
            
            var text_time = copyNode.getChildByName("text_time");
            text_time.ignoreContentAdaptWithSize(true);
            text_time.setString(_timeStr);
            this._ListView.pushBackCustomItem(copyNode); 
        }
       
    },
    addItems:function(data)
    {
        var _datalList = data;
        this._listDataCount += _datalList.length;

        if (this._lastId == -1) {
            this._ListView._timeStr = ""
            this._listView_dtz._timeStr = ""
            this._ListView.removeAllItems();
            this._listView_dtz.removeAllItems();
            this._numberRecord = 0;
            this._listDataCount = _datalList.length;

            this._firstId = -1;
        }
        var _len = this._ListView.getItems().length;
        var _lenDtz = this._listView_dtz.getItems().length;
        //将房间记录列表当天倒叙排列
        data.sort(function(a, b) {
             return b.createTime - a.createTime;
        });

        for(var i = 0;i < _datalList.length ;i++)
        {

            var logInfo = _datalList[i];
            if((logInfo.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || logInfo.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN) 
                && logInfo.players.length == 4){
                var item = itemDTZ4.clone();
                if(logInfo.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN && !logInfo.players[0].teamid){
                    item = itemBZD4.clone();
                }
                item.visible=true;
                item.isCreator = ((this.isLMClub && this.isManager) ||  this.isCreator);
                this.createTimeItem(data[i],"dtz");
                this._listView_dtz.pushBackCustomItem(item);
                BindLogItem_daTongZi(item,logInfo,i, false, this);  
                this._lastId = logInfo.id;
                if(this._listView_dtz.visible && this._firstId < 0 && _len == 0){
                    this._firstId = logInfo.id;
                }
            }else if((logInfo.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || logInfo.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN)
                 && (logInfo.players.length == 3 || logInfo.players.length == 2)){
                var item = itemDTZ3.clone();
                item.visible=true;
                item.isCreator = ((this.isLMClub && this.isManager) ||  this.isCreator);
                this.createTimeItem(data[i],"dtz");
                this._listView_dtz.pushBackCustomItem(item);
                BindLogItem_daTongZi(item,logInfo,i, true, this); 
                this._lastId = logInfo.id;
                if(this._listView_dtz.visible && this._firstId < 0 && _len == 0){
                    this._firstId = logInfo.id;
                }
            }
            else{
                this.createTimeItem(data[i],"other");
                this._ListView.pushBackCustomItem(this.createItem(_datalList[i]));
                if(this._ListView.visible && this._firstId < 0 && _len == 0){
                    this._firstId = logInfo.id;
                }
            }
        }
        this._ListView.jumpToItem(_len, cc.p(0.5, 1.0), cc.p(0.5, 1.0));
        this._listView_dtz.jumpToItem(_lenDtz, cc.p(0.5, 1.0), cc.p(0.5, 1.0));
        if (this._listDataCount == 0)
        {
            if (this._nullTip_text) {
                this._nullTip_text.visible = true;
            }
            else {
                // MjClient.showToast("已显示所有房间记录");
            }
        }else{
            if (this._nullTip_text) {
                this._nullTip_text.visible = false;
            }
        }
    },
    reqRecord_one: function(oneData) {
        var playUrl = oneData.playbackUrl;
        if(!playUrl){
            MjClient.showToast("文件已过期，不能回放");
            return;
        }
        var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy-MM-dd hh:mm:ss');
        for (var i = 0; i < oneData.players.length; i++)
        {
            oneData.players[i].uid = oneData.players[i].userId;
        }
        oneData.tableid = oneData.roomNum;
        oneData.gametype = oneData.gameType;
        oneData.now = _timeStr;
        oneData.isClub = true;
        playLogInfoItem = oneData;

        var dialog = new UnclosedTipLayer("正在获取回放数据，请不要离开游戏");
        MjClient.Scene.addChild(dialog);
        var xhr = cc.loader.getXMLHttpRequest();
        //var playUrl = GamePlaybackUrlPrefix[MjClient.getAppType()] + _timeStr.substr(0, 10) + "/" + this.clubData.info.creator + "_" + oneData.roomNum + ".json";
        cc.log(" ==== playUrl : ", playUrl);
        xhr.open("GET", playUrl);
        xhr.onreadystatechange = function() {
            if(cc.sys.isObjectValid(dialog)) dialog.removeFromParent();
            if (xhr.readyState == 4 && xhr.status == 200) {
                try {
                    var rep = JSON.parse(xhr.responseText);
                    var keys = Object.keys(rep[0].data.players);
                    if (keys.indexOf(SelfUid() + "") == -1)
                    {
                        MjClient.otherReplayUid = Number(keys[0]); // 代理查看其他牌局的视角
                        FriendCard_Common.club_roleId = Number(keys[0]);
                    }
                    MjClient.playLogOne(rep);
                } catch (e) {
                    MjClient.showToast("网络不好，请稍后再试.");
                }
            }
        };
        xhr.onerror = function(event) {
            if(cc.sys.isObjectValid(dialog)) dialog.removeFromParent();
            MjClient.showToast("网络请求错误，请稍后再试...");
        };
        xhr.ontimeout = function (event)
        {
            if(cc.sys.isObjectValid(dialog)) dialog.removeFromParent();
            MjClient.showToast("网络超时，请稍后再试");
        };
        xhr.onabort = function (event)
        {
            if(cc.sys.isObjectValid(dialog)) dialog.removeFromParent();
            MjClient.showToast("网络请求中断，请稍后再试");
        };
        xhr.timeout = 5000; //5s超时
        xhr.send();
    },
   
});


