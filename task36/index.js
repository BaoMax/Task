var button = document.getElementById("exe");
var clearBtn = document.getElementById("refresh");
var box = document.getElementById("box");
var line = document.getElementById("line");
var command = document.getElementById("command");
var listener = document.getElementById("value");
var borad = document.getElementById("borad");
var wall = document.getElementById("wall");
var lineHeight = getComputedStyle(command).lineHeight;
var rows = 10;
var columns = 10; 
var lineNum = 1;
var setp = 40;
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
	createLineNode : function(type){
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
		listener.value = command.value;
		var scrollHeight = listener.scrollHeight;
		var count = Math.round( parseInt(scrollHeight)/parseInt(lineHeight) );
		var items = line.getElementsByTagName("span").length;
		if(count < items){
			while(count < line.getElementsByTagName("span").length){
				lineNum = line.getElementsByTagName("span").length - 1;
				textArea.removeLineNode();
			}
			lineNum = count;
		}else if(count > items){
			while(count > line.getElementsByTagName("span").length){
				lineNum = line.getElementsByTagName("span").length + 1;
				textArea.createLineNode();
			}
			lineNum = count;
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
		return this.wallArray[row][col] == 1;
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
	}
};
command.onfocus = function(){
	var spanList = line.getElementsByTagName("span");
	if(spanList.length == 0){
		textArea.createLineNode();
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
button.onclick = function(){
	var text = document.getElementById("command").value;
	var commandList = text.split("\n");
	var lineList = document.getElementById("line").getElementsByTagName("span");
	var commandSet = [];
	var flg = true;
	var reg = /(^((GO)|(TAR LEF)|(TAR RIG)|(TAR BOT)|(TAR TOP)|(MOV LEF)|(MOV RIG)|(MOV BOT)|(MOV TOP))((\s+)\d+)?$)|(^(TUN LEF|TUN RIG|TUN BAC|BUILD)$)|(^(BRU)\s+(#[0-9A-Fa-f]{6})$)/;
	for(var i = 0; i < lineList.length;i++){
		if(!reg.test(commandList[i])){
			textArea.setRed(lineList[i]);
			flg = false;
		}else{
			commandSet.push(commandList[i]);
		}
	}
	if(flg){
		var regx = /GO|TAR LEF|TAR RIG|TAR BOT|TAR TOP|MOV LEF|MOV RIG|MOV BOT|MOV TOP|TUN LEF|TUN RIG|TUN BAC|BUILD|BRU/;
		var finallyCommands = [];
		for(var i = 0; i < commandSet.length;i++){
			var commandMsg = commandSet[i].match(regx)[0];
			if(commandMsg == "BRU"){
				var color = commandSet[i].match(/#[0-9A-Fa-f]{6}/)[0];
				finallyCommands.push([commandMsg,color].join(" "));
			}else{
				var num = parseInt(commandSet[i].match(/\d+/)) || 1;
				for(var j = 0;j < num;j++){
					finallyCommands.push(commandMsg);
				}
			}
		}
		var i = 0;
		var timer = setInterval(function(){
			if(i >= finallyCommands.length){
				clearInterval(timer);
				return ;
			}
			var commandMsg = finallyCommands[i];
			commandEXE.test(commandMsg);
			i = i + 1;
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
function node(p){
	this.parentNode = p;
	this.
	this.F = this.G + this.H;
}