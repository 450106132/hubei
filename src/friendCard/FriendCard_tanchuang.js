/**
 * Created by cyc on 2017/11/21.
 */

// 亲友圈-选择玩法界面
var Friendcard_selectWanfa = cc.Layer.extend({
    ctor:function (data) {
        this._super();
        this.data = data;
        this._addWanfaNum = this.data.addWanfaNum ? this.data.addWanfaNum : 0;
        this._rankNum = this.data._rankNum ? this.data._rankNum : 4;
        this.clubId = data.clubId;
        this.wanfaBtnList = [];
        this.renshuBtnList = [];
        this.curSel = {wanfaTag:-1,wanfaName:"全部",renshuTag:-1,renshuName:"全部"};
        var node = ccs.load("friendcard_selectWanfa.json").node;
        this.addChild(node);
        this.node = node;
        this.needRenshuNum = ("renshuNum" in this.data) ? this.data.renshuNum : (isJinZhongAPPType() ? 5 : 4);
        COMMON_UI.setNodeTextAdapterSize(node);
        this.back = node.getChildByName("Panel");
        this.block = node.getChildByName("Image_di")
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        if(FriendCard_Common.getSkinType() == 3){
            setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0]);
        }else{
            setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0]);
        }

        var close = this.back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Jilu_Xuanzewanfa_Close", {uid: SelfUid()});
                this.logFilterLayer(false);
            }
        }, this);

        var btn_OK = this.back.getChildByName("btn_OK");
        btn_OK.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.returnData();
            }
        }, this);

        this.text = this.back.getChildByName("scrollView").getChildByName("text");
        this.text.visible = false;
        this.text.ignoreContentAdaptWithSize(true);
        popupAnm(this.back);
        closeBtnAddLight(close);


        this.logFilter();
        this.logFilterCreateBtn();
        this.initRenshuBtn();
    },
    returnData:function(){
        if (this.data && this.data.event) {
            postEvent(this.data.event,{gameType:this.curSel.wanfaTag,wanfaIndex:this.curSel.wanfaIndex,gameName:this.curSel.wanfaName,renshu:this.curSel.renshuTag});
        }
        this.logFilterLayer(false)
    },
    logFilterLayer:function(isShow)
    {
        this.block.setVisible(isShow);
        this.back.setVisible(isShow);
        if(!isShow){
            this.removeFromParent(true);
        }
    },
    logFilter: function(root)
    {
        var that = this;

        this.logFilterLayer(true);
        this.block.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.logFilterLayer(false);
            }
        }, this);

        //玩法选项的按钮
        this.WanFaBtn = [];
        //按钮
        this.wanFaItem = this.back.getChildByName("scrollView").getChildByName("btnWanFa_68");
        if(FriendCard_Common.getSkinType() != 3){
            this.wanFaItem.setScale(0.9)
        } 
        this.wanFaItem.name = "全部";
        this.wanFaItem.type = -1;
        this.wanfaBtnList.push(this.wanFaItem)
        this.wanFaItem.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (that.data && that.data.event) {
                    this.onClickWanfaBtn(sender);
                }
            }
        }, this);

        this.initWanfaBtn();
        var scrollView = this.back.getChildByName("scrollView");
        //玩法1-6
        var i = (this.wanfaLength+1 + this._addWanfaNum);
        var height = (Math.floor(i/this._rankNum))*(20)+(Math.floor(i/this._rankNum)+1)*this.wanFaItem.height*this.wanFaItem.scale;
        var shurenHeight = this.wanFaItem.height*this.wanFaItem.scale*0.5+(Math.ceil(this.needRenshuNum/this._rankNum))*this.wanFaItem.height*this.wanFaItem.scale;
        scrollView.setInnerContainerSize(cc.size(scrollView.getInnerContainerSize().width, height + shurenHeight));
        this.wanFaItem.y = scrollView.getInnerContainerSize().height - shurenHeight;

        var _text = this.text.clone();
        _text.setString("玩法:");
        _text.visible = true;
        _text.setPosition( this.wanFaItem.x - _text.width,  this.wanFaItem.y - _text.height / 2)
        scrollView.addChild(_text);
            
    },

    initWanfaBtn:function()
    {
        //当前列表里有的玩法
        var _gameTypeList;
        this.wanfaLength = 0;

        if (this.data._gameTypeList) {
            _gameTypeList = this.data._gameTypeList;
            for (var i = 0; i < _gameTypeList.length; i++) {
                this.wanfaLength += 1;
                this.WanFaBtn[GameCnName[_gameTypeList[i]]] = _gameTypeList[i];
            }
        } else {
            _gameTypeList = getAllGameListArray()._gameTypeList;

            //记忆点过的玩法排在前面
            var frontGameTypeList = util.localStorageEncrypt.getStringItem("Friendcard_selectWanfa_frontGameType" + this.clubId, "");
            frontGameTypeList = frontGameTypeList.split(',')
            if (frontGameTypeList[frontGameTypeList.length - 1] == "") {
                frontGameTypeList.length--;
            }
            this.frontGameTypeList = frontGameTypeList;

            for (var i = 0; i < _gameTypeList.length; i++) {
                for (var j = 0; j < _gameTypeList[i].length; j++) {
                    this.WanFaBtn[_gameTypeList[i][j]] = _gameTypeList[i][j];
                    this.wanfaLength += 1;
                }
            }

            //记忆点过的玩法排在前面
            for (var frontGameType in frontGameTypeList) {
                for (var x in this.WanFaBtn) {
                    if (this.WanFaBtn[x] == frontGameTypeList[frontGameType]) {
                        delete this.WanFaBtn[x]
                    }
                }

            }
            this.WanFaBtn = frontGameTypeList.concat(this.WanFaBtn)
        }
    },
    initRenshuBtn: function()
    {   
        var btnNum = this.needRenshuNum;
        var that = this;
        var i = 0;
        var scrollView = this.back.getChildByName("scrollView");
        var scrollViewY = scrollView.getInnerContainerSize().height;

        var dx = (scrollView.width - this.wanFaItem.width * this.wanFaItem.scale) / (this._rankNum - 1) - 20 - (this.wanFaItem.x / (this._rankNum));
        if (FriendCard_Common.getSkinType() != 3) dx += 10;
        var renshuName = ["全部", "2人", "3人", "4人", "5人"];
        for (var i = 0; i < btnNum; i++) {
            var _wanFaBtn = this.wanFaItem.clone();

            this.renshuBtnList.push(_wanFaBtn)

            scrollView.addChild(_wanFaBtn);
            _wanFaBtn.x = this.wanFaItem.x + (i % this._rankNum) * dx;
            _wanFaBtn.y = scrollViewY - Math.floor(i / this._rankNum) * (this.wanFaItem.height * this.wanFaItem.scale + 20);
            if (i == 0) {
                var _text = this.text.clone();
                _text.setString("人数:");
                _text.visible = true;
                _text.setPosition(_wanFaBtn.x - _text.width, _wanFaBtn.y - _text.height / 2)
                scrollView.addChild(_text);
            }
            var text = _wanFaBtn.getChildByName("text")
            text.setString(renshuName[i])
            text.ignoreContentAdaptWithSize(true);

            _wanFaBtn.type = (i == 0) ? -1 : (i + 1);
            _wanFaBtn.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (that.data && that.data.event) {
                        this.onClickRenshuBtn(sender);
                    }
                }
            }, this);
        }
    },
    //添加赛选按钮
    logFilterCreateBtn: function()
    {
        var that = this;
        var i = 0;
        var scrollView = this.back.getChildByName("scrollView");

        var dx = (scrollView.width - this.wanFaItem.width * this.wanFaItem.scale) / (this._rankNum - 1) - 20 - (this.wanFaItem.x / (this._rankNum));
        if (FriendCard_Common.getSkinType() != 3) dx += 10;

        for (var j = 0 ; j < this._addWanfaNum;j++) {
            i++;
            var _wanFaBtn = this.wanFaItem.clone();

            this.wanfaBtnList.push(_wanFaBtn)

            scrollView.addChild(_wanFaBtn);
            _wanFaBtn.name = x;
            _wanFaBtn.x = this.wanFaItem.x + (i % this._rankNum) * dx;
            _wanFaBtn.y = this.wanFaItem.y - Math.floor(i / this._rankNum) * (this.wanFaItem.height * this.wanFaItem.scale + 20);
            var text = _wanFaBtn.getChildByName("text");

            var gameName = "玩法"+(j+1)
            text.setString(gameName);
            text.ignoreContentAdaptWithSize(true);

            _wanFaBtn.type = "wanfa"+(j+1);
            _wanFaBtn.wanfaIndex = (j+1);
            _wanFaBtn.gameName = gameName;
            _wanFaBtn.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (that.data && that.data.event) {
                        this.onClickWanfaBtn(sender);
                    }
                }
            }, this);
        }

        for (var x in this.WanFaBtn) {
            i++;
            var _wanFaBtn = this.wanFaItem.clone();

            this.wanfaBtnList.push(_wanFaBtn)

            scrollView.addChild(_wanFaBtn);
            _wanFaBtn.name = x;
            _wanFaBtn.x = this.wanFaItem.x + (i % this._rankNum) * dx;
            _wanFaBtn.y = this.wanFaItem.y - Math.floor(i / this._rankNum) * (this.wanFaItem.height * this.wanFaItem.scale + 20);
            if (this.data._btnType && this.data._btnType == 2) {
                _wanFaBtn.loadTextureNormal(GameButton[this.WanFaBtn[x]] + "_n.png");
            } else {
                var text = _wanFaBtn.getChildByName("text")
                text.setString(GameCnName[this.WanFaBtn[x]])
                text.ignoreContentAdaptWithSize(true);
            }
            _wanFaBtn.type = this.WanFaBtn[x];
            _wanFaBtn.gameName = GameCnName[this.WanFaBtn[x]];
            _wanFaBtn.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (that.data && that.data.event) {
                        //postEvent(that.data.event,{gameType:sender.type,gameName:sender.gameName});
                        this.onClickWanfaBtn(sender);
                    }

                    //记忆点过的玩法排在前面
                    if (this.frontGameTypeList) {
                        for (var i = 0; i < this.frontGameTypeList.length; i++) {
                            if (this.frontGameTypeList[i] == sender.type) {
                                this.frontGameTypeList.splice(i, 1)
                            }
                        }
                        util.localStorageEncrypt.setStringItem("Friendcard_selectWanfa_frontGameType" + this.clubId, sender.type + "," + this.frontGameTypeList.toString());
                    }
                    //that.logFilterLayer(false);
                }
            }, this);
        }
    },

    onExit: function () {
        this._super();
    },
    onClickWanfaBtn:function(btn){
        for (var i = 0; i < this.wanfaBtnList.length; i++) {
            this.wanfaBtnList[i].setEnabled(true);
        }
        btn.setEnabled(false);
        this.curSel.wanfaTag = btn.type;
        this.curSel.wanfaIndex = btn.wanfaIndex;
        this.curSel.wanfaName = btn.gameName;
        if(this.needRenshuNum <= 0){
            this.returnData();
        }
    },
    onClickRenshuBtn:function(btn){
        for (var i = 0; i < this.renshuBtnList.length; i++) {
            this.renshuBtnList[i].setEnabled(true);
        }
        btn.setEnabled(false)

        this.curSel.renshuTag = btn.type;
        this.curSel.renshuName = btn.gameName;
    },
});


/*
 时间弹窗框
 */
var friendcard_selectTime = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        var msgui = ccs.load("friendcard_selectTime.json");
        this.addChild(msgui.node);
        //MjClient.friendcard_selectTime = this;
        COMMON_UI.setNodeTextAdapterSize(msgui.node);

        var that = this;
        this.data = data;
        cc.log("friendcard_selectTime data = "+JSON.stringify(this.data));
        var timeData
        if (data.date){
            timeData = data.date;
        }
        else{
            timeData = new Date();
        }
        var _block = msgui.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        _block.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.removeFromParent(true);
            }
        }, this);
        var _back = msgui.node.getChildByName("back");
        if(FriendCard_Common.getSkinType() == 3){
            setWgtLayout(_back, [0.1984, 0.2736], [0.0], [0, 0]);
        }else{
            setWgtLayout(_back, [0.198, 0.2541], [0.0], [0, 0]);
        }
        if(data.px){
            _back.setPositionX(data.px);
        }
        if(data.py && data.WASD == "S"){
            _back.setPositionY(data.py-_back.height*_back.scale/2);
        }
        else if(data.py){
            _back.setPositionY(data.py+_back.height*_back.scale/2);
        }

        var setEditBoxConfig = function(_parent,_child,str,MaxLength) {
            _child.setFontColor(cc.color(FriendCard_Common.getTextColor().black));
            _child.setPlaceholderFontColor(cc.color(FriendCard_Common.getTextColor().black));
            _child.setFontSize(22);
            _child.setPlaceholderFontSize(22);
            _child.setMaxLength(MaxLength);
            _child.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            _child.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            _child.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            _child.setPlaceHolder(str);
            _child.setFontName("fonts/lanting.TTF");
            _child.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            _child.setPosition(_parent.getContentSize().width / 2, _parent.getContentSize().height / 2);
            _parent.addChild(_child);
        }.bind(this);
        this.editBoxEditingDidBegin = function (editBox) {
            var bg_di =  editBox.getParent().getChildByName("bg_di");
            bg_di.visible = true;
        }.bind(this);
        this.editBoxEditingDidEnd = function (editBox) {
        }.bind(this);
        this.editBoxTextChanged = function (editBox, text ) {
        }.bind(this);

        this.editBoxReturn = function (editBox) {
            cc.log("select time editBoxReturn");
            var bg_di =  editBox.getParent().getChildByName("bg_di");
            bg_di.visible = false;
            if (editBox.name == "yy"){
                this.year = setYear(Number(editBox.getString()));
            }else if (editBox.name == "mm"){
                if(Number(editBox.getString()) < 1 || Number(editBox.getString()) > 12){
                    editBox.setString(setMonth(this.month));
                }else{
                    this.month = setMonth(Number(editBox.getString()));
                }
                checkDay();
            }else if (editBox.name == "dd"){
                if(Number(editBox.getString()) < 1 || Number(editBox.getString()) > getLastDay()){
                    editBox.setString(setDay(this.day));
                }else{
                    this.day = setDay(Number(editBox.getString()));
                }
            }else if(editBox.name == "hh"){
                if(Number(editBox.getString()) < 0 || Number(editBox.getString()) > 23){
                    editBox.setString(setHour(Number(this.hour)));
                }else{
                    this.hour = setHour(Number(editBox.getString()));
                }
            }else if(editBox.name == "fz"){
                if(Number(editBox.getString()) < 0 || Number(editBox.getString()) > 59){
                    editBox.setString(setMinute(Number(this.minute)));
                }else{
                    this.minute = setMinute(Number(editBox.getString()));
                }
            }

            if (this.data.event) {
                this.sendPostEvent();
            }
            /*this.year_bg.visible = false;
             this.year = setYear(Number(sender.getString()));
             */
        }.bind(this);

        this.year_bg = _back.getChildByName("year_bg");
        this.year_edit_content = new cc.EditBox(this.year_bg.getContentSize(),new cc.Scale9Sprite("friendCards/selecttime/touming.png"));
        this.year_edit_content.name = "yy";
        setEditBoxConfig(this.year_bg, this.year_edit_content,"",4);
        this.year_edit_content.setDelegate(this);

        this.month_bg = _back.getChildByName("month_bg");
        this.month_edit_content = new cc.EditBox(this.month_bg.getContentSize(),new cc.Scale9Sprite("friendCards/selecttime/touming.png"));
        this.month_edit_content.name = "mm";
        setEditBoxConfig(this.month_bg, this.month_edit_content,"",2);
        this.month_edit_content.setDelegate(this);

        this.day_bg = _back.getChildByName("day_bg");
        this.day_edit_content = new cc.EditBox(this.day_bg.getContentSize(),new cc.Scale9Sprite("friendCards/selecttime/touming.png"));
        this.day_edit_content.name = "dd";
        setEditBoxConfig(this.day_bg, this.day_edit_content,"",2);
        this.day_edit_content.setDelegate(this);

        this.hour_bg = _back.getChildByName("hour_bg");
        this.hour_edit_content = new cc.EditBox(this.hour_bg.getContentSize(),new cc.Scale9Sprite("friendCards/selecttime/touming.png"));
        this.hour_edit_content.name = "hh";
        setEditBoxConfig(this.hour_bg, this.hour_edit_content,"",2);
        this.hour_edit_content.setDelegate(this);

        this.minute_bg = _back.getChildByName("minute_bg");
        this.minute_edit_content = new cc.EditBox(this.minute_bg.getContentSize(),new cc.Scale9Sprite("friendCards/selecttime/touming.png"));
        this.minute_edit_content.name = "fz";
        setEditBoxConfig(this.minute_bg, this.minute_edit_content,"",2);
        this.minute_edit_content.setDelegate(this);


        this.year_edit_content.setString(timeData.getFullYear());
        this.year = setYear(timeData.getFullYear());
        var btn_yearAdd = _back.getChildByName("btn_yearAdd");
        btn_yearAdd.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.year_edit_content.setString(Number(this.year_edit_content.getString()) + 1)
                this.year = setYear(Number(this.year_edit_content.getString()));
                if (this.data.event){
                    this.sendPostEvent();
                }
            }
        }, this);
        var btn_yearMinu = _back.getChildByName("btn_yearMinu");
        btn_yearMinu.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.year_edit_content.setString(Number(this.year_edit_content.getString()) - 1);
                this.year = setYear(Number(this.year_edit_content.getString()));
                if (this.data.event){
                    this.sendPostEvent();
                }

            }
        }, this);

        this.month_edit_content.setString(setMonth(timeData.getMonth() + 1));
        this.month = setMonth(timeData.getMonth() + 1);
        var btn_monthAdd = _back.getChildByName("btn_monthAdd");
        btn_monthAdd.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.month_edit_content.setString(setMonth(Number(this.month_edit_content.getString()) + 1));
                this.month = setMonth(Number(this.month_edit_content.getString()));
                checkDay();
                if (this.data.event){
                    this.sendPostEvent();
                }
            }
        }, this);
        var btn_monthMinu = _back.getChildByName("btn_monthMinu");
        btn_monthMinu.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.month_edit_content.setString(setMonth(Number(this.month_edit_content.getString()) - 1))
                this.month = setMonth(Number(this.month_edit_content.getString()));
                checkDay();
                if (this.data.event){
                    this.sendPostEvent();
                }
            }
        }, this);


        this.day_edit_content.setString(timeData.getDate())
        this.day = setDay(Number(this.day_edit_content.getString()));
        var btn_dayAdd = _back.getChildByName("btn_dayAdd");
        btn_dayAdd.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.day_edit_content.setString(setDay(Number(this.day_edit_content.getString()) + 1));
                this.day = setDay(Number(this.day_edit_content.getString()));
                if (this.data.event){
                    this.sendPostEvent();
                }
            }
        }, this);
        var btn_dayMinu = _back.getChildByName("btn_dayMinu");
        btn_dayMinu.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.day_edit_content.setString(setDay(Number(this.day_edit_content.getString()) - 1));
                this.day = setDay(Number(this.day_edit_content.getString()));
                if (this.data.event){
                    this.sendPostEvent();
                }
            }
        }, this);

        this.hour_edit_content.setString(setHour(timeData.getHours()))
        this.hour = setHour(Number(this.hour_edit_content.getString()));
        var btn_hourAdd = _back.getChildByName("btn_hourAdd");
        btn_hourAdd.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.hour_edit_content.setString(setHour(Number(this.hour_edit_content.getString()) + 1));
                this.hour = setHour(Number(this.hour_edit_content.getString()));
                if (this.data.event){
                    this.sendPostEvent();
                }
            }
        }, this);
        var btn_hourMinu = _back.getChildByName("btn_hourMinu");
        btn_hourMinu.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.hour_edit_content.setString(setHour(Number(this.hour_edit_content.getString()) - 1));
                this.hour = setHour(Number(this.hour_edit_content.getString()));
                if (this.data.event){
                    this.sendPostEvent();
                }
            }
        }, this);


        this.minute_edit_content.setString(setMinute(timeData.getMinutes()))
        this.minute = setMinute(Number(this.minute_edit_content.getString()));
        var btn_minuteAdd = _back.getChildByName("btn_minuteAdd");
        btn_minuteAdd.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.minute_edit_content.setString(setMinute(Number(this.minute_edit_content.getString()) + 1));
                this.minute = setMinute(Number(this.minute_edit_content.getString()));
                if (this.data.event){
                    this.sendPostEvent();
                }
            }
        }, this);
        var btn_minuteMinu = _back.getChildByName("btn_minuteMinu");
        btn_minuteMinu.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.minute_edit_content.setString(setMinute(Number(this.minute_edit_content.getString()) - 1));
                this.minute = setMinute(Number(this.minute_edit_content.getString()));
                if (this.data.event){
                    this.sendPostEvent();
                }
            }
        }, this);

        if(this.data.noShowDay)//选择小时隐藏掉
        {
            btn_minuteMinu.visible = false;
            btn_minuteAdd.visible = false;
            this.minute_edit_content.visible = false;
            btn_hourMinu.visible = false;
            btn_hourAdd.visible = false;
            _back.getChildByName("img_di1").visible = false;
            this.hour_edit_content.visible = false;
        }

        function checkDay() {
            if (getLastDay() < that.day) {
                that.day_edit_content.setString(getLastDay());
                that.day = setDay(Number(that.day_edit_content.getString()));
            }
        }

        function setYear(year) {
            return year
        }

        function setMonth(month) {
            if (month <= 0)
                return "12"

            if (month > 12)
                return "01"

            if (month <= 9)
                return "0" + month

            return month
        }

        function setHour(huor) {
            if (huor < 0)
                return "23"

            if (huor > 23)
                return "00"

            if (huor <= 9)
                return "0" + huor

            return huor
        }

        function setMinute(minute) {
            if (minute < 0)
                return "59"

            if (minute > 59)
                return "00"

            if (minute <= 9)
                return "0" + minute

            return minute
        }

        function setDay(day) {
            return FriendCard_Common.setDay(that.year,that.month,day);
        }

        function getLastDay() {
            return FriendCard_Common.getLastDay(that.year,that.month);
        }
        return true;
    },

    sendPostEvent: function() {
        postEvent(this.data.event, {
            year: this.year,
            month: this.month,
            day: this.day,
            hour: this.hour,
            minute: this.minute
        })
    },
});

/*
 时间弹窗框2,只有时分
 */
var friendcard_selectTime2 = cc.Layer.extend({
    ctor: function(data,callbackFunc) {
        this._super();
        var msgui = ccs.load("friendcard_selectTime2.json");
        this.addChild(msgui.node);
        COMMON_UI.setNodeTextAdapterSize(msgui.node);

        var that = this;
        this.data = data;
        this._callbackFunc = callbackFunc;
        cc.log("friendcard_selectTime2 data",JSON.stringify(data))
        var timeData = new Date();
        timeData.setHours(this.data.hour);
        timeData.setMinutes(this.data.minute)
        var _block = msgui.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        _block.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.removeFromParent(true);
            }
        }, this);
        var _back = msgui.node.getChildByName("back");
        setWgtLayout(_back, [0.1250, 0.1917], [0.0], [0, 0]);
        
        if(data.px){
            _back.setPositionX(data.px);
        }
        if(data.py && data.WASD == "S"){
            _back.setPositionY(data.py-_back.height*_back.scale/2);
        }
        else if(data.py){
            _back.setPositionY(data.py+_back.height*_back.scale/2);
        }

        var setEditBoxConfig = function(_parent,_child,str,MaxLength) {
            _child.setFontColor(cc.color(FriendCard_Common.getTextColor().black));
            _child.setPlaceholderFontColor(cc.color(FriendCard_Common.getTextColor().black));
            _child.setFontSize(22);
            _child.setPlaceholderFontSize(22);
            _child.setMaxLength(MaxLength);
            _child.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            _child.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            _child.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            _child.setPlaceHolder(str);
            _child.setFontName("fonts/lanting.TTF");
            _child.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            _child.setPosition(_parent.getContentSize().width / 2, _parent.getContentSize().height / 2);
            _parent.addChild(_child);
        }.bind(this);
        this.editBoxEditingDidBegin = function (editBox) {
            var bg_di =  editBox.getParent().getChildByName("bg_di");
            bg_di.visible = true;
        }.bind(this);
        this.editBoxEditingDidEnd = function (editBox) {
        }.bind(this);
        this.editBoxTextChanged = function (editBox, text ) {
        }.bind(this);

        this.editBoxReturn = function (editBox) {
            cc.log("select time editBoxReturn");
            var bg_di =  editBox.getParent().getChildByName("bg_di");
            bg_di.visible = false;
            if(editBox.name == "hh"){
                if(Number(editBox.getString()) < 0 || Number(editBox.getString()) > 23){
                    editBox.setString(setHour(Number(this.hour)));
                }else{
                    this.hour = setHour(Number(editBox.getString()));
                }
            }else if(editBox.name == "fz"){
                if(Number(editBox.getString()) < 0 || Number(editBox.getString()) > 59){
                    editBox.setString(setMinute(Number(this.minute)));
                }else{
                    this.minute = setMinute(Number(editBox.getString()));
                }
            }
            this.sendPostEvent();
        }.bind(this);

        this.hour_bg = _back.getChildByName("hour_bg");
        this.hour_edit_content = new cc.EditBox(this.hour_bg.getContentSize(),new cc.Scale9Sprite("friendCards/selecttime/touming.png"));
        this.hour_edit_content.name = "hh";
        setEditBoxConfig(this.hour_bg, this.hour_edit_content,"",2);
        this.hour_edit_content.setDelegate(this);

        this.minute_bg = _back.getChildByName("minute_bg");
        this.minute_edit_content = new cc.EditBox(this.minute_bg.getContentSize(),new cc.Scale9Sprite("friendCards/selecttime/touming.png"));
        this.minute_edit_content.name = "fz";
        setEditBoxConfig(this.minute_bg, this.minute_edit_content,"",2);
        this.minute_edit_content.setDelegate(this);


        this.hour_edit_content.setString(setHour(timeData.getHours()))
        this.hour = setHour(Number(this.hour_edit_content.getString()));
        var btn_hourAdd = _back.getChildByName("btn_hourAdd");
        btn_hourAdd.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.hour_edit_content.setString(setHour(Number(this.hour_edit_content.getString()) + 1));
                this.hour = setHour(Number(this.hour_edit_content.getString()));
                this.sendPostEvent();
            }
        }, this);
        var btn_hourMinu = _back.getChildByName("btn_hourMinu");
        btn_hourMinu.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.hour_edit_content.setString(setHour(Number(this.hour_edit_content.getString()) - 1));
                this.hour = setHour(Number(this.hour_edit_content.getString()));
                this.sendPostEvent();
            }
        }, this);


        this.minute_edit_content.setString(setMinute(timeData.getMinutes()))
        this.minute = setMinute(Number(this.minute_edit_content.getString()));
        var btn_minuteAdd = _back.getChildByName("btn_minuteAdd");
        btn_minuteAdd.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.minute_edit_content.setString(setMinute(Number(this.minute_edit_content.getString()) + 1));
                this.minute = setMinute(Number(this.minute_edit_content.getString()));
                this.sendPostEvent();
            }
        }, this);
        var btn_minuteMinu = _back.getChildByName("btn_minuteMinu");
        btn_minuteMinu.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.minute_edit_content.setString(setMinute(Number(this.minute_edit_content.getString()) - 1));
                this.minute = setMinute(Number(this.minute_edit_content.getString()));
                this.sendPostEvent();
            }
        }, this);


        function setHour(hour) {
            hour = parseInt(hour);
            if (hour < 0){
                return "23"
            }

            if (hour > 23){
                return "00"
            }

            if (hour <= 9){
                return "0" + hour
            }

            return hour;
        }

        function setMinute(minute) {
            minute = parseInt(minute);
            if (minute < 0)
                return "59"

            if (minute > 59)
                return "00"

            if (minute <= 9)
                return "0" + minute

            return minute
        }

        return true;
    },

    sendPostEvent: function() {
        this._callbackFunc({
            hour:parseInt(this.hour),
            minute:parseInt(this.minute),
        })
    },
});

/*
 亲友圈 统计: 选择时间 间隔弹窗
*/
var Friendcard_selectTJDay = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        var msgui = ccs.load("friendcard_selectTJDay.json");
        this.addChild(msgui.node);
        COMMON_UI.setNodeTextAdapterSize(msgui.node);
        var that = this;
        this.data = data;
        var _block = msgui.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        _block.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.removeFromParent(true);
            }
        }, this);
        var _back = msgui.node.getChildByName("back");
        setWgtLayout(_back, [0.1563, 0.4167], [0.0], [0, 0]);
        var button = _back.getChildByName("button");
        var listView = _back.getChildByName("listView");
        listView.setScrollBarOpacity(0);
        button.visible = false;
        var addItem = function(str,res){
            var item = button.clone();
            var text = item.getChildByName("text");
            if(text){
                text.setString(str);
            }
            if(res){
                item.loadTextureNormal(res);
            }
            item.visible = true;
            item.str = str
            listView.pushBackCustomItem(item);
            item.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    postEvent(that.data.event,{str:sender.str,res:res})
                    that.removeFromParent(true);
                }
            }, this);
        }

        if(data.list)
        {
            for (var i = 0; i < data.list.length; i++) {
                addItem(data.list[i],(data.resList ? data.resList[i] : null));
            }
            listView.height = data.list.length * button.height
            listView.setInnerContainerSize(cc.size(listView.getInnerContainerSize().width, data.list.length * button.height))
            _back.height = data.list.length * button.height
        }
        if(data.px){
            _back.setPositionX(data.px);
        }

        if(data.py){
            _back.setPositionY(data.py/*+button.height*/);
        }
        return true;
    }
});

/**
 * 选择分组
 * numberGroup整数返回index +1
 * others 负数返回index -1
 */
