import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivityDescriptionComponent } from './activity-description/activity-description.component'

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})

export class ActivityDetailComponent {

  public exceed :boolean =false;

  @Input()
  public involvement: FormArray;

  addItemy() {
    this.involvement.push(ActivityDescriptionComponent.buildItem())
  }

  onNotify(exceed:boolean):void {
    //alert(message);
    this.exceed = exceed
  }

}

