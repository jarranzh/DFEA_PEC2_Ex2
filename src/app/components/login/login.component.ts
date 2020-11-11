import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../Services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: User[];
  public user: User = new User();

  public email: FormControl;
  public password: FormControl;
  public loginForm: FormGroup;
  private validate_email = '^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$';
  public message: string;

  constructor(private formBuilder: FormBuilder, private _globalService: GlobalService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.email = new FormControl('', [Validators.required, Validators.pattern(this.validate_email)]);
    this.password = new FormControl('', [Validators.required]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password

    });
    this.getUsers();
  }

  getUsers(): void{
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  public checkLogin() {

    this.user.email =  this.email.value;
    this.user.password = this.password.value;
    const obj = this.users.find(obj => obj.email === this.user.email);

    if (obj == null) {
      this.message = 'El correu ' + this.user.email + ' no existeix a la base de dades';
    } else {

      if (obj.password === this.user.password) {
        console.log('Welcome ' + obj.name);
        this._globalService.globalVar = obj;

        if (obj.type === 'Tourist') {
          document.getElementById('logout').style.display = 'inline';
          document.getElementById('home').style.display = 'inline';
          document.getElementById('favorites').style.display = 'inline';
          document.getElementById('myActivities').style.display = 'inline';
          document.getElementById('profile').style.display = 'inline';
          document.getElementById('login').style.display = 'none';
          document.getElementById('register').style.display = 'none';
        }
        else if (obj.type === 'Company') {
          document.getElementById('logout').style.display = 'inline';
          document.getElementById('login').style.display = 'none';
          document.getElementById('register').style.display = 'none';
          document.getElementById('home').style.display = 'inline';
          document.getElementById('profile').style.display = 'inline';
          document.getElementById('admin').style.display = 'inline';
        }
        this.router.navigate(['activityList']);
      } else {
        this.message = 'El password no és correcte';
      }
    }
  }


}