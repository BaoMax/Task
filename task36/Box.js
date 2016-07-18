function Box(){
	this.box = document.querySelector("#box");
	this.element = document.querySelector("span");
}
Box.prototype.setPosistion = function(row,col){
	this.box.style.top = (row + 1)*this.element.clientHeight + "px";
	this.box.style.left = (col + 1)*this.element.clientWidth + "px";
};
/**
设置方块旋转
@param {deg} 旋转角度
**/
Box.prototype.rotate = function(deg){
	var degree = parseInt(this.box.style.transform.match(/[-]*\d+/),10);
	this.box.style.transform = "rotateZ(" + ((degree + deg)%360) +"deg)";
};
Box.prototype.setRotate = function (deg) {
	this.box.style.transform = "rotateZ(" + ((deg)%360) +"deg)";
};
/**
设置方块上移
**/
Box.prototype.goTop = function(){
	var top = parseInt(this.box.style.top,10);
	this.box.style.top = (top - parseInt(this.element.clientHeight,10)) + "px";
};
/**
设置方块下移
**/
Box.prototype.goBot = function(){
	var top = parseInt(this.box.style.top,10);
	this.box.style.top = (top + parseInt(this.element.clientHeight,10)) + "px";
};
/**
设置方块左移
**/
Box.prototype.goLef = function(){
	var left = parseInt(this.box.style.left,10);
	this.box.style.left = (left - parseInt(this.element.clientWidth,10)) + "px";
};
/**
设置方块右移
**/
Box.prototype.goRig = function(){
	var left = parseInt(this.box.style.left,10);
	this.box.style.left = (left + parseInt(this.element.clientWidth,10)) + "px";
};
/**
返回方块的位置
**/
Box.prototype.getPosistion = function(){
	var row = Math.round(parseInt(this.box.style.top,10)/parseInt(this.element.clientHeight,10));
	var col = Math.round(parseInt(this.box.style.left,10)/parseInt(this.element.clientWidth,10));
	return {"x":col-1,"y":row-1};
};
/**
返回方块的方向
**/
Box.prototype.getDirection = function(){
	var degree = parseInt(this.box.style.transform.match(/[-]*\d+/),10);
	switch(degree%360){
		case 0:case -0:return "top";
		case 90:case -270:return "rig";
		case 180:case -180:return "bot";
		case 270:case -90:return "lef";
	}
};
