/**
 * Created by sking on 2017/5/22.
 */

//屏蔽层，回放回来后，3秒后才能点击 by sking
var untouchLayer = cc.Layer.extend({
    sprite:null,
        jsBind:{
        loading:{
            _layout:[[0.2,0.2],[0.5,0.5],[0,0]]	,
            _run:function()
            {
                this.visible = false;
            }
        },
        block:{
            _layout:[[1,1],[0.5,0.5],[0,0],true],
            _run:function()
            {
                this.setOpacity(0);
            }
        }
    },
    ctor:function () {
        this._super();
        var blockui = ccs.load(res.Block_json);
        BindUiAndLogic(blockui.node,this.jsBind);
        this.addChild(blockui.node,1000);
        var that = this;
        this.scheduleOnce(function(){
            that.zIndex = -1000;
            that.removeFromParent();
        },2);
        return true;
    }
});


var replayUILayer = cc.Layer.extend({
    _bIsPlay:true,
    _btnPlay:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("ReplayUILayer.json");
        this.addChild(UI.node);
        var that = this;
        MjClient.replayui = this;

        //var _block = UI.node.getChildByName("block");
        //setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        //var that = this;

        if(MjClient.Scene.getChildByName("replayText"))  MjClient.Scene.removeChildByName("replayText");


        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[1.1, 1.1], [0.5, 0.5], [0, 0],true);

        var _controllerBg = _back.getChildByName("controllerBg");


        //var _btnPuase = _controllerBg.getChildByName("pause_btn");
        //_btnPuase.addTouchEventListener(function (sender, type) {
        //    if (type == 2) {
        //        updatelayer_itme_node.pause();
        //    }
        //}, this);




        this._btnPlay = _controllerBg.getChildByName("play_btn");
        this._btnPlay.loadTextureNormal("wait/pause.png");
        this._btnPlay.loadTexturePressed("wait/pause_h.png");

        this._btnPlay.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(this._bIsPlay)
                {
                    this._btnPlay.loadTextureNormal("wait/playbtn.png");
                    this._btnPlay.loadTextureNormal("wait/playbtn_h.png");
                    this._bIsPlay = false;
                    updatelayer_itme_node.pause();
                }
                else
                {
                    this._btnPlay.loadTextureNormal("wait/pause.png");
                    this._btnPlay.loadTexturePressed("wait/pause_h.png");
                    this._bIsPlay = true;
                    updatelayer_itme_node.resume();
                }
            }
        }, this);


        var _return_btn = _controllerBg.getChildByName("return_btn");
        _return_btn.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.replayEnd();
            }
        }, this);
        _return_btn.setTouchEnabled(false);
        UIEventBind(null,UI.node,"PKPut",function() {
            _return_btn.setTouchEnabled(true);
        });

        UIEventBind(null,UI.node,"MJPut",function() {
            _return_btn.setTouchEnabled(true);
        });



        UIEventBind(null,UI.node,"rematch",function() {
            that.replayEnd();
			replayData = null;
            replayData = {};
        });


        var currentSpeed = [0.5,1,2];
        var spIdx = 1;
        var _btn_speed = _controllerBg.getChildByName("btn_speed");
        var _path = "wait/";
        _btn_speed.loadTextureNormal(_path + "zhong-1.png");
        _btn_speed.loadTexturePressed(_path + "zhong-2.png");
        if(isYongZhouProject()){
            spIdx = 0;
            updatelayer_itme_node.getScheduler().setTimeScale(currentSpeed[spIdx]);
            _btn_speed.loadTextureNormal(_path + "man-1.png");
            _btn_speed.loadTexturePressed(_path + "man-2.png");
        }
        _btn_speed.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                spIdx++;
                if(spIdx >= 3)
                {
                    spIdx = 0;
                }
                updatelayer_itme_node.getScheduler().setTimeScale(currentSpeed[spIdx]);
                switch (spIdx)
                {
                    case 0:
                        _btn_speed.loadTextureNormal(_path + "man-1.png");
                        _btn_speed.loadTexturePressed(_path + "man-2.png");

                        break;
                    case 1:
                        _btn_speed.loadTextureNormal(_path + "zhong-1.png");
                        _btn_speed.loadTexturePressed(_path + "zhong-2.png");
                        break;
                    case 2:
                        _btn_speed.loadTextureNormal(_path + "kuai-1.png");
                        _btn_speed.loadTexturePressed(_path + "kuai-2.png");
                        break;
                    default:
                        break;
                }
            }
        }, this);


        //重播
        var _btn_replay = _controllerBg.getChildByName("btn_replay");
        if(_btn_replay)
        {
            _btn_replay.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.replayEnd(); //结束当前的回放
                    replayRedioByRoleUid(replayData.currentUid);

                    /*添加“切换视角需要重新播放，请稍后”，的文字提示灰色背景*/
                    if(MjClient.Scene.getChildByName("replayText"))  MjClient.Scene.removeChildByName("replayText");
                    var colorBg = new cc.LayerColor(new cc.color(200, 190, 180, 160), cc.winSize.width, cc.winSize.height);
                    colorBg.setPosition(0, 0);
                    colorBg.setName("replayText");
                    MjClient.Scene.addChild(colorBg,100);
                    var text = new ccui.Text();
                    text.setFontName("fonts/lanting.ttf");
                    text.setFontSize(40);
                    text.setTextColor(cc.color(255,0,0,255));
                    text.setAnchorPoint(0.5, 0.5);
                    text.setPosition(colorBg.getContentSize().width/2, colorBg.getContentSize().height/2);
                    text.setName("replayText");
                    text.setString("正在重新播放，请稍等");
                    colorBg.addChild(text,100);
                    /*end of 添加“切换视角需要重新播放，请稍后”，的文字提示灰色背景*/

                }
            }, this);
        }

        //选择角色重播
        var _btn_roles = _controllerBg.getChildByName("btn_roles");
        if(_btn_roles)
        {
            var replay_players = replayData.players;
            var _roleBack = _btn_roles.getChildByName("roleBack");
            _roleBack.visible = true;
            var createSelectItem = function(copyNode,oneData) {
                var Text_name = copyNode.getChildByName("Text_name");
                Text_name.ignoreContentAdaptWithSize(true);
                var userId = oneData.info.uid;
                var _name = getNewName_new(unescape(replay_players[userId].info.nickname), 6);
                Text_name.setString(_name);
                Text_name.setFontName("Arial");
                Text_name.setFontSize(Text_name.getFontSize());


                var Text_id = copyNode.getChildByName("Text_id");
                Text_id.ignoreContentAdaptWithSize(true);
                Text_id.setString("ID:" + userId);
                Text_id.visible = false;

                var sp_bg = copyNode.getChildByName("img_head");

                //加载头像
                var imageUrl = replay_players[userId].info.headimgurl;
                var sprite_bg = new cc.Sprite("png/default_headpic.png");
                sprite_bg.setPosition(sp_bg.getPosition());
                sprite_bg.setContentSize(sp_bg.getContentSize());
                copyNode.addChild(sprite_bg);
                cc.loader.loadImg(imageUrl ? imageUrl : "png/default_headpic.png", {
                    isCrossOrigin: true
                }, function(err, img) {
                    if (err) {
                        cc.log(err);
                    } else if (img && cc.sys.isObjectValid(sprite_bg)) {
                        sprite_bg.setTexture(img);
                    }
                });

                var _currentTag = copyNode.getChildByName("currentTag"); //播放的按钮
                _currentTag.visible = false;
                _currentTag.zIndex = 150;

                var btn_yes = copyNode.getChildByName("btn_yes"); //播放的按钮
                btn_yes.zIndex = 100;
                btn_yes.setTag(userId);
                btn_yes.addTouchEventListener(function(sender, type) {
                    var RoleNum = sender.getTag();
                    if (type == 2) {
                        replayData.currentUid = RoleNum; //切换当前的视角的uid
                        that.replayEnd(); //结束当前的回放
                        replayRedioByRoleUid(RoleNum);
                        if(cc.sys.isObjectValid(_roleBack))_roleBack.visible = false;

                        /*添加“切换视角需要重新播放，请稍后”，的文字提示灰色背景*/
                        if(MjClient.Scene.getChildByName("replayText"))  MjClient.Scene.removeChildByName("replayText");
                        var colorBg = new cc.LayerColor(new cc.color(200, 190, 180, 160), cc.winSize.width, cc.winSize.height);
                        colorBg.setPosition(0, 0);
                        colorBg.setName("replayText");
                        MjClient.Scene.addChild(colorBg,100);
                        var text = new ccui.Text();
                        text.setFontName("fonts/lanting.ttf");
                        text.setFontSize(40);
                        text.setTextColor(cc.color(255,0,0,255));
                        text.setAnchorPoint(0.5, 0.5);
                        text.setPosition(colorBg.getContentSize().width/2, colorBg.getContentSize().height/2);
                        text.setName("replayText");
                        text.setString("切换视角需重新播放，请稍等");
                        colorBg.addChild(text,100);
                        /*end of 添加“切换视角需要重新播放，请稍后”，的文字提示灰色背景*/
                    }
                });

                //当前正在播放的回放！
                if(userId == replayData.currentUid)
                {
                    btn_yes.setTouchEnabled(false);
                    btn_yes.visible = false;
                    _currentTag.visible = true;
                }
                return copyNode;
            };

            for(var i = 0;i < 4;i++)
            {
                var _node =  _roleBack.getChildByName("cell_select_" + i);
                if(_node) _node.visible = false;
            }

            var nodeIdx = 0;
            for (var key in replay_players) {
                var _cellNode = _roleBack.getChildByName("cell_select_" + nodeIdx);
                _cellNode.visible = true;
                if(_cellNode) createSelectItem(_cellNode,replay_players[key]);
                nodeIdx++;
            }

            _btn_roles.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    _roleBack.visible = !_roleBack.isVisible();
                }
            }, this);

            _back.setTouchEnabled(true);
            _back.addTouchEventListener(function (sender, type) {
                if(cc.sys.isObjectValid(_roleBack))_roleBack.visible = false;
            }, this);
        }

    },
    replayEnd: function() {
        //postEvent("returnHome");
        //MjClient.leaveGame();
        if(!cc.sys.isObjectValid(this)){
            return;
        }

        this.removeFromParent();
        updatelayer_itme_node.stopAllActions();
        var instance = cc.Director.getInstance(); /* CGY 2016-11-08 */
        instance.getScheduler().unscheduleAllForTarget(updatelayer_itme_node);
        MjClient.rePlayVideo = -1;
        MjClient.replayui = null;
        MjClient.otherReplayUid = null;
        MjClient.otherReplayRound = null;
        MjClient.arrowbkNode = null;
        MjClient.roundnumImgNode = null;
        MjClient.cardNumImgNode = null;
        updatelayer_itme_node.getScheduler().setTimeScale(1);
        stopEffect(playTimeUpEff);
        playTimeUpEff = null;
        delete MjClient.data.sData;
        postEvent("LeaveGame");
         var touchLayer = new untouchLayer();
         if(touchLayer) MjClient.Scene.addChild(touchLayer,1500);
    }
});