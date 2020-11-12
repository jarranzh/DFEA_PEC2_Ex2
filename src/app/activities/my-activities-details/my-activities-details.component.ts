import { Component, OnInit,  Input } from '@angular/core';

import { Router } from '@angular/router';

import { GlobalService } from '../../Services/global.service';

import { ActivityService } from '../../Services/activity.service';
import { Activity } from 'src/app/Models/activity';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-my-activities-details',
  templateUrl: './my-activities-details.component.html',
  styleUrls: ['./my-activities-details.component.css']
})
export class MyActivitiesDetailsComponent implements OnInit {

  @Input() activity: Activity;

  user: User;
  users: User[];
  activities: Activity[];
  constructor(private userService: UserService, private activityService: ActivityService,
              private router: Router, private _globalService: GlobalService)
  {
    this.user = this._globalService.globalVar;
  }

  ngOnInit(): void {

    this.getUsers();
    this.registered();
    this.getActivities();
  }

  getActivities(): void{
    this.activityService.getActivities()
      .subscribe(activities => this.activities = activities);
  }

  registered() {
    return this._globalService.globalVar !== undefined;
  }

  subscribed(activity) {
    const array = this.user.activities;

    for (let i = 0; i < array.length; i++){
      if (array[i].id === activity.id) {
        return true;
      }
    }
  }

  getUsers(): void{
    this.userService.getUsers()
      .subscribe(users => this.users = users);
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

    this.activityService.addActivity(activity)
      .subscribe( activity => {
        this.activities.push(activity);
        this.activities = [...this.activities, activity];
        this.router.navigateByUrl('/login', { skipLocationChange: true });
        return this.router.navigateByUrl('/myActivities');      });

    this.user.activities = [...this.user.activities, activity];

  }

  unsubscribe(activity) {
    const array = this.user.activities;

    for (let i = 0; i < array.length; i++){
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

    this.activityService.addActivity(activity)
      .subscribe( activity => {
        this.activities.push(activity);
        this.activities = [...this.activities, activity];
        this.router.navigateByUrl('/login', { skipLocationChange: true });
        this.activity = undefined;
        return this.router.navigateByUrl('/myActivities');      });

  }

}
