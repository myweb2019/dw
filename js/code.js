//发送验证码
mui.plusReady(function() {

	let vw = plus.webview.currentWebview();
	let _email = vw.email;
	let off = true
	document.getElementById('send').addEventListener('tap', function() {
		if (off) {
			off = !off
			$("#send>span>i").html(60);
			$("#send>i").css('display', 'none');
			$("#send>span").css('display', 'block');

			//获取时间
			var time = $("#send>span>i").html();
			var cler = setInterval(function() {
				time -= 1;
				$("#send>span>i").html(time);
				if (time <= 0) {
					clearInterval(cler);
					$("#send>i").css('display', 'block');
					$("#send>span").css('display', 'none');
				}
			}, 1000);
			setTimeout(function() {
				off = !off
			}, 60000)

			$.ajax({
				url: http + '/code',
				type: 'post',
				data: {
					email: _email
				},
				success: function(data) {
					if (data.status == 1) {
						mui.toast('验证码发送成功', {
							duration: 'short',
							type: 'div'
						})
					} else {
						mui.toast('验证码发送失败', {
							duration: 'short',
							type: 'div'
						})
					}
				}
			})
		}
	});
	
	document.getElementById('submit').addEventListener('input',function(){
		//检测输入框中是否有值
		var val1 = $('input')[0].value;
		var val2 = $('input')[1].value;
		var val3 = $('input')[2].value;
		var val4 = $('input')[3].value;
		
		var str =''+val1+val2+val3+val4;
		if (val1 !== '' && val2 !== '' && val3 !== '' && val4 !== '') {
			//验证验证码是否出错
			$.ajax({
				url:http+'/reg-login',
				type:'post',
				data:{
					email:_email,
					code:str
				},
				success:function(data){
					if(data.status == 1){
						mui.openWindow({
							url: 'register-suc.html',
							id: 'register-suc.html',
							extras: {
								email:_email,
							},
							waiting: {
								autoShow: false, //自动显示等待框，默认为true		
							}
						})
					}else{
						mui.toast('验证码错误', {
							duration: 'short',
							type: 'div'
						})
					}
				}
			})
			
		}
	})
})

/**
 * 自动跳到下一步
 * @param {Object} object
 * @param {Object} index
 */
function moveNext(object, index) {
	if (object.value.length == 1) {
		if (index >= 3) {
			return;
		}
		document.getElementsByTagName('input')[index + 1].focus();
	}
	if (object.value.length < 1) {
		if (index < 1) {
			return;
		}
		document.getElementsByTagName('input')[index - 1].focus();
	}
	// console.log($('input')[0].value)
}




