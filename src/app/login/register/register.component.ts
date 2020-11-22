import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { CheckWord } from 'src/app/Directives/check-word.validator';
import { checkEquality } from 'src/app/Directives/check-equality.validator';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducer';
import { register } from '../actions/register.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users: User[];

  public user: User = new User();

  public name: FormControl;
  public surname: FormControl;
  public type: FormControl;
  public email: FormControl;
  public password: FormControl;
  public repeatPassword: FormControl;
  public registerForm: FormGroup;
  public message: string;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
      Validators.pattern('^[a-zA-Z0-9]*$')
    ]);
    this.surname = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(55),
      Validators.pattern('^[a-zA-Z0-9]*$')
    ]);
    this.type = new FormControl('', [
      Validators.required,
      CheckWord.checkInvalidWord(/ /)
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$')
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.repeatPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);

    this.registerForm = this.formBuilder.group(
      {
        name: this.name,
        surname: this.surname,
        type: this.type,
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword
      },
      {
        validators: checkEquality
      }
    );
  }

  checkRegister() {
    this.store.dispatch(
      register({
        register: {
          name: this.name.value,
          surname: this.surname.value,
          userType: this.type.value,
          email: this.email.value,
          password: this.password.value,
          repeatPassword: this.repeatPassword.value
        }
      })
    );
  }

  validatorEquality(): boolean {
    return (
      this.registerForm.hasError('equals') &&
      this.registerForm.get('password').dirty &&
      this.registerForm.get('repeatPassword').dirty
    );
  }
}
