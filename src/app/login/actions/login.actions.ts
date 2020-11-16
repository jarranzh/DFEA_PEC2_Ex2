import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/profile/models/user.model';
import { Login } from '../models/login.model';

export const login = createAction(
  '[LOGIN] Login',
  props<{ credentials: Login }>()
);

export const loginSuccess = createAction(
  '[LOGIN] Login success',
  props<{ userLogged: User }>()
);

export const loginFailure = createAction(
  '[LOGIN] Login failure',
  props<{ error: any }>()
);
