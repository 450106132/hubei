var CREATEROOM_COLOR_1 = cc.color(237, 101, 1);
var CREATEROOM_COLOR_2 = cc.color(123, 78, 63);
if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
    CREATEROOM_COLOR_2 = cc.color(158, 118,78);
}
if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) { // 岳阳
    CREATEROOM_COLOR_1 = cc.color(68,51,51);
    CREATEROOM_COLOR_2 = cc.color(211,38,14);
}
else if(MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ) { // 临汾
    CREATEROOM_COLOR_1 = cc.color(94,119,199);
    CREATEROOM_COLOR_2 = cc.color(91,95,128);
}
else if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || 
    MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP || 
    MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ) { // 江苏,徐州,南通
    CREATEROOM_COLOR_1 = cc.color(211, 60, 0);
    CREATEROOM_COLOR_2 = cc.color(159, 106, 54);
}
else if(MjClient.getAppType()  ===  MjClient.APP_TYPE.TXJINZHONGMJ ||
    MjClient.getAppType() ===  MjClient.APP_TYPE.AYGUIZHOUMJ ||
    MjClient.getAppType() ===  MjClient.APP_TYPE.LYSICHUANMJ ||
    MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) { // 晋中
    CREATEROOM_COLOR_1 = cc.color(211, 60, 0);
    CREATEROOM_COLOR_2 = cc.color(66, 94, 112);
}

function AlertSameIP(msg)
{   
    //永州项目关闭同一IP提示
    if(isYongZhouProject()){
        return;
    }
	var sameIPUI;
	var SameIPInfo = cc.Layer.extend({
        ctor:function () {
            this._super();
            sameIPUI=this;
            var jsonui = ccs.load("SameIP.json");
            if (MjClient.gameType >= MjClient.GAME_TYPE.PDK_SK){
                jsonui = ccs.load("sk_SameIP.json");
            }
            //BindUiAndLogic(jsonui.node,this.jsBind);
            this.addChild(jsonui.node);
            /*
                 changed by sking
            */
            var _block = jsonui.node.getChildByName("block");
            setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

            var _back = jsonui.node.getChildByName("back");
            setWgtLayout(_back,[0.65,0.78],[0.5,0.5],[0,0]);

            var _msg =  _back.getChildByName("msg");
            _msg.setString(msg);

            var _no =  _back.getChildByName("no");
            //回放的时候
            if(MjClient.rePlayVideo != -1)
            {
                updatelayer_itme_node.pause();
            }
            _no.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        //回放的时候
                        if(MjClient.rePlayVideo != -1)
                        {
                            updatelayer_itme_node.resume();
                        }
                        sameIPUI.removeFromParent(true);
                        break;
                    default :
                        break;
                }
            },this);

            //继续游戏
            var _yes =  _back.getChildByName("yes");
            _yes.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        sameIPUI.removeFromParent(true);
                        break;
                    default :
                        break;
                }
            },this);

            //解散房间
            var _del =  _back.getChildByName("del");
            _del.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        sameIPUI.removeFromParent(true);
                        MjClient.delRoom(true);
                        break;
                    default :
                        break;
                }
            },this);

            /*
                回放屏蔽
             */
            if(MjClient.rePlayVideo != -1)
            {
                _yes.visible = false;
                _yes.setTouchEnabled(false);

                _del.visible = false;
                _del.setTouchEnabled(false);

            }
            return true;
        }
    });
   MjClient.Scene.addChild(new SameIPInfo());
}




//牌桌玩家自己头像调用
var PlayerInfoView = cc.Layer.extend({
    pinfo:null,
	jsBind:{
		back:
		{
			headImg:
			{
				_event: {
                    loadWxHead: function (d) {
                        if (d.uid == MjClient.userInfoLayerUi.pinfo.uid) {
                            if (isJinZhongAPPType() ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
                                MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                                MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
                            {
                                var clippingNode = new cc.ClippingNode();
                                var mask = new cc.Sprite("home/zhezhao.png");
                                clippingNode.setAlphaThreshold(0);
                                clippingNode.setStencil(mask);
                                var img = new cc.Sprite(d.img);
                                img.setScale(mask.getContentSize().width/img.getContentSize().width);
                                clippingNode.addChild(img);
                                clippingNode.setScale(0.97);
                                clippingNode.setPosition(this.getContentSize().width/2,this.getContentSize().height/2);
                                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                                    MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                                    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                                    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                                    MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                                    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
                                {
                                    clippingNode.setScale(0.95);
                                    clippingNode.setPosition(this.getContentSize().width/1.613,this.getContentSize().height/1.9);
                                }
                                //邵阳换皮调整头像坐标和大小
                                if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                                    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                                    MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) {
                                    clippingNode.setScale(1.1);
                                    clippingNode.setPosition(this.getContentSize().width/2,this.getContentSize().height/2);
                                }
                                if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG){
                                    clippingNode.setScale(0.95);
                                }
                                //遮罩框
                                var hideblock = new cc.Sprite("home/homeHeadCusPic.png");
                                if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                                    clippingNode.setScale(1.42);
                                    clippingNode.setPosition(this.getContentSize().width/2,this.getContentSize().height/2 - 8);
                                    hideblock.setTexture("ui/userInfo/touxiangk_01.png");
                                }
                                hideblock.setPosition(hideblock.getContentSize().width/2,hideblock.getContentSize().height/2);
                                this.addChild(clippingNode);
                                this.addChild(hideblock);
                                //setWgtLayout(clippingNode, [0.88, 0.88], [1.5, 1.5], [0.5, 0.5], false, true);
                            }
                            else
                            {
                                var sp = new cc.Sprite(d.img);
                                this.addChild(sp);
                                setWgtLayout(sp, [0.88, 0.88], [0.5, 0.5], [0, 0], false, true);
                            }
                        }
                    }
                }
			}
		}
    },
    ctor:function (pinfo,canEditSignature, showMoney) {
        this._super();
        this.pinfo = pinfo;
        var userInfoLayerUi = ccs.load("UserInfo.json");
		BindUiAndLogic(userInfoLayerUi.node,this.jsBind);
        this.addChild(userInfoLayerUi.node);
        MjClient.userInfoLayerUi=this;
        
        var that = this;
        var _block = userInfoLayerUi.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = userInfoLayerUi.node.getChildByName("back");
        setWgtLayout(_back, [0.6,0.75],[0.5,0.5],[0,0]);

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) 
        {
            setWgtLayout(_back, [0.75,0.75],[0.5,0.5],[0,0]);
        }
        //姓名
        var _name = _back.getChildByName("name");
        var _nameStr = unescape(pinfo.nickname);
        _name.ignoreContentAdaptWithSize(true);
        _name.setString(getNewName (_nameStr,12));
        _name.setFontName("Arial");
        _name.setFontSize(_name.getFontSize());

        //关闭 按钮
        var _btnClose = _back.getChildByName("close");
        _btnClose.addTouchEventListener(function (sender, Type)
        {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    that.removeFromParent();
                    break;
                default :
                    break;
            }
        }, this);

        //头像
        var _headImg = _back.getChildByName("headImg");
        MjClient.loadWxHead(pinfo.uid,pinfo.headimgurl);

        //ID
        var _ID = _back.getChildByName("ID");
        _ID.setString("ID:"+pinfo.uid);
        _ID.ignoreContentAdaptWithSize(true);

        //IP
        var _IP = _back.getChildByName("IP");
         if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
             MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) {
            _IP.x -= 30;  //邵阳新皮肤适配下文本坐标
         }
        _IP.ignoreContentAdaptWithSize(true);
        if (MjClient.remoteCfg.guestLogin)
        {
            var addressInfo = "地址:";
            var addressVec = JSON.parse(MjClient.native.GetAddress());
            for (var i=1; i<addressVec.length-1; i++)
            {
                addressInfo += addressVec[i];
            }
            _IP.setString(addressInfo);
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
            {
                _IP.setString(hideIP_paohuzi(addressInfo));
            }
        }
        else
        {
            var ipInfo = "";
            if(pinfo.remoteIP)
            {
                ipInfo = "IP:" + pinfo.remoteIP;
            }
            _IP.setString(ipInfo);
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
            {
                _IP.setString(hideIP_paohuzi(ipInfo));
            }
        }
        if ((MjClient.APP_TYPE.QXYYQP == MjClient.getAppType() ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ|| MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType() || isJinZhongAPPType())
            && ((MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId))){
            var ipStr = "                               ";
            _IP.setString(ipStr);
        }

        //道具开关
        var _props = util.localStorageEncrypt.getBoolItem("_InteractiveProps", true);
        var _nodeProps;
        var _propsText = new ccui.Text();
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ|| MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {//岳阳同一使用方正兰亭
            _propsText.setFontName("fonts/lanting.TTF");
        }
        _propsText.setName("text");
        _propsText.setString("使用互动道具");
        _propsText.setTouchEnabled(true);

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ) {
            _nodeProps = new ccui.CheckBox("createNewPng/daTC1_19.png", "createNewPng/daTC1_20.png");
            _nodeProps.setAnchorPoint(cc.p(0, 0));
            _ID.addChild(_nodeProps, 100);
            _nodeProps.setPosition(cc.p(0, -(_ID.height*3.1)));
            _propsText.setFontName(MjClient.fzcyfont);
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) 
            {
                _propsText.setFontName("fonts/lanting.TTF");
            }
            _fontSize = 27;
        }
        else if(isJinZhongAPPType()) {
            _nodeProps = new ccui.CheckBox("createNewPng/daTC1_19.png", "createNewPng/daTC1_20.png");
            _nodeProps.setAnchorPoint(cc.p(0, 0));
            _ID.addChild(_nodeProps, 100);
            _nodeProps.setPosition(cc.p(0, -(_ID.height*1.8)));
            _fontSize = 26;
            _propsText.setFontName("fonts/lanting.TTF");
        }
        else{
            _nodeProps = new ccui.CheckBox("game_picture/btn_cjxx_normal.png", "game_picture/btn_cjxx_press.png");
            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                _nodeProps = new ccui.CheckBox("ui/createRoom/cb_di.png", "ui/createRoom/gou.png");
            }
            _nodeProps.setAnchorPoint(cc.p(0, 0));
            _IP.addChild(_nodeProps, 100);
            _nodeProps.setPosition(cc.p(0, -(_IP.height*1.5)));
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                _propsText.setFontName("fonts/lanting.TTF");
            }
            else {
                _propsText.setFontName(MjClient.fzcyfont);
            }
            var _fontSize = 30;
        }
        _propsText.setPosition(cc.p(_nodeProps.getContentSize().width*3.5 + 10, _nodeProps.getContentSize().height/2));
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
        {
            _propsText.setPosition(cc.p(_nodeProps.getContentSize().width*3.5, _nodeProps.getContentSize().height/2));
        }
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            _nodeProps.setPositionY(-(_IP.height*1.5) - 40);
            _propsText.setFontName("fonts/lanting.TTF");
            _fontSize = 28;
        }
        _propsText.setTouchEnabled(true);
        _propsText.setFontSize(_fontSize);
        _nodeProps.setSelected(_props);
        selectedCB(_propsText, _props);
        _nodeProps.addChild(_propsText);
        _propsText.addTouchEventListener(function(sender,type){
            if(type == 2) {
                _nodeProps.setSelected(!_nodeProps.isSelected())
                selectedCB(_propsText, _nodeProps.isSelected());
                util.localStorageEncrypt.setBoolItem("_InteractiveProps", _nodeProps.isSelected());
            }
        });
        _nodeProps.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    selectedCB(_propsText, true);
                    util.localStorageEncrypt.setBoolItem("_InteractiveProps", true);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    selectedCB(_propsText, false);
                    util.localStorageEncrypt.setBoolItem("_InteractiveProps", false);
                    break;
            }
        }, _nodeProps);


        function selectedCB(text, isSelected) {
            if (isSelected) {
                text.setTextColor(CREATEROOM_COLOR_1);
            } else {
                text.setTextColor(CREATEROOM_COLOR_2);
            }
        }

        var _signature = _back.getChildByName("signature");
        _signature.setVisible(false);//又双叒叕去掉个性签名。。。
        _signature.setString("个性签名:"+unescape(pinfo.signature));
        if(pinfo.uid == SelfUid() && canEditSignature)
        {
            _signature.setVisible(false);
            this._textFeildName = new cc.EditBox(cc.size(430,100), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
            this._textFeildName.setFontColor(cc.color(255,255,255));
            this._textFeildName.setMaxLength(17*3);
            this._textFeildName.setFontSize(24);
            this._textFeildName.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            this._textFeildName.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
            this._textFeildName.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            this._textFeildName.setPlaceHolder("点击输入个性签名");
            this._textFeildName.setPlaceholderFontSize(24);
            this._textFeildName.setPosition(520,270);
            _back.addChild(this._textFeildName);
            this._textFeildName.setString(unescape(pinfo.signature));
            this._textFeildName.setDelegate(this);
            this._textFeildName.setVisible(false);
            this._textFeildName.setEnabled(false);
        }



        var geogData = [];
        if (MjClient.data.sData && MjClient.data.sData.tData)
        {
            var tData = MjClient.data.sData.tData;
            for (var i = 0; i < tData.uids.length; i++) {
                var pl = MjClient.data.sData.players[tData.uids[i]];
                if (pl && pl.locationMsg) {
                    geogData.push(pl.locationMsg);
                }
            }
        }

        function _getTextPre(index)
        {
            if(geogData[index]){
                var plyPos = geogData[index].split(";");
                var uid = parseInt(plyPos[3]);
                var sData = MjClient.data.sData;
                var pl = sData.players[uid];
                return unescape(pl.info.nickname)+"的位置为：" ;
            }
            return "";
        }
        function getUserAddressInfo(index)
        {

            var uid  = MjClient.data.sData.tData.uids[index];
            var pl = MjClient.data.sData.players[uid];
            if (!pl || !pl.info.location)
            {
                return "";
            }
            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                return ""; // 北斗衡阳屏蔽地理位置
            }
            var _address = pl.info.location.address;

            var addressInfo = "";
            if (index >= geogData.length)
            {
                return addressInfo;
            }
            var plyPos = geogData[index].split(";");
            var addressStr = plyPos[4];

            if(!_address)
            {
                _address = addressStr;
            }

            var addressVec = JSON.parse(_address);
            for (var i=0; i<addressVec.length-2; i++)//精确到街道
            {
                addressInfo += addressVec[i];
            }
            return addressInfo;
        }


        //玩家位置
        var Pos0 = _back.getChildByName("play0Pos");
        Pos0.setString(_getTextPre(0));

        var Pos1 = _back.getChildByName("play1Pos");
        Pos1.setString(_getTextPre(1));

        var Pos2 = _back.getChildByName("play2Pos");
        Pos2.setString(_getTextPre(2));

        var Pos3 = _back.getChildByName("play3Pos");
        Pos3.setString(_getTextPre(3));

        var Pos4 = _back.getChildByName("play4Pos");
        Pos4 && Pos4.setString(_getTextPre(4));


        //玩家经纬度
        var _play0Pos_0 = _back.getChildByName("play0Pos_0");
        _play0Pos_0.setString(getUserAddressInfo(0));
        _play0Pos_0.ignoreContentAdaptWithSize(true);

        var _play1Pos_0 = _back.getChildByName("play1Pos_0");
        _play1Pos_0.setString(getUserAddressInfo(1));
        _play1Pos_0.ignoreContentAdaptWithSize(true);

        var _play2Pos_0 = _back.getChildByName("play2Pos_0");
        _play2Pos_0.setString(getUserAddressInfo(2));
        _play2Pos_0.ignoreContentAdaptWithSize(true);

        //自己
        var _play3Pos_0 = _back.getChildByName("play3Pos_0");
        _play3Pos_0.setString(getUserAddressInfo(3));
        _play3Pos_0.ignoreContentAdaptWithSize(true);

        var _play4Pos_0 = _back.getChildByName("play4Pos_0");
        _play4Pos_0 && _play4Pos_0.setString(getUserAddressInfo(4));
        _play4Pos_0 && _play4Pos_0.ignoreContentAdaptWithSize(true);

        if ((MjClient.APP_TYPE.QXYYQP == MjClient.getAppType() || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ|| MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType() || isJinZhongAPPType()) &&
            (MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId)){
            Pos0.visible = false;
            Pos1.visible = false;
            Pos2.visible = false;
            Pos3.visible = false;
            if (Pos4) Pos4.visible = false;

            _play0Pos_0.visible = false;
            _play1Pos_0.visible = false;
            _play2Pos_0.visible = false;
            _play3Pos_0.visible = false;
            if (_play4Pos_0)_play4Pos_0.visible = false;
        }

        //获得钻石数量
        var _money = _back.getChildByName("money");
        _money.visible = !MjClient.remoteCfg.hideMoney && showMoney;
        var _num = _money.getChildByName("num");

        var moneyNum = pinfo.money;
        if (MjClient.data.sData && MjClient.data.sData.tData && tData.areaSelectMode.fangkaCount > 0) {
            moneyNum = pinfo.fangka;

            var iconNode = _money.getChildByName("money_icon") || _money.getChildByName("yuanbao_BG") || _num.getChildByName("Image_18");
            if (!iconNode)
                iconNode = _money.getChildByName("Image_1") && _money.getChildByName("Image_1").getChildByName("Image_18"); // 山西
            if (iconNode) {
                iconNode.loadTexture("store/icon_fangka.png");
                iconNode.setContentSize(iconNode.getVirtualRenderer().getContentSize());
            }
        }

        _num.setString(moneyNum);

        _num.ignoreContentAdaptWithSize(true);
        var _num_fudai = _money.getChildByName("num_fudai");
        if (_num_fudai) {
            _num_fudai.setString(pinfo.limitMoney);
            _num_fudai.ignoreContentAdaptWithSize(true);
            _num_fudai.visible = false;
        }

        var bindPhoneNum = _back.getChildByName("bindPhoneNum");
        if(bindPhoneNum){
            bindPhoneNum.setVisible(false);
        }
        var bindXianliao = _back.getChildByName("bindXianliao");
        if(bindXianliao){
            bindXianliao.setVisible(false);
        }
        var bindXiangliao = _back.getChildByName("bindXiangliao");
        if(bindXiangliao){
            bindXiangliao.setVisible(false);
        }
        var bindChuiniu = _back.getChildByName("bindChuiniu");
        if(bindChuiniu){
            bindChuiniu.setVisible(false);
        }

        var Image_bg_2 = _back.getChildByName("Image_2");
        if(Image_bg_2){
            Image_bg_2.setVisible(false)
        }

        var node_photo = _back.getChildByName("node_photo");
        if (node_photo) {
            node_photo.setVisible(false);
        }

        this._back = _back;
        if (MjClient.data.sData && MjClient.data.sData.tData && tData.areaSelectMode.fangkaCount > 0)
            this.showZhuanYanProp();

        return true;
    },
    showZhuanYanProp: function() {
        var files = ["caishen.png", "chanchu.png", "fengche.png", "jubaopen.png"];
        var w = 130;
        var x = (this._back.width - w * 5) / 2 + w / 2;
        var y = 20 + w / 2;
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ) 
            y += 20;
        var tData = MjClient.data.sData.tData;
        var roomId = tData.tableid;
        var index = FriendCard_Common.getFangkaLevelByAreaSelectMode().index;
        var maxTimes = FriendCard_Common.fangkaPayConfig.zhuangYunPropMaxTimes[index] || 0;
       
        var times = maxTimes;
        if (roomId == util.localStorageEncrypt.getNumberItem("ZHUAN_YAN_PROP_ROOMID", -1)) {
            times = util.localStorageEncrypt.getNumberItem("ZHUAN_YAN_PROP_TIMES", maxTimes); 
            if (times > maxTimes)
                times = maxTimes;
        }
        for (var i = 0; i < files.length; i++) {
            var prop = new ccui.Button("fangKa/prop/" + files[i]);
            prop.setPosition(x, y);
            prop.index = i;
            prop.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    MjClient.gamenet.request("pkroom.handler.tableMsg", {
                        cmd: "MJChat",
                        uid: SelfUid(),
                        type: 5,
                        msg: "",
                        num: sender.index
                    });
                    util.localStorageEncrypt.setNumberItem("ZHUAN_YAN_PROP_TIMES", times - 1);
                    util.localStorageEncrypt.setNumberItem("ZHUAN_YAN_PROP_ROOMID", roomId);
                    MjClient.userInfoLayerUi.removeFromParent();
                    MjClient.userInfoLayerUi = null;
                }
            });
            this._back.addChild(prop);
            x += w;
            prop.setEnabled(times > 0);
        }

        var text1 = new ccui.Text("剩余", "fonts/lanting.TTF", 24);
        var text2 = new ccui.Text("" + times, "fonts/lanting.TTF", 24);
        var text3 = new ccui.Text("次", "fonts/lanting.TTF", 24);
        text1.setTextColor(cc.color(0x40, 0x40, 0x40));
        text2.setTextColor(cc.color(0xE0, 0x40, 0x40));
        text3.setTextColor(cc.color(0x40, 0x40, 0x40));
        text1.setPosition(x, y + 20);
        text2.setPosition(x - (text2.width + text3.width)/2 + text2.width/2, y - 10);
        text3.setPosition(x + (text2.width + text3.width)/2 - text3.width/2, y - 10);
        this._back.addChild(text1);
        this._back.addChild(text2);
        this._back.addChild(text3);
    },
    editBoxReturn: function (editBox)
    {
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.updateSignature",{signature:escape(editBox.getString())},function(rtn){
            if(rtn.code==0)
            {
                MjClient.showToast("更新个性签名成功");
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("更新个性签名失败");
            }
            MjClient.unblock();
        });
    }
});

