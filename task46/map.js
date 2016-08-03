function Map(size){
	this.col = size.x;
	this.row = size.y;
	this.map = [];

	for(var i = 0;i < this.row;i += 1){
		this.map.push(new Array(this.col));
	}
	// console.log(this.row - 1);
	// console.log(this.map[this.row - 1] instanceof Array);
}
Map.prototype.getNeighbor = function(node){
	var arr = [],
		point = node.node;
	if(point.y > 0 && this.map[point.y - 1][point.x] === undefined){
		arr.push({x:point.x,y:point.y - 1});
	}
	// if(point.y < )
};
Map.prototype.findPath = function(start,end){
	var boardList = this.map;
	var openList = new NodeList();
	var closedList = new NodeList();
	var result = new NodeList();
	if(boardList[end.y][end.x] === window.fileSign){
		boardList[end.y][end.x] = undefined;
	}
	openList.push(new Node(start,null,0,end));
	while(openList[openList.getMin()].H){
		var pos = openList.getMin();
		var node = openList.splice(pos,1)[0];
		closedList.push(node);
		var G = node.G;
		if(node.node.y > 0){
			if(boardList[node.node.y-1][node.node.x] === undefined){
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
		if(node.node.y < this.row - 1){
			console.log(boardList);
			console.log(node.node);
			console.log(boardList[27]);
			console.log(boardList[27] instanceof Array);
			console.log(boardList[27][node.node.x]);
			if(boardList[node.node.y+1][node.node.x] === undefined){
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
			if(boardList[node.node.y][node.node.x-1] === undefined){
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
		if(node.node.x < this.col - 1){
			if(boardList[node.node.y][node.node.x+1] === undefined){
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