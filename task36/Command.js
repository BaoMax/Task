function Command(){
	this.map = new Board();
	this.box = new Box();

	this.map.init(10,10);
	this.map.setBoxPosistion();
}
Command.prototype.exec = function(str){
	var command = this.parse(str);
	command.handler.call(this,command.params);
};
Command.prototype.parse = function(str){
	for(var i = 0;i < this.commands.length;i++){
		var match = str.match(this.commands[i].pattern);
		if(match){
			match.shift();
			return {handler:this.commands[i].handler,params:match};
		}
	}
	return false;
};
Command.prototype.commands = [
	{
		"pattern":/^GO(\s+(\d+))?$/,
		"handler":function(){
			var params = arguments[0];
			var num = params[1]?params[1]:1;
			num = parseInt(num,10);
			for(var i = 0;i < num;i++){
				this.go();
			}
		}
	},{
		"pattern":/^TUN (LEF|RIG|BAC)$/,
		"handler": function(){
			var params = arguments[0];
			direction = params[0].toLowerCase();
			var deg = {lef:-90,rig:90,bac:180};
			this.rotate(deg[direction]);
		}
	},{
		"pattern":/^TAR (LEF|RIG|TOP|BOT)(\s+(\d+))?$/,
		"handler":function(){
			var params = arguments[0];
			var direction = params[0].toLowerCase(),step = params[2] || 1;
			var self = this;
			var func = {lef:self.box.goLef,rig:self.box.goRig,top:self.box.goTop,bot:self.box.goBot};
			for(var i = 0;i < step;i++){
				if(this.map.checkPath(direction,1)){
					func[direction].call(self.box);
				}
			}
		}
	},{
		"pattern":/^MOV (LEF|TOP|RIG|BOT)(\s+(\d+))?$/,
		"handler": function(){
			var params = arguments[0];
			var direction = params[0].toLowerCase(),step = params[2] || 1;
			var deg = {lef:270,rig:90,top:0,bot:180};
			var self = this;
			var func = {lef:self.box.goLef,rig:self.box.goRig,top:self.box.goTop,bot:self.box.goBot};
			for(var i = 0;i < step;i++){
				if(this.map.checkPath(direction,1)){
					this.box.setRotate(deg[direction]);
					func[direction].call(self.box);
				}
			}
		}
	},{
		"pattern":/^(BUILD)$/,
		"handler":function(){
			this.map.createWall();
		}
	},{
		"pattern":/^BRU\s+(#[0-9A-Fa-f]{6})$/,
		"handler":function(){
			var params = arguments[0];
			color = params[0];
			this.setColor(color);
		}
	},{
		"pattern":/^MOV TO\s+(\d+),(\d+)$/,
		"handler":function(){
			var params = arguments[0];
			var x = parseInt(params[0],10)-1;
			var y = parseInt(params[1],10)-1;
			var end = {x:x,y:y};
			var deg = {lef:270,rig:90,top:0,bot:180};
			var self = this;
			var func = {lef:self.box.goLef,rig:self.box.goRig,top:self.box.goTop,bot:self.box.goBot};
			var start = this.box.getPosistion();
			var result = this.map.findPath(start,end);
			console.log(result);
			result.forEach(function(item,i){
				item = item.node;
				if(item.x == start.x + 1 && item.y == start.y){
					if(self.map.checkPath("rig",1)){
						self.box.setRotate(deg["rig"]);
						func["rig"].call(self.box);
					}
				}else if(item.x == start.x - 1 && item.y == start.y){
					if(self.map.checkPath("lef",1)){
						self.box.setRotate(deg["lef"]);
						func["lef"].call(self.box);
					}
				}else if(item.x == start.x && item.y == start.y + 1){
					if(self.map.checkPath("bot",1)){
						self.box.setRotate(deg["bot"]);
						func["bot"].call(self.box);
					}
				}else if(item.x == start.x && item.y == start.y - 1){
					if(self.map.checkPath("top",1)){
						self.box.setRotate(deg["top"]);
						func["top"].call(self.box);
					}
				}
				start = item;
			});
		}
	}
];
Command.prototype.rotate = function(deg){
	this.box.rotate(deg);
};
Command.prototype.go = function(){
	var direction = this.box.getDirection();
	if(this.map.checkPath(direction,1)){
		if(direction == "top"){
			this.box.goTop();
		}else if(direction == "rig"){
			this.box.goRig();
		}else if(direction == "bot"){
			this.box.goBot();
		}else if(direction == "lef"){
			this.box.goLef();
		}
	}
};
Command.prototype.setColor = function(color){
	this.map.setColor(color);
};