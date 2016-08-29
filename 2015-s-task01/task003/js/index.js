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
            }
        },
        "planB": {
            "plan-B-01": {
                "title": "plan-B-01",
                "date": "2016-10-16",
                "content": "plan-B-01plan-B-01",
                "state": 0
            }
        }
    };

function render(node, data) {
    var str = "";
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
                s += '<ul>';
                str += '<li data-title="' + key + '"><i class="icon icon-floder"></i>' + key + '（' + sum + '）<i class="icon icon-delete"></i>' + s + '</li>';
            } else {
                str += '<li><i class="icon icon-floder"></i>' + key + '（' + sum + '）<i class="icon icon-delete"></i></li>';
            }
        }
    }
    node.innerHTML = str;
}
render(document.getElementsByClassName("floder-list")[0], taskType);

function bindEvent() {
    var node = document.getElementsByClassName("floder-list")[0];
    bindEvent(node, "click", function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        if (target.nodeName.toUpperCase() === "LI") {
            var str = target.getAttribute("data-title"),
                obj = filterTask(str);
            showTask(obj);
        }
    });
}

function filterTask(key) {
    var arr = [],
        result = {};
    for (var item in taskType) {
        if (item === key) {
            var ele = taskType[item];
            for (var o in ele) {

            }
        }
    }
}