import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ToDoItem.less';

export default class ToDoItem extends Component {
  constructor(props) {
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
  handleKeyPressed(event) {
    if (event.key === 'Enter') {
      this.handleInputLostFocus();
      this.props.onEditToDo(Object.assign({}, this.props.todo, { task: this.state.editedTask }));
    }
  }
  handleTextInputChanged({ target }) {
    this.setState({
      editedTask: target.value,
    });
  }
  handleRemoveToDo() {
    this.props.onRemoveToDo(this.props.todo);
  }
  handleCompletedCheckboxChange({ target }) {
    if (target.checked) {
      this.props.onCompleteToDo(Object.assign({}, this.props.todo, { completed: 'true' }));
    } else {
      this.props.onUnCompleteToDo(Object.assign({}, this.props.todo, { completed: '' }));
    }
  }
  render() {
    const editableToDo = () => {
      if (this.state.editing) {
        return <input
          className="todo-item__input"
          type="text"
          value={this.state.editedTask}
          onBlur={this.handleInputLostFocus}
          onKeyPress={this.handleKeyPressed}
          onChange={this.handleTextInputChanged}
          autoFocus />;
      }
      return <span
        className="todo-item__text"
        onClick={this.handleToDoClicked}>{this.props.todo.task}</span>;
    };
    return (
      <li className="todo-item">
        <input
          className="todo-item__checkbox"
          type="checkbox"
          checked={this.props.todo.completed}
          onChange={this.handleCompletedCheckboxChange}
        />
        {editableToDo()}
        <button className="todo-item__delete" onClick={this.handleRemoveToDo}></button>
      </li>
    );
  }
}

ToDoItem.propTypes = {
  todo: PropTypes.object,
  onEditToDo: PropTypes.func,
  onRemoveToDo: PropTypes.func,
  onCompleteToDo: PropTypes.func,
  onUnCompleteToDo: PropTypes.func,
};

