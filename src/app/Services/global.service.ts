import { Injectable } from '@angular/core';
import { Activity } from '../activities/models/activity.model';
import { Education, Language, User } from '../profile/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public globalVar: User;

  public globalEducation: Education;

  public globalLanguage: Language;

  public globalActivity: Activity;
}
