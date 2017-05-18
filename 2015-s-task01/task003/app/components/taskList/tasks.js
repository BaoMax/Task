/**
 * Created by Administrator on 2016/10/24.
 */
import React from 'react';
import {render} from 'react-dom';
import mySignal from 'boradCast';
import List from 'data';

class Tasks extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected:''
        };
    }
    componentWillReceiveProps(nextProps){
        var data = nextProps.data;
        if(nextProps.select){
            this.setState({
                selected:nextProps.select.title
            });
            mySignal.detailSignal.dispatch(nextProps.select);
        }else{
            this.setState({
                selected:List.getName(data)
            });
            mySignal.detailSignal.dispatch(this.getDefaultTask(nextProps.data));
        }
    }
    clickHandle(e){
        var target = e.target;
        if(target.className.replace(/\s+/g,'') === 'iconicon-delete'){
            if(confirm('删除操作不可修复，确认删除？')){
                this.deleteHandle(target.parentElement);
            }else{
                return;
            }
        }else{
            var title = target.getAttribute('data-title');
            var date = target.getAttribute('data-date');
            var tasks = this.props.data[date];
            for(var i = 0,l = tasks.length;i < l;i += 1){
                if(tasks[i].title === title){
                    this.setState({
                        selected:title
                    });
                    mySignal.detailSignal.dispatch(tasks[i]);
                }
            }
        }
    }
    deleteHandle(node){
        var date = node.getAttribute('data-date');
        var title = node.getAttribute('data-title');
        var tasks = this.props.data[date];
        List.deleteTask(tasks,date,title);
        List.toJson();
        mySignal.deletaTaskSignal.dispatch();
    }
    getDefaultTask(data){
        for(let k in data){
            return data[k][0];
        }
    }
    getTasks(data){
        var select = this.state.selected;
        var result = [];
        var that = this;
        for (var k in data) {
            if(data.hasOwnProperty(k)){
                result.push(<dt key={k}>{k}</dt>);
                result = result.concat(data[k].map(function(item,index){
                    var className = '';
                    if(item.state === 1 && item.title === select){
                        className = 'selected done';
                    }else if(item.state === 1 && item.title !== select){
                        className = 'done';
                    }else if(item.state !== 1 && item.title === select){
                        className = 'selected';
                    }
                    return <dd key={index+k} className={className} data-date={k} data-title={item.title} onClick={that.clickHandle.bind(that)}>
                        {item.title}
                        <i className="icon icon-delete"></i>
                    </dd>;
                })) ;
            }
        }
        return result;
    }
    render(){
        return <dl>
            {this.getTasks(this.props.data)}
        </dl>;
    }
}
export default Tasks;