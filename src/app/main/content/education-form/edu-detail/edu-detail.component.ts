import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { EducationDescComponent } from './education/education-desc/education-desc.component'
import { Education } from '../../../interfaces/user';
import { SelectModule } from 'angular2-select';
import { ResumeContentService } from '../../../services/resume-content/resume-content.service';


@Component({
  selector: 'app-edu-detail',
  templateUrl: './edu-detail.component.html',
  styleUrls: ['./edu-detail.component.css']
})

export class EduDetailComponent{
  @Input()
  public index: number;

  @Input()
  public edu: FormGroup;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();

  public months:any= [];
  public years = [];
  public monthPlaceHolder:string = "Select Month";
  public yearPlaceHolder:string = "Select Year";
  constructor(
    private fb: FormBuilder, 
    private contentService: ResumeContentService,
  ) {
       //https://www.npmjs.com/package/angular2-select-of#demo
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

    for (var _i= 2020; _i > 1980; _i-- ){
      this.years.push({value:String(_i), label:String(_i)})
    }
  }

  calculateLength(event: any) {
    this.contentService.SetNotChanged(false)
  }

  static buildItem(edu_form?: Education) {

      let school = ''
      let school_location = ''
      let degree = ''
      let grad_month = ''
      let grad_year = ''
      let education_description = []
      let edu_desc_arr = [EducationDescComponent.buildItem()];

      if (edu_form){
        school = edu_form.school;
        school_location = edu_form.school_location;
        degree = edu_form.degree;
        grad_month = edu_form.grad_month;
        grad_year = edu_form.grad_year;
        education_description = edu_form.education_description;
        if(education_description && education_description.length>0){
          edu_desc_arr.splice(0);
          for(let edu of education_description){
            edu_desc_arr.push(EducationDescComponent.buildItem(edu.brief_description))
          }
        }
      }
    return new FormGroup({
      school: new FormControl(school),
      school_location: new FormControl(school_location),
      degree: new FormControl(degree),
      grad_month: new FormControl(grad_month),
      grad_year: new FormControl(grad_year),
      education_description: new FormArray(
        edu_desc_arr
      )
      
    })
  }
}
