import { ITodo } from '../models/todo';

export const removeTodo = (todos: ITodo[], id: number): ITodo[] => {
  const index = todos.findIndex(todo => todo._id === id);

  if (index !== -1) {
    todos.splice(index, 1);
  }

  return todos;
}
