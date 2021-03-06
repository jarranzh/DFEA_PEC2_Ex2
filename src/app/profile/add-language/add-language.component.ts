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
import { UserService } from 'src/app/Services/user.service';
import { addLanguage } from '../actions/profile.actions';
import { Language, User } from '../models/user.model';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.css']
})
export class AddLanguageComponent implements OnInit {
  users: User[];

  public user: User;
  public _language: Language;

  public level: FormControl;
  public language: FormControl;
  public finishDate: FormControl;
  public addLanguageForm: FormGroup;
  private date = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private _global: GlobalService,
    private store: Store<AppState>
  ) {
    // this.user = this._global.globalVar;
    this._language = this._global.globalLanguage;
  }

  ngOnInit(): void {
    this.level = new FormControl('', Validators.required);
    this.language = new FormControl('', Validators.required);
    this.finishDate = new FormControl('', Validators.pattern(this.date));

    this.addLanguageForm = this.formBuilder.group({
      level: this.level,
      language: this.language,
      finishDate: this.finishDate
    });
    // this.getUsers();
  }

  // getUsers(): void {
  //   this.userService.getUsers().subscribe(users => (this.users = users));
  // }

  addLanguage() {
    const form = this.addLanguageForm.value as Language;
    this.store.dispatch(addLanguage({ language: form }));
    this.router.navigateByUrl('/profile');

    // if (this.user.languages !== undefined) {
    //   this.user.languages = [...this.user.languages, form];

    //   this.router.navigateByUrl('/profile');
    // } else {
    //   this.user.languages = [form];

    // }
  }
}
