var canvasWidth = 600;//画布宽度
var canvasHeight = 600;//画布高度
var center = new Point(300,300);//画布中心点
var text = new Point(-10,5);//文本位置
var starRadius = 120;//星球半径
var starStyle = 'blue';//星球颜色
var setp = 40;//轨道距离


var lineStyle = 'white';//轨道颜色
var lines = [];//轨道数组
s
var textStyle = 'black';//字体颜色

// var DEFAULT_CHARGRING = 3;
// var DEFAULT_DIS = 2;
// var DEFAULT_DEGREE = 20;
var framTime = 1000;
var sendTime = 300;

var requestAnimaton = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
var timer = null;
var consoleTab = new ConsoleTab();
var energyModel = [
	{"model":"前进号","speed":3,"disCharge":5},
	{"model":"奔腾号","speed":5,"disCharge":7},
	{"model":"超越号","speed":8,"disCharge":9}
];
var powerModel = [
	{"model":"劲能型","charge":2},
	{"model":"光能型","charge":3},
	{"model":"永久型","charge":7}
];



/**坐标点类**/
function Point(x,y){
	this.x = x || 0;
	this.y = y || 0;
}
/**轨道类**/
function Line(r,p,style){
	this.radius = r || 0;
	this.style = style || 'white';
	this.start = new Point(p.x,p.y);
}
/**轨道工厂**/
function LineFactory(){
	this.create = function(r,p){
		return new Line(r,p);
	}
}
/**生成轨道**/
var lineFactory = new LineFactory();
for(var i = 1;i <= 4;i++){
	var r = starRadius+i*setp;
	var p = new Point(center.x,center.y-r);
	lines.push(lineFactory.create(r,p));
}
/**
控制台显示
**/
function ConsoleTab(){
	this.show = function(flg,msg){
		var node = document.createElement("p");
		if(flg){
			node.style.color = "#fff";
		}
		node.innerHTML = msg;
		document.getElementById("consoleTab").appendChild(node);
	}
}


