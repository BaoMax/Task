/**
 * Created by Administrator on 2016/10/21.
 */
import Task from 'class/task';
import TaskType from 'class/taskType';
class TaskList{
    constructor(data){
        this.taskList = [];
        this.taskType = [];
        this.subType = [];
        this.tasks = [];
        this._init(data);
    }
    _init(data){
        this._taskTypeChange(data, null, this.taskList);
        for (var i = 0, l = this.taskList.length; i < l; i += 1) {
            var title = this.taskList[i].title,
                childData = data[i][title];
            this.taskType.push(this.taskList[i]);
            if (childData && childData.length > 0) {
                this._taskTypeChange(childData, this.taskList[i], this.taskList[i].children);
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
                        this._taskChange(taskData, temp[j], temp[j].children);
                        for (var k = 0; k < temp[j].children.length; k++) {
                            this.tasks.push(temp[j].children[k]);
                        }
                    }
                }
            }
        }
    }
    _taskTypeChange(data, parent, result) {
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
    _taskChange(data, parent, result) {
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
    _isHasSubType(title,parent){
        for (var i = 0, l = this.taskType.length; i < l; i += 1) {
            var temp = this.taskType[i];
            if (temp.title === parent) {
                //var type = new TaskType(title, temp);
                //this.taskType[i].children.push(type);
                //this.subType.push(type);
                for(var j = 0,l = temp.children.length;j < l;j+=1){
                    if(temp.children[j].title === title){
                        return true;
                    }
                }
                return false;
            }
        }
    }
    _isHasType(title){
        for (var i = 0, l = this.taskType.length; i < l; i += 1) {
            var temp = this.taskType[i];
            if (temp.title === title) {
                return true;
            }
        }
        return false;
    }
    _isHasTask(parent,title){
        for(var i = 0,l = parent.children.length;i < l;i += 1){
            if(parent.children[i].title === title){
                return true;
            }
        }
        return false;
    }
    //通过title和parent的title获取tasks数组
    getTasks(title, parent) {
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
    dateTask(data) {
    var result = {};
    var array = [];
    for (let i = 0, l = data.length; i < l; i += 1) {
        var date = data[i].fromDate();
        if (!result[date]) {
            array.push(date);
            result[date] = [];
        }
        result[date].push(data[i]);
    }
    array.sort(function(prev,next){
       return new Date(prev) - new Date(next);
    });
    var temp = {};
    for(let i = 0;i < array.length;i += 1){
        temp[array[i]] = result[array[i]];
    }
    return temp;
};

    getTaskType(title,parent){
        if(!parent){
            for(var i = 0,l = this.taskType.length;i < l;i += 1){
                if(this.taskType[i].title === title){
                    var temp = this.taskType[i];
                    if(temp.children.length === 0){
                        title = '默认子分类';
                        parent = '默认分类';
                    }else{
                        return temp.children[0];
                    }
                }
            }
        }
        for (var i = 0, l = this.subType.length; i < l; i += 1) {
            var temp = this.subType[i];
            if (temp.title === title && temp.parent.title === parent) {
                return temp;
            }
        }
    };
    getTypeName() {
    var result = [];
    for (var i = 0, l = this.taskType.length; i < l; i += 1) {
        result.push(this.taskType[i].title);
    }
    return result;
};

    addType(title, parent) {
        var flag = true;
    if (parent) {
        if(!this._isHasSubType(title,parent)){
            for (var i = 0, l = this.taskType.length; i < l; i += 1) {
                var temp = this.taskType[i];
                if (temp.title === parent) {
                    var type = new TaskType(title, temp);
                    this.taskType[i].children.push(type);
                    this.subType.push(type);
                }
            }
        }else{
            alert('此分类已存在');
            return false;
        }
    } else {
        if(!this._isHasType(title)){
            var type = new TaskType(title, null);
            this.taskList.push(type);
            this.taskType.push(type);
        }else{
            alert('此分类已存在');
            return false;
        }
    }
        return flag;
};

    deleteType(title, parent) {
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

    deleteTask(task,date, title) {
    //var task = this.currentDategroupTask[date];
    for (var i = 0, l = task.length; i < l; i += 1) {
        if (task[i].title === title) {
            var temp = task[i];
            this.tasks.splice(this.tasks.indexOf(temp), 1);
            var subType = temp.parent;
            subType.children.splice(subType.children.indexOf(temp), 1);
        }
    }
};

    addTask(parent, title,date,content) {
        if(!this._isHasTask(parent,title)){
            date = new Date(date);
            var task = new Task(title, date, content, 0, parent);
            parent.children.push(task);
            this.tasks.push(task);
            return task;
        }else{
            alert('此任务已存在');
            return false;
        }
    };

    toJson() {
    var arr = [];
    for (var i = 0; i < this.taskList.length; i += 1) {
        arr.push(this.taskList[i].toJson());
    }
    window.localStorage.taskList = JSON.stringify(arr);
    return JSON.stringify(arr);
};

    getSum(data){
        data = data || this.tasks;
        var sum = 0;
        for(var i = 0;i < data.length;i++){
            if(data[i].state === 0){
                sum++;
            }
        }
        return sum;
    }
    getName(data){
        for(let k in data){
            if(data.hasOwnProperty(k)){
                return data[k][0].title;
            }
        }
        return '';
    }

    obj2arr(data){
        var result = [];
        for(let k in data){
            result = result.concat(data[k]);
        }
        return result;
    }
}
export default TaskList;