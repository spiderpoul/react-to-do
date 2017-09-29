import * as React from 'react';
import './ToDoAddNew.less';

export default class ToDoAddNew extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      newToDoLabel: '',
    };
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }
  handleTextInputChange({ target }: any) {
    this.setState({
      newToDoLabel: target.value,
    });
  }
  handleKeyPressed({ key }: any) {
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
          placeholder="Whats needs to be done?"
        />
      </div>
    );
  }
}
