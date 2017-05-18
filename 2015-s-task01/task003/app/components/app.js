/**
 * Created by Administrator on 2016/10/21.
 */
import React from 'react';
import {render} from 'react-dom';
import Header from 'components/header';
import TaskTypeList from 'components/taskType/taskTypeList';
import TaskList from 'components/taskList/taskList';
import TaskDetail from 'components/taskDetail';
import Dialog from 'components/dialog';
//const localStorage = window.localStorage;

class App extends React.Component{
    constructor(props){
       super(props);
    }
    render(){
    return <div className="app">
        <Header />
        <TaskTypeList />
        <TaskList />
        <TaskDetail />
        <Dialog />
        </div>;
    }
}
export default App;