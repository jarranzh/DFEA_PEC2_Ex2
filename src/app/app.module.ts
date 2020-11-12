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
    ActivitiesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
