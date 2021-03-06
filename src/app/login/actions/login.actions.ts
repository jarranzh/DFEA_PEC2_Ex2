import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/profile/models/user.model';

export const login = createAction(
  '[LOGIN] Login',
  props<{ email: User['email']; password: User['password'] }>()
);

export const loginSuccess = createAction(
  '[LOGIN] Login Success',
  props<{ email: string; password: string; userType: string }>()
);

export const loginFailure = createAction(
  '[LOGIN] Login Failure',
  props<{ error: any }>()
);

export const logout = createAction('[LOGOUT] Logout');
