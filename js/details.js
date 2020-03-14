//获取传入过来的值
mui.plusReady(function () {
    var cw = plus.webview.currentWebview();//获取当前窗体
	//发送请求
	var search = cw._search
	$.ajax({
		type:'get',
		url:'http://120.55.103.137/particulars?search='+search,
		success:function(data){
			model(data);
			select_type()
		}
	})
	
})



function select_type(){
	//选择服务类型
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
	
}

//渲染模板
function model(obj){
	var str = '<div class="show_img">'
				+'<img src="'+obj.json[0].url+'" >'
			+'</div>'
			+'<div class="list">'
				+'<ul class="mui-table-view">'
						+'<li class="mui-table-view-cell title_name">'
						+''+obj.json[0].title+''
							+'<span class="mui-pull-right"></span>'
						+'</li>'
						+'<li class="mui-table-view-cell price">'
							+'<strong>'+obj.json[0].price+'</strong>元起/次'
							+'<span>已售'+obj.json[0].volume+'单</span>'
						+'</li>'
						+'<li class="mui-table-view-cell member">'
							+'<a class="mui-navigate-right">'
								+'会员'
								+'<span></span>'
								+'<span>充500送50.充1000送150.充2000送400</span>'
							+'</a>'
						+'</li>'
						+'<li class="mui-table-view-cell safeguard">'
							+'保障'
							+'<span>未服务全额退款</span>'
							+'<span>爽约包赔</span>'
							+'<span>不满意重服务</span>'
						+'</li>'
						+'<li class="mui-table-view-cell choice">'
							+'<a class="mui-navigate-right">'
								+'选择'
								+'<span class="text_con">室内普通门开锁</span>'
								+'<span class="mui-pull-right" id="option">请选择项目</span>'
							+'</a>'
						+'</li>'
						+'<li class="mui-table-view-cell time">'
							+'<a class="mui-navigate-right">'
								+'服务时间'
								+'<span class="mui-pull-right">'
									+'最近可约'
									+'<i>'+obj.json[0].time+'</i>'
								+'</span>'
							+'</a>'
						+'</li>'
					+'</ul>'
					+'<div class="content">'
						+'<h5>服务说明</h5>'
						+'<p>'+obj.json[0].content+'</p>'
					+'</div>'
			+'</div>'
			
		$('.mui-content').html(str)	
}
