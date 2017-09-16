import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ToDoInfo.less';

export default class ToDoInfo extends Component {
  constructor(props) {
    super(props);
    this.handleClickFilter = this.handleClickFilter.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
  }
  handleClickFilter({ target }) {
    this.props.onFilterChange(target.name);
  }
  handleClearCompleted() {
    this.props.onClearCompleted();
  }
  render() {
    const leftTasksCount = this.props.todos.filter(({ completed }) => !completed).length;
    const haveCompleted = this.props.todos.some(({ completed }) => completed);
    const filterBtn = (filterName) => (<button
      className={(this.props.activeFilter === filterName) ? ' todo-info__filter-btn todo-info__filter-btn--active' : 'todo-info__filter-btn'}
      name={filterName}
      onClick={this.handleClickFilter}>{filterName}</button>);

    return (
      <footer className="todo-info">
        <div className="todo-info__items-left">{leftTasksCount} item{leftTasksCount > 1 ? 's' : ''} left</div>
        {filterBtn('all')}
        {filterBtn('active')}
        {filterBtn('completed')}
        {haveCompleted &&
          <button className="todo-info__clear"
            onClick={this.handleClearCompleted}>Clear completed</button>
        }
      </footer>
    );
  }
}

ToDoInfo.propTypes = {
  todos: PropTypes.array,
  activeFilter: PropTypes.string,
  onFilterChange: PropTypes.func,
  onClearCompleted: PropTypes.func,
};

