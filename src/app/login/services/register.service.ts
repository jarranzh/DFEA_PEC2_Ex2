import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/profile/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private usersUrl = 'api/users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}

  checkRegister(user: User): Observable<User> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(map(response => response.find(u => u.email === user.email)));
  }

  // addUser(user: User): Observable<User> {
  //   console.log('adding user');
  //   return this.http
  //     .post<User>(this.usersUrl, user, this.httpOptions)
  //     .pipe(map(addedUser => addedUser));
  // }

  addUser(user: User): Observable<User> {
    console.log('adding user');
    this.http.post<User>(this.usersUrl, user, this.httpOptions);
    console.log('added user');
    return this.checkRegister(user);
    // this.http
    //   .get<User[]>(this.usersUrl)
    //   .pipe(map(response => response.find(u => u.email === user.email)));
  }
}
