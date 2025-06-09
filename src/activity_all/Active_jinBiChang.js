/**create by Lms
 * @DateTime:     2018-09-20 
 * @Description: Description 
 */
var Active_jinBiChang = cc.Layer.extend({
	ctor: function() {
		this._super();
		var UI = ccs.load("Act_jinBiChang.json");
		this.addChild(UI.node);
		var self = this;
		this._data = null;
		var block = UI.node.getChildByName("block");
		setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

		this._back = UI.node.getChildByName("back");
		setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);

		var closeBtn = this._back.getChildByName("close");
		closeBtn.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				self.removeFromParent();
			}
		});

		var selectNum = function(sender, type) {
			if (type == 2) {
				var tag = sender.getTag();
				self.selectPage(tag);
			}
		}.bind(this);


		for (var i = 1; i <= 3; i++) {
			self["node_" + i] = this._back.getChildByName("node_" + i);
			self["btn_" + i] = this._back.getChildByName("bg_btn").getChildByName("btn_" + i);
			self["btn_" + i].setTag(i);
			self["btn_" + i].addTouchEventListener(selectNum);
		}

		var _btnTiXian = self.node_1.getChildByName("btn_tixian");
		_btnTiXian.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				if (!self._data || self._data.currentBonus < 5) {
					MjClient.showToast("提现金额不足5元");
					return;
				}
				self.reqTiXian();
			}
		}, this);
		this._txtTiXian = self.node_1.getChildByName("Text_tixian");
		this._txtTiXian.ignoreContentAdaptWithSize(true);
		this._txtTiXian.setString("");

		this._listView_1 = self.node_1.getChildByName("ListView_1");
		this._cell_1 = self.node_1.getChildByName("cell_1");
		this._cell_1.visible = false;

		var _txt = self.node_1.getChildByName("Text_2");
		_txt.ignoreContentAdaptWithSize(true);
		_txt.setString("当前未提现金额达到5元才可提现，添加公众号“" + MjClient.systemConfig.gongzhonghao + "”-玩家红包-领取红包");

		this._ruleText = self.node_2.getChildByName("text");
		this._ruleText.setString("");

		this._listView_2 = self.node_3.getChildByName("ListView_1");
		this._cell_2 = self.node_3.getChildByName("cell_1");
		this._cell_2.visible = false;


		self.reqMainMsg();
		self.selectPage(1);
	},

	initData: function() {
		var self = this;
		self.initRule();
		self._txtTiXian.setString(self._data.currentBonus + "元");
		self.addItems_1();
		self.addItems_2();

	},
	initRule: function() {
		var self = this;
		var str = "1、进入娱乐场对战中在规定时间内完成一定局数即可参与抢红包活动，红包时间只存在10秒，超时不可领取哦~" +
			"\n2、当前未提现金额达到5元才可提现，添加公众号“" + MjClient.systemConfig.gongzhonghao + "”-玩家红包-领取红包";
		this._ruleText.setString(str);
	},
	reqMainMsg: function() {
		var self = this;
		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.goldfieldRedPacketList", {},
			function(rtn) {
				cc.log(" ===== goldfieldRedPacketList 22222 === " + JSON.stringify(rtn));
				if (rtn.code == 0) {
					self._data = rtn.data;
					self.initData();
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
	reqTiXian: function() {
		var self = this;
		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.goldfieldRedPacketWithdraw", {},
			function(rtn) {
				cc.log(" ===== goldfieldRedPacketWithdraw === " + JSON.stringify(rtn));
				if (rtn.code == 0) {
					MjClient.showToast("提现成功");
					self.reqMainMsg();
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
	selectPage: function(tag) {
		var self = this;
		self._back.getChildByName("bg_btn").loadTexture("active_jinbichang/btn_" + tag + ".png");
		for (var i = 1; i <= 3; i++) {
			if (tag == i) {
				self["btn_" + i].setTouchEnabled(false);
				self["node_" + i].visible = true;
			} else {
				self["btn_" + i].setTouchEnabled(true);
				self["node_" + i].visible = false;
			}
		}
	},

	addItems_1: function() {
		var _emailList = this._data.list;
		this._listView_1.removeAllItems();
		for (var i = 0; i < _emailList.length; i++) {
			if (cc.sys.isObjectValid(this._listView_1)) {
				this._listView_1.pushBackCustomItem(this.createItem_1(_emailList[i], i));
			}
		}
		// this._listView_1.setScrollBarOpacity(0);

		var _nullTip_text = this.node_1.getChildByName("nullTip_text");
        var _nullTip_image = this.node_1.getChildByName("nullTip_image");

        if (_emailList.length == 0) {
            if (_nullTip_text) {
                _nullTip_text.visible = true;
                _nullTip_image.visible = true;
                
            } else {
                MjClient.showToast("已显示所有记录");
            }
        }else{
        	_nullTip_text.visible = false;
            _nullTip_image.visible = false;
        }


	},

	createItem_1: function(oneData, number) {
		var self = this;
		var copyNode = this._cell_1.clone();
		copyNode.visible = true;

		var Text_num = copyNode.getChildByName("Text_num");
		Text_num.ignoreContentAdaptWithSize(true);
		Text_num.setString(oneData.amount + "元");

		var Text_time = copyNode.getChildByName("Text_time");
		Text_time.ignoreContentAdaptWithSize(true);
		var timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy.MM.dd hh:mm:ss');
		Text_time.setString("" + timeStr);

		var Text_zhuangtai = copyNode.getChildByName("Text_zhuangtai");
		Text_zhuangtai.ignoreContentAdaptWithSize(true);
		var str = oneData.status == 0 ? "未提现" : "已提现";
		Text_zhuangtai.setString("" + str);

		return copyNode;
	},

	addItems_2: function() {
		var _emailList = this._data.withdrawRecord;
		this._listView_2.removeAllItems();
		for (var i = 0; i < _emailList.length; i++) {
			if (cc.sys.isObjectValid(this._listView_2)) {
				this._listView_2.pushBackCustomItem(this.createItem_2(_emailList[i], i));
			}
		}
		this._listView_2.setScrollBarOpacity(0);
		var _nullTip_text = this.node_3.getChildByName("nullTip_text");
        var _nullTip_image = this.node_3.getChildByName("nullTip_image");

        if (_emailList.length == 0) {
            if (_nullTip_text) {
                _nullTip_text.visible = true;
                _nullTip_image.visible = true;
                
            } else {
                MjClient.showToast("已显示所有记录");
            }
        }else{
        	_nullTip_text.visible = false;
            _nullTip_image.visible = false;
        }


	},


	createItem_2: function(oneData, number) {
		var self = this;
		var copyNode = this._cell_2.clone();
		copyNode.visible = true;

		var Text_num = copyNode.getChildByName("Text_num");
		Text_num.ignoreContentAdaptWithSize(true);
		Text_num.setString(oneData.amount + "元");

		var Text_time = copyNode.getChildByName("Text_time");
		Text_time.ignoreContentAdaptWithSize(true);
		var timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy.MM.dd hh:mm:ss');
		Text_time.setString("" + timeStr);

		var Text_zhuangtai = copyNode.getChildByName("Text_zhuangtai");
		Text_zhuangtai.ignoreContentAdaptWithSize(true);
		var str = "已到账";
		Text_zhuangtai.setString("" + str);

		return copyNode;
	},



});