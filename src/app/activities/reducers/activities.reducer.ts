import { createReducer, on } from '@ngrx/store';
import {
  addActivity,
  cleanActivities,
  deleteActivity,
  getActivities,
  getActivitiesFailure,
  getActivitiesSuccess,
  updateActivity,
  subscribeActivity,
  unsubscribeActivity
} from '../actions/activities.actions';
import { Activity } from '../models/activity.model';

export interface ActivitiesState {
  activities: Activity[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: ActivitiesState = {
  activities: null,
  loading: false,
  loaded: false,
  error: null
};

const _activitiesReducer = createReducer(
  initialState,
  on(getActivities, state => ({ ...state, loading: true, loaded: false })),

  on(getActivitiesSuccess, (state, { activities }) => ({
    ...state,
    activities,
    loading: false,
    loaded: true
  })),

  on(getActivitiesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error
  })),

  on(updateActivity, (state, { activityId, activity }) => ({
    ...state,
    activities: [
      ...state.activities.map(act => {
        if (act.id === activityId) {
          return { ...activity };
        } else {
          return { ...act };
        }
      })
    ],
    loading: false,
    loaded: true
  })),

  on(deleteActivity, (state, { activityId }) => ({
    ...state,
    activities: [...state.activities.filter(act => act.id !== activityId)]
  })),

  on(addActivity, (state, { activity }) => ({
    ...state,
    activities: [...state.activities, activity]
  })),

  on(cleanActivities, state => ({
    ...state,
    activities: initialState.activities,
    loading: false,
    loaded: true
  })),

  on(subscribeActivity, (state, { activity }) => ({
    ...state,
    activities: [
      ...state.activities.map(act => {
        if (act.id === activity.id) {
          return {
            ...activity,
            peopleRegistered: activity.peopleRegistered + 1,
            state:
              activity.peopleRegistered + 1 === activity.limitCapacity
                ? 'Complete'
                : 'Places available'
          };
        } else {
          return { ...act };
        }
      })
    ],
    loading: false,
    loaded: true
  })),

  on(unsubscribeActivity, (state, { activity }) => ({
    ...state,
    activities: [
      ...state.activities.map(act => {
        if (act.id === activity.id) {
          return {
            ...activity,
            peopleRegistered: activity.peopleRegistered - 1,
            state: 'Places available'
          };
        } else {
          return { ...act };
        }
      })
    ],
    loading: false,
    loaded: true
  }))
);

export function activitiesReducer(state, action) {
  return _activitiesReducer(state, action);
}
