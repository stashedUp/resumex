import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationStart } from '@angular/router';
import { GetRequestService } from '../services/http/get-request.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms'
import { AlertsService } from '../services/alerts/alerts.service';

@Component(
  {
    selector: 'app-publish',
    templateUrl: './publish.component.html',
    styleUrls: ['../shared-resources-css/paper-properties.css']
  })
export class PublishComponent implements OnInit {
  private sub: any;
  private version: string;
  public user: any;
  public edu_show: boolean = false;
  public jobs_show: boolean = false;
  public involvements_show: boolean = false;
  public personal_show: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private getRequestService: GetRequestService, 
    private alertService:  AlertsService,
  ) { }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        this.version = params['version']
        console.log(this.version)
        this.getVersionResume(this.version)
      });
  }

  getVersionResume(resume_id) {
    this.getRequestService
      .getNonAuthVersionResume(resume_id)
      .subscribe(user => {
        if (user) {
          if (user.cb_type === "danger") {
            this.alertService.error(user.cb_message, false);
          } else {
            this.user = user;
            if ((user.education[0] !== undefined) || (user.education[0] != null) || (user.education[0] != "undefined")) {
              this.edu_show = true;
            }
            if ((user.education[0] === undefined) || (user.education[0] == null) || (user.education[0] == "undefined")) {
              this.edu_show = false;
            }
            if ((user.jobs[0] !== undefined) || (user.jobs[0] != null) || (user.jobs[0] != "undefined")) {
              this.jobs_show = true;
            }
            if ((user.jobs[0] === undefined) || (user.jobs[0] == null) || (user.jobs[0] == "undefined")) {
              this.jobs_show = false;
            }
            if ((user.involvement[0] !== undefined) || (user.involvement[0] != null) || (user.involvement[0] != "undefined")) {
              this.involvements_show = true;
            }
            if ((user.involvement[0] === undefined) || (user.involvement[0] == null) || (user.involvement[0] == "undefined")) {
              this.involvements_show = false;
            }
            if ((user.personal[0] !== undefined) || (user.personal[0] != null) || (user.personal[0] !== "undefined")) {
              this.personal_show = true;
            }
            if ((user.personal[0] === undefined) || (user.personal[0] == null) || (user.personal[0] == "undefined")) {
              this.personal_show = false;
            }
          }
        }
      });
  }

}
