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
	mui("#popover").popover('toggle', document.getElementById("div"));
	
})

//点击取消
document.getElementsByClassName('cancel')[0].addEventListener('tap',function(){
	
})