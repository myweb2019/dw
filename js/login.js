//点击跳转到登录界面
document.querySelector('#register').addEventListener("tap", function() {
	mui.openWindow({
		url: 'register_next.html',
		id: 'register_next.html',

	})
});

// $.ajax({
// 	url: http+'/content',
// 	type: 'GET',
// 	success:(data)=>{
// 		console.log(data)
// 	}
// })
