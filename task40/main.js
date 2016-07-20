var c = new Calendar({
	date:new Date("2016/07/10"),
	startTime:new Date("2014/01/01"),
	endTime:new Date("2016/12/31")
});
var prev = document.querySelector("#calendar .prev");
var next = document.querySelector("#calendar .next");
var date = document.querySelector("#calendar .date");
prev.addEventListener("click",c.prev.bind(c));
next.addEventListener("click",c.next.bind(c));
date.addEventListener("click",function(e){
	var target = e.target;
	if(target.nodeName.toUpperCase() == "SPAN"){
		c.setDate(target.dataset.time);
	}
}.bind(c));