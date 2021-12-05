import { Component, OnInit, NgZone } from '@angular/core';
import { ResumeContentService } from '../services/resume-content/resume-content.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { User, UserAccount } from '../interfaces/user';
import { PostRequestService } from '../services/http/post-request.service';
import { CardModule } from 'ngx-card/ngx-card';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NewWindowService } from '../services/new-window/new-window.service';
import { AlertsService } from '../services/alerts/alerts.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { Angulartics2Facebook } from 'angulartics2';

declare var Stripe: any;

@Component({
  selector: 'app-print-pay',
  templateUrl: './print-pay.component.html',
  styleUrls: ['./print-pay.component.css']
})
export class PrintPayComponent implements OnInit {
  private resume_modal: UserAccount;
  private account_modal: UserAccount;
  public account_email: string = "";
  public password: string;
  public cc_name: string;
  public option: number;
  public subscribe: boolean = true;
  public loading: boolean = false;
  public message: string = "Loading ..."
  public cardNumber: number;
  public expiryMonth: number;
  public expiryYear: number;
  public cvc: number;
  public expirationDate: any;
  public name: string = "User";
  public promoIsCollapsed: boolean = false;
  public promocode: string = "";
  public alertType: string = "success";
  public alertMessage: string = "Ops..something went wrong";
  public promptAlert: boolean = false;
  public errCardMsg: boolean = false;
  public email_error: boolean = false;
  public password_error: boolean = false;
  public email_error_msg: string = "Your email is invalid"
  public password_error_msg: string = "Your password is invalid"
  private stripeKey = environment.stripeKey;
  public checkboxAgree : boolean = false;
  public agreeAlert : boolean = false;
  public agreeAlertMsg : string = "You have to agree to our Privacy Policy to sign up.";
  public nativeWindow: any;
  public total: number = 1 ;

  constructor(
    private contentService: ResumeContentService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private postRequestService: PostRequestService,
    private _zone: NgZone,
    private router: Router,
    private winRef: NewWindowService,
    private alertService: AlertsService,
    private localStorageService: LocalStorageService,
    public angulartics2fb: Angulartics2Facebook
  ) {
    this.nativeWindow = winRef.getNativeWindow();
  }



  ngOnInit() {
     this.resume_modal = this.contentService.getContent();
    if (this.resume_modal != null || typeof this.resume_modal != 'undefined') {
      this.account_email = this.resume_modal['email'];
      this.name = this.resume_modal['fullname'];
    }
    Stripe.setPublishableKey(this.stripeKey);
    this.promoIsCollapsed = false
    console.log(this.stripeKey)
  }

  promoCollapseBox(){
    if (this.promoIsCollapsed){
      this.promoIsCollapsed = false
    }else{
      this.promoIsCollapsed = true
    }
  }

  getToken() {
    this.loading = true;

    if (this.account_email == null || !this.account_email || !this.validateEmail(this.account_email)) {
      this.email_error = true;
      this.loading = false;
      this.email_error_msg = "Your email is invalid"
      return
    }

    if (this.password == null || !this.password) {
      this.password_error = true;
      this.loading = false;
      this.password_error_msg = "Your password is invalid"
      return
    }

    if(!this.validatePassword(this.password.trim())){
      this.password_error = true;
      this.loading = false;
      this.password_error_msg = "Your password must contain minimum 6 characters, at least one letter and one number, optionally special characters"
      return
    }

    if (this.cardNumber == null || !this.cardNumber || /^\d$/.test(this.cardNumber.toString())) {
      this.loading = false;
      this.errCardMsg = true;
      this.message = "Your card number is invalid"
      return
    }

    if (this.cc_name == null || !this.cc_name) {
      this.loading = false;
      this.errCardMsg = true;
      this.message = "Your card owner's name is invalid"
      return
    }

    if (this.expirationDate == null || !this.expirationDate || /^\d$/.test(this.expirationDate)) {
      this.loading = false;
      this.errCardMsg = true;
      this.message = "Your expiration date is invalid"
      return
    }

    if (this.cvc == null || !this.cvc || /^\d$/.test(this.cvc.toString())) {
      this.loading = false;
      this.errCardMsg = true;
      this.message = "Your CVC number is invalid"
      return
    }

    if (this.checkboxAgree === false){
      this.loading = false;
      this.agreeAlert = true;
      this.agreeAlertMsg = "You have to agree to our Privacy Policy to sign up."
      return
    }
    var expiration_date = this.expirationDate;
    var result = expiration_date.split('/');
    var exp_month = +(result[0]);
    var exp_year = +(result[1]);

    Stripe.card.createToken({
      name: this.cc_name,
      number: this.cardNumber,
      exp_month: exp_month,
      exp_year: exp_year,
      cvc: this.cvc
    }, (status: number, response: any) => {

      this._zone.run(() => {
        if (status === 200) {
          this.message = `Success! Card token ${response.card.id}.`;
          this.saveAccount(response.id);
        } else {
          console.log(response.error.message);
          this.loading = false;
          this.errCardMsg = true;
          this.message = response.error.message;
        }
      });
    });
  }

  applyPromoCode() {
    this.promptAlert = true;
    if (this.promocode.trim() === 'iowa') {
      this.alertType = "success";
      this.alertMessage = "Promo code accepted! You'll only be billed 3 months later. You may cancel anytime.";
      this.total = 0;
    } else if (this.promocode.trim() === 'motherofdragons') {
      this.alertType = "success";
      this.alertMessage = "Promo code accepted! You'll only be billed 1 day later. You may cancel anytime.";
      this.total = 0;
    } else {
      this.alertType = "danger";
      this.alertMessage = "Invalid promo code";
      this.total = 1;
    }
  }

  resetAlert() {
    this.errCardMsg = false;
  }

  resetEmailErr() {
    this.email_error = false;
  }

  resetPasswordErr() {
    this.password_error = false;
  }

  resetPromoCodeErr() {
    this.promptAlert = false;
  }

  removeAgreeAlert(){
    this.agreeAlert = false;
  }

  viewTerms(){
    var newWindow = this.nativeWindow.open('/terms-conditions');
  }

  viewPolicy(){
    var newWindow = this.nativeWindow.open('/privacy-policy');
  }

  private validateEmail(email):boolean {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
  }

  private validatePassword(password):boolean {
    var re = /^(?=.*[0-9])([!@#$%^&*]*)[a-zA-Z0-9!@#$%^&*]{6,32}$/;
    return re.test(password);
  }

  private saveAccount(ccToken: string): void {
    let account = Object.assign({}, this.resume_modal);
    account.account_email = this.account_email;
    account.fullname = this.cc_name;
    account.password = this.password.trim();
    account.cc_token = ccToken;

    if (this.promocode) {
      account.promocode = this.promocode
    }
    this.postRequestService.createAccount(account)
      .subscribe(result => {
        if (result) {
          if (result.token) {
            this.angulartics2fb.eventTrack('Purchase', {value: '1.00', currency: 'USD'})
            this.contentService.SetNotChanged(true)
            this.loading = false;
            this.agreeAlert = false;
            this.router.navigate(['/user']);
            this.localStorageService.announceSavedNew(true)
            this.activeModal.close();
            this.alertService.success('Welcome! You can now enjoy all the premium features!', true);            
          } else if (result.cb_type === "danger") {
            this.loading = false;
            this.email_error = true;
            this.email_error_msg = result.cb_message
            this.message = result.cb_message;
          } else {
            this.loading = false;
          }
        } else {
          this.loading = false;
        }
      });
  }
}