/**
飞船类
@state:飞船的状态
@width：飞船宽度
@height：飞船高度
@powerStyle：飞船颜色
@tiredStyle：飞船耗能颜色
@line：轨道路线
@degree：角度
@percent：能量百分比
@create：创建函数
@run:运行函数
@destroy:自爆函数
@stop：停止函数
**/
function Ship (line,charge,disCharge,speed,degree,percent,width,height,powerStyle,tiredStyle) {
	// body...
	this.state = "stop";
	this.width = width || 60;
	this.height = height || 30;
	this.powerStyle = powerStyle || 'green';
	this.tiredStyle = tiredStyle || 'yellow';
	this.line = line || 0;
	this.degree = degree || 0;
	this.percent = percent || 100;
	this.charge = charge || 2;
	this.disCharge = disCharge || 5;
	this.speed = speed || 3;
	this.mediator = null;
	this.timer = null;
}
/**能源系统**/
Ship.prototype.energySystem = function(){
	/**充电**/
	var self = this;
	var charging = function(){
		var timer = setInterval(function(){
			if(self.state == "run" || self.state == "destroy"){
				clearInterval(timer);
				return false;
			}
			if(self.percent + self.charge >= 100){
				self.percent = 100;
				clearInterval(timer);
				return false;
			}
			self.percent = self.percent + self.charge;
			return true;
		},framTime);
	};
	var disCharging = function(){
		var timer = setInterval(function(){
			if(self.state == "stop" || self.state == "destroy"){
				clearInterval(timer);
				return false;
			}
			if(self.percent - self.disCharge<= 0){
				self.percent = 0;
				self.stateManager().changeState("stop");
				clearInterval(timer);
				return false;	
			};
			self.percent = self.percent - self.disCharge;
		},framTime);
	}
	return {
		charging:charging,
		disCharging:disCharging
	};
}
/**动力系统**/
Ship.prototype.powerSystem = function(){
	var self = this;
	var run = function(){
		self.timer = setInterval(function(){
			if(self.degree >= 360)self.degree -= 360;
			self.degree = self.degree + self.speed;
		},framTime);
	}
	var stop = function(){
		clearInterval(self.timer);
	}
	return {
		run:run,
		stop:stop
	};	
}
/**状态管理**/
Ship.prototype.stateManager = function(){
	var self = this;
	var states = {
		run : function(){
			self.state = "run";
			self.powerSystem().run();
			self.energySystem().disCharging();
			consoleTab.show(true,"轨道"+(self.line+1)+"飞船开始飞行.....");
		},
		stop : function(){
			self.state = "stop";
			self.powerSystem().stop();
			self.energySystem().charging();
			consoleTab.show(true,"轨道"+(self.line+1)+"飞船停止飞行.....");
		},
		destroy : function(){
			self.state = "destroy";
			self.mediator.remove(self);
			consoleTab.show(true,"轨道"+(self.line+1)+"飞船自毁.....");
		}
	}
	var changeState = function(state){
		if(states[state]){
			states[state]();
		}
	}
	return {
		changeState:changeState
	}
}
/**接受信号**/
Ship.prototype.signalManage = function(){
	var self = this;
	var receive = function(msg,from){
		if(self.line == msg.id && self.state != msg.command){
			self.stateManager().changeState(msg.command);
		}
	}
	return {
		receive:receive
	}
}
/**
指挥官类
@create:创建飞船函数
@run:飞船运行函数
@stop：飞船停止飞行函数
@destroy：飞船自毁函数
**/
function Command(){
	this.name = "command";
	this.mediator = null;
}	
Command.prototype = {
	send:function(msg,energy,power,to){
		this.mediator.send(this.mediator.adapter.encode(msg),this,energy,power,to);
	}
}
/**
按钮点击事件处理
**/
function buttonHandler(Command){
	var targets = document.getElementById("command").getElementsByTagName("div");
	for (var i = 0;i < targets.length; i++) {
		(function(i){
			targets[i].onclick = function(e){
				var id = i;
				if(e.target.tagName == "BUTTON"){
					var command = e.target.getAttribute("data-type");
					switch(command){
						case "create":
						var parentNode = e.target.parentElement;
						var selects = parentNode.getElementsByTagName("select");
						var energy = selects[0].options[selects[0].selectedIndex].value;
						var power = selects[1].options[selects[0].selectedIndex].value;
						selects[0].setAttribute("disabled","true");
						selects[1].setAttribute("disabled","true");
						e.target.innerHTML = "自毁";
						e.target.setAttribute("data-type","destroy");
						break;
						case "run":
						e.target.innerHTML = "停止";
						e.target.setAttribute("data-type","stop");
						break;
						case "stop":
						e.target.innerHTML = "飞行";
						e.target.setAttribute("data-type","run");
						break;
						case "destroy":
						var parentNode = e.target.parentElement;
						var selects = parentNode.getElementsByTagName("select");
						selects[0].removeAttribute("disabled");
						selects[1].removeAttribute("disabled");
						e.target.innerHTML = "创建";
						e.target.setAttribute("data-type","create");
						break;
					}
					Command.send({
						'id':id,
						'command':command
					},energy,power);
				}
			};
		})(i);
	};
}
/**
信息传输类
@send：发送函数
@register：注册函数
@remove：自爆函数
@create：创建飞船函数
@getShips：获取飞船函数
**/
function Mediator(){
	var ships = [];
	var commander = null;
	return {
		register:function(obj){
			if(obj instanceof Command){
				commander = obj;
				obj.mediator = this;
			}else if(obj instanceof Ship){
				ships[obj.line] = obj;
				obj.mediator = this;
			}
		},
		send:function(msg,from,to){
			var self = this;
			setTimeout(function(){
				var flg = Math.floor(Math.random()*10) > 4 ?true:false;
				if (flg){
					if(to){
						to.receive(msg,from);
					}else{
						if(msg.command == "create"){
							self.create(msg);
							consoleTab.show(flg,"轨道"+(msg.id+1)+"创建飞船成功.....");
						}
						for(key in ships){
							if(ships[key] !== from){
								ships[key].signalManage().receive(msg,from);
							}
						}
					}
				}else{
					consoleTab.show(flg,"丢包！命令发送失败！");
				}
			},sendTime);
			// var flg = Math.floor(Math.random()*10) > 4 ?true:false;
			// if (flg){
			// 	if(to){
			// 		to.receive(msg,from);
			// 	}else{
			// 		if(msg.command == "create"){
			// 			this.create(msg);
			// 			consoleTab.show(flg,"轨道"+(msg.id+1)+"创建飞船成功.....");
			// 		}
			// 		for(key in ships){
			// 			if(ships[key] !== from){
			// 				ships[key].signalManage().receive(msg,from);
			// 			}
			// 		}
			// 	}
			// }else{
			// 	consoleTab.show(flg,"丢包！命令发送失败！");
			// }
		},
		create:function(msg){
			if(ships[msg.id] == undefined){
				var ship = new Ship(msg.id);
				this.register(ship);
				return true;
			}
			return false;
		},
		remove:function(obj){
			if(obj instanceof Ship){
				return delete ships[obj.line];
			}
			return false;
		},
		getShips:function(){
			return ships;
		}
	};
}

