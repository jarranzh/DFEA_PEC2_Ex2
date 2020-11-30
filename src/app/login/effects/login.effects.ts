import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { login, loginFailure, loginSuccess } from '../actions/login.actions';
import { register } from '../actions/register.actions';
import { LoginService } from '../services/login.service';
import { RegisterService } from '../services/register.service';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private registerService: RegisterService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(action =>
        this.loginService.checkLogin(action.email, action.password).pipe(
          map(user => {
            if (user) {
              this.router.navigate(['activityList']);
              return loginSuccess({
                email: user.email,
                password: user.password,
                userType: user.type
              });
            } else {
              return loginFailure({ error: 'CREDENCIALES INCORRECTAS' });
            }
          }),
          catchError(err => of(loginFailure({ error: err })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap(action =>
        this.registerService.checkRegister(action.user).pipe(
          map(user => {
            if (user) {
              return loginFailure({ error: 'ESTE EMAIL YA EXISTE EN LA BD' });
            } else {
              this.registerService.addUser(action.user);
              this.router.navigate(['activityList']);
              return loginSuccess({
                email: action.user.email,
                password: action.user.password,
                userType: action.user.type
              });
            }
          }),
          catchError(err => of(loginFailure({ error: err })))
        )
      )
    )
  );
}
