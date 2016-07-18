function Board(){
	this.board = document.querySelector("#borad");
	this.map = [];
	this.box = new Box();
}
Board.prototype.init = function(rows,cols){
	this.rows = rows || 10;
	this.cols = cols || 10;
	for(var i = 0;i < this.rows;i++){
		this.map[i] = [];
		for(var j = 0;j < this.cols;j++){
			var wall = document.createElement("span");
			this.map[i][j] = Math.floor(Math.random()*10) > 0 ? 0:1;
			if(this.map[i][j] == 1)wall.className = "wall";
			this.board.appendChild(wall);
		}
	}
	this.walls = this.board.getElementsByTagName("span");
};
Board.prototype.isWall = function(row,col){
	return this.map[row][col] == 1;
};
Board.prototype.createWall = function(){
	var pos = this.getCreateWall();
	var row = pos.y;
	var col = pos.x;
	if(row < 0 && row > 9 && col < 0 && col > 9){
		console.error("错误，超出范围，不可修墙!");
		return ;
	}
	if(this.map[row][col] == 1){
		console.error("错误，当前有墙，不可修墙!");
		return ;
	}
	this.map[row][col] = 1;
	this.walls[row*this.cols+col].className = "wall";
};
Board.prototype.setColor = function(color){
	var pos = this.getColorWall();
	var row = pos.y;
	var col = pos.x;
	if(row < 0 && row > 9 && col < 0 && col > 9){
		console.error("错误，超出范围!");
		return ;
	}
	if(this.isWall(row,col)){
		this.walls[row*this.cols+col].style.backgroundColor = color;
	}
};
Board.prototype.setBoxPosistion = function(){
	var i = Math.floor(Math.random()*this.rows);
	var j = Math.floor(Math.random()*this.cols);
	while(this.map[i][j] == 1){
		i = Math.floor(Math.random()*this.rows);
		j = Math.floor(Math.random()*this.cols);
	}
	console.log("x:"+j+"y:"+i);
	this.box.setPosistion(i,j);
};
Board.prototype.getCreateWall = function(){
	var pos = this.box.getPosistion();
	var direction = this.box.getDirection();
	if(direction == "top"){
		return {"x":pos.x,"y":pos.y-1};
	}else if(direction == "lef"){
		return {"x":pos.x-1,"y":pos.y};
	}else if(direction == "rig"){
		return {"x":pos.x+1,"y":pos.y};
	}else if(direction == "bot"){
		return {"x":pos.x,"y":pos.y+1};
	}
};
Board.prototype.getColorWall = function(){
	var pos = this.box.getPosistion();
	var direction = this.box.getDirection();
	if(direction == "top"){
		return {"x":pos.x,"y":pos.y+1};
	}else if(direction == "lef"){
		return {"x":pos.x+1,"y":pos.y};
	}else if(direction == "rig"){
		return {"x":pos.x-1,"y":pos.y};
	}else if(direction == "bot"){
		return {"x":pos.x,"y":pos.y-1};
	}
};
Board.prototype.checkPath = function(direction,num){
	var pos = this.box.getPosistion();
	switch(direction){
		case "top":
			if(pos.y <= 0)return false;
			if(this.isWall(pos.y-num,pos.x))return false;
		break;
		case "bot":
			if(pos.y >= 9)return false;
			if(this.isWall(pos.y+num,pos.x))return false;
		break;
		case "lef":
			if(pos.x <= 0)return false;
			if(this.isWall(pos.y,pos.x-num))return false;
		break;
		case "rig":
			if(pos.x >= 9)return false;
			if(this.isWall(pos.y,pos.x+num))return false;
		break;
	}
	return true;
};
Board.prototype.findPath = function(start,end){
	var boardList = this.map;
	var openList = new NodeList();
	var closedList = new NodeList();
	var result = new NodeList();
	openList.push(new Node(start,null,0,end));
	while(openList[openList.getMin()].H){
		var pos = openList.getMin();
		var node = openList.splice(pos,1)[0];
		closedList.push(node);
		var G = node.G;
		if(node.node.y > 0){
			if(boardList[node.node.y-1][node.node.x]!=1){
				var topNode = new Node({x:node.node.x,y:node.node.y-1},node,G+10,end);
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
		if(node.node.y < 9){
			if(boardList[node.node.y+1][node.node.x]!=1){
				var botNode = new Node({x:node.node.x,y:node.node.y+1},node,G+10,end);
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
		if(node.node.x > 0){
			if(boardList[node.node.y][node.node.x-1]!=1){
				var lefNode = new Node({x:node.node.x-1,y:node.node.y},node,G+10,end);
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
		if(node.node.x < 9){
			if(boardList[node.node.y][node.node.x+1]!=1){
				var rigNode = new Node({x:node.node.x+1,y:node.node.y},node,G+10,end);
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
};