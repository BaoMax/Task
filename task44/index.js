/**
@class Waterfull 瀑布
@constructor
@param {Object} 配置参数
**/
function Waterfull(obj){
	this.colNum = obj.colNum || 4;
	this.padding = obj.padding || 16;
	this.wrap = obj.wrap || document.querySelector(".waterfull");
	this.count = 0;
	this.init();
}
/**
@method 初始化函数
**/
Waterfull.prototype.init = function(){
	this.createCol();
	// while(i)
	for(var i = 0; i < 100;i += 1){
		var col = this.getMin(),
			item = this.createImg();
		this.cols[col].appendChild(item);
	}
	this.bindEvent();
};
/**
@method 创建列
**/
Waterfull.prototype.createCol = function(){
	this.cols = [];
	for (var i = 0; i < this.colNum; i += 1) {
		var div = document.createElement("div");
		div.className = "col";
		div.style.padding = this.padding + "px";
		div.style.width = (this.wrap.clientWidth - 40)/this.colNum + "px";
		this.wrap.appendChild(div);
		this.cols.push(div);
	}
};
/**
@method 获取高度最小的列
@return 最小高度列下标
**/
Waterfull.prototype.getMin = function(){
	var min = 0,
		height = this.cols[min].clientHeight;
	for (var i = 1; i < this.cols.length; i += 1) {
		if(this.cols[i].clientHeight < height){
			min = i;
			height = this.cols[i].clientHeight;
		}
	}
	return min;
};
/**
@method 添加图片
@param {Number} 第几张图片
@return {Dom Noew} 创建的图片节点
**/
Waterfull.prototype.createImg = function(){
	var img = document.createElement("img"),
		num = this.count,
		div = document.createElement("div"),
		p = document.createElement("p"),
		image = new Image();
	if(num < 10){
		num = "00" + num;
	}else if(num < 100 ){
		num = "0" + num;
	}
	img.setAttribute("src","http://cued.xunlei.com/demos/publ/img/P_" + num + ".jpg");
	image.src =  "http://cued.xunlei.com/demos/publ/img/P_" + num + ".jpg";
	p.innerHTML = "图片" + (this.count + 1);
	img.style.height = image.height  + "px";
	div.appendChild(img);
	div.appendChild(p);
	this.count = this.count + 1;
	return div;
};
/**
@method 绑定事件
**/
Waterfull.prototype.bindEvent = function(){
	var waterfull = document.querySelector(".waterfull");
	this.modal = new Modal();
	waterfull.parentElement.onscroll = function(e){
		var scrollTop = waterfull.parentElement.scrollTop,
			scrollHeight = waterfull.scrollHeight;
		if(scrollHeight*0.7 < scrollTop){
			for(var i = 0;i < this.colNum && this.count < 162;i++){
				var col = this.getMin(),
				item = this.createImg();
				this.cols[col].appendChild(item);
			}
		}
	}.bind(this);
	waterfull.onclick = function(e){
		var target = e.target;
		if(target.nodeName.toUpperCase() == "IMG"){
			var str = target.getAttribute("src");
			this.modal.setHTML("<img src='" + str + "'>").open();
		}
	}.bind(this);
};
/**
**/

var w = new Waterfull({});