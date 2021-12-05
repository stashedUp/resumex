import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MainComponent } from './main.component';
import { ResumeMainComponent } from './resume-main/resume-main.component';
import { JobsComponent } from './content/jobs/jobs.component';
import { JobDescriptionComponent } from './content/jobs/job-description/job-description.component';
import { JobDetailComponent } from './content/jobs/job-description/job-detail/job-detail.component';
import { BriefDescriptionComponent } from './content/jobs/job-description/job-detail/brief-description/brief-description.component';
import { EducationFormComponent } from './content/education-form/education-form.component';
import { EduDetailComponent } from './content/education-form/edu-detail/edu-detail.component';
import { EducationComponent } from './content/education-form/edu-detail/education/education.component';
import { EducationDescComponent } from './content/education-form/edu-detail/education/education-desc/education-desc.component';
import { InvolvementsComponent } from './content/involvements/involvements.component';
import { ActivitiesComponent } from './content/involvements/activities/activities.component';
import { ActivityDetailComponent } from './content/involvements/activities/activity-detail/activity-detail.component';
import { ActivityDescriptionComponent } from './content/involvements/activities/activity-detail/activity-description/activity-description.component';
import { PersonalComponent } from './content/personal/personal.component';
import { PersonalDescriptionComponent } from './content/personal/personal-description/personal-description.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { IntroComponent } from './intro/intro.component';
import { ResumeContentService } from './services/resume-content/resume-content.service';
import { PrintPayComponent } from './print-pay/print-pay.component';
import { MainRoutingModule } from './main-routing.module';
import { LimitsDirective } from './directives/limits/limits.directive';
import { AlertExceedDirective } from './directives/alert-exceed/alert-exceed.directive';
import { AlertExceedService } from './services/alert-exceed/alert-exceed.service';
import { PostRequestService } from './services/http/post-request.service';
import { PrintService } from './services/print/print.service';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthGuard } from './services/guards/auth.guard';
import { ResumeAccountComponent } from './resume-account/resume-account.component';
import { LogoutComponent } from './logout/logout.component';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { TokenService } from 'angular2-auth';
import { GetRequestService } from './services/http/get-request.service';
import { CreditCardFormatDirective } from './directives/credit-card/credit-card-format.directive';
import { CvcFormatDirective } from './directives/credit-card/cvc-format.directive';
import { ExpiryFormatDirective } from './directives/credit-card/expiry-format.directive';
import { AccountComponent } from './account/account.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ResumeDeleteComponent } from './resume-delete/resume-delete.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PublishComponent } from './publish/publish.component';
import { NewWindowService } from './services/new-window/new-window.service';
import { SelectModule } from 'angular2-select';
import { PricingComponent } from './pricing/pricing.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { LoginLandingComponent } from './login-landing/login-landing.component';
import { UpdateCardComponent } from './update-card/update-card.component';
import { ForgotPasswordModalComponent } from './forgot-password-modal/forgot-password-modal.component';
import {CardModule} from 'ngx-card/ngx-card';
import { LoaderInterceptor } from './services/interceptors/loader-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertsDirective } from './directives/alerts/alerts.directive';
import { AlertsService } from './services/alerts/alerts.service';
import { PendingChangesGuard } from './services/guards/pending-changes.guard';
import { ShareResumeComponent } from './share-resume/share-resume.component';
import { ClipboardModule } from 'ngx-clipboard';
import { ListUsersComponent } from './list-users/list-users.component';
import { ThingsToAvoidComponent } from './things-to-avoid/things-to-avoid.component';
import { TipsFromRecruiterComponent } from './tips-from-recruiter/tips-from-recruiter.component';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import { Angulartics2Module } from 'angulartics2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    MainRoutingModule,
    SelectModule,
    CardModule,
    ClipboardModule,
    NgxPageScrollModule,
    Angulartics2Module,
    //SlimLoadingBarModule.forRoot(),
    //FlexLayoutModule
  ],
  declarations: [
    NavbarComponent,
    ResumeMainComponent,
    JobsComponent,
    JobDescriptionComponent,
    JobDetailComponent,
    BriefDescriptionComponent,
    EducationFormComponent,
    EduDetailComponent,
    EducationDescComponent,
    EducationComponent,
    InvolvementsComponent,
    ActivitiesComponent,
    ActivityDetailComponent,
    ActivityDescriptionComponent,
    PersonalComponent,
    PersonalDescriptionComponent,
    FooterComponent,
    IntroComponent,
    PrintPayComponent,
    LimitsDirective,
    AlertExceedDirective,
    LoginComponent,
    ResumeAccountComponent,
    LogoutComponent,
    CreditCardFormatDirective,
    CvcFormatDirective,
    ExpiryFormatDirective,
    AccountComponent,
    PagenotfoundComponent,
    ResumeDeleteComponent,
    SubscriptionComponent,
    PublishComponent,
    PricingComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    UpdatePasswordComponent,
    LoginLandingComponent,
    UpdateCardComponent,
    ForgotPasswordModalComponent,
    AlertsDirective,
    ShareResumeComponent,
    ListUsersComponent,
    ThingsToAvoidComponent,
    TipsFromRecruiterComponent,
  ],
  exports: [
    MainRoutingModule,
    NavbarComponent,
    FooterComponent,
    LimitsDirective,
    AlertExceedDirective,
    AlertsDirective,
    CreditCardFormatDirective,
    CvcFormatDirective,
    ExpiryFormatDirective,
  ],
  providers: [
    ResumeContentService, AlertExceedService,
    PostRequestService, PrintService, AuthenticationService,
    AuthGuard, LocalStorageService, TokenService, GetRequestService,
    NewWindowService,AlertsService,
    PendingChangesGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    }
  ]
})

export class MainModule { }

