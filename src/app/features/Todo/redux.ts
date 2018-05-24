import { AxiosResponse, AxiosError } from 'axios';
import * as api from '../../api/todo';
import { ITodo, ITodoState } from '../../models/todo';
import { removeTodo } from '../../helpers/todoHelper';

const TODO_REQUEST_START = 'TODO_REQUEST_START';
const TODO_REQUEST_SUCCESS = 'TODO_REQUEST_SUCCESS';
const TODO_REQUEST_FAILURE = 'TODO_REQUEST_FAILURE';

const TODO_CREATE = 'TODO_CREATE';
const TODO_DELETE = 'TODO_DELETE';

const INITIAL_STATE: ITodoState = {
  list: [],
  error: null,
  isRequesting: false,
  isRequested: false,
};

const TodoReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case TODO_REQUEST_START:
      return {
        ...state,
        isRequesting: true,
        isRequested: false,
      };

    case TODO_REQUEST_SUCCESS:
      return {
        ...state,
        list: payload.reverse(),
        error: null,
        isRequesting: false,
        isRequested: true,
      };

    case TODO_REQUEST_FAILURE:
      return {
        ...state,
        list: [],
        error: payload,
        isRequesting: false,
        isRequested: false,
      };

    case TODO_CREATE:
      return {
        ...state,
        list: [payload, ...state.list],
        error: null,
        isRequesting: false,
        isRequested: false,
      };

    case TODO_DELETE:
      return {
        ...state,
        list: removeTodo(state.list, payload),
        error: null,
        isRequesting: false,
        isRequested: false,
      };

    default:
      return state;
  }
};

export default TodoReducer;

export const todoGetList = () => {
  return (dispatch: any): any => {
    dispatch(todoRequestStart());
    return api.getTodoList()
      .then((response: AxiosResponse) => dispatch(todoRequestSuccess(response)))
      .catch((error: AxiosError) => dispatch(todoRequestFailure(error)));
  };
}

const todoRequestStart = () => {
  return {
    type: TODO_REQUEST_START,
    payload: {},
  };
};

const todoRequestSuccess = (payload: AxiosResponse) => {
  return {
    type: TODO_REQUEST_SUCCESS,
    payload: payload.data,
  };
};

const todoRequestFailure = (error: AxiosError) => {
  return {
    type: TODO_REQUEST_FAILURE,
    payload: error,
  };
};

export const todoCreate = (todo: ITodo) => {
  return {
    type: TODO_CREATE,
    payload: todo,
  };
};

export const todoDelete = (id: number) => {
  return {
    type: TODO_DELETE,
    payload: id,
  };
};