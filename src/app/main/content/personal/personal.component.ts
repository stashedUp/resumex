import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { PersonalDescriptionComponent } from './personal-description/personal-description.component'
import { Personal } from '../../interfaces/user';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent {

  public exceed :boolean =false;
  
  @Input()
  public itemsFormArray: FormArray;

  addItem() {
    this.itemsFormArray.push(PersonalDescriptionComponent.buildItem())
  }

  onNotify(exceed:boolean):void {
    this.exceed = exceed
  }

  static buildItems(personal_info?:any) {

    let personal_description = [];
    
    if(personal_info){
      personal_description = personal_info.personal_details;
      PersonalDescriptionComponent.buildItem(personal_description)
    }

    return new FormArray([
      PersonalDescriptionComponent.buildItem()
    ])
  }
}



