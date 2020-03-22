//点击语音识别
document.getElementById('voice').addEventListener('tap',function(){
	mui.openWindow({
		url: 'voice.html',
		id: 'voice.html',
		extras: {
			
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true		
		}
	})
})