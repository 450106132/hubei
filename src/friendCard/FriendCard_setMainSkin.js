/** 
 * @Description: 亲友圈设置皮肤界面
 */
var Friendcard_setMainSkin = cc.Layer.extend({
    ctor:function (data,clubId) {
        this._super();
        this.clubId = clubId;
        this.data = data || null;
        var node = ccs.load("friendcard_setMainSkin.json").node;
        this.addChild(node);
        this.node = node;
        this.back = node.getChildByName("back");
        setWgtLayout(node.getChildByName("block"), [1, 1], [0.5,0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("back"), [0, 1], [1,0], [-1, 0]);

        //popupAnm(this.back);

        this.initSetSkinLayer();
        this.setDefaultOption(data.info.skinCfg);
    },
     //init设置皮肤界面
    initSetSkinLayer:function()
    {
    	var that = this;
    	this.back.addTouchEventListener(function(sender, type) {
			if (type == 2)
			{
				if(MjClient.FriendCard_main_ui)
				{
					var skinCfg =  MjClient.FriendCard_main_ui.getNativeSkinCfg();
					if(MjClient.FriendCard_main_ui.setMainBGImg){
						MjClient.FriendCard_main_ui.setMainBGImg(skinCfg.mainBG);
					}
					if(MjClient.FriendCard_main_ui.setMainDibanImg){
						MjClient.FriendCard_main_ui.setMainDibanImg(skinCfg.DBBG);
					}
					MjClient.FriendCard_main_ui.refreshDeskList();
				}
				that.removeFromParent();
			}
		}, this);

    	//保存
    	var saveBtn = this.back.getChildByName("saveBtn");
    	saveBtn.addTouchEventListener(function(sender, type) {
			if (type == 2)
			{
				MjClient.native.umengEvent4CountWithProperty("Qinyouquan_pifu_baocun", {uid:SelfUid()});
				this.reqSet();
			}
		}, this);

    	//本地保存
    	var previewBtn = this.back.getChildByName("previewBtn");
    	previewBtn.addTouchEventListener(function(sender, type){
            if (type == 2)
            {
            	MjClient.native.umengEvent4CountWithProperty("Qinyouquan_pifu_yulan", {uid:SelfUid()});
				if(MjClient.FriendCard_main_ui)
				{
					MjClient.showToast("当前设置仅供临时预览");
					MjClient.FriendCard_main_ui.setNativeSkinCfg(this.getSendInfo());
				}
				that.removeFromParent();
            }
        }, this);

    	var scrollView = this.back.getChildByName("scrollView")
		this.mainBgList = [];
		if(FriendCard_Common.getSkinType() != 4){
			for (var i = 0; i < 3; i++) {
	        	this.mainBgList[i] = scrollView.getChildByName("beiJing").getChildByName("gameBg"+(i+1));
	        	this.mainBgList[i].index = i;

	        	this.mainBgList[i].addTouchEventListener(function(sender, type) {
					if (type != 2)
						return;

					MjClient.native.umengEvent4CountWithProperty("Qinyouquan_pifu_beijing" + sender.index + 1, {uid:SelfUid()});
					that.runAction(cc.callFunc(function() {
	                    that.onClickMainBgBtn(sender.index);
	                }));    
				}, this);

				this.mainBgList[i].getChildByName("Image_1").addTouchEventListener(function(sender, type) {
					if (type != 2)
						return;

					MjClient.native.umengEvent4CountWithProperty("Qinyouquan_pifu_beijing" + sender.index + 1, {uid:SelfUid()});
					that.runAction(cc.callFunc(function() {
	                    that.onClickMainBgBtn(sender.getParent().index);
	                }));    
				}, this);
	        }
        }

        //底板
        if(FriendCard_Common.getSkinType() == 2 && MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ)
        {
        	this.DBBgList = [];
	         for (var i = 0; i < 2; i++) {
	        	this.DBBgList[i] = scrollView.getChildByName("diban").getChildByName("gameBg"+(i+1));
	        	this.DBBgList[i].index = i;

	        	this.DBBgList[i].addTouchEventListener(function(sender, type) {
					if (type != 2)
						return;

					that.runAction(cc.callFunc(function() {
	                    that.onClickDibanBtn(sender.index);
	                }));    
				}, this);

				this.DBBgList[i].getChildByName("Image_1").addTouchEventListener(function(sender, type) {
					if (type != 2)
						return;

					that.runAction(cc.callFunc(function() {
	                    that.onClickDibanBtn(sender.getParent().index);
	                }));    
				}, this);
	        }
        }
        
		var func = function(widget){
			widget.addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;

				that.runAction(cc.callFunc(function() {
	                that.onClickBgBtn(sender.ruleIndex,sender.index);
	            }));    
			});

			widget.getChildByName("Image_1").addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;

				that.runAction(cc.callFunc(function() {
	                that.onClickBgBtn(sender.getParent().ruleIndex,sender.getParent().index);
	            }));    
			});
		}
		this.ruleBGList = {};
		var item = this.back.getChildByName("item");
		item.visible = false;
		this._ruleSort = {};
		this._indexs = [];
		for (var i = 1; i <= FriendCard_Common.getRuleNumber(); i ++) {
			var rule = this.data.info["rule" + i];
			if (rule && rule != "delete"){
	            this._indexs.push(i);
	            this._ruleSort[this._indexs.length] = i;
			}
		}

		for(var i = 1; i<=this._indexs.length;i++){
			this.ruleBGList["rule"+this._ruleSort[i]]=[];
			var rule = this.data.info["rule" + this._ruleSort[i]]
			var _item = item.clone();
			var img_hua1 = _item.getChildByName("img_hua1");
			var img_hua2 = _item.getChildByName("img_hua2");
			var ruleName = _item.getChildByName("ruleName");
			ruleName.ignoreContentAdaptWithSize(true);
			ruleName.setString(unescape(rule.ruleName));
			if(img_hua1 && img_hua2){
				img_hua1.x = ruleName.x - ruleName.width/2 -17;
				img_hua2.x = ruleName.x + ruleName.width/2 +17;
			}
			this.ruleBGList["rule"+this._ruleSort[i]].gameType = rule.gameType;
			_item.visible = true;
			scrollView.addChild(_item);
			_item.name = "rule"+i;
			for (var j = 0; j < 12; j++) {
				var _itemScr = _item.getChildByName("scrollView")
				var _itemBG = _itemScr.getChildByName("gameBg"+(j+1));
				_itemScr.setSwallowTouches(false);
				_itemScr.setScrollBarOpacity(0);
				if(!_itemBG){
					return;
				}
	        	this.ruleBGList["rule"+this._ruleSort[i]][j] = _itemBG;
	        	this.ruleBGList["rule"+this._ruleSort[i]][j].index = j;
	        	this.ruleBGList["rule"+this._ruleSort[i]][j].ruleIndex = this._ruleSort[i];
	        	func(this.ruleBGList["rule"+this._ruleSort[i]][j])
	        }	
		}
    },
    //主背景图片
	onClickMainBgBtn:function(index)
	{
		for (var i = 0; i < this.mainBgList.length; i++) {
			 this.mainBgList[i].setSelected(false)
		}
		this.mainBgList[index].setSelected(true);
		this.mainBgList._index = index;
		if(MjClient.FriendCard_main_ui && MjClient.FriendCard_main_ui.setMainBGImg)
		{
			MjClient.FriendCard_main_ui.setMainBGImg(index);
		}
		this.movePosition(index)
	},
	//主背景底板图片
	onClickDibanBtn:function(index)
	{
		if(FriendCard_Common.getSkinType() != 2 || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ)
			return;

		for (var i = 0; i < this.DBBgList.length; i++) {
			 this.DBBgList[i].setSelected(false)
		}
		this.DBBgList[index].setSelected(true);
		this.DBBgList._index = index;
		if(MjClient.FriendCard_main_ui)
		{
			MjClient.FriendCard_main_ui.setMainDibanImg(index);
		}
	},
	//移动麻将扑克字牌设置的位置
	movePosition:function(index)
	{
		if(FriendCard_Common.getSkinType() != 2 )
			return;

		var scrollView = this.back.getChildByName("scrollView");
		var diban = scrollView.getChildByName("diban");
		if(!diban.initHeight)
		{
			diban.initHeight = diban.height
		}
		if(index == 0 && MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ)
		{
			diban.visible = true;
			diban.height = diban.initHeight
		}
		else
		{
			diban.visible = false;
			diban.height = 0
		}
		scrollView.forceDoLayout();
		scrollView.jumpToPercentVertical(0);
	},
	//桌子背景图片
	onClickBgBtn:function(ruleIndex,index)
	{
		this.ruleBGList["rule"+ruleIndex]
		for (var i = 0; i < this.ruleBGList["rule"+ruleIndex].length; i++) {
			 this.ruleBGList["rule"+ruleIndex][i].setSelected(false)
		}
		this.ruleBGList["rule"+ruleIndex][index].setSelected(true);
		this.ruleBGList["rule"+ruleIndex]._index = index;

		
		if(MjClient.FriendCard_main_ui){
			MjClient.FriendCard_main_ui.setMainDeskBGImg(ruleIndex,index);
		}
	},
	//默认选择
    setDefaultOption:function(skinCfg)
    {
    	if(FriendCard_Common.isLeader())
		{
			skinCfg = MjClient.FriendCard_main_ui.getNativeSkinCfg();
		}
		if(FriendCard_Common.getSkinType() != 4){
			for (var i = 0; i < this.mainBgList.length; i++) {
				this.mainBgList[i].setSelected(false)
			}
			this.mainBgList[skinCfg.mainBG].setSelected(true);
			this.mainBgList._index = skinCfg.mainBG;
		}
		
		if(FriendCard_Common.getSkinType() == 2 &&  MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ)
		{
			for (var i = 0; i < this.DBBgList.length; i++) {
				this.DBBgList[i].setSelected(false)
			}
			if(skinCfg["DBBG"])
			{
				this.DBBgList[skinCfg["DBBG"]].setSelected(true);
				this.DBBgList._index = skinCfg["DBBG"];
			}
			else
			{
				this.DBBgList[0].setSelected(true);
				this.DBBgList._index = 0;
			}
		}
		
		for (var i = 0; i < this._indexs.length; i++) {
			 for (var j = 0; j < this.ruleBGList["rule"+this._ruleSort[i+1]].length; j++) {
			 	 this.ruleBGList["rule"+this._ruleSort[i+1]][j].setSelected(false);
			 }
			 if(skinCfg["rule"+this._ruleSort[i+1]] == -1)
			 {
			 	skinCfg["rule"+this._ruleSort[i+1]] = skinCfg[FriendCard_Common.getGameCalssType(this.ruleBGList["rule"+this._ruleSort[i+1]].gameType)+"BG"];
			 }

			this.ruleBGList["rule"+this._ruleSort[i+1]][skinCfg["rule"+this._ruleSort[i+1]]].setSelected(true);
			this.ruleBGList["rule"+this._ruleSort[i+1]]._index = skinCfg["rule"+this._ruleSort[i+1]];
		}

		this.movePosition(skinCfg.mainBG);

    },
    getSendInfo:function()
    {
    	var param = {};
    	var that = this;
    	param.skinCfg ={};
    	if(FriendCard_Common.getSkinType() != 4){
    		param.skinCfg.mainBG = this.mainBgList._index;
    	}
    	if(FriendCard_Common.getSkinType() == 2 && MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ){
    		param.skinCfg.DBBG = this.DBBgList._index || 0;
    	}

        //遍历保存的设置和服务器传来的data是否有修改
        for(var x in param.skinCfg){
        	if(!cc.isUndefined(this.data.info.skinCfg[x]) && (param.skinCfg[x] != this.data.info.skinCfg[x])){
        		param.isSet = true;
        	}
        }
        param.skinCfg.MJBG = 0;
    	param.skinCfg.ZPBG = 0;
    	param.skinCfg.PKBG = 0;

        //规则的设置
        for(var i = 1; i<=this._indexs.length;i++){
			//this.ruleBGList["rule"+this._ruleSort[i]]=[];
			var _rule = this.data.info["rule" + this._ruleSort[i]];
			var rule = {};
			for (var pty in _rule) rule[pty] = _rule[pty];
            
			if(rule.tableBoardCfg != this.ruleBGList["rule"+this._ruleSort[i]]._index)
			{
				rule.tableBoardCfg = this.ruleBGList["rule"+this._ruleSort[i]]._index;
				param.isSet = true;
				param["rule"+this._ruleSort[i]] = rule;
			}
		}

        return param;
    },
    reqSet: function() {
		var that = this;
		var sendInfo = {};
		//sendInfo = this.getRuleSkinCfg();
		sendInfo = this.getSendInfo();
		sendInfo.clubId = this.clubId;
		if(!sendInfo.isSet){
			//没有做任何修改
			that.removeFromParent();
			return;
		}
		delete sendInfo.isSet;

		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.clubUpdate",sendInfo,
			function(rtn) {
				MjClient.unblock();
				if (rtn.code == 0 || rtn.result == 0) {
                    MjClient.showToast("当前设置已同步所有成员");
                    
                    if(MjClient.FriendCard_main_ui)
					{
						MjClient.FriendCard_main_ui.setNativeSkinCfg(sendInfo);
					}
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);					
					} else {
						MjClient.showToast("修改失败");
					}
				}
				if (cc.sys.isObjectValid(that))
						that.removeFromParent();

			}
		);
	},
	
    onExit: function () {
    	if(FriendCard_Common.getSkinType() == 3 && MjClient.FriendCard_main_ui)
    	{
    		MjClient.FriendCard_main_ui.bottomBtnDelLight()
    	}
        this._super();
    },
});