
var tagQueue = new Queue(document.getElementById("inputValue"),true);
var hobbiesQueue = new Queue(document.getElementById("textareaValue"),false);

function Queue(num,flag){
	this.data = [];
	this.redenData = function(){
		var str = "";
		this.data.forEach(function(x){
			str += "<span>"+x+"</span>";
		});
		num.innerHTML = str;
		if(flag){
			addSpanEvent(this,num);
		}
	};
	this.unshift = function(num){
		if(num == undefined)return ;
		this.data.unshift(num);
		this.redenData();
	};
	this.shift = function(){
		var num = this.data.shift();
		if(num == undefined){alert("队列为空");return ;}
		this.redenData();
	};
	this.push = function(num){
		if(num == undefined)return ;
		this.data.push(num);
		this.redenData();
	};
	this.pop = function(){
		var num = this.data.pop();
		if(num == undefined){alert("队列为空");return ;}
		this.redenData();
	};
	this.deleteById = function(i){
		this.data.splice(i,1);
		this.redenData();
	}
};
function addSpanEvent(queue,container){
	var inputs = container.childNodes;
	Array.prototype.forEach.call(inputs,function(x){
			var color = x.style.backgroundColor;
			var text = x.innerHTML;
			x.onmouseover = function(e){
				var node = e.target;
				node.style.backgroundColor = "green";
				node.innerHTML = "删除"+node.innerHTML+"?";
			}
			x.onmouseout = function(e){
				var node = e.target;
				node.style.backgroundColor = color;
				node.innerHTML = text;
			}
			x.onclick = function(e){
				var index = queue.data.indexOf(text);
				queue.deleteById(index);
			}
	});
}
/**分割字符串**/
function splitStr(str){
 	return str.split(/\n|,|，|、|＼|\s+/);
}

// /**键盘**/
// function addData1(e){
// 	if(navigator.appName == "Microsoft Internet Explorer"){
// 		var keycode = event.keycode;
// 	}else{
// 		var keycode = e.which;
// 	}
// 	if(keycode == 32 || keycode == 188 || keycode == 13){
// 		var input = document.getElementById("input").value;
// 		input = input.trim();
// 		input = input.replace(/\s|\n|,/,"");
// 		if(input){
// 			if (data1.length >= 10) {data1.shift()};
// 			if(data1.indexOf(input) == -1){
// 				data1.push(input);
// 				rederData1();
// 			}
// 		}
// 		document.getElementById("input").value = "";
// 	}
// }
// function addHobbies(){
// 	var hobbies = document.getElementById("hobbies").value;
// 	hobbies = hobbies.split(/\n|,|，|、|＼|\s+/);
// 	hobbies.map(function(x){
// 		return x.trim();
// 	});
// 	for(var i = 0;i<hobbies.length;i++){
// 		if(hobbies[i] && data2.indexOf(hobbies[i]) == -1){
// 			if(data2.length >= 10){data2.shift();};
// 			data2.push(hobbies[i]);
// 		}
// 	}
// }
// function onhover(id){
// 	var inputs = document.getElementById(id).getElementsByTagName("span");
// 	Array.prototype.forEach.call(inputs,function(x){
// 		var color = x.style.backgroundColor;
// 		var text = x.innerHTML;
// 		x.onmouseover = function(e){
// 			var node = e.target;
// 			node.style.backgroundColor = "green";
// 			node.innerHTML = "删除"+node.innerHTML+"?";
// 		}
// 		x.onmouseout = function(e){
// 			var node = e.target;
// 			node.style.backgroundColor = color;
// 			node.innerHTML = text;
// 		}
// 	});
// }

/**事件添加**/
function addEvent(element,type,fun){
	if(element.addEventListener){
		element.addEventListener(type,fun);
	}else if(element.attachEvent){
		element.attachEvent("on"+type,fun);
	}else{
		element["on"+type] = fun;
	}
}
/**初始化数据**/
function initData(){
	var input = document.getElementById("inputValue");
	tagQueue.data = [].slice.call(input.getElementsByTagName("span")).map(function(x){
		return x.innerHTML;
	});
	tagQueue.redenData();
	var textarea = document.getElementById("textareaValue");
	hobbiesQueue.data = [].slice.call(textarea.getElementsByTagName("span")).map(function(x){
		return x.innerHTML;
	});
	hobbiesQueue.redenData();
}
function init () {
	// body...
	initData();
	var input = document.getElementById("input");
	var textarea = document.getElementById("hobbies");
	var tagContainer = document.getElementById("inputValue");
	var hobbiesContainer = document.getElementById("textareaValue");
	var btn = document.getElementById("sure");

	addEvent(input,"keyup",function(e){
		if(navigator.appName == "Microsoft Internet Explorer"){
			var keycode = event.keycode;
		}else{
			var keycode = e.which;
		}
		if(keycode == 32 || keycode == 188 || keycode == 13){
			var str = input.value.trim().replace(/\s+|\n|,/,"");
			if(tagQueue.data.indexOf(str) == -1){
				if(tagQueue.data.length >= 10) tagQueue.shift();
				tagQueue.push(str);
			}
			input.value = "";
		}
	});

	addEvent(btn,"click",function(){
		var str = splitStr(textarea.value.trim());
		for(var i = 0;i<str.length;i++){
			if(str[i] && hobbiesQueue.data.indexOf(str[i]) == -1){
				if(hobbiesQueue.data.length >= 10){
					hobbiesQueue.shift();
				}
				hobbiesQueue.push(str[i]);
			}
		}
		textarea.value = "";
	});
}

init();