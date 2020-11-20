import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Activity } from '../models/activity.model';
import { User } from '../../Models/user';
import { getActivities } from '../actions/activities.actions';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  activities: Activity[];
  user: User;
  activity: Activity[];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.getActivities();
    this.store
      .select('activities')
      .subscribe(
        activitiesResponse => (this.activities = activitiesResponse.activities)
      );
    this.store
      .select('userLogged')
      .subscribe(
        userLoggedResponse => (this.user = userLoggedResponse.userLogged)
      );
    this.setPageHeader();
  }

  getActivities(): void {
    this.store.dispatch(getActivities());
  }

  public setPageHeader = () => {
    if (this.user?.type === 'Tourist') {
      document.getElementById('logout').style.display = 'inline';
      document.getElementById('home').style.display = 'inline';
      document.getElementById('favorites').style.display = 'inline';
      document.getElementById('myActivities').style.display = 'inline';
      document.getElementById('profile').style.display = 'inline';
      document.getElementById('login').style.display = 'none';
      document.getElementById('register').style.display = 'none';
    } else if (this.user?.type === 'Company') {
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
