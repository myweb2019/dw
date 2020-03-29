mui.plusReady(function() {
	var wv = plus.webview.currentWebview();
	wv.setStyle({
		'scrollIndicator': 'none'
	}); //取消滚动条
});

//选择位置
document.getElementById('city').addEventListener('tap', function() {
	mui.openWindow({
		url: 'select_address.html',
		id: 'select_address.html',
		waiting: {
			autoShow: false, //自动显示等待框，默认为true		
		}
	})
});

//获取地理位置
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
	       	document.getElementById('city').innerHTML =data.address.city+data.address.district;
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
document.getElementsByClassName('search')[0].addEventListener('tap', function() {
	mui.openWindow({
		url: 'search.html',
		id: 'search.html',
		waiting: {
			autoShow: true, //自动显示等待框，默认为true		
		}
	})
})

//轮播图
$.ajax({
	type: 'GET',
	url: 'http://120.55.103.137/slideshow',
	success: function(data) {
		var str = "";
		for (var i = 0; i < data.data.length; i++) {
			str += '<div class="swiper-slide" data_num=' + data.data[i].num + '>' +
				'<img src=' + data.data[i].url + '>' +
				'</div>'
		}
		$('#swiper-container').html(str);

		var mySwiper = new Swiper('.swiper-container', {
			loop: true, // 循环模式选项
			spaceBetween: 16, //图片间的间隙
			pagination: { // 如果需要分页器
				el: '.swiper-pagination',
			},
			autoplayDisableOnInteraction: false,
			autoplay: {
				disableOnInteraction: true,
				delay: 5000, //1秒切换一次
			},
		})
	}
})

/* 分类 10宫格*/
$.ajax({
	type: 'GET',
	url: 'http://120.55.103.137/classify',
	success: function(data) {
		var str = "";
		for (var i = 0; i < data.data.length; i++) {
			str += '<div class="mui-slider-item"><ul class="mui-table-view mui-grid-view mui-grid-9" id="mui-grid-view">';
			for (var j = 0; j < data.data[i].obj.length; j++) {
				str += '<li class = "mui-table-view-cell mui-media mui-col-xs-2 mui-col-sm-2">' +
					'<a href = "#" data_start=' + data.data[i].obj[j].start + ' title =' + data.data[i].obj[j].title + '>' +
					'<img src = "' + data.data[i].obj[j].img + '" class = "main_img">' +
					'<div class = "mui-media-body" >' + data.data[i].obj[j].title + '</div>' +
					'</a>' +
					'</li>'
			}
			str += '</ul></div>';
		}
		$('.mui-slider-group').html(str);

		//为每一个分类添加点击事件
		mui('.mui-table-view-cell').on('tap', 'a', function() {
			var id = this.getAttribute('data_start');
			var title = this.getAttribute('title');

			shopping_show(id, title);

		})

		mui.init();
		mui.ready(function() {
			var slider = document.getElementById('Gallery');
			var group = slider.querySelector('.mui-slider-group');
			var items = mui('.mui-slider-item', group);
			//克隆第一个节点
			var first = items[0].cloneNode(true);
			first.classList.add('mui-slider-item-duplicate');
			//克隆最后一个节点
			var last = items[items.length - 1].cloneNode(true);
			last.classList.add('mui-slider-item-duplicate');
			//处理是否循环逻辑，若支持循环，需支持两点：
			//1、在.mui-slider-group节点上增加.mui-slider-loop类
			//2、重复增加2个循环节点，图片顺序变为：N、1、2...N、1
			var sliderApi = mui(slider).slider();
			group.addEventListener('swipeleft', function() {
				toggleLoop()
			});
			group.addEventListener('swiperight', function() {
				toggleLoop()
			});

			function toggleLoop() {
				group.classList.add('mui-slider-loop');
				group.insertBefore(last, group.firstChild);
				group.appendChild(first);
				sliderApi.refresh();
				sliderApi.gotoItem(0);
			}
		});

	}
})

//即刻到达
$.ajax({
	type: 'GET',
	url: 'http://120.55.103.137/goto',
	success: function(data) {
		var str = "";
		for (var i = 0; i < data.data.length; i++) {
			str += '<li ico=' + data.data[i]._ico + ' type_id=' + data.data[i]._id + '>' +
				'<img src="' + data.data[i].url + '" >' + data.data[i].title + '' +
				'</li>'
		}
		$('#goto').html(str);
	}
})

//推荐
$.ajax({
	type: 'GET',
	url: 'http://120.55.103.137/recommend',
	success: function(data) {
		var str = '';
		for (var i = 0; i < data.data.length; i++) {
			str = '<div class="re_img">' +
				'<div class="left_img">' +
				'<a href="jishi.html" _title=' + data.data[0].title + '>' +
				'<img src="' + data.data[0].url + '">' +
				'</a>' +
				'</div>' +
				'<div class="right_img">' +
				'<a href="pinganxincun.html"  _title=' + data.data[1].title + '>' +
				'<img src="' + data.data[1].url + '">' +
				'</a>' +
				'<a href="phone_weixiu.html" _title=' + data.data[2].title + '>' +
				'<img src="' + data.data[2].url + '" >' +
				'</div>' +
				'</a>' +
				'</div>'
		}
		$('.recommend').html(str);
		mui('.right_img').on('tap', 'a', function() {
			var title = this.getAttribute('_title');
			var url = this.getAttribute('href');
			mui.openWindow({
				url: url,
				id: url,
				style: {},
				extras: { //对界面传值
					title: title,
				},
				show: {
					autoShow: true,
					aniShow: "slide-in-right",
					duration: 200
				},
				waiting: { //是否需要显示加载界面
					autoShow: false,
					title: "正在加载......",
					options: {
						// width:
						// height
					},
				}
			})
		})

	},

});

