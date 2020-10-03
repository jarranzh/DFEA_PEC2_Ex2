import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, Education } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Services/global.service';

@Component({
  selector: 'app-update-education',
  templateUrl: './update-education.component.html',
  styleUrls: ['./update-education.component.css']
})
export class UpdateEducationComponent implements OnInit {

  users: User[];

  public user: User;
  public _education: Education;

  public type: FormControl;
  public level: FormControl;
  public name: FormControl;
  public university: FormControl;
  public finishDate: FormControl;
  public educationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, private router: Router, private userService: UserService, private _global: GlobalService) {
    this.user = this._global.globalVar;
    this._education = this._global.globalEducation;
  }

  ngOnInit(): void {

    this.type = new FormControl('');
    this.level = new FormControl('');
    this.name = new FormControl('');
    this.university = new FormControl('');
    this.finishDate = new FormControl('');

    this.educationForm = this.formBuilder.group({
      type: this.type,
      level: this.level,
      name: this.name,
      university: this.university,
      finishDate: this.finishDate,
    });
    this.getUsers();
    

  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  updateEducation() {
    const form = this.educationForm.value as Education;

    const array = this.user.education;

    for (let i = 0; i < array.length; i++) {
      if (array[i].name === this._education.name && this._education.level) {
        array.splice(i, 1);
      }
    }
    this.user.education = [...this.user.education, form];

    console.log(this.user);

    this.router.navigateByUrl('/profile');

  }
}