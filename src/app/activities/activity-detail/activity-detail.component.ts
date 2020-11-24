import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Profile } from 'src/app/profile/models/profile.model';
import { User } from 'src/app/profile/models/user.model';
import { ActivityService } from '../../Services/activity.service';
import { Activity } from '../models/activity.model';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {
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
    if (this.user !== undefined) {
      this.registered();
    }
    this.getActivities();
  }

  getActivities(): void {
    this.store
      .select('activities')
      .subscribe(response => (this.activities = response.activities));
  }

  registered() {
    if (this.user !== undefined) {
      if (this.user.type === 'Tourist') {
        return true;
      } else {
        return false;
      }
    }
  }

  subscribed(activity) {
    const array = this.user.activities;

    if (array !== undefined) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === activity.id) {
          return true;
        }
      }
    }
  }

  favorited() {
    const saved = JSON.parse(localStorage.getItem('favorites'));

    if (saved !== null) {
      for (let i = 0; i < saved.length; i++) {
        if (saved[i].id === this.activity.id) {
          return true;
        }
      }
    } else {
      return false;
    }
  }

  favorite() {
    const saved = JSON.parse(localStorage.getItem('favorites'));

    if (saved !== null) {
      saved.push(this.activity);
      localStorage.setItem('favorites', JSON.stringify(saved));
    } else {
      const fav = [];
      fav.push(this.activity);
      localStorage.setItem('favorites', JSON.stringify(fav));
    }
  }

  unfavorite() {
    const saved = JSON.parse(localStorage.getItem('favorites'));

    for (let i = 0; i < saved.length; i++) {
      if (saved[i].id === this.activity.id) {
        saved.splice(i, 1);
      }
    }

    localStorage.setItem('favorites', JSON.stringify(saved));

    const url = window.location.pathname;

    if (url === '/favorites') {
      this.reload(url);
    }
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/login', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }

  signUp(activity) {
    this.activities = this.activities.filter(a => a !== activity);
    this.activityService.deleteActivity(activity).subscribe();

    const registrats = activity.peopleRegistered + 1;

    activity.peopleRegistered = registrats;

    const limit = activity.limitCapacity;

    if (registrats === limit) {
      activity.state = 'Complete';
    }

    this.activityService.addActivity(activity).subscribe(activity => {
      this.activities.push(activity);
      this.activities = [...this.activities, activity];
      this.router.navigateByUrl('/login', { skipLocationChange: true });
      return this.router.navigateByUrl('/activityList');
    });

    if (this.user.activities !== undefined) {
      this.user.activities = [...this.user.activities, activity];
    } else {
      this.user.activities = [activity];
    }
  }

  unsubscribe(activity) {
    const array = this.user.activities;

    for (let i = 0; i < array.length; i++) {
      if (array[i].id === activity.id) {
        array.splice(i, 1);
      }
    }

    this.activities = this.activities.filter(a => a !== activity);
    this.activityService.deleteActivity(activity).subscribe();

    if (activity.peopleRegistered === activity.limitCapacity) {
      activity.state = 'Places available';
    }

    const registrats = activity.peopleRegistered - 1;

    activity.peopleRegistered = registrats;

    this.activityService.addActivity(activity).subscribe(activity => {
      this.activities.push(activity);
      this.activities = [...this.activities, activity];
      this.router.navigateByUrl('/login', { skipLocationChange: true });
      return this.router.navigateByUrl('/activityList');
    });
  }
}
