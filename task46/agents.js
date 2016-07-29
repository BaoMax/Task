/**
@class Agents
@constructor
**/
function Agents(){
	this.w = 20;
	this.h = 20;
	this.x = gameControll.w/2 - this.w/2;
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
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.arc(this.x + this.w/2,this.y + this.h/2,this.w/2,0,Math.PI*2);
	ctx.closePath();
	ctx.fill();
};
/**
@method 特工移动函数
**/
Agents.prototype.move = function(){

};