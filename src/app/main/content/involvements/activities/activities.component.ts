import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivityDescriptionComponent } from './activity-detail/activity-description/activity-description.component'
import { Involvement } from '../../../interfaces/user';
import { ResumeContentService } from '../../../services/resume-content/resume-content.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})

export class ActivitiesComponent{
  @Input()
  public index: number;

  @Input()
  public involvement: FormGroup;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();
    
  public months:any= [];
  public start_years = [];
  public end_years = [];
  public monthPlaceHolder:string = "Select Month";
  public yearPlaceHolder:string = "Select Year";
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

      for (var _i= 2022; _i > 1980; _i-- ){
        this.end_years.push({value:String(_i), label:String(_i)})
      }
  
  }

  calculateLength(event: any) {
    this.contentService.SetNotChanged(false)
  }

  onSingleSelected(event: any){
    this.end_years = [];
    for (var _i= 2022; _i >= event.value; _i-- ){
      this.end_years.push({value:String(_i), label:String(_i)})   
    }
  }

  static buildItem(inv_form?: Involvement) {

    let involvement_name = ''
    let position_title = ''
    let start_month = ''
    let start_year = ''
    let end_month = ''
    let end_year =  ''
    let involvement_descriptions = []
    let involvement_description_arr = [ActivityDescriptionComponent.buildItem()]

    if(inv_form){
      involvement_name = inv_form.involvement_name;
      position_title = inv_form.position_title
      start_month = inv_form.start_month
      start_year = inv_form.start_year
      end_month = inv_form.end_month
      end_year =  inv_form.end_year
      involvement_descriptions = inv_form.involvement_description

      if (involvement_descriptions && involvement_descriptions.length>0){
        involvement_description_arr.splice(0);
        for(let involve of involvement_descriptions){
          involvement_description_arr.push(ActivityDescriptionComponent.buildItem(involve.brief_description))
        }
      }
    }

    return new FormGroup({
      involvement_name: new FormControl(involvement_name),
      position_title: new FormControl(position_title),
      start_month: new FormControl(start_month),
      start_year: new FormControl(start_year),
      end_month: new FormControl(end_month),
      end_year: new FormControl(end_year),
      involvement_description: new FormArray(
        involvement_description_arr
      )
    })
  }
}
