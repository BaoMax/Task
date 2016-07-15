function Command(){
	this.map = new Board();
	this.box = new Box();
	this.map.init(10,10);
	this.map.setBoxPosistion();
}
Command.prototype.commands