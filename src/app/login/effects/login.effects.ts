import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { login, loginFailure, loginSuccess } from '../actions/login.actions';
import { LoginService } from '../services/login.service';
import { register } from '../actions/register.actions';
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
              return loginSuccess({ userLogged: user });
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
        this.registerService
          .checkRegister(
            action.register
          )
          .pipe(
            map(user => {
              if (user) {
                return loginFailure({ error: 'ESTE EMAIL YA EXISTE EN LA BD' });
              } else {
                this.router.navigate(['activityList']);
                return loginSuccess({
                  userLogged: {
                    id: new Date().getTime(),
                    name: action.register.name,
                    surname: action.register.surname,
                    type: action.register.userType,
                    email: action.register.email,
                    password: action.register.password,
                    repeatPassword: action.register.repeatPassword
                  }
                });
              }
            }),
            catchError(err => of(loginFailure({ error: err })))
          )
      )
    )
  );
}
