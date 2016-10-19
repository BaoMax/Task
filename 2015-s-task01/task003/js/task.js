var Task = function(title, date, content, state, parent) {
    this.title = title;
    this.date = date || new Date();
    this.content = content;
    this.state = state;
    this.parent = parent;
}
Task.prototype.fromDate = function() {
    var yaer = this.date.getFullYear(),
        month = this.date.getMonth() + 1,
        day = this.date.getDate();
    return [yaer, month, day].join("-");
}
Task.prototype.change = function(task) {
    this.title = task.title;
    this.date = task.date;
    this.content = task.content;
    this.state = task.state;
}
Task.prototype.toJson = function() {
    var obj = {};
    obj.title = this.title;
    obj.date = this.fromDate();
    obj.content = this.content;
    obj.state = this.state;
    return obj;
}