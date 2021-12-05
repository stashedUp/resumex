import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivitiesComponent } from './activities/activities.component'

@Component({
  selector: 'app-involvements',
  templateUrl: './involvements.component.html',
  styleUrls: ['./involvements.component.css']
})

export class InvolvementsComponent {

  @Input()
  public itemsFormArray: FormArray;

  addItem() {
    this.itemsFormArray.push(ActivitiesComponent.buildItem())
  }

  static buildItems(inv_form?:any) {
    return new FormArray([
        ActivitiesComponent.buildItem(inv_form)]
    )
  }
}


