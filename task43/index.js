function createImag(wrap,imgs){
	this.img = imgs;
	this.wrap = wrap;

	this.setPosistion();
}
createImag.prototype.setPosistion = function(){
	var length = this.img.length,
		div = document.createElement("div"),
		size = {},
		str = "",
		self = this;
	this.wrap.appendChild(div);
	switch(length){
		case 1:
			size = this.imgOne(div);
		break;
		case 2:
			size = this.imgTwo(div);
		break;
		case 3:
			size = this.imgThree(div);
		break;
		case 4:
			size = this.imgFour(div);
		break;
		case 5:
			size = this.imgFive(div);
		break;
		case 6:
			size = this.imgSix(div);
		break;
		default:break;
	}
	size.forEach(function(item,i){
		str = str + "<img class='" + item.class + "' width='" + item.width + "' height = '" + item.height + "' src='" + self.img[i] + "'>";
	});
	div.innerHTML = str;
};
createImag.prototype.imgOne = function(div){
	return [{
		width:div.clientWidth,
		height:div.clientHeight
	}];
};
createImag.prototype.imgTwo = function(div){
	return [{
		width:div.clientWidth,
		height:div.clientHeight
	},{
		width:div.clientWidth,
		height:div.clientHeight,
		class:"img-two-right"
	}];
};
createImag.prototype.imgThree = function(div){
	return [{
			width:div.clientWidth - div.clientHeight*0.5,
			height:div.clientHeight
		},{
			width:div.clientHeight*0.5,
			height:div.clientHeight*0.5
		},{
			width:div.clientHeight*0.5,
			height:div.clientHeight*0.5
		}
	];
};
createImag.prototype.imgFour = function(){
	var div = document.createElement("div"),
		str = "";
	str = "<img width='50%' height='50%' style='top:0px;left:0px' src='" + this.img[0] + "'>";
	str += "<img width='50%' height='50%' style='top:0px;right:0px' src='" + this.img[1] + "'>";
	str += "<img width='50%' height='50%' style='top:50%;left:0px' src='" + this.img[2] + "'>";
	str += "<img width='50%' height='50%' style='top:50%;right:0px' src='" + this.img[3] + "'>";
	div.innerHTML = str;
	this.wrap.appendChild(div);
};
createImag.prototype.imgFive = function(){
	var div = document.createElement("div"),
		str = "";
	str = "<img width='66.7%' height='66.7%' style='top:0px;left:0px' src='" + this.img[0] + "'>";
	str += "<img width='33.3%' height='33.3%' style='top:66.7%;left:0px' src='" + this.img[1] + "'>";
	str += "<img width='33.3%' height='33.3%' style='top:66.7%;left:33.3%' src='" + this.img[2] + "'>";
	str += "<img width='50%' height='50%' style='top:50%;right:0px' src='" + this.img[3] + "'>";
	div.innerHTML = str;
	this.wrap.appendChild(div);
};
var c1 = new createImag(document.body,["img/tupian01.jpg"]),
	c2 = new createImag(document.body,["img/tupian01.jpg","img/tupian02.jpg"]),
	c3 = new createImag(document.body,["img/tupian01.jpg","img/tupian02.jpg","img/tupian03.jpg"]);
	// c4 = new createImag(document.body,["img/tupian01.jpg","img/tupian02.jpg","img/tupian03.jpg","img/tupian04.jpg"]);