/**
 * @Author:      Lms
 * @DateTime:     2018-06-20 
 * @Description: 邀请红包活动   没有绑定手机号码的~~~~
 */

var shareLayerNT_picture = cc.Layer.extend({

    ctor: function (filePath, isShare,callback) {
        this._super();

        this.SHARE_TO_WX = 1;
        this.SHARE_TO_PYQ = 2;

        var UI = ccs.load("ShareLayer.json");
        this.addChild(UI.node);
        var self = this;
        this._filePath = filePath;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        //_block.addTouchEventListener(function (sender, type) {
        //    if (type == 2) {
        //        self.removeFromParent();
        //    }
        //}, this);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.8, 0.8], [0.5, 0.5], [0, -0.04]);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self.removeFromParent();
            }
        }, this);

        if (!this._filePath)
			this._filePath = jsb.fileUtils.getWritablePath() + "wxcapture_screen.jpg";

		var _share = function() {
			MjClient.gamenet.request("pkplayer.handler.lotteryShare", {
					key: "YAOQING"
				},
				function(rtn) {
					if (rtn.code == 0) {
						cc.log(" ===== lotteryShare YAOQING ===   " + JSON.stringify(rtn));
						if (rtn.data > 0) {
							//分享得红包
							MjClient.Scene.addChild(new shareYaoQingLayer(rtn.data));
							if (MjClient.YaoQingHB_ui) {
								MjClient.YaoQingHB_ui.reqMainMsg();
								
							}
						}

					} else {
						if (rtn.message) {
							MjClient.showToast(rtn.message);
						} else {
							MjClient.showToast("获取数据失败,请重新打开");
						}

					}

				}


			);
		};

		var _btnWenXin = _back.getChildByName("Btn_share1");
		_btnWenXin.addTouchEventListener(function(sender, type) {
					if (type == 2) {
						if (callback) {
							callback(this, this.SHARE_TO_WX);
                } else {
                    if (cc.sys.OS_WINDOWS == cc.sys.os) {
                        MjClient.wxShareImageToPYQ = true;
                        postEvent("WX_SHARE_SUCCESS", {
                            errCode: 0
                        });
                    }
                    //分享到微信
                    
                    if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb())
                    {
                        h5.weixinHelper.wxShareImageToWX(self._filePath);
                    }
                    else
                    {
                        MjClient.native.wxShareImageToWX(self._filePath);
                    }
                    
                    
                }
            }
        }, this);


        var _btnFriends = _back.getChildByName("Btn_share2");
        _btnFriends.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(callback) {
                    callback(this, this.SHARE_TO_PYQ);
                } else {
                    if (cc.sys.OS_WINDOWS == cc.sys.os) {
                        MjClient.wxShareImageToPYQ = true;
                        postEvent("WX_SHARE_SUCCESS", {
                            errCode: 0
                        });
                    }
                    //分享朋友
                    if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb())
                    {
                        h5.weixinHelper.wxShareImageToPYQ(self._filePath);
                    }
                    else
                    {
                        MjClient.native.wxShareImageToPYQ(self._filePath);
                    }

                }
            }
        }, this);

        UIEventBind(null, _btnFriends, "WX_SHARE_SUCCESS", function(data) {
            cc.log(" ===== isShare",isShare);
            if (parseInt(data.errCode) == 0){
            	_share();
            }
            if (!isShare) {
                MjClient.wxShareImageToPYQ = false;
            }
            
        });

    },
    setPicPath:function(filePath){
    	this._filePath = filePath;
    },

});

