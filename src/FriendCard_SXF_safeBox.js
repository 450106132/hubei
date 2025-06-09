// 亲友圈-保险箱
var FriendCard_SXF_safeBox = cc.Layer.extend({
    ctor:function(clubId) {
        this._super();
        MjClient.FriendCard_SXF_safeBox = this;
        this.clubId = clubId
        this.cunquType = 1
        var node = ccs.load("friendcard_SXF_safeBox.json").node;
        this.addChild(node);
        var back = node.getChildByName("back");
        setWgtLayout(back, [0.8, 0.8], [0.5, 0.5], [0, 0]);
        setWgtLayout(node.getChildByName("block"), [1, 1], [0.5, 0.5], [0, 0], true);
        COMMON_UI.setNodeTextAdapterSize(back);
        this.init(back);
        this.getData(back);
    },
    init:function(back){
        this.myHappyBean = 0
        this.myHappyBeanInBank = 0

        var btn_ok = back.getChildByName("btn_ok")
        btn_ok.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var happyBeanNum = Number(this.inputBox.getString())
                if(happyBeanNum <= 0){
                    this.removeFromParent(true)
                    return;
                }
                var sendInfo = {
                    clubId: this.clubId,
                    happyBean:happyBeanNum,
                    type:this.cunquType
                }
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.clubBankOperation", sendInfo, function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.clubBankOperation === " + JSON.stringify(rtn))
                    if (rtn.code == 0) {
                        MjClient.showToast("操作成功");
                    }else{
                        if(rtn.message){
                            MjClient.showMsgTop(rtn.message);
                        }
                    }
                });
                this.removeFromParent(true)
            }
        },this);
        var btn_cun = back.getChildByName("btn_cun")
        var btn_qu = back.getChildByName("btn_qu")
        var text_cunqu = back.getChildByName("Text_cunqu")
        var resetData = function(){
            this.inputBox.setString("")
            this.slider.setPercent(0)
            this.text_bili.setString("0%");
            this.text_bili.setPositionX(132);
        }.bind(this)
        btn_cun.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                btn_qu.setVisible(true)
                btn_cun.setVisible(false)
                text_cunqu.setString("按比例取出")
                this.cunquType = 2
                resetData()
            }
        },this);
        btn_qu.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                btn_qu.setVisible(false)
                btn_cun.setVisible(true)
                text_cunqu.setString("按比例存入")
                this.cunquType = 1
                resetData()
            }
        },this);

        var inputBox = back.getChildByName("Image_inputBox");
        this.inputBox = new cc.EditBox(inputBox.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/inputbg.png"));
        this.inputBox.setPlaceholderFontSize(30);
        this.inputBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.inputBox.setPlaceHolder("请输入数额");
        this.inputBox.setPosition(inputBox.getContentSize().width/2, inputBox.getContentSize().height/2);
        this.inputBox.setFontColor(cc.color("#9f6a36"));
        inputBox.addChild(this.inputBox);
        this.inputBox.setDelegate(this);

        this.editBoxEditingDidEnd = function (editBox) {
            var num = Number(this.inputBox.getString())
            var percent = 0
            var numMax = this.myHappyBean
            if(this.cunquType == 2){
                numMax = this.myHappyBeanInBank
            }
            if(num >= numMax){
                num = numMax
                if(numMax != 0){
                    percent = 100
                }
            }else{
                percent = Math.floor(num*100/numMax)
            }
            this.inputBox.setString(num)
            this.slider.setPercent(percent)
            this.text_bili.setString(percent + "%");
            this.text_bili.setPositionX(132 + 5*percent);
        };

        this.text_bili = back.getChildByName("Text_bili");
        this.slider = back.getChildByName("Slider_1");
        this.slider.addEventListener(function (sender, type) {
            switch (type) {
                case ccui.Slider.EVENT_PERCENT_CHANGED:
                    var slider = sender;
                    var percent = slider.getPercent();
                    this.text_bili.setString(percent + "%");
                    var num = percent/100 * this.myHappyBean
                    if(this.cunquType == 2){
                        num = percent/100 * this.myHappyBeanInBank
                    }
                    this.inputBox.setString(Math.floor(num))
                    this.text_bili.setPositionX(132 + 5*percent);
                    break;
                default:
                    break;
            }
        },this);
    },
    getData:function(back){
        var self = this
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.clubGetMyHappyBean", { clubId: this.clubId }, function(rtn) {
            MjClient.unblock();
            cc.log(" ===== pkplayer.handler.clubGetMyHappyBean === " + JSON.stringify(rtn))
            if (rtn.code == 0) {
                var text_dqldNum = back.getChildByName("Text_dqldNum")
                text_dqldNum.setString("当前乐豆：" + rtn.data.happyBean)
                var text_yhldNum = back.getChildByName("Text_yhldNum")
                text_yhldNum.setString("银行乐豆：" + rtn.data.happyBeanInBank)
                self.myHappyBean = rtn.data.happyBean
                self.myHappyBeanInBank = rtn.data.happyBeanInBank
            }else{
                if(rtn.message){
                    MjClient.showMsgTop(rtn.message);
                }
            }
        });
    },
    onExit: function () {
        this._super();
        MjClient.FriendCard_SXF_safeBox = null;
    },
});