var friendcard_selectGroup = cc.Layer.extend({
    ctor:function (data) {
        this._super();
        var that = this;
        this.data = data;
        if (!this.data){
            this.data = [];
        }
        if (!this.data.numberGroup){
            this.data.numberGroup = 0;
        }
        if (!this.data.others){
            this.data.others = [];
        }
        if (!this.data.ignoreGroups){
            this.data.ignoreGroups = [];
        }
        cc.log("ignoreGroups",JSON.stringify(this.data.ignoreGroups))
        var totalGroupNames = [];
        for(var i = 0 ; i < this.data.numberGroup; i++){
            totalGroupNames.push((i+1));
        }
        this.groupNames = totalGroupNames.filter(
            function(v){ 
                return that.data.ignoreGroups.indexOf(v) == -1;
            }
        )

        var node = ccs.load("friendcard_selectGroup.json").node;
        this.addChild(node);
        COMMON_UI.setNodeTextAdapterSize(node);
        var that = this;
        this.back = node.getChildByName("Panel");
        this.block = node.getChildByName("Image_di")
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0],false);

        popupAnm(this.back)

        this.block.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent(true);
            }
        }, this);
        var close = this.back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent(true);
            }
        }, this);
        closeBtnAddLight(close);
        var scrollView = this.back.getChildByName("scrollView");

        var Button_item = this.back.getChildByName("scrollView").getChildByName("Button_item");
        Button_item.visible = false;

        if(FriendCard_Common.getSkinType() == 3){
            var paddingLeftAndRight = 35;
            Button_item.x = paddingLeftAndRight;
            scrollView.setScrollBarOpacity(76);
            var dx = (scrollView.width-Button_item.width*Button_item.scale - 2 * paddingLeftAndRight)/2;
        }else {
            var dx = (scrollView.width-Button_item.width*Button_item.scale)/2;
        }

        var totalNum = this.data.numberGroup - this.data.ignoreGroups.length + this.data.others.length;
        var height = (Math.floor(totalNum/3))*(20)+(Math.floor(totalNum/3)+1)*Button_item.height*Button_item.scale;
        Button_item.setPositionY(height);
        scrollView.setInnerContainerSize(cc.size(scrollView.getInnerContainerSize().width, height));

        for (var i = 0;i<totalNum;i++)
        {
            var button = Button_item.clone();
            button.visible = true;
            scrollView.addChild(button);
            button.x = Button_item.x + (i%3)*dx;

            if(FriendCard_Common.getSkinType() == 2)
            {
                button.y = Button_item.y - Math.floor(i/3)*(Button_item.height*Button_item.scale+10);
            }
            else
            {
                button.y = Button_item.y - Math.floor(i/3)*(Button_item.height*Button_item.scale+20);
            }
            var text = button.getChildByName("text");
            if(i < this.data.others.length)
            {
                text.setString(this.data.others[i]);
                button.groupType = (this.data.others[i]);
            }
            else
            {
                text.setString(this.groupNames[i- this.data.others.length]+"组");
                button.groupType = this.groupNames[i- this.data.others.length];
            }
            text.ignoreContentAdaptWithSize(true);

            button.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if(that.data && (that.data.event || that.data.callBackFunc)){
                        var returnData = {groupType:(sender.groupType+"")};
                        if (that.data.callBackFunc){
                            that.data.callBackFunc(returnData);
                        }else{
                            postEvent(that.data.event,returnData);
                        }

                    }
                    that.removeFromParent(true);
                }
            }, this);
        }
    }
});


/**
 * 统计-玩家统计-选择分组
 * 返回index
 */
var friendcard_selectGroupTJ = cc.Layer.extend({
    ctor:function (data,callbackFunc) {
        this._super();
        var that = this;
        this._data = data;
        if (!this._data){
            this._data = {};
            this._data.list = [];
        }
        
        var node = ccs.load("friendcard_selectGroupTJ.json").node;
        this.addChild(node);
        COMMON_UI.setNodeTextAdapterSize(node);
        var that = this;
        this.back = node.getChildByName("Panel");
        this.block = node.getChildByName("Image_di")
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0],false);

        popupAnm(this.back)

        this.block.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent(true);
            }
        }, this);
        var close = this.back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent(true);
            }
        }, this);
        closeBtnAddLight(close);

        this._listView = this.back.getChildByName("ListView");
        this._listView._cell = this.back.getChildByName("Cell");
        this._listView._cell.visible = false;

        var cell = this._listView._cell.clone();
        cell.visible = true;
        cell.visible = true;
        var text_1 = cell.getChildByName("Text_1");//助理编号
        var text_2 = cell.getChildByName("Text_2");//昵称
        var text_3 = cell.getChildByName("Text_3");//id
        var text_4 = cell.getChildByName("Text_4");//人数
        text_1.setString("全部分组");
        text_2.setString("全部分组");
        text_2.y = cell.height/2;
        text_3.setString("");
        text_4.setString(""+this._data.total);
        var button_sure = cell.getChildByName("Button_sure");
        button_sure._groupId = -1;
        button_sure.addTouchEventListener(function(sender,type){
            if(type == 2){
                if(callbackFunc){
                    callbackFunc(sender._groupId);
                    that.removeFromParent();
                }
            }
        })
        this._listView.pushBackCustomItem(cell);

        for(var i = 0 ; i < this._data.list.length;i++){
            var itemData = this._data.list[i];
            var cell = this._listView._cell.clone();
            cell.visible = true;
            var text_1 = cell.getChildByName("Text_1");//组别
            
            var text_2 = cell.getChildByName("Text_2");//昵称
            var text_3 = cell.getChildByName("Text_3");//id
            var text_4 = cell.getChildByName("Text_4");//人数
            if(!itemData.groupId){
                text_1.setString("未分组");
            }else{
                text_1.setString(""+itemData.groupId+"组");
            }
            text_2.setString(""+unescape(itemData.nickname));
            text_3.setString(""+itemData.userId);
            text_4.setString(""+itemData.cnt);

            var button_sure = cell.getChildByName("Button_sure");
            button_sure._groupId = itemData.groupId;
            button_sure.addTouchEventListener(function(sender,type){
                if(type == 2){
                    if(callbackFunc){
                        callbackFunc(sender._groupId);
                    }
                    that.removeFromParent();
                }
            })
            this._listView.pushBackCustomItem(cell);

        }
    }
});

/**
 * 统计-玩家统计-选择助理
 * 返回index
 */
var friendcard_selectZhuliTJ = cc.Layer.extend({
    ctor:function (data,callbackFunc) {
        this._super();
        var that = this;
        this._data = data;
        if (!this._data){
            this._data = {};
            this._data.list = [];
        }
        
        var node = ccs.load("friendcard_selectZhuliTJ.json").node;
        this.addChild(node);
        COMMON_UI.setNodeTextAdapterSize(node);
        var that = this;
        this.back = node.getChildByName("Panel");
        this.block = node.getChildByName("Image_di")
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0],false);

        popupAnm(this.back)

        this.block.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent(true);
            }
        }, this);
        var close = this.back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent(true);
            }
        }, this);
        closeBtnAddLight(close);

        this._listView = this.back.getChildByName("ListView");
        this._listView._cell = this.back.getChildByName("Cell");
        this._listView._cell.visible = false;

        var cell = this._listView._cell.clone();
        cell.visible = true;
        cell.visible = true;
        var text_1 = cell.getChildByName("Text_1");//助理编号
        var text_2 = cell.getChildByName("Text_2");//昵称
        var text_3 = cell.getChildByName("Text_3");//id
        var text_4 = cell.getChildByName("Text_4");//人数
        text_1.setString("全部");
        text_2.setString("本组全部成员");
        text_2.y = cell.height/2;
        text_3.setString("");
        text_4.setString(""+this._data.total);
        var button_sure = cell.getChildByName("Button_sure");
        button_sure._index = -1;
        button_sure.addTouchEventListener(function(sender,type){
            if(type == 2){
                if(callbackFunc){
                    callbackFunc(sender._index);
                    that.removeFromParent();
                }
            }
        })
        this._listView.pushBackCustomItem(cell);
        for(var i = 0 ; i < this._data.list.length;i++){
            var itemData = this._data.list[i];
            var cell = this._listView._cell.clone();
            cell.visible = true;
            var text_1 = cell.getChildByName("Text_1");//助理编号
            var text_2 = cell.getChildByName("Text_2");//昵称
            var text_3 = cell.getChildByName("Text_3");//id
            var text_4 = cell.getChildByName("Text_4");//人数

            text_1.setString(""+itemData.assistantNo);
            text_2.setString(""+unescape(itemData.nickname));
            text_3.setString(""+itemData.userId);
            text_4.setString(""+itemData.cnt);

            var button_sure = cell.getChildByName("Button_sure");
            button_sure._index  = i;
            button_sure.addTouchEventListener(function(sender,type){
                if(type == 2){
                    if(callbackFunc){
                        callbackFunc(sender._index);
                        that.removeFromParent();
                    }
                }
            })
            this._listView.pushBackCustomItem(cell);

        }
    }
});
/*
 *公告ui
 */

var friendcard_gonggao = cc.Layer.extend({
    ctor:function (data) {
        this._super();
        this.data = data;
        var node = ccs.load("friendcard_gonggao.json").node;
        this.addChild(node);
        COMMON_UI.setNodeTextAdapterSize(node);
        var that = this;
        this.back = node.getChildByName("Image_bg");
        this.block = node.getChildByName("Image_di");
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Image_bg"), [0.638, 0.604], [0.5, 0.53], [0, 0]);

        popupAnm(this.back)

        var isControl = false;
        if(FriendCard_Common.getClubisLM()){            
            isControl = data.isCreator
        }
        else{
            isControl = data.isManager;
        }
        this.block.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent(true);
            }
        }, this);
        var close = this.back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent(true);
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Gonggao_Guanbi", {uid:SelfUid()});
            }
        }, this);

        var Button_save = this.back.getChildByName("Button_save");
        Button_save.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (that.data && that.data.event){
                    postEvent(that.data.event,{gonggao:that.edit_content.getString()});
                }
                that.removeFromParent(true);
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Gonggao_Baocun", {uid:SelfUid()});

            }
        }, this);
        var setEditBoxConfig = function(_parent,_child,str,MaxLength) {
            _child.setFontColor(cc.color(0x2B, 0x34, 0x4D));
            if (MaxLength){
                _child.setMaxLength(MaxLength);
            }
            _child.setFontSize(24);
            _child.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            _child.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            _child.setFontName("fonts/lanting.TTF");
            _child.setPlaceHolder(str);
            _child.setPlaceholderFontSize(24);
            _child.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            _child.setPlaceholderFontColor(cc.color(0x2B, 0x34, 0x4D));
            _child.setPosition(_parent.getContentSize().width / 2, _parent.getContentSize().height / 2);
            _parent.addChild(_child);
        }.bind(this);

        this.img_di = this.back.getChildByName("img_di");
        if (!this.data || !isControl){
            this.img_di.setPositionY(this.img_di.getPositionY()-Button_save.height/2);
            this.img_di.height += Button_save.height;
        }
        var contentSize = this.img_di.getContentSize();
        contentSize.width -= 15;
        contentSize.height -= 15;
        this.edit_content = new cc.EditBox(contentSize,new cc.Scale9Sprite("friendCards/selecttime/touming.png"));
        setEditBoxConfig(this.img_di, this.edit_content,data && isControl?"最多可输入"+FriendCard_Common.FRIEND_NOTICE_MAX_LENGTH+"个字":"",null);


        this.editBoxEditingDidBegin = function (editBox) {
            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Gonggao_Bianji", {uid:SelfUid()});
        }.bind(this);
        this.editBoxEditingDidEnd = function (editBox) {

        }.bind(this);
        this.editBoxTextChanged = function (editBox, text ) {
            var result = stringLengthForMysql(editBox.getString(),FriendCard_Common.FRIEND_NOTICE_MAX_LENGTH * 3);
            if(result.len > FriendCard_Common.FRIEND_NOTICE_MAX_LENGTH * 3){
                editBox.setString(result.txt);
                MjClient.showToast("最多可输入"+FriendCard_Common.FRIEND_NOTICE_MAX_LENGTH+"个字");
            }
        }.bind(this);

        this.editBoxReturn = function (editBox) {
            cc.log("select time editBoxReturn");
        }.bind(this);
        this.edit_content.setDelegate(this);

        if (this.data && this.data.gonggao){
            this.edit_content.setString(unescape(this.data.gonggao)+"");
        }

        if(data && isControl){
            Button_save.visible = true;
            this.edit_content.enabled = true;
        }else{
            this.edit_content.enabled = false;
            Button_save.visible = false;
        }

        this.closeMe();
    },
    closeMe : function(){
        var that = this;
        var callFunc3 = cc.callFunc(function() {
            that.removeFromParent();
        })

        if(this.data.closeTime)
            this.runAction(cc.sequence(cc.delayTime(this.data.closeTime),callFunc3));
    },

    onExit: function () {
        if(FriendCard_Common.getSkinType() == 3 && MjClient.FriendCard_main_ui)
        {
            MjClient.FriendCard_main_ui.bottomBtnDelLight()
        }
        this._super();
    },
});

//俱乐部弹窗
var Friendcard_popUpMeg = cc.Layer.extend({
    ctor:function (uiPara) {
        this._super();
        uiPara = uiPara || {};
        if(uiPara.uiStyle){
            var msgui = ccs.load(uiPara.uiStyle+".json").node;
        }else{
            var msgui = ccs.load("friendcard_popUpMsg.json").node;
        }

        this.addChild(msgui);
        var _block = msgui.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);
        if(uiPara.canCanle)
        {
            _block.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        this.removeFromParent(true);
                        if(uiPara.close) uiPara.close();
                        break;
                    default :
                        break;
                }
            },this);
        }
        this.initPopUpMegUI(msgui, uiPara);

        var back_addFangka = msgui.getChildByName("back_addFangka");
        if (back_addFangka){
            back_addFangka.visible = false;
        }
        if (uiPara.code == -5) {
            this.initFangKaUI(msgui, uiPara);
            this._back_addFangka.visible = true;
            popupAnm(this._back_addFangka)
        } else {
            this._back.visible = true;
            popupAnm(this._back)
        }
        return true;
    },
    initPopUpMegUI: function(node,uiPara) {
        var _back = node.getChildByName("back");
        setWgtLayout(_back, [0.64, 0.78], [0.5, 0.5], [0, 0]);
        _back.visible = false;
        this._back = _back;

        var _no = _back.getChildByName("no");

        _no.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    this.removeFromParent(true);
                    if(uiPara.no) uiPara.no();
                    break;
                default :
                    break;
            }
        },this);

        var btn_close = _back.getChildByName("btn_close");
        btn_close.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    this.removeFromParent(true);
                    if(uiPara.close) uiPara.close();
                    break;
                default :
                    break;
            }
        },this);

        var _msg = _back.getChildByName("msg");

        if("msgHorizontalAlignment" in uiPara){
            _msg.setTextHorizontalAlignment(uiPara.msgHorizontalAlignment);
        }

        if(uiPara.msgFontSize){
            _msg.setFontSize(uiPara.msgFontSize);
        }
        _msg.setString("" + uiPara.msg ? uiPara.msg :"");

        var msg_red = _back.getChildByName("msg_red");
        if(msg_red){
            msg_red.setString("" + uiPara.msgRed ? uiPara.msgRed :"");
        }
        var msg_red2 = _back.getChildByName("msg_red2");
        if(msg_red2){
            msg_red2.setString("" + uiPara.msgRed2 ? uiPara.msgRed2 :"");
        }
        var _yes = _back.getChildByName("yes");
        _yes.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    this.removeFromParent(true);
                    if(uiPara.yes) uiPara.yes();
                    break;
                default :
                    break;
            }
        },this);
        //倒计时
        var timeCanClickYesNode = _yes.getChildByName("time");
        var image_time_bg = _back.getChildByName("Image_time_bg");
        if(!timeCanClickYesNode){
            if(image_time_bg){
                timeCanClickYesNode = image_time_bg.getChildByName("time");
            }
        }
        if(timeCanClickYesNode){
            timeCanClickYesNode.ignoreContentAdaptWithSize(true);
            var showTime = (uiPara.showTime || uiPara.showTime === 0) ? uiPara.showTime : 3;
            if(showTime <= 0){
                timeCanClickYesNode.setVisible(false);
                if(image_time_bg){
                    image_time_bg.visible = false;
                }
                _yes.setEnabled(true);
                _yes.unscheduleAllCallbacks();
            }else{
                timeCanClickYesNode.setString(""+showTime);
                timeCanClickYesNode.setVisible(true);
                if(image_time_bg){
                    image_time_bg.visible = true;
                }
                timeCanClickYesNode.ignoreContentAdaptWithSize(true);
                _yes.setEnabled(false);
                timeCanClickYesNode.schedule(function() {
                    if (showTime == 0) {
                        timeCanClickYesNode.setVisible(false);
                        if(image_time_bg){
                            image_time_bg.visible = false;
                        }
                        _yes.setEnabled(true);
                        _yes.unscheduleAllCallbacks();
                    }
                    showTime --;
                    timeCanClickYesNode.setString(""+showTime);
                }, 1);
            }
            
        }
        if(!!uiPara.no)
        {
            _no.visible = true;
        }
        else
        {
            _no.visible = false;
            _yes.x = _msg.x
        }

        if(!!uiPara.close)
        {
            btn_close.visible = true;
        }
        else
        {
            btn_close.visible = false;
        }

        return true;
    },
    initFangKaUI: function(node, uiPara) {
        var back_addFangka = node.getChildByName("back_addFangka");
        if (!back_addFangka) return;
        this._back_addFangka = back_addFangka;
        setWgtLayout(back_addFangka, [0.64, 0.78], [0.5, 0.5], [0, 0]);
        back_addFangka.visible = false;

        var btn_close = back_addFangka.getChildByName("btn_close")
        btn_close.addTouchEventListener(function(sender, type) {
            if (type === 2) {
                this.removeFromParent();
            }
        }, this);

        var _msg = back_addFangka.getChildByName("msg");
        if (uiPara.message) {
            _msg.setString(uiPara.message);
        }

        var btn_addFK = back_addFangka.getChildByName("btn_addFK");
        btn_addFK.addTouchEventListener(function(sender, type) {
            if (type === 2 && needFkData) {
                var itagID = needFkData.id;

                if (!MjClient.systemConfig || !MjClient.systemConfig.recharge) {
                    return MjClient.showToast("获取支付数据失败");
                }
                if (MjClient.systemConfig.recharge.length > 1) {
                    MjClient.Scene.addChild(new payWayLayer(function(platform) {
                        MjClient.recharge(itagID, parseInt(platform));
                    }, "fangka"));
                } else {
                    MjClient.recharge(itagID, parseInt(MjClient.systemConfig.recharge[0].platform))
                }
                this.removeFromParent();
            }
        }, this);

        var btn_moreSel = back_addFangka.getChildByName("btn_moreSel");
        btn_moreSel.addTouchEventListener(function(sender, type) {
            if (type === 2) {
                var layer = enter_store(1);
                MjClient.Scene.addChild(layer);
                this.removeFromParent();
            }
        }, this);

        var text_needFK = btn_addFK.getChildByName("text");
        text_needFK.setString(" ")
        text_needFK.ignoreContentAdaptWithSize(true);

        var needFkData = null;
        var callback = function() {
            if(!cc.sys.isObjectValid(text_needFK)){
                return;
            }
            var needFK = uiPara.data - MjClient.data.pinfo.fangka;
            for (var i = 0; i < MjClient.rechargeLadderFangka.length; i++) {
                var fangkaData = MjClient.rechargeLadderFangka[i];
                if ((fangkaData.money >= needFK) || (i + 1 == MjClient.rechargeLadderFangka.length)) {
                    needFkData = fangkaData;
                    break;
                }
            }
            if (needFkData)
                text_needFK.setString(needFkData.money.toString())
        }

        if (!MjClient.rechargeLadderFangka)
            MjClient.getFangkaRechargeLadder(callback);
        else
            callback();
    },
});

//俱乐部绑定弹窗
var Friendcard_bindingCodeLayer = cc.Layer.extend({
    _textFeildName:null,
    ctor: function (data,comfirmCallback) {
        this._super();
        var UI = ccs.load("friendcard_bindingCodeLayer_tipss.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.638, 0.604],[0.5,0.53],[0,0]);

        popupAnm(_back)


        var _name = _back.getChildByName("name");
        _name.ignoreContentAdaptWithSize(true);
        if(data.nickname)
        {
            var _nameStr = unescape(data.nickname);
            _name.setString(getNewName(_nameStr,11));
            _name.setFontName("Arial");
            _name.setFontSize(_name.getFontSize());
        }


        var _ID = _back.getChildByName("ID");
        _ID.ignoreContentAdaptWithSize(true);
        if(data.gameId)
        {
            _ID.setString("ID: " + data.gameId);
        }

        var _yaoqingma = _back.getChildByName("yaoqingma");
        _yaoqingma.ignoreContentAdaptWithSize(true);
        if(data.memberId)
        {
            _yaoqingma.setString("邀请码: " + data.memberId);
        }

        var _headImg = _back.getChildByName("headImg");
        var _headImgContentSize = _headImg.getContentSize();

        //显示头像
        var url = data.avatar;
        if(!url) url="png/default_headpic.png";
        MjClient.loadImgQX(url, {isCrossOrigin : true}, function(err, texture)
        {
            if(!err&&texture&&cc.sys.isObjectValid(_headImg))
            {
                if(FriendCard_Common.getSkinType() == 3 || FriendCard_Common.getSkinType() == 4){
                    var headSprite = new cc.Sprite(texture);
                    var clippingNode = new cc.ClippingNode();
                    var mask = new cc.Sprite("friendCards/common/headMask1.png");
                    clippingNode.setAlphaThreshold(0);
                    clippingNode.setStencil(mask);

                    headSprite.setScale(mask.getContentSize().width/headSprite.getContentSize().width);
                    clippingNode.addChild(headSprite);
                    clippingNode.setScale(0.999);

                    clippingNode.setPosition(_headImg.getContentSize().width/2,_headImg.getContentSize().height/2)

                    var hideblock = new cc.Sprite("friendCards/common/head_kuang1.png");
                    hideblock.setPosition(_headImg.getContentSize().width / 2, _headImg.getContentSize().height / 2);
                    _headImg.addChild(clippingNode);
                    _headImg.addChild(hideblock);
                }
                else
                {
                    var clippingNode = new cc.ClippingNode();
                    var mask = new cc.Sprite("home/zhezhao.png");
                    clippingNode.setAlphaThreshold(0);
                    clippingNode.setStencil(mask);
                    var img = new cc.Sprite(texture);
                    img.setScale(mask.getContentSize().width / img.getContentSize().width);
                    clippingNode.addChild(img);
                    clippingNode.setScale(0.98);

                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ)
                        clippingNode.setPosition(_headImg.getContentSize().width / 2, _headImg.getContentSize().height / 2);
                    else if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG)
                        clippingNode.setPosition(_headImg.getContentSize().width / 2 - 8, _headImg.getContentSize().height / 2 - 8);
                    else
                        clippingNode.setPosition(_headImg.getContentSize().width / 2, _headImg.getContentSize().height / 2);
                    
                    //遮罩框
                    var hideblock = new cc.Sprite("home/homeHeadCusPic.png");
                    hideblock.setPosition(hideblock.getContentSize().width / 2, hideblock.getContentSize().height / 2);
                    _headImg.addChild(clippingNode);
                    _headImg.addChild(hideblock);
                }

            }
        });



        var _Button_sure = _back.getChildByName("Button_sure");
        _Button_sure.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (comfirmCallback)
                    comfirmCallback();
                that.removeFromParent();
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Bangding_Sure", {uid:SelfUid()});
            }
        },this);

        var _Button_cancel = _back.getChildByName("Button_cancel");
        _Button_cancel.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Bangding_Quxiao", {uid:SelfUid()});
            }
        }, this);

        var btn_close = _back.getChildByName("btn_close");
        if(btn_close)
        {
            btn_close.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.removeFromParent();
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Bangding_Close", {uid:SelfUid()});
                }
            }, this);
        }


        var tempX = _Button_sure.x;
        var tempY = _Button_sure.y;
        _Button_sure.x = _Button_cancel.x;
        _Button_sure.y = _Button_cancel.y;
        _Button_cancel.x = tempX;
        _Button_cancel.y = tempY;
    },

    onExit: function () {
        if(FriendCard_Common.getSkinType() == 3 && MjClient.FriendCard_main_ui)
        {
            MjClient.FriendCard_main_ui.bottomBtnDelLight()
        }

        this._super();
    },
});

