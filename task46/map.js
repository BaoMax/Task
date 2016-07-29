function Map(size){
	this.col = size.x;
	this.row = size.y;
	this.map = [];

	for(var i = 0;i < this.row;i += 1){
		this.map.push(new Array(this.col));
	}
	console.log(this.map[0]);
}