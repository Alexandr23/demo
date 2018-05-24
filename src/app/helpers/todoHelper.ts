import { ITodo } from '../models/todo';

export const removeTodo = (todos: ITodo[], id: number): ITodo[] => {
  const index = todos.findIndex(todo => todo.id === id);

  if (index) {
    todos.splice(index, 1);
  }

  return todos;
}
