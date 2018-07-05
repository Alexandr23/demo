import { RouterState } from 'react-router-redux';
import { ITodoState } from './todo';
import { IUserState } from './user';

export interface IStore {
  routing?: RouterState;
  todo: ITodoState;
  user: IUserState;
}