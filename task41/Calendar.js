function Calendar (obj) {
	this.startTime = new Date();
	this.endTime = new Date();
	this.endTime.setYear(this.endTime.getFullYear() + 1);
	this.date = new Date();

	this.startTime = obj.startTime || this.startTime;
	this.startTime.setHours(0,0,0,0);
	this.endTime = obj.endTime || this.endTime;
	this.endTime.setHours(0,0,0,0);

	try{
		if(this.startTime.getTime() > this.endTime.getTime()){
			throw "开始时间不能大于结束时间！";
		}
	}catch(err){
		alert(err);
	}

	this.date = obj.date || this.date;
	this.date.setHours(0,0,0,0);

	this.wrap = obj.warp || document.body;
	this.input = obj.input;
	this.callback = obj.callback;

	this.createNode();
	this.init();
	this.bindEvent();
}
Calendar.prototype.setDate = function(date){
	var time = new Date(date);
	time.setHours(0,0,0,0);
	if(time.getTime() >= this.startTime.getTime() && time.getTime() <= this.endTime.getTime()){
		this.date = new Date(date);
		this.date.setHours(0,0,0,0);

		this.init();
	}else{
		alert("超出时间范围！");
	}
};
Calendar.prototype.getDate = function(){
	var year = this.date.getFullYear();
	var month = this.date.getMonth() + 1;
	var day = this.date.getDate();
	month = month > 9? month:"0" + month;
	return year + "年" + month + "月" + day + "日";
};
Calendar.prototype.createNode = function(){
	this.calendar = document.createElement("div");
	this.calendar.className = "calendar";
	this.wrap.appendChild(this.calendar);

	var head = document.createElement("div");
	head.className = "head";
	head.innerHTML = '<i class="prev"><</i><span class="now"></span><i class="next">></i>';
	this.calendar.appendChild(head);

	var date = document.createElement("div");
	date.className = "date";
	this.calendar.appendChild(date);
};
Calendar.prototype.bindEvent = function(){
	var prev = this.calendar.querySelector(".prev");
	var next = this.calendar.querySelector(".next");
	var date = this.calendar.querySelector(".date");

	prev.addEventListener("click",this.prev.bind(this));
	next.addEventListener("click",this.next.bind(this));
	date.addEventListener("click",function(e){
		var target = e.target;
		if(target.nodeName.toUpperCase() == "SPAN"){
			this.setDate(target.dataset.time);
			this.target();
			this.calendar.style.display = "none";
		}
	}.bind(this));
	this.input.addEventListener("click",function () {
		var cssStyle = getComputedStyle(this.calendar);
		if(cssStyle.display == "none"){
			this.calendar.style.display = "block";
		}else{
			this.calendar.style.display = "none";
		}
	}.bind(this));
};
Calendar.prototype.target = function(){
	this.input.value = this.getDate();
	this.callback();
};
Calendar.prototype.render = function(data){
	var now = this.calendar.querySelector(".now");
	var year = this.date.getFullYear();
	var month = this.date.getMonth() + 1;
	var day = this.date.getDate();
	month = month > 9? month:"0" + month;
	now.innerText = year + "年" + month + "月";

	var date = this.calendar.querySelector(".date");
	var str = '<span class="weekend">日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span class="weekend">六</span>';
	for(var i = 0;i < data.length;i++){
		var item = data[i];
		if(item.date.getDay() === 0 || item.date.getDay() == 6){
			item.style = item.style + " weekend";
		}
		str = str + '<span class= "' + item.style + '" data-time="'+ item.date.toDateString() +'">' + item.date.getDate() + '</span>';
	}
	date.innerHTML = str;
};
Calendar.prototype.init =  function(){
	var data = [];
	var month = this.date.getMonth();
	var date = new Date(this.date);
	date.setDate(1);
	date.setDate(date.getDate()-date.getDay());
	date.setHours(0,0,0,0);

	for(var i = 0;i < 42;i++){
		var temp = {};
		temp.date = new Date(date);
		if(temp.date.getTime() >= this.startTime.getTime() && temp.date.getTime() <= this.endTime.getTime()){
			if(temp.date.getMonth() != this.date.getMonth()){
				temp.style = "invalid";
			}else if(temp.date.getDate() == this.date.getDate()){
				temp.style = "selected";
			}else {
				temp.style = "";
			}
		}else{
			temp.style = "expired";
		}
		data.push(temp);
		date.setDate(date.getDate() + 1);
	}
	this.render(data);
};
Calendar.prototype.next = function(){
	this.date.setMonth(this.date.getMonth() + 1);
	this.init();
};
Calendar.prototype.prev = function(){
	this.date.setMonth(this.date.getMonth() - 1);
	this.init();
};
