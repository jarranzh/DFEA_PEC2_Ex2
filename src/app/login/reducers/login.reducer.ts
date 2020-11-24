import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginFailure,
  loginSuccess,
  logout
} from '../actions/login.actions';
import { register } from '../actions/register.actions';

export interface LoginState {
  userLogged: { email: string; password: string; userType: string };
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: LoginState = {
  userLogged: null,
  loading: false,
  loaded: false,
  error: null
};

const _loginReducer = createReducer(
  initialState,
  on(login, state => ({
    ...state,
    loading: true,
    loaded: false
  })),

  on(loginSuccess, (state, { email, password, userType }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: initialState.error,
    userLogged: {
      email,
      password,
      userType
    }
  })),

  on(loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error
  })),

  on(register, state => ({
    ...state,
    loading: true,
    loaded: false
  })),

  on(logout, state => ({
    ...state,
    loading: false,
    loaded: true,
    userLogged: initialState.userLogged
  }))
);

export function loginReducer(state, action) {
  return _loginReducer(state, action);
}
