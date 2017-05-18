/**
 * Created by Administrator on 2016/10/21.
 */
import React from 'react';
import {render} from 'react-dom';
import List from 'data';

class FileListItem extends React.Component{
    constructor(props){
        super(props);
        this.className = '';
    }
    sum(data){
        var sum = 0;
        for(let i = 0;i < data.length;i++){
            sum += List.getSum(data[i].children);
        }
        return sum;
    }

    renderFile(data){
        var that = this;
        return data.map(function(item,index){
                var className = '';
                if(item.parent.title === that.props.selected.parent && item.title === that.props.selected.title){
                    className = 'selected';
                }
                return <li className={className} key={index}>
                    <div data-title={item.title} data-parent={item.parent.title} onClick={that.props.onClick}>
                        <i className="icon icon-file"></i>
                        {item.title}({List.getSum(item.children)})
                        {function(){
                            if(item.title === '默认子分类'){
                                return;
                            }else{
                                return <i className="icon icon-delete"></i>;
                            }
                        }()
                        }
                    </div>
                </li>;
            });
    }
    componentWillReceiveProps(nextProps){
        var data = nextProps.data;
        if(data.title === nextProps.selected.title && !nextProps.selected.parent){
            this.className = 'selected';
        }else{
            this.className = '';
        }
    }
    componentWillMount(){
        if(this.props.data.title === this.props.selected.title && !this.props.parent){
            this.className = 'selected';
        }else{
            this.className = '';
        }
    }
    isDetele(){
        if(this.props.data.title === '默认分类'){
            return '';
        }else{
            return <i className="icon icon-delete"></i>;
        }
    }
    render(){
            return <li className={this.className}>
                <div data-title={this.props.data.title} onClick={this.props.onClick}>
                    <i className="icon icon-floder" ></i>
                    {this.props.data.title}({this.sum(this.props.data.children)})
                    {this.isDetele()}
                </div>
                <ul className="file-list">
                    {this.renderFile(this.props.data.children)}
                </ul>
            </li>;
    }
}
export default FileListItem;