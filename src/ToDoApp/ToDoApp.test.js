import React from 'react';
import ReactDOM from 'react-dom';
import ToDoApp from './ToDoApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ToDoApp />, div);
});
