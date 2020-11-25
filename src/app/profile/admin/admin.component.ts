import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteActivity } from 'src/app/activities/actions/activities.actions';
import { Activity } from 'src/app/activities/models/activity.model';
import { AppState } from 'src/app/app.reducer';
import { ActivityService } from 'src/app/Services/activity.service';
import { GlobalService } from '../../Services/global.service';
import { updateUserActivities } from '../actions/profile.actions';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userActivities: Activity[];
  activities: Activity[];
  user: Profile;
  login;
  activity: Activity;

  constructor(
    private _global: GlobalService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.getLogin();
    this.getUser();
  }

  ngOnInit(): void {
    if (this.login && this.user) {
      this.getUserActivities();
    } else {
      this.router.navigate(['/']);
    }
  }

  getLogin(): void {
    this.store
      .select('login')
      .subscribe(response => (this.login = response.userLogged));
  }

  getUser(): void {
    this.store
      .select('user')
      .subscribe(response => (this.user = response.userProfile));
  }

  getUserActivities(): void {
    this.userActivities = this.user.activities;
  }

  getActivities(): void {
    this.store
      .select('activities')
      .subscribe(
        activitiesResponse => (this.activities = activitiesResponse.activities)
      );
  }

  updateActivity(activity) {
    this._global.globalActivity = activity;
    this.router.navigateByUrl('/updateActivity');
  }

  deleteActivity(activity: Activity): void {
    const confirmDelete = confirm('¿Quieres eliminar esta actividad?');
    if (confirmDelete) {
      this.store.dispatch(deleteActivity({ activityId: activity.id }));
      this.getActivities();
      this.store.dispatch(
        updateUserActivities({ activities: this.activities })
      );
      this.getUserActivities();
    }
  }

  addActivity() {
    this.router.navigateByUrl('/newActivity');
  }
}
