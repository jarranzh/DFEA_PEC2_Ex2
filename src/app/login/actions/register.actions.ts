import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/profile/models/user.model';

export const register = createAction(
  '[REGISTER] Register',
  props<{
    name: User['name'];
    surname: User['surname'];
    userType: User['type'];
    email: User['email'];
    password: User['password'];
    repeatPassword: User['repeatPassword'];
  }>()
);

// export const registerSuccess = createAction(
//   '[REGISTER] Register success',
//   props<{ userLogged: User }>()
// );

// export const registerFailure = createAction(
//   '[REGISTER] Register failure',
//   props<{ error: any }>()
// );
