var btn = document.getElementById("submit"),
	time = document.getElementById("time"),
	text = document.getElementById("text"),
	timer = null;
btn.addEventListener("click",function(){
	if(timer){
		clearInterval(timer);
		timer = null;
	}
	setTime();
},false);
function setTime(){

	var secondUnit = 1000,
		minuteUnit = secondUnit * 60,
		hourUnit = minuteUnit * 60,
		dayUnit = hourUnit * 24,
		date = new Date(time.value),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate();


	timer = setInterval(function(){
		var period = date - new Date();
		if(period === 0){
			clearInterval(timer);
			timer = null;
			return ;
		}
		var	periodDay = parseInt(period / dayUnit,10),
			periodHour = parseInt((period % dayUnit) / hourUnit,10),
			periodMinute = parseInt((period % hourUnit) / minuteUnit,10);
			periodSecond = parseInt((period % minuteUnit) / secondUnit,10);
		text.innerHTML = "距离" + year + "年" + month + "月" + day + "日还有" + periodDay + "天" + periodHour + "小时" + periodMinute + "分钟" + periodSecond + "秒";
	},1000);
}