import { createAction, props } from '@ngrx/store';
import { Activity } from 'src/app/activities/models/activity.model';
import { Profile } from '../models/profile.model';
import { Education, Language, User } from '../models/user.model';

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
  props<{ selectedEducation: Education; newEducation: Education }>()
);

export const addEducation = createAction(
  '[EDUCATION] Add Education',
  props<{ education: Education }>()
);

export const deleteEducation = createAction(
  '[EDUCATION] Delete Education',
  props<{ education: Education }>()
);

export const updateLanguage = createAction(
  '[LANGUAGE] Update Language',
  props<{ selectedLanguage: Language; newLanguage: Language }>()
);

export const addLanguage = createAction(
  '[LANGUAGE] Add Language',
  props<{ language: Language }>()
);

export const deleteLanguage = createAction(
  '[LANGUAGE] Delete Language',
  props<{ language: Language }>()
);

export const updateUserActivities = createAction(
  '[PROFILE] Update User Activities',
  props<{ activities: Activity[] }>()
);
