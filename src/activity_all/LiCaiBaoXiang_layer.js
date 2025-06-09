/*
 理财宝箱活动  ActiveLCBX_Investment
 ActiveLCBX_main
*/


var LiCaiBaoXiang_Layer = cc.Layer.extend({
	onExit: function() {
		this._super();
	},
	ctor: function(data) {
		this._super();
		var UI = ccs.load("ActiveLCBX_main.json");
		this.addChild(UI.node);
		var self = this;
		this._data = data;
		this._closeCallback = null;
		this._dataBuyBoxInfo = null;
		this._dataMineInfo = null;
		this._dataSortBoxArr = null;
		this._select_box = 1;
		this._select_box_type = null;
		this._expTime = null;
		this._schedule = false;
		MjClient.LiCaiBaoXiang_ui = this;

		var block = UI.node.getChildByName("block");
		setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

		var back = UI.node.getChildByName("back");
		setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
		this._back = back;	

		var closeBtn = back.getChildByName("close");
		closeBtn.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				if (this._closeCallback) {
					this._closeCallback();
				}
				this.removeFromParent();
				MjClient.LiCaiBaoXiang_ui = null;
			}
		}, this);
		var node_btn = back.getChildByName("node_btn");
		var touchFunc = function(sender, type) {
			if (type == 2) {
				var tag = sender.getTag();
				if (tag == 1) {
					this.req_myBoxMsg();
				}
				if (tag == 3) {
					this.reqRecord();
				}
				if (this._expTime && (tag == 0 || tag == 4 || this._dataMineInfo.list.length <= 0)) {
					return;
				}
				for (var i = 0; i < 5; i++) {
					if (i == tag) {
						this["page_" + i].visible = true;
						this["btn_" + i].setOpacity(255);
						this["btn_" + i].setTouchEnabled(false);
					} else {
						this["page_" + i].visible = false;
						this["btn_" + i].setOpacity(0);
						this["btn_" + i].setTouchEnabled(true);
					}
				}


			}
		}.bind(this);
		var i = 0;
		for (i = 0; i < 5; i++) {
			this["btn_" + i] = node_btn.getChildByName("btn_" + i);
			this["btn_" + i].setOpacity(0);
			this["page_" + i] = back.getChildByName("page_" + i);
			this["page_" + i].visible = false;
			this["btn_" + i].setTag(i);
			this["btn_" + i].addTouchEventListener(touchFunc);
		}

		var _btn = this.page_0.getChildByName("btn");
		_btn.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				if (!this._dataBuyBoxInfo) return;
				if (this._dataBuyBoxInfo.serverTime < this._dataBuyBoxInfo.startTime) {
					//MjClient.showToast("双11开启购买,敬请期待")
				}
				var layer = new LiCaiBaoXiang_Investment(this._dataBuyBoxInfo);
				MjClient.Scene.addChild(layer);

			}
		}, this);
		this.btn_Investment = _btn;

		this._cell = this.page_3.getChildByName("cell_prize");
		this._cell.visible = false;
		this._listRule = this.page_3.getChildByName("list_Prize");
		this._nullTip_text = this.page_3.getChildByName("nullTip_text");
		this._nullTip_image = this.page_3.getChildByName("nullTip_image");
		if (this._nullTip_text) {
			this._nullTip_text.visible = false;
			this._nullTip_image.visible = false;
		}

		this._listBox = this.page_1.getChildByName("list_box"); //  btn_cell
		this._listBox.setScrollBarEnabled(false);
		this._cellBox = this.page_1.getChildByName("cell_box");
		this._cellBox.visible = false;
		this._nullTip_text2 = this.page_1.getChildByName("nullTip_text");
		this._nullTip_image2 = this.page_1.getChildByName("nullTip_image");
		if (this._nullTip_text2) {
			this._nullTip_text2.visible = false;
			this._nullTip_image2.visible = false;
		}
		var node_img = this.page_1.getChildByName("node_img");
		node_img.visible = false;

        var Img_bg = this.page_1.getChildByName("Img_bg");
        Img_bg.setVisible(false);
        var ListView_box = this.page_1.getChildByName("ListView_box");
        ListView_box.setVisible(false);
        var cell_box_2 = this.page_1.getChildByName("cell_box_2");
        cell_box_2.setVisible(false);
        var Button_akey = this.page_1.getChildByName("Button_akey");
        Button_akey.setVisible(false);

		this._textRule = this.page_2.getChildByName("listRule").getChildByName("Text_1");
		// this._descBox = this.page_4.getChildByName("Sprite_1");
		for (var i = 0; i < 3; i++) {
			this["descBox_" + i] = this.page_4.getChildByName("Text_" + i);
			for (var j = 0; j < 8; j++) {
				this["descBox_" + i]["txt_" + j] = this["descBox_" + i].getChildByName("txt_" + j);
				this["descBox_" + i]["txt_" + j].setString("");
			}
		}
		this.page0_img = this.page_0.getChildByName("img_bg");
		this.daijinquan = this.page_0.getChildByName("bg_daijinquan");
		this._btn2 = this.daijinquan.getChildByName("btn_1");
		this._btn2.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				// if (this._dataBuyBoxInfo.voucher) {
				// 	MjClient.showToast("不可重复购买");
				// 	return;
				// }
				if(MjClient.systemConfig.recharge.length > 1){
                    MjClient.Scene.addChild(new payWayLayer(function(platform) {
                        MjClient.recharge(100, parseInt(platform), null, self._daijinquan);

                    }, null, true));
				}else {
                    MjClient.recharge(100, parseInt(MjClient.systemConfig.recharge[0].platform), null, self._daijinquan);
				}

				// this.reqDaiJinQuan();
			}
		}, this);

		this.node_time = this.page_0.getChildByName("Text_time");
		for (var i = 0; i < 7; i++) {
			this["time_" + i] = this.node_time.getChildByName("Image_" + i).getChildByName("Text_1");
			this["time_" + i].setString(0);
		}
		var _BtnKeFu = back.getChildByName("btn_kefu")
		_BtnKeFu.addTouchEventListener(function(sender, Type) {
			switch (Type) {
				case ccui.Widget.TOUCH_ENDED:

					if (!isCurrentNativeVersionBiggerThan("14.0.0")) {
						MjClient.gamenet.request("pkplayer.handler.openBrowser", {
							type: 9
						}, function(rtn) {
							if (rtn.code == 0) {
								MjClient.Scene.addChild(new NormalWebviewLayer(rtn.data));
							} else {
								if (rtn.message) {
									MjClient.showToast(rtn.message);
								} else {
									MjClient.showToast("获取数据失败");
								}
							}
						});
					} else {
						MjClient.native.showQiYuChatDialog();
					}
					break;
				default:
					break;
			}
		}, this);

		this.buy_out = this.page_0.getChildByName("bg_buy").getChildByName("Text_0");
		this.buy_out.setString("0");
		this.reqBuyBoxInfo();
		this.page_0.visible = true;
		this.btn_0.setOpacity(255);
		this.page_buyShow(0);
		UIEventBind(null, this, "rechargeResult", function() {
			var that = MjClient.LiCaiBaoXiang_ui;
			that.reqBuyBoxInfo();
			this.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function() {
				if (cc.sys.isObjectValid(MjClient.Investment_UI)) {
					//MjClient.Investment_UI.text_buy.setString("购买数量 :  " + that._dataBuyBoxInfo.already + "");
					MjClient.Investment_UI.removeFromParent();
                    delete MjClient.Investment_UI;
                }

				if(cc.sys.isObjectValid(MjClient.payWayLayerui)){
                    MjClient.payWayLayerui.removeFromParent();
                    delete MjClient.payWayLayerui;
				}

				for (var i = 0; i < 5; i++) {
					if (i == 1) {
						that["page_" + i].visible = true;
						that["btn_" + i].setOpacity(255);
						that["btn_" + i].setTouchEnabled(false);

					} else {
						that["page_" + i].visible = false;
						that["btn_" + i].setOpacity(0);
						that["btn_" + i].setTouchEnabled(true);
					}
				}
				that.req_myBoxMsg();

                if (that._dataBuyBoxInfo.voucher) {
                	var daijinquanEnable = false;
					for(var i = 0; i < MjClient.BaoXiaong_daijinquan.length; i++){
                        var Image = that.daijinquan.getChildByName("Image_"+i);
						if(that._dataBuyBoxInfo.voucher[MjClient.BaoXiaong_daijinquan[i]] > 0){
                            Image.loadTexture("active_licaibaoxiang/bg_quan3.png");
						}else {
                            daijinquanEnable = true;
						}
					}
					if(daijinquanEnable == false){
                        that._btn2.loadTextureNormal("active_licaibaoxiang/btn_yiqianggou.png");
                        that._btn2.setTouchEnabled(false);
					}
                }

			})));
		});

	},

	reqLiQuan: function() {
		var self = this;
		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.treasIntegralRecv", {},
			function(rtn) {
				cc.log(" ===== pkplayer.handler.treasIntegralRecv === " + JSON.stringify(rtn));
				if (rtn.code == 0) {
					self.req_myBoxMsg();
					MjClient.showToast("领取成功");
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}
				}

				MjClient.unblock();
			}
		);
	},

	reqDaiJinQuan: function() {
		var self = this;
		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.treasVoucher", {},
			function(rtn) {
				cc.log(" ===== pkplayer.handler.treasVoucher === " + JSON.stringify(rtn));
				if (rtn.code == 0) {
					self.reqBuyBoxInfo();
					MjClient.showToast("领取成功");
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}
				}

				MjClient.unblock();
			}
		);
	},

	reqBuyBoxInfo: function() {
		var self = this;
		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.treasInfo", {},
			function(rtn) {
				cc.log(" ===== treasInfo === " + JSON.stringify(rtn));
				if (rtn.code == 0) {
					self._dataBuyBoxInfo = rtn.data;
					self.refresh_buyBoxInfo();
					self.refresh_box();
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}
				}

				MjClient.unblock();
			}
		);
	},
	refresh_buyBoxInfo: function() {
		var self = this;

		var txt1 = this.page0_img.getChildByName("img_1").getChildByName("Text_3");
		txt1.ignoreContentAdaptWithSize(true);
		txt1.setString(this._dataBuyBoxInfo.welfare1);

		var txt2 = this.page0_img.getChildByName("img_2").getChildByName("Text_3");
		txt2.ignoreContentAdaptWithSize(true);
		txt2.setString(this._dataBuyBoxInfo.welfare2);

		var txt3 = this.page0_img.getChildByName("img_3").getChildByName("Text_3");
		txt3.ignoreContentAdaptWithSize(true);
		txt3.setString(this._dataBuyBoxInfo.welfare3);

		this._textRule.setFontSize(25);
		this._textRule.setString(this._dataBuyBoxInfo.describe);

		this.buy_out.setString(this._dataBuyBoxInfo.alreadyTotal);
		cc.log("============this._dataBuyBoxInfo.alreadyTotal ",this._dataBuyBoxInfo.alreadyTotal)



		// if ( this._dataBuyBoxInfo.serverTime < this._dataBuyBoxInfo.startTime ) {
		// 	this.btn_Investment.setTouchEnabled(false);
		// }else{
		// 	this.btn_Investment.setTouchEnabled(true);
		// }

        var btn_tjm = this.page_0.getChildByName("btn_tuijian");
        if (!this._dataBuyBoxInfo.referral) {
            btn_tjm.loadTextureNormal("active_licaibaoxiang/btn_tuijianma2.png");
        }else{
            btn_tjm.loadTextureNormal("active_licaibaoxiang/btn_tuijianma.png");
        }
        //btn_tjm.setVisible(_emailList.length > 0);
        btn_tjm.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.tuiJianMa_layer(1, self._dataBuyBoxInfo.referralAward, self._dataBuyBoxInfo.referral);
            }
        }, this);

        if (this._dataBuyBoxInfo.voucher) {
            var daijinquanEnable = false;
            for(var i = 0; i < MjClient.BaoXiaong_daijinquan.length; i++){
                var Image = this.daijinquan.getChildByName("Image_"+i);
                if(this._dataBuyBoxInfo.voucher[MjClient.BaoXiaong_daijinquan[i]] > 0){
                    Image.loadTexture("active_licaibaoxiang/bg_quan3.png");
                }else {
                    daijinquanEnable = true;
                }
            }
            if(daijinquanEnable == false){
                this._btn2.loadTextureNormal("active_licaibaoxiang/btn_yiqianggou.png");
                this._btn2.setTouchEnabled(false);
            }
        }
	},
	req_myBoxMsg: function(type) {
		//99  是否已经超时购买
		var self = this;
		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.treasMine", {},
			function(rtn) {
				cc.log(" ===== pkplayer.handler.treasMine === " + JSON.stringify(rtn));
				if (rtn.code == 0) {
					self._dataMineInfo = rtn.data;

					self.sortData();
					for(var i = 0; i < self._dataSortBoxArr.length; i++){
						if(self._select_box_type && self._select_box_type == self._dataSortBoxArr[i]){
                            self._select_box = i+1;
						}
					}
					self.addItemsBox(self._dataMineInfo.list);
					if (type == 1 && self._select_box) {
						self.refresh_mineBox(self._dataMineInfo.list[self._dataSortBoxArr[self._select_box - 1]]);
					}
					if (type == 99) {
						self.refresh_mainView();
					}
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}
				}

				MjClient.unblock();
			}
		);
	},
	//购买时间已过 不能购买 界面展示  this._dataBuyBoxInfo self._dataMineInfo
	refresh_mainView: function() {
		for (var i = 0; i < 5; i++) {
			this["page_" + i].visible = false;
			this["btn_" + i].setOpacity(0);
			this["btn_" + i].setTouchEnabled(false);
		}
		this["page_" + 2].visible = true;
		this._textRule.setString("亲爱的代理，本次宝箱购买时间已结束，如需购买宝箱，还请您留意下次开启时间");
		if (this._dataSortBoxArr.length > 0) {
			this["page_" + 2].visible = false;
			this["page_" + 1].visible = true;
			this["btn_" + 1].setOpacity(255);
			this["btn_" + 1].setTouchEnabled(true);
			this["btn_" + 2].setTouchEnabled(true);
			this["btn_" + 3].setTouchEnabled(true);

		}
	},

	refresh_box: function() {
		var data = this._dataBuyBoxInfo;
		var strList = ["validity", "total", "totalAmount", "immediatelyAmount", "monthlyAmount", "monthlyAmountTotal", "expireAmount", "unit"];

		for (var i = 0; i < 3; i++) {
			this["descBox_" + i].setString(data.list[i].title);
			for (var j = 0; j < 8; j++) {
				this["descBox_" + i]["txt_" + j] = this["descBox_" + i].getChildByName("txt_" + j);
				if (j == 0) {
					this["descBox_" + i]["txt_" + j].setString(data.list[i][strList[j]] + "个月");
				} else if (j == 1) {

					this["descBox_" + i]["txt_" + j].setString(Math.round(data.list[i][strList[j]] * 100) + "%");
				} else {
					this["descBox_" + i]["txt_" + j].setString(data.list[i][strList[j]] + "");
				}
				cc.log(" =======strList[j]  ", strList[j], data.list[i][strList[j]])

			}

		}


		if (data.serverTime < data.startTime) {
			this.page_buyShow(0);
			this.page_0.getChildByName("Text_time").setVisible(true);
		} else {
			this.page_buyShow(1);
			this.page_0.getChildByName("Text_time").setVisible(false);
		}

		
		if (!this._schedule) {
			this.schedule(function() {
				this._schedule = true;
				var _time0 = data.startTime - data.serverTime;
				var _time1 = data.endTime - data.serverTime;
				var time = 0;
				

				if (_time0 > 0) {
					time = _time0;
					this.page_buyShow(0);
				} else {
					if (_time1 <= 0) {
						_time1 = 0;
					}
					time = _time1;
					this.page_buyShow(1);
				}
				var  hours = parseInt((time) / (1000 * 60 * 60));       
				var  minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));       
				var  seconds = parseInt((time % (1000 * 60)) / 1000);
				if (_time0 > 0) {
					this.page_0.getChildByName("Text_time").setVisible(true);
				}else{
					this.page_0.getChildByName("Text_time").setVisible(hours < 12);
				}
				

				this.time_0.setString(parseInt((hours % 1000) / 100));
				this.time_1.setString(parseInt((hours % 100) / 10));
				this.time_2.setString(parseInt((hours % 10)));

				this.time_3.setString(parseInt((minutes) / 10));
				this.time_4.setString(parseInt((minutes) % 10));

				this.time_5.setString(parseInt((seconds) / 10));
				this.time_6.setString(parseInt((seconds) % 10));

				data.serverTime += 1000;
			}, 1);
		}



		if (data.endTime < data.serverTime) {
			this._expTime = true;
			this.req_myBoxMsg(99);
		}
		// if (this._dataBuyBoxInfo.voucher) {
		// 	this._btn2.loadTextureNormal("active_licaibaoxiang/btn_lingqu57.png");
		// }

	},

	page_buyShow: function(type) {
		if (type == 0) {
			this.page_0.getChildByName("btn").visible = false;
			this.page_0.getChildByName("bg_buy").visible = false;
			this.page_0.getChildByName("bg_daijinquan").visible = true;
			this.page0_img.setPositionY(210);
			this.page_0.getChildByName("Text_time").setString("宝箱开放购买剩余时间");


		} else {
			this.page_0.getChildByName("btn").visible = true;
			this.page_0.getChildByName("bg_buy").visible = true;
			this.page_0.getChildByName("bg_daijinquan").visible = false;
			this.page0_img.setPositionY(392);
			this.page_0.getChildByName("Text_time").setString("宝箱结束购买剩余时间");
		}
	},

	createItemBox: function(Data, number) {
		if (!cc.sys.isObjectValid(this._cellBox)) return;
		var oneData = Data[0];
		var self = this;
		var copyNode = this._cellBox.clone();
		copyNode.visible = true;
		var btn = copyNode.getChildByName("img_box");
		btn.loadTexture("active_licaibaoxiang/box_" + oneData.type + "_n.png");
		btn.setScale(0.85);
		var Image_red = copyNode.getChildByName("Image_red");
        Image_red.setScale(0.85);
		var Text_red = Image_red.getChildByName("Text_red");
		Text_red.ignoreContentAdaptWithSize(true);
		var redNum = 0;
		for(var i = 0; i < Data.length; i++){
            if(Data[i].immediatelyStatus != 1){
                redNum++;
			}
			if(Data[i].monthlyResidue > 0){
                redNum = redNum+Data[i].monthlyResidue;
			}
		}
        Text_red.setString("X"+redNum);
		var _text_1 = copyNode.getChildByName("Text_1");
		_text_1.ignoreContentAdaptWithSize(true);
        _text_1.setVisible(false);
		_text_1.setString(number + "号");
		var _text_2 = copyNode.getChildByName("Text_2");
		_text_2.ignoreContentAdaptWithSize(true);
		//_text_2.visible = false;
		var bg_1 = copyNode.getChildByName("bg_1");
		//bg_1.visible = false;
		_text_2.setString("￥" + oneData.amount);
        var Text_3 = copyNode.getChildByName("Text_3");
        Text_3.ignoreContentAdaptWithSize(true);
        Text_3.setString(oneData.title);
		copyNode.data = Data;
		copyNode.setTag(number);
		copyNode.setTouchEnabled(true);
		copyNode.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				//刷新下面数据
				var tag = sender.getTag();

				sender.setScale(1);
				this.select_mine(tag, sender.data);

			}
		}, this);


		this["myBox_" + number] = copyNode;
		return copyNode;
	},

	select_mine: function(number, data) {
		cc.log("wxd=======number========"+number);
		for (var i = 1; i <= this._dataSortBoxArr.length; i++) {
			if (this["myBox_" + i]) {
				var _text_1 = this["myBox_" + i].getChildByName("Text_1");
				var _text_2 = this["myBox_" + i].getChildByName("Text_2");
                var _text_3 = this["myBox_" + i].getChildByName("Text_3");
				var bg_1 = this["myBox_" + i].getChildByName("bg_1");
				var btn = this["myBox_" + i].getChildByName("img_box");
                var Image_red = this["myBox_" + i].getChildByName("Image_red");
				if (i == number) {
					this._select_box = number;
					this._select_box_type = data[0].type;
					this.refresh_mineBox(this._dataMineInfo.list[this._dataSortBoxArr[number - 1]]);
					_text_1.visible = false;
					_text_2.setTextColor(cc.color("#641B41"));
                    _text_3.setTextColor(cc.color("#641B41"));
					//bg_1.visible = true;
					btn.setScale(1);
                    Image_red.setScale(1);
                    bg_1.setScaleY(1.5);
				} else {
					_text_1.visible = true;
                    _text_2.setTextColor(cc.color("#FFFFFF"));
                    _text_3.setTextColor(cc.color("#FFFFFF"));
					//bg_1.visible = false;
					btn.setScale(0.85);
                    Image_red.setScale(0.85)
                    bg_1.setScaleY(1);
				}
			}
		}
	},



	refresh_mineBox: function(data) {
		var self = this;
		cc.log("wxd===========refresh_mineBox=========="+JSON.stringify(data));

		if(this._dataSortBoxArr.length > 0){
            var Img_bg = this.page_1.getChildByName("Img_bg");
            Img_bg.setVisible(true);
            var ListView_box = this.page_1.getChildByName("ListView_box");
            ListView_box.setVisible(true);
            var cell_box_2 = this.page_1.getChildByName("cell_box_2");
            cell_box_2.setVisible(true);
            var Button_akey = this.page_1.getChildByName("Button_akey");
            Button_akey.setVisible(true);
		}

        var list = this.page_1.getChildByName("ListView_box");
        list.removeAllItems();
        cc.log("wxd===========refresh_mineBox=========="+list);
        var item = this.page_1.getChildByName("cell_box_2");
        item.setVisible(false);
        for(var i = 0; i < data.length; i++){
			var cell = item.clone();
            cell.setVisible(true);
            list.pushBackCustomItem(cell);

            var Text_num = cell.getChildByName("Text_num");
            Text_num.ignoreContentAdaptWithSize(true);
            Text_num.setString(i+1);

            var Text_lifan = cell.getChildByName("Text_lifan");
            Text_lifan.ignoreContentAdaptWithSize(true);
            Text_lifan.setString("立返元宝："+data[i].immediatelyAmount);

            var Text_yuefan = cell.getChildByName("Text_yuefan");
            Text_yuefan.ignoreContentAdaptWithSize(true);
            Text_yuefan.setString("月返元宝："+data[i].monthlyAmount);

            var Text_lifanGet = cell.getChildByName("Text_lifanGet");
            Text_lifanGet.ignoreContentAdaptWithSize(true);
            var immediatelyStr = "";
            if(data[i].immediatelyStatus == 1){
                immediatelyStr = "立返元宝：已领取"
			}else {
                immediatelyStr = "立返元宝：未领取"
			}
            Text_lifanGet.setString(immediatelyStr);

            var Text_yuefanNum = cell.getChildByName("Text_yuefanNum");
            Text_yuefanNum.ignoreContentAdaptWithSize(true);
            Text_yuefanNum.setString("月返元宝："+data[i].monthlyTotal+"次");

            var Text_num = cell.getChildByName("Image_numDi").getChildByName("Text_num");
            Text_num.ignoreContentAdaptWithSize(true);
            Text_num.setString(data[i].monthlyComplete + "/" + (data[i].monthlyTotal));

            cell.i = i;
            cell.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    MjClient.Scene.addChild(new LiCaiBaoXiang_des(data[sender.i]));
                }
            }, this);

            var Button_lifan = cell.getChildByName("Button_lifan");
            Button_lifan.i = i;
            Button_lifan.addTouchEventListener(function(sender, type) {
            	if (type == 2) {
            		this.reqGetMoney(data[sender.i], 1);
            		// if (!this._dataMineInfo.referral) {
            		// 	this.tuiJianMa_layer(data, 1, this._dataMineInfo.referralAward);
            		// } else {
            		// 	this.reqGetMoney(data, 1);
            		// }

            	}
            }, this);

            cc.log(" ========== (data.immediatelyStatus ", data[i].immediatelyStatus);
            if (data[i].immediatelyStatus == 1) {
                Button_lifan.setTouchEnabled(false);
                Button_lifan.loadTextureNormal("active_licaibaoxiang/btn_linqulifaned.png");
            } else {
                Button_lifan.setTouchEnabled(true);
                Button_lifan.loadTextureNormal("active_licaibaoxiang/btn_linqulifan.png");
            }


            var Button_yuefan = cell.getChildByName("Button_yuefan");
            Button_yuefan.i = i;
            Button_yuefan.addTouchEventListener(function(sender, type) {
            	if (type == 2) {
            		this.reqGetMoney(data[sender.i], 2);
            	}
            }, this);
            cc.log(" ========= data.monthlyResidue", data[i].monthlyResidue);
            if (data[i].monthlyResidue <= 0) {
                Button_yuefan.setTouchEnabled(false);
                Button_yuefan.loadTextureNormal("active_licaibaoxiang/btn_linquyuefaned.png");
            } else {
                Button_yuefan.setTouchEnabled(true);
                Button_yuefan.loadTextureNormal("active_licaibaoxiang/btn_linquyuefan.png");
            }

            var Text_time = cell.getChildByName("Text_time");
            Text_time.ignoreContentAdaptWithSize(true);
			Text_time.setString("购买时间："+MjClient.dateFormat(new Date(parseInt(data[i].createTime)), 'yyyy/MM/dd hh:mm:ss'))
		}
        var redNum = 0;
        for(var i = 0; i < data.length; i++){
            if(data[i].immediatelyStatus != 1){
                redNum++;
            }
            if(data[i].monthlyResidue > 0){
                redNum = redNum+data[i].monthlyResidue;
            }
        }
        var btnAkey = this.page_1.getChildByName("Button_akey");
        if(redNum > 0){
            btnAkey.setTouchEnabled(true);
            btnAkey.loadTextureNormal("active_licaibaoxiang/btn_akeyReward.png");
        }else {
            btnAkey.setTouchEnabled(false);
            btnAkey.loadTextureNormal("active_licaibaoxiang/btn_akeyRewarded.png");
        }
        btnAkey.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self.reqGetMoneyAKey(data[0]);
            }
        }, this);
	},

	reqGetMoney: function(data, type, tuiJianMa) {
		var self = this;
		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.treasInterestRecv", {
				id: data.id,
				type: type,
				referral: tuiJianMa
			},
			function(rtn) {
				cc.log(" ===== pkplayer.handler.treasInterestRecv  === " + JSON.stringify(rtn));
				if (rtn.code == 0) {
					MjClient.showToast("领取成功");
					self.req_myBoxMsg(1);
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}
				}

				MjClient.unblock();
			}
		);

	},
    
    reqGetMoneyAKey:function (data) {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.treasInterestOneKeyRecv", {
                type: data.type
            },
            function(rtn) {
                cc.log(" ===== pkplayer.handler.treasInterestOneKeyRecv  === " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    MjClient.showToast("领取成功");
                    self.req_myBoxMsg();
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }

                MjClient.unblock();
            }
		);
    },

	//lms
	addItemsBox: function(data) {
		var _emailList = data;
		this._listBox.removeAllItems();
		var firstOPen = true;
		// if (this.myBox_1) {
		// 	firstOPen = false;
		// }
		for (var i = 0; i < this._dataSortBoxArr.length; i++) {
			//if (!this["myBox_" + (i + 1)]) {
				this._listBox.pushBackCustomItem(this.createItemBox(_emailList[this._dataSortBoxArr[i]], i + 1));
			//}

		}
		if (this._dataSortBoxArr.length == 0) {
			if (this._nullTip_text2) {
				this._nullTip_text2.visible = true;
				this._nullTip_image2.visible = true;

			} else {
				MjClient.showToast("已显示所有记录");
			}
		} else {
			if (firstOPen) {
				this.select_mine(this._select_box, _emailList[this._dataSortBoxArr[this._select_box-1]]);
                // if(this.myBox_1){
                //     this.refresh_mineBox(this.myBox_1.data);
                // }
			}
			if (this._nullTip_text2) {
				this._nullTip_text2.visible = false;
				this._nullTip_image2.visible = false;

			}

		}

		var _mineData = this._dataMineInfo;
		var _number = Math.floor(_mineData.twelve / 10);
	},

	createItem: function(oneData) {
		if (!cc.sys.isObjectValid(this._cell)) return;
		var copyNode = this._cell.clone();
		copyNode.visible = true;

		var _time = copyNode.getChildByName("Text_time");
		var _tai = copyNode.getChildByName("Text_tai");
		_tai.setString("已到账");
		var _content = copyNode.getChildByName("Text_content");
		var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy/MM/dd hh:mm:ss');
		_content.ignoreContentAdaptWithSize(true);
		_time.ignoreContentAdaptWithSize(true);
		_tai.ignoreContentAdaptWithSize(true);
		_time.setString(_timeStr);
		if (oneData.type == 1) {
			_content.setString("立返元宝" + oneData.amount);
		} else if (oneData.type == 2) {
			_content.setString("月返元宝" + oneData.amount);
		} else if (oneData.type == 3) {
			_content.setString("到期返元宝" + oneData.amount);
		}
		var _size = 25;
		_time.setFontSize(_size);
		_tai.setFontSize(_size);
		_content.setFontSize(_size);
		return copyNode;
	},

	addItems: function(data) {
		var _emailList = data;
		this._listRule.removeAllItems();
		for (var i = 0; i < _emailList.length; i++) {
			this._listRule.pushBackCustomItem(this.createItem(_emailList[i]));
		}
		if (_emailList.length == 0) {
			if (this._nullTip_text) {
				this._nullTip_text.visible = true;
				this._nullTip_image.visible = true;

			} else {
				MjClient.showToast("已显示所有记录");
			}
		} else {
			if (this._nullTip_text) {
				this._nullTip_text.visible = false;
				this._nullTip_image.visible = false;

			}
		}
	},

	reqRecord: function() {
		var self = this;
		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.treasInterestRecord", {},
			function(rtn) {
				cc.log(" ===== pkplayer.handler.treasInterestRecord  === " + JSON.stringify(rtn));
				if (rtn.code == 0) {
					// MjClient.showToast("领奖记录");
					self.addItems(rtn.data);
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}
				}

				MjClient.unblock();
			}
		);

	},

	reqTuiJianMa: function(number, node) {
		var self = this;
		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.treasReferral", {referral:number},
			function(rtn) {
				cc.log(" ===== pkplayer.handler.treasReferral  === " + JSON.stringify(rtn));
				if (rtn.code == 0) {
					//self.req_myBoxMsg(1);
					self.reqBuyBoxInfo();

					node.removeFromParent();
					MjClient.showToast("记录成功");
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}
				}

				MjClient.unblock();
			}
		);

	},

	tuiJianMa_layer: function(type2, number, tuijianma) {
		var UI = ccs.load("ActiveLCBX_tuiJianMa.json");
		this.addChild(UI.node);
		var block = UI.node.getChildByName("block");
		setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

		var back = UI.node.getChildByName("back");
		setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);

		var closeBtn = back.getChildByName("close");
		closeBtn.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				UI.node.removeFromParent();
				// MjClient.showMsg("确定不填写推荐码,同时放弃本次领取吗？",
				// 	function() {
				// 		UI.node.removeFromParent();
				// 	},
				// 	function() {});

			}
		}, this);
		var bg_input = back.getChildByName("Image_2");
		var _input = new cc.EditBox(bg_input.getContentSize(), new cc.Scale9Sprite("active_licaibaoxiang/tjm_input.png"));
		_input.setFontColor(cc.color(0x2B, 0x34, 0x4D));
		_input.setPlaceholderFontColor(cc.color(0x2B, 0x34, 0x4D));
		_input.setFontSize(22);
		_input.setPlaceholderFontSize(22);
		_input.setMaxLength(11);
		_input.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
		_input.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
		_input.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
		_input.setPlaceHolder("请填写推荐码");
		_input.setFontName("fonts/lanting.TTF");
		_input.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
		_input.setPosition(bg_input.getContentSize().width / 2, bg_input.getContentSize().height / 2);
		bg_input.addChild(_input);

		var Text_1 = back.getChildByName("Text_1");
		Text_1.setString("首次填写推荐码,可获得礼券x" + this._dataBuyBoxInfo.referralAward);
		
		var Text_2 = back.getChildByName("Text_2");
		Text_2.setString("");
		if (tuijianma) {
			Text_1.setString("请填写你要修改的推荐码");
			Text_2.setString("原推荐码：  " + tuijianma);
		}

		var btn_yes = back.getChildByName("btn_yes");
		btn_yes.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				var str = _input.getString();
				if (str.length <= 0) {
					MjClient.showToast("推荐码不能为空");
					return;
				}
				this.reqTuiJianMa(_input.getString(),UI.node);
				// this.reqGetMoney(data, type2, _input.getString());
				// UI.node.removeFromParent();
			}
		}, this);

		var btn_yes2 = back.getChildByName("btn_yes2");
		btn_yes2.visible = false;
		btn_yes2.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				cc.log(" ======= skip skipskip");
				this.reqGetMoney(data, type2);
				UI.node.removeFromParent();
			}
		}, this);



	},

    sortData:function () {
		var self =this;
        var keys = Object.keys(self._dataMineInfo.list);
        var newKeys = keys.concat();
        var size = keys.length;
        for(var i = 0;i <size; i++){
            var key = "";
            if(self._dataMineInfo.list[keys[i]].length > 0){
                key = keys[i];
            }
            for (var j = 0 ; j < newKeys.length; j++){
                if(newKeys[j] == key){
                    newKeys.splice(j, 1);
                }
            }
        }
        cc.log("wxd===============keys=====" + JSON.stringify(newKeys));
        for(var i = 0; i < newKeys.length; i++){
            delete self._dataMineInfo.list[newKeys[i]]
        }
        keys = Object.keys(self._dataMineInfo.list);
        cc.log("wxd===============keys=====" + JSON.stringify(keys));
        var rewardKeys = [];
        for(var i = 0; i < keys.length; i++){
            var itemBoxArr = self._dataMineInfo.list[keys[i]];
            for(var j = 0; j < itemBoxArr.length; j++){
                if(itemBoxArr[j].immediatelyStatus != 1 || itemBoxArr[j].monthlyResidue > 0){
                    if(rewardKeys.indexOf(keys[i]) == -1){
                        rewardKeys.push(keys[i]);
                    }
                }
            }
        }
        for (var i = 0; i < keys.length; i++){
            if(rewardKeys.indexOf(keys[i]) == -1){
                rewardKeys.push(keys[i]);
            }
        }
        this._dataSortBoxArr = rewardKeys;
        cc.log("wxd===============rewardKeys=====" + JSON.stringify(rewardKeys));
        for(var i = 0; i < rewardKeys.length; i++){
            var immediatelyArr = [];
            var monthlyArr = [];
            var timeArr = [];
            var itemBoxArr = self._dataMineInfo.list[rewardKeys[i]];
            for(var j = 0; j < itemBoxArr.length; j++){
                if(itemBoxArr[j].immediatelyStatus != 1){
                    immediatelyArr.push(itemBoxArr[j]);
                }else if(itemBoxArr[j].monthlyResidue > 0){
                    monthlyArr.push(itemBoxArr[j]);
                }else {
                    timeArr.push(itemBoxArr[j]);
                }
            }
            for(var l = 0; l < timeArr.length-1; l++){
                for(var m = 0; m < timeArr.length-1-l; m++){
                    if(timeArr[m].createTime > timeArr[m+1].createTime){
                        var temp = timeArr[m+1];        // 元素交换
                        timeArr[m+1] = timeArr[m];
                        timeArr[m] = temp;
                    }
                }
            }
            self._dataMineInfo.list[rewardKeys[i]] = immediatelyArr.concat(monthlyArr, timeArr)
            cc.log("wxd===============self._dataMineInfo.list=====" + JSON.stringify(self._dataMineInfo.list[rewardKeys[i]]));
        }
    },

	setCloseCallback: function(callback) {
		this._closeCallback = callback;

	},


});

