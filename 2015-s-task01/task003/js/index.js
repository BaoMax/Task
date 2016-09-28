var localStorage = window.localStorage,
    taskType = {
        "默认分类": null,
        "宝贝计划": {
            "planA": 3,
            "planB": 1
        }
    },
    tasks = {
        "planA": {
            "2016-08-08": [{
                "title": "plan-A-02",
                "date": "2016-08-08",
                "content": "plan-A-02plan-A-02",
                "state": 0
            }],
            "2016-07-07": [{
                "title": "plan-A-01",
                "date": "2016-07-07",
                "content": "plan-A-01plan-A-01",
                "state": 1
            }],
            "2016-09-09": [{
                "title": "plan-A-03",
                "date": "2016-09-09",
                "content": "plan-A-03plan-A-03",
                "state": 0
            }]
        },
        "planB": {
            "2016-08-08": [{
                "title": "plan-B-01",
                "date": "2016-08-08",
                "content": "plan-B-01plan-B-01",
                "state": 0
            }]
        }
    },
    currentTask = {},
    currentType = {},
    currentTaskDetail = {};

function render(node, data) {
    var sumDom = document.getElementsByClassName("task-num")[0],
        str = "";
    for (var key in taskType) {
        if (taskType.hasOwnProperty(key)) {
            var element = taskType[key],
                sum = 0;
            if (element) {
                var s = '<ul class="file-list">';
                for (var item in element) {
                    sum += element[item];
                    s += '<li data-title="' + item + '"><i class="icon icon-file"></i>' + item + '（' + element[item] + '）</li>';
                }
                s += '</ul>';
                str += '<li data-title="' + key + '"><i class="icon icon-floder"></i>' + key + '（' + sum + '）<i class="icon icon-delete"></i>' + s + '</li>';
            } else {
                str += '<li><i class="icon icon-floder"></i>' + key + '（' + sum + '）<i class="icon icon-delete"></i></li>';
            }
        }
    }
    node.innerHTML = str;

    sumDom.innerText = getSum();
}

function renderDialog() {
    var box = document.getElementsByClassName("box")[0],
        selectDom = document.getElementsByTagName("select")[0],
        str = "<option value='none'>无</option>";
    for (var key in taskType) {
        if (taskType.hasOwnProperty(key)) {
            var element = taskType[key];
            str += "<option value='" + key + "'>" + key + "</option>";
        }
    }
    selectDom.innerHTML = str;
}
render(document.getElementsByClassName("floder-list")[0], taskType);
renderDialog();

function bindEvent() {
    var node = document.getElementsByClassName("floder-list")[0];
    addEvent(node, "click", function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        if (target.nodeName.toUpperCase() === "LI") {
            var str = target.getAttribute("data-title"),
                obj = filterTask(str);
            console.log(obj);
            showTask(obj);
            currentTask = obj;
            currentType = taskType[str] || currentType;
            removeClassBat(node, "li", "selected");
            addClass(target, "selected");
        }
    });

    var taskState = document.getElementsByClassName("task-state")[0];
    addEvent(taskState, "click", function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        if (target.nodeName.toUpperCase() === "SPAN") {
            var state = target.getAttribute("data-state");
            state = state === "all" ? "all" : parseInt(state);
            var obj = getTaskByState(state);
            showTask(obj);
            removeClassBat(taskState, "span", "selected");
            addClass(target, "selected");
        }
    });

    var dlDom = document.getElementsByClassName("task")[0].getElementsByTagName("dl")[0];
    addEvent(dlDom, "click", function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        if (target.nodeName.toUpperCase() === "DD") {
            var date = target.getAttribute("data-date"),
                task = getTaskByTitle(currentTask[date], target.innerText);
            removeClassBat(dlDom, "dd", "selected");
            addClass(target, "selected");
            if (task) {
                var content = document.getElementsByClassName("task-detail")[0],
                    titleDom = content.getElementsByClassName("title")[0],
                    dateDom = content.getElementsByClassName("date")[0].getElementsByTagName("input")[0],
                    text = content.getElementsByClassName("content")[0];
                currentTaskDetail = task;
                titleDom.value = task.title;
                dateDom.value = task.date;
                text.value = task.content;
            }
        }
    });

    var addTypeDom = document.getElementsByClassName("footer-taskType")[0];
    addEvent(addTypeDom, "click", function() {
        var dialogDom = document.getElementsByClassName("dialog")[0];
        removeClass(dialogDom, "hide");
    });

    var addTaskDom = document.getElementsByClassName("footer-task")[0];
    addEvent(addTaskDom, "click", function() {

    });

    var sureBtn = document.getElementsByClassName("dialog")[0].getElementsByTagName("button")[0];
    addEvent(sureBtn, "click", function() {
        var boxDom = document.getElementsByClassName("dialog")[0].getElementsByClassName("box")[0];
        var title = boxDom.getElementsByTagName("input")[0].value,
            parent = boxDom.getElementsByTagName("select")[0].selectedOptions[0].value;
        if (title !== "") {
            if (parent === "none") {
                taskType[title] = {};
            } else {
                taskType[parent][title] = 0;
                tasks[title] = {};
            }
            render(document.getElementsByClassName("floder-list")[0], taskType);
            renderDialog();
            var dialogDom = document.getElementsByClassName("dialog")[0];
            addClass(dialogDom, "hide");
        }
    });

    var closeDom = document.getElementsByClassName("close")[0];
    addEvent(closeDom, "click", function() {
        addClass(document.getElementsByClassName("dialog")[0], "hide");
    });
}
bindEvent();