var YaoQingHaoBaoNT_share = function(data, sp) {

	MjClient.block();
	var fileName = "wxcapture_screen.jpg";

	var ui = ccs.load("YaoQingHongBao_share.json");
	var node = ui.node;
	MjClient.Scene.addChild(node);
	node.setZOrder(-10);

	var bg = node.getChildByName("back");
	// setWgtLayout(bg, [0.61, 0.78], [0.32, 0.48], [0, 0]);

	var _img_ma = bg.getChildByName("Image_ma");
	_img_ma.setVisible(false);

	var sprite_bg = sp;
	var pos = _img_ma.getPosition();
	pos.y +=30;
	sprite_bg.setPosition(pos);
	sprite_bg.setScale(1.2);
	bg.addChild(sprite_bg);

	var head = bg.getChildByName("head");
	// head.setVisible(false);
	var imageUrl_1 = MjClient.data.pinfo.headimgurl;
	var pos_1 = head.getPosition();
	cc.loader.loadImg(imageUrl_1,   {
		isCrossOrigin :  true
	},  function(err, img) {
		if (err) {
			cc.log(err);
		} else if (img && sys.isObjectValid(bg)) {
			var sprite_bg = new cc.Sprite("active_yaoQingHongBao/bg_head.png");
			sprite_bg.setPosition(pos_1);
			sprite_bg.setTexture(img);
			bg.addChild(sprite_bg);
			var head_bg = new cc.Sprite("active_yaoQingHongBao/bg_head.png");
			head_bg.setPosition(pos_1);
			bg.addChild(head_bg);

		}
	});

	var text_name = bg.getChildByName("text_name");
	text_name.ignoreContentAdaptWithSize(true);
	text_name.setString(getNewName(unescape(MjClient.data.pinfo.nickname)));

	var layer = new shareLayerNT_picture();
	MjClient.Scene.addChild(layer);
	//保存成图片
	MjClient.saveNodeToImage(bg, fileName, function(pnode, savepath) {
		if (cc.sys.isObjectValid(node)) {
			node.removeFromParent();
		}
		// 分享图片到微信
		// MjClient.shareImageToMultiPlatform(savepath);
		layer.setPicPath(savepath);
		

		MjClient.unblock();
	});

	
};

