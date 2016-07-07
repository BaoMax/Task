function valControl(node){
	this.tip = node.querySelector(".tip");
	this.input = node.querySelector("input");

	this.rules = this.input.dataset.rules;
	this.success = this.input.dataset.success;
	this.fail = this.input.dataset.fail;

	this.input.onclick = this.showTip();
	this.input.onblur = this.check();
}
valControl.prototype.showTip = function(){
	var self = this;
	return function(){
		self.tip.innerHTML = self.rules;
		self.tip.className = "tip normal";
	}
}
valControl.prototype.check = function(){
	var self = this;
	return function(){
		
	}
}