function getSum() {
    var sum = 0;
    for (var key in tasks) {
        if (tasks.hasOwnProperty(key)) {
            var element = tasks[key];
            if (element) {
                for (var item in element) {
                    if (element.hasOwnProperty(item)) {
                        var temp = element[item];
                        if (temp instanceof Array) {
                            sum += temp.length;
                        }
                    }
                }
            }
        }
    }
    return sum;
}

function getTaskByTitle(arr, title) {
    for (var i = 0, l = arr.length; i < l; i += 1) {
        if (arr[i].title === title) {
            return arr[i];
        }
    }
    return null;
}

function getTaskByState(state) {
    var result = {};
    for (var key in currentTask) {
        if (currentTask.hasOwnProperty(key)) {
            var element = currentTask[key];
            if (element.length > 0) {
                for (var i = 0, l = element.length; i < l; i += 1) {
                    if (state === "all" || element[i].state === state) {
                        result[key] = result[key] || [];
                        result[key].push(element[i]);
                    }
                }
            }
        }
    }
    return result;
}

function filterTask(key) {
    var arr = [],
        result = {};
    for (var item in taskType) {
        if (item === key) {
            var ele = taskType[item];
            if (ele) {
                for (var o in ele) {
                    objExtend(result, tasks[o]);
                }
                result = objSort(result);
                return result;
            } else {
                return null;
            }
        }
    }
    result = tasks[key];
    result = objSort(result);
    return result;
}

function showTask(obj) {
    var taskDom = document.getElementsByClassName("task")[0],
        dlDom = taskDom.getElementsByTagName("dl")[0],
        str = "";
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var element = obj[key];
            if (element.length > 0) {
                str += '<dt>' + key + '</dt>';
                for (var i = 0, l = element.length; i < l; i += 1) {
                    if (element[i].state === 1) {
                        str += '<dd class="done" data-date="' + element[i].date + '">' + element[i].title + '</dd>';
                    } else {
                        str += '<dd class="undone" data-date="' + element[i].date + '">' + element[i].title + '</dd>';
                    }
                }
            }
        }
    }
    dlDom.innerHTML = str;
}

function objSort(obj) {
    var result = {},
        keys = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    keys.sort();
    for (var i = 0, l = keys.length; i < l; i += 1) {
        var temp = keys[i];
        result[temp] = obj[temp];
    }
    return result;
}

function objExtend(obj1, obj2) {
    for (var key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            if (obj1[key]) {
                obj1[key] = obj1[key].concat(obj2[key]);
            } else {
                obj1[key] = obj2[key];
            }
        }
    }
}