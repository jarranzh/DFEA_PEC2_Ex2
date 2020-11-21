import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/profile/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private usersUrl = 'api/users';

  constructor(private http: HttpClient) {}

  checkRegister(
    name: string,
    surname: string,
    userType: string,
    email: string,
    password: string,
    repeatPassword: string
  ): Observable<User> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(map(response => response.find(u => u.email === email)));
  }
}
