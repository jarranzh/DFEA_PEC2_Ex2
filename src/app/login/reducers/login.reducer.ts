import { User } from 'src/app/profile/models/user.model';
import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginSuccess,
  loginFailure,
  logout
} from '../actions/login.actions';
import { register } from '../actions/register.actions';

export interface LoginState {
  userLogged: User;
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

  on(loginSuccess, (state, { userLogged }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: initialState.error,
    userLogged
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
