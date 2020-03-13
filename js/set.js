
//点击设置
document.querySelector('#per_operation').addEventListener("tap",function(){
    mui.openWindow({
        url:'per_operation.html',
        id:'per_operation.html',  
		waiting: {
			autoShow: false, //自动显示等待框，默认为true		
		}
    })
});

//点击退出
document.getElementById('logout').addEventListener('tap',function(){
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