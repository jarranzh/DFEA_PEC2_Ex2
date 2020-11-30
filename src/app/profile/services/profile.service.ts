import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/profile/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private usersUrl = 'api/users';

  constructor(private http: HttpClient) {}

  getProfile(email: string): Observable<User> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map(response => {
        console.log('users:', response);
        return response.find(u => u.email === email);
      })
    );
  }
}