//主界面头像调用
var PlayerInfoBindView1 = cc.Layer.extend({
    pinfo:null,
    jsBind:{
        back:{
            headImg:{
                _event: {
                    loadWxHead: function (d) {
                        if (d.uid == MjClient.userInfoLayerUi.pinfo.uid) {
                            if (isJinZhongAPPType() ||
                                MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || 
                                MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                                MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
                            {
                                var clippingNode = new cc.ClippingNode();
                                var mask = new cc.Sprite("home/zhezhao.png");
                                clippingNode.setAlphaThreshold(0);
                                clippingNode.setStencil(mask);
                                var img = new cc.Sprite(d.img);
                                img.setScale(mask.getContentSize().width/img.getContentSize().width);
                                clippingNode.addChild(img);
                                this.addChild(clippingNode);
                                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                                    MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                                    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                                    MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                                    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
                                {
                                    clippingNode.setScale(0.95);
                                    clippingNode.setPosition(this.getContentSize().width/1.613,this.getContentSize().height/1.9);
                                }else{
                                    clippingNode.setScale(0.97);
                                    clippingNode.setPosition(this.getContentSize().width/2,this.getContentSize().height/2);  
                                }
                                //邵阳换皮调整头像坐标和大小
                                if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || 
                                    MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType() ||
                                    MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) {
                                    clippingNode.setScale(1.1);
                                    clippingNode.setPosition(this.getContentSize().width/2,this.getContentSize().height/2);
                                }
                                if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ) {
                                    clippingNode.setScale(1);
                                    clippingNode.setPosition(this.getContentSize().width/2,this.getContentSize().height/2);
                                }
                                //遮罩框
                                var hideblock = new cc.Sprite("home/homeHeadCusPic.png");
                                if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                                    clippingNode.setScale(1.42);
                                    clippingNode.setPosition(this.getContentSize().width/2,this.getContentSize().height/2 - 8);
                                    hideblock.setTexture("ui/userInfo/touxiangk_01.png");
                                }
                                if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ) {
                                    hideblock.setScale(1.1)
                                    clippingNode.addChild(hideblock,-1);
                                }
                                else
                                {
                                    hideblock.setPosition(hideblock.getContentSize().width/2,hideblock.getContentSize().height/2);
                                    this.addChild(hideblock);
                                }
                            }
                            else
                            {
                                var sp = new cc.Sprite(d.img);
                                this.addChild(sp);
                                setWgtLayout(sp, [0.88, 0.88], [0.5, 0.5], [0, 0], false, true);
                            }
                        }
                    }
                }
            }
        }
    },
    initPhotoShow: function (_back, userInfoLayerUi) {
        var photoNode = _back.getChildByName("node_photo")
        var photo = photoNode.getChildByName("img_photo");
        var updatePhotoBtn = photoNode.getChildByName("btn_updatePhoto");

        function refreshPhoto(url) {
            cc.loader.loadImg(url, {
                isCrossOrigin: true
            }, function(err, texture) {
                if (!err && texture && sys.isObjectValid(photo)) {
                    var sp = new cc.Sprite(texture);
                    photo.removeChildByName("sp");
                    photo.removeChildByName("tip");
                    photo.addChild(sp);
                    sp.setName("sp");
                    sp.setPosition(photo.width / 2, photo.height / 2);
                    sp.setScale(photo.width / sp.width < photo.height / sp.height ? photo.width / sp.width : photo.height / sp.height);
                }
            });
        }

        function postPhoto(file) {
            var data = jsb.fileUtils.getDataFromFile(file);
            cc.log("postPhoto:", data ? "data.length=" + data.length : "data=null");
            if (data.length > 512000) {
                cc.log("----test 1-----");
                MjClient.showToastDelay("你选择的图片过大");
                cc.log("----test 2-----");
                return;
            }

			// data 是一个特殊的对像，使用转成数组
            var dataStr = [];
            for (var i = 0; i < data.length; i++) {
                dataStr[i] = data[i];
            }

            var index = file.lastIndexOf(".");
            var sendData = {
                suffix: index != -1 ? file.substring(index) : ".jpg",
                data: dataStr
            }
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.updateInfo", sendData, function(rtn) {
                MjClient.unblock();
                cc.log("postPhoto request ret:", JSON.stringify(rtn));
                if (rtn.message)
                    MjClient.showMsg(rtn.message);
            });
        }

        if (MjClient.data.pinfo.photo)
            refreshPhoto(MjClient.data.pinfo.photo);
        else {
            var tipLabel = new ccui.Text();
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)   //岳阳同一使用方正兰亭
                tipLabel.setFontName("fonts/lanting.TTF");
            else
                tipLabel.setFontName(MjClient.fzcyfont);
            tipLabel.setString("添加个性头像\n让朋友更了解你吧");
            tipLabel.setColor(cc.color(0x44, 0x33, 0x33));
            tipLabel.setFontSize(26);
            tipLabel.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            tipLabel.setName("tip");
            tipLabel.setPosition(photo.width/2, photo.height/2);
            photo.addChild(tipLabel);
        }

        var selectPhotoBlock = userInfoLayerUi.node.getChildByName("selectPhotoBlock");
        setWgtLayout(selectPhotoBlock,[1,1],[0.5,0.5],[0,0],true);

        var selectPhotoNode = userInfoLayerUi.node.getChildByName("selectPhotoNode");
        setWgtLayout(selectPhotoNode, [1,1],[0.5,0.5],[0,0]);

        var cancelBtn = selectPhotoNode.getChildByName("btn_cancel");
        var selectPhotoBtn1 = selectPhotoNode.getChildByName("btn_selectPhoto1");
        var selectPhotoBtn2 = selectPhotoNode.getChildByName("btn_selectPhoto2"); 

        cancelBtn.addTouchEventListener(function (sender, type) {
            if(type == 2){
                selectPhotoBlock.setVisible(false);
                selectPhotoNode.setVisible(false);
            }
        },this);

        selectPhotoBtn1.addTouchEventListener(function (sender, type) {
            if(type == 2){
                selectPhotoBlock.setVisible(false);
                selectPhotoNode.setVisible(false);
                MjClient.native.pickPicture.showCamera();
            }
        },this);

        selectPhotoBtn2.addTouchEventListener(function (sender, type) {
            if(type == 2){
                selectPhotoBlock.setVisible(false);
                selectPhotoNode.setVisible(false);
                MjClient.native.pickPicture.showGallery();
            }
        },this);

        updatePhotoBtn.addTouchEventListener(function (sender, type) {
            if(type == 2){
                selectPhotoBlock.setVisible(true);
                selectPhotoNode.setVisible(true);
            }
        },this);

        UIEventBind(null, this, "PickPictureFinished", function(rtn) {
            cc.log("PickPictureFinished:", rtn.file);
            if (rtn.file)
                postPhoto(rtn.file);
            cc.log("---------end--------");
        });

        UIEventBind(null, this, "updateInfo", function(rtn) {
            if (rtn.photo)
                refreshPhoto(rtn.photo);
        });
    },
    ctor:function (pinfo,canEditSignature, showMoney) {
        this._super();
        this.pinfo = pinfo;
        var userInfoLayerUi = ccs.load("UserInfo.json");
        BindUiAndLogic(userInfoLayerUi.node,this.jsBind);
        this.addChild(userInfoLayerUi.node);
        MjClient.userInfoLayerUi=this;

        var that = this;
        var _block = userInfoLayerUi.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = userInfoLayerUi.node.getChildByName("back");
        setWgtLayout(_back, [0.6,0.75],[0.5,0.5],[0,0]);

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) 
        {
            setWgtLayout(_back, [0.75,0.75],[0.5,0.5],[0,0]);
        }

        //姓名
        var _name = _back.getChildByName("name");
        var _nameStr = unescape(pinfo.nickname);
        _name.ignoreContentAdaptWithSize(true);
        _name.setString(getNewName (_nameStr,12));
        _name.setFontName("Arial");
        _name.setFontSize(_name.getFontSize());

        //实名认证
        var btnRenzheng = new ccui.Button("usernfo/btn_smrz.png","","usernfo/btn_ysm.png");
        _back.addChild(btnRenzheng);
        btnRenzheng.setEnabled(!pinfo.identityNum);
        btnRenzheng.setAnchorPoint(cc.p(0, 0.5));
        btnRenzheng.addTouchEventListener(function(sender,type){
            if(type == 2) {
                MjClient.Scene.addChild(new shiMingRenZhengLayer());
            }
        });
        var rzPos = _name.getPosition();
        rzPos.x += 250;
        btnRenzheng.setPosition(rzPos);

        //关闭 按钮
        var _btnClose = _back.getChildByName("close");
        _btnClose.addTouchEventListener(function (sender, Type)
        {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    that.removeFromParent();
                    break;
                default :
                    break;
            }
        }, this);

        
        //头像
        var _headImg = _back.getChildByName("headImg");
        MjClient.loadWxHead(pinfo.uid,pinfo.headimgurl);

        //ID
        var _ID = _back.getChildByName("ID");
        _ID.setString("ID:"+pinfo.uid);
        _ID.ignoreContentAdaptWithSize(true);

        var _signature = _back.getChildByName("signature");
        _signature.setVisible(false);//又双叒叕去掉个性签名。。。
        _signature.setString("个性签名:"+unescape(pinfo.signature));
        if(pinfo.uid == SelfUid() && canEditSignature)
        {
            _signature.setVisible(false);
            this._textFeildName = new cc.EditBox(cc.size(430,100), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
            this._textFeildName.setFontColor(cc.color(255,255,255));
            this._textFeildName.setMaxLength(17*3);
            this._textFeildName.setFontSize(24);
            this._textFeildName.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            this._textFeildName.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
            this._textFeildName.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            this._textFeildName.setPlaceHolder("点击输入个性签名");
            this._textFeildName.setPlaceholderFontSize(24);
            this._textFeildName.setPosition(520,270);
            _back.addChild(this._textFeildName);
            this._textFeildName.setString(unescape(pinfo.signature));
            this._textFeildName.setDelegate(this);
            this._textFeildName.setVisible(false);
            this._textFeildName.setEnabled(false);
        }

        // if (MjClient.systemConfig.openUserInfoShare + "" == "true") {
        //     var shareBtn = new ccui.Button("share/btn_zhanjiShare.png");
        //     shareBtn.setPosition(_headImg.x, _headImg.y - _headImg.height/2 - 10 - 0.6 * shareBtn.height/2);
        //     if (MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
        //         MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
        //         MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ) {
        //         shareBtn.y -= 45;
        //     }
        //     else if (MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ) {
        //         shareBtn.y -= 25;
        //     }
        //
        //     shareBtn.setScale(0.6);
        //     _back.addChild(shareBtn);
        //     shareBtn.addTouchEventListener(function (sender, Type)
        //     {
        //         if (Type != ccui.Widget.TOUCH_ENDED)
        //             return;
        //
        //         MjClient.showMsg("注意保护隐私，请不要分享给他人！", function() {
        //             MjClient.block();
        //             MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 13 }, function (rtn) {
        //                 MjClient.unblock();
        //                 if (rtn.code == 0) {
        //                     MjClient.native.wxShareUrl(rtn.data, unescape(pinfo.nickname) + "的战绩", "个人记录请勿对外分享\n绿色健康游戏，享受美好生活");
        //                 }
        //                 else {
        //                     if (rtn.message) {
        //                         MjClient.showToast(rtn.message);
        //                     }
        //                     else {
        //                         MjClient.showToast("获取数据失败，请重试");
        //                     }
        //                 }
        //             });
        //         }, function() {}, "1");
        //
        //     }, this);
        // }

        // if (MjClient.systemConfig.openUserInfoShare + "" == "true") {
        //     var jinrushangcBtn = new ccui.Button("usernfo/shangCShouquan/btn_jinrushangcheng.png");
        //     jinrushangcBtn.setPosition(_headImg.x, _headImg.y - _headImg.height / 2 - 10 - 0.6 * jinrushangcBtn.height / 2);
        //     if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
        //         MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ) {
        //         jinrushangcBtn.y -= 45;
        //     }
        //     else if (MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ || MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
        //         jinrushangcBtn.y -= 25;
        //     }
        //     else if(MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ){
        //         jinrushangcBtn.x = 697.75;
        //         jinrushangcBtn.y = 312.90;
        //     }
        //
        //     _back.addChild(jinrushangcBtn);
        //     jinrushangcBtn.addTouchEventListener(function (sender, Type) {
        //         if (Type == ccui.Widget.TOUCH_ENDED) {
        //             cc.log("wxdkokokokok" + util.localStorageEncrypt.getBoolItem("_Disclaimer_NoRem_", false));
        //             if (util.localStorageEncrypt.getBoolItem("_Disclaimer_Agree_", false) && util.localStorageEncrypt.getBoolItem("_Disclaimer_NoRem_", false)) {
        //                 MjClient.block();
        //                 MjClient.gamenet.request("pkplayer.handler.openBrowser", {type: 16}, function (rtn) {
        //                     MjClient.unblock();
        //                     if (rtn.code == 0) {
        //                         MjClient.native.OpenUrl(rtn.data);
        //                         //MjClient.native.wxShareUrl(rtn.data, unescape(pinfo.nickname) + "的战绩", "个人记录请勿对外分享\n绿色健康游戏，享受美好生活");
        //                     }
        //                     else {
        //                         if (rtn.message) {
        //                             MjClient.showToast(rtn.message);
        //                         }
        //                         else {
        //                             MjClient.showToast("获取数据失败，请重试");
        //                         }
        //                     }
        //                 });
        //             } else {
        //                 MjClient.Scene.addChild(new disclaimerReminderLayer());
        //             }
        //         }
        //     }, this);
        //
        //     //商城授权
        //     var btnShangchengshouquan = new ccui.Button("usernfo/shangCShouquan/btn_shangchengshouquan.png");
        //     if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ
        //         || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ
        //         || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) {
        //         btnShangchengshouquan.setPosition(jinrushangcBtn.x, jinrushangcBtn.y - jinrushangcBtn.height);
        //     } else {
        //         btnShangchengshouquan.setPosition(jinrushangcBtn.x + jinrushangcBtn.width, jinrushangcBtn.y);
        //     }
        //
        //     _back.addChild(btnShangchengshouquan);
        //     btnShangchengshouquan.addTouchEventListener(function (sender, Type) {
        //         if (Type == ccui.Widget.TOUCH_ENDED) {
        //             MjClient.Scene.addChild(new authorizationStoreLayer())
        //         }
        //     }, this);
        //
        //     //好友商城
        //     var btnHaoyoushangc = new ccui.Button("usernfo/shangCShouquan/btn_haoyoushangc.png");
        //     if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ
        //         || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ
        //         || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) {
        //         btnHaoyoushangc.setPosition(jinrushangcBtn.x, jinrushangcBtn.y - 2 * jinrushangcBtn.height);
        //     } else {
        //         btnHaoyoushangc.setPosition(jinrushangcBtn.x + 2 * jinrushangcBtn.width, jinrushangcBtn.y);
        //     }
        //
        //     _back.addChild(btnHaoyoushangc);
        //     btnHaoyoushangc.addTouchEventListener(function (sender, Type) {
        //         if (Type == ccui.Widget.TOUCH_ENDED) {
        //             MjClient.Scene.addChild(new personalMallLayer())
        //         }
        //     }, this);
        // }

        //IP
        var _IP = _back.getChildByName("IP");
        _IP.ignoreContentAdaptWithSize(true);
        if (MjClient.remoteCfg.guestLogin)
        {
            var addressInfo = "地址:";
            var addressVec = JSON.parse(MjClient.native.GetAddress());
            for (var i=1; i<addressVec.length-1; i++)
            {
                addressInfo += addressVec[i];
            }
            _IP.setString(addressInfo);
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
            {
                _IP.setString(hideIP_paohuzi(addressInfo));
            }
        }
        else
        {
            var ipInfo = "";
            if(pinfo.remoteIP)
            {
                ipInfo = "IP:" + pinfo.remoteIP;
            }
            _IP.setString(ipInfo);
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
            {
                _IP.setString(hideIP_paohuzi(ipInfo));
            }
        }

        // if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
        //     _IP.setPosition(_name.x + _IP.getContentSize().width, 260);

        //     this.initPhotoShow(_back, userInfoLayerUi);
        // }

        //道具开关
        var _props = util.localStorageEncrypt.getBoolItem("_InteractiveProps", true);
        var _nodeProps,_fontSize;
        var _propsText = new ccui.Text();
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {//岳阳同一使用方正兰亭
            _propsText.setFontName("fonts/lanting.TTF");
        }
        _propsText.setName("text");
        _propsText.setString("使用互动道具");
        _propsText.setTouchEnabled(true);
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ) {
            _nodeProps = new ccui.CheckBox("createNewPng/daTC1_19.png", "createNewPng/daTC1_20.png");
            _nodeProps.setAnchorPoint(cc.p(0, 0));
            _ID.addChild(_nodeProps, 100);
            _nodeProps.setPosition(cc.p(0, -(_ID.height*3.1)));
            _propsText.setFontName(MjClient.fzcyfont);
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) 
            {
                _propsText.setFontName("fonts/lanting.TTF");
            }
            _fontSize = 27;
        }
        else if(isJinZhongAPPType()) {
            _nodeProps = new ccui.CheckBox("createNewPng/daTC1_19.png", "createNewPng/daTC1_20.png");
            _nodeProps.setAnchorPoint(cc.p(0, 0));
            _ID.addChild(_nodeProps, 100);
            _nodeProps.setPosition(cc.p(0, -(_ID.height*1.8)));
            _fontSize = 26;
            _propsText.setFontName("fonts/lanting.TTF");
        }
        else{
            _nodeProps = new ccui.CheckBox("game_picture/btn_cjxx_normal.png", "game_picture/btn_cjxx_press.png");
            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                _nodeProps = new ccui.CheckBox("ui/createRoom/cb_di.png", "ui/createRoom/gou.png");
            }
            _nodeProps.setAnchorPoint(cc.p(0, 0));
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
            {
                _ID.addChild(_nodeProps, 100);
            }else{
                _IP.addChild(_nodeProps, 100);
            }
            
            _nodeProps.setPosition(cc.p(0, -(_IP.height*1.5)));
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                _propsText.setFontName("fonts/lanting.TTF");
            }
            else {
                _propsText.setFontName(MjClient.fzcyfont);
            }
            _fontSize = 30;
        }
        _propsText.setPosition(cc.p(_nodeProps.getContentSize().width*3.5 + 10, _nodeProps.getContentSize().height/2));
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
        {
            _propsText.setPosition(cc.p(_nodeProps.getContentSize().width*3.5, _nodeProps.getContentSize().height/2));
        }
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            _nodeProps.setPositionY(-(_IP.height*1.5) - 65);
            _propsText.setFontName("fonts/lanting.TTF");
            _fontSize = 28;
        }
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
            _nodeProps.setPositionY(-(_IP.height*1.5) - 50);
        }
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
            _nodeProps.setPositionY(-(_IP.height*1.5) - 20);
        }
        _propsText.setTouchEnabled(true);
        _propsText.setFontSize(_fontSize);
        _nodeProps.setSelected(_props);
        selectedCB(_propsText, _props);
        _nodeProps.addChild(_propsText);
        _propsText.addTouchEventListener(function(sender,type){
            if(type == 2) {
                _nodeProps.setSelected(!_nodeProps.isSelected())
                selectedCB(_propsText, _nodeProps.isSelected());
                util.localStorageEncrypt.setBoolItem("_InteractiveProps", _nodeProps.isSelected());

            }
        });
        _nodeProps.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    selectedCB(_propsText, true);
                    util.localStorageEncrypt.setBoolItem("_InteractiveProps", true);
                    var key = "Zhujiemian_Selfinformation_Touxiang_Shiyonghudongdaoju_Xuanzhong";
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                     MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                    {
                        key = "Zhujiemian_Gerenzhuye_Hudongdaoju";
                    }
                    MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid(),open:1});
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    selectedCB(_propsText, false);
                    util.localStorageEncrypt.setBoolItem("_InteractiveProps", false);
                    var key = "Zhujiemian_Selfinformation_Touxiang_Shiyonghudongdaoju_Quxiaoxuanzhong";
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                    {
                        key = "Zhujiemian_Gerenzhuye_Hudongdaoju";
                    }
                    MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid(),open:0});
                    break;
            }
        }, _nodeProps);


        function selectedCB(text, isSelected) {
            if (isSelected) {
                text.setTextColor(CREATEROOM_COLOR_1);
            } else {
                text.setTextColor(CREATEROOM_COLOR_2);
            }
        }

        var geogData = [];
        if (MjClient.data.sData && MjClient.data.sData.tData)
        {
            var tData = MjClient.data.sData.tData;
            for (var i = 0; i < tData.uids.length; i++) {
                var pl = MjClient.data.sData.players[tData.uids[i]];
                if (pl && pl.locationMsg) {
                    geogData.push(pl.locationMsg);
                }
            }
        }

        function _getTextPre(index)
        {
            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                return ""; // 北斗衡阳屏蔽地理位置
            }
            if(geogData[index]){
                var plyPos = geogData[index].split(";");
                var uid = parseInt(plyPos[3]);
                var sData = MjClient.data.sData;
                var pl = sData.players[uid];
                return unescape(pl.info.nickname)+"的位置为：" ;
            }
            return "";
        }
        function getUserAddressInfo(index)
        {

            //主界面没有sData
            // var uid  = MjClient.data.sData.tData.uids[index];
            // var pl = MjClient.data.sData.players[uid];
            // var _address = pl.info.location.address;

            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                return ""; // 北斗衡阳屏蔽地理位置
            }
            var addressInfo = "";
            if (index >= geogData.length)
            {
                return addressInfo;
            }
            var plyPos = geogData[index].split(";");
            var addressStr = plyPos[4];

            // if(!_address)
            // {
            //     _address = addressStr;
            // }

            var addressVec = JSON.parse(addressStr);
            for (var i=0; i<addressVec.length-2; i++)//精确到街道
            {
                addressInfo += addressVec[i];
            }
            return addressInfo;
        }


        //玩家位置
        var Pos0 = _back.getChildByName("play0Pos");
        Pos0.setString(_getTextPre(0));

        var Pos1 = _back.getChildByName("play1Pos");
        Pos1.setString(_getTextPre(1));

        var Pos2 = _back.getChildByName("play2Pos");
        Pos2.setString(_getTextPre(2));

        var Pos3 = _back.getChildByName("play3Pos");
        Pos3.setString(_getTextPre(3));

        var Pos4 = _back.getChildByName("play4Pos");
        Pos4 && Pos4.setString(_getTextPre(4));


        //玩家经纬度
        var _play0Pos_0 = _back.getChildByName("play0Pos_0");
        _play0Pos_0.setString(getUserAddressInfo(0));
        _play0Pos_0.ignoreContentAdaptWithSize(true);

        var _play1Pos_0 = _back.getChildByName("play1Pos_0");
        _play1Pos_0.setString(getUserAddressInfo(1));
        _play1Pos_0.ignoreContentAdaptWithSize(true);

        var _play2Pos_0 = _back.getChildByName("play2Pos_0");
        _play2Pos_0.setString(getUserAddressInfo(2));
        _play2Pos_0.ignoreContentAdaptWithSize(true);

        //自己
        var _play3Pos_0 = _back.getChildByName("play3Pos_0");
        _play3Pos_0.setString(getUserAddressInfo(3));
        _play3Pos_0.ignoreContentAdaptWithSize(true);

        var _play4Pos_0 = _back.getChildByName("play4Pos_0");
        _play4Pos_0 && _play4Pos_0.setString(getUserAddressInfo(4));
        _play4Pos_0 && _play4Pos_0.ignoreContentAdaptWithSize(true);


        //获得钻石数量
        var _money = _back.getChildByName("money");
        _money.visible = !MjClient.remoteCfg.hideMoney && showMoney;
        var _num = _money.getChildByName("num");
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || 
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ|| 
            isJinZhongAPPType() ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
        {
            var _numBG = _money.getChildByName("yuanbao_BG");
            if(isJinZhongAPPType()){
                _numBG = _num.getChildByName("Image_18");
            }
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ){
                if(_money.getChildByName("Image_18_bg")){
                    _numBG = _money.getChildByName("Image_18_bg").getChildByName("Image_18");
                }
            }
            if (_numBG && MjClient.GoldHallLayer){
                _numBG.ignoreContentAdaptWithSize(true);
                if ( MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
                {
                    _money.width = _money.width * 1.1;
                    _num.setPositionX(_money.width * 0.60);
                }
                _numBG.loadTexture("game_picture/ico_jinbi.png");
                _num.setString(getJinbiStr(pinfo.gold)+"");
            }else{
                _num.setString(pinfo.money);
            }
        }else{
            _num.setString(pinfo.money);
        }
        _num.ignoreContentAdaptWithSize(true);
        var _num_fudai = _money.getChildByName("num_fudai");
        if (_num_fudai) {
            _num_fudai.setString(pinfo.limitMoney);
            _num_fudai.ignoreContentAdaptWithSize(true);
            _num_fudai.visible = false;
        }

        var bindPhoneNum = _back.getChildByName("bindPhoneNum");
        if(bindPhoneNum){
            var btnBindNum = bindPhoneNum.getChildByName("btn_bindNum");
            var btnModifyBind = bindPhoneNum.getChildByName("btn_modifyBind");
            btnBindNum.setScale9Enabled(false);
            btnModifyBind.setScale9Enabled(false);
            var pinfo = MjClient.data.pinfo;
            if(pinfo.mobileNum){
                btnModifyBind.setVisible(true);
                btnBindNum.setVisible(false);
            }else {
                btnModifyBind.setVisible(false);
                btnBindNum.setVisible(true);
            }
            btnBindNum.addTouchEventListener(function (sender, type) {
                if(type == 2){
                    var key = "Zhujiemian_Selfinformation_Touxiang_Bangdingshouji";
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                    {
                        key = "Zhujiemian_Gerenzhuye_Bangdingshouji";
                    }
                    MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid()});
                    that.removeFromParent();
                    MjClient.Scene.addChild(new bindPhoneNumNewLayer());
                }
            },this)

            var textSecurityCode = btnModifyBind.getChildByName("Text_securityCode");
            if (textSecurityCode)
                textSecurityCode.ignoreContentAdaptWithSize(true);

            var textPhoneNum = btnModifyBind.getChildByName("Text_phoneNum");
            if(pinfo.mobileNum) {
                textPhoneNum.setString(pinfo.mobileNum);
            }

            btnModifyBind.addTouchEventListener(function (sender, type) {
                if(type == 2){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Xiugaibangding", {uid:SelfUid()});
                    that.removeFromParent();
                    MjClient.Scene.addChild(new bindPhoneNumLayer(1));
                }
            },this)
        }
        var bindXianliao = _back.getChildByName("bindXianliao");
        if(bindXianliao){
            var btnBindXianliao = bindXianliao.getChildByName("btn_bindXianliao");
            var imgBindedXianliao = bindXianliao.getChildByName("img_bindedXianliao");
            var pinfo = MjClient.data.pinfo;
            if(pinfo.xianliaoid){
                imgBindedXianliao.setVisible(true);
                btnBindXianliao.setVisible(false);
            }else {
                imgBindedXianliao.setVisible(false);
                btnBindXianliao.setVisible(true);
            }
            btnBindXianliao.addTouchEventListener(function (sender, type) {
                if(type == 2){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingxiaoliao", {uid:SelfUid()});
                    MjClient.native.xlLogin("userInfo");
                }
            },this);
            UIEventBind(null, bindXianliao, "XL_USER_LOGIN", function(para) {
                if (cc.isString(para))
                {
                    para = JSON.parse(para);
                }

                if(para.openId)
                {
                    that.removeFromParent();
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.bindThirdLoginId",{xianliaoid:para.openId},function(rtn){
                        MjClient.unblock();
                        if(rtn.code==0) {
                            MjClient.showToast(rtn.message);
                        } else {
                            if (!cc.isUndefined(rtn.message))
                                MjClient.showToast(rtn.message);
                        }
                    });
                }
                else
                {
                    MjClient.showToastDelay("闲聊绑定失败，请重试");
                }
            });
        }
        var bindXiangliao = _back.getChildByName("bindXiangliao");
        if(bindXiangliao){
            if(MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP &&
                MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&
                MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP &&
                MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG &&
                MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ)
            {
                bindXiangliao.setVisible(false);
            }
            var btnBindXiangliao = bindXiangliao.getChildByName("btn_bindXiangliao");
            var imgBindedXiangliao = bindXiangliao.getChildByName("img_bindedXiangliao");
            var pinfo = MjClient.data.pinfo;
            if(pinfo.xiangliaoid){
                imgBindedXiangliao.setVisible(true);
                btnBindXiangliao.setVisible(false);
            }else {
                imgBindedXiangliao.setVisible(false);
                btnBindXiangliao.setVisible(true);
            }
            btnBindXiangliao.addTouchEventListener(function (sender, type) {
                if(type == 2){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingxiangliao", {uid:SelfUid()});
                    MjClient.native.xiangliaoLogin("userInfo");
                }
            },this);
            UIEventBind(null, bindXiangliao, "XIANGL_USER_LOGIN", function(para) {
                if (cc.isString(para))
                {
                    para = JSON.parse(para);
                }

                if(para.openId||para.opendId)
                {
                    if(para.opendId){
                        para.openId = para.opendId
                    }
                    that.removeFromParent();
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.bindThirdLoginId",{xiangliaoid:para.openId},function(rtn){
                        MjClient.unblock();
                        if(rtn.code==0) {
                            MjClient.showToast(rtn.message);
                        } else {
                            if (!cc.isUndefined(rtn.message))
                                MjClient.showToast(rtn.message);
                        }
                    });
                }
                else
                {
                    MjClient.showToastDelay("乡聊绑定失败，请重试");
                }
            });
        }

        var bindChuiniu = _back.getChildByName("bindChuiniu");
        if(bindChuiniu){
            bindChuiniu.setVisible(false);
            var btnBindChuiniu = bindChuiniu.getChildByName("btn_bindChuiniu");
            var imgBindedChuiniu = bindChuiniu.getChildByName("img_bindedChuiniu");
            var pinfo = MjClient.data.pinfo;
            if(pinfo.chuiniuid){
                imgBindedChuiniu.setVisible(true);
                btnBindChuiniu.setVisible(false);
            }else {
                imgBindedChuiniu.setVisible(false);
                btnBindChuiniu.setVisible(true);
            }
            btnBindChuiniu.addTouchEventListener(function (sender, type) {
                if(type == 2){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingchuiniu", {uid:SelfUid()});
                    MjClient.native.chuiniuLogin("userInfo");
                }
            },this);
            UIEventBind(null, bindChuiniu, "CN_USER_LOGIN", function(para) {
                if (cc.isString(para))
                {
                    para = JSON.parse(para);
                }

                if(para.openId||para.opendId)
                {
                    if(para.opendId){
                        para.openId = para.opendId
                    }
                    that.removeFromParent();
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.bindThirdLoginId",{chuiniuid:para.openId},function(rtn){
                        MjClient.unblock();
                        if(rtn.code==0) {
                            MjClient.showToast(rtn.message);
                        } else {
                            if (!cc.isUndefined(rtn.message))
                                MjClient.showToast(rtn.message);
                        }
                    });
                }
                else
                {
                    MjClient.showToastDelay("吹牛绑定失败，请重试");
                }
            });
        }

        return true;
    },

    editBoxReturn: function (editBox)
    {
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.updateSignature",{signature:escape(editBox.getString())},function(rtn){
            if(rtn.code==0)
            {
                MjClient.showToast("更新个性签名成功");
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("更新个性签名失败");
            }
            MjClient.unblock();
        });
    }
});