//显示房间信息弹窗
var Friendcard_roomInfoDialog = cc.Layer.extend({
    ctor:function (data,room) {
        this._super();
        var that = this;
        this.data = data;
        this.ruleIndex = room.ruleIndex;
        var msgui = ccs.load("friendcard_roomInfoDialog.json").node;
        this.addChild(msgui);
        var _block = msgui.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);
        COMMON_UI.setNodeTextAdapterSize(msgui);

        this.roomDeleteDialog = msgui.getChildByName("roomDeleteDialog");
        setWgtLayout(this.roomDeleteDialog,[1,1],[0.5,0.5],[0,0]);
        this.roomDeleteDialog.visible = false;

        this.panel = msgui.getChildByName("Panel");
        setWgtLayout(this.panel,[1,1],[0.5,0.5],[0,0]);
        popupAnm(this.panel);
        if(FriendCard_Common.getSkinType() == 4){
            var textRuleName = this.panel.getChildByName("Item_title").getChildByName("Text_game");
            var ruleName = unescape(data.info.ruleName);
            textRuleName.setString(ruleName+"");
            var textRoomNumber = this.panel.getChildByName("Item_title").getChildByName("Text_number");
            textRoomNumber.setString(data.info.vipTable + "");
        }else{
            var textRuleName = this.panel.getChildByName("bgTitle").getChildByName("Text");
            var ruleName = unescape(data.info.ruleName);
            if (ruleName.length >= 6) {
                var curFontSize = textRuleName.getFontSize();
                textRuleName.setFontSize(curFontSize -10);
            }
            textRuleName.setString(ruleName + data.info.vipTable + "");
        }
        
        var itemLength = Math.max(data.info.maxPlayer,data.players.length);
        this.Item = this.panel.getChildByName("Item");
        this.Item.visible = false;

        if(FriendCard_Common.getSkinType() == 4){
            var listView = this.panel.getChildByName("ListView");
            for(var i = 0 ; i < itemLength;i++){
                var item = this.Item.clone();
                item.visible = true;
                listView.addChild(item);
                var playerData = data.players[i];
                if(!playerData){
                    var children = item.getChildren();
                    for(var j = 0; j < children.length; j++){
                        children[j].visible = false;
                    }
                    continue;
                }
                var imgHead = item.getChildByName("Image_head");
                imgHead.isMask = true;
                that.refreshHead(playerData.headimgurl ? playerData.headimgurl : "png/default_headpic.png", imgHead);

                var textName = item.getChildByName("Text_nickname");
                textName.setString(getPlayerName(unescape(playerData.nickname)));

                var textScore = item.getChildByName("Text_score");
                if (!data.tState || (data.tState != TableState.waitJoin && data.tState != TableState.waitReady)){
                    if(playerData.winall > 0){
                        textScore.setString("+" + playerData.winall);
                        textScore.setColor(cc.color("#ab3215"));
                    }
                    else{
                        textScore.setString("" + playerData.winall);
                        textScore.setColor(cc.color("#0b9500"));
                    }
                }else if (data.tState && data.tState == TableState.waitReady)
                    textScore.setString(playerData.status == TableState.isReady ? "准备" : "");
                else{
                    textScore.setString("");
                }

                var textAdminName = item.getChildByName("Text_admin");//会长昵称
                if (playerData.clubCreatorName) {
                    textAdminName.setString(getPlayerName(unescape(playerData.clubCreatorName)));
                    textAdminName.visible = true;
                }else{
                    textAdminName.visible = false;
                }

                var textGroup = item.getChildByName("Text_group");
                if (playerData.groupId >= 0) {
                    var _Id = playerData.groupId == 0? "未分组": (playerData.groupId +"组");
                    var str = _Id;
                    if(playerData.assistantNo){
                        str = _Id + "(" + playerData.assistantNo + ")";
                    }
                    textGroup.setString(str);
                    textGroup.visible = true;
                }else{
                    textGroup.visible = false;
                }

                var imgOnLine = item.getChildByName("Image_online");
                var textOutLineTime = item.getChildByName("Text_outline_time");
                var imgOutLine = item.getChildByName("Image_outline");
                if (playerData.offTime) {
                    var offTime = Math.floor(playerData.offTime/1000);
                    var seconds = offTime % 60; offTime = Math.floor(offTime/60);
                    var minute = offTime % 60; offTime = Math.floor(offTime/60);
                    var hour = offTime % 60; offTime = Math.floor(offTime/24);
                    if (offTime > 0){
                        textOutLineTime.setString("离线大于24小时");
                    }
                    else{
                        textOutLineTime.setString("离线" + (hour > 10 ? hour : "0" + hour) + ":" + (minute > 10 ? minute : "0" + minute) + ":" + (seconds > 10 ? seconds : "0" + seconds));
                    }
                    imgOnLine.visible = false;
                    imgOutLine.visible = true;
                    textOutLineTime.visible = true;
                }else{
                    imgOnLine.visible = true;
                    imgOutLine.visible = false;
                    textOutLineTime.visible = false;
                }

                var textPutCardStatus = item.getChildByName("Text_putcard_status");
                if(playerData.isOperate){
                    textPutCardStatus.setTextColor(FriendCard_Common.getTextColor().red);
                    textPutCardStatus.setString("等待操作");
                }else{
                    textPutCardStatus.setTextColor(FriendCard_Common.getTextColor().black);
                    textPutCardStatus.setString("/");
                }
            }
        }else{
           var imgKuang = this.panel.getChildByName("Image_kuang");
            this.LeftPanel = this.panel.getChildByName("LeftPanel");
            this.LeftPanel.visible = false;
            var leftPanel = this.LeftPanel.clone();
            var dx = leftPanel.width;
            if(itemLength <= 4){
                dx = leftPanel.width * 1.5;
            }
            leftPanel.visible = true;
            leftPanel.setPosition(dx/2 - leftPanel.width/2,imgKuang.height);
            var imgLine = leftPanel.getChildByName("Image_line");
            imgLine.x = leftPanel.width/2+dx/2;
            imgKuang.addChild(leftPanel);
            var itemWidth =  (imgKuang.width - dx)/itemLength; 
            for(var i = 0 ; i < itemLength;i++){
            var item = this.Item.clone();
            item.visible = true;
            var leftWidth = i * itemWidth;
            var centerPosX = itemWidth/2 - item.width/2;
            item.x = dx + leftWidth + centerPosX;
            item.y = imgKuang.height;
            var imgLine = item.getChildByName("Image_line");
            imgLine.x = item.width/2+itemWidth/2;
            imgKuang.addChild(item);
            
            var playerData = data.players[i];
            if(!playerData){
                var children = item.getChildren();
                for(var j = 0; j < children.length; j++){
                    if(children[j].name != "Image_line"){
                        children[j].visible = false;
                    }else{
                        children[j].visible = true;
                    }
                }
                continue;
            }
            var imgHead = item.getChildByName("Image_head");
            imgHead.isMask = true;
            that.refreshHead(playerData.headimgurl ? playerData.headimgurl : "png/default_headpic.png", imgHead);

            var textName = item.getChildByName("Text_nickname");
            textName.setString(getPlayerName(unescape(playerData.nickname)));

            var textScore = item.getChildByName("Text_score");
            if (!data.tState || (data.tState != TableState.waitJoin && data.tState != TableState.waitReady)){
                if(playerData.winall > 0){
                    textScore.setString("+" + playerData.winall);
                    textScore.setColor(cc.color("#ab3215"));
                }
                else{
                    textScore.setString("" + playerData.winall);
                    textScore.setColor(cc.color("#0b9500"));
                }
            }else if (data.tState && data.tState == TableState.waitReady)
                textScore.setString(playerData.status == TableState.isReady ? "准备" : "");
            else{
                textScore.setString("");
            }

            var textAdminName = item.getChildByName("Text_admin");//会长昵称
            if (playerData.clubCreatorName) {
                textAdminName.setString(getPlayerName(unescape(playerData.clubCreatorName)));
                textAdminName.visible = true;
            }else{
                textAdminName.visible = false;
            }

            var textGroup = item.getChildByName("Text_group");
            if (playerData.groupId >= 0) {
                var _Id = playerData.groupId == 0? "未分组": (playerData.groupId +"组");
                var str = _Id;
                if(playerData.assistantNo){
                    str = _Id + "(" + playerData.assistantNo + ")";
                }
                textGroup.setString(str);
                textGroup.visible = true;
            }else{
                textGroup.visible = false;
            }

            var imgOnLine = item.getChildByName("Image_online");
            var textOutLineTime = item.getChildByName("Text_outline_time");
            var imgOutLine = item.getChildByName("Image_outline");
            if (playerData.offTime) {
                var offTime = Math.floor(playerData.offTime/1000);
                var seconds = offTime % 60; offTime = Math.floor(offTime/60);
                var minute = offTime % 60; offTime = Math.floor(offTime/60);
                var hour = offTime % 60; offTime = Math.floor(offTime/24);
                if (offTime > 0){
                    textOutLineTime.setString("离线大于24小时");
                }
                else{
                    textOutLineTime.setString("离线" + (hour > 10 ? hour : "0" + hour) + ":" + (minute > 10 ? minute : "0" + minute) + ":" + (seconds > 10 ? seconds : "0" + seconds));
                }
                imgOnLine.visible = false;
                imgOutLine.visible = true;
                textOutLineTime.visible = true;
            }else{
                imgOnLine.visible = true;
                imgOutLine.visible = false;
                textOutLineTime.visible = false;
            }

            var textPutCardStatus = item.getChildByName("Text_putcard_status");
            if(playerData.isOperate){
                textPutCardStatus.setTextColor(FriendCard_Common.getTextColor().red);
                textPutCardStatus.setString("等待操作");
            }else{
                textPutCardStatus.setTextColor(FriendCard_Common.getTextColor().black);
                textPutCardStatus.setString("/");
            }
        }
        }
        
        

        var delRoomBtn = this.panel.getChildByName("btn_delRoom");
        var isStart = data.players.length == data.info.maxPlayer || room.roundNum > 0;
        delRoomBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chakanfangjianxinxi_Jiesanfangjian", {uid:SelfUid()});
                this.panel.visible = false;
                if (isStart)
                    that.showRoomDeleteDialog(data);
                else
                    that.requestDissolveRoom(data.info.vipTable);
            }
        }, this);

        var intoRoomBtn = this.panel.getChildByName("btn_intoRoom");
        intoRoomBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
                cc.log("进入游戏:roomNum=" + data.info.vipTable);
                MjClient.joinGame(data.info.vipTable, null,false,this.data.info.gameType);
            }
        }, this);

        var shareRoomBtn = this.panel.getChildByName("btn_shareRoom");
        shareRoomBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
                cc.log("分享游戏:roomNum=" + data.info.vipTable);
                this.shareRoom(data);
            }
        }, this);

        this.panel.addTouchEventListener(function(sender, Type) {
            if (Type == 2) {
                this.removeFromParent(true);
            }
        }, this);
        var closeBtn = this.panel.getChildByName("Button_close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);

        intoRoomBtn.setVisible(!isStart);
        shareRoomBtn.setVisible(!isStart);

        return true;
    },
    refreshHead: function(url, head) {
        head.needScale = 8;
        COMMON_UI.refreshHead(this, url, head);
    },
    shareRoom: function(data) {
        var _urlStr = MjClient.remoteCfg.entreRoomUrl + "?vipTable=" + data.info.vipTable + (data.info.leagueId ? "&leagueId=":"&clubId=") + data.info.clubId + "&ruleId=" + this.ruleIndex;
        var contentStr = "" + "速度加入【" + AppCnName[MjClient.getAppType()] + "】";
        var needCount = data.info.maxPlayer - data.players.length;
        var titleStr = GameCnName[data.info.gameType] + " " + data.info.vipTable + " 缺" + needCount + "人" + " 点击加入>>>亲友圈(" + data.info.clubId + ")";

        MjClient.shareUrlToMultiPlatform(_urlStr, titleStr, contentStr);
    },
    showRoomDeleteDialog: function(data) {
        var dialog = this.roomDeleteDialog;
        dialog.setVisible(true);
        var bg = dialog

        var that = this;
        var delRoomBtn = bg.getChildByName("btn_delRoom");
        delRoomBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.requestDissolveRoom(data.info.vipTable);
                this.removeFromParent();
            }
        }, this);

        var btn_close = bg.getChildByName("btn_close");
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);

        var cancelBtn = bg.getChildByName("btn_cancel");
        cancelBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true);
            }
        }, this);

        dialog.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true);
            }
        }, this);

        delRoomBtn.setEnabled(false);
        var timeLabel = delRoomBtn.getChildByName("time");
        var time = 3;
        timeLabel.loadTexture("friendCards/roomInfo/img_" + time + ".png");;
        timeLabel.setVisible(true);
        timeLabel.ignoreContentAdaptWithSize(true);
        delRoomBtn.schedule(function() {
            if (time == 0) {
                timeLabel.setVisible(false);
                delRoomBtn.setEnabled(true);
                delRoomBtn.unscheduleAllCallbacks();
            }
            time --;
            timeLabel.loadTexture("friendCards/roomInfo/img_" + time + ".png");;
        }, 1);
    },
    requestDissolveRoom: function(roomNum) {
        var that = this;
        MjClient.block();
        var jiekouName = "pkplayer.handler.clubDissolveRoom"
        if(FriendCard_Common.getClubisLM())
        {
            jiekouName = "pkplayer.handler.leagueDissolveRoom"
        }
        MjClient.gamenet.request(jiekouName, {
            roomNum: roomNum
        }, function(rtn) {
            MjClient.unblock();

            if (rtn.code != 0)
            {
                FriendCard_Common.serverFailToast(rtn);
            }
            if(cc.sys.isObjectValid(that))
                that.removeFromParent();

        });
        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Zhujiemian_Chakanfangjianxinxi_jiesanfangjian", {uid: SelfUid()});
    },
});


//俱乐部提示界面弹窗
// showIndex = 99 岳阳的提示界面
// showIndex = 2 提示自主创房界面
// showIndex = 1 提示邀请人员界面
var Friendcard_guideLayer = cc.Layer.extend({
    ctor:function (showIndex,data,ruleIndex) {
        this._super();
        var that = this;
        this.data = data;
        this.clubId = data.info.clubId;
        this.ruleIndex = ruleIndex;

        var node = ccs.load("friendcard_guideLayer.json").node;
        this.addChild(node);
        MjClient.FriendCard_guideLayer = this;

        if(FriendCard_Common.getSkinType() == 1)
        {
            this.initSkinType1(node,showIndex,data);
        }
        else if(FriendCard_Common.getSkinType() == 2)
        {
            this.initSkinType2(node);
        }
        else if(FriendCard_Common.getSkinType() == 3)
        {
            this.initSkinType3(node)
        }else if(FriendCard_Common.getSkinType() == 4)
        {
            this.initSkinType4(node)
        }
    },
    initSkinType1:function(node,showIndex,data)
    {
        var _block = node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);
        this._block = _block;
        this.guideLayer = node.getChildByName("guideLayer");
        setWgtLayout(this.guideLayer,[1,1],[0.5,0.5],[0,0]);
        this.guideLayer.visible =false;
        this.adaptation(this.guideLayer);

        this.guideLayer1 = node.getChildByName("guideLayer1");
        setWgtLayout(this.guideLayer1,[1,1],[0.5,0.5],[0,0]);
        this.guideLayer1.visible = false;
        this.adaptation(this.guideLayer1);

        if(showIndex == 1)
        {
            this.guideLayer.visible = true;
        }
        else if(showIndex == 2 && !MjClient.FriendCard_infoUI)
        {
            this.guideLayer1.visible = true;
        }

        this.initGuideLayer();
        this.initGuideLayer1();
    },
    initSkinType2:function(node)
    {
        var _block = node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);
        this._block = _block;

        var _back = node.getChildByName("back");
        this.guideLayer_guize = _back.getChildByName("guideLayer_guize");
        this.guideLayer_zhuozi = _back.getChildByName("guideLayer_zhuozi");
        this.guideLayer_nvguanjia = _back.getChildByName("guideLayer_nvguanjia");
        this.adaptation(_back);
        setWgtLayout(_back,[1,1],[0.5,0.5],[0,0],true);


        this._back = _back;

        this.guideLayer_guize.visible =true;

        this.guideLayer_guize.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.guideLayer_guize.visible = false;
                this.guideLayer_zhuozi.visible = true;
                this.guideLayer_nvguanjia.visible = false;
            }
        }, this);


        this.guideLayer_zhuozi.visible = false;
        this.guideLayer_zhuozi.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(MjClient.data.pinfo.uid == this.data.info.creator)
                {
                    this.guideLayer_guize.visible = false;
                    this.guideLayer_zhuozi.visible = false;
                    this.guideLayer_nvguanjia.visible = true;
                }
                else
                {
                    this.removeFromParent();
                }
            }
        }, this);

        this.guideLayer_nvguanjia.visible = false;
        this.guideLayer_nvguanjia.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);
    },
    initSkinType3:function(node)
    {
        var _block = node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);
        this._block = _block;

        var _back = node.getChildByName("back");
        this.guideLayer_1 = _back.getChildByName("guideLayer_1");
        this.guideLayer_2 = _back.getChildByName("guideLayer_2");
        this.adaptation(_back);
        setWgtLayout(_back,[1,1],[0.5,0.5],[0,0],true);


        this._back = _back;

        this.guideLayer_1.visible = true;
        this.guideLayer_1.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(this.data.isManager)
                {
                    this.guideLayer_1.visible = false;
                    this.guideLayer_2.visible = true;
                }
                else
                {
                    this.removeFromParent();
                }
            }
        }, this);

        this.guideLayer_2.visible = false;
        this.guideLayer_2.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);
    },
    initSkinType4:function(node){
        var _block = node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);
        this._block = _block;

        var _back = node.getChildByName("back");
        this.guideLayer_1 = _back.getChildByName("guideLayer_1");
        this.adaptation(_back);
        setWgtLayout(_back,[1,1],[0.5,0.5],[0,0],true);

        this._back = _back;

        this.guideLayer_1.visible = true;
        this.guideLayer_1.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);
    },
    showGuideLayer1:function(){
        this._block.visible = true;
        this.guideLayer1.visible = true;
    },
    initGuideLayer:function()
    {
        var that = this;
        this.guideLayer.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);

        var btn_member = this.guideLayer.getChildByName("btn_member")
        btn_member.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.FriendCard_main_ui.addChild(new FriendCard_member(that.data.info));
                this.removeFromParent();
            }
        }, this);

        var btn_yaoqing = this.guideLayer.getChildByName("btn_yaoqing")
        btn_yaoqing.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.FriendCard_main_ui.addChild(new FriendCard_yaoqing(that.data, that.ruleIndex));
                this.removeFromParent();
            }
        }, this);
    },

    initGuideLayer1:function()
    {
        var that = this;
        var btn_privacyRoom = this.guideLayer1.getChildByName("btn_privacyRoom");
        var image_line1 = this.guideLayer1.getChildByName("Image_line1");
        btn_privacyRoom.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                postEvent("createRoom", {
                    IsFriendCard: true,
                    isCreateRoom: true,
                    clubId: that.clubId,
                    ruleId: that.ruleIndex,
                    info: that.data.info["rule" + that.ruleIndex],
                    isMatch:(that.data.info.matchIsOpen & 2),
                    isAntiAddictionMode:(that.data.info.isOpenAntiAddiction & 1),
                });
                this.removeFromParent();
            }
        }, this);

        this.guideLayer1.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);

        if(isIPhoneX())
        {
            btn_privacyRoom.x = this.guideLayer1.width - btn_privacyRoom.width/2 - 40 -btn_privacyRoom.width;
            image_line1.x = btn_privacyRoom.x
        }
    },
    adaptation: function(back) {    // 自适应显示
        if (MjClient.size.width / MjClient.size.height > back.width / back.height) {
            var a = (MjClient.size.width / MjClient.size.height) / (back.width / back.height);
            back.width *= a;

            if(FriendCard_Common.getSkinType() != 1)
            {
                for (var i = 0; i < back.children.length; i++) {
                    back.children[i].width *= a;
                    back.children[i].x = back.width/2 ;
                }
            }
        } else {
            var a = (back.width / back.height) / (MjClient.size.width / MjClient.size.height);
            back.height *= a;

            if(FriendCard_Common.getSkinType() != 1)
            {
                for (var i = 0; i < back.children.length; i++) {
                    back.children[i].height *= a;
                    back.children[i].y = back.height/2 ;
                }
            }
        }


    },

});


// 亲友圈-进入房间选择规则界面   岳阳，永州系列
var Friendcard_ruleSelectDialog = cc.Layer.extend({
    ctor:function (data) {
        this._super();
        this.data = data;

        var node = ccs.load("friendcard_ruleSelectDialog.json").node;
        this.addChild(node);
        this.node = node;
        this.back = node.getChildByName("Panel");
        this.block = node.getChildByName("Image_di");
        
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0]);

        var close = this.back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);

        this._listView = this.back.getChildByName("ListView");
        popupAnm(this.back);

        if(FriendCard_Common.getSkinType() == 2){
            closeBtnAddLight(close)
        }
        this.filterRuleList();
        this.initLayer();
    },
    filterRuleList:function(){
        return;
        var keyQuickGamesWitch = FriendCard_Common.LocalKey.quickGameSwitch + FriendCard_Common.getClubInfo().clubId;
        var quickStartListLocalSwitch = util.localStorageEncrypt.getStringItem(keyQuickGamesWitch,"");
        if(!quickStartListLocalSwitch || quickStartListLocalSwitch == ""){
            quickStartListLocalSwitch = {};
        }else{
            quickStartListLocalSwitch = JSON.parse(quickStartListLocalSwitch)
        }
        var length = this.data.ruleList.length;
        for(var i = length -1; i >= 0 ; i--){
            var ruleData = this.data.ruleList[i];
            ruleData._showNum = (i+1)
            if(ruleData._index.toString() in quickStartListLocalSwitch){
                if(!quickStartListLocalSwitch[ruleData._index.toString()]){
                    this.data.ruleList.splice(i,1);
                }                
            }
        }
    },
    initLayer:function(){

        var _cell = this.back.getChildByName("cell");
        _cell.visible = false;
        var length = this.data.ruleList.length;
        var rowLength = 2;
        for (var i = 0; i < length; i++) {
            var rule = this.data.ruleList[i];
            if(i % rowLength == 0){
                var cell = _cell.clone();
                cell.visible = true;
                for(var j = 0 ; j < rowLength; j++){
                    cell.getChildByName("item"+j).visible = false;
                }
                this._listView.pushBackCustomItem(cell);
            }else{
                var cell = this._listView.getItems()[Math.floor(i/rowLength)];
            }
            var item = cell.getChildByName("item"+i%rowLength);
            this.createItem(item,rule,i);
            item._index = rule._index;
            item.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    if(this.data.callFunc)
                    {
                        this.data.callFunc(sender._index);
                    }
                    this.removeFromParent();
                }
            }, this);
        }

    },
    createItem: function(item, itemData, i) {
        var text_wanfaNum = item.getChildByName("text_wanfaNum")
        var text_ruleName = item.getChildByName("text_ruleName")
        var text_ruleDesc = item.getChildByName("text_ruleDesc")
        var btn_setRule = item.getChildByName("btn_setRule")

        var guizeStr = stringDBCtoSBC(unescape(itemData.ruleDesc));
        text_ruleDesc.setString(guizeStr);
        text_ruleDesc.runAction(cc.sequence(cc.DelayTime(0.01), cc.callFunc(function() {
            //text_ruleDesc.setString(guizeStr);
            var i = 0;
            while (text_ruleDesc.getVirtualRenderer().getStringNumLines() > 3) {
                i++;
                text_ruleDesc.setString(guizeStr.substring(0, guizeStr.length - i) + "...");
            }
        })));
        text_wanfaNum.setString("玩法" + itemData._showNum + ":");
        text_ruleName.setFontSize(25);
        text_ruleName.setString(unescape(itemData.ruleName));
        
        item.visible = true;

        return item
    },
    onExit: function () {
        if(FriendCard_Common.getSkinType() == 3 && MjClient.FriendCard_main_ui)
        {
            MjClient.FriendCard_main_ui.bottomBtnDelLight()
        }
        this._super();
    },
});

//弹窗由小到大的效果。
var popupAnm = function(node)
{
    var _currentScale = node.getScale();
    node.setScale(0);
    node.runAction(cc.scaleTo(0.2,_currentScale).easing(cc.easeBackOut()));
}

//关闭按钮增加光。
var closeBtnAddLight = function(closeBtn)
{
    if(FriendCard_Common.getSkinType() == 2)
    {
        suiziAni(closeBtn);
    }
    else if(FriendCard_Common.getSkinType() == 3)
    {

    }
    else if(FriendCard_Common.getSkinType() == 1)
    {
        var img_zi = new cc.Sprite("friendCards/common/btn_close1_guang.png");
        closeBtn.addChild(img_zi, -1);
        img_zi.setPosition(cc.p(closeBtn.width / 2, closeBtn.height / 2))
        img_zi.runAction(cc.sequence(cc.fadeOut(1), cc.fadeIn(1)).repeatForever());
    }
}

var suiziAni = function(closeBtn,angle)
{
    if(!angle) angle = 4;

    var suizi = closeBtn.getParent().getChildByName("suizi")
    if(closeBtn)
    {
        closeBtn.ignoreContentAdaptWithSize(true);
        //closeBtn.setContentSize(155.00,145.00);

        var path = "hall/homeEffect/tanchaunghudie";
        var skyfly = COMMON_UI.creatFrameAni(path,"honghudie_",9);
        skyfly.setPosition(closeBtn.getContentSize().width*0.3,closeBtn.getContentSize().height*0.7);
        closeBtn.addChild(skyfly);

        var starParticle1 =  new cc.ParticleSystem("Particle/close.plist");
        starParticle1.setPosition(closeBtn.getContentSize().width/2,closeBtn.getContentSize().height/2);
        //starParticle1.setScale(2);
        closeBtn.addChild(starParticle1,0);

        // var _back = suizi.getParent();
        // var _currentScale = _back.getScale();
        // //_back.setScale(0);
        // _back.runAction(cc.scaleTo(0.2,_currentScale).easing(cc.easeBackOut()));

    }

    if(suizi)
    {
        //动画
        suizi.setRotation(-angle/2);
        suizi.runAction(cc.sequence(cc.rotateBy(2,angle).easing(cc.easeQuadraticActionInOut()), cc.rotateBy(2,-angle).easing(cc.easeQuadraticActionInOut())).repeatForever());
    }

}

// 亲友圈-邀请弹出框
var FriendCard_yaoqing = cc.Layer.extend({
    jsBind: {
        _run:function () {
            this.setAnchorPoint(cc.p(0.5, 0.5));
            setWgtLayout(this, [1, 1], [0.5, 0.5], [0, 0], true);
        },
        Image_di: {
            _click: function(btn) {
                cc.log("关闭");
                MjClient.friendCardYaoqing_ui.removeFromParent(true);
            },
        },
        Image_bg: {
            btn_close: {
                _click: function(btn) {
                    MjClient.friendCardYaoqing_ui.removeFromParent(true);
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Yaoqing_Guanbi", {uid:SelfUid()})
                },
            },
            Button_yaoqing: {
                _click: function(btn) {
                    var openType = MjClient.friendCardYaoqing_ui.clubData.openType ? MjClient.friendCardYaoqing_ui.clubData.openType : ""
                    if(openType)//女管家点开 openType = "Renwu_"
                    {
                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_"+openType+"Yaoqing_Yaoqinghaoyou", {uid:SelfUid()});
                    }

                    var clubInfo = MjClient.friendCardYaoqing_ui.clubData.info;
                    var txt_title = "";
                    var txt_content = "";
                    if (isJinZhongAPPType()) {
                        var ruleDesc = MjClient.friendCardYaoqing_ui.ruleDesc;
                        var gameName = MjClient.friendCardYaoqing_ui.gameName;
                        txt_content += ruleDesc.replace(gameName + ",", "【" + gameName + "】") + ",";
                        txt_content += "速度加入【"+AppCnName[MjClient.getAppType()]+"】";
                        var clubName = unescape(clubInfo.title);
                        txt_title = gameName + " " + clubName + (clubName.indexOf("亲友圈") < 0 ? "亲友圈" : "") + "(ID:" + clubInfo.clubId + ")" +  " 点击加入>>> 长按转发" ;
                    }
                    else {
                        txt_title = "好友邀你加入亲友圈畅玩~自动开房　点击加入>>";
                        txt_content = "亲友圈：" + unescape(clubInfo.title) + "\r\n　　ID：" + clubInfo.clubId;
                    }

                    cc.log("亲友圈邀请:txt_title=" + txt_title, "txt_content=" + txt_content);

                    //if (MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ || !isCurrentNativeVersionBiggerThan("8.0.0") || !MjClient.systemConfig.miniProgram) {
                    if (true) {
                        MjClient.block();
                        MjClient.gamenet.request("pkplayer.handler.openBrowser", {
                            type: 5, clubId: MjClient.friendCardYaoqing_ui.clubData.info.clubId, ruleId: MjClient.friendCardYaoqing_ui.ruleIndex
                        }, function(rtn) {
                            MjClient.unblock();
                            if (rtn.code == 0) {
                                var selectPlatformLayer = new shareUrlMultiPlatformLayer(rtn.data, txt_title, txt_content);
                                selectPlatformLayer.isFriendYaoQing = true;
                                MjClient.Scene.addChild(selectPlatformLayer);
                                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Yaoqing_Yaoqinghaoyou_Xuanzequdao", {uid:SelfUid()});
                            } else {
                                FriendCard_Common.serverFailToast(rtn);
                            }
                            if (MjClient.friendCardYaoqing_ui && cc.sys.isObjectValid(MjClient.friendCardYaoqing_ui))
                                MjClient.friendCardYaoqing_ui.removeFromParent(true);
                        });
                    }
                    else {
                        var url = "http://www.undefine.com?clubId=" + MjClient.friendCardYaoqing_ui.clubData.info.clubId + "&ruleId=" + MjClient.friendCardYaoqing_ui.ruleIndex;
                        MjClient.native.wxShareMiniProgram(url, txt_title, txt_content);
                        if (MjClient.friendCardYaoqing_ui && cc.sys.isObjectValid(MjClient.friendCardYaoqing_ui))
                            MjClient.friendCardYaoqing_ui.removeFromParent(true);
                    }
                },
            },
        },
    },
    ctor:function (clubData, ruleIndex) {
        this._super();
        this.clubData = JSON.parse(JSON.stringify(clubData));
        this.ruleIndex = ruleIndex;

        MjClient.friendCardYaoqing_ui = this;

        var node = ccs.load("friendcard_yaoqing.json").node;
        BindUiAndLogic(node, this.jsBind);
        this.addChild(node);

        var Image_bg = node.getChildByName("Image_bg");
        if(FriendCard_Common.getSkinType() != 0)
        {
            popupAnm(Image_bg)
        }
        var text_title = Image_bg.getChildByName("Text_title");
        text_title.ignoreContentAdaptWithSize(true);
        Image_bg.getChildByName("Text_title").setString(unescape(clubData.info.title));

        Image_bg.getChildByName("Text_tip").setString("将ID发给你的好友，好友即可通过ID找到牌友圈。\n任何人加入均需要你审核，请到成员列表查看待审核好友。");

        var text_ID = Image_bg.getChildByName("Image_di").getChildByName("Text_ID");
        text_ID.ignoreContentAdaptWithSize(true);
        text_ID.setString("" + clubData.info.clubId);

        // 亲友圈图标
        MjClient.loadImgQX(clubData.info.avatar ? clubData.info.avatar : "png/default_headpic.png", {isCrossOrigin : true}, function(err, texture)
        {
            if (err || !texture || !sys.isObjectValid(Image_bg))
                return;

            var sp = new cc.Sprite(texture);
            if (!sp)
                return;

            var head = Image_bg.getChildByName("Image_head");

            if(FriendCard_Common.getSkinType() == 1)
            {
                var clippingNode = new cc.ClippingNode();
                var mask = new cc.Sprite("friendCards/common/headMask_da.png");
                clippingNode.setAlphaThreshold(0);
                clippingNode.setStencil(mask);

                sp.setScale(mask.getContentSize().width/sp.getContentSize().width);
                clippingNode.addChild(sp);
                clippingNode.setScale(0.999);

                clippingNode.setPosition(head.getContentSize().width/2,head.getContentSize().height/2);

                head.addChild(clippingNode);
            }
            else if(FriendCard_Common.getSkinType() == 2 || FriendCard_Common.getSkinType() == 3)
            {

                var clippingNode = new cc.ClippingNode();
                var mask = new cc.Sprite("friendCards/common/headMask1.png");
                clippingNode.setAlphaThreshold(0);
                clippingNode.setStencil(mask);

                sp.setScale(mask.getContentSize().width/sp.getContentSize().width);
                clippingNode.addChild(sp);
                clippingNode.setScale(0.999);

                clippingNode.setPosition(head.getContentSize().width/2,head.getContentSize().height/2)

                var hideblock = new cc.Sprite("friendCards/common/head_kuang1.png");
                hideblock.setPosition(head.getContentSize().width / 2, head.getContentSize().height / 2);
                head.addChild(clippingNode);
                head.addChild(hideblock);
            }
            else
            {
                sp.setScale((head.width - 8)/sp.width);
                sp.setPosition(cc.p(head.width/2, head.height/2));
                head.addChild(sp);
            }
        });

        var clubInfo = this.clubData.info;
        var rule = clubInfo["rule" + this.ruleIndex];
        this.ruleDesc = clubInfo["rule" + this.ruleIndex].ruleDesc;
        this.gameName = GameCnName[rule.gameType];
    },
    onExit: function () {
        if(FriendCard_Common.getSkinType() == 3 && MjClient.FriendCard_main_ui)
        {
            MjClient.FriendCard_main_ui.bottomBtnDelLight()
        }

        this._super();
        MjClient.friendCardYaoqing_ui = null;
    },
});


/*
 俱乐部审核弹窗提示 暂时先放这
 */
var Friendcard_popMsgShenhe = cc.Layer.extend({
    ctor:function (data) {
        this._super();

        var msgui = ccs.load("friendcard_popMsgShenhe.json");
        this.addChild(msgui.node);

        var _back = msgui.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 1], [0, 0]);
        COMMON_UI.setNodeTextAdapterSize(_back);
        var that = this;
        this.data = data;
        this.isCurUI = false; //可能出现多个审核UI, 这个判断当前操作是否是此UI
        _back.y = _back.y + _back.height;

        var moveTo1 = cc.moveTo(0.3, cc.p(_back.x, _back.y - _back.height));

        var callFunc2 = cc.callFunc(function() {});
        _back.runAction(cc.sequence(moveTo1, callFunc2));

        var btn_no = _back.getChildByName("btn_no");
        var btn_close = _back.getChildByName("btn_close");
        var btn_ok = _back.getChildByName("btn_ok");

        var player_name = _back.getChildByName("player_name");
        var player_ID = _back.getChildByName("player_ID");
        var player_head = _back.getChildByName("player_head");

        var club_name = _back.getChildByName("club_name");
        var club_ID = _back.getChildByName("club_ID");
        var club_head = _back.getChildByName("club_head");

        player_name.setString(getNewName(unescape(data.nickname)));
        player_name.setFontName("Arial");
        player_name.setFontSize(25);
        player_ID.setString("（" + data.userId + "）");

        club_name.setString("申请加入你的" + getNewName_new(unescape(data.clubTitle), 6));
        club_ID.setString("（" + data.clubId + "）");

        // player_ID.x = player_head.x - player_head.width/2 - 5 - player_ID.width;
        // player_name.x = player_ID.x  - 5;
        // club_ID.x = club_name.x + club_name.width;
        // club_head.x = club_ID.x + club_ID.width +club_head.width/2+5
        club_ID.x = club_head.x - club_head.width / 2 - club_ID.width - 5;
        club_name.x = club_ID.x - club_name.width - 5;
        player_head.x = club_name.x - player_head.width / 2 - 10;
        player_ID.x = player_head.x - player_ID.width - player_head.width / 2 - 5;
        player_name.x = player_ID.x - player_name.width - 5;

        MjClient.loadImgQX(data.headimgurl ? data.headimgurl : "png/default_headpic.png", {
            isCrossOrigin: true
        }, function(err, texture) {
            if (err || !texture || !sys.isObjectValid(player_head))
                return;

            var sp = new cc.Sprite(texture);
            if (!sp)
                return;

            sp.setScale((player_head.width - 8) / sp.width);
            sp.setPosition(cc.p(player_head.width / 2, player_head.height / 2));
            player_head.addChild(sp);
        });

        MjClient.loadImgQX(data.clubAvatar ? data.clubAvatar : "png/default_headpic.png", {
            isCrossOrigin: true
        }, function(err, texture) {
            if (err || !texture || !sys.isObjectValid(club_head))
                return;

            var sp = new cc.Sprite(texture);
            if (!sp)
                return;

            sp.setScale((club_head.width - 8) / sp.width);
            sp.setPosition(cc.p(club_head.width / 2, club_head.height / 2));
            club_head.addChild(sp);
        });

        var request = function(pass) {
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.clubApplyCheck", {
                id: data.applyId,
                pass: pass
            }, function(rtn) {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(that)) {
                    return;
                }

                if (rtn.code == 0) {
                    MjClient.showToast(rtn.message);
                    checkClubShenheLsit();
                } else {
                    FriendCard_Common.serverFailToast(rtn);
                }
                that.removeFromParent();
            });
        }

        //获得当前处理俱乐部的审核列表
        var checkClubShenheLsit = function() {
            MjClient.block();

            MjClient.gamenet.request("pkplayer.handler.clubApplyList", {clubId: data.clubId},  function(rtn)
            {
                MjClient.unblock();
                if (rtn.code == 0)
                {
                    if (rtn.data.length == 0)
                    {
                        var index = MjClient.clubPlayerApplyList.indexOf(data.clubId);
                        if (index != -1){
                            MjClient.clubPlayerApplyList.splice(index, 1);
                        }
                        postEvent("cancel_club_player_apply");
                    }
                }

            });
        }

        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);
        btn_ok.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                request(1);
            }
        }, this);
        btn_no.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                request(0);
                //this.removeFromParent();
            }
        }, this);
        _back.addTouchEventListener(function(sender, type) {
            if (type == 0) {
                this.isCurUI = true;
            }
        }, this);

        function closeMe() {
            if (!that.isCurUI)
                return;

            var moveTo1 = cc.moveTo(0.3, cc.p(_back.x, _back.y + _back.height));

            var callFunc2 = cc.callFunc(function() {
                that.removeFromParent();
            });
            _back.runAction(cc.sequence(moveTo1, callFunc2));
        }

        function intoMoveCloseMe() {
            that.touchListener = cc.EventListener.create(getTouchListener());
            cc.eventManager.addListener(that.touchListener, _back.getChildByName("touch"));
        }

        function getTouchListener() {
            var isClose = false;
            var ret = {
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: false,
                onTouchBegan: function(touch, event) {
                    return true;
                },
                onTouchMoved: function(touch, event) {

                    if (!touch._py)
                        touch._py = touch.getLocation().y;

                    if (touch._py < (_back.y - _back.height)) {
                        touch._py = false;
                        return false;
                    }
                    var curPy = touch.getLocation().y;

                    if (touch._py <= (curPy - 10)) {
                        isClose = true
                    }
                    return true;

                },
                onTouchEnded: function(touch, event) {
                    if (isClose) {
                        closeMe();
                    }
                }
            };
            return ret;
        }
        intoMoveCloseMe();

        return true;
    }
});

