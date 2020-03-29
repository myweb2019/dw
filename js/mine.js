//设置头部
mui.plusReady(function() {
	var ws = plus.webview.currentWebview();
	ws.setStyle({
		'scrollIndicator': 'none'
	}); //取消滚动条
	var tags = [{ //用图片做图标
		id: 'img',
		tag: 'span',
		position: {
			backgroundImage: "url('/images/ps2.png')",
			backgroundSize: 'auto 21px',
			backgroundPosition: "-1.1rem 0",
			width: "21px",
			height: "21px"
		}
	}]
	ws.draw(tags);

	ws.setStyle({
		"titleNView": {
			titleText: '我的', //导航栏标题
			titleColor: '#000000', //文字颜色
			type: 'transparent', //透明渐变样式
			tags: tags,
			splitLine: { //底部分割线
				color: '#cccccc'
			},
			buttons: [{
					text: '\ue607',
					fontSrc: 'fonts/iconfont3.ttf',
					float: 'right', //按钮不像绘制的方法，是不能用position绝对定位的，只能左右浮动
					fontSize: '28px',
					background: 'rgba(0,0,0,0)',
				},
				{
					text: '\ue60c',
					fontSrc: 'fonts/iconfont3.ttf',
					float: 'right', //按钮不像绘制的方法，是不能用position绝对定位的，只能左右浮动
					fontSize: '25px',
					marginLeft: '20px',
					onclick: clickButtonSet, //按钮有个好处可以直接绑定事件，如果没有事件，跟绘制没有差别了。
					background: 'rgba(0,0,0,0)'
				}
			]

		}
	})
})
//点击设置
function clickButtonSet() {
	mui.openWindow({
		url: 'set.html',
		id: 'set.html',
		waiting: {
			autoShow: false, //自动显示等待框，默认为true		
		}
	})
}


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

//浏览历史
$.ajax({
	url: http + '/userhistory',
	type: 'get',
	success: function(data) {
		if (data.status == 200) {
			var str = '';
			if(data.length<4){
				for (var i = 0; i < data.length; i++) {
					console.log(data.json[i])
					str += '<li>' +
						'<img src="' + data.json[i].url + '" alt="">' +
						'<p>' + data.json[i].title + '</p>' +
						'<span><strong>' + data.json[i].price + '</strong>' + data.json[i].unit + '</span>' +
						'</li>'
				}
			}else{
				for (var i = 0; i < 4; i++) {
					console.log(data.json[i])
					str += '<li>' +
						'<img src="' + data.json[i].url + '" alt="">' +
						'<p>' + data.json[i].title + '</p>' +
						'<span><strong>' + data.json[i].price + '</strong>' + data.json[i].unit + '</span>' +
						'</li>'
				}
			}
			$('#history-list').html(str)
		}
	}
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

//商品详情
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

//局部刷新登录状态
window.addEventListener('customEvent', function(event) {
	//通过event.detail可获得传递过来的参数内容
	//在此处添加要刷新的内容（或其他操作）
	getUser();
});
getUser();

function getUser() {
	//获取本地token看本地是否有,如果有就说明是登录状态
	var id = storge.getlocalStorage('id')
	$.ajax({
		url: http + '/personal',
		type: 'get',
		data: {
			id: id
		},
		headers: {
			'Content-Type': 'application/json;charset=utf8',
			'token': localStorage.getItem('token'),
		},
		success: function(data) {
			if (data.status == 1) {
				//登录状态
				$('.name').html(data.username)
				$('.Img').attr('src', data.userimg)
				//显示登录的状态
				// $('.personage').css('display', 'none')
				// $('.yet-login').css('display', 'block')
				// document.getElementsByClassName('yet-login')[0].addEventListener('tap', function() {
				// 	mui.openWindow({
				// 		url: 'per_operation.html',
				// 		id: 'per_operation.html',
				// 		waiting: {
				// 			autoShow: false, //自动显示等待框，默认为true		
				// 		}
				// 	})
				// })
			} else {
				$('.name').html('请点击登录')
				$('.Img').attr('src', 'images/photo.png')
				//显示登录的状态
				// $('.personage').css('display', 'block')
				// $('.yet-login').css('display', 'none')
				// document.getElementsByClassName('personage')[0].addEventListener('tap', function() {
				// 	mui.openWindow({
				// 		url: 'login.html',
				// 		id: 'login.html',
				// 		waiting: {
				// 			autoShow: false, //自动显示等待框，默认为true		
				// 		}
				// 	})
				// })
			}
		}
	})
}

//判断是否是登录状态
document.getElementsByClassName('personage')[0].addEventListener('tap', function() {
	var id = storge.getlocalStorage('id')
	if (id == '') {
		mui.openWindow({
			url: 'login.html',
			id: 'login.html',
			waiting: {
				autoShow: false, //自动显示等待框，默认为true		
			}
		})
	} else {
		mui.openWindow({
			url: 'per_operation.html',
			id: 'per_operation.html',
			waiting: {
				autoShow: false, //自动显示等待框，默认为true		
			}
		})
	}
})
