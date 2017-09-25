import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { SortableContainer } from 'react-sortable-hoc';
import ToDoItem from './ToDoItem/ToDoItem';
import './ToDoList.less';

@SortableContainer
class ToDoList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const toDoItem = (todo, index) =>
      (<ToDoItem
        index={index}
        key={todo.id}
        todo={todo}
        onRemoveToDo={this.props.onRemoveToDo}
        onEditToDo={this.props.onEditToDo}
        onToggleCompleted={this.props.onToggleCompleted}
      />);
    const toDoItems = this.props.todos.map(toDoItem);
    return (
      <ul className="todo-list">
        <CSSTransitionGroup
          transitionName="todo-list"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {toDoItems}
        </CSSTransitionGroup>
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