var YaoQingHaoBaoNT_layer = cc.Layer.extend({
	onExit:function()
    {
        this._super();
        if (this._closeCallback) {
            this._closeCallback();
        }
    },
	ctor: function() {
		this._super();
		var UI = ccs.load("YaoQingHongBao_enter.json");
		this.addChild(UI.node);

		this._data = null;
		this._closeCallback = null;
		MjClient.YaoQingHB_ui = this;

		var _block = UI.node.getChildByName("block");
		setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

		var _back = UI.node.getChildByName("back");
		setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

		var _close = _back.getChildByName("close");
		_close.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				this.removeFromParent();
			}
		}, this);

		// var bg_2 = _back.getChildByName("bg_2");
		// bg_2.runAction(cc.blink(2,5).repeatForever());
		

		//邀请
		this._btn_yaoqing = _back.getChildByName("btn_yaoqing");
		// 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("active_yaoQingHongBao/btn_yaoqing.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        this._btn_yaoqing.addChild(clipper);
        var sprite = new cc.Sprite("active_yaoQingHongBao/enter_2.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作		

		//点击我的红包
		var _btn_mybao = _back.getChildByName("btn_mybao");
		_btn_mybao.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				MjClient.Scene.addChild(new YaoQingHaoBaoNT_main());
			}
		}, this);
		var clipper2 = cc.ClippingNode.create();
		var sten2 = cc.Sprite.create("active_yaoQingHongBao/btn_yaoqing.png");
        var stenSize2 = sten2.getContentSize();
        clipper2.setContentSize(stenSize2);
        clipper2.setStencil(sten2);
        clipper2.setAlphaThreshold(0.5);
        sten2.setPosition(stenSize2.width / 2, stenSize2.height / 2);
        _btn_mybao.addChild(clipper2);
        var sprite2 = new cc.Sprite("active_yaoQingHongBao/enter_2.png");
        clipper2.addChild(sprite2, 1);
        var repeatAction2 = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten2.width / 2, sten2.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten2.width + sten2.width / 2, sten2.height / 2)),
            cc.delayTime(0.8)));
        sprite2.runAction(repeatAction2); //进行向右移动的重复动作	
		var Text_1= _back.getChildByName("Text_1");
		Text_1.ignoreContentAdaptWithSize(true);
		Text_1.setString("1.每邀请一名新玩家下载并完成对局即可领取拼手气红包");
		
		var Text_2= _back.getChildByName("Text_2");
		Text_2.ignoreContentAdaptWithSize(true);
		Text_2.setString("2.新玩家下载游戏并完成8局后可在邮件中领取红包,注意查收~");

		if (isJinZhongAPPType()) {
			Text_1.setString("1.每邀请一名新玩家下载并完成亲友圈对战即可领取拼手气红包");
			Text_2.setString("2.新玩家下载游戏并完成亲友圈对战8场后可在邮件中领取红包");
		}else if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ){
            Text_1.setString("1.每邀请一名新玩家下载并完成对局即可领取拼手气红包");
            Text_2.setString("2.新玩家下载游戏并完成亲友圈对战10场后可在邮件中领取红包");
		}
		this.Text_2 = Text_2;

		for (var i = 1; i < 6; i++) {
			this["Button_" + i] = _back.getChildByName("Button_" + i);
			this["Text_number_" + i] = this["Button_" + i].getChildByName("Text_number");
			this["Text_number_" + i].ignoreContentAdaptWithSize(true);
			this["Text_number_" + i].setString("");
			this["Text_people_" + i] = this["Button_" + i].getChildByName("Text_people");
			this["Text_people_" + i].ignoreContentAdaptWithSize(true);
			this["Text_people_" + i].setString("人");

			if (this["Button_" + i] ) {
				for (var j = 1; j <= 3; j++) {
					this["Button_" + i].getChildByName("img_" + j).setVisible(false);
				}				
			}
		}
		
		//详细信息 就是活动规则
		this._btn_xiangqing = _back.getChildByName("btn_xiangqing");

		this._hongdian = this._btn_yaoqing.getChildByName("img_hongdian");
		this._tip_share = this._btn_yaoqing.getChildByName("share_tip");
		if (this._tip_share) {
			this._tip_share.setScale(1.5);
			this._tip_share.runAction(cc.repeatForever(cc.sequence(
                cc.fadeIn(1),
                cc.repeat(cc.sequence(cc.moveBy(0.3, 0, 5), cc.moveBy(0.6, 0, -10), cc.moveBy(0.3, 0, 5)), 5),
                cc.fadeOut(1),
                cc.delayTime(0.5))));
			// this._tip_share.runAction(cc.sequence(cc.moveBy(0.75, 0, 20), cc.moveBy(0.75, 0, -20)).repeatForever());
		}
		
		this._txt_time = _back.getChildByName("Text_time");
		this._txt_time.ignoreContentAdaptWithSize(true);
		this._txt_time.setString("");
		this.reqMainMsg();
	},

	fresh_table: function() {
		var self = this;
		var des_str = "";
		if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
			des_str = this._data.round + "局娱乐场";
		}else{
			des_str = this._data.round + "场";
		}
		this.Text_2.setString("2.新玩家下载游戏并完成" + des_str + "后可在邮件中领取红包,注意查收~");
		if (isJinZhongAPPType() || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP) {
			this.Text_2.setString("2.新玩家下载游戏并完成亲友圈对战" + des_str + "后可在邮件中领取红包");
		}
		this._btn_yaoqing.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				var imageUrl = self._data.qrImageUrl;
				var sprite_bg;
				cc.loader.loadImg(imageUrl,   {
					isCrossOrigin :  true
				},  function(err, img) {
					if (err) {
						cc.log(err);
					} else if (img && sys.isObjectValid(self)) {
						sprite_bg = new cc.Sprite("active_yaoQingHongBao/erweima_2.png");
						sprite_bg.setTexture(img);
						cc.log(" ========= eeee sprite_bg", sprite_bg, cc.sys.isObjectValid(sprite_bg));
						YaoQingHaoBaoNT_share(self._data, sprite_bg);
					}
				});


			}
		}, this);

		this._btn_xiangqing.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				MjClient.Scene.addChild(new YaoQingHaoBaoNT_rule(this._data));
			}
		}, this);

		this._txt_time.setString(this._data.date);

		var show_hongbao = function(index){

		};

		var _awardList = this._data.awardList;
		for (var i = 1; i < 6; i++) {
			if (this["Button_" + i]) {
				this["Button_" + i].setTag(i - 1);
				this["Text_number_" + i].setString(_awardList[i-1].award);
				var _txt = this._data.monthFinishCount > _awardList[i-1].condition ? _awardList[i-1].condition:this._data.monthFinishCount;
				this["Text_people_" + i].setString(_txt+ "/" + _awardList[i-1].condition + "人");
				this["Button_" + i].getChildByName("img_" + 1).setVisible(false);
				this["Button_" + i].getChildByName("img_" + 2).setVisible(false);
				this["Button_" + i].getChildByName("img_" + 3).setVisible(false);
				if (_awardList[i-1].recved) {
					this["Button_" + i].getChildByName("img_" + 3).setVisible(true);
					this["Text_number_" + i].setTextColor(cc.color(197,109,61));
					this["Text_people_" + i].setTextColor(cc.color(250,228,140));
				}else if (!_awardList[i-1].canRecv) {
					this["Button_" + i].getChildByName("img_" + 1).setVisible(true);
					this["Text_number_" + i].setTextColor(cc.color(121,121,121));
					this["Text_people_" + i].setTextColor(cc.color(167,54,31));
				}else{
					this["Text_number_" + i].setTextColor(cc.color(191,89,46));
					this["Text_people_" + i].setTextColor(cc.color(255,255,164));
					this["Button_" + i].getChildByName("img_" + 2).setVisible(true);
					var rot = 7;
					this["Button_" + i].getChildByName("img_" + 2).runAction(cc.sequence(cc.rotateBy(0.1, -rot), cc.rotateBy(0.2, rot*2),cc.rotateBy(0.1, -rot)).repeatForever());
				}
				this["Button_" + i].addTouchEventListener(function(sender, type) {
					var tag = sender.getTag();
					if (type == 2) {
						if (_awardList[tag].recved) {
							MjClient.showToast("您已经领取");
						} else if (!_awardList[tag].canRecv) {
							MjClient.showToast("您邀请的新玩家还不够");
						} else {
							cc.log(" ===== tag",tag);
							this.reqPacketAward(this._data.id ,tag);
						}
					}
				}, this);
			}
		}
		//  this._tip_share
		if (this._hongdian) {
			this._hongdian.visible = !this._data.share;
		}
	},

	reqMainMsg: function() {
		var self = this;
		MjClient.gamenet.request("pkplayer.handler.invitePacketInfo", {},
			function(rtn) {
				if (rtn.code == 0) {
					cc.log(" ===== invitePacketInfo 222 ===   " + JSON.stringify(rtn));
					self._data = rtn.data;
					self.fresh_table();

				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}

				}

			}


		);
	},

	reqPacketAward: function(id,idx) {
		var self = this;
		MjClient.gamenet.request("pkplayer.handler.invitePacketAward", {id:id,index:idx},
			function(rtn) {
				if (rtn.code == 0) {
					cc.log(" ===== invitePacketAward  ===   " + JSON.stringify(rtn));
					MjClient.showToast("领取成功");
					self.reqMainMsg();
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}

				}

			}


		);
	},

	setCloseCallback:function(callback)
    {
        
        this._closeCallback = callback;

    },

});






