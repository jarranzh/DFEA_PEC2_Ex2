import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Services/global.service';
import { checkNIF } from 'src/app/Directives/check-nif.validator';
import { trimValidator } from 'src/app/Directives/check-whiteSpace.validator';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  users: User[];

  public user: User = new User();

  public name: FormControl;
  public surname: FormControl;
  public birthdate: FormControl;
  public phone: FormControl;
  public nationality: FormControl;
  public nif: FormControl;
  public about: FormControl;
  public companyName: FormControl;
  public companyDescription: FormControl;
  public cif: FormControl;
  public profileForm: FormGroup;
  private date = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;
  company: boolean;


  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private _global: GlobalService) { 
    this.user = this._global.globalVar;
  }

  ngOnInit(): void {

    if (this.getProfile() === true) {

      this.name = new FormControl(this.user.name, [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^[a-zA-Z0-9]*$')]);
      this.surname = new FormControl(this.user.surname, [Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^[a-zA-Z0-9]*$')]);
      this.birthdate = new FormControl(this.user.birthDate, Validators.pattern(this.date));
      this.phone = new FormControl(this.user.phone);
      this.nationality = new FormControl(this.user.nationality);
      this.nif = new FormControl(this.user.nif);
      this.about = new FormControl(this.user.aboutMe);
      this.companyName = new FormControl(this.user.companyName, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]);
      this.companyDescription = new FormControl(this.user.companyDescription);
      this.cif = new FormControl(this.user.cif, Validators.required);

      this.profileForm = this.formBuilder.group({
        name: this.name,
        surname: this.surname,
        birthDate: this.birthdate,
        phone: this.phone,
        nationality: this.nationality,
        nif: this.nif,
        aboutMe: this.about,
        companyName: this.companyName,
        companyDescription: this.companyDescription,
        cif: this.cif
      }, {
        validators: [checkNIF, trimValidator]
      });
    } else {
      this.name = new FormControl(this.user.name, [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^[a-zA-Z0-9]*$')]);
      this.surname = new FormControl(this.user.surname, [Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^[a-zA-Z0-9]*$')]);
      this.birthdate = new FormControl(this.user.birthDate, Validators.pattern(this.date));
      this.phone = new FormControl(this.user.phone);
      this.nationality = new FormControl(this.user.nationality);
      this.nif = new FormControl(this.user.nif);
      this.about = new FormControl(this.user.aboutMe);

      this.profileForm = this.formBuilder.group({
        name: this.name,
        surname: this.surname,
        birthDate: this.birthdate,
        phone: this.phone,
        nationality: this.nationality,
        nif: this.nif,
        aboutMe: this.about,
      }, {
        validators: checkNIF
      });
    }

    this.getUsers();

    this.getProfile();

    this.getInformation();

  }

  getProfile() {
    if (this.user.type === 'Company') {

      return this.company = true;
    } else {

      return this.company = false;
    }
  }

  getInformation() {

    if (this.user.nif === null) {
      this.user.nif = '';
    }

    if (this.user.companyName === null) {
      this.user.companyName = '';
    }

  }

  getUsers(): void{
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  updateProfile() {
    const form = this.profileForm.value as User;
    if (this.getProfile() === true) {
      this.user.name = form.name;
      this.user.surname = form.surname;
      this.user.birthDate = form.birthDate;
      this.user.phone = form.phone;
      this.user.nationality = form.nationality;
      this.user.nif = form.nif;
      this.user.aboutMe = form.aboutMe;
      this.user.companyName = form.companyName;
      this.user.companyDescription = form.companyDescription;
      this.user.cif = form.cif;
    } else {
      this.user.name = form.name;
      this.user.surname = form.surname;
      this.user.birthDate = form.birthDate;
      this.user.phone = form.phone;
      this.user.nationality = form.nationality;
      this.user.nif = form.nif;
      this.user.aboutMe = form.aboutMe;
    }
    this.router.navigateByUrl('/profile');
  }

  validatorNIF(): boolean{
    return this.profileForm.hasError('validation') && this.profileForm.get('nif').dirty;
  }

  validatorTRIM(): boolean{
    return this.profileForm.hasError('validationT') && this.profileForm.get('companyName').dirty;
  }

}

