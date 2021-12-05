import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { EduDetailComponent } from './edu-detail/edu-detail.component'
import { Education } from '../../interfaces/user';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.css']
})

export class EducationFormComponent {

  public edus: Education;

  @Input()
  public itemsFormArray: FormArray;
  
  addItem() {
    this.itemsFormArray.push(EduDetailComponent.buildItem())
  }

  static buildItems(edu_form?:any) {
    return new FormArray(
      [EduDetailComponent.buildItem(edu_form)]
    )
  }
}




