import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginService } from '../services/login.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { login, loginSuccess, loginFailure } from '../actions/login.actions';
import { of } from 'rxjs';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private loginService: LoginService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(action =>
        this.loginService.checkLogin(action.credentials).pipe(
          map(user => loginSuccess({ userLogged: user })),
          catchError(err => of(loginFailure({ error: err })))
        )
      )
    )
  );
}