/*
 俱乐部邀请弹窗
 */
var Friendcard_popMsgInvited = cc.Layer.extend({
    ctor:function (data) {
        var that = this;
        this._super();
        this.data = data;
        var msgui = ccs.load("friendcard_popMsgInvited.json");
        this.addChild(msgui.node);

        var _back = msgui.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 1], [0, 0]);
        COMMON_UI.setNodeTextAdapterSize(_back);
        var that = this;
        this.data = data;
        this.isCurUI = false; //可能出现多个审核UI, 这个判断当前操作是否是此UI
        _back.y = _back.y + _back.height;

        var moveTo1 = cc.moveTo(0.3, cc.p(_back.x, _back.y - _back.height));

        var callFunc2 = cc.callFunc(function() {});
        _back.runAction(cc.sequence(moveTo1, callFunc2));




        var player_head = _back.getChildByName("player_head");
        _back.getChildByName("player_name").setString(getNewName(unescape(data.nickname)));
         _back.getChildByName("player_ID").setString("（" + data.userId + "）");

         if (data.leagueTitle) {//联盟
            _back.getChildByName("club_name").setString(getNewName_new(unescape(data.leagueTitle), 6));
            _back.getChildByName("club_ID").setString("（" + data.leagueId + "）");
         }else{
            _back.getChildByName("club_name").setString(getNewName_new(unescape(data.clubTitle), 6));
            _back.getChildByName("club_ID").setString("（" + data.clubId + "）");
         }
        


        //player_head.isMask = true;
        COMMON_UI.refreshHead(this, data.headimgurl ? data.headimgurl : "png/default_headpic.png", player_head);

        _back.getChildByName("btn_close").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);
         _back.getChildByName("btn_ok").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.requestOption(that.data.recordId, 1);
            }
        }, this);
        _back.getChildByName("btn_no").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.requestOption(that.data.recordId, 2);
            }
        }, this);
    },
    requestOption: function(Id, opt) {
        var that = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userInviteCheck", {
            recordId: Id,
            auditStatus: opt   //1:同意 2：拒绝
        }, function(rtn) {
            MjClient.unblock();
            if (!cc.sys.isObjectValid(that)) {
                return;
            }
            if (rtn.code == 0) {
                MjClient.showToast("操作成功！");
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
            that.removeFromParent();
        });
    }

});

//俱乐部 分组统计详情
var FriendCard_tongjiDetails = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        var uiNode = ccs.load("friendCard_tongjiDetails.json").node;

        this.addChild(uiNode);
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);
        this.panel_1 = uiNode.getChildByName("Panel_1");
        this.panel_2 = uiNode.getChildByName("Panel_2");
        this.panel_statement = uiNode.getChildByName("Panel_statement");//panel_2的说明
        setWgtLayout(this.panel_1, [1, 1], [0.5, 0.5], [0, 0]);
        setWgtLayout(this.panel_2, [1, 1], [0.5, 0.5], [0, 0]);
        setWgtLayout(this.panel_statement, [1, 1], [0.5, 0.5], [0, 0]);
        this.panel_1.visible = false;
        this.panel_2.visible = false;
        this.panel_statement.visible = false;
        this._data = data;
        this.getData();
        return true;
    },
    showNormal:function(){
        var data = this._data;
        this.panel_1.visible = true;
        //展示旧的统计详情
        var back = this.panel_1.getChildByName("back");
        popupAnm(this.panel_1);
        COMMON_UI.setNodeTextAdapterSize(back);
        var text_time = back.getChildByName("Text_time");
        var text_shikou = back.getChildByName("Text_shikou");
        var text_bushou = back.getChildByName("Text_bushou");

        var text_time1 = back.getChildByName("Text_time1");
        var text_time2 = back.getChildByName("Text_time2");
        var text_award_detail = back.getChildByName("Text_award_detail");

        /*data.ratioFee = {};
        data.ratioFee["70"] = 900;
        data.ratioFee["80"] = 2000;*/
        var panel_rate = back.getChildByName("Panel_rate");
        if(panel_rate){
            if(data.ratioFee){
                panel_rate.visible = true;
                for(var i = 1; i <= 6;i++){
                    panel_rate.getChildByName("Text"+i).setString("");
                }
                var i = 1;
                for(var key in data.ratioFee){
                    panel_rate.getChildByName("Text"+i).setString(key+"%："+data.ratioFee[key].toFixed(2)+"钻石");
                    i++;
                }
            }else{
                panel_rate.visible = false;
            }

        }

        var shikouStr = "实扣：";
        var bushouStr = "当天补收："
        if(data._comeFromType == 2){
            shikouStr += (data.syceeDeduct ? data.syceeDeduct + "" : "0");
            bushouStr += (data.syceeBuckle ? data.syceeBuckle + "" : "0");
        } else if (data._comeFromType == 3) {
            shikouStr += (data.syceeDeduct ? data.syceeDeduct + "" : "0");
            bushouStr += (data.syceeBuckle ? data.syceeBuckle + "" : "0");
        } else {
            shikouStr += ((data.actualCost || data.syceeDeduct) ? (data.actualCost || data.syceeDeduct) + "" : "0");
            bushouStr += ((data.supplement || data.syceeBuckle) ? (data.supplement || data.syceeBuckle) + "" : "0");
        }
        text_time.setString(data.time.substring(0, 10));
        if(data._comeFromType == 3){
            var activePlayUserStr = "活跃人数：" + data.playUser;
            text_shikou.setFontSize(text_shikou.getFontSize()-4);
            text_shikou.setString(shikouStr+"  "+bushouStr + "  "+activePlayUserStr);
            text_bushou.visible = false;
        }else{
            text_shikou.setString(shikouStr);
            text_bushou.setString(bushouStr);
        }
        


        /*data.award = {};
        data.award.ratio = 0.5;
        data.award.amount = 90;
        data.award.subAmount = 10;
        data.award.date = "2019-06-26 17:17:20";*/
        if(data.award && data.award.date){
            var dateStr = data.award.date.split(" ")
            text_time1.setString(dateStr[0]);
            text_time2.setString(dateStr[1]);
            var allAmount = (data.award.amount + data.award.subAmount).toFixed(2);
            var awardDetailStr = "实发奖励"+data.award.amount +"（"+allAmount+"-"+data.award.subAmount+"）"
            var lastSpiltLineCount = 0;
            var lineMaxLength = 20;
            if(!FriendCard_Common.isSupperManger()){
                if(awardDetailStr.length - lastSpiltLineCount> lineMaxLength){
                    awardDetailStr += "\n";
                    lastSpiltLineCount = awardDetailStr.length;
                }
                awardDetailStr += "，比例"+(data.award.ratio * 100).toFixed(0) +"%";
            }
            if(data._comeFromType == 1){
                if (!data.group || data.group  == "0") {
                    if(!lastSpiltLineCount || awardDetailStr.length - lastSpiltLineCount> lineMaxLength){
                        awardDetailStr += "\n";
                        lastSpiltLineCount = awardDetailStr.length;
                    }
                    awardDetailStr += "，此分组未设置组长"
                }
            }
            text_award_detail.setString(awardDetailStr)
        }else{
            text_time1.visible = false;
            text_time2.visible = false;
            text_award_detail.visible = false;
        }
        

        var btn_close = back.getChildByName("btn_close");
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);
    },
    showNew:function(data){
        //展示新的统计详情
        this.panel_2.visible = true;
        var back = this.panel_2.getChildByName("back");
        popupAnm(this.panel_2);
        COMMON_UI.setNodeTextAdapterSize(back);
        var btn_statement = back.getChildByName("Button_statement");
        btn_statement.addTouchEventListener(function(sender,type){
            if (type == 2) {
                this.showStatementView()
            }
        }.bind(this))
        var imgHasPay = back.getChildByName("Image_has_pay");
        var imgNoPay = back.getChildByName("Image_no_pay");
		if(imgHasPay){
            imgHasPay.visible = (data.list.length > 0 && data.list[0].status == 1) ? true : false;
        }
        if(imgNoPay){
            imgNoPay.visible = (data.list.length > 0 && data.list[0].status == 2) ? true : false;
        }
        var text_time = back.getChildByName("Text_time");
        var text_shikou = back.getChildByName("Text_shikou");
        var text_bushou = back.getChildByName("Text_bushou");
        var text_award_mine = back.getChildByName("Text_award_mine");
        var text_award_detail = back.getChildByName("Text_award_detail");

        /*data.ratioFee = {};
        data.ratioFee["70"] = 900;
        data.ratioFee["80"] = 2000;*/

        var shikouStr = "" + data.totalAmount;
        var bushouStr = "" + data.totalReturnFangka;
        var mineContributionStr = "" + data.totalContribution;

        var totalContributionStr = "";
        if(this._data.contribution){
            totalContributionStr = "" + this._data.contribution;
        }else if(this._data.contribute){
            totalContributionStr = "" + this._data.contribute;
        }else{
            totalContributionStr = "0" ;
        }
        if(FriendCard_Common.getSkinType() != 4){
            shikouStr = "实扣：" + shikouStr;
            bushouStr = "当天补收：" + bushouStr;
            mineContributionStr = "我的贡献：" + mineContributionStr;
            if(this._data._comeFromType == 3){
                totalContributionStr = "亲友圈总贡献：" + totalContributionStr;
            }else if(this._data._comeFromType == 1){
                totalContributionStr = "分组总贡献：" + totalContributionStr;
            }else{
                totalContributionStr = "总体贡献：" + totalContributionStr;
            }
        }else{
            var text_award_detail_0 = text_award_detail.getChildByName("Text_award_detail_0");
            if(this._data._comeFromType == 3){
                text_award_detail_0.setString("亲友圈总贡献：");
                text_award_detail.x += 10;
            }else if(this._data._comeFromType == 1){
                text_award_detail_0.setString("分组总贡献：")
                text_award_detail.x += 5;
            }else{
                text_award_detail_0.setString("总体贡献：")
            }
        }
        text_shikou.setString(shikouStr);
        text_bushou.setString(bushouStr);
        text_award_mine.setString(mineContributionStr);
        text_award_detail.setString(totalContributionStr);

        var payTipText = "";
        if(FriendCard_Common.getSkinType() != 4){
            if((data.list.length > 0 && data.list[0].status == 1)){
                payTipText = "(已结算)"
            }else if((data.list.length > 0 && data.list[0].status == 2)){
                payTipText = "(未结算)"
            }
        }
        text_time.setString(this._data.time.substring(0, 10)+payTipText);

        var listView = back.getChildByName("ListView");
        listView.cell = back.getChildByName("Cell");
        listView.cell.visible = false;
        for(var i = 0; i < data.list.length; i++){
            var cell = listView.cell.clone();
            cell.visible = true;
            var itemData = data.list[i];
            //返利比例
            var textRebate = cell.getChildByName("Text1");
            textRebate.setString((itemData.rebate * 100).toFixed(2)+"%")
            //钻石消耗
            var textAmount = cell.getChildByName("Text2");
            textAmount.setString(itemData.amount+"")
            //亲友圈分成比例
            var textRatio = cell.getChildByName("Text3");
            textRatio.setString((itemData.ratio * 100).toFixed(2)+"%")
            //贡献
            var textContribution = cell.getChildByName("Text4");
            textContribution.setString(itemData.contribution+"")
            //备注
            var textRemark = cell.getChildByName("Text5");
            textRemark.setString(itemData.remark+"")

            listView.pushBackCustomItem(cell)
        }
        var btn_close = back.getChildByName("btn_close");
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);
    },
    showStatementView:function(){
        var that = this;
        this.panel_statement.visible = true;
        this.panel_statement.addTouchEventListener(function(){
            that.panel_statement.visible = false;
        })

        for(var i = 1; i <= 3; i++){
            that.panel_statement.getChildByName("Panel_"+i).visible = (i == this._data._comeFromType)
        }
    },
    getData:function(){
        var clubInfo = FriendCard_Common.getClubInfo();

        var that = this;
        var sendInfo = {
            leagueId : FriendCard_Common.isLMClub() ? clubInfo.leagueId : 0,
            date : this._data.time.substring(0, 10).replace(new RegExp("-", "g"), ''),
            clubId: FriendCard_Common.isLMClub() ? this._data.clubId : clubInfo.clubId,
            userId: this._data.userId
        }

        if (!sendInfo.clubId)
            sendInfo.clubId = FriendCard_Common.getClub().subClubId;

        if(this._data._comeFromType == 1){
            //组长
            sendInfo.groupId = this._data.group
        }else if(this._data._comeFromType == 2){
            //助理
            sendInfo.assisId = this._data.refereeId
        }

        cc.log("fangkaAwardLog sendInfo",JSON.stringify(sendInfo));
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.fangkaAwardLog", sendInfo,
            function(rtn) {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(that))
                    return;
                if (rtn.code == 0) {
                    if(!rtn.data || !rtn.data.list || rtn.data.list.length < 1){
                        that.showNormal();
                    }else{
                        that.showNew(rtn.data);
                    }
                } else {
                    that.showNormal()
                    /*if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败");
                    }*/
                }
            }
        );
    },
});

//俱乐部 分组统计修改比例
var FriendCard_setRatio = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        var uiNode = ccs.load("friendCard_setRatio.json").node;

        this.addChild(uiNode);
        var that = this;
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = uiNode.getChildByName("back");
        setWgtLayout(back, [0.64, 0.78], [0.5, 0.5], [0, 0]);
        popupAnm(back)
        COMMON_UI.setNodeTextAdapterSize(back);


        var setEditBoxConfig = function(_parent, _child, str, MaxLength) {
            if (FriendCard_Common.getSkinType() == 3) {
                _child.setFontColor(cc.color("#AD8F64"));
                _child.setPlaceholderFontColor(cc.color("#AD8F64"));

            } else {
                _child.setFontColor(cc.color(0x77, 0x77, 0x77));
            }
            _child.setMaxLength(MaxLength);
            _child.setFontSize(20);
            _child.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            _child.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            _child.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            _child.setPlaceHolder(str);
            _child.setPlaceholderFontSize(20);
            _child.setPosition(_parent.getContentSize().width / 2, _parent.getContentSize().height / 2);
            _parent.addChild(_child);
        }.bind(this);

        var image_input = back.getChildByName("image_input");
        var btn_close = back.getChildByName("btn_close");
        var btn_yes = back.getChildByName("btn_yes");

        var text_tip = back.getChildByName("Text_tip");//比例可设置范围
        if(!text_tip){
            text_tip = back.getChildByName("text_tip");
        }
        text_tip.setString(" 比例可设置范围为0%-100%");
        var text_desc = back.getChildByName("text");//比列计算公式
        if(data._comeFromType == 2){
            text_desc.setString("当天实收*自己比例*助理比例=贡献值")
        }
        
        var editText = new cc.EditBox(image_input.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/rank/img_remark_bg.png"));
        editText.setName("editText");
        if(data._comeFromType == 2 && !data.isLMClub){
            editText.setString(Number(data.rate * 100).toFixed(0) + "")
            setEditBoxConfig(image_input, editText, Number(data.rate * 100).toFixed(0), 3);
        }else{
            editText.setString(Number(data.rebate * 100).toFixed(0) + "")
            setEditBoxConfig(image_input, editText, Number(data.rebate * 100).toFixed(0), 3);
        }

        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);

        btn_yes.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var sendInfo = {};
                var rebate = Number(editText.getString());
                if (rebate > 100) {
                    MjClient.showToast("比例不能超过100");
                    return;
                }
                
                if(data.isLMClub){
                    sendInfo.ratio = rebate / 100;
                    sendInfo.leagueId = data.clubId;
                    if(data._comeFromType == 2){
                        sendInfo.type = 2;
                        sendInfo.userId = data.refereeId;
                    } else if(data._comeFromType == 3){
                        sendInfo.type = 3;
                        sendInfo.userId = data.userId;
                        //sendInfo.userId = data.opeClubId
                    } else {
                        sendInfo.type = 1;
                        sendInfo.userId = data.userId;
                        //sendInfo.userId = data.group;
                    }
                    MjClient.block();
                    cc.log("updateLeagueGroupStatisRebate sendInfo",JSON.stringify(sendInfo))
                    MjClient.gamenet.request("pkplayer.handler.updateLeagueGroupStatisRebate", sendInfo,
                        function(rtn) {
                            MjClient.unblock();
                            if (!cc.sys.isObjectValid(that))
                                return;
                            if (rtn.code == 0) {
                                MjClient.showToast("修改比例成功");
                                if(data._comeFromType == 2){
                                    postEvent("update_reqRecord_zhuliFKTJ")
                                } else if(data._comeFromType == 3){
                                    postEvent("update_reqRecord_chairmanTJ")
                                } else {
                                    postEvent("update_reqRecord_FKTJ")
                                }
                                that.removeFromParent();
                            } else {
                                if (rtn.message) {
                                    MjClient.showToast(rtn.message);
                                } else {
                                    MjClient.showToast("修改比例失败");
                                }
                            }
                        }
                    );
                }else{
                   sendInfo.rebate = rebate / 100;
                    sendInfo.clubId = data.clubId;
                    if(data._comeFromType == 2){
                        sendInfo.assistant = data.refereeId;
                    }else{
                        sendInfo.group = data.group;
                    }
                    MjClient.block();
                    cc.log("updateClubGroupStatisRebate sendInfo",JSON.stringify(sendInfo))
                    MjClient.gamenet.request("pkplayer.handler.updateClubGroupStatisRebate", sendInfo,
                        function(rtn) {
                            MjClient.unblock();
                            if (!cc.sys.isObjectValid(that))
                                return;
                            if (rtn.code == 0) {
                                MjClient.showToast("修改比例成功");
                                if(data._comeFromType == 2){
                                    postEvent("update_reqRecord_zhuliFKTJ")
                                }else{
                                    postEvent("update_reqRecord_FKTJ")
                                }
                                that.removeFromParent();
                            } else {
                                if (rtn.message) {
                                    MjClient.showToast(rtn.message);
                                } else {
                                    MjClient.showToast("修改比例失败");
                                }
                            }
                        }
                    ); 
                }
                
            }
        }, this);

        return true;
    },
});



/*主界面桌子详情
*/
var FriendCard_rule_detail = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        this._data = data;
        var uiNode = ccs.load("friendcard_rule_detail.json").node;
        this.addChild(uiNode);
        var block = uiNode.getChildByName("block");
        if(!block){
            block = uiNode.getChildByName("Image_di");
        }
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = uiNode.getChildByName("Panel");
        this._panel = back;
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back)

        var btn_close = back.getChildByName("Button_close");
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);

        var that = this;
        var btn_intoRoom = back.getChildByName("btn_intoRoom");
        btn_intoRoom.room = data;
        btn_intoRoom.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                FriendCard_Common.joinGame(MjClient.FriendCard_main_ui,sender);
                this.removeFromParent(true)
            }
        }, this);

        
        this.initLayout();
        return true;
    },
    
    initLayout:function(){

        var infoData = FriendCard_Common.getClubInfo();

        var number = 0;
        for (var i = 1; i <= FriendCard_Common.getRuleNumber(); i++) {
            var otherRule = infoData["rule" + i];
            if (otherRule && otherRule != "delete") {
                number++;
            }
            if(i == this._data.ruleIndex){
                break;
            }
        }

        var text_rule_name = this._panel.getChildByName("Text_rule_name");
        text_rule_name.ignoreContentAdaptWithSize(true);
        text_rule_name.setString("玩法"+number+":"+unescape(infoData["rule" + this._data.ruleIndex].ruleName))
        var text_rule_detail = this._panel.getChildByName("Text_rule_detail");
        var guizeStr = stringDBCtoSBC(unescape(infoData["rule" + this._data.ruleIndex].ruleDesc));
        text_rule_detail.setString(guizeStr)

    }
});

// 亲友圈-主界面规则
//比赛场的这个页面是FriendCard_Match_ruleLayer记得同步
var FriendCard_ruleLayer = cc.Layer.extend({

    ctor: function(clubData) {
        this._super();
        this.clubData = clubData;
        var node = ccs.load("friendCard_ruleLayer.json").node;
        this.addChild(node);
        this.node = node;
        var back = node.getChildByName("back")
        setWgtLayout(node.getChildByName("block"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("back"), [1, 1], [0.5, 0.5], [0, 0]);
        MjClient.FriendCard_ruleLayer = this;

        this.isJurisdiction = false;
        if (FriendCard_Common.getClubisLM()) {
            this.isJurisdiction = FriendCard_Common.isSupperManger();
        } else {
            this.isJurisdiction = FriendCard_Common.isManager();
        }
        this.keyQuickGamesWitch = FriendCard_Common.LocalKey.quickGameSwitch + this.clubData.clubId;
        this._quickStartListLocalSwitch = util.localStorageEncrypt.getStringItem(this.keyQuickGamesWitch,"");
        cc.log("this._quickStartListLocalSwitch",this._quickStartListLocalSwitch)
        if(!this._quickStartListLocalSwitch || this._quickStartListLocalSwitch == ""){
            this._quickStartListLocalSwitch = {};
        }else{
            this._quickStartListLocalSwitch = JSON.parse(this._quickStartListLocalSwitch)
        }
        this.getInviteSet();
        this.initRuleLayer(back);
        popupAnm(back);

    },
    getInviteSet:function(){
        var that = this;
        if(FriendCard_Common.isLMClub(this.clubData)){
            MjClient.block();
            var sendInfo = {
                leagueId:this.clubData.leagueId,
                userId:MjClient.data.pinfo.uid,
            }
            cc.log("leaguePlayerList",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.leaguePlayerList", sendInfo ,  function(rtn)
            {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(that)) {
                    return;
                }
                if(rtn.code == 0){
                    that._acceptInvite = rtn.data.mine.acceptInvite;
                    that.reflashUI(true);
                }
                
            });
        }else{
            MjClient.block();
            var sendInfo = {
                clubId:this.clubData.clubId,
                userId:MjClient.data.pinfo.uid,
            }
            cc.log("clubPlayerList",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.clubPlayerList", sendInfo ,  function(rtn)
            {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(that)) {
                    return;
                }
                if(rtn.code == 0){
                    that._acceptInvite = rtn.acceptInvite;
                    that.reflashUI(true);
                }
                
            });
        }
    },
    saveInviteSet:function(){
        var that = this;

        var acceptRange = [];
        for(var key in this._acceptInviteSwitch){
            if(this._acceptInviteSwitch[key] == 1){
                acceptRange.push(parseInt(key));
            }
        }
        if(FriendCard_Common.isLMClub(this.clubData)){
            var sendInfo = {
                leagueId:this.clubData.leagueId,
            }
            if(this._cb_isAcceptAllInvite.isSelected()){
                sendInfo.accept = 1;
            }else if(acceptRange.length == 0){
                sendInfo.accept = 0;
            }else{
                sendInfo.accept = 2;
                sendInfo.acceptRange = acceptRange;
            }
            cc.log("leagueInviteSet",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.leagueInviteSet", sendInfo ,  function(rtn)
            {
                if(rtn.code != 0){
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    }
                }
            });
        }else{
            var sendInfo = {
                clubId:this.clubData.clubId,
            }
            if(this._cb_isAcceptAllInvite.isSelected()){
                sendInfo.accept = 1;
            }else if(acceptRange.length == 0){
                sendInfo.accept = 0;
            }else{
                sendInfo.accept = 2;
                sendInfo.acceptRange = acceptRange;
            }
            cc.log("clubInviteSet",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.clubInviteSet", sendInfo ,  function(rtn)
            {
                if(rtn.code != 0){
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    }
                }
                
            });
        }
    },
    reflashUI:function(isClear){
        var listView = this._listView;
        var _item = this._item;
        _item.visible = false;
        if(isClear){
            listView.removeAllItems();
        }
        this._acceptInviteSwitch = []
        var allAcceptInvite = true;
        for (var i = 0; i < this._ruleListData.length; i++) {
            var isOpenInvite = this.isOpenInvite(this._ruleListData[i]._index)? 1 : 0;
            this._acceptInviteSwitch[this._ruleListData[i]._index.toString()] = isOpenInvite;
            if(!isOpenInvite){
                allAcceptInvite = false;
            }
            var itemData = this._ruleListData[i];
            itemData._localIndex = i;
            if(listView.getItems()[i]){
                this.createItem(listView.getItems()[i], itemData, i)
            }else{
                var item = _item.clone();
                listView.pushBackCustomItem(this.createItem(item, itemData, i))
            }
        }
        this._cb_isAcceptAllInvite.visible = true;
        this._cb_isAcceptAllInvite.setSelected(allAcceptInvite)
    },
    reSetSelectAllInvite:function(){
        var allAcceptInvite = true;
        for (var i = 0; i < this._ruleListData.length; i++) {
            var isOpenInvite = this._acceptInviteSwitch[this._ruleListData[i]._index.toString()];
            if(!isOpenInvite){
                allAcceptInvite = false;
            }
        }
        this._cb_isAcceptAllInvite.setSelected(allAcceptInvite)
    },
    isOpenInvite:function(index){
        if(typeof(this._acceptInvite) === 'number'){
            return this._acceptInvite === 1;
        }else if(typeof(this._acceptInvite) === 'object'){
            return this._acceptInvite.indexOf(index) > -1;
        }
        return false;
    },
    updateRuleStopRoom:function(index,isStop){
        var that = this;
        if(FriendCard_Common.isLMClub(this.clubData)){
            var sendInfo = {
                leagueId:this.clubData.leagueId,
            }
            sendInfo.ruleId = index;
            sendInfo.action = isStop ? 0 : 1;
            cc.log("leagueRuleSwitch",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.leagueRuleSwitch", sendInfo ,  function(rtn)
            {
                if(rtn.code != 0){
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    }
                }
            });
        }else{
            var sendInfo = {
                clubId:this.clubData.clubId,
            }
            sendInfo.ruleId = index;
            sendInfo.action = isStop ? 0 : 1;
            cc.log("clubRuleSwitch",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.clubRuleSwitch", sendInfo ,  function(rtn)
            {
                if(rtn.code != 0){
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    }
                }
            });
        }
    },
    createItem: function(item, itemData, i) {
        var text_wanfaNum = item.getChildByName("text_wanfaNum")
        var text_ruleName = item.getChildByName("text_ruleName")
        var text_ruleDesc = item.getChildByName("text_ruleDesc")
        var btn_setRule = item.getChildByName("btn_setRule")

        var guizeStr = stringDBCtoSBC(unescape(itemData.ruleDesc));
        text_ruleDesc.setString(guizeStr);
        text_ruleDesc.runAction(cc.sequence(cc.DelayTime(0.01), cc.callFunc(function() {
            //text_ruleDesc.setString(guizeStr);
            var i = 0;
            while (text_ruleDesc.getVirtualRenderer().getStringNumLines() > 3) {
                i++;
                text_ruleDesc.setString(guizeStr.substring(0, guizeStr.length - i) + "...");
            }
        })));
        text_wanfaNum.setString("玩法" + (i + 1) + ":")
        text_ruleName.setString(unescape(itemData.ruleName));
        btn_setRule.visible = this.isJurisdiction;
        btn_setRule._wanFaIndex = itemData._index;
        var isShowLibertyCreRoom = false;
        if (itemData.customInfo){
            isShowLibertyCreRoom = itemData.customInfo;
        }
        btn_setRule._isShowLibertyCreRoom = isShowLibertyCreRoom
        
        btn_setRule.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                cc.log("createRoom ruleNumer",sender._wanFaIndex)
                postEvent("createRoom", {
                    IsFriendCard: true,
                    ruleNumer: sender._wanFaIndex,
                    ruleName: itemData.ruleName,
                    clubType: this.clubData.type,
                    isShowLibertyCreRoom:sender._isShowLibertyCreRoom,
                    isMatch:(this.clubData.matchIsOpen & 2),
                    isAntiAddictionMode:(this.clubData.isOpenAntiAddiction & 1),
                });
            }
        }, this);

        var btn_black_list = item.getChildByName("btn_black_list");
        if(FriendCard_Common.isLMClub()){
            btn_black_list.visible = FriendCard_Common.isSupperManger() || FriendCard_Common.isLMChair() || FriendCard_Common.isGroupLeader() !== false;
        }else{
            btn_black_list.visible = FriendCard_Common.isManager() || FriendCard_Common.isGroupLeader() !== false;
        }
        btn_black_list._ruleData = itemData;
        btn_black_list.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var data = JSON.parse(JSON.stringify(this.clubData));
                data.pmruleId = sender._ruleData._index;
                data.ruleData = sender._ruleData;
                this.addChild(new Friendcard_ruleBlackList(data));
            }
        }, this);

        //wj
        btn_black_list.visible = false;

        var cb_isStopRoom = item.getChildByName("cb_isStopRoom");
        if(FriendCard_Common.isLMClub()){
            cb_isStopRoom.visible = FriendCard_Common.isSupperManger();
        }else{
            cb_isStopRoom.visible = FriendCard_Common.isManager();
        }
        cb_isStopRoom.ignoreContentAdaptWithSize(true);
        var isStopRoom = ((!((itemData._index+"") in this.clubData.ruleSwitch)) || this.clubData.ruleSwitch[itemData._index+""]) ? false : true;
        cb_isStopRoom.setSelected(isStopRoom ? true : false);
        cb_isStopRoom._data = itemData;
        cb_isStopRoom.addTouchEventListener(function(sender, type) {
            if (type == 2){
                this.updateRuleStopRoom(sender._data._index,sender.isSelected()?false:true);
            }
        }, this);
        cb_isStopRoom.getChildByName("text").addTouchEventListener(function(sender, type) {
            if (type == 2){
                sender.getParent().setSelected(!sender.getParent().isSelected());
                this.updateRuleStopRoom(sender.getParent()._data._index,sender.getParent().isSelected()?true:false);
            }   
        }, this);


        var cb_isAcceptInvite = item.getChildByName("cb_isAcceptInvite");
        cb_isAcceptInvite.ignoreContentAdaptWithSize(true);
        cb_isAcceptInvite.setSelected(this._acceptInviteSwitch[itemData._index.toString()] == 1);
        cb_isAcceptInvite._data = itemData;
        cb_isAcceptInvite.addTouchEventListener(function(sender, type) {
            if (type == 2){
                this._acceptInviteSwitch[sender._data._index.toString()] = sender.isSelected() ? 0 : 1;
                this.reSetSelectAllInvite();
            }
        }, this);
        cb_isAcceptInvite.getChildByName("text").addTouchEventListener(function(sender, type) {
            if (type == 2){
                sender.getParent().setSelected(!sender.getParent().isSelected());
                this._acceptInviteSwitch[sender.getParent()._data._index.toString()] = sender.getParent().isSelected() ? 1 : 0;
                this.reSetSelectAllInvite();
            }   
        }, this);

        var cb_isAddQuickStartList = item.getChildByName("cb_isAddQuickStartList");
        cb_isAddQuickStartList.ignoreContentAdaptWithSize(true);
        if(itemData._index.toString() in this._quickStartListLocalSwitch){
            cb_isAddQuickStartList.setSelected(this._quickStartListLocalSwitch[itemData._index.toString()] == 1)
        }else{
            cb_isAddQuickStartList.setSelected(true)
        }
        cb_isAddQuickStartList._data = itemData;
        cb_isAddQuickStartList.addTouchEventListener(function(sender, type) {
            if (type == 2){
                this._quickStartListLocalSwitch[sender._data._index.toString()] = sender.isSelected() ? 0 : 1;
            }   
        }, this);
        cb_isAddQuickStartList.getChildByName("text").addTouchEventListener(function(sender, type) {
            if (type == 2){
                sender.getParent().setSelected(!sender.getParent().isSelected());
                this._quickStartListLocalSwitch[sender.getParent()._data._index.toString()] = sender.getParent().isSelected() ? 1 : 0;
            }   
        }, this);
        item.visible = true;

        return item
    },
    
    initRuleLayer: function(panel) {
        var _close = panel.getChildByName("btn_close")
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                util.localStorageEncrypt.setStringItem(this.keyQuickGamesWitch,JSON.stringify(this._quickStartListLocalSwitch));
                this.saveInviteSet();
                this.removeFromParent(true)
            }
        }, this);
        closeBtnAddLight(_close);


        var ruleList = [];
        var ruleNum = -1;
        for (var i = 1; i <= FriendCard_Common.getRuleNumber(); i++) {
            var otherRule = this.clubData["rule" + i];
            if (otherRule && otherRule != "delete") {
                otherRule._index = i;
                ruleList.push(otherRule);
            } else if (ruleNum == -1) {
                ruleNum = i;
            }
        }

        var btn_addRule = panel.getChildByName("btn_addRule");
        btn_addRule.visible = this.isJurisdiction && ruleNum != -1;
        btn_addRule.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                postEvent("createRoom", {
                    IsFriendCard: true,
                    ruleNumer: ruleNum,
                    clubType: this.clubData.type,
                    isMatch:(this.clubData.matchIsOpen & 2),
                    isAntiAddictionMode:(this.clubData.isOpenAntiAddiction & 1),
                });

            }
        }, this);

        this._cb_isAcceptAllInvite = panel.getChildByName("cb_isAcceptAllInvite");
        this._cb_isAcceptAllInvite.ignoreContentAdaptWithSize(true);
        this._cb_isAcceptAllInvite.visible = false;

        this._cb_isAcceptAllInvite.addTouchEventListener(function(sender, type) {
            if (type == 2){
                this._acceptInvite = sender.isSelected() ? 0 : 1;
                sender.runAction(cc.sequence(cc.callFunc(function(){
                    this.reflashUI();
                }.bind(this))))
            }   
        }, this);
        this._cb_isAcceptAllInvite.getChildByName("text").addTouchEventListener(function(sender, type) {
            if (type == 2){
                sender.getParent().setSelected(!sender.getParent().isSelected());
                this._acceptInvite = sender.getParent().isSelected() ? 1 : 0;
                this.reflashUI();
            }   
        }, this);

        this._listView = panel.getChildByName("listView")
        this._item = panel.getChildByName("item")
        this._item.visible = false;
        this._ruleListData = ruleList;
    },
    reqChange: function(selectNumber) {
        if(FriendCard_Common.getClubisLM()){
            this.reqChangeLM(selectNumber);
            return;
        }
        var that = this;
        var newRule = MjClient.RuleParam["rule" + selectNumber];
        if(this._ruleListData.length == 1 && "delete" == newRule){
            MjClient.showToast("亲友圈至少有一个玩法！");
            return;
        }
        var sendInfo = {};
        sendInfo["rule" + selectNumber] = newRule;
        sendInfo.clubId = this.clubData.clubId;

        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.clubUpdate", sendInfo,
            function(rtn) {
                MjClient.unblock();
                if (rtn.code == 0 || rtn.result == 0) {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    }
                    if (cc.sys.isObjectValid(that)) {
                        that.removeFromParent(true);
                    }
                } else {
                    FriendCard_Common.serverFailToast(rtn)
                }

            }
        );
    },
    reqChangeLM: function(selectNumber) {
        var that = this;
        var newRule = MjClient.RuleParam["rule" + selectNumber];
        if(this._ruleListData.length == 1 && "delete" == newRule){
            MjClient.showToast("亲友圈至少有一个玩法！");
            return;
        }
        var sendInfo = {};
        sendInfo["rule" + selectNumber] = newRule;
        sendInfo.leagueId = this.clubData.clubId;

        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.leagueUpdate", sendInfo,
            function(rtn) {
                MjClient.unblock();
                if (rtn.code == 0 || rtn.result == 0) {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    }
                    if (cc.sys.isObjectValid(that)) {
                        that.removeFromParent(true);
                    }
                } else {
                    FriendCard_Common.serverFailToast(rtn)
                }

            }
        );
    },
    onExit: function() {
        this._super();
        MjClient.FriendCard_ruleLayer = null;
    },
});