/* 商品的类别 */
$.ajax({
	type: 'GET',
	url: 'http://120.55.103.137/classify_name',
	async: false,
	success: function(data) {
		var str = ""
		for (var i = 1; i < data.data.length; i++) {
			str += '<div class="shopping">' +
				'<h2 id=' + data.data[i].ico + ' name=' + data.data[i].name + '>' + data.data[i].name + '' +
				'<a>' +
				'更多<img src="images/go_06.png"width="7" height="auto">' +
				'</a>' +
				'</h2>' +

				'</div>'
		}
		$('.filterItems').html(str);
	}
});

mui(".shopping").on('tap', 'h2', function() {
	var id = this.getAttribute('id');
	var title = this.getAttribute('name');

	shopping_show(id, title)
})


async function shopping() {
	return [
		//家庭保洁
		$.ajax({
			type: 'GET',
			url: "http://120.55.103.137/Household_cleaning",
			success: function(data) {
				ulModel(data, 0);
			}
		}),

		//上门按摩
		$.ajax({
			type: 'GET',
			url: "http://120.55.103.137/massage",
			success: function(data) {
				ulModel(data, 1)
			}
		}),
		//上门维修
		$.ajax({
			type: 'GET',
			url: "http://120.55.103.137/repair",
			success: function(data) {
				ulModel(data, 2)
			}
		}),
		//家电清洗
		$.ajax({
			type: 'GET',
			url: "http://120.55.103.137/cleanout",
			success: function(data) {
				ulModel(data, 3)
			}
		}),
		//搬家拉货
		$.ajax({
			type: 'GET',
			url: "http://120.55.103.137/move",
			success: function(data) {
				ulModel(data, 4)
			}
		}),
		//衣物洗护
		$.ajax({
			type: 'GET',
			url: "http://120.55.103.137/xh",
			success: function(data) {
				ulModel(data, 5)
			}
		}),
		//美容美妆
		$.ajax({
			type: 'GET',
			url: "http://120.55.103.137/beauty_makeup",
			success: function(data) {
				ulModel(data, 6)
			}
		}),
		//上门安装
		$.ajax({
			type: 'GET',
			url: "http://120.55.103.137/home_installation",
			success: function(data) {
				ulModel(data, 7)
			}
		}),
		//车主服务
		$.ajax({
			type: 'GET',
			url: "http://120.55.103.137/czfw",
			success: function(data) {
				ulModel(data, 8)
			}
		}),
		//保姆月嫂
		$.ajax({
			type: 'GET',
			url: "http://120.55.103.137/baby-sitter",
			success: function(data) {
				ulModel(data, 9);

			}
		})
	]

}
//获取detailItem跳转到商品详情页面
link();

//点击到详情页面
async function link() {
	await shopping();
	mui('.filterItems').on('tap', '.detailItem', function() {
		let search = this.getAttribute('search');
		//将属性值传给下一页面
		mui.openWindow({
			url: 'details.html',
			id: 'details.html',
			extras: { //对界面传值
				_search: search
			},

			waiting: {
				autoShow: false, //自动显示等待框，默认为true
			}
		});
	})
}


/**
 * 生成首页中各个分类的模板函数
 * @param {Object} data //数据
 * @param {Object} num//第几个分类
 */
function ulModel(data, num) {
	var str = "";
	str += '<ul class="item-name">';
	for (var i = 0; i < 3; i++) {
		str += '<li class="detailItem" search=' + data.data[i].search + '>' +
			'<img src="' + data.data[i].url + '" >' +
			'<div class="name">' + data.data[i].title + '</div>' +
			'<div class="price">' +
			'<p><strong>' + data.data[i].price + '</strong>' + data.data[i].unit + '</p>' +
			'</div>' +
			'</li>'

	}
	str += '</ul>'
	$('.shopping').eq(num).append(str);
};



/**
 * 打开新窗口 shopping_list.html
 * @param {Object} id
 * @param {Object} title
 */
function shopping_show(id, title) {
	mui.openWindow({
		url: 'shopping_list.html',
		id: 'shopping_list.html',
		extras: { //对界面传值
			_id: id,
			_title: title
		},
		show: {
			autoShow: false, //页面loaded事件发生后自动显示，默认为true
			aniShow: 'slide-in-right', //页面显示动画，默认为”slide-in-right“；
			duration: 100 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		},
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
			title: '加载中...', //等待对话框上显示的提示内容
			options: {
				width: '400px', //等待框背景区域宽度，默认根据内容自动计算合适宽度
				height: '100%', //等待框背景区域高度，默认根据内容自动计算合适高度
			}
		}
	})
};
