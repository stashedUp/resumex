import { Component, OnInit } from '@angular/core';
//import {FlexLayoutModule} from "@angular/flex-layout";
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  title = 'app';
  
     
      // direction = "row";
    
      //  toggleDirection() {
      //    let next = (DIRECTIONS.indexOf(this.direction) +1 ) % DIRECTIONS.length;
      //    this.direction = DIRECTIONS[next];
      //    console.log(this.direction)
      //  }

}

//const DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];