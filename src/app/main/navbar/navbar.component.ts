import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { Subscription } from 'rxjs/Subscription';
import { GetRequestService } from '../services/http/get-request.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResumeDeleteComponent } from '../resume-delete/resume-delete.component';
import { Router, ActivatedRoute, Params, NavigationStart } from '@angular/router';
import { UrlSegment } from '@angular/router'
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { PrintPayComponent } from '../print-pay/print-pay.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AlertsService } from '../services/alerts/alerts.service';
import { ResumeContentService } from '../services/resume-content/resume-content.service';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {

  public disabled: boolean = true;
  subscription: Subscription;
  currentUser: string = '';
  versions: any[]
  tab: any
  public publishPage: boolean = true;
  private content: string
  public signupbtn: boolean = false;
  public selectedRow: string = "";

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private getRequestService: GetRequestService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    public location: Location,
    private alertService: AlertsService,
    private contentService: ResumeContentService,
  ) {
    if (/\/version\//.test(location.path())) {
      this.publishPage = false;
    }

    if (/\/create\//.test(location.path())) {
      console.log("Create page")
      //this.publishPage = false;
    }

    this.subscription = localStorageService.loginAnnounced$.subscribe(
      currentUser => {
        this.currentUser = currentUser;
        this.getVersions()
      });
    this.subscription = localStorageService.logoutAnnounced$.subscribe(
      empty => {
        this.currentUser = null;
      });
    this.subscription = localStorageService.savedNewAnnouced$.subscribe(
        empty => {
          this.getVersions()
      }
    );
    //when the app refresh or initialized
    this.currentUser = localStorage.getItem('currentUser');
    
  }

  ngOnInit() {
    if (this.currentUser) {
      this.getVersions()
    }
  }

  selectVersion(version) {
    this.selectedRow = version;
    this.router.navigate(['./user', version]);
  }

  getVersions() {
    this.getRequestService
      .getVersions()
      .subscribe(version => {  
        if (this.contentService.GetResumeID()){
          this.selectedRow = this.contentService.GetResumeID();
        }
        this.versions = version.resume
      });
  }

  createNew() {
    if(localStorage.getItem('tenaga') && localStorage.getItem('tenaga')==='1'){ 
      if (this.versions.length >= 10) {
        this.alertService.error('You can only save up to 10 versions for now', false);
      } else {
        this.router.navigate(['./user', "new"]);
      }
    }else{
      this.alertService.warn('You no longer have an active subscription. Please renew your subsciption to continue', false);
    }  
  }

  deleteResume() {
    if (this.versions.length <= 1) {
      this.alertService.error('You may not have fewer than 1 resume in file', false);
    } else {
      var resume_id = this.contentService.GetResumeID();
      if (!resume_id || resume_id == null){
        return
      }
      const modalRef = this.modalService.open(ResumeDeleteComponent);
    }
  }

  subscriptionContent() {
    this.router.navigate(['./subscription']);
  }

  login() {
    const modalRef = this.modalService.open(LoginComponent, { windowClass: 'centered-modal' });
  }

  accountContent() {
    this.router.navigate(['./account']);
  }

  logout() {
    this.router.navigate(['./logout']);
  }

  createResume() {
    this.router.navigate(['./create', "signup"]);
    const modalRef = this.modalService.open(PrintPayComponent, { keyboard: false });
  }

}


