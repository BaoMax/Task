function Application(){
	this.box = new Box();
	this.command = new Command();
	this.textarea = new Textarea();

	this.$refresh = document.getElementById("refresh");
	this.$exe = document.getElementById("exe");
	this.$command = document.getElementById("command");
	this.init();
}
Application.prototype.init = function(){
	this.$command.addEventListener("focus",this.SetPos.bind(this));
	this.$command.addEventListener("input",this.input.bind(this));
	this.$command.addEventListener("scroll",this.scroll.bind(this));
	this.$exe.addEventListener("click",this.run.bind(this));
	this.$refresh.addEventListener("click",this.clear.bind(this));
};
Application.prototype.SetPos = function(){
	this.textarea.focus();
};
Application.prototype.input = function(){
	this.textarea.setLine();
};
Application.prototype.scroll = function(){
	this.textarea.scroll();
};
Application.prototype.clear = function(){
	this.textarea.clear();
};
Application.prototype.run = function(){
	var commandList = this.textarea.getValue();
	var flg = true;
	var self = this;
	for(var i = 0;i < commandList.length;i++){
		if(!commandList[i] || this.command.parse(commandList[i]) === false){
			this.textarea.setRed(i);
			flg = false;
		}
	}
	if(flg){
		commandList.forEach(function(item,i){
			self.command.exec(item);
		});
	}
};
new Application();