import { observable, action, computed } from 'mobx';

class ToDo {
  @observable id: number;
  @observable task: string;
  @observable completed: boolean;

  constructor(id: number, task: string) {
    this.id = id;
    this.task = task;
    this.completed = false;
  }
}

class ToDoList {
  @observable todos: ToDo[] = [];
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

  @action setActiveFilter = (filter: string) => {
    this.activeFilter = filter;
  }

  @action addToDo = (task: string) => {
    let lastId = 0;
    const todosId = this.todos.map(todo => todo.id);
    if (this.todos.length > 0) {
      lastId = Math.max(...todosId.slice()) + 1;
    }
    this.todos.push(new ToDo(lastId, task));
  }

  @action toogleCompleted = (todo: ToDo) => {
    const editedTodos = this.todos.map(
      item => (item.id === todo.id ? Object.assign({}, item, { completed: !todo.completed })
        : item),
    );
    //this.todos.replace(editedTodos);
  }

  @action editLabelTodo = (todo: ToDo) => {
    const editedTodos = this.todos.map(
      item => (item.id === todo.id ? Object.assign({}, item, { task: todo.task }) : item),
    );
    //this.todos.replace(editedTodos);
  }

  @action removeTodo = (todo: ToDo) => {
    const editedTodos = this.todos.filter(({ id }) => id !== todo.id);
    //this.todos.replace(editedTodos);
  }
  @action clearCompleted = () => {
    const editedTodos = this.todos.filter(({ completed }) => completed === false);
    //this.todos.replace(editedTodos);
  }
  @action setTodos = (todos: ToDo[]) => {
    //this.todos.replace(todos);
  }
}


interface ITodosLists {
  id: number;
  description: string;
  todos: ToDoList;
}

class TodosStore {  
  @observable todosLists: ITodosLists[]; // = [];

  @action addTodosList = (description: string) => {
    this.todosLists.push({
      description,
      id: this.todosLists.length,
      todos: new ToDoList(),
    });
  }

  constructor() {
    this.addTodosList('Work todos');
    this.addTodosList('Home todos');

    this.todosLists[0].todos.addToDo('Learn React');
    this.todosLists[0].todos.addToDo('Read React manual');
    this.todosLists[0].todos.addToDo('Watch some videos about React');
    this.todosLists[0].todos.addToDo('Try to use Router in React');
    this.todosLists[0].todos.addToDo('Read about MobX');
    this.todosLists[0].todos.addToDo('Understand Flux');
    this.todosLists[0].todos.addToDo('Read something about Redux');

    this.todosLists[1].todos.addToDo('Buy milk');
    this.todosLists[1].todos.addToDo('Clean house');
    this.todosLists[1].todos.addToDo('Watch TV');
    this.todosLists[1].todos.addToDo('Feed the cat');
  }
}


export default new TodosStore();
