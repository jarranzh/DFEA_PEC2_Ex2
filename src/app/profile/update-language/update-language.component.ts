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
import { updateLanguage } from '../actions/profile.actions';
import { Language, User } from '../models/user.model';

@Component({
  selector: 'app-update-language',
  templateUrl: './update-language.component.html',
  styleUrls: ['./update-language.component.css']
})
export class UpdateLanguageComponent implements OnInit {
  users: User[];

  public user: User;
  public _language: Language;

  public level: FormControl;
  public language: FormControl;
  public finishDate: FormControl;
  public languageForm: FormGroup;
  private date = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _global: GlobalService,
    private store: Store<AppState>
  ) {
    this._language = this._global.globalLanguage;
  }

  ngOnInit(): void {
    this.level = new FormControl(this._language.level, Validators.required);
    this.language = new FormControl(
      this._language.language,
      Validators.required
    );
    this.finishDate = new FormControl(
      this._language.finishDate,
      Validators.pattern(this.date)
    );

    this.languageForm = this.formBuilder.group({
      level: this.level,
      language: this.language,
      finishDate: this.finishDate
    });
    // this.getUsers();
  }

  // getUsers(): void {
  //   this.userService.getUsers().subscribe(users => (this.users = users));
  // }

  updateLanguage() {
    const form = this.languageForm.value as Language;
    //TODO: modify updateLanguage({selectedLanguage, newLanguage}),
    this.store.dispatch(
      updateLanguage({
        selectedLanguage: this._language,
        newLanguage: { ...form }
      })
    );

    // const array = this.user.languages;

    // for (let i = 0; i < array.length; i++) {
    //   if (
    //     array[i].language === this._language.language &&
    //     array[i].level === this._language.level
    //   ) {
    //     array.splice(i, 1);
    //   }
    // }
    // this.user.languages = [...this.user.languages, form];

    this.router.navigateByUrl('/profile');
  }
}
