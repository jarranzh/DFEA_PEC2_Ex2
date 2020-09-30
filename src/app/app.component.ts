import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }


  title = 'Travel Agency';

  public logout(){
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

