import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PrintPayComponent } from '../print-pay/print-pay.component';
import { LoginComponent } from '../login/login.component';

declare var flipCounter: any;
declare var typo: any;

/* 
This is the intro page - entry page when you first load the site
*/
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  public footer: boolean = true;

  constructor(
    private router: Router,
    private modalService: NgbModal,

  ) {
    this.footer = true;
    PageScrollConfig.defaultScrollOffset = 50
    PageScrollConfig.defaultEasingLogic = {
      ease: (t: number, b: number, c: number, d: number): number => {
          // easeInOutExpo easing
          if (t === 0) return b;
          if (t === d) return b + c;
          if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
          return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
  };
  }

  ngOnInit() {
    // let launch = 1508112792;
    // let today  = Math.floor(Date.now() / 1000)
    // let days   = Math.floor((today-launch)/60/60/24)
    // let start_value = 10000 + days
    // var myCounter = new flipCounter('myCounter', { value: start_value, inc: 422, pace: 200, auto: true, stop: 14000 });
    var type = new typo();
    type.typewriter;
  }

  createResume() {
    this.router.navigate(['./create']);
  }

  signUp() {
    this.router.navigate(['./create', "signup"]);
    const modalRef = this.modalService.open(PrintPayComponent, { keyboard: false });
  }

  login() {
    const modalRef = this.modalService.open(LoginComponent, { windowClass: 'centered-modal' });
  }

}
