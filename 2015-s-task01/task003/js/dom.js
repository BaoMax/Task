var selectedTaskTypeDom = '',
    selectedSubTypeDom = '',
    selectedTaskDom = '';

function renderFloder(data) {
    var str = '',
        node = document.querySelector('.floder-list'),
        allNode = document.querySelector('.task-num'),
        taskCount = 0;
    for (var i = 0, l = data.length; i < l; i += 1) {
        var temp = data[i],
            sum = 0;
        if (temp.children && temp.children.length > 0) {
            var list = '<ul class="file-list">';
            for (var j = 0, ll = temp.children.length; j < ll; j += 1) {
                var child = temp.children[j];
                sum += child.children.length;
                list += '<li><div data-title="' + child.title + '" data-parent="' + child.parent.title + '"><i class="icon icon-file"></i>' + child.title + '（' + child.children.length + '）<i class="icon icon-delete"></i></div></li>';
            }
            list += '</ul>';
            str += '<li><div data-title="' + temp.title + '"><i class="icon icon-floder"></i>' + temp.title + '（' + sum + '）<i class="icon icon-delete"></i></div>' + list + '</li>'
        } else {
            str += '<li><div data-title="' + temp.title + '"><i class="icon icon-floder"></i>' + temp.title + '（0）<i class="icon icon-delete"></i></div></li>';
        }
        taskCount += sum;
    }
    node.innerHTML = str;
    allNode.innerText = taskCount;
}

function renderTask(data) {
    var str = '',
        node = document.querySelector('.task dl');
    for (var k in data) {
        var temp = data[k];
        str += '<dt>' + k + '</dt>';
        for (var i = 0, l = temp.length; i < l; i += 1) {
            if (temp[i].state === 1) {
                str += '<dd class="done" data-date="' + k + '" data-title="' + temp[i].title + '">' + temp[i].title + '<i class="icon icon-delete"></i></dd>';
            } else {
                str += '<dd data-date="' + k + '" data-title="' + temp[i].title + '">' + temp[i].title + '<i class="icon icon-delete"></i></dd>';
            }
        }
    }
    node.innerHTML = str;
}

function renderTaskDetail(type, task) {
    var detail = document.querySelector('.task-detail'),
        str = '';
    if (type === 'task') {
        str += '<div class="edit-done"><i class="icon icon-done"></i><i class="icon icon-edit"></i></div><input type="text" name="title" value="' + task.title + '" class="title" disabled><label class="date">任务日期：<input type="text" name="date" value="' + task.fromDate() + '" class="disableEdit" disabled></label><textarea class="content disableEdit" name="content" disabled>' + task.content + '</textarea><div class="save-cancel hide"><button class="cancel">取消</button><button class="save">保存</button></div>'
    } else if (type === 'new') {
        str += '<div class="edit-done hide"><i class="icon icon-done"></i><i class="icon icon-edit"></i></div><input type="text" name="title" value="" class="title" ><label class="date">任务日期：<input type="text" name="date" value="" ></label><textarea class="content" name="content" ></textarea><div class="save-cancel"><button class="cancel">取消</button><button class="save">保存</button></div>'
    } else if (type === 'null') {
        str = '';
    }
    detail.innerHTML = str;
    if (type === 'task') {
        editEvent();
    }
}

function editEvent() {
    var edit = document.querySelector('.icon-edit');
    addEvent(edit, 'click', function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        var box = document.querySelector('.task-detail'),
            date = box.querySelector('input[name="date"]'),
            content = box.querySelector('textarea[name="content"]');
        date.removeAttribute('disabled');
        content.removeAttribute('disabled');
        removeClass(date, 'disableEdit');
        removeClass(content, 'disableEdit');
        addClass(document.querySelector('.edit-done'), 'hide');
        removeClass(document.querySelector('.save-cancel'), 'hide');
        date.focus();
    });

    var done = document.querySelector('.icon-done');
    addEvent(done, 'click', function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        list.currentTaskDetail.state = 1;

        if (list.currentState === "all") {
            renderTask(list.currentDategroupTask);
        } else {
            renderTask(list.getTasksByState(list.currentDategroupTask, Number(list.currentState)));
        }

        document.querySelector('dd[data-title="' + selectedTaskDom + '"]').click();

        localStorage.setItem('taskList', list.toJson());

    });

    var cancel = document.querySelector('.save-cancel .cancel');
    addEvent(cancel, 'click', function(e) {
        renderTaskDetail('task', list.currentTaskDetail);
    });

    var save = document.querySelector('.save-cancel .save');
    addEvent(save, 'click', function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        var box = document.querySelector('.task-detail'),
            title = document.querySelector('input[name="title"]').value,
            date = box.querySelector('input[name="date"]'),
            content = box.querySelector('textarea[name="content"]');
        list.currentTaskDetail.date = new Date(date.value);
        list.currentTaskDetail.content = content.value;

        list.currentDategroupTask = list.dateTask(list.currentTask);
        if (list.currentState === "all") {
            renderTask(list.currentDategroupTask);
        } else {
            renderTask(list.getTasksByState(list.currentDategroupTask, Number(list.currentState)));
        }

        document.querySelector('dd[data-title="' + selectedTaskDom + '"]').click();

        localStorage.setItem('taskList', list.toJson());
    });
}

