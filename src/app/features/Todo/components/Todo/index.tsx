import * as React from 'react';
import { ITodo } from '../../../../models/todo';

const style = require('./style.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(style);

interface IProps {
  todo: ITodo;
  onTodoDelete (id: number): void;
}

class Todo extends React.Component<IProps> {
  remove = () => {
    this.props.onTodoDelete(this.props.todo.id);
  }

  render() {
    const { title, time, bg } = this.props.todo;

    return (
      <div className={cx('todo')}>
        <div className={cx('todo__inner')}>
          <div className={cx('todo__icon')} style={{ backgroundColor: bg }}>{ title && title[0] }</div>
          <div className={cx('todo__title')}>{ title }</div>
          <div className={cx('todo__time')}>{ time }</div>
          <div className={cx('todo__remove')} onClick={this.remove} />
        </div>
      </div>
    );
  }
}

export default Todo;

