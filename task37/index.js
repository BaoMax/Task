function dialog(node,title,content){
	node = node || document.body;
	this.dialog = document.createElement("div");
	this.dialog.id = "dialog";
	this.dialog.style.display = "block";
	node.appendChild(this.dialog);
	this.title = title || "这是一个标题";
	this.content = content || "这是内容";
	this.init();
}
dialog.prototype.init = function(){
	var t = document.createElement("div");
	t.className = "title";
	t.innerText = this.title;
	this.dialog.appendChild(t);

	var c = document.createElement("div");
	c.className = "content";
	c.innerText = this.content;
	this.dialog.appendChild(c);

	var b = document.createElement("div");
	b.id = "button";

	var close = document.createElement("button");
	close.id = "close";
	close.innerText = "关闭";
	close.addEventListener("click",this.close.bind(this));
	b.appendChild(close);

	var sure = document.createElement("button");
	sure.id = "sure";
	sure.innerText = "确定";
	sure.addEventListener("click",this.sure.bind(this));
	b.appendChild(sure);
	// b.innerHTML = "<button id='close'>关闭</button><button id='sure'>确定</button>";
	this.dialog.appendChild(b);


	this.dialog.style.transform = "translate(-50%,-50%)";

	this.shadow = document.createElement("div");
	this.shadow.id = "shadow";
	this.shadow.style.display = "block";
	this.shadow.style.width = document.body.scrollWidth + "px";
	this.shadow.style.height = document.body.scrollHeight + "px";
	this.shadow.addEventListener("click",this.close.bind(this));
	document.body.appendChild(this.shadow);
};
dialog.prototype.close = function(){
	this.dialog.style.display = "none";
	this.shadow.style.display = "none";
};
dialog.prototype.sure = function(){
	alert("确定");
	this.close();
};
new dialog(document.getElementById("body"));