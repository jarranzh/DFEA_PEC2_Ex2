import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/activities/models/activity.model';
import { ActivityService } from 'src/app/Services/activity.service';
import { UserService } from 'src/app/Services/user.service';
import { GlobalService } from '../../Services/global.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  activities: Activity[];
  users: User[];
  user: User;
  activity: Activity;

  constructor(
    private _global: GlobalService,
    private router: Router,
    private activityService: ActivityService,
    private userService: UserService
  ) {
    this.user = this._global.globalVar;
  }

  ngOnInit(): void {
    if (this.user !== undefined) {
      this.getUsers();
      this.getActivities();
    }
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => (this.users = users));
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
