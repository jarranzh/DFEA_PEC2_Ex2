import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { Activity } from '../../Models/activity';
import { ActivityService } from '../../Services/activity.service';
import { GlobalService } from '../../Services/global.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  activities: Activity[];
  user: User;
  activity: Activity[];

  constructor(private activityService: ActivityService, private _global: GlobalService) {
    this.user = this._global.globalVar;

  }

  ngOnInit(): void {
    this.getActivities();
  }

  detall(activity) {
    this.activity = activity;
}

  getActivities(): void{
    this.activityService.getActivities()
      .subscribe(activities => this.activities = activities);
  }

}
