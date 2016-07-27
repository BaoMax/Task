function Ship(){
	this.width = 80;
	this.height = 80;
	this.left = gameControll.w/2 - this.width/2;
	this.top = gameControll.h - this.height;

	this.ship = imageArr["img/player.png"];
	this.paint = function(){
		gameControll.ctx.drawImage(this.ship,this.left,this.top,this.width,this,height);
	};
	this.eat = function(){
		
	}
}