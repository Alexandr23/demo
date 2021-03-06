import { AxiosResponse, AxiosError } from 'axios';
import * as api from '../../api/todo';
import { ITodo, ITodoState } from '../../models/todo';
import { removeTodo } from '../../helpers/todoHelper';

const TODO_REQUEST_START = 'TODO_REQUEST_START';
const TODO_REQUEST_SUCCESS = 'TODO_REQUEST_SUCCESS';
const TODO_REQUEST_FAILURE = 'TODO_REQUEST_FAILURE';

const TODO_CREATE_REQUEST = 'TODO_CREATE_REQUEST';
const TODO_CREATE_SUCCESS = 'TODO_CREATE_SUCCESS';
const TODO_CREATE_FAILURE = 'TODO_CREATE_FAILURE';

const TODO_DELETE_REQUEST = 'TODO_DELETE_REQUEST';
const TODO_DELETE_SUCCESS = 'TODO_DELETE_SUCCESS';
const TODO_DELETE_FAILURE = 'TODO_DELETE_FAILURE';

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

    case TODO_CREATE_REQUEST:
      return {
        ...state,
        isRequesting: true,
        isRequested: false,
      };

    case TODO_CREATE_SUCCESS:
      return {
        ...state,
        list: [payload, ...state.list],
        error: null,
        isRequesting: false,
        isRequested: true,
      };

    case TODO_CREATE_FAILURE:
      return {
        ...state,
        error: payload,
        isRequesting: false,
        isRequested: false,
      };

    case TODO_DELETE_REQUEST:
      return {
        ...state,
        isRequesting: true,
        isRequested: false,
      };

    case TODO_DELETE_SUCCESS:
      return {
        ...state,
        list: removeTodo(state.list, payload),
        error: null,
        isRequesting: false,
        isRequested: true,
      };

    case TODO_DELETE_FAILURE:
      return {
        ...state,
        error: payload,
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
  return (dispatch: any): any => {
    dispatch(todoCreateRequest(todo));
    return api.createTodo(todo)
      .then((response: AxiosResponse) => dispatch(todoCreateSuccess(response)))
      .catch((error: AxiosError) => dispatch(todoCreateFailure(error)));
  };
}

export const todoCreateRequest = (todo: ITodo) => {
  return {
    type: TODO_CREATE_REQUEST,
    payload: todo,
  };
};

export const todoCreateSuccess = (payload: AxiosResponse) => {
  return {
    type: TODO_CREATE_SUCCESS,
    payload: payload.data,
  };
};

export const todoCreateFailure = (error: AxiosError) => {
  return {
    type: TODO_CREATE_FAILURE,
    payload: error,
  };
};

export const todoDelete = (id: number) => {
  return (dispatch: any): any => {
    dispatch(todoDeleteRequest());
    return api.deleteTodo(id)
      .then((response: AxiosResponse) => dispatch(todoDeleteSuccess(response)))
      .catch((error: AxiosError) => dispatch(todoDeleteFailure(error)));
  };
}

export const todoDeleteRequest = () => {
  return {
    type: TODO_DELETE_REQUEST,
    payload: {},
  };
};

export const todoDeleteSuccess = (payload: AxiosResponse) => {
  return {
    type: TODO_DELETE_SUCCESS,
    payload: payload.data.id,
  };
};

export const todoDeleteFailure = (error: AxiosError) => {
  return {
    type: TODO_DELETE_FAILURE,
    payload: error,
  };
};