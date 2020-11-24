import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Services/global.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { User, Education } from '../models/user.model';
import { updateEducation } from '../actions/profile.actions';

@Component({
  selector: 'app-update-education',
  templateUrl: './update-education.component.html',
  styleUrls: ['./update-education.component.css']
})
export class UpdateEducationComponent implements OnInit {
  users: User[];
  login;
  public user: User;
  public _education: Education;

  public type: FormControl;
  public level: FormControl;
  public name: FormControl;
  public university: FormControl;
  public finishDate: FormControl;
  public educationForm: FormGroup;
  private date = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _global: GlobalService,
    private store: Store<AppState>
  ) {
    this._education = this._global.globalEducation;
  }

  ngOnInit(): void {
    this.type = new FormControl(this._education.type, Validators.required);
    this.level = new FormControl(this._education.level, Validators.required);
    this.name = new FormControl(this._education.name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55)
    ]);
    this.university = new FormControl(this._education.university, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55)
    ]);
    this.finishDate = new FormControl(
      this._education.finishDate,
      Validators.pattern(this.date)
    );

    this.educationForm = this.formBuilder.group({
      type: this.type,
      level: this.level,
      name: this.name,
      university: this.university,
      finishDate: this.finishDate
    });

    this.store
      .select('login')
      .subscribe(loginResponse => (this.login = loginResponse.userLogged));
    console.log(this.user);
  }

  updateEducation() {
    const form = this.educationForm.value as Education;
    this.store.dispatch(updateEducation({ education: { ...form } }));
    this.router.navigateByUrl('/profile');
  }

  changeType(e) {
    this.educationForm.get('level').setValue(undefined);
  }
}
