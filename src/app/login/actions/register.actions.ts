import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/profile/models/user.model';
import { Registration } from '../models/register.model';

export const register = createAction(
  '[REGISTER] Register',
  props<{ user: User }>()
);

//export const

// export const registerSuccess = createAction(
//   '[REGISTER] Register success',
//   props<{ userLogged: User }>()
// );

// export const registerFailure = createAction(
//   '[REGISTER] Register failure',
//   props<{ error: any }>()
// );
