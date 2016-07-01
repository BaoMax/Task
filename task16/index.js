/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById("aqi-city-input").value;
	var num = document.getElementById("aqi-value-input").value;
    var regExp = /^[\u4e00-\u9fa5a-zA-Z]+$/;
    var reg = /^\d+$/;
    if(regExp.test(city)){
    	if (reg.test(num)) {
    		aqiData[city] = num;
    	}
    	else{
    		alert("请输入正确的空气指数，只能是正整数！");
    	}
    }
    else{
    	alert("请输入正确的城市名称，只能由中文和英文字母组成！");
    }
}
function isEmpty(datas){
	for (var data in datas) {
		return false;
	};
	return true;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
		table.innerHTML = "";
	if(!isEmpty(aqiData)){
		var tr = document.createElement("tr");
		var str = "<td>城市</td><td>空气质量</td></td>操作</td>";
		tr.innerHTML = str;
		table.appendChild(tr);
		for(var i in aqiData){
			tr = document.createElement("tr");
			str = "<td>"+i+"</td><td>"+aqiData[i]+"</td><td><button>删除</button></td>";
			tr.innerHTML = str;
			table.appendChild(tr);
		}
	}
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  var key = this.parentNode.parentNode.firstChild.innerHTML;
  delete aqiData[key];
  renderAqiList();
}
function addEvent(element,eventName,handler){
    if(element.addEventListener){
      element.addEventListener(eventName,handler);
    }else if(element.attachEvent){
      element.attachEvent("on"+eventName,handler);
    }else{
      element["on"+eventName] = handler;
    }
}
function degegateEvent(element,Tag,eventName,handler){
  addEvent(element,eventName,function(){
    var event = arguments[0] || window.event;
    var target = event.target || event.srcElement;
    if(target && target.nodeName.toUpperCase()===Tag.toUpperCase()){
      handler.call(target,event);
    }
  });
}
function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("add-btn").onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var table = document.getElementById("aqi-table");
  degegateEvent(table,"button","click",delBtnHandle);
  // if(table.addEventListener){
  //   table.addEventListener("click",function(event){
  //     if(event.target && event.target.nodeName.toUpperCase()=="BUTTON"){
  //       delBtnHandle.call(null,event);
  //     }
  //   });
  // }else if(table.attachEvent){
  //   table.attachEvent("onclick",function(event){
  //     if(event.target && event.target.nodeName.toUpperCase()=="BUTTON"){
  //       delBtnHandle.call(null,event);
  //     }
  //   });
  // }


  // document.getElementById("aqi-table").addEventListener("click",function(event){
  // 	if(event.target && event.target.nodeName.toUpperCase()=="BUTTON"){
  // 		delBtnHandle.call(null,event);
  // 	}
  // });
}

init();
