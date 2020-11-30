import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/profile/models/user.model';
import { GlobalService } from 'src/app/Services/global.service';
import { ActivityService } from '../../Services/activity.service';
import { addActivity } from '../actions/activities.actions';
import { Activity } from '../models/activity.model';
@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.css']
})
export class NewActivityComponent implements OnInit {
  activities: Activity[];
  public user: User;
  users: User[];

  public activity: Activity = new Activity();

  public name: FormControl;
  public category: FormControl;
  public subcategory: FormControl;
  public description: FormControl;
  public language: FormControl;
  public date: FormControl;
  public price: FormControl;
  public minCapacity: FormControl;
  public limitCapacity: FormControl;
  public state: string;
  public peopleRegistered: number;
  public newActivityForm: FormGroup;
  private datePattern = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;

  constructor(
    private router: Router,
    private _global: GlobalService,
    private formBuilder: FormBuilder,
    private activityService: ActivityService,
    private store: Store<AppState>
  ) {
    this.user = this._global.globalVar;
  }

  ngOnInit(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55)
    ]);
    this.category = new FormControl('', Validators.required);
    this.subcategory = new FormControl('', Validators.required);
    this.description = new FormControl('');
    this.language = new FormControl('');
    this.date = new FormControl('', Validators.pattern(this.datePattern));
    this.price = new FormControl('', [Validators.required, Validators.min(0)]);
    this.minCapacity = new FormControl('', [
      Validators.required,
      Validators.min(0)
    ]);
    this.limitCapacity = new FormControl('', [
      Validators.required,
      Validators.min(0)
    ]);
    this.peopleRegistered = 0;
    this.state = '';

    this.newActivityForm = this.formBuilder.group({
      name: this.name,
      category: this.category,
      subcategory: this.subcategory,
      description: this.description,
      language: this.language,
      date: this.date,
      price: this.price,
      minCapacity: this.minCapacity,
      limitCapacity: this.limitCapacity,
      state: this.state,
      peopleRegistered: this.peopleRegistered
    });

    this.getActivities();
  }

  getActivities(): void {
    this.store
      .select('activities')
      .subscribe(
        activitiesResponse => (this.activities = activitiesResponse.activities)
      );
  }

  addNewActivity() {
    const form = this.newActivityForm.value as Activity;

    form.state = this.state;

    form.id =
      this.activities.length > 0
        ? Math.max(...this.activities.map(activity => activity.id)) + 1
        : 1;

    this.store.dispatch(addActivity({ activity: form }));
    this.router.navigateByUrl('/admin');
  }

  calculateState() {
    if (this.limitCapacity.value > this.peopleRegistered) {
      this.state = 'Places available';
      return true;
    } else if (this.limitCapacity.value === this.peopleRegistered) {
      this.state = 'Complete';
      return true;
    } else {
      return false;
    }
  }
}
