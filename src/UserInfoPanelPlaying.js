/**
 * Created by sking on 2017/5/9.
 */
var CREATEROOM_COLOR_1 = cc.color(237, 101, 1);
var CREATEROOM_COLOR_2 = cc.color(123, 78, 63);

if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) { // 岳阳
    CREATEROOM_COLOR_1 = cc.color(211,38,14);
    CREATEROOM_COLOR_2 = cc.color(68,51,51);
}
else if(MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ) { // 临汾
    CREATEROOM_COLOR_1 = cc.color(94,119,199);
    CREATEROOM_COLOR_2 = cc.color(91,95,128);
}
else if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
     MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP || 
     MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
     MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ) { // 江苏
    CREATEROOM_COLOR_1 = cc.color(211, 60, 0);
    CREATEROOM_COLOR_2 = cc.color(159, 106, 54);
}
else if(isJinZhongAPPType()) { // 晋中
    CREATEROOM_COLOR_1 = cc.color(211, 60, 0);
    CREATEROOM_COLOR_2 = cc.color(66, 94, 112);
}else if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
{
    CREATEROOM_COLOR_2 = cc.color(158, 118,78);
}

MjClient.PlayChatAniTime = 0;

(function(){

    PlayerInfoViewPlaying = cc.Layer.extend({
        propNum: 7,//只包括基本的道具,不包括房间等级的道具数量
        pinfo: null,
        jsBind:{
            back:
                {
                    headImg:
                        {
                            _event: {
                                loadWxHead: function (d) {
                                    if (d.uid == MjClient.userInfoLayerUi.pinfo.uid) {
                                        if (isJinZhongAPPType()
                                            || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP||
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
                                            img.setScale(mask.getContentSize().width / img.getContentSize().width);
                                            clippingNode.addChild(img);
                                            if(isYongZhouProject()){
                                                clippingNode.setScale(0.95);
                                                clippingNode.setPosition(this.getContentSize().width / 1.613, this.getContentSize().height / 1.9);
                                            }else{
                                                clippingNode.setScale(0.97);
                                                clippingNode.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
                                            }
                                            //邵阳换皮调整头像坐标和大小
                                            if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                                                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                                                MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) {
                                                clippingNode.setScale(1.1);
                                                clippingNode.setPosition(this.getContentSize().width/2,this.getContentSize().height/2);
                                            }
                                            //遮罩框
                                            var hideblock = new cc.Sprite("home/homeHeadCusPic.png");
                                            if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                                                clippingNode.setScale(1.42);
                                                clippingNode.setPosition(this.getContentSize().width/2,this.getContentSize().height/2 - 8);
                                                hideblock.setTexture("ui/userInfo/touxiangk_01.png");
                                            }
                                            hideblock.setPosition(hideblock.getContentSize().width / 2, hideblock.getContentSize().height / 2);
                                            if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG){
                                                hideblock.setScale(1.1);
                                                hideblock.setPosition(hideblock.getContentSize().width * 0.57, hideblock.getContentSize().height * 0.6);
                                            }
                                            this.addChild(clippingNode);
                                            this.addChild(hideblock);
                                        }else{
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
        ctor:function (pinfo,closeCB) {
            this._super();
            this.pinfo = pinfo;
            var userInfoLayerUi = ccs.load("UserInfo_playing.json");
            BindUiAndLogic(userInfoLayerUi.node,this.jsBind);
            this.addChild(userInfoLayerUi.node);
            MjClient.userInfoLayerUi = this;
            this.setPropNum();
            var that = this;
            this._closeCB = closeCB;
            var _block = userInfoLayerUi.node.getChildByName("block");
            setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

            var _back = userInfoLayerUi.node.getChildByName("back");
            this._back = _back;
            setWgtLayout(_back, [0.6,0.75],[0.5,0.5],[0,0]);
            _back.setPositionPercent(cc.p(0.5, 0.5));

            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP||
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
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Gerenzhuye_Close", {uid:SelfUid()});

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

            //联盟俱乐部，不同subClubId ID第二位开始隐藏3位
            if (MjClient.data.sData && MjClient.data.sData.tData && pinfo.clubId)
            {
                var tData = MjClient.data.sData.tData;
                var hasFindSelf = false;//避免回放别人视角

                var hideIdStr = pinfo.uid +"";
                if(hideIdStr.length >= 4){
                    hideIdStr = hideIdStr.slice(0,1) + "***" + hideIdStr.slice(4,hideIdStr.length)
                }
                for (var i = 0; i < tData.uids.length; i++) {
                    var plSelf = MjClient.data.sData.players[tData.uids[i]];
                    if (plSelf && tData.uids[i] == MjClient.data.pinfo.uid) {
                        hasFindSelf = true;
                        if(plSelf.info.clubId == pinfo.clubId){

                        }else{
                            _ID.setString("ID:"+hideIdStr);
                        }
                    }
                }
                if(!hasFindSelf){
                    _ID.setString("ID:"+hideIdStr);
                }
            }

            //签名
            var _signature = _back.getChildByName("signature");
            _signature.setString("个性签名:"+unescape(pinfo.signature));
            _signature.setVisible(false);//又双叒叕去掉个性签名。。。


            //IP
            var _IP = _back.getChildByName("IP");
            _IP.ignoreContentAdaptWithSize(true);
            function _setIp()
            {
                if(pinfo.remoteIP)
                    return "IP: " + pinfo.remoteIP;
                else
                    return "";
            }
            var ipStr = _setIp();
            //空格占位
            if ((MjClient.APP_TYPE.QXYYQP == MjClient.getAppType() || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ|| MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType() || isJinZhongAPPType())
                && (ipStr.length == 0 || (MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId))){
                ipStr = "                               ";
            }
            _IP.setString(ipStr);
            if(isYongZhouProject()){
                _IP.setString(hideIP_paohuzi(_setIp()));
            }

            //初始化底部道具
            this.initPropUi();


            //道具开关
            var _props = util.localStorageEncrypt.getBoolItem("_InteractiveProps", true);
            var _nodeProps;
            var _fontSize = 30;
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
                _nodeProps.setPosition(cc.p(0, -(_ID.height*2.7)));
                _nodeProps.setAnchorPoint(cc.p(0, 0));
                _ID.addChild(_nodeProps, 100);
                _fontSize = 27;
                _propsText.setFontName(MjClient.fzcyfont);

                if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) 
                {
                    _propsText.setFontName("fonts/lanting.TTF");
                }
                _propsText.setPosition(cc.p(_nodeProps.getContentSize().width*3.5, _nodeProps.getContentSize().height/2));
            }else if (isJinZhongAPPType()) {
                _nodeProps = new ccui.CheckBox("createNewPng/daTC1_19.png", "createNewPng/daTC1_20.png");
                _nodeProps.setPosition(cc.p(0, -(_IP.height*1.9)));
                _nodeProps.setAnchorPoint(cc.p(0, 0));
                _IP.addChild(_nodeProps, 100);
                _fontSize = 20;
                _propsText.setFontName("fonts/lanting.TTF");
                _propsText.setPosition(cc.p(_nodeProps.getContentSize().width*3.0, _nodeProps.getContentSize().height/2));
            }else if (MjClient.APP_TYPE.QXYYQP == MjClient.getAppType()|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                _nodeProps = new ccui.CheckBox("createNewPng/daTC1_19.png", "createNewPng/daTC1_20.png");
                _nodeProps.setPosition(cc.p(0, -(_IP.height*1.5)));
                _nodeProps.setAnchorPoint(cc.p(0, 0));
                _IP.addChild(_nodeProps, 100);
                _fontSize = 28;
                _propsText.setFontName("fonts/lanting.TTF");
                _propsText.setPosition(cc.p(_nodeProps.getContentSize().width*3.8, _nodeProps.getContentSize().height/2));
            }else{
                _nodeProps = new ccui.CheckBox("game_picture/btn_cjxx_normal.png", "game_picture/btn_cjxx_press.png");
                _nodeProps.setPosition(cc.p(0, -(_IP.height*1.9)));
                _nodeProps.setAnchorPoint(cc.p(0, 0));
                _IP.addChild(_nodeProps, 100);
                _propsText.setFontName(MjClient.fzcyfont);
                _propsText.setPosition(cc.p(_nodeProps.getContentSize().width*3.5, _nodeProps.getContentSize().height/2));
            }
            _nodeProps.setSelected(_props);
            setPropsStation(_back, _props);
            _propsText.setFontSize(_fontSize);
            selectedCB(_propsText, _props);
            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                _nodeProps.setPositionY(-(_IP.height*1.5) - 40);
                _propsText.setFontSize(28);
                _propsText.setFontName("fonts/lanting.TTF");
            }
            _nodeProps.addChild(_propsText);
            _propsText.addTouchEventListener(function(sender,type){
                if(type == 2) {
                    _nodeProps.setSelected(!_nodeProps.isSelected());
                    selectedCB(_propsText, _nodeProps.isSelected());
                    setPropsStation(_back, _nodeProps.isSelected());
                    util.localStorageEncrypt.setBoolItem("_InteractiveProps", _nodeProps.isSelected());

                    if (MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId) {
                        if (_nodeProps.isSelected())
                            MjClient.native.umengEvent4CountWithProperty("Jinbichang_Fangjiannei_Wanjiaxinxi_Xunyushiyongdaoju_Xuanzhong", {uid:SelfUid()});
                        else
                            MjClient.native.umengEvent4CountWithProperty("Jinbichang_Fangjiannei_Wanjiaxinxi_Xunyushiyongdaoju_Quxiaoxuanzhong", {uid:SelfUid()});       
                    }
                    else
                    {
                        if (_nodeProps.isSelected())
                            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Gerenzhuye_Shiyonghudongdaoju_Xuanzhong", {uid:SelfUid()});
                        else
                            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Gerenzhuye_Shiyonghudongdaoju_QuxiaoXuanzhong", {uid:SelfUid()}); 
                    }
                }
            });
            _nodeProps.addEventListener(function(sender,type)
            {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        selectedCB(_propsText, true);
                        setPropsStation(_back, true);
                        util.localStorageEncrypt.setBoolItem("_InteractiveProps", true);
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        selectedCB(_propsText, false);
                        setPropsStation(_back, false);
                        util.localStorageEncrypt.setBoolItem("_InteractiveProps", false);
                        break;
                }

                if (MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId) {
                    if (type == ccui.CheckBox.EVENT_SELECTED)
                        MjClient.native.umengEvent4CountWithProperty("Jinbichang_Fangjiannei_Wanjiaxinxi_Xunyushiyongdaoju_Xuanzhong", {uid:SelfUid()});
                    else
                        MjClient.native.umengEvent4CountWithProperty("Jinbichang_Fangjiannei_Wanjiaxinxi_Xunyushiyongdaoju_Quxiaoxuanzhong", {uid:SelfUid()});       
                }
            }, _nodeProps);



            /**设置道具的开关   by Tom */
            function setPropsStation(node, station) {
                var _cdTime = node.getChildByName("cdTime");
                _cdTime.setVisible(station);

                var cerrentList =  MjClient.userInfoLayerUi.getPropList();   // [0, 1, 2, 3, 4, 5, 6]
                
                that._propListView.visible = station;
                
                if (!node.getChildByName("tip")) {
                    var tipText = new ccui.Text();
                    if(isJinZhongAPPType() ||
                        MjClient.APP_TYPE.QXYYQP == MjClient.getAppType() ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
                    {
                        tipText.setFontSize(24);
                        tipText.setFontName("fonts/lanting.TTF");
                        tipText.setPosition(node.width/2, 50);
                    }else{
                        tipText.setFontSize(26);
                        tipText.setFontName(MjClient.fzcyfont);
                        tipText.setPosition(node.width/2, 80);
                        if(isYongZhouProject()){
                            tipText.setPosition(node.width/2, 90);
                        }
                    }
                    tipText.setString("你已关闭互动道具，不会收到其他玩家的道具");
                    tipText.setAnchorPoint(cc.p(0.5, 0));
                    tipText.setName("tip");
                    tipText.setColor(CREATEROOM_COLOR_2);
                    node.addChild(tipText);
                }
                node.getChildByName("tip").setVisible(!station);


                
            }


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
                cc.log("----------------index = " + index);
                cc.log("----------------uids = " + MjClient.data.sData.tData.uids);
                if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) { 
                    return ""; // 北斗衡阳屏蔽地理位置
                }
                var uid  = MjClient.data.sData.tData.uids[index];
                if(!uid) return;

                var pl = MjClient.data.sData.players[uid];
                if (!pl || !pl.info.location)
                {
                    return "";
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
            if (geogData.length <= 2 && 
                (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI ||
                MjClient.gameType == MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY ||
                MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG ||
                MjClient.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN ||
                MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO ||
                MjClient.gameType == MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA))
            {
                Pos2.visible = false;
            }
            else
            {
                Pos2.setString(_getTextPre(2));
            }

            var Pos3 = _back.getChildByName("play3Pos");
            if (MjClient.gameType == MjClient.GAME_TYPE.RU_GAO ||
                MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI ||
                MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER ||
                GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)//如皋只有3个人
            {
                Pos3.visible = false;
            }
            else
            {
                Pos3.setString(_getTextPre(3));
            }

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
            _play2Pos_0.ignoreContentAdaptWithSize(true);
            if (geogData.length <= 2 && 
                (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI || 
                 MjClient.gameType == MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY ||
                 MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG ||
                 MjClient.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN ||
                 MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO || 
                 MjClient.gameType == MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA))
            {
                _play2Pos_0.visible = false;
            }
            else
            {
                _play2Pos_0.setString(getUserAddressInfo(2));
            }

            var _play3Pos_0 = _back.getChildByName("play3Pos_0");
            _play3Pos_0.ignoreContentAdaptWithSize(true);
            if (MjClient.gameType == MjClient.GAME_TYPE.RU_GAO ||
                MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI ||
                MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER ||
                GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)//如皋只有3个人
            {
                _play3Pos_0.visible = false;
            }
            else
            {
                _play3Pos_0.setString(getUserAddressInfo(3));
            }

            var _play4Pos_0 = _back.getChildByName("play4Pos_0");
            _play4Pos_0 && _play4Pos_0.setString(getUserAddressInfo(4));
            _play4Pos_0 && _play4Pos_0.ignoreContentAdaptWithSize(true);

            if ((MjClient.APP_TYPE.QXYYQP == MjClient.getAppType() || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType() || isJinZhongAPPType())&&
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
            _money.visible = !MjClient.remoteCfg.hideMoney;
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                _money.visible = false;
            }

            // 海安地区点击其他人隐藏金币
            if(MjClient.getAppType() === MjClient.APP_TYPE.QXHAIANMJ){
                var pl = getUIPlayer(0);
                _money.visible = (pinfo.uid === pl.info.uid);
            }

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

            
            return true;
        },

        // 设置道具总数，默认7个道具，贵州8个道具
        setPropNum: function () {
            if(MjClient.APP_TYPE.AYGUIZHOUMJ === MjClient.getAppType()){
                MjClient.userInfoLayerUi.propNum = 8;
            }
        },

        // 获取道具index数组
        getPropList: function () {
            var num = MjClient.userInfoLayerUi.propNum;
            var list = [];
            for(var i = 0; i < num; i ++){
                list.push(i);
            }

            //再添加房间等级专属道具
            var roomLevelName = FriendCard_Common.getFangkaRoomLevelName();
            //高级房间增加互动道具“生日快乐”
            //皇冠房间增加互动道具“生日快乐”和“砸晕你”
            //尊贵房间增加互动道具“生日快乐”和“砸晕你”和“亲嘴”

            if(roomLevelName == "高级" || roomLevelName == "皇冠" || roomLevelName == "尊贵"){
                list.push(10000+11);
            }
            if(roomLevelName == "皇冠" || roomLevelName == "尊贵"){
                list.push(10000+9);
            }
            if(roomLevelName == "尊贵"){
                list.push(10000+14);
            }

            return list;
        },
        initPropUi:function () {
            var that = this;
            var _back = this._back;

            this._propListData = this.getPropList();

            var propListView = new ccui.ListView();
            this._propListView = propListView;
            propListView.setAnchorPoint(cc.p(0,0.5));
            var bg_chat_start = _back.getChildByName("bg_chat_0");
            var bg_chat_end = _back.getChildByName("bg_chat_"+(this.propNum-1));
            propListView.setPosition(bg_chat_start.x - bg_chat_start.width/2,bg_chat_start.y);
            propListView.width = bg_chat_end.x - bg_chat_start.x + bg_chat_start.width;
            propListView.height = bg_chat_start.height;
            propListView.setClippingEnabled(true);
            propListView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
            propListView.setBounceEnabled(true);
            _back.addChild(propListView);

            /**增加CD时间 */
            var attackPropList = [2, 3, 6,10009];              //鸡蛋, 手雷, 洋柿子,锤子
            if (isJinZhongAPPType()) {
                attackPropList = [5, 6,10009];  
            }
            //初始化攻击性道具下标
            this.attackPropList = attackPropList;

            function expressTouchCallBack(sender, Type){
                if(Type == 2){
                    if (MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId){
                        MjClient.native.umengEvent4CountWithProperty("Jinbichang_Fangjiannei_Wanjiaxinxi_Daojushiyong", {uid:SelfUid()});
                    }else{
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Gerenzhuye_Fasonghudongdaoju", {uid:SelfUid()});
                    }

                    var itag = sender.getTag();
                    var clubInfoTable = getClubInfoInTable();
                    if(clubInfoTable && clubInfoTable.noAttackProp){
                        if(that.attackPropList.indexOf(itag) > -1){
                            MjClient.showToast("本亲友圈已禁用鸡蛋、炸弹、番茄等攻击性表情");
                            return;
                        }
                    }
                    
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP && itag < 10000){
                        if(MjClient.data.pinfo.money >= MjClient.systemConfig.interactivePropPrice){
                            MjClient.Scene.addChild(new expressionExchangeLayer(closeCB, itag))
                        }else {
                            MjClient.Scene.addChild(new expressionReminderLayer())
                        }
                    }else {
                        if (MjClient._currentList && MjClient._currentList.indexOf(itag) >= 0) {
                            MjClient.PlayChatAniTime = new Date().getTime();
                        }

                        if (that._closeCB) {
                            that._closeCB(itag);
                        }
                        that.removeFromParent();
                    }
                }
            }

            for(var i = 0; i < this.propNum; i++){
                var propCell = _back.getChildByName("bg_chat_" +i);
                if(propCell.visible){
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ && i in this.attackPropList) //徐州限制攻击道具
                    {
                        //不添加
                    }else{
                        var _nodeChar = propCell.clone();
                        _nodeChar.setTouchEnabled(true);
                        _nodeChar.setTag(i);
                        _nodeChar.setName("bg_chat_"+i)
                        _nodeChar.addTouchEventListener(expressTouchCallBack, this);

                        var goldBg = _nodeChar.getChildByName("gold_bg");
                        if(goldBg) {
                            goldBg.setVisible(false);
                            var _textGold = goldBg.getChildByName("Text_gold");
                            _textGold.ignoreContentAdaptWithSize(true);
                            if(MjClient.systemConfig.interactivePropPrice){
                                goldBg.setVisible(true);
                                _textGold.setString(MjClient.systemConfig.interactivePropPrice);
                            }
                        }
                        propListView.pushBackCustomItem(_nodeChar);
                    }
                }
                propCell.visible = false;
            }

            for(var i = 0; i < this._propListData.length; i++){
                if(this._propListData[i] < 10000){
                    continue;
                }
                var propCell = _back.getChildByName("bg_chat_0");
                var _nodeChar = propCell.clone();
                _nodeChar.visible = true;
                _nodeChar.setTouchEnabled(true);
                _nodeChar.setTag(this._propListData[i]);
                _nodeChar.setName("bg_chat_"+this._propListData[i]);
                var icon = _nodeChar.getChildByName("icon");
                icon.scale = 0.8;
                icon.width = 140;
                icon.height = 140;
                icon.setPosition(_nodeChar.width/2,_nodeChar.height/2);
                icon.loadTextureNormal("userInfo_3.0/zhuangBan/tools/HDDJ"+(this._propListData[i] -10000)+".png");
                _nodeChar.addTouchEventListener(expressTouchCallBack, this);

                var goldBg = _nodeChar.getChildByName("gold_bg");
                if(goldBg) {
                    goldBg.setVisible(false);
                }
                propListView.pushBackCustomItem(_nodeChar);
             }

            /**
             bTouch: true允许使用道具, false限制使用
             special: 道具列表，默认全道具
             */
            function setTouchAni(bTouch, list)
            {
                var cerrentList = list || that._propListData;   // [0, 1, 2, 3, 4, 5, 6]
                for(var i = 0; i < cerrentList.length; i++){
                    var _nodeChar = that._propListView.getChildByName("bg_chat_" + cerrentList[i]);
                    if(_nodeChar){
                         _nodeChar.setTouchEnabled(bTouch);
                        var _icon = _nodeChar.getChildByName("icon");
                        _icon.setBright(bTouch);
                    }
                }
            }

            /***
             * 准备阶段下: 所有道具不可见，道具开关关闭，提示文字更换
             * 其他阶段下: 正常显示
             */
            function setPropsVisible()
            {
                if(!(isJinZhongAPPType() || isYongZhouProject())){
                    return;
                }
                if(!_back) return;
                if(!that._propListView) return;
                var tData = MjClient.data.sData.tData;
                var tipText = _back.getChildByName("tip");
                if(tData.tState == TableState.waitJoin || tData.tState == TableState.waitReady || tData.tState == TableState.roundFinish)
                {
                    that._propListView.visible = false;
                    if(tipText){
                        tipText.setVisible(true);
                        tipText.setString("准备阶段，禁止使用道具");
                    }
                }
                else{
                    that._propListView.visible = true;
                }
            }
            setPropsVisible();

            var _cdTime  = _back.getChildByName("cdTime");
            _cdTime.ignoreContentAdaptWithSize(true);

            

            MjClient._currentList = this.getPropList();
            if (cc.isUndefined(MjClient.PlayChatAniTime)){
                MjClient.PlayChatAniTime = 0;
            }
            _cdTime.schedule(function()
            {
                var time = (new Date().getTime()) - MjClient.PlayChatAniTime;
                time = parseInt(time/1000);

                var _timeBetween = 1; //发动画表情时间间隔

                if(MjClient.getAppType() === MjClient.APP_TYPE.QXXZMJ) //徐州间隔为8秒
                {
                    _timeBetween = 8;
                }
                else if(isJinZhongAPPType()||
                        MjClient.getAppType() === MjClient.APP_TYPE.QXHAIANMJ ||
                        MjClient.getAppType() === MjClient.APP_TYPE.QXNTQP)     //攻击道具30秒CD
                {
                    MjClient._currentList = attackPropList.slice();
                    _timeBetween = 30;
                }
                else if(MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) //岳阳道具10秒CD
                {
                    _timeBetween = 10;
                }
                else{
                    MjClient._currentList = null;
                }

                if (time >= _timeBetween){
                    /** todo 能点击*/
                    setTouchAni(true);
                    _cdTime.setString("点击图像发送");
                }
                else{
                    var leftTime = _timeBetween - time;
                    var minute = parseInt(leftTime % 3600 / 60);
                    var second = parseInt(leftTime % 60);
                    var min = minute >= 10 ? minute : "0" + minute;
                    var sec = second >= 10 ? second : "0" + second;
                    var time = min + ":" + sec;
                    setTouchAni(false, MjClient._currentList);
                    _cdTime.setString("灰色道具使用权限将在" + time + "后恢复");
                }
            });
        }
    });

    //牌桌看别人信息（岳阳）,应用到其他地区注意攻击道具的筛选，ip的打码
    PlayerInfoViewPlayingOther = cc.Layer.extend({
        propNum: 7,
        pinfo: null,
        ctor:function (pinfo,closeCB) {
            this._super();
            this.pinfo = pinfo;
            this._closeCB = closeCB;
            var userInfoLayerUi = ccs.load("UserInfo_playing_other.json");
            this.addChild(userInfoLayerUi.node);
            MjClient.userInfoLayerUi = this;
            var that = this;
            var _block = userInfoLayerUi.node.getChildByName("block");
            setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

            var _back = userInfoLayerUi.node.getChildByName("back");
            this._back = _back;
            setWgtLayout(_back, [0.7297,0.6972],[0.5,0.5],[0,0]);

            //关闭 按钮
            var _btnClose = _back.getChildByName("close");
            _btnClose.addTouchEventListener(function (sender, Type){
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        that.removeFromParent();
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Gerenzhuye_Close", {uid:SelfUid()});

                        break;
                    default :
                        break;
                }
            }, this);

            this.setUserInfo();
            this.setAddressMsg();
            this.setPropList();
            this.setPropSwitch();
            //获取用户成长的互动动画
            this.getUserPropList();
            return true;
        },
        
        setPropList:function(){
            //注意setPropList会被调用多次
            var that = this;
            var _back = this._back;
            //道具panel
            this._panel_prop = _back.getChildByName("Panel_prop");
            //关闭互动道具的提示
            this._text_close_prop_tip =  _back.getChildByName("Text_close_prop_tip");
            this._propListView = this._panel_prop.getChildByName("ListView_prop");
            this._propListView._cell = this._panel_prop.getChildByName("Cell");
            this._propListView._cell.visible = false;

            function expressTouchCallBack(sender, type){
                if(type == 2){
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Gerenzhuye_Fasonghudongdaoju", {uid:SelfUid()});
                    var itag = sender.getTag();
                    var clubInfoTable = getClubInfoInTable();
                    if(clubInfoTable && clubInfoTable.noAttackProp){
                        if(that._propDatas[itag].isAttachProp){
                            MjClient.showToast("本亲友圈已禁用鸡蛋、炸弹、番茄表情");
                            return;
                        }
                    }
                    var id = that._propDatas[itag].id;
                    MjClient.PlayChatAniTime = new Date().getTime();
                    if (this._closeCB) {
                        this._closeCB(id);
                    }
                    that.removeFromParent();
                }
            }
            this._propDatas = this.getDefaultPropListData();
            //再添加房间等级专属道具
            var roomLevelName = FriendCard_Common.getFangkaRoomLevelName();
            //高级房间增加互动道具“生日快乐”
            //皇冠房间增加互动道具“生日快乐”和“砸晕你”
            //尊贵房间增加互动道具“生日快乐”和“砸晕你”和“亲嘴”

            if(roomLevelName == "高级" || roomLevelName == "皇冠" || roomLevelName == "尊贵"){
                var itemData = {
                    id:10000+11,
                    resPath:"userInfo_3.0/zhuangBan/tools/HDDJ11.png",
                    type:2,//0地区默认有的,1房卡成长,2房间等级有的
                    isAttachProp:false,//是否攻击道具
                    isLocked:false,
                };
                this._propDatas.push(itemData);
            }

            if(roomLevelName == "皇冠" || roomLevelName == "尊贵"){
                var itemData = {
                    id:10000+9,
                    resPath:"userInfo_3.0/zhuangBan/tools/HDDJ9.png",
                    type:2,//0地区默认有的,1房卡成长,2房间等级有的
                    isAttachProp:true,//是否攻击道具
                    isLocked:false,
                };
                this._propDatas.push(itemData);
            }

            if(roomLevelName == "尊贵"){
                var itemData = {
                    id:10000+14,
                    resPath:"userInfo_3.0/zhuangBan/tools/HDDJ14.png",
                    type:2,//0地区默认有的,1房卡成长,2房间等级有的
                    isAttachProp:true,//是否攻击道具
                    isLocked:false,
                };
                this._propDatas.push(itemData);
            }

            //再添加用户成长的道具
            this._userPropDatas = this._userPropDatas ? this._userPropDatas : []; 

            for(var i = 0; i < this._userPropDatas.length; i++){
                var length = this._userPropDatas[i].aliasId.length;
                var id = 0;
                while(!isNaN(Number(this._userPropDatas[i].aliasId[length-1]))){
                    length--;
                }
                id = this._userPropDatas[i].aliasId.substring(length,this._userPropDatas[i].aliasId.length);
                id = parseInt(id);
                var itemData = {
                    id:10000+id,
                    resPath:"userInfo_3.0/zhuangBan/tools/"+this._userPropDatas[i].aliasId+".png",
                    type:1,//0地区默认有的,1房卡成长
                    isAttachProp:true,//是否攻击道具
                    isLocked:!this._userPropDatas[i].isLocked,
                    unlockType:this._userPropDatas[i].unlockType,
                };
                if(this._userPropDatas[i].unlockType == 52 && itemData.isLocked){
                    continue;
                }
                this._propDatas.push(itemData);
            }
            for(var i = 0; i <this._propDatas.length; i++){
                var item = this._propListView.getItems()[parseInt(i/2)];
                if(!item){
                    item = this._propListView._cell.clone();
                    item.getChildByName("bg_chat_1").visible = false;
                    item.visible = true;
                    this._propListView.pushBackCustomItem(item);
                }
                var itemData = this._propDatas[i];
                var cell = item.getChildByName("bg_chat_"+(i%2));
                var icon = cell.getChildByName("icon");
                icon.loadTextureNormal(itemData.resPath);
                var imgTip = cell.getChildByName("Image_tip");
                if(itemData.isLocked){
                    imgTip.visible = true;
                    var _filePath = "usernfo/table/img_g" + itemData.unlockType + ".png";
                    if (jsb.fileUtils.isFileExist(_filePath)) {
                        imgTip.loadTexture("usernfo/table/img_g" + itemData.unlockType + ".png")
                    }else{
                        imgTip.visible = false;
                    }

                    
                }else{
                    imgTip.visible = false;
                }
                cell.visible = true;
                cell.setTag(i);
                cell.addTouchEventListener(expressTouchCallBack, this);
            }
            
            /**
             bTouch: true允许使用道具, false限制使用
             special: 道具列表，默认全道具
             */
            function setTouchAni(bTouch){
                for(var i = 0; i <that._propDatas.length; i++){
                    var item = that._propListView.getItems()[parseInt(i/2)];
                    if(!item){
                        break;
                    }
                    if(that._propDatas[i].isLocked){
                        bTouch = false;
                    }
                    var cell = item.getChildByName("bg_chat_"+(i%2));
                    cell.setTouchEnabled(bTouch);
                    var _icon = cell.getChildByName("icon");
                    _icon.ignoreContentAdaptWithSize(true);
                    _icon.setBright(bTouch);
                }
            }
            setTouchAni(true);

            var _cdTime = this._panel_prop.getChildByName("cdTime");
            this._cdTime = _cdTime;
            if(cc.isUndefined(MjClient.PlayChatAniTime)){
                MjClient.PlayChatAniTime = 0;
            }
            _cdTime.schedule(function(){
                var time = (new Date().getTime()) - MjClient.PlayChatAniTime;
                time = parseInt(time/1000);

                var _timeBetween = 10; //发动画表情时间间隔

                if (time >= _timeBetween){
                    setTouchAni(true);
                    _cdTime.setString("点击图像发送");
                }
                else{
                    var leftTime = _timeBetween - time;
                    var second = parseInt(leftTime / 1000);
                    var sec = second >= 10 ? second : "0" + second;
                    var time = sec;
                    setTouchAni(false);
                    //_cdTime.setString("灰色道具使用权限将在" + time + "后恢复");
                }
            });
        },
        // 获取道具默认的数据数组
        getDefaultPropListData: function () {
            var list = [
                {
                    id:0,
                    resPath:"userInfo_3.0/zhuangBan/tools/HDDJ_default_1.png",
                    type:0,//0地区默认有的,1房卡成长
                    isAttachProp:false,//是否攻击道具
                    isLocked:false,
                },
                {
                    id:1,
                    resPath:"userInfo_3.0/zhuangBan/tools/HDDJ_default_2.png",
                    type:0,//0地区默认有的,1房卡成长
                    isAttachProp:false,//是否攻击道具
                    isLocked:false,
                },
                {
                    id:2,
                    resPath:"userInfo_3.0/zhuangBan/tools/HDDJ_default_3.png",
                    type:0,//0地区默认有的,1房卡成长
                    isAttachProp:true,//是否攻击道具
                    isLocked:false,
                },
                {
                    id:3,
                    resPath:"userInfo_3.0/zhuangBan/tools/HDDJ_default_4.png",
                    type:0,//0地区默认有的,1房卡成长
                    isAttachProp:true,//是否攻击道具
                    isLocked:false,
                },
                {
                    id:4,
                    resPath:"userInfo_3.0/zhuangBan/tools/HDDJ_default_5.png",
                    type:0,//0地区默认有的,1房卡成长
                    isAttachProp:false,//是否攻击道具
                    isLocked:false,
                },
                {
                    id:5,
                    resPath:"userInfo_3.0/zhuangBan/tools/HDDJ_default_6.png",
                    type:0,//0地区默认有的,1房卡成长
                    isAttachProp:false,//是否攻击道具
                    isLocked:false,
                },
                {
                    id:6,
                    resPath:"userInfo_3.0/zhuangBan/tools/HDDJ_default_7.png",
                    type:0,//0地区默认有的,1房卡成长
                    isAttachProp:true,//是否攻击道具
                    isLocked:false,
                }
            ]
            return list;
        },
        getUserPropList:function(){
            MjClient.block();
            var that = this;
            var sendInfo = {
                length:200
            }
            MjClient.gamenet.request("pkplayer.handler.userDressHDDJList",sendInfo,function(rtn) {
                MjClient.unblock();
                if (rtn.code == 0){
                    that._userPropDatas = rtn.data ? rtn.data:[];

                    that.setPropList();
                }
            });
        },
        setPropSwitch:function(){
            var that = this;
            var _back = this._back;
            //道具开关
            var _props = util.localStorageEncrypt.getBoolItem("_InteractiveProps", true);
            var _nodeProps = _back.getChildByName("propCheckBox");
            var _propsText = _nodeProps.getChildByName("text");
            
            function setPropsStation(station) {
                that._cdTime.setVisible(station);
                that._panel_prop.visible = station;
                that._text_close_prop_tip.visible = !station;
            }
            function selectedCB(text, isSelected) {
                if (isSelected) {
                    text.setTextColor(CREATEROOM_COLOR_1);
                } else {
                    text.setTextColor(CREATEROOM_COLOR_2);
                }
            }

            _nodeProps.setSelected(_props);
            setPropsStation(_props);
            selectedCB(_propsText, _props);

            _propsText.addTouchEventListener(function(sender,type){
                if(type == 2) {
                    _nodeProps.setSelected(!_nodeProps.isSelected());
                    selectedCB(_propsText, _nodeProps.isSelected());
                    setPropsStation(_nodeProps.isSelected());
                    util.localStorageEncrypt.setBoolItem("_InteractiveProps", _nodeProps.isSelected());

                    if (_nodeProps.isSelected()){
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Gerenzhuye_Shiyonghudongdaoju_Xuanzhong", {uid:SelfUid()});
                    }
                    else{
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Gerenzhuye_Shiyonghudongdaoju_QuxiaoXuanzhong", {uid:SelfUid()}); 
                    }
                }
            });
            _nodeProps.addEventListener(function(sender,type)
            {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        selectedCB(_propsText, true);
                        setPropsStation(true);
                        util.localStorageEncrypt.setBoolItem("_InteractiveProps", true);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Gerenzhuye_Shiyonghudongdaoju_Xuanzhong", {uid:SelfUid()});
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        selectedCB(_propsText, false);
                        setPropsStation(false);
                        util.localStorageEncrypt.setBoolItem("_InteractiveProps", false);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Gerenzhuye_Shiyonghudongdaoju_QuxiaoXuanzhong", {uid:SelfUid()}); 
                        break;
                }

            }, _nodeProps);
        },
        setUserInfo:function(){
            var pinfo = this.pinfo;
            var _back = this._back;
            var _name = _back.getChildByName("name");//姓名
            var _nameStr = unescape(pinfo.nickname);
            _name.ignoreContentAdaptWithSize(true);
            _name.setString(getPlayerName(_nameStr,11));
            
            var _headImg = _back.getChildByName("headImg");//头像
            _headImg.isMask = false;
            COMMON_UI.refreshHead(this, pinfo.headimgurl, _headImg);
            
            var _ID = _back.getChildByName("ID");//ID
            _ID.setString("ID:"+pinfo.uid);
            _ID.ignoreContentAdaptWithSize(true);

            //联盟俱乐部，不同subClubId ID第二位开始隐藏3位
            if (MjClient.data.sData && MjClient.data.sData.tData && pinfo.clubId){
                var tData = MjClient.data.sData.tData;
                var hasFindSelf = false;//避免回放别人视角

                var hideIdStr = pinfo.uid +"";
                if(hideIdStr.length >= 4){
                    hideIdStr = hideIdStr.slice(0,1) + "***" + hideIdStr.slice(4,hideIdStr.length)
                }
                for (var i = 0; i < tData.uids.length; i++) {
                    var plSelf = MjClient.data.sData.players[tData.uids[i]];
                    if (plSelf && tData.uids[i] == MjClient.data.pinfo.uid) {
                        hasFindSelf = true;
                        if(plSelf.info.clubId == pinfo.clubId){

                        }else{
                            _ID.setString("ID:"+hideIdStr);
                        }
                    }
                }
                if(!hasFindSelf){
                    _ID.setString("ID:"+hideIdStr);
                }
            }

            //IP
            var _IP = _back.getChildByName("IP");
            _IP.ignoreContentAdaptWithSize(true);
            var ipStr = pinfo.remoteIP ? ("IP: " + pinfo.remoteIP) :"" ;
            _IP.setString(ipStr);
        },
        setAddressMsg:function(){
            var _back = this._back;
            this._geogData = [];
            if (MjClient.data.sData && MjClient.data.sData.tData){
                var tData = MjClient.data.sData.tData;
                for (var i = 0; i < tData.uids.length; i++) {
                    var pl = MjClient.data.sData.players[tData.uids[i]];
                    if (pl && pl.locationMsg) {
                        this._geogData.push(pl.locationMsg);
                    }
                }
            }
            //玩家位置
            for(var i = 0; i < 6; i++){
                var addressInfoLeft = _back.getChildByName("play"+i+"Pos");
                if(addressInfoLeft){
                    addressInfoLeft.setString(this.getUserAddressInfoLeft(i));
                    var addressInfoRight = _back.getChildByName("play"+i+"Pos_0");
                    addressInfoRight.setString(this.getUserAddressInfoRight(i));
                    addressInfoRight.ignoreContentAdaptWithSize(true);
                    if (i == 1 && this._geogData.length <= 2 && 
                    (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI ||
                    MjClient.gameType == MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY ||
                    MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG ||
                    MjClient.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN ||
                    MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO || 
                    MjClient.gameType == MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA))
                    {
                        addressInfoLeft.visible = false;
                        addressInfoRight.visible = false;
                    }else if(i == 2 && 
                    (MjClient.gameType == MjClient.GAME_TYPE.RU_GAO ||
                    MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER ||
                    GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI))
                    {
                        addressInfoLeft.visible = false;
                        addressInfoRight.visible = false;
                    }
                }
                
            }
        },
        getUserAddressInfoRight:function(index){//详细地址信息
            var geogData = this._geogData;
            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) { 
                return ""; // 北斗衡阳屏蔽地理位置
            }
            var uid  = MjClient.data.sData.tData.uids[index];
            if(!uid) return;

            var pl = MjClient.data.sData.players[uid];
            if (!pl || !pl.info.location){
                return "";
            }
            var _address = pl.info.location.address;

            var addressInfo = "";
            if (index >= geogData.length){
                return addressInfo;
            }
            var plyPos = geogData[index].split(";");
            var addressStr = plyPos[4];

            if(!_address){
                _address = addressStr;
            }

            var addressVec = JSON.parse(_address);
            for (var i=0; i<addressVec.length-2; i++)//精确到街道
            {
                addressInfo += addressVec[i];
            }
            return addressInfo;
        },
        getUserAddressInfoLeft:function (index){//xx的位置
            var geogData = this._geogData;
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
        },
        
    });

})();


