import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import {
  subscribeUserToActivity,
  unsubscribeUserFromActivity,
  updateUserActivities
} from 'src/app/profile/actions/profile.actions';
import { Profile } from 'src/app/profile/models/profile.model';
import {
  subscribeActivity,
  unsubscribeActivity
} from '../actions/activities.actions';
import { Activity } from '../models/activity.model';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {
  @Input() activity: Activity;

  act: Activity;
  user: Profile;
  activities: Activity[];
  constructor(private router: Router, private store: Store<AppState>) {
    console.log('input activity', this.activity);
    this.store
      .select('user')
      .subscribe(response => (this.user = response.userProfile));
    this.store
      .select('activities')
      .subscribe(response => (this.activities = response.activities));
  }

  ngOnInit(): void {
    if (this.user !== undefined) {
      this.registered();
    }
    if (this.activities && this.activity) {
      //TODO: pass this.act instead of this.activity to the html template.
      //Problem: when is this this condition true?
      console.log(this.activity);
      this.store
        .select('activities')
        .subscribe(
          response =>
            (this.act = response.activities.find(
              a => a.id === this.activity.id
            ))
        );
      console.log('ACT', this.act);
    }
  }

  registered() {
    if (this.user?.type === 'Tourist') {
      return true;
    } else {
      return false;
    }
  }

  subscribed(activity) {
    const array = this.user.activities;
    console.log('user activities', this.user.activities);

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
    this.store.dispatch(subscribeUserToActivity({ activity }));
    this.store.dispatch(subscribeActivity({ activity }));
    this.store.dispatch(updateUserActivities({ activities: this.activities }));
  }

  unsubscribe(activity) {
    this.store.dispatch(
      unsubscribeUserFromActivity({ activityId: activity.id })
    );
    this.store.dispatch(unsubscribeActivity({ activity }));
  }
}
