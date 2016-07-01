var data = [];
var onSort = false;
function getNum(){
	var num = document.getElementById("input").value;
	if(!(/^\d+$/).test(num)){
		alert("请输入正确的数字！");
		return false;
	}
	if(Number(num) > 100 || Number(num) < 0){
		alert("数字超出范围！");
		return false;
	}
	return num;
}
function redenData(){
	var num = document.getElementById("num");
	num.innerHTML = "";
	for (var i = 0; i < data.length; i++) {
		var node = document.createElement("i");
		node.innerHTML = "<span style='height:"+(data[i]*5)+"px'>"+data[i]+"</span>";
		num.appendChild(node);
	};
}
function sort(){
	onSort = true;
	var len = data.length;
	var i = 0,j=0;
	var time = setInterval(function(){
		if(i >= len){
			clearInterval(time);
			onSort = false;
			return ;
		}
		if(j >= len-i-1){
			i++;
			j=0;
		}
		if(Number(data[j]) < Number(data[j+1])){
			var temp = data[j];
			data[j] = data[j+1];
			data[j+1] = temp;
		}
		redenData();
		j++;
	},100);
}
function unshift(){
	if (onSort) {alert("正在排序！");return ;}
	if(data.length >=60){alert("队列已满！");return ;}
	if(!getNum()) return ;
	var num = getNum();
	data.unshift(num);
	redenData();
	document.getElementById("input").value = "";
}
function shift(){
	if (onSort) {alert("正在排序！");return ;}
	var num = data.shift();
	if(num == undefined){alert("队列为空");return ;}
	alert(num);
	redenData();
}
function push(){
	if (onSort) {alert("正在排序！");return ;}
	if(data.length >=60){alert("队列已满！");return ;}
	if(!getNum()) return ;
	var num = getNum();
	data.push(num);
	redenData();
	document.getElementById("input").value = "";
}
function pop(){
	if (onSort) {alert("正在排序！");return ;}
	var num = data.pop();
	if(num == undefined){alert("队列为空");return ;}
	alert(num);
	redenData();
}
function initData(){
	var num = document.getElementById("num");
	data = [].slice.call(num.getElementsByTagName("span")).map(function(x){
		x.style.height = x.innerHTML*5 + "px";
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
	document.getElementById("sort").onclick = sort;
}
init();