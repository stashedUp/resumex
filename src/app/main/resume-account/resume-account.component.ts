import { HostListener, ElementRef, ViewChild, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrintPayComponent } from '../print-pay/print-pay.component';
import { Subscription } from 'rxjs/Subscription';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

//services
import { Router, ActivatedRoute, Params, NavigationStart } from '@angular/router';
import { ResumeContentService } from '../services/resume-content/resume-content.service';
import { GetRequestService } from '../services/http/get-request.service';
import { PrintService } from '../services/print/print.service';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { AlertsService } from '../services/alerts/alerts.service';
import { AlertExceedService } from '../services/alert-exceed/alert-exceed.service';

import { PostRequestService } from '../services/http/post-request.service';
import { NewWindowService } from '../services/new-window/new-window.service';
//jobs 
import { JobDescriptionComponent } from '../content/jobs/job-description/job-description.component'
import { JobsComponent } from '../content/jobs/jobs.component'
//involvement
import { ActivitiesComponent } from '../content/involvements/activities/activities.component'
import { InvolvementsComponent } from '../content/involvements/involvements.component'
//education
import { EduDetailComponent } from '../content/education-form/edu-detail/edu-detail.component'
import { EducationFormComponent } from '../content/education-form/education-form.component'
//personal
import { PersonalDescriptionComponent } from '../content/personal/personal-description/personal-description.component'
import { PersonalComponent } from '../content/personal/personal.component'

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Observable } from 'rxjs/Observable';

import { ComponentCanDeactivate } from '../services/guards/pending-changes.guard';
import { ShareResumeComponent } from '../share-resume/share-resume.component';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

declare var pdfMake: any;
declare var buildPdf: any;

@Component(
    {
        selector: 'app-resume-account',
        templateUrl: './resume-account.component.html',
        styleUrls: ['./resume-account.component.css', './resume-account-ball.component.css','../shared-resources-css/paper-properties.css', '../shared-resources-css/left-panel.css']
    })
export class ResumeAccountComponent implements OnInit,ComponentCanDeactivate {

