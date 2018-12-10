import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stockpile';
  currentUser: User;
  isAdmin: boolean;
  constructor(
    private authenticationservice: AuthenticationService,
    private router: Router
  ){
    this.authenticationservice.currentUser.subscribe(x => this.currentUser = x);
    this.isAdmin = this.authenticationservice.isAdmin();
  }

  logout(){
    this.authenticationservice.logout();
    this.router.navigate(['/login']);
  }




}
