import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../models/store';
import { ITodo, ITodoState } from '../../models/todo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { todoGetList, todoCreate, todoDelete } from './redux';
import TodoList from './components/TodoList';
import { formatTime } from '../../helpers/stringHelper';
import { hex } from '../../helpers/styleHelper';

/* Styles */
const style = require('./style.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(style);

interface IProps {
  todo: ITodoState;
  todoGetList: any;
  todoCreate: (todo: ITodo) => void;
  todoDelete: (id: number) => void;
}

interface IState {
  newTodo: string;
}

class Todo extends React.Component<IProps, IState> {
  constructor (props) {
    super(props);

    this.state = {
      newTodo: '',
    }
  }

  componentDidMount () {
    // this.props.todoGetList();
  }

  onChange = event => {
    this.setState({ newTodo: event.target.value });
  }

  onTodoCreate = event => {
    event.preventDefault();

    this.props.todoCreate({
      id: Math.round(Math.random() * 10000000),
      title: this.state.newTodo,
      time: formatTime(new Date()),
      bg: hex(),
    });

    this.setState({ newTodo: '' });
  }

  onTodoDelete = (id: number) => {
    this.props.todoDelete(id);
  }

  render() {
    const { list } = this.props.todo;
    const { newTodo } = this.state;
    const canAddTodo = newTodo.length > 0;

    return (
      <div className={cx('todo')}>
        <div className={cx('todo__head')}>
          <form className={cx('todo__form')} onSubmit={this.onTodoCreate}>
            <Input onChange={this.onChange} value={newTodo} placeholder="Create todo..." />
            <Button disabled={!canAddTodo}>Добавить</Button>
          </form>
        </div>

        <div className={cx('todo__list')}>
          {list && <TodoList todolist={list} onTodoDelete={this.onTodoDelete} />}
        </div>
      </div>
    );
  }
}

export default (connect as any)(
  (state: IStore) => ({
    todo: state.todo,
  }),
  {
    todoGetList,
    todoCreate,
    todoDelete,
  },
)(Todo);

