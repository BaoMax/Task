function getAttrElement(node,attr,value){
	if(node.nodeName == "#document"){
		node = node.children[0];
	}
	if(node.getAttribute(attr) === value){
		return node;
	}
	for(var i = 0,l = node.childElementCount;i < l;i += 1){
		var item = node.children[0];
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
		var item = node.children[0];
		var result = getAttrElement(item,attr);
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
		var sign = item.charAt(0);
		if((/^#\w+$/).test(item)){
			node = node.getElementById(item.substring(1));
		}else if((/^\.\w+/).test(item)){
			node = node.getElementsByClassName(item.substring(1))[0];
		}else if((/^\[.+=.+\]$/).test(item)){
			var value = item.substring(1,item.length - 1).split("=")[1];
			var attr = item.substring(1,item.length - 1).split("=")[0];
			node = getAttrElement(node,attr,value);
		}else if((/^\[.+\]$/).test(item)){
			var attr = item.substring(1,item.length - 1);
			node = getAttrElement(node,attr);
		}else if((/^\w+$/).test(item)){
			node = node.getElementsByTagName(item)[0];
		}
	}
	return node;
}