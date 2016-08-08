/**
@method 判断是否是数组
@param 判断的参数
@return {boolean}
**/
function isArray(arr) {
    return Array.isArray(arr);
}
/**
@method 判断是否是函数
@param 判断的参数
@return {boolean}
**/
function isFunction(fn) {
    return fn instanceof Function;
}
/**
@method 判断是否是正则表达式
@param 判断的参数
@return {boolean}
**/
function isRegExp(str) {
    return str instanceof RegExp;
}
/**
@method 深拷贝数据（除了函数和正则表达式）
@param 拷贝的参数
@return 拷贝的结果
**/
function cloneObject(src) {
    if (typeof src === "object") {
        var o = null;
        if (isFunction(src) || isRegExp(src)) {
            return;
        }
        if (isArray(src)) {
            o = [];
        } else {
            o = {};
        }
        for (var key in src) {
            o[key] = cloneObject(src[key]);
        }
        return o;
    } else {
        return src;
    }
}

var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
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
function uniqArray(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i += 1) {
        if (arr[i] &&　result.indexOf(arr[i]) === -1) {
            result.push(arr[i]);
        }
    }
    return result;
}
var a = [1, 3, 3, 3, 3, 3, 3, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b);

/**
@method 字符串去空格
@param {string} 要去空格的字符串
@return {Array} 去空格的字符串
**/
function simpleTrim(str) {
    var s = "";
    for (var i = 0; i < str.length; i += 1) {
        if (str[i] !== " ") {
            s += str[i];
        }
    }
    return s;
}

function trim(str) {
    return str.replace(/\s+/g, "");
}

var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
    for (var i = 0, l = arr.length; i < l; i += 1) {
        fn(arr[i], i);
    }
}
// 使用示例
var arr = ['java', 'c', 'php', 'html'];

function output(item) {
    console.log(item);
}
each(arr, output); // java, c, php, html


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var a = 0;
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
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
    if (element.className) {
        element.className += " " + newClassName;
    } else {
        element.className = newClassName;
    }
}

// 移除element中的样式oldClassName
function removeClass1(element, oldClassName) {
    var classNames = element.className.split(/\s+/);
    var pos = classNames.indexOf(oldClassName);
    if (pos != -1) {
        classNames.splice(pos, 1);
    }
    element.className = classNames.join(" ");
}
// 移除element中的样式oldClassName
function removeClass2(element, oldClassName) {
    element.className = element.className.replace("/\s+" + oldClassName + "\s+/", " ");
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
    var x = element.offsetLeft;
    var y = element.offsetTop;
    var p = element.parentElement;
    if (p) {
        x = x + getPosition(p).x;
        y = y + getPosition(p).y;
    }
    return { x: x, y: y };
}







function getAttrElement(node, attr, value) {
    if (node.nodeName == "#document") {
        node = node.children[0];
    }
    if (node.getAttribute(attr) === value) {
        return node;
    }
    for (var i = 0, l = node.childElementCount; i < l; i += 1) {
        var item = node.children[i];
        var result = getAttrElement(item, attr, value);
        if (result) {
            return result;
        }
    }
    return false;
}

function hasAttrElement(node, attr) {
    if (node.nodeName == "#document") {
        node = node.children[0];
    }
    if (node.getAttribute(attr)) {
        return node;
    }
    for (var i = 0, l = node.childElementCount; i < l; i += 1) {
        var item = node.children[i];
        var result = hasAttrElement(item, attr);
        if (result) {
            return result;
        }
    }
    return false;
}

function $(selector) {
    var list = selector.split(/\s+/);
    var node = document;
    for (var i = 0, l = list.length; i < l; i += 1) {
        var item = list[i];
        if ((/^\#\w+$/).test(item)) {
            node = node.getElementById(item.substring(1));
        } else if ((/^\.\w+/).test(item)) {
            node = node.getElementsByClassName(item.substring(1))[0];
        } else if ((/^\[.+=.+\]$/).test(item)) {
            var value = item.substring(1, item.length - 1).split("=")[1];
            var attr = item.substring(1, item.length - 1).split("=")[0];
            node = getAttrElement(node, attr, value);
        } else if ((/^\[.+\]$/).test(item)) {
            var attr = item.substring(1, item.length - 1);
            node = hasAttrElement(node, attr);
        } else if ((/^\w+$/).test(item)) {
            node = node.getElementsByTagName(item)[0];
        }
    }
    return node;
}

$.on = function(selector, event, listener) {
    // your implement
    var element = $(selector);
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }
}

$.click = function(selector, listener) {
    // your implement
    var element = $(selector);
    if (element.addEventListener) {
        element.addEventListener("click", listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("onclick", listener);
    } else {
        element.onclick = listener;
    }
}

$.un = function(selector, event, listener) {
    // your implement
    var element = $(selector);
    if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    } else if (element.detachEvent) {
        element.detachEvent("on" + event, listener);
    } else {
        element["on" + event] = null;
    }
}

$.delegate = function(selector, tag, event, listener) {
    // your implement
    var element = $(selector);
    if (element.addEventListener) {
        element.addEventListener(event, function(e) {
            var target = e.target || window.target;
            if (target.nodeName.toUpperCase() === tag.toUpperCase()) {
                listener(e);
            }
        }, false);
    } else if (element.attachEvent) {
        element.attachEvent(event, function(e) {
            var target = e.target || window.target;
            if (target.nodeName.toUpperCase() === tag.toUpperCase()) {
                listener(e);
            }
        });
    } else {
        element["on" + event] = function(e) {
            var target = e.target || window.target;
            if (target.nodeName.toUpperCase() === tag.toUpperCase()) {
                listener(e);
            }
        };
    }
};

$.enter = function(selector, listener) {
    if (element.addEventListener) {
        element.removeEventListener("keyup",
            function(event) {
                listener(event);
            }, false);
    } else if (element.attachEvent) {
        element.attachEvent("onkeyup",
            function(event) {
                listener(event);
            });
    } else {
        element.onkeyup = function(event) {
            if (event.charCode == 13) {
                listener(event);
            }
        };
    }
}

// 例如：
function clicklistener(event) {
    var target = event.target || window.target;
    console.log(event);
    console.log(target);
}








// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
    var ua = window.navigator.userAgent;
    if ((/MSIE ([^;]+)/).test(ua)) {
        return RegExp["$1"];
    }
    return -1;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
    var cookie = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue);
    if (expiredays) {
        cookie += "; expire=" + expiredays.toGMTString();
    }
    document.cookie = cookie;
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
    var cookie = encodeURIComponent(cookieName) + "=";
    var start = document.cookie.indexOf(cookie);
    var cookieValue = null;
    if (start > -1) {
        var end = document.cookie.indexOf(";", start);
        if (end == -1) {
            end = document.cookie.length;
        }
        cookieValue = document.cookie.substring(start + cookie.length, end);
        cookieValue = decodeURIComponent(cookieValue);
    }
    return cookieValue;
}


// options是一个对象，里面可以包括的参数为：

// type: post或者get，可以有一个默认值
// data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
// onsuccess: 成功时的调用函数
// onfail: 失败时的调用函数
function ajax(url, options) {
    // your implement
    var type = options.type || 'get',
        data = options.data,
        success = options.onsuccess,
        fail = options.onfail,
        xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.send(data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status <= 300) || xhr == 304) {
                success();
            } else {
                fail();
            }
        }
    };
}
// // 使用示例：
// ajax(
//     'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=apple',
//     {
//         data: {
//             name: 'simon',
//             password: '123456'
//         },
//         onsuccess: function (responseText) {
//             console.log(responseText);
//         }
//     }
// );