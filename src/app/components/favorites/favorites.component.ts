import { Component, OnInit} from '@angular/core';
import { User } from '../../Models/user';
import { Activity } from '../../Models/activity';
import { GlobalService } from '../../Services/global.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

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

    const saved = JSON.parse(localStorage.getItem('favorites'));

    this.activities = saved;
  }

}
