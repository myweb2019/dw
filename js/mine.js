//点击跳转到登录界面
document.querySelector('.personage').addEventListener("tap",function(){
    mui.openWindow({
        url:'login.html',
        id:'login.html',  
    })
});

//点击设置
document.querySelector('.set').addEventListener("tap",function(){
    mui.openWindow({
        url:'set.html',
        id:'set.html',  
    })
});