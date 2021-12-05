import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { PostRequestService } from '../services/http/post-request.service';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  private sub : any;
  private email : string;
  private id : string;
  public passwordForm : FormGroup;
  public password_retype: string;
  public password: string;
  public pwdResult: boolean = false;
  public errType: string = "danger";
  public message: string = "Something went wrong";
  public loading: boolean = false;

  constructor(
    private route : ActivatedRoute,
    private postRequestService: PostRequestService,
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    
  ) { }

  ngOnInit() {
    if (this.authenticationService.loggedIn()){
      this.router.navigate(['/user']);
    }
    
    this.sub = this.route.params.subscribe(params => {
      this.email = params['email']
      this.id = params['id']
    });

    this.passwordForm = this.fb.group({
      password: new FormControl(''),
      password_retype: new FormControl('')
    });
  }

  public resetPassword(){
    this.loading = true;
    if (this.passwordForm.value.password == '' || this.passwordForm.value.password_retype == '') {
      this.pwdResult = true;
      this.loading = false;
      this.errType = "danger";
      this.message = "Fields cannot be empty";
      setTimeout(() => this.pwdResult = false, 2300);
    }
    else if(!this.validatePassword(this.passwordForm.value.password.trim())){
      this.pwdResult = true;
      this.loading = false;
      this.errType = "danger";
      this.message = "Your password must contain minimum 6 characters, at least one letter and one number, optionally special characters"
      setTimeout(() => this.pwdResult = false, 2300);
    }
    else if(this.passwordForm.value.password !== this.passwordForm.value.password_retype){
      this.pwdResult = true;
      this.loading = false;
      this.errType = "danger";
      this.message = "Password does not match";
      setTimeout(() => this.pwdResult = false, 2300);
    }
    else{      
      this.postRequestService.updatePassword(this.passwordForm.value.password.trim(), this.id,this.email)
          .subscribe(result => {  
            if (result.cb_type === "success") {
              this.pwdResult = true;
              this.errType = "success";           
              this.message = result.cb_message;
              this.loading = false;
              setTimeout(() => this.pwdResult = false, 2000);
              this.passwordForm.patchValue({ password: "" });
              this.passwordForm.patchValue({ password_retype: "" });
              setTimeout(() => this.router.navigate(['/login-landing']), 2300);
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

  private validatePassword(password):boolean {
    var re = /^(?=.*[0-9])([!@#$%^&*]*)[a-zA-Z0-9!@#$%^&*]{6,32}$/;
    return re.test(password);
  }
}
