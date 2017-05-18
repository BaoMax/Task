/**
 * Created by Administrator on 2016/10/21.
 */
class Task{
    constructor(title, date, content, state, parent){
        this.title = title;
        this.date = date || new Date();
        this.content = content;
        this.state = state;
        this.parent = parent;
    }
    fromDate() {
        var yaer = this.date.getFullYear(),
            month = this.date.getMonth() + 1,
            day = this.date.getDate();
        return [yaer, month, day].join("-");
    }
    change(task) {
        this.title = task.title;
        this.date = task.date;
        this.content = task.content;
        this.state = task.state;
    }
    toJson() {
        var obj = {};
        obj.title = this.title;
        obj.date = this.fromDate();
        obj.content = this.content;
        obj.state = this.state;
        return obj;
    }
}
export default Task;