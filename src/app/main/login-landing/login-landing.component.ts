import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';
import { AlertsService } from '../services/alerts/alerts.service';

@Component({
  selector: 'app-login-landing',
  templateUrl: './login-landing.component.html',
  styleUrls: ['./login-landing.component.css']
})
export class LoginLandingComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    public loginForm: FormGroup;
    public passwordForm: FormGroup;
    public loginSection: boolean = true;
    public errorMessage: boolean = false;
    public pwdResult: boolean = false;
    public errType: string = "danger";
    public message: string = "Something went wrong";
    

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private fb: FormBuilder,
        private modalService: NgbModal,
        private alertService:  AlertsService,        
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        this.loginForm = this.fb.group({
            email: new FormControl(''),
            password: new FormControl('')
        });

        this.passwordForm = this.fb.group({
            email: new FormControl('')
        });
    }

    public login() {
        this.loading = true;
        if (this.loginForm.value.email == '' || this.loginForm.value.password == '') {
            this.message = "Fields cannot be empty";
            this.alertService.error(this.message, false);  
            this.loading = false;       
        } else {        
            this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
                .subscribe(result => {
                    if (result.token) {
                        this.router.navigate(['/user']);
                    } else if (result.cb_type === "danger") {
                        this.alertService.error(result.cb_message, false);
                    }
                });
        }
    }

    public forgotPassword() {
        const modalRef = this.modalService.open(ForgotPasswordModalComponent);
        modalRef.componentInstance.name = this.loginForm.value.email;
    }

}

