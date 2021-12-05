import { Directive, HostListener, Renderer, ElementRef} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ResumeContentService } from '../../services/resume-content/resume-content.service';


@Directive({
  selector: '[appLimits]'
})
export class LimitsDirective {
   private subscription: Subscription;

    constructor(
        private renderer: Renderer,
        private el: ElementRef,
        private contentService: ResumeContentService
    ){}


    @HostListener('window:keypress', ['$event'])

    keyboardInput(event: KeyboardEvent) {
          console.log('some thing key upped')  
        //this.configVal();
        console.log(this.exceed);
        if (this.exceed){
          //event.preventDefault();
          return false;
        }else{
          console.log("keep going");
          return true;
        }
  
    }
    private exceed : boolean = false;
    configVal() : any{

      //let exceed = true;
          //  this.subscription = this.contentService.notifyObservable$.subscribe((res) => {
          //    console.log("directive"+res);
          //    let val = true;
          //     if (res){
          //       if (res > 400) {
          //           //this.exceed = true;
          //            console.log(this.exceed);
          //            console.log("danger"+res);
          //            val = true;
                    
                    
          //       }else{
          //         //console.log(this.exceed);
          //           //this.exceed = false;
          //           //event.stopPropagation();
          //           //event.preventDefault();
          //           val = false;
          //           //return false;;
          //       }
          //     }
          //         this.setVal(val);
          //    });
            //console.log(this.exceed);
            // return this.exceed;
    }

    setVal(val){
        this.exceed = val;
        console.log(this.exceed);
    }

}