//俱乐部业绩模式
var FriendCard_selectYejiMode = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        this.clubInfo = FriendCard_Common.getClubInfo();
        if(!this.clubInfo){
            return;
        }
        var uiNode = ccs.load("friendcard_selectYejiMode.json").node;

        this.addChild(uiNode);
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = uiNode.getChildByName("back");
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back)
        COMMON_UI.setNodeTextAdapterSize(back);

        var btn_close = back.getChildByName("close");
        var btn_yes = back.getChildByName("btn_commit");
        
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);
        btn_yes.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.reqSet();
            }
        }, this);
        
        this.checkBox_modes = [];
        for(var i = 0 ; i < 2; i ++){
            var checkBox_mode = back.getChildByName("checkBox_mode_"+i)
            checkBox_mode.param = i;
            this.checkBox_modes.push(checkBox_mode);
            
            if(!data._isChange){
                checkBox_mode.visible = false;
            }else{
                checkBox_mode.visible = true;
            }
            checkBox_mode.addTouchEventListener(function(sender,type){
                if(type != 2){
                    return;
                }
                this.runAction(cc.callFunc(function() {
                    this.onSelectChange(sender.param);
                }.bind(this)));    
                
            }.bind(this));
            checkBox_mode.getChildByName("text").addTouchEventListener(function(sender,type){
                if(type != 2){
                    return;
                }
                this.onSelectChange(sender.getParent().param);
            }.bind(this));
        }
        for(var i=0 ; i < 5; i++){
            if(back.getChildByName("Text_tip"+i)){
                back.getChildByName("Text_tip"+i).ignoreContentAdaptWithSize(true);
            }
        }
        var text_tip2 = back.getChildByName("Text_tip2");
        text_tip2.setString("销售钻石数=牌局最终扣费玩家属于谁就是谁的业绩")
        var text_tip0 = back.getChildByName("Text_tip0");
        if(!data._isChange){
            btn_yes.visible = false;
            text_tip0.visible = true;
        }else{
            btn_yes.visible = true;
            text_tip0.visible = false;
        }
        this.onSelectChange(this.clubInfo.kpiMode)
        return true;
    },
    onSelectChange:function(index){
        for(var i = 0 ; i <this.checkBox_modes.length; i++){
            if(i == index){
                this.checkBox_modes[i].setSelected(true);
                this.checkBox_modes[i].getChildByName("text").setTextColor(FriendCard_Common.getTextColor().red);
            }else{
                this.checkBox_modes[i].setSelected(false);
                this.checkBox_modes[i].getChildByName("text").setTextColor(FriendCard_Common.getTextColor().black);
            }
        }
    },
    reqSet:function(){
        var that = this;
        var sendInfo = this.getSendInfo();
        
        if(Object.keys(sendInfo).length < 1){
            //没有做任何修改
            that.removeFromParent();
            return;
        }
        if(this.clubInfo.leagueId){
            sendInfo.leagueId = this.clubInfo.leagueId;
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.leagueUpdate", sendInfo,
                function(rtn) {
                    MjClient.unblock();
                    if (rtn.code == 0) {
                        if (cc.sys.isObjectValid(that))
                            that.removeFromParent();
                    } else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        } else {
                            MjClient.showToast("修改失败");
                        }
                    }
                }
            );
        }else{
            sendInfo.clubId = this.clubInfo.clubId;
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.clubUpdate", sendInfo,
                function(rtn) {
                    MjClient.unblock();
                    if (rtn.result == 0) {
                        if (cc.sys.isObjectValid(that))
                            that.removeFromParent();
                    } else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        } else {
                            MjClient.showToast("修改失败");
                        }
                    }
                }
            );
        }
        
    },
    getSendInfo:function()
    {
        var param = {};
        for(var i = 0 ; i <this.checkBox_modes.length; i++){
            if(this.checkBox_modes[i].isSelected()){
                param.kpiMode = i;
            }
        }
        //遍历保存的设置和服务器传来的data是否有修改
        for(var x in param)
        {
            if(!cc.isUndefined(this.clubInfo[x]) && (param[x] == this.clubInfo[x]))
            {
                delete param[x]
            }
        }

        return param;

    },
});


//联盟推送提示设置比例
var Friendcard_tipSetRatioDialog = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        var uiNode = ccs.load("friendcard_tip_setRatio.json").node;
        this.addChild(uiNode);
        var that = this;
        this._data = data;
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = uiNode.getChildByName("back");
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back)

        var userInfoNode = back.getChildByName("userInfoNode");
        COMMON_UI.setNodeTextAdapterSize(userInfoNode);
        var image_head = userInfoNode.getChildByName("Image_head");
        image_head.isMask = true;
        var text_title = userInfoNode.getChildByName("Text_title");
        var text_Id = userInfoNode.getChildByName("Text_Id");
        var text_Count = userInfoNode.getChildByName("Text_Count");
        var image_LM_icon = userInfoNode.getChildByName("Image_LM_icon");
        
        var text_desc = back.getChildByName("text");
        if(this._data.targetRoleId == 2){
            // 创建联盟，notify_in_club 向会长发送的数据
            COMMON_UI.refreshHead(this,this._data.leagueAvatar,image_head);        
            text_title.setString(unescape(this._data.leagueTitle)+"");
            text_Id.setString(unescape(this._data.leagueId)+"");
            text_title.y = userInfoNode.height/2 + 15;
            text_Id.y = userInfoNode.height/2 - 15;
            text_Count.visible = false;
            image_LM_icon.visible = true;

            var descStr = "你的"+unescape(this._data.clubTitle)+ "("+this._data.clubId+")已加入"
            descStr += unescape(this._data.leagueTitle) + "("+this._data.leagueId+")联盟,快为你的组长设置比例吧~"
            text_desc.setString(descStr);

        }else if(this._data.targetRoleId == 1){
            // 加入联盟向，notify_in_club 向盟主发送的数据
            COMMON_UI.refreshHead(this,this._data.clubAvatar,image_head);        
            text_title.setString(unescape(this._data.clubCreatorName)+"");
            text_Id.setString(unescape(this._data.clubId)+"");
            text_Count.setString(unescape(this._data.count)+"人");
            text_Count.visible = true;
            image_LM_icon.visible = false;

            var descStr = "你的联盟"+unescape(this._data.leagueTitle)+ "("+this._data.leagueId+")有新的盟友加入,"
            descStr += "快去设置他的会长比例吧~"
            text_desc.setString(descStr);
        }

        var btn_close = back.getChildByName("btn_close");
        var btn_yes = back.getChildByName("btn_yes");

        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);

        btn_yes.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var friendCardsMainUi = MjClient.FriendCard_main_ui;
                if(friendCardsMainUi.clubId != this._data.leagueId){
                    friendCardsMainUi._openTongjiAfterEnterData = this._data;
                    friendCardsMainUi.requestEnterClub(this._data.leagueId);
                }else{
                    var openPage = this._data.targetRoleId == 2 ? "btn_groupTJ" : "btn_chairmanTJ";
                    friendCardsMainUi.addChild(new FriendCard_LM_tongji(friendCardsMainUi.data,openPage));
                }
                this.removeFromParent();
            }
        }, this);

        return true;
    },
});

//组长导入俱乐部选择是否保留身份
var Friendcard_memberGroupDaoru = cc.Layer.extend({
    ctor:function (data,callbackFunc) {
        this._super();
        this._callbackFunc = callbackFunc;
        this._selectType = -1;
        this._data = data;
        var node = ccs.load("friendcard_member_group_daoru.json").node;
        this.addChild(node);
        this.node = node;
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0]);
        
        this.initLayer()
        popupAnm(node.getChildByName("Panel"));
    },
    initLayer:function(){
        var panel = this.node.getChildByName("Panel");

        var text_tip = panel.getChildByName("Text_tip");
        text_tip.setString("你将从"+unescape(this._data.title)+"亲友圈导入成员,请选择你的导入方式")

        this._Panel_1 = panel.getChildByName("Panel_1");
        this._Panel_2 = panel.getChildByName("Panel_2");
        this._selectViews = [this._Panel_1,this._Panel_2];
        for(var i = 0 ; i < this._selectViews.length;i++){
            
            if(FriendCard_Common.getSkinType() != 4){
                this._selectViews[i]._selectType = i;

                this._selectViews[i]._light = this._selectViews[i].getChildByName("Image_di");
                this._selectViews[i]._light.visible = false;
                this._selectViews[i].addTouchEventListener(function(sender, type){
                    if (type == 2){
                        for(var j = 0 ; j < this._selectViews.length;j++){
                            this._selectViews[j]._light.visible = false;
                        }
                        sender._light.visible = true;
                        this._selectType = sender._selectType;
                    }
                }, this);
            }else{
                this._selectViews[i].getChildByName("Button_commit")._selectType = i;
                this._selectViews[i].getChildByName("Button_commit").addTouchEventListener(function(sender, type){
                    if (type == 2){
                        if(this._callbackFunc){
                            this._callbackFunc(sender._selectType);
                        }
                        this.removeFromParent();
                    }
                }, this);
            }
            
        }
        if(FriendCard_Common.getSkinType() != 4){
            panel.getChildByName("Button_commit").addTouchEventListener(function(sender, type){
                if (type == 2){
                    if(this._selectType < 0){
                        MjClient.showToast("请先选择一个模式");
                        return;
                    }
                    if(this._callbackFunc){
                        this._callbackFunc(this._selectType);
                    }
                    this.removeFromParent();
                }
            }, this);
        }
        

        var _close = panel.getChildByName("Button_close")
        _close.addTouchEventListener(function(sender, type){
            if (type == 2){
                this.removeFromParent();
            }
        }, this);
        closeBtnAddLight(_close);

        UIEventBind(null, this, "clubRuleBlackListAdd", function(rtn) {
            this.rquestRuleBlackList();
        }, this);
    },
    onExit: function () {
        this._super();
    },
});


//组长导入俱乐部结果
var FriendCard_memberGroupDaoruResult = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        this._data = data;
        var uiNode = ccs.load("friendcard_member_daoru_result.json").node;

        this.addChild(uiNode);
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = uiNode.getChildByName("back");
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back)
        

        var btn_close = back.getChildByName("close");
        var btn_yes = back.getChildByName("btn_commit");
        
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);
        btn_yes.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true);
            }
        }, this);
        this._text_result = back.getChildByName("Text_result");
        this._text_result.ignoreContentAdaptWithSize(false);
        this._text_result.setString(""+this._data.message);
        this._listView = back.getChildByName("ListView");
        this._listView.setClippingEnabled(true);
        this._listView.setScrollBarEnabled(false);
        this._listView._cell = back.getChildByName("Cell");
        this._listView._cell.visible = false;
        for(var i = 0 ; i < this._data.data.length;i++){
            var itemData = this._data.data[i];
            var cell = this._listView._cell.clone();
            cell.visible = true;
            cell.ignoreContentAdaptWithSize(true);
            cell.setString((i+1)+"."+unescape(itemData.nickname)+"("+itemData.userId+")")
            this._listView.pushBackCustomItem(cell);
        }

        return true;
    },
    
});

var FriendCard__tongji_selectOpt = cc.Layer.extend({
    ctor: function(callbackFunc) {
        this._super();
        this._callbackFunc = callbackFunc;
        var uiNode = ccs.load("friendcard_tongji_selectOpt.json").node;

        this.addChild(uiNode);
        var block = uiNode.getChildByName("Image_di");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = uiNode.getChildByName("Panel");
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back)
        COMMON_UI.setNodeTextAdapterSize(back);

        var btn_close = back.getChildByName("close");
        var btn_check_member = back.getChildByName("Button_check_member");
        var btn_gongxian_detail = back.getChildByName("Button_gongxian_detail");
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);
        btn_check_member.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if(this._callbackFunc){
                    this._callbackFunc(1);
                }
                this.removeFromParent(true);
            }
        }, this);
        btn_gongxian_detail.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if(this._callbackFunc){
                    this._callbackFunc(2);
                }
                this.removeFromParent(true);
            }
        }, this);
        

        return true;
    },
    
});



/*
*统计清除分数,清除大赢家次数
*/
var FriendCard_tongji_reset = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        this._data = data;
        this._maxSearchTime = 7;

        // if (MjClient.systemConfig && (MjClient.systemConfig.tongjiWhiteUser === true)){
        //     this._maxSearchTime = 35;
        // }
        var uiNode = ccs.load("friendcard_tongji_reset.json").node;
        this.addChild(uiNode);
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = uiNode.getChildByName("Panel");
        this._panel = back;
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back)
        COMMON_UI.setNodeTextAdapterSize(back);

        var btn_close = back.getChildByName("Button_close");
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);
        this.initLayout();
        this.requestData();
        return true;
    },
    requestData:function(){
        var that = this;
        var nowTime = MjClient.getCurrentTime();
        var startTimeStr = this._text_date.getString();
        var startTime = FriendCard_Common.transdate(startTimeStr.substring(0, 4), Number(startTimeStr.substring(5, 7)) - 1, startTimeStr.substring(8, 10), 0, 0);
        var nowTime2 = FriendCard_Common.transdate(nowTime[0], nowTime[1] - 1, nowTime[2], "23", "59")
        this._timespan = Math.ceil((nowTime2 - startTime) / 86400000) //搜索时间跨度超过35天不显示分数
        if (this._timespan > this._maxSearchTime) {
            MjClient.showToast("只能查询近"+this._maxSearchTime+"日的数据");
            return;
        }
        MjClient.block();
        var sendInfo = {
            start:startTime,
            userId:this._data.itemData.userId
        }
        cc.log("nowTime",JSON.stringify(nowTime),"startTimeStr",startTimeStr)
        if(parseInt(startTimeStr.substring(0, 4)) == nowTime[0] && parseInt(startTimeStr.substring(5, 7)) == nowTime[1] && parseInt(startTimeStr.substring(8, 10)) == nowTime[2]){
            sendInfo.end = new Date().getTime();
        }else{
            sendInfo.end = startTime + 24 * 60 * 60 * 1000 - 1;
        }
        var url;
        if(this._data.isLMClub){
            url = "pkplayer.handler.leagueUserClearData";
            sendInfo.leagueId =  this._data.clubData.info.clubId;
        }else{
            url = "pkplayer.handler.clubUserClearData";
            sendInfo.clubId =  this._data.clubData.info.clubId;
        }
        cc.log("UserClearData sendInfo",JSON.stringify(sendInfo));
        MjClient.gamenet.request(url, sendInfo,function(rtn) {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(that))
                    return;
                if (rtn.code == 0) {
                    that._clearData = rtn.data;
                    that._sendInfo = sendInfo;
                    that.refreshView();
                } else {
                    that._clearData = null;
                    that.refreshView();
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }
            }
        );
    },
    setTime:function(dateStr){
        this._text_date.setString(dateStr)
    },
    setTimeDay:function(dateStr,opt){
        var date = dateStr ? new Date(dateStr) : new Date();
        date.setDate(date.getDate()+opt);

        var txt_1 = date.getFullYear();
        var txt_2 = (date.getMonth() + 1) + "";
        var txt_3 = date.getDate() + "";
        txt_2 = txt_2.length <2? "0"+txt_2:txt_2;
        txt_3 = txt_3.length<2? "0"+txt_3:txt_3;
        this.setTime(txt_1+"-"+txt_2+"-"+txt_3);
    },
    refreshView:function(){

        if(!this._clearData){
            this._panel.getChildByName("Panel_score").visible = false;
            this._panel.getChildByName("Panel_winner").visible = false;
        }else{
            this._panel.getChildByName("Panel_score").visible = true;
            this._panel.getChildByName("Panel_winner").visible = true;

            this._panel.getChildByName("Panel_score").getChildByName("Text_2").setString(this._clearData.clearScore+"");
            this._panel.getChildByName("Panel_score").getChildByName("Text_4").setString(MjClient.dateFormat(new Date(this._clearData.clearScoreTime),'yyyy-MM-dd')+"\n"+MjClient.dateFormat(new Date(this._clearData.clearScoreTime),'hh:mm:ss'));
            this._panel.getChildByName("Panel_winner").getChildByName("Text_2").setString(this._clearData.clearWinner+"");
            this._panel.getChildByName("Panel_winner").getChildByName("Text_4").setString(MjClient.dateFormat(new Date(this._clearData.clearWinnerTime),'yyyy-MM-dd')+"\n"+MjClient.dateFormat(new Date(this._clearData.clearWinnerTime),'hh:mm:ss'));

        }

    },
    initLayout:function(){
        var that = this;

        this._text_date = this._panel.getChildByName("image_date").getChildByName("Text");;
        var dateStr = MjClient.dateFormat(new Date(), 'yyyy-MM-dd');
        this.setTimeDay(dateStr,0);

        var btn_pre_date = this._panel.getChildByName("Button_pre_date");
        btn_pre_date.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.setTimeDay(this._text_date.getString(),-1);
                that.requestData();
            }
        }, this);
        var btn_next_date = this._panel.getChildByName("Button_next_date");


        btn_next_date.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.setTimeDay(this._text_date.getString(),1);
                that.requestData();
            }
        }, this);

        var btn_clear_score = this._panel.getChildByName("Panel_score").getChildByName("btn_clear");
        btn_clear_score.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if(that._clearData.clearScore == 0){
                    MjClient.showToast("未找到可清除的数据");
                    return;
                }
                var uiPara = {}
                uiPara.showTime = 0;
                uiPara.uiStyle = "friendcard_posUpMsg_daoshu";
                uiPara.msg = "确定清除"+unescape(that._data.itemData.nickname + "")+",ID"+that._data.itemData.userId+","+MjClient.dateFormat(new Date(that._clearData.clearScoreTime), 'yyyy-MM-dd hh:mm:ss')+"至"+MjClient.dateFormat(new Date(that._sendInfo.end), 'yyyy-MM-dd hh:mm:ss')+"的分数吗？";
               
                uiPara.msgRed = "清除数据将不可撤销，请谨慎操作！"
                uiPara.yes = function() {
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_qingchufenshu_queding", {uid:SelfUid()});
                    var sendInfo = {
                        start:that._clearData.clearScoreTime,
                        end:that._sendInfo.end
                    }
                    if(that._data.isLMClub){
                        sendInfo.leagueId =  that._data.clubData.info.clubId;
                    }else{
                        sendInfo.clubId =  that._data.clubData.info.clubId;
                    }
                    sendInfo.userId = that._data.itemData.userId;
                    sendInfo.score = that._clearData.clearScore;
                    FriendCard_Common.clubStatisClear(sendInfo,function (rtn) {
                        if (rtn.code == 0) {
                            MjClient.showToast("清除分数成功");
                            that.requestData();
                        }else {
                            if (rtn.message) {
                                MjClient.showToast(rtn.message);
                            } else {
                                MjClient.showToast("清除分数失败！");
                            }
                        }
                    });
                };
                uiPara.no = function () {
                   MjClient.native.umengEvent4CountWithProperty("Qinyouquan_qingchufenshu_quxiao", {uid:SelfUid()}); 
                }
                uiPara.close = function () {
                   MjClient.native.umengEvent4CountWithProperty("Qinyouquan_qingchufenshu_quxiao", {uid:SelfUid()}); 
                }
                that.addChild(new Friendcard_popUpMeg(uiPara))
            }
        }, this);
        var btn_clear_winner = this._panel.getChildByName("Panel_winner").getChildByName("btn_clear");
        btn_clear_winner.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if(that._clearData.clearWinner == 0){
                    MjClient.showToast("未找到可清除的数据");
                    return;
                }
                var uiPara = {}
                uiPara.showTime = 0;
                uiPara.uiStyle = "friendcard_posUpMsg_daoshu";
                uiPara.msg = "确定清除"+unescape(that._data.itemData.nickname + "")+",ID"+that._data.itemData.userId+","+MjClient.dateFormat(new Date(that._clearData.clearWinnerTime), 'yyyy-MM-dd hh:mm:ss')+"至"+MjClient.dateFormat(new Date(that._sendInfo.end), 'yyyy-MM-dd hh:mm:ss')+"的大赢家次数吗？";
                uiPara.msgRed = "清除数据将不可撤销，请谨慎操作！"
                uiPara.yes = function() {
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_qingchucishu_queding", {uid:SelfUid()});
                    var sendInfo = {
                        start:that._clearData.clearScoreTime,
                        end:that._sendInfo.end
                    }
                    if(that._data.isLMClub){
                        sendInfo.leagueId =  that._data.clubData.info.clubId;
                    }else{
                        sendInfo.clubId =  that._data.clubData.info.clubId;
                    }
                    sendInfo.userId = that._data.itemData.userId;
                    sendInfo.win = that._clearData.clearWinner;
                    FriendCard_Common.clubStatisClear(sendInfo,function (rtn) {
                        if (rtn.code == 0) {
                            MjClient.showToast("清除大赢家次数成功");
                            that.requestData();
                        }else {
                            if (rtn.message) {
                                MjClient.showToast(rtn.message);

                            } else {
                                MjClient.showToast("清除大赢家次数失败！");
                            }
                        }
                    });
                };
                uiPara.no = function () {
                   MjClient.native.umengEvent4CountWithProperty("Qinyouquan_qingchucishu_quxiao", {uid:SelfUid()}); 
                }
                uiPara.close = function () {
                   MjClient.native.umengEvent4CountWithProperty("Qinyouquan_qingchucishu_quxiao", {uid:SelfUid()}); 
                }
                that.addChild(new Friendcard_popUpMeg(uiPara))
            }
        }, this);

        if(((FriendCard_Common.isGroupLeader() || FriendCard_Common.isAssistants()) && (this._data.clubData.info.allowToViewClearScore +"").indexOf("1") > -1)
                || (FriendCard_Common.isOrdinaryMember() && (this._data.clubData.info.allowToViewClearScore +"").indexOf("2") > -1)){
            //没有清除按钮
            btn_clear_score.visible = false;
            btn_clear_winner.visible = false;
        }
        this.refreshView();
    }
});


