/**
 * Created by maoyu on 2017/7/21.
 */
//选项选中时的颜色处理  统一处理
var CREATEROOM_COLOR_1 = cc.color(237, 101, 1);
var CREATEROOM_COLOR_2 = cc.color(47,79,79);
var CREATEROOM_COLOR_3 = cc.color(158, 118, 78);
//永州APP
var CREATEROOM_COLOR_YZ_SELECT = cc.color(208,88,60);
var CREATEROOM_COLOR_YZ_UNSELECT = cc.color(72,94,112);
//邵阳APP
var CREATEROOM_COLOR_SY_SELECT = cc.color(211,38,14);
var CREATEROOM_COLOR_SY_UNSELECT = cc.color(68,51,51);
//旺旺APP
var CREATEROOM_COLOR_WANGWANG_SELECT = cc.color(76,126,0);
var CREATEROOM_COLOR_WANGWANG_UNSELECT = cc.color(149,69,0);
//衡阳APP
var CREATEROOM_COLOR_HY_SELECT = cc.color(210,20,0);
var CREATEROOM_COLOR_HY_UNSELECT = cc.color(37,86,98);
//兜趣山西APP
var CREATEROOM_COLOR_DQ_SELECT = cc.color("#D0330F");
var CREATEROOM_COLOR_DQ_UNSELECT = cc.color("#203046");

// 岳阳新版UI
var CREATEROOM_COLOR_YYV3_SELECT = cc.color("#ff0000");
var CREATEROOM_COLOR_YYV3_UNSELECT = cc.color("#08460e");

