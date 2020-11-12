import { Component, OnInit } from '@angular/core';
import { User, Education, Languages } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../Services/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  educations: Education[];
  _languages: Languages[];
  users: User[];
  user: User;
  education: Education;
  company: boolean;
  languages: Languages;

  constructor(private _global: GlobalService, private router: Router, private userService: UserService) {
    this.user = this._global.globalVar;
   }

  ngOnInit(): void {
    this.getUsers();
    if (this.user !== undefined) {
      this.getEducations();
      this.getLanguages();
      this.getProfile();
    }
  }

  getProfile() {
    if (this.user.type === 'Company') {
      return this.company = true;
    } else {
      return this.company = false;
    }
  }

  getUsers(): void{
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  getEducations(): void{
    this.educations = this.user.education;
  }

  getLanguages(): void{
    this._languages = this.user.languages;
  }

  updateProfile() {
    this.router.navigateByUrl('/updateProfile');
  }

  updateEducation(education) {
    this._global.globalEducation = education;
    this.router.navigateByUrl('/updateEducation');
  }

  deleteEducation(education){
    const array = this.user.education;

    for (let i = 0; i < array.length; i++) {
      if ((array[i].name === education.name) && (array[i].level === education.level)) {
        array.splice(i, 1);
      }
    }
  }

  addEducation() {
    this.router.navigateByUrl('/addEducation');
  }

  updateLanguage(_language) {
    this._global.globalLanguage = _language;
    this.router.navigateByUrl('/updateLanguage');
  }

  deleteLanguage(_language){
    const array = this.user.languages;

    for (let i = 0; i < array.length; i++) {
      if ((array[i].language === _language.language) && (array[i].level === _language.level)) {
        array.splice(i, 1);
      }
    }
  }

  addLanguage() {
    this.router.navigateByUrl('/addLanguage');
   }

}
