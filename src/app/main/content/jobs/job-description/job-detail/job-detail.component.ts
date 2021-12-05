import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { BriefDescriptionComponent } from './brief-description/brief-description.component'

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})

export class JobDetailComponent {

  public exceed :boolean =false;
  @Input()
  public job: FormArray;

  addItemy() {
    this.job.push(BriefDescriptionComponent.buildItem())
  }

  onNotify(exceed:boolean):void {
    //alert(message);
    this.exceed = exceed
  }

}

