import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Activity } from 'src/app/activities/models/activity.model';
import { AppState } from 'src/app/app.reducer';
import { ActivityService } from 'src/app/Services/activity.service';
import { GlobalService } from '../../Services/global.service';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  activities: Activity[];
  user: Profile;
  login;
  activity: Activity;

  constructor(
    private _global: GlobalService,
    private router: Router,
    private activityService: ActivityService,
    private store: Store<AppState>
  ) {
    this.store
      .select('user')
      .subscribe(response => (this.user = response.userProfile));

    this.store
      .select('login')
      .subscribe(response => (this.login = response.userLogged));
  }

  ngOnInit(): void {
    if (this.login && this.user) {
      this.getActivities();
    } else {
      this.router.navigate(['/']);
    }
  }

  getActivities(): void {
    this.activities = this.user.activities;
  }

  updateActivity(activity) {
    this._global.globalActivity = activity;
    this.router.navigateByUrl('/updateActivity');
  }

  deleteActivity(activity: Activity): void {
    const array = this.user.activities;

    for (let i = 0; i < array.length; i++) {
      if (array[i].id === activity.id) {
        array.splice(i, 1);
      }
    }
    this.activities = this.activities.filter(a => a !== activity);
    this.activityService.deleteActivity(activity).subscribe();
  }

  addActivity() {
    this.router.navigateByUrl('/newActivity');
  }
}
