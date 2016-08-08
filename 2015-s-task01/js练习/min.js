function getAttrElement(node,attr,value){
	if(node.nodeName == "#document"){
		node = node.children[0];
	}
	if(node.getAttribute(attr) === value){
		return node;
	}
	for(var i = 0,l = node.childElementCount;i < l;i += 1){
		var item = node.children[i];
		var result = getAttrElement(item,attr,value);
		if(result){
			return result;
		}
	}
	return false;
}
function hasAttrElement(node,attr){
	if(node.nodeName == "#document"){
		node = node.children[0];
	}
	if(node.getAttribute(attr)){
		return node;
	}
	for(var i = 0,l = node.childElementCount;i < l;i += 1){
		var item = node.children[i];
		var result = hasAttrElement(item,attr);
		if(result){
			return result;
		}
	}
	return false;
}
function $(selector){
	var list = selector.split(/\s+/);
	var node = document;
	for(var i = 0,l = list.length;i < l;i += 1){
		var item = list[i];
		if((/^\#\w+$/).test(item)){
			node = node.getElementById(item.substring(1));
		}else if((/^\.\w+/).test(item)){
			node = node.getElementsByClassName(item.substring(1))[0];
		}else if((/^\[.+=.+\]$/).test(item)){
			var value = item.substring(1,item.length - 1).split("=")[1];
			var attr = item.substring(1,item.length - 1).split("=")[0];
			node = getAttrElement(node,attr,value);
		}else if((/^\[.+\]$/).test(item)){
			var attr = item.substring(1,item.length - 1);
			node = hasAttrElement(node,attr);
		}else if((/^\w+$/).test(item)){
			node = node.getElementsByTagName(item)[0];
		}
	}
	return node;
}
$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
    if(element.addEventListener) {
    element.addEventListener(event,listener,false);
    } else if(element.attachEvent) {
    element.attachEvent("on" + event,listener);
    } else {
    element["on" + event] = listener;
    }
}

// 例如：
function clicklistener(event) {
	var target = event.target || window.target;
	console.log(event);
    console.log(target);
}
addEvent($("#dom"), "click", clicklistener);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement
    if(element.removeEventListener){
		element.removeEventListener(event,listener,false);
    }else if(element.detachEvent){
		element.detachEvent("on" + event,listener);
    }else{
		element["on" + event] = null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
    if(element.addEventListener){
		element.addEventListener("click",listener,false);
    }else if(element.attachEvent){
		element.attachEvent("onclick",listener);
    }else{
		element.onclick = listener;
    }
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
    if(element.addEventListener){
		element.removeEventListener("keyup",
			function(event){
				listener.call(window);
		},false);
    }else if(element.attachEvent){
		element.attachEvent("onkeyup",
			function(event){
				listener.call(window);
		});
    }else{
		element.onkeyup = function(event){
			if(event.charCode == 13){
				listener.call(window);
			}
		};
   }
}