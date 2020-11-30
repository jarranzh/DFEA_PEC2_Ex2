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
import { updateUserActivities } from 'src/app/profile/actions/profile.actions';
import { Profile } from 'src/app/profile/models/profile.model';
import { GlobalService } from 'src/app/Services/global.service';
import { updateActivity } from '../actions/activities.actions';
import { Activity } from '../models/activity.model';
@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.css']
})
export class UpdateActivityComponent implements OnInit {
  public user: Profile;
  login;
  activities: Activity[];

  public activity: Activity;

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
  public updateActivityForm: FormGroup;
  private datePattern = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;

  constructor(
    private router: Router,
    private _global: GlobalService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.store
      .select('login')
      .subscribe(loginResponse => (this.login = loginResponse.userLogged));

    this.store
      .select('user')
      .subscribe(userResponse => (this.user = userResponse.userProfile));

    this.activity = this._global.globalActivity;
  }

  ngOnInit(): void {
    if (this.login) {
      this.name = new FormControl(this.activity.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(55)
      ]);
      this.category = new FormControl(
        this.activity.category,
        Validators.required
      );
      this.subcategory = new FormControl(
        this.activity.subcategory,
        Validators.required
      );
      this.description = new FormControl(this.activity.description);
      this.language = new FormControl(this.activity.language);
      this.date = new FormControl(
        this.activity.date,
        Validators.pattern(this.datePattern)
      );
      this.price = new FormControl(this.activity.price, [
        Validators.required,
        Validators.min(0)
      ]);
      this.minCapacity = new FormControl(this.activity.minCapacity, [
        Validators.required,
        Validators.min(0)
      ]);
      this.limitCapacity = new FormControl(this.activity.limitCapacity, [
        Validators.required,
        Validators.min(0)
      ]);
      this.peopleRegistered = this.activity.peopleRegistered;
      this.state = this.activity.state;

      this.updateActivityForm = this.formBuilder.group({
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
    } else {
      this.router.navigate(['/']);
    }
  }

  getActivities(): void {
    this.store
      .select('activities')
      .subscribe(
        activitiesResponse => (this.activities = activitiesResponse.activities)
      );
  }
  //TODO: REDIRECT TO HOME WHEN NO USER LOGGED
  updateActivity() {
    const form = this.updateActivityForm.value as Activity;

    form.state = this.state;

    this.store.dispatch(
      updateActivity({
        activityId: this.activity.id,
        activity: { id: this.activity.id, ...form }
      })
    );

    this.store.dispatch(updateUserActivities({ activities: this.activities }));
    this.router.navigateByUrl('/admin');
  }

  calculateState() {
    if (this.state !== 'Cancelled') {
      if (this.limitCapacity.value > this.peopleRegistered) {
        this.state = 'Places available';
      } else if (this.limitCapacity.value === this.peopleRegistered) {
        this.state = 'Complete';
      }
    }
  }

  cancelActivity() {
    this.state = 'Cancelled';
  }

  changeCategory(e) {
    this.updateActivityForm.get('subcategory').setValue(undefined);
  }
}
