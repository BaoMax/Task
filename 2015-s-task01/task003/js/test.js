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
    }, {
        'BaoMax': [{
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
        }]
    }];
if (typeof taskList === "string") {
    taskList = JSON.parse(taskList);
}

var list = new TaskList(taskList);

var platfrom = navigator.userAgent;
if (platfrom.match(/(iPad|iPhone|Android|ios|iPod)/i)) {
    var typeDom = document.querySelector('.task-list');
    var listDom = document.querySelector('.task');
    var taskDom = document.querySelector('.detail');
    addClass(typeDom, 'app-adapt');
    addClass(listDom, 'app-adapt');
    addClass(taskDom, 'app-adapt');

    removeClass(document.querySelector('.task').querySelector('.icon-back'), 'hide');
    removeClass(document.querySelector('.detail').querySelector('.icon-back'), 'hide');
    window.location.href = window.location.href.split('#')[0] + '#task-list';


    addEvent(document.querySelector('.task-list'), 'click', function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        if (target.nodeName.toUpperCase() === 'DIV') {
            window.location.href = window.location.href.split('#')[0] + '#task';
        }
    });

    addEvent(document.querySelector('dl'), 'click', function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        if (target.nodeName.toUpperCase() === 'DD') {
            window.location.href = window.location.href.split('#')[0] + '#task-detail';
        }
    });
    addEvent(document.querySelector('.detail').querySelector('.icon-back'), 'click', function(e) {
        window.location.href = window.location.href.split('#')[0] + '#task';
    });
    addEvent(document.querySelector('.task').querySelector('.icon-back'), 'click', function(e) {
        window.location.href = window.location.href.split('#')[0] + '#task-list';
    });
    window.addEventListener('hashchange', function(e) {
        var event = e || window.event;
        var hash = location.hash;
        var oldUrl = e.oldURL.split('#')[1];
        switch (hash) {
            case '#task-list':
                if (oldUrl === 'task') {
                    addClass(listDom, 'slideRight');

                    // addClass(listDom, 'slideRightOut');
                    addClass(typeDom, 'slideLeftIn');
                    addClass(listDom, 'hide');
                    removeClass(typeDom, 'hide');
                    setTimeout(function() {
                        removeClass(listDom, 'slideRight');
                        removeClass(typeDom, 'slideLeftIn');
                    }, 200);
                }
                break;
            case '#task':
                if (oldUrl === 'task-list') {
                    addClass(typeDom, 'slideLeft');

                    // addClass(typeDom, 'slideLeftOut');
                    addClass(listDom, 'slideRightIn');
                    addClass(typeDom, 'hide');
                    removeClass(listDom, 'hide');
                    setTimeout(function() {
                        removeClass(typeDom, 'slideLeft');
                        removeClass(listDom, 'slideRightIn');
                    }, 200);
                } else if (oldUrl === 'task-detail') {
                    addClass(taskDom, 'slideRight');

                    // addClass(taskDom, 'slideRightOut');
                    addClass(listDom, 'slideLeftIn');
                    addClass(taskDom, 'hide');
                    removeClass(listDom, 'hide');
                    setTimeout(function() {
                        removeClass(taskDom, 'slideRight');
                        removeClass(listDom, 'slideLeftIn');
                    }, 200);
                }

                // addClass(typeDom, 'slideLeft');
                // addClass(listDom, 'slideUp');
                // removeClass(document.querySelector('.task'), 'hide');
                // removeClass(document.querySelector('.task').querySelector('.icon-back'), 'hide');
                // addClass(document.querySelector('.task-list'), 'hide');
                // addClass(document.querySelector('.detail'), 'hide');
                // addClass(document.querySelector('.task'), 'app-adapt');
                break;
            case '#task-detail':
                if (oldUrl === 'task') {
                    addClass(listDom, 'slideLeft');

                    // addClass(listDom, 'slideLeftOut');
                    addClass(taskDom, 'slideRightIn');
                    addClass(listDom, 'hide');
                    removeClass(taskDom, 'hide');
                    setTimeout(function() {
                        removeClass(listDom, 'slideLeft');
                        removeClass(taskDom, 'slideRightIn');
                    }, 200);
                }
                // removeClass(document.querySelector('.detail'), 'hide');
                // removeClass(document.querySelector('.detail').querySelector('.icon-back'), 'hide');
                // addClass(document.querySelector('.task-list'), 'hide');
                // addClass(document.querySelector('.task'), 'hide');
                // addClass(document.querySelector('.detail'), 'app-adapt');
                break;
        }
    });
    renderFloder(list.taskList);
    bindEvent();
} else {
    renderFloder(list.taskList);
    bindEvent();
    var o = {
        parent: '默认分类',
        title: '默认子分类'
    }
    var selectedNode = document.querySelector('.floder-list div[data-title="' + o.parent + '"]').parentElement;
    var node = selectedNode.querySelector('.file-list div[data-title="' + o.title + '"]');
    node.click();
}