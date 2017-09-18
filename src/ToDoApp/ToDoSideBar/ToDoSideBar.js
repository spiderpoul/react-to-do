import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import './ToDoSideBar.less';

@withRouter
class ToDoSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newListName: '',
    };
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }
  handleTextInputChange({ target }) {
    this.setState({
      newListName: target.value,
    });
  }
  handleKeyPressed({ key }) {
    if (key === 'Enter' && this.state.newListName) {
      this.props.onAddList(this.state.newListName);
      this.setState({
        newListName: '',
      });
      this.props.history.push(`/lists/${this.props.lists.length-1}`);
    }        
  }
  render() {
    const { lists } = this.props;
    return (
      <aside className="todo-aside">
        <ul className="todo-aside__lists">
          {lists.map(list => (
            <li key={list.id} className="todo-aside__item">
              <NavLink
                to={`/lists/${list.id}`}
                activeClassName='todo-aside__link--active'
                className="todo-aside__link">
                {list.description}
              </NavLink>
            </li>
          ))}
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

ToDoSideBar.propTypes = {
  lists: PropTypes.object,
  onAddList: PropTypes.func,
};

export default ToDoSideBar;
