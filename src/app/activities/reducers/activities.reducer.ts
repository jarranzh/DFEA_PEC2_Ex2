import { createReducer, on } from '@ngrx/store';
import { Activity } from '../models/activity.model';
import {
  getActivities,
  getActivitiesSuccess,
  getActivitiesFailure,
  updateActivity,
  cleanActivities
} from '../actions/activities.actions';

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

  on(cleanActivities, state => ({
    ...state,
    activities: initialState.activities,
    loading: false,
    loaded: true
  }))
);

export function activitiesReducer(state, action) {
  return _activitiesReducer(state, action);
}
