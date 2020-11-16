import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivityService } from '../services/activity.service';
import {
  getActivities,
  getActivitiesSuccess,
  getActivitiesFailure
} from '../actions/activities.actions';

@Injectable()
export class ActivitiesEffects {
  constructor(
    private actions$: Actions,
    private activitiesService: ActivityService
  ) {}

  activities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActivities),
      mergeMap(() =>
        this.activitiesService.getActivities().pipe(
          map(activities => getActivitiesSuccess({ activities })),
          catchError(err => of(getActivitiesFailure({ error: err })))
        )
      )
    )
  );
}
