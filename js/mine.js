//设置头部
//获取状态栏的高度
mui.plusReady(function() {
	var wv = plus.webview.currentWebview();
	wv.setStyle({
		'scrollIndicator': 'none'
	}); //取消滚动条

	var StatusbarHeight = plus.navigator.getStatusbarHeight();
	var heightS = StatusbarHeight + 44 + 'px';
	//设置hender的高度
	document.getElementsByClassName('mui-bar-nav')[0].style.height = heightS;


	var ws = plus.webview.currentWebview();
	ws.setStyle({
		"titleNView": {
			backgroundColor: '#fff', //导航栏背景色
			titleText: '我的', //导航栏标题
			titleColor: '#000000', //文字颜色
			type: 'transparent', //透明渐变样式
			autoBackButton: false, //自动绘制返回箭头
			// buttons: [{
			// 	text: '',
			// 	float: 'right',
			// 	type: 'home',
			// 	onclick: "javascript:plus.webview.currentWebview().evalJS('shareHref();')"
			// }],
			splitLine: { //底部分割线
				color: '#cccccc'
			}
		}
	})
	//设置h1的top值
	document.getElementsByClassName('mui-title')[0].style.marginTop = StatusbarHeight + 'px';
})

//点击设置
document.querySelector('.set').addEventListener("tap", function() {
	mui.openWindow({
		url: 'set.html',
		id: 'set.html',
		waiting: {
			autoShow: false, //自动显示等待框，默认为true		
		}
	})
});

//点击店铺打开我的关注
document.getElementById('shopping').addEventListener('tap', function() {
	mui.openWindow({
		url: 'attention.html',
		id: 'attention.html',
		waiting: {
			autoShow: false, //自动显示等待框，默认为true		
		}
	})
})


//点击浏览历史更多
document.getElementById('more').addEventListener('tap', function() {
	mui.openWindow({
		url: 'history.html',
		id: 'history.html',
		waiting: {
			autoShow: false, //自动显示等待框，默认为true		
		}
	})
})


//为你推荐
mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		up: {
			height: 100, //可选.默认50.触发上拉加载拖动距离
			auto: true, //可选,默认false.自动上拉加载一次
			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: pullupRefresh
		}
	}
});
//显示导航
// window.onscroll = function() {
// 	//变量t是滚动条滚动时，距离顶部的距离
// 	var t = document.documentElement.scrollTop || document.body.scrollTop;
// 	//当滚动到距离顶部200px时，返回顶部的锚点显示
// 	if (t >= 10) {
// 		mui("#show")[0].classList.add('show_active');
// 	} else { //恢复正常
// 		mui("#show")[0].classList.remove('show_active')
// 	}
// }
var count = 1;

function pullupRefresh() {
	setTimeout(function() {
		$.ajax({
			url: http + '/pages',
			type: 'post',
			data: {
				page: count,
				pageSize: "8"
			},
			success: function(data) {
				count++
				for (var i = 0; i < data.data.length; i++) {
					var table = document.body.querySelector('.mui-table-view');
					var cells = document.body.querySelectorAll('.mui-table-view-cell');
					var li = document.createElement('li');
					li.className = 'mui-table-view-cell';
					li.innerHTML = '<img src="' + data.data[i].url + '">' +
						'<p>' + data.data[i].title + '</p>' +
						'<span><strong>' + data.data[i].price + '</strong>' + data.data[i].unit + '</span>' +
						'<p>' + data.data[i].shopping + '</p>';
					table.appendChild(li);
					li.setAttribute("search", data.data[i].search)
				}

				mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > Math.ceil(data.allPage)));
			}
		});
	}, 1500);

}
mui('.mui-table-view').on('tap', '.mui-table-view-cell', function() {
	var search = this.getAttribute('search')
	mui.openWindow({
		url: 'details.html',
		id: 'details.html',
		extras: { //对界面传值
			_search: search
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	})
})
window.addEventListener('customEvent', function(event) {
	//通过event.detail可获得传递过来的参数内容
	//在此处添加要刷新的内容（或其他操作）
	getUser();
});


getUser()

function getUser() {
	$.ajax({
		url: http + '/personal',
		type: 'get',
		success: function(data) {
			if (data.status == 1) {
				// //登录状态
				$('#name').html(data.username)
				$('#Img').src = data.userimg
				document.querySelector('.personage').addEventListener("tap", function() {
					mui.openWindow({
						url: 'per_operation.html',
						id: 'per_operation.html',
						waiting: {
							autoShow: false, //自动显示等待框，默认为true		
						}
					})
				});

			} else {
				$('#name').html('请点击登录')
				document.querySelector('.personage').addEventListener("tap", function() {
					mui.openWindow({
						url: 'login.html',
						id: 'login.html',
						waiting: {
							autoShow: false, //自动显示等待框，默认为true		
						}
					})
				});
			}
		}
	})

}
