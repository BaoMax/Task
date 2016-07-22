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

	if(obj.span){
		this.span = true;
		this.min = obj.span.min;
		this.max = obj.span.max;
		this.period_start = new Date(this.date);
		this.period_end = null;
		// this.date = null;
	}

	this.createNode();
	this.init();
	this.bindEvent();
}
Calendar.prototype.setSpan = function(obj){
	var min = parseInt(obj.min,10);
	var max = parseInt(obj.max,10);
	try{
		if(isNaN(min) || isNaN(max) || obj.min > obj.max){
			throw "参数错误！";
		}
	}catch(e){
		alert(e);
	}
	this.min = min;
	this.max = max;
};
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
Calendar.prototype.getPeriod = function(){
	try{
		if(this.period_start || this.period_end){
			throw "请选择时间范围！";
		}
	}catch(e){
		alert(e);
	}
	var str = "";
	var year = this.period_start.getFullYear();
	var month = this.period_start.getMonth + 1;
	var day = this.period_start.getDate();
	month = month > 9 ? month:"0" + month;
	str = str + year + "年" + month + "月" + day + "日";

	year = this.period_end.getFullYear();
	month = this.period_end.getMonth + 1;
	day = this.period_end.getDate();
	month = month > 9 ? month:"0" + month;
	str = str + year + "年" + month + "月" + day + "日";

	return str;
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

	var button = document.createElement("div");
	button.className = "btn_group";
	button.innerHTML = "<button class='sure'>确定</button><button class='cancel'>取消</button>";
	this.calendar.appendChild(button);
};
Calendar.prototype.bindEvent = function(){
	var prev = this.calendar.querySelector(".prev");
	var next = this.calendar.querySelector(".next");
	var date = this.calendar.querySelector(".date");
	var sure = this.calendar.querySelector(".sure");
	var cancel = this.calendar.querySelector(".cancel");

	prev.addEventListener("click",this.prev.bind(this));
	next.addEventListener("click",this.next.bind(this));
	sure.addEventListener("click",this.sure.bind(this));
	cancel.addEventListener("click",this.close.bind(this));
	this.input.addEventListener("click",function () {
		if(this.isClose()){
			this.open();
		}else{
			this.close();
		}
	}.bind(this));
	if(this.span){
		date.addEventListener("click",function(e){
			var target = e.target;
			var temp = new Date(target.dataset.time);
			temp.setHours(0,0,0,0);
			var flg_start = this.isRange(temp,this.period_start);
			var flg_end = this.isRange(temp,this.period_end);
			if(flg_start || flg_end){
				if(this.period_end === null){
					this.period_end = new Date(temp);
				}else{
					if(flg_start && !flg_end){
						this.period_end = new Date(this.period_start);
						this.period_start = new Date(temp);
					}else if(flg_end && !flg_start){
						this.period_start = new Date(this.period_end);
						this.period_end = new Date(temp);
					}else if(flg_start && flg_end){
						if(temp.getTime() < this.period_start.getTime()){
							this.period_start = new Date(temp);
						}else if(temp.getTime() > this.period_end.getTime()){
							this.period_end = new Date(temp);
						}else{
							this.period_start = new Date(temp);
						}
					}
				}
				this.setDate(temp);
			}else{
				alert("不符合区间跨度!");
			}
		}.bind(this));
	}else{
		date.addEventListener("click",function(e){
			var target = e.target;
			if(target.nodeName.toUpperCase() == "SPAN"){
				this.setDate(target.dataset.time);
			}
		}.bind(this));
	}
};
Calendar.prototype.setSomeTime = function(data){
	if(this.period_start && this.period_end){
		var start = this.period_start.getTime();
		var end = this.period_end.getTime();
		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			var time = item.date.getTime();
			if( time > start && time < end ){
				item.style = item + " someTime";
			}
			if( time == start ){
				item.style = "selected";
			}
			if( time == end ){
				item.style = "selected";
			}
		}
	}
};
Calendar.prototype.isRange = function(temp,time){
	if(time === null)return false;
	var range = Math.abs(temp.getTime()-time.getTime());
	range = range/(1000*60*60*24);
	return range >= this.min && range <= this.max;
};
Calendar.prototype.target = function(){
	if(this.span){
		this.input.value = this.getPeriod();
	}else{
		this.input.value = this.getDate();
	}
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
	if(this.span){
		this.setSomeTime(data);
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
Calendar.prototype.close = function(){
	this.calendar.style.display = "none";
};
Calendar.prototype.open = function(){
	this.calendar.style.display = "block";
};
Calendar.prototype.isClose = function(){
	var cssStyle = getComputedStyle(this.calendar);
	return cssStyle.display == "none";
};
Calendar.prototype.sure = function(){
	this.target();
	this.close();
};
