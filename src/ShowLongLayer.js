/**
 * Created by sking on 2018/1/25.
 */

var showLongLayer = cc.Layer.extend({
    setFlowerPos:null,
    ctor:function () {
        this._super();
        var showflowerUI = ccs.load("showLongTips.json");
        this.addChild(showflowerUI.node);
        var that = this;

        var _block =  showflowerUI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        _block.addTouchEventListener(function(sender,type){
            if(type == 2)
            {
                that.removeFromParent();
            }
        },this);

        var _back =  showflowerUI.node.getChildByName("back");
        setWgtLayout(_back,[0.85,0.8],[0.5,0.5],[0,0],2);

        //添加花
        function setPlayerInfo(node,off)
        {
            var sData = MjClient.data.sData;
            var tData = sData.tData;

            var pl = getUIPlayer_changpai(off);
            if(!pl) return;

            //pl.long = [1,2,3];//拥有的花牌，todo....
            var longcard = [];
            if(pl.long)
            {
                for(var k = 0; k < pl.long.length;k++)
                {
                    if (pl.mjgang1.indexOf(pl.long[k]) < 0)
                    {
                        longcard.push(pl.long[k]);
                    }
                }
            }
            // cc.log("off------------------- mjgang1 = " + pl.mjgang1);
            // cc.log("off------------------- long = " + pl.long);
            //
            cc.log(" = off------------------- longcard = " + longcard);

            if(longcard.length > 0)
            {
                node.visible = true;

                var out0 = node.getChildByName("out0");
                out0.visible = false;
                var oSize = out0.getSize();
                var oSc = out0.scale;
                var _width = oSize.width*oSc;

                for(var i = 0; i < longcard.length; i++)
                {
                    var _nodeCard = out0.clone();
                    _nodeCard.visible = true;
                    if(off != 0)
                    {
                        _nodeCard.setPosition(cc.p(out0.x,out0.y  + _width*0.5 * longcard.length - oSize.width*oSc*i));
                    }
                    else {
                        _nodeCard.setPosition(cc.p(out0.x  - _width*0.5 * longcard.length + oSize.width*oSc*i,out0.y));
                    }
                    cc.log(off + " = off------------------- longcard[i] = " + longcard[i]);
                    setCardSprite_CP(_nodeCard,longcard[i]);
                    node.addChild(_nodeCard);
                }
            }
        }

        //自己
        var node = _back.getChildByName("Node_down");//第0个玩家的节点
        node.visible = false;
        setPlayerInfo(node,0);

        //左边的
        var node1 = _back.getChildByName("Node_right");//第1个玩家的节点
        node1.visible = false;
        setPlayerInfo(node1,1);

        //上面
        var node2 = _back.getChildByName("Node_top");//第2个玩家的节点
        node2.visible = false;
        setPlayerInfo(node2,2);

        // //右边的
        // var node3 = _back.getChildByName("Node_left");//第3个玩家的节点
        // node3.visible = false;
        // //setPlayerInfo(node3,3);
        // if(MjClient.gameType == MjClient.GAME_TYPE.RU_GAO_MJH)
        // {
        //     setPlayerInfo(node3,2);
        // }
        // else
        // {
        //     setPlayerInfo(node2,2);
        //     setPlayerInfo(node3,3);
        // }



        return true;
    },



});