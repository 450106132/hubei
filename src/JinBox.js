var JinBoxLayer = cc.Layer.extend({
    playerinfo:null,
    View:null,
    Card1:null,
    Card2:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("JinBox.json");
        this.addChild(UI.node);
        var that = this;

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.5, 0.5], [0.2, 0.0], [0.5, 0.5]);

        var tData = MjClient.data.sData.tData;
        var pl = getUIPlayer(0);
        this.playerinfo = _back.getChildByName("playerinfo");
        this.playerinfo.visible = false;
        this.View = _back.getChildByName("View");
        this.Card1 = this.playerinfo.getChildByName("Card1");
        this.Card1.visible = tData.hunCard > 0;
        this.Card2 = this.playerinfo.getChildByName("Card2");
        this.Card2.visible = tData.hunCard2 > 0;
        this.setName("JinBoxLayer");

        var text2 = this.playerinfo.getChildByName("Text2");
        text2.visible = false;

        var text = this.playerinfo.getChildByName("Text1");
        text.visible = false;

        
        for (var i = 0; i < 4; i++) {
            cc.log("单例化item");
            var curpl = getUIPlayer(i);
            if (!curpl) continue;
            var item = that.getlistitem(that,curpl.info.nickname,curpl.info.headimgurl,i);
            that.View.pushBackCustomItem(item);
        }

        var _block = UI.node.getChildByName("block");
        _block.setOpacity(0);
        _block.setTouchEnabled(true);
        _block.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    that.removeFromParent();
                    break;
                default:
                    break;
            }
        }, this);

    },
    getlistitem:function(node,name,img,off)
    {
        var item = null;
        var that = node;
        var tData = MjClient.data.sData.tData;
        cc.log("单例化item doIng");
        item = that.playerinfo.clone();
        item.visible = true;
        var item_name = item.getChildByName("name");
        var _nameStr = unescape(name);
        cc.log(" name   ",name , " _nameStr  ", _nameStr," headpic ",img);
        item_name.setString(getNewName(_nameStr));

        var item_bg = item.getChildByName("headbg");
        //显示头像
        var url = img;
        if(!url) url="png/default_headpic.png";
        that.CircularCuttingHeadImg(item_bg,url);
       
        //计算金牌数量
        var jincard1 = 0;
        var jincard2 = 0;

        var pl = getUIPlayer(off);
        if (!pl) return item;

        var jincardlist = pl.jinMjPut;
        if (tData.hunCard) 
        {
            for (var i = 0; i < jincardlist.length; i++) {
                if (jincardlist[i] == tData.hunCard) 
                {
                    jincard1 ++;
                }
                if (tData.hunCard2) 
                {
                    if (jincardlist[i] == tData.hunCard2) 
                    {
                        jincard2 ++;
                    }
                }
            }
        }

        var item_card1 = item.getChildByName("Card1");
        if (tData.hunCard) 
        {
            item_card1.visible = true;
            setCardSprite(item_card1, tData.hunCard, 4);
            var text = item.getChildByName("Text1");
            text.setString(" X"+jincard1);
            text.visible = true;
            item_card1.setScale(0.5);
        }

        var item_card2 = item.getChildByName("Card2");
        if (tData.hunCard2) 
        {
            item_card2.visible = true;
            setCardSprite(item_card2, tData.hunCard2, 4);
            var text = item.getChildByName("Text2");
            text.setString(" X"+jincard2);
            item_card2.setScale(0.5);
            text.visible = true;
        }

        cc.log("get item Success");
        item.setScale(0.575);
        return item;
    },
    // 设置圆形裁剪头像
    CircularCuttingHeadImg:function (node, url)
    {
        var head = node;
        cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
        {
            if(!err && texture && cc.sys.isObjectValid(head))
            {
                cc.log("add head img" + JSON.stringify(texture));
                var clippingNode = new cc.ClippingNode();
                var mask = new cc.Sprite("Guid/headbg2.png");
                clippingNode.setAlphaThreshold(0);
                clippingNode.setStencil(mask);
                var img = new cc.Sprite(texture);
                img.setScale(mask.getContentSize().width / img.getContentSize().width);
                clippingNode.addChild(img);
                clippingNode.setPosition(head.getContentSize().width / 1.62, head.getContentSize().height / 1.9);
                //遮罩框
                var hideblock = new cc.Sprite("Guid/head.png");
                hideblock.setPosition(hideblock.getContentSize().width / 2, hideblock.getContentSize().height / 2);
                head.addChild(clippingNode);
                head.addChild(hideblock);
            }
        });
    }
});
