var gameControll = {
	w:320,
	h:568,
	wrap:document.querySelector("#game"),
	stage:document.querySelector("#stage"),
	modal:document.querySelector("#shade"),
	ctx:this.stage.getContext("2d"),
	foodList:[],
	foodNum:0,
	bgSpeed:3,
	bgDiscance:0,
	bgLoop:0,
	requestAnimationFrame:window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame,
	requestAnimationFrameId:null,
	cancelAnimationFrame:window.cancelAnimationFrame || window.webkitCancelAnimationFrame,
	then:new Date(),
	time:0,
	commands:{},
	generateFood:function(num){
		for(var i = 0;i < num;i++){
			var x = Math.random()*(320 - 50),
				type = Math.random()*10 < 3 ? 0 : 1,
				food = new Food(type,x);
			this.foodList.push(food);
		}
	},
	rollBg:function(){
		if(this.bgDiscance >= this.h){
			this.bgLoop = 0;
		}
		this.bgDiscance = ++this.bgLoop*this.bgSpeed;
		this.ctx.drawImage(imageArr['img/bg.jpg'],0,this.bgDiscance,this.w,this.h);
		this.ctx.drawImage(imageArr['img/bg.jpg'],0,this.bgDiscance - this.h,this.w,this.h);
	},
	main:function(){
		this.requestAnimationFrameId = requestAnimationFrame(this.main.bind(this));
		this.ctx.clearRect(0,0,this.w,this.h);
		this.rollBg();
		this.ship.paint();
		this.ship.eat(this.foodList);
		this.drawFood();
		this.drawScore();
		this.time = (new Date()) - this.then;
	},
	drawFood:function(){
		for(var i = 0,l = this.foodList.length; i < l;i += 1){
			var item = this.foodList[i];
			if(item){
				if(item.y >= this.h){
					delete this.foodList[i];
				}else{
					this.foodList[i].paint();
					this.foodList[i].move();
				}
			}
		}
	},
	drawScore :function(){
		this.ctx.drawImage(imageArr['img/scorebg.png'],200,20,100,32);
		this.ctx.drawImage(imageArr['img/heart.png'],200,20,30,32);

		//计分
		this.ctx.fillStyle = "rgb(250,250,250)";
		this.ctx.font = "20px Helvetica";
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";
		this.ctx.fillText(this.foodNum,250,25);
	},
	reset:function(){
		this.left = parseInt(getComputedStyle(this.wrap).marginLeft,10);
		this.top = parseInt(getComputedStyle(this.wrap).marginTop,10);
		this.ship = new Ship();
		this.ship.paint();
		this.bindEvent();
		var self = this;
		this.timer = setInterval(function(){
			var num = Math.floor(Math.random()*3 + 1);
			self.generateFood(1);
		},1000);
	},
	bindEvent:function(){
		this.stage.addEventListener("touchstart",function(e){
			this.ship.move(e);
		}.bind(gameControll));
	}
};
