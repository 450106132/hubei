/***
 * 邵阳App麻将玩法设置界面基类
 * @type {void | Class | *}
 */
var majiang_settingPanel_shaoyang = setting_maJiang.extend({
	ctor : function(jsonSrc){
		this._super(jsonSrc);
	},
	 // 初始化麻将风格选项
	initCardBgImg : function(is3D, scrollView_play){ 
	    var cardBgList = MjClient.playui.getCardBgList(is3D);
	    var cardBgNameList = MjClient.playui.getCardBgNameList(is3D);
	    var cardFront = MjClient.playui.getCardFrontList(is3D);
	    var list = [];
	    var pos = [0.5,0.5,0.45,0.5]; // 位置比例
	    for (var i = 0; i < 4; i++) {
	        var name = "box_cardBg" + (i + 1);
	        var item = scrollView_play.getChildByName(name);
	        item.visible = (i < cardBgList.length);
	        // if(i >= cardBgList.length) continue; 
	        list.push(item);

	        var img_bg = item.getChildByName("img_bg"); 
	        img_bg.loadTexture(cardBgList[i] + "/Mj_up_4.png");
	        var img_front = item.getChildByName("img_bg").getChildByName("Image") 
	        img_front.loadTexture(cardFront[i] + "/Green.png");
	        img_front.ignoreContentAdaptWithSize(true); 
	         
	        img_front.y = img_bg.height * pos[i]; 
	        var text = item.getChildByName("text");
	        text.setString(cardBgNameList[i]);
	        text.ignoreContentAdaptWithSize(true);
	    }

	    var callFunc = function(index){
	        MjClient.playui.setMaJiangBgType(index);
	        postEvent("changeMJBgEvent", index);
	    };

	    var type = MjClient.playui.getMaJiangBgType();

	    if(!this._playNode_MJCardBg_radio){
            this._playNode_MJCardBg_radio = createRadioBoxForCheckBoxs(list,null,type);
            this._playNode_MJCardBg_radio.setSelectCallBack(function(index, sender, nodeList){ 
                this._changeMenuColor(list, this._playNode_MJCardBg_radio, index);
                callFunc(index);
            }.bind(this));
            this._changeMenuColor(list, this._playNode_MJCardBg_radio, type); 
        }else{
            this._playNode_MJCardBg_radio.selectItem(type || 0);
            return;
        } 

	    // 文字和图片设置点击事件
	    for (var i = 0; i < list.length; i++) {
	        cc.eventManager.addListener(this.setTextClick(list, i, this._playNode_MJCardBg_radio, callFunc), list[i].getChildByName("img_bg") );
	        cc.eventManager.addListener(this.setTextClick(list, i, this._playNode_MJCardBg_radio, callFunc), list[i].getChildByName("text") );
	    }
	}
});

