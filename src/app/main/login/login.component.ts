import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';

@Component({ moduleId: module.id, selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css'] })

export class LoginComponent implements OnInit {
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
        public activeModal: NgbActiveModal,
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
        if (this.loginForm.value.email == '' || this.loginForm.value.password == '') {
            this.errorMessage = true;
            this.message = "Fields cannot be empty";
            setTimeout(() => this.errorMessage = false, 4000);
        } else {
            this.loading = true;
            this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
                .subscribe(result => {

                    if (result.token) {
                        this.router.navigate(['/user']);
                        this.activeModal.close();
                    } else if (result.cb_type === "danger") {

                        this.errorMessage = true;
                        setTimeout(() => this.errorMessage = false, 5000);
                        this.message = result.cb_message
                        this.error = 'Email or password is incorrect';
                        this.loading = false;
                    }
                });
        }
    }


    public forgotPassword() {
        this.passwordForm.patchValue({ email: this.loginForm.value.email });
        this.loginSection = false;
    }

    public backToLogin() {
        this.loginSection = true;
    }

    public emailResetPassword() {
        this.message = "Password reset: Check Your email";
        if (this.passwordForm.value.email == '') {
            this.pwdResult = true;
            this.errType = "danger";
            this.message = "Fields cannot be empty";
            setTimeout(() => this.pwdResult = false, 4000);
        } else {
            this.loading = true;
            this.authenticationService.resetPassword(this.passwordForm.value.email)
                .subscribe(result => {
                    if (result.cb_type === "success") {
                        this.pwdResult = true;
                        this.errType = "success";
                        this.message = result.cb_message;
                        this.loading = false;
                        setTimeout(() => this.pwdResult = false, 4000);
                        setTimeout(() => this.loginSection = true, 4000);
                    } else if (result.cb_type === "danger") {
                        this.pwdResult = true;
                        this.errType = "danger";
                        this.message = result.cb_message;
                        this.loading = false;
                        setTimeout(() => this.pwdResult = false, 4300);
                    }else{
                        this.pwdResult = true;
                        this.errType = "warning";
                        this.message = "Something went wrong";
                        this.loading = false;
                        setTimeout(() => this.pwdResult = false, 4300);
                    }
                });
        }
    }
}
