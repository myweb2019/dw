// $("#user").focus()

//点击下一步
document.getElementsByClassName('btn')[0].addEventListener('tap', function() {
	if ($("#user").val().trim() == '') {
		mui.toast('请输入账号', {
			duration: 'short',
			type: 'div'
		})

	} else if ($('#checkbox').is(':checked') == false) {
		mui.toast('请选择协议', {
			duration: 'short',
			type: 'div'
		})
	} else {
		//验证邮箱是否有效
		let text = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

		if (text.test($("#user").val()) == false) {
			mui.toast('邮箱格式不正确', {
				duration: 'short',
				type: 'div'
			})
			return
		}
		/**
		 * 判断该账户是否存在如果存在就跳转到next_login.html
		 * 如果不存在就跳转到验证码页面
		 */
		$.ajax({
			url:http+'/code-user',
			type:'post',
			data:{
				email:$("#user").val()
			},
			success:function(data){
				data.log
				if(data.msg == $("#user").val()){
					mui.openWindow({
						url: 'next_login.html',
						id: 'next_login.html',
						waiting: {
							autoShow: false, //自动显示等待框，默认为true		
						}
					})
				}else{
					//发送验证码
					console.log($("#user").val())
					$.ajax({
						url:http+'/code',
						type:'post',
						data:{
							email:$("#user").val()
						},
						success:function(data){
							if(data.status == 1){
								mui.openWindow({
									url: 'code.html',
									id: 'code.html',
									waiting: {
										autoShow: false, //自动显示等待框，默认为true		
									}
								})
							}
						}
					})
					
					
				}
			}
		})
		
	}
})
