import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'

import { MainModule }     from './main/main.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { Angulartics2Module,Angulartics2GoogleAnalytics,Angulartics2Facebook } from 'angulartics2';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  exports: [
    MainModule
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MainModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    MainModule,
    HttpClientModule,
    Angular2FontawesomeModule,
    SlimLoadingBarModule.forRoot(),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics,Angulartics2Facebook ])
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