var CreateRoomNode = cc.Node.extend({
    bg_node: null,
    _data: null,
    ctor: function(layer, data) {
        this._super();
        this.parentLayer = layer;
        this._data = data;
        this._isFriendCard = data.IsFriendCard;
        this._isRoomCardMode = data.clubType;
        this._isMatchMode = data.isMatch;
        this._isAntiAddictionMode = data.isAntiAddictionMode;
        this._textInput = null;
        this._nodeGPS = null;
        this._costName = '元宝';
        this.localStorageKey = {};
        this.localStorageKey.KEY_RondType = "_ROUND_TYPE"; //局数选定
        this.localStorageKey.KEY_PayWay = "_PAY_WAY"; //付房卡的方式
        this.localStorageKey.KEY_GPS = "_GPS";
        this._clubIsCreateRoom = false;  //俱乐部自主创建房间
        this.isUseUIV3 = MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3();
        this._setTiLiData = {};
        this.isShowHappyBeanConfig = false;

        MjClient.createRoomNode = this;
        MjClient._customValue = {};
        if(isJinZhongAPPType() && data.isCreateRoom == true){
                this._clubIsCreateRoom = true;
        }
        if(MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ){
            CREATEROOM_COLOR_1 = cc.color(94,119,199);
            CREATEROOM_COLOR_3 = cc.color(91,95,128);
        }

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ|| MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ|| MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP){
            CREATEROOM_COLOR_3 = cc.color(96,46,26);
            CREATEROOM_COLOR_1 = cc.color(237,32,0);
        }

        if(isJinZhongAPPType()){
            CREATEROOM_COLOR_3 = cc.color(66,94,112);
            CREATEROOM_COLOR_1 = cc.color(208,88,60);
        }

        if(MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP ){
            CREATEROOM_COLOR_3 = cc.color(0x44, 0x33, 0x33);
            CREATEROOM_COLOR_1 = cc.color(0xd3, 0x26, 0x0e);
        }else if( MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ){
            CREATEROOM_COLOR_3 = cc.color(0x77, 0x40, 0x39);
            CREATEROOM_COLOR_1 = cc.color(0xd0, 0x33, 0x0f);
        }else if(MjClient.getAppType() === MjClient.APP_TYPE.AYGUIZHOUMJ){
            CREATEROOM_COLOR_3 = cc.color("#954500");
            CREATEROOM_COLOR_1 = cc.color("#00713A");
        }

        var selectColor = CREATEROOM_COLOR_1;
        var unSelectColor = CREATEROOM_COLOR_3;
        
        switch (MjClient.getAppType()) {
            case MjClient.APP_TYPE.QXYZQP:
            case MjClient.APP_TYPE.BDYZPHZ:
                selectColor = CREATEROOM_COLOR_YZ_SELECT;
                unSelectColor = CREATEROOM_COLOR_YZ_UNSELECT;
                break;
            case MjClient.APP_TYPE.QXSYDTZ:
            case MjClient.APP_TYPE.QXLYQP:
                selectColor = CREATEROOM_COLOR_SY_SELECT;
                unSelectColor = CREATEROOM_COLOR_SY_UNSELECT;
                break;
            case MjClient.APP_TYPE.HUNANWANGWANG:
                selectColor = CREATEROOM_COLOR_WANGWANG_SELECT;
                unSelectColor = CREATEROOM_COLOR_WANGWANG_UNSELECT;
                break;
            case MjClient.APP_TYPE.BDHYZP:
                selectColor = CREATEROOM_COLOR_HY_SELECT;
                unSelectColor = CREATEROOM_COLOR_HY_UNSELECT;
                break;
            case MjClient.APP_TYPE.DQSHANXIMJ:
                selectColor = CREATEROOM_COLOR_DQ_SELECT;
                unSelectColor = CREATEROOM_COLOR_DQ_UNSELECT;
                break;
        }

        if (this.isUseUIV3) {
            this._selectColor = CREATEROOM_COLOR_YYV3_SELECT;
            this._unSelectColor = CREATEROOM_COLOR_YYV3_UNSELECT;
        }
        else {
            this._selectColor = selectColor;
            this._unSelectColor = unSelectColor;
        }

		if (this._isFriendCard) {
            // cc.log("======= this._data.clubRule ",JSON.stringify(this._data.clubRule))
            var gameType = this._data.clubRule ? this._data.clubRule.gameType : -1;
            //晋中财神用晋中麻将的
            if (gameType == MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN) {
                gameType = MjClient.GAME_TYPE.JIN_ZHONG_MJ;
            }
            //介休扣点用介休1点3的入口
            if (gameType == MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN) {
                gameType = MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3;
            }
            //平遥扣点用平遥麻将的入口
            if (gameType == MjClient.GAME_TYPE.PING_YAO_KOU_DIAN) {
                gameType = MjClient.GAME_TYPE.PING_YAO_MA_JIANG;
            }
            //灵石半摸用灵石编龙的入口
            if (gameType == MjClient.GAME_TYPE.LING_SHI_BAN_MO) {
                gameType = MjClient.GAME_TYPE.LING_SHI_BIAN_LONG;
            }

            if (data.gameType == MjClient.GAME_TYPE.CHANG_SHA_ER_REN) {
                data.gameType = MjClient.GAME_TYPE.CHANG_SHA;
            }
            // cc.log("===== gameType, data.gameType",gameType ,data.gameType)

            if (this._data.clubRule && gameType == data.gameType)
                this.clubRule = this._data.clubRule;
            else
                this.clubRule = {};

        }
        cc.log("++++++++++ this.clubRule ++++++++" + JSON.stringify(this.clubRule) + "\n" + JSON.stringify(this._data));
        if((MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() === MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
            MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP ||
            MjClient.getAppType() === MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.BDYZPHZ) &&
            this._data.gameType  != MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE)//排除牛十别
        {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PayWay, 0);
        }

        this.initAll(this._isFriendCard);
        if (this.isUseUIV3)
            this.useYueYangUIV3();
        else
            this.modifyDiFenText();
        this.grayButtonName();
        this.initPlayNode();
        if (this.isUseUIV3){
            this.useYueYangUIV3_ziPai();
        }
        this.initRoundNode();
        this.setPlayNodeCurrentSelect(this._isFriendCard);
        this.setRoundNodeCurrentSelect();
        this.setDiaNumData(this.bg_node);
        
        this.changeUiForClubMode();
        if(this._isRoomCardMode || this._isMatchMode){
            this.setDiaNumData(this.bg_node);
        }

        //俱乐部自主创房相关操作
        this.clubCustomOpe();
        //this.schedule(this.updateClubTagIcon, 0.1);

        var zhuIdx = this._zhuIdx;
        if (zhuIdx) {
            var that = this;
            this.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function() {
                if (zhuIdx != that._zhuIdx) {
                    zhuIdx = that._zhuIdx;
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian_Difen", {uid:SelfUid()});
                }
            })).repeatForever());
        }


        //大赢家付和自由人数互斥
        this.addSpecialProcess();
    },

    // 是否需要玩法AA付和自由人数互斥
    isNeedAAPayAndFreePlayerHuChi: function(){
        // todo 是否需要玩法AA付和自由人数互斥
        if(MjClient.getAppType() === MjClient.APP_TYPE.AYGUIZHOUMJ){
            return true;
        }
        return false;
    },

    initAll: function() {

    },

    initPlayNode: function() {
        //add by sking for create room need GPS
        var _selectCol = CREATEROOM_COLOR_1;
        var _UnSelectCol = CREATEROOM_COLOR_3;
        this._nodeGPS = new ccui.CheckBox("createNewPng/daTC1_19.png","createNewPng/daTC1_20.png");
        this._nodeGPS.setPosition(cc.p(50,20));
        this.bg_node.addChild(this._nodeGPS,100);
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ|| MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ|| MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ){
            this._nodeGPS.setPosition(cc.p(50,50));
        }
        if(MjClient.getAppType() === MjClient.APP_TYPE.QXNTQP)
        {
            this._nodeGPS.setPosition(cc.p(108,50));
        }
        if(this._data && this._data.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU) {
            //this._nodeGPS.setPosition(cc.p(108, 20));
            this._nodeGPS.setVisible(false);
        }
        if(this._data && this._data.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
            //this._nodeGPS.setPosition(cc.p(160, 20));
            this._nodeGPS.setVisible(false);
        }

        var _fangText = new ccui.Text();
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() === MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {//岳阳同一使用方正兰亭
            _fangText.setFontName("fonts/lanting.TTF");
        }
        _fangText.setName("text");
        _fangText.setFontSize(30);
        _fangText.setColor(_UnSelectCol);
        //_fangText.setFontName(MjClient.fzcyfont);
        if(MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType()|| MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ|| MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.APP_TYPE.QXNTQP == MjClient.getAppType()) _fangText.setFontSize(28);
        _fangText.setPosition(cc.p(this._nodeGPS.getContentSize().width*2.5,this._nodeGPS.getContentSize().height/2));
        _fangText.setString("防作弊");
        _fangText.setTouchEnabled(true);
        this._nodeGPS.addChild(_fangText);
        var that = this;
        _fangText.addTouchEventListener(function(sender,type){
            if(type == 2) {
                that._nodeGPS.setSelected(!that._nodeGPS.isSelected())
                if(that._nodeGPS.isSelected()) {
                    _fangText.setColor(_selectCol);
                } else {
                    _fangText.setColor(_UnSelectCol);
                }

                util.localStorageEncrypt.setBoolItem(that.localStorageKey.KEY_GPS, that._nodeGPS.isSelected());
            }
        });
        this._nodeGPS.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    cc.log("-------------------选择");
                    util.localStorageEncrypt.setBoolItem(that.localStorageKey.KEY_GPS, true);
                    _fangText.setColor(_selectCol);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    _fangText.setColor(_UnSelectCol);
                    util.localStorageEncrypt.setBoolItem(that.localStorageKey.KEY_GPS, false);
                    cc.log("-------------------不选择");
                    break;
            }
        }, this._nodeGPS);

        //GPS帮助的问号
        var _helpNode = new ccui.ImageView("createNewPng/tip.png");
        var _helpImage = new ccui.ImageView("createNewPng/tip_di.png");
        var _helpText = new ccui.Text();
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() === MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {//岳阳同一使用方正兰亭
            _helpText.setFontName("fonts/lanting.TTF");
        }
        _helpText.setPosition(201.50,49.80);
        _helpText.setColor(_selectCol);
        _helpText.setFontSize(22);
        _helpText.setString("必须开启软件定位权限,才能进入房间");
        _helpText.setFontName(MjClient.fzcyfont);
        _helpImage.addChild(_helpText);
        _helpImage.setVisible(false);
        _helpImage.setPosition(129.42,86.80);
        if(this._data && (this._data.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
            this._data.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG)) {
            _helpImage.setPosition(-120,86.80);
        }
        _helpNode.setScale(0.8);
        _helpNode.addChild(_helpImage);
        this._nodeGPS.addChild(_helpNode);
        _helpNode.setTouchEnabled(true);
        _helpNode.setPosition(this._nodeGPS.getContentSize().width*4.6,this._nodeGPS.getContentSize().height/2);
        _helpNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                _helpImage.setVisible(true);
            }
        }, _helpNode);
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            status: null,
            onTouchBegan: function(touch, event) {
                if (_helpImage.isVisible()) {
                    _helpImage.setVisible(false);
                    return true;
                } else {
                    return false;
                }
            },
        }, _helpImage);


    },
    initRoundNode: function() {
        //打几局  ，选择局数
        var _round = this._scroll_round || this.bg_node.getChildByName("round");
        if (!_round){
            _round = this.bg_node.getChildByName("view").getChildByName("round");
        }
        if (!isYongZhouProject()){
            this.bg_node.setContentSize(cc.size(893.00,400.00));
        }
        

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ|| MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ|| MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP){
            this.bg_node.setPosition(-198.19,-10.42);
            this.bg_node.setContentSize(cc.size(830.00,565.00));
        }

        if(isJinZhongAPPType())
        {
            this.bg_node.setPosition(-200, 8);
        }

        if(MjClient.getAppType() === MjClient.APP_TYPE.DQSHANXIMJ) {
            this.bg_node.setPosition(-220, -30);
        }

        if(MjClient.APP_TYPE.QXYYQP == MjClient.getAppType() ||MjClient.getAppType() === MjClient.APP_TYPE.HUBEIMJ )
        { 
            this.bg_node.getParent().setPosition(-180, -15);
            this.bg_node.getParent().setContentSize(cc.size(846, 610));
            this.bg_node.setContentSize(cc.size(846, 480));
        }

        if(MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ){
            this.bg_node.getParent().setPosition(-215, 0);
            this.bg_node.getParent().setContentSize(cc.size(934, 460));
            this.bg_node.setContentSize(cc.size(934,460));
        }

        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ){
            this.bg_node.setContentSize(cc.size(893.00,460.00));
        }

        if (this.isUseUIV3) {
            this.bg_node.getParent().setPosition(-180, -15);
            this.bg_node.getParent().setContentSize(cc.size(846, 610));
            this.bg_node.setContentSize(cc.size(846, 455));
            if (this.bg_node.getDescription() == "ScrollView") {
                this.bg_node.setAnchorPoint(0.0, 0.0);
                this.bg_node.setPosition(0, 160);
            }
        }

        //this.roundNode_1 = _round.getChildByName("round_1");
        //this.roundNode_2 = _round.getChildByName("round_2");
        //this.roundNode_3 = _round.getChildByName("round_3");
        this.roundNodeArray = [];
        var roundNode = _round.getChildByName("round_" + (this.roundNodeArray.length + 1));
        while (roundNode && roundNode.isVisible())
        {
            cc.log("=========================round_ ");
            this.roundNodeArray.push(roundNode);
            roundNode = _round.getChildByName("round_" + (this.roundNodeArray.length + 1));
        }


        /*
         支付房卡的方式
         */
        //this.payWayNode_1 = _round.getChildByName("payWay_1");
        //this.payWayNode_2 = _round.getChildByName("payWay_2");
        //this.payWayNode_3 = _round.getChildByName("payWay_3");
        //if (this._isFriendCard && this.payWayNode_1) {
        //    var _text = this.payWayNode_1.getChildByName("text");
        //    _text.setString("群主付");
        //}
        //if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ)//大赢家付
        //{
        //    this.payWayNode_3.visible = true;
        //    this.payWayNode_3.setEnabled(true);
        //}
        //else {
        //    this.payWayNode_3.visible = false;
        //    this.payWayNode_3.setEnabled(false);
        //}
        this.payWayNodeArray = [];
        while (_round.getChildByName("payWay_" + (this.payWayNodeArray.length + 1)))
        {
            this.payWayNodeArray.push(_round.getChildByName("payWay_" + (this.payWayNodeArray.length + 1)));
        }
        if (this._isFriendCard && cc.sys.isObjectValid(this.payWayNodeArray[0])) {
            var _text = this.payWayNodeArray[0].getChildByName("text");
            _text.setString("群主付");
        }
        if (cc.sys.isObjectValid(this.payWayNodeArray[2]))
        {
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ)//大赢家付
            {
                this.payWayNodeArray[2].visible = true;
                this.payWayNodeArray[2].setEnabled(true);
            }
            else {
                this.payWayNodeArray[2].visible = false;
                this.payWayNodeArray[2].setEnabled(false);
            }
        }




        var nodeListRound = this.roundNodeArray;
        //nodeListRound.push(_round.getChildByName("round_1"));
        //nodeListRound.push(_round.getChildByName("round_2"));
        //nodeListRound.push(_round.getChildByName("round_3"));
        this._playNode_round_radio = createRadioBoxForCheckBoxs(nodeListRound, function(index) {
            this.setDiaNumData(this.bg_node);
            this.radioBoxSelectCB(index, nodeListRound[index], nodeListRound);
        }.bind(this));
        this.addListenerText(nodeListRound, this._playNode_round_radio);

        var nodeListPayway = this.payWayNodeArray;
        //nodeListPayway.push(_round.getChildByName("payWay_1"));
        //nodeListPayway.push(_round.getChildByName("payWay_2"));
        //nodeListPayway.push(_round.getChildByName("payWay_3"));

        if(MjClient.APP_TYPE.AYGUIZHOUMJ === MjClient.getAppType()){
            // 贵州特殊处理，AA付和自由人数互斥
            this._playNode_payway_radio = createRadioBoxForCheckBoxs(nodeListPayway, function(index) {
                this.setDiaNumData(this.bg_node);
                this.radioBoxSelectCB(index, nodeListPayway[index], nodeListPayway);
                this.addSpecialProcess();
            }.bind(this));
            this.addListenerText(nodeListPayway, this._playNode_payway_radio, this.addSpecialProcess.bind(this));

        }else{

            this._playNode_payway_radio = createRadioBoxForCheckBoxs(nodeListPayway, function(index) {
                this.setDiaNumData(this.bg_node);
                this.radioBoxSelectCB(index, nodeListPayway[index], nodeListPayway);
            }.bind(this));
            this.addListenerText(nodeListPayway, this._playNode_payway_radio);

        }


        //创建房间
        var _btn_create = this.bg_node.getChildByName("btn_create");
        if(!_btn_create){
            _btn_create = this.bg_node.getParent().getChildByName("btn_create");
        }
        if(_btn_create) {
            _btn_create.visible = false;
            if(MjClient.remoteCfg.hideMoney) {
                _btn_create.visible = true;
                _btn_create.setEnabled(true);
            }

            _btn_create.addTouchEventListener(function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        if(this._isFriendCard)
                        {
                            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chuangjianfangjian_wanfapeizhijiemian", {uid:SelfUid()});
                            this.clubCreateRoom();
                        }
                        else
                        {
                            if(MjClient.createRoomLayer) {
                                MjClient.createRoomLayer.setVisible(true);
                            }
                            this.createRoom();
                            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian_Chuangjianfangjian", {uid:SelfUid()});
                        }
                        break;
                    default:
                        break;
                }
            }, this);
        }




        //创建房间 diamond
        var _btn_create_diamond = this.bg_node.getChildByName("btn_create_diamond");
        // 岳阳选项内容滑动，加在view下，创建房间，保存规则在上一层
        if(!_btn_create_diamond)
        {
            _btn_create_diamond = this.bg_node.getParent().getChildByName("btn_create_diamond");
        }

        _btn_create_diamond.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if(this._isFriendCard)
                    {
                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chuangjianfangjian_wanfapeizhijiemian", {uid:SelfUid()});
                        this.clubCreateRoom();
                    }
                    else
                    {
                        this.createRoom();
                        if (MjClient.createRoomLayer) {
                            MjClient.createRoomLayer.setVisible(true);
                        }
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Chuangjianfangjian_Chuangjianfangjian", {uid:SelfUid()});
                    }
                    break;
                default:
                    break;
            }
        }, this);

        // btn_ruleretain
        var _btn_rule = this.bg_node.getChildByName("btn_ruleretain");
        // 岳阳选项内容滑动，加在view下，创建房间，保存规则在上一层
        if(!_btn_rule)
        {
            _btn_rule = this.bg_node.getParent().getChildByName("btn_ruleretain");
        }

        if (_btn_rule) {
            _btn_rule.setVisible(false)
            var _TextBg = _btn_rule.getChildByName("Text_Name");
            if (_TextBg)
                _TextBg.setVisible(false);

            var _btn_del = _btn_rule.getChildByName("btn_delete");
            if (_btn_del) {
                _btn_del.addTouchEventListener(function(sender, Type) {
                    switch (Type) {
                        case ccui.Widget.TOUCH_ENDED:
                            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Shezhi_Tianjiawanfa_Shanchuguize", {uid:SelfUid()});
                            this.deleteRule();
                            break;
                        default:
                            break;
                    }
                }, this);
            }

            var text = _btn_rule.getChildByName("Text");
            if (text)
                text.setVisible(false);

            _btn_rule.addTouchEventListener(function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Shezhi_Tianjiawanfa_Baocunguize", {uid:SelfUid()});
                        this.showInputRuleNameDialog();
                        cc.log('创建亲友圈=========' + this._setTiLiData.isShowHappyBeanConfig + this._isAntiAddictionMode);
                        if(!this._setTiLiData.isShowHappyBeanConfig && this._isAntiAddictionMode){              //20200923-钻石创建亲友圈不进来乐豆设置页面
                            this._setTiLiData.isShowHappyBeanConfig = true;
                            MjClient.Scene.addChild(new FriendCard_SXF_setTiLi(this._setTiLiData));
                        }
                        break;
                    default:
                        break;
                }
            }, this);
            if (this._isFriendCard && this._clubIsCreateRoom == false) {
                if(_btn_create) _btn_create.setVisible(false);
                _btn_create_diamond.setVisible(false);
                _btn_rule.setVisible(true);
                if (this._nodeGPS && this._nodeGPS.visible == true)
                {
                    _btn_rule.x = this._nodeGPS.x + 650;
                    _btn_rule.y = this._nodeGPS.y;
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ|| MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ|| MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ)
                    {
                        _btn_rule.x = this._nodeGPS.x + 600;
                    }
                    else if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP)
                    {
                        _btn_rule.x = this._nodeGPS.x + 575;
                    }
                    else if(this._data.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU) {
                        _btn_rule.x = this._nodeGPS.x + 575;
                    }
                    else if(this._data.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
                        _btn_rule.x = this._nodeGPS.x + 525;
                        _btn_rule.y = this._nodeGPS.y + 40;
                    }
                }
            } else if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                if(_btn_create){
                    _btn_create.visible = MjClient.remoteCfg.hideMoney;
                    _btn_create.setEnabled(MjClient.remoteCfg.hideMoney);
                }
                _btn_create_diamond.visible = !MjClient.remoteCfg.hideMoney;
                _btn_create_diamond.setEnabled(!MjClient.remoteCfg.hideMoney);
            }
        }

    },
    //大赢家付和自由人数互斥
    addSpecialProcess:function(){

        if(this._isRoomCardMode){//俱乐部房卡模式  使用动态创建节点
            return;
        }

        if(!this.isNeedAAPayAndFreePlayerHuChi()){
            return;
        }

        if(!this._playNode_maxPlayer3 || !this.payWayNodeArray[1]) return;

        if(this.payWayNodeArray[1].isSelected() && this._playNode_maxPlayer3.isSelected()){
            if(this._playNode_player_count_radio){
                this._playNode_player_count_radio.selectItem(0);
            }
            this.payWayNodeArray[1].setVisible(true);
            this._playNode_maxPlayer3.setVisible(false);
            return;
        }



        for(var i = 0; i < this._countlist.length; i++){
            if(this.payWayNodeArray[1].isSelected()){   // AA付选中
                this._countlist[i].setVisible(i !== 3);
            }else{
                this._countlist[i].setVisible(true);
            }
        }


        for(var j = 0; j < this.payWayNodeArray.length; j++){
            if(this._playNode_maxPlayer3.isSelected()) {   // 自由人数选中
                this.payWayNodeArray[j].setVisible(j !== 1);
            }else{
                this.payWayNodeArray[j].setVisible(true);
            }
        }

    },
    changeUiForClubMode:function(){
        var that = this;
        var parentNode = this.bg_node.getChildByName("view");
        if ((MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ  || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ || MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ)
            && !parentNode) 
        {
            parentNode = this.bg_node.getChildByName("playScroll");
        }
        if(!parentNode){
            parentNode = this.bg_node;
        }

        //房卡模式,有房费的保留位置，没有的放在人数下面，没有人数放在局数下面  item hegith 63
        this.getTextNodeByValue = function (node,value,notValues) {
            var childrens = node.getChildren();
            if (childrens){
                for(var i in childrens){
                    if (childrens[i].getChildren() && childrens[i].getChildren().length > 0){
                        var fenShuNode = this.getTextNodeByValue(childrens[i],value,notValues);
                        if(fenShuNode){
                            return fenShuNode;
                        }
                    }else{
                        var type_name = childrens[i].getDescription();
                        if (type_name == "Label"){
                            var text = childrens[i].getString().replace(/\s+/g,"");
                            //cc.log("getTextNodeByValue ",text);
                            if(text.indexOf(value) != -1){
                                if(notValues){
                                    var hasFind = false;
                                    for(var j = 0 ;j < notValues.length; j++){
                                        if(text.indexOf(notValues[j]) != -1){
                                            hasFind = true;
                                        }
                                    }
                                    if(!hasFind){
                                        return childrens[i];
                                    }
                                }else{
                                    return childrens[i];
                                }
                            }

                        }
                    }
                }
            }
            var type_name = node.getDescription();
            if (type_name == "Label" && node.getString().replace(/\s+/g,"").indexOf(value) != -1){
                return node;
            }
        };

        this.changeItemY = function (node,topNodePos,dy,offset) {//offset偏差
            if(!node){
                cc.log("changeItemY node is null");
                return;
            }else{
                //cc.log("begin changeItemY node name is ",node.name);
            }
            if(typeof(offset) == 'undefined'){
                offset = 15;
            }
            var childrens = node.getChildren();
            if (childrens){
                for(var i in childrens){
                    if(childrens[i].name == "play" || childrens[i].name == "round"){
                        continue;
                    }
                    if(childrens[i].name == "play_way" && this._cardRoomOptNode == node){
                        continue;
                    }
                    if(childrens[i].name == "title" && childrens[i].getChildren() && childrens[i].getChildren().length > 0){
                        continue;
                    }
                    if(that._data.gameType == MjClient.GAME_TYPE.ML_HONGZHONG 
                     || that._data.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO  ){
                        if(node.name == "play"){
                            if(childrens[i].name == "quanZhong1Niao"){
                                continue;
                            }
                            if(childrens[i].name == "zhongNiao159"){
                                continue;
                            }
                        }
                    }
                    
                    if(this._cardRoomOptNode == node && childrens[i].name == "difen" && childrens[i].getChildren() && childrens[i].getChildren().length > 0){
                        continue;
                    }
                    if(childrens[i].name == "roomCardPayModeTipText"){
                        continue;
                    }
                    if(this._cardRoomOptNode == node){
                        if(childrens[i].name == "btn_create" || childrens[i].name == "btn_ruleretain" || childrens[i].name == "btn_create_diamond"
                            || childrens[i].name == "Image_3"|| childrens[i].name == "btn_add"|| childrens[i].name == "txt_fen"|| childrens[i].name == "btn_sub"
                        ){
                            continue;
                        }
                    }
                    if(childrens[i].name && (childrens[i].name.indexOf("keep_position") != -1)){
                        continue;
                    }
                    var nodePos = childrens[i].getParent().convertToWorldSpace(childrens[i].getPosition());
                    if(topNodePos){
                        if(this._ziYouRenNode && this._ziYouRenNode.getParent() == childrens[i]){
                            continue;
                        }
                        if(this._realTimeVoiceNode && this._realTimeVoiceNode.getParent() == childrens[i]){
                            if(topNodePos.y - nodePos.y > offset+dy){
                                childrens[i].setPositionY(childrens[i].getPosition().y-dy);
                            }
                            continue;
                        }
                        if(topNodePos.y - nodePos.y > offset){
                            childrens[i].setPositionY(childrens[i].getPosition().y-dy);
                        }
                    }else{
                        childrens[i].setPositionY(childrens[i].getPosition().y-dy);
                    }

                }
            }
        };

        this.findNodeByNameKey = function (node,keyValue,func) {
            var childrens = node.getChildren();
            if (childrens){
                for(var i in childrens){
                    if(childrens[i].name && childrens[i].name.indexOf(keyValue) != -1){
                        if(func){
                            func(childrens[i])
                        }
                    }else{
                        if (childrens[i].getChildren() && childrens[i].getChildren().length > 0){
                            this.findNodeByNameKey(childrens[i],keyValue,func);
                        }
                    }
                }
            }
        }

        this.getListTextNodeByValue = function (node,value,callFunc,list) {
            var childrens = node.getChildren();

            if (childrens){
                for(var i in childrens){
                    if (childrens[i].getChildren() && childrens[i].getChildren().length > 0){
                        var fenShuNode = this.getListTextNodeByValue(childrens[i],value,callFunc,list);
                        if(fenShuNode){
                            //fenShuNode.visible = false
                            list.push(fenShuNode);
                        }
                    }else{
                        var type_name = childrens[i].getDescription();
                        if (type_name == "Label"){
                            var text = childrens[i].getString().replace(/\s+/g,"");
                            if(text.indexOf(value) != -1){
                                //childrens[i].visible = false;
                                list.push(childrens[i]);
                            }

                        }
                    }
                }
            }
            var type_name = node.getDescription();
            if (type_name == "Label" && node.getString().replace(/\s+/g,"").indexOf(value) != -1){
                list.push(node);
                //node.visible = false;
            }
            callFunc(list);
        };

        this.changeUiForMatchMode(parentNode);
        this.changeUiForAntiAddictionMode(parentNode);
        this.changeUiForRoomCardMode(parentNode);
    },
    //亲友圈比赛插入节点
    changeUiForMatchMode:function(parentNode){
        if(!this._isMatchMode){
            return;
        }
        var that = this;
        var dy = 64; 
        var matchModeNodeMoreHeight = 0;//拓展的时候高度在这里增加
        if (FriendCard_Common.isOpenMatchDissolveLimit(this._data.gameType)) {
            matchModeNodeMoreHeight += 64;
        }
        if (FriendCard_Common.isOpenMatchScoreNeedEnough(this._data.gameType)) {
            matchModeNodeMoreHeight += 64;
        }
        this._matchModeNode = parentNode.getChildByName("matchModeNode");//一些难兼容的玩法，直接在创建房间ui加入节点
        if(!this._matchModeNode){
            if(parentNode.setInnerContainerSize){//增加scrollview的高度
                //修正scrollView的滑动区域增加插入ui的高度
                parentNode.setInnerContainerSize(cc.size(parentNode.getInnerContainerSize().width, parentNode.getInnerContainerSize().height+dy+matchModeNodeMoreHeight));
                //添加房卡模式选项node
                var matchModeNode = ccs.load("CreateRoomMatchMode.json").node;
                //matchModeNode.zIndex = -1;
                matchModeNode.setPosition(cc.p(0,parentNode.getInnerContainerSize().height - dy/2))
                this._matchModeNode = matchModeNode;
                //顶部插入点
                parentNode.addChild(matchModeNode)
            }else{
                MjClient.showToast("此玩法未兼容比赛场!!!")
            }
            
        }
        if(this._matchModeNode){
            
            //以下是比赛模式节点
            this._matchModeNode.visible = true;
            this._matchModeNode = this._matchModeNode.getChildByName("matchMode");
            this._matchModeNode.config = {
                limitMin:-2000,
                limitMax:10000,
                dValue:1,
                defaultValue:100,
                defaultOpenIndex:0
            }
            
            //比赛场进入房间规则start
            this._matchModeLimitScore = this._matchModeNode.getChildByName("txt_fen");//不需要text了，改成可editbox
            this._matchModeLimitScore.ignoreContentAdaptWithSize(true);
            var image_fen_bg = this._matchModeNode.getChildByName("Image_3");
            var edtContentSize= image_fen_bg.getContentSize();
            var edt_input = new cc.EditBox(edtContentSize, new cc.Scale9Sprite());
            this._matchModeLimitScoreEdt = edt_input;
            edt_input.setFontColor(this._matchModeLimitScore.getTextColor());
            edt_input.setPlaceholderFontColor(cc.color(0xFF, 0xFF, 0xFF));
            edt_input.setMaxLength(10);
            edt_input.setFontSize(this._matchModeLimitScore.getFontSize());
            edt_input.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            edt_input.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
            edt_input.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            edt_input.setPlaceHolder("");
            edt_input.setPlaceholderFontSize(this._matchModeLimitScore.getFontSize());
            edt_input.setPosition(edtContentSize.width/2, edtContentSize.height/2);

            edt_input.editBoxEditingDidEnd = function (editBox) {
                var str = editBox.getString();
                while(str != "0" && str.indexOf("0") == 0){
                    //避免parseInt转化八进制或十六进制
                    str = str.substring(1,str.length);  
                }
                var input = parseInt(str);
                if(editBox.getString().length == 0 || input == null || isNaN(input)){
                    input = that._matchModeNode.config.defaultValue
                }else if(input > that._matchModeNode.config.limitMax){
                    input = that._matchModeNode.config.limitMax
                }else if(input < that._matchModeNode.config.limitMin){
                    input = that._matchModeNode.config.limitMin
                }
                that._matchModeLimitScoreEdt.value = parseInt(input);
                that.setMatchModeLimitScore();
            };

            edt_input.setDelegate(edt_input);
            image_fen_bg.addChild(edt_input);
            this._matchModeLimitScore.visible = false;
            

            this._matchModeLimitScoreNodes = [];
            this._matchModeLimitScoreNodes.push( this._matchModeNode.getChildByName("match_no_limit") );
            this._matchModeLimitScoreNodes.push( this._matchModeNode.getChildByName("match_limit") );
            
            this._matchModeLimitScoreRadio = createRadioBoxForCheckBoxs(this._matchModeLimitScoreNodes,function(index) {
                this.radioBoxSelectCB(index, this._matchModeLimitScoreNodes[index], this._matchModeLimitScoreNodes);
            }.bind(this));
            this.addListenerText(this._matchModeLimitScoreNodes,this._matchModeLimitScoreRadio,function (index) {
                
            }.bind(this));
            
            this._matchModeLimitScoreSub = this._matchModeNode.getChildByName("btn_sub");
            this._matchModeLimitScoreSub.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    this.setMatchModeLimitScore("sub");
                }
            }, this);
            this._matchModeLimitScoreAdd = this._matchModeNode.getChildByName("btn_add");
            this._matchModeLimitScoreAdd.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    this.setMatchModeLimitScore("add");
                }
            }, this);
            
            this.setMatchModeLimitScore = function(action){
                if(action == "sub"){
                    this._matchModeLimitScoreEdt.value -= this._matchModeNode.config.dValue;
                }else if(action == "add"){
                    this._matchModeLimitScoreEdt.value += this._matchModeNode.config.dValue;
                }
                if(this._matchModeLimitScoreEdt.value < this._matchModeNode.config.limitMin){
                    this._matchModeLimitScoreEdt.value = this._matchModeNode.config.limitMax;
                }
                if(this._matchModeLimitScoreEdt.value > this._matchModeNode.config.limitMax){
                    this._matchModeLimitScoreEdt.value = this._matchModeNode.config.limitMin;
                }
                this._matchModeLimitScoreEdt.setString(""+this._matchModeLimitScoreEdt.value);
            }
            var currentSelect = this.getNumberItem("isMatchLimit", this._matchModeNode.config.defaultOpenIndex);
            this._matchModeLimitScoreEdt.value = this.getNumberItem("matchLimitScore",this._matchModeNode.config.defaultValue);
            this._matchModeLimitScoreRadio.selectItem(currentSelect);
            this.setMatchModeLimitScore();
            //比赛场进入房间规则end


            //比赛场解散房间start
            var endGameNode = this._matchModeNode.getChildByName("endRoomConfigNode");
            if (FriendCard_Common.isOpenMatchDissolveLimit(this._data.gameType)) {
                endGameNode.config = {
                    limitMin:0,
                    limitMax:10000,
                    dValue:1,
                    defaultValue:100,
                    defaultOpenIndex:0,
                    defaultScoreNeedEnough:0,
                }
                var textEndGameScore = endGameNode.getChildByName("txt_fen");//不需要text了，改成可editbox
                textEndGameScore.ignoreContentAdaptWithSize(true);
                var image_fen_bg = endGameNode.getChildByName("Image_3");
                var edtContentSize= image_fen_bg.getContentSize();
                var edt_input_endGame = new cc.EditBox(edtContentSize, new cc.Scale9Sprite());
                this._matchModeEndGameScoreEdt = edt_input_endGame;
                edt_input_endGame.setFontColor(textEndGameScore.getTextColor());
                edt_input_endGame.setPlaceholderFontColor(cc.color(0xFF, 0xFF, 0xFF));
                edt_input_endGame.setMaxLength(10);
                edt_input_endGame.setFontSize(textEndGameScore.getFontSize());
                edt_input_endGame.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
                edt_input_endGame.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
                edt_input_endGame.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
                edt_input_endGame.setPlaceHolder("");
                edt_input_endGame.setPlaceholderFontSize(textEndGameScore.getFontSize());
                edt_input_endGame.setPosition(edtContentSize.width/2, edtContentSize.height/2);

                edt_input_endGame.editBoxEditingDidEnd = function (editBox) {
                    var str = editBox.getString();
                    while(str != "0" && str.indexOf("0") == 0){
                        //避免parseInt转化八进制或十六进制
                        str = str.substring(1,str.length);  
                    }
                    var input = parseInt(str);
                    if(editBox.getString().length == 0 || input == null || isNaN(input)){
                        input = endGameNode.config.defaultValue
                    }else if(input > endGameNode.config.limitMax){
                        input = endGameNode.config.limitMax
                    }else if(input < endGameNode.config.limitMin){
                        input = endGameNode.config.limitMin
                    }
                    that._matchModeEndGameScoreEdt.value = parseInt(input);
                    that.setMatchModeEndGameScore();
                };

                edt_input_endGame.setDelegate(edt_input_endGame);
                image_fen_bg.addChild(edt_input_endGame);
                textEndGameScore.visible = false;
                
                this._checkBox_not_zone_score = endGameNode.getChildByName("checkBox_not_zone_score");
                if(!FriendCard_Common.isOpenMatchScoreNeedEnough(this._data.gameType)){
                    this._checkBox_not_zone_score.visible = false;
                }
                this.addListenerText(this._checkBox_not_zone_score);
                this._checkBox_not_zone_score.addEventListener(this.clickCB, this._checkBox_not_zone_score);

                var scoreNeedEnough = this.getNumberItem("scoreNeedEnough", endGameNode.config.defaultScoreNeedEnough);
                this._checkBox_not_zone_score.setSelected(scoreNeedEnough);
                var text = this._checkBox_not_zone_score.getChildByName("text");
                this.selectedCB(text, scoreNeedEnough);

                this._matchModeEndGameScoreNodes = [];
                this._matchModeEndGameScoreNodes.push( endGameNode.getChildByName("match_no_limit") );
                this._matchModeEndGameScoreNodes.push( endGameNode.getChildByName("match_limit") );
                
                this._matchModeEndGameScoreRadio = createRadioBoxForCheckBoxs(this._matchModeEndGameScoreNodes,function(index) {
                    this._checkBox_not_zone_score.visible = (index == 1 && FriendCard_Common.isOpenMatchScoreNeedEnough(this._data.gameType))
                    this.radioBoxSelectCB(index, this._matchModeEndGameScoreNodes[index], this._matchModeEndGameScoreNodes);
                }.bind(this));
                this.addListenerText(this._matchModeEndGameScoreNodes,this._matchModeEndGameScoreRadio,function (index) {
                    this._checkBox_not_zone_score.visible = (index == 1 && FriendCard_Common.isOpenMatchScoreNeedEnough(this._data.gameType))
                }.bind(this));
                
                this._matchModeEndGameScoreSub = endGameNode.getChildByName("btn_sub");
                this._matchModeEndGameScoreSub.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        this.setMatchModeEndGameScore("sub");
                    }
                }, this);
                this._matchModeEndGameScoreAdd = endGameNode.getChildByName("btn_add");
                this._matchModeEndGameScoreAdd.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        this.setMatchModeEndGameScore("add");
                    }
                }, this);
                
                this.setMatchModeEndGameScore = function(action){
                    if(action == "sub"){
                        this._matchModeEndGameScoreEdt.value -= endGameNode.config.dValue;
                    }else if(action == "add"){
                        this._matchModeEndGameScoreEdt.value += endGameNode.config.dValue;
                    }
                    if(this._matchModeEndGameScoreEdt.value < endGameNode.config.limitMin){
                        this._matchModeEndGameScoreEdt.value = endGameNode.config.limitMax;
                    }
                    if(this._matchModeEndGameScoreEdt.value > endGameNode.config.limitMax){
                        this._matchModeEndGameScoreEdt.value = endGameNode.config.limitMin;
                    }
                    this._matchModeEndGameScoreEdt.setString(""+this._matchModeEndGameScoreEdt.value);
                }
                var currentSelect = this.getNumberItem("isMatchDissolveLimit", endGameNode.config.defaultOpenIndex);
                this._matchModeEndGameScoreEdt.value = this.getNumberItem("matchDissolveLimitScore",endGameNode.config.defaultValue);
                this._matchModeEndGameScoreRadio.selectItem(currentSelect);
                this._checkBox_not_zone_score.visible = (currentSelect == 1  && FriendCard_Common.isOpenMatchScoreNeedEnough(this._data.gameType))
                this.setMatchModeEndGameScore();


                //积分不为负提示

                var btn_Tip = this._checkBox_not_zone_score.getChildByName("btn_Tip");
                var image_Tip = this._checkBox_not_zone_score.getChildByName("image_Tip");
                image_Tip.visible = false;
                btn_Tip.addTouchEventListener(function(sender,type){
                    if(type == 2){
                        image_Tip.visible = true;
                    }
                })
                cc.eventManager.addListener({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: false,
                    status: null,
                    onTouchBegan: function(touch, event) {
                        if (image_Tip.isVisible()) {
                            image_Tip.setVisible(false);
                            return true;
                        } else {
                            return false;
                        }
                    },
                }, image_Tip);
            }else{
                if(endGameNode){
                    endGameNode.visible = false;
                }
            }
            //比赛场解散房间end

        }
    },
    //亲友圈防沉迷插入节点
    changeUiForAntiAddictionMode:function(parentNode){
        if(!this._isAntiAddictionMode){
            return;
        }
        var that = this;
        var dy = 80;
        var matchModeNodeMoreHeight = 0;//拓展的时候高度在这里增加
        if (FriendCard_Common.isOpenAntiAddictionDissolveLimit(this._data.gameType)) {
            matchModeNodeMoreHeight += 20;
        }
        //针对打筒子的专门设置
        if(this._data.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG){
            matchModeNodeMoreHeight += 20;
        }
        this._matchModeNode = parentNode.getChildByName("matchModeNode");//一些难兼容的玩法，直接在创建房间ui加入节点
        if(!this._matchModeNode){
            if(parentNode.setInnerContainerSize){//增加scrollview的高度
                //修正scrollView的滑动区域增加插入ui的高度
                parentNode.setInnerContainerSize(cc.size(parentNode.getInnerContainerSize().width, parentNode.getInnerContainerSize().height+dy+matchModeNodeMoreHeight));
                //添加房卡模式选项node
                var matchModeNode = ccs.load("CreateRoomAntiAddictionMode.json").node;
                //matchModeNode.zIndex = -1;
                matchModeNode.setPosition(cc.p(0,parentNode.getInnerContainerSize().height - dy/2))
                this._matchModeNode = matchModeNode;
                //顶部插入点
                parentNode.addChild(matchModeNode)
            }else{
                //wj 解决乐豆设置适配问题
                var matchModeNode = ccs.load("CreateRoomAntiAddictionMode.json").node;
                matchModeNode.setPosition(cc.p(0,180));
                this._matchModeNode = matchModeNode;
                //顶部插入点
                parentNode.addChild(matchModeNode);
                // MjClient.showToast("此玩法未兼容防沉迷!!!")
            }

        }

        this._setTiLiData.isAntiAddictionLimit = 1;              //分数不足无法进场
        this._setTiLiData.isAntiAddictionDissolveLimit = 1;      //分数不足自动解散
        this._setTiLiData.xipaiLedou = 1;                        //洗牌乐豆设置
        this._setTiLiData.isCommissionBottom = 1;                //是否抽成
        this._setTiLiData.antiAddictionScoreNeedEnough = this.getNumberItem("antiAddictionScoreNeedEnough", 0)
        //座位消耗
        this._setTiLiData.xipaiLedou = this.getNumberItem("xipaiLedou", 0)
        //进场分
        this._setTiLiData.antiAddictionLimitScore = this.getNumberItem("antiAddictionLimitScore", 0)
        //解散分
        this._setTiLiData.antiAddictionDissolveLimitScore = this.getNumberItem("antiAddictionDissolveLimitScore", 0)
        //座位消耗
        this._setTiLiData.antiAddictionXiPaiLeDou = this.getNumberItem("antiAddictionXiPaiLeDou", 0)

        //分数消耗模式0大赢家模式 1均摊模式
        this._setTiLiData.scoreExpendMode = this.getNumberItem("scoreExpendMode", 0)

        //多个大赢家平摊还是单算
        this._setTiLiData.shareCostWhenManyWinner = this.getNumberItem("shareCostWhenManyWinner", 0)

        //固定值还是百分比
        this._setTiLiData.isFixRate = this.getNumberItem("isFixRate", 0)

        //封顶
        this._setTiLiData.maxRate = this.getNumberItem("maxRate", 0)

        //区间收费条件底分
        this._setTiLiData.commissionBottomScore = this.getNumberItem("commissionBottomScore", 0)
        this._setTiLiData.commissionBottomScore2 = this.getNumberItem("commissionBottomScore2", 0)
        this._setTiLiData.commissionBottomScore3 = this.getNumberItem("commissionBottomScore3", 0)
        this._setTiLiData.commissionBottomScore4 = this.getNumberItem("commissionBottomScore4", 0)
        this._setTiLiData.commissionBottomScore5 = this.getNumberItem("commissionBottomScore5", 0)
        this._setTiLiData.commissionBottomScore6 = this.getNumberItem("commissionBottomScore6", 0)

        //区间收费抽成
        this._setTiLiData.commissionRate = this.getNumberItem("commissionRate", 0)
        this._setTiLiData.commissionRate2 = this.getNumberItem("commissionRate2", 0)
        this._setTiLiData.commissionRate3 = this.getNumberItem("commissionRate3", 0)
        this._setTiLiData.commissionRate4 = this.getNumberItem("commissionRate4", 0)
        this._setTiLiData.commissionRate5 = this.getNumberItem("commissionRate5", 0)
        this._setTiLiData.commissionRate6 = this.getNumberItem("commissionRate6", 0)

        //保底设置
        this._setTiLiData.isMinGuaranteeFixRate = this.getNumberItem("isMinGuaranteeFixRate", 0)

        this._setTiLiData.minGuaranteeScore = this.getNumberItem("minGuaranteeScore", 0)
        this._setTiLiData.minGuaranteeScore2 = this.getNumberItem("minGuaranteeScore2", 0)
        this._setTiLiData.minGuaranteeScore3 = this.getNumberItem("minGuaranteeScore3", 0)
        this._setTiLiData.minGuaranteeScore4 = this.getNumberItem("minGuaranteeScore4", 0)
        this._setTiLiData.minGuaranteeScore5 = this.getNumberItem("minGuaranteeScore5", 0)
        this._setTiLiData.minGuaranteeScore6 = this.getNumberItem("minGuaranteeScore6", 0)

        this._setTiLiData.minGuaranteeRate = this.getNumberItem("minGuaranteeRate", 0)
        this._setTiLiData.minGuaranteeRate2 = this.getNumberItem("minGuaranteeRate2", 0)
        this._setTiLiData.minGuaranteeRate3 = this.getNumberItem("minGuaranteeRate3", 0)
        this._setTiLiData.minGuaranteeRate4 = this.getNumberItem("minGuaranteeRate4", 0)
        this._setTiLiData.minGuaranteeRate5 = this.getNumberItem("minGuaranteeRate5", 0)
        this._setTiLiData.minGuaranteeRate6 = this.getNumberItem("minGuaranteeRate6", 0)

        if(this._matchModeNode){
            var happyBeanConfig = this._matchModeNode.getChildByName("Button_HappyBeanConfig")
        }
        var _this = this;
        happyBeanConfig.addClickEventListener(function (btn) {
            if(!_this._setTiLiData.isShowHappyBeanConfig){
                _this._setTiLiData.isShowHappyBeanConfig = true;
                MjClient.Scene.addChild(new FriendCard_SXF_setTiLi(_this._setTiLiData));
            }
        });

        // if(this._matchModeNode){

        //     //以下是比赛模式节点
        //     this._matchModeNode.visible = true;
        //     this._matchModeNode = this._matchModeNode.getChildByName("matchMode");
        //     this._matchModeNode.config = {
        //         limitMin:-2000,
        //         limitMax:10000,
        //         dValue:1,
        //         defaultValue:100,
        //         defaultOpenIndex:0
        //     }

        //     //比赛场进入房间规则start
        //     this._matchModeLimitScore = this._matchModeNode.getChildByName("txt_fen");//不需要text了，改成可editbox
        //     this._matchModeLimitScore.ignoreContentAdaptWithSize(true);
        //     var image_fen_bg = this._matchModeNode.getChildByName("Image_3");
        //     var edtContentSize= image_fen_bg.getContentSize();
        //     var edt_input = new cc.EditBox(edtContentSize, new cc.Scale9Sprite());
        //     this._matchModeLimitScoreEdt = edt_input;
        //     edt_input.setFontColor(this._matchModeLimitScore.getTextColor());
        //     edt_input.setPlaceholderFontColor(cc.color(0xFF, 0xFF, 0xFF));
        //     edt_input.setMaxLength(10);
        //     edt_input.setFontSize(this._matchModeLimitScore.getFontSize());
        //     edt_input.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        //     edt_input.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
        //     edt_input.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        //     edt_input.setPlaceHolder("");
        //     edt_input.setPlaceholderFontSize(this._matchModeLimitScore.getFontSize());
        //     edt_input.setPosition(edtContentSize.width/2, edtContentSize.height/2);

        //     edt_input.editBoxEditingDidEnd = function (editBox) {
        //         var str = editBox.getString();
        //         while(str != "0" && str.indexOf("0") == 0){
        //             //避免parseInt转化八进制或十六进制
        //             str = str.substring(1,str.length);
        //         }
        //         var input = parseInt(str);
        //         if(editBox.getString().length == 0 || input == null || isNaN(input)){
        //             input = that._matchModeNode.config.defaultValue
        //         }else if(input > that._matchModeNode.config.limitMax){
        //             input = that._matchModeNode.config.limitMax
        //         }else if(input < that._matchModeNode.config.limitMin){
        //             input = that._matchModeNode.config.limitMin
        //         }
        //         that._matchModeLimitScoreEdt.value = parseInt(input);
        //         that.setMatchModeLimitScore();
        //     };

        //     edt_input.setDelegate(edt_input);
        //     image_fen_bg.addChild(edt_input);
        //     this._matchModeLimitScore.visible = false;


        //     this._matchModeLimitScoreNodes = [];
        //     this._matchModeLimitScoreNodes.push( this._matchModeNode.getChildByName("match_no_limit") );
        //     this._matchModeLimitScoreNodes.push( this._matchModeNode.getChildByName("match_limit") );

        //     this._matchModeLimitScoreRadio = createRadioBoxForCheckBoxs(this._matchModeLimitScoreNodes,function(index) {
        //         this.radioBoxSelectCB(index, this._matchModeLimitScoreNodes[index], this._matchModeLimitScoreNodes);
        //     }.bind(this));
        //     this.addListenerText(this._matchModeLimitScoreNodes,this._matchModeLimitScoreRadio,function (index) {

        //     }.bind(this));

        //     this._matchModeLimitScoreSub = this._matchModeNode.getChildByName("btn_sub");
        //     this._matchModeLimitScoreSub.addTouchEventListener(function(sender, type) {
        //         if (type == 2) {
        //             this.setMatchModeLimitScore("sub");
        //         }
        //     }, this);
        //     this._matchModeLimitScoreAdd = this._matchModeNode.getChildByName("btn_add");
        //     this._matchModeLimitScoreAdd.addTouchEventListener(function(sender, type) {
        //         if (type == 2) {
        //             this.setMatchModeLimitScore("add");
        //         }
        //     }, this);

        //     this.setMatchModeLimitScore = function(action){
        //         if(action == "sub"){
        //             this._matchModeLimitScoreEdt.value -= this._matchModeNode.config.dValue;
        //         }else if(action == "add"){
        //             this._matchModeLimitScoreEdt.value += this._matchModeNode.config.dValue;
        //         }
        //         if(this._matchModeLimitScoreEdt.value < this._matchModeNode.config.limitMin){
        //             this._matchModeLimitScoreEdt.value = this._matchModeNode.config.limitMax;
        //         }
        //         if(this._matchModeLimitScoreEdt.value > this._matchModeNode.config.limitMax){
        //             this._matchModeLimitScoreEdt.value = this._matchModeNode.config.limitMin;
        //         }
        //         this._matchModeLimitScoreEdt.setString(""+this._matchModeLimitScoreEdt.value);
        //     }
        //     var currentSelect = this.getNumberItem("isAntiAddictionLimit", this._matchModeNode.config.defaultOpenIndex);
        //     this._matchModeLimitScoreEdt.value = this.getNumberItem("antiAddictionLimitScore",this._matchModeNode.config.defaultValue);
        //     this._matchModeLimitScoreRadio.selectItem(currentSelect);
        //     this.setMatchModeLimitScore();
        //     //比赛场进入房间规则end


        //     //比赛场解散房间start
        //     var endGameNode = this._matchModeNode.getChildByName("endRoomConfigNode");
        //     if (FriendCard_Common.isOpenAntiAddictionDissolveLimit(this._data.gameType)) {
        //         endGameNode.config = {
        //             limitMin:0,
        //             limitMax:10000,
        //             dValue:1,
        //             defaultValue:100,
        //             defaultOpenIndex:1,
        //             defaultScoreNeedEnough:1,
        //         }
        //         var textEndGameScore = endGameNode.getChildByName("txt_fen");//不需要text了，改成可editbox
        //         textEndGameScore.ignoreContentAdaptWithSize(true);
        //         var image_fen_bg = endGameNode.getChildByName("Image_3");
        //         var edtContentSize= image_fen_bg.getContentSize();
        //         var edt_input_endGame = new cc.EditBox(edtContentSize, new cc.Scale9Sprite());
        //         this._matchModeEndGameScoreEdt = edt_input_endGame;
        //         edt_input_endGame.setFontColor(textEndGameScore.getTextColor());
        //         edt_input_endGame.setPlaceholderFontColor(cc.color(0xFF, 0xFF, 0xFF));
        //         edt_input_endGame.setMaxLength(10);
        //         edt_input_endGame.setFontSize(textEndGameScore.getFontSize());
        //         edt_input_endGame.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        //         edt_input_endGame.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
        //         edt_input_endGame.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        //         edt_input_endGame.setPlaceHolder("");
        //         edt_input_endGame.setPlaceholderFontSize(textEndGameScore.getFontSize());
        //         edt_input_endGame.setPosition(edtContentSize.width/2, edtContentSize.height/2);

        //         edt_input_endGame.editBoxEditingDidEnd = function (editBox) {
        //             var str = editBox.getString();
        //             while(str != "0" && str.indexOf("0") == 0){
        //                 //避免parseInt转化八进制或十六进制
        //                 str = str.substring(1,str.length);
        //             }
        //             var input = parseInt(str);
        //             if(editBox.getString().length == 0 || input == null || isNaN(input)){
        //                 input = endGameNode.config.defaultValue
        //             }else if(input > endGameNode.config.limitMax){
        //                 input = endGameNode.config.limitMax
        //             }else if(input < endGameNode.config.limitMin){
        //                 input = endGameNode.config.limitMin
        //             }
        //             that._matchModeEndGameScoreEdt.value = parseInt(input);
        //             that.setMatchModeEndGameScore();
        //         };

        //         edt_input_endGame.setDelegate(edt_input_endGame);
        //         image_fen_bg.addChild(edt_input_endGame);
        //         textEndGameScore.visible = false;

        //         this._checkBox_not_zone_score = endGameNode.getChildByName("checkBox_not_zone_score");
        //         if(!FriendCard_Common.isOpenAntiAddictionScoreNeedEnough(this._data.gameType)){
        //             this._checkBox_not_zone_score.visible = false;
        //         }
        //         this._checkBox_not_zone_score.visible = true;
        //         this.addListenerText(this._checkBox_not_zone_score);
        //         this._checkBox_not_zone_score.addEventListener(this.clickCB, this._checkBox_not_zone_score);

        //         var scoreNeedEnough = this.getNumberItem("scoreNeedEnough", endGameNode.config.defaultScoreNeedEnough);
        //         this._checkBox_not_zone_score.setSelected(scoreNeedEnough);
        //         var text = this._checkBox_not_zone_score.getChildByName("text");
        //         this.selectedCB(text, scoreNeedEnough);

        //         this._matchModeEndGameScoreNodes = [];
        //         this._matchModeEndGameScoreNodes.push( endGameNode.getChildByName("match_no_limit") );
        //         this._matchModeEndGameScoreNodes.push( endGameNode.getChildByName("match_limit") );

        //         this._matchModeEndGameScoreRadio = createRadioBoxForCheckBoxs(this._matchModeEndGameScoreNodes,function(index) {
        //             this._checkBox_not_zone_score.visible = (index == 1 && FriendCard_Common.isOpenAntiAddictionScoreNeedEnough(this._data.gameType))
        //             this.radioBoxSelectCB(index, this._matchModeEndGameScoreNodes[index], this._matchModeEndGameScoreNodes);
        //         }.bind(this));
        //         this.addListenerText(this._matchModeEndGameScoreNodes,this._matchModeEndGameScoreRadio,function (index) {
        //             this._checkBox_not_zone_score.visible = (index == 1 && FriendCard_Common.isOpenAntiAddictionScoreNeedEnough(this._data.gameType))
        //         }.bind(this));

        //         this._matchModeEndGameScoreSub = endGameNode.getChildByName("btn_sub");
        //         this._matchModeEndGameScoreSub.addTouchEventListener(function(sender, type) {
        //             if (type == 2) {
        //                 this.setMatchModeEndGameScore("sub");
        //             }
        //         }, this);
        //         this._matchModeEndGameScoreAdd = endGameNode.getChildByName("btn_add");
        //         this._matchModeEndGameScoreAdd.addTouchEventListener(function(sender, type) {
        //             if (type == 2) {
        //                 this.setMatchModeEndGameScore("add");
        //             }
        //         }, this);

        //         this.setMatchModeEndGameScore = function(action){
        //             if(action == "sub"){
        //                 this._matchModeEndGameScoreEdt.value -= endGameNode.config.dValue;
        //             }else if(action == "add"){
        //                 this._matchModeEndGameScoreEdt.value += endGameNode.config.dValue;
        //             }
        //             if(this._matchModeEndGameScoreEdt.value < endGameNode.config.limitMin){
        //                 this._matchModeEndGameScoreEdt.value = endGameNode.config.limitMax;
        //             }
        //             if(this._matchModeEndGameScoreEdt.value > endGameNode.config.limitMax){
        //                 this._matchModeEndGameScoreEdt.value = endGameNode.config.limitMin;
        //             }
        //             this._matchModeEndGameScoreEdt.setString(""+this._matchModeEndGameScoreEdt.value);
        //         }
        //         var currentSelect = this.getNumberItem("isAntiAddictionDissolveLimit", endGameNode.config.defaultOpenIndex);
        //         this._matchModeEndGameScoreEdt.value = this.getNumberItem("antiAddictionDissolveLimitScore",endGameNode.config.defaultValue);
        //         this._matchModeEndGameScoreRadio.selectItem(currentSelect);
        //         this._checkBox_not_zone_score.visible = (currentSelect == 1  && FriendCard_Common.isOpenAntiAddictionScoreNeedEnough(this._data.gameType))
        //         this.setMatchModeEndGameScore();




        //         //防沉迷最低抽分要求start
        //         var commissionBottomNode = this._matchModeNode.getChildByName("commissionBottomConfigNode");
        //         if (FriendCard_Common.isOpenAntiAddictionDissolveLimit(this._data.gameType)) {
        //                 commissionBottomNode.config = {
        //                 limitMin:0,
        //                 limitMax:10000,
        //                 dValue:1,
        //                 defaultValue:20,
        //                 defaultOpenIndex:1,
        //                 defaultScoreNeedEnough:1,
        //             }
        //         }
        //         var textEndGameScore = commissionBottomNode.getChildByName("txt_fen");//不需要text了，改成可editbox
        //         textEndGameScore.ignoreContentAdaptWithSize(true);
        //         var image_fen_bg = commissionBottomNode.getChildByName("Image_3");
        //         var edtContentSize= image_fen_bg.getContentSize();
        //         var edt_input_endGame = new cc.EditBox(edtContentSize, new cc.Scale9Sprite());
        //         this._matchModeCommissionBottomNodeScoreEdt = edt_input_endGame;
        //         edt_input_endGame.setFontColor(textEndGameScore.getTextColor());
        //         edt_input_endGame.setPlaceholderFontColor(cc.color(0xFF, 0xFF, 0xFF));
        //         edt_input_endGame.setMaxLength(10);
        //         edt_input_endGame.setFontSize(textEndGameScore.getFontSize());
        //         edt_input_endGame.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        //         edt_input_endGame.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
        //         edt_input_endGame.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        //         edt_input_endGame.setPlaceHolder("");
        //         edt_input_endGame.setPlaceholderFontSize(textEndGameScore.getFontSize());
        //         edt_input_endGame.setPosition(edtContentSize.width/2, edtContentSize.height/2);

        //         edt_input_endGame.editBoxEditingDidEnd = function (editBox) {
        //             var str = editBox.getString();
        //             while(str != "0" && str.indexOf("0") == 0){
        //                 //避免parseInt转化八进制或十六进制
        //                 str = str.substring(1,str.length);
        //             }
        //             var input = parseInt(str);
        //             if(editBox.getString().length == 0 || input == null || isNaN(input)){
        //                 input = commissionBottomNode.config.defaultValue
        //             }else if(input > commissionBottomNode.config.limitMax){
        //                 input = commissionBottomNode.config.limitMax
        //             }else if(input < commissionBottomNode.config.limitMin){
        //                 input = commissionBottomNode.config.limitMin
        //             }
        //             that._matchModeCommissionBottomNodeScoreEdt.value = parseInt(input);
        //             that.setMatchModeEndGameScore();
        //         };

        //         edt_input_endGame.setDelegate(edt_input_endGame);
        //         image_fen_bg.addChild(edt_input_endGame);
        //         textEndGameScore.visible = false;

        //         this._matchModeCommissionBottomeNodes = [];
        //         this._matchModeCommissionBottomeNodes.push( commissionBottomNode.getChildByName("match_no_limit") );
        //         this._matchModeCommissionBottomeNodes.push( commissionBottomNode.getChildByName("match_limit") );

        //         this._matchModeCommissionBottomeRadio = createRadioBoxForCheckBoxs(this._matchModeCommissionBottomeNodes,function(index) {
        //             this.radioBoxSelectCB(index, this._matchModeCommissionBottomeNodes[index], this._matchModeCommissionBottomeNodes);
        //         }.bind(this));
        //         this.addListenerText(this._matchModeCommissionBottomeNodes,this._matchModeCommissionBottomeRadio,function (index) {
        //         }.bind(this));

        //         this._matchModeCommissionBottomeSub = commissionBottomNode.getChildByName("btn_sub");
        //         this._matchModeCommissionBottomeSub.addTouchEventListener(function(sender, type) {
        //             if (type == 2) {
        //                 this.setMatchModeCommissionBottome("sub");
        //             }
        //         }, this);
        //         this._matchModeCommissionBottomeAdd = commissionBottomNode.getChildByName("btn_add");
        //         this._matchModeCommissionBottomeAdd.addTouchEventListener(function(sender, type) {
        //             if (type == 2) {
        //                 this.setMatchModeCommissionBottome("add");
        //             }
        //         }, this);

        //         this.setMatchModeCommissionBottome = function(action){
        //             if(action == "sub"){
        //                 this._matchModeCommissionBottomNodeScoreEdt.value -= commissionBottomNode.config.dValue;
        //             }else if(action == "add"){
        //                 this._matchModeCommissionBottomNodeScoreEdt.value += commissionBottomNode.config.dValue;
        //             }
        //             if(this._matchModeCommissionBottomNodeScoreEdt.value < commissionBottomNode.config.limitMin){
        //                 this._matchModeCommissionBottomNodeScoreEdt.value = commissionBottomNode.config.limitMax;
        //             }
        //             if(this._matchModeCommissionBottomNodeScoreEdt.value > commissionBottomNode.config.limitMax){
        //                 this._matchModeCommissionBottomNodeScoreEdt.value = commissionBottomNode.config.limitMin;
        //             }
        //             this._matchModeCommissionBottomNodeScoreEdt.setString(""+this._matchModeCommissionBottomNodeScoreEdt.value);
        //         }
        //         var currentSelect = this.getNumberItem("isCommissionBottom", commissionBottomNode.config.defaultOpenIndex);
        //         this._matchModeCommissionBottomNodeScoreEdt.value = this.getNumberItem("commissionBottomScore",commissionBottomNode.config.defaultValue);
        //         this._matchModeCommissionBottomeRadio.selectItem(currentSelect);
        //         this.setMatchModeCommissionBottome();
        //         //最低抽成分数结束


        //         //防沉迷抽分start
        //         var commissionRateNode = this._matchModeNode.getChildByName("commissionRateConfigNode");
        //         if (FriendCard_Common.isOpenAntiAddictionDissolveLimit(this._data.gameType)) {
        //                 commissionRateNode.config = {
        //                 limitMin:0,
        //                 limitMax:10000,
        //                 dValue:1,
        //                 defaultValue:20,
        //                 defaultOpenIndex:1,
        //                 defaultScoreNeedEnough:1,
        //             }
        //         }
        //         var textEndGameScore = commissionRateNode.getChildByName("txt_fen");//不需要text了，改成可editbox
        //         textEndGameScore.ignoreContentAdaptWithSize(true);
        //         var image_fen_bg = commissionRateNode.getChildByName("Image_3");
        //         var edtContentSize= image_fen_bg.getContentSize();
        //         var edt_input_endGame = new cc.EditBox(edtContentSize, new cc.Scale9Sprite());
        //         this._matchModeCommissionRateNodeScoreEdt = edt_input_endGame;
        //         edt_input_endGame.setFontColor(textEndGameScore.getTextColor());
        //         edt_input_endGame.setPlaceholderFontColor(cc.color(0xFF, 0xFF, 0xFF));
        //         edt_input_endGame.setMaxLength(10);
        //         edt_input_endGame.setFontSize(textEndGameScore.getFontSize());
        //         edt_input_endGame.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        //         edt_input_endGame.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
        //         edt_input_endGame.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        //         edt_input_endGame.setPlaceHolder("");
        //         edt_input_endGame.setPlaceholderFontSize(textEndGameScore.getFontSize());
        //         edt_input_endGame.setPosition(edtContentSize.width/2, edtContentSize.height/2);

        //         edt_input_endGame.editBoxEditingDidEnd = function (editBox) {
        //             var str = editBox.getString();
        //             while(str != "0" && str.indexOf("0") == 0){
        //                 //避免parseInt转化八进制或十六进制
        //                 str = str.substring(1,str.length);
        //             }
        //             var input = parseInt(str);
        //             if(editBox.getString().length == 0 || input == null || isNaN(input)){
        //                 input = commissionRateNode.config.defaultValue
        //             }else if(input > commissionRateNode.config.limitMax){
        //                 input = commissionRateNode.config.limitMax
        //             }else if(input < commissionRateNode.config.limitMin){
        //                 input = commissionRateNode.config.limitMin
        //             }
        //             that._matchModeCommissionRateNodeScoreEdt.value = parseInt(input);
        //             that.setMatchModeEndGameScore();
        //         };

        //         edt_input_endGame.setDelegate(edt_input_endGame);
        //         image_fen_bg.addChild(edt_input_endGame);
        //         textEndGameScore.visible = false;

        //         this._matchModeCommissionRateNodes = [];
        //         this._matchModeCommissionRateNodes.push( commissionRateNode.getChildByName("match_no_limit") );
        //         this._matchModeCommissionRateNodes.push( commissionRateNode.getChildByName("match_limit") );

        //         this._matchModeCommissionRateRadio = createRadioBoxForCheckBoxs(this._matchModeCommissionRateNodes,function(index) {
        //             this.radioBoxSelectCB(index, this._matchModeCommissionRateNodes[index], this._matchModeCommissionRateNodes);
        //         }.bind(this));
        //         this.addListenerText(this._matchModeCommissionRateNodes,this._matchModeCommissionRateRadio,function (index) {
        //         }.bind(this));

        //         this._matchModeCommissionRateSub = commissionRateNode.getChildByName("btn_sub");
        //         this._matchModeCommissionRateSub.addTouchEventListener(function(sender, type) {
        //             if (type == 2) {
        //                 this.setMatchModeCommissionRate("sub");
        //             }
        //         }, this);
        //         this._matchModeCommissionRateAdd = commissionRateNode.getChildByName("btn_add");
        //         this._matchModeCommissionRateAdd.addTouchEventListener(function(sender, type) {
        //             if (type == 2) {
        //                 this.setMatchModeCommissionRate("add");
        //             }
        //         }, this);

        //         this.setMatchModeCommissionRate = function(action){
        //             if(action == "sub"){
        //                 this._matchModeCommissionRateNodeScoreEdt.value -= commissionRateNode.config.dValue;
        //             }else if(action == "add"){
        //                 this._matchModeCommissionRateNodeScoreEdt.value += commissionRateNode.config.dValue;
        //             }
        //             if(this._matchModeCommissionRateNodeScoreEdt.value < commissionRateNode.config.limitMin){
        //                 this._matchModeCommissionRateNodeScoreEdt.value = commissionRateNode.config.limitMax;
        //             }
        //             if(this._matchModeCommissionRateNodeScoreEdt.value > commissionRateNode.config.limitMax){
        //                 this._matchModeCommissionRateNodeScoreEdt.value = commissionRateNode.config.limitMin;
        //             }
        //             this._matchModeCommissionRateNodeScoreEdt.setString(""+this._matchModeCommissionRateNodeScoreEdt.value);
        //         }
        //         var currentSelect = this.getNumberItem("isFixRate", commissionRateNode.config.defaultOpenIndex);
        //         this._matchModeCommissionRateNodeScoreEdt.value = this.getNumberItem("commissionRate",commissionRateNode.config.defaultValue);
        //         this._matchModeCommissionRateRadio.selectItem(currentSelect);
        //         this.setMatchModeCommissionRate();
        //         //防沉迷抽分结束



        //         //积分不为负提示

        //         var btn_Tip = this._checkBox_not_zone_score.getChildByName("btn_Tip");
        //         var image_Tip = this._checkBox_not_zone_score.getChildByName("image_Tip");
        //         image_Tip.visible = false;
        //         btn_Tip.addTouchEventListener(function(sender,type){
        //             if(type == 2){
        //                 image_Tip.visible = true;
        //             }
        //         })
        //         cc.eventManager.addListener({
        //             event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //             swallowTouches: false,
        //             status: null,
        //             onTouchBegan: function(touch, event) {
        //                 if (image_Tip.isVisible()) {
        //                     image_Tip.setVisible(false);
        //                     return true;
        //                 } else {
        //                     return false;
        //                 }
        //             },
        //         }, image_Tip);
        //     }else{
        //         if(endGameNode){
        //             endGameNode.visible = false;
        //         }
        //     }
        //     //比赛场解散房间end

        // }
    },
    //亲友圈钻石插入节点
    changeUiForRoomCardMode:function (parentNode) {//亲友圈钻石模式
        if(!this._isRoomCardMode){
            return;
        }
        var that = this;
        cc.log("begin changeUiForRoomCardMode");
        
        cc.log("parentNode name ",parentNode.name);
        this._cardRoomOptNode = parentNode;
        

        var dy = 64; 
        var roomCardModeNodeMoreHeight = (FriendCard_Common.isOpenMiankoujiashi(this._data.gameType) && !FriendCard_Common.isOpenForceMiankoujiashi()) ? 150 : 100;
        this._roomCardModeNode = parentNode.getChildByName("roomCardModeNode");//一些难兼容的玩法，直接在创建房间ui加入节点
        if(!this._roomCardModeNode){
            //寻找插入点

            var selectNode = this.getTextNodeByValue(parentNode,"支付：");
            if(!selectNode){
                selectNode = this.getTextNodeByValue(parentNode,"支付:");
            }
            if(!selectNode){
                selectNode = this.getTextNodeByValue(parentNode,"房费：");
            }
            if(!selectNode){
                selectNode = this.getTextNodeByValue(parentNode,"房费:");
            }
            if(!selectNode){
                selectNode = this.getTextNodeByValue(parentNode,"元宝:");
            }
            if(!selectNode){
                selectNode = this.getTextNodeByValue(parentNode,"元宝：");
            }
            if(!selectNode){
                selectNode = this.getTextNodeByValue(parentNode,"付费:");
            }
            if(!selectNode){
                selectNode = this.getTextNodeByValue(parentNode,"付费：");
            }

            //隐藏包含"元宝"的节点 刘雨楠 
            this.getListTextNodeByValue(parentNode,"元宝",function(nodeList){
                for (var i = 0; i < nodeList.length; i++) {
                    //后面会通过判定selectNode是否隐藏做其他逻辑 所以这时候不做隐藏
                    if (nodeList[i] != selectNode) {
                        nodeList[i].visible = false;
                    }
                }
            },[])

            if(selectNode){
                if(!selectNode.visible){
                    selectNode = null;
                }
            }
            if(selectNode){
                var localPos = selectNode.getPosition();
                var selectNodePos = selectNode.getParent().convertToWorldSpace(localPos);
                selectNode.visible = false;
                //cc.log("房费pos ",JSON.stringify(selectNodePos));
                this.findNodeByNameKey(parentNode,"payWay_",function (node) {
                    //cc.log("payWay_ find");
                    node.visible = false;
                });
                if( parseInt(selectNodePos.y) > 720 ||parseInt(selectNodePos.y) < 0){
                    selectNode = null;
                }else{
                    dy = 0;
                }
            }
            var notValues = [];
            notValues.push("自由人数");
            if(!selectNode ){
                cc.log("find 人数");
                selectNode = this.getTextNodeByValue(parentNode,"人数",notValues);
                if(selectNode && !selectNode.visible){
                    cc.log("人数 node not visible");
                    selectNode = null;
                }
                if(selectNode){
                    this._ziYouRenNode = this.getTextNodeByValue(parentNode,"自由人数");
                }else{
                    this._ziYouRenNode = null;
                }
            }
            if(!selectNode){
                cc.log("find 局数");
                selectNode = this.getTextNodeByValue(parentNode,"局数");
                if(selectNode && !selectNode.visible){
                    cc.log("局数 node not visible");
                    selectNode = null;
                }
            }
            if(selectNode){
                var roomCardModeNodePos = selectNode.getPosition();
                var selectNodePos = selectNode.getParent().convertToWorldSpace(selectNode.getPosition());
                //修正选中item的y下标 start

                var fixYNode = [];
                fixYNode.push(this._ziYouRenNode)
                var _realTimeVoiceNode = this.getTextNodeByValue(parentNode,"实时语音");
                fixYNode.push(_realTimeVoiceNode)
                this.findNodeByNameKey(parentNode,"round_4",function (node) {
                    fixYNode.push(node);
                });
                for(var i =0 ; i < fixYNode.length; i++){
                    if(fixYNode[i]){
                        var pos0 = fixYNode[i].getParent().convertToWorldSpace(fixYNode[i].getPosition());
                        var difY = selectNodePos.y - pos0.y
                        if(difY > 10){
                            if(pos0.y < selectNodePos.y){
                                selectNodePos.y = pos0.y;
                                var pos1 = selectNode.getParent().convertToWorldSpace(selectNode.getPosition());
                                if(pos0.y < pos1.y){
                                    roomCardModeNodePos.y = selectNode.getPosition().y + (pos0.y - pos1.y);
                                }
                            }
                        }
                    }
                }//修正选中item的y下标 end

                //插入点下面的节点下移
                this.changeItemY(parentNode.getChildByName("play"),selectNodePos,dy+roomCardModeNodeMoreHeight);
                if(that._data.gameType == MjClient.GAME_TYPE.ML_HONGZHONG 
                    || that._data.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO ){
                    this.changeItemY(parentNode.getChildByName("play").getChildByName("quanZhong1Niao"),selectNodePos,dy+roomCardModeNodeMoreHeight);
                    this.changeItemY(parentNode.getChildByName("play").getChildByName("zhongNiao159"),selectNodePos,dy+roomCardModeNodeMoreHeight);
                }
                this.changeItemY(parentNode.getChildByName("play_way"),selectNodePos,dy+roomCardModeNodeMoreHeight);
                this.changeItemY(parentNode.getChildByName("round"),selectNodePos,dy+roomCardModeNodeMoreHeight);
                this.changeItemY(parentNode.getChildByName("title"),selectNodePos,dy+roomCardModeNodeMoreHeight);
                this.changeItemY(parentNode.getChildByName("difen"),selectNodePos,dy+roomCardModeNodeMoreHeight);
                this.changeItemY(parentNode,selectNodePos,dy+roomCardModeNodeMoreHeight);

                //添加房卡模式选项node
                var roomCardModeNode = ccs.load("CreateRoomCardMode.json").node;
                if (MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ || MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
                    roomCardModeNodePos.y = roomCardModeNodePos.y - dy - 20;
                } else {
                    roomCardModeNodePos.y = roomCardModeNodePos.y - dy - 10;
                }
                if(selectNode.getAnchorPoint().x == 1)
                    roomCardModeNode.setPosition(roomCardModeNodePos.x - selectNode.width,roomCardModeNodePos.y);
                else if(selectNode.getAnchorPoint().x == 0.5)
                    roomCardModeNode.setPosition(roomCardModeNodePos.x - selectNode.width/2,roomCardModeNodePos.y);
                else
                    roomCardModeNode.setPosition(roomCardModeNodePos);
                roomCardModeNode.setAnchorPoint(selectNode.getAnchorPoint())
                selectNode.getParent().addChild(roomCardModeNode);
                this._roomCardModeNode = roomCardModeNode;

            }else{
                cc.log("selectNode null");
            }
        }
        if(this._roomCardModeNode){
            if (this.getNodePlayAndRound().roundPanel && cc.sys.isObjectValid(this.getNodePlayAndRound().roundPanel)) {
                this.getNodePlayAndRound().roundPanel.zIndex = 100
            }
            if(parentNode.setInnerContainerSize){//增加scrollview的高度
                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||MjClient.getAppType() === MjClient.APP_TYPE.HUBEIMJ ){
                    //减少高度,留白下面增加文字(岳阳原高度485左右)
                    var preHeight = parentNode.height;
                    parentNode.height = 465;
                    var parentNodeDy = preHeight - parentNode.height;
                    if(parentNodeDy > 0){
                        parentNode.y += parentNodeDy * (1-parentNode.getAnchorPoint().y);
                    }
                }else if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
                    //减少高度,留白下面增加文字(永利原高度450)
                    var preHeight = parentNode.height;
                    parentNode.height = 430;
                    var parentNodeDy = preHeight - parentNode.height;
                    if(parentNodeDy > 0){
                        parentNode.y += parentNodeDy * (1-parentNode.getAnchorPoint().y);
                    }
                }
                //修正scrollView的滑动区域
                parentNode.setInnerContainerSize(cc.size(parentNode.getInnerContainerSize().width, parentNode.getInnerContainerSize().height+dy+roomCardModeNodeMoreHeight));
                this.changeItemY(parentNode.getChildByName("play"),null,-(dy+roomCardModeNodeMoreHeight));

                if(that._data.gameType == MjClient.GAME_TYPE.ML_HONGZHONG
                    || that._data.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO ){
                    this.changeItemY(parentNode.getChildByName("play").getChildByName("quanZhong1Niao"),null,-(dy+roomCardModeNodeMoreHeight));
                    this.changeItemY(parentNode.getChildByName("play").getChildByName("zhongNiao159"),null,-(dy+roomCardModeNodeMoreHeight));
                }
                
                this.changeItemY(parentNode.getChildByName("play_way"),null,-(dy+roomCardModeNodeMoreHeight));
                this.changeItemY(parentNode.getChildByName("round"),null,-(dy+roomCardModeNodeMoreHeight));
                this.changeItemY(parentNode.getChildByName("title"),null,-(dy+roomCardModeNodeMoreHeight));
                this.changeItemY(parentNode.getChildByName("difen"),null,-(dy+roomCardModeNodeMoreHeight));
                this.changeItemY(parentNode,null,-(dy+roomCardModeNodeMoreHeight));
            }
            //以下是房卡模式节点
            this._roomCardModeNode.visible = true;
            this._roomCardPayModeNode = this._roomCardModeNode.getChildByName("roomCardMode");
            this._roomCardPayModeFen = this._roomCardPayModeNode.getChildByName("txt_fen");
            this._roomCardPayModeFen.ignoreContentAdaptWithSize(true);


            var currentSelect = this.getNumberItem("fangkaSource", 1) -1;
            this._roomCardPayModeFen.minValue = currentSelect > 1 ? 10 : 20;
            this._roomCardPayModeFen.value = this.getNumberItem("fangkaCount", 1);
            this._roomCardPayModeFen.valueArr = FriendCard_Common.getFangkaPayArr(currentSelect + 1, this.getSelectedRoundNum() == 1);
            
            this._roomCardPayModeFen.valueIndex = FriendCard_Common.getArrLimit(this._roomCardPayModeFen.valueArr, this._roomCardPayModeFen.value).index;
            this._roomCardPayModeFen.value = this._roomCardPayModeFen.valueArr[this._roomCardPayModeFen.valueIndex];
            //邵阳剥皮自由人数AA付单独处理
            this.AAPayAndSYBP = function(index){
                //邵阳剥皮自由人数AA付单独处理
                if (index == 2 && (this._data.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI)) {
                    this.maxPlayerList_radio.selectItem(1);
                    this.bg_node.getChildByName("play").getChildByName("maxPlayer_0").visible = false;
                } else if (this._data.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI) {
                    this.bg_node.getChildByName("play").getChildByName("maxPlayer_0").visible = true;
                }
                //邵阳字牌自由人数AA付单独处理
                if (index == 2 && (this._data.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI)) {
                    this.maxPlayerList_radio.selectItem(1);
                    this.bg_node.getChildByName("play").getChildByName("maxPlayer1").visible = false;
                } else if (this._data.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI) {
                    this.bg_node.getChildByName("play").getChildByName("maxPlayer1").visible = true;
                }
            }
            var roomCardPayModeNodes = [];
            roomCardPayModeNodes.push( this._roomCardPayModeNode.getChildByName("club_payWay_1") );
            roomCardPayModeNodes.push( this._roomCardPayModeNode.getChildByName("club_payWay_2") );
            roomCardPayModeNodes.push( this._roomCardPayModeNode.getChildByName("club_payWay_3") );
            if ((this._data && this._data.isLM) || FriendCard_Common.getClubisLM()){//联盟房卡模式不需要输家付
                var club_payWay_2 = this._roomCardPayModeNode.getChildByName("club_payWay_2")
                club_payWay_2.visible = false;
                this._roomCardPayModeNode.getChildByName("club_payWay_3").setPosition(club_payWay_2.getPosition())
            }
            this.roomCardPayMode_radio = createRadioBoxForCheckBoxs(roomCardPayModeNodes,function(index) {
                cc.log("index--",index);
                this.radioBoxSelectCB(index, this.roomCardPayModeNodes[index], this.roomCardPayModeNodes);
                this.setRoomCardPayModeFen(index);
                this.setPayNodeIsShow(index);
                this.AAPayAndSYBP(index);
            }.bind(this));
            this.addListenerText(roomCardPayModeNodes,this.roomCardPayMode_radio,function (index) {
                this.setRoomCardPayModeFen(index);
                this.setPayNodeIsShow(index);
                this.AAPayAndSYBP(index);
            }.bind(this));
            this.roomCardPayModeNodes = roomCardPayModeNodes;
            this.roomCardPayMode_radio.selectItem(currentSelect);
            this.radioBoxSelectCB(currentSelect, this.roomCardPayModeNodes[currentSelect], this.roomCardPayModeNodes);
            this.setRoomCardPayModeFen = function (index) {
                this._roomCardPayModeFen.valueArr = FriendCard_Common.getFangkaPayArr(Number(index) + 1, this.getSelectedRoundNum() == 1);

                if (!this._roomCardPayModeFen.valueArr[this._roomCardPayModeFen.valueIndex]) {
                    this._roomCardPayModeFen.valueIndex = this._roomCardPayModeFen.valueArr.length -1;
                }
                var value = this._roomCardPayModeFen.valueArr[this._roomCardPayModeFen.valueIndex];
                 
                this._roomCardPayModeFen.value = value; 
                this._roomCardPayModeFen.setString(value+"钻石");
                this.setLevelText();
            }
            this._roomCardPayModeSub = this._roomCardPayModeNode.getChildByName("btn_sub");
            this._roomCardPayModeSub.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    this._roomCardPayModeFen.valueIndex -- ;
                    this._roomCardPayModeFen.valueIndex = this._roomCardPayModeFen.valueIndex < 0 ? this._roomCardPayModeFen.valueArr.length -1 : this._roomCardPayModeFen.valueIndex;
                    this.setRoomCardPayModeFen(this.roomCardPayMode_radio.getSelectIndex());
                }
            }, this);
            this._roomCardPayModeAdd = this._roomCardPayModeNode.getChildByName("btn_add");
            this._roomCardPayModeAdd.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    this._roomCardPayModeFen.valueIndex ++ ;
                    this._roomCardPayModeFen.valueIndex = this._roomCardPayModeFen.valueIndex > this._roomCardPayModeFen.valueArr.length - 1 ? 0 : this._roomCardPayModeFen.valueIndex;
                    this.setRoomCardPayModeFen(this.roomCardPayMode_radio.getSelectIndex());
                }
            }, this);
            
            this._roomCardModeTisNode = parentNode.getChildByName("roomCardPayModeTipText");
            if(!this._roomCardModeTisNode){
                //增加文字提示
                this.findNodeByNameKey(this.bg_node.getParent(),"btn_delete",function (node) {
                    cc.log("find out btn_delete");
                    var tipText = new ccui.Text();
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() === MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {//岳阳同一使用方正兰亭
                        tipText.setFontName("fonts/lanting.TTF");
                    }
                    tipText.setName("roomCardPayModeTipText");
                    tipText.setFontSize(28);
                    tipText.setAnchorPoint(cc.p(0,0.5));
                    tipText.setPosition(cc.p(node.x-node.width/2,node.y+node.height/2 + 20));
                    node.getParent().addChild(tipText);
                    this._roomCardModeTisNode = tipText;
                }.bind(this))
            }
            this._roomCardModeTisNode.visible = this.roomCardPayMode_radio.getSelectIndex() == 2 ? false : true;
            this._roomCardModeTisNode.ignoreContentAdaptWithSize(true);
            this._roomCardModeTisNode.setColor(CREATEROOM_COLOR_1);
            this._roomCardModeTisNode.setString("该玩法不足10分不扣钻石");
            this._roomCardModeTisNode.visible = false;

            //fangkaFree
            this.onClickFangkaFree = function() {
                var selectColor = MjClient.createRoomNode._selectColor;
                var unSelectColor = MjClient.createRoomNode._unSelectColor;
                
                mianKouJiaShi.visible = difenMianKou.visible && difenMianKou.isSelected() && FriendCard_Common.isOpenMiankoujiashi(this._data.gameType) && !FriendCard_Common.isOpenForceMiankoujiashi();
                difenBtn_sub.setEnabled(difenMianKou.isSelected());
                difenBtn_add.setEnabled(difenMianKou.isSelected());
                difenMianKou.getChildByName("text").setTextColor(difenMianKou.isSelected() ? selectColor : unSelectColor);
            }
            this.setFangkaFree = function(value) {
                if(this.difenMianKouConfig.mustMultiple && this.difenMianKouConfig.anIncrease >= 1){
                    var remainder = (value % this.difenMianKouConfig.anIncrease);
                    if(remainder != 0){
                        value = parseInt(value / this.difenMianKouConfig.anIncrease) * this.difenMianKouConfig.anIncrease;
                    }
                }
                if (value < this.difenMianKouConfig.min) {
                    difenMianKou.value = this.difenMianKouConfig.max;
                } else if (value > this.difenMianKouConfig.max) {
                    difenMianKou.value = this.difenMianKouConfig.min;
                } else {
                    difenMianKou.value = value;
                }
                
                difenTxt_fen.setString("低于" + difenMianKou.value + "分");
            }
            var difenMianKou = this._roomCardPayModeNode.getChildByName("difenMianKou");
            this._roomCardDifenMianKou = difenMianKou;
            difenMianKou.addEventListener(function(sender, type) {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        this.onClickFangkaFree();
                        break;
                }
            }, this);
            difenMianKou.getChildByName("text").addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    difenMianKou.setSelected(!difenMianKou.isSelected())
                    this.onClickFangkaFree();
                }
            }, this);
            var mianKouJiaShi = difenMianKou.getChildByName("mianKouJiaShi");
            mianKouJiaShi.getChildByName("text").setTouchEnabled(false)
            difenMianKou.mianKouJiaShi = mianKouJiaShi;
            this.setRoomCardModeFree();
            difenMianKou.setSelected(true);
            mianKouJiaShi.setSelected(this.getNumberItem("isMianKouJiaShi", false))
            mianKouJiaShi.getChildByName("text").setString("免扣加时（最多2局）")
            this.addListenerText(mianKouJiaShi);
            //贵州 联盟中玩法默认勾选免扣加时
            if ((this._data && this._data.isLM || FriendCard_Common.getClubisLM()) && MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
                mianKouJiaShi.setSelected(this.getNumberItem("isMianKouJiaShi", true));
            }
            if(FriendCard_Common.isOpenForceMiankoujiashi()){
                mianKouJiaShi.setSelected(true);
            }

            difenMianKou.value = this.getNumberItem("fangkaFree", 0); //默认值
            if (!difenMianKou.value) {
                difenMianKou.value = this.difenMianKouConfig.default;
                difenMianKou.setSelected(false);
            }
            this.difenMianKou = difenMianKou;

            var difenBtn_add = difenMianKou.getChildByName("difenBtn_add");
            difenBtn_add.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if(this.difenMianKouConfig.valueList){
                        var index = this.difenMianKouConfig.valueList.indexOf(Number(difenMianKou.value));
                        var indexNext = (index+1+this.difenMianKouConfig.valueList.length)%this.difenMianKouConfig.valueList.length;
                        var value = this.difenMianKouConfig.valueList[indexNext];
                    }else{
                        var value = difenMianKou.value + this.difenMianKouConfig.anIncrease;
                    }
                    this.setFangkaFree(value);
                }
            }, this);

            var difenBtn_sub = difenMianKou.getChildByName("difenBtn_sub");
            difenBtn_sub.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if(this.difenMianKouConfig.valueList){
                        var index = this.difenMianKouConfig.valueList.indexOf(Number(difenMianKou.value));
                        var indexNext = (index-1+this.difenMianKouConfig.valueList.length)%this.difenMianKouConfig.valueList.length;
                        var value = this.difenMianKouConfig.valueList[indexNext];
                    }else{
                        var value = difenMianKou.value - this.difenMianKouConfig.anIncrease;
                    }
                    this.setFangkaFree(value);
                }
            }, this);

            var difenTxt_fen = difenMianKou.getChildByName("difenTxt_fen");
            difenTxt_fen.ignoreContentAdaptWithSize(true);

            //winnerPayNode
            this.onClickWinnerAdded = function() {
                var selectColor = MjClient.createRoomNode._selectColor;
                var unSelectColor = MjClient.createRoomNode._unSelectColor;
                addedBtn_sub.setEnabled(winnerAdded.isSelected())
                addedBtn_add.setEnabled(winnerAdded.isSelected())
                winnerAdded.getChildByName("text").setTextColor(winnerAdded.isSelected() ? selectColor : unSelectColor);
                this.setLevelText();
            }
            this.setWinnerAdded = function(value) {
                if (value < winnerAdded.minValue) {
                    winnerAdded.value = winnerAdded.minValue;
                } else if (value > winnerAdded.maxValue) {
                    winnerAdded.value = winnerAdded.minValue;
                } else {
                    winnerAdded.value = value;
                }
                text_added.setString(winnerAdded.value + "钻石");
                this.setLevelText();
            }
            this.setPayNodeIsShow = function(index) {
                winnerPayNode.visible = (index == 0 || index == 1);
                //_AAPayNode.visible = (index == 2 && (this.getSelectedRoundNum() != 1));
                _AAPayNode.visible = false;//【风控】【亲友圈&联盟】房卡模式，AA支付模式下，最高分加收功能去除
                this.setLevelText();
            }
            var winnerPayNode = this._roomCardPayModeNode.getChildByName("winnerPayNode");
            var winnerPayNodes = [];
            winnerPayNodes.push(winnerPayNode.getChildByName("winner_1"));
            winnerPayNodes.push(winnerPayNode.getChildByName("winner_2"));
            this.winnerPayNodes_radio = createRadioBoxForCheckBoxs(winnerPayNodes, function(index) {
                //cc.log("index--",index);
                this.radioBoxSelectCB(index, winnerPayNodes[index], winnerPayNodes);
            }.bind(this));
            this.addListenerText(winnerPayNodes, this.winnerPayNodes_radio, function(index) {}.bind(this));
            this.radioBoxSelectCB(0, winnerPayNodes[0], winnerPayNodes);
            this.winnerPayNodes_radio.selectItem(this.getNumberItem("fangkaExtra", 0) > 1 ? 0 : this.getNumberItem("fangkaExtra", 0));
            var _AAPayNode = this._roomCardPayModeNode.getChildByName("AAPayNode");
            this._roomCardAAPayNode = _AAPayNode;
            var winnerAdded = _AAPayNode.getChildByName("winnerAdded");
            var addedBtn_sub = _AAPayNode.getChildByName("addedBtn_sub");
            var addedBtn_add = _AAPayNode.getChildByName("addedBtn_add");
            var text_added = _AAPayNode.getChildByName("text_added");
            text_added.ignoreContentAdaptWithSize(true)
            winnerAdded.minValue = 10;
            winnerAdded.maxValue = 999999;
            winnerAdded.value = this.getNumberItem("fangkaExtra", 0);
            winnerAdded.setSelected(true);
            if (winnerAdded.value < 10 || this.roomCardPayMode_radio.getSelectIndex() != 2) {
                winnerAdded.value = 10
                winnerAdded.setSelected(false);
            }

            this.winnerAdded = winnerAdded;
            winnerAdded.addEventListener(function(sender, type) {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        this.onClickWinnerAdded();
                        break;
                }
            }, this);
            winnerAdded.getChildByName("text").addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    winnerAdded.setSelected(!winnerAdded.isSelected())
                    this.onClickWinnerAdded();
                }
            }, this);
            addedBtn_sub.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var value = winnerAdded.value - 1;
                    this.setWinnerAdded(value);
                }
            }, this);
            addedBtn_add.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var value = winnerAdded.value + 1;
                    this.setWinnerAdded(value);
                }
            }, this);

            var levelImage = this._roomCardPayModeNode.getChildByName("Image_level");
            this.setLevelText = function(){
                if (!levelImage) return;
                var levelStrs =  FriendCard_Common.fangkaPayConfig.levelStrs; //["普通", "高级", "皇冠","尊贵"];
                var fangkaCount = this._roomCardPayModeFen.value;
                var fangkaSource = this.roomCardPayMode_radio.getSelectIndex() + 1;
                var maxPlayer = this.getSelectPlayNum();
                if (typeof(maxPlayer) == typeof([]))
                    maxPlayer = maxPlayer[0];
                var fangkaExtra = (this._roomCardAAPayNode.isVisible() && this.winnerAdded.isSelected()) ? this.winnerAdded.value : 0;
                var index = FriendCard_Common.getFangkaLevel(fangkaCount, fangkaSource, fangkaExtra, maxPlayer, this.getSelectedRoundNum() == 1).index;
                if (levelStrs[index]) {
                    if (levelText.getString() != levelStrs[index] + "房间") {
                        levelText.setString(levelStrs[index] + "房间");
                        levelImage.loadTexture("fangKa/level/level" + ([0, 1, 6, 7][index] || 0) + ".png");
                    }
                }
            }
            if (levelImage) {
                var levelText = levelImage.getChildByName("text");
                levelText.setTextColor(this._selectColor);
                levelText.setFontName("fonts/lanting.TTF");

                levelText.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        this.showFangkaRoomLevelInfo();
                    }
                }, this);

                var tipBtn = levelImage.getChildByName("tipBtn");
                tipBtn.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        this.showFangkaRoomLevelInfo();
                    }
                }, this);
            }

            //默认
            this.setRoomCardPayModeFen(this.roomCardPayMode_radio.getSelectIndex());
            this.setWinnerAdded(winnerAdded.value)
            this.setPayNodeIsShow(currentSelect);
            this.setFangkaFree(difenMianKou.value);
            this.onClickFangkaFree();
            this.onClickWinnerAdded();
        }
    },
    setRoomCardModeFree:function(difen){
        if(this._roomCardModeNode){
            if(difen || difen == 0){
                this.difenMianKouConfig = FriendCard_Common.getFangkaFreeConfig(this._data.gameType,difen);
            }else{
                if(this.jieSuanDiFen){
                    this.difenMianKouConfig = FriendCard_Common.getFangkaFreeConfig(this._data.gameType,(this.difenIndex || this.difenIndex == 0) ? this.difenAry[this.difenIndex] : null);
                }else{
                    if(this.difenAry && (this.difenIndex || this.difenIndex == 0)){
                        this.difenMianKouConfig = FriendCard_Common.getFangkaFreeConfig(this._data.gameType,this.difenAry[this.difenIndex]);
                    }else{
                        difen = (this._ZhuNum ? Number(this._ZhuNum.getString()) : ((this._zhuIdx || this._zhuIdx == 0) ? this._zhuIdx : null));
                        if(isNaN(difen)){
                            difen = null;
                        }
                        this.difenMianKouConfig = FriendCard_Common.getFangkaFreeConfig(this._data.gameType,difen);
                    }
                    
                }
            }
            
        }

    },
    setRoomCardFreeFeeVisible:function(visible){
        if(this._roomCardDifenMianKou){
            this._roomCardDifenMianKou.visible = visible;
            if(this.onClickFangkaFree){
                this.onClickFangkaFree();
            }
        }
    },
    showFangkaRoomLevelInfo: function() {
        var infoDialog = ccs.load("fangkaRoomLevelInfo.json").node;
        var bgImage = infoDialog.getChildByName("Image_bg");
        var contentText = bgImage.getChildByName("Text_content");
        var closeBtn = bgImage.getChildByName("close");


        var cfg = FriendCard_Common.fangkaPayConfig;
        var str = "";
        for (var i = 0; i < cfg.infoStrs.length; i++) {
            str += cfg.infoStrs[i] + "\n\n";
        }

        contentText.setString(str);
        contentText.setFontSize(22);
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                infoDialog.removeFromParent();
            }
        }, this);

        infoDialog.setPosition(MjClient.createui.width/2, MjClient.createui.height/2);
        setWgtLayout(infoDialog.getChildByName("Image_di"), [1, 1], [0, 0], [0, 0], true);
        setWgtLayout(bgImage, [bgImage.width/1280, bgImage.height/720], [0, 0], [0, 0]);
        MjClient.createui.addChild(infoDialog, 999);
    },
    getNodePlayAndRound: function(){
        var playPanel = this._scroll_play || this.bg_node.getChildByName("play")
        if (playPanel == undefined)
        {
            if(this.bg_node.getChildByName("view") && this.bg_node.getChildByName("view").getChildByName("play"))
                playPanel =  this.bg_node.getChildByName("view").getChildByName("play");
            else if(this.bg_node.getChildByName("view") && this.bg_node.getChildByName("view").getChildByName("play_way"))
                playPanel =  this.bg_node.getChildByName("view").getChildByName("play_way");
            else if(this.bg_node.getChildByName("play_way"))
                playPanel = this.bg_node.getChildByName("play_way");
            else if(this.bg_node.getChildByName("playScroll") && this.bg_node.getChildByName("playScroll").getChildByName("play"))
                playPanel = this.bg_node.getChildByName("playScroll").getChildByName("play");
        }

        var roundPanel = this._scroll_round || this.bg_node.getChildByName("round")
        if(roundPanel == undefined )
        {
            if(this.bg_node.getChildByName("view") && this.bg_node.getChildByName("view").getChildByName("round"))
                roundPanel =  this.bg_node.getChildByName("view").getChildByName("round");
        }

        var node = {};
        node.playPanel = playPanel;
        node.roundPanel = roundPanel;
        return node;
    },
    clubCustomOpe: function(){
        if(this._isRoomCardMode) //房卡模式不允许玩家自主创房
            return;

     // 晋中俱乐部玩家设置自主开房
        var getControlsByName = function (node,keyValue,func) {
            var childrens = node.getChildren();
            if (childrens){
                for(var i in childrens){
                    if(childrens[i].name && childrens[i].name.indexOf(keyValue) != -1){
                        if(func){
                            func(childrens[i])
                            return true;
                        }
                    }else{
                        if (childrens[i].getChildren() && childrens[i].getChildren().length > 0){
                            getControlsByName(childrens[i],keyValue,func);
                        }
                    }
                }
            }
            return false;
        }

        if (isJinZhongAPPType() && this._isFriendCard && this._clubIsCreateRoom == false )
        {   
            var node = this.getNodePlayAndRound();

            var playPanel = node.playPanel;
            var roundPanel = node.roundPanel;

            if(!roundPanel || !playPanel)
                return;

            var gps = this._playNode_gps || playPanel.getChildByName("play_gps")  ;
            if(this.clubRule.isFangzuobi)
            {
                gps.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function(){
                    gps.setSelected(true);
                })));
            }

            var libertyCreRoom = gps.clone();
            libertyCreRoom.name = "libertyCreRoom";
            libertyCreRoom.getChildByName("_helpNode").visible = false;
            this.addListenerText(libertyCreRoom);

            var text = libertyCreRoom.getChildByName("text");
            text.setString(" 允许玩家自主开房 ");

            libertyCreRoom.setSelected(this._data.isShowLibertyCreRoom && (this._data.gameType == this._data.clubRule.gameType));
            libertyCreRoom.setPosition(gps.getPosition());
            libertyCreRoom.y += libertyCreRoom.height + 3;
            gps.getParent().addChild(libertyCreRoom);

            var hideModuleArr = [];
            var hide = function() {
                if (libertyCreRoom.isSelected()) {
                    if(hideModuleArr.length > 0)
                    {
                        for (var i = 0; i < hideModuleArr.length; i++) {
                            hideModuleArr[i].visible = false;
                        }  
                        return;
                    }
                   
                    var textParent = roundPanel;
                    if (roundPanel.getChildByName("text_jushu") == undefined)
                        textParent = this.bg_node;

                    for (var i = 0; i < playPanel.children.length; i++) {
                        if (playPanel.children[i].name == "play_count0" || playPanel.children[i].name == "play_count1" ||
                            playPanel.children[i].name == "play_count2" || playPanel.children[i].name == "libertyCreRoom" ||
                            playPanel.children[i].name == "play_gps" || playPanel.children[i].name == "play_count3")
                            playPanel.children[i].visible = true;
                        else {
                            if (playPanel.children[i].visible == true) {
                                playPanel.children[i].visible = false;
                                hideModuleArr.push(playPanel.children[i]);
                            }
                        }
                    }
                    var needHideText = [
                        "text_wanfa",
                        "shuffleOpt",
                        "text_wanfa_0",
                        "text_suanfen",
                        "text_difen",
                        "text_fengding",
                        "text_renshu_0",
                        "text_liupai",
                        "speedDes",
                        "shuffleOpt_0",
                        "zhaDanDes",
                        "shuffleOpt_1",
                        "text_sandan",
                    ]
                    for (var i = 0; i < needHideText.length; i++) {
                        // if (textParent.children[i].name == "text_wanfa" || textParent.children[i].name == "text_difen" ||
                        //     textParent.children[i].name == "shuffleOpt" || textParent.children[i].name == "text_fengding" || 
                        //     textParent.children[i].name == "text_suanfen" || textParent.children[i].name == "text_renshu_0" ||
                        //     textParent.children[i].name == "text_wanfa_0" || textParent.children[i].name == "text_liupai") 
                        // {
                        //     if (textParent.children[i].visible == true) {
                        //         textParent.children[i].visible = false;
                        //         hideModuleArr.push(textParent.children[i]);
                        //     }
                        // }
                        getControlsByName(this.bg_node, needHideText[i], function(node) {
                            hideModuleArr.push(node)
                        });
                    }

                    var difenCon = ["btn_add", "btn_sub", "Image_8", "txt_fen"];
                    if (this.bg_node) {
                        for (var i = 0; i < difenCon.length; i++) {
                            getControlsByName(this.bg_node, difenCon[i], function(node) {
                                if(node.getParent().name != "roomCardMode")
                                {
                                  node.visible = false;
                                    hideModuleArr.push(node)  
                                }
                            });
                        }
                    }
                } else {
                    for (var i = 0; i < hideModuleArr.length; i++) {
                        hideModuleArr[i].visible = true;
                    }
                    hideModuleArr = [];
                }
            }.bind(this);
            this.customInfo = libertyCreRoom;
            this.bg_node.schedule(function() {
                hide();
            });
        }
        // 晋中俱乐部玩家自主开房 创建房间
        if (isJinZhongAPPType() && this._isFriendCard && this._clubIsCreateRoom)
        {
            var addImg = function(parent) {
                var img = new ccui.ImageView("createNewPng/daTC1_21.png");
                img.setAnchorPoint(0, 0);
                parent.addChild(img);
            }
            var node = this.getNodePlayAndRound();
            var playPanel = node.playPanel;
            var roundPanel = node.roundPanel;

            if(!roundPanel || !playPanel)
                return;

            var gps =  this._playNode_gps || playPanel.getChildByName("play_gps");
            var checkBoxList = [];
            if(this.clubRule.isFangzuobi)
            {
                checkBoxList.push(gps)
                playPanel.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function(){
                    gps.setSelected(true);
                    gps.touchEnabled = false;
                    var text = gps.getChildByName("text");
                    text.setTextColor(cc.color(127, 127, 127));
                })));
            }

            var libertyCreRoom = gps.clone();
            this.customInfo = libertyCreRoom;
            libertyCreRoom.name = "libertyCreRoom";
            libertyCreRoom.getChildByName("_helpNode").visible = false;
            libertyCreRoom.setEnabled(false);
            gps.getParent().addChild(libertyCreRoom);
            checkBoxList.push(libertyCreRoom)

            var img = new ccui.ImageView("createNewPng/daTC1_20.png");
            img.setAnchorPoint(0, 0);
            libertyCreRoom.addChild(img);
            var text = libertyCreRoom.getChildByName("text");
            text.setString(" 允许玩家自主开房 ");
            libertyCreRoom.setPosition(gps.getPosition());
            libertyCreRoom.x += gps.width + gps.getChildByName("text").width + 70;

            for (var i = 0; i < roundPanel.children.length; i++) {
                var _module = roundPanel.children[i];
                var str = roundPanel.children[i].name;
                if(!str) continue
                if ((str.indexOf("round_") != -1) ||
                    (str.indexOf("payWay_") != -1)) {
                    checkBoxList.push(_module);
                    _module.loadTextureFrontCross("createNewPng/daTC1_21.png");
                }
            }

            // //支付方式
            // var payWayIndex = Number(this._data.info.payWay) + 1;
            // addImg(roundPanel.getChildByName("payWay_"+payWayIndex));

            // //局数
            // var roundNumObj = Object.keys(MjClient.data.gamePrice[this._data.info.gameType][this._data.info.maxPlayer]).sort(function(a, b) {
            //     return a - b
            // });
            // var indexRound = roundNumObj.indexOf(this._data.info.round)
            // indexRound ++;
            // addImg(roundPanel.getChildByName("round_" + indexRound))

            //人数
            for (var i = 0; i < playPanel.children.length; i++) {
                var _module = playPanel.children[i];
                var str = playPanel.children[i].name;
                if ((str.indexOf("play_count") != -1)) {
                    checkBoxList.push(_module);
                    var moduleStr = _module.getChildByName("text").getString();
                    _module.loadTextureFrontCross("createNewPng/daTC1_21.png");
                     // if(this._data.info.maxPlayer == 3 && moduleStr.indexOf("3") != -1 || moduleStr.indexOf("三") != -1 )
                     //     addImg(module);
                     // if(this._data.info.maxPlayer == 4 && moduleStr.indexOf("4") != -1)
                     //     addImg(module);
                     // if(this._data.info.maxPlayer == 5 && moduleStr.indexOf("5") != -1)
                     //     addImg(module);
                     // if(this._data.info.maxPlayer == 2 && moduleStr.indexOf("2") != -1)
                     //     addImg(module);
                }
            }

            if(this._roomCardModeNode)
            {
                FriendCard_Common.setNodeChiTouch(this._roomCardModeNode);
            }
            //按钮置灰
            var callSetTextColor = function() {
                for (var i = 0; i < checkBoxList.length; i++) {
                    var checkBox = checkBoxList[i];
                    checkBox.touchEnabled = false;
                    //checkBox.setSelected(false)
                    var text = checkBox.getChildByName("text");
                    text.setTextColor(cc.color(127, 127, 127));
                    text.setEnabled(false);
                    if (checkBox.getChildByName("text_0")) {
                        checkBox.getChildByName("text_0").setTextColor(cc.color(127, 127, 127));
                        checkBox.getChildByName("text_0").touchEnabled = false;
                    }
                }
            }
            roundPanel.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(callSetTextColor)));
        }
    },
    grayButtonName:function()
    {
        this.grayButtonNameStr = " ";

        if (MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ && MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ)
            return;

        if (!this._isFriendCard && !this._clubIsCreateRoom)
            return

        if (this.clubRule.isFangzuobi)
            this.grayButtonNameStr += "play_gps   ";

        if (this._isRoomCardMode)
            this.grayButtonNameStr += " club_payWay_1  club_payWay_2  club_payWay_3 ";

        var node = this.getNodePlayAndRound();
        var playPanel = node.playPanel;
        var roundPanel = node.roundPanel;

        if(roundPanel)
        {
           for (var i = 0; i < roundPanel.children.length; i++) {
                var _module = roundPanel.children[i];
                var str = roundPanel.children[i].name;
                if ((str.indexOf("round_") != -1) ||
                    (str.indexOf("payWay_") != -1)) {
                    this.grayButtonNameStr = this.grayButtonNameStr + _module.name + " "
                }
            } 
        }
        if(playPanel)
        {
            for (var i = 0; i < playPanel.children.length; i++) {
                var _module = playPanel.children[i];
                var str = playPanel.children[i].name;
                if ((str.indexOf("play_count") != -1)) {
                    this.grayButtonNameStr = this.grayButtonNameStr + _module.name + " "
                }
            } 
        }
        
    },
    showInputRuleNameDialog: function() {
        var dialog = ccs.load("friendcard_inputRuleNameDialog.json").node;
        setWgtLayout(dialog, [1, 1], [0, 0], [0, 0], true);

        var text_tip = dialog.getChildByName("Image_bg").getChildByName("Text_tip");
        text_tip.ignoreContentAdaptWithSize(true);
        var image = dialog.getChildByName("Image_bg").getChildByName("Image");
        var textInput = new cc.EditBox(image.getContentSize(), new cc.Scale9Sprite("friendCards/int_playwords.png"));
        textInput.setFontColor(cc.color(0x40, 0x40, 0x40));
        textInput.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        textInput.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        textInput.setPlaceHolder("填写名称");

        if(isJinZhongAPPType()){
            textInput.setFontSize(38);
        }

        textInput.setPosition(image.getContentSize().width / 2, image.getContentSize().height / 2);
        image.addChild(textInput);

        if (this._data) {
            if (this._data.ruleName){
                var splitRuleName = FriendCard_Common.splitClubRuleName(unescape(this._data.ruleName))
                textInput.setString(splitRuleName[0]);
            }
            //textInput.setString(GameCnName[this._data.gameType]);
        }
        this._textInput = textInput;

        var finishBtn = dialog.getChildByName("Image_bg").getChildByName("Button_finish");
        finishBtn.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var rule = FriendCard_Common.strReplace(textInput.getString());
                    // if(rule && !FriendCard_Common.isNumber(rule)){
                    //      MjClient.showToast("请填写0-4位的阿拉伯数字");
                    //      return;
                    // }
                    if (rule && rule.length > 10)
                        MjClient.showToast("最多输入10位玩法编号");
                    else
                        this.retainRule();
                    break;
                default:
                    break;
            }
        }, this);

        dialog.getChildByName("Image_bg").getChildByName("close").visible = false;
        MjClient.createui.addChild(dialog);
    },
    getSelectPlayNum: function() {
        if (cc.sys.OS_WINDOWS == cc.sys.os) {
            cc.log('warn 如果是需要选择人数的游戏，调用initPlayNumNode初始化加快创建界面打开速度')
        }
        return this.getSelectedPara().maxPlayer;
    },
    // playNodes[4人node, 3人node, 2人node]  playNums[4, 3, 2]
    initPlayNumNode: function(playNodes, playNums) {
        this.getSelectPlayNum = function() {
            var playnum = 4;
            for(var i in playNodes) {

                if(playNodes[i].isSelected()) playnum = [playNums[i]];
            }
            cc.log('getSelectPlayNum 获取人数', playnum)
            return playnum;
        }
    },
 	getItem: function(key, defaultValue) {
        if (typeof(defaultValue) == "undefined")
            defaultValue = 0;
        return this.clubRule && key && typeof(this.clubRule[key]) != "undefined" ? this.clubRule[key] : defaultValue;
    },
    getNumberItem: function(key, defaultValue) {
        var ret = this.getItem(key, defaultValue);
        ret = Number(ret);
        if (!cc.isNumber(ret))
            ret = 0;
        return ret;
    },
    getBoolItem: function(key, defaultValue) {
        var ret = this.getItem(key, defaultValue);
        return ret ? true : false;
    },
    getStringItem: function(key, defaultValue) {
        return this.getItem(key, defaultValue) + "";
    },
    setPlayNodeCurrentSelect: function() {
        //add by sking for create room need GPS
        if(this._nodeGPS)
        {
            var _selectCol = CREATEROOM_COLOR_1;
            var _UnSelectCol = CREATEROOM_COLOR_3;
            var _bTempGPS;
            if (this._isFriendCard)
                _bTempGPS = this.getBoolItem("gps", false);
            else
                _bTempGPS = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_GPS, false);
            this._nodeGPS.setSelected(_bTempGPS);
            if(this._nodeGPS.isSelected()) {
                this._nodeGPS.getChildByName("text").setColor(_selectCol);
            } else {
                this._nodeGPS.getChildByName("text").setColor(_UnSelectCol);
            }
        }
    },
    setRoundNodeCurrentSelect: function() {
        // 局数选项 设置上次创建房间时的默认选项
        var pPriceCfg = this.getPriceCfg();
        if(!pPriceCfg) return false;
        var selectItemNum = Object.keys(pPriceCfg).length;
        var _currentRoundState;

		if (this._isFriendCard && this.clubRule) {
            // var roundNumObj = Object.keys(pPriceCfg).sort(function(a, b) {
            //     return a - b
            // });

            var roundNumObj = this.getRoundNumObj();

			_currentRoundState = roundNumObj.indexOf(this.clubRule.round + "");
            if (_currentRoundState != -1)
				_currentRoundState ++;
			else if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ ||
                this._data.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG ||
                this._data.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ ||
                (this._data.gameType == MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY && MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) ||
                (this._data.gameType == MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI && MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) ||
                this._data.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA ||
                this._data.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE ||
                this._data.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER ||
                this._data.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI ||
                this._data.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA ||
                this._data.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI)
            {
                _currentRoundState = 1;
            }else if(this._data.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ) {
                _currentRoundState = 1;
            }else if(this._data.gameType == MjClient.GAME_TYPE.DIAN_TUO) {
                _currentRoundState = 5;
            }
			else
				_currentRoundState = 2;
		}
		else {
	        if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ || 
                this._data.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
                this._data.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW || 
                this._data.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ ||
                this._data.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG ||
                this._data.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG ||
                (this._data.gameType == MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY && MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) ||
                (this._data.gameType == MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI && MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)||
                (this._data.gameType == MjClient.GAME_TYPE.LUO_DI_SAO) ||
                this._data.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA ||
                this._data.gameType == MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ ||
                this._data.gameType == MjClient.GAME_TYPE.GUI_ZHOU_XMY_GUI_YANG_ZHUO_JI ||
                this._data.gameType == MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI ||
                this._data.gameType == MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_GUAI ||
                this._data.gameType == MjClient.GAME_TYPE.GUI_ZHOU_ER_DING_GUAI ||
                this._data.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE ||
                this._data.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER ||
                this._data.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI ||
                this._data.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA ||
                this._data.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI)
            {
	            _currentRoundState = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_RondType, 1);
	        } else if(this._data.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ){
                _currentRoundState = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_RondType, 1);
            } else if(this._data.gameType == MjClient.GAME_TYPE.DIAN_TUO) {
                _currentRoundState = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_RondType, 5);
            } 
            else
	            _currentRoundState = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_RondType, 2);

	        if(_currentRoundState > selectItemNum) _currentRoundState = selectItemNum;
		}

        for (var i=0; i<this.roundNodeArray.length && i<selectItemNum; i++)
        {
            var roundNode = this.roundNodeArray[i];
            if (cc.sys.isObjectValid(roundNode))
            {
                if (i+1 == _currentRoundState)
                {
                    roundNode.setSelected(true);
                    var text = roundNode.getChildByName("text");
                    this.selectedCB(text,true);
                }
                else
                {
                    roundNode.setSelected(false);
                    var text = roundNode.getChildByName("text");
                    this.selectedCB(text, false);
                }
            }
        }

        // 支付方式选项   默认选择_payWay
        var _payWay = 0;
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ) {
			if (this._isFriendCard)
				_payWay = this.getNumberItem("payWay", 1);
			else
            	_payWay = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PayWay, 1);
		}
        else {
			if (this._isFriendCard)
				_payWay = this.getNumberItem("payWay", 0);
			else
            	_payWay = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PayWay, 0);
		}

        if(_payWay == 2 && MjClient.APP_TYPE.QXXZMJ === MjClient.getAppType())
        {
            _payWay = 0;
        }
        if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || 
        MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType() || 
        MjClient.APP_TYPE.AYGUIZHOUMJ == MjClient.getAppType()) 
        && 
        (this._data.gameType == MjClient.GAME_TYPE.CHANG_SHA
        || this._data.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA 
        || this._data.gameType == MjClient.GAME_TYPE.LEI_YANG_GMJ
        || this._data.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA 
        || this._data.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA
        || this._data.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_TY 
        || this._data.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN) )
        {
            _payWay = 0;
        }

        for (var i=0; i<this.payWayNodeArray.length; i++)
        {
            var payWayNode = this.payWayNodeArray[i];
            if (cc.sys.isObjectValid(payWayNode))
            {
                if (i == _payWay)
                {
                    payWayNode.setSelected(true);
                    var text = payWayNode.getChildByName("text");
                    this.selectedCB(text,true);
                }
                else
                {
                    payWayNode.setSelected(false);
                    var text = payWayNode.getChildByName("text");
                    this.selectedCB(text, false);
                }
            }
        }
    },
    addListenerText: function(node, radio, callback) {//callback 是回调函数
        if (node && radio) {
            //cc.log(">>>>>>>>>>>>>>", JSON.stringify(node), JSON.stringify(radio), callback);
            for (var i = 0; i < node.length; i++) {
                node[i].getChildByName("text").ignoreContentAdaptWithSize(true);
                if (this._clubIsCreateRoom && this.grayButtonNameStr.indexOf(node[i].name) != -1) {
                    //俱乐部自主创房需要置灰的按钮,不添加事件
                } else {
                    cc.eventManager.addListener(this.setTextClick(node, i, radio, callback), node[i].getChildByName("text"));
                }
            }
        }else if (this._clubIsCreateRoom && this.grayButtonNameStr.indexOf(node.name) != -1) {
            node.getChildByName("text").ignoreContentAdaptWithSize(true);
        } else if (callback) {
            node.getChildByName("text").ignoreContentAdaptWithSize(true);
            cc.eventManager.addListener(this.setTextClick(null, null, null, callback), node.getChildByName("text"));
        }else {
            node.getChildByName("text").ignoreContentAdaptWithSize(true);
            cc.eventManager.addListener(this.setTextClick(), node.getChildByName("text"));
        }
    },

    //创建房间 点击范围扩大 使得文字也能点击
    setTextClick: function(listnode, number, radio, callback) {
        var that = this;
        var _callback = callback || function(){};
        var selectColor = MjClient.createRoomNode._selectColor;
        var unSelectColor = MjClient.createRoomNode._unSelectColor;

        return cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function(touch, event) {
                if(radio) radio.childIsMove = false;
                var target = event.getCurrentTarget();
                var parent = target;
                for (; parent; parent = parent.parent) {
                    if (!parent.visible)
                        return false;
                }

                var pos = target.getParent().convertTouchToNodeSpace(touch); // 世界坐标转换 (子节点相对于父节点的位置)

                // 如果触碰起始地点在本区域中
                var box = target.getBoundingBox();
                box.width += 10;
                box.height += 10;
                box.x -= 10;
                box.y -= 10;
                if (!cc.rectContainsPoint(box, pos)) {
                    return false;
                }
                return true;
            },
            onTouchMoved: function (touch, event) {
                if(radio) radio.childIsMove = true;
            },
            onTouchEnded: function(touch, event) {
                if(radio && radio.childIsMove) return;   // 如果复选框的子节点（文字或者图片）被滑动，则阻止事件触发
                var target = event.getCurrentTarget();
                if (!target.parent.isEnabled()) return;
                var pos = target.getParent().convertTouchToNodeSpace(touch); // 世界坐标转换 (子节点相对于父节点的位置)
                if (listnode) {
                    for (var i = 0; i < listnode.length; i++) {
                        if (i == number) {
                            listnode[i].setSelected(true);
                            var txt = listnode[i].getChildByName("text");
                            txt.setTextColor(selectColor);
                            txt.ignoreContentAdaptWithSize(true);
                            radio.selectItem(i);
                        } else {
                            listnode[i].setSelected(false);
                            var txt = listnode[i].getChildByName("text");
                            txt.setTextColor(unSelectColor);
                            txt.ignoreContentAdaptWithSize(true);
                        }
                    }
                    //this._playNode_round_radio  this._playNode_payway_radio
                    if ((radio == that._playNode_round_radio) || (radio == that._playNode_payway_radio)) {
                        cc.log(" ====== that.bg_node,", that.bg_node)
                        that.setDiaNumData(that.bg_node);
                    }


                } else {
                    // 如果触碰起始地点在本区域中
                    if (!cc.rectContainsPoint(target.getBoundingBox(), pos))
                        return;

                    target.parent.setSelected(!target.parent.isSelected());

                    var txt = target.parent.getChildByName("text");
                    txt.ignoreContentAdaptWithSize(true);
                    if (txt && target.parent.isSelected()) {
                        txt.setTextColor(selectColor);
                    } else {
                        txt.setTextColor(unSelectColor);
                    }
                }

                _callback(number, target.parent);

            }
        });
    },


    resetBtnCreateDiamond: function(btn, costMoney,diamondNumNode) {
        //俱乐部玩家自主创房 并且是房卡模式时 不显示元宝消耗
        if (this._isRoomCardMode && this._clubIsCreateRoom) {
            btn.loadTextureNormal("createNewPng/btn_create_n.png");
            btn.loadTexturePressed("createNewPng/btn_create_s.png");
            btn.setAnchorPoint(1,0.5)
            var oldWidth = btn.width;
            btn.width = 199
            btn.x = btn.getParent().width*0.95;
            if(diamondNumNode) diamondNumNode.visible = false;
            return;
        }

        if (this.isUseUIV3)
            return;

        if (isJinZhongAPPType() ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
            MjClient.getAppType() === MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )
        {
            btn.loadTextureNormal("createNewPng/btn_create_n_diamond.png");
        } else if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            btn.loadTextureNormal("ui/createRoom/create_n.png");
            btn.loadTexturePressed("ui/createRoom/create_s.png");
        } else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType()) {
            btn.loadTextureNormal("createNewPng/btn_create_n_diamond.png");
        }else if (costMoney == 0) {
            btn.loadTextureNormal("createNewPng/btn_create_n_diamond_free.png");
        }else {
            btn.loadTextureNormal("createNewPng/btn_create_n_diamond.png");
        }
    },
    updateClubTagIcon: function() {
        //设置亲友圈代付的ICON
        var ClubTag = 111;
        var _roundNode = this._scroll_round || this.bg_node.getChildByName("round");
        var _payWay1 = _roundNode.getChildByName("payWay_1");
        var _payWay2 = _roundNode.getChildByName("payWay_2");
        var _payWay3 = _roundNode.getChildByName("payWay_3");
        if (this._isFriendCard) {
            var _text = _payWay1.getChildByName("text");
            _text.setString("群主付");
        }

        var _btnDiamondNode = this.bg_node.getChildByName("btn_create_diamond");
        // 岳阳选项内容滑动，加在view下，创建房间，保存规则在上一层
        if(!_btnDiamondNode)
        {
            _btnDiamondNode = this.bg_node.getParent().getChildByName("btn_create_diamond");
        }

        //if(_payWay1.isSelected() || _payWay2.isSelected())
        {

            if (_btnDiamondNode.getChildByTag(ClubTag)) {
                var tagNode = _btnDiamondNode.getChildByTag(ClubTag);
                tagNode.visible = false;
                cc.log("===========_btnDiamondNode============");
                _btnDiamondNode.removeChildByTag(ClubTag);
            }
        }
    },
    selectPay: function(roundNumObj,str_type, str_pay) {
        //var _text4 = this._text4;
        //var _text4_0 = this._text4_0;
        //var _text8 = this._text8;
        //var _text8_0 = this._text8_0;
        //var _text16 = this._text16;
        //var _text16_0 = this._text16_0;
        //if (str_type == MjClient.GAME_TYPE.LIAN_YUN_GANG || str_type == MjClient.GAME_TYPE.XU_ZHOU) {
        //    _text4.setString("2圈");
        //    _text4_0 && _text4_0.setString("(" + str_pay[0] + "元宝)");
        //    _text8.setString(roundNumObj[1] + "局");
        //    _text8_0 && _text8_0.setString("(" + str_pay[1] + "元宝)");
        //    _text16.setString(roundNumObj[2] + "局");
        //    _text16_0 && _text16_0.setString("(" + str_pay[2] + "元宝)");
        //} else {
        //    if (_text4_0 || _text16_0 || _text8_0) {
        //        _text4.setString(roundNumObj[0] + "局");
        //        _text4_0 && _text4_0.setString("(" + str_pay[0] + "元宝)");
        //        _text8.setString(roundNumObj[1] + "局");
        //        _text8_0 && _text8_0.setString("(" + str_pay[1] + "元宝)");
        //        _text16.setString(roundNumObj[2] + "局");
        //        _text16_0 && _text16_0.setString("(" + str_pay[2] + "元宝)");
        //    } else {
        //        _text4.setString(roundNumObj[0] + "局(" + str_pay[0] + "元宝)");
        //        _text8.setString(roundNumObj[1] + "局(" + str_pay[1] + "元宝)");
        //        _text16.setString(roundNumObj[2] + "局(" + str_pay[2] + "元宝)");
        //    }
        //}


        for (var i=0; i<this.roundNodeArray.length; i++)
        {
            var roundNode = this.roundNodeArray[i];
            if (cc.sys.isObjectValid(roundNode) )
            {
                if(! roundNumObj[i] || !str_pay || (str_pay[i] && str_pay[i]<0)) {
                    roundNode.visible = false;

                    cc.log('warn 局数按钮隐藏 selectPay no roundNumObj', roundNumObj, i, str_pay)
                    continue;
                }

                var text = roundNode.getChildByName("text");
                var text_0 = roundNode.getChildByName("text_0");
                if (text_0) {
                    if (roundNumObj[i]== 9999)
                    {
                        text.setString("100锅");
                        text_0.setString("(" + str_pay[i] + this._costName + ")");
                    }
                    else {
                        text.setString(roundNumObj[i] + "局");
                        text_0.setString("(" + str_pay[i] + this._costName + ")");
                    }
                    if (roundNumObj[i].indexOf("quan") >= 0)
                    {
                        text.setString(roundNumObj[i]);
                        text.setString(text.getString().replace("quan", "圈"));
                    }
                    if(this._isRoomCardMode){
                        text_0.visible = false;
                    }
                }
                else {
                    if(this._isRoomCardMode){
                        text.setString(roundNumObj[i] + "局");
                    }else{
                        text.setString(roundNumObj[i] + "局(" + str_pay[i] + this._costName + ")");
                    }
                    if (roundNumObj[i].indexOf("quan") >= 0) {
                        if(this._isRoomCardMode){
                            text.setString(roundNumObj[i] + "");
                        }else{
                            text.setString(roundNumObj[i] + "(" + str_pay[i] + this._costName + ")");
                        }
                        text.setString(text.getString().replace("quan", "圈"));
                    }
                }
            }
        }
    },
    setDiaNumData: function(gameNode) {
        var pPriceCfg = this.getPriceCfg();
        if(!pPriceCfg) return false;

        // var roundNumObj = Object.keys(pPriceCfg).sort(function(a,b){return a-b});

        var roundNumObj = this.getRoundNumObj();

        var totalPayWayArray = [];
        for (var i=0; i<this.payWayNodeArray.length; i++)
        {
            var payWayArr = [];
            for (var j in roundNumObj)
            {
                var __roundNum = roundNumObj[j];
                var __payWay = pPriceCfg[__roundNum];
                if( __payWay[i] || __payWay[i] == 0) payWayArr.push(__payWay[i]);
            }
            if(payWayArr.length > 0)
                totalPayWayArray.push(payWayArr);
        }


        var _btn_create_diamond = gameNode.getChildByName("btn_create_diamond");
        if(!_btn_create_diamond)
        {
            // 岳阳选项内容滑动，加在view下，创建房间，保存规则在上一层
            _btn_create_diamond = this.bg_node.getParent().getChildByName("btn_create_diamond");
        }
        var _roundNode = this._scroll_round || gameNode.getChildByName("round");
        var _diamondNumNode = _btn_create_diamond.getChildByName("dia_num");


        for (var i=0; i<this.roundNodeArray.length; i++)
        {
            var roundNode = this.roundNodeArray[i];
            if (cc.sys.isObjectValid(roundNode))
            {
                var text = roundNode.getChildByName("text");
                text && text.ignoreContentAdaptWithSize(true);
                var text_0 = roundNode.getChildByName("text_0");
                text_0 && text_0.ignoreContentAdaptWithSize(true);
            }
        }
        cc.log("===========================:"+totalPayWayArray)
        for (var i=0; i<this.payWayNodeArray.length; i++)
        {
            var payWayNode = this.payWayNodeArray[i];
            if (cc.sys.isObjectValid(payWayNode) && payWayNode.isSelected())
            {
                    this.selectPay(roundNumObj, this._data.gameType, totalPayWayArray[i]);

            } else if(cc.sys.isObjectValid(payWayNode) && !totalPayWayArray[i] ){
                payWayNode.visible = false;
                cc.log('warn 房费按钮隐藏 setDiaNumData no payWay', totalPayWayArray, i);
            }
        }

        for (var i=0; i<this.roundNodeArray.length; i++)
        {
            var roundNode = this.roundNodeArray[i];
            if (cc.sys.isObjectValid(roundNode) && roundNode.isSelected())
            {
                this.selectRound( totalPayWayArray, i, _diamondNumNode,_btn_create_diamond);
            }
        }

    },
    selectRound: function(totalPayWayArray, index, diamondNumNode, btn_create_diamond) {
        //if (node1.isSelected()) {
        //    _diamondNumNode.setString("" + pay1);
        //    this.resetBtnCreateDiamond(_btn_create_diamond, pay1);
        //} else if (node2.isSelected()) {
        //    _diamondNumNode.setString("" + pay2);
        //    this.resetBtnCreateDiamond(_btn_create_diamond, pay2);
        //} else if (node3.isSelected()) {
        //    _diamondNumNode.setString("" + pay3);
        //    this.resetBtnCreateDiamond(_btn_create_diamond, pay3);
        //}
        var roundNumObj = this.getRoundNumObj();
        var roundOneIndex = -1;
        if(roundNumObj){
            roundOneIndex = roundNumObj.indexOf("1");
        }
        this.setRoomCardFreeFeeVisible(roundOneIndex != index);
        if(this.setRoomCardPayModeFen && this.roomCardPayMode_radio){
            //更新房费
            this.setRoomCardPayModeFen(this.roomCardPayMode_radio.getSelectIndex());
        }
        if(this.setPayNodeIsShow && this.setPayNodeIsShow){
            //更新加收是否可见
            this.setPayNodeIsShow(this.roomCardPayMode_radio.getSelectIndex());
        }
        for (var i=0; i<this.payWayNodeArray.length; i++)
        {
            var node = this.payWayNodeArray[i];
            if (cc.sys.isObjectValid(node) && node.isSelected() && totalPayWayArray[i])
            {
                diamondNumNode.ignoreContentAdaptWithSize(true);
                diamondNumNode.setString("" + totalPayWayArray[i][index]);

                this.resetBtnCreateDiamond(btn_create_diamond, totalPayWayArray[i][index],diamondNumNode);
            }
            if( ! totalPayWayArray[i] ) {
                cc.log('warn selectRound no pay way ', JSON.stringify(totalPayWayArray), i)
            }
        }
    },
    clubCreateRoom:function()
    {
        var clubId = this._data.clubId;
        var ruleId = this._data.ruleId;
        var para = this.getSelectedPara();
        var that = this;
        MjClient.block();
        cc.log("clubCreateRoom sendInfo",JSON.stringify(para))
        MjClient.gamenet.request("pkclub.handler.createCustomRoom", {
            clubId: clubId,
            ruleId: ruleId,
            rule: para,
            area: {longitude:MjClient.native.GetLongitudePos(), latitude:MjClient.native.GetLatitudePos()},
        }, function(rtn) {
            MjClient.unblock();
            if (rtn.code == 0) {
                if (that.parentLayer)
                    that.parentLayer.removeFromParent();
                MjClient.joinGame(rtn.data, null, false, para.gameType);
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
            MjClient.unblock();
        });
    },

    selectedCB: function(text, isSelected) {
        if (isSelected) {
            text.setTextColor(MjClient.createRoomNode._selectColor);
        } else {
            text.setTextColor(MjClient.createRoomNode._unSelectColor);
        }

    },
    clickCB: function(sender, type) {
        switch (type) {
            case ccui.CheckBox.EVENT_SELECTED:
            case ccui.CheckBox.EVENT_UNSELECTED:
                var txt = sender.getChildByName("text");
                if (sender.isSelected()) {
                    txt.setTextColor(MjClient.createRoomNode._selectColor);
                } else {
                    txt.setTextColor(MjClient.createRoomNode._unSelectColor);
                }
                break;
        }
    },
    _clickCB: function(sender, type) {
        MjClient.createRoomNode.clickCB(sender, type);
    },
    changePayForPlayerNum:function(select_number)
    {
        if (select_number != null) {
            MjClient.MaxPlayerNum = 4 - select_number;
        }
        cc.log("create select_numberselect_numberselect_number -- by sking");
        this.setDiaNumData(this.bg_node);
    },
    getPrice: function(gameType, maxPlayer, roundNum, payWay) {
        // cc.log("MjClient.data.gamePrice@@ " + JSON.stringify(MjClient.data.gamePrice));
        // cc.log("arguments@@ " + JSON.stringify(arguments));
        if(!MjClient.data.gamePrice[gameType][maxPlayer][roundNum]){
            return 0;
        }
        return MjClient.data.gamePrice[gameType][maxPlayer][roundNum][payWay];
    },
    updateSelectDiaNum: function() {  // 更新选定选项的建房消耗元宝
        var time = new Date().getTime();
        // todo getSelectedPara比较耗时
        var time2 = new Date().getTime();
        //cc.log("getSelectedPara消耗时间@@ " + (time2 - time));
        var gameType = this._data.gameType; // para.gameType;
        var maxPlayer = this.getSelectPlayNum(); // para.maxPlayer;
        var roundNum = this.getSelectedRoundNum();
        var payWay = this.getSelectedPayWay();
        var price = this.getPrice(gameType, maxPlayer, roundNum, payWay);

        var _btn_create_diamond = this.bg_node.getChildByName("btn_create_diamond");
        if (!_btn_create_diamond) {
            _btn_create_diamond = this.bg_node.getParent().getChildByName("btn_create_diamond");
        }
        var dia_num = _btn_create_diamond.getChildByName("dia_num");
        dia_num.ignoreContentAdaptWithSize(true);
        dia_num.setString("" + price);
        this.resetBtnCreateDiamond(_btn_create_diamond, price);
        if (this.setLevelText)
            this.setLevelText();
    },
    createRoom: function() {
        var para = this.getSelectedPara();
        util.localStorageEncrypt.setNumberItem("KEY_GAME_TYPE", para.gameType);
        this.saveSelectedRoundNum();
        MjClient.createRoom(para, this.getSelectedRoundNum(), this.getSelectedPayWay());
        if (this.parentLayer)
            this.parentLayer.removeFromParent();
    },
    retainRule: function() {//俱乐部保存规则
        var para = this.getSelectedPara();
        var selectNumber = this._data.ruleNumer;
        util.localStorageEncrypt.setNumberItem("KEY_GAME_TYPE", para.gameType);

        if (this._textInput && this._textInput.getString() != "") {
            var _txt = FriendCard_Common.strReplace(this._textInput.getString());
            _txt = "(" + _txt + ")" + GameCnName[this._data.gameType];
            para.ruleName = escape(_txt);
        } else {
            para.ruleName = escape(GameCnName[this._data.gameType]);
        }
        if (this._isMatchMode) {
            para.isMatchLimit = this._matchModeLimitScoreRadio.getSelectIndex();
            para.matchLimitScore = this._matchModeLimitScoreEdt.value;
           
            if (FriendCard_Common.isOpenMatchDissolveLimit(this._data.gameType)) {
                para.isMatchDissolveLimit = this._matchModeEndGameScoreRadio.getSelectIndex();
                para.matchDissolveLimitScore = this._matchModeEndGameScoreEdt.value;
                if(FriendCard_Common.isOpenMatchScoreNeedEnough(this._data.gameType)){
                    para.scoreNeedEnough = (this._checkBox_not_zone_score.visible && this._checkBox_not_zone_score.isSelected()) ? 1 : 0;
                }else{
                    para.scoreNeedEnough = 0;
                }
            }
        }
        if(this._isAntiAddictionMode){
            para.isAntiAddictionLimit = this._setTiLiData.isAntiAddictionLimit;
            para.isAntiAddictionDissolveLimit = this._setTiLiData.isAntiAddictionDissolveLimit;
            para.isXipaiLedou = this._setTiLiData.isXipaiLedou = 1;                
            para.antiAddictionScoreNeedEnough = this._setTiLiData.antiAddictionScoreNeedEnough;


            para.xipaiLedou = this._setTiLiData.xipaiLedou;
            para.antiAddictionLimitScore = this._setTiLiData.antiAddictionLimitScore;
            para.antiAddictionDissolveLimitScore = this._setTiLiData.antiAddictionDissolveLimitScore;
            para.scoreExpendMode = this._setTiLiData.scoreExpendMode;
            para.shareCostWhenManyWinner = this._setTiLiData.shareCostWhenManyWinner;
            para.isFixRate = this._setTiLiData.isFixRate;
            para.maxRate = this._setTiLiData.maxRate;

            para.commissionBottomScore = this._setTiLiData.commissionBottomScore;
            para.commissionBottomScore2 = this._setTiLiData.commissionBottomScore2;
            para.commissionBottomScore3 = this._setTiLiData.commissionBottomScore3;
            para.commissionBottomScore4 = this._setTiLiData.commissionBottomScore4;
            para.commissionBottomScore5 = this._setTiLiData.commissionBottomScore5;
            para.commissionBottomScore6 = this._setTiLiData.commissionBottomScore6;

            para.commissionRate = this._setTiLiData.commissionRate;
            para.commissionRate2 = this._setTiLiData.commissionRate2;
            para.commissionRate3 = this._setTiLiData.commissionRate3;
            para.commissionRate4 = this._setTiLiData.commissionRate4;
            para.commissionRate5 = this._setTiLiData.commissionRate5;
            para.commissionRate6 = this._setTiLiData.commissionRate6;

            para.isMinGuaranteeFixRate = this._setTiLiData.isMinGuaranteeFixRate;
            para.minGuaranteeScore = this._setTiLiData.minGuaranteeScore;
            para.minGuaranteeScore2 = this._setTiLiData.minGuaranteeScore2;
            para.minGuaranteeScore3 = this._setTiLiData.minGuaranteeScore3;
            para.minGuaranteeScore4 = this._setTiLiData.minGuaranteeScore4;
            para.minGuaranteeScore5 = this._setTiLiData.minGuaranteeScore5;
            para.minGuaranteeScore6 = this._setTiLiData.minGuaranteeScore6;

            para.minGuaranteeRate = this._setTiLiData.minGuaranteeRate;
            para.minGuaranteeRate2 = this._setTiLiData.minGuaranteeRate2;
            para.minGuaranteeRate3 = this._setTiLiData.minGuaranteeRate3;
            para.minGuaranteeRate4 = this._setTiLiData.minGuaranteeRate4;
            para.minGuaranteeRate5 = this._setTiLiData.minGuaranteeRate5;
            para.minGuaranteeRate6 = this._setTiLiData.minGuaranteeRate6;



            // if (FriendCard_Common.isOpenAntiAddictionDissolveLimit(this._data.gameType)) {
            //     para.isAntiAddictionDissolveLimit = this._matchModeEndGameScoreRadio.getSelectIndex();
            //     para.antiAddictionDissolveLimitScore = this._matchModeEndGameScoreEdt.value;
            //     if(FriendCard_Common.isOpenAntiAddictionDissolveLimit(this._data.gameType)){
            //         para.antiAddictionScoreNeedEnough = (this._checkBox_not_zone_score.visible && this._checkBox_not_zone_score.isSelected()) ? 1 : 0;
            //     }else{
            //         para.antiAddictionScoreNeedEnough = 0;
            //     }
            // }

            // para.isCommissionBottom = this._matchModeCommissionBottomeRadio.getSelectIndex();
            // para.commissionBottomScore = this._matchModeCommissionBottomNodeScoreEdt.value;
            // para.commissionBottomScore2 = this._matchModeCommissionBottomNodeScoreEdt.value * 2;
            // para.commissionBottomScore3 = this._matchModeCommissionBottomNodeScoreEdt.value * 3;


            // para.isFixRate = this._matchModeCommissionRateRadio.getSelectIndex();
            // para.commissionRate = this._matchModeCommissionRateNodeScoreEdt.value;
            // para.commissionRate2 = this._matchModeCommissionRateNodeScoreEdt.value * 2;
            // para.commissionRate3 = this._matchModeCommissionRateNodeScoreEdt.value * 3;

            // //当出现多个大赢家时，是否平分房费
            // para.shareCostWhenManyWinner = 1;

            //每个玩游戏的玩家都要消耗的房费

            cc.log("para:", para.commissionBottomScore);
            cc.log("para:", para.commissionBottomScore2);
            cc.log("para:", para.commissionBottomScore3);
            cc.log("para:", para.commissionBottomScore);
            cc.log("para:", para.commissionBottomScore2);
            cc.log("para:", para.commissionBottomScore3);
            cc.log("para:", para.isFixRate);
            cc.log("para:", para.commissionRate);

            if(para.isFixRate){
                if(para.commissionRate > para.commissionBottomScore){
                    MjClient.showToast("固定贡献时贡献分数不能大于最低贡献分数");
                    if (this.parentLayer)
                        this.parentLayer.removeFromParent();
                    return;
                }
                if(para.commissionRate2 > para.commissionBottomScore2){
                    MjClient.showToast("固定贡献时贡献分数不能大于最低贡献分数2");
                    if (this.parentLayer)
                        this.parentLayer.removeFromParent();
                    return;
                }
                if(para.commissionRate3 > para.commissionBottomScore3){
                    MjClient.showToast("固定贡献时贡献分数不能大于最低贡献分数3");
                    if (this.parentLayer)
                        this.parentLayer.removeFromParent();
                    return;
                }
                if(para.commissionRate4 > para.commissionBottomScore4){
                    MjClient.showToast("固定贡献时贡献分数不能大于最低贡献分数4");
                    if (this.parentLayer)
                        this.parentLayer.removeFromParent();
                    return;
                }
                if(para.commissionRate5 > para.commissionBottomScore5){
                    MjClient.showToast("固定贡献时贡献分数不能大于最低贡献分数5");
                    if (this.parentLayer)
                        this.parentLayer.removeFromParent();
                    return;
                }
                if(para.commissionRate6 > para.commissionBottomScore6){
                    MjClient.showToast("固定贡献时贡献分数不能大于最低贡献分数6");
                    if (this.parentLayer)
                        this.parentLayer.removeFromParent();
                    return;
                }
            }
            else{
                if(para.commissionRate > 100 || para.commissionRate2 > 100 || para.commissionRate3 > 100 || para.commissionRate4 > 100 || para.commissionRate5 > 100 || para.commissionRate6 > 100){
                    MjClient.showToast("比例贡献时贡献比例不能大于100");
                    if (this.parentLayer)
                        this.parentLayer.removeFromParent();
                    return;
                }
            }
        }

        para.round = this.getSelectedRoundNum();
        if (this._isRoomCardMode) {
            para.fangkaSource = this.roomCardPayMode_radio.getSelectIndex() + 1;
            para.fangkaCount = this._roomCardPayModeFen.value;
            if (this.difenMianKou.isSelected() && this.difenMianKou.visible) {
                para.fangkaFree = this.difenMianKou.value;
                para.isMianKouJiaShi = this.difenMianKou.mianKouJiaShi.isSelected();
            } else {
                para.fangkaFree = 0
                para.isMianKouJiaShi = false;
            }
            

            if ( this.roomCardPayMode_radio.getSelectIndex() == 2) {//选中AA
                para.fangkaExtra = (this._roomCardAAPayNode.isVisible() && this.winnerAdded.isSelected()) ? this.winnerAdded.value : 0;
            } else {//没选中AA
                para.fangkaExtra = this.winnerPayNodes_radio.getSelectIndex();
            }
        }else{
            para.payWay = this.getSelectedPayWay();
        }

        //桌子皮肤
        var tableBoardCfg;
        if(MjClient.RuleParam["rule" + selectNumber])
        {
            tableBoardCfg = MjClient.RuleParam["rule" + selectNumber].tableBoardCfg;
        }
        else
        {
            tableBoardCfg = 0;
        }
        para.tableBoardCfg = tableBoardCfg ? tableBoardCfg : 0;

        //晋中防作弊
        if (isJinZhongAPPType())
        {
            if (this.customInfo) {
                para.customInfo = this.customInfo.isSelected(); //玩法是否可以玩家自主创房
            }
            if(this._playNode_gps){
                para.isFangzuobi = this._playNode_gps.isSelected();
            }
            else
            {
                var temp_play = this.getNodePlayAndRound().playPanel;
                if(temp_play && temp_play.getChildByName("play_gps"))
                    para.isFangzuobi = temp_play.getChildByName("play_gps").isSelected();
                else if(this.bg_node.getChildByName("play_way") && this.bg_node.getChildByName("play_way").getChildByName("play_gps"))
                    para.isFangzuobi = this.bg_node.getChildByName("play_way").getChildByName("play_gps").isSelected();
                else
                    para.isFangzuobi = false; 
            }
            

        }
        para.isFriendCard = true; // 把牌友圈信息标识带进去
        MjClient.RuleParam["rule" + selectNumber] = para;
        MjClient.gameType = para.gameType;
        cc.log(" ====== 选择的玩法是 ： ", selectNumber,JSON.stringify(para))
        // postEvent("retainRule"); 这个会和下面的高防冲突
        if (MjClient.FriendCard_infoUI) {
            if(MjClient.FriendCard_infoUI._data){
                MjClient.FriendCard_infoUI.onAchieve(selectNumber); // selectNumber 参数 区分是保存并提交
            }else{
                if(MjClient.FriendCard_infoUI.updateWanfa){
                    MjClient.FriendCard_infoUI.updateWanfa();
                }
            }
        }

        if(MjClient.FriendCard_ruleLayer){
            MjClient.FriendCard_ruleLayer.reqChange(selectNumber)
        }
        if(MjClient.FriendCard_Match_ruleLayer){
            MjClient.FriendCard_Match_ruleLayer.reqChange(selectNumber)
        }

        if (this.parentLayer)
            this.parentLayer.removeFromParent();
    },
    deleteRule:function(){
        var selectNumber = this._data.ruleNumer;
        MjClient.RuleParam["rule" + selectNumber] = "delete";
        if (MjClient.FriendCard_infoUI) {
            if(MjClient.FriendCard_infoUI._data){
                MjClient.FriendCard_infoUI.onAchieve(selectNumber); // selectNumber 参数 区分是保存并提交
            }else{
                if(MjClient.FriendCard_infoUI.updateWanfa){
                    MjClient.FriendCard_infoUI.updateWanfa();
                }
            }
        }
        if(MjClient.FriendCard_ruleLayer){
            MjClient.FriendCard_ruleLayer.reqChange(selectNumber)
        }
        if(MjClient.FriendCard_Match_ruleLayer){
            MjClient.FriendCard_Match_ruleLayer.reqChange(selectNumber)
        }
        if (this.parentLayer)
            this.parentLayer.removeFromParent();
    },
    getSelectedPara: function() {

    },
    getSelectedRoundNum: function() {
        //局数

        // var _gameType = this._data.gameType;
        // var _maxPlayer = this.getSelectPlayNum();//this.getSelectedPara().maxPlayer;
        // var roundNumObj = Object.keys(MjClient.data.gamePrice[_gameType][_maxPlayer]).sort(function(a,b){return a-b});

        var roundNumObj = this.getRoundNumObj();
        var roundNum = roundNumObj[0];

        for (var i=0; i<this.roundNodeArray.length; i++)
        {
            var roundNode = this.roundNodeArray[i];
            if (cc.sys.isObjectValid(roundNode) && roundNode.isSelected())
            {
                roundNum = roundNumObj[i];
                // util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_RondType, i+1);
                break;
            }
        }

        cc.log('ssssssssss:'+JSON.stringify(roundNum))

        return roundNum;
    },

    saveSelectedRoundNum: function() {
        //局数
        for (var i=0; i<this.roundNodeArray.length; i++)
        {
            var roundNode = this.roundNodeArray[i];
            if (cc.sys.isObjectValid(roundNode) && roundNode.isSelected())
            {
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_RondType, i+1);
                break;
            }
        }
    },

    getSelectedPayWay: function() {
        //付房卡的方式
        var payWay = 0;
        //payWay = this.payWayNode_1.isSelected() == true ? 0 : (this.payWayNode_2.isSelected() == true ? 1 : 2);
        //util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PayWay, payWay);


        for (var i=0; i<this.payWayNodeArray.length; i++)
        {
            var payWayNode = this.payWayNodeArray[i];
            if (cc.sys.isObjectValid(payWayNode) && payWayNode.isSelected())
            {
                payWay = i;
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PayWay, payWay);
            }
        }

        return payWay;
    },
    radioBoxSelectCB: function(index, sender, list) {
        if (sender) {
            var selectColor = MjClient.createRoomNode._selectColor;
            var unSelectColor = MjClient.createRoomNode._unSelectColor;
            var txt = sender.getChildByName("text");
            txt.ignoreContentAdaptWithSize(true);
            txt.setTextColor(selectColor);
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var radioBox = list[i];

                if (radioBox !== sender || sender.isSelected() == false) {
                    txt = radioBox.getChildByName("text");
                    txt.ignoreContentAdaptWithSize(true);
                    txt.setTextColor(unSelectColor);
                }
            }
        }
    },
    getPriceCfg:function()
    {
        var pGameType = this._data.gameType;
        var pMaxPlayer = this.getSelectPlayNum();//this.getSelectedPara().maxPlayer;
        var pPriceCfg = MjClient.data.gamePrice;
        if(!pPriceCfg[pGameType] || !pPriceCfg[pGameType][pMaxPlayer]) {
            var tipStr = '';
            if(!pPriceCfg[pGameType]) tipStr = '服务器没有' + pGameType + '的价格配置';
            if(pPriceCfg[pGameType]) tipStr = '服务器没有' + pGameType + '的' + pMaxPlayer + '人价格配置'
            var gamePriceCfg = JSON.stringify(pPriceCfg[pGameType] || {});
            tipStr += '\n' + gamePriceCfg;
            MjClient.showMsg(tipStr)
            cc.log('error setDiaNumData no cfg:', pGameType, gamePriceCfg);
            return false;
        } else {
            return pPriceCfg[pGameType][pMaxPlayer];
        }
    },
    //added by zhenggang
    radioTextColor: function(textNode, isSelect){
        if(isSelect){
            textNode.setTextColor(MjClient.createRoomNode._selectColor);
        }else{
            textNode.setTextColor(MjClient.createRoomNode._unSelectColor);
        }
    },

    // 以下为通用选项
    setExtraKey:function(keysObj) {
        for (var key in keysObj) {
            this.localStorageKey[key] = keysObj[key];
        }
    },
    initExtraPlayNode:function(_playWay)
    {
        // 大结算翻倍
        if (_playWay.getChildByName("play_nofanbei")) {
            var nodeListFanBei = [];
            nodeListFanBei.push(_playWay.getChildByName("play_nofanbei"));
            nodeListFanBei.push(_playWay.getChildByName("play_lessthan"));
            var sanBei = _playWay.getChildByName("play_less5SanBei")
            if (sanBei) nodeListFanBei.push(sanBei);
            this.fanbei_radio = createRadioBoxForCheckBoxs(nodeListFanBei, this.fanBeiRadioBoxSelectCB.bind(this));
            var that = this;
            this.addListenerText(nodeListFanBei, this.fanbei_radio, function (index,sender) {
                that.fanBeiRadioBoxSelectCB(index, sender,nodeListFanBei);
            });
            this.nodeListFanBei = nodeListFanBei;

            var maxScoreLimited = 100;
            if (this._data.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA) {
                maxScoreLimited = 10000;
            }

            var subButton = nodeListFanBei[1].getChildByName("btn_sub");
            var addButton = nodeListFanBei[1].getChildByName("btn_add");
            var scoreLabel = nodeListFanBei[1].getChildByName("score");
            subButton.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var labelString = scoreLabel.getString();

                    if (labelString == "不限分") {
                        var curScore = 100;
                    } else {
                        var curScore = parseInt(labelString);

                        curScore -= 5;
                        if (curScore < 10) {
                            curScore = maxScoreLimited;
                        } 
                    }

                    scoreLabel.setString(curScore <= 100 ? curScore + "分" : "不限分");
                }
            }, this);

            addButton.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var labelString = scoreLabel.getString();

                    if (labelString == "不限分") {
                        var curScore = 10;
                    } else {
                        var curScore = parseInt(labelString);

                        curScore += 5;
                        if (curScore > 100) {
                            curScore = maxScoreLimited <= 100 ? 10 : maxScoreLimited;
                        }
                    }

                    scoreLabel.setString(curScore <= 100 ? curScore + "分" : "不限分");
                }
            }, this);
        }


        //托管
        if (_playWay.getChildByName("tuoguan0")) {
            var tuoguanNodeList = [];
            tuoguanNodeList.push(_playWay.getChildByName("tuoguan0"));
            tuoguanNodeList.push(_playWay.getChildByName("tuoguan1"));
            tuoguanNodeList.push(_playWay.getChildByName("tuoguan2"));
            tuoguanNodeList.push(_playWay.getChildByName("tuoguan3"));


            var tuoguan4 = _playWay.getChildByName("tuoguan4");
            if (tuoguan4)
                tuoguanNodeList.push(tuoguan4);

            this.tuoguanNodeList = tuoguanNodeList;

            var playNode_player_tuoguan_radio = createRadioBoxForCheckBoxs(tuoguanNodeList,function(index){
                this.radioBoxSelectCB(index, tuoguanNodeList[index], tuoguanNodeList);
                this.refreshTrustWays(index,false);
            }.bind(this));
            this.addListenerText(tuoguanNodeList,playNode_player_tuoguan_radio,function(index) {
                this.refreshTrustWays(index,false);
            }.bind(this));

            var btn_tuoguanTip = _playWay.getChildByName("btn_tuoguanTip");
            var image_tuoguanTip = _playWay.getChildByName("image_tuoguanTip");
            btn_tuoguanTip.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    image_tuoguanTip.setVisible(true);
                }
            }, btn_tuoguanTip);
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: false,
                status: null,
                onTouchBegan: function(touch, event) {
                    if (image_tuoguanTip.isVisible()) {
                        image_tuoguanTip.setVisible(false);
                        return true;
                    } else {
                        return false;
                    }
                },
            }, image_tuoguanTip);


            // 托管方式相关
            var trustWay_1 = _playWay.getChildByName("trustWay_1");
            if (trustWay_1) {
                var trustWayNodeList = [];
                trustWayNodeList.push(trustWay_1);
                trustWayNodeList.push(_playWay.getChildByName("trustWay_2"));
                trustWayNodeList.push(_playWay.getChildByName("trustWay_3"));

                this.trustWayNodeList = trustWayNodeList;
                this.trustWayRadio = createRadioBoxForCheckBoxs(trustWayNodeList,this.radioBoxSelectCB);
                this.addListenerText(trustWayNodeList,this.trustWayRadio);
            }
        }

        //积分底分
        var i = 4;
        var jieSuanDiFenParent = _playWay;
        while(i >= 0){
            this.jieSuanDiFen = jieSuanDiFenParent.getChildByName("jieSuanDiFen");
            if(this.jieSuanDiFen){
                break;
            }
            jieSuanDiFenParent = jieSuanDiFenParent.getParent();
            if(!jieSuanDiFenParent){
                break;
            }
            i--;
        }
        
        if(this.jieSuanDiFen){
            var text_diFen = this.jieSuanDiFen.getChildByName("text_diFen");
            var btn_sub = this.jieSuanDiFen.getChildByName("btn_sub");
            var btn_add = this.jieSuanDiFen.getChildByName("btn_add");
            // var mask = 1;
            // if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
            //     MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
            //     mask = 0.5;

            if (!this.difenAry) this.difenAry = [1,2,3,4,5,6,7,8,9,10];
            this.difenIndex = 0;
            var _this = this;
            btn_sub.addClickEventListener(function (btn) {
                // var diFen = Number(text_diFen.getString());
                // if (diFen == mask) {
                //     diFen = 11;
                // }
                // if (diFen > mask) {
                //     if (mask == 1)
                //     diFen--;
                //     else//0.5
                //     diFen = diFen == 1 ? 0.5:(diFen-1);
                //     text_diFen.setString(diFen);
                // }

                _this.difenIndex--;
                if (_this.difenIndex < 0)_this.difenIndex = _this.difenAry.length -1;
                text_diFen.setString(_this.difenAry[_this.difenIndex]);
                _this.setRoomCardModeFree();

            });
            btn_add.addClickEventListener(function (btn) {
                // var diFen = Number(text_diFen.getString());

                // if (diFen == 10) {
                //     diFen = 0;
                // }
                // if (diFen < 10) {
                //     if (mask == 1)
                //     diFen++;
                //     else
                //     diFen = (diFen<1)? (diFen+0.5): (diFen+1);
                //     text_diFen.setString(diFen);
                // }

                _this.difenIndex++;
                if (_this.difenIndex > _this.difenAry.length -1)_this.difenIndex = 0;
                text_diFen.setString(_this.difenAry[_this.difenIndex]);
                _this.setRoomCardModeFree();
            });
        }

        // 封顶
        if (_playWay.getChildByName("buFengDing"))
        {
            var nodeListFengDing = [];
            nodeListFengDing.push( _playWay.getChildByName("buFengDing") );
            nodeListFengDing.push( _playWay.getChildByName("fengDingOption1") );
            nodeListFengDing.push( _playWay.getChildByName("fengDingOption2") );

            var fengDingOption3 = _playWay.getChildByName("fengDingOption3");
            if (fengDingOption3)
                nodeListFengDing.push( fengDingOption3 );
            
            this.fengding_radio = createRadioBoxForCheckBoxs(nodeListFengDing,this.radioBoxSelectCB);
            this.addListenerText(nodeListFengDing,this.fengding_radio);
            this.nodeListFengDing = nodeListFengDing;
        }
    },
    setExtraPlayNodeCurrentSelect:function(isClub) {
        if (this.fanbei_radio) {
            // 大结算翻倍
            var fanBeiOption;
            var fanBeiScore;
            if (isClub) {
                fanBeiScore = this.getNumberItem("fanBeiScore", 10);
                fanBeiOption = this.getNumberItem("fanBei", 0);
            }
            else {
                fanBeiOption = util.localStorageEncrypt.getNumberItem(this.localStorageKey.fanBei, 0);
                fanBeiScore = util.localStorageEncrypt.getNumberItem(this.localStorageKey.fanBeiScore, 10);
            }

            this.fanbei_radio.selectItem(fanBeiOption)
            this.nodeListFanBei[1].getChildByName("score").setString(fanBeiScore <= 100 ? fanBeiScore + "分" : "不限分");
            this.fanBeiRadioBoxSelectCB(fanBeiOption, this.nodeListFanBei[fanBeiOption], this.nodeListFanBei);
        }

        //托管
        if (this.tuoguanNodeList) {
            var trustTime;
            if (isClub)
                trustTime = this.getNumberItem("trustTime", 0);
            else
                trustTime = util.localStorageEncrypt.getNumberItem(this.localStorageKey.tuoGuan, 0);

            var trustTimes = [0,60,120,180,300];
            var index = 0;
            for (var i = 0; i < this.tuoguanNodeList.length; i++) {
                var bSelected = trustTime == trustTimes[i];
                this.tuoguanNodeList[i].setSelected(bSelected);

                if (bSelected)
                    index = i;
            }
            this.radioBoxSelectCB(index, this.tuoguanNodeList[index], this.tuoguanNodeList);

            this.refreshTrustWays(index,true);
        }

        //积分底分
        if(this.jieSuanDiFen){
            var diFen;
            if (isClub){
                diFen = this.getNumberItem("jieSuanDiFen", 1);
            }else {
                diFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.jieSuanDiFen, 1);
            }
            this.difenIndex = this.difenAry.indexOf(diFen);
            if (this.difenIndex < 0) this.difenIndex = 1;
            var text_diFen = this.jieSuanDiFen.getChildByName("text_diFen");
            text_diFen.setString(this.difenAry[this.difenIndex] + "");

        }

        // 封顶
        if (this.fengding_radio) {
            var option = null;
            if (isClub)
                option = this.getNumberItem("fengDing", 0);
            else
                option = util.localStorageEncrypt.getNumberItem(this.localStorageKey.fengDing, 0);

            this.fengding_radio.selectItem(option)
            this.radioBoxSelectCB(option,this.nodeListFengDing[option],this.nodeListFengDing);
        }
    },
    getExtraSelectedPara:function(para)
    {
        if (this.fanbei_radio) {
            var labelString = this.nodeListFanBei[1].getChildByName("score").getString();

            if (labelString == "不限分")
                para.fanBeiScore = 10000;
            else
                para.fanBeiScore = parseInt(labelString);
            para.fanBei = this.fanbei_radio.getSelectIndex();
        }

        // 托管
        if (this.tuoguanNodeList) {
            var trustTimes = [0,60,120,180,300];
            for (var i = 0; i < this.tuoguanNodeList.length; i++) {
                if (this.tuoguanNodeList[i].isSelected()) {
                    para.trustTime = trustTimes[i];
                    break;
                }
            } 
        }

        //积分底分
        if(this.jieSuanDiFen){
            // var text_diFen = this.jieSuanDiFen.getChildByName("text_diFen");
            // para.jieSuanDiFen = parseFloat(text_diFen.getString());

            para.jieSuanDiFen = this.difenAry[this.difenIndex];
        }

        // 封顶
        if (this.fengding_radio) {
            para.fengDing = this.fengding_radio.getSelectIndex();
        }

        //托管方式
        if (this.trustWayRadio) {
            para.isTrustWhole = false;
            para.trustWay = 0;
            for (var i = 0; i < this.trustWayNodeList.length; i++) {
                if (this.trustWayNodeList[i].isSelected()) {
                    para.trustWay = i;
                    para.isTrustWhole = true;
                    break;
                }
            } 
        }

        if (!this._isFriendCard) {
            // 大结算翻倍
            if (this.fanbei_radio) {
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.fanBei, para.fanBei);
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.fanBeiScore, para.fanBeiScore);
            }

            // 托管
            if (this.tuoguanNodeList)
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.tuoGuan, para.trustTime);

            //积分底分
            if(this.jieSuanDiFen){
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.jieSuanDiFen, para.jieSuanDiFen);
            }

            // 封顶
            if (this.fengding_radio) {
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.fengDing, para.fengDing);
            }
            
            // 托管方式
            if (this.trustWayRadio) {
                util.localStorageEncrypt.setBoolItem(this.localStorageKey.trustWhole, para.isTrustWhole);
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.trustWay, para.trustWay);
            }
        }
    },
    fanBeiRadioBoxSelectCB : function(index,sender, list){
        if(sender){
            var gameType = MjClient.createRoomNode._data.gameType;
            var appType = MjClient.getAppType();

            var selectColor = cc.color(0xd3, 0x26, 0x0e);
            var unSelectColor = cc.color(0x44, 0x33, 0x33);

            if (appType == MjClient.APP_TYPE.QXXXGHZ) {
                selectColor = cc.color(0xed, 0x65, 0x01);
                unSelectColor = cc.color(0x9E, 0x76, 0x4E);
            }

            if (gameType == MjClient.GAME_TYPE.PAO_DE_KUAI || gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_LYG) {
                selectColor = cc.color(237,32,0);
                unSelectColor = cc.color(96,46,26);
            }

            if (gameType === MjClient.GAME_TYPE.RU_GAO_ER) {
                selectColor = cc.color(237,32,0);
                unSelectColor = cc.color(96,46,26);
            }

            if (isYongZhouProject()) {
                if(appType == MjClient.APP_TYPE.QXYZQP || appType == MjClient.APP_TYPE.BDYZPHZ){
                    selectColor = cc.color(208,88,60);
                    unSelectColor = cc.color(72,94,112);                
                }
                else if(MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType() || appType == MjClient.APP_TYPE.QXLYQP){
                    selectColor = MjClient.createRoomNode._selectColor;
                    unSelectColor = MjClient.createRoomNode._unSelectColor;            
                }
                else if(appType == MjClient.APP_TYPE.HUNANWANGWANG) {
                    selectColor = CREATEROOM_COLOR_WANGWANG_SELECT;
                    unSelectColor = CREATEROOM_COLOR_WANGWANG_UNSELECT;
                }
                else if(appType == MjClient.APP_TYPE.BDHYZP) {
                    selectColor = cc.color("#d21400");
                    unSelectColor = cc.color("#255662");
                }
                else {
                    selectColor = cc.color(237,101,1);
                    unSelectColor = cc.color(158,118,78);
                }
            }

            var len = list.length;
            for(var i = 0; i < len; i++){
                var radioBox = list[i];
                var bSelected = (radioBox === sender && sender.isSelected());

                // if (i == 0) {
                //     var txt = radioBox.getChildByName("text");
                //     txt.ignoreContentAdaptWithSize(true);
                //     txt.setTextColor(bSelected ? selectColor : unSelectColor);
                // } else {
                //     var textNames = ["text","score"];
                //     for (var j = 0; j < textNames.length; j++) {
                //         var txt = radioBox.getChildByName(textNames[j]);
                //         txt.ignoreContentAdaptWithSize(true);
                //         txt.setTextColor(bSelected ? selectColor : unSelectColor);
                //     }

                //     var buttonNames = ["btn_add","btn_sub"];
                //     for (var j = 0; j < buttonNames.length; j++) {
                //         var button = radioBox.getChildByName(buttonNames[j]);
                //         button.setTouchEnabled(bSelected);
                //         button.setBright(bSelected);
                //     }
                // }

                var textNames = ["text","score"];
                for (var j = 0; j < textNames.length; j++) {
                    var txt = radioBox.getChildByName(textNames[j]);
                    if (!txt)continue;
                    txt.ignoreContentAdaptWithSize(true);
                    txt.setTextColor(bSelected ? selectColor : unSelectColor);
                }

                var buttonNames = ["btn_add","btn_sub"];
                for (var j = 0; j < buttonNames.length; j++) {
                    var button = radioBox.getChildByName(buttonNames[j]);
                    if (!button)continue;
                    button.setTouchEnabled(bSelected);
                    button.setBright(bSelected);
                }
            }
        }
    },

    getRoundNumObj: function () {
        var gameType = this._data.gameType;
        cc.log("===============================gameType = " + gameType);
        var maxPlayer = this.getSelectPlayNum();//this.getSelectedPara().maxPlayer;
        var gamePriceCfg = MjClient.data.gamePrice[gameType][maxPlayer];
        var roundNumObj = null;

        //cc.log("===============================MjClient.data.gamePrice = " + JSON.stringify(MjClient.data.gamePrice));

        // for (var key in gamePriceCfg) {
        //     cc.log("The key = ",key)
        // }

        // if (this.roundNumObj) {
        //     // 兼容永州工程在本地配置了局数
        //     roundNumObj = [];

        //     for (var roundKey in this.roundNumObj) {
        //         //cc.log("The roundKey = ",roundKey)
        //         var roundNum = this.roundNumObj[roundKey].toString();
        //         //cc.log("The roundNum = ",roundNum);
        //         if (gamePriceCfg[roundNum])
        //             roundNumObj.push(roundNum);
        //     }
        // } else {
            roundNumObj = Object.keys(gamePriceCfg).sort(function(a,b){return a-b});
        // }
        return roundNumObj;
    },

    refreshTrustWays: function(indexSelected,bFirst) {
        if (!this.trustWayRadio)
            return;

        if (indexSelected <= 0) {
            for (var i = 0; i < this.trustWayNodeList.length; i++) {
                this.trustWayNodeList[i].setVisible(false);
                this.trustWayNodeList[i].setSelected(false);
            }
        } else if (bFirst) {
            var isTrustWhole = false;
            var trustWay = 0;

            if (this._isFriendCard) {
                isTrustWhole = this.getBoolItem("isTrustWhole", false);
                trustWay = this.getNumberItem("trustWay",2);
            }
            else {
                isTrustWhole = util.localStorageEncrypt.getBoolItem(this.localStorageKey.trustWhole, false);
                trustWay = util.localStorageEncrypt.getNumberItem(this.localStorageKey.trustWay, 2);
            }

            if (isTrustWhole) {
                // 兼容以前选了“整场托管”
                this.trustWayRadio.selectItem(trustWay)
                this.radioBoxSelectCB(trustWay,this.trustWayNodeList[trustWay],this.trustWayNodeList);
            } else {
                // 默认当局托管
                this.trustWayRadio.selectItem(0)
                this.radioBoxSelectCB(0,this.trustWayNodeList[0],this.trustWayNodeList);
            }
        } else {
            if (this.trustWayNodeList[0].isVisible())
                return;

            for (var i = 0; i < this.trustWayNodeList.length; i++) {
                this.trustWayNodeList[i].setVisible(true);
            }

            // 默认当局托管
            this.trustWayRadio.selectItem(0)
            this.radioBoxSelectCB(0,this.trustWayNodeList[0],this.trustWayNodeList);
        }
        
        if(this._data && this._data.gameType == MjClient.GAME_TYPE.DA_YE_510K){
            for(var i = 0; i <this.trustWayNodeList.length; i++){
                if(this.trustWayNodeList[i]){
                    this.trustWayNodeList[i].setVisible(false);
                }
            }
        }
        if(this._data && this._data.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN){
            for(var i = 0; i <this.trustWayNodeList.length; i++){
                if(this.trustWayNodeList[i]){
                    this.trustWayNodeList[i].setVisible(false);
                }
            }
        }

        if(this._data && this._data.gameType === MjClient.GAME_TYPE.WU_XUE_510K){
            for(var i = 0; i <this.trustWayNodeList.length; i++){
                if(this.trustWayNodeList[i]){
                    this.trustWayNodeList[i].setVisible(false);
                }
            }
        }
    },

    useYueYangUIV3_ziPai:function () {
        var jieSuanDiFen = this.jieSuanDiFen;
        if(jieSuanDiFen){
            var text_title = jieSuanDiFen.getChildByName("text_title");
            var text_diFen = jieSuanDiFen.getChildByName("text_diFen");
            var img_bg = jieSuanDiFen.getChildByName("img_bg");
            var btn_sub = jieSuanDiFen.getChildByName("btn_sub");
            var btn_add = jieSuanDiFen.getChildByName("btn_add");

            if (text_title && text_diFen && img_bg && btn_sub && btn_add) {
                text_title.setScale(1);
                text_title.setFontSize(28);
                text_title.setTextColor(cc.color("#6d685b"));
                text_title.y = 85.6;
                text_title.x = 28;

                text_diFen.setFontSize(28);
                text_diFen.setTextColor(cc.color("#443333"));
                text_diFen.y = 90.2;
                text_diFen.x = 273;

                img_bg.loadTexture("common_3.0/bg_jiajiandi.png");
                img_bg.setContentSize(new cc.Sprite("common_3.0/bg_jiajiandi.png").getContentSize());
                img_bg.setZOrder(-1);
                img_bg.x = 260;
                img_bg.y = 90;

                btn_add.loadTextures(
                    "common_3.0/btn_jia.png",
                    "common_3.0/btn_jia_liang.png",
                    "common_3.0/btn_jia_hui.png"
                );
                btn_add.setContentSize(new cc.Sprite("common_3.0/btn_jia.png").getContentSize());
                btn_add.x = 356.83;
                btn_add.y = 90;

                btn_sub.loadTextures(
                    "common_3.0/btn_jian.png",
                    "common_3.0/btn_jian_liang.png",
                    "common_3.0/btn_jian_hui.png"
                );
                btn_sub.setContentSize(new cc.Sprite("common_3.0/btn_jian.png").getContentSize());
                btn_sub.x = 188.85;
                btn_sub.y = 90;
            }
        }
    },
    useYueYangUIV3: function() {
        if (!this.isUseUIV3)
            return;

        var that = this;
        var size1 = new cc.Sprite("common_3.0/icon_xuanzhongbg_1.png").getContentSize();
        var size2 = new cc.Sprite("common_3.0/icon_xuanzhongbg_2.png").getContentSize();
        var func = function(node) {
            var nodeType = node.getDescription();
            var parentType = node.getParent().getDescription();
            if (nodeType == "Label") {
                if (parentType == "CheckBox") {
                    var fontSize = node.getFontSize();
                    if (fontSize > 26) {
                        node.setFontSize(26);
                        node.y += (fontSize - 26)/2;
                    }
                    if (node.x - node.width * node.getAnchorPoint().x < node.getParent().width + 5)
                        node.x = node.getParent().width + 5 + node.width * node.getAnchorPoint().x;
                    node.setTextColor(that._unSelectColor);
                } else if (node.getParent().isTipDi) {
                    node.setTextColor(cc.color("#FFFFFF"));
                } else if (parentType != "Button") {
                    var fontSize = node.getFontSize();
                    if (fontSize > 26) {
                        node.setFontSize(26);
                        node.y -= (fontSize - 26)/2;
                    }
                    node.setTextColor(that._unSelectColor);
                }

                if (node.getFontName() != "fonts/lanting.TTF")
                    node.setFontName("fonts/lanting.TTF");
            } else if (nodeType == "CheckBox") {
                // 单选框
                if (node.getBackNormalFile().file == "createNewPng/daTC1_18.png") {
                    // 正常状态背景，按下状态背景，正常状态标识, 禁用状态背景，禁用状态标识
                    node.loadTextures(
                        "common_3.0/icon_xuanzhongbg_1.png",
                        "common_3.0/icon_xuanzhongbg_1.png",
                        "common_3.0/icon_xuanzhong_2.png",
                        "common_3.0/icon_xuanzhongbg_1.png",
                        "common_3.0/icon_xuanzhongbg_1.png");
                    node.setContentSize(size1);
                    node.y += 2;
                }
                // 复选框
                else if (node.getBackNormalFile().file == "createNewPng/daTC1_19.png") {
                    node.loadTextures(
                        "common_3.0/icon_xuanzhongbg_2.png",
                        "common_3.0/icon_xuanzhongbg_2.png",
                        "common_3.0/icon_xuanzhong_1.png",
                        "common_3.0/icon_xuanzhongbg_2.png",
                        node.getCrossDisabledFile().file == "createNewPng/daTC1_21.png" ? "createNewPng/daTC1_21.png" : "common_3.0/icon_xuanzhongbg_2.png");
                    node.setContentSize(size2);
                    node.x += 6;
                    node.y += 8;
                }
            } else if (nodeType == "Button" && node.getNormalFile().file == "createNewPng/tip.png") {
                node.loadTextures("createRoom_3.0/btn_wenhao.png", "", "");
                node.setContentSize(new cc.Sprite("createRoom_3.0/btn_wenhao.png").getContentSize());
            } else if (nodeType == "ImageView" && node.getRenderFile().file == "createNewPng/tip_di.png") {
                node.loadTexture("createRoom_3.0/tip_di.png");
                node.isTipDi = true;
            }

            if (node.name == "play_lessthan" || node.name == "fanBei1") {
                var score_bg = node.getChildByName("score_bg");
                var btn_add = node.getChildByName("btn_add");
                var btn_sub = node.getChildByName("btn_sub");
                var text = node.getChildByName("text");
                if (score_bg && btn_add && btn_sub && text) {
                    text.setString("少于                                      翻倍");

                    btn_sub.loadTextures(
                        "common_3.0/btn_jian.png",
                        "common_3.0/btn_jian_liang.png",
                        "common_3.0/btn_jian_hui.png"
                    );
                    btn_sub.setContentSize(new cc.Sprite("common_3.0/btn_jian.png").getContentSize());
                    btn_sub.x = 130;

                    score_bg.loadTexture("common_3.0/bg_jiajiandi.png");
                    score_bg.setContentSize(new cc.Sprite("common_3.0/bg_jiajiandi.png").getContentSize());
                    score_bg.x = 210;

                    btn_add.loadTextures(
                        "common_3.0/btn_jia.png",
                        "common_3.0/btn_jia_liang.png",
                        "common_3.0/btn_jia_hui.png"
                    );
                    btn_add.setContentSize(new cc.Sprite("common_3.0/btn_jia.png").getContentSize());
                    btn_add.x = 290;
                }

            }

            var children = node.getChildren();
            for (var i = 0; i < children.length; i++) {
                func(children[i]);
            }
        }

        func(this.bg_node);

        var createParent = this.bg_node;
        var _btn_create_diamond = createParent.getChildByName("btn_create_diamond");
        // 岳阳选项内容滑动，加在view下，创建房间，保存规则在上一层
        if(!_btn_create_diamond)
        {
            createParent = this.bg_node.getParent();
            _btn_create_diamond = createParent.getChildByName("btn_create_diamond");
        }

        if (_btn_create_diamond) {
            if (_btn_create_diamond.getChildByName("text_tip")){
                _btn_create_diamond.getChildByName("text_tip").y += 3;
            }

            _btn_create_diamond.loadTextures(
                "createRoom_3.0/btn_chuangjianfangjian.png", 
                "createRoom_3.0/btn_chuangjianfangjian_liang.png",
                "createRoom_3.0/btn_chuangjianfangjian_liang.png");
            _btn_create_diamond.setContentSize(new cc.Sprite("createRoom_3.0/btn_chuangjianfangjian.png").getContentSize());
            _btn_create_diamond.y =   90;
            _btn_create_diamond.x = 670;

            var text_difen = null;
            var difenParent = createParent;
            text_difen = difenParent.getChildByName("text_difen");
            if (!text_difen) {
                if (createParent.getChildByName("jieSuanDiFen")) {
                    difenParent = createParent.getChildByName("jieSuanDiFen");
                    text_difen = difenParent.getChildByName("text_difen");
                }
            }
        
            if (!text_difen) {
                var children = difenParent.getChildren();
                for (var i = 0; i < children.length; i++) {
                    if (children[i].getDescription() == "Label" ){
                        var str = children[i].getString();
                        cc.log("children[i].getString()", str);
                        if (str.indexOf("底") >= 0 && str.indexOf("分") >= 0) {
                            children[i].name = "text_difen";
                            text_difen = children[i];
                            break;
                        }
                    }
                }
            }
            
            var difenDifX = 0
            if (text_difen) {
                var srcText = text_difen.getString().trim();
                text_difen.setString("积分底分:");
                text_difen.ignoreContentAdaptWithSize(true);

                text_difen.setScale(1);
                text_difen.setFontSize(28);
                text_difen.setTextColor(cc.color("#6d685b"));
                text_difen.y = _btn_create_diamond.y;
                text_difen.x = 28;
                difenDifX = (text_difen.getString().length - srcText.length) * text_difen.getFontSize() * text_difen.getScaleX();
            }

            var Image_3 = difenParent.getChildByName("Image_3") || difenParent.getChildByName("img_bg") || difenParent.getChildByName("score_bg");
            var btn_add = difenParent.getChildByName("btn_add");
            var btn_sub = difenParent.getChildByName("btn_sub");
            var txt_fen = difenParent.getChildByName("txt_fen") || difenParent.getChildByName("text_diFen") || difenParent.getChildByName("score");
            if (Image_3 && btn_add && btn_sub && txt_fen) {
                txt_fen.y = _btn_create_diamond.y;

                Image_3.x += difenDifX;
                btn_add.x += difenDifX;
                txt_fen.x += difenDifX;
                btn_sub.x += difenDifX;

                Image_3.loadTexture("common_3.0/bg_jiajiandi.png");
                Image_3.setContentSize(new cc.Sprite("common_3.0/bg_jiajiandi.png").getContentSize());
                Image_3.y = txt_fen.y;
                Image_3.setZOrder(-1);

                btn_add.loadTextures(
                    "common_3.0/btn_jia.png",
                    "common_3.0/btn_jia_liang.png",
                    "common_3.0/btn_jia_hui.png"
                );
                btn_add.setContentSize(new cc.Sprite("common_3.0/btn_jia.png").getContentSize());
                btn_add.x += 3;
                btn_add.y = txt_fen.y;

                btn_sub.loadTextures(
                    "common_3.0/btn_jian.png",
                    "common_3.0/btn_jian_liang.png",
                    "common_3.0/btn_jian_hui.png"
                );
                btn_sub.setContentSize(new cc.Sprite("common_3.0/btn_jian.png").getContentSize());
                btn_sub.x -= 3;
                btn_sub.y = txt_fen.y;

                if (text_difen){
                    Image_3.x = text_difen.x + text_difen.width + Image_3.width / 2 + 40;
                    txt_fen.x = Image_3.x;
                    btn_sub.x = Image_3.x - Image_3.width / 2;
                    btn_add.x = Image_3.x + Image_3.width / 2;
                }
            }

        }

        if(_btn_create_diamond && FriendCard_Common.getSkinType() == 4){
            var ruleretainParent = this.bg_node;
            var _btn_ruleretain = ruleretainParent.getChildByName("btn_ruleretain");
            if(!_btn_ruleretain)
            {
                ruleretainParent = this.bg_node.getParent();
                _btn_ruleretain = ruleretainParent.getChildByName("btn_ruleretain");
            }
            if(_btn_ruleretain){
                _btn_ruleretain.y = _btn_create_diamond.y;
                _btn_ruleretain.scale = 0.9;
                _btn_ruleretain.x += _btn_ruleretain.width * 0.1;

            }
        }
    },
    modifyDiFenText: function() {
        var that = this;
        
        var createParent = this.bg_node;
        var _btn_create_diamond = createParent.getChildByName("btn_create_diamond");
        // 岳阳选项内容滑动，加在view下，创建房间，保存规则在上一层
        if(!_btn_create_diamond)
        {
            createParent = this.bg_node.getParent();
            _btn_create_diamond = createParent.getChildByName("btn_create_diamond");
        }

        if (_btn_create_diamond) {
            var text_difen = null;
            var difenParent = createParent;
            text_difen = difenParent.getChildByName("text_difen");
            if (!text_difen) {
                if (createParent.getChildByName("jieSuanDiFen")) {
                    difenParent = createParent.getChildByName("jieSuanDiFen");
                    text_difen = difenParent.getChildByName("text_difen");
                }
            }
        
            if (!text_difen) {
                var children = difenParent.getChildren();
                for (var i = 0; i < children.length; i++) {
                    if (children[i].getDescription() == "Label" ){
                        var str = children[i].getString();
                        cc.log("children[i].getString()", str);
                        if (str.indexOf("底") >= 0 && str.indexOf("分") >= 0) {
                            text_difen = children[i];
                        }
                    }
                }
            }

            if (!text_difen) {
                if (this.bg_node.getChildByName("play") && this.bg_node.getChildByName("play").getChildByName("jieSuanDiFen")) {
                    difenParent = this.bg_node.getChildByName("play").getChildByName("jieSuanDiFen");
                    text_difen = difenParent.getChildByName("text_difen") || difenParent.getChildByName("difen") || difenParent.getChildByName("text_title");
                }
                else {
                    text_difen = this.bg_node.getChildByName("text_difen");
                    if (text_difen)
                        difenParent = this.bg_node;
                }
            }

            if (text_difen) {
                var srcText = text_difen.getString().trim();
                text_difen.setString("积分底分:");
                text_difen.ignoreContentAdaptWithSize(true);

                var difX = (text_difen.getString().length - srcText.length) * text_difen.getFontSize() * text_difen.getScaleX();
                if (difX > 0) {
                    var Image_3 = difenParent.getChildByName("Image_3") || difenParent.getChildByName("img_bg") || difenParent.getChildByName("score_bg");
                    var btn_add = difenParent.getChildByName("btn_add");
                    var btn_sub = difenParent.getChildByName("btn_sub");
                    var txt_fen = difenParent.getChildByName("txt_fen") || difenParent.getChildByName("text_diFen") || difenParent.getChildByName("score");
                    if (Image_3 && btn_add && btn_sub && txt_fen) {
                        Image_3.x += difX;
                        btn_add.x += difX;
                        txt_fen.x += difX;
                        btn_sub.x += difX;
                    }
                }
            }
        }
    }
});