import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Activity } from '../../Models/activity';
import { GlobalService } from '../../Services/global.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/profile/models/user.model';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.css']
})
export class MyActivitiesComponent implements OnInit {
  activities: Activity[];
  user: User;
  activity: Activity[];

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store
      .select('userLogged')
      .subscribe(
        userLoggedResponse => (this.user = userLoggedResponse.userLogged)
      );
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