var YaoQingHaoBaoNT_main = cc.Layer.extend({
	ctor: function(data) {
		this._super();
		var UI = ccs.load("YaoQingHongBao_main.json");
		this.addChild(UI.node);
		this._data = data;
		this._getMoney = -1;
		this._schedule = false;
		var self = this;
		var _block = UI.node.getChildByName("block");
		setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

		this.back_left = UI.node.getChildByName("back_left");
		setWgtLayout(this.back_left, [0.61, 0.78], [0.5, 0.48], [0, 0]);

		this.back_right = this.back_left.getChildByName("back_right");
		// this.back_right.ClipAble = false;
		// setWgtLayout(this.back_right, [0.35, 0.88], [0.05, 0.05], [0, 0]);

		this.back_title = UI.node.getChildByName("back_title");
		this.back_title.setVisible(false);
		// setWgtLayout(this.back_title, [0.26, 0.096], [0.27, 0.88], [0, 0]);

		this.back_bottom = UI.node.getChildByName("back_bottom");
		this.back_title.setVisible(false);
		// setWgtLayout(this.back_bottom, [1, 0.07], [0.5, 0.0], [0, 0], true);

		// var _txtDesc = this.back_bottom.getChildByName("Text_desc");
		// _txtDesc.ignoreContentAdaptWithSize(true);
		// _txtDesc.setString("手气红包最高可得188元哦！每天可随时提现，提现后24小时到账公众号，请注意查收");

		var _close = this.back_left.getChildByName("close");
		_close.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				this.removeFromParent();
			}
		}, this);

		this._img_ma = this.back_left.getChildByName("Image_ma");
		this._img_ma.setVisible(false);

		this._right_1 = this.back_right.getChildByName("Image_1");
		this._right_1.setVisible(true);
		this._right_2 = this.back_right.getChildByName("Image_2");
		this._right_2.setVisible(false);

		this._panelRecv = UI.node.getChildByName("PanelRecv");
		this._panelRecv.setVisible(false);
		setWgtLayout(this._panelRecv, [1, 1], [0.5, 0.95], [0, 0]);
		this._recvItem = UI.node.getChildByName("RecvItem");
		this._recvItem.setVisible(false);

		this._txt_duizhanNum = this.back_left.getChildByName("txt_duizhanNum");
		this._txt_duizhanNum.ignoreContentAdaptWithSize(true);
		this._txt_duizhanNum.setString("");

		// var Text_20 = this.back_left.getChildByName("Text_20");
		// Text_20.ignoreContentAdaptWithSize(true);
		// Text_20.setString("       游戏玩家          游戏ID       对战场次      对战完成情况    ");

		this._listView = this.back_left.getChildByName("ListView_1");
		this._listCell = this.back_left.getChildByName("cell");
		this._listCell.setVisible(false);

		this.Text_dangqian = this.back_left.getChildByName("Text_dangqian");
		this.Text_dangqian.ignoreContentAdaptWithSize(true);
		this.Text_dangqian.setString("");

		this.Text_yichai = this.back_left.getChildByName("Text_yichai");
		this.Text_yichai.ignoreContentAdaptWithSize(true);
		this.Text_yichai.setString("");

		this.Text_xianjin = this.back_left.getChildByName("Text_xianjin");
		this.Text_xianjin.ignoreContentAdaptWithSize(true);
		this.Text_xianjin.setString("");

		this.Text_num = this._right_1.getChildByName("Text_num");
		this.Text_num.ignoreContentAdaptWithSize(true);
		this.Text_num.setString("");

		this.Text_number = this._right_2.getChildByName("Text_number");
		this.Text_number.ignoreContentAdaptWithSize(true);
		this.Text_number.setString("");

		var txt_duizhan = this.back_left.getChildByName("Text_22");
		if(txt_duizhan){
            txt_duizhan.ignoreContentAdaptWithSize(true);
            if (isJinZhongAPPType()) {
                txt_duizhan.setString("亲友圈对战场数");

            }
		}

		this.btn_wancheng = this.back_left.getChildByName("btn_wancheng");
		var CREATEROOM_COLOR_1 = cc.color(237, 101, 1);
		var CREATEROOM_COLOR_2 = cc.color(47, 79, 79);
		var CREATEROOM_COLOR_3 = cc.color(158, 118, 78);

		this.btn_wancheng.addTouchEventListener(function(sender, type) {
			switch (type) {
				case ccui.CheckBox.EVENT_SELECTED:

				case ccui.CheckBox.EVENT_UNSELECTED:
					var txt = sender.getChildByName("text");
					if (!sender.isSelected()) {
						txt.setTextColor(CREATEROOM_COLOR_1);
						this.choose_sort(0);
					} else {
						txt.setTextColor(CREATEROOM_COLOR_3);
						this.choose_sort(1);
					}

					break;
			}
		}, this);
		this.btn_wancheng.setSelected(false);

		this._btn_tixian = this.back_left.getChildByName("btn_tixian");
		// 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("active_yaoQingHongBao/btn_tixian.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        this._btn_tixian.addChild(clipper);
        var sprite = new cc.Sprite("active_yaoQingHongBao/enter_2.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作

        this.btn_open = this._right_1.getChildByName("btn_open");
        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("active_yaoQingHongBao/btn_open.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        this.btn_open.addChild(clipper);
        var sprite = new cc.Sprite("active_yaoQingHongBao/enter_2.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作

		if (this._data) {
			this.init_main();
		} else {
			this.reqMainMsg();
		}


	},

	init_main: function() {
		var self = this;
		// this.Text_dangqian.setString("￥" + this._data.currentBonus);
		this.Text_xianjin.setString(this._data.redPacketAmount + "元");
		this.Text_yichai.setString(this._data.unpickCount + "个");
		this.Text_num.setString(this._data.canOpenCount + "");
		this._txt_duizhanNum.setString(this._data.finishCount);
		// var moneyNum =  this._getMoney ;
		if (self._getMoney == -1) {
			self.Text_dangqian.setString("￥" + self._data.currentBonus);
			self._getMoney = self._data.currentBonus;
		} else {
			if (!this._schedule) {
				this._schedule = true;
				cc.log(" ==== this._schedule");
				this.schedule(function() {
				if (self._getMoney < self._data.currentBonus) {
					self._getMoney++;
					self.Text_dangqian.setString("￥" + self._getMoney);

				} else {
					self.Text_dangqian.setString("￥" + self._data.currentBonus);
					self._getMoney = self._data.currentBonus;
				}

			}, 0.5);
			}
			
		}
		
		
		var imageUrl = this._data.qrImageUrl;
		var pos = this._img_ma.getPosition();
		cc.loader.loadImg(imageUrl ? imageUrl : "png/default_headpic.png",   {
			isCrossOrigin :  true
		},  function(err, img) {
			if (err) {
				cc.log(err);
			} else if (img && sys.isObjectValid(self.back_left)) {
				var sprite_bg = new cc.Sprite("active_yaoQingHongBao/icon_erweima.jpg");
				sprite_bg.setPosition(pos);
				sprite_bg.setTexture(img);
				self.back_left.addChild(sprite_bg);
			}
		});

		
		this._btn_tixian.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				if (this._data.currentBonus <= 0) {
					MjClient.showToast("提现奖金不足");
					return;
				}
				this.reqTiXian();
			}
		}, this);
		

		
		this.btn_open.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				if (this._data.canOpenCount <= 0) {
					// this._right_1.setVisible(false);
					// this._right_2.setVisible(true);
					var imageUrl = self._data.qrImageUrl;
					var sprite_bg;
					cc.loader.loadImg(imageUrl ? imageUrl : "png/default_headpic.png",   {
						isCrossOrigin :  true
					},  function(err, img) {
						if (err) {
							cc.log(err);
						} else if (img && sys.isObjectValid(self)) {
							sprite_bg = new cc.Sprite("active_yaoQingHongBao/erweima_2.png");
							sprite_bg.setTexture(img);
							cc.log(" ========= eeee sprite_bg", sprite_bg, cc.sys.isObjectValid(sprite_bg));
							YaoQingHaoBaoNT_share(self._data, sprite_bg);
						}
					});
					MjClient.showToast("没有可拆的红包,分享邀请好友吧");
					return;
				}
				
				this.reqChaiHongBao();
				
				this._right_1.setVisible(false);
				this._right_2.setVisible(true);
			}

		}, this);

		

		var btn_get = this._right_2.getChildByName("btn_get");
		btn_get.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				this._right_2.setVisible(false);
				this._right_1.setVisible(true);
				MjClient.showToast("点击提现可到公众号领取");
			}

		}, this);

		this.addItems(this._data.inviteRecord);

		if (this._data.withdrawRecord.length > 0) {
			this._panelRecv.setVisible(true);
			this.initPanelRecv();
		} else {
			this._panelRecv.setVisible(false);
		}

	},

	act_fly: function() {
		var act_sp = new cc.Sprite("active_yaoQingHongBao/btn_open.png");
		this.back_right.addChild(act_sp, 100);
		var pos_1 = this.btn_open.getPosition();
		act_sp.setPosition(pos_1);
		var p = this.Text_dangqian.getPosition();
		p = this.Text_dangqian.getParent().convertToWorldSpace(p);
		p = this.btn_open.getParent().convertToNodeSpace(p);
		var pos_des = p;
		act_sp.runAction(cc.sequence(cc.scaleTo(0.8, 0.5),cc.spawn(cc.scaleTo(0.5, 0.1), cc.moveTo(0.5, pos_des),cc.delayTime(1.5)), cc.callFunc(function() {
			act_sp.removeFromParent();
		})));

	},
	choose_sort: function(number) {
		var listData = [];
		if (number == 0) { // 未完成

			var list = this._data.inviteRecord;
			for (var i = 0; i < list.length; i++) {
				if (list[i].game < this._data.round) {
					listData.push(list[i]);
				}
			}

		} else if (number == 1) { //完成
			listData = this._data.inviteRecord;
		}
		this.addItems(listData);
	},

	createItem: function(oneData) {
		if (!cc.sys.isObjectValid(this._listCell)) return;
		var self = this;
		var copyNode = this._listCell.clone();
		copyNode.visible = true;

		var img_head = copyNode.getChildByName("img_head");
		img_head.visible = false;
		var txt_name = copyNode.getChildByName("txt_name");
		txt_name.ignoreContentAdaptWithSize(true);
		txt_name.setString(getNewName(unescape(oneData.nickname)));


		var txt_id = copyNode.getChildByName("txt_id");
		txt_id.ignoreContentAdaptWithSize(true);
		txt_id.setString(oneData.userId);
		var txt_num = copyNode.getChildByName("txt_num");
		txt_num.ignoreContentAdaptWithSize(true);
		txt_num.setString(oneData.game);

		var txt_ok = copyNode.getChildByName("txt_ok");
		txt_ok.ignoreContentAdaptWithSize(true);
		var str = oneData.game >= this._data.round ? "完成" : "未完成";
		txt_ok.setString(str);

		var imageUrl = oneData.headimgurl;
		var pos = img_head.getPosition();
		cc.loader.loadImg(imageUrl ? imageUrl : "png/default_headpic.png",    {
			isCrossOrigin :  true
		},  function(err, img) {
			if (err) {
				cc.log(err);
			} else if (img && sys.isObjectValid(self.back_left)) {
				var sprite_bg = new cc.Sprite("active_yaoQingHongBao/icon_head.png");
				sprite_bg.setPosition(pos);
				sprite_bg.setTexture(img);
				copyNode.addChild(sprite_bg);
			}
		});

		return copyNode;
	},
	addItems: function(data) {
		var _emailList = data;
		this._listView.removeAllChildren();
		for (var i = 0; i < _emailList.length; i++) {
			this._listView.pushBackCustomItem(this.createItem(_emailList[i]));
		}

	},
	initPanelRecv: function() {
		var self = this;
		this._panelRecv.removeAllChildren();
		for (var i = 0; i < this._data.withdrawRecord.length; i++) {
			var item = this._recvItem.clone();
			item.setVisible(true);
			this._panelRecv.addChild(item);
			item.setPosition(cc.p(item.width * (i), 0));
			var textRecv = item.getChildByName("TextRecv");
			textRecv.ignoreContentAdaptWithSize(true);
			textRecv.setString(getNewName(unescape(this._data.withdrawRecord[i].nickname)) +"在"+ this._data.withdrawRecord[i].time + "前领取" + this._data.withdrawRecord[i].amount + "元红包");

			var delay1 = new cc.DelayTime(0);
			var moveBy1 = new cc.MoveBy(3, cc.p(-item.width,0));
			var callBack1 = new cc.CallFunc(function() {
				if (this.x < 0) {
					this.setPositionX((self._data.withdrawRecord.length -1) * this.width);
				}
			}.bind(item));
			if (this._data.withdrawRecord.length > 0) {
				item.runAction(cc.repeatForever(cc.sequence(delay1, moveBy1, callBack1)));
			}
		}
	},



	reqMainMsg: function() {
		var self = this;
		MjClient.gamenet.request("pkplayer.handler.invitePacketInfo", {},
			function(rtn) {
				if (rtn.code == 0) {
					cc.log(" ===== invitePacketInfo ===   " + JSON.stringify(rtn));
					self._data = rtn.data;
					self.init_main();
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}

				}

			}


		);
	},

	reqTiXian: function() {
		var self = this;
		MjClient.gamenet.request("pkplayer.handler.invitePacketWithdraw", {
				id: self._data.id
			},
			function(rtn) {
				if (rtn.code == 0) {
					cc.log(" ===== invitePacketWithdraw ===   " + JSON.stringify(rtn));
					MjClient.showToast("提现成功");
					self.reqMainMsg();
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}

				}

			}


		);
	},


	reqChaiHongBao: function() {
		var self = this;
		MjClient.gamenet.request("pkplayer.handler.invitePacketUnpick", {
				id: self._data.id
			},
			function(rtn) {
				if (rtn.code == 0) {
					cc.log(" ===== invitePacketUnpick ===   " + JSON.stringify(rtn));
					self.Text_number.setString(rtn.data + "");
					self.act_fly();
					self.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
						self.reqMainMsg();
						
					})));
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}

				}

			}


		);
	},
});



