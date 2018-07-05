import request from '../services/request';

export const login = form => request.post('/api/login', form);
export const register = form => request.post('/api/register', form);