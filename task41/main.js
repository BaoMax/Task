// var input = document.getElementById("day");

// var c = new Calendar("calendar",{});
// input.parentElement.appendChild(c.calendar);
// var calendar = c.calendar;


// var prev = document.querySelector("#calendar .prev");
// var next = document.querySelector("#calendar .next");
// var date = document.querySelector("#calendar .date");


// prev.addEventListener("click",c.prev.bind(c));
// next.addEventListener("click",c.next.bind(c));
// date.addEventListener("click",function(e){
// 	var target = e.target;
// 	if(target.nodeName.toUpperCase() == "SPAN"){
// 		c.setDate(target.dataset.time);
// 		input.value = c.getDate();
// 		calendar.style.display = "none";
// 	}
// }.bind(c));
// input.addEventListener("click",function () {
// 	var cssStyle = getComputedStyle(calendar);
// 	if(cssStyle.display == "none"){
// 		calendar.style.display = "block";
// 	}else{
// 		calendar.style.display = "none";
// 	}
// });


var c = new Calendar({
	warp:document.getElementById("calendar_day"),
	input:document.getElementById("day"),
	callback:function(){
		alert("回调函数");
	}
});