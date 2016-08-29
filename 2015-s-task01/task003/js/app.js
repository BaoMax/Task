// var localStorage = null;

// function init() {
//     if (window.localStorage) {
//         localStorage = window.localStorage;
//     } else {
//         alert("window.localStorange");
//         return;
//     }
// }
// init();

var localStorage = window.localStorage,
    taskList = window.localStorage.taskList || {
        "默认分类": { num: 0 },
        "宝贝计划": {
            "planA": {
                "plan-A-01": {
                    "title": "plan-A-01",
                    "date": "2016-07-07",
                    "content": "plan-A-01plan-A-01",
                    "state": 1
                },
                "plan-A-02": {
                    "title": "plan-A-02",
                    "date": "2016-08-08",
                    "content": "plan-A-02plan-A-02",
                    "state": 0
                },
                "plan-A-03": {
                    "title": "plan-A-03",
                    "date": "2016-09-09",
                    "content": "plan-A-03plan-A-03",
                    "state": 0
                },
                parent: "planA",
                num: 3
            },
            "planB": {
                "plan-B-01": {
                    "title": "plan-B-01",
                    "date": "2016-10-16",
                    "content": "plan-B-01plan-B-01",
                    "state": 0
                },
                parent: "planB",
                num: 1
            },
            parent: "宝贝计划",
            num: 4
        },
        parent: null,
        num: 4
    },
    taskType = {},
    tasks = {},
    taskDetail = {};

function analysisData(data) {
    for (var key in data) {
        if (data.hasOwnProperty(key) && key !== 'num' && key !== 'parent') {
            var element = data[key];
            taskType[key] = data[key];
            if (element.num > 0) {
                // analysisData(element, tasks);
                for (var item in element) {
                    if (element.hasOwnProperty(item) && item !== 'num' && item !== 'parent') {
                        var task = element[item];
                        tasks[item] = element[item];
                        if (task.num > 0) {
                            for (var o in task) {
                                if (task.hasOwnProperty(o) && o !== 'num' && o !== 'parent') {
                                    taskDetail[o] = task[o];
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function decodeData(data) {
    var list = document.getElementsByClassName("floder-list")[0],
        str = "";
    for (item in data) {
        if (data.hasOwnProperty(item)) {
            str += '<li data-title="' + item + '"><i class="icon icon-floder"></i>' + item + '（' + data[item].num + '）<i class="icon icon-delete"></i>';
            if (data[item].num !== 0) {
                str += fileDecode(data[item]);
            }
            str += "</li>";
        }
    }
    list.innerHTML = str;
}

function fileDecode(data) {
    var str = '<ul class="file-list">';
    for (item in data) {
        if (data.hasOwnProperty(item) && item !== "num" && item !== "parent") {
            str += '<li data-title="' + item + '"><i class="icon icon-file"></i>' + item + '（' + data[item].num + '）</li>';
        }
    }
    str += "</ul>";
    return str;
}

function detailDecode(data) {
    var arr = [],
        temp = [],
        result = {};
    for (item in data) {
        if (data.hasOwnProperty(item) && item !== "num") {
            arr.push(data[item]);
        }
    }
    temp = arr.sort(function(prev, next) {
        var prevTime = new Date(prev.date),
            nextTime = new Date(next.date);
        return prevTime - nextTime;
    });
    for (var i = 0, l = temp.length; i < l; i += 1) {
        var item = temp[i],
            date = item['date'];
        if (result[date]) {
            result[date].push(item);
        } else {
            result[date] = new Array();
            result[date].push(item);
        }
    }
    return result;
}

function showTask(data) {
    var parentNode = document.getElementsByClassName("task")[0],
        node = parentNode.getElementsByTagName("footer")[0],
        dl = parentNode.getElementsByTagName("dl").length ? parentNode.getElementsByTagName("dl")[0] : document.createElement("dl"),
        str = "";
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var element = data[key];
            str += '<dt>' + key + '</dt>';
            for (var i = 0, l = element.length; i < l; i += 1) {
                str += '<dd>' + element[i].title + '</dd>';
            }
        }
    }
    dl.innerHTML = str;
    parentNode.insertBefore(dl, node);
}

function bindEvent() {
    var list = document.getElementsByClassName("floder-list")[0];
    addEvent(list, "click", function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement,
            parentNode = target.parentElement;
        if (target.nodeName.toUpperCase() === "LI") {
            var node = target.getElementsByClassName("file-list")[0];
            if (node) {
                var css = getComputedStyle(node);
                if (css.display === "none") {
                    target.getElementsByClassName("file-list")[0].style.display = "block";
                } else {
                    target.getElementsByClassName("file-list")[0].style.display = "none";
                }
            }
            if (parentNode.className === "file-list") {
                var parentText = parentNode.parentNode.getElementsByClassName("icon-floder")[0].nextSibling.nodeValue.replace(/（\d+）/g, ''),
                    title = target.innerText.replace(/（\d+）/g, ''),
                    obj = detailDecode(taskList[parentText][title]);
                target.style.backgroundColor = "#fff";
                showTask(obj);
            }
        }
    });

}

function init() {
    analysisData(taskList);
    decodeData(taskType);
    // bindEvent();
}
init();