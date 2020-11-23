import { Injectable } from '@angular/core';
import { Activity } from '../activities/models/activity.model';
import { Education, Languages, User } from '../profile/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public globalVar: User;

  public globalEducation: Education;

  public globalLanguage: Languages;

  public globalActivity: Activity;
}
