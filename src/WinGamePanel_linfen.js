//处理临汾app 小结算界面
DealRoundEnd_LF = function(node){
    function delayExe()
    {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        resetEatActionAnim();

        node.addChild(new EndOneView_linfen(),500);
    }
    //明牌  其他三人的牌
    if (MjClient.rePlayVideo == -1){
        for (var off = 1; off <= 3; off++) {
            showPlayerCards_LF(getNode(off), off);
        }
    }
    node.runAction(cc.sequence(cc.DelayTime(0.2),cc.callFunc(delayExe)));
}

//临汾App 明牌(手牌以及吃碰杠牌)
showPlayerCards_LF = function(node, off)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pl = getUIPlayer(off);
    if(!pl)
    {
        return;
    }


    //去除不可见手牌
    var children = node.children;
    for(var i = 0; i < children.length; i++)
    {
        if(children[i].name == "mjhand" || children[i].name == "gang1" || children[i].name == "standPri")
        {
            children[i].removeFromParent();
        }
    }

    //添加可见手牌
    for(var i = 0; i < pl.mjgang1.length; i++)
    {
        for(var j = 0; j < 4; j++)
        {
            if(j == 3)
            {
                getNewCard(node, "up", "gang1", pl.mjgang1[i], off, "isgang4");
            }
            else
            {
                getNewCard(node, "up", "gang1", pl.mjgang1[i], off);
            }
        }
    }
    
    for (var i = 0; i < pl.mjhand.length && i < 14; i++) {
        getNewCard(node, "up", "mjhand_replay", pl.mjhand[i], off);
    }

    //叫听牌
    var children = node.children;
    for(var i = 0; i < children.length; i++)
    {
        if(children[i] && ( children[i].name == "newout" || children[i].name == "out" )
            && children[i].istingcard == true)
        {  
            children[i].removeAllChildren();
            setCardSprite(children[i], children[i].tag, off);
            children[i].setColor(cc.color(240, 230, 140));
            break;
        }
    }

    if (MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI) 
    {
        //cardLayoutRestoreForEndOne_hongtongwangpai(node, off);
        MjClient.playui.CardLayoutRestore(node, off,true);
    }
    else
    {
        MjClient.playui.CardLayoutRestore(node, off);
    }
}

/**create
 * @Description: 临汾结算界面桌面信息展示 （拉伸弹框） 
 */
getRoundInfoUI_linfen = function(strInfo,tableId) {

    var roundui = ccs.load("PlayaroundInfo.json");
    if (!cc.sys.isObjectValid(MjClient.playui) ) {
        return;
    }

    roundui.node.setName("node_roomInfo_end")
    var _infoNode = roundui.node;
    if (_infoNode) {
        var size_width = 318;
        var size_hight = 100;
        var pos_x1 = 320;
        var pos_x2 = 0;
        setWgtLayout(_infoNode, [0.15, 0.15], [0.0, 0.85], [0, 0]);

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ
            || isJinZhongAPPType()
            || MjClient.getAppType() == MjClient.APP_TYPE.TXLVLIANGMJ
            || MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ) {
            setWgtLayout(_infoNode, [0.1, 0.1], [0.0, 0.9], [0, 0]);
            size_hight = 85;
        }

        var _roundInfoNode = _infoNode.getChildByName("info_bg").getChildByName("roundInfo");

        _roundInfoNode.setString(strInfo);       
        _roundInfoNode.setContentSize(size_width,size_hight);
        var _tableIdNode_1 = _infoNode.getChildByName("Image_1");
        if (_tableIdNode_1) {
            var _tableIdNode = _tableIdNode_1.getChildByName("tableid");
            if (tableId) {
                _tableIdNode.ignoreContentAdaptWithSize(true);
                _tableIdNode.setString(tableId);
                var _bannerNode = MjClient.playui._downNode.getParent().getChildByName("banner");
                //原来房间号的隐藏 如果 结构改变 请自己额外添加
                if (_bannerNode && _bannerNode.getChildByName("tableid") && _bannerNode.getChildByName("roomNo")) {
                    _bannerNode.getChildByName("tableid").visible = false;
                    _bannerNode.getChildByName("roomNo").visible = false;
                }                
                pos_x2 = 145;
                pos_x1 = 480;
            } else {
                _tableIdNode_1.visible = false;   
            }

        }
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ
            || isJinZhongAPPType()
            || MjClient.getAppType() == MjClient.APP_TYPE.TXLVLIANGMJ
            || MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ) {
            var _gametype = _tableIdNode_1.getChildByName("gameType");
            _gametype.setString(GameCnName[MjClient.gameType]);
        }
        var _info = MjClient.playui._downNode.getParent().getChildByName("roundInfo");
        if (_info) _info.visible = false;     
        
        var _info_bgNode = _infoNode.getChildByName("info_bg");
        _info_bgNode.setPosition(cc.p(pos_x2, 41.10));
        _info_bgNode.setUserData(0);
        _roundInfoNode.visible = false;

        var _btn_arrowNode = _infoNode.getChildByName("info_bg").getChildByName("btn_arrow");
        var arrow_posX = _btn_arrowNode.getPositionX();
        _btn_arrowNode.setTouchEnabled(true);
        _btn_arrowNode.loadTexture("playing/other/roomInfo2.png");
        _btn_arrowNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (_info_bgNode.getUserData() == 0) {
                    _info_bgNode.runAction(cc.sequence(cc.moveTo(0.5, cc.p(pos_x1, 41.10)), cc.callFunc(function() {

                    })));
                    _btn_arrowNode.loadTexture("playing/other/roomInfo3.png");
                    _info_bgNode.setUserData(1);
                    _roundInfoNode.visible = true;
                    if (_line) {

                        _line.visible = _size.width > max_size ? true:false;
                    }
                } else {
                    _info_bgNode.runAction(cc.sequence(cc.moveTo(0.5, cc.p(pos_x2, 41.10)), cc.callFunc(function() {
                        //_btn_arrowNode.loadTexture("playing/other/roomInfo2.png");
                    })));
                    _btn_arrowNode.loadTexture("playing/other/roomInfo2.png");
                    _info_bgNode.setUserData(0);
                    _roundInfoNode.visible = false;
                    if (_line) {
                        _line.visible = false;
                    }
                }
            }
        }, this);
        return roundui.node;
    }
};


