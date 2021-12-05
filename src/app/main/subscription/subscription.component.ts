import { Component, OnInit } from '@angular/core';
import { GetRequestService } from '../services/http/get-request.service';
import { Invoices } from '../interfaces/user'
import { PostRequestService } from '../services/http/post-request.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCardComponent } from '../update-card/update-card.component';
import { AlertsService } from '../services/alerts/alerts.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  private name: string
  public info: boolean = true
  public invoiceclass: boolean
  public plan: boolean
  public value: number = 1
  public invoices: Invoices[];
  private subscription: any;
  private plan_name: string;
  private current_period_start: number;
  private current_period_end: number;
  private start: number;
  private status: string;
  private password: string;
  private canceled_at: number;
  private card: any;
  private brand: string
  private exp_month: number
  private exp_year: number
  private last4: number
  public isEditRenewSubs: boolean = true;
  

  constructor(
    private getRequestService: GetRequestService,
    private postRequestService: PostRequestService,
    private modalService: NgbModal,
    private router: Router,
    private alertService:  AlertsService,
   ) {
  }

  ngOnInit() {
     this.getSubsInfo()
  }


  getSubsInfo() {
    this.getCard()
    this.info = true
    this.invoiceclass = false
    this.plan = false
  }

  getSubsInvoice() {
    this.getInvoices()
    this.invoiceclass = true
    this.plan = false
    this.info = false
  }

  getSubsPlan() {
    this.getSubscription()
    this.plan = true
    this.info = false
    this.invoiceclass = false
  }

  getCard() {
    if (this.card) {
      return
    } else {
      this.getRequestService
        .getCustCard()
        .subscribe(card => {
          this.card = card
          this.name = card.name
          this.brand = card.brand
          this.exp_month = card.exp_month
          this.exp_year = card.exp_year
          this.last4 = card.last4
        });
    }
  }

  getInvoices() {

    if (this.invoices) {
      return
    } else {
      this.getRequestService
        .getInvoices()
        .subscribe(version => {
          this.invoices = version.invoices
         });
    }
  }

  cancelSubscription() {

    if (this.password === null || !this.password){
      this.alertService.error('Password field cannot be empty ', false);
      return
    }

    this.postRequestService.stopSubscription(this.password)
      .subscribe(result => {
        if (result) {
          if (result.cb_type === "success") {
            this.alertService.success(result.cb_message, false);
            this.getHttpSubs()
          } else if (result.cb_type === "danger") {
            this.alertService.error(result.cb_message, false);
          } else {
            this.alertService.warn('Something went wrong...', false);
          }
        } else {
          this.alertService.error('Unable to stop subscription', false);
        }
      });
  }

  restartSubscription() {
 

    this.postRequestService.restartSubscription()
      .subscribe(result => {
        console.log(result)
        if (result) {
          if (result.cb_type === "success") {
            this.getHttpSubs()
            this.alertService.success('Succesfully restarted subscription', false);
          } else if (result.cb_type === "danger") {
            this.alertService.error('Unable to restart subscription', false);
          } else {
            this.alertService.warn('Something went wrong...', false);
          }
        } else {
          this.alertService.error('Unable to restart subscription', false);
        }
      });

  }

  getSubscription() {
    if (this.subscription) {
      this.start = this.subscription.start
      this.current_period_end = this.subscription.current_period_end
      this.current_period_start = this.subscription.current_period_start
      this.plan_name = this.subscription.plan
      this.status = this.subscription.status
      this.canceled_at = this.subscription.canceled_at
    } else {
      this.getHttpSubs()
    }
  }

  getHttpSubs() {
    this.getRequestService
      .getSubscription()
      .subscribe(subscription => {
        this.subscription = subscription
        this.start = subscription.start
        this.current_period_end = subscription.current_period_end
        this.current_period_start = subscription.current_period_start
        this.plan_name = subscription.plan
        this.status = subscription.status
        this.canceled_at = this.subscription.canceled_at
      });
  }

  updateCard(){
    const modalRef = this.modalService.open(UpdateCardComponent);
  }

  refreshCard(){
    this.getRequestService
    .getCustCard()
    .subscribe(card => {
      this.card = card
      this.name = card.name
      this.brand = card.brand
      this.exp_month = card.exp_month
      this.exp_year = card.exp_year
      this.last4 = card.last4
    });
  }

  deleteAccount() {

    if (this.password === null || !this.password){
      this.alertService.error('Password field cannot be empty ', false);
      return
    }
    
    this.postRequestService.deleteAccount(this.password)
      .subscribe(result => {
        if (result) {
          if (result.cb_type === "success") {
            this.router.navigate(['/logout']);
            this.alertService.success('Succesfully delete account', false);
          } else if (result.cb_type === "danger") {
            this.alertService.error(result.cb_message, false);
          } else {
            this.alertService.warn('Something went wrong...', false);
          }
        } else {
          this.alertService.error('Unable to delete account', false);
        }
      });
  }
}
