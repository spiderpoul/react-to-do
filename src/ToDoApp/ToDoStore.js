import { observable, action, computed } from 'mobx';

class ToDo {
  @observable id;
  @observable task;
  @observable completed;

  constructor(task) {
    this.id = Date.now();
    this.task = task;
    this.completed = false;
  }
}

class ToDoStore {
  @observable todos = [
    { id: 1, task: 'Learn React', completed: false },
    { id: 2, task: 'Read React manual', completed: true },
    { id: 3, task: 'Watch some videos about React', completed: false },
    { id: 4, task: 'Try to use Router in React', completed: false },
    { id: 5, task: 'Read about MobX', completed: false },
    { id: 6, task: 'Understand Flux', completed: false },
    { id: 7, task: 'Read smth about Redux', completed: false },
  ];
  @observable activeFilter = 'all';

  @computed get filteredTodos() {
    if (this.activeFilter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }
    if (this.activeFilter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    }
    return this.todos;
  }

  @action setActiveFilter = (filter) => {
    this.activeFilter = filter;
  }

  @action addToDo = (task) => {
    this.todos.push(new ToDo(task));
  }

  @action toogleCompleted = (todo) => {    
    const editedTodos = this.todos.map(
      item => (item.id === todo.id ? Object.assign({}, item, { completed: !todo.completed }) : item),
    );
    this.todos.replace(editedTodos);
  }

  @action editLabelTodo = (todo) => {
    const editedTodos = this.todos.map(
      item => (item.id === todo.id ? Object.assign({}, item, { task: todo.task }) : item),
    );
    this.todos.replace(editedTodos);
  }

  @action removeTodo = (todo) => {
    const editedTodos = this.todos.filter(({ id }) => id !== todo.id);
    this.todos.replace(editedTodos);
  }
  @action clearCompleted = () => {
    const editedTodos = this.todos.filter(({ completed }) => completed === false);
    this.todos.replace(editedTodos);
  }
  @action setTodos = (todos) => {
    this.todos.replace(todos);
  }
}

export default new ToDoStore();