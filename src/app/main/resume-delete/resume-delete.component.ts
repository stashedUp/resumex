import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ResumeContentService } from '../services/resume-content/resume-content.service';
import { UserAccount } from '../interfaces/user';
import { Router, ActivatedRoute } from '@angular/router';
import { PostRequestService } from '../services/http/post-request.service';
import { AlertsService } from '../services/alerts/alerts.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-resume-delete',
  templateUrl: './resume-delete.component.html',
  styleUrls: ['./resume-delete.component.css']
})
export class ResumeDeleteComponent implements OnInit {
  private resume_id: string;

  constructor(
    public activeModal: NgbActiveModal,
    private contentService: ResumeContentService,
    private route: ActivatedRoute,
    private router: Router,
    private postRequestService: PostRequestService,
    private alertService:  AlertsService, 
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    
  }

  deleteResume() {      
    this.resume_id = this.contentService.GetResumeID();
    if (!this.resume_id || this.resume_id == null){
      return
    }
    this.postRequestService.deleteResume(this.resume_id )
    .subscribe(result => { 
        console.log(result)        
        if (result.cb_type === "success"){
          this.localStorageService.announceSavedNew(true)
          this.router.navigate(['/user']);
          this.alertService.success(result.cb_message, false);            
          this.activeModal.close();
        }else if(result.cb_type === "danger"){
          this.alertService.error(result.cb_message, false); 
        }else{
          this.router.navigate(['/user']);
          this.activeModal.close();
        }
    });
  }
}
