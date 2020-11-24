import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Activity } from '../models/activity.model';
import { getActivities } from '../actions/activities.actions';
import { User } from 'src/app/profile/models/user.model';
import {
  getProfile,
  getProfileFailure
} from 'src/app/profile/actions/profile.actions';
import { Profile } from 'src/app/profile/models/profile.model';
import { LoginState } from 'src/app/login/reducers';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  loginState: LoginState;
  login;
  activities: Activity[];
  user: User;
  userProfile: Profile;
  activity: Activity[];

  constructor(private store: Store<AppState>, private router: Router) {
    this.store
      .select('login')
      .subscribe(loginResponse => (this.login = loginResponse.userLogged));
  }

  ngOnInit(): void {
    this.store
      .select('activities')
      .subscribe(
        activitiesResponse => (this.activities = activitiesResponse.activities)
      );

    if (!this.activities) {
      this.getActivities();
    }

    this.store
      .select('user')
      .subscribe(userResponse => (this.userProfile = userResponse.userProfile));

    if (this.login?.email && !this.userProfile) {
      console.log(this.user);
      console.log('DISPATCH GET PROFILE');
      this.store.dispatch(getProfile({ email: this.login.email }));
    }
    this.setPageHeader();
  }

  getActivities(): void {
    this.store.dispatch(getActivities());
  }

  public setPageHeader = () => {
    console.log(this.login);
    if (this.login?.userType === 'Tourist') {
      document.getElementById('logout').style.display = 'inline';
      document.getElementById('home').style.display = 'inline';
      document.getElementById('favorites').style.display = 'inline';
      document.getElementById('myActivities').style.display = 'inline';
      document.getElementById('profile').style.display = 'inline';
      document.getElementById('login').style.display = 'none';
      document.getElementById('register').style.display = 'none';
    } else if (this.login?.userType === 'Company') {
      document.getElementById('logout').style.display = 'inline';
      document.getElementById('login').style.display = 'none';
      document.getElementById('register').style.display = 'none';
      document.getElementById('home').style.display = 'inline';
      document.getElementById('profile').style.display = 'inline';
      document.getElementById('admin').style.display = 'inline';
    }
  };

  detall(activity: Activity[]) {
    this.activity = activity;
  }
}
