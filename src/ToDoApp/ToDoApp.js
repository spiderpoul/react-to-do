import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ToDoApp.less';
import ToDoAddNew from './ToDoAddNew/ToDoAddNew';
import ToDoList from './ToDoList/ToDoList';
import ToDoInfo from './ToDoInfo/ToDoInfo';


export default class ToDoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 1, task: 'Learn React', completed: '' },
        { id: 2, task: 'Read React manual', completed: 'true' },
        { id: 3, task: 'Create to-do app', completed: '' },
      ],
      activeFilter: 'all',
    };
    this.addToDo = this.addToDo.bind(this);
    this.completeToDo = this.completeToDo.bind(this);
    this.unCompleteToDo = this.unCompleteToDo.bind(this);
    this.removeToDo = this.removeToDo.bind(this);
    this.editLabelToDo = this.editLabelToDo.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.setToDoFilter = this.setToDoFilter.bind(this);
  }
  addToDo(task) {
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
  editLabelToDo(todo) {
    this.setState((prevState) => ({
      todos: prevState.todos.map(
        item => (item.id === todo.id ? Object.assign({}, item, { task: todo.task }) : item),
      ),
    }));
  }
  completeToDo(todo) {
    this.setState((prevState) => ({
      todos: prevState.todos.map(
        item => (item.id === todo.id ? Object.assign({}, item, { completed: true }) : item),
      ),
    }));
  }
  unCompleteToDo(todo) {
    this.setState((prevState) => ({
      todos: prevState.todos.map(
        item => (item.id === todo.id ? Object.assign({}, item, { completed: '' }) : item),
      ),
    }));
  }
  removeToDo(todo) {
    this.setState((prevState) => ({
      todos: prevState.todos.filter(({ id }) => id !== todo.id),
    }));
  }
  setToDoFilter(filter) {
    this.setState({
      activeFilter: filter,
    });
  }
  clearCompleted() {
    this.setState((prevState) => ({
      todos: prevState.todos.filter(({ completed }) => completed === ''),
    }));
  }
  render() {
    return (
      <section className="todo-app page__todo-app">
        <h1 className="todo-app__title">TO-DO App</h1>
        <ToDoAddNew onToDoAdd={this.addToDo} />
        <ToDoList
          todos={this.state.todos}
          activeFilter={this.state.activeFilter}
          onEditToDo={this.editLabelToDo}
          onCompleteToDo={this.completeToDo}
          onUnCompleteToDo={this.unCompleteToDo}
          onRemoveToDo={this.removeToDo}
        />
        <ToDoInfo
          todos={this.state.todos}
          activeFilter={this.state.activeFilter}
          onClearCompleted={this.clearCompleted}
          onFilterChange={this.setToDoFilter}
        />
      </section>
    );
  }
}

ToDoApp.propTypes = {
  todos: PropTypes.array,
};
