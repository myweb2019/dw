mui.plusReady(function() {
	var wv = plus.webview.currentWebview();
	plus.webview.currentWebview().setStyle({
		statusbar:{background:'#fff'}
	});
	wv.setStyle({
		'scrollIndicator': 'none'
	}); //取消滚动条
});	
/**
 * 给导航添加点击事件,点击切换相应的div显示,以及
 * 添加相应的样式
 */
var Alla = document.querySelectorAll('.orderform_opt>a');
var tabs = document.querySelectorAll('.tabs>div');
mui('.orderform_opt').on('tap','a',function(){
	for (var i = 0; i < Alla.length; i++) {
		Alla[i].classList.remove("active");
		tabs[i].classList.remove("active");
	}
	this.classList.add('active');
	//显示对应的div
	document.querySelector(''+this.getAttribute('href')).classList.add('active')
})

// 购物车
document.getElementsByClassName('car')[0].addEventListener('tap',function(){
	//跳转到购物车页面
	mui.openWindow({
	    url:'car.html',
	    id:'car.html',
	    extras:{
	      //自定义扩展参数，可以用来处理页面间传值
	    },
	    waiting:{
	      autoShow:false,//自动显示等待框，默认为true
	    }
	})
})

