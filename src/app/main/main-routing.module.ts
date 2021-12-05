import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntroComponent } from './intro/intro.component';
import { ResumeMainComponent } from './resume-main/resume-main.component';
import { ResumeAccountComponent } from './resume-account/resume-account.component';
import { PrintPayComponent } from './print-pay/print-pay.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './services/guards/auth.guard';
import { AccountComponent } from './account/account.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ResumeDeleteComponent } from './resume-delete/resume-delete.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PublishComponent } from './publish/publish.component';
import { PricingComponent } from './pricing/pricing.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { LoginLandingComponent } from './login-landing/login-landing.component';
import { UpdateCardComponent } from './update-card/update-card.component';
import { ForgotPasswordModalComponent } from './forgot-password-modal/forgot-password-modal.component';
import { PendingChangesGuard } from './services/guards/pending-changes.guard';
import { ShareResumeComponent } from './share-resume/share-resume.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ThingsToAvoidComponent } from './things-to-avoid/things-to-avoid.component';
import { TipsFromRecruiterComponent } from './tips-from-recruiter/tips-from-recruiter.component';

const appRoutes: Routes = [
  { path: 'version/:version', component: PublishComponent },
  { path: 'create', component: ResumeMainComponent, canDeactivate: [PendingChangesGuard] },
  { path: 'create/:signup', component: ResumeMainComponent },
  { path: 'pay', component: PrintPayComponent },
  { path: 'user/:content', component: ResumeAccountComponent, canActivate: [AuthGuard],canDeactivate: [PendingChangesGuard] },
  { path: 'user', component: ResumeAccountComponent, canActivate: [AuthGuard],canDeactivate: [PendingChangesGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'main', component: IntroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'delete', component: ResumeDeleteComponent },
  { path: 'subscription', component: SubscriptionComponent, canActivate: [AuthGuard] },
  { path: 'pricing', component: PricingComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'update-password/:email/:id', component: UpdatePasswordComponent },
  { path: 'login-landing', component: LoginLandingComponent },
  { path: 'update-card', component: UpdateCardComponent },
  { path: 'forgot-password-modal', component: ForgotPasswordModalComponent },
  { path: 'forgot-password-modal', component: ForgotPasswordModalComponent },
  { path: 'share-resume', component: ShareResumeComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: 'tips-from-recruiters', component: TipsFromRecruiterComponent},
  { path: 'things-to-avoid', component: ThingsToAvoidComponent},
  { path: '',   component: IntroComponent },
  { path: '**', component: PagenotfoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule { }


