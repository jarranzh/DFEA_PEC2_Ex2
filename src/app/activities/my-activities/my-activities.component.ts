import { Component, OnInit} from '@angular/core';
import { User } from '../../Models/user';
import { Activity } from '../../Models/activity';
import { GlobalService } from '../../Services/global.service';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.css']
})
export class MyActivitiesComponent implements OnInit {

  activities: Activity[];
  user: User;
  activity: Activity[];

  constructor( private _global: GlobalService) {
    this.user = this._global.globalVar;

  }

  ngOnInit(): void {

    if (this.user !== undefined) {
      this.getMyActivities();
    }
  }

  detall(activity) {
    this.activity = activity;
}

  getMyActivities(): void{
    this.activities = this.user.activities;
  }

}
