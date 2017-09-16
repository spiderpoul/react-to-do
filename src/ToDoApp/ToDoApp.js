import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';
import './ToDoApp.less';
import ToDoAddNew from './ToDoAddNew/ToDoAddNew';
import ToDoList from './ToDoList/ToDoList';
import ToDoInfo from './ToDoInfo/ToDoInfo';


export default class ToDoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 1, task: 'Learn React', completed: false },
        { id: 2, task: 'Read React manual', completed: true },
        { id: 3, task: 'Create to-do app', completed: false },
      ],
      activeFilter: 'all',
    };
    this.onAddToDo = this.onAddToDo.bind(this);
    this.onCompleteToDo = this.onCompleteToDo.bind(this);
    this.onUnCompleteToDo = this.onUnCompleteToDo.bind(this);
    this.onRemoveToDo = this.onRemoveToDo.bind(this);
    this.onEditLabelToDo = this.onEditLabelToDo.bind(this);
    this.onClearCompleted = this.onClearCompleted.bind(this);
    this.onSetToDoFilter = this.onSetToDoFilter.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }
  onAddToDo(task) {
    this.setState((prevState) => {
      let lastId = 0;
      if (prevState.todos.length > 0) {
        lastId = Math.max(...prevState.todos.map(todo => todo.id));
      }
      return {
        todos: [{ task, id: lastId + 1 }, ...prevState.todos],
      };
    });
  }
  onEditLabelToDo(todo) {
    this.setState((prevState) => ({
      todos: prevState.todos.map(
        item => (item.id === todo.id ? Object.assign({}, item, { task: todo.task }) : item),
      ),
    }));
  }
  onCompleteToDo(todo) {
    this.setState((prevState) => ({
      todos: prevState.todos.map(
        item => (item.id === todo.id ? Object.assign({}, item, { completed: true }) : item),
      ),
    }));
  }
  onUnCompleteToDo(todo) {
    this.setState((prevState) => ({
      todos: prevState.todos.map(
        item => (item.id === todo.id ? Object.assign({}, item, { completed: false }) : item),
      ),
    }));
  }
  onRemoveToDo(todo) {
    this.setState((prevState) => ({
      todos: prevState.todos.filter(({ id }) => id !== todo.id),
    }));
  }
  onSetToDoFilter(filter) {
    this.setState({
      activeFilter: filter,
    });
  }
  onClearCompleted() {
    this.setState((prevState) => ({
      todos: prevState.todos.filter(({ completed }) => completed === false),
    }));
  }
  onSortEnd({ oldIndex, newIndex }) {
    this.setState((prevState) => ({
      todos: arrayMove(prevState.todos, oldIndex, newIndex),
    }));
  }
  render() {
    return (
      <section className="todo-app page__todo-app">
        <h1 className="todo-app__title">TO-DO App</h1>
        <ToDoAddNew onToDoAdd={this.onAddToDo} />
        <ToDoList
          todos={this.state.todos}
          activeFilter={this.state.activeFilter}
          onEditToDo={this.onEditLabelToDo}
          onCompleteToDo={this.onCompleteToDo}
          onUnCompleteToDo={this.onUnCompleteToDo}
          onRemoveToDo={this.onRemoveToDo}
          onSortEnd={this.onSortEnd}
          useDragHandle={true}
        />
        <ToDoInfo
          todos={this.state.todos}
          activeFilter={this.state.activeFilter}
          onClearCompleted={this.onClearCompleted}
          onFilterChange={this.onSetToDoFilter}
        />
      </section>
    );
  }
}

ToDoApp.propTypes = {
  todos: PropTypes.array,
};
