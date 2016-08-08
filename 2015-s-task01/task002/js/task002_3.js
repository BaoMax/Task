function Banner(opt){
	var timer = null,
		self = this;
	this.banner = opt.banner;
	this.pointList = opt.pointList;
	this.width = opt.width;
	this.height = opt.height;
	this.imgNum = opt.imgNum;
	this.order = !!opt.order;
	this.loop = !!opt.loop;
	this.period = opt.period || 5;
	this.currentImg = this.order ? 0: this.imgNum - 1;
	this.banner.style.marginLeft = -1*this.currentImg * this.width + "px";
	this.setPoint(this.currentImg);
	this.bindEvent();

	timer = setInterval(function(){
		if(self.loop){
			if(self.order){
				self.currentImg += 1;
			}else{
				self.currentImg -= 1;
			}
			self.currentImg = Math.abs(self.currentImg % self.imgNum);
		}else{
			if(self.order){
				self.currentImg += 1;
			}else{
				self.currentImg -= 1;
			}
			self.currentImg = Math.abs(self.currentImg % self.imgNum);
			// if(self.currentImg < 0 || self.currentImg >= self.imgNum){
			// 	clearInterval(timer);
			// 	timer = null;
			// 	return ;
			// }
		}
		self.banner.style.marginLeft = -1*self.currentImg * self.width + "px";
		self.setPoint(self.currentImg);
	},this.period*1000);
}
Banner.prototype.bindEvent= function(){
	for(var i = 0,l = this.pointList.length;i < l;i += 1){
		this.pointList[i].onclick = (function(i){
			var self = this;
			return function(){
				self.setImg(i);
			}
		}).call(this,i);
	}
};
Banner.prototype.setPoint = function(index){
	for(var i = 0,l = this.pointList.length;i < l;i += 1){
		this.pointList[i].className = "round";
	}
	this.pointList[index].className += " selected";
};
Banner.prototype.setImg = function(index){
	this.currentImg = index;
	this.banner.style.marginLeft = -1*this.currentImg * this.width + "px";
	this.setPoint(index);
};