/**
@class 对话框类
@constructor
**/
function Modal () {
	this.shade = document.createElement("div");
	this.dialog = document.createElement("div");

	this.init();
}
Modal.prototype.init = function(){
	this.shade.className = "shade";
	this.dialog.className = "dialog";
	this.shade.appendChild(this.dialog);
	this.shade.onclick = this.close.bind(this);

	document.body.appendChild(this.shade);
};
Modal.prototype.setHTML = function(html){
	this.dialog.innerHTML = html;
	return this;
};
Modal.prototype.open = function(){
	this.shade.style.height = document.body.scrollHeight + "px";
	this.shade.style.width = document.body.scrollWidth + "px";
	this.dialog.style.display = "block";
	this.shade.style.display = "block";
	return this;
};
Modal.prototype.close = function(){
	this.dialog.style.display = "none";
	this.shade.style.display = "none";
	return this;
};
