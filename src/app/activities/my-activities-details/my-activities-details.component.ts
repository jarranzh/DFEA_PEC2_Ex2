import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Profile } from 'src/app/profile/models/profile.model';
import { User } from 'src/app/profile/models/user.model';
import { ActivityService } from '../../Services/activity.service';
import { Activity } from '../models/activity.model';
import {
  updateUserActivities,
  subscribeUserToActivity,
  unsubscribeUserFromActivity
} from 'src/app/profile/actions/profile.actions';
import {
  subscribeActivity,
  unsubscribeActivity
} from '../actions/activities.actions';

@Component({
  selector: 'app-my-activities-details',
  templateUrl: './my-activities-details.component.html',
  styleUrls: ['./my-activities-details.component.css']
})
export class MyActivitiesDetailsComponent implements OnInit {
  @Input() activity: Activity;

  user: Profile;
  users: User[];
  activities: Activity[];
  constructor(
    private activityService: ActivityService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store
      .select('user')
      .subscribe(response => (this.user = response.userProfile));
  }

  ngOnInit(): void {
    this.registered();
    this.getActivities();
  }

  getActivities(): void {
    this.store
      .select('activities')
      .subscribe(response => (this.activities = response.activities));
  }

  registered() {
    return this.user !== undefined;
  }

  subscribed(activity) {
    const array = this.user.activities;
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === activity.id) {
        return true;
      }
    }
  }

  signUp(activity) {
    this.store.dispatch(subscribeUserToActivity({ activity }));
    this.store.dispatch(subscribeActivity({ activity }));
    this.store.dispatch(updateUserActivities({ activities: this.activities }));

    //   this.activities = this.activities.filter(a => a !== activity);
    //   this.activityService.deleteActivity(activity).subscribe();
    //   const registrats = activity.peopleRegistered + 1;
    //   activity.peopleRegistered = registrats;
    //   const limit = activity.limitCapacity;
    //   if (registrats === limit) {
    //     activity.state = 'Complete';
    //   }
    //   this.activityService.addActivity(activity).subscribe(activity => {
    //     this.activities.push(activity);
    //     this.activities = [...this.activities, activity];
    //     this.router.navigateByUrl('/login', { skipLocationChange: true });
    //     return this.router.navigateByUrl('/myActivities');
    //   });
    //   this.user.activities = [...this.user.activities, activity];
  }

  unsubscribe(activity) {
    // const array = this.user.activities;
    console.log('ACTIVITY ID', activity.id);
    console.log(this.user.activities);
    this.store.dispatch(
      unsubscribeUserFromActivity({ activityId: activity.id })
    );
    this.store.dispatch(unsubscribeActivity({ activity }));
    this.activity = undefined;
    // for (let i = 0; i < array.length; i++) {
    //   if (array[i].id === activity.id) {
    //     array.splice(i, 1);
    //   }
    // }

    // this.activities = this.activities.filter(a => a !== activity);
    // this.activityService.deleteActivity(activity).subscribe();

    // if (activity.peopleRegistered === activity.limitCapacity) {
    //   activity.state = 'Places available';
    // }

    // const registrats = activity.peopleRegistered - 1;

    // activity.peopleRegistered = registrats;

    // this.activityService.addActivity(activity).subscribe(activity => {
    //   this.activities.push(activity);
    //   this.activities = [...this.activities, activity];
    //   this.router.navigateByUrl('/login', { skipLocationChange: true });
    //   this.activity = undefined;
    //   return this.router.navigateByUrl('/myActivities');
    // });
  }
}
