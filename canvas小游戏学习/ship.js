function Ship(){
	this.width = 80;
	this.height = 80;
	this.x = gameControll.w/2 - this.width/2;
	this.y = gameControll.h - this.height*2;

	this.ship = imageArr["img/player.png"];
	this.paint = function(){
		gameControll.ctx.drawImage(this.ship,this.x,this.y,this.width,this.height);
	};
	this.eat = function(foodList){
		var rx = this.x - this.width/2,
			ry = this.y + this.width/2;
		for(var i = 0,l = foodList.length;i < l;i += 1){
			if(foodList[i]){
				var item = foodList[i],
				itemx = item.x - item.width/2,
				itemy = item.y - item.height/2,
				d = (rx - itemx)*(rx - itemx) + (ry - itemy)*(ry - itemy),
				discance = this.width/2 + item.width/2;
				if(d <= discance*discance){
					delete foodList[i];
					if(item.type == 1){
						gameControll.foodNum += 1;
					}
					else{
						gameControll.cancelAnimationFrame.call(window,gameControll.requestAnimationFrameId);
						gameControll.requestAnimationFrameId = 0;
						clearInterval(gameControll.timer);
						gameControll.modal.style.display = "block";
						return ;
					}
				}
			}
		}
	};
	this.move = function(e){
		this.x = e.changedTouches[0].clientX - this.width/2 - gameControll.left;
		this.y = e.changedTouches[0].clientY - this.height - gameControll.top;

		if(this.x < 0){
			this.x = 0;
		}
		if(this.x > gameControll.w - this.width){
			this.x = gameControll.w - this.width;
		}
		if(this.y < 0){
			this.y = 0;
		}
		if(this.y > gameControll.h - this.height){
			this.y = gameControll.h - this.height;
		}
		this.paint();
	};
}