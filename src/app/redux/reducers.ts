import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import TodoReducer from '../features/Todo/redux';
import UserReducer from '../redux/user';

export default combineReducers({
  routing,
  todo: TodoReducer,
  user: UserReducer,
});
