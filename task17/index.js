/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}
//颜色选择
function getColor(){
  var a = Math.ceil(Math.random() * 255);
  var b,c;
  if(a > 145){
    b = a-100;
    c = a-50;
  }
  if(a < 100){
    b = a+100;
    c = a+50;
  }
  else{
    b = a+100;
    c = a-100;
  }
  return "rgb("+a+","+b+","+c+")";
}
//时间选择
var time = ["day","week","month"];
//DOM元素
// var radio = document.getElementsByName("gra-time");
// var select = document.getElementById("city-select");
var chart = document.getElementsByClassName("aqi-chart-wrap")[0];
/**
 * 渲染图表
 */
function renderChart() {
  chart.innerHTML = "";
  chart.style.height = "500px";
  chart.style.display = "table";
  chart.style.width = "100%";
  var num = Object.getOwnPropertyNames(chartData).length;
  var width = 100/num;
  var outer = document.createElement("div");
  outer.style.display = "table-cell";
  outer.style.verticalAlign = "bottom";
  chart.appendChild(outer);
  for(var data in chartData){
    var inner = document.createElement("div");
    inner.style.width = width+"%";
    inner.style.display = "inline-block";
    var option = document.createElement("div");
    option.style.display = "inline-block";
    option.style.width = "90%";
    option.style.margin ="0 auto";
    option.style.maxWidth = "200px";
    option.style.height = chartData[data]+"px";
    option.style.backgroundColor = getColor();
    option.title = "日期："+data+"\n"+"空气指数："+chartData[data];
    inner.appendChild(option);
    outer.appendChild(inner);
  }
}
function changeData(){
  var radio = document.getElementsByName("gra-time");
  var select = document.getElementById("city-select");
  var index = Number(pageState["nowSelectCity"]);
  var city = select.options[index].innerHTML;
  var data = aqiSourceData[city];
  chartData = {};
  // 设置对应数据
  if(pageState["nowGraTime"] == "day"){
     chartData = data;
  }else if(pageState["nowGraTime"] == "week"){
    var sum = 0;
    var count = 0;
    var j = 0;
    var start = "2016-01-01";
    var end = "2016-01-01";
    for(var i in data){
      if(j == 0){start = i;}
      var date = new Date(i);
      sum = sum + data[i];
      j++;
      count++;
      var t = date.getDay();
     if(count ==31 || count == 60 || count == 91 || date.getDay()==0){
        end = i;
        chartData[start+"~"+end] = Math.ceil(sum/j);
        j = 0;
        sum = 0;
      }
    }
  }else{
    var sum = 0;
    var count = 1;
    for(var i in data){
      sum = sum + data[i];
      if(count == 31){
        chartData["2016-01月"] = Math.ceil(sum/31);
        sum = 0;
      }else if(count == 60){
        chartData["2016-02月"] = Math.ceil(sum/29);
        sum = 0;
      }else if(count == 91){
        chartData["2016-03月"] = Math.ceil(sum/31);
      }
      count++;
    }
  }
  // 调用图表渲染函数
  renderChart();
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var radio = document.getElementsByName("gra-time");
  var select = document.getElementById("city-select");
  for(var i = 0;i<radio.length;i++){
    if(radio[i].checked){
      if(pageState["nowGraTime"] == time[i]){
        return ;
      }
      pageState["nowGraTime"] = time[i];
    }
  } 
  changeData();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  var select = document.getElementById("city-select");
  // 确定是否选项发生了变化 
  var index = select.selectedIndex;
  // 设置对应数据
  if(index == pageState["nowSelectCity"]){
    return ;
  }
  pageState["nowSelectCity"] = index;
  changeData();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radio = document.getElementsByName("gra-time");
  for(var i = 0;i<radio.length;i++){
    radio[i].onclick = graTimeChange;
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  var select = document.getElementById("city-select");
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  select.innerHTML = "";
  for(var i in aqiSourceData){
    var option = document.createElement("option");
    option.innerHTML = i;
    select.appendChild(option);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  select.onclick = citySelectChange;

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var select = document.getElementById("city-select");
  var index = Number(pageState["nowSelectCity"]);
  var city = select.options[index].innerHTML;
  var data = aqiSourceData[city];
  // 处理好的数据存到 chartData 中
  changeData();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
