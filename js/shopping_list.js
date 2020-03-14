
mui.plusReady(function() {
	var cw = plus.webview.currentWebview(); //获取当前窗体
	var titleName = cw._title;
	var id = cw._id;
	document.querySelector('.mui-title').innerHTML = titleName;

	mui.ajax('http://120.55.103.137/shopping_list', {
		data: {
			id: id
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			var str = '';
			str += '<li class="my_item" _href="item0" type_id = ' + id + '>全部</li>'
			for (var i = 0; i < data.json[0].type_name.length; i++) {
				str += '<li class="my_item" _href="item' + (i + 1) + '" type_id=' + data.json[0].type_name[i]
					.type_id + '>' + data.json[0].type_name[i].name + '</li>';

			}
			$('#mui_scroll').html(str);

			//第一个为选中状态
			$('.my_item').eq(0).addClass('active');
			
			//第一个点击生成的数据
			$('.my_item')[0].addEventListener('tap', function() {
				for (var i = 0; i < $('.my_item').length; i++) {
					$('.my_item').removeClass('active');
				}
				this.classList.add('active');
				var type_id = this.getAttribute('type_id');
				$.ajax({
					url: 'http://120.55.103.137/all_content',
					data: {
						type_id: type_id,
					},
					type: 'post', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						$('#list').html('');
						Img(data)
					},
				});
			})
			
			//点击生成相应的数据
			for (let i = 1; i < $('.my_item').length; i++) {
				$('.my_item')[i].addEventListener('tap', function() {
					for (var i = 0; i < $('.my_item').length; i++) {
						$('.my_item').removeClass('active');
					}
					this.classList.add('active');
					var $_id = this.getAttribute('type_id');
					
					
					mui.ajax('http://120.55.103.137/son_content', {
						data: {
							type_id: $_id
						},
						type: 'post', //HTTP请求类型
						timeout: 10000, //超时时间设置为10秒；
						success: function(data) {
							$('#list').html('');
							Img(data)
						},
					});
				})
			}
			
			//开始就加载一个
			$.ajax({
				url: 'http://120.55.103.137/all_content',
				data: {
					type_id: id
				},
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					Img(data)
				},
			});
			
			//打开该窗口
			setTimeout(function() {
				mui.plusReady(function() {
					//关闭等待框
					plus.nativeUI.closeWaiting();
					//显示当前页面
					mui.currentWebview.show();
				});
			},500);
			
		},

	});

})

/**
 * 给src渲染真正的地址
 * @param {Object} data
 */
function Img(data) {
	var list = document.getElementById("list");
	list.appendChild(createFragment(data));
	//先清除data-imagelazyload上的url地址,再添加
	document.body.removeAttribute('data-imagelazyload');
	mui(document).imageLazyload({
		placeholder: 'images/60x60.gif',
	});
}

//跳转到详情页面
mui('#list').on('tap','li',function(){
	var search = this.getAttribute('search');
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


/**
 * 生成数据的模板函数
 * @param {Object} data
 */
var createFragment = function(data) {
	var fragment = document.createDocumentFragment();
	var li;
	for (var i = 0; i < data.json.length; i++) {
		li = document.createElement('li');
		li.className = 'mui-table-view-cell mui-media';
		li.innerHTML = '<a href="javascript:;">' +
			'	<img class="mui-media-object mui-pull-left" data-lazyload="' + data.json[i].url + '">' +
			'	<div class="mui-media-body">' +
			'		<div class="title">' +
			'			<p>' + data.json[i].title + '</p>' +
			'			<div class="time mui-pull-right">' +
			'				<span style="background: #ff7871;color: #fff;">最快上门</span>' +
			'				<span style="color: #e94840;background: #fff5f5;">' + data.json[i].time + '</span>' +
			'			</div>' +
			'		</div>' +
			'		<p class="mui-ellipsis">' + data.json[i].content + '</p>' +
			'		<div id="price">' +
			'			<i>' + data.json[i].price + '</i> ' + data.json[i].unit + '' +
			'		</div>' +
			'		<div class="relevant_information">' +
			'			<p class="mui-pull-left">' +
			'				' + data.json[i].shopping + '' +
			'				<span class="mui-icon mui-icon-forward" id="left-ico"></span>' +
			'			</p>' +
			'			<span class="mui-pull-right">好评' + data.json[i].evaluate + '</span>' +
			'			<span class="mui-pull-right">已售' + data.json[i].volume + '</span>' +
			'		</div>' +
			'	</div>' +
			'</a>';
		fragment.appendChild(li);
		li.setAttribute("search",data.json[i].search)
	}
	return fragment;
};
