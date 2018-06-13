import request from '../services/request';

export const getTodoList = () => request.get('/api/todos/');
export const createTodo = (todo: any) => request.post('/api/todos', todo);
export const deleteTodo = (id: number) => request.delete('/api/todos', { data: { id } });