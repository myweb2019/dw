//点击设置个人资料
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
		document.querySelector('#per_operation').addEventListener("tap", function() {
			if (data.status == 1) {
				//显示登录的状态
				mui.openWindow({
					url: 'per_operation.html',
					id: 'per_operation.html',
					waiting: {
						autoShow: false, //自动显示等待框，默认为true		
					}
				})
			} else {
				mui.openWindow({
					url: 'login.html',
					id: 'login.html',
					waiting: {
						autoShow: false, //自动显示等待框，默认为true		
					}
				})
			}
		})
	}
	// mui.openWindow({
	// 	url: 'per_operation.html',
	// 	id: 'per_operation.html',
	// 	waiting: {
	// 		autoShow: false, //自动显示等待框，默认为true		
	// 	}
	// })
});

//点击退出
document.getElementById('logout').addEventListener('tap', function() {
	// mui("#popover").popover('toggle', document.getElementById("div"));
	//遮罩回调函数
	var maskF = false;

	var mask = mui.createMask(function() {
		return maskF;
	})
	mask.show();
	var str = '<div id="popover">' +
		'<p>确认要取退出吗？</p>' +
		'<div class="btn">' +
		'<button type="button" id="cancel">取消</button>' +
		'<button type="button" id="sure">确定</button>' +
		'</div>' +
		'</div>'
	$('.mui-backdrop').html(str);
	//点击取消
	document.getElementById('cancel').addEventListener('tap', function() {
		maskF = true; //调用close进行关闭蒙版时，在创建蒙版的回掉函数中必须返回true,否则无法关闭 
		mask.close();
	});

	//退出
	document.getElementById('sure').addEventListener('tap', function() {
		maskF = true; //调用close进行关闭蒙版时，在创建蒙版的回掉函数中必须返回true,否则无法关闭 
		mask.close();
		//清空本地
		storge.clearlocalStorage('token')
		storge.clearlocalStorage('id')
		popToTarget('mine.html', false, 'customEvent');
	})

})
