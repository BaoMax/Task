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
		str = str + "<img class='" + item.class + "' style='" + item.style + "' width='" + item.width + "' height = '" + item.height + "' src='" + self.img[i] + "'>";
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
			height:div.clientHeight*0.5,
			style:"top:0px;right:0px"
		},{
			width:div.clientHeight*0.5,
			height:div.clientHeight*0.5,
			style:"top:" + div.clientHeight*0.5 + "px; right:0px"
		}
	];
};
createImag.prototype.imgFour = function(div){
	return [{
		width:div.clientWidth*0.5,
		height:div.clientWidth*0.5,
		style:"top:0px;left:0px"
	},{
		width:div.clientWidth*0.5,
		height:div.clientWidth*0.5,
		style:"top:0px;right:0px"
	},{
		width:div.clientWidth*0.5,
		height:div.clientWidth*0.5,
		style:"top:50%;left:0px"
	},{
		width:div.clientWidth*0.5,
		height:div.clientWidth*0.5,
		style:"top:50%;right:0px"
	}];
};
createImag.prototype.imgFive = function(div){
	return [
		{
			width:div.clientWidth*0.667,
			height:div.clientHeight*0.667,
			style:"top:0px;left:0px"
		},{
			width:div.clientWidth*0.333,
			height:div.clientWidth*0.333,
			style:"top:0px;right:0px"
		},{
			width:div.clientWidth*0.333,
			height:div.clientHeight*0.333,
			style:"top:66.7%;left:0px"
		},{
			width:div.clientWidth*0.333,
			height:div.clientHeight*0.333,
			style:"top:66.7%;left:33.3%"
		},{
			width:div.clientWidth*0.333,
			height:div.clientHeight - div.clientWidth*0.333,
			style:"top:" + div.clientWidth*0.333 + "px;right:0px"
		}
	];
};
createImag.prototype.imgSix = function(div){
	return [
		{
			width:div.clientWidth*0.667,
			height:div.clientHeight*0.667,
			style:"top:0px;left:0px"
		},{
			width:div.clientWidth*0.333,
			height:div.clientHeight*0.333,
			style:"top:0px;right:0px"
		},{
			width:div.clientWidth*0.333,
			height:div.clientHeight*0.333,
			style:"top:33.3%;right:0px"
		},{
			width:div.clientWidth*0.333,
			height:div.clientHeight*0.333,
			style:"top:66.7%;left:0px"
		},{
			width:div.clientWidth*0.333,
			height:div.clientHeight*0.333,
			style:"top:66.7%;left:33.3%"
		},{
			width:div.clientWidth*0.333,
			height:div.clientHeight*0.333,
			style:"top:66.7%;right:0px"
		}
	];
};
var c1 = new createImag(document.body,["img/tupian01.jpg"]),
	c2 = new createImag(document.body,["img/tupian01.jpg","img/tupian02.jpg"]),
	c3 = new createImag(document.body,["img/tupian01.jpg","img/tupian02.jpg","img/tupian03.jpg"]),
	c4 = new createImag(document.body,["img/tupian01.jpg","img/tupian02.jpg","img/tupian03.jpg","img/tupian04.jpg"]),
	c5 = new createImag(document.body,["img/tupian01.jpg","img/tupian02.jpg","img/tupian03.jpg","img/tupian04.jpg","img/tupian05.jpg"]);
	c6 = new createImag(document.body,["img/tupian01.jpg","img/tupian02.jpg","img/tupian03.jpg","img/tupian04.jpg","img/tupian05.jpg","img/tupian06.jpg"]);