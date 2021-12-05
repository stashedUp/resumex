import { Component, OnInit } from '@angular/core';
import { GetRequestService } from '../services/http/get-request.service';
import { PostRequestService } from '../services/http/post-request.service';
import { AlertsService } from '../services/alerts/alerts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public isEditName: boolean = false
  public isEditPass: boolean = false
  public isEditEmail: boolean = false
  public name: string;
  public account_email: string;
  public last_login: number;
  public cust_id: string;
  public password: string;
  public resume : any = []

  constructor(
    private getRequestService: GetRequestService,
    private postRequestService: PostRequestService,
    private alertService: AlertsService,
  ) { }

  ngOnInit() {
    this.getRequestService
      .getAccountInfo()
      .subscribe(account => {
        this.name = account.fullname;
        this.account_email = account.account_email;
        this.resume = account.resume;
        this.cust_id = account.cust_id;
        this.last_login = account.last_login;
      });

  }

  UpdateName() {
    if(this.name === null || !this.name){
      this.alertService.error('Name cannot be empty', false);
      return
    }
    this.postRequestService.updateName(this.name)
      .subscribe(result => {
        if (result) {
          this.isEditName = false;
          if (result.cb_type === "success") {
            this.alertService.success('Succesfully updated name', false);
          } else if (result.cb_type === "danger") {
            this.alertService.error('Unable to update name', false);
          } else {
            this.alertService.warn('Something went wrong...', false);
          }
        }
      });
  }

  UpdatePassword() {
    if(this.password === null || !this.password){
      this.alertService.error('Password cannot be empty', false);
      return
    }
    else if(!this.validatePassword(this.password.trim())){
      this.alertService.error("Your password must contain minimum 6 characters, at least one letter and one number, optionally special characters", false);
      return
    }
    this.postRequestService.updatePasswordAuth(this.password)
      .subscribe(result => {
        if (result) {
          this.isEditPass = false;
          if (result.cb_type === "success") {
            this.alertService.success('Succesfully updated password', false);
          } else if (result.cb_type === "danger") {
            this.alertService.error('Unable to update password', false);
          } else {
            this.alertService.warn('Something went wrong...', false);
          }
        }
      });
  }

  private validatePassword(password):boolean {
    var re = /^(?=.*[0-9])([!@#$%^&*]*)[a-zA-Z0-9!@#$%^&*]{6,32}$/;
    return re.test(password);
  }
}
