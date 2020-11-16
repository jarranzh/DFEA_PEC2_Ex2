import { User } from './profile/models/user.model';
import * as LoginReducer from './login/reducers';
import * as ActivitiesReducer from './activities/reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  userLogged: LoginReducer.LoginState;
  activities: ActivitiesReducer.ActivitiesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  userLogged: LoginReducer.loginReducer,
  activities: ActivitiesReducer.activitiesReducer
};