//主界面头像调用 新版~~~
var PlayerInfoBindView2 = cc.Layer.extend({
    pinfo:null,
    jsBind:{
        back:{
            node_info:{
                headImg:{
                    _event: {
                        loadWxHead: function (d) {
                            if (d.uid == MjClient.userInfoLayerUi.pinfo.uid) {

                                var sp = new cc.Sprite(d.img);
                                var _pos = {
                                    "x": this.getContentSize().width / 2,
                                    "y": this.getContentSize().height / 2
                                };
                                sp.setPosition(_pos);
                                sp.setScaleX((this.getContentSize().width - 5) / sp.getContentSize().width);
                                sp.setScaleY((this.getContentSize().height - 5) / sp.getContentSize().height);
                                this.addChild(sp);
                                // setWgtLayout(sp, [0.88, 0.88], [0.5, 0.5], [0, 0], false, true);
                                //遮罩框 用来 替换不同的头像框
                                // var _strKuang = MjClient.data.pinfo.aliasId || "TX0";
                                // if(_strKuang){
                                //     var hideblock = new cc.Sprite("userInfo_3.0/zhuangBan/headFrame/" + _strKuang +".png");
                                //     hideblock.setScaleX((this.getContentSize().width + 8) / hideblock.getContentSize().width);
                                //     hideblock.setScaleY((this.getContentSize().height + 8) / hideblock.getContentSize().height);
                                //     hideblock.setPosition(_pos);
                                //     hideblock.setName("hideblock");
                                //     this.addChild(hideblock);
                                // }
                                

                            }
                        }
                    }
                },
                headFrame:{
                    _run:function() {
                        this.visible = util.localStorageEncrypt.getBoolItem("_HeadKuangs", true);
                    },
                    _event: {
                        loadWxHead: function (d) {
                            if (d.uid == MjClient.userInfoLayerUi.pinfo.uid) {
                                var _strKuang = MjClient.data.pinfo.aliasId || "TX0";
                                this.loadTexture("userInfo_3.0/zhuangBan/headFrame/" + _strKuang +".png");                              
                            }
                        },
                        headFrameChange: function () {
                            this.visible = util.localStorageEncrypt.getBoolItem("_HeadKuangs", true);
                        }
                    }
                },
            }
            
        }
    },
    initPhotoShow: function (_back, userInfoLayerUi) {
        var photoNode = _node_info.getChildByName("node_photo")
        var photo = photoNode.getChildByName("img_photo");
        var updatePhotoBtn = photoNode.getChildByName("btn_updatePhoto");

        function refreshPhoto(url) {
            cc.loader.loadImg(url, {
                isCrossOrigin: true
            }, function(err, texture) {
                if (!err && texture && sys.isObjectValid(photo)) {
                    var sp = new cc.Sprite(texture);
                    photo.removeChildByName("sp");
                    photo.removeChildByName("tip");
                    photo.addChild(sp);
                    sp.setName("sp");
                    sp.setPosition(photo.width / 2, photo.height / 2);
                    sp.setScale(photo.width / sp.width < photo.height / sp.height ? photo.width / sp.width : photo.height / sp.height);
                }
            });
        }

        function postPhoto(file) {
            var data = jsb.fileUtils.getDataFromFile(file);
            cc.log("postPhoto:", data ? "data.length=" + data.length : "data=null");
            if (data.length > 512000) {
                cc.log("----test 1-----");
                MjClient.showToastDelay("你选择的图片过大");
                cc.log("----test 2-----");
                return;
            }

            // data 是一个特殊的对像，使用转成数组
            var dataStr = [];
            for (var i = 0; i < data.length; i++) {
                dataStr[i] = data[i];
            }

            var index = file.lastIndexOf(".");
            var sendData = {
                suffix: index != -1 ? file.substring(index) : ".jpg",
                data: dataStr
            }
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.updateInfo", sendData, function(rtn) {
                MjClient.unblock();
                cc.log("postPhoto request ret:", JSON.stringify(rtn));
                if (rtn.message)
                    MjClient.showMsg(rtn.message);
            });
        }

        if (MjClient.data.pinfo.photo)
            refreshPhoto(MjClient.data.pinfo.photo);
        else {
            var tipLabel = new ccui.Text();
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)   //岳阳同一使用方正兰亭
                tipLabel.setFontName("fonts/lanting.TTF");
            else
                tipLabel.setFontName(MjClient.fzcyfont);
            tipLabel.setString("添加个性头像\n让朋友更了解你吧");
            tipLabel.setColor(cc.color(0x44, 0x33, 0x33));
            tipLabel.setFontSize(26);
            tipLabel.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            tipLabel.setName("tip");
            tipLabel.setPosition(photo.width/2, photo.height/2);
            photo.addChild(tipLabel);
        }

        var selectPhotoBlock = userInfoLayerUi.node.getChildByName("selectPhotoBlock");
        setWgtLayout(selectPhotoBlock,[1,1],[0.5,0.5],[0,0],true);

        var selectPhotoNode = userInfoLayerUi.node.getChildByName("selectPhotoNode");
        setWgtLayout(selectPhotoNode, [1,1],[0.5,0.5],[0,0]);

        var cancelBtn = selectPhotoNode.getChildByName("btn_cancel");
        var selectPhotoBtn1 = selectPhotoNode.getChildByName("btn_selectPhoto1");
        var selectPhotoBtn2 = selectPhotoNode.getChildByName("btn_selectPhoto2"); 

        cancelBtn.addTouchEventListener(function (sender, type) {
            if(type == 2){
                selectPhotoBlock.setVisible(false);
                selectPhotoNode.setVisible(false);
            }
        },this);

        selectPhotoBtn1.addTouchEventListener(function (sender, type) {
            if(type == 2){
                selectPhotoBlock.setVisible(false);
                selectPhotoNode.setVisible(false);
                MjClient.native.pickPicture.showCamera();
            }
        },this);

        selectPhotoBtn2.addTouchEventListener(function (sender, type) {
            if(type == 2){
                selectPhotoBlock.setVisible(false);
                selectPhotoNode.setVisible(false);
                MjClient.native.pickPicture.showGallery();
            }
        },this);

        updatePhotoBtn.addTouchEventListener(function (sender, type) {
            if(type == 2){
                selectPhotoBlock.setVisible(true);
                selectPhotoNode.setVisible(true);
            }
        },this);

        UIEventBind(null, this, "PickPictureFinished", function(rtn) {
            cc.log("PickPictureFinished:", rtn.file);
            if (rtn.file)
                postPhoto(rtn.file);
            cc.log("---------end--------");
        });

        UIEventBind(null, this, "updateInfo", function(rtn) {
            if (rtn.photo)
                refreshPhoto(rtn.photo);
        });
    },
    ctor:function (pinfo,canEditSignature, showMoney) {
        this._super();
        this.pinfo = pinfo;
        var userInfoLayerUi = ccs.load("UserInfo_2.json");
        BindUiAndLogic(userInfoLayerUi.node,this.jsBind);
        this.addChild(userInfoLayerUi.node);
        MjClient.userInfoLayerUi=this;

        var that = this;
        var _block = userInfoLayerUi.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = userInfoLayerUi.node.getChildByName("back");
        setWgtLayout(_back, [1,1],[0.5,0.5],[0,0]);

        var _suizi = _back.getChildByName("suizi");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);

        // if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || 
        //     MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
        //     MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        //     MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        //     MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
        //     MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) 
        // {
        //     setWgtLayout(_back, [0.75,0.75],[0.5,0.5],[0,0]);
        // }

        //关闭 按钮
        var _btnClose = _back.getChildByName("close");
        _btnClose.addTouchEventListener(function (sender, Type)
        {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    that.removeFromParent();
                    break;
                default :
                    break;
            }
        }, this);
        this._node_info = _back.getChildByName("node_info");
        this._node_guizu = _back.getChildByName("node_guizu");
        this._node_zhuangban = _back.getChildByName("node_zhuangban");

        this._btn_info = _back.getChildByName("btn_info");
        this._btn_info.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                MjClient.showToast("==== 1")
                this.select_btn(1);
            }
        }, this);
        this._btn_guizu = _back.getChildByName("btn_guizu");
        this._btn_guizu.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                MjClient.showToast("==== 2")
                this.select_btn(2);
            }
        }, this);
        this._btn_zhuangban = _back.getChildByName("btn_zhuangban");
        this._btn_zhuangban.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                MjClient.showToast("==== 3")
                this.select_btn(3);
            }
        }, this);

        this._btn_info.visible = false;
        this._btn_guizu.visible = false;
        this._btn_zhuangban.visible = false;     

        this.init_info(pinfo,canEditSignature, showMoney);
        this.select_btn(1)

        return true;
    },
    select_btn:function(number){
        this._node_info.visible = (number == 1);
        this._node_guizu.visible = (number == 2);
        this._node_zhuangban.visible = (number == 3);
        this._btn_info.setBright(number !== 1);
        this._btn_guizu.setBright(number !== 2);
        this._btn_zhuangban.setBright(number !== 3);
    },

    init_info:function(pinfo,canEditSignature, showMoney){
        var that = this;
        var _node_info = this._node_info;
        //姓名
        var _name = _node_info.getChildByName("name");
        var _nameStr = unescape(pinfo.nickname);
        _name.ignoreContentAdaptWithSize(true);
        _name.setString(getNewName (_nameStr,12));
        _name.setFontName("Arial");
        _name.setFontSize(_name.getFontSize());

        

        
        //头像
        var _headImg = _node_info.getChildByName("headImg");
        MjClient.loadWxHead(pinfo.uid,pinfo.headimgurl);

        //ID
        var _ID = _node_info.getChildByName("ID");
        _ID.setString("ID:"+pinfo.uid);
        _ID.ignoreContentAdaptWithSize(true);

        var _signature = _node_info.getChildByName("signature");
        _signature.setVisible(false);//又双叒叕去掉个性签名。。。
        _signature.setString("个性签名:"+unescape(pinfo.signature));
        if(pinfo.uid == SelfUid() && canEditSignature)
        {
            _signature.setVisible(false);
            this._textFeildName = new cc.EditBox(cc.size(430,100), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
            this._textFeildName.setFontColor(cc.color(255,255,255));
            this._textFeildName.setMaxLength(17*3);
            this._textFeildName.setFontSize(24);
            this._textFeildName.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            this._textFeildName.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
            this._textFeildName.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            this._textFeildName.setPlaceHolder("点击输入个性签名");
            this._textFeildName.setPlaceholderFontSize(24);
            this._textFeildName.setPosition(520,270);
            _node_info.addChild(this._textFeildName);
            this._textFeildName.setString(unescape(pinfo.signature));
            this._textFeildName.setDelegate(this);
            this._textFeildName.setVisible(false);
            this._textFeildName.setEnabled(false);
        }

        var isShow = (MjClient.systemConfig.openUserInfoShare + "" == "true");
        var jinrushangcBtn = _node_info.getChildByName("btn_jrsc");
        //jinrushangcBtn.setVisible(isShow);
        jinrushangcBtn.setVisible(false);
        jinrushangcBtn.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                cc.log("wxdkokokokok" + util.localStorageEncrypt.getBoolItem("_Disclaimer_NoRem_", false));
                if (util.localStorageEncrypt.getBoolItem("_Disclaimer_Agree_", false) && util.localStorageEncrypt.getBoolItem("_Disclaimer_NoRem_", false)) {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.openBrowser", {type: 16}, function (rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            MjClient.native.OpenUrl(rtn.data);
                            //MjClient.native.wxShareUrl(rtn.data, unescape(pinfo.nickname) + "的战绩", "个人记录请勿对外分享\n绿色健康游戏，享受美好生活");
                        }
                        else {
                            if (rtn.message) {
                                MjClient.showToast(rtn.message);
                            }
                            else {
                                MjClient.showToast("获取数据失败，请重试");
                            }
                        }
                    });
                } else {
                    MjClient.Scene.addChild(new disclaimerReminderLayer());
                }
            }
        }, this);
        
        

        //商城授权
        var btnShangchengshouquan = _node_info.getChildByName("btn_scsq");
        //btnShangchengshouquan.setVisible(isShow);
        btnShangchengshouquan.setVisible(false);
        btnShangchengshouquan.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new authorizationStoreLayer())
            }
        }, this);
        
        

        //好友商城
        var btnHaoyoushangc = _node_info.getChildByName("btn_hysc");
        //btnHaoyoushangc.setVisible(isShow);
        btnHaoyoushangc.setVisible(false);
        btnHaoyoushangc.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new personalMallLayer())
            }
        }, this);
        

        //换头像
        var btn_htxk = _node_info.getChildByName("btn_htxk");
        btn_htxk.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                
            }
        }, this); 
        btn_htxk.visible = false;     

        // if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
        //     var _btnHongBao = new ccui.Button("usernfo/btn_myHB.png");
        //     // _btnHongBao.loadTextureNormal("usernfo/btn_myHB.png");
        //     _btnHongBao.setPosition(cc.p(175, 250));
        //     _node_info.addChild(_btnHongBao);
        //     _btnHongBao.addTouchEventListener(function(sender, Type) {
        //         switch (Type) {
        //             case ccui.Widget.TOUCH_ENDED:
        //                 that.addChild(new friendcard_redPackage_record(1));
        //                 break;
        //             default:
        //                 break;
        //         }
        //     }, this);
        // }

        //IP
        var _IP = _node_info.getChildByName("IP");
        _IP.ignoreContentAdaptWithSize(true);
        if (MjClient.remoteCfg.guestLogin)
        {
            var addressInfo = "地址:";
            var addressVec = JSON.parse(MjClient.native.GetAddress());
            for (var i=1; i<addressVec.length-1; i++)
            {
                addressInfo += addressVec[i];
            }
            _IP.setString(addressInfo);
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
            {
                _IP.setString(hideIP_paohuzi(addressInfo));
            }
        }
        else
        {
            var ipInfo = "";
            if(pinfo.remoteIP)
            {
                ipInfo = "IP:" + pinfo.remoteIP;
            }
            _IP.setString(ipInfo);
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
            {
                _IP.setString(hideIP_paohuzi(ipInfo));
            }
        }

        //实名认证
        var btnRenzheng = new ccui.Button("usernfo/btn_smrz.png","","usernfo/btn_ysm.png");
        _node_info.addChild(btnRenzheng);
        btnRenzheng.setEnabled(!pinfo.identityNum);
        btnRenzheng.setAnchorPoint(cc.p(0, 0.5));
        btnRenzheng.addTouchEventListener(function(sender,type){
            if(type == 2) {
                MjClient.Scene.addChild(new shiMingRenZhengLayer());
            }
        });
        var rzPos = _ID.getPosition();
        btnRenzheng.setPosition(rzPos);
        _ID.x = _IP.x = _name.x;
        _IP.y = _name.y - 35;
        _ID.y = _IP.y - 35;


        //道具开关
        var _props = util.localStorageEncrypt.getBoolItem("_InteractiveProps", true);
        var _nodeProps = _node_info.getChildByName("checkBox_tools");
        var _propsText = _nodeProps.getChildByName("Text_1");
        _nodeProps.setSelected(_props);
        selectedCB(_propsText, _props);
        _propsText.addTouchEventListener(function(sender,type){
            if(type == 2) {
                _nodeProps.setSelected(!_nodeProps.isSelected())
                selectedCB(_propsText, _nodeProps.isSelected());
                util.localStorageEncrypt.setBoolItem("_InteractiveProps", _nodeProps.isSelected());

            }
        });
        _nodeProps.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    selectedCB(_propsText, true);
                    util.localStorageEncrypt.setBoolItem("_InteractiveProps", true);
                    var key = "Zhujiemian_Selfinformation_Touxiang_Shiyonghudongdaoju_Xuanzhong";
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                     MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                    {
                        key = "Zhujiemian_Gerenzhuye_Hudongdaoju";
                    }
                    MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid(),open:1});
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    selectedCB(_propsText, false);
                    util.localStorageEncrypt.setBoolItem("_InteractiveProps", false);
                    var key = "Zhujiemian_Selfinformation_Touxiang_Shiyonghudongdaoju_Quxiaoxuanzhong";
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                    {
                        key = "Zhujiemian_Gerenzhuye_Hudongdaoju";
                    }
                    MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid(),open:0});
                    break;
            }
        }, _nodeProps);

        //头像框开关
        var _kuangs = util.localStorageEncrypt.getBoolItem("_HeadKuangs", true);
        var _nodeKuangs = _node_info.getChildByName("checkBox_headK");
        if(_nodeKuangs){
            var _kuangsText = _nodeKuangs.getChildByName("Text_1");
            _nodeKuangs.setSelected(_kuangs);
            selectedCB(_kuangsText, _kuangs);
            _kuangsText.addTouchEventListener(function(sender,type){
                if(type == 2) {
                    _nodeKuangs.setSelected(!_nodeKuangs.isSelected())
                    selectedCB(_kuangsText, _nodeKuangs.isSelected());
                    util.localStorageEncrypt.setBoolItem("_HeadKuangs", _nodeKuangs.isSelected());
                    postEvent("headFrameChange");
                }
            });
            _nodeKuangs.addEventListener(function(sender,type)
            {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        selectedCB(_kuangsText, true);
                        util.localStorageEncrypt.setBoolItem("_HeadKuangs", true);
                        postEvent("headFrameChange");
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        selectedCB(_kuangsText, false);
                        util.localStorageEncrypt.setBoolItem("_HeadKuangs", false);
                        postEvent("headFrameChange");
                        break;
                }
            }, _nodeKuangs);
        }

        //入场动画开关
        var _animates = util.localStorageEncrypt.getBoolItem("_RuChangAni", true);
        var _nodeAnimates = _node_info.getChildByName("checkBox_animate");
        if(_nodeAnimates){
            var _animatesText = _nodeAnimates.getChildByName("Text_1");
            _nodeAnimates.setSelected(_animates);
            selectedCB(_animatesText, _animates);
            _animatesText.addTouchEventListener(function(sender,type){
                if(type == 2) {
                    _nodeAnimates.setSelected(!_nodeAnimates.isSelected())
                    selectedCB(_animatesText, _nodeAnimates.isSelected());
                    util.localStorageEncrypt.setBoolItem("_RuChangAni", _nodeAnimates.isSelected());
                }
            });
            _nodeAnimates.addEventListener(function(sender,type)
            {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        selectedCB(_animatesText, true);
                        util.localStorageEncrypt.setBoolItem("_RuChangAni", true);
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        selectedCB(_animatesText, false);
                        util.localStorageEncrypt.setBoolItem("_RuChangAni", false);
                        break;
                }
            }, _nodeAnimates);
        }


        function selectedCB(text, isSelected) {
            if (isSelected) {
                text.setTextColor(CREATEROOM_COLOR_1);
            } else {
                text.setTextColor(CREATEROOM_COLOR_2);
            }
        }


        //获得钻石数量
        var _money = _node_info.getChildByName("money");
        if (_money) {
            var _num = _money.getChildByName("num");
            _num.setString(pinfo.money);
            _num.ignoreContentAdaptWithSize(true);
            // _money.addTouchEventListener(function(sender, Type) {
            //     if (Type == ccui.Widget.TOUCH_ENDED) {
            //         MjClient.Scene.addChild(enter_store(0));
            //     }
            // }, this);
        }


        var _zuanshi = _node_info.getChildByName("zuanshi");
        _zuanshi.visible = false;
        // if (_zuanshi) {
        //     var _num = _zuanshi.getChildByName("num");
        //     _num.setString(pinfo.fangka);
        //     _num.ignoreContentAdaptWithSize(true);
        //     // _zuanshi.addTouchEventListener(function(sender, Type) {
        //     //     if (Type == ccui.Widget.TOUCH_ENDED) {
        //     //         MjClient.Scene.addChild(enter_store(1));
        //     //     }
        //     // }, this);

        //     if(this.isJS_skin()){
        //         _zuanshi.visible = false;
        //     }
        // }


        var liquan = _node_info.getChildByName("liquan");
        liquan.visible = false;
        // if (liquan) {
        //     liquan.setTouchEnabled(false);
        //     var _num = liquan.getChildByName("num");
        //     _num.setString(pinfo.integral);
        //     _num.ignoreContentAdaptWithSize(true);
        //     if(this.isJS_skin()){
        //         liquan.x -= 150;
        //     }
        // }
        

        var img_gztq = _node_info.getChildByName("img_gztq");
        if (img_gztq) {

            var str_gz = pinfo.userGrade > 0 ? pinfo.userGrade : 0;
            img_gztq.loadTexture("userInfo_3.0/guiZu/gz_0" + str_gz + ".png")
            img_gztq.addTouchEventListener(function(sender, Type) {
                if (Type == ccui.Widget.TOUCH_ENDED) {
                    this.select_btn(2);
                }
            }, this);
            var btn_cktq = _node_info.getChildByName("btn_cktq");
            btn_cktq.addTouchEventListener(function(sender, Type) {
                if (Type == ccui.Widget.TOUCH_ENDED) {
                    this.select_btn(2);
                }
            }, this);

            // 这个版本不开放功能
            img_gztq.setTouchEnabled(false);
            img_gztq.setVisible(false);
            btn_cktq.setVisible(false);
        }
        

        // if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            var bindPhoneNum = _node_info.getChildByName("ScrollView_5")//.getChildByName("bindPhoneNum");
            bindPhoneNum.visible = false;
        // }else {
        //     var bindPhoneNum = _node_info.getChildByName("bindPhoneNum");
        // }
        // if(bindPhoneNum){
        //     var btnBindNum = bindPhoneNum.getChildByName("btn_bindNum");
        //     var btnModifyBind = bindPhoneNum.getChildByName("btn_modifyBind");
        //     var pinfo = MjClient.data.pinfo;
        //     if(pinfo.mobileNum){
        //         btnModifyBind.setVisible(true);
        //         btnBindNum.setVisible(false);
        //     }else {
        //         btnModifyBind.setVisible(false);
        //         btnBindNum.setVisible(true);
        //     }
        //     btnBindNum.getChildByName("img_tip").visible = false;
        //     btnBindNum.addTouchEventListener(function (sender, type) {
        //         if(type == 2){
        //             var key = "Zhujiemian_Selfinformation_Touxiang_Bangdingshouji";
        //             if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
        //                 MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
        //                 MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
        //                 MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
        //                 MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        //                 MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        //                 MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
        //             {
        //                 key = "Zhujiemian_Gerenzhuye_Bangdingshouji";
        //             }
        //             MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid()});
        //             that.removeFromParent();
        //             MjClient.Scene.addChild(new bindPhoneNumNewLayer());
        //         }
        //     },this)

        //     var textSecurityCode = btnModifyBind.getChildByName("Text_securityCode");
        //     if (textSecurityCode)
        //         textSecurityCode.ignoreContentAdaptWithSize(true);

        //     var textPhoneNum = btnModifyBind.getChildByName("Text_phoneNum");
        //     if(pinfo.mobileNum) {
        //         textPhoneNum.setString(pinfo.mobileNum);
        //     }

        //     btnModifyBind.addTouchEventListener(function (sender, type) {
        //         if(type == 2){
        //             MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Xiugaibangding", {uid:SelfUid()});
        //             that.removeFromParent();
        //             MjClient.Scene.addChild(new bindPhoneNumLayer(1));
        //         }
        //     },this)
        // }
        // if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            // var bindWeixin = _node_info.getChildByName("ScrollView_5").getChildByName("bindWeixin");
        // }else {
            // var bindWeixin = _node_info.getChildByName("bindWeixin");
        // }
        // bindWeixin.visible = false;
        // if(bindWeixin){
        //     var btnBindWeixin = bindWeixin.getChildByName("btn_bindWeixin");
        //     var imgBindedWeixin = bindWeixin.getChildByName("img_bindedWeixin");
        //     // var text_Code = bindWeixin.getChildByName("Image_Code").getChildByName("Text_1");
        //     var pinfo = MjClient.data.pinfo;
        //     if(pinfo.openid && pinfo.openid.indexOf("openid") == -1){
        //         imgBindedWeixin.setVisible(true);
        //         btnBindWeixin.setVisible(false);
        //         // text_Code.ignoreContentAdaptWithSize(true);
        //         // text_Code.setString(getNewName(pinfo.xianliaoid, 11));
        //         bindWeixin.getChildByName("Image_Code").visible = false;
        //     }else {
        //         imgBindedWeixin.setVisible(false);
        //         btnBindWeixin.setVisible(true);
        //     }
        //     btnBindWeixin.addTouchEventListener(function (sender, type) {
        //         if(type == 2){
        //             MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingweixin", {uid:SelfUid()});
        //             MjClient.native.wxLogin("userInfo");
        //         }
        //     },this);
        //     //register event weChat login call back  注册函数 ，微信登录成功回调
        //     UIEventBind(null,bindWeixin,"WX_USER_LOGIN",function(para)
        //     {
        //         if (cc.isString(para))
        //         {
        //             para = JSON.parse(para);
        //         }

        //         if(para.openid)
        //         {
        //             that.removeFromParent();
        //             cc.loader.loadTxt(jsb.fileUtils.getWritablePath()+"nickname.txt",
        //                 function(er,txt){
        //                     if(txt)
        //                     {
        //                         para.nickname=escape(txt);
        //                     }
        //                     LoginByWeChatAccountUser(para);
        //                 });
        //         }
        //         else
        //         {
        //             MjClient.showToastDelay("绑定微信失败，请重试");

        //         }

        //     });
        //     // UIEventBind(null, bindWeixin, "WX_USER_LOGIN", function(para) {
        //     //     if (cc.isString(para))
        //     //     {
        //     //         para = JSON.parse(para);
        //     //     }
        //     //
        //     //     if(para.openId)
        //     //     {
        //     //         that.removeFromParent();
        //     //         MjClient.block();
        //     //         MjClient.gamenet.request("pkplayer.handler.bindWeChat",{xianliaoid:para.openId},function(rtn){
        //     //             MjClient.unblock();
        //     //             if(rtn.code==0) {
        //     //                 MjClient.showToast(rtn.message);
        //     //             } else {
        //     //                 if (!cc.isUndefined(rtn.message))
        //     //                     MjClient.showToast(rtn.message);
        //     //             }
        //     //         });
        //     //     }
        //     //     else
        //     //     {
        //     //         MjClient.showToastDelay("微信绑定失败，请重试");
        //     //     }
        //     // });
        // }
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            var bindXianliao = _node_info.getChildByName("ScrollView_5").getChildByName("bindXianliao");
        }else {
            var bindXianliao = _node_info.getChildByName("bindXianliao");
        }
        if(bindXianliao){
            var btnBindXianliao = bindXianliao.getChildByName("btn_bindXianliao");
            var imgBindedXianliao = bindXianliao.getChildByName("img_bindedXianliao");
            // var text_Code = bindXianliao.getChildByName("Image_Code").getChildByName("Text_1");
            var pinfo = MjClient.data.pinfo;
            if(pinfo.xianliaoid){
                imgBindedXianliao.setVisible(true);
                btnBindXianliao.setVisible(false);
                // text_Code.ignoreContentAdaptWithSize(true);
                // text_Code.setString(getNewName(pinfo.xianliaoid, 11));
                bindXianliao.getChildByName("Image_Code").visible = false;
            }else {
                imgBindedXianliao.setVisible(false);
                btnBindXianliao.setVisible(true);
            }
            btnBindXianliao.addTouchEventListener(function (sender, type) {
                if(type == 2){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingxiaoliao", {uid:SelfUid()});
                    MjClient.native.xlLogin("userInfo");
                }
            },this);
            UIEventBind(null, bindXianliao, "XL_USER_LOGIN", function(para) {
                if (cc.isString(para))
                {
                    para = JSON.parse(para);
                }

                if(para.openId)
                {
                    that.removeFromParent();
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.bindThirdLoginId",{xianliaoid:para.openId},function(rtn){
                        MjClient.unblock();
                        if(rtn.code==0) {
                            MjClient.showToast(rtn.message);
                        } else {
                            if (!cc.isUndefined(rtn.message))
                                MjClient.showToast(rtn.message);
                        }
                    });
                }
                else
                {
                    MjClient.showToastDelay("闲聊绑定失败，请重试");
                }
            });
        }
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            var bindXiangliao = _node_info.getChildByName("ScrollView_5").getChildByName("bindXiangliao");
        }else {
            var bindXiangliao = _node_info.getChildByName("bindXiangliao");
        }
        if(bindXiangliao){
            if(MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP &&
                MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&
                MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP &&
                MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG &&
                MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ)
            {
                bindXiangliao.setVisible(false);
            }
            var btnBindXiangliao = bindXiangliao.getChildByName("btn_bindXiangliao");
            var imgBindedXiangliao = bindXiangliao.getChildByName("img_bindedXiangliao");
            // var text_Code = bindXiangliao.getChildByName("Image_Code").getChildByName("Text_1");
            var pinfo = MjClient.data.pinfo;
            if(pinfo.xiangliaoid){
                imgBindedXiangliao.setVisible(true);
                btnBindXiangliao.setVisible(false);
                // text_Code.ignoreContentAdaptWithSize(true);
                // text_Code.setString(getNewName(pinfo.xiangliaoid, 11));
                bindXiangliao.getChildByName("Image_Code").visible = false;
            }else {
                imgBindedXiangliao.setVisible(false);
                btnBindXiangliao.setVisible(true);
            }
            btnBindXiangliao.addTouchEventListener(function (sender, type) {
                if(type == 2){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingxiangliao", {uid:SelfUid()});
                    MjClient.native.xiangliaoLogin("userInfo");
                }
            },this);
            UIEventBind(null, bindXiangliao, "XIANGL_USER_LOGIN", function(para) {
                if (cc.isString(para))
                {
                    para = JSON.parse(para);
                }

                if(para.openId||para.opendId)
                {
                    if(para.opendId){
                        para.openId = para.opendId
                    }
                    that.removeFromParent();
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.bindThirdLoginId",{xiangliaoid:para.openId},function(rtn){
                        MjClient.unblock();
                        if(rtn.code==0) {
                            MjClient.showToast(rtn.message);
                        } else {
                            if (!cc.isUndefined(rtn.message))
                                MjClient.showToast(rtn.message);
                        }
                    });
                }
                else
                {
                    MjClient.showToastDelay("乡聊绑定失败，请重试");
                }
            });
        }

        var bindDuoliao = _node_info.getChildByName("bindDuoliao");
        if (bindDuoliao) {
            var btnBindDuoliao = bindDuoliao.getChildByName("btn_bindDuoliao");
            var imgBindedDuoliao = bindDuoliao.getChildByName("img_bindedDuoliao");
            var isBindedDuoliao = !!MjClient.data.pinfo.duoliaoid;
            btnBindDuoliao.setVisible(!isBindedDuoliao);
            imgBindedDuoliao.setVisible(isBindedDuoliao);
            bindDuoliao.getChildByName("Image_Code").setVisible(!isBindedDuoliao);
            btnBindDuoliao.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    MjClient.native.dlLogin("userInfo");
                }
            }, this);
            UIEventBind(null, bindDuoliao, "DL_USER_LOGIN", function(para) {
                if (cc.isString(para)) {
                    para = JSON.parse(para);
                }

                if (para.openId) {
                    that.removeFromParent();
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.bindThirdLoginId", {
                        duoliaoid: para.openId
                    }, function(rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            MjClient.showToast(rtn.message);
                        } else {
                            if (!cc.isUndefined(rtn.message))
                                MjClient.showToast(rtn.message);
                        }
                    });
                } else {
                    MjClient.showToastDelay("多聊绑定失败，请重试");
                }
            });
        }

        var bindMowang = _node_info.getChildByName("bindMowang");
        if (bindMowang && !MjClient.remoteCfg.mowangLogin) {
            bindMowang.setVisible(false);
        }
        else if (bindMowang) {
            var btnBindMowang = bindMowang.getChildByName("btn_bindMowang");
            var imgBindedMowang = bindMowang.getChildByName("img_bindedMowang");
            var isBindedMowang = !!MjClient.data.pinfo.mowangid;
            btnBindMowang.setVisible(!isBindedMowang);
            imgBindedMowang.setVisible(isBindedMowang);
            bindMowang.getChildByName("Image_Code").setVisible(!isBindedMowang);
            btnBindMowang.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    MjClient.native.moWangLogin("userInfo");
                }
            }, this);
            UIEventBind(null, bindMowang, "MOWANG_USER_LOGIN", function(para) {
                if (cc.isString(para)) {
                    para = JSON.parse(para);
                }

                if (para.open_id) {
                    that.removeFromParent();
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.bindThirdLoginId", {
                        mowangid: para.open_id
                    }, function(rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            MjClient.showToast(rtn.message);
                        } else {
                            if (!cc.isUndefined(rtn.message))
                                MjClient.showToast(rtn.message);
                        }
                    });
                } else {
                    MjClient.showToastDelay("默往绑定失败，请重试");
                }
            });
        }
    },

    isJS_skin:function(){
        if(MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ || 
           MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ ){
            return true;
        }
        return false;
    },

    editBoxReturn: function (editBox)
    {
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.updateSignature",{signature:escape(editBox.getString())},function(rtn){
            if(rtn.code==0)
            {
                MjClient.showToast("更新个性签名成功");
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("更新个性签名失败");
            }
            MjClient.unblock();
        });
    }
});

