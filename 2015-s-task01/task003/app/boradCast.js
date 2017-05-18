/**
 * Created by Administrator on 2016/10/24.
 */
import  signals from 'signals';
const boradCastData = {
   //传递taskList的信号
   listSignal: new signals.Signal,
   //传递taskDetail的信号
   detailSignal: new signals.Signal,
   //打开对话框的信号
   dialogSignal: new signals.Signal,
   //修改task的信号
   changeSignal: new signals.Signal,
   //添加task的信号
   newTaskSignal:new signals.Signal,
   //添加完task刷新的信号
   rerenderSignal:new signals.Signal,
   renderList:new signals.Signal,
   //添加完taskType后刷新信号
   addTaskSignal:new signals.Signal,
   //删除taskType之后刷新信号
   deleteSignal:new signals.Signal,
   //删除task后刷新信号
   deletaTaskSignal:new signals.Signal
};
export default boradCastData;