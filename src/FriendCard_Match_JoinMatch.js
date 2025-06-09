// 
var FriendCard_Match_joinLayer = cc.Layer.extend({

    ctor: function (data) {
        this._super();
        this.matchId = null;
        var node = ccs.load("friendCard_Match_joinMatch.json").node;
        this.addChild(node);
        this.node = node;
        var back = node.getChildByName("back")
        setWgtLayout(node.getChildByName("block"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("back"), [1, 1], [0.5, 0.5], [0, 0]);
        if(data.info.leagueId){
            this.clubId = data.info.leagueId;
        }else{
            this.clubId = data.info.clubId;
        }
        this.subClubId = data.subClubId;
        this.reqMatchInfo(this.clubId);


        var btn_close = back.getChildByName("btn_close");
        btn_close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);

        this.ListView_1 = back.getChildByName("ListView_1");
        this.item = back.getChildByName("Panel_1");
        this.item.visible = false;

        this._tip = back.getChildByName("Text_null");
        if(this._tip)
            this._tip.visible = false;

    },

    createItem: function (itemData) {
        var that = this;
        var item = this.item.clone();
        item.visible = true;
        item.getChildByName("Text_matchName").setString(unescape(itemData.title));//比赛名称
        
        
        var Text_matchTime = item.getChildByName("Text_matchTime");
        var Text_title_matchTime = item.getChildByName("Text_title_matchTime");
        var Text_title_score = item.getChildByName("Text_title_score");
        var Text_score = item.getChildByName("Text_score");

        //时间与分数位置调换
        var firstLineY = Text_title_matchTime.y;
        Text_title_matchTime.y = Text_title_score.y;
        Text_matchTime.y = Text_title_score.y;
        Text_title_score.y = firstLineY;
        Text_score.y = firstLineY;

        var startTimeStr = MjClient.dateFormat(new Date(parseInt(itemData.startTime)), 'MM.dd');
        var endTimeStr = MjClient.dateFormat(new Date(parseInt(itemData.endTime)), 'MM.dd');
        var curTime = (new Date()).getTime();
        var remainDay = Math.floor((itemData.endTime - curTime)/1000/60/60/24);
        if (remainDay == 0) {
            remainDay = 1;
        }
        Text_score.setString(itemData.scoreInitial);//比赛积分
        Text_title_matchTime.setString("时长:"+startTimeStr+"-"+endTimeStr);
        Text_title_matchTime.ignoreContentAdaptWithSize(true);
        Text_matchTime.setString("(剩余"+remainDay+"天)");//比赛时间
        Text_matchTime.x = Text_title_matchTime.x + Text_title_matchTime.width+5;

        item.matchId = itemData.matchId
        item.getChildByName("btn_sign").addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.reqJoinMatch(that.clubId, sender.getParent().matchId);
                this.removeFromParent();
            }
        }, this);
        return item;
    },

    addItem: function (data) {
        if (!cc.sys.isObjectValid(this)){
            return;
        }
        this.ListView_1.removeAllItems();
        for (var i = 0; i < data.length; i++) {
            this.ListView_1.pushBackCustomItem(this.createItem(data[i]));
        }

        if(this._tip){
            if(data.length == 0){
                this._tip.visible = true;
            }else{
                this._tip.visible = false;
            }
        }
        

    },

    reqMatchInfo: function (clubId) {
        var that = this;
        MjClient.block();
        var jiekouName, sendInfo;
        if (clubId <= 9999) {
            jiekouName = "pkplayer.handler.leagueMatchInfo";
            sendInfo = {
                leagueId: clubId,
            }
        } else {
            jiekouName = "pkplayer.handler.clubMatchInfo";
            sendInfo = {
                clubId: clubId,
            }
        }
        sendInfo.tab = 1; //0:比赛管理 1:参赛列表
        MjClient.gamenet.request(jiekouName, sendInfo,
            function (rtn) {
                MjClient.unblock();
                if (rtn.code == 0) {
                    that.addItem(rtn.data.list);

                } else {
                    MjClient.showToast(rtn.message);
                }

            }
        );
    },

    reqJoinMatch: function (clubId, matchId) {
        var that = this;
        var thatParent = MjClient.FriendCard_main_ui;//
        MjClient.block();
        var jiekouName, sendInfo;
        //cc.log("====== clubId ",clubId);
        if (clubId <= 9999) {
            jiekouName = "pkplayer.handler.leagueJoinMatch";
            sendInfo = { leagueId: clubId, matchId: matchId, clubId: that.subClubId, }
        } else {
            jiekouName = "pkplayer.handler.clubJoinMatch";
            sendInfo = { clubId: clubId, matchId: matchId, }
        }
        MjClient.gamenet.request(jiekouName, sendInfo,
            function (rtn) {
                MjClient.unblock();
                if (rtn.code == 0) {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    }
                    if(thatParent){
                        thatParent._matchData = rtn.matchUser;
                        thatParent.refreshInfo();
                    }
                    

                    if (cc.sys.isObjectValid(that)) {
                        that.removeFromParent(true);
                    }
                } else {
                    MjClient.showToast(rtn.message);
                }

            }
        );
    },


    onExit: function () {
        this._super();

    },
});