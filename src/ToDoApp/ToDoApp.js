import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';
import ToDoAddNew from './ToDoAddNew/ToDoAddNew';
import ToDoList from './ToDoList/ToDoList';
import ToDoInfo from './ToDoInfo/ToDoInfo';
import './ToDoApp.less';

@observer
class ToDoApp extends Component {
  constructor(props) {
    super(props);
    this.onAddToDo = this.onAddToDo.bind(this);
    this.onToggleCompleted = this.onToggleCompleted.bind(this);    
    this.onRemoveToDo = this.onRemoveToDo.bind(this);
    this.onEditLabelToDo = this.onEditLabelToDo.bind(this);
    this.onClearCompleted = this.onClearCompleted.bind(this);
    this.onSetToDoFilter = this.onSetToDoFilter.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }
  onAddToDo(task) {
    this.props.store.addToDo(task);
  }
  onEditLabelToDo(todo) {
    this.props.store.editLabelTodo(todo);
  }
  onToggleCompleted(todo) {
    this.props.store.toogleCompleted(todo);
  }
  onRemoveToDo(todo) {
    this.props.store.removeTodo(todo);
  }
  onSetToDoFilter(filter) {
    this.props.store.setActiveFilter(filter);
  }
  onClearCompleted() {
    this.props.store.clearCompleted();
  }
  onSortEnd({ oldIndex, newIndex }) {
    this.props.store.setTodos(arrayMove(this.props.store.todos, oldIndex, newIndex));
  }
  render() {
    const { activeFilter, filteredTodos, todos } = this.props.store;
    return (
      <section className="todo-app page__todo-app">
        <h1 className="todo-app__title">TO-DO App</h1>
        <ToDoAddNew onToDoAdd={this.onAddToDo} />
        <ToDoList
          todos={filteredTodos.slice()}
          onEditToDo={this.onEditLabelToDo}
          onToggleCompleted={this.onToggleCompleted}          
          onRemoveToDo={this.onRemoveToDo}
          onSortEnd={this.onSortEnd}
          useDragHandle={true}
        />
        <ToDoInfo
          todos={todos.slice()}
          activeFilter={activeFilter}
          onClearCompleted={this.onClearCompleted}
          onFilterChange={this.onSetToDoFilter}
        />
      </section>
    );
  }
}

ToDoApp.propTypes = {
  store: PropTypes.object,
};

export default ToDoApp;