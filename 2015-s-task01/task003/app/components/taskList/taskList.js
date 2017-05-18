/**
 * Created by Administrator on 2016/10/24.
 */
import React from 'react';
import {render} from 'react-dom';
import Tasks from 'components/taskList/tasks';
import mySignal from 'boradCast';
import List from 'data';
class TaskList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currenttasks:null,
            state:'all',
            task:null
        };
        var that = this;
        this.select = null;
        mySignal.listSignal.add(function(data,select){
            that.setState({
                currenttasks:data,
                tasks:data,
                state:'all'
            });
            that.select = select || null;
        });
        mySignal.changeSignal.add(function(){
            that.setState({
                currenttasks:List.dateTask(List.obj2arr(that.state.tasks)),
                tasks:List.dateTask(List.obj2arr(that.state.tasks)),
                state:'all'
            });
        });
    }
    componentDidMount(){
        this.select = null;
    }
    getState(e){
        var target = e.target;
        var state = target.getAttribute('data-state');
        if(state === 'all'){
            this.setState({
                currenttasks:this.state.tasks,
                tasks:this.state.tasks,
                state:'all'
            });
        }else{
            state = parseInt(state);
            var result = {};
            var data = this.state.tasks;
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
            this.setState({
                currenttasks:result,
                tasks:this.state.tasks,
                state:state
            })
        }
    }
    addTask(){
        mySignal.newTaskSignal.dispatch();
    }
    render(){
        return <div className="aside task">
            <div className="task-state">
                <span className = {this.state.state === 'all'?"selected":''} data-state="all" onClick={this.getState.bind(this)}>所有</span>
                <span className = {this.state.state === 0 ?"selected":''} data-state="0" onClick={this.getState.bind(this)}>未完成</span>
                <span className = {this.state.state === 1 ?"selected":''} data-state="1" onClick={this.getState.bind(this)}>已完成</span>
            </div>
            <Tasks data={this.state.currenttasks} select={this.select}/>
            <footer className="footer-task" onClick={this.addTask.bind(this)}><i className="icon icon-add"></i>新建任务</footer>
        </div>;
    }
}
export default TaskList;