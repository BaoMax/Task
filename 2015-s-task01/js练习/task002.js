function $(id){
	return document.getElementById(id);
}
function add(num1,num2){
	return num1 + num2;
}
function renderResult(result){
	$("result").innerHTML = result;
}
function addEvent(){
	var num1 = Number($("number1").value);
	var num2 = Number($("number2").value);
	var result = add(num1,num2);

	renderResult(result);
}
function initEvent(){
	$("addbtn").addEventListener("click",addEvent,false);
}

initEvent();