/*
*统计查看成员
*/
var FriendCard_tongji_member = cc.Layer.extend({
    ctor: function(data,callbackFunc) {
        this._super();
        this._data = data;
        cc.log("FriendCard_tongji_member data",JSON.stringify(data))
        this._gameType = -1;
        this._callbackFunc = callbackFunc;
        this._maxSearchTime = 7;

        this._gameType = -1;
        this._ruleId = 0;
        this._selectedRenshu = -1;
        

        if (MjClient.systemConfig && (MjClient.systemConfig.tongjiWhiteUser === true)){
            this._maxSearchTime = 35;
        }
        var uiNode = ccs.load("friendcard_tongji_member.json").node;
        this.addChild(uiNode);
        var block = uiNode.getChildByName("Image_di");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = uiNode.getChildByName("Panel");
        this._panel = back;
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back)
        COMMON_UI.setNodeTextAdapterSize(back);

        var btn_close = back.getChildByName("Button_close");
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);
        this.initLayout();
        this.requestData();
        return true;
    },
    requestData:function(){

        var that = this;
        var nowTime = MjClient.getCurrentTime();
        var startTimeStr = this._text_date.getString();
        var startTime = FriendCard_Common.transdate(startTimeStr.substring(0, 4), Number(startTimeStr.substring(5, 7)) - 1, startTimeStr.substring(8, 10), 0, 0);
        var nowTime = FriendCard_Common.transdate(nowTime[0], nowTime[1] - 1, nowTime[2], "23", "59")
        this._timespan = Math.ceil((nowTime - startTime) / 86400000) //搜索时间跨度超过35天不显示分数
        if (this._timespan > this._maxSearchTime) {
            MjClient.showToast("系统只保存近"+this._maxSearchTime+"天的分数");
            return;
        }
        MjClient.block();
        var sendInfo = {
            startTime:startTime,
            endTime:startTime + 24 * 60 * 60 * 1000,
        }
        if(this._data.type == 1){
            sendInfo.group = this._data.group;
        }else if(this._data.type == 2){
            sendInfo.userId = this._data.refereeId;
        }
        if (this._selectedRenshu != -1) { //人数
            sendInfo.playerNum = this._selectedRenshu
        }
        //游戏类型
        if(this._gameType != -1){
            sendInfo.gameType = this._gameType;
        }
        if(this._ruleId){
            sendInfo.ruleId = this._ruleId;
        }
        var url;
        if(this._data.isLMClub){
            if(this._data.type == 2){
                url = "pkplayer.handler.leagueAssisStaFlow"
            }else{
                url = "pkplayer.handler.leagueGroupStaFlow"
            }
            sendInfo.leagueId =  this._data.clubData.info.clubId;
        }else{
            if(this._data.type == 2){
                url = "pkplayer.handler.clubAssisStaFlow"
            }else{
                url = "pkplayer.handler.clubGroupStaFlow"
            }
            sendInfo.clubId =  this._data.clubData.info.clubId;
        }
        cc.log("liushui sendInfo",JSON.stringify(sendInfo))
        MjClient.gamenet.request(url, sendInfo,function(rtn) {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(that))
                    return;
                if (rtn.code == 0) {
                    that._listView._data.list = rtn.data;
                    that._listView._data.top = rtn.top;
                    that.reflashListView();
                } else {
                    that._listView._data.list = [];
                    that._listView._data.top = {};
                    that.reflashListView();
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }
            }
        );
    },
    setTime:function(dateStr){
        this._text_date.setString(dateStr)
    },
    setTimeDay:function(dateStr,opt){
        var date = dateStr ? new Date(dateStr) : new Date();
        date.setDate(date.getDate()+opt);

        var txt_1 = date.getFullYear();
        var txt_2 = (date.getMonth() + 1) + "";
        var txt_3 = date.getDate() + "";
        txt_2 = txt_2.length <2? "0"+txt_2:txt_2;
        txt_3 = txt_3.length<2? "0"+txt_3:txt_3;
        this.setTime(txt_1+"-"+txt_2+"-"+txt_3);
    },
    reflashTopUI:function(){
        var panel_top = this._panel.getChildByName("Panel_top");
        var text_zongfen = panel_top.getChildByName("Text_zongfen");
        var text_zuanshiyeji = panel_top.getChildByName("Text_zuanshiyeji")
        var text_youxiaochangci = panel_top.getChildByName("Text_youxiaochangci")
        var text_youxiaorenci = panel_top.getChildByName("Text_youxiaorenci")
        var text_dayingjia = panel_top.getChildByName("Text_dayingjia")
        var text_huoyuerenshu = panel_top.getChildByName("Text_huoyuerenshu")

        if(!this._listView._data.top){
            return;
        }
        this._listView._data.top.playScore = this._listView._data.top.playScore || 0;
        this._listView._data.top.syceeIncome = this._listView._data.top.syceeIncome || 0;
        this._listView._data.top.effectPlayGame = this._listView._data.top.effectPlayGame || 0;
        this._listView._data.top.effectPlayUser = this._listView._data.top.effectPlayUser || 0;
        this._listView._data.top.playWinner = this._listView._data.top.playWinner || 0;
        this._listView._data.top.activePlayUser = this._listView._data.top.activePlayUser || 0;

/*        text_zongfen.setString("总分:"+this._listView._data.top.playScore);
        text_zuanshiyeji.setString("钻石业绩:"+this._listView._data.top.syceeIncome);
        text_youxiaochangci.setString("有效场次:"+this._listView._data.top.effectPlayGame.toFixed(2));
        text_youxiaorenci.setString("有效人次:"+this._listView._data.top.effectPlayUser);
        text_dayingjia.setString("大赢家:"+this._listView._data.top.playWinner);
        text_huoyuerenshu.setString("活跃人数:"+this._listView._data.top.activePlayUser);*/

        this.copyNodeWithStr(text_zongfen,"总分:",this._listView._data.top.playScore);
        this.copyNodeWithStr(text_zuanshiyeji,"钻石业绩:",this._listView._data.top.syceeIncome);
        this.copyNodeWithStr(text_youxiaochangci,"有效场次:",this._listView._data.top.effectPlayGame.toFixed(2));
        this.copyNodeWithStr(text_youxiaorenci,"有效人次:",this._listView._data.top.effectPlayUser);
        this.copyNodeWithStr(text_dayingjia,"大赢家:",this._listView._data.top.playWinner);
        this.copyNodeWithStr(text_huoyuerenshu,"活跃人数:",this._listView._data.top.activePlayUser);
    },
    copyNodeWithStr:function(node,str,str_content){
        node.setString(str);
        var _copyNode = node.clone();
        _copyNode.setName("NumberStr");
        _copyNode.setString(str_content);
        _copyNode.setTextColor(cc.color("#38aef"));
        if (!node.getChildByName("NumberStr")) {
            node.addChild(_copyNode);
        }
        _copyNode.setPosition(cc.p(node.getContentSize().width + 10,node.getContentSize().height / 2));
    },
    reflashListView:function(){
        var that = this;
        this.reflashTopUI();
        var data = this._listView._data.list;
        this._listView.removeAllItems();
        if(!data || data.length == 0){
            return;
        }
        for(var i = 0 ; i < data.length;i++){
            var itemData = data[i];
            var cell = this._listView._cell.clone();
            cell.visible = true;
            var image_head = cell.getChildByName("Image_head");
            image_head.isMask = true;
            COMMON_UI.refreshHead(this,itemData.headimgurl ? itemData.headimgurl : "png/default_headpic.png", image_head);
            var text_name = cell.getChildByName("Text_name");
            text_name.setString(""+getNewName(unescape(itemData.nickname),5));
            var text_ID = cell.getChildByName("Text_ID");
            text_ID.setString(""+itemData.userId);
            var text_fenshu = cell.getChildByName("Text_fenshu");
            text_fenshu.setString(""+itemData.playScore);
            var text_dayingjia = cell.getChildByName("Text_dayingjia");
            text_dayingjia.setString(""+itemData.playWinner);
            var text_youxiaochangci = cell.getChildByName("Text_youxiaochangci");
            text_youxiaochangci.setString(""+itemData.effectPlayGame.toFixed(2));
            var text_youxiaorenci = cell.getChildByName("Text_youxiaorenci");
            text_youxiaorenci.setString(""+itemData.effectPlayUser);
            var text_yeji = cell.getChildByName("Text_yeji");
            text_yeji.setString(""+itemData.syceeIncome);

            var btn_liushui = cell.getChildByName("Button_liushui");
            btn_liushui.data = itemData
            btn_liushui.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var data = {
                        isLMClub:that._data.isLMClub,
                        type:that._data.type,
                        clubData:that._data.clubData
                    }
                    
                    var startTimeStr = this._text_date.getString();
                    var startTime = FriendCard_Common.transdate(startTimeStr.substring(0, 4), Number(startTimeStr.substring(5, 7)) - 1, startTimeStr.substring(8, 10), 0, 0);
                    data.endTime = startTime + 24 * 60 * 60 * 1000;
                    data.startTime = startTime;
                    data.userInfo = sender.data;
                    that.addChild(new FriendCard_tongji_liushui(data));
                }
            }, this);
            var btn_zhanji = cell.getChildByName("Button_zhanji");
            btn_zhanji.data = itemData;
            btn_zhanji.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var startTimeStr = this._text_date.getString();
                    var startTime = FriendCard_Common.transdate(startTimeStr.substring(0, 4), Number(startTimeStr.substring(5, 7)) - 1, startTimeStr.substring(8, 10), 0, 0);

                    this._data.clubData.openPlayerInfo = sender.data;
                    this._data.clubData.openPlayerInfo.endTime = startTime + 24 * 60 * 60 * 1000;
                    this._data.clubData.openPlayerInfo.startTime = startTime;
                    this._data.clubData.openPlayerInfo.gameType = this._gameType;
                    this._data.clubData.openPlayerInfo.fensuData = {};
                    this._data.clubData.openPlayerInfo.fensuData.text = "不限分数";

                    if(MjClient.APP_TYPE.QXSYDTZ && (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)){
                        MjClient.FriendCard_main_ui.addChild(new FriendCard_roomRecord_daTongZi(this._data.clubData,"1"));
                    }else{
                        MjClient.FriendCard_main_ui.addChild(new FriendCard_roomRecord(this._data.clubData,"1"));
                    }
                }
            }, this);
            this._listView.pushBackCustomItem(cell);
        }

    },
    initLayout:function(){
        var that = this;

        this._listView = this._panel.getChildByName("list");
        this._listView._cell = this._panel.getChildByName("item");
        this._listView._cell.visible = false;
        this._listView._data = {};
        this._listView._data.list = []

        this.reflashListView();
        var panel_bottom = this._panel.getChildByName("Panel_bottom");
        this._text_date = panel_bottom.getChildByName("image_date").getChildByName("Text");;
        cc.log("this._data.startTime",this._data.startTime)
        var dateStr = MjClient.dateFormat(new Date(parseInt(this._data.startTime)), 'yyyy-MM-dd');
        this.setTimeDay(dateStr,0);

        var btn_pre_date = panel_bottom.getChildByName("Button_pre_date");
        btn_pre_date.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.setTimeDay(this._text_date.getString(),-1);
                that.requestData();
            }
        }, this);
        var btn_next_date = panel_bottom.getChildByName("Button_next_date");
        btn_next_date.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.setTimeDay(this._text_date.getString(),1);
                that.requestData();
            }
        }, this);
        this._btn_wanFa = panel_bottom.getChildByName("btn_wanFa");
        this._btn_wanFa.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var data = {event:"TONGJI_MEMBER_WANFA",clubId:this._data.clubData.info.clubId,addWanfaNum:FriendCard_Common.getRuleNumber()};
                that.addChild(new Friendcard_selectWanfa(data));
            }
        }, this);
        this._btn_wanFa.visible = false;
        UIEventBind(null, this._btn_wanFa, "TONGJI_MEMBER_WANFA", function (eD) {
            if(eD.wanfaIndex){
                this._btn_wanFa.getChildByName("Text").setString(eD.gameName);
                this._ruleId = eD.wanfaIndex;
                this._gameType = -1;
            }else if (eD.gameType != -1){
                this._btn_wanFa.getChildByName("Text").setString(eD.gameName);
                this._ruleId = null;
                this._gameType = eD.gameType;
            }else{
                this._btn_wanFa.getChildByName("Text").setString("全部玩法");
                this._ruleId = null;
                this._gameType = -1;
            }
            this._selectedRenshu = eD.renshu;
            this.requestData();
        }.bind(this));
    }
});

var FriendCard_tongji_liushui = cc.Layer.extend({
    ctor: function(data,callbackFunc) {
        this._super();
        this._data = data;
        cc.log("FriendCard_tongji_liushui data",JSON.stringify(data))
        this._callbackFunc = callbackFunc;
        var uiNode = ccs.load("friendcard_tongji_liushui.json").node;
        this.addChild(uiNode);
        var block = uiNode.getChildByName("Image_di");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = uiNode.getChildByName("Panel");
        this._panel = back;
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back)
        COMMON_UI.setNodeTextAdapterSize(back);

        var btn_close = back.getChildByName("Button_close");
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);
        this.initLayout();
        this.requestData();
        return true;
    },
    requestData:function(){
        var that = this;
        MjClient.block();
        var sendInfo = {
            userId:this._data.userInfo.userId,
            startTime:this._data.startTime,
            endTime:this._data.endTime,
        }
        var url;
        if(this._data.isLMClub){
            url = "pkplayer.handler.leagueUserGameFlow"
            sendInfo.leagueId =  this._data.clubData.info.clubId;
        }else{
            url = "pkplayer.handler.clubUserGameFlow"
            sendInfo.clubId =  this._data.clubData.info.clubId;
        }
        cc.log("UserGameFlow sendInfo",JSON.stringify(sendInfo))
        MjClient.gamenet.request(url, sendInfo,function(rtn) {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(that))
                    return;
                if (rtn.code == 0) {
                    that._listView._data.top = rtn.top;
                    that._listView._data.list = rtn.data;
                    that.reflashTopUI();
                    that.reflashListView();
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
    
    reflashTopUI:function(){
        var panel_Top = this._panel.getChildByName("Panel_top");
        var image_head = panel_Top.getChildByName("Image_head");
        var text_name = panel_Top.getChildByName("Text_name");
        var text_ID = panel_Top.getChildByName("Text_ID");

        image_head.isMask = true;
        COMMON_UI.refreshHead(this,this._data.userInfo.headimgurl ? this._data.userInfo.headimgurl : "png/default_headpic.png", image_head);
        text_name.setString(""+getNewName(unescape(this._data.userInfo.nickname),8));
        text_ID.setString(""+this._data.userInfo.userId);

        var text_date = panel_Top.getChildByName("Text_date");
        text_date.setString(""+MjClient.dateFormat(new Date(parseInt(this._data.startTime)), 'yyyy-MM-dd'));
        
        var text_zuanshi = panel_Top.getChildByName("Text_zuanshi");
        if(!this._listView._data.top){
            text_zuanshi.visible = false;
        }else{
            text_zuanshi.visible = true;
            var str = "应扣"+this._listView._data.top.syceeTotal+"  实扣"+this._listView._data.top.syceeCost
            if(this._listView._data.top.kpiMode == 1){
                str += " 均分钻石"+this._listView._data.top.kpiAmount
            }
            text_zuanshi.setString(str);
        }
    },
    reflashListView:function(){
        this.reflashTopUI();
        var data = this._listView._data.list;
        this._listView.removeAllItems();
        if(!data || data.length == 0){
            return;
        }
        for(var i = 0 ; i < data.length;i++){
            var itemData = data[i];
            var cell = this._listView._cell.clone();
            cell.visible = true;
            var text_content = cell.getChildByName("Text_content");
            
            var str = MjClient.dateFormat(new Date(parseInt(itemData.createTime)), 'yyyy-MM-dd hh:mm:ss')+" ";
            str += "房间号:"+itemData.roomNum+" ";
            if(itemData.syceeType == 2){
                str += "实收"
            }else if(itemData.syceeType == 1){
                str += "补扣"
            }
            str += itemData.syceeCost+"钻石 ";
            if(this._data.clubData.info.kpiMode == 1){
                str += "均分业绩"+itemData.kpiAmount+"钻石";
            }else{

            }
            text_content.setString(str);
            this._listView.pushBackCustomItem(cell);
        }

    },
    initLayout:function(){
        var that = this;
        this._listView = this._panel.getChildByName("list");
        this._listView._data = {};
        this._listView._data.list = [];
        this._listView._cell = this._panel.getChildByName("item");
        this._listView._cell.visible = false;
        this.reflashListView();
    }
});



var FriendCard_tip_club_guide = cc.Layer.extend({
    ctor: function() {
        this._super();
        var uiNode = ccs.load("friendcard_tip_club_guide.json").node;
        this.addChild(uiNode);
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = uiNode.getChildByName("back");
        this._panel = back;
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back)

        var btn_close = back.getChildByName("closeBtn");
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);
        if(cc.sys.isObjectValid(MjClient._FriendCard_tip_club_guide)){
            MjClient._FriendCard_tip_club_guide.removeFromParent(true);
        }
        MjClient._FriendCard_tip_club_guide = this;

        return true;
    },
    
});


var FriendCard_tip_create_club_guide = cc.Layer.extend({
    ctor: function() {
        this._super();
        var uiNode = ccs.load("friendcard_tip_create_club_guide.json").node;
        this.addChild(uiNode);
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = uiNode.getChildByName("back");
        this._panel = back;
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back)

        var btn_close = back.getChildByName("closeBtn");
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);

        var btn_gotoKefu = back.getChildByName("Button_gotoKefu");
        btn_gotoKefu.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_kefu_dianji", {uid:SelfUid()});
                if (!isCurrentNativeVersionBiggerThan("14.0.0"))
                {
                    MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 9 }, function (rtn) {
                        if (rtn.code == 0) {
                            MjClient.Scene.addChild(new NormalWebviewLayer(rtn.data));
                        }
                        else {
                            if (rtn.message) {
                                MjClient.showToast(rtn.message);
                            }
                            else {
                                MjClient.showToast("获取数据失败");
                            }
                        }
                    });
                }
                else{
                    MjClient.native.showQiYuChatDialog();
                }
                this.removeFromParent(true)
            }
        }, this);
        
        return true;
    },
    
});

//俱乐部商城相关

/*
 俱乐部商城订单审核弹窗提示
 */
var Friendcard_shop_shenhePopMsg = cc.Layer.extend({
    ctor:function (data) {
        this._super();

        var msgui = ccs.load("friendcard_shop_shenhePopMsg.json");
        this.addChild(msgui.node);

        var _back = msgui.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 1], [0, 0]);
        COMMON_UI.setNodeTextAdapterSize(_back);
        var that = this;
        this.data = data;
        this.isCurUI = false; //可能出现多个审核UI, 这个判断当前操作是否是此UI
        _back.y = _back.y + _back.height;

        var moveTo1 = cc.moveTo(0.3, cc.p(_back.x, _back.y - _back.height));

        var callFunc2 = cc.callFunc(function() {});
        _back.runAction(cc.sequence(moveTo1, callFunc2));

        var btn_no = _back.getChildByName("btn_no");
        var btn_close = _back.getChildByName("btn_close");
        var btn_ok = _back.getChildByName("btn_ok");

        var player_name = _back.getChildByName("player_name");
        var player_ID = _back.getChildByName("player_ID");
        var player_head = _back.getChildByName("player_head");
        var text_content = _back.getChildByName("Text_content");
        

        player_name.setString(getNewName(unescape(data.nickname),5));
        player_name.setFontName("Arial");
        player_name.setFontSize(25);
        player_ID.setString("（" + data.userId + "）");

        var contentStr = "购买" + data.goodsData.amount + "钻石";
        if(data.goodsData.present){
            contentStr += ",赠送"+data.goodsData.present + "钻石";
        }
        text_content.setString(contentStr);

        player_ID.x = player_head.x - player_ID.width - player_head.width / 2 - 5;
        player_name.x = player_ID.x - player_name.width - 5;

        MjClient.loadImgQX(data.headimgurl ? data.headimgurl : "png/default_headpic.png", {
            isCrossOrigin: true
        }, function(err, texture) {
            if (err || !texture || !sys.isObjectValid(player_head))
                return;

            var sp = new cc.Sprite(texture);
            if (!sp)
                return;

            sp.setScale((player_head.width - 8) / sp.width);
            sp.setPosition(cc.p(player_head.width / 2, player_head.height / 2));
            player_head.addChild(sp);
        });


        var request = function(pass) {
            MjClient.block();
            var sendInfo = {
                orderId: data.orderId,
                status: pass
            }
            cc.log("auditDiamondOrder sendInfo",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.auditDiamondOrder", sendInfo, function(rtn) {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(that)) {
                    return;
                }

                if (rtn.code == 0) {
                    MjClient.showToast(rtn.message);
                } else {
                    FriendCard_Common.serverFailToast(rtn);
                }
                that.removeFromParent();
            });
        }

        

        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);
        btn_ok.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var itemData = this.data;
                for(var key in itemData.goodsData){
                    itemData[key] = itemData.goodsData[key];
                }
                delete itemData.goodsData;
                that.addChild(new Friendcard_shop_confirm_sheet(itemData,1,function(){
                    request(1);
                }))
            }
        }, this);
        btn_no.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var itemData = this.data;
                for(var key in itemData.goodsData){
                    itemData[key] = itemData.goodsData[key];
                }
                delete itemData.goodsData;
                that.addChild(new Friendcard_shop_confirm_sheet(itemData,0,function(){
                    request(0);
                }))
            }
        }, this);
        _back.addTouchEventListener(function(sender, type) {
            if (type == 0) {
                this.isCurUI = true;
            }
        }, this);

        function closeMe() {
            if (!that.isCurUI)
                return;

            var moveTo1 = cc.moveTo(0.3, cc.p(_back.x, _back.y + _back.height));

            var callFunc2 = cc.callFunc(function() {
                that.removeFromParent();
            });
            _back.runAction(cc.sequence(moveTo1, callFunc2));
        }

        function intoMoveCloseMe() {
            that.touchListener = cc.EventListener.create(getTouchListener());
            cc.eventManager.addListener(that.touchListener, _back.getChildByName("touch"));
        }

        function getTouchListener() {
            var isClose = false;
            var ret = {
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: false,
                onTouchBegan: function(touch, event) {
                    return true;
                },
                onTouchMoved: function(touch, event) {

                    if (!touch._py)
                        touch._py = touch.getLocation().y;

                    if (touch._py < (_back.y - _back.height)) {
                        touch._py = false;
                        return false;
                    }
                    var curPy = touch.getLocation().y;

                    if (touch._py <= (curPy - 10)) {
                        isClose = true
                    }
                    return true;

                },
                onTouchEnded: function(touch, event) {
                    if (isClose) {
                        closeMe();
                    }
                }
            };
            return ret;
        }
        intoMoveCloseMe();

        return true;
    }
});


//俱乐部商城确认订单弹窗
var Friendcard_shop_commit_sheet = cc.Layer.extend({
    ctor:function (data,callbackFunc) {
        this._super();
        var node = ccs.load("friendcard_shop_commit_sheet.json").node;
        this._data = data;
        this._callbackFunc = callbackFunc;
        this.addChild(node);
        var _block = node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);
        this.initPopUpMegUI(node);
        popupAnm(this._back)
        return true;
    },
    initPopUpMegUI: function(node,uiPara) {
        var _back = node.getChildByName("Panel");
        setWgtLayout(_back,[1,1],[0.5,0.5],[0,0],false);
        this._back = _back;
        var _no = _back.getChildByName("no");

        _no.addTouchEventListener(function(sender,Type){
            switch (Type){
                case ccui.Widget.TOUCH_ENDED:
                    this.removeFromParent(true);
                    break;
                default :
                    break;
            }
        },this);

        var btn_close = _back.getChildByName("btn_close");
        btn_close.addTouchEventListener(function(sender,Type){
            switch (Type){
                case ccui.Widget.TOUCH_ENDED:
                    this.removeFromParent(true);
                    break;
                default :
                    break;
            }
        },this);

        var _msg = _back.getChildByName("msg");
        _msg.setString("确认发起"+this._data.price+"元订单");
        var _yes = _back.getChildByName("yes");
        _yes.addTouchEventListener(function(sender,Type){
            switch (Type){
                case ccui.Widget.TOUCH_ENDED:
                    this.removeFromParent(true);
                    if(this._callbackFunc){
                        this._callbackFunc();
                    }
                    break;
                default :
                    break;
            }
        },this);
        
        return true;
    },
    
});

//俱乐部审核商城订单确认弹窗  type =1确认同意，type0,确认拒绝
var Friendcard_shop_confirm_sheet = cc.Layer.extend({
    ctor:function (data,type,callbackFunc) {
        this._super();
        var node = ccs.load("friendcard_shop_confirm_sheet.json").node;
        this._data = data;
        this._type = type;
        this._callbackFunc = callbackFunc;
        this.addChild(node);
        var _block = node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);
        this.initPopUpMegUI(node);
        popupAnm(this._back)
        return true;
    },
    initPopUpMegUI: function(node,uiPara) {
        var _back = node.getChildByName("Panel");
        setWgtLayout(_back,[1,1],[0.5,0.5],[0,0],false);
        this._back = _back;

        var text_title = _back.getChildByName("Text_title");
        if(text_title){
            if(this._type == 1){
                text_title.setString("  同意订单  ");
            }else{
                text_title.setString("  拒绝订单  ");
            }
        }
        var image_title = _back.getChildByName("Image_title");
        if(image_title){
            if(this._type == 1){
                image_title.loadTexture("friendCards/title/title_tongyidingdan.png")
            }else{
                image_title.loadTexture("friendCards/title/title_jujuedingdan.png")
            }
        }
        var _no = _back.getChildByName("no");

        _no.addTouchEventListener(function(sender,Type){
            switch (Type){
                case ccui.Widget.TOUCH_ENDED:
                    this.removeFromParent(true);
                    break;
                default :
                    break;
            }
        },this);

        var btn_close = _back.getChildByName("btn_close");
        btn_close.addTouchEventListener(function(sender,Type){
            switch (Type){
                case ccui.Widget.TOUCH_ENDED:
                    this.removeFromParent(true);
                    break;
                default :
                    break;
            }
        },this);

        var head = _back.getChildByName("Image_head");
        head.isMask = true;
        COMMON_UI.refreshHead(this, this._data.headimgurl ? this._data.headimgurl : "png/default_headpic.png", head);
        // 名称
        var name = _back.getChildByName("Text_name");
        name.ignoreContentAdaptWithSize(true);
        name.setString(getNewName(unescape(this._data.nickname),5));

        // 玩家ID
        var id = _back.getChildByName("Text_ID");
        id.ignoreContentAdaptWithSize(true);
        id.setString(unescape(this._data.userId));

        var text_content = _back.getChildByName("Text_content");
        var contentStr = "在ID"+this._data.sellerId+"的商城购买"+this._data.amount+"颗钻石";
        if(this._data.present){
            contentStr += ",加送"+this._data.present+"颗钻石";
        }
        text_content.setString(contentStr);

        var _yes = _back.getChildByName("yes");
        _yes.addTouchEventListener(function(sender,Type){
            switch (Type){
                case ccui.Widget.TOUCH_ENDED:
                    this.removeFromParent(true);
                    if(this._callbackFunc){
                        this._callbackFunc();
                    }
                    break;
                default :
                    break;
            }
        },this);
        
        return true;
    },
    
});

