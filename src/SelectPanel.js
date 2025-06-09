

function SelfHeadInfo()
{
	var pinfo=MjClient.data.pinfo;
	return {uid:pinfo.uid,url:pinfo.headimgurl};
}

function changeAtalsForLabel(node,count) {
    var countCopy = Number(count);
    // 精度修正
    countCopy = revise(countCopy);

    if (countCopy<0)
    {
        countCopy = -countCopy;
        count = "/"+countCopy;
    }
    else {
        count = countCopy;
	}
	node.setString(count);
	//return ;
	var changeAtalsForLabel_size = node.getVirtualRendererSize();
	var stringnum = node.getString();
	var oneNumwith ;
	if (stringnum>999) 
	{
		oneNumwith = changeAtalsForLabel_size.width /4;
	}else if(stringnum>99)
	{
		oneNumwith = changeAtalsForLabel_size.width /3;
	}else if(stringnum>9)
	{
		oneNumwith = changeAtalsForLabel_size.width /2;
	}else
	{
		oneNumwith = changeAtalsForLabel_size.width ;
	}
	var size=node.getVirtualRendererSize();
	 if(count>999)
	{
		size.width = oneNumwith*4;
	}else if (count > 99)
	{
		size.width =  oneNumwith*3;
	}else if(count>9)
	{
		size.width =  oneNumwith*2;
	}else
	{
		size.width =  oneNumwith;
	}
	node.setSize(size);
	node.setString(count);
}



function homePageRunText(node, data) {
    node.setVisible(false);
    node.retain();
    var sroll = node.getParent();
    sroll.removeAllChildren();
    sroll.addChild(node);
    node.release();
	for(var i = 0; i < data.length; i++){
		var msg = node.clone();
        msg.setVisible(true);
		msg.setString(data[i]);
        msg.anchorX = 0;
        sroll.addChild(msg);
        msg.x = sroll.width + (msg.width+100) * i;
        var callBack1 = new cc.CallFunc(function () {
            if (this.x < -this.width) {
            	if(data.length == 1){
                    this.setPositionX(sroll.width);
				}else {
                    this.setPositionX((data.length -1) * (this.width+100));
				}
            }
        }.bind(msg));
        if (data.length > 0) {
            msg.runAction(cc.repeatForever(cc.sequence(cc.moveBy((msg.width+100)/125,cc.p(-(msg.width+100),0)), callBack1)));
        }
	}



    // node.ignoreContentAdaptWithSize(true);
	// var length = node.getString().length * node.getFontSize() + node.getParent().getCustomSize().width;
	// node.width = length;
	// node.anchorX = 0;
	// node.x += node.getParent().getCustomSize().width;
	// var startPosX = node.x;
	// var callback = function() {
	// 	node.x = startPosX;
	// }
	//
	// console.log("=====doomsky say:length======", length);
	// node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(length/125.0,cc.p(-length,0)),cc.callFunc(callback))));
}

