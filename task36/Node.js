function Node (p,parent,G,end){
	this.end = end;
	this.node = p;
	this.parentNode = parent || null;
	this.H = Math.abs(p.x - end.x) + Math.abs(p.y - end.y);
	this.G = G;
	this.F = this.G + this.H;
}
function NodeList (){
	// this.prototype = new Array;
}
NodeList.prototype = [];
NodeList.prototype.getMin = function(){
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
};
NodeList.prototype.isIn = function(node){
	for(var i = 0;i<this.length;i++){
		if(this[i].node.x == node.node.x && this[i].node.y == node.node.y){
			return true;
		}
	}
	return false;
};
NodeList.prototype.getNode = function(node){
	for(var i = 0;i<this.length;i++){
		if(this[i].node.x == node.node.x && this[i].node.y == node.node.y){
			return i;
		}
	}
};
// function point(x,y){
// 	this.x = x;
// 	this.y = y;
// }
// point.prototype.isEqual = function(p){
// 	return this.x == p.x && this.y == p.y;
// };