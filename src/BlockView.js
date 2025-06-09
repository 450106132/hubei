/**
 * Created by Administrator on 2017/6/21/021.
 */


var BlockView = cc.Layer.extend({
    sprite:null,
    jsBind:{
        loading:{
            _layout:[[0.2,0.2],[0.5,0.5],[0,0]]	,
            _run:function()
            {
                this.runAction(cc.repeatForever(cc.rotateBy(2,-360)));
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
        this.addChild(blockui.node);
        MjClient.blockui=this;
        return true;
    }
    //,onEnter:function ()
    //{
    //    this._super();
    //    MjClient.unblock();
    //}
});