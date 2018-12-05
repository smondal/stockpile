import { Component, OnInit } from '@angular/core';
import {AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  adminuser: boolean;
  cusomeruser: boolean;

  constructor(
    private authenticationservice: AuthenticationService,
    private alerservice: AlertService
  ){}

  ngOnInit() {
    this.authenticationservice.currentUser.subscribe(x => x.is_admin ? this.adminuser = true : this.cusomeruser = true  )
  }

}
