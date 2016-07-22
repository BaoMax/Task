var c = new Calendar({
	warp:document.getElementById("calendar_day"),
	input:document.getElementById("day"),
	callback:function(){
		alert("回调函数1");
	}
});
var c1 = new Calendar({
	warp:document.getElementById("calendar_period"),
	input:document.getElementById("period"),
	span:{
		min:2,
		max:7
	},
	callback:function(){
		alert("回调函数2");
	}
});
c1.setSpan({min:1,max:100});