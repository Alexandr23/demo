import * as React from 'react';
import { ITodo } from '../../../../models/todo';
import Todo from '../Todo';

/* Styles */
const style = require('./style.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(style);

interface IProps {
  todolist: ITodo[];
  onTodoDelete (id: number): void;
}

class TodoList extends React.Component<IProps> {
  render() {
    const { todolist, onTodoDelete } = this.props;

    return (
      <div className={cx('todolist')}>
        {todolist.length > 0 && todolist.map((todo, i) => (<Todo key={i} todo={todo} onTodoDelete={onTodoDelete} />))}
      </div>
    );
  }
}

export default TodoList;

