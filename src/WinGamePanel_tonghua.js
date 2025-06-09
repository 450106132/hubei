

function SetEndOneUserUI_tonghua(node,off)
{
	var sData=MjClient.data.sData;
	var tData=sData.tData;
	var pl= MjClient.getPlayerByIndex(off);
	node.setVisible(false);
	if(!pl)return;
	node.setVisible(true);
	node=node.getChildByName("head");
	var zhuangNode = node.getChildByName("zhuang");
	var tempZhuang = (typeof MjClient.preZhuang != 'undefined') ? MjClient.preZhuang : tData.zhuang;
    zhuangNode.setVisible(tData.uids[tempZhuang] == pl.info.uid);
	zhuangNode.zIndex=10;

    //add by sking
    var name = node.getChildByName("name");
    name.ignoreContentAdaptWithSize(true);

	var tingIcon = node.getChildByName("tingIcon");
    tingIcon.zIndex = 11;
    if (pl.isTing && (pl.mjdesc + "").indexOf("未听牌") < 0 )
    {
        tingIcon.setVisible(true);
    }
    else
    {
        tingIcon.setVisible(false);
    }


	var uibind= {
		
		head: {
			name: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                },
				_text: function () {
				    var _nameStr = unescape(pl.info.nickname ) + "";
				    //this.ignoreContentAdaptWithSize(true);
                    return getNewName (_nameStr);
				}
			},
			id: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
				_text: function () {
					return "ID:" + pl.info.uid.toString();
				}
			},

			winType: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
				_text: function () {
					return pl.baseWin > 0 ? ("X" + pl.baseWin) : "0";
				},
			},
			up: {
				_visible: false
				, _run: function () {
					var arry = [];
					//明杠
					for (var i = 0; i < pl.mjgang0.length; i++) {

						for (var j = 0; j < 4; j++) {
							if (j == 3) {
								arry.push(getNewCard(node, "up", "gang0", pl.mjgang0[i], 0, "isgang4"))
							} else {
								arry.push(getNewCard(node, "up", "gang0", pl.mjgang0[i], 0));
							}

						}
					}

					// 特殊明杠
					for (var i = 0; i < pl.mjTeshuGang0.length; i++) {

						for (var j = 0; j < pl.mjTeshuGang0[i].length; j++) {
							if (j == 3) {
								arry.push(getNewCard(node, "up", "gang0", pl.mjTeshuGang0[i][j], 0, "isgang4"))
							} else {
								arry.push(getNewCard(node, "up", "gang0", pl.mjTeshuGang0[i][j], 0));
							}
						}
					}


					//添加暗杠
					for (var i = 0; i < pl.mjgang1.length; i++) {

						for (var j = 0; j < 4; j++) {

							if (j == 3) {
								var card = getNewCard(node, "up", "gang1", pl.mjgang1[i], 0, "isgang4");
								card.tag = pl.mjgang1[i];
								arry.push(card);

							} else {
								arry.push(getNewCard(node, "down", "gang1", 0, 0));
							}
						}
					}

					for (var i = 0; i < pl.mjTeshuGang1.length; i++) {

						for (var j = 0; j < pl.mjTeshuGang1[i].length; j++) {

							if (j == 3) {
								var card = getNewCard(node, "up", "gang1", pl.mjTeshuGang1[i][j], 0, "isgang4");
								card.tag = pl.mjTeshuGang1[i][j];
								arry.push(card);

							} else {
								arry.push(getNewCard(node, "up", "gang1", pl.mjTeshuGang1[i][j], 0));
							}
						}
					}

					//
					//添加碰
					for (var i = 0; i < pl.mjpeng.length; i++) {
						for (var j = 0; j < 3; j++) {
							arry.push(getNewCard(node, "up", "peng", pl.mjpeng[i], 0));
						}
					}

					//添加吃
					for (var i = 0; i < pl.mjchi.length; i++) {

						arry.push(getNewCard(node, "up", "chi", pl.mjchi[i], 0));
					}
					//添加手牌
					for (var i = 0; i < pl.mjhand.length; i++) {

						arry.push(getNewCard(node, "up", "mjhand", pl.mjhand[i], 0));
					}

					for (var i = 0; i < arry.length; i++) {
						arry[i].visible = true;
						arry[i].enabled = false;
                        arry[i].setScale(arry[i].getScale()*1.1);
					}

					CardLayoutRestoreForEndOne(node, pl);

				},
			},
			down: {
				_visible: false
			},
			stand: {
				_visible: false
			},
			cardType: {
                _run:function()
                {
                    this.zIndex = 100;
                    this.ignoreContentAdaptWithSize(true);
                },
				_text: function () {
					cc.log(" pl.mjGangDesc === 2222  == ",pl.mjGangDesc)
					var str = (pl.mjGangDesc +"").split(',');
					var str2 = str.join(' ')
					return str2 + "";
				},
			},
			cardType_2: {
                _run:function()
                {
                    this.zIndex = 100;
                    this.ignoreContentAdaptWithSize(true);
                },
				_text: function () {
					cc.log(" pl.mjHuDesc === 2222  == ",pl.mjHuDesc)
					var str = (pl.mjHuDesc + "").split(',');
					var str2 = str.join(' ')
					return str2 + "";
				},
			},
			choose_delete:{
				_run:function()
                {	
                	var sData = MjClient.data.sData;
    				var tData = sData.tData;
    				if (tData.firstDel <= 0) {
                    	this.visible = false;
                    }else if (pl.info.uid ==  tData.firstDel ) {
    					this.loadTexture("gameOver/faqi_1.png");
    				}else if (pl.delRoom > 0) {
                    	this.loadTexture("gameOver/tongyi_1.png");
                    }else if (pl.delRoom < 0) {
                    	this.loadTexture("gameOver/jujue_1.png");
                    }else {
                    	this.loadTexture("gameOver/chaoshi_1.png");
                    }
                },
				
			}

		}
		, winNum: {
			_run: function () {
				if (pl.winone <=0) {
					this.setTextColor(cc.color(134,174,213));
				}
				var pre = "";
				if (pl.winone > 0) pre = "+";
				this.setString(pre + pl.winone);
			}
			, hu: {
				_run: function () {
					setGameOverPanelPlayerState(this, pl, true);
				}
			},
			txt_gangfen:{
				_text: function () {

						return pl.mjGangScore > 0 ? "+" + pl.mjGangScore : "" + pl.mjGangScore;
					}
			},
			txt_hufen:{
				_text: function () {
						return pl.mjHuScore > 0 ? "+" + pl.mjHuScore : "" + pl.mjHuScore;
					}
			},
		},
		txt_self: {
			_run: function() {
				var number = MjClient.endoneui.selfOff - off;
				if (number == 0){
					this.setString("自己")
					this.setTextColor(cc.color(81,177,61));
				}	
				else if (number == -1 || number==3){
					this.setString("下家")
					this.setTextColor(cc.color(214,222,210));
				}
					
				else if (number == 1 || number == -3){
					this.setString("上家")
					this.setTextColor(cc.color(214,222,210));
				}	
				else {
					this.setString("对家")
					this.setTextColor(cc.color(214,222,210));
				}

			}
            , fenshu: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
            }
		}
	}
	BindUiAndLogic(node.parent,uibind);
	addWxHeadToEndUI(uibind.head._node,off);
	//uibind.winNum._node.y=uibind.head._node.y;
}

