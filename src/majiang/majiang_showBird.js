/**
 * Created by wjb  2019.3.27
 */

var majiang_showBird = ccui.Widget.extend({
    SHOW_BIRD_TYPE:{//鸟牌展示样式
        FLIP: 0,    //翻转
        MOVE_FROM_RIGHT: 1     //右侧移入
    },
    birdArr:null,
    flipTime:0,
    itemSpace: 110,

    //---------start  移动动画参数-----------
    keepStaticTime: 0.1,
    itemCardMoveTime: 0.25,
    lifeTime: 0.75,
    //---------end    移动动画参数-----------

    _finishCallBack:null,
    showBirdType: 0,
    ctor:function (showCards,finishCallBack, showType, param) {
        this._super();
        this.showBirdType = majiang_showBird.prototype.SHOW_BIRD_TYPE.FLIP;
        if(!cc.isUndefined(showType))
            this.showBirdType = showType;
           
        MjClient.ShowCardsLayer = this; // 断线重连直接关掉本页面

        this.birdArr = showCards || []; //去报中间那张是本鸡，旁边是上下鸡

        this.setContentSize(cc.size(960,540)); // PC 测试的分辨率  LayerColor
        this.setPosition(cc.p(cc.winSize.width / 2,cc.winSize.height/2));
        // setWgtLayout(this,[1,0],[0,0],[0,0],true); 
        this.setScale(cc.winSize.width / this.width);
        this._finishCallBack = finishCallBack;
        // 翻转时间每一贞
        this.flipTime = 0.02; 
        this.initBackLayout();
        this.execShowBirdsAction(param);
        // 创建一个layout 有颜色设置透明度
        
        var that = this;
        UIEventBind(null, this, "initSceneData", function(){
            that.removeFromParent();
        });
        UIEventBind(null, this, "LeaveGame", function(){
            that.removeFromParent();
        });

        return true;
    },

    //执行翻鸟
    execShowBirdsAction: function(param){
        if(this.showBirdType == majiang_showBird.prototype.SHOW_BIRD_TYPE.FLIP)
            this.birdEffectFlip();
        else if(this.showBirdType == majiang_showBird.prototype.SHOW_BIRD_TYPE.MOVE_FROM_RIGHT){
            if(param)
                cc.each(param,function(value, key){
                    this[key] = value;
                    return true;
                }, this);
            this.moveBirdCardsAction();     
        }

    },

    showBird: function(isFlip){
    },
    // 创建一个layout 有颜色设置透明度
    initBackLayout: function(){
        // 创建一个layout 有颜色设置透明度
        var backLayout = new ccui.Layout();
        backLayout.setContentSize(cc.size(cc.winSize.width,cc.winSize.height));
        backLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        backLayout.setBackGroundColor(cc.color(0,0,0));
        backLayout.setBackGroundColorOpacity(255 * 0.9); 
        backLayout.setScale(5);
        backLayout.setPosition(cc.p(-cc.winSize.width,-cc.winSize.height));
        this.addChild(backLayout);
        
       
    },
    // 翻拍的的中鸟边框特效
    addBoxEffect: function(node){
        var projNode = createSpine("spine/zhuaniaotexiao/skeleton.json", "spine/zhuaniaotexiao/skeleton.atlas");
        projNode.setAnimation(0, 'animation', true);
        projNode.setPosition(node.width / 2,node.height / 2);
        projNode.setTimeScale(0.35);
        node.addChild(projNode,1); 
        var anmSize = cc.size(110,160);
        projNode.setScaleX(node.width / anmSize.width);
        projNode.setScaleY(node.height / anmSize.height);
    },
    // 翻转效果
    birdEffectFlip: function(){
        var leng = this.birdArr.length; 
        // 新位置需求换行
        var cardLeng = leng > 6 ? 4 : leng;
        var maxNum = leng > 6 ? 4 : leng;
        if(leng >= 9){
            maxNum++; cardLeng++;
        } 

        for (var i = 0; i < leng; i++) {  
            var sprite = new cc.Sprite();
            this.addChild(sprite);
 
            var itemWidth = this.itemSpace; // 10 间隔 
            var subLineY = i >= maxNum ? 1 : -1;
            if(leng < 7)
                subLineY = 0;
            // 起始位置
            var startX = this.width / 2 - (cardLeng / 2 * itemWidth) + (itemWidth / 2);
            var sc = isIPhoneX() ? 0.5 : 0.6; // 所在的高度位置

            sprite.setPosition(cc.p(startX + ((i % maxNum) * itemWidth),this.height * sc - (180 / 2 * subLineY) ));
            sprite.setTag(i);
            var fanzhuanAction = cc.animate(this.buildFanZhuanAction());
            var temp = this;
            var callFunc = cc.callFunc(function(){
                temp.createEndBirdCard(startX,this);
            }.bind(sprite)); 
            sprite.runAction(cc.sequence(cc.delayTime(0.2),fanzhuanAction,cc.removeSelf(),callFunc ));
        }
        // 退出场景
        var sumTime = this.flipTime * 3 + 0.8; // 翻转一帧的时间*3贞*每个鸟牌 + 2秒延迟显示
        this.runAction(cc.sequence(cc.delayTime(sumTime),cc.callFunc(function(){
            if(this._finishCallBack){
                this._finishCallBack();
            }
            this.removeFromParent();
            MjClient.ShowCardsLayer = null;
        }.bind(this)))); 
    },

    // 翻转后创建结束扑克
    createEndBirdCard : function(startX,sp){
        var fileName = this.getCardTypeFileName();
        if (!jsb.fileUtils.isFileExist(fileName)) {
            fileName = "playing/MJ/MJBg1/Mj_up_0.png";
        }
        var itemWidth = this.itemSpace;
        var img = new ccui.ImageView(fileName);
        img.setPosition(cc.p(sp.x,sp.y));
        this.addChild(img);
        var cardID = this.birdArr[ sp.getTag() ];
        var fileName2 = this.getCardFaceFileName(cardID); 
        var itemFace = new ccui.ImageView(fileName2);
        img.addChild(itemFace);
        itemFace.setPosition(cc.p(img.width / 2,img.height * 0.6));

        if(MjClient.playui.getIsZhongBird(cardID,this.birdArr)){
           this.addBoxEffect(img); 
        }
    },

    moveBirdCardsAction:function(){
        var len = this.birdArr.length; 

        var self  = this;
        
        var sc = isIPhoneX() ? 0.5 : 0.6; // 所在的高度位置
        var startPos = cc.p(this.width/2 - len * this.itemSpace / 2 + this.itemSpace / 2, this.height * sc);
        var endPos = cc.pAdd(startPos, cc.p(self.itemSpace * 7, 0));

        var getAction = function(index){
            var fadeAction = cc.fadeIn(self.itemCardMoveTime);
            var moveAction = cc.moveTo(self.itemCardMoveTime,cc.pAdd(startPos, cc.p(self.itemSpace * index, 0)));
            if(index == len - 1){
                return cc.sequence(cc.delayTime(index * self.keepStaticTime),cc.spawn(fadeAction,moveAction).easing(cc.easeQuinticActionIn(self.itemCardMoveTime)),
                    cc.delayTime(self.lifeTime), cc.callFunc(function(){if(self._finishCallBack) 
                                                                            self._finishCallBack(); 
                                                                        self.removeFromParent();
                                                                    }));
            }else
                return cc.sequence(cc.delayTime(index * self.keepStaticTime),cc.spawn(fadeAction,moveAction).easing(cc.easeQuinticActionIn(self.itemCardMoveTime)));
        };

        for (var i = 0; i < len; i++) {
            var fileName = this.getCardTypeFileName();
            if (!jsb.fileUtils.isFileExist(fileName)) {
                fileName = "playing/MJ/MJBg1/Mj_up_0.png";
            }
            var itemWidth = this.itemSpace;
            var img = new ccui.ImageView(fileName);
            img.setPosition(endPos);
            img.opacity = 0;
            img.index = i;
            img.setCascadeOpacityEnabled(true);
            this.addChild(img);
            var cardID = this.birdArr[i];
            var fileName2 = this.getCardFaceFileName(cardID); 
            var itemFace = new ccui.ImageView(fileName2);
            img.addChild(itemFace);
            itemFace.setPosition(cc.p(img.width / 2,img.height * 0.6));
            if(MjClient.playui.getIsZhongBird(cardID,this.birdArr)){
                this.addBoxEffect(img); 
            }
            img.runAction(getAction(i));
        }
    },

    onExit:function(){
        this.stopAllActions();
        this._super();
        MjClient.ShowCardsLayer = null;
    },

    getCardTypeFileName: function(){
        var cardBgList = MjClient.playui.getCardBgList();
        var bgType = MjClient.playui.getMaJiangBgType();
        var cardBgPath = cardBgList[bgType];
        // var MJBgType = getCurrentMJBgType();
        // var fileName = "playing/MJ/"; 
        // var name = ["","MJBg1/","MJBg4/","MJBg3/"]
          
        // if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType()){
        //     name = ["","MJBg1/","MJBg2/","MJBg3/","MJBg4/"]
        // }
        // if(MJBgType > 0){
        //     fileName +=  name[MJBgType];
        // }  

        if(this.getIsYueYang()){
            return cardBgPath + "/Mj_up_0_new.png";
        }

        return cardBgPath + "/Mj_up_0.png";
    },

    getCardFaceFileName: function(cd){
         // 贴在麻将上面可变的图
        var path = "playing/MJ/"
        var imgName = "";
        var imgNames = ["Bamboo_", "Character_", "Dot_", "Wind_east", "Wind_south", "Wind_west", "Wind_north", "Red", "Green", "White"];
        if(cd < 30)
        {
            //条，筒，万
            imgName = imgNames[Math.floor(cd / 10)] + cd % 10;
        }
        else if (cd <= 91)
        {   //东南西北中发白
            imgName = imgNames[Math.floor(cd / 10)];//东南西北中发白
        }
        else if (cd <= 181){
            imgName = "flower_" + cd;
        }
        return path + imgName + ".png";
    },
    // 岳阳特殊的路径文件
    getIsYueYang: function(MJBgType){
        if((MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) && (MJBgType == 0 || MJBgType == 1))
            return true;
        return false;
    },

    buildFanZhuanAction:function () {
        var anim = new cc.Animation();
        anim.setDelayPerUnit(this.flipTime);
        // Mj_04_new
        var MJBgType = getCurrentMJBgType();
        if(this.getIsYueYang(MJBgType)){
            anim.addSpriteFrameWithFile(getNewMJBgFile("playing/MJ/Mj_04_new.png"))
        }else{
            anim.addSpriteFrameWithFile(getNewMJBgFile("playing/MJ/Mj_04.png")) 
        }
        anim.addSpriteFrameWithFile(getNewMJBgFile("playing/MJ/Mj_f02.png"))
        anim.addSpriteFrameWithFile(getNewMJBgFile("playing/MJ/Mj_f03.png"))
        if(this.getIsYueYang(MJBgType)){
            anim.addSpriteFrameWithFile(getNewMJBgFile("playing/MJ/Mj_up_0_new.png"))
        }else{
            anim.addSpriteFrameWithFile(getNewMJBgFile("playing/MJ/Mj_01.png"))
        }
        return anim;
    }
});



  