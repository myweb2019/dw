//移动端的适配
setFont();
window.onresize = function(ev) {
	setFont();
}
function setFont() {
	let iw = window.innerWidth;
	let font = iw / 16;
	document.documentElement.style.fontSize = font + 'px';
}
