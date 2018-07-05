import { AxiosResponse, AxiosError } from 'axios';
import * as api from '../api/user';
import { IUserState } from '../models/user';

const USER_LOGIN_START = 'USER_LOGIN_START';
const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

const USER_REGISTER_START = 'USER_REGISTER_START';
const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

const INITIAL_STATE: IUserState = {
  user: {
    login: '',
    password: '',
  },
  error: null,
  isRequesting: false,
  isRequested: false,
};

const UserReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN_START:
      return {
        ...state,
        isRequesting: true,
        isRequested: false,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        list: payload,
        error: null,
        isRequesting: false,
        isRequested: true,
      };

    case USER_LOGIN_FAILURE:
      return {
        ...state,
        error: payload,
        isRequesting: false,
        isRequested: false,
      };

    case USER_REGISTER_START:
      return {
        ...state,
        isRequesting: true,
        isRequested: false,
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        list: payload,
        error: null,
        isRequesting: false,
        isRequested: true,
      };

    case USER_REGISTER_FAILURE:
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

export default UserReducer;

export const login = form => {
  return (dispatch: any): any => {
    dispatch({
      type: USER_LOGIN_START,
      payload: {},
    });
    
    return api
      .login(form)
      .then((response: AxiosResponse) =>
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: response.data,
        }),
      )
      .catch((error: AxiosError) =>
        dispatch({
          type: USER_LOGIN_FAILURE,
          payload: error,
        }),
      );
  };
};

export const register = form => {
  return (dispatch: any): any => {
    dispatch({
      type: USER_REGISTER_START,
      payload: {},
    });

    return api
      .register(form)
      .then((response: AxiosResponse) =>
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: response.data,
        }),
      )
      .catch((error: AxiosError) =>
        dispatch({
          type: USER_REGISTER_FAILURE,
          payload: error,
        }),
      );
  };
};
