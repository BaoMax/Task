// function TreeNode(obj){

// }
var selectNode = null;
function TreeNode(obj){
	this.parent = obj.parentNode;
	this.childs = obj.childs || [];
	this.data = obj.data || "";
	this.treeNode =  obj.childContainer;
	this.selfNode = obj.selfNode;
	this.selfNode.TreeNode = this;
	this.parentContainer = obj.parentContainer;

	this.add = function(text){
		if(text == null)return this;
		if(text == ""){alert("文件名称不能为空");return ;}
		var node = document.createElement("div");
		node.className = "node";
		node.innerHTML = "<i class='hide'></i><span>"+text+"</span><div></div>";
		if(this.isLeaf()){
			this.selfNode.getElementsByTagName("i")[0].className = "show down";
		}
		this.treeNode.appendChild(node);
		this.childs.push(new TreeNode({
			"parentNode":this.treeNode,
			"childs":[],
			"data":text,
			"parentContainer":this.treeNode.parentNode,
			"selfNode":this.treeNode.lastElementChild,
			"childContainer":this.treeNode.lastElementChild.lastElementChild
		}));
		return this;
	}
	this.del = function(){
		this.parent.removeChild(this.selfNode);
		for(var i = 0;i<this.parent.childs.length;i++){
			if(this.parent.childs[i] == this){
				this.parent.childs.splice(i,1);
				break;
			}
		}
		if(this.parent.children.length == 0){
			if(this.parentContainer && this.parentContainer.className == "node"){
				this.parentContainer.getElementsByTagName("i")[0].className = "hide";
			}
		}
	}
	this.toogleShow = function(){
		if(this.isLeaf())return ;
		if(this.treeNode.style.display == "none"){
			this.treeNode.style.display = "block";
			this.selfNode.getElementsByTagName("i")[0].className +=" down";
		}else{
			this.treeNode.style.display = "none";
			this.selfNode.getElementsByTagName("i")[0].className ="show";
		}
	}
	this.isLeaf = function(){
		return !(this.childs.length);
	}
	this.isFolder = function(){
		if(this.treeNode.style.display == "none")return true;
		return false;
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
function addDegeEvent (element,tag,type,handler) {
	addEvent(element,type,function () {
		var e = arguments[0] || window.event;
		var target = e.target;
		if(target && target.nodeName == tag.toUpperCase()){
			handler.call(target,e);
		}
	});
}
var root = document.getElementsByClassName("node")[0];
var element = root.lastElementChild; 
var data = root.getElementsByTagName("span")[0].innerHTML.toString();
var tree = new TreeNode({
	"childContainer":element,
	"parentNode":root.parentNode,
	"childs":[],
	"data":data,
	"parentContainer":null,
	"selfNode":root
});
tree.search = function(text){
	var queue = [];
	queue.push(this);
	var result = [];
	while(queue.length){
		var node = queue.shift();
		if(node.data == text){
			result.push(node);
			// node.selfNode.getElementsByTagName("span")[0].style.color = "red";
			// while(node.parentContainer && node.parentContainer.className == "node"){
			// 	if(node.parentContainer.TreeNode.isFolder()){
			// 		node.parentContainer.TreeNode.toogleShow();
			// 	}
			// 	node = node.parentContainer.TreeNode;
			// }
		}else{
			node.selfNode.getElementsByTagName("span")[0].style.color = "black";
		}
		for(var i = 0;i<node.childs.length;i++){
			queue.push(node.childs[i]);
		}
	}
	return result;
}
tree.add("系统盘").add("文档盘").add("软件盘").add("娱乐盘");
tree.childs[0].add("file1");
addEvent(tree.selfNode,"click",function(){
	var  e = arguments[0] || window.event;
	var target = e.target || e.srcElement;
	var selectNode = target;
	while(selectNode.className != "node"){selectNode = selectNode.parentNode;}
	selectNode.TreeNode.toogleShow();
	menus.style.display = "none";
});
addEvent(document.getElementById("root"),"mouseup",function(e){
	if(e.button == 2){
		menus.style.display = "block";
		menus.style.position = "absolute";
		menus.style.top = event.y + 20 + "px";
		menus.style.left = event.x + 10 + "px";
		selectedNode = e.target;
		while(selectedNode.className != "node"){
			selectedNode = selectedNode.parentNode;
		}
	}
});
addEvent(document.getElementById("root"),"contextmenu",function(event){
	event.preventDefault();
	event.stopPropagation();
});
addDegeEvent(document.getElementById("menus"),"p","click",function(){
	menus.style.display = "none";
	if(this.id == "add"){
			var value = prompt("请输入文件名称:");
			if(value != null){
				selectedNode.TreeNode.add(value);
			}
		}else if(this.id == "del"){
			selectedNode.TreeNode.del();
			selectedNode = null;
		}
});
addEvent(document.getElementById("search"),"click",function(){
	var text = document.getElementById("searchInput").value.trim();
	if(text != ""){
		var result = tree.search(text);
		if(result.length == 0){alert("没有查询的内容！");return ;}
		for(var i = 0;i<result.length;i++){
			var temp = result[i];
			temp.selfNode.getElementsByTagName("span")[0].style.color = "red";
			while(temp.parentContainer && temp.parentContainer.className == "node"){
				if(temp.parentContainer.TreeNode.isFolder()){
					temp.parentContainer.TreeNode.toogleShow();
				}
				temp = temp.parentContainer.TreeNode;
			}
		}
	}
});


// window.onload = function (argument) {
// 	// body...

//     var menus = document.getElementById("menus");
//     var selectedNode = null;
// 	function addEvent(element,type,fun){
// 		if(element.addEventListener){
// 			element.addEventListener(type,fun);
// 		}else if(element.attachEvent){
// 			element.attachEvent("on"+type,fun);
// 		}else{
// 			element["on"+type] = fun;
// 		}
// 	}
// 	function addDegeEvent (element,tag,type,handler) {
// 		addEvent(element,type,function () {
// 			var e = arguments[0] || window.event;
// 			var target = e.target;
// 			if(target && target.nodeName == tag.toUpperCase()){
// 				handler.call(target,e);
// 			}
// 		});
// 	}
// 	function start(event){
// 		if(event.button == 2){
// 			menus.style.display = "block";
// 			menus.style.position = "absolute";
// 			menus.style.top = event.y + 20 + "px";
// 			menus.style.left = event.x + 10 + "px";
// 			selectedNode = this;
// 		}else if(event.button == 0){
// 			menus.style.display = "none";
// 			var node = this.firstElementChild;
// 			if(node && node.nodeName == "SPAN" && node.style.transform == "rotate(90deg)"){
// 				node.style.transform = "rotate(0deg)";
// 			}else if(node && node.nodeName == "SPAN" && node.style.transform == "rotate(0deg)"){
// 				node.style.transform = "rotate(90deg)";
// 			}
// 			[].slice.call(this.children).map(function(x){
// 				if(x.nodeName == "DIV"){
// 					if(x.style.display == "none"){
// 					x.style.display = "block";
// 					}else{
// 						x.style.display = "none";
// 					}
// 				}
// 			});
// 		}
// 	}
// 	function test(event){
// 		event.preventDefault();
// 		event.stopPropagation();
// 	}
// 	function operation(event){
// 		if(this.id == "add"){
// 			var value = prompt("请输入文件名称:");
// 			if(value != null){
// 				var node = document.createElement("div");
// 				node.innerHTML = "<span class='triangle' style='border-left: 8px solid transparent;transform:rotate(90deg);'></span>"+value;
// 				node.setAttribute("tabindex","-1");
// 				var span = selectedNode.firstElementChild;
// 				if(selectedNode.children.length == 1){
// 					span.style.borderLeft = "8px solid blue";
// 				}
// 				selectedNode.appendChild(node);
// 			}
// 		}else if(this.id == "del"){
// 			var span = selectedNode.parentNode.firstElementChild;
// 			if(selectedNode.parentNode.children.length == 2){
// 				span.style.borderLeft = "8px solid transparent";
// 			}
// 			selectedNode.parentNode.removeChild(selectedNode);
// 			selectedNode = null;
// 		}
// 		menus.style.display = "none";
// 	}
// 	function search(root,tagName,value){
// 		var data = [];
// 		data.push(root);
// 		while(data.length){
// 			var node = data.shift();
// 			if(node.children[0] && node.children[0].nextSibling && node.children[0].nextSibling.nodeValue.trim() == value){
// 				node.style.color = "red";
// 				alert("找到了！");
// 				return ;
// 			}
// 			[].slice.call(node.children).map(function(x){
// 				if(x.nodeName == tagName.toUpperCase()){
// 					data.push(x);
// 				}
// 			});
// 		}
// 	}
// 	addEvent(document.getElementById("menus"),"blur",function(){
// 		this.style.display = "none";
// 	});
// 	addEvent(document.getElementById("search"),"click",function(){
// 		var root = document.getElementById("root");
// 		var value = document.getElementById("searchInput").value.trim();
// 		search(root,"div",value);
// 	});
// 	addDegeEvent(document.getElementById("root"),"div","mouseup",start);
// 	addDegeEvent(document.getElementById("root"),"div","contextmenu",test);
// 	addDegeEvent(document.getElementById("menus"),"p","click",operation);
// }