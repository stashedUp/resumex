import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.css']
})
export class ForgotPasswordModalComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    public loginForm: FormGroup;
    public passwordForm: FormGroup;
    public errorMessage: boolean = false;
    public pwdResult: boolean = false;
    public errType: string = "danger";
    public message: string = "Something went wrong";

    constructor(
        private authenticationService: AuthenticationService,
        private fb: FormBuilder,
        public activeModal: NgbActiveModal,     
    ) { }

    ngOnInit() {
        this.passwordForm = this.fb.group({
            email: new FormControl('')
        });
    }


    public backToLogin() {
      this.activeModal.close();      
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
                        setTimeout(() => this.pwdResult = false, 2000);
                        this.passwordForm.patchValue({ email: "" });
                        setTimeout(() =>  this.activeModal.close(), 2000);
                    } else if (result.cb_type === "danger") {
                        this.pwdResult = true;
                        this.errType = "danger";           
                        this.message = result.cb_message;
                        this.loading = false;
                        setTimeout(() => this.pwdResult = false, 4300);

                    }
                });
        }
    }
}

