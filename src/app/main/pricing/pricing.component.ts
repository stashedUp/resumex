import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PrintPayComponent } from '../print-pay/print-pay.component';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  constructor(
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
  }

  createResume(){
    this.router.navigate(['./create']);
  }

  signUp(){
    this.router.navigate(['./create', "signup"]);
    const modalRef = this.modalService.open(PrintPayComponent, { keyboard: false });
  }
}
