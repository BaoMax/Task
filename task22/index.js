var test = [];
function setColor(color){
	[].slice.call(document.getElementsByTagName("div")).forEach(function(x){
		x.style.backgroundColor = color;
	});
}
function changeColor(result){
	var second = document.getElementById("second").value;
	var time = setInterval(function(){
		if(result.length == 0){
			clearInterval(time);
			setColor("#fff");
			return ;
		}
		var node = result.shift();
		setColor("#fff");
		node.style.backgroundColor = "blue";
	},Number(second));
}
window.onload = function(argument) {
	// body...
	var pre = document.getElementById("preOrder");
	var mid = document.getElementById("midOrder");
	var last = document.getElementById("lastOrder");
	pre.onclick = function(){
		var data = [];
		var result = [];
		var second = document.getElementById("second").value;
		data.unshift(document.getElementById("container"));
		while(data.length){
			var node = data.shift();
			result.push(node);
			if(node.children.length){
				data.unshift(node.lastElementChild);
				data.unshift(node.firstElementChild);
			}
		}
		changeColor(result);
	}
	mid.onclick = function(){
		var data = [];
		var result = [];
		data.unshift(document.getElementById("container"));
		while(data.length){
			var node = data.shift();
			if(node.children.length){
				data.unshift(node.lastElementChild);
				data.unshift(node);
				data.unshift(node.firstElementChild);
			}else{
				result.push(node);
				result.push(data.shift());
			}
		}
		changeColor(result);
	}
	last.onclick = function(){
		var data = [];
		var result = [];
		data.unshift(document.getElementById("container"));
		while(data.length){
			var node = data.shift();
			result.unshift(node);
			if(node.children.length){
				data.unshift(node.firstElementChild);
				data.unshift(node.lastElementChild);
			}	
		}
		changeColor(result);
	}
}


