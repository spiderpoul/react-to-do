import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import ToDoMain from './ToDoMain/ToDoMain';
import ToDoSideBar from './ToDoSideBar/ToDoSideBar';
import todoStore from './ToDoStore';
import './ToDoApp.less';

class ToDoApp extends Component {
  constructor() {
    super();
    this.todosLists = todoStore.todosLists;
    this.onAddList = this.onAddList.bind(this);
  }
  onAddList(description) {
    todoStore.addTodosList(description);
  }
  render() {
    this.lists = todoStore.todosLists;
    this.defaultUrl = `/lists/${this.lists[0].id}`;
    this.ActiveToDo = ({ match }) => {
      const selectedList = this.lists.find(list => list.id.toString() === match.params.listId);
      return (
        selectedList ? <ToDoMain store={selectedList.todos} /> : <h2>List not found</h2>
      );
    };
    return (
      <Router>
        <section className="todo-app page__todo-app">
          <ToDoSideBar lists={this.lists} onAddList={this.onAddList} />
          <Switch>
            <Route path="/lists/:listId" component={this.ActiveToDo} />
            <Route render={() => (
              <Redirect to={this.defaultUrl} />
            )} />
          </Switch>
        </section>
      </Router>
    );
  }
}

export default ToDoApp;
