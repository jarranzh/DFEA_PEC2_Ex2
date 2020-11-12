import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Activity } from 'src/app/Models/activity';
import { ActivityService } from '../../Services/activity.service';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Services/global.service';
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

  constructor(private router: Router, private userService: UserService, private _global: GlobalService,
              private formBuilder: FormBuilder, private activityService: ActivityService)
  { 
      this.user = this._global.globalVar;
    }

  ngOnInit(): void {

    this.name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(55)]);
    this.category = new FormControl('', Validators.required);
    this.subcategory = new FormControl('', Validators.required);
    this.description = new FormControl('');
    this.language = new FormControl('');
    this.date = new FormControl('', Validators.pattern(this.datePattern));
    this.price = new FormControl('', [Validators.required, Validators.min(0)]);
    this.minCapacity = new FormControl('', [Validators.required, Validators.min(0)]);
    this.limitCapacity = new FormControl('', [Validators.required, Validators.min(0)]);
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
    this.getUsers();
  }

  getActivities(): void {
    this.activityService.getActivities()
      .subscribe(activities => this.activities = activities);
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  addNewActivity() {
    const form = this.newActivityForm.value as Activity;

    form.state = this.state;

    form.id = this.activities.length > 0 ? Math.max(...this.activities.map(activity => activity.id)) + 1 : 1;

    this.activityService.addActivity(form)
      .subscribe(activity => {
        this.activities.push(activity);
        if (this.user.activities === undefined) {
          this.user.activities = [form];
        } else {
          this.user.activities = [...this.user.activities, form];
        }
        this.router.navigateByUrl('/admin');

      });
  }

  calculateState() {
    if (this.limitCapacity.value > this.peopleRegistered) {
      this.state = 'Places available';
      return true;
    } else if (this.limitCapacity.value === this.peopleRegistered) {
      this.state = 'Complete';
      return true;
    }
    else {
      return false;
    }
  }

}