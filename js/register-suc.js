mui.plusReady(function() {
	//register
	//获取账号
	var cw = plus.webview.currentWebview();
	var _email = cw.email;

	register('user');
	register('pass');
	register('pass2');

	//点击确定
	document.getElementById('sure').addEventListener('tap', function() {
		if ($('#user').val().trim() !== '' && $('#pass').val().trim() !== '' && $('#pass2').val().trim() !== '') {
			//验证输入框的值
			var user = $('#user').val().trim();
			var pass = $('#pass').val().trim();
			var pass2 = $('#pass2').val().trim();

			if (pass !== pass2) {
				mui.toast('2次密码不符', {
					duration: 'short',
					type: 'div'
				});
				return false
			}

			//验证昵称是否存在
			$.ajax({
				url: http + '/register',
				type: 'post',
				data: {
					name: user,
					email: _email,
					pass: pass
				},
				success: function(data) {
					console.log(data.token,data.id)
					if (data.status == 1) {
						storge.setlocalStorage('token',data.token);
						storge.setlocalStorage('id',data.id);
						popToTarget('mine.html',false,'customEvent');
					} else if (data.status == 2) {
						mui.toast('昵称已经存在!', {
							duration: 'short',
							type: 'div'
						})
					}
				}
			})

		}
	})

	//以后再说
	document.getElementById('later').addEventListener('tap', function() {
		//随机用户名
		var user = 'u' + _email.split('@')[0]
		//随机密码
		var pass = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
		$.ajax({
			url: http + '/register',
			type: 'post',
			data: {
				name: user,
				email: _email,
				pass: pass
			},
			success: function(data) {
				if (data.status == 1) {
					storge.setlocalStorage('token',data.token);
					storge.setlocalStorage('id',data.id);
					popToTarget('mine.html',false,'customEvent');
				}
			}
		})
	})
})
/**
 * 检测输入框的值的改变
 * @param {Object} el
 * @param {Object} email
 */
function register(el) {
	document.getElementById(el).addEventListener('input', function() {
		if ($('#user').val().trim() !== '' && $('#pass').val().trim() !== '' && $('#pass2').val().trim() !== '') {
			$('#sure').css("background", "red");
		} else {
			$('#sure').css("background", "#dddddd");
			return
		}
	});
}

