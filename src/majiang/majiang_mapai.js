//码牌层
var majiang_mapai_Layer = ccui.Widget.extend({
    cardNum: 0,//码牌数
    designSize: cc.size(1280, 720),
    ctor: function(cardNum, playerInfo, finishCb){
        this._super();
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.setContentSize(this.designSize);
        this.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
        this.cardNum = cardNum || 0;
        this.cardHeap = this.cardNum / 4;                       //牌堆中的牌张数
        this.maxColumn = Math.ceil(this.cardHeap / 2);           //最大列数
        this.startPos = cc.p(this.width - 300, this.height - 100);
        this.playerInfo = playerInfo;
        this.finishCb = finishCb;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan: function(event){
                return true;
            },
            onTouchMoved: function(event){
            },
            onTouchEnded: function(event){
            }
        }, this);
        this.caiShenAnin();
        this.flyCardsAnim(1, this.maxColumn);
        this.setScale(cc.winSize.width/this.width);
    }
});

//财神动画
majiang_mapai_Layer.prototype.caiShenAnin = function(){
    var animNode =createSpine("playing/Ani/caishendao/caishen.json", "playing/Ani/caishendao/caishen.atlas");
    animNode.setPosition(cc.p(this.width/2, this.height/2));
    animNode.setAnimation(0, "animation", false);
    this.addChild(animNode, 1);

    var playerLabel = ccui.Text.create(unescape(this.playerInfo.info.nickname) + "正在洗牌...", "res/fonts/lanting.TTF", 20);
    playerLabel.setPosition(cc.p(this.width/2, this.height/2 - 40));
    playerLabel.setScale(0.8);
    this.addChild(playerLabel, 1);
};

//牌飞入
majiang_mapai_Layer.prototype.flyCardsAnim = function(rowNum, cardCount){
    var maxWidth = 0;                               //每列最大宽度
    var cardWidth = 0;                              //每张牌的宽度
    var cardHeight = 0;                             //每张牌的高度
    var cardScale = this.getCardScale();            //每张牌的缩放比
    var cardAnchorPoint = cc.p(0.5, 3);             //牌的锚点
    var cardStartRotate = - 60;                     //每张牌的初始旋转角度
    var distanceY = 0;                            //每张牌的Y方向移动偏移
    var moveYSpeed = 1100;                           //y轴的移动速度
    var moveXSpeed = 1100;                           //x轴的移动速度
    var rowElementTag = rowNum * 100;               //行tag

    var self = this;
    
    var tmpCard = ccui.ImageView.create(this.getCardTypeFileName());
    cardWidth = tmpCard.getContentSize().width * cardScale;
    cardHeight = tmpCard.getContentSize().height * cardScale;

    var endPosY = this.height/2 - 50 - cardHeight/2 + cardHeight *2.5;
    distanceY = endPosY - this.startPos.y;

    maxWidth = this.maxColumn * cardWidth;
    var startPosX = (this.width - maxWidth) / 2;

    var finishCount = 0;
    for(var index = 0; index < cardCount; index++){
        var card = ccui.ImageView.create(this.getCardTypeFileName());
        card.setPosition(this.startPos);
        card.setTag(rowElementTag);
        card.setScale(cardScale);
        card.setAnchorPoint(cardAnchorPoint);
        card.setRotation(cardStartRotate);
        this.addChild(card,0);
        var moveDistanceX = startPosX + cardWidth * index - this.startPos.x;
        var costTimeMoveX = Math.abs(moveDistanceX) / moveXSpeed;
        var transformAction = cc.spawn(cc.rotateTo(Math.abs(distanceY) / moveYSpeed, 0), cc.moveBy(costTimeMoveX, cc.p(moveDistanceX, 0)), cc.moveBy(Math.abs(distanceY) / moveYSpeed, cc.p(0, distanceY)));
        var action = cc.sequence(cc.delayTime(index * 0.03), transformAction, cc.callFunc(function(){
            finishCount++;
            if(finishCount == cardCount){
                var parent = this.getParent();
                var children = parent.getChildren();
                var count = 0;
                for(var idx = 0; idx < parent.getChildrenCount(); idx++){
                    var node = children[idx];
                    if(node.getTag() == rowElementTag && rowNum == 1){
                        node.runAction(cc.sequence(cc.delayTime(0.01), cc.moveBy(0.05, cc.p(0, -cardHeight * 1.05)), cc.callFunc(function(){
                            count += 1;
                            if(rowNum < 2 && count == cardCount)
                                self.flyCardsAnim(rowNum + 1, self.maxColumn);
                        })));
                    }else if(rowNum == 2 && node.getTag() == rowElementTag){
                        var transformAction = cc.spawn( cc.moveBy(0.1, cc.p(0, -cardHeight * 1.05 + self.getCardOverlySkew())), cc.sequence(cc.scaleTo(0.05, cardScale + 0.01),cc.scaleTo(0.05, cardScale)));
                        node.runAction(cc.sequence(transformAction, cc.callFunc(function(){
                            count += 1;
                            if(count == cardCount){
                                self.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(function(){
                                    self.allCardMoveUp(cardHeight * 0.4);
                                }, self)));
                            }
                        })));
                    }
                }
            }
        }, card));
        card.runAction(action)
    }
};

//牌整体上移动作
majiang_mapai_Layer.prototype.allCardMoveUp =  function(moveDistanceY){
    var self = this;
    var children = this.getChildren();
    var cardCount = this.maxColumn * 2;
    var count = 0;
    for(var index = 0; index < children.length; index++){
        var node = children[index];
        if(node.getTag() == 100 || node.getTag() == 200){
            node.runAction(cc.sequence(cc.moveBy(0.1, cc.p(0, moveDistanceY)), cc.callFunc(function(){
                count++;
                if(count == cardCount){
                    self.runAction(cc.sequence(cc.delayTime(0.12), cc.callFunc(function(){
                        self.removeFromParent(true);
                        if(self.finishCb) self.finishCb();
                    })));
                }
            })));
        }
    }
};

//获取牌背
majiang_mapai_Layer.prototype.getCardTypeFileName =  function(){
    var cardBgList = MjClient.playui.getCardBgList();
    var bgType = MjClient.playui.getMaJiangBgType();
    var cardBgPath = cardBgList[bgType];
    return cardBgPath + "/Mj_04.png";
};

//获取牌的缩放比例
majiang_mapai_Layer.prototype.getCardScale =  function(){
    var scaleList = [0.6, 0.64, 0.6, 0.6];
    var bgType = MjClient.playui.getMaJiangBgType();
    return scaleList[bgType];
};

//获取两列牌的Y轴偏移
majiang_mapai_Layer.prototype.getCardOverlySkew =  function(){
    var skewList = [25, 30, 24, 22];
    var bgType = MjClient.playui.getMaJiangBgType();
    return skewList[bgType];
};