/**
@class 木桶布局
@constructor
**/
function Casks(obj){
	this.src = "http://cued.xunlei.com/demos/publ/img/P_";
	this.type = ".jpg";
	this.count = 0;

	this.wrap = obj.wrap || document.querySelector(".casks");
}
Casks.prototype.createLine = function(){
	var imgs = [],
		sum = 0,
		width = this.wrap.clientWidth,
		str = "",
		height = 0;
	for(var i = 0;i < 3;i += 1){
		var temp = new Image(),
			index = this.count;
		if(index < 10){
			index = "00" + index;
		}else if(index < 100){
			index = "0" + index;
		}
		temp.src = this.src + index + this.type;
		sum = sum + temp.width/temp.height;
		imgs.push(temp);
		this.count = this.count + 1;
	}
	while((width/sum)%1 !== 0 && i < 6){
		var temp = new Image(),
			index = this.count;
		if(index < 10){
			index = "00" + index;
		}else if(index < 100){
			index = "0" + index;
		}
		temp.src = this.src + index + this.type;
		sum = sum + temp.width/temp.height;
		imgs.push(temp);
		this.count = this.count + 1;
		i = i + 1;
	}
	height = parseInt(width/sum,10);
	for (var i = 0; i < imgs.length; i++) {
		var tempHeight = height,
			tempWidth = height*imgs[i].width/imgs[i].height;
		str = str + "<img src='" + imgs[i].src + "' width = '" + tempWidth + "' height='" + tempHeight + "'>";
	}
	this.wrap.innerHTML = this.wrap.innerHTML + str;
};
var c = new Casks({});
c.createLine();
c.createLine();
c.createLine();
c.createLine();
c.createLine();
c.createLine();