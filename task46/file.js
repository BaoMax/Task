/**
@class File
@constructor
**/
function File(){
	this.w = 1;
	this.h = 1;
	this.x = gameControll.w/2;
	this.y = gameControll.h - 2 * this.h;

	this.color = "#f4af29";
}
/**
@method 设置文件地图位置	
**/
File.prototype.setMap = function(map){
	for(var i = this.y,l = this.y + this.h;i < l;i += 1){
		for(var j = this.x,ll = this.x + this.w;j < ll;j += 1){
			map[i][j] = fileSign;
		}
	}
};
/**
@method 画文件函数
@param {Context} canvas画笔
**/
File.prototype.paint = function(ctx){
	var x = this.x * gameControll.setp,
		y = this.y * gameControll.setp,
		w = this.w * gameControll.setp,
		h = this.h * gameControll.setp;
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x + w,y);
	ctx.lineTo(x + w/2,y + h);
	ctx.closePath();
	ctx.fill();
};