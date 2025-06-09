/**
 * Created by Tom on 2018/3/21.
 */
function SetCardsBg(node) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var maxPlayer = tData.maxPlayer;
    if(maxPlayer && maxPlayer == 2){
        var back = node.getChildByName("back");
        var head0 = back.getChildByName("head0");
        var head1 = back.getChildByName("head1");
        var head0bg = head0.getChildByName("head_bg");
        var head1bg = head1.getChildByName("head_bg");
        var cardHeap = back.getChildByName("cardHeap");
        cardHeap.setPositionY(cardHeap.getPositionY() + cardHeap.getPositionY()/5);
        head0.setPositionY(head0.getPositionY() - head0bg.height/2);
        head1.setPositionY(head1.getPositionY() - head1bg.height/0.8);
        head0bg.setScaleY(head0bg.getScaleY() * 1.5);
        head1bg.setScaleY(head1bg.getScaleY() * 1.5);
    }
};

function SetUserCards(node, off) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var maxPlayer = tData.maxPlayer;
    //cc.log(".....tData", JSON.stringify(tData));
    var pl = MjClient.getPlayerByIndex(off);
    node.setVisible(false);
    if(!pl)return;
    node.setVisible(true);

    node = node.getChildByName("head");
    var zhuangNode = node.getChildByName("zhuang");
    var tempZhuang = (typeof MjClient.preZhuang != 'undefined') ? MjClient.preZhuang : tData.zhuang;
    zhuangNode.setVisible(tData.uids[tempZhuang] == pl.info.uid);
    zhuangNode.zIndex = 10;
    var name = node.getChildByName("name");
    var _nameStr = unescape(pl.info.nickname ) + "";
    name.ignoreContentAdaptWithSize(true);
    name.setString(_nameStr);
    name.setFontName("Arial");
    name.setFontSize(name.getFontSize());

    var putCardsBind = {
        head:{
            up:{
                _visible:false,
            },
            stand:{
                //展示玩家所出的牌
                _visible:false,
                _run:function () {
                    /*
                     测试数据
                    pl.mjput = [1,2,3,4,5,6,7,8,9,9,11,12,13,14,15,16,17,18,19,19,21,22,23,24,25,26,27,28,29,29,31,32,33,34,35,36,37,38,39,39,41,42,43,44,45,46,47,48,49,49,1,2,3,4,5,6,7,8,9,9,11,12,13,14,15,16,17];
                    pl.mjput = [1,2,3,4,5,6,7,8,9,9,11,12,13,14,15,16,17,18,19,19,21,22,23,24,25,26,27,28,29,29,31,32,33];
                    */
                    //每行最多显示33张
                    var n = 32;
                    var arr = [];
                    for(var i = 0; i < pl.mjput.length; i++){
                        var cd = getNewCard(node, "stand", "mjhead", pl.mjput[i], 0);
                        cd.setScale(cd.getScale()/0.8);
                        arr.push(cd);
                    }
                    //两人玩特殊处理
                    if (arr.length != 0 && maxPlayer == 2) {
                        cc.log("Two players!")
                        arr[0].setPositionY(arr[0].getPositionY() + arr[0].height * 0.15);
                    }
                    for(var i = 0; i < arr.length; i++) {
                        arr[i].visible = true;
                        arr[i].enabled = false;
                        arr[i].setScale(arr[i].getScale() * 0.68);
                        var w = arr[0].width * arr[0].getScale();
                        var h = arr[0].height * arr[0].getScale();
                        arr[i].setPosition(arr[0].x + (w * i), arr[0].y);
                        for(var j = 1; j < 3; j++){
                            if(i >= j * n) {
                                arr[i].setPosition(arr[0].x + w * (i - j * n), arr[0].y - h * j);
                            }
                        }
                        //cc.log("i:" + i + "   position:" + arr[i].x + " " + arr[i].y);
                    }
                    CardLayoutRestoreForEndOne(node, pl);
                }
            }
        }
    }
    BindUiAndLogic(node.parent, putCardsBind);
    addWxHeadToEndUI(putCardsBind.head._node, off);
};

function SetLeftCards(node) {
    var sData = MjClient.data.sData;
    var pl = MjClient.getPlayerByIndex(0);
    var leftCards = sData.tData.leftCards;
    //cc.log("leftCards", JSON.stringify(leftCards));
    node = node.getChildByName("cards");


    var leftCardsBind = {
        cards:{
            up:{
                _visible:false,
            },
            stand:{
                _visible:false,
                //展示剩余牌堆的牌
                _run:function () {
                    //每行最多显示n = 32张
                    var n = 32;
                    var array = [];
                    for(var i = 0; i < leftCards.length; i++){
                        var cd = getNewCard(node, "stand", "mjhead", leftCards[i], 0);
                        array.push(cd);
                    }

                    for(var i = 0; i < array.length; i++){
                        array[i].visible = true;
                        array[i].enabled = false;
                        var w = array[0].width * array[0].getScale();
                        var h = array[0].height * array[0].getScale();
                        array[i].setPosition(array[0].x + (w * i), array[0].y);
                        for(var j = 1; j < 4; j++) {
                            if(i >= j * n){
                                array[i].setPosition(array[0].x + w * (i - j * n), array[0].y - (h * j));
                            }
                        }
                    }

                    CardLayoutRestoreForEndOne(node, pl);
                }
            }
        }
    }
    BindUiAndLogic(node.parent, leftCardsBind);
};


var PopupShowCardsHeap = cc.Layer.extend({
    jsBind:{
        block:{
            _layout:[[1,1],[0.5,0.5],[0,0],true]
        },
        back:{
            _layout:[[1,1],[0.5,0.5],[0,0]],
            close:{
                _click:function () {
                    if(MjClient.showCardsHeapUi) {
                        MjClient.showCardsHeapUi.removeFromParent(true);
                        MjClient.showCardsHeapUi = null;
                    }
                }
            },
            head0:{
                head:{
                    zhuang:{_visible:false}
                },
                _run:function(){
                    SetUserCards(this, 0);
                }
            },
            head1:{
                head:{
                    zhuang:{_visible:false}
                },
                _run:function() {
                    SetUserCards(this, 1);
                }
            },
            head2:{
                head:{
                    zhuang:{_visible:false}
                },
                _run:function() {
                    SetUserCards(this, 2);
                }
            },
            head3:{
                head:{
                zhuang:{_visible:false}
                },
                _run:function () {
                    SetUserCards(this, 3);
                }
            },
            cardHeap:{
                cardHeptText:{_visible:true},
                cards:{},
                _run:function () {
                    SetLeftCards(this);
                }
            },
        }
    },
    ctor:function(){
        this._super();
        var showCardsHeapUi = ccs.load("showCardsHeap.json");
        BindUiAndLogic(showCardsHeapUi.node, this.jsBind);
        this.addChild(showCardsHeapUi.node);
        SetCardsBg(showCardsHeapUi.node);
        MjClient.showCardsHeapUi = this;

        return true;
    }
});
