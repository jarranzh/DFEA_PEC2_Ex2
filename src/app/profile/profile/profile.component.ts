import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { GlobalService } from '../../Services/global.service';
import { deleteEducation, deleteLanguage } from '../actions/profile.actions';
import { Profile } from '../models/profile.model';
import { Education, Language } from '../models/user.model';

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
  company: boolean;

  constructor(
    private _global: GlobalService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store
      .select('login')
      .subscribe(response => (this.login = response.userLogged));

    this.store
      .select('user')
      .subscribe(response => (this.user = response.userProfile));
  }

  ngOnInit(): void {
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
  }

  getLanguages(): void {
    this.store
      .select('user')
      .subscribe(loginResponse => (this.languages = loginResponse.languages));
  }

  updateProfile() {
    this.router.navigateByUrl('/updateProfile');
  }

  updateEducation(education) {
    this._global.globalEducation = education;
    this.router.navigateByUrl('/updateEducation');
  }

  deleteEducation(education) {
    const confirmDelete = confirm('¿Quieres eliminar esta educación?');
    if (confirmDelete) {
      this.store.dispatch(deleteEducation({ education }));
    } else return;
  }

  addEducation() {
    this.router.navigateByUrl('/addEducation');
  }

  updateLanguage(language) {
    this._global.globalLanguage = language;
    this.router.navigateByUrl('/updateLanguage');
  }

  deleteLanguage(language) {
    const confirmDelete = confirm('¿Quieres eliminar ese idioma?');
    if (confirmDelete) {
      this.store.dispatch(deleteLanguage({ language }));
    } else return;
  }

  addLanguage() {
    this.router.navigateByUrl('/addLanguage');
  }
}
