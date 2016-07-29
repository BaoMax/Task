var agentSign = 0,
	fileSign = 1,
	wallSign = 2;
var gameControll = {
	stage:document.querySelector("#stage"),
	ctx:stage.getContext("2d"),
	w:320,
	h:568,
	sizeArray:[],
	wallList:[],
	drawBg:function(){
		this.ctx.fillStyle = "#ffe6cd";
		this.ctx.fillRect(0,0,this.w,this.h);
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
	main:function(){
		this.drawBg();
		this.agents.paint(this.ctx);
		this.file.paint(this.ctx);
		for(var i = 0;i < 6;i += 1){
			this.generateWall();
		}
		this.drawWall();
	},
	reset:function(){
		this.map = new Map({x:this.w,y:this.h});
		this.agents = new Agents();
		this.agents.setMap(this.map.map);
		this.file = new File();
		this.file.setMap(this.map.map);
		this.sizeArray = [
			{w:30,h:100},
			{w:80,h:30},
			{w:30,h:30},
			{w:30,h:80},
			{w:50,h:20}
		];
	}
};
gameControll.reset.call(gameControll);
gameControll.main.call(gameControll);