var LiCaiBaoXiang_Investment = cc.Layer.extend({

	onExit: function() {
		this._super();
	},
	ctor: function(data) {
		this._super();
		var UI = ccs.load("ActiveLCBX_Investment.json");
		this.addChild(UI.node);
		var self = this;
		MjClient.Investment_UI = this;
		this._data = data;
		this._selectNum = -1;
		this._selectId = null;
		this._closeCallback = null;
		this._daijinquan = 0;
		var block = UI.node.getChildByName("block");
		setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

		var back = UI.node.getChildByName("back");
		setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
		this._back = back;

		var closeBtn = back.getChildByName("close");
		closeBtn.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				if (this._closeCallback) {
					this._closeCallback();
				}
				this.removeFromParent();
			}
		}, this);

		var dataTable = {
			"0": {
				"pic_res": "active_licaibaoxiang/box_14_s.png",
				"desc_0": data.list[0].title.substring(0,2)+"\n" + data.list[0].title.substring(2,4) + "\n" + data.list[0].amount + "元",
				"desc_1": "时间：1个月",
				"desc_2": "1.总收益达",
				"desc_3": "0%",
				"desc_4": "2.购买后立返",
				"desc_5": "0元宝",
				"desc_6": "3.每个月返",
				"desc_7": "0元宝(返一次)",
				"desc_8": "4.到期返",
				"desc_9": "0元宝(返一次)",
			},
			"1": {
				"pic_res": "active_licaibaoxiang/box_15_s.png",
				"desc_0": data.list[1].title.substring(0,2)+"\n" + data.list[1].title.substring(2,4) + "\n" + data.list[1].amount + "元",
				"desc_1": "时间：1个月",
				"desc_2": "1.总收益达",
				"desc_3": "0%",
				"desc_4": "2.购买后立返",
				"desc_5": "0元宝",
				"desc_6": "3.每个月返",
				"desc_7": "0元宝(返一次)",
				"desc_8": "4.到期返",
				"desc_9": "0元宝(返一次)",
			},
			"2": {
				"pic_res": "active_licaibaoxiang/box_16_s.png",
				"desc_0": data.list[2].title.substring(0,2)+"\n" + data.list[2].title.substring(2,4) + "\n" + data.list[2].amount + "元",
				"desc_1": "时间：1个月",
				"desc_2": "1.总收益达",
				"desc_3": "0%",
				"desc_4": "2.购买后立返",
				"desc_5": "0元宝",
				"desc_6": "3.每个月返",
				"desc_7": "0元宝(返一次)",
				"desc_8": "4.到期返",
				"desc_9": "0元宝(返一次)",
			},



		};
		this.dataTable = dataTable;

		var write_content = function(node, number) {
			var text = node.getChildByName("Text_" + number);
			text.ignoreContentAdaptWithSize(true);
			text.setString(dataTable[i]["desc_" + number]);
		};
		var touchFunc = function(sender, type) {
			if (type == 2) {
				var tag = sender.getTag();
				if (data.endTime < data.serverTime) {
					MjClient.showToast("购买宝箱时间已过,不能购买");
					return;
				}


				var id = sender.id;
				this._selectId = id;
				this.select_box(tag);
				// MjClient.showToast(" baoxiang  " + tag + " id " + id);
			}
		}.bind(this);

		for (var i = 0; i < 3; i++) {
			dataTable[i]["desc_1"] = "时间：" + data.list[i].validity + "个月";
			dataTable[i]["desc_3"] = data.list[i].totalAmount + "元宝(" + Math.round(data.list[i].total * 100) + "%)";
			dataTable[i]["desc_5"] = data.list[i].immediatelyAmount + "元宝";
			dataTable[i]["desc_7"] = data.list[i].monthlyAmount + "元宝(共返" + (data.list[i].validity - 1) + "次)";
			dataTable[i]["desc_9"] = data.list[i].expireAmount + "元宝";

			this["node_" + i] = back.getChildByName("node_" + i);
			this["btn_" + i] = this["node_" + i].getChildByName("btn_1");
			this["btn_" + i].setTag(i);
			this["btn_" + i].id = data.list[i].id;
			this["btn_" + i].addTouchEventListener(touchFunc);
			this["btn_" + i].setOpacity(0);
			this["nodeImg1_" + i] = this["node_" + i].getChildByName("img_1");
			this["nodeImg2_" + i] = this["node_" + i].getChildByName("img_2");
			this["nodeImg2_" + i].visible = false;
			var pic_box = this["nodeImg1_" + i].getChildByName("Image_2");
			pic_box.loadTexture("active_licaibaoxiang/box_" + data.list[i].type + "_s.png");
			var pic_box2 = this["nodeImg2_" + i].getChildByName("Image_2");
			pic_box2.loadTexture("active_licaibaoxiang/box_" + data.list[i].type + "_s.png");
			var pic_line = this["nodeImg1_" + i].getChildByName("Image_5");
			var pic_line2 = this["nodeImg2_" + i].getChildByName("Image_5");

			for (var j = 0; j <= 9; j++) {
				write_content(this["nodeImg1_" + i], j);
				write_content(this["nodeImg2_" + i], j);
			}
		}
		this.text_buy = back.getChildByName("text_buy");
		this.text_buy.ignoreContentAdaptWithSize(true);
		this.text_buy.setString("购买数量 :  " + data.already + "");
		this.text_tip = back.getChildByName("text_tip");
		this.text_tip.setString("  您已优惠0元，需要支付698元  ");

		this.btn_buy = back.getChildByName("btn_buy");
		this.btn_buy.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				if (this._selectNum < 0) {
					MjClient.showToast(" 请选择宝箱 ");
					return;
				}

				cc.log(" =======self._daijinquan ", self._daijinquan);
                if (MjClient.systemConfig.recharge.length > 1) {
                    MjClient.Scene.addChild(new payWayLayer(function (platform) {
                        MjClient.recharge(self._selectId, parseInt(platform), null, self._daijinquan);
                        for (var i = 0; i <= 3; i++) {
                            self["checkBox_" + i].setSelected(false);
                        }
                        self._daijinquan = 0;
                        self.text_tip.setString("  您已优惠0元，需要支付698元  ");
                        // self.btn_buy.loadTextureNormal("active_licaibaoxiang/btn_buy.png");
                    }, null, true));
                }else {
                    MjClient.recharge(self._selectId, parseInt(MjClient.systemConfig.recharge[0].platform), null, self._daijinquan);
                    for (var i = 0; i <= 3; i++) {
                        self["checkBox_" + i].setSelected(false);
                    }
                    self._daijinquan = 0;
                    self.text_tip.setString("  您已优惠0元，需要支付698元  ");
                    // self.btn_buy.loadTextureNormal("active_licaibaoxiang/btn_buy.png");
				}


			}
		}, this);
		


		var touchFunc = function(sender, type) {
			switch (type) {
				case ccui.CheckBox.EVENT_SELECTED:
				case ccui.CheckBox.EVENT_UNSELECTED:
					var tag = sender.tag;
					for (var i = 0; i <= 3; i++) {
						if (tag != i) {
							this["checkBox_" + i].setSelected(false);
						}
					}
					if (tag == 0) {
						this.select_daijinquan(tag, 158);
					} else if (tag == 1) {
						this.select_daijinquan(tag, 166);
					} else if (tag == 2) {
						this.select_daijinquan(tag, 168);
					} else if (tag == 3) {
						this.select_daijinquan(tag, 198);
					}

					break;
			}
		}.bind(this);
		var _number = -1;
		for (var i = 0; i <= 3; i++) {
			this["checkBox_" + i] = back.getChildByName("Image_1").getChildByName("checkBox_" + i);
			this["checkBox_" + i].tag = i;
			this["checkBox_" + i].addEventListener(touchFunc);


			if(this._data.voucher && this._data.voucher[MjClient.BaoXiaong_daijinquan[i]]){
				if(i==3 &&this._data.already >= 9){
                    _number =i;
				}else if(i==2 &&this._data.already >= 5){
                    _number =i;
				}else if(i==1 &&this._data.already >= 3){
                    _number =i;
                }else if(i==0 &&this._data.already >= 0){
                    _number =i;
				}
			}
		}
        cc.log("wxd========voucher===="+_number+"       "+MjClient.BaoXiaong_daijinquan[_number]);
		if(_number!=-1){
            this["checkBox_" + _number].setSelected(true);
            this.select_daijinquan(_number, MjClient.BaoXiaong_daijinquan[_number]);
		}
	},
	select_box: function(select_number) {
		this._selectNum = select_number;
		for (var i = 0; i < 3; i++) {
			if (select_number == i) {
				this["nodeImg2_" + i].visible = true;
			} else {
				this["nodeImg2_" + i].visible = false;
			}
		}
	},
	select_daijinquan: function(i, number) {
		// test
		// this._data.voucher ={
		// 	168:2,266:0,286:1,
		// };
		// this._data.already = 9999;
		if (!this._data.voucher || !this._data.voucher[number] || (i == 1 && this._data.already < 3)
			|| (i == 2 && this._data.already < 5) || (i == 3 && this._data.already < 9)) {
			this._daijinquan = 0;
			this.text_tip.setString("  您已优惠0元，需要支付698元  ");
			this["checkBox_" + i].setSelected(false);
			if (!this._data.voucher) {
				MjClient.showToast("您没有购买代金券");
			}else if (!this._data.voucher[number]) {
				MjClient.showToast("未获得此代金券");
			}else{
				MjClient.showToast("此代金券不满足使用条件");
			}
			// this.btn_buy.loadTextureNormal("active_licaibaoxiang/btn_buy.png");
			// MjClient.showToast("此代金券不满足使用条件或已被使用");
			return;
		}
		if (this["checkBox_" + i].isSelected()) {
			this._daijinquan = number;
			this.text_tip.setString("  您已优惠 "+number +" 元，需要支付 " + (698 - number)+ " 元  ");
			// this.btn_buy.loadTextureNormal("active_licaibaoxiang/btn_buy" + number + ".png");
		} else {
			this._daijinquan = 0;
			this.text_tip.setString("  您已优惠0元，需要支付698元  ");
			// this.btn_buy.loadTextureNormal("active_licaibaoxiang/btn_buy.png");
		}

	},


});