var YaoQingHaoBaoNT_rule = cc.Layer.extend({
	ctor: function(data) {
		this._super();
		var UI = ccs.load("YaoQingHongBao_rule.json");
		this.addChild(UI.node);

		var _block = UI.node.getChildByName("block");
		setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

		var _back = UI.node.getChildByName("back");
		setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

		var _close = _back.getChildByName("close");
		_close.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				this.removeFromParent();
			}
		}, this);

		var _text = _back.getChildByName("ListView_1").getChildByName("Text_1");
		_text.setFontSize(26);
		var des_str = "";
		if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
			des_str = data.round + "局娱乐场";
		}else{
			des_str = data.round + "场";
		}
		var str = "\n活动详情：\n" +
			"一、本次活动邀请人成功邀请一名新玩家下载并对战"+ des_str + "即可有手气红包奖励.\n" +
			"二、每天可随时提现,24小时后到账公众号,注意查收，现金红包请前往公众号“" + MjClient.systemConfig.gongzhonghao + "”领取.\n" +
			"三、额外奖励：累计邀请并获得奖励人数达标后可获得额外现金奖励~\n"+
			"\n"+
			"1、邀请并获得奖励人数达到" + data.awardList[0].condition + "人,额外奖励" + data.awardList[0].award + "元；\n" +
			"2、邀请并获得奖励人数达到" + data.awardList[1].condition + "人,额外奖励" + data.awardList[1].award + "元；\n" +
			"3、邀请并获得奖励人数达到" + data.awardList[2].condition + "人,额外奖励" + data.awardList[2].award + "元；\n" +
			"4、邀请并获得奖励人数达到" + data.awardList[3].condition + "人,额外奖励" + data.awardList[3].award + "元；\n" +
			"5、邀请并获得奖励人数达到" + data.awardList[4].condition + "人,额外奖励" + data.awardList[4].award + "元；\n" +
			"\n四、以防不法分子恶意刷取奖励,我司有权对完成活动的玩家进行审核,审核未通过不给予发放奖励，本次活动的最终解释权归"+
			AppCnName[MjClient.getAppType()] +"所有\n";

		if (isJinZhongAPPType()) {
			str = "" +
			"1、 本次活动邀请人成功邀请新玩家下载并亲友圈对战"+ des_str + "，即可获得手气红包奖励\n" +
			"2、每天可随时提现,24小时后到账公众号,注意查收，现金红包请前往公众号“" + MjClient.systemConfig.gongzhonghao + "”领取,红包请在活动时间内提现，逾期视为放弃。\n" +
			"3、我司有权对完成活动的玩家进行审核，审核未通过的不予发放奖励，本次活动的最终解释权归"+AppCnName[MjClient.getAppType()] +"所有。\n"+
			"4、额外奖励：累计邀请并获得奖励人数达标后可额外获得现金奖励。 \n"+
			"\n奖励详情：\n"+
			"1、邀请并获得奖励人数达到" + data.awardList[0].condition + "人,额外奖励" + data.awardList[0].award + "元；\n" +
			"2、邀请并获得奖励人数达到" + data.awardList[1].condition + "人,额外奖励" + data.awardList[1].award + "元；\n" +
			"3、邀请并获得奖励人数达到" + data.awardList[2].condition + "人,额外奖励" + data.awardList[2].award + "元；\n" +
			"4、邀请并获得奖励人数达到" + data.awardList[3].condition + "人,额外奖励" + data.awardList[3].award + "元；\n" +
			"5、邀请并获得奖励人数达到" + data.awardList[4].condition + "人,额外奖励" + data.awardList[4].award + "元；\n" +
			"\n";
		}else if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP){
            str = "\n活动详情：\n" +
                "一、本次活动邀请人成功邀请一名新玩家下载并加入亲友圈对战"+ des_str + "即可有手气红包奖励.\n" +
                "二、每天可随时提现,24小时后到账公众号,注意查收，现金红包请前往公众号“" + MjClient.systemConfig.gongzhonghao + "”领取.\n" +
                "三、额外奖励：累计邀请并获得奖励人数达标后可获得额外现金奖励~\n"+
                "\n"+
                "1、邀请并获得奖励人数达到" + data.awardList[0].condition + "人,额外奖励" + data.awardList[0].award + "元；\n" +
                "2、邀请并获得奖励人数达到" + data.awardList[1].condition + "人,额外奖励" + data.awardList[1].award + "元；\n" +
                "3、邀请并获得奖励人数达到" + data.awardList[2].condition + "人,额外奖励" + data.awardList[2].award + "元；\n" +
                "4、邀请并获得奖励人数达到" + data.awardList[3].condition + "人,额外奖励" + data.awardList[3].award + "元；\n" +
                "5、邀请并获得奖励人数达到" + data.awardList[4].condition + "人,额外奖励" + data.awardList[4].award + "元；\n" +
                "\n四、以防不法分子恶意刷取奖励,我司有权对完成活动的玩家进行审核,审核未通过不给予发放奖励，本次活动的最终解释权归"+
                AppCnName[MjClient.getAppType()] +"所有\n";
		}
		_text.setString(str);



	},
});


var shareYaoQingLayer = cc.Layer.extend({
    ctor:function (moneyValue) {
        this._super();
        var UI = ccs.load("shareRedPacket.json");
        this.addChild(UI.node);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);



        var _back = _block.getChildByName("back");
        var _moneyText = _back.getChildByName("Text_1");
        if(moneyValue)
        {
            _moneyText.setString(moneyValue.toFixed(2) + "");            
        }
        var Text_hao = _back.getChildByName("Text_hao");
        if (Text_hao) {
            Text_hao.ignoreContentAdaptWithSize(true);
            Text_hao.setString("红包请前往公众号领取(" + MjClient.systemConfig.gongzhonghao + ")");
        }

        //关闭按钮
        _block.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        return true;
    }
});