function bindEvent() {
    var floder = document.querySelector('.floder-list');
    addEvent(floder, 'click', function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        if (target.nodeName.toUpperCase() === 'DIV') {
            var title = target.getAttribute('data-title'),
                parent = target.getAttribute('data-parent');

            selectedTaskTypeDom = parent || title;
            selectedSubTypeDom = parent ? title : '';

            list.currentTask = list.getTasks(title, parent);
            list.currentTaskType.title = title;
            list.currentTaskType.parent = parent;
            list.currentDategroupTask = list.dateTask(list.currentTask);
            renderTask(list.currentDategroupTask);
            removeClassBat(floder, 'li', 'selected');
            addClass(target.parentElement, 'selected');

            var state = document.querySelector('.task-state');
            removeClassBat(state, 'span', 'selected');
            addClass(state.querySelector('span[data-state="all"]'), 'selected');

            var node = document.querySelector('dl dd');
            if (node) {
                node.click();
            } else {
                renderTaskDetail('null');
            }
        }
    });
    addEvent(floder, 'click', function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        if (hasClass(target, 'icon-delete')) {
            var node = target.parentElement,
                parent = node.getAttribute('data-parent'),
                title = node.getAttribute('data-title');
            list.deleteType(title, parent);

            if (parent && parent === selectedTaskTypeDom && title === selectedSubTypeDom) {
                var o = list.getDefaultTitle(parent);
            } else if (!parent && title === selectedTaskTypeDom) {
                var o = {
                    parent: '默认分类',
                    title: '默认子分类'
                }
            } else {
                var o = {
                    parent: selectedTaskTypeDom,
                    title: selectedSubTypeDom
                }
            }
            renderFloder(list.taskList);
            var selectedNode = document.querySelector('.floder-list div[data-title="' + o.parent + '"]').parentElement;
            var node = selectedNode.querySelector('.file-list div[data-title="' + o.title + '"]');
            node.click();

            localStorage.setItem('taskList', list.toJson());
        }
    });

    var state = document.querySelector('.task-state');
    addEvent(state, 'click', function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        if (target.nodeName.toUpperCase() === 'SPAN') {
            var stateNum = target.getAttribute('data-state'),
                task = stateNum === 'all' ? list.currentDategroupTask : list.getTasksByState(list.currentDategroupTask, Number(stateNum));
            list.currentState = stateNum;
            renderTask(task);
            removeClassBat(state, 'span', 'selected');
            addClass(target, 'selected');
            var node = document.querySelector('dl dd');
            if (node) {
                node.click();
            } else {
                renderTaskDetail('null');
            }
        }
    });

    var dl = document.querySelector('dl');
    addEvent(dl, 'click', function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        if (hasClass(target, 'icon-delete')) {
            var node = target.parentElement,
                date = node.getAttribute('data-date'),
                title = node.innerText;
            list.deleteTask(date, title);

            var selectedTask = selectedTaskDom;

            renderFloder(list.taskList);

            if (selectedSubTypeDom) {
                var selectedNode = document.querySelector('.floder-list div[data-title="' + selectedTaskTypeDom + '"]').parentElement;
                var node = selectedNode.querySelector('.file-list div[data-title="' + selectedSubTypeDom + '"]');
                node.click();
            } else if (selectedTaskTypeDom) {
                var selectedNode = document.querySelector('.floder-list div[data-title="' + selectedTaskTypeDom + '"]');
                selectedNode.click();
            }
            if (selectedTask !== title) {
                document.querySelector('dd[data-title="' + selectedTask + '"]').click();
            }

            localStorage.setItem('taskList', list.toJson());
        }
    });
    addEvent(dl, 'click', function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        if (target.nodeName.toUpperCase() === 'DD') {
            var date = target.getAttribute('data-date'),
                title = target.innerText;
            list.currentTaskDetail = list.getTaskDetail(date, title);
            renderTaskDetail('task', list.currentTaskDetail);
            removeClassBat(dl, 'dd', 'selected');
            addClass(target, 'selected');

            selectedTaskDom = title;
        }
    });

    var addType = document.querySelector('.footer-taskType');
    addEvent(addType, 'click', function(e) {
        var dialog = new Dialog(),
            select = '<select name="parent"><option value="none">无</option>',
            str = '',
            result = list.getTypeName();
        for (var i = 0, l = result.length; i < l; i += 1) {
            select += '<option value="' + result[i] + '">' + result[i] + '</option>';
        }
        select += '</select>';
        str = '<p class="title">新建分类<i class="icon close"></i></p><label for="">分类：<input type="text" name="typeName" value=""></label><label for="">粑粑:' + select + '</label><button type="button" class="sure">确定</button>';

        dialog.create(str);
        dialog.show();


        var cancel = document.querySelector('.close');
        addEvent(cancel, 'click', function(e) {
            dialog.hide();
        });

        var sure = document.querySelector('.sure');
        addEvent(sure, 'click', function(e) {
            var name = document.querySelector('input[name="typeName"]').value,
                parent = document.querySelector('select').value;
            if (name === "") {
                alert("请输入名称");
                return;
            }
            if (parent === 'none') {
                list.addType(name, null);
            } else {
                list.addType(name, parent);
            }


            renderFloder(list.taskList);
            if (selectedSubTypeDom) {
                var selectedNode = document.querySelector('.floder-list  div[data-title="' + selectedTaskTypeDom + '"]').parentElement;
                var node = selectedNode.querySelector('.file-list  div[data-title="' + selectedSubTypeDom + '"]');

                addClass(node.parentElement, 'selected');

            } else if (selectedTaskTypeDom) {
                var selectedNode = document.querySelector('.floder-list  div[data-title="' + selectedTaskTypeDom + '"]');
                addClass(selectedNode.parentElement, 'selected');
            }

            dialog.hide();
            localStorage.setItem('taskList', list.toJson());
        });
    });


    var addTask = document.querySelector('.footer-task');
    addEvent(addTask, 'click', function(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        renderTaskDetail('new');
        var box = document.querySelector('.task-detail'),
            title = document.querySelector('input[name="title"]'),
            date = box.querySelector('input[name="date"]'),
            content = box.querySelector('textarea[name="content"]');
        title.focus();

        var cancel = document.querySelector('.save-cancel .cancel');
        addEvent(cancel, 'click', function(e) {
            renderTaskDetail(list.currentTaskDetail);
        });

        var save = document.querySelector('.save-cancel .save');
        addEvent(save, 'click', function(e) {
            var event = e || window.event,
                target = event.target || event.srcElement;
            var box = document.querySelector('.task-detail'),
                title = document.querySelector('input[name="title"]').value,
                date = box.querySelector('input[name="date"]'),
                content = box.querySelector('textarea[name="content"]');
            if (!list.currentTaskType.parent) {
                list.currentTaskType = list.getDefaultTitle(list.currentTaskType.title);
            }
            var parent = list.getTask(list.currentTaskType.title, list.currentTaskType.parent);
            task = new Task(title, new Date(date.value), content.value, 0, parent);
            list.addTask(parent, task);

            list.currentTaskDetail = task;

            renderFloder(list.taskList);

            if (selectedSubTypeDom) {
                var selectedNode = document.querySelector('.floder-list div[data-title="' + selectedTaskTypeDom + '"]').parentElement;
                var node = selectedNode.querySelector('.file-list div[data-title="' + selectedSubTypeDom + '"]');
                node.click();
            } else if (selectedTaskTypeDom) {
                var selectedNode = document.querySelector('.floder-list div[data-title="' + selectedTaskTypeDom + '"]');
                selectedNode.click();
            }
            selectedTaskDom = title;
            document.querySelector('dd[data-title="' + selectedTaskDom + '"]').click();

            localStorage.setItem('taskList', list.toJson());
        });
    });
}