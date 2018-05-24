import request from '../services/request';

export const getTodoList = (params = { _limit: 20 }) => request.get('https://jsonplaceholder.typicode.com/photos', { params });