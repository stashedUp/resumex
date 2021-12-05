import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription';
import { ResumeContentService } from '../../../../../services/resume-content/resume-content.service';


@Component({
  selector: 'app-activity-description',
  templateUrl: './activity-description.component.html',
  styleUrls: ['./activity-description.component.css']
})

export class ActivityDescriptionComponent {
  private help: any[] = []
  public exceed: boolean = false;
  public categories: any[] = []
  public social_chair: any[] = []
  public treasurer: any[] = []
  public secretary: any[] = []
  public vice_president: any[] = []
  public president: any[] = []
  public webmaster: any[] = []
  public res_life: any[] = []
  public stu_life: any[] = []
  public stu_sen: any[] = []
  public admission: any[] = []
  public mentor: any[] = []
  public greek_life: any[] = []

  @Input()
  public index: number;

  @Input()
  public description: FormGroup;


  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();

  @Output() 
  public notifyactivitydesc: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  private subscription: Subscription

  constructor(
    private fb: FormBuilder,
    private contentService: ResumeContentService,
  ) { 
    this.categories =[
      "Social Chair",	
      "Treasurer",	
      "Secretary",
      "Vice President",	
      "President",	
      "Webmaster",	
      "Residence Life",	
      "Student Life", 	
      "Student Senate",	
      "Admission",	
      "Mentor",	
      "Greek Life"
    ]

    this.social_chair = [
      "Organized social events that highlight the organization. ",
      "Organized  large-scale gala that doubles as a fundraiser for XYZ. ", 
      "Promote the fun side of my organization. ",
      "Responsible for attending other events on behalf of XXX. This raises the visibility of the organization overall and allows XXX to network with people from other groups. This increased membership within the group. ",
      "Put together, present and maintain the social calendar for the XYZ.  Responsible for presenting the calendar and getting approval on the events are planned and chosen from other senior group members. Responsible for changes that occur as the year goes on. ",
      "Revitalized group’s social media presence, including the addition of Twitter and YouTube, leading to improved member involvement. "
    ]
    this.treasurer = [
      "Prepare budgets and approve budget expenditures. ",
      "Oversees	club	finances,	collects	dues,	and	receives	other	monies,	e.g.	proceeds	from	tickets. ",
      "Completed and submitted the annual	financial	report to	the	Communities	Team each	year by the	stated deadline. ",
      "Assisted	the	president	and	other	officers in preparing	program	budgets	and	financial	controls. ",
      "Prepared	and	submittd	financial	statements to	the	president	and	the	executive	committee	and	board	of directors on	a	regular	basis. "
    ]
    this.secretary  = [
      "Provided administrative support for council that included coordinating calendars; arranging travel; and creating reports, spreadsheets, PowerPoint presentations and board meeting minutes. ",
      "Composed, typed, distributed daily reports and routine correspondences. ",
      "Collected and coordinated the flow of internal and external information. ",
      "Managed office equipment and office space. ",
      "Established the administrative work procedures for tracking staffs daily tasks. ",
      "Prepared and organized paperwork and other materials as needed for meetings, conferences, travel arrangements and expenses reports. ",
      "Maintained office scheduling and event calendars. ",
      "Composed, typed, and distributed meeting agendas and minutes, routine correspondences and reports. ",
      "Set up and handled incoming mail and office filing systems. ",
      "Collected and coordinated the flow of internal and external information. ",
      "Managed office equipment and office space. ",
      "Established the administrative work procedures for tracking staff’s daily tasks. "
    ]
    this.vice_president  = [
      "Reserved venues, organize refreshment and printed publicity for presentations. ",
      "Organized presentations by external speakers. ",
      "Communicated with external speakers from XYZ and ABC. ",
      "Used and informed other regional officers about technological resources available through the Office of Alumni Relations. ",
      "Assisted the president and other officers in preparing program budgets and financial controls. "
    ]
    this.president  = [
      "Direct, plan, or implement policies, objectives, or activities of organizations or businesses to ensure continuing operations, to maximize returns on investments, or to increase productivity. ",
      "Analyze operations to evaluate performance of a company or its staff in meeting objectives or to determine areas of potential cost reduction, program improvement, or policy change. ",
      "Direct, plan, or implement policies, objectives, or activities of organizations or businesses to ensure continuing operations, to maximize returns on investments, or to increase productivity. ",     
      "Prepare budgets for approval, including those for funding or implementation of programs. ",     
      "Confer with board members, organization officials, or staff members to discuss issues, coordinate activities, or resolve problems. ",    
      "Direct or coordinate activities of businesses or departments concerned with production, pricing, sales, or distribution of products. ",    
      "Review reports submitted by staff members to recommend approval or to suggest changes. ",   
      "Led monthly all-group meetings, and bi-weekly leadership meetings. ",
      "Instituted new marketing plan to overhaul recruitment practices resulting in 45% increase in membership. ",
      "Assisted in developing strategic plan which included, ______, ______, and ______. ",
      "During two year tenure, increased member participation in ____ by ____%. ",
      "Mediated member disagreements, particularly related to allocation of funds. ",
      "Represented group on various campus-wide committees to advocate for ______ issues. ",
      "Communicated regularly with other student organizations, administrative offices, faculty and community members. ",
      "Recognized as an approachable, fair, professional leader. ",
      "Coordinated logistics for annual student conference in _________. ",
      "Acted as emcee for ____ fundraiser which raised over $____ for ______. ",
      "Generated discussion topics for weekly brown bag lunch series. ",
      "Identified and secured speakers for _______ event. "
    ]
    this.webmaster  = [
      "Publicized club activities through email, social media and the club website. ",
      "Developed and maintained club website and social media sites. ",
      "Used and informed other regional officers about technological resources available through the Office of Alumni Relations. ",
      "Help the club with any technological issues. ",
      "Revitalized group’s social media presence, including the addition of Twitter and YouTube, leading to improved member involvement. "
    ]
    this.res_life  = [
      "Designed and delivered wide range of programming options for residents, resulting in 5% increase in student participation over previous year. ",
      "Participated in extensive safety training and on-going professional development. ",
      "Acted as mediator for residents and helped identify practical solutions for disagreements. ",
      "Maintained professionalism during emergency situations, being careful to implement standard protocols. ",
      "Referred students to appropriate on-campus and off-campus resources as needed. ",
      "Collaborated regularly with fellow RAs to ensure safe, respectful, fun, inclusive living environment. ",
      "Processed and recorded all requests for maintenance repairs or custodial needs. ",
      "Communicated with administrators, staff, faculty and community members in person, by phone, and through written correspondence. ",
      "Recognized as approachable and energetic by residents, peers, staff, and administrators. ",
      "Oversaw logistics for various programs, including securing venues, ordering food, coordinating schedules, and implementing marketing strategies. ",
      "Organized collaborative hall events to raise awareness about sustainability efforts. ",
      "Assisted with move-in day activities; welcomed freshmen and their families. ",
      "Respond promptly and professionally to all resident concerns. "
    ]
    this.stu_life  = [
      "Marketed the university by leading campus tours; encouraged Q&A with potential students and parents. ",
      "Created this program to assist international students with their transition from their home country to the United States. ",
      "Made detailed oral and written presentations on curricular reform actions in public student forums. ",
      "Set goals and guidelines for the first two years of XYZ University’s innovative, comprehensive honors program whose mission is to increase intellectual engagement and academic rigor in students’ freshman and sophomore years. ",
      "Worked professionally with diverse range of patrons, including faculty, donors, board members, alumni, students and general public. "
    ]
    this.stu_sen  = [
      "Apportion funds to XYZ organizations to bring speakers to campus. Manage over $10,000 annually. ",
      "Selected to participate in peer-leadership, team-building, and multicultural-conscientiousness workshops; mentored incoming new students; aided coordinators with new student orientation events and training of other leaders. ",
      "Appointed by Student Government Association Executive Committee, as member of Social Integrity Board. Arbitrate and sanction students in violation of XYZ Student Code of Conduct. Coordinate delivering injunctions to students in both hearings and written form. Conduct cases in collaboration with Residential Life, and review campus honor codes. ",
      "Chaired 60-member body representing each academic department and student perspectives on curricular issue. "
    ]
    this.admission = [
      "Represented university to campus visitors, including prospective students, parents, alumni and community members. ",
      "Answered questions about ____ College and local community. ",
      "Wrote original content for Admissions Blog, read by prospective students and parents. ",
      "Helped set up for special visit days and Admissions events. ",
      "Entered data into Banner database, maintaining accuracy and strict confidentiality. ",
      "Answered phones and called prospective students. ",
      "Participated in regular staff meetings. ",
      "Offered suggestions for improving campus tour procedure, all of which were adopted. ",
      "Consistently recognized by visitors for providing engaging and interesting campus tours. ",
      "Trained new student workers, both on the job and during week-long training. ",
      "Provided front desk coverage as needed. ",
      "Performed variety of administrative tasks, including filing, photocopying, faxing, checking and sending emails, preparing mass mailings. ",
      "Revitalized group’s social media presence, including the addition of Twitter and YouTube, leading to improved member involvemen. "
    ]
    this.mentor  = [
      "Explained complex concepts using easy-to-understand terms. ",
      "Worked with students aged ___ to ____. ",
      "Developed action plans based on students’ and educators’ academic goals. ",
      "Communicated with parents and teachers to update them on student progress. ",
      "Worked closely with five high school math students to increase comprehension and grades resulting in an average of 1.2 point increase in GPA. ",
      "Participated in annual mandatory training sessions and voluntary training workshops offered by Tutoring Center. ",
      "Coordinated schedules with 8 students to provide weekly tutoring session. ",
      "Assisted in training new tutors, including review of documentation procedures and confidentiality policy. ",
      "Taught theory of ____, including concepts of ____, ____ and ____. ",
      "Work effectively with students with diverse learning needs and cultural backgrounds. "
    ]
    this.greek_life  = [
      "Oversaw and executed recruitment process; created public relations plan for the year and successfully increase recruitment quota from ___ to ____. ",
      "Collaborated with membership chairs of other sororities to coordinate recruitment process. ",
      "Oversaw $_____ budget; coordinated with President in allocating funds responsibly throughout academic year. ",
      "Spearheaded university’s first Leadership Speaker Series; enlisted help of alumni and local professionals to share their leadership expertise. ",
      "Organized several philanthropic events, both on campus and in community, successfully raising over $____ for local charities. ",
      "Commissioned to design logo for InterFraternity Council’s stop smoking initiative. ",
      "Used Java and MySQL to develop a voting system to enable members to anonymously vote on fraternity business. ",
      "Re-designed fraternity’s website using PHP and Flash resulting in __% increase in web traffic. ",
      "Participated in diversity and cultural sensitivity training. ",
      "Served as member of chapter’s Honor Board. ",
      "Ensured that all standing rules and bylaws, as well as national rules, were adhered to consistently. ",
      "Mentored all fraternity members on personal goal setting and academic prioritization resulting in fraternity achieving top campus-wide rank for academic performance for the first time in its history. ",
      "Used and informed other regional officers about technological resources available through the Office of Alumni Relations. ",
      "Worked professionally with diverse range of patrons, including faculty, donors, board members, alumni, students and general public. "
    ]

    this.help = this.social_chair;

    // if(localStorage.getItem('tenaga') && localStorage.getItem('tenaga')==='1'){
    //     this.help.pop();
    //     this.help.push(
    //       "Mentored all fraternity members on personal goal setting and academic prioritization resulting in fraternity achieving top campus-wide rank for academic performance for the first time in its history. ",
    //       "Marketed the university by leading campus tours; encouraged Q&A with potential students and parents. ",
    //       "Created this program to assist international students with their transition from their home country to the United States. ",
    //       "Made detailed oral and written presentations on curricular reform actions in public student forums. ",
    //       "Set goals and guidelines for the first two years of XYZ University’s innovative, comprehensive honors program whose mission is to increase intellectual engagement and academic rigor in students’ freshman and sophomore years. ",
    //       "Taught third grade students various religious topics using class discussion, games, and handouts to keep students engaged. ",
    //       "Received award for Outstanding Student Employee of the Year due to excellent customer service and research skill. ",
    //       "Designed a presentation, published to University website, outlining how to most effectively use all of ABC University's library facilities when undertaking a research project. "
    //     )
    // }
  }
 