var expressionExchangeLayer = cc.Layer.extend({
    ctor: function (callBack, tag) {
        this._super();
        var UI = ccs.load("expressionExchangeLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.6, 0.6], [0.5, 0.5], [0, 0]);

        //关闭按钮
        var close = this._back.getChildByName("btn_cancle");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var icon = this._back.getChildByName("bg_chat").getChildByName("icon");
        icon.ignoreContentAdaptWithSize(true);
        if(tag > 3){
            icon.loadTexture("playing/other/info_n_send_"+tag+"_0.png");
        }else {
            icon.loadTexture("playing/other/info_n_send_"+tag+".png");
        }
        if(tag == 6){
            icon.setScale(0.8);
            icon.x = 63;
            icon.y = 35;
        }

        var Text_gold = this._back.getChildByName("Text_gold");
        Text_gold.ignoreContentAdaptWithSize(true);
        Text_gold.setString(MjClient.systemConfig.interactivePropPrice);

        var btnSure = this._back.getChildByName("btn_sure");
        btnSure.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(MjClient._currentList && MjClient._currentList.indexOf(tag) >= 0){
                    MjClient.PlayChatAniTime = new Date().getTime();
                }

                if(callBack)
                {
                    callBack(tag);
                }
                self.removeFromParent();
                if(cc.sys.isObjectValid(MjClient.userInfoLayerUi)){
                    MjClient.userInfoLayerUi.removeFromParent();
                }
            }
        }, this);

        return true;
    },
});

var expressionReminderLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var UI = ccs.load("expressionReminderLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.6, 0.6], [0.5, 0.5], [0, 0]);

        //关闭按钮
        var close = this._back.getChildByName("btn_sure");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        return true;
    },
});