//主界面头像调用 
var PlayerInfoBindView3 = cc.Layer.extend({
    pinfo:null,
    jsBind:{
        back:{
            node_info:{
                headImg:{
                    _event: {
                        loadWxHead: function (d) {
                            if (d.uid == MjClient.userInfoLayerUi.pinfo.uid) {

                                var sp = new cc.Sprite(d.img);
                                var _pos = {
                                    "x": this.getContentSize().width / 2,
                                    "y": this.getContentSize().height / 2
                                };
                                sp.setPosition(_pos);
                                sp.setScaleX((this.width) / sp.width);
                                sp.setScaleY((this.height) / sp.height);
                                this.addChild(sp);
                                // setWgtLayout(sp, [0.88, 0.88], [0.5, 0.5], [0, 0], false, true);

                            }
                        }
                    }
                },
                headFrame:{
                    _run:function() {
                        this.visible = util.localStorageEncrypt.getBoolItem("_HeadKuangs", true);
                    },
                    _event: {
                        loadWxHead: function (d) {
                            if (d.uid == MjClient.userInfoLayerUi.pinfo.uid) {
                                //遮罩框 用来 替换不同的头像框
                                var _strKuang = MjClient.data.pinfo.aliasId || "TX0";
                                this.loadTexture("userInfo_3.0/zhuangBan/headFrame/" + _strKuang +".png")
                            }
                        },
                        headFrameChange: function () {
                            this.visible = util.localStorageEncrypt.getBoolItem("_HeadKuangs", true);
                        }
                    }
                },
            },
            node_zhuangban:{
                node_touxiang:{
                    img_head:{
                        _event: {
                            loadWxHead: function (d) {
                                if (d.uid == MjClient.userInfoLayerUi.pinfo.uid) {
    
                                    var sp = new cc.Sprite(d.img);
                                    var _pos = {
                                        "x": this.getContentSize().width / 2,
                                        "y": this.getContentSize().height / 2
                                    };
                                    sp.setPosition(_pos);
                                    sp.setScaleX((this.getContentSize().width - 5) / sp.getContentSize().width);
                                    sp.setScaleY((this.getContentSize().height - 5) / sp.getContentSize().height);
                                    this.addChild(sp);
    
                                }
                            }
                        }
                    }
                }
            }
            
        }
    },
    initPhotoShow: function (_back, userInfoLayerUi) {
        var photoNode = _node_info.getChildByName("node_photo")
        var photo = photoNode.getChildByName("img_photo");
        var updatePhotoBtn = photoNode.getChildByName("btn_updatePhoto");

        function refreshPhoto(url) {
            cc.loader.loadImg(url, {
                isCrossOrigin: true
            }, function(err, texture) {
                if (!err && texture && sys.isObjectValid(photo)) {
                    var sp = new cc.Sprite(texture);
                    photo.removeChildByName("sp");
                    photo.removeChildByName("tip");
                    photo.addChild(sp);
                    sp.setName("sp");
                    sp.setPosition(photo.width / 2, photo.height / 2);
                    sp.setScale(photo.width / sp.width < photo.height / sp.height ? photo.width / sp.width : photo.height / sp.height);
                }
            });
        }

        function postPhoto(file) {
            var data = jsb.fileUtils.getDataFromFile(file);
            cc.log("postPhoto:", data ? "data.length=" + data.length : "data=null");
            if (data.length > 512000) {
                cc.log("----test 1-----");
                MjClient.showToastDelay("你选择的图片过大");
                cc.log("----test 2-----");
                return;
            }

            // data 是一个特殊的对像，使用转成数组
            var dataStr = [];
            for (var i = 0; i < data.length; i++) {
                dataStr[i] = data[i];
            }

            var index = file.lastIndexOf(".");
            var sendData = {
                suffix: index != -1 ? file.substring(index) : ".jpg",
                data: dataStr
            }
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.updateInfo", sendData, function(rtn) {
                MjClient.unblock();
                cc.log("postPhoto request ret:", JSON.stringify(rtn));
                if (rtn.message)
                    MjClient.showMsg(rtn.message);
            });
        }

        if (MjClient.data.pinfo.photo)
            refreshPhoto(MjClient.data.pinfo.photo);
        else {
            var tipLabel = new ccui.Text();
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)   //岳阳同一使用方正兰亭
                tipLabel.setFontName("fonts/lanting.TTF");
            else
                tipLabel.setFontName(MjClient.fzcyfont);
            tipLabel.setString("添加个性头像\n让朋友更了解你吧");
            tipLabel.setColor(cc.color(0x44, 0x33, 0x33));
            tipLabel.setFontSize(26);
            tipLabel.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            tipLabel.setName("tip");
            tipLabel.setPosition(photo.width/2, photo.height/2);
            photo.addChild(tipLabel);
        }

        var selectPhotoBlock = userInfoLayerUi.node.getChildByName("selectPhotoBlock");
        setWgtLayout(selectPhotoBlock,[1,1],[0.5,0.5],[0,0],true);

        var selectPhotoNode = userInfoLayerUi.node.getChildByName("selectPhotoNode");
        setWgtLayout(selectPhotoNode, [1,1],[0.5,0.5],[0,0]);

        var cancelBtn = selectPhotoNode.getChildByName("btn_cancel");
        var selectPhotoBtn1 = selectPhotoNode.getChildByName("btn_selectPhoto1");
        var selectPhotoBtn2 = selectPhotoNode.getChildByName("btn_selectPhoto2"); 

        cancelBtn.addTouchEventListener(function (sender, type) {
            if(type == 2){
                selectPhotoBlock.setVisible(false);
                selectPhotoNode.setVisible(false);
            }
        },this);

        selectPhotoBtn1.addTouchEventListener(function (sender, type) {
            if(type == 2){
                selectPhotoBlock.setVisible(false);
                selectPhotoNode.setVisible(false);
                MjClient.native.pickPicture.showCamera();
            }
        },this);

        selectPhotoBtn2.addTouchEventListener(function (sender, type) {
            if(type == 2){
                selectPhotoBlock.setVisible(false);
                selectPhotoNode.setVisible(false);
                MjClient.native.pickPicture.showGallery();
            }
        },this);

        updatePhotoBtn.addTouchEventListener(function (sender, type) {
            if(type == 2){
                selectPhotoBlock.setVisible(true);
                selectPhotoNode.setVisible(true);
            }
        },this);

        UIEventBind(null, this, "PickPictureFinished", function(rtn) {
            cc.log("PickPictureFinished:", rtn.file);
            if (rtn.file)
                postPhoto(rtn.file);
            cc.log("---------end--------");
        });

        UIEventBind(null, this, "updateInfo", function(rtn) {
            if (rtn.photo)
                refreshPhoto(rtn.photo);
        });
    },
    ctor:function (pinfo,canEditSignature, showMoney) {
        this._super();
        this.pinfo = pinfo;
        this._data = {};
        var userInfoLayerUi = ccs.load("UserInfo_3.0.json");
        BindUiAndLogic(userInfoLayerUi.node,this.jsBind);
        this.addChild(userInfoLayerUi.node);
        MjClient.userInfoLayerUi=this;
        this.init_guizu = false;
        this.init_zhuangban = false;
       

        var self = this;
        var _block = userInfoLayerUi.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = userInfoLayerUi.node.getChildByName("back");
        setWgtLayout(_back, [1,1],[0.5,0.5],[0,0]);

        var _suizi = _back.getChildByName("suizi");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);
        //关闭 按钮
        var _btnClose = _back.getChildByName("close");
        _btnClose.addTouchEventListener(function (sender, Type)
        {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    self.removeFromParent();
                    // postEvent("user_treasure_activity",{lotteryId:1});
                    break;
                default :
                    break;
            }
        }, this);
        this._node_info = _back.getChildByName("node_info");
        this._node_guizu = _back.getChildByName("node_guizu");
        this._node_zhuangban = _back.getChildByName("node_zhuangban");

        this._btn_info = _back.getChildByName("btn_info");
        this._btn_info.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                // MjClient.showToast("==== 1")
                this.select_btn(1);
            }
        }, this);
        this._btn_guizu = _back.getChildByName("btn_guizu");
        self._btn_guizu.getChildByName("img_hongdian").visible = false;
        this._btn_guizu.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                // MjClient.showToast("==== 2")
                this.select_btn(2);

                this.reqHuoDong_data();
                // this.init_guizu = false;
                // this.init_zhuangban = false;
                
            }
        }, this);
        this._btn_zhuangban = _back.getChildByName("btn_zhuangban");
        self._btn_zhuangban.getChildByName("img_hongdian").visible = false;
        this._btn_zhuangban.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                // MjClient.showToast("==== 3")
                this.select_btn(3);
                if(!this._initZB){
                    this.init_zhuangBan();
                }
                // this.init_guizu = false;
                // this.init_zhuangban = false;
            }
        }, this);

        this._btn_info.setTouchEnabled(false);
        this._btn_guizu.visible = false;
        this._btn_zhuangban.visible = false;

        this.init_tableInfo();
        this.init_info(pinfo,canEditSignature, showMoney);
        this.init_guiZu(pinfo);
        this.select_btn(1);
        // this.reqHuoDong_data();



        this.refresh_hongdian();
        this.refresh_baseInfo();

        return true;
    }, 

    init_tableInfo: function () {
        this.GZQY_tab = [{
            "length": 3,
            "bg_icon": 1,
            "1": "qy_32.png",
            "2": "qy_28.png",
            "3": "qy_17.png",
        }, {
            "length": 5,
            "bg_icon": 2,
            "1": "qy_33.png",
            "2": "qy_28.png",
            "3": "qy_17.png",
            "4": "qy_01.png",
            "5": "qy_20.png",
        }, {
            "length": 6,
            "bg_icon": 3,
            "1": "qy_34.png",
            "2": "qy_28.png",
            "3": "qy_16.png",
            "4": "qy_01.png",
            "5": "qy_21.png",
            "6": "qy_07.png",
        }, {
            "length": 7,
            "bg_icon": 4,
            "1": "qy_35.png",
            "2": "qy_28.png",
            "3": "qy_16.png",
            "4": "qy_01.png",
            "5": "qy_22.png",
            "6": "qy_08.png",
            "7": "qy_06.png",
        }, {
            "length": 8,
            "bg_icon": 5,
            "1": "qy_36.png",
            "2": "qy_28.png",
            "3": "qy_16.png",
            "4": "qy_01.png",
            "5": "qy_23.png",
            "6": "qy_09.png",
            "7": "qy_29.png",
            "8": "qy_05.png",
        }, {
            "length": 8,
            "bg_icon": 6,
            "1": "qy_37.png",
            "2": "qy_28.png",
            "3": "qy_18.png",
            "4": "qy_01.png",
            "5": "qy_24.png",
            "6": "qy_10.png",
            "7": "qy_31.png",
            "8": "qy_05.png",
        }, {
            "length": 9,
            "bg_icon": 7,
            "1": "qy_38.png",
            "2": "qy_28.png",
            "3": "qy_18.png",
            "4": "qy_01.png",
            "5": "qy_25.png",
            "6": "qy_11.png",
            "7": "qy_02.png",
            "8": "qy_05.png",
            "9": "qy_04.png",
        }, {
            "length": 10,
            "bg_icon": 8,
            "1": "qy_39.png",
            "2": "qy_28.png",
            "3": "qy_18.png",
            "4": "qy_01.png",
            "5": "qy_26.png",
            "6": "qy_12.png",
            "7": "qy_14.png",
            "8": "qy_05.png",
            "9": "qy_04.png",
            "10": "qy_41.png",
        }, {
            "length": 12,
            "bg_icon": 9,
            "1": "qy_40.png",
            "2": "qy_28.png",
            "3": "qy_19.png",
            "4": "qy_01.png",
            "5": "qy_27.png",
            "6": "qy_13.png",
            "7": "qy_30.png",
            "8": "qy_05.png",
            "9": "qy_04.png",
            "10": "qy_41.png",
            "11": "qy_03.png",
            "12": "qy_15.png",
        }];

        this.GZHD_tab = [{
            "img": "userInfo_3.0/guiZu/qy_32.png",
            "title": "每日登录经验",
            "gz_lv": 1,
            "hongdian": false,
            "opt": "lingqu",
            "status": 0,
            "isOpen":true,
            "desc": "贵族1的玩家，每日登录可以领取10点经验",
            "btn": ["userInfo_3.0/btn_lingqu.png", "userInfo_3.0/btn_lingqu.png", "userInfo_3.0/btn_yilingqu.png"]
        }, {
            "img": "userInfo_3.0/guiZu/qy_01.png",
            "title": "钻石理财",
            "gz_lv": 2,
            "hongdian": false,
            "opt": "licai",
            "status": 0,
            "isOpen":true,
            "desc": "贵族2的玩家，每日可下注钻石理财，次日完成指定有效场次，即可参与获得超本金的收益",
            "btn": ["userInfo_3.0//btn_licai.png", "userInfo_3.0//btn_licai.png"]
        }, {
            "img": "userInfo_3.0/guiZu/qy_05.png",
            "title": "祈福袋Lv1",
            "gz_lv": 5,
            "hongdian": false,
            "opt": "qifu1",
            "status": 0,
            "isOpen":true,
            "desc": "贵族5的玩家，可以进入祈福界面，开启祈福福袋，有机会开出各类装扮，乐币，钻石",
            "btn": ["userInfo_3.0//btn_qukankan.png", "userInfo_3.0//btn_qukankan.png"]
        }, {
            "img": "userInfo_3.0/guiZu/qy_04.png",
            "title": "祈福袋Lv2",
            "gz_lv": 7,
            "hongdian": false,
            "opt": "qifu2",
            "status": 0,
            "isOpen":true,
            "desc": "贵族7的玩家，可以进入祈福界面，开启高级祈福福袋，有机会开出各类装扮，乐币，钻石，现金红包",
            "btn": ["userInfo_3.0/btn_qukankan.png", "userInfo_3.0/btn_qukankan.png"]
        }, {
            "img": "userInfo_3.0/guiZu/qy_41.png",
            "title": "专属客服1V1",
            "gz_lv": 8,
            "hongdian": false,
            "opt": "kefu",
            "status": 0,
            "isOpen":true,
            "desc": "贵族8的玩家，可获得专属客服1V1服务，优先接入客\n服专线，可直接获取客服人员个人联系方式",
            "btn": ["userInfo_3.0/bg_weixinhaoma.png", "userInfo_3.0/bg_weixinhaoma.png"],
            "btn2": ["userInfo_3.0/bg_dianhuahaoma.png", "userInfo_3.0/bg_dianhuahaoma.png"]
        }, {
            "img": "userInfo_3.0/guiZu/qy_03.png",
            "title": "超幸运夺宝",
            "gz_lv": 9,
            "hongdian": false,
            "opt": "duobao",
            "status": 0,
            "isOpen":true,
            "desc": "贵族1的玩家钻石参与，贵族9的玩家乐币参与。专属大奖夺宝，不定期举行。奖品以大家电，手机为主。",
            "btn": ["userInfo_3.0/btn_qukankan.png", "userInfo_3.0/btn_qukankan.png"]
        }, {
            "img": "userInfo_3.0/guiZu/qy_15.png",
            "title": "节日关怀",
            "gz_lv": 9,
            "hongdian": false,
            "opt": "jieri",
            "status": 0,
            "isOpen":true,
            "desc": "贵族9的玩家，每当国家法定节日均可获得公司特殊的节日关怀。",
            "btn": ["userInfo_3.0/btn_qukankan.png", "userInfo_3.0/btn_qukankan.png"]
        }];

        this.Exp_tab = [300,1000,2000,4000,7000,12000,20000,50000,100000,100000,100000];

        this.LTBQ_tab = {
            "LTBQ1": "daxiao",
            "LTBQ2": "yihuo",
            "LTBQ3": "huaixiao",
            "LTBQ4": "yunle",
            "LTBQ5": "keshui",
            "LTBQ6": "weiqu",
            "LTBQ7": "aini",
            "LTBQ8": "jingle",
            "LTBQ9": "shiluo",
            "LTBQ10": "dengchang",
            "LTBQ11": "kuaidian",
            "LTBQ12": "zhenbang",
            "LTBQ13": "dacuopaile",
            "LTBQ14": "dalaozaici",
            "LTBQ15": "yiqifacai",
            "LTBQ16": "haixiu",
            "LTBQ17": "shanyaodengchang",
            "LTBQ18": "wolaile",
            "LTBQ19": "kuaidianba",
            "LTBQ20": "anzhongguancha",
            "LTBQ21": "ainio",
            "LTBQ22": "biepao",
            "LTBQ23": "yishoulanpai",
            "LTBQ24": "886",
            "LTBQ25": "shiliqiangmeibanfa",
        
        }
        this.LTBQ_nameTab = {
            "LTBQ1": "大笑",
            "LTBQ2": "疑惑",
            "LTBQ3": "坏笑",
            "LTBQ4": "晕了",
            "LTBQ5": "瞌睡",
            "LTBQ6": "委屈",
            "LTBQ7": "爱你",
            "LTBQ8": "震惊",
            "LTBQ9": "失落",
            "LTBQ10": "登场",
            "LTBQ11": "快点",
            "LTBQ12": "真棒",
            "LTBQ13": "打错牌了",
            "LTBQ14": "大佬在此",
            "LTBQ15": "发财",
            "LTBQ16": "害羞",
            "LTBQ17": "闪耀登场",
            "LTBQ18": "我来了",
            "LTBQ19": "快点吧",
            "LTBQ20": "暗中观察",
            "LTBQ21": "爱你哦",
            "LTBQ22": "别跑",
            "LTBQ23": "烂牌",
            "LTBQ24": "886",
            "LTBQ25": "实力强",
        
        }
        this.HDDJ_tab = {
            "HDDJ1":"xueqiu",
            "HDDJ3":"rengpingzi",
            "HDDJ5":"hongbao",
            "HDDJ7":"huanggua",
            "HDDJ9":"chuizi",
            "HDDJ10":"jiubei",
            "HDDJ11":"dangao",
            "HDDJ13":"jiguanqiang",
            "HDDJ14":"qinwen",
        }
    }, 

    select_btn:function(number){
        this._node_info.visible = (number == 1);
        this._node_guizu.visible = (number == 2);
        this._node_zhuangban.visible = (number == 3);
        this._btn_info.setBright(number !== 1);
        this._btn_info.getChildByName("Image_1").setVisible(number == 1);
        this._btn_info.getChildByName("Image_2").setVisible(number !== 1);
        this._btn_guizu.setBright(number !== 2);
        this._btn_guizu.getChildByName("Image_1").setVisible(number == 2);
        this._btn_guizu.getChildByName("Image_2").setVisible(number !== 2);
        this._btn_zhuangban.setBright(number !== 3);
        this._btn_zhuangban.getChildByName("Image_1").setVisible(number == 3);
        this._btn_zhuangban.getChildByName("Image_2").setVisible(number !== 3);
    },

    init_info:function(pinfo,canEditSignature, showMoney){
        var self = this;
        var _node_info = this._node_info;
        //姓名
        var _name = _node_info.getChildByName("name");
        var _nameStr = unescape(pinfo.nickname);
        _name.ignoreContentAdaptWithSize(true);
        _name.setString(getNewName (_nameStr,12));
        _name.setFontName("Arial");
        _name.setFontSize(_name.getFontSize());
        
        //头像
        // var _headImg = _node_info.getChildByName("headImg");
        MjClient.loadWxHead(pinfo.uid,pinfo.headimgurl);

        //ID
        var _ID = _node_info.getChildByName("ID");
        _ID.setString("ID:"+pinfo.uid);
        _ID.ignoreContentAdaptWithSize(true);

        var _signature = _node_info.getChildByName("signature");
        _signature.setVisible(false);//又双叒叕去掉个性签名。。。
        _signature.setString("个性签名:"+unescape(pinfo.signature));
        if(pinfo.uid == SelfUid() && canEditSignature)
        {
            _signature.setVisible(false);
            this._textFeildName = new cc.EditBox(cc.size(430,100), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
            this._textFeildName.setFontColor(cc.color(255,255,255));
            this._textFeildName.setMaxLength(17*3);
            this._textFeildName.setFontSize(24);
            this._textFeildName.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            this._textFeildName.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
            this._textFeildName.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            this._textFeildName.setPlaceHolder("点击输入个性签名");
            this._textFeildName.setPlaceholderFontSize(24);
            this._textFeildName.setPosition(520,270);
            _node_info.addChild(this._textFeildName);
            this._textFeildName.setString(unescape(pinfo.signature));
            this._textFeildName.setDelegate(this);
            this._textFeildName.setVisible(false);
            this._textFeildName.setEnabled(false);
        }

        var isShow = (MjClient.systemConfig.openUserInfoShare + "" == "true");
        var jinrushangcBtn = _node_info.getChildByName("btn_jrsc");
        //jinrushangcBtn.setVisible(isShow);
        jinrushangcBtn.setVisible(false);
        jinrushangcBtn.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                cc.log("wxdkokokokok" + util.localStorageEncrypt.getBoolItem("_Disclaimer_NoRem_", false));
                if (util.localStorageEncrypt.getBoolItem("_Disclaimer_Agree_", false) && util.localStorageEncrypt.getBoolItem("_Disclaimer_NoRem_", false)) {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.openBrowser", {type: 16}, function (rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            MjClient.native.OpenUrl(rtn.data);
                            //MjClient.native.wxShareUrl(rtn.data, unescape(pinfo.nickname) + "的战绩", "个人记录请勿对外分享\n绿色健康游戏，享受美好生活");
                        }
                        else {
                            if (rtn.message) {
                                MjClient.showToast(rtn.message);
                            }
                            else {
                                MjClient.showToast("获取数据失败，请重试");
                            }
                        }
                    });
                } else {
                    MjClient.Scene.addChild(new disclaimerReminderLayer());
                }
            }
        }, this);
        
        

        //商城授权
        var btnShangchengshouquan = _node_info.getChildByName("btn_scsq");
        //btnShangchengshouquan.setVisible(isShow);
        btnShangchengshouquan.setVisible(false);
        btnShangchengshouquan.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new authorizationStoreLayer())
            }
        }, this);
        
        

        //好友商城
        var btnHaoyoushangc = _node_info.getChildByName("btn_hysc");
        //btnHaoyoushangc.setVisible(isShow);
        btnHaoyoushangc.setVisible(false);
        btnHaoyoushangc.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new personalMallLayer())
            }
        }, this);
        

        //换头像
        var btn_htxk = _node_info.getChildByName("btn_htxk");
        btn_htxk.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                this.select_btn(3);
                if(!this._initZB){
                    this.init_zhuangBan();
                }
                
            }
        }, this); 
        btn_htxk.visible = false;     

        //IP
        var _IP = _node_info.getChildByName("IP");
        _IP.ignoreContentAdaptWithSize(true);
        if (MjClient.remoteCfg.guestLogin)
        {
            var addressInfo = "地址:";
            var addressVec = JSON.parse(MjClient.native.GetAddress());
            for (var i=1; i<addressVec.length-1; i++)
            {
                addressInfo += addressVec[i];
            }
            _IP.setString(addressInfo);
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
            {
                _IP.setString(hideIP_paohuzi(addressInfo));
            }
        }
        else
        {
            var ipInfo = "";
            if(pinfo.remoteIP)
            {
                ipInfo = "IP:" + pinfo.remoteIP;
            }
            _IP.setString(ipInfo);
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
            {
                _IP.setString(hideIP_paohuzi(ipInfo));
            }
        }

        //实名认证   img_renzheng  btn_shimingrenzheng  res\userInfo_3.0
        var btnRenzheng = _node_info.getChildByName("img_renzheng");//new ccui.Button("usernfo/btn_smrz.png","","usernfo/btn_ysm.png");
        btnRenzheng.setTouchEnabled(!pinfo.identityNum);
        btnRenzheng.addTouchEventListener(function(sender,type){
            if(type == 2) {
                MjClient.Scene.addChild(new shiMingRenZhengLayer());
                this.removeFromParent();
            }
        },this);

        if(!pinfo.identityNum){
            btnRenzheng.loadTexture("userInfo_3.0/btn_shimingrenzheng.png")
        }
        //道具开关
        var _props = util.localStorageEncrypt.getBoolItem("_InteractiveProps", true);
        var _nodeProps = _node_info.getChildByName("checkBox_tools");
        var _propsText = _nodeProps.getChildByName("Text_1");
        _nodeProps.setSelected(_props);
        selectedCB(_propsText, _props);
        _propsText.addTouchEventListener(function(sender,type){
            if(type == 2) {
                _nodeProps.setSelected(!_nodeProps.isSelected())
                selectedCB(_propsText, _nodeProps.isSelected());
                util.localStorageEncrypt.setBoolItem("_InteractiveProps", _nodeProps.isSelected());

            }
        });
        _nodeProps.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    selectedCB(_propsText, true);
                    util.localStorageEncrypt.setBoolItem("_InteractiveProps", true);
                    var key = "Zhujiemian_Selfinformation_Touxiang_Shiyonghudongdaoju_Xuanzhong";
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                     MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                    {
                        key = "Zhujiemian_Gerenzhuye_Hudongdaoju";
                    }
                    MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid(),open:1});
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    selectedCB(_propsText, false);
                    util.localStorageEncrypt.setBoolItem("_InteractiveProps", false);
                    var key = "Zhujiemian_Selfinformation_Touxiang_Shiyonghudongdaoju_Quxiaoxuanzhong";
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                    {
                        key = "Zhujiemian_Gerenzhuye_Hudongdaoju";
                    }
                    MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid(),open:0});
                    break;
            }
        }, _nodeProps);

        //头像框开关
        var _kuangs = util.localStorageEncrypt.getBoolItem("_HeadKuangs", true);
        var _nodeKuangs = _node_info.getChildByName("checkBox_headK");
        if(_nodeKuangs){
            var _kuangsText = _nodeKuangs.getChildByName("Text_1");
            _nodeKuangs.setSelected(_kuangs);
            selectedCB(_kuangsText, _kuangs);
            _kuangsText.addTouchEventListener(function(sender,type){
                if(type == 2) {
                    _nodeKuangs.setSelected(!_nodeKuangs.isSelected())
                    selectedCB(_kuangsText, _nodeKuangs.isSelected());
                    util.localStorageEncrypt.setBoolItem("_HeadKuangs", _nodeKuangs.isSelected());
                    postEvent("headFrameChange");
                }
            });
            _nodeKuangs.addEventListener(function(sender,type)
            {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        selectedCB(_kuangsText, true);
                        util.localStorageEncrypt.setBoolItem("_HeadKuangs", true);
                        postEvent("headFrameChange");
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        selectedCB(_kuangsText, false);
                        util.localStorageEncrypt.setBoolItem("_HeadKuangs", false);
                        postEvent("headFrameChange");
                        break;
                }
            }, _nodeKuangs);
        }

        //入场动画开关
        var _animates = util.localStorageEncrypt.getBoolItem("_RuChangAni", true);
        var _nodeAnimates = _node_info.getChildByName("checkBox_animate");
        if(_nodeAnimates){
            var _animatesText = _nodeAnimates.getChildByName("Text_1");
            _nodeAnimates.setSelected(_animates);
            selectedCB(_animatesText, _animates);
            _animatesText.addTouchEventListener(function(sender,type){
                if(type == 2) {
                    _nodeAnimates.setSelected(!_nodeAnimates.isSelected())
                    selectedCB(_animatesText, _nodeAnimates.isSelected());
                    util.localStorageEncrypt.setBoolItem("_RuChangAni", _nodeAnimates.isSelected());
                }
            });
            _nodeAnimates.addEventListener(function(sender,type)
            {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        selectedCB(_animatesText, true);
                        util.localStorageEncrypt.setBoolItem("_RuChangAni", true);
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        selectedCB(_animatesText, false);
                        util.localStorageEncrypt.setBoolItem("_RuChangAni", false);
                        break;
                }
            }, _nodeAnimates);
        }


        function selectedCB(text, isSelected) {
            if (isSelected) {
                text.setTextColor(CREATEROOM_COLOR_1);
            } else {
                text.setTextColor(CREATEROOM_COLOR_2);
            }
        }


        //获得钻石数量
        var _money = _node_info.getChildByName("money");
        if (_money) {
            var _num = _money.getChildByName("num");
            _num.setString(pinfo.money);
            _num.ignoreContentAdaptWithSize(true);
            _money.addTouchEventListener(function(sender, Type) {
                if (Type == ccui.Widget.TOUCH_ENDED) {
                    MjClient.Scene.addChild(enter_store(0));
                }
            }, this);
        }


        var _zuanshi = _node_info.getChildByName("zuanshi");
        if (_zuanshi) {
            var _num = _zuanshi.getChildByName("num");
            _num.setString(pinfo.fangka);
            _num.ignoreContentAdaptWithSize(true);
            _zuanshi.addTouchEventListener(function(sender, Type) {
                if (Type == ccui.Widget.TOUCH_ENDED) {
                    MjClient.Scene.addChild(enter_store(1));
                }
            }, this);

            if(this.isJS_skin()){
                _zuanshi.visible = false;
            }

        }


        var liquan = _node_info.getChildByName("liquan");
        if (liquan) {
            liquan.setTouchEnabled(false);
            var _num = liquan.getChildByName("num");
            _num.setString(pinfo.integral);
            _num.ignoreContentAdaptWithSize(true);
            if(this.isJS_skin()){
                liquan.x -= 150;
            }
        }
        

        var img_gztq = _node_info.getChildByName("img_gztq");
        if (img_gztq) {

            var str_gz = pinfo.userGrade > 0 ? pinfo.userGrade : 0;
            img_gztq.loadTexture("userInfo_3.0/guiZu/gz_0" + str_gz + ".png")
            img_gztq.addTouchEventListener(function(sender, Type) {
                if (Type == ccui.Widget.TOUCH_ENDED) {
                    this.select_btn(2);
                }
            }, this);
            var btn_cktq = _node_info.getChildByName("btn_cktq");
            btn_cktq.addTouchEventListener(function(sender, Type) {
                if (Type == ccui.Widget.TOUCH_ENDED) {
                    this.select_btn(2);
                }
            }, this);

            // 这个版本不开放功能
            img_gztq.setTouchEnabled(false);
            img_gztq.setVisible(false);
            btn_cktq.setVisible(false);
        }
        
        var _btnHongBao = _node_info.getChildByName("btn_myHB"); // new ccui.Button("usernfo/btn_myHB.png");
        _btnHongBao.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                        if(MjClient.isUseUIv3 && MjClient.isUseUIv3()){
                            self.addChild(new UserInfo_redPacket_v3(1));
                        }else{
                            self.addChild(new friendcard_redPackage_record(1));
                        }
                    
                    break;
                default:
                    break;
            }
        }, this);
        

        var bindPhoneNum = _node_info.getChildByName("bindPhoneNum");
        if(bindPhoneNum){
            var btnBindNum = bindPhoneNum.getChildByName("btn_bindNum");
            var btnModifyBind = bindPhoneNum.getChildByName("btn_modifyBind");
            var pinfo = MjClient.data.pinfo;
            if(pinfo.mobileNum){
                btnModifyBind.setVisible(true);
                btnBindNum.setVisible(false);
            }else {
                btnModifyBind.setVisible(false);
                btnBindNum.setVisible(true);
            }
            btnBindNum.getChildByName("img_tip").visible = false;
            btnBindNum.getChildByName("Image_securityCode_0").getChildByName("Text_1").visible = false;
            btnBindNum.addTouchEventListener(function (sender, type) {
                if(type == 2){
                    var key = "Zhujiemian_Selfinformation_Touxiang_Bangdingshouji";
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                    {
                        key = "Zhujiemian_Gerenzhuye_Bangdingshouji";
                    }
                    MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid()});
                    self.removeFromParent();
                    MjClient.Scene.addChild(new bindPhoneNumNewLayer());
                }
            },this)

            var textSecurityCode = btnModifyBind.getChildByName("Text_securityCode");
            if (textSecurityCode)
                textSecurityCode.ignoreContentAdaptWithSize(true);

            var textPhoneNum = btnModifyBind.getChildByName("Text_phoneNum");
            if(pinfo.mobileNum) {
                textPhoneNum.setString(pinfo.mobileNum);
            }

            btnModifyBind.addTouchEventListener(function (sender, type) {
                if(type == 2){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Xiugaibangding", {uid:SelfUid()});
                    self.removeFromParent();
                    MjClient.Scene.addChild(new bindPhoneNumLayer(1));
                }
            },this)
        }
        var bindXianliao = _node_info.getChildByName("bindXianliao");
        if(bindXianliao){
            var btnBindXianliao = bindXianliao.getChildByName("btn_bindXianliao");
            var imgBindedXianliao = bindXianliao.getChildByName("img_bindedXianliao");
            var pinfo = MjClient.data.pinfo;
            if(pinfo.xianliaoid){
                imgBindedXianliao.setVisible(true);
                btnBindXianliao.setVisible(false);
            }else {
                imgBindedXianliao.setVisible(false);
                btnBindXianliao.setVisible(true);
            }
            btnBindXianliao.addTouchEventListener(function (sender, type) {
                if(type == 2){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingxiaoliao", {uid:SelfUid()});
                    MjClient.native.xlLogin("userInfo");
                }
            },this);
            UIEventBind(null, bindXianliao, "XL_USER_LOGIN", function(para) {
                if (cc.isString(para))
                {
                    para = JSON.parse(para);
                }

                if(para.openId)
                {
                    self.removeFromParent();
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.bindThirdLoginId",{xianliaoid:para.openId},function(rtn){
                        MjClient.unblock();
                        if(rtn.code==0) {
                            MjClient.showToast(rtn.message);
                        } else {
                            if (!cc.isUndefined(rtn.message))
                                MjClient.showToast(rtn.message);
                        }
                    });
                }
                else
                {
                    MjClient.showToastDelay("闲聊绑定失败，请重试");
                }
            });
        }
        var bindXiangliao = _node_info.getChildByName("bindXiangliao");
        if(bindXiangliao){
            if(MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP &&
                MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&
                MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP &&
                MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG &&
                MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ)
            {
                bindXiangliao.setVisible(false);
            }
            var btnBindXiangliao = bindXiangliao.getChildByName("btn_bindXiangliao");
            var imgBindedXiangliao = bindXiangliao.getChildByName("img_bindedXiangliao");
            var pinfo = MjClient.data.pinfo;
            if(pinfo.xiangliaoid){
                imgBindedXiangliao.setVisible(true);
                btnBindXiangliao.setVisible(false);
            }else {
                imgBindedXiangliao.setVisible(false);
                btnBindXiangliao.setVisible(true);
            }
            btnBindXiangliao.addTouchEventListener(function (sender, type) {
                if(type == 2){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingxiangliao", {uid:SelfUid()});
                    MjClient.native.xiangliaoLogin("userInfo");
                }
            },this);
            UIEventBind(null, bindXiangliao, "XIANGL_USER_LOGIN", function(para) {
                if (cc.isString(para))
                {
                    para = JSON.parse(para);
                }

                if(para.openId||para.opendId)
                {
                    if(para.opendId){
                        para.openId = para.opendId
                    }
                    self.removeFromParent();
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.bindThirdLoginId",{xiangliaoid:para.openId},function(rtn){
                        MjClient.unblock();
                        if(rtn.code==0) {
                            MjClient.showToast(rtn.message);
                        } else {
                            if (!cc.isUndefined(rtn.message))
                                MjClient.showToast(rtn.message);
                        }
                    });
                }
                else
                {
                    MjClient.showToastDelay("乡聊绑定失败，请重试");
                }
            });

        }
        
    },

    refresh_baseInfo: function () {
        var self = this;
        UIEventBind(null, this, "updateInfo", function (d) {
            if (d && d.happyCy) {
                var text_lb = self._node_guizu.getChildByName("img_lb").getChildByName("Text_num");
                text_lb.ignoreContentAdaptWithSize(true);
                text_lb.setString(d.happyCy + "");

                var text_lb2 = self._node_zhuangban.getChildByName("img_lb").getChildByName("Text_num");
                text_lb2.ignoreContentAdaptWithSize(true);
                text_lb2.setString(d.happyCy + "");
            }

            if(d && d.fangka){
                var _zuanshi = self._node_info.getChildByName("zuanshi");
                var _num = _zuanshi.getChildByName("num");
                _num.setString(d.fangka);
            }

            if (d && d.grade) {
                var img_gztq = self._node_info.getChildByName("img_gztq");
                var str_gz = d.grade > 0 ? d.grade : 0;
                img_gztq.loadTexture("userInfo_3.0/guiZu/gz_0" + str_gz + ".png")
                var node_gzqy = self._node_guizu.getChildByName("node_gzqy");
                

                var _icon = node_gzqy.getChildByName("Image_1");
                _icon.loadTexture("userInfo_3.0/guiZu/gz_0" + d.grade + ".png");
                var _icon2 = node_gzqy.getChildByName("Image_2");
                var _grade = (d.grade + 1);
                if(_grade> 9) _grade= 9;
                _icon2.loadTexture("userInfo_3.0/guiZu/gz_0" + _grade + ".png");
                var _icon3 = node_gzqy.getChildByName("Image_3");
                _icon3.loadTexture("userInfo_3.0/icon_gui_" + _grade +".png");

                if (d.empirical) {
                    var loadBar = node_gzqy.getChildByName("LoadingBar_1");
                    var _per = d.empirical / self.Exp_tab[d.grade] * 100;
                    loadBar.setPercent(_per);
                }

            }

            if(d && d.aliasId){
                var _headImg = self._node_info.getChildByName("headImg");
                if(_headImg.getChildByName("hideblock"))
                    _headImg.getChildByName("hideblock").removeFromParent();
                var _strKuang = d.aliasId;
                var _pos = {
                    "x": _headImg.getContentSize().width / 2,
                    "y": _headImg.getContentSize().height / 2
                };
                var hideblock = new cc.Sprite("userInfo_3.0/zhuangBan/headFrame/" + _strKuang +".png");
                hideblock.setScaleX((_headImg.getContentSize().width) / hideblock.getContentSize().width);
                hideblock.setScaleY((_headImg.getContentSize().height) / hideblock.getContentSize().height);
                hideblock.setPosition(_pos);
                _headImg.addChild(hideblock);
            }
            

        });

    },

    init_guiZu:function(pinfo){
        var self = this;
        var _node = this._node_guizu;
        // pinfo.userGrade = 9;

        var node_gzqy = _node.getChildByName("node_gzqy");
        var node_gzhd = _node.getChildByName("node_gzhd");

        var  btn_gzqy = _node.getChildByName("btn_gzqy");
        btn_gzqy.getChildByName("img_hongdian").visible = false;
        btn_gzqy.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                btn_gzqy.setBright(false);
                btn_gzhd.setBright(true);
                node_gzqy.visible = true;
                node_gzhd.visible = false;
                
            }
        }, this);

        var  btn_gzhd = _node.getChildByName("btn_gzhd");
        btn_gzhd.getChildByName("img_hongdian").visible = false;
        btn_gzhd.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                btn_gzqy.setBright(true);
                btn_gzhd.setBright(false);
                node_gzqy.visible = false;
                node_gzhd.visible = true;
            }
        }, this);
        // var _data = MjClient.growInfoData;
        // var isShow = false;
        // if(_data){
        //     if(_data.diamondManageCraveUp && _data.diamondManageCraveUp.isShow){
        //         isShow = true;
        //     }
        //     if(_data.dailyLoginEmpirical && _data.dailyLoginEmpirical.isShow){
        //         isShow = true;
        //     }
        // }
        
        // btn_gzhd.getChildByName("img_hongdian").visible = isShow;
        this._btn_gzhd = btn_gzhd;

        var tip_bind = node_gzqy.getChildByName("tip_bind");
        var btn_go = tip_bind.getChildByName("btn_go");
        var pinfo = MjClient.data.pinfo;
        if (pinfo.mobileNum) {
            tip_bind.setVisible(false);
        }
        btn_go.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var key = "Zhujiemian_Selfinformation_Touxiang_Bangdingshouji";
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ) {
                    key = "Zhujiemian_Gerenzhuye_Bangdingshouji";
                }
                MjClient.native.umengEvent4CountWithProperty(key, { uid: SelfUid() });
                self.removeFromParent();
                MjClient.Scene.addChild(new bindPhoneNumNewLayer());
            }
        }, this)

        var  _icon = node_gzqy.getChildByName("Image_1");
        _icon.loadTexture("userInfo_3.0/guiZu/gz_0" + pinfo.userGrade + ".png");
        var _icon2 = node_gzqy.getChildByName("Image_2");
        var _grade = (pinfo.userGrade + 1);
        if(_grade> 9) _grade= 9;
        _icon2.loadTexture("userInfo_3.0/guiZu/gz_0" + _grade + ".png");
        var _icon3 = node_gzqy.getChildByName("Image_3");
        _icon3.loadTexture("userInfo_3.0/icon_gui_" + _grade +".png");

        var  Text_tip = node_gzqy.getChildByName("Text_tip");
        var _number = (this.Exp_tab[pinfo.userGrade] - pinfo.empirical)/10;
        Text_tip.setString("再打"+ Math.ceil(_number) +"场即可晋升");
        Text_tip.ignoreContentAdaptWithSize(true);


        var  loadBar = node_gzqy.getChildByName("LoadingBar_1");
        // pinfo.empirical = 160;
        var _per = pinfo.empirical/this.Exp_tab[pinfo.userGrade]*100;
        loadBar.setPercent(_per);
        
        var text_per =  loadBar.getChildByName("Text_11")
        text_per.setString(pinfo.empirical + "/" + this.Exp_tab[pinfo.userGrade])


        
        var  text_lb = _node.getChildByName("img_lb").getChildByName("Text_num");
        text_lb.ignoreContentAdaptWithSize(true);
        text_lb.setString(pinfo.happyCy + "");

        var  btn_rule = _node.getChildByName("btn_rule");
        var  img_rule = btn_rule.getChildByName("img_rule");
        img_rule.visible = false;
        btn_rule.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    img_rule.visible = true;
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;                
                case ccui.Widget.TOUCH_ENDED:
                case ccui.Widget.TOUCH_CANCELED:
                    img_rule.visible = false;
                    break;
                default:
                    break;
            }
        }, this);

        this.listView_hd = node_gzhd.getChildByName("ListView_2");
        this.cell_hd = node_gzhd.getChildByName("cell_2");
        this.cell_hd.visible = false;

        this.refresh_gzhd();

        this.listView_qy = node_gzqy.getChildByName("ListView_1");
        this.scrollView_qy = node_gzqy.getChildByName("ScrollView_1");
        this.cell_qy = node_gzqy.getChildByName("cell_1");
        this.cell_qy.visible = false;
        this.scrollView_qy.visible = false;

        var  btn_left = node_gzqy.getChildByName("btn_left");
        var  btn_right = node_gzqy.getChildByName("btn_right");
        this.addItem_quanyi();
        btn_left.addTouchEventListener(function(sender,type){
            if(type == 2){
                var _indexs = this.listView_qy.getItems().length;
                var _destion = this.listView_qy.getScrolledPercentHorizontal();
                var _du = 100/(_indexs-1);
                var _pos = Math.round(_destion/_du - 1) * (_du);

                var _destion = this.listView_qy.getScrolledPercentHorizontal();
                if(_pos <= 100 && _pos >=0)
                    self.listView_qy.jumpToPercentHorizontal(_pos);
                var _destion = this.listView_qy.getScrolledPercentHorizontal();
                if(_pos <= 0){
                    btn_left.visible = false;
                    btn_right.visible = true;
                }else if(_pos >= 100){
                    btn_right.visible = false;
                    btn_left.visible = true;
                }else{
                    btn_left.visible = true;
                    btn_right.visible = true;
                }
                
                
            }
        },this);
        
        btn_right.addTouchEventListener(function(sender,type){
            if(type == 2){

                var _indexs = this.listView_qy.getItems().length;
                var _destion = this.listView_qy.getScrolledPercentHorizontal();

                var _du = 100/(_indexs-1);
                var _pos = Math.round(_destion/_du + 1) * _du;
                
                if(_pos <= 100 && _pos >=0)
                    self.listView_qy.jumpToPercentHorizontal(_pos);
                var _destion = this.listView_qy.getScrolledPercentHorizontal(); ;
                if(_pos <= 0){
                    btn_left.visible = false;
                    btn_right.visible = true;
                }else if(_pos >= 100){
                    btn_right.visible = false;
                    btn_left.visible = true;
                }else{
                    btn_left.visible = true;
                    btn_right.visible = true;
                }
            }
        },this);

        btn_gzqy.setBright(false);
        btn_gzhd.setBright(true);
        node_gzqy.visible = true;
        node_gzhd.visible = false;
        

    },

    refresh_gzhd:function(){
        this.listView_hd.removeAllItems();
        var _tab = this.GZHD_tab;
        for (let index = 0; index < _tab.length; index++) {
            this.listView_hd.pushBackCustomItem(this.addItem_huodong(_tab[index], index));
        }

        
        // cc.log("=== lms ----MjClient.duoBaoPrizeData , !MjClient.duoBaoPrizeDataShow ",JSON.stringify(MjClient.duoBaoPrizeData) )

    },

    refresh_hongdian:function(){
        var self = this;
        var _showRedPoint = function(){
            if(MjClient.growInfoData){
                var d = MjClient.growInfoData;
                var isShow = false;
                var isShow_zhuangban = false;
                var isShow_zhuangban1 = false;
                var isShow_zhuangban2 = false;
                var isShow_zhuangban3 = false;
                var isShow_zhuangban4 = false;
                if(d){
                    this.GZHD_tab[0].hongdian = false;
                    if(d.dailyLoginEmpirical && d.dailyLoginEmpirical.isShow){
                        isShow = true;
                        this.GZHD_tab[0].hongdian = true;
                    }
                    this.GZHD_tab[1].hongdian = false;
                    if(d.diamondManageCraveUp && d.diamondManageCraveUp.isShow){
                        isShow = true;
                        this.GZHD_tab[1].hongdian = true;
                    }
                    this.GZHD_tab[2].hongdian = false;
                    if(d.dailyBlessingLv1Open && d.dailyBlessingLv1Open.isShow){
                        isShow = true;
                        this.GZHD_tab[2].hongdian = true;
                    }
                    this.GZHD_tab[3].hongdian = false;
                    if(d.dailyBlessingLv2Open && d.dailyBlessingLv2Open.isShow){
                        isShow = true;
                        this.GZHD_tab[3].hongdian = true;
                    }
    
                    if(d.prop1New && d.prop1New.isShow ){
                        isShow_zhuangban = true;
                        isShow_zhuangban1 = true;
                    }
                    if(d.prop2New && d.prop2New.isShow ){
                        isShow_zhuangban = true;
                        isShow_zhuangban2 = true;
                    }
                    if(d.prop3New && d.prop3New.isShow ){
                        isShow_zhuangban = true;
                        isShow_zhuangban3 = true;
                    }
                    if(d.prop4New && d.prop4New.isShow ){
                        isShow_zhuangban = true;
                        isShow_zhuangban4 = true;
                    }
    
                }
                self.refresh_gzhd();
                self._btn_guizu.getChildByName("img_hongdian").visible = isShow;
                self._btn_gzhd.getChildByName("img_hongdian").visible = isShow;
                self._btn_zhuangban.getChildByName("img_hongdian").visible = isShow_zhuangban;
                if(self._btnZB_touxiang){
                    self._btnZB_touxiang.getChildByName("img_hongdian").visible = isShow_zhuangban3;
                    // self._btnZB_donghua.getChildByName("img_hongdian").visible = isShow_zhuangban4;
                    self._btnZB_biaoqing.getChildByName("img_hongdian").visible = isShow_zhuangban1;
                    self._btnZB_daoju.getChildByName("img_hongdian").visible = isShow_zhuangban2;
                }
            }
        }.bind(this);
        _showRedPoint();
        UIEventBind(null, this, "user_growth_activity", function(d) {
            _showRedPoint();
        });

        
    },

    addItem_quanyi:function(){
        this.scrollView_qy.removeAllChildren();
        var _tab = this.GZQY_tab;

        for (let index = 0; index < _tab.length; index++) {
            this.listView_qy.pushBackCustomItem(this.createItem_qy(_tab[index]));
        }


    },
    createItem_qy:function(oneData){
        var self = this;
        var copyNode = this.scrollView_qy.clone();
        copyNode.setScrollBarWidth(5)
        copyNode.visible = true;

        
        if (Math.ceil(oneData.length / 5) > 2) {
            var _num = Math.ceil(oneData.length / 5);
            copyNode.setInnerContainerSize(cc.size(850, 145 * _num));
        }

        for (let index = 0; index < oneData.length; index++) {
            var cell = this.cell_qy.clone();
            var path = "userInfo_3.0/guiZu/" + oneData[index+1];
            cell.loadTexture(path);
            cell.visible = true;
            var pai = Math.floor(index / 5);
            var lie = index % 5;
            cell.setPosition(cc.p(160 * lie + 75, copyNode.getInnerContainerSize().height - (140 * pai + 70)));
            copyNode.addChild(cell);

        }

        return copyNode;



    },
    addItem_huodong:function(oneData, index){
		var copyNode = this.cell_hd.clone();
		copyNode.visible = true;

		var title = copyNode.getChildByName("title");
		title.ignoreContentAdaptWithSize(true);
        title.setString(oneData.title);

        var img_hongdian = copyNode.getChildByName("img_hongdian");
        img_hongdian.setZOrder(1);
        img_hongdian.setVisible(oneData.hongdian);

        var img_hongdian = copyNode.getChildByName("img_hongdian");
        
        var desc = copyNode.getChildByName("desc");
		// desc.ignoreContentAdaptWithSize(true);
        desc.setString(oneData.desc);

        var img_bg = copyNode.getChildByName("img_bg");
        img_bg.loadTexture(oneData.img)
        
        var img_gz = copyNode.getChildByName("img_gz");
        var path = "userInfo_3.0/guiZu/gz_0" + oneData.gz_lv + ".png";
        img_gz.loadTexture(path);

        var _btn0 = copyNode.getChildByName("btn_1");
        _btn0.visible = false;
        var btn = new ccui.Button(oneData.btn[0]);
        btn.x = _btn0.x;
        btn.y = _btn0.y;
        copyNode.addChild(btn);
        btn.opt = oneData.opt;
        btn.addTouchEventListener(function(sender, type){
            if(type == 2){
                var opt = sender.opt;
                this.senderTouchFunc(opt);
            }
        },this);
        if (oneData.btn2 && this.pinfo.userGrade >= oneData.gz_lv) {
            var btn2 = new ccui.Button(oneData.btn2[0])
            copyNode.addChild(btn2);
            var _posy = btn.y;
            btn.y = _posy - 30;
            btn2.y = _posy + 20;
            btn2.x = btn.x;
            btn2.opt = "kefu2";
            btn2.addTouchEventListener(function(sender, type){
                if(type == 2){
                    var opt = sender.opt;
                    this.senderTouchFunc(opt);
                }
            },this)
        }

        if(index === 0 && oneData.status == 2){
            btn.loadTextureNormal("userInfo_3.0/btn_yilingqu.png");
            btn.ignoreContentAdaptWithSize(true);
            btn.setTouchEnabled(false);
        }else if(index === 0 && oneData.status == 0){
            btn.loadTextureNormal("userInfo_3.0/icon_weikaiqi.png");
            btn.ignoreContentAdaptWithSize(true);
            btn.setTouchEnabled(false);
        }
        
        if(index == 5 && (this.pinfo.userGrade > 0)){
            if (this.pinfo.userGrade > 0) {
                btn.loadTextureNormal("userInfo_3.0/btn_qukankan.png");
                btn.ignoreContentAdaptWithSize(true);
                btn.setTouchEnabled(true);
            }
            

            var img_gz2 = img_gz.clone();
            var path2 = "userInfo_3.0/guiZu/gz_01.png";
            img_gz2.loadTexture(path2);
            img_gz2.setPosition(img_gz.getPosition());
            copyNode.addChild(img_gz2);
            img_gz.x += 70;


        }else if((this.pinfo.userGrade < oneData.gz_lv) || !oneData.isOpen){
            btn.loadTextureNormal("userInfo_3.0/icon_weikaiqi.png");
            btn.ignoreContentAdaptWithSize(true);
            btn.setTouchEnabled(false);
        }

		return copyNode;
    },
    senderTouchFunc:function(opt){
        if(opt == "lingqu"){
            // MjClient.showToast(" lingqu")
            this.reqLingQu();
        }else if(opt == "licai"){
            this.addChild(new UserGroup_act_zuanshilicai());
            //MjClient.showToast(" licai")
        }else if(opt == "qifu1" || opt == "qifu2"){
            // MjClient.showToast(" qifu1");
            this.addChild(new UserGrowth_actQiFu(this.pinfo));
        }else if(opt == "kefu" || opt == "kefu2"){
            // MjClient.showToast(" kefu1")
            MjClient.showMsg("微信：qxing7777 \n手机号：13418440727",
                    function() {},
                    function() {});
        }else if(opt == "duobao"){
            // MjClient.showToast(" duobao")

            this.addChild(new UserGrowth_actDuoBao(this.pinfo));
        }else if(opt == "jieri"){
            this.addChild(new UserGrowth_actJieRi());
        }
        // 刷新红点



    },
    
    select_zhuangBan:function(number){
        this._nodeZB_touxiang.visible = (number == 1);
        this._nodeZB_donghua.visible = (number == 2);
        this._nodeZB_biaoqing.visible = (number == 3);
        this._nodeZB_daoju.visible = (number == 4);


        this._btnZB_touxiang.setBright(number !== 1);
        this._btnZB_donghua.setBright(number !== 2);
        this._btnZB_biaoqing.setBright(number !== 3);
        this._btnZB_daoju.setBright(number !== 4);


        // 入场动画 暂不开放
        this._btnZB_donghua.setTouchEnabled(false);
        
    },

    init_zhuangBan:function(){
        var self = this;
        var _node = this._node_zhuangban;
        this._initZB = true;

        var  test_lb = _node.getChildByName("img_lb").getChildByName("Text_num");
        test_lb.ignoreContentAdaptWithSize(true);
        test_lb.setString(this.pinfo.happyCy + "");
        
        var  btn_change = _node.getChildByName("btn_change");
        btn_change.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                
                this.addChild(new UserInfo_exChangeMoney());
            }
        }, this);
        

        this._btnZB_touxiang = _node.getChildByName("btn_touxiang");
        this._btnZB_donghua = _node.getChildByName("btn_donghua");
        this._btnZB_biaoqing = _node.getChildByName("btn_biaoqing");
        this._btnZB_daoju = _node.getChildByName("btn_daoju");
        this._btnZB_touxiang.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                this.select_zhuangBan(1);
            }
        }, this);
        this._btnZB_donghua.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                this.select_zhuangBan(2);
            }
        }, this);
        this._btnZB_donghua.visible = false;
        this._btnZB_biaoqing.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                this.select_zhuangBan(3);
            }
        }, this);
        var _posx1 = this._btnZB_biaoqing.x;
        var _posy1 = this._btnZB_biaoqing.y;
        this._btnZB_biaoqing.x = this._btnZB_donghua.x;
        this._btnZB_biaoqing.y = this._btnZB_donghua.y;
        this._btnZB_daoju.setPosition(cc.p(_posx1,_posy1));
        this._btnZB_daoju.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                this.select_zhuangBan(4);
            }
        }, this);

        this._nodeZB_touxiang = _node.getChildByName("node_touxiang");
        this._nodeZB_touxiang.visible = false;
        this._nodeZB_donghua = _node.getChildByName("node_donghua");
        this._nodeZB_donghua.visible = false;
        this._nodeZB_biaoqing = _node.getChildByName("node_biaoqing");
        this._nodeZB_biaoqing.visible = false;
        this._nodeZB_daoju = _node.getChildByName("node_daoju");
        this._nodeZB_daoju.visible = false;
        self._btnZB_touxiang.getChildByName("img_hongdian").visible = false;
        self._btnZB_donghua.getChildByName("img_hongdian").visible = false;
        self._btnZB_biaoqing.getChildByName("img_hongdian").visible = false;
        self._btnZB_daoju.getChildByName("img_hongdian").visible = false;


        var headF_title = this._nodeZB_touxiang.getChildByName("headF_title");
        headF_title.setString("");

        var headF_desc = this._nodeZB_touxiang.getChildByName("headF_desc");
        headF_desc.setString("");

        var btn_useTX = this._nodeZB_touxiang.getChildByName("btn_useTX");
        btn_useTX.visible = false;

        var btn_jiesuoTX = this._nodeZB_touxiang.getChildByName("btn_jiesuoTX");
        btn_jiesuoTX.visible = false;
        
        var text_use = btn_useTX.getChildByName("text_use");
        text_use.setString("");

        this.ScrollView_headFrame = this._nodeZB_touxiang.getChildByName("ScrollView_headFrame");
        this.cell_headFrame = this._nodeZB_touxiang.getChildByName("cell_headFrame");
        this.cell_headFrame.visible = false;


        var donghua_title = this._nodeZB_donghua.getChildByName("donghua_title");
        donghua_title.setString("");

        var donghua_desc = this._nodeZB_donghua.getChildByName("donghua_desc");
        donghua_desc.setString("");

        var btn_useDH = this._nodeZB_donghua.getChildByName("btn_useDH");
        btn_useDH.visible = false;

        //   ListView_donghua   
        this.ListView_donghua = this._nodeZB_donghua.getChildByName("ListView_donghua");
        this.cell_donghua = this._nodeZB_donghua.getChildByName("cell_donghua");
        this.cell_donghua.visible = false;
          
        this.ScrollView_biaoqing = this._nodeZB_biaoqing.getChildByName("ScrollView_biaoqing");
        this.cell_biaoqing = this._nodeZB_biaoqing.getChildByName("cell_biaoqing");
        this.cell_biaoqing.visible = false;

        this.ScrollView_daoju = this._nodeZB_daoju.getChildByName("ScrollView_daoju");
        this.cell_daoju = this._nodeZB_daoju.getChildByName("cell_daoju");
        this.cell_daoju.visible = false;

        this.select_zhuangBan(1);
        if(!this._dataOfHeadFrame){
            this.reqZhuangBanTXK_data();
        }
        postEvent("user_growth_activity",MjClient.growInfoData);
        
    },

    init_zhuangBanTXK:function(data){
        if(!cc.sys.isObjectValid(this) || !data) return;

        var fresh_txk = function( number){
            for (let index = 1; index <= data.length; index++) {
                var node = this["_zhuangBanTXK" + index];
                if(!node || !cc.sys.isObjectValid(node)) return;
                var imge_select = node.getChildByName("image_select");
                imge_select.visible = number == index;
                if(number == index){
                    var headF_title = this._nodeZB_touxiang.getChildByName("headF_title");
                    headF_title.setString(node.data.title);
    
                    var headF_desc = this._nodeZB_touxiang.getChildByName("headF_desc");
                    headF_desc.setString(node.data.describe);
                    headF_desc.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
    
                    

                    var imge_headF = this._nodeZB_touxiang.getChildByName("imge_headF");
                    imge_headF.loadTexture("userInfo_3.0/zhuangBan/headFrame/" + node.data.aliasId +".png");


                    var btn_useTX = this._nodeZB_touxiang.getChildByName("btn_useTX");
                    btn_useTX.visible = true;
                    btn_useTX.index = index;
                    btn_useTX.data = node.data;
                    btn_useTX.addTouchEventListener(function(sender, type){
                        if(type == 2){
                            if(sender.data.isUsed){
                                MjClient.showToast("已使用");
                                return;
                            }
                            if(sender.data.isLocked == 0){

                                if(sender.data.unlockType == 51){
                                    var _num = sender.index - 1;
                                    this.reqJieSuo(this._dataOfHeadFrame[_num].propId, _num, 1);
                                }else{
                                    MjClient.showToast("还未解锁");
                                }
                                
                                return;
                            }
                            // node.data.propId
                            var _num = sender.index - 1;
                            this.reqUseBtn(this._dataOfHeadFrame[_num].propId, _num, 1);
                        }
                    },this);
                    var text_use = btn_useTX.getChildByName("text_use");
                    text_use.setString("永久使用");


                    var btn_jiesuoTX = this._nodeZB_touxiang.getChildByName("btn_jiesuoTX");
                    btn_jiesuoTX.visible = true;
                    btn_jiesuoTX.index = index;
                    btn_jiesuoTX.data = node.data;
                    btn_jiesuoTX.addTouchEventListener(function(sender, type){
                        if(type == 2){
                            var _num = sender.index - 1;
                            this.reqJieSuo(this._dataOfHeadFrame[_num].propId, _num, 1);

                        }
                    },this);
                    var money = btn_jiesuoTX.getChildByName("money");
                    money.setString("");
                    if(node.data.unlockType == 51 && node.data.isLocked == 0){
                        money.setString(node.data.extend.consume);
                    }


                    btn_jiesuoTX.visible = (node.data.isLocked == 0 && node.data.unlockType == 51);
                    btn_useTX.visible = !btn_jiesuoTX.visible;

                }
                
                
            }
        }.bind(this);
        var addTXK = function(oneData, index){
            var copyNode = this.cell_headFrame.clone();
            copyNode.visible = true;
            var image_using = copyNode.getChildByName("image_using");
            image_using.visible = oneData.isUsed ==  1;

            var image_lock = copyNode.getChildByName("image_lock");
            image_lock.visible = oneData.isLocked == 0;

            var img_hongdian = copyNode.getChildByName("img_hongdian");
            img_hongdian.visible = (oneData.isLocked == 1 && oneData.isRead == 0);

            var imge_select = copyNode.getChildByName("image_select");
            imge_select.visible = false;

            var img_guizu = copyNode.getChildByName("img_guizu");
            img_guizu.visible = false;

            var img_lebi = copyNode.getChildByName("img_lebi");
            img_lebi.visible = false;
            
            var img_bg2 = copyNode.getChildByName("img_bg2");
            img_bg2.visible= false;
            if(oneData.isLocked == 0){
                if(oneData.unlockType <= 9){
                    img_guizu.visible = true;
                    img_bg2.visible= true;
                    // img_guizu.loadTexture("userInfo_3.0/guiZu/gz_0" + oneData.unlockType + ".png");
                    img_guizu.setString("贵族 " + oneData.unlockType + " 解锁 ");
                    // img_guizu.loadTexture("userInfo_3.0/zhuangBan/chat_emoji/" + oneData.aliasId + ".png");
                }else if(oneData.unlockType == 51){
                    img_lebi.visible = true;
                    img_bg2.visible= true;
                }else if(oneData.unlockType == 52){
                    img_guizu.visible = true;
                    img_bg2.visible= true;
                    img_guizu.setString("活动解锁");
                }
            }else if(oneData.isLocked == 1){
                
            }

            var imge_frame = copyNode.getChildByName("image_frame");
            imge_frame.loadTexture("userInfo_3.0/zhuangBan/headFrame/" + oneData.aliasId +".png");
            imge_frame.index = index;
            imge_frame.data = oneData;
            imge_frame.addTouchEventListener(function(sender, type){
                if(type == 2){
                    fresh_txk(sender.index);
                    var _num = sender.index - 1;
                    if(this._dataOfHeadFrame[_num].isLocked == 1 &&  this._dataOfHeadFrame[_num].isRead == 0){
                        this._dataOfHeadFrame[_num].isRead = 1;
                        this.reqClearRedpoint(this._dataOfHeadFrame[_num].propId, 1,sender.getParent());
                    }
                }
            },this);
            
            copyNode.data = oneData;
            this["_zhuangBanTXK" + index] = copyNode;
            if((oneData.isUsed && !this._unlockTXK) || (index == 1)){
                this._unlockTXK = true;
                fresh_txk(index);
            }
            return copyNode;

        }.bind(this);

        this.ScrollView_headFrame.removeAllChildren();
        this._dataOfHeadFrame = data;
        var pai = Math.ceil(data.length / 4);
        this.ScrollView_headFrame.setInnerContainerSize(cc.size(600, 165* pai > 500 ? 165 * pai : 500))
        var _height = this.ScrollView_headFrame.getInnerContainerSize().height;
        // this._unlockTXK = false;
        for (let index = 1; index <= data.length; index++) {
            var lie = index % 4;
            var pai = Math.ceil(index / 4);
            var pos_x = 100 + (lie-1) * 165;
            var pos_y = (_height - 80) - (pai - 1) * 175;
            if(lie == 0) pos_x = 100 + 165*3;
            var item = addTXK(data[(index - 1)], index);
            item.x = pos_x;
            item.y = pos_y;
            
            this.ScrollView_headFrame.addChild(item);

        }
    },

    reqZhuangBanTXK_data:function(type){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userDressTXList",{length : 50},function(rtn){
            if(rtn.code==0)
            {
                self.init_zhuangBanTXK(rtn.data);
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("请求数据失败");
            }
            if(!type){
                self.reqZhuangBanDH_data();
            }
            
            MjClient.unblock();
        });
    },

    init_zhuangBanDongHua:function(data){
        if(!cc.sys.isObjectValid(this) || !data) return;

        var fresh_donghua = function( number){
            for (let index = 1; index <= data.length; index++) {
                cc.log("==== lms -- index ",index);
                var node = this["_zhuangBanDH" + index];
                if(!node || !cc.sys.isObjectValid(node)) return;
                var imge_select = node.getChildByName("image_select");
                imge_select.visible = number == index;
                if(number == index){
                    var donghua_title = this._nodeZB_donghua.getChildByName("donghua_title");
                    donghua_title.setString("");

                    var donghua_desc = this._nodeZB_donghua.getChildByName("donghua_desc");
                    donghua_desc.setString("");

                    var imge_donghua = this._nodeZB_donghua.getChildByName("imge_donghua");
                    imge_donghua.loadTexture("userInfo_3.0/zhuangBan/cartoon/" + node.data.aliasId + ".png");
                    

                    var btn_useDH = this._nodeZB_donghua.getChildByName("btn_useDH");
                    btn_useDH.visible = true;
                    btn_useDH.index = index;
                    btn_useDH.data = node.data;
                    btn_useDH.addTouchEventListener(function(sender, type){
                        if(type == 2){
                            if(sender.data.isUsed){
                                MjClient.showToast("已使用");
                                return;
                            }
                            if(sender.data.isLocked == 0){
                                MjClient.showToast("还未解锁");
                                return;
                            }
                            // node.data.propId
                            var _num = sender.index - 1;
                            this.reqUseBtn(this._dataOfHeadFrame[_num].propId, _num , 2);
                        }
                    },this);

                }
                
                
            }
        }.bind(this);
        var addDongHua = function(oneData, index){
            var copyNode = this.cell_donghua.clone();
            copyNode.visible = true;
            var title = copyNode.getChildByName("title");
            title.setString(oneData.title);

            var desc = copyNode.getChildByName("desc");
            desc.setString(oneData.describe);
            var imge_frame = copyNode.getChildByName("bg");
            imge_frame.index = index;
            imge_frame.data = oneData;
            imge_frame.addTouchEventListener(function(sender, type){
                if(type == 2){
                    fresh_donghua(sender.index);
                    if(sender.data.isRead == 0){

                    }
                }
            },this);

            var img_dh = copyNode.getChildByName("img_dh");
            img_dh.loadTexture("userInfo_3.0/zhuangBan/cartoon/" + oneData.aliasId + ".png");

            var imge_select = copyNode.getChildByName("image_select");
            imge_select.visible = false;

            var img_hongdian = copyNode.getChildByName("img_hongdian");
            img_hongdian.visible = false;

            var img_guizu = copyNode.getChildByName("img_guizu");
            if(oneData.unlockType <= 9)
                img_guizu.loadTexture("userInfo_3.0/guiZu/gz_0" + oneData.unlockType + ".png");
            else 
                img_guizu.visible = false;
            

            var status_1 = copyNode.getChildByName("status_1");
            status_1.visible = false;

            var status_2 = copyNode.getChildByName("status_2");
            status_2.visible = false;
            

            var status_3 = copyNode.getChildByName("status_3");
            status_3.visible = false;

            var status_4 = copyNode.getChildByName("status_4");
            status_4.visible = false;   


            cc.log(" ====== oneData.isLocked ",oneData.isLocked,oneData.unlockType);
            if(oneData.isLocked == 0){
                if (oneData.unlockType <= 9) {
                    status_1.visible = true;
                } else if (oneData.unlockType == 51) {
                    status_2.visible = true;
                    var money =status_2.getChildByName("money");
                    money.setString(oneData.extend.consume);

                }else if(oneData.unlockType == 52){
                    status_4.visible = true;
                    status_4.getChildByName("text_4").setString("限定活动")
                }

            }else if(oneData.isLocked == 1){
                if(oneData.isUsed == 1){
                    status_3.visible = true;
                }
            }

            var btn_unlock = status_2.getChildByName("btn_unlock");
            btn_unlock.data = oneData;
            btn_unlock.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    var _num = sender.index - 1;
                    this.reqUseBtn(this._dataOfHeadFrame[_num].propId, _num);
                }
            }, this);
            



            
            copyNode.data = oneData;
            this["_zhuangBanDH" + index] = copyNode;

            return copyNode;

        }.bind(this);

        this.ListView_donghua.removeAllChildren();
        this._dataOfDongHua = data;
        for (let index = 1; index <= data.length; index++) {
            this.ListView_donghua.pushBackCustomItem(addDongHua(data[index - 1], index));

        }
    },

    reqZhuangBanDH_data:function(type){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userDressRCDHList",{length : 50},function(rtn){
            if(rtn.code==0)
            {
                self.init_zhuangBanDongHua(rtn.data);
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("请求数据失败");
            }
            MjClient.unblock();
            if(!type){
                self.reqZhuangBanBQ_data();
            }
            
        });
    },

    init_zhuangBanBQ:function(data){
        if(!cc.sys.isObjectValid(this) || !data) return;
        // pkplayer.handler.userDressCurrencyUnlock
        var self = this;
        var fresh_BQ = function( number){
            for (let index = 1; index <= data.length; index++) {
                var node = this["_zhuangBanBQ" + index];
                if(!node || !cc.sys.isObjectValid(node)) return;
                var imge_select = node.getChildByName("image_select");
                cc.log("=====index  number == index",index,number == index)
                imge_select.visible = number == index;
                if(number == index){
                    
                    var biaoqing_title = this._nodeZB_biaoqing.getChildByName("biaoqing_title");
                    biaoqing_title.setString(node.data.title);
    
                    var biaoqing_desc = this._nodeZB_biaoqing.getChildByName("biaoqing_desc");
                    biaoqing_desc.setString(node.data.describe);
                    var biaoqing_money = this._nodeZB_biaoqing.getChildByName("biaoqing_money");
                    var img_lebi = this._nodeZB_biaoqing.getChildByName("img_lebi");
                    if(node.data.unlockType == 51 && node.data.isLocked == 0){
                        biaoqing_money.visible = true;
                        biaoqing_money.setString(node.data.extend.consume);
                        img_lebi.visible = true;
                    }else{
                        biaoqing_money.visible = false;
                        img_lebi.visible = false;
                    }

                    var img_biaoqing = this._nodeZB_biaoqing.getChildByName("img_biaoqing");
                    // img_biaoqing.loadTexture("userInfo_3.0/zhuangBan/chat_emoji/" + node.data.aliasId + ".png");
                    var _act = img_biaoqing.getChildByName("animation");
                    if(_act) _act.removeFromParent();

                    var _json = "userInfo_3.0/zhuangBan/chat_emoji/" + this.LTBQ_tab[node.data.aliasId] + "/" + this.LTBQ_tab[node.data.aliasId] + ".json";
                    var _atlas = "userInfo_3.0/zhuangBan/chat_emoji/" + this.LTBQ_tab[node.data.aliasId] + "/" + this.LTBQ_tab[node.data.aliasId] + ".atlas";
                    var projNode = createSpine(_json, _atlas);
                    projNode.setAnimation(0, 'animation', true);
                    projNode.setPosition(img_biaoqing.width/2, 0);
                    projNode.setScale(0.6);
                    projNode.setName("animation");
                    img_biaoqing.addChild(projNode, 9);

                    // var img_guizu = img_biaoqing.getChildByName("img_guizu");
                    // img_guizu.loadTexture("userInfo_3.0/guiZu/gz_0" + node.data.unlockType + ".png");


                    var btn_jiesuo = this._nodeZB_biaoqing.getChildByName("btn_jiesuo");
                    btn_jiesuo.visible = true;
                    btn_jiesuo.index = index;
                    btn_jiesuo.data = node.data;
                    if(node.data.isLocked == 1){
                        btn_jiesuo.visible = false;
                    }
                    
                    btn_jiesuo.addTouchEventListener(function(sender, type){
                        if(type == 2){
                            
                            var node = this["_zhuangBanBQ" + sender.index];
                            cc.log("=====node.data.unlockType ",node.data.unlockType,sender.index)
                            if(node.data.unlockType == 51){
                                var _num = sender.index - 1;
                                this.reqJieSuo(this._dataOfBiaoQing[_num].propId, _num, 3);
                                return;
                            }

                            if(node.data.unlockType == 52){
                                MjClient.showToast("请参加限定活动");
                                return;
                            }
                            if(sender.data.isLocked == 0){
                                MjClient.showToast("还未解锁");
                                return;
                            }
                            // node.data.propId
                            // var _num = sender.index - 1;
                            // this.reqUseBtn(this._dataOfHeadFrame[_num].propId, _num, 3);
                        }
                    },this);
                    imge_select.visible = true;

                }
                
                
            }
        }.bind(this);
        var addBQ = function(oneData, index){
            var copyNode = this.cell_biaoqing.clone();
            copyNode.visible = true;
            var imge_select = copyNode.getChildByName("image_select");
            imge_select.visible = false;
            var image_lock = copyNode.getChildByName("img_suo");
            image_lock.visible = oneData.isLocked == 0;

            var img_guizu = copyNode.getChildByName("img_guizu");
            img_guizu.visible = false;

            var img_lebi = copyNode.getChildByName("img_lebi");
            img_lebi.visible = false;
            var name = copyNode.getChildByName("img_name").getChildByName("name");
            name.setString( this.LTBQ_nameTab[oneData.aliasId]);
            
            var img_bg2 = copyNode.getChildByName("img_bg2");
            img_bg2.visible= false;
            if(oneData.isLocked == 0){
                if(oneData.unlockType <= 9){
                    img_guizu.visible = true;
                    img_bg2.visible= true;
                    // img_guizu.loadTexture("userInfo_3.0/guiZu/gz_0" + oneData.unlockType + ".png");
                    img_guizu.setString("贵族 " + oneData.unlockType + " 解锁 ");
                    // img_guizu.loadTexture("userInfo_3.0/zhuangBan/chat_emoji/" + oneData.aliasId + ".png");
                }else if(oneData.unlockType == 51){
                    img_lebi.visible = true;
                    img_bg2.visible= true;
                }else if(oneData.unlockType == 52){
                    img_guizu.visible = true;
                    img_bg2.visible= true;
                    img_guizu.setString("活动解锁");
                }
            }else if(oneData.isLocked == 1){
                
            }

            var img_hongdian = copyNode.getChildByName("img_hongdian");
            img_hongdian.visible = (oneData.isLocked == 1 && oneData.isRead == 0);

            
            var imge_frame = copyNode.getChildByName("icon");
            imge_frame.index = index;
            imge_frame.data = oneData;
            imge_frame.loadTexture("userInfo_3.0/zhuangBan/chat_emoji/" + oneData.aliasId + ".png")
            imge_frame.addTouchEventListener(function(sender, type){
                if(type == 2){
                    fresh_BQ(sender.index);
                    var _num = sender.index - 1;
                    if(this._dataOfBiaoQing[_num].isLocked == 1 &&  this._dataOfBiaoQing[_num].isRead == 0){
                        this._dataOfBiaoQing[_num].isRead = 1;
                        this.reqClearRedpoint(this._dataOfBiaoQing[_num].propId, 3,sender.getParent());
                    }
                }
            },this);
            
            copyNode.data = oneData;
            this["_zhuangBanBQ" + index] = copyNode;
            
            if((oneData.isLocked == 1 && oneData.isRead == 0 && !this._unlockBQ) || (index == 1)){
                this._unlockBQ = true;
                fresh_BQ(index);
            }
            return copyNode;

        }.bind(this);

        this.ScrollView_biaoqing.removeAllChildren();
        this._dataOfBiaoQing = data;
        var pai = Math.ceil(data.length / 5);
        this.ScrollView_biaoqing.setInnerContainerSize(cc.size(720, 145 * pai > 500 ? 145 * pai : 500))
        var _height = this.ScrollView_biaoqing.getInnerContainerSize().height;
        for (let index = 1; index <= data.length; index++) {
            var lie = index % 5;
            var pai = Math.ceil(index / 5);
            var pos_x = 75 + (lie-1) * 145;
            var pos_y = (_height - 80) - (pai - 1) * 145;
            if(lie == 0) pos_x = 75 + 145*4;
            var item = addBQ(data[(index - 1)], index);
            item.x = pos_x;
            item.y = pos_y;
            // cc.log("==== lms ---- 105 * pai = ",105 * pai)
            // this.ScrollView_biaoqing.setInnerContainerSize(cc.size(620, 105 * pai > 620 ? 105 * pai : 410))
            this.ScrollView_biaoqing.addChild(item);

        }
    },
    // 请求表情数据
    reqZhuangBanBQ_data:function(type){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userDressLTBQList",{length : 100},function(rtn){
            if(rtn.code==0)
            {
                self.init_zhuangBanBQ(rtn.data);
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("请求数据失败");
            }
            if(!type){
                self.reqZhuangBanDJ_data();
            }
            
            MjClient.unblock();
        });
    },
    init_zhuangBanDJ:function(data){
        if(!cc.sys.isObjectValid(this) || !data) return;

        var fresh_DJ = function( number){
            for (let index = 1; index <= data.length; index++) {
                var node = this["_zhuangBanDJ" + index];
                if(!node || !cc.sys.isObjectValid(node)) return;
                var imge_select = node.getChildByName("image_select");
                imge_select.visible = number == index;
                if(number == index){
                    var biaoqing_title = this._nodeZB_daoju.getChildByName("daoju_title");
                    biaoqing_title.setString(node.data.title);
    
                    var biaoqing_desc = this._nodeZB_daoju.getChildByName("daoju_desc");
                    biaoqing_desc.setString(node.data.describe);
                    var biaoqing_money = this._nodeZB_daoju.getChildByName("daoju_money");
                    var img_lebi = this._nodeZB_daoju.getChildByName("img_lebi");
                    biaoqing_money.visible = false;
                    img_lebi.visible = false;
                    if(node.data.unlockType == 51 && node.data.isLocked == 0){
                        biaoqing_money.visible = true;
                        biaoqing_money.setString(node.data.extend.consume);
                        img_lebi.visible = true;
                    }
                    

                    var img_daoju = this._nodeZB_daoju.getChildByName("img_daoju");
                    // img_daoju.loadTexture("userInfo_3.0/zhuangBan/tools/" + node.data.aliasId +".png");
                    if(img_daoju.getChildByName("icon_daoju")){
                        img_daoju.getChildByName("icon_daoju").removeFromParent();
                    }
                    
                    if(img_daoju.getChildByName("animation")){
                        img_daoju.getChildByName("animation").removeFromParent();
                    }

                    
                    if(this.HDDJ_tab[node.data.aliasId]){
                        var _json = "userInfo_3.0/zhuangBan/tools/" + this.HDDJ_tab[node.data.aliasId] + "/" + this.HDDJ_tab[node.data.aliasId] + ".json";
                        var _atlas = "userInfo_3.0/zhuangBan/tools/" + this.HDDJ_tab[node.data.aliasId] + "/" + this.HDDJ_tab[node.data.aliasId] + ".atlas";
                        var projNode = createSpine(_json, _atlas);
                        projNode.setAnimation(0, 'animation', true);
                        projNode.setPosition(cc.p(img_daoju.width * 0.5,img_daoju.height * 0.2));
                        projNode.setScale(1);
                        projNode.setName("animation");
                        img_daoju.addChild(projNode, 9);
                    }else{
                        var _icon  = ccui.ImageView("userInfo_3.0/zhuangBan/tools/" + node.data.aliasId +".png");
                        _icon.setPosition(cc.p(img_daoju.width/2,img_daoju.height/2));
                        _icon.setName("icon_daoju");
                        img_daoju.addChild(_icon);


                    }
                    


                    var btn_jiesuo = this._nodeZB_daoju.getChildByName("btn_jiesuo");
                    btn_jiesuo.visible = node.data.isLocked == 0;
                    btn_jiesuo.index = index;
                    btn_jiesuo.data = node.data;

                    
                    btn_jiesuo.addTouchEventListener(function(sender, type){
                        if(type == 2){
                            if(sender.data.isUsed){
                                MjClient.showToast("已使用");
                                return;
                            }
                            if(sender.data.unlockType == 52){
                                MjClient.showToast("请参加限定活动");
                                return;
                            }
                            if(sender.data.unlockType !== 51 && sender.data.isLocked == 0){
                                MjClient.showToast("还未解锁");
                                return;
                            }

                            
                            // node.data.propId
                            var _num = sender.index - 1;
                            this.reqJieSuo(this._dataOfDaoJu[_num].propId, _num, 4);
                        }
                    },this);

                }
                
                
            }
        }.bind(this);
        var addDJ = function(oneData, index){
            var copyNode = this.cell_daoju.clone();
            copyNode.visible = true;
            var imge_select = copyNode.getChildByName("image_select");
            imge_select.visible = false;
            var image_lock = copyNode.getChildByName("img_suo");
            image_lock.visible = oneData.isLocked == 0;

            var img_guizu = copyNode.getChildByName("img_guizu");
            img_guizu.visible = false;

            var img_lebi = copyNode.getChildByName("img_lebi");
            img_lebi.visible = false;

            var img_name = copyNode.getChildByName("img_name");
            img_name.visible = false;

            var img_bg2 = copyNode.getChildByName("img_bg2");
            img_bg2.visible= false;
            if(oneData.isLocked == 0){
                if(oneData.unlockType <= 9){
                    img_guizu.visible = true;
                    img_bg2.visible= true;
                    // "userInfo_3.0/zhuangBan/tools/" + node.data.aliasId +".png");
                    // img_guizu.loadTexture("userInfo_3.0/guiZu/gz_0" + oneData.unlockType + ".png");
                    img_guizu.setString("贵族 " + oneData.unlockType + " 解锁 ");
                    // img_guizu.loadTexture("userInfo_3.0/zhuangBan/chat_emoji/" + oneData.aliasId + ".png");
                }else if(oneData.unlockType == 51){
                    img_lebi.visible = true;
                    img_bg2.visible= true;
                }else if(oneData.unlockType == 52){
                    img_guizu.visible = true;
                    img_bg2.visible= true;
                    img_guizu.setString("活动解锁");
                }
            }else if(oneData.isLocked == 1){
                
            }
            

            

            var img_hongdian = copyNode.getChildByName("img_hongdian");
            img_hongdian.visible = (oneData.isLocked == 1 && oneData.isRead == 0);

            
            var icon = copyNode.getChildByName("icon");
            icon
            var imge_frame = copyNode.getChildByName("icon");
            imge_frame.index = index;
            imge_frame.data = oneData;
            imge_frame.loadTexture("userInfo_3.0/zhuangBan/tools/" + oneData.aliasId + ".png")
            imge_frame.addTouchEventListener(function(sender, type){
                if(type == 2){
                    fresh_DJ(sender.index);
                    var _num = sender.index - 1;
                    if(this._dataOfDaoJu[_num].isLocked == 1 &&  this._dataOfDaoJu[_num].isRead == 0){
                        this._dataOfDaoJu[_num].isRead = 1;
                        this.reqClearRedpoint(this._dataOfDaoJu[_num].propId, 3,sender.getParent());
                    }
                    
                }
            },this);
            
            copyNode.data = oneData;
            this["_zhuangBanDJ" + index] = copyNode;
            // if(oneData.isUsed){
            //     fresh_DJ(index);
            // }
            if((oneData.isLocked == 1 && oneData.isRead == 0 && !this._unlockDJ) || (index == 1)){
                this._unlockDJ = true;
                fresh_DJ(index);
            }
            return copyNode;

        }.bind(this);

        this.ScrollView_daoju.removeAllChildren();
        this._dataOfDaoJu = data;
        this._unlockDJ = false;

        var pai = Math.ceil(data.length / 5);
        this.ScrollView_daoju.setInnerContainerSize(cc.size(720, 145 * pai > 500 ? 145 * pai : 500))
        var _height = this.ScrollView_daoju.getInnerContainerSize().height;
        for (let index = 1; index <= data.length; index++) {
            var lie = index % 5;
            var pai = Math.ceil(index / 5);
            var pos_x = 75 + (lie-1) * 145;
            var pos_y = (_height - 80) - (pai - 1) * 145;
            if(lie == 0) pos_x = 75 + 145*4;
            var item = addDJ(data[(index - 1)], index);
            item.x = pos_x;
            item.y = pos_y;
            // cc.log("==== lms ---- 105 * pai = ",105 * pai)
            // this.ScrollView_biaoqing.setInnerContainerSize(cc.size(620, 105 * pai > 620 ? 105 * pai : 410))
            this.ScrollView_daoju.addChild(item);

        }
    },

    reqZhuangBanDJ_data:function(){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userDressHDDJList",{length : 50},function(rtn){
            if(rtn.code==0)
            {
                self.init_zhuangBanDJ(rtn.data);
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("请求数据失败");
            }
            MjClient.unblock();
        });
    },

    reqUseBtn:function(propId, number, type){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userDressPropUse",{propId : propId},function(rtn){
            if(rtn.code==0)
            {
                if(type == 1){
                    self.reqZhuangBanTXK_data(1);
                }else if(type == 2){
                    self.reqZhuangBanDH_data(1);
                }else if(type == 3){
                    self.reqZhuangBanBQ_data(1);
                }else if(type == 4){
                    self.reqZhuangBanDJ_data(1);
                }
                // if (rtn.message)
                //     MjClient.showToast(rtn.message);
                
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("请求数据失败");
            }
            MjClient.unblock();
        });
    },

    reqJieSuo:function(propId, number, type){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userDressCurrencyUnlock",{propId : propId},function(rtn){
            if(rtn.code==0)
            {
                if(type == 1){
                    self.reqZhuangBanTXK_data(1);
                }else if(type == 2){
                    self.reqZhuangBanDH_data(1);
                }else if(type == 3){
                    self.reqZhuangBanBQ_data(1);
                }else if(type == 4){
                    self.reqZhuangBanDJ_data(1);
                }
                MjClient.showToast("解锁成功");
                
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("请求数据失败");
            }
            MjClient.unblock();
        });
    },
    reqHuoDong_data:function(){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userNobleActivityState",{},function(rtn){
            if(rtn.code==0)
            {
                self._data = rtn.data;
                self.GZHD_tab[0].status = rtn.data.isRecLogin;
                self.GZHD_tab[1].status = rtn.data.diamondManage.isBets;
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("领取失败");
            }
            MjClient.unblock();
        });

    },

    // pkplayer.handler.userDressClearRedpoint
    reqClearRedpoint:function(propId, type, node){
        var self = this;
        // MjClient.showToast("清除红点");
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userDressClearRedpoint",{propId : propId},function(rtn){
            if(rtn.code==0)
            {
                // if(type == 1){
                //     var show = false;
                //     for (let index = 0; index < self._dataOfHeadFrame.length; index++) {
                //         if (self._dataOfHeadFrame[index].isLocked == 1 && self._dataOfHeadFrame[index].isRead == 0) {
                //             show = true;
                //         }
                //     }
                //     self._btnZB_touxiang.getChildByName("img_hongdian").visible = show;
                // }else if(type == 2){
                //     var data = self._dataOfDongHua;
                //     var show = false;
                //     for (let index = 0; index < data.length; index++) {
                //         if (data[index].isLocked == 1 && data[index].isRead == 0) {
                //             show = true;
                //         }
                //     }
                //     self._btnZB_donghua.getChildByName("img_hongdian").visible = show;

                // }else if(type == 3){
                //     var data = self._dataOfBiaoQing;
                //     var show = false;
                //     for (let index = 0; index < data.length; index++) {
                //         if (data[index].isLocked == 1 && data[index].isRead == 0) {
                //             show = true;
                //         }
                //     }
                //     self._btnZB_biaoqing.getChildByName("img_hongdian").visible = show;
                    
                // }else if(type == 4){
                //     var data = self._dataOfDaoJu;
                //     var show = false;
                //     for (let index = 0; index < data.length; index++) {
                //         if (data[index].isLocked == 1 && data[index].isRead == 0) {
                //             show = true;
                //         }
                //     }
                //     self._btnZB_daoju.getChildByName("img_hongdian").visible = show;
                    
                // }
                
                node.getChildByName("img_hongdian").visible = false;
                
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("请求数据失败");
            }
            MjClient.unblock();
        });
    },

    reqLingQu:function(){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userLoginEmpirical",{},function(rtn){
            if(rtn.code==0)
            {
                MjClient.showToast("领取成功");
                self.GZHD_tab[0].status = 2;
                self._data.isRecLogin = 2;
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("领取失败");
            }
            MjClient.unblock();
        });
    },

    isJS_skin:function(){
        if(MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ || 
           MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ||
            MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ ){
            return true;
        }
        return false;
    },

    editBoxReturn: function (editBox)
    {
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.updateSignature",{signature:escape(editBox.getString())},function(rtn){
            if(rtn.code==0)
            {
                MjClient.showToast("更新个性签名成功");
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("更新个性签名失败");
            }
            MjClient.unblock();
        });
    },
});

