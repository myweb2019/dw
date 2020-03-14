mui.plusReady(function() {
	var wv = plus.webview.currentWebview();
	plus.webview.currentWebview().setStyle({
		statusbar:{background:'#fff'}
	});
	wv.setStyle({
		'scrollIndicator': 'none'
	}); //取消滚动条
});

mui.init({
	// swipeBack: false //启用右滑关闭功能
});
var controls = document.getElementById("segmentedControls");
var contents = document.getElementById("segmentedControlContents");
var html = [];
var str = '';
$.ajax({
	url: 'http://120.55.103.137/content',
	type: 'GET',
	async: false,
	success: function(data) {

		for (var j = 0; j < data.data.length; j++) {
			html.push('<a class="mui-control-item" data-index="' + j + '" href="#content' + j + '">' + data.data[j].obj.type +
				'</a>');
		}
		controls.innerHTML = html.join('');
		html = [];
		$.ajax({
			type: 'GET',
			url: 'http://120.55.103.137/classify_name',
			async: false,
			success: function(data) {
				for (var k = 0; k < data.data.length; k++) {
					str += '<div id="content' + (k + 1) + '" class="mui-control-content"><ul class="mui-table-view">' +
						'<li class="mui-table-view-cell"><h4 class="title">' + data.data[k].name + '</h2></li>'
					str += '</ul></div>'
				}
				html.push(str);
				contents.innerHTML = html.join('');

				//热点
				$.ajax({
					type: 'GET',
					url: 'http://120.55.103.137/hot',
					async: false,
					success:async function(data) {
						var str = "";
						for (var i = 0; i < data.json[0].type_name.length; i++) {
							str+='<ul><li><img src="'+data.json[0].type_name[i].src+'"/>'+
									'<div class="name">'+data.json[0].type_name[i].name+'</div>'+
									'</li></ul>' 
						}
						$('.mui-table-view-cell').eq(0).append(str)
					}
				});
				
				//家庭保洁
				$.ajax({
					type: 'GET',
					url: 'http://120.55.103.137/Household_cleaning_classify',
					async: false,
					success:async function(data) {
						var str = "";
						for (var i = 0; i < data.json[0].type_name.length; i++) {
							str+='<ul><li><img src="'+data.json[0].type_name[i].src+'"/>'+
									'<div class="name">'+data.json[0].type_name[i].name+'</div>'+
									'</li></ul>' 
						}
						$('.mui-table-view-cell').eq(1).append(str)
					}
				});
				
				//上门按摩
				$.ajax({
					type: 'GET',
					url: 'http://120.55.103.137/massage_classify',
					async: false,
					success:async function(data) {
						var str = "";
						for (var i = 0; i < data.json[0].type_name.length; i++) {
							str+='<ul><li><img src="'+data.json[0].type_name[i].src+'"/>'+
									'<div class="name">'+data.json[0].type_name[i].name+'</div>'+
									'</li></ul>' 
						}
						$('.mui-table-view-cell').eq(2).append(str)
					}
				});
				
				//上门维修
				$.ajax({
					type: 'GET',
					url: 'http://120.55.103.137/repair_classify',
					async: false,
					success:async function(data) {
						var str = "";
						for (var i = 0; i < data.json[0].type_name.length; i++) {
							str+='<ul><li><img src="'+data.json[0].type_name[i].src+'"/>'+
									'<div class="name">'+data.json[0].type_name[i].name+'</div>'+
									'</li></ul>' 
						}
						$('.mui-table-view-cell').eq(3).append(str)
					}
				});
				
				//家电清洗
				$.ajax({
					type: 'GET',
					url: 'http://120.55.103.137/cleanout_classify',
					async: false,
					success:async function(data) {
						var str = "";
						for (var i = 0; i < data.json[0].type_name.length; i++) {
							str+='<ul><li><img src="'+data.json[0].type_name[i].src+'"/>'+
									'<div class="name">'+data.json[0].type_name[i].name+'</div>'+
									'</li></ul>' 
						}
						$('.mui-table-view-cell').eq(4).append(str)
					}
				});
				
				//搬家拉货
				$.ajax({
					type: 'GET',
					url: 'http://120.55.103.137/move_classify',
					async: false,
					success:async function(data) {
						var str = "";
						for (var i = 0; i < data.json[0].type_name.length; i++) {
							str+='<ul><li><img src="'+data.json[0].type_name[i].src+'"/>'+
									'<div class="name">'+data.json[0].type_name[i].name+'</div>'+
									'</li></ul>' 
						}
						$('.mui-table-view-cell').eq(5).append(str)
					}
				});
				
				//衣物洗护
				$.ajax({
					type: 'GET',
					url: 'http://120.55.103.137/xh_classify',
					async: false,
					success:async function(data) {
						var str = "";
						for (var i = 0; i < data.json[0].type_name.length; i++) {
							str+='<ul><li><img src="'+data.json[0].type_name[i].src+'"/>'+
									'<div class="name">'+data.json[0].type_name[i].name+'</div>'+
									'</li></ul>' 
						}
						$('.mui-table-view-cell').eq(6).append(str)
					}
				});
				
				//美容美妆
				$.ajax({
					type: 'GET',
					url: 'http://120.55.103.137/beauty_makeup_classify',
					async: false,
					success:async function(data) {
						var str = "";
						for (var i = 0; i < data.json[0].type_name.length; i++) {
							str+='<ul><li><img src="'+data.json[0].type_name[i].src+'"/>'+
									'<div class="name">'+data.json[0].type_name[i].name+'</div>'+
									'</li></ul>' 
						}
						$('.mui-table-view-cell').eq(7).append(str)
					}
				});
				
				//上门安装
				$.ajax({
					type: 'GET',
					url: 'http://120.55.103.137/home_installation_classify',
					async: false,
					success:async function(data) {
						var str = "";
						for (var i = 0; i < data.json[0].type_name.length; i++) {
							str+='<ul><li><img src="'+data.json[0].type_name[i].src+'"/>'+
									'<div class="name">'+data.json[0].type_name[i].name+'</div>'+
									'</li></ul>' 
						}
						$('.mui-table-view-cell').eq(8).append(str)
					}
				});
				//车主服务
				$.ajax({
					type: 'GET',
					url: 'http://120.55.103.137/czfw_classify',
					async: false,
					success:async function(data) {
						var str = "";
						for (var i = 0; i < data.json[0].type_name.length; i++) {
							str+='<ul><li><img src="'+data.json[0].type_name[i].src+'"/>'+
									'<div class="name">'+data.json[0].type_name[i].name+'</div>'+
									'</li></ul>' 
						}
						$('.mui-table-view-cell').eq(9).append(str)
					}
				});
				
				//保姆
				$.ajax({
					type: 'GET',
					url: 'http://120.55.103.137/baby-sitter_classify',
					async: false,
					success:async function(data) {
						var str = "";
						for (var i = 0; i < data.json[0].type_name.length; i++) {
							str+='<ul><li><img src="'+data.json[0].type_name[i].src+'"/>'+
									'<div class="name">'+data.json[0].type_name[i].name+'</div>'+
									'</li></ul>' 
						}
						$('.mui-table-view-cell').eq(10).append(str)
					}
				});
				
				// //装修
				$.ajax({
					type: 'GET',
					url: 'http://120.55.103.137/finish_classify',
					async: false,
					success:async function(data) {
						var str = "";
						for (var i = 0; i < data.json[0].type_name.length; i++) {
							str+='<ul><li><img src="'+data.json[0].type_name[i].src+'"/>'+
									'<div class="name">'+data.json[0].type_name[i].name+'</div>'+
									'</li></ul>' 
						}
						$('.mui-table-view-cell').eq(11).append(str)
					}
				});
				
				//鲜花
				$.ajax({
					type: 'GET',
					url: 'http://120.55.103.137/flower_classify',
					async: false,
					success:async function(data) {
						var str = "";
						for (var i = 0; i < data.json[0].type_name.length; i++) {
							str+='<ul><li><img src="'+data.json[0].type_name[i].src+'"/>'+
									'<div class="name">'+data.json[0].type_name[i].name+'</div>'+
									'</li></ul>' 
						}
						$('.mui-table-view-cell').eq(12).append(str)
					}
				});
				//更多
				$.ajax({
					type: 'GET',
					url: 'http://120.55.103.137/more_classify',
					async: false,
					success:async function(data) {
						var str = "";
						for (var i = 0; i < data.json[0].type_name.length; i++) {
							str+='<ul><li><img src="'+data.json[0].type_name[i].src+'"/>'+
									'<div class="name">'+data.json[0].type_name[i].name+'</div>'+
									'</li></ul>' 
						}
						$('.mui-table-view-cell').eq(13).append(str)
					}
				});			
				controls.querySelector('.mui-control-item').classList.add('mui-active');
				//			contents.querySelector('.mui-control-content').classList.add('mui-active');
				(function() {
					//左侧大div
					var controlsElem = document.getElementById("segmentedControls");
					//右侧大div
					var contentsElem = document.getElementById("segmentedControlContents");
					//左侧a标签
					var controlListElem = controlsElem.querySelectorAll('.mui-control-item');
					//右侧.mui-control-content
					var contentListElem = contentsElem.querySelectorAll('.mui-control-content');
					//获取a的父节点
					var controlWrapperElem = controlsElem.parentNode;
					//返回元素的高度a的父节点
					var controlWrapperHeight = controlWrapperElem.offsetHeight;
					//左侧类别最大可滚动高度
					var controlMaxScroll = controlWrapperElem.scrollHeight - controlWrapperHeight; 
					//右侧内容最大可滚动高度
					//scrollHeigh//返回元素的高度（包括元素高度、内边距和溢出尺寸，不包括边框和外边距），无溢出的情况，与clientHeight相同
					var maxScroll = contentsElem.scrollHeight - contentsElem.offsetHeight; 
					
					//左侧类别每一项的高度
					var controlHeight = controlListElem[0].offsetHeight+20; 
					
					var controlTops = []; //存储control的scrollTop值
					var contentTops = [0]; //存储content的scrollTop值
					var length = contentListElem.length;
					
					//左侧
					for (var i = 0; i < length; i++) {
						controlTops.push(controlListElem[i].offsetTop + controlHeight);
						
					}
					//右侧
					
					for (var i = 1; i < length; i++) {
						var offsetTop = contentListElem[i].offsetTop;
						var Wi = contentListElem[i].offsetHeight
						console.log(offsetTop,Wi);
						if (offsetTop+50>= maxScroll) {
							console.log(1)
							var height = Math.max(offsetTop + 50 - maxScroll, 50);
							var totalHeight = 0;
							var heights = [];
							for (var j = i; j < length; j++) {
								var offsetHeight = contentListElem[j].offsetHeight;
								totalHeight += offsetHeight;
								heights.push(totalHeight);
							}
							for (var m = 0, len = heights.length; m < len; m++) {
								contentTops.push(parseInt(maxScroll - (height - heights[m] / totalHeight * height)));
							}
							break;
						} else {
							contentTops.push(parseInt(offsetTop));
						}
					}
					//滚动事件
					contentsElem.addEventListener('scroll', function() {
						var scrollTop = contentsElem.scrollTop;
						for (var i = 0; i < length; i++) {
							var offsetTop = contentTops[i];
							var offset = Math.abs(offsetTop - scrollTop);
							if (scrollTop < offsetTop) {
								if (scrollTop >= maxScroll) {
									onScroll(length - 1);
								} else {
									onScroll(i - 1);
								}
								break;
							} else if (offset < 180) {
								onScroll(i);
								break;
							} else if (scrollTop >= maxScroll) {
								onScroll(length-2);
								break;
							}
						}
					});
					var lastIndex = 0;
					//监听content滚动
					var onScroll = function(index) {
						if (lastIndex !== index) {
							lastIndex = index;
							var lastActiveElem = controlsElem.querySelector('.mui-active');
							lastActiveElem && (lastActiveElem.classList.remove('mui-active'));
							var currentElem = controlsElem.querySelector('.mui-control-item:nth-child(' + (index + 1) + ')');
							currentElem.classList.add('mui-active');
							//简单处理左侧分类滚动，要么滚动到底，要么滚动到顶
							var controlScrollTop = controlWrapperElem.scrollTop;
							if (controlScrollTop + controlWrapperHeight < controlTops[index]) {
								controlWrapperElem.scrollTop = controlMaxScroll;
							} else if (controlScrollTop > controlTops[index] - controlHeight) {
								controlWrapperElem.scrollTop = 0;
							}
						}
					};
					//滚动到指定content
					var scrollTo = function(index) {
						contentsElem.scrollTop = contentTops[index];
					};
					mui(controlsElem).on('tap', '.mui-control-item', function(e) {
						scrollTo(this.getAttribute('data-index'));
						return false;
					});
				})();


			}
		})
		
	}
});

