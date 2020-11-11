import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { ActivityDetailComponent } from './components/activity-detail/activity-detail.component';
import { NewActivityComponent } from './components/new-activity/new-activity.component';
import { HomeComponent } from '../app/components/home/home.component';
import { ProfileComponent } from '../../src/app/components/profile/profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { UpdateEducationComponent } from './components/update-education/update-education.component';
import { AddEducationComponent } from './components/add-education/add-education.component';
import { AddLanguageComponent } from './components/add-language/add-language.component';
import { UpdateLanguageComponent } from './components/update-language/update-language.component';
import { MyActivitiesComponent } from './components/my-activities/my-activities.component';
import { MyActivitiesDetailsComponent } from './components/my-activities-details/my-activities-details.component';
import { AdminComponent } from './components/admin/admin.component';
import { UpdateActivityComponent } from './components/update-activity/update-activity.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'activityList', component: ActivityListComponent },
  { path: 'activityDetail/:id', component: ActivityDetailComponent },
  { path: 'newActivity', component: NewActivityComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'updateProfile', component: UpdateProfileComponent },
  { path: 'updateEducation', component: UpdateEducationComponent },
  { path: 'addEducation', component: AddEducationComponent },
  { path: 'updateLanguage', component: UpdateLanguageComponent },
  { path: 'addLanguage', component: AddLanguageComponent },
  { path: 'myActivities', component: MyActivitiesComponent },
  { path: 'myActivitiesDetails', component: MyActivitiesDetailsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'updateActivity', component: UpdateActivityComponent },
  { path: 'favorites', component: FavoritesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
