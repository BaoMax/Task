var flag = false;

function setColor(color){
	[].slice.call(document.getElementsByTagName("div")).forEach(function(x){
		x.style.backgroundColor = color;
	});
}
/**动画演示**/
function render(result){
    flag = true;
	var time = setInterval(function(){
		if(result.length == 0){
			clearInterval(time);
			setColor("#fff");
            flag = false;
			return ;
		}
		var node = result.shift();
		setColor("#fff");
		node.style.backgroundColor = "blue";
	},1000);
}
/**搜索动画演示**/
function searchShow(result,text){
    flag =  true;
    var time = setInterval(function(){
        if(result.length == 0){
            clearInterval(time);
            setColor("#fff");
            alert("找不到！");
            flag = false;
            return ;
        }
        var node = result.shift();
        if(node.firstElementChild && node.firstElementChild.nodeName == "SPAN" && node.firstElementChild.innerHTML == text){
           setColor("#fff");
           node.style.backgroundColor = "green";
           clearInterval(time);
           alert("找到啦！");
           flag = false;
           return ;
        }
        setColor("#fff");
        node.style.backgroundColor = "blue";
    },1000);
}
/**深度优先**/
function DNF(root,result){
	var data = [];
    var node = root;
    data.unshift(node);
    while(data.length){
    	node = data.shift();
    	result.push(node);
    	for(var i = node.children.length-1;i>=0;i--){
    		if(node.children[i].nodeName == "DIV"){
    			data.unshift(node.children[i]);
    		}
    	}
    }
}
/**广度优先搜索**/
function BNF(root,result){
	var data = [];
    var node = root;
    data.push(node);
    while(data.length){
    	node = data.shift();
    	result.push(node);
    	for(var i = 0;i<node.children.length;i++){
    		if(node.children[i].nodeName == "DIV"){
    			data.push(node.children[i]);
    		}
    	}
    }
}
/**开始搜索**/
function startFind(event){
    if(!flag){
        var value = document.getElementById("textValue").value.toString();
        var result = [];
        var root = document.getElementById("Super");
        if(this.id == "deepth-find"){
            DNF(root,result);
        }else if(this.id == "breadth-find"){
            BNF(root,result);
        }
        if(value == ""){
            render(result);
        }else{
            searchShow(result,value);
        }
    }else{
        alert("正在遍历！");
    }
}
function addEvent(element,type,fun){
    if(element.addEventListener){
        element.addEventListener(type,fun);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,fun);
     }else{
        element["on"+type] = fun;
    }
}
function addDegeEvent(element,tag,type,handler){
    addEvent(element,type,function(){
        var e = arguments[0] || window.event;
         var target = e.target;
        if(target && target.nodeName == tag.toUpperCase()){
            handler.call(target,event);
        }
    });
}
window.onload = function (argument) {
    addDegeEvent(document.getElementById("select"),"button","click",startFind);
}