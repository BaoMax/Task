function Application(){
	this.box = new Box();
	this.command = new Command();

	this.$exe = document.getElementById("exe");
	this.$command = document.getElementById("command");
	this.$wall = document.getElementById("wall");
	this.init();
}
Application.prototype.init = function(){
	this.$wall.addEventListener("click",this.wall.bind(this));
}
Application.prototype.wall = function(){
	
}
new Application();