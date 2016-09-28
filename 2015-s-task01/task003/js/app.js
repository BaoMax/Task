var localStorage = window.localStorage,
    taskList = window.localStorage.taskList || {
        title: "",
        children: [{
            title: "默认分类",
            type: "TaskType",
            children: []
        }, {
            title: "宝贝计划",
            type: "TaskType",
            children: [{
                title: "planA",
                type: "TaskType",
                children: [{
                    "type": "Task",
                    "title": "plan-A-01",
                    "date": new Date("2016-07-07"),
                    "content": "plan-A-01plan-A-01",
                    "state": 1
                }, {
                    "type": "Task",
                    "title": "plan-A-02",
                    "date": new Date("2016-08-08"),
                    "content": "plan-A-02plan-A-02",
                    "state": 0
                }, {
                    "type": "Task",
                    "title": "plan-A-03",
                    "date": new Dare("2016-09-09"),
                    "content": "plan-A-03plan-A-03",
                    "state": 0
                }]
            }, {
                title: "planB",
                type: "TaskType",
                children: [{
                    "type": "Task",
                    "title": "plan-B-01",
                    "date": new Date("2016-10-16"),
                    "content": "plan-B-01plan-B-01",
                    "state": 0
                }]
            }],
        }]
    };

function jsonToObj(data) {
    var top = new TaskType("", null);
    if (data.children.length) {
        for (var i = 0, l = data.children.length; i < l; i += 1) {
            var temp = data.children[i];
            top.children.push(new TaskType(temp.title, top));
        }
    }
}

function