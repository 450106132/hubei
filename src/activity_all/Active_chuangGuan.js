/**create by fenghanwei
 * @DateTime:     2018-11-14
 * @Description: 金币场闯关连胜活动
 */
var Active_chuangGuan = {};

/**
 * 创建房间内连胜提示活动ui
 * @param node
 * @param pos 默认 居中
 * @returns {* create node}
 */
Active_chuangGuan.createRoomTipUi = function (node,pos) {
    var that = this;
    var linghongbao = new ccui.Button("act_chuangGuan/linghongbao.png");
    var diban = ccui.ImageView("act_chuangGuan/bg1.png");
    diban.visible = false;
    diban.setAnchorPoint(0.5,1);
    linghongbao.setAnchorPoint(0.5,0.5);
    diban.setPosition(cc.p(linghongbao.width/2,2));
    linghongbao.addChild(diban);

    var LoadingBar = new ccui.LoadingBar("act_chuangGuan/LoadingBar.png");
    LoadingBar.setPosition(cc.p(diban.width/2,74));
    diban.addChild(LoadingBar);

    var Text_jushu = new ccui.Text("","fonts/lanting.TTF",20);
    Text_jushu.setPosition(cc.p(diban.width/2,74));
    diban.addChild(Text_jushu);
    var Text_tip = new ccui.Text("连胜7关即可赢取红包","fonts/lanting.TTF",18);
    Text_tip.setTextColor(cc.color("#000000"));
    Text_tip.setPosition(cc.p(diban.width/2,32.64));
    diban.addChild(Text_tip);

    COMMON_UI.setNodeTextAdapterSize(diban)
    if(pos){
        linghongbao.setPosition(pos);
    }else{
        linghongbao.setPosition(cc.p(node.width/2,node.height/2));
    }

    var showInfo = function (data) {
        diban.visible = true;
        diban.scale = true;

        var winGameNum = 0;
        for(var i = 1; i <= 7; i++ ){
            var itemData = data[("game"+i)];
            if(itemData.status == 1){
                winGameNum++;
            }else{
                break;
            }
        }
        Text_jushu.setString("闯关局数："+winGameNum+"/7");
        LoadingBar.setPercent(Number(winGameNum/7)* 100);

        diban.runAction(cc.sequence(cc.delayTime(5),cc.scaleTo(0.3,0),cc.callFunc(function () {

            diban.visible = false;
        })));
    }
    linghongbao.addTouchEventListener(function (sender, Type) {
        switch (Type) {
            case ccui.Widget.TOUCH_ENDED:
                if(sender.goldfieldStreakInfo){
                    showInfo(sender.goldfieldStreakInfo);
                    return;
                }
                MjClient.gamenet.request("pkplayer.handler.goldfieldStreakInfo", { fieldId: MjClient.data.sData.tData.fieldId }, function(rtn) {
                    MjClient.unblock();
                    if(!cc.sys.isObjectValid(sender)){
                        return;
                    }
                    if (rtn.code == 0) {
                        sender.goldfieldStreakInfo = rtn.data;
                        showInfo(sender.goldfieldStreakInfo);
                    }else{
                        if(rtn.message){
                            MjClient.showToast(rtn.message);
                        }
                    }
                });
            default:
                break;
        }
    }, that);

    node.addChild(linghongbao);
    return linghongbao;
};

/**
 * 闯关结果ui
 * @param node
 * @param pos 默认 居中
 */
