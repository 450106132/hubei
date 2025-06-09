/**
 * Created by WuXiaoDong on 2019/3/27.
 */
var FriendCard_actLuckyDraw = cc.Layer.extend({
    _back:null,
    _data:null,
    _rewardData:null,
    localConfig:{
        awardNames:["谢谢参与","5钻石","10钻石","20钻石","50钻石","100礼券","200礼券","1万金币"],
    },
    ctor: function () {
        this._super();
        var UI = ccs.load("friendcard_ActLuckyDraw.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);
        MjClient.friendCard_actLuckyDraw = this;
        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1,1],[0.5,0.5],[0,0]);

        COMMON_UI.setNodeTextAdapterSize(this._rootUI);
        //关闭按钮
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        //转盘
        this._nodeTurnplate = this._back.getChildByName("Node_turnplate");
        for(var i = 0; i < 8; i++){
            var item = this._nodeTurnplate.getChildByName("item"+i);
            item.setVisible(false);
        }

        this._text_num = this._back.getChildByName("Text_num");
        this._text_num.setString("");

        this._listView = this._back.getChildByName("ListView");
        this._listView._cell = this._back.getChildByName("Cell");
        this._listView._cell.setVisible(false);
        //转盘奖品
        for(var i = 0; i < 8; i++){
            var item = this._nodeTurnplate.getChildByName("item"+i);
            item.setVisible(true);
            var light = item.getChildByName("Image_light");
            light.setLocalZOrder(2);
            light.setVisible(false);
            var text_num = item.getChildByName("Text_num");
            text_num.setLocalZOrder(1);
            text_num.setString(this.localConfig.awardNames[i]);

            var image_award = item.getChildByName("Image_award");
            image_award.ignoreContentAdaptWithSize(true);
            image_award.loadTexture("friendCards/actLuckyDraw/image_award_"+i+".png");
            image_award.setScale(100/image_award.width);
            /*var url = this._data.awardsList[i].image;
            MjClient.loadImgQX(url, {isCrossOrigin : true}, function(err, texture)
            {
                if(!err&&texture && cc.sys.isObjectValid(this))
                {
                    var headSprite = new cc.Sprite(texture);
                    headSprite.setName("headSprite");
                    headSprite.setPosition(cc.p(this.width/2, this.height/2));
                    headSprite.setScaleX(this.width/headSprite.getContentSize().width);
                    headSprite.setScaleY(this.height/headSprite.getContentSize().height);
                    this.addChild(headSprite);
                }
            }.bind(item));*/
            item.id = i;
        }

        this.getLuckyDrawInfoData();

        return true;
    },

    initUI:function () {
        var self = this;
        this._text_num.setString(this._data.remain+"");
        
        var btnChoujiang = this._back.getChildByName("btn_choujiang");
        btnChoujiang.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(self._data.remain <= 0){
                    MjClient.showToast("没有抽奖次数了");
                    return;
                }
                this.getLuckyDrawData();
            }
        }, this);

        this._listView.removeAllItems();
        //累计奖品
        for(var i = 0; i < this._data.list.length; i++){
            var itemData = this._data.list[i];
            var cell = this._listView._cell.clone();
            var text_award = cell.getChildByName("Text_award");
            text_award.setString(this.localConfig.awardNames[this._data.list[i].type]);
            var text_award_status = cell.getChildByName("Text_award_status");
            if(itemData.type === 0){
                text_award_status.setVisible(false);
            }else{
                text_award_status.setVisible(true);
            }
            cell.setVisible(true)
            this._listView.pushBackCustomItem(cell);
        }
    },

    turnplateAct:function () {
        var self = this;
        for(var i = 0; i < 8; i++){
            var item = this._nodeTurnplate.getChildByName("item"+i);
            var light = item.getChildByName("Image_light");
            light.setVisible(false);
        }
        var angle1 = 360*5 - this._nodeTurnplate.getRotation()%360;
        var angle2 = 0;

        var index = this._rewardData.type;

        angle2 = 45 * (4 + index+8);
       

        var item = this._nodeTurnplate.getChildByName("item"+index);
        var light = item.getChildByName("Image_light");

        var pointer = this._back.getChildByName("pointer");
        pointer.runAction(cc.sequence(cc.rotateTo(1,angle1),cc.rotateTo(angle2/360*0.5, angle2).easing(cc.easeSineOut()),cc.callFunc(function () {
            light.setVisible(true);
        }), cc.delayTime(0.5), cc.callFunc(function () {
            self.getLuckyDrawInfoData();
        })));
    },

    getLuckyDrawInfoData:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.fangkaExtraTimeDrawInfo",{},function(rtn){
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){
                if(rtn && rtn.message){
                    MjClient.showToast(rtn.message);
                }
                return;
            }
            if(rtn.code == 0) {
                self._data = rtn.data;
                self.initUI();
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    },

    getLuckyDrawData:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.fangkaExtraTimeDraw",{},function(rtn){
            MjClient.unblock();
            if(rtn.code == 0) {
                self._rewardData = rtn.addAward;
                self.turnplateAct();
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    }
});