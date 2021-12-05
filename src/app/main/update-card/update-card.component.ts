import { Component, OnInit, NgZone } from '@angular/core';
import { ResumeContentService } from '../services/resume-content/resume-content.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { User, UserAccount } from '../interfaces/user';
import { PostRequestService } from '../services/http/post-request.service';
import { Router } from '@angular/router';
import {CardModule} from 'ngx-card/ngx-card';
import { AlertsService } from '../services/alerts/alerts.service';
import { environment } from '../../../environments/environment';

declare var Stripe: any;

@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.component.html',
  styleUrls: ['./update-card.component.css']
})
export class UpdateCardComponent implements OnInit {
 
 
  private password: string;
  public cc_name: string;
  private subscribe: boolean = true;
  public loading:boolean = false;
  public message: string = "Loading ..."
  public cardNumber: number;
  public expiryMonth: number;
  public expiryYear: number;
  public cvc: number;
  public expirationDate: any;
  public errCardMsg: boolean = false;
  private stripeKey = environment.stripeKey;
 
  constructor(
    private contentService: ResumeContentService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private postRequestService: PostRequestService,
    private _zone: NgZone,
    private router: Router,
    private alertService:  AlertsService,
  ) {
  }

  ngOnInit() {
    Stripe.setPublishableKey(this.stripeKey);
  }

  getToken() {
    this.loading = true;

    if(this.cardNumber == null || !this.cardNumber || /^\d$/.test(this.cardNumber.toString()) ){
      this.loading = false;
      this.errCardMsg = true;
      this.message = "Your card number is invalid"
      return
    }

    if(this.cc_name == null || !this.cc_name){
      this.loading = false;
      this.errCardMsg = true;
      this.message = "Your card owner's name is invalid"
      return
    }

    if(this.expirationDate == null || !this.expirationDate || /^\d$/.test(this.expirationDate) ){
      this.loading = false;
      this.errCardMsg = true;
      this.message = "Your expiration date is invalid"
      return
    }

    if(this.cvc == null || !this.cvc || /^\d$/.test(this.cvc.toString()) ){
      this.loading = false;
      this.errCardMsg = true;
      this.message = "Your CVC number is invalid"
      return
    }
    
    var expiration_date = this.expirationDate;
    var result = expiration_date.split('/');
    var exp_month = +(result[0]);
    var exp_year = +(result[1]);
    //(<any>window).Stripe.setPublishableKey("pk_test_GhuLqvF7bjM8KDm0OdmqeZTp");
    Stripe.card.createToken({
      name: this.cc_name,
      number: this.cardNumber,
      exp_month: exp_month,
      exp_year: exp_year,
      cvc: this.cvc
    }, (status: number, response: any) => {

      // Wrapping inside the Angular zone
      this._zone.run(() => {
        if (status === 200) {
          this.message = `Success! Card token ${response.card.id}.`;
          this.saveCard(response.id);
        } else {
          console.log(response.error.message);
          this.loading = false;
          this.errCardMsg = true;
          this.message = response.error.message;
        }
      });
    });
  }

  resetAlert(){
    this.errCardMsg = false;
  }

  private saveCard(ccToken: string): void {
    this.postRequestService.updateCard(ccToken)
        .subscribe(result => {
            if (result) {
                this.loading = false;
                this.activeModal.close();
                this.alertService.success('Succcessfully updated card!', false);
            } else {
                this.alertService.error('Unable to update card!', false);
                this.loading = false;
            }
        });

  }
}
