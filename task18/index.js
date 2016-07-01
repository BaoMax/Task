var data = [];
function getNum(){
	var num = document.getElementById("input").value;
	if(!(/^\d+$/).test(num)){
		alert("请输入正确的数字！");
		return false;
	}
	return num;
}
function redenData(){
	var num = document.getElementById("num");
	num.innerHTML = "";
	for (var i = 0; i < data.length; i++) {
		var node = document.createElement("span");
		node.innerHTML = data[i];
		num.appendChild(node);
	};
}
function unshift(){
	if(!getNum()) return ;
	var num = getNum();
	data.unshift(num);
	redenData();
	document.getElementById("input").value = "";
}
function shift(){
	var num = data.shift();
	if(num == undefined){alert("队列为空");return ;}
	alert(num);
	redenData();
}
function push(){
	if(!getNum()) return ;
	var num = getNum();
	data.push(num);
	redenData();
	document.getElementById("input").value = "";
}
function pop(){
	var num = data.pop();
	if(num == undefined){alert("队列为空");return ;}
	alert(num);
	redenData();
}
function initData(){
	var num = document.getElementById("num");
	data = [].slice.call(num.getElementsByTagName("span")).map(function(x){
		return x.innerHTML;
	});
}
function init () {
	// body...
	initData();
	document.getElementById("left-go").onclick = unshift;
	document.getElementById("right-go").onclick = push;
	document.getElementById("left-out").onclick = shift;
	document.getElementById("right-out").onclick = pop;
}
init();