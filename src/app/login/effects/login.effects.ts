import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginService } from '../services/login.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { login, loginSuccess, loginFailure } from '../actions/login.actions';
import { of } from 'rxjs';

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
              console.log('service: credenciales correctas');
              this.router.navigate(['/']);
              return loginSuccess({ userLogged: user });
            } else {
              // error credenciales incorrectas
              console.log('service: credenciales incorrectas');
            }
          }),
          catchError(err => of(loginFailure({ error: err })))
        )
      )
    )
  );
}
