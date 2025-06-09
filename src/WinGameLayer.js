/**
 * Created by WuXiaoDong on 2017/8/28.
 */

var winGameLayer = cc.Layer.extend({
    _data:null,
    _back:null,
    ctor:function(data){
        this._super();
        var UI = ccs.load("winGameLayer.json");
        this._rootUI = this.addChild(UI.node);

        var self = this;

        this._data = data;
        cc.log("wxd................winGame..."+JSON.stringify(this._data));

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back,[0.85, 0.85], [0.5, 0.5], [0, 0.06]);

        //关闭按钮
        var _close = this._back.getChildByName("btn_continue");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                MjClient.leaveGame();
                if(cc.sys.isObjectValid(MjClient.playgroundui)){
                    //MjClient.playgroundui.getPlayListData();
                    MjClient.playgroundui.getPlayDetailData();
                }
            }
        }, this);

        var QRCode = this._back.getChildByName("QRCode");

        //分享按钮
        var _share = this._back.getChildByName("btn_share");
        _share.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Xiaojiesuanjiemian_Fenxiang", {uid:SelfUid()});
                QRCode.setVisible(true);
                _close.setVisible(false);
                _share.setVisible(false);
                postEvent("capture_screen");
                if(cc.sys.os == cc.sys.OS_WINDOWS){
                    postEvent("captureScreen_OK",{})
                }
            }
        }, this);

        UIEventBind(null,this,"captureScreen_OK",function(){
            QRCode.setVisible(false);
            _close.setVisible(true);
            _share.setVisible(true);
            MjClient.Scene.addChild(new sharePlayLayer());
        });

        this.initUI();
        return true;
    },
    
    initUI:function () {
        var textTitle = this._back.getChildByName("Text_Title");
        textTitle.ignoreContentAdaptWithSize(true);
        textTitle.setString(this._data.awardInfo.title);

        var _head = this._back.getChildByName("head");
        cc.loader.loadImg(this._data.awardInfo.headimgurl ? this._data.awardInfo.headimgurl : "png/default_headpic.png", {isCrossOrigin : true}, function(err, texture)
        {
            if(!err&&texture)
            {
                var headSprite = new cc.Sprite(texture);
                headSprite.setPosition(cc.p(_head.width/2,_head.height/2));
                headSprite.setScaleX((_head.getContentSize().width - 8) / headSprite.getContentSize().width);
                headSprite.setScaleY((_head.getContentSize().height - 8) / headSprite.getContentSize().height);
                _head.addChild(headSprite);
            }
        });

        var UserName = this._back.getChildByName("Text_Name");
        function _getName()
        {
            var pinfo = MjClient.data.pinfo;
            return unescape(pinfo.nickname );
        }
        UserName.ignoreContentAdaptWithSize(true);
        UserName.setString(getNewName(_getName()));
        UserName.setFontName("Arial");
        Username.setFontSize(Username.getFontSize());

        var textKill = this._back.getChildByName("Text_Kill");
        textKill.ignoreContentAdaptWithSize(true);
        textKill.setString("击败"+this._data.awardInfo.killNum+"名参赛者，夺得");

        var textRank = this._back.getChildByName("Text_rank");
        textRank.ignoreContentAdaptWithSize(true);
        textRank.setString("第" + this._data.rank +"名");

        var text7 = this._back.getChildByName("Text_7");
        var textYuanbao = this._back.getChildByName("Text_yuanbao");
        textYuanbao.setString(this._data.awardInfo.desc);
        textYuanbao.ignoreContentAdaptWithSize(true);
        text7.x = textYuanbao.x - textYuanbao.width/2;

        var text8 = this._back.getChildByName("Text_8");
        if(this._data.awardInfo.type && this._data.awardInfo.type != 3){
            text8.setString("请到比赛记录中领取奖励");
        }
    }
});