function LoginByWeChatAccountUser(wxInfo)
{
    wxInfo.lType="wx";
    wxInfo.sign = util.md5.hex_md5(wxInfo.unionid + "JTCF@8888");
    startLoginUser(wxInfo);
}

function startLoginUser(mail,code,isLocalGuest)
{
    MjClient.block();
    /*
     for test by sking
     */
    if ((cc.sys.OS_WINDOWS == cc.sys.os && !MjClient.remoteCfg.guestLogin) || TestConfig.isDebug)
    {
        mail = TestConfig.mail;
        code = TestConfig.code;
        //mail = 1509844;
        //code = "7XtIEe9FkwKM";
    }


    cc.log(" loginData code = " + code);
    cc.log(" loginData mail = " + mail);
    var loginData=code? {  mail: mail, code: code}:mail;
    if (!loginData)//新用户
    {
        loginData={};
    }


    loginData.appVersion=MjClient.native.GetVersionName();
    loginData.resVersion=MjClient.resVersion;
    loginData.app={appid:AppEnv[MjClient.getAppType()],os:cc.sys.os};
    loginData.remoteIP=MjClient.remoteIP;
    loginData.area={longitude:MjClient.native.GetLongitudePos(), latitude:MjClient.native.GetLatitudePos()};
    loginData.umid=MjClient.native.umengGetUMID();
    loginData.deviceModel=MjClient.native.getDeviceModel();

    if (isLocalGuest === false)
    {
        doLoginUser(loginData, isLocalGuest);
    }
    else
    {
        MjClient.ConnectServer(loginData.openid||loginData.mail, function()
        {
            doLoginUser(loginData, isLocalGuest);
        });
    }
}

