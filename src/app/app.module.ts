import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './Services/in-memory-data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { ActivitiesModule } from './activities/activities.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { UserService } from './Services/user.service';
import { appReducers } from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EffectsArray } from './login/effects';

@NgModule({
  declarations: [AppComponent, MessagesComponent, AdminComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    }),
    LoginModule,
    ProfileModule,
    ActivitiesModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(EffectsArray),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
