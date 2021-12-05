import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { JobDescriptionComponent } from './job-description/job-description.component'

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})

export class JobsComponent {

  @Input()
  public itemsFormArray: FormArray;

  addItem() {
    this.itemsFormArray.push(JobDescriptionComponent.buildItem())
  }

  static buildItems(job_form?:any) {
    return new FormArray(
        [JobDescriptionComponent.buildItem(job_form)]
    )
  }
}

