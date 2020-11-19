import { UserService } from 'src/app/Services/user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { User } from 'src/app/profile/models/user.model';
import { find, filter, map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users: User[];
  user: User;
  private usersUrl = 'api/users';

  constructor(private http: HttpClient, private userService: UserService) {}

  checkLogin(email: string, password: string): Observable<User> {
    // getUsers(): Observable<User[]>{
    //   return this.http.get<User[]>(this.usersUrl)
    //     .pipe(
    //       tap(_=>this.log('fetched users')),
    //       catchError(this.handleError<User[]>('getUsers', []))
    //     );
    // }

    const usersAux = this.http.get<User[]>(this.usersUrl).pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
    // usersAux.subscribe(users => (this.users = users));
    const userAux = usersAux.pipe(find(u => u.email === email));
    return this.user;
  }

  // const source = this.http
  //   .get<User[]>(this.usersUrl)
  //   .pipe(find(users => users.find(user => user.email === email)));

  // const source = this.userService
  //   .getUsers()
  //   .pipe(map(users => (this.users = users)));
  // const source = this.userService
  //   .getUsers()
  //   .subscribe(users => (this.users = users));
  // const source2 = from(this.users);
  // const example = source2.pipe(
  //   find(user => user.email === email)
  // );
  // const subscribe = example.subscribe(user => (this.user = user));
  // return this.user;
  private log(message: string) {
    //this.messageService.add(`ActivityService: ${message}`);
    console.log(message);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
