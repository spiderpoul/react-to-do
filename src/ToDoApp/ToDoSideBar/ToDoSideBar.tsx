import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './ToDoSideBar.less';

@withRouter
class ToDoSideBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      newListName: '',
    };
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }
  handleTextInputChange({ target }: any) {
    this.setState({
      newListName: target.value,
    });
  }
  handleKeyPressed({ key }: any) {
    if (key === 'Enter' && this.state.newListName) {
      this.props.onAddList(this.state.newListName);
      this.setState({
        newListName: '',
      });
      this.props.history.push(`/lists/${this.props.lists.length - 1}`);
    }
  }
  render() {
    const { lists } = this.props;
    const listsElem = lists.map((list: any) => (
      <li key={list.id} className="todo-aside__item">
        <NavLink
          to={`/lists/${list.id}`}
          activeClassName='todo-aside__link--active'
          className="todo-aside__link">
          {list.description}
        </NavLink>
      </li>
    ));
    return (
      <aside className="todo-aside">
        <ul className="todo-aside__lists">
          {listsElem}
        </ul>
        <input
          className="todo-aside__input"
          value={this.state.newListName}
          onChange={this.handleTextInputChange}
          onKeyPress={this.handleKeyPressed}
          type="text"
          placeholder="Add new list"
        />
      </aside>
    );
  }
}

export default ToDoSideBar;
