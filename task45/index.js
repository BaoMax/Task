/**
@class 木桶布局
@constructor
**/
function Casks(obj){
	// this.src = "http://cued.xunlei.com/demos/publ/img/P_";
	// this.type = ".jpg";
	this.count = 0;

	this.images = obj.imgs;
	this.wrap = obj.wrap || document.querySelector(".casks");

	while(this.count < this.images.length){
		this.createLine();
	}
}
/**
@method 获取当前行图片缩放后的宽度和
@param {Array} 图片数组
@param {Number} 缩放后高度
**/
Casks.prototype.getSum = function(imgs,height){
	var sum = 0,
		length = imgs.length;
	for(var i = 0;i < length;i += 1){
		sum = sum + height*imgs[i].width/imgs[i].height;
	}
	return sum;
};
Casks.prototype.initLine = function(){
	var imgs = [],
		sum = 0;
	for(var i = 0;i < 3;i += 1){
		if(this.count == this.images.length){
			break ;
		}
		var temp = this.images[this.count];
		// var temp = new Image(),
		// 	index = this.count;
		// if(index < 10){
		// 	index = "00" + index;
		// }else if(index < 100){
		// 	index = "0" + index;
		// }
		// temp.src = this.src + index + this.type;
		sum = sum + temp.width/temp.height;
		imgs.push(temp);
		this.count = this.count + 1;
	}
	return {
		imgs:imgs,
		sum :sum
	};
};
/**
@method 是否添加图片

**/
Casks.prototype.isAdd = function(imgs,img,sum,width){
	var tempSum = sum,
		tempWidth = 0,
		tempHeight = 0;
	tempSum = tempSum + img.width/img.height;
	tempHeight = parseInt(this.wrap.clientWidth/tempSum,10);
	tempWidth = this.getSum(imgs,tempHeight) + tempHeight*img.width/img.height;
	if(Math.abs(tempWidth - this.wrap.clientWidth) < Math.abs(width - this.wrap.clientWidth)){
		return true;
	}
	return false;
};
Casks.prototype.createImg = function(){
	// var img = new Image(),
	// 	index = this.count;
	// if(index < 10){
	// 	index = "00" + index;
	// }else if(index < 100){
	// 	index = "0" + index;
	// }
	// img.src = this.src + index + this.type;
	return this.images[this.count];
};
Casks.prototype.render = function(imgs,height){
	var str = "";
	for (var i = 0; i < imgs.length; i++) {
		var tempHeight = height,
			tempWidth = height*imgs[i].width/imgs[i].height;
		str = str + "<img src='" + imgs[i].src + "' width = '" + tempWidth + "' height='" + tempHeight + "'>";
	}
	this.wrap.innerHTML = this.wrap.innerHTML + str;
};
Casks.prototype.createLine = function(){
	var obj = this.initLine(),
		sum = obj.sum,
		imgs = obj.imgs,
		width = 0,
		height = parseInt(this.wrap.clientWidth/sum,10),
		img = null,
		i = 3;
	if(this.count == this.images.length){
		this.render(imgs,height);
		return ;
	}
	img = this.createImg();
	width = this.getSum(imgs,height);
	while(i < 6){
		if(this.isAdd(imgs,img,sum,width)){
			imgs.push(img);
			sum = sum + img.width/img.height;
			height = parseInt(this.wrap.clientWidth/sum,10);
			width = this.getSum(imgs,height);
			i = i + 1;
			this.count = this.count + 1;
			if(this.count == this.images.length){
				this.render(imgs,height);
				return ;
			}
			img = this.createImg();
		}else{
			break;
		}
	}
	this.render(imgs,height);
};
function loadImage (num){
	var imgs = [],
		count = 0;
	for(var i = 0;i < num;i += 1){
		var img = new Image(),
			index = i;
		if (index < 10) {
			index = "00" + index;
		}else if(index < 100){
			index = "0" + index;
		}
		img.src = "http://cued.xunlei.com/demos/publ/img/P_" + index + ".jpg";
		imgs.push(img);
		img.onload = function(){
			count = count + 1;
			if(count == num){
				var c = new Casks({imgs:imgs});
			}
		}
	}
}
loadImage(162);
// var imgs = loadImage(),
// 	c = new Casks({imgs:imgs});
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();
// c.createLine();