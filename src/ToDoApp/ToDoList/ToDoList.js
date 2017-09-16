import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem/ToDoItem';
import './ToDoList.less';
import { SortableContainer } from 'react-sortable-hoc';

@SortableContainer
class ToDoList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let toDoItems;
    const toDoItem = (todo, index) =>
      (<ToDoItem
        index={index}
        key={todo.id}
        todo={todo}
        onRemoveToDo={this.props.onRemoveToDo}
        onEditToDo={this.props.onEditToDo}
        onCompleteToDo={this.props.onCompleteToDo}
        onUnCompleteToDo={this.props.onUnCompleteToDo}
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

export default ToDoList;