  onSelect(val){
   
        switch(val) { 
          case "Social Chair": {
            this.help = this.social_chair;
             break;    
          } 
          case "Treasurer": { 
            this.help = this.treasurer;
             break; 
          } 
          case "Secretary": { 
            this.help = this.secretary;
             break; 
          }
          case "Vice President": { 
            this.help = this.vice_president;
             break; 
          }  
          case "President": { 
            this.help = this.president;
             break; 
          }    
          case "Webmaster": { 
            this.help = this.webmaster;
             break; 
          } 
          case "Residence Life": { 
            this.help = this.res_life;
             break; 
          } 
          case "Student Life": { 
            this.help = this.stu_life;
             break; 
          }
          case "Admission": { 
            this.help = this.admission;
             break; 
          }  
          case "Mentor": { 
            this.help = this.mentor;
             break; 
          }  
          case "Greek Life": { 
            this.help = this.greek_life;
             break; 
          }  
          default: { 
            this.help = this.social_chair;
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
    //       this.notifyactivitydesc.emit(this.exceed)
    //     } else {
    //       this.exceed = false;
    //       this.notifyactivitydesc.emit(this.exceed)
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
  
  static buildItem(inv?: any) {
    return new FormGroup({
      brief_description: new FormControl(inv)
    })
  }
}


