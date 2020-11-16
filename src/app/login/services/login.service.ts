import { UserService } from 'src/app/Services/user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { User } from 'src/app/profile/models/user.model';
import { Login } from '../models/login.model';
import { find, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users: User[];
  user: User;

  constructor(private http: HttpClient, private userService: UserService) {}

  checkLogin(credentials: Login): Observable<User> {

    // getUsers(): Observable<User[]>{
    //   return this.http.get<User[]>(this.usersUrl)
    //     .pipe(
    //       tap(_=>this.log('fetched users')),
    //       catchError(this.handleError<User[]>('getUsers', []))
    //     );
    // }
    
    const source = this.userService
      .getUsers()
      .pipe(map(users => (this.users = users)));
    // const source = this.userService
    //   .getUsers()
    //   .subscribe(users => (this.users = users));
    const source2 = from(this.users);
    const example = source2.pipe(
      find(user => user.email === credentials.userEmail)
    );
    // const subscribe = example.subscribe(user => (this.user = user));
    // return this.user;
    return example;
  }
}
