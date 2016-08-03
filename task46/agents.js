/**
@class Agents
@constructor
**/
function Agents(){
	this.w = 1;
	this.h = 1;
	this.x = gameControll.w/2;
	this.y = this.h;

	this.color = "#44b811";
}
/**
@method 设置特工地图位置
**/
Agents.prototype.setMap = function(map){
	for(var i = this.y,l = this.y + this.h;i < l;i += 1){
		for(var j = this.x,ll = this.x + this.w;j < ll;j += 1){
			map[i][j] = agentSign;
		}
	}
};
/**
@method 画特工函数
@param {Context} canvas画笔
**/
Agents.prototype.paint = function(ctx){
	var x = this.x * gameControll.setp,
		y = this.y * gameControll.setp,
		h = this.h * gameControll.setp,
		w = this.w * gameControll.setp;
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.arc(x + w/2,y + h/2,w/2,0,Math.PI*2);
	ctx.closePath();
	ctx.fill();
};
