/**
 * Created by maoyu on 2018/3/30.
 */

var h5 = h5 || {};

h5.nativeHelper = {
    nativeBattery:function()
    {
        try
        {
            navigator.getBattery().then(function(battery) {
                // Update the battery status initially when the promise resolves ...
                postEvent("nativePower", battery.level);

                battery.onlevelchange = function () {
                    postEvent("nativePower", battery.level);
                };
            });
        }
        catch (e)
        {
            cc.log("nativeBattery error:"+e);
        }

    },

    nativeVibrato : function ()
    {
        try
        {
            if(window.plus)
            {
                window.plus.device.vibrate( 2000 );
            }
            else
            {
                cc.log("nativeVibrato error:window.plus null");
            }
        }
        catch (e)
        {
            cc.log("nativeVibrato error:"+e);
        }
    },


    openUrl:function(url)
    {
        try
        {
            window.open(url);
        }
        catch (e)
        {
            cc.log("openUrl error:"+e);
        }
    },


    getVersionName:function()
    {
        return "4.0.3";
    },

    getPackageName:function()
    {
        var packageName = this.getUrlValue('packageName');
        return packageName || TestConfig.PackageName;
    },

    isWeb: function()
    {
        return cc.sys.platform == cc.sys.MOBILE_BROWSER || cc.sys.platform == cc.sys.DESKTOP_BROWSER;
    },

    isWebOfWx: function()
    {   
        var tx = {};
        // tx[cc.sys.BROWSER_TYPE_QQ] = true;
        // tx[cc.sys.BROWSER_TYPE_QZONE] = true;
        tx[cc.sys.BROWSER_TYPE_WECHAT] = true;
        tx[cc.sys.BROWSER_TYPE_MOBILE_QQ] = true;
        //alert(cc.sys.browserType && tx[cc.sys.browserType])
        return cc.sys.browserType && tx[cc.sys.browserType]
    },

    getUrlValue: function(key) {
        var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    },

    changeGameDownloadCfgUrl: function(cfg)
    {
        for(var i in cfg) {
            var url = cfg[i];
            var words = url.split('/');
            var dirname = words[words.length-2];
            url = url.replace('cdn', dirname+'.member')
            // url = url.replace('http:', 'https:');
            cfg[i]= url;
        }
    }

};


(function(){
if(typeof(cc) == 'undefined') return

if(cc.sys.platform != cc.sys.MOBILE_BROWSER && cc.sys.platform != cc.sys.DESKTOP_BROWSER) {
    cc.log('require nativeHelper native is not web')
    return;
} else if(cc) {
    cc.log('require nativeHelper native is web')
}

cc.Node.prototype.removeChildByName = function(name) {
    cc.log('remove child by name', name)
    this.getChildByName(name).removeFromParent();
}

// cc.Node.prototype.addChildOrigin = cc.Node.prototype.addChild;
// cc.Node.prototype.addChild = function(child, localZOrder, tag){
//     this.addChildOrigin.apply(this, arguments);
// }
})()


var a = {}
var b = function(){return 1;}
var c = function(){return 2;}

function test(func){
    a[func] = false
}