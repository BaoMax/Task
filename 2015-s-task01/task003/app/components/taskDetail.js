/**
 * Created by Administrator on 2016/10/24.
 */
import React from 'react';
import {render} from 'react-dom';
import mySignal from 'boradCast';
import List from 'data';

class TaskDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type:'task',
            task:null,
            edit:false
        };
        var that = this;
        mySignal.detailSignal.add(function(data){
            that.setState({
                type:'task',
                task:data,
                edit:false
            });
        });
        mySignal.newTaskSignal.add(function(){
            that.setState({
                type:'new',
                task:that.state.task,
                edit:true
            });
        });
    }
    editAble(){
        this.setState({
            type:'task',
            task:this.state.task,
            edit:true
        },function(){
            this.refs.date.focus();
        });
    }
    doneHandle(){
        if(confirm('确认将该任务设置完成？')){
            this.state.task.state = 1;
            this.setState({
                type:'task',
                task:this.state.task,
                edit:false
            });
            List.toJson();
            mySignal.changeSignal.dispatch();
        }else{
            return;
        }
    }
    cancel(){
        this.setState({
            type:'task',
            task:this.state.task,
            edit:false
        })
    }
    save(){
        var date = this.refs.date.value;
        var content = this.refs.content.value;
        this.state.task.date = new Date(date);
        this.state.task.content = content;
        this.setState({
            type:'task',
            task:this.state.task,
            edit:false
        });
        List.toJson();
        mySignal.changeSignal.dispatch();
    }
    addSave(){
        var title = this.refs.title.value;
        var date = this.refs.date.value;
        var content = this.refs.content.value;
        if(title === ''){
            alert('标题不能为空');
            return;
        }
        if(date === ''){
            alert('日期不能为空');
            return;
        }
        if(content === ''){
            alert('内容不能为空');
            return;
        }
        if(!(/d{4}-d{1,2}-d{1,2}/).test(date)){
            alert('日期格式不正确');
            return;
        }
        var dates = date.split('-');
        var dateObj = new Date(date);
        if(dateObj.getFullYear() === parseInt(dates[0]) && (dateObj.getMonth() + 1) === parseInt(dates[1]) && dateObj.getDate() === parseInt(dates[2])){
            mySignal.rerenderSignal.dispatch({
                title:title,
                date:date,
                content:content
            });
        }else{
            alert('日期格式不正确');
            return;
        }
    }
    render(){
            if(this.state.type === 'task'&& !this.state.edit && this.state.task){
            return <div className="task-detail">
                <div className="edit-done">
                    <i className="icon icon-done" onClick={this.doneHandle.bind(this)}></i>
                    <i className="icon icon-edit" onClick={this.editAble.bind(this)}></i>
                </div>
                <input type="text" name="title" value={this.state.task.title} className="title" disabled />
                <label className="date">任务日期：
                    <input type="text" name="date" value={this.state.task.fromDate()} className="disableEdit" disabled />
                </label>
                <textarea className="content disableEdit" name="content" disabled value={this.state.task.content}></textarea>
            </div>;
        }else if(this.state.type === 'task'&& this.state.edit && this.state.task){
            return <div className="task-detail">
                <input type="text" name="title" value={this.state.task.title} className="title" disabled/>
                <label className="date">任务日期：
                    <input type="text" name="date" defaultValue={this.state.task.fromDate()}  ref="date"/>
                </label>
                <textarea className="content" name="content" defaultValue ={this.state.task.content} ref="content"></textarea>
                <div className="save-cancel">
                    <button className="cancel" onClick={this.cancel.bind(this)}>取消</button>
                    <button className="save" onClick={this.save.bind(this)}>保存</button>
                </div>
            </div>;
        }else if(this.state.type === 'new'){
           return <div className="task-detail">
               <input type="text" name="title"  ref="title" className="title"/>
               <label className="date">任务日期：
                   <input type="text" name="date"  ref="date"/>
               </label>
               <textarea className="content" name="content"  ref="content"></textarea>
               <div className="save-cancel">
                   <button className="cancel" onClick={this.cancel.bind(this)}>取消</button>
                   <button className="save" onClick={this.addSave.bind(this)}>保存</button>
               </div>
           </div>;
        }else{
           return <div className="task-detail"></div>;
        }
    }
}
export default TaskDetail;