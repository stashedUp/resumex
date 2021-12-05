import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription';
import { ResumeContentService } from '../../../services/resume-content/resume-content.service';

@Component({
  selector: 'app-personal-description',
  templateUrl: './personal-description.component.html',
  styleUrls: ['./personal-description.component.css']
})
export class PersonalDescriptionComponent {
  private help: any[] = []
  public exceed: boolean = false;


  @Input()
  public index: number;

  @Input()
  public personal: FormGroup;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();

  @Output() 
  public notify: EventEmitter<boolean> = new EventEmitter<boolean>();


  private subscription: Subscription


  constructor(
    private fb: FormBuilder,
    private contentService: ResumeContentService,
  ) { 
    this.help = [
      "I enjoy rock climbing, hiking, theatre, traveling, TED Talks. ",
      "Favorite Reads: Don Quixote by Miguel de Cervantes, Dante’s Inferno by Dante Alighieri. ",
      "Favorite Reads: The Economist, The Black Swan: The Impact of the Highly Improbable, Nassim Taleb; Capital in the Twenty-First Century, Piketty. ",
      "Volunteer Business English & Interview Coaching 2013-15: prepared young professionals for job interviews in English. ",
      "English (mother tongue), Mandarin (conversant). ",
      "Eagle Scout: Achieved highest qualification in Boy Scouting; Involved in Scouting from the ages of six to eighteen. ",
      "More suggestions when you sign up..."
    ]
    if(localStorage.getItem('tenaga') && localStorage.getItem('tenaga')==='1'){
      this.help.pop();
      this.help.push(
        "Lifelong Runner: High school cross country team member, regular participant in 5k and 10k races, half-triathlons in 2012, 2013",
        "Awarded Best Advertising Campaign Proposal for Health & Wellness Committee, State University, Spring 20XX. ",
        "ACM International Collegiate Programming Contest (sponsored by IBM) 3rd and 8th in Asia Regional Contest in 1998 and 97 respectively. ",
        "International Olympiad in Mathematics Silver Medal, Bronze Medal in 2015 and 2016. "
      )
    }
  }

  calculateLength(event: any) {
    this.contentService.SetNotChanged(false)
    // this.subscription = this.contentService.notifyObservable$.subscribe((res) => {
    //   if (res) {
    //     if (res >= this.contentService.getPaperSize()) {
    //       this.exceed = true;
    //       this.notify.emit(this.exceed)
    //     } else {
    //       this.exceed = false;
    //       this.notify.emit(this.exceed)
    //     }
    //   }
    // });
  }

  addToBox(stmt) {
    let val = ""
    if (this.personal.controls.personal_details.value) {
      val = this.personal.controls.personal_details.value + stmt;
    } else {
      val = val + stmt;
    }
    this.personal.patchValue({ personal_details: val });
  }

  static buildItem(personal_info?: any) {
    return new FormGroup({
      personal_details: new FormControl(personal_info)
    })
  }
}
