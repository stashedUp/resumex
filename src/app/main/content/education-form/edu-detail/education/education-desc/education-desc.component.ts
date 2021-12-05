import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription';
import { ResumeContentService } from '../../../../../services/resume-content/resume-content.service';

@Component({
  selector: 'app-education-desc',
  templateUrl: './education-desc.component.html',
  styleUrls: ['./education-desc.component.css']
})
//EducationDescComponent
export class EducationDescComponent {
  private help: any[] = []
  public exceed: boolean = false;
  public categories: any[] = []
  public undergrad: any[] = []
  public grad: any[] = []
  public honor: any[] = []

  @Input()
  public index: number;

  @Input()
  public description: FormGroup;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();

  @Output() 
  public notifyedudesc: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  private subscription: Subscription

  constructor(
    private fb: FormBuilder,
    private contentService: ResumeContentService,
  
  ) {
    this.categories = [
      "Undergraduate Student",
      "Honor Student",
      "Graduate Student"   
    ]

    this.undergrad = [
      "Presidential Scholarship for Academic Excellence recipient, total award in the top 10th percentile. ", 
      "3.59/4.0 Cumulative GPA - Cum Laude. ", 
      "Dean's List - Fall 20XX, Spring 20XX. ", 
      "Awarded Best Advertising Campaign Proposal for A Foundation, ABC Communications, Summer 20XX. ",  
      "Study Abroad: Bogota, Colombia - January 20XX. ", 
      "Double Majors: English and Latin American Studies. ", 
      "Published in school's newspaper editorial. "
    ]

    this.grad = [
      "Capstone Thesis: Comprehensive Stormwater Management Plans on University Campuses: Challenges and Opportunities, ",
      "Researched and presented to policymakers several successful school design and construction projects to support the Administration Schools as Centers of Community proposal. ",
      "Coursework: Issues in Environmental Studies, Energy and the Environment, Green Design and the City. ",
      "“Brownfield” Policy, Environmental Health, Urban Redevelopment, Raster and Vector Geographic Information Systems (GIS), Sustainability on Penn’s Campus, Research Methods, Environmental Economics, Stormwater Management in Philadelphia. "
    ]

    this.honor = [
      "Overall GPA 3.875; Honors each semester. ",
      "Awarded Best Advertising Campaign Proposal for A Foundation, ABC Communications, Summer 20XX. "
    ]

    this.help = this.undergrad;

  }

  onSelect(val){
    
        switch(val) { 
          case "Undergraduate Student": {
            this.help = this.undergrad;
             break;    
          } 
          case "Graduate Student": { 
            this.help = this.grad;
             break; 
          } 
          case "Honor Student": { 
            this.help = this.honor;
             break; 
          }
          default: { 
            this.help = this.undergrad;
             break;              
          } 
        }
  }

  calculateLength(event: any) {
    this.contentService.SetNotChanged(false)
    // this.subscription = this.contentService.notifyObservable$.subscribe((res) => {
    //   if (res) {
    //     if (res >= this.contentService.getPaperSize()) {
    //       this.exceed = true;
    //       this.notifyedudesc.emit(this.exceed)
    //     } else {
    //       this.exceed = false;
    //       this.notifyedudesc.emit(this.exceed)
    //     }
    //   }
    // });
  }

  addToBox(stmt) {
    let val = ""
    if (this.description.controls.brief_description.value) {
      val = this.description.controls.brief_description.value + stmt;
    } else {
      val = val + stmt;
    }
    this.description.patchValue({ brief_description: val });
  }

  static buildItem(edu?: any) {
    return new FormGroup({
      brief_description: new FormControl(edu)
    })
  }
}



