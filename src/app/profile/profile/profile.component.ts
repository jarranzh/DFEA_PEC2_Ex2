import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { GlobalService } from '../../Services/global.service';
import { deleteEducation, deleteLanguage } from '../actions/profile.actions';
import { Profile } from '../models/profile.model';
import { Education, Language, User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  login;
  educations: Education[];
  languages: Language[];
  user: Profile;
  // education: Education;
  company: boolean;

  constructor(
    private _global: GlobalService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store
      .select('login')
      .subscribe(loginResponse => (this.login = loginResponse.userLogged));

    this.store
      .select('user')
      .subscribe(loginResponse => (this.user = loginResponse.userProfile));
  }

  ngOnInit(): void {
    console.log(this.login);
    if (this.login) {
      this.getEducations();
      this.getLanguages();
      this.getProfile();
    } else {
      this.router.navigate(['/home']);
    }
  }

  getProfile() {
    if (this.login.type === 'Company') {
      return (this.company = true);
    } else {
      return (this.company = false);
    }
  }

  getEducations(): void {
    this.store
      .select('user')
      .subscribe(loginResponse => (this.educations = loginResponse.education));

    console.log(this.educations);
  }

  getLanguages(): void {
    this.store
      .select('user')
      .subscribe(loginResponse => (this.languages = loginResponse.languages));
    console.log(this.languages);
  }

  updateProfile() {
    this.router.navigateByUrl('/updateProfile');
  }

  updateEducation(education) {
    this._global.globalEducation = education;
    this.router.navigateByUrl('/updateEducation');
  }

  deleteEducation(education) {
    this.store.dispatch(deleteEducation({ education }));
  }

  addEducation() {
    this.router.navigateByUrl('/addEducation');
  }

  updateLanguage(language) {
    this._global.globalLanguage = language;
    this.router.navigateByUrl('/updateLanguage');
  }

  deleteLanguage(language) {
    this.store.dispatch(deleteLanguage({ language }));
  }

  addLanguage() {
    this.router.navigateByUrl('/addLanguage');
  }
}
