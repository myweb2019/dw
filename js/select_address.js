//点击设置
document.getElementsByClassName('search-location')[0].addEventListener("tap",function(){
    mui.openWindow({
        url:'location-search-list.html',
        id:'location-search-list.html',  
		waiting: {
			autoShow: false, //自动显示等待框，默认为true		
		}
    })
});