import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { LoginState } from 'src/app/login/reducers';
import { getProfile } from 'src/app/profile/actions/profile.actions';
import { Profile } from 'src/app/profile/models/profile.model';
import { getActivities } from '../actions/activities.actions';
import { Activity } from '../models/activity.model';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  loginState: LoginState;
  login;
  activities: Activity[];
  user: Profile;
  activity: Activity;

  constructor(private store: Store<AppState>) {
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

    if (this.login?.email && !this.user) {
      this.store.dispatch(getProfile({ email: this.login.email }));

      this.store
        .select('user')
        .subscribe(userResponse => (this.user = userResponse.userProfile));

      this.setPageHeader();
    }
  }

  getActivities(): void {
    this.store.dispatch(getActivities());
  }

  public setPageHeader = () => {
    console.log('setHeader', this.user);
    //TODO: sacar info userProfile y hacer estos if con (this.user?.type)
    if (this.login?.userType === 'Tourist') {
      console.log('tourist');

      document.getElementById('logout').style.display = 'inline';
      document.getElementById('home').style.display = 'inline';
      document.getElementById('favorites').style.display = 'inline';
      document.getElementById('myActivities').style.display = 'inline';
      document.getElementById('profile').style.display = 'inline';
      document.getElementById('login').style.display = 'none';
      document.getElementById('register').style.display = 'none';
    } else if (this.login?.userType === 'Company') {
      console.log('Company');

      document.getElementById('logout').style.display = 'inline';
      document.getElementById('login').style.display = 'none';
      document.getElementById('register').style.display = 'none';
      document.getElementById('home').style.display = 'inline';
      document.getElementById('profile').style.display = 'inline';
      document.getElementById('admin').style.display = 'inline';
    }
  };

  detall(activity: Activity) {
    this.activity = activity;
  }
}
