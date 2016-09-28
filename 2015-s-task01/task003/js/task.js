var Task = function(titel, date, content, state, parent) {
    this.title = titel;
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
    this.title = task.titel;
    this.date = task.date;
    this.content = task.content;
    this.state = task.state;
}