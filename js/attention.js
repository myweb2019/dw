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
	mui.confirm('确认要取消关注',function(e) {
		console.log(e)
	})
});
