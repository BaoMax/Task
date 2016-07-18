function Textarea(){
	this.textarea = document.querySelector('#command');
	this.listener = document.querySelector('#value');
	this.line = document.querySelector('#line');
	this.output = document.querySelector('#output');
}
Textarea.prototype.createLineNode = function(lineNum){
	var span = document.createElement("span");
	span.innerHTML = lineNum;
	this.line.appendChild(span);
};
Textarea.prototype.removeLineNode = function(){
	this.line.removeChild(this.line.lastElementChild);
};
Textarea.prototype.setRed = function(index){
	var node = this.line.getElementsByTagName("span")[index];
	node.style.backgroundColor = "red";
};
Textarea.prototype.setLine = function(){
	this.listener.value = this.textarea.value;
	var lineHeight = getComputedStyle(this.textarea).lineHeight;
	var scrollHeight = this.listener.scrollHeight;
	var count = Math.round( parseInt(scrollHeight)/parseInt(lineHeight) );
	var items = this.line.getElementsByTagName("span");
	if( count < items.length ){
		while(count < items.length){
			this.removeLineNode();
		}
	}else if( count > items.length ){
		while( count > items.length ){
			this.createLineNode(items.length + 1);
		}
	}
	this.output.innerHTML = "当前行数：" + count;
};
Textarea.prototype.focus = function(){
	var spanList = this.line.getElementsByTagName("span");
	if(spanList.length == 0){
		this.createLineNode(1);
		this.output.innerHTML = "当前行数：1";
	}
};
Textarea.prototype.scroll = function(){
	this.line.scrollTop = this.textarea.scrollTop;
};
Textarea.prototype.clear = function(){
	this.textarea.value = "";
	this.listener.value = "";
	this.setLine();
	this.focus();
};
Textarea.prototype.getValue = function(){
	var text = this.textarea.value
	return text.split("\n");
};