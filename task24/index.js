var selectedNode = null;
var flag = false;
function addEvent (element,type,fun) {
	// body...
	if(element.addEventListener){
		element.addEventListener(type,fun);
	}else if(element.attachEvent){
		element.attachEvent("on"+type,fun);
	}else{
		element["on"+type] = fun;
	}
}
function addDegeEvent (element,tag,type,handler){
	addEvent(element,type,function(){
		var e = arguments[0] || window.event;
		var target = e.target;
		if(target && target.nodeName == tag.toUpperCase()){
			handler.call(target,e);
		}
	});
}
function setColor(){
	[].slice.call(document.getElementsByTagName("div")).forEach(function(x){
		x.className = "background-color";
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
		setColor();
		node.className = "come";
	},1000);
}
/**搜索动画演示**/
function searchShow(result,text){
    flag =  true;
    var time = setInterval(function(){
        if(result.length == 0){
            clearInterval(time);
            setColor();
            alert("找不到！");
            flag = false;
            return ;
        }
        var node = result.shift();
        if(node.firstChild && node.firstChild.nodeType == 3 && node.firstChild.nodeValue == text){
           setColor();
           node.className = "find";
           clearInterval(time);
           alert("找到啦！");
           flag = false;
           return ;
        }
        setColor();
        node.className = "come";
    },1000);
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
/**选中函数**/
function select(){
	if(!flag){
		setColor();
		this.className = "selected";
		selectedNode = this;
	}else{
		alert("正在遍历！");
	}
}
/**删除节点**/
function del(){
	if(selectedNode != null){
		selectedNode.parentNode.removeChild(selectedNode);
		selectedNode = null;
	}else{
		alert("请选中一个元素！")
	}
}
/**插入节点**/
function insert(text){
	var node = document.createElement("div");
	node.style.lineHeight = "100%";
	node.style.margin = " 0 10px";
	node.innerHTML = text;
	node.className = "background-color";
	selectedNode.appendChild(node);
}
/**操作函数**/
function operation(){
	if(flag){alert("正在遍历！");return ;}
	if(this.id == "delete"){
		del();
	}else if(this.id == "insert"){
		var text = document.getElementById("nodeValue").value;
		if(text == ""){
			alert("请输入插入节点的内容！");
			return ;
		}else{
			insert(text);
		}
	}
}
window.onload = function(){
	addDegeEvent(document.getElementById("Super"),"div","click",select);
	addDegeEvent(document.getElementById("findSelect"),"button","click",startFind);
	addDegeEvent(document.getElementById("insert-del"),"button","click",operation);
}