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
}
Board.prototype.isWall = function(row,col){
	return this.map[row][col] == 1;
}
Board.prototype.createWall = function(row,col){
	if(this.map[row][col] == 1){
		console.error("错误，当前有墙，不可修墙!");
		return ;
	}
	this.map[row][col] = 1;
	this.walls[row*this.cols+col].className = "wall";
}
Board.prototype.setColor = function(row,col,color){
	this.walls[row*this.cols+col].style.backgroundColor = color;
}
Board.prototype.setBoxPosistion = function(){
	var i = Math.floor(Math.random()*this.rows);
	var j = Math.floor(Math.random()*this.cols);
	while(this.map[i][j] == 1){
		i = Math.floor(Math.random()*this.rows);
		j = Math.floor(Math.random()*this.cols);
	}
	this.box.setPosistion(i + 1,j + 1);
}
