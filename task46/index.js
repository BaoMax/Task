var agentSign = 0,
	fileSign = 1,
	wallSign = 2;
var gameControll = {
	stage:document.querySelector("#stage"),
	ctx:stage.getContext("2d"),
	w:320 / 20,
	h:560 / 20,
	setp:20,
	sizeArray:[],
	wallList:[],
	level:1,
	drawBg:function(){
		var w = this.w * this.setp,
			h = this.h * this.setp;
		this.ctx.fillStyle = "#ffe6cd";
		this.ctx.fillRect(0,0,w,h);
	},
	generateWall:function(){
		var num = Math.floor(Math.random()*5),
			size = this.sizeArray[num],
			x = Math.floor(Math.random()*(this.w - size.w)),
			y = Math.floor(Math.random()*(this.h - size.h)),
			wall = null;
		while(!this.isRange(x,y,size.w,size.h)){
			num = Math.floor(Math.random()*5);
			size = this.sizeArray[num];
			x = Math.floor(Math.random()*(this.w - size.w));
			y = Math.floor(Math.random()*(this.h - size.h));
		}
		wall = new Wall(x,y,size.w,size.h);
		wall.setMap(this.map.map);
		this.wallList.push(wall);
	},
	isRange:function(x,y,w,h){
		var map = this.map.map;
		for(var i = y,l = y + h;i < l;i += 1){
			for(var j = x,ll = x + w;j < ll;j += 1){
				if(map[i][j] !== undefined){
					return false;
				}
			}
		}
		return true;
	},
	drawWall:function(){
		for(var i = 0,l = this.wallList.length;i < l;i += 1){
			this.wallList[i].paint(this.ctx);
		}
	},
	bindEvent:function(){
		this.stage.addEventListener("touchend",function(e){
			var x = Math.round(e.changedTouches[0].clientX / this.setp) - 1,
				y = Math.round(e.changedTouches[0].clientY / this.setp) - 1;
			if(this.map.map[y][x] === 2){
				return ;
			}
			var path = this.map.findPath({x:this.agents.x,y:this.agents.y},
								{x:x,y:y});
			for(var i = 0,l = path.length; i < l;i += 1){
				this.agents.x = path[i].node.x;
				this.agents.y = path[i].node.y;
				this.main();
			}
			if(this.agents.x == this.file.x && this.agents.y == this.file.y){
				alert("游戏通关！");
				this.reset();
				this.main();
			}
		}.bind(this));
	},
	main:function(){
		this.drawBg();
		this.agents.paint(this.ctx);
		this.file.paint(this.ctx);
		this.drawWall();
	},
	reset:function(){
		this.map = new Map({x:this.w,y:this.h});
		this.agents = new Agents();
		this.agents.setMap(this.map.map);
		this.file = new File();
		this.file.setMap(this.map.map);
		this.sizeArray = [
			{w:2,h:4},
			{w:2,h:2},
			{w:4,h:3},
			{w:4,h:4},
			{w:3,h:1}
		];
		for(var i = 0;i < 5*this.level;i += 1){
			this.generateWall();
		}
	}
};
gameControll.reset.call(gameControll);
gameControll.main.call(gameControll);
gameControll.bindEvent.call(gameControll);