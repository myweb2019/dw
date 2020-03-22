mui.ready(function() {
	var list = document.getElementById('list');
	//calc hieght
	list.style.height = document.body.offsetHeight + 'px';
	//create
	window.indexedList = new mui.IndexedList(list);
});
mui.plusReady(function() {
	plus.navigator.setStatusBarStyle("dark"); //状态栏字体颜色
	var isImmersedStatusbar = plus.navigator.isImmersedStatusbar();
	if (isImmersedStatusbar) {
		//获取状态栏高度 
		var StatusbarHeight = plus.navigator.getStatusbarHeight();
		//获取元素计算后的高度
		var heightH = document.getElementsByClassName('mui-indexed-list-search')[0].offsetHeight;
		//设置导航栏高度为原高度+状态栏高度+设置内边距高度为状态栏高度
		document.getElementsByClassName('mui-indexed-list-search')[0].style.height = heightH + StatusbarHeight + 'px';
		document.getElementsByClassName('mui-indexed-list-search')[0].style.paddingTop = StatusbarHeight + 'px';
		// //设置content 样式内上边距增加状态栏高度 
		// document.getElementsByClassName('mui-indexed-list-search')[0].style.paddingTop = heightH + StatusbarHeight + 'px';
	}
	//禁止横屏显示,仅支持竖屏显示
	plus.screen.lockOrientation("portrait-primary");
	//取消滚动条
	var wv = plus.webview.currentWebview();
	wv.setStyle({
		'scrollIndicator': 'none'
	});
});
//定位
position()

function position() {
	mui.plusReady(function() {
		if (plus.os.name == "Android") {
			var context = plus.android.importClass("android.content.Context");
			var locationManager = plus.android.importClass("android.location.LocationManager");
			var main = plus.android.runtimeMainActivity();
			var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
			androidIsOpen = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER);
			if (androidIsOpen) {
				plus.geolocation.getCurrentPosition(successCB, errorCB, {
					maximumAge: 5000,
					geocode: true
				});
				//成功回调
				function successCB(data) {
					document.getElementById('position').innerHTML = data.address.city;

				}
				//失败回调
				function errorCB() {
					alert('获取失败')
				};
			} else {
				mui.toast("获取地理位置失败!");
			}
		}
	})
}


//点击刷新
document.getElementById('refresh').addEventListener('tap', function() {
	position()
})
//热门
$.ajax({
	url: http + '/hotData',
	type: 'get',
	success: function(data) {
		var str = '';
		for (var i = 0; i < data.data.length; i++) {
			str += '<li data-longitude="' + data.data[i].longitude + '" data-latitude="' + data.data[i].latitude + '">' +
				data.data[i].name + '</li>'
		}
		$('#hot').html(str)
	}
})

//全部地址
$.ajax({
	url: http + '/groupData',
	type: 'get',
	success: function(data) {
		var json = data.data[0].group
		var arr = [];
		for (var k in json) {
			arr.push(k)
		}
		arr.sort(); //重新排序
		let obj = {}; //用于存储新的数据
		arr.forEach((item) => {
			obj[item] = json[item] //构建对象
		});
		var str = '';
		for (let key in obj) {
			str += '<li data-group="' + key + '" class="mui-table-view-divider mui-indexed-list-group">' + key + '</li>'
			for (var i = 0; i < obj[key].length; i++) {
				str += '<li class="mui-table-view-cell mui-indexed-list-item" data-longitude="' + obj[key][i].longitude +
					'" data-latitude="' + obj[key][i].latitude + '">' + obj[key][i].name + '</li>'
			}
		}
		$('.mui-table-view').append(str)
	}
})