function doLoginUser(loginData, isLocalGuest) {
    MjClient.gamenet.request("pkplayer.handler.bindWeChat", loginData,
        function (rtn) {
            MjClient.unblock();
            if (rtn.message)
                MjClient.showToast(rtn.message);
            else if (rtn.code == 0) {
                MjClient.showToast("绑定微信成功");
            } else {
                MjClient.showToast("绑定微信失败，请重试");
            }

            if (rtn.code == 0) {
                util.localStorageEncrypt.setStringItem("WX_USER_LOGIN", JSON.stringify(loginData));
                util.localStorageEncrypt.setNumberItem("WX_USER_LOGIN_TIME", (new Date().getTime()));
            }
            postEvent("WX_BIND_RESULT", rtn.code == 0);
        }
    );
}

var Switch_userInfo = function(){
    // PlayerInfoBindView = PlayerInfoBindView_v3;
    if(MjClient.isUseUIv3 && MjClient.isUseUIv3()){
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            PlayerInfoBindView = PlayerInfoBindView_v3;
        }
        else{
            PlayerInfoBindView = PlayerInfoBindView3;
        }
        // PlayerInfoBindView = PlayerInfoBindView_v3;
            
    }
    else if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
        PlayerInfoBindView = PlayerInfoBindView1;
    }else{
        PlayerInfoBindView = PlayerInfoBindView2;
    }
}

Switch_userInfo();


