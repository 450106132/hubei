//-比赛场排行榜
var FriendCard_Match_rankLayer = cc.Layer.extend({

    ctor: function (clubData, clubId, matchId, subClubId) {
        this._super();
        this.clubData = clubData;
        this.clubId = clubId;
        this.matchId = matchId;
        this._type = 1;
        var that = this;
        var self = this;
        var node = ccs.load("friendCard_Match_rank.json").node;
        this.addChild(node);
        this.node = node;

        this._pageIdx1 = 0;
        this._pageIdx2 = 0;
        this._pageIdx3 = 0;
        this._data = null;
        this._myData = null;
        this.historyPageCount = 0;
        this.subClubId = subClubId;

        var back = node.getChildByName("back")
        setWgtLayout(node.getChildByName("block"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("back"), [1, 1], [0.5, 0.5], [0, 0]);
        this._bcak = back;
        this.btn_close = back.getChildByName("btn_close");
        this.btn_close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);


        this._cell = back.getChildByName("cell");
        this._cell.visible = false;
        this.btn_score = back.getChildByName("btn_score");
        this.btn_join = back.getChildByName("btn_join");
        this.btn_win = back.getChildByName("btn_win");
        this.txt_title = back.getChildByName("txt_title");
        this.txt_title.setString("");
        this.txt_cycc = back.getChildByName("Panel_title").getChildByName("txt_cycc");
        if (FriendCard_Common.getSkinType() == 4) {
            this.Image_title = back.getChildByName("Image_title");
        }

        this.listView_score = back.getChildByName("listView_score");
        this.listView_join = back.getChildByName("listView_join");
        this.listView_win = back.getChildByName("listView_win");

        var setBtnBright = function(btn, bEnable){
            btn.setBright(bEnable);
            if (FriendCard_Common.getSkinType() == 4) {
                btn.getChildByName("txt_normal").visible = bEnable;
                btn.getChildByName("txt_select").visible = !bEnable;
            }
        }
        var setSelect = function (type) {
            this._type = type;
            setBtnBright(this.btn_score, type !== 1);
            this.listView_score.setVisible(type == 1);
            setBtnBright(this.btn_join, type !== 3);
            this.listView_join.setVisible(type == 3);
            setBtnBright(this.btn_win, type !== 2);
            this.listView_win.setVisible(type == 2);
            if (FriendCard_Common.getSkinType() == 4) {
                var titleFile = type == 1 ? "jifenbang" : type == 3 ? "canyubang" : "shengjubang";
                this.Image_title.loadTexture("friendCards_Match/title/"+titleFile+".png");
            }
            var str = type == 1 ? "积分" : type == 3 ? "参与场次" : "胜局";
            this.txt_cycc.setString(str);
            if (this["userIdType" + type]){
                this._userIdEditBox.setString(this["userIdType" + type]);
                that.btn_search.visible = false;
                that.btn_clear.visible = true;
            }else{
                this._userIdEditBox.setString("");
                that.btn_search.visible = true;
                that.btn_clear.visible = false;
            }
            
            

        }.bind(this);
        this.btn_score.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.reqRankData(1);
                this._type = 1;
                setSelect(1)
            }
        }, this);



        this.btn_join.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.reqRankData(3);
                this._type = 3;
                setSelect(3)
            }
        }, this);


        this.btn_win.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.reqRankData(2);
                this._type = 2;
                setSelect(2)
            }
        }, this);


        this._myHead = back.getChildByName("Image_head");
        this.txt_score = back.getChildByName("txt_score");
        this.txt_score.setString("积分榜：");
        this.txt_join = back.getChildByName("txt_join");
        this.txt_join.setString("参与榜：");
        this.txt_win = back.getChildByName("txt_win");
        this.txt_win.setString("胜局榜：");

        this.txt_score_n = back.getChildByName("txt_score_0");
        this.txt_score_n.setString("积分：");
        this.txt_join_n = back.getChildByName("txt_join_0");
        this.txt_join_n.setString("参与：");
        this.txt_win_n = back.getChildByName("txt_win_0");
        this.txt_win_n.setString("胜局：");

        this.txt_name = back.getChildByName("txt_name");
        this.txt_name.setString("");
        this.txt_id = back.getChildByName("txt_id");
        this.txt_id.setString("");


        this.listView_history = back.getChildByName("listView_history");
        this.listView_history.width *= 1.5;
        this._cellHistory = back.getChildByName("cell_match");
        this._cellHistory.ignoreContentAdaptWithSize(true);
        this.listView_history.visible = false;
        this._cellHistory.visible = false;

        this._btnHistory = back.getChildByName("btn_history");
        this._btnHistory.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.historyPageCount = 0;
                this.reqHistoryData();
                that.listView_history.setVisible(true);
            }
        }, this);
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            status: null,
            onTouchBegan: function(touch, event) {
                if (that.listView_history.isVisible()) {
                    that.listView_history.setVisible(false);
                    return true;
                } else {
                    return false;
                }
            },
        }, that.listView_history);

        var _listViewState = 0;
        this.listView_score.addCCSEventListener(function(sender, type) {
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    if (_listViewState == 0) {
                        _listViewState = 1;
                    }

                    break;
                case ccui.ScrollView.EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState == 1) {
                        self.reqRankData(1);
                    }

                    _listViewState = 0;
                    break;
            }
        });
        var _listViewState2 = 0;
        this.listView_join.addCCSEventListener(function(sender, type) {
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    if (_listViewState2 == 0) {
                        _listViewState2 = 1;
                    }
                    break;
                case ccui.ScrollView.EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState2 == 1) {
                        self.reqRankData(3);
                    }
                    _listViewState2 = 0;
                    break;
            }
        });

        var _listViewState3 = 0;
        this.listView_win.addCCSEventListener(function(sender, type) {
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    if (_listViewState3 == 0) {
                        _listViewState3 = 1;
                    }
                    break;
                case ccui.ScrollView.EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState3 == 1) {
                        self.reqRankData(2);
                    }
                    _listViewState3 = 0;
                    break;
            }
        });

        var _listViewState4 = 0;
        this.listView_history.addCCSEventListener(function(sender, type) {
            var EVENT_AUTOSCROLL_ENDED = ccui.ScrollView.EVENT_AUTOSCROLL_ENDED;
            if (cc.sys.OS_WINDOWS == cc.sys.os || cc.ENGINE_VERSION.indexOf("3.16") >= 0){
                EVENT_AUTOSCROLL_ENDED = 12;
            }
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    if (_listViewState4 == 0) {
                        _listViewState4 = 1;
                    }
                    break;
                case EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState4 == 1) {
                        self.reqHistoryData();
                    }
                    _listViewState4 = 0;
                    break;
            }
        });
        this.clearDate_ui();
        this.initSearch();
        this.reqRankData(1);
        this._type = 1;
        setSelect(1)
        this.setSelect = setSelect;
        

    },
    initSearch: function(){
        var that = this;
        this.userIdType1 = 0;
        this.userIdType2 = 0;
        this.userIdType3 = 0;

        var back = this.node.getChildByName("back");
        var img_search = back.getChildByName("img_search");
        var userIdEditBox = new cc.EditBox(img_search.getContentSize(), new cc.Scale9Sprite());
        this._userIdEditBox = userIdEditBox;
        userIdEditBox.setFontColor(cc.color("c3c3c3"));
        userIdEditBox.setMaxLength(10);
        userIdEditBox.setFontSize(20);
        userIdEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        userIdEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        userIdEditBox.setFontName("fonts/lanting.TTF");
        userIdEditBox.setPlaceholderFontSize(20);
        userIdEditBox.setPlaceHolder("输入ID快速查找");
        userIdEditBox.setPosition(img_search.width / 2, img_search.height / 2);
        img_search.addChild(userIdEditBox);

        this.btn_search = img_search.getChildByName("btn_search");
        this.btn_clear = img_search.getChildByName("btn_clear");
        this.btn_search.visible = true;
        this.btn_clear.visible = false;

        this.btn_search.addTouchEventListener(function(sender, type) {
            if (type == 2) {
               var userId = userIdEditBox.getString();
               if (userId.length>0) {
                   that["userIdType" + that._type] = parseInt(userId);
                   that["_pageIdx" + that._type] = -1;
                   that["_pageIdx2" + that._type] = -1;
                   var _scroll = that._type == 1 ? that.listView_score : that._type == 3 ? that.listView_join : that.listView_win;
                   _scroll.removeAllItems();
                   that.reqRankData(that._type);
                   that.btn_search.visible = false;
                   that.btn_clear.visible = true;
               }
            }
        });
        this.btn_clear.addTouchEventListener(function(sender, type) {
            if (type == 2) {
               userIdEditBox.setString("");
               that["userIdType" + that._type] = 0;
               that["_pageIdx" + that._type] = -1;
               that["_pageIdx2" + that._type] = -1;
               var _scroll = that._type == 1 ? that.listView_score : that._type == 3 ? that.listView_join : that.listView_win;
               _scroll.removeAllItems()
               that.reqRankData(that._type);
                that.btn_search.visible = true;
                that.btn_clear.visible = false;
            }
        });

        if (FriendCard_Common.isOrdinaryMember()) {//普通成员去掉搜索功能
            this.btn_search.visible = false;
            this.btn_clear.visible = false;
            this._userIdEditBox.visible = false;
            img_search.visible = false;
        }
    },
    init_ui: function (data) {
        var self = this;
        this.txt_title.setString(unescape(data.matchname));
        this.txt_name.setString(unescape(data.nickname));
        this.txt_id.setString("ID:" + data.userId);
        this.txt_score.setString("积分榜:第" + data.rankScore + "名");
        this.txt_join.setString("参与榜:第" + data.rankPlaying + "名");
        this.txt_win.setString("胜局榜:第" + data.rankVictory + "名");

        this.txt_score_n.setString("积分:" + data.score + "分");
        this.txt_join_n.setString("参与:" + data.playing + "场");
        this.txt_win_n.setString("胜局:" + data.victory + "场");

        this._myHead.needScale = 8;
        this._myHead.isMask = true;
        COMMON_UI.refreshHead(this, data.headimgurl ? data.headimgurl : "png/default_headpic.png", this._myHead);
    },

    createItem: function (itemData, i) {
        if(!itemData) return;
        // cc.log("==== lms ====== KKKK ",JSON.stringify(itemData))
        var item = this._cell.clone();
        var img_hd = item.getChildByName("img_hd");
        var text_rank = item.getChildByName("txt_rank");
        var img_rank = item.getChildByName("img_rank");

        if (itemData.rank>0 && itemData.rank<=3) {
            img_rank.loadTexture("friendCards_Match/img_rank_"+itemData.rank+".png")
            text_rank.visible = false;
            img_rank.visible = true;
        }else{
            text_rank.setString(itemData.rank +"");
            text_rank.visible = true;
            img_rank.visible = false;
        }

        var text_name = item.getChildByName("txt_name");
        text_name.setString(unescape(itemData.nickname));
        var text_id = item.getChildByName("txt_id");
        var _id =itemData.userId + "";
        var k = 0;
        var _id2 = "";
        while (k >= 0 && k < _id.length) {
            if(k==0 || k==_id.length-1){
                _id2 += _id[k];
            }else{
                _id2 += "*";
            }
            k++;
        }
        if(this.clubId >= 10000){
            _id2 = _id;
        }
        text_id.setString(_id2);
        var text_changci = item.getChildByName("txt_changci");
        // cc.log("==== this._type itemData.score temData.victory itemData.playing",this._type,itemData.score,itemData.victory,itemData.playing)
        if (this._type == 1) {
            text_changci.setString(itemData.score);
        } else if (this._type == 2) {
            text_changci.setString(itemData.victory);
        } else if (this._type == 3) {
            text_changci.setString(itemData.playing);
        }
        var data = itemData;

        img_hd.needScale = 8;
        img_hd.isMask = true;
        COMMON_UI.refreshHead(this, data.headimgurl ? data.headimgurl : "png/default_headpic.png", img_hd);

        this["_pageIdx2" + (this._type)]++;
        item.visible = true;
        return item;
    },

    addItem: function (data) {
        // cc.log(" =====data  ",data.length,JSON.stringify(data))
        data.sort(function (a, b) {
            return a.rank - b.rank;
        });
        var _index = this["_pageIdx2" + (this._type)];
        var _scroll = this._type == 1 ? this.listView_score : this._type == 3 ? this.listView_join : this.listView_win;
        for (var i = 0; i < data.length; i++) {
            // if(i<this["_pageIdx2" + (this._type)]) continue;
            _scroll.pushBackCustomItem(this.createItem(data[i], i));
            
        }
        if(_index > 0 && data.length > 0)
            _scroll.jumpToItem(this["_pageIdx2" + (this._type)] - 2,cc.p(0.5, 0.0), cc.p(0.5, 0.0));


        if(data.length > 0){
            this["_pageIdx" + (this._type)]++;
        }
        
        

    },
    clearDate_ui:function(){
        //记录第几页请求
        this["_pageIdx" + 1] = -1;
        this["_pageIdx" + 2] = -1;
        this["_pageIdx" + 3] = -1;
        // 记录每次请求到了多少index 每次请求后跳转到这里
        this["_pageIdx2" + 1] = -1;
        this["_pageIdx2" + 2] = -1;
        this["_pageIdx2" + 3] = -1;
        
        this.listView_score.removeAllItems();
        this.listView_join.removeAllItems();
        this.listView_win.removeAllItems();

    },

    reqRankData: function (type) {
        var that = this;
        this._type = type;
        var pageIdx = this["_pageIdx" + (this._type)] ;//pkplayer.handler.rankLeagueMatch
        
        MjClient.block();

        var jiekouName, sendInfo;
        if (that.clubId <= 9999) {
            jiekouName = "pkplayer.handler.rankLeagueMatch";
            sendInfo = {
                type: type, leagueId: that.clubId, matchId: that.matchId, pageIdx: pageIdx +1, pageLen: 20, clubId: this.subClubId,
            }
        } else {
            jiekouName = "pkplayer.handler.rankClubMatch";
            sendInfo = {
                type: type, clubId: that.clubId, matchId: that.matchId, pageIdx: pageIdx +1, pageLen: 20
            }
        }
        if (this["userIdType" + type]) {
            sendInfo.userId = parseInt(this["userIdType" + type]);
            var _scroll = this._type == 1 ? this.listView_score : this._type == 3 ? this.listView_join : this.listView_win;
            _scroll.removeAllItems();
        }
        MjClient.gamenet.request(jiekouName, sendInfo,
            function (rtn) {
                MjClient.unblock();
                if (rtn.code == 0) {     
                    that.addItem(rtn.data);
                    that._myData = rtn.mine;
                    that.init_ui(rtn.mine);

                    var data = MjClient.FriendCard_main_ui._matchData;
                    data.rank = rtn.mine.rankScore;
                    MjClient.FriendCard_main_ui.refreshClubMatch(data);
                } else {
                    MjClient.showToast(rtn.message);
                }

            }
        );
    },
    createItem_history: function (itemData, i) {
        if(!itemData) return;
        var that = this;
        var item = this._cellHistory.clone();
        var strTitle = unescape(itemData.title);
        if (itemData.matchStatus == 0) { 
            //正在比赛
        }else if(itemData.matchStatus == 1){
            //已到期
            strTitle+= "(已到期)";
            item.setTextColor(cc.color("#FF0000"));
        }else if (itemData.matchStatus == 2) {
            //已删除
            strTitle+= "(已删除)";
            item.setTextColor(cc.color("#FF0000"));
        }
        item.setString(strTitle);
        var Image_1 = item.getChildByName("Image_1")
        if (Image_1) {
            Image_1.width = item.width;
            Image_1.x = item.width/2
        }
        item.matchId = itemData.matchId;
        item.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.matchId = sender.matchId;
                this.clearDate_ui();
                that.reqRankData(1);
                this.setSelect(1),
                this._type = 1;
                that.listView_history.visible = false;
            }
        }, this)

        this["_history_" + i] = item;
        item.visible = true;
        return item;
    },
    addItem_history: function (data) {
        // cc.log("====== lms-----JJJJJJ")
        // for (var j = 0; j < 6; j++) {
        //     data.push(data[0]);
        // }
        // for (var i = 0; i < data.length; i++) {

        //     if (!this["_history_" + i]) {
        //         // cc.log("==== 1111 ----i ",i)
        //         this.listView_history.pushBackCustomItem(this.createItem_history(data[i], i));
        //     }
        // }
        if (this.historyPageCount == 0) {
            this.listView_history.removeAllItems();
        }
        this.historyPageCount = data.pageCount;
        var list = data.list;
        for (var i = 0; i < list.length; i++) {
            this.listView_history.pushBackCustomItem(this.createItem_history(list[i], i));

        }

    },
    reqHistoryData: function () {
        var that = this;
        MjClient.block();
        var jiekouName, sendInfo;
        if (that.clubId <= 9999) {
            jiekouName = "pkplayer.handler.leagueHistoryMatch";
            sendInfo = {
                leagueId: that.clubId, pageCount: that.historyPageCount
            }
        } else {
            jiekouName = "pkplayer.handler.clubHistoryMatch";
            sendInfo = {
                clubId: that.clubId, pageCount: that.historyPageCount
            }
        }
        MjClient.gamenet.request(jiekouName, sendInfo,
            function (rtn) {
                MjClient.unblock();
                if (rtn.code == 0) {
                    that.addItem_history(rtn.data);

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