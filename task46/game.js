var w = window,
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame,
	canvas = document.createElement("canvas"),
	ctx = canvas.getContext("2d"),
	then = new Date(),
	keysDown = {},
	bgReady = false,
	heroReady = false,
	monsterReady = false,
	bgImage = new Image(),
	heroImage = new Image(),
	monsterImage = new Image(),
	hero = {
		speed:256,
		x:0,
		y:0
	},
	monster = {
		x:0,
		y:0
	},
	monstersCaught = 0,
	reset = function(){
		hero.x = canvas.width / 2;
		hero.y = canvas.height / 2;

		monster.x = 32 + Math.random() * (canvas.width - 64);
		monster.y = 32 + Math.random() * (canvas.height - 64);
	},
	update = function(modifier){
		if(38 in keysDown){//用户按下的是向上键
			hero.y -= hero.speed * modifier;
		}
		if(40 in keysDown){//用户按下的是向下键
			hero.y += hero.speed * modifier;
		}
		if(37 in keysDown){//用户按下的是向左键
			hero.x -= hero.speed * modifier;
		}
		if(39 in keysDown){//用户按下的是向右键
			hero.x += hero.speed * modifier;
		}
		//英雄遇到怪物
		if(hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32) && hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)){
			++monstersCaught;
			reset();
		}
	},
	render = function(){
		if(bgReady) {
			ctx.drawImage(bgImage,0,0);
		}

		if(heroReady) {
			ctx.drawImage(heroImage,hero.x,hero.y);
		}

		if(monsterReady) {
			ctx.drawImage(monsterImage,monster.x,monster.y);
		}

		//计分
		ctx.fillStyle = "rgb(250,250,250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Monster caught: " + monstersCaught,32,32);
	},
	main = function(){
		var now = new Date(),
			detal = now - then;

		update(detal / 1000);

		render();
		then = now;

		requestAnimationFrame(main);
	};

bgImage.src = "image/background.png";
heroImage.src = "image/hero.png";
monsterImage.src = "image/monster.png";
bgImage.onload = function(){
	bgReady = true;
};
heroImage.onload = function(){
	heroReady = true;
};
monsterImage.onload = function(){
	monsterReady = true;
};


canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

addEventListener("keydown",function(e){
	keysDown[e.keyCode] = true;
},false);
addEventListener("keyup",function(e){
	delete keysDown[e.keyCode];
},false);

reset();
main();