    public myForm: FormGroup;
    public StudentType: boolean = true;
    public ProfessionalType: boolean = false;
    private resumetype: number = 1;
    public user: any;
    public test: any[];
    public resumeID: string;
    private content: string;
    private sub: any;
    public nativeWindow: any;
    public edu_show: boolean = false;
    public jobs_show: boolean = false;
    public involvements_show: boolean = false;
    public personal_show: boolean = false;
    private notchanged: boolean = true;
    private paper_size : number = 1000;
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public exceed_page: boolean = false;
    public ignore_warning: boolean = false;
 
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private contentService: ResumeContentService,
        private modalService: NgbModal,
        private elementRef: ElementRef,
        private getRequestService: GetRequestService,
        private printService: PrintService,
        private authenticationService: AuthenticationService,
        private postRequestService: PostRequestService,
        private winRef: NewWindowService,
        private alertService: AlertsService,
        private alertExceedService: AlertExceedService,
        private localStorageService: LocalStorageService,
    ) {
        this.nativeWindow = winRef.getNativeWindow();
        this.myForm = this.fb.group({
            fullname: new FormControl(''),
            email: new FormControl(''),
            address: new FormControl(''),
            phone: new FormControl(''),
            resume_id: new FormControl(''),
            resumetype: new FormControl(1),
            education: this.fb.array([
            ]),
            jobs: this.fb.array([
            ]),
            involvement: this.fb.array([
            ]),
            personal: this.fb.array([
            ])
        });

        this.myForm.addControl('jobs', JobsComponent.buildItems())

        this.paper_size = this.contentService.getPaperSize()
    }

    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
        return this.contentService.GetNotChanged()
    }

    @ViewChild('mainScreen') elementView: ElementRef;
    viewHeight: number;

    ngOnInit() {
        this.myForm = this.fb.group({
            fullname: new FormControl(''),
            email: new FormControl(''),
            address: new FormControl(''),
            phone: new FormControl(''),
            resume_id: new FormControl(''),
            resumetype: new FormControl(1),
            education: this.fb.array([
            ]),
            jobs: this.fb.array([
            ]),
            involvement: this.fb.array([
            ]),
            personal: this.fb.array([
            ])
        });

        this.route.params.forEach(params => {
            let userId = params["content"];
            //call your function, like getUserInfo()
            if (userId === "new") {
                console.log("restarting creating new resume")
            }
        })
        this.sub = this.route.params.subscribe(params => {
            this.content = params['content']

            //this.resetComponentState()
            // if (params instanceof NavigationStart) {
            // }
            
            if (this.content === "new") {
                this.resumeID = null
                this.contentService.SetResumeID(this.resumeID);
                this.myForm = this.fb.group({
                    fullname: new FormControl(''),
                    email: new FormControl(''),
                    address: new FormControl(''),
                    phone: new FormControl(''),
                    resume_id: new FormControl(''),
                    resumetype: new FormControl(1),
                    education: this.fb.array([
                    ]),
                    jobs: this.fb.array([
                    ]),
                    involvement: this.fb.array([
                    ]),
                    personal: this.fb.array([
                    ])
                });
            } else if (this.content) {
                this.myForm = this.fb.group({
                    fullname: new FormControl(''),
                    email: new FormControl(''),
                    address: new FormControl(''),
                    phone: new FormControl(''),
                    resume_id: new FormControl(''),
                    resumetype: new FormControl(1),
                    education: this.fb.array([
                    ]),
                    jobs: this.fb.array([
                    ]),
                    involvement: this.fb.array([
                    ]),
                    personal: this.fb.array([
                    ])
                });
                this.getVersionResume(this.content)
            } else {
                this.getInitResume();
            }
        });
    }

    resumeType(num):void {
        if (num === 2) {
            this.myForm.patchValue({ resumetype: 2 });
        } else if (num === 1) {
            this.myForm.patchValue({ resumetype: 1 });
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    ngAfterViewChecked() {
        this.myForm.valueChanges
           // .takeUntil(this.ngUnsubscribe)
            .subscribe(data => {
                this.viewHeight = this.elementView.nativeElement.offsetHeight;
                //this.contentService.notifyOther(this.viewHeight);
                
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
                if (!this.ignore_warning) {
                    if (this.viewHeight >= this.paper_size) {
                        this.exceed_page = true;
                        console.log("Page Alert - Height", this.viewHeight);
                    // this.alertExceedService.error('', false);
                    } else {
                        this.exceed_page = false;
                        //this.alertExceedService.clear();
                    }
                }
                if ((data.involvement[0] !== undefined) || (data.involvement[0] != null) || (data.involvement[0] != "undefined")) {
                    this.involvements_show = true;
                }
                if ((data.involvement[0] === undefined) || (data.involvement[0] == null) || (data.involvement[0] == "undefined")) {
                    this.involvements_show = false;
                }
                if ((data.personal[0] !== undefined) || (data.personal[0] != null) || (data.personal[0] !== "undefined")) {
                    this.personal_show = true;
                }
                if ((data.personal[0] === undefined) || (data.personal[0] == null) || (data.personal[0] == "undefined")) {
                    this.personal_show = false;
                }

            })
    }

    getInitResume() {
        this.getRequestService
            .getInitResume()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(user => {
                this.user = user;
                console.log(this.user.resumetype)
                this.setResumeID(this.user.resume_id)
                this.myForm.patchValue({ resume_id: this.user.resume_id });
                this.myForm.patchValue({ fullname: this.user.fullname });
                this.myForm.patchValue({ email: this.user.email });
                this.myForm.patchValue({ phone: this.user.phone });
                this.myForm.patchValue({ address: this.user.address });
                this.myForm.patchValue({ resumetype: this.user.resumetype });
                if (this.user.education && this.user.education.length > 0) {
                    let controlArray = <FormArray>this.myForm.controls['education'];
                    for (let edu of this.user.education) {
                        controlArray.push(EduDetailComponent.buildItem(edu));
                    }
                }
                if (this.user.jobs && this.user.jobs.length > 0) {
                    let controlArray = <FormArray>this.myForm.controls['jobs'];
                    for (let job of this.user.jobs) {
                        controlArray.push(JobDescriptionComponent.buildItem(job));
                    }
                }
                if (this.user.involvement && this.user.involvement.length > 0) {
                    let controlArray = <FormArray>this.myForm.controls['involvement'];
                    for (let inv of this.user.involvement) {
                        controlArray.push(ActivitiesComponent.buildItem(inv));
                    }
                }
                if (this.user.personal && this.user.personal.length > 0) {
                    let controlArray = <FormArray>this.myForm.controls['personal'];
                    for (let info of this.user.personal) {
                        controlArray.push(PersonalDescriptionComponent.buildItem(info.personal_details));
                    }
                }
            });
    }

    getVersionResume(resume_id) {
        this.getRequestService
            .getVersionResume(resume_id)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(user => {
                this.user = user;
                console.log(this.user.resumetype)
                this.setResumeID(this.user.resume_id)
                this.myForm.patchValue({ resume_id: this.user.resume_id });
                this.myForm.patchValue({ fullname: this.user.fullname });
                this.myForm.patchValue({ email: this.user.email });
                this.myForm.patchValue({ phone: this.user.phone });
                this.myForm.patchValue({ address: this.user.address });
                this.myForm.patchValue({ resumetype: this.user.resumetype });
                if (this.user.education && this.user.education.length > 0) {
                    let controlArray = <FormArray>this.myForm.controls['education'];
                    for (let edu of this.user.education) {
                        controlArray.push(EduDetailComponent.buildItem(edu));
                    }
                }
                if (this.user.jobs && this.user.jobs.length > 0) {
                    let controlArray = <FormArray>this.myForm.controls['jobs'];
                    for (let job of this.user.jobs) {
                         controlArray.push(JobDescriptionComponent.buildItem(job));
                    }
                }
                if (this.user.involvement && this.user.involvement.length > 0) {
                    let controlArray = <FormArray>this.myForm.controls['involvement'];
                    for (let inv of this.user.involvement) {
                        controlArray.push(ActivitiesComponent.buildItem(inv));
                    }
                }
                if (this.user.personal && this.user.personal.length > 0) {
                    let controlArray = <FormArray>this.myForm.controls['personal'];
                    for (let info of this.user.personal) {
                        controlArray.push(PersonalDescriptionComponent.buildItem(info.personal_details));
                    }
                }
            });
    }

    setResumeID(resume_id) {
        this.resumeID = resume_id
        this.contentService.SetResumeID(resume_id);
    }

    getResumeID(): string {
        return this.resumeID
    }

    addJob() {
        this.myForm.addControl('jobs', JobsComponent.buildItems())
    }

    addEdu() {
        this.myForm.addControl('education', EducationFormComponent.buildItems())
    }

    addInvolvement() {
        this.myForm.addControl('involvement', InvolvementsComponent.buildItems())
    }

    addPersonal(): void {
        this.myForm.addControl('personal', PersonalComponent.buildItems())
    }

    removeAlert() {
        this.exceed_page = false
    }

    duplicate(){
        console.log(this.myForm.value) 
        this.postRequestService
                .addResume(this.myForm.value)
                .takeUntil(this.ngUnsubscribe)
                    .subscribe(result => {
                        this.contentService.SetNotChanged(true)
                        this.localStorageService.announceSavedNew(true)
                        this.resumeID = result.resume_id;
                        this.contentService.SetResumeID(this.resumeID)
                        this.router.navigate(['./user', this.resumeID]);
        });
    }

    //Save option
    save() {
        if(localStorage.getItem('tenaga') && localStorage.getItem('tenaga')==='1'){  
            if (this.resumeID) {
                console.log(this.myForm.value.resumetype) 
                this.myForm.value.resume_id = this.resumeID
                this.postRequestService
                .updateResume(this.myForm.value)
                .takeUntil(this.ngUnsubscribe)
                    .subscribe(result => {
                        if (result) {
                            if (result.cb_type === "success") {
                                this.contentService.SetNotChanged(true)
                                this.alertService.success(result.cb_message, false);
                            } else if (result.cb_type === "danger") {
                                this.alertService.error(result.cb_message, false);
                            } else {
                                this.alertService.warn('Something went wrong...', false);
                            }
                        }
                    });
            } else if (this.content === "new") { 
                this.postRequestService
                .addResume(this.myForm.value)
                .takeUntil(this.ngUnsubscribe)
                    .subscribe(result => {
                        this.contentService.SetNotChanged(true)
                        this.localStorageService.announceSavedNew(true)
                        this.resumeID = result.resume_id;
                        this.contentService.SetResumeID(this.resumeID)
                        this.router.navigate(['./user', this.resumeID]);
                    });
            }
        }else{
            this.alertService.warn('You no longer have an active subscription. Please renew your subsciption to continue', false);
        }
    }

    print(): void {
        this.printService.generatePDF('print', this.myForm, this.resumetype);
    }

    mute(): void {
        this.ignore_warning = true;
        this.removeAlert();
    }

    publish(): void {
        if(!this.resumeID){
            this.alertService.error("Please save your resume before sharing", false);
            
            return
        }
        if(!this.contentService.GetNotChanged()){
            this.alertService.error("Please save your resume before sharing", false);          
            return
        }
        const modalRef = this.modalService.open(ShareResumeComponent, { windowClass: 'centered-modal' }); 
        modalRef.componentInstance.link = "http://"+window.location.host+'/version/'+this.resumeID;       
    }
}

