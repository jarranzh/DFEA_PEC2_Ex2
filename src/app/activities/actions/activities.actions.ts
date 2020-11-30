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

export const updateActivity = createAction(
  '[ACTIVITIES] Update Activity',
  props<{ activityId: number; activity: Activity }>()
);

export const deleteActivity = createAction(
  '[ACTIVITIES] Delete Activity',
  props<{ activityId: number }>()
);

export const addActivity = createAction(
  '[ACTIVITIES] Add Activity',
  props<{ activity: Activity }>()
);

export const subscribeActivity = createAction(
  '[ACTIVITIES] SUBSCRIPTION: Calculate Capacity of Activity',
  props<{ activity: Activity }>()
);

export const unsubscribeActivity = createAction(
  '[ACTIVITIES] UNSUBSCRIPTION: Calculate Capacity of Activity',
  props<{ activity: Activity }>()
);

export const cleanActivities = createAction('[ACTIVITIES] Clean Activities');
