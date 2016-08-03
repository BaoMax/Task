function $(selector){
	var list = selector.split(/\s+/);
	var node = document;
	for(var i = 0,l = list.length;i < l;i += 1){
		var item = list[0];
		var sign = item.charAt(0);
		if((/^#\w+$/).test(item)){
			node = node.getElementById(item.substring(1));
		}else if((/^.\w+/).test(item)){
			node = node.getElementsByClassName(item.substring(1))[0];
		}else if((/^\[\w+=\w+\]$/).test(item)){
			var value = item.split("=")[1];
			while(node.childElementCount){
				for(var i = 0,l = node.childElementCount;i < l;i += 1){
					var item = node.children[i];
				}
			}
		}else if((/^\[\w+\]$/).test(item)){

		}else if((/^w+$/).test(item)){
			node = node.getElementsByTagName(item)[0];
		}
	}
}