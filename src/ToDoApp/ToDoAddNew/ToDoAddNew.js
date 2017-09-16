import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ToDoAddNew.less';

export default class ToDoAddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newToDoLabel: '',
    };
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }
  handleTextInputChange({ target }) {
    this.setState({
      newToDoLabel: target.value,
    });
  }
  handleKeyPressed({ key }) {
    if (key === 'Enter' && this.state.newToDoLabel) {
      this.props.onToDoAdd(this.state.newToDoLabel);
      this.setState({
        newToDoLabel: '',
      });
    }
  }
  render() {
    return (
      <div className="todo-add">
        <input
          className="todo-add__input"
          value={this.state.newToDoLabel}
          onChange={this.handleTextInputChange}
          onKeyPress={this.handleKeyPressed}
          type="text"
          placeholder="Whats needs to be done?" />
      </div>
    );
  }
}

ToDoAddNew.propTypes = {
  onToDoAdd: PropTypes.func,
};
