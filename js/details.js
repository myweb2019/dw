//选择性别
document.getElementById('option').addEventListener('tap', function() {
	//遮罩回调函数
	var maskF = false;
	var mask = mui.createMask(function() {
		return maskF;
	})
	mask.show()
	var str ='<div class="option">'
				+'<div class="option_title">'
					+'<img src="images/fw/Household%20cleaning01.jpg" alt="">'
					+'<div class="title_content">'
						+'<h5>开室内门锁/换锁</h5>'
						+'<p>已选:<span class="text">室内普通门开锁</span></p>'
						+'<p><strong>200</strong>元/次</p>'
					+'</div>'
				+'</div>'
				+'<div class="services">'
					+'<p>服务项目</p>'
					+'<div class="services_tab">'
						+'<span class="active">室内普通开门</span>'
						+'<span>换球形锁</span>'
						+'<span>开锁抽屉锁、信箱锁</span>'
					+'</div>'
				+'</div>'
				+'<div class="num">'
					+'购买数量'
					+'<div class="jia">'
						+'<span></span>'
						+'<i>1</i>'
						+'<span></span>'
					+'</div>'
				+'</div>'
				+'<div class="option_btn">'
					+'<span>确定选择</span>'
				+'</div>'
				+'<span class="close"></span>'
			+'</div>';
	$('.mui-backdrop').html(str);
	//点击取消
	document.getElementsByClassName('close')[0].addEventListener('tap', function() {
		maskF = true; //调用close进行关闭蒙版时，在创建蒙版的回掉函数中必须返回true,否则无法关闭 
		mask.close();
	});
	//点击相应选择性别
	//获取text
	let text = document.getElementsByClassName('text')[0];
	let textcon = document.getElementsByClassName('text_con')[0];
	mui('.services_tab').on('tap','span',function(){
		//清除其他的样式
		for (var i = 0; i < mui('.services_tab>span').length; i++) {
			mui('.services_tab>span')[i].classList.remove('active')
		}
		
		this.classList.add('active');
		
		text.innerHTML = this.innerHTML;
		textcon.innerHTML = this.innerHTML

	})
})