var FriendCard_tongji = cc.Layer.extend({
    _lastId: null,
    btn_func_name: {
        btn_player:"btn_player",//管理玩家统计
        btn_day:"btn_day",//管理每日统计
        btn_normal_player:"btn_normal_player",//非管理玩家统计
        btn_rank:"btn_rank",//排行榜
        btn_winnerCfg:"btn_winnerCfg",//不限分数
        btn_chairmanTJ:"btn_chairmanTJ",//会长统计
        btn_groupTJ:"btn_groupTJ",//分组统计
        btn_zhuli:"btn_zhuli",//助理统计
        btn_play_tongji:"btn_play_tongji",//玩法统计
    },
    rankSetting:{
        openJoinRank:1,
        hideJoinPlayer:2,
        hideJoinData:3,
        openScoreRank:4,
        hideScorePlayer:5,
        hideScoreData:6,
        openWinnerRank:7,
        hideWinnerPlayer:8,
        hideWinnerData:9,
    },
    getColorsConfig:function(){
        if(this._colorConfig){
            return this._colorConfig;
        }
        this._colorConfig = {normal:"#2B344D",selected:"#AB3215"};
        if(FriendCard_Common.getSkinType() == 4){
            this._colorConfig =  {normal:"#738875",selected:"#08460e"};
        }
        return this._colorConfig;
    },
    ctor: function(data) {
        this._super();
        this._start_time = null;
        this._end_time = null;
        this._start_time_date = null;
        this._end_time_date = null;
        this._numberRecord = null;
        this.clubData = data;
        this._record_data = null;
        this._back = null;
        this._ratainDay = null;
        this._isManager = null;
        this._day_req = false;
        this._gameType = -1;  //选择查询的游戏类型
        this._checkGroupType = data.groupLeader ? data.groupLeader : "-1";  //分组类型 0为未分组 1：A  2 ：B
        this._assisUserId = -1;
        this._gameTypeList = [];
        this._selectedRenshu = -1; //当前选择的人数
        this._maxSearchTime = 7;
        if (MjClient.systemConfig && (MjClient.systemConfig.tongjiWhiteUser === true)){
            this._maxSearchTime = 35;
        }
        this._timespan = 0;//搜索时间跨度    如果超过35天不显示统计分数
        //避免rankOpenType空值，转化字符串
        if(this.clubData.info.rankOpenType == null){
            this.clubData.info.rankOpenType = "";
        }
        this.clubData.info.rankOpenType += "";

        this.initAll(data);
    },
    initAll:function(data){
        var resJson = "friendcard_tongji.json";
        if(isIPhoneX() && FriendCard_Common.getSkinType() != 3  && FriendCard_Common.getSkinType() != 4){
            resJson = "friendcard_tongjiX.json";
        }
        var UI = ccs.load(resJson);
        this.addChild(UI.node);
        var that = this;
        this.uinode = UI.node;
        this._isCreater = (this.clubData.info.creator && SelfUid() == this.clubData.info.creator);
        var isManager = this._isCreater || data.groupLeader ||
            (this.clubData.info.admins && this.clubData.info.admins.indexOf(MjClient.data.pinfo.uid) >= 0);
        this._isManager = isManager;
        this._rankIsManager = this._isCreater ||
            (this.clubData.info.admins && this.clubData.info.admins.indexOf(MjClient.data.pinfo.uid) >= 0);

        this.isGroupLeader = FriendCard_Common.isGroupLeader(this.clubData.info);
        this.isAssistants = FriendCard_Common.isAssistants(this.clubData.info);

        this._isOpenClearScore = this._isCreater;
        if(this.clubData.info.permission == 1 && !data.groupLeader){
            this._isOpenClearScore = this._isManager;
        }
        if(!this._isOpenClearScore){
            if(((this.isGroupLeader || this.isAssistants) && (this.clubData.info.allowToViewClearScore +"").indexOf("1") > -1)
                || (FriendCard_Common.isOrdinaryMember() && (this.clubData.info.allowToViewClearScore +"").indexOf("2") > -1)){
                this._isOpenClearScore = true;
            }
        }
        if(this.clubData.info.type == 1){//房卡模式
            this._costName = "钻石";
        }else{
            this._costName = "元宝";
        }
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        COMMON_UI.setNodeTextAdapterSize(_back);

        this.initNewPlayerTongji();

        var node_title = this._back.getChildByName("node_title");

        if(FriendCard_Common.getSkinType() == 2)
        {
            var Image_di = this.uinode.getChildByName("Image_di");
            var _close = this.uinode.getChildByName("close");
            var suizi = this.uinode.getChildByName("suizi")
            var listView_leftBG =  this.uinode.getChildByName("ListView_leftBG");

            Image_di.width = MjClient.size.width;
            Image_di.height = MjClient.size.height *0.9306;
            Image_di.setPosition(MjClient.size.width/2,MjClient.size.height/2);

            if(isIPhoneX()){
                setWgtLayout(_close , [0.1226, 0.2815], [0.9741, 0.8407], [0, 0],false);
                setWgtLayout(suizi , [0.0148, 0.3853], [0.9764, 0.8733], [0, 0],false);
                setWgtLayout(_back , [1, 0.9653], [0.5, 0.5], [0, 0],false);
                listView_leftBG.width = MjClient.size.width * 0.2170;
                listView_leftBG.height = MjClient.size.height *0.8885;
                listView_leftBG.setPosition(0,MjClient.size.height*0.4991);
            }else{
                setWgtLayout(_close , [0.1188, 0.2236], [0.9713, 0.8657], [0, 0],false);
                setWgtLayout(suizi , [0.0148, 0.3853], [0.9764, 0.8733], [0, 0],false);
                setWgtLayout(_back , [1, 0.9306], [0.5, 0.5], [0, 0],false);
                listView_leftBG.width = MjClient.size.width * 0.2069;
                listView_leftBG.height = MjClient.size.height *0.8897;
                listView_leftBG.setPosition(0,MjClient.size.height*0.4999);
            }
            var pos1 = listView_leftBG.getPosition();
            pos1.x = pos1.x + listView_leftBG.width/2;
            pos1 = this._back.convertToNodeSpace(pos1);
            node_title.x = pos1.x;
        }else if(FriendCard_Common.getSkinType() == 1){
            var _close = this.uinode.getChildByName("close");
            var Image_hua = this.uinode.getChildByName("Image_hua");
            var Image_di = this.uinode.getChildByName("Image_di");
            var Image_left = this.uinode.getChildByName("Image_left");
            setWgtLayout(_close , [0.15, 0.1097], [0.997, 1], [0, 0],false);
            Image_di.width = MjClient.size.width;
            Image_di.height = MjClient.size.height *0.9653;
            Image_di.setPosition(MjClient.size.width/2,MjClient.size.height/2);
            setWgtLayout(_back , [1, 0.9653], [0.5, 0.5], [0, 0],false);

            if(isIPhoneX()){
                setWgtLayout(Image_left , [0.2976   , 1.0402], [0, 0], [0, 0],false);
                setWgtLayout(Image_hua , [0.1830, 0.2220], [0.0156, 0.9792], [0, 0],false);
            }else{
                setWgtLayout(Image_hua, [0.1773, 0.1764], [0.0156, 0.9792], [0, 0],false);
                setWgtLayout(Image_left, [0.2883, 0.8264], [0, 0], [0, 0],false);
            }
        }else if(FriendCard_Common.getSkinType() == 3){
            var _close = _back.getChildByName("close");
            setWgtLayout(_back , [1, 0.9653], [0.5, 0.5], [0, 0],false);
        } else {
            var _close = _back.getChildByName("close");
            setWgtLayout(_back, [0.9750, 0.9333], [0.5, 0.5], [0, 0]);
        }

        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        }, this);


        var btn_player = node_title.getChildByName("btn_player");
        var btn_day = node_title.getChildByName("btn_day");
        var btn_normal_player = node_title.getChildByName("btn_normal_player");
        var btn_rank = node_title.getChildByName("btn_rank");
        var btn_chairmanTJ = node_title.getChildByName("btn_chairmanTJ");//会长统计
        var btn_groupTJ = node_title.getChildByName("btn_groupTJ");//分组统计
        var btn_zhuli = node_title.getChildByName("btn_zhuli");//助理统计
        var btn_play_tongji = node_title.getChildByName("btn_play_tongji");//玩法统计

        this.Panel_playertongji_manager =  _back.getChildByName("Panel_playertongji_manager");
        this.Panel_playertongji_manager._enabledBtn = btn_player;
        this.Panel_daytongji_manager =  _back.getChildByName("Panel_daytongji_manager");
        this.Panel_daytongji_manager._enabledBtn = btn_day;
        this.Panel_tongji =  _back.getChildByName("Panel_tongji");
        this.Panel_tongji._enabledBtn = btn_normal_player;
        this.Panel_winnerCfg =  _back.getChildByName("Panel_winnerCfg");
        if(!this.Panel_winnerCfg){
            //不是在back层的需要设置大小
            this.Panel_winnerCfg = this.uinode.getChildByName("Panel_winnerCfg");
            if(this.Panel_winnerCfg){
                COMMON_UI.setNodeTextAdapterSize(this.Panel_winnerCfg);
            }
        }
        this.Panel_rank =  _back.getChildByName("Panel_rank");
        this.Panel_rank._enabledBtn = btn_rank;

        this.Panel_chairmanTJ =  _back.getChildByName("Panel_chairmanTJ");//会长统计
        if(this.Panel_chairmanTJ){
            this.Panel_chairmanTJ._enabledBtn = btn_chairmanTJ;
        }

        this.Panel_groupFK =  _back.getChildByName("Panel_groupFK");//房卡界面
        this.Panel_groupFK._enabledBtn = btn_groupTJ;
        this.Panel_groupYB =  _back.getChildByName("Panel_groupYB");//元宝界面
        this.Panel_groupYB._enabledBtn = btn_groupTJ;

        this.Panel_zhuliYB =  _back.getChildByName("Panel_zhuliYB");//助理元宝统计界面
        this.Panel_zhuliYB._enabledBtn = btn_zhuli;
        this.Panel_zhuliFK =  _back.getChildByName("Panel_zhuliFK");//助理房卡统计界面
        this.Panel_zhuliFK._enabledBtn = btn_zhuli;

        this.Panel_play_tongji =  _back.getChildByName("Panel_play_tongji");//玩法统计界面
        this.Panel_play_tongji._enabledBtn = btn_play_tongji;
        this._PanleList = [
            this.Panel_playertongji_manager,this.Panel_daytongji_manager,
            this.Panel_tongji,this.Panel_winnerCfg,this.Panel_rank,
            this.Panel_groupYB,this.Panel_groupFK,
            this.Panel_zhuliYB,this.Panel_zhuliFK,
            this.Panel_chairmanTJ,,this.Panel_play_tongji
        ];


        node_title.setScrollBarEnabled(false);
        node_title.removeChildByName(this.btn_func_name.btn_chairmanTJ);
        node_title.removeChildByName(this.btn_func_name.btn_play_tongji);
        if (isManager){
            node_title.removeChildByName(this.btn_func_name.btn_normal_player);
        }else if(this.isAssistants){
            node_title.removeChildByName(this.btn_func_name.btn_normal_player);
            node_title.removeChildByName(this.btn_func_name.btn_day);
        }else{
            node_title.removeChildByName(this.btn_func_name.btn_player);
            node_title.removeChildByName(this.btn_func_name.btn_day);
        }
        if (!this._isCreater) {
            if (!data.groupLeader) {
                node_title.removeChildByName(this.btn_func_name.btn_groupTJ);
            }
        }
        if (!this.isAssistants && !this.isGroupLeader) {
            node_title.removeChildByName(this.btn_func_name.btn_zhuli);
        }
        this._isOpenJoinRank = this._rankIsManager || (this.clubData.info.rankOpenType.indexOf(this.rankSetting.openJoinRank) > -1);
        this._isOpenScoreRank = this._rankIsManager || (this.clubData.info.rankOpenType.indexOf(this.rankSetting.openScoreRank) > -1);
        this._isOpenWinnerRank = this._rankIsManager || (this.clubData.info.rankOpenType.indexOf(this.rankSetting.openWinnerRank) > -1);

        this._isOpenRank = this._isOpenJoinRank || this._isOpenScoreRank ||this._isOpenWinnerRank;
        if(!this._isOpenRank){
            node_title.removeChildByName(this.btn_func_name.btn_rank);
        }

        this.rankArrows = [0,0,0];
        this.setSortTypeEffect(1); // 1大赢家   2积分  3场次
        this.checkTimeRange();
        closeBtnAddLight(_close);

        var text_clubName = this._back.getChildByName("text_clubName");
        text_clubName.ignoreContentAdaptWithSize(true);
        var text_clubID = this._back.getChildByName("text_clubID");


        if (this.clubData.groupLeader) {//组长屏蔽每日统计入口
            node_title.removeChildByName(this.btn_func_name.btn_day);
        }
        var btn_winnerCfg;
        btn_winnerCfg = this._back.getChildByName("btn_winnerCfg");

        this.btn_winnerCfg = btn_winnerCfg;
        if(btn_winnerCfg){
            btn_winnerCfg.addTouchEventListener(function(sender,type){
                if (type == 2) {
                    this.showPanle(this.btn_func_name.btn_winnerCfg);
                }
            },this);
        }

        if(cc.sys.isObjectValid(btn_player)){
            btn_player.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    this.showPanle(this.btn_func_name.btn_player);
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji", {uid:SelfUid()});
                }
            },this);
        }
        if(cc.sys.isObjectValid(btn_day)){
            btn_day.addTouchEventListener(function(sender,type){
                if (type == 2) {
                    this.showPanle(this.btn_func_name.btn_day);
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Meiritongji", {uid:SelfUid()});
                }
            },this);
        }
        if(cc.sys.isObjectValid(btn_rank)){
            btn_rank.addTouchEventListener(function(sender,type){
                if (type == 2) {
                    this.showPanle(this.btn_func_name.btn_rank);
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_paihangbang", {uid:SelfUid()});
                }
            },this);
        }

        if(cc.sys.isObjectValid(btn_normal_player)){
            btn_normal_player.addTouchEventListener(function(sender,type){
                if (type == 2) {
                    this.showPanle(this.btn_func_name.btn_normal_player);
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji", {uid:SelfUid()});
                }
            },this);
        }

        if(cc.sys.isObjectValid(btn_groupTJ)){
            btn_groupTJ.addTouchEventListener(function(sender,type){
                if (type == 2) {
                    this.showPanle(this.btn_func_name.btn_groupTJ);
                }
            },this);
        }

        if(cc.sys.isObjectValid(btn_zhuli)){
            btn_zhuli.addTouchEventListener(function(sender,type){
                if (type == 2) {
                    this.showPanle(this.btn_func_name.btn_zhuli);
                }
            },this);
        }

        if (isManager || this.isAssistants){
            this.showPanle(this.btn_func_name.btn_player);
        }else{
            this.showPanle(this.btn_func_name.btn_normal_player);
        }


    },
    initNewPlayerTongji:function(){
        var that = this;
        this.panel_new_tongji_statement = this.uinode.getChildByName("Panel_new_tongji_statement")
        this.panel_new_tongji_statement.visible = false;
        this.panel_new_tongji_statement.getChildByName("back").getChildByName("Text").ignoreContentAdaptWithSize(false);
        setWgtLayout(this.panel_new_tongji_statement, [1, 1], [0.5, 0.5], [0, 0]);
        this.panel_new_tongji_statement.addTouchEventListener(function(sender,type){
            if(type == 2){
                that.panel_new_tongji_statement.visible = false;
            }
        })

    },
    showPanle:function (panleKey) {

        for(var i = 0 ; i < this._PanleList.length;i++){
            if(!this._PanleList[i]) continue

            this._PanleList[i].visible = false;
            if(this._PanleList[i]._enabledBtn && cc.sys.isObjectValid(this._PanleList[i]._enabledBtn)){
                this._PanleList[i]._enabledBtn.enabled = true;
                if(FriendCard_Common.getSkinType() == 4){
                    var textLabel = this._PanleList[i]._enabledBtn.getChildByName("Text");
                    textLabel.disableEffect();
                    textLabel.setColor(cc.color("#B0684B"));
                }
            }else{
                this._PanleList[i]._enabledBtn = null;
            }

        }
        if(panleKey == this.btn_func_name.btn_player || panleKey == this.btn_func_name.btn_normal_player || panleKey == this.btn_func_name.btn_winnerCfg){
            this.btn_winnerCfg.visible = true;
        }else{
            this.btn_winnerCfg.visible = false;
        }
        if(panleKey != this.btn_func_name.btn_rank){
            this._back.getChildByName("text_clubID").visible = true;
            this._back.getChildByName("text_clubName").visible = true;
        }else{
            this._back.getChildByName("text_clubID").visible = false;
            this._back.getChildByName("text_clubName").visible = false;
        }
        switch (panleKey){
            case this.btn_func_name.btn_player:
                this.Panel_playertongji_manager.visible = true;
                if(this.Panel_playertongji_manager._enabledBtn){
                    this.Panel_playertongji_manager._enabledBtn.enabled = false;
                    if(FriendCard_Common.getSkinType() == 4){
                        var textLabel = this.Panel_playertongji_manager._enabledBtn.getChildByName("Text");
                        textLabel.setColor(cc.color("#FFF5D9"));
                        textLabel.enableShadow(cc.color("#AC633B"),textLabel.getShadowOffset(),textLabel.getShadowBlurRadius());
                    }
                }
                this.initManagerPlayerTongjiView();
                break;
            case this.btn_func_name.btn_day:
                this.Panel_daytongji_manager.visible = true;
                if(this.Panel_daytongji_manager._enabledBtn){
                    this.Panel_daytongji_manager._enabledBtn.enabled = false;
                    if(FriendCard_Common.getSkinType() == 4){
                        var textLabel = this.Panel_daytongji_manager._enabledBtn.getChildByName("Text");
                        textLabel.setColor(cc.color("#FFF5D9"));
                        textLabel.enableShadow(cc.color("#AC633B"),textLabel.getShadowOffset(),textLabel.getShadowBlurRadius());
                    }
                }
                this.initDayTongjiView()
                break;
            case this.btn_func_name.btn_normal_player:
                this.Panel_tongji.visible = true;
                if(this.Panel_tongji._enabledBtn){
                    this.Panel_tongji._enabledBtn.enabled = false;
                    if(FriendCard_Common.getSkinType() == 4){
                        var textLabel = this.Panel_tongji._enabledBtn.getChildByName("Text");
                        textLabel.setColor(cc.color("#FFF5D9"));
                        textLabel.enableShadow(cc.color("#AC633B"),textLabel.getShadowOffset(),textLabel.getShadowBlurRadius());
                    }
                }
                this.initNormalPlayerTongjiView();
                break;
            case this.btn_func_name.btn_winnerCfg:
                this.Panel_winnerCfg.visible = true;
                if(this.Panel_winnerCfg._enabledBtn){
                    this.Panel_winnerCfg._enabledBtn.enabled = false;
                    /*if(FriendCard_Common.getSkinType() == 4){
                        var textLabel = this.Panel_winnerCfg._enabledBtn.getChildByName("Text");
                        textLabel.setColor(cc.color("#FFF5D9"));
                        textLabel.enableShadow(cc.color("#AC633B"),textLabel.getShadowOffset(),textLabel.getShadowBlurRadius());
                    }*/
                }
                this.initWinnerCfgView();
                break;
            case this.btn_func_name.btn_rank:
                this.Panel_rank.visible = true;
                if(this.Panel_rank._enabledBtn){
                    this.Panel_rank._enabledBtn.enabled = false;
                    if(FriendCard_Common.getSkinType() == 4){
                        var textLabel = this.Panel_rank._enabledBtn.getChildByName("Text");
                        textLabel.setColor(cc.color("#FFF5D9"));
                        textLabel.enableShadow(cc.color("#AC633B"),textLabel.getShadowOffset(),textLabel.getShadowBlurRadius());
                    }
                }
                this.initRankView();
                break;
            case this.btn_func_name.btn_groupTJ:
                this.Panel_groupFK.visible = this.clubData.info.type == 1;
                this.Panel_groupYB.visible = this.clubData.info.type != 1;
                if (this.clubData.info.type == 1) {
                    this.initGroupFKTJ();
                } else {
                    this.initGroupYBTJ();
                }
                this.Panel_groupYB._enabledBtn.enabled = false;
                if(FriendCard_Common.getSkinType() == 4){
                    var textLabel = this.Panel_groupYB._enabledBtn.getChildByName("Text");
                    textLabel.setColor(cc.color("#FFF5D9"));
                    textLabel.enableShadow(cc.color("#AC633B"),textLabel.getShadowOffset(),textLabel.getShadowBlurRadius());
                }
                break;
            case this.btn_func_name.btn_zhuli:
                this.Panel_zhuliFK.visible = this.clubData.info.type == 1;
                this.Panel_zhuliYB.visible = this.clubData.info.type != 1;
                if (this.clubData.info.type == 1) {
                    this.initZhuliFKTJ();
                } else {
                    this.initZhuliYBTJ();
                }
                this.Panel_zhuliYB._enabledBtn.enabled = false;

                if(FriendCard_Common.getSkinType() == 4){
                    var textLabel = this.Panel_zhuliYB._enabledBtn.getChildByName("Text");
                    textLabel.setColor(cc.color("#FFF5D9"));
                    textLabel.enableShadow(cc.color("#AC633B"),textLabel.getShadowOffset(),textLabel.getShadowBlurRadius());
                }
                break;
        }
    },

    setSortTypeEffect:function (sortType) {// 1大赢家   2积分  3场次
        this.sortType = sortType;
        if (!this.sortEffectViews){
            return;
        }
        if (sortType <= this.sortEffectViews.length){
            for (var i in this.sortEffectViews){
                if (sortType == (Number(i)+1)){
                    this.sortEffectViews[i].setTextColor(cc.color(this.getColorsConfig().selected));
                    this.sortEffectViews[i].getChildByName("Image_sanjiao_s").visible = true;
                    this.sortEffectViews[i].getChildByName("Image_sanjiao_n").visible = false;
                }else {
                    this.sortEffectViews[i].setTextColor(cc.color(this.getColorsConfig().normal));
                    this.sortEffectViews[i].getChildByName("Image_sanjiao_s").visible = false;
                    this.sortEffectViews[i].getChildByName("Image_sanjiao_n").visible = true;
                }
                this.sortEffectViews[i].getChildByName("Image_sanjiao_s").setFlippedY(this.rankArrows[Number(i)] ==1) ;
                this.sortEffectViews[i].getChildByName("Image_sanjiao_n").setFlippedY(this.rankArrows[Number(i)] ==1) ;
            }
        }
    },
    getData:function () {
        if (this.is_RightData()) {
            this.reqCheck(this.clubData.info.clubId, this._start_time_date,this._end_time_date, this.sortType);
        }else{
            MjClient.showToast("输入日期不合法");
        }
    },

    initRankView:function () {
        if(this._initRankView){
           return;
        }
        this._initRankView = true;
        var that = this;

        this._list_rankType = this.Panel_rank.getChildByName("list_rank");
        this._list_rankType.setScrollBarEnabled(false);

        this._Button_join_rank = this._list_rankType.getChildByName("Button_join_rank");
        this._Button_join_rank._rankType = "1";
        this._Button_score_rank = this._list_rankType.getChildByName("Button_score_rank");
        this._Button_score_rank._rankType = "2";
        this._Button_winner_rank = this._list_rankType.getChildByName("Button_winner_rank");
        this._Button_winner_rank._rankType = "3";
        if(!this._isOpenJoinRank){
            this._Button_join_rank.removeFromParent();
            this._Button_join_rank = null;
        }
        if(!this._isOpenScoreRank){
            this._Button_score_rank.removeFromParent();
            this._Button_score_rank = null;
        }
        if(!this._isOpenWinnerRank){
            this._Button_winner_rank.removeFromParent();
            this._Button_winner_rank = null;
        }

        this._rankDate = 0;
        this._list_rank_date_chose = this.Panel_rank.getChildByName("list_date_chose");
        if(this._list_rank_date_chose){
            this._list_rank_date_chose.setScrollBarEnabled(false);
            for(var i = 0 ; i < this._list_rank_date_chose.children.length; i++ ){
                var item_date_chose = this._list_rank_date_chose.children[i];
                if(i == 0){
                    item_date_chose.enabled = false;
                }else{
                    item_date_chose.enabled = true;
                }
                item_date_chose.addTouchEventListener(function(sender,type){
                    if (type == 2) {
                        for(var j = 0 ; j < this._list_rank_date_chose.children.length; j++ ) {
                            this._list_rank_date_chose.children[j].enabled = true;
                            if(this._list_rank_date_chose.children[j] === sender){
                                this._rankDate = j;
                            }
                        }
                        sender.enabled = false;
                        this.reqRankData(this.getRankType()+this.getRankDate())
                    }
                },this);
            }
        }

        var timePanel = this.Panel_rank.getChildByName("Panel_Time");
        if(timePanel){
            this.rankDateStrs = ["今天","昨天","前天","本周"]
            var btn_leftDay = timePanel.getChildByName("btn_leftDay");
            var btn_rightDay = timePanel.getChildByName("btn_rightDay");
            var text_date = timePanel.getChildByName("image_date_bg").getChildByName("Text_date");
            btn_leftDay.addTouchEventListener(function(sender,type){
                if(type == 2){
                    this._rankDate = this._rankDate -1;
                    if(this._rankDate < 0){
                        this._rankDate = this.rankDateStrs.length - 1;
                    }
                    text_date.setString(this.rankDateStrs[this._rankDate])
                    this.reqRankData(this.getRankType()+this.getRankDate())
                }
            },this)

            btn_rightDay.addTouchEventListener(function(sender,type){
                if(type == 2){
                    this._rankDate = this._rankDate +1;
                    if(this._rankDate >= this.rankDateStrs.length){
                        this._rankDate = 0;
                    }
                    text_date.setString(this.rankDateStrs[this._rankDate])
                    this.reqRankData(this.getRankType()+this.getRankDate())
                }
            },this)
        }

        this._list_rank_data = this.Panel_rank.getChildByName("content_list");
        this._list_rank_data._listViewState = 0;
        this._list_rank_data.addCCSEventListener(function(sender,type){

            // **新老引擎bug**
            var EVENT_AUTOSCROLL_ENDED = ccui.ScrollView.EVENT_AUTOSCROLL_ENDED;
            if (cc.sys.OS_WINDOWS == cc.sys.os || cc.ENGINE_VERSION.indexOf("3.16") >= 0)
                EVENT_AUTOSCROLL_ENDED = 12;

            switch (type) {

                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    sender._listViewState = 1;
                    break;
                case EVENT_AUTOSCROLL_ENDED:
                    if (sender._listViewState == 1 && (that._rankData && that._rankData.length > 0 && that._rankData.length % 20 == 0))
                    {
                        that.reqRankData((that.getRankType()+that.getRankDate()),that._rankData.length -1);
                    }
                    sender._listViewState = 0;
            }
        });
        this._cell_rank = this.Panel_rank.getChildByName("cell");
        this._cell_rank.visible = false;
        this.reflashRankView = function (rankData,rankType,lastIdx,defaultSet) {
            if(!rankData.list){
                rankData.list = [];
            }
            if(!lastIdx){
                this._rankData = [];
                this._list_rank_data.removeAllItems();
                var text_title_data = this.Panel_rank.getChildByName("Panle_title").getChildByName("text_title_data");
                var titles = ["参与场次","积分","大赢家数"];
                text_title_data.setString(titles[Math.floor(rankType/10)-1]);
                this.setRankMySelfData(rankData.userData,rankType,defaultSet);
            }
            if(!this._rankData){
                this._rankData = [];
            }
            this._rankData = this._rankData.concat(rankData.list);
            var beginIndex = [1,4,7];
            var changeRankType =  beginIndex[Math.floor(rankType/10)-1];
            this._list_rank_data._changeRankType = changeRankType;

            var currentPanel = this.Panel_rank;
            currentPanel.removeChildByName("emptyTextTip");
            if (this._rankData.length == 0){
                var emptyTxt = new ccui.Text();
                emptyTxt.setFontName("fonts/lanting.TTF");
                emptyTxt.setFontSize(30);
                emptyTxt.setString("暂无数据");
                emptyTxt.setColor(cc.color(0x79, 0x34, 0x12));
                emptyTxt.setName("emptyTextTip");
                emptyTxt.setPosition(currentPanel.width/2,currentPanel.height/2);
                currentPanel.addChild(emptyTxt);
            }
            var srcItemNum = this._list_rank_data.children.length;
            for (var i = 0; i < rankData.list.length; i++) {
                this._list_rank_data.pushBackCustomItem(this.createRankItem(rankData.remarks,rankData.list[i],rankType));
            }
            this._list_rank_data.forceDoLayout();
            this._list_rank_data.jumpToItem(srcItemNum - 1, cc.p(0.5, 0.0), cc.p(0.5, 0.0));
            this._list_rank_data.scrollToItem(srcItemNum, cc.p(0.5, 0.0), cc.p(0.5, 0.0));
        }

        this.btn_setting_rank = this.Panel_rank.getChildByName("btn_setting");
        if(!this._isCreater){
            this.btn_setting_rank.visible = false;
        }
        this.btn_setting_rank.addTouchEventListener(function(sender,type){
            if (type == 2) {
                this.addChild(new FriendCard_tongji_rank_set({
                    clubId:this.clubData.info.clubId,
                    rankOpenType:this.clubData.info.rankOpenType
                }));
            }
        },this);


        this._Panel_bottom_rank = this.Panel_rank.getChildByName("Panel_bottom");
        this.setRankMySelfData = function (oneData,rankType,defaultSet) {
            if(!oneData){
                oneData = {
                    count:"",
                    headimgurl:MjClient.data.pinfo.headimgurl,
                    nickname:MjClient.data.pinfo.nickname,
                    userId:MjClient.data.pinfo.uid,
                    rank:defaultSet? -2 : -1,
                }
            }
            var Panel_bottom = this._Panel_bottom_rank;
            Panel_bottom.visible = true;
            var text_rank = Panel_bottom.getChildByName("text_rank");
            if(oneData.rank == -2){
                text_rank.setString("我的排名");
            }else if (oneData.rank > 0){
                text_rank.setString("我的排名："+oneData.rank);
            }else{
                text_rank.setString("我的排名：未上榜");
            }

            var text_data = Panel_bottom.getChildByName("text_data");
            text_data.setString(oneData.count + "");

            var headicon = Panel_bottom.getChildByName("Image_head");
            var text_name = Panel_bottom.getChildByName("text_playe_name");
            var text_playe_id = Panel_bottom.getChildByName("text_playe_id");
            var url = oneData.headimgurl;
            if(!url) url="png/default_headpic.png";
            headicon.isMask = true;
            COMMON_UI.refreshHead(this, url, headicon);

            text_name.setString(getPlayerName(unescape(oneData.nickname + ""),7));
            text_playe_id.setString(oneData.userId + "");
        }
        this.createRankItem = function(remarks,oneData,rankType) {
            remarks = JSON.parse(remarks)
            var copyNode = this._cell_rank.clone();
            copyNode.visible = true;

            var changeRankType = this._list_rank_data._changeRankType;
            var Image_rank = copyNode.getChildByName("Image_rank");
            var text_rank = copyNode.getChildByName("text_rank");
            if(oneData.rank  <= 0){
                Image_rank.visible = false;
                text_rank.visible = true;
                text_rank.setString("未上榜");
            } else if(oneData.rank  <= 3){
                Image_rank.visible = true;
                text_rank.visible = false;
                Image_rank.loadTexture("friendCards/tongji/rank/paihang_jb_0" + (oneData.rank) + ".png");
            }else{
                Image_rank.visible = false;
                text_rank.visible = true;
                text_rank.setString(oneData.rank + "");
            }

            var headicon = copyNode.getChildByName("Image_head");
            var text_name = copyNode.getChildByName("text_playe_name");
            var text_playe_id = copyNode.getChildByName("text_playe_id");
            text_name.setString(getPlayerName(unescape(oneData.nickname + ""),7));
            text_playe_id.setString(oneData.userId + "");
            var url = oneData.headimgurl;
            if(!url) url="png/default_headpic.png";
            headicon._url = url;
            if(this.clubData.info.rankOpenType.indexOf((changeRankType+1)+"")  > -1 && !that._rankIsManager){
                headicon.visible = false;
                text_name.visible = false;
                text_playe_id.visible = false;
            }else{
                var url = oneData.headimgurl;
                if(!url) url="png/default_headpic.png";
                headicon.isMask = true;
                COMMON_UI.refreshHead(this, url, headicon);
                headicon.visible = true;
                text_name.visible = true;
                text_playe_id.visible = true;
            }
            var text_data = copyNode.getChildByName("text_data");
            text_data.setString(oneData.count + "");
            if(this.clubData.info.rankOpenType.indexOf((changeRankType+2)+"")  > -1 && !that._rankIsManager){
                text_data.visible = false;
            }else{
                text_data.visible = true;
            }
            var text_remark = copyNode.getChildByName("text_remark");
            text_remark.setString("");
            text_remark._rank = oneData.rank
            if(oneData.rank > 0){
                if(oneData.rank  < 6){
                    if(remarks[oneData.rank - 1]){
                        text_remark.setString(remarks[oneData.rank - 1]);
                    }
                }else if(oneData.rank  < 11){
                    if(remarks[5]){
                        text_remark.setString(remarks[5]);
                    }
                }else if(oneData.rank  < 21){
                    if(remarks[6]){
                        text_remark.setString(remarks[6]);
                    }
                }else if(oneData.rank  < 41){
                    if(remarks[7]){
                        text_remark.setString(remarks[7]);
                    }
                }else if(oneData.rank  < 61){
                    if(remarks[8]){
                        text_remark.setString(remarks[8]);
                    }
                }else if(oneData.rank  < 81){
                    if(remarks[9]){
                        text_remark.setString(remarks[9]);
                    }
                }else if(oneData.rank  < 101){
                    if(remarks[10]){
                        text_remark.setString(remarks[10]);
                    }
                }
            }
            return copyNode;
        },

        this.getRankDate = function () {
            return this._rankDate;
        };
        this.getRankType = function () {
            return this._rankType;
        }
        this.reqRankData = function (rankType,lastIdx) {
            if(!lastIdx || lastIdx < 1){
                this.reflashRankView({list:[]},rankType,0,1);
            }
            var that = this;
            var sendInfo ={
                clubId: this.clubData.info.clubId,
                type:3,
                rankType:parseInt(rankType),
            }
            if(lastIdx){
                sendInfo.lastIdx = lastIdx;
            }
            MjClient.block()
            MjClient.gamenet.request("pkplayer.handler.clubGameStatis",sendInfo,
                function(rtn) {

                    MjClient.unblock();
                    if (!cc.sys.isObjectValid(that))
                        return;
                    if (rtn.code == 0) {
                        that.reflashRankView(rtn.data.rankData,rankType,lastIdx,0)
                    } else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        } else {
                            MjClient.showToast("获取数据失败,请重新打开");
                        }
                    }
                }
            );
        }
        UIEventBind(null, that, "rank_remark_update", function(rtn) {
            if(rtn.rankType == that.getRankType()){
                if(rtn.rankType2 == 0){
                    if(that.getRankDate() > 3){
                        return;
                    }
                }
                if(rtn.rankType2 == 1){
                    if(that.getRankDate() != 3){
                        return;
                    }
                }
            }else{
                return;
            }
            var remarks = rtn.remarks;
            for (var i = 0; i < this._list_rank_data.children.length; i++) {
                var chilid = this._list_rank_data.children[i];
                var text_remark = chilid.getChildByName("text_remark");
                if(text_remark){
                    text_remark.setString("");
                    if(text_remark._rank > 0){
                        if(text_remark._rank  < 6){
                            if(remarks[text_remark._rank - 1]){
                                text_remark.setString(remarks[text_remark._rank - 1]);
                            }
                        }else if(text_remark._rank  < 11){
                            if(remarks[5]){
                                text_remark.setString(remarks[5]);
                            }
                        }else if(text_remark._rank  < 21){
                            if(remarks[6]){
                                text_remark.setString(remarks[6]);
                            }
                        }else if(text_remark._rank  < 41){
                            if(remarks[7]){
                                text_remark.setString(remarks[7]);
                            }
                        }else if(text_remark._rank  < 61){
                            if(remarks[8]){
                                text_remark.setString(remarks[8]);
                            }
                        }else if(text_remark._rank  < 81){
                            if(remarks[9]){
                                text_remark.setString(remarks[9]);
                            }
                        }else if(text_remark._rank  < 101){
                            if(remarks[10]){
                                text_remark.setString(remarks[10]);
                            }
                        }
                    }
                }

            }
        }.bind(this));

        UIEventBind(null, that, "club_refresh_info", function(rtn) {
            if (rtn.clubId != this.clubData.info.clubId) {
                return;
            }
            cc.log("this.clubData.info.rankOpenType",this.clubData.info.rankOpenType)
            if("rankOpenType" in rtn){
                if(this.clubData.info.rankOpenType == rtn.rankOpenType){
                    return;
                }
            }
            cc.log("this.clubData.info.rankOpenType update")
            this.clubData.info.rankOpenType = rtn.rankOpenType;
            if(this.clubData.info.rankOpenType == null){
                this.clubData.info.rankOpenType = "";
            }
            this.clubData.info.rankOpenType += "";
            var changeRankType =  this._list_rank_data._changeRankType;
            for (var i = 0; i < this._list_rank_data.children.length; i++) {
                var chilid = this._list_rank_data.children[i];
                var headicon = chilid.getChildByName("Image_head");
                var text_name = chilid.getChildByName("text_playe_name");
                var text_playe_id = chilid.getChildByName("text_playe_id");
                if(!text_playe_id){
                    return;
                }
                if(this.clubData.info.rankOpenType.indexOf((changeRankType+1)+"")  > -1 && !that._rankIsManager){
                    headicon.visible = false;
                    text_name.visible = false;
                    text_playe_id.visible = false;
                }else{
                    headicon.isMask = true;
                    headicon.removeAllChildren();
                    COMMON_UI.refreshHead(this, headicon._url, headicon);
                    headicon.visible = true;
                    text_name.visible = true;
                    text_playe_id.visible = true;
                }
                var text_data = chilid.getChildByName("text_data");
                if(this.clubData.info.rankOpenType.indexOf((changeRankType+2)+"")  > -1 && !that._rankIsManager){
                    text_data.visible = false;
                }else{
                    text_data.visible = true;
                }
            }
        }.bind(this));

        //这个放在最后面，有请求
        for(var i = 0 ; i < this._list_rankType.children.length; i++ ){
            var itemRank = this._list_rankType.children[i];
            if(i == 0){
                this._rankType = itemRank._rankType;
                itemRank.enabled = false;
                this.reqRankData(this.getRankType()+this.getRankDate())
            }else{
                itemRank.enabled = true;
            }
            itemRank.addTouchEventListener(function(sender,type){
                if (type == 2) {
                    for(var j = 0 ; j < this._list_rankType.children.length; j++ ) {
                        this._list_rankType.children[j].enabled = true;
                    }
                    sender.enabled = false;
                    this._rankType = sender._rankType;
                    this.reqRankData(this.getRankType()+this.getRankDate())
                }
            },this);
        }
    },
    initWinnerCfgView:function(){
        if(!this.Panel_winnerCfg) return;
        if(this._initWinnerCfgView){
            return;
        }
        this._initWinnerCfgView = true;

        if(FriendCard_Common.getSkinType() != 2 && FriendCard_Common.getSkinType() != 4){
            var Panel_winnerCfg_block = this.Panel_winnerCfg.getChildByName("block");
            setWgtLayout(Panel_winnerCfg_block , [1, 1], [0.5, 0.5], [0, 0],true);
            Panel_winnerCfg_block.addTouchEventListener(function(sender, type) {
                if (type == 2)
                {
                    this.Panel_winnerCfg.visible = false;
                }
            }, this);
            var _back = this.Panel_winnerCfg.getChildByName("back");
            setWgtLayout(_back , [1, 1], [0.5, 0.5], [0, 0],false);
        }else{
            var _back = this.Panel_winnerCfg;
        }

        var check_winnerAll = _back.getChildByName("check_winnerAll");
        var check_winners = _back.getChildByName("check_winners");
        var button_OK = _back.getChildByName("Button_OK");
        var image_winnerStart = _back.getChildByName("Image_winnerStart");
        var image_winnerEnd = _back.getChildByName("Image_winnerEnd");
        this.image_winnerStart = new cc.EditBox(image_winnerStart.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/inputbg.png"));
        this.image_winnerEnd = new cc.EditBox(image_winnerEnd.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/inputbg.png"));
        this.check_winnerAll = check_winnerAll;

        button_OK.addTouchEventListener(function(sender, type) {
            if (type == 2)
            {
                this.Panel_winnerCfg.visible = false;
                this.getData();
            }
        }, this);
        var checkBoxFuc = function(checkBox){
            checkBox.addTouchEventListener(function(sender, type) {
                if (type == 2)
                {
                    check_winnerAll.setSelected(false);
                    check_winners.setSelected(false);
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ){
                        check_winnerAll.getChildByName("text").setTextColor(cc.color("#602e1a"))
                        check_winners.getChildByName("text").setTextColor(cc.color("#602e1a"))
                    }else{
                        check_winnerAll.getChildByName("text").setTextColor(cc.color("#443333"))
                        check_winners.getChildByName("text").setTextColor(cc.color("#443333"))
                    }

                    checkBox.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function(){
                        sender.setSelected(true)
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ){
                            sender.getChildByName("text").setTextColor(cc.color("#cd0e0d"))
                        }else{
                            sender.getChildByName("text").setTextColor(cc.color("#cd0e0d"))
                        }
                    })))
                }
            }, this);
            checkBox.getChildByName("text").addTouchEventListener(function(sender, type) {
                if (type == 2)
                {
                    check_winnerAll.setSelected(false);
                    check_winners.setSelected(false);
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ){
                        check_winnerAll.getChildByName("text").setTextColor(cc.color("#602e1a"))
                        check_winners.getChildByName("text").setTextColor(cc.color("#602e1a"))
                    }else{
                        check_winnerAll.getChildByName("text").setTextColor(cc.color("#443333"))
                        check_winners.getChildByName("text").setTextColor(cc.color("#443333"))
                    }
                    sender.getParent().setSelected(true);
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ){
                        sender.getParent().getChildByName("text").setTextColor(cc.color("#d33c00"))
                    }else{
                        sender.getParent().getChildByName("text").setTextColor(cc.color("#cd0e0d"))
                    }
                }
            }, this);
        }
        var setEditBoxConfig = function(_parent,_child,str,MaxLength) {
            if(FriendCard_Common.getSkinType() == 3){
                _child.setFontColor(cc.color("#d33c00"));
                _child.setFontSize(32);
                _child.setPlaceholderFontSize(16);
            }else{
                _child.setFontColor(cc.color(0x77, 0x77, 0x77));
                _child.setFontSize(24);
                _child.setPlaceholderFontSize(16);
            }
            _child.setMaxLength(MaxLength);
            _child.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            _child.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            _child.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            _child.setPlaceHolder(str);
            _child.setTextHorizontalAlignment(1)
            _child.setPosition(_parent.getContentSize().width / 2, _parent.getContentSize().height / 2);
            _parent.addChild(_child);
        }.bind(this);

        checkBoxFuc(check_winnerAll);
        checkBoxFuc(check_winners);
        check_winners.setSelected(false);
        setEditBoxConfig(image_winnerStart, this.image_winnerStart,"请输入ID最小分数",10);
        setEditBoxConfig(image_winnerEnd, this.image_winnerEnd,"请输入ID最大分数",10);
        this.image_winnerStart.setString("0");
        this.image_winnerEnd.setString("0");

    },
    initManagerPlayerTongjiView:function () {
        //玩家统计，管理视角
        if(this._initManagerPlayerTongjiView){
            if(this.Panel_playertongji_manager.isShouldReflash){
                this.Panel_playertongji_manager.isShouldReflash = false;
                this.getData();
            }
            return;
        }
        this._initManagerPlayerTongjiView = true;
        this.Panel_playertongji_manager.reflashFuncName = "initManagerPlayerTongjiView";

        var that = this;

        this.btn_new_tongji = this.Panel_playertongji_manager.getChildByName("btn_new_tongji");
        this.btn_new_tongji.visible = false;

        //Panel_playertongji_manager
        //修改年月日的EditBox配置
        var setEditBoxConfig = function(_parent,_child,str,MaxLength) {
            if(FriendCard_Common.getSkinType() == 3){
                _child.setFontColor(cc.color("#602e1a"));
                _child.setPlaceholderFontColor(cc.color("#AD8F64"));
            }else{
                _child.setFontColor(cc.color(0x77, 0x77, 0x77));
            }
            _child.setMaxLength(MaxLength);
            _child.setFontSize(20);
            _child.setFontName(MjClient.fzcyfont);
            _child.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            _child.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            _child.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            _child.setPlaceHolder(str);
            _child.setPlaceholderFontSize(20);
            _child.setPosition(_parent.getContentSize().width / 2, _parent.getContentSize().height / 2);
            _parent.addChild(_child);
        }.bind(this);
        //输入玩家ID
        var Player_Panel_bottom = this.Panel_playertongji_manager.getChildByName("Panel_bottom");
        this.initYejiMode(this.Panel_playertongji_manager,Player_Panel_bottom,false,false);

        var img_IDorName = Player_Panel_bottom.getChildByName("img_IDorName");
        this.img_IDorName = new cc.EditBox(img_IDorName.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/inputbg.png"));
        setEditBoxConfig(img_IDorName, this.img_IDorName,"请输入ID",10);
        this.Panel_playertongji_manager.img_IDorName = img_IDorName;
        this.editBoxEditingDidBegin = function (editBox) {
            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_ShuruID", {uid:SelfUid()});
        };
        this.editBoxEditingDidEnd = function (editBox) {

        };
        this.editBoxTextChanged = function (editBox, text ) {

        };

        this.editBoxReturn = function (editBox) {

        };
        this.img_IDorName.setDelegate(this);



        var nowTime = MjClient.getCurrentTime();
        var _start_Time = Player_Panel_bottom.getChildByName("image_date1_bg");
        var  point1 = _start_Time.convertToWorldSpace(_start_Time.getAnchorPointInPoints());
        point1.y = (point1.y+_start_Time.getBoundingBox().height/2);
        _start_Time.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var str =that._start_Time_date_txt.getString();
                str = str.replace(/-/g,"/");
                var date = new Date(str );
                var data = {event:"_start_Time_date_txt",date:date,px:point1.x,py:point1.y};
                that.uinode.addChild(new friendcard_selectTime(data));
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_Shijianxuanze", {uid:SelfUid()});
            }
        }, this);
        this._start_Time_date_txt = _start_Time.getChildByName("Text_date_start");
        this._start_Time_date_txt.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
        this._start_Time_date_txt.setFontSize(this._start_Time_date_txt.getFontSize()-2)
        this._setShowTime(this._start_Time_date_txt,nowTime[0],nowTime[1],nowTime[2],"00","00");
        UIEventBind(null, this._start_Time_date_txt, "_start_Time_date_txt", function (eD) {
            this._setShowTime(this._start_Time_date_txt,eD.year,eD.month,eD.day,eD.hour,eD.minute);
        }.bind(this));

        var _end_Time = Player_Panel_bottom.getChildByName("image_date2_bg");
        var  point2 = _end_Time.convertToWorldSpace(_end_Time.getAnchorPointInPoints());
        point2.y = (point2.y+_end_Time.getBoundingBox().height/2);

        _end_Time.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var str =that._end_Time_date_txt.getString();
                str = str.replace(/-/g,"/");
                var date = new Date(str );
                var data = {event:"_end_Time_date_txt",date:date,px:point2.x,py:point2.y};
                that.uinode.addChild(new friendcard_selectTime(data));
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_Shijianxuanze", {uid:SelfUid()});
            }
        }, this);
        this._end_Time_date_txt = _end_Time.getChildByName("Text_date_end");
        this._end_Time_date_txt.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
        this._end_Time_date_txt.setFontSize(this._end_Time_date_txt.getFontSize()-2)

        var nextDate = new Date(nowTime[0],nowTime[1]-1,nowTime[2] + 1);
        var nextTime = MjClient.getCurrentTime(nextDate);
        this._setShowTime(this._end_Time_date_txt,nextTime[0],nextTime[1],nextTime[2],"00","00");
        UIEventBind(null, this._end_Time_date_txt, "_end_Time_date_txt", function (eD) {
            this._setShowTime(this._end_Time_date_txt,eD.year,eD.month,eD.day,eD.hour,eD.minute);
        }.bind(this));


        this.btn_check = Player_Panel_bottom.getChildByName("btn_check");
        this.btn_check.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.getData();
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_Chaxun", {uid:SelfUid()});
            }
        }, this);

        //本周
        this.btn_checkDay = Player_Panel_bottom.getChildByName("btn_checkDay");
        var  checkWeek_point = this.btn_checkDay.convertToWorldSpace(this.btn_checkDay.getAnchorPointInPoints());
        checkWeek_point.y = (checkWeek_point.y+this.btn_checkDay.getBoundingBox().height/2);
        this.btn_checkDay.addTouchEventListener(function(sender, type) {
            if (type != 2)
                return;
            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_shijian_caidan", {uid:SelfUid()});
            var dayList = ["近5天","近3天","近2天","本周","今天"];
            var resList = null;
            if(FriendCard_Common.getSkinType() == 4){
                resList = [
                    "friendCards/tongji/btn_near_5day.png",
                    "friendCards/tongji/btn_near_3day.png",
                    "friendCards/tongji/btn_near_2day.png",
                    "friendCards/tongji/btn_cur_weekend_n.png",
                    "friendCards/tongji/btn_today_n.png"
                ]
            }
            var data = {event:"tongji_selectDay",list:dayList,resList:resList,px:checkWeek_point.x,py:checkWeek_point.y};
            that.uinode.addChild(new Friendcard_selectTJDay(data));
        }, this);
        UIEventBind(null, this.btn_checkDay, "tongji_selectDay", function(eD) {
            var str = eD.str
            var now = new Date();
            var startTime;
            if (str == "本周") {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_shijian_benzhou", {uid:SelfUid()});
                if (now.getDay() != 0) {
                    startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1); //从周一开始
                } else {
                    startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
                }
            }
            else if(str == "今天"){
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_shijian_jintian", {uid:SelfUid()});
                startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            }else {
                var rimeRange = Number(str.substring(1, 2));
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_shijian_" + rimeRange + "tian", {uid:SelfUid()});
                startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (rimeRange - 1));
            }
            this._setShowTime(this._start_Time_date_txt, startTime.getFullYear(), startTime.getMonth() + 1, startTime.getDate(),startTime.getHours(),startTime.getMinutes());
            this._setShowTime(this._end_Time_date_txt, now.getFullYear(), now.getMonth() + 1, now.getDate(),now.getHours(),now.getMinutes());
            var res = eD.res;
            if(res){
                this.btn_checkDay.loadTextureNormal(res);
            }else{
                this.btn_checkDay.getChildByName("text").setString(str);
            }
            this.getData();
        }.bind(this));

        //分组
        this.btn_checkGroup = Player_Panel_bottom.getChildByName("btn_checkGroup");
        if (this._checkGroupType != "-1") {
            if (this.btn_checkGroup.getChildByName("Text")) {
                this.btn_checkGroup.getChildByName("Text").setString(this._checkGroupType + "组");
            } else {
                this.btn_checkGroup.setTitleText(this._checkGroupType + "组");
            }
        }
        if (this.isAssistants) {
            if (this.btn_checkGroup.getChildByName("Text")) {
                this.btn_checkGroup.getChildByName("Text").setString("推荐人员");
            } else {
                this.btn_checkGroup.setTitleText("推荐人员");
            }
        }
        if (this.isGroupLeader) {
            if (this.btn_checkGroup.getChildByName("Text")) {
                this.btn_checkGroup.getChildByName("Text").setString("全部组员");
            } else {
                this.btn_checkGroup.setTitleText("全部组员");
            }
        }
        this.btn_checkGroup.addTouchEventListener(function(sender, type) {
            if (type == 2 && !that.isAssistants) {
                if(that.isGroupLeader){
                    if(!that._record_data || !that._record_data.groupAssisData || that._record_data.groupAssisData.length == 0){
                        return;
                    }
                    that.uinode.addChild(new friendcard_selectZhuliTJ(that._record_data.groupAssisData,function(index){
                        if(index == -1){
                            that._assisUserId = -1;
                            str = "全部组员";
                        }else{
                            that._assisUserId = that._record_data.groupAssisData.list[index].userId;
                            str = that._record_data.groupAssisData.list[index].assistantNo+"号助理"
                        }
                        if(that.btn_checkGroup.getChildByName("Text")){
                            that.btn_checkGroup.getChildByName("Text").setString(str);
                        }else{
                            that.btn_checkGroup.setTitleText(str);
                        }
                        that.getData();
                    }));
                }else{
                    if(!that._record_data || !that._record_data.clubGroupData || that._record_data.clubGroupData.length == 0){
                        return;
                    }
                    that.uinode.addChild(new friendcard_selectGroupTJ(that._record_data.clubGroupData,function(index){
                        var str = "";
                        that._checkGroupType = index;
                        if(index == -1){
                            str = "全部分组";
                        }else if(index == 0){
                            str = "未分组"
                        }else{
                            str = (index)+"组";
                        }
                        if(that.btn_checkGroup.getChildByName("Text")){
                            that.btn_checkGroup.getChildByName("Text").setString(str);
                        }else{
                            that.btn_checkGroup.setTitleText(str);
                        }
                        that.getData();
                    }));
                }

                /*var others = [];
                others.push("全部");
                others.push("未分组");
                var data = {event:"TONGJI_FENZU",numberGroup:FriendCard_Common.getGroupNumber(),others:others};
                that.uinode.addChild(new friendcard_selectGroup(data));*/
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_Quanbufenzu", {uid:SelfUid()});
            }
        }, this);
        /*UIEventBind(null, this.btn_checkGroup, "TONGJI_FENZU", function (eD) {

            if (eD.groupType == "全部"){
                this._checkGroupType = "-1";
                if(this.btn_checkGroup.getChildByName("Text")){
                    this.btn_checkGroup.getChildByName("Text").setString("全部分组");
                }else{
                    this.btn_checkGroup.setTitleText("全部分组");
                }
            }else if (eD.groupType == "未分组"){
                this._checkGroupType = "0";
                if(this.btn_checkGroup.getChildByName("Text")){
                    this.btn_checkGroup.getChildByName("Text").setString("未分组");
                }else{
                    this.btn_checkGroup.setTitleText("未分组");
                }
            }else{
                this._checkGroupType = eD.groupType;
                if(this.btn_checkGroup.getChildByName("Text")){
                    this.btn_checkGroup.getChildByName("Text").setString(eD.groupType+"组");
                }else{
                    this.btn_checkGroup.setTitleText(eD.groupType+"组");
                }
            }
            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_Quanbufenzu_Xuanzefenzu", {uid:SelfUid()});
            this.getData();
        }.bind(this));*/

        //玩法
        this.btn_wanFa = Player_Panel_bottom.getChildByName("btn_wanFa");
        this.btn_wanFa.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var data = {event:"TONGJI_WANFA",clubId:this.clubData.info.clubId,addWanfaNum:0};
                that.uinode.addChild(new Friendcard_selectWanfa(data));
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_Quanbuwanfa", {uid:SelfUid()});
            }
        }, this);
        UIEventBind(null, this.btn_wanFa, "TONGJI_WANFA", function (eD) {
            if(eD.wanfaIndex){
                if(this.btn_wanFa.getChildByName("Text")){
                    this.btn_wanFa.getChildByName("Text").setString(eD.gameName);
                }else{
                    this.btn_wanFa.setTitleText(eD.gameName);
                }
                this._ruleId = eD.wanfaIndex;
                this._gameType = -1;
            }else if (eD.gameType != -1){
                if(this.btn_wanFa.getChildByName("Text")){
                    this.btn_wanFa.getChildByName("Text").setString(eD.gameName);
                }else{
                    this.btn_wanFa.setTitleText(eD.gameName);
                }
                this._ruleId = null;
                this._gameType = eD.gameType;
            }else{
                if(this.btn_wanFa.getChildByName("Text")){
                    this.btn_wanFa.getChildByName("Text").setString("全部玩法");
                }else{
                    this.btn_wanFa.setTitleText("全部玩法");

                }
                this._ruleId = null;
                this._gameType = -1;
            }
            this._selectedRenshu = eD.renshu;
            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_Quanbuwanfa_Xuanzewanfa", {uid:SelfUid()});
            this.getData();
        }.bind(this));

        this._ListView_player = this.Panel_playertongji_manager.getChildByName("content_list");
        this._cell_player = this.Panel_playertongji_manager.getChildByName("cell");
        this._cell_player.visible = false;

        var Panle_title_player = this.Panel_playertongji_manager.getChildByName("Panle_title");
        var btn_rank1 = Panle_title_player.getChildByName("btn_rank1");
        var btn_rank2 = Panle_title_player.getChildByName("btn_rank2");
        var btn_rank3 = Panle_title_player.getChildByName("btn_rank3");

        var Text_changci = Panle_title_player.getChildByName("Text_changci");
        var Text_fenshu = Panle_title_player.getChildByName("Text_fenshu");
        var Text_dayingjia = Panle_title_player.getChildByName("Text_dayingjia");
        this.sortEffectViews = [];
        this.sortEffectViews.push(Text_dayingjia);
        this.sortEffectViews.push(Text_fenshu);
        this.sortEffectViews.push(Text_changci);

        btn_rank1.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.rankArrows[0] = that.rankArrows[0]? 0 : 1;
                this.setSortTypeEffect(1);
                that.reflashView();
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_Yingjiapaixu", {uid:SelfUid()});
            }
        }, this);

        btn_rank2.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.rankArrows[1] = that.rankArrows[1]? 0 : 1;
                this.setSortTypeEffect(2);
                that.reflashView();
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_Fenshupaixu", {uid:SelfUid()});
            }
        }, this);

        btn_rank3.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.rankArrows[2] = that.rankArrows[2]? 0 : 1;
                this.setSortTypeEffect(3);
                that.reflashView();
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_Changcipaixu", {uid:SelfUid()});
            }
        }, this);

        that.fresh_table();
        this.getData();
    },
    initDayTongjiView:function(){
        //每日统计
        if(this._initDatTongjiView){
            if(this.Panel_daytongji_manager.isShouldReflash){
                this.Panel_daytongji_manager.isShouldReflash = false;
                this.reqCheck_day(this.clubData.info.clubId);
            }
            return;
        }
        this._initDatTongjiView = true;
        this.Panel_daytongji_manager.reflashFuncName = "initDayTongjiView";

        this.initYejiMode(this.Panel_daytongji_manager,null,false,false);

        var costText = this.Panel_daytongji_manager.getChildByName("Panle_title").getChildByName("Text_cost");
        if(this._costName == "钻石"){
            costText.setString("应消耗" +　this._costName);
            costText.setFontSize(costText.getFontSize() -4);
        }else{
            costText.setString("消耗" +　this._costName);
        }
        this._ListView_day = this.Panel_daytongji_manager.getChildByName("content_list");
        this._cell_day = this.Panel_daytongji_manager.getChildByName("cell");
        this._cell_day.visible = false;
        this.reqCheck_day(this.clubData.info.clubId);
    },
    initNormalPlayerTongjiView:function () {
        //玩家统计，普通视角
        if(this._initNormalPlayerTongjiView){
            if(this.Panel_tongji.isShouldReflash){
                this.Panel_tongji.isShouldReflash = false;
                this.getData();
            }
            return;
        }
        this._initNormalPlayerTongjiView = true;
        this.Panel_tongji.reflashFuncName = "initNormalPlayerTongjiView";

        var that = this;
        this._ListView_player = this.Panel_tongji.getChildByName("content_list");
        this._cell_player = this.Panel_tongji.getChildByName("cell");
        this._cell_player.visible = false;

        var Panel_bottom = this.Panel_tongji.getChildByName("Panel_bottom");
        this.initYejiMode(this.Panel_tongji,Panel_bottom,false,false);

        var nowTime = MjClient.getCurrentTime();
        var _start_Time = Panel_bottom.getChildByName("image_date1_bg");
        this._start_Time_date_txt = _start_Time.getChildByName("Text_date_start");
        this._start_Time_date_txt.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
        this._start_Time_date_txt.setFontSize(this._start_Time_date_txt.getFontSize()-2)
        this._setShowTime(this._start_Time_date_txt,nowTime[0],nowTime[1],nowTime[2],"00","00");
        this._nowTime = this._start_Time_date_txt.getString();


        var _end_Time = Panel_bottom.getChildByName("image_date2_bg");

        this._end_Time_date_txt = _end_Time.getChildByName("Text_date_end");
        this._end_Time_date_txt.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
        this._end_Time_date_txt.setFontSize(this._end_Time_date_txt.getFontSize()-2)
        var nextDate = new Date(nowTime[0],nowTime[1]-1,nowTime[2] + 1);
        var nextTime = MjClient.getCurrentTime(nextDate);
        this._setShowTime(this._end_Time_date_txt,nextTime[0],nextTime[1],nextTime[2],"00","00");

        this._endTime = this._end_Time_date_txt.getString();

        //本周
        this.checkWeekBtn = Panel_bottom.getChildByName("checkWeekBtn");
        this.checkWeekBtn.visible = that.clubData.info.isShowStats == 2;
        this.checkWeekBtn.addTouchEventListener(function(sender, type) {
            if (type != 2)
                return;
            var now = new Date();
            var weekStartDate;
            if (now.getDay() != 0)
                weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1); //从周一开始
            else
                weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
            that._setShowTime(that._start_Time_date_txt,weekStartDate.getFullYear(),weekStartDate.getMonth() + 1,weekStartDate.getDate(),weekStartDate.getHours(),weekStartDate.getMinutes());
            that._setShowTime(that._end_Time_date_txt,now.getFullYear(),now.getMonth() + 1,now.getDate(),now.getHours(),now.getMinutes());
            this.getData();
            this.checkTimeRange();

        }, this);

        this.btn_before = Panel_bottom.getChildByName("btn_before");
        this.btn_before.isClick = true;
        this.btn_before.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (sender.isClick) {
                    this._setTimeDay(-1);
                    this.getData();
                    this.checkTimeRange();
                } else {
                    var range ;
                    if (this.clubData.info.isShowStats == 1) {
                        range = 3;
                    } else if (this.clubData.info.isShowStats == 2) {
                        range = 7;
                    } else if (this.clubData.info.isShowStats == 3) {
                        range = "今";
                    }
                    MjClient.showToast("只能查询"+range+ "天内的数据");
                }
            }
        }, this);

        this.btn_after = Panel_bottom.getChildByName("btn_after");
        this.btn_after.isClick = false;
        this.btn_after.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (sender.isClick) {
                    this._setTimeDay(1);
                    this.getData();
                    this.checkTimeRange();
                } else {
                    var range ;
                    if (this.clubData.info.isShowStats == 1) {
                        range = 3;
                    } else if (this.clubData.info.isShowStats == 2) {
                        range = 7;
                    } else if (this.clubData.info.isShowStats == 3) {
                        range = "今";
                    }
                    MjClient.showToast("只能查询"+range+ "天内的数据");
                }
            }
        }, this);


        this.btn_wanFa = Panel_bottom.getChildByName("btn_wanFa");
        if(this.btn_wanFa){
            this.btn_wanFa.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var data = {event:"TONGJI_WANFA",clubId:this.clubData.info.clubId};
                    if(this._gameTypeList.length > 0){
                        data._gameTypeList = this._gameTypeList;
                    }
                    that.uinode.addChild(new Friendcard_selectWanfa(data));
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_Quanbuwanfa", {uid:SelfUid()});
                }
            }, this);
            UIEventBind(null, this.btn_wanFa, "TONGJI_WANFA", function (eD) {
                if (eD.gameType != -1){
                    if(this.btn_wanFa.getChildByName("Text")){
                        this.btn_wanFa.getChildByName("Text").setString(eD.gameName);
                    }else{
                        this.btn_wanFa.setTitleText(eD.gameName);
                    }
                    this._gameType = eD.gameType;
                }else{
                    if(this.btn_wanFa.getChildByName("Text")){
                        this.btn_wanFa.getChildByName("Text").setString("全部玩法");
                    }else{
                        this.btn_wanFa.setTitleText("全部玩法");

                    }
                    this._gameType = -1;
                }
                this._selectedRenshu = eD.renshu;
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_Quanbuwanfa_Xuanzewanfa", {uid:SelfUid()});
                this.getData();
            }.bind(this));
        }
        this.getData();
    },
    // 时间查询 功能 优化
    _chaXun_new: function (node, timeFunc, callFunc, startTime_node, endTime_node) {
        var _btn_before = node.getParent().getChildByName("btn_leftDay");
        if(!_btn_before){
            _btn_before = new ccui.Button("friendCards/tongji/btn_leftDay.png");
            _btn_before.setName("btn_leftDay");
            var _pos_x1 = -(_btn_before.width / 2 + 10);
            _btn_before.setPosition(cc.p(_pos_x1, node.height / 2));
            node.addChild(_btn_before);
        }
        _btn_before.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                // MjClient.showToast("===前一天");
                timeFunc(-1, startTime_node, endTime_node);
                callFunc();
            }
        }, this);


        var _btn_after = node.getParent().getChildByName("btn_rightDay");
        if(!_btn_after){
            var _btn_after = new ccui.Button("friendCards/tongji/btn_rightDay.png");
            _btn_after.setName("btn_rightDay");
            var _pos_x2 = (node.width + _btn_before.width / 2 + 10);
            _btn_after.setPosition(cc.p(_pos_x2, node.height / 2));
            node.addChild(_btn_after);
        }

        _btn_after.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                // MjClient.showToast("=== hou 一天");
                timeFunc(1, startTime_node, endTime_node);
                callFunc();
            }
        }, this);


    },
    initZhuliYBTJ:function () {
        var that = this;
        if(this._initZhuliYBTJ){
            return;
        }
        this._initZhuliYBTJ = true;
        //输入玩家ID
        var panle_title = this.Panel_zhuliYB.getChildByName("Panle_title")//.getChildByName("Text_expendCount").setString("应收钻石");
        this.item_zhuliYBTJ = this.Panel_zhuliYB.getChildByName("cell");
        this.item_zhuliYBTJ.visible = false;
        var player_Panel_bottom = this.Panel_zhuliYB.getChildByName("Panel_bottom");
        if(player_Panel_bottom.getChildByName("image_date1_bg")){
            player_Panel_bottom.getChildByName("image_date1_bg").visible = false;
        }
        if(player_Panel_bottom.getChildByName("Text_zhi")){
            player_Panel_bottom.getChildByName("Text_zhi").visible = false;
        }

        var nowTime = MjClient.getCurrentTime();
        var _end_Time = player_Panel_bottom.getChildByName("image_date2_bg");
        var  point2 = _end_Time.convertToWorldSpace(_end_Time.getAnchorPointInPoints());
        point2.y = (point2.y+_end_Time.getBoundingBox().height/2);
        _end_Time.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                return;
                var str =that._end_Time_date_txt_zhuliYBTJ.getString();
                str = str.replace(/-/g,"/");
                var date = new Date(str );
                var data = {event:"_end_Time_date_txt_zhuliYBTJ",date:date,px:point2.x,py:point2.y};
                data.noShowDay = true;
                that.uinode.addChild(new friendcard_selectTime(data));
            }
        }, this);
        this._end_Time_date_txt_zhuliYBTJ = _end_Time.getChildByName("Text_date_end");
        this._end_Time_date_txt_zhuliYBTJ.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
        this._end_Time_date_txt_zhuliYBTJ.setFontSize(this._end_Time_date_txt_zhuliYBTJ.getFontSize()-2)
        this._setShowTime2(this._end_Time_date_txt_zhuliYBTJ,nowTime[0],nowTime[1],nowTime[2],"00","00");
        UIEventBind(null, this._end_Time_date_txt_zhuliYBTJ, "_end_Time_date_txt_zhuliYBTJ", function (eD) {
            this._setShowTime(this._end_Time_date_txt_zhuliYBTJ,eD.year,eD.month,eD.day,eD.hour,eD.minute);
        }.bind(this));

        var btn_check = player_Panel_bottom.getChildByName("btn_check");
        if(btn_check){
            btn_check.visible = false;
        }

        //请求助理元宝统计数据
        this.reqRecord_zhuliYBTJ = function() {
            var time = this._end_Time_date_txt_zhuliYBTJ.getString();
            var time_1 = FriendCard_Common.transdate(time.substring(0, 4), Number(time.substring(5, 7)) - 1, time.substring(8, 10), time.substring(11, 13), time.substring(14, 16));
            var requestInfo = {};
            requestInfo.clubId = that.clubData.info.clubId;
            requestInfo.startTime = time_1;
            requestInfo.endTime = time_1+ 24 * 60 * 60 * 1000;
            cc.log("reqRecord_zhuliYBTJ requestInfo",JSON.stringify(requestInfo))

            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.clubRefereeList", requestInfo,
                function(rtn) {
                    MjClient.unblock();
                    if (!cc.sys.isObjectValid(that))
                        return;
                    if (rtn.code == 0) {
                        that._record_data_zhuliYBTJ = rtn.data;
                        that.reflashView_zhuliYBTJ();
                    } else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        } else {
                            MjClient.showToast("获取数据失败,请重新打开");
                        }
                    }
                }
            );
        }
        this._chaXun_new(_end_Time, this._setTimeDay2.bind(this), this.reqRecord_zhuliYBTJ.bind(this),this._end_Time_date_txt_zhuliYBTJ);

        //刷新View
        this.reflashView_zhuliYBTJ = function () {
            var that = this;
            if(!that._record_data_zhuliYBTJ){
                return;
            }
            that.sortDataLocal_zhuliYBTJ();
            that.addItems_zhuliYBTJ(that._record_data_zhuliYBTJ);
        }
        //元宝数据本地排序
        this.sortDataLocal_zhuliYBTJ = function () {
            var that = this;
            var curSortType = 1
            var curSortType = that.sortType_zhuliYBTJ + (that.rankArrows_zhuliYBTJ[that.sortType_zhuliYBTJ -1] == 1 ? that.rankArrows_zhuliYBTJ.length : 0);
            var result = that._record_data_zhuliYBTJ;
            var setAttIsUndefined = function(a,att, def) {
                a[att] = a[att] ? a[att] : def;
            }
            for (var c in result) {
                setAttIsUndefined(result[c],"refereeName", "");
                setAttIsUndefined(result[c],"refereeId", "");
                setAttIsUndefined(result[c],"playUser", 0);
                setAttIsUndefined(result[c],"playGame", 0);
                setAttIsUndefined(result[c],"playWinner", 0);
            }
            result.sort(function(a, b) {
                if(curSortType == 1){
                    return b.playUser - a.playUser;
                }else if(curSortType == 2){
                    return b.playGame - a.playGame;
                }else if(curSortType == 3){
                    return b.playWinner - a.playWinner;
                }else if(curSortType == 4){
                    return a.playUser - b.playUser;
                }else if(curSortType == 5){
                    return a.playGame - b.playGame;
                }else if(curSortType == 6){
                    return a.playWinner - b.playWinner;
                }
                return 0;
            })
            that._record_data_zhuliYBTJ = result;
        }
        this.addItems_zhuliYBTJ = function(data){
            var list = this.Panel_zhuliYB.getChildByName("content_list");
            list.removeAllItems();
            for (var i in data) {
                var itemDta = data[i]
                var _item = this.item_zhuliYBTJ.clone();
                var text_group = _item.getChildByName("text_group");
                var text_name = _item.getChildByName("text_name");
                var text_ID = _item.getChildByName("text_ID");
                var text_renshu = _item.getChildByName("text_renshu");
                var text_partInCount = _item.getChildByName("text_partInCount");
                var text_DYJNum = _item.getChildByName("text_DYJNum");

                text_group.setString(itemDta.no+"")
                text_name.setString(getPlayerName(unescape(itemDta.refereeName)));
                text_ID.setString(itemDta.refereeId);
                text_renshu.setString(itemDta.playUser ? itemDta.playUser + "" : "0")
                text_partInCount.setString(itemDta.playGame ? itemDta.playGame + "" : "0")
                text_DYJNum.setString(itemDta.playWinner ? itemDta.playWinner + "" : "0")

                _item.visible = true;
                list.pushBackCustomItem(_item);
            }
        }
        this.setSortTypeEffect_zhuliYBTJ = function (sortType) {// 1大赢家   2积分  3场次
            this.sortType_zhuliYBTJ = sortType;
            if (!this.sortEffectViews_zhuliYBTJ){
                return;
            }
            if (sortType <= this.sortEffectViews_zhuliYBTJ.length){
                for (var i in this.sortEffectViews_zhuliYBTJ){
                    if (sortType == (Number(i)+1)){
                        this.sortEffectViews_zhuliYBTJ[i].setTextColor(cc.color(this.getColorsConfig().selected));
                        this.sortEffectViews_zhuliYBTJ[i].getChildByName("Image_sanjiao_s").visible = true;
                        this.sortEffectViews_zhuliYBTJ[i].getChildByName("Image_sanjiao_n").visible = false;
                    }else {
                        this.sortEffectViews_zhuliYBTJ[i].setTextColor(cc.color(this.getColorsConfig().normal));
                        this.sortEffectViews_zhuliYBTJ[i].getChildByName("Image_sanjiao_s").visible = false;
                        this.sortEffectViews_zhuliYBTJ[i].getChildByName("Image_sanjiao_n").visible = true;
                    }
                    this.sortEffectViews_zhuliYBTJ[i].getChildByName("Image_sanjiao_s").setFlippedY(this.rankArrows_zhuliYBTJ[Number(i)] ==1) ;
                    this.sortEffectViews_zhuliYBTJ[i].getChildByName("Image_sanjiao_n").setFlippedY(this.rankArrows_zhuliYBTJ[Number(i)] ==1) ;
                }
            }
        }
        var title_renshu = panle_title.getChildByName("Text_renshu");
        var title_partInCount = panle_title.getChildByName("Text_partInCount");
        var title_winnerCount = panle_title.getChildByName("Text_winnerCount");
        var textAddListener = function(text,index)
        {
            text.setEnabled(true);
            text.setTouchEnabled(true);
            text.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.rankArrows_zhuliYBTJ[index] = that.rankArrows_zhuliYBTJ[index] ? 0 : 1;
                    that.setSortTypeEffect_zhuliYBTJ(index + 1);
                    that.reflashView_zhuliYBTJ();
                }
            }, this);
            text.getChildByName("Image_sanjiao_n").setEnabled(true);
            text.getChildByName("Image_sanjiao_n").setTouchEnabled(true);
            text.getChildByName("Image_sanjiao_n").addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.rankArrows_zhuliYBTJ[index] = that.rankArrows_zhuliYBTJ[index] ? 0 : 1;
                    that.setSortTypeEffect_zhuliYBTJ(index + 1);
                    that.reflashView_zhuliYBTJ();
                }
            }, this);
            text.getChildByName("Image_sanjiao_s").setEnabled(true);
            text.getChildByName("Image_sanjiao_s").setTouchEnabled(true);

            text.getChildByName("Image_sanjiao_s").addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.rankArrows_zhuliYBTJ[index] = that.rankArrows_zhuliYBTJ[index] ? 0 : 1;
                    that.setSortTypeEffect_zhuliYBTJ(index + 1);
                    that.reflashView_zhuliYBTJ();
                }
            }, this);
        }
        textAddListener(title_renshu,0);
        textAddListener(title_partInCount,1);
        textAddListener(title_winnerCount,2);

        this.sortEffectViews_zhuliYBTJ = [title_renshu,title_partInCount,title_winnerCount];
        this.rankArrows_zhuliYBTJ = [0,0,0];
        this.setSortTypeEffect_zhuliYBTJ(1)
        this.reqRecord_zhuliYBTJ();
    },
    initZhuliFKTJ:function () {
        var that = this;
        if(this._initZhuliFKTJ){
            if(this.Panel_zhuliFK.isShouldReflash){
                this.Panel_zhuliFK.isShouldReflash = false;
                this.reqRecord_zhuliFKTJ();
            }
            return;
        }
        this._initZhuliFKTJ = true;
        this.Panel_zhuliFK.reflashFuncName = "initZhuliFKTJ";
        //输入玩家ID
        var panle_title = this.Panel_zhuliFK.getChildByName("Panle_title");
        this.item_zhuliFKTJ = this.Panel_zhuliFK.getChildByName("cell");
        this.item_zhuliFKTJ.visible = false;
        var player_Panel_bottom = this.Panel_zhuliFK.getChildByName("Panel_bottom");
        this.initYejiMode(this.Panel_zhuliFK,player_Panel_bottom,false,!this._isCreater);

        if(player_Panel_bottom.getChildByName("image_date1_bg")){
            player_Panel_bottom.getChildByName("image_date1_bg").visible = false;
        }
        if(player_Panel_bottom.getChildByName("Text_zhi")){
            player_Panel_bottom.getChildByName("Text_zhi").visible = false;
        }

        var nowTime = MjClient.getCurrentTime();
        var _end_Time = player_Panel_bottom.getChildByName("image_date2_bg");
        var  point2 = _end_Time.convertToWorldSpace(_end_Time.getAnchorPointInPoints());
        point2.y = (point2.y+_end_Time.getBoundingBox().height/2);
        _end_Time.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                return;
                var str =that._end_Time_date_txt_zhuliFKTJ.getString();
                str = str.replace(/-/g,"/");
                var date = new Date(str );
                var data = {event:"_end_Time_date_txt_zhuliFKTJ",date:date,px:point2.x,py:point2.y};
                data.noShowDay = true;
                that.uinode.addChild(new friendcard_selectTime(data));
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_Shijianxuanze", {uid:SelfUid()});
            }
        }, this);
        this._end_Time_date_txt_zhuliFKTJ = _end_Time.getChildByName("Text_date_end");
        this._end_Time_date_txt_zhuliFKTJ.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
        this._end_Time_date_txt_zhuliFKTJ.setFontSize(this._end_Time_date_txt_zhuliFKTJ.getFontSize()-2)
        this._setShowTime2(this._end_Time_date_txt_zhuliFKTJ,nowTime[0],nowTime[1],nowTime[2],"00","00");
        UIEventBind(null, this._end_Time_date_txt_zhuliFKTJ, "_end_Time_date_txt_zhuliFKTJ", function (eD) {
            this._setShowTime2(this._end_Time_date_txt_zhuliFKTJ,eD.year,eD.month,eD.day,eD.hour,eD.minute);
        }.bind(this));

        var btn_check = player_Panel_bottom.getChildByName("btn_check");
        if(btn_check){
            btn_check.visible = false;
        }

        //请求元宝统计数据
        this.reqRecord_zhuliFKTJ = function() {
            var time = this._end_Time_date_txt_zhuliFKTJ.getString();
            var time_1 = FriendCard_Common.transdate(time.substring(0, 4), Number(time.substring(5, 7)) - 1, time.substring(8, 10), time.substring(11, 13), time.substring(14, 16));
            var requestInfo = {};
            requestInfo.clubId = that.clubData.info.clubId;
            requestInfo.startTime = time_1;
            requestInfo.endTime = time_1+ 24 * 60 * 60 * 1000;
            MjClient.block();
            cc.log("reqRecord_zhuliFKTJ requestInfo",JSON.stringify(requestInfo))
            MjClient.gamenet.request("pkplayer.handler.clubRefereeList", requestInfo,
                function(rtn) {
                    MjClient.unblock();
                    if (!cc.sys.isObjectValid(that))
                        return;
                    if (rtn.code == 0) {
                        that._record_data_zhuliFKTJ = rtn.data;
                        that.reflashView_zhuliFKTJ();
                    } else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        } else {
                            MjClient.showToast("获取数据失败,请重新打开");
                        }
                    }
                }
            );
        }
        this._chaXun_new(_end_Time, this._setTimeDay2.bind(this), this.reqRecord_zhuliFKTJ.bind(this),this._end_Time_date_txt_zhuliFKTJ);
        //刷新View
        this.reflashView_zhuliFKTJ = function () {
            var that = this;
            if(!that._record_data_zhuliFKTJ){
                return;
            }
            that.sortDataLocal_zhuliFKTJ();
            that.addItems_zhuliFKTJ(that._record_data_zhuliFKTJ);
        }
        //房卡数据本地排序
        this.sortDataLocal_zhuliFKTJ = function () {
            var that = this;
            var curSortType = 1
            var curSortType = that.sortType_zhuliFKTJ + (that.rankArrows_zhuliFKTJ[that.sortType_zhuliFKTJ -1] == 1 ? that.rankArrows_zhuliFKTJ.length : 0);
            var result = that._record_data_zhuliFKTJ;
            var setAttIsUndefined = function(a,att, def) {
                a[att] = a[att] ? a[att] : def;
            }
            for (var c in result) {
                setAttIsUndefined(result[c],"refereeName", "");
                setAttIsUndefined(result[c],"refereeId", "");
                setAttIsUndefined(result[c],"playUser", 0);
                setAttIsUndefined(result[c],"effectPlayUser", 0);
                setAttIsUndefined(result[c],"effectPlayGame", 0);
                setAttIsUndefined(result[c],"winNum", 0);
                setAttIsUndefined(result[c],"rate", 0);
                setAttIsUndefined(result[c],"syceeIncome", 0);
                setAttIsUndefined(result[c],"syceeDeduct", 0);
                setAttIsUndefined(result[c],"syceeBuckle", 0);
                setAttIsUndefined(result[c],"contribution", 0);
            }
            result.sort(function(a, b) {
                if(curSortType == 1){
                    return b.effectPlayUser - a.effectPlayUser;
                }else if(curSortType == 2){
                    return b.joinCount - a.joinCount;
                }else if(curSortType == 3){
                    return b.rebate - a.rebate;
                }else if(curSortType == 4){
                    return b.contribution - a.contribution;
                }else if(curSortType == 5){
                    return b.syceeIncome - a.syceeIncome;
                }else if(curSortType == 6){
                    return a.effectPlayUser - b.effectPlayUser;
                }else if(curSortType == 7){
                    return a.joinCount - b.joinCount;
                }else if(curSortType == 8){
                    return a.rebate - b.rebate;
                }else if(curSortType == 9){
                    return a.contribution - b.contribution;
                }else if(curSortType == 10){
                    return b.syceeIncome - a.syceeIncome;
                }
                return 0;
            })
            that._record_data_zhuliFKTJ = result;
        }
        this.addItems_zhuliFKTJ = function(data){
            var list = this.Panel_zhuliFK.getChildByName("content_list");
            list.removeAllItems();
            for (var i in data) {
                var itemDta = data[i]
                var _item = this.item_zhuliFKTJ.clone();
                var text_group = _item.getChildByName("text_group");
                var text_name = _item.getChildByName("text_name");
                var text_ID = _item.getChildByName("text_ID");
                var text_renshu = _item.getChildByName("text_renshu");
                var text_partInCount = _item.getChildByName("text_partInCount");
                var text_effectPlayGame = _item.getChildByName("text_effectPlayGame");
                var text_ratioCount = _item.getChildByName("text_ratioCount");
                var text_conCount = _item.getChildByName("text_conCount");
                var text_expendCount = _item.getChildByName("text_expendCount");
                var btn_details = _item.getChildByName("btn_details");
                var text_setratioCount = _item.getChildByName("text_setratioCount");
                text_setratioCount.setTouchEnabled(true);
                text_setratioCount.visible = that.isGroupLeader;
                if(!text_ratioCount._standY){
                    text_ratioCount._standY = text_ratioCount.y;
                }
                if(!text_setratioCount.visible){
                    text_ratioCount.y = text_expendCount.y;
                }else{
                    text_ratioCount.y = text_ratioCount._standY;
                }
                text_setratioCount.data = itemDta;
                btn_details.data = itemDta;
                text_group.setString(itemDta.no+"")
                text_name.setString(getPlayerName(unescape(itemDta.refereeName)));
                text_ID.setString(itemDta.refereeId);
                text_renshu.setString(itemDta.playUser ? itemDta.playUser + "" : "0");
                text_partInCount.setString(itemDta.effectPlayUser ? itemDta.effectPlayUser + "" : "0");
                text_effectPlayGame.setString(itemDta.effectPlayGame ? itemDta.effectPlayGame + "" : "0");
                text_ratioCount.setString(itemDta.rate ? (itemDta.rate * 100).toFixed(0)  + "%" : "0%");
                text_conCount.setString(itemDta.contribution ? itemDta.contribution + "" : "0");
                text_expendCount.setString(itemDta.syceeIncome ? itemDta.syceeIncome + "" : "0");
                btn_details.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        that.uinode.addChild(new FriendCard__tongji_selectOpt(function(type){
                            if(type == 2){
                                sender.data.time = that._end_Time_date_txt_zhuliFKTJ.getString();
                                sender.data._comeFromType = 2;
                                that.uinode.addChild(new FriendCard_tongjiDetails(sender.data));
                            }else if(type == 1){
                                var time = that._end_Time_date_txt_zhuliFKTJ.getString();
                                var startTime = FriendCard_Common.transdate(time.substring(0, 4), Number(time.substring(5, 7)) - 1, time.substring(8, 10), time.substring(11, 13), time.substring(14, 16));
                                var data = {
                                    isLMClub:false,
                                    assistantNo:sender.data.no,
                                    refereeId:sender.data.refereeId,
                                    type:2,
                                    clubData:that.clubData,
                                    startTime:startTime,
                                }
                                that.uinode.addChild(new FriendCard_tongji_member(data));
                            }

                        }))

                    }
                }, this);

                text_setratioCount.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        sender.data.clubId = that.clubData.info.clubId;
                        sender.data._comeFromType = 2;
                        that.uinode.addChild(new FriendCard_setRatio(sender.data));
                    }
                }, this);

                _item.visible = true;
                list.pushBackCustomItem(_item);
            }
        }
        this.setSortTypeEffect_zhuliFKTJ = function (sortType) {// 1人数   2参与场次  3比例  4贡献
            this.sortType_zhuliFKTJ = sortType;
            if (!this.sortEffectViews_zhuliFKTJ){
                return;
            }
            if (sortType <= this.sortEffectViews_zhuliFKTJ.length){
                for (var i in this.sortEffectViews_zhuliFKTJ){
                    if (sortType == (Number(i)+1)){
                        this.sortEffectViews_zhuliFKTJ[i].setTextColor(cc.color(this.getColorsConfig().selected));
                        this.sortEffectViews_zhuliFKTJ[i].getChildByName("Image_sanjiao_s").visible = true;
                        this.sortEffectViews_zhuliFKTJ[i].getChildByName("Image_sanjiao_n").visible = false;
                    }else {
                        this.sortEffectViews_zhuliFKTJ[i].setTextColor(cc.color(this.getColorsConfig().normal));
                        this.sortEffectViews_zhuliFKTJ[i].getChildByName("Image_sanjiao_s").visible = false;
                        this.sortEffectViews_zhuliFKTJ[i].getChildByName("Image_sanjiao_n").visible = true;
                    }
                    this.sortEffectViews_zhuliFKTJ[i].getChildByName("Image_sanjiao_s").setFlippedY(this.rankArrows_zhuliFKTJ[Number(i)] ==1) ;
                    this.sortEffectViews_zhuliFKTJ[i].getChildByName("Image_sanjiao_n").setFlippedY(this.rankArrows_zhuliFKTJ[Number(i)] ==1) ;
                }
            }
        }
        var title_renshu = panle_title.getChildByName("Text_renshu");
        var title_partInCount = panle_title.getChildByName("Text_partInCount");
        var title_ratioCount = panle_title.getChildByName("Text_ratioCount");
        var title_conCount = panle_title.getChildByName("Text_conCount");
        var title_expendCount = panle_title.getChildByName("Text_expendCount");

        var textAddListener = function(text,index)
        {
            text.setTouchEnabled(true);
            text.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.rankArrows_zhuliFKTJ[index] = that.rankArrows_zhuliFKTJ[index] ? 0 : 1;
                    that.setSortTypeEffect_zhuliFKTJ(index + 1);
                    that.reflashView_zhuliFKTJ();
                }
            }, this);
            text.getChildByName("Image_sanjiao_n").setTouchEnabled(true);
            text.getChildByName("Image_sanjiao_n").addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.rankArrows_zhuliFKTJ[index] = that.rankArrows_zhuliFKTJ[index] ? 0 : 1;
                    that.setSortTypeEffect_zhuliFKTJ(index + 1);
                    that.reflashView_zhuliFKTJ();
                }
            }, this);
            text.getChildByName("Image_sanjiao_s").setTouchEnabled(true);
            text.getChildByName("Image_sanjiao_s").addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.rankArrows_zhuliFKTJ[index] = that.rankArrows_zhuliFKTJ[index] ? 0 : 1;
                    that.setSortTypeEffect_zhuliFKTJ(index + 1);
                    that.reflashView_zhuliFKTJ();
                }
            }, this);
        }
        textAddListener(title_renshu,0);
        textAddListener(title_partInCount,1);
        textAddListener(title_ratioCount,2);
        textAddListener(title_conCount,3);
        textAddListener(title_expendCount,4);

        this.sortEffectViews_zhuliFKTJ = [title_renshu,title_partInCount,title_ratioCount,title_conCount,title_expendCount];
        this.rankArrows_zhuliFKTJ = [0,0,0,0,0];
        this.setSortTypeEffect_zhuliFKTJ(1)
        this.reqRecord_zhuliFKTJ();
        UIEventBind(null, this, "update_reqRecord_zhuliFKTJ", function(rtn) {
            that.reqRecord_zhuliFKTJ();
        });
    },
    initGroupYBTJ:function () {
        var that = this;
        if(this._initGroupTJ){
           return;
        }
        this._initGroupTJ = true;
        //输入玩家ID
        var panle_title = this.Panel_groupYB.getChildByName("Panle_title")//.getChildByName("Text_expendCount").setString("应收钻石");
        this.item_YBTJ = this.Panel_groupYB.getChildByName("cell");
        this.item_YBTJ.visible = false;
        var player_Panel_bottom = this.Panel_groupYB.getChildByName("Panel_bottom");
        if(player_Panel_bottom.getChildByName("image_date1_bg")){
            player_Panel_bottom.getChildByName("image_date1_bg").visible = false;
        }
        if(player_Panel_bottom.getChildByName("Text_zhi")){
            player_Panel_bottom.getChildByName("Text_zhi").visible = false;
        }

        var nowTime = MjClient.getCurrentTime();
        var _end_Time = player_Panel_bottom.getChildByName("image_date2_bg");
        var  point2 = _end_Time.convertToWorldSpace(_end_Time.getAnchorPointInPoints());
        point2.y = (point2.y+_end_Time.getBoundingBox().height/2);
        _end_Time.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                return;
                var str =that._end_Time_date_txt_YBTJ.getString();
                str = str.replace(/-/g,"/");
                var date = new Date(str );
                var data = {event:"_end_Time_date_txt_YBTJ",date:date,px:point2.x,py:point2.y};
                data.noShowDay = true;
                that.uinode.addChild(new friendcard_selectTime(data));
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_Shijianxuanze", {uid:SelfUid()});
            }
        }, this);
        this._end_Time_date_txt_YBTJ = _end_Time.getChildByName("Text_date_end");
        this._end_Time_date_txt_YBTJ.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
        this._end_Time_date_txt_YBTJ.setFontSize(this._end_Time_date_txt_YBTJ.getFontSize()-2)
        this._setShowTime2(this._end_Time_date_txt_YBTJ,nowTime[0],nowTime[1],nowTime[2],"00","00");
        UIEventBind(null, this._end_Time_date_txt_YBTJ, "_end_Time_date_txt_YBTJ", function (eD) {
            this._setShowTime2(this._end_Time_date_txt_YBTJ,eD.year,eD.month,eD.day,eD.hour,eD.minute);
        }.bind(this));

        var btn_check = player_Panel_bottom.getChildByName("btn_check");
        if(btn_check){
            btn_check.visible = false;
        }
        //请求元宝统计数据
        this.reqRecord_YBTJ = function() {
            var time = this._end_Time_date_txt_YBTJ.getString();
            var time_1 = FriendCard_Common.transdate(time.substring(0, 4), Number(time.substring(5, 7)) - 1, time.substring(8, 10), time.substring(11, 13), time.substring(14, 16));
            var requestInfo = {};
            requestInfo.clubId = that.clubData.info.clubId;
            requestInfo.time = time_1;
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.clubGameGroupStatis", requestInfo,
                function(rtn) {
                    cc.log(" =====pkplayer.handler. clubGameGroupStatis === " + JSON.stringify(rtn));
                    MjClient.unblock();
                    if (!cc.sys.isObjectValid(that))
                        return;
                    if (rtn.code == 0) {
                        that._record_data_YBTJ = rtn.data;
                        that.reflashView_YBTJ();
                    } else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        } else {
                            MjClient.showToast("获取数据失败,请重新打开");
                        }
                    }
                }
            );
        }

        this._chaXun_new(_end_Time, this._setTimeDay2.bind(this), this.reqRecord_YBTJ.bind(this),this._end_Time_date_txt_YBTJ);
        //刷新View
        this.reflashView_YBTJ = function () {
            var that = this;
            if(!that._record_data_YBTJ){
                return;
            }
            that.sortDataLocal_YBTJ();
            that.addItems_YBTJ(that._record_data_YBTJ);
        }
        //元宝数据本地排序
        this.sortDataLocal_YBTJ = function () {
            var that = this;
            var curSortType = 1
            var curSortType = that.sortType_YBTJ + (that.rankArrows_YBTJ[that.sortType_YBTJ -1] == 1 ? that.rankArrows_YBTJ.length : 0);
            var result = that._record_data_YBTJ;
            var setAttIsUndefined = function(a,att, def) {
                a[att] = a[att] ? a[att] : def;
            }
            for (var c in result) {
                setAttIsUndefined(result[c],"nickname", "");
                setAttIsUndefined(result[c],"userId", "");
                setAttIsUndefined(result[c],"actualAmont", 0);
                setAttIsUndefined(result[c],"actualCost", 0);
                setAttIsUndefined(result[c],"contribute", 0);
                setAttIsUndefined(result[c],"playUser", 0);
                setAttIsUndefined(result[c],"playGame", 0);
                setAttIsUndefined(result[c],"rebate", 0);
                setAttIsUndefined(result[c],"supplement", 0);
                setAttIsUndefined(result[c],"playWinner", 0);
            }
            result.sort(function(a, b) {
                if(curSortType == 1){
                    return b.playUser - a.playUser;
                }else if(curSortType == 2){
                    return b.playGame - a.playGame;
                }else if(curSortType == 3){
                    return b.playWinner - a.playWinner;
                }else if(curSortType == 4){
                    return a.playUser - b.playUser;
                }else if(curSortType == 5){
                    return a.playGame - b.playGame;
                }else if(curSortType == 6){
                    return a.playWinner - b.playWinner;
                }
                return 0;
            })
            that._record_data_YBTJ = result;
        }
        this.addItems_YBTJ = function(data){
            var list = this.Panel_groupYB.getChildByName("content_list");
            list.removeAllItems();
            for (var i in data) {
                var itemDta = data[i]
                var _item = this.item_YBTJ.clone();
                var text_group = _item.getChildByName("text_group");
                var text_name = _item.getChildByName("text_name");
                var text_ID = _item.getChildByName("text_ID");
                var text_renshu = _item.getChildByName("text_renshu");
                var text_partInCount = _item.getChildByName("text_partInCount");
                var text_DYJNum = _item.getChildByName("text_DYJNum");
                if (itemDta.group == 0 || itemDta.group  == "0") {
                    text_group.setString("未分组")
                } else {
                    text_group.setString(itemDta.group+"组")
                }
                text_name.setString(getPlayerName(unescape(itemDta.nickname)));
                text_ID.setString(itemDta.userId);
                text_renshu.setString(itemDta.playUser ? itemDta.playUser + "" : "0")
                text_partInCount.setString(itemDta.playGame ? itemDta.playGame + "" : "0")
                text_DYJNum.setString(itemDta.playWinner ? itemDta.playWinner + "" : "0")

                _item.visible = true;
                list.pushBackCustomItem(_item);
            }
        }
        this.setSortTypeEffect_YBTJ = function (sortType) {// 1大赢家   2积分  3场次
            this.sortType_YBTJ = sortType;
            if (!this.sortEffectViews_YBTJ){
                return;
            }
            if (sortType <= this.sortEffectViews_YBTJ.length){
                for (var i in this.sortEffectViews_YBTJ){
                    if (sortType == (Number(i)+1)){
                        this.sortEffectViews_YBTJ[i].setTextColor(cc.color(this.getColorsConfig().selected));
                        this.sortEffectViews_YBTJ[i].getChildByName("Image_sanjiao_s").visible = true;
                        this.sortEffectViews_YBTJ[i].getChildByName("Image_sanjiao_n").visible = false;
                    }else {
                        this.sortEffectViews_YBTJ[i].setTextColor(cc.color(this.getColorsConfig().normal));
                        this.sortEffectViews_YBTJ[i].getChildByName("Image_sanjiao_s").visible = false;
                        this.sortEffectViews_YBTJ[i].getChildByName("Image_sanjiao_n").visible = true;
                    }
                    this.sortEffectViews_YBTJ[i].getChildByName("Image_sanjiao_s").setFlippedY(this.rankArrows_YBTJ[Number(i)] ==1) ;
                    this.sortEffectViews_YBTJ[i].getChildByName("Image_sanjiao_n").setFlippedY(this.rankArrows_YBTJ[Number(i)] ==1) ;
                }
            }
        }
        var title_renshu = panle_title.getChildByName("Text_renshu");
        var title_partInCount = panle_title.getChildByName("Text_partInCount");
        var title_winnerCount = panle_title.getChildByName("Text_winnerCount");
        var textAddListener = function(text,index)
        {
            text.setEnabled(true);
            text.setTouchEnabled(true);
            text.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.rankArrows_YBTJ[index] = that.rankArrows_YBTJ[index] ? 0 : 1;
                    that.setSortTypeEffect_YBTJ(index + 1);
                    that.reflashView_YBTJ();
                }
            }, this);
            text.getChildByName("Image_sanjiao_n").setEnabled(true);
            text.getChildByName("Image_sanjiao_n").setTouchEnabled(true);
            text.getChildByName("Image_sanjiao_n").addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.rankArrows_YBTJ[index] = that.rankArrows_YBTJ[index] ? 0 : 1;
                    that.setSortTypeEffect_YBTJ(index + 1);
                    that.reflashView_YBTJ();
                }
            }, this);
            text.getChildByName("Image_sanjiao_s").setEnabled(true);
            text.getChildByName("Image_sanjiao_s").setTouchEnabled(true);

            text.getChildByName("Image_sanjiao_s").addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.rankArrows_YBTJ[index] = that.rankArrows_YBTJ[index] ? 0 : 1;
                    that.setSortTypeEffect_YBTJ(index + 1);
                    that.reflashView_YBTJ();
                }
            }, this);
        }
        textAddListener(title_renshu,0);
        textAddListener(title_partInCount,1);
        textAddListener(title_winnerCount,2);

        this.sortEffectViews_YBTJ = [title_renshu,title_partInCount,title_winnerCount];
        this.rankArrows_YBTJ = [0,0,0];
        this.setSortTypeEffect_YBTJ(1)
        this.reqRecord_YBTJ();
    },
    initGroupFKTJ:function () {
        var that = this;
        if(this._initGroupTJ){
            if(this.Panel_groupFK.isShouldReflash){
                this.Panel_groupFK.isShouldReflash = false;
                this.reqRecord_FKTJ();
            }
            return;
        }
        this._initGroupTJ = true;
        this.Panel_groupFK.reflashFuncName = "initGroupFKTJ";
        //输入玩家ID
        var panle_title = this.Panel_groupFK.getChildByName("Panle_title");
        this.item_FKTJ = this.Panel_groupFK.getChildByName("cell");
        this.item_FKTJ.visible = false;
        var player_Panel_bottom = this.Panel_groupFK.getChildByName("Panel_bottom");
        this.initYejiMode(this.Panel_groupFK,player_Panel_bottom,this._isCreater,!this._isCreater);

        //添加当天误差提示
        var text_tips = player_Panel_bottom.getChildByName("text_yejiMode").clone();
        text_tips.setString("(当日数据存在5分钟延迟)");
        text_tips.setTextColor(cc.color("#ff0000"));
        text_tips.setName("text_tips");
        if(FriendCard_Common.getSkinType() == 3){
            text_tips.setFontSize(16);
        }else{
            text_tips.setFontSize(18);
        }
        text_tips.setAnchorPoint(cc.p(0, 0.5));
        text_tips.x = (player_Panel_bottom.getChildByName("btn_changeyeji").x + player_Panel_bottom.getChildByName("btn_changeyeji").width + 10);
        player_Panel_bottom.addChild(text_tips);

        if(player_Panel_bottom.getChildByName("image_date1_bg")){
            player_Panel_bottom.getChildByName("image_date1_bg").visible = false;
        }
        if(player_Panel_bottom.getChildByName("Text_zhi")){
            player_Panel_bottom.getChildByName("Text_zhi").visible = false;
        }

        var nowTime = MjClient.getCurrentTime();
        var _end_Time = player_Panel_bottom.getChildByName("image_date2_bg");
        var  point2 = _end_Time.convertToWorldSpace(_end_Time.getAnchorPointInPoints());
        point2.y = (point2.y+_end_Time.getBoundingBox().height/2);
        _end_Time.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                return;
                var str =that._end_Time_date_txt_FKTJ.getString();
                str = str.replace(/-/g,"/");
                var date = new Date(str );
                var data = {event:"_end_Time_date_txt_FKTJ",date:date,px:point2.x,py:point2.y};
                data.noShowDay = true;
                that.uinode.addChild(new friendcard_selectTime(data));
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_Shijianxuanze", {uid:SelfUid()});
            }
        }, this);
        this._end_Time_date_txt_FKTJ = _end_Time.getChildByName("Text_date_end");
        this._end_Time_date_txt_FKTJ.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
        this._end_Time_date_txt_FKTJ.setFontSize(this._end_Time_date_txt_FKTJ.getFontSize()-2)
        this._setShowTime2(this._end_Time_date_txt_FKTJ,nowTime[0],nowTime[1],nowTime[2],"00","00");
        UIEventBind(null, this._end_Time_date_txt_FKTJ, "_end_Time_date_txt_FKTJ", function (eD) {
            this._setShowTime2(this._end_Time_date_txt_FKTJ,eD.year,eD.month,eD.day,eD.hour,eD.minute);
        }.bind(this));

        var btn_check = player_Panel_bottom.getChildByName("btn_check");
        if(btn_check){
            btn_check.visible = false;
        }

        //请求元宝统计数据
        this.reqRecord_FKTJ = function() {
            var time = this._end_Time_date_txt_FKTJ.getString();
            var time_1 = FriendCard_Common.transdate(time.substring(0, 4), Number(time.substring(5, 7)) - 1, time.substring(8, 10), time.substring(11, 13), time.substring(14, 16));

            var requestInfo = {};
            requestInfo.clubId = that.clubData.info.clubId;
            requestInfo.time = time_1;
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.clubGameGroupStatis", requestInfo,
                function(rtn) {
                    MjClient.unblock();
                    if (!cc.sys.isObjectValid(that))
                        return;
                    if (rtn.code == 0) {
                        that._record_data_FKTJ = rtn.data;
                        that.reflashView_FKTJ();
                    } else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        } else {
                            MjClient.showToast("获取数据失败,请重新打开");
                        }
                    }
                }
            );

            if(parseInt(time.substring(0, 4)) == nowTime[0] && parseInt(time.substring(5, 7)) == nowTime[1] && parseInt(time.substring(8, 10)) == nowTime[2]){
                text_tips.visible = true;
            }else{
                text_tips.visible = false;
            }
        }

        this._chaXun_new(_end_Time, this._setTimeDay2.bind(this), this.reqRecord_FKTJ.bind(this),this._end_Time_date_txt_FKTJ);
        //刷新View
        this.reflashView_FKTJ = function () {
            var that = this;
            if(!that._record_data_FKTJ){
                return;
            }
            that.sortDataLocal_FKTJ();
            that.addItems_FKTJ(that._record_data_FKTJ);
        }
        //房卡数据本地排序
        this.sortDataLocal_FKTJ = function () {
            var that = this;
            var curSortType = 1
            var curSortType = that.sortType_FKTJ + (that.rankArrows_FKTJ[that.sortType_FKTJ -1] == 1 ? that.rankArrows_FKTJ.length : 0);
            var result = that._record_data_FKTJ;
            var setAttIsUndefined = function(a,att, def) {
                a[att] = a[att] ? a[att] : def;
            }
            for (var c in result) {
                setAttIsUndefined(result[c],"nickname", "");
                setAttIsUndefined(result[c],"userId", "");
                setAttIsUndefined(result[c],"actualAmont", 0);
                setAttIsUndefined(result[c],"actualCost", 0);
                setAttIsUndefined(result[c],"contribute", 0);
                setAttIsUndefined(result[c],"playUser", 0);
                setAttIsUndefined(result[c],"effectPlayUser", 0);
                setAttIsUndefined(result[c],"effectPlayGame", 0);
                setAttIsUndefined(result[c],"rebate", 0);
                setAttIsUndefined(result[c],"supplement", 0);
                setAttIsUndefined(result[c],"winCount", 0);
                setAttIsUndefined(result[c],"effectScore", 0);//总分    number
            }
            result.sort(function(a, b) {
                if(curSortType == 1){
                    return b.playUser - a.playUser;
                }else if(curSortType == 2){
                    return b.effectPlayUser - a.effectPlayUser;
                }else if(curSortType == 3){
                    return b.rebate - a.rebate;
                }else if(curSortType == 4){
                    return b.contribute - a.contribute;
                }else if(curSortType == 5){
                    return a.actualAmont - b.actualAmont;
                }else if(curSortType == 6){
                    return a.effectScore - b.effectScore;
                }else if(curSortType == 7){
                    return a.playUser - b.playUser;
                }else if(curSortType == 8){
                    return a.effectPlayUser - b.effectPlayUser;
                }else if(curSortType == 9){
                    return a.rebate - b.rebate;
                }else if(curSortType == 10){
                    return a.contribute - b.contribute;
                }else if(curSortType == 11){
                    return a.actualAmont - b.actualAmont;
                }else if(curSortType == 12){
                    return a.effectScore - b.effectScore;
                }
                return 0;
            })
            that._record_data_FKTJ = result;
        }
        this.addItems_FKTJ = function(data){
            var list = this.Panel_groupFK.getChildByName("content_list");
            list.removeAllItems();
            for (var i in data) {
                var itemDta = data[i]
                var _item = this.item_FKTJ.clone();
                var text_group = _item.getChildByName("text_group");
                var text_name = _item.getChildByName("text_name");
                var text_ID = _item.getChildByName("text_ID");
                var text_renshu = _item.getChildByName("text_renshu");
                var text_partInCount = _item.getChildByName("text_partInCount");
                var text_effectPlayGame = _item.getChildByName("text_effectPlayGame");
                var text_ratioCount = _item.getChildByName("text_ratioCount");
                var text_conCount = _item.getChildByName("text_conCount");
                var text_expendCount = _item.getChildByName("text_expendCount");
                var btn_details = _item.getChildByName("btn_details");
                var text_total_count = _item.getChildByName("text_total_count");
                var text_setratioCount = _item.getChildByName("text_setratioCount");
                text_setratioCount.setTouchEnabled(true);
                text_setratioCount.visible = that._isCreater;
                if(!text_ratioCount._standY){
                    text_ratioCount._standY = text_ratioCount.y;
                }
                if(!text_setratioCount.visible){
                    text_ratioCount.y = text_expendCount.y;
                }else{
                    text_ratioCount.y = text_ratioCount._standY;
                }
                text_setratioCount.data = itemDta;
                btn_details.data = itemDta;
                if (itemDta.group == 0 || itemDta.group  == "0") {
                    text_group.setString("未分组")
                } else {
                    text_group.setString(itemDta.group+"组")
                }
                text_name.setString(getPlayerName(unescape(itemDta.nickname)));
                text_ID.setString(itemDta.userId);
                text_total_count.setString(itemDta.effectScore ? itemDta.effectScore + "" : "0");
                text_renshu.setString(itemDta.playUser ? itemDta.playUser + "" : "0");
                text_partInCount.setString(itemDta.effectPlayUser ? itemDta.effectPlayUser + "" : "0");
                text_effectPlayGame.setString(itemDta.effectPlayGame ? itemDta.effectPlayGame + "" : "0");
                text_ratioCount.setString(itemDta.rebate ? (itemDta.rebate * 100).toFixed(0)  + "%" : "0%");
                text_conCount.setString(itemDta.contribute ? itemDta.contribute + "" : "0");
                text_expendCount.setString(itemDta.actualAmont ? itemDta.actualAmont + "" : "0");
                if (itemDta.nickname == "" && itemDta.userId == "" && itemDta.effectPlayUser == 0)
                    btn_details.setVisible(false);
                btn_details.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        that.uinode.addChild(new FriendCard__tongji_selectOpt(function(type){
                            if(type == 2){
                                sender.data.time = that._end_Time_date_txt_FKTJ.getString();
                                sender.data._comeFromType = 1;
                                that.uinode.addChild(new FriendCard_tongjiDetails(sender.data));
                            }else if(type == 1){
                                var time = that._end_Time_date_txt_FKTJ.getString();
                                var startTime = FriendCard_Common.transdate(time.substring(0, 4), Number(time.substring(5, 7)) - 1, time.substring(8, 10), time.substring(11, 13), time.substring(14, 16));
                                var data = {
                                    isLMClub:false,
                                    group:sender.data.group,
                                    type:1,
                                    clubData:that.clubData,
                                    startTime:startTime,
                                }
                                that.uinode.addChild(new FriendCard_tongji_member(data));
                            }
                        }))
                    }
                }, this);
                text_setratioCount.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        sender.data.clubId = that.clubData.info.clubId;
                        that.uinode.addChild(new FriendCard_setRatio(sender.data));
                    }
                }, this);

                _item.visible = true;
                list.pushBackCustomItem(_item);
            }
        }
        this.setSortTypeEffect_FKTJ = function (sortType) {// 1人数   2参与场次  3比例  4贡献
            this.sortType_FKTJ = sortType;
            if (!this.sortEffectViews_FKTJ){
                return;
            }
            if (sortType <= this.sortEffectViews_FKTJ.length){
                for (var i in this.sortEffectViews_FKTJ){
                    if (sortType == (Number(i)+1)){
                        this.sortEffectViews_FKTJ[i].setTextColor(cc.color(this.getColorsConfig().selected));
                        this.sortEffectViews_FKTJ[i].getChildByName("Image_sanjiao_s").visible = true;
                        this.sortEffectViews_FKTJ[i].getChildByName("Image_sanjiao_n").visible = false;
                    }else {
                        this.sortEffectViews_FKTJ[i].setTextColor(cc.color(this.getColorsConfig().normal));
                        this.sortEffectViews_FKTJ[i].getChildByName("Image_sanjiao_s").visible = false;
                        this.sortEffectViews_FKTJ[i].getChildByName("Image_sanjiao_n").visible = true;
                    }
                    this.sortEffectViews_FKTJ[i].getChildByName("Image_sanjiao_s").setFlippedY(this.rankArrows_FKTJ[Number(i)] ==1) ;
                    this.sortEffectViews_FKTJ[i].getChildByName("Image_sanjiao_n").setFlippedY(this.rankArrows_FKTJ[Number(i)] ==1) ;
                }
            }
        }
        var title_renshu = panle_title.getChildByName("Text_renshu");
        var title_partInCount = panle_title.getChildByName("Text_partInCount");
        var title_ratioCount = panle_title.getChildByName("Text_ratioCount");
        var title_conCount = panle_title.getChildByName("Text_conCount");
        var title_expendCount = panle_title.getChildByName("Text_expendCount");
        var title_total_score = panle_title.getChildByName("Text_total_score");
        var textAddListener = function(text,index)
        {
            text.setTouchEnabled(true);
            text.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.rankArrows_FKTJ[index] = that.rankArrows_FKTJ[index] ? 0 : 1;
                    that.setSortTypeEffect_FKTJ(index + 1);
                    that.reflashView_FKTJ();
                }
            }, this);
            text.getChildByName("Image_sanjiao_n").setTouchEnabled(true);
            text.getChildByName("Image_sanjiao_n").addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.rankArrows_FKTJ[index] = that.rankArrows_FKTJ[index] ? 0 : 1;
                    that.setSortTypeEffect_FKTJ(index + 1);
                    that.reflashView_FKTJ();
                }
            }, this);
            text.getChildByName("Image_sanjiao_s").setTouchEnabled(true);
            text.getChildByName("Image_sanjiao_s").addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.rankArrows_FKTJ[index] = that.rankArrows_FKTJ[index] ? 0 : 1;
                    that.setSortTypeEffect_FKTJ(index + 1);
                    that.reflashView_FKTJ();
                }
            }, this);
        }
        textAddListener(title_renshu,0);
        textAddListener(title_partInCount,1);
        textAddListener(title_ratioCount,2);
        textAddListener(title_conCount,3);
        textAddListener(title_expendCount,4);
        textAddListener(title_total_score,5);
        this.sortEffectViews_FKTJ = [title_renshu,title_partInCount,title_ratioCount,title_conCount,title_expendCount,title_total_score];
        this.rankArrows_FKTJ = [0,0,0,0,0,0];
        this.setSortTypeEffect_FKTJ(1)
        this.reqRecord_FKTJ();
        UIEventBind(null, this, "update_reqRecord_FKTJ", function(rtn) {
                that.reqRecord_FKTJ();
        });
    },
    initYejiMode:function(panle,panleBottomNode,canChangeBtn,detailBtn){
        var that = this;
        var text_yejiMode = panleBottomNode ? panleBottomNode.getChildByName("text_yejiMode") : null;
        var btn_changeyeji = panleBottomNode ? panleBottomNode.getChildByName("btn_changeyeji") : null;
        var btn_yeji_detail = panleBottomNode ? panleBottomNode.getChildByName("btn_yeji_detail") : null;

        if(text_yejiMode){
            text_yejiMode.setString("业绩模式："+FriendCard_Common.yejiModeConfig[this.clubData.info.kpiMode ? this.clubData.info.kpiMode : 0])

        }
        if(btn_changeyeji){
            btn_changeyeji.visible = canChangeBtn;
        }
        if(btn_yeji_detail){
            btn_yeji_detail.visible = detailBtn;
        }
        if(btn_changeyeji){
            btn_changeyeji.addTouchEventListener(function(sender,type){
                if(type != 2){
                    return;
                }
                var data = {};
                data._isChange = true;
                that.uinode.addChild(new FriendCard_selectYejiMode(data));
            });
        }
        if(btn_yeji_detail){
            btn_yeji_detail.addTouchEventListener(function(sender,type){
                if(type != 2){
                    return;
                }
                var data = {};
                data._isChange = false;
                that.uinode.addChild(new FriendCard_selectYejiMode(data));
            });
        }

        UIEventBind(null, this, "club_refresh_info", function(rtn) {
            if(this.clubData.info.kpiMode != rtn.kpiMode){
                panle.isShouldReflash = true;
                if(panle.visible && panle.reflashFuncName){
                    var action = cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                        this[panle.reflashFuncName]();
                    }.bind(this)));
                    action.tag = 20190919;
                    panle.stopActionByTag(20190919);
                    panle.runAction(action)
                }
                panle.runAction(cc.callFunc(function(){
                    this.clubData.info.kpiMode = rtn.kpiMode;
                }.bind(this)))
            }
            if(panleBottomNode && text_yejiMode){
                text_yejiMode.setString("业绩模式："+FriendCard_Common.yejiModeConfig[rtn.kpiMode ? rtn.kpiMode : 0])
            }
        }.bind(this));
    },
    getMoneyTitle:function(){
        var str = (this.clubData.info.type == 1) ? "应" : "";
        str += (this.clubData.info.kpiMode == 1) ? "均分" : "消耗";
        return str + this._costName;
    },
    //数据刷新
    fresh_table:function(){
        if (this._isManager || this.isAssistants) {
            var Panle_top = this.Panel_playertongji_manager.getChildByName("Panle_top");
            var text_changci = Panle_top.getChildByName("text_changci");
            text_changci.ignoreContentAdaptWithSize(true);

            var text_changci_title = Panle_top.getChildByName("text_changci_title");

            if (this._record_data && ("gameCount" in this._record_data))
            {
                if(FriendCard_Common.getSkinType() == 2 || FriendCard_Common.getSkinType() == 3 || FriendCard_Common.getSkinType() == 4)
                {
                    text_changci_title.visible = true;
                    text_changci.setString("" + this._record_data.gameCount);
                }
                else
                {
                    text_changci.setString("全部场次:" + this._record_data.gameCount);
                }
            }
            else
            {
                if(text_changci_title)
                    text_changci_title.visible = false;
                text_changci.setString("");
            }

            var text_fullChangci = Panle_top.getChildByName("text_fullChangci");
            var text_fullChangci_title = Panle_top.getChildByName("text_fullChangci_title");

            text_fullChangci.ignoreContentAdaptWithSize(true);
            if (this._record_data &&  ("fullCount" in this._record_data))
            {

                if(FriendCard_Common.getSkinType() == 2 || FriendCard_Common.getSkinType() == 3 || FriendCard_Common.getSkinType() == 4)
                {
                    text_fullChangci_title.visible = true;
                    text_fullChangci.setString("" + this._record_data.fullCount);
                }
                else
                {
                    text_fullChangci.setString("完整场次:" + this._record_data.fullCount);
                }
            }
            else
            {
                if(text_fullChangci_title)
                    text_fullChangci_title.visible = false;
                text_fullChangci.setString("");
            }

            var text_group = Panle_top.getChildByName("text_group");

            text_group.ignoreContentAdaptWithSize(true);
            text_group.setString(this.btn_checkGroup.getTitleText());


            var text_money = Panle_top.getChildByName("text_money");
            var text_money_title = Panle_top.getChildByName("text_money_title");

            text_money.ignoreContentAdaptWithSize(true);
            if (this._record_data &&  ("consumeMoney" in this._record_data))
            {
                if(FriendCard_Common.getSkinType() == 2|| FriendCard_Common.getSkinType() == 3 || FriendCard_Common.getSkinType() == 4)
                {
                    text_money_title.setString(this.getMoneyTitle() + ":");
                    text_money_title.visible = true;
                    text_money.setString("" + this._record_data.consumeMoney);
                    text_money.x = text_money_title.x + text_money_title.width + 3
                }
                else{
                    text_money.setString(this.getMoneyTitle() + ":" + this._record_data.consumeMoney);
                }
            }
            else
            {
                if(text_money_title)
                    text_money_title.visible = false;
                text_money.setString("");
            }


            //参与人次
            var text_playerCount = Panle_top.getChildByName("text_playerCount");
            var text_playerCount_title = Panle_top.getChildByName("text_playerCount_title");

            text_playerCount.ignoreContentAdaptWithSize(true);
            if (this._record_data &&  ("playerCount" in this._record_data))
            {
                if(FriendCard_Common.getSkinType() == 2|| FriendCard_Common.getSkinType() == 3 || FriendCard_Common.getSkinType() == 4)
                {
                    text_playerCount_title.visible = true;
                    text_playerCount.setString("" + this._record_data.playerCount);
                }
                else
                {
                    text_playerCount.setString("参与人次:" + this._record_data.playerCount);
                }
            }
            else
            {
                if(text_playerCount_title)
                    text_playerCount_title.visible = false;
                text_playerCount.setString("");
            }


            //活跃玩家
            var text_activeCount = Panle_top.getChildByName("text_activeCount");
            var text_activeCount_title = Panle_top.getChildByName("text_activeCount_title");

            text_activeCount.ignoreContentAdaptWithSize(true);
            if(this._record_data &&  ("activeCount" in this._record_data))
            {
                if(FriendCard_Common.getSkinType() == 2 || FriendCard_Common.getSkinType() == 3 || FriendCard_Common.getSkinType() == 4)
                {
                    text_activeCount_title.visible = true;
                    text_activeCount.setString("" + this._record_data.activeCount);
                }
                else
                {
                    text_activeCount.setString("活跃玩家:" + this._record_data.activeCount);
                }
            }
            else
            {
                if(text_activeCount_title)
                    text_activeCount_title.visible = false;
                text_activeCount.setString("");
            }

            //当前玩法不是全部的时候
            if (this._checkGroupType != "-1") {
                if (text_activeCount_title)
                    text_activeCount_title.visible = false;

                text_activeCount.visible = false;
                text_changci.visible = false;
                text_group.visible = !text_changci.visible;

                if (text_changci_title)
                    text_changci_title.visible = false;


            } else {
                if (this._record_data &&  ("activeCount" in this._record_data)) {
                    text_activeCount.visible = true;
                    if (text_activeCount_title) {
                        text_activeCount_title.visible = true;
                    }
                }

                //text_playerCount.y = this.text_playerCountInitY;
                if (this._record_data &&  ("gameCount" in this._record_data)) {
                    text_changci.visible = true;
                    if (text_changci_title) {
                        text_changci_title.visible = true;
                    }
                }
                text_group.visible = !text_changci.visible;
            }

            if (this.text_payPlayerCount) {
                this.text_payPlayerCount.visible = false;
            }
            if (this.text_payPlayerCount_title) {
                this.text_payPlayerCount_title.visible = false;
            }
            if (this._record_data &&  ("payPlayerCount" in this._record_data)) {
                if (!this.text_payPlayerCount) {
                    if(FriendCard_Common.getSkinType() == 2|| FriendCard_Common.getSkinType() == 3 || FriendCard_Common.getSkinType() == 4){
                        this.text_payPlayerCount = text_fullChangci.clone();
                        this.text_payPlayerCount_title = text_fullChangci_title.clone();
                    }else{
                        this.text_payPlayerCount = text_fullChangci.clone();
                    }

                    this.text_payPlayerCount._standY1 = this.text_payPlayerCount.y;
                    this.text_payPlayerCount._standY2 = this.text_payPlayerCount._standY1 + text_fullChangci.y - text_playerCount.y;
                    if(this.text_payPlayerCount_title){
                        this.text_payPlayerCount_title.setString("有效人次:")
                        Panle_top.addChild(this.text_payPlayerCount_title);
                    }
                    Panle_top.addChild(this.text_payPlayerCount);
                }
                if(this._checkGroupType != "-1"){
                    //当前玩法不是全部的时候
                    this.text_payPlayerCount.y = this.text_payPlayerCount._standY1;
                }else{
                    if(FriendCard_Common.getSkinType() == 1){
                        this.text_payPlayerCount.y = this.text_payPlayerCount._standY1 - ( this.text_payPlayerCount._standY1 - text_playerCount.y)/2;
                    }else if(FriendCard_Common.getSkinType() == 3){
                        this.text_payPlayerCount.y = this.text_payPlayerCount._standY1 - ( this.text_payPlayerCount._standY1 - text_playerCount.y)/2;
                    }else{
                        this.text_payPlayerCount.y = this.text_payPlayerCount._standY2;
                    }
                }
                if (this.text_payPlayerCount_title) {
                    this.text_payPlayerCount_title.y = this.text_payPlayerCount.y;
                    this.text_payPlayerCount_title.visible = true;
                }
                this.text_payPlayerCount.setVisible(true);
                if(FriendCard_Common.getSkinType() == 2|| FriendCard_Common.getSkinType() == 3 || FriendCard_Common.getSkinType() == 4){
                    this.text_payPlayerCount.setString(this._record_data.payPlayerCount+"");
                }else{
                    this.text_payPlayerCount.setString("有效人次:" + this._record_data.payPlayerCount);

                }
            }
            if (this.text_payGameCount) {
                this.text_payGameCount.visible = false;
            }
            if (this.text_payGameCount_title) {
                this.text_payGameCount_title.visible = false;
            }
            if (this._record_data &&  ("payGameCount" in this._record_data)) {
                if (!this.text_payGameCount) {
                    if(FriendCard_Common.getSkinType() == 2|| FriendCard_Common.getSkinType() == 3 || FriendCard_Common.getSkinType() == 4){
                        this.text_payGameCount = text_money.clone();
                        this.text_payGameCount_title = text_money_title.clone();
                    }else{
                        this.text_payGameCount = text_money.clone();
                    }

                    this.text_payGameCount._standY1 = this.text_payGameCount.y;
                    this.text_payGameCount._standY2 = this.text_payGameCount._standY1 + text_fullChangci.y - text_playerCount.y;
                    if(this.text_payGameCount_title){
                        this.text_payGameCount_title.setString("有效场次:")
                        Panle_top.addChild(this.text_payGameCount_title);
                    }
                    Panle_top.addChild(this.text_payGameCount);
                }
                /*if(this._checkGroupType != "-1"){
                    //当前玩法不是全部的时候
                    this.text_payGameCount.y = this.text_payGameCount._standY1;
                }else{
                    if(FriendCard_Common.getSkinType() == 1){
                        this.text_payGameCount.y = this.text_payGameCount._standY1  - ( this.text_payPlayerCount._standY1 - text_playerCount.y)/2;
                    }else if(FriendCard_Common.getSkinType() == 3){
                        this.text_payGameCount.y = this.text_payGameCount._standY1  - ( this.text_payPlayerCount._standY1 - text_playerCount.y)/2;
                    }else{
                        this.text_payGameCount.y = this.text_payGameCount._standY2;
                    }
                }*/
                if(FriendCard_Common.getSkinType() == 1){
                    this.text_payGameCount.y = this.text_payGameCount._standY1  - ( this.text_payPlayerCount._standY1 - text_playerCount.y)/2;
                }else if(FriendCard_Common.getSkinType() == 3){
                    this.text_payGameCount.y = this.text_payGameCount._standY1  - ( this.text_payPlayerCount._standY1 - text_playerCount.y)/2;
                }else{
                    this.text_payGameCount.y = this.text_payGameCount._standY2;
                }
                if (this.text_payGameCount_title) {
                    this.text_payGameCount_title.y = this.text_payGameCount.y;
                    this.text_payGameCount_title.visible = true;
                }
                this.text_payGameCount.setVisible(true);
                if(FriendCard_Common.getSkinType() == 2 || FriendCard_Common.getSkinType() == 3 || FriendCard_Common.getSkinType() == 4){
                    this.text_payGameCount.setString(this._record_data.payGameCount+"");
                }else{
                    this.text_payGameCount.setString("有效场次:" + this._record_data.payGameCount);

                }
            }

            var text_winnerCount = Panle_top.getChildByName("text_winnerCount");
            var text_winnerCount_title = Panle_top.getChildByName("text_winnerCount_title");

            text_winnerCount.ignoreContentAdaptWithSize(true);
            if (this._record_data &&  ("winnerCount" in this._record_data)){
                if(FriendCard_Common.getSkinType() == 2 || FriendCard_Common.getSkinType() == 3  || FriendCard_Common.getSkinType() == 4){
                    text_winnerCount_title.visible = true;
                    text_winnerCount.setString("" + this._record_data.winnerCount);
                }
                else{
                    text_winnerCount.setString("大赢家:" + this._record_data.winnerCount);
                }
            }
            else{
                if(text_winnerCount_title)
                    text_winnerCount_title.visible = false;
                text_winnerCount.setString("");
            }

            //text_groupMemNum
            var text_groupMemNum = Panle_top.getChildByName("text_groupMemNum");
            var text_groupMemNum_title = Panle_top.getChildByName("text_groupMemNum_title");
            text_groupMemNum.ignoreContentAdaptWithSize(true);
            var _scoreZF = (this._record_data && this._record_data.groupTotalScore) ? this._record_data.groupTotalScore : 0;
            if(text_groupMemNum && text_groupMemNum_title){
                if (!this.text_zongFenTongJi_title) {
                    this.text_zongFenTongJi_title = text_groupMemNum_title.clone();
                    this.text_zongFenTongJi_title.setString("总分:");
                    this.text_zongFenTongJi_title.setVisible(false);
                    this.text_zongFenTongJi_title.y += 40;
                    Panle_top.addChild(this.text_zongFenTongJi_title);

                }

                if (!this.text_zongFenTongJi) {
                    this.text_zongFenTongJi = text_groupMemNum.clone();
                    this.text_zongFenTongJi.setVisible(false);
                    this.text_zongFenTongJi.y += 40;
                    this.text_zongFenTongJi.x -= 40;
                    Panle_top.addChild(this.text_zongFenTongJi);
                }

                this.text_zongFenTongJi.setString(_scoreZF);

            }else if(text_groupMemNum){
                if (!this.text_zongFenTongJi) {
                    this.text_zongFenTongJi = text_groupMemNum.clone();
                    this.text_zongFenTongJi.setVisible(false);
                    this.text_zongFenTongJi.y += 40;
                    Panle_top.addChild(this.text_zongFenTongJi);
                }
                this.text_zongFenTongJi.setString("总分:" + _scoreZF);
            }


            if (this._record_data &&  ("groupCount" in this._record_data)){
                if(FriendCard_Common.getSkinType() == 2 || FriendCard_Common.getSkinType() == 3  || FriendCard_Common.getSkinType() == 4){
                    text_groupMemNum_title.visible = true;
                    text_groupMemNum_title.setString("人数:")
                    text_groupMemNum.setString("" + this._record_data.groupCount);
                    text_groupMemNum.x = text_groupMemNum_title.x + text_groupMemNum_title.width
                }
                else{
                    text_groupMemNum.setString("人数:" + this._record_data.groupCount);
                }

                if(this.text_zongFenTongJi){
                    this.text_zongFenTongJi.setVisible(true);
                }
                if(this.text_zongFenTongJi_title){
                    this.text_zongFenTongJi_title.setVisible(true);
                }
            }
            else{
                if(text_groupMemNum_title)
                    text_groupMemNum_title.visible = false;
                text_groupMemNum.setString("");
                if(this.text_zongFenTongJi){
                    this.text_zongFenTongJi.setVisible(false);
                }
                if(this.text_zongFenTongJi_title){
                    this.text_zongFenTongJi_title.setVisible(false);
                }
            }

        }

        var text_clubName = this._back.getChildByName("text_clubName");
        text_clubName.ignoreContentAdaptWithSize(true);
        var text_clubID = this._back.getChildByName("text_clubID");
        text_clubName.ignoreContentAdaptWithSize(true);
        if(FriendCard_Common.getSkinType() == 4){
            var titleStr = unescape(this.clubData.info.title).replace(/[\r\n]/g,"");
            text_clubName.setString(getPlayerName(titleStr,6));
        }else{
            text_clubName.setString(unescape(this.clubData.info.title).replace(/[\r\n]/g,""));
        }
        text_clubID.setString("亲友圈ID:" + this.clubData.info.clubId);

        if(!text_clubID.initY)
            text_clubID.initY = text_clubID.y;
        if(this._isManager || this.isAssistants)
        {
            text_clubID.x = text_clubName.x;
            text_clubID.y = text_clubID.initY;
        }
        else
        {
            text_clubID.y = text_clubName.y;
            text_clubID.x = text_clubName.x + text_clubName.width + 10;
        }
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
    _setShowTime2:function(node,txt_1,txt_2,txt_3){
        if((txt_2+"").length < 2){
            txt_2 = "0"+txt_2;
        }
        if((txt_3+"").length < 2){
            txt_3 = "0"+txt_3;
        }

        node.setString(txt_1+"-"+txt_2+"-"+txt_3);
    },
    // 前一天 或后一天的 查询
    _setTimeDay:function(one_day){
        var that = this;
        this._ratainDay = this._start_time_date;
        var str =that._start_Time_date_txt.getString();
        str = str.replace(/-/g,"/");
        var date = new Date(str);
        date.setDate(date.getDate()+one_day)
        var txt_1 = date.getFullYear();
        var txt_2 = date.getMonth() + 1 + "";
        var txt_3 = date.getDate() + "";
        var txt_4 = date.getHours() + "";
        var txt_5 = date.getMinutes() + "";
        txt_2 = txt_2.length <2? "0"+txt_2:txt_2;
        txt_3 = txt_3.length<2? "0"+txt_3:txt_3;
        this._setShowTime(this._start_Time_date_txt,txt_1,txt_2,txt_3,"00","00");

        var nextDate = new Date(date.getFullYear(),date.getMonth(),date.getDate() + 1);
        var nextTime = MjClient.getCurrentTime(nextDate);
        this._setShowTime(this._end_Time_date_txt,nextTime[0],nextTime[1],nextTime[2],"00","00");

    },
    // 前一天 或后一天的 查询 (新版 first_txt, second_txt 为了适用于其他查询 时间 )
    _setTimeDay2: function (one_day, first_txt, second_txt) {
        var that = this;
        var _start_node = first_txt;
        var str = _start_node.getString();
        str = str.replace(/-/g, "/");
        var date = new Date(str);
        date.setDate(date.getDate() + one_day)
        var txt_1 = date.getFullYear();
        var txt_2 = date.getMonth() + 1 + "";
        var txt_3 = date.getDate() + "";

        txt_2 = txt_2.length < 2 ? "0" + txt_2 : txt_2;
        txt_3 = txt_3.length < 2 ? "0" + txt_3 : txt_3;
        _start_node.setString(txt_1+"-"+ txt_2+"-"+ txt_3);
        if (second_txt) {
            var _end_node = second_txt;
            date.setDate(date.getDate() + 1)
            var txt_1 = date.getFullYear();
            var txt_2 = date.getMonth() + 1 + "";
            var txt_3 = date.getDate() + "";
            txt_2 = txt_2.length < 2 ? "0" + txt_2 : txt_2;
            txt_3 = txt_3.length < 2 ? "0" + txt_3 : txt_3;
            _end_node.setString(txt_1 + "-" + txt_2 + "-" + txt_3);
        }

    },



    //检查选择的时间与当天相隔几天
    checkTimeRange:function(){
        if(!this._nowTime || !this._start_time_date || !this._end_time_date)
            return

        var range ;
        if (this.clubData.info.isShowStats == 1) {
            range = 3;
        } else if (this.clubData.info.isShowStats == 2) {
            range = 7;
        } else if (this.clubData.info.isShowStats == 3) {
            range = 1;
        }

        var oneDayTime  = 24 * 60 * 60 * 1000 ;


        var time = FriendCard_Common.transdate(this._nowTime.substring(0,4),Number(this._nowTime.substring(5,7))-1,Number(this._nowTime.substring(8,10)) - 1,"00","00");
        //var endTime = FriendCard_Common.transdate(this._nowTime.substring(0,4),Number(this._nowTime.substring(5,7))-1,this._nowTime.substring(8,10),24);
        var startRange = (time - this._start_time_date) / oneDayTime + 2;
        //var endRange = (time - this._end_time_date) / oneDayTime + 1;
        if (startRange >= range) {
            this.btn_before.isClick = false;
        } else {
            this.btn_before.isClick = true;
        }
        if (/*endRange < 0  ||*/ this._end_Time_date_txt.getString() == this._endTime) {
            this.btn_after.isClick = false;
        } else {
            this.btn_after.isClick = true;
        }

    },
    //校准时间的合法性
    is_RightData: function() {
        this._start_time = this._start_Time_date_txt.getString();
        this._end_time = this._end_Time_date_txt.getString();
        var time_1 = FriendCard_Common.transdate(this._start_time.substring(0,4),Number(this._start_time.substring(5,7))-1,this._start_time.substring(8,10),this._start_time.substring(11,13),this._start_time.substring(14,16));
        var time_2 = FriendCard_Common.transdate(this._end_time.substring(0,4),Number(this._end_time.substring(5,7))-1,this._end_time.substring(8,10),this._end_time.substring(11,13),this._end_time.substring(14,16));
        this._start_time_date = time_1 < time_2 ? time_1:time_2;
        this._end_time_date = time_1 > time_2 ? time_1:time_2;
        if(time_1  > time_2){
            var endTime = this._end_time;
            this._end_time = this._start_time;
            this._start_time = endTime;
        }
        return true;
    },
    reflashGameList:function () {
        if(!this._record_data || !this._record_data.gameList){
            return;
        }
        this._gameTypeList = [];
        for(var i = 0 ; i < this._record_data.gameList.length; i++){
            this._gameTypeList.push(this._record_data.gameList[i]["gameType"]);
        }

    },
    reflashView:function () {
        var that = this;
        if(!that._record_data){
            return;
        }
        that.fresh_table();
        that.sortDataLocal();
        that.addItems(that._record_data.rankList);
    },
    sortDataLocal:function () {
        var that = this;
        var curSortType = that.sortType + (that.rankArrows[that.sortType -1] == 1 ? that.rankArrows.length : 0)

        var result = that._record_data.rankList;
        result.sort(function(a, b) {
            if(curSortType == 1){
                return b.win - a.win;
            }else if(curSortType == 2){
                return b.score - a.score;
            }else if(curSortType == 3){
                return b.total - a.total;
            }else if(curSortType == 4){
                return a.win - b.win;
            }else if(curSortType == 5){
                return a.score - b.score;
            }else if(curSortType == 6){
                return a.total - b.total;
            }
            return 0;
        })
        that._record_data.rankList = result;
    },
    // 查询功能请求
    reqCheck: function(clubId, start,end, sortType) {
        var that = this;
        MjClient.block();
        var curSortType = sortType + (that.rankArrows[that.sortType -1] == 1 ? 3 : 0)
        curSortType = 0;
        var sendInfo ={
            clubId: clubId,
            type:1,
            sortord: curSortType,
            start: start,
            end : end,
        }
        var nowTime = MjClient.getCurrentTime();
        var nowTime = FriendCard_Common.transdate(nowTime[0], nowTime[1] - 1, nowTime[2], "23", "59")
        this._timespan = Math.ceil((nowTime - start) / 86400000) //搜索时间跨度超过35天不显示分数
        if(this._assisUserId != -1){
            sendInfo.assisUserId = this._assisUserId;
        }
        //分组，  如果是0就不发生这个参数
        if(this._checkGroupType !== "-1")
            sendInfo.group = this._checkGroupType;
        //查询玩家ID
        if(this.img_IDorName && this.img_IDorName.getString().length > 2)
            sendInfo.userId  = this.img_IDorName.getString();
        //游戏类型
        if(this._gameType != -1){
            sendInfo.gameType = this._gameType;
        }
        if(this._ruleId){
            sendInfo.ruleId = this._ruleId;
        }
        //大赢家查询
        if(this.btn_winnerCfg && this.check_winnerAll) {
            if(!this.check_winnerAll.isSelected()) {
                sendInfo.min = Number(this.image_winnerStart.getString());
                sendInfo.max = Number(this.image_winnerEnd.getString());
                if(sendInfo.max == 0) {
                    sendInfo.max = null;
                }
                if(sendInfo.max != null && sendInfo.max < sendInfo.min) {
                    var temp = sendInfo.max;
                    sendInfo.max = sendInfo.min;
                    sendInfo.min = temp;
                }
                if(!sendInfo.max) {
                    if(this.btn_winnerCfg.getChildByName("Text")){
                        this.btn_winnerCfg.getChildByName("Text").setString(sendInfo.min + "分起 ");
                    }else{
                        this.btn_winnerCfg.setTitleText(sendInfo.min + "分起 ")
                    }
                }
                else {
                    if(this.btn_winnerCfg.getChildByName("Text")){
                        this.btn_winnerCfg.getChildByName("Text").setString(sendInfo.min + "-" + sendInfo.max +"分 ");
                    }else{
                        this.btn_winnerCfg.setTitleText(sendInfo.min + "-" + sendInfo.max +"分 ")
                    }
                }
            }
            else {
                if(this.btn_winnerCfg.getChildByName("Text")){
                    this.btn_winnerCfg.getChildByName("Text").setString("不限分数")
                }else{
                    this.btn_winnerCfg.setTitleText("不限分数 ")
                }
            }
            while(this.btn_winnerCfg.getTitleRenderer().width > this.btn_winnerCfg.width){
                this.btn_winnerCfg.setTitleText(this.btn_winnerCfg.getTitleText().substring(0,this.btn_winnerCfg.getTitleText().length-1));
            }
        }
        if (this._selectedRenshu != -1) { //人数
            sendInfo.playerNum = this._selectedRenshu
        }
        cc.log("clubGameStatis sendInfo",JSON.stringify(sendInfo))
        this._lastSendInfo = sendInfo;
        MjClient.gamenet.request("pkplayer.handler.clubGameStatis",sendInfo,
            function(rtn) {

                MjClient.unblock();
                if (!cc.sys.isObjectValid(that))
                    return;

                if (rtn.code == 0) {
                    if (that._timespan > that._maxSearchTime) {
                        MjClient.showToast("系统只保存近"+that._maxSearchTime+"天的分数");
                    }
                    that._record_data = rtn.data;
                    that.reflashGameList();
                    that.reflashView();
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);

                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                    if (!that._isManager) {
                        if (that._start_time_date && that._ratainDay) {
                            that._start_time_date = that._ratainDay ;
                            that._setTimeDay(0);
                        }

                    }

                }
            }
        );
    },

    reqCheck_day: function(clubId) {
        var that = this;
        MjClient.block();
        if(!clubId){
            clubId = this.clubData.info.clubId;
        }
        var sendInfo = {
            clubId: clubId,
            type: 2,
        }
        if (this.clubData.groupLeader) { //如果是组长的话， 就把分组信息也发送过去。
            sendInfo.group = this._checkGroupType;
        }
        MjClient.gamenet.request("pkplayer.handler.clubGameStatis", sendInfo,
            function(rtn) {

                MjClient.unblock();
                if (!cc.sys.isObjectValid(that))
                    return;

                if (rtn.code == 0) {
                    that._day_req = true;
                    that._record_dayData = rtn.data;
                    that.addItems_day(rtn.data.dailyList);
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);

                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                    if (!that._isManager) {
                        if (that._start_time_date && that._ratainDay) {
                            that._start_time_date = that._ratainDay ;
                            that._setTimeDay(0);
                        }

                    }

                }
            }
        );
    },

    createItem: function(oneData) {
        var that = this;
        var copyNode = this._cell_player.clone();
        copyNode.visible = true;
        /*this._numberRecord ++;
        //image_paiming
        var image_paiming = copyNode.getChildByName("image_paiming");
        if (this._numberRecord <=3) {
            image_paiming.loadTexture("friendCards/tj_" + this._numberRecord + ".png");
        }else{
            image_paiming.setVisible(false);
        }*/
        //head
        var headicon = copyNode.getChildByName("head");
        var url = oneData.headimgurl;
        if(!url) url="png/default_headpic.png";
        MjClient.loadImgQX(url, {isCrossOrigin : true}, function(err, texture)
        {
            if(!err&&texture&&cc.sys.isObjectValid(headicon))
            {
                var headSprite = new cc.Sprite(texture);
                headSprite.setPosition(headicon.getContentSize().width/2, headicon.getContentSize().height/2);
                headSprite.setScale((headicon.getContentSize().width-4)/headSprite.getContentSize().width);
                headicon.addChild(headSprite);
            }
        });


        var text_name = copyNode.getChildByName("text_name");
        text_name.ignoreContentAdaptWithSize(true);
        text_name.setString(getPlayerName(unescape(oneData.nickname + ""),7));
        text_name.setFontName("");
        text_name.setFontSize(text_name.getFontSize()) //不知道为什么要重新设置一遍 否则字体很小

        var text_changciNum = copyNode.getChildByName("text_changciNum");
        text_changciNum.ignoreContentAdaptWithSize(true);
        text_changciNum.setString(oneData.total + "");

        var text_fullChangciNum = copyNode.getChildByName("text_fullChangciNum");
        text_fullChangciNum.ignoreContentAdaptWithSize(true);
        text_fullChangciNum.setString(oneData.full + "");

        var text_fenNum = copyNode.getChildByName("text_fenNum");
        text_fenNum.ignoreContentAdaptWithSize(true);
        text_fenNum.setString(oneData.score + "");
        text_fenNum.visible = (this._timespan <= this._maxSearchTime);
        if(this._isOpenClearScore && text_fenNum.visible){
            var text_deleteFen = text_fenNum.clone();
            text_deleteFen.y -= (text_fenNum.height + 0);
            text_deleteFen.setString("清除分数");
            text_deleteFen.setFontSize(18);
            text_deleteFen.setTextColor(cc.color("#000000"));
            //添加下划线
            var drawNode = new cc.DrawNode();
            var LineY = -1;
            drawNode.drawSegment(cc.p(0, LineY), cc.p(text_deleteFen.width, LineY), 1, cc.color("#000000"));
            text_deleteFen.addChild(drawNode);
            copyNode.addChild(text_deleteFen);
            text_deleteFen.setTouchEnabled(true);
            text_deleteFen.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_qingchufenshu_dianji", {uid:SelfUid()});
                    var data = {
                        isLMClub:false,
                        itemData:oneData,
                        clubData:that.clubData,
                    }
                    that.uinode.addChild(new FriendCard_tongji_reset(data));
                }
            }, this);


        }
        var text_DYJNum = copyNode.getChildByName("text_DYJNum");
        text_DYJNum.ignoreContentAdaptWithSize(true);
        text_DYJNum.setString(oneData.win + "");
        if(this._isOpenClearScore){
            var text_deleteWin = text_DYJNum.clone();
            text_deleteWin.y -= (text_DYJNum.height + 0);
            text_deleteWin.setString("清除次数");
            text_deleteWin.setFontSize(18);
            text_deleteWin.setTextColor(cc.color("#000000"));
            //添加下划线
            var drawNode = new cc.DrawNode();
            var LineY = -1;
            drawNode.drawSegment(cc.p(0, LineY), cc.p(text_deleteWin.width, LineY), 1, cc.color("#000000"));
            text_deleteWin.addChild(drawNode);
            copyNode.addChild(text_deleteWin);
            text_deleteWin.setTouchEnabled(true);
            text_deleteWin.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_qingchucishu_dianji", {uid:SelfUid()});
                    var data = {
                        isLMClub:false,
                        itemData:oneData,
                        clubData:that.clubData,
                    }
                    that.uinode.addChild(new FriendCard_tongji_reset(data));

                }
            }, this);
        }

        var btn_query = copyNode.getChildByName("btn_query");
        if(btn_query){
            btn_query.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (this.is_RightData())
                    {
                        this.clubData.openPlayerInfo = oneData;
                        this.clubData.openPlayerInfo.endTime = this._end_time_date;
                        this.clubData.openPlayerInfo.startTime = this._start_time_date;
                        this.clubData.openPlayerInfo.gameType = this._gameType;
                        this.clubData.openPlayerInfo.fensuData = {};
                        if(this.btn_winnerCfg) {
                            if(this.check_winnerAll && !this.check_winnerAll.isSelected()) {
                                var fenshuMin = Number(this.image_winnerStart.getString());
                                var fenshuMax = Number(this.image_winnerEnd.getString());
                                if(fenshuMax == 0) {
                                    fenshuMax = null;
                                }
                                if(fenshuMax != null && fenshuMax < fenshuMin) {
                                    var temp = fenshuMax;
                                    fenshuMax = fenshuMin;
                                    fenshuMin = temp;
                                }
                                this.clubData.openPlayerInfo.fensuData.max = fenshuMax;
                                this.clubData.openPlayerInfo.fensuData.min = fenshuMin
                                if(!fenshuMax) {
                                    this.clubData.openPlayerInfo.fensuData.text = fenshuMin + "分起";
                                }
                                else {
                                    this.clubData.openPlayerInfo.fensuData.text = fenshuMin + "-" + fenshuMax +"分 ";
                                }
                            } else {
                                this.clubData.openPlayerInfo.fensuData.text = "不限分数";
                            }
                        }else{
                            this.clubData.openPlayerInfo.fensuData.text = "不限分数";
                        }

                        if(MjClient.APP_TYPE.QXSYDTZ && (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)){
                            this.getParent().addChild(new FriendCard_roomRecord_daTongZi(this.clubData,"1"));
                        }else{
                            this.getParent().addChild(new FriendCard_roomRecord(this.clubData,"1"));
                        }
                    }
                    else
                    {
                        MjClient.showToast("输入日期不合法");
                    }
                }
            }, this);
        }

        //邵阳分组;
        var group = copyNode.getChildByName("text_group");
        group.ignoreContentAdaptWithSize(true);
        group.visible = true;
        if(oneData.group == "0"  || oneData.group == null) {
            group.setString("");
        }
        else {
            group.visible = true;
            group.setString(oneData.group+"");
        }
        return copyNode;
    },
    addItems: function(data) {
        this._ListView_player.removeAllItems();
        this._numberRecord = 0;

        var currentPanel = (this._isManager || this.isAssistants)?this.Panel_playertongji_manager:this.Panel_tongji;
        this.showPanle((this._isManager || this.isAssistants)?this.btn_func_name.btn_player:this.btn_func_name.btn_normal_player);
        currentPanel.removeChildByName("emptyTextTip");
        if (!data || data.length == 0){
            var emptyTxt = new ccui.Text();
            emptyTxt.setFontName("fonts/lanting.TTF");
            emptyTxt.setFontSize(30);
            emptyTxt.setString("暂无数据");
            emptyTxt.setColor(cc.color(0x79, 0x34, 0x12));
            emptyTxt.setName("emptyTextTip");
            emptyTxt.setPosition(currentPanel.width/2,currentPanel.height/2);
            currentPanel.addChild(emptyTxt);
            return;
        }
        for (var i = 0; i < data.length; i++) {
            this._ListView_player.pushBackCustomItem(this.createItem(data[i]));
        }
    },


    createItem_day: function(oneData) {
        var copyNode = this._cell_day.clone();
        copyNode.visible = true;

        var text_day = copyNode.getChildByName("Text_day");
        // var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.date)), 'yyyy-MM-dd');
        text_day.ignoreContentAdaptWithSize(true);
        text_day.setString(oneData.date + "");

        var text_activeCount = copyNode.getChildByName("Text_activeCount");
        text_activeCount.ignoreContentAdaptWithSize(true);
        text_activeCount.setString(oneData.activeUserCount + "");

        var text_changci = copyNode.getChildByName("Text_changci");
        text_changci.ignoreContentAdaptWithSize(true);
        text_changci.setString(oneData.game + "");

        var text_fullchangci = copyNode.getChildByName("Text_fullChangci");
        text_fullchangci.ignoreContentAdaptWithSize(true);
        text_fullchangci.setString(oneData.full + "");

        var text_effectPlayCount = copyNode.getChildByName("Text_effectPlayCount");
        text_effectPlayCount.ignoreContentAdaptWithSize(true);
        text_effectPlayCount.setString((oneData.effectPlayCount ? oneData.effectPlayCount : 0) + "");

        var text_effectUserCount = copyNode.getChildByName("Text_effectUserCount");
        text_effectUserCount.ignoreContentAdaptWithSize(true);
        text_effectUserCount.setString((oneData.effectUserCount ? oneData.effectUserCount : 0) + "");


        var text_cost = copyNode.getChildByName("Text_cost");
        text_cost.ignoreContentAdaptWithSize(true);
        text_cost.setString(oneData.money + "");

        return copyNode;
    },

    addItems_day: function(data) {
        this._ListView_day.removeAllItems();
        var currentPanel = this.Panel_daytongji_manager;
        currentPanel.removeChildByName("emptyTextTip");
        if (!data || data.length == 0){
            var emptyTxt = new ccui.Text();
            emptyTxt.setFontName("fonts/lanting.TTF");
            emptyTxt.setFontSize(30);
            emptyTxt.setString("暂无数据");
            emptyTxt.setColor(cc.color(0x79, 0x34, 0x12));
            emptyTxt.setName("emptyTextTip");
            emptyTxt.setPosition(currentPanel.width/2,currentPanel.height/2);
            currentPanel.addChild(emptyTxt);
            return;
        }
        for (var i = 0; i < data.length; i++) {
            this._ListView_day.pushBackCustomItem(this.createItem_day(data[i]));
        }
    },

    onExit: function () {
        if(FriendCard_Common.getSkinType() == 3 && MjClient.FriendCard_main_ui)
        {
            MjClient.FriendCard_main_ui.bottomBtnDelLight()
        }
        this._super();
    },
});









