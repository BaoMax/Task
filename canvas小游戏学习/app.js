function loadImage(array){
		count = 0;
	for(var i = 0,l = array.length;i < l; i += 1){
		var img = new Image();
		img.src = array[i];
		imageArr[array[i]] = img;
		img.onload = function(){
			count = count + 1;
			if(count == l){
				gameControll.reset();
				gameControll.main();
			}
		}
	}
}
var imageArr = {},array = ["img/bg.jpg","img/endpage.jpg","img/food1.png","img/food2.png","img/gameover.png","img/geili.png","img/heart.png","img/icon.png","img/player.png","img/replay.png","img/scorebg.png","img/startbg.png","img/weixin.png","img/yinhen.png"];
loadImage(array);