var setting_dangYangFanJing = setting_ziPai.extend({
	ctor : function(){
		this._super("ziPai_dangYangFanJingSetting.json");
	},

    jsBind: {
        back: {
            menu: {
                _click:function(sender) {
                    return;
                },
                _run : function(){
                    this._type = 0;
                    this.frame = this.getChildByName("frame");        // 画面设置
                    this.function = this.getChildByName("function");  // 功能设置
                },
            },
            huaMian: {
                _visible: false,
                _run : function(){
                    this.visible = true;
                },
                _event : {
                    ZPaiSetType : function(ed){
                        this.visible = true;
                    }
                }
            },
            gongNeng: {
                _visible: false,
                _run : function(){
                    this.visible = false;
                },
                _event : {
                    ZPaiSetType : function(ed){
                        this.visible = false;
                    }
                }
            },
            Text_ver: {
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                  
                    if(MjClient.isShenhe == true){
                          this.setVisible(false);
                    }
                    this.setPositionY(this.getPositionY()+(this.getContentSize().height * 1.6));
                    //  一键修复按钮
                    var _fixBtn = new ccui.Button();
                    _fixBtn.loadTextureNormal("game_picture/yijianxiufu.png");
                    _fixBtn.loadTexturePressed("game_picture/yijianxiufu_p.png");
                    _fixBtn.addTouchEventListener(function(sender,Type){
                        switch (Type)
                        {
                            case ccui.Widget.TOUCH_ENDED:
                                removeUpdataDirectory();
                                break;
                            default :
                                break;
                        }
                    });
                    _fixBtn.setPosition(this.getContentSize().width*0.2-10, -this.getContentSize().height*2/3 + 10);
                    _fixBtn.setScale(1);
                    this.addChild(_fixBtn);
                },
            }
        }
    },

    //出牌语音
    initYuYin : function(huaMian){
        var music = huaMian.getChildByName("music");
        music.getChildByName('yuyin').visible = false;
        music.getChildByName('yx').visible = false;
        music.getChildByName('yy').visible = false;
        music.getChildByName('yyin').visible = false;
        music.getChildByName('noMusic').visible = false;
        music.getChildByName('noSpeak').visible = false;
        music.getChildByName('noEffect').visible = false;

        var yuYinList = [];
        yuYinList.push(music.getChildByName("voice_1"));
        yuYinList.push(music.getChildByName("voice_2"));
        this.yuYinList = yuYinList;
        var type = MjClient.playui.getVoiceType();
        this.yuYinRadio = createRadioBoxForCheckBoxs(yuYinList, null, type);
        if (type == 0) {
            yuYinList[0].getChildByName('img').loadTexture('setting/huaPai/putonghua_s.png');
        } else {
            yuYinList[1].getChildByName('img').loadTexture('setting/huaPai/bendihua_s.png');
        }
        var cb = function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_VOICE_TYPE, index);
            nodeList[0].getChildByName('img').loadTexture('setting/huaPai/putonghua_n.png');
            nodeList[1].getChildByName('img').loadTexture('setting/huaPai/bendihua_n.png');
            if (index == 0) {
                nodeList[0].getChildByName('img').loadTexture('setting/huaPai/putonghua_s.png');
            } else {
                nodeList[1].getChildByName('img').loadTexture('setting/huaPai/bendihua_s.png');
            }
        }
        this.yuYinRadio.setSelectCallBack(cb);
        for (var i = 0; i < yuYinList.length; i++) {
            yuYinList[i].getChildByName('img').addTouchEventListener(function(sender, event) {
                if (event == 2) {
                    var cur = this.yuYinList.indexOf(sender.getParent());
                    var another = cur == 0 ? 1 : 0;
                    sender.getParent().setSelected(true);
                    this.yuYinList[another].setSelected(false);
                    cb(cur, sender.getParent(), this.yuYinList);
                }
            }.bind(this))
        }

        //语音不全.先屏蔽掉 普通话|本地话选择
        yuYinList[0].visible = false;
        yuYinList[1].visible = false;
    },

    initExtend:function(huaMian, gongNeng) {
        if(cc.sys.isObjectValid(huaMian)) {
            //布局
            huaMian.getChildByName("buJu").visible = false;
            huaMian.getChildByName("line_0").visible = false;
            //语音
            var music = huaMian.getChildByName("music");
            music.getChildByName("voice_1").getChildByName('text').visible = false;
            music.getChildByName("voice_2").getChildByName('text').visible = false;
        }
    },

    //游戏背景
    initBeiJiang : function(huaMian){
        var beiJingList = [];
        beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg1"));
        beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg2"));
        beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg3"));
        //显示使用中图标
        for (var i = 0; i < beiJingList.length; i++) {
            beiJingList[i].getChildByName('Image_1').visible = false;
        }
        var type = MjClient.playui.getGameBgIdx();
        this.beiJingRadio = createRadioBoxForCheckBoxs(beiJingList, null, type);
        beiJingList[type].getChildByName('Image_1').visible = true;
        this.beiJingRadio.setSelectCallBack(function(index, sender, nodeList){
            //显示使用中图标
            for (var i = 0; i < nodeList.length; i++) {
                nodeList[i].getChildByName('Image_1').visible = false;
            }
            sender.getChildByName('Image_1').visible = true;
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE,  index);
            postEvent("EZP_gameBG", {});
        });
    },

    //字牌字体
    initCardType : function(huaMian){
        var ziPaiList = [];
        ziPaiList.push(huaMian.getChildByName("ziPai").getChildByName("ziPai1"));
        ziPaiList.push(huaMian.getChildByName("ziPai").getChildByName("ziPai2"));
        ziPaiList.push(huaMian.getChildByName("ziPai").getChildByName("ziPai3"));
        //显示使用中图标
        for (var i = 0; i < ziPaiList.length; i++) {
            ziPaiList[i].getChildByName('Image').visible = false;
        }
        var type = MjClient.playui.getCardFontIdx();
        this.ziPaiRadio = createRadioBoxForCheckBoxs(ziPaiList, null, type);
        ziPaiList[type].getChildByName('Image').visible = true;
        this.ziPaiRadio.setSelectCallBack(function(index, sender, nodeList){ 
            //显示使用中图标
            for (var i = 0; i < nodeList.length; i++) {
                nodeList[i].getChildByName('Image').visible = false;
            }
            sender.getChildByName('Image').visible = true;
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, index);
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType, index);
            postEvent("EZP_cardType", {idx:index, type:"font"});
        });

        //牌资源不全.先屏蔽掉牌的选择
        ziPaiList[0].visible = false;
        ziPaiList[1].visible = false;
        ziPaiList[2].visible = false;
        huaMian.getChildByName('line_2').visible = false;
    },
})