var EndOneView_tonghua = cc.Layer.extend({
	jsBind:{
		block: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0], true]
        },
		back:{
            _layout:[[1,1],[0.5,0.5],[0,0]]
		,wintitle:
		{
			_visible:function(){
				  var pl=getUIPlayer(0);
				  if(pl)
                  {
                      //playEffect("win");
                      return pl.winone >=1;
                  }
				  return false;
			}
		},losetitle:
		{
			_visible:function(){
				  var pl=getUIPlayer(0);
				  if(pl)
                  {
                      //playEffect("lose");
                      return pl.winone <0;
                  }
				  return false;
			}
		},pingju:
		{
			_visible:function(){

				  var pl=getUIPlayer(0);
				  
				  if(pl)
                  {
                      //playEffect("lose");
                      return pl.winone==0;
                  }
				  return false;
			},_run:function()
			{	
				this.visible= false;
				var sData = MjClient.data.sData;
				var tData = sData.tData;
                if (MjClient.isDismiss)
                {
                	this.visible= true;
                    this.loadTexture("gameOver/jiesan.png");
                }
				else if(MjClient.CheckPlayerCount(function(p){ if(p.winone==0){return true;} return false;}) == tData.maxPlayer)
				{
					if(isRealHuangZhuang()) this.loadTexture("gameOver/huangzhuan_35.png");
				}
			}
		}
        ,
        txt_jiesan:{
        	_run:function(){
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
			_text: function () {
				var pl=MjClient.getPlayerByIndex(MjClient.endoneui.offs[0]); //MjClient.getPlayerByIndex(i)
				if (MjClient.data.sData.tData.firstDel > 0)
				{
					return unescape(pl.info.nickname ) + "" + pl.mjdesc;
				}
				return "";
			}
		},
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
                for(var i = 0; i < MjClient.MaxPlayerNum;i++)
                {
                    var pl = getUIPlayer(i)
                    if(pl && pl.mjflower)
                    {
                        pl.mjflower = [];
                    }
                }
				postEvent("clearCardUI");
				MjClient.endoneui.removeFromParent(true);
                MjClient.endoneui = null;
				var sData=MjClient.data.sData;
				var tData=sData.tData;
                if (MjClient.rePlayVideo >= 0 && MjClient.replayui) {
                    MjClient.replayui.replayEnd();
                }
                else {
                    MjClient.MJPass2NetFortonghua();
                }

				reInitarrCardVisible();
				},
				_visible :function()
				{
					var tData = MjClient.data.sData.tData;
					return !tData.matchId;
			}
		},
		head0:{
			head:{
				zhuang:{_visible:false}
			},
		    winNum:{
			},
		   _run:function(){ SetEndOneUserUI_tonghua(this, MjClient.endoneui.offs[0]); },
		   
		}
		,head1:{ 
		   head:{
			   zhuang:{_visible:false}
		   },
	       winNum:{
			   // _layout:[[0.08,0.08],[1,0.5],[-2.5,0.75]]
		   },
		  _run:function(){ SetEndOneUserUI_tonghua(this, MjClient.endoneui.offs[1]); }
		}
		
		,head2:{ 
		   head:{
			   zhuang:{_visible:false}
		   },
	       winNum:{
			   // _layout:[[0.08,0.08],[1,0.5],[-2.5,-0.75]]
		   },
		   _run:function(){ SetEndOneUserUI_tonghua(this, MjClient.endoneui.offs[2]); }
		}
		,head3:{
			 head:
			 {
				zhuang:{_visible:false}
			 },
			 winNum:{
				 // _layout:[[0.08,0.08],[1,0.5],[-2.5,-2.25]]
			 },
			_run:function(){ SetEndOneUserUI_tonghua(this, MjClient.endoneui.offs[3]); }
			},
            count_down:{
                _visible :function()
                {
                    var tData = MjClient.data.sData.tData;
                    return tData.matchId;
                },
                _run:function()
				{
                    schedulLoadTexture(this);
				}
			}
		}
	},
    ctor:function () {
        this._super();

        MjClient.endoneui=this;
        var sData = MjClient.data.sData;
        var tData = MjClient.data.sData.tData;

        this.offs = [];
        this.selfOff = -1;
        for (var i = 0; i < MjClient.MaxPlayerNum; i ++)
        {
        	var pl= MjClient.getPlayerByIndex(i);
        	if (pl.mjHuScore > 0 || tData.firstDel == pl.info.uid)
        		this.offs.unshift(i);
        	else
        		this.offs.push(i);
        	if (SelfUid() == pl.info.uid)
        		this.selfOff = i;
        }
        cc.log("offs=" + this.offs);

        var endoneui = ccs.load(res.EndOne_tonghua_json);
		BindUiAndLogic(endoneui.node,this.jsBind);
        this.addChild(endoneui.node);

        var _back = endoneui.node.getChildByName("back");

        var _laizi = endoneui.node.getChildByName("back").getChildByName("laizi");
        var HuncardMsg = MjClient.data.sData.tData.hunCard;
        var showMsg = MjClient.majiang.getShanGunCard(HuncardMsg);
        setCardSprite(_laizi, parseInt(showMsg), 4);

		var text1 = GameCnName[MjClient.gameType];
        switch (tData.areaSelectMode.payWay)
        {
            case 0:
                text1 += ",房主付";
                break;
            case 1:
                text1 += ",AA付";
                break;
            case 2:
                text1 += ",大赢家付";
                break;
        }
        text1 += ",房间号:" + tData.tableid;
        text1 += "\r\n";

        var text2 = tData.areaSelectMode.quetuigang ? "瘸腿蛋" : "" ;
        text2 += tData.areaSelectMode.zangang ? ( text2!="" ? ",攒蛋" : "攒蛋" ) : "" ;
        text2 += tData.areaSelectMode.sanmingsian ? ( text2!="" ? ",三明四暗" : "三明四暗" ) : "" ;
        text2 += tData.areaSelectMode.jieguanggang ? ( text2!="" ? ",借光蛋" : "借光蛋" ) : "" ;
        text2 += tData.areaSelectMode.qionghu ? ( text2!="" ? ",穷胡翻番" : "穷胡翻番" ) : "" ;
        text2 += tData.areaSelectMode.bimenhu ? ( text2!="" ? ",闭门胡翻番" : "闭门胡翻番" ) : "" ;
        text2 += tData.areaSelectMode.duanmenhu ? ( text2!="" ? ",断门胡" : "断门胡" ) : "" ;
        text2 += tData.areaSelectMode.piaohu ? ( text2!="" ? ",飘胡" : "飘胡" ) : "" ;
        text2 += tData.areaSelectMode.qidui ? ( text2!="" ? ",七对" : "七对" ) : "" ;
        text2 += tData.areaSelectMode.wubuzhun ? ( text2!="" ? ",五不准" : "五不准") : "" ;
        if (text2 != "")
        	text2 += "\r\n";

		var text3 = MjClient.roundEndTime;
        var _infoText = _back.getChildByName("infoText");
        _infoText.setString(text1 + text2 + text3);
        _infoText.getVirtualRenderer().setLineSpacing(4);
        var _difenText = _back.getChildByName("Text_difen");
        if (_difenText) {
        	_difenText.setString(" X "+ tData.areaSelectMode.tonghua_difen)
        }
       
        changeMJBg(this, getCurrentMJBgType());

 		return true;
    }
});


