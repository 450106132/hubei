var LocationAppsLayer = cc.Layer.extend({
    jsBind:{
        _event: {
            initSceneData:function (d) {
                console.log("checkChangeLocationApp");
                MjClient.checkChangeLocationApp();
            },
            locationApps : function(d){
                this.showMsg();
            }
        },
    },
    ctor:function () {
        this._super();

        var uiNode = ccs.load("LocationAppsLayer.json");
        this.addChild(uiNode.node);

        BindUiAndLogic(this, this.jsBind);

        var _block = uiNode.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = uiNode.node.getChildByName("back");
        setWgtLayout(_back,[0.64,0.78],[0.5,0.5],[0,0]);

        this.scrollView = _back.getChildByName("scrollView")

        var _yes = _back.getChildByName("yes");
        _yes.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    this.visible = false;
                    break;
                default :
                    break;
            }
        },this);

        this.visible = false;

        return true;
    },

    getMsg : function(pl){
        var msg = "系统检测到玩家(" + unescape(pl.info.nickname) + ")安装可更改定位插件(";
        var apps = pl.locationApps;
        var len = apps.length;
        var arr = [];
        for(var i = 0; i < len; i++){
            var info = apps[i];
            arr.push(info.name);
        }
        msg += arr.join("、");
        msg += "),请谨慎游戏\n";
        return msg;
    },

    showMsg : function(){
        var sData = MjClient.data.sData;
        if (!sData) return;
        var isShow = false;
        if(sData.tData.maxPlayer <= 2){
            this.visible = false;
            return;
        }

        var msg = "";
        var players = sData.players;
        for(var uid in players){
            var pl = players[uid];
            if(uid != SelfUid() && pl.locationApps && pl.locationApps.length > 0){
                isShow = true;
                msg += this.getMsg(pl);
            }
        }

        this.visible = isShow;
        if(isShow){
            var _msg = this.scrollView.getChildByName("msg");

            var regex = new RegExp("\n", 'g'); 
            var result = msg.match(regex);
            var count = !result ? 0 : result.length;
            _msg.setFontSize(30);
            _msg.height = msg.length/22 * 40 + count * 40
            
            this.scrollView.setInnerContainerSize(cc.size(this.scrollView.getInnerContainerSize().width, _msg.height))
            _msg.setString(""+msg);
            _msg.y = this.scrollView.getInnerContainerSize().height;
        }
    }
});