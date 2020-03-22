//获取地理位置信息
mui.plusReady(function() {
	if(plus.os.name=="Android"){   
	    var context = plus.android.importClass("android.content.Context"); 
	    var locationManager=plus.android.importClass("android.location.LocationManager"); 
	    var main=plus.android.runtimeMainActivity(); 
	    var mainSvr=main.getSystemService(context.LOCATION_SERVICE); 
	    androidIsOpen=mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER); 
	    if(androidIsOpen){ 
	       plus.geolocation.getCurrentPosition(successCB, errorCB, {
			   maximumAge:5000,
			   geocode:true
		   });
	       //成功回调
	       function successCB(data) {
	       	document.getElementById('address').innerHTML = data.address.city;
			var map = new AMap.Map('map', {
				resizeEnable: true,
				zoom: 10, //缩放比例
				center: [data.coords.longitude, data.coords.latitude],
				viewMode: '2D',  //设置地图模式
				lang:'zh_cn',  //设置地图语言类型
				
				 // center: [116.397428, 39.90923]
			});
			// 创建一个 Marker 实例：
			var marker = new AMap.Marker({
				position: [data.coords.longitude, data.coords.latitude], 
				title: data.address
			});
			marker.setMap(map);
	       };
	       //失败回调
	       function errorCB() {
	       	alert('获取失败')
	       };
	    } 
	    else{ 
	        mui.toast("获取地理位置失败!");    
	    } 
	} 
})

//点击搜索
document.getElementById('search').addEventListener('tap',function(){
	mui.openWindow({
	    url:'search_address.html',
	    id:'search_address.html',  
		waiting: {
			autoShow: false, //自动显示等待框，默认为true		
		}
	})
})


//点击设置
document.getElementsByClassName('search-location')[0].addEventListener("tap",function(){
    mui.openWindow({
        url:'location-search-list.html',
        id:'location-search-list.html',  
		waiting: {
			autoShow: false, //自动显示等待框，默认为true		
		}
    })
});