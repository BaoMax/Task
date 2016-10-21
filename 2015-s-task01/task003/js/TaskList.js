var TaskList = function(data) {
    this.taskList = [];
    this.taskType = [];
    this.subType = [];
    this.tasks = [];
    this.currentTask = [];
    this.currentDategroupTask = [];
    this.currentTaskDetail = {};
    this.currentTaskType = {};
    this.currentState = 'all';

    this.init = function(data) {
        taskTypeChange(data, null, this.taskList);
        for (var i = 0, l = this.taskList.length; i < l; i += 1) {
            var title = this.taskList[i].title,
                childData = data[i][title];
            this.taskType.push(this.taskList[i]);
            if (childData && childData.length > 0) {
                taskTypeChange(childData, this.taskList[i], this.taskList[i].children);
            }
        }
        for (var i = 0, l = this.taskList.length; i < l; i += 1) {
            var temp = this.taskList[i].children;
            var title = this.taskList[i].title,
                childData = data[i][title];
            if (temp && temp.length > 0) {
                for (var j = 0, ll = temp.length; j < ll; j += 1) {
                    var taskTitle = temp[j].title,
                        taskData = childData[j][taskTitle];
                    this.subType.push(temp[j]);
                    if (taskData && taskData.length > 0) {
                        taskChange(taskData, temp[j], temp[j].children);
                        for (var k = 0; k < temp[j].children.length; k++) {
                            this.tasks.push(temp[j].children[k]);
                        }
                    }
                }
            }
        }
    };
    this.init(data);

    //通过title和parent的title获取tasks数组
    this.getTasks = function(title, parent) {
        if (parent) {
            for (var i = 0, l = this.subType.length; i < l; i += 1) {
                var temp = this.subType[i];
                if (temp.title === title && temp.parent.title === parent) {
                    return temp.children;
                }
            }
        } else {
            for (var i = 0, l = this.taskType.length; i < l; i += 1) {
                var temp = this.taskType[i];
                var result = [];
                if (temp.title === title) {
                    for (var j = 0, ll = temp.children.length; j < ll; j += 1) {
                        result = result.concat(temp.children[j].children);
                    }
                    return result;
                }
            }
        }
    };
    //把参数data按照task的date分组
    this.dateTask = function(data) {
        var result = {};
        for (var i = 0, l = data.length; i < l; i += 1) {
            var date = data[i].fromDate();
            if (!result[date]) {
                result[date] = [];
            }
            result[date].push(data[i]);
        }
        return result;
    };

    //通过状态获取data中符合要求的数据
    this.getTasksByState = function(data, state) {
        var result = {};
        for (var k in data) {
            var temp = data[k];
            for (var i = 0, l = temp.length; i < l; i += 1) {
                if (temp[i].state === state) {
                    if (!result[k]) {
                        result[k] = [];
                    }
                    result[k].push(temp[i]);
                }
            }
        }
        return result;
    };

    this.getTaskDetail = function(date, title) {
        var task = this.currentDategroupTask[date];
        for (var i = 0, l = task.length; i < l; i += 1) {
            if (task[i].title === title) {
                return task[i];
            }
        }
    };

    this.getTypeName = function() {
        var result = [];
        for (var i = 0, l = this.taskType.length; i < l; i += 1) {
            result.push(this.taskType[i].title);
        }
        return result;
    };

    this.addType = function(title, parent) {
        if (parent) {
            for (var i = 0, l = this.taskType.length; i < l; i += 1) {
                var temp = this.taskType[i];
                if (temp.title === parent) {
                    var type = new TaskType(title, temp);
                    this.taskType[i].children.push(type);
                    this.subType.push(type);
                }
            }
        } else {
            var type = new TaskType(title, null);
            this.taskList.push(type);
            this.taskType.push(type);
        }
    };

    this.deleteType = function(title, parent) {
        if (parent) {
            for (var i = 0, l = this.taskType.length; i < l; i += 1) {
                var temp = this.taskType[i];
                if (temp.title === parent) {
                    var childData = temp.children;
                    for (var j = 0, ll = childData.length; j < ll; j += 1) {
                        if (childData[j].title === title) {
                            var task = childData.splice(j, 1);
                            this.subType.splice(this.subType.indexOf(task), 1);
                            return;
                        }
                    }
                }
            }
        } else {
            for (var i = 0, l = this.taskType.length; i < l; i += 1) {
                var temp = this.taskType[i];
                if (temp.title === title) {
                    this.taskType.splice(i, 1);
                    this.taskList.splice(i, 1);
                    break;
                }
            }
            for (var i = 0; i < this.subType.length; i += 1) {
                var temp = this.subType[i];
                if (temp.parent.title === title) {
                    this.subType.splice(i, 1);
                    i--;
                }
            }
        }
    };

    this.deleteTask = function(date, title) {
        var task = this.currentDategroupTask[date];
        for (var i = 0, l = task.length; i < l; i += 1) {
            if (task[i].title === title) {
                var temp = task[i];
                this.tasks.splice(this.tasks.indexOf(temp), 1);
                var subType = temp.parent;
                subType.children.splice(subType.children.indexOf(temp), 1);
            }
        }
    };

    this.getTask = function(title, parent) {
        var temp = this.subType;
        for (var i = 0, l = temp.length; i < l; i += 1) {
            if (temp[i].title === title && temp[i].parent.title === parent) {
                return temp[i];
            }
        }
    };

    this.getDefaultTitle = function(title) {
        for (var i = 0, l = this.taskType.length; i < l; i += 1) {
            if (this.taskType[i].title === title) {
                return this.taskType[i].children[0] ? { parent: title, title: this.taskType[i].children[0].title } : { parent: '默认分类', title: '默认子分类' };
            }
        }
    };

    this.addTask = function(parent, task) {
        parent.children.push(task);
        this.tasks.push(task);
    };

    this.toJson = function() {
        var arr = [];
        for (var i = 0; i < this.taskList.length; i += 1) {
            arr.push(this.taskList[i].toJson());
        }
        return JSON.stringify(arr);
    };
}


function taskTypeChange(data, parent, result) {
    for (var i = 0, l = data.length; i < l; i += 1) {
        var temp = data[i];
        for (var k in temp) {
            if (temp.hasOwnProperty(k)) {
                var taskType = new TaskType(k, parent);
                result.push(taskType);
            }
        }
    }
}

function taskChange(data, parent, result) {
    for (var i = 0, l = data.length; i < l; i += 1) {
        var temp = data[i],
            title = temp.title,
            date = new Date(temp.date),
            content = temp.content,
            state = temp.state,
            task = new Task(title, date, content, state, parent);
        result.push(task);
    }
}