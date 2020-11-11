import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { ActivityDetailComponent } from './components/activity-detail/activity-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './Services/in-memory-data.service';

import { ReactiveFormsModule } from '@angular/forms';
import { NewActivityComponent } from './components/new-activity/new-activity.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
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
@NgModule({
  declarations: [
    AppComponent,
    ActivityListComponent,
    ActivityDetailComponent,
    RegisterComponent,
    LoginComponent,
    NewActivityComponent,
    MessagesComponent,
    HomeComponent,
    ProfileComponent,
    UpdateProfileComponent,
    UpdateEducationComponent,
    AddEducationComponent,
    AddLanguageComponent,
    UpdateLanguageComponent,
    MyActivitiesComponent,
    MyActivitiesDetailsComponent,
    AdminComponent,
    UpdateActivityComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
