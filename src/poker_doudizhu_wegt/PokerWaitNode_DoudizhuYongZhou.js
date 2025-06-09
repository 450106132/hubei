var PokerWaitNode_DoudizhuYongZhou = PokerWaitNode_Doudizhu.extend({});

PokerWaitNode_DoudizhuYongZhou.prototype.handleYongZhouBtn = function (){
	this.waitFriends = this.node.getChildByName("waitFriends");
    this.waitFriends.visible = true;
	var btn_wxinvite = this.node.getChildByName("btn_wxinvite");
	var btn_cpRoomNum = this.node.getChildByName("btn_cpRoomNum");
    btn_cpRoomNum.visible = false;
    setWgtLayout(btn_wxinvite,[0.18,0.18],[0.5,0.45],[0,0]);
    setWgtLayout(this.waitFriends,[0.07,0.07],[0.5,0.35],[0,0]);
    for(var i=0 ; i<9 ; i++){
        var imgZi = this.waitFriends.getChildByName("waitFriend_" + i);
        var hei = 20;
        if(i>=6){
            hei = 10;
        }
        if(imgZi){
            imgZi.runAction(cc.repeatForever(cc.sequence(
                cc.delayTime(i*0.3),
                cc.moveBy(0.3, 0, hei),
                cc.moveBy(0.3, 0, -hei),
                cc.delayTime(3 - i*0.3)
            )));
        }
    }
};

