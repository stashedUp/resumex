import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { BriefDescriptionComponent } from './job-detail/brief-description/brief-description.component'
import { SelectModule } from 'angular2-select';
import { Job } from '../../../interfaces/user';
import { ResumeContentService } from '../../../services/resume-content/resume-content.service';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css']
})

export class JobDescriptionComponent{
  @Input()
  public index: number;

  @Input()
  public job: FormGroup;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();
    
  public months:any= [];
  public start_years = [];
  public end_years = [];
  public monthPlaceHolder:string = "Select Month";
  public yearPlaceHolder:string = "Select Year";
  public present:boolean = false;

  private static present: boolean;

  //public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contentService: ResumeContentService,   
 
  ) {
      this.months = [
        {value: 'Jan', label: 'January'},
        {value: 'Feb', label: 'February'},
        {value: 'Mar', label: 'March'},
        {value: 'Apr', label: 'April'},
        {value: 'May', label: 'May'},
        {value: 'Jun', label: 'June'},
        {value: 'Jul', label: 'July'},
        {value: 'Aug', label: 'August'},
        {value: 'Sep', label: 'September'},
        {value: 'Oct', label: 'October'},
        {value: 'Nov', label: 'November'},
        {value: 'Dec', label: 'December'}
    ];

    for (var _i= 2022; _i > 1980; _i-- ){
      this.start_years.push({value:String(_i), label:String(_i)})
    }

    for (var _i= 2023; _i > 1980; _i-- ){
      this.end_years.push({value:String(_i), label:String(_i)})
    }

    // this.job = this.fb.group({
    //   present: new FormControl('')
    // });

  }

  public onSaveCheckBoxChanged(value:boolean){
    this.present = value;
    // console.log(this.present)
    // console.log("clicking")
    // console.log(this.job.controls.present.value)
    // console.log("clicking")
    // this.job.patchValue({ present: value });
    // this.job.value.present = value;
    // console.log("clicking")
  }

  calculateLength(event: any) {
    this.contentService.SetNotChanged(false)
  }

  onSingleSelected(event: any){
    this.end_years = [];
    for (var _i= 2023; _i >= event.value; _i-- ){
      this.end_years.push({value:String(_i), label:String(_i)})   
    }
  }


  static buildItem(job_form?: Job) {

    let company = ''
    let company_location = ''
    let job_title = ''
    let start_month = ''
    let start_year = ''
    let end_month = ''
    let end_year =  ''
    let present = false;
    let job_description = []
    let job_desc_arr = [BriefDescriptionComponent.buildItem()];
    

    if (job_form){

      company = job_form.company;
      company_location = job_form.company_location;
      job_title = job_form.job_title;
      start_month = job_form.start_month;
      start_year = job_form.start_year;
      end_month = job_form.end_month;
      end_year = job_form.end_year; 
      present = job_form.present; 
      job_description = job_form.job_description; 
      

      if(job_description && job_description.length>0){
        job_desc_arr.splice(0);
        for(let jobs of job_description){
          job_desc_arr.push(BriefDescriptionComponent.buildItem(jobs.brief_description))
        }
      }
    }

    return new FormGroup({
      company: new FormControl(company),
      company_location: new FormControl(company_location),
      job_title: new FormControl(job_title),
      start_month: new FormControl(start_month),
      start_year: new FormControl(start_year),
      end_month: new FormControl(end_month),
      end_year: new FormControl(end_year),
      present: new FormControl(present),
      job_description: new FormArray(
        job_desc_arr
      )
    })
  }
}