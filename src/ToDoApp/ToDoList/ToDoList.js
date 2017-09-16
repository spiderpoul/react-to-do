import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem/ToDoItem';
import './ToDoList.less';

export default class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveToDo = this.handleRemoveToDo.bind(this);
    this.handleEditToDo = this.handleEditToDo.bind(this);
    this.handleCompleteToDo = this.handleCompleteToDo.bind(this);
    this.handleUnCompleteToDo = this.handleUnCompleteToDo.bind(this);
  }
  handleRemoveToDo(todo) {
    this.props.onRemoveToDo(todo);
  }
  handleEditToDo(todo) {
    this.props.onEditToDo(todo);
  }
  handleCompleteToDo(todo) {
    this.props.onCompleteToDo(todo);
  }
  handleUnCompleteToDo(todo) {
    this.props.onUnCompleteToDo(todo);
  }
  render() {
    let toDoItems;
    const toDoItem = (todo) =>
      (<ToDoItem
        key={todo.id}
        todo={todo}
        onRemoveToDo={this.handleRemoveToDo}
        onEditToDo={this.handleEditToDo}
        onCompleteToDo={this.handleCompleteToDo}
        onUnCompleteToDo={this.handleUnCompleteToDo}
      />);
    if (this.props.activeFilter === 'all') {
      toDoItems = this.props.todos.map(toDoItem);
    }
    if (this.props.activeFilter === 'completed') {
      toDoItems = this.props.todos.filter(todo => todo.completed).map(toDoItem);
    }
    if (this.props.activeFilter === 'active') {
      toDoItems = this.props.todos.filter(todo => !todo.completed).map(toDoItem);
    }
    return (
      <ul className="todo-list">
        {toDoItems}
      </ul>
    );
  }
}

ToDoList.propTypes = {
  todos: PropTypes.array,
  activeFilter: PropTypes.string,
  onRemoveToDo: PropTypes.func,
  onEditToDo: PropTypes.func,
  onCompleteToDo: PropTypes.func,
  onUnCompleteToDo: PropTypes.func,
};

