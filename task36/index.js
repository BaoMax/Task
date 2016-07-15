var button = document.getElementById("exe");//执行按钮
var clearBtn = document.getElementById("refresh");//清除按钮
var box = document.getElementById("box");//方块
var line = document.getElementById("line");//行数块
var command = document.getElementById("command");//命令区域
var listener = document.getElementById("value");//监听
var borad = document.getElementById("borad");//棋盘
var wall = document.getElementById("wall");//墙
var rows = 10;//棋盘行数
var columns = 10; //棋盘列数
var setp = 40;//个子大小
/**
GO:前进一格
TUN LEF:逆时针旋转90度
TUN RIG:顺时针旋转90度
TUN BAC:顺时针旋转180度
TAR LEF:左移一格
TAR TOP:上移一格
TAR RIG:右移一格
TAR BOT:下移一格
MOV LEF:转向屏幕左侧，并向屏幕左侧移动一格
MOV TOP:转向屏幕上面，并向屏幕上面移动一格
MOV RIG:转向屏幕右侧，并向屏幕右侧移动一格
MOV BOT:转向屏幕下面，并向屏幕下面移动一格
**/
var commandEXE = {
	goHandler : function(){
		var degree = parseInt(box.style.transform.match(/[-]*\d+/)) || 0;
		var col = (parseInt(box.style.left)/setp)-1;
		var row = (parseInt(box.style.top)/setp)-1;
		switch(degree%360){
			case 0:case -0:
				var top = parseInt(box.style.top);
				if(row == 0 || wallSet.isWall(row-1,col))return;
				box.style.top = (top - setp) + "px";
			break;
			case 90:case -270:
				var left = parseInt(box.style.left);
				if(col == 9 || wallSet.isWall(row,col+1))return;
				box.style.left = (left + setp) + "px";
			break;
			case 180:case -180:
				var top = parseInt(box.style.top);
				if(row == 9 || wallSet.isWall(row+1,col))return;
				box.style.top = (top + setp) + "px";
			break;
			case 270:case -90:
				var left = parseInt(box.style.left);
				if(col == 0 || wallSet.isWall(row,col-1))return;
				box.style.left = (left - setp) + "px";
			break;
		}
	},
	rotateHandler : function(deg){
		var degree = parseInt(box.style.transform.match(/[-]*\d+/)) || 0;
		degree = (degree + deg)%360;
		box.style.transform = "rotate(" + degree + "deg)";
	},
	tarHandler : function(type){
		/**
		type:0-上;1-右;2-下;3-左	
		**/
		var col = (parseInt(box.style.left)/setp)-1;
		var row = (parseInt(box.style.top)/setp)-1;
		switch(type){
			case "top":
				var top = parseInt(box.style.top);
				if(row == 0 || wallSet.isWall(row-1,col))return;
				box.style.top = (top - setp) + "px";
			break;
			case "right":
				var left = parseInt(box.style.left);
				if(col == 9 || wallSet.isWall(row,col+1))return;
				box.style.left = (left + setp) + "px";
			break;
			case "bottom":
				var top = parseInt(box.style.top);
				if(row == 9 || wallSet.isWall(row+1,col))return;
				box.style.top = (top + setp) + "px";
			break;
			case "left":
				var left = parseInt(box.style.left);
				if(col == 0 || wallSet.isWall(row,col-1))return;
				box.style.left = (left - setp) + "px";
			break;
		}
	},
	movHandler : function(type){
		var col = (parseInt(box.style.left)/setp)-1;
		var row = (parseInt(box.style.top)/setp)-1;
		switch(type){
			case "top":
				var top = parseInt(box.style.top);
				if(row == 0 || wallSet.isWall(row-1,col))return;
				box.style.top = (top - setp) + "px";
				box.style.transform = "rotate(0deg)";
			break;
			case "right":
				var left = parseInt(box.style.left);
				if(col == 9 || wallSet.isWall(row,col+1))return;
				box.style.left = (left + setp) + "px";
				box.style.transform = "rotate(90deg)";
			break;
			case "bottom":
				var top = parseInt(box.style.top);
				if(row == 9 || wallSet.isWall(row+1,col))return;
				box.style.top = (top + setp) + "px";
				box.style.transform = "rotate(180deg)";
			break;
			case "left":
				var left = parseInt(box.style.left);
				if(col == 0 || wallSet.isWall(row,col-1))return;
				box.style.left = (left - setp) + "px";
				box.style.transform = "rotate(270deg)";
			break;
		}
	},
	wallCreate : function(){
		var deg = parseInt(box.style.transform.match(/[-]*\d+/)[0]);
		var col = (parseInt(box.style.left)/setp)-1;
		var row = (parseInt(box.style.top)/setp)-1;
		switch(deg){
			case 0:case -0:
				if(row == 0 ||wallSet.isWall(row-1,col)){
					wallSet.printError();
					return ;
				}
				wallSet.createWall(row-1,col);
			break;
			case 90:case -270:
				if(col == 9 || wallSet.isWall(row,col+1)){
					wallSet.printError();
					return ;
				}
				wallSet.createWall(row,col+1);
			break;
			case 180:case -180:
				if(row == 9 || wallSet.isWall(row+1,col)){
					wallSet.printError();
					return ;
				}
				wallSet.createWall(row+1,col);
			break;
			case 270:case -90:
				if(col == 0 ||wallSet.isWall(row,col-1)){
					wallSet.printError();
					return ;
				}
				wallSet.createWall(row,col-1);
			break;
		}
	},
	wallColor : function(color){
		var deg = parseInt(box.style.transform.match(/[-]*\d+/)[0]);
		var col = (parseInt(box.style.left)/setp)-1;
		var row = (parseInt(box.style.top)/setp)-1;
		switch(deg){
			case 0:case -0:
				if(row == 9 || !wallSet.isWall(row+1,col)){
					wallSet.printError();
					return ;
				}
				wallSet.setWallColor((row+1)*columns+col,color);
			break;
			case 90:case -270:
				if(col == 0 || !wallSet.isWall(row,col-1)){
					wallSet.printError();
					return ;
				}
				wallSet.setWallColor(row*columns+(col-1),color);
			break;
			case 180:case -180:
				if(row == 0 || !wallSet.isWall(row-1,col)){
					wallSet.printError();
					return ;
				}
				wallSet.setWallColor((row-1)*columns+col,color);
			break;
			case 270:case -90:
				if(col == 9 || !wallSet.isWall(row,col+1)){
					wallSet.printError();
					return ;
				}
				wallSet.setWallColor(row*columns+(col+1),color);
			break;
		}
	},
	test : function(text){
		if(text.match("BRU")){
			commandEXE.wallColor(text.match(/#[0-9A-Fa-f]{6}/)[0]);
			return true;
		}
		switch(text){
			case "GO":commandEXE.goHandler();return true;
			case "TUN LEF":commandEXE.rotateHandler(-90);return true;
			case "TUN RIG":commandEXE.rotateHandler(90);return true;
			case "TUN BAC":commandEXE.rotateHandler(180);return true;
			case "TAR LEF":commandEXE.tarHandler("left");return true;
			case "TAR TOP":commandEXE.tarHandler("top");return true;
			case "TAR RIG":commandEXE.tarHandler("right");return true;
			case "TAR BOT":commandEXE.tarHandler("bottom");return true;
			case "MOV LEF":commandEXE.movHandler("left");return true;
			case "MOV TOP":commandEXE.movHandler("top");return true;
			case "MOV RIG":commandEXE.movHandler("right");return true;
			case "MOV BOT":commandEXE.movHandler("bottom");return true;
			case "BUILD":commandEXE.wallCreate();
				return true;	
		}
		return false;
	}
};
var textArea = {
	createLineNode : function(lineNum,type){
		var type = type || "span";
		var span = document.createElement(type);
		span.innerHTML = lineNum;
		line.appendChild(span);
	},
	removeLineNode : function(){
		line.removeChild(line.lastElementChild);
	},
	setRed : function(node){
		node.style.backgroundColor = "red";
	},
	setline : function(){
		var lineHeight = getComputedStyle(command).lineHeight;
		listener.value = command.value;
		var scrollHeight = listener.scrollHeight;
		var count = Math.round( parseInt(scrollHeight)/parseInt(lineHeight) );
		var items = line.getElementsByTagName("span").length;
		if(count < items){
			while(count < line.getElementsByTagName("span").length){
				textArea.removeLineNode();
			}
		}else if(count > items){
			while(count > line.getElementsByTagName("span").length){
				textArea.createLineNode(line.getElementsByTagName("span").length + 1);
			}
		}
		document.getElementById("output").innerHTML = "当前行数：" + count;
	}
};
var wallSet = {
	wallArray : [],
	randomArray : function(rows,columns){
		for(var i = 0;i < rows;i++){
			this.wallArray[i] = [];
			for(var j = 0;j < columns;j++){
				this.wallArray[i][j] = Math.floor(Math.random()*10) > 0 ? 0:1;
			}
		}
		console.log(this.wallArray);
	},
	isWall :function(row,col){
		if(row >= 0 && row <= 9 && col >= 0 && col <= 9){
			return this.wallArray[row][col] == 1;
		}
		console.error("错误！超出棋盘范围！");
		return false;
	},
	createWall : function(row,col){
		this.wallArray[row][col] = 1;
		borad.getElementsByTagName("span")[row*columns+col].className = "wall";
	},
	generateWall : function(boradNode){
		for(var i = 0;i < this.wallArray.length;i++){
			for(var j = 0;j < this.wallArray[i].length;j++){
				var wall = document.createElement("span");
				if(this.wallArray[i][j] == 1){
					wall.className = "wall";
				}
				boradNode.appendChild(wall);
			}
		}
	},
	generateBox : function(node){
		var i = Math.floor(Math.random()*10);
		var j = Math.floor(Math.random()*10);
		while(this.wallArray[i][j] == 1){
			i = Math.floor(Math.random()*10);
			j = Math.floor(Math.random()*10);
		}
		node.style.top = (i + 1)*setp + "px";
		node.style.left = (j + 1)*setp + "px";
	},
	setWallColor : function(index,color){
		borad.getElementsByTagName("span")[index].style.backgroundColor = color;
	},
	printError : function(){
		console.error("错误：修墙不成功！");
	},
	getPath : function(start,end){
		function Node (p,parent,G){
			this.node = p;
			this.parentNode = parent || null;
			this.H = Math.abs(p.x - end.x) + Math.abs(p.y - end.y);
			this.G = G;
			this.F = this.G + this.H;
		}
		var boardList = this.wallArray;
		var openList = [];
		var closedList = [];
		var result = [];
		openList.push(new Node(start,null,0));
		while(openList[openList.getMin()].H){
			var pos = openList.getMin();
			var node = openList.splice(pos,1)[0]; 
			closedList.push(node);
			var G = node.G;
			if(node.node.x > 0){
				if(boardList[node.node.x-1][node.node.y]!=1){
					var topNode = new Node(new point(node.node.x-1,node.node.y),node,G+10);
					if(!closedList.isIn(topNode)){
						if(openList.isIn(topNode)){
							var testPos = openList.getNode(topNode);
							if(openList[testPos].G > topNode.G){
								openList[testPos].p = node;
							}
						}else{
							openList.push(topNode);
						}
					}
				}
			}
			if(node.node.x < 9){
				if(boardList[node.node.x+1][node.node.y]!=1){
					var botNode = new Node(new point(node.node.x+1,node.node.y),node,G+10);
					if(!closedList.isIn(botNode)){
						if(openList.isIn(botNode)){
							var testPos = openList.getNode(botNode);
							if(openList[testPos].G > botNode.G){
								openList[testPos].p = node;
							}
						}else{
							openList.push(botNode);
						}
					}
				}
			}
			if(node.node.y > 0){
				if(boardList[node.node.x][node.node.y-1]!=1){
					var lefNode = new Node(new point(node.node.x,node.node.y-1),node,G+10);
					if(!closedList.isIn(lefNode)){
						if(openList.isIn(lefNode)){
							var testPos = openList.getNode(lefNode);
							if(openList[testPos].G > lefNode.G){
								openList[testPos].p = node;
							}
						}else{
							openList.push(lefNode);
						}
					}
				}
			}
			if(node.node.y < 9){
				if(boardList[node.node.x][node.node.y+1]!=1){
					var rigNode = new Node(new point(node.node.x,node.node.y+1),node,G+10);
					if(!closedList.isIn(rigNode)){
						if(openList.isIn(rigNode)){
							var testPos = openList.getNode(rigNode);
							if(openList[testPos].G > rigNode.G){
								openList[testPos].p = node;
							}
						}else{
							openList.push(rigNode);
						}
					}
				}
			}
		}
		var node = openList[openList.getMin()];
		result.push(node);
		while(node.G){
			node = node.parentNode;
			result.push(node);
		}
		return result.reverse();
	}
};
Array.prototype.getMin = function(){
	if(this.length == 1){
		return 0;
	}
	var flg = 0;
	var min = this[flg];
	for(var i = 1;i<this.length;i++){
		if(this[i].F < this[flg].F){
			flg = i;
		}
	}
	return flg;
}
Array.prototype.isIn = function(node){
	for(var i = 0;i<this.length;i++){
		if(this[i].node.x == node.node.x && this[i].node.y == node.node.y){
			return true;
		}
	}
	return false;
}
Array.prototype.getNode = function(node){
	for(var i = 0;i<this.length;i++){
		if(this[i].node.x == node.node.x && this[i].node.y == node.node.y){
			return i;
		}
	}
}
function point(x,y){
	this.x = x;
	this.y = y;
}
point.prototype.isEqual = function(p){
	return this.x == p.x && this.y == p.y;
}
function getMoveCommand(end){
	var col = (parseInt(box.style.left)/setp)-1;
	var row = (parseInt(box.style.top)/setp)-1;
	var start = new point(row,col);
	var result = wallSet.getPath(start,end);
	var commands = [];
	for(var i = 1;i < result.length;i++){
		var node = result[i].node;
		if(node.isEqual(new point(start.x + 1,start.y))){
			commands.push("MOV BOT");
		}else if(node.isEqual(new point(start.x - 1,start.y))){
			commands.push("MOV TOP");
		}else if(node.isEqual(new point(start.x,start.y + 1))){
			commands.push("MOV RIG");
		}else if(node.isEqual(new point(start.x,start.y - 1))){
			commands.push("MOV LEF");
		}
		start = node;
	}
	return commands;
}
command.onfocus = function(){
	var spanList = line.getElementsByTagName("span");
	if(spanList.length == 0){
		textArea.createLineNode(1);
		document.getElementById("output").innerHTML = "当前行数：1";
	}
}
command.oninput = textArea.setline;
command.onscroll = function(){
	line.scrollTop = this.scrollTop;
}
line.onscroll = function(e){
	e.preventDefault();
	e.stopPropagation();
}
button.onclick = function(){
	var text = document.getElementById("command").value;
	var commandList = text.split("\n");
	var lineList = document.getElementById("line").getElementsByTagName("span");
	var commandSet = [];
	var flg = true;
	var reg = /(^((GO)|(TAR LEF)|(TAR RIG)|(TAR BOT)|(TAR TOP)|(MOV LEF)|(MOV RIG)|(MOV BOT)|(MOV TOP))((\s+)\d+)?$)|(^(TUN LEF|TUN RIG|TUN BAC|BUILD)$)|(^(BRU)\s+(#[0-9A-Fa-f]{6})$)|(^(MOV TO)(\s+)\d+(,)\d+$)/;
	for(var i = 0; i < lineList.length;i++){
		if(!reg.test(commandList[i])){
			textArea.setRed(lineList[i]);
			flg = false;
		}else{
			commandSet.push(commandList[i]);
		}
	}
	if(flg){
		var regx = /GO|TAR LEF|TAR RIG|TAR BOT|TAR TOP|MOV LEF|MOV RIG|MOV BOT|MOV TOP|TUN LEF|TUN RIG|TUN BAC|BUILD|BRU|MOV TO/;
		var finallyCommands = [];
		for(var i = 0; i < commandSet.length;i++){
			var commandMsg = commandSet[i].match(regx)[0];
			if(commandMsg == "BRU"){
				var color = commandSet[i].match(/#[0-9A-Fa-f]{6}/)[0];
				finallyCommands.push([commandMsg,color].join(" "));
			}else if(commandMsg == "MOV TO"){
				var end = commandSet[i].match(/\d+,\d+/)[0].split(",");
				if(end[0] < 1 && end[0] > 10 && end[1] < 1 && end[1] > 10){
					console.error("终点错误！");
				}else if(wallSet.isWall(end[1]-1,end[0]-1)){
					console.error("目的地为墙错误！");
				}else{
					finallyCommands.push([commandMsg,(end[0]-1)+","+(end[1]-1)].join(" "));
				}
			}else{
				var num = parseInt(commandSet[i].match(/\d+/)) || 1;
				for(var j = 0;j < num;j++){
					finallyCommands.push(commandMsg);
				}
			}
		}
		var timer = setInterval(function(){
			if(!finallyCommands.length){
				clearInterval(timer);
				return ;
			}
			var commandMsg = finallyCommands.shift();
			if(commandMsg.match(/MOV TO\s+\d+,\d+/)){
				// clearInterval(timer);
				var end = commandMsg.match(/\d+,\d+/)[0].split(",");
				var result = getMoveCommand(new point(end[1],end[0]));
				for (var i = result.length-1; i >= 0; i--) {
					finallyCommands.unshift(result[i]);
				};
				commandMsg = finallyCommands.shift();
			}
			commandEXE.test(commandMsg);
		},1000);
	}
}
clearBtn.onclick = function(){
	command.value = "";
	listener.value = "";
	textArea.setline();
	command.focus();
}
document.onkeyup = function(e){
	var keyCode = e.keyCode;
	if( e.ctrlKey && keyCode == 38 ){
		commandEXE.movHandler("top");
		return ;
	}
	if( e.ctrlKey && keyCode == 40 ){
		commandEXE.movHandler("bottom");
		return ;
	}
	if( e.ctrlKey && keyCode == 39 ){
		commandEXE.movHandler("right");
		return ;
	}
	if( e.ctrlKey && keyCode == 37 ){
		commandEXE.movHandler("left");
		return ;
	}
	if( e.shiftKey && keyCode == 38 ){
		commandEXE.goHandler();
		return ;
	}
	if( e.shiftKey && keyCode == 40 ){
		commandEXE.rotateHandler(180);
		return ;
	}
	if( e.shiftKey && keyCode == 39 ){
		commandEXE.rotateHandler(90);
		return ;
	}
	if( e.shiftKey && keyCode == 37 ){
		commandEXE.rotateHandler(-90);
		return ;
	}
	switch(keyCode){
		case 38:commandEXE.tarHandler("top");return ;
		case 40:commandEXE.tarHandler("bottom");return ;
		case 39:commandEXE.tarHandler("right");return ;
		case 37:commandEXE.tarHandler("left");return ;
	}
}
wall.onclick = function(e){
	var target = e.target;
	target.setAttribute("disabled","true");
	wallSet.randomArray(rows,columns);
	wallSet.generateWall(borad);
	wallSet.generateBox(box);
}
