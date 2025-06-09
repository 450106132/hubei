// 亲友圈-乐豆发放回收操作
var FriendCard_SXF_ledou_gxbl = cc.Layer.extend({
    ctor:function(clubId,setUserId,roleId,callback) {
        this._super();
        MjClient.FriendCard_SXF_ledou_operate = this;
        var node = ccs.load("friendCard_SXF_fenCheng.json").node;
        this.addChild(node);
        this.clubId = clubId
        this.setUserId = setUserId
        this.callback = callback
        this.roleId = roleId
        var back = node.getChildByName("back");
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        setWgtLayout(node.getChildByName("block"), [1, 1], [0.5, 0.5], [0, 0], true);
        COMMON_UI.setNodeTextAdapterSize(back);
        this.init(back);
        this.maxSize = 10;
    },
    init:function(back){
        var that = this

        this.rquestSetPartnerCommission = function(setType,setUserId,data){
            var sendInfo = {
                type: setType,
                clubId: this.clubId,
                userId:setUserId,
                selectIndex:this.selectIndex,
                data:data,
            }
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.SetPartnerCommission_new", sendInfo, function(rtn) {
                MjClient.unblock();
                cc.log(" ===== pkplayer.handler.SetPartnerCommission_new === " + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    MjClient.showToast("设置贡献比例成功");
                }else{
                    if(rtn.message){
                        MjClient.showMsgTop(rtn.message);
                    }
                }
            });
        }



        this.rquestGetPartnerCommission = function(getType,getUserId){
            var sendInfo = {
                type: getType,
                clubId: this.clubId,
                userId:getUserId,
            }
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.GetPartnerCommission_new", sendInfo, function(rtn) {
                MjClient.unblock();
                cc.log(" ===== pkplayer.handler.GetPartnerCommission_new === " + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    if(rtn.data && rtn.data[0].myCommissionRate){
                        // that.bili.setString(rtn.data[0].parentCommission + "")
                        //需求多次变化，变量很乱
                        //index 第一列  index+10 第二列 index+20 第三列
                        var myCommissionRate = rtn.data[0].myCommissionRate;
                        var myCommissionRateObj = JSON.parse(myCommissionRate);
                        if(rtn.data.length > 1 && rtn.data[1].myCommissionRate){
                            var myParentCommissionRateObj = JSON.parse(rtn.data[1].myCommissionRate);
                            cc.log("myParentCommissionRateObj:", myParentCommissionRateObj);
                        }
                        cc.log("rtn.data.length:", rtn.data.length);
                        for (let index = 0; index < that.maxSize; index++) {
                            if(myCommissionRateObj.hasOwnProperty("range" + index)){
                                that.rangeValueArr[index] = parseFloat(myCommissionRateObj["range" + index]);
                                //设置范围，第一列的字段
                                if(that.roleId == 3){
                                    if(parseFloat(myCommissionRateObj["range" + index]) > 0){
                                        // if(index == 0){
                                        //     that.rangeTextArr[index].setString("0-" + myCommissionRateObj["range" + index]);
                                        // }
                                        // else{
                                        //     that.rangeTextArr[index].setString("" + (myCommissionRateObj["range" + (index - 1)]+ 0.01) + "-" + myCommissionRateObj["range" + index]);
                                        // }
                                        that.rangeTextArr[index].setString(myCommissionRateObj["range" + index]);
                                        that.rangeValueArr[index] = parseFloat(myCommissionRateObj["range" + index])
                                    }
                                }
                                else{
                                    if(parseFloat(myParentCommissionRateObj["range" + index]) > 0){
                                    //     if(index == 0){
                                    //         that.rangeTextArr[index].setString("0-" + myParentCommissionRateObj["range" + index]);
                                    //     }
                                    //     else{
                                    //         that.rangeTextArr[index].setString("" + (myParentCommissionRateObj["range" + (index - 1)]+ 0.01) + "-" + myCommissionRateObj["range" + index]);
                                    //     }
                                        that.rangeTextArr[index].setString(myParentCommissionRateObj["range" + index]);
                                        that.rangeValueArr[index] = parseFloat(myParentCommissionRateObj["range" + index])
                                    }
                                }
                                //设置上级给我的贡献，第二列的字段
                                if(that.roleId == 3){
                                    that.rangeTextArr[index + 10].setString("" + myCommissionRateObj["range" + index]);
                                    that.parentCommissionValueArr[index] = myCommissionRateObj["range" + index];
                                }
                                else{
                                    if(rtn.data.length > 1 && rtn.data[1].myCommissionRate){
                                        that.rangeTextArr[index + 10].setString("" + myParentCommissionRateObj["commission" + index]);
                                        that.parentCommissionValueArr[index] = myParentCommissionRateObj["commission" + index];
                                    }
                                }
                            }
                            //设置我给下级的贡献，第三列的字段
                            if(myCommissionRateObj.hasOwnProperty("commission" + index)){
                                that.myCommissionValueArr[index] = parseFloat(myCommissionRateObj["commission" + index]);
                                that.rangeTextArr[index + 20].setString("" + myCommissionRateObj["commission" + index]);
                            }
                        }
                        cc.log("that.parentCommissionValueArr:", that.parentCommissionValueArr);
                    }
                }else{
                    if(rtn.message){
                        MjClient.showMsgTop(rtn.message);
                        that.removeFromParent(true)
                    }
                }
            });
        }

        this.Panel_gxbl = back.getChildByName("Panel_gxbl")
        this.Panel_gxbl.setVisible(false);
        var btn_setCommision = this.Panel_gxbl.getChildByName("btn_ok");
        var btn_cancleSetCommision = this.Panel_gxbl.getChildByName("btn_no");
        var bili = this.Panel_gxbl.getChildByName("Image_bili");
        if(this.bili){
            this.bili.removeFromParent(true)
        }
        this.bili = new cc.EditBox(bili.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/inputbg.png"));
        this.bili.setPlaceholderFontSize(30);
        // this.bili.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.bili.setPlaceHolder("请输入数额");
        this.bili.setPosition(bili.getContentSize().width/2, bili.getContentSize().height/2);
        this.bili.setFontColor(cc.color("#9f6a36"));
        bili.addChild(this.bili);
        this.bili.setDelegate(this);

        this.editBoxEditingDidEnd = function (editBox) {
            if(editBox.getString() != ""){
                editBox.setString(Number(editBox.getString()))
            }
        };

        btn_setCommision.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.Panel_gxbl.setVisible(false);
                that.listView.setVisible(true);
                // that.rquestSetPartnerCommission(2, that.setUserId, that.bili.getString());
                cc.log("parseFloat(that.bili.getString())", parseFloat(that.bili.getString()));
                cc.log("that.parentCommissionValueArr[that.selectIndex - 1]", that.parentCommissionValueArr[that.selectIndex - 1]);
                if(parseFloat(that.bili.getString()) > that.parentCommissionValueArr[that.selectIndex - 1]){
                    MjClient.showToast("贡献比例不能高于自己的贡献");
                    return;
                }
                that.rangeTextArr[that.selectIndex + 19].setString(that.bili.getString());
                that.myCommissionValueArr[that.selectIndex-1] = parseFloat(that.bili.getString());
                that.bili.setString("");
            }
        });
        btn_cancleSetCommision.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.Panel_gxbl.setVisible(false);
                that.listView.setVisible(true);
                that.bili.setString("");
            }
        });

        var config = {
            limitMin:0,
            limitMax:1000,
            dValue:1,
            defaultValue:0,
            defaultOpenIndex:0
        }
        this.editBoxArr = [];
        this.rangeTextArr = [];
        this.rangeValueArr = [];
        this.myCommissionValueArr = [];                 //我给下级的贡献比例
        this.parentCommissionValueArr = [];             //上级给我的贡献比例
        this.setMatchModeLimitScore = function(index){
            if(this.editBoxArr[index].value < config.limitMin){
                this.editBoxArr[index].value = config.limitMax;
            }
            if(this.editBoxArr[index].value > config.limitMax){
                this.editBoxArr[index].value = config.limitMin;
            }
            let rangeValueMin = 0;
            this.rangeValueArr[index] = this.editBoxArr[index].value;
            this.parentCommissionValueArr[index] = this.editBoxArr[index].value;
            for (let i = index - 1; i >= 0; i--) {
                const element = this.rangeValueArr[i];
                if(element >= this.editBoxArr[index].value || element <= 0|| this.editBoxArr[index].value <= 0){
                    MjClient.showToast("范围设置不正确，不能低于等于前面的数值");
                    // this.rangeTextArr[index].setString("" + 0 + "-" + 0);
                    this.rangeTextArr[index].setString("" + 0);
                    this.rangeTextArr[index + 10].setString("" + 0);
                    this.editBoxArr[index].setString("");
                    return ;
                }
            }
            if(index > 0){
                rangeValueMin = this.rangeValueArr[index - 1] + 0.01;
            }
            // this.rangeTextArr[index].setString("" + rangeValueMin + "-" + this.editBoxArr[index].value);
            this.rangeTextArr[index].setString("" + this.editBoxArr[index].value);
            this.rangeTextArr[index + 10].setString("" + this.editBoxArr[index].value);
            this.editBoxArr[index].setString("");
            cc.log("index + 10:", index + 10);
        }


        var cell = back.getChildByName("cell")
        var btn_ok = back.getChildByName("btn_ok")
        this.listView = back.getChildByName("ListView_2")
        cell.setVisible(false);
        this.listView.removeAllItems();
        this.selectIndex = 1;
        var rangeTextArrTemp = [];
        var rangeTextArrTemp2 = [];
        for(var i = 0 ; i < 10 ; i++){
            var item = cell.clone();
            item.setVisible(true);
            that.listView.pushBackCustomItem(item);

            var text_num = item.getChildByName("Text_1")
            text_num.setString(i + 1)

            var btn_xg = item.getChildByName("btn_xg")
            let iTemp = i;
            btn_xg.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    that.Panel_gxbl.setVisible(true);
                    that.listView.setVisible(false);
                    that.selectIndex = iTemp + 1;
                }
            });
            text_num = item.getChildByName("Text_3")
            text_num.setString("0");
            var text_num2 = item.getChildByName("Text_4")
            text_num2.setString("0");

            //设置范围
            var text_range = item.getChildByName("Text_2")
            var edtContentSize= text_range.getContentSize();
            edtContentSize.width *= 1.5;
            edtContentSize.height *= 1.5;
            var edt_input = new cc.EditBox(edtContentSize, new cc.Scale9Sprite());
            this.editBoxArr.push(edt_input);
            this.rangeTextArr.push(text_range);
            this.rangeValueArr.push(0);
            this.myCommissionValueArr.push(0);
            this.parentCommissionValueArr.push(0);
            rangeTextArrTemp.push(text_num);
            rangeTextArrTemp2.push(text_num2);
            edt_input.setFontColor(text_range.getTextColor());
            edt_input.setPlaceholderFontColor(cc.color(0xFF, 0xFF, 0xFF));
            edt_input.setMaxLength(10);
            edt_input.setFontSize(text_range.getFontSize());
            edt_input.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            edt_input.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
            edt_input.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            edt_input.setPlaceHolder("");
            edt_input.setPlaceholderFontSize(text_range.getFontSize());
            edt_input.setPosition(edtContentSize.width / 2, edtContentSize.height / 2);
            edt_input.setTag(i);

            edt_input.editBoxEditingDidEnd = function (editBox) {
                var str = editBox.getString();
                while(str != "0" && str.indexOf("0") == 0){
                    //避免parseInt转化八进制或十六进制
                    str = str.substring(1,str.length);
                }
                var input = parseFloat(str);
                if(editBox.getString().length == 0 || input == null || isNaN(input)){
                    input = config.defaultValue
                }else if(input > config.limitMax){
                    input = config.limitMax
                }else if(input < config.limitMin){
                    input = config.limitMin
                }
                editBox.value = parseFloat(input);
                that.setMatchModeLimitScore(editBox.getTag());
            };

            edt_input.setDelegate(edt_input);
            text_range.addChild(edt_input);
            text_range.setString("0");
            edt_input.value = config.defaultValue;
            if(that.roleId != 3){
                edt_input.setVisible(false);
            }
            //设置贡献
        }
        for( var i in rangeTextArrTemp)
        {
            this.rangeTextArr.push(rangeTextArrTemp[i]);
        }
        for( var i in rangeTextArrTemp2)
        {
            this.rangeTextArr.push(rangeTextArrTemp2[i]);
        }

        btn_ok.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var data = {};
                for (let index = 0; index < that.maxSize; index++) {
                    if(isNaN(that.myCommissionValueArr[index])){
                        MjClient.showToast("贡献 " + (index + 1) +" 只能输入数字格式，设置贡献比例错误");
                        return;
                    }
                    if(that.myCommissionValueArr[index] > that.parentCommissionValueArr[index] || that.myCommissionValueArr[index] > that.rangeValueArr[index]){
                        MjClient.showToast("贡献 " + (index + 1) +" 大于自己的贡献比例，设置贡献比例错误");
                        return;
                    }
                }
                for (let index = 0; index < that.maxSize; index++) {
                    data['commission' + index] = that.myCommissionValueArr[index];
                    data['range' + index] = that.rangeValueArr[index];
                }
                that.rquestSetPartnerCommission(2, that.setUserId,data);
                that.removeFromParent(true)
            }
        });


        this.rquestGetPartnerCommission(2, this.setUserId);
    },
    onExit: function () {
        this._super();
        MjClient.FriendCard_SXF_ledou_gxbl = null;
    },
});


