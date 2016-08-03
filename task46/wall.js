/**
@class Wall
@constructor
@param {Number} 墙离左边距离
@param {Number} 墙离右边距离
@param {Number} 墙的宽度
@param {Number} 墙的高度
**/
function Wall(x,y,w,h){
	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 1;
	this.h = h || 1;

	this.color = "#2e1e1e";
}
/**
@method 设置特工地图位置
**/
Wall.prototype.setMap = function(map){
	for(var i = this.y,l = this.y + this.h;i < l;i += 1){
		for(var j = this.x,ll = this.x + this.w;j < ll;j += 1){
			map[i][j] = wallSign;
		}
	}
};
/**
@method 画墙的函数
@param {Context} canvas画笔
**/
Wall.prototype.paint = function(ctx){
	var x = this.x * gameControll.setp,
		y = this.y * gameControll.setp,
		w = this.w * gameControll.setp,
		h = this.h * gameControll.setp;
	ctx.fillStyle = this.color;
	ctx.fillRect(x,y,w,h);
};