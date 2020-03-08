mui.plusReady(function() {
	plus.navigator.setStatusBarStyle("dark"); //状态栏字体颜色
	var isImmersedStatusbar = plus.navigator.isImmersedStatusbar();
	if (isImmersedStatusbar) {
		//获取状态栏高度 
		var StatusbarHeight = plus.navigator.getStatusbarHeight();
		//获取元素计算后的高度 
		var heightH = document.getElementsByClassName('mui-bar-nav')[0].offsetHeight;
		//设置导航栏高度为原高度+状态栏高度+设置内边距高度为状态栏高度
		document.getElementsByClassName('mui-bar-nav')[0].style.height = heightH + StatusbarHeight + 'px';
		document.getElementsByClassName('mui-bar-nav')[0].style.paddingTop = StatusbarHeight + 'px';
		//设置content 样式内上边距增加状态栏高度 
		document.getElementsByClassName('mui-content')[0].style.paddingTop = heightH + StatusbarHeight + 'px';
	}
	//禁止横屏显示,仅支持竖屏显示
	plus.screen.lockOrientation("portrait-primary");
	//取消滚动条
	var wv = plus.webview.currentWebview();
	wv.setStyle({
		'scrollIndicator': 'none'
	}); 
});