var LiCaiBaoXiang_des = cc.Layer.extend({
    _back:null,
    ctor: function (data) {
        this._super();
        var UI = ccs.load("ActiveLCBX_des.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.6,0.6],[0.5,0.5],[0,0]);

        //关闭按钮
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var Text_des = this._back.getChildByName("ScrollView_1").getChildByName("Text_des");
        var str = data.title+"元宝赠送说明：\n" +
            "立返："+MjClient.dateFormat(new Date(data.createTime), "yyyy年MM月dd日hh:mm分后可领取")+"  "+Math.round(data.money * data.immediately)+"元宝\n";
        for (var i = 1; i != data.validity; i++) {
            var monthDate = new Date(data.createTime + i * 30 * 24*60*60*1000);
            var monthMoney = Math.round(data.money * data.monthly);
            str += '第' + i + '次月返：' + MjClient.dateFormat(monthDate, "yyyy年MM月dd日hh:mm分后可领取")+"  " + monthMoney+ "元宝\n";
        }
        str +=  "到期返："+MjClient.dateFormat(new Date(data.createTime + data.validity * 30 * 24*60*60*1000), "yyyy年MM月dd日hh:mm分后可领取")+"  "+Math.round(data.money * data.expire)+"元宝\n" +
		"届时请注意查收\n" +
		"有任何疑问请您咨询客服";
        Text_des.setString(str);

        return true;
    },
});


MjClient.BaoXiaong_daijinquan = [158, 166, 168, 198];//宝箱代金券


//钻石宝箱
var ZuanShiBaoXiang = cc.Layer.extend({
	_type:0,
	ctor: function () {
		this._super();
		var UI = ccs.load("ActiveLCBX_mainZS.json");
		this._rootUI = UI.node;
		this.addChild(this._rootUI);
		var self = this;

		this._closeCallback = null;

		var _block = UI.node.getChildByName("block");
		setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

		this._back = UI.node.getChildByName("back");
		setWgtLayout(this._back, [1,1],[0.5,0.5],[0,0]);

		//关闭按钮
		var _close = this._back.getChildByName("close");
		_close.addTouchEventListener(function (sender, type) {
			if (type == ccui.Widget.TOUCH_ENDED) {
				self.removeFromParent();
			}
		}, this);

		for(i = 0; i < 4; i++) {
			var btn = this._back.getChildByName("btn_" + i);
			btn.setVisible(false);
		}

		for(j = 0; j < 4; j++){
			var panel = self._back.getChildByName("panel_"+j);
			panel.setVisible(false);
			if(j == 1){
				var itembaoxiang = panel.getChildByName("item");
				itembaoxiang.setVisible(false);
				var baoxiangItem = panel.getChildByName("item_2");
				baoxiangItem.setVisible(false);
			}else if (j == 2){
				var recordItem = panel.getChildByName("item");
				recordItem.setVisible(false);
			}
		}

		var _BtnKeFu = self._back.getChildByName("Button_kefu")
		_BtnKeFu.addTouchEventListener(function(sender, Type) {
			switch (Type) {
				case ccui.Widget.TOUCH_ENDED:

					if (!isCurrentNativeVersionBiggerThan("14.0.0")) {
						MjClient.gamenet.request("pkplayer.handler.openBrowser", {
							type: 9
						}, function(rtn) {
							if (rtn.code == 0) {
								MjClient.Scene.addChild(new NormalWebviewLayer(rtn.data));
							} else {
								if (rtn.message) {
									MjClient.showToast(rtn.message);
								} else {
									MjClient.showToast("获取数据失败");
								}
							}
						});
					} else {
						MjClient.native.showQiYuChatDialog();
					}
					break;
				default:
					break;
			}
		}, this);

		this.reqTreasInfo();

		return true;
	},

	reqTreasInfo: function() {
		var self = this;
		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.treasInfoZs", {},
			function(rtn) {
				cc.log(" ===== treasInfo === " + JSON.stringify(rtn));
				if (rtn.code == 0) {
					self._treasInfoData = rtn.data;

					if(self._treasInfoData.endTime < self._treasInfoData.serverTime){
						var btn0 = self._back.getChildByName("btn_0");
						btn0.setTouchEnabled(false);
						self._type = 1;
					}

					self.initUI();
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}
				}
				MjClient.unblock();
			}
		);
	},

	reTreasMine:function() {
		var self = this;
		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.treasMineZs", {},
			function(rtn) {
				cc.log(" ===== pkplayer.handler.treasMine === " + JSON.stringify(rtn));
				if (rtn.code == 0) {
					self._dataMineInfo = rtn.data;

					self.sortData();

					self.initMyBaoXiangUI();
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}
				}

				MjClient.unblock();
			}
		);
	},

	reqTreasInterestRecord: function() {
		var self = this;
		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.treasInterestRecordZs", {},
			function(rtn) {
				cc.log(" ===== pkplayer.handler.treasInterestRecord  === " + JSON.stringify(rtn));
				if (rtn.code == 0) {
					self.initRecrdUI(rtn.data);
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}
				}

				MjClient.unblock();
			}
		);

	},

	//主界面
	initUI:function(){
		var self = this;

		if(this._type == 0){
			self.initBuyBaoXiangUI();
		}else if(this._type == 1){
			self.reTreasMine();
		}else if(this._type == 2){
			self.reqTreasInterestRecord();
		}

		for(i = 0; i < 4; i++){
			var btn = this._back.getChildByName("btn_"+i);
			btn.setVisible(true);
			btn.i = i;
			btn.addTouchEventListener(function (sender, type) {
				if (type == ccui.Widget.TOUCH_ENDED) {
					for(j = 0; j < 4; j++){
						var btn = self._back.getChildByName("btn_"+j);
						var panel = self._back.getChildByName("panel_"+j);
						if(btn.i == sender.i){
							self._type = sender.i;
							btn.setEnabled(false);
							panel.setVisible(true);
							if(j == 0){
								self.initBuyBaoXiangUI();
							}else if (j == 1){
								self.reTreasMine();
							}else if (j == 2){
								self.reqTreasInterestRecord();
							}else if (j == 3){

							}
						}else {
							btn.setEnabled(true);
							panel.setVisible(false);
						}
					}
				}
			}, this);

			if(this._type == i){
				btn.setEnabled(false);
			}else {
				btn.setEnabled(true);
			}
		}

		for(j = 0; j < 4; j++){
			var panel = self._back.getChildByName("panel_"+j);
			if(this._type == j){
				panel.setVisible(true);
			}else {
				panel.setVisible(false);
			}
		}
	},

	//购买宝箱界面
	initBuyBaoXiangUI:function(){
		var self = this;
  		var buyBaoXiangPanel = this._back.getChildByName("panel_0");

  		var baoXiangType = 0;
		self.initBuyBox(self._treasInfoData.list[baoXiangType]);

		var textHour = buyBaoXiangPanel.getChildByName("Text_hour");
		textHour.ignoreContentAdaptWithSize(true);
		textHour.setString(((self._treasInfoData.endTime - self._treasInfoData.serverTime)/1000/60/60).toFixed(1));

  		var btnTianGang = buyBaoXiangPanel.getChildByName("btn_tianGang");
		var btnDiSha = buyBaoXiangPanel.getChildByName("btn_diSha");
		btnTianGang.addTouchEventListener(function (sender, type) {
			if (type == ccui.Widget.TOUCH_ENDED) {
				btnTianGang.setEnabled(false);
				btnDiSha.setEnabled(true);
				baoXiangType = 0;
				self.initBuyBox(self._treasInfoData.list[baoXiangType]);
			}
		}, this);
		btnDiSha.addTouchEventListener(function (sender, type) {
			if (type == ccui.Widget.TOUCH_ENDED) {
				btnTianGang.setEnabled(true);
				btnDiSha.setEnabled(false);
				baoXiangType = 1;
				self.initBuyBox(self._treasInfoData.list[baoXiangType]);
			}
		}, this);
	},

	initBuyBox:function(data){
		var self = this;
		var buyBaoXiangPanel = this._back.getChildByName("panel_0");

		var textTime = buyBaoXiangPanel.getChildByName("Text_time");
		textTime.ignoreContentAdaptWithSize(true);
		textTime.setString(data.validity + "个月");

		var textNum = buyBaoXiangPanel.getChildByName("Text_num");
		textNum.ignoreContentAdaptWithSize(true);
		textNum.setString(data.alreadyTotal);

		var imageBaoxiang = buyBaoXiangPanel.getChildByName("Image_baoxiang");
		imageBaoxiang.loadTexture("active/active_licaibaoxiangZS/icon_jingnang_"+data.type+".png");

		var textMoney0 = buyBaoXiangPanel.getChildByName("Text_money0");
		textMoney0.ignoreContentAdaptWithSize(true);
		textMoney0.setString(data.totalAmount);
		var textMoney1 = buyBaoXiangPanel.getChildByName("Text_money1");
		textMoney1.ignoreContentAdaptWithSize(true);
		textMoney1.setString(data.immediatelyAmount);
		var textMoney2 = buyBaoXiangPanel.getChildByName("Text_money2");
		textMoney2.ignoreContentAdaptWithSize(true);
		textMoney2.setString(data.monthlyAmount);
		var textMoney3 = buyBaoXiangPanel.getChildByName("Text_money3");
		textMoney3.ignoreContentAdaptWithSize(true);
		textMoney3.setString(data.expireAmount);

		var textPercent0 = buyBaoXiangPanel.getChildByName("Text_percent0");
		textPercent0.ignoreContentAdaptWithSize(true);
		textPercent0.setString("("+(data.total*100).toFixed(0)+"%)");
		var textPercent1 = buyBaoXiangPanel.getChildByName("Text_percent1");
		textPercent1.ignoreContentAdaptWithSize(true);
		textPercent1.setString("("+(data.immediately*100).toFixed(0)+"%)");
		var textPercent2 = buyBaoXiangPanel.getChildByName("Text_percent2");
		textPercent2.ignoreContentAdaptWithSize(true);
		textPercent2.setString("("+(data.monthly*100).toFixed(0)+"%)");
		var textPercent3 = buyBaoXiangPanel.getChildByName("Text_percent3");
		textPercent3.ignoreContentAdaptWithSize(true);
		textPercent3.setString("("+(data.expire*100).toFixed(0)+"%)");

		var imageYouhui = buyBaoXiangPanel.getChildByName("Image_youhui");
		var textMoney = imageYouhui.getChildByName("Text_money");
		textMoney.ignoreContentAdaptWithSize(true);
		textMoney.setString(data.amount);

		var btnLijigoumai = buyBaoXiangPanel.getChildByName("btn_lijigoumai");
		btnLijigoumai.addTouchEventListener(function (sender, type) {
			if (type == ccui.Widget.TOUCH_ENDED) {
				if (MjClient.systemConfig.recharge.length > 1) {
					MjClient.Scene.addChild(new payWayLayer(function (platform) {
						MjClient.recharge(data.id, parseInt(platform), null, 0);
					}, null, true));
				}else {
					MjClient.recharge(data.id, parseInt(MjClient.systemConfig.recharge[0].platform), null, 0);
				}
			}
		}, this);
	},

	//我的宝箱界面
	initMyBaoXiangUI:function () {
		var self = this;
		var myBaoXiangPanel = this._back.getChildByName("panel_1");

		var selectBaoxiangType = 0;
		self.initMyBaoXiangList(self._dataMineInfo.list[self._dataSortBoxArr[selectBaoxiangType]]);

		var listbaoxiang = myBaoXiangPanel.getChildByName("ListView_5");
		listbaoxiang.removeAllChildren();
		var itembaoxiang = myBaoXiangPanel.getChildByName("item");
		itembaoxiang.setVisible(false);

		cc.log("wxd............self._dataMineInfo.list"+ JSON.stringify(self._dataMineInfo.list));

		for(var i = 0; i < self._dataSortBoxArr.length; i++){
			var item = itembaoxiang.clone();
			item.setVisible(true);

			var buttonbaoxiang = item.getChildByName("Button_baoxiang");
			buttonbaoxiang.i = i;
			buttonbaoxiang.loadTextureNormal("active/active_licaibaoxiangZS/icon_"+self._dataSortBoxArr[i]+".png");
			buttonbaoxiang.addTouchEventListener(function (sender, type) {
				if (type == ccui.Widget.TOUCH_ENDED) {
					selectBaoxiangType = sender.i;
					self.initMyBaoXiangList(self._dataMineInfo.list[self._dataSortBoxArr[selectBaoxiangType]]);
				}
			}, this);

			var textNum = buttonbaoxiang.getChildByName("Image_beishu").getChildByName("Text_125");
			textNum.ignoreContentAdaptWithSize(true);
			textNum.setString("x"+self._dataMineInfo.list[self._dataSortBoxArr[i]].length);

			listbaoxiang.pushBackCustomItem(item);
		}
	},

	initMyBaoXiangList:function(data){
		var self = this;
		var myBaoXiangPanel = this._back.getChildByName("panel_1");

		cc.log("wxddskdoskdoskdoskdo"+JSON.stringify(data));
		var btnAkey = myBaoXiangPanel.getChildByName("Button_akey");
		btnAkey.setBright(false);
		if(!data){
			return;
		}

		var baoxiangList = myBaoXiangPanel.getChildByName("ListView_6");
		baoxiangList.removeAllChildren();
		var baoxiangItem = myBaoXiangPanel.getChildByName("item_2");
		baoxiangItem.setVisible(false);
		for(var i = 0; i < data.length; i++){
			var item = baoxiangItem.clone();
			item.setVisible(true);

			var Text_num = item.getChildByName("Text_num");
			Text_num.ignoreContentAdaptWithSize(true);
			Text_num.setString(i+1);

			var Text_lifan = item.getChildByName("Text_lifan");
			Text_lifan.ignoreContentAdaptWithSize(true);
			Text_lifan.setString("立返钻石："+data[i].immediatelyAmount);

			var Text_yuefan = item.getChildByName("Text_yuefan");
			Text_yuefan.ignoreContentAdaptWithSize(true);
			Text_yuefan.setString("月返钻石："+data[i].monthlyAmount);

			var Text_lifanGet = item.getChildByName("Text_lifanGet");
			Text_lifanGet.ignoreContentAdaptWithSize(true);
			var immediatelyStr = "";
			if(data[i].immediatelyStatus == 1){
				immediatelyStr = "立返钻石：已领取"
			}else {
				immediatelyStr = "立返钻石：未领取"
			}
			Text_lifanGet.setString(immediatelyStr);

			var Text_yuefanNum = item.getChildByName("Text_yuefanNum");
			Text_yuefanNum.ignoreContentAdaptWithSize(true);
			Text_yuefanNum.setString("月返钻石："+data[i].monthlyTotal+"次");

			var Text_num = item.getChildByName("Image_numDi").getChildByName("Text_num");
			Text_num.ignoreContentAdaptWithSize(true);
			Text_num.setString(data[i].monthlyComplete + "/" + (data[i].monthlyTotal));

			item.i = i;
			item.addTouchEventListener(function(sender, type) {
				if (type == 2) {
					MjClient.Scene.addChild(new LiCaiBaoXiang_des(data[sender.i]));
				}
			}, this);

			var Button_lifan = item.getChildByName("Button_lifan");
			Button_lifan.i = i;
			Button_lifan.addTouchEventListener(function(sender, type) {
				if (type == 2) {
					this.reqGetMoney(data[sender.i], 1);
					// if (!this._dataMineInfo.referral) {
					// 	this.tuiJianMa_layer(data, 1, this._dataMineInfo.referralAward);
					// } else {
					// 	this.reqGetMoney(data, 1);
					// }

				}
			}, this);

			cc.log(" ========== (data.immediatelyStatus ", data[i].immediatelyStatus);
			if (data[i].immediatelyStatus == 1) {
				Button_lifan.setTouchEnabled(false);
				//Button_lifan.loadTextureNormal("active/active_licaibaoxiangZS/btn_yilinglifan.png");
				Button_lifan.setBright(false);
			} else {
				Button_lifan.setTouchEnabled(true);
				//Button_lifan.loadTextureNormal("active/active_licaibaoxiangZS/btn_linqulifan.png");
				Button_lifan.setBright(true);
			}


			var Button_yuefan = item.getChildByName("Button_yuefan");
			Button_yuefan.i = i;
			Button_yuefan.addTouchEventListener(function(sender, type) {
				if (type == 2) {
					this.reqGetMoney(data[sender.i], 2);
				}
			}, this);
			cc.log(" ========= data.monthlyResidue", data[i].monthlyResidue);
			if (data[i].monthlyResidue <= 0) {
				Button_yuefan.setTouchEnabled(false);
				//Button_yuefan.loadTextureNormal("active/active_licaibaoxiangZS/btn_yilingyuefan.png");
				Button_yuefan.setBright(false);
			} else {
				Button_yuefan.setTouchEnabled(true);
				//Button_yuefan.loadTextureNormal("active/active_licaibaoxiangZS/btn_linquyuefan.png");
				Button_yuefan.setBright(true);
			}

			var Text_time = item.getChildByName("Text_time");
			Text_time.ignoreContentAdaptWithSize(true);
			Text_time.setString("购买时间："+MjClient.dateFormat(new Date(parseInt(data[i].createTime)), 'yyyy/MM/dd hh:mm:ss'))

			baoxiangList.pushBackCustomItem(item);
		}

		var redNum = 0;
		for(var i = 0; i < data.length; i++){
			if(data[i].immediatelyStatus != 1){
				redNum++;
			}
			if(data[i].monthlyResidue > 0){
				redNum = redNum+data[i].monthlyResidue;
			}
		}
		if(redNum > 0){
			btnAkey.setTouchEnabled(true);
			//btnAkey.loadTextureNormal("active_licaibaoxiang/btn_akeyReward.png");
			btnAkey.setBright(true);
		}else {
			btnAkey.setTouchEnabled(false);
			//btnAkey.loadTextureNormal("active_licaibaoxiang/btn_akeyRewarded.png");
			btnAkey.setBright(false);
		}
		btnAkey.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				self.reqGetMoneyAKey(data[0]);
			}
		}, this);
	},

	//领取记录界面
	initRecrdUI:function (data) {
		var self = this;
		var recordPanel = this._back.getChildByName("panel_2");

		var listViewRecord = recordPanel.getChildByName("ListView_record");
		listViewRecord.removeAllChildren();
		var recordItem = recordPanel.getChildByName("item");
		recordItem.setVisible(false);

		for (var i = 0; i < data.length; i++) {
			var copyNode = recordItem.clone();
			copyNode.visible = true;

			var _time = copyNode.getChildByName("Text_time");
			var _tai = copyNode.getChildByName("Text_tai");
			_tai.setString("已到账");
			var _content = copyNode.getChildByName("Text_content");
			var _timeStr = MjClient.dateFormat(new Date(parseInt(data[i].createTime)), 'yyyy/MM/dd hh:mm:ss');
			_content.ignoreContentAdaptWithSize(true);
			//_time.ignoreContentAdaptWithSize(true);
			_tai.ignoreContentAdaptWithSize(true);
			_time.setString(_timeStr);
			if (data[i].type == 1) {
				_content.setString("立返钻石" + data[i].amount);
			} else if (data[i].type == 2) {
				_content.setString("月返钻石" + data[i].amount);
			} else if (data[i].type == 3) {
				_content.setString("到期返钻石" + data[i].amount);
			}

			listViewRecord.pushBackCustomItem(copyNode);
		}
	},

	reqGetMoney: function(data, type, tuiJianMa) {
		var self = this;
		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.treasInterestRecv", {
				id: data.id,
				type: type,
				referral: tuiJianMa
			},
			function(rtn) {
				cc.log(" ===== pkplayer.handler.treasInterestRecv  === " + JSON.stringify(rtn));
				if (rtn.code == 0) {
					MjClient.showToast("领取成功");
					self.reTreasMine();
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}
				}

				MjClient.unblock();
			}
		);

	},

	reqGetMoneyAKey:function (data) {
		var self = this;
		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.treasInterestOneKeyRecv", {
				type: data.type
			},
			function(rtn) {
				cc.log(" ===== pkplayer.handler.treasInterestOneKeyRecv  === " + JSON.stringify(rtn));
				if (rtn.code == 0) {
					MjClient.showToast("领取成功");
					self.reTreasMine();
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);
					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}
				}

				MjClient.unblock();
			}
		);
	},

	sortData:function () {
		var self =this;
		var keys = Object.keys(self._dataMineInfo.list);
		var newKeys = keys.concat();
		var size = keys.length;
		for(var i = 0;i <size; i++){
			var key = "";
			if(self._dataMineInfo.list[keys[i]].length > 0){
				key = keys[i];
			}
			for (var j = 0 ; j < newKeys.length; j++){
				if(newKeys[j] == key){
					newKeys.splice(j, 1);
				}
			}
		}
		cc.log("wxd===============keys=====" + JSON.stringify(newKeys));
		for(var i = 0; i < newKeys.length; i++){
			delete self._dataMineInfo.list[newKeys[i]]
		}
		keys = Object.keys(self._dataMineInfo.list);
		cc.log("wxd===============keys=====" + JSON.stringify(keys));
		var rewardKeys = [];
		for(var i = 0; i < keys.length; i++){
			var itemBoxArr = self._dataMineInfo.list[keys[i]];
			for(var j = 0; j < itemBoxArr.length; j++){
				if(itemBoxArr[j].immediatelyStatus != 1 || itemBoxArr[j].monthlyResidue > 0){
					if(rewardKeys.indexOf(keys[i]) == -1){
						rewardKeys.push(keys[i]);
					}
				}
			}
		}
		for (var i = 0; i < keys.length; i++){
			if(rewardKeys.indexOf(keys[i]) == -1){
				rewardKeys.push(keys[i]);
			}
		}
		this._dataSortBoxArr = rewardKeys;
		cc.log("wxd===============rewardKeys=====" + JSON.stringify(rewardKeys));
		for(var i = 0; i < rewardKeys.length; i++){
			var immediatelyArr = [];
			var monthlyArr = [];
			var timeArr = [];
			var itemBoxArr = self._dataMineInfo.list[rewardKeys[i]];
			for(var j = 0; j < itemBoxArr.length; j++){
				if(itemBoxArr[j].immediatelyStatus != 1){
					immediatelyArr.push(itemBoxArr[j]);
				}else if(itemBoxArr[j].monthlyResidue > 0){
					monthlyArr.push(itemBoxArr[j]);
				}else {
					timeArr.push(itemBoxArr[j]);
				}
			}
			for(var l = 0; l < timeArr.length-1; l++){
				for(var m = 0; m < timeArr.length-1-l; m++){
					if(timeArr[m].createTime > timeArr[m+1].createTime){
						var temp = timeArr[m+1];        // 元素交换
						timeArr[m+1] = timeArr[m];
						timeArr[m] = temp;
					}
				}
			}
			self._dataMineInfo.list[rewardKeys[i]] = immediatelyArr.concat(monthlyArr, timeArr)
			cc.log("wxd===============self._dataMineInfo.list=====" + JSON.stringify(self._dataMineInfo.list[rewardKeys[i]]));
		}
	},

	setCloseCallback: function(callback) {
		this._closeCallback = callback;

	},
});