function SetEndOneUserUI_linfen(node,off)
{
	var sData=MjClient.data.sData;
	var tData=sData.tData;
	var pl=getUIPlayer(off);
	node.setVisible(false);
    if(!pl)return;


    if(off == 1 || off == 3)
    {
        node.visible = MjClient.MaxPlayerNum != 2;
    }

    if( off == 2)
    {
        node.visible = MjClient.MaxPlayerNum != 3;
    }

    if( off == 0){
        node.visible = true;
    }

    node=node.getChildByName("result");

	var uibind= {
        result: {
			hu: {
				_run: function () {
					setGameOverPanelPlayerState(this, pl, true);		
				}
			},
            cutnum: {
                _run: function () {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    var pre = "";
                    if (pl.winone >= 0){
                        return pre;
                    }else{
                        return pre + pl.winone;
                    }
                },
            },
            addnum: {
                _run: function () {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    var pre = "";
                    if (pl.winone < 0){
                        return pre;
                    }else{
                        return pre + "+" + pl.winone;
                    }
                },
            },
            cardType: {
                _run:function()
                {
                    // this.zIndex = 100;
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return pl.mjdesc + ""
                },
            },
            img_bg:{
                _run:function()
                {
                    var size_width = 0;
                    var size_height = 0;
                    var cardTypeSize = this.getParent().getChildByName("cardType").getContentSize();
                    if (cardTypeSize.width != 0 && cardTypeSize.height != 0) {
                        size_width = cardTypeSize.width + 6;
                        size_height = cardTypeSize.height + 10;
                    }
                    this.setContentSize(size_width, size_height);
                },
            },
		}
	};
	BindUiAndLogic(node.parent,uibind);
}

