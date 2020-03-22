//点击跳转到注册界面
document.querySelector('#register').addEventListener("tap", function() {
	mui.openWindow({
		url: 'register_next.html',
		id: 'register_next.html',
		waiting: {
			autoShow: false, //自动显示等待框，默认为true		
		}
	})
});

//登录
mui.plusReady(function () {
    document.getElementById('btn').addEventListener('tap',function(){
		var user = $('#user').val().trim();
		var pass = $('#password').val().trim();
		
		$.ajax({
			url:http+'/login',
			type:'post',
			data:{
				email:user,
				pass:pass
			},
			success:function(data){
				if(data.status == 1){
					popToTarget('mine.html',false,'customEvent');
				}else{
					mui.toast('密码账户错误!', {
						duration: 'short',
						type: 'div'
					})
				}
			}
		})
	})
})