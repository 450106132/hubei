/**
 * Created by sking on 2017/4/20.
 */

var showFlowerLayer = cc.Layer.extend({
    setFlowerPos:null,
    ctor:function () {
        this._super();
        var showflowerUI = ccs.load(res.ShowFlow_json);
        this.addChild(showflowerUI.node);
        var that = this;

        var _block =  showflowerUI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        _block.addTouchEventListener(function(sender,type){
            if(type == 2)
            {
                that.removeFromParent();
            }
        },this);

        var _back =  showflowerUI.node.getChildByName("back");
        setWgtLayout(_back,[0.85,0.8],[0.5,0.5],[0,0],2);

        //添加花
        function setPlayerInfo(node,off)
        {
            var sData = MjClient.data.sData;
            var tData = sData.tData;

            var pl ;

            if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH || MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
            {
                pl = getUIPlayer_changpai(off);
            }
            else
            {
                pl = getUIPlayer(off);
            }

            if(pl && pl.mjflower && pl.mjflower.length > 0)
            {
                node.visible = true;

                var out0 = node.getChildByName("out0");
                out0.visible = false;
                var out1 = node.getChildByName("out1");
                out1.visible = false;
                var out2 = node.getChildByName("out2");
                out2.visible = false;

                //pl.mjflower = [111,121,131,141,121,131,141];//拥有的花牌，todo....
                for(var i = 0; pl && i < pl.mjflower.length; i++)
                {
                    var msg =
                        {
                            card: pl.mjflower[i],
                            uid: pl.info.uid
                        };
                    that.setFlowerPos(node, msg, off, i,pl.mjflower.length);
                }
            }
        }

        //自己
        var node = _back.getChildByName("Node_down");//第0个玩家的节点
        node.visible = false;
        setPlayerInfo(node,0);

        //左边的
        var node1 = _back.getChildByName("Node_right");//第1个玩家的节点
        node1.visible = false;
        setPlayerInfo(node1,1);

        //上面
        var node2 = _back.getChildByName("Node_top");//第2个玩家的节点
        node2.visible = false;
        //setPlayerInfo(node2,2);

        //右边的
        var node3 = _back.getChildByName("Node_left");//第3个玩家的节点
        node3.visible = false;
        //setPlayerInfo(node3,3);
        if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH || MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
        {
            setPlayerInfo(node3,2);
        }
        else
        {
            setPlayerInfo(node2,2);
            setPlayerInfo(node3,3);
        }

        if (MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG) {
            var sData = MjClient.data.sData;
            var tData = sData.tData;
            if (tData.areaSelectMode.canJiaBei && !tData.allSelect) { // 全部加倍后才显示花牌
                node.visible = false;
                node1.visible = false;
                node2.visible = false;
                node3.visible = false;
            }
        }

        return true;
    },
    setFlowerPos:function(node, msg, off, outNum,flowerCount) {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var uids = tData.uids;
        var selfIndex = getPlayerIndex(off);

        if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH || MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
        {
            selfIndex = (uids.indexOf(SelfUid()) + off) % 3;
        }

        if (uids[selfIndex] == msg.uid) {
            var pl = sData.players[msg.uid];
            var putnum = outNum; //outNum >= 0 ? outNum : (pl.mjput.length - 1); ,花的个数
            cc.log(pl.mjput + " setFlowerPos " + putnum);
            var out0 = node.getChildByName("out0");
            out0.visible = false;
            var out1 = node.getChildByName("out1");
            out1.visible = false;

            var out2 = node.getChildByName("out2");
            out2.visible = false;


            var out;
            if(putnum > 23) {
                out = out2.clone();
            }else if (putnum > 11)
            {
                out = out1.clone();
            }
            else {
                out = out0.clone();
            }
            out.setScale(out.getScale() * 1);
            var oSize = out.getSize();
            var oSc = out.scale;
            out.visible = true;

            if (off==0)
            {
                if (putnum>23)
                {
                    node.addChild(out);
                }
                else if (putnum>11)
                {
                    node.addChild(out, 100);
                }
                else
                {
                    node.addChild(out, 200);
                }
            }
            else if (off==2)
            {
                if (putnum>23)
                {
                    node.addChild(out,200);
                }
                else if (putnum>11)
                {
                    node.addChild(out, 100);
                }
                else
                {
                    node.addChild(out);
                }
            }
            else if (off == 1) {
                node.addChild(out, 200 - putnum);
            }
            else if (off == 3) {
                node.addChild(out, putnum);
            }


            //if (off == 0 && putnum > 5) {
            //    node.addChild(out);
            //}
            //else if (off == 1 || off == 0) {
            //    node.addChild(out, 200 - putnum);
            //}
            //else if (off == 2 || off == 3) {
            //    node.addChild(out, putnum);
            //}
            //else {
            //    node.addChild(out);
            //}


            out.visible = true;
            out.name = "out";
            if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH || MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
            {
                setCardSprite_changpai(out, msg.card, off);
            }
            else
            {
                setCardSprite(out, msg.card, off);
            }
            var endPoint = cc.p(0, 0);
            var Midpoint = cc.p(0, 0);
            var ws = cc.director.getWinSize();

            if(putnum > 23)
            {
                out.x = out2.x;
                out.y = out2.y;
                putnum -= 24;
            }
            else if (putnum > 11) {
                out.x = out1.x;
                out.y = out1.y;
                putnum -= 12;
            }
            if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH || MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
            {
                if(off == 2)//取左边的位置
                {
                    off = 3;
                }
            }

            if (off == 0) {
                cc.log(" flower count = " + flowerCount);
                var moveDis = flowerCount;
                if(flowerCount >= 12) moveDis = 12;
                var offX = (moveDis - 1)*(oSize.width * oSc * 1 * 0.91)/2;
                if(offX <= 0) offX = 0;
                endPoint.y = out.y;
                out.x -= offX;
                endPoint.x = out.x + oSize.width * oSc * putnum * 0.91;
                Midpoint.x = ws.width / 2;
                Midpoint.y = ws.height / 4;

            }
            else if (off == 1) {
                var moveDis = flowerCount;
                if(flowerCount >= 12) moveDis = 12;
                var offY = (moveDis - 1)*(oSize.height * oSc * 1 * 0.7)/2;
                if(offY <= 0) offY = 0;
                cc.log(" offY count = " + offY);

                out.y -= offY;
                endPoint.y = out.y + oSize.height * oSc * putnum * 0.7 ;
                endPoint.x = out.x;
                Midpoint.x = ws.width / 4 * 3;
                Midpoint.y = ws.height / 2;
                //out.zIndex = 100 - putnum;
            }
            else if (off == 2) {
                var moveDis = flowerCount;
                if(flowerCount >= 12) moveDis = 12;

                cc.log(" 2222222flower count = " + flowerCount);
                var offX = (moveDis - 1)*(oSize.width * oSc * 1 * 0.91)/2;
                if(offX <= 0) offX = 0;
                endPoint.y = out.y;
                out.x += offX;
                endPoint.x = out.x  - oSize.width * oSc * putnum * 0.91;
                Midpoint.x = ws.width / 2;
                Midpoint.y = ws.height / 4;
            }
            else if (off == 3) {

                var moveDis = flowerCount;
                if(flowerCount >= 12) moveDis = 12;
                var offY = (moveDis - 1)*(oSize.height * oSc * 1 * 0.7)/2;
                if(offY <= 0) offY = 0;
                cc.log(" 333333offY count = " + offY);

                out.y = out.y + offY;
                endPoint.y = out.y - oSize.height * oSc * putnum * 0.7;
                endPoint.x = out.x;
                Midpoint.x = ws.width / 4;
                Midpoint.y = ws.height / 2;
                out.zIndex = putnum;
            }
            out.x = endPoint.x;
            out.y = endPoint.y;

        }
    }


});

