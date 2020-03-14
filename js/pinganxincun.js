mui.plusReady(function() {
	var wv = plus.webview.currentWebview();
	wv.setStyle({
		'scrollIndicator': 'none'
	}); //取消滚动条
});

// async function AllLi() {
	
// }
$.ajax({
	url: 'http://120.55.103.137/Household_cleaning',
	type: 'GET',
	success: function(json) {
		var str = '';
			for (var i = 0; i < 10; i++) {
				str += '<li search='+json.data[i].search+'>'+
				'<div class="lis_img">'+
				'<img src="'+json.data[i].url+'">'+
				'<p>'+json.data[i].shopping+'</p>'+
				'</div>'+
				'<div class="title">'+json.data[i].title+'</div>'+
				'<div class="price">'+
				'<strong>'+json.data[i].price+'</strong>'+
				''+json.data[i].unit+''+
				'</div>'+
				'</li>'
			}
			$('.baojie_list').html(str);
			
	}
})

$.ajax({
	url: 'http://120.55.103.137/massage',
	type: 'GET',
	success: function(json) {
		var str = '';
			for (var i = 0; i < 6; i++) {
				str += '<li search='+json.data[i].search+'>'+
				'<div class="lis_img">'+
				'<img src="'+json.data[i].url+'">'+
				'<p>'+json.data[i].shopping+'</p>'+
				'</div>'+
				'<div class="title">'+json.data[i].title+'</div>'+
				'<div class="price">'+
				'<strong>'+json.data[i].price+'</strong>'+
				''+json.data[i].unit+''+
				'</div>'+
				'</li>'
			}
			$('.ys_list').html(str);
	}
})

//家电清洗

$.ajax({
	url: 'http://120.55.103.137/cleanout',
	type: 'GET',
	success: function(json) {
		var str = '';
			for (var i = 0; i < 4; i++) {
				str += '<li search='+json.data[i].search+'>'+
				'<div class="lis_img">'+
				'<img src="'+json.data[i].url+'">'+
				'<p>'+json.data[i].shopping+'</p>'+
				'</div>'+
				'<div class="title">'+json.data[i].title+'</div>'+
				'<div class="price">'+
				'<strong>'+json.data[i].price+'</strong>'+
				''+json.data[i].unit+''+
				'</div>'+
				'</li>'
			}
			$('.jd_list').html(str);
	}
})
/* 上门维修 */
$.ajax({
	url: 'http://120.55.103.137/repair',
	type: 'GET',
	success: function(json) {
		var str = '';
			for (var i = 0; i < 6; i++) {
				str += '<li search='+json.data[i].search+'>'+
				'<div class="lis_img">'+
				'<img src="'+json.data[i].url+'">'+
				'<p>'+json.data[i].shopping+'</p>'+
				'</div>'+
				'<div class="title">'+json.data[i].title+'</div>'+
				'<div class="price">'+
				'<strong>'+json.data[i].price+'</strong>'+
				''+json.data[i].unit+''+
				'</div>'+
				'</li>'
			}
			$('.sm_list').html(str);
	}
})

/* 手机维修 */

$.ajax({
	url: 'http://120.55.103.137/repair',
	type: 'GET',
	success: function(json) {
		var str = '';
			for (var i = 0; i < 20; i++) {
				str += '<li search='+json.data[i].search+'>'+
				'<div class="lis_img">'+
				'<img src="'+json.data[i].url+'">'+
				'<p>'+json.data[i].shopping+'</p>'+
				'</div>'+
				'<div class="title">'+json.data[i].title+'</div>'+
				'<div class="price">'+
				'<strong>'+json.data[i].price+'</strong>'+
				''+json.data[i].unit+''+
				'</div>'+
				'</li>'
			}
			$('.phonewx_list').html(str);
	}
})


mui('.mui-content').on('tap','li',function(){
	let search =this.getAttribute('search');
	//将属性值传给下一页面
	mui.openWindow({
		url: 'details.html',
		id: 'details.html',
		extras: { //对界面传值
			_search: search
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	})
})
