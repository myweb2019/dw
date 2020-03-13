mui('.nav').on('tap', 'a', function() {
	//删除所有样式
	for (var i = 0; i < mui('.nav>a').length; i++) {
		mui('.nav>a')[i].classList.remove("active");
		document.querySelectorAll('.mui-content>div')[i + 1].classList.remove("active");
	}
	this.classList.add("active");
	let _id = this.getAttribute('href');
	document.querySelector(_id).classList.add('active')
})


document.getElementById("services-cancel").addEventListener('tap', function() {
	// mui("#popover").popover('toggle', document.getElementById("div"));
	//遮罩回调函数
	var maskF = false;
	
	var mask = mui.createMask(function() {
		return maskF;
	})
	mask.show();
	var str = '<div id="popover">'
			+'<p>确认要取消关注吗？</p>'
			+'<div class="btn">'
				+'<button type="button" id="cancel">取消</button>'
				+'<button type="button">确定</button>'
			+'</div>'
		+'</div>'
	$('.mui-backdrop').html(str);
	//点击取消
	document.getElementById('cancel').addEventListener('tap', function() {
		maskF = true; //调用close进行关闭蒙版时，在创建蒙版的回掉函数中必须返回true,否则无法关闭 
		mask.close();
	})
})
