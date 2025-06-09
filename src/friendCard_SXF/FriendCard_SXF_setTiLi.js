// 亲友圈-乐豆发放回收操作
var FriendCard_SXF_setTiLi = cc.Layer.extend({
    ctor:function(setTiLiData) {
        this._super();
        MjClient.FriendCard_SXF_setTiLi = this;
        var node = ccs.load("friendCard_SXF_setTiLi.json").node;
        this.addChild(node);
        var back = node.getChildByName("back");
        setWgtLayout(back, [0.9, 0.9], [0.5, 0.5], [0, 0]);
        setWgtLayout(node.getChildByName("block"), [1, 1], [0.5, 0.5], [0, 0], true);
        this.panel_shuoming = node.getChildByName("panel_shuoming");
        this.block_shuoming = node.getChildByName("block_shuoming");
        setWgtLayout(this.panel_shuoming, [1, 1], [0.5, 0.5], [0, 0]);
        setWgtLayout(this.block_shuoming, [1, 1], [0.5, 0.5], [0, 0], true);
        this.panel_shuoming.setVisible(false)
        this.block_shuoming.setVisible(false)
        COMMON_UI.setNodeTextAdapterSize(back);
        this.setTiLiData = setTiLiData;
        this.init(back);
        this.readRoomConfig(back);
    },
    init:function(back){
        var that = this

        var btn_close = back.getChildByName("btn_close");
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                //关闭按钮
                that.setTiLiData.isShowHappyBeanConfig = false;
                that.removeFromParent(true)
            }
        });

        var btn_close_shuoming = this.panel_shuoming.getChildByName("btn_close");
        btn_close_shuoming.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                //关闭按钮
                that.panel_shuoming.setVisible(false)
                that.block_shuoming.setVisible(false)
            }
        });

        var btn_ok = back.getChildByName("btn_ok");
        btn_ok.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                //确认按钮
                that.saveRoomConfig(back)
                that.removeFromParent(true)
            }
        });

        var btn_shuoming = back.getChildByName("btn_shuoming");
        btn_shuoming.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                //说明按钮
                that.block_shuoming.setVisible(true)
                that.panel_shuoming.setVisible(true)
            }
        });

        var img_bg1 = back.getChildByName("img_bg1");
        var img_bg2_1 = back.getChildByName("img_bg2_1");
        var img_bg2_2 = back.getChildByName("img_bg2_2");
        var img_bg3_1 = img_bg2_1.getChildByName("img_bg3_1");
        var img_bg3_2 = img_bg2_2.getChildByName("img_bg3_2");
        var parentList = [
            img_bg1, img_bg1, img_bg1,
            img_bg2_1,
            img_bg3_1, img_bg3_1, img_bg3_1,
            img_bg3_1, img_bg3_1, img_bg3_1,
            img_bg3_1, img_bg3_1, img_bg3_1,
            img_bg3_1, img_bg3_1, img_bg3_1,
            img_bg3_2, img_bg3_2, img_bg3_2,
            img_bg3_2, img_bg3_2, img_bg3_2,
            img_bg3_2, img_bg3_2, img_bg3_2,
            img_bg3_2, img_bg3_2, img_bg3_2,
        ]
        var strList = [
            "jf", "js","xp",
            "bfb",
            "dyjld_1", "dyjld_2", "dyjld_3",
            "dyjld_4", "dyjld_5", "dyjld_6",
            "ldxh_1", "ldxh_2", "ldxh_3",
            "ldxh_4", "ldxh_5", "ldxh_6",
            "zxh_1", "zxh_2", "zxh_3",
            "zxh_4", "zxh_5", "zxh_6",
            "bdz_1", "bdz_2", "bdz_3",
            "bdz_4", "bdz_5", "bdz_6",
        ]
        var config = {
            limitMin:0,
            limitMax:5000,
            dValue:1,
            defaultValue:0,
            defaultOpenIndex:0
        }
        for(var i = 0;i < parentList.length; i++){
            let parent
            if (parentList[i] ==  img_bg3_1) {
                parent = parentList[i].getChildByName("view")
            }else if (parentList[i] ==  img_bg3_2){
                parent = parentList[i].getChildByName("view2")
            } else {
                parent = parentList[i]
            }
            let str = strList[i]
            var btn_sub = parent.getChildByName("btn_sub_" + str)
            var btn_add = parent.getChildByName("btn_add_" + str)
            // btn_sub.setVisible(false);
            // btn_add.setVisible(false);
            let tempI = i;
            btn_sub.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    //减
                    // var text_num = parent.getChildByName("img_numBg_" + str).getChildByName("Text_num_" + str)
                    // var num = Number(text_num.getString())
                    // if(num > 100){
                    //     num = num - 100
                    // }else if(num > 10){
                    //     num = num - 10
                    // }else if(num > 1){
                    //     num = num - 1
                    // }else if(num > 0){
                    //     num = (num*10 - 1)/10
                    // }
                    // text_num.setString(num)
                    that.editBoxArr[tempI].value -= config.dValue;
                    that.editBoxArr[tempI].setString(""+that.editBoxArr[tempI].value);
                    cc.log("that.editBoxArr[i].value", that.editBoxArr[tempI].value, config.dValue, tempI);
                }
            });
            btn_add.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    //加
                    // var text_num = parent.getChildByName("img_numBg_" + str).getChildByName("Text_num_" + str)
                    // var num = Number(text_num.getString())
                    // if(num >= 100){
                    //     num = num + 100
                    // }
                    // else if(num >= 10){
                    //     num = num + 10
                    // }
                    // else if(num >= 1){
                    //     num = num + 1
                    // }else if(num >= 0){
                    //     num = (num*10 + 1)/10
                    // }
                    // text_num.setString(num)
                    that.editBoxArr[tempI].value += config.dValue;
                    that.editBoxArr[tempI].setString(""+that.editBoxArr[tempI].value);
                    cc.log("that.editBoxArr[i].value", that.editBoxArr[tempI].value, config.dValue, tempI);
                }
            });
        }

        parentList = [
            img_bg2_1, img_bg2_1,
            img_bg2_1, img_bg2_1,
            img_bg2_2, img_bg2_2,
        ]
        strList = [
            "dyjms", "jtms",
            "gdz", "bfb",
            "gdz", "bfb",
        ]
        for(var i = 0;i < parentList.length; i++){
            let parent = parentList[i]
            //wj
            // parent.getChildByName("Text_baifenhao_1").y -= 4;
            // parent.getChildByName("Text_baifenhao_2").y -= 4;
            // parent.getChildByName("Text_baifenhao_3").y -= 4;

            let str = strList[i]
            var index_huchi = i%2 == 0 ? i+1 : i-1
            let str_huchi = strList[index_huchi]
            var checkBox = parent.getChildByName("CheckBox_" + str)
            checkBox.addEventListener(function (sender, type) {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        var text = parent.getChildByName("Text_" + str)
                        // text.setTextColor(cc.color(255,0,0));
                        var checkBox_huchi = parent.getChildByName("CheckBox_" + str_huchi)
                        checkBox_huchi.setSelected(false);
                        var text_huchi = parent.getChildByName("Text_" + str_huchi)
                        text_huchi.setTextColor(cc.color(0,0,0));
                        if(str == "bfb"){

                            //wj 控制百分号开关
                            if(parent == img_bg2_1){
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab").visible = true;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab1").visible = true;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab2").visible = true;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab3").visible = true;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab4").visible = true;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab5").visible = true;
                            }else if(parent == img_bg2_2){
                                parent.getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab").visible = true;
                                parent.getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab1").visible = true;
                                parent.getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab2").visible = true;
                                parent.getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab3").visible = true;
                                parent.getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab4").visible = true;
                                parent.getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab5").visible = true;
                            }
                            

                            // parent.getChildByName("Text_baifenhao_1").setVisible(true);
                            // parent.getChildByName("Text_baifenhao_2").setVisible(true);
                            // parent.getChildByName("Text_baifenhao_3").setVisible(true);
                        }
                        else if(str == "gdz"){
                            //wj
                            if(parent == img_bg2_1){
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab").visible = false;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab1").visible = false;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab2").visible = false;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab3").visible = false;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab4").visible = false;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab5").visible = false;
                            }else if(parent == img_bg2_2){
                                parent.getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab").visible = false;
                                parent.getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab1").visible = false;
                                parent.getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab2").visible = false;
                                parent.getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab3").visible = false;
                                parent.getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab4").visible = false;
                                parent.getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab5").visible = false;
                            }

                            // parent.getChildByName("Text_baifenhao_1").setVisible(false);
                            // parent.getChildByName("Text_baifenhao_2").setVisible(false);
                            // parent.getChildByName("Text_baifenhao_3").setVisible(false);
                        }
                        if(str == "dyjms"){
                            // if(parent.getChildByName("CheckBox_sywj").isSelected()){
                                //     parent.getChildByName("CheckBox_ds").setSelected(false);
                                //     parent.getChildByName("CheckBox_pt").setSelected(true);
                                //     parent.getChildByName("CheckBox_sywj").setSelected(false);
                                // }
                                parent.getChildByName("CheckBox_bfb").setVisible(true);
                                parent.getChildByName("Text_bfb").setVisible(true);
                            // }
                            parent.getChildByName("CheckBox_sywj").setVisible(false);
                            parent.getChildByName("Text_sywj").setVisible(false);                          
                        }
                        else if(str == "jtms"){
                            parent.getChildByName("CheckBox_sywj").setVisible(true);
                            parent.getChildByName("Text_sywj").setVisible(true);

                            //wj 均摊模式控制百分比
                            if(parent.getChildByName("CheckBox_sywj").isSelected()){
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab").visible = true;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab1").visible = true;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab2").visible = true;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab3").visible = true;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab4").visible = true;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab5").visible = true;
                            }else{
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab").visible = false;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab1").visible = false;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab2").visible = false;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab3").visible = false;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab4").visible = false;
                                parent.getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab5").visible = false;
                            }
                        }
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        sender.setSelected(true);
                        break;
                }
            })
        }

        strList = [
            "pt", "ds", "sywj"
        ]
        for(var i = 0; i < 3; i++){
            let str = strList[i]
            let str2 = strList[(i + 1) % 3]
            let str3 = strList[(i + 2) % 3]
            var checkBox = img_bg2_1.getChildByName("CheckBox_" + str)
            checkBox.addEventListener(function (sender, type) {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        var text = img_bg2_1.getChildByName("Text_" + str);
                        // text.setTextColor(cc.color(255,0,0));

                        var huchi = img_bg2_1.getChildByName("CheckBox_" + str2);
                        huchi.setSelected(false);
                        var text_huchi = img_bg2_1.getChildByName("Text_" + str2);
                        text_huchi.setTextColor(cc.color(0,0,0));

                        huchi = img_bg2_1.getChildByName("CheckBox_" + str3);
                        huchi.setSelected(false);
                        text_huchi = img_bg2_1.getChildByName("Text_" + str3);
                        text_huchi.setTextColor(cc.color(0,0,0));

                        if(str == "sywj"){
                            var temp = img_bg2_1.getChildByName("CheckBox_gdz");
                            temp.setSelected(true);
                            temp = img_bg2_1.getChildByName("CheckBox_bfb");
                            temp.setSelected(false);
                            temp.setVisible(false);
                            img_bg2_1.getChildByName("Text_bfb").setVisible(false);
                            img_bg2_1.getChildByName("Text_baifenhao_1").setVisible(false);
                            img_bg2_1.getChildByName("Text_baifenhao_2").setVisible(false);
                            img_bg2_1.getChildByName("Text_baifenhao_3").setVisible(false);
                        }
                        else{
                            img_bg2_1.getChildByName("CheckBox_bfb").setVisible(true);
                            img_bg2_1.getChildByName("Text_bfb").setVisible(true);
                        }
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        sender.setSelected(true);
                        break;
                }
            })
        }
        this.insertTextInput(back);
    },
    insertTextInput:function(back){

        var img_bg1 = back.getChildByName("img_bg1");
        var img_bg2_1 = back.getChildByName("img_bg2_1");
        var img_bg2_2 = back.getChildByName("img_bg2_2");
        var img_bg3_1 = img_bg2_1.getChildByName("img_bg3_1");
        var img_bg3_2 = img_bg2_2.getChildByName("img_bg3_2");
        var parentList = [
            img_bg1, img_bg1, img_bg1,
            img_bg2_1,
            img_bg3_1, img_bg3_1, img_bg3_1,
            img_bg3_1, img_bg3_1, img_bg3_1,
            img_bg3_1, img_bg3_1, img_bg3_1,
            img_bg3_1, img_bg3_1, img_bg3_1,
            img_bg3_2, img_bg3_2, img_bg3_2,
            img_bg3_2, img_bg3_2, img_bg3_2,
            img_bg3_2, img_bg3_2, img_bg3_2,
            img_bg3_2, img_bg3_2, img_bg3_2,
        ]
        var strList = [
            "jf", "js","xp",
            "bfb",
            "dyjld_1", "dyjld_2", "dyjld_3",
            "dyjld_4", "dyjld_5", "dyjld_6",
            "ldxh_1", "ldxh_2", "ldxh_3",
            "ldxh_4", "ldxh_5", "ldxh_6",
            "zxh_1", "zxh_2", "zxh_3",
            "zxh_4", "zxh_5", "zxh_6",
            "bdz_1", "bdz_2", "bdz_3",
            "bdz_4", "bdz_5", "bdz_6",
        ]

        var config = {
            limitMin:0,
            limitMax:5000,
            dValue:1,
            defaultValue:0,
            defaultOpenIndex:0
        }

        this.editBoxArr = [];
        var that = this
        for(var i = 0;i < parentList.length; i++){
            let parent

            if (parentList[i] ==  img_bg3_1) {
                parent = parentList[i].getChildByName("view")
                //wj
                // parent.setTouchEnabled(false);
                if(!lab){
                    var lab = img_bg2_1.getChildByName("Text_baifenhao_1").clone();
                    var pos = parent.getChildByName("btn_add_ldxh_1").getPosition();
                    lab.setPosition(pos.x+50,pos.y);
                    lab.setName("lab");
                    parent.addChild(lab);
                    // this.lab = lab;

                    var lab1 = lab.clone();
                    var pos1 = parent.getChildByName("btn_add_ldxh_2").getPosition();
                    lab1.setPosition(pos1.x+50,pos1.y);
                    lab1.setName("lab1");
                    parent.addChild(lab1);

                    var lab2 = lab.clone();
                    var pos2 = parent.getChildByName("btn_add_ldxh_3").getPosition();
                    lab2.setPosition(pos2.x+50,pos2.y);
                    lab2.setName("lab2");
                    parent.addChild(lab2);

                    var lab3 = lab.clone();
                    var pos3 = parent.getChildByName("btn_add_ldxh_4").getPosition();
                    lab3.setPosition(pos3.x+50,pos3.y);
                    lab3.setName("lab3");
                    parent.addChild(lab3);

                    var lab4 = lab.clone();
                    var pos4 = parent.getChildByName("btn_add_ldxh_5").getPosition();
                    lab4.setPosition(pos4.x+50,pos4.y);
                    lab4.setName("lab4");
                    parent.addChild(lab4);

                    var lab5 = lab.clone();
                    var pos5 = parent.getChildByName("btn_add_ldxh_6").getPosition();
                    lab5.setPosition(pos5.x+50,pos5.y);
                    lab5.setName("lab5");
                    parent.addChild(lab5);

                }           
            }else if (parentList[i] ==  img_bg3_2){
                parent = parentList[i].getChildByName("view2")
                //wj
                if(!lab_2){
                    var lab_2 = img_bg2_1.getChildByName("Text_baifenhao_1").clone();
                    var pos = parent.getChildByName("btn_add_bdz_1").getPosition();
                    lab_2.setPosition(pos.x+50,pos.y);
                    lab_2.setName("lab");
                    parent.addChild(lab_2);

                    var lab1 = lab_2.clone();
                    var pos1 = parent.getChildByName("btn_add_bdz_2").getPosition();
                    lab1.setPosition(pos1.x+50,pos1.y);
                    lab1.setName("lab1");
                    parent.addChild(lab1);

                    var lab2 = lab_2.clone();
                    var pos2 = parent.getChildByName("btn_add_bdz_3").getPosition();
                    lab2.setPosition(pos2.x+50,pos2.y);
                    lab2.setName("lab2");
                    parent.addChild(lab2);

                    var lab3 = lab_2.clone();
                    var pos3 = parent.getChildByName("btn_add_bdz_4").getPosition();
                    lab3.setPosition(pos3.x+50,pos3.y);
                    lab3.setName("lab3");
                    parent.addChild(lab3);

                    var lab4 = lab_2.clone();
                    var pos4 = parent.getChildByName("btn_add_bdz_5").getPosition();
                    lab4.setPosition(pos4.x+50,pos4.y);
                    lab4.setName("lab4");
                    parent.addChild(lab4);

                    var lab5 = lab_2.clone();
                    var pos5 = parent.getChildByName("btn_add_bdz_6").getPosition();
                    lab5.setPosition(pos5.x+50,pos5.y);
                    lab5.setName("lab5");
                    parent.addChild(lab5);
                    
                }
            }else {
                parent = parentList[i]
            }
            let str = strList[i]

            var temp =  parent.getChildByName("img_numBg_" + str).getChildByName("Text_num_" + str);//不需要text了，改成可editbox
            temp.ignoreContentAdaptWithSize(true);
            var image_fen_bg = parent.getChildByName("img_numBg_" + str);
            var edtContentSize= image_fen_bg.getContentSize();
            var edt_input = new cc.EditBox(edtContentSize, new cc.Scale9Sprite());
            this.editBoxArr.push(edt_input) ;
            edt_input.setFontColor(temp.getTextColor());
            edt_input.setPlaceholderFontColor(cc.color(0xFF, 0xFF, 0xFF));
            edt_input.setMaxLength(10);
            edt_input.setFontSize(temp.getFontSize());
            edt_input.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            edt_input.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
            edt_input.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            edt_input.setPlaceHolder("");
            edt_input.setPlaceholderFontSize(temp.getFontSize());
            edt_input.setPosition(edtContentSize.width/2, edtContentSize.height/2);
            edt_input.setTag(i);

            edt_input.editBoxEditingDidEnd = function (editBox) {
                var str = editBox.getString();
                while(str != "0" && str.indexOf("0") == 0){
                    //避免parseFloat转化八进制或十六进制
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
                that.editBoxArr[editBox.getTag()].value = parseFloat(input);
                that.setMatchModeLimitScore(editBox.getTag());
            };

            edt_input.setDelegate(edt_input);
            image_fen_bg.addChild(edt_input);
            temp.visible = false;
            edt_input.value = config.defaultValue;
        }

        this.setMatchModeLimitScore = function(index){
            if(this.editBoxArr[index].value < config.limitMin){
                this.editBoxArr[index].value = config.limitMax;
            }
            if(this.editBoxArr[index].value > config.limitMax){
                this.editBoxArr[index].value = config.limitMin;
            }
            this.editBoxArr[index].setString(""+this.editBoxArr[index].value);
        }
    },
    saveRoomConfig: function(back){
        this.setTiLiData.isAntiAddictionLimit = 1;              //分数不足无法进场
        this.setTiLiData.isAntiAddictionDissolveLimit = 1;      //分数不足自动解散
        this.setTiLiData.isXipaiLedou = 1;
        this.setTiLiData.isCommissionBottom = 1;                //是否抽成
        //分数不为负
        this.setTiLiData.antiAddictionScoreNeedEnough = back.getChildByName("CheckBox_fsbwf").isSelected()?1:0;
        //座位消耗
        this.setTiLiData.xipaiLedou = this.parseTextInputText(this.editBoxArr[2])
        //进场分
        this.setTiLiData.antiAddictionLimitScore = this.parseTextInputText(this.editBoxArr[0])
        //解散分
        this.setTiLiData.antiAddictionDissolveLimitScore = this.parseTextInputText(this.editBoxArr[1])
        //樂豆
        this.setTiLiData.antiAddictionXiPaiLeDou = this.parseTextInputText(this.editBoxArr[2])
        //分数消耗模式
        this.setTiLiData.scoreExpendMode = back.getChildByName("img_bg2_1").getChildByName("CheckBox_dyjms").isSelected()?0:1

        //多个大赢家平摊还是单算
        this.setTiLiData.shareCostWhenManyWinner = back.getChildByName("img_bg2_1").getChildByName("CheckBox_pt").isSelected()?0:0
        this.setTiLiData.shareCostWhenManyWinner = back.getChildByName("img_bg2_1").getChildByName("CheckBox_ds").isSelected()?1:0
        // this.setTiLiData.shareCostWhenManyWinner = back.getChildByName("img_bg2_1").getChildByName("CheckBox_sywj").isSelected()?2:0

        //固定值还是百分比
        this.setTiLiData.isFixRate = back.getChildByName("img_bg2_1").getChildByName("CheckBox_gdz").isSelected()?1:0

        //封顶
        this.setTiLiData.maxRate = this.parseTextInputText(this.editBoxArr[3])

        //区间收费条件底分
        this.setTiLiData.commissionBottomScore = this.parseTextInputText(this.editBoxArr[4])
        this.setTiLiData.commissionBottomScore2 = this.parseTextInputText(this.editBoxArr[5])
        this.setTiLiData.commissionBottomScore3 = this.parseTextInputText(this.editBoxArr[6])
        this.setTiLiData.commissionBottomScore4 = this.parseTextInputText(this.editBoxArr[7])
        this.setTiLiData.commissionBottomScore5 = this.parseTextInputText(this.editBoxArr[8])
        this.setTiLiData.commissionBottomScore6 = this.parseTextInputText(this.editBoxArr[9])

        //区间收费抽成
        this.setTiLiData.commissionRate = this.parseTextInputText(this.editBoxArr[10])
        this.setTiLiData.commissionRate2 = this.parseTextInputText(this.editBoxArr[11])
        this.setTiLiData.commissionRate3 = this.parseTextInputText(this.editBoxArr[12])
        this.setTiLiData.commissionRate4 = this.parseTextInputText(this.editBoxArr[13])
        this.setTiLiData.commissionRate5 = this.parseTextInputText(this.editBoxArr[14])
        this.setTiLiData.commissionRate6 = this.parseTextInputText(this.editBoxArr[15])

        this.setTiLiData.isMinGuaranteeFixRate = back.getChildByName("img_bg2_2").getChildByName("CheckBox_gdz").isSelected()?1:0
        //保底设置-总消耗
        this.setTiLiData.minGuaranteeScore = this.parseTextInputText(this.editBoxArr[16])
        this.setTiLiData.minGuaranteeScore2 = this.parseTextInputText(this.editBoxArr[17])
        this.setTiLiData.minGuaranteeScore3 = this.parseTextInputText(this.editBoxArr[18])
        this.setTiLiData.minGuaranteeScore4 = this.parseTextInputText(this.editBoxArr[19])
        this.setTiLiData.minGuaranteeScore5 = this.parseTextInputText(this.editBoxArr[20])
        this.setTiLiData.minGuaranteeScore6 = this.parseTextInputText(this.editBoxArr[21])
        //保底设置-抽成
        this.setTiLiData.minGuaranteeRate = this.parseTextInputText(this.editBoxArr[22])
        this.setTiLiData.minGuaranteeRate2 = this.parseTextInputText(this.editBoxArr[23])
        this.setTiLiData.minGuaranteeRate3 = this.parseTextInputText(this.editBoxArr[24])
        this.setTiLiData.minGuaranteeRate4 = this.parseTextInputText(this.editBoxArr[25])
        this.setTiLiData.minGuaranteeRate5 = this.parseTextInputText(this.editBoxArr[26])
        this.setTiLiData.minGuaranteeRate6 = this.parseTextInputText(this.editBoxArr[27])

        cc.log("this.setTiLiData.minGuaranteeRate3", this.setTiLiData.minGuaranteeRate3);

        this.setTiLiData.isShowHappyBeanConfig = false;
    },
    readRoomConfig: function(back){
        cc.log("readRoomConfig", this.editBoxArr);
        cc.log("readRoomConfig", this.setTiLiData.xipaiLedou, this.setTiLiData.antiAddictionLimitScore);
        back.getChildByName("CheckBox_fsbwf").setSelected(this.setTiLiData.antiAddictionScoreNeedEnough == 1)
        this.editBoxArr[0].setString(""+this.setTiLiData.antiAddictionLimitScore)
        this.editBoxArr[0].value = this.setTiLiData.antiAddictionLimitScore
        this.editBoxArr[1].setString(""+this.setTiLiData.antiAddictionDissolveLimitScore)
        this.editBoxArr[1].value = this.setTiLiData.antiAddictionDissolveLimitScore
        this.editBoxArr[2].setString(""+this.setTiLiData.xipaiLedou)
        this.editBoxArr[2].value = this.setTiLiData.xipaiLedou
    


        //分数消耗模式
        back.getChildByName("img_bg2_1").getChildByName("CheckBox_dyjms").setSelected(this.setTiLiData.scoreExpendMode == 0)
        back.getChildByName("img_bg2_1").getChildByName("CheckBox_jtms").setSelected(this.setTiLiData.scoreExpendMode == 1)

        //如果是大赢家模式，隐藏所有玩家
        // if(this.setTiLiData.scoreExpendMode == 0){
            back.getChildByName("img_bg2_1").getChildByName("CheckBox_sywj").setVisible(false);
            back.getChildByName("img_bg2_1").getChildByName("Text_sywj").setVisible(false);
        // }


        back.getChildByName("img_bg2_1").getChildByName("CheckBox_pt").setSelected(this.setTiLiData.shareCostWhenManyWinner == 0)
        back.getChildByName("img_bg2_1").getChildByName("CheckBox_ds").setSelected(this.setTiLiData.shareCostWhenManyWinner == 1)
        // back.getChildByName("img_bg2_1").getChildByName("CheckBox_sywj").setSelected(this.setTiLiData.shareCostWhenManyWinner == 2)//wj

        back.getChildByName("img_bg2_1").getChildByName("CheckBox_gdz").setSelected(this.setTiLiData.isFixRate == 1)
        back.getChildByName("img_bg2_1").getChildByName("CheckBox_bfb").setSelected(this.setTiLiData.isFixRate == 0)
        //wj
        back.getChildByName("img_bg2_1").getChildByName("Text_baifenhao_1").setVisible(false);
        back.getChildByName("img_bg2_1").getChildByName("Text_baifenhao_2").setVisible(false);
        back.getChildByName("img_bg2_1").getChildByName("Text_baifenhao_3").setVisible(false);

        //wj
        back.getChildByName("img_bg2_1").getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab").setVisible(this.setTiLiData.isFixRate == 0)
        back.getChildByName("img_bg2_1").getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab1").setVisible(this.setTiLiData.isFixRate == 0)
        back.getChildByName("img_bg2_1").getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab2").setVisible(this.setTiLiData.isFixRate == 0)
        back.getChildByName("img_bg2_1").getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab3").setVisible(this.setTiLiData.isFixRate == 0)
        back.getChildByName("img_bg2_1").getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab4").setVisible(this.setTiLiData.isFixRate == 0)
        back.getChildByName("img_bg2_1").getChildByName("img_bg3_1").getChildByName("view").getChildByName("lab5").setVisible(this.setTiLiData.isFixRate == 0)




        this.editBoxArr[3].setString(""+this.setTiLiData.maxRate)
        this.editBoxArr[3].value = this.setTiLiData.maxRate
        this.editBoxArr[4].setString(""+this.setTiLiData.commissionBottomScore)
        this.editBoxArr[4].value = this.setTiLiData.commissionBottomScore
        this.editBoxArr[5].setString(""+this.setTiLiData.commissionBottomScore2)
        this.editBoxArr[5].value = this.setTiLiData.commissionBottomScore2
        this.editBoxArr[6].setString(""+this.setTiLiData.commissionBottomScore3)
        this.editBoxArr[6].value = this.setTiLiData.commissionBottomScore3
        this.editBoxArr[7].setString(""+this.setTiLiData.commissionBottomScore4)
        this.editBoxArr[7].value = this.setTiLiData.commissionBottomScore4
        this.editBoxArr[8].setString(""+this.setTiLiData.commissionBottomScore5)
        this.editBoxArr[8].value = this.setTiLiData.commissionBottomScore5
        this.editBoxArr[9].setString(""+this.setTiLiData.commissionBottomScore6)
        this.editBoxArr[9].value = this.setTiLiData.commissionBottomScore6
        this.editBoxArr[10].setString(""+this.setTiLiData.commissionRate)
        this.editBoxArr[10].value = this.setTiLiData.commissionRate
        this.editBoxArr[11].setString(""+this.setTiLiData.commissionRate2)
        this.editBoxArr[11].value = this.setTiLiData.commissionRate2
        this.editBoxArr[12].setString(""+this.setTiLiData.commissionRate3)
        this.editBoxArr[12].value = this.setTiLiData.commissionRate3
        this.editBoxArr[13].setString(""+this.setTiLiData.commissionRate4)
        this.editBoxArr[13].value = this.setTiLiData.commissionRate4
        this.editBoxArr[14].setString(""+this.setTiLiData.commissionRate5)
        this.editBoxArr[14].value = this.setTiLiData.commissionRate5
        this.editBoxArr[15].setString(""+this.setTiLiData.commissionRate6)
        this.editBoxArr[15].value = this.setTiLiData.commissionRate6

        //保底设置
        back.getChildByName("img_bg2_2").getChildByName("CheckBox_gdz").setSelected(this.setTiLiData.isMinGuaranteeFixRate == 1)
        back.getChildByName("img_bg2_2").getChildByName("CheckBox_bfb").setSelected(this.setTiLiData.isMinGuaranteeFixRate == 0)

        //wj
        back.getChildByName("img_bg2_2").getChildByName("Text_baifenhao_1").setVisible(false);
        back.getChildByName("img_bg2_2").getChildByName("Text_baifenhao_2").setVisible(false);
        back.getChildByName("img_bg2_2").getChildByName("Text_baifenhao_3").setVisible(false);

        //wj
        back.getChildByName("img_bg2_2").getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab").setVisible(this.setTiLiData.isMinGuaranteeFixRate == 0);
        back.getChildByName("img_bg2_2").getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab1").setVisible(this.setTiLiData.isMinGuaranteeFixRate == 0);
        back.getChildByName("img_bg2_2").getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab2").setVisible(this.setTiLiData.isMinGuaranteeFixRate == 0);
        back.getChildByName("img_bg2_2").getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab3").setVisible(this.setTiLiData.isMinGuaranteeFixRate == 0);
        back.getChildByName("img_bg2_2").getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab4").setVisible(this.setTiLiData.isMinGuaranteeFixRate == 0);
        back.getChildByName("img_bg2_2").getChildByName("img_bg3_2").getChildByName("view2").getChildByName("lab5").setVisible(this.setTiLiData.isMinGuaranteeFixRate == 0);


        this.editBoxArr[16].setString(""+this.setTiLiData.minGuaranteeScore)
        this.editBoxArr[16].value = this.setTiLiData.minGuaranteeScore
        this.editBoxArr[17].setString(""+this.setTiLiData.minGuaranteeScore2)
        this.editBoxArr[17].value = this.setTiLiData.minGuaranteeScore2
        this.editBoxArr[18].setString(""+this.setTiLiData.minGuaranteeScore3)
        this.editBoxArr[18].value = this.setTiLiData.minGuaranteeScore3
        this.editBoxArr[19].setString(""+this.setTiLiData.minGuaranteeScore4)
        this.editBoxArr[19].value = this.setTiLiData.minGuaranteeScore4
        this.editBoxArr[20].setString(""+this.setTiLiData.minGuaranteeScore5)
        this.editBoxArr[20].value = this.setTiLiData.minGuaranteeScore5
        this.editBoxArr[21].setString(""+this.setTiLiData.minGuaranteeScore6)
        this.editBoxArr[21].value = this.setTiLiData.minGuaranteeScore6
        this.editBoxArr[22].setString(""+this.setTiLiData.minGuaranteeRate)
        this.editBoxArr[22].value = this.setTiLiData.minGuaranteeRate
        this.editBoxArr[23].setString(""+this.setTiLiData.minGuaranteeRate2)
        this.editBoxArr[23].value = this.setTiLiData.minGuaranteeRate2
        this.editBoxArr[24].setString(""+this.setTiLiData.minGuaranteeRate3)
        this.editBoxArr[24].value = this.setTiLiData.minGuaranteeRate3
        this.editBoxArr[25].setString(""+this.setTiLiData.minGuaranteeRate4)
        this.editBoxArr[25].value = this.setTiLiData.minGuaranteeRate4
        this.editBoxArr[26].setString(""+this.setTiLiData.minGuaranteeRate5)
        this.editBoxArr[26].value = this.setTiLiData.minGuaranteeRate5
        this.editBoxArr[27].setString(""+this.setTiLiData.minGuaranteeRate6)
        this.editBoxArr[27].value = this.setTiLiData.minGuaranteeRate6

    },
    parseTextInputText: function(editBox){
        var config = {
            limitMin:0,
            limitMax:5000,
            dValue:1,
            defaultValue:0,
            defaultOpenIndex:0
        }
        var str = editBox.getString();
        while(str != "0" && str.indexOf("0") == 0){
            //避免parseFloat转化八进制或十六进制
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


        if(editBox.value < config.limitMin){
            editBox.value = config.limitMax;
        }
        if(editBox.value > config.limitMax){
            editBox.value = config.limitMin;
        }
        cc.log("editBox.value", editBox.value);
        editBox.setString(""+editBox.value);
        return editBox.value;
    },
    onExit: function () {
        this._super();
        MjClient.FriendCard_SXF_setTiLi = null;
    },
});


