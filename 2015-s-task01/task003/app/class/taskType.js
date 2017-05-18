/**
 * Created by Administrator on 2016/10/21.
 */
class TaskType{
    constructor(title, parent){
        this.title = title;
        this.children = [];
        this.parent = parent;
    }
    toJson() {
        var obj = {};
        var temp = this.children;
        obj[this.title] = null;
        if (this.children.length) {
            obj[this.title] = [];
        }
        for (var i = 0; i < temp.length; i += 1) {
            obj[this.title].push(temp[i].toJson());
        }
        return obj;
    }
}
export default TaskType;