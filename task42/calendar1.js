/**
@class Calendar
@constructer
@param {Dom node} 容器
@param {Dom node} 时间显示目标元素节点
@param {Object} 配置的参数
@obj.startTime {string} 开始时间
@obj.startTime {string} 结束时间
@obj.callback {function} 回调函数
@obj.span {Object} 跨度
@obj.span.min {Number} 最小跨度
@obj.span.max {Number} 最大跨度
**/
var Calendar = function(wrap,target,obj){
	var that = this;
	this.startTime = new Date(obj.startTime);
	this.endTime = new Date(obj.endTime);
	this.date = new Date();
	this.date.setHours(0,0,0,0);
	this.month = this.date.getMonth() + 1;
	this.year = this.date.getFullYear();
	this.wrap = wrap;
	this.target = target;
	this.callback = obj.callback;
	this.calendar = document.createElement("div");
	this.calendar.className = "calendar";

	if(obj.span){
		this.span = true;
		this.minSpan = obj.span.min;
		this.maxSpan = obj.span.max;
		// this.date = null;
		this.spanStart = null;
		this.spanEnd = null;
	}else{
		this.span = false;
	}

	this.init();
	
	return {
		// that : that,
		setDate : that.setDate.bind(that),
		getDate : that.getDate.bind(that),
		setSpan : that.setSpan.bind(that)
	};
};
Calendar.prototype = {
	/**
	@method:创建日历抬头
	@return {Dom node}抬头节点
	**/
	createHead : function() {
		var head = document.createElement("div");
		head.className = "head";
		head.innerHTML = "<i class='prev'><</i><span class='now'></span><i class='next'>></i>";
		return head;
	},
	/**
	@method:创建日历体及星期标题
	@return {Dom node}日历体节点
	**/
	createWeekend : function() {
		var date = document.createElement("div"),
			days = document.createElement("div");
		date.className = "dates";
		days.className = "dates";
		date.innerHTML = "<span class='weekend'>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span class='weekend'>六</span>";
		this.days = days;
		return date;
	},
	/**
	@method:判断日期类型
	@param {date} 日期
	@return {Object} 类型
	**/
	typeJudg : function(date) {
		var item = {},
			month = date.getMonth() + 1,
			day = date.getDay();
		item.date = new Date(date);
		if( date >= this.startTime && date <= this.endTime ){
			if( this.span ){
				if( this.spanStart && date.getTime() === this.spanStart.getTime()){
					item.style = "selected";
				}else if( this.spanEnd && date.getTime() === this.spanEnd.getTime() ){
					item.style = "selected";
				}else if( this.spanStart && this.spanEnd && date >= this.spanStart && date <= this.spanEnd){
					item.style = "someTime";
				}else if( month != this.month ){
					item.style = "invalid";
				}else if( day === 0 || day === 6){
					item.style = "weekend";
				}else{
					item.style = "";
				}
			}else{
				if( month != this.month ){
					item.style = "invalid";
				}else if( date.getTime() == this.date.getTime() ){
					item.style = "selected";
				}else if( day === 0 || day === 6 ){
					item.style = "weekend";
				}else{
					item.style = "";
				}
			}
		}else{
			item.style = "expired";
		}

		return item;
	},
	/**
	@method:渲染当前月的日历
	@param {Object} 日历数组
	@return {Dom node}日历体节点
	**/
	createDays : function(data) {
		var str = "";
		data.forEach( function (item,i){
			str = str + "<span class='" + item.style + "' data-time='"+ item.date.toDateString() +"'>" + item.date.getDate() + "</span>";
		});
		this.days.innerHTML = str;
	},
	/**
	@method：把日期变成数组
	@return {Array} 格式化的数组
	**/
	datesToArray : function(){
		var date = new Date(this.date),
			day = 0,
			data = [];
		date.setFullYear(this.year,this.month - 1,1);
		date.setHours(0,0,0,0);
		day = date.getDay();
		date.setDate(date.getDate() - day);
		for(var i = 0 ; i < 42; i += 1){
			data.push(this.typeJudg(date));
			date.setDate(date.getDate() + 1);
		}
		return data;
	},
	/**
	@method:添加确定取消按钮
	@return {Dom node} 按钮组
	**/
	addButton : function(){
		var btnGroup = document.createElement("div");
		btnGroup.className = "btn_group";
		btnGroup.innerHTML = "<button class='sure'>确定</button><button class='cancel'>取消</button>";

		return btnGroup;
	},
	/**
	@method: 前一个月
	**/
	prev : function(){
		this.date.setMonth( this.date.getMonth() - 1 );

		this.month = this.date.getMonth() + 1;
		this.year = this.date.getFullYear();
		
		this.head.innerHTML = this.year + "年" + this.month + "月";
		this.createDays(this.datesToArray());
	},
	/**
	@method: 后一个月
	**/
	next : function(){
		this.date.setMonth( this.date.getMonth() + 1 );

		this.month = this.date.getMonth() + 1;
		this.year = this.date.getFullYear();
		this.head.innerHTML = this.year + "年" + this.month + "月";
		this.createDays(this.datesToArray());
	},
	/**
	@method: 开关闭日历
	**/
	openToolge : function(){
		var cssStyle = getComputedStyle(this.calendar);
		if(cssStyle.display == "none"){
			this.open();
		}else{
			this.close();
		}
	},
	/**
	@method: 关闭日历
	**/
	close : function(){
		this.calendar.style.display = "none";
	},
	/**
	@method: 打开日历
	**/
	open : function(){
		this.calendar.style.display = "block";
	},
	/**
	@method: 确认函数
	**/
	sure : function(){
		this.target.value = this.getDate();
		this.callback();
		this.close();
	},
	/**
	**/
	/**
	@method: 事件绑定函数
	**/
	bindEvents : function(){
		this.target.addEventListener("click",this.openToolge.bind(this));
		// this.target.addEventListener("blur",this.close.bind(this));
		this.prevBtn.addEventListener("click",this.prev.bind(this));
		this.nextBtn.addEventListener("click",this.next.bind(this));
		this.sureBtn.addEventListener("click",this.sure.bind(this));
		this.cancelBtn.addEventListener("click",this.close.bind(this));
		this.days.addEventListener("click",function(e){
			var target = e.target,
				temp = target.dataset.time;
			if(target.nodeName.toUpperCase() === "SPAN"){
				if(this.span){
					var flgStart = this.isRange( this.spanStart,new Date( temp ) ),
					flgEnd = this.isRange( this.spanEnd,new Date( temp ) );
					if(this.spanStart === null){
						this.spanStart = new Date(target.dataset.time);
					}else if(this.spanEnd === null){
						if(flgStart){
							if(this.spanStart < new Date( temp )){
								this.spanEnd = new Date( temp );
							}else{
								this.spanEnd = new Date( spanStart );
								this.spanStart = new Date( temp );
							}
						}else{
							alert("不在跨度区间内！");
							return ;
						}
					}else{
						if(flgStart && !flgEnd){
							if(this.spanStart > new Date( temp )){
								this.spanEnd = new Date(this.spanStart);
								this.spanStart = new Date(temp);
							}else {
								this.spanEnd = new Date(temp);
								this.spanStart = new Date(this.spanStart);
							}
						}else if (!flgStart && flgEnd) {
							if(this.spanEnd > new Date( temp )){
								this.spanStart = new Date(temp);
								this.spanEnd = new Date(this.spanEnd);
							}else {
								this.spanStart = new Date(this.spanEnd);
								this.spanEnd = new Date(temp);
							}
						}else if (flgEnd && flgStart){
							if(new Date(temp) < this.spanStart){
								this.spanStart = new Date(temp);
							}else if(new Date(temp) > this.spanEnd){
								this.spanEnd = new Date(temp);
							}else{
								this.spanStart = new Date(temp);
							}
						}else{
							alert("不在跨度区间内！");
							return ;
						}
					}
				this.setDate(temp);
				}else{
					this.setDate(temp);
				}
			}
		}.bind(this));
	},
	/**
	@method:初始化函数
	@param {Date} 被比较日期
	@param {Date} 比较日期
	@return {Boolean} 结果
	**/
	isRange : function(date,temp){
		if( date === null )return false;
		var range = Math.abs(temp.getTime() - date.getTime());
		range = range/(1000*60*60*24);
		return range >= this.minSpan && range <= this.maxSpan;
	},
	/**
	@method:初始化函数
	**/
	init : function(){
		var head = this.createHead(),
			weekend = this.createWeekend(),
			btnGroup = this.addButton();
		this.head = head.querySelector(".now");
		this.head.innerHTML = this.year + "年" + this.month + "月";
		this.prevBtn = head.querySelector(".prev");
		this.nextBtn = head.querySelector(".next");
		this.sureBtn = btnGroup.querySelector(".sure");
		this.cancelBtn = btnGroup.querySelector(".cancel");
		this.calendar.appendChild(head);
		this.calendar.appendChild(weekend);
		this.calendar.appendChild(this.days);
		this.calendar.appendChild(btnGroup);
		this.wrap.appendChild(this.calendar);
		this.createDays(this.datesToArray());
		this.bindEvents();
	},
	/**
	@method:设置日期
	@param: {String} 日期
	**/
	setDate : function(date){
		this.date = new Date(date);
		this.month = this.date.getMonth() + 1;
		this.year = this.date.getFullYear();
		this.head.innerHTML = this.year + "年" + this.month + "月";
		this.createDays(this.datesToArray());
		return this;
	},
	/**
	@method: 返回日期
	@return {String} 日期
	**/
	getDate : function(){
		if(!this.span){
			var date = this.date.getDate(),
				month = this.month > 9 ? this.month : "0" + this.month,
				year = this.year;
			return year + "年" + month + "月" + date + "日";
		}
		if(this.spanStart && this.spanEnd){
			var startTime = this.spanStart.getDate(),
				startMonth = this.spanStart.getMonth() + 1,
				startYear = this.spanStart.getFullYear(),
				endTime = this.spanEnd.getDate(),
				endMonth = this.spanEnd.getMonth() + 1,
				endYear = this.spanEnd.getFullYear();
			startMonth = startMonth > 9 ? startMonth : "0" + startMonth;
			endMonth = endMonth > 9 ? endMonth : "0" + endMonth;
			return startYear + "年" + startMonth + "月" + startTime + "日--" + endYear + "年" + endMonth + "月" + endTime + "日";
		}
		alert("请选择时间区间！");
		return ;
	},
	/**
	@method: 设置跨度
	@param {Number} 最小跨度
	@param {Number} 最大跨度
	**/
	setSpan : function(min,max){
		if(this.span){
			this.min = min;
			this.max = max;
			return ;
		}
		alert("不符合！");
		return ;
	}
};




var wrapDay = document.getElementById("calendar_day"),
	targetDay = document.getElementById("day"),
	wrapPeriod = document.getElementById("calendar_period"),
	targetPeriod = document.getElementById("period"),
	c = new Calendar(wrapDay,targetDay,{
		startTime : "2015/01/01",
		endTime : "2016/12/31",
		callback : function(){
			alert("回调函数1");
		}
	}),
	c1 = new Calendar(wrapPeriod,targetPeriod,{
		startTime : "2015/01/01",
		endTime : "2016/12/31",
		callback : function(){
			alert("回调函数2");
		},
		span : {
			min : 3,
			max : 7
		}
	});
	alert(c.getDate());