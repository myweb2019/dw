//点清空击打开选择面板
document.getElementById('empty').addEventListener('tap',function(){
	$('.mask_layer').css({"display":"block"});
	setTimeout(function(){
		$('.mask_layer').css({"background":" rgba(0,0,0,0.6)"});
		$(".select").css({"opacity": "1"});
	},60)
	
});
//点击删除对应的商品shopping-empty
mui('.mui-content').on('tap','.shopping-empty',function(){
	$('.mask_layer').css({"display":"block"});
	$('.select>h4').html('确定将该店所有项目移除吗?')
	setTimeout(function(){
		$('.mask_layer').css({"background":" rgba(0,0,0,0.6)"});
		$(".select").css({"opacity": "1"});
	},60)
})

//点击取消遮罩
document.getElementsByClassName('qx')[0].addEventListener("tap",function(){
	$('.mask_layer').css({"display":"none"});
	$(".select").css({"opacity": "0"});
})

