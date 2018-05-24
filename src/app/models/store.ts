import { RouterState } from 'react-router-redux';
import { ITodoState } from './todo';

export interface IStore {
  routing?: RouterState;
  todo: ITodoState;
}