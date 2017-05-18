/**
 * Created by Administrator on 2016/10/21.
 */
import React from 'react';
import {render} from 'react-dom';
import mySignal from 'boradCast';
import FileListItem from 'components/taskType/fileListItem';
import List from 'data';

class  TaskTypeList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            parent:'默认分类',
            title:'默认子分类'
        };
        var that = this;
        mySignal.rerenderSignal.add(function(data){
            var parent = List.getTaskType(that.state.title,that.state.parent);
            var task = List.addTask(parent,data.title,data.date,data.content);
            List.toJson();
            that.setState({
                parent:task.parent.parent.title,
                title:task.parent.title
            },function(){
                mySignal.listSignal.dispatch(List.dateTask(List.getTasks(that.state.title,that.state.parent)),task);
                //mySignal.renderList.dispatch(data.title,task);
            });
        });
        mySignal.addTaskSignal.add(function(parent,title){
            that.setState({
                parent:parent,
                title:title
            },function(){
                mySignal.listSignal.dispatch(List.dateTask(List.getTasks(that.state.title,that.state.parent)));
            });
        });
        mySignal.deletaTaskSignal.add(function(){
            that.forceUpdate();
            mySignal.listSignal.dispatch(List.dateTask(List.getTasks(that.state.title,that.state.parent)));
        });
    }
    componentDidMount(){
        mySignal.listSignal.dispatch(List.dateTask(List.getTasks(this.state.title,this.state.parent)));
    }
    clickHandle(e){
        var target = e.target;
        if(target.nodeName.toUpperCase() === 'DIV'){
            this.setState({
                parent:target.getAttribute('data-parent'),
                title:target.getAttribute('data-title')
            },function(){
                mySignal.listSignal.dispatch(List.dateTask(List.getTasks(this.state.title,this.state.parent)));
            });
        }else if(target.className.replace(/\s+/g,'') === 'iconicon-delete'){
            if(confirm('删除操作不可修复，确认删除？')){
                this.deleteHandle(target.parentElement);
            }else{
                return;
            }
        }
    }
    deleteHandle(node){
        var parent = node.getAttribute('data-parent');
        var title = node.getAttribute('data-title');
        List.deleteType(title,parent);
        List.toJson();
        if((!parent && !this.state.parent && title === this.state.title) || (!parent && this.state.parent && title === this.state.parent)){
            this.setState({
                parent:'默认分类',
                title:'默认子分类'
            },function(){
                mySignal.listSignal.dispatch(List.dateTask(List.getTasks(this.state.title,this.state.parent)));
            });
        }else if(parent === this.state.parent && title === this.state.title){
            var taskType = List.getTaskType(parent,'');
                this.setState({
                    parent:taskType.parent.title,
                    title:taskType.title
                },function(){
                    mySignal.listSignal.dispatch(List.dateTask(List.getTasks(this.state.title,this.state.parent)));
                });
        }
        else{
            this.forceUpdate();
        }
    }
    addType(){
        mySignal.dialogSignal.dispatch(List.getTypeName());
    }
    render(){
        return <div className="aside task-list">
            <p className="title">所有任务（<span className="task-num">{List.getSum()}</span>）</p>
            <p className="title">分类列表</p>
            <ul className="floder-list">
                {this.renderFile(List.taskList)}
            </ul>
            <footer className="footer-taskType" onClick={this.addType.bind(this)}><i className="icon icon-add"></i>新建分类</footer>
        </div>
    }
    renderFile(data){
        var that = this;
        return data.map(function(item,index){
            return  <FileListItem  key={index} data={item} onClick={that.clickHandle.bind(that)} selected={that.state} />;
        });
    }
}
export default TaskTypeList;