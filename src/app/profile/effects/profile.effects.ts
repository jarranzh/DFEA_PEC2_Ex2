import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  getProfile,
  getProfileFailure,
  getProfileSuccess
} from '../actions/profile.actions';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}

  profile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProfile),
      mergeMap(action =>
        this.profileService.getProfile(action.email).pipe(
          map(user => {
            if (user) {
              return getProfileSuccess({ userProfile: user });
            } else {
              return getProfileFailure({ error: 'NO USER WITH THIS EMAIL' });
            }
          }),
          catchError(err => of(getProfileFailure({ error: err })))
        )
      )
    )
  );
}
