// 点击头像打开选择头像遮罩
document.getElementById('photo_img').addEventListener('tap', function() {
	//遮罩回调函数
	var maskF = false;

	var mask = mui.createMask(function() {
		return maskF;
	})
	mask.show()
	var str = '<div class="box">' +
		'<button type="button" class="but" id="photo_album">从相册中选取</button>' +
		'<button type="button" class="but" id="photo_graph">拍照</button>' +
		'<button type="button" class="but" id="cancel">取消</button>' +
		'</div>'
	$('.mui-backdrop').html(str);
	//点击取消
	document.getElementById('cancel').addEventListener('tap', function() {
		maskF = true; //调用close进行关闭蒙版时，在创建蒙版的回掉函数中必须返回true,否则无法关闭 
		mask.close();
	})
	//点击打开相册
	var msg = document.querySelector('#photo_img');
	document.getElementById('photo_album').addEventListener('tap', function() {
		//调取相册
		var gallery = this;
		plus.gallery.pick(function(path){
			msg.src=path;
			maskF = true; //调用close进行关闭蒙版时，在创建蒙版的回掉函数中必须返回true,否则无法关闭
			mask.close();
		})
	});
	//点击打开摄像头
	document.querySelector('#photo_graph').addEventListener("tap", function() {
		let camera = this;
		var cm = plus.camera.getCamera(1);
		cm.captureImage(successCB);
		function successCB(path){
			var url = "file://" + plus.io.convertLocalFileSystemURL(path);
			msg.src=url;
			maskF = true; 
			mask.close();
		};
	})
});

//选择性别
document.getElementById('sex').addEventListener('tap', function() {
	//遮罩回调函数
	var maskF = false;
	var mask = mui.createMask(function() {
		return maskF;
	})
	mask.show()
	var str = '<div class="xu_sex">' +
		'<button type="button" class="but1">男</button>' +
		'<button type="button" class="but1">女</button>' +
		'<button type="button" class="but" id="cancel">取消</button>' +
		'</div>'
	$('.mui-backdrop').html(str);
	//点击取消
	document.getElementById('cancel').addEventListener('tap', function() {
		maskF = true; //调用close进行关闭蒙版时，在创建蒙版的回掉函数中必须返回true,否则无法关闭 
		mask.close();
	});
	//点击相应选择性别
	//获取text
	let text = document.getElementsByClassName('text')[0];
	mui('.xu_sex').on('tap','.but1',function(){
		text.innerHTML = this.innerHTML;
		//关闭遮罩
		maskF = true;
		mask.close();
	})
})