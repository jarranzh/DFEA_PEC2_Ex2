import { createAction, props } from '@ngrx/store';
import { Activity } from '../models/activity.model';

export const getActivities = createAction('[ACTIVITIES] Get Activities');

export const getActivitiesSuccess = createAction(
  '[ACTIVITIES] Get Activities Success',
  props<{ activities: Activity[] }>()
);

export const getActivitiesFailure = createAction(
  '[ACTIVITIES] Get Activities Failure',
  props<{ error: any }>()
);

export const getMyActivities = createAction(
  '[MY-ACTIVITIES] Get My Activities'
);
