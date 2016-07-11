function valControl(node){
	this.tip = node.querySelector(".tip");
	this.input = node.querySelector("input");
	this.label = node.querySelector("label");

	this.rules = this.input.dataset.rules;
	this.success = this.input.dataset.success;
	this.fail = this.input.dataset.fail;

	this.input.onfocus = this.showTip();
	this.input.onblur = this.loseFocus();
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
	var input = self.input;
	var value = input.value;
	var result;
	if(input.dataset.compare){
		var compare = document.getElementById(input.dataset.compare).value;
		result = validator.validate([value,compare],self.validator);
	}else{
		result = validator.validate(value,self.validator);
	}
	return result;
}
valControl.prototype.loseFocus = function(){
	var self = this;
	return function(){
		var result = self.check();
		if(!result.result){
				self.tip.innerHTML = self.label.innerText +  result.msg;
				self.tip.className = "tip danger";
				self.input.className = "danger";
		}else{
				self.tip.innerHTML = self.success;
				self.tip.className = "tip success";
				self.input.className = "success";
		}
		return result;
	}
}	