import { Component, OnInit } from '@angular/core';
import { TokenService } from 'angular2-auth';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { 

    this.authenticationService.logout();
    this.router.navigate(['/login-landing']);
  }

  ngOnInit() {
  }

}
