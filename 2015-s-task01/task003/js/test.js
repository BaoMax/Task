var localStorage = window.localStorage,
    taskList = window.localStorage.taskList || [{
        '默认分类': [{
            '默认子分类': []
        }]
    }, {
        '宝贝计划': [{
            'planA': [{
                "title": "plan-A-01",
                "date": "2016-07-07",
                "content": "plan-A-01plan-A-01",
                "state": 1
            }, {
                "title": "plan-A-02",
                "date": "2016-08-08",
                "content": "plan-A-02plan-A-02",
                "state": 0
            }, {
                "title": "plan-A-03",
                "date": "2016-09-09",
                "content": "plan-A-03plan-A-03",
                "state": 0
            }]
        }, {
            'planB': [{
                "title": "plan-B-01",
                "date": "2016-10-16",
                "content": "plan-B-01plan-B-01",
                "state": 0
            }]
        }]
    }];
if (typeof taskList === "string") {
    taskList = JSON.parse(taskList);
}

var list = new TaskList(taskList);

renderFloder(list.taskList);
bindEvent();