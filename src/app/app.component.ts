import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { cleanActivities } from './activities/actions/activities.actions';
import { AppState } from './app.reducer';
import { logout } from './login/actions/login.actions';
import { cleanUser } from './profile/actions/profile.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private store: Store<AppState>) {}

  title = 'Travel Agency';

  public logout() {
    this.store.dispatch(logout());
    this.store.dispatch(cleanActivities());
    this.store.dispatch(cleanUser());
    document.getElementById('logout').style.display = 'none';
    document.getElementById('register').style.display = 'inline';
    document.getElementById('login').style.display = 'inline';
    document.getElementById('admin').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('myActivities').style.display = 'none';
    document.getElementById('favorites').style.display = 'none';
    document.getElementById('home').style.display = 'none';
    this.router.navigate(['home']);
  }
}
