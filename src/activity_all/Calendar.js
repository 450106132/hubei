/**create by Lms
 * @DateTime:     2018-09-01 
 * @Description:  日历类  目前 在淮安 APP 资源下做模板
 * 		2017-2030年 年份可以改  选择日期 
 *  input_year,    填写日期的控件 年 
 *  input_month,  月
 *  input_day  日
 */

//calendar
var CalendarLayer = cc.Layer.extend({
	ctor: function(input_year, input_month, input_day) {
		this._super();
		var UI = ccs.load("calendar.json");
		this.addChild(UI.node);

		this._year = null;
		this._month = null;
		this._day = null;
		this._input_year = input_year;
		this._input_month = input_month;
		this._input_day = input_day;
		var self = this;

		var _block = UI.node.getChildByName("block");
		setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

		var _back = UI.node.getChildByName("back");
		setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);


		//关闭按钮
		var _close = _back.getChildByName("btn_yes");
		_close.addTouchEventListener(function(sender, type) {
			if (type == ccui.Widget.TOUCH_ENDED) {
				if (this._input_year && this._input_month && this._input_day) {
					this._input_year.setString(this._year);
					this._input_month.setString(this._month);
					this._input_day.setString(this._day);
				}
				self.removeFromParent();
			}

		}, this);

		this._cell = _back.getChildByName("cell_year");
		this._cell.setVisible(false);
		this.btn_year = _back.getChildByName("btn_1");
		this.btn_month = _back.getChildByName("btn_2");
		this.btn_day = _back.getChildByName("btn_3");

		this._list_year = _back.getChildByName("list_year");
		this._list_month = _back.getChildByName("list_month");
		this._list_day = _back.getChildByName("list_day");
		this._list_year.setScrollBarOpacity(0);
		this._list_month.setScrollBarOpacity(0);
		this._list_day.setScrollBarOpacity(0);

		this._list_year.setTouchEnabled(true);
		this._list_year.addCCSEventListener(function(sender, type) {
			// **新老引擎bug**
			var EVENT_AUTOSCROLL_ENDED = ccui.ScrollView.EVENT_AUTOSCROLL_ENDED;
			if (cc.sys.OS_WINDOWS == cc.sys.os || cc.ENGINE_VERSION.indexOf("3.16") >= 0)
				EVENT_AUTOSCROLL_ENDED = 12;

			switch (type) {
				case ccui.ScrollView.EVENT_SCROLL_TO_TOP:
					break;
				case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
					break;
				case ccui.Widget.TOUCH_ENDED:
				case EVENT_AUTOSCROLL_ENDED:
					var getNum = getScrollViewNumber(this._list_year,this._cell);
					if (!this._list_year.getItem(getNum)) {
						return;
					}
					var getYear = this._list_year.getItem(getNum).getTag();
					
					this.start_schedule();
					// MjClient.showToast(" ==== items " + JSON.stringify(getYear) + "  " + getNum );

					break;
			}
		}.bind(this));

		this._list_month.addCCSEventListener(function(sender, type) {
			// **新老引擎bug**
			var EVENT_AUTOSCROLL_ENDED = ccui.ScrollView.EVENT_AUTOSCROLL_ENDED;
			if (cc.sys.OS_WINDOWS == cc.sys.os || cc.ENGINE_VERSION.indexOf("3.16") >= 0)
				EVENT_AUTOSCROLL_ENDED = 12;

			switch (type) {
				case ccui.ScrollView.EVENT_SCROLL_TO_TOP:
					break;
				case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
					break;
				case ccui.Widget.TOUCH_ENDED:
				case EVENT_AUTOSCROLL_ENDED:
					var getNum = getScrollViewNumber(this._list_month,this._cell);
					var getMonth = this._list_month.getItem(getNum).getTag();
					this._month = getMonth;
					self.init_day();
					this.start_schedule();
					// MjClient.showToast(" ==== items " + JSON.stringify(getMonth));

					break;
			}
		}.bind(this));

		this._list_day.addCCSEventListener(function(sender, type) {
			// **新老引擎bug**
			var EVENT_AUTOSCROLL_ENDED = ccui.ScrollView.EVENT_AUTOSCROLL_ENDED;
			if (cc.sys.OS_WINDOWS == cc.sys.os || cc.ENGINE_VERSION.indexOf("3.16") >= 0)
				EVENT_AUTOSCROLL_ENDED = 12;

			switch (type) {
				case ccui.ScrollView.EVENT_SCROLL_TO_TOP:
					break;
				case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
					break;
				case ccui.Widget.TOUCH_ENDED:
				case EVENT_AUTOSCROLL_ENDED:
					var getNum = getScrollViewNumber(this._list_day,this._cell);
					var getMonth = this._list_day.getItem(getNum).getTag();
					this._day = getMonth;
					this.start_schedule();
					// MjClient.showToast(" ==== items " + JSON.stringify(getMonth));

					break;
			}
		}.bind(this));

		getScrollViewPercent = function(scrollView) {
			if (!scrollView) {
				return;
			}
			var size = scrollView.getInnerContainerSize(); //    --内容区大小
			var pos = scrollView.getInnerContainerPosition();//  --内容区当前位置
			var listSize = scrollView.getContentSize();
			var persent = 100;
			if (size.height - listSize.height > 0) {
				persent = 100 - Math.abs(pos.y / (size.height - listSize.height) * 100);
			}
			return persent;
		};

		getScrollViewNumber = function(scrollView,cell) {
			if (!scrollView) {
				return;
			}
			var height = cell.height;
			var size = scrollView.getInnerContainerSize(); //    --内容区大小
			var pos = scrollView.getInnerContainerPosition();//  --内容区当前位置
			var listSize = scrollView.getContentSize();
			// var persent = 100;
			// if (size.height - listSize.height > 0) {
			// 	persent = 100 - Math.abs(pos.y / (size.height - listSize.height) * 100);
			// }
			cc.log(" ===== width size ",height,JSON.stringify(size),JSON.stringify(listSize));
			var _float = size.height/height + pos.y/height;
			var number = Math.round(size.height/height + pos.y/height) ;
			if (number  <= 3) {
				number = 3;
			}else if(number >= scrollView.getItems().length){
				number = scrollView.getItems().length;
			}
			cc.log(" ===== pos ",JSON.stringify(pos));
			return number - 2;
		};


		this.init_year(2010, 2030);
		this.init_month();
		this.init_day();
		
	},

	start_schedule:function(){
		var self = this;
		this.schedule(function() {
			var height = this._cell.height;
			var size = this._list_year.getInnerContainerSize(); //    --内容区大小
			var pos = this._list_year.getInnerContainerPosition();//  --内容区当前位置
			var listSize = this._list_year.getContentSize();
			
			if ((-pos.y % 50) !=0) {			
				
				var number = getScrollViewNumber(this._list_year,this._cell);
				if (!this._list_year.getItem(number)) {
					return;
				}
				pos.y =  listSize.height - size.height + (number-1) * height ;
				
				var getYear = this._list_year.getItem(number).getTag();
				this._year = getYear;
				// self.init_month();
				self.init_day();
				// MjClient.showToast(" ==== 年份 " + getYear + "  "+number);
				this._list_year.setInnerContainerPosition(pos);
				this.btn_year.setTitleText(this._year + "年");
			}

			var size = this._list_month.getInnerContainerSize(); //    --内容区大小
			var pos = this._list_month.getInnerContainerPosition();//  --内容区当前位置
			var listSize = this._list_month.getContentSize();
			if ((-pos.y % 50) !=0) {
				var number = Math.round(size.height/height + pos.y/height)-3;
				
				pos.y =  listSize.height - size.height + number * height ;
				var getNum = getScrollViewNumber(this._list_month,this._cell);
				if (!this._list_month.getItem(getNum)) {
					return;
				}
				
				var getYear = this._list_month.getItem(getNum).getTag();
				this._month = getYear;
				self.init_day();
				// MjClient.showToast(" ==== 月份 " +getYear );
				this._list_month.setInnerContainerPosition(pos);
				this.btn_month.setTitleText( this._month + "月");
			}

			var size = this._list_day.getInnerContainerSize(); //    --内容区大小
			var pos = this._list_day.getInnerContainerPosition();//  --内容区当前位置
			var listSize = this._list_day.getContentSize();
			if ((-pos.y % 50) !=0) {
				var number = Math.round(size.height/height + pos.y/height)-3;
				
				pos.y =  listSize.height - size.height + number * height ;
				var getNum = getScrollViewNumber(this._list_day,this._cell);
				if (!this._list_day.getItem(getNum)) {
					return;
				}
				
				var getYear = this._list_day.getItem(getNum).getTag();
				this._day = getYear;
				// MjClient.showToast(" ==== 日 "+ getYear);
				this._list_day.setInnerContainerPosition(pos);
				this.btn_day.setTitleText(this._day + "日");
			}



			
		}.bind(this), 0.5);
		this.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
			this.unscheduleAllCallbacks();
			cc.log("==this._year this._month this._day",this._year,this._month,this._day);

		}.bind(this))));
	},

	init_year: function(start_year, end_year) {
		this._year = start_year;
		this._list_year.removeAllItems();
		this._list_year.pushBackCustomItem(this.createItems("", 1));
		for (var i = start_year; i <= end_year; i++) {
			this._list_year.pushBackCustomItem(this.createItems(i, 1));
		}
		this._list_year.pushBackCustomItem(this.createItems("", 1));

	},

	init_month: function() {
		this.btn_year.setTitleText(this._year + "年");
		this._month = 1;
		this.btn_month.setTitleText( this._month + "月");
		this.btn_day.setTitleText( "日");
		this._list_month.removeAllItems();
		this._list_month.pushBackCustomItem(this.createItems("", 2));
		for (var i = 1; i <= 12; i++) {
			this._list_month.pushBackCustomItem(this.createItems(i, 2));
		}
		this._list_month.pushBackCustomItem(this.createItems("", 2));
	},

	init_day: function() {
		this.btn_month.setTitleText(this._month + "月");
		this._day = 1;
		this.btn_day.setTitleText(this._day + "日");
		var days = this.getDays(this._year, this._month);
		if (!days) {
			return;
		}
		this._day = 1;

		this._list_day.removeAllItems();
		this._list_day.pushBackCustomItem(this.createItems("", 3));
		for (var i = 1; i <= days; i++) {
			this._list_day.pushBackCustomItem(this.createItems(i, 3));
		}
		this._list_day.pushBackCustomItem(this.createItems("", 3));
	},
	getDays: function(year, month) {
		if (!year || !month) {
			return false;
		}
		var d = new Date(year, month, 0);
		return d.getDate();
	},

	createItems: function(number, dayType) { // dayType 1是年 2是月 3是日期
		var self = this;
		var copyNode = this._cell.clone();
		copyNode.visible = true;

		var text = copyNode.getChildByName("Text_1");
		text.ignoreContentAdaptWithSize(true);
		text.setFontSize(28);
		copyNode.setTag(number);
		if (dayType == 1 && number) {
			text.setString(number + "年");
		} else if (dayType == 2 && number) {
			text.setString(number + "月");
		} else if (dayType == 3 && number) {
			text.setString(number + "日");
		}else{
			text.setString(number);
		}
		
		copyNode.setTouchEnabled(true);

		copyNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
            	this.start_schedule();
               /* var tag = sender.getTag();
                if (dayType == 1) {
                	this._year = tag;
                    this.init_month();
                } else if (dayType == 2) {
                    this._month = tag;
                    this.init_day();
                } else if (dayType == 3) {
                	this._day = tag;
                	this.btn_day.setTitleText(this._day + "日");
                	if (this._input_year && this._input_month && this._input_day) {
                		this._input_year.setString(this._year);
				        this._input_month.setString(this._month);
				        this._input_day.setString(this._day);
                	}
                	
                    // MjClient.showToast(this._year+"年"+ this._month+"月" + this._day + "日");

                }*/

            }
        }, this);
        

		return copyNode;
	},



});