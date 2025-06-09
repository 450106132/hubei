
var SelectPutCardsLayer_wuXueGeBan = cc.Layer.extend({
    ctor: function (results) {
        this._super();

        var layer = ccs.load("SelectPutCardsLayer_wuXueGeBan.json");
        this.addChild(layer.node);

        var that = this;

        var adapter = layer.node.getChildByName("adapter");

        setWgtLayout(adapter, [1, 1], [0.5, 0.5], [0, 0]);

        var back = adapter.getChildByName("back");
        var listView = back.getChildByName("listView");
        var tempCard = back.getChildByName("tempCard");

        tempCard.visible = false;
        setCardSprite_card(tempCard, 12, false);

        var cardWidth = tempCard.width * tempCard.scaleX;
        var cardHeight = tempCard.height * tempCard.scaleY;
        var maxWidth = cardWidth * 0.4 * (results[0].length - 1) + cardWidth;
        var needWidth = 100 + maxWidth;
        if (needWidth > back.width) {
            // 牌数太多，需要重新调整面板宽度
            back.width = needWidth;

            listView.width = maxWidth;
            listView.x = needWidth/2;
        }

        var itemWidth = listView.width;
        var itemHeight = cardHeight + 10;

        back.height = Math.min(3 * itemHeight,results.length * itemHeight);
        listView.height = back.height;
        listView.y = back.height / 2;

        var generateResultItem = function(result) {
            MjClient.playui.cardsSort(result);

            var item = new ccui.Layout();

            item.width = itemWidth;
            item.height = itemHeight;

            item.setTouchEnabled(true);
            item.addTouchEventListener(function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        if(MjClient.selectTipCardsArray) 
                            MjClient.selectTipCardsArray = null;
                        
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {
                            cmd: "PKPut",
                            card: result
                        });

                        break;
                    default:
                        break;
                }
            }, this);

            var areaWidth = cardWidth * 0.4 * (results[i].length - 1) + cardWidth;
            var startX = itemWidth / 2 - areaWidth / 2 + cardWidth / 2;

            for (var j = 0; j < result.length; j++) {
                var cardNode = tempCard.clone();

                setCardSprite_card(cardNode, result[j], false);
                cardNode.visible = true;
                item.addChild(cardNode);

                cardNode.x = startX + j * cardWidth * 0.4;
                cardNode.y = item.height / 2;

                if (!MjClient.majiang.haveLaiziSign(result[j]))
                    continue;

                var signLaizi = new cc.Sprite("playing/paodekuaiTable_new/sign_laizi.png");
                signLaizi.setName("signLaizi");
                signLaizi.setAnchorPoint(0, 0);
                signLaizi.setPosition(0, 0);
                cardNode.addChild(signLaizi);
            }

            return item;
        }

        for (var i = 0; i < results.length; i++) {
            listView.pushBackCustomItem(generateResultItem(results[i]));
        }

        if (results.length <= 3) {
            listView.setTouchEnabled(false);
        }

        UIEventBind(null, this, "initSceneData", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "LeaveGame", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "PKPut", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "mjhand", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "waitPut", function()
        {
            that.removeFromParent();
        });
        UIEventBind(null, this, "CloseSelectPutCardsPanel", function()
        {
            that.removeFromParent();
        });
    }
})