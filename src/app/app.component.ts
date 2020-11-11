import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './Services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private _globalService: GlobalService) { }


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
    this._globalService.globalVar = undefined;
    this.router.navigate(['home']);

  }
}

