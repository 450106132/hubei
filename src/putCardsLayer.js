/**
 * Created by sking on 2017/8/21.
 */

var putCardsLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var showflowerUI = ccs.load("showputCards.json");
        this.addChild(showflowerUI.node);
        var that = this;

        var _block =  showflowerUI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);


        var _back =  showflowerUI.node.getChildByName("back");
        setWgtLayout(_back,[0.85,0.8],[0.5,0.5],[0,0],2);


        var _close =  _back.getChildByName("close");
        _close.addTouchEventListener(function(sender,type){
            if(type == 2)
            {
                that.removeFromParent();
            }
        },this);


        //添加花
        function showPutCardsInfo(node,off)
        {
            //var sData = MjClient.data.sData;
            //var tData = sData.tData;
            var pl = getUIPlayer_changpai(off);
            if(!pl)
            {
                node.visible = false;
                return;
            }

            if(MjClient.MaxPlayerNum_changPai == 2)
            {
                var nodeRight = node.getParent().getChildByName("Node_right");
                var nodeDown  = node.getParent().getChildByName("Node_down");
                if(nodeRight) nodeRight.setPositionY(nodeRight.y - 35);
                if(nodeDown) nodeDown.setPositionY(nodeDown.y - 20);
                if(off == 2)
                {
                    node.setPositionY(node.getParent().getChildByName("Node_right").y);
                }
            }


            var _handNode = node.getChildByName("head").getChildByName("nobody");
            var _nameNode = node.getChildByName("head").getChildByName("name");
            _nameNode.setString("");
            //var sData = MjClient.data.sData;
            //显示头像
            var url = pl.info.headimgurl;
            if(!url) url="png/default_headpic.png";
            cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
            {
                if(!err&&texture&&cc.sys.isObjectValid(_handNode))
                {
                    var headSprite = new cc.Sprite(texture);
                    headSprite.setPosition(_handNode.getContentSize().width/2, _handNode.getContentSize().height/2);
                    headSprite.setScale((_handNode.getContentSize().width-4)/headSprite.getContentSize().width);
                    _handNode.addChild(headSprite);
                }
            });

            //显示昵称
            _nameNode.setString(getNewName(unescape(pl.info.nickname )));
            _nameNode.setFontName("Arial");
            _nameNode.setFontSize(_nameNode.getFontSize());

            var _cardNode = node.getChildByName("cardNode");
            _cardNode.visible = false;


            var upSize = _cardNode.getSize();
            var upS = _cardNode.scale;
            var dx = upSize.width*upS;
            var dy = upSize.height*upS;

            cc.log(off + "=================putCards length  =  " + pl.mjput.length);

            for(var i = 0; i < pl.mjput.length; i++)
            {
                var _cardCopy = _cardNode.clone();
                _cardCopy.visible = true;
                cc.log("=================putCards   =  " + pl.mjput[i]);
                setCardSprite_changpai(_cardCopy, pl.mjput[i], off);
                node.addChild(_cardCopy);
                _cardCopy.setPosition(_cardNode.x + dx*i, _cardNode.y);
                //初步计算一行最多显示24张牌
                if (i > 24)
                {
                    _cardCopy.setPosition(_cardNode.x + dx*(i - 25), _cardNode.y + dy/6);
                }
            }
        }

        //自己
        var node = _back.getChildByName("Node_down");//第0个玩家的节点
        showPutCardsInfo(node,0);

        //左边的
        var node1 = _back.getChildByName("Node_right");//第1个玩家的节点
        showPutCardsInfo(node1,1);

        //上面
        var node2 = _back.getChildByName("Node_top");//第2个玩家的节点
        showPutCardsInfo(node2,2);

        return true;
    },
});