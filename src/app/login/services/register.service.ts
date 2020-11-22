import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/profile/models/user.model';
import { Registration } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private usersUrl = 'api/users';

  constructor(private http: HttpClient) {}

  checkRegister(register: Registration): Observable<User> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(map(response => response.find(u => u.email === register.email)));
  }
}
