import { createAction, props } from '@ngrx/store';
import { Profile } from '../models/profile.model';
import { Education } from '../models/user.model';

export const updateProfile = createAction(
  '[PROFILE] Update profile',
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
