//点击跳转到登录界面
document.querySelector('.personage').addEventListener("tap", function() {
	mui.openWindow({
		url: 'login.html',
		id: 'login.html',
		waiting: {
			autoShow: false, //自动显示等待框，默认为true		
		}
	})
});

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
document.getElementById('shopping').addEventListener('tap',function(){
	mui.openWindow({
		url: 'attention.html',
		id: 'attention.html',
		waiting: {
			autoShow: false, //自动显示等待框，默认为true		
		}
	})
})


//点击浏览历史更多
document.getElementById('more').addEventListener('tap',function(){
	mui.openWindow({
		url: 'history.html',
		id: 'history.html',
		waiting: {
			autoShow: false, //自动显示等待框，默认为true		
		}
	})
})