var EndOneView_linfen = cc.Layer.extend({
	jsBind:{
		block: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0], true]
        },
		back:{
            _layout:[[1,1],[0.5,0.5],[0,0]]
        ,
		share:{
            _click:function(btn,eT){
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Xiaojiesuanjiemian_Fenxiang", {uid:SelfUid()});
                
                MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                {
                    postEvent("capture_screen");
                    MjClient.endoneui.capture_screen = true;
                    btn.setTouchEnabled(false);
                });
            }
            ,_event:{
                captureScreen_OK: function () {
                    if (MjClient.endoneui.capture_screen != true)
                        return;
                    MjClient.endoneui.capture_screen = false;
                    var writePath = jsb.fileUtils.getWritablePath();
                    var textrueName = "wxcapture_screen.png";
                    var savepath = writePath+textrueName;
                    MjClient.shareImageToSelectedPlatform(savepath);
                    this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                    {
                        this.setTouchEnabled(true);
                    }.bind(this))));
                }
            }
            ,_visible :function()
			{
					var tData = MjClient.data.sData.tData;
					return (!MjClient.remoteCfg.guestLogin && !tData.matchId);
			}
		},
		ready:{
			_run:function ()
			{
				if(MjClient.remoteCfg.guestLogin)
				{
					setWgtLayout(this, [0.15, 0.15],[0.5, 0.085],[0, 0], false, true);
				}
			},
			_click:function(btn,eT)
			{
				/*
				 准备的时候花清掉
				 */
                for(var i = 0; i < 4;i++)
                {
                    var pl = getUIPlayer(i)
                    if(pl && pl.mjflower)
                    {
                        pl.mjflower = [];
                    }
                }

                var sData=MjClient.data.sData;
                var tData=sData.tData;

                if (sData.tData.roundNum <= 0) 
                {
                    MjClient.endoneui.getParent().addChild(new GameOverLayer(),500);
                    // if(!tData.matchId){
                    //     MjClient.endoneui.getParent().addChild(new GameOverLayer(),500);
                    // }else{
                    //     MjClient.endoneui.getParent().runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){
                    //         MjClient.endoneui.getParent().addChild(new GameOverLayer(),500);
                    //     })))
                    // }
                }

				postEvent("clearCardUI");
				MjClient.endoneui.removeFromParent(true);
                MjClient.endoneui = null;

                if (MjClient.rePlayVideo >= 0 && MjClient.replayui) {
                    MjClient.replayui.replayEnd();
                }
                else {
                    if (MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI){
                        MjClient.MJPass2NetForhongtongwangpai();
                    }else if(MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI){
                        MjClient.MJPass2NetForlinfenyingsanzui();
                    }else if(MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI){
                        MjClient.MJPass2NetForlinfenyimenzi();
                    }else if(MjClient.gameType == MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG){
                        MjClient.MJPass2NetForlinfenjixian();
                    }else if(MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN){
                        MjClient.MJPass2NetForxiangningshuaijin();
                    }else if(MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI){
                        MjClient.MJPass2NetForlinfenkoudianfengzuizi();
                    }else if(MjClient.gameType == MjClient.GAME_TYPE.FEN_XI_YING_KOU){
                        MjClient.MJPass2NetForfenxiyingkou();
                    }
                }
				reInitarrCardVisible();

			},
			_visible :function()
			{
				var tData = MjClient.data.sData.tData;
				return !tData.matchId;
			}
		},
        huang: {
            _visible:false,
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                var tData = MjClient.data.sData.tData;
                // if(MjClient.CheckPlayerCount(function(p){ if(p.winone==0){return true;} return false;}) == tData.maxPlayer)
                // {
                //     this.visible = true;
                // }
                this.visible = true;
                if (MjClient.isDismiss)
                {
                    this.loadTexture("gameOver/jiesan_1.png");
                }
                else if(MjClient.CheckPlayerCount(function(p){ if(p.winone==0){return true;} return false;}) == tData.maxPlayer)
                {
                    if(isRealHuangZhuang()) this.loadTexture("gameOver/ico_hz.png");
                }
                else
                {
                    this.visible = false;
                }
            }
        },
		dir: {
			_visible:true,
            _run:function(){
                //this.ignoreContentAdaptWithSize(true);
                var strInfo = getPlayingRoomInfo(0);
                this.setString(strInfo);
                //this.setContentSize(318,100);
            }
		},
		head0:{
			head:{
				zhuang:{_visible:false}
			},
		    winNum:{
			},
		   _run:function(){ SetEndOneUserUI_linfen(this,0); },
		   
		},
		head1:{
		   head:{
			   zhuang:{_visible:false}
		   },
	       winNum:{
			   // _layout:[[0.08,0.08],[1,0.5],[-2.5,0.75]]
		   },
		  _run:function(){ SetEndOneUserUI_linfen(this,1); }
		},
		head2:{
		   head:{
			   zhuang:{_visible:false}
		   },
	       winNum:{
			   // _layout:[[0.08,0.08],[1,0.5],[-2.5,-0.75]]
		   },
		   _run:function(){ SetEndOneUserUI_linfen(this,2); }
		},
		head3:{
			 head:
			 {
				zhuang:{_visible:false}
			 },
			 winNum:{
				 // _layout:[[0.08,0.08],[1,0.5],[-2.5,-2.25]]
			 },
			_run:function(){ SetEndOneUserUI_linfen(this,3); }
			},
		}
	},
    ctor:function () {
        this._super();
        var endoneui = ccs.load("endOne_linfen.json");
		BindUiAndLogic(endoneui.node,this.jsBind);
        this.addChild(endoneui.node);
        MjClient.endoneui=this;

        var tData = MjClient.data.sData.tData;
        var infoUI_node = getRoundInfoUI_linfen(getPlayingRoomInfo(0),tData.tableid);
        MjClient.endoneui.addChild(infoUI_node,1);

        var _back = endoneui.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0], true);

        changeMJBg(this, getCurrentMJBgType());
 		return true;
    }
});