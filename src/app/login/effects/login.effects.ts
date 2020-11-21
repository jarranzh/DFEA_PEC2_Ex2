import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { login, loginFailure, loginSuccess } from '../actions/login.actions';
import { LoginService } from '../services/login.service';
import { register } from '../actions/register.actions';
import { RegisterService } from '../services/register.service';
import { User } from 'src/app/profile/models/user.model';

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

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap(action =>
        this.registerService
          .checkRegister(
            action.name,
            action.surname,
            action.userType,
            action.email,
            action.password,
            action.repeatPassword
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
                    name: action.name,
                    surname: action.surname,
                    type: action.userType,
                    email: action.email,
                    password: action.password,
                    repeatPassword: action.repeatPassword
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
