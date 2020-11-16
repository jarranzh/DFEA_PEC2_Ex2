import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { Activity } from '../../Models/activity';
import { ActivityService } from '../../Services/activity.service';
import { GlobalService } from '../../Services/global.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
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

  constructor(
    private activityService: ActivityService,
    private _global: GlobalService,
    private store: Store<AppState>
  ) {
    this.user = this._global.globalVar;
  }

  ngOnInit(): void {
    this.getActivities();
    this.store
      .select('activities')
      .subscribe(
        activitiesResponse => (this.activities = activitiesResponse.activities)
      );
  }

  detall(activity) {
    this.activity = activity;
  }

  // getActivities(): void{
  //   this.activityService.getActivities()
  //     .subscribe(activities => this.activities = activities);
  // }

  getActivities(): void {
    this.store.dispatch(getActivities());
  }
}
