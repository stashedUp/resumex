import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { EducationDescComponent } from './education-desc/education-desc.component'

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})

export class EducationComponent {

  public exceed :boolean =false;

  @Input()
  public edu: FormArray;

  addItemy() {
    this.edu.push(EducationDescComponent.buildItem())
  }

  onNotify(exceed:boolean):void {
    //alert(message);
    this.exceed = exceed
  }

}

