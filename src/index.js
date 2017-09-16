import React from 'react';
import ReactDOM from 'react-dom';
import ToDoApp from './ToDoApp/ToDoApp';
import todoStore from './ToDoApp/ToDoStore';
import './index.less';

ReactDOM.render(<ToDoApp store={todoStore}/>, document.getElementById('root'));
