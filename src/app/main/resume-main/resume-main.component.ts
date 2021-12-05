import { HostListener, ElementRef, ViewChild, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { PostRequestService } from '../services/http/post-request.service';
import { PrintService } from '../services/print/print.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JobsComponent } from '../content/jobs/jobs.component'
import { EducationFormComponent } from '../content/education-form/education-form.component'
import { InvolvementsComponent } from '../content/involvements/involvements.component'
import { PersonalComponent } from '../content/personal/personal.component'
import { ResumeContentService } from '../services/resume-content/resume-content.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrintPayComponent } from '../print-pay/print-pay.component';
import { Subscription } from 'rxjs/Subscription';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AlertExceedService } from '../services/alert-exceed/alert-exceed.service';
import { ComponentCanDeactivate } from '../services/guards/pending-changes.guard';
import { Observable } from 'rxjs/Observable';
import { Angulartics2Facebook,Angulartics2GoogleAnalytics } from 'angulartics2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
declare var pdfMake: any;
declare var buildPdf: any;

import { PersonalDescriptionComponent } from '../content/personal/personal-description/personal-description.component'


@Component(
{
    selector: 'app-resume-main',
    templateUrl: './resume-main.component.html',
    styleUrls: ['./resume-main.component.css','./resume-main-ball.component.css','../shared-resources-css/paper-properties.css','../shared-resources-css/left-panel.css']
})

export class ResumeMainComponent implements ComponentCanDeactivate {

    public myForm: FormGroup;
    private resumetype: number = 1;
    private paper: string;
    private sub: any;
    private signup: string;
    public edu_show: boolean = false;
    public jobs_show: boolean = false;
    public involvements_show: boolean = false;
    public personal_show: boolean = false;
    private notchanged: boolean = true;
    private paper_size : number = 1000;
    public exceed_page: boolean = false;
    public ignore_warning: boolean = false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private contentService: ResumeContentService,
        private modalService: NgbModal,
        private elementRef: ElementRef,
        private postRequestService: PostRequestService,
        private printService: PrintService,
        private localStorageService: LocalStorageService,
        private alertExceedService: AlertExceedService,
        public angulartics2fb: Angulartics2Facebook,
        public angulartics2ga: Angulartics2GoogleAnalytics
    ) {

        this.myForm = this.fb.group({
            fullname: new FormControl(''),
            email: new FormControl(''),
            address: new FormControl(''),
            phone: new FormControl(''),
            resumetype: 1
        });

        this.myForm.addControl('jobs', JobsComponent.buildItems())
        this.myForm.addControl('education', EducationFormComponent.buildItems())
        this.myForm.addControl('involvement', InvolvementsComponent.buildItems())
        this.myForm.addControl('personal', PersonalComponent.buildItems())
        this.paper_size = this.contentService.getPaperSize()

        this.angulartics2fb.eventTrack('ViewContent','create')
        this.angulartics2ga.pageTrack('create')

    }

    @ViewChild('mainScreen') elementView: ElementRef;
    viewHeight: number;

    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
        return this.contentService.GetNotChanged()
    }

    resumeType(num) {
        console.log(num)
        if (num === 2) {
            this.myForm.patchValue({ resumetype: 2 });
        } else if (num === 1) {
            this.myForm.patchValue({ resumetype: 1 });
        }
    }

    ngAfterViewInit() {
        this.myForm.valueChanges.subscribe(data => {
            this.viewHeight = this.elementView.nativeElement.scrollHeight;
            //this.contentService.notifyOther(this.viewHeight);
            this.contentService.setContent(data);

            //this.setNotChanged(false)

            if ((data.education[0] !== undefined) || (data.education[0] != null) || (data.education[0] != "undefined")) {
                this.edu_show = true;
            }
            if ((data.education[0] === undefined) || (data.education[0] == null) || (data.education[0] == "undefined")) {
                this.edu_show = false;
            }
            if ((data.jobs[0] !== undefined) || (data.jobs[0] != null) || (data.jobs[0] != "undefined")) {
                this.jobs_show = true;
            }
            if ((data.jobs[0] === undefined) || (data.jobs[0] == null) || (data.jobs[0] == "undefined")) {
                this.jobs_show = false;
            }
            if (!this.ignore_warning){
                if (this.viewHeight >= this.paper_size) {
                    this.exceed_page = true;
                    console.log("Page Alert - Height", this.viewHeight);
                } else {
                    this.exceed_page = false;
                }
            }
            if ((data.involvement[0] !== undefined) || (data.involvement[0] != null) || (data.involvement[0] != "undefined")) {
                this.involvements_show = true;
            }
            if ((data.involvement[0] === undefined) || (data.involvement[0] == null) || (data.involvement[0] == "undefined")) {
                this.involvements_show = false;
            }
            if ((data.personal[0] !== undefined) || (data.personal[0] != null) || (data.personal[0] != "undefined")) {
                this.personal_show = true;
            }
            if ((data.personal[0] === undefined) || (data.personal[0] == null) || (data.personal[0] == "undefined")) {
                this.personal_show = false;
            }

        })
    }

    removeAlert() {
        this.exceed_page = false
    }

    mute(): void {
        this.ignore_warning = true;
        this.removeAlert();
    }

    save() { 
        this.contentService.setContent(this.myForm.value);
        this.contentService.SetNotChanged(true)
        const modalRef = this.modalService.open(PrintPayComponent, { keyboard: false });
        modalRef.componentInstance.name = this.myForm.value.fullname;
    }

    print(): void {
        console.log(this.myForm.value.resumetype)
        this.printService.generatePDF('print', this.myForm, this.myForm.value.resumetype);
    }

    preview(): void {
        this.printService.generatePDF('preview', this.myForm, this.myForm.value.resumetype);
    }

    calculateLength(event: any) {
      //   this.contentService.SetNotChanged(false)
    }

}

