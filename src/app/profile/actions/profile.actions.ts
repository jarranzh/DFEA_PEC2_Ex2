import { createAction, props } from '@ngrx/store';
import { Profile } from '../models/profile.model';
import { Education, User } from '../models/user.model';

export const getProfile = createAction(
  '[PROFILE] Get Profile',
  props<{ email: string }>()
);

export const getProfileSuccess = createAction(
  '[PROFILE] Get Profile Success',
  props<{ userProfile: User }>()
);

export const getProfileFailure = createAction(
  '[PROFILE] Get Profile Failure',
  props<{ error: any }>()
);

export const updateProfile = createAction(
  '[PROFILE] Update Profile',
  props<{ profile: Profile }>()
);

export const updateEducation = createAction(
  '[EDUCATION] Update Education',
  props<{ education: Education }>()
);

export const addEducation = createAction(
  '[EDUCATION] Add Education',
  props<{ education: Education }>()
);

export const deleteEducation = createAction(
  '[EDUCATION] Delete Education',
  props<{ education: Education }>()
);
