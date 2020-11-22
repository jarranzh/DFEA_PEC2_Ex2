import { User } from 'src/app/profile/models/user.model';
import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginSuccess,
  loginFailure,
  logout
} from '../actions/login.actions';
import { register } from '../actions/register.actions';
import {
  updateProfile,
  updateEducation,
  addEducation,
  deleteEducation
} from 'src/app/profile/actions/profile.actions';

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
  })),

  on(updateProfile, (state, { profile }) => ({
    ...state,
    loading: false,
    loaded: true,
    userLogged: {
      ...state.userLogged,
      ...profile
    }
  })),

  on(updateEducation, (state, { education }) => ({
    ...state,
    loading: false,
    loaded: true,
    userLogged: {
      ...state.userLogged,
      education: [
        // Hago la actualización de educación según la solución de Tània Garcia, que es de la que parto.
        // En mi solución de la PEC1 puse un id a cada Education para identificarla y edita cualquier campo.
        // En este caso no podrímos modificar ni nombre ni nivel.
        ...state.userLogged.education.map(edu => {
          if (edu.name === education.name && edu.level === education.level) {
            return { ...education };
          } else {
            return { ...edu };
          }
        })
      ]
    }
  })),

  on(addEducation, (state, { education }) => ({
    ...state,
    loading: false,
    loaded: true,
    userLogged: {
      ...state.userLogged,
      education: [...state.userLogged.education, education]
    }
  })),

  on(deleteEducation, (state, { education }) => ({
    ...state,
    loading: false,
    loaded: true,
    userLogged: {
      ...state.userLogged,
      education: [
        ...state.userLogged.education.map(edu => {
          if (edu.name === education.name && edu.level === education.level) {
            //fix this return
            return null;
          } else {
            return { ...edu };
          }
        })
      ]
    }
  }))
);

export function loginReducer(state, action) {
  return _loginReducer(state, action);
}
