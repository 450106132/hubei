/**
 * Created by Administrator on 2017/6/21/021.
 */



//比较两个版本字符串，version1>version2返回1，version1==version2返回0，version1<version2返回-1。
function checkVersionString(version1, version2)
{
    cc.log("checkVersionString >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> version1 = "+ version1);
    cc.log("checkVersionString >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> version2 = "+ version2);
    var result = 0;
    if (cc.isUndefined(version1) || cc.isUndefined(version2))
    {
        return result;
    }

    var version1Name = (""+version1).split(".").join("");
    var version2Name = (""+version2).split(".").join("");
    var version1Num = parseInt(version1Name);
    var version2Num = parseInt(version2Name);
    if (version1Num > version2Num)
    {
        result = 1;
    }
    else if (version1Num < version2Num)
    {
        result = -1;
    }

    return result;
}


//检查当前native版本是否大于等于targetVersion
function isCurrentNativeVersionBiggerThan(targetVersion)
{
    var available = true;
    var minNativeVersionName = targetVersion;
    var curNativeVersionName = MjClient.native.GetVersionName();
    if (checkVersionString(curNativeVersionName, minNativeVersionName) >= 0)
    {
        available = true;
    }
    else
    {
        available = false;
    }

    return available;
}


//检查当前res资源版本是否大于等于targetVersion
function isCurrentResVersionBiggerThan(targetVersion)
{
    var available = true;
    var minVersionName = targetVersion;
    var curVersionName = MjClient.resVersion;
    if (checkVersionString(curVersionName, minVersionName) >= 0)
    {
        available = true;
    }
    else
    {
        available = false;
    }

    return available;
}


//检查当前native版本的最后一位是否与num相等
function isCurrentNativeVersionLastEqual(num)
{
    var curNativeVersionName = MjClient.native.GetVersionName();
    if (curNativeVersionName[curNativeVersionName.length-1] != num) {
        return false;
    }
    return true;
}



