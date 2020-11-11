import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckWord } from 'src/app/Directives/check-word.validator';
import { checkEquality } from 'src/app/Directives/check-equality.validator';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

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
  public repeat_password: FormControl;
  public registerForm: FormGroup;
  public message: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    this.name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^[a-zA-Z0-9]*$')]);
    this.surname = new FormControl('', [Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^[a-zA-Z0-9]*$')]);
    this.type = new FormControl('', [Validators.required, CheckWord.checkInvalidWord(/ /)]);
    this.email = new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$')]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.repeat_password = new FormControl('', [Validators.required, Validators.minLength(8)]);

    this.registerForm = this.formBuilder.group({
      name: this.name,
      surname: this.surname,
      type: this.type,
      email: this.email,
      password: this.password,
      repeat_password: this.repeat_password
    }, {
      validators: checkEquality
    }
    );
    this.getUsers();

  }

  getUsers(): void{
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  checkRegister() {

    this.user.email = this.email.value;
    const obj = this.users.find(obj => obj.email === this.user.email);

    if (obj == null) {

      this.userService.addUser(this.registerForm.value as User)
        .subscribe(user => {
          this.users.push(user);
          console.log('Successfully registered');
          this.router.navigate(['login']);
        });
    } else {
      this.message = 'El correu electrònic ja està registrat al sistema';
    }
  }

  validatorEquality(): boolean{
    return this.registerForm.hasError('equals') && this.registerForm.get('password').dirty
      && this.registerForm.get('repeat_password').dirty;
  }

}