/**create by Lms
 * @DateTime:     2018-11-16 
 * @Description: 起手胡的显示
 */
var showQiShouHuLayer = cc.Layer.extend({

    ctor: function() {
        this._super();
        var showflowerUI = ccs.load("showQiShouHuTips.json");
        this.addChild(showflowerUI.node);
        var that = this;

        var _block = showflowerUI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        _block.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        }, this);

        var _back = showflowerUI.node.getChildByName("back");
        setWgtLayout(_back, [0.85, 0.8], [0.5, 0.5], [0, 0], 2);

        var _isShow = this.isHaveData();
        var icon = _back.getChildByName("Image_1");
        icon.visible = !_isShow;

        for (var i = 0; i < 4; i++) {
            this["node_" + i] = _back.getChildByName("node_" + i);
            this["node_" + i].visible = false;
            this["scroll_" + i] = this["node_" + i].getChildByName("ScrollView_1");
            this["scroll_" + i].visible = false;
            for (var j = 0; j < 2; j++) {
               this["scroll_" + i].getChildByName("out" + j).setVisible(false);
            }
        }

        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var uids = tData.uids;
        if (_isShow) {
            cc.log("========= sData.player ",JSON.stringify(sData.players));
            for (var i = 0; i < uids.length; i++) {
                var _player = sData.players[uids[i]];
                this["node_" + i].visible = true;
                this.showQSHcards(this["node_" + i], _player.qiShouHuDone, _player);
            }
        }
        UIEventBind(null, this, "roundEnd", function (msg) {
            that.removeFromParent();
        });

        return true;
    },
    isHaveData: function() {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var uids = tData.uids;
        for (var i = 0; i < uids.length; i++) {
            if (uids[i] == 0 || !sData.players[uids[i]]) {
                return false;
            }
        }
        var haveData = false;
        for (var i = 0; i < uids.length; i++) {
            if (!sData.players[uids[i]].qiShouHuDone) {
                sData.players[uids[i]].qiShouHuDone=[];
            }
            if (sData.players[uids[i]].qiShouHuDone.length > 0) {
                haveData =  true;
            }
        }

        if (haveData) {
            return true;
        }

        return false;

    },

    showQSHcards: function(node, data, pl) {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var uids = tData.uids;
        var url = pl.info.headimgurl;
        if (!url) url = "png/default_headpic.png";
        cc.loader.loadImg(url, {
            isCrossOrigin: true
        }, function(err, texture) {
            if (!err && texture && cc.sys.isObjectValid(node)) {
                var headSprite = new cc.Sprite(texture);
                var nobody = node.getChildByName("nobody");
                if (!nobody || !cc.sys.isObjectValid(nobody)) {
                    return;
                }
                headSprite.setPosition(nobody.width / 2, nobody.height / 2 + 2);
                headSprite.width = nobody.width * 0.85;
                headSprite.height = nobody.height * 0.85;
                nobody.addChild(headSprite);

            }
        });
        if (data.length <= 0) {
            return;
        }
        var _cards_all=0;
        var _sameCards = [];
        for (var i = 0; i < data.length; i++) {
            
            if (data[i].tag && data[i].tag == "起手已胡中途不能胡") {
                continue;
            }
            var _cards = data[i].cards;
            //重复的牌 就不显示了
            var iscontinue = false;
            for (var k = 0; k < _sameCards.length; k++) {
                if (JSON.stringify(_sameCards[k]) == JSON.stringify(_cards) ) {
                    iscontinue = true;
                }
            }
            _sameCards.push(_cards);
            if (iscontinue) {
                continue;
            }
            
            
            _cards_all += data[i].cards.length;
            _cards_all++;

        }

        var scroll = node.getChildByName("ScrollView_1");
        var out0 = scroll.getChildByName("out0");
        var out1 = scroll.getChildByName("out1");
        scroll.visible = true;
        var _width = out0.width * 0.3;
        var _pos1 = out1.getPosition();
        var _pos = out0.getPosition();
        var _num = 0;
        if (_cards_all< 42) {
            _cards_all = 42;
        }
        scroll.setInnerContainerSize(cc.size(_width *  Math.round(_cards_all/2), 100));
        _sameCards = [];
        for (var i = 0; i < data.length; i++) {
            var _cards = data[i].cards;
            _cards.sort(function (a, b) {
                return a - b;
            });
            
            if (data[i].tag && data[i].tag == "起手已胡中途不能胡") {
                continue;
            }
            //重复的牌 就不显示了
            var iscontinue = false;
            for (var k = 0; k < _sameCards.length; k++) {
                if (JSON.stringify(_sameCards[k]) == JSON.stringify(_cards) ) {
                    iscontinue = true;
                }
            }
            _sameCards.push(_cards);
            if (iscontinue) {
                continue;
            }
            
            
            for (var j = 0; j < _cards.length; j++) {
                var out = out0.clone();
                if (_num >= _cards_all/2 && _num >= 21) {
                    out = out1.clone();
                    _pos = _pos1;
                }
                out.visible = true;
                out.name = "out";

                out.x = _pos.x;
                scroll.addChild(out);
                setCardSprite(out, _cards[j], 0);
                _pos.x += _width;
                _num++;

            }
            _pos.x += _width*0.95;
            _num++;

        }

    },
});