// 代理授权审核订单人员列表
var Friendcard_shop_manager = cc.Layer.extend({
    ctor:function (data) {
        this._super();
        this._data = data;
        var node = ccs.load("friendcard_shop_manager.json").node;
        this.addChild(node);
        this.node = node;
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0]);
        
        popupAnm(node.getChildByName("Panel"));
        this.initShopManagerListLayer()
        this.rquestShopManagerList()
    },
    //请求列表
    rquestShopManagerList:function(){

        var that = this;
        MjClient.block();
        var sendInfo = {
            pageLen:10000
        };
        MjClient.gamenet.request("pkplayer.handler.listAuditAdmin", sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            if(rtn.code == 0){
                that._listView._data = rtn.data;
                that.refreshShopManagerList();
            }
            else{
                FriendCard_Common.serverFailToast(rtn);
            }  
        });
    },
    //刷新列表
    refreshShopManagerList:function()
    {
        if(!cc.sys.isObjectValid(this.item)) return;

        var listView = this._listView;
        var cell = this.item;
        cell.visible = false;
        listView.removeAllItems();
        for (var i = 0; i < this._listView._data.length ; i ++){
            var item = cell.clone();
            listView.pushBackCustomItem(item);
            this.createItem(item, i);
            item.visible = true;
            item.dataIndex = i;
        }
        if(this._listView._data.length == 0)
            this.text_nullTip.visible = true;
        else
            this.text_nullTip.visible = false;
    },
    createItem:function(item,index)
    {
        var that = this;
        var itemData = this._listView._data[index];
        //createTime
        var image_head = item.getChildByName("Image_head");
        image_head.isMask = true;
        COMMON_UI.refreshHead(this,itemData.headimgurl,image_head)
        
        var text_nickname = item.getChildByName("Text_nickname");
        text_nickname.setString(""+getNewName(unescape(itemData.nickname),5))

        var text_id = item.getChildByName("Text_id");
        text_id.setString("ID:"+itemData.userId);

        //删除
        item.getChildByName("Button_delete").addTouchEventListener(function(sender, type){
            if (type == 2){
                MjClient.block();
                var sendInfo = {
                    userId:itemData.userId,
                    status:0,
                }
                cc.log("setAuditAdmin sendInfo",JSON.stringify(sendInfo));
                MjClient.gamenet.request("pkplayer.handler.setAuditAdmin", sendInfo,  function(rtn)
                {
                    MjClient.unblock();
                    if(rtn.code == 0){
                        that._listView._data.splice(index, 1);
                        that.refreshShopManagerList();
                        MjClient.showToast("撤销订单审核员成功！");
                    }
                    else{
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
            }
        }, this);
        
    },
    initShopManagerListLayer:function()
    {
        var panel = this.node.getChildByName("Panel");
        this._listView = panel.getChildByName("list");
        this.item = panel.getChildByName("item");
        this.text_nullTip = panel.getChildByName("Text_nullTip");
        this.text_nullTip.visible = false;
        this.item.visible = false;

        
        panel.getChildByName("Button_add").addTouchEventListener(function(sender, type){
        if (type == 2)
            {
                this.addChild(new Friendcard_shop_manager_add(this._data));
            }
        }, this);

        var _close = panel.getChildByName("Button_close")
        _close.addTouchEventListener(function(sender, type){
        if (type == 2)
            {
                this.removeFromParent();
            }
        }, this);
        closeBtnAddLight(_close);

        UIEventBind(null, this, "shopManagerListAdd", function(rtn) {
            this.rquestShopManagerList();
        }, this);
    },
    onExit: function () {
        this._super();
    },
});

// 添加亲友圈商城审核员名单
var Friendcard_shop_manager_add = cc.Layer.extend({
    ctor:function (data) {
        this._super();
        this._data = data;
        var node = ccs.load("friendcard_shop_manager_add.json").node;
        this.addChild(node);
        this.node = node;
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1,1], [0.5, 0.5], [0, 0]);

        popupAnm(node.getChildByName("Panel"));
        this.initShopManagerListAddLayer();  
    },
    initShopManagerListAddLayer:function()
    {
        var that = this;
        var panel = this.node.getChildByName("Panel");
        //修改EditBox配置
        var setEditBoxConfig = function(_parent,_child,str) {
            _child.setFontColor(cc.color(0x40, 0x40, 0x40));
            _child.setMaxLength(8);
            _child.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            _child.setFontSize(24);
            _child.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            _child.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            _child.setPlaceHolder(str);
            _child.setFontName("fonts/lanting.TTF");
            _child.setPlaceholderFontSize(24);
            _child.setPosition(_parent.getContentSize().width / 2, _parent.getContentSize().height / 2);
            _parent.addChild(_child);
            
        }.bind(this);

        var img_userId = panel.getChildByName("img_userId");
        this.edtUserId = new cc.EditBox(img_userId.getContentSize(), new cc.Scale9Sprite("friendCards/common/img_dikuang.png"));
        setEditBoxConfig(img_userId,this.edtUserId,"请输入玩家ID");

        img_userId.getChildByName("btn_inquire").addTouchEventListener(function(sender, type){
            if (type == 2){
                var idStr = this.edtUserId.getString();
                var id = Number(idStr);
                if (!id || id < 1000){
                    MjClient.showToast("请输入正确的玩家id！");
                    return;
                }
                MjClient.block();
                MjClient.gamenet.request("pkcon.handler.getUserInfo", {userId: id},  function(rtn)
                {
                    MjClient.unblock();
                    if(rtn.code == 0 && rtn.data){
                        that.setplayerInfo(rtn.data);
                    }
                    else{
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
            }
        }, this);

        //玩家信息
        this.playerHeadNode = panel.getChildByName("playerHead");
        this.playerHeadNode.canVisible = function(){
            return this._data ? true : false;
        }
        this.playerHeadNode.visible = false;

        //确认按钮
        var btn_OK = panel.getChildByName("btn_OK");
        btn_OK.addTouchEventListener(function(sender, type){
            if (type == 2){
                if(!this.playerHeadNode._data){
                    return;
                }
                var sendInfo = {
                    userId:this.playerHeadNode._data.userId,
                    status:1,
                }
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.setAuditAdmin", sendInfo,  function(rtn)
                {
                    MjClient.unblock();
                    if(rtn.code == 0){
                        that.removeFromParent();
                        MjClient.showToast("添加订单审核员成功！");
                        postEvent("shopManagerListAdd");
                    }
                    else{
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
                
            }
        }, this);
        var btn_cancel = panel.getChildByName("no");
        btn_cancel.addTouchEventListener(function(sender, type){
            if (type == 2){
                that.removeFromParent();
            }
        }, this);
        
        //关闭按钮
        var close = panel.getChildByName("btn_close");
        close.addTouchEventListener(function(sender, type){
        if (type == 2)
            {
                that.removeFromParent();
            }
        }, this);
        closeBtnAddLight(close);
    },
    setplayerInfo:function(playerData){
        var player  = this.playerHeadNode;
        player.getChildByName("player_name").setString(getNewName(unescape(playerData.nickname),5));
        player.getChildByName("player_ID").setString("" + playerData.userId);
        player.isMask = true;
        COMMON_UI.refreshHead(this, playerData.headimgurl, player);
        player.visible = true;
        player._data = playerData;
    },
    onExit: function () {
        this._super();
    },
});

// 代理授权亲友圈商城免审核列表
var Friendcard_shop_audit_free = cc.Layer.extend({
    _grade:5,//每档5
    _maxAmount:200,
    _minAmount:35,
    ctor:function (data) {
        this._super();
        this._data = data;
        var node = ccs.load("friendcard_shop_audit_free.json").node;
        this.addChild(node);
        this.node = node;
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0]);
        
        popupAnm(node.getChildByName("Panel"));
        this.initShopAuditFreeListLayer()
        this.rquestShopAuditFreeList()
    },
    //请求列表
    rquestShopAuditFreeList:function(){

        var that = this;
        MjClient.block();
        var sendInfo = {};
        MjClient.gamenet.request("pkplayer.handler.listCreditUser", sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            if(!cc.sys.isObjectValid(that)){
                return;
            }
            if(rtn.code == 0){
                that._listView._data = rtn.data;
                that.refreshShopAuditFreeList();
            }
            else{
                FriendCard_Common.serverFailToast(rtn);
            }  
        });
    },
    //刷新列表
    refreshShopAuditFreeList:function()
    {
        var that = this;
        if(!cc.sys.isObjectValid(this.item)) return;
        this._showingDeleteNode = null;
        var listView = this._listView;
        var cell = this.item;
        cell.visible = false;
        listView.removeAllChildren();
        
        var innerHeight = this._listView._data.length * cell.height;
        if(innerHeight < listView.height){
            innerHeight = listView.height;
        }
        innerHeight += 50;
        listView.setInnerContainerSize(cc.size(listView.getInnerContainerSize().width,innerHeight))
        
        for (var i = 0; i < this._listView._data.length ; i ++){
            var item = cell.clone();
            item.setPosition(cc.p(listView.width/2,innerHeight - i * cell.height))
            listView.addChild(item);
            this._listView._data[i].useAmount = this._listView._data[i].amount - this._listView._data[i].balance;
            this.createItem(item, i);
            item.visible = true;
            item.dataIndex = i;
        }

        var node_check_touch = this._node_check_touch.clone();
        node_check_touch.visible = true;
        listView.addChild(node_check_touch);
        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function(touch, event) {
                if(cc.sys.isObjectValid(that._showingDeleteNode)){
                    var p = node_check_touch.getParent().convertToNodeSpace(touch.getLocation());
                    if (!cc.rectContainsPoint(that._showingDeleteNode.getBoundingBox(), p)) {
                        that._showingDeleteNode._image_zhezhao.visible = false;
                        that._showingDeleteNode = null;
                    }
                }
                return false;
            },
        });
        cc.eventManager.addListener(touchListener,node_check_touch);

        if(this._listView._data.length == 0)
            this.text_nullTip.visible = true;
        else
            this.text_nullTip.visible = false;
    },
    createItem:function(item,index)
    {
        var that = this;
        var itemData = this._listView._data[index];
        //createTime
        var image_head = item.getChildByName("Image_head");
        image_head.isMask = true;
        COMMON_UI.refreshHead(this,itemData.headimgurl,image_head)
        
        var text_nickname = item.getChildByName("Text_nickname");
        text_nickname.setString(""+getNewName(unescape(itemData.nickname),5))

        var text_id = item.getChildByName("Text_id");
        text_id.setString("ID:"+itemData.userId);


        var cb_allow = item.getChildByName("cb_allow");
        cb_allow.ignoreContentAdaptWithSize(true);
        cb_allow.setSelected(itemData.state == 1 ? true : false);
        cb_allow.addTouchEventListener(function(sender,type){
            if(type == 2){
                itemData.state = sender.isSelected() ? 0 : 1;
                that.setCreditUserPrototype(item,index,1);
            }
        })
        var text_total_amount = item.getChildByName("Text_total_amount");
        text_total_amount.setString(""+itemData.amount);
        var btn_sub = item.getChildByName("btn_sub");
        btn_sub.addTouchEventListener(function(sender,type){
            if(type == 2){
                itemData.amount -= that._grade;
                if(itemData.amount < that._minAmount){
                    itemData.amount = that._maxAmount;
                }
                text_total_amount.setString(""+itemData.amount);
                item.stopActionByTag(20190829);
                var action =cc.sequence(cc.delayTime(0.8),cc.callFunc(function(){
                    that.setCreditUserPrototype(item,index,2);
                }));
                action.setTag(20190829);
                item.runAction(action);
            }
        })
        var btn_add = item.getChildByName("btn_add");
        btn_add.addTouchEventListener(function(sender,type){
            if(type == 2){
                itemData.amount += that._grade;
                if(itemData.amount > that._maxAmount){
                    itemData.amount = that._minAmount;
                }
                text_total_amount.setString(""+itemData.amount);
                item.stopActionByTag(20190829);
                var action =cc.sequence(cc.delayTime(0.8),cc.callFunc(function(){
                    that.setCreditUserPrototype(item,index,2);
                }));
                action.setTag(20190829);
                item.runAction(action);
            }
        })
        var text_use_amount = item.getChildByName("Text_use_amount");
        text_use_amount.setString(""+itemData.useAmount);

        item.getChildByName("Button_reflash").addTouchEventListener(function(sender, type){
            if (type == 2){
                that.setCreditUserPrototype(item,index,3);
            }
        });
        var image_zhezhao = item.getChildByName("Image_zhezhao");
        image_zhezhao.visible = false;
        //删除
        image_zhezhao.getChildByName("Button_delete").addTouchEventListener(function(sender, type){
            if (type == 2){
                MjClient.block();
                var sendInfo = {
                    userId:itemData.userId,
                    status:0,
                }
                cc.log("setCreditUser sendInfo",JSON.stringify(sendInfo));
                MjClient.gamenet.request("pkplayer.handler.setCreditUser", sendInfo,  function(rtn)
                {
                    MjClient.unblock();
                    if(!cc.sys.isObjectValid(that)){
                        return;
                    }
                    if(rtn.code == 0){
                        that._listView._data.splice(index, 1);
                        that.refreshShopAuditFreeList();
                        MjClient.showToast("删除订单免审成功！");
                    }
                    else{
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
            }
        }, this);

        image_zhezhao.getChildByName("Button_cancle").addTouchEventListener(function(sender, type){
            if (type == 2){
                sender.getParent().visible = false;
            }
        }, this);
        item._image_zhezhao = image_zhezhao;
        var node_longClick = item.getChildByName("node_longClick");
        node_longClick.addTouchEventListener(function(sender,type){
            cc.log("node_longClick type",type)
            if(type == 0){
                sender.runAction(cc.sequence(cc.delayTime(1.2),cc.callFunc(function(){
                    if(cc.sys.isObjectValid(that._showingDeleteNode)){
                        that._showingDeleteNode._image_zhezhao.visible = false;
                        that._showingDeleteNode = null;
                    }
                    that._showingDeleteNode = item;
                    image_zhezhao.visible = true;
                })))
            }else if(type == 2){
                sender.stopAllActions();
                
                
            }
        })
    },
    setCreditUserPrototype:function(item,index,type){
        var that = this;
        var itemData = this._listView._data[index];

        MjClient.block();
        var sendInfo = {
            id:itemData.id,
            type:type,
        }
        if(type == 2){
            sendInfo.value = itemData.amount;
        }else if(type == 1){
            sendInfo.value = itemData.state;
        }
        cc.log("setCreditUserPrototype sendInfo",JSON.stringify(sendInfo));
        MjClient.gamenet.request("pkplayer.handler.setCreditUserPrototype", sendInfo,  function(rtn)
        {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(that)){
                return;
            }
            if(rtn.code == 0){
                if(type == 3){
                    itemData.useAmount = 0;
                    item.getChildByName("Text_use_amount").setString(""+itemData.useAmount)
                    MjClient.showToast("刷新成功");
                }
            }
            else{
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },
    initShopAuditFreeListLayer:function()
    {
        var that = this;
        var panel = this.node.getChildByName("Panel");
        this._listView = panel.getChildByName("ScrollView");
        this.item = panel.getChildByName("item");
        this.text_nullTip = panel.getChildByName("Text_nullTip");
        this.text_nullTip.visible = false;
        this.item.visible = false;


        //当时删除模式，没点中item，取消删除模式
        this._node_check_touch = panel.getChildByName("node_check_touch");
        this._node_check_touch.visible = false;
        
        
        
        panel.getChildByName("Button_add").addTouchEventListener(function(sender, type){
        if (type == 2)
            {
                this.addChild(new Friendcard_shop_audit_free_add(this._data));
            }
        }, this);

        var _close = panel.getChildByName("Button_close")
        _close.addTouchEventListener(function(sender, type){
        if (type == 2)
            {
                this.removeFromParent();
            }
        }, this);
        closeBtnAddLight(_close);

        UIEventBind(null, this, "shopAuditFreeListAdd", function(rtn) {
            this.rquestShopAuditFreeList();
        }, this);
    },
    onExit: function () {
        this._super();
    },
});

// 添加亲友圈商城免审核名单
var Friendcard_shop_audit_free_add = cc.Layer.extend({
    ctor:function (data) {
        this._super();
        this._data = data;
        var node = ccs.load("friendcard_shop_audit_free_add.json").node;
        this.addChild(node);
        this.node = node;
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1,1], [0.5, 0.5], [0, 0]);

        popupAnm(node.getChildByName("Panel"));
        this.initShopAuditFreeAddLayer();  
    },
    initShopAuditFreeAddLayer:function()
    {
        var that = this;
        var panel = this.node.getChildByName("Panel");
        //修改EditBox配置
        var setEditBoxConfig = function(_parent,_child,str) {
            _child.setFontColor(cc.color(0x40, 0x40, 0x40));
            _child.setMaxLength(8);
            _child.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            _child.setFontSize(24);
            _child.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            _child.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            _child.setPlaceHolder(str);
            _child.setFontName("fonts/lanting.TTF");
            _child.setPlaceholderFontSize(24);
            _child.setPosition(_parent.getContentSize().width / 2, _parent.getContentSize().height / 2);
            _parent.addChild(_child);
            
        }.bind(this);

        var img_userId = panel.getChildByName("img_userId");
        this.edtUserId = new cc.EditBox(img_userId.getContentSize(), new cc.Scale9Sprite("friendCards/common/img_dikuang.png"));
        setEditBoxConfig(img_userId,this.edtUserId,"请输入玩家ID");

        img_userId.getChildByName("btn_inquire").addTouchEventListener(function(sender, type){
            if (type == 2){
                var idStr = this.edtUserId.getString();
                var id = Number(idStr);
                if (!id || id < 1000){
                    MjClient.showToast("请输入正确的玩家id！");
                    return;
                }
                MjClient.block();
                MjClient.gamenet.request("pkcon.handler.getUserInfo", {userId: id},  function(rtn)
                {
                    MjClient.unblock();
                    if(!cc.sys.isObjectValid(that)){
                        return;
                    }
                    if(rtn.code == 0 && rtn.data){
                        that.setplayerInfo(rtn.data);
                    }
                    else{
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
            }
        }, this);

        //玩家信息
        this.playerHeadNode = panel.getChildByName("playerHead");
        this.playerHeadNode.canVisible = function(){
            return this._data ? true : false;
        }
        this.playerHeadNode.visible = false;

        //确认按钮
        var btn_OK = panel.getChildByName("btn_OK");
        btn_OK.addTouchEventListener(function(sender, type){
            if (type == 2){
                if(!this.playerHeadNode._data){
                    return;
                }
                var sendInfo = {
                    userId:this.playerHeadNode._data.userId,
                    status:1,
                }
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.setCreditUser", sendInfo,  function(rtn)
                {
                    MjClient.unblock();
                    if(!cc.sys.isObjectValid(that)){
                        return;
                    }
                    if(rtn.code == 0){
                        that.removeFromParent();
                        MjClient.showToast("添加订单免审成功！");
                        postEvent("shopAuditFreeListAdd");
                    }
                    else{
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
                
            }
        }, this);
        var btn_cancel = panel.getChildByName("no");
        btn_cancel.addTouchEventListener(function(sender, type){
            if (type == 2){
                that.removeFromParent();
            }
        }, this);
        //关闭按钮
        var close = panel.getChildByName("btn_close");
        close.addTouchEventListener(function(sender, type){
        if (type == 2)
            {
                that.removeFromParent();
            }
        }, this);
        closeBtnAddLight(close);
    },
    setplayerInfo:function(playerData){
        var player  = this.playerHeadNode;
        player.getChildByName("player_name").setString(getNewName(unescape(playerData.nickname),5));
        player.getChildByName("player_ID").setString("" + playerData.userId);
        player.isMask = true;
        COMMON_UI.refreshHead(this, playerData.headimgurl, player);
        player.visible = true;
        player._data = playerData;
    },
    onExit: function () {
        this._super();
    },
});

// 亲友圈商城赠送
var Friendcard_shop_send = cc.Layer.extend({
    ctor:function (data) {
        this._super();
        this._data = data;
        var node = ccs.load("friendcard_shop_send.json").node;
        this.addChild(node);
        this.node = node;
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1,1], [0.5, 0.5], [0, 0]);

        popupAnm(node.getChildByName("Panel"));
        this.initLayer();
        this.getDiamondStock(); 
    },
    getDiamondStock:function(){
        var that = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.getDiamondStock", {},  function(rtn)
        {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(that)){
                return;
            }
            if(rtn.data && "inventory" in rtn.data){
                that.text_zuanshiCount.setString(""+rtn.data.inventory);
            }
        });
    },
    initLayer:function(){
        var that = this;
        var panel = this.node.getChildByName("Panel");

        this.text_zuanshiCount = panel.getChildByName("Text_zuanshiCount");
        this.text_zuanshiCount.setString("");

        var btn_send_record = panel.getChildByName("btn_send_record");
        btn_send_record.addTouchEventListener(function(sender,type){
            if(type == 2){
                that.addChild(new Friendcard_shop_send_record());
            }
        })

        //修改EditBox配置
        var setEditBoxConfig = function(_parent,_child,str) {
            _child.setFontColor(cc.color(0x40, 0x40, 0x40));
            _child.setMaxLength(8);
            _child.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            _child.setFontSize(24);
            _child.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            _child.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            _child.setPlaceHolder(str);
            _child.setFontName("fonts/lanting.TTF");
            _child.setPlaceholderFontSize(24);
            _child.setPosition(_parent.getContentSize().width / 2, _parent.getContentSize().height / 2);
            _parent.addChild(_child);
            
        }.bind(this);

        var img_userId = panel.getChildByName("img_userId");
        this.edtUserId = new cc.EditBox(img_userId.getContentSize(), new cc.Scale9Sprite("friendCards/common/img_dikuang.png"));
        setEditBoxConfig(img_userId,this.edtUserId,"请输入玩家ID");

        img_userId.getChildByName("btn_inquire").addTouchEventListener(function(sender, type){
            if (type == 2){
                var idStr = this.edtUserId.getString();
                var id = Number(idStr);
                if (!id || id < 1000){
                    MjClient.showToast("请输入正确的玩家id！");
                    return;
                }
                MjClient.block();
                MjClient.gamenet.request("pkcon.handler.getUserInfo", {userId: id},  function(rtn)
                {
                    MjClient.unblock();
                    if(!cc.sys.isObjectValid(that)){
                        return;
                    }
                    if(rtn.code == 0 && rtn.data){
                        that.setplayerInfo(rtn.data);
                    }
                    else{
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
            }
        }, this);
        this.img_send = panel.getChildByName("img_send");
        this.edtSend = new cc.EditBox(this.img_send.getContentSize(), new cc.Scale9Sprite("friendCards/common/img_dikuang.png"));
        setEditBoxConfig(this.img_send,this.edtSend,"请输入赠送钻石数量");
        this.img_send.visible = false;
        //玩家信息
        this.playerHeadNode = panel.getChildByName("playerHead");
        this.playerHeadNode.canVisible = function(){
            return this._data ? true : false;
        }
        this.playerHeadNode.visible = false;

        //确认按钮
        var btn_OK = panel.getChildByName("btn_OK");
        btn_OK.addTouchEventListener(function(sender, type){
            if (type == 2){
                if(!this.playerHeadNode._data){
                    return;
                }
                if(!this.edtSend.getString()){
                    return;
                }
                var uiPara = {}
                uiPara.msg = "确定赠送玩家"+getNewName(unescape(that.playerHeadNode._data.nickname))+"(ID:"+that.playerHeadNode._data.userId+")\n"+that.edtSend.getString()+"钻石吗?";
                uiPara.yes = function() {
                    var zuanShiValue = parseInt(that.edtSend.getString());
                    var sendInfo = {
                        userId:that.playerHeadNode._data.userId,
                        value:zuanShiValue,
                    }
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.giveDiamond", sendInfo,  function(rtn)
                    {
                        MjClient.unblock();
                        if(!cc.sys.isObjectValid(that)){
                            return;
                        }
                        if(rtn.code == 0){
                            MjClient.showToast("赠送成功！");
                            if(rtn.data && ("inventory" in rtn.data)){
                                that.text_zuanshiCount.setString(""+rtn.data.inventory);
                            }
                        }
                        else{
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                }
                uiPara.no = function() {
                }
                uiPara.close = function() {
                }
                this.addChild(new Friendcard_popUpMeg(uiPara))

                
                
            }
        }, this);

        var btn_cancel = panel.getChildByName("no");
        btn_cancel.addTouchEventListener(function(sender, type){
            if (type == 2){
                that.removeFromParent();
            }
        }, this);
        //关闭按钮
        var close = panel.getChildByName("btn_close");
        close.addTouchEventListener(function(sender, type){
            if (type == 2){
                that.removeFromParent();
            }
        }, this);
        closeBtnAddLight(close);
    },
    setplayerInfo:function(playerData){
        this.img_send.visible = true;
        var player  = this.playerHeadNode;
        player.getChildByName("player_name").setString(getNewName(unescape(playerData.nickname),5));
        player.getChildByName("player_ID").setString("" + playerData.userId);
        player.isMask = true;
        COMMON_UI.refreshHead(this, playerData.headimgurl, player);
        player.visible = true;
        player._data = playerData;
    },
    onExit: function () {
        this._super();
    },
});

// 亲友圈商城赠送记录
var Friendcard_shop_send_record = cc.Layer.extend({
    ctor:function (data) {
        this._super();
        this._data = data;
        var node = ccs.load("friendcard_shop_send_record.json").node;
        this.addChild(node);
        this.node = node;
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0]);
        
        popupAnm(node.getChildByName("Panel"));
        this.initLayer()
        this.rquestList()
    },
    //请求列表
    rquestList:function(lastId){
        if(this._listView._isLoadingData){
            return;
        }
        var that = this;
        MjClient.block();
        var sendInfo = {
            pageId:lastId,
            pageLen:this._listView._prePageLength
        };
        this._listView._isLoadingData = true;
        MjClient.gamenet.request("pkplayer.handler.giveDiamondRecord", sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            if(!cc.sys.isObjectValid(that)){
                return;
            }
            that._listView._isLoadingData = false;
            if(rtn.code == 0){
                var dataLength = rtn.data.length;
                that._listView._hasMoreData = dataLength >= that._listView._prePageLength;
                if(!lastId){
                    that._listView._data = [];
                }
                that._listView._data = that._listView._data.concat(rtn.data)
                that.refreshList(lastId ? false : true);
            }
            else{
                FriendCard_Common.serverFailToast(rtn);
            }  
        });
    },
    //刷新列表
    refreshList:function(shouldClear)
    {
        if(!cc.sys.isObjectValid(this.item)) return;
        var listView = this._listView;
        var cell = this.item;
        cell.visible = false;

        var preItemNum = listView.getItems().length;
        var curentPoint = listView.getInnerContainerPosition();
        if(curentPoint.y > 0){
            curentPoint.y = 0;
        }
        var initPointY = listView.height - listView.getInnerContainerSize().height;
        if(shouldClear || (listView._data.length == 0)){
            cc.log("refreshList removeAllItems")
            listView.removeAllItems();
            preItemNum = 0;
        }
        if(listView._data.length == 0){
            this.text_nullTip.visible = true;
            return;
        }
        this.text_nullTip.visible = false;

        for (var i = 0; i < listView._data.length; i ++)
        {
            var item = listView.getItems()[i];
            if(!item){
                item = cell.clone();
                listView.pushBackCustomItem(item);
            }
            item.visible = true;
            item.dataIndex = i
            this.createItem(item,i)
        }
        
        for(var i = preItemNum - 1; i >= listView._data.length; i--){
            listView.getItems()[i].removeFromParent(true);
        }
        FriendCard_UI.addListBottomTipUi(listView,listView._hasMoreData ? 2 : 3)
        listView.forceDoLayout();
        if(preItemNum > 0){
            curentPoint.y = curentPoint.y + listView.getInnerContainerPosition().y - initPointY;
            var totalY = (listView.height - listView.getInnerContainerSize().height);
            if(totalY == 0){
                var percent = 0;
            }else{
                var percent = 100 - curentPoint.y * 100 / totalY;
            }
            listView.jumpToPercentVertical(percent)
        }
    },
    createItem:function(item,index)
    {
        var that = this;
        var itemData = this._listView._data[index];
        //createTime
        var image_head = item.getChildByName("Image_head");
        image_head.isMask = true;
        COMMON_UI.refreshHead(this,itemData.headimgurl,image_head)
        
        var text_nickname = item.getChildByName("Text_nickname");
        text_nickname.setString(""+getNewName(unescape(itemData.nickname),5))

        var text_id = item.getChildByName("Text_id");
        text_id.setString("ID:"+itemData.userId);

        var text_content = item.getChildByName("Text_content");
        text_content.setString(itemData.amount+"颗钻石")

        var text_time = item.getChildByName("Text_time");
        text_time.setString(MjClient.dateFormat(new Date(parseInt(itemData.createTime)), 'yyyy-MM-dd hh:mm:ss'));
        
    },
    initLayer:function()
    {   
        var that = this;
        var panel = this.node.getChildByName("Panel");
        this._listView = panel.getChildByName("list");
        that._listView._data = [];
        this._listView._prePageLength = 5;//本地测试分页
        if (cc.sys.OS_WINDOWS != cc.sys.os) {
            this._listView._prePageLength = 50;
        } 
        this.item = panel.getChildByName("item");
        this.text_nullTip = panel.getChildByName("Text_nullTip");
        this.text_nullTip.visible = false;
        this.item.visible = false;

        var _close = panel.getChildByName("Button_close")
        _close.addTouchEventListener(function(sender, type){
        if (type == 2)
            {
                this.removeFromParent();
            }
        }, this);
        closeBtnAddLight(_close);


        FriendCard_UI.setListAutoLoadMore(that._listView,function(){
            FriendCard_UI.addListBottomTipUi(that._listView,1)
            that.rquestList(that._listView._data[that._listView._data.length -1].id);
        },function(){
            if (!that._listView._isLoadingData &&
                that._listView._hasMoreData){
                return true;
            }
            return false;
        })

    },
    onExit: function () {
        this._super();
    },
});




var FriendCard_tongji_rank_set = cc.Layer.extend({
    ctor:function (data) {
        this._super();
        this._data = data;
        var node = ccs.load("friendcard_tongji_rankSet.json").node;
        this.addChild(node);
        this.node = node;
        this.panel = node.getChildByName("Panel");
        setWgtLayout(node.getChildByName("block"), [1, 1], [0.5,0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5,0.5], [0, 0]);
        COMMON_UI.setNodeTextAdapterSize(node);
        popupAnm(this.panel);
        this.colors = function () {
            if(FriendCard_Common.getSkinType() == 2){
                return ["#738875","#ff6f20"]
            }else if(FriendCard_Common.getSkinType() == 3){
                return ["#738875","#ff6f20"]
            }else{
                return ["#738875","#ff6f20"]
            }
        }(),
        this.initLayer();
    },
    strArr:[
        ["开启参与榜","隐藏成员信息","隐藏参与房间数"],
        ["开启战绩榜","隐藏成员信息","隐藏积分数"],
        ["开启赢家榜","隐藏成员信息","隐藏大赢家数"],
    ],
    strTileArr:[
        "参与榜",
        "战绩榜",
        "赢家榜",
    ],
    strRemarkArr:[
        ["joinDayRemarks","joinWeekRemarks"],
        ["resultDayRemarks","resultWeekRemarks"],
        ["winnerDayRemarks","winnerWeekRemarks"],
    ],
    //init高级设置界面
    initLayer:function() {
        var that = this;
        this._listView   =   this.panel.getChildByName("ListView");
        var _cell = this.panel.getChildByName("cell");
        _cell.visible = false;
        var btn_close           =   this.panel.getChildByName("close");
        var btn_confirm_set = this.panel.getChildByName("btn_confirm_set");
        closeBtnAddLight(btn_close);

        for(var i = 0; i < 3; i++){
            var cell = _cell.clone();
            for(var j = 0; j < 3; j++){
                var choose = cell.getChildByName("choose"+(j+1));
                choose.getChildByName("text").setString(this.strArr[i][j]);
                choose.addTouchEventListener(function(sender, type) {
                    if (type == 2)
                    {
                        var isSelected = sender.isSelected();
                        if(isSelected){
                            sender.getChildByName("text").setTextColor(cc.color(this.colors[0]));
                        }else{
                            sender.getChildByName("text").setTextColor(cc.color(this.colors[1]));
                        }
                    }
                }, this);
                choose.getChildByName("text").addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        var isSelected = sender.getParent().isSelected();
                        sender.getParent().setSelected(!isSelected);
                        if(isSelected){
                            sender.setTextColor(cc.color(this.colors[0]));
                        }else{
                            sender.setTextColor(cc.color(this.colors[1]));
                        }
                    }
                }, this);
            }
            var text_type = cell.getChildByName("text_type");
            text_type.setString(this.strTileArr[i])
            var Button_day_rank_remark = cell.getChildByName("Button_day_rank_remark");
            Button_day_rank_remark._rankType = (i+1);
            Button_day_rank_remark._rankType2 = 0;
            Button_day_rank_remark.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    this.addChild(new FriendCard_tongji_rank_remarkSet({
                        clubId:this._data.clubId,
                        isLM:this._data.isLM,
                        strRemarkArr:this.strRemarkArr,
                        _rankType:sender._rankType,
                        _rankType2:sender._rankType2,
                        remarks:sender.remarks,
                        callBackFunc:function (returnData) {
                            that._data[that.strRemarkArr[returnData._rankType-1][returnData._rankType2]] = returnData.returnRemarks;
                            sender.remarks = returnData.returnRemarks;
                        }.bind(sender)
                    }));
                }
            }, this);
            var Button_week_rank_remark = cell.getChildByName("Button_week_rank_remark");
            Button_week_rank_remark._rankType = (i+1);
            Button_week_rank_remark._rankType2 = 1;
            Button_week_rank_remark.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    this.addChild(new FriendCard_tongji_rank_remarkSet({
                        clubId:this._data.clubId,
                        isLM:this._data.isLM,
                        strRemarkArr:this.strRemarkArr,
                        _rankType:sender._rankType,
                        _rankType2:sender._rankType2,
                        remarks:sender.remarks,
                        callBackFunc:function (returnData) {
                            that._data[that.strRemarkArr[returnData._rankType-1][returnData._rankType2]] = returnData.returnRemarks;
                            sender.remarks = returnData.returnRemarks;
                        }.bind(sender)
                    }));
                }
            }, this);
            this._listView.pushBackCustomItem(cell);
            cell.visible = true;
        }
        this.initChoose();


        btn_confirm_set.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.saveRankSetInfo();
            }
        }, this);

        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);

        this.reqRankSetInfo();
    },
    initChoose:function () {
        for(var i = 0; i < 3; i++){
            var cell = this._listView.children[i];
            for(var j = 0; j < 3; j++){
                var choose = cell.getChildByName("choose"+(j+1));
                if(this._data.rankOpenType.indexOf((3 * i + j+1)+"") > -1){
                    choose.setSelected(true);
                    choose.getChildByName("text").setTextColor(cc.color(this.colors[1]));
                }else{
                    choose.setSelected(false);
                    choose.getChildByName("text").setTextColor(cc.color(this.colors[0]));
                }
            }
            var Button_day_rank_remark = cell.getChildByName("Button_day_rank_remark");
            Button_day_rank_remark.remarks = this._data[this.strRemarkArr[i][0]]

            var Button_week_rank_remark = cell.getChildByName("Button_week_rank_remark");
            Button_week_rank_remark.remarks = this._data[this.strRemarkArr[i][1]]
        }
    },

    getSendOpenType:function()
    {
        var openType = "";
        for(var i = 0; i < 3; i++){
            var cell = this._listView.children[i];
            for(var j = 0; j < 3; j++){
                var choose = cell.getChildByName("choose"+(j+1));
                if(choose.isSelected()){
                    openType += (((i * 3)+j+1)+"");
                }
            }
        }
        return openType;

    },
    saveRankSetInfo:function () {
        var that = this;
        var sendInfo = {};
        if(this._data.isLM){
            var url = "pkplayer.handler.updateLeagueRankSetInfo";
            sendInfo.leagueId = this._data.clubId;
            sendInfo.rankOpenType = this.getSendOpenType();
        }else{
            var url = "pkplayer.handler.updateClubStatisRankSet";
            sendInfo.clubId = this._data.clubId;
            sendInfo.setData = {};
            sendInfo.setData.rankOpenType = this.getSendOpenType();
        }
        
        cc.log("saveRankSetInfo sendInfo",JSON.stringify(sendInfo))
        MjClient.block();
        MjClient.gamenet.request(url, sendInfo,
            function(rtn) {
                MjClient.unblock();

                if (rtn.code == 0) {
                    MjClient.showToast("保存成功");
                    if (cc.sys.isObjectValid(that))
                        that.removeFromParent();
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("保存失败");
                    }
                }
            }
        );
    },
    reqRankSetInfo: function() {
        var that = this;
        var sendInfo = {}
        if(this._data.isLM){
            var url = "pkplayer.handler.leagueRankSetInfo";
            sendInfo.leagueId = this._data.clubId;
        }else{
            var url = "pkplayer.handler.clubStatisRankSetInfo";
            sendInfo.clubId = this._data.clubId;
        }
        MjClient.block();
        MjClient.gamenet.request(url, sendInfo,
            function(rtn) {
            MjClient.unblock();
                if (!cc.sys.isObjectValid(that))
                    return;
                if (rtn.code == 0) {
                    for(var key in rtn.data){
                        that._data[key] = rtn.data[key];
                    }
                    that.initChoose();
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                        if (cc.sys.isObjectValid(that))
                            that.removeFromParent();
                    } else {
                        MjClient.showToast("获取数据失败");
                    }
                }
                
            }
        );
    },

});
var FriendCard_tongji_rank_remarkSet = cc.Layer.extend({
    strArr:[
        "第 1 名",
        "第 2 名",
        "第 3 名",
        "第 4 名",
        "第 5 名",
        "第6~10名",
        "第11~20名",
        "第21~40名",
        "第41~60名",
        "第61~80名",
        "第81~100名",
    ],
    ctor:function (data) {
        this._super();
        var that = this;
        this._data = data;
        if(!this._data.remarks){
            this._data.remarks = [];
        }else{
            this._data.remarks = JSON.parse(this._data.remarks);
        }
        var msgui = ccs.load("friendcard_tongji_rankRemarkSet.json").node;
        this.addChild(msgui);
        var _block = msgui.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        this.image_bg = msgui.getChildByName("image_bg");

        if(FriendCard_Common.getSkinType() == 1){
            setWgtLayout(this.image_bg,[0.6383,0.6042],[0.5,0.5],[0,0]);
        }else {
            //岳阳皮肤
            setWgtLayout(this.image_bg,[0.5055,0.5472],[0.5,0.5],[0,0]);
        }
        COMMON_UI.setNodeTextAdapterSize(msgui);
        popupAnm(this.image_bg)
        var text_title = this.image_bg.getChildByName("text_title");
        if(text_title){
            var str1 = "参与榜";
            if(this._data._rankType == 2){
                str1 = "战绩榜";
            }else if(this._data._rankType == 3){
                str1 = "赢家榜";
            }
            var str2 = this._data._rankType2 == 0 ?"（日榜备注）":"（周榜备注）";
            text_title.setString(str2+str1);
        }
        var image_title = this.image_bg.getChildByName("Image_title");
        if(image_title){
            image_title.loadTexture("friendCards/tongji/rank/title_"+this._data._rankType +"" + this._data._rankType2+".png")
        }

        this._listView = this.image_bg.getChildByName("ListView");
        var _cell = this.image_bg.getChildByName("cell");
        _cell.visible = false;

        var setEditBoxConfig = function(_parent,_child,str,MaxLength) {
            if (FriendCard_Common.getSkinType() == 3) {
                _child.setFontColor(cc.color("9f6a36"));
                _child.setFontSize(28);
                _child.setPlaceholderFontSize(28);
            } else if (FriendCard_Common.getSkinType() == 1) {
                _child.setFontColor(cc.color("f8f2d7"));
                _child.setFontSize(24);
                _child.setPlaceholderFontSize(24);
            }else{
                _child.setFontColor(cc.color("867e7e"));
                _child.setFontSize(16);
                _child.setPlaceholderFontSize(16);
            }
            _child.setMaxLength(MaxLength);
            _child.setFontName(MjClient.fzcyfont);
            _child.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            _child.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            _child.setPlaceHolder(str);
            _child.setPosition(_parent.getContentSize().width / 2, _parent.getContentSize().height / 2);
            _parent.addChild(_child);
        }.bind(this);
        for(var i = 0; i < this.strArr.length; i++){
            var cell = _cell.clone();
            var editBg = cell.getChildByName("Image_edit_bg");
            var editText = new cc.EditBox(editBg.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/rank/img_remark_bg.png"));
            editText.setName("editText");
            setEditBoxConfig(editBg,editText,"点击输入备注",6);
            editText.setString(this._data.remarks[i]?(this._data.remarks[i]+""):"");
            cell.getChildByName("text_rank").setString(this.strArr[i]);
            this._listView.pushBackCustomItem(cell);
            cell.visible = true;
        }

        var btn_confirm_set = this.image_bg.getChildByName("btn_confirm_set");
        btn_confirm_set.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.reqUpdate();
            }
        }, this);


        var closeBtn = this.image_bg.getChildByName("btn_close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);
        return true;
    },
    reqUpdate:function () {
        var that = this;
        var sendInfo = {};
        var remarks = [];
        for(var i = 0; i < this.strArr.length; i++){
            var cell = this._listView.children[i];
            var editBg = cell.getChildByName("Image_edit_bg");
            var editText = editBg.getChildByName("editText");
            remarks.push(editText.getString());
        }
        
        if(this._data.isLM){
            var url = "pkplayer.handler.updateLeagueRankSetInfo";
            sendInfo.leagueId = this._data.clubId;
            sendInfo[this._data.strRemarkArr[this._data._rankType-1][this._data._rankType2]] = JSON.stringify(remarks);
        }else{
            var url = "pkplayer.handler.updateClubStatisRankSet";
            sendInfo.clubId = this._data.clubId;
            sendInfo.setData = {};
            sendInfo.setData[ this._data.strRemarkArr[this._data._rankType-1][this._data._rankType2]] = JSON.stringify(remarks);
        }
        MjClient.block();
        MjClient.gamenet.request(url, sendInfo,
            function(rtn) {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(that))
                    return;
                if (rtn.code == 0) {
                    that._data.returnRemarks = JSON.stringify(remarks);
                    if(that._data.callBackFunc){
                        that._data.callBackFunc(that._data);
                    }
                    postEvent("rank_remark_update",{
                        rankType:that._data._rankType,
                        rankType2:that._data._rankType2,
                        remarks:remarks
                    })
                    MjClient.showToast("保存成功");
                    that.removeFromParent();
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("保存数据失败");
                    }
                }
            }
        );
    },
});

