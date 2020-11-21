import { createReducer, on } from '@ngrx/store';
import { Activity } from '../models/activity.model';
import {
  getActivities,
  getActivitiesSuccess,
  getActivitiesFailure
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
    loading: false,
    loaded: true,
    activities
  })),

  on(getActivitiesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error
  }))
);

export function activitiesReducer(state, action) {
  return _activitiesReducer(state, action);
}
