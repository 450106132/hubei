/**
 * Created by Administrator on 2017/6/21/021.
 */

MjClient.native.mobgiAdsType = {
    YUANSHENG_CHONGQI:1,
    YUANSHENG_TUICHU:2,
    SHIPIN_SHANGCHENG:3,
    SHIPIN_ZHUANPAN:4,
    SHIPIN_FENXIANG:5,
    SHIPIN_ZHUJIEMIAN:6
};


MjClient.native.mobgiAdsCallbackEvent = {
    NATIVE_ADS_INFO:"NativeAdsInfo",
    NATIVE_ADS_INVALID:"NativeAdsInvalid",
    VIDEO_ADS_COMPLETED:"VideoAdsCompleted",
    VIDEO_ADS_CLICK:"VideoAdsClick",
    VIDEO_ADS_ERROR:"VideoAdsError",
    VIDEO_ADS_SKIPPED:"VideoAdsSkipped",
    VIDEO_ADS_FAILURE:"VideoAdsFailure",
    VIDEO_ADS_PRESENT:"VideoAdsPresent",
    VIDEO_ADS_READY:"VideoAdsReady",
    VIDEO_ADS_NOT_READY:"VideoAdsNotReady"
};

MjClient.native.mobgiAds =
{
    getNativeAdsInfo:function(adsType)
    {
        if ( (isJinZhongAPPType() && !isCurrentNativeVersionBiggerThan("11.0.0"))
            || (MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ && MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ && !isCurrentNativeVersionBiggerThan("16.0.0")))
        {
            postEvent(MjClient.native.mobgiAdsCallbackEvent.NATIVE_ADS_INVALID, "{type:"+adsType+"}");
            return;
        }

        if (cc.isUndefined(adsType))
        {
            return;
        }

        try
        {

            if ( cc.sys.OS_ANDROID == cc.sys.os )
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.MobgiAdsHelper", "getNativeAdsInfo", "(I)V", adsType);
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {

            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                postEvent(MjClient.native.mobgiAdsCallbackEvent.NATIVE_ADS_INVALID, "{type:"+adsType+"}");
            }
        }
        catch (e)
        {
            MjClient.native.HelloOC("getNativeAdsInfo throw: " + JSON.stringify(e));
        }
    }
    ,showNativeAds:function(adsType)
    {
        if ( (isJinZhongAPPType() && !isCurrentNativeVersionBiggerThan("11.0.0"))
            || (MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ && MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ && !isCurrentNativeVersionBiggerThan("16.0.0")))
        {
            return;
        }

        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.MobgiAdsHelper", "showNativeAds", "(I)V", adsType);
            }
            else if(cc.sys.OS_IOS==cc.sys.os)
            {

            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("showNativeAds throw: " + JSON.stringify(e));
        }
    }
    ,clickNativeAds:function(adsType)
    {
        if ( (isJinZhongAPPType() && !isCurrentNativeVersionBiggerThan("11.0.0"))
            || (MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ && MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ && !isCurrentNativeVersionBiggerThan("16.0.0")))
        {
            return;
        }

        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.MobgiAdsHelper", "clickNativeAds", "(I)V", adsType);
            }
            else if(cc.sys.OS_IOS==cc.sys.os)
            {

            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("clickNativeAds throw: " + JSON.stringify(e));
        }
    }
    ,closeNativeAds:function(adsType)
    {
        if ( (isJinZhongAPPType() && !isCurrentNativeVersionBiggerThan("11.0.0"))
            || (MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ && MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ && !isCurrentNativeVersionBiggerThan("16.0.0")))
        {
            return;
        }

        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.MobgiAdsHelper", "closeNativeAds", "(I)V", adsType);
            }
            else if(cc.sys.OS_IOS==cc.sys.os)
            {

            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("closeNativeAds throw: " + JSON.stringify(e));
        }
    }
    ,showVideoAd:function(adsType)
    {
        if (!this.isAdsApp())
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能使用此功能", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }
        
        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.MobgiAdsHelper", "showVideoAd", "(I)V", adsType);
            }
            else if(cc.sys.OS_IOS==cc.sys.os)
            {

            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("showVideoAd throw: " + JSON.stringify(e));
        }
    }
    ,isAdsApp:function()
    {
        if (cc.sys.OS_ANDROID == cc.sys.os){
            var curNativeVersionName = MjClient.native.GetVersionName();
            var vecVersionName = curNativeVersionName.split(".");
            if (vecVersionName[vecVersionName.length-1] == "3") {
                return true;
            }
        }
        return false;
    }
};