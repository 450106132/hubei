/***
 * 新框架牌桌逻辑
 * @type {void | Class | *}
 */

var majiang_panel_tongChengMaJiang;
(function () {

    majiang_panel_tongChengMaJiang = majiang_panel_hubei.extend({
        jsonFile: "Play_majiang_tongCheng.json",
        getJsBind: function(){
            var jsBind = {
                layout_piaoFen: {
                    _visible: false,
                    _layout: [[0.6, 0.6], [0.5, 0], [0, 0]],
                    _run: function () {
                        MjClient.playui.initPiaoFenLayout(this);
                    },
                    _event: {
                        waitJiazhu: function () {
                            MjClient.playui.processWaitJiaZhu(this);
                        },
                        initSceneData: function () {
                            MjClient.playui.processWaitJiaZhu(this);
                            var sData = MjClient.data.sData;
                            var uids = sData.tData.uids;
                            for(var i = 0; i < uids.length; i ++) {
                                MjClient.playui.processShowPiaoFen(uids[i]);
                            }
                        },
                        MJJiazhu: function (d) {
                            MjClient.playui.processShowPiaoFen(d.uid);
                        }
                    },
                },
                img_gameover: {
                    _visible: false,
                    _layout: [[0.5, 0.5], [0.5, 0.55], [0, 0]],
                    _event: {
                        roundEnd: function () {
                            this.setVisible(true);
                            this.runAction(cc.sequence(
                                cc.scaleTo(0.3, 2),
                                cc.scaleTo(0.3, 1).easing(cc.easeElasticOut(1)),
                                cc.fadeOut(0.2)
                            ))
                        }
                    }
                }
            };
            return jsBind;
        },

        ctor: function () {
            this._super(majiang_panel_tongChengMaJiang, this.jsonFile);
            return true;
        },

        // override 是否开启显示最多听牌标识
        isShowMaxTingCards: function(){
            return true;
        },

        getLaiZiIcon2D: function () {
            var laiZiNode = new ccui.ImageView();
            laiZiNode.setName("laiZi");
            laiZiNode.loadTexture("playing/MJ/lai.png");
            return laiZiNode;
        },

        checkWhenTouchBegan: function (cardNode) {
            var tData = MjClient.data.sData.tData;
            var player = MjClient.playui.getPlayerInfoByOff();
            if(MjClient.majiang.isAllHandCardsIsHunCard(player.mjhand, tData.hunCard)) {
                return false;
            }else if(cardNode.tag === Number(tData.hunCard)) {
                return true;
            }
            return this._super(cardNode);
        },

        initPiaoFenLayout: function (node) {
            var nodeList = [];
            var unselectColor = cc.color("#FFFFFF");
            var selectedColor = cc.color("#FF7A7A");
            for(var i = 0; i < 4; i ++) {
                var piaoNode = node.getChildByName("piao" + i);
                if(!piaoNode) break;
                piaoNode.setVisible(false);
                piaoNode.index = i;
                nodeList.push(piaoNode);
                var textNode = piaoNode.getChildByName("text");
                if(textNode) {
                    textNode.setTouchEnabled(true);
                    textNode.addTouchEventListener(function(sender, type) {
                        if(type === ccui.Widget.TOUCH_ENDED) {
                            callback(sender.parent.index);
                        }
                    })
                }
            }

            var callback = function (index) {
                index = Number(index);
                for(var j = 0; j < nodeList.length; j ++) {
                    nodeList[j].getChildByName("text").setTextColor(j === index ? selectedColor : unselectColor);
                }
                piaoRadio.selectItem(index);
            };

            var piaoRadio = createRadioBoxForCheckBoxs(nodeList, callback);
            callback(0);   // 默认选择不漂
            this.piaoNodeList = nodeList;
            this.piaoRadio = piaoRadio;

            var textTip = node.getChildByName("textTip");
            textTip.ignoreContentAdaptWithSize(true);
            textTip.setString("");

            var btnSubmit = node.getChildByName("btnSubmit");
            btnSubmit.addTouchEventListener(function (sender, type) {
                if(type === ccui.Widget.TOUCH_ENDED) {
                    var piaoFen = piaoRadio.getSelectIndex();
                    var msg = {
                        cmd: "MJJiazhu",
                        jiazhuNum: piaoFen
                    };
                    MjClient.gamenet.request("pkroom.handler.tableMsg", msg);
                    sender.parent.setVisible(false);
                }
            })
        },

        processWaitJiaZhu: function (node) {
            var tData = MjClient.data.sData.tData;
            var player = MjClient.playui.getPlayerInfoByOff();
            if(tData.tState !== TableState.waitJiazhu || player.mjState !== TableState.waitJiazhu) return;
            node.visible = true;
            var roomSelect = tData.areaSelectMode;
            var piaoId = roomSelect.piaoId;
            var textTip = node.getChildByName("textTip");
            var minNum = player.jiazhuNum === -1 ? "" : ("，最小选择漂分" + player.jiazhuNum + "分");
            var getStringShow = function (idx) {
                var obj = {
                    "0" : "当前选择：带漂，最大选择漂" + roomSelect["piaoFen"] + "分",
                    "1" : "当前选择：定漂，固定漂" + roomSelect["piaoFen"] + "分",
                    "2" : "当前选择：抬漂，可以任意选择漂分",
                    "3" : "当前选择：追漂" + minNum,
                };
                return obj[idx];
            };
            textTip.setString(getStringShow(piaoId));

            var maxSelect = 3, minSelect = 0;
            if(piaoId === 0) {   // 带漂
                maxSelect = roomSelect["piaoFen"];
            }
            else if(piaoId === 1) {   // 定漂
                minSelect = roomSelect["piaoFen"];
                maxSelect = roomSelect["piaoFen"];
                this.piaoRadio.selectItem(minSelect);
                this.piaoNodeList[minSelect].getChildByName("text").setTextColor(cc.color("#FF7A7A"));
            }
            else if(piaoId === 3) {  // 追漂
                minSelect = Number(player.jiazhuNum) === -1 ? 0 : player.jiazhuNum;
                this.piaoRadio.selectItem(minSelect);
                this.piaoNodeList[minSelect].getChildByName("text").setTextColor(cc.color("#FF7A7A"));
            }

            for(var i = 0; i < 4; i ++) {
                var piaoNode = node.getChildByName("piao" + i);
                if(piaoNode) piaoNode.setVisible(i >= minSelect && i <= maxSelect);
            }
        },

        processShowPiaoFen: function (uid) {
            var off = getUiOffByUid(uid);
            var node = MjClient.playui.getNodeByOff(off);
            var player = MjClient.playui.getPlayerInfoByOff(off);
            if(!node || !player) return;
            var layoutHead = node.getChildByName("layout_head");
            var textPiao = layoutHead.getChildByName("text_piaoFen");
            textPiao.setString("");
            textPiao.setVisible(true);
            textPiao.ignoreContentAdaptWithSize(true);
            textPiao.setString(player.jiazhuNum ? "漂" + player.jiazhuNum + "分" : "");
            if(Number(player.jiazhuNum) === -1) textPiao.setString("");
        }

    });
}());
































