/**create by Lms
 * @DateTime:     2018-09-19 
 * @Description: 分享有礼 优化 
 */

MjClient.shareType = null;
var shareTodayLayer = cc.Layer.extend({
	onExit: function() {
		this._super();
	},
	ctor: function() {
		this._super();
        var isUseUIv3 = MjClient.isUseUIv3 && MjClient.isUseUIv3();
		if (isUseUIv3) {
			var UI = ccs.load("AdvShare_3.0.json");
		} else {
			var UI = ccs.load("AdvShare.json");
		}
		this.addChild(UI.node);
		var self = this;
		this._closeCallback = null;

		var _block = UI.node.getChildByName("block");
		setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

		var _back = UI.node.getChildByName("back");
		setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);
		this._back = _back;

		var Text_1 = _back.getChildByName("Text_1");
		Text_1.ignoreContentAdaptWithSize(true);
		if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
			Text_1.setString("想要什么选择什么，分享成功就送你，上午下午各一次");
		} else {
			Text_1.setString("想要什么选择什么，分享成功就送你，每天首次，好礼不停");
		}


		var btnClickFunc = function(sender, type) {
			var tag = sender.getTag();
			if (type == 2) {
				//元宝
				if (tag == 1) {
					MjClient.shareType = 1;
				} else if (tag == 2) { // 红包
					MjClient.shareType = 2;
				} else if (tag == 3) { //礼券
					MjClient.shareType = 4;
				} else if (tag == 4) { // 金币
					MjClient.shareType = 5;
				}
				this.act_func(tag);
				// MjClient.shareType 为什么 没有 3  因为 服务器 的类型 3  已经被用于 其他作用 所以 只能用 1245~~~

				cc.log(" ====== tag ", tag, MjClient.shareType);

			}
		}.bind(this);

		for (var i = 1; i < 5; i++) {
			var _node = _back.getChildByName("btn_" + i);
			if (_node) {
				_node.setTag(i);
				_node.setTouchEnabled(true);
				_node.addTouchEventListener(btnClickFunc);
				var _guang = _node.getChildByName("bg_1");
				_guang.setVisible(false);
				_guang.runAction(cc.repeatForever(cc.sequence(cc.fadeIn(1),cc.fadeOut(1))));
				//_guang.setOpacity(0);
				var _icon = _node.getChildByName("img_2");
				_icon.x += 5;
			}
		}
		var btn_close = _back.getChildByName("close");
		btn_close.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Share_Close", {uid:SelfUid()});
				if (this._closeCallback) {
					this._closeCallback();
				}
				MjClient.shareType = null;
				this.removeFromParent();
			}
		}, this);

		var btn_share = _back.getChildByName("btn_share");
		btn_share.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Share_Shareimmeditaly", {uid:SelfUid()});
				if (!MjClient.shareType) {
					MjClient.showToast("请选择奖品");
					return;
				}
				if (MjClient.shareType == 5) {
					MjClient.native.umengEvent4CountWithProperty("zhujiemian_fenxiang_gold", {uid: SelfUid()});
				}
				
				if (MjClient.shareType == 5 && typeof(goldField_start) != "undefined") {
					this.removeFromParent();
					goldField_start(true);
					return;
				}

				if (cc.sys.OS_WINDOWS == cc.sys.os) {
					MjClient.wxShareImageToPYQ = true;
					postEvent("WX_SHARE_SUCCESS", {
						errCode: 0
					});
				}

                var fileContent = MjClient.getShareImageFileToPYQ();
				MjClient.native.wxShareImageToPYQ(fileContent.file, fileContent.content);

				this.removeFromParent();
			}
		}, this);
		// 闪光效果
        var clipper = cc.ClippingNode.create();
		if (isUseUIv3) {
			var sten = cc.Sprite.create("shareToday_3.0/btn_share.png");
		} else {
			var sten = cc.Sprite.create("shareToday/btn_share.png");
		}
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        btn_share.addChild(clipper);
        var sprite = new cc.Sprite("shareToday/saoguang.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作 
	},

	act_func: function(number) {
		for (var i = 1; i < 5; i++) {
			var _node = this._back.getChildByName("btn_" + i);
			if (_node) {
				var _guang = _node.getChildByName("bg_1");
				var _icon = _node.getChildByName("img_2");
				var _img = _node.getChildByName("img_1");

				if (number == i) {
					_node.setTouchEnabled(false);

                    var isUseUIv3 = MjClient.isUseUIv3 && MjClient.isUseUIv3();
                    if (isUseUIv3){
                        var light1 = new cc.ParticleSystem("shareToday_3.0/xuanzhuang.plist");
                        light1.setPosition(_icon.width/2, _icon.height/2+5);
                        light1.setScale(0.5);
                        _icon.addChild(light1);

                        var light3 = new cc.ParticleSystem("shareToday_3.0/xuanzhuang.plist");
                        light3.setPosition(_icon.width/2, _icon.height/2+5);
                        light3.setScale(0.5);
                        _icon.addChild(light3);

                        var light2 = new cc.ParticleSystem("shareToday_3.0/xinghuolizi.plist");
                        light2.setPosition(_icon.width/2, _icon.height/2);
                        light2.setScale(2);
                        _icon.addChild(light2);
                    }else {
                        for (var j = 0; j < 20; j++) {
                            var _sp = new cc.Sprite("shareToday/icon_dian.png");
                            var pos_x = Math.floor(Math.random() * (50 - 250 + 1) + 250);
                            var pos_y = Math.floor(Math.random() * (200 - 340 + 1) + 340);
                            _img.addChild(_sp);
                            _sp.setPosition(cc.p(pos_x, pos_y));
                            // _sp.setScale(30);
                            _sp.runAction(cc.sequence(cc.moveBy(2, cc.p(0, -20)), cc.moveBy(2, cc.p(0, 20))).repeatForever());
                        }
                        // _icon.runAction(cc.sequence(cc.moveBy(0.5, cc.p(0, 20)), cc.moveBy(0.5, cc.p(0, -20))).repeatForever());
                        // _guang.runAction(cc.sequence(cc.fadeIn(0.5), cc.fadeOut(0.5)).repeatForever());
                    }
                    _guang.setVisible(true);
				} else {
					_node.setTouchEnabled(true);
                    _guang.setVisible(false);
					// _guang.stopAllActions();
					// _icon.stopAllActions();
					// _icon.setPositionY(267);
					// _guang.setOpacity(0);
					_img.removeAllChildren();
                    _icon.removeAllChildren();
				}


			}
		}
	},


	setCloseCallback: function(callback) {
		this._closeCallback = callback;
	}
});

