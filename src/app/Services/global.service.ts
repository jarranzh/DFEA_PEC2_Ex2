import { Injectable } from '@angular/core';
import { Education, Languages, User } from '../Models/user';
import { Activity } from '../Models/activity';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public globalVar: User;

  public globalEducation: Education;

  public globalLanguage: Languages;

  public globalActivity: Activity;
 
}
