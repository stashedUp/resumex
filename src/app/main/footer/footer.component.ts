import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  subscription: Subscription;
  currentUser: string = '';

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    public location: Location,
  ) { 

    this.subscription = localStorageService.loginAnnounced$.subscribe(
      currentUser => {
        this.currentUser = currentUser;
      });
    this.subscription = localStorageService.logoutAnnounced$.subscribe(
      empty => {
        this.currentUser = null;
      });
      this.currentUser = localStorage.getItem('currentUser');
  }

  ngOnInit() {
  }

  viewPricing() {
    this.router.navigate(['./pricing']);
  }

  viewTerms() {
    this.router.navigate(['./terms-conditions']);
  }

  viewPolicy() {
    this.router.navigate(['./privacy-policy']);
  }

  viewListUsers() {
    this.router.navigate(['./list-users']);
  }

  viewToAvoid() {
    this.router.navigate(['./things-to-avoid']);
  }

  viewTips() {
    this.router.navigate(['./tips-from-recruiters']);
  }


  contactUs(){
    window.open("mailto:admin@resumex.io?Subject=Question", "_top");
  }

}
