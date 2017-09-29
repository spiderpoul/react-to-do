import * as React from 'react';
import CSSTransitionGroup from 'react-transition-group';
import { SortableContainer } from 'react-sortable-hoc';
import ToDoItem from './ToDoItem/ToDoItem';
import './ToDoList.less';

//@SortableContainer
class ToDoList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const toDoItem = (todo: any, index: any) =>
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
          transitionLeaveTimeout={300}
        >
          {toDoItems}
        </CSSTransitionGroup>
      </ul>
    );
  }
}

export default SortableContainer(ToDoList);

