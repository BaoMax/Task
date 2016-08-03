/**
@method 判断是否是数组
@param 判断的参数
@return {boolean}
**/
function isArray(arr){
	return Array.isArray(arr);
}
/**
@method 判断是否是函数
@param 判断的参数
@return {boolean}
**/
function isFunction(fn){
	return fn instanceof Function;
}
/**
@method 判断是否是正则表达式
@param 判断的参数
@return {boolean}
**/
function isRegExp(str){
	return str instanceof RegExp;
}
/**
@method 深拷贝数据（除了函数和正则表达式）
@param 拷贝的参数
@return 拷贝的结果
**/
function cloneObject(src) {
	if(typeof src === "object"){
		var  o = null;
		if(isFunction(src) || isRegExp(src)){
			return ;
		}
		if(isArray(src)){
			o = [];
		}else{
			o = {};
		}
		for(var key in src){
			o[key] = cloneObject(src[key]);
		}
		return o;
	}else{
		return src;
	}
}

var srcObj = {
	a:1,
	b:{
		b1:["hello","hi"],
		b2:"JavaScript"
	}
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);
console.log(tarObj.b.b1[0]);

/**
@method 数组去重
@param {Array} 要去重的数组
@return {Array} 去重后的数组
**/
function uniqArray(arr){
	var result = [];
	for(var i = 0;i < arr.length;i += 1){
		if(result.indexOf(arr[i]) === -1 ){
			result.push(arr[i]);
		}
	}
	return result;
}
var a = [1,3,3,3,3,3,3,3,5,7,5,3];
var b = uniqArray(a);
console.log(b);

/**
@method 数组去重
@param {Array} 要去重的数组
@return {Array} 去重后的数组
**/
function simpleTrim(str){
	var s = "";
	for(var i = 0;i < str.length;i += 1){
		if(str[i] !== " "){
			s += str[i];
		}
	}
	return s;
}

function trim(str){
	return str.replace(/\s+/g,"");
}

var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
    arr.forEach(function(item,index){
    	fn(item,index);
    });
}
// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item);
}
each(arr, output);  // java, c, php, html


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var a = 0;
	for(var k in obj){
		if(obj.hasOwnProperty(k)){
			a += 1;
		}
	}
	return a;
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3

// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    return (/^1[3-57-8]\d{9}$/).test(phone);
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
    element.className += " " + newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
	var classNames = element.className.split(/\s+/);
	var pos = classNames.indexOf(oldClassName);
    if(pos != -1){
    	classNames.splice(pos,1);
    }
   	element.className = classNames.join(" ");
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    var next = element.nextElementSibling;
    var prev = element.previousElementSibling;
    return next === siblingNode || prev === siblingNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var x = element.clientLeft;
    var y = element.clientTop;
    return {x:x,y:y};
}
// your implement