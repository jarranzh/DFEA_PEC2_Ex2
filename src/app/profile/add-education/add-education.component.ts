import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { GlobalService } from 'src/app/Services/global.service';
import { addEducation } from '../actions/profile.actions';
import { Profile } from '../models/profile.model';
import { Education, User } from '../models/user.model';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit {
  login;
  public user: Profile;
  public _education: Education;

  public type: FormControl;
  public level: FormControl;
  public name: FormControl;
  public university: FormControl;
  public finishDate: FormControl;
  public addEducationForm: FormGroup;
  private date = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _global: GlobalService,
    private store: Store<AppState>
  ) {
    this.store
      .select('user')
      .subscribe(response => (this.user = response.userProfile));
    this._education = this._global.globalEducation;
  }

  ngOnInit(): void {
    this.type = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55)
    ]);
    this.university = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55)
    ]);
    this.finishDate = new FormControl('', Validators.pattern(this.date));

    this.addEducationForm = this.formBuilder.group({
      type: this.type,
      level: this.level,
      name: this.name,
      university: this.university,
      finishDate: this.finishDate
    });

    this.store
      .select('login')
      .subscribe(loginResponse => (this.login = loginResponse.userLogged));
  }

  addEducation() {
    const form = this.addEducationForm.value as Education;
    this.store.dispatch(addEducation({ education: form }));
    this.router.navigateByUrl('/profile');
  }
}