MjClient.native =
{
    //Android延迟初始化所有sdk
    initAllSdk:function(){
        try {
            if ( cc.sys.OS_ANDROID == cc.sys.os )
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "initAllSdk", "()V");
            }
        }catch (e)
        {
            MjClient.native.HelloOC("initAllSdk throw: " + JSON.stringify(e));
        }
    },
    wxLogin:function()
    {
        try {
            if ( cc.sys.OS_ANDROID == cc.sys.os )
            {
                //Native发送_event:WX_USER_LOGIN  返回信息为json通过json中是否有nickName判断登录是否成功
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSWeChatLogin", "()V");
            }else if (cc.sys.OS_IOS==cc.sys.os)
            {
                //Native发送_event:WX_USER_LOGIN  返回信息为json通过json中是否有nickName判断登录是否成功
                jsb.reflection.callStaticMethod("AppController","sendAuthRequest");
            }
        }catch (e)
        {
            MjClient.native.HelloOC("wxLogin throw: " + JSON.stringify(e));
        }

    }
    ,wxShareUrl:function(url, title, description)
    {
        try{
            if (isCurrentNativeVersionBiggerThan("17.0.0") && !isCurrentNativeVersionLastEqual("5") && !isCurrentNativeVersionLastEqual("6") && WXMultiAppID[MjClient.getAppType()]) {
                var shareAppIDs = WXMultiAppID[MjClient.getAppType()];
                var shareAppID = shareAppIDs[getRandomRange(0, shareAppIDs.length-1)];
                if (cc.sys.OS_ANDROID == cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSWeChatShareWebViewWithAppID", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",url, title,description,shareAppID);
                }else if(cc.sys.OS_IOS==cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("AppController","wxShareUrlWithAppID:AndText:AndUrl:AndAppID:",title,description,url,shareAppID);
                }
            }
            else {
                if (cc.sys.OS_ANDROID == cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSWeChatShareWebView", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",url, title,description);
                }else if(cc.sys.OS_IOS==cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("AppController","wxShareUrl:AndText:AndUrl:",title,description,url);
                }
            }
        }catch(e)
        {
            MjClient.native.HelloOC("wxShareUrl throw: " + JSON.stringify(e));
        }

    }
    ,wxShareUrlToPYQ:function(url, title, description)
    {
        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSWeChatShareWebViewToPYQ", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",url, title,description);
            }else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","wxShareUrlToPYQ:AndText:AndUrl:",title,description,url);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("wxShareUrlToPYQ throw: " + JSON.stringify(e));
        }

    }
    ,wxShareImage:function()
    {
        var writePath = jsb.fileUtils.getWritablePath();
        var textrueName = "wxcapture_screen.png";
        this.wxShareImageToWX(writePath+textrueName);
    }
    ,wxShareCaptureScreenToPYQ:function()
    {
        var writePath = jsb.fileUtils.getWritablePath();
        var textrueName = "wxcapture_screen.png";
        this.wxShareImageToPYQ(writePath+textrueName);
        MjClient.wxShareImageToPYQ = false;
    }
    ,wxShareText:function(title, content)
    {
        try{
            if (isCurrentNativeVersionBiggerThan("17.0.0") && !isCurrentNativeVersionLastEqual("5") && WXMultiAppID[MjClient.getAppType()]) {
                var shareAppIDs = WXMultiAppID[MjClient.getAppType()];
                var shareAppID = shareAppIDs[getRandomRange(0, shareAppIDs.length-1)];
                if(cc.sys.OS_ANDROID == cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSWeChatShareTextWithAppID", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", ""+title, ""+content, shareAppID);
                }
                else if (cc.sys.OS_IOS==cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("AppController","wxShareTextWithAppID:AndContent:AndAppID:",String(title),String(content),shareAppID);
                }
                else
                {
                    cc.log("wxShareTextWithAppID:"+String(title) + String(content) + shareAppID);
                }
            }
            else {
                if(cc.sys.OS_ANDROID == cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSWeChatShareText", "(Ljava/lang/String;Ljava/lang/String;)V", ""+title, ""+content);
                }
                else if (cc.sys.OS_IOS==cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("AppController","wxShareText:AndContent:",String(title),String(content));
                }
                else
                {
                    cc.log("wxShareText:"+String(title) + String(content));
                }
            }
        }catch (e)
        {
            MjClient.native.HelloOC("wxShareText throw: " + JSON.stringify(e));
        }
    }
    ,wxShareImageToWX:function(filePath)
    {
        try {
            if (!jsb.fileUtils.isFileExist(filePath))
            {
                MjClient.showToast(filePath + " is not exist!");
                return;
            }

            if (isCurrentNativeVersionBiggerThan("17.0.0") && !isCurrentNativeVersionLastEqual("5") && WXMultiAppID[MjClient.getAppType()]) {
                var shareAppIDs = WXMultiAppID[MjClient.getAppType()];
                var shareAppID = shareAppIDs[getRandomRange(0, shareAppIDs.length-1)];
                if (cc.sys.OS_ANDROID == cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSWeChatShareTextureWithAppID", "(Ljava/lang/String;Ljava/lang/String;)V",filePath,shareAppID);
                }
                else if (cc.sys.OS_IOS==cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("AppController","wxShareTextureWithAppID:AndAppID:",filePath,shareAppID);
                }
                else if (cc.sys.OS_WINDOWS==cc.sys.os)
                {
                    cc.log("wxShareImageToWXWithAppID:" + filePath + shareAppID);
                }
            }
            else {
                if (cc.sys.OS_ANDROID == cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSWeChatShareTexture", "(Ljava/lang/String;)V",filePath);
                }
                else if (cc.sys.OS_IOS==cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("AppController","wxShareTexture:",filePath);
                }
                else if (cc.sys.OS_WINDOWS==cc.sys.os)
                {
                    cc.log("wxShareImageToWX:" + filePath);
                }
            }
        }catch(e)
        {
            MjClient.native.HelloOC("wxShareImageToWX throw: " + JSON.stringify(e));
        }

    }
    ,wxShareImageToPYQ:function(filePath, content)
    {
        try {
            var textrueName = filePath;
            if (!jsb.fileUtils.isFileExist(textrueName))
            {
                MjClient.showToast(textrueName + " is not exist!");
                return;
            }

            MjClient.wxShareImageToPYQ = true;
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSWeChatShareTextureToPYQ", "(Ljava/lang/String;)V", textrueName);
            }else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","wxShareTextureToPYQ:",textrueName);
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                cc.log("wxShareTextureToPYQ:" + textrueName);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("wxShareImageToPYQ throw: " + JSON.stringify(e));
        }

    }
    ,wxShareMiniProgram:function(url, title, description)
    {
        if (!isCurrentNativeVersionBiggerThan("8.0.0") || !MjClient.systemConfig.miniProgram)
        {
            this.wxShareUrl(url, title, description);
            return;
        }

        var type = parseInt(MjClient.systemConfig.miniProgram.type);
        var userName = MjClient.systemConfig.miniProgram.userName;
        var path = MjClient.systemConfig.miniProgram.path + "?" + url.split('?')[1] + "&env="+AppEnv[MjClient.getAppType()];
        var imagePath = jsb.fileUtils.getWritablePath() + "update/res/png/miniprogram.png";


        try {
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSWeChatShareMiniProgram", "(Ljava/lang/String;ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", url, type, userName, path, title, description, imagePath);
            }else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","wxShareMiniProgram:AndType:AndUserName:AndPath:AndTitle:AndDescription:AndImagePath:", 
					String(url), type, String(userName), String(path), String(title), String(description), String(imagePath));
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                cc.log("wxShareMiniProgram:",url, type, userName, path, title, description, imagePath);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("wxShareMiniProgram throw: " + JSON.stringify(e));
        }
    }
    ,NativeBattery:function()
    {
        try {
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity","NativeBattery","()V");
            }
            else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","NativeBattery");
            }
        }catch (e)
        {
            MjClient.native.HelloOC("NativeBattery throw: " + JSON.stringify(e));
        }
    }
    ,NativeVibrato:function()
    {
        if(util.localStorageEncrypt.getBoolItem("isVibrato", true)){
            try {
                if (cc.sys.OS_ANDROID == cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity","NativeVibrato","(Ljava/lang/String;Ljava/lang/String;)V","100,300,100,300","false");
                }
                else if(cc.sys.OS_IOS==cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("AppController","NativeVibrato");
                }
            }catch (e)
            {
                MjClient.native.HelloOC("NativeVibrato throw: " + JSON.stringify(e));
            }
        }
    },
    StartRecord:function (filePath, fileName)
    {
        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity","JsBeginRecord","(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;",String(filePath), String(fileName));
            }else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","startRecord:lajioc:", String(filePath), String(fileName));
            }
        }catch (e)
        {
            MjClient.native.HelloOC("StartRecord throw: " + JSON.stringify(e));
        }
    },
     EndRecord: function (eventName)
    {
        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity","JsEndRecord","(Ljava/lang/String;)V", String(eventName));
            }else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","endRecord:", String(eventName));
            }else if(cc.sys.OS_WINDOWS == cc.sys.os){
                /** fixed by Lms pc端测试 语音  "sound/****.mp3" 随机一个语音文件   
                 */ 
                postEvent("MJChat",{uid:SelfUid(),msg:"sound/ShopOfJiFen/play_getMusic.mp3",type:3});
                MjClient.showToast("pc端音量不能测试,随机播放语音~");
            }
        }catch (e){
            MjClient.native.HelloOC("EndRecord throw: " + JSON.stringify(e));
        }
    },
    UploadFile: function (fullFileName, url, eventName)
    {
        if (url.length == 0)
        {
            MjClient.native.HelloOC("UploadFile failed. Url is empty.");
            return;
        }

        try {
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity","uploadFile","(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", String(fullFileName), String(url), String(eventName));
            }else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","uploadFile:url:eventName:", String(fullFileName), String(url), String(eventName));
            }
        }catch (e)
        {
            MjClient.native.HelloOC("UploadFile throw: " + JSON.stringify(e));
        }
    },
    DownLoadFile:function (filePath, fileName, url, eventName)
    {
        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity","downLoadFile","(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", String(filePath), String(fileName), String(url), String(eventName));
            }else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","downloadFile:fileName:url:eventName:", String(filePath), String(fileName), String(url), String(eventName));
            }
        }catch (e)
        {
            MjClient.native.HelloOC("DownLoadFile throw: " + JSON.stringify(e));
        }
    },
    HelloOC:function(message)
    {
        try {
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                console.log(String(message));
            }else if(cc.sys.OS_IOS==cc.sys.os)
            {
                console.log(String(message));
                jsb.reflection.callStaticMethod("AppController","HelloOC:", String(message));
            }
        }catch (e)
        {
            console.log("虽然我挂掉了,但是我还是坚持打印了了log: " + String(message));
        }
    },
    doCopyToPasteBoard : function (text) {
        try{
            if (cc.sys.OS_ANDROID == cc.sys.os){
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSdoCopyToPasteBoard", "(Ljava/lang/String;)V", String(text));
            }
            else if (cc.sys.OS_IOS == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController", "doCopyToPasteBoard:", String(text));
            }
        }catch (e) {
            MjClient.native.HelloOC("DownLoadFile throw: " + JSON.stringify(e));
        }
    },
    doGetPasteBoard : function () {
        var str = "";
        try{
            if (cc.sys.OS_ANDROID == cc.sys.os){
                str = String(jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSdoGetPasteBoard", "()Ljava/lang/String;"));
            }
            else if (cc.sys.OS_IOS == cc.sys.os)
            {
                str = String(jsb.reflection.callStaticMethod("AppController", "doGetPasteBoard"));
            }
            else
            {
                //test
                str = "";
            }
        }catch (e) {
            MjClient.native.HelloOC("doGetPasteBoard throw: " + JSON.stringify(e));
        }
        return str;
    },

    // 高德地图
    InitAMap:function()
    {
        if(cc.sys.OS_IOS==cc.sys.os && isCurrentNativeVersionBiggerThan("3.2.1"))
        {
            jsb.reflection.callStaticMethod("AppController","initAMap");
        }
    },

    CalculateLineDistance:function(latitude1, longitude1, latitude2, longitude2)
    {
        if(
            !latitude1 || !longitude1 || !latitude2 || !longitude2 ||
            latitude1.length == 0 || longitude1.length == 0 || latitude2.length == 0 || longitude2.length == 0 ||
            latitude1 == 0 || longitude1 == 0|| latitude2 == 0 || longitude2 == 0
        )
        {
            return  -1;
        }

        var radLat1 = latitude1 * Math.PI / 180;
        var radLat2 = latitude2 * Math.PI / 180;
        var deltaLat = radLat1 - radLat2;
        var deltaLng = (longitude1 - longitude2) * Math.PI / 180;
        var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
        return Math.round(dis * 6378137);

        //try{
        //    if (cc.sys.OS_ANDROID == cc.sys.os)
        //    {
        //        var dis =  jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity","CalculateDistance",
        //            "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;",
        //            String(latitude1), String(longitude1), String(latitude2), String(longitude2));
        //        if(dis == null){
        //            return -1;
        //        }else{
        //            return parseFloat(dis);
        //        }
        //    }
        //    else if(cc.sys.OS_IOS==cc.sys.os)
        //    {
        //        var dis =  jsb.reflection.callStaticMethod("AppController","calculateDistance:lon1:lat2:lon2:",
        //            String(latitude1),String(longitude1),String(latitude2),String(longitude2));
        //        if(dis == null){
        //            return -1;
        //        }else{
        //            return parseFloat(dis);
        //        }
        //    }
        //    else
        //    {
        //        return -1;
        //    }
        //
        //}
        //catch(e)
        //{
        //    MjClient.native.HelloOC("CalculateLineDistance throw: " + JSON.stringify(e));
        //    return -1;
        //}

    },

    //获取玩家纬度
    GetLatitudePos:function()
    {
        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {

                cc.log("==========获取玩家纬度=========================");

                return jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getLatitudePos", "()Ljava/lang/String;");
            }
            else if(cc.sys.OS_IOS==cc.sys.os)
            {
                return String(jsb.reflection.callStaticMethod("AppController","getLatitudePos"));
            }
            else
            {
                return 0;
            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("getLatitudePos throw: " + JSON.stringify(e));
            return 0;
        }
    },

    //获取玩家经度
    GetLongitudePos:function()
    {
        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {

                cc.log("==========获取玩家经度=========================");
                return jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getLongitudePos", "()Ljava/lang/String;");
            }
            else if(cc.sys.OS_IOS==cc.sys.os)
            {
                return jsb.reflection.callStaticMethod("AppController","getLongitudePos");
            }
            else
            {
                return 0;
            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("getLongitudePos throw: " + JSON.stringify(e));
            return 0;
        }
    },
    //获取玩家地址
    GetAddress:function()
    {
        var addressStr = "[\"\",\"\",\"\",\"\",\"\",\"\"]";
        try
        {
            if (cc.sys.OS_ANDROID == cc.sys.os && isCurrentNativeVersionBiggerThan("2.3.1"))
            {
                addressStr = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getAddress", "()Ljava/lang/String;");
            }
            else if(cc.sys.OS_IOS==cc.sys.os && isCurrentNativeVersionBiggerThan("2.3.1"))
            {
                addressStr = jsb.reflection.callStaticMethod("AppController","getAddress");
            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("getAddress throw: " + JSON.stringify(e));
        }

        return addressStr;
    },


    OpenUrl:function(url)
    {
        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "openUrl", "(Ljava/lang/String;)V", String(url));
            }
            else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","openUrl:", String(url));
            }
            else
            {
                cc.log("open url:" + url);
            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("OpenUrl throw: " + JSON.stringify(e));
        }
    },


    GetVersionName:function()
    {
        if (!MjClient.native.appVersion)
        {
            var versionName = "1.0.0";
            try
            {
                if (cc.sys.OS_ANDROID == cc.sys.os)
                {
                    versionName = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getVersionName", "()Ljava/lang/String;");
                }
                else if(cc.sys.OS_IOS==cc.sys.os)
                {
                    versionName = String(jsb.reflection.callStaticMethod("AppController", "getVersion"));
                }
                else
                {
                    //test
                    versionName = "99.0.2";
                }
            }
            catch(e)
            {
                MjClient.native.HelloOC("GetVersionName throw: " + JSON.stringify(e));
            }
            MjClient.native.appVersion = versionName;
        }

        return MjClient.native.appVersion;
    },

    GetPackageName:function()
    {
        if (!MjClient.native.appPackageName)
        {
            var packageName = "com.leyihuyu.qxjsmj";
            try
            {
                if (cc.sys.OS_ANDROID == cc.sys.os && isCurrentNativeVersionBiggerThan("2.4.2"))
                {
                    packageName = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getPackageNameString", "()Ljava/lang/String;");
                }
                else if(cc.sys.OS_IOS==cc.sys.os && isCurrentNativeVersionBiggerThan("2.4.1"))
                {
                    packageName = String(jsb.reflection.callStaticMethod("AppController", "getPackageNameString"));
                }
                else if (cc.sys.OS_WINDOWS==cc.sys.os)
                {
                    packageName = TestConfig.PackageName;
                }
            }
            catch(e)
            {
                MjClient.native.HelloOC("GetPackageName throw: " + JSON.stringify(e));
            }
            MjClient.native.appPackageName = packageName;
        }

        cc.log("=============MjClient.native.appPackageName = " + MjClient.native.appPackageName);

        return MjClient.native.appPackageName;
    },

    initPay:function(platform)
    {
        platform = parseInt(platform);
        var params = {};
        switch (platform)
        {
            case PayPlatformType.IAPPPAY:
                params.appid = "3022398763";
                break;
        }
        var jsonString = JSON.stringify(params);

        try
        {
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "initPay", "(ILjava/lang/String;)V", platform, jsonString);
            }
            else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController", "initPay:jsonString:", platform, jsonString);
            }
            else
            {
                cc.log("initPay("+platform+","+jsonString+")");
            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("initPay throw: " + JSON.stringify(e));
        }
    },

    weixinWebPay: function(url) {
        cc.log("weixinWebPay url=", url);
        if (cc.sys.OS_ANDROID == cc.sys.os && isCurrentNativeVersionBiggerThan("28.1.0"))
            MjClient.Scene.addChild(new NormalWebviewLayer(url));
        else
            MjClient.native.OpenUrl(url);
    },

    pay:function(platform, params)
    {
        platform = parseInt(platform);
        var jsonString = params;

        switch (platform)
        {
            case PayPlatformType.IAPPPAY:
                if (!isCurrentNativeVersionBiggerThan("26.0.0"))
                {
                    MjClient.showMsg("请下载最新版本游戏客户端才能使用此支付方式", function () {
                        MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
                    }, function () {});
                    return;
                }
                break;
            case PayPlatformType.APPLE:
            case PayPlatformType.WEIXIN:
                jsonString = JSON.stringify(params);
                break;
            case PayPlatformType.ALIPAY:
                if (isCurrentNativeVersionLastEqual("6")) {
                    MjClient.showMsg("请下载最新企业版游戏客户端才能使用支付宝", function() {
                        MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
                    }, function() {});
                    return;
                }

                if (cc.sys.OS_ANDROID == cc.sys.os && !isCurrentNativeVersionBiggerThan("6.0.0"))
                {
                    MjClient.showMsg("请下载最新版本游戏客户端才能使用支付宝", function () {
                        MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
                    }, function () {});
                    return;
                }
                else if (cc.sys.OS_IOS == cc.sys.os && !isCurrentNativeVersionBiggerThan("28.0.0"))
                {
                    MjClient.showMsg("请下载最新版本游戏客户端才能使用支付宝", function () {
                        MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
                    }, function () {});
                    return;
                }
                break;
        }
        try
        {
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "pay", "(ILjava/lang/String;)V", platform, jsonString);
            }
            else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController", "pay:jsonString:", platform, jsonString);
            }
            else
            {
                //test
                cc.log("pay("+platform+","+jsonString+")");
                var json = {
                    result:0,
                    platform:5,
                    msg:"成功"
                };
                cc.eventManager.dispatchCustomEvent("appPayFinished", JSON.stringify(json));
            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("pay throw: " + JSON.stringify(e));
        }
    },


    setAliasAndTags4Jpush:function(alias, tags)
    {
        var jsonParam = {
            alias:alias.toString(),
            tags:tags
        };
        var jsonString = JSON.stringify(jsonParam);
        try{
            if (cc.sys.OS_ANDROID == cc.sys.os && isCurrentNativeVersionBiggerThan("2.2.1"))
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "setAliasAndTags4Jpush", "(Ljava/lang/String;)V", jsonString);
            }
            else if(cc.sys.OS_IOS==cc.sys.os && isCurrentNativeVersionBiggerThan("2.2.1"))
            {
                jsb.reflection.callStaticMethod("AppController","setAliasAndTags4Jpush:", jsonString);
            }
            else
            {
                cc.log("setAliasAndTags4Jpush:" + jsonString);
            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("setAliasAndTags4Jpush throw: " + JSON.stringify(e));
        }
    },


    openWeixin:function(content)
    {
        if (!content)
        {
            content = "";
        }
        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "openWeixin", "(Ljava/lang/String;)V", String(content));
            }
            else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","openWeixin:", String(content));
            }
            else
            {
                cc.log("openWeixin:" + content);
            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("openWeixin throw: " + JSON.stringify(e));
        }
    },
    openXianliao:function()
    {
        if (cc.sys.OS_ANDROID == cc.sys.os)
        {
            MjClient.native.openApp("org.xianliao", "org.sugram.base.LaunchActivity");
        }
        else if(cc.sys.OS_IOS==cc.sys.os)
        {
            MjClient.native.openApp("xianliao://");
        }
        else
        {
            cc.log("openXianliao");
        }
    },
    openAlipay:function()
    {
        if (cc.sys.OS_ANDROID == cc.sys.os)
        {
            MjClient.native.openApp("com.eg.android.AlipayGphone", "com.eg.android.AlipayGphone.AlipayLogin");
        }
        else if(cc.sys.OS_IOS==cc.sys.os)
        {
            MjClient.native.OpenUrl("alipay://");
        }
        else
        {
            cc.log("openAlipay");
        }
    },
    openDingtalk:function()
    {
        if (cc.sys.OS_ANDROID == cc.sys.os)
        {
            MjClient.native.openApp("com.alibaba.android.rimet", "com.alibaba.android.rimet.biz.SplashActivity");
        }
        else if(cc.sys.OS_IOS==cc.sys.os)
        {
            MjClient.native.openApp("dingtalk://");
        }
        else
        {
            cc.log("openDingtalk");
        }
    },
    openQQ:function()
    {
        if (cc.sys.OS_ANDROID == cc.sys.os)
        {
            MjClient.native.openApp("com.tencent.mobileqq", "com.tencent.mobileqq.activity.SplashActivity");
        }
        else if(cc.sys.OS_IOS==cc.sys.os)
        {
            MjClient.native.openApp("mqq://");
        }
        else
        {
            cc.log("openQQ");
        }
    },
    openChuiniu:function()
    {
        if (cc.sys.OS_ANDROID == cc.sys.os)
        {
            MjClient.native.openApp("com.aides.brother.brotheraides", "com.aides.brother.brotheraides.activity.SplashActivity");
        }
        else if(cc.sys.OS_IOS==cc.sys.os)
        {
            MjClient.native.openApp("cnchat://");
        }
        else
        {
            cc.log("openChuiniu");
        }
    },
    openXiangLiao:function()
    {
        if (cc.sys.OS_ANDROID == cc.sys.os)
        {
            MjClient.native.openApp("com.ixl.talk.xlmm", "com.ixl.talk.xlmm.ui.activity.auth.LogoActivity");
        }
        else if(cc.sys.OS_IOS==cc.sys.os)
        {
            MjClient.native.openApp("IMSocketClient://");
        }
        else
        {
            cc.log("openXiangliao");
        }
    },
    openMoWang: function()
    {
        if (cc.sys.OS_ANDROID == cc.sys.os)
        {
            MjClient.native.openApp("com.mostone.life", "com.mostone.life.ui.SplashActivity");
        }
        else if(cc.sys.OS_IOS==cc.sys.os)
        {
            MjClient.native.openApp("mostOne://");
        }
        else
        {
            cc.log("openMoWang");
        }   
    },
    openDuoLiao: function()
    {
        if (cc.sys.OS_ANDROID == cc.sys.os)
        {
            MjClient.native.openApp("com.qidalin.duoliao.app", "com.qidalin.duoliao.app.mvp.ui.activity.WelcomeActivity");
        }
        else if(cc.sys.OS_IOS==cc.sys.os)
        {
            MjClient.native.openApp("duoliao://");
        }
        else
        {
            cc.log("openDuoLiao");
        }   
    },

    setInfo4Bugly:function(uid, resVersion)
    {
        try
        {
            if (cc.sys.OS_ANDROID == cc.sys.os && isCurrentNativeVersionBiggerThan("4.0.2"))
            {
                buglySetUserId(""+uid);
                buglyAddUserValue("resVersion", ""+resVersion);
            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("setUserId4Bugly throw: " + JSON.stringify(e));
        }
    },


    xlLogin:function(sourceName)
    {
        if (!isCurrentNativeVersionBiggerThan("18.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能使用闲聊授权", function() {
                if (sourceName == "userInfo") {
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingxiaoliao_Sure", {uid:SelfUid()});
                }
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try {
            if ( cc.sys.OS_ANDROID == cc.sys.os )
            {
                //Native发送_event:XL_USER_LOGIN  返回信息为json
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSXianLiaoLogin", "()V");
            }else if (cc.sys.OS_IOS==cc.sys.os)
            {
                //Native发送_event:XL_USER_LOGIN  返回信息为json
                jsb.reflection.callStaticMethod("AppController","xlSendAuthRequest");
            }
        }catch (e)
        {
            MjClient.native.HelloOC("xlLogin throw: " + JSON.stringify(e));
        }

    },
    xlShareImageToXL:function(filePath)
    {
        if (!isCurrentNativeVersionBiggerThan("5.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到闲聊", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try {
            if (!jsb.fileUtils.isFileExist(filePath))
            {
                MjClient.showToast(filePath + " is not exist!");
                return;
            }

            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSXianLiaoShareTexture", "(Ljava/lang/String;)V",filePath);
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","xlShareTexture:",filePath);
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                cc.log("xlShareImageToXL:" + filePath);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("xlShareImageToXL throw: " + JSON.stringify(e));
        }
    },
    xlShareText:function(title, content)
    {
        if (!isCurrentNativeVersionBiggerThan("5.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到闲聊", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try{
            if(cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSXianLiaoShareText", "(Ljava/lang/String;Ljava/lang/String;)V", ""+title, ""+content);
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","xlShareText:AndContent:",String(title),String(content));
            }
            else
            {
                cc.log("xlShareText:"+String(title) + String(content));
            }
        }catch (e)
        {
            MjClient.native.HelloOC("xlShareText throw: " + JSON.stringify(e));
        }
    },
    xlShareMiniProgram:function(roomID, title, description)
    {
        if (!isCurrentNativeVersionBiggerThan("18.0.0"))
        {
            this.xlShareText(title, description);
            return;
        }

        var imagePath = jsb.fileUtils.getWritablePath() + "update/res/png/miniprogram_xl.png";
        try {
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSXianLiaoShareMiniProgram", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", roomID, title, description, imagePath);
            }else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","xlShareMiniProgram:AndTitle:AndDescription:AndImagePath:",roomID, title, description, imagePath);
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                cc.log("xlShareMiniProgram:",roomID, title, description, imagePath);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("xlShareMiniProgram throw: " + JSON.stringify(e));
        }
    },

    dlLogin: function(sourceName) {
        if (!isCurrentNativeVersionBiggerThan("29.0.0")) {
            MjClient.showMsg("请下载最新版本游戏客户端才能使用多聊授权", function() {
                if (sourceName == "userInfo") {
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingduoliao_Sure", {
                        uid: SelfUid()
                    });
                }
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function() {});
            return;
        }

        try {
            if (cc.sys.OS_ANDROID == cc.sys.os) {
                //Native发送_event:DL_USER_LOGIN  返回信息为json
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSDuoLiaoLogin", "()V");
            } else if (cc.sys.OS_IOS == cc.sys.os) {
                //Native发送_event:DL_USER_LOGIN  返回信息为json
                jsb.reflection.callStaticMethod("AppController", "dlSendAuthRequest");
            }
        } catch (e) {
            MjClient.native.HelloOC("dlLogin throw: " + JSON.stringify(e));
        }

    },
    dlShareImageToDL: function(filePath) {
        if (!isCurrentNativeVersionBiggerThan("29.0.0")) {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到多聊", function() {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function() {});
            return;
        }

        try {
            if (!jsb.fileUtils.isFileExist(filePath)) {
                MjClient.showToast(filePath + " is not exist!");
                return;
            }

            if (cc.sys.OS_ANDROID == cc.sys.os) {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSDuoLiaoShareTexture", "(Ljava/lang/String;)V", filePath);
            } else if (cc.sys.OS_IOS == cc.sys.os) {
                jsb.reflection.callStaticMethod("AppController", "dlShareTexture:", filePath);
            } else if (cc.sys.OS_WINDOWS == cc.sys.os) {
                cc.log("dlShareImageToDL:" + filePath);
            }
        } catch (e) {
            MjClient.native.HelloOC("dlShareImageToDL throw: " + JSON.stringify(e));
        }
    },
    dlShareText: function(title, content) {
        if (!isCurrentNativeVersionBiggerThan("29.0.0")) {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到多聊", function() {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function() {});
            return;
        }

        try {
            if (cc.sys.OS_ANDROID == cc.sys.os) {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSDuoLiaoShareText", "(Ljava/lang/String;Ljava/lang/String;)V", "" + title, "" + content);
            } else if (cc.sys.OS_IOS == cc.sys.os) {
                jsb.reflection.callStaticMethod("AppController", "dlShareText:AndContent:", String(title), String(content), "");
            } else {
                cc.log("dlShareText:" + String(title) + String(content));
            }
        } catch (e) {
            MjClient.native.HelloOC("xlShareText throw: " + JSON.stringify(e));
        }
    },
    dlShareUrl: function(url, title, content) {
        if (!isCurrentNativeVersionBiggerThan("29.0.0")) {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到多聊", function() {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function() {});
            return;
        }

        try {
            if (cc.sys.OS_ANDROID == cc.sys.os) {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSDuoLiaoShareUrl", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", "" + title, "" + content, "" + url);
            } else if (cc.sys.OS_IOS == cc.sys.os) {
                jsb.reflection.callStaticMethod("AppController", "dlShareURL:AndContent:AndUrl:", String(title), String(content), String(url));
            } else {
                cc.log("dlShareUrl:" + String(title) + String(content));
            }
        } catch (e) {
            MjClient.native.HelloOC("dlShareUrl throw: " + JSON.stringify(e));
        }
    },
    zfbShareImageToZFB:function(filePath)
    {
        if (!isCurrentNativeVersionBiggerThan("6.5.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到支付宝", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try {
            if (!jsb.fileUtils.isFileExist(filePath))
            {
                MjClient.showToast(filePath + " is not exist!");
                return;
            }

            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSZFBShareTexture", "(Ljava/lang/String;)V",filePath);
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","zfbShareTexture:",filePath);
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                cc.log("zfbShareImageToZFB:" + filePath);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("zfbShareImageToZFB throw: " + JSON.stringify(e));
        }
    },
    zfbShareText:function(content)
    {
        if (!isCurrentNativeVersionBiggerThan("6.5.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到支付宝", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try{
            if(cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSZFBShareText", "(Ljava/lang/String;)V", ""+content);
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","zfbShareText:",String(content));
            }
            else
            {
                cc.log("zfbShareText:"+String(content));
            }
        }catch (e)
        {
            MjClient.native.HelloOC("zfbShareText throw: " + JSON.stringify(e));
        }
    },
    zfbShareUrl:function(url, title, description)
    {
        if (!isCurrentNativeVersionBiggerThan("6.5.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到支付宝", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSZFBShareUrl", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",url, title,description);
            }else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","zfbShareUrl:AndText:AndUrl:",title,description,url);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("zfbShareUrl throw: " + JSON.stringify(e));
        }
    },
    openApp:function(url, content)
    {
        if (!isCurrentNativeVersionBiggerThan("6.5.0"))
        {
            return;
        }

        if (!content)
        {
            content = "";
        }
        if (!url)
        {
            url = "";
        }
        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "openApp", "(Ljava/lang/String;Ljava/lang/String;)V", String(url), String(content));
            }
            else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","openApp:AndContent:", String(url), String(content));
            }
            else
            {
                cc.log("openApp:"+url + content);
            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("openApp throw: " + JSON.stringify(e));
        }
    },



    dtShareImageToDingTalk:function(filePath)
    {
        if (!isCurrentNativeVersionBiggerThan("7.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到钉钉", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try {
            if (!jsb.fileUtils.isFileExist(filePath))
            {
                MjClient.showToast(filePath + " is not exist!");
                return;
            }

            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSDTShareTexture", "(Ljava/lang/String;)V",filePath);
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","dtShareTexture:",filePath);
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                cc.log("dtShareImageToDingTalk:" + filePath);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("dtShareImageToDingTalk throw: " + JSON.stringify(e));
        }
    },
    dtShareText:function(content)
    {
        if (!isCurrentNativeVersionBiggerThan("7.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到钉钉", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try{
            if(cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSDTShareText", "(Ljava/lang/String;)V", ""+content);
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","dtShareText:",String(content));
            }
            else
            {
                cc.log("dtShareText:"+String(content));
            }
        }catch (e)
        {
            MjClient.native.HelloOC("dtShareText throw: " + JSON.stringify(e));
        }
    },
    dtShareUrl:function(url, title, description)
    {
        if (!isCurrentNativeVersionBiggerThan("7.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到钉钉", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSDTShareUrl", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",url, title,description);
            }else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","dtShareUrl:AndText:AndUrl:",title,description,url);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("dtShareUrl throw: " + JSON.stringify(e));
        }
    },


    qqShareImageToQQ:function(filePath)
    {
        if (!isCurrentNativeVersionBiggerThan("15.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到QQ", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try {
            if (!jsb.fileUtils.isFileExist(filePath))
            {
                MjClient.showToast(filePath + " is not exist!");
                return;
            }

            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSQQShareTexture", "(Ljava/lang/String;)V",filePath);
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","qqShareTexture:",filePath);
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                cc.log("qqShareImageToQQ:" + filePath);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("qqShareImageToQQ throw: " + JSON.stringify(e));
        }
    },
    qqShareUrl:function(url, title, description)
    {
        if (!isCurrentNativeVersionBiggerThan("15.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到QQ", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSQQShareUrl", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",url, title,description);
            }else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","qqShareUrl:AndText:AndUrl:",title,description,url);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("qqShareUrl throw: " + JSON.stringify(e));
        }
    },

    chuiniuLogin:function(sourceName)
    {
        if (!isCurrentNativeVersionBiggerThan("24.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能使用吹牛授权", function() {
                if (sourceName == "userInfo") {
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingchuiniu_Sure", {uid:SelfUid()});
                }
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try {
            if ( cc.sys.OS_ANDROID == cc.sys.os )
            {
                //Native发送_event:CN_USER_LOGIN  返回信息为json
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSChuiniuLogin", "()V");
            }else if (cc.sys.OS_IOS==cc.sys.os)
            {
                //Native发送_event:CN_USER_LOGIN  返回信息为json
                jsb.reflection.callStaticMethod("AppController","chuiniuSendAuthRequest");
            }
        }catch (e)
        {
            MjClient.native.HelloOC("chuiniuLogin throw: " + JSON.stringify(e));
        }

    },
    chuiniuShareImage:function(filePath)
    {
        if (!isCurrentNativeVersionBiggerThan("22.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到吹牛", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try {
            if (!jsb.fileUtils.isFileExist(filePath))
            {
                MjClient.showToast(filePath + " is not exist!");
                return;
            }

            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSChuiniuShareTexture", "(Ljava/lang/String;)V",filePath);
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","chuiniuShareTexture:",filePath);
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                cc.log("chuiniuShareImage:" + filePath);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("qqShareImageToQQ throw: " + JSON.stringify(e));
        }
    },
    chuiniuShareUrl:function(url, title, description)
    {
        if (!isCurrentNativeVersionBiggerThan("22.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到吹牛", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSChuiniuShareUrl", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",url, title,description);
            }else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","chuiniuShareUrl:AndText:AndUrl:",title,description,url);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("chuiniuShareUrl throw: " + JSON.stringify(e));
        }
    },
    chuiniuShareMiniProgram:function(roomID, title, description, url)
    {
        if (!isCurrentNativeVersionBiggerThan("22.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到吹牛", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try {
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSChuiniuShareMiniProgram", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", roomID, title, description, url);
            }else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","chuiniuShareMiniProgram:AndTitle:AndDescription:AndUrl:",roomID, title, description, url);
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                cc.log("chuiniuShareMiniProgram:",roomID, title, description, url);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("chuiniuShareMiniProgram throw: " + JSON.stringify(e));
        }
    },

    xiangliaoLogin:function(sourceName)
    {
        if (!isCurrentNativeVersionBiggerThan("23.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能使用乡聊授权", function() {
                if (sourceName == "userInfo") {
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingxiangliao_Sure", {uid:SelfUid()});
                }
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try {
            if ( cc.sys.OS_ANDROID == cc.sys.os )
            {
                //Native发送_event:XIANGL_USER_LOGIN  返回信息为json
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSXiangLiaoLogin", "()V");
            }else if (cc.sys.OS_IOS==cc.sys.os)
            {
                //Native发送_event:XIANGL_USER_LOGIN  返回信息为json
                jsb.reflection.callStaticMethod("AppController","xiangliaoSendAuthRequest");
            }
        }catch (e)
        {
            MjClient.native.HelloOC("xiangliaoLogin throw: " + JSON.stringify(e));
        }

    },
    xiangliaoShareImage:function(filePath)
    {
        if (!isCurrentNativeVersionBiggerThan("23.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到乡聊", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try {
            if (!jsb.fileUtils.isFileExist(filePath))
            {
                MjClient.showToast(filePath + " is not exist!");
                return;
            }

            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSXiangLiaoShareImage", "(Ljava/lang/String;)V",filePath);
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","xiangliaoShareImage:",filePath);
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                cc.log("xiangliaoShareImage:" + filePath);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("xiangliaoShareImage throw: " + JSON.stringify(e));
        }
    },
    xiangliaoShareText:function(content)
    {
        if (!isCurrentNativeVersionBiggerThan("23.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到乡聊", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try{
            if(cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSXiangLiaoShareText", "(Ljava/lang/String;)V", ""+content);
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","xiangliaoShareText:",String(content));
            }
            else
            {
                cc.log("xiangliaoShareText:"+String(content));
            }
        }catch (e)
        {
            MjClient.native.HelloOC("xiangliaoShareText throw: " + JSON.stringify(e));
        }
    },
    xiangliaoShareUrl:function(url, title, content)
    {
        if (!isCurrentNativeVersionBiggerThan("23.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到乡聊", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        if (url.indexOf("?") == -1) // add by cyc 乡聊会在url后加"&openApp=0",导致url错误
            url += "?a=1";

        try{
            if(cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSXiangLiaoShareUrl", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", ""+url, ""+title, ""+content);
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","xiangliaoShareUrl:AndTitle:AndContent:",String(url),String(title),String(content));
            }
            else
            {
                cc.log("xiangliaoShareUrl:"+url+title+content);
            }
        }catch (e)
        {
            MjClient.native.HelloOC("xiangliaoShareUrl throw: " + JSON.stringify(e));
        }
    },

    moWangShareImage:function(filePath)
    {
        if (!isCurrentNativeVersionBiggerThan("29.1.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到默往", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try {
            if (!jsb.fileUtils.isFileExist(filePath))
            {
                MjClient.showToast(filePath + " is not exist!");
                return;
            }

            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSMoWangShareImage", "(Ljava/lang/String;)V",filePath);
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","moWangShareImage:",filePath);
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                cc.log("moWangShareImage:" + filePath);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("moWangShareImage throw: " + JSON.stringify(e));
        }
    },
    moWangShareUrl:function(url, title, content)
    {
        if (!isCurrentNativeVersionBiggerThan("29.1.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到默往", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try{
            if(cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSMoWangShareUrl", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", ""+url, ""+title, ""+content);
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","moWangShareUrl:AndTitle:AndContent:",String(url),String(title),String(content));
            }
            else
            {
                cc.log("moWangShareUrl:"+url+title+content);
            }
        }catch (e)
        {
            MjClient.native.HelloOC("moWangShareUrl throw: " + JSON.stringify(e));
        }
    },
    moWangShareMiniProgram:function(roomID, title, description, url)
    {
        if (!isCurrentNativeVersionBiggerThan("29.1.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能分享到默往", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try {
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSMoWangShareMiniProgram", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", roomID, title, description, url);
            }else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","moWangShareMiniProgram:AndTitle:AndDescription:AndUrl:",roomID, title, description, url);
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                cc.log("moWangShareMiniProgram:",roomID, title, description, url);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("moWangShareMiniProgram throw: " + JSON.stringify(e));
        }
    },

    moWangLogin: function() {
        if (!isCurrentNativeVersionBiggerThan("29.1.0")) {
            MjClient.showMsg("请下载最新版本游戏客户端才能使用默往授权", function() {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function() {});
            return;
        }

        try {
            if (cc.sys.OS_ANDROID == cc.sys.os) {
                //Native发送_event:MOWANG_USER_LOGIN  返回信息为json
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "JSMoWangLogin", "()V");
            } else if (cc.sys.OS_IOS == cc.sys.os) {
                //Native发送_event:MOWANG_USER_LOGIN  返回信息为json
                jsb.reflection.callStaticMethod("AppController", "moWangSendAuthRequest");
            }
        } catch (e) {
            MjClient.native.HelloOC("moWangLogin throw: " + JSON.stringify(e));
        }
    },

    umengGetUMID:function()
    {
        if (!isCurrentNativeVersionBiggerThan("10.0.0"))
        {
            return "";
        }

        if (!MjClient.native.UMID)
        {
            var umid = "";
            try
            {
                if (cc.sys.OS_ANDROID == cc.sys.os)
                {
                    umid = String(jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "umengGetUMID", "()Ljava/lang/String;"));
                }
                else if (cc.sys.OS_IOS == cc.sys.os)
                {
                    umid = String(jsb.reflection.callStaticMethod("AppController", "umengGetUMID"));
                }
            }
            catch(e)
            {
                MjClient.native.HelloOC("umengGetUMID throw: " + JSON.stringify(e));
            }
            MjClient.native.UMID = umid;
        }
        return MjClient.native.UMID;
    },
    umengEvent4Count:function(eventID, info)
    {
        if (!isCurrentNativeVersionBiggerThan("10.0.0"))
        {
            return;
        }

        if (!eventID || eventID.length==0)
        {
            return;
        }

        if (!info)
        {
            info = "";
        }

        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "umengEvent4Count", "(Ljava/lang/String;Ljava/lang/String;)V",eventID, info);
            }
            else if (cc.sys.OS_IOS == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController", "umengEvent4Count:AndInfo:", eventID, info);
            }
            else if(cc.sys.OS_WINDOWS==cc.sys.os)
            {
                cc.log("umengEvent4Count:"+eventID+"/"+info);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("umengEvent4Count throw: " + JSON.stringify(e));
        }
    },
    umengEvent4CountWithProperty:function(eventID, params)
    {
        if (!isCurrentNativeVersionBiggerThan("10.0.0"))
        {
            return;
        }

        if (!eventID || eventID.length==0 || !params || Object.keys(params).length==0)
        {
            return;
        }

        for (var key in params)
        {
            params[key] = String(params[key]);
        }
        var jsonString = JSON.stringify(params);

        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "umengEvent4CountWithProperty", "(Ljava/lang/String;Ljava/lang/String;)V",eventID, jsonString);
            }
            else if (cc.sys.OS_IOS == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController", "umengEvent4CountWithProperty:AndJsonString:", eventID, jsonString);
            }
            else if(cc.sys.OS_WINDOWS==cc.sys.os)
            {
                cc.log("umengEvent4CountWithProperty:"+eventID+"/"+jsonString);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("umengEvent4CountWithProperty throw: " + JSON.stringify(e));
        }
    },
    umengEvent4ValueWithProperty:function(eventID, params, value)
    {
        if (!isCurrentNativeVersionBiggerThan("10.0.0"))
        {
            return;
        }

        if (!eventID || eventID.length==0 || !params || Object.keys(params).length==0 || cc.isUndefined(value))
        {
            return;
        }
        var valueInt = parseInt(value);
        for (var key in params)
        {
            params[key] = String(params[key]);
        }
        var jsonString = JSON.stringify(params);


        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "umengEvent4ValueWithProperty", "(Ljava/lang/String;Ljava/lang/String;I)V",eventID, jsonString, valueInt);
            }
            else if (cc.sys.OS_IOS == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController", "umengEvent4ValueWithProperty:AndJsonString:AndValue:", eventID, jsonString, valueInt);
            }
            else if(cc.sys.OS_WINDOWS==cc.sys.os)
            {
                cc.log("umengEvent4ValueWithProperty:"+eventID+"/"+jsonString+"/"+valueInt);
            }
        }catch(e)
        {
            MjClient.native.HelloOC("umengEvent4ValueWithProperty throw: " + JSON.stringify(e));
        }
    },
    openSystemSetting:function()
    {
        if (!isCurrentNativeVersionBiggerThan("11.0.0"))
        {
            return;
        }

        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "openSystemSetting", "()V");
            }
            else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","openSystemSetting");
            }
            else
            {
                cc.log("openSystemSetting");
            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("openSystemSetting throw: " + JSON.stringify(e));
        }
    },
    openSelfAppSetting:function()
    {
        if (!isCurrentNativeVersionBiggerThan("11.0.0"))
        {
            return;
        }

        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "openSelfAppSetting", "()V");
            }
            else
            {
                cc.log("openSelfAppSetting");
            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("openSelfAppSetting throw: " + JSON.stringify(e));
        }
    },
    isAppInstalled:function(appInfo)
    {
        if (!isCurrentNativeVersionBiggerThan("11.0.0"))
        {
            return false;
        }

        var str = "no";
        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                str = String(jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "isAppInstalled", "(Ljava/lang/String;)Ljava/lang/String;", appInfo));
            }
            else if(cc.sys.OS_IOS==cc.sys.os)
            {
                //str = String(jsb.reflection.callStaticMethod("AppController","isAppInstalled:", appInfo));
            }
            else
            {
                cc.log("isAppInstalled:"+appInfo);
            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("openSystemSetting throw: " + JSON.stringify(e));
            return false;
        }
        return str === "yes";
    },
    installApp:function(apkPath)
    {
        if (!isCurrentNativeVersionBiggerThan("13.0.0"))
        {
            return false;
        }

        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "installApp", "(Ljava/lang/String;)V", apkPath);
            }
            else
            {
                cc.log("installApp:"+apkPath);
            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("installApp throw: " + JSON.stringify(e));
        }
    },
    getDeviceModel:function()
    {
        if (!isCurrentNativeVersionBiggerThan("21.0.0"))
        {
            return "";
        }
        if (!MjClient.native.DeviceModel)
        {
            var deviceModel = "";
            try
            {
                if (cc.sys.OS_ANDROID == cc.sys.os)
                {
                    deviceModel = String(jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getDeviceModel", "()Ljava/lang/String;"));
                }
                else if (cc.sys.OS_IOS == cc.sys.os)
                {
                    deviceModel = String(jsb.reflection.callStaticMethod("AppController", "getDeviceModel"));
                }
            }
            catch(e)
            {
                MjClient.native.HelloOC("getDeviceModel throw: " + JSON.stringify(e));
            }
            MjClient.native.DeviceModel = deviceModel;
        }
        return MjClient.native.DeviceModel;
    },
    showQiYuChatDialog:function()
    {
        if (!isCurrentNativeVersionBiggerThan("14.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端才能使用此功能", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
        }
        else if (!isCurrentNativeVersionBiggerThan("19.0.0"))
        {
            try{
                if (cc.sys.OS_ANDROID == cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("org.cocos2dx.javascript.QiYuHelper", "showChatDialog", "()V");
                }
                else if(cc.sys.OS_IOS==cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("AppController","showChatDialog");
                }
                else
                {
                    cc.log("showQiYuChatDialog");
                }
            }
            catch(e)
            {
                MjClient.native.HelloOC("showQiYuChatDialog throw: " + JSON.stringify(e));
            }
        }
        else {
            var userID = "";
            var data = [];
            if (MjClient.data && MjClient.data.pinfo) {
                userID = ""+MjClient.data.pinfo.uid;
                var indexes = ["appid", "myMemberId", "memberId", "money", "gold", "os"];
                for (var pkey in MjClient.data.pinfo) {
                    var index = indexes.indexOf(pkey);
                    index = index<0 ? index+indexes.length+1 : index;
                    var item = {
                        key:pkey,
                        label:pkey,
                        index:index,
                        value:MjClient.data.pinfo[pkey]
                    };
                    data.push(item);
                }
                data.push({key:"real_name", value:userID});
                data.push({key:"avatar", value:MjClient.data.pinfo.headimgurl});
                data.push({key:"mobile_phone", hidden:true});
                data.push({key:"email", hidden:true});
            }
            var dataStr = JSON.stringify(data);

            try{
                if (cc.sys.OS_ANDROID == cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("org.cocos2dx.javascript.QiYuHelper", "showChatDialogWithUserInfo", "(Ljava/lang/String;Ljava/lang/String;)V", userID, dataStr);
                }
                else if(cc.sys.OS_IOS==cc.sys.os)
                {
                    jsb.reflection.callStaticMethod("AppController","showChatDialogWithUserInfo:AndData:", userID, dataStr);
                }
                else
                {
                    cc.log("showChatDialogWithUserInfo:", userID, dataStr);
                }
            }
            catch(e)
            {
                MjClient.native.HelloOC("showChatDialogWithUserInfo throw: " + JSON.stringify(e));
            }
        }

    },
    setOrientation:function(isLandscape)
    {
        if (!isCurrentNativeVersionBiggerThan("20.0.0"))
        {
            MjClient.showMsg("请下载最新版本游戏客户端来支持竖屏", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return false;
        }

        var methodName = "setOrientationLandscape";
        if (!isLandscape) {
            methodName = "setOrientationPortrait";
        }

        try{
            if (cc.sys.OS_ANDROID == cc.sys.os)
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", methodName, "()V");
            }
            else if(cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController", methodName);
            }
            else
            {
                cc.log("setOrientation:"+methodName);
            }
        }
        catch(e)
        {
            MjClient.native.HelloOC("setOrientation throw: " + JSON.stringify(e));
        }
        return true;
    },
    getNativeConfig:function()
    {
        if (!MjClient.native.NativeConfig)
        {
            if (!isCurrentNativeVersionBiggerThan("25.0.0"))
            {
                return {};
            }
            var nativeConfig = "";
            try
            {
                if (cc.sys.OS_ANDROID == cc.sys.os)
                {
                    nativeConfig = String(jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getConfig", "()Ljava/lang/String;"));
                }
                else if (cc.sys.OS_IOS == cc.sys.os)
                {
                    nativeConfig = String(jsb.reflection.callStaticMethod("AppController", "getConfig"));
                }
            }
            catch(e)
            {
                MjClient.native.HelloOC("getNativeConfig throw: " + JSON.stringify(e));
            }
            if (nativeConfig.length>0){
                MjClient.native.NativeConfig = JSON.parse(nativeConfig);
            }
            else {
                return {};
            }
        }
        return MjClient.native.NativeConfig;
    },
    setEnv:function(env)
    {
        if (!isCurrentNativeVersionLastEqual("6")) {
            return;
        }
        try {
            if (cc.sys.OS_IOS == cc.sys.os) {
                jsb.reflection.callStaticMethod("AppController", "setEnv:", String(env));
            }
        }
        catch(e) {
            MjClient.native.HelloOC("setEnv throw: " + JSON.stringify(e));
        }
    }
};