//联盟搜索弹窗
var Friendcard_Search = cc.Layer.extend({
    ctor: function(clubData) {
        this._super();
        var uiNode = ccs.load("friendcard_search.json").node;
        this.addChild(uiNode);
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0],true);

        var back = uiNode.getChildByName("back");
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back)
        back.getChildByName("btn_search").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                 var sendInfo = {}
                    sendInfo.leagueId = clubData.info.clubId;
                    sendInfo.clubId = clubData.subClubId;
                    var inputNum = Number(inputEditBox.getString());
                    sendInfo.keyword = inputNum;
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.leaguePlayerSearch", sendInfo, function(rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            rtn.data.info.clubId = rtn.data.info.leagueId ? rtn.data.info.leagueId : rtn.data.info.clubId;
                            var room = {};
                            room.ruleIndex = rtn.data.ruleId;
                            room.roundNum = 0
                            MjClient.FriendCard_main_ui.addChild(new Friendcard_roomInfoDialog(rtn.data, room));
                        } else {
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    }); 
            }
        }, this);

        back.getChildByName("btn_close").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);
        var img_inputBg = back.getChildByName("img_inputBg");
        var inputEditBox = new cc.EditBox(img_inputBg.getContentSize(), new cc.Scale9Sprite("friendCards/common/img_dikuang.png"));
        inputEditBox.setFontColor(cc.color("#443333"));
        inputEditBox.setMaxLength(7);
        inputEditBox.setFontSize(30);
        inputEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        inputEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        inputEditBox.setFontName("fonts/lanting.TTF");
        inputEditBox.setPlaceholderFontSize(30);
        inputEditBox.setPlaceHolder("请输入房间号或房间内玩家ID");
        inputEditBox.setPosition(img_inputBg.width / 2, img_inputBg.height / 2);
        img_inputBg.addChild(inputEditBox);

    },
    
});

//邀请加入亲友圈审核界面
var Friendcard_Invite_Shenhe = cc.Layer.extend({
    ctor: function() {
        var that = this;
        this._super();
        var jsFile = "friendcard_invite_shenhe.json";
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ) {
            jsFile = "friendcard_invite_shenhe_3.0.json";
        }
        var uiNode = ccs.load(jsFile).node;
        this.addChild(uiNode);
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0],true);

        var back = uiNode.getChildByName("back");
        this.back = back;
        
        if(FriendCard_Common.getSkinType() == 1){
            var _close = back.getChildByName("close");
            setWgtLayout(back, [1, 0.9083], [0.5, 0.5], [0, 0], false);
        }
        else if(MjClient.isUseUIv3 && MjClient.isUseUIv3() && FriendCard_Common.getSkinType() == 2){
            var _close = back.getChildByName("close");
            setWgtLayout(back, [0.89, 0.8972], [0.5, 0.5], [0, 0], false);
        }else if (FriendCard_Common.getSkinType() == 2) {
            var Image_di = uiNode.getChildByName("Image_di");
            var _close = uiNode.getChildByName("close");
            setWgtLayout(back, [0.97, 0.9], [0.5, 0.95], [0, 0], cc.winSize.width/cc.winSize.height >= 1280/720);
            var hAdjust = back.height - cc.winSize.height*0.9/back.getScale();
            back.height -= hAdjust;
            var content_list = back.getChildByName("content_list");
            var Panle_title = back.getChildByName("Panle_title");
            content_list.height -= hAdjust;
            Panle_title.setPosition(cc.p(0,back.height));
            content_list.setPosition(cc.p(0,back.height - Panle_title.height));

            Image_di.width = MjClient.size.width;
            Image_di.height = MjClient.size.height;
            Image_di.setPosition(MjClient.size.width / 2, MjClient.size.height / 2);
            var suizi = uiNode.getChildByName("suizi");
            setWgtLayout(_close, [0.1188, 0.2236], [0.9740, 0.9062], [0, 0], false);
            setWgtLayout(suizi, [0.0148, 0.3431], [0.9764, 0.9147], [0, 0], false);
            closeBtnAddLight(_close);
                
        }else if (FriendCard_Common.getSkinType() == 3) {
            var _close = back.getChildByName("close");
            setWgtLayout(back, [0.8781, 0.9569], [0.5, 0.5], [0, 0], false);
        }else if(FriendCard_Common.getSkinType() == 4){
            var _close = back.getChildByName("close");
            setWgtLayout(back, [0.89, 0.8972], [0.5, 0.5], [0, 0], false);
        }
        back.getChildByName("cell").setVisible(false);
        
        
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        });
        this.requestInviteList();
        
    },

    requestInviteList: function(){
        var that = this;
        var sendInfo = {}
        MjClient.block();
        var api = "pkplayer.handler.userAuditList";
        MjClient.gamenet.request(api, sendInfo, function(rtn) {
            MjClient.unblock();
            if (rtn.code == 0) {
                that.showInviteList(rtn.data);
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        }); 
    },

    showInviteList: function(datas){
         var that = this;
        if(!cc.sys.isObjectValid(this)|| !datas){
            return;
        }
        var cell = this.back.getChildByName("cell");
        var contentList = this.back.getChildByName("content_list");
        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var item = cell.clone();
            item.data = data;
            contentList.pushBackCustomItem(item);

            //亲友圈头像
            var img_clubHead = item.getChildByName("img_clubHead");
            img_clubHead.isMask = true;
            COMMON_UI.refreshHead(this,data.sAvatar ? data.sAvatar : "png/default_headpic.png", img_clubHead);
            item.getChildByName("txt_clubName").setString(unescape(data.sTitle));
            item.getChildByName("text_clubId").setString(data.sId);

            var img_inviteHead = item.getChildByName("img_inviteHead");
            img_inviteHead.isMask = true;
            COMMON_UI.refreshHead(this,data.headimgurl ? data.headimgurl : "png/default_headpic.png", img_inviteHead);
            var txt_inviteName = item.getChildByName("txt_inviteName");
            txt_inviteName.ignoreContentAdaptWithSize(true)
            txt_inviteName.setString(getNewName(unescape(data.nickname), 6));
            item.getChildByName("txt_inviteId").setString(data.inviter);
            var timeStr = MjClient.dateFormat(new Date(parseInt(data.createTime)), 'yyyy-MM-dd hh:mm:ss');
            timeStr = timeStr.split(" ");
            item.getChildByName("txt_inviteTime").setString(timeStr[0] + "\n" + timeStr[1]);
            item.getChildByName("btn_agree").addTouchEventListener(function(sender, type) {
                if (type == 2) {//同意
                    var data = sender.getParent().data;
                    that.requestOption(data.recordId, 1);
                }
            });  
            item.getChildByName("btn_refuse").addTouchEventListener(function(sender, type) {
                if (type == 2) {//拒绝
                    var data = sender.getParent().data;
                    that.requestOption(data.recordId, 2);
                }
            }); 
        }
        cell.setVisible(false);
        this.showEmptyText(datas.length==0);
        postEvent("refresh_inviteShenhe_num", {num:datas.length});
    },


    requestOption: function(Id, opt) {
        var that = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userInviteCheck", {
            recordId: Id,
            auditStatus: opt   //1:同意 2：拒绝
        }, function(rtn) {
            MjClient.unblock();
            if (!cc.sys.isObjectValid(that)) {
                return;
            }
            if (rtn.code == 0) {
                MjClient.showToast("操作成功！");
                that.requestInviteList();
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },
    showEmptyText: function(isShow) {
        var that = this;

        if (that.emptyTxt) {
            that.emptyTxt.setVisible(isShow);
            return;
        } else if (!isShow) {
            return;
        }
        var emptyTxt = new ccui.Text();
        emptyTxt.setFontName("fonts/lanting.TTF");
        emptyTxt.setFontSize(30);
        emptyTxt.setString("暂无数据");
        emptyTxt.setColor(cc.color(0x79, 0x34, 0x12));
        emptyTxt.setName("emptyTextTip");
        emptyTxt.setPosition(this.back.width / 2, this.back.height / 2);
        this.back.addChild(emptyTxt);
        that.emptyTxt = emptyTxt;
    },
    
});

//设置团队预警分数
var FriendCard_WarnScore = cc.Layer.extend({
    onExit:function(){
        this._super();
    },
    ctor: function(clubData) {
        this._super();
        var that = this;
        that.maxScore = 500000;
        that.clubData = clubData;
        that.clubId = clubData.clubId;
        that.isLM = FriendCard_Common.getClubisLM(clubData);

        var node = ccs.load("friendcard_warningScore.json").node;
        that.addChild(node);
        that.uinode = node;
        that.panel = node.getChildByName("Panel");
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5,0.5], [0, 0], true);
        setWgtLayout(this.panel, [1, 1], [0.5,0.5], [0, 0]);
        popupAnm(that.panel);

        var _close = that.panel.getChildByName("close");
        closeBtnAddLight(_close);
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2){
                var contentList = that.panel.getChildByName("content_list");
                var items = contentList.getItems();
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if(item.req){
                        var data = item.data;
                        that.requestSetScore(data.userId, data.matchGrantHisScore);
                    } 
                }
                that.removeFromParent();
            }
        }, that);

        that.panel.getChildByName("cell").setVisible(false);
        that.initSearch();
        that.initSetAll();
        that.rquestWarnScoreList();
    },

    initSearch: function(){
        var that = this;

        var img_search = that.panel.getChildByName("img_search");
        var userIdEditBox = new cc.EditBox(img_search.getContentSize(), new cc.Scale9Sprite());
        this._userIdEditBox = userIdEditBox;
        userIdEditBox.setFontColor(cc.color("c3c3c3"));
        userIdEditBox.setMaxLength(10);
        userIdEditBox.setFontSize(20);
        userIdEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        userIdEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        userIdEditBox.setFontName("fonts/lanting.TTF");
        userIdEditBox.setPlaceholderFontSize(20);
        userIdEditBox.setPlaceHolder("输入ID快速查找");
        userIdEditBox.setPosition(img_search.width / 2, img_search.height / 2);
        img_search.addChild(userIdEditBox);

        this.btn_search = img_search.getChildByName("btn_search");
        this.btn_clear = img_search.getChildByName("btn_clear");
        this.btn_search.visible = true;
        this.btn_clear.visible = false;

        this.btn_search.addTouchEventListener(function(sender, type) {
            if (type == 2) {
               var userId = userIdEditBox.getString();
               if (userId.length>0) {
                   that.searchUserId = parseInt(userId);
                   that.btn_search.visible = false;
                   that.btn_clear.visible = true;
                   that.rquestWarnScoreList();
               }
            }
        });
        this.btn_clear.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                userIdEditBox.setString("");
                that.searchUserId = 0;
                that.btn_search.visible = true;
                that.btn_clear.visible = false;
                that.rquestWarnScoreList();
            }
        });
    },

    initSetAll: function(){
        //权限的一键设置
        var that = this;
        var checkBox_allOnOff =  that.panel.getChildByName("checkBox_allOnOff");
        checkBox_allOnOff.setSelected(false)//0:无权限 1：有权限
        that.checkBox_allOnOff = checkBox_allOnOff;
        checkBox_allOnOff.addEventListener(function(sender, type) {
            var data = sender.getParent().data;
            var contentList = that.panel.getChildByName("content_list");
            var items = contentList.getItems();
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    MjClient.showMsg("是否一键开启预警",
                        function(){
                            that.requestSetWarnState(0, 1);
                        },
                        function() {
                            sender.setSelected(false);
                        }, "1");
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    MjClient.showMsg("是否一键关闭预警",
                        function(){
                            that.requestSetWarnState(0, 0);
                        },
                        function() {
                            sender.setSelected(true);
                        }, "1");
                    break;
            }
        });


        var btn_sub = that.panel.getChildByName("btn_sub");
        var btn_add = that.panel.getChildByName("btn_add");
        var img_scoreBg = that.panel.getChildByName("img_scoreBg");
        var btn_setAllScore = that.panel.getChildByName("btn_setAllScore");
        var size = img_scoreBg.getContentSize();
        if (FriendCard_Common.getSkinType() == 4) {
            size.width -= 60;
        }else{
            size.width -= 20;
        }
        var numEditBox = new cc.EditBox(size, new cc.Scale9Sprite());
        if (FriendCard_Common.getSkinType() == 4) {
            numEditBox.setFontColor(cc.color("#ffffff"));
           numEditBox.setFontSize(24);
        }else{
           numEditBox.setFontColor(cc.color("#443333"));
           numEditBox.setFontSize(28);
        }
        
        numEditBox.setMaxLength(10);
        numEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        numEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        numEditBox.setFontName("fonts/lanting.TTF");
        numEditBox.setPlaceholderFontSize(30);
        numEditBox.setPosition(img_scoreBg.getPosition());
        numEditBox.setString(0);
        numEditBox.isEditBox = true;
        that.panel.addChild(numEditBox);
        var edtDelegate = {}
        edtDelegate.editBoxEditingDidEnd = function (editBox) {
            var inputNum = numEditBox.getString();
            inputNum = Number(inputNum);
            if (inputNum > that.maxScore) {
                inputNum = that.maxScore;
            }
            inputNum = parseInt(inputNum/10);//向下取整十
            inputNum *= 10;
            numEditBox.setString(inputNum);
        };
        numEditBox.setDelegate(edtDelegate);
        var btnCallBack = function(sender, type, bAdd){
            if (type != 2) return ;
            var num = Number(numEditBox.getString());
            if (bAdd) {
                num += 100;
                if(num>that.maxScore){
                    num= 0;
                }
            }else{
                num -= 100;
                if(num < 0){
                    num = that.maxScore;
                }
            }
            numEditBox.setString(num);
        }
        btn_add.addTouchEventListener(function (sender, type) {
            btnCallBack(sender, type, true);
        },this);
        btn_sub.addTouchEventListener(function (sender, type) {
            btnCallBack(sender, type, false);
        },this);
        btn_setAllScore.addTouchEventListener(function (sender, type) {
            if (type != 2) return ;
            var num = Number(numEditBox.getString());
            MjClient.showMsg("是否一键设置" + num + "分" ,
                function(){
                    that.requestSetScore(0, num);
                },function() {}, "1");
        },this);
    },

    //请求列表
    rquestWarnScoreList:function()
    {
        var that = this;
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.leagueTeamScoreLimit" : "pkplayer.handler.clubTeamScoreLimit";

        var sendInfo = {};

        if (that.isLM){
            sendInfo.leagueId = that.clubId;
        }else{
            sendInfo.clubId = that.clubId;
        }
        if (that.searchUserId) {
            sendInfo.userId = that.searchUserId;
        }
        MjClient.gamenet.request(api, sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            if(rtn.code == 0)
            {
                that.data = rtn.data;
                if(sys.isObjectValid(that)){
                     that.refreshWarnScoreList(rtn.data);
                }
            }
            else
            {
                FriendCard_Common.serverFailToast(rtn);
            }  
        });
    },

    //设置分数
    requestSetScore:function(userId, score){//
        var that = this;
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.leagueUpdateLimitScore" : "pkplayer.handler.clubUpdateLimitScore";

        var sendInfo = {};
        if (that.isLM){
            sendInfo.leagueId = that.clubId;
        }else{
            sendInfo.clubId = that.clubId;
        }
        if (userId) {
            sendInfo.userId = userId;
        }
        sendInfo.matchGrantHisScore = score;
        
        MjClient.gamenet.request(api, sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            if(rtn.code == 0){
                if (!userId) {//一键设置
                    MjClient.showToast("设置成功！");
                    that.rquestWarnScoreList();
                }
            }else{
                that.rquestWarnScoreList();
                FriendCard_Common.serverFailToast(rtn);
            }  
        });
    },
    //设置预警状态
    requestSetWarnState: function(userId, state){
        var that = this;
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.leagueUpdateTeamWarnStatus" : "pkplayer.handler.clubUpdateTeamWarnStatus";

        var sendInfo = {};
        if (that.isLM){
            sendInfo.leagueId = that.clubId;
        }else{
            sendInfo.clubId = that.clubId;
        }
        if (userId) {
            sendInfo.userId = userId;
        }
        sendInfo.isOpenTeamWarn = state;  // 1:开启  0：不开启
        
        MjClient.gamenet.request(api, sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            if(rtn.code == 0)
            {
                if (!userId) {//一键设置
                    MjClient.showToast("设置成功！");
                    that.rquestWarnScoreList();
                }

            }else{
                if (!userId) {//一键设置
                    that.checkBox_allOnOff.setSelected(state == 0);
                }else{
                    that.rquestWarnScoreList();
                }
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },
    refreshHead: function(url, head) {
        head.needScale = 8;
        head.isMask = true;
        COMMON_UI.refreshHead(this, url ? url : "png/default_headpic.png", head);
    },
    refreshWarnScoreList:function(datas)
    {   
        var that = this;
        var listData = datas.list;
        var cell = that.panel.getChildByName("cell");
        var contentList = that.panel.getChildByName("content_list");
        contentList.removeAllItems();
        cell.setVisible(true);
        var hasUnOpen = false;
        for (var i = 0; i < listData.length; i++) {
            var data = listData[i];
            var item = cell.clone();
            item.data = data;
            contentList.pushBackCustomItem(item);
            that.refreshHead(data.headimgurl, item.getChildByName("image_head"));
            item.getChildByName("text_group").setString(data.groupId == 0 ? "" : data.groupId + "组");
            item.getChildByName("text_name").setString(getNewName(unescape(data.nickname), 6));
            item.getChildByName("text_ID").setString(data.userId + "");
            item.getChildByName("text_role").setString(FriendCard_Common.getRoleTextByRoleId(data.roleId));


            var checkBox_onOff =  item.getChildByName("checkBox_onOff");
            checkBox_onOff.setSelected(data.isOpenTeamWarn == 1)//0:无权限 1：有权限
            checkBox_onOff.addEventListener(function(sender, type) {
                var data = sender.getParent().data;
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        that.requestSetWarnState(data.userId, 1);  
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        that.requestSetWarnState(data.userId, 0);
                        break;
                }
            });
            if (data.isOpenTeamWarn==0){
                hasUnOpen = true;
            }


            var btn_sub = item.getChildByName("btn_sub");
            var btn_add = item.getChildByName("btn_add");
            var img_scoreBg = item.getChildByName("img_scoreBg");
            var size = img_scoreBg.getContentSize();
            if (FriendCard_Common.getSkinType() == 4) {
                size.width -= 60;
            }else{
                size.width -= 20;
            }
            
            var numEditBox = new cc.EditBox(size, new cc.Scale9Sprite());
            if (FriendCard_Common.getSkinType() == 4) {
                numEditBox.setFontColor(cc.color("#ffffff"));
               numEditBox.setFontSize(24);
            }else{
               numEditBox.setFontColor(cc.color("#443333"));
               numEditBox.setFontSize(28);
            }
            
            numEditBox.setMaxLength(10);
            
            numEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            numEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            numEditBox.setFontName("fonts/lanting.TTF");
            numEditBox.setPlaceholderFontSize(30);
            numEditBox.setPosition(img_scoreBg.getPosition());
            numEditBox.setString(data.matchGrantHisScore);
            numEditBox.isEditBox = true;
            item.addChild(numEditBox);
            item.numEditBox = numEditBox;
            var edtDelegate = {}
            edtDelegate.editBoxEditingDidEnd = function (editBox) {
                var inputNum = editBox.getString();
                var parent = editBox.getParent();
                var data = parent.data;
                if (inputNum.length == 0) {
                    editBox.setString(""+data.matchGrantHisScore);
                }
                else
                {
                    parent.stopAllActions();
                    parent.req = false;
                    inputNum = Number(inputNum);
                    if (inputNum > that.maxScore) {
                        inputNum = that.maxScore;
                    }
                    inputNum = parseInt(inputNum/10);//向下取整十
                    inputNum *= 10;
                    editBox.setString(inputNum);
                    if (data.matchGrantHisScore != inputNum) {
                        data.matchGrantHisScore = inputNum;  
                        that.requestSetScore(data.userId, data.matchGrantHisScore);   
                    }      
                }
            };
            numEditBox.setDelegate(edtDelegate);
            var btnCallBack = function(sender, type, bAdd){
                if (type != 2) return ;
                var parent = sender.getParent();
                var data = parent.data;
                if (bAdd) {
                    data.matchGrantHisScore += 100;
                    if(data.matchGrantHisScore>that.maxScore){
                        data.matchGrantHisScore = 0;
                    }
                }else{
                    data.matchGrantHisScore -= 100;
                    if(data.matchGrantHisScore < 0){
                        data.matchGrantHisScore = that.maxScore;
                    }
                }
                parent.req = true;
                parent.numEditBox.setString(data.matchGrantHisScore);
                parent.stopAllActions();
                parent.runAction(cc.sequence(cc.delayTime(1.25),cc.callFunc(function(){
                    if( parent.req){
                        parent.req = false;
                        that.requestSetScore(data.userId, data.matchGrantHisScore);
                    }
                })));
            }
            btn_add.addTouchEventListener(function (sender, type) {
                btnCallBack(sender, type, true);
            },this);
            btn_sub.addTouchEventListener(function (sender, type) {
                btnCallBack(sender, type, false);
            },this);

        }
        cell.setVisible(false); 
        that.showEmptyText(listData.length == 0);
        that.checkBox_allOnOff.setSelected(!hasUnOpen);
    },
    showEmptyText: function(isShow) {
        var that = this;

        if (that.emptyTxt) {
            that.emptyTxt.setVisible(isShow);
            return;
        } else if (!isShow) {
            return;
        }

        var emptyTxt = new ccui.Text();
        emptyTxt.setFontName("fonts/lanting.TTF");
        emptyTxt.setFontSize(30);
        emptyTxt.setString("暂无数据");
        emptyTxt.setColor(cc.color(0x79, 0x34, 0x12));
        emptyTxt.setName("emptyTextTip");
        emptyTxt.setPosition(that.panel.width / 2, that.panel.height / 2);
        that.panel.addChild(emptyTxt);
        that.emptyTxt = emptyTxt;
    },
});