/**
BUS新的传输介质
**/
function BUS(){
	var mediator = Mediator.call(this);

	var adapter = {
		//解密
		decode:function(msg){
			var id = parseInt(msg.substring(0,4), 2);
			var command = msg.substring(4);
			switch(command){
				case "0000":command = "create";break;
				case "0001":command = "run";break;
				case "0010":command = "stop";break;
				case "0011":command = "destroy";break;
			}
			return {
				"id":id,
				"command":command
			};
		},
		//加密
		encode:function(msg){
			var id = (Number(msg.id)).toString(2);
			switch(id.length){
				case 1:id = "000" + id;break;
				case 2:id = "00" + id;break;
				case 3:id = "0" + id;break;
				case 4:break;
			}
			var command = msg.command;
			switch(command){
				case "create":command = "0000";break;
				case "run":command = "0001";break;
				case "stop":command = "0010";break;
				case "destroy":command = "0011";break;
			}
			return id + command;
		}
	}; 
	var create = function(id,energy,power){
		var ships = mediator.getShips();
		if(ships[id] == undefined){
			var charge = powerModel[power].charge;
			var disCharge = energyModel[energy].disCharge;
			var speed = energyModel[energy].speed;
			var ship = new Ship(id,charge,disCharge,speed);
			this.register(ship);
			return true;
		}
		return false;
	}
	var send = function(msg,from,energy,power,to){
		var self = this;
		var ships = mediator.getShips();
		var msg = adapter.decode(msg);
		var timer = setInterval(function(){
			var flg = Math.floor(Math.random()*10) > 2 ?true:false;
			if (flg){
				clearInterval(timer);
				if(to){
					to.receive(msg,from);
				}else{
					// var text = adapter.decode(msg);
					if(msg.command == "create"){
						self.create(msg.id,energy,power);
						consoleTab.show(flg,"轨道"+(msg.id+1)+"创建飞船成功.....");
					}
					for(key in ships){
						if(ships[key] !== from){
							ships[key].signalManage().receive(msg,from);
						}
					}
				}
			}else{
				consoleTab.show(flg,"丢包！命令发送失败！");
			}
		},sendTime);
	};
	return {
		"create":create,
		"adapter":adapter,
		"send":send,
		"register":mediator.register,
		"remove":mediator.remove,
		"getShips":mediator.getShips

	}
}

function AnimUtil(){
	this.mediator = null;
	/**画背景**/
	(function (){
		var canvas = document.getElementById("background");
		var context = canvas.getContext("2d");

		context.clearRect(0,0,canvasWidth,canvasHeight); // clear canvas
		context.translate(0,0);
		//darw star
		context.fillStyle = starStyle;
		context.beginPath();
		context.arc(center.x,center.y,starRadius,0,2*Math.PI,true);
		context.closePath();
		context.fill();

		//draw line
		for (var i = 0; i < lines.length; i++) {
			context.strokeStyle = lines[i].style;
			context.beginPath();
			context.arc(center.x,center.y,lines[i].radius,0,2*Math.PI,true);
			context.closePath();
			context.stroke();
		};
	})();
	/**画船矩形**/
	function drawRoundRect (context,ship) {
		// body...
		var powerWidth = Number(ship.width*ship.percent/100).toFixed(2);
		var tiredWidth = Number(ship.width-powerWidth).toFixed(2);

		var x = Number(-ship.width/2).toFixed(2);
		var y = Number(-ship.height/2).toFixed(2);
		context.fillStyle = ship.powerStyle;
		context.fillRect(x,y,powerWidth,ship.height);

		x = Number(Number(x) + Number(powerWidth)).toFixed(2);
		y = Number(y).toFixed(2);
		context.fillStyle = ship.tiredStyle;
		context.fillRect(x,y,tiredWidth,ship.height);

		context.fillStyle = textStyle;
		context.fillText(ship.percent+"%",text.x,text.y);
	}
	/**画飞船**/
	function drawShip(ships){
		var canvas = document.getElementById("screen");
		var context = canvas.getContext("2d");

		context.clearRect(0,0,canvasWidth,canvasHeight); // clear canvas
		context.translate(0,0);

		for (var i = 0; i < lines.length && i < ships.length; i++) {
			context.save();
			var ship = ships[i];
			if(ship && (ship.state == "run" || ship.state == "stop")){
				line = lines[ship.line];
				var degree = ship.degree*Math.PI/180;
				var x = line.start.x - line.radius*Math.sin(degree);
				var y = line.start.y + line.radius - line.radius*Math.cos(degree);
				context.save();
				context.translate(x,y);
				context.rotate(-1*degree);
				drawRoundRect(context,ship);
				context.restore();
				console.log(ship.degree);
			}
		};
	}

	var setMediator = function(_mediator){
		console.log(this);
		mediator = _mediator;
	}
	var onDraw = function(){
		requestAnimaton(onDraw);
		drawShip(mediator.getShips());
	}
	return {
		onDraw:onDraw,
		setMediator:setMediator
	};
}

function init(){
	var commander = new Command();
	var mediator = new BUS();
	var animUtil = new AnimUtil();
	buttonHandler(commander);
	mediator.register(commander);
	animUtil.setMediator(mediator);
	animUtil.onDraw();
	
}

init();