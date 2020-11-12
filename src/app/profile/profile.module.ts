import { UpdateLanguageComponent } from './update-language/update-language.component';
import { UpdateEducationComponent } from './update-education/update-education.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AddEducationComponent } from './add-education/add-education.component';
import { AddLanguageComponent } from './add-language/add-language.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UpdateProfileComponent,
    AddEducationComponent,
    AddLanguageComponent,
    UpdateEducationComponent,
    UpdateLanguageComponent
  ],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProfileModule {}
