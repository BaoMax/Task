function satrtup(){
	var el = document.getElementById("canvas");
	el.addEventListener("touchstart",handleStart,false);
	el.addEventListener("touchend",handleEnd,false);
	el.addEventListener("touchcancel",handleCancel,false);
	el.addEventListener("touchleave",handleLeave,false);
	el.addEventListener("touchmove",handleMove,false);
}
var ongoingTouch = [],
	colors = [];
function handleStart(evt){
	evt.preventDefault();
	var touch = evt.changedTouches,
		canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d");
	for(var i = 0,l = touch.length;i < l;i += 1){
		ongoingTouch.push(touch[i]);
		var color = getColor(touch[i]);

		ctx.fillStyle = color;
		ctx.fillRect(touch[i].pageX - 2,touch[i].pageY - 2,4,4);
	}

}
function handleEnd(evt){
	evt.preventDefault();
}
function handleCancel(evt){
	evt.preventDefault();
}
function handleLeave(evt){
	evt.preventDefault();
	var touch = evt.changedTouches,
		canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d");
		ctx.lineWidth = 4;
	for(var i = 0,l = touch.length;i < l;i += 1){
		var t = getTouch(touch[i]);
		var color = getColor(touch[i]);
			
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.movTo(ongoingTouch[t].pageX,ongoingTouch[t].pageY);
		ctx.lineTo(touch[i].pageX,touch[i].pageY);
		ctx.closePath();
		ctx.stroke();

		ongoingTouch.splice(t,1,touch[i]);
	}
}
function handleMove(evt){
	evt.preventDefault();
	var touch = evt.changedTouches,
		canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d");
	for(var i = 0,l = touch.length;i < l;i += 1){
		ongoingTouch.push(touch[i]);
		var color = getColor(touch[i]);

		ctx.fillStyle = color;
		ctx.fillRect(touch[i].pageX - 2,touch[i].pageY - 2,4,4);
	}
}
function getColor(touch){
	if(!colors[touch.identifier]){
		colors[touch.identifier] = "#" + Math.floor(Math.random()*(256*256*256 - 1)).toString(16);
	}
	return colors[touch.identifier];
}
function getTouch(touch){
	for(var i = 0,l = ongoingTouch.length;i < l;i += 1){
		if(ongoingTouch[i].identifier == touch.identifier){
			return i;
		}
	}
	return -1;
}