import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { login, loginFailure, loginSuccess } from '../actions/login.actions';
import { LoginService } from '../services/login.service';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(action =>
        this.loginService.checkLogin(action.email, action.password).pipe(
          map(user => {
            if (user) {
              console.log(user);
              console.log('service: credenciales correctas');
              this.router.navigate(['activityList']);
              return loginSuccess({ userLogged: user });
            } else {
              // error credenciales incorrectas
              return loginFailure({ error: 'CREDENCIALES INCORRECTAS' });
            }
          }),
          catchError(err => of(loginFailure({ error: err })))
        )
      )
    )
  );
}
