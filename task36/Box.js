function Box(){
	this.box = document.querySelector("#box");
	this.element = document.querySelector("span");
}
Box.prototype.setPosistion = function(row,col){
	this.box.style.top = (row + 1)*this.element.clientHeight + "px";
	this.box.style.left = (col + 1)*this.element.clientWidth + "px";
}
/**
设置方块旋转
@param {deg} 旋转角度
**/
Box.prototype.rotate = function(deg){
	var degree = parseInt(this.box.style.rotate.match(/[-]*\d+/));
	this.box.style.rotate = "rotateZ(" + ((degree + deg)%360) +"deg)";
}
/**
设置方块上移
**/
Box.prototype.goTop = function(){
	var top = parseInt(this.box.style.top);
	this.box.style.top = (top - parseInt(this.element.clientHeight)) + "px";
}
/**
设置方块下移
**/
Box.prototype.goBot = function(){
	var top = parseInt(this.box.style.top);
	this.box.style.top = (top + parseInt(this.element.clientHeight)) + "px";
}
/**
设置方块左移
**/
Box.prototype.goLef = function(){
	var left = parseInt(this.box.style.left);
	this.box.style.left = (left - parseInt(this.element.clientWidth)) + "px";
}
/**
设置方块右移
**/
Box.prototype.goRig = function(){
	var left = parseInt(this.box.style.left);
	this.box.style.left = (left + parseInt(this.element.clientWidth)) + "px";
}
/**
返回方块的位置
**/
Box.getPosistion = function(){
	var row = Math.round(parseInt(this.box.style.top)/parseInt(this.element.clientHeight));
	var col = Math.round(parseInt(this.box.style.top)/parseInt(this.element.clientHeight));
	return {"x":col,"y":row};
}