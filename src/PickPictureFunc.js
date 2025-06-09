/**
 * Created by Administrator on 2017/6/21/021.
 */

MjClient.native.pickPictureCallbackEvent = {
    PICK_PICTURE_FINISHED:"PickPictureFinished"
};

MjClient.native.pickPicture =
{
    showCamera:function()
    {
        if (!isCurrentNativeVersionBiggerThan("13.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能使用此功能");
            return;
        }
        try
        {
            if ( cc.sys.OS_ANDROID == cc.sys.os )
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.PickPictureHelper", "showCamera", "()V");
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","showCamera");
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                MjClient.native.HelloOC("MjClient.native.pickPicture.showCamera");
            }
        }
        catch (e)
        {
            MjClient.native.HelloOC("showCamera throw: " + JSON.stringify(e));
        }
    },
    showGallery:function()
    {
        if (!isCurrentNativeVersionBiggerThan("13.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能使用此功能");
            return;
        }
        try
        {
            if ( cc.sys.OS_ANDROID == cc.sys.os )
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.PickPictureHelper", "showGallery", "()V");
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","showGallery");
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                MjClient.native.HelloOC("MjClient.native.pickPicture.showGallery");
            }
        }
        catch (e)
        {
            MjClient.native.HelloOC("showGallery throw: " + JSON.stringify(e));
        }
    },
    showCameraWithoutCrop:function()
    {
        if (!isCurrentNativeVersionBiggerThan("13.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能使用此功能");
            return;
        }
        try
        {
            if ( cc.sys.OS_ANDROID == cc.sys.os )
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.PickPictureHelper", "showCameraWithoutCrop", "()V");
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","showCameraWithoutCrop");
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                MjClient.native.HelloOC("MjClient.native.pickPicture.showCameraWithoutCrop");
            }
        }
        catch (e)
        {
            MjClient.native.HelloOC("showCameraWithoutCrop throw: " + JSON.stringify(e));
        }
    },
    showGalleryWithoutCrop:function()
    {
        if (!isCurrentNativeVersionBiggerThan("13.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能使用此功能");
            return;
        }
        try
        {
            if ( cc.sys.OS_ANDROID == cc.sys.os )
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.PickPictureHelper", "showGalleryWithoutCrop", "()V");
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","showGalleryWithoutCrop");
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                MjClient.native.HelloOC("MjClient.native.pickPicture.showGalleryWithoutCrop");
            }
        }
        catch (e)
        {
            MjClient.native.HelloOC("showGalleryWithoutCrop throw: " + JSON.stringify(e));
        }
    }
};