Active_chuangGuan.createRoomChuangGuanResultUi = function (node,pos) {
    var that = this;
    var tData = MjClient.data.sData.tData;
    var _ui = ccs.load("Act_chuangGuan.json");
    var uiNode = _ui.node;
    if(pos){
        uiNode.setPosition(pos);
    }else{
        uiNode.setPosition(cc.p(node.width/2,node.height/2));
    }
    uiNode.setAnchorPoint(0.5,0.5);

    var _block = uiNode.getChildByName("block");
    _block.opacity = 255 * 0.4;
    setWgtLayout(_block,[1, 1],[0.5, 0.5],[0, 0],true);

    var Panel_award = uiNode.getChildByName("Panel_award");
    Panel_award.visible = false;
    for(var i = 0 ; i < Panel_award.getChildren().length;i++){
        Panel_award.getChildren()[i].visible = false;
    }
    setWgtLayout(Panel_award,[1, 1],[0.5, 0.5],[0, 0]);

    var _back = uiNode.getChildByName("back");
    setWgtLayout(_back,[1, 1],[0.5, 0.5],[0, 0]);

    uiNode.visible = false;//加载成功再显示出来

    var _close = _back.getChildByName("close");
    _close.addTouchEventListener(function (sender, Type) {
        switch (Type) {
            case ccui.Widget.TOUCH_ENDED:
                if(bg_fail.visible && Button_share_relive.visible){
                    //只要失败离开可以复活界面就要重新挑战
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.goldfieldStreakClose", { id: uiNode.data.id }, function(rtn) {
                        MjClient.unblock();
                        if(!cc.sys.isObjectValid(uiNode)){
                            return;
                        }
                        if (rtn.code == 0) {
                            uiNode.removeFromParent(true);
                        }else{
                            if(rtn.message){
                                MjClient.showToast(rtn.message);
                            }
                        }
                    });
                }else{
                    uiNode.removeFromParent(true);
                }

            default:
                break;
        }
    }, that);

    var bg_success = _back.getChildByName("bg_success");
    var Button_go_on = bg_success.getChildByName("Button_go_on");
    Button_go_on.addTouchEventListener(function (sender, Type) {
        switch (Type) {
            case ccui.Widget.TOUCH_ENDED:
                uiNode.removeFromParent(true);
                leaveGameClearUI();
                MjClient.Scene.addChild(new goldMatchingLayer({matching:false,gameType:tData.gameType}));
                MjClient.goldfieldEnter(tData.fieldId,tData.gameType);
            default:
                break;
        }
    }, that);

    var bg_fail = _back.getChildByName("bg_fail");
    var Button_again = bg_fail.getChildByName("Button_again");
    Button_again.addTouchEventListener(function (sender, Type) {
        switch (Type) {
            case ccui.Widget.TOUCH_ENDED:
                if(!Button_share_relive.visible){
                    //不能复活的关卡失败，不用请求服务端close
                    uiNode.removeFromParent(true);
                    leaveGameClearUI();
                    MjClient.Scene.addChild(new goldMatchingLayer({matching:false,gameType:tData.gameType}));
                    MjClient.goldfieldEnter(tData.fieldId,tData.gameType);
                    return;
                }
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.goldfieldStreakClose", { id: uiNode.data.id }, function(rtn) {
                    MjClient.unblock();
                    if(!cc.sys.isObjectValid(uiNode)){
                        return;
                    }
                    if (rtn.code == 0) {
                        uiNode.removeFromParent(true);
                        leaveGameClearUI();
                        MjClient.Scene.addChild(new goldMatchingLayer({matching:false,gameType:tData.gameType}));
                        MjClient.goldfieldEnter(tData.fieldId,tData.gameType);
                    }else{
                        if(rtn.message){
                            MjClient.showToast(rtn.message);
                        }
                    }
                });

            default:
                break;
        }
    }, that);

    var reLiveFunc = function () {
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.goldfieldStreakRelive", { id: uiNode.data.id }, function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(uiNode)){
                return;
            }
            if (rtn.code == 0) {
                uiNode.removeFromParent(true);
                leaveGameClearUI();
                MjClient.Scene.addChild(new goldMatchingLayer({matching:false,gameType:tData.gameType}));
                MjClient.goldfieldEnter(tData.fieldId,tData.gameType);
            }else{
                if(rtn.message){
                    MjClient.showMsgTop(rtn.message);
                }
            }
        });
    }

    var Button_share_relive = bg_fail.getChildByName("Button_share_relive");
    UIEventBind(null, Button_share_relive, "WX_SHARE_SUCCESS", function(data) {
        if (parseInt(data.errCode) == 0) {
            that.runAction(cc.sequence(cc.DelayTime(0.3), cc.callFunc(function() {
                reLiveFunc();
            })));
        }
        MjClient.wxShareImageToPYQ = false;
    });
    Button_share_relive.addTouchEventListener(function (sender, Type) {
        switch (Type) {
            case ccui.Widget.TOUCH_ENDED:
                if(sender.shareImage){
                    if(sender.shareImage == "loading"){

                    }else{
                        if (cc.sys.OS_WINDOWS == cc.sys.os) {
                            MjClient.wxShareImageToPYQ = true;
                            postEvent("WX_SHARE_SUCCESS", {
                                errCode: 0
                            });
                        }
                        MjClient.native.wxShareImageToPYQ(sender.shareImage);
                    }
                }else{
                    reLiveFunc();
                }
            default:
                break;
        }
    }, that);
    COMMON_UI.setNodeTextAdapterSize(uiNode);
    node.addChild(uiNode,500);

    var setView = function (data) {
        uiNode.data = data;
        uiNode.visible = true;
        //当前局是输还是赢
        bg_success.visible = (data.lastGameStatus == 1);
        bg_fail.visible = !(data.lastGameStatus == 1);

        var panelResult = _back.getChildByName("Panel_result");

        var hasSetNextItem = false;
        var size = 7 ;
        for(var i = size; i > 0; i --){
            var itemCell = panelResult.getChildByName(("item"+i));
            var itemData = data[("game"+i)];
            //不管玩了没玩先设置奖励
            if(itemData.award){
                itemCell.getChildByName(("Image_award")).visible = true;
                if(itemData.award.gold != null){
                    itemCell.getChildByName(("Image_award")).scale = 0.5;
                    itemCell.getChildByName(("Image_award")).loadTexture("act_chuangGuan/img_award_gold.png");
                }else if(itemData.award.money != null){
                    itemCell.getChildByName(("Image_award")).scale = 0.5;
                    itemCell.getChildByName(("Image_award")).loadTexture("act_chuangGuan/img_award_yuanbao.png");
                }else if(itemData.award.integral != null){
                    itemCell.getChildByName(("Image_award")).scale = 0.5;
                    itemCell.getChildByName(("Image_award")).loadTexture("act_chuangGuan/img_award_liquan.png");
                }else if(itemData.award.redpacket != null){
                    itemCell.getChildByName(("Image_award")).scale = 0.7;
                    itemCell.getChildByName(("Image_award")).loadTexture("act_chuangGuan/img_award_hongbao.png");
                }else{
                    itemCell.getChildByName(("Image_award")).visible = false;
                }
            }else{
                itemCell.getChildByName(("Image_award")).visible = false;
            }

            if(itemData.status != null){
                cc.log("itemData.status = "+itemData.status);
                //设置对应局状态
                itemCell.getChildByName(("Image_next_huang")).visible = false;
                itemCell.getChildByName(("Image_next_light")).visible = false;
                if(itemData.status == 1){ //成功
                    itemCell.getChildByName(("Image_success")).visible = true;
                }else{
                    itemCell.getChildByName(("Image_success")).visible = false;
                }
                //已经玩了这局
                if(!hasSetNextItem){
                    //设置下一局的样式
                    hasSetNextItem = true;
                    var itemNextCell = panelResult.getChildByName(("item"+(i+1)));
                    if(itemNextCell){
                        itemNextCell.getChildByName(("Image_next_huang")).visible = true;
                        itemNextCell.getChildByName(("Image_next_light")).visible = true;
                        itemNextCell.getChildByName(("Image_next_light")).runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1,1.15),cc.delayTime(0.5),cc.scaleTo(1,1))));
                    }
                    //展示当前局的奖励
                    if(itemData.award && itemData.status == 1){
                        Panel_award.visible = true;
                        var other_result = Panel_award.getChildByName("other_result");
                        other_result.visible = true;
                        Panel_award.zIndex = 1;
                        _block.zIndex = 1;
                        other_result.getChildByName("Button_confirm").addTouchEventListener(function (sender, Type) {
                            switch (Type) {
                                case ccui.Widget.TOUCH_ENDED:
                                    Panel_award.visible = false;
                                    other_result.visible = false;
                                    Panel_award.zIndex = -1;
                                    _block.zIndex = -1;
                                default:
                                    break;
                            }
                        }, that);
                        if(itemData.award.gold != null){
                            other_result.getChildByName(("Image_award")).loadTexture("act_chuangGuan/img_award_gold.png");
                            other_result.getChildByName("Text_tip").setString("金币已自动收入账户");
                            other_result.getChildByName("Text_award_name").setString(itemData.award.gold+"金币");
                        }else if(itemData.award.money != null){
                            other_result.getChildByName(("Image_award")).loadTexture("act_chuangGuan/img_award_yuanbao.png");
                            other_result.getChildByName("Text_tip").setString("元宝已自动收入账户");
                            other_result.getChildByName("Text_award_name").setString(itemData.award.money+"元宝");
                        }else if(itemData.award.integral != null){
                            other_result.getChildByName(("Image_award")).loadTexture("act_chuangGuan/img_award_liquan.png");
                            other_result.getChildByName("Text_tip").setString("礼券已自动收入账户");
                            other_result.getChildByName("Text_award_name").setString(itemData.award.integral+"礼券");
                        }else if(itemData.award.redpacket != null){
                            other_result.getChildByName(("Image_award")).loadTexture("act_chuangGuan/img_award_hongbao.png");
                            other_result.getChildByName("Text_tip").setString("红包已自动收入账户");
                            other_result.getChildByName("Text_award_name").setString(itemData.award.redpacket+"红包");
                        }else{
                            Panel_award.visible = false;
                            other_result.visible = false;
                            Panel_award.zIndex = -1;
                            _block.zIndex = -1;
                        }
                    }
                    if(itemData.status == -1){
                        //输了看能不能复活,不能复活调整按钮
                        Button_share_relive.shareImage = null;
                        if(itemData.relive){
                            if(itemData.relive.gold != null){
                                Button_share_relive.setTitleText(itemData.relive.gold+"金币复活");
                            }else if(itemData.relive.money != null){
                                Button_share_relive.setTitleText(itemData.relive.money+"元宝复活");
                            }else if(itemData.relive.integral != null){
                                Button_share_relive.setTitleText(itemData.relive.integral+"礼券复活");
                            }else if(itemData.relive.share != null){
                                Button_share_relive.setTitleText("分享复活");
                                Button_share_relive.shareImage = "loading"
                                if(data.shareImage&& data.shareImage.length>0)
                                {
                                    var nameArr = data.shareImage.split("/");
                                    var nameStr = nameArr[nameArr.length - 1];
                                    var filePath = jsb.fileUtils.getWritablePath() + nameStr;
                                    if (jsb.fileUtils.isFileExist(filePath))
                                    {
                                        Button_share_relive.shareImage = filePath;
                                    }
                                    else
                                    {
                                        MjClient.urlImageDown(data.shareImage, nameStr,function (sprite, savepath)
                                        {
                                            Button_share_relive.shareImage = savepath;
                                        },function ()
                                        {
                                            cc.log("download failed:"+data.shareImage);
                                        });
                                    }
                                }
                            }else{
                                Button_share_relive.visible = false;
                                Button_again.setPositionX(bg_fail.width/2);
                            }
                        }else{
                            Button_share_relive.visible = false;
                            Button_again.setPositionX(bg_fail.width/2);
                        }
                    }
                }

            }else{
                //还没开始玩这局
                itemCell.getChildByName(("Image_next_huang")).visible = false;
                itemCell.getChildByName(("Image_next_light")).visible = false;
                itemCell.getChildByName(("Image_success")).visible = false;

            }
        }
    }

    //加载闯关结果数据
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.goldfieldStreakInfo", { fieldId: MjClient.data.sData.tData.fieldId }, function(rtn) {
        MjClient.unblock();
        if(!cc.sys.isObjectValid(uiNode)){
            return;
        }
        if (rtn.code == 0) {
            setView(rtn.data);
        }else{
            if(rtn.message){
                MjClient.showToast(rtn.message);
            }
        }
    });
}

