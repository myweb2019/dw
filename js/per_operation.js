//渲染个人信息

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
			$('#photo_img').attr('src', data.userimg);
			$('#val').attr('value', data.username)
			$("#user").html(data.email)
			$('.text').html(data.sex)

		}
	}
})

// 点击头像打开选择头像遮罩
var imgArray = null;
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
			plus.gallery.pick(function(path) {
					msg.src = path;
					msg.onload = function() {
						imgArray = getBase64Image(msg); //base64编码
					}
				maskF = true; //调用close进行关闭蒙版时，在创建蒙版的回掉函数中必须返回true,否则无法关闭
				
				mask.close();
			})
	});
//base64编码  
function getBase64Image(img) {
    var canvas = document.createElement("canvas");   //创建canvas DOM元素，并设置其宽高和图片一样
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height); //使用画布画图
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();  //动态截取图片的格式
    var dataURL = canvas.toDataURL("image/" + ext);  //返回的是一串Base64编码的URL并指定格式
    return dataURL;
}
//点击打开摄像头
document.querySelector('#photo_graph').addEventListener("tap", function() {
	let camera = this;
	var cm = plus.camera.getCamera(1);
	cm.captureImage(successCB);
	function successCB(path) {
		maskF = true;
		mask.close();
		
		var url = "file://" + plus.io.convertLocalFileSystemURL(path);
		msg.src = url;
		
		msg.onload = function() {
			imgArray = getBase64Image(msg); //base64编码
		}
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
	mui('.xu_sex').on('tap', '.but1', function() {
		text.innerHTML = this.innerHTML;
		//关闭遮罩
		maskF = true;
		mask.close();
	})
})

//点击保存修改
document.querySelector('.btn').addEventListener('tap', function(ev) {
	ev.stopPropagation()
	var val = $('#val').val();
	var sex = $('.text').html()	
	$.ajax({
		url:http+'/alterpersonal',
		type:'post',
		data:{
			id:storge.getlocalStorage('id'),
			photo:imgArray,
			sex:sex,
			username:val
		},
		success:function(data){
			console.log(data.status)
			if(data.status == 200){
				popToTarget('mine.html',false,'customEvent');
			}else{
				mui.toast('修改失败', {
					duration: 'short',
					type: 'div'
				})
			}
		}
	})
})
