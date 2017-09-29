import * as React from 'react';
import classNames from 'classnames';
import './ToDoInfo.less';

export default class ToDoInfo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handleClickFilter = this.handleClickFilter.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
  }
  handleClickFilter({ target }: any) {
    this.props.onFilterChange(target.name);
  }
  handleClearCompleted() {
    this.props.onClearCompleted();
  }
  render() {
    const leftTasksCount = this.props.todos.filter(({ completed }: any) => !completed).length;
    const haveCompleted = this.props.todos.some(({ completed }: any) => completed);
    const filterBtn = (filterName: any) => {
      const filterBtnClass = classNames({
        'todo-info__filter-btn': true,
        'todo-info__filter-btn--active': this.props.activeFilter === filterName,
      });
      return (
        <button
          className={filterBtnClass}
          name={filterName}
          onClick={this.handleClickFilter}
        >
          {filterName}
        </button>
      );
    };
    const btnClearClass = classNames({
      'todo-info__clear': true,
      'todo-info__clear--deactive': !haveCompleted,
    });
    return (
      <footer className="todo-info">
        <div className="todo-info__items-left">
          {leftTasksCount} item{leftTasksCount > 1 ? 's' : ''} left
        </div>
        {filterBtn('all')}
        {filterBtn('active')}
        {filterBtn('completed')}
        <button
          className={btnClearClass}
          onClick={this.handleClearCompleted}
        > 
          Clear completed 
        </button>
      </footer>
    );
  }
}

