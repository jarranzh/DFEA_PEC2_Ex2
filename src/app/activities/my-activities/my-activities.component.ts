import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/profile/models/user.model';
import { Activity } from '../models/activity.model';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.css']
})
export class MyActivitiesComponent implements OnInit {
  login;
  activities: Activity[];
  user: User;
  activity: Activity[];

  constructor(private router: Router, private store: Store<AppState>) {
    this.store
      .select('login')
      .subscribe(loginResponse => (this.login = loginResponse.userLogged));
  }

  ngOnInit(): void {
    if (!this.user) {
      this.router.navigate(['/home']);
    } else {
      this.getMyActivities();
    }
  }

  detall(activity) {
    this.activity = activity;
  }

  getMyActivities(): void {
    this.activities = this.user.activities;
  }
}
