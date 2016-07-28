function Food(type,left){
	this.spendUptime = 6000;
	this.x = left;
	this.y = -50;
	this.width = 50;
	this.height = 50;
	this.type = type;
	this.speed = 0.04 * Math.pow(1.1,Math.floor(gameControll.time/this.spendUptime));
	this.loop = 0;
	this.pic = this.type === 0 ? imageArr['img/food1.png'] : imageArr['img/food2.png'];
}
Food.prototype.paint = function(){
	gameControll.ctx.drawImage(this.pic,this.x,this.y,this.width,this.height);
};
Food.prototype.move = function(){
	this.y = this.y + (++this.loop)*this.speed;
	this.speed = 0.04 * Math.pow(1.1,Math.floor(gameControll.time/this.spendUptime));
	this.paint();
};