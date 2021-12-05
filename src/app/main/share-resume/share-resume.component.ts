import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { NewWindowService } from '../services/new-window/new-window.service';
import { ResumeContentService } from '../services/resume-content/resume-content.service';
import { PostRequestService } from '../services/http/post-request.service';


@Component({
  selector: 'app-share-resume',
  templateUrl: './share-resume.component.html',
  styleUrls: ['./share-resume.component.css']
})
export class ShareResumeComponent implements OnInit {
  public link: string = "http://linknotfound.com"
  public isCopied: boolean = false;
  public nativeWindow: any;
  private resumeID: string = "resumenotfound"
  public to_email: string;
  public shareAlert: boolean = false;
  public alertType :string = "success";
  public alertMessage: string = "Link shared";
  public loading: boolean = false;
  public sendButton:string = "Send Email"

  constructor(
    public activeModal: NgbActiveModal,
    private winRef: NewWindowService,
    private contentService: ResumeContentService,
    private postRequestService: PostRequestService,
  ) {
    this.nativeWindow = winRef.getNativeWindow();
  }

  ngOnInit() {

  }

  openLink() {
    this.resumeID = this.contentService.GetResumeID();
    var newWindow = this.nativeWindow.open('/version/' + this.resumeID);
  }

  shareLinkEmail() {
    this.loading = true;
    if (!this.to_email || this.to_email == "" || this.to_email === undefined){
      this.loading = false;
      this.shareAlert = true;
      this.alertType = "danger";
      this.alertMessage = "Email cannot be empty";
      setTimeout(() => this.shareAlert = false, 3000);
      return
    }
    if (!this.validateEmail(this.to_email)) {
      this.loading = false;
      this.shareAlert = true;
      this.alertType = "danger";
      this.alertMessage = "Email is invalid. You can only use place one email address at a time";
      setTimeout(() => this.shareAlert = false, 3000);
      return
    }
    this.resumeID = this.contentService.GetResumeID();
    this.postRequestService.shareLinkEmail( this.to_email, this.resumeID)
      .subscribe(result => {
        if (result.cb_type === "success") {
          this.shareAlert = true;
          this.alertType = "success";
          this.alertMessage = result.cb_message;
          this.loading = false;
          setTimeout(() => this.shareAlert = false, 4300);
        } else if (result.cb_type === "danger") {
          this.shareAlert = true;
          this.alertType = "danger";
          this.alertMessage = result.cb_message;
          this.sendButton = "Sending"
          this.loading = false;
          setTimeout(() => this.shareAlert = false, 4300);
        }
      });
  }

  private validateEmail(email):boolean {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
  }

}
