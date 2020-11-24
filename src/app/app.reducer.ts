import { ActionReducerMap } from '@ngrx/store';
import * as ActivitiesReducer from './activities/reducers';
import * as LoginReducer from './login/reducers';
import * as ProfileReducer from './profile/reducers';

export interface AppState {
  login: LoginReducer.LoginState;
  user: ProfileReducer.ProfileState;
  activities: ActivitiesReducer.ActivitiesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  login: LoginReducer.loginReducer,
  user: ProfileReducer.profileReducer,
  activities: ActivitiesReducer.activitiesReducer
};