var shareTodayCallFnuc = cc.Layer.extend({
	ctor: function(type, number, text) {
		this._super();
		var UI = ccs.load("shareToday.json");
		this.addChild(UI.node);
		var self = this;
		MjClient.shareType = null;
		var _block = UI.node.getChildByName("block");
		setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
		var _back = UI.node.getChildByName("back");
		setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);
		var _moneyText = _back.getChildByName("Text_1");

		_moneyText.ignoreContentAdaptWithSize(true);
		_moneyText.setString(text);
		//关闭按钮
		// _block.addTouchEventListener(function (sender, type) {
		//     if (type == ccui.Widget.TOUCH_ENDED) {
		//         self.removeFromParent();
		//     }
		// }, this);

		var _close = _back.getChildByName("btn_yes");
		_close.addTouchEventListener(function(sender, type) {
			if (type == ccui.Widget.TOUCH_ENDED) {
				self.removeFromParent();
			}
		}, this);

		var _icon = _back.getChildByName("icon_prize");
		var _txt_num = _back.getChildByName("Text_num");
		_txt_num.ignoreContentAdaptWithSize(true);

		var advBtn = _back.getChildByName("Button_1");
		if (advBtn) {
			advBtn.visible = false;
		}
		if (type == 1) { //元宝
			_icon.loadTexture("shareToday/icon_yuanbao.png");
			_txt_num.setString("元宝X" + number);
		} else if (type == 2) { //红包
			_icon.loadTexture("shareToday/icon_hongbao.png");
			_txt_num.setString("红包X" + number);
		} else if (type == 4) { //金币
			_icon.loadTexture("shareToday/icon_jinbi.png");
			_txt_num.setString("金币X" + number);
		}else if(cc.isObject(type) && type.url) {
			_txt_num.setString(type.title +"X"+number);
			cc.loader.loadImg(type.url, { isCrossOrigin: true }, function(err, texture) {
				if (!err && texture && cc.sys.isObjectValid(_icon) ) {
					var _sprite = new cc.Sprite(texture);
					_sprite.setPosition(_icon.getPosition());
					_icon.setVisible(false);
					_icon.getParent().addChild(_sprite);
				}
			})
		} else if (type == 3) { //礼券
			_icon.loadTexture("shareToday/icon_liquan.png");
			_txt_num.setString("礼券X" + number);
			
			//广告按钮
			if (advBtn) {
				if (cc.sys.os != cc.sys.OS_IOS && MjClient.systemConfig.fenXiangFanBei == "true") {
					advBtn.setVisible(true);
				} else {
					advBtn.setVisible(false);
				}
				advBtn.addTouchEventListener(function(sender, type) {
					if (type == ccui.Widget.TOUCH_ENDED) {
						MjClient.native.mobgiAds.showVideoAd(MjClient.native.mobgiAdsType.SHIPIN_FENXIANG);
					}
				}, this);
			}

			UIEventBind(null, this, MjClient.native.mobgiAdsCallbackEvent.VIDEO_ADS_COMPLETED, function(data) {
				if (data.type == MjClient.native.mobgiAdsType.SHIPIN_FENXIANG || data.indexOf("type:" + MjClient.native.mobgiAdsType.SHIPIN_FENXIANG) >= 0) {
					MjClient.block();
					MjClient.gamenet.request("pkplayer.handler.userAdClick", {
						type: 3
					}, function(rtn) {
						MjClient.unblock();
						if (rtn.code == -1) {
							MjClient.showToast(rtn.message);
						} else if (rtn.code == 0) {
							self.removeFromParent();
							MjClient.showToast("奖励已翻倍");
						} else {
							MjClient.showToast(rtn.message);
						}
					});
				}
			});
			UIEventBind(null, this, MjClient.native.mobgiAdsCallbackEvent.VIDEO_ADS_ERROR, function(data) {
				if(!data.isObject()){
	                data = JSON.parse(data);
	            }
				if (data.type == MjClient.native.mobgiAdsType.SHIPIN_FENXIANG) {
					MjClient.showToast("广告加载错误");
				}
			});
			UIEventBind(null, this, MjClient.native.mobgiAdsCallbackEvent.VIDEO_ADS_SKIPPED, function(data) {
				if(!data.isObject()){
	                data = JSON.parse(data);
	            }
				if (data.type == MjClient.native.mobgiAdsType.SHIPIN_FENXIANG) {
					MjClient.showToast("广告没有播放完，不会发放奖励");
				}
			});
			UIEventBind(null, this, MjClient.native.mobgiAdsCallbackEvent.VIDEO_ADS_NOT_READY, function(data) {
				if(!data.isObject()){
	                data = JSON.parse(data);
	            }
				if (data.type == MjClient.native.mobgiAdsType.SHIPIN_FENXIANG) {
					MjClient.showToast("广告还没加载完");
				}
			});
		}

		return true;
	}
});