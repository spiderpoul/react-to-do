import * as React from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import classNames from 'classnames';
import './ToDoItem.less';

const DragHandle = SortableHandle(() => <span className="todo-item__drag-handler">::</span>);


class ToDoItem extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      edit: false,
    };
    this.handleInputLostFocus = this.handleInputLostFocus.bind(this);
    this.handleToDoClicked = this.handleToDoClicked.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
    this.handleRemoveToDo = this.handleRemoveToDo.bind(this);
    this.handleTextInputChanged = this.handleTextInputChanged.bind(this);
    this.handleCompletedCheckboxChange = this.handleCompletedCheckboxChange.bind(this);
  }
  handleToDoClicked() {
    this.setState({
      editing: true,
      editedTask: this.props.todo.task,
    });
  }
  handleInputLostFocus() {
    this.setState({ editing: false });
  }
  handleKeyPressed(event: any) {
    if (event.key === 'Enter') {
      this.handleInputLostFocus();
      this.props.onEditToDo(Object.assign({}, this.props.todo, { task: this.state.editedTask }));
    }
  }
  handleTextInputChanged({ target }: any) {
    this.setState({
      editedTask: target.value,
    });
  }
  handleRemoveToDo() {
    this.props.onRemoveToDo(this.props.todo);
  }
  handleCompletedCheckboxChange({ target }: any) {
    this.props.onToggleCompleted(this.props.todo);
  }
  render() {

    const editableToDo = () => {
      const todoItemTextClass = classNames({
        'todo-item__text': true,
        'todo-item__text--completed': this.props.todo.completed,
      });
      if (this.state.editing) {
        return (
          <input
            className="todo-item__input"
            type="text"
            value={this.state.editedTask}
            onBlur={this.handleInputLostFocus}
            onKeyPress={this.handleKeyPressed}
            onChange={this.handleTextInputChanged}
            autoFocus={true}
          />);
      }
      return (
        <span
          className={todoItemTextClass}
          onClick={this.handleToDoClicked}
        >{this.props.todo.task}
        </span>
      );
    };
    return (
      <li className="todo-item">
        <DragHandle />
        <input
          className="todo-item__checkbox"
          type="checkbox"
          checked={this.props.todo.completed}
          onChange={this.handleCompletedCheckboxChange}
        />
        {editableToDo()}
        <button className="todo-item__delete" onClick={this.handleRemoveToDo} />
      </li>
    );
  }
}

export default SortableElement(ToDoItem);
