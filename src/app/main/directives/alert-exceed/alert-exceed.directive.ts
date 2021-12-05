// import { Component, OnDestroy } from '@angular/core';
// import { AlertExceedService } from '../../services/alert-exceed/alert-exceed.service';
// import { Subscription } from 'rxjs/Subscription';


// @Component({
//     moduleId: module.id,
//     selector: 'alert',
//     templateUrl: './alert-exceed.directive.html',
//     styleUrls: ['./alert-exceed.directive.css'],
// })

// export class AlertExceedDirective implements OnDestroy{
//     message: any;
//     subscription: Subscription;

//     constructor(private alertService: AlertExceedService) { }

//     ngOnInit() {
//         this.subscription=this.alertService.getMessage().subscribe(message => { this.message = message; });
//     }

//     ngOnDestroy(){
//         this.subscription.unsubscribe();
//     }
// }

///////////////////
import { Component, OnInit } from '@angular/core';

import { Alert, AlertType } from '../../interfaces/alert';
import { AlertExceedService } from '../../services/alert-exceed/alert-exceed.service';

@Component({
    moduleId: module.id,
    selector: 'alertexceed',
    templateUrl: './alert-exceed.directive.html',
    styleUrls: ['./alert-exceed.directive.css'],
})

export class AlertExceedDirective {
    alerts: Alert[] = [];

    constructor(private alertService: AlertExceedService) { }

    ngOnInit() {
        this.alertService.getAlert().subscribe((alert: Alert) => {
            if (!alert) {
                // clear alerts when an empty alert is received
                this.alerts = [];
                return;
            }
            //THIS IS ADDED. this is a hack; 
            //I am doing this because I am preserving the code for future reference.
            //You dont need this if you want an array of alerts
            this.alerts = []; //read above comments
            
            // add alert to array
            this.alerts.push(alert);
        });
    }

    removeAlert(alert: Alert) {
        console.log("trying to close");
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    cssClass(alert: Alert) {
        if (!alert) {
            return;
        }

        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert alert-success';
            case AlertType.Error:
                return 'alert alert-danger';
            case AlertType.Info:
                return 'alert alert-info';
            case AlertType.Warning:
                return 'alert alert-warning';
        }
    }
}