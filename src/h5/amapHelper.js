/**
 * Created by maoyu on 2018/3/30.
 */

var h5 = h5 || {};


h5.amapHelper = {

    _longitude:0,
    _latitude:0,
    _address:[],

    init:function()
    {
        var that = this;

        //加载地图，调用浏览器定位服务
        var map = new AMap.Map('container', {
            resizeEnable: true
        });
        map.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition:'RB'
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });


        //解析定位结果
        function onComplete(data)
        {
            var str=['定位成功'];
            str.push('经度：' + data.position.getLng());
            str.push('纬度：' + data.position.getLat());
            if(data.accuracy){
                str.push('精度：' + data.accuracy + ' 米');
            }//如为IP精确定位结果则没有精度信息
            str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
            cc.log(str);

            that._longitude = data.position.getLng();
            that._latitude = data.position.getLat();
            regeocoder(data.position);
        }


        //解析定位错误信息
        function onError(data)
        {
            cc.log('定位失败');
        }


        function regeocoder(LngLat)
        {  //逆地理编码
            var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            geocoder.getAddress(LngLat, function(status, result)
            {
                if (status === 'complete' && result.info === 'OK')
                {
                    var address = result.regeocode.formattedAddress; //返回地址描述
                    cc.log(address);
                    var addressComponent = result.regeocode.addressComponent;
                    that._address = [
                        addressComponent.province,
                        addressComponent.city,
                        addressComponent.district,
                        addressComponent.township,
                        addressComponent.street,
                        addressComponent.streetNumber
                    ];
                }
            });
        }

    },


    getLatitude:function()
    {
        return this._latitude;
    },

    getLongitude:function()
    {
        return this._longitude;
    },

    getAddress:function()
    {
        return this._address;
    },

    calculateLineDistance:function(latitude1, longitude1, latitude2, longitude2)
    {
        var distance = AMap.GeometryUtil.distance([longitude1,latitude1], [longitude2,latitude2]);
        return distance;
    }

};

