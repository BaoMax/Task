var data = [];
function getNum(){
	var num = document.getElementById("input").value.split(/,|\n|\s+|\t|，|、|＼/);
	var i = 0;
	var reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
	while(i<num.length){
		if(!reg.test(num[i])){
			num.splice(i,1);
		}else{
			i++;
		}
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
	if(data.length >=60){alert("队列已满！");return ;}
	if(!getNum()) return ;
	var num = getNum();
	for(var i = 0;i<num.length;i++){
		data.unshift(num[i]);
	}
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
	if(data.length >=60){alert("队列已满！");return ;}
	if(!getNum()) return ;
	var num = getNum();
	for(var i = 0;i<num.length;i++){
		data.push(num[i]);
	}
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
function search(){
	var str = document.getElementById("search").value;
	var nodes = document.getElementById("num").getElementsByTagName("span");
	for(var i = 0;i<data.length;i++){
		if(data[i].indexOf(str) != -1){
			nodes[i].style.backgroundColor="green";
		}
	}
}
function init () {
	// body...
	initData();
	document.getElementById("left-go").onclick = unshift;
	document.getElementById("right-go").onclick = push;
	document.getElementById("left-out").onclick = shift;
	document.getElementById("right-out").onclick = pop;
	document.getElementById("btnsearch").onclick = search;
}
init();