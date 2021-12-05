import { ElementRef, ViewChild, Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ResumeContentService } from '../../../../../services/resume-content/resume-content.service';
import { AlertExceedService } from '../../../../../services/alert-exceed/alert-exceed.service';
//import { ResumeMainComponent } from '../../../../resume-main.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-brief-description',
  templateUrl: './brief-description.component.html',
  styleUrls: ['./brief-description.component.css'],

})

export class BriefDescriptionComponent {
  private help: any[] = []
  public exceed: boolean = false;
  public categories: any[] = [];
  public restaurant: any[] = []
  public software: any[] = []
  public finance: any[] = []
  public education: any[] = []
  public retail: any[] = []
  public marketing: any[] = []
  public sales: any[] = []
  public accounting: any[] = []
  public public_relations: any[] = []

  @Input()
  public index: number;

  @Input()
  public description: FormGroup;

  @Input()
  public divsize: string;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();


  @Output() 
  public notifyjobdesc: EventEmitter<boolean> = new EventEmitter<boolean>();
  

  private subscription: Subscription
  constructor(
    private fb: FormBuilder,
    private contentService: ResumeContentService,
  ) { 
    this.categories = [
      "Restaurant",
      "Software",
      "Finance",
      "Education",
      "Retail",
      "Marketing",
      "Sales",
      "Accounting",
      "Public Relations"   
    ]
    this.restaurant = [
      "One of only 2 student workers requested by name to cater high-stakes donor events. ",
      "Communicated regularly with supervisors and co-workers to ensure timely and efficient set-up of large-scale events. ",     
      "Conducted regular detailed inventory of stock to ensure accurate documentation for purchasing manager. ",     
      "Assisted in training new staff; edited and updated training manual to include time-saving tips. ",      
      "Promoted twice within same academic year. ",      
      "Managed customer complaints professionally and promptly. ",      
      "Organized and cleaned work station regularly to ensure safe, efficient work environment. ",      
      "Assisted in other workstations as needed; floated between stations whenever necessary. ",      
      "Adapted easily to new equipment and procedures; assisted other staff in making transition. ",      
      "Collaborated with supervisors and co-workers to resolve staffing coverage concerns. ",      
      "Provided prompt service while taking orders, serving food and closing the check for over 75 customers per shift. ",      
      "Created customer base and close relationships with patrons of restaurant. ",      
      "Implemented new online scheduling system for employees, leading to a 25% reduction in employees missing or arriving late to shifts. ",      
      "Created and ran monthly team development sessions that offered training to expand employee responsibilities, helping increase employee retention by 15%. ",     
      "Greeted customers, transferred orders to kitchen, and handled all cash and credit transactions with 100% accuracy. Ensured the cleanliness of front-of-house seating area. ",      
      "Pitched, developed and implemented customer feedback cards and new customer feedback online form that led to a 30% increase in customer feedback. ",    
      "Created and implemented a customized student behavior plan which resulted in an increase of positive behavior from 74% to 90%. ",  
      "Loaded trays with accessories such as eating utensils, napkins, or condiments. ",      
      "Take food orders and relay orders to kitchens or serving counters so they can be filled. ",      
      "Stocked service stations with items such as ice, napkins, or straws. ",      
      "Removed trays and stack dishes for return to kitchen after meals are finished. ",      
      "Prepared food items, such as sandwiches, salads, soups, or beverages. ",     
      "Monitored food preparation or serving techniques to ensure that proper procedures are followed. ",      
      "Carried food, silverware, or linen on trays or use carts to carry trays. ",      
      "Determined where patients or patrons would like to eat their meals and help them get situated. ",      
      "Recorded amounts and types of special food items served to customers. ",      
      "Totaled checks, present them to customers, and accept payment for services. ",      
      "Greeted guests and seat them at tables or in waiting areas. ",      
      "Assigned patrons to tables suitable for their needs and according to rotation so that servers receive an appropriate number of seatings. ",      
      "Spoke with patrons to ensure satisfaction with food and service, to respond to complaints, or to make conversation. ",      
      "Maintained contact with kitchen staff, management, serving staff, and customers to ensure that dining details are handled properly and customers' concerns are addressed. ",      
      "Inspected restrooms for cleanliness and availability of supplies and clean restrooms when necessary. ",      
      "Operated cash registers to accept payments for food and beverages. ",      
      "Informed patrons of establishment specialties and features. ",      
      "Checked with customers to ensure that they are enjoying their meals and take action to correct any problems. ",      
      "Prepared checks that itemize and total meal costs and sales taxes. ",      
      "Checked patrons' identification to ensure that they meet minimum age requirements for consumption of alcoholic beverages. ",      
      "Stocked service areas with supplies such as coffee, food, tableware, and linens. ",      
      "Attempted to limit problems and liability related to customers' excessive drinking by taking steps such as persuading customers to stop drinking, or ordering taxis or other transportation for intoxicated patrons. ",    
      "More suggestions when you sign up..."
    ]

    this.software = [
      "Stored, retrieved, and manipulated data for analysis of system capabilities and requirements. ",      
      "Consult with customers about software system design and maintenance. ",      
      "Supervised the work of programmers, technologists and technicians and other engineering and scientific personnel. ",      
      "Coordinated software system installation and monitor equipment functioning to ensure specifications are met. ",      
      "Obtained and evaluated information on factors such as reporting formats required, costs, and security needs to determine hardware configuration. ",      
      "Determined system performance standards. ",      
      "Trained users to use new or modified equipment. ",     
      "Specified power supply requirements and configuration. ",      
      "Recommend purchase of equipment to control dust, temperature, and humidity in area of system installation. ",      
      "Analyzed information to determine, recommend, and plan computer specifications and layouts, and peripheral equipment modifications. ",      
      "Modified existing software to correct errors, allow it to adapt to new hardware, or to improve its performance. ",      
      "Completed wide range of software development and programming tasks on contract basis. ",      
      "Analyzed software usability and performance, recommending changes to improve functionality. ",      
      "Documented continuously for easy reference and to keep entire team up-to-date on changes. ",     
      "Collaborated with designers to create clean interfaces and simple, intuitive interactions and experiences. ",      
      "Designed embedded systems software by applying key principles of computer science, engineering, and mathematical analysis. ",
      "More suggestions when you sign up..."
    ]

    this.finance = [
      "Analyzed company’s financial needs and developed short and long term plans with 4 group members for case study. ",      
      "Explored conceptual relationship between expected return and relevant risk of individual assets and portfolios of assets. ",      
      "Familiar with basic time value methodology to general valuation and integrated cash flow applications. ",      
      "Developed and analyzed clients’ financial statements (balance sheet, profit and loss) for various case studies; presented analysis and approach to class. ",      
      "Assessed clients’ financial goals and utilized portfolio allocation models to create (mock) investment portfolios. ",       
      "Monitored fluctuations of the ________ to study impact on stock pricing. ",      
      "Used MS Excel and Minitab to _____________. ",      
      "Developed business plan which was selected by local non-profit organization out of 17 submissions, as part of Innovations class. ",      
      "Performed statistical analysis of financial data of 20 HMOs in order to __________. ",      
      "Examined economic stability of four Southeast Asian countries and posited two approaches for investors interested in this geographic area. ",      
      "Familiar with how to calculate a bond’s periodic interest payment and market value when market rates are different than coupon rate. ",      
      "Explain capital budgeting, identify the costs and returns of capital budgeting projects, to fellow students as Classroom Assistant/Finance Tutor. ",
      "Presented oral or written reports on general economic trends, individual corporations, and entire industries. ",      
      "Contacted brokers and purchase investments for companies, according to company policy. ",      
      "Conducted financial analyses related to investments in green construction or green retrofitting projects. ",      
      "Determined the financial viability of alternative energy generation or fuel production systems, based on power source or feedstock quality, financing costs, potential revenue, and total project costs. ",      
      "Evaluated financial viability and potential environmental benefits of cleantech innovations to secure capital investments from sources such as venture capital firms and government green fund grants. ",      
      "Researched and recommended environmentally-related financial products, such as energy futures, water rights, carbon credits, government environmental funds, and cleantech industry funds and company stocks. ",      
      "Drew charts and graphs, using computer spreadsheets, to illustrate technical reports. ",      
      "Informed investment decisions by analyzing financial information to forecast business, industry, or economic conditions. ",      
      "Monitored developments in the fields of industrial technology, business, finance, and economic theory. ",     
      "Interpreted data on price, yield, stability, future investment-risk trends, economic influences, and other factors affecting investment programs. ",
      "More suggestions when you sign up..."
    ]

    this.education = [
      "Initiated, facilitated, and moderated classroom discussions. ",      
      "Maintained student attendance records, grades, and other required records. ",      
      "Kept abreast of developments in the field by reading current literature, talking with colleagues, and participating in professional conferences. ",      
      "Maintained regularly scheduled office hours to advise and assist students. ",      
      "Supervised students' laboratory work. ",      
      "Collaborated with colleagues to address teaching and research issues. ",      
      "Conducted research in a particular field of knowledge and publish findings in professional journals, books, or electronic media. ",      
      "Served on academic or administrative committees that deal with institutional policies, departmental matters, and academic issues. ",      
      "Wrote grant proposals to procure external research funding. ",      
      "Participated in campus and community events. ",      
      "Acted as advisers to student organizations. ",      
      "Provided extra assistance to students with special needs, such as non-English-speaking students or those with physical and mental disabilities. ",      
      "Supervised students in classrooms, halls, cafeterias, school yards, and gymnasiums, or on field trips. ",      
      "Tutored and assisted children individually or in small groups to help them master assignments and to reinforce learning concepts presented by teachers. ",      
      "Enforced administration policies and rules governing students. ",
      "More suggestions when you sign up..."
    ]

    this.retail = [
      "Learned full range of ______ product line in order to provide effective assistance to customers. ",      
      "Oversaw store opening and closing, including till float reconciliation. ",      
      "Consistently surpassed monthly sales goals by providing friendly, professional customer service to wide range of patrons. ",      
      "Trained new employees and acted as mentor to new staff. ",      
      "Offered suggestions for re-arranging checkout areas and stock room, resulting in increased efficiency and safer work environment. ",      
      "Resolved customer complaints regarding sales and service. ",      
      "Monitored customer preferences to determine focus of sales efforts. ",      
      "Confered with potential customers regarding equipment needs and advise customers on types of equipment to purchase. ",      
      "Directed foreign sales and service outlets of an organization. ",      
      "Advised dealers and distributors on policies and operating procedures to ensure functional effectiveness of business. ",      
      "Determined price schedules and discount rates. ",      
      "Baged or packaged purchases, and wrap gifts. ",      
      "Opened and close cash registers, performing tasks such as counting money, separating charge slips, coupons, and vouchers, balancing cash drawers, and making deposits. ",      
      "Cleaned shelves, counters, and tables. ",     
      "Inventory stock and requisition new stock. ",      
      "Watched for and recognize security risks and thefts, and know how to prevent or handle these situations. ",      
      "Maintained records related to sales. ",      
      "Maintained knowledge of current sales and promotions, policies regarding payment and exchanges, and security practices. ",      
      "Answered questions regarding the store and its merchandise. ",      
      "Described merchandise and explain use, operation, and care of merchandise to customers. ",      
      "Greeted customers and ascertain what each customer wants or needs. ",
      "More suggestions when you sign up..."          
    ]

    this.marketing = [
      "Developed mock marketing plan for startup business, including internal/external situation analysis, internal marketing quality audit, target market identification, strategic and tactical goal setting, marketing mix development; feedback and evaluation system. ",      
      "Led lively class discussion on “Customer Service and Handling Dissatisfaction. ",      
      "Designed sample marketing communications plan, including: advertising, personal selling, sales promotion, direct and web-based communications, and public relations. ",      
      "Delivered 10-minute marketing pitch to class, successfully advocating for _____. ",      
      "Studied Internet marketing, including SEM, direct marketing, online advertising, customer relations management, ____, ____, and ____. ",     
      "Analyzed marketing data using SPSS. ",      
      "Familiar with univariate and multivariate data analysis techniques. ",     
      "Designed market research project: formulated a research problem, designed questionnaire, selected a sample frame; collected, entered and analyze respondent data; wrote a comprehensive research report in collaboration with 3 students. ",      
      "Examined issues around global marketing, with close emphasis on role of cultural diversity. ",     
      "Member of team that won 1st place in 2008 AAF-NSAC District Competition. ",
      "Developed pricing strategies, balancing firm objectives and customer satisfaction. ",      
      "Compiled lists describing product or service offerings. ",      
      "Initiated market research studies or analyze their findings. ",      
      "Used sales forecasting or strategic planning to ensure the sale and profitability of products, lines, or services, analyzing business developments and monitoring market trends. ",      
      "Coordinated or participated in promotional activities or trade shows, working with developers, advertisers, or production managers, to market products or services. ",      
      "Consulted with buying personnel to gain advice regarding the types of products or services expected to be in demand. ",      
      "Conducted economic or commercial surveys to identify potential markets for products or services. ",    
      "Selected products or accessories to be displayed at trade or special production shows. ",      
      "Negotiated contracts with vendors or distributors to manage product distribution, establishing distribution networks or developing distribution strategies. ",      
      "Consulted with product development personnel on product specifications such as design, color, or packaging. ",      
      "Advised business or other groups on local, national, or international factors affecting the buying or selling of products or services. ",      
      "Conferred with legal staff to resolve problems, such as copyright infringement or royalty sharing with outside producers or distributors. ",     
      "Consulted with buying personnel to gain advice regarding environmentally sound or sustainable products. ",      
      "Developed business cases for environmental marketing strategies. ",      
      "Integrated environmental information into product or company marketing strategies, policies, or activities. ",     
      "Recommend modifications to products, packaging, production processes, or other characteristics to improve the environmental soundness or sustainability of products. ",
      "More suggestions when you sign up..."
    ]

    this.sales = [
      "Created and ran monthly team development sessions that offered training to expand employee responsibilities, helping increase employee retention by 15%. ",    
      "Advised dealers and distributors on policies and operating procedures to ensure functional effectiveness of business. ",      
      "Directed, coordinated, and reviewed activities in sales and service accounting and recordkeeping, and in receiving and shipping operations. ",      
      "Directed, coordinate, and review activities in sales and service accounting and recordkeeping, and in receiving and shipping operations. ",      
      "Assessed marketing potential of new and existing store locations, considering statistics and expenditures. ",     
      "Determined price schedules and discount rates. ",
      "Planned and direct staffing, training, and performance evaluations to develop and control sales and service programs. ",
      "More suggestions when you sign up..."
    ]

    this.accounting = [
      "Computed taxes owed and prepare tax returns, ensuring compliance with payment, reporting or other tax requirements. ",      
      "Maintained or examined the records of government agencies. ",      
      "Advised clients in areas such as compensation, employee health care benefits, the design of accounting or data processing systems, or long-range tax or estate plans. ",      
      "Developed, maintained, and analyzed budgets, preparing periodic reports that compare budgeted costs to actual costs. ",      
      "Provided internal and external auditing services for businesses or individuals. ",      
      "Analyzed business operations, trends, costs, revenues, financial commitments, and obligations, to project future revenues and expenses or to provide advice. ",      
      "Advised management about issues such as resource utilization, tax strategies, and the assumptions underlying budget forecasts. ",     
      "Represented clients before taxing authorities and provide support during litigation involving financial issues. ",      
      "Prepared forms and manuals for accounting and bookkeeping personnel, and direct their work activities. ",      
      "Appraised, evaluated, and inventory real property and equipment, recording information such as the description, value and location of property. ",      
      "Surveyed operations to ascertain accounting needs and to recommend, develop, or maintain solutions to business and financial problems. ",
      "More suggestions when you sign up..."
    ]

    this.public_relations = [
      "Developed communication portfolio for St. Mary’s Hospital in collaboration with three other students. ",      
      "Studied crisis communication; presented comparison of Mattel vs. Fisher-Price management of toy recalls. ",      
      "Wrote several university press releases, including news of $2.5 million gift. ",      
      "Gave numerous mock news conferences, including announcement of tainted beef recall. ",      
      "Developed 20-page, corporate communications package for mock Google buyout of Facebook and gave 30 min. class presentation as part of 3-person final project. ",
      "More suggestions when you sign up..."
    ]

    this.help = this.restaurant;

    if(localStorage.getItem('tenaga') && localStorage.getItem('tenaga')==='1'){
      this.restaurant.pop();
      this.restaurant.push(
        "Monitor food distribution, ensuring that meals are delivered to the correct recipients and that guidelines, such as those for special diets, are followed. ",        
        "Clean or sterilize dishes, kitchen utensils, equipment, or facilities. ",        
        "Examine trays to ensure that they contain required items. ",       
        "Place food servings on plates or trays according to orders or instructions. "
      )
      
      this.software.pop();
      this.software.push(
        "Developed and directed software system testing and validation procedures, programming, and documentation. ",
        "Confered with systems analysts, engineers, programmers and others to design system and to obtain information on project limitations and capabilities, performance requirements and interfaces. ",
        "Analyzed user needs and software requirements to determine feasibility of design within time and cost constraints. ",
        "Designed, developed and modified software systems, using scientific analysis and mathematical models to predict and measure outcome and consequences of design. "
      )

      this.finance.pop();
      this.finance.push(
        "Monitored fundamental economic, industrial, and corporate developments by analyzing information from financial publications and services, investment banking firms, government agencies, trade publications, company sources, or personal interviews. ",        
        "Recommend investments and investment timing to companies, investment firm staff, or the public. ",        
        "Determined the prices at which securities should be syndicated and offered to the public. ",        
        "Prepared plans of action for investment, using financial analyses. "        
      ) 

      this.education.pop();
      this.education.push(
        "Evaluated and graded students' class work, laboratory work, assignments, and papers. ",        
        "Prepared course materials such as syllabi, homework assignments, and handouts. ",       
        "Compiled, administered, and grade examinations or assign this work to others. ",      
        "Planned, evaluated, and revised curricula, course content, and course materials and methods of instruction. "
      )


      this.retail.pop();
      this.retail.push(
        "Resolved customer complaints regarding sales and service. ",        
        "Determined price schedules and discount rates. ",        
        "Conferred or consult with department heads to plan advertising services and to secure information on equipment and customer specifications. ",       
        "Directed and coordinated activities involving sales of manufactured products, services, commodities, real estate or other subjects of sale. "     
      )

      this.marketing.pop();
      this.marketing.push(
        "Formulated, directed and coordinated marketing activities and policies to promote products and services, working with advertising and promotion managers. ",       
        "Identified, developed, or evaluated marketing strategy, based on knowledge of establishment objectives, market characteristics, and cost and markup factors. ",       
        "Directed the hiring, training, or performance evaluations of marketing or sales staff and oversee their daily activities. ",        
        "Evaluated the financial aspects of product development, such as budgets, expenditures, research and development appropriations, or return-on-investment and profit-loss projections. "
      )  

      this.sales.pop();
      this.sales.push(
        "Oversee regional and local sales managers and their staffs. ",       
        "Planed and directed staffing, training, and performance evaluations to develop and control sales and service programs. ",        
        "Reviewed operational records and reports to project sales and determine profitability. ",        
        "Monitored customer preferences to determine focus of sales efforts. "
      ) 

      this.accounting.pop();
      this.accounting.push(
        "Prepared, examined, or analyzed accounting records, financial statements, or other financial reports to assess accuracy, completeness, and conformance to reporting and procedural standards. ",        
        "Reported to management regarding the finances of establishment. ",        
        "Established tables of accounts and assign entries to proper accounts. ",        
        "Developed, implemented, modified, and document recordkeeping and accounting systems, making use of current computer technology. "
      ) 

      this.public_relations.pop();
      this.public_relations.push(
        "Studied various theories of communications, including ____, ____, ____ and ____. ",      
        "Examined issues of age, ethnicity, and gender in relation to communication. ",
        "Wrote simulated memo to parents of first year students informing them about recent changes to residence policies; letter subsequently adopted by Residence Life. ",       
        "Interviewed attorney, J. Smith, regarding issues slander, invasion of privacy and libel; gave 15 min. class presentation summarizing interview. "
      ) 
    }
  }
 
  onSelect(val){
    
        switch(val) { 
          case "Restaurant": {
            this.help = this.restaurant;
             break;    
          } 
          case "Software": { 
            this.help = this.software;
             break; 
          } 
          case "Finance": { 
            this.help = this.finance;
             break; 
          }
          case "Education": { 
            this.help = this.education;
             break; 
          }  
          case "Retail": { 
            this.help = this.retail;
             break; 
          }    
          case "Marketing": { 
            this.help = this.marketing;
             break; 
          } 
          case "Sales": { 
            this.help = this.sales;
             break; 
          } 
          case "Accounting": { 
            this.help = this.accounting;
             break; 
          }
          case "Public Relations": { 
            this.help = this.public_relations;
             break; 
          }  
          default: { 
            this.help = this.restaurant;
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
    //       this.notifyjobdesc.emit(this.exceed)
    //     } else {
    //       this.exceed = false;
    //       this.notifyjobdesc.emit(this.exceed)
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

  static buildItem(job?: string) {
    return new FormGroup({
      brief_description: new FormControl(job)
    })
  }
}