/**
 * Created by Administrator on 2016/10/24.
 */
import React from 'react';
import {render} from 'react-dom';
import mySignal from 'boradCast';
import List from 'data';

class Dialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show:false,
            taskType:[]
        };
        this.className = 'dialog hide';
        this.options();
    }
    options(){
        var that = this;
        mySignal.dialogSignal.add(function(data){
            that.setState({
                show:true,
                taskType:data
            })
        });
    }
    getOptions(){
        return this.state.taskType.map(function(item,index){
            return <option value={item}>{item}</option>;
        });
    }
    addType(){
        var parent = this.refs.selectDom.value;
        var title = this.refs.inputDom.value;
        if(title === ''){
            alert('不能为空!');
            return ;
        }
        if(parent === 'none'){
            parent = '';
        }
        if(List.addType(title,parent)){
            List.toJson();
            this.setState({
                show:false,
                taskType:[]
            });
            mySignal.addTaskSignal.dispatch(parent,title);
        }
    }
    close(e){
        this.setState({
           show:false,
           taskType:this.state.taskType
        });
    }

    componentWillUpdate(nextProps,nextState){
        if(nextState.show){
            this.className = 'dialog';
        }else{
            this.className = 'dialog hide';
        }
    }
    render(){
        return <div className={this.className}>
            <div className="box">
                <p className="title">新建分类
                    <i className="icon close" onClick={this.close.bind(this)}></i>
                </p>
                <label>分类：
                    <input type="text" name="typeName" defaultValue="" ref="inputDom" />
                </label>
                <label>粑粑:
                    <select name="parent" ref="selectDom">
                        <option value="none">无</option>
                        {this.getOptions()}
                    </select>
                </label>
                <button type="button" className="sure" onClick={this.addType.bind(this)}>确定</button>
            </div>
        </div>